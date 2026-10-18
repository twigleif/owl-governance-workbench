'use strict';
window.OWLWorkingEditing={mount(o){
 const {esc,button:b,icon,show,close}=o;let current='',notice='',compare=false;
 const configs={
  organization:{title:'Organization context',subject:'organization-context',hint:'Shared context for your AI systems.',fields:[['context','Organization context','Describe your organization, activities and operating locations.'],['responsibility','Governance responsibility · optional','Assigned roles and their authority or delegation limits, when known.']]},
  scope:{title:'Review AIMS scope',subject:'organization-scope',hint:'Saving a draft does not issue or approve it.',fields:[['scope','Scope boundary','Organizations, activities, AI systems and exclusions covered by this intended scope.']]},
  system:{title:'System context',subject:()=>o.getData().system.system_id,hint:'Docent · existing saved system.',fields:[['purpose','Intended purpose','Use the actual purpose and operating context.'],['owner','System owner','Leave blank when unknown. Saved as Unassigned.']]},
  request:{title:'Evidence request draft',subject:'saved-request',hint:'Saving does not send a request or complete the Action.',fields:[['request','Questions for the responsible owner','Keep unanswered information visible.']]},
  review:{title:'Review rationale',subject:()=>o.getData().review.id,hint:'Saving text does not complete or approve the review.',fields:[['rationale','Review rationale','Explain the scoped result and limitations supported by the exact evidence.']]}
 };
 const subject=kind=>typeof configs[kind].subject==='function'?configs[kind].subject():configs[kind].subject;
 function fields(kind){const d=o.getDrafts();return configs[kind].fields.map(([key,label,hint])=>`<div class="j-field"><label for="${key==='context'?'j-organization-context':key==='responsibility'?'j-organization-responsibility':'j-edit-'+key}">${label}</label><textarea id="${key==='context'?'j-organization-context':key==='responsibility'?'j-organization-responsibility':'j-edit-'+key}" data-field="${key}" maxlength="${key==='owner'?300:2000}" aria-describedby="j-edit-${key}-hint">${esc(d[key])}</textarea><small id="j-edit-${key}-hint">${esc(hint)}</small></div>`).join('');}
 function draw(){
  const cfg=configs[current],problem=notice||o.getError(current),pending=o.hasPending(),dirty=o.dirty(current),draft=o.getDrafts(),saved=o.saved();
  const comparison=compare?`<section class="j-org-comparison"><h3>Review saved values</h3>${cfg.fields.filter(([key])=>draft[key]!==saved[key]).map(([key,label])=>`<div class="j-org-comparison-row"><h4>${esc(label)}</h4><div><span>Saved</span><p>${esc(saved[key]||'Empty')}</p></div><div><span>Your draft</span><p>${esc(draft[key]||'Empty')}</p></div></div>`).join('')}<div class="j-actions">${b('Use saved values','editor-use-saved')}${b('Keep my edits','editor-keep-mine')}</div><p class="j-fine">Choose which values to keep, then use Save when ready.</p></section>`:'';
  const error=problem?`<div class="j-org-save-error" role="alert"><p>${esc(problem)}</p>${pending?b('Check saved result','editor-check','link-button'):o.isConflict(current)&&!compare?b('Review saved values','editor-compare','link-button'):''}</div>`:'';
  const footer=`${b('Discard changes','editor-discard','quiet',dirty&&!pending&&!o.isBusy()?'':'disabled')}<div class="j-org-save-actions"><span id="editor-save-status" class="j-save-state" role="status" aria-live="polite">${pending?'Checking save…':o.isBusy()?'Saving…':dirty?'Unsaved changes':'Saved'}</span>${b(icon('save')+(pending?'Retry same Save':'Save'),'editor-save','primary',(pending&&!o.canRetry())||o.isBusy()?'disabled':'')}</div>`;
  const header=b(icon('history')+'History','history','quiet',`data-subject="${esc(subject(current))}"`);
  const node=show(cfg.title,`<p class="small muted">${esc(cfg.hint)}</p><div class="j-form">${fields(current)}</div>${error}${comparison}`,footer,'editor',header);
  node.dataset.editor=current;node.classList.add('j-org-editor');node.querySelector('textarea')?.focus({preventScroll:true});
 }
 function open(kind,comparison=false){if(!configs[kind])throw Error('Choose an existing editor.');current=kind;notice='';compare=comparison;o.begin(kind);draw();}
 async function submit(){
  const d=o.getDrafts();notice='';if(!o.hasPending()&&current==='organization'&&!d.context.trim())notice='Enter organization context before saving. Your other edits are kept.';
  if(!o.hasPending()&&current==='scope'&&!d.scope.trim())notice='Describe the intended AIMS boundary before saving. Your edits are kept.';
  if(notice){draw();return;}
  if(await o.save(current)){close();o.render();}else draw();
 }
 function sync(){const node=document.querySelector('[data-editor]');if(!node)return;const kind=node.dataset.editor,dirty=o.dirty(kind),pending=o.hasPending(),status=node.querySelector('#editor-save-status');if(status)status.textContent=pending?'Checking save…':o.isBusy()?'Saving…':dirty?'Unsaved changes':'Saved';node.querySelectorAll('[data-action="editor-save"],[data-action="editor-discard"]').forEach(n=>n.disabled=o.isBusy()||(pending&&(n.dataset.action==='editor-discard'||!o.canRetry()))||(n.dataset.action==='editor-discard'&&!dirty));}
 document.addEventListener('click',async e=>{const n=e.target.closest('[data-action]');if(!n||n.disabled||!n.dataset.action.startsWith('editor-'))return;e.preventDefault();try{
  if(n.dataset.action==='editor-save')await submit();
  if(n.dataset.action==='editor-discard'){o.discard(current);notice='';compare=false;draw();}
  if(n.dataset.action==='editor-compare'){await o.refresh();compare=true;draw();}
  if(n.dataset.action==='editor-use-saved'){o.discard(current);notice='';compare=false;draw();}
  if(n.dataset.action==='editor-keep-mine'){o.rebase(current);notice='';compare=false;draw();}
  if(n.dataset.action==='editor-check'){if(await o.recheck()){close();o.render();}else draw();}
 }catch(error){notice=error.message;draw();}});
 document.addEventListener('keydown',e=>{if(document.querySelector('[data-editor]')&&(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='s'){e.preventDefault();if(!o.isBusy()&&(!o.hasPending()||o.canRetry()))void submit();}});
 return{open,sync,current:()=>document.querySelector('[data-editor]')?.dataset.editor||'',subject};
}};
