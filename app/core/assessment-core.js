/* Native draft ownership, revisions and retained-content protection. No DOM or models. */
(function(root,factory){
  if(typeof module==='object'&&module.exports)module.exports=factory(require('./assessment-schema.js'));
  else root.OWLAssessmentCore=factory(root.OWLAssessmentSchema);
})(globalThis,function(S){
  'use strict';
  const clone=v=>JSON.parse(JSON.stringify(v));
  const plain=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
  const exact=(v,keys,optional=[])=>plain(v)&&keys.every(k=>Object.hasOwn(v,k))&&Object.keys(v).every(k=>keys.includes(k)||optional.includes(k));
  const retained=Object.freeze(['Approved','Issued','Completed','Superseded','Withdrawn','Expired','Retired']);
  const editable=Object.freeze(['Draft','Under review']);
  const inventoryFields=Object.freeze(['name','intended_purpose','business_process','organization_role','lifecycle_route','lifecycle_state','system_owner']);
  function fail(message,field='',code='assessment-invalid'){throw Object.assign(new Error(message),{field,code});}
  const integer=(n,min=0,max=Number.MAX_SAFE_INTEGER)=>Number.isSafeInteger(n)&&n>=min&&n<=max;
  const timestamp=v=>typeof v==='string'&&/^\d{4}-\d{2}-\d{2}T/.test(v)&&Number.isFinite(Date.parse(v));
  function validDate(v){if(typeof v!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(v))return false;const [y,m,d]=v.split('-').map(Number),days=[31,y%4===0&&(y%100!==0||y%400===0)?29:28,31,30,31,30,31,31,30,31,30,31];return y>=1&&m>=1&&m<=12&&d>=1&&d<=days[m-1];}
  function text(v,label,{id=false,required=false}={}){if(typeof v!=='string'||v.length>2000||/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(v))fail(`${label}: enter supported text of at most 2,000 characters.`);if(id&&(v!==v.trim()||/[\r\n\t]/.test(v)))fail(`${label}: enter the exact ID without surrounding whitespace or line breaks.`);if(required&&!v)fail(`Enter ${label} before saving.`);}
  function validateValues(unit,values,{previous,identity=true,choices=false}={}){
    if(!S.units.includes(unit)||!exact(values,S.fields[unit].map(f=>f.key)))fail('Assessment fields do not match the owning worksheet.');
    for(const f of S.fields[unit]){try{text(values[f.key],f.label,{id:['id','pointer'].includes(f.type),required:identity&&(f.type==='id')});}catch(e){e.field=f.key;throw e;}
      if(f.type==='date'&&values[f.key]&&!validDate(values[f.key]))fail(`${f.label}: use a real date in YYYY-MM-DD format.`,f.key);
      if(choices&&f.options&&values[f.key]&&values[f.key]!==previous?.[f.key]&&!f.options.includes(values[f.key]))fail(`${f.label}: choose one of the listed values.`,f.key);
    }return values;
  }
  const empty=()=>({entries:[],reserved_ids:[],history:[]});
  const find=(w,id)=>w.assessments?.entries.find(e=>e.record_id===id)||null;
  const rows=(e,unit,{deleted=false}={})=>S.tables.includes(unit)?e[unit].filter(r=>deleted?!!r.deleted_at:!r.deleted_at):[];
  const getUnit=(e,unit,id='')=>['summary','profile'].includes(unit)?e[unit]:e[unit]?.find(r=>r.values.id===id)||null;
  function parent(w,id,systemId){
    const r=w.references?.records.find(r=>r.values.id===id&&!r.deleted_at),system=w.systems.find(r=>r.values.system_id===systemId&&!r.deleted_at);
    if(!system)fail(`AI System ${systemId} is missing or deleted. Open AI Systems to repair it.`,'system_id','assessment-parent');
    if(!r||r.values.type!=='Assessment'||r.values.subject_type!=='AI system'||r.values.subject_id!==systemId)fail(`Record ${id} must be an active Assessment Record for AI System ${systemId}. Open Records to repair its type and subject.`,'assessment_record_id','assessment-parent');
    if(!editable.includes(r.values.lifecycle))fail(`Record ${id} is ${r.values.lifecycle||'missing its lifecycle'}. Native editing requires Draft or Under review; retained work needs a new Assessment Record.`,'assessment_record_id','assessment-read-only');
    return r;
  }
  function writable(w,e){if(e.read_only)fail(`Assessment ${e.record_id} is read-only: its owning Record was ${e.read_only.lifecycle}. Use a new Assessment Record for further work.`,'','assessment-read-only');if(e.deleted_at)fail(`Assessment ${e.record_id} is deleted. Restore it before editing.`);return parent(w,e.record_id,e.system_id);}
  function marker(m){if(m!==null&&(!exact(m,['record_revision','lifecycle','observed_at'])||!integer(m.record_revision,1)||!retained.includes(m.lifecycle)||!timestamp(m.observed_at)))fail('Assessment read-only marker is invalid.');}
  function checkCapture(c,e,workspaceRevision,unitValues){
    if(!exact(c,['unit','row_id','field','target_sheet','target_id','target_revision','values','captured_at'])||!S.units.includes(c.unit)||typeof c.row_id!=='string'||!integer(c.target_revision,0,workspaceRevision)||!timestamp(c.captured_at)||!plain(c.values))fail('Assessment source capture is invalid.');
    text(c.target_id,'Captured source ID',{id:true,required:true});
    if(['summary','profile'].includes(c.unit)?c.row_id!=='':!e.reservations[c.unit].includes(c.row_id))fail('Assessment capture address is not reserved in its owning unit.');
    if(c.field==='inventory'){if(c.unit!=='profile'||c.target_sheet!=='systems'||c.target_id!==e.system_id)fail('Inventory capture must refer to this system profile.');}
    else if(!S.fields[c.unit].some(f=>f.key===c.field&&f.type==='pointer'||f.key===c.field&&c.unit==='risks'&&f.key==='id'))fail('Assessment capture field is not a reference address.');
    if(!['systems','records','requirements','controls','risks','findings','actions'].includes(c.target_sheet))fail('Captured source sheet is unsupported.');
    for(const [key,value] of Object.entries(c.values)){text(key,'Captured source field');text(value,'Captured source value');}
    if(c.target_sheet==='systems'?c.values.system_id!==c.target_id:c.values.id!==c.target_id)fail('Captured source identity does not match its address.');
    if(c.field!=='inventory'){const values=unitValues||getUnit(e,c.unit,c.row_id)?.values||{},target=targets(c.unit,values).find(t=>t.field===c.field);if(!target||target.id!==c.target_id||target.sheet!==c.target_sheet)fail('Captured source type/identity does not match its owning pointer.');}
  }
  function checkEntry(e,revision){
    if(!exact(e,['record_id','system_id','revision','summary','profile',...S.tables,'reservations','captures','read_only'],['deleted_at'])||!integer(e.revision,1,revision))fail('Assessment entry has an invalid shape or revision.');
    text(e.record_id,'Assessment Record ID',{id:true,required:true});text(e.system_id,'AI System ID',{id:true,required:true});marker(e.read_only);
    if(e.read_only&&e.read_only.record_revision>revision)fail('Read-only observation cannot name a future Record revision.');
    if(e.deleted_at!==undefined&&!timestamp(e.deleted_at))fail('Assessment deletion timestamp is invalid.');
    if(!exact(e.reservations,S.tables)||!Array.isArray(e.captures))fail('Assessment reservations/captures are invalid.');
    for(const unit of S.units){
      const data=['summary','profile'].includes(unit)?[e[unit]]:e[unit];
      if(!Array.isArray(data)||data.length>500)fail(`${S.labels[unit]} exceeds its 500-row limit.`);
      const seen=new Set();
      if(S.tables.includes(unit)){const ids=e.reservations[unit];if(!Array.isArray(ids)||new Set(ids).size!==ids.length||ids.length>10000)fail('Assessment local identity history is invalid.');for(const id of ids)text(id,'Reserved local ID',{id:true,required:true});}
      for(const row of data){if(!exact(row,['revision','values'],S.tables.includes(unit)?['deleted_at']:[])||!integer(row.revision,S.tables.includes(unit)?1:0,e.revision))fail('Assessment unit revision is invalid.');validateValues(unit,row.values,{identity:unit!=='profile'});if(row.deleted_at!==undefined&&!timestamp(row.deleted_at))fail('Assessment row deletion timestamp is invalid.');if(S.tables.includes(unit)){const id=row.values.id;if(seen.has(id)||!e.reservations[unit].includes(id))fail('Duplicate or unreserved assessment local identity.');seen.add(id);}}
    }
    if(e.summary.values.assessment_record_id!==e.record_id||e.summary.values.system_id!==e.system_id)fail('Assessment index and Summary identities do not match.');
    const addresses=new Set();for(const c of e.captures){checkCapture(c,e,revision);const key=JSON.stringify([c.unit,c.row_id,c.field]);if(addresses.has(key))fail('Duplicate assessment capture address.');addresses.add(key);}
  }
  function check(container,revision){
    if(!exact(container,['entries','reserved_ids','history'])||!Array.isArray(container.entries)||container.entries.length>50||!Array.isArray(container.reserved_ids)||new Set(container.reserved_ids).size!==container.reserved_ids.length||!Array.isArray(container.history)||container.history.length>10000)fail('Assessment workspace structure or capacity is invalid.');
    for(const id of container.reserved_ids)text(id,'Reserved Assessment Record ID',{id:true,required:true});
    const seen=new Set();let count=0;for(const e of container.entries){checkEntry(e,revision);if(seen.has(e.record_id)||!container.reserved_ids.includes(e.record_id))fail('Duplicate or unreserved Assessment Record ID.');seen.add(e.record_id);count+=e.captures.length;}if(count>5000)fail('Assessment source capture limit of 5,000 was reached.');
    let previous=0;const perEntry=new Map();
    for(const h of container.history){
      if(!exact(h,['workspace_revision','entry_revision','record_id','unit','row_id','action','at','before','after'])||!integer(h.workspace_revision,1,revision)||h.workspace_revision<previous||!integer(h.entry_revision,1)||!container.reserved_ids.includes(h.record_id)||!['assessment',...S.units].includes(h.unit)||!['create','edit','delete','restore-row','lock','capture'].includes(h.action)||!timestamp(h.at))fail('Assessment history is invalid.');previous=h.workspace_revision;
      const e=container.entries.find(e=>e.record_id===h.record_id);if(e&&h.entry_revision>e.revision||h.entry_revision<=(perEntry.get(h.record_id)||0))fail('Assessment history entry revisions are invalid.');perEntry.set(h.record_id,h.entry_revision);
      text(h.row_id,'History row ID',{id:true});
      if(h.unit!=='assessment'){
        if(S.tables.includes(h.unit)&&(!e||!e.reservations[h.unit].includes(h.row_id)))fail('Assessment history row identity is invalid.');
        for(const payload of [h.before,h.after])if(payload!==null){if(!exact(payload,['values','captures','deleted_at'])||!Array.isArray(payload.captures))fail('Assessment history payload is invalid.');validateValues(h.unit,payload.values,{identity:h.unit!=='profile'});if(S.tables.includes(h.unit)&&payload.values.id!==h.row_id||h.unit==='summary'&&(payload.values.assessment_record_id!==h.record_id||e&&payload.values.system_id!==e.system_id))fail('Historical assessment identity does not match its address.');if(payload.deleted_at!==null&&!timestamp(payload.deleted_at))fail('Assessment historical deletion is invalid.');for(const c of payload.captures)checkCapture(c,e,revision,payload.values);}
      }else{for(const p of [h.before,h.after])if(p!==null){if(!exact(p,['deleted_at','read_only']))fail('Assessment lifecycle history is invalid.');if(p.deleted_at!==null&&!timestamp(p.deleted_at))fail('Assessment lifecycle date is invalid.');marker(p.read_only);}}
    }return container;
  }
  function entryBlank(recordId,systemId){return {record_id:recordId,system_id:systemId,revision:0,summary:{revision:0,values:{...S.blank('summary'),assessment_record_id:recordId,system_id:systemId}},profile:{revision:0,values:S.blank('profile')},...Object.fromEntries(S.tables.map(u=>[u,[]])),reservations:Object.fromEntries(S.tables.map(u=>[u,[]])),captures:[],read_only:null};}
  function targets(unit,v){
    const out=[];const add=(field,sheet)=>{if(v[field])out.push({field,sheet,id:v[field]});};
    if(unit==='summary'){add('baseline_record_id','records');add('method_record_id','records');}
    if(unit==='review'){const sheet={Requirement:'requirements',Control:'controls','Procedure or method':'records'}[v.criterion_type];if(sheet)add('criterion_id',sheet);add('finding_id','findings');add('action_id','actions');}
    if(unit==='impacts')add('risk_id','risks');if(unit==='risks')add('id','risks');if(unit==='evidence')add('record_id','records');return out;
  }
  function savedTarget(w,sheet,id){return sheet==='systems'?w.systems.find(r=>r.values.system_id===id&&!r.deleted_at):w.references?.[sheet]?.find(r=>r.values.id===id&&!r.deleted_at);}
  function captured(w,e,unit,rowId,values,before,requests=[],at){
    const old=e.captures.filter(c=>c.unit===unit&&c.row_id===rowId),result=clone(old);
    const refs=targets(unit,values);
    for(const f of S.fields[unit])if(f.type==='pointer'||unit==='risks'&&f.key==='id'){
      const target=refs.find(t=>t.field===f.key),existing=result.find(c=>c.field===f.key),request=requests.find(q=>q.field===f.key);
      const previousTarget=targets(unit,before||{}).find(t=>t.field===f.key);
      const changed=before?.[f.key]!==values[f.key]||previousTarget?.sheet!==target?.sheet||existing&&target&&(existing.target_sheet!==target.sheet||existing.target_id!==target.id);
      if(!changed&&!request)continue;
      const index=result.findIndex(c=>c.field===f.key);if(index>=0)result.splice(index,1);
      if(!target)continue;
      const row=savedTarget(w,target.sheet,target.id);if(request&&(!row||row.revision!==request.expectedRevision))fail(`Source ${target.id} changed after selection. Reselect or capture its current metadata before saving.`,f.key,'assessment-source-conflict');
      if(row)result.push({unit,row_id:rowId,field:f.key,target_sheet:target.sheet,target_id:target.id,target_revision:row.revision,values:clone(row.values),captured_at:at});
    }
    const inventory=requests.find(q=>q.field==='inventory');
    if(inventory){if(unit!=='profile')fail('Inventory capture belongs to the profile.');const row=savedTarget(w,'systems',e.system_id);if(!row||row.revision!==inventory.expectedRevision)fail(`AI System ${e.system_id} changed after the inventory comparison. Capture it again.`,'name','assessment-source-conflict');for(const key of inventory.fields){if(!inventoryFields.includes(key)||values[key]!==row.values[key])fail('Selected inventory facts no longer match the saved comparison.',key);}
      const index=result.findIndex(c=>c.field==='inventory');if(index>=0)result.splice(index,1);result.push({unit,row_id:'',field:'inventory',target_sheet:'systems',target_id:e.system_id,target_revision:row.revision,values:clone(row.values),captured_at:at});}
    return result;
  }
  function payload(e,unit,rowId){const r=getUnit(e,unit,rowId);return r?{values:clone(r.values),captures:clone(e.captures.filter(c=>c.unit===unit&&c.row_id===rowId)),deleted_at:r.deleted_at||null}:null;}
  function event(w,e,unit,rowId,action,before,after,at){w.assessments.history.push({workspace_revision:w.revision,entry_revision:e.revision,record_id:e.record_id,unit,row_id:rowId,action,at,before,after});}
  function save(w,recordId,unit,values,{baseEntryRevision=0,baseUnitRevision=0,rowId=null,captureRequests=[],at=new Date().toISOString()}={}){
    if(!S.units.includes(unit))fail('Choose an assessment worksheet.');
    let existing=find(w,recordId);if(!existing){if(unit!=='summary'||baseEntryRevision!==0)fail('Save Summary to create this assessment first.');if(w.assessments.reserved_ids.includes(recordId))fail('That Assessment Record ID was previously used. Open its saved draft.','assessment_record_id');if(values.assessment_record_id!==recordId)fail('Summary Assessment Record ID does not match.','assessment_record_id');parent(w,recordId,values.system_id);}
    else{writable(w,existing);if(existing.revision!==baseEntryRevision)fail(`Assessment ${recordId} changed: opened entry revision ${baseEntryRevision}; saved revision ${existing.revision}. Reopen before saving.`,'','assessment-conflict');}
    const original=existing||entryBlank(recordId,values.system_id),old=getUnit(original,unit,rowId||'');
    if(old?.deleted_at)fail('This assessment row is deleted. Restore it before editing.');
    if((old?.revision||0)!==baseUnitRevision)fail(`${S.labels[unit]} ${rowId||recordId} changed: opened unit revision ${baseUnitRevision}; saved revision ${old?.revision||0}.`,'','assessment-conflict');
    validateValues(unit,values,{previous:old?.values,choices:true});
    if(unit==='summary'&&(values.assessment_record_id!==original.record_id||values.system_id!==original.system_id))fail('Saved assessment identities cannot be changed.','assessment_record_id');
    if(S.tables.includes(unit)){if(rowId!==null&&(!old||values.id!==rowId))fail('Saved local identity cannot be changed.','id');if(!old&&original.reservations[unit].includes(values.id))fail('That local ID already exists or was previously used in this assessment sheet.','id');}
    const id=S.tables.includes(unit)?values.id:'',caps=captured(w,original,unit,id,values,old?.values,captureRequests,at),before=existing?payload(original,unit,id):null;
    const after={values:clone(values),captures:caps,deleted_at:null};
    if(existing&&JSON.stringify(before)===JSON.stringify(after))return clone(w);
    const next=clone(w),e=find(next,recordId)||entryBlank(recordId,values.system_id);if(!existing){next.assessments.entries.push(e);next.assessments.reserved_ids.push(recordId);}next.revision++;e.revision++;
    const saved={revision:(old?.revision||0)+1,values:clone(values)};
    if(['summary','profile'].includes(unit))e[unit]=saved;else if(old)e[unit][e[unit].findIndex(r=>r.values.id===id)]=saved;else{e[unit].push(saved);e.reservations[unit].push(id);}
    const oldCaps=e.captures.filter(c=>c.unit===unit&&c.row_id===id);
    if(JSON.stringify(oldCaps)!==JSON.stringify(caps)){
      e.captures=e.captures.map(c=>c.unit===unit&&c.row_id===id?caps.find(n=>n.field===c.field)||null:c).filter(Boolean);
      for(const c of caps)if(!e.captures.some(n=>n.unit===unit&&n.row_id===id&&n.field===c.field))e.captures.push(c);
    }
    event(next,e,unit,id,!existing||!old?'create':(JSON.stringify(old.values)===JSON.stringify(values)?'capture':'edit'),before,after,at);check(next.assessments,next.revision);return next;
  }
  function setDeleted(w,recordId,unit,rowId,{baseEntryRevision,baseUnitRevision,deleted,at=new Date().toISOString()}={}){
    const e=find(w,recordId);if(!e)fail('The assessment is unavailable.');if(e.read_only)writable(w,e);parent(w,e.record_id,e.system_id);if(e.revision!==baseEntryRevision)fail('The assessment changed. Reopen before deleting or restoring.','','assessment-conflict');if(typeof deleted!=='boolean')fail('Choose delete or restore.');
    const r=unit==='assessment'?e:getUnit(e,unit,rowId);if(!r||unit!=='assessment'&&!S.tables.includes(unit))fail('Choose an assessment or a local table row.');if(unit!=='assessment'&&r.revision!==baseUnitRevision)fail('The local row changed. Reopen it.','','assessment-conflict');if(!!r.deleted_at===deleted)fail('This item already has that deletion state.');if(e.deleted_at&&unit!=='assessment')fail('Restore the assessment first.');
    const before=unit==='assessment'?{deleted_at:e.deleted_at||null,read_only:clone(e.read_only)}:payload(e,unit,rowId),next=clone(w),entry=find(next,recordId),target=unit==='assessment'?entry:getUnit(entry,unit,rowId);next.revision++;entry.revision++;if(unit!=='assessment')target.revision++;if(deleted)target.deleted_at=at;else delete target.deleted_at;
    const after=unit==='assessment'?{deleted_at:entry.deleted_at||null,read_only:clone(entry.read_only)}:payload(entry,unit,rowId);event(next,entry,unit,rowId||'',deleted?'delete':'restore-row',before,after,at);return next;
  }
  function freezeForRecord(w,record,at){
    const e=find(w,record.values.id);if(!e||e.read_only||!retained.includes(record.values.lifecycle))return;
    const before={deleted_at:e.deleted_at||null,read_only:null};e.revision++;e.read_only={record_revision:record.revision,lifecycle:record.values.lifecycle,observed_at:at};event(w,e,'assessment','','lock',before,{deleted_at:e.deleted_at||null,read_only:clone(e.read_only)},at);
  }
  function canonical(e){return {summary:e.summary.values,profile:e.profile.values,...Object.fromEntries(S.tables.map(u=>[u,e[u].map(r=>({values:r.values,deleted_at:r.deleted_at||null}))])),deleted_at:e.deleted_at||null,reservations:e.reservations,captures:e.captures};}
  function restore(current,next){
    for(const e of current.assessments.entries){const restored=find(next,e.record_id);if(e.read_only){const history=current.assessments.history.filter(h=>h.record_id===e.record_id),incoming=next.assessments.history.filter(h=>h.record_id===e.record_id);if(!restored||JSON.stringify(canonical(e))!==JSON.stringify(canonical(restored))||JSON.stringify(history)!==JSON.stringify(incoming))fail(`Backup would replace or remove read-only Assessment ${e.record_id}. Choose a compatible matching backup.`,'','assessment-read-only');Object.assign(restored,clone(e));}
      if(restored)for(const u of S.tables)restored.reservations[u]=Array.from(new Set([...e.reservations[u],...restored.reservations[u]]));
    }
    // An omitted draft's global ID stays reserved; it cannot be recreated under that ID.
    next.assessments.history.sort((a,b)=>a.workspace_revision-b.workspace_revision);next.assessments.reserved_ids=Array.from(new Set([...current.assessments.reserved_ids,...next.assessments.reserved_ids]));return next;
  }
  return Object.freeze({clone,empty,find,rows,getUnit,parent,writable,retained,editable,inventoryFields,validDate,validateValues,check,entryBlank,targets,savedTarget,save,setDeleted,freezeForRecord,canonical,restore});
});
