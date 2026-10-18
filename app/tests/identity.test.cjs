'use strict';
const test = require('node:test'), assert = require('node:assert/strict'), crypto = require('node:crypto'), fs = require('node:fs'), os = require('node:os'), path = require('node:path');
const { DatabaseSync } = require('node:sqlite');
const Identity = require('../identity.cjs'), Team = require('../team-store.cjs');
const fixture = require('../core/docent-working-case.cjs').create().nativeFixture.workspace;
const PASSWORD = 'Private orchard lantern 471!';
const NEXT_PASSWORD = 'Another private meadow 952!';
const fastDerive = async ({ password, salt }) => crypto.createHash('sha256').update(salt).update(password).digest();
const hash = value => crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex');
function harness({ filename = ':memory:', derive = fastDerive } = {}) {
  const db = new DatabaseSync(filename); db.exec('PRAGMA foreign_keys=ON');
  const source = structuredClone(fixture), before = hash(source), events = [];
  let at = Date.parse('2026-10-18T01:00:00Z'), failure = '', identity;
  const fail = (message, code) => { throw Object.assign(Error(message), { code }); };
  const transaction = fn => { if (db.isTransaction) return fn(); db.exec('BEGIN IMMEDIATE'); try { const result = fn(); if (failure === 'before') throw Error('Injected before commit'); db.exec('COMMIT'); if (failure === 'after') throw Error('Injected after commit'); return result; } catch (error) { if (db.isTransaction) db.exec('ROLLBACK'); throw error; } };
  const accounts = Team.create({ db, transaction, native: () => source, activate: name => events.push(name), fail, onAccessChanged: id => identity?.revokeAll(id) });
  identity = Identity.create({ db, transaction, accounts, now: () => at, derive });
  return { db, accounts, get identity() { return identity; }, source, before, events, at: () => at, advance: ms => { at += ms; }, failure: value => { failure = value; }, recreate: () => { identity = Identity.create({ db, transaction, accounts, now: () => at, derive }); }, close: () => { assert.equal(hash(source), before); db.close(); } };
}
async function bootstrap(h, values = {}) { const entry = h.identity.bootstrapCode(); return h.identity.bootstrap({ code: entry.code, name: 'First administrator', identifier: 'Admin@owl.local', password: PASSWORD, ...values }); }
function createPerson(h, admin, values = {}) { return h.accounts.command(admin.user.id, { id: crypto.randomUUID(), command: 'save_person', scope: 'organization', expectedRevision: 0, payload: { name: 'Technical owner', identifier: 'owner@owl.local', grants: [{ roleId: 'contributor', scope: Team.SYSTEM_ID }], ...values } }).value; }
function updatePerson(h, admin, id, values) { return h.accounts.command(admin.user.id, { id: crypto.randomUUID(), command: 'save_person', scope: 'organization', expectedRevision: h.accounts.account(id).revision, payload: { id, ...values } }); }
function setup(h, admin, person) { const ticket = h.identity.issueTemporary(admin.user.id, person.id), entry = h.identity.enroll({ code: ticket.code }); return { ticket, entry, principal: h.identity.authenticate(entry.token, { allowSetup: true, csrf: entry.csrf }) }; }
const code = wanted => error => error.code === wanted;

test('bootstrap creates exactly one real administrator with no sample/system grants and opaque sessions', async () => {
  const h = harness(); assert.equal(h.identity.hasUsers(), false);
  const first = h.identity.bootstrapCode(); assert.equal(first.code.length, 43); assert.equal(first.expiresAt, h.at() + Identity.POLICY.bootstrapMs);
  const entered = await h.identity.bootstrap({ code: first.code, name: 'First administrator', identifier: 'Admin@owl.local', password: PASSWORD });
  assert.equal(entered.stage, 'active'); assert.equal(entered.token.length, 43); assert.equal(entered.csrf.length, 43); assert.notEqual(entered.token, entered.csrf);
  const principal = h.identity.authenticate(entered.token, { csrf: entered.csrf }); assert.equal(principal.userId, entered.user.id); assert.equal(principal.csrf, entered.csrf);
  assert(h.identity.hasUsers()); assert.deepEqual(h.accounts.account(entered.user.id).grants, [{ roleId: 'org-admin', scope: 'organization' }]);
  assert.throws(() => h.identity.bootstrapCode(), code('identity-already-setup'));
  await assert.rejects(() => h.identity.bootstrap({ code: first.code, name: 'Other', identifier: 'other', password: PASSWORD }), code('identity-setup-code'));
  assert.equal(h.db.prepare('SELECT COUNT(*) AS n FROM team_users').get().n, 1); h.close();
});

test('bootstrap codes expire, replacement invalidates predecessor and concurrent setup has one winner', async () => {
  const h = harness(), expired = h.identity.bootstrapCode(); h.advance(Identity.POLICY.bootstrapMs);
  await assert.rejects(() => h.identity.bootstrap({ code: expired.code, name: 'Admin', identifier: 'admin', password: PASSWORD }), code('identity-setup-code'));
  const old = h.identity.bootstrapCode(), current = h.identity.bootstrapCode(); assert.notEqual(old.code, current.code);
  await assert.rejects(() => h.identity.bootstrap({ code: old.code, name: 'Admin', identifier: 'admin', password: PASSWORD }), code('identity-setup-code'));
  const results = await Promise.allSettled([h.identity.bootstrap({ code: current.code, name: 'Admin', identifier: 'admin', password: PASSWORD }), h.identity.bootstrap({ code: current.code, name: 'Other', identifier: 'other', password: PASSWORD })]);
  assert.equal(results.filter(value => value.status === 'fulfilled').length, 1); assert.equal(h.db.prepare('SELECT COUNT(*) AS n FROM team_users').get().n, 1); h.close();
});

test('bootstrap credential, people, roles, event and session transaction rolls back completely before commit', async () => {
  const h = harness(), entry = h.identity.bootstrapCode(); h.failure('before');
  await assert.rejects(() => h.identity.bootstrap({ code: entry.code, name: 'Admin', identifier: 'admin', password: PASSWORD }), /Injected/);
  for (const table of ['team_users', 'team_roles', 'team_credentials', 'team_sessions', 'team_auth_events']) assert.equal(h.db.prepare('SELECT COUNT(*) AS n FROM ' + table).get().n, 0);
  h.failure(''); const saved = await h.identity.bootstrap({ code: entry.code, name: 'Admin', identifier: 'admin', password: PASSWORD }); assert(h.identity.authenticate(saved.token)); h.close();
});

test('password policy counts Unicode code points and preserves spaces with no composition or expiry rule', async () => {
  assert.throws(() => Identity.passwordCheck('short'), code('identity-password'));
  assert.throws(() => Identity.passwordCheck('qwertyuiopasdfgh'), code('identity-password-common'));
  assert.throws(() => Identity.passwordCheck('owl-ren-preview'), code('identity-password-common'));
  assert.throws(() => Identity.passwordCheck("Docent-demo-only-2026"), code('identity-password-common'));
  assert.throws(() => Identity.passwordCheck('\ud800'.repeat(15)), code('identity-password'));
  assert.equal(Identity.passwordCheck('🙂'.repeat(15)), '🙂'.repeat(15)); assert.equal(Identity.passwordCheck(' '.repeat(15)), ' '.repeat(15));
  assert.equal(Identity.passwordCheck('界'.repeat(128)).length, 128); assert.throws(() => Identity.passwordCheck('界'.repeat(129)), code('identity-password'));
  const h = harness(), original = '  preserve these spaces  '; await bootstrap(h, { password: original });
  await assert.rejects(() => h.identity.login({ identifier: 'admin@owl.local', password: original.trim() }), code('identity-invalid'));
  assert.equal((await h.identity.login({ identifier: ' ADMIN@OWL.LOCAL ', password: original })).stage, 'active'); h.close();
});

test('password verifiers use distinct fresh salts and pinned parameters without plaintext or secret event bodies', async () => {
  const h = harness(), admin = await bootstrap(h), person = createPerson(h, admin), entry = setup(h, admin, person);
  await h.identity.setPassword(entry.principal, PASSWORD);
  const rows = h.db.prepare('SELECT * FROM team_credentials').all(); assert.equal(rows.length, 2); assert.notEqual(rows[0].salt, rows[1].salt);
  for (const row of rows) { assert.equal(row.salt.length, 32); assert.equal(row.password_hash.length, 64); assert.deepEqual(JSON.parse(row.parameters), Identity.PARAMETERS); }
  const events = JSON.stringify(h.db.prepare('SELECT * FROM team_auth_events').all()) + JSON.stringify(h.db.prepare('SELECT * FROM team_events').all());
  for (const value of [PASSWORD, entry.ticket.code, entry.entry.token, entry.entry.csrf, admin.token, admin.csrf]) assert(!events.includes(value));
  const all = JSON.stringify(h.db.prepare('SELECT * FROM team_one_time').all()) + JSON.stringify(h.db.prepare('SELECT * FROM team_sessions').all());
  for (const value of [PASSWORD, entry.ticket.code, entry.entry.token, entry.entry.csrf, admin.token, admin.csrf]) assert(!all.includes(value)); h.close();
});

test('unknown, wrong-password, password-unset and inactive accounts get generic comparable verification', async () => {
  let calls = 0; const h = harness({ derive: async values => { calls++; return fastDerive(values); } }), admin = await bootstrap(h), person = createPerson(h, admin);
  const responses = [];
  for (const [identifier, password] of [['absent', PASSWORD], ['admin@owl.local', NEXT_PASSWORD], ['owner@owl.local', PASSWORD]]) {
    const before = calls; try { await h.identity.login({ identifier, password }); assert.fail(); } catch (error) { responses.push({ code: error.code, message: error.message }); } assert.equal(calls - before, 1);
  }
  updatePerson(h, admin, person.id, { status: 'inactive' });
  const before = calls; try { await h.identity.login({ identifier: 'owner@owl.local', password: PASSWORD }); assert.fail(); } catch (error) { responses.push({ code: error.code, message: error.message }); } assert.equal(calls - before, 1);
  for (const response of responses) assert.deepEqual(response, responses[0]); h.close();
});

test('five failed attempts persist a bounded cooldown across service recreation; success clears failures', async () => {
  const h = harness(); await bootstrap(h);
  for (let i = 0; i < 5; i++) await assert.rejects(() => h.identity.login({ identifier: 'admin@owl.local', password: NEXT_PASSWORD }), code('identity-invalid'));
  h.recreate(); await assert.rejects(() => h.identity.login({ identifier: 'admin@owl.local', password: PASSWORD }), code('identity-cooldown'));
  h.advance(Identity.POLICY.cooldownMs + 1); assert.equal((await h.identity.login({ identifier: 'admin@owl.local', password: PASSWORD })).stage, 'active');
  assert.equal(h.db.prepare('SELECT COUNT(*) AS n FROM team_auth_attempts').get().n, 0); h.close();
});

test('opaque session cookies require current grants and correct CSRF; reload gets usable CSRF without raw token', async () => {
  const h = harness(), admin = await bootstrap(h);
  assert.throws(() => h.identity.authenticate('x'.repeat(43)), code('identity-required'));
  assert.throws(() => h.identity.authenticate(admin.token, { csrf: 'x'.repeat(43) }), code('identity-csrf'));
  const principal = h.identity.authenticate(admin.token); assert.equal(principal.csrf, admin.csrf); assert(!Object.hasOwn(principal, 'token')); assert(!Object.hasOwn(principal, 'roles'));
  assert(h.identity.authenticate(admin.token, { csrf: principal.csrf }));
  h.identity.logout(admin.token); assert.throws(() => h.identity.authenticate(admin.token), code('identity-required')); h.close();
});

test('sessions expire after idle or absolute time and activity never extends the absolute deadline', async () => {
  const h = harness(), admin = await bootstrap(h); h.advance(Identity.POLICY.idleMs - 1); assert(h.identity.authenticate(admin.token));
  h.advance(Identity.POLICY.idleMs); assert.throws(() => h.identity.authenticate(admin.token), code('identity-required'));
  const fresh = await h.identity.login({ identifier: 'admin@owl.local', password: PASSWORD });
  for (let i = 0; i < 16; i++) { h.advance(29 * 60_000); assert(h.identity.authenticate(fresh.token)); }
  h.advance(16 * 60_000); assert.throws(() => h.identity.authenticate(fresh.token), code('identity-required')); h.close();
});

test('temporary credentials create only target-bound setup sessions; chosen password consumes and rotates atomically', async () => {
  const h = harness(), admin = await bootstrap(h), person = createPerson(h, admin), { ticket, entry, principal } = setup(h, admin, person);
  assert.equal(entry.stage, 'password-change-required'); assert.equal(principal.userId, person.id);
  assert.throws(() => h.identity.authenticate(entry.token), code('identity-required'));
  assert.throws(() => h.identity.enroll({ code: ticket.code }), code('identity-temporary'));
  await assert.rejects(() => h.identity.setPassword({ ...principal, userId: admin.user.id }, NEXT_PASSWORD), code('identity-temporary'));
  assert.equal(h.identity.status(admin.user.id, person.id).passwordSet, false);
  const signed = await h.identity.setPassword(principal, NEXT_PASSWORD); assert.equal(signed.stage, 'active'); assert.equal(signed.user.id, person.id); assert.notEqual(signed.token, entry.token);
  assert.throws(() => h.identity.authenticate(entry.token, { allowSetup: true }), code('identity-required'));
  assert.throws(() => h.identity.enroll({ code: ticket.code }), code('identity-temporary'));
  assert.equal(h.identity.status(admin.user.id, person.id).passwordSet, true);
  assert.equal((await h.identity.login({ identifier: 'owner@owl.local', password: NEXT_PASSWORD })).user.id, person.id); h.close();
});

test('temporary credentials expire at 24 hours and setup sessions at ten minutes', async () => {
  const h = harness(), admin = await bootstrap(h), person = createPerson(h, admin);
  let ticket = h.identity.issueTemporary(admin.user.id, person.id); h.advance(Identity.POLICY.temporaryMs);
  assert.throws(() => h.identity.enroll({ code: ticket.code }), code('identity-temporary'));
  ticket = h.identity.issueTemporary(admin.user.id, person.id); const entry = h.identity.enroll({ code: ticket.code }), principal = h.identity.authenticate(entry.token, { allowSetup: true }); h.advance(Identity.POLICY.setupMs);
  assert.throws(() => h.identity.authenticate(entry.token, { allowSetup: true }), code('identity-required'));
  await assert.rejects(() => h.identity.setPassword(principal, NEXT_PASSWORD), code('identity-temporary')); h.close();
});

test('reset disables former password, sessions and earlier temporary credentials without granting roles', async () => {
  const h = harness(), admin = await bootstrap(h), person = createPerson(h, admin), first = setup(h, admin, person);
  const signed = await h.identity.setPassword(first.principal, NEXT_PASSWORD), before = h.accounts.account(person.id);
  const ticket = h.identity.issueTemporary(admin.user.id, person.id); assert.throws(() => h.identity.authenticate(signed.token), code('identity-required'));
  await assert.rejects(() => h.identity.login({ identifier: person.identifier, password: NEXT_PASSWORD }), code('identity-invalid'));
  const replacement = h.identity.issueTemporary(admin.user.id, person.id); assert.throws(() => h.identity.enroll({ code: ticket.code }), code('identity-temporary'));
  assert(h.identity.enroll({ code: replacement.code })); assert.deepEqual(h.accounts.account(person.id), before); h.close();
});

test('reset authority is checked on commit and contributors cannot obtain credential or status details for others', async () => {
  const h = harness(), admin = await bootstrap(h), person = createPerson(h, admin);
  assert.throws(() => h.identity.issueTemporary(person.id, admin.user.id), code('identity-forbidden'));
  assert.throws(() => h.identity.status(person.id, admin.user.id), code('identity-forbidden'));
  await assert.rejects(() => h.identity.setPassword(h.identity.authenticate(admin.token), NEXT_PASSWORD), code('identity-password-stage'));
  assert.equal(h.db.prepare('SELECT COUNT(*) AS n FROM team_one_time').get().n, 0); h.close();
});

test('access changes revoke live sessions; direct row revision or account deactivation also invalidates authentication', async () => {
  const h = harness(), admin = await bootstrap(h), person = createPerson(h, admin), entry = setup(h, admin, person), signed = await h.identity.setPassword(entry.principal, NEXT_PASSWORD);
  updatePerson(h, admin, person.id, { grants: [{ roleId: 'viewer', scope: Team.SYSTEM_ID }] }); assert.throws(() => h.identity.authenticate(signed.token), code('identity-required'));
  const next = await h.identity.login({ identifier: person.identifier, password: NEXT_PASSWORD });
  h.db.prepare('UPDATE team_users SET access_revision=access_revision+1 WHERE id=?').run(person.id); assert.throws(() => h.identity.authenticate(next.token), code('identity-required'));
  const third = await h.identity.login({ identifier: person.identifier, password: NEXT_PASSWORD }); updatePerson(h, admin, person.id, { status: 'inactive' }); assert.throws(() => h.identity.authenticate(third.token), code('identity-required')); h.close();
});

test('local recovery targets existing active administrator, revokes all sessions and tickets and preserves native history', async () => {
  const h = harness(), admin = await bootstrap(h), person = createPerson(h, admin), entry = setup(h, admin, person);
  assert.throws(() => h.identity.recoverLocal(person.id), code('identity-recovery'));
  const recovery = h.identity.recoverLocal(admin.user.id); assert.throws(() => h.identity.authenticate(admin.token), code('identity-required'));
  assert.throws(() => h.identity.authenticate(entry.entry.token, { allowSetup: true }), code('identity-required'));
  assert.throws(() => h.identity.enroll({ code: entry.ticket.code }), code('identity-temporary'));
  const entered = h.identity.enroll({ code: recovery.code }), active = await h.identity.setPassword(h.identity.authenticate(entered.token, { allowSetup: true }), NEXT_PASSWORD);
  assert(h.identity.authenticate(active.token)); assert.equal(h.accounts.account(admin.user.id).name, 'First administrator'); assert.equal(hash(h.source), h.before); h.close();
});

test('backup recovery invalidation ends every session and outstanding one-time credential', async () => {
  const h = harness(), admin = await bootstrap(h), person = createPerson(h, admin), ticket = h.identity.issueTemporary(admin.user.id, person.id);
  h.identity.invalidateAll(); assert.throws(() => h.identity.authenticate(admin.token), code('identity-required'));
  assert.throws(() => h.identity.enroll({ code: ticket.code }), code('identity-temporary'));
  assert.equal((await h.identity.login({ identifier: 'admin@owl.local', password: PASSWORD })).stage, 'active'); h.close();
});

test('password/setup/reset precommit errors retain exact credential basis and retries do not reuse consumed secrets', async () => {
  const h = harness(), admin = await bootstrap(h), person = createPerson(h, admin), entry = setup(h, admin, person);
  const before = JSON.stringify(h.db.prepare('SELECT * FROM team_credentials').all()); h.failure('before');
  await assert.rejects(() => h.identity.setPassword(entry.principal, NEXT_PASSWORD), /Injected/); assert.equal(JSON.stringify(h.db.prepare('SELECT * FROM team_credentials').all()), before);
  h.failure(''); const saved = await h.identity.setPassword(entry.principal, NEXT_PASSWORD); assert(h.identity.authenticate(saved.token));
  const prior = JSON.stringify(h.db.prepare('SELECT * FROM team_credentials').all()); h.failure('before'); assert.throws(() => h.identity.issueTemporary(admin.user.id, person.id), /Injected/);
  assert.equal(JSON.stringify(h.db.prepare('SELECT * FROM team_credentials').all()), prior); h.failure(''); assert(h.identity.authenticate(saved.token)); h.close();
});

test('postcommit unknown outcomes are resolved through nonsecret status and a replacing credential', async () => {
  const h = harness(), admin = await bootstrap(h), person = createPerson(h, admin); h.failure('after'); assert.throws(() => h.identity.issueTemporary(admin.user.id, person.id), /Injected/);
  h.failure(''); assert.deepEqual(h.identity.status(admin.user.id, person.id), { userId: person.id, passwordSet: false, temporaryPending: true });
  const replacement = h.identity.issueTemporary(admin.user.id, person.id), entry = h.identity.enroll({ code: replacement.code }), principal = h.identity.authenticate(entry.token, { allowSetup: true }); h.failure('after');
  await assert.rejects(() => h.identity.setPassword(principal, NEXT_PASSWORD), /Injected/); h.failure(''); assert.equal(h.identity.status(admin.user.id, person.id).passwordSet, true);
  assert.equal((await h.identity.login({ identifier: person.identifier, password: NEXT_PASSWORD })).stage, 'active'); h.close();
});

test('KDF has one active operation and four queued; a sixth concurrent request refuses without starting work', async () => {
  let blocked = false, release, active = 0, max = 0, count = 0;
  const h = harness({ derive: async values => { count++; active++; max = Math.max(max, active); if (blocked) await new Promise(resolve => { release = resolve; }); const result = await fastDerive(values); active--; return result; } });
  await bootstrap(h); blocked = true;
  const calls = Array.from({ length: 6 }, (_, i) => h.identity.login({ identifier: 'unknown-' + i, password: PASSWORD }));
  const results = Promise.allSettled(calls); await new Promise(resolve => setImmediate(resolve)); assert.equal(count, 2); assert.equal(max, 1);
  blocked = false; release(); const settled = await results; assert.equal(settled.filter(value => value.reason?.code === 'identity-busy').length, 1); assert.equal(settled.filter(value => value.reason?.code === 'identity-invalid').length, 5); assert.equal(max, 1); h.close();
});

test('revocation or credential reset during asynchronous password verification cannot issue a stale active session', async () => {
  let block = false, release;
  const h = harness({ derive: async values => { if (block) await new Promise(resolve => { release = resolve; }); return fastDerive(values); } });
  const admin = await bootstrap(h), person = createPerson(h, admin), entry = setup(h, admin, person); await h.identity.setPassword(entry.principal, NEXT_PASSWORD);
  block = true; const pending = h.identity.login({ identifier: person.identifier, password: NEXT_PASSWORD }); await new Promise(resolve => setImmediate(resolve));
  h.identity.issueTemporary(admin.user.id, person.id); block = false; release(); await assert.rejects(() => pending, code('identity-invalid')); h.close();
});

test('durable password/session/temporary state survives isolated SQLite restart; raw credentials are not recoverable', async () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'owl-identity-')), filename = path.join(directory, 'workspace.sqlite');
  let h = harness({ filename }); const admin = await bootstrap(h), person = createPerson(h, admin), ticket = h.identity.issueTemporary(admin.user.id, person.id); h.close();
  h = harness({ filename }); assert.equal(h.identity.authenticate(admin.token).userId, admin.user.id); const entry = h.identity.enroll({ code: ticket.code });
  assert.equal((await h.identity.setPassword(h.identity.authenticate(entry.token, { allowSetup: true }), NEXT_PASSWORD)).user.id, person.id); h.close();
  const bytes = fs.readFileSync(filename); assert(!bytes.includes(Buffer.from(admin.token))); assert(!bytes.includes(Buffer.from(ticket.code))); assert(!bytes.includes(Buffer.from(PASSWORD)));
  fs.unlinkSync(filename); fs.rmdirSync(directory);
});

test('pinned native asynchronous scrypt executes at the selected work factor with a 32-byte output', async t => {
  const at = performance.now(), salt = crypto.randomBytes(16), key = await Identity.nativeDerive({ password: PASSWORD, salt });
  assert(Buffer.isBuffer(key)); assert.equal(key.length, 32); assert.equal(Identity.PARAMETERS.N, 131072); assert.equal(Identity.PARAMETERS.r, 8); assert.equal(Identity.PARAMETERS.p, 1);
  t.diagnostic('Native scrypt verification: ' + Math.round(performance.now() - at) + ' ms; runtime ' + process.version + '; fixed maxmem ' + Identity.PARAMETERS.maxmem + ' bytes. State tests intentionally inject a fast deterministic derivation.');
});

test('identity events are append-only and unsupported verifier metadata fails closed without work-factor fallback', async () => {
  const h = harness(), admin = await bootstrap(h), before = h.db.prepare('SELECT COUNT(*) AS n FROM team_auth_events').get().n;
  assert.throws(() => h.db.exec('DELETE FROM team_auth_events'), /append-only/); assert.throws(() => h.db.exec("UPDATE team_auth_events SET outcome='changed'"), /append-only/);
  assert.equal(h.db.prepare('SELECT COUNT(*) AS n FROM team_auth_events').get().n, before);
  h.db.prepare('UPDATE team_credentials SET parameters=? WHERE user_id=?').run(JSON.stringify({ ...Identity.PARAMETERS, N: 1024 }), admin.user.id);
  await assert.rejects(() => h.identity.login({ identifier: 'admin@owl.local', password: PASSWORD }), code('identity-storage'));
  assert.throws(() => h.identity.authenticate(admin.token), code('identity-storage')); h.close();
});

test('full store keeps every team table empty before activation, including failed sign-in and local invalidation', async () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'owl-identity-preflight-')), filename = path.join(directory, 'workspace.sqlite');
  const { createStore } = require('../store.cjs'), capabilities = require('../storage-capabilities.cjs');
  const store = createStore(filename, { seed: true, teamMode: true, identityOptions: { derive: fastDerive } });
  const sourceBefore = hash(store.read().workspace);
  await assert.rejects(() => store.identity.login({ identifier: 'unknown', password: PASSWORD }), code('identity-invalid'));
  assert.throws(() => store.identity.enroll({ code: 'x'.repeat(43) }), code('identity-temporary')); store.identity.invalidateAll();
  const db = new DatabaseSync(filename, { readOnly: true });
  for (const table of capabilities.TEAM_TABLES) assert.equal(db.prepare('SELECT COUNT(*) AS n FROM ' + table).get().n, 0, table);
  assert.equal(db.prepare("SELECT COUNT(*) AS n FROM owl_storage_features WHERE name='team-identity'").get().n, 0); db.close();
  const oldReader = createStore(filename); assert.equal(hash(oldReader.read().workspace), sourceBefore); oldReader.close();
  const entry = store.identity.bootstrapCode(), result = await store.identity.bootstrap({ code: entry.code, name: 'Administrator', identifier: 'admin', password: PASSWORD });
  assert(store.identity.authenticate(result.token)); assert.equal(hash(store.read().workspace), sourceBefore); store.close();
  assert.throws(() => createStore(filename), code('storage-version'));
  const restarted = createStore(filename, { teamMode: true, identityOptions: { derive: fastDerive } }); assert(restarted.identity.authenticate(result.token)); restarted.close();
  for (const name of fs.readdirSync(directory)) fs.unlinkSync(path.join(directory, name)); fs.rmdirSync(directory);
});

test('activated accounts without the installation singleton refuse compatible recovery instead of inventing one', async () => {
  const h = harness(), admin = await bootstrap(h); h.db.exec('DELETE FROM team_identity_meta'); assert.throws(() => h.identity.authenticate(admin.token), code('identity-storage')); assert.throws(() => h.recreate(), code('identity-storage'));
  assert.equal(h.db.prepare('SELECT COUNT(*) AS n FROM team_identity_meta').get().n, 0); h.close();
});
