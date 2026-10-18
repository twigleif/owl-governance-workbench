'use strict';
window.OWLWorkingActivity={mount({api,show,button,esc,icon,returnToEditor}){
 let scope='all',subject='',query='',type='all',returnKind='',events=[],total=0,nextOffset=null,sequence=0,active=false;
 const activityTypes=[['all','All activity'],['updated','Updated'],['created','Created'],['deleted','Deleted'],['restored','Restored'],['exports','PDF exports'],['other','Other activity']];
 const b=(text,action,extra='')=>`<button type="button" data-activity-action="${action}" ${extra}>${text}</button>`;
 const time=value=>value?value.replace('T',' · ').replace(/\.\d+Z$/,' UTC'):'Time not recorded';
 function rows(){return events.length?events.map(h=>`<button class="j-activity-row" data-activity-action="detail" data-id="${esc(h.id)}"><span class="j-activity-symbol">${icon(h.action==='export'?'file':'edit')}</span><span class="j-activity-description"><strong>${esc(h.title)}</strong><small>${esc(h.actor||'Operator not recorded')} · ${esc(h.scope==='organization'?'Organization':'Docent')} · ${esc(h.source)}</small></span><span class="j-activity-time"><time>${esc(time(h.at))}</time><small>${h.revision===null?'Revision not recorded':'Workspace r'+h.revision}</small></span>${icon('chevron')}</button>`).join(''):`<div class="j-empty"><h3>No matching saved changes</h3><p>${type!=='all'||query||scope!=='all'?'Try another activity type, scope or search term. All saved entries are kept.':'Saved edits and lifecycle events appear here. Unsaved typing and unchanged saves do not create change entries.'}</p></div>`;}
 function footer(){return(returnKind?b('Back to editor','return'):'')+button('Close','close');}
 function view(message=''){
  const fixed=!!subject,title=subject==='organization-context'?'Organization context history':subject==='organization-scope'?'AIMS scope history':fixed?'Record history':'Activity log';
  const node=show(title,`<p class="small muted">${fixed?'Saved changes for this record.':'Saved activity across this workspace.'} Select an entry to see what changed.</p><div class="j-activity-filters">${!fixed?`<div class="j-activity-scopes">${[['all','All work'],['organization','Organization'],['docent','Docent']].map(([key,label])=>b(label,'scope',`data-scope="${key}" aria-pressed="${scope===key}"`)).join('')}</div>`:''}<select id="j-activity-type" aria-label="Activity type">${activityTypes.map(([value,label])=>`<option value="${value}" ${type===value?'selected':''}>${label}</option>`).join('')}</select><input id="j-activity-search" maxlength="200" aria-label="Search activity" placeholder="Find a change" value="${esc(query)}"></div>${message?`<div class="j-org-save-error" role="alert">${esc(message)}${b('Try again','reload')}</div>`:''}<div id="j-activity-list">${rows()}</div><div id="j-activity-pagination">${nextOffset!==null?b('Load more','more'):''}<p class="j-fine">${events.length} of ${total} entries · saved on this device. Historical metadata that was not recorded is not inferred.</p></div>`,footer(),'activity');
  node.dataset.activity='list';active=true;window.OWLPreviewPopups.cleanup(()=>{active=false;sequence++;});
 }
 async function load(append=false){
  if(append&&nextOffset===null)return;
  const ticket=++sequence,offset=append?nextOffset:0;
  const currentList=document.getElementById('j-activity-list'),pagination=document.getElementById('j-activity-pagination');
  currentList?.setAttribute('aria-busy','true');pagination?.querySelectorAll('button').forEach(n=>n.disabled=true);
  if(!append){events=[];total=0;nextOffset=null;if(currentList)currentList.innerHTML='';if(pagination)pagination.innerHTML='';}
  try{const result=await api('/api/activity?'+new URLSearchParams({scope,subject,q:query,type,offset:String(offset||0)}));if(ticket!==sequence||!active)return;events=append?[...events,...result.events]:result.events;total=result.total;nextOffset=result.nextOffset;
   const list=document.getElementById('j-activity-list');if(list){list.setAttribute('aria-busy','false');list.innerHTML=rows();document.querySelector('[data-activity="list"] .j-org-save-error')?.remove();document.getElementById('j-activity-pagination').innerHTML=(nextOffset!==null?b('Load more','more'):'')+`<p class="j-fine">${events.length} of ${total} entries · saved on this device. Historical metadata that was not recorded is not inferred.</p>`;}
  }catch(e){if(ticket===sequence&&active)view(e.message);}
 }
 async function open(selected='',origin=''){subject=selected;scope='all';query='';type='all';returnKind=origin;events=[];total=0;nextOffset=null;view();await load();}
 async function detail(id){
  const ticket=++sequence;
  try{const h=await api('/api/activity/event?id='+encodeURIComponent(id));if(ticket!==sequence||!active)return;
   const fields=h.items.map((i,index)=>({key:'field'+index,label:i.title,type:i.atomic?'value':'text'})),before={},after={};h.items.forEach((i,index)=>{if(typeof i.before==='string')before['field'+index]=i.before;if(typeof i.after==='string')after['field'+index]=i.after;});
   const comparison=fields.length?window.OWLRegisterChangeReview.render(window.OWLRegisterChangeReview.compare(fields,before,after)):'<p class="small muted">This event did not edit wording. Its saved basis is recorded below.</p>';
   const node=show(h.title,`<div class="j-activity-meta"><span>${esc(h.actor||'Operator not recorded')}</span><time>${esc(time(h.at))}</time><span>${esc(h.source)}</span><span>${h.revision===null?'Revision not recorded':'Workspace r'+h.revision}</span></div><div class="j-activity-legend"><span>− Removed</span><span>+ Added</span></div>${comparison}${h.note?`<p class="j-note">${esc(h.note)}</p>`:''}<p class="j-fine">${esc(h.subjects.join(' · '))}</p>`,b('Back to history','back')+button('Close','close'),'activity');node.dataset.activity='detail';active=true;
  }catch(e){if(ticket===sequence&&active)view(e.message);}
 }
 document.addEventListener('click',e=>{const n=e.target.closest('[data-activity-action]');if(!n||n.disabled)return;e.preventDefault();const a=n.dataset.activityAction;if(a==='detail')void detail(n.dataset.id);if(a==='back'){if(!window.OWLPreviewPopups.resume(n=>n.dataset.activity==='list')){view();void load();}}if(a==='scope'){scope=n.dataset.scope;view();void load();}if(a==='reload')void load();if(a==='more')void load(true);if(a==='return'){active=false;sequence++;if(!window.OWLPreviewPopups.resume(()=>true))returnToEditor(returnKind);}});
 document.addEventListener('input',e=>{if(e.target.id!=='j-activity-search')return;query=e.target.value;void load();});
 document.addEventListener('change',e=>{if(e.target.id!=='j-activity-type'||!activityTypes.some(([key])=>key===e.target.value))return;type=e.target.value;void load();});
 return{open,close:()=>{active=false;sequence++;}};
}};
