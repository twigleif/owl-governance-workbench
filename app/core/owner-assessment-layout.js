/* Pure protected worksheet layout for the closed Assessment profile owner recipe. */
(function(root,factory){const api=factory(typeof module==='object'&&module.exports?require('./owner-assessment-profiles.js'):root.OWLOwnerAssessmentProfiles,typeof module==='object'&&module.exports?require('./owner-context-date-layout.js'):root.OWLOwnerContextDateLayout);if(typeof module==='object'&&module.exports)module.exports=api;else root.OWLOwnerAssessmentLayout=api;})(globalThis,function(P,F){
'use strict';
const RECIPE='owner-assessment-profile-1',LIMITS=Object.freeze({...F.LIMITS}),own=(o,k)=>Object.prototype.hasOwnProperty.call(o,k);
const instructions='Answer for the setup and scope in this assessment, using what is known at its evidence cut-off. If you cannot answer yet, write Pending, preferably with a short reason. Give what you know and mark any missing part Pending.';
const returnInstruction='Type in the amber boxes. Save this file and return your copy to the person who sent it.';
const footer='A partial reply is useful. Keep Pending in the answer box for the question that still needs information.';
function fail(label,kind='context',cause='line breaks'){const previous=kind==='previous';throw Object.assign(Error(previous?'The previous reply for '+label+' has too many '+cause+' for this Excel form. Your reply is kept. Send fewer questions or complete this answer in OWL.':'The '+label+' has too many '+cause+' for this Excel form. Your inputs are kept. Send fewer questions or use the existing Assessment editor.'),{code:previous?'owner-assessment-followup-too-large':'owner-assessment-context-too-large',field:label});}
function supported(value,label){if(typeof value!=='string'||value.length>2*1024*1024)fail(label,'context','characters');for(const char of value){const n=char.codePointAt(0);if(n<32&&![9,10,13].includes(n)||n>=0xd800&&n<=0xdfff||n===0xfffe||n===0xffff)throw Object.assign(Error('The '+label+' contains unsupported text. Your inputs are kept.'),{code:'owner-assessment-text',field:label});}return value.replace(/\r\n|\r/g,'\n');}
function freeze(v){if(v&&typeof v==='object'){Object.values(v).forEach(freeze);Object.freeze(v);}return v;}
function plan(q){
 if(!P||typeof P.profileFor!=='function'||typeof P.contextLines!=='function'||!F||typeof F.fragment!=='function')throw Error('The reviewed Assessment owner layout is unavailable.');
 if(q?.recipe!==RECIPE)throw Error('Unsupported Assessment owner layout.');const p=P.profileFor(q),keys=q.field_keys;
 if(!Array.isArray(keys)||!keys.length||keys.length>14||new Set(keys).size!==keys.length||JSON.stringify(keys)!==JSON.stringify(p.keys.filter(k=>keys.includes(k))))throw Error('Choose a canonical-order subset of this Assessment profile.');
 const rows=[],inputMap=[],readonlyCells=[],fragments=[];let lastExpansion=null;
 const add=(value,style,height,kind='locked',field='',limitLabel='')=>{const row=rows.length+1;if(row>LIMITS.cells){const cause=kind==='previous'?{label:limitLabel||field,kind}:lastExpansion||{label:limitLabel||field||'Assessment background',kind};fail(cause.label,cause.kind==='previous'?'previous':'context');}const item={row,address:'B'+row,value,style,height,kind,field};rows.push(item);if(kind==='input')inputMap.push([item.address,field]);else if(value!=='')readonlyCells.push([item.address,value]);return item.address;};
 const prose=(value,style,height,label,kind='locked',field='')=>{const text=supported(value,label),addresses=[],parts=F.fragment(text);if(parts.length>1)lastExpansion={label,kind};for(const part of parts)addresses.push(add(part,style,Math.max(height,F.lines(part)*16+4),kind,field,label));fragments.push({label,field,addresses,text});};
 const blank=(height=12)=>add('',6,height,'spacer');
 blank();prose('Owner questions',7,32,'form title');blank(8);
 prose('Saved Assessment: '+(q.subject_context.record.title||'Title not recorded'),9,28,'Assessment title');prose('Record ID: '+q.target.record_id,6,24,'Assessment Record ID');
 prose(P.contextLines(q).map(([label,value])=>label?label+': '+value:value).join('\n'),10,32,'Assessment background');
 prose(instructions,6,48,'answer instructions');prose(returnInstruction,11,32,'return instructions');blank();
 prose('Answered by',13,30,'respondent heading');prose('Your name',11,24,'respondent label');add('',19,34,'input','respondent');prose('Role or team (optional)',11,24,'team label');add('',19,34,'input','team');blank(18);
 keys.forEach((key,i)=>{const c=p.catalog.find(c=>c.key===key);if(!c)throw Error('The canonical Assessment question copy is unavailable.');const label=c.label||key;
  prose((i+1)+'. '+c.question,13,30,label+' heading','locked',key);
  prose([c.help,'When this question applies: '+c.condition,'What to enter: '+c.expected,c.mode==='draft'?'Draft scenario to review.':'Information about this assessed situation.'].join('\n\n'),10,30,label+' guidance','locked',key);
  for(let n=0;n<2;n++){if(c.exampleContexts?.[n])prose('Example '+(n+1)+' context (fictional): '+c.exampleContexts[n],18,36,label+' example context '+(n+1),'locked',key);prose('Example '+(n+1)+' (fictional): '+c.examples[n],18,36,label+' example '+(n+1),'locked',key);}
  prose('Partial answer example (fictional): '+c.pendingExample,18,40,label+' Pending example','locked',key);
  prose('Saved answer: '+(q.base_values[key]||'No saved answer'),10,30,label+' saved answer','locked',key);
  if(own(q.context,key)&&q.context[key].previousReply!=='')prose('Previous unfinished reply: '+q.context[key].previousReply,10,30,label,'previous',key);
  prose('Your answer',11,22,label+' answer label','locked',key);add('',19,86,'input',key);blank(18);
 });
 prose(footer+'\nRequest: '+q.token,10,36,'request footer');const footerAddress=rows.at(-1).address;
 if(rows.some(r=>r.height>LIMITS.height)||fragments.some(f=>f.addresses.map(a=>rows[Number(a.slice(1))-1].value).join('')!==f.text))throw Error('The protected Assessment owner layout failed its full-text check.');
 return freeze({rows,inputMap,readonlyCells,fragments,footerAddress,lastRow:rows.length});
}
return Object.freeze({RECIPE,LIMITS,plan,fragment:F.fragment,lines:F.lines});
});
