/* Build the approved example through existing native commands. No storage IO,
 * old-workspace migration, source edits, new field rules or issued outcomes. */
'use strict';
const Case=require('./docent-simulated-case.js'),E=require('./docent-enriched-example.cjs'),C=require('./register-core.js'),B=require('./assessment-core.js'),A=require('./assessment-schema.js'),S=require('./reference-schema.js'),G=require('./register-control-core.js');
const simulationId='docent-enriched-simulated-example-20261014',storageKey='owl-clean-owner-docent-enriched-20261014-v1',at='2026-10-14T00:00:00.000Z',clone=v=>JSON.parse(JSON.stringify(v));
function create(){
 const original=clone(Case.create()),example=E.create(),ids=example.ids;
 let w=original.nativeFixture.workspace;
 for(const kind of ['systems',...S.kinds])for(const r of kind==='systems'?example.workspace.systems:example.workspace.references[kind]){
  const key=kind==='systems'?'system_id':'id',id=r.values[key],before=(kind==='systems'?w.systems:w.references[kind]).find(n=>n.values[key]===id);
  if(before&&JSON.stringify(before.values)===JSON.stringify(r.values))continue;
  const options={...(before?{id,baseRevision:before.revision}:{}),at};
  w=kind==='systems'?C.save(w,clone(r.values),options):C.saveReference(w,kind,clone(r.values),options);
 }
 const row=(kind,id)=>(kind==='systems'?w.systems:w.references[kind]).find(r=>r.values[kind==='systems'?'system_id':'id']===id);
 function save(unit,values,rowId=null,extra=[]){
  const e=B.find(w,ids.assessment),old=B.getUnit(e,unit,rowId||''),captureRequests=[...B.targets(unit,values).flatMap(t=>{const r=row(t.sheet,t.id);return r?[{field:t.field,expectedRevision:r.revision}]:[]}),...extra];
  w=C.saveAssessment(w,ids.assessment,unit,values,{baseEntryRevision:e.revision,baseUnitRevision:old?.revision||0,rowId,captureRequests,at});
 }
 let e=B.find(w,ids.assessment);const scope=example.workspace.systems[0].values.scope_basis;
 save('summary',{...e.summary.values,scope,assessed_state:'Simulated evidence and transcript-sharing pilot, draft 0.2; actual release/configuration unprovided.',lead:example.roles.research,evidence_cutoff:E.date,unresolved:'Settle the legitimate exercise method, synthetic sample, audience and performed evidence before any reliance trial.'});
 e=B.find(w,ids.assessment);const inventory=w.systems[0];
 save('profile',{...e.profile.values,...Object.fromEntries(B.inventoryFields.map(k=>[k,inventory.values[k]])),boundary:scope,restrictions:'Synthetic exercise material only. Actual deployment, transcript collection, sharing settings and operating outcomes remain unprovided.'},null,[{field:'inventory',expectedRevision:inventory.revision,fields:B.inventoryFields.slice()}]);
 e=B.find(w,ids.assessment);
 save('review',{...e.review[0].values,question:'Would the proposed check preserve the analysis/context identity and inspect supporting transcript evidence before using the result?'},ids.review);
 save('review',{...A.blank('review'),id:'SIM-DOCENT-RVW-002',topic:'Verification and validation',criterion_type:'Control',criterion_id:ids.secondControl,criterion_locator:'C2: proposed sharing criterion',question:'Would the proposed sharing check define the audience and inspect collection grants before sharing synthetic transcripts?',scope:'AI system',applicability:'Under review',applicability_rationale:'The proposed audience and legitimate exercise method remain unsettled.',result:'Not reviewed',uncertainty:'No actual collection settings, performed check or completed assessment is supplied.',action_id:ids.secondAction});
 e=B.find(w,ids.assessment);const risk1=row('risks',ids.risk).values,risk2=row('risks',ids.secondRisk).values;
 save('risks',{...e.risks[0].values,event:risk1.statement,affected:risk1.affected,response:'Proposed evidence check: '+ids.control+'. No treatment effectiveness is established.'},ids.risk);
 save('risks',{...A.blank('risks'),id:ids.secondRisk,type:'Risk',origin_type:'Assessment context',source:'Hypothetical synthetic pilot sharing workflow.',event:risk2.statement,affected:risk2.affected,consequence:'Transcript content may reach people outside the proposed audience.',response:'Proposed audience/permission check: '+ids.secondControl+'. No implemented safeguard is established.',uncertainty:risk2.uncertainty});
 e=B.find(w,ids.assessment);
 save('evidence',{...e.evidence[0].values,locator:'Docent Introduction; Analysis Plans; Reading Steps; DQL Steps; Permissions & Sharing. See the enriched public-source inventory.',period:'Public descriptions accessed '+E.date+'.',claim:'Public documentation describes analysis/context options and collection sharing; this is product context for a simulated exercise, not operating evidence.'},ids.evidence);
 w=G.save(w,{...w.register_control.values,version:'draft 0.2'},w.revision,at);C.checkSnapshot(w);
 const preparationBasisBySubject={};
 for(const r of w.references.requirements){const v=r.values;preparationBasisBySubject['requirement-source:'+v.id]='Exact simulated Plan '+ids.plan+', '+E.version+', '+v.source_locator+'. '+v.summary+' Exercise proposal only; not an approved company requirement or Method.';}
 preparationBasisBySubject['assurance-activity:'+ids.assurance]='Exact simulated Plan '+ids.plan+', '+E.version+', P1: small proposed exercise. Prepare both evidence/context and transcript-sharing checks on synthetic examples. Method, competence, independence, performed evidence and results remain unprovided.';
 for(const r of w.references.links){const v=r.values;preparationBasisBySubject['link-context:'+v.id]='Explicit proposed exercise connection: '+v.from_type+' '+v.from_id+' → '+v.relationship+' → '+v.to_type+' '+v.to_id+'. '+v.scope;}
 const fixtureMetadata={...original.nativeFixture.metadata,simulationId,exampleId:example.exampleId,preparationBasisBySubject,preparationBasis:{...original.nativeFixture.metadata.preparationBasis,'requirement-source':preparationBasisBySubject['requirement-source:'+ids.requirement],'assurance-activity':preparationBasisBySubject['assurance-activity:'+ids.assurance],'link-context':preparationBasisBySubject['link-context:'+original.nativeFixture.metadata.registerIds.links]}};
 const cleanWorkspace={workspace_id:original.cleanWorkspace.workspace_id,revision:w.revision,systems:clone(w.systems),reserved_ids:clone(w.reserved_ids),history:clone(w.history),references:clone(w.references),controls_soa:clone(w.controls_soa),register_control:clone(w.register_control)};
 const fieldOrigins=clone(original.metadata.fieldOrigins);
 for(const kind of ['systems',...S.kinds])for(const r of kind==='systems'?w.systems:w.references[kind])for(const [field,value]of Object.entries(r.values)){
  const id=r.values[kind==='systems'?'system_id':'id'],entry=fieldOrigins[kind+'.'+field];if(!entry)continue;
  const existing=entry.origins.find(o=>o.recordId===id);if(existing?.value===value)continue;
  const f=(kind==='systems'?C.catalog:S.catalog(kind)).find(f=>f.key===field),changed=example.changes.find(c=>c.kind===kind&&c.id===id&&c.field===field);
  const origin={recordId:id,value,classification:changed?.classification||(!value?'unanswered':f?.type==='pointer'?'derived_id':'simulation_assumption'),reason:'Accepted simulated example preparation; no actual Transluce assignment, operating result or authority is asserted.',sourceIds:[]};
  if(existing)entry.origins[entry.origins.indexOf(existing)]=origin;else entry.origins.push(origin);
 }
 return {nativeFixture:{workspace:w,metadata:fixtureMetadata},cleanWorkspace,cleanProjection:{systems:clone(w.systems),references:Object.fromEntries(S.kinds.map(k=>[k,clone(w.references[k])]))},metadata:{...original.metadata,simulationId,storageKey,at,date:E.date,ids:{...original.metadata.ids,...ids,secondReview:'SIM-DOCENT-RVW-002'},sources:clone(example.sources),fieldOrigins,scope,actors: [...original.metadata.actors,...Object.values(example.roles)],bodyPaths:{...original.metadata.bodyPaths,baseline:Object.keys(example.bodies).find(p=>p.endsWith('public-feature-baseline.md')),plan:Object.keys(example.bodies).find(p=>p.endsWith('proposed-pilot-plan.md'))},bodies:{...original.metadata.bodies,...example.bodies},provenance:{registerSha256:'81f6da00573b4c99c24067c4de7a5f8499564142fa5ff8ccef7f2b857c47dce0',assessmentSha256:'6a398cb9f153ed9dbfa619ebac92e2082bee8ad1581f2c822852c9c3a7e40dd2',guideSha256:'a3e3e8f454e0b400d2fa98f5450569cdddffb94412c8832dafcda13a2ab224b7'},exampleId:example.exampleId,authority:'Simulated assignments and draft preparation only. No actual configuration, performed assurance, issued decision or approval.'}};
}
module.exports=Object.freeze({create,simulationId,storageKey,at});
