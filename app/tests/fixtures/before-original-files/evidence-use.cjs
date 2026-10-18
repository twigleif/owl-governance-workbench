'use strict';
// Native Assessment Evidence is the only saved link owner. This slice admits
// existing fictional originals; it does not admit files or evaluate their claims.
const A=require('../prototypes/src/assessment-core.js'),S=require('../prototypes/src/assessment-schema.js');
const copy=x=>JSON.parse(JSON.stringify(x));
function suggestion(ids){
 const parts=ids.map(id=>/^(.*?)(\d+)$/.exec(id));
 if(!parts.length||parts.some(x=>!x)||new Set(parts.map(x=>x[1]+'|'+x[2].length)).size!==1)return '';
 const n=Math.max(...parts.map(x=>Number(x[2])))+1;return Number.isSafeInteger(n)?parts[0][1]+String(n).padStart(parts[0][2].length,'0'):'';
}
function create({ids,source,fail,digest,C}){
 function entry(w){const e=A.find(w,ids.assessment);if(!e||e.deleted_at||e.read_only)fail('This Assessment is unavailable or retained read-only. Open its saved details.','evidence-read-only');return e;}
 function projection(w){const e=A.find(w,ids.assessment);return{suggestedId:suggestion(e.reservations.evidence),reservedIds:copy(e.reservations.evidence),rows:e.evidence.map(r=>({...copy(r),capture:copy(e.captures.find(c=>c.unit==='evidence'&&c.row_id===r.values.id&&c.field==='record_id')||null)}))};}
 function duplicate(e,v,exclude){return e.evidence.find(r=>r.values.id!==exclude&&['item_type','item_id','record_id','claim','locator','period'].every(k=>r.values[k]===v[k]));}
 function checkDuplicate(e,v,exclude){const d=duplicate(e,v,exclude);if(d)fail('This exact claim and source location already have a link. '+(d.deleted_at?'Restore':'Open')+' '+d.values.id+'.','evidence-duplicate',{existingId:d.values.id,removed:!!d.deleted_at});}
 function apply(w,command,p,at){
  const e=entry(w);if(!p||typeof p!=='object')fail('Open the evidence link before saving.','evidence-invalid');
  const {row:review}=require('./reviews.cjs').resolve(w,ids,p,fail),reviewId=review.values.id;
  const old=e.evidence.find(r=>r.values.id===p.rowId);
  if(p.rowId!==null&&!old)fail('The saved link is unavailable. Open its retained History before starting a different link.','evidence-conflict');
  if(old&&(old.values.item_type!=='Review item'||old.values.item_id!==reviewId))fail('This link belongs to another assessment item. Its identity and target are preserved.','evidence-scope');
  if(p.entryRevision!==e.revision||(old?.revision||0)!==p.rowRevision)fail('Saved link values changed. Compare them before retrying.','evidence-conflict');
  if(command!=='save_evidence_use'){
   if(!old||old.values.item_type!=='Review item'||old.values.item_id!==reviewId)fail('Open a link belonging to this Review.','evidence-scope');
   if(command==='restore_evidence_use')checkDuplicate(e,old.values,old.values.id);
   return C.setAssessmentDeleted(w,ids.assessment,'evidence',old.values.id,{baseEntryRevision:e.revision,baseUnitRevision:old.revision,deleted:command==='remove_evidence_use',at});
  }
  const v=p.fields;if(!v||Object.keys(v).sort().join(',')!==S.fields.evidence.map(f=>f.key).sort().join(','))fail('The link must retain all source-owned Evidence fields. Reopen its details.','evidence-invalid');
  if(v.item_type!=='Review item'||v.item_id!==reviewId)fail('Choose the exact Review that owns this evidence use.','evidence-scope');
  if(!v.claim?.trim())fail('Enter the claim this source may support.','evidence-claim');
  if(typeof v.id!=='string'||!v.id||v.id!==v.id.trim()||/[\r\n\t]/.test(v.id))fail('Enter the exact Use ID without surrounding spaces or line breaks.','evidence-id');
  if(old&&(old.values.id!==v.id||old.deleted_at))fail('Saved IDs stay fixed. Restore a removed link before editing.','evidence-id');
  if(!old&&e.reservations.evidence.includes(v.id))fail('That Use ID already exists or was previously used. Choose another exact ID.','evidence-id',{suggestion:suggestion(e.reservations.evidence)});
  // Linking is preparation, never an evidence evaluation or confirmation of access.
  for(const key of ['result','access','rationale','reviewer','review_date'])if(v[key]!== (old?old.values[key]:({result:'Not reviewed',access:'Not checked',rationale:'',reviewer:'',review_date:''})[key]))fail('Evidence evaluation is separate from linking. Keep its saved review state.','evidence-evaluation');
  checkDuplicate(e,v,old?.values.id);
  const record=w.references.records.find(r=>r.values.id===v.record_id&&!r.deleted_at),s=source(v.record_id);
  if(!record||!s.body||record.revision!==p.sourceRevision||s.sha256!==p.sourceSha256)fail('The selected source version changed or its original is unavailable. Inspect and select its current version.','evidence-source');
  const existing=e.captures.find(c=>c.unit==='evidence'&&c.row_id===v.id&&c.field==='record_id');
  const captureRequests=existing&&existing.target_revision===record.revision&&digest(existing.values)===digest(record.values)?[]:[{field:'record_id',expectedRevision:record.revision}];
  return C.saveAssessment(w,ids.assessment,'evidence',copy(v),{rowId:old?.values.id||null,baseEntryRevision:e.revision,baseUnitRevision:old?.revision||0,captureRequests,at});
 }
 return{apply,projection};
}
module.exports={create,suggestion};
