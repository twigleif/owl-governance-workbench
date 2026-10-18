'use strict';
const crypto = require('node:crypto');
const { promisify } = require('node:util');
const scrypt = promisify(crypto.scrypt);
const PARAMETERS = Object.freeze({ algorithm: 'scrypt', version: 1, N: 131072, r: 8, p: 1, maxmem: 256 * 1024 * 1024, keyLength: 32, saltLength: 16 });
const POLICY = Object.freeze({ idleMs: 30 * 60_000, absoluteMs: 8 * 60 * 60_000, setupMs: 10 * 60_000, bootstrapMs: 15 * 60_000, temporaryMs: 24 * 60 * 60_000, attemptMs: 15 * 60_000, cooldownMs: 5 * 60_000, maxFailures: 5, kdfQueue: 4 });
// Small pinned offline deny-list. This is a minimum guard, not a breach database.
const COMMON = new Set(['password', 'password123', 'password123456789', '123456789012345', '1234567890123456', 'qwertyuiopasdfgh', 'letmeinletmein123', 'iloveyouiloveyou', 'administrator123', 'changemechangeme', 'correct horse battery staple', 'docent-demo-only-2026', 'owl-ren-preview', 'owl-alex-preview', 'owl-sam-preview', 'ren-preview-password', 'alex-preview-password', 'sam-preview-password']);
const digest = value => crypto.createHash('sha256').update(value).digest('hex');
const secret = () => crypto.randomBytes(32).toString('base64url');
const csrfFor = token => crypto.createHash('sha256').update('owl-session-csrf-v1\0' + token).digest('base64url');
const equal = (a, b) => { const aa = Buffer.from(a || '', 'hex'), bb = Buffer.from(b || '', 'hex'); return aa.length === bb.length && aa.length > 0 && crypto.timingSafeEqual(aa, bb); };
function error(code, message, status = 400) { throw Object.assign(Error(message), { code, status }); }
function passwordCheck(value) {
  if (typeof value !== 'string' || !value.isWellFormed() || [...value].length < 15 || [...value].length > 128 || Buffer.byteLength(value) > 1024) error('identity-password', 'Use a password of 15–128 valid Unicode characters. Spaces are allowed.');
  if (COMMON.has(value.toLowerCase())) error('identity-password-common', 'Choose a less common password that is different from the public sample credentials.');
  return value;
}
const nativeDerive = ({ password, salt }) => scrypt(password, salt, PARAMETERS.keyLength, { N: PARAMETERS.N, r: PARAMETERS.r, p: PARAMETERS.p, maxmem: PARAMETERS.maxmem });

function create({ db, transaction, accounts, now = Date.now, derive = nativeDerive }) {
  if (!db || typeof transaction !== 'function' || !accounts) throw Error('Identity requires the shared database, transaction and account owner.');
  db.exec(`
    CREATE TABLE IF NOT EXISTS team_identity_meta(singleton INTEGER PRIMARY KEY CHECK(singleton=1), installation_id TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS team_credentials(user_id TEXT PRIMARY KEY REFERENCES team_users(id), revision INTEGER NOT NULL, algorithm TEXT NOT NULL, parameters TEXT NOT NULL, salt TEXT, password_hash TEXT, updated_at INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS team_sessions(session_hash TEXT PRIMARY KEY, id TEXT NOT NULL UNIQUE, user_id TEXT NOT NULL REFERENCES team_users(id), credential_revision INTEGER NOT NULL, access_revision INTEGER NOT NULL, stage TEXT NOT NULL CHECK(stage IN('active','password-change-required')), csrf_hash TEXT NOT NULL, created_at INTEGER NOT NULL, seen_at INTEGER NOT NULL, absolute_expiry INTEGER NOT NULL, ticket_hash TEXT, revoked_at INTEGER);
    CREATE TABLE IF NOT EXISTS team_one_time(code_hash TEXT PRIMARY KEY, installation_id TEXT NOT NULL, user_id TEXT NOT NULL REFERENCES team_users(id), purpose TEXT NOT NULL CHECK(purpose IN('enroll','recovery')), credential_revision INTEGER NOT NULL, expires_at INTEGER NOT NULL, claimed_session TEXT, used_at INTEGER, revoked_at INTEGER);
    CREATE TABLE IF NOT EXISTS team_auth_attempts(identifier_hash TEXT PRIMARY KEY, window_start INTEGER NOT NULL, failures INTEGER NOT NULL, blocked_until INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS team_auth_events(id TEXT PRIMARY KEY, actor_id TEXT, target_id TEXT, action TEXT NOT NULL, outcome TEXT NOT NULL, at INTEGER NOT NULL);
    CREATE TRIGGER IF NOT EXISTS team_auth_events_no_update BEFORE UPDATE ON team_auth_events BEGIN SELECT RAISE(ABORT,'Identity events are append-only'); END;
    CREATE TRIGGER IF NOT EXISTS team_auth_events_no_delete BEFORE DELETE ON team_auth_events BEGIN SELECT RAISE(ABORT,'Identity events are append-only'); END;
  `);
  const dummySalt = crypto.randomBytes(16), dummyKey = crypto.randomBytes(32);
  let setupVerifier = null, setupExpiry = 0, activeKdfs = 0, queued = [], starts = [];
  const clock = () => { const value = now(); if (!Number.isSafeInteger(value) || value < 0) throw Error('Identity clock is invalid.'); return value; };
  const hasUsers = () => !!db.prepare('SELECT 1 FROM team_users LIMIT 1').get();
  function installationId() {
    const row = db.prepare('SELECT installation_id FROM team_identity_meta WHERE singleton=1').get();
    if (!row || typeof row.installation_id !== 'string' || !/^[a-f0-9-]{36}$/.test(row.installation_id)) error('identity-storage', 'Local identity storage is incomplete. Keep this workspace for compatible recovery.', 503);
    return row.installation_id;
  }
  if (hasUsers()) installationId();
  const event = (action, outcome, actorId = null, targetId = null) => { if (hasUsers()) db.prepare('INSERT INTO team_auth_events VALUES(?,?,?,?,?,?)').run(crypto.randomUUID(), actorId, targetId, action, outcome, clock()); };
  function credential(id) {
    const row = db.prepare('SELECT * FROM team_credentials WHERE user_id=?').get(id);
    if (row) installationId();
    if (row && (row.algorithm !== 'scrypt' || row.parameters !== JSON.stringify(PARAMETERS) || !Number.isSafeInteger(row.revision) || row.revision < 1 || (row.salt === null) !== (row.password_hash === null) || row.salt !== null && (!/^[a-f0-9]{32}$/.test(row.salt) || !/^[a-f0-9]{64}$/.test(row.password_hash)))) error('identity-storage', 'Credential storage needs compatible local recovery. No account or governance record was changed.', 503);
    return row;
  }
  const generic = () => error('identity-invalid', 'Unable to sign in with these details. Check them or ask your administrator.', 401);
  function requestBudget() {
    const at = clock(); starts = starts.filter(value => value > at - 60_000);
    if (starts.length >= 60) error('identity-busy', 'Too many sign-in requests. Wait a minute and try again.', 429);
    starts.push(at);
  }
  function kdf(password, salt) {
    if (activeKdfs && queued.length >= POLICY.kdfQueue) return Promise.reject(Object.assign(Error('Sign-in is busy. Wait briefly and try again.'), { code: 'identity-busy', status: 429 }));
    return new Promise((resolve, reject) => {
      const run = async () => {
        activeKdfs++;
        try { const result = Buffer.from(await derive({ password, salt, parameters: PARAMETERS })); if (result.length !== 32) throw Error('Password derivation returned an invalid length.'); resolve(result); }
        catch (cause) { reject(cause); }
        finally { activeKdfs--; const next = queued.shift(); if (next) next(); }
      };
      if (activeKdfs) queued.push(run); else run();
    });
  }
  function loginInput(identifier, password) {
    // Same bounded handling for known, unknown and inactive local identifiers.
    if (typeof identifier !== 'string' || identifier.length > 254 || typeof password !== 'string' || !password.isWellFormed() || Buffer.byteLength(password) > 1024) generic();
    return identifier.trim().toLowerCase();
  }
  function attemptAllowed(key) {
    const at = clock(), row = db.prepare('SELECT * FROM team_auth_attempts WHERE identifier_hash=?').get(key);
    if (row && row.blocked_until > at) error('identity-cooldown', 'Unable to sign in now. Wait five minutes and try again, or ask your administrator.', 429);
  }
  function failedAttempt(key, actorId = null) {
    transaction(() => {
      // Empty unactivated schemas stay empty. Pre-bootstrap refusal is memory-throttled.
      if (!hasUsers()) return;
      const at = clock(), before = db.prepare('SELECT * FROM team_auth_attempts WHERE identifier_hash=?').get(key);
      const count = before && before.window_start > at - POLICY.attemptMs ? before.failures + 1 : 1;
      const start = count === 1 ? at : before.window_start, blocked = count >= POLICY.maxFailures ? at + POLICY.cooldownMs : 0;
      db.prepare('DELETE FROM team_auth_attempts WHERE window_start<? AND blocked_until<=?').run(at - POLICY.attemptMs, at);
      if (!before && db.prepare('SELECT COUNT(*) AS n FROM team_auth_attempts').get().n >= 1000) error('identity-busy', 'Sign-in is busy. Wait briefly and try again.', 429);
      db.prepare('INSERT INTO team_auth_attempts VALUES(?,?,?,?) ON CONFLICT(identifier_hash) DO UPDATE SET window_start=excluded.window_start,failures=excluded.failures,blocked_until=excluded.blocked_until').run(key, start, count, blocked);
      event('sign-in', 'denied', actorId);
    });
  }
  function session(person, revision, stage = 'active', ticketHash = null) {
    const token = secret(), csrf = csrfFor(token), at = clock(), id = crypto.randomUUID();
    const expiry = at + (stage === 'active' ? POLICY.absoluteMs : POLICY.setupMs);
    db.prepare('INSERT INTO team_sessions VALUES(?,?,?,?,?,?,?,?,?,?,?,?)').run(digest(token), id, person.id, revision, person.accessRevision, stage, digest(csrf), at, at, expiry, ticketHash, null);
    return { token, csrf, stage, user: { id: person.id, name: person.name, identifier: person.identifier } };
  }
  function revokeAll(userId) {
    return transaction(() => {
      const at = clock();
      if (userId) return db.prepare('UPDATE team_sessions SET revoked_at=? WHERE user_id=? AND revoked_at IS NULL').run(at, userId).changes;
      return db.prepare('UPDATE team_sessions SET revoked_at=? WHERE revoked_at IS NULL').run(at).changes;
    });
  }
  function invalidateAll() {
    return transaction(() => { revokeAll(); db.prepare('UPDATE team_one_time SET revoked_at=? WHERE revoked_at IS NULL AND used_at IS NULL').run(clock()); setupVerifier = null; setupExpiry = 0; event('local-invalidation', 'completed'); });
  }
  function bootstrapCode() {
    if (hasUsers()) error('identity-already-setup', 'This workspace already has an administrator. Sign in or use local recovery.', 409);
    const code = secret(); setupVerifier = digest(code); setupExpiry = clock() + POLICY.bootstrapMs;
    return { code, expiresAt: setupExpiry };
  }
  function validBootstrap(code) { return !hasUsers() && typeof code === 'string' && code.length === 43 && setupVerifier && setupExpiry > clock() && equal(digest(code), setupVerifier); }
  async function bootstrap({ code, name, identifier, password } = {}) {
    requestBudget(); if (!validBootstrap(code)) error('identity-setup-code', 'The setup code is invalid or expired. Restart local setup.', 401);
    passwordCheck(password); const salt = crypto.randomBytes(16), key = await kdf(password, salt);
    const result = transaction(() => {
      if (!validBootstrap(code)) error('identity-setup-code', 'The setup code is invalid or expired. Restart local setup.', 401);
      const person = accounts.bootstrapPerson({ id: crypto.randomUUID(), name, identifier }, new Date(clock()).toISOString());
      db.prepare('INSERT INTO team_identity_meta VALUES(1,?)').run(crypto.randomUUID());
      db.prepare('INSERT INTO team_credentials VALUES(?,?,?,?,?,?,?)').run(person.id, 1, 'scrypt', JSON.stringify(PARAMETERS), salt.toString('hex'), key.toString('hex'), clock());
      event('administrator-password-set', 'completed', person.id, person.id);
      return session(person, 1);
    });
    setupVerifier = null; setupExpiry = 0; return result;
  }
  async function login({ identifier, password } = {}) {
    requestBudget(); const normalized = loginInput(identifier, password), identifierHash = digest(normalized); attemptAllowed(identifierHash);
    const person = accounts.findByIdentifier(normalized), saved = person ? credential(person.id) : null;
    const salt = saved?.salt && saved?.password_hash ? Buffer.from(saved.salt, 'hex') : dummySalt;
    const derived = await kdf(password, salt);
    const matches = crypto.timingSafeEqual(derived, saved?.password_hash ? Buffer.from(saved.password_hash, 'hex') : dummyKey);
    const result = transaction(() => {
      attemptAllowed(identifierHash);
      const current = person ? accounts.account(person.id) : null, latest = person ? credential(person.id) : null;
      if (!matches || !current || current.status !== 'active' || !saved?.password_hash || latest?.revision !== saved.revision || current.accessRevision !== person.accessRevision || current.identifierKey !== normalized) {
        // Persist failure even though the caller receives a refusal outside this transaction.
        failedAttempt(identifierHash, current?.id || null); return { denied: true };
      }
      db.prepare('DELETE FROM team_auth_attempts WHERE identifier_hash=?').run(identifierHash);
      event('sign-in', 'completed', current.id, current.id); return session(current, latest.revision);
    });
    if (result.denied) generic();
    return result;
  }
  function authenticate(token, { csrf, touch = true, allowSetup = false } = {}) {
    if (typeof token !== 'string' || token.length !== 43) error('identity-required', 'Sign in to continue.', 401);
    const at = clock(), row = db.prepare('SELECT * FROM team_sessions WHERE session_hash=?').get(digest(token));
    const person = row ? accounts.account(row.user_id) : null, saved = row ? credential(row.user_id) : null;
    if (!row || row.revoked_at !== null || !person || person.status !== 'active' || !saved || saved.revision !== row.credential_revision || person.accessRevision !== row.access_revision || row.absolute_expiry <= at || row.seen_at + POLICY.idleMs <= at || row.stage !== 'active' && !allowSetup) error('identity-required', 'Your session ended. Sign in again to continue.', 401);
    if (csrf !== undefined && (typeof csrf !== 'string' || csrf.length !== 43 || !equal(digest(csrf), row.csrf_hash))) error('identity-csrf', 'This request could not be verified. Reload and try again.', 403);
    if (row.stage !== 'active') {
      const ticket = db.prepare('SELECT * FROM team_one_time WHERE code_hash=?').get(row.ticket_hash);
      if (!ticket || ticket.revoked_at !== null || ticket.used_at !== null || ticket.expires_at <= at || ticket.claimed_session !== row.id || ticket.credential_revision !== saved.revision) error('identity-required', 'Your setup session ended. Ask the administrator for a new temporary credential.', 401);
    }
    if (touch && row.seen_at !== at) db.prepare('UPDATE team_sessions SET seen_at=? WHERE session_hash=?').run(at, digest(token));
    return Object.freeze({ userId: row.user_id, sessionId: row.id, stage: row.stage, csrf: csrfFor(token) });
  }
  function logout(token) {
    return transaction(() => {
      const row = typeof token === 'string' && token.length === 43 ? db.prepare('SELECT * FROM team_sessions WHERE session_hash=?').get(digest(token)) : null;
      if (row && row.revoked_at === null) { db.prepare('UPDATE team_sessions SET revoked_at=? WHERE session_hash=?').run(clock(), digest(token)); event('sign-out', 'completed', row.user_id, row.user_id); }
      return { signedOut: true };
    });
  }
  function temporary(targetId, purpose, actorId) {
    const person = accounts.account(targetId); if (!person || person.status !== 'active') error('identity-account', 'Choose an active account before creating a temporary credential.', 409);
    const code = secret(), at = clock(), revision = (credential(targetId)?.revision || 0) + 1;
    revokeAll(targetId); db.prepare('UPDATE team_one_time SET revoked_at=? WHERE user_id=? AND revoked_at IS NULL AND used_at IS NULL').run(at, targetId);
    db.prepare('INSERT INTO team_credentials VALUES(?,?,?,?,?,?,?) ON CONFLICT(user_id) DO UPDATE SET revision=excluded.revision,salt=NULL,password_hash=NULL,updated_at=excluded.updated_at').run(targetId, revision, 'scrypt', JSON.stringify(PARAMETERS), null, null, at);
    db.prepare('INSERT INTO team_one_time VALUES(?,?,?,?,?,?,?,?,?)').run(digest(code), installationId(), targetId, purpose, revision, at + POLICY.temporaryMs, null, null, null);
    event(purpose === 'recovery' ? 'local-recovery-created' : 'temporary-credential-created', 'completed', actorId, targetId);
    return { code, expiresAt: at + POLICY.temporaryMs, targetId };
  }
  function issueTemporary(principalId, targetId) {
    return transaction(() => {
      if (!accounts.can(principalId, 'people.manage', 'organization').allowed) error('identity-forbidden', 'Ask an organization administrator to create a temporary credential.', 403);
      return temporary(targetId, 'enroll', principalId);
    });
  }
  function recoverLocal(targetId) {
    return transaction(() => {
      if (!accounts.can(targetId, 'people.manage', 'organization').allowed) error('identity-recovery', 'Choose an existing active organization administrator for local recovery.', 409);
      invalidateAll(); return temporary(targetId, 'recovery', null);
    });
  }
  function enroll({ code } = {}) {
    requestBudget();
    return transaction(() => {
      const at = clock(), ticket = typeof code === 'string' && code.length === 43 ? db.prepare('SELECT * FROM team_one_time WHERE code_hash=?').get(digest(code)) : null;
      const person = ticket ? accounts.account(ticket.user_id) : null, saved = ticket ? credential(ticket.user_id) : null;
      if (!ticket || ticket.installation_id !== installationId() || ticket.used_at !== null || ticket.revoked_at !== null || ticket.claimed_session !== null || ticket.expires_at <= at || !person || person.status !== 'active' || saved?.revision !== ticket.credential_revision) error('identity-temporary', 'This temporary credential is invalid, used or expired. Ask your administrator for a new one.', 401);
      const result = session(person, saved.revision, 'password-change-required', ticket.code_hash);
      const created = db.prepare('SELECT id FROM team_sessions WHERE session_hash=?').get(digest(result.token));
      db.prepare('UPDATE team_one_time SET claimed_session=? WHERE code_hash=?').run(created.id, ticket.code_hash);
      event('temporary-credential-presented', 'completed', person.id, person.id); return result;
    });
  }
  async function setPassword(principal, newPassword) {
    passwordCheck(newPassword);
    if (!principal || principal.stage !== 'password-change-required' || typeof principal.sessionId !== 'string') error('identity-password-stage', 'Use a current temporary credential to set your password.', 401);
    const salt = crypto.randomBytes(16), key = await kdf(newPassword, salt);
    return transaction(() => {
      const at = clock(), row = db.prepare('SELECT * FROM team_sessions WHERE id=?').get(principal.sessionId), person = row ? accounts.account(row.user_id) : null, saved = row ? credential(row.user_id) : null;
      const ticket = row ? db.prepare('SELECT * FROM team_one_time WHERE code_hash=?').get(row.ticket_hash) : null;
      if (!row || row.stage !== 'password-change-required' || row.user_id !== principal.userId || row.revoked_at !== null || row.absolute_expiry <= at || row.seen_at + POLICY.idleMs <= at || !person || person.status !== 'active' || person.accessRevision !== row.access_revision || !saved || saved.revision !== row.credential_revision || !ticket || ticket.claimed_session !== row.id || ticket.installation_id !== installationId() || ticket.used_at !== null || ticket.revoked_at !== null || ticket.expires_at <= at || ticket.credential_revision !== saved.revision) error('identity-temporary', 'Your password setup session ended. Ask your administrator for a new temporary credential.', 401);
      const revision = saved.revision + 1;
      db.prepare('UPDATE team_credentials SET revision=?,salt=?,password_hash=?,updated_at=? WHERE user_id=?').run(revision, salt.toString('hex'), key.toString('hex'), at, person.id);
      db.prepare('UPDATE team_one_time SET used_at=? WHERE code_hash=?').run(at, ticket.code_hash); revokeAll(person.id);
      event('personal-password-set', 'completed', person.id, person.id); return session(person, revision);
    });
  }
  function status(principalId, targetId) {
    if (principalId !== targetId && !accounts.can(principalId, 'people.manage', 'organization').allowed) error('identity-forbidden', 'Ask the administrator for account status.', 403);
    const person = accounts.account(targetId); if (!person) error('identity-account', 'This account is unavailable.', 404);
    const saved = credential(targetId), at = clock();
    return { userId: targetId, passwordSet: !!saved?.password_hash, temporaryPending: !!db.prepare('SELECT 1 FROM team_one_time WHERE user_id=? AND used_at IS NULL AND revoked_at IS NULL AND expires_at>?').get(targetId, at) };
  }
  return { hasUsers, bootstrapCode, bootstrap, login, authenticate, logout, issueTemporary, enroll, setPassword, recoverLocal, revokeAll, invalidateAll, status };
}
module.exports = { create, PARAMETERS, POLICY, passwordCheck, nativeDerive };
