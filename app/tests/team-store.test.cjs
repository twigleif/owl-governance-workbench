'use strict';
const test = require('node:test'), assert = require('node:assert/strict'), crypto = require('node:crypto'), fs = require('node:fs'), os = require('node:os'), path = require('node:path');
const { DatabaseSync } = require('node:sqlite');
const Team = require('../team-store.cjs');
const fixture = require('../core/docent-working-case.cjs').create().nativeFixture.workspace;
const nativeHash = value => crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex');
const ADMIN = 'user-0000000000000001';
const SYSTEM = Team.SYSTEM_ID;
function harness(filename = ':memory:') {
  const db = new DatabaseSync(filename); db.exec('PRAGMA foreign_keys=ON');
  const source = structuredClone(fixture), before = nativeHash(source), callbacks = [], activations = [];
  let failure = '', store;
  const fail = (message, code) => { throw Object.assign(Error(message), { code }); };
  const transaction = fn => { if (db.isTransaction) return fn(); db.exec('BEGIN IMMEDIATE'); try { const result = fn(); if (failure === 'before') throw Error('Injected precommit'); db.exec('COMMIT'); if (failure === 'after') throw Error('Injected postcommit'); return result; } catch (error) { if (db.isTransaction) db.exec('ROLLBACK'); throw error; } };
  store = Team.create({ db, transaction, native: () => source, activate: name => { assert(db.isTransaction); activations.push(name); }, fail, onAccessChanged: id => callbacks.push(id) });
  return { db, store, callbacks, activations, source, before, failure: value => { failure = value; }, close: () => { assert.equal(nativeHash(source), before); db.close(); } };
}
function bootstrap(h) { return h.store.bootstrapPerson({ id: ADMIN, name: 'First administrator', identifier: 'Admin@owl.local' }, '2026-10-18T00:00:00.000Z'); }
function request(command, scope, payload, expectedRevision = 0) { return { id: crypto.randomUUID(), command, scope, payload, expectedRevision }; }
function person(h, payload = {}) { return h.store.command(ADMIN, request('save_person', 'organization', { name: 'Technical owner', identifier: crypto.randomUUID() + '@owl.local', grants: [{ roleId: 'contributor', scope: SYSTEM }], ...payload })).value; }
function update(h, id, payload, actor = ADMIN, scope = 'organization', revision = h.store.account(id).revision) { return h.store.command(actor, request('save_person', scope, { id, ...payload }, revision)); }
function assign(h, fields, expectedRevision = h.store.context(ADMIN).systems[0]?.assignments.revision || 0) { return h.store.command(ADMIN, request('save_assignments', SYSTEM, { systemId: SYSTEM, taskId: Team.TASK_ID, ...fields }, expectedRevision)); }
function grantAdminSystem(h) { return update(h, ADMIN, { grants: [...h.store.account(ADMIN).grants, { roleId: 'system-manager', scope: SYSTEM }] }); }

test('team tables stay empty until atomic first-admin bootstrap; no sample accounts or system grant', () => {
  const h = harness();
  for (const name of ['team_users', 'team_roles', 'team_grants', 'team_assignments', 'team_wizard', 'team_events', 'team_operations']) assert.equal(h.db.prepare('SELECT count(*) AS n FROM ' + name).get().n, 0);
  const first = bootstrap(h);
  assert.equal(first.id, ADMIN); assert.equal(first.identifierKey, 'admin@owl.local'); assert.equal(first.accessRevision, 1);
  assert.deepEqual(first.grants, [{ roleId: 'org-admin', scope: 'organization' }]);
  assert.equal(h.store.context(ADMIN).roles.length, 7); assert.equal(h.store.can(ADMIN, 'system.view', SYSTEM).allowed, false);
  assert.deepEqual(h.store.myWork(ADMIN).items, []); assert.equal(h.activations.length, 1);
  assert.throws(() => bootstrap(h), error => error.code === 'team-already-setup');
  assert.equal(h.db.prepare('SELECT count(*) AS n FROM team_users').get().n, 1); h.close();
});

test('failed bootstrap rolls back every team row and only a later successful attempt creates administrator', () => {
  const h = harness(); h.failure('before'); assert.throws(() => bootstrap(h), /Injected/);
  assert.equal(h.db.prepare('SELECT count(*) AS n FROM team_users').get().n, 0); assert.equal(h.db.prepare('SELECT count(*) AS n FROM team_roles').get().n, 0);
  h.failure(''); bootstrap(h); assert.equal(h.store.events(ADMIN).length, 1); h.close();
});

test('stable opaque account IDs and case-folded unique local identifiers retain explicit role union', () => {
  const h = harness(); bootstrap(h);
  const created = person(h, { identifier: 'Owner@owl.local', grants: [{ roleId: 'contributor', scope: SYSTEM }, { roleId: 'reviewer', scope: SYSTEM }] });
  assert.match(created.id, /^[a-f0-9-]{36}$/); assert.equal(h.store.findByIdentifier(' owner@OWL.local ').id, created.id);
  assert.equal(h.store.can(created.id, 'check.record', SYSTEM).allowed, true); assert.equal(h.store.can(created.id, 'review.record', SYSTEM).allowed, true);
  assert.equal(h.store.can(created.id, 'organization.view', 'organization').allowed, false);
  assert.throws(() => person(h, { identifier: 'owner@OWL.LOCAL' }), error => error.code === 'team-identifier-used');
  const changed = update(h, created.id, { name: 'Changed display', identifier: 'New-owner@owl.local' }).value;
  assert.equal(changed.id, created.id); assert.equal(h.store.findByIdentifier('owner@owl.local'), null); assert.equal(h.store.findByIdentifier('new-owner@owl.local').id, created.id);
  assert.equal(h.callbacks.includes(created.id), true); h.close();
});

test('same-scope union rejects fabricated scopes, unsupported grants, missing system view and role fields', () => {
  const h = harness(); bootstrap(h);
  assert.equal(h.store.can(ADMIN, 'people.manage', SYSTEM).allowed, false); assert.equal(h.store.can(ADMIN, 'people.manage', 'other').allowed, false);
  for (const grants of [[{ roleId: 'org-admin', scope: SYSTEM }], [{ roleId: 'contributor', scope: 'other' }], [{ roleId: 'contributor', scope: SYSTEM }, { roleId: 'contributor', scope: SYSTEM }]]) assert.throws(() => person(h, { grants }), error => error.code === 'team-details');
  assert.throws(() => h.store.command(ADMIN, request('save_role', 'organization', { name: 'Bad role', scopeType: 'system', permissions: ['check.record'] })), error => error.code === 'team-role-details');
  assert.throws(() => person(h, { actorId: ADMIN }), error => error.code === 'team-details');
  assert.throws(() => h.store.command(ADMIN, { ...request('save_role', 'organization', {}), actorId: ADMIN }), error => error.code === 'team-details'); h.close();
});

test('system managers change existing system grants only; no identity, organization, account creation or org-data leak', () => {
  const h = harness(); bootstrap(h); const manager = person(h, { grants: [{ roleId: 'system-manager', scope: SYSTEM }] }), target = person(h, { grants: [{ roleId: 'contributor', scope: SYSTEM }, { roleId: 'org-member', scope: 'organization' }] });
  const changed = update(h, target.id, { grants: [{ roleId: 'reviewer', scope: SYSTEM }] }, manager.id, SYSTEM);
  assert(!Object.hasOwn(changed.value, 'identifier')); assert(changed.value.grants.every(grant => grant.scope === SYSTEM));
  assert(h.store.account(target.id).grants.some(grant => grant.roleId === 'org-member'));
  for (const value of [{ name: 'Forged' }, { identifier: 'different@owl.local' }, { status: 'inactive' }, { grants: [{ roleId: 'org-admin', scope: 'organization' }] }]) assert.throws(() => update(h, target.id, value, manager.id, SYSTEM), error => error.code === 'team-forbidden');
  assert.throws(() => h.store.command(manager.id, request('save_person', SYSTEM, { name: 'New', identifier: 'new@owl.local', grants: [] })), error => error.code === 'team-forbidden');
  const projection = h.store.context(manager.id);
  assert.equal(projection.organization, null); assert(projection.people.every(item => !Object.hasOwn(item, 'identifier'))); assert(projection.people.every(item => item.grants.every(grant => grant.scope === SYSTEM)));
  assert(!JSON.stringify(projection).includes('Admin@owl.local')); h.close();
});

test('last active administrator, protected administrator role and role-in-use guards execute inside shared transaction', () => {
  const h = harness(); bootstrap(h);
  for (const payload of [{ status: 'inactive' }, { grants: [] }]) assert.throws(() => update(h, ADMIN, payload), error => error.code === 'team-last-admin');
  assert.equal(h.store.account(ADMIN).revision, 1);
  assert.throws(() => h.store.command(ADMIN, request('save_role', 'organization', { id: 'org-admin', name: 'Changed' }, 1)), error => error.code === 'team-protected-role');
  assert.throws(() => h.store.command(ADMIN, request('remove_role', 'organization', { id: 'org-admin' }, 1)), error => error.code === 'team-protected-role');
  person(h); assert.throws(() => h.store.command(ADMIN, request('remove_role', 'organization', { id: 'contributor' }, 1)), error => error.code === 'team-role-in-use');
  const second = person(h, { grants: [{ roleId: 'org-admin', scope: 'organization' }] }); update(h, ADMIN, { status: 'inactive' }, second.id); assert.equal(h.store.account(ADMIN).status, 'inactive'); h.close();
});

test('custom roles copy supported permissions, keep scope, revoke affected access sessions, and retain captured historical attribution', () => {
  const h = harness(); bootstrap(h);
  const saved = h.store.command(ADMIN, request('save_role', 'organization', { copyFromId: 'contributor', name: 'Evidence author' })).value;
  const owner = person(h, { grants: [{ roleId: saved.id, scope: SYSTEM }] });
  assert.equal(h.store.can(owner.id, 'check.record', SYSTEM).allowed, true);
  const changed = h.store.command(ADMIN, request('save_role', 'organization', { id: saved.id, name: 'Evidence reader', permissions: ['system.view'] }, saved.revision)).value;
  assert.equal(changed.revision, 2); assert.equal(h.store.can(owner.id, 'check.record', SYSTEM).allowed, false); assert(h.callbacks.includes(owner.id)); assert.equal(h.store.account(owner.id).accessRevision, 2);
  assert.throws(() => h.store.command(ADMIN, request('save_role', 'organization', { id: saved.id, scopeType: 'organization', permissions: ['organization.view'] }, 2)), error => error.code === 'team-role-scope');
  const old = h.store.events(ADMIN).find(event => event.action === 'role-created'); assert.equal(old.actor.name, 'First administrator'); assert.equal(old.after.name, 'Evidence author'); assert.equal(old.actor.roleBasis[0].revision, 1);
  update(h, ADMIN, { name: 'New administrator name' }); assert.equal(h.store.events(ADMIN).find(event => event.id === old.id).actor.name, 'First administrator'); h.close();
});

test('team commands use CAS, actor+scope-bound idempotency and authorization recheck even for replay', () => {
  const h = harness(); bootstrap(h);
  const operation = request('save_person', 'organization', { name: 'One person', identifier: 'one@owl.local', grants: [] });
  const first = h.store.command(ADMIN, operation), count = h.store.events(ADMIN).length;
  assert.deepEqual(h.store.command(ADMIN, operation), first); assert.equal(h.store.events(ADMIN).length, count);
  assert.throws(() => h.store.command(ADMIN, { ...operation, payload: { ...operation.payload, name: 'Other' } }), error => error.code === 'team-operation-conflict');
  const second = person(h, { grants: [{ roleId: 'org-admin', scope: 'organization' }] });
  assert.throws(() => h.store.command(second.id, operation), error => error.code === 'team-forbidden');
  update(h, first.value.id, { name: 'Current' }); assert.throws(() => update(h, first.value.id, { name: 'Stale' }, ADMIN, 'organization', 1), error => error.code === 'team-conflict');
  update(h, ADMIN, { grants: [] }, second.id); assert.throws(() => h.store.command(ADMIN, operation), error => error.code === 'team-forbidden'); h.close();
});

test('failure before commit leaves all metadata exact; lost after-commit response resolves by same operation once', () => {
  const h = harness(); bootstrap(h); const operation = request('save_person', 'organization', { name: 'Late response', identifier: 'late@owl.local', grants: [] });
  h.failure('before'); assert.throws(() => h.store.command(ADMIN, operation), /Injected/); assert.equal(h.store.findByIdentifier('late@owl.local'), null);
  h.failure('after'); assert.throws(() => h.store.command(ADMIN, operation), /Injected/); const saved = h.store.findByIdentifier('late@owl.local'); assert(saved);
  h.failure(''); const count = h.store.events(ADMIN).length; assert.equal(h.store.command(ADMIN, operation).value.id, saved.id); assert.equal(h.store.events(ADMIN).length, count); h.close();
});

test('named assignments resolve exact saved Review, allow multiple responsibilities and self-review without inventing operating evidence', () => {
  const h = harness(); bootstrap(h); grantAdminSystem(h);
  const owner = person(h, { grants: [{ roleId: 'contributor', scope: SYSTEM }, { roleId: 'reviewer', scope: SYSTEM }] });
  assert.deepEqual(h.store.myWork(owner.id).items, []);
  assign(h, { systemOwnerId: owner.id, technicalOwnerId: owner.id, reviewerId: owner.id });
  const work = h.store.myWork(owner.id).items;
  assert.equal(work.length, 1); assert.equal(work[0].id, Team.TASK_ID); assert.equal(work[0].assessmentId, Team.ASSESSMENT_ID); assert.equal(work[0].kind, 'design-review'); assert.equal(work[0].status, 'Not reviewed'); assert.equal(work[0].responsibilities.length, 3);
  assert.equal(work[0].governedWritesConnected, false); assert(!JSON.stringify(work).includes('body')); assert(!JSON.stringify(work).includes('SIM-DOCENT-REC-PLAN-001'));
  assert.throws(() => assign(h, { decisionMakerId: owner.id }), error => error.code === 'team-assignment');
  assert.throws(() => h.store.command(ADMIN, request('save_assignments', SYSTEM, { systemId: SYSTEM, taskId: 'wrong', reviewerId: owner.id }, 1)), error => error.code === 'team-forbidden');
  update(h, owner.id, { status: 'inactive' }); assert.throws(() => h.store.myWork(owner.id), error => error.code === 'team-forbidden');
  assert.equal(h.store.context(ADMIN).systems[0].assignments.reviewerId, owner.id); h.close();
});

test('revoked permissions remove My work immediately while retained assignments remain for explicit reassignment', () => {
  const h = harness(); bootstrap(h); grantAdminSystem(h); const owner = person(h);
  assign(h, { technicalOwnerId: owner.id }); assert.equal(h.store.myWork(owner.id).items.length, 1);
  update(h, owner.id, { grants: [{ roleId: 'viewer', scope: SYSTEM }] }); assert.deepEqual(h.store.myWork(owner.id).items, []);
  update(h, owner.id, { grants: [] }); assert.deepEqual(h.store.context(owner.id).systems, []); assert.deepEqual(h.store.myWork(owner.id).items, []);
  assert.equal(h.store.context(ADMIN).systems[0].assignments.technicalOwnerId, owner.id); h.close();
});

test('wizard saves only per-person navigation metadata with CAS, never facts, files, framework activation or approval', () => {
  const h = harness(); bootstrap(h);
  assert.deepEqual(h.store.wizard(ADMIN), { revision: 0, step: 1, completedSteps: [], finished: false });
  const saved = h.store.command(ADMIN, request('save_wizard', 'organization', { step: 2, completedSteps: [1], finished: false })).value;
  assert.equal(saved.revision, 1); assert.equal(saved.step, 2);
  assert.throws(() => h.store.command(ADMIN, request('save_wizard', 'organization', { step: 2, completedSteps: [1], finished: false }, 0)), error => error.code === 'team-conflict');
  assert.throws(() => h.store.command(ADMIN, request('save_wizard', 'organization', { step: 2, completedSteps: [1], finished: false, description: 'Fact' }, 1)), error => error.code === 'team-details');
  const other = person(h, { grants: [{ roleId: 'org-admin', scope: 'organization' }] }); assert.equal(h.store.wizard(other.id).revision, 0);
  const ordinary = person(h); assert.throws(() => h.store.command(ordinary.id, request('save_wizard', 'organization', { step: 1, completedSteps: [], finished: false })), error => error.code === 'team-forbidden'); h.close();
});

test('unknown commands, principal spoofing and forbidden technical log reads refuse without governance or credential leakage', () => {
  const h = harness(); bootstrap(h); const viewer = person(h, { grants: [{ roleId: 'viewer', scope: SYSTEM }] });
  assert.throws(() => h.store.command(ADMIN, request('record_decision', SYSTEM, {})), error => error.code === 'team-command');
  assert.throws(() => h.store.events(viewer.id), error => error.code === 'team-forbidden');
  const result = h.store.context(viewer.id); assert.equal(result.people.length, 1); assert.equal(result.people[0].id, viewer.id); assert.equal(result.wizard, null);
  const serialized = JSON.stringify({ events: h.store.events(ADMIN), context: h.store.context(ADMIN) });
  for (const forbidden of ['password', 'credential', 'verifier', 'cookie', 'SIM-DOCENT-REC-PLAN-001']) assert(!serialized.includes(forbidden));
  h.close();
});

test('durable metadata reopens exactly and a second connection cannot overwrite stale person or role changes', () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'owl-team-meta-')), filename = path.join(directory, 'isolated.sqlite');
  let first, second;
  try {
    first = harness(filename); bootstrap(first); grantAdminSystem(first);
    const owner = person(first), saved = assign(first, { technicalOwnerId: owner.id }).value;
    const before = { person: first.store.account(owner.id), context: first.store.context(ADMIN), work: first.store.myWork(owner.id), events: first.store.events(ADMIN) };
    first.close(); first = null;
    second = harness(filename); assert.deepEqual(second.store.account(owner.id), before.person); assert.deepEqual(second.store.context(ADMIN), before.context); assert.deepEqual(second.store.myWork(owner.id), before.work); assert.deepEqual(second.store.events(ADMIN), before.events);
    first = harness(filename); const oldRevision = second.store.account(owner.id).revision;
    update(first, owner.id, { name: 'New saved name' }); assert.throws(() => update(second, owner.id, { name: 'Stale second connection' }, ADMIN, 'organization', oldRevision), error => error.code === 'team-conflict');
    const custom = first.store.command(ADMIN, request('save_role', 'organization', { name: 'Shared custom role', copyFromId: 'viewer' })).value;
    first.store.command(ADMIN, request('save_role', 'organization', { id: custom.id, name: 'Updated custom role' }, custom.revision));
    assert.throws(() => second.store.command(ADMIN, request('save_role', 'organization', { id: custom.id, name: 'Stale role' }, custom.revision)), error => error.code === 'team-conflict');
    assert.equal(second.store.context(ADMIN).systems[0].assignments.revision, saved.revision);
    assert.throws(() => bootstrap(second), error => error.code === 'team-already-setup');
  } finally {
    if (first) first.close(); if (second) second.close(); fs.unlinkSync(filename); fs.rmdirSync(directory);
  }
});

test('team events and operation receipts are immutable in SQLite while normal command replay remains exact', () => {
  const h = harness(); bootstrap(h);
  const input = request('save_person', 'organization', { name: 'Saved person', identifier: 'immutable@owl.local', grants: [] });
  const saved = h.store.command(ADMIN, input), beforeEvents = h.store.events(ADMIN), beforeReceipt = h.db.prepare('SELECT * FROM team_operations WHERE id=?').get(input.id);
  for (const table of ['team_events', 'team_operations']) {
    assert.throws(() => h.db.exec('UPDATE ' + table + ' SET scope=scope'), /append-only|immutable/);
    assert.throws(() => h.db.exec('DELETE FROM ' + table), /append-only|immutable/);
  }
  assert.deepEqual(h.store.events(ADMIN), beforeEvents); assert.deepEqual(h.db.prepare('SELECT * FROM team_operations WHERE id=?').get(input.id), beforeReceipt);
  assert.deepEqual(h.store.command(ADMIN, input), saved); h.close();
});

test('system managers cannot list, modify or probe unrelated organization people or replay their removed system access', () => {
  const h = harness(); bootstrap(h);
  const manager = person(h, { grants: [{ roleId: 'system-manager', scope: SYSTEM }] });
  const unrelated = person(h, { name: 'Unrelated organization person', identifier: 'unrelated@owl.local', grants: [{ roleId: 'org-member', scope: 'organization' }] });
  const projection = h.store.context(manager.id);
  assert(!projection.people.some(item => item.id === unrelated.id || item.id === ADMIN)); assert(projection.people.some(item => item.id === manager.id)); assert(!JSON.stringify(projection).includes(unrelated.name));
  const attempts = [unrelated.id, crypto.randomUUID()];
  for (const id of attempts) assert.throws(() => update(h, id, { grants: [{ roleId: 'viewer', scope: SYSTEM }] }, manager.id, SYSTEM, 1), error => error.code === 'team-forbidden' && !error.message.includes(unrelated.name));
  update(h, unrelated.id, { grants: [...unrelated.grants, { roleId: 'viewer', scope: SYSTEM }] });
  assert(h.store.context(manager.id).people.some(item => item.id === unrelated.id));
  const operation = request('save_person', SYSTEM, { id: unrelated.id, grants: [{ roleId: 'contributor', scope: SYSTEM }] }, h.store.account(unrelated.id).revision);
  h.store.command(manager.id, operation);
  update(h, unrelated.id, { grants: [{ roleId: 'org-member', scope: 'organization' }] });
  assert(!h.store.context(manager.id).people.some(item => item.id === unrelated.id));
  assert.throws(() => h.store.command(manager.id, operation), error => error.code === 'team-forbidden'); h.close();
});
