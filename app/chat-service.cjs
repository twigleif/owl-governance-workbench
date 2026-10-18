'use strict';
const codex=require('./codex.cjs');
function createChatService(store,{agent=codex,isLegacyRunning=()=>false}={}){
  let active=null;
  const fail=(message,code)=>{throw Object.assign(Error(message),{code});};
  function start(request){
    if(!request||Object.keys(request).sort().join(',')!=='conversationId,expectedRevision,id,text')fail('A conversation, message, stable turn ID and expected revision are required.','chat-input');
    const previous=store.chats.rawTurn(request.id);
    if(previous){const input=store.chats.input(request.id);return store.chats.begin(request,input).turn;}
    if(active||isLegacyRunning())fail('A response is already running. Stop it or wait before sending another message.','chat-busy');
    const history=store.chats.history(request.conversationId),input=codex.buildConversationInput(store,history,request.text),started=store.chats.begin(request,input);
    if(!started.created)return started.turn;
    const controller=new AbortController(),job={id:request.id,controller,promise:null};active=job;
    job.promise=Promise.resolve().then(()=>agent.replyToConversation(input,{signal:controller.signal})).then(result=>{
      if(controller.signal.aborted)return;
      codex.validateChatOutput(result.output,input,result.events||[]);
      if(result.inputDigest&&result.inputDigest!==require('./store.cjs').digest(input))throw Error('The reply did not match the submitted input inventory.');
      store.chats.finish(request.id,'ready',result);
    }).catch(e=>{
      if(!controller.signal.aborted)try{store.chats.finish(request.id,'unconfirmed',null,e.message||'OWL could not confirm the reply. Your message is saved; check this conversation before sending again.');}catch{ /* The durable pending ticket is reconciled as Unconfirmed on restart. */ }
    }).finally(()=>{if(active===job)active=null;});
    return started.turn;
  }
  function stop(key){const turn=store.chats.turn(key);if(!turn)return null;if(turn.status!=='running')return turn;const result=store.chats.finish(key,'stopped',null,'Response stopped. Your message is saved; nothing was applied.');if(active?.id===key)active.controller.abort();return result;}
  async function close(){if(active){const job=active;store.chats.finish(job.id,'unconfirmed',null,'OWL closed before the reply was confirmed. Your message is saved; no automatic retry was made.');job.controller.abort();await job.promise;}}
  return{start,stop,close,isActive:()=>!!active,idle:async()=>{if(active)await active.promise;}};
}
module.exports={createChatService};
