'use strict';
const test = require('node:test'), assert = require('node:assert/strict');
const crypto = require('node:crypto'), fs = require('node:fs'), os = require('node:os'), path = require('node:path'), http = require('node:http');
const { createServer } = require('../server.cjs');
const { createStore } = require('../store.cjs');
const { DatabaseSync } = require('node:sqlite');
const { SYSTEM_ID, TASK_ID } = require('../team-store.cjs');

// HTTP tests use fictional credentials and isolated directories only. No provider is contacted.
const PASSWORD = 'Fictional cedar river lantern 482!';
const OWNER_PASSWORD = 'Fictional owner meadow lantern 764!';
const workRoot = path.resolve(__dirname, '../../runtime/owl-local/workspace.sqlite');
const deniedLegacy = [
  ['GET', '/api/state'], ['GET', '/api/workspace'], ['GET', '/api/organization'],
  ['GET', '/api/activity'], ['GET', '/api/activity/event?id=known-event'],
  ['GET', '/api/reports'], ['POST', '/api/report/generate'], ['GET', '/api/report?id=known-report'],
  ['GET', '/api/report/file?id=known-report&part=pdf'], ['GET', '/api/report/file?id=known-report&part=page&page=1'],
  ['GET', '/saved-access-brief.pdf'], ['GET', '/app.js'], ['GET', '/app.css'], ['GET', '/sample-portraits.png'], ['GET', '/api/connection'],
  ['GET', '/api/source?id=SIM-DOCENT-REC-PLAN-001'], ['GET', '/api/operation?id=known-operation'],
  ['GET', '/api/run?id=known-run'], ['GET', '/api/chats'], ['GET', '/api/chat?id=known-chat'],
  ['GET', '/api/chat/turn?id=known-turn'], ['GET', '/api/chat/context?id=known-chat'],
  ['POST', '/api/chat/create'], ['POST', '/api/chat/send'], ['POST', '/api/chat/stop'],
  ['POST', '/api/chat/composer'], ['POST', '/api/chat/edit'], ['POST', '/api/command'], ['POST', '/api/agent'],
  ['GET', '/api/authoring'], ['POST', '/api/authoring/prepare'], ['POST', '/api/authoring/command'],
  ['GET', '/api/authoring/version?id=known-document&version=1'], ['GET', '/api/authoring/source?id=known-source'],
  ['POST', '/api/original'], ['GET', '/api/original/info?id=known-original'],
  ['GET', '/api/original/file?id=known-original'], ['GET', '/api/original/preview?id=known-original&page=1'],
  ['GET', '/api/no-such-team-tool'], ['POST', '/api/team/prepare'], ['POST', '/api/team/review'],
  ['POST', '/api/team/apply'], ['POST', '/api/team/decision']
];
function client(base) {
  const cookies = new Map(); let csrf = '';
  async function request(route, { method = 'GET', data, headers = {}, origin = base, token = csrf, cookie = true } = {}) {
    const outgoing = { ...headers };
    if (cookie && cookies.size) outgoing.Cookie = [...cookies].map(([name, value]) => name + '=' + value).join('; ');
    if (method !== 'GET') {
      outgoing['Content-Type'] = 'application/json';
      if (origin !== null) outgoing.Origin = origin;
      if (token !== null && token !== undefined) outgoing['X-OWL-CSRF'] = token;
    }
    const response = await fetch(base + route, { method, headers: outgoing, ...(method === 'GET' ? {} : { body: JSON.stringify(data || {}) }), redirect: 'manual' });
    for (const header of response.headers.getSetCookie()) {
      const pair = header.split(';')[0], index = pair.indexOf('=');
      cookies.set(pair.slice(0, index), pair.slice(index + 1));
    }
    const raw = await response.text(); let value;
    try { value = JSON.parse(raw); } catch { value = raw; }
    if (typeof value?.csrf === 'string') csrf = value.csrf;
    return { status: response.status, value, raw, headers: response.headers };
  }
  return { request, context: () => request('/api/identity/context'), get csrf() { return csrf; }, get cookie() { return [...cookies].map(([name, value]) => name + '=' + value).join('; '); } };
}
async function start(t, filename) {
  const directory = filename ? null : fs.mkdtempSync(path.join(os.tmpdir(), 'owl-team-http-'));
  let calls = 0;
  const forbidden = () => { calls++; throw Error('A provider call is forbidden during identity tests.'); };
  const app = createServer({ database: filename || path.join(directory, 'isolated.sqlite'), seed: true, team: true, agent: { status: forbidden, prepareAccessReview: forbidden, conversation: forbidden } });
  const base = await app.listen(0);
  t.after(async () => { await app.close(); assert.equal(calls, 0); if (directory) fs.rmSync(directory, { recursive: true, force: true }); });
  return { app, base, directory, calls: () => calls };
}
function command(name, scope, payload, expectedRevision = 0, id = crypto.randomUUID()) { return { id, command: name, scope, payload, expectedRevision }; }
function legacyRows(filename, names) {
  const db = new DatabaseSync(filename, { readOnly: true });
  try {
    const tables = names || db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name").all().map(row => row.name);
    return Object.fromEntries(tables.map(name => [name, db.prepare('SELECT * FROM [' + name + '] ORDER BY rowid').all().map(row => Object.fromEntries(Object.entries(row).map(([key, value]) => [key, value instanceof Uint8Array ? { type: 'bytes', base64: Buffer.from(value).toString('base64') } : { type: value === null ? 'null' : typeof value, value }])))]));
  } finally { db.close(); }
}
async function bootstrap(t, filename) {
  const h = await start(t, filename), admin = client(h.base);
  const initial = await admin.context(); assert.equal(initial.status, 200);
  assert.equal(initial.value.mode, 'isolated-team-backend'); assert.equal(initial.value.uiConnected, false);
  assert.equal(initial.value.needsBootstrap, true); assert.equal(initial.value.session, null);
  assert(initial.headers.getSetCookie().some(value => value.startsWith('owl_dev_preauth=') && /HttpOnly/i.test(value) && /SameSite=Strict/i.test(value)));
  const response = await admin.request('/api/identity/bootstrap', { method: 'POST', data: { code: h.app.teamSetupCode, name: 'Fictional administrator', identifier: 'admin@owl.local', password: PASSWORD } });
  assert.equal(response.status, 200, response.raw); assert.equal(response.value.user.name, 'Fictional administrator');
  assert(response.headers.getSetCookie().some(value => value.startsWith('owl_dev_session=') && /HttpOnly/i.test(value) && /SameSite=Strict/i.test(value)));
  return { ...h, admin, adminId: response.value.user.id };
}

test('team transport rejects the current workspace before opening it and remains explicitly API-only', async t => {
  // Prove this build recognizes the isolated switch before testing its live-path refusal.
  const h = await start(t); assert.equal(typeof h.app.teamSetupCode, 'string');
  assert.throws(() => createServer({ team: true, database: workRoot, seed: true }), error => error.code === 'team-isolated-only');
  if (process.platform === 'win32') assert.throws(() => createServer({ team: true, database: workRoot.toUpperCase(), seed: true }), error => error.code === 'team-isolated-only');
  assert.throws(() => createServer({ team: true, seed: true }), error => error.code === 'team-isolated-only');
  const visitor = client(h.base), root = await visitor.request('/');
  assert.equal(root.status, 200); assert.equal(root.value.mode, 'isolated-team-backend'); assert.equal(root.value.uiConnected, false);
  assert(!root.raw.includes('owl-session')); assert(!root.raw.includes('SIM-DOCENT')); assert(!root.raw.includes(PASSWORD));
  assert.equal((await visitor.request('/api/team/context')).status, 401);
  assert.equal((await visitor.request('/api/team/my-work')).status, 401);
});

test('isolated team startup leaves every existing legacy table row exact, including pending operator jobs', async t => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'owl-team-startup-')), filename = path.join(directory, 'isolated.sqlite');
  const prior = createStore(filename, { seed: true }); prior.beginRun('legacy-running-job-00001'); prior.close();
  const before = legacyRows(filename), names = Object.keys(before);
  const h = await start(t, filename);
  assert.deepEqual(legacyRows(filename, names), before);
  assert.equal(h.app.store.run('legacy-running-job-00001').status, 'running');
  assert.equal((await client(h.base).request('/api/run?id=legacy-running-job-00001')).status, 403);
  assert.deepEqual(legacyRows(filename, names), before);
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
});

test('bootstrap and sign-in require the exact origin, preauthentication cookie and CSRF token', async t => {
  const h = await start(t), visitor = client(h.base);
  await visitor.context();
  const data = { code: h.app.teamSetupCode, name: 'Fictional administrator', identifier: 'admin@owl.local', password: PASSWORD };
  for (const options of [{ token: null }, { token: 'forged' }, { cookie: false }, { origin: null }, { origin: 'https://outside.invalid' }]) {
    const result = await visitor.request('/api/identity/bootstrap', { method: 'POST', data, ...options });
    assert.equal(result.status, 403, result.raw); assert(!result.raw.includes(data.code)); assert(!result.raw.includes(PASSWORD));
  }
  // Node fetch normalizes Host; a raw HTTP request verifies the actual wrong-Host boundary.
  const wrongHost = await new Promise((resolve, reject) => {
    const request = http.get(h.base + '/api/identity/context', { headers: { Host: 'localhost:' + new URL(h.base).port } }, response => { response.resume(); response.on('end', () => resolve(response.statusCode)); });
    request.on('error', reject);
  });
  assert.equal(wrongHost, 403);
  assert.equal((await visitor.context()).value.needsBootstrap, true);
  const saved = await visitor.request('/api/identity/bootstrap', { method: 'POST', data }); assert.equal(saved.status, 200, saved.raw);
  const newVisitor = client(h.base); await newVisitor.context();
  const duplicate = await newVisitor.request('/api/identity/bootstrap', { method: 'POST', data });
  assert(duplicate.status >= 400); assert.equal((await newVisitor.context()).value.needsBootstrap, false);
  const bad = await newVisitor.request('/api/identity/login', { method: 'POST', data: { identifier: 'admin@owl.local', password: 'Incorrect fictional password' } });
  const unknown = await newVisitor.request('/api/identity/login', { method: 'POST', data: { identifier: 'unknown@owl.local', password: 'Incorrect fictional password' } });
  assert.equal(bad.status, unknown.status); assert.deepEqual(bad.value, unknown.value);
});

test('real HTTP account enrollment, own password, assignment and current My work survive reauthentication', async t => {
  const h = await bootstrap(t), { admin } = h;
  let context = (await admin.request('/api/team/context')).value;
  assert.equal(context.principal.id, h.adminId); assert.equal(context.systems.length, 0);
  assert.deepEqual((await admin.request('/api/team/my-work')).value.items, []);
  // Organization administration alone does not grant any Docent access.
  const self = context.people.find(person => person.id === h.adminId);
  const selfGrant = await admin.request('/api/team/command', { method: 'POST', data: command('save_person', 'organization', { id: h.adminId, grants: [...self.grants, { roleId: 'system-manager', scope: SYSTEM_ID }] }, self.revision) });
  assert.equal(selfGrant.status, 200, selfGrant.raw);
  // Changing one's own access revokes the old session; sign in again explicitly.
  await admin.context();
  const signed = await admin.request('/api/identity/login', { method: 'POST', data: { identifier: 'admin@owl.local', password: PASSWORD } }); assert.equal(signed.status, 200, signed.raw);
  const createOwner = command('save_person', 'organization', { name: 'Fictional technical owner', identifier: 'owner@owl.local', grants: [{ roleId: 'contributor', scope: SYSTEM_ID }, { roleId: 'reviewer', scope: SYSTEM_ID }] });
  const created = await admin.request('/api/team/command', { method: 'POST', data: createOwner });
  assert.equal(created.status, 200, created.raw); const ownerId = created.value.value.id;
  const issued = await admin.request('/api/identity/temporary', { method: 'POST', data: { targetId: ownerId } }); assert.equal(issued.status, 200, issued.raw);
  assert.equal(issued.value.targetId, ownerId); assert.equal(typeof issued.value.code, 'string');
  const owner = client(h.base); await owner.context();
  const enrolled = await owner.request('/api/identity/enroll', { method: 'POST', data: { code: issued.value.code } }); assert.equal(enrolled.status, 200, enrolled.raw);
  assert.equal((await owner.request('/api/team/context')).status, 401);
  const setupWrite = await owner.request('/api/team/command', { method: 'POST', data: command('save_role', 'organization', { name: 'Forged role', scopeType: 'organization', permissions: ['people.manage'] }) }); assert.equal(setupWrite.status, 401);
  const completed = await owner.request('/api/identity/set-password', { method: 'POST', data: { password: OWNER_PASSWORD } }); assert.equal(completed.status, 200, completed.raw);
  assert.equal(completed.value.user.id, ownerId);
  const stolenReplay = await owner.request('/api/team/command', { method: 'POST', data: createOwner, headers: { 'X-OWL-Actor': h.adminId } });
  assert.equal(stolenReplay.status, 403, stolenReplay.raw); assert(!stolenReplay.raw.includes('Fictional technical owner'));
  const reused = client(h.base); await reused.context();
  assert((await reused.request('/api/identity/enroll', { method: 'POST', data: { code: issued.value.code } })).status >= 400);
  const before = (await admin.request('/api/team/context')).value;
  const assigned = await admin.request('/api/team/command', { method: 'POST', data: command('save_assignments', SYSTEM_ID, { systemId: SYSTEM_ID, taskId: TASK_ID, technicalOwnerId: ownerId, reviewerId: ownerId }, before.systems[0].assignments.revision) }); assert.equal(assigned.status, 200, assigned.raw);
  const work = await owner.request('/api/team/my-work'); assert.equal(work.status, 200, work.raw); assert.equal(work.value.items.length, 1);
  assert.equal(work.value.items[0].id, TASK_ID); assert.equal(work.value.items[0].kind, 'design-review'); assert.equal(work.value.items[0].governedWritesConnected, false);
  assert.deepEqual(work.value.items[0].responsibilities.map(item => item.id).sort(), ['reviewerId', 'technicalOwnerId']);
  const ownerContext = await owner.request('/api/team/context'); assert.equal(ownerContext.value.organization, null); assert.equal(ownerContext.value.wizard, null);
  assert.equal((await owner.request('/api/team/wizard')).status, 403);
  assert(!ownerContext.raw.includes('admin@owl.local'));
  const ownStatus = await owner.request('/api/identity/status'); assert.equal(ownStatus.status, 200, ownStatus.raw);
  const managedStatus = await admin.request('/api/identity/status?targetId=' + ownerId); assert.equal(managedStatus.status, 200, managedStatus.raw);
  assert.equal((await owner.request('/api/identity/status?targetId=' + h.adminId)).status, 403);
  for (const response of [ownStatus, managedStatus]) {
    assert(!response.raw.includes(issued.value.code)); assert(!response.raw.includes(OWNER_PASSWORD));
    assert(!/\"(?:salt|hash|verifier|password|code)\"\s*:/i.test(response.raw));
  }
  const signOut = await owner.request('/api/identity/logout', { method: 'POST', data: {} }); assert.equal(signOut.status, 200, signOut.raw);
  assert.equal((await owner.request('/api/team/my-work')).status, 401);
  await owner.context(); const back = await owner.request('/api/identity/login', { method: 'POST', data: { identifier: 'OWNER@OWL.LOCAL', password: OWNER_PASSWORD } }); assert.equal(back.status, 200, back.raw);
  assert.equal((await owner.request('/api/team/my-work')).value.items[0].id, TASK_ID);
  const events = await admin.request('/api/team/events'); assert.equal(events.status, 200, events.raw);
  assert(!events.raw.includes(PASSWORD)); assert(!events.raw.includes(OWNER_PASSWORD)); assert(!events.raw.includes(issued.value.code));
  assert(!/\"(?:salt|hash|verifier|password)\"\s*:/i.test(events.raw));
  const savedOwner = (await admin.request('/api/team/context')).value.people.find(person => person.id === ownerId);
  const removed = await admin.request('/api/team/command', { method: 'POST', data: command('save_person', 'organization', { id: ownerId, grants: [] }, savedOwner.revision) }); assert.equal(removed.status, 200, removed.raw);
  assert.equal((await owner.request('/api/team/my-work')).status, 401);
  await owner.context(); assert.equal((await owner.request('/api/identity/login', { method: 'POST', data: { identifier: 'owner@owl.local', password: OWNER_PASSWORD } })).status, 200);
  assert.deepEqual((await owner.request('/api/team/my-work')).value.items, []);
});

test('all legacy routes, originals, saved PDF exceptions and agent endpoints are denied even to the administrator', async t => {
  const h = await bootstrap(t);
  for (const [method, route] of deniedLegacy) {
    const result = await h.admin.request(route, { method, data: { id: crypto.randomUUID() }, headers: { 'X-OWL-Session': 'forged-shared-token', 'X-OWL-Actor': h.adminId } });
    assert(result.status >= 400, method + ' ' + route + ' unexpectedly succeeded: ' + result.raw.slice(0, 200));
    assert(!/application\/pdf|image\/png/i.test(result.headers.get('Content-Type') || ''));
    assert(!result.raw.includes('SIM-DOCENT-REC-PLAN-001') && !result.raw.includes('SIM-DOCENT-RVW-002'), 'Denied response leaked a known source or task: ' + route);
  }
  assert.equal(h.calls(), 0);
});

test('principal spoofing, unsupported commands, stale changes and cross-person operation replay are refused through HTTP', async t => {
  const h = await bootstrap(t), { admin } = h;
  const forged = command('save_person', 'organization', { name: 'Forged author', identifier: 'forged@owl.local', grants: [] });
  for (const route of ['/api/team/command', '/api/identity/temporary', '/api/identity/logout']) {
    const result = await admin.request(route, { method: 'POST', data: route.endsWith('/command') ? forged : route.endsWith('/temporary') ? { targetId: h.adminId } : {}, token: null });
    assert.equal(result.status, 403, 'Missing signed-in CSRF was accepted for ' + route + ': ' + result.raw);
  }
  for (const data of [{ ...forged, actorId: h.adminId }, { ...forged, principalId: h.adminId }, { ...forged, payload: { ...forged.payload, actorId: h.adminId } }]) {
    const result = await admin.request('/api/team/command', { method: 'POST', data }); assert(result.status >= 400, result.raw);
  }
  const unsupported = await admin.request('/api/team/command', { method: 'POST', data: command('save_review', SYSTEM_ID, { rationale: 'Never attributed as the administrator.' }) }); assert(unsupported.status >= 400);
  const saved = await admin.request('/api/team/command', { method: 'POST', data: forged }); assert.equal(saved.status, 200, saved.raw);
  const duplicate = await admin.request('/api/team/command', { method: 'POST', data: forged }); assert.equal(duplicate.status, 200); assert.deepEqual(duplicate.value, saved.value);
  const stale = await admin.request('/api/team/command', { method: 'POST', data: command('save_person', 'organization', { id: saved.value.value.id, name: 'Stale name' }, 0) }); assert.equal(stale.status, 409, stale.raw);
  const altered = await admin.request('/api/team/command', { method: 'POST', data: { ...forged, payload: { ...forged.payload, name: 'Changed replay' } } }); assert.equal(altered.status, 409, altered.raw);
});

test('resumable wizard progress survives close/reopen without claiming governance or live-agent completion', async t => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'owl-team-resume-')), filename = path.join(directory, 'isolated.sqlite');
  const h = await bootstrap(t, filename);
  const wizard = await h.admin.request('/api/team/wizard'); assert.equal(wizard.status, 200, wizard.raw);
  const progress = await h.admin.request('/api/team/command', { method: 'POST', data: command('save_wizard', 'organization', { step: 3, completedSteps: [1, 2], finished: false }, wizard.value.revision) }); assert.equal(progress.status, 200, progress.raw);
  const before = h.app.store.read();
  // Close once here; the registered cleanup is replaced by an idempotent wrapper.
  const close = h.app.close.bind(h.app); let closed = false; h.app.close = async () => { if (!closed) { closed = true; await close(); } };
  await h.app.close();
  const resumed = await start(t, filename), person = client(resumed.base); await person.context();
  assert.equal((await person.request('/api/identity/login', { method: 'POST', data: { identifier: 'admin@owl.local', password: PASSWORD } })).status, 200);
  const after = await person.request('/api/team/wizard'); assert.equal(after.status, 200, after.raw);
  assert.equal(after.value.step, 3); assert.deepEqual(after.value.completedSteps, [1, 2]); assert.equal(after.value.finished, false);
  assert.deepEqual(resumed.app.store.read(), before);
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
});

test('unexpected storage failures return actionable generic feedback without SQL or local path details', async t => {
  const h = await bootstrap(t);
  const previous = h.app.store.teamTransaction;
  h.app.store.teamTransaction = () => { throw Object.assign(Error('SQLITE internal table team_credentials SECRET_LOCAL_DIAGNOSTIC R:\\private-company\\database.sqlite'), { code: 'ERR_SQLITE_ERROR' }); };
  try {
    const response = await h.admin.request('/api/team/command', { method: 'POST', data: command('save_wizard', 'organization', { step: 2, completedSteps: [1], finished: false }) });
    assert.equal(response.status, 500, response.raw);
    assert.equal(typeof response.value.error, 'string');
    assert(!/SECRET_LOCAL_DIAGNOSTIC|SQLITE|team_credentials|private-company|ERR_SQLITE_ERROR/.test(response.raw));
    assert(/check|retry|again|reload/i.test(response.value.error));
  } finally { h.app.store.teamTransaction = previous; }
});
