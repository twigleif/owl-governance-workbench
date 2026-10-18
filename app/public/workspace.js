(function(g,f){const api=f();if(typeof module==='object'&&module.exports)module.exports=api;else g.OWLWorkspaceLayout=api;})(globalThis,function(){
'use strict';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const paths={file:'M5 3h10l4 4v14H5z M14 3v5h5 M8 12h8 M8 16h6',risk:'M12 3l10 18H2z M12 9v5 M12 17h.01',control:'M12 3l8 3v6c0 5-8 9-8 9s-8-4-8-9V6z M8 12l3 3 5-6',arrow:'M9 5l7 7-7 7',save:'M4 3h13l4 4v14H3V3z M7 3v6h10V3 M7 21v-8h10v8',history:'M3 12a9 9 0 1 0 3-6 M3 3v5h5 M12 7v6l4 2',undo:'M9 6l-5 5 5 5 M4 11h10a6 6 0 0 1 6 6',more:'M5 12h.01 M12 12h.01 M19 12h.01',close:'M6 6l12 12 M18 6L6 18'};
const icon=k=>`<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="${paths[k]}"/></svg>`;

function create({getData,getDrafts,getError=()=>'',isBusy=()=>false,isPending=()=>false,canRetry=()=>false,isConflict=()=>false}){
let details={files:{},evidenceUses:[]};
const actions={request:'prepare-questions','show-pdf':'show-report',save:'save-review',discard:'discard-review','review-fields':'review-fields',provide:'provide-evidence',source:'source'};
const button=(text,act,cls='',attrs='')=>`<button type="button" data-action="${actions[act]||act}" class="${cls}" ${attrs}>${text}</button>`;
const inherited=button;
function basisRow(kind,compact=false){
 const data=getData(),extra={requirement:data.requirement};
 const item=kind==='requirement'?extra.requirement:kind==='risk'?data.risk:data.control;
 const title=kind==='requirement'?'Define audience before sharing':kind==='risk'?data.risk.title:data.control.name;
 const meta=kind==='requirement'?'Requirement · Applicability under review':kind==='risk'?'Risk · Evaluation not recorded':'Control · Not assessed';
 return button(`${compact?'':icon(kind==='requirement'?'file':kind==='risk'?'risk':'control')}<span><strong>${esc(title)}</strong><small>${esc(meta)}</small></span>${icon('arrow')}`,'basis','ux-basis-row',`data-kind="${kind}" aria-label="Open ${kind}"`);
}
const avatar=(person,cls='')=>`<span class="ux-avatar ux-avatar-${person} ${cls}" role="img" aria-label="Fictional sample portrait"></span>`;
function work(){
 const data=getData(),inventory={records:data.records,files:details.files||{}},available=Object.values(inventory.files).filter(f=>f.available).length;
 return`<section data-ux-surface="work" class="ux-dashboard">
 <div class="ux-dashboard-main">
  <section class="ux-hero">
   <div class="ux-task-head"><span class="ux-kicker">Next task</span><span class="ux-state">Evidence needed</span></div>
   <h2 class="ux-task-title">Review transcript access</h2>
   <p class="ux-lead">Establish who should see the transcripts, compare that with the actual permissions, and record the evidence for your review.</p>
   <div class="ux-task-actions">${inherited('Open review','review','primary')}${inherited('Prepare questions','request','ux-hero-secondary')}</div>
   <div class="ux-hero-owner">${avatar(1)}<span>${esc(data.control.owner)}<small>Control owner · ${esc(data.control.id)}</small></span><span class="ux-photo-note">Sample photo</span></div>
  </section>
  <section class="ux-panel ux-governance-panel">
   <header class="ux-panel-head"><h3>Governance basis</h3><span>Proposed relationships</span></header>
   <div class="ux-basis-grid">${basisRow('requirement')}${basisRow('risk')}${basisRow('control')}</div>
   <p class="ux-footnote">Review applicability and operating evidence before reaching a conclusion.</p>
  </section>
  <section class="ux-panel ux-related-panel"><header class="ux-panel-head"><h3>Related work</h3></header>
   <div class="ux-work-row"><div><strong>Analysis context & supporting evidence</strong><p>A separate review in this assessment.</p></div>${inherited(icon('arrow'),'other-review','icon-button','aria-label="Open analysis context review"')}</div>
   <div class="ux-work-row"><div><strong>Transcript-sharing follow-up</strong><p>Planned · ${esc(data.action.owner)}</p></div>${inherited(icon('arrow'),'action','icon-button','aria-label="Open transcript-sharing follow-up"')}</div>
  </section>
 </div>
 <aside class="ux-dashboard-aside" aria-label="Evidence and people for this task">
  <section class="ux-panel ux-evidence-panel"><header class="ux-panel-head"><h3>Evidence to collect</h3><span class="ux-count">3</span></header>
   <ul class="ux-needs"><li>Intended audience<small>Collection, recipients and sharing boundary.</small></li><li>Actual access configuration<small>User, organization and public-sharing grants.</small></li><li>Method and performed check<small>How access was checked, and the retained result.</small></li></ul>
   <div class="ux-panel-foot">${inherited('Open evidence inventory','evidence','ux-link')}<span>${available} of ${inventory.records.length} source files available</span></div>
  </section>
  <section class="ux-panel ux-people-panel"><header class="ux-panel-head"><h3>People involved</h3><span>Sample photos</span></header>
   <div class="ux-person-row">${avatar(1)}<div><strong>${esc(data.control.owner)}</strong><small>Access configuration & performed check</small></div></div>
   <div class="ux-person-row">${avatar(2)}<div><strong>${esc(data.action.owner)}</strong><small>Evidence follow-up</small></div></div>
   ${inherited('View responsibilities','people','ux-link')}
  </section>
  <section class="ux-panel ux-deliverable-panel"><header class="ux-panel-head"><h3>Saved deliverable</h3><span class="tag">Draft</span></header>
   <div class="ux-deliverable-title">${icon('file')}<div><strong>Transcript access brief</strong><small>Assessment r${data.assessment.revision} · 4 pages</small></div></div>
   ${inherited('View PDF','show-pdf','ux-link')}<p class="ux-footnote">Focused brief · review remains Not reviewed.</p>
  </section>
 </aside>
 </section>`;
}
function reviewEvidence(){const data=getData(),uses=(details.evidenceUses||[]).filter(u=>u.item_type==='Review item'&&u.item_id===data.review.id);return uses.length?uses.map(u=>'<div class="ux-context-note">'+button(esc(data.records.find(r=>r.id===u.record_id)?.title||u.record_id),'source','ux-link','data-id="'+esc(u.record_id)+'"')+'<p>'+esc(u.claim)+'</p><small>'+esc(u.locator||'Locator not recorded')+' · '+esc(u.draft?'Example draft link · not saved':u.result)+'</small></div>').join(''):'<p class="ux-context-note">No evidence use is linked to this access review in the saved case.</p>'; }
function review(){
 const data=getData(),drafts=getDrafts(),s={draftRationale:drafts.rationale,savedRationale:data.review.result_rationale,revision:data.assessment.revision},r=data.review;
 return`<section data-ux-surface="review"><div class="ux-review-layout"><div class="ux-review-main"><div class="j-review-heading"><span class="ux-kicker">Transcript access</span>${inherited(icon('history')+'History','history','quiet','data-subject="'+esc(r.id)+'"')}</div><h2>Review the sharing check</h2><span class="ux-state">${esc(r.result)}</span><p class="ux-review-question">${esc(r.question)}</p><p class="ux-review-id">${esc(r.id)} · Assessment r${s.revision}</p><div class="ux-evidence-note">The intended audience, actual grants and performed check are still missing. Available planning material does not establish operating access.</div><div class="ux-evidence-actions">${button('Provide evidence','provide','primary')}${inherited('Prepare questions','request','ux-link')}</div><div class="field"><label for="rationale" tabindex="0" title="Explain the scoped result and limitations supported by the exact evidence. Saving text does not complete the review.">Review rationale</label><textarea id="rationale" data-field="rationale" placeholder="Record your reasoning and what remains unresolved…">${esc(s.draftRationale)}</textarea><span class="hint">Save records your rationale without finalizing the review.</span></div><div class="field"><label>Material uncertainty</label><p class="read-value">${esc(r.uncertainty)}</p></div><div id="save-error" role="alert">${getError()?`<div class="error-strip"><strong>Couldn’t save</strong><p>${esc(getError())}</p>${isPending()?button('Check saved result','check-save','ux-link'):isConflict()?button('Review saved values','review-compare','ux-link'):''}</div>`:''}</div>${button('All saved review fields','review-fields','ux-link ux-all-fields')}<div class="j-editor-actions">${inherited('Discard changes','discard','quiet',isBusy()||isPending()||s.draftRationale===s.savedRationale?'disabled':'')}<div class="j-editor-save"><span id="save-status" class="j-save-state" role="status" aria-live="polite">${isPending()?'Checking save…':isBusy()?'Saving…':s.draftRationale!==s.savedRationale?'Unsaved changes':'Saved'}</span>${inherited(icon('save')+'Save','save','primary',isBusy()||isPending()&&!canRetry()?'disabled':'')}</div></div></div><aside class="ux-review-aside"><h3>Review basis</h3>${basisRow('requirement',true)}${basisRow('risk',true)}${basisRow('control',true)}<p class="ux-context-note">Relationships remain Proposed. Applicability and implementation keep their recorded state.</p><h3 style="margin-top:28px">Evidence</h3>${reviewEvidence()}${inherited('Open inventory →','evidence','ux-link','style="font-size:11px;margin-top:10px"')}<h3 style="margin-top:28px">Follow-up</h3>${inherited('Evidence request →','action','ux-link','style="font-size:11px"')}<p class="ux-context-note">${esc(data.action.id)} · no request sent.</p></aside></div></section>`;
}
return{work,review,avatar,icon,basisRow,setDetails:value=>{details=value;},profile:()=>'<div class="ux-profile" title="Fictional portrait for the design; no account or identity is created.">'+avatar(0)+'<span>Operator<small>Sample profile</small></span></div>'};
}
return{create};
});
