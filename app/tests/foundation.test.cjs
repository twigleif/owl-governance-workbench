'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {createStore,digest}=require('../store.cjs'),{createServer}=require('../server.cjs'),{taskProjection,integrationOverrides,assertRuntime}=require('../codex.cjs');
const root=path.resolve(__dirname,'../../runtime/test-artifacts/local-application');fs.mkdirSync(root,{recursive:true});
const fresh=()=>path.join(root,crypto.randomUUID()+'.sqlite');
const request=(s,command,values,id=crypto.randomUUID())=>{const v=s.view();return{id,command,values,expectedRevision:v.revision,expectedDraftRevision:v.meta.draftRevision};};
test('native Manual save survives close/reopen and preserves unrelated source state',()=>{
  const file=fresh();let s=createStore(file,{seed:true});const before=s.read().workspace,control=digest(before.references.controls),assessment=digest(before.assessments);
  s.operation(request(s,'save_organization',{context:'Example organization\nFictional research team.',responsibility:'Governance lead (sim.)'}));const saved=s.view();assert.equal(saved.manual.context,'Example organization\nFictional research team.');assert.equal(saved.revision,61);assert.equal(digest(s.read().workspace.references.controls),control);assert.equal(digest(s.read().workspace.assessments),assessment);s.close();
  s=createStore(file);assert.deepEqual(s.view(),saved);s.close();
});
test('native review Save preserves assessment result/captures and adds one actual history event',()=>{
  const s=createStore(fresh(),{seed:true}),before=s.read().workspace,initial=s.view();s.operation(request(s,'save_review',{rationale:'Evidence remains missing; this is a wording draft.'}));const after=s.read().workspace;
  assert.equal(s.view().assessment.revision,15);assert.equal(s.view().review.result,'Not reviewed');assert.equal(s.view().control.implementation,'Not assessed');assert.equal(s.view().review.result_rationale,'Evidence remains missing; this is a wording draft.');assert.equal(after.assessments.history.length,before.assessments.history.length+1);assert.deepEqual(after.assessments.entries[0].captures,before.assessments.entries[0].captures);assert.equal(initial.assessment.revision,14);s.close();
});
test('same operation replays once; changed digest and stale revision refuse without overwriting',()=>{
  const s=createStore(fresh(),{seed:true}),r=request(s,'save_review',{rationale:'Saved draft.'});const first=s.operation(r),snapshot=digest(s.read());assert.deepEqual(s.operation(r),first);assert.equal(digest(s.read()),snapshot);assert.throws(()=>s.operation({...r,values:{rationale:'Different'}}),e=>e.code==='operation-conflict');assert.throws(()=>s.operation({...r,id:crypto.randomUUID()}),e=>e.code==='workspace-conflict');assert.equal(digest(s.read()),snapshot);s.close();
});
test('native validation, precommit rollback and uncertain after-commit receipt retain correct result',()=>{
  let fault='';const s=createStore(fresh(),{seed:true,fault:stage=>{if(stage===fault)throw Error('Injected failure');}}),before=digest(s.read());assert.throws(()=>s.operation(request(s,'save_review',{rationale:'x'.repeat(2001)})));assert.equal(digest(s.read()),before);
  fault='before-commit';assert.throws(()=>s.operation(request(s,'save_review',{rationale:'Not committed'})));assert.equal(digest(s.read()),before);
  fault='after-commit';const r=request(s,'save_review',{rationale:'Committed; response lost.'});assert.throws(()=>s.operation(r));assert.equal(s.view().review.result_rationale,'Committed; response lost.');assert(s.receipt(r.id));fault='';const history=s.read().workspace.assessments.history.length;assert.equal(s.operation(r).status,'saved');assert.equal(s.read().workspace.assessments.history.length,history);s.close();
});
test('request drafts remain separate from Action completion or Decisions',()=>{
  const s=createStore(fresh(),{seed:true}),before=s.read().workspace;s.operation(request(s,'save_request_draft',{text:'Supply audience, actual grants and performed result.'}));const after=s.read().workspace;assert.equal(digest(before),digest(after));assert.equal(s.view().meta.requestDraft,'Supply audience, actual grants and performed result.');assert.equal(after.references.decisions.length,0);s.close();
});
test('agent tools deny writes and arbitrary IDs; provider projection excludes entered notes',()=>{
  const s=createStore(fresh(),{seed:true});s.operation(request(s,'save_organization',{context:'LOCAL ONLY ORGANIZATION NOTES',responsibility:'LOCAL ONLY ROLE'}));s.operation(request(s,'save_system',{purpose:'LOCAL ONLY PURPOSE',owner:'LOCAL ONLY OWNER'}));s.operation(request(s,'save_review',{rationale:'LOCAL ONLY RATIONALE'}));assert(!JSON.stringify(taskProjection(s.view())).includes('LOCAL ONLY'));assert.throws(()=>s.tool('save_review',{}),e=>e.code==='tool-denied');assert.throws(()=>s.tool('owl_get_source',{recordId:'SOME-OTHER-RECORD'}),e=>e.code==='source-scope');const source=s.tool('owl_get_source',{recordId:'SIM-DOCENT-REC-PUBLIC-001'});assert.equal(source.body,null);const plan=s.tool('owl_get_source',{recordId:'SIM-DOCENT-REC-PLAN-001'});assert(plan.body.includes('C2'));s.close();
});
test('run restart is visibly unconfirmed and the same run ID never starts another call',()=>{
  const file=fresh();let s=createStore(file,{seed:true}),id=crypto.randomUUID();assert(s.beginRun(id).created);assert(!s.beginRun(id).created);s.close();s=createStore(file);assert.equal(s.run(id).status,'unconfirmed');assert(!s.beginRun(id).created);s.close();
});
test('agent refuses inherited integrations and unverified tool restrictions',()=>{
  const overrides=integrationOverrides({mcp_servers:{'external-tool':{command:'ignored'}},plugins:{'example@bundled':{enabled:true}}});
  assert(overrides.includes('mcp_servers={"external-tool"={enabled=false}}'));
  assert(overrides.includes('plugins={"example@bundled"={enabled=false}}'));
  assert.throws(()=>integrationOverrides({mcp_servers:{'unsafe"name':{}}}));
  assert.throws(()=>assertRuntime({mcp_servers:{outside:{enabled:true}}}),/inherited an enabled integration/);
  assert.throws(()=>assertRuntime({plugins:{outside:{enabled:true}}}),/inherited an enabled integration/);
  assert.throws(()=>assertRuntime({mcp_servers:{outside:{enabled:false}},plugins:{},features:{shell_tool:false}}),/restrictions could not be verified/);
});
test('local HTTP routes enforce host/origin/session, save and invoke only bounded agent task',async()=>{
  let calls=0;const app=createServer({database:fresh(),seed:true,agent:{status:async()=>({signedIn:true,authType:'chatgpt',plan:'test'}),prepareAccessReview:async store=>{calls++;return{basis:taskProjection(store.view()),draft:{summary:'Missing operating evidence.',questions:['Who is the intended audience?'],source_ids:['SIM-DOCENT-REC-PLAN-001']},model:'test-double',events:[{tool:'owl_get_task'}],governanceRecordsChanged:false};}}});
  const url=await app.listen(0);try{
    const h=await(await fetch(url)).text(),token=h.match(/name="owl-session" content="([^"]+)"/)[1],headers={'X-OWL-Session':token,'Content-Type':'application/json'};
    assert.equal((await fetch(url+'/api/state')).status,403);assert.equal((await fetch(url+'/api/state',{headers:{...headers,Origin:'https://other.example'}})).status,403);
    const initial=await(await fetch(url+'/api/state',{headers})).json();assert.equal(initial.assessment.revision,14);assert.equal((await(await fetch(url+'/api/connection',{headers})).json()).signedIn,true);
    const req={id:crypto.randomUUID(),command:'save_review',values:{rationale:'HTTP saved draft.'},expectedRevision:initial.revision,expectedDraftRevision:initial.meta.draftRevision};assert.equal((await fetch(url+'/api/command',{method:'POST',headers,body:JSON.stringify(req)})).status,200);
    const id=crypto.randomUUID(),run=await(await fetch(url+'/api/agent',{method:'POST',headers,body:JSON.stringify({id})})).json();assert.equal(run.status,'draft');await fetch(url+'/api/agent',{method:'POST',headers,body:JSON.stringify({id})});assert.equal(calls,1);assert.equal(app.store.view().review.result,'Not reviewed');assert.equal((await fetch(url+'/api/agent',{method:'POST',headers,body:JSON.stringify({id:crypto.randomUUID(),prompt:'Unbounded arbitrary prompt'})})).status,400);assert.equal(calls,1);
    assert.equal((await fetch(url+'/../.codex/auth.json',{headers})).status,404);assert.equal((await fetch(url+'/app.js')).status,200);assert.equal((await fetch(url+'/saved-access-brief.pdf')).status,200);
  }finally{await app.close();}
});
