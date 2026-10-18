'use strict';
const A=require('../prototypes/src/assessment-core.js');
const clone=x=>JSON.parse(JSON.stringify(x));
function resolve(w,ids,target={},fail=(message,code)=>{throw Object.assign(Error(message),{code});}){
 const explicit=target.assessmentId!==undefined||target.reviewId!==undefined;
 const assessmentId=explicit?target.assessmentId:ids.assessment,reviewId=explicit?target.reviewId:ids.secondReview;
 if(assessmentId!==ids.assessment||typeof reviewId!=='string'||!reviewId)fail('Open an available Review in this System and Assessment.','review-scope');
 const entry=A.find(w,assessmentId),row=entry?.review.find(r=>r.values.id===reviewId&&!r.deleted_at);
 if(!entry||entry.deleted_at||entry.read_only||entry.system_id!==ids.system||!row)fail('This Review is unavailable or retained read-only. Open the Reviews list.','review-unavailable');
 return{entry,row};
}
function contexts(w,ids){
 const entry=A.find(w,ids.assessment);if(!entry||entry.deleted_at||entry.read_only||entry.system_id!==ids.system)return[];
 const value=(kind,id)=>clone(w.references[kind]?.find(r=>!r.deleted_at&&r.values.id===id)?.values||null);
 return entry.review.filter(r=>!r.deleted_at).map(row=>{
  const r=row.values,links=w.references.links.filter(l=>!l.deleted_at&&(l.values.from_id===r.criterion_id||l.values.to_id===r.criterion_id)).map(l=>clone(l.values));
  const endpoint=type=>links.find(l=>l.to_id===r.criterion_id&&l.from_type===type)?.from_id;
  return{assessmentId:entry.record_id,systemId:entry.system_id,review:{revision:row.revision,...clone(r)},control:r.criterion_type==='Control'?value('controls',r.criterion_id):null,requirement:r.criterion_type==='Requirement'?value('requirements',r.criterion_id):value('requirements',endpoint('Requirement')),risk:value('risks',endpoint('Risk or opportunity')),action:value('actions',r.action_id),links};
 });
}
module.exports={resolve,contexts};
