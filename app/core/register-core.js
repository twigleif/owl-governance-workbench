/* Deterministic core for the fictional register prototype. No model or network calls. */
(function(root,factory){
  if(typeof module==='object'&&module.exports)module.exports=factory(require('./organization-core.js'),require('./dropdown-core.js'),require('./reference-schema.js'),require('./assessment-core.js'),require('./document-core.js'),require('./soa-source.js'),require('./soa-artifact-core.js'),require('./owner-inputs-core.js'),require('./register-control-core.js'));
  else root.OWLRegister=factory(root.OWLOrganization,root.OWLDropdowns,root.OWLReferenceSchema,root.OWLAssessmentCore,root.OWLDocumentCore,root.OWLSoASource,root.OWLSoAArtifacts,root.OWLOwnerInputsCore,root.OWLRegisterControl);
})(globalThis,function(O,D,S,B,J,Q,A,I,R){
  'use strict';
  const workspaceId='orchid-bay-cooperative-preview';
  const snapshotVersion=22;
  const referenceKindsByVersion=Object.freeze({2:Object.freeze(['records','decisions','links']),3:Object.freeze(['records','decisions','links','actions']),4:Object.freeze(['records','decisions','links','actions','context','requirements']),5:Object.freeze(['records','decisions','links','actions','context','requirements','risks','controls']),6:Object.freeze(['records','decisions','links','actions','context','requirements','risks','controls','objectives','metrics']),7:S.kinds,8:S.kinds,9:S.kinds,10:S.kinds,11:S.kinds,12:S.kinds,13:S.kinds,14:S.kinds,15:S.kinds,16:S.kinds,17:S.kinds,18:S.kinds,19:S.kinds,20:S.kinds,21:S.kinds,22:S.kinds});
  const scopeValues=D.definitions.scope_status.meanings;
  const routeValues=D.definitions.lifecycle_route.meanings;
  const lifecycleValues=D.definitions.lifecycle_state.meanings;
  const catalog=[
    ['system_id','AI System ID','id',190,'Enter the exact identifier assigned by your organization.','OB-AI-003','Keep this identity stable. Once saved, it cannot be edited here.'],
    ['name','System name','text',240,'Enter the name people use for this system.','Document Classifier','Use a recognizable name. A rename does not create a new system.'],
    ['intended_purpose','Intended purpose','text',340,'Describe the work this system helps people do and its intended benefit.','Sort incoming case documents so staff can find the right queue.','Keep uncertainty explicit. Detailed automation, data and implementation facts belong in the system description.'],
    ['business_process','Business process','text',250,'Name the business activity supported or affected.','Case intake and routing','Keep this separate from the purpose and from a department name.'],
    ['date_identified','Date identified','date',185,'Enter the date the system first became known to governance.','2026-09-29','This is not a deployment or approval date. Use YYYY-MM-DD.'],
    ['scope_status','AIMS scope status','choice',200,'Choose the status relative to the organization’s documented AIMS boundary.','Under review','Unknown and Under review preserve uncertainty. A completed determination needs a scope basis.',scopeValues],
    ['scope_basis','AIMS scope basis','text',320,'Explain the reason for the recorded scope determination.','The organization operates and controls this system within the documented boundary.','A reason is needed for In scope, Out of scope or Superseded. Do not copy an example as your own determination.'],
    ['organization_role','Organization role','text',270,'Describe how the organization develops, acquires, configures, provides or uses the system.','Acquires, configures and uses the system','This describes the organization’s role. It does not create an app user or determine a legal classification.'],
    ['lifecycle_route','Lifecycle route','choice',245,'Choose the route that describes the system’s planned or current work.','Acquire and configure','A route records the approach; it does not authorize its activities.',routeValues],
    ['lifecycle_state','Lifecycle state','choice',255,'Record the system’s actual lifecycle state.','Identified','Record actual operating use even when authorization is missing. OWL will show the gap without changing this state.',lifecycleValues],
    ['system_owner','System owner','text',235,'Choose the accountable person or role already confirmed with your organization.','Operations Lead','Use People & Roles to maintain people and roles. Existing text stays until you explicitly link an entry. Unassigned is allowed during registration. No second-user confirmation is required.'],
    ['baseline_record_id','Current baseline Record ID','pointer',265,'Enter the exact retained system and deployment baseline Record ID.','OB-REC-101','One exact Record ID. The referenced system, version, custody and applicability must also be checked.'],
    ['assessment_record_id','Current assessment Record ID','pointer',275,'Enter the exact current completed assessment Record ID.','OB-REC-102','A pointer must match this system and its baseline. It does not establish assessment sufficiency.'],
    ['governing_decision_id','Current governing Decision ID','pointer',280,'Enter an actual issued decision governing the state or route.','OB-DEC-201','A scope decision is not individual operating authorization. Never invent a decision or infer a baseline link from narrative text.'],
    ['last_reviewed','Last reviewed','date',185,'Enter the date the system facts, pointers and review plan were substantively checked.','2026-09-30','Opening or saving a row does not perform a review. Use YYYY-MM-DD.'],
    ['next_review_date','Next review date','date',190,'Enter the planned calendar review date when one is used.','2026-12-20','A completed review plan needs this date or an event trigger. An overdue review does not change lifecycle state.'],
    ['review_trigger','Review trigger','text',330,'Describe the event that requires review or reassessment.','Material change to purpose, model, data, supplier or automation','Use the actual agreed trigger. Describing an event does not mean it has happened.']
  ].map(([key,label,type,width,entry,example,more,options])=>Object.freeze({key,label,type,width,entry,example,more,options:options&&Object.freeze(options)}));
  const keys=catalog.map(f=>f.key);
  const required=['system_id','name','date_identified','scope_status','lifecycle_state','system_owner'];
  const decisionFields=['intended_purpose','business_process','scope_basis','organization_role','lifecycle_route','baseline_record_id','assessment_record_id','last_reviewed'];
  const trim=v=>typeof v==='string'?v.trim():'';
  const clone=v=>JSON.parse(JSON.stringify(v));
  const plain=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
  const own=(v,k)=>Object.prototype.hasOwnProperty.call(v,k);
  const byteLength=text=>{let bytes=0;for(const c of text){const n=c.codePointAt(0);bytes+=n<=0x7f?1:n<=0x7ff?2:n<=0xffff?3:4;}return bytes;};
  function fail(message,field,details){const e=new Error(message);e.field=field||'';if(details)Object.assign(e,details);throw e;}
  function validDate(s){
    if(typeof s!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(s))return false;
    const [y,m,d]=s.split('-').map(Number),days=[31,(y%4===0&&(y%100!==0||y%400===0))?29:28,31,30,31,30,31,31,30,31,30,31];
    return y>=1&&m>=1&&m<=12&&d>=1&&d<=days[m-1];
  }
  function blank(){return Object.fromEntries(keys.map(k=>[k,'']));}
  function validate(values,{identity=true}={}){
    if(!plain(values)||Object.keys(values).length!==keys.length||keys.some(k=>!own(values,k)))fail('The record must contain exactly the 17 inventory fields.');
    for(const f of catalog){
      const v=values[f.key];
      if(typeof v!=='string')fail(`${f.label} must be text.`,f.key);
      if(v.length>2000||/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(v))fail(`${f.label} contains unsupported text or exceeds 2,000 characters.`,f.key);
      if(f.type==='date'&&v&&!validDate(v))fail(`${f.label}: use a real date in YYYY-MM-DD format.`,f.key);
      if(f.options&&v&&!f.options.includes(v))fail(`${f.label}: choose one of the listed values.`,f.key);
      if((f.type==='id'||f.type==='pointer')&&v&&(v!==v.trim()||/[\r\n\t]/.test(v)))fail(`${f.label}: enter the exact ID without surrounding whitespace or line breaks.`,f.key);
    }
    if(identity&&!trim(values.system_id))fail('Enter the organization-assigned AI System ID before saving.','system_id');
    return values;
  }
  function seed(){
    const values={...blank(),system_id:'OB-AI-003',name:'Document Classifier',intended_purpose:catalog[2].example,business_process:'Case intake and routing',date_identified:'2026-09-29',scope_status:'Under review',lifecycle_state:'Identified',system_owner:'Operations Lead'};
    return {format:'owl-register-preview',version:snapshotVersion,workspace_id:workspaceId,revision:0,reserved_ids:[values.system_id],systems:[{revision:0,values}],history:[],references:emptyReferences(),controls_soa:blankSoa(),assessments:B.empty(),documents:J.empty(),soa_artifacts:A.empty()};
  }
  function emptyReferences(){return {...Object.fromEntries(S.kinds.map(k=>[k,[]])),reserved_ids:Object.fromEntries(S.kinds.map(k=>[k,[]])),history:[]};}
  function referenceRows(w,kind,{deleted=false}={}){if(!S.kinds.includes(kind))fail('Unknown reference sheet.');return (w.references?.[kind]||[]).filter(row=>deleted?!!row.deleted_at:!row.deleted_at);}
  function validateReference(kind,values,options={}){return S.validate(kind,values,{...options,validDate});}
  function checkReferences(ref,revision,kinds=S.kinds){
    const exact=(v,list)=>plain(v)&&Object.keys(v).length===list.length&&list.every(k=>own(v,k));
    if(!exact(ref,[...kinds,'reserved_ids','history'])||!exact(ref.reserved_ids,kinds)||!Array.isArray(ref.history)||ref.history.length>10000)fail('The reference workspace has an invalid structure.');
    for(const kind of kinds){
      const ids=ref.reserved_ids[kind];
      if(!Array.isArray(ids)||new Set(ids).size!==ids.length)fail(`${S.labels[kind]} identity history is invalid.`);
      for(const id of ids)validateReference(kind,{...S.blank(kind),id});
      if(!Array.isArray(ref[kind])||ref[kind].length>500)fail(`${S.labels[kind]} exceeds its 500-row limit or is invalid.`);
      const seen=new Set();
      for(const row of ref[kind]){
        if(!plain(row)||!own(row,'values')||!own(row,'revision')||Object.keys(row).some(k=>!['revision','values','deleted_at'].includes(k))||!Number.isSafeInteger(row.revision)||row.revision<1||row.revision>revision)fail(`${S.labels[kind]} contains an invalid saved row revision.`);
        if(row.deleted_at!==undefined&&(typeof row.deleted_at!=='string'||!Number.isFinite(Date.parse(row.deleted_at))))fail('A deleted reference has an invalid deletion date.');
        validateReference(kind,row.values);if(seen.has(row.values.id))fail(`${S.labels[kind]} contains duplicate IDs.`);seen.add(row.values.id);
        if(!ids.includes(row.values.id))fail('A saved reference is missing from its identity history.');
      }
    }
    let previous=0;
    for(const e of ref.history){
      if(!exact(e,['revision','at','action','kind','record_id','operator','changes'])||!Number.isSafeInteger(e.revision)||e.revision<=previous||e.revision>revision||typeof e.at!=='string'||!Number.isFinite(Date.parse(e.at))||!kinds.includes(e.kind)||!['create','edit','delete','restore-row'].includes(e.action)||e.operator!=='Ren'||!ref.reserved_ids[e.kind].includes(e.record_id)||!Array.isArray(e.changes))fail('Reference capture history is invalid.');
      previous=e.revision;
      if(['delete','restore-row'].includes(e.action)&&e.changes.length)fail('Reference lifecycle events cannot change retained field values.');
      const keys=S.fields[e.kind].map(([key])=>key),seen=new Set();
      for(const c of e.changes){if(!exact(c,['field','before','after'])||!keys.includes(c.field)||seen.has(c.field)||typeof c.before!=='string'||typeof c.after!=='string')fail('A reference history change is invalid.');seen.add(c.field);}
    }
  }
  function blankSoa(){return {revision:0,values:Object.fromEntries(S.soaFields.map(([key])=>[key,''])),history:[]};}
  function validateSoa(values,previous){
    const fields=S.soaFields.map(([key])=>key);
    if(!plain(values)||Object.keys(values).length!==fields.length||fields.some(k=>!own(values,k)))fail('SoA details must contain exactly their four fields.');
    for(const [key,label] of S.soaFields){const v=values[key];if(typeof v!=='string'||v.length>2000||/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(v))fail(`${label} must be supported text of at most 2,000 characters.`,key);if(key!=='working_status'&&v&&(v!==v.trim()||/[\r\n\t]/.test(v)))fail(`${label}: enter the exact ID without surrounding whitespace or line breaks.`,key);}
    if(previous&&values.working_status&&values.working_status!==previous.working_status&&!S.lists.ControlWorkingStatusActive.includes(values.working_status))fail('Working status is outside the suite dropdown list.','working_status');
  }
  function checkSoa(meta,revision){
    const exact=(v,keys)=>plain(v)&&Object.keys(v).length===keys.length&&keys.every(k=>own(v,k));
    if(!exact(meta,['revision','values','history'])||!Number.isSafeInteger(meta.revision)||meta.revision<0||meta.revision>revision||!Array.isArray(meta.history)||meta.history.length>10000)fail('SoA details have an invalid revision or history structure.');
    validateSoa(meta.values);let previous=0;
    for(const e of meta.history){if(!exact(e,['revision','at','action','operator','changes'])||!Number.isSafeInteger(e.revision)||e.revision<=previous||e.revision>revision||typeof e.at!=='string'||!Number.isFinite(Date.parse(e.at))||e.action!=='edit'||e.operator!=='Ren'||!Array.isArray(e.changes)||!e.changes.length)fail('SoA details history is invalid.');previous=e.revision;const seen=new Set();for(const c of e.changes){if(!exact(c,['field','before','after'])||!S.soaFields.some(([k])=>k===c.field)||seen.has(c.field)||typeof c.before!=='string'||typeof c.after!=='string'||c.before===c.after||c.before.length>2000||c.after.length>2000)fail('A SoA details history change is invalid.');seen.add(c.field);}}
  }
  function saveControlsSoa(current,values,{baseRevision,at=new Date().toISOString()}={}){
    current=normalize(current);validateSoa(values,current.controls_soa.values);
    if(current.controls_soa.revision!==baseRevision)fail(`SoA details changed: opened revision ${baseRevision}; saved revision ${current.controls_soa.revision}.`,null,{code:'metadata-conflict',section:'soa',opened_revision:baseRevision,saved_revision:current.controls_soa.revision});
    const changes=S.soaFields.map(([field])=>field).filter(f=>current.controls_soa.values[f]!==values[f]).map(field=>({field,before:current.controls_soa.values[field],after:values[field]}));
    if(!changes.length)return clone(current);
    const next=clone(current);next.revision++;next.controls_soa.revision++;next.controls_soa.values=clone(values);next.controls_soa.history.push({revision:next.revision,at,action:'edit',operator:'Ren',changes});return checkSnapshot(next);
  }
  function normalize(s){checkSnapshot(s);const next=clone(s);next.version=snapshotVersion;if(s.version===1)next.references=emptyReferences();else for(const kind of referenceKindsByVersion[snapshotVersion])if(!own(next.references,kind)){next.references[kind]=[];next.references.reserved_ids[kind]=[];}if(s.version<5)next.controls_soa=blankSoa();if(s.version<8)next.assessments=B.empty();if(s.version<9)next.documents=J.empty();else if(s.version===9)for(const reservation of next.documents.reservations)reservation.template=clone(J.schema.template);if(s.version<14)next.soa_artifacts=A.empty();return checkSnapshot(next);}
  // Reconstruct native row facts at the captured operation, not today's cover.
  // Complete native histories replay forward; legacy partial histories can be
  // reversed from an available exact row without inventing earlier states.
  function soaReferenceAt(s,kind,id,globalRevision,rowRevision){
    const events=s.references.history.filter(e=>e.kind===kind&&e.record_id===id),live=s.references[kind].find(r=>r.values.id===id);
    if(events[0]?.action==='create'){
      const row={revision:0,values:S.blank(kind)};
      for(const e of events){
        if(globalRevision!==undefined&&e.revision>globalRevision||rowRevision!==undefined&&row.revision>=rowRevision)break;
        if(e.action==='create'&&row.revision)fail('A SoA reference identity has conflicting native creation history.');
        for(const change of e.changes){if(row.values[change.field]!==change.before)fail('Exact historical SoA reference facts cannot be reconstructed. Recover compatible provenance.');row.values[change.field]=change.after;}
        row.revision++;if(e.action==='delete')row.deleted_at=e.at;else if(e.action==='restore-row')delete row.deleted_at;
      }
      return row.revision?row:null;
    }
    if(!live)return null;
    const row=clone(live);
    for(let i=events.length-1;i>=0;i--){const e=events[i];if(globalRevision!==undefined&&e.revision<=globalRevision||rowRevision!==undefined&&row.revision<=rowRevision)break;
      for(const change of [...e.changes].reverse()){if(row.values[change.field]!==change.after)fail('Exact historical SoA reference facts cannot be reconstructed. Recover compatible provenance.');row.values[change.field]=change.before;}
      if(e.action==='delete')delete row.deleted_at;else if(e.action==='restore-row'){const prior=events.slice(0,i).reverse().find(p=>p.action==='delete');if(!prior)return null;row.deleted_at=prior.at;}row.revision--;
    }
    if(rowRevision!==undefined&&row.revision!==rowRevision)return null;
    return row.revision>0?row:null;
  }
  function soaDetailsAt(s,revision,before=false){
    const values=clone(s.controls_soa.values);let rowRevision=s.controls_soa.revision;
    for(const e of [...s.controls_soa.history].reverse()){
      if(e.revision<revision||e.revision===revision&&!before)break;
      for(const change of [...e.changes].reverse()){if(values[change.field]!==change.after)fail('Exact SoA details history cannot be reconstructed.');values[change.field]=change.before;}rowRevision--;
    }
    return {revision:rowRevision,values};
  }
  function soaManualAt(s,recordId,revision){
    let body=null;
    for(const event of s.documents.history){
      if(event.record_id!==recordId||event.workspace_revision>revision)continue;
      const presence=event.changes.find(c=>c.path[0]==='entry');
      if(presence)body=clone(presence.after);
      else if(body){
        for(const change of event.changes){
          if(change.path[0]==='values'&&change.path[1]==='T12R2C1')body.values.T12R2C1=change.after;
          else if(change.path[0]==='read_only')body.read_only=clone(change.after);
        }
        body.revision=event.document_revision;
      }
    }
    return body;
  }
  function checkSoaNativeProvenance(s){
    const artifact=s.soa_artifacts;
    const equal=(a,b)=>Q.canonical(a)===Q.canonical(b);
    const literal=(captured,kind,atGlobal,atRow)=>{
      if(atGlobal!==undefined&&atRow!==undefined){const then=soaReferenceAt(s,kind,captured.values.id,atGlobal);if(then&&then.revision<atRow)fail('A SoA freeze cannot claim a later native row revision.');}
      const id=captured.values.id,row=soaReferenceAt(s,kind,id,atGlobal,atRow);
      if(!row&&s.references.history.some(e=>e.kind===kind&&e.record_id===id&&e.action==='create'))fail('A SoA snapshot predates its actual native row creation: '+id+'.');
      if(row&&(row.revision!==captured.revision||!equal(row.values,captured.values)||(row.deleted_at||null)!==(captured.deleted_at||null)))fail('A saved SoA '+kind+' snapshot differs from its actual historical native row: '+id+'.');
      if(!s.references.reserved_ids[kind].includes(id))fail('A captured SoA reference is missing its native identity reservation.');
    };
    const ordinary=[...s.history,...(s.directory?.history||[]),...(s.dropdowns?.history||[]),...s.references.history,...s.controls_soa.history];
    for(const c of artifact.captures){
      literal({revision:c.record_revision,values:c.cover},'records',c.workspace_revision);
      for(const row of c.basis.controls.rows.concat(c.basis.controls.predecessors))literal(row,'controls',c.basis.workspace_revision);
      for(const kind of ['records','decisions','actions','links','assurance'])for(const row of c.basis.dependencies[kind])literal(row,kind,c.basis.workspace_revision);
      for(const id of c.basis.controls.reserved_ids)if(!s.references.reserved_ids.controls.includes(id))fail('Captured Control reservation has no native identity history.');
      if(!equal(soaDetailsAt(s,c.basis.workspace_revision),c.basis.details))fail('Saved SoA worksheet values differ from their exact native preparation history.');
      const manualId=c.basis.details.values.aims_manual_record_id,manualRecord=c.basis.dependencies.records.find(r=>r.values.id===manualId&&!r.deleted_at),body=soaManualAt(s,manualId,c.basis.workspace_revision);
      const available=manualRecord&&body&&equal(body.template,J.schema.template)&&typeof body.values?.T12R2C1==='string'&&(!body.read_only||body.read_only.record_values.version===manualRecord.values.version);
      let scope=null;
      if(available){const version=manualRecord.values.version;scope={record_id:manualId,document_id:body.document_id,document_revision:body.revision,record_revision:manualRecord.revision,version,template:clone(body.template),text:body.values.T12R2C1,provenance:'Native saved Manual '+body.document_id+' / '+manualId+' / version '+version+' / draft revision '+body.revision+' / T12R2C1 proposed scope; not approved governing scope'};}
      if(!equal(scope,c.basis.manual_scope))fail('Saved SoA Manual scope differs from its exact native body identity, revision or proposed T12 scope.');
      const historicalReferences={};
      for(const kind of S.kinds){
        const ids=new Set([...s.references[kind].map(r=>r.values.id),...s.references.history.filter(e=>e.kind===kind).map(e=>e.record_id)]);
        historicalReferences[kind]=[...ids].map(id=>soaReferenceAt(s,kind,id,c.basis.workspace_revision)).filter(Boolean);
      }
      const reserved=s.references.reserved_ids.controls.filter(id=>{const creation=s.references.history.find(e=>e.kind==='controls'&&e.record_id===id&&e.action==='create');return creation?creation.revision<=c.basis.workspace_revision:c.basis.controls.reserved_ids.includes(id);});
      historicalReferences.reserved_ids={controls:reserved};
      const historical={workspace_id:s.workspace_id,revision:c.basis.workspace_revision,references:historicalReferences,controls_soa:soaDetailsAt(s,c.basis.workspace_revision),documents:{entries:body?[body]:[]}};
      const expected=Q.select(historical,{checkingDate:c.checking_date,organizationId:c.organization_id});
      if(!equal(expected,c.basis))fail('Saved SoA source population or dependency closure differs from its exact native preparation history.');
    }
    for(const e of artifact.events){
      if([...s.documents.history,...s.assessments.history].some(p=>p.workspace_revision===e.workspace_revision))fail('A SoA operation cannot claim an unrelated native document or Assessment transaction.');
      const parents=ordinary.filter(p=>p.revision===e.workspace_revision),ref=parents.find(p=>p.kind&&s.references.history.includes(p)),meta=parents.find(p=>s.controls_soa.history.includes(p));
      if(e.kind==='capture-saved'){
        if(parents.length&&(parents.length!==1||ref?.kind!=='records'||ref.action!=='create'||ref.record_id!==e.record_id||ref.at!==e.at))fail('A SoA capture cannot claim another native transaction revision.');
      }else if(e.kind==='owner-frozen'){
        const freezes=e.payload.freezes;
        for(const item of freezes){const f=item.freeze;
          if(!parents.length||parents.length!==1||ref?.kind!==(f.kind==='decision'?'decisions':'records')||ref.record_id!==f.source_id||ref.at!==e.at)fail('A SoA freeze is not linked to its actual native Record/Decision transaction.');
          if(f.values)literal({revision:f.source_revision,values:f.values,deleted_at:f.deleted_at},f.kind==='decision'?'decisions':'records',e.workspace_revision,f.source_revision);
        }
      }else{
        const p=e.payload;
        literal(p.issued_record,'records',e.workspace_revision);literal(p.decision,'decisions',e.workspace_revision);
        const pair=v=>({soa_record_id:v.soa_record_id,approval_decision_id:v.approval_decision_id});
        if(!equal(pair(soaDetailsAt(s,e.workspace_revision,true).values),p.before_pair)||!equal(pair(soaDetailsAt(s,e.workspace_revision).values),p.after_pair))fail('The recorded SoA external issue differs from its actual before/after native pair.');
        if(parents.length&&(parents.length!==1||!meta||meta.at!==e.at||meta.changes.some(c=>!['soa_record_id','approval_decision_id'].includes(c.field))))fail('A SoA issue event cannot claim an unrelated native transaction revision.');
      }
    }
    for(const binding of artifact.bindings){
      if(binding.freeze)continue;
      const row=s.references.records.find(r=>r.values.id===binding.record_id);
      if(!row||row.deleted_at||row.values.type!=='Statement of Applicability'||!['Draft','Under review'].includes(row.values.lifecycle)||row.values.version!==binding.version)fail('A retained SoA owner is missing its sticky read-only history marker.');
      try{if(A.retentionReason(artifact,s,binding.record_id))fail('A retained SoA owner is missing its sticky read-only history marker.');}catch(e){if(e.code!=='soa-history-ambiguous')throw e;}
    }
  }
  function checkSnapshot(s){
    if(!plain(s)||!['format','version','workspace_id','revision','reserved_ids','systems','history'].every(k=>own(s,k))||s.format!=='owl-register-preview'||![1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22].includes(s.version)||s.workspace_id!==workspaceId)fail('This file is not a supported Orchid Bay preview backup.');
    const allowed=['format','version','workspace_id','revision','reserved_ids','systems','history','directory','dropdowns',...(s.version>=2?['references']:[]),...(s.version>=5?['controls_soa']:[]),...(s.version>=8?['assessments']:[]),...(s.version>=9?['documents']:[]),...(s.version>=14?['soa_artifacts']:[]),...(s.version>=15?['owner_inputs']:[]),...(s.version>=22?['register_control']:[])];
    if(Object.keys(s).some(k=>!allowed.includes(k)))fail('The preview backup contains unsupported properties.');
    if(!Number.isSafeInteger(s.revision)||s.revision<0||!Array.isArray(s.systems)||s.systems.length>500||!Array.isArray(s.history)||s.history.length>10000)fail('The preview backup has an invalid structure or exceeds its limits.');
    if(!Array.isArray(s.reserved_ids)||new Set(s.reserved_ids).size!==s.reserved_ids.length)fail('The preview identity history is invalid.');
    for(const id of s.reserved_ids)validate({...blank(),system_id:id});
    if(s.directory!==undefined)O.validate(s.directory,s.revision);
    if(s.dropdowns!==undefined)D.validate(s.dropdowns,s.revision);
    const seen=new Set();
    for(const r of s.systems){
      if(!plain(r)||Object.keys(r).some(k=>!['revision','values','owner_ref','process_ref','choices','deleted_at'].includes(k))||!Number.isSafeInteger(r.revision)||r.revision<0||r.revision>s.revision)fail('A saved row has an invalid revision.');
      if(r.deleted_at!==undefined&&(typeof r.deleted_at!=='string'||!Number.isFinite(Date.parse(r.deleted_at))))fail('A deleted row has an invalid deletion date.');
      O.validateRef(s,r.owner_ref,['roles','people']);O.validateRef(s,r.process_ref,['processes']);
      validate(r.values);D.validateRow(s,r);if(seen.has(r.values.system_id))fail('The backup contains duplicate system IDs.');if(!s.reserved_ids.includes(r.values.system_id))fail('A saved system is missing from the identity history.');seen.add(r.values.system_id);
    }
    let previous=0;
    for(const e of s.history){
      if(!plain(e)||Object.keys(e).some(k=>!['revision','at','action','system_id','changes'].includes(k))||!Number.isSafeInteger(e.revision)||e.revision<=previous||e.revision>s.revision||typeof e.at!=='string'||!Number.isFinite(Date.parse(e.at))||!['create','edit','restore','delete','restore-row'].includes(e.action)||typeof e.system_id!=='string'||!Array.isArray(e.changes))fail('The preview history is invalid.');
      previous=e.revision;
      if(['delete','restore-row'].includes(e.action)&&(!s.reserved_ids.includes(e.system_id)||e.changes.length))fail('A row lifecycle event has an invalid system identity or changes.');
      for(const c of e.changes)if(!plain(c)||Object.keys(c).some(k=>!['field','before','after'].includes(k))||![...keys,'owner_ref','process_ref',...D.fields.map(f=>'choice_'+f)].includes(c.field)||typeof c.before!=='string'||typeof c.after!=='string')fail('A history change is invalid.');
    }
    if(s.version>=2)checkReferences(s.references,s.revision,referenceKindsByVersion[s.version]);
    if(s.version>=5)checkSoa(s.controls_soa,s.revision);
    if(s.version>=8){B.check(s.assessments,s.revision);for(const e of s.assessments.entries){const record=s.references.records.find(r=>r.values.id===e.record_id);if(record&&B.retained.includes(record.values.lifecycle)&&!e.read_only)fail(`Retained Assessment ${e.record_id} is missing its read-only history marker.`);}
      const captures=[...s.assessments.entries.flatMap(e=>e.captures),...s.assessments.history.flatMap(h=>[...(h.before?.captures||[]),...(h.after?.captures||[])])];
      for(const c of captures)if(c.target_sheet==='systems')validate(c.values);else validateReference(c.target_sheet,c.values);
    }
    if(s.version>=9){
      if(s.version===9)J.checkLegacyV9(s.documents,s.revision);else if(s.version===10)J.checkLegacyV10(s.documents,s.revision);else if(s.version===11)J.checkLegacyV11(s.documents,s.revision);else if(s.version===12)J.checkLegacyV12(s.documents,s.revision);else J.check(s.documents,s.revision);
      if(s.documents.reserved_record_ids.some(id=>s.assessments.reserved_ids.includes(id)))fail('A Record identity cannot be reserved for both a '+documentName({record_id:s.documents.reserved_record_ids.find(id=>s.assessments.reserved_ids.includes(id))},s)+' and an Assessment.');
      for(const entry of s.documents.entries){
        const record=s.references.records.find(row=>row.values.id===entry.record_id);
        if(s.assessments.entries.some(item=>item.record_id===entry.record_id))fail(`Record ${entry.record_id} cannot own both a ${documentName(entry,s)} and an Assessment.`);
        if(record&&J.retained.includes(record.values.lifecycle)&&!entry.read_only)fail(`Retained ${documentName(entry,s)} ${entry.record_id} is missing its frozen snapshot.`);
      }
    }
    if(s.version>=14){
      A.check(s.soa_artifacts,s.revision);
      for(const binding of s.soa_artifacts.bindings){
        if(s.documents.reserved_record_ids.includes(binding.record_id)||s.assessments.reserved_ids.includes(binding.record_id))fail(`Record ${binding.record_id} cannot own both a SoA capture and another native body.`,'record_id');
        if(!s.references.reserved_ids.records.includes(binding.record_id))fail('A SoA binding must retain its original Record reservation.','record_id');
      }
      for(const capture of s.soa_artifacts.captures)if(capture.workspace_id!==s.workspace_id||capture.organization_id!==s.workspace_id)fail('A saved SoA capture belongs to another workspace or organization.');
      checkSoaNativeProvenance(s);
    }
    R.check(s,soaReferenceAt);
    const eventRevisions=[...s.history,...(s.directory?.history||[]),...(s.dropdowns?.history||[]),...(s.references?.history||[]),...(s.controls_soa?.history||[])].map(e=>e.revision).concat([...(s.register_control?.history||[]),...(s.register_control?.issues||[])].map(e=>e.workspace_revision));
    if(new Set(eventRevisions).size!==eventRevisions.length)fail('History events cannot share a workspace revision.');
    I.schema.check(s.owner_inputs,s);
    if(byteLength(JSON.stringify(s))>4_000_000)fail('The preview exceeds the 4 MB backup limit. Keep the previous saved copy and export it before continuing.');
    return s;
  }
  function parseSnapshot(text){
    if(typeof text!=='string'||text.length>4_000_000||byteLength(text)>4_000_000)fail('The preview backup is too large or is not text.');
    let s;try{s=JSON.parse(text);}catch{fail('The preview backup is not valid JSON.');}
    return checkSnapshot(s);
  }
  function save(current,values,{id=null,baseRevision=0,ownerRef=undefined,processRef=undefined,choices=undefined,at=new Date().toISOString()}={}){
    current=normalize(current);validate(values);
    const index=id===null?-1:current.systems.findIndex(r=>r.values.system_id===id);
    if(id!==null&&index<0)fail('The original system no longer exists. Reopen the register.');
    if(index>=0&&current.systems[index].deleted_at)fail('This row is deleted. Restore it before editing.');
    if(index>=0&&values.system_id!==id)fail('An existing system ID cannot be changed here.','system_id');
    if(index>=0&&current.systems[index].revision!==baseRevision)fail(`System ${id} changed: your row was opened at revision ${baseRevision}; the saved row is revision ${current.systems[index].revision}.`,null,{code:'row-conflict',record_id:id,opened_revision:baseRevision,saved_revision:current.systems[index].revision});
    if(index<0&&current.reserved_ids.includes(values.system_id))fail('That system ID already exists or was previously used. Open the existing row or correct the ID.','system_id');
    const before=index<0?blank():current.systems[index].values;
    const changes=keys.filter(k=>before[k]!==values[k]).map(field=>({field,before:before[field],after:values[field]}));
    const selected=D.changedChoices(current,index<0?null:current.systems[index],values,choices);
    changes.push(...selected.events);
    const refs={};
    for(const [field,valueKey,requested,allowed] of [['owner_ref','system_owner',ownerRef,['roles','people']],['process_ref','business_process',processRef,['processes']]]){
      const old=index<0?null:current.systems[index][field]||null;
      const ref=requested===undefined?(before[valueKey]===values[valueKey]?old:null):requested;
      O.validateRef(current,ref,allowed);
      const repr=r=>r?O.refKey(r.kind,r.id):'';
      if(ref&&before[valueKey]!==values[valueKey]&&O.find(current,ref).name!==values[valueKey])fail('The selected label does not match its directory entry.',valueKey);
      if(field==='process_ref'&&ref&&repr(old)!==repr(ref))fail('Business process lists are retired. Enter the activity as text.',valueKey);
      if(repr(old)!==repr(ref)){
        const item=O.find(current,ref);if(ref&&(item.archived||item.name!==values[valueKey]))fail('The selected list entry changed or is archived. Select it again from the current list.',valueKey);
        changes.push({field,before:repr(old),after:repr(ref)});
      }
      if(ref)refs[field]=clone(ref);
    }
    if(index>=0&&!changes.length)return clone(current);
    const next=clone(current);next.revision++;
    const row={revision:index<0?1:next.systems[index].revision+1,values:clone(values),...refs};
    if(Object.keys(selected.choices).length)row.choices=selected.choices;
    if(index<0){next.systems.push(row);next.reserved_ids.push(values.system_id);}else next.systems[index]=row;
    next.history.push({revision:next.revision,at,action:index<0?'create':'edit',system_id:values.system_id,changes});
    return checkSnapshot(next);
  }
  function restore(current,backup,at=new Date().toISOString()){
    current=normalize(current);backup=normalize(backup);
    const next=clone(backup);next.revision=Math.max(current.revision,backup.revision)+1;next.reserved_ids=Array.from(new Set([...current.reserved_ids,...backup.reserved_ids]));
    if(current.directory||next.directory){next.directory=clone(O.directory(next));next.directory.reserved_ids=Array.from(new Set([...O.directory(current).reserved_ids,...next.directory.reserved_ids]));}
    if(current.dropdowns||next.dropdowns){next.dropdowns=clone(D.config(next));next.dropdowns.next_id=Math.max(D.config(current).next_id,next.dropdowns.next_id);}
    for(const kind of S.kinds)next.references.reserved_ids[kind]=Array.from(new Set([...current.references.reserved_ids[kind],...next.references.reserved_ids[kind]]));
    R.restore(current,next);
    B.restore(current,next);
    J.restore(current,next,at);
    next.soa_artifacts=A.restore(current.soa_artifacts,next.soa_artifacts).owner;
    I.restore(current,next,at);
    next.history.push({revision:next.revision,at,action:'restore',system_id:'',changes:[]});
    return checkSnapshot(next);
  }
  const activeRows=w=>w.systems.filter(row=>!row.deleted_at);
  function setDeleted(current,id,{baseRevision,deleted,at=new Date().toISOString()}={}){
    current=normalize(current);
    if(typeof deleted!=='boolean')fail('Choose delete or restore for this row.');
    const row=current.systems.find(r=>r.values.system_id===id);
    if(!row)fail('This system row is unavailable. Reopen the sheet.');
    if(row.revision!==baseRevision)fail(`System ${id} changed: your row was opened at revision ${baseRevision}; the saved row is revision ${row.revision}. Reopen before deleting or restoring.`,null,{code:'row-conflict',record_id:id,opened_revision:baseRevision,saved_revision:row.revision});
    if(!!row.deleted_at===deleted)fail(deleted?'This row is already deleted.':'This row is already in the sheet.');
    const next=clone(current),item=next.systems.find(r=>r.values.system_id===id);
    next.revision++;item.revision++;
    if(deleted)item.deleted_at=at;else delete item.deleted_at;
    next.history.push({revision:next.revision,at,action:deleted?'delete':'restore-row',system_id:id,changes:[]});
    return checkSnapshot(next);
  }
  function saveReference(current,kind,values,{id=null,baseRevision=0,at=new Date().toISOString()}={}){
    current=normalize(current);validateReference(kind,values);
    const rows=current.references[kind],index=id===null?-1:rows.findIndex(r=>r.values.id===id),row=rows[index];
    if(id!==null&&!row)fail('The original reference no longer exists. Reopen the saved preview.');
    if(row?.deleted_at)fail('This row is deleted. Restore it before editing.');
    if(row&&values.id!==id)fail('A saved reference ID cannot be changed.','id');
    if(row&&row.revision!==baseRevision)fail(`${S.labels[kind]} ${id} changed: opened row revision ${baseRevision}; saved row revision ${row.revision}.`,null,{code:'row-conflict',record_id:id,opened_revision:baseRevision,saved_revision:row.revision});
    if(!row&&current.references.reserved_ids[kind].includes(values.id))fail('That ID already exists or was previously used in this sheet.','id');
    S.validateChoiceChanges(kind,values,row?.values);
    if(kind==='links')S.validateLinkChanges(values,row?.values);
    const before=row?row.values:S.blank(kind),changes=S.fields[kind].map(([field])=>field).filter(field=>before[field]!==values[field]).map(field=>({field,before:before[field],after:values[field]}));
    if(row&&!changes.length)return clone(current);
    const next=clone(current);next.revision++;
    const updated={revision:row?row.revision+1:1,values:clone(values)};
    if(row)next.references[kind][index]=updated;else{next.references[kind].push(updated);next.references.reserved_ids[kind].push(values.id);}
    next.references.history.push({revision:next.revision,at,action:row?'edit':'create',kind,record_id:values.id,operator:'Ren',changes});
    if(kind==='records'){B.freezeForRecord(next,updated,at);J.freezeForRecord(next,updated,at);}
    if(kind==='records'||kind==='decisions')next.soa_artifacts=A.freezeForWorkspace(next.soa_artifacts,next,{workspaceRevision:next.revision,at}).owner;
    return checkSnapshot(next);
  }
  function setReferenceDeleted(current,kind,id,{baseRevision,deleted,at=new Date().toISOString()}={}){
    current=normalize(current);if(!S.kinds.includes(kind)||typeof deleted!=='boolean')fail('Choose a valid reference sheet and delete/restore operation.');
    const row=current.references[kind].find(r=>r.values.id===id);if(!row)fail('This reference is unavailable. Reopen the sheet.');
    if(row.revision!==baseRevision)fail(`${S.labels[kind]} ${id} changed: opened row revision ${baseRevision}; saved row revision ${row.revision}.`,null,{code:'row-conflict',record_id:id,opened_revision:baseRevision,saved_revision:row.revision});
    if(!!row.deleted_at===deleted)fail(deleted?'This row is already deleted.':'This row is already in the sheet.');
    const next=clone(current),item=next.references[kind].find(r=>r.values.id===id);next.revision++;item.revision++;
    if(deleted)item.deleted_at=at;else delete item.deleted_at;
    next.references.history.push({revision:next.revision,at,action:deleted?'delete':'restore-row',kind,record_id:id,operator:'Ren',changes:[]});
    if(kind==='records'||kind==='decisions')next.soa_artifacts=A.freezeForWorkspace(next.soa_artifacts,next,{workspaceRevision:next.revision,at}).owner;
    return checkSnapshot(next);
  }
  function diagnose(values,unused={},asOf){
    const issues=[],add=(field,code,message)=>{if(!issues.some(i=>i.field===field&&i.code===code))issues.push({field,code,message});};
    for(const f of catalog){try{validate({...blank(),[f.key]:values[f.key]},{identity:false});}catch(e){add(f.key,'invalid',e.message);}}
    for(const k of required)if(!trim(values[k]))add(k,'registration',`${catalog.find(f=>f.key===k).label} is needed for registration.`);
    if(['Unknown','Under review'].includes(values.scope_status))add('scope_status','scope-review','The scope determination is pending. Record its reviewed outcome and basis when available.');
    if(['In scope','Out of scope','Superseded'].includes(values.scope_status)&&!trim(values.scope_basis))add('scope_basis','scope','Explain the basis for this scope determination.');
    if(values.scope_status==='In scope'){
      for(const k of decisionFields)if(!trim(values[k]))add(k,'preparation',`${catalog.find(f=>f.key===k).label} is needed for decision preparation.`);
      if(['Unknown','Under review'].includes(values.lifecycle_route))add('lifecycle_route','preparation','The lifecycle route is still unresolved.');
      if(trim(values.system_owner).toLowerCase()==='unassigned')add('system_owner','preparation','An accountable owner is still unassigned.');
      if(values.lifecycle_state==='Unknown')add('lifecycle_state','preparation','The actual lifecycle state is still unknown.');
    }
    if((values.last_reviewed||values.scope_status==='In scope')&&!values.next_review_date&&!trim(values.review_trigger))add('next_review_date','review-plan','Add a next review date or a review trigger.');
    if(!validDate(asOf))add('next_review_date','as-of','Choose a valid as-of date before relying on calendar checks.');
    else if(values.next_review_date&&validDate(values.next_review_date)&&values.next_review_date<=asOf)add('next_review_date','due','The calendar review is due. The recorded lifecycle has not changed.');
    if(values.lifecycle_state==='In operation'&&!values.governing_decision_id)add('governing_decision_id','authority','The system is recorded as In operation, but no governing decision is linked.');
    const recorded=k=>!!trim(values[k])&&!issues.some(i=>i.field===k&&i.code==='invalid');
    return {issues,registrationCount:required.filter(recorded).length,registrationComplete:required.every(recorded),nextField:issues[0]?.field||(!trim(values.intended_purpose)?'intended_purpose':'last_reviewed')};
  }
  function proposal(row,editVersion){
    if(row.values.intended_purpose!==catalog[2].example)return null;
    return {system_id:row.values.system_id,field:'intended_purpose',baseRevision:row.revision,editVersion,original:row.values.intended_purpose,text:'Sort incoming case documents to help staff find the appropriate queue.'};
  }
  function proposalBlock(row,p,selected,editVersion){
    if(!p)return 'No wording example is available for this value.';
    if(p.field!=='intended_purpose'||p.system_id!==row.values.system_id||selected!==p.field)return 'Select the original system and Intended purpose cell.';
    if(p.baseRevision!==row.revision||p.editVersion!==editVersion||p.original!==row.values.intended_purpose)return 'The record changed. Discard this draft and review the current value.';
    if(typeof p.text!=='string'||!p.text.trim()||p.text.length>2000)return 'Enter wording between 1 and 2,000 characters.';
    if(p.text===p.original)return 'The wording is unchanged.';
    return '';
  }
  function saveAssessment(w,id,unit,values,options){return checkSnapshot(B.save(normalize(w),id,unit,values,options));}
  // One workspace write creates both owning records. Assessment history already
  // supports the same workspace revision as its linked Record (retained locks).
  function createAssessmentDraft(current,{recordId,systemId,title='',systemRevision,recordRevision=null,at=new Date().toISOString()}={}){
    current=normalize(current);
    const system=activeRows(current).find(r=>r.values.system_id===systemId);
    if(!system)fail(`AI System ${systemId||'(not selected)'} is missing or deleted. Save its row before creating an assessment.`,'system_id',{code:'assessment-parent'});
    if(system.revision!==systemRevision)fail(`AI System ${systemId} changed after assessment setup. Reopen the saved preview and select it again.`,'system_id',{code:'assessment-source-conflict'});
    const record=current.references.records.find(r=>r.values.id===recordId);
    let next=current;
    if(recordRevision===null){
      if(record||current.references.reserved_ids.records.includes(recordId))fail(`Record ${recordId} already exists or was previously used. Choose its saved assessment or use another assigned ID.`,'assessment_record_id');
      if(typeof title!=='string'||!title.trim())fail('Enter a title for this assessment.','title');
      const values={...S.blank('records'),id:recordId,type:'Assessment',title,subject_type:'AI system',subject_id:systemId,lifecycle:'Draft'};
      try{next=saveReference(current,'records',values,{at});}catch(e){if(e.field==='id')e.field='assessment_record_id';throw e;}
    }else{
      if(!record||record.revision!==recordRevision)fail(`Assessment Record ${recordId} changed after selection. Reopen the saved preview and choose it again.`,'assessment_record_id',{code:'assessment-source-conflict'});
      B.parent(current,recordId,systemId);
    }
    if(J.find(next,recordId)||next.documents.reserved_record_ids.includes(recordId))fail(`Record ${recordId} already belongs to a saved Manual. Use a separate assigned Record ID.`,'assessment_record_id');
    if(next.soa_artifacts.reservations.some(item=>item.record_id===recordId))fail(`Record ${recordId} already belongs to a saved SoA. Use a separate assigned Record ID.`,'assessment_record_id');
    const existing=B.find(next,recordId);
    if(existing){if(existing.system_id!==systemId)fail(`Assessment ${recordId} belongs to another AI System.`,'system_id');B.writable(next,existing);return clone(next);}
    const values=B.entryBlank(recordId,systemId).summary.values;
    next=B.save(next,recordId,'summary',values,{at});
    if(recordRevision===null){
      // Pure owners each describe their own event; this compound operation is
      // one transaction/revision. Neither intermediate snapshot is persisted.
      next.revision=current.revision+1;
      next.assessments.history.at(-1).workspace_revision=next.revision;
    }
    return checkSnapshot(next);
  }
  function setAssessmentDeleted(w,id,unit,rowId,options){return checkSnapshot(B.setDeleted(normalize(w),id,unit,rowId,options));}
  function documentName(input,current){const source=input?.payload||input,id=source?.record_id||source?.recordId||input?.recordId,reservation=current?.documents?.reservations.find(item=>item.record_id===id),pin=reservation?.template||source?.template,templateId=pin?.id||input?.templateId||'aims-manual-d255';const names={'aims-manual-d255':'Manual','ai-governance-policy-d255':'Policy','ai-risk-impact-procedure':'Risk procedure','ai-system-lifecycle-procedure':'Lifecycle procedure','aims-assurance-improvement-procedure':'Assurance procedure'};return own(names,templateId)?names[templateId]:'document';}
  function documentPayload(input){
    const name=documentName(input);
    if(!plain(input))fail(`${name} Save needs a named authoring payload.`);
    const source=input.payload||input;
    const contract=J.schemaFor(source.template||input.templateId||'aims-manual-d255'),payload=J.blankPayload(contract.template.id),templateId=contract.template.id;
    const groups={'aims-manual-d255':{artifact_refs:'artifactRefs',repositories:'repositories'},'ai-governance-policy-d255':{artifact_refs:'artifactRefs',distribution:'distribution',precedence:'precedence',principle_rows:'principleRows'},'ai-risk-impact-procedure':{distribution:'distribution'},'ai-system-lifecycle-procedure':{distribution:'distribution',configuration_record_id:'configurationRecordId'},'aims-assurance-improvement-procedure':{distribution:'distribution',configuration_record_id:'configurationRecordId'}};
    if(!own(groups,templateId))fail('Choose a reviewed native document template.','template');
    const map={record_id:'recordId',document_id:'documentId',values:'values',review:'review',...groups[templateId],history_rows:'historyRows',glossary_rows:'glossaryRows',capture_bindings:'captureBindings',captures:'captures',template:'template'};
    if(input.payload&&(!plain(input.payload)||Object.keys(input.payload).some(key=>!own(map,key))))fail(`The ${name} authoring payload contains unsupported fields.`);
    if(input.templateId!==undefined&&input.templateId!==payload.template.id)fail(`The selected ${name} template does not match the reviewed source.`,'template');
    for(const [key,alias]of Object.entries(map))if(own(source,key)||own(source,alias))payload[key]=clone(own(source,key)?source[key]:source[alias]);
    return payload;
  }
  function documentRecordPatch(record,input){
    const name=documentName(input);
    const patch=input.recordPatch||{};
    if(!plain(patch)||Object.keys(patch).some(key=>!['version','lifecycle','access','location','owner'].includes(key)))fail(`${name} cover changes may only edit Version, lifecycle, classification, location and an explicitly selected content owner.`);
    const normalized=Object.fromEntries(Object.entries(patch).map(([key,value])=>[key,J.normalizeText(value)]));
    for(const [key,value]of Object.entries(normalized))J.text(value,'Document control · '+key);
    const values={...record.values,...normalized};
    if(!['Draft','Under review'].includes(values.lifecycle))fail(`A ${name} draft cannot approve or issue its owning Record.`,'lifecycle');
    validateReference('records',values);return values;
  }
  function documentOperationOptions(input,options){
    return {baseDocumentRevision:options.baseDocumentRevision??input.baseDocumentRevision,baseRecordRevision:options.baseRecordRevision??input.baseRecordRevision,baseWorkspaceRevision:options.baseWorkspaceRevision??input.baseWorkspaceRevision,pendingSources:options.pendingSources??input.pendingSources??{},at:options.at||input.at||new Date().toISOString()};
  }
  function guardDocumentWorkspace(current,options,name='Manual'){
    if(options.baseWorkspaceRevision!==undefined&&options.baseWorkspaceRevision!==current.revision)fail(`The ${name} was opened at workspace revision ${options.baseWorkspaceRevision}; the saved preview is revision ${current.revision}. Reopen the saved preview before saving.`,null,{code:'workspace-conflict',opened_revision:options.baseWorkspaceRevision,saved_revision:current.revision});
  }
  function saveDocumentDraft(current,input,options={}){
    const name=documentName(input,current);
    current=normalize(current);options=documentOperationOptions(input,options);guardDocumentWorkspace(current,options,name);
    const payload=documentPayload(input),record=current.references.records.find(row=>row.values.id===payload.record_id);
    if(!record||record.deleted_at)fail(`${name} Record ${payload.record_id||'(not assigned)'} is missing or deleted. Restore its exact Record before editing.`, 'record_id',{code:'document-parent'});
    if(record.revision!==options.baseRecordRevision)fail(`${name} Record ${payload.record_id} changed: opened revision ${options.baseRecordRevision}; saved revision ${record.revision}. Reopen the saved preview.`, 'record_id',{code:'document-record-conflict',opened_revision:options.baseRecordRevision,saved_revision:record.revision});
    const entry=J.find(current,payload.record_id);if(!entry)fail(`The saved ${name} body is missing. Use a compatible backup to recover it.`,'record_id');
    J.writable(current,entry);
    const recordValues=documentRecordPatch(record,input);
    let next=saveReference(current,'records',recordValues,{id:payload.record_id,baseRevision:options.baseRecordRevision,at:options.at});
    const finalRecord=next.references.records.find(row=>row.values.id===payload.record_id);
    const result=J.save(current,payload,{...options,recordRevision:finalRecord.revision,workspaceRevision:current.revision+1});
    if(result.changed){next.documents=result.documents;next.revision=current.revision+1;}
    return checkSnapshot(next);
  }
  function createDocumentDraft(current,input,options={}){
    const name=documentName(input,current);
    current=normalize(current);options=documentOperationOptions(input,options);guardDocumentWorkspace(current,options,name);
    const payload=documentPayload(input),record=current.references.records.find(row=>row.values.id===payload.record_id);
    if(J.find(current,payload.record_id))fail(`This Record already has a saved ${name}. Open its saved work.`,'record_id');
    if(current.documents.reserved_record_ids.includes(payload.record_id))fail(`This Record has a reserved ${name} binding with a missing body. Recover it from a compatible backup.`,'record_id');
    if(current.assessments.reserved_ids.includes(payload.record_id))fail(`A native Assessment Record cannot also own a ${name}. Use a separate assigned Record ID.`,'record_id');
    if(current.soa_artifacts.reservations.some(item=>item.record_id===payload.record_id))fail(`A saved SoA Record cannot also own a ${name}. Use a separate assigned Record ID.`,'record_id');
    let next;
    if(record){
      if(!input.existingRecord)fail('This Record ID already exists. Select that saved Record explicitly or use another assigned ID.','record_id');
      if(record.revision!==options.baseRecordRevision)fail(`The selected ${name} Record changed. Reopen it before attaching the body.`,'record_id',{code:'document-record-conflict'});
      if(record.deleted_at||record.values.type!=='Controlled document'||!['Draft','Under review'].includes(record.values.lifecycle))fail('Select an active Draft or Under review Controlled document Record.','record_id');
      next=saveReference(current,'records',documentRecordPatch(record,input),{id:payload.record_id,baseRevision:options.baseRecordRevision,at:options.at});
    }else{
      if(input.existingRecord)fail('The selected existing Record is missing. Select it again.','record_id');
      const policy=payload.template.id==='ai-governance-policy-d255',risk=payload.template.id==='ai-risk-impact-procedure',lifecycle=payload.template.id==='ai-system-lifecycle-procedure',assurance=payload.template.id==='aims-assurance-improvement-procedure',title=policy?'AI Governance Policy':risk?'AI Risk and Impact Management Procedure':lifecycle?'AI System Lifecycle Management Procedure':assurance?'AIMS Assurance and Improvement Procedure':'AIMS Manual';
      const values={...S.blank('records'),id:payload.record_id,type:'Controlled document',title,lifecycle:'Draft',custody:'Available',...(input.newRecord||{})};
      if(policy&&values.title!=='AI Governance Policy')fail('A new Policy owning Record uses AI Governance Policy as its title. Existing attachments retain their saved title.','title');
      if(risk&&values.title!=='AI Risk and Impact Management Procedure')fail('A new Risk procedure owning Record uses AI Risk and Impact Management Procedure as its title. Existing attachments retain their saved title.','title');
      if(lifecycle&&values.title!=='AI System Lifecycle Management Procedure')fail('A new Lifecycle procedure owning Record uses AI System Lifecycle Management Procedure as its title. Existing attachments retain their saved title.','title');
      if(assurance&&values.title!=='AIMS Assurance and Improvement Procedure')fail('A new Assurance procedure owning Record uses AIMS Assurance and Improvement Procedure as its title. Existing attachments retain their saved title.','title');
      if(values.id!==payload.record_id||values.type!=='Controlled document'||!['Draft','Under review'].includes(values.lifecycle))fail(`New ${name} metadata must identify its exact Controlled document Record.`,'record_id');
      const patch=documentRecordPatch({values},input);
      next=saveReference(current,'records',patch,{at:options.at});
    }
    const finalRecord=next.references.records.find(row=>row.values.id===payload.record_id);
    const result=J.create(current,payload,{record:finalRecord,workspaceRevision:current.revision+1,at:options.at,pendingSources:options.pendingSources});
    next.documents=result.documents;next.revision=current.revision+1;return checkSnapshot(next);
  }
  function soaContext(current,{checkingDate,organizationId}={}){
    if(!validDate(checkingDate))fail('Choose a valid checking date before preparing or saving the SoA.','checking_date');
    if(organizationId!==current.workspace_id)fail('This SoA operation belongs to another organization or workspace.');
    return {checkingDate,organizationId};
  }
  function prepareSoa(current,options){current=normalize(current);const context=soaContext(current,options),basis=Q.select(current,context);return {basis,projection:Q.project(basis)};}
  function soaOwnerBlock(current,id){
    try{
      current=normalize(current);const r=current.references.records.find(r=>r.values.id===id);
      if(!r||r.deleted_at)return 'The exact owning Record is missing or deleted. Open its saved copies or recover its body.';
      if(r.values.type!=='Statement of Applicability'||!['Draft','Under review'].includes(r.values.lifecycle))return 'Choose an active Draft or Under review Statement of Applicability Record.';
      if(current.documents.reserved_record_ids.includes(id)||current.assessments.reserved_ids.includes(id))return 'This Record already belongs to another native document or Assessment.';
      const reason=A.retentionReason(current.soa_artifacts,current,id);
      if(reason)return 'This owning Record basis is retained by its lifecycle, version or actual Decision. Use a new assigned Record/version; saved history remains available.';
      return '';
    }catch(e){return e.message;}
  }
  function soaCaptureGuards(current,input,options={}){
    const context=soaContext(current,input);
    if(options.privateClear!==true)fail('Resolve the relevant unsaved source inputs in their owning editors before Save.','record_id');
    if(options.baseWorkspaceRevision!==undefined&&options.baseWorkspaceRevision!==current.revision)fail('The saved workspace changed. Review the source inputs before Save.');
    const prepared=input.prepared,owner=input.owner;
    if(!plain(prepared)||Object.keys(prepared).length!==2||!own(prepared,'basis')||!own(prepared,'projection'))fail('Save needs the exact prepared SoA basis and projection.');
    Q.checkBasis(prepared.basis);
    if(prepared.basis.workspace_id!==current.workspace_id||prepared.basis.organization_id!==context.organizationId||prepared.basis.checking_date!==context.checkingDate)fail('The prepared SoA belongs to a different workspace, organization or checking date. Refresh explicitly.');
    if(!Q.fresh(prepared.basis,current,context))fail('Saved source facts or relevant routes changed. Refresh the prepared copy before Save; earlier copies remain unchanged.');
    if(Q.canonical(prepared.projection)!==Q.canonical(Q.project(prepared.basis)))fail('The prepared projection differs from its exact saved source basis.');
    if(!plain(owner)||!['new','existing'].includes(owner.mode)||!plain(owner.record))fail('Select a new assigned or eligible existing owning Record.','record_id');
    validateReference('records',owner.record);
    const record=owner.record,id=record.id;
    if(record.type!=='Statement of Applicability'||!['Draft','Under review'].includes(record.lifecycle))fail('The owning Record must be an explicit Draft or Under review Statement of Applicability.','record_id');
    if(!record.version||record.version!==record.version.trim()||/[\r\n\t]/.test(record.version))fail('Enter the exact nonblank working Record version.','version');
    if(current.documents.reserved_record_ids.includes(id)||current.assessments.reserved_ids.includes(id))fail('This owning Record is already reserved for another native body.','record_id');
    const row=current.references.records.find(r=>r.values.id===id),binding=current.soa_artifacts.bindings.find(b=>b.record_id===id);
    if(owner.mode==='new'){
      if(row||binding||current.references.reserved_ids.records.includes(id)||current.soa_artifacts.reservations.some(r=>r.record_id===id))fail('The assigned Record ID is already in use or reserved. Select its eligible existing Record or recover its saved body.','record_id');
      const reason=A.retentionReason(current.soa_artifacts,current,id);if(reason)fail('An actual recorded disposition already targets this assigned Record. Use an eligible identity.','record_id');
    }else{
      const blocked=soaOwnerBlock(current,id);if(blocked)fail(blocked,'record_id');
      if(row.revision!==owner.recordRevision||Q.canonical(row.values)!==Q.canonical(record))fail('The exact owning Record metadata changed. Select and review it again.','record_id');
    }
    return {context,prepared,owner,row};
  }
  function soaCaptureBlock(current,input){try{current=normalize(current);soaCaptureGuards(current,input,{privateClear:true});return '';}catch(e){return e.message;}}
  function saveSoaCapture(current,input,options={}){
    current=normalize(current);const {prepared,owner,row}=soaCaptureGuards(current,input,options),at=options.at||new Date().toISOString();let next=current;
    if(owner.mode==='new')next=saveReference(current,'records',owner.record,{at});
    const savedRow=next.references.records.find(r=>r.values.id===owner.record.id);
    const result=A.save(current.soa_artifacts,{record:savedRow.values,recordRevision:savedRow.revision,basis:prepared.basis,projection:prepared.projection,workspaceRevision:current.revision+1,at});
    if(!result.changed)return clone(current);
    if(next===current)next=clone(current);next.soa_artifacts=result.owner;next.revision=current.revision+1;
    return checkSnapshot(next);
  }
  function issueChecks(current,input={}){
    current=normalize(current);const {recordId,decisionId,captureIdentity,checkingDate,organizationId}=input,issues=[],information=[];
    const add=(kind,id,field,message)=>issues.push({kind,id:id||'',field,message});
    try{soaContext(current,input);}catch(e){add('soa','',e.field||'checking_date',e.message);}
    const capture=A.find(current.soa_artifacts,captureIdentity||{}),get=(kind,id)=>current.references[kind].find(r=>r.values.id===id);
    if(!capture)add('soa','', 'record_id','Choose one exact saved draft copy as preparation basis.');
    else if(capture.workspace_id!==current.workspace_id||capture.organization_id!==organizationId)add('soa','', 'record_id','The saved preparation belongs to another workspace or organization.');
    const manualId=current.controls_soa.values.aims_manual_record_id,manual=get('records',manualId),issued=get('records',recordId),decision=get('decisions',decisionId),authority=get('records',decision?.values.authority_record_id);
    const has=v=>typeof v==='string'&&!!v.trim();
    function checkRecord(row,id,name,{type,states=['Completed','Approved','Issued'],integrity=false}={}){
      if(!row||row.deleted_at){add('records',id,'id',name+' exact saved Record is missing or deleted.');return;}
      const v=row.values;if(type&&v.type!==type)add('records',id,'type',name+' must identify '+type+'.');
      if(!states.includes(v.lifecycle))add('records',id,'lifecycle',name+' lifecycle must be '+states.join(' / ')+'.');
      for(const field of ['version','location',...(integrity?['integrity']:[])])if(!has(v[field]))add('records',id,field,name+' needs its exact recorded '+field+'.');
      if(v.custody!=='Available')add('records',id,'custody',name+' custody must be Available; actual body access remains unverified.');
      for(const field of S.dates.records)if(v[field]&&!validDate(v[field]))add('records',id,field,name+' has an invalid recorded '+field+'.');
      if(validDate(v.effective_date)&&validDate(checkingDate)&&v.effective_date>checkingDate)add('records',id,'effective_date',name+' takes effect after the checking date.');
      if(validDate(v.validity_end)&&validDate(checkingDate)&&v.validity_end<checkingDate)add('records',id,'validity_end',name+' expired before the checking date.');
      if(v.validity_end&&!validDate(v.validity_end))information.push({kind:'records',id,field:'validity_end',message:name+' has event-based validity; review the event without inferring expiry.'});
    }
    checkRecord(manual,manualId,'E8 Manual',{type:'Controlled document',states:['Approved','Issued']});
    checkRecord(issued,recordId,'External issued SoA',{type:'Statement of Applicability',states:['Issued'],integrity:true});
    if(manual&&!manual.deleted_at&&manual.values.subject_type!=='AIMS')add('records',manualId,'subject_type','The E8 Manual must name its AIMS primary subject.');
    if(manual&&issued&&manual.values.subject_type==='AIMS'&&issued.values.subject_type==='AIMS'&&has(manual.values.subject_id)&&has(issued.values.subject_id)&&manual.values.subject_id!==issued.values.subject_id)add('records',recordId,'subject_id','The Manual and issued SoA identify different AIMS scopes.');
    if(capture&&recordId===capture.record_id)add('records',recordId,'id','The actual issued Record must differ from the working draft owner.');
    if(!decision||decision.deleted_at)add('decisions',decisionId,'id','The exact actual saved Decision is missing or deleted.');
    else{
      const d=decision.values;
      if(d.type!=='SoA issue')add('decisions',decisionId,'type','Select the actual SoA issue Decision.');
      if(d.subject_type!=='Record'||d.subject_id!==recordId)add('decisions',decisionId,'subject_id','The Decision must name this exact externally issued Record as its primary subject.');
      if(!['Issued','Issued with conditions'].includes(d.outcome))add('decisions',decisionId,'outcome','The actual Decision must record Issued or Issued with conditions.');
      if(d.lifecycle!=='Effective')add('decisions',decisionId,'lifecycle','The actual Decision must be recorded Effective.');
      for(const field of ['scope','question','rationale','conditions','issuer','authority_role','authority_record_id','evidence_cutoff','decision_date','effective_date'])if(!has(d[field]))add('decisions',decisionId,field,'Record the actual issued '+field+' or explicit None for conditions.');
      for(const field of ['evidence_cutoff','decision_date','effective_date','expiry_date'])if(d[field]&&!validDate(d[field]))add('decisions',decisionId,field,'The recorded '+field+' is not a valid calendar date.');
      for(const field of ['decision_date','effective_date'])if(validDate(d[field])&&validDate(checkingDate)&&d[field]>checkingDate)add('decisions',decisionId,field,'The '+field+' is after the checking date.');
      if(validDate(d.expiry_date)&&validDate(checkingDate)&&d.expiry_date<checkingDate)add('decisions',decisionId,'expiry_date','The actual Decision expired before the checking date.');
      if(validDate(d.evidence_cutoff)&&validDate(d.decision_date)&&d.evidence_cutoff>d.decision_date)add('decisions',decisionId,'evidence_cutoff','Evidence cut-off cannot follow the Decision date.');
      if(validDate(d.expiry_date)&&validDate(d.effective_date)&&d.expiry_date<d.effective_date)add('decisions',decisionId,'expiry_date','Expiry cannot precede the effective date.');
      if(validDate(d.effective_date)&&validDate(d.decision_date)&&d.effective_date<d.decision_date)information.push({kind:'decisions',id:decisionId,field:'effective_date',message:'Effective date precedes Decision date; review the actual authority. This ordering alone is advisory.'});
      checkRecord(authority,d.authority_record_id,'Decision authority Record');
    }
    if(capture)for(const event of current.soa_artifacts.events.filter(e=>e.kind==='external-issue-recorded'&&e.payload.record_id===recordId)){
      const p=event.payload;if(p.record_version!==issued?.values.version)add('records',recordId,'version','This retained Record identity is already bound to another version. Use a new assigned Record ID.');
      if(p.basis_record_id!==capture.record_id||p.basis_capture_revision!==capture.capture_revision)add('soa','', 'record_id','This issued Record/version is already bound to a different saved preparation.');
    }
    const referenceToken=Q.canonical({workspace_id:current.workspace_id,organization_id:organizationId,checking_date:checkingDate,capture:capture||null,manual:manual||null,issued:issued||null,decision:decision||null,authority:authority||null,details:current.controls_soa});
    return {issues,information,referenceToken,capture: capture?clone(capture):null};
  }
  function recordSoaIssue(current,input,options={}){
    current=normalize(current);
    if(options.privateClear!==true)fail('Resolve relevant unsaved reference inputs in their owning editors before recording the external issue.');
    const checked=issueChecks(current,input);
    if(checked.issues.length){const i=checked.issues[0];fail(i.message,i.field,{code:'soa-issue-gate',destination:{sheet:i.kind,id:i.id,field:i.field},issues:checked.issues});}
    if(typeof input.referenceToken!=='string'||input.referenceToken!==checked.referenceToken)fail('The selected reference facts changed. Recheck explicitly before recording this external issue.');
    const at=options.at||new Date().toISOString(),beforePair={soa_record_id:current.controls_soa.values.soa_record_id,approval_decision_id:current.controls_soa.values.approval_decision_id},afterPair={soa_record_id:input.recordId,approval_decision_id:input.decisionId};
    const pairRevision=current.controls_soa.history.filter(e=>e.changes.some(c=>['soa_record_id','approval_decision_id'].includes(c.field))).at(-1)?.revision||0;
    const result=A.recordIssue(current.soa_artifacts,{recordId:input.recordId,recordVersion:current.references.records.find(r=>r.values.id===input.recordId).values.version,decisionId:input.decisionId,basisRecordId:checked.capture.record_id,basisCaptureRevision:checked.capture.capture_revision,beforePair,afterPair,issuedRecord:current.references.records.find(r=>r.values.id===input.recordId),decision:current.references.decisions.find(r=>r.values.id===input.decisionId),pairRevision,workspaceRevision:current.revision+1,at});
    if(!result.changed)return clone(current);
    const next=saveControlsSoa(current,{...current.controls_soa.values,...afterPair},{baseRevision:current.controls_soa.revision,at});
    next.revision=current.revision+1;next.soa_artifacts=result.owner;return checkSnapshot(next);
  }
  function currentSoaBasis(current){
    current=normalize(current);const values=current.controls_soa.values,row=current.references.records.find(r=>r.values.id===values.soa_record_id&&!r.deleted_at);
    if(!row)return null;
    const pairRevision=current.controls_soa.history.filter(e=>e.changes.some(c=>['soa_record_id','approval_decision_id'].includes(c.field))).at(-1)?.revision||0;
    const event=current.soa_artifacts.events.slice().reverse().find(e=>e.kind==='external-issue-recorded'&&e.workspace_revision>=pairRevision&&e.payload.record_id===values.soa_record_id&&e.payload.decision_id===values.approval_decision_id&&e.payload.record_version===row.values.version);
    return event?clone(event):null;
  }
  const ownerNative=()=>({normalize,checkSnapshot,save,saveReference,saveAssessment,saveDocumentDraft,snapshotVersion});
  const requestSaved=(current,request,options={})=>I.requestSaved(current,request,options,ownerNative());
  const retainOwnerResponse=(current,response,options={})=>I.retainResponse(current,response,options,ownerNative());
  const reviewOwnerResponse=(current,token,responseId,choices={})=>I.review(normalize(current),token,responseId,choices);
  const applyOwnerAnswers=(current,envelope,options={})=>I.apply(current,envelope,options,ownerNative());
  const directOwnerAnswer=(current,input,options={})=>I.direct(current,input,options,ownerNative());
  const editOwnerAnswer=(current,input,options={})=>I.editSaved(current,input,options,ownerNative());
  const editOwnerAnswersBatch=(current,inputs,options={})=>I.editSavedBatch(current,inputs,options,ownerNative());
  function applyPreparedDocumentAnswers(current,command,options={}){
    current=normalize(current);const S=I.schema,D=S.documentProfiles;
    if(!plain(command)||!S.exact(command,['envelope','ordinary'])||command.envelope!==null&&!S.plain(command.envelope)||!Array.isArray(command.ordinary)||command.ordinary.length>3||command.envelope===null&&!command.ordinary.length)fail('Document Save needs the exact prepared section selections.');
    const ids=[...(command.envelope?[command.envelope.token]:[]),...command.ordinary.map(i=>i?.token)],q=current.owner_inputs?.requests.find(q=>q.token===ids[0]);
    if(!q||!S.isDocument(q)||ids.some(id=>id!==q.token))fail('Prepared document sections must belong to one exact saved form.');
    const ordinary=command.ordinary.map(i=>i?.field),selected=command.envelope?.selected_fields?.map(i=>i.field)||[];
    if(new Set(ordinary).size!==ordinary.length||ordinary.some(k=>selected.includes(k)))fail('Document correction and owner-answer selections must be distinct.');
    const previous=command.envelope&&current.owner_inputs.events.find(e=>e.operation_id===options.operationId);
    if(previous){
      // A mixed replay is qualified by the original owner operation and exact
      // ordinary native event. Current text alone is not a replay receipt.
      const replay=applyOwnerAnswers(current,command.envelope,options);
      if(!S.equal(replay,current)||previous.kind!=='answers-used'||!S.equal(previous.request_tokens,[q.token])||!S.equal(previous.response_ids,[command.envelope.response_id])||options.at!==undefined&&options.at!==previous.at)fail('This document Save identity belongs to different saved work.');
      const receipts=current.owner_inputs.receipts.filter(r=>r.operation_id===previous.operation_id);
      if(receipts.length!==selected.length||!S.equal(previous.receipt_ids,receipts.map(r=>r.receipt_id).sort())||command.envelope.selected_fields.some(f=>!receipts.some(r=>r.field===f.field&&r.token===q.token&&r.response_id===command.envelope.response_id&&r.raw===f.raw&&r.before===f.current&&r.proposal===f.proposal)))fail('This document replay differs from its exact owner selections.');
      if(!command.ordinary.length)return clone(current);
      const beforeContext=S.expectedDocumentContext(S.owner(current),q,previous.workspace_revision),pin=S.documentMeaningDigest({...q,subject_context:beforeContext}),afterContext=S.expectedDocumentContext(S.owner(current),q,previous.workspace_revision+1),row=D.currentRow(current,q.target,q.profile_id);
      for(const input of command.ordinary){if(!S.exact(input,['token','field','value','reviewedCurrent','meaning_digest'])||input.token!==q.token||!q.field_keys.includes(input.field)||input.meaning_digest!==pin||!current.owner_inputs.receipts.some(r=>r.root_token===S.rootToken(S.owner(current),q.token)&&r.field===input.field&&r.workspace_revision<previous.workspace_revision))fail('This document replay differs from its original ordinary corrections.');const typed=D.project(q,input.field,input.value,input.reviewedCurrent);if(!typed.eligible||typed.value!==input.value||row.values[input.field]!==input.value)fail('The saved document changed after this operation. Reopen its current wording.');}
      const changed=command.ordinary.filter(i=>i.value!==i.reviewedCurrent),proof=current.documents.history.find(e=>e.workspace_revision===previous.workspace_revision+1&&e.record_id===q.target.record_id),expectedBodyRevision=changed.length?proof?.document_revision:receipts[0].target_revision;
      if(changed.length){const synthetic=command.ordinary.map(i=>({field:i.field,before:i.reviewedCurrent,after:i.value,workspace_revision:previous.workspace_revision+1,target_revision:proof?.document_revision,at:previous.at}));D.proofUnion(proof,q,synthetic,afterContext);if(q.target.unit==='glossary_rows')afterContext.glossary.term=proof.changes[0].after.term;else for(const c of proof.capture_changes)afterContext.captures=afterContext.captures.filter(x=>x.target!==c.target);}
      if(row.revision!==expectedBodyRevision||D.eligibility(current,q.target,q.profile_id,q.field_keys)||S.documentMeaningDigest({...q,subject_context:D.subjectContext(current,q.target,q.profile_id,q.field_keys)},{live:true})!==S.documentMeaningDigest({...q,subject_context:afterContext}))fail('The saved document changed after this operation. Reopen its current wording.');
      return clone(current);
    }
    // Validate staged ordinary corrections against the pre-Save body before
    // the owner step can make a proved same-family term/capture transition.
    if(command.ordinary.length)editOwnerAnswersBatch(current,command.ordinary,options);
    let next=command.envelope?applyOwnerAnswers(current,command.envelope,options):current;
    if(command.ordinary.length){let inputs=command.ordinary;if(command.envelope&&next.revision!==current.revision){const fresh=D.subjectContext(next,q.target,q.profile_id,q.field_keys),pin=S.documentMeaningDigest({...q,subject_context:fresh},{live:true});inputs=command.ordinary.map(i=>({...i,meaning_digest:pin}));}next=editOwnerAnswersBatch(next,inputs,options);}
    return checkSnapshot(next);
  }
  const ownerFollowup=(current,token)=>I.followup(normalize(current),token);
  const ownerProgress=(current,token)=>I.progress(normalize(current),token);
  const ownerHistory=(current,options={})=>I.history(normalize(current),options);
  const registerDetails=R.details,registerIssuePin=R.pin,registerIssueStatus=R.issueStatus,registerIssueInspect=R.inspectIssue,registerManual=R.manual;
  const saveRegisterDetails=(current,input,{expectedRevision=current.revision,at=new Date().toISOString()}={})=>checkSnapshot(R.save(normalize(current),input,expectedRevision,at));
  const captureRegisterIssue=(current,p,{at=new Date().toISOString()}={})=>checkSnapshot(R.capture(normalize(current),p,at));
  const withdrawRegisterIssue=(current,sequence,reason,{expectedRevision=current.revision,at=new Date().toISOString()}={})=>checkSnapshot(R.withdraw(normalize(current),sequence,reason,expectedRevision,at));
  return Object.freeze({registerDetails,registerIssuePin,registerIssueStatus,registerIssueInspect,registerManual,saveRegisterDetails,captureRegisterIssue,withdrawRegisterIssue,workspaceId,snapshotVersion,referenceKindsByVersion,catalog:Object.freeze(catalog),keys:Object.freeze(keys),required:Object.freeze(required),blank,seed,validate,validDate,checkSnapshot,normalize,parseSnapshot,save,restore,activeRows,setDeleted,referenceRows,validateReference,saveReference,setReferenceDeleted,blankSoa,validateSoa,saveControlsSoa,saveAssessment,createAssessmentDraft,setAssessmentDeleted,saveDocumentDraft,createDocumentDraft,diagnose,proposal,proposalBlock,prepareSoa,soaOwnerBlock,soaCaptureBlock,saveSoaCapture,issueChecks,recordSoaIssue,currentSoaBasis,requestSaved,retainOwnerResponse,reviewOwnerResponse,applyOwnerAnswers,directOwnerAnswer,editOwnerAnswer,editOwnerAnswersBatch,applyPreparedDocumentAnswers,ownerFollowup,ownerProgress,ownerHistory,clone});
});
