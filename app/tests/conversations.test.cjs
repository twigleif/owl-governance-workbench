'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path'),crypto=require('node:crypto');
const {createStore,digest}=require('../store.cjs'),{createChatService}=require('../chat-service.cjs'),{createServer}=require('../server.cjs');
const {buildConversationInput,validateChatOutput}=require('../codex.cjs');
const fresh=()=>path.resolve(__dirname,'../../runtime/test-artifacts/local-application/chat-'+crypto.randomUUID()+'.sqlite');
const reply=input=>({format:1,model:'test-double',basis:input.basis,inputDigest:digest(input),events:[{tool:'owl_get_task',recordId:null},{tool:'owl_get_source',recordId:'SIM-DOCENT-REC-PLAN-001'}],output:{reply:'The audience, grants and performed check are missing.',questions:['Which collection and intended audience?','What grants are configured?'],source_ids:['SIM-DOCENT-REC-PLAN-001']},governanceRecordsChanged:false});
const setup=agent=>{const store=createStore(fresh(),{seed:true}),service=createChatService(store,{agent:agent||{replyToConversation:async input=>reply(input)}}),c=store.chats.create(crypto.randomUUID());return{store,service,c};};
const request=(c,text='Draft evidence questions')=>({id:crypto.randomUUID(),conversationId:c.id,text,expectedRevision:c.revision});
async function ready(store,service,c){const r=request(c);service.start(r);await service.idle();return store.chats.turn(r.id);}
function saveRequest(t,text=t.draft.text){return{id:crypto.randomUUID(),command:'save_chat_request',expectedRevision:t.draft.basis.revision,expectedDraftRevision:t.draft.basis.draftRevision,values:{turnId:t.id,expectedVersion:t.draft.version,text}};}
test('real conversation input includes preceding answers and human edits, excluding unrelated notes',async()=>{
  const seen=[],{store,service,c}=setup({replyToConversation:async input=>{seen.push(input);return reply(input);}});
  const v=store.view();store.operation({id:crypto.randomUUID(),command:'save_organization',expectedRevision:v.revision,expectedDraftRevision:v.meta.draftRevision,values:{context:'LOCAL ORGANIZATION SECRET',responsibility:'LOCAL RESPONSIBILITY'}});
  const first=await ready(store,service,c);store.chats.edit({id:crypto.randomUUID(),turnId:first.id,expectedVersion:first.draft.version,text:'Human-edited fictional question.'});
  service.start(request(store.chats.get(c.id),'Make the second question more specific.'));await service.idle();
  assert.equal(seen.length,2);assert.equal(seen[1].conversation.history.length,1);assert.equal(seen[1].conversation.history[0].assistant.questions[1],'What grants are configured?');assert.equal(seen[1].conversation.history[0].humanDraft,'Human-edited fictional question.');assert(!JSON.stringify(seen[1]).includes('LOCAL ORGANIZATION SECRET'));assert.equal(store.view().review.result,'Not reviewed');store.close();
});
test('messages, replies, original output, edited drafts and unsent composer survive reopen',async()=>{
  const file=fresh();let store=createStore(file,{seed:true}),service=createChatService(store,{agent:{replyToConversation:async input=>reply(input)}});const c=store.chats.create(crypto.randomUUID()),t=await ready(store,service,c);
  store.chats.edit({id:crypto.randomUUID(),turnId:t.id,expectedVersion:0,text:'Revised question.'});const saved=store.chats.get(c.id);
  store.chats.composer({id:crypto.randomUUID(),conversationId:c.id,expectedVersion:saved.composer_version,text:'Unsent follow-up'});store.close();store=createStore(file);
  const reopened=store.chats.get(c.id);assert.equal(reopened.composer,'Unsent follow-up');assert.equal(reopened.turns[0].draft.text,'Revised question.');assert.equal(reopened.turns[0].result.output.questions[0],'Which collection and intended audience?');assert.equal(reopened.turns[0].status,'ready');store.close();
});
test('turn replay invokes provider once and refuses changed-ID payload or stale conversation',async()=>{
  let calls=0;const {store,service,c}=setup({replyToConversation:async input=>{calls++;return reply(input);}}),r=request(c);
  service.start(r);service.start(r);await service.idle();service.start(r);assert.equal(calls,1);
  assert.throws(()=>service.start({...r,text:'Different input'}),e=>e.code==='chat-conflict');assert.throws(()=>service.start(request(c,'Stale version')),e=>e.code==='chat-conflict');assert.equal(calls,1);store.close();
});
test('one active response across conversations; stop discards late completion without retry',async()=>{
  let complete;const {store,service,c}=setup({replyToConversation:input=>new Promise(resolve=>{complete=()=>resolve(reply(input));})}),r=request(c);service.start(r);await Promise.resolve();
  const other=store.chats.create(crypto.randomUUID());assert.throws(()=>service.start(request(other)),e=>e.code==='chat-busy');assert.equal(service.stop(r.id).status,'stopped');complete();await service.idle();assert.equal(store.chats.turn(r.id).status,'stopped');assert.equal(store.chats.turn(r.id).result,null);assert.equal(store.view().meta.requestDraft,'');store.close();
});
test('a pending turn becomes unconfirmed on restart; same ID does not invoke provider',()=>{
  const file=fresh();let s=createStore(file,{seed:true});const c=s.chats.create(crypto.randomUUID()),r=request(c);s.chats.begin(r,buildConversationInput(s,[],r.text));s.close();s=createStore(file);let calls=0;const service=createChatService(s,{agent:{replyToConversation:async input=>{calls++;return reply(input);}}});assert.equal(service.start(r).status,'unconfirmed');assert.equal(calls,0);assert.equal(s.chats.get(c.id).turns[0].user,r.text);s.close();
});
test('unsupported output and provider errors retain message as unconfirmed without a saved draft',async()=>{
  const {store,service,c}=setup({replyToConversation:async input=>({...reply(input),output:{reply:'Untrusted',questions:[],source_ids:['OUTSIDE']}})});const r=request(c);service.start(r);await service.idle();assert.equal(store.chats.turn(r.id).status,'unconfirmed');assert.equal(store.chats.turn(r.id).user,r.text);assert.equal(store.view().meta.requestDraft,'');assert.throws(()=>store.operation(saveRequest(store.chats.turn(r.id))),/no question draft/);store.close();
});
test('human Save changes only technical request; own edit/resave preserves original proposal',async()=>{
  const {store,service,c}=setup(),before=digest(store.read().workspace);let t=await ready(store,service,c);const original=t.result.output.questions.slice();store.operation(saveRequest(t));t=store.chats.turn(t.id);assert(t.draft.saved);assert.equal(digest(store.read().workspace),before);
  store.operation(saveRequest(t,'Clearer fictional question.'));t=store.chats.turn(t.id);assert(t.draft.saved);assert.equal(t.draft.text,'Clearer fictional question.');assert.deepEqual(t.result.output.questions,original);assert.equal(t.draft.version,2);assert.equal(store.read().workspace.references.decisions.length,0);store.close();
});
test('chat draft Save and edit history are atomic through rollback and after-commit reconciliation',async()=>{
  let fault='';const store=createStore(fresh(),{seed:true,fault:stage=>{if(stage===fault)throw Error('Injected fault');}}),service=createChatService(store,{agent:{replyToConversation:async input=>reply(input)}}),c=store.chats.create(crypto.randomUUID());const t=await ready(store,service,c),r=saveRequest(t);
  fault='before-commit';assert.throws(()=>store.operation(r));assert.equal(store.chats.turn(t.id).draft.version,0);assert.equal(store.view().meta.requestDraft,'');assert.equal(store.receipt(r.id),null);
  fault='after-commit';assert.throws(()=>store.operation(r));assert(store.receipt(r.id));assert.equal(store.chats.turn(t.id).draft.version,1);fault='';store.operation(r);assert.equal(store.chats.turn(t.id).draft.version,1);store.close();
});
test('external request changes refuse overwrite, including a forged newer basis; edits remain available',async()=>{
  const {store,service,c}=setup(),t=await ready(store,service,c),v=store.view();store.operation({id:crypto.randomUUID(),command:'save_request_draft',expectedRevision:v.revision,expectedDraftRevision:v.meta.draftRevision,values:{text:'A different saved request.'}});
  assert.throws(()=>store.operation(saveRequest(t)),e=>e.code==='workspace-conflict');const forged=saveRequest(t);forged.expectedDraftRevision=store.view().meta.draftRevision;assert.throws(()=>store.operation(forged),e=>e.code==='chat-conflict');assert.equal(store.view().meta.requestDraft,'A different saved request.');assert.equal(store.chats.turn(t.id).draft.text,t.draft.text);store.close();
});
test('input/output bounds and cited-source reads are enforced without truncating history',()=>{
  const {store}=setup();assert.throws(()=>buildConversationInput(store,[],'x'.repeat(2001)));assert.throws(()=>buildConversationInput(store,[{user:'x'.repeat(32000)}],'Follow-up'));
  const input=buildConversationInput(store,[],'Draft questions'),valid=reply(input);assert.throws(()=>validateChatOutput(valid.output,input,[{tool:'owl_get_task'}]));assert.throws(()=>validateChatOutput({...valid.output,questions:['x'.repeat(1001)]},input,valid.events));assert.throws(()=>validateChatOutput({...valid.output,reply:'x'.repeat(5001)},input,valid.events));store.close();
});
test('an empty in-chat edit is retained locally but cannot become a saved request',async()=>{
  const {store,service,c}=setup(),t=await ready(store,service,c);const edited=store.chats.edit({id:crypto.randomUUID(),turnId:t.id,expectedVersion:0,text:''});assert.equal(edited.draft.text,'');assert.throws(()=>store.operation(saveRequest(edited)),/Enter the questions/);assert.equal(store.view().meta.requestDraft,'');store.close();
});
test('a changed in-chat draft version refuses stale edits while original output remains intact',async()=>{
  const {store,service,c}=setup(),t=await ready(store,service,c);store.chats.edit({id:crypto.randomUUID(),turnId:t.id,expectedVersion:0,text:'First revision.'});assert.throws(()=>store.chats.edit({id:crypto.randomUUID(),turnId:t.id,expectedVersion:0,text:'Stale second revision.'}),e=>e.code==='chat-conflict');assert.equal(store.chats.turn(t.id).draft.text,'First revision.');assert.equal(store.chats.turn(t.id).result.output.questions[0],t.result.output.questions[0]);store.close();
});
test('HTTP chat returns durable tickets, supports follow-ups and keeps old application routes',async()=>{
  let calls=0;const app=createServer({database:fresh(),seed:true,agent:{replyToConversation:async input=>{calls++;return reply(input);},status:async()=>({signedIn:true}),prepareAccessReview:async()=>{throw Error('Not used by chat');}}});const url=await app.listen(0);
  try{const html=await(await fetch(url)).text(),token=html.match(/name="owl-session" content="([^"]+)"/)[1],headers={'X-OWL-Session':token,'Content-Type':'application/json'},post=async(route,input)=>fetch(url+route,{method:'POST',headers,body:JSON.stringify(input)});
    assert.equal((await fetch(url+'/api/chats')).status,403);const c=await(await post('/api/chat/create',{id:crypto.randomUUID()})).json(),r=request(c);
    assert.equal((await post('/api/chat/send',r)).status,202);await app.chat.idle();assert.equal((await(await fetch(url+'/api/chat/turn?id='+r.id,{headers})).json()).status,'ready');await post('/api/chat/send',r);assert.equal(calls,1);
    const saved=await(await fetch(url+'/api/chat?id='+c.id,{headers})).json();assert.equal(saved.turns[0].result.output.questions.length,2);assert.equal((await post('/api/chat/send',request(saved,'Explain question two.'))).status,202);await app.chat.idle();assert.equal(calls,2);
    assert.equal((await fetch(url+'/api/state',{headers})).status,200);assert.equal((await fetch(url+'/saved-access-brief.pdf')).status,200);assert.equal((await fetch(url+'/api/source?id=SIM-DOCENT-REC-PLAN-001',{headers})).status,200);assert.equal((await fetch(url+'/api/chats',{headers:{...headers,Origin:'https://outside.example'}})).status,403);
  }finally{await app.close();}
});
