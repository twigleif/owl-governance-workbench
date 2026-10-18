/* Closed Assessment System-profile owner questions. Catalogue f5675da1…; no storage or live inventory refresh. */
(function(root,factory){const node=typeof module==='object'&&module.exports,api=factory(node?require('./saved-text.js'):root.OWLSavedText,node?require('./assessment-schema.js'):root.OWLAssessmentSchema,node?require('./assessment-core.js'):root.OWLAssessmentCore,node?require('./reference-schema.js'):root.OWLReferenceSchema);if(node)module.exports=api;else root.OWLOwnerAssessmentProfiles=api;})(globalThis,function(T,A,B,R){
'use strict';
const RECIPE='owner-assessment-profile-1',SOURCE='4a73c1fa6df89a241c3f4eed45ef33894f5916659035d7a7643a625de39417ae',PROFILE='system-profile';
const freeze=v=>{if(v&&typeof v==='object'){Object.values(v).forEach(freeze);Object.freeze(v);}return v;};
const catalog=freeze([
  {
    "id": "doc-assessment-profile-intended_use",
    "field": "profile.intended_use",
    "label": "Intended use",
    "locator": "System!B7",
    "question": "How will people use the system in the assessed situation?",
    "help": "Describe the actual/proposed workflow and decisions it assists; distinguish actual use from intended use. Say what is known at the stated cut-off and mark missing parts Pending.",
    "examples": [
      "The organization’s staff use suggestions to prepare drafts they check before sending.",
      "The organization’s operators use forecasts to plan inspections; the system does not issue work orders."
    ],
    "pendingExample": "Pending: the responsible contributor needs to confirm intended use for this assessed state.",
    "mode": "fact",
    "condition": "Exact editable assessment snapshot and selected unit only; contributor has the needed responsibility and competence.",
    "expected": "Describe the actual/proposed workflow and decisions it assists; distinguish actual use from intended use.",
    "destinations": [
      "AI-System-Governance-Assessment-Template.xlsx :: System!B7 in the selected draft"
    ],
    "key": "intended_use",
    "column": "B",
    "hint": "Describe the actual/proposed workflow and decisions it assists; distinguish actual use from intended use. Say what is known at the stated cut-off and mark missing parts Pending.",
    "partial": "Pending: the responsible contributor needs to confirm intended use for this assessed state.",
    "groupId": "doc-assessment-profile-people-and-use",
    "groupTitle": "People and use",
    "groupAudience": "Responsible system/process owner, with relevant technical/social/legal specialists only for their scoped expertise",
    "audience": "Responsible system/process owner, with relevant technical/social/legal specialists only for their scoped expertise",
    "profileId": "system-profile"
  },
  {
    "id": "doc-assessment-profile-intended_users",
    "field": "profile.intended_users",
    "label": "Intended users",
    "locator": "System!B13",
    "question": "Who is expected to use it?",
    "help": "Name roles/groups, relevant training and access needs; do not supply personal-data lists. Say what is known at the stated cut-off and mark missing parts Pending.",
    "examples": [
      "The organization’s trained intake coordinators use the system during case preparation. They have access to assigned cases and related sources, with other cases excluded. Training covers checking suggestions and reporting errors.",
      "The organization’s planners and shift supervisors use forecasts after role-specific training. Planners inspect source data; supervisors can pause use. Contractors receive approved schedules but cannot access the tool."
    ],
    "pendingExample": "Pending: the responsible contributor needs to confirm intended users for this assessed state.",
    "mode": "fact",
    "condition": "Exact editable assessment snapshot and selected unit only; contributor has the needed responsibility and competence.",
    "expected": "Name roles/groups, relevant training and access needs; do not supply personal-data lists.",
    "destinations": [
      "AI-System-Governance-Assessment-Template.xlsx :: System!B13 in the selected draft"
    ],
    "key": "intended_users",
    "column": "B",
    "hint": "Name roles/groups, relevant training and access needs; do not supply personal-data lists. Say what is known at the stated cut-off and mark missing parts Pending.",
    "partial": "Pending: the responsible contributor needs to confirm intended users for this assessed state.",
    "groupId": "doc-assessment-profile-people-and-use",
    "groupTitle": "People and use",
    "groupAudience": "Responsible system/process owner, with relevant technical/social/legal specialists only for their scoped expertise",
    "audience": "Responsible system/process owner, with relevant technical/social/legal specialists only for their scoped expertise",
    "profileId": "system-profile"
  },
  {
    "id": "doc-assessment-profile-restrictions",
    "field": "profile.restrictions",
    "label": "Use restrictions",
    "locator": "System!B15",
    "question": "What limits on use currently apply to this assessed system?",
    "help": "Describe existing approved prohibited uses/limits and their source. If not decided, say Pending. Say what is known at the stated cut-off and mark missing parts Pending.",
    "examples": [
      "The organization requires staff review of every proposed response and prohibits automatic customer decisions under its retained Staff AI Use Procedure version 1.2, section 4. Only permitted case information may be used. Coverage of the new language is Pending review.",
      "The organization limits use to planning assistance and excludes safety-critical control under Operating Use Specification version 2.0, section 3. Forecasts cannot replace inspections; those limits form part of the assessed baseline."
    ],
    "pendingExample": "Pending: the responsible contributor needs to confirm use restrictions for this assessed state.",
    "mode": "fact",
    "condition": "Exact editable assessment snapshot and selected unit only; contributor has the needed responsibility and competence.",
    "expected": "Describe existing approved prohibited uses/limits and their source. If not decided, say Pending.",
    "destinations": [
      "AI-System-Governance-Assessment-Template.xlsx :: System!B15 in the selected draft"
    ],
    "key": "restrictions",
    "column": "B",
    "hint": "Describe existing approved prohibited uses/limits and their source. If not decided, say Pending. Say what is known at the stated cut-off and mark missing parts Pending.",
    "partial": "Pending: the responsible contributor needs to confirm use restrictions for this assessed state.",
    "groupId": "doc-assessment-profile-people-and-use",
    "groupTitle": "People and use",
    "groupAudience": "Responsible system/process owner, with relevant technical/social/legal specialists only for their scoped expertise",
    "audience": "Responsible system/process owner, with relevant technical/social/legal specialists only for their scoped expertise",
    "profileId": "system-profile"
  },
  {
    "id": "doc-assessment-profile-technical_context",
    "field": "profile.technical_context",
    "label": "Technical context",
    "locator": "System!E5",
    "question": "What technology and operating setup matters to this assessment?",
    "help": "Describe material model/software/data/interfaces/environment, exact known versions and limitations. Say what is known at the stated cut-off and mark missing parts Pending.",
    "examples": [
      "The organization runs Intake Portal 3.4, classifier configuration 2.1 and document export 2026-09 in its North Office production environment. Role-based staff access and permitted source documents feed suggestions. Supplier model revision is Pending confirmation.",
      "The organization tests Forecast Service 1.6 with model build 2026-09-12 and pipeline 3.0. Nightly equipment exports feed forecasts to Planning Console 2.2. Validation for rare conditions remains limited."
    ],
    "pendingExample": "Pending: the responsible contributor needs to confirm technical context for this assessed state.",
    "mode": "fact",
    "condition": "Exact editable assessment snapshot and selected unit only; contributor has the needed responsibility and competence.",
    "expected": "Describe material model/software/data/interfaces/environment, exact known versions and limitations.",
    "destinations": [
      "AI-System-Governance-Assessment-Template.xlsx :: System!E5 in the selected draft"
    ],
    "key": "technical_context",
    "column": "E",
    "hint": "Describe material model/software/data/interfaces/environment, exact known versions and limitations. Say what is known at the stated cut-off and mark missing parts Pending.",
    "partial": "Pending: the responsible contributor needs to confirm technical context for this assessed state.",
    "groupId": "doc-assessment-profile-technical-boundary",
    "groupTitle": "Technical boundary",
    "groupAudience": "Responsible system/process owner, with relevant technical/social/legal specialists only for their scoped expertise",
    "audience": "Responsible system/process owner, with relevant technical/social/legal specialists only for their scoped expertise",
    "profileId": "system-profile"
  },
  {
    "id": "doc-assessment-profile-boundary",
    "field": "profile.boundary",
    "label": "System boundary",
    "locator": "System!E8",
    "question": "Where does this system start and end for this assessment?",
    "help": "Describe included functions/components/data/users/integrations and excluded dependencies; keep uncertain boundaries explicit. Say what is known at the stated cut-off and mark missing parts Pending.",
    "examples": [
      "The organization includes Intake Portal 3.4, retrieval, suggestions, assigned-case data and the review interface. Source repositories are dependencies. Final approval/delivery stay in the staff workflow. Customer self-service and unrelated tools are excluded; external model identity is Pending.",
      "The organization includes Forecast Service 1.6, its pipeline, console, test data and planner/supervisor users. Equipment feeds are dependencies; physical controls and inspection decisions are outside the system. The proposed new site is included; legacy sites are outside this assessment."
    ],
    "pendingExample": "Pending: the responsible contributor needs to confirm system boundary for this assessed state.",
    "mode": "fact",
    "condition": "Exact editable assessment snapshot and selected unit only; contributor has the needed responsibility and competence.",
    "expected": "Describe included functions/components/data/users/integrations and excluded dependencies; keep uncertain boundaries explicit.",
    "destinations": [
      "AI-System-Governance-Assessment-Template.xlsx :: System!E8 in the selected draft"
    ],
    "key": "boundary",
    "column": "E",
    "hint": "Describe included functions/components/data/users/integrations and excluded dependencies; keep uncertain boundaries explicit. Say what is known at the stated cut-off and mark missing parts Pending.",
    "partial": "Pending: the responsible contributor needs to confirm system boundary for this assessed state.",
    "groupId": "doc-assessment-profile-technical-boundary",
    "groupTitle": "Technical boundary",
    "groupAudience": "Responsible system/process owner, with relevant technical/social/legal specialists only for their scoped expertise",
    "audience": "Responsible system/process owner, with relevant technical/social/legal specialists only for their scoped expertise",
    "profileId": "system-profile"
  },
  {
    "id": "doc-assessment-profile-jurisdictions",
    "field": "profile.jurisdictions",
    "label": "Jurisdictions considered",
    "locator": "System!E7",
    "question": "Which places are relevant to this assessed use?",
    "help": "Name actual operation/user/affected-party/data locations and why relevant. Specialists determine legal applicability separately. Say what is known at the stated cut-off and mark missing parts Pending.",
    "examples": [
      "The organization operates the tool in Singapore for its Singapore staff and customers, with assessed data stored in Singapore. These locations matter to operations and data handling; competent specialists determine obligations separately.",
      "The organization supports staff in Ireland and Germany through an externally hosted service. Customer records originate in both countries; hosting location is Pending supplier confirmation for specialist review."
    ],
    "pendingExample": "Pending: the responsible contributor needs to confirm jurisdictions considered for this assessed state.",
    "mode": "fact",
    "condition": "Exact editable assessment snapshot and selected unit only; contributor has the needed responsibility and competence.",
    "expected": "Name actual operation/user/affected-party/data locations and why relevant. Specialists determine legal applicability separately.",
    "destinations": [
      "AI-System-Governance-Assessment-Template.xlsx :: System!E7 in the selected draft"
    ],
    "key": "jurisdictions",
    "column": "E",
    "hint": "Name actual operation/user/affected-party/data locations and why relevant. Specialists determine legal applicability separately. Say what is known at the stated cut-off and mark missing parts Pending.",
    "partial": "Pending: the responsible contributor needs to confirm jurisdictions considered for this assessed state.",
    "groupId": "doc-assessment-profile-technical-boundary",
    "groupTitle": "Technical boundary",
    "groupAudience": "Responsible system/process owner, with relevant technical/social/legal specialists only for their scoped expertise",
    "audience": "Responsible system/process owner, with relevant technical/social/legal specialists only for their scoped expertise",
    "profileId": "system-profile"
  },
  {
    "id": "doc-assessment-profile-societal_context",
    "field": "profile.societal_context",
    "label": "Societal context",
    "locator": "System!E6",
    "question": "What wider circumstances affect this use of AI?",
    "help": "Describe relevant language/accessibility/power relationships or community/economic context within your competence; no unsupported specialist conclusion. Say what is known at the stated cut-off and mark missing parts Pending.",
    "examples": [
      "The organization serves people with varied language needs, so unclear AI-assisted information may be harder for some people to challenge.",
      "The organization uses the system for staff planning, where shift patterns and contractor access affect who can question outputs."
    ],
    "pendingExample": "Pending: the responsible contributor needs to confirm societal context for this assessed state.",
    "mode": "fact",
    "condition": "Exact editable assessment snapshot and selected unit only; contributor has the needed responsibility and competence.",
    "expected": "Describe relevant language/accessibility/power relationships or community/economic context within your competence; no unsupported specialist conclusion.",
    "destinations": [
      "AI-System-Governance-Assessment-Template.xlsx :: System!E6 in the selected draft"
    ],
    "key": "societal_context",
    "column": "E",
    "hint": "Describe relevant language/accessibility/power relationships or community/economic context within your competence; no unsupported specialist conclusion. Say what is known at the stated cut-off and mark missing parts Pending.",
    "partial": "Pending: the responsible contributor needs to confirm societal context for this assessed state.",
    "groupId": "doc-assessment-profile-effects-and-context",
    "groupTitle": "Effects and context",
    "groupAudience": "Responsible system/process owner, with relevant technical/social/legal specialists only for their scoped expertise",
    "audience": "Responsible system/process owner, with relevant technical/social/legal specialists only for their scoped expertise",
    "profileId": "system-profile"
  },
  {
    "id": "doc-assessment-profile-affected_parties",
    "field": "profile.affected_parties",
    "label": "Affected parties",
    "locator": "System!B16",
    "question": "Who could be affected even if they do not use the system?",
    "help": "Identify people/groups/organizations and their connection to outputs; keep unknown groups Pending. Say what is known at the stated cut-off and mark missing parts Pending.",
    "examples": [
      "The organization’s customers may receive staff responses influenced by the tool, although customers do not use it directly.",
      "The organization’s workers and contractors may be affected by schedules proposed using forecasts."
    ],
    "pendingExample": "Pending: the responsible contributor needs to confirm affected parties for this assessed state.",
    "mode": "fact",
    "condition": "Exact editable assessment snapshot and selected unit only; contributor has the needed responsibility and competence.",
    "expected": "Identify people/groups/organizations and their connection to outputs; keep unknown groups Pending.",
    "destinations": [
      "AI-System-Governance-Assessment-Template.xlsx :: System!B16 in the selected draft"
    ],
    "key": "affected_parties",
    "column": "B",
    "hint": "Identify people/groups/organizations and their connection to outputs; keep unknown groups Pending. Say what is known at the stated cut-off and mark missing parts Pending.",
    "partial": "Pending: the responsible contributor needs to confirm affected parties for this assessed state.",
    "groupId": "doc-assessment-profile-effects-and-context",
    "groupTitle": "Effects and context",
    "groupAudience": "Responsible system/process owner, with relevant technical/social/legal specialists only for their scoped expertise",
    "audience": "Responsible system/process owner, with relevant technical/social/legal specialists only for their scoped expertise",
    "profileId": "system-profile"
  },
  {
    "id": "doc-assessment-profile-foreseeable_misuse",
    "field": "profile.foreseeable_misuse",
    "label": "Foreseeable misuse",
    "locator": "System!B14",
    "question": "How might someone use the system in an unintended way?",
    "help": "Give plausible misuse specific to this workflow; distinguish a possibility from an established incident. Say what is known at the stated cut-off and mark missing parts Pending.",
    "examples": [
      "The organization identifies possible misuse if staff send an unchecked draft as a final answer.",
      "The organization identifies possible misuse if forecasts are treated as permission to bypass required inspections."
    ],
    "pendingExample": "Pending: the responsible contributor needs to confirm foreseeable misuse for this assessed state.",
    "mode": "draft",
    "condition": "Exact editable assessment snapshot and selected unit only; contributor has the needed responsibility and competence.",
    "expected": "Give plausible misuse specific to this workflow; distinguish a possibility from an established incident.",
    "destinations": [
      "AI-System-Governance-Assessment-Template.xlsx :: System!B14 in the selected draft"
    ],
    "key": "foreseeable_misuse",
    "column": "B",
    "hint": "Give plausible misuse specific to this workflow; distinguish a possibility from an established incident. Say what is known at the stated cut-off and mark missing parts Pending.",
    "partial": "Pending: the responsible contributor needs to confirm foreseeable misuse for this assessed state.",
    "groupId": "doc-assessment-profile-effects-and-context",
    "groupTitle": "Effects and context",
    "groupAudience": "Responsible system/process owner, with relevant technical/social/legal specialists only for their scoped expertise",
    "audience": "Responsible system/process owner, with relevant technical/social/legal specialists only for their scoped expertise",
    "profileId": "system-profile"
  },
  {
    "id": "doc-assessment-profile-outputs",
    "field": "profile.outputs",
    "label": "Outputs and downstream use",
    "locator": "System!E9",
    "question": "What does the system produce, and what happens to it next?",
    "help": "Describe output types, destinations, users and consequential downstream use. Say what is known at the stated cut-off and mark missing parts Pending.",
    "examples": [
      "The organization receives suggested classifications; staff choose a queue and record the final choice.",
      "The organization receives forecasts; planners combine them with inspection records before proposing a schedule."
    ],
    "pendingExample": "Pending: the responsible contributor needs to confirm outputs and downstream use for this assessed state.",
    "mode": "fact",
    "condition": "Exact editable assessment snapshot and selected unit only; contributor has the needed responsibility and competence.",
    "expected": "Describe output types, destinations, users and consequential downstream use.",
    "destinations": [
      "AI-System-Governance-Assessment-Template.xlsx :: System!E9 in the selected draft"
    ],
    "key": "outputs",
    "column": "E",
    "hint": "Describe output types, destinations, users and consequential downstream use. Say what is known at the stated cut-off and mark missing parts Pending.",
    "partial": "Pending: the responsible contributor needs to confirm outputs and downstream use for this assessed state.",
    "groupId": "doc-assessment-profile-operation-and-oversight",
    "groupTitle": "Operation and oversight",
    "groupAudience": "Responsible system/process owner, with relevant technical/social/legal specialists only for their scoped expertise",
    "audience": "Responsible system/process owner, with relevant technical/social/legal specialists only for their scoped expertise",
    "profileId": "system-profile"
  },
  {
    "id": "doc-assessment-profile-human_oversight",
    "field": "profile.human_oversight",
    "label": "Human oversight",
    "locator": "System!E10",
    "question": "What can a person actually check, change or stop?",
    "help": "Describe role, source information, time, intervention/stop ability and escalation in the actual workflow. Say what is known at the stated cut-off and mark missing parts Pending.",
    "examples": [
      "The organization’s coordinators see suggestions and original sources before routing cases, with time reserved for checking. They can change/reject suggestions or hold a case. Repeated or urgent errors go to the duty operations lead through the incident route; peak-workload limits remain recorded.",
      "The organization’s supervisors see forecasts alongside inspections before issuing a schedule. They can pause use and request manual planning when conditions conflict. Alerts go to the duty lead during working hours; out-of-hours coverage is Pending."
    ],
    "pendingExample": "Pending: the responsible contributor needs to confirm human oversight for this assessed state.",
    "mode": "fact",
    "condition": "Exact editable assessment snapshot and selected unit only; contributor has the needed responsibility and competence.",
    "expected": "Describe role, source information, time, intervention/stop ability and escalation in the actual workflow.",
    "destinations": [
      "AI-System-Governance-Assessment-Template.xlsx :: System!E10 in the selected draft"
    ],
    "key": "human_oversight",
    "column": "E",
    "hint": "Describe role, source information, time, intervention/stop ability and escalation in the actual workflow. Say what is known at the stated cut-off and mark missing parts Pending.",
    "partial": "Pending: the responsible contributor needs to confirm human oversight for this assessed state.",
    "groupId": "doc-assessment-profile-operation-and-oversight",
    "groupTitle": "Operation and oversight",
    "groupAudience": "Responsible system/process owner, with relevant technical/social/legal specialists only for their scoped expertise",
    "audience": "Responsible system/process owner, with relevant technical/social/legal specialists only for their scoped expertise",
    "profileId": "system-profile"
  },
  {
    "id": "doc-assessment-profile-monitoring",
    "field": "profile.monitoring",
    "label": "Monitoring approach",
    "locator": "System!E11",
    "question": "How are problems and changes noticed during operation?",
    "help": "Describe actual checks/signals, frequency/events, responsible route and retained records; no invented thresholds. Say what is known at the stated cut-off and mark missing parts Pending.",
    "examples": [
      "The organization’s quality lead samples routing corrections weekly and reviews complaints after significant incidents. Operations records configuration/source changes as they occur. Results stay in Quality Review Log QL-2026-09 and Change Register CR-2026; urgent escalation follows the incident route.",
      "The organization’s maintenance lead compares forecasts with inspection outcomes monthly and after major failures. Engineering records model/pipeline changes. Results stay in Planning Monitoring Report MR-2026-09 and release records; thresholds for rare conditions are Pending."
    ],
    "pendingExample": "Pending: the responsible contributor needs to confirm monitoring approach for this assessed state.",
    "mode": "fact",
    "condition": "Exact editable assessment snapshot and selected unit only; contributor has the needed responsibility and competence.",
    "expected": "Describe actual checks/signals, frequency/events, responsible route and retained records; no invented thresholds.",
    "destinations": [
      "AI-System-Governance-Assessment-Template.xlsx :: System!E11 in the selected draft"
    ],
    "key": "monitoring",
    "column": "E",
    "hint": "Describe actual checks/signals, frequency/events, responsible route and retained records; no invented thresholds. Say what is known at the stated cut-off and mark missing parts Pending.",
    "partial": "Pending: the responsible contributor needs to confirm monitoring approach for this assessed state.",
    "groupId": "doc-assessment-profile-operation-and-oversight",
    "groupTitle": "Operation and oversight",
    "groupAudience": "Responsible system/process owner, with relevant technical/social/legal specialists only for their scoped expertise",
    "audience": "Responsible system/process owner, with relevant technical/social/legal specialists only for their scoped expertise",
    "profileId": "system-profile"
  },
  {
    "id": "doc-assessment-profile-known_failures",
    "field": "profile.known_failures",
    "label": "Known limitations and failures",
    "locator": "System!E12",
    "question": "What known limits or failures matter for this assessed state?",
    "help": "Describe observed/documented limits, conditions, sources and unresolved evidence. Explicit None identified requires actual review. Say what is known at the stated cut-off and mark missing parts Pending.",
    "examples": [
      "The organization observed poorer classifications on unclear scans in test sample TS-2026-09, cases 12–18. Its retained report identifies sample and configuration limits. The new language is Pending evaluation, so this is not a complete performance conclusion.",
      "The organization’s validation report VR-2026-09, section 5, covers ordinary conditions at one site. Rare conditions and the proposed new site are Pending evaluation; limited coverage remains visible."
    ],
    "pendingExample": "Pending: the responsible contributor needs to confirm known limitations and failures for this assessed state.",
    "mode": "fact",
    "condition": "Exact editable assessment snapshot and selected unit only; contributor has the needed responsibility and competence.",
    "expected": "Describe observed/documented limits, conditions, sources and unresolved evidence. Explicit None identified requires actual review.",
    "destinations": [
      "AI-System-Governance-Assessment-Template.xlsx :: System!E12 in the selected draft"
    ],
    "key": "known_failures",
    "column": "E",
    "hint": "Describe observed/documented limits, conditions, sources and unresolved evidence. Explicit None identified requires actual review. Say what is known at the stated cut-off and mark missing parts Pending.",
    "partial": "Pending: the responsible contributor needs to confirm known limitations and failures for this assessed state.",
    "groupId": "doc-assessment-profile-failures-and-changes",
    "groupTitle": "Failures and changes",
    "groupAudience": "Responsible system/process owner, with relevant technical/social/legal specialists only for their scoped expertise",
    "audience": "Responsible system/process owner, with relevant technical/social/legal specialists only for their scoped expertise",
    "profileId": "system-profile"
  },
  {
    "id": "doc-assessment-profile-material_changes",
    "field": "profile.material_changes",
    "label": "Material changes (required for reassessment)",
    "locator": "System!E13",
    "question": "What has changed since the earlier assessed state?",
    "help": "For reassessment, describe material model/data/configuration/integration/use/people/context changes; preserve the earlier baseline. Say what is known at the stated cut-off and mark missing parts Pending.",
    "examples": [
      "The organization changed document export 2026-08 to 2026-09 and added a language in configuration 2.1. Permissions and routing integration are unchanged. Earlier tests remain tied to 2.0; new-language validation is Pending.",
      "The organization added a proposed site and changed pipeline 2.5 to 3.0 to include new measurements. Forecast Service 1.6 is retained separately from production 1.5. New-site assumptions and validation are Pending, preserving prior assessments and decisions."
    ],
    "pendingExample": "Pending: the responsible contributor needs to confirm material changes (required for reassessment) for this assessed state.",
    "mode": "fact",
    "condition": "Required for reassessment; otherwise record only actual material-change context. Preserve the earlier assessed state.",
    "expected": "For reassessment, describe material model/data/configuration/integration/use/people/context changes; preserve the earlier baseline.",
    "destinations": [
      "AI-System-Governance-Assessment-Template.xlsx :: System!E13 in the selected draft"
    ],
    "key": "material_changes",
    "column": "E",
    "hint": "For reassessment, describe material model/data/configuration/integration/use/people/context changes; preserve the earlier baseline. Say what is known at the stated cut-off and mark missing parts Pending.",
    "partial": "Pending: the responsible contributor needs to confirm material changes (required for reassessment) for this assessed state.",
    "groupId": "doc-assessment-profile-failures-and-changes",
    "groupTitle": "Failures and changes",
    "groupAudience": "Responsible system/process owner, with relevant technical/social/legal specialists only for their scoped expertise",
    "audience": "Responsible system/process owner, with relevant technical/social/legal specialists only for their scoped expertise",
    "profileId": "system-profile"
  }
]);
const groups=freeze([
  {
    "id": "doc-assessment-profile-people-and-use",
    "title": "People and use",
    "audience": "Responsible system/process owner, with relevant technical/social/legal specialists only for their scoped expertise",
    "keys": [
      "intended_use",
      "intended_users",
      "restrictions"
    ]
  },
  {
    "id": "doc-assessment-profile-technical-boundary",
    "title": "Technical boundary",
    "audience": "Responsible system/process owner, with relevant technical/social/legal specialists only for their scoped expertise",
    "keys": [
      "technical_context",
      "boundary",
      "jurisdictions"
    ]
  },
  {
    "id": "doc-assessment-profile-effects-and-context",
    "title": "Effects and context",
    "audience": "Responsible system/process owner, with relevant technical/social/legal specialists only for their scoped expertise",
    "keys": [
      "societal_context",
      "affected_parties",
      "foreseeable_misuse"
    ]
  },
  {
    "id": "doc-assessment-profile-operation-and-oversight",
    "title": "Operation and oversight",
    "audience": "Responsible system/process owner, with relevant technical/social/legal specialists only for their scoped expertise",
    "keys": [
      "outputs",
      "human_oversight",
      "monitoring"
    ]
  },
  {
    "id": "doc-assessment-profile-failures-and-changes",
    "title": "Failures and changes",
    "audience": "Responsible system/process owner, with relevant technical/social/legal specialists only for their scoped expertise",
    "keys": [
      "known_failures",
      "material_changes"
    ]
  }
]);

const keys=freeze(catalog.map(q=>q.key)),inventoryKeys=freeze([...B.inventoryFields]),summaryKeys=freeze(['scope','assessed_state','evidence_cutoff','baseline_record_id','method_record_id','trigger','trigger_details']),recordKeys=freeze(['revision','type','title','version','subject_type','subject_id','lifecycle']),recordProjection=freeze(R.fields.records.map(([key])=>key)),inventoryProjection=freeze(['system_id',...inventoryKeys]),captureKeys=freeze(['unit','row_id','field','target_sheet','target_id','target_revision','values','captured_at']);
const profile=freeze({id:PROFILE,keys,catalog,groups,recipe:RECIPE}),profiles=freeze([profile]),clone=v=>JSON.parse(JSON.stringify(v)),plain=v=>v!==null&&typeof v==='object'&&!Array.isArray(v),exact=(v,ks)=>plain(v)&&Object.keys(v).length===ks.length&&ks.every(k=>Object.hasOwn(v,k));
function fail(message,field='',code='owner-assessment-invalid'){throw Object.assign(Error(message),{field,code});}
function text(v,field='context'){return T.checkText(v,{kind:'Assessment owner input',id:'saved request',field});}
function rawText(v,field='answer'){if(typeof v!=='string'||v.length>12000)fail(field+' exceeds 12,000 UTF-16 units.',field,'owner-inputs-capacity');let part='';for(const scalar of v){if(part.length+scalar.length>2000){text(part,field);part='';}part+=scalar;}text(part,field);return v;}
function id(v,field='identity'){text(v,field);if(!v||v!==v.trim()||/[\r\n\t]/.test(v))fail('Use the exact saved '+field+' without surrounding spaces or line breaks.',field);return v;}
function integer(v,max=Number.MAX_SAFE_INTEGER,min=0){if(!Number.isSafeInteger(v)||v<min||v>max)fail('Unsupported Assessment context revision.');}
function timestamp(v){if(typeof v!=='string'||!/^\d{4}-\d{2}-\d{2}T/.test(v)||!Number.isFinite(Date.parse(v)))fail('Unsupported retained Assessment capture time.');}
function classify(v){const s=v.trim();if(!s)return 'blank';if(/^(?:[-*•]\s*)?(?:pending|unclear)(?:\s*[:;\-–—][\s\S]*|[.!])?$/i.test(s))return 'pending';if(/(?:^|\r?\n|;\s*|\.\s+|\s+[-–—]\s*)\s*(?:[-*•]\s*)?(?:pending|unclear)\s*[:\-–—]/i.test(s))return 'mixed';return 'answer';}
function profileFor(q){const name=typeof q==='string'?q:q?.profile_id||q?.id;if(name!==PROFILE)fail('Unsupported Assessment owner profile.');return profile;}
function profileForSelection(fieldKeys){if(!Array.isArray(fieldKeys)||!fieldKeys.length||fieldKeys.length>keys.length||new Set(fieldKeys).size!==fieldKeys.length||JSON.stringify(fieldKeys)!==JSON.stringify(keys.filter(k=>fieldKeys.includes(k))))fail('Choose a canonical nonempty subset of the fourteen System-profile questions.');return profile;}
function checkTarget(target){if(!exact(target,['kind','record_id','unit','row_id'])||target.kind!=='assessment'||target.unit!=='profile'||target.row_id!=='')fail('Unsupported Assessment owner answer destination.');id(target.record_id,'Assessment Record ID');return target;}
const targetTuple=q=>[q.target.kind,q.target.record_id,q.target.unit,q.target.row_id];
function entry(snapshot,target){checkTarget(target);const e=B.find(snapshot,target.record_id);if(!e||e.deleted_at)fail('The selected Assessment is missing or deleted. Restore its exact saved body before using these answers.','','owner-subject');return e;}
function currentRow(snapshot,target){const e=entry(snapshot,target);return {revision:e.revision,unit_revision:e.profile.revision,record_id:e.record_id,system_id:e.system_id,values:clone(e.profile.values)};}
function projectCapture(c,slot){if(!c)return null;const fields=slot==='inventory'?inventoryProjection:recordProjection;return {...Object.fromEntries(captureKeys.filter(k=>k!=='values').map(k=>[k,c[k]])),values:Object.fromEntries(fields.map(k=>[k,c.values[k]??'']))};}
function subjectContext(snapshot,target){const e=entry(snapshot,target),record=snapshot.references.records.find(r=>r.values.id===e.record_id),get=(unit,field)=>e.captures.find(c=>c.unit===unit&&c.row_id===''&&c.field===field);
 if(!record)fail('The owning Assessment Record is missing. Restore it in Records.','','owner-subject');
 return {system_id:e.system_id,unit_revision:e.profile.revision,record:{revision:record.revision,...Object.fromEntries(recordKeys.filter(k=>k!=='revision').map(k=>[k,record.values[k]]))},summary:Object.fromEntries(summaryKeys.map(k=>[k,e.summary.values[k]])),inventory:Object.fromEntries(inventoryKeys.map(k=>[k,e.profile.values[k]])),captures:{inventory:projectCapture(get('profile','inventory'),'inventory'),baseline:projectCapture(get('summary','baseline_record_id'),'baseline'),method:projectCapture(get('summary','method_record_id'),'method')},routing:{lead:e.summary.values.lead}};
}
function checkContext(c,max=Number.MAX_SAFE_INTEGER,{live=false}={}){
 if(!exact(c,['system_id','unit_revision','record','summary','inventory','captures','routing'])||!exact(c.record,recordKeys)||!exact(c.summary,summaryKeys)||!exact(c.inventory,inventoryKeys)||!exact(c.captures,['inventory','baseline','method'])||!exact(c.routing,['lead']))fail('Unsupported saved Assessment owner context.');
 id(c.system_id,'AI System ID');integer(c.unit_revision,max);integer(c.record.revision,max,1);recordKeys.filter(k=>k!=='revision').forEach(k=>text(c.record[k],k));summaryKeys.forEach(k=>text(c.summary[k],k));inventoryKeys.forEach(k=>text(c.inventory[k],k));text(c.routing.lead,'Assessment lead');
 for(const key of ['baseline_record_id','method_record_id'])if(c.summary[key])id(c.summary[key],key);if(c.summary.evidence_cutoff&&!B.validDate(c.summary.evidence_cutoff))fail('The saved Assessment evidence cut-off must retain its real YYYY-MM-DD date.','evidence_cutoff');
 if(!live&&(c.record.type!=='Assessment'||c.record.subject_type!=='AI system'||c.record.subject_id!==c.system_id||!B.editable.includes(c.record.lifecycle)))fail('The request must name the exact editable Assessment Record and System.');
 for(const [slot,unit,field,sheet,targetId]of [['inventory','profile','inventory','systems',c.system_id],['baseline','summary','baseline_record_id','records',c.summary.baseline_record_id],['method','summary','method_record_id','records',c.summary.method_record_id]]){
  const cap=c.captures[slot];if(cap===null)continue;const fields=slot==='inventory'?inventoryProjection:recordProjection;
  if(!exact(cap,captureKeys)||cap.unit!==unit||cap.row_id!==''||cap.field!==field||cap.target_sheet!==sheet||cap.target_id!==targetId||!exact(cap.values,fields)||!targetId)fail('The retained '+slot+' capture differs from its exact Assessment address.');
  id(cap.target_id,'captured source ID');integer(cap.target_revision,max,slot==='inventory'?0:1);timestamp(cap.captured_at);fields.forEach(k=>text(cap.values[k],slot+' '+k));if(cap.values[slot==='inventory'?'system_id':'id']!==targetId)fail('The retained source capture identity differs from its pointer.');
 }
 return c;
}
function eligibility(snapshot,target){try{B.writable(snapshot,entry(snapshot,target));checkContext(subjectContext(snapshot,target),snapshot.revision);return '';}catch(e){return e.message;}}
function canonicalContext(q,options={}){const c=q.subject_context;checkContext(c,Number.MAX_SAFE_INTEGER,options);return {system_id:c.system_id,unit_revision:c.unit_revision,record:Object.fromEntries(recordKeys.map(k=>[k,c.record[k]])),summary:Object.fromEntries(summaryKeys.map(k=>[k,c.summary[k]])),inventory:Object.fromEntries(inventoryKeys.map(k=>[k,c.inventory[k]])),captures:Object.fromEntries(['inventory','baseline','method'].map(slot=>[slot,projectCapture(c.captures[slot],slot)])),routing:{lead:c.routing.lead}};}
function meaningPayload(q,options={}){profileFor(q);checkTarget(q.target);const c=canonicalContext(q,options);return ['owner-assessment-profile-meaning-v1',q.workspace_id,targetTuple(q),RECIPE,PROFILE,Object.fromEntries(recordKeys.filter(k=>k!=='revision').map(k=>[k,c.record[k]])),c.system_id,c.summary,c.inventory,c.captures];}
function project(q,key,raw,current=''){
 try{profileFor(q);if(!keys.includes(key))fail('This answer is outside the selected Assessment profile.');rawText(raw,key);const value=raw.trim(),kind=/^(?:unknown|not known)$/i.test(value)?'pending':classify(raw);
  if(kind==='blank'||kind==='pending')return {eligible:false,kind,status:kind==='blank'?'No answer yet':'Pending',message:'Keep this question unfinished; its saved Assessment value stays as it is.'};
  if(kind==='mixed')return {eligible:false,kind,status:'Partly answered',message:'Edit to save the usable part. The Pending note stays with the original reply for follow-up.'};
  text(value,key);return {eligible:true,kind:'answer',status:value===current?'Already matches':'Ready to use',value,matching:value===current,message:''};
 }catch(e){return {eligible:false,kind:'invalid',status:'Needs editing',message:e.message};}
}
function contextLines(q){
 const c=q.subject_context,shown=v=>v.trim()?v:'Not recorded',capLine=slot=>{const cap=c.captures[slot];return cap?'Captured '+cap.target_id+' · revision '+cap.target_revision+' · '+cap.captured_at:'No retained capture';};
 const lines=[];if(q.organization_label?.trim())lines.push(['Organization',q.organization_label]);
 lines.push(['Assessment Record ID',q.target.record_id],['Assessment version',shown(c.record.version)],['Assessment title',shown(c.record.title)],['AI System ID',c.system_id],['Scope',shown(c.summary.scope)],['Setup being assessed',shown(c.summary.assessed_state)],['Evidence cut-off',shown(c.summary.evidence_cutoff)],['Trigger',shown(c.summary.trigger)],['Trigger details',shown(c.summary.trigger_details)],['Baseline Record ID',shown(c.summary.baseline_record_id)],['Retained baseline title',shown(c.captures.baseline?.values.title||'')],['Retained baseline version',shown(c.captures.baseline?.values.version||'')],['Baseline capture',capLine('baseline')],['Method Record ID',shown(c.summary.method_record_id)],['Retained method title',shown(c.captures.method?.values.title||'')],['Retained method version',shown(c.captures.method?.values.version||'')],['Method capture',capLine('method')],['Assessment lead',shown(c.routing.lead)],['','Already included from the saved Assessment profile']);
 inventoryKeys.forEach(k=>lines.push([A.fields.profile.find(f=>f.key===k).label,shown(c.inventory[k])]));
 lines.push(['Inventory capture',capLine('inventory')],['','These are saved Assessment facts and retained metadata. They do not read the source file or refresh from the current Register.']);return lines;
}
const nativeFieldOrder=()=>A.fields.profile.map(f=>f.key);
function checkProof(p,q,r,max=Number.MAX_SAFE_INTEGER){
 if(!exact(p,['workspace_revision','entry_revision','record_id','unit','row_id','action','at','before','after'])||p.workspace_revision!==r.workspace_revision||p.entry_revision!==r.target_revision||p.record_id!==q.target.record_id||p.unit!=='profile'||p.row_id!==''||p.action!=='edit'||p.at!==r.at)fail('Invalid immutable native Assessment profile proof.');
 integer(p.workspace_revision,max,1);integer(p.entry_revision,p.workspace_revision,q.target_revision+1);
 for(const payload of [p.before,p.after]){if(!exact(payload,['values','captures','deleted_at'])||payload.deleted_at!==null||!Array.isArray(payload.captures))fail('Invalid Assessment profile history payload.');B.validateValues('profile',payload.values);for(const [k,v]of Object.entries(payload.values))text(v,k);}
 if(JSON.stringify(p.before.captures)!==JSON.stringify(p.after.captures))fail('Owner answers cannot change retained Assessment captures.');
 const seen=new Set();for(const cap of p.before.captures){if(!exact(cap,captureKeys)||cap.unit!=='profile'||cap.row_id!==''||cap.field!=='inventory'||cap.target_sheet!=='systems'||cap.target_id!==q.subject_context.system_id||!plain(cap.values)||cap.values.system_id!==cap.target_id||seen.has(cap.field))fail('Invalid native inventory capture in Assessment proof.');seen.add(cap.field);integer(cap.target_revision,p.workspace_revision-1);timestamp(cap.captured_at);for(const [k,v]of Object.entries(cap.values)){text(k,'captured field');text(v,k);}}
 const captured=p.before.captures.find(c=>c.field==='inventory')||null;if(JSON.stringify(projectCapture(captured,'inventory'))!==JSON.stringify(projectCapture(q.subject_context.captures.inventory,'inventory')))fail('The Assessment proof differs from its retained request-time inventory capture.');
 for(const key of inventoryKeys)if(p.before.values[key]!==p.after.values[key]||p.before.values[key]!==q.subject_context.inventory[key])fail('Owner answers cannot change the seven saved Assessment inventory facts.');
 const changes=nativeFieldOrder().filter(key=>p.before.values[key]!==p.after.values[key]).map(field=>({field,before:p.before.values[field],after:p.after.values[field]}));
 if(!changes.length||changes.some(x=>!q.field_keys.includes(x.field))||p.before.values[r.field]!==r.before||p.after.values[r.field]!==r.after)fail('The Assessment proof changes an unrelated field or differs from its receipt.');
 return changes;
}
return Object.freeze({RECIPE,SOURCE,PROFILE,catalog,groups,keys,profiles,profileFor,profileForSelection,inventoryKeys,summaryKeys,recordKeys,recordProjection,inventoryProjection,captureKeys,currentRow,checkTarget,targetTuple,subjectContext,checkContext,canonicalContext,meaningPayload,eligibility,project,contextLines,nativeFieldOrder,checkProof,rawText,defaultKeys:Object.freeze(['intended_use','intended_users','restrictions'])});
});

