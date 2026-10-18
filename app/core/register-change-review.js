/* Read-only change presentation for the isolated Register UX specimen.
 * Callers supply exact saved snapshots; this module never reads or saves records. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.OWLRegisterChangeReview=api;})(globalThis,function(){
 'use strict';
 const own=(o,k)=>Object.prototype.hasOwnProperty.call(o||{},k);
 const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const tokenize=text=>text.match(/[\p{L}\p{N}\p{M}_]+|\s+|[^\p{L}\p{N}\p{M}_\s]/gu)||[];
 function diffText(before,after,{atomic=false}={}){
  if(typeof before!=='string'||typeof after!=='string')throw Error('Compare exact text values.');
  if(before===after)return {before:[{kind:'same',text:before}],after:[{kind:'same',text:after}],mode:'same'};
  const a=tokenize(before),b=tokenize(after);
  if(atomic||a.length*b.length>65536||a.length>1024||b.length>1024)return {before:before?[{kind:'removed',text:before}]:[],after:after?[{kind:'added',text:after}]:[],mode:'value'};
  const matrix=Array.from({length:a.length+1},()=>new Uint16Array(b.length+1));
  for(let i=a.length-1;i>=0;i--)for(let j=b.length-1;j>=0;j--)matrix[i][j]=a[i]===b[j]?matrix[i+1][j+1]+1:Math.max(matrix[i+1][j],matrix[i][j+1]);
  const left=[],right=[];let i=0,j=0;
  const push=(parts,kind,text)=>{const last=parts[parts.length-1];if(last?.kind===kind)last.text+=text;else parts.push({kind,text});};
  while(i<a.length&&j<b.length){if(a[i]===b[j]){push(left,'same',a[i]);push(right,'same',b[j]);i++;j++;}else if(matrix[i+1][j]>=matrix[i][j+1])push(left,'removed',a[i++]);else push(right,'added',b[j++]);}
  while(i<a.length)push(left,'removed',a[i++]);while(j<b.length)push(right,'added',b[j++]);
  return {before:left,after:right,mode:'words'};
 }
 function compare(fields,before,after,{draft={},editedFields=[]}={}){
  const changes=[],unavailable=[],privateOnly=[];
  for(const field of fields){const key=field.key;if(!own(before,key)||!own(after,key)||typeof before[key]!=='string'||typeof after[key]!=='string'){unavailable.push(field);continue;}
   const changed=before[key]!==after[key],hasDraft=editedFields.includes(key)&&own(draft,key)&&draft[key]!==after[key];
   if(hasDraft&&typeof draft[key]!=='string')throw Error('Private comparison values must remain exact text.');
   if(changed)changes.push({...field,before:before[key],after:after[key],state:before[key]===''?'Added':after[key]===''?'Cleared':'Changed',diff:diffText(before[key],after[key],{atomic:field.type!=='text'}),...(hasDraft?{draft:draft[key]}:{})});
   else if(hasDraft)privateOnly.push({...field,draft:draft[key]});
  }
  return {changes,unavailable,privateOnly};
 }
 function marked(parts,empty){if(empty)return '<span class="review-empty">Empty</span>';return parts.map(p=>p.kind==='same'?escape(p.text):p.kind==='added'?'<ins class="review-added">'+escape(p.text)+'</ins>':'<del class="review-removed">'+escape(p.text)+'</del>').join('');}
 function render(result){
  const rows=result.changes.map(c=>'<tr data-change-field="'+escape(c.key)+'"><th scope="row"><span>'+escape(c.label)+'</span><small class="review-kind" data-change-kind="'+c.state+'">'+c.state+'</small></th><td class="review-value" data-previous="'+escape(c.key)+'">'+marked(c.diff.before,c.before==='')+'</td><td class="review-value" data-saved="'+escape(c.key)+'">'+marked(c.diff.after,c.after==='')+'</td></tr>'+(own(c,'draft')?'<tr class="review-draft" data-draft-field="'+escape(c.key)+'"><td colspan="3"><span class="review-draft-label">Your unsaved edit · '+escape(c.label)+'</span><div class="review-value" data-private-value="'+escape(c.key)+'">'+(c.draft===''?'<span class="review-empty">Empty</span>':escape(c.draft))+'</div></td></tr>':'')).join('');
  const table=rows?'<div class="review-table-wrap"><table class="review-table"><thead><tr><th>Field</th><th>Previous</th><th>Saved</th></tr></thead><tbody>'+rows+'</tbody></table></div>':'<p class="review-empty">'+(result.unavailable.length?'No comparable saved changes.':'No saved values changed.')+'</p>';
  const unavailable=result.unavailable.length?'<p class="review-limitation">Previous or saved values are unavailable for '+result.unavailable.map(f=>escape(f.label)).join(', ')+'. No change is inferred for those fields.</p>':'';
  const privateOnly=result.privateOnly.length?'<div class="review-other-drafts"><strong>Other unsaved edits</strong>'+result.privateOnly.map(c=>'<div data-private-only="'+escape(c.key)+'"><span class="review-draft-label">'+escape(c.label)+'</span><div class="review-value">'+escape(c.draft)+'</div></div>').join('')+'</div>':'';
  return unavailable+table+privateOnly;
 }
 return Object.freeze({diffText,compare,render,escape});
});
