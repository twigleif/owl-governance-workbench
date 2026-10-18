(function(root,factory){'use strict';const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.OWLSystemCardModel=api;})(typeof window==='undefined'?globalThis:window,function(){'use strict';
 const clone=x=>JSON.parse(JSON.stringify(x)),esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const templates=[{id:'system',name:'System card',description:'Purpose, use, oversight and limitations.'},{id:'supplier',name:'Supplier information request',description:'Questions for the information still missing.'},{id:'test',name:'Control test record',description:'A test plan with space for actual observations.'}];
 function clean(html){
  // The sample accepts a small document vocabulary; no images, active content or arbitrary attributes.
  return String(html).replace(/<(script|style|iframe|object|svg|math)\b[^>]*>[\s\S]*?<\/\1\s*>/gi,'').replace(/<!--[\s\S]*?-->/g,'').replace(/<\/?([\w:-]+)\b([^>]*)>/g,(tag,name,attrs)=>{
   name=name.toLowerCase();if(!['p','h2','h3','strong','b','em','i','ul','ol','li','br','table','thead','tbody','tr','th','td','a','blockquote'].includes(name))return'';
   if(tag.startsWith('</'))return name==='br'?'':'</'+name+'>';
   if(name==='a'){const match=attrs.match(/\bhref\s*=\s*["']([^"']*)["']/i),url=match?.[1]||'';return /^https:\/\/[^\s<>"']+$/i.test(url)?'<a href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">':'<a>';}
   return'<'+name+'>';
  });
 }
 const text=html=>String(html).replace(/<[^>]*>/g,' ').replace(/&(nbsp|amp|lt|gt|quot|#39);/g,(_,c)=>({nbsp:' ',amp:'&',lt:'<',gt:'>',quot:'"','#39':"'"}[c])).replace(/\s+/g,' ').trim();
 function create(input){
  const data=clone(input),sources=new Map(data.sources.map(s=>[s.id,s]));let epoch=0,sequence=0;
  const docs=new Map(),proposals=[],history=[];
  const block=(name,value)=>'<h3>'+esc(name)+'</h3><p>'+esc(value)+'</p>';
  const initial=block('Use and boundaries',data.profile.intended_use||'Intended use has not been recorded.')+block('Oversight',data.profile.human_oversight||'The operating oversight arrangements have not been recorded.')+block('Limitations',data.profile.restrictions||'Operating limitations have not been recorded.');
  function document(id='system'){if(!templates.some(t=>t.id===id))throw Error('Choose an available template.');if(!docs.has(id))docs.set(id,{id,revision:0,saved:'',draft:id==='system'?initial:'',serial:0,basis:null,error:null,origin:'Template using saved information'});return docs.get(id);}
  function edit(id,html){const d=document(id);d.draft=clean(html);d.serial++;d.error=null;return d;}
  function dirty(id){const d=document(id);return d.draft!==d.saved;}
  function prepare(id,ids){
   const d=document(id),chosen=[...new Set(ids)].map(id=>sources.get(id));if(!chosen.length)throw Error('Select at least one retained source. Your document is kept.');
   if(chosen.some(s=>!s||!s.body||!s.sha256))throw Error('A selected original is unavailable. Choose a retained source.');
   const hasPlan=chosen.some(s=>s.id===data.planId),hasBase=chosen.some(s=>s.id===data.system.baseline_record_id);let html='',references=[];
   if(id==='system'){
    html=block('Use and boundaries',data.profile.intended_use||'The intended use is not recorded.');
    if(hasBase){html+=block('Analysis context','The retained exercise baseline describes deterministic DQL queries and Reading LLM steps. It does not establish the configuration used in an actual deployment.');references.push({recordId:data.system.baseline_record_id,locator:'analysis-plans; reading-steps; Simulation boundary'});}
    html+=block('Human oversight',hasPlan?'The pilot plan proposes inspecting the supporting transcript evidence before relying on an analysis result, and defining the intended audience before checking collection permissions. These are proposed arrangements; a performed review or access check has not been supplied.':'The operating oversight arrangements have not been recorded.');
    if(hasPlan)references.push({recordId:data.planId,locator:'C1; C2; P1'});
    html+=block('Limitations',data.profile.restrictions||'Actual operating limits are not recorded.')+block('Information still needed','The exact deployed model and version, actual access settings, performed checks and operating oversight remain unprovided. This card does not establish approval or effective controls.');
   }else if(id==='supplier'){
    html='<p>Please provide the following information for the proposed Docent use described above.</p><ol><li>The service configuration and underlying model identifiers and versions, including any relevant model cards.</li><li>Data handling, retention, hosting and subprocessor information relevant to this intended use.</li><li>The applicable permission model and an export of actual collection access settings.</li><li>Relevant evaluation reports, their scope and limitations, and arrangements for material-change notifications.</li></ol><p>Supplier information will be assessed against the intended use; receiving a document does not establish suitability.</p>';
    if(hasPlan)references.push({recordId:data.planId,locator:'C2; P1'});
   }else{
    html=block('Check','Compare the intended audience with actual collection permissions before sharing the synthetic pilot collection.')+block('Preparation','Identify the collection and configuration, define permitted recipients, and retain the permission export used for the check.')+'<h3>Observations</h3><p>Not performed. Record the actual access grants and observed differences after carrying out the check.</p><h3>Result and follow-up</h3><p>No result recorded. Record the supported result, limitations and any follow-up after the check.</p>';
    if(!hasPlan)html=block('Check','The sharing criterion is not in the selected sources. Select the pilot plan before preparing this test.')+block('Observations','Not performed. No operating result can be drafted from the selected source.');
    if(hasPlan)references.push({recordId:data.planId,locator:'C2; P1'});
   }
   const p={id:'preview-draft-'+(++sequence),template:id,revision:d.revision,serial:d.serial,epoch,systemRevision:data.systemRevision,assessmentRevision:data.assessmentRevision,selected:chosen.map(s=>({id:s.id,revision:s.revision,sha256:s.sha256})),references,html:clean(html),state:'Prepared',illustrative:true};proposals.unshift(p);return p;
  }
  function use(id){const p=proposals.find(p=>p.id===id);if(!p)throw Error('Prepare a draft first.');const d=document(p.template);if(p.state!=='Prepared')throw Error('This draft has already been used. Prepare another draft to revise it.');if(p.revision!==d.revision||p.serial!==d.serial||p.epoch!==epoch)throw Error('The document or its source basis changed. Your edits are kept. Prepare a new draft.');d.draft=p.html;d.serial++;d.basis=clone(p.selected);d.origin='Reviewed illustrative OWL draft';d.error=null;p.state='Used';return d;}
  function save(id,reject=false){const d=document(id);if(!text(d.draft))throw Error('Add document text before saving.');if(d.draft.length>16000)throw Error('Keep this sample document within 16,000 characters. Your edits are kept.');if(reject){d.error='Save was rejected in this preview. Your edits are kept. Try Save again.';return false;}if(!dirty(id))return true;const before=d.saved;d.saved=clean(d.draft);d.revision++;d.error=null;const event={id:'card-event-'+(history.length+1),template:id,before,after:d.saved,revision:d.revision,source:d.origin};history.unshift(event);return event;}
  function discard(id){const d=document(id);d.draft=d.saved;d.serial++;d.error=null;return d;}
  return{data,templates,document,edit,dirty,prepare,use,save,discard,proposals,history,changeBasis(){epoch++;},get epoch(){return epoch;}};
 }
 return{create,templates,clean,text,esc};
});
