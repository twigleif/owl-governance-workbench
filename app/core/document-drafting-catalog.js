/* Isolated, fictional source-shaped editing catalog. No DOCX bytes, storage or model calls. */
(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.OWLDocumentDraftingCatalog=api;
})(globalThis,function(){
  'use strict';
  const source={
    id:'aims-manual-d255',name:'AIMS-Manual-D255.docx',
    sha256:'340d37fa3641d9896634292faf1b23a1535112f5600b6a04716a1ee9774fcf39',
    paragraphs:96,tables:28,inputSurfaces:51,markerCells:37,markerTextNodes:39,
    bytes:47457,expandedBytes:947450,
    status:'Accepted source release; OWL template consumption not activated',
    coverage:'Source-shaped input preview and labelled reference outlines; not a rendered Word document'
  };
  const sections=[
    {key:'control',label:'Document control',paragraphs:[1,26],tables:[1,2]},
    {key:'purpose',label:'1. Purpose and use',paragraphs:[27,35],tables:[3]},
    {key:'identity',label:'2. Organization and AIMS identity',paragraphs:[36,40],tables:[4,5,6,7]},
    {key:'context',label:'3. Context and interested parties',paragraphs:[41,50],tables:[8,9,10,11]},
    {key:'scope',label:'4. AIMS scope',paragraphs:[51,55],tables:[12,13,14]},
    {key:'authority',label:'5. Governance and authority',paragraphs:[56,60],tables:[15,16,17]},
    {key:'process',label:'6. AIMS process model',paragraphs:[61,64],tables:[18]},
    {key:'planning',label:'7. Planning and controlled change',paragraphs:[65,75],tables:[19]},
    {key:'support',label:'8. Support arrangements',paragraphs:[76,81],tables:[20,21,22,23]},
    {key:'performance',label:'9. Performance and improvement interface',paragraphs:[82,85],tables:[24,25]},
    {key:'artifacts',label:'10. Controlled artifact map',paragraphs:[86,88],tables:[26]},
    {key:'glossary',label:'Appendix A. Organization-specific terms',paragraphs:[89,91],tables:[27]},
    {key:'gates',label:'Appendix B. Tailoring and issue gate',paragraphs:[92,94],tables:[28]},
    {key:'maintenance',label:'Template maintenance note',paragraphs:[95,96],tables:[]}
  ];
  const fields=[];
  function add(target,section,label,kind,editable,owner,help,extra={}){
    fields.push({key:target,target,section,label,kind,editable,owner,help,...extra});
  }
  add('T1R2C2','control','Document ID','text',true,'document','Enter your organization’s exact identifier. It remains separate from the Record ID.',{binding:'shared.documentId',afterSave:'read-only'});
  add('T1R3C2','control','Version','shared',true,'Records.version','Use your working draft label. Use a new Record for a separately controlled version; this edits the working draft label.',{binding:'shared.version'});
  add('T1R4C2','control','Organization document lifecycle status','shared',true,'Records.lifecycle','Draft and Under review are available here. Saving or downloading never approves or issues the Manual.',{binding:'shared.lifecycle',options:['Draft','Under review']});
  add('T1R5C2','control','Owner','text',true,'document.values','Name the accountable maintenance role. A selected person is a separate coordination contact, not approval authority.',{binding:'values.T1R5C2',reuse:'roles'});
  add('T1R6C2','control','Reviewer','text',true,'document.values','Name the assigned reviewer role from checked arrangements. Directory membership does not assign this responsibility.',{binding:'values.T1R6C2',reuse:'roles'});
  add('T1R7C2','control','Approver','protected',false,'external authorization','Leave blank until an actual approval authority and authorization have been recorded. This draft preview cannot issue approval.');
  add('T1R8C2','control','Approval / effective date','protected',false,'external authorization','Approval and effective dates are separate human facts. Neither is filled from the Save or export date.');
  add('T1R9C2','control','Review date or trigger','review',true,'document.review','Enter an actual planned date or interval and the events requiring early review.',{binding:'review',components:['date','interval','triggers']});
  add('T1R10C2','control','Classification','shared',true,'Records.access','Use the organization’s actual classification. Public, Internal, Confidential, Restricted and Other are examples; this label does not enforce access permissions.',{binding:'shared.classification',examples:['Public','Internal','Confidential','Restricted','Other']});
  add('T1R11C2','control','Controlled location','shared',true,'Records.location','Enter the exact repository, folder, DMS reference or durable URL. A download destination does not replace it.',{binding:'shared.location'});
  const historyColumns=[
    ['version','Version','text','Enter the version label on this human-authored revision entry.'],
    ['date','Date','date','Enter the real date of this revision; saving does not generate revision history.'],
    ['summary','Change summary','text','Briefly describe the change made to the document.'],
    ['author','Author','text','Name the person or role that authored this change.'],
    ['reviewer','Reviewer','text','Name the actual reviewer if known; leave unresolved facts blank.'],
    ['approval_record','Approval record','protected','Leave blank until the separately authorized approval-capture workflow exists.']
  ];
  historyColumns.forEach(([column,label,type,help],i)=>add('T2R2C'+(i+1),'control',label,'revision-column',i!==5,'human revision history',help,{repeat:'historyRows',column,type,protected:i===5}));
  const narrativeRows=[
    [4,'identity','2.1 Organization identity','Describe the legal and business identity, purpose, main activities, functions and locations covered by the AIMS.'],
    [5,'identity','2.2 AIMS identity and mandate','Describe the AIMS name, sponsor, intended outcomes, mandate and relationship to strategy. Do not infer sponsorship.'],
    [6,'identity','2.3 AI activities and organizational roles','Describe applicable Develop, Provide, Procure, Integrate, Deploy, Operate, Use or Other activities and the organization’s supported roles. Inventory does not decide scope.'],
    [7,'identity','2.4 Integration with other management systems','Describe relevant security, privacy, risk, compliance, records, procurement, HR and continuity interfaces and handoffs.'],
    [8,'context','3.1 Material context conclusion','Summarize reviewed material conclusions with exact Context IDs. Keep pending determinations separate by ID and accountable owner.'],
    [9,'context','3.2 Climate-change relevance conclusion','Record the human determination, rationale, Review owner, Last reviewed date and exact Context ID. A reviewed determination needs a next review date or trigger.'],
    [10,'context','3.3 Interested-party conclusion','Summarize reviewed needs and expectations with exact Context IDs. Keep unresolved needs visible; a Relevant label does not prove they are addressed.'],
    [11,'context','3.4 Applicable-requirements interface','Summarize applicable requirements and commitments with exact Requirement IDs. Preserve source categories and pending applicability; detailed rows remain in Requirements.'],
    [12,'scope','4.1 AIMS scope statement','Describe proposed entities, functions, locations, activities, AI roles, systems and interfaces. This text does not establish approval.'],
    [13,'scope','4.2 Boundary rationale','Explain inclusions, exclusions and interfaces. An applicable requirement cannot be excluded merely for convenience.'],
    [14,'scope','4.3 Scope approval and record pointers','Leave authority, Decision ID, Manual Record ID and effective date blank until actual authorization. The internal owner Record is not scope approval.'],
    [16,'authority','5.1 Organization role assignments','Describe actual assignments, authority, delegation limits, conflicts and independent review arrangements. A directory role alone does not establish appointment.'],
    [17,'authority','5.2 Concern reporting and escalation','Describe real concern channels, confidentiality, nonretaliation, urgent escalation and retained records. Do not promise safeguards that have not been established.'],
    [19,'planning','Objective governance','Describe who proposes, reviews and approves objectives, with measures, owners, plans, timing, conditions and escalation. Objectives and Metrics remain in the Register.'],
    [21,'support','8.1 Resource and competence arrangements','Describe resource owners, competence needs, evidence, decision routes and review triggers. Do not invent qualifications or approvals.'],
    [22,'support','8.2 Awareness and communication arrangements','Describe audiences, required understanding, ownership, delivery, checks, timing, channels, accessibility and retained records.'],
    [23,'support','8.3 Document and record control','Describe actual repositories, access, version and approval rules, retention authority, backup, recovery and external-source controls.'],
    [25,'performance','9.1 Organization assurance interface','Describe programme ownership, independence, management-review authority, escalation, verification and retained evidence. Findings and Assurance remain separate records.']
  ];
  narrativeRows.forEach(([table,section,label,help])=>{
    const target='T'+table+'R2C1',reuse=[8,9,10].includes(table)?'context':table===11?'requirements':table===16?'roles':null;
    add(target,section,label,table===14?'protected':'narrative',table!==14,table===14?'external authorization':'document.values',help,{binding:table===14?null:'values.'+target,reuse});
  });
  const artifactRows=[
    [2,'AIMS Manual','self','Derived from this saved Manual’s owning Record and controlled location. This is not an issued or current-Manual declaration.'],
    [3,'AI Governance Policy','record','Select the exact saved Policy artifact/version and its recorded location. Its title alone does not verify the contents.'],
    [4,'Risk and Impact Management Procedure','record','Select the exact saved Risk and Impact Procedure artifact/version. Keep incomplete or historical metadata visible.'],
    [5,'AI System Lifecycle Management Procedure','record','Select the exact saved Lifecycle Procedure artifact/version and controlled location.'],
    [6,'AIMS Assurance and Improvement Procedure','record','Select the exact saved Assurance and Improvement Procedure artifact/version and controlled location.'],
    [7,'AIMS Governance Register','record','Select the exact Register workbook artifact/version, not a live register row ID.'],
    [8,'AI System Governance Assessment (blank template)','record','Select the blank master artifact/version. A completed native Assessment cannot fill this target; metadata does not prove external file contents.'],
    [9,'Detailed evidence repositories','repository','Enter repository locations. Add a separate control-document Record only if such a document exists; individual evidence artifacts remain in Records.']
  ];
  artifactRows.forEach(([row,label,kind,help])=>add('T26R'+row+'C4','artifacts',label,kind==='repository'?'repository':'artifact',kind!=='self',kind==='self'?'native owner binding':kind==='repository'?'document.repositories':'Records snapshot',help,{binding:kind==='self'?null:kind==='repository'?'repositories':'artifactRefs.T26R'+row+'C4',derived:kind==='self',reuse:kind==='self'?null:'records',purpose:row===8?'blank-assessment-template':row===9?'optional-repository-control-document':null}));
  [['term','Term or abbreviation','Enter an organization-specific term only if it is useful.'],['meaning','Organization-specific meaning','Explain the term in plain language.'],['source','Authority / source','Identify its source; it need not be a Record ID.']].forEach(([column,label,help],i)=>add('T27R2C'+(i+1),'glossary',label,'glossary-column',true,'optional glossary',help,{repeat:'glossaryRows',column,type:'text'}));
  ['Identity and scope','Authority','Process ownership','Controlled artifacts','Internal consistency','Approval and issue'].forEach((label,i)=>add('T28R'+(i+2)+'C3','gates',label,'gate-result',false,'human evaluation','OPEN remains unchanged in this draft path. Filled fields do not establish this gate’s result.',{value:'OPEN'}));
  sections.forEach(section=>{section.fieldKeys=fields.filter(field=>field.section===section.key).map(field=>field.key);});

  const contextKeys=['id','type','item','effect','basis_summary','basis_record_id','relevance','rationale','owner','last_reviewed','next_review','review_trigger','supersedes'];
  const requirementKeys=['id','source_type','source_record_id','source_locator','summary','origin_context_id','scope','applicability','rationale','aims_route','effective_date','owner','last_reviewed','next_review','review_trigger','supersedes'];
  const recordKeys=['id','type','title','subject_type','subject_id','origin','owner','custodian','version','record_date','effective_date','coverage_start','coverage_end','validity_end','location','access','retention','integrity','lifecycle','custody','supersedes'];
  const blank=keys=>Object.fromEntries(keys.map(key=>[key,'']));
  const row=(keys,revision,values)=>({id:values.id,revision,values:{...blank(keys),...values}});
  const records=[
    ['OB-REC-201','AIMS Manual working draft','Controlled document','Draft0.1','Draft','Fictional repository / AIMS / Manual'],
    ['OB-REC-202','AI Governance Policy working draft','Controlled document','Draft0.1','Draft','Fictional repository / AIMS / Policy'],
    ['OB-REC-203','AI Risk and Impact Management Procedure working draft','Controlled document','Draft0.1','Draft','Fictional repository / AIMS / Risk and impact'],
    ['OB-REC-204','AI System Lifecycle Management Procedure working draft','Controlled document','Draft0.1','Draft','Fictional repository / AIMS / Lifecycle'],
    ['OB-REC-205','AIMS Assurance and Improvement Procedure working draft','Controlled document','Draft0.1','Draft','Fictional repository / AIMS / Assurance'],
    ['OB-REC-206','AIMS Governance Register workbook','Controlled document','0.1','Draft','Fictional repository / AIMS / Register.xlsx'],
    ['OB-REC-207','Blank AI System Assessment master','Assessment','0.1','Draft','Fictional repository / Templates / Assessment.xlsx'],
    ['OB-REC-208','Document Classifier completed assessment','Assessment','1.0','Completed','Fictional repository / Assessments / Document Classifier.xlsx'],
    ['OB-REC-209','Repository control arrangements working draft','Controlled document','Draft0.1','Draft','Fictional repository / Records / Control arrangements'],
    ['OB-REC-210','Case-intake service commitment','External source','Working copy','Under review','Fictional repository / Sources / Service commitment']
  ].map(([id,title,type,version,lifecycle,location],i)=>row(recordKeys,1+i%3,{id,title,type,version,lifecycle,location,owner:'AIMS Lead',custodian:'Document control lead',origin:'Orchid Bay fictional fixture',access:'Internal',custody:'Available',...(id==='OB-REC-208'?{subject_type:'AI system',subject_id:'OB-AI-003'}:{})}));
  const fixtures={
    label:'Fictional saved facts — isolated sample only',asOf:'2026-10-06',
    roles:[
      {id:'OB-ROLE-001',name:'AIMS Lead',description:'Coordinates the management-system documents and recorded follow-up.',archived:false,revision:3},
      {id:'OB-ROLE-002',name:'Document control lead',description:'Maintains controlled locations and document copies.',archived:false,revision:1},
      {id:'OB-ROLE-003',name:'Independent reviewer',description:'Reviews assigned document drafts; authority is recorded separately.',archived:false,revision:2}
    ],
    people:[
      {id:'OB-PER-001',name:'Maya Tan',contact:'maya@example.invalid',role_ids:['OB-ROLE-001'],archived:false,revision:2},
      {id:'OB-PER-002',name:'Alex Lim',contact:'alex@example.invalid',role_ids:['OB-ROLE-002'],archived:false,revision:1}
    ],
    context:[
      row(contextKeys,2,{id:'OB-CTX-001',type:'Internal issue',item:'Case-intake handoffs',effect:'Unclear routing can delay case handling.',basis_summary:'The fictional review identified inconsistent handoff instructions.',relevance:'Relevant',rationale:'The issue affects reliable case-intake operations.',owner:'AIMS Lead',last_reviewed:'2026-10-01',review_trigger:'Material change to the intake workflow'}),
      row(contextKeys,1,{id:'OB-CTX-002',type:'Climate change',item:'Climate-related service disruption',effect:'Potential interruption to facilities or supporting services.',basis_summary:'The organization has not finished assessing this issue.',relevance:'Under review',rationale:'Facilities and continuity input is still needed.',owner:'AIMS Lead',review_trigger:'Facilities or continuity review, or a material service disruption'}),
      row(contextKeys,3,{id:'OB-CTX-003',type:'Interested party',item:'Customers and applicants',effect:'Information and review needs may affect service design.',basis_summary:'The party category is relevant; exact information, explanation and contestability needs remain unresolved.',relevance:'Relevant',rationale:'These parties use or are affected by case-intake services.',owner:'AIMS Lead',last_reviewed:'2026-10-01',review_trigger:'Changed service commitment or reviewed customer needs'})
    ],
    requirements:[
      row(requirementKeys,2,{id:'OB-REQ-001',source_type:'Internal',source_record_id:'OB-REC-210',source_locator:'Fictional service commitment / handoffs',summary:'Maintain a clear route for handling case-intake concerns.',scope:'Case-intake operations',applicability:'Applies',rationale:'The recorded internal commitment covers this work.',aims_route:'Through AIMS',owner:'AIMS Lead',last_reviewed:'2026-10-01',review_trigger:'Change to the commitment or intake workflow'}),
      row(requirementKeys,1,{id:'OB-REQ-002',source_type:'Interested party',origin_context_id:'OB-CTX-003',summary:'Determine the information and review needs of affected customers.',scope:'Customer-facing case intake',applicability:'Unknown',rationale:'Precise needs and the resulting commitment have not been established.',aims_route:'Under review',owner:'AIMS Lead',review_trigger:'Completion of the customer-needs review'})
    ],
    records,
    nativeAssessmentRecordIds:['OB-REC-208'],
    artifactPurposeRecordIds:{
      T26R3C4:['OB-REC-202'],T26R4C4:['OB-REC-203'],T26R5C4:['OB-REC-204'],
      T26R6C4:['OB-REC-205'],T26R7C4:['OB-REC-206'],T26R8C4:['OB-REC-207','OB-REC-208'],T26R9C4:['OB-REC-209']
    }
  };
  const initial={
    shared:{recordId:'OB-REC-201',documentId:'OB-MAN-01',version:'Draft0.1',lifecycle:'Draft',classification:'Internal',location:'Fictional repository / AIMS / Manual',recordOwner:'AIMS Lead'},
    values:{
      T1R5C2:'',T1R6C2:'',
      T4R2C1:'Orchid Bay Cooperative is a fictional organization supporting case-intake and routing services. Its covered functions and locations still need to be confirmed.',
      T5R2C1:'The proposed AIMS supports consistent AI governance for case-intake work. The executive sponsor, mandate and intended outcomes remain to be recorded.',
      T6R2C1:'Proposed activities are Procure, Integrate, Operate and Use. Confirm the activities and organization roles before finalizing the Manual.',
      T7R2C1:'Proposed interfaces include privacy, security, procurement and records management. Actual owners and handoffs remain incomplete.',
      T8R2C1:'The material context summary is incomplete. Select reviewed Context facts and keep any pending determination separate by its exact ID and owner.',
      T9R2C1:'Climate-change relevance remains under review. Record the actual determination and review basis when available.',
      T10R2C1:'Customer and applicant needs are still being clarified. Their relevance does not establish that all needs have been identified or addressed.',
      T11R2C1:'The applicable-requirements interface is incomplete. Select recorded requirements and retain any unknown applicability explicitly.',
      T12R2C1:'Proposed scope covers case-intake and routing activities supported by the Document Classifier. Entities, locations and interfaces remain to be confirmed.',
      T13R2C1:'The proposed boundary follows the case-intake workflow. No exclusion or scope approval has been recorded in this preview.',
      T16R2C1:'The directory contains AIMS coordination, document-control and independent-review roles. Actual appointments, authority and delegation limits still need to be documented.',
      T17R2C1:'Concern-reporting channels and urgent escalation routes remain to be recorded. Confidentiality and nonretaliation arrangements have not been stated here.',
      T19R2C1:'The objective-setting arrangement is incomplete. Record who proposes, reviews and approves objectives and how follow-up is tracked.',
      T21R2C1:'Resource and competence needs for case-intake work remain to be recorded. Training and qualification evidence stays in its owning Records.',
      T22R2C1:'Awareness and communication arrangements are incomplete. Record audiences, ownership, delivery, understanding checks and retained evidence.',
      T23R2C1:'The fictional AIMS repository is the proposed controlled location. Actual access, retention authority, backup and recovery arrangements still need to be recorded.',
      T25R2C1:'The assurance interface remains incomplete. Record programme ownership, independence, management review, escalation and verification arrangements.'
    },
    review:{date:'',interval:'Annual review',triggers:'Material change to scope, activities or governing requirements'},
    artifactRefs:{T26R3C4:'',T26R4C4:'',T26R5C4:'',T26R6C4:'',T26R7C4:'',T26R8C4:''},
    repositories:{locations:'Fictional repository / AIMS',control_document_record_id:''},
    historyRows:[{row_id:'r1',version:'Draft0.1',date:'2026-10-06',summary:'Fictional working draft prepared for the isolated preview.',author:'Preview operator',reviewer:''}],
    glossaryRows:[{row_id:'r2',term:'Case intake',meaning:'The fictional activity of receiving and routing case documents.',source:'Fictional organization example'}],
    protectedValues:{T1R7C2:'',T1R8C2:'',T14R2C1:'',T2R2C6:'',T28R2C3:'OPEN',T28R3C3:'OPEN',T28R4C3:'OPEN',T28R5C3:'OPEN',T28R6C3:'OPEN',T28R7C3:'OPEN'}
  };
  const referenceOutlines={
    control:{label:'Cover and source guidance — outline',text:'The source includes document-control, completion and organization-input guidance. This preview shows its input surfaces without copying the full Word body.'},
    purpose:{label:'Purpose and use — reference outline',text:'The Manual defines organization identity, scope, governance and process arrangements. Detailed operational facts remain in the suite’s owning records.',tables:[{target:'T3',label:'User and use reference map',columns:['User','Use'],note:'Read-only source table; full reference wording is not reproduced in this sample.'}]},
    identity:{label:'Organization identity — reference outline',text:'Describe the organization and its AIMS. Inventory and draft statements do not establish scope or appointments.'},
    context:{label:'Context and requirements — reference outline',text:'Use concise material conclusions. Detailed Context and Requirement records remain authoritative; retain unresolved determinations and needs.'},
    scope:{label:'Scope — reference outline',text:'Scope and boundary rationale are draft inputs. Formal authority, Decision and effective-date capture remains separate.'},
    authority:{label:'Authority — reference outline',text:'Roles in the directory are factual sources, not evidence of appointment or authority.',tables:[{target:'T15',label:'Generic authority and separation map',columns:['Authority area','Accountable role','Required separation or condition','Record'],note:'Read-only reference; record actual organization assignments in T16.'}]},
    process:{label:'AIMS process model — reference outline',text:'The source links seven AIMS processes to their owners, inputs, outputs and authoritative homes.',tables:[{target:'T18',label:'Seven-process reference map',columns:['Process','Default owner','Main inputs','Outputs / authoritative home'],note:'Read-only reference; live operational rows remain in their named suite homes.'}]},
    planning:{label:'Planning and controlled change — reference outline',text:'The source describes objectives, risk-based planning and controlled changes. Organization arrangements are entered in Objective governance; live rows stay in Objectives and Metrics.'},
    support:{label:'Support — reference outline',text:'Resources, competence, awareness, communication and document control need the organization’s actual arrangements.',tables:[{target:'T20',label:'Support interface reference',columns:['Support area','AIMS-level arrangement to define','Detailed records remain in'],note:'Read-only reference; organization arrangements are editable in T21–T23.'}]},
    performance:{label:'Performance and improvement — reference outline',text:'Assurance, management review, findings and verification retain their distinct owning records and human conclusions.',tables:[{target:'T24',label:'Performance and improvement reference',columns:['Activity','Input','Human conclusion / output','Owning record'],note:'Read-only reference; enter the organization interface in T25.'}]},
    artifacts:{label:'Controlled artifact map — reference outline',text:'Exact artifact/version Records and controlled locations are separate from live rows. Blank Assessment masters are distinct from completed Assessments.'},
    glossary:{label:'Organization-specific terms — reference outline',text:'Optional terms supplement the source terminology. They are not a completion gate.'},
    gates:{label:'Tailoring and issue gate — reference outline',text:'The source requires human evaluation and retained evidence. All six results stay OPEN in this draft-only preview.'},
    maintenance:{label:'Template maintenance note — reference outline',text:'The source includes template-maintenance notes. The source master is unchanged; this preview does not activate or adapt it.'}
  };
  function freeze(value){if(value&&typeof value==='object'){Object.values(value).forEach(freeze);Object.freeze(value);}return value;}
  return freeze({source,sections,fields,fixtures,initial,referenceOutlines});
});
