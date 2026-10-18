/* Shared literal text guard; preserves the Register export guard exactly. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.OWLSavedText=api;})(globalThis,function(){
'use strict';
const error=(message,destination)=>Object.assign(Error(message),{destination});
function checkText(v,destination){
 if(typeof v!=='string'||v.length>2000)throw error('Saved text exceeds 2,000 UTF-16 units or is not text at '+destination.kind+' '+destination.id+' · '+destination.field+'.',destination);
 for(let i=0;i<v.length;i++){const n=v.charCodeAt(i);if(n>=0xd800&&n<=0xdbff){const next=v.charCodeAt(++i);if(!(next>=0xdc00&&next<=0xdfff))throw error('Unpaired Unicode surrogate in saved text.',destination);}else if(n>=0xdc00&&n<=0xdfff||n<32&&![9,10,13].includes(n)||n===0xfffe||n===0xffff)throw error('XML-forbidden character in saved text.',destination);}
 return v;
}
return Object.freeze({checkText});
});
