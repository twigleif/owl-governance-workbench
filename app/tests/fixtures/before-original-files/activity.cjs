'use strict';
// Read-only native history plus atomic operation metadata. Never a governance writer.
const crypto=require('node:crypto');
const reference=require('../prototypes/src/reference-schema.js'),assessment=require('../prototypes/src/assessment-schema.js'),C=require('../prototypes/src/register-core.js'),templates=require('../prototypes/src/document-template-registry.js');
const clone=v=>JSON.parse(JSON.stringify(v)),hash=v=>crypto.createHash('sha256').update(JSON.stringify(v)).digest('hex');
const human=s=>String(s).replace(/_/g,' ').replace(/([a-z])([A-Z])/g,'$1 $2').replace(/^./,c=>c.toUpperCase());
const activityTypes=['all','updated','created','deleted','restored','exports','other'];
function activityType(action){if(action==='create')return'created';if(action==='delete')return'deleted';if(action==='restore-row')return'restored';if(action==='export')return'exports';return ['edit','apply','source-change','capture','link','unlink'].includes(action)?'updated':'other';}
const paths=[['systems',w=>w.history],['references',w=>w.references?.history],['assessments',w=>w.assessments?.history],['documents',w=>w.documents?.history],['soa',w=>w.controls_soa?.history],['register',w=>w.register_control?.history],['issues',w=>w.register_control?.issues],['directory',w=>w.directory?.history],['dropdowns',w=>w.dropdowns?.history],['soa-artifacts',w=>w.soa_artifacts?.events]];
const rawNative=w=>paths.flatMap(([owner,get])=>(get(w)||[]).map(e=>({id:'native:'+owner+':'+hash(e),owner,e})));
const text=v=>typeof v==='string'?v:v===null?'Not present':v===undefined?undefined:JSON.stringify(v);
function normalizeNative(w,{id,owner,e}){
 const recordId=e.record_id||e.system_id||e.id||'',rowId=e.row_id||'',subjects=[recordId,rowId].filter(Boolean),action=e.action||'edit',items=[];
 const doc=owner==='documents'?w.documents.entries.find(d=>d.record_id===recordId):null;
 let scope=['systems','assessments'].includes(owner)?'docent':'organization';
 const row=owner==='references'?w.references[e.kind]?.find(r=>r.values.id===recordId)?.values:null;
 if(row?.system_id||row?.subject_type==='AI system')scope='docent';
 function label(key){
  if(owner==='documents'&&doc){const target=key.replace(/^values\./,'');return templates.get(doc.template).catalog.find(f=>f.target===target)?.label||human(key);}
  if(owner==='assessments')return assessment.fields[e.unit]?.find(f=>f.key===key)?.label||human(key);
  if(owner==='references')return reference.fields[e.kind]?.find(f=>f[0]===key)?.[1]||human(key);
  if(owner==='systems')return C.catalog.find(f=>f.key===key)?.label||human(key);
  return human(key);
 }
 function item(key,before,after,atomic=false){
  if(JSON.stringify(before)===JSON.stringify(after))return;
  items.push({key,title:label(key),...(before!==undefined?{before:text(before)}:{}),...(after!==undefined?{after:text(after)}:{}),atomic});
 }
 function values(before,after,creating=false){for(const key of new Set([...Object.keys(before||{}),...Object.keys(after||{})]))item(key,before?.[key]??(creating?'':undefined),after?.[key],/(?:^id$|_id$|_date$|^result$|^applicability$|^evaluation_level$|^access$|^lifecycle$|^status$|^type$)/.test(key));}
 if(owner==='assessments'){
  if(e.unit==='evidence')for(const payload of [e.before,e.after])if(payload?.values?.item_type==='Review item')subjects.push(payload.values.item_id,payload.values.record_id);
  values(e.before?.values,e.after?.values,action==='create');
  if(['delete','restore-row'].includes(action))item('Record state',action==='delete'?'Active':'Deleted',action==='delete'?'Deleted':'Active',true);
  if(JSON.stringify(e.before?.captures)!==JSON.stringify(e.after?.captures))item('Captured source basis',action==='create'?'':e.before?.captures,e.after?.captures,true);
 }else if(Array.isArray(e.changes)){
  for(const change of e.changes){
   const key=change.field||change.path?.join('.')||'Saved value';
   if(key==='entry'&&owner==='documents'){values(change.before?.values,change.after?.values,action==='create');continue;}
   item(key,change.before,change.after,typeof change.before!=='string'&&typeof change.after!=='string');
  }
  if(['delete','restore-row'].includes(action))item('Record state',action==='delete'?'Active':'Deleted',action==='delete'?'Deleted':'Active',true);
 }else if(e.before||e.after)values(e.before,e.after,action==='create');
 else item('Saved event basis',undefined,e,true);
 if(owner==='documents'){
  if(action==='create'||items.some(i=>/T4R2C1|T16R2C1/.test(i.key)))subjects.push('organization-context');
  if(action==='create'||items.some(i=>i.key==='values.T12R2C1'))subjects.push('organization-scope');
 }
 const kind=owner==='references'?human(e.kind):owner==='documents'?'Document':owner==='assessments'?human(e.unit||'Assessment'):human(owner);
 const verb={create:'Created',edit:'Updated',delete:'Deleted','restore-row':'Restored',capture:'Updated source capture',freeze:'Preserved issued version',lock:'Locked retained assessment'}[action]||human(action);
 return{id,title:verb+' '+kind+(recordId?' · '+(rowId||recordId):''),at:e.at||null,actor:e.operator||null,scope,subjects,action,source:'Retained native history',revision:e.workspace_revision??e.revision??null,items,...(['delete','restore-row'].includes(action)?{note:'Lifecycle event. The retained record values and earlier history were not cleared.'}:{})};
}
function createActivity(db,{read,fail}){
 db.exec(`CREATE TABLE IF NOT EXISTS activity_commits(id TEXT PRIMARY KEY,operation_id TEXT UNIQUE REFERENCES operations(id),at TEXT NOT NULL,body TEXT NOT NULL);
 CREATE TRIGGER IF NOT EXISTS activity_commits_no_update BEFORE UPDATE ON activity_commits BEGIN SELECT RAISE(ABORT,'Activity entries are append-only'); END;
 CREATE TRIGGER IF NOT EXISTS activity_commits_no_delete BEFORE DELETE ON activity_commits BEGIN SELECT RAISE(ABORT,'Activity entries are append-only'); END;`);
 const titles={save_organization:'Saved Organization context',save_scope:'Saved AIMS scope',save_system:'Saved system context',save_review:'Saved review draft',save_request_draft:'Saved evidence request',save_chat_request:'Saved agent-prepared request',save_setup_stage:'Updated setup progress'};
 function capture(request,before,after,at){
  const previous=new Set(rawNative(before.workspace).map(e=>e.id)),nativeIds=rawNative(after.workspace).filter(e=>!previous.has(e.id)).map(e=>e.id),items=[];
  for(const [key,title]of [['requestDraft','Evidence request'],['setupStage','Setup progress']])if(before.meta[key]!==after.meta[key])items.push({key,title,before:String(before.meta[key]),after:String(after.meta[key]),atomic:key==='setupStage'});
  if(!nativeIds.length&&!items.length)return;
  const evidenceAction=request.command==='remove_evidence_use'?'delete':request.command==='restore_evidence_use'?'restore-row':request.command==='save_evidence_use'&&!request.values.rowId?'create':'edit';
  const body={id:'operation:'+request.id,title:titles[request.command]||human(request.command),at,actor:'Ren',source:request.command==='save_chat_request'?'Human save of agent-prepared draft':'Manual edit',scope:['save_organization','save_scope','save_setup_stage'].includes(request.command)?'organization':'docent',subjects:items.some(i=>i.key==='requestDraft')?['saved-request']:[],action:evidenceAction,revision:after.workspace.revision,nativeIds,items,operationId:request.id};
  db.prepare('INSERT INTO activity_commits VALUES(?,?,?,?)').run(body.id,request.id,at,JSON.stringify(body));
 }
 function reportReady(report){const body={id:'report:'+report.id,reportId:report.id,title:'Created Docent PDF',at:report.finishedAt,actor:'Ren',scope:'docent',subjects:[report.reviewId,report.assessmentId],action:'export',source:'PDF snapshot',revision:report.workspaceRevision,nativeIds:[],items:[],note:'Frozen saved-revision snapshot. Generating this PDF did not issue or approve it.'};db.prepare('INSERT OR IGNORE INTO activity_commits VALUES(?,NULL,?,?)').run(body.id,body.at,JSON.stringify(body));}
 function all(){
  const {workspace:w}=read(),native=rawNative(w).map(e=>normalizeNative(w,e)),byId=new Map(native.map(e=>[e.id,e])),used=new Set(),events=[];
  for(const row of db.prepare('SELECT body FROM activity_commits ORDER BY rowid').all()){
   const h=JSON.parse(row.body),children=h.nativeIds.map(id=>byId.get(id)).filter(Boolean);h.nativeIds.forEach(id=>used.add(id));
   events.push({...h,subjects:[...new Set([...h.subjects,...children.flatMap(e=>e.subjects)])],items:[...children.flatMap(e=>e.items),...h.items],...(children.length<h.nativeIds.length?{note:'Some original native event data is unavailable. No comparison was inferred for missing values.'}:{})});
  }
  events.push(...native.filter(e=>!used.has(e.id)));
  const exports=new Set(events.map(e=>e.reportId).filter(Boolean));
  for(const row of db.prepare("SELECT id,created_at,finished_at,input_json FROM pdf_reports WHERE status='ready'").all())if(!exports.has(row.id)){
   const basis=JSON.parse(row.input_json).basis;events.push({id:'report:'+row.id,reportId:row.id,title:'Created Docent PDF',at:row.finished_at||row.created_at,actor:null,scope:'docent',subjects:[basis.review.values.id,basis.assessment.record_id],action:'export',source:'Retained PDF',revision:basis.workspace.revision,items:[],note:'Retained frozen report. Its operator was not recorded in the original report metadata.'});
  }
  return events.sort((a,b)=>String(b.at||'').localeCompare(String(a.at||''))||(b.revision||0)-(a.revision||0)||a.id.localeCompare(b.id));
 }
 function list({scope='all',subject='',q='',type='all',offset=0,limit=50}={}){
  if(!['all','organization','docent'].includes(scope)||!activityTypes.includes(type)||typeof subject!=='string'||subject.length>300||typeof q!=='string'||q.length>200||!Number.isSafeInteger(offset)||offset<0||!Number.isSafeInteger(limit)||limit<1||limit>100)fail('Choose valid activity filters.','activity-invalid');
  const needle=q.toLowerCase(),events=all().filter(e=>(scope==='all'||e.scope===scope)&&(!subject||e.subjects.includes(subject))&&(type==='all'||activityType(e.action)===type)&&(!needle||JSON.stringify([e.title,e.subjects,e.items]).toLowerCase().includes(needle)));
  return{total:events.length,offset,nextOffset:offset+limit<events.length?offset+limit:null,events:events.slice(offset,offset+limit).map(({items,nativeIds,...h})=>({...h,changedFields:items.length})),coverage:'Native record histories, current-operation technical changes and ready PDFs. Older technical drafts without retained before/after data cannot be reconstructed.'};
 }
 function get(id){if(typeof id!=='string'||id.length>240)fail('Choose a valid history entry.','activity-invalid');const event=all().find(e=>e.id===id);if(!event)fail('This history entry is unavailable. Refresh Activity log.','activity-missing');return clone(event);}
 return{capture,reportReady,list,get};
}
module.exports={createActivity,rawNative,normalizeNative};
