/* Reviewed Manual input ownership. No document bytes, runtime data, DOM or providers. */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('./document-drafting-catalog.js'),require('./reference-schema.js'));else root.OWLDocumentSchema=factory(root.OWLDocumentDraftingCatalog,root.OWLReferenceSchema);})(globalThis,function(C,R){
  'use strict';
  const freeze=value=>{if(value&&typeof value==='object'){Object.values(value).forEach(freeze);Object.freeze(value);}return value;};
  const narrativeTargets=[4,5,6,7,8,9,10,11,12,13,16,17,19,21,22,23,25].map(n=>'T'+n+'R2C1');
  const roleTargets=['T1R5C2','T1R6C2'];
  const valueTargets=[...narrativeTargets,...roleTargets];
  const artifactTargets=[3,4,5,6,7,8].map(n=>'T26R'+n+'C4');
  const captureKinds={T1R5C2:'role',T1R6C2:'role',T16R2C1:'role',T8R2C1:'context',T9R2C1:'context',T10R2C1:'context',T11R2C1:'requirement',...Object.fromEntries([...artifactTargets,'T26R9C4'].map(target=>[target,'record']))};
  const source={id:'aims-manual-d255',name:'AIMS-Manual-D255.docx',sha256:'340d37fa3641d9896634292faf1b23a1535112f5600b6a04716a1ee9774fcf39',paragraphs:96,tables:28,inputSurfaces:51};
  const catalogProjection={source:{id:source.id,sha256:source.sha256,paragraphs:96,tables:28,inputSurfaces:51},sections:C.sections.map(({key,label,paragraphs,tables})=>({key,label,paragraphs,tables})),targets:C.fields.map(({key,section,kind,editable,owner,repeat,column,derived,purpose})=>({key,section,kind,editable,owner,repeat,column,derived,purpose}))};
  const template={id:source.id,sha256:source.sha256,catalog_sha256:'b81752cc6eef3a1e11c0414cc121852102eeb208c85c0295b1b579fd0f52f9cf'};
  const sourceFields={roles:['name','description'],people:['name','contact','role_ids'],context:R.fields.context.map(([key])=>key).filter(key=>key!=='id'),requirements:R.fields.requirements.map(([key])=>key).filter(key=>key!=='id'),records:['type','title','version','lifecycle','custody','location','access','subject_type','subject_id','origin']};
  const limits={entries:500,bindings:500,events:10000,historyRows:100,glossaryRows:100,sources:100,narrative:16000,scalar:2000,authoringBytes:262144,workspaceBytes:4000000};
  const editable=['Draft','Under review'],retained=['Approved','Issued','Completed','Superseded','Withdrawn','Expired','Retired'];
  const historyColumns=['version','date','summary','author','reviewer'];
  const glossaryColumns=['term','meaning','source'];
  const blankValues=()=>Object.fromEntries(valueTargets.map(target=>[target,'']));
  const blankPayload=()=>({record_id:'',document_id:'',template:{...template},values:blankValues(),review:{date:'',interval:'',triggers:''},artifact_refs:Object.fromEntries(artifactTargets.map(target=>[target,''])),repositories:{locations:'',control_document_record_id:''},history_rows:[],glossary_rows:[],capture_bindings:Object.fromEntries(Object.keys(captureKinds).map(target=>[target,''])),captures:[]});
  return freeze({source,template,catalogProjection,sections:C.sections,catalog:C.fields,narrativeTargets,roleTargets,valueTargets,artifactTargets,captureKinds,captureTargets:Object.keys(captureKinds),sourceFields,limits,editable,retained,historyColumns,glossaryColumns,blankValues,blankPayload});
});
