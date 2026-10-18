/* Suite-mapped Risk/Control rules and explicit preparation. No writes or authority inference. */
(function(root,factory){
  if(typeof module==='object'&&module.exports)module.exports=factory(require('./register-core.js'),require('./reference-schema.js'),require('./register-references.js'));
  else root.OWLRiskControls=factory(root.OWLRegister,root.OWLReferenceSchema,root.OWLReferences);
})(globalThis,function(C,S,T){
  'use strict';
  const kinds=Object.freeze(['risks','controls']);
  const initial={risks:['id','type','scope','title','statement','affected','owner','lifecycle'],controls:['id','control_set','source_record_id','source_locator','name','scope','lifecycle']};
  const wordingFields={risks:['scope','title','statement','affected','uncertainty','review_trigger'],controls:['name','scope','rationale','implementation_summary','review_trigger']};
  const priority={invalid:0,'as-of':0,reference:1,authority:1,due:2,'date-order':2,capture:3,assignment:3,review:4,pending:4,'source-review':5,'human-review':5,'follow-up':6};
  const trim=v=>typeof v==='string'?v.trim():'';
  const label=(kind,field)=>S.fields[kind]?.find(([k])=>k===field)?.[1]||S.soaFields.find(([k])=>k===field)?.[1]||field;
  const destination=(sheet,id,field='id')=>({sheet,id,field});
  const currentControl=v=>!['Superseded','Retired'].includes(v.lifecycle);
  function collector(){const issues=[];return {issues,add(field,code,rule,message,target){if(!issues.some(i=>i.field===field&&i.rule===rule))issues.push({field,code,rule,message,...(target?{destination:target}:{})});}};}
  function resolve(w,sheet,id,field,add){
    if(!id)return null;
    const found=T.lookupSheet(w,sheet,id);
    if(found.status!=='found'){add(field,'reference','POINTER:'+field,`${S.soaFields.find(([key])=>key===field)?.[1]||Object.values(S.fields).flat().find(([key])=>key===field)?.[1]||field} ${id} ${found.status==='deleted'?'is in Deleted rows':'was not found in '+(S.labels[sheet]||'AI Systems')}. The exact pointer is retained.`,found.destination);return null;}
    return found.row.values;
  }
  function record(w,id,field,add,asOf,{types,states=['Completed','Approved','Issued'],required=['version','location'],annex=false}={}){
    const r=resolve(w,'records',id,field,add);if(!r)return null;
    if(types&&!types.includes(r.type))add(field,'reference','RECORD:TYPE:'+field,`Record ${id} is ${r.type||'without a type'}; expected ${types.join(' or ')}.`,destination('records',id,'type'));
    for(const key of required)if(!trim(r[key])||annex&&['owner','custodian'].includes(key)&&trim(r[key]).toLowerCase()==='unassigned')add(field,'source-review','RECORD:'+key+':'+field,`Record ${id}: ${label('records',key)} is ${r[key]||'blank'}. Record its exact metadata.`,destination('records',id,key));
    for(const key of S.dates.records)if(r[key]&&!C.validDate(r[key]))add(field,'source-review','RECORD:DATE:'+key+':'+field,`Record ${id}: ${label('records',key)} is not a valid calendar date. Review the retained source value.`,destination('records',id,key));
    if(r.custody!=='Available')add(field,'source-review','RECORD:CUSTODY:'+field,`Record ${id} custody is ${r.custody||'blank'}; Available metadata and a retained location are needed. Actual access remains unverified.`,destination('records',id,'custody'));
    if(!states.includes(r.lifecycle))add(field,'source-review','RECORD:LIFECYCLE:'+field,`Record ${id} is ${r.lifecycle||'without lifecycle'}; expected ${states.join(' / ')} for this current pointer.`,destination('records',id,'lifecycle'));
    if(C.validDate(asOf)&&C.validDate(r.effective_date)&&r.effective_date>asOf)add(field,'source-review','RECORD:FUTURE:'+field,`Record ${id} takes effect on ${r.effective_date}, after As-of ${asOf}.`,destination('records',id,'effective_date'));
    if(r.validity_end&&!C.validDate(r.validity_end))add(field,'source-review','RECORD:EVENT:'+field,`Record ${id} has event-based validity. Review the event; no calendar expiry was inferred.`,destination('records',id,'validity_end'));
    else if(C.validDate(asOf)&&r.validity_end&&r.validity_end<asOf)add(field,'source-review','RECORD:EXPIRED:'+field,`Record ${id} validity ended ${r.validity_end}. Review current reliance.`,destination('records',id,'validity_end'));
    return r;
  }
  function decision(w,id,field,add,asOf,{subjectType,subjectId,families,positive}={}){
    const d=resolve(w,'decisions',id,field,add);if(!d)return null;
    if(d.subject_type!==subjectType||d.subject_id!==subjectId)add(field,'authority','DECISION:SUBJECT:'+field,`Decision ${id} names ${d.subject_type||'(no type)'} ${d.subject_id||'(no ID)'}; expected ${subjectType} ${subjectId}. Review the exact issued subject.`,destination('decisions',id,'subject_id'));
    if(!families.includes(d.type))add(field,'authority','DECISION:PURPOSE:'+field,`Decision ${id} records ${d.type||'no purpose'}. Review whether it supports this ${subjectType} disposition; it is not automatically risk acceptance or SoA issue.`,destination('decisions',id,'type'));
    for(const key of ['scope','question','rationale','conditions','issuer','authority_role','authority_record_id','evidence_cutoff','decision_date','effective_date'])if(!trim(d[key]))add(field,'authority','DECISION:MISSING:'+key+':'+field,`Decision ${id}: ${label('decisions',key)} is blank. Record the actual issued facts before current reliance.`,destination('decisions',id,key));
    if(d.outcome&&!S.options('decisions','outcome',d).includes(d.outcome))add(field,'authority','DECISION:OUTCOME:'+field,`Decision ${id} outcome ${d.outcome} is outside its type's suite list.`,destination('decisions',id,'outcome'));
    else if(!d.outcome||!positive.includes(d.outcome))add(field,'pending','DECISION:DISPOSITION:'+field,`Decision ${id} records ${d.outcome||'no outcome'}. Review the next treatment or disposition step with the recorded decision-maker.`,destination('decisions',id,'outcome'));
    if(d.lifecycle!=='Effective')add(field,'authority','DECISION:LIFECYCLE:'+field,`Decision ${id} is ${d.lifecycle||'without lifecycle'}, not recorded Effective.`,destination('decisions',id,'lifecycle'));
    for(const key of ['evidence_cutoff','decision_date','effective_date','expiry_date'])if(d[key]&&!C.validDate(d[key]))add(field,'authority','DECISION:DATE:'+key+':'+field,`Decision ${id}: ${label('decisions',key)} is not a valid calendar date.`,destination('decisions',id,key));
    if(C.validDate(asOf)){
      for(const key of ['decision_date','effective_date'])if(C.validDate(d[key])&&d[key]>asOf)add(field,'authority','DECISION:FUTURE:'+key+':'+field,`Decision ${id} ${label('decisions',key)} ${d[key]} is after As-of ${asOf}.`,destination('decisions',id,key));
      if(C.validDate(d.expiry_date)&&d.expiry_date<asOf)add(field,'authority','DECISION:EXPIRED:'+field,`Decision ${id} expired ${d.expiry_date}.`,destination('decisions',id,'expiry_date'));
    }
    if(C.validDate(d.evidence_cutoff)&&C.validDate(d.decision_date)&&d.evidence_cutoff>d.decision_date)add(field,'authority','DECISION:CUTOFF:'+field,`Decision ${id} Evidence cut-off follows Decision date.`,destination('decisions',id,'evidence_cutoff'));
    if(C.validDate(d.expiry_date)&&C.validDate(d.effective_date)&&d.expiry_date<d.effective_date)add(field,'authority','DECISION:ORDER:'+field,`Decision ${id} Expiry date precedes Effective date.`,destination('decisions',id,'expiry_date'));
    if(C.validDate(d.effective_date)&&C.validDate(d.decision_date)&&d.effective_date<d.decision_date)add(field,'source-review','DECISION:BACKDATE:'+field,`Decision ${id} takes effect before its Decision date. Review the recorded dates and authority; this ordering alone does not establish invalid authority.`,destination('decisions',id,'effective_date'));
    if(d.authority_record_id)record(w,d.authority_record_id,field,add,asOf);
    return d;
  }
  function reviewDates(v,add,asOf,historical){
    if(!C.validDate(asOf))add('next_review','as-of','ASOF','Choose a valid As-of Date before relying on calendar checks.');
    if(C.validDate(asOf)&&C.validDate(v.last_reviewed)&&v.last_reviewed>asOf)add('last_reviewed','date-order','REVIEW:FUTURE',`Last reviewed ${v.last_reviewed} is after As-of ${asOf}; saving does not perform a review.`);
    if(C.validDate(v.last_reviewed)&&C.validDate(v.next_review)&&v.next_review<v.last_reviewed)add('next_review','date-order','REVIEW:ORDER','Next review date precedes Last reviewed. Review the recorded plan.');
    if(!historical&&C.validDate(asOf)&&C.validDate(v.next_review)&&v.next_review<=asOf)add('next_review','due','REVIEW:DUE',`${v.next_review===asOf?'Review due today':'Review overdue since'} ${v.next_review}. ${trim(v.owner)&&trim(v.owner).toLowerCase()!=='unassigned'?'Ask '+v.owner+' to review this item.':'Record the accountable reviewer; owner is not assigned.'}`);
  }
  function predecessor(w,kind,v,add){
    if(!v.supersedes)return;
    if(v.supersedes===v.id)add('supersedes','reference','SUPERSEDES:SELF','A row cannot supersede itself.');
    else resolve(w,kind,v.supersedes,'supersedes',add);
    const rows=[...T.rows(w,kind),...T.rows(w,kind,{deleted:true})],overlay=new Map(rows.map(r=>[r.values.id,r.values]));overlay.set(v.id,v);
    const visited=new Set([v.id]);let next=v.supersedes;
    while(next){if(visited.has(next)){add('supersedes','reference','SUPERSEDES:CYCLE','The Supersedes chain contains a cycle. Review its exact IDs.');break;}visited.add(next);next=overlay.get(next)?.supersedes;}
  }
  function followupRoutes(w,id,asOf){
    const found=new Map();
    for(const row of T.rows(w,'actions'))if(row.values.source_type==='Control'&&row.values.source_id===id)found.set(row.values.id,{row,route:'Primary source'});
    if(C.validDate(asOf))for(const link of T.rows(w,'links')){const v=link.values;if(v.from_type!=='Action'||v.relationship!=='Also responds to'||v.to_type!=='Control'||v.to_id!==id||v.status!=='Active'||!C.validDate(v.effective_date)||v.effective_date>asOf||v.end_date&&(!C.validDate(v.end_date)||v.end_date<asOf||v.end_date<v.effective_date))continue;const a=T.lookup(w,'Action',v.from_id);if(a.status==='found'&&!found.has(v.from_id))found.set(v.from_id,{row:a.row,route:'Link '+v.id});}
    return [...found.values()];
  }
  function diagnose(w,kind,row,asOf){
    if(!kinds.includes(kind))throw Error('Choose Risks & Opportunities or Controls & SoA.');
    const v=row.values,{issues,add}=collector(),information=[];
    try{C.validateReference(kind,v,{identity:false});}catch(e){add(e.field||'id','invalid','STRUCTURE',e.message);}
    if(!v||S.fields[kind].some(([f])=>typeof v[f]!=='string'))return {issues,information,registrationCount:0,registrationComplete:false,nextField:'id'};
    for(const i of S.choiceIssues(kind,v))add(i.field,'invalid','CHOICE:'+i.field,i.message);
    for(const field of initial[kind])if(!trim(v[field]))add(field,'capture','CAPTURE:'+field,`Record ${label(kind,field)} when available. This incomplete row can still save with its assigned ID.`);
    if(trim(v.owner).toLowerCase()==='unassigned')add('owner','assignment','OWNER','Owner is Unassigned. Record the accountable person or role.');
    const historical=kind==='risks'?['Closed','Superseded','Retired'].includes(v.lifecycle):!currentControl(v);
    reviewDates(v,add,asOf,historical);predecessor(w,kind,v,add);
    if(kind==='risks'){
      if(v.system_id)resolve(w,'systems',v.system_id,'system_id',add);
      const assessed=['assessment_record_id','result','result_basis','evaluation','uncertainty'];
      if(assessed.some(f=>trim(v[f]))){for(const field of [...assessed,'last_reviewed'])if(!trim(v[field]))add(field,'review','R-EVALUATION:'+field,`Complete the current assessment summary: ${label(kind,field)} is blank.`);if(!v.next_review&&!trim(v.review_trigger))add('next_review','review','R-EVALUATION:SCHEDULE','Enter a Next review date or Review trigger for this assessed summary.');}
      if(v.assessment_record_id){const r=record(w,v.assessment_record_id,'assessment_record_id',add,asOf,{types:['Assessment']});if(r?.subject_type==='AI system'&&v.system_id&&r.subject_id!==v.system_id)add('assessment_record_id','reference','R-ASSESSMENT:SYSTEM',`Assessment ${r.id} names AI system ${r.subject_id}; this row names ${v.system_id}.`,destination('records',r.id,'subject_id'));}
      if(v.governing_decision_id)decision(w,v.governing_decision_id,'governing_decision_id',add,asOf,{subjectType:'Risk or opportunity',subjectId:v.id,families:v.type==='Opportunity'?['Opportunity']:['Residual risk','Risk treatment plan'],positive:v.type==='Opportunity'?['Pursue','Pursue with conditions']:['Accepted','Accepted with conditions','Approved','Approved with conditions']});
      if(v.result_basis==='Verified after response')information.push({field:'result_basis',message:'Verified after response is recorded input. OWL has not evaluated the actual implementation or evidence.'});
    }else{
      if(v.source_record_id)record(w,v.source_record_id,'source_record_id',add,asOf,v.control_set==='ISO 42001 Annex A'?{types:['External source'],states:['Issued'],required:['version','location','owner','custodian','record_date','access','retention'],annex:true}:{});
      if(!v.applicability||['Not assessed','Under review'].includes(v.applicability))add('applicability','pending','C-DETERMINATION:PENDING',`Applicability is ${v.applicability||'not recorded'}. Record the responsible human's determination.`);
      if(['Applicable','Not applicable'].includes(v.applicability)){
        for(const field of ['scope','rationale','owner','implementation','lifecycle','last_reviewed'])if(!trim(v[field]))add(field,'review','C-DETERMINATION:'+field,`${v.applicability} is recorded, but ${label(kind,field)} is blank.`);
        if(!v.next_review&&!trim(v.review_trigger))add('next_review','review','C-DETERMINATION:SCHEDULE','Enter a Next review date or Review trigger for the recorded determination.');
        if(v.applicability==='Applicable'&&v.implementation==='Not required'||v.applicability==='Not applicable'&&v.implementation!=='Not required')add('implementation','review','C-DETERMINATION:CONFLICT',`${v.applicability} and ${v.implementation||'blank implementation'} conflict. Review both recorded values; neither was changed.`);
      }
      if(!v.implementation||['Not assessed','Under review'].includes(v.implementation))add('implementation','pending','C-IMPLEMENTATION:PENDING','Implementation has not been determined. Record the actual state when available.');
      if(['Implemented','Partly implemented','Not implemented'].includes(v.implementation)&&!trim(v.implementation_summary))add('implementation_summary','review','C-IMPLEMENTATION:SUMMARY','Record actual implementation or the remaining gap in Implementation summary.');
      if(v.implementation==='Implemented'&&!v.implementation_record_id)add('implementation_record_id','review','C-IMPLEMENTATION:EVIDENCE','Implemented is recorded, but Implementation Record ID is blank. Select the exact retained artifact.');
      if(v.implementation_record_id)record(w,v.implementation_record_id,'implementation_record_id',add,asOf);
      if(v.applicability==='Applicable'&&['Not implemented','Partly implemented'].includes(v.implementation)){
        const routes=followupRoutes(w,v.id,asOf);
        if(!routes.length)add('implementation_summary','follow-up','C-FOLLOWUP:MISSING',`${v.implementation} is recorded; no saved Control Action route exists. Add follow-up for the recorded gap.`);
        else {information.push(...routes.map(a=>({field:'implementation_summary',message:`Action ${a.row.values.id} · ${a.row.values.status||'status not recorded'} · ${a.route}. The route does not change implementation.`})));if(routes.every(a=>['Cancelled','Closed','Completed','Superseded'].includes(a.row.values.status)))add('implementation_summary','follow-up','C-FOLLOWUP:TERMINAL','Only terminal Actions are linked while implementation remains unfinished. Review the actual work and route.');}
      }
      if(v.assurance_id){const a=T.lookup(w,'Assurance activity',v.assurance_id);if(a.status!=='found')add('assurance_id','reference','ASSURANCE:'+a.status,`Assurance activity ${v.assurance_id} is ${a.status}. Its exact pointer is retained.`,a.destination);else information.push({field:'assurance_id',message:`Assurance ${v.assurance_id} · ${a.row.values.lifecycle||'lifecycle not recorded'} · result ${a.row.values.result_record_id||'not selected'}. Effectiveness is not inferred.`,destination:a.destination});}
    }
    issues.sort((a,b)=>(priority[a.code]??5)-(priority[b.code]??5));
    const count=initial[kind].filter(f=>trim(v[f])&&!issues.some(i=>i.field===f&&i.code==='invalid')).length;
    return {issues,information,historical,registrationCount:count,registrationComplete:count===initial[kind].length,nextField:issues[0]?.field||'last_reviewed'};
  }
  function diagnoseSoa(w,values=w.controls_soa?.values||C.blankSoa().values,asOf){
    const {issues,add}=collector();try{C.validateSoa(values);}catch(e){add(e.field||'working_status','invalid','SOA:STRUCTURE',e.message);return {issues,information:[]};}
    if(values.working_status&&!S.lists.ControlWorkingStatusActive.includes(values.working_status))add('working_status','invalid','SOA:CHOICE','Working status is outside the current suite list. The historical value remains retained.');
    const controls=T.rows(w,'controls'),used=controls.length||S.soaFields.some(([f])=>trim(values[f]));
    if(used&&!values.working_status)add('working_status','capture','SOA:STATUS','Record the Control set working status when known.');
    if(used&&!values.aims_manual_record_id)add('aims_manual_record_id','capture','SOA:MANUAL','Select the exact current AIMS Manual Record defining the Control scope.');
    const manual=values.aims_manual_record_id?record(w,values.aims_manual_record_id,'aims_manual_record_id',add,asOf,{types:['Controlled document'],states:['Approved','Issued']}):null;
    if(manual&&manual.subject_type!=='AIMS')add('aims_manual_record_id','reference','SOA:MANUAL:SUBJECT',`Manual ${manual.id} names ${manual.subject_type||'no subject type'}; expected AIMS.`,destination('records',manual.id,'subject_type'));
    if(!!values.soa_record_id!==!!values.approval_decision_id)add(values.soa_record_id?'approval_decision_id':'soa_record_id','reference','SOA:PAIR','Current SoA Record ID and Approval Decision ID need their matching partner. Both may remain blank before first issue.');
    const issued=values.soa_record_id?record(w,values.soa_record_id,'soa_record_id',add,asOf,{types:['Statement of Applicability'],states:['Issued']}):null;
    if(issued&&manual&&issued.subject_type==='AIMS'&&manual.subject_type==='AIMS'&&issued.subject_id&&manual.subject_id&&issued.subject_id!==manual.subject_id)add('soa_record_id','reference','SOA:SCOPE','The Manual and issued SoA name different AIMS IDs. Review the exact scope.',destination('records',issued.id,'subject_id'));
    if(values.approval_decision_id)decision(w,values.approval_decision_id,'approval_decision_id',add,asOf,{subjectType:'Record',subjectId:values.soa_record_id,families:['SoA issue'],positive:['Issued','Issued with conditions']});
    if(['Ready for issue','No open changes'].includes(values.working_status)){
      for(const row of controls.filter(r=>currentControl(r.values)))for(const issue of diagnose(w,'controls',row,asOf).issues.filter(i=>i.code!=='as-of'))add('working_status',issue.code,'SOA:CONTROL:'+row.values.id+':'+issue.rule,`Control ${row.values.id}: ${issue.message}`,destination('controls',row.values.id,issue.field));
      if(!controls.some(r=>currentControl(r.values)))add('working_status','review','SOA:EMPTY','No current Control rows are recorded. Review scope and reference-set preparation; a recorded status is not completeness.');
      if(values.working_status==='No open changes'&&!values.soa_record_id&&!values.approval_decision_id)add('working_status','review','SOA:NOISSUE','No open changes is recorded without an issued SoA pair. Review what that status refers to.');
      const events=w.controls_soa?.history||[],anchor=events.slice().reverse().find(e=>e.changes.some(c=>c.field==='working_status'&&c.after===values.working_status));
      const changed=!anchor||w.references.history.some(e=>e.kind==='controls'&&e.revision>anchor.revision)||events.some(e=>e.revision>anchor.revision&&e.changes.some(c=>c.field!=='working_status'))||w.history.some(e=>e.action==='restore'&&e.revision>anchor.revision);
      if(changed)add('working_status','review','SOA:CHANGED','Controls or SoA details changed after this working status was recorded; review and update Working status.');
    }
    if(used&&!C.validDate(asOf))add('working_status','as-of','ASOF','Choose a valid As-of Date before relying on calendar checks.');
    issues.sort((a,b)=>(priority[a.code]??5)-(priority[b.code]??5));return {issues,information:[{message:'Reference-set preparation is pending. Saved row count does not establish complete coverage or an issued SoA.'}]};
  }
  function prepareAction(w,kind,id){if(!kinds.includes(kind)||T.lookupSheet(w,kind,id).status!=='found')throw Error('Save the source row first.');return {...S.blank('actions'),source_type:T.typeForSheet[kind],source_id:id};}
  function prepareControlLink(w,kind,id,controlId){if(!['risks','requirements'].includes(kind)||T.lookupSheet(w,kind,id).status!=='found'||T.lookup(w,'Control',controlId).status!=='found')throw Error('Select a current saved source and Control.');return {...S.blank('links'),from_type:T.typeForSheet[kind],from_id:id,relationship:'Addressed by',to_type:'Control',to_id:controlId};}
  const sameTuple=(a,b)=>['from_type','from_id','relationship','to_type','to_id'].every(f=>a[f]===b[f]);
  function controlLinkMatches(w,values,drafts=[]){const prepared=drafts.filter(d=>d.id===null&&sameTuple(d.values,values));if(prepared.length)return {mode:'draft',matches:prepared};const live=T.rows(w,'links').filter(r=>sameTuple(r.values,values));if(live.length)return {mode:'saved',matches:live};const deleted=T.rows(w,'links',{deleted:true}).filter(r=>sameTuple(r.values,values));return deleted.length?{mode:'deleted',matches:deleted}:{mode:'new',matches:[]};}
  function proposal(row,key,field){if(!wordingFields[row.kind]?.includes(field)||!trim(row.values[field]))return null;return {kind:row.kind,key,field,baseRevision:row.revision,editVersion:row.serial,original:row.values[field],text:row.values[field]};}
  function proposalBlock(row,p,key,field){if(!p)return 'Enter factual wording before opening a draft.';if(p.kind!==row.kind||p.key!==key||p.field!==field||!wordingFields[row.kind]?.includes(field)||row.deleted_at)return 'Select the original row and wording field.';if(p.baseRevision!==row.revision||p.editVersion!==row.serial||p.original!==row.values[field])return 'The row changed. Discard this draft and review the current value.';if(typeof p.text!=='string'||!p.text.trim()||p.text.length>2000)return 'Enter wording between 1 and 2,000 characters.';return p.text===p.original?'The wording is unchanged.':'';}
  function examples(){
    const common={...S.blank('records'),origin:'Orchid Bay fictional prototype',owner:'Operations Lead',custodian:'AIMS Coordinator',version:'1.0',record_date:'2026-10-01',effective_date:'2026-10-01',location:'Fictional demonstration artifact — not attached',access:'Internal',retention:'Fictional demonstration rule',custody:'Available'};
    return {
      source:{...common,id:'OB-REC-CTRL-001',type:'Controlled document',title:'Staff review and exception-handling specification — fictional',subject_type:'AI system',subject_id:'OB-AI-003',lifecycle:'Approved'},
      manual:{...common,id:'OB-REC-MANUAL-001',type:'Controlled document',title:'AIMS Manual — fictional',subject_type:'AIMS',subject_id:'OB-AIMS-001',lifecycle:'Issued'},
      risks:{...S.blank('risks'),id:'OB-RO-001',type:'Risk',scope:'Document Classifier intake and routing',system_id:'OB-AI-003',title:'Incorrect case routing',statement:'A wrong document category could send a case to the wrong queue and delay handling.',affected:'Case-handling staff and people awaiting a response',owner:'Operations Lead',lifecycle:'Open',assessment_record_id:'OB-REC-A01',result:'Qualitative concern — fictional assessment value',result_basis:'Initial',evaluation:'Treatment review needed — fictional method',uncertainty:'This is a fictional assessment summary; detailed artifact content is not attached.',last_reviewed:'2026-10-01',next_review:'2026-10-15',review_trigger:'Routing rules, staffing, model or evidence changes'},
      controls:{...S.blank('controls'),id:'OB-CTRL-001',control_set:'Additional',source_record_id:'OB-REC-CTRL-001',source_locator:'Section 2: review and exception handling',name:'Staff review before document routing',scope:'OB-AI-003 intake routing',applicability:'Applicable',rationale:'The fictional workflow calls for staff to review categories before routing.',owner:'Operations Lead',implementation:'Not implemented',implementation_summary:'Staff instructions and exception handling still need to be put into operation.',lifecycle:'Draft',last_reviewed:'2026-10-01',next_review:'2026-10-15',review_trigger:'Routing rules or staff responsibilities change'},
      link:{...S.blank('links'),id:'OB-LNK-RC-001',from_type:'Risk or opportunity',from_id:'OB-RO-001',relationship:'Addressed by',to_type:'Control',to_id:'OB-CTRL-001',scope:'Proposed response to the documented intake-routing scenario',owner:'Operations Lead',effective_date:'2026-10-01',status:'Active'},
      action:{...S.blank('actions'),id:'OB-ACT-CTRL-001',type:'Implementation',source_type:'Control',source_id:'OB-CTRL-001',work:'Put staff review and exception-handling instructions into operation',criterion:'Retained instructions and a recorded walkthrough show the assigned staff can follow the review and exception route',owner:'Operations Lead',priority:'Normal',assigned_date:'2026-10-01',due_date:'2026-10-07',review_trigger:'Routing or staffing changes',status:'Planned',blocker:'Walkthrough not yet performed',escalation_owner:'Executive Sponsor',verification_requirement:'Completion review'},
      soa:{working_status:'Drafting',aims_manual_record_id:'OB-REC-MANUAL-001',soa_record_id:'',approval_decision_id:''}
    };
  }
  return Object.freeze({kinds,initial,wordingFields,priority,diagnose,diagnoseSoa,followupRoutes,prepareAction,prepareControlLink,controlLinkMatches,proposal,proposalBlock,examples});
});
