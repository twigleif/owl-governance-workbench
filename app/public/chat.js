(function(){
'use strict';
window.OWLWorkingChat={mount({api,getData,onSaved,openSource,show,openRequest,useLegacy}){
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const paths={close:'M6 6l12 12M18 6L6 18',new:'M12 5v14M5 12h14',history:'M3 12a9 9 0 1 0 3-6M3 3v5h5M12 7v5l4 2',send:'M12 19V5M6 11l6-6 6 6',stop:'M7 7h10v10H7z',attach:'M8 12l6-6a3 3 0 0 1 4 4l-8 8a5 5 0 0 1-7-7l8-8',check:'M5 12l4 4L19 6'};
  const icon=name=>`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${paths[name]}"/></svg>`;
  const btn=(text,act,cls='',extra='')=>`<button type="button" data-chat-action="${act}" class="${cls}" ${extra}>${text}</button>`;
  const ib=(label,act,name,cls='')=>btn(icon(name),act,'chat-icon '+cls,`aria-label="${label}" title="${label}"`);
  const prose=text=>esc(text).split(/\n\s*\n/).map(p=>'<p>'+p.replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br>')+'</p>').join('');
  const labels={'SIM-DOCENT-REC-PUBLIC-001':'Public context','SIM-DOCENT-REC-BASE-001':'Feature baseline','SIM-DOCENT-REC-PLAN-001':'Pilot plan'};
  const drawer=document.createElement('dialog');drawer.className='owl-chat-drawer';drawer.setAttribute('aria-label','Chat with OWL');document.body.append(drawer);
  let current=null,catalog={conversations:[],legacy:[]},history=false,legacy=null,notice='',loading=false,sending=false,opener=null,closing=false;
  const composers=new Map(),composerSaved=new Map(),drafts=new Map(),polls=new Set();
  const active=()=>current?.turns.find(t=>t.status==='running');
  const local=t=>{if(!drafts.has(t.id))drafts.set(t.id,{text:t.draft.text,version:t.draft.version,editing:false,dirty:false,error:'',pending:null});return drafts.get(t.id);};
  function accept(c){current=c;try{sessionStorage.setItem('owl-current-chat',c.id);}catch{}composerSaved.set(c.id,c.composer);if(!composers.has(c.id))composers.set(c.id,c.composer);for(const t of c.turns){const d=drafts.get(t.id);if(d&&!d.dirty&&!d.pending){d.text=t.draft.text;d.version=t.draft.version;}}}
  async function refresh(id=current?.id){if(id){const c=await api('/api/chat?id='+encodeURIComponent(id));if(current?.id===id)accept(c);return c;}}
  async function load(){catalog=await api('/api/chats');let preferred;try{preferred=sessionStorage.getItem('owl-current-chat');}catch{}if(!current&&catalog.conversations.length)accept(await api('/api/chat?id='+(catalog.conversations.find(c=>c.id===preferred)||catalog.conversations[0]).id));}
  async function create(){accept(await api('/api/chat/create',{id:crypto.randomUUID()}));composers.set(current.id,'');legacy=null;history=false;}
  function sourceButtons(ids){return ids.map(id=>btn(esc(labels[id]||id)+' · source','source','chat-source-count',`data-source="${esc(id)}"`)).join('');}
  function turnHTML(t){
    let body='';
    if(t.status==='running')body='<p class="chat-progress" role="status">Reviewing Docent’s saved context…</p>';
    else if(t.status!=='ready')body=`<p class="chat-inline-error" role="alert">${esc(t.error||'OWL could not confirm the reply. Your message is saved. Check this conversation before sending again.')}</p>`;
    else{
      body=prose(t.result.output.reply);const d=local(t);
      if(t.result.output.questions.length){const saved=t.draft.saved&&!d.dirty&&!d.editing;
        body+=`<section class="chat-inline-draft" aria-label="Evidence question draft">${d.editing?`<label class="sr-only" for="draft-${t.id}">Edit evidence questions</label><textarea class="chat-inline-edit" id="draft-${t.id}" data-chat-draft="${t.id}" maxlength="2000">${esc(d.text)}</textarea>`:`<ol>${d.text.split('\n\n').map(q=>`<li>${esc(q)}</li>`).join('')}</ol>`}<div class="chat-inline-actions">${saved?`<span class="chat-inline-saved" role="status">${icon('check')} Saved</span>`:btn(d.pending?'Check save':'Save request draft','save','chat-primary',`data-id="${t.id}"`)}${btn(d.editing?'Done editing':'Edit draft','edit','chat-text',`data-id="${t.id}"`)}</div>${d.error?`<p class="chat-inline-error" role="alert">${esc(d.error)}</p>${btn('Open saved request','saved-request','chat-text')}`:''}</section><p class="chat-scope-note">The questions stay here as a draft. Nothing is sent to another person.</p>`;
      }
      body+=sourceButtons(t.result.output.source_ids);
      if(t.result.basis.workspaceRevision!==getData().revision)body+='<p class="chat-scope-note">The saved context has changed since this reply. Review the current task before using its draft.</p>';
    }
    return`<article class="chat-turn"><div class="chat-user">${esc(t.user)}</div><div class="chat-reply"><span class="chat-speaker">OWL</span>${body}</div></article>`;
  }
  function render({follow=false,focus=false}={}){
    const old=drawer.querySelector('.chat-body'),scroll=old?.scrollTop||0,nearEnd=old?old.scrollHeight-old.clientHeight-scroll<80:true;
    const focused=document.activeElement?.id==='chat-message'?{start:document.activeElement.selectionStart,end:document.activeElement.selectionEnd}:null;
    const body=loading?'<p class="chat-progress" role="status">Opening conversation…</p>':history?`<section class="chat-history"><h3>Conversations</h3>${catalog.conversations.map(c=>btn(esc(c.title),'select','',`data-id="${c.id}"`)).join('')}${catalog.legacy.length?`<h3 class="section-gap">Earlier tasks</h3>${catalog.legacy.map(r=>btn('Evidence questions · r'+r.basis_revision,'legacy','',`data-id="${r.id}"`)).join('')}`:''}</section>`:legacy?legacyHTML():current?.turns.length?current.turns.map(turnHTML).join(''):`<div class="chat-welcome"><h2>How can I help?</h2><p>Ask about Docent or prepare your next piece of work.</p>${btn('What needs my attention?','start','chat-suggestion')}</div>`;
    const busy=!!active()||sending;
    drawer.innerHTML=`<header class="chat-header"><div class="chat-brand"><span class="chat-dot"></span><h2>OWL</h2></div><div class="chat-header-tools">${ib('Conversation history','history','history')}${ib('New conversation','new','new')}${ib('Close chat','close','close')}</div></header><div class="chat-body" role="log" aria-label="Conversation" tabindex="0">${body}</div><footer class="chat-footer">${notice?`<p class="chat-inline-error" role="alert">${esc(notice)}</p>`:''}<div class="chat-composer"><label class="sr-only" for="chat-message">Message OWL</label><textarea id="chat-message" rows="2" maxlength="2000" placeholder="Ask OWL…" ${busy||loading||legacy?'disabled':''}>${esc(current?composers.get(current.id)||'':'')}</textarea><div class="chat-composer-tools"><div>${ib('View conversation context','context','attach')}${btn('Docent','context','chat-context-pill')}</div>${busy&&active()?ib('Stop response','stop','stop','chat-send'):ib('Send message','send','send','chat-send')}</div></div><p class="chat-preview-note">${legacy?'Earlier task · use New conversation to continue':'Codex · messages, chat drafts and Docent context go to OpenAI'}</p></footer>`;
    const next=drawer.querySelector('.chat-body');next.scrollTop=follow||nearEnd?next.scrollHeight:scroll;
    if(drawer.open&&(focus||focused)&&!busy&&!legacy){const input=drawer.querySelector('#chat-message');input.focus({preventScroll:true});if(focused)input.setSelectionRange(focused.start,focused.end);}
  }
  function legacyHTML(){const r=legacy.result?JSON.parse(legacy.result):null;return`<div class="chat-reply"><span class="chat-speaker">Earlier task · workspace r${legacy.basis_revision}</span>${r?.draft?prose(r.draft.summary)+`<ol>${r.draft.questions.map(q=>`<li>${esc(q)}</li>`).join('')}</ol>`+btn('Use in request draft','use-legacy','chat-text')+sourceButtons(r.draft.source_ids):`<p>${esc(r?.message||'This task was not confirmed. No automatic retry was made.')}</p>`}</div>`;}
  async function persistComposer(){if(!current||legacy)return;const value=composers.get(current.id)||'';if(value===composerSaved.get(current.id))return;const id=current.id,c=await api('/api/chat/composer',{id:crypto.randomUUID(),conversationId:id,expectedVersion:current.composer_version,text:value});if(current?.id===id)accept(c);composerSaved.set(id,value);}
  async function persistEdits(){if(!current)return;for(const t of current.turns){const d=local(t);if(d.dirty){const changed=await api('/api/chat/edit',{id:crypto.randomUUID(),turnId:t.id,expectedVersion:d.version,text:d.text});d.version=changed.draft.version;d.dirty=false;d.editing=false;} }await refresh();}
  async function close(){if(closing)return;closing=true;try{await persistEdits();await persistComposer();drawer.close();if(opener?.isConnected)opener.focus();}catch(e){notice=e.message;render();}finally{closing=false;}}
  async function open({message='',sendNow=false,showHistory=false}={}){
    if(!drawer.open)opener=document.activeElement;loading=true;history=false;notice='';render();if(!drawer.open)drawer.showModal();
    try{await load();if(!current)await create();else await refresh();legacy=null;history=showHistory;loading=false;render({focus:!showHistory});resumePolls();if(message){composers.set(current.id,message);if(sendNow)await send();else render({focus:true});}}catch(e){loading=false;notice=e.message;render();}
  }
  function resumePolls(){for(const t of current?.turns||[])if(t.status==='running')poll(t.id,current.id);}
  function poll(id,conversationId){if(polls.has(id))return;polls.add(id);async function check(){try{const t=await api('/api/chat/turn?id='+id);if(!t)throw Error('The saved response could not be found. Open conversation history.');if(t.status==='running'){setTimeout(check,900);return;}polls.delete(id);if(current?.id===conversationId){await refresh(conversationId);render({follow:true,focus:true});}}catch(e){polls.delete(id);notice=e.message+' Your message is saved. Reopen the conversation to check its result.';render();}}setTimeout(check,500);}
  async function send(){if(sending||active()||legacy||!current)return;const value=composers.get(current.id)||'';if(!value.trim())return;sending=true;notice='';const c=current,id=crypto.randomUUID(),expectedRevision=current.revision;render();
    try{await persistEdits();const request={id,conversationId:c.id,text:value,expectedRevision};let t;
      try{t=await api('/api/chat/send',request);}catch(e){const proof=await api('/api/chat/turn?id='+id);if(!proof)throw e;t=proof;}
      composers.set(c.id,'');composerSaved.set(c.id,'');await refresh(c.id);poll(t.id,c.id);
    }catch(e){notice=e.message+' Your message is kept. No automatic retry was made.';}finally{sending=false;render({follow:true,focus:true});}
  }
  async function saveDraft(t){const d=local(t);if(!d.text.trim()){d.error='Enter the questions before saving.';render();return;}
    if(!d.pending)d.pending={id:crypto.randomUUID(),command:'save_chat_request',expectedRevision:t.draft.basis.revision,expectedDraftRevision:t.draft.basis.draftRevision,values:{turnId:t.id,expectedVersion:d.version,text:d.text}};
    try{
      const proof=await api('/api/operation?id='+d.pending.id);if(!proof.receipt)await api('/api/command',d.pending);
      d.pending=null;d.error='';d.dirty=false;d.editing=false;await refresh();await onSaved();render();
    }catch(e){
      try{const proof=await api('/api/operation?id='+d.pending.id);if(proof.receipt){d.pending=null;d.error='';d.dirty=false;d.editing=false;await refresh();await onSaved();render();return;}}catch{}
      if(e.code&&['workspace-conflict','chat-conflict','invalid-command'].includes(e.code))d.pending=null;
      d.error=e.message+' Your edits are kept.';render();
    }
  }
  async function context(){await persistEdits();const c=await api('/api/chat/context?id='+current.id);show('Conversation context',`<p class="small">Sending a message shares its text, this conversation’s previous replies and in-chat draft edits with OpenAI through your signed-in Codex account.</p><p class="small section-gap">Other organization notes, owner details, private review rationale and unrelated saved request text stay outside the automatic context.</p><h3 class="section-gap">Selected Docent context</h3><pre class="source-text">${esc(JSON.stringify(c.basis,null,2))}</pre><h3 class="section-gap">Conversation sent with your next message</h3><pre class="source-text">${esc(JSON.stringify({history:c.history,message:composers.get(current.id)||'Your next message'},null,2))}</pre><h3 class="section-gap">Eligible sources</h3>${c.sources.map(s=>`<p class="small section-gap">${esc(s.record.title)} · ${esc(s.record.version)}<br>${esc(s.limitation)}</p>`).join('')}<p class="small section-gap">One task per Send, up to120 seconds and24 messages per conversation. Shared Codex limits apply. A missing or unconfirmed reply is not retried automatically.</p>`);}
  drawer.addEventListener('input',e=>{if(e.target.id==='chat-message'&&current)composers.set(current.id,e.target.value);const id=e.target.dataset.chatDraft;if(id&&current){const t=current.turns.find(t=>t.id===id),d=local(t);d.text=e.target.value;d.dirty=true;d.error='';}});
  drawer.addEventListener('keydown',e=>{if(e.target.id==='chat-message'&&e.key==='Enter'&&!e.shiftKey&&!e.isComposing){e.preventDefault();send();}});
  drawer.addEventListener('click',async e=>{const n=e.target.closest('[data-chat-action]');if(!n)return;try{
    const t=current?.turns.find(t=>t.id===n.dataset.id);switch(n.dataset.chatAction){
    case'close':await close();break;case'send':await send();break;case'start':composers.set(current.id,'What needs my attention for Docent?');await send();break;
    case'new':await persistEdits();await persistComposer();await create();notice='';render({focus:true});break;
    case'history':await persistEdits();await persistComposer();await load();history=!history;legacy=null;render();break;
    case'select':await persistEdits();await persistComposer();accept(await api('/api/chat?id='+n.dataset.id));legacy=null;history=false;notice='';render({focus:true});resumePolls();break;
    case'legacy':await persistComposer();legacy=await api('/api/run?id='+n.dataset.id);history=false;render();break;
    case'use-legacy':await close();useLegacy(legacy);break;
    case'context':await context();break;case'source':await openSource(n.dataset.source);break;
    case'edit':{const d=local(t);if(d.pending){d.error='Check the outstanding Save before changing this draft.';render();break;}if(d.editing){await persistEdits();d.editing=false;render();}else{d.editing=true;render();drawer.querySelector('[data-chat-draft="'+t.id+'"]').focus();}break;}
    case'save':await saveDraft(t);break;
    case'saved-request':openRequest();break;
    case'stop':{const running=active();if(running){await api('/api/chat/stop',{id:running.id});await refresh();render({focus:true});}break;}
    }
  }catch(e){notice=e.message;render();}});
  drawer.addEventListener('cancel',e=>{e.preventDefault();close();});
  return{open,history:()=>open({showHistory:true}),hasUnsaved:()=>[...composers].some(([id,value])=>value!==(composerSaved.get(id)||''))||[...drafts.values()].some(d=>d.dirty||d.pending),refresh:async()=>{await refresh();if(drawer.open)render();}};
}};
})();
