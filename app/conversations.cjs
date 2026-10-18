'use strict';
// Technical conversation history, separate from native governance record ownership.
function createConversations(db,{digest,fail,read}){
  db.exec(`CREATE TABLE IF NOT EXISTS chat_conversations(id TEXT PRIMARY KEY,title TEXT NOT NULL,revision INTEGER NOT NULL DEFAULT 0,composer TEXT NOT NULL DEFAULT '',composer_version INTEGER NOT NULL DEFAULT 0,created_at TEXT NOT NULL,updated_at TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS chat_turns(id TEXT PRIMARY KEY,conversation_id TEXT NOT NULL REFERENCES chat_conversations(id),sequence INTEGER NOT NULL,request_digest TEXT NOT NULL,user_text TEXT NOT NULL,status TEXT NOT NULL,input_json TEXT NOT NULL,result_json TEXT,error TEXT NOT NULL DEFAULT '',draft_text TEXT NOT NULL DEFAULT '',draft_version INTEGER NOT NULL DEFAULT 0,request_revision INTEGER NOT NULL,request_meta_revision INTEGER NOT NULL,saved_text TEXT,created_at TEXT NOT NULL,finished_at TEXT,UNIQUE(conversation_id,sequence));
    CREATE TABLE IF NOT EXISTS chat_edits(id TEXT PRIMARY KEY,turn_id TEXT NOT NULL REFERENCES chat_turns(id),version INTEGER NOT NULL,text TEXT NOT NULL,kind TEXT NOT NULL,created_at TEXT NOT NULL,UNIQUE(turn_id,version));
    CREATE TABLE IF NOT EXISTS chat_operations(id TEXT PRIMARY KEY,digest TEXT NOT NULL,result TEXT NOT NULL);`);
  db.prepare("UPDATE chat_turns SET status='unconfirmed',error='OWL restarted before the reply was confirmed. Your message is saved; no automatic retry was made.',finished_at=? WHERE status='running'").run(new Date().toISOString());
  const id=v=>{if(typeof v!=='string'||!/^[-\w]{8,120}$/.test(v))fail('A stable conversation or turn identifier is required.');return v;};
  const text=(v,max=2000)=>{if(typeof v!=='string'||v.length>max)fail('Enter text within '+max+' characters.');return v;};
  const transaction=fn=>{db.exec('BEGIN IMMEDIATE');try{const result=fn();db.exec('COMMIT');return result;}catch(e){if(db.isTransaction)db.exec('ROLLBACK');throw e;}};
  const rawTurn=key=>db.prepare('SELECT * FROM chat_turns WHERE id=?').get(id(key))||null;
  function list(){return db.prepare('SELECT id,title,revision,composer_version,created_at,updated_at FROM chat_conversations ORDER BY updated_at DESC,rowid DESC').all();}
  function get(key){
    const c=db.prepare('SELECT * FROM chat_conversations WHERE id=?').get(id(key));if(!c)fail('This conversation was not found. Open conversation history.','chat-missing');
    const current=read();
    return{...c,turns:db.prepare('SELECT * FROM chat_turns WHERE conversation_id=? ORDER BY sequence').all(key).map(t=>{
      const result=t.result_json?JSON.parse(t.result_json):null;
      return{id:t.id,sequence:t.sequence,user:t.user_text,status:t.status,error:t.error,created_at:t.created_at,result,
        draft:{text:t.draft_text,version:t.draft_version,edited:t.draft_version>0,saved:t.saved_text===t.draft_text&&current.meta.requestDraft===t.draft_text,basis:{revision:t.request_revision,draftRevision:t.request_meta_revision}}};
    })};
  }
  function create(key){id(key);if(db.prepare('SELECT 1 FROM chat_conversations WHERE id=?').get(key))return get(key);if(list().length>=32)fail('This development workspace has 32 conversations. Existing history is kept; review retention before creating more.','chat-capacity');const now=new Date().toISOString();db.prepare('INSERT INTO chat_conversations(id,title,created_at,updated_at) VALUES(?,?,?,?)').run(key,'New conversation',now,now);return get(key);}
  function turn(key){const t=rawTurn(key);if(!t)return null;return get(t.conversation_id).turns.find(v=>v.id===key);}
  function history(key){return get(key).turns.map(t=>({user:t.user,status:t.status,assistant:t.result?{reply:t.result.output.reply,questions:t.result.output.questions,source_ids:t.result.output.source_ids}:null,...t.draft.edited?{humanDraft:t.draft.text}:{}}));}
  function begin(request,input){return transaction(()=>{
    id(request.id);id(request.conversationId);text(request.text);if(!request.text.trim())fail('Enter a message before sending.');
    const hash=digest(request),old=rawTurn(request.id);
    if(old){if(old.request_digest!==hash)fail('This turn ID already belongs to another message. Your message is kept.','chat-conflict');return{created:false,turn:turn(request.id)};}
    const c=get(request.conversationId);if(c.revision!==request.expectedRevision)fail('This conversation changed in another window. Your message is kept; reopen its saved history before sending.','chat-conflict');
    if(c.turns.length>=24)fail('This conversation has reached its 24-message limit. Start a new conversation; this history is kept.','chat-capacity');
    if(db.prepare("SELECT 1 FROM chat_turns WHERE status='running'").get())fail('A response is already running. Stop it or wait before sending another message.','chat-busy');
    const {workspace,meta}=read(),now=new Date().toISOString();
    db.prepare("INSERT INTO chat_turns(id,conversation_id,sequence,request_digest,user_text,status,input_json,request_revision,request_meta_revision,created_at) VALUES(?,?,?,?,?,'running',?,?,?,?)").run(request.id,c.id,c.turns.length+1,hash,request.text,JSON.stringify(input),workspace.revision,meta.draftRevision,now);
    db.prepare('UPDATE chat_conversations SET title=?,revision=revision+1,composer=\'\',composer_version=composer_version+1,updated_at=? WHERE id=?').run(c.title==='New conversation'?request.text.slice(0,70):c.title,now,c.id);
    return{created:true,turn:turn(request.id)};
  });}
  function finish(key,status,result=null,message=''){
    if(!['ready','stopped','unconfirmed'].includes(status))fail('Unknown conversation outcome.');
    const raw=rawTurn(key);if(!raw)return null;if(raw.status!=='running')return turn(key);
    const json=result?JSON.stringify(result):null;if(json&&Buffer.byteLength(json)>200000)fail('The response exceeded the development storage limit.');
    const draft=result?.output.questions.join('\n\n')||'';
    return transaction(()=>{db.prepare("UPDATE chat_turns SET status=?,result_json=?,draft_text=?,error=?,finished_at=? WHERE id=? AND status='running'").run(status,json,draft,message,new Date().toISOString(),key);db.prepare('UPDATE chat_conversations SET updated_at=? WHERE id=?').run(new Date().toISOString(),raw.conversation_id);return turn(key);});
  }
  function input(key){const t=rawTurn(key);if(!t)fail('Conversation turn not found.');return JSON.parse(t.input_json);}
  function once(request,fn){return transaction(()=>{id(request.id);const hash=digest(request),old=db.prepare('SELECT * FROM chat_operations WHERE id=?').get(request.id);if(old){if(old.digest!==hash)fail('This operation ID has different values.','operation-conflict');return JSON.parse(old.result);}const result=fn();db.prepare('INSERT INTO chat_operations VALUES(?,?,?)').run(request.id,hash,JSON.stringify(result));return result;});}
  function composer(request){return once(request,()=>{const c=get(request.conversationId);text(request.text);if(c.composer_version!==request.expectedVersion)fail('The unsent message changed in another window. Your text is kept.','chat-conflict');db.prepare('UPDATE chat_conversations SET composer=?,composer_version=composer_version+1 WHERE id=?').run(request.text,c.id);return get(c.id);});}
  function checkDraft(values,allowEmpty=false){const t=rawTurn(values.turnId);if(!t||t.status!=='ready'||!JSON.parse(t.result_json).output.questions.length)fail('This reply has no question draft to save.','chat-draft-missing');if(values.expectedVersion!==t.draft_version)fail('This draft changed in another window. Your edits are kept; reopen the saved conversation.','chat-conflict');text(values.text);if(!allowEmpty&&!values.text.trim())fail('Enter the questions before saving.');if(t.draft_version>=64)fail('This draft has reached its 64-edit limit. Prepare a fresh draft; its history is kept.','chat-capacity');return t;}
  function recordEdit(t,values,key,kind){const version=t.draft_version+1;db.prepare('INSERT INTO chat_edits VALUES(?,?,?,?,?,?)').run(key,t.id,version,values.text,kind,new Date().toISOString());db.prepare('UPDATE chat_turns SET draft_text=?,draft_version=? WHERE id=?').run(values.text,version,t.id);}
  function edit(request){return once(request,()=>{const t=checkDraft(request,true);recordEdit(t,request,request.id,'edit');return turn(t.id);});}
  function validateSave(values,expectedRevision,expectedDraftRevision){const t=checkDraft(values);if(t.request_revision!==expectedRevision||t.request_meta_revision!==expectedDraftRevision)fail('The draft basis changed. Your edits are kept; review the saved request before applying this draft.','chat-conflict');return t;}
  // Called only within the native operation/receipt transaction after explicit human Save.
  function recordSave(t,values,operationId,revision,draftRevision){recordEdit(t,values,operationId,'save');db.prepare('UPDATE chat_turns SET saved_text=?,request_revision=?,request_meta_revision=? WHERE id=?').run(values.text,revision,draftRevision,t.id);}
  return{list,get,create,turn,rawTurn,history,begin,finish,input,composer,edit,validateSave,recordSave};
}
module.exports={createConversations};
