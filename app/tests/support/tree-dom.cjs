'use strict';
// Functional tree DOM double; native paint, focus and browser compatibility require separate verification.
const decode=text=>String(text).replace(/&(?:amp|lt|gt|quot|#39);/g,v=>({'&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&#39;':"'"}[v]));
function treeDOM(options={}){
  let active=null;const observers=new Set();
  const encodeText=text=>String(text).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'),encodeAttribute=text=>encodeText(text).replace(/"/g,'&quot;');
  function serialize(node){if(node.tagName==='#TEXT')return encodeText(node.rawText);const attributes={...node.attributes};for(const [key,value]of Object.entries(node.dataset))attributes['data-'+key.replace(/[A-Z]/g,c=>'-'+c.toLowerCase())]=value;for(const [key,value]of [['hidden',node.hidden],['disabled',node.disabled],['readonly',node.readOnly]])if(value)attributes[key]='';else delete attributes[key];const start='<'+node.tagName.toLowerCase()+Object.entries(attributes).map(([key,value])=>' '+key+'="'+encodeAttribute(value)+'"').join('')+'>';if(['INPUT','BR','HR','IMG','META','LINK'].includes(node.tagName))return start;return start+(node.children.length?node.children.map(serialize).join(''):encodeText(node.rawText))+'</'+node.tagName.toLowerCase()+'>';}
  function matches(node,selector){if(node.tagName==='#TEXT')return false;const attr=[...selector.matchAll(/\[([\w-]+)(?:="([^"]*)")?\]/g)];for(const [,key,value]of attr)if(!node.hasAttribute(key)||(value!==undefined&&node.getAttribute(key)!==value))return false;selector=selector.replace(/\[[^\]]+\]/g,'');const id=selector.match(/#([\w-]+)/)?.[1];if(id&&node.id!==id)return false;for(const [,name]of selector.matchAll(/\.([\w-]+)/g))if(!node.classList.contains(name))return false;const tag=selector.match(/^[\w-]+/)?.[0];return !tag||node.tagName===tag.toUpperCase();}
  function mutate(node){for(const o of observers)if(o.main?.contains(node))o.callback();}
  class Node {
    constructor(tag='div'){this.tagName=tag.toUpperCase();this.parentNode=null;this.children=[];this.attributes={};this.dataset={};this.style={};this.hidden=false;this.disabled=false;this.readOnly=false;this.value='';this.selectionStart=0;this.selectionEnd=0;this.scrollTop=0;this.events=new Map();this.rawHTML='';this.rawText='';const self=this;this.classList={contains(name){return self.className.split(/\s+/).includes(name);},add(...names){self.className=[...new Set([...self.className.split(/\s+/).filter(Boolean),...names])].join(' ');},remove(...names){self.className=self.className.split(/\s+/).filter(v=>!names.includes(v)).join(' ');},toggle(name,on){on=on===undefined?!this.contains(name):on;on?this.add(name):this.remove(name);return on;}};}
    get id(){return this.attributes.id||'';}set id(v){this.attributes.id=String(v);}
    get className(){return this.attributes.class||'';}set className(v){this.attributes.class=String(v);}
    get htmlFor(){return this.attributes.for||'';}set htmlFor(v){this.attributes.for=String(v);}
    get nextSibling(){if(!this.parentNode)return null;return this.parentNode.children[this.parentNode.children.indexOf(this)+1]||null;}
    get isConnected(){return this===document.body||document.body.contains(this);}
    setAttribute(k,v){this.attributes[k]=String(v);if(k.startsWith('data-'))this.dataset[k.slice(5).replace(/-([a-z])/g,(_,c)=>c.toUpperCase())]=String(v);if(k==='hidden')this.hidden=true;if(k==='disabled')this.disabled=true;if(k==='readonly')this.readOnly=true;if(k==='value')this.value=String(v);}
    getAttribute(k){if(k.startsWith('data-')){const key=k.slice(5).replace(/-([a-z])/g,(_,c)=>c.toUpperCase());return Object.hasOwn(this.dataset,key)?this.dataset[key]:null;}return this.attributes[k]??null;}
    hasAttribute(k){return this.getAttribute(k)!==null;}
    removeAttribute(k){delete this.attributes[k];if(k.startsWith('data-'))delete this.dataset[k.slice(5).replace(/-([a-z])/g,(_,c)=>c.toUpperCase())];if(k==='hidden')this.hidden=false;}
    contains(node){return node===this||this.children.some(c=>c.contains(node));}
    appendChild(node){return this.insertBefore(node,null);}
    append(node){this.appendChild(node);}
    insertBefore(node,before){node.parentNode?.removeChild(node);const index=before?this.children.indexOf(before):-1;this.children.splice(index<0?this.children.length:index,0,node);node.parentNode=this;mutate(this);return node;}
    removeChild(node){const index=this.children.indexOf(node);if(index>=0){this.children.splice(index,1);node.parentNode=null;mutate(this);}return node;}
    remove(){this.parentNode?.removeChild(this);}
    insertAdjacentElement(where,node){if(where==='afterend')return this.parentNode.insertBefore(node,this.nextSibling);throw Error('Unsupported DOM-double insertion '+where);}
    insertAdjacentHTML(where,html){if(!['afterbegin','beforeend'].includes(where))throw Error('Unsupported DOM-double HTML insertion '+where);const fragment=new Node('div');fragment.innerHTML=html;const before=where==='afterbegin'?this.children[0]:null;for(const child of [...fragment.children])this.insertBefore(child,before);}
    querySelectorAll(selector){const selectors=selector.split(',').map(v=>v.trim()),out=[];function walk(node){for(const child of node.children){if(selectors.some(s=>matches(child,s)))out.push(child);walk(child);}}walk(this);return out;}
    querySelector(selector){return this.querySelectorAll(selector)[0]||null;}
    closest(selector){for(let node=this;node;node=node.parentNode)if(matches(node,selector))return node;return null;}
    get innerHTML(){return options.canonicalize?this.children.map(serialize).join('')||encodeText(this.rawText):this.rawHTML;}set innerHTML(html){this.rawHTML=String(html);this.rawText='';for(const child of this.children)child.parentNode=null;this.children=[];parse(this.rawHTML,this);mutate(this);}
    get textContent(){return this.tagName==='#TEXT'?this.rawText:this.children.map(c=>c.textContent).join('')||this.rawText;}set textContent(text){this.rawText=String(text);for(const child of this.children)child.parentNode=null;this.children=[];mutate(this);}
    focus(){if(!this.isConnected||this.disabled)return;for(let n=this;n;n=n.parentNode)if(n.hidden||n.style.display==='none')return;const previous=active;active=this;if(previous!==this){for(let n=previous;n;n=n.parentNode)for(const cb of n.events.get('focusout')||[])cb({target:previous,relatedTarget:this});for(let n=this;n;n=n.parentNode)for(const cb of n.events.get('focusin')||[])cb({target:this,relatedTarget:previous});}}
    setSelectionRange(a,b){this.selectionStart=a;this.selectionEnd=b;}
    scrollIntoView(options){this.lastScroll=options;}
    getBoundingClientRect(){if(this.id==='document-frame')return {top:80,bottom:850,left:10,right:1300};if(this.id==='completion-section-trigger')return {top:180,bottom:215,left:90,right:700};return {top:350,bottom:450,left:200,right:900,width:700,height:100};}
    addEventListener(name,fn){if(!this.events.has(name))this.events.set(name,new Set());this.events.get(name).add(fn);}
    removeEventListener(name,fn){this.events.get(name)?.delete(fn);}
  }
  function parse(html,parent){const stack=[parent],voids=new Set(['INPUT','BR','HR','IMG','META','LINK']);for(const token of html.match(/<!--[\s\S]*?-->|<[^>]+>|[^<]+/g)||[]){if(token.startsWith('<!--'))continue;if(token.startsWith('</')){if(stack.length>1)stack.pop();continue;}if(token.startsWith('<')){const tag=token.match(/^<([\w-]+)/)?.[1];if(!tag)continue;const node=new Node(tag);for(const m of token.matchAll(/\s([\w:-]+)(?:="([^"]*)"|='([^']*)'|=([^\s>]+))?/g))node.setAttribute(m[1],decode(m[2]??m[3]??m[4]??''));stack.at(-1).children.push(node);node.parentNode=stack.at(-1);if(!voids.has(node.tagName)&&!token.endsWith('/>'))stack.push(node);}else{const text=new Node('#text');text.rawText=decode(token);text.parentNode=stack.at(-1);stack.at(-1).children.push(text);}}
    for(const node of parent.querySelectorAll('textarea'))node.value=node.textContent;for(const node of parent.querySelectorAll('select'))node.value=node.querySelector('option[selected]')?.getAttribute('value')||node.querySelector('option')?.getAttribute('value')||'';
  }
  const document={createElement:tag=>new Node(tag),getElementById:id=>document.body.id===id?document.body:document.body.querySelector('#'+id),get activeElement(){return active?.isConnected?active:document.body;},body:new Node('body')};
  class MutationObserver {constructor(callback){this.callback=callback;this.main=null;}observe(main){this.main=main;observers.add(this);}disconnect(){observers.delete(this);this.main=null;}}
  return {document,MutationObserver,Node};
}
module.exports={treeDOM};
