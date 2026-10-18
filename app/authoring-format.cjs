(function(root,factory){'use strict';const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.OWLAuthoringFormat=api;})(typeof window==='undefined'?globalThis:window,function(){'use strict';
 const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function bad(message){throw Object.assign(Error(message||'This document contains unsupported formatting. Keep your wording and use the document toolbar.'),{code:'authoring-format'});}
 function unicode(s){if(typeof s!=='string'||/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/u.test(s))bad('The document contains invalid text characters. Remove them before saving; your edits are kept.');return s;}
 function href(s){unicode(s);try{const u=new URL(s);if(u.protocol!=='https:'||!u.hostname||u.username||u.password||/[\s<>"']/.test(s))bad();return s;}catch{bad('Use a complete HTTPS address in document links.');}}
 const inline=['text','br'],blocks=['p','h2','h3','blockquote','ul','ol','table'];
 function validate(input,{empty=false}={}){
  if(!input||input.type!=='doc'||!Array.isArray(input.content))bad();let nodes=0,units=0,cells=0;
  function walk(n,parent,depth){
   if(!n||typeof n!=='object'||Array.isArray(n)||++nodes>1000||depth>12)bad('Keep the document within 1,000 items and 12 formatting levels. Your edits are kept.');
   const type=n.type,allowed=parent==='doc'?blocks:parent==='ul'||parent==='ol'?['li']:parent==='table'?['tr']:parent==='tr'?['th','td']:['li','th','td','blockquote'].includes(parent)?[...inline,...blocks]:inline;
   if(!allowed.includes(type)||Object.keys(n).some(k=>!(type==='text'?['type','text','marks','href']:type==='br'?['type']:['type','content']).includes(k)))bad();
   if(type==='text'){const text=unicode(n.text);units+=text.length;if(units>16000)bad('Keep this document within 16,000 characters. Your edits are kept.');if(n.marks!==undefined&&(!Array.isArray(n.marks)||n.marks.some(m=>!['bold','italic'].includes(m))))bad();const marks=[...new Set(n.marks||[])].sort();return{type,text,...marks.length?{marks}:{},...n.href!==undefined?{href:href(n.href)}:{}};}
   if(type==='br')return{type};if(!Array.isArray(n.content))bad();
   if(type==='tr'&&(!n.content.length||n.content.length>10))bad('Keep tables within 10 columns.');if(['th','td'].includes(type)&&++cells>200)bad('Keep tables within 200 cells.');
   const content=n.content.map(c=>walk(c,type,depth+1));const merged=[];for(const c of content){const prev=merged.at(-1);if(c.type==='text'&&prev?.type==='text'&&JSON.stringify(prev.marks)===JSON.stringify(c.marks)&&prev.href===c.href)prev.text+=c.text;else merged.push(c);}return{type,content:merged};
  }
  if(Object.keys(input).some(k=>!['type','content'].includes(k)))bad();const doc={type:'doc',content:input.content.map(n=>walk(n,'doc',1))};if(!empty&&!plain(doc).trim())bad('Add document text before saving.');if(new TextEncoder().encode(JSON.stringify(doc)).length>65536)bad('This document exceeds the supported formatting size. Simplify its formatting; your wording is kept.');return doc;
 }
 function html(n){if(n.type==='doc')return n.content.map(html).join('');if(n.type==='text'){let s=esc(n.text);if(n.marks?.includes('bold'))s='<strong>'+s+'</strong>';if(n.marks?.includes('italic'))s='<em>'+s+'</em>';if(n.href)s='<a href="'+esc(n.href)+'" target="_blank" rel="noopener noreferrer">'+s+'</a>';return s;}if(n.type==='br')return'<br>';return'<'+n.type+'>'+n.content.map(html).join('')+'</'+n.type+'>';}
 function plain(n){if(n.type==='text')return n.text;if(n.type==='br')return'\n';return(n.content||[]).map(plain).join(['doc','ul','ol','table','tr','blockquote'].includes(n.type)?'\n':'');}
 const paragraph=(title,text)=>[{type:'h3',content:[{type:'text',text:title}]},{type:'p',content:[{type:'text',text:text||'Not recorded.'}]}];
 return{esc,unicode,href,validate,html,plain,paragraph};
});
