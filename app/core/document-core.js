/* Native Manual ownership and retained snapshots. Pure document operations; no storage/DOM/model calls. */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('./document-schema.js'),require('./reference-schema.js'),require('./policy-document-body.js'),require('./document-template-registry.js'),require('./risk-document-body.js'),require('./lifecycle-document-body.js'),require('./assurance-document-body.js'));else root.OWLDocumentCore=factory(root.OWLDocumentSchema,root.OWLReferenceSchema,root.OWLPolicyDocumentBody,root.OWLDocumentTemplateRegistry,root.OWLRiskDocumentBody,root.OWLLifecycleDocumentBody,root.OWLAssuranceDocumentBody);})(globalThis,function(S,R,P,T,K,L,A){
  'use strict';
  const clone=value=>JSON.parse(JSON.stringify(value));
  const plain=value=>value!==null&&typeof value==='object'&&!Array.isArray(value);
  const exact=(value,keys,optional=[])=>plain(value)&&keys.every(key=>Object.hasOwn(value,key))&&Object.keys(value).every(key=>keys.includes(key)||optional.includes(key));
  const same=(a,b)=>{if(a===b)return true;if(Array.isArray(a)||Array.isArray(b))return Array.isArray(a)&&Array.isArray(b)&&a.length===b.length&&a.every((v,i)=>same(v,b[i]));if(!plain(a)||!plain(b))return false;const keys=Object.keys(a);return keys.length===Object.keys(b).length&&keys.every(key=>Object.hasOwn(b,key)&&same(a[key],b[key]));};
  const integer=(n,min=0,max=Number.MAX_SAFE_INTEGER)=>Number.isSafeInteger(n)&&n>=min&&n<=max;
  const fail=(message,field='',code='document-invalid')=>{throw Object.assign(new Error(message),{field,code});};
  const empty=()=>({entries:[],reserved_document_ids:[],reserved_record_ids:[],reservations:[],history:[]});
  const find=(workspace,id)=>workspace.documents?.entries.find(entry=>entry.record_id===id)||null;
  const normalizeText=value=>typeof value==='string'?value.replace(/\r\n?/g,'\n'):value;
  const bytes=value=>new TextEncoder().encode(JSON.stringify(value)).length;
  function validDate(value){if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;const [y,m,d]=value.split('-').map(Number),days=[31,y%4===0&&(y%100!==0||y%400===0)?29:28,31,30,31,30,31,31,30,31,30,31];return y>=1&&m>=1&&m<=12&&d>=1&&d<=days[m-1];}
  function timestamp(value){return typeof value==='string'&&/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/.test(value)&&validDate(value.slice(0,10))&&Number.isFinite(Date.parse(value))&&new Date(value).toISOString().slice(0,19)===value.slice(0,19);}
  function text(value,field,{id=false,required=false,narrative=false}={}){
    const max=narrative?S.limits.narrative:S.limits.scalar;
    if(typeof value!=='string'||value.length>max||/[\u0000-\u0008\u000b\u000c\u000e-\u001f\ufffe\uffff]/.test(value))fail(`${field}: enter supported text of at most ${max.toLocaleString('en-US')} characters.`,field);
    for(let i=0;i<value.length;i++){const n=value.charCodeAt(i);if(n>=0xd800&&n<=0xdbff){const low=value.charCodeAt(++i);if(!(low>=0xdc00&&low<=0xdfff))fail(`${field}: text contains an incomplete Unicode character.`,field);}else if(n>=0xdc00&&n<=0xdfff)fail(`${field}: text contains an incomplete Unicode character.`,field);}
    if(id&&(value!==value.trim()||/[\r\n\t]/.test(value)))fail(`${field}: use the exact ID without surrounding whitespace or line breaks.`,field);
    if(required&&!value.trim())fail(`Enter ${field} before saving.`,field);
    return value;
  }
  function utc(value,field){if(!timestamp(value))fail(`${field}: use a valid stored UTC timestamp.`,field);}
  function token(value,prefix,field){if(typeof value!=='string'||!new RegExp('^'+prefix+'[1-9]\\d*$').test(value)||!integer(Number(value.slice(1)),1))fail(`${field}: invalid internal identity.`,field);}
  const legacyV9=(function(S,R){
  const clone=value=>JSON.parse(JSON.stringify(value));
  const plain=value=>value!==null&&typeof value==='object'&&!Array.isArray(value);
  const exact=(value,keys,optional=[])=>plain(value)&&keys.every(key=>Object.hasOwn(value,key))&&Object.keys(value).every(key=>keys.includes(key)||optional.includes(key));
  const same=(a,b)=>{if(a===b)return true;if(Array.isArray(a)||Array.isArray(b))return Array.isArray(a)&&Array.isArray(b)&&a.length===b.length&&a.every((v,i)=>same(v,b[i]));if(!plain(a)||!plain(b))return false;const keys=Object.keys(a);return keys.length===Object.keys(b).length&&keys.every(key=>Object.hasOwn(b,key)&&same(a[key],b[key]));};
  const integer=(n,min=0,max=Number.MAX_SAFE_INTEGER)=>Number.isSafeInteger(n)&&n>=min&&n<=max;
  const fail=(message,field='',code='document-invalid')=>{throw Object.assign(new Error(message),{field,code});};
  const empty=()=>({entries:[],reserved_document_ids:[],reserved_record_ids:[],reservations:[],history:[]});
  const find=(workspace,id)=>workspace.documents?.entries.find(entry=>entry.record_id===id)||null;
  const normalizeText=value=>typeof value==='string'?value.replace(/\r\n?/g,'\n'):value;
  const bytes=value=>new TextEncoder().encode(JSON.stringify(value)).length;
  function validDate(value){if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;const [y,m,d]=value.split('-').map(Number),days=[31,y%4===0&&(y%100!==0||y%400===0)?29:28,31,30,31,30,31,31,30,31,30,31];return y>=1&&m>=1&&m<=12&&d>=1&&d<=days[m-1];}
  function timestamp(value){return typeof value==='string'&&/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/.test(value)&&validDate(value.slice(0,10))&&Number.isFinite(Date.parse(value))&&new Date(value).toISOString().slice(0,19)===value.slice(0,19);}
  function text(value,field,{id=false,required=false,narrative=false}={}){
    const max=narrative?S.limits.narrative:S.limits.scalar;
    if(typeof value!=='string'||value.length>max||/[\u0000-\u0008\u000b\u000c\u000e-\u001f\ufffe\uffff]/.test(value))fail(`${field}: enter supported text of at most ${max.toLocaleString('en-US')} characters.`,field);
    for(let i=0;i<value.length;i++){const n=value.charCodeAt(i);if(n>=0xd800&&n<=0xdbff){const low=value.charCodeAt(++i);if(!(low>=0xdc00&&low<=0xdfff))fail(`${field}: text contains an incomplete Unicode character.`,field);}else if(n>=0xdc00&&n<=0xdfff)fail(`${field}: text contains an incomplete Unicode character.`,field);}
    if(id&&(value!==value.trim()||/[\r\n\t]/.test(value)))fail(`${field}: use the exact ID without surrounding whitespace or line breaks.`,field);
    if(required&&!value.trim())fail(`Enter ${field} before saving.`,field);
    return value;
  }
  function utc(value,field){if(!timestamp(value))fail(`${field}: use a valid stored UTC timestamp.`,field);}
  function token(value,prefix,field){if(typeof value!=='string'||!new RegExp('^'+prefix+'[1-9]\\d*$').test(value)||!integer(Number(value.slice(1)),1))fail(`${field}: invalid internal identity.`,field);}
  function template(value){if(!exact(value,['id','sha256','catalog_sha256'])||Object.keys(S.template).some(key=>value[key]!==S.template[key]))fail('The Manual template/catalog pin does not match the reviewed D-255 source.','template','document-template');}
  function targetValue(entry,target){if(S.valueTargets.includes(target))return entry.values[target];if(S.artifactTargets.includes(target))return entry.artifact_refs[target];if(target==='T26R9C4')return entry.repositories.control_document_record_id;fail('Unknown Manual capture target.',target);}
  function checkSource(source,workspaceRevision){
    if(!exact(source,['kind','id','revision','values'])||!Object.hasOwn(S.sourceFields,source.kind)||!integer(source.revision,1,workspaceRevision)||!exact(source.values,S.sourceFields[source.kind]))fail('Manual captured source has an invalid shape or revision.','captures');
    text(source.id,'Captured source ID',{id:true,required:true});
    for(const [key,value] of Object.entries(source.values)){
      if(source.kind==='people'&&key==='role_ids'){if(!Array.isArray(value)||new Set(value).size!==value.length)fail('Captured person roles are invalid.','captures');value.forEach(id=>text(id,'Captured role ID',{id:true,required:true}));}
      else{text(value,'Captured '+key,{id:['basis_record_id','source_record_id','origin_context_id','supersedes','subject_id'].includes(key)});if(['last_reviewed','next_review','effective_date'].includes(key)&&value&&!validDate(value))fail(`Captured ${key}: use a real date.`,'captures');}
    }
  }
  function checkCapture(capture,workspaceRevision,{pending=false}={}){
    if(!exact(capture,['id','target','kind','at','applied_value','sources'],pending?['client_key']:[])||!Object.hasOwn(S.captureKinds,capture.target)||S.captureKinds[capture.target]!==capture.kind||!Array.isArray(capture.sources)||!capture.sources.length||capture.sources.length>S.limits.sources)fail('Manual source capture has an invalid target or shape.','captures');
    if(pending&&capture.id===null){text(capture.client_key,'Pending capture key',{id:true,required:true});if(['__proto__','constructor','prototype'].includes(capture.client_key))fail('Unsupported pending capture key.','captures');}else token(capture.id,'c','Capture ID');
    utc(capture.at,'Capture time');text(capture.applied_value,capture.target,{id:S.artifactTargets.includes(capture.target)||capture.target==='T26R9C4',narrative:S.narrativeTargets.includes(capture.target)});
    const allowed={role:['roles','people'],context:['context'],requirement:['requirements'],record:['records']}[capture.kind],seen=new Set();
    for(const source of capture.sources){checkSource(source,workspaceRevision);const key=source.kind+':'+source.id;if(!allowed.includes(source.kind)||seen.has(key))fail('Manual capture contains a duplicate or wrong source kind.',capture.target);seen.add(key);}
    if((capture.target==='T9R2C1'||capture.kind==='record')&&capture.sources.length!==1)fail('This Manual input needs exactly one owning source.',capture.target);
    if(capture.kind==='record'&&capture.applied_value!==capture.sources[0].id)fail('Artifact capture does not match the exact entered Record ID.',capture.target);
    if(capture.kind==='role'){
      const roles=capture.sources.filter(source=>source.kind==='roles'),people=capture.sources.filter(source=>source.kind==='people');if(!roles.length)fail('Select the recorded role before adding a coordination person.',capture.target);
      if(S.roleTargets.includes(capture.target)&&(roles.length!==1||capture.applied_value!==roles[0].values.name))fail('Maintenance/reviewer input must contain the selected role alone, with contact details separate.',capture.target);
      for(const person of people)if(!roles.some(role=>person.values.role_ids.includes(role.id)))fail('The captured person did not hold the captured role.',capture.target);
    }
  }
  function checkRow(row,kind,{pending=false}={}){
    const columns=kind==='history_rows'?S.historyColumns:S.glossaryColumns;
    if(!exact(row,['row_id',...columns],pending?['client_key']:[]))fail('Manual local row has unsupported columns.',kind);
    if(pending&&row.row_id===null){text(row.client_key,'Pending row key',{id:true,required:true});if(['__proto__','constructor','prototype'].includes(row.client_key))fail('Unsupported pending row key.',kind);}else token(row.row_id,'r','Row ID');
    for(const column of columns){text(row[column],kind+'.'+(row.row_id||row.client_key)+'.'+column);if(column==='date'&&row[column]&&!validDate(row[column]))fail('Revision Date: use a real date in YYYY-MM-DD format.',kind+'.'+(row.row_id||row.client_key)+'.date');}
  }
  const authorKeys=['record_id','document_id','template','values','review','artifact_refs','repositories','history_rows','glossary_rows','capture_bindings','captures'];
  const entryKeys=[...authorKeys,'revision','created_at','updated_at','read_only'];
  const authoring=entry=>Object.fromEntries(authorKeys.map(key=>[key,clone(entry[key])]));
  function checkAuthor(entry,workspaceRevision,{pending=false}={}){
    for(const field of ['record_id','document_id'])text(entry[field],field,{id:true,required:true});template(entry.template);
    if(!exact(entry.values,S.valueTargets)||!exact(entry.review,['date','interval','triggers'])||!exact(entry.artifact_refs,S.artifactTargets)||!exact(entry.repositories,['locations','control_document_record_id'])||!exact(entry.capture_bindings,S.captureTargets))fail('Manual input ownership does not match the source catalog.','values');
    for(const [target,value] of Object.entries(entry.values))text(value,target,{narrative:S.narrativeTargets.includes(target)});
    for(const [field,value] of Object.entries(entry.review))text(value,'review.'+field);if(entry.review.date&&!validDate(entry.review.date))fail('Review date: use a real date in YYYY-MM-DD format.','review.date');
    for(const [target,value] of Object.entries(entry.artifact_refs))text(value,target,{id:true});text(entry.repositories.locations,'repositories.locations');text(entry.repositories.control_document_record_id,'repositories.control_document_record_id',{id:true});
    const rowIds=new Set(),clientRows=new Set();
    for(const [kind,max] of [['history_rows',S.limits.historyRows],['glossary_rows',S.limits.glossaryRows]]){
      if(!Array.isArray(entry[kind])||entry[kind].length>max)fail(`Manual ${kind} supports at most ${max} active rows.`,kind);
      for(const row of entry[kind]){checkRow(row,kind,{pending});const key=row.row_id||row.client_key;if(rowIds.has(key)||row.row_id===null&&clientRows.has(row.client_key))fail('Manual local row identities must be distinct across both tables.',kind);rowIds.add(key);if(row.row_id===null)clientRows.add(row.client_key);}
    }
    if(!Array.isArray(entry.captures)||entry.captures.length>S.captureTargets.length)fail('Manual capture list is invalid.','captures');const capIds=new Set(),targets=new Set();
    for(const capture of entry.captures){checkCapture(capture,workspaceRevision,{pending});const id=capture.id||capture.client_key;if(capIds.has(id)||targets.has(capture.target)||entry.capture_bindings[capture.target]!==id||targetValue(entry,capture.target)!==capture.applied_value)fail('Manual capture/binding does not match its exact applied input.',capture.target);capIds.add(id);targets.add(capture.target);}
    for(const [target,id] of Object.entries(entry.capture_bindings)){if(typeof id!=='string'||id&&!entry.captures.some(c=>c.target===target&&(c.id||c.client_key)===id))fail('Manual input has an orphan capture binding.',target);if(id&&!pending)token(id,'c','Capture binding');}
    if(bytes(authoring(entry))>S.limits.authoringBytes)fail('The Manual authoring content exceeds the 256 KiB limit. Keep the saved copy and shorten this draft.','values','document-capacity');
    return entry;
  }
  function checkMarker(marker,workspaceRevision){
    if(marker===null)return;
    if(!exact(marker,['record_revision','lifecycle','observed_at','record_values'])||!integer(marker.record_revision,1,workspaceRevision)||!S.retained.includes(marker.lifecycle)||!plain(marker.record_values))fail('Manual read-only marker is invalid.','read_only');utc(marker.observed_at,'Freeze time');R.validate('records',marker.record_values,{validDate});for(const [key,value] of Object.entries(marker.record_values))text(value,'Frozen Record '+key,{id:['id','subject_id','supersedes'].includes(key)});if(marker.record_values.lifecycle!==marker.lifecycle)fail('Frozen Manual lifecycle and Record snapshot differ.','read_only');
  }
  function checkEntry(entry,workspaceRevision,reservation){
    if(!exact(entry,entryKeys)||!integer(entry.revision,1,workspaceRevision))fail('Native Manual entry shape or revision is invalid.');checkAuthor(entry,workspaceRevision);utc(entry.created_at,'Document creation time');utc(entry.updated_at,'Document Save time');if(Date.parse(entry.updated_at)<Date.parse(entry.created_at))fail('Document Save time precedes creation.');checkMarker(entry.read_only,workspaceRevision);
    if(entry.read_only&&entry.read_only.record_values.id!==entry.record_id)fail('Frozen Record snapshot has a different owning Record ID.','read_only');
    if(!reservation||reservation.record_id!==entry.record_id||reservation.document_id!==entry.document_id||entry.revision>reservation.last_document_revision)fail('Manual body lacks its exact reserved identity/revision.');
    for(const row of [...entry.history_rows,...entry.glossary_rows])if(!reservation.rows.ids.includes(row.row_id))fail('Manual local row identity is not reserved.');for(const capture of entry.captures)if(!reservation.captures.ids.includes(capture.id))fail('Manual capture identity is not reserved.');return entry;
  }
  function checkReservation(reservation,workspaceRevision){
    if(!exact(reservation,['record_id','document_id','last_document_revision','rows','captures'])||!integer(reservation.last_document_revision,1,workspaceRevision))fail('Manual durable reservation shape/revision is invalid.');text(reservation.record_id,'Reserved Record ID',{id:true,required:true});text(reservation.document_id,'Reserved Document ID',{id:true,required:true});
    for(const [kind,prefix] of [['rows','r'],['captures','c']]){const r=reservation[kind];if(!exact(r,['next_id','ids'])||!integer(r.next_id,1)||!Array.isArray(r.ids)||new Set(r.ids).size!==r.ids.length)fail('Manual internal identity reservations are invalid.');for(const id of r.ids){token(id,prefix,'Reserved '+kind+' ID');if(Number(id.slice(1))>=r.next_id)fail('Manual reservation counter would reuse an internal identity.');}}
  }
  function pathKey(path){return JSON.stringify(path);}
  function checkChange(change,event,workspaceRevision,reservation){
    if(!exact(change,['path','before','after'])||!Array.isArray(change.path)||same(change.before,change.after))fail('Manual history change is malformed or empty.');const [group,key]=change.path;
    if(change.path.length===2&&['values','review','artifact_refs','repositories'].includes(group)){
      const allowed={values:S.valueTargets,review:['date','interval','triggers'],artifact_refs:S.artifactTargets,repositories:['locations','control_document_record_id']}[group];if(!allowed.includes(key))fail('Manual history path is not an owning field.');
      for(const value of [change.before,change.after]){text(value,group+'.'+key,{id:group==='artifact_refs'||group==='repositories'&&key==='control_document_record_id',narrative:group==='values'&&S.narrativeTargets.includes(key)});if(group==='review'&&key==='date'&&value&&!validDate(value))fail('Manual history review date is invalid.');}
    }else if(change.path.length===2&&['history_rows','glossary_rows'].includes(group)){
      token(key,'r','Historical row ID');if(!reservation.rows.ids.includes(key))fail('Manual history row identity is not reserved.');for(const row of [change.before,change.after])if(row!==null){checkRow(row,group);if(row.row_id!==key)fail('Manual history row changed its stable identity.');}
    }else if(change.path.length===1&&['history_order','glossary_order'].includes(group)){
      for(const ids of [change.before,change.after]){if(!Array.isArray(ids)||new Set(ids).size!==ids.length||ids.length>100)fail('Manual history row ordering is invalid.');for(const id of ids)if(!reservation.rows.ids.includes(id))fail('Manual history ordering has an unreserved identity.');}
    }else if(change.path.length===1&&group==='read_only'){checkMarker(change.before,workspaceRevision);checkMarker(change.after,workspaceRevision);if(change.before!==null&&change.after===null)fail('A frozen Manual cannot thaw.');}
    else if(change.path.length===1&&group==='entry'&&['create','restore'].includes(event.action)){
      if(change.before!==null&&change.after!==null)fail('Whole-entry history is reserved for creation or restored presence changes.','history');
      for(const value of [change.before,change.after])if(value!==null){checkEntry(value,workspaceRevision,reservation);if(value.record_id!==event.record_id||value.document_id!==event.document_id)fail('Manual history entry changed its identity.');}
    }else fail('Unsupported Manual history path.');
  }
  function replayHistory(documents,{verifyCurrent=true}={}){
    const states=new Map();
    for(const event of documents.history){
      const before=states.get(event.record_id)||null,presence=event.changes.find(change=>change.path[0]==='entry');let after=before&&clone(before);
      if(presence){
        if(event.changes.length!==1||!same(presence.before,before))fail('Manual entry history does not agree with its exact prior snapshot.','history');
        if(event.action==='create'&&(presence.before!==null||presence.after===null||event.document_revision!==1))fail('Manual creation history is not an exact first saved body.','history');
        after=clone(presence.after);if(after!==null&&(after.revision!==event.document_revision||after.updated_at!==event.at))fail('Restored/created Manual snapshot has the wrong event revision/time.','history');
      }else{
        if(!before)fail('Manual edit/freeze history has no prior saved body.','history');
        const orders=[];
        for(const change of event.changes){const [group,key]=change.path;
          if(['history_order','glossary_order'].includes(group)){orders.push(change);continue;}
          if(['history_rows','glossary_rows'].includes(group)){
            const previous=before[group].find(row=>row.row_id===key)||null;if(!same(previous,change.before))fail('Manual row history does not match its prior saved row.','history');const index=after[group].findIndex(row=>row.row_id===key);if(index>=0)after[group].splice(index,1,...(change.after===null?[]:[clone(change.after)]));else if(change.after!==null)after[group].push(clone(change.after));
          }else if(group==='read_only'){if(!same(before.read_only,change.before))fail('Manual freeze history does not match its prior marker.','history');after.read_only=clone(change.after);}
          else{if(!same(before[group][key],change.before))fail('Manual field history does not match its prior saved value.','history');after[group][key]=clone(change.after);}
        }
        for(const change of orders){const kind=change.path[0]==='history_order'?'history_rows':'glossary_rows';if(!same(before[kind].map(row=>row.row_id),change.before)||change.after.length!==after[kind].length||change.after.some(id=>!after[kind].some(row=>row.row_id===id)))fail('Manual history ordering disagrees with its actual saved rows.','history');after[kind]=change.after.map(id=>after[kind].find(row=>row.row_id===id));}
        after.revision=event.document_revision;after.updated_at=event.at;
      }
      for(const target of S.captureTargets){
        const a=before?.captures.find(c=>c.target===target)||null,change=event.capture_changes.find(c=>c.target===target);
        if(change&&!same(change.before,a))fail('Manual capture history does not match its exact prior binding.','history');
        if(presence){const b=after?.captures.find(c=>c.target===target)||null;if(!same(a,b)&&(!change||!same(change.after,b))||same(a,b)&&change)fail('Manual entry capture changes are incomplete or inconsistent.','history');}
        else if(change){after.captures=after.captures.filter(c=>c.target!==target);if(change.after!==null)after.captures.push(clone(change.after));after.capture_bindings[target]=change.after?.id||'';}
      }
      if(after!==null){after.captures.sort((a,b)=>S.captureTargets.indexOf(a.target)-S.captureTargets.indexOf(b.target));for(const capture of after.captures)if(after.capture_bindings[capture.target]!==capture.id||targetValue(after,capture.target)!==capture.applied_value)fail('Historical capture does not agree with its retained applied value.','history');}
      if(before?.read_only&&(after===null||!same(canonical(before),canonical(after))))fail('Frozen Manual history cannot change its body, captured facts or control snapshot.','history','document-read-only');
      states.set(event.record_id,after);
    }
    if(verifyCurrent)for(const reservation of documents.reservations){const expected=states.get(reservation.record_id)||null,actual=documents.entries.find(entry=>entry.record_id===reservation.record_id)||null;if(!same(expected,actual))fail('Manual current body does not agree with its complete retained history.','history');}
    return states;
  }
  function check(documents,workspaceRevision){
    if(!integer(workspaceRevision)||!exact(documents,['entries','reserved_document_ids','reserved_record_ids','reservations','history'])||!Array.isArray(documents.entries)||documents.entries.length>S.limits.entries||!Array.isArray(documents.reservations)||documents.reservations.length>S.limits.bindings||!Array.isArray(documents.history)||documents.history.length>S.limits.events)fail('Native Manual workspace shape/capacity is invalid.');
    for(const key of ['reserved_document_ids','reserved_record_ids']){const ids=documents[key];if(!Array.isArray(ids)||ids.length>S.limits.bindings||new Set(ids).size!==ids.length)fail('Manual organization identity reservations are invalid.');ids.forEach(id=>text(id,key,{id:true,required:true}));}
    const byRecord=new Map(),docIds=new Set();for(const r of documents.reservations){checkReservation(r,workspaceRevision);if(byRecord.has(r.record_id)||docIds.has(r.document_id)||!documents.reserved_record_ids.includes(r.record_id)||!documents.reserved_document_ids.includes(r.document_id))fail('Manual Record/Document identities are not a unique reserved pair.');byRecord.set(r.record_id,r);docIds.add(r.document_id);}
    if(documents.reserved_document_ids.length!==documents.reservations.length||documents.reserved_record_ids.length!==documents.reservations.length)fail('Manual reserved identities lack their durable binding.');
    const entries=new Set();for(const entry of documents.entries){checkEntry(entry,workspaceRevision,byRecord.get(entry.record_id));if(entries.has(entry.record_id)||entry.revision!==byRecord.get(entry.record_id).last_document_revision)fail('Duplicate native Manual identity or mismatched current high-water revision.');entries.add(entry.record_id);}
    let previousWorkspace=0;const revisions=new Map();
    for(const event of documents.history){
      const r=byRecord.get(event.record_id);if(!exact(event,['workspace_revision','document_revision','record_revision','record_id','document_id','action','at','changes','capture_changes'])||!integer(event.workspace_revision,1,workspaceRevision)||event.workspace_revision<previousWorkspace||!integer(event.document_revision,1,workspaceRevision)||!integer(event.record_revision,1,event.workspace_revision)||!r||r.document_id!==event.document_id||event.document_revision>r.last_document_revision||!['create','edit','freeze','restore'].includes(event.action)||!Array.isArray(event.changes)||!Array.isArray(event.capture_changes)||!event.changes.length&&!event.capture_changes.length)fail('Manual history event is invalid.');utc(event.at,'Document event time');previousWorkspace=event.workspace_revision;
      if(event.document_revision<=(revisions.get(event.record_id)||0))fail('Manual document history revisions must increase.');revisions.set(event.record_id,event.document_revision);
      const paths=new Set();for(const change of event.changes){checkChange(change,event,workspaceRevision,r);const key=pathKey(change.path);if(paths.has(key))fail('Duplicate Manual history path.');paths.add(key);}
      const captureTargets=new Set();for(const change of event.capture_changes){if(!exact(change,['target','before','after'])||!S.captureTargets.includes(change.target)||captureTargets.has(change.target)||same(change.before,change.after))fail('Manual capture history change is invalid.');captureTargets.add(change.target);for(const capture of [change.before,change.after])if(capture!==null){checkCapture(capture,workspaceRevision);if(capture.target!==change.target||!r.captures.ids.includes(capture.id))fail('Historical capture identity/target is invalid.');}
        const owning=event.changes.find(c=>c.path.length===2&&c.path[1]===change.target&&['values','artifact_refs'].includes(c.path[0])||c.path[0]==='repositories'&&c.path[1]==='control_document_record_id'&&change.target==='T26R9C4');if(owning)for(const side of ['before','after'])if(change[side]!==null&&change[side].applied_value!==owning[side])fail('Historical capture disagrees with its changed input.');
        const presence=event.changes.find(c=>c.path[0]==='entry');if(presence)for(const side of ['before','after']){const e=presence[side],capture=e?.captures.find(c=>c.target===change.target)||null;if(!same(capture,change[side]))fail('Historical capture disagrees with its entry snapshot.');}
      }
      if(event.action==='freeze'&&(event.changes.length!==1||event.changes[0].path[0]!=='read_only'||event.changes[0].before!==null||event.changes[0].after===null||event.capture_changes.length))fail('Manual freeze history must record exactly its immutable marker.');
    }
    for(const r of documents.reservations)if((revisions.get(r.record_id)||0)!==r.last_document_revision)fail('Manual durable revision high-water does not match retained history.');replayHistory(documents);if(bytes(documents)>S.limits.workspaceBytes)fail('Native Manual history exceeds the whole-workspace 4 MB limit. Keep the previous saved copy.','history','document-capacity');
    return documents;
  }
  function canonical(entry){return {...authoring(entry),read_only:clone(entry.read_only)};}
  return Object.freeze({check});
  })(S,R);
  function checkLegacyV9(documents,revision){return legacyV9.check(documents,revision);}
  const schemaFor=value=>T.get(value);
  const policy=entry=>schemaFor(entry.template).template.id===P.schema.template.id;
  const risk=entry=>schemaFor(entry.template).template.id===K.schema.template.id;
  const lifecycle=entry=>schemaFor(entry.template).template.id===L.schema.template.id;
  const assurance=entry=>schemaFor(entry.template).template.id===A.schema.template.id;
  const referenceProcedure=entry=>lifecycle(entry)||assurance(entry);
  const bodyFor=entry=>policy(entry)?P:risk(entry)?K:lifecycle(entry)?L:assurance(entry)?A:null;
  const documentName=entry=>entry?.template?({[S.template.id]:'Manual',[P.schema.template.id]:'Policy',[K.schema.template.id]:'Risk procedure',[L.schema.template.id]:'Lifecycle procedure',[A.schema.template.id]:'Assurance procedure'})[schemaFor(entry.template).template.id]:'Manual';
  const namespaceName=documents=>{const entries=[...(Array.isArray(documents?.entries)?documents.entries:[]),...(Array.isArray(documents?.reservations)?documents.reservations:[])],names=new Set(entries.map(documentName));return names.size>1?'Document':names.size?[...names][0]:'Manual';};
  const rowKinds=entry=>schemaFor(entry.template).rowKinds||['history_rows','glossary_rows'];
  const captureTargets=entry=>bodyFor(entry)?.targets(entry)||S.captureTargets;
  const bodyAPI=(name='Manual')=>({text,validDate,timestamp,normalizeText,checkSource:(source,revision)=>checkSource(source,revision,name),schemaFor,recordText,captureSource,validateCurrentCapture});
  function template(value){schemaFor(value);}
  function targetValue(entry,target){if(bodyFor(entry))return bodyFor(entry).targetValue(entry,target);if(S.valueTargets.includes(target))return entry.values[target];if(S.artifactTargets.includes(target))return entry.artifact_refs[target];if(target==='T26R9C4')return entry.repositories.control_document_record_id;fail('Unknown Manual capture target.',target);}
  function checkSource(source,workspaceRevision,name='Manual'){
    if(['document_references','record_references'].includes(source?.kind))return K.checkReferenceSource(source,workspaceRevision,bodyAPI('Risk procedure'));
    if(source?.kind==='manual_documents')return P.checkManualSource(source,workspaceRevision,bodyAPI());
    if(!exact(source,['kind','id','revision','values'])||!Object.hasOwn(S.sourceFields,source.kind)||!integer(source.revision,1,workspaceRevision)||!exact(source.values,S.sourceFields[source.kind]))fail(`${name} captured source has an invalid shape or revision.`,'captures');
    text(source.id,'Captured source ID',{id:true,required:true});
    for(const [key,value] of Object.entries(source.values)){
      if(source.kind==='people'&&key==='role_ids'){if(!Array.isArray(value)||new Set(value).size!==value.length)fail('Captured person roles are invalid.','captures');value.forEach(id=>text(id,'Captured role ID',{id:true,required:true}));}
      else{text(value,'Captured '+key,{id:['basis_record_id','source_record_id','origin_context_id','supersedes','subject_id'].includes(key)});if(['last_reviewed','next_review','effective_date'].includes(key)&&value&&!validDate(value))fail(`Captured ${key}: use a real date.`,'captures');}
    }
  }
  function checkCapture(capture,workspaceRevision,{pending=false,template:templatePin=S.template}={}){
    if(schemaFor(templatePin).template.id===P.schema.template.id)return P.checkCapture(capture,workspaceRevision,{pending},bodyAPI('Policy'));
    if(schemaFor(templatePin).template.id===K.schema.template.id)return K.checkCapture(capture,workspaceRevision,{pending},bodyAPI('Risk procedure'));
    if(schemaFor(templatePin).template.id===L.schema.template.id)return L.checkCapture(capture,workspaceRevision,{pending},bodyAPI('Lifecycle procedure'));
    if(schemaFor(templatePin).template.id===A.schema.template.id)return A.checkCapture(capture,workspaceRevision,{pending},bodyAPI('Assurance procedure'));
    if(!exact(capture,['id','target','kind','at','applied_value','sources'],pending?['client_key']:[])||!Object.hasOwn(S.captureKinds,capture.target)||S.captureKinds[capture.target]!==capture.kind||!Array.isArray(capture.sources)||!capture.sources.length||capture.sources.length>S.limits.sources)fail('Manual source capture has an invalid target or shape.','captures');
    if(pending&&capture.id===null){text(capture.client_key,'Pending capture key',{id:true,required:true});if(['__proto__','constructor','prototype'].includes(capture.client_key))fail('Unsupported pending capture key.','captures');}else token(capture.id,'c','Capture ID');
    utc(capture.at,'Capture time');text(capture.applied_value,capture.target,{id:S.artifactTargets.includes(capture.target)||capture.target==='T26R9C4',narrative:S.narrativeTargets.includes(capture.target)});
    const allowed={role:['roles','people'],context:['context'],requirement:['requirements'],record:['records']}[capture.kind],seen=new Set();
    for(const source of capture.sources){checkSource(source,workspaceRevision);const key=source.kind+':'+source.id;if(!allowed.includes(source.kind)||seen.has(key))fail('Manual capture contains a duplicate or wrong source kind.',capture.target);seen.add(key);}
    if((capture.target==='T9R2C1'||capture.kind==='record')&&capture.sources.length!==1)fail('This Manual input needs exactly one owning source.',capture.target);
    if(capture.kind==='record'&&capture.applied_value!==capture.sources[0].id)fail('Artifact capture does not match the exact entered Record ID.',capture.target);
    if(capture.kind==='role'){
      const roles=capture.sources.filter(source=>source.kind==='roles'),people=capture.sources.filter(source=>source.kind==='people');if(!roles.length)fail('Select the recorded role before adding a coordination person.',capture.target);
      if(S.roleTargets.includes(capture.target)&&(roles.length!==1||capture.applied_value!==roles[0].values.name))fail('Maintenance/reviewer input must contain the selected role alone, with contact details separate.',capture.target);
      for(const person of people)if(!roles.some(role=>person.values.role_ids.includes(role.id)))fail('The captured person did not hold the captured role.',capture.target);
    }
  }
  function checkRow(row,kind,{pending=false}={}){
    const columns=kind==='history_rows'?S.historyColumns:S.glossaryColumns;
    if(!exact(row,['row_id',...columns],pending?['client_key']:[]))fail('Manual local row has unsupported columns.',kind);
    if(pending&&row.row_id===null){text(row.client_key,'Pending row key',{id:true,required:true});if(['__proto__','constructor','prototype'].includes(row.client_key))fail('Unsupported pending row key.',kind);}else token(row.row_id,'r','Row ID');
    for(const column of columns){text(row[column],kind+'.'+(row.row_id||row.client_key)+'.'+column);if(column==='date'&&row[column]&&!validDate(row[column]))fail('Revision Date: use a real date in YYYY-MM-DD format.',kind+'.'+(row.row_id||row.client_key)+'.date');}
  }
  const authorKeys=['record_id','document_id','template','values','review','artifact_refs','repositories','history_rows','glossary_rows','capture_bindings','captures'];
  const entryKeys=[...authorKeys,'revision','created_at','updated_at','read_only'];
  const authoring=entry=>bodyFor(entry)?bodyFor(entry).authoring(entry):Object.fromEntries(authorKeys.map(key=>[key,clone(entry[key])]));
  function checkAuthor(entry,workspaceRevision,{pending=false}={}){
    if(bodyFor(entry))return bodyFor(entry).checkAuthor(entry,workspaceRevision,{pending},bodyAPI(documentName(entry)));
    for(const field of ['record_id','document_id'])text(entry[field],field,{id:true,required:true});template(entry.template);
    if(!exact(entry.values,S.valueTargets)||!exact(entry.review,['date','interval','triggers'])||!exact(entry.artifact_refs,S.artifactTargets)||!exact(entry.repositories,['locations','control_document_record_id'])||!exact(entry.capture_bindings,S.captureTargets))fail('Manual input ownership does not match the source catalog.','values');
    for(const [target,value] of Object.entries(entry.values))text(value,target,{narrative:S.narrativeTargets.includes(target)});
    for(const [field,value] of Object.entries(entry.review))text(value,'review.'+field);if(entry.review.date&&!validDate(entry.review.date))fail('Review date: use a real date in YYYY-MM-DD format.','review.date');
    for(const [target,value] of Object.entries(entry.artifact_refs))text(value,target,{id:true});text(entry.repositories.locations,'repositories.locations');text(entry.repositories.control_document_record_id,'repositories.control_document_record_id',{id:true});
    const rowIds=new Set(),clientRows=new Set();
    for(const [kind,max] of [['history_rows',S.limits.historyRows],['glossary_rows',S.limits.glossaryRows]]){
      if(!Array.isArray(entry[kind])||entry[kind].length>max)fail(`Manual ${kind} supports at most ${max} active rows.`,kind);
      for(const row of entry[kind]){checkRow(row,kind,{pending});const key=row.row_id||row.client_key;if(rowIds.has(key)||row.row_id===null&&clientRows.has(row.client_key))fail('Manual local row identities must be distinct across both tables.',kind);rowIds.add(key);if(row.row_id===null)clientRows.add(row.client_key);}
    }
    if(!Array.isArray(entry.captures)||entry.captures.length>S.captureTargets.length)fail('Manual capture list is invalid.','captures');const capIds=new Set(),targets=new Set();
    for(const capture of entry.captures){checkCapture(capture,workspaceRevision,{pending,template:entry.template});const id=capture.id||capture.client_key;if(capIds.has(id)||targets.has(capture.target)||entry.capture_bindings[capture.target]!==id||targetValue(entry,capture.target)!==capture.applied_value)fail('Manual capture/binding does not match its exact applied input.',capture.target);capIds.add(id);targets.add(capture.target);}
    for(const [target,id] of Object.entries(entry.capture_bindings)){if(typeof id!=='string'||id&&!entry.captures.some(c=>c.target===target&&(c.id||c.client_key)===id))fail('Manual input has an orphan capture binding.',target);if(id&&!pending)token(id,'c','Capture binding');}
    if(bytes(authoring(entry))>S.limits.authoringBytes)fail('The Manual authoring content exceeds the 256 KiB limit. Keep the saved copy and shorten this draft.','values','document-capacity');
    return entry;
  }
  function checkMarker(marker,workspaceRevision,name='Manual'){
    if(marker===null)return;
    if(!exact(marker,['record_revision','lifecycle','observed_at','record_values'])||!integer(marker.record_revision,1,workspaceRevision)||!S.retained.includes(marker.lifecycle)||!plain(marker.record_values))fail(`${name} read-only marker is invalid.`,'read_only');utc(marker.observed_at,'Freeze time');R.validate('records',marker.record_values,{validDate});for(const [key,value] of Object.entries(marker.record_values))text(value,'Frozen Record '+key,{id:['id','subject_id','supersedes'].includes(key)});if(marker.record_values.lifecycle!==marker.lifecycle)fail(`Frozen ${name} lifecycle and Record snapshot differ.`,'read_only');
  }
  function checkEntry(entry,workspaceRevision,reservation){
    const name=documentName(entry);
    if(!exact(entry,bodyFor(entry)?[...bodyFor(entry).schema.authorKeys,'revision','created_at','updated_at','read_only']:entryKeys)||!integer(entry.revision,1,workspaceRevision))fail(`Native ${name} entry shape or revision is invalid.`);checkAuthor(entry,workspaceRevision);utc(entry.created_at,'Document creation time');utc(entry.updated_at,'Document Save time');if(Date.parse(entry.updated_at)<Date.parse(entry.created_at))fail('Document Save time precedes creation.');checkMarker(entry.read_only,workspaceRevision,name);
    if(entry.read_only&&entry.read_only.record_values.id!==entry.record_id)fail('Frozen Record snapshot has a different owning Record ID.','read_only');
    if(!reservation||reservation.record_id!==entry.record_id||reservation.document_id!==entry.document_id||!T.same(reservation.template,entry.template)||entry.revision>reservation.last_document_revision)fail(`${name} body lacks its exact reserved identity/revision.`);
    for(const row of rowKinds(entry).flatMap(kind=>entry[kind]))if(!reservation.rows.ids.includes(row.row_id))fail(`${name} local row identity is not reserved.`);for(const capture of entry.captures)if(!reservation.captures.ids.includes(capture.id))fail(`${name} capture identity is not reserved.`);return entry;
  }
  function checkReservation(reservation,workspaceRevision){
    const name=documentName(reservation);
    if(!exact(reservation,['record_id','document_id','template','last_document_revision','rows','captures'])||!integer(reservation.last_document_revision,1,workspaceRevision))fail(`${name} durable reservation shape/revision is invalid.`);template(reservation.template);text(reservation.record_id,'Reserved Record ID',{id:true,required:true});text(reservation.document_id,'Reserved Document ID',{id:true,required:true});
    for(const [kind,prefix] of [['rows','r'],['captures','c']]){const r=reservation[kind];if(!exact(r,['next_id','ids'])||!integer(r.next_id,1)||!Array.isArray(r.ids)||new Set(r.ids).size!==r.ids.length)fail(`${name} internal identity reservations are invalid.`);for(const id of r.ids){token(id,prefix,'Reserved '+kind+' ID');if(Number(id.slice(1))>=r.next_id)fail(`${name} reservation counter would reuse an internal identity.`);}}
  }
  function pathKey(path){return JSON.stringify(path);}
  function checkChange(change,event,workspaceRevision,reservation){
    const name=documentName(reservation);
    const S=schemaFor(reservation.template),isPolicy=S.template.id===P.schema.template.id,isRisk=S.template.id===K.schema.template.id,isLifecycle=S.template.id===L.schema.template.id,isAssurance=S.template.id===A.schema.template.id,isReferenceProcedure=isLifecycle||isAssurance;
    if(!exact(change,['path','before','after'])||!Array.isArray(change.path)||same(change.before,change.after))fail(`${name} history change is malformed or empty.`);const [group,key]=change.path;
    if(change.path.length===2&&['values','review',...(!isRisk&&!isReferenceProcedure?['artifact_refs']:[]),...(!isPolicy&&!isRisk&&!isReferenceProcedure?['repositories']:[])].includes(group)){
      const allowed={values:S.valueTargets,review:['date','interval','triggers'],artifact_refs:S.artifactTargets,repositories:['locations','control_document_record_id']}[group];if(!allowed.includes(key))fail(`${name} history path is not an owning field.`);
      for(const value of [change.before,change.after]){text(value,group+'.'+key,{id:group==='artifact_refs'||group==='repositories'&&key==='control_document_record_id',narrative:group==='values'&&S.narrativeTargets.includes(key)});if(group==='review'&&key==='date'&&value&&!validDate(value))fail(`${name} history review date is invalid.`);}
    }else if(change.path.length===1&&(isPolicy&&['distribution','precedence'].includes(group)||isRisk&&group==='distribution'||isReferenceProcedure&&['distribution','configuration_record_id'].includes(group))){for(const value of [change.before,change.after])text(value,group,{narrative:group==='precedence',id:group==='configuration_record_id'});
    }else if(change.path.length===2&&['history_rows','glossary_rows',...(isPolicy?['principle_rows']:[])].includes(group)){
      token(key,'r','Historical row ID');if(!reservation.rows.ids.includes(key))fail(`${name} history row identity is not reserved.`);for(const row of [change.before,change.after])if(row!==null){if(isPolicy)P.checkRow(row,group,{},bodyAPI());else if(isRisk)K.checkRow(row,group,{},bodyAPI());else if(isLifecycle)L.checkRow(row,group,{},bodyAPI());else if(isAssurance)A.checkRow(row,group,{},bodyAPI());else checkRow(row,group);if(row.row_id!==key)fail(`${name} history row changed its stable identity.`);}
    }else if(change.path.length===1&&['history_order','glossary_order',...(isPolicy?['principle_order']:[])].includes(group)){
      for(const ids of [change.before,change.after]){if(!Array.isArray(ids)||new Set(ids).size!==ids.length||ids.length>(isReferenceProcedure?60:100))fail(`${name} history row ordering is invalid.`);for(const id of ids)if(!reservation.rows.ids.includes(id))fail(`${name} history ordering has an unreserved identity.`);}
    }else if(change.path.length===1&&group==='read_only'){checkMarker(change.before,workspaceRevision,name);checkMarker(change.after,workspaceRevision,name);if(change.before!==null&&change.after===null)fail(`A frozen ${name} cannot thaw.`);}
    else if(change.path.length===1&&group==='entry'&&['create','restore'].includes(event.action)){
      if(change.before!==null&&change.after!==null)fail('Whole-entry history is reserved for creation or restored presence changes.','history');
      for(const value of [change.before,change.after])if(value!==null){checkEntry(value,workspaceRevision,reservation);if(value.record_id!==event.record_id||value.document_id!==event.document_id)fail(`${name} history entry changed its identity.`);}
    }else fail(`Unsupported ${name} history path.`);
  }
  function replayHistory(documents,{verifyCurrent=true}={}){
    const name=namespaceName(documents);
    const states=new Map();
    for(const event of documents.history){
      const before=states.get(event.record_id)||null,presence=event.changes.find(change=>change.path[0]==='entry');let after=before&&clone(before);
      if(presence){
        if(event.changes.length!==1||!same(presence.before,before))fail(`${name} entry history does not agree with its exact prior snapshot.`,'history');
        if(event.action==='create'&&(presence.before!==null||presence.after===null||event.document_revision!==1))fail(`${name} creation history is not an exact first saved body.`,'history');
        after=clone(presence.after);if(after!==null&&(after.revision!==event.document_revision||after.updated_at!==event.at))fail(`Restored/created ${name} snapshot has the wrong event revision/time.`,'history');
      }else{
        if(!before)fail(`${name} edit/freeze history has no prior saved body.`,'history');
        const orders=[];
        for(const change of event.changes){const [group,key]=change.path;
          if(['history_order','glossary_order','principle_order'].includes(group)){orders.push(change);continue;}
          if(['history_rows','glossary_rows','principle_rows'].includes(group)){
            const previous=before[group].find(row=>row.row_id===key)||null;if(!same(previous,change.before))fail(`${name} row history does not match its prior saved row.`,'history');const index=after[group].findIndex(row=>row.row_id===key);if(index>=0)after[group].splice(index,1,...(change.after===null?[]:[clone(change.after)]));else if(change.after!==null)after[group].push(clone(change.after));
          }else if(group==='read_only'){if(!same(before.read_only,change.before))fail(`${name} freeze history does not match its prior marker.`,'history');after.read_only=clone(change.after);}
          else if(['distribution','precedence','configuration_record_id'].includes(group)){if(!same(before[group],change.before))fail('Document scalar history differs from its prior value.','history');after[group]=clone(change.after);}
          else{if(!same(before[group][key],change.before))fail(`${name} field history does not match its prior saved value.`,'history');after[group][key]=clone(change.after);}
        }
        for(const change of orders){const kind={history_order:'history_rows',glossary_order:'glossary_rows',principle_order:'principle_rows'}[change.path[0]];if(!same(before[kind].map(row=>row.row_id),change.before)||change.after.length!==after[kind].length||change.after.some(id=>!after[kind].some(row=>row.row_id===id)))fail(`${name} history ordering disagrees with its actual saved rows.`,'history');after[kind]=change.after.map(id=>after[kind].find(row=>row.row_id===id));}
        after.revision=event.document_revision;after.updated_at=event.at;
      }
      for(const target of new Set([...(before?captureTargets(before):[]),...(after?captureTargets(after):[]),...event.capture_changes.map(change=>change.target)])){
        const a=before?.captures.find(c=>c.target===target)||null,change=event.capture_changes.find(c=>c.target===target);
        if(change&&!same(change.before,a))fail(`${name} capture history does not match its exact prior binding.`,'history');
        if(presence){const b=after?.captures.find(c=>c.target===target)||null;if(!same(a,b)&&(!change||!same(change.after,b))||same(a,b)&&change)fail(`${name} entry capture changes are incomplete or inconsistent.`,'history');}
        else if(change){after.captures=after.captures.filter(c=>c.target!==target);if(change.after!==null)after.captures.push(clone(change.after));if(captureTargets(after).includes(target))after.capture_bindings[target]=change.after?.id||'';else delete after.capture_bindings[target];}
      }
      if(after!==null){if(policy(after)){const allowed=captureTargets(after);after.capture_bindings=Object.fromEntries(allowed.map(target=>[target,after.capture_bindings[target]||'']));}after.captures.sort((a,b)=>captureTargets(after).indexOf(a.target)-captureTargets(after).indexOf(b.target));for(const capture of after.captures)if(after.capture_bindings[capture.target]!==capture.id||targetValue(after,capture.target)!==capture.applied_value)fail('Historical capture does not agree with its retained applied value.','history');}
      if(before?.read_only&&(after===null||!same(canonical(before),canonical(after))))fail(`Frozen ${name} history cannot change its body, captured facts or control snapshot.`,'history','document-read-only');
      states.set(event.record_id,after);
    }
    if(verifyCurrent)for(const reservation of documents.reservations){const expected=states.get(reservation.record_id)||null,actual=documents.entries.find(entry=>entry.record_id===reservation.record_id)||null;if(!same(expected,actual))fail(`${name} current body does not agree with its complete retained history.`,'history');}
    return states;
  }
  function check(documents,workspaceRevision){
    const name=namespaceName(documents);
    if(!integer(workspaceRevision)||!exact(documents,['entries','reserved_document_ids','reserved_record_ids','reservations','history'])||!Array.isArray(documents.entries)||documents.entries.length>S.limits.entries||!Array.isArray(documents.reservations)||documents.reservations.length>S.limits.bindings||!Array.isArray(documents.history)||documents.history.length>S.limits.events)fail(`Native ${name} workspace shape/capacity is invalid.`);
    for(const key of ['reserved_document_ids','reserved_record_ids']){const ids=documents[key];if(!Array.isArray(ids)||ids.length>S.limits.bindings||new Set(ids).size!==ids.length)fail(`${name} organization identity reservations are invalid.`);ids.forEach(id=>text(id,key,{id:true,required:true}));}
    const byRecord=new Map(),docIds=new Set();for(const r of documents.reservations){checkReservation(r,workspaceRevision);if(byRecord.has(r.record_id)||docIds.has(r.document_id)||!documents.reserved_record_ids.includes(r.record_id)||!documents.reserved_document_ids.includes(r.document_id))fail(`${name} Record/Document identities are not a unique reserved pair.`);byRecord.set(r.record_id,r);docIds.add(r.document_id);}
    if(documents.reserved_document_ids.length!==documents.reservations.length||documents.reserved_record_ids.length!==documents.reservations.length)fail(`${name} reserved identities lack their durable binding.`);
    const entries=new Set();for(const entry of documents.entries){checkEntry(entry,workspaceRevision,byRecord.get(entry.record_id));if(entries.has(entry.record_id)||entry.revision!==byRecord.get(entry.record_id).last_document_revision)fail(`Duplicate native ${name} identity or mismatched current high-water revision.`);entries.add(entry.record_id);}
    let previousWorkspace=0;const revisions=new Map();
    for(const event of documents.history){
      const r=byRecord.get(event.record_id);if(!exact(event,['workspace_revision','document_revision','record_revision','record_id','document_id','action','at','changes','capture_changes'])||!integer(event.workspace_revision,1,workspaceRevision)||event.workspace_revision<previousWorkspace||!integer(event.document_revision,1,workspaceRevision)||!integer(event.record_revision,1,event.workspace_revision)||!r||r.document_id!==event.document_id||event.document_revision>r.last_document_revision||!['create','edit','freeze','restore'].includes(event.action)||!Array.isArray(event.changes)||!Array.isArray(event.capture_changes)||!event.changes.length&&!event.capture_changes.length)fail(`${name} history event is invalid.`);utc(event.at,'Document event time');previousWorkspace=event.workspace_revision;
      if(event.document_revision<=(revisions.get(event.record_id)||0))fail(`${name} document history revisions must increase.`);revisions.set(event.record_id,event.document_revision);
      const paths=new Set();for(const change of event.changes){checkChange(change,event,workspaceRevision,r);const key=pathKey(change.path);if(paths.has(key))fail(`Duplicate ${name} history path.`);paths.add(key);}
      const captureTargets=new Set();for(const change of event.capture_changes){if(!exact(change,['target','before','after'])||!(bodyFor(r)?bodyFor(r).ownsTarget(change.target):S.captureTargets.includes(change.target))||captureTargets.has(change.target)||same(change.before,change.after))fail(`${name} capture history change is invalid.`);captureTargets.add(change.target);for(const capture of [change.before,change.after])if(capture!==null){checkCapture(capture,workspaceRevision,{template:r.template});if(capture.target!==change.target||!r.captures.ids.includes(capture.id))fail('Historical capture identity/target is invalid.');}
        const owning=event.changes.find(c=>c.path.length===2&&c.path[1]===change.target&&['values','artifact_refs'].includes(c.path[0])||c.path[0]==='repositories'&&c.path[1]==='control_document_record_id'&&change.target==='T26R9C4'||c.path.length===1&&c.path[0]==='configuration_record_id'&&change.target==='configurationRecordId');if(owning)for(const side of ['before','after'])if(change[side]!==null&&change[side].applied_value!==owning[side])fail('Historical capture disagrees with its changed input.');
        const presence=event.changes.find(c=>c.path[0]==='entry');if(presence)for(const side of ['before','after']){const e=presence[side],capture=e?.captures.find(c=>c.target===change.target)||null;if(!same(capture,change[side]))fail('Historical capture disagrees with its entry snapshot.');}
      }
      if(event.action==='freeze'&&(event.changes.length!==1||event.changes[0].path[0]!=='read_only'||event.changes[0].before!==null||event.changes[0].after===null||event.capture_changes.length))fail(`${name} freeze history must record exactly its immutable marker.`);
    }
    for(const r of documents.reservations)if((revisions.get(r.record_id)||0)!==r.last_document_revision)fail(`${name} durable revision high-water does not match retained history.`);replayHistory(documents);if(bytes(documents)>S.limits.workspaceBytes)fail(`Native ${name} history exceeds the whole-workspace 4 MB limit. Keep the previous saved copy.`,'history','document-capacity');
    return documents;
  }
  function checkLegacyV10(documents,revision){
    const allowed=[S.template.id,P.schema.template.id];
    const inspect=value=>{if(!value||typeof value!=='object')return;if(Object.hasOwn(value,'template')&&!allowed.includes(value.template?.id))fail('Legacy v10 admits only the exact Manual and Policy templates.','template','document-template');if(['document_references','record_references'].includes(value.kind))fail('Legacy v10 does not admit Risk reference snapshots.','captures','document-template');Object.values(value).forEach(inspect);};
    inspect(documents);return check(documents,revision);
  }
  function checkLegacyV11(documents,revision){
    const allowed=[S.template,P.schema.template,K.schema.template];
    const inspect=value=>{if(!value||typeof value!=='object')return;if(Object.hasOwn(value,'template')&&!allowed.some(pin=>same(pin,value.template)))fail('Legacy v11 admits only the exact Manual, Policy and Risk templates.','template','document-template');if(['lifecycle_reference','configuration_reference'].includes(value.kind)||Object.hasOwn(value,'configuration_record_id')||Object.hasOwn(value,'contribution_order'))fail('Legacy v11 does not admit Lifecycle authoring or captures.','captures','document-template');Object.values(value).forEach(inspect);};
    inspect(documents);return check(documents,revision);
  }
  function checkLegacyV12(documents,revision){
    const allowed=[S.template,P.schema.template,K.schema.template,L.schema.template];
    const inspect=value=>{if(!value||typeof value!=='object')return;if(Object.hasOwn(value,'template')&&!allowed.some(pin=>same(pin,value.template)))fail('Legacy v12 admits only the exact Manual, Policy, Risk and Lifecycle templates.','template','document-template');if(value.kind==='assurance_reference')fail('Legacy v12 does not admit Assurance captures.','captures','document-template');Object.values(value).forEach(inspect);};
    inspect(documents);return check(documents,revision);
  }
  function parent(workspace,recordId,{record=null,writable=true}={}){
    const row=record||workspace.references?.records.find(row=>row.values.id===recordId);if(!row||row.values?.id!==recordId||row.deleted_at||row.values.type!=='Controlled document')fail(`Record ${recordId} is missing, deleted or not a Controlled document. Open Records to repair it.`, 'record_id','document-parent');
    if(workspace.assessments?.entries.some(entry=>entry.record_id===recordId)||workspace.assessments?.reserved_ids.includes(recordId))fail(`Record ${recordId} is already bound to an Assessment. Use a separate Controlled document Record.`, 'record_id','document-parent');
    if(writable&&!S.editable.includes(row.values.lifecycle))fail(`Record ${recordId} is ${row.values.lifecycle||'missing its lifecycle'}. Editing requires Draft or Under review.`, 'record_id','document-read-only');return row;
  }
  function writable(workspace,entry){const name=documentName(entry);if(!entry)fail(`Open an existing saved ${name} before editing.`,'record_id','document-parent');if(entry.read_only)fail(`${name} ${entry.document_id} is frozen after ${entry.read_only.lifecycle}. A return to Draft cannot thaw it.`, 'record_id','document-read-only');return parent(workspace,entry.record_id);}
  function captureSource(workspace,kind,id){
    if(kind==='record_references'){const row=workspace.references?.records.find(r=>r.values.id===id&&!r.deleted_at);if(!row)fail(`Source ${id} is missing or deleted. Select its current saved metadata.`,'captures','document-source-conflict');const result={kind,id,revision:row.revision,values:Object.fromEntries(K.schema.referenceFields.map(key=>[key,normalizeText(row.values[key])]))};checkSource(result,workspace.revision);return result;}
    if(kind==='document_references'){check(workspace.documents||empty(),workspace.revision);const entry=find(workspace,id);if(!entry||![S.template.id,P.schema.template.id].includes(schemaFor(entry.template).template.id))fail('Choose an actual saved native Manual or Policy body.','captures','document-source-conflict');let row;try{row=parent(workspace,id,{writable:false});}catch(e){fail(e.message,'captures','document-source-conflict');}const control=entry.read_only?{revision:entry.read_only.record_revision,values:entry.read_only.record_values}:row,result={kind,id,revision:entry.revision,values:{document_id:entry.document_id,template:clone(entry.template),record_revision:control.revision,record_values:Object.fromEntries(K.schema.referenceFields.map(key=>[key,normalizeText(control.values[key])]))}};checkSource(result,workspace.revision);return result;}
    if(kind==='manual_documents'){const entry=find(workspace,id);if(!entry||!T.same(entry.template,S.template))fail('Choose an actual saved native Manual body.','captures','document-source-conflict');let row;try{row=parent(workspace,id,{writable:false});}catch(error){fail(error.message,'captures','document-source-conflict');}const control=entry.read_only?{revision:entry.read_only.record_revision,values:entry.read_only.record_values}:row,result={kind,id,revision:entry.revision,values:{document_id:entry.document_id,template:clone(entry.template),record_revision:control.revision,record_values:Object.fromEntries(S.sourceFields.records.map(key=>[key,normalizeText(control.values[key])])),excerpts:Object.fromEntries(['T6R2C1','T12R2C1','T16R2C1'].map(key=>[key,entry.values[key]]))}};checkSource(result,workspace.revision);return result;}
    if(!Object.hasOwn(S.sourceFields,kind))fail('Unsupported Manual source kind.','captures');const row=['roles','people'].includes(kind)?workspace.directory?.[kind].find(row=>row.id===id&&!row.archived):workspace.references?.[kind].find(row=>row.values.id===id&&!row.deleted_at);if(!row)fail(`Source ${id} is missing, deleted or archived. Select its current saved metadata.`, 'captures','document-source-conflict');
    const values=['roles','people'].includes(kind)?row:row.values,result={kind,id,revision:row.revision,values:Object.fromEntries(S.sourceFields[kind].map(key=>[key,Array.isArray(values[key])?clone(values[key]):normalizeText(values[key])]))};checkSource(result,workspace.revision);return result;
  }
  function validateCurrentCapture(workspace,capture,{historicalSources=[]}={}){
    const historical=source=>historicalSources.some(old=>same(old,source));
    for(const source of capture.sources){if(historical(source))continue;const current=captureSource(workspace,source.kind,source.id);if(!same(current,source))fail(`Source ${source.id} changed after selection. Refresh this input’s saved-fact preview before saving.`,capture.target,'document-source-conflict');}
    if(capture.kind==='role'){const roles=capture.sources.filter(s=>s.kind==='roles');for(const person of capture.sources.filter(s=>s.kind==='people'&&!historical(s)))if(!roles.some(role=>{try{return captureSource(workspace,'roles',role.id)&&person.values.role_ids.includes(role.id);}catch{return false;}}))fail('The selected person no longer holds a selected active role.',capture.target,'document-source-conflict');}
    if(capture.target==='T9R2C1'&&!historical(capture.sources[0])){const value=capture.sources[0].values;if(value.type!=='Climate change')fail('Climate relevance needs the exact Climate change Context item.',capture.target,'document-source-purpose');if(['Relevant','Not relevant'].includes(value.relevance)&&(!value.owner.trim()||value.owner.trim().toLowerCase()==='unassigned'||!value.last_reviewed||!value.next_review&&!value.review_trigger.trim()))fail('Reviewed climate reuse needs its Review owner, Last reviewed date and a Next review date or Review trigger.',capture.target,'document-source-incomplete');}
    if(['T26R8C4','T14R6C3P2'].includes(capture.target)&&(workspace.assessments?.entries.some(entry=>entry.record_id===capture.sources[0].id)||workspace.assessments?.reserved_ids.includes(capture.sources[0].id)))fail('This Record identifies a completed/native Assessment, not the blank Assessment template. Select the blank master Record.',capture.target,'document-source-purpose');
  }
  function prepareCapture(workspace,target,sourceRefs,appliedValue,{at=new Date().toISOString(),clientKey='capture-'+target}={}){
    if(!Array.isArray(sourceRefs)||!S.captureTargets.includes(target))fail('Choose a supported Manual input and its explicit sources.',target);const capture={id:null,client_key:clientKey,target,kind:S.captureKinds[target],at,applied_value:normalizeText(appliedValue),sources:sourceRefs.map(ref=>captureSource(workspace,ref.kind,ref.id))};checkCapture(capture,workspace.revision,{pending:true,template:S.template});validateCurrentCapture(workspace,capture);return capture;
  }
  function normalizePayload(payload){
    if(bodyFor(payload))return bodyFor(payload).normalize(payload,bodyAPI(documentName(payload)));
    if(!exact(payload,authorKeys))fail('The Manual Save payload has unsupported fields.');const result=clone(payload);for(const key of ['values','review','repositories'])for(const field of Object.keys(result[key]||{}))result[key][field]=normalizeText(result[key][field]);
    for(const kind of ['history_rows','glossary_rows'])if(Array.isArray(result[kind]))for(const row of result[kind])for(const key of Object.keys(row))if(!['row_id','client_key'].includes(key))row[key]=normalizeText(row[key]);
    if(Array.isArray(result.captures))for(const capture of result.captures){capture.applied_value=normalizeText(capture.applied_value);for(const source of capture.sources||[])for(const field of Object.keys(source.values||{}))if(typeof source.values[field]==='string')source.values[field]=normalizeText(source.values[field]);}return result;
  }
  function payload(entry){return authoring(entry);}
  function allocate(workspace,input,previous,reservation,at,pendingSources={}){
    const name=documentName(input);
    const data=normalizePayload(input);checkAuthor(data,workspace.revision,{pending:true});if(referenceProcedure(data))bodyFor(data).validatePendingSources(workspace,data,previous,pendingSources,bodyAPI(documentName(data)));const row_ids={},capture_ids={};
    const oldCaps=new Map(previous?previous.captures.map(capture=>[capture.id,capture]):[]);
    for(const kind of rowKinds(data))for(const row of data[kind]){
      if(row.row_id===null){const id='r'+reservation.rows.next_id++;row_ids[row.client_key]=id;row.row_id=id;delete row.client_key;reservation.rows.ids.push(id);}else if(!previous?.[kind].some(saved=>saved.row_id===row.row_id))fail(`This local row ID is not in the current saved ${name} table. Add a new local row or restore the exact backup.`,kind,'document-row-conflict');
    }
    if(policy(data)){const remap=target=>{const match=P.rowTarget(target);return match&&row_ids[match[1]]?'row:principles:'+row_ids[match[1]]+':ownerArtifact':target;};data.capture_bindings=Object.fromEntries(Object.entries(data.capture_bindings).map(([target,id])=>[remap(target),id]));for(const capture of data.captures)capture.target=remap(capture.target);P.guardPointers(workspace,data);}
    for(const capture of data.captures){
      if(capture.id!==null){const old=oldCaps.get(capture.id);if(!old||!same(capture,old))fail('A saved capture cannot be rewritten. Refresh with a new capture preview.',capture.target,'document-source-conflict');continue;}
      const old=previous?.captures.find(c=>c.target===capture.target),comparable=c=>c&&Object.fromEntries(Object.entries(c).filter(([key])=>!['id','client_key','at'].includes(key)));
      if(old&&same(comparable(capture),comparable(old))){if(policy(data)||risk(data))validateCurrentCapture(workspace,capture);capture_ids[capture.client_key]=old.id;data.capture_bindings[capture.target]=old.id;const index=data.captures.indexOf(capture);data.captures[index]=clone(old);continue;}
      validateCurrentCapture(workspace,capture,{historicalSources:bodyFor(data)?bodyFor(data).historicalSources(capture,old,referenceProcedure(data)?pendingSources[capture.target]:[]):(old?.sources||[])});const id='c'+reservation.captures.next_id++;capture_ids[capture.client_key]=id;data.capture_bindings[capture.target]=id;capture.id=id;delete capture.client_key;capture.at=at;reservation.captures.ids.push(id);
    }
    data.captures.sort((a,b)=>captureTargets(data).indexOf(a.target)-captureTargets(data).indexOf(b.target));checkAuthor(data,Math.max(workspace.revision,1));return {data,row_ids,capture_ids};
  }
  function changes(before,after){
    const out=[];for(const group of ['values','review',...(!risk(after)&&!referenceProcedure(after)?['artifact_refs']:[]),...(!policy(after)&&!risk(after)&&!referenceProcedure(after)?['repositories']:[])])for(const key of Object.keys(after[group]))if(before[group][key]!==after[group][key])out.push({path:[group,key],before:before[group][key],after:after[group][key]});
    if(policy(after)||risk(after)||referenceProcedure(after))for(const group of referenceProcedure(after)?['distribution','configuration_record_id']:risk(after)?['distribution']:['distribution','precedence'])if(before[group]!==after[group])out.push({path:[group],before:before[group],after:after[group]});
    for(const kind of rowKinds(after)){const ids=new Set([...before[kind],...after[kind]].map(row=>row.row_id));for(const id of ids){const a=before[kind].find(row=>row.row_id===id)||null,b=after[kind].find(row=>row.row_id===id)||null;if(!same(a,b))out.push({path:[kind,id],before:clone(a),after:clone(b)});}const a=before[kind].map(row=>row.row_id),b=after[kind].map(row=>row.row_id);if(!same(a,b))out.push({path:[{history_rows:'history_order',glossary_rows:'glossary_order',principle_rows:'principle_order'}[kind]],before:a,after:b});}return out;
  }
  function captureChanges(before,after){return [...new Set([...(before?captureTargets(before):[]),...(after?captureTargets(after):[])])].flatMap(target=>{const a=before?.captures.find(c=>c.target===target)||null,b=after?.captures.find(c=>c.target===target)||null;return same(a,b)?[]:[{target,before:clone(a),after:clone(b)}];});}
  function event(entry,recordRevision,workspaceRevision,at,action,eventChanges,eventCaptures){return {workspace_revision:workspaceRevision,document_revision:entry.revision,record_revision:recordRevision,record_id:entry.record_id,document_id:entry.document_id,action,at,changes:eventChanges,capture_changes:eventCaptures};}
  function create(workspace,input,{record,workspaceRevision=workspace.revision+1,at=new Date().toISOString(),pendingSources={}}={}){
    const name=documentName(find(workspace,input.record_id)||input);
    const documents=clone(workspace.documents||empty());check(documents,workspace.revision);utc(at,'Document creation time');parent(workspace,input.record_id,{record});if(find(workspace,input.record_id)||documents.reserved_record_ids.includes(input.record_id)||documents.reserved_document_ids.includes(input.document_id))fail('This Document or Record ID already exists or was previously used. Open saved work or restore its exact backup.','document_id','document-identity');
    if(workspaceRevision!==workspace.revision+1||!record||!integer(record.revision,1,workspaceRevision))fail(`${name} creation needs the final owning Record and planned workspace revision.`);
    const reservation={record_id:input.record_id,document_id:input.document_id,template:clone(input.template),last_document_revision:1,rows:{next_id:1,ids:[]},captures:{next_id:1,ids:[]}},allocated=allocate(workspace,input,null,reservation,at,pendingSources),entry={...allocated.data,revision:1,created_at:at,updated_at:at,read_only:null};
    documents.entries.push(entry);documents.reserved_document_ids.push(entry.document_id);documents.reserved_record_ids.push(entry.record_id);documents.reservations.push(reservation);documents.history.push(event(entry,record.revision,workspaceRevision,at,'create',[{path:['entry'],before:null,after:clone(entry)}],captureChanges(null,entry)));check(documents,workspaceRevision);return {documents,entry:clone(entry),changed:true,row_ids:allocated.row_ids,capture_ids:allocated.capture_ids};
  }
  function save(workspace,input,{baseDocumentRevision,baseRecordRevision,recordRevision,workspaceRevision=workspace.revision+1,at=new Date().toISOString(),pendingSources={}}={}){
    const name=documentName(find(workspace,input.record_id)||input);
    check(workspace.documents||empty(),workspace.revision);const original=find(workspace,input.record_id),record=writable(workspace,original);
    if(original.revision!==baseDocumentRevision||record.revision!==baseRecordRevision)fail(`${name} ${input.document_id} changed: opened body ${baseDocumentRevision}/Record ${baseRecordRevision}; saved body ${original.revision}/Record ${record.revision}. Reopen before saving.`, 'record_id','document-conflict');
    if(original.document_id!==input.document_id||original.record_id!==input.record_id||!T.same(original.template,input.template))fail(`Saved ${name} identities cannot change.`,'document_id','document-identity');utc(at,'Document Save time');if(![record.revision,record.revision+1].includes(recordRevision)||workspaceRevision!==workspace.revision+1||recordRevision>workspaceRevision)fail(`${name} Save needs the final Record and workspace counters.`);
    const documents=clone(workspace.documents),reservation=documents.reservations.find(r=>r.record_id===input.record_id),allocated=allocate(workspace,input,original,reservation,at,pendingSources);
    if(same(authoring(original),allocated.data))return {documents:clone(workspace.documents),entry:clone(original),changed:false,row_ids:{},capture_ids:{}};
    const entry={...allocated.data,revision:reservation.last_document_revision+1,created_at:original.created_at,updated_at:at,read_only:null};reservation.last_document_revision=entry.revision;documents.entries[documents.entries.findIndex(e=>e.record_id===entry.record_id)]=entry;documents.history.push(event(entry,recordRevision,workspaceRevision,at,'edit',changes(original,entry),captureChanges(original,entry)));check(documents,workspaceRevision);return {documents,entry:clone(entry),changed:true,row_ids:allocated.row_ids,capture_ids:allocated.capture_ids};
  }
  function freezeForRecord(next,record,at){
    const entry=find(next,record.values.id);if(!entry||entry.read_only||!S.retained.includes(record.values.lifecycle))return next;utc(at,'Freeze time');const reservation=next.documents.reservations.find(r=>r.record_id===entry.record_id);entry.revision=reservation.last_document_revision+1;reservation.last_document_revision=entry.revision;entry.updated_at=at;entry.read_only={record_revision:record.revision,lifecycle:record.values.lifecycle,observed_at:at,record_values:clone(record.values)};next.documents.history.push(event(entry,record.revision,next.revision,at,'freeze',[{path:['read_only'],before:null,after:clone(entry.read_only)}],[]));check(next.documents,next.revision);return next;
  }
  function canonical(entry){return {...authoring(entry),read_only:clone(entry.read_only)};}
  function restore(current,next,at=new Date().toISOString()){
    const name=namespaceName({reservations:[...(current.documents?.reservations||[]),...(next.documents?.reservations||[])]});
    const a=current.documents||empty(),b=next.documents||empty();check(a,current.revision);check(b,next.revision);utc(at,'Restore time');const result=clone(b),reservations=new Map();
    for(const r of [...a.reservations,...b.reservations]){
      const old=reservations.get(r.record_id);if(old&&(old.document_id!==r.document_id||!T.same(old.template,r.template))||[...reservations.values()].some(other=>other.document_id===r.document_id&&other.record_id!==r.record_id))fail(`Backup has conflicting ${name} Document/Record identity bindings.`,'document_id','document-restore-conflict');
      if(!old)reservations.set(r.record_id,clone(r));else{old.last_document_revision=Math.max(old.last_document_revision,r.last_document_revision);for(const kind of ['rows','captures']){old[kind].ids=Array.from(new Set([...old[kind].ids,...r[kind].ids]));old[kind].next_id=Math.max(old[kind].next_id,r[kind].next_id);}}
    }
    const events=new Map();for(const h of [...a.history,...b.history]){const key=JSON.stringify([h.record_id,h.document_revision]);if(events.has(key)&&!same(events.get(key),h))fail(`Backup has conflicting ${name} history at the same document revision.`,'history','document-restore-conflict');events.set(key,clone(h));}
    for(const entry of a.entries)if(entry.read_only){const incoming=b.entries.find(e=>e.record_id===entry.record_id);if(!incoming||!same(canonical(entry),canonical(incoming))||!same(a.history.filter(h=>h.record_id===entry.record_id),b.history.filter(h=>h.record_id===entry.record_id)))fail(`Backup would remove or replace frozen ${documentName(entry)} ${entry.document_id}. Choose a compatible matching backup.`, 'record_id','document-read-only');result.entries[result.entries.findIndex(e=>e.record_id===entry.record_id)]=clone(entry);}
    const orderedEvents=()=>[...events.values()].sort((x,y)=>x.workspace_revision-y.workspace_revision||x.record_id.localeCompare(y.record_id)||x.document_revision-y.document_revision);
    const terminal=replayHistory({...result,history:orderedEvents()},{verifyCurrent:false});
    const allIds=new Set([...terminal.keys(),...result.entries.map(e=>e.record_id)]);for(const id of allIds){const before=terminal.get(id)||null,after=result.entries.find(e=>e.record_id===id)||null;if(before&&after&&same(canonical(before),canonical(after))){Object.assign(after,clone(before));continue;}if(!before&&!after)continue;
      if(before?.read_only)fail(`Backup would remove or replace frozen ${documentName(before)} ${before.document_id}. Choose a compatible matching backup.`, 'record_id','document-read-only');
      const reservation=reservations.get(id),identity=after||before,revision=reservation.last_document_revision+1;reservation.last_document_revision=revision;if(after){after.revision=revision;after.updated_at=at;}
      const changedEntry=after||{...clone(before),revision,updated_at:at},record=next.references?.records.find(r=>r.values.id===id),recordRevision=record?.revision||before?.read_only?.record_revision||1;
      const eventChanges=before&&after?changes(before,after):[{path:['entry'],before:clone(before),after:clone(after)}];if(before&&after&&!same(before.read_only,after.read_only))eventChanges.push({path:['read_only'],before:clone(before.read_only),after:clone(after.read_only)});
      const h=event(changedEntry,recordRevision,next.revision,at,'restore',eventChanges,captureChanges(before,after));events.set(JSON.stringify([id,revision]),h);
    }
    result.reservations=[...reservations.values()];result.reserved_record_ids=Array.from(new Set([...a.reserved_record_ids,...b.reserved_record_ids]));result.reserved_document_ids=Array.from(new Set([...a.reserved_document_ids,...b.reserved_document_ids]));result.history=orderedEvents();check(result,next.revision);next.documents=result;return next;
  }
  function usage(workspace,kind,id){
    const documents=workspace.documents||empty(),records=new Set();let historical=false;const has=capture=>capture?.sources.some(source=>source.kind===kind&&source.id===id);
    for(const entry of documents.entries)if(entry.captures.some(has))records.add(entry.record_id);
    for(const h of documents.history){if(h.capture_changes.some(change=>has(change.before)||has(change.after))||h.changes.some(change=>change.path[0]==='entry'&&[change.before,change.after].some(entry=>entry?.captures.some(has))))historical=true;}
    return {records:[...records],count:records.size,historical};
  }
  function sourceIssues(workspace,entry){
    const issues=[];for(const capture of entry.captures){for(const source of capture.sources){try{if(!same(captureSource(workspace,source.kind,source.id),source))issues.push({target:capture.target,code:'source-changed',message:`Saved source ${source.id} differs from its captured facts. Refresh explicitly if needed; the saved snapshot remains intact.`});}catch{issues.push({target:capture.target,code:'source-unavailable',message:`Saved source ${source.id} is missing or archived. The captured snapshot remains visible.`});}}
      if(capture.target==='T9R2C1'){const v=capture.sources[0].values;if(['Relevant','Not relevant'].includes(v.relevance)&&(!v.owner||!v.last_reviewed||!v.next_review&&!v.review_trigger))issues.push({target:capture.target,code:'review-incomplete',message:'Captured climate determination needs its Review owner, Last reviewed date and a Next review date or Review trigger.'});}}
    return issues;
  }
  function recordText(id,capture){const source=capture?.sources.find(s=>s.kind==='records'&&s.id===id);if(!id)return '';if(!source)return `Record ID: ${id}\nControlled location: not captured`;const v=source.values;return `Record ID: ${id}\nVersion: ${v.version||'Not assigned'}\nLifecycle: ${v.lifecycle||'Not recorded'}\nControlled location: ${v.location||'Not recorded'}`;}
  function projection(workspace,recordId){
    const name=documentName(find(workspace,recordId)||workspace.documents?.reservations.find(reservation=>reservation.record_id===recordId));
    check(workspace.documents||empty(),workspace.revision);const entry=find(workspace,recordId);if(!entry)fail(`The selected ${name} has no saved native body.`,'record_id','document-parent');const record=parent(workspace,recordId,{writable:false});if(!S.editable.includes(record.values.lifecycle)||entry.read_only)fail(`Working-draft DOCX export requires an editable Draft or Under review ${name}. Frozen work remains inspectable.`,'record_id','document-read-only');
    if(bodyFor(entry)){const projected=bodyFor(entry).projection(entry,record,bodyAPI());let modified_at=entry.updated_at,lastRevision=workspace.documents.history.filter(h=>h.record_id===recordId).at(-1)?.workspace_revision||0;for(const h of workspace.references?.history||[])if(h.kind==='records'&&h.record_id===recordId&&h.revision>lastRevision){lastRevision=h.revision;modified_at=h.at;}return clone({record_id:entry.record_id,document_id:entry.document_id,revision:entry.revision,record_revision:record.revision,workspace_revision:workspace.revision,template:entry.template,record_values:record.values,...projected,created_at:entry.created_at,modified_at});}
    const target_values=Object.fromEntries(S.catalog.map(field=>[field.key,'']));for(const target of S.valueTargets)target_values[target]=entry.values[target];const v=record.values;
    Object.assign(target_values,{T1R2C2:entry.document_id,T1R3C2:v.version,T1R4C2:v.lifecycle,T1R9C2:[entry.review.date&&'Review date: '+entry.review.date,entry.review.interval&&'Review interval: '+entry.review.interval,entry.review.triggers&&'Early review triggers: '+entry.review.triggers].filter(Boolean).join('\n'),T1R10C2:v.access,T1R11C2:v.location,T26R2C4:`Record ID: ${recordId}\nVersion: ${v.version||'Not assigned'}\nLifecycle: ${v.lifecycle}\nControlled location: ${v.location||'Not recorded'}`});
    for(const target of S.artifactTargets)target_values[target]=recordText(entry.artifact_refs[target],entry.captures.find(c=>c.target===target));target_values.T26R9C4=[entry.repositories.locations,entry.repositories.control_document_record_id&&'Separate repository-control document\n'+recordText(entry.repositories.control_document_record_id,entry.captures.find(c=>c.target==='T26R9C4'))].filter(Boolean).join('\n');for(const field of S.catalog.filter(f=>f.kind==='gate-result'))target_values[field.key]='OPEN';
    const repeated_rows={T2:entry.history_rows.map(row=>({row_id:row.row_id,values:[row.version,row.date,row.summary,row.author,row.reviewer,'']})),T27:entry.glossary_rows.map(row=>({row_id:row.row_id,values:[row.term,row.meaning,row.source]}))};
    let modified_at=entry.updated_at,lastRevision=workspace.documents.history.filter(h=>h.record_id===recordId).at(-1)?.workspace_revision||0;for(const h of workspace.references?.history||[])if(h.kind==='records'&&h.record_id===recordId&&h.revision>lastRevision){lastRevision=h.revision;modified_at=h.at;}
    return clone({record_id:entry.record_id,document_id:entry.document_id,revision:entry.revision,record_revision:record.revision,workspace_revision:workspace.revision,template:entry.template,record_values:v,target_values,repeated_rows,created_at:entry.created_at,modified_at});
  }
  return Object.freeze({schema:S,retained:S.retained,editable:S.editable,empty,clone,find,validDate,timestamp,text,normalizeText,blankPayload:(templateId=S.template.id)=>schemaFor(templateId).blankPayload(),schemaFor,templateRegistry:T,policyBody:P,riskBody:K,lifecycleBody:L,assuranceBody:A,checkLegacyV9,checkLegacyV10,checkLegacyV11,checkLegacyV12,captureTargets,recordText,check,payload,authoring,checkAuthor,checkCapture,checkSource,targetValue,parent,writable,captureSource,prepareCapture,prepareRiskCapture:(workspace,entry,target,component,sourceRefs,options)=>K.prepareCapture(workspace,entry,target,component,sourceRefs,options,bodyAPI('Risk procedure')),prepareLifecycleCapture:(workspace,entry,target,component,sourceRefs,options)=>L.prepareCapture(workspace,entry,target,component,sourceRefs,options,bodyAPI('Lifecycle procedure')),prepareAssuranceCapture:(workspace,entry,target,component,sourceRefs,options)=>A.prepareCapture(workspace,entry,target,component,sourceRefs,options,bodyAPI('Assurance procedure')),validateCurrentCapture,create,save,freezeForRecord,canonical,restore,usage,sourceIssues,projection});
});
