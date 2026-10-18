/* Display options map to stable, reviewed state meanings. */
(function(root,factory){
  if(typeof module==='object'&&module.exports)module.exports=factory();else root.OWLDropdowns=factory();
})(globalThis,function(){
  'use strict';
  const definitions={
    scope_status:{label:'AIMS scope status',meanings:['Unknown','Under review','In scope','Out of scope','Superseded']},
    lifecycle_route:{label:'Lifecycle route',meanings:['Unknown','Under review','Develop','Acquire and configure','Modify or reuse','Provide','Bounded experiment']},
    lifecycle_state:{label:'Lifecycle state',meanings:['Unknown','Identified','Under assessment','In development or acquisition','Bounded experiment','Ready for decision','In operation','Restricted','Suspended','Retiring','Retired','Abandoned']}
  };
  const fields=Object.keys(definitions),clone=v=>JSON.parse(JSON.stringify(v)),fail=m=>{throw new Error(m);};
  const builtin=value=>'builtin:'+value;
  const empty=()=>({version:1,next_id:1,lists:Object.fromEntries(fields.map(f=>[f,definitions[f].meanings.map(m=>({id:builtin(m),label:m,meaning:m,archived:false}))])),history:[]});
  const config=w=>w.dropdowns||empty();
  const options=(w,field)=>config(w).lists[field];
  const find=(w,field,id)=>options(w,field).find(o=>o.id===id);
  const exact=(v,keys)=>v&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).length===keys.length&&keys.every(k=>Object.hasOwn(v,k));
  function validateList(field,list,nextId){
    if(!fields.includes(field)||!Array.isArray(list)||list.length>100)fail('Choose a supported dropdown with no more than 100 options.');
    const ids=new Set(),names=new Set();
    for(const o of list){
      if(!exact(o,['id','label','meaning','archived'])||typeof o.id!=='string'||typeof o.label!=='string'||!o.label.trim()||o.label!==o.label.trim()||o.label.length>80||/[\u0000-\u001f]/.test(o.label)||typeof o.archived!=='boolean'||!definitions[field].meanings.includes(o.meaning))fail('Each option needs a short name and a supported rule meaning.');
      if(o.id.startsWith('builtin:')){if(o.id!==builtin(o.meaning))fail('A built-in option keeps its original rule meaning. Add a new option to use another meaning.');}
      else if(!/^custom:[1-9]\d*$/.test(o.id)||!Number.isSafeInteger(Number(o.id.slice(7)))||Number(o.id.slice(7))>=nextId)fail('Invalid dropdown option identity.');
      if(ids.has(o.id)||!o.archived&&names.has(o.label.toLowerCase()))fail('Active option names and option identities must be distinct.');ids.add(o.id);if(!o.archived)names.add(o.label.toLowerCase());
    }
    if(!list.some(o=>!o.archived))fail('Keep at least one active option in this dropdown.');
  }
  function validate(d,maxRevision){
    if(!exact(d,['version','next_id','lists','history'])||d.version!==1||!Number.isSafeInteger(d.next_id)||d.next_id<1||!exact(d.lists,fields)||!Array.isArray(d.history)||d.history.length>5000)fail('Unsupported dropdown settings format.');
    fields.forEach(f=>validateList(f,d.lists[f],d.next_id));let previous=0;
    for(const h of d.history){if(!exact(h,['revision','at','field','before','after'])||!fields.includes(h.field)||!Number.isSafeInteger(h.revision)||h.revision<=previous||h.revision>maxRevision||typeof h.at!=='string'||!Number.isFinite(Date.parse(h.at)))fail('Dropdown history is invalid.');validateList(h.field,h.before,d.next_id);validateList(h.field,h.after,d.next_id);previous=h.revision;}
    return d;
  }
  function reference(w,row,field){const raw=row.values[field];return row.choices?.[field]||(raw?{id:builtin(raw),label:raw}:null);}
  function validateRow(w,row){
    if(row.choices!==undefined&&(!row.choices||typeof row.choices!=='object'||Array.isArray(row.choices)||Object.keys(row.choices).some(f=>!fields.includes(f))))fail('Unsupported dropdown selection metadata.');
    if(row.choices&&Object.values(row.choices).some(ref=>!exact(ref,['id','label'])))fail('Unsupported dropdown selection metadata.');
    for(const field of fields){const ref=reference(w,row,field);if(!ref)continue;
      const o=find(w,field,ref.id);if(!exact(ref,['id','label'])||typeof ref.label!=='string'||!ref.label.trim()||ref.label.length>80||/[\u0000-\u001f]/.test(ref.label)||!o||o.meaning!==row.values[field])fail('A saved dropdown selection has no matching option and meaning.');
    }
  }
  function changedChoices(w,before,values,requested){
    if(requested!==undefined&&(!requested||typeof requested!=='object'||Array.isArray(requested)))fail('Unsupported dropdown selection metadata.');
    const choices=clone(requested===undefined?(before?.choices||{}):requested),events=[];
    for(const field of fields){
      if(requested===undefined&&before?.values[field]!==values[field])delete choices[field];
      const previous=before?reference(w,before,field):null,next=reference(w,{values,choices},field);
      const item=next?find(w,field,next.id):null;
      if(next&&(!item||item.meaning!==values[field]))fail('Choose an option with the correct rule meaning.');
      if(JSON.stringify(previous)!==JSON.stringify(next)&&next&&next.label!==item.label)fail('This option name has changed. Select it again from the current dropdown.');
      if(previous?.id!==next?.id&&item?.archived)fail('This dropdown option has been retired. Choose an active option.');
      if(JSON.stringify(previous)!==JSON.stringify(next))events.push({field:'choice_'+field,before:JSON.stringify(previous),after:JSON.stringify(next)});
    }
    return {choices,events};
  }
  return Object.freeze({definitions,fields,builtin,empty,config,options,find,validate,validateRow,reference,changedChoices});
});
