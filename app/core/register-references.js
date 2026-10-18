/* Exact saved references and direct dependencies. No inferred relationships. */
(function(root,factory){
  if(typeof module==='object'&&module.exports)module.exports=factory(require('./register-core.js'),require('./reference-schema.js'),require('./assessment-core.js'));
  else root.OWLReferences=factory(root.OWLRegister,root.OWLReferenceSchema,root.OWLAssessmentCore);
})(globalThis,function(C,S,B){
  'use strict';
  const sheetForType=Object.freeze({'AI system':'systems',Record:'records',Decision:'decisions',Action:'actions','Context item':'context',Requirement:'requirements','Risk or opportunity':'risks',Control:'controls',Objective:'objectives',Metric:'metrics','Assurance activity':'assurance',Finding:'findings'});
  const typeForSheet=Object.freeze(Object.fromEntries(Object.entries(sheetForType).map(([type,sheet])=>[sheet,type])));
  const fixed=Object.freeze({
    systems:{baseline_record_id:'records',assessment_record_id:'records',governing_decision_id:'decisions'},
    records:{supersedes:'records'},decisions:{authority_record_id:'records',supersedes:'decisions'},links:{supersedes:'links'},
    actions:{completion_record_id:'records',verification_record_id:'records',resolution_decision_id:'decisions',supersedes:'actions'},
    context:{basis_record_id:'records',supersedes:'context'},requirements:{source_record_id:'records',origin_context_id:'context',supersedes:'requirements'},
    risks:{system_id:'systems',assessment_record_id:'records',governing_decision_id:'decisions',supersedes:'risks'},controls:{source_record_id:'records',implementation_record_id:'records',assurance_id:'assurance',supersedes:'controls'},objectives:{policy_record_id:'records',governing_decision_id:'decisions',supersedes:'objectives'},metrics:{result_record_id:'records',supersedes:'metrics'},assurance:{governing_plan_record_id:'records',activity_plan_record_id:'records',competence_record_id:'records',independence_record_id:'records',result_record_id:'records',supersedes:'assurance'},findings:{evidence_record_id:'records',resolution_decision_id:'decisions',supersedes:'findings'},soa:{aims_manual_record_id:'records',soa_record_id:'records',approval_decision_id:'decisions'}
  });
  const identity=row=>row.values.id||row.values.system_id;
  const title=v=>v.name||v.title||v.item||v.summary||v.question||v.work||v.purpose||v.statement||v.id||v.system_id||'Unnamed row';
  function rows(w,sheet,{deleted=false}={}){
    const all=sheet==='systems'?w.systems:S.kinds.includes(sheet)?w.references?.[sheet]:null;
    return all?all.filter(row=>deleted?!!row.deleted_at:!row.deleted_at):[];
  }
  function lookupSheet(w,sheet,id){
    const destination=sheet?{sheet,id,field:sheet==='systems'?'system_id':'id'}:null;
    if(!id)return {status:'blank',sheet,id,destination};
    if(sheet!=='systems'&&!S.kinds.includes(sheet))return {status:'unmanaged',sheet,id,destination:null};
    const row=rows(w,sheet).find(row=>identity(row)===id);
    if(row)return {status:'found',sheet,id,row,destination};
    const deleted=rows(w,sheet,{deleted:true}).find(row=>identity(row)===id);
    return {status:deleted?'deleted':'missing',sheet,id,...(deleted?{row:deleted}:{}),destination};
  }
  function lookup(w,type,id){return {...lookupSheet(w,sheetForType[type],id),type};}
  function metadata(sheet,v){
    if(sheet==='records')return [['Version',v.version],['Lifecycle',v.lifecycle],['Custody',v.custody]];
    if(sheet==='context')return [['Relevance status',v.relevance]];
    if(sheet==='requirements')return [['Applicability',v.applicability],['AIMS route',v.aims_route]];
    if(sheet==='risks')return [['Type',v.type],['Scope',v.scope],['Lifecycle',v.lifecycle]];
    if(sheet==='controls')return [['Scope',v.scope],['Applicability',v.applicability],['Implementation',v.implementation]];
    if(sheet==='objectives')return [['Scope',v.scope],['Lifecycle',v.lifecycle],['Owner',v.owner]];
    if(sheet==='metrics')return [['Subject',v.subject_type+' / '+v.subject_id],['Lifecycle',v.lifecycle],['Effective',v.effective_date],['Next result',v.next_result_due]];
    if(sheet==='assurance')return [['Method',v.type],['Lifecycle',v.lifecycle],['Lead',v.lead],['Result',v.result_record_id]];
    if(sheet==='findings')return [['Classification',v.classification],['Issue',v.issue_state],['Response',v.response_state],['Owner',v.owner]];
    if(sheet==='decisions')return [['Subject',v.subject_type+' / '+v.subject_id],['Outcome',v.outcome],['Lifecycle',v.lifecycle],['Effective',v.effective_date],['Expiry',v.expiry_date],['Conditions',v.conditions]];
    return v.lifecycle?[['Lifecycle',v.lifecycle]]:v.status?[['Status',v.status]]:[];
  }
  function suggestionsForSheet(w,sheet){return rows(w,sheet).map(row=>({id:identity(row),title:title(row.values),metadata:metadata(sheet,row.values)}));}
  function suggestions(w,type){return suggestionsForSheet(w,sheetForType[type]);}
  function targetFor(sheet,v,field){
    let target=fixed[sheet]?.[field],type=target?typeForSheet[target]:null;
    const pair=['actions','findings'].includes(sheet)&&field==='source_id'?'source_type':(['records','decisions','metrics','findings'].includes(sheet)&&field==='subject_id'?'subject_type':sheet==='findings'&&field==='criteria_id'?'criteria_type':sheet==='links'&&field==='from_id'?'from_type':sheet==='links'&&field==='to_id'?'to_type':null);
    if(pair){type=v[pair];target=sheetForType[type];}
    if(sheet==='assurance'&&['governing_plan_record_id','activity_plan_record_id','competence_record_id','independence_record_id'].includes(field)&&['Not required','Not yet demonstrated'].includes(v[field]))return null;
    return target||pair?{sheet:target,type,id:v[field]||'',field}:null;
  }
  function pointerSuggestions(w,sheet,v,field){const target=targetFor(sheet,v,field);return target?.sheet?suggestionsForSheet(w,target.sheet):[];}
  function incoming(w,targetSheet,id){
    const edges=[];
    for(const sheet of ['systems',...S.kinds])for(const row of rows(w,sheet)){
      const v=row.values,fields=sheet==='systems'?C.keys:S.fields[sheet].map(([key])=>key);
      for(const field of fields){const target=targetFor(sheet,v,field);if(target?.sheet===targetSheet&&target.id===id)edges.push({sheet,id:identity(row),field,title:title(v),targetSheet,targetId:id});}
    }
    for(const field of Object.keys(fixed.soa)){const target=targetFor('soa',w.controls_soa?.values||{},field);if(target.sheet===targetSheet&&target.id===id)edges.push({sheet:'controls',section:'soa',field,title:'SoA details',targetSheet,targetId:id});}
    for(const e of (w.assessments?.entries||[]).filter(e=>!e.deleted_at)){
      const units=['summary','profile','elements','review','impacts','risks','evidence'];
      if(targetSheet==='records'&&e.record_id===id)edges.push({sheet:'assessments',assessment:e.record_id,unit:'summary',id:e.record_id,field:'assessment_record_id',title:'Assessment '+e.record_id,targetSheet,targetId:id});
      if(targetSheet==='systems'&&e.system_id===id)edges.push({sheet:'assessments',assessment:e.record_id,unit:'summary',id:e.record_id,field:'system_id',title:'Assessment '+e.record_id,targetSheet,targetId:id});
      for(const unit of units)for(const row of ['summary','profile'].includes(unit)?[e[unit]]:B.rows(e,unit))for(const t of B.targets(unit,row.values))if(t.sheet===targetSheet&&t.id===id)edges.push({sheet:'assessments',assessment:e.record_id,unit,id:row.values.id||e.record_id,field:t.field,title:'Assessment '+e.record_id+' / '+unit,targetSheet,targetId:id});
    }
    return edges;
  }
  return Object.freeze({sheetForType,typeForSheet,identity,title,rows,lookup,lookupSheet,metadata,suggestions,suggestionsForSheet,targetFor,pointerSuggestions,incoming});
});
