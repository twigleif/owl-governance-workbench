/* Proposed read-only SoA snapshot. No authority, persistence, source loading or issuance. */
(function(root,factory){const api=factory(typeof module==='object'&&module.exports?require('./reference-schema.js'):root.OWLReferenceSchema,typeof module==='object'&&module.exports?require('./controls-starter-catalog.js'):root.OWLControlsStarterCatalog);if(typeof module==='object'&&module.exports)module.exports=api;else root.OWLSoADraftingCore=api;})(globalThis,function(S,C){
 'use strict';
 const fields=S.fields.controls,keys=fields.map(([key])=>key),metadataKeys=S.soaFields.map(([key])=>key);
 const label=key=>fields.find(f=>f[0]===key)?.[1]||S.soaFields.find(f=>f[0]===key)?.[1]||key;
 function copy(values,expected){if(!values||Object.keys(values).length!==expected.length||expected.some(k=>typeof values[k]!=='string'))throw Error('The saved source must contain its exact suite fields.');return Object.fromEntries(expected.map(k=>[k,values[k]]));}
 const activeActionStatuses=S.options('actions','status').filter(v=>!['Completed','Cancelled','Closed','Superseded'].includes(v));
 function validDate(text){if(typeof text!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(text)||text.startsWith('0000'))return false;const date=new Date(text+'T00:00:00.000Z');return !Number.isNaN(date.getTime())&&date.toISOString().slice(0,10)===text;}
 function currentLink(link,asOf){return !link.deleted_at&&link.status==='Active'&&validDate(asOf)&&validDate(link.effective_date)&&link.effective_date<=asOf&&(!link.end_date||validDate(link.end_date)&&link.end_date>=asOf&&link.end_date>=link.effective_date);}
 function dedupe(items){const result=[];for(const item of items){const prior=result.find(i=>i.field===item.field);if(prior)prior.message+=' '+item.message;else result.push({...item});}return result;}
 function diagnostics(values,records=[],openActions=[]){
  const factual=[],human=[],observations=[];const missing=(field,message)=>factual.push({field,message});
  for(const field of ['name','source_record_id','source_locator','scope','rationale'])if(!values[field].trim())missing(field,'Record '+label(field).toLowerCase()+'.');
  if(values.implementation!=='Not required'&&!values.implementation_summary.trim())missing('implementation_summary','Summarize actual implementation or the remaining gap.');
  if(['Applicable','Not applicable'].includes(values.applicability)&&!values.last_reviewed)missing('last_reviewed','Record the substantive applicability and implementation review date.');
  if(!values.next_review&&!values.review_trigger.trim())missing('next_review','Record a scheduled review date or a Review trigger.');
  if(values.implementation==='Implemented'&&!values.implementation_record_id)missing('implementation_record_id','Record the exact retained implementation artifact.');
  else if(values.applicability==='Applicable'&&!values.implementation_record_id&&!(values.implementation_summary.trim()&&openActions.length))missing('implementation_record_id','Record the retained implementation artifact, or retain a visible implementation gap and an open Action.');
  for(const field of ['source_record_id','implementation_record_id'])if(values[field]&&!records.some(r=>r.id===values[field]&&!r.deleted_at))missing(field,'The exact saved Record is unavailable in the disclosed sample context.');
  if(!values.owner.trim()||values.owner==='Unassigned')missing('owner','Record the accountable control owner.');
  if(values.applicability==='Not assessed'||values.applicability==='Under review'||!values.applicability)human.push({field:'applicability',message:'A human applicability decision remains pending.'});
  if(values.implementation==='Not assessed'||values.implementation==='Under review'||!values.implementation)human.push({field:'implementation',message:'Implementation assessment remains pending.'});
  if(values.applicability==='Not applicable'&&values.implementation!=='Not required')human.push({field:'implementation',message:'For Not applicable, review and record Not required.'});
  if(values.applicability==='Not applicable'&&!values.rationale.trim())human.push({field:'rationale',message:'A human exclusion rationale is still needed.'});
  if(values.applicability==='Applicable'&&values.implementation==='Not required')human.push({field:'implementation',message:'Applicable and Not required are inconsistent; retain the actual human determination.'});
  if(values.applicability==='Applicable'&&['Partly implemented','Not implemented'].includes(values.implementation)&&!openActions.length)missing('implementation_summary','Retain the visible implementation gap and an exact saved open Action route; no Action is created by this preview.');
  if(values.lifecycle!=='Current')human.push({field:'lifecycle',message:'Review this saved lifecycle and any replacement when preparing an issued SoA.'});
  if(values.supersedes)human.push({field:'supersedes',message:'Review the retained replacement relationship; no previous row is automatically omitted.'});
  if(values.implementation==='Partly implemented')observations.push('Partly implemented · the recorded status remains visible.');
  return {factual:dedupe(factual),human:dedupe(human),observations};
 }
 function project(saved){
  if(!saved||!Number.isInteger(saved.revision)||!Array.isArray(saved.rows))throw Error('Saved sample unavailable.');
  const workingTableMetadata=copy(saved.metadata,metadataKeys),deleted=saved.rows.filter(r=>r.deleted_at),all=saved.rows.filter(r=>!r.deleted_at).map(row=>{const values=copy(row.values,keys),openActions=(saved.actions||[]).filter(a=>!a.deleted_at&&activeActionStatuses.includes(a.status)&&(a.source_type==='Control'&&a.source_id===values.id||(saved.links||[]).some(l=>l.from_type==='Action'&&l.from_id===a.id&&l.to_type==='Control'&&l.to_id===values.id&&l.relationship==='Also responds to'&&currentLink(l,saved.asOf)))).map(a=>JSON.parse(JSON.stringify(a))),checks=diagnostics(values,saved.records||[],openActions);return {values,checks,openActions};});
  const main=all.filter(r=>r.values.lifecycle==='Current'),historical=all.filter(r=>['Superseded','Retired'].includes(r.values.lifecycle)),attention=all.filter(r=>!main.includes(r)&&!historical.includes(r));
  const globalGaps=[];if(!workingTableMetadata.aims_manual_record_id)globalGaps.push({field:'aims_manual_record_id',message:'Record the exact saved AIMS Manual reference.'});
  const scope=saved.manualScope&&saved.manualScope.record_id===workingTableMetadata.aims_manual_record_id?saved.manualScope.text:'';
  if(!scope)globalGaps.push({field:'aims_manual_record_id',message:'The saved Manual body scope has not been retrieved in this sample. Record metadata cannot supply its scope.'});
  if(workingTableMetadata.aims_manual_record_id&&!(saved.records||[]).some(r=>r.id===workingTableMetadata.aims_manual_record_id&&r.type==='Controlled document'&&!r.deleted_at))globalGaps.push({field:'aims_manual_record_id',message:'The exact saved Manual Controlled document Record is unavailable.'});
  const issueReview=[];if(!!workingTableMetadata.soa_record_id!==!!workingTableMetadata.approval_decision_id)issueReview.push({field:workingTableMetadata.soa_record_id?'approval_decision_id':'soa_record_id',message:'The recorded existing issued pair is incomplete; review its exact Record and Decision.'});
  if(workingTableMetadata.soa_record_id&&!(saved.records||[]).some(r=>r.id===workingTableMetadata.soa_record_id&&r.type==='Statement of Applicability'&&!r.deleted_at))issueReview.push({field:'soa_record_id',message:'The existing issued SoA pointer does not resolve to a saved Statement of Applicability Record.'});
  if(workingTableMetadata.approval_decision_id&&!(saved.decisions||[]).some(d=>d.id===workingTableMetadata.approval_decision_id&&d.type==='SoA issue'&&d.subject_type==='Record'&&d.subject_id===workingTableMetadata.soa_record_id&&!d.deleted_at))issueReview.push({field:'approval_decision_id',message:'Review the existing SoA issue Decision and its exact primary Record subject.'});
  const issuedRecord=(saved.records||[]).find(r=>r.id===workingTableMetadata.soa_record_id&&!r.deleted_at),issueDecision=(saved.decisions||[]).find(d=>d.id===workingTableMetadata.approval_decision_id&&!d.deleted_at),checkingDate=saved.asOf||'';
  if(issuedRecord&&issuedRecord.lifecycle!=='Issued')issueReview.push({field:'soa_record_id',message:'The recorded prior SoA Record lifecycle is '+issuedRecord.lifecycle+'; it is not an Issued Record.'});
  if(issueDecision){const note=message=>issueReview.push({field:'approval_decision_id',message});
   if(!['Issued','Issued with conditions'].includes(issueDecision.outcome))note('The recorded SoA issue outcome is '+issueDecision.outcome+'; review the current pointer.');
   if(issueDecision.lifecycle!=='Effective')note('The recorded prior Decision lifecycle is '+issueDecision.lifecycle+'; review its current effect.');
   if(!issueDecision.scope?.trim())note('The existing Decision scope or baseline is not recorded.');
   if(!issueDecision.issuer?.trim()||!issueDecision.authority_role?.trim()||!issueDecision.authority_record_id||!(saved.records||[]).some(r=>r.id===issueDecision.authority_record_id&&!r.deleted_at))note('The existing Decision issuer, authority role or exact saved authority basis is missing. Metadata does not establish authority.');
   if(issueDecision.outcome==='Issued with conditions')note(issueDecision.conditions?.trim()?'Recorded prior issue conditions require human review; their satisfaction is not inferred.':'The existing conditional issue has no recorded conditions.');
   if(!issueDecision.decision_date)note('The existing issue Decision date is not recorded.');
   for(const field of ['decision_date','effective_date','expiry_date','evidence_cutoff'])if(issueDecision[field]&&!validDate(issueDecision[field]))note('The existing Decision '+field+' is not a valid recorded date.');
   if(checkingDate&&issueDecision.decision_date>checkingDate)note('The recorded issue Decision date is after the declared checking date.');
   if(checkingDate&&issueDecision.effective_date>checkingDate)note('The recorded prior Decision is not yet effective at the checking date.');
   if(checkingDate&&issueDecision.expiry_date&&issueDecision.expiry_date<checkingDate)note('The recorded prior Decision expired before the checking date.');
   if(issueDecision.evidence_cutoff&&issueDecision.decision_date&&issueDecision.evidence_cutoff>issueDecision.decision_date)note('The recorded evidence cut-off is after the existing issue Decision date.');
  }
  const annex=all.filter(r=>r.values.control_set==='ISO 42001 Annex A'),locators=annex.map(r=>r.values.source_locator),coverageReview=[];
  if(C.rows.some(r=>!locators.includes(r.source_locator))||locators.length!==38||new Set(locators).size!==38)coverageReview.push('Annex A exact source references differ from the 38 suite starter entries; reconcile missing, duplicate or additional locators.');
  if([...attention,...historical].some(r=>r.values.control_set==='ISO 42001 Annex A'))coverageReview.push('Annex A rows have non-current lifecycles; a human must review coverage and replacements before issue.');
  const referenceContext=JSON.parse(JSON.stringify({records:saved.records||[],decisions:saved.decisions||[],actions:saved.actions||[],links:saved.links||[],assurance:saved.assurance||[]}));
  const factualGlobals=dedupe(globalGaps),humanGlobals=dedupe(issueReview);
  return freeze({heading:'SoA draft · Not issued',sourceRevision:saved.revision,sourceFingerprint:fingerprint(saved),checkingDate,workingTableMetadata,currentIssued:{record_id:workingTableMetadata.soa_record_id,decision_id:workingTableMetadata.approval_decision_id},manualScope:scope,manualScopeProvenance:scope?String(saved.manualScope.provenance):'No saved-body scope fixture available',all,main,attention,historical,deletedCount:deleted.length,reservedIds:deleted.map(r=>r.values.id),globalGaps:factualGlobals,issueReview:humanGlobals,coverageReview,referenceContext,counts:{saved:all.length,annexA:all.filter(r=>r.values.control_set==='ISO 42001 Annex A').length,additional:all.filter(r=>r.values.control_set==='Additional').length,factual:all.reduce((n,r)=>n+r.checks.factual.length,factualGlobals.length),human:all.reduce((n,r)=>n+r.checks.human.length,humanGlobals.length)}});
 }
 function freeze(value){if(value&&typeof value==='object'){Object.values(value).forEach(freeze);Object.freeze(value);}return value;}
 const fingerprint=saved=>JSON.stringify(saved);
 const fresh=(preview,saved)=>!!preview&&preview.sourceFingerprint===fingerprint(saved);
 return Object.freeze({keys:Object.freeze(keys),fields,metadataKeys:Object.freeze(metadataKeys),label,copy,diagnostics,project,fresh});
});
