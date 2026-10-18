/* Isolated Register review/issue proposal. Not admitted to the native build or storage. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.OWLRegisterReviewIssueModel=api;})(globalThis,function(){
'use strict';
const fields=Object.freeze({organization:'Organization label',register_id:'Register ID',version:'Draft version',owner:'Register owner'});
const clone=v=>JSON.parse(JSON.stringify(v)),same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const fail=m=>{throw Error(m);};
const stamp=s=>typeof s==='string'&&/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(s)&&Number.isFinite(Date.parse(s))&&new Date(s).toISOString()===s;
const blank=()=>({revision:0,values:Object.fromEntries(Object.keys(fields).map(k=>[k,''])),history:[],issues:[]});
function values(v){
 if(!v||Object.keys(v).sort().join(',')!==Object.keys(fields).sort().join(','))fail('Register details have unsupported fields.');
 for(const [k,s] of Object.entries(v)){
  if(typeof s!=='string'||s.length>1000||/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(s))fail(fields[k]+' contains unsupported text.');
  if(k==='register_id'&&s&&(!s.trim()||s!==s.trim()))fail('Register ID must have no leading or trailing spaces.');
 }
 return clone(v);
}
function date(s){
 if(typeof s!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(s))return false;
 const [y,m,d]=s.split('-').map(Number),days=[31,y%4===0&&(y%100!==0||y%400===0)?29:28,31,30,31,30,31,31,30,31,30,31];
 return y>=1900&&y<=9999&&m>=1&&m<=12&&d>=1&&d<=days[m-1];
}
function one(w,id){const found=w.records.filter(r=>!r.deleted_at&&r.values.id===id);return found.length===1?found[0]:null;}
function usable(r,type,lifecycles){return !!r&&r.values.type===type&&lifecycles.includes(r.values.lifecycle)&&r.values.custody==='Available'&&!!r.values.location?.trim();}
function manual(w){
 const id=w.manual_record_id||'',r=one(w,id);
 if(!id)return {id:'',warning:'AIMS Manual is not selected in Controls & SoA details.'};
 if(!usable(r,'Controlled document',['Approved','Issued'])||r.values.subject_type!=='AIMS')return {id:'',warning:'AIMS Manual '+id+' needs one available Approved or Issued AIMS Controlled document Record with a controlled location. Check Controls & SoA → AIMS Manual Record ID.'};
 return {id,warning:'',record:clone(r)};
}
function save(w,input,expectedRevision){
 if(w.revision!==expectedRevision)fail('The saved Register changed. Refresh before saving; keep your typed details.');
 const v=values(input),before=w.control||blank();
 if(same(v,before.values))return w;
 const next=clone(w);next.revision++;next.control??=blank();next.control.revision++;
 next.control.history.push({workspace_revision:next.revision,before:clone(before.values),after:clone(v)});next.control.values=v;
 return next;
}
function draft(w,input,reviewDate){
 const saved=(w.control||blank()).values;
 if(input&&!same(values(input),saved))fail('Save or discard Register details before exporting.');
 if(!date(reviewDate))fail('Choose a real review date.');
 // No owner means the prior saved-only exporter remains the compatibility baseline.
 const m=w.control?manual(w):{id:'',warning:''};
 return {index:{C7:saved.organization,C8:saved.register_id,C9:saved.version,C10:'Draft',F7:'',F8:saved.owner,F9:'',F10:m.id,F11:reviewDate},warnings:m.warning?[m.warning]:[],revision:w.revision};
}
function inspectIssue(w,selection,input){
 const problems=[],v=(w.control||blank()).values;
 if(input&&!same(values(input),v))problems.push('Save or discard Register details before recording an issued copy.');
 for(const [k,label] of Object.entries(fields))if(!v[k].trim())problems.push('Enter '+label+' in Register details.');
 const issued=one(w,selection.issued_record_id),approval=one(w,selection.approval_record_id);
 if(selection.issued_record_id&&selection.issued_record_id===w.manual_record_id)problems.push('The selected Record is the governing AIMS Manual. Choose the retained Register file Record.');
 if(!usable(issued,'Controlled document',['Issued']))problems.push('Choose one available Issued Controlled document Record for the retained Register file, with its controlled location.');
 if(issued&&(!issued.values.version?.trim()||issued.values.version==='Not assigned'))problems.push('The retained Register file needs its exact issued version in Records.');
 if(issued&&!date(issued.values.effective_date))problems.push('The retained Register file needs its effective date in Records.');
 if(!usable(approval,'Approval or decision artifact',['Approved','Issued']))problems.push('Choose one available Approved or Issued Approval or decision artifact Record, with its controlled location.');
 if(approval&&!approval.values.version?.trim())problems.push('The approval artifact needs its version or identifier in Records (Not assigned is allowed).');
 if(issued&&approval&&issued.values.id===approval.values.id)problems.push('The retained Register file and approval artifact must be distinct Records.');
 return {ok:problems.length===0,problems,issued:issued&&clone(issued),approval:approval&&clone(approval)};
}
function pin(w,selection,input){
 const check=inspectIssue(w,selection,input);if(!check.ok)fail(check.problems.join(' '));
 return {workspace_id:w.workspace_id,revision:w.revision,identity:clone(w.control.values),selection:clone(selection),issued:check.issued,approval:check.approval};
}
function capture(w,p,at){
 if(p.workspace_id!==w.workspace_id||p.revision!==w.revision)fail('Saved details or Records changed. Refresh the selection; no issued-copy reference was recorded.');
 const check=inspectIssue(w,p.selection);
 if(!check.ok||!same(p.identity,w.control.values)||!same(p.issued,check.issued)||!same(p.approval,check.approval))fail('Saved details or Records changed. Refresh the selection; no issued-copy reference was recorded.');
 if(!stamp(at))fail('The capture timestamp is invalid.');
 const withdrawn=new Set(w.control.issues.filter(e=>e.kind==='withdraw').map(e=>e.target_sequence));
 const prior=w.control.issues.find(e=>e.kind==='capture'&&!withdrawn.has(e.sequence)&&same(e.issued,p.issued)&&same(e.approval,p.approval)&&e.register_id===p.identity.register_id);
 if(prior)return w;
 const next=clone(w);next.revision++;next.control.revision++;
 next.control.issues.push({kind:'capture',sequence:next.control.issues.length+1,workspace_revision:next.revision,at,register_id:p.identity.register_id,working_identity:clone(p.identity),issued:clone(p.issued),approval:clone(p.approval),effective_date:p.issued.values.effective_date});
 return next;
}
function withdraw(w,sequence,reason,expectedRevision,at){
 if(w.revision!==expectedRevision)fail('The saved Register changed. Refresh before withdrawing the reference.');
 const e=w.control?.issues.find(e=>e.kind==='capture'&&e.sequence===sequence);
 if(!e)fail('The issued-copy reference was not found.');
 if(typeof reason!=='string'||!reason.trim()||reason.length>1000||/[\u0000-\u001f]/.test(reason))fail('Enter the reason for withdrawing this reference.');
 if(!stamp(at))fail('The capture timestamp is invalid.');
 if(w.control.issues.some(e=>e.kind==='withdraw'&&e.target_sequence===sequence))return w;
 const next=clone(w);next.revision++;next.control.revision++;
 next.control.issues.push({kind:'withdraw',sequence:next.control.issues.length+1,workspace_revision:next.revision,at,target_sequence:sequence,reason});
 return next;
}
function issueStatus(w,e){
 if(!e)return {state:'none',reasons:[]};
 const withdrawn=w.control?.issues.find(p=>p.kind==='withdraw'&&p.target_sequence===e.sequence);
 if(withdrawn)return {state:'withdrawn',reasons:[withdrawn.reason]};
 const reasons=[];
 if(e.register_id!==(w.control||blank()).values.register_id)reasons.push('The working Register ID changed.');
 for(const [label,frozen] of [['Retained file',e.issued],['Approval artifact',e.approval]]){
  const r=one(w,frozen.values.id);if(!r||!same(r,frozen))reasons.push(label+' Record changed or is unavailable; the captured reference is retained.');
 }
 return {state:reasons.length?'attention':'recorded',reasons};
}
return Object.freeze({fields,blank,values,date,manual,save,draft,inspectIssue,pin,capture,withdraw,issueStatus});
});
