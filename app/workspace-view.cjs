'use strict';
// Read-only projection over existing owners. No persistence or model-context changes.
const path=require('node:path'),crypto=require('node:crypto'),A=require('./core/assessment-core.js');
function project(store){
 const {workspace:w}=store.read(),view=store.view(),entry=A.find(w,view.assessment.id);
 if(w.revision!==view.revision)throw Error('Saved work changed while opening its details. Refresh the workspace.');
 const files=Object.fromEntries(view.records.map(r=>{
  try{const source=store.tool('owl_get_source',{recordId:r.id}),bytes=source.body===null?null:Buffer.from(source.body,'utf8');return[r.id,{available:!!bytes,name:bytes?path.basename(r.location):null,type:bytes?'Markdown':null,bytes:bytes?.length||0,sha256:bytes?crypto.createHash('sha256').update(bytes).digest('hex'):null}];}
  catch{return[r.id,{available:false,error:'The saved source does not match the admitted example or its file cannot be read. Check its Record details before using it.'}];}
 }));
 const ids={assessment:view.assessment.id,system:view.system.system_id};
 const managed=[...store.originals.list(),...store.authoring.listArtifacts()];for(const r of managed)if(r.record)files[r.record.id]=r.file;
 return{revision:w.revision,pendingConversation:!!store.conversationPending?.(),files,managedRecords:managed.map(r=>r.record),suggestedRecordId:store.originals.suggest(),reviews:require('./reviews.cjs').contexts(w,ids),evidenceLinks:store.evidenceProjection(),recordRevisions:Object.fromEntries(w.references.records.map(r=>[r.values.id,r.revision])),evidenceUses:entry.evidence.filter(r=>!r.deleted_at).map(r=>r.values),otherReviews:entry.review.filter(r=>!r.deleted_at&&r.values.id!==view.review.id).map(r=>r.values),reviewHistory:w.assessments.history.filter(h=>h.record_id===entry.record_id&&h.unit==='review'&&h.row_id===view.review.id).map(h=>({at:h.at,action:h.action,entryRevision:h.entry_revision,workspaceRevision:h.workspace_revision,before:h.before?.values||null,after:h.after?.values||null}))};
}
module.exports={project};
