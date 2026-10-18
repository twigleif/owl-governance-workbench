'use strict';
// Read-only organization projection. The native suite owners remain the only record masters.
const templates=require('./core/document-template-registry.js');
const clone=value=>JSON.parse(JSON.stringify(value));
function project(store){
 const {workspace:w}=store.read(),rows=kind=>(w.references[kind]||[]).filter(r=>!r.deleted_at).map(r=>clone(r.values));
 const documents=(w.documents?.entries||[]).filter(e=>!e.deleted_at).map(e=>{const schema=templates.get(e.template);return{recordId:e.record_id,documentId:e.document_id,revision:e.revision,templateId:e.template.id,fields:Object.entries(e.values).map(([key,value])=>({key,label:schema.catalog.find(f=>f.target===key)?.label||key,value}))};});
 return{revision:w.revision,register:clone(w.register_control.values),context:rows('context'),requirements:rows('requirements'),risks:rows('risks'),controls:rows('controls'),objectives:rows('objectives'),metrics:rows('metrics'),actions:rows('actions'),decisions:rows('decisions'),assurance:rows('assurance'),findings:rows('findings'),soa:clone(w.controls_soa.values),documents};
}
module.exports={project};
