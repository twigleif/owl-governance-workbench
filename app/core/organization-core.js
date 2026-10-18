/* Organization-owned preview lists. No network, models, or implicit assignments. */
(function(root,factory){
  if(typeof module==='object'&&module.exports)module.exports=factory();
  else root.OWLOrganization=factory();
})(globalThis,function(){
  'use strict';
  const kinds=['roles','people','processes'],clone=v=>JSON.parse(JSON.stringify(v));
  const plain=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
  const fail=m=>{throw new Error(m);};
  const empty=()=>({version:1,roles:[],people:[],processes:[],reserved_ids:[],history:[]});
  const directory=w=>w.directory||empty();
  const refKey=(kind,id)=>kind+':'+id;
  function exact(v,keys){return plain(v)&&Object.keys(v).length===keys.length&&keys.every(k=>Object.hasOwn(v,k));}
  function text(v,label,required=false,max=2000,multiline=false){if(typeof v!=='string'||v.length>max||(multiline?/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/:/[\u0000-\u001f]/).test(v)||required&&!v.trim())fail(label+' is missing or contains unsupported text.');}
  function entry(e,kind){
    const extra=kind==='roles'?['description']:kind==='people'?['contact','role_ids']:[];
    if(!exact(e,['id','name','archived','revision',...extra]))fail('The directory entry has unsupported fields.');
    text(e.id,'ID',true,80);if(e.id!==e.id.trim()||e.id.includes(':'))fail('Enter an exact ID without surrounding whitespace or a colon.');
    text(e.name,'Name',true,160);if(e.name!==e.name.trim())fail('Remove surrounding whitespace from the name.');
    if(typeof e.archived!=='boolean'||!Number.isSafeInteger(e.revision)||e.revision<1)fail('The directory entry state is invalid.');
    if(kind==='roles')text(e.description,'Responsibilities',false,2000,true);
    if(kind==='people'){text(e.contact,'Contact details');if(!Array.isArray(e.role_ids)||new Set(e.role_ids).size!==e.role_ids.length||e.role_ids.some(id=>typeof id!=='string'))fail('Choose valid, distinct roles.');}
  }
  function validate(d,workspaceRevision=Number.MAX_SAFE_INTEGER){
    if(!exact(d,['version',...kinds,'reserved_ids','history'])||d.version!==1)fail('Unsupported organization directory format.');
    if(!Array.isArray(d.reserved_ids)||d.reserved_ids.length>10000||new Set(d.reserved_ids).size!==d.reserved_ids.length||d.reserved_ids.some(k=>typeof k!=='string'||!/^(roles|people|processes):[^:]+$/.test(k)))fail('Directory identity history is invalid.');
    for(const kind of kinds){
      if(!Array.isArray(d[kind])||d[kind].length>500)fail('This preview supports up to 500 entries per directory list.');
      const ids=new Set(),names=new Set();
      for(const e of d[kind]){entry(e,kind);if(e.revision>workspaceRevision||ids.has(e.id)||!d.reserved_ids.includes(refKey(kind,e.id)))fail('A directory identity or revision is invalid.');if(kind!=='people'&&!e.archived&&names.has(e.name.toLowerCase()))fail('Active directory names must be distinct within their list.');ids.add(e.id);if(!e.archived)names.add(e.name.toLowerCase());}
    }
    for(const p of d.people)if(p.role_ids.some(id=>!d.roles.some(r=>r.id===id)))fail('A person refers to a missing role.');
    if(!Array.isArray(d.history)||d.history.length>10000)fail('Directory history exceeds this preview limit.');
    let previous=0;
    for(const h of d.history){
      if(!exact(h,['revision','at','kind','id','before','after'])||!kinds.includes(h.kind)||!Number.isSafeInteger(h.revision)||h.revision<=previous||h.revision>workspaceRevision||typeof h.at!=='string'||!Number.isFinite(Date.parse(h.at)))fail('Directory history is invalid.');
      previous=h.revision;if(h.before===null&&h.after===null)fail('An empty directory history event is invalid.');
      for(const value of [h.before,h.after])if(value!==null){entry(value,h.kind);if(value.id!==h.id)fail('Directory history changed identity.');}
      if(!d.reserved_ids.includes(refKey(h.kind,h.id)))fail('Directory history is missing its reserved identity.');
    }
    return d;
  }
  function find(w,ref){if(!ref||!['roles','people','processes'].includes(ref.kind))return null;return directory(w)[ref.kind].find(e=>e.id===ref.id)||null;}
  function validateRef(w,ref,allowed){
    if(ref===null||ref===undefined)return;
    if(!exact(ref,['kind','id'])||!allowed.includes(ref.kind)||!find(w,ref))fail('The selected list entry is unavailable. Reopen the list and choose again.');
  }
  function usage(w,kind,id){
    const records=w.systems.filter(r=>[r.owner_ref,r.process_ref].some(ref=>ref?.kind===kind&&ref.id===id));
    const people=kind==='roles'?directory(w).people.filter(p=>p.role_ids.includes(id)):[];
    const historical=w.history.some(e=>e.changes.some(c=>c.field===(kind==='processes'?'process_ref':'owner_ref')&&[c.before,c.after].includes(refKey(kind,id))))||kind==='roles'&&directory(w).history.some(h=>h.kind==='people'&&[h.before,h.after].some(p=>p?.role_ids.includes(id)));
    const documentUse=globalThis.OWLDocumentCore?.usage(w,kind,id);
    // Browser loads DocumentCore after this owner. CommonJS resolves it only at
    // invocation to avoid a register/directory/document dependency cycle.
    const nativeUse=documentUse||(typeof module==='object'&&module.exports&&w.documents?require('./document-core.js').usage(w,kind,id):null);
    return {records,people,count:records.length+people.length+(nativeUse?.count||0),historical:historical||!!nativeUse?.historical};
  }
  function change(w,kind,action,input,{id=null,baseRevision=0,at=new Date().toISOString()}={}){
    if(!['roles','people'].includes(kind)||!['save','archive','restore','delete'].includes(action))fail('Unsupported list action.');
    const next=clone(w),d=clone(directory(w)),items=d[kind],old=id===null?null:items.find(e=>e.id===id);
    if(id!==null&&(!old||old.revision!==baseRevision))fail('This list entry changed. Reopen it before saving.');
    let after;
    if(action==='save'){
      after={...clone(input),archived:old?.archived||false,revision:w.revision+1};entry(after,kind);
      if(old&&after.id!==old.id)fail('Existing IDs cannot be renamed.');
      if(!old&&d.reserved_ids.includes(refKey(kind,after.id)))fail('That ID already exists or was previously used.');
      if(kind!=='people'&&!after.archived&&items.some(e=>e.id!==after.id&&!e.archived&&e.name.toLowerCase()===after.name.toLowerCase()))fail('An active entry already uses that name.');
      if(kind==='people')for(const rid of after.role_ids){const r=d.roles.find(r=>r.id===rid);if(!r||r.archived&&!old?.role_ids.includes(rid))fail('A selected role is missing or archived.');}
    }else{
      if(!old)fail('Choose an existing entry.');
      if(action==='delete'){const use=usage(w,kind,id);if(use.count||use.historical)fail('This entry is referenced by records or history. Archive it instead.');after=null;}
      else {after={...old,archived:action==='archive',revision:w.revision+1};if(kind!=='people'&&action==='restore'&&items.some(e=>e.id!==id&&!e.archived&&e.name.toLowerCase()===old.name.toLowerCase()))fail('An active entry already uses that name.');}
    }
    if(old&&after&&JSON.stringify({...old,revision:0})===JSON.stringify({...after,revision:0}))return next;
    if(old)items.splice(items.findIndex(e=>e.id===id),1,...(after?[after]:[]));else{items.push(after);d.reserved_ids.push(refKey(kind,after.id));}
    next.revision++;d.history.push({revision:next.revision,at,kind,id:id||after.id,before:old?clone(old):null,after:after?clone(after):null});next.directory=d;validate(d,next.revision);return next;
  }
  function contact(w,row,field){
    const factual=['name','intended_purpose','business_process','date_identified','organization_role','lifecycle_route','lifecycle_state','last_reviewed','next_review_date','review_trigger'];
    if(!factual.includes(field))return {text:'No contact linked for this task',people:[]};
    const owner=find(w,row.owner_ref);if(!owner)return{text:row.values.system_owner?'Owner recorded as '+row.values.system_owner+' · no directory link':'No owner assigned',people:[]};
    if(owner.archived)return{text:owner.name+' · archived; choose a current owner',people:[]};
    const people=row.owner_ref.kind==='people'?[owner]:directory(w).people.filter(p=>!p.archived&&p.role_ids.includes(owner.id));
    const personLabel=p=>p.name+(directory(w).people.some(other=>other.id!==p.id&&!other.archived&&other.name.toLowerCase()===p.name.toLowerCase())?' ['+p.id+']':'');
    return{text:row.owner_ref.kind==='people'?personLabel(owner):owner.name+(people.length?' · '+people.map(personLabel).join(', '):' · no named contact'),people:people.map(p=>({name:personLabel(p),contact:p.contact}))};
  }
  return Object.freeze({kinds,empty,directory,validate,validateRef,find,usage,change,contact,refKey});
});
