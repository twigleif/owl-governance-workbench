/* Saved Register identity and externally retained issue references. */
(function(root,factory){const api=factory(typeof module==='object'&&module.exports?require('./register-review-issue-model.js'):root.OWLRegisterReviewIssueModel);if(typeof module==='object'&&module.exports)module.exports=api;else root.OWLRegisterControl=api;})(globalThis,function(M){
'use strict';
const clone=v=>JSON.parse(JSON.stringify(v)),same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),fail=m=>{throw Error(m);};
const stamp=s=>typeof s==='string'&&/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(s)&&Number.isFinite(Date.parse(s))&&new Date(s).toISOString()===s;
function text(v){if(typeof v!=='string'||/[\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/.test(v))fail('Register text contains an unsupported Unicode character.');return v;}
function values(v){const out=M.values(v);Object.values(out).forEach(text);if(/[\r\n\t]/.test(out.register_id))fail('Register ID must fit on one line without tabs.');return Object.fromEntries(Object.keys(M.fields).map(k=>[k,out[k]]));}
function view(w){return {workspace_id:w.workspace_id,revision:w.revision,records:w.references.records,manual_record_id:w.controls_soa.values.aims_manual_record_id||'',...(w.register_control?{control:w.register_control}:{})};}
function details(w){return clone(w.register_control||M.blank());}
function save(w,input,expectedRevision,at){input=values(input);if(!stamp(at))fail('Register Save timestamp is invalid.');const next=M.save(view(w),input,expectedRevision);if(next.revision===w.revision)return w;const out=clone(w);out.revision=next.revision;out.register_control=next.control;Object.assign(out.register_control.history.at(-1),{at,operator:'local-operator'});return out;}
function pin(w,selection,input){return M.pin(view(w),selection,input&&values(input));}
function capture(w,p,at){const next=M.capture(view(w),p,at);if(next.revision===w.revision)return w;const out=clone(w);out.revision=next.revision;out.register_control=next.control;Object.assign(out.register_control.issues.at(-1),{workspace_id:w.workspace_id,source_workspace_revision:w.revision,operator:'local-operator'});return out;}
function withdraw(w,sequence,reason,expectedRevision,at){text(reason);const next=M.withdraw(view(w),sequence,reason,expectedRevision,at);if(next.revision===w.revision)return w;const out=clone(w);out.revision=next.revision;out.register_control=next.control;Object.assign(out.register_control.issues.at(-1),{operator:'local-operator'});return out;}
function closed(v,keys){if(!v||typeof v!=='object'||Array.isArray(v)||Object.keys(v).sort().join(',')!==keys.sort().join(','))fail('Register history contains unsupported or missing properties.');}
function check(w,referenceAt){const o=w.register_control;if(o===undefined)return;
 closed(o,['revision','values','history','issues']);values(o.values);
 if(!Number.isSafeInteger(o.revision)||o.revision<1||!Array.isArray(o.history)||!Array.isArray(o.issues)||o.history.length+o.issues.length!==o.revision||o.revision>10000)fail('Register history has an invalid revision or exceeds its limit.');
 let identity=M.blank().values,previous=0;const withdrawn=new Set();
 for(const e of o.history){closed(e,['workspace_revision','before','after','at','operator']);values(e.before);values(e.after);if(!same(e.before,identity)||same(e.before,e.after)||e.workspace_revision<=previous)fail('Register details history cannot be reconstructed.');identity=e.after;previous=e.workspace_revision;}
 if(!same(identity,o.values))fail('Saved Register details differ from their history.');
 let sequence=0;previous=0;
 for(const e of o.issues){
  if(e.kind==='capture'){
   closed(e,['kind','sequence','workspace_revision','at','register_id','working_identity','issued','approval','effective_date','workspace_id','source_workspace_revision','operator']);values(e.working_identity);
   if(e.workspace_id!==w.workspace_id||e.source_workspace_revision!==e.workspace_revision-1)fail('Register capture belongs to another workspace or saved revision.');
   const prior=o.history.filter(h=>h.workspace_revision<=e.source_workspace_revision).at(-1)?.after||M.blank().values;
   if(!same(prior,e.working_identity)||e.register_id!==prior.register_id||e.effective_date!==e.issued?.values?.effective_date)fail('Register capture differs from its saved identity or effective date.');
   const records=[];for(const frozen of [e.issued,e.approval]){if(!frozen?.values?.id)fail('Register capture is missing an exact Record.');const row=referenceAt(w,'records',frozen.values.id,e.source_workspace_revision);if(!row||!same(row,frozen))fail('Register capture differs from exact historical Records facts.');records.push(row);}
   const manualValues=clone(w.controls_soa.values);for(const h of [...w.controls_soa.history].reverse())if(h.revision>e.source_workspace_revision)for(const change of h.changes)manualValues[change.field]=change.before;
   const v={workspace_id:w.workspace_id,revision:e.source_workspace_revision,records,control:{values:prior},manual_record_id:manualValues.aims_manual_record_id||''};const inspect=M.inspectIssue(v,{issued_record_id:e.issued.values.id,approval_record_id:e.approval.values.id});if(!inspect.ok)fail('Register capture has ineligible historical Records: '+inspect.problems.join(' '));
  }else if(e.kind==='withdraw'){
   closed(e,['kind','sequence','workspace_revision','at','target_sequence','reason','operator']);text(e.reason);if(!e.reason.trim()||e.reason.length>1000||/[\u0000-\u001f]/.test(e.reason)||withdrawn.has(e.target_sequence)||!o.issues.some(p=>p.kind==='capture'&&p.sequence===e.target_sequence&&p.sequence<e.sequence))fail('Register withdrawal has an invalid target or reason.');withdrawn.add(e.target_sequence);
  }else fail('Register history contains an unsupported operation.');
  if(e.sequence!==++sequence||e.workspace_revision<=previous)fail('Register issue history has invalid order.');previous=e.workspace_revision;
 }
 const revisions=new Set();for(const e of [...o.history,...o.issues]){if(!Number.isSafeInteger(e.workspace_revision)||e.workspace_revision<1||e.workspace_revision>w.revision||revisions.has(e.workspace_revision)||!stamp(e.at)||e.operator!=='local-operator')fail('Register history has invalid provenance.');revisions.add(e.workspace_revision);}
}
function restore(current,next){if(!current.register_control)return;const a=current.register_control,b=next.register_control;if(!b||a.history.some((e,i)=>!same(e,b.history[i]))||a.issues.some((e,i)=>!same(e,b.issues[i])))fail('This backup would remove or replace saved Register history. Recover a compatible backup that includes the current Register details and issued-copy references.');}
return Object.freeze({fields:M.fields,details,values,save,pin,capture,withdraw,check,restore,manual:w=>M.manual(view(w)),draft:(w,input,date)=>M.draft(view(w),input,date),inspectIssue:(w,selection,input)=>M.inspectIssue(view(w),selection,input),issueStatus:(w,e)=>M.issueStatus(view(w),e)});
});
