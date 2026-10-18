/* Only the five reviewed template contracts are admitted. No title inference or plugins. */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('./document-schema.js'),require('./policy-document-schema.js'),require('./risk-document-schema.js'),require('./lifecycle-document-schema.js'),require('./assurance-document-schema.js'));else root.OWLDocumentTemplateRegistry=factory(root.OWLDocumentSchema,root.OWLPolicyDocumentSchema,root.OWLRiskDocumentSchema,root.OWLLifecycleDocumentSchema,root.OWLAssuranceDocumentSchema);})(globalThis,function(M,P,K,L,A){
  'use strict';
  const contracts=Object.freeze({[M.template.id]:M,[P.template.id]:P,[K.template.id]:K,[L.template.id]:L,[A.template.id]:A});
  function get(value){const id=typeof value==='string'?value:value?.id,contract=Object.hasOwn(contracts,id)?contracts[id]:null;if(!contract)throw Object.assign(new Error('Choose one of the five reviewed document templates.'),{field:'template',code:'document-template'});if(typeof value!=='string'&&(!value||Object.keys(value).length!==3||Object.keys(contract.template).some(key=>!Object.hasOwn(value,key)||value[key]!==contract.template[key])))throw Object.assign(new Error('The document template/catalog pin does not match the reviewed source.'),{field:'template',code:'document-template'});return contract;}
  const same=(a,b)=>{try{return get(a)===get(b);}catch{return false;}};
  return Object.freeze({contracts,get,same,ids:Object.freeze(Object.keys(contracts))});
});
