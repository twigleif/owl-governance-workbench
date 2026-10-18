'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {DatabaseSync}=require('node:sqlite');
const C=require('./core/register-core.js'),A=require('./core/assessment-core.js'),D=require('./core/document-core.js');
const fixture=require('./core/docent-working-case.cjs');
const copy=x=>JSON.parse(JSON.stringify(x));
function stable(x){if(Array.isArray(x))return x.map(stable);if(x&&typeof x==='object')return Object.fromEntries(Object.keys(x).sort().map(k=>[k,stable(x[k])]));return x;}
const digest=x=>crypto.createHash('sha256').update(JSON.stringify(stable(x))).digest('hex');
function fail(message,code='invalid-command',details={}){throw Object.assign(Error(message),{code,...details});}
function text(v,max=2000){if(typeof v!=='string'||v.length>max)fail('Enter text within '+max+' characters.');return v;}
function isCurrentWorkspace(filename){
  if(filename===':memory:')return false;
  const current=path.resolve(__dirname,'../runtime/owl-local/workspace.sqlite'),target=path.resolve(filename);
  const real=value=>fs.existsSync(value)?fs.realpathSync(value):value;
  const normalized=value=>process.platform==='win32'?real(value).toLowerCase():real(value);
  if(normalized(current)===normalized(target))return true;
  if(fs.existsSync(current)&&fs.existsSync(target)){const a=fs.statSync(current,{bigint:true}),b=fs.statSync(target,{bigint:true});return a.ino!==0n&&a.dev===b.dev&&a.ino===b.ino;}
  return false;
}
function createStore(filename,{seed=false,fault=()=>{},teamMode=false,identityOptions={}}={}){
  if(teamMode&&isCurrentWorkspace(filename))fail('The team backend is restricted to an isolated test workspace. Keep the current workspace on its existing reader.','team-isolated-only');
  if(filename!==':memory:'){const resolved=path.resolve(filename);if(resolved.startsWith('\\\\'))fail('Use a local disk for this development database.');fs.mkdirSync(path.dirname(resolved),{recursive:true});}
  const db=new DatabaseSync(filename,{timeout:3000});
  db.function('owl_format_capability',()=>2);
  let capabilities;try{capabilities=require('./storage-capabilities.cjs').create(db,fail,{teamMode});}catch(e){db.close();throw e;}
  const engine=db.prepare('select sqlite_version() as version').get().version;
  if(engine.split('.').map(Number).reduce((n,v)=>n*1000+v,0)<3051003)fail('This slice requires SQLite 3.51.3 or newer.');
  db.exec('PRAGMA journal_mode=WAL; PRAGMA synchronous=FULL; PRAGMA foreign_keys=ON;');
  db.exec('CREATE TABLE IF NOT EXISTS app_state (singleton INTEGER PRIMARY KEY CHECK(singleton=1), format INTEGER NOT NULL, body TEXT NOT NULL, meta TEXT NOT NULL); CREATE TABLE IF NOT EXISTS operations (id TEXT PRIMARY KEY, digest TEXT NOT NULL, result TEXT NOT NULL); CREATE TABLE IF NOT EXISTS agent_runs(id TEXT PRIMARY KEY, status TEXT NOT NULL, basis_revision INTEGER NOT NULL, result TEXT);');
  if(!teamMode)db.prepare("UPDATE agent_runs SET status='unconfirmed' WHERE status='running'").run();
  const example=fixture.create();
  if(!db.prepare('SELECT 1 FROM app_state').get()){
    if(!seed){db.close();fail('No workspace exists. Start with --docent-demo to create an isolated fictional development workspace.','workspace-missing');}
    const f=example;C.checkSnapshot(f.nativeFixture.workspace);
    db.prepare('INSERT INTO app_state VALUES(1,1,?,?)').run(JSON.stringify(f.nativeFixture.workspace),JSON.stringify({setupStage:1,requestDraft:'',draftRevision:0}));
  }
  const ids=example.metadata.ids;
  let authoring=null;
  function evidenceSource(recordId){const managed=authoring?.source(recordId)||originals.source(recordId);if(managed)return managed;const s=tool('owl_get_source',{recordId});return{...s,sha256:s.body===null?null:crypto.createHash('sha256').update(s.body).digest('hex')};}
  const originals=teamMode?null:require('./originals.cjs').create(db,{read,fail,C,ids,capabilities,admitted:()=>[ids.baseline,ids.plan].map(id=>{const s=tool('owl_get_source',{recordId:id});return{id,sha256:crypto.createHash('sha256').update(s.body).digest('hex')};})});
  authoring=teamMode?null:require('./authoring.cjs').create(db,{read,fail,digest,C,ids,source:evidenceSource,capabilities});authoring?.verify({integrity:false});if(capabilities.features().length)capabilities.guard();
  const evidence=teamMode?null:require('./evidence-use.cjs').create({ids,source:evidenceSource,fail,digest,C});
  const activity=teamMode?null:require('./activity.cjs').createActivity(db,{read,fail});
  function read(){require('./storage-capabilities.cjs').preflight(db,fail,{teamMode});const r=db.prepare('SELECT * FROM app_state WHERE singleton=1').get();if(![1,2,3].includes(r.format))fail('Unknown application storage version.','storage-version');const workspace=JSON.parse(r.body),meta=JSON.parse(r.meta);C.checkSnapshot(workspace);return{workspace,meta};}
  function transaction(work){
    if(db.isTransaction)return work();
    require('./storage-capabilities.cjs').preflight(db,fail,{teamMode});db.exec('BEGIN IMMEDIATE');
    try{const result=work();if(result&&typeof result.then==='function')fail('Complete asynchronous work before opening the shared Save transaction.','transaction-async');fault('team-before-commit');db.exec('COMMIT');fault('team-after-commit');return result;}
    catch(e){if(db.isTransaction)db.exec('ROLLBACK');throw e;}
  }
  function view(){
    const {workspace:w,meta}=read(),entry=A.find(w,ids.assessment),review=A.getUnit(entry,'review',ids.secondReview),manual=D.find(w,ids.manualRecord);
    const values=(kind,id)=>copy(w.references[kind].find(r=>!r.deleted_at&&r.values.id===id)?.values);
    return{mode:'fictional-development',revision:w.revision,meta,latestRun:db.prepare('SELECT * FROM agent_runs ORDER BY rowid DESC LIMIT 1').get()||null,system:copy(w.systems.find(r=>r.values.system_id===ids.system).values),manual:{recordId:manual.record_id,documentId:manual.document_id,revision:manual.revision,context:manual.values.T4R2C1,responsibility:manual.values.T16R2C1,scope:manual.values.T12R2C1},assessment:{id:entry.record_id,revision:entry.revision,summary:copy(entry.summary.values)},review:{revision:review.revision,...copy(review.values)},requirement:values('requirements',ids.secondRequirement),risk:values('risks',ids.secondRisk),control:values('controls',ids.secondControl),action:values('actions',ids.secondAction),links:w.references.links.filter(r=>[ids.secondRiskLink,ids.secondRequirementLink].includes(r.values.id)).map(r=>copy(r.values)),records:w.references.records.filter(r=>[ids.public,ids.baseline,ids.plan].includes(r.values.id)).map(r=>copy(r.values))};
  }
  function operation(request,file=null){
    if(teamMode)fail('Governed writes remain on the existing operator path until attributed native-history compatibility is connected. No saved governance record was changed.','team-native-write');
    if(!request||!/^[-\w]{8,120}$/.test(request.id||''))fail('A stable operation identifier is required.');
    const hash=digest(file?{request,sha256:require('./originals.cjs').sha(file.body),bytes:file.body.length}:request);db.exec('BEGIN IMMEDIATE');
    try{
      const old=db.prepare('SELECT * FROM operations WHERE id=?').get(request.id);
      if(old){if(old.digest!==hash)fail('This operation ID was already used with different values.','operation-conflict');db.exec('COMMIT');return JSON.parse(old.result);}
      const {workspace:w,meta}=read();
      if(request.expectedRevision!==w.revision||request.expectedDraftRevision!==meta.draftRevision)fail('Saved work changed. Your edits are kept; reload the saved values before retrying.','workspace-conflict');
      const now=new Date().toISOString();let next=w,nextMeta=copy(meta),chatSave=null,technical=null;
      switch(request.command){
        case'save_authored_document':technical=authoring.save(w,request.values,now);next=technical.workspace;break;
        case'retain_authored_version':technical=authoring.retain(w,request.values,now);next=technical.workspace;break;
        case'save_original':next=originals.save(w,request.values,file,now);break;
        case'save_original_details':next=originals.details(w,request.values,now);break;
        case'save_organization':{
          const e=D.find(w,ids.manualRecord),r=w.references.records.find(r=>r.values.id===ids.manualRecord),p=D.authoring(e);
          if(!text(request.values.context).trim())fail('Enter organization context before saving.');
          p.values.T4R2C1=text(request.values.context);p.values.T16R2C1=text(request.values.responsibility);
          next=C.saveDocumentDraft(w,p,{baseWorkspaceRevision:w.revision,baseDocumentRevision:e.revision,baseRecordRevision:r.revision,at:now});nextMeta.setupStage=meta.setupStage===4?4:2;break;
        }
        case'save_scope':{
          const e=D.find(w,ids.manualRecord),r=w.references.records.find(r=>r.values.id===ids.manualRecord),p=D.authoring(e);
          if(!text(request.values.scope).trim())fail('Describe the intended AIMS boundary before saving.');
          p.values.T12R2C1=request.values.scope;next=C.saveDocumentDraft(w,p,{baseWorkspaceRevision:w.revision,baseDocumentRevision:e.revision,baseRecordRevision:r.revision,at:now});break;
        }
        case'save_setup_stage':if(![1,2,3,4].includes(request.values.stage))fail('Choose a valid setup stage.');nextMeta.setupStage=request.values.stage;break;
        case'save_system':{
          const row=w.systems.find(r=>r.values.system_id===ids.system);
          next=C.save(w,{...row.values,intended_purpose:text(request.values.purpose),system_owner:text(request.values.owner,300)||'Unassigned'},{id:ids.system,baseRevision:row.revision,at:now});nextMeta.setupStage=4;break;
        }
        case'save_review_item':case'save_review':{
          if(request.command==='save_review_item'&&(!request.values.assessmentId||!request.values.reviewId))fail('Open an exact Assessment and Review before saving.','review-scope');
          const {entry,row}=require('./reviews.cjs').resolve(w,ids,request.values,fail);
          if(request.values.reviewId!==undefined&&Object.keys(request.values).some(k=>!['assessmentId','reviewId','entryRevision','rowRevision','rationale'].includes(k)))fail('This editor saves the Review rationale only. Result and authority fields require their own supported workflow.','review-field');
          if(request.values.reviewId!==undefined&&(request.values.entryRevision!==entry.revision||request.values.rowRevision!==row.revision))fail('Saved Review values changed. Compare them before saving; your note is kept.','workspace-conflict');
          next=C.saveAssessment(w,entry.record_id,'review',{...row.values,result_rationale:text(request.values.rationale)},{rowId:row.values.id,baseEntryRevision:entry.revision,baseUnitRevision:row.revision,at:now});break;
        }
        case'save_request_draft':nextMeta.requestDraft=text(request.values.text);break;
        case'save_chat_request':chatSave=chats.validateSave(request.values,request.expectedRevision,request.expectedDraftRevision);nextMeta.requestDraft=text(request.values.text);break;
        case'save_review_evidence_use':case'remove_review_evidence_use':case'restore_review_evidence_use':{
          if(!request.values.assessmentId||!request.values.reviewId)fail('Open an exact Assessment and Review before saving its link.','review-scope');
          next=evidence.apply(w,request.command.replace('_review_','_'),request.values,now);break;
        }
        case'save_evidence_use':case'remove_evidence_use':case'restore_evidence_use':next=evidence.apply(w,request.command,request.values,now);break;
        default:fail('This command is not available.');
      }
      C.checkSnapshot(next);const changed=!!technical?.changed||digest({w,meta})!==digest({w:next,meta:nextMeta});if(changed)nextMeta.draftRevision++;
      fault('before-write');if(changed)db.prepare('UPDATE app_state SET body=?,meta=? WHERE singleton=1').run(JSON.stringify(next),JSON.stringify(nextMeta));
      if(chatSave)chats.recordSave(chatSave,request.values,request.id,next.revision,nextMeta.draftRevision);
      const result={status:changed?'saved':'no-change',revision:next.revision,draftRevision:nextMeta.draftRevision,operationId:request.id,...request.command.startsWith('save_original')?{recordId:request.values.id}:{},...technical?.result};
      db.prepare('INSERT INTO operations VALUES(?,?,?)').run(request.id,hash,JSON.stringify(result));if(changed)activity.capture(request,{workspace:w,meta},{workspace:next,meta:nextMeta},now,technical?.event);fault('before-commit');db.exec('COMMIT');fault('after-commit');return result;
    }catch(e){if(db.isTransaction)db.exec('ROLLBACK');throw e;}
  }
  function tool(name,args={}){
    if(name==='owl_get_task'){if(Object.keys(args).length)fail('This task tool takes no arguments.');return view();}
    if(name==='owl_get_source'){
      if(Object.keys(args).some(k=>k!=='recordId'))fail('Unsupported source argument.');const current=view().records.find(r=>r.id===args.recordId);if(!current)fail('Only this task’s three sources are available.','source-scope');
      const root=path.resolve(__dirname,'..'),source=example.nativeFixture.workspace.references.records.find(r=>r.values.id===args.recordId).values;
      const location=source.location||'';let body=null;
      if(digest(current)!==digest(source))fail('The source no longer matches the admitted fictional example.','source-scope');
      if([ids.baseline,ids.plan].includes(source.id)){const target=fs.realpathSync(path.resolve(root,location));if(!target.startsWith(root+path.sep))fail('Source leaves the exercise boundary.');body=fs.readFileSync(target,'utf8');if(Buffer.byteLength(body)>40000)fail('Source exceeds this tool’s limit.');const admittedHash=source.id===ids.baseline?'819a034a9167470efe0a21a9fcf12dd3d39abbdb7f6250ca08fecb503a2c47a4':'301a57240120aef37a11cd0f9e15aa26ad77dea622bb0ba3387d65447a999698';if(crypto.createHash('sha256').update(body).digest('hex')!==admittedHash)fail('This original differs from the admitted fictional version. Restore the exact original or use a separately reviewed admission.','evidence-source');}
      return{record:current,body,limitation:body?'Fictional exercise artifact, not observed operating evidence.':'URL metadata only; original not retained or read.'};
    }
    fail('The agent has no such tool.','tool-denied');
  }
  function run(id){return db.prepare('SELECT * FROM agent_runs WHERE id=?').get(id)||null;}
  function beginRun(id){if(!/^[-\w]{8,120}$/.test(id||''))fail('A run identifier is required.');const old=run(id);if(old)return{created:false,run:old};if(db.prepare('SELECT count(*) as n FROM agent_runs').get().n>=64)fail('This development slice retains at most 64 runs. Review its retention design before continuing.');db.prepare("INSERT INTO agent_runs VALUES(?,'running',?,NULL)").run(id,view().revision);return{created:true,run:run(id)};}
  function finishRun(id,status,result){if(!['draft','unconfirmed'].includes(status))fail('Invalid run outcome.');const body=JSON.stringify(result);if(Buffer.byteLength(body)>200000)fail('Agent result exceeds the development limit.');db.prepare("UPDATE agent_runs SET status=?,result=? WHERE id=? AND status='running'").run(status,body,id);return run(id);}
  const chats=teamMode?null:require('./conversations.cjs').createConversations(db,{digest,fail,read});
  const reports=teamMode?null:require('./reports.cjs').createReports(db,{read,digest,fail,ids,source:recordId=>tool('owl_get_source',{recordId}),managedSource:recordId=>authoring.source(recordId)||originals.source(recordId),provenance:example.metadata.provenance,fault,onReady:activity.reportReady});
  let team=null,identity=null;
  if(teamMode){
    try{
      team=require('./team-store.cjs').create({db,transaction,activate:()=>capabilities.activate('team-identity'),native:()=>read().workspace,fail,onAccessChanged:id=>identity?.revokeAll(id)});
      identity=require('./identity.cjs').create({...identityOptions,db,transaction,accounts:team,fail});
      capabilities.guard();
    }catch(error){db.close();throw error;}
  }
  return{conversationPending:()=>!teamMode&&!!db.prepare("SELECT 1 FROM chat_turns WHERE status='running' UNION ALL SELECT 1 FROM agent_runs WHERE status='running' LIMIT 1").get(),view,read,operation,tool,engine,run,beginRun,finishRun,chats,reports,activity,originals,authoring,team,identity,teamTransaction:transaction,source:evidenceSource,evidenceProjection:()=>evidence.projection(read().workspace),listRuns:()=>db.prepare('SELECT id,status,basis_revision FROM agent_runs ORDER BY rowid DESC').all(),receipt:id=>db.prepare('SELECT result FROM operations WHERE id=?').get(id)?.result||null,close:()=>db.close()};
}
module.exports={createStore,digest};
