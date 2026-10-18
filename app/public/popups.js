/* Preview-only dialog navigation. Retain one suspended DOM frame per parent. */
(function(){'use strict';
 const frames=[],owners=new Map();let action='';
 const navigations=new Set(['nav','org-page','org-governance-page','restart-onboarding','open-org','open-docent','top-tab','sys-evidence','org-documents','org-gov','sys-gov','org-assurance','review','rv-open','rv-list','rv-return-review','other-review','publish-org','publish-docent']);
 const completions=new Set(['save-use','save-organization','save-scope','record-result','confirm-remove-use','keep-proposal-edit','apply','discard-use']);
 const top=()=>frames.at(-1);
 function sync(){for(const [name,owner]of owners)owner.set(top()?.owner===name?top().node:null);top()?.activate?.();}
 function hide(f){f.node.close();f.node.remove();}
 function remember(f){f.focus=document.activeElement;f.selection=f.focus&&typeof f.focus.selectionStart==='number'?[f.focus.selectionStart,f.focus.selectionEnd]:null;f.scroll=[f.node,...f.node.querySelectorAll('*')].filter(n=>n.scrollTop||n.scrollLeft).map(n=>[n,n.scrollTop,n.scrollLeft]);}
 function focus(node,selection){if(!node?.isConnected){if(node?.id)node=document.getElementById(node.id);else if(node?.dataset){const attributes=Object.entries(node.dataset);node=[...document.querySelectorAll('[data-j],[data-intake]')].find(n=>attributes.length&&attributes.every(([k,v])=>n.dataset[k]===v));}}if(node?.isConnected){node.focus({preventScroll:true});if(selection&&node.setSelectionRange)node.setSelectionRange(...selection);}}
 function show(f){document.body.append(f.node);sync();f.node.showModal();focus(f.focus,f.selection);for(const [n,y,x]of f.scroll||[]){n.scrollTop=y;n.scrollLeft=x;}}
 function dispose(f){hide(f);f.cleanup?.();}
 function present(node,owner,{key,mode='auto',activate}={}){const current=top(),opener=document.activeElement;let returnFocus=opener;if(current){remember(current);hide(current);if(mode==='replace'||mode==='auto'&&current.key===key&&current.owner===owner){frames.pop();current.cleanup?.();returnFocus=current.opener;}}const f={node,owner,key,activate,opener:returnFocus,scroll:[]};frames.push(f);node.addEventListener('cancel',e=>{e.preventDefault();e.stopImmediatePropagation?.();pop();});show(f);}
 function pop(){const f=frames.pop();if(!f)return false;dispose(f);if(top())show(top());else{sync();owners.get(f.owner)?.closed?.();}focus(f.opener);return true;}
 function clear(){while(frames.length)dispose(frames.pop());sync();}
 function resume(predicate){let index=-1;for(let i=frames.length-2;i>=0;i--)if(predicate(frames[i].node,frames[i])){index=i;break;}if(index<0)return false;while(frames.length-1>index)dispose(frames.pop());show(top());return true;}
 function run(next,fn,data){const previous=action;action=next;try{if(next==='close-dialog'){pop();return;}const backs={'continue-use':n=>n.classList.contains('j-use-editor'),'activity-back':n=>!!n.querySelector('#j-activity-list'),'history-return':()=>true,'link-review-evidence':n=>n.classList.contains('j-review-source-picker'),'link-source':n=>n.classList.contains('j-use-editor')&&n.dataset.popupRecordId===data?.dataset.id};if(backs[next]&&resume(backs[next]))return;if(navigations.has(next))clear();return fn();}finally{action=previous;}}
 window.OWLPreviewPopups={register(name,set,closed){owners.set(name,{set,closed});},cleanup(fn){if(top())top().cleanup=fn;},decorate(fn){const frame=top(),previous=frame?.activate;if(frame)frame.activate=()=>{previous?.();fn();};},present,pop,clear,resume,run,programmaticClose(){if(!action||navigations.has(action)||completions.has(action))clear();},get depth(){return frames.length;},get active(){return top()?.node;}};
})();
