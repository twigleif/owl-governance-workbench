/* Closed document contribution profiles. Full saved body and stable row ownership remain native. */
(function(root,factory){const node=typeof module==='object'&&module.exports,api=factory(node?require('./document-core.js'):root.OWLDocumentCore);if(node)module.exports=api;else root.OWLOwnerDocumentProfiles=api;})(globalThis,function(J){
'use strict';
const RECIPE='owner-document-contribution-1',clone=v=>JSON.parse(JSON.stringify(v)),plain=v=>v!==null&&typeof v==='object'&&!Array.isArray(v),exact=(v,k)=>plain(v)&&Object.keys(v).length===k.length&&k.every(x=>Object.hasOwn(v,x)),canonical=v=>v===null||typeof v!=='object'?JSON.stringify(v):Array.isArray(v)?'['+v.map(canonical).join(',')+']':'{'+Object.keys(v).sort().map(k=>JSON.stringify(k)+':'+canonical(v[k])).join(',')+'}',equal=(a,b)=>canonical(a)===canonical(b),freeze=v=>{if(v&&typeof v==='object'){Object.values(v).forEach(freeze);Object.freeze(v);}return v;};
function fail(message,code='owner-document-invalid'){throw Object.assign(Error(message),{code});}
const profiles=freeze([
  {
    "id": "doc-manual-identity",
    "groupId": "doc-manual-identity",
    "templateId": "aims-manual-d255",
    "artifact": "AIMS-Manual.docx",
    "sourceSha256": "340d37fa3641d9896634292faf1b23a1535112f5600b6a04716a1ee9774fcf39",
    "unit": "values",
    "title": "2. Organization and AIMS identity",
    "audience": "Assigned document/process owner and competent specialists for their own scoped work",
    "context": [
      "Select the exact document Record ID and Draft/Under review version; show its current wording and appropriate approved references.",
      "Share only the permitted context. Organizational arrangements are distinct from a performed assessment, current Register row or issued Decision.",
      "The source section identifies what is needed; an ordinary contribution may leave authority, method approval or other specialist portions unresolved."
    ],
    "keys": [
      "T4R2C1",
      "T5R2C1",
      "T7R2C1"
    ],
    "fields": {
      "T4R2C1": "T4R2C1",
      "T5R2C1": "T5R2C1",
      "T7R2C1": "T7R2C1"
    },
    "catalog": [
      {
        "id": "doc-manual-t4r2c1",
        "field": "T4R2C1",
        "label": "2.1 Organization identity",
        "locator": "T4R2C1",
        "question": "What does the organization do, and which functions and locations does this Manual describe?",
        "help": "Give verified legal and business name, main activities, functions and locations; keep proposed AIMS scope separate. Keep missing parts Pending and distinguish current arrangements from proposed ones.",
        "examples": [
          "The organization, Meridian Services Ltd, provides administrative support to other businesses. Its main activities are document intake and customer assistance. This Manual describes its Operations and Technology functions at its North Office and South Office. Those business facts do not establish the approved AI governance scope.",
          "The organization, Stonebridge Works Ltd, manufactures equipment and provides repair support. Its main activities are production, inspection and after-sales maintenance. This Manual describes Engineering and Service Operations at its West Plant and East Service Centre. These are business facts; the AI governance boundary still needs its own scope decision."
        ],
        "pendingExample": "Pending: the responsible owner needs to confirm 2.1 organization identity.",
        "mode": "fact",
        "condition": "Only one exact Draft/Under review document. This is a contribution for operator preparation, not automatic completion/import; source-required authority and approved-method portions remain held.",
        "expected": "Give verified legal and business name, main activities, functions and locations; keep proposed AIMS scope separate.",
        "destinations": [
          "AIMS-Manual.docx :: T4R2C1 in the selected editable draft only"
        ],
        "key": "T4R2C1",
        "hint": "Give verified legal and business name, main activities, functions and locations; keep proposed AIMS scope separate. Keep missing parts Pending and distinguish current arrangements from proposed ones.",
        "partial": "Pending: the responsible owner needs to confirm 2.1 organization identity.",
        "groupId": "doc-manual-identity",
        "groupTitle": "2. Organization and AIMS identity",
        "groupAudience": "Assigned document/process owner and competent specialists for their own scoped work",
        "audience": "Assigned document/process owner and competent specialists for their own scoped work",
        "profileId": "doc-manual-identity"
      },
      {
        "id": "doc-manual-t5r2c1",
        "field": "T5R2C1",
        "label": "2.2 AIMS identity and mandate",
        "locator": "T5R2C1",
        "question": "What is the proposed purpose of the organization’s AI governance programme?",
        "help": "Give its proposed name, intended outcomes and link to organizational goals. Sponsor and mandate stays Pending unless confirmed by an existing assignment. Keep missing parts Pending and distinguish current arrangements from proposed ones.",
        "examples": [
          "The organization proposes naming its programme the Meridian AI Governance Programme. It is intended to identify AI use, clarify responsibilities and review significant changes. This supports the organization’s service-quality and continuity goals. Executive sponsorship and the formal mandate are Pending confirmation from an existing management record.",
          "The organization proposes naming its programme the Stonebridge Responsible AI Programme. It aims to make AI development and operating changes traceable and protect service continuity. This supports its product-quality and workforce-capability strategy. Executive sponsor and formal mandate are Pending confirmation from the organization’s existing management records."
        ],
        "pendingExample": "Pending: the responsible owner needs to confirm 2.2 aims identity and mandate.",
        "mode": "draft",
        "condition": "Only one exact Draft/Under review document. This is a contribution for operator preparation, not automatic completion/import; source-required authority and approved-method portions remain held.",
        "expected": "Give its proposed name, intended outcomes and link to organizational goals. Sponsor and mandate stays Pending unless confirmed by an existing assignment.",
        "destinations": [
          "AIMS-Manual.docx :: T5R2C1 in the selected editable draft only"
        ],
        "key": "T5R2C1",
        "hint": "Give its proposed name, intended outcomes and link to organizational goals. Sponsor and mandate stays Pending unless confirmed by an existing assignment. Keep missing parts Pending and distinguish current arrangements from proposed ones.",
        "partial": "Pending: the responsible owner needs to confirm 2.2 aims identity and mandate.",
        "groupId": "doc-manual-identity",
        "groupTitle": "2. Organization and AIMS identity",
        "groupAudience": "Assigned document/process owner and competent specialists for their own scoped work",
        "audience": "Assigned document/process owner and competent specialists for their own scoped work",
        "profileId": "doc-manual-identity"
      },
      {
        "id": "doc-manual-t7r2c1",
        "field": "T7R2C1",
        "label": "2.4 Integration with other management systems",
        "locator": "T7R2C1",
        "question": "Which existing teams and processes does AI governance need to work with?",
        "help": "Name relevant security, privacy, procurement, HR, continuity, records or other interfaces, what each supplies and where its process is kept. Keep missing parts Pending and distinguish current arrangements from proposed ones.",
        "examples": [
          "The organization uses Procurement for supplier and contract checks, Information Security for access and change review, Privacy for relevant data-use questions, HR for competence records, and Operations for incident and continuity work. The AIMS lead coordinates these interfaces. Each team’s current process and records remain in its controlled team repository; the central document directory identifies the exact current versions.",
          "The organization connects AI governance to Engineering’s design and release process, Quality’s validation process, Operations’ incident and continuity routes, HR’s competence process and Records’ preservation rules. Procurement supplies supplier checks when external components are involved. Each function maintains its current process in the controlled Process Library, with detailed evidence in its restricted working repository. The AIMS lead coordinates handoffs without taking over those owners."
        ],
        "pendingExample": "Pending: the responsible owner needs to confirm 2.4 integration with other management systems.",
        "mode": "fact",
        "condition": "Only one exact Draft/Under review document. This is a contribution for operator preparation, not automatic completion/import; source-required authority and approved-method portions remain held.",
        "expected": "Name relevant security, privacy, procurement, HR, continuity, records or other interfaces, what each supplies and where its process is kept.",
        "destinations": [
          "AIMS-Manual.docx :: T7R2C1 in the selected editable draft only"
        ],
        "key": "T7R2C1",
        "hint": "Name relevant security, privacy, procurement, HR, continuity, records or other interfaces, what each supplies and where its process is kept. Keep missing parts Pending and distinguish current arrangements from proposed ones.",
        "partial": "Pending: the responsible owner needs to confirm 2.4 integration with other management systems.",
        "groupId": "doc-manual-identity",
        "groupTitle": "2. Organization and AIMS identity",
        "groupAudience": "Assigned document/process owner and competent specialists for their own scoped work",
        "audience": "Assigned document/process owner and competent specialists for their own scoped work",
        "profileId": "doc-manual-identity"
      }
    ]
  },
  {
    "id": "doc-manual-scope",
    "groupId": "doc-manual-scope",
    "templateId": "aims-manual-d255",
    "artifact": "AIMS-Manual.docx",
    "sourceSha256": "340d37fa3641d9896634292faf1b23a1535112f5600b6a04716a1ee9774fcf39",
    "unit": "values",
    "title": "4. AIMS scope",
    "audience": "Assigned document/process owner and competent specialists for their own scoped work",
    "context": [
      "Select the exact document Record ID and Draft/Under review version; show its current wording and appropriate approved references.",
      "Share only the permitted context. Organizational arrangements are distinct from a performed assessment, current Register row or issued Decision.",
      "The source section identifies what is needed; an ordinary contribution may leave authority, method approval or other specialist portions unresolved."
    ],
    "keys": [
      "T12R2C1",
      "T13R2C1"
    ],
    "fields": {
      "T12R2C1": "T12R2C1",
      "T13R2C1": "T13R2C1"
    },
    "catalog": [
      {
        "id": "doc-manual-t12r2c1",
        "field": "T12R2C1",
        "label": "4.1 AIMS scope statement",
        "locator": "T12R2C1",
        "question": "Which parts of the organization should the proposed AI governance boundary cover?",
        "help": "Describe proposed entities and functions and locations, AI activities and systems and interfaces. The existing review and decision route confirms scope. Keep missing parts Pending and distinguish current arrangements from proposed ones.",
        "examples": [
          "The organization proposes covering Meridian Services Ltd’s Operations and Technology functions at its North Office and South Office. Included activities are acquiring, configuring and using AI for document intake and staff drafting support. The proposal includes the internal application and external hosting interface, while customer delivery decisions remain with staff. Whether the separate logistics function belongs in scope is Pending review; no scope approval is claimed.",
          "The organization proposes covering Stonebridge Works Ltd’s Engineering and Service Operations at its West Plant and East Service Centre. Included activities are developing forecasting tools, integrating operational data and using forecasts in maintenance planning. Supplier data feeds remain identified interfaces; physical equipment control is outside the AI tool boundary. The proposed scope includes the two named sites, while the acquired subsidiary’s activities are Pending review. No scope approval is claimed."
        ],
        "pendingExample": "Pending: the responsible owner needs to confirm 4.1 aims scope statement.",
        "mode": "draft",
        "condition": "Only one exact Draft/Under review document. This is a contribution for operator preparation, not automatic completion/import; source-required authority and approved-method portions remain held.",
        "expected": "Describe proposed entities and functions and locations, AI activities and systems and interfaces. The existing review and decision route confirms scope.",
        "destinations": [
          "AIMS-Manual.docx :: T12R2C1 in the selected editable draft only"
        ],
        "key": "T12R2C1",
        "hint": "Describe proposed entities and functions and locations, AI activities and systems and interfaces. The existing review and decision route confirms scope. Keep missing parts Pending and distinguish current arrangements from proposed ones.",
        "partial": "Pending: the responsible owner needs to confirm 4.1 aims scope statement.",
        "groupId": "doc-manual-scope",
        "groupTitle": "4. AIMS scope",
        "groupAudience": "Assigned document/process owner and competent specialists for their own scoped work",
        "audience": "Assigned document/process owner and competent specialists for their own scoped work",
        "profileId": "doc-manual-scope"
      },
      {
        "id": "doc-manual-t13r2c1",
        "field": "T13R2C1",
        "label": "4.2 Boundary rationale",
        "locator": "T13R2C1",
        "question": "Why are those activities included, and what is proposed to stay outside?",
        "help": "Explain inclusions and exclusions and interfaces and unresolved obligations; an applicable requirement cannot be excluded for convenience. Keep missing parts Pending and distinguish current arrangements from proposed ones.",
        "examples": [
          "The organization proposes including Operations because staff use AI in document intake, and Technology because it configures and supports that use. The external hosting service remains an identified supplier interface. Logistics is proposed outside the initial boundary because no AI activity has yet been identified there, Pending confirmation of that fact and relevant obligations. The proposal does not exclude any applicable requirement for convenience.",
          "The organization proposes including Engineering because it develops the forecasting tool and Service Operations because it relies on the outputs. The operating-data feed remains an identified interface. The acquired subsidiary is not assumed in or out: its AI activities, obligations and organizational interfaces are Pending review. Physical equipment control is outside the tool boundary but relevant safety obligations remain considered through competent owners. These are proposed boundary reasons, not permission to exclude requirements."
        ],
        "pendingExample": "Pending: the responsible owner needs to confirm 4.2 boundary rationale.",
        "mode": "draft",
        "condition": "Only one exact Draft/Under review document. This is a contribution for operator preparation, not automatic completion/import; source-required authority and approved-method portions remain held.",
        "expected": "Explain inclusions and exclusions and interfaces and unresolved obligations; an applicable requirement cannot be excluded for convenience.",
        "destinations": [
          "AIMS-Manual.docx :: T13R2C1 in the selected editable draft only"
        ],
        "key": "T13R2C1",
        "hint": "Explain inclusions and exclusions and interfaces and unresolved obligations; an applicable requirement cannot be excluded for convenience. Keep missing parts Pending and distinguish current arrangements from proposed ones.",
        "partial": "Pending: the responsible owner needs to confirm 4.2 boundary rationale.",
        "groupId": "doc-manual-scope",
        "groupTitle": "4. AIMS scope",
        "groupAudience": "Assigned document/process owner and competent specialists for their own scoped work",
        "audience": "Assigned document/process owner and competent specialists for their own scoped work",
        "profileId": "doc-manual-scope"
      }
    ]
  },
  {
    "id": "doc-manual-authority",
    "groupId": "doc-manual-authority",
    "templateId": "aims-manual-d255",
    "artifact": "AIMS-Manual.docx",
    "sourceSha256": "340d37fa3641d9896634292faf1b23a1535112f5600b6a04716a1ee9774fcf39",
    "unit": "values",
    "title": "5. Governance and authority",
    "audience": "Assigned document/process owner and competent specialists for their own scoped work",
    "context": [
      "Select the exact document Record ID and Draft/Under review version; show its current wording and appropriate approved references.",
      "Share only the permitted context. Organizational arrangements are distinct from a performed assessment, current Register row or issued Decision.",
      "The source section identifies what is needed; an ordinary contribution may leave authority, method approval or other specialist portions unresolved."
    ],
    "keys": [
      "T17R2C1"
    ],
    "fields": {
      "T17R2C1": "T17R2C1"
    },
    "catalog": [
      {
        "id": "doc-manual-t17r2c1",
        "field": "T17R2C1",
        "label": "5.2 Concern reporting and escalation",
        "locator": "T17R2C1",
        "question": "How can people report an AI concern, including an urgent concern?",
        "help": "Describe accessible channels, responsible response route, urgent escalation, confidentiality and non-retaliation arrangements and retained-record location under existing rules. Keep missing parts Pending and distinguish current arrangements from proposed ones.",
        "examples": [
          "The organization accepts concerns through its accessible service-desk form, telephone route or confidential HR mailbox. The service-desk lead records and routes the concern; immediate service risks go to the duty operations lead under the existing incident process. HR handles confidentiality and non-retaliation arrangements under its current policy. Restricted case records are retained in the incident repository, with access limited to assigned handlers.",
          "The organization accepts concerns through an accessible employee portal, a telephone route and a confidential people-support mailbox. Service Operations’ duty supervisor handles urgent operating concerns under the existing incident procedure; the people-support team handles sensitive reports under its confidentiality and non-retaliation policy. The response coordinator records progress and routing in the restricted Concern Case Register. Access is limited to assigned handlers, with escalation using confirmed existing roles."
        ],
        "pendingExample": "Pending: the responsible owner needs to confirm 5.2 concern reporting and escalation.",
        "mode": "fact",
        "condition": "Only one exact Draft/Under review document. This is a contribution for operator preparation, not automatic completion/import; source-required authority and approved-method portions remain held.",
        "expected": "Describe accessible channels, responsible response route, urgent escalation, confidentiality and non-retaliation arrangements and retained-record location under existing rules.",
        "destinations": [
          "AIMS-Manual.docx :: T17R2C1 in the selected editable draft only"
        ],
        "key": "T17R2C1",
        "hint": "Describe accessible channels, responsible response route, urgent escalation, confidentiality and non-retaliation arrangements and retained-record location under existing rules. Keep missing parts Pending and distinguish current arrangements from proposed ones.",
        "partial": "Pending: the responsible owner needs to confirm 5.2 concern reporting and escalation.",
        "groupId": "doc-manual-authority",
        "groupTitle": "5. Governance and authority",
        "groupAudience": "Assigned document/process owner and competent specialists for their own scoped work",
        "audience": "Assigned document/process owner and competent specialists for their own scoped work",
        "profileId": "doc-manual-authority"
      }
    ]
  },
  {
    "id": "doc-manual-support",
    "groupId": "doc-manual-support",
    "templateId": "aims-manual-d255",
    "artifact": "AIMS-Manual.docx",
    "sourceSha256": "340d37fa3641d9896634292faf1b23a1535112f5600b6a04716a1ee9774fcf39",
    "unit": "values",
    "title": "8. Support arrangements",
    "audience": "Assigned document/process owner and competent specialists for their own scoped work",
    "context": [
      "Select the exact document Record ID and Draft/Under review version; show its current wording and appropriate approved references.",
      "Share only the permitted context. Organizational arrangements are distinct from a performed assessment, current Register row or issued Decision.",
      "The source section identifies what is needed; an ordinary contribution may leave authority, method approval or other specialist portions unresolved."
    ],
    "keys": [
      "T21R2C1",
      "T22R2C1",
      "T23R2C1"
    ],
    "fields": {
      "T21R2C1": "T21R2C1",
      "T22R2C1": "T22R2C1",
      "T23R2C1": "T23R2C1"
    },
    "catalog": [
      {
        "id": "doc-manual-t21r2c1",
        "field": "T21R2C1",
        "label": "8.1 Resource and competence arrangements",
        "locator": "T21R2C1",
        "question": "How does the organization provide people and resources for AI work?",
        "help": "Describe existing resource owners, competence needs, gap responses, qualification and training evidence, recorded decision routes and review triggers. Keep missing parts Pending and distinguish current arrangements from proposed ones.",
        "examples": [
          "The organization’s team managers identify staffing and resource needs and use the existing budget approval route. HR maintains role competence criteria, training completion and qualification records in its personnel system. Skill gaps are addressed through training, supervised work or competent external specialists. Managers review competence annually and after material role or system changes; resource decisions remain in the budget records rather than being approved by this answer.",
          "The organization’s Engineering and Service managers identify resources through quarterly planning and request approval through the existing budget route. HR maintains role competence criteria and retained qualification records; technical reviewers also complete observed work assessments. Gaps are addressed by supervised work, training or competent external review. Managers reconsider resource and competence needs after material system or role changes and at the scheduled review. This description does not approve a new budget or appoint a reviewer."
        ],
        "pendingExample": "Pending: the responsible owner needs to confirm 8.1 resource and competence arrangements.",
        "mode": "fact",
        "condition": "Only one exact Draft/Under review document. This is a contribution for operator preparation, not automatic completion/import; source-required authority and approved-method portions remain held.",
        "expected": "Describe existing resource owners, competence needs, gap responses, qualification and training evidence, recorded decision routes and review triggers.",
        "destinations": [
          "AIMS-Manual.docx :: T21R2C1 in the selected editable draft only"
        ],
        "key": "T21R2C1",
        "hint": "Describe existing resource owners, competence needs, gap responses, qualification and training evidence, recorded decision routes and review triggers. Keep missing parts Pending and distinguish current arrangements from proposed ones.",
        "partial": "Pending: the responsible owner needs to confirm 8.1 resource and competence arrangements.",
        "groupId": "doc-manual-support",
        "groupTitle": "8. Support arrangements",
        "groupAudience": "Assigned document/process owner and competent specialists for their own scoped work",
        "audience": "Assigned document/process owner and competent specialists for their own scoped work",
        "profileId": "doc-manual-support"
      },
      {
        "id": "doc-manual-t22r2c1",
        "field": "T22R2C1",
        "label": "8.2 Awareness and communication arrangements",
        "locator": "T22R2C1",
        "question": "How does the organization explain AI responsibilities and communicate important changes?",
        "help": "Give audiences, required understanding, delivery and check, sender and content owner, timing, channels, accessibility, urgent route and retained records. Keep missing parts Pending and distinguish current arrangements from proposed ones.",
        "examples": [
          "The organization briefs staff and contractors at onboarding on permitted AI use, their responsibilities and the concern route, then checks understanding with short practical exercises. The policy owner controls the content and team leads deliver accessible briefings, with translated material where needed. Material changes are explained before the affected work begins; urgent restrictions use the duty operations alert route. Approved messages, attendance and understanding-check records are retained in the training and communication repositories.",
          "The organization provides role-specific briefings for engineers, planners, supervisors and relevant contractors on their AI duties, limits and concern channels. The procedure owner controls content; team supervisors deliver practical sessions and check understanding using realistic tasks. Briefings occur before new work and after material changes. Accessible formats and language support are available; urgent restrictions use the duty-supervisor alert route. Content, attendance and understanding checks remain in the Training Register and approved Communication Log."
        ],
        "pendingExample": "Pending: the responsible owner needs to confirm 8.2 awareness and communication arrangements.",
        "mode": "fact",
        "condition": "Only one exact Draft/Under review document. This is a contribution for operator preparation, not automatic completion/import; source-required authority and approved-method portions remain held.",
        "expected": "Give audiences, required understanding, delivery and check, sender and content owner, timing, channels, accessibility, urgent route and retained records.",
        "destinations": [
          "AIMS-Manual.docx :: T22R2C1 in the selected editable draft only"
        ],
        "key": "T22R2C1",
        "hint": "Give audiences, required understanding, delivery and check, sender and content owner, timing, channels, accessibility, urgent route and retained records. Keep missing parts Pending and distinguish current arrangements from proposed ones.",
        "partial": "Pending: the responsible owner needs to confirm 8.2 awareness and communication arrangements.",
        "groupId": "doc-manual-support",
        "groupTitle": "8. Support arrangements",
        "groupAudience": "Assigned document/process owner and competent specialists for their own scoped work",
        "audience": "Assigned document/process owner and competent specialists for their own scoped work",
        "profileId": "doc-manual-support"
      },
      {
        "id": "doc-manual-t23r2c1",
        "field": "T23R2C1",
        "label": "8.3 Document and record control",
        "locator": "T23R2C1",
        "question": "How are AI governance documents and records stored and kept usable?",
        "help": "Describe existing repositories, permitted access, version and review and approval rules, retention authority, backup and recovery and external-source monitoring; do not invent those policies. Keep missing parts Pending and distinguish current arrangements from proposed ones.",
        "examples": [
          "The organization keeps current procedures in its controlled document system and detailed evidence in restricted team repositories. Named owners draft changes, assigned reviewers check them and the existing document authority records approval before release. Access follows the information-classification policy; versions and predecessors remain retrievable. Records staff apply the approved retention schedule and legal holds, with daily backup and quarterly recovery tests under the existing IT procedure. Source owners check external updates at the recorded review interval and after relevant change notices.",
          "The organization keeps controlled procedures in its Process Library and engineering/test evidence in a restricted Evidence Vault. Owners propose changes, assigned reviewers inspect them and the recorded document authority approves releases under Document Control Procedure DC-02. Access follows its classification policy and versions/predecessors remain retrievable. Records staff apply Retention Schedule RS-01 and legal holds; IT performs nightly backup and recorded recovery tests. External-source owners monitor notices and planned reviews. No new access, retention or disposal rule is created by this answer."
        ],
        "pendingExample": "Pending: the responsible owner needs to confirm 8.3 document and record control.",
        "mode": "fact",
        "condition": "Only one exact Draft/Under review document. This is a contribution for operator preparation, not automatic completion/import; source-required authority and approved-method portions remain held.",
        "expected": "Describe existing repositories, permitted access, version and review and approval rules, retention authority, backup and recovery and external-source monitoring; do not invent those policies.",
        "destinations": [
          "AIMS-Manual.docx :: T23R2C1 in the selected editable draft only"
        ],
        "key": "T23R2C1",
        "hint": "Describe existing repositories, permitted access, version and review and approval rules, retention authority, backup and recovery and external-source monitoring; do not invent those policies. Keep missing parts Pending and distinguish current arrangements from proposed ones.",
        "partial": "Pending: the responsible owner needs to confirm 8.3 document and record control.",
        "groupId": "doc-manual-support",
        "groupTitle": "8. Support arrangements",
        "groupAudience": "Assigned document/process owner and competent specialists for their own scoped work",
        "audience": "Assigned document/process owner and competent specialists for their own scoped work",
        "profileId": "doc-manual-support"
      }
    ]
  },
  {
    "id": "doc-manual-glossary",
    "groupId": "doc-manual-glossary",
    "templateId": "aims-manual-d255",
    "artifact": "AIMS-Manual.docx",
    "sourceSha256": "340d37fa3641d9896634292faf1b23a1535112f5600b6a04716a1ee9774fcf39",
    "unit": "glossary_rows",
    "title": "Appendix A. Organization-specific terms",
    "audience": "Assigned document/process owner and competent specialists for their own scoped work",
    "context": [
      "Select the exact document Record ID and Draft/Under review version; show its current wording and appropriate approved references.",
      "Share only the permitted context. Organizational arrangements are distinct from a performed assessment, current Register row or issued Decision.",
      "The source section identifies what is needed; an ordinary contribution may leave authority, method approval or other specialist portions unresolved."
    ],
    "keys": [
      "T27R2C1",
      "T27R2C2",
      "T27R2C3"
    ],
    "fields": {
      "T27R2C1": "term",
      "T27R2C2": "meaning",
      "T27R2C3": "source"
    },
    "catalog": [
      {
        "id": "doc-manual-t27r2c1",
        "field": "T27R2C1",
        "label": "Term or abbreviation",
        "locator": "T27R2C1",
        "question": "Which local term needs explaining?",
        "help": "Give only an organization-specific term needed in this document. These literal term examples belong in the term box; the organization-specific explanation belongs in the separate meaning question.",
        "examples": [
          "Intake review",
          "Restricted feature"
        ],
        "pendingExample": "Pending: the document owner needs to confirm this term and its source.",
        "mode": "fact",
        "condition": "Optional: term is needed, and one exact editable glossary row is selected. The row must be pinned before any mapping.",
        "expected": "Give only an organization-specific term needed in this document.",
        "destinations": [
          "AIMS-Manual.docx :: T27R2C1 on the exact selected draft glossary row only"
        ],
        "key": "T27R2C1",
        "hint": "Give only an organization-specific term needed in this document. These literal term examples belong in the term box; the organization-specific explanation belongs in the separate meaning question.",
        "partial": "Pending: the document owner needs to confirm this term and its source.",
        "groupId": "doc-manual-glossary",
        "groupTitle": "Appendix A. Organization-specific terms",
        "groupAudience": "Assigned document/process owner and competent specialists for their own scoped work",
        "audience": "Assigned document/process owner and competent specialists for their own scoped work",
        "profileId": "doc-manual-glossary"
      },
      {
        "id": "doc-manual-t27r2c2",
        "field": "T27R2C2",
        "label": "Organization-specific meaning",
        "locator": "T27R2C2",
        "question": "What does that local term mean?",
        "help": "Explain its local meaning without redefining standards or legal terms.",
        "examples": [
          "The organization uses intake review to mean the first recorded check of a proposed AI activity.",
          "The organization uses restricted feature to mean a capability unavailable while a recorded issue is reviewed."
        ],
        "pendingExample": "Pending: the document owner needs to confirm this term and its source.",
        "mode": "fact",
        "condition": "Optional: term is needed, and one exact editable glossary row is selected. The row must be pinned before any mapping.",
        "expected": "Explain its local meaning without redefining standards or legal terms.",
        "destinations": [
          "AIMS-Manual.docx :: T27R2C2 on the exact selected draft glossary row only"
        ],
        "key": "T27R2C2",
        "hint": "Explain its local meaning without redefining standards or legal terms.",
        "partial": "Pending: the document owner needs to confirm this term and its source.",
        "groupId": "doc-manual-glossary",
        "groupTitle": "Appendix A. Organization-specific terms",
        "groupAudience": "Assigned document/process owner and competent specialists for their own scoped work",
        "audience": "Assigned document/process owner and competent specialists for their own scoped work",
        "profileId": "doc-manual-glossary"
      },
      {
        "id": "doc-manual-t27r2c3",
        "field": "T27R2C3",
        "label": "Authority / source",
        "locator": "T27R2C3",
        "question": "Where is that local meaning defined?",
        "help": "Name the existing source or responsible terminology owner; a missing source stays Pending.",
        "examples": [
          "The organization defines intake review in its lifecycle procedure.",
          "The organization defines restricted feature in its operating change procedure."
        ],
        "pendingExample": "Pending: the document owner needs to confirm this term and its source.",
        "mode": "fact",
        "condition": "Optional: term is needed, and one exact editable glossary row is selected. The row must be pinned before any mapping.",
        "expected": "Name the existing source or responsible terminology owner; a missing source stays Pending.",
        "destinations": [
          "AIMS-Manual.docx :: T27R2C3 on the exact selected draft glossary row only"
        ],
        "key": "T27R2C3",
        "hint": "Name the existing source or responsible terminology owner; a missing source stays Pending.",
        "partial": "Pending: the document owner needs to confirm this term and its source.",
        "groupId": "doc-manual-glossary",
        "groupTitle": "Appendix A. Organization-specific terms",
        "groupAudience": "Assigned document/process owner and competent specialists for their own scoped work",
        "audience": "Assigned document/process owner and competent specialists for their own scoped work",
        "profileId": "doc-manual-glossary"
      }
    ]
  },
  {
    "id": "doc-policy-exceptions",
    "groupId": "doc-policy-exceptions",
    "templateId": "ai-governance-policy-d255",
    "artifact": "AI-Governance-Policy.docx",
    "sourceSha256": "5cfe7c0f990d75300f1b72228a0542c144ff2220a9f9856b7b244913b50ebdc9",
    "unit": "values",
    "title": "7 Exceptions concerns and nonconformity",
    "audience": "Assigned document/process owner and competent specialists for their own scoped work",
    "context": [
      "Select the exact document Record ID and Draft/Under review version; show its current wording and appropriate approved references.",
      "Share only the permitted context. Organizational arrangements are distinct from a performed assessment, current Register row or issued Decision.",
      "The source section identifies what is needed; an ordinary contribution may leave authority, method approval or other specialist portions unresolved."
    ],
    "keys": [
      "T10R2C1"
    ],
    "fields": {
      "T10R2C1": "T10R2C1"
    },
    "catalog": [
      {
        "id": "doc-policy-t10r2c1",
        "field": "T10R2C1",
        "label": "Concern and suspected violation route",
        "locator": "T10R2C1",
        "question": "Where should people raise an AI concern or suspected policy breach?",
        "help": "Describe confirmed reporting and urgent routes, response owner, confidentiality and non-retaliation and record location; reuse the Manual route where it owns this arrangement. Keep missing parts Pending and distinguish current arrangements from proposed ones.",
        "examples": [
          "The organization uses the Manual’s service-desk form and telephone route for AI concerns, and its confidential HR mailbox for sensitive reports. The service-desk lead coordinates responses; urgent service risks follow the duty operations escalation route. Confidentiality and non-retaliation follow the existing HR policy. Records stay in the restricted incident repository, and the Policy points to the exact current Manual rather than creating a competing channel.",
          "The organization uses the Manual’s employee portal, telephone route and confidential people-support mailbox for AI concerns. The response coordinator maintains progress; urgent operational concerns go to the duty supervisor under the existing incident route. Confidentiality and non-retaliation follow the current people-support policy. Restricted records stay in the Concern Case Register. The Policy points to the exact current Manual instead of creating a separate competing response process."
        ],
        "pendingExample": "Pending: the responsible owner needs to confirm concern and suspected violation route.",
        "mode": "fact",
        "condition": "Only one exact Draft/Under review document. This is a contribution for operator preparation, not automatic completion/import; source-required authority and approved-method portions remain held.",
        "expected": "Describe confirmed reporting and urgent routes, response owner, confidentiality and non-retaliation and record location; reuse the Manual route where it owns this arrangement.",
        "destinations": [
          "AI-Governance-Policy.docx :: T10R2C1 in the selected editable draft only"
        ],
        "key": "T10R2C1",
        "hint": "Describe confirmed reporting and urgent routes, response owner, confidentiality and non-retaliation and record location; reuse the Manual route where it owns this arrangement. Keep missing parts Pending and distinguish current arrangements from proposed ones.",
        "partial": "Pending: the responsible owner needs to confirm concern and suspected violation route.",
        "groupId": "doc-policy-exceptions",
        "groupTitle": "7 Exceptions concerns and nonconformity",
        "groupAudience": "Assigned document/process owner and competent specialists for their own scoped work",
        "audience": "Assigned document/process owner and competent specialists for their own scoped work",
        "profileId": "doc-policy-exceptions"
      }
    ]
  },
  {
    "id": "doc-policy-communication",
    "groupId": "doc-policy-communication",
    "templateId": "ai-governance-policy-d255",
    "artifact": "AI-Governance-Policy.docx",
    "sourceSha256": "5cfe7c0f990d75300f1b72228a0542c144ff2220a9f9856b7b244913b50ebdc9",
    "unit": "values",
    "title": "8 Communication and availability",
    "audience": "Assigned document/process owner and competent specialists for their own scoped work",
    "context": [
      "Select the exact document Record ID and Draft/Under review version; show its current wording and appropriate approved references.",
      "Share only the permitted context. Organizational arrangements are distinct from a performed assessment, current Register row or issued Decision.",
      "The source section identifies what is needed; an ordinary contribution may leave authority, method approval or other specialist portions unresolved."
    ],
    "keys": [
      "T11R2C1"
    ],
    "fields": {
      "T11R2C1": "T11R2C1"
    },
    "catalog": [
      {
        "id": "doc-policy-t11r2c1",
        "field": "T11R2C1",
        "label": "Communication and availability plan",
        "locator": "T11R2C1",
        "question": "How will the current AI Policy reach people who need it?",
        "help": "Describe audiences, approved content and extract, sender, timing, channel, accessibility, controlled location and planned evidence. Release approval stays separate. Keep missing parts Pending and distinguish current arrangements from proposed ones.",
        "examples": [
          "The organization proposes that the policy owner approve communication content through the existing document release route, then team leads brief staff and contractors at onboarding and before material changes. The current approved Policy would be available in the internal document system, with accessible and translated versions where needed. A public extract for customers would require separate release review. Attendance, delivered content and acknowledgement records would remain in the communication repository. The actual release decision is Pending.",
          "The organization proposes that the policy owner prepare role-specific materials for engineers, planners, supervisors and contractors, with release review through the existing document route. Supervisors would explain the approved Policy before relevant work and after material changes, using accessible formats and practical understanding checks. The current internal version would be in the Process Library; a public extract would need separate review. Materials, attendance and checks would be retained in the Communication Log and Training Register. Actual release approval is Pending."
        ],
        "pendingExample": "Pending: the responsible owner needs to confirm communication and availability plan.",
        "mode": "draft",
        "condition": "Only one exact Draft/Under review document. This is a contribution for operator preparation, not automatic completion/import; source-required authority and approved-method portions remain held.",
        "expected": "Describe audiences, approved content and extract, sender, timing, channel, accessibility, controlled location and planned evidence. Release approval stays separate.",
        "destinations": [
          "AI-Governance-Policy.docx :: T11R2C1 in the selected editable draft only"
        ],
        "key": "T11R2C1",
        "hint": "Describe audiences, approved content and extract, sender, timing, channel, accessibility, controlled location and planned evidence. Release approval stays separate. Keep missing parts Pending and distinguish current arrangements from proposed ones.",
        "partial": "Pending: the responsible owner needs to confirm communication and availability plan.",
        "groupId": "doc-policy-communication",
        "groupTitle": "8 Communication and availability",
        "groupAudience": "Assigned document/process owner and competent specialists for their own scoped work",
        "audience": "Assigned document/process owner and competent specialists for their own scoped work",
        "profileId": "doc-policy-communication"
      }
    ]
  },
  {
    "id": "doc-policy-monitoring",
    "groupId": "doc-policy-monitoring",
    "templateId": "ai-governance-policy-d255",
    "artifact": "AI-Governance-Policy.docx",
    "sourceSha256": "5cfe7c0f990d75300f1b72228a0542c144ff2220a9f9856b7b244913b50ebdc9",
    "unit": "values",
    "title": "9 Monitoring and review",
    "audience": "Assigned document/process owner and competent specialists for their own scoped work",
    "context": [
      "Select the exact document Record ID and Draft/Under review version; show its current wording and appropriate approved references.",
      "Share only the permitted context. Organizational arrangements are distinct from a performed assessment, current Register row or issued Decision.",
      "The source section identifies what is needed; an ordinary contribution may leave authority, method approval or other specialist portions unresolved."
    ],
    "keys": [
      "T13R2C1"
    ],
    "fields": {
      "T13R2C1": "T13R2C1"
    },
    "catalog": [
      {
        "id": "doc-policy-t13r2c1",
        "field": "T13R2C1",
        "label": "Planned review and event triggers",
        "locator": "T13R2C1",
        "question": "When should the AI Policy be reviewed, and what should trigger earlier review?",
        "help": "State proposed interval or date, assigned review route, retained-review location and material event triggers; do not claim review and approval happened. Keep missing parts Pending and distinguish current arrangements from proposed ones.",
        "examples": [
          "The organization proposes annual Policy review each October by the assigned policy owner, using the existing document reviewer and approver route. Earlier review would follow material AI-use or scope changes, significant incidents, recurring complaints, changed obligations or a management-review decision. The review record and resulting version history would be retained in the controlled document system. The named review assignment and next actual calendar date are Pending confirmation; this is a proposed schedule, not a performed review.",
          "The organization proposes reviewing the Policy every six months during expansion, coordinated by its assigned policy owner through the existing reviewer and approver route. Earlier review would follow new activities, changed obligations, major incidents, repeated complaints or management-review decisions. Review records and controlled revisions would stay in the Process Library. The next actual date and current role assignment are Pending confirmation; the proposal does not claim that a review has already occurred."
        ],
        "pendingExample": "Pending: the responsible owner needs to confirm planned review and event triggers.",
        "mode": "draft",
        "condition": "Only one exact Draft/Under review document. This is a contribution for operator preparation, not automatic completion/import; source-required authority and approved-method portions remain held.",
        "expected": "State proposed interval or date, assigned review route, retained-review location and material event triggers; do not claim review and approval happened.",
        "destinations": [
          "AI-Governance-Policy.docx :: T13R2C1 in the selected editable draft only"
        ],
        "key": "T13R2C1",
        "hint": "State proposed interval or date, assigned review route, retained-review location and material event triggers; do not claim review and approval happened. Keep missing parts Pending and distinguish current arrangements from proposed ones.",
        "partial": "Pending: the responsible owner needs to confirm planned review and event triggers.",
        "groupId": "doc-policy-monitoring",
        "groupTitle": "9 Monitoring and review",
        "groupAudience": "Assigned document/process owner and competent specialists for their own scoped work",
        "audience": "Assigned document/process owner and competent specialists for their own scoped work",
        "profileId": "doc-policy-monitoring"
      }
    ]
  },
  {
    "id": "doc-policy-glossary",
    "groupId": "doc-policy-glossary",
    "templateId": "ai-governance-policy-d255",
    "artifact": "AI-Governance-Policy.docx",
    "sourceSha256": "5cfe7c0f990d75300f1b72228a0542c144ff2220a9f9856b7b244913b50ebdc9",
    "unit": "glossary_rows",
    "title": "Appendix A Organization specific terms",
    "audience": "Assigned document/process owner and competent specialists for their own scoped work",
    "context": [
      "Select the exact document Record ID and Draft/Under review version; show its current wording and appropriate approved references.",
      "Share only the permitted context. Organizational arrangements are distinct from a performed assessment, current Register row or issued Decision.",
      "The source section identifies what is needed; an ordinary contribution may leave authority, method approval or other specialist portions unresolved."
    ],
    "keys": [
      "T15R2C1",
      "T15R2C2",
      "T15R2C3"
    ],
    "fields": {
      "T15R2C1": "term",
      "T15R2C2": "meaning",
      "T15R2C3": "source"
    },
    "catalog": [
      {
        "id": "doc-policy-t15r2c1",
        "field": "T15R2C1",
        "label": "Term or abbreviation",
        "locator": "T15R2C1",
        "question": "Which local term needs explaining?",
        "help": "Give only an organization-specific term needed in this document. These literal term examples belong in the term box; the organization-specific explanation belongs in the separate meaning question.",
        "examples": [
          "Intake review",
          "Restricted feature"
        ],
        "pendingExample": "Pending: the document owner needs to confirm this term and its source.",
        "mode": "fact",
        "condition": "Optional: term is needed, and one exact editable glossary row is selected. The row must be pinned before any mapping.",
        "expected": "Give only an organization-specific term needed in this document.",
        "destinations": [
          "AI-Governance-Policy.docx :: T15R2C1 on the exact selected draft glossary row only"
        ],
        "key": "T15R2C1",
        "hint": "Give only an organization-specific term needed in this document. These literal term examples belong in the term box; the organization-specific explanation belongs in the separate meaning question.",
        "partial": "Pending: the document owner needs to confirm this term and its source.",
        "groupId": "doc-policy-glossary",
        "groupTitle": "Appendix A Organization specific terms",
        "groupAudience": "Assigned document/process owner and competent specialists for their own scoped work",
        "audience": "Assigned document/process owner and competent specialists for their own scoped work",
        "profileId": "doc-policy-glossary"
      },
      {
        "id": "doc-policy-t15r2c2",
        "field": "T15R2C2",
        "label": "Organization-specific meaning",
        "locator": "T15R2C2",
        "question": "What does that local term mean?",
        "help": "Explain its local meaning without redefining standards or legal terms.",
        "examples": [
          "The organization uses intake review to mean the first recorded check of a proposed AI activity.",
          "The organization uses restricted feature to mean a capability unavailable while a recorded issue is reviewed."
        ],
        "pendingExample": "Pending: the document owner needs to confirm this term and its source.",
        "mode": "fact",
        "condition": "Optional: term is needed, and one exact editable glossary row is selected. The row must be pinned before any mapping.",
        "expected": "Explain its local meaning without redefining standards or legal terms.",
        "destinations": [
          "AI-Governance-Policy.docx :: T15R2C2 on the exact selected draft glossary row only"
        ],
        "key": "T15R2C2",
        "hint": "Explain its local meaning without redefining standards or legal terms.",
        "partial": "Pending: the document owner needs to confirm this term and its source.",
        "groupId": "doc-policy-glossary",
        "groupTitle": "Appendix A Organization specific terms",
        "groupAudience": "Assigned document/process owner and competent specialists for their own scoped work",
        "audience": "Assigned document/process owner and competent specialists for their own scoped work",
        "profileId": "doc-policy-glossary"
      },
      {
        "id": "doc-policy-t15r2c3",
        "field": "T15R2C3",
        "label": "Authority or source",
        "locator": "T15R2C3",
        "question": "Where is that local meaning defined?",
        "help": "Name the existing source or responsible terminology owner; a missing source stays Pending.",
        "examples": [
          "The organization defines intake review in its lifecycle procedure.",
          "The organization defines restricted feature in its operating change procedure."
        ],
        "pendingExample": "Pending: the document owner needs to confirm this term and its source.",
        "mode": "fact",
        "condition": "Optional: term is needed, and one exact editable glossary row is selected. The row must be pinned before any mapping.",
        "expected": "Name the existing source or responsible terminology owner; a missing source stays Pending.",
        "destinations": [
          "AI-Governance-Policy.docx :: T15R2C3 on the exact selected draft glossary row only"
        ],
        "key": "T15R2C3",
        "hint": "Name the existing source or responsible terminology owner; a missing source stays Pending.",
        "partial": "Pending: the document owner needs to confirm this term and its source.",
        "groupId": "doc-policy-glossary",
        "groupTitle": "Appendix A Organization specific terms",
        "groupAudience": "Assigned document/process owner and competent specialists for their own scoped work",
        "audience": "Assigned document/process owner and competent specialists for their own scoped work",
        "profileId": "doc-policy-glossary"
      }
    ]
  },
  {
    "id": "doc-risk-method-impacts",
    "groupId": "doc-risk-method-impacts",
    "templateId": "ai-risk-impact-procedure",
    "artifact": "AI-Risk-and-Impact-Management-Procedure.docx",
    "sourceSha256": "79963d254f5f04a0497fbca473adab8de9ec0c6eea94beb5f0cb3a647bfe0b0b",
    "unit": "values",
    "title": "6 Impact screening and assessment",
    "audience": "Assigned document/process owner and competent specialists for their own scoped work",
    "context": [
      "Select the exact document Record ID and Draft/Under review version; show its current wording and appropriate approved references.",
      "Share only the permitted context. Organizational arrangements are distinct from a performed assessment, current Register row or issued Decision.",
      "The source section identifies what is needed; an ordinary contribution may leave authority, method approval or other specialist portions unresolved."
    ],
    "keys": [
      "T23R2C1"
    ],
    "fields": {
      "T23R2C1": "T23R2C1"
    },
    "catalog": [
      {
        "id": "doc-risk-method-t23r2c1",
        "field": "T23R2C1",
        "label": "Organization impact-assessment depth and consultation rule",
        "locator": "T23R2C1",
        "question": "How should specialists and affected people contribute when the organization studies AI effects?",
        "help": "Propose how detailed the review should be, expertise, affected-party input, accessibility, sensitive-data handling, disagreement records and escalation. Method owner and relevant specialists review it. Keep missing parts Pending and distinguish current arrangements from proposed ones.",
        "examples": [
          "The organization proposes that the assessment lead choose analysis depth with competent domain, privacy, security or safety specialists where relevant. Process users and affected people would be consulted through accessible interviews or written responses, with language support where needed. Sensitive feedback would remain in a restricted assessment repository. The assessment would retain disagreements, non-participation and evidence limits. Potentially serious effects or missing necessary expertise would be escalated through the existing route; approval of these depth and escalation rules remains Pending.",
          "The organization proposes involving planners, workers and affected contractors through accessible discussions about likely AI effects. The assessment lead would request engineering, safety, privacy or other specialist input where needed, with deeper analysis for potentially material effects. Sensitive feedback would be stored in restricted assessment records; disagreement, missing perspectives and participation limits would remain visible. Missing expertise or possible serious effects would use the confirmed escalation route. The rules for review depth and escalation still require method approval."
        ],
        "pendingExample": "Pending: the responsible owner needs to confirm organization impact-assessment depth and consultation rule.",
        "mode": "draft",
        "condition": "Only one exact Draft/Under review document. This is a contribution for operator preparation, not automatic completion/import; source-required authority and approved-method portions remain held.",
        "expected": "Propose how detailed the review should be, expertise, affected-party input, accessibility, sensitive-data handling, disagreement records and escalation. Method owner and relevant specialists review it.",
        "destinations": [
          "AI-Risk-and-Impact-Management-Procedure.docx :: T23R2C1 in the selected editable draft only"
        ],
        "key": "T23R2C1",
        "hint": "Propose how detailed the review should be, expertise, affected-party input, accessibility, sensitive-data handling, disagreement records and escalation. Method owner and relevant specialists review it. Keep missing parts Pending and distinguish current arrangements from proposed ones.",
        "partial": "Pending: the responsible owner needs to confirm organization impact-assessment depth and consultation rule.",
        "groupId": "doc-risk-method-impacts",
        "groupTitle": "6 Impact screening and assessment",
        "groupAudience": "Assigned document/process owner and competent specialists for their own scoped work",
        "audience": "Assigned document/process owner and competent specialists for their own scoped work",
        "profileId": "doc-risk-method-impacts"
      }
    ]
  },
  {
    "id": "doc-risk-method-monitoring",
    "groupId": "doc-risk-method-monitoring",
    "templateId": "ai-risk-impact-procedure",
    "artifact": "AI-Risk-and-Impact-Management-Procedure.docx",
    "sourceSha256": "79963d254f5f04a0497fbca473adab8de9ec0c6eea94beb5f0cb3a647bfe0b0b",
    "unit": "values",
    "title": "10 Implementation, verification, monitoring, and reassessment",
    "audience": "Assigned document/process owner and competent specialists for their own scoped work",
    "context": [
      "Select the exact document Record ID and Draft/Under review version; show its current wording and appropriate approved references.",
      "Share only the permitted context. Organizational arrangements are distinct from a performed assessment, current Register row or issued Decision.",
      "The source section identifies what is needed; an ordinary contribution may leave authority, method approval or other specialist portions unresolved."
    ],
    "keys": [
      "T31R2C1"
    ],
    "fields": {
      "T31R2C1": "T31R2C1"
    },
    "catalog": [
      {
        "id": "doc-risk-method-t31r2c1",
        "field": "T31R2C1",
        "label": "Monitoring and reassessment configuration",
        "locator": "T31R2C1",
        "question": "What should be monitored so changes or problems lead to fresh risk review?",
        "help": "Propose measures, threshold sources, responsible process, interval and events, escalation and evidence; reassessment authority and supersession rules need existing confirmed records. Keep missing parts Pending and distinguish current arrangements from proposed ones.",
        "examples": [
          "The organization proposes monitoring errors, complaints, operating changes and affected-party feedback using its existing operations records. The process owner would coordinate quarterly review and earlier review after a material model, data, configuration, use or obligation change. Proposed thresholds would reference the approved method; their exact values are Pending. Urgent signals would use the incident route and be retained with the assessed baseline. Reassessment authority, supersession rules and approval of this configuration are Pending confirmation.",
          "The organization proposes monitoring forecasts, service failures, workload effects and worker feedback through the Planning Monitoring Report and incident records. The process owner would coordinate monthly review during the pilot and review after significant changes or adverse signals. Thresholds would reference the approved method; exact values are Pending. Urgent concerns would go through the duty-supervisor incident route. Reassessment authority, baseline preservation and supersession rules would be confirmed from existing records before approval of this configuration."
        ],
        "pendingExample": "Pending: the responsible owner needs to confirm monitoring and reassessment configuration.",
        "mode": "draft",
        "condition": "Only one exact Draft/Under review document. This is a contribution for operator preparation, not automatic completion/import; source-required authority and approved-method portions remain held.",
        "expected": "Propose measures, threshold sources, responsible process, interval and events, escalation and evidence; reassessment authority and supersession rules need existing confirmed records.",
        "destinations": [
          "AI-Risk-and-Impact-Management-Procedure.docx :: T31R2C1 in the selected editable draft only"
        ],
        "key": "T31R2C1",
        "hint": "Propose measures, threshold sources, responsible process, interval and events, escalation and evidence; reassessment authority and supersession rules need existing confirmed records. Keep missing parts Pending and distinguish current arrangements from proposed ones.",
        "partial": "Pending: the responsible owner needs to confirm monitoring and reassessment configuration.",
        "groupId": "doc-risk-method-monitoring",
        "groupTitle": "10 Implementation, verification, monitoring, and reassessment",
        "groupAudience": "Assigned document/process owner and competent specialists for their own scoped work",
        "audience": "Assigned document/process owner and competent specialists for their own scoped work",
        "profileId": "doc-risk-method-monitoring"
      }
    ]
  },
  {
    "id": "doc-risk-method-glossary",
    "groupId": "doc-risk-method-glossary",
    "templateId": "ai-risk-impact-procedure",
    "artifact": "AI-Risk-and-Impact-Management-Procedure.docx",
    "sourceSha256": "79963d254f5f04a0497fbca473adab8de9ec0c6eea94beb5f0cb3a647bfe0b0b",
    "unit": "glossary_rows",
    "title": "Appendix C Organization-specific terms",
    "audience": "Assigned document/process owner and competent specialists for their own scoped work",
    "context": [
      "Select the exact document Record ID and Draft/Under review version; show its current wording and appropriate approved references.",
      "Share only the permitted context. Organizational arrangements are distinct from a performed assessment, current Register row or issued Decision.",
      "The source section identifies what is needed; an ordinary contribution may leave authority, method approval or other specialist portions unresolved."
    ],
    "keys": [
      "T35R2C1",
      "T35R2C2",
      "T35R2C3"
    ],
    "fields": {
      "T35R2C1": "term",
      "T35R2C2": "meaning",
      "T35R2C3": "source"
    },
    "catalog": [
      {
        "id": "doc-risk-method-t35r2c1",
        "field": "T35R2C1",
        "label": "Term or abbreviation",
        "locator": "T35R2C1",
        "question": "Which local term needs explaining?",
        "help": "Give only an organization-specific term needed in this document. These literal term examples belong in the term box; the organization-specific explanation belongs in the separate meaning question.",
        "examples": [
          "Intake review",
          "Restricted feature"
        ],
        "pendingExample": "Pending: the document owner needs to confirm this term and its source.",
        "mode": "fact",
        "condition": "Optional: term is needed, and one exact editable glossary row is selected. The row must be pinned before any mapping.",
        "expected": "Give only an organization-specific term needed in this document.",
        "destinations": [
          "AI-Risk-and-Impact-Management-Procedure.docx :: T35R2C1 on the exact selected draft glossary row only"
        ],
        "key": "T35R2C1",
        "hint": "Give only an organization-specific term needed in this document. These literal term examples belong in the term box; the organization-specific explanation belongs in the separate meaning question.",
        "partial": "Pending: the document owner needs to confirm this term and its source.",
        "groupId": "doc-risk-method-glossary",
        "groupTitle": "Appendix C Organization-specific terms",
        "groupAudience": "Assigned document/process owner and competent specialists for their own scoped work",
        "audience": "Assigned document/process owner and competent specialists for their own scoped work",
        "profileId": "doc-risk-method-glossary"
      },
      {
        "id": "doc-risk-method-t35r2c2",
        "field": "T35R2C2",
        "label": "Organization-specific meaning",
        "locator": "T35R2C2",
        "question": "What does that local term mean?",
        "help": "Explain its local meaning without redefining standards or legal terms.",
        "examples": [
          "The organization uses intake review to mean the first recorded check of a proposed AI activity.",
          "The organization uses restricted feature to mean a capability unavailable while a recorded issue is reviewed."
        ],
        "pendingExample": "Pending: the document owner needs to confirm this term and its source.",
        "mode": "fact",
        "condition": "Optional: term is needed, and one exact editable glossary row is selected. The row must be pinned before any mapping.",
        "expected": "Explain its local meaning without redefining standards or legal terms.",
        "destinations": [
          "AI-Risk-and-Impact-Management-Procedure.docx :: T35R2C2 on the exact selected draft glossary row only"
        ],
        "key": "T35R2C2",
        "hint": "Explain its local meaning without redefining standards or legal terms.",
        "partial": "Pending: the document owner needs to confirm this term and its source.",
        "groupId": "doc-risk-method-glossary",
        "groupTitle": "Appendix C Organization-specific terms",
        "groupAudience": "Assigned document/process owner and competent specialists for their own scoped work",
        "audience": "Assigned document/process owner and competent specialists for their own scoped work",
        "profileId": "doc-risk-method-glossary"
      },
      {
        "id": "doc-risk-method-t35r2c3",
        "field": "T35R2C3",
        "label": "Authority or source",
        "locator": "T35R2C3",
        "question": "Where is that local meaning defined?",
        "help": "Name the existing source or responsible terminology owner; a missing source stays Pending.",
        "examples": [
          "The organization defines intake review in its lifecycle procedure.",
          "The organization defines restricted feature in its operating change procedure."
        ],
        "pendingExample": "Pending: the document owner needs to confirm this term and its source.",
        "mode": "fact",
        "condition": "Optional: term is needed, and one exact editable glossary row is selected. The row must be pinned before any mapping.",
        "expected": "Name the existing source or responsible terminology owner; a missing source stays Pending.",
        "destinations": [
          "AI-Risk-and-Impact-Management-Procedure.docx :: T35R2C3 on the exact selected draft glossary row only"
        ],
        "key": "T35R2C3",
        "hint": "Name the existing source or responsible terminology owner; a missing source stays Pending.",
        "partial": "Pending: the document owner needs to confirm this term and its source.",
        "groupId": "doc-risk-method-glossary",
        "groupTitle": "Appendix C Organization-specific terms",
        "groupAudience": "Assigned document/process owner and competent specialists for their own scoped work",
        "audience": "Assigned document/process owner and competent specialists for their own scoped work",
        "profileId": "doc-risk-method-glossary"
      }
    ]
  },
  {
    "id": "doc-lifecycle-interfaces",
    "groupId": "doc-lifecycle-interfaces",
    "templateId": "ai-system-lifecycle-procedure",
    "artifact": "AI-System-Lifecycle-Management-Procedure.docx",
    "sourceSha256": "e514a2e628e657abe643338086cf2b6ecdd0f3812adecadf33aa269336221e7d",
    "unit": "values",
    "title": "7 Route specific additions",
    "audience": "Assigned document/process owner and competent specialists for their own scoped work",
    "context": [
      "Select the exact document Record ID and Draft/Under review version; show its current wording and appropriate approved references.",
      "Share only the permitted context. Organizational arrangements are distinct from a performed assessment, current Register row or issued Decision.",
      "The source section identifies what is needed; an ordinary contribution may leave authority, method approval or other specialist portions unresolved."
    ],
    "keys": [
      "T18R2C1"
    ],
    "fields": {
      "T18R2C1": "T18R2C1"
    },
    "catalog": [
      {
        "id": "doc-lifecycle-t18r2c1",
        "field": "T18R2C1",
        "label": "Route and specialist process interfaces",
        "locator": "T18R2C1",
        "question": "Which existing processes should each type of AI work use?",
        "help": "Name approved development and acquisition, data, supplier, security and privacy, safety and quality, incident, continuity, communication and records interfaces that apply. Keep missing parts Pending and distinguish current arrangements from proposed ones.",
        "examples": [
          "The organization’s development work uses its engineering change and quality processes; acquisition uses Procurement’s supplier and contract checks. Relevant data, privacy, security and safety work goes to the competent owning functions. Operations supplies incident and continuity processes, the policy owner supplies approved communications, and Records supplies preservation and retrieval rules. The controlled process directory names each exact current document and its location. Unsupported or missing route interfaces remain Pending instead of being treated as not applicable.",
          "The organization’s forecasting route uses Engineering’s design/release process and Quality’s verification process. Procurement supplies checks for purchased components; competent data, security, privacy and safety owners supply their applicable processes. Operations supplies incident and continuity arrangements, the procedure owner controls communication, and Records controls preservation. The Process Library lists each current document and exact location; restricted evidence remains in the Evidence Vault. Missing interfaces are recorded Pending rather than assumed irrelevant."
        ],
        "pendingExample": "Pending: the responsible owner needs to confirm route and specialist process interfaces.",
        "mode": "fact",
        "condition": "Only one exact Draft/Under review document. This is a contribution for operator preparation, not automatic completion/import; source-required authority and approved-method portions remain held.",
        "expected": "Name approved development and acquisition, data, supplier, security and privacy, safety and quality, incident, continuity, communication and records interfaces that apply.",
        "destinations": [
          "AI-System-Lifecycle-Management-Procedure.docx :: T18R2C1 in the selected editable draft only"
        ],
        "key": "T18R2C1",
        "hint": "Name approved development and acquisition, data, supplier, security and privacy, safety and quality, incident, continuity, communication and records interfaces that apply. Keep missing parts Pending and distinguish current arrangements from proposed ones.",
        "partial": "Pending: the responsible owner needs to confirm route and specialist process interfaces.",
        "groupId": "doc-lifecycle-interfaces",
        "groupTitle": "7 Route specific additions",
        "groupAudience": "Assigned document/process owner and competent specialists for their own scoped work",
        "audience": "Assigned document/process owner and competent specialists for their own scoped work",
        "profileId": "doc-lifecycle-interfaces"
      }
    ]
  },
  {
    "id": "doc-lifecycle-evaluation",
    "groupId": "doc-lifecycle-evaluation",
    "templateId": "ai-system-lifecycle-procedure",
    "artifact": "AI-System-Lifecycle-Management-Procedure.docx",
    "sourceSha256": "e514a2e628e657abe643338086cf2b6ecdd0f3812adecadf33aa269336221e7d",
    "unit": "values",
    "title": "8 Evaluation readiness and meaningful human oversight",
    "audience": "Assigned document/process owner and competent specialists for their own scoped work",
    "context": [
      "Select the exact document Record ID and Draft/Under review version; show its current wording and appropriate approved references.",
      "Share only the permitted context. Organizational arrangements are distinct from a performed assessment, current Register row or issued Decision.",
      "The source section identifies what is needed; an ordinary contribution may leave authority, method approval or other specialist portions unresolved."
    ],
    "keys": [
      "T20R2C1"
    ],
    "fields": {
      "T20R2C1": "T20R2C1"
    },
    "catalog": [
      {
        "id": "doc-lifecycle-t20r2c1",
        "field": "T20R2C1",
        "label": "Evaluation and readiness configuration",
        "locator": "T20R2C1",
        "question": "How should an AI system be tested before a readiness decision is considered?",
        "help": "Propose methods and environments, evidence for competent review, independence, realistic oversight tests, retest events and record locations. Readiness thresholds and authority require confirmation. Keep missing parts Pending and distinguish current arrangements from proposed ones.",
        "examples": [
          "The organization proposes testing representative tasks and foreseeable failures in a separate environment matching the exact proposed baseline. Tests would include data access, integrations and whether reviewers have the information, time and ability to stop problematic outputs. Competent reviewers would inspect retained test methods, samples and limitations, with independent review where existing rules require it. Changes to models, data, permissions or oversight would trigger targeted retesting. Reports would be retained in the restricted test repository. Readiness thresholds, reviewer authority and approval of this configuration remain Pending.",
          "The organization proposes testing Forecast Service 1.6 in a separate environment representing the proposed site and input pipeline. Tests would cover ordinary and unusual conditions, interfaces, failure behavior and whether supervisors can understand, override or stop use within the real workload. Competent reviewers would examine exact-version reports and limits, with independent review where confirmed rules require it. Model, site, data or oversight changes would trigger targeted retests. Test records would remain in the Evidence Vault. Thresholds, reviewer authority and configuration approval are Pending."
        ],
        "pendingExample": "Pending: the responsible owner needs to confirm evaluation and readiness configuration.",
        "mode": "draft",
        "condition": "Only one exact Draft/Under review document. This is a contribution for operator preparation, not automatic completion/import; source-required authority and approved-method portions remain held.",
        "expected": "Propose methods and environments, evidence for competent review, independence, realistic oversight tests, retest events and record locations. Readiness thresholds and authority require confirmation.",
        "destinations": [
          "AI-System-Lifecycle-Management-Procedure.docx :: T20R2C1 in the selected editable draft only"
        ],
        "key": "T20R2C1",
        "hint": "Propose methods and environments, evidence for competent review, independence, realistic oversight tests, retest events and record locations. Readiness thresholds and authority require confirmation. Keep missing parts Pending and distinguish current arrangements from proposed ones.",
        "partial": "Pending: the responsible owner needs to confirm evaluation and readiness configuration.",
        "groupId": "doc-lifecycle-evaluation",
        "groupTitle": "8 Evaluation readiness and meaningful human oversight",
        "groupAudience": "Assigned document/process owner and competent specialists for their own scoped work",
        "audience": "Assigned document/process owner and competent specialists for their own scoped work",
        "profileId": "doc-lifecycle-evaluation"
      }
    ]
  },
  {
    "id": "doc-lifecycle-operation",
    "groupId": "doc-lifecycle-operation",
    "templateId": "ai-system-lifecycle-procedure",
    "artifact": "AI-System-Lifecycle-Management-Procedure.docx",
    "sourceSha256": "e514a2e628e657abe643338086cf2b6ecdd0f3812adecadf33aa269336221e7d",
    "unit": "values",
    "title": "10 Operation monitoring incidents and change",
    "audience": "Assigned document/process owner and competent specialists for their own scoped work",
    "context": [
      "Select the exact document Record ID and Draft/Under review version; show its current wording and appropriate approved references.",
      "Share only the permitted context. Organizational arrangements are distinct from a performed assessment, current Register row or issued Decision.",
      "The source section identifies what is needed; an ordinary contribution may leave authority, method approval or other specialist portions unresolved."
    ],
    "keys": [
      "T24R2C1"
    ],
    "fields": {
      "T24R2C1": "T24R2C1"
    },
    "catalog": [
      {
        "id": "doc-lifecycle-t24r2c1",
        "field": "T24R2C1",
        "label": "Monitoring change emergency and incident configuration",
        "locator": "T24R2C1",
        "question": "How should operating changes and urgent AI problems be handled?",
        "help": "Describe proposed monitoring, types of change and the already allowed routine-change types and limits, external-change response, communication, safe-stop route and evidence. Classification and authority and thresholds need confirmed rules. Keep missing parts Pending and distinguish current arrangements from proposed ones.",
        "examples": [
          "The organization proposes recording operating errors, complaints, supplier notices and configuration changes in its change and incident systems. Each change would be evaluated as routine, material, emergency or unintended/provider-managed using confirmed rules. Routine changes would stay within the approved types and limits for routine changes; material changes would receive targeted assessment before use. Urgent problems would follow the existing restriction and incident route, with affected teams informed and evidence retained. Thresholds, the permitted routine-change types and limits and emergency authority remain Pending confirmation.",
          "The organization proposes monitoring forecast errors, operating incidents and release changes in its Planning Monitoring Report and Change Register. Engineering would record intended updates and external component notices, then apply confirmed routine/material/emergency/unintended classifications. Changes within the confirmed types and limits for routine changes would receive the bounded required checks; significant changes would receive targeted reassessment. Urgent problems would follow the existing restriction and duty-supervisor route, with communications and evidence retained. The routine-change types and limits, thresholds and emergency authority remain Pending."
        ],
        "pendingExample": "Pending: the responsible owner needs to confirm monitoring change emergency and incident configuration.",
        "mode": "draft",
        "condition": "Only one exact Draft/Under review document. This is a contribution for operator preparation, not automatic completion/import; source-required authority and approved-method portions remain held.",
        "expected": "Describe proposed monitoring, types of change and the already allowed routine-change types and limits, external-change response, communication, safe-stop route and evidence. Classification and authority and thresholds need confirmed rules.",
        "destinations": [
          "AI-System-Lifecycle-Management-Procedure.docx :: T24R2C1 in the selected editable draft only"
        ],
        "key": "T24R2C1",
        "hint": "Describe proposed monitoring, types of change and the already allowed routine-change types and limits, external-change response, communication, safe-stop route and evidence. Classification and authority and thresholds need confirmed rules. Keep missing parts Pending and distinguish current arrangements from proposed ones.",
        "partial": "Pending: the responsible owner needs to confirm monitoring change emergency and incident configuration.",
        "groupId": "doc-lifecycle-operation",
        "groupTitle": "10 Operation monitoring incidents and change",
        "groupAudience": "Assigned document/process owner and competent specialists for their own scoped work",
        "audience": "Assigned document/process owner and competent specialists for their own scoped work",
        "profileId": "doc-lifecycle-operation"
      }
    ]
  },
  {
    "id": "doc-lifecycle-retirement",
    "groupId": "doc-lifecycle-retirement",
    "templateId": "ai-system-lifecycle-procedure",
    "artifact": "AI-System-Lifecycle-Management-Procedure.docx",
    "sourceSha256": "e514a2e628e657abe643338086cf2b6ecdd0f3812adecadf33aa269336221e7d",
    "unit": "values",
    "title": "11 Transfer retirement and decommissioning",
    "audience": "Assigned document/process owner and competent specialists for their own scoped work",
    "context": [
      "Select the exact document Record ID and Draft/Under review version; show its current wording and appropriate approved references.",
      "Share only the permitted context. Organizational arrangements are distinct from a performed assessment, current Register row or issued Decision.",
      "The source section identifies what is needed; an ordinary contribution may leave authority, method approval or other specialist portions unresolved."
    ],
    "keys": [
      "T25R2C1"
    ],
    "fields": {
      "T25R2C1": "T25R2C1"
    },
    "catalog": [
      {
        "id": "doc-lifecycle-t25r2c1",
        "field": "T25R2C1",
        "label": "Transfer retirement and disposition rule",
        "locator": "T25R2C1",
        "question": "What should happen when an AI system is transferred or taken out of use?",
        "help": "Propose continuity, communication, supplier exit where relevant, access and integration removal, data and component handling, residual duties and completion evidence. Existing holds and retention govern records; no deletion is authorized. Keep missing parts Pending and distinguish current arrangements from proposed ones.",
        "examples": [
          "The organization proposes a transfer or retirement plan identifying the exact system and baseline, receiving team or replacement, continuity needs and people to notify. The plan would address supplier exit where applicable, user credentials, integrations, scheduled jobs, data and components. Records staff would apply existing retention and legal-hold rules; no deletion follows from the plan. Open complaints, incidents and other residual duties would retain responsible owners. Evidence of stopped/transferred use and final inventory checks would be retained. The required lifecycle decision and disposition authority remain Pending.",
          "The organization proposes a retirement plan naming the forecast system, its baseline, replacement planning method and continuity needs. Engineering would remove scheduled jobs and integrations; Operations would confirm that use stopped and notify users. Relevant suppliers and access credentials would be handled through existing procedures. Records staff would apply legal holds and retention, while open incidents and residual duties retain their owners. Completion evidence and final inventory checks would remain retrievable. Retirement and disposition decisions are Pending; this plan authorizes no deletion."
        ],
        "pendingExample": "Pending: the responsible owner needs to confirm transfer retirement and disposition rule.",
        "mode": "draft",
        "condition": "Only one exact Draft/Under review document. This is a contribution for operator preparation, not automatic completion/import; source-required authority and approved-method portions remain held.",
        "expected": "Propose continuity, communication, supplier exit where relevant, access and integration removal, data and component handling, residual duties and completion evidence. Existing holds and retention govern records; no deletion is authorized.",
        "destinations": [
          "AI-System-Lifecycle-Management-Procedure.docx :: T25R2C1 in the selected editable draft only"
        ],
        "key": "T25R2C1",
        "hint": "Propose continuity, communication, supplier exit where relevant, access and integration removal, data and component handling, residual duties and completion evidence. Existing holds and retention govern records; no deletion is authorized. Keep missing parts Pending and distinguish current arrangements from proposed ones.",
        "partial": "Pending: the responsible owner needs to confirm transfer retirement and disposition rule.",
        "groupId": "doc-lifecycle-retirement",
        "groupTitle": "11 Transfer retirement and decommissioning",
        "groupAudience": "Assigned document/process owner and competent specialists for their own scoped work",
        "audience": "Assigned document/process owner and competent specialists for their own scoped work",
        "profileId": "doc-lifecycle-retirement"
      }
    ]
  },
  {
    "id": "doc-lifecycle-glossary",
    "groupId": "doc-lifecycle-glossary",
    "templateId": "ai-system-lifecycle-procedure",
    "artifact": "AI-System-Lifecycle-Management-Procedure.docx",
    "sourceSha256": "e514a2e628e657abe643338086cf2b6ecdd0f3812adecadf33aa269336221e7d",
    "unit": "glossary_rows",
    "title": "Appendix C Organization specific terms",
    "audience": "Assigned document/process owner and competent specialists for their own scoped work",
    "context": [
      "Select the exact document Record ID and Draft/Under review version; show its current wording and appropriate approved references.",
      "Share only the permitted context. Organizational arrangements are distinct from a performed assessment, current Register row or issued Decision.",
      "The source section identifies what is needed; an ordinary contribution may leave authority, method approval or other specialist portions unresolved."
    ],
    "keys": [
      "T29R2C1",
      "T29R2C2",
      "T29R2C3"
    ],
    "fields": {
      "T29R2C1": "term",
      "T29R2C2": "meaning",
      "T29R2C3": "source"
    },
    "catalog": [
      {
        "id": "doc-lifecycle-t29r2c1",
        "field": "T29R2C1",
        "label": "Term or abbreviation",
        "locator": "T29R2C1",
        "question": "Which local term needs explaining?",
        "help": "Give only an organization-specific term needed in this document. These literal term examples belong in the term box; the organization-specific explanation belongs in the separate meaning question.",
        "examples": [
          "Intake review",
          "Restricted feature"
        ],
        "pendingExample": "Pending: the document owner needs to confirm this term and its source.",
        "mode": "fact",
        "condition": "Optional: term is needed, and one exact editable glossary row is selected. The row must be pinned before any mapping.",
        "expected": "Give only an organization-specific term needed in this document.",
        "destinations": [
          "AI-System-Lifecycle-Management-Procedure.docx :: T29R2C1 on the exact selected draft glossary row only"
        ],
        "key": "T29R2C1",
        "hint": "Give only an organization-specific term needed in this document. These literal term examples belong in the term box; the organization-specific explanation belongs in the separate meaning question.",
        "partial": "Pending: the document owner needs to confirm this term and its source.",
        "groupId": "doc-lifecycle-glossary",
        "groupTitle": "Appendix C Organization specific terms",
        "groupAudience": "Assigned document/process owner and competent specialists for their own scoped work",
        "audience": "Assigned document/process owner and competent specialists for their own scoped work",
        "profileId": "doc-lifecycle-glossary"
      },
      {
        "id": "doc-lifecycle-t29r2c2",
        "field": "T29R2C2",
        "label": "Organization-specific meaning",
        "locator": "T29R2C2",
        "question": "What does that local term mean?",
        "help": "Explain its local meaning without redefining standards or legal terms.",
        "examples": [
          "The organization uses intake review to mean the first recorded check of a proposed AI activity.",
          "The organization uses restricted feature to mean a capability unavailable while a recorded issue is reviewed."
        ],
        "pendingExample": "Pending: the document owner needs to confirm this term and its source.",
        "mode": "fact",
        "condition": "Optional: term is needed, and one exact editable glossary row is selected. The row must be pinned before any mapping.",
        "expected": "Explain its local meaning without redefining standards or legal terms.",
        "destinations": [
          "AI-System-Lifecycle-Management-Procedure.docx :: T29R2C2 on the exact selected draft glossary row only"
        ],
        "key": "T29R2C2",
        "hint": "Explain its local meaning without redefining standards or legal terms.",
        "partial": "Pending: the document owner needs to confirm this term and its source.",
        "groupId": "doc-lifecycle-glossary",
        "groupTitle": "Appendix C Organization specific terms",
        "groupAudience": "Assigned document/process owner and competent specialists for their own scoped work",
        "audience": "Assigned document/process owner and competent specialists for their own scoped work",
        "profileId": "doc-lifecycle-glossary"
      },
      {
        "id": "doc-lifecycle-t29r2c3",
        "field": "T29R2C3",
        "label": "Authority or source",
        "locator": "T29R2C3",
        "question": "Where is that local meaning defined?",
        "help": "Name the existing source or responsible terminology owner; a missing source stays Pending.",
        "examples": [
          "The organization defines intake review in its lifecycle procedure.",
          "The organization defines restricted feature in its operating change procedure."
        ],
        "pendingExample": "Pending: the document owner needs to confirm this term and its source.",
        "mode": "fact",
        "condition": "Optional: term is needed, and one exact editable glossary row is selected. The row must be pinned before any mapping.",
        "expected": "Name the existing source or responsible terminology owner; a missing source stays Pending.",
        "destinations": [
          "AI-System-Lifecycle-Management-Procedure.docx :: T29R2C3 on the exact selected draft glossary row only"
        ],
        "key": "T29R2C3",
        "hint": "Name the existing source or responsible terminology owner; a missing source stays Pending.",
        "partial": "Pending: the document owner needs to confirm this term and its source.",
        "groupId": "doc-lifecycle-glossary",
        "groupTitle": "Appendix C Organization specific terms",
        "groupAudience": "Assigned document/process owner and competent specialists for their own scoped work",
        "audience": "Assigned document/process owner and competent specialists for their own scoped work",
        "profileId": "doc-lifecycle-glossary"
      }
    ]
  },
  {
    "id": "doc-assurance-method-cycle",
    "groupId": "doc-assurance-method-cycle",
    "templateId": "aims-assurance-improvement-procedure",
    "artifact": "AIMS-Assurance-and-Improvement-Procedure.docx",
    "sourceSha256": "4736c05fb591124594a44586242a6f884b891b493a9a35448aa12063b115f051",
    "unit": "values",
    "title": "4 Integrated assurance and improvement cycle",
    "audience": "Assigned document/process owner and competent specialists for their own scoped work",
    "context": [
      "Select the exact document Record ID and Draft/Under review version; show its current wording and appropriate approved references.",
      "Share only the permitted context. Organizational arrangements are distinct from a performed assessment, current Register row or issued Decision.",
      "The source section identifies what is needed; an ordinary contribution may leave authority, method approval or other specialist portions unresolved."
    ],
    "keys": [
      "T10R2C1"
    ],
    "fields": {
      "T10R2C1": "T10R2C1"
    },
    "catalog": [
      {
        "id": "doc-assurance-method-t10r2c1",
        "field": "T10R2C1",
        "label": "Evidence and evaluation configuration",
        "locator": "T10R2C1",
        "question": "How should reviewers check information for the question they are examining?",
        "help": "Propose source validation, scope and time and reliability checks, sampling, contradictions, access and retention, limits and escalation. Competent reviewers retain sufficiency and conclusion decisions. Keep missing parts Pending and distinguish current arrangements from proposed ones.",
        "examples": [
          "The organization proposes checking each selected artifact’s exact identity, version, provenance, scope and operating period against the claim. Reviewers would record access, sample selection and size, independence, contradictory information and quality limits, and retain source records separately. Missing or conflicting evidence would narrow the analysis and follow the existing escalation route. A competent reviewer would evaluate sufficiency and choose a supported conclusion label; this proposed configuration does not make that decision. Approved limitation rules and method approval remain Pending.",
          "The organization proposes checking engineering and operating artifacts against each exact claim, including version, provenance, site, period and scope. Reviewers would explain sample selection, independence and reliability, retain contradictory results and record missing or restricted access. Source records would remain separately preserved in the Evidence Vault. A competent reviewer would determine sufficiency and supported conclusion wording within the approved method; limited evidence would use the existing escalation route. Permitted limitations and method approval remain Pending."
        ],
        "pendingExample": "Pending: the responsible owner needs to confirm evidence and evaluation configuration.",
        "mode": "draft",
        "condition": "Only one exact Draft/Under review document. This is a contribution for operator preparation, not automatic completion/import; source-required authority and approved-method portions remain held.",
        "expected": "Propose source validation, scope and time and reliability checks, sampling, contradictions, access and retention, limits and escalation. Competent reviewers retain sufficiency and conclusion decisions.",
        "destinations": [
          "AIMS-Assurance-and-Improvement-Procedure.docx :: T10R2C1 in the selected editable draft only"
        ],
        "key": "T10R2C1",
        "hint": "Propose source validation, scope and time and reliability checks, sampling, contradictions, access and retention, limits and escalation. Competent reviewers retain sufficiency and conclusion decisions. Keep missing parts Pending and distinguish current arrangements from proposed ones.",
        "partial": "Pending: the responsible owner needs to confirm evidence and evaluation configuration.",
        "groupId": "doc-assurance-method-cycle",
        "groupTitle": "4 Integrated assurance and improvement cycle",
        "groupAudience": "Assigned document/process owner and competent specialists for their own scoped work",
        "audience": "Assigned document/process owner and competent specialists for their own scoped work",
        "profileId": "doc-assurance-method-cycle"
      }
    ]
  },
  {
    "id": "doc-assurance-method-audit",
    "groupId": "doc-assurance-method-audit",
    "templateId": "aims-assurance-improvement-procedure",
    "artifact": "AIMS-Assurance-and-Improvement-Procedure.docx",
    "sourceSha256": "4736c05fb591124594a44586242a6f884b891b493a9a35448aa12063b115f051",
    "unit": "values",
    "title": "6 Internal audit",
    "audience": "Assigned document/process owner and competent specialists for their own scoped work",
    "context": [
      "Select the exact document Record ID and Draft/Under review version; show its current wording and appropriate approved references.",
      "Share only the permitted context. Organizational arrangements are distinct from a performed assessment, current Register row or issued Decision.",
      "The source section identifies what is needed; an ordinary contribution may leave authority, method approval or other specialist portions unresolved."
    ],
    "keys": [
      "T16R2C1"
    ],
    "fields": {
      "T16R2C1": "T16R2C1"
    },
    "catalog": [
      {
        "id": "doc-assurance-method-t16r2c1",
        "field": "T16R2C1",
        "label": "Internal audit configuration",
        "locator": "T16R2C1",
        "question": "How should the organization plan internal audit work?",
        "help": "Propose programme coverage and interval justified by risk, criteria sources, methods, sampling reasons, competence, independence and conflicts, reporting and records; no universal frequency or granted authority. Keep missing parts Pending and distinguish current arrangements from proposed ones.",
        "examples": [
          "The organization proposes a risk-based audit programme covering governance processes and relevant AI systems over a justified cycle, with earlier audit after significant changes or recurring issues. Each activity would name its approved criteria, method, scope, sample rationale and limitations. Competent auditors would be assigned through the existing programme route, with prior involvement and conflicts checked and independent work reassigned where required. Findings would follow the confirmed classification and correction process. Programme plans, working papers and reports would be retained in restricted audit records. Interval, assignments and programme approval remain Pending.",
          "The organization proposes an audit programme covering engineering, operating governance and the relevant system sites according to risk and significant change. Activity plans would identify criteria, methods, sample reasons, limits and reporting. Competent auditors would be assigned through the programme route, with conflicts recorded and work independently reassigned where required. Findings and corrections would retain the existing classification and response processes. Programme, working papers and reports would stay in restricted audit records. Frequency, assignments and programme approval require confirmation rather than a universal rule."
        ],
        "pendingExample": "Pending: the responsible owner needs to confirm internal audit configuration.",
        "mode": "draft",
        "condition": "Only one exact Draft/Under review document. This is a contribution for operator preparation, not automatic completion/import; source-required authority and approved-method portions remain held.",
        "expected": "Propose programme coverage and interval justified by risk, criteria sources, methods, sampling reasons, competence, independence and conflicts, reporting and records; no universal frequency or granted authority.",
        "destinations": [
          "AIMS-Assurance-and-Improvement-Procedure.docx :: T16R2C1 in the selected editable draft only"
        ],
        "key": "T16R2C1",
        "hint": "Propose programme coverage and interval justified by risk, criteria sources, methods, sampling reasons, competence, independence and conflicts, reporting and records; no universal frequency or granted authority. Keep missing parts Pending and distinguish current arrangements from proposed ones.",
        "partial": "Pending: the responsible owner needs to confirm internal audit configuration.",
        "groupId": "doc-assurance-method-audit",
        "groupTitle": "6 Internal audit",
        "groupAudience": "Assigned document/process owner and competent specialists for their own scoped work",
        "audience": "Assigned document/process owner and competent specialists for their own scoped work",
        "profileId": "doc-assurance-method-audit"
      }
    ]
  },
  {
    "id": "doc-assurance-method-review",
    "groupId": "doc-assurance-method-review",
    "templateId": "aims-assurance-improvement-procedure",
    "artifact": "AIMS-Assurance-and-Improvement-Procedure.docx",
    "sourceSha256": "4736c05fb591124594a44586242a6f884b891b493a9a35448aa12063b115f051",
    "unit": "values",
    "title": "7 Management review",
    "audience": "Assigned document/process owner and competent specialists for their own scoped work",
    "context": [
      "Select the exact document Record ID and Draft/Under review version; show its current wording and appropriate approved references.",
      "Share only the permitted context. Organizational arrangements are distinct from a performed assessment, current Register row or issued Decision.",
      "The source section identifies what is needed; an ordinary contribution may leave authority, method approval or other specialist portions unresolved."
    ],
    "keys": [
      "T19R2C1"
    ],
    "fields": {
      "T19R2C1": "T19R2C1"
    },
    "catalog": [
      {
        "id": "doc-assurance-method-t19r2c1",
        "field": "T19R2C1",
        "label": "Management review configuration",
        "locator": "T19R2C1",
        "question": "How should management review be prepared and followed up?",
        "help": "Propose interval and events, preparer and input owners, pack and minutes, participation and access, existing decision route, follow-up and records. Management and resource authority is confirmed separately. Keep missing parts Pending and distinguish current arrangements from proposed ones.",
        "examples": [
          "The organization proposes twice-yearly management review, with earlier review after major incidents, scope changes or significant assurance results. The AIMS lead would prepare the pack, with named owners supplying each required input and any missing input remaining visible. Current authorized top-management participants would receive accessible materials; minutes would record attendance, evidence limits, decisions and follow-up. Actions and resource requests would use their existing decision routes, and the pack/minutes would be retained in the review repository. Participation assignments, resource authority and approval of this configuration remain Pending.",
          "The organization proposes quarterly management review during its expansion, plus review after major incidents or significant assurance findings. The AIMS coordinator would request each required input from its named owner, retain missing inputs, and prepare an accessible pack. Current authorized management participants would review it; minutes would record participation, limitations, decisions and follow-up. Resource decisions and Actions would follow existing routes. Packs and minutes would stay in the Management Review Repository. Assigned participants, resource authority and configuration approval remain Pending."
        ],
        "pendingExample": "Pending: the responsible owner needs to confirm management review configuration.",
        "mode": "draft",
        "condition": "Only one exact Draft/Under review document. This is a contribution for operator preparation, not automatic completion/import; source-required authority and approved-method portions remain held.",
        "expected": "Propose interval and events, preparer and input owners, pack and minutes, participation and access, existing decision route, follow-up and records. Management and resource authority is confirmed separately.",
        "destinations": [
          "AIMS-Assurance-and-Improvement-Procedure.docx :: T19R2C1 in the selected editable draft only"
        ],
        "key": "T19R2C1",
        "hint": "Propose interval and events, preparer and input owners, pack and minutes, participation and access, existing decision route, follow-up and records. Management and resource authority is confirmed separately. Keep missing parts Pending and distinguish current arrangements from proposed ones.",
        "partial": "Pending: the responsible owner needs to confirm management review configuration.",
        "groupId": "doc-assurance-method-review",
        "groupTitle": "7 Management review",
        "groupAudience": "Assigned document/process owner and competent specialists for their own scoped work",
        "audience": "Assigned document/process owner and competent specialists for their own scoped work",
        "profileId": "doc-assurance-method-review"
      }
    ]
  },
  {
    "id": "doc-assurance-method-correction",
    "groupId": "doc-assurance-method-correction",
    "templateId": "aims-assurance-improvement-procedure",
    "artifact": "AIMS-Assurance-and-Improvement-Procedure.docx",
    "sourceSha256": "4736c05fb591124594a44586242a6f884b891b493a9a35448aa12063b115f051",
    "unit": "values",
    "title": "8 Nonconformity correction and corrective action",
    "audience": "Assigned document/process owner and competent specialists for their own scoped work",
    "context": [
      "Select the exact document Record ID and Draft/Under review version; show its current wording and appropriate approved references.",
      "Share only the permitted context. Organizational arrangements are distinct from a performed assessment, current Register row or issued Decision.",
      "The source section identifies what is needed; an ordinary contribution may leave authority, method approval or other specialist portions unresolved."
    ],
    "keys": [
      "T23R2C1"
    ],
    "fields": {
      "T23R2C1": "T23R2C1"
    },
    "catalog": [
      {
        "id": "doc-assurance-method-t23r2c1",
        "field": "T23R2C1",
        "label": "Nonconformity and corrective action configuration",
        "locator": "T23R2C1",
        "question": "How should problems be corrected and checked to see whether the fix worked?",
        "help": "Propose urgent correction, cause and recurrence analysis, proportional work, competent effectiveness review, evidence period, external-finding handling and escalation. Confirmation and closure authority stays separate. Keep missing parts Pending and distinguish current arrangements from proposed ones.",
        "examples": [
          "The organization proposes immediate correction and consequence handling through its existing incident/work route, followed by competent confirmation of the issue and documented cause analysis. Similar processes would be checked for recurrence and proportional corrective work assigned. A competent reviewer, independent of the fix where required, would examine operating evidence after an agreed period and retain failed or limited results. External finding statements would remain unchanged while the organization records its response. Confirmation, escalation and closure authority, the evidence period and method approval remain Pending.",
          "The organization proposes urgent correction through its incident process, followed by competent issue confirmation and cause analysis covering similar sites and activities. Proportional corrective work would be assigned through existing Action records. A competent reviewer independent where required would examine operating evidence after an agreed period and retain failures or limitations. The organization would record its response to external findings without rewriting them. Escalation and resolution would use confirmed authority. The evidence period, closure authority and method approval remain Pending."
        ],
        "pendingExample": "Pending: the responsible owner needs to confirm nonconformity and corrective action configuration.",
        "mode": "draft",
        "condition": "Only one exact Draft/Under review document. This is a contribution for operator preparation, not automatic completion/import; source-required authority and approved-method portions remain held.",
        "expected": "Propose urgent correction, cause and recurrence analysis, proportional work, competent effectiveness review, evidence period, external-finding handling and escalation. Confirmation and closure authority stays separate.",
        "destinations": [
          "AIMS-Assurance-and-Improvement-Procedure.docx :: T23R2C1 in the selected editable draft only"
        ],
        "key": "T23R2C1",
        "hint": "Propose urgent correction, cause and recurrence analysis, proportional work, competent effectiveness review, evidence period, external-finding handling and escalation. Confirmation and closure authority stays separate. Keep missing parts Pending and distinguish current arrangements from proposed ones.",
        "partial": "Pending: the responsible owner needs to confirm nonconformity and corrective action configuration.",
        "groupId": "doc-assurance-method-correction",
        "groupTitle": "8 Nonconformity correction and corrective action",
        "groupAudience": "Assigned document/process owner and competent specialists for their own scoped work",
        "audience": "Assigned document/process owner and competent specialists for their own scoped work",
        "profileId": "doc-assurance-method-correction"
      }
    ]
  },
  {
    "id": "doc-assurance-method-terms",
    "groupId": "doc-assurance-method-terms",
    "templateId": "aims-assurance-improvement-procedure",
    "artifact": "AIMS-Assurance-and-Improvement-Procedure.docx",
    "sourceSha256": "4736c05fb591124594a44586242a6f884b891b493a9a35448aa12063b115f051",
    "unit": "glossary_rows",
    "title": "Appendix C Organization specific terms",
    "audience": "Assigned document/process owner and competent specialists for their own scoped work",
    "context": [
      "Select the exact document Record ID and Draft/Under review version; show its current wording and appropriate approved references.",
      "Share only the permitted context. Organizational arrangements are distinct from a performed assessment, current Register row or issued Decision.",
      "The source section identifies what is needed; an ordinary contribution may leave authority, method approval or other specialist portions unresolved."
    ],
    "keys": [
      "T31R2C1",
      "T31R2C2",
      "T31R2C3"
    ],
    "fields": {
      "T31R2C1": "term",
      "T31R2C2": "meaning",
      "T31R2C3": "source"
    },
    "catalog": [
      {
        "id": "doc-assurance-method-t31r2c1",
        "field": "T31R2C1",
        "label": "Term",
        "locator": "T31R2C1",
        "question": "Which local term needs explaining?",
        "help": "Give only an organization-specific term needed in this document. These literal term examples belong in the term box; the organization-specific explanation belongs in the separate meaning question.",
        "examples": [
          "Intake review",
          "Restricted feature"
        ],
        "pendingExample": "Pending: the document owner needs to confirm this term and its source.",
        "mode": "fact",
        "condition": "Optional: term is needed, and one exact editable glossary row is selected. The row must be pinned before any mapping.",
        "expected": "Give only an organization-specific term needed in this document.",
        "destinations": [
          "AIMS-Assurance-and-Improvement-Procedure.docx :: T31R2C1 on the exact selected draft glossary row only"
        ],
        "key": "T31R2C1",
        "hint": "Give only an organization-specific term needed in this document. These literal term examples belong in the term box; the organization-specific explanation belongs in the separate meaning question.",
        "partial": "Pending: the document owner needs to confirm this term and its source.",
        "groupId": "doc-assurance-method-terms",
        "groupTitle": "Appendix C Organization specific terms",
        "groupAudience": "Assigned document/process owner and competent specialists for their own scoped work",
        "audience": "Assigned document/process owner and competent specialists for their own scoped work",
        "profileId": "doc-assurance-method-terms"
      },
      {
        "id": "doc-assurance-method-t31r2c2",
        "field": "T31R2C2",
        "label": "Organization meaning",
        "locator": "T31R2C2",
        "question": "What does that local term mean?",
        "help": "Explain its local meaning without redefining standards or legal terms.",
        "examples": [
          "The organization uses intake review to mean the first recorded check of a proposed AI activity.",
          "The organization uses restricted feature to mean a capability unavailable while a recorded issue is reviewed."
        ],
        "pendingExample": "Pending: the document owner needs to confirm this term and its source.",
        "mode": "fact",
        "condition": "Optional: term is needed, and one exact editable glossary row is selected. The row must be pinned before any mapping.",
        "expected": "Explain its local meaning without redefining standards or legal terms.",
        "destinations": [
          "AIMS-Assurance-and-Improvement-Procedure.docx :: T31R2C2 on the exact selected draft glossary row only"
        ],
        "key": "T31R2C2",
        "hint": "Explain its local meaning without redefining standards or legal terms.",
        "partial": "Pending: the document owner needs to confirm this term and its source.",
        "groupId": "doc-assurance-method-terms",
        "groupTitle": "Appendix C Organization specific terms",
        "groupAudience": "Assigned document/process owner and competent specialists for their own scoped work",
        "audience": "Assigned document/process owner and competent specialists for their own scoped work",
        "profileId": "doc-assurance-method-terms"
      },
      {
        "id": "doc-assurance-method-t31r2c3",
        "field": "T31R2C3",
        "label": "Owner or source",
        "locator": "T31R2C3",
        "question": "Where is that local meaning defined?",
        "help": "Name the existing source or responsible terminology owner; a missing source stays Pending.",
        "examples": [
          "The organization defines intake review in its lifecycle procedure.",
          "The organization defines restricted feature in its operating change procedure."
        ],
        "pendingExample": "Pending: the document owner needs to confirm this term and its source.",
        "mode": "fact",
        "condition": "Optional: term is needed, and one exact editable glossary row is selected. The row must be pinned before any mapping.",
        "expected": "Name the existing source or responsible terminology owner; a missing source stays Pending.",
        "destinations": [
          "AIMS-Assurance-and-Improvement-Procedure.docx :: T31R2C3 on the exact selected draft glossary row only"
        ],
        "key": "T31R2C3",
        "hint": "Name the existing source or responsible terminology owner; a missing source stays Pending.",
        "partial": "Pending: the document owner needs to confirm this term and its source.",
        "groupId": "doc-assurance-method-terms",
        "groupTitle": "Appendix C Organization specific terms",
        "groupAudience": "Assigned document/process owner and competent specialists for their own scoped work",
        "audience": "Assigned document/process owner and competent specialists for their own scoped work",
        "profileId": "doc-assurance-method-terms"
      }
    ]
  }
]);
const groups=freeze(profiles.map(p=>({id:p.id,title:p.title,artifact:p.artifact,audience:p.audience,templateId:p.templateId,unit:p.unit,keys:p.keys}))),catalog=freeze(profiles.flatMap(p=>p.catalog));
function profileFor(q){const id=typeof q==='string'?q:q?.profile_id||q?.id;const p=profiles.find(p=>p.id===id);if(!p)fail('Choose a reviewed document topic.');return p;}
function profileForSelection(q,keys){const p=profileFor(q);if(!Array.isArray(keys)||!keys.length||keys.length>3||!equal(keys,p.keys.filter(k=>keys.includes(k))))fail('Choose one canonical topic in its source order.');if(q?.target)checkTarget(q.target,p.id);return p;}
function checkTarget(t,profileId){if(!exact(t,['kind','record_id','document_id','unit','row_id'])||t.kind!=='document'||!['values','glossary_rows'].includes(t.unit))fail('Unsupported document owner destination.');for(const k of ['record_id','document_id'])J.text(t[k],k,{id:true,required:true});if(t.unit==='values'?t.row_id!=='':!/^r[1-9]\d*$/.test(t.row_id)||!Number.isSafeInteger(Number(t.row_id.slice(1))))fail('Choose one already saved stable term row.');if(profileId&&profileFor(profileId).unit!==t.unit)fail('The document topic and saved row destination differ.');return t;}
function entry(w,t,profileId){checkTarget(t,profileId);const e=J.find(w,t.record_id);if(!e||e.document_id!==t.document_id)fail('The exact saved document body is missing. Restore its compatible backup.','owner-subject');J.templateRegistry.get(e.template);if(profileId&&e.template.id!==profileFor(profileId).templateId)fail('The saved document template differs from this topic.','owner-subject');return e;}
function currentRow(w,t,profileId){const e=entry(w,t,profileId),record=(w.references?.records||[]).find(r=>r.values.id===e.record_id&&!r.deleted_at);if(!record)fail('The owning saved Record is missing or deleted. Restore it before using replies.','owner-subject');const row=t.unit==='glossary_rows'?e.glossary_rows.find(r=>r.row_id===t.row_id):null;if(t.unit==='glossary_rows'&&!row)fail('This saved term row was removed. Restore that exact row or prepare a fresh form for a new saved row.','owner-subject');const selected=profileId?[profileFor(profileId)]:profiles.filter(p=>p.templateId===e.template.id&&p.unit===t.unit);return {revision:e.revision,record_revision:record.revision,values:Object.fromEntries(selected.flatMap(p=>p.keys.map(k=>[k,t.unit==='values'?e.values[p.fields[k]]:row[p.fields[k]]]))),entry:e,record,row};}
function subjectContext(w,t,profileId,fieldKeys){const p=profileFor(profileId),r=currentRow(w,t,p.id),e=r.entry,keys=fieldKeys||p.keys;profileForSelection({profile_id:p.id,target:t},keys);return {document_id:e.document_id,template:clone(e.template),body_revision:e.revision,record:{revision:r.record.revision,values:Object.fromEntries(['id','type','title','version','lifecycle','owner','custodian'].map(k=>[k,r.record.values[k]]))},glossary:{row_id:t.row_id,term:r.row?.term||''},captures:clone(e.captures.filter(c=>t.unit==='values'&&keys.includes(c.target))),read_only:clone(e.read_only)};}
function checkContext(c,q,max=Number.MAX_SAFE_INTEGER,{live=false}={}){const p=profileFor(q);checkTarget(q.target,p.id);if(!exact(c,['document_id','template','body_revision','record','glossary','captures','read_only'])||!exact(c.record,['revision','values'])||!exact(c.record.values,['id','type','title','version','lifecycle','owner','custodian'])||!exact(c.glossary,['row_id','term'])||!Array.isArray(c.captures))fail('Unsupported captured document context.');if(J.templateRegistry.get(c.template).template.id!==p.templateId||c.document_id!==q.target.document_id||c.record.values.id!==q.target.record_id||c.glossary.row_id!==q.target.row_id||q.target.unit==='values'&&c.glossary.term!=='')fail('Captured document identities do not match the exact topic and saved target.');for(const n of [c.body_revision,c.record.revision])if(!Number.isSafeInteger(n)||n<1||n>max)fail('Invalid saved document context revision.');for(const [k,v]of Object.entries(c.record.values))J.text(v,'Record '+k);J.text(c.glossary.term,'Term');if(!live&&(c.record.values.type!=='Controlled document'||!J.editable.includes(c.record.values.lifecycle)||c.read_only!==null))fail('Open an editable Controlled document draft to prepare owner questions.');if(c.read_only!==null){if(!exact(c.read_only,['record_revision','lifecycle','observed_at','record_values'])||!Number.isSafeInteger(c.read_only.record_revision)||c.read_only.record_revision<1||c.read_only.record_revision>max||!J.retained.includes(c.read_only.lifecycle)||!J.timestamp(c.read_only.observed_at))fail('Invalid captured sticky document marker.');for(const [k,v]of Object.entries(c.read_only.record_values))J.text(v,'Frozen Record '+k);}
let previous=-1;const order=J.schemaFor(c.template).captureTargets;for(const cap of c.captures){if(q.target.unit!=='values'||!q.field_keys.includes(cap.target)||order.indexOf(cap.target)<=previous)fail('Document captures differ from the selected source targets and native order.');J.checkCapture(cap,max,{template:c.template});previous=order.indexOf(cap.target);}return c;}
function eligibility(w,t,profileId,keys){try{const r=currentRow(w,t,profileId);J.writable(w,r.entry);if(profileId)checkContext(subjectContext(w,t,profileId,keys),{profile_id:profileId,target:t,field_keys:keys||profileFor(profileId).keys},w.revision);return '';}catch(e){return e.message;}}
function canonicalContext(q,o={}){checkContext(q.subject_context,q,Number.MAX_SAFE_INTEGER,o);return clone(q.subject_context);}
const targetTuple=q=>[q.target.kind,q.target.record_id,q.target.document_id,q.target.unit,q.target.row_id];
function meaningPayload(q,{family=false,live=false}={}){const c=canonicalContext(q,{live});return [family?'owner-document-family-v1':'owner-document-meaning-v1',q.workspace_id,targetTuple(q),RECIPE,q.profile_id,c.template,c.document_id,Object.fromEntries(['id','type','version','lifecycle'].map(k=>[k,c.record.values[k]])),c.read_only,family?c.glossary.row_id:c.glossary,family?[]:c.captures];}
function fieldText(v,q,key){const p=profileFor(q);if(!p.keys.includes(key))fail('This field is outside the selected document topic.');return J.text(v,key,{narrative:p.unit==='values'});}
function rawText(v,key='reply'){if(typeof v!=='string'||v.length>12000)fail('The returned '+key+' is not text or exceeds 12,000 characters.');return J.text(v,key,{narrative:true});}
function classify(value){const s=value.trim();if(!s)return 'blank';if(/^(?:[-*•]\s*)?(?:pending|unclear|unknown|not known)(?:\s*[:;\-–—][\s\S]*|[.!])?$/i.test(s))return 'pending';return /(?:^|\r?\n|;\s*|\.\s+|\s+[-–—]\s*)\s*(?:[-*•]\s*)?(?:pending|unclear)\s*[:\-–—]/i.test(s)?'mixed':'answer';}
function project(q,key,value,current=''){try{const p=profileFor(q),normalized=J.normalizeText(value);fieldText(normalized,q,key);const kind=classify(normalized);return {eligible:['answer','mixed'].includes(kind),kind,value:normalized,matching:normalized===current,message:['blank','pending'].includes(kind)?'Add the known information; an empty or wholly Pending section is not saved.':'',status:normalized===current?'Already matches':'Ready to save',narrative:p.unit==='values'};}catch(e){return {eligible:false,kind:'invalid',message:e.message,status:'Needs editing'};}}
function patchPayload(w,q,values){const r=currentRow(w,q.target,q.profile_id),p=profileFor(q),payload=J.payload(r.entry);for(const [key,value]of Object.entries(values)){if(!q.field_keys.includes(key))fail('A document answer cannot change an unselected field.');const typed=project(q,key,value,r.values[key]);if(!typed.eligible)fail(typed.message);if(p.unit==='values'){payload.values[p.fields[key]]=typed.value;if(typed.value!==r.values[key]){payload.captures=payload.captures.filter(c=>c.target!==p.fields[key]);if(Object.hasOwn(payload.capture_bindings,p.fields[key]))payload.capture_bindings[p.fields[key]]='';}}else payload.glossary_rows.find(x=>x.row_id===q.target.row_id)[p.fields[key]]=typed.value;}return payload;}
function checkProof(proof,q,r,max=Number.MAX_SAFE_INTEGER){const p=profileFor(q);if(!exact(proof,['workspace_revision','document_revision','record_revision','record_id','document_id','action','at','changes','capture_changes'])||proof.workspace_revision!==r.workspace_revision||proof.document_revision!==r.target_revision||proof.record_id!==q.target.record_id||proof.document_id!==q.target.document_id||proof.action!=='edit'||proof.at!==r.at||!Number.isSafeInteger(proof.workspace_revision)||proof.workspace_revision>max||proof.document_revision<=q.target_revision||!Number.isSafeInteger(proof.record_revision)||proof.record_revision<q.subject_context.record.revision||proof.record_revision>proof.workspace_revision||!Array.isArray(proof.changes)||!proof.changes.length||!Array.isArray(proof.capture_changes))fail('Invalid immutable native document edit proof.');const seen=new Set();for(const x of proof.changes){if(!exact(x,['path','before','after'])||!Array.isArray(x.path)||x.path.length!==2||seen.has(canonical(x.path))||equal(x.before,x.after))fail('The document proof contains a duplicate, matching or unrelated path.');seen.add(canonical(x.path));if(p.unit==='values'){if(x.path[0]!=='values'||!q.field_keys.includes(x.path[1]))fail('The document proof changed an unselected section.');fieldText(x.before,q,x.path[1]);fieldText(x.after,q,x.path[1]);}else{if(x.path[0]!=='glossary_rows'||x.path[1]!==q.target.row_id||!exact(x.before,['row_id','term','meaning','source'])||!exact(x.after,['row_id','term','meaning','source'])||x.before.row_id!==q.target.row_id||x.after.row_id!==q.target.row_id)fail('The term proof must retain the full exact existing row.');for(const column of ['term','meaning','source']){J.text(x.before[column],column);J.text(x.after[column],column);if(x.before[column]!==x.after[column]&&!q.field_keys.some(k=>p.fields[k]===column))fail('The term proof changed an unselected column.');}}}if(p.unit==='values'){const x=proof.changes.find(x=>x.path[1]===r.field);if(r.before!==r.after&&(!x||x.before!==r.before||x.after!==r.after)||r.before===r.after&&x)fail('The document receipt differs from its exact native section proof.');}else{const x=proof.changes[0],col=p.fields[r.field];if(proof.changes.length!==1||x.before[col]!==r.before||x.after[col]!==r.after)fail('The term receipt differs from its full native row proof.');}return proof;}
function proofUnion(proof,q,receipts,context=q.subject_context){const p=profileFor(q),changed=receipts.filter(r=>r.before!==r.after);if(!changed.length){if(proof!==null)fail('Matching document answers cannot claim a native edit.');return true;}if(!proof)fail('Changed document answers need an exact native proof.');receipts.forEach(r=>checkProof(proof,q,r));if(p.unit==='values'){const order=J.schemaFor(context.template).valueTargets,expected=changed.map(r=>({path:['values',r.field],before:r.before,after:r.after})).sort((a,b)=>order.indexOf(a.path[1])-order.indexOf(b.path[1]));if(!equal(proof.changes,expected))fail('The document proof must equal the selected changed-section union.');const caps=context.captures.filter(c=>changed.some(r=>r.field===c.target)).map(c=>({target:c.target,before:c,after:null}));if(!equal(proof.capture_changes,caps))fail('The document proof must detach only the selected active captures.');}else{const x=proof.changes[0];if(proof.changes.length!==1||proof.capture_changes.length)fail('A term answer cannot change order or captures.');for(const col of ['term','meaning','source']){const receipt=receipts.find(r=>p.fields[r.field]===col);if(receipt?(receipt.before!==x.before[col]||receipt.after!==x.after[col]):x.before[col]!==x.after[col])fail('The full term proof differs from the selected answer union.');}}return true;}
function contextLines(q){const c=q.subject_context,p=profileFor(q),shown=v=>v.trim()?v:'Not recorded';const lines=[['Document',shown(c.record.values.title)],['Record ID',q.target.record_id],['Document ID',q.target.document_id],['Version',shown(c.record.values.version)],['Working status',c.record.values.lifecycle],['Section',p.title],['Owner',shown(c.record.values.owner)],['Custodian',shown(c.record.values.custodian)]];if(q.organization_label?.trim())lines.unshift(['Organization',q.organization_label]);if(p.unit==='glossary_rows')lines.push(['Saved term row',q.target.row_id],['Current term',shown(c.glossary.term)]);for(const cap of c.captures){lines.push(['Retained background for '+p.catalog.find(x=>x.key===cap.target).label,cap.applied_value]);for(const src of cap.sources)lines.push(['Retained source '+src.id,Object.entries(src.values).map(([k,v])=>k+': '+(Array.isArray(v)?v.join(', '):v)).join('\n')]);}lines.push(['','Context comes from this saved document and its retained captures. Source files are not read or refreshed.']);return lines;}
return freeze({RECIPE,profiles,groups,catalog,profileFor,profileForSelection,checkTarget,targetTuple,currentRow,subjectContext,checkContext,canonicalContext,eligibility,meaningPayload,familyMeaningPayload:q=>meaningPayload(q,{family:true}),fieldText,rawText,classify,project,patchPayload,checkProof,proofUnion,contextLines,nativeFieldOrder:q=>profileFor(q).keys});
});
