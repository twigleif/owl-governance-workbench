'use strict';
/* Technical team metadata only. No native governance writer or provider access. */
const crypto = require('node:crypto');
const Access = require('./core/team-access-model.js');
const SYSTEM_ID = 'SIM-DOCENT-AI-001';
const ASSESSMENT_ID = 'SIM-DOCENT-REC-ASMT-001';
const TASK_ID = 'SIM-DOCENT-RVW-002';
const copy = value => JSON.parse(JSON.stringify(value));
const sorted = value => Array.isArray(value) ? value.map(sorted) : value && typeof value === 'object' ? Object.fromEntries(Object.keys(value).sort().map(key => [key, sorted(value[key])])) : value;
const fingerprint = value => crypto.createHash('sha256').update(JSON.stringify(sorted(value))).digest('hex');
const same = (left, right) => fingerprint(left) === fingerprint(right);
const normalizeIdentifier = value => typeof value === 'string' ? value.trim().toLocaleLowerCase('en-US') : '';

function create({ db, transaction, activate, native, fail, onAccessChanged = () => {} }) {
  if (![transaction, activate, native, fail, onAccessChanged].every(value => typeof value === 'function')) throw Error('Team metadata requires the shared store owners.');
  db.exec(`
    CREATE TABLE IF NOT EXISTS team_users (
      id TEXT PRIMARY KEY, name TEXT NOT NULL, identifier TEXT NOT NULL,
      identifier_key TEXT NOT NULL UNIQUE, status TEXT NOT NULL CHECK(status IN ('active','inactive')),
      revision INTEGER NOT NULL, access_revision INTEGER NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS team_roles (
      id TEXT PRIMARY KEY, name TEXT NOT NULL, scope_type TEXT NOT NULL CHECK(scope_type IN ('organization','system')),
      permissions TEXT NOT NULL, protected INTEGER NOT NULL CHECK(protected IN (0,1)), revision INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS team_grants (
      user_id TEXT NOT NULL REFERENCES team_users(id), role_id TEXT NOT NULL REFERENCES team_roles(id), scope TEXT NOT NULL,
      PRIMARY KEY(user_id, role_id, scope)
    );
    CREATE TABLE IF NOT EXISTS team_assignments (
      system_id TEXT NOT NULL, task_id TEXT NOT NULL, revision INTEGER NOT NULL,
      system_owner_id TEXT REFERENCES team_users(id), technical_owner_id TEXT REFERENCES team_users(id),
      reviewer_id TEXT REFERENCES team_users(id), decision_maker_id TEXT REFERENCES team_users(id),
      PRIMARY KEY(system_id, task_id)
    );
    CREATE TABLE IF NOT EXISTS team_wizard (
      user_id TEXT PRIMARY KEY REFERENCES team_users(id), revision INTEGER NOT NULL, step INTEGER NOT NULL,
      completed_steps TEXT NOT NULL, finished INTEGER NOT NULL CHECK(finished IN (0,1))
    );
    CREATE TABLE IF NOT EXISTS team_events (id TEXT PRIMARY KEY, actor_id TEXT NOT NULL REFERENCES team_users(id), scope TEXT NOT NULL, at TEXT NOT NULL, body TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS team_operations (
      id TEXT PRIMARY KEY, actor_id TEXT NOT NULL REFERENCES team_users(id), scope TEXT NOT NULL,
      digest TEXT NOT NULL, result TEXT NOT NULL
    );
    CREATE TRIGGER IF NOT EXISTS team_events_no_update BEFORE UPDATE ON team_events BEGIN SELECT RAISE(ABORT,'Team events are append-only'); END;
    CREATE TRIGGER IF NOT EXISTS team_events_no_delete BEFORE DELETE ON team_events BEGIN SELECT RAISE(ABORT,'Team events are append-only'); END;
    CREATE TRIGGER IF NOT EXISTS team_operations_no_update BEFORE UPDATE ON team_operations BEGIN SELECT RAISE(ABORT,'Team operation receipts are immutable'); END;
    CREATE TRIGGER IF NOT EXISTS team_operations_no_delete BEFORE DELETE ON team_operations BEGIN SELECT RAISE(ABORT,'Team operation receipts are immutable'); END;
  `);
  const err = (code, message) => fail(message, code);
  function text(value, field, max) {
    if (typeof value !== 'string' || !value.trim() || value.length > max || /[\u0000-\u001f\u007f]/.test(value)) err('team-details', 'Enter a supported ' + field + '.');
    return value.trim();
  }
  function identifier(value) {
    const result = text(value, 'local sign-in identifier', 254);
    if (/\s/.test(result) || !normalizeIdentifier(result)) err('team-details', 'Use a local sign-in identifier without spaces.');
    return result;
  }
  function keys(value, allowed) {
    if (!value || typeof value !== 'object' || Array.isArray(value) || Object.keys(value).some(key => !allowed.includes(key))) err('team-details', 'Use the supported account or role fields.');
  }
  function role(row) { return row ? { id: row.id, name: row.name, scopeType: row.scope_type, permissions: JSON.parse(row.permissions), protected: !!row.protected, revision: row.revision } : null; }
  const roles = () => db.prepare('SELECT * FROM team_roles ORDER BY rowid').all().map(role);
  const grants = id => db.prepare('SELECT role_id AS roleId,scope FROM team_grants WHERE user_id=? ORDER BY scope,role_id').all(id).map(value => ({ ...value }));
  function account(id) {
    const row = typeof id === 'string' ? db.prepare('SELECT * FROM team_users WHERE id=?').get(id) : null;
    return row ? { id: row.id, name: row.name, identifier: row.identifier, identifierKey: row.identifier_key, status: row.status, revision: row.revision, accessRevision: row.access_revision, createdAt: row.created_at, updatedAt: row.updated_at, grants: grants(row.id) } : null;
  }
  function findByIdentifier(key) { const row = db.prepare('SELECT id FROM team_users WHERE identifier_key=?').get(normalizeIdentifier(key)); return row ? account(row.id) : null; }
  const systemPerson = person => ({ id: person.id, name: person.name, status: person.status, revision: person.revision, accessRevision: person.accessRevision, grants: person.grants.filter(grant => grant.scope === SYSTEM_ID) });
  function existingSystemPerson(id) {
    const person = account(id);
    if (!person || !person.grants.some(grant => grant.scope === SYSTEM_ID)) err('team-forbidden', 'This person is outside your system access scope. Ask an organization administrator to add or grant access.');
    return person;
  }
  function state() { return { people: db.prepare('SELECT id FROM team_users ORDER BY rowid').all().map(row => { const person = account(row.id); return { ...person, grants: person.grants.map(grant => ({ ...grant, scope: grant.scope === SYSTEM_ID ? 'docent' : grant.scope })) }; }), roles: roles() }; }
  function can(id, permission, scope = SYSTEM_ID) {
    if (scope !== 'organization' && scope !== SYSTEM_ID) return { allowed: false, reason: 'This scope is not connected.', roleIds: [], scope };
    const result = Access.evaluate(state(), id, permission, scope === SYSTEM_ID ? 'docent' : scope);
    return { ...result, scope };
  }
  function requirePermission(id, permission, scope) {
    const result = can(id, permission, scope);
    if (!result.allowed) err('team-forbidden', 'You do not have access to this action. Ask an organization administrator or the system access manager.');
    return result;
  }
  function actor(id, permission, scope) {
    const result = requirePermission(id, permission, scope), person = account(id), catalogue = roles();
    return { id: person.id, name: person.name, permission, scope, roleBasis: result.roleIds.map(roleId => { const item = catalogue.find(value => value.id === roleId); return { id: item.id, name: item.name, revision: item.revision }; }) };
  }
  function emit(captured, action, target, before, after, at) {
    const body = { id: crypto.randomUUID(), actor: captured, action, scope: captured.scope, target, before, after, at, outcome: 'saved' };
    db.prepare('INSERT INTO team_events VALUES(?,?,?,?,?)').run(body.id, captured.id, captured.scope, at, JSON.stringify(body));
  }
  function expected(actual, wanted) { if (!Number.isSafeInteger(wanted) || wanted !== actual) err('team-conflict', 'Saved access changed. Your ordinary edits are kept; reload the saved values before saving again.'); }
  function ensureLastAdmin() {
    if (!db.prepare("SELECT 1 FROM team_users u JOIN team_grants g ON g.user_id=u.id WHERE u.status='active' AND g.role_id='org-admin' AND g.scope='organization' LIMIT 1").get()) err('team-last-admin', 'Keep at least one active Organization administrator. Give that role to another active person first.');
  }
  function bootstrapPerson(values, at = new Date().toISOString()) {
    return transaction(() => {
      keys(values, ['id', 'name', 'identifier']);
      if (db.prepare('SELECT 1 FROM team_users LIMIT 1').get() || db.prepare('SELECT 1 FROM team_roles LIMIT 1').get()) err('team-already-setup', 'This workspace already has an administrator. Sign in or use local recovery.');
      if (typeof values.id !== 'string' || !/^[-\w]{16,120}$/.test(values.id) || values.id.startsWith('preview-')) err('team-details', 'Use a newly generated opaque account ID.');
      const name = text(values.name, 'display name', 160), login = identifier(values.identifier);
      activate('team-identity');
      const insert = db.prepare('INSERT INTO team_roles VALUES(?,?,?,?,?,?)');
      for (const item of Access.DEFAULT_ROLES) insert.run(item.id, item.name, item.scopeType, JSON.stringify(item.permissions), item.protected ? 1 : 0, 1);
      db.prepare('INSERT INTO team_users VALUES(?,?,?,?,?,?,?,?,?)').run(values.id, name, login, normalizeIdentifier(login), 'active', 1, 1, at, at);
      db.prepare('INSERT INTO team_grants VALUES(?,?,?)').run(values.id, 'org-admin', 'organization');
      const created = account(values.id);
      emit(actor(values.id, 'people.manage', 'organization'), 'administrator-created', { type: 'person', id: values.id, revision: 1 }, null, created, at);
      return created;
    });
  }
  function validateGrants(requested) {
    if (!Array.isArray(requested) || requested.length > 64) err('team-details', 'Select a bounded list of supported scoped roles.');
    const catalogue = roles(), seen = new Set();
    const result = requested.map(grant => {
      keys(grant, ['roleId', 'scope']);
      const item = catalogue.find(value => value.id === grant.roleId), key = grant.scope + ':' + grant.roleId;
      if (!item || !['organization', SYSTEM_ID].includes(grant.scope) || item.scopeType !== (grant.scope === 'organization' ? 'organization' : 'system') || seen.has(key)) err('team-details', 'Choose each role once in its matching Organization or system scope.');
      seen.add(key); return { roleId: item.id, scope: grant.scope };
    });
    return result.sort((a, b) => (a.scope + ':' + a.roleId).localeCompare(b.scope + ':' + b.roleId));
  }
  function savePerson(principalId, values, revision, scope, at) {
    keys(values, ['id', 'name', 'identifier', 'status', 'grants']);
    const admin = can(principalId, 'people.manage', 'organization').allowed;
    const permission = admin ? 'people.manage' : 'system.access.manage', permissionScope = admin ? 'organization' : SYSTEM_ID;
    if (scope !== permissionScope) err('team-forbidden', 'Use the matching Organization or system scope for this action.');
    const captured = actor(principalId, permission, permissionScope);
    const previous = admin ? (values.id ? account(values.id) : null) : existingSystemPerson(values.id);
    if (values.id && !previous) err('team-unavailable', 'This person is unavailable. Reload People.');
    if (!previous && !admin) err('team-forbidden', 'An organization administrator creates accounts. A system manager can update existing system grants.');
    expected(previous?.revision || 0, revision);
    if (!previous && db.prepare('SELECT count(*) AS n FROM team_users').get().n >= 200) err('team-budget', 'This development workspace supports up to 200 accounts.');
    const name = text(values.name === undefined ? previous?.name : values.name, 'display name', 160);
    const login = identifier(values.identifier === undefined ? previous?.identifier : values.identifier);
    const status = values.status === undefined ? previous?.status || 'active' : values.status;
    if (!['active', 'inactive'].includes(status)) err('team-details', 'Choose Active or Inactive.');
    if (!admin && ['name', 'identifier', 'status'].some(key => Object.hasOwn(values, key))) err('team-forbidden', 'Only an organization administrator can change identity or status.');
    const supplied = validateGrants(values.grants === undefined ? previous?.grants || [] : values.grants);
    if (!admin && values.grants !== undefined && supplied.some(value => value.scope !== SYSTEM_ID)) err('team-forbidden', 'A system manager can change only roles in this system.');
    // A scoped manager never needs to read or resend hidden Organization grants.
    const nextGrants = admin || values.grants === undefined ? supplied : validateGrants([...previous.grants.filter(value => value.scope === 'organization'), ...supplied]);
    const duplicate = findByIdentifier(login);
    if (duplicate && duplicate.id !== previous?.id) err('team-identifier-used', 'This sign-in identifier already belongs to an account. Edit that person or use another identifier.');
    if (previous && name === previous.name && login === previous.identifier && status === previous.status && same(previous.grants, nextGrants)) return { changed: false, value: admin ? previous : systemPerson(previous) };
    const id = previous?.id || crypto.randomUUID();
    const accessChanged = !!previous && (status !== previous.status || !same(previous.grants, nextGrants));
    db.prepare(`INSERT INTO team_users VALUES(?,?,?,?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET name=excluded.name,identifier=excluded.identifier,identifier_key=excluded.identifier_key,status=excluded.status,revision=excluded.revision,access_revision=excluded.access_revision,updated_at=excluded.updated_at`).run(id, name, login, normalizeIdentifier(login), status, (previous?.revision || 0) + 1, (previous?.accessRevision || 0) + 1, previous?.createdAt || at, at);
    db.prepare('DELETE FROM team_grants WHERE user_id=?').run(id);
    for (const grant of nextGrants) db.prepare('INSERT INTO team_grants VALUES(?,?,?)').run(id, grant.roleId, grant.scope);
    ensureLastAdmin();
    if (accessChanged || previous && (name !== previous.name || login !== previous.identifier)) onAccessChanged(id);
    const saved = account(id);
    emit(captured, previous ? 'person-updated' : 'person-created', { type: 'person', id, revision: saved.revision }, previous, saved, at);
    return { changed: true, value: admin ? saved : systemPerson(saved) };
  }
  function saveRole(principalId, values, revision, scope, at) {
    keys(values, ['id', 'name', 'scopeType', 'permissions', 'copyFromId']);
    if (scope !== 'organization') err('team-forbidden', 'Manage roles in the Organization scope.');
    const captured = actor(principalId, 'roles.manage', scope), catalogue = roles();
    const previous = values.id ? catalogue.find(item => item.id === values.id) : null;
    if (values.id && !previous) err('team-unavailable', 'This role is unavailable. Reload Roles.');
    if (previous?.protected) err('team-protected-role', 'The Organization administrator role is protected. Copy it to make a custom role.');
    expected(previous?.revision || 0, revision);
    const source = values.copyFromId ? catalogue.find(item => item.id === values.copyFromId) : null;
    if (values.copyFromId && !source) err('team-unavailable', 'The role to copy is unavailable. Reload Roles.');
    const candidate = { name: values.name === undefined ? previous?.name || (source ? source.name + ' copy' : '') : values.name, scopeType: values.scopeType || previous?.scopeType || source?.scopeType, permissions: values.permissions === undefined ? previous?.permissions || source?.permissions || [] : values.permissions };
    const validation = Access.validateRole(candidate, catalogue, previous?.id || null);
    if (!validation.ok) err('team-role-details', validation.error);
    candidate.name = candidate.name.trim(); candidate.permissions = [...candidate.permissions].sort();
    if (previous && previous.scopeType !== candidate.scopeType) err('team-role-scope', 'A saved role keeps its scope. Copy it to create a role in another scope.');
    if (previous && previous.name === candidate.name && same([...previous.permissions].sort(), candidate.permissions)) return { changed: false, value: previous };
    if (!previous && catalogue.length >= 100) err('team-budget', 'This development workspace supports up to 100 roles.');
    const id = previous?.id || crypto.randomUUID(), nextRevision = (previous?.revision || 0) + 1;
    db.prepare('INSERT INTO team_roles VALUES(?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET name=excluded.name,permissions=excluded.permissions,revision=excluded.revision').run(id, candidate.name, candidate.scopeType, JSON.stringify(candidate.permissions), 0, nextRevision);
    const affected = db.prepare('SELECT DISTINCT user_id FROM team_grants WHERE role_id=?').all(id);
    for (const person of affected) { db.prepare('UPDATE team_users SET revision=revision+1,access_revision=access_revision+1,updated_at=? WHERE id=?').run(at, person.user_id); onAccessChanged(person.user_id); }
    const saved = role(db.prepare('SELECT * FROM team_roles WHERE id=?').get(id));
    emit(captured, previous ? 'role-updated' : 'role-created', { type: 'role', id, revision: nextRevision }, previous, saved, at);
    return { changed: true, value: saved };
  }
  function removeRole(principalId, values, revision, scope, at) {
    keys(values, ['id']); if (scope !== 'organization') err('team-forbidden', 'Manage roles in the Organization scope.');
    const captured = actor(principalId, 'roles.manage', scope), previous = role(db.prepare('SELECT * FROM team_roles WHERE id=?').get(values.id));
    if (!previous) err('team-unavailable', 'This role is unavailable. Reload Roles.');
    expected(previous.revision, revision);
    if (previous.protected) err('team-protected-role', 'Keep the protected Organization administrator role.');
    if (db.prepare('SELECT 1 FROM team_grants WHERE role_id=? LIMIT 1').get(previous.id)) err('team-role-in-use', 'This role is assigned to a person. Replace or remove its grants before removing it.');
    db.prepare('DELETE FROM team_roles WHERE id=?').run(previous.id);
    emit(captured, 'role-removed', { type: 'role', id: previous.id, revision: previous.revision }, previous, null, at);
    return { changed: true, value: { id: previous.id, removed: true } };
  }
  function binding() {
    const workspace = native(), system = workspace.systems?.find(item => !item.deleted_at && item.values.system_id === SYSTEM_ID);
    const assessment = workspace.assessments?.entries?.find(item => !item.deleted_at && item.record_id === ASSESSMENT_ID);
    const review = assessment?.review?.find(item => !item.deleted_at && item.values.id === TASK_ID);
    return system && assessment && review ? { system, assessment, review } : null;
  }
  function assignments() {
    const row = db.prepare('SELECT * FROM team_assignments WHERE system_id=? AND task_id=?').get(SYSTEM_ID, TASK_ID);
    return { systemId: SYSTEM_ID, taskId: TASK_ID, revision: row?.revision || 0, systemOwnerId: row?.system_owner_id || '', technicalOwnerId: row?.technical_owner_id || '', reviewerId: row?.reviewer_id || '', decisionMakerId: row?.decision_maker_id || '' };
  }
  function saveAssignments(principalId, values, revision, scope, at) {
    keys(values, ['systemId', 'taskId', ...Access.ASSIGNMENT_FIELDS.map(field => field.id)]);
    if (scope !== SYSTEM_ID || values.systemId !== SYSTEM_ID || values.taskId !== TASK_ID) err('team-forbidden', 'This assignment scope is not connected.');
    const captured = actor(principalId, 'task.assign', scope);
    if (!binding()) err('team-unavailable', 'The saved task is unavailable. Keep current assignments and reload the system workspace.');
    const previous = assignments(); expected(previous.revision, revision);
    const next = { ...previous };
    for (const field of Access.ASSIGNMENT_FIELDS) {
      if (values[field.id] === undefined) continue;
      if (typeof values[field.id] !== 'string') err('team-assignment', 'Select an active eligible person or leave the responsibility unassigned.');
      if (values[field.id] && !can(values[field.id], field.permission, scope).allowed) err('team-assignment', 'The selected person needs active system access and permission for this responsibility.');
      next[field.id] = values[field.id];
    }
    if (same(previous, next)) return { changed: false, value: previous };
    next.revision++;
    db.prepare(`INSERT INTO team_assignments VALUES(?,?,?,?,?,?,?) ON CONFLICT(system_id,task_id) DO UPDATE SET revision=excluded.revision,system_owner_id=excluded.system_owner_id,technical_owner_id=excluded.technical_owner_id,reviewer_id=excluded.reviewer_id,decision_maker_id=excluded.decision_maker_id`).run(SYSTEM_ID, TASK_ID, next.revision, next.systemOwnerId || null, next.technicalOwnerId || null, next.reviewerId || null, next.decisionMakerId || null);
    emit(captured, 'assignments-updated', { type: 'task-assignments', id: TASK_ID, revision: next.revision }, previous, next, at);
    return { changed: true, value: next };
  }
  function wizard(id) {
    const row = db.prepare('SELECT * FROM team_wizard WHERE user_id=?').get(id);
    return row ? { revision: row.revision, step: row.step, completedSteps: JSON.parse(row.completed_steps), finished: !!row.finished } : { revision: 0, step: 1, completedSteps: [], finished: false };
  }
  function saveWizard(principalId, values, revision, scope, at) {
    keys(values, ['step', 'completedSteps', 'finished']);
    if (scope !== 'organization') err('team-forbidden', 'Workspace setup uses Organization access.');
    const captured = actor(principalId, 'organization.edit', scope), previous = wizard(principalId); expected(previous.revision, revision);
    if (!Number.isSafeInteger(values.step) || values.step < 1 || values.step > 4 || !Array.isArray(values.completedSteps) || values.completedSteps.length > 4 || values.completedSteps.some(item => !Number.isSafeInteger(item) || item < 1 || item > 4) || new Set(values.completedSteps).size !== values.completedSteps.length || typeof values.finished !== 'boolean') err('team-wizard', 'Choose a supported setup step. Setup progress does not save governance facts or approvals.');
    const next = { revision: previous.revision, step: values.step, completedSteps: [...values.completedSteps].sort(), finished: values.finished };
    if (same(previous, next)) return { changed: false, value: previous };
    next.revision++;
    db.prepare('INSERT INTO team_wizard VALUES(?,?,?,?,?) ON CONFLICT(user_id) DO UPDATE SET revision=excluded.revision,step=excluded.step,completed_steps=excluded.completed_steps,finished=excluded.finished').run(principalId, next.revision, next.step, JSON.stringify(next.completedSteps), next.finished ? 1 : 0);
    emit(captured, 'setup-navigation-saved', { type: 'wizard', id: principalId, revision: next.revision }, previous, next, at);
    return { changed: true, value: next };
  }
  function command(principalId, input) {
    keys(input, ['id', 'command', 'scope', 'expectedRevision', 'payload']);
    if (typeof input.id !== 'string' || !/^[-\w]{8,120}$/.test(input.id)) err('team-operation-id', 'Use a stable operation identifier.');
    const handlers = { save_person: savePerson, save_role: saveRole, remove_role: removeRole, save_assignments: saveAssignments, save_wizard: saveWizard };
    if (!Object.hasOwn(handlers, input.command)) err('team-command', 'This team command is not connected.');
    const hash = fingerprint({ principalId, ...input });
    return transaction(() => {
      const principal = account(principalId);
      if (!principal || principal.status !== 'active') err('team-forbidden', 'Sign in with an active account before using this action.');
      // Recheck current authority even for an idempotent replay.
      const permission = input.command === 'save_person' ? (can(principalId, 'people.manage', 'organization').allowed ? 'people.manage' : 'system.access.manage') : ({ save_role: 'roles.manage', remove_role: 'roles.manage', save_assignments: 'task.assign', save_wizard: 'organization.edit' })[input.command];
      requirePermission(principalId, permission, input.scope);
      if (input.command === 'save_person' && permission === 'system.access.manage') existingSystemPerson(input.payload?.id);
      const old = db.prepare('SELECT * FROM team_operations WHERE id=?').get(input.id);
      if (old) {
        if (old.actor_id !== principalId || old.scope !== input.scope) err('team-forbidden', 'This operation is unavailable to this account.');
        if (old.digest !== hash) err('team-operation-conflict', 'This operation ID already has different values. Reload the saved result before trying another change.');
        return JSON.parse(old.result);
      }
      if (db.prepare('SELECT count(*) AS n FROM team_operations').get().n >= 10000) err('team-budget', 'This bounded development workspace has reached its technical event budget.');
      const result = { ok: true, ...handlers[input.command](principalId, input.payload, input.expectedRevision, input.scope, new Date().toISOString()) };
      db.prepare('INSERT INTO team_operations VALUES(?,?,?,?,?)').run(input.id, principalId, input.scope, hash, JSON.stringify(result));
      return copy(result);
    });
  }
  function context(id) {
    const principal = account(id);
    if (!principal || principal.status !== 'active') err('team-forbidden', 'Sign in with an active account to open your work.');
    const organization = Access.permissionsFor(state(), id, 'organization');
    const systemPermissions = can(id, 'system.view', SYSTEM_ID).allowed ? Access.permissionsFor(state(), id, 'docent') : [];
    const managePeople = organization.includes('people.manage'), manageSystem = systemPermissions.includes('system.access.manage');
    const people = managePeople ? state().people.map(person => account(person.id)) : manageSystem ? state().people.map(person => account(person.id)).filter(person => person.id === id || person.grants.some(grant => grant.scope === SYSTEM_ID)).map(systemPerson) : [principal];
    const accessibleRoles = roles().filter(item => managePeople || organization.includes('roles.manage') || manageSystem && item.scopeType === 'system' || principal.grants.some(grant => grant.roleId === item.id));
    const bound = systemPermissions.length ? binding() : null;
    return { principal, organization: organization.length ? { permissions: organization } : null, systems: bound ? [{ id: SYSTEM_ID, name: bound.system.values.name, permissions: systemPermissions, assignments: assignments() }] : [], people, roles: accessibleRoles, wizard: organization.includes('organization.edit') ? wizard(id) : null, mode: 'isolated-team-identity', governedWritesConnected: false };
  }
  function myWork(id) {
    const person = account(id);
    if (!person || person.status !== 'active') err('team-forbidden', 'Sign in with an active account to open your work.');
    if (!can(id, 'system.view', SYSTEM_ID).allowed) return { items: [], emptyReason: 'No assigned work is available with your current access.' };
    const assigned = assignments();
    const responsibilities = Access.ASSIGNMENT_FIELDS.filter(field => assigned[field.id] === id && can(id, field.permission, SYSTEM_ID).allowed).map(field => ({ id: field.id, label: field.label }));
    const bound = responsibilities.length ? binding() : null;
    if (!bound) return { items: [], emptyReason: 'No assigned work is available with your current access.' };
    return { items: [{ id: TASK_ID, assessmentId: ASSESSMENT_ID, systemId: SYSTEM_ID, systemName: bound.system.values.name, title: 'Transcript access', question: bound.review.values.question, status: bound.review.values.result, revision: bound.review.revision, assignmentRevision: assigned.revision, kind: 'design-review', responsibilities, governedWritesConnected: false }], emptyReason: null };
  }
  function events(id) {
    requirePermission(id, 'people.manage', 'organization');
    return db.prepare('SELECT body FROM team_events ORDER BY rowid DESC LIMIT 500').all().map(row => JSON.parse(row.body));
  }
  return Object.freeze({ bootstrapPerson, account, findByIdentifier, can, context, command, myWork, wizard, events, normalizeIdentifier });
}
module.exports = Object.freeze({ create, SYSTEM_ID, ASSESSMENT_ID, TASK_ID, normalizeIdentifier });
