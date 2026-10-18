/* Closed selected-unit Assessment owner recipe. Pure source/context/proof projection. */
(function(root,factory){const node=typeof module==='object'&&module.exports,api=factory(node?require('./saved-text.js'):root.OWLSavedText,node?require('./assessment-core.js'):root.OWLAssessmentCore,node?require('./assessment-schema.js'):root.OWLAssessmentSchema,node?require('./reference-schema.js'):root.OWLReferenceSchema,node?require('./owner-assessment-profiles.js'):root.OWLOwnerAssessmentProfiles);if(node)module.exports=api;else root.OWLOwnerAssessmentUnitsProfiles=api;})(globalThis,function(T,B,A,R,H){
'use strict';
const RECIPE='owner-assessment-units-1',SOURCE=H.SOURCE;
function freeze(v){if(v&&typeof v==='object'){Object.values(v).forEach(freeze);Object.freeze(v);}return v;}
const catalog=freeze([
  {
    "id": "doc-assessment-summary-scope",
    "field": "summary.scope",
    "label": "Assessment scope",
    "locator": "Summary!B7",
    "question": "What work and boundaries should this assessment cover?",
    "help": "Describe the proposed system/use, people/processes, context and exclusions; the assessment lead reviews the boundary. Say what is known at the stated cut-off and mark missing parts Pending.",
    "examples": [
      "The organization proposes assessing Document Sorter 2.3 in the internal intake test environment. The scope covers intake staff using its suggested queues for scanned correspondence, their supervisor review, and customers whose documents are routed. It excludes customer-facing replies and automated case decisions; those functions are not part of this proposed use.",
      "The organization proposes assessing Forecast Planner 1.4 in the planning pilot environment at its Leeds service site. The scope covers planners, supervisors and workers affected by the weekly maintenance schedule prepared from its forecasts. It excludes payroll, worker performance scoring and other sites; any extension would require a separately defined assessment scope."
    ],
    "pendingExample": "Pending: the responsible contributor needs to confirm assessment scope for this assessed state.",
    "mode": "draft",
    "condition": "Exact editable assessment snapshot and selected unit only; contributor has the needed responsibility and competence.",
    "expected": "Describe the proposed system/use, people/processes, context and exclusions; the assessment lead reviews the boundary.",
    "destinations": [
      "AI-System-Governance-Assessment-Template.xlsx :: Summary!B7 in the selected draft"
    ],
    "key": "scope",
    "hint": "Describe the proposed system/use, people/processes, context and exclusions; the assessment lead reviews the boundary. Say what is known at the stated cut-off and mark missing parts Pending.",
    "partial": "Pending: the responsible contributor needs to confirm assessment scope for this assessed state.",
    "groupId": "doc-assessment-summary-assessment-context",
    "groupTitle": "Assessment context",
    "groupAudience": "Assessment lead and responsible system/process owner",
    "audience": "Assessment lead and responsible system/process owner",
    "profileId": "assessment-context"
  },
  {
    "id": "doc-assessment-summary-trigger_details",
    "field": "summary.trigger_details",
    "label": "Trigger details (required when trigger is Other)",
    "locator": "Summary!B9",
    "question": "What event or situation led to this assessment?",
    "help": "For trigger Other, describe the actual event and affected state; this does not claim review or authorization occurred. Say what is known at the stated cut-off and mark missing parts Pending.",
    "examples": [
      "The organization received a customer complaint on 2026-07-15 about inconsistent suggested queues after the new scanning connector was connected to Document Sorter 2.3. The affected state is the internal intake test environment using scanning connector 1.1; the assessment will examine that configuration and the complaint records available by 2026-07-31.",
      "The organization identified a forecasting feature on 2026-07-18 in Planning Workspace 4.2, which staff already used to prepare maintenance schedules. The affected state is Forecast Planner 1.4 enabled within that application in the Leeds planning pilot environment. The event prompted collection of its configuration and use information; it does not establish approval of the feature."
    ],
    "pendingExample": "Pending: the responsible contributor needs to confirm trigger details (required when trigger is other) for this assessed state.",
    "mode": "fact",
    "condition": "Only when the selected Assessment trigger is Other; otherwise this field stays blank.",
    "expected": "For trigger Other, describe the actual event and affected state; this does not claim review or authorization occurred.",
    "destinations": [
      "AI-System-Governance-Assessment-Template.xlsx :: Summary!B9 in the selected draft"
    ],
    "key": "trigger_details",
    "hint": "For trigger Other, describe the actual event and affected state; this does not claim review or authorization occurred. Say what is known at the stated cut-off and mark missing parts Pending.",
    "partial": "Pending: the responsible contributor needs to confirm trigger details (required when trigger is other) for this assessed state.",
    "groupId": "doc-assessment-summary-assessment-context",
    "groupTitle": "Assessment context",
    "groupAudience": "Assessment lead and responsible system/process owner",
    "audience": "Assessment lead and responsible system/process owner",
    "profileId": "assessment-context"
  },
  {
    "id": "doc-assessment-summary-assessed_state",
    "field": "summary.assessed_state",
    "label": "Assessed state",
    "locator": "Summary!B10",
    "question": "Which exact current or proposed state is being assessed?",
    "help": "Give version/configuration/environment/use and differences from an existing baseline; the state need not be approved. Say what is known at the stated cut-off and mark missing parts Pending.",
    "examples": [
      "The organization assesses Intake Portal 3.4 with classifier configuration 2.1 in its North Office production environment. Staff review suggestions and automatic forwarding is disabled. The evidence cut-off is 2026-09-30; configuration 2.0 remains the earlier baseline.",
      "The organization assesses proposed Forecast Service 1.6 with input pipeline 3.0 in its test environment. It would support planners at a new site and is not yet operational. The evidence cut-off is 2026-09-30; production service 1.5 stays unchanged."
    ],
    "pendingExample": "Pending: the responsible contributor needs to confirm assessed state for this assessed state.",
    "mode": "fact",
    "condition": "Exact editable assessment snapshot and selected unit only; contributor has the needed responsibility and competence.",
    "expected": "Give version/configuration/environment/use and differences from an existing baseline; the state need not be approved.",
    "destinations": [
      "AI-System-Governance-Assessment-Template.xlsx :: Summary!B10 in the selected draft"
    ],
    "key": "assessed_state",
    "hint": "Give version/configuration/environment/use and differences from an existing baseline; the state need not be approved. Say what is known at the stated cut-off and mark missing parts Pending.",
    "partial": "Pending: the responsible contributor needs to confirm assessed state for this assessed state.",
    "groupId": "doc-assessment-summary-assessment-context",
    "groupTitle": "Assessment context",
    "groupAudience": "Assessment lead and responsible system/process owner",
    "audience": "Assessment lead and responsible system/process owner",
    "profileId": "assessment-context"
  },
  {
    "id": "doc-assessment-elements-name",
    "field": "elements.name",
    "label": "Element name",
    "locator": "System!C18",
    "question": "What is this material component or role called?",
    "help": "Give the recognizable actual name of the selected component. Say what is known at the stated cut-off and mark missing parts Pending.",
    "examples": [
      "The organization calls this component its document retrieval service.",
      "The organization calls this role its supervisor review function."
    ],
    "pendingExample": "Pending: the responsible contributor needs to confirm element name for this assessed state.",
    "mode": "fact",
    "condition": "Exact editable assessment snapshot and selected unit only; contributor has the needed responsibility and competence.",
    "expected": "Give the recognizable actual name of the selected component.",
    "destinations": [
      "AI-System-Governance-Assessment-Template.xlsx :: System!C18 header → the same column on the exact selected draft Element row (row identity required; not import-ready yet)"
    ],
    "key": "name",
    "hint": "Give the recognizable actual name of the selected component. Say what is known at the stated cut-off and mark missing parts Pending.",
    "partial": "Pending: the responsible contributor needs to confirm element name for this assessed state.",
    "groupId": "doc-assessment-elements-component-identity",
    "groupTitle": "Component identity",
    "groupAudience": "Responsible component team or actual human-role contributor",
    "audience": "Responsible component team or actual human-role contributor",
    "profileId": "system-element"
  },
  {
    "id": "doc-assessment-elements-version",
    "field": "elements.version",
    "label": "Version or identifier",
    "locator": "System!D18",
    "question": "Which exact version or identifier is assessed?",
    "help": "Give applicable release/configuration/dataset/service identifier; missing exact identity is Pending. Say what is known at the stated cut-off and mark missing parts Pending.",
    "examples": [
      "The organization assesses document export edition 2026-09 generated on 2026-09-29, retained with the exact baseline. Its export manifest holds the hash; dataset identity is separate from software version.",
      "The organization assesses configuration 2.4 and model build 2026-09-12 from its baseline manifest. The feeding external service revision is Pending confirmation."
    ],
    "pendingExample": "Pending: the responsible contributor needs to confirm version or identifier for this assessed state.",
    "mode": "fact",
    "condition": "Exact editable assessment snapshot and selected unit only; contributor has the needed responsibility and competence.",
    "expected": "Give applicable release/configuration/dataset/service identifier; missing exact identity is Pending.",
    "destinations": [
      "AI-System-Governance-Assessment-Template.xlsx :: System!D18 header → the same column on the exact selected draft Element row (row identity required; not import-ready yet)"
    ],
    "key": "version",
    "hint": "Give applicable release/configuration/dataset/service identifier; missing exact identity is Pending. Say what is known at the stated cut-off and mark missing parts Pending.",
    "partial": "Pending: the responsible contributor needs to confirm version or identifier for this assessed state.",
    "groupId": "doc-assessment-elements-component-identity",
    "groupTitle": "Component identity",
    "groupAudience": "Responsible component team or actual human-role contributor",
    "audience": "Responsible component team or actual human-role contributor",
    "profileId": "system-element"
  },
  {
    "id": "doc-assessment-elements-role",
    "field": "elements.role",
    "label": "Role in system",
    "locator": "System!E18",
    "question": "What does this component or role contribute?",
    "help": "Explain its function within the selected system; this does not assign authority. Say what is known at the stated cut-off and mark missing parts Pending.",
    "examples": [
      "The organization uses this component to retrieve permitted source documents.",
      "The organization uses this role to inspect proposed schedules and request manual review."
    ],
    "pendingExample": "Pending: the responsible contributor needs to confirm role in system for this assessed state.",
    "mode": "fact",
    "condition": "Exact editable assessment snapshot and selected unit only; contributor has the needed responsibility and competence.",
    "expected": "Explain its function within the selected system; this does not assign authority.",
    "destinations": [
      "AI-System-Governance-Assessment-Template.xlsx :: System!E18 header → the same column on the exact selected draft Element row (row identity required; not import-ready yet)"
    ],
    "key": "role",
    "hint": "Explain its function within the selected system; this does not assign authority. Say what is known at the stated cut-off and mark missing parts Pending.",
    "partial": "Pending: the responsible contributor needs to confirm role in system for this assessed state.",
    "groupId": "doc-assessment-elements-component-identity",
    "groupTitle": "Component identity",
    "groupAudience": "Responsible component team or actual human-role contributor",
    "audience": "Responsible component team or actual human-role contributor",
    "profileId": "system-element"
  },
  {
    "id": "doc-assessment-elements-characteristics",
    "field": "elements.characteristics",
    "label": "Relevant characteristics",
    "locator": "System!G18",
    "question": "What characteristics matter to this assessment?",
    "help": "Describe material technical/operating characteristics; for Other, identify the actual element type. Say what is known at the stated cut-off and mark missing parts Pending.",
    "examples": [
      "The organization’s retrieval component refreshes permitted data nightly and returns a source reference. It excludes sources outside user permissions and logs failed refreshes. Maximum alert delay is Pending confirmation.",
      "The organization’s human review role operates during working hours with original evidence and pause requests. It is a human role, not software. Out-of-hours coverage and peak-workload review time are Pending."
    ],
    "pendingExample": "Pending: the responsible contributor needs to confirm relevant characteristics for this assessed state.",
    "mode": "fact",
    "condition": "Exact editable assessment snapshot and selected unit only; contributor has the needed responsibility and competence.",
    "expected": "Describe material technical/operating characteristics; for Other, identify the actual element type.",
    "destinations": [
      "AI-System-Governance-Assessment-Template.xlsx :: System!G18 header → the same column on the exact selected draft Element row (row identity required; not import-ready yet)"
    ],
    "key": "characteristics",
    "hint": "Describe material technical/operating characteristics; for Other, identify the actual element type. Say what is known at the stated cut-off and mark missing parts Pending.",
    "partial": "Pending: the responsible contributor needs to confirm relevant characteristics for this assessed state.",
    "groupId": "doc-assessment-elements-component-characteristics",
    "groupTitle": "Component characteristics",
    "groupAudience": "Responsible component team or actual human-role contributor",
    "audience": "Responsible component team or actual human-role contributor",
    "profileId": "system-element"
  },
  {
    "id": "doc-assessment-elements-dependency",
    "field": "elements.dependency",
    "label": "Dependency or limitation",
    "locator": "System!H18",
    "question": "What does this component depend on, and what limits that reliance?",
    "help": "State reliance/constraint/failure condition or an actual reviewed None identified; keep uncertainty visible. Say what is known at the stated cut-off and mark missing parts Pending.",
    "examples": [
      "The organization’s component depends on current source permissions; stale permissions may affect retrieval.",
      "The organization’s review role depends on timely alerts and original evidence; weekend coverage is Pending."
    ],
    "pendingExample": "Pending: the responsible contributor needs to confirm dependency or limitation for this assessed state.",
    "mode": "fact",
    "condition": "Exact editable assessment snapshot and selected unit only; contributor has the needed responsibility and competence.",
    "expected": "State reliance/constraint/failure condition or an actual reviewed None identified; keep uncertainty visible.",
    "destinations": [
      "AI-System-Governance-Assessment-Template.xlsx :: System!H18 header → the same column on the exact selected draft Element row (row identity required; not import-ready yet)"
    ],
    "key": "dependency",
    "hint": "State reliance/constraint/failure condition or an actual reviewed None identified; keep uncertainty visible. Say what is known at the stated cut-off and mark missing parts Pending.",
    "partial": "Pending: the responsible contributor needs to confirm dependency or limitation for this assessed state.",
    "groupId": "doc-assessment-elements-component-characteristics",
    "groupTitle": "Component characteristics",
    "groupAudience": "Responsible component team or actual human-role contributor",
    "audience": "Responsible component team or actual human-role contributor",
    "profileId": "system-element"
  },
  {
    "id": "doc-assessment-review-uncertainty",
    "field": "review.uncertainty",
    "label": "Material uncertainty",
    "locator": "Review!N5",
    "question": "What information is uncertain or unavailable for this specific check?",
    "help": "Describe uncertainty relevant to the displayed criterion/question, evidence period and evaluation level. Do not choose pass/fail or applicability. Keep missing parts Pending; fictional examples are not organization evidence.",
    "examples": [
      "For the displayed check on whether intake staff review suggested queues before routing documents, the organization is examining operating behavior during 2026-07-01 to 2026-07-31. The operating log is missing for 2026-07-10 to 2026-07-12, so the sample cannot show what happened on those days. This limits the operating-level evidence for this check; no result is assigned here.",
      "For the displayed check on whether planners can override forecasts before issuing a weekly schedule, the organization is examining the proposed design described in Forecast Planner design note 1.4 dated 2026-07-18. The assessment cut-off is 2026-07-31, and the pilot has not yet run. This supports only a design-level check; staff access to the override and actual use remain unobserved."
    ],
    "pendingExample": "Pending: the responsible contributor needs to confirm material uncertainty for this assessed state.",
    "mode": "fact",
    "condition": "Only the exact selected editable assessment and stable local row. Relevant expertise/responsibility is required; original assessed or issued history stays intact.",
    "expected": "Describe uncertainty relevant to the displayed criterion/question, evidence period and evaluation level. Do not choose pass/fail or applicability.",
    "destinations": [
      "AI-System-Governance-Assessment-Template.xlsx :: Review!N5 header → same column on exact selected draft review row (row identity required; not import-ready yet)"
    ],
    "key": "uncertainty",
    "hint": "Describe uncertainty relevant to the displayed criterion/question, evidence period and evaluation level. Do not choose pass/fail or applicability. Keep missing parts Pending; fictional examples are not organization evidence.",
    "partial": "Pending: the responsible contributor needs to confirm material uncertainty for this assessed state.",
    "groupId": "doc-assessment-review-uncertainty-for-this-check",
    "groupTitle": "Uncertainty for this check",
    "groupAudience": "Assigned competent reviewer and relevant fact contributors for this exact criterion",
    "audience": "Assigned competent reviewer and relevant fact contributors for this exact criterion",
    "profileId": "review-uncertainty"
  },
  {
    "id": "doc-assessment-impacts-affected_party",
    "field": "impacts.affected_party",
    "label": "Affected party",
    "locator": "Impacts!D5",
    "question": "Who could experience this potential effect?",
    "help": "Name the specific affected party/group for this one impact row. Keep missing parts Pending; fictional examples are not organization evidence.",
    "examples": [
      "The organization identifies customers receiving AI-assisted service information.",
      "The organization identifies workers, including contractors, at the Leeds service site whose weekly work schedules may change when planners use Forecast Planner 1.4 outputs."
    ],
    "pendingExample": "Pending: the responsible contributor needs to confirm affected party for this assessed state.",
    "mode": "fact",
    "condition": "Only the exact selected editable assessment and stable local row. Relevant expertise/responsibility is required; original assessed or issued history stays intact.",
    "expected": "Name the specific affected party/group for this one impact row.",
    "destinations": [
      "AI-System-Governance-Assessment-Template.xlsx :: Impacts!D5 header → same column on exact selected draft impacts row (row identity required; not import-ready yet)"
    ],
    "key": "affected_party",
    "hint": "Name the specific affected party/group for this one impact row. Keep missing parts Pending; fictional examples are not organization evidence.",
    "partial": "Pending: the responsible contributor needs to confirm affected party for this assessed state.",
    "groupId": "doc-assessment-impacts-potential-effect",
    "groupTitle": "Potential effect",
    "groupAudience": "Assigned assessor, relevant specialists and affected parties for their actual experience",
    "audience": "Assigned assessor, relevant specialists and affected parties for their actual experience",
    "profileId": "potential-impact"
  },
  {
    "id": "doc-assessment-impacts-source",
    "field": "impacts.source",
    "label": "Source or condition",
    "locator": "Impacts!H5",
    "question": "What condition could give rise to this effect?",
    "help": "Describe a relevant use/misuse/failure/context condition; separate observed facts from hypotheses. Keep missing parts Pending; fictional examples are not organization evidence.",
    "examples": [
      "The organization proposes that incomplete scanned source documents could cause Document Sorter 2.3 to suggest the wrong queue. This is a possible condition for analysis, not a finding that customers have already been affected.",
      "The organization proposes that timely equipment-condition data made available to Forecast Planner 1.4 could help planners schedule maintenance before a disruption. This is a possible enabling condition for the benefit scenario; the pilot has not yet established that the benefit will occur."
    ],
    "pendingExample": "Pending: the responsible contributor needs to confirm source or condition for this assessed state.",
    "mode": "draft",
    "condition": "Only the exact selected editable assessment and stable local row. Relevant expertise/responsibility is required; original assessed or issued history stays intact.",
    "expected": "Describe a relevant use/misuse/failure/context condition; separate observed facts from hypotheses.",
    "destinations": [
      "AI-System-Governance-Assessment-Template.xlsx :: Impacts!H5 header → same column on exact selected draft impacts row (row identity required; not import-ready yet)"
    ],
    "key": "source",
    "hint": "Describe a relevant use/misuse/failure/context condition; separate observed facts from hypotheses. Keep missing parts Pending; fictional examples are not organization evidence.",
    "partial": "Pending: the responsible contributor needs to confirm source or condition for this assessed state.",
    "groupId": "doc-assessment-impacts-potential-effect",
    "groupTitle": "Potential effect",
    "groupAudience": "Assigned assessor, relevant specialists and affected parties for their actual experience",
    "audience": "Assigned assessor, relevant specialists and affected parties for their actual experience",
    "profileId": "potential-impact"
  },
  {
    "id": "doc-assessment-impacts-consequence",
    "field": "impacts.consequence",
    "label": "Potential consequence",
    "locator": "Impacts!I5",
    "question": "What could happen to that group because of it?",
    "help": "Describe one potential positive or negative effect, including who/when/how; do not assign an impact rating. Keep missing parts Pending; fictional examples are not organization evidence.",
    "examples": [
      "The organization proposes that customers whose incomplete documents are routed to the wrong intake queue could receive delayed handling or incomplete instructions during the document intake process. This is a potential consequence requiring analysis; no impact rating is assigned here.",
      "The organization proposes that workers, including contractors, at the Leeds service site could experience fewer unexpected schedule changes if planners use timely forecasts to arrange maintenance before equipment disruption. The potential benefit concerns their weekly work schedule during the pilot; its occurrence and distribution remain to be studied."
    ],
    "pendingExample": "Pending: the responsible contributor needs to confirm potential consequence for this assessed state.",
    "mode": "draft",
    "condition": "Only the exact selected editable assessment and stable local row. Relevant expertise/responsibility is required; original assessed or issued history stays intact.",
    "expected": "Describe one potential positive or negative effect, including who/when/how; do not assign an impact rating.",
    "destinations": [
      "AI-System-Governance-Assessment-Template.xlsx :: Impacts!I5 header → same column on exact selected draft impacts row (row identity required; not import-ready yet)"
    ],
    "key": "consequence",
    "hint": "Describe one potential positive or negative effect, including who/when/how; do not assign an impact rating. Keep missing parts Pending; fictional examples are not organization evidence.",
    "partial": "Pending: the responsible contributor needs to confirm potential consequence for this assessed state.",
    "groupId": "doc-assessment-impacts-potential-effect",
    "groupTitle": "Potential effect",
    "groupAudience": "Assigned assessor, relevant specialists and affected parties for their actual experience",
    "audience": "Assigned assessor, relevant specialists and affected parties for their actual experience",
    "profileId": "potential-impact"
  },
  {
    "id": "doc-assessment-impacts-uncertainty",
    "field": "impacts.uncertainty",
    "label": "Material uncertainty",
    "locator": "Impacts!M5",
    "question": "What is still uncertain about this potential effect?",
    "help": "Describe material knowledge, participation or evidence limits; do not assign an impact result. Keep missing parts Pending; fictional examples are not organization evidence.",
    "examples": [
      "The organization has not yet heard from customers who use accessible document formats, so it does not know whether incomplete scans affect those customers differently. The intake sample available at the 2026-07-31 cut-off does not include that group.",
      "The organization has not yet observed the Forecast Planner 1.4 pilot or consulted workers, including contractors, on each shift. It therefore does not know whether fewer unexpected schedule changes would benefit all shifts equally, or whether planners would rely on the forecasts enough to change the weekly schedule."
    ],
    "pendingExample": "Pending: the responsible contributor needs to confirm material uncertainty for this assessed state.",
    "mode": "fact",
    "condition": "Only the exact selected editable assessment and stable local row. Relevant expertise/responsibility is required; original assessed or issued history stays intact.",
    "expected": "Describe material knowledge, participation or evidence limits; do not assign an impact result.",
    "destinations": [
      "AI-System-Governance-Assessment-Template.xlsx :: Impacts!M5 header → same column on exact selected draft impacts row (row identity required; not import-ready yet)"
    ],
    "key": "uncertainty",
    "hint": "Describe material knowledge, participation or evidence limits; do not assign an impact result. Keep missing parts Pending; fictional examples are not organization evidence.",
    "partial": "Pending: the responsible contributor needs to confirm material uncertainty for this assessed state.",
    "groupId": "doc-assessment-impacts-impact-uncertainty",
    "groupTitle": "Impact uncertainty",
    "groupAudience": "Assigned assessor, relevant specialists and affected parties for their actual experience",
    "audience": "Assigned assessor, relevant specialists and affected parties for their actual experience",
    "profileId": "potential-impact"
  },
  {
    "id": "doc-assessment-risks-source",
    "field": "risks.source",
    "label": "Source or condition",
    "locator": "Risks!E5",
    "question": "What source or condition could create this risk or opportunity?",
    "help": "Give the cause/condition for this single scenario and displayed assessed state. Keep missing parts Pending; fictional examples are not organization evidence.",
    "examples": [
      "The organization relies on source documents that may be incomplete or out of date.",
      "The organization has newly available equipment data that could support earlier maintenance planning."
    ],
    "pendingExample": "Pending: the responsible contributor needs to confirm source or condition for this assessed state.",
    "mode": "draft",
    "condition": "Only the exact selected editable assessment and stable local row. Relevant expertise/responsibility is required; original assessed or issued history stays intact.",
    "expected": "Give the cause/condition for this single scenario and displayed assessed state.",
    "destinations": [
      "AI-System-Governance-Assessment-Template.xlsx :: Risks!E5 header → same column on exact selected draft risks row (row identity required; not import-ready yet)"
    ],
    "key": "source",
    "hint": "Give the cause/condition for this single scenario and displayed assessed state. Keep missing parts Pending; fictional examples are not organization evidence.",
    "partial": "Pending: the responsible contributor needs to confirm source or condition for this assessed state.",
    "groupId": "doc-assessment-risks-scenario",
    "groupTitle": "Scenario",
    "groupAudience": "Assigned risk assessor and the owners of relevant processes/measures",
    "audience": "Assigned risk assessor and the owners of relevant processes/measures",
    "profileId": "risk-scenario"
  },
  {
    "id": "doc-assessment-risks-event",
    "field": "risks.event",
    "label": "Event or uncertainty",
    "locator": "Risks!F5",
    "question": "What uncertain event could happen?",
    "help": "Describe one uncertain event/condition, not a risk score. Keep missing parts Pending; fictional examples are not organization evidence.",
    "examples": [
      "The organization identifies that staff may route a case to the wrong team after accepting an incorrect suggestion.",
      "The organization identifies that earlier warnings may let staff schedule checks before disruption occurs."
    ],
    "pendingExample": "Pending: the responsible contributor needs to confirm event or uncertainty for this assessed state.",
    "mode": "draft",
    "condition": "Only the exact selected editable assessment and stable local row. Relevant expertise/responsibility is required; original assessed or issued history stays intact.",
    "expected": "Describe one uncertain event/condition, not a risk score.",
    "destinations": [
      "AI-System-Governance-Assessment-Template.xlsx :: Risks!F5 header → same column on exact selected draft risks row (row identity required; not import-ready yet)"
    ],
    "key": "event",
    "hint": "Describe one uncertain event/condition, not a risk score. Keep missing parts Pending; fictional examples are not organization evidence.",
    "partial": "Pending: the responsible contributor needs to confirm event or uncertainty for this assessed state.",
    "groupId": "doc-assessment-risks-scenario",
    "groupTitle": "Scenario",
    "groupAudience": "Assigned risk assessor and the owners of relevant processes/measures",
    "audience": "Assigned risk assessor and the owners of relevant processes/measures",
    "profileId": "risk-scenario"
  },
  {
    "id": "doc-assessment-risks-affected",
    "field": "risks.affected",
    "label": "Affected objectives or parties",
    "locator": "Risks!G5",
    "question": "Who or what objective could be affected?",
    "help": "Name relevant objectives/parties and preserve the scenario boundary. Keep missing parts Pending; fictional examples are not organization evidence.",
    "examples": [
      "The organization identifies customers awaiting timely case handling and its service response objective.",
      "The organization identifies worker schedules and its continuity objective."
    ],
    "pendingExample": "Pending: the responsible contributor needs to confirm affected objectives or parties for this assessed state.",
    "mode": "fact",
    "condition": "Only the exact selected editable assessment and stable local row. Relevant expertise/responsibility is required; original assessed or issued history stays intact.",
    "expected": "Name relevant objectives/parties and preserve the scenario boundary.",
    "destinations": [
      "AI-System-Governance-Assessment-Template.xlsx :: Risks!G5 header → same column on exact selected draft risks row (row identity required; not import-ready yet)"
    ],
    "key": "affected",
    "hint": "Name relevant objectives/parties and preserve the scenario boundary. Keep missing parts Pending; fictional examples are not organization evidence.",
    "partial": "Pending: the responsible contributor needs to confirm affected objectives or parties for this assessed state.",
    "groupId": "doc-assessment-risks-scenario",
    "groupTitle": "Scenario",
    "groupAudience": "Assigned risk assessor and the owners of relevant processes/measures",
    "audience": "Assigned risk assessor and the owners of relevant processes/measures",
    "profileId": "risk-scenario"
  },
  {
    "id": "doc-assessment-risks-consequence",
    "field": "risks.consequence",
    "label": "Consequence or benefit",
    "locator": "Risks!H5",
    "question": "What harm or benefit could follow?",
    "help": "Describe the consequence/benefit if the scenario occurs; no method-owned rating. Keep missing parts Pending; fictional examples are not organization evidence.",
    "examples": [
      "The organization identifies delays and additional work caused by incorrect routing.",
      "The organization identifies reduced disruption if inspections can be planned earlier."
    ],
    "pendingExample": "Pending: the responsible contributor needs to confirm consequence or benefit for this assessed state.",
    "mode": "draft",
    "condition": "Only the exact selected editable assessment and stable local row. Relevant expertise/responsibility is required; original assessed or issued history stays intact.",
    "expected": "Describe the consequence/benefit if the scenario occurs; no method-owned rating.",
    "destinations": [
      "AI-System-Governance-Assessment-Template.xlsx :: Risks!H5 header → same column on exact selected draft risks row (row identity required; not import-ready yet)"
    ],
    "key": "consequence",
    "hint": "Describe the consequence/benefit if the scenario occurs; no method-owned rating. Keep missing parts Pending; fictional examples are not organization evidence.",
    "partial": "Pending: the responsible contributor needs to confirm consequence or benefit for this assessed state.",
    "groupId": "doc-assessment-risks-consequence-and-measures",
    "groupTitle": "Consequence and measures",
    "groupAudience": "Assigned risk assessor and the owners of relevant processes/measures",
    "audience": "Assigned risk assessor and the owners of relevant processes/measures",
    "profileId": "risk-scenario"
  },
  {
    "id": "doc-assessment-risks-existing_measures",
    "field": "risks.existing_measures",
    "label": "Existing measures",
    "locator": "Risks!L5",
    "question": "What measures already operate for this scenario?",
    "help": "Describe actual current steps/controls and their evidence or known limits; planned measures are not implemented measures. Keep missing parts Pending; fictional examples are not organization evidence.",
    "examples": [
      "The organization’s staff check source documents before choosing a queue under Staff Review Procedure version 1.2. Quality Review Log QL-2026-09 retains sampled checks. The sample does not cover all cases or peak workload, limiting actual coverage.",
      "The organization’s maintenance lead compares forecasts with inspections monthly; report MR-2026-09 retains results for this model. Rare conditions and the proposed site are outside the sample."
    ],
    "pendingExample": "Pending: the responsible contributor needs to confirm existing measures for this assessed state.",
    "mode": "fact",
    "condition": "Only the exact selected editable assessment and stable local row. Relevant expertise/responsibility is required; original assessed or issued history stays intact.",
    "expected": "Describe actual current steps/controls and their evidence or known limits; planned measures are not implemented measures.",
    "destinations": [
      "AI-System-Governance-Assessment-Template.xlsx :: Risks!L5 header → same column on exact selected draft risks row (row identity required; not import-ready yet)"
    ],
    "key": "existing_measures",
    "hint": "Describe actual current steps/controls and their evidence or known limits; planned measures are not implemented measures. Keep missing parts Pending; fictional examples are not organization evidence.",
    "partial": "Pending: the responsible contributor needs to confirm existing measures for this assessed state.",
    "groupId": "doc-assessment-risks-consequence-and-measures",
    "groupTitle": "Consequence and measures",
    "groupAudience": "Assigned risk assessor and the owners of relevant processes/measures",
    "audience": "Assigned risk assessor and the owners of relevant processes/measures",
    "profileId": "risk-scenario"
  },
  {
    "id": "doc-assessment-risks-response",
    "field": "risks.response",
    "label": "Proposed response",
    "locator": "Risks!M5",
    "question": "What response is proposed for this scenario?",
    "help": "State proposed work, rationale and dependencies; treatment approval and residual-risk disposition stay separate. Keep missing parts Pending; fictional examples are not organization evidence.",
    "examples": [
      "The organization proposes checking low-quality scans and retaining corrections because unclear text contributes to wrong routing. It depends on staff training, a quality signal and review time. Implementation, approval and residual-risk disposition are Pending.",
      "The organization proposes a bounded new-site pilot and validation of rare conditions because tests cover one site only. It depends on representative data, competent reviewers and rollback. Approval and verified benefit remain Pending."
    ],
    "pendingExample": "Pending: the responsible contributor needs to confirm proposed response for this assessed state.",
    "mode": "draft",
    "condition": "Only the exact selected editable assessment and stable local row. Relevant expertise/responsibility is required; original assessed or issued history stays intact.",
    "expected": "State proposed work, rationale and dependencies; treatment approval and residual-risk disposition stay separate.",
    "destinations": [
      "AI-System-Governance-Assessment-Template.xlsx :: Risks!M5 header → same column on exact selected draft risks row (row identity required; not import-ready yet)"
    ],
    "key": "response",
    "hint": "State proposed work, rationale and dependencies; treatment approval and residual-risk disposition stay separate. Keep missing parts Pending; fictional examples are not organization evidence.",
    "partial": "Pending: the responsible contributor needs to confirm proposed response for this assessed state.",
    "groupId": "doc-assessment-risks-consequence-and-measures",
    "groupTitle": "Consequence and measures",
    "groupAudience": "Assigned risk assessor and the owners of relevant processes/measures",
    "audience": "Assigned risk assessor and the owners of relevant processes/measures",
    "profileId": "risk-scenario"
  },
  {
    "id": "doc-assessment-risks-uncertainty",
    "field": "risks.uncertainty",
    "label": "Material uncertainty",
    "locator": "Risks!R5",
    "question": "What important uncertainty remains in this scenario?",
    "help": "Describe limits material to evidence, analysis or response assumptions; do not choose initial/projected/verified results. Keep missing parts Pending; fictional examples are not organization evidence.",
    "examples": [
      "The organization has only a small sample of errors, so their operating frequency is uncertain.",
      "The organization has not tested the proposed response at peak workload, so its benefit remains uncertain."
    ],
    "pendingExample": "Pending: the responsible contributor needs to confirm material uncertainty for this assessed state.",
    "mode": "fact",
    "condition": "Only the exact selected editable assessment and stable local row. Relevant expertise/responsibility is required; original assessed or issued history stays intact.",
    "expected": "Describe limits material to evidence, analysis or response assumptions; do not choose initial/projected/verified results.",
    "destinations": [
      "AI-System-Governance-Assessment-Template.xlsx :: Risks!R5 header → same column on exact selected draft risks row (row identity required; not import-ready yet)"
    ],
    "key": "uncertainty",
    "hint": "Describe limits material to evidence, analysis or response assumptions; do not choose initial/projected/verified results. Keep missing parts Pending; fictional examples are not organization evidence.",
    "partial": "Pending: the responsible contributor needs to confirm material uncertainty for this assessed state.",
    "groupId": "doc-assessment-risks-scenario-uncertainty",
    "groupTitle": "Scenario uncertainty",
    "groupAudience": "Assigned risk assessor and the owners of relevant processes/measures",
    "audience": "Assigned risk assessor and the owners of relevant processes/measures",
    "profileId": "risk-scenario"
  },
  {
    "id": "doc-assessment-evidence-locator",
    "field": "evidence.locator",
    "label": "Evidence locator",
    "locator": "Evidence!E5",
    "question": "Where exactly in the selected artifact is the relevant information?",
    "help": "Give section/page/test/log/sample locator inside the already selected Record; do not create an ID. Keep missing parts Pending; fictional examples are not organization evidence.",
    "examples": [
      "The organization points to section 4.2 and cases 12–18 of the already selected report REC-TEST-001 version 1.1; those contain scan-quality results.",
      "The organization points to July sample rows 30–42 in the already selected log REC-LOG-001 export 2026-08-01; they relate to the displayed operating claim."
    ],
    "pendingExample": "Pending: the responsible contributor needs to confirm evidence locator for this assessed state.",
    "mode": "fact",
    "condition": "Only the exact selected editable assessment and stable local row. Relevant expertise/responsibility is required; original assessed or issued history stays intact.",
    "expected": "Give section/page/test/log/sample locator inside the already selected Record; do not create an ID.",
    "destinations": [
      "AI-System-Governance-Assessment-Template.xlsx :: Evidence!E5 header → same column on exact selected draft evidence row (row identity required; not import-ready yet)"
    ],
    "key": "locator",
    "hint": "Give section/page/test/log/sample locator inside the already selected Record; do not create an ID. Keep missing parts Pending; fictional examples are not organization evidence.",
    "partial": "Pending: the responsible contributor needs to confirm evidence locator for this assessed state.",
    "groupId": "doc-assessment-evidence-source-location-and-period",
    "groupTitle": "Source location and period",
    "groupAudience": "Assigned evidence reviewer and the exact artifact owner/custodian",
    "audience": "Assigned evidence reviewer and the exact artifact owner/custodian",
    "profileId": "evidence-use"
  },
  {
    "id": "doc-assessment-evidence-period",
    "field": "evidence.period",
    "label": "Evidence period",
    "locator": "Evidence!F5",
    "question": "Which period or date does that information actually cover?",
    "help": "State the operating/sample window or effective date as text, separately from artifact version. If unknown, write Pending in this same answer box. Keep missing parts Pending; fictional examples are not organization evidence.",
    "examples": [
      "The organization’s sample covers operating activity from 2026-07-01 to 2026-07-31.",
      "The organization’s procedure describes the design effective on 2026-08-15; it does not represent an observed operating period."
    ],
    "pendingExample": "Pending: the responsible contributor needs to confirm evidence period for this assessed state.",
    "mode": "fact",
    "condition": "Only the exact selected editable assessment and stable local row. Relevant expertise/responsibility is required; original assessed or issued history stays intact.",
    "expected": "State the operating/sample window or effective date as text, separately from artifact version. If unknown, write Pending in this same answer box.",
    "destinations": [
      "AI-System-Governance-Assessment-Template.xlsx :: Evidence!F5 header → same column on exact selected draft evidence row (row identity required; not import-ready yet)"
    ],
    "key": "period",
    "hint": "State the operating/sample window or effective date as text, separately from artifact version. If unknown, write Pending in this same answer box. Keep missing parts Pending; fictional examples are not organization evidence.",
    "partial": "Pending: the responsible contributor needs to confirm evidence period for this assessed state.",
    "groupId": "doc-assessment-evidence-source-location-and-period",
    "groupTitle": "Source location and period",
    "groupAudience": "Assigned evidence reviewer and the exact artifact owner/custodian",
    "audience": "Assigned evidence reviewer and the exact artifact owner/custodian",
    "profileId": "evidence-use"
  },
  {
    "id": "doc-assessment-evidence-limitation",
    "field": "evidence.limitation",
    "label": "Material limitation",
    "locator": "Evidence!J5",
    "question": "What limits use of this evidence for the displayed claim?",
    "help": "Describe scope/quality/recency/independence/provenance/access limits; do not decide overall sufficiency. Keep missing parts Pending; fictional examples are not organization evidence.",
    "examples": [
      "The organization’s report covers one site and a small sample, so it does not represent every location.",
      "The organization’s source is a design description without underlying tests, limiting conclusions about actual operation."
    ],
    "pendingExample": "Pending: the responsible contributor needs to confirm material limitation for this assessed state.",
    "mode": "fact",
    "condition": "Only the exact selected editable assessment and stable local row. Relevant expertise/responsibility is required; original assessed or issued history stays intact.",
    "expected": "Describe scope/quality/recency/independence/provenance/access limits; do not decide overall sufficiency.",
    "destinations": [
      "AI-System-Governance-Assessment-Template.xlsx :: Evidence!J5 header → same column on exact selected draft evidence row (row identity required; not import-ready yet)"
    ],
    "key": "limitation",
    "hint": "Describe scope/quality/recency/independence/provenance/access limits; do not decide overall sufficiency. Keep missing parts Pending; fictional examples are not organization evidence.",
    "partial": "Pending: the responsible contributor needs to confirm material limitation for this assessed state.",
    "groupId": "doc-assessment-evidence-source-access-and-limits",
    "groupTitle": "Source access and limits",
    "groupAudience": "Assigned evidence reviewer and the exact artifact owner/custodian",
    "audience": "Assigned evidence reviewer and the exact artifact owner/custodian",
    "profileId": "evidence-use"
  },
  {
    "id": "doc-assessment-evidence-access",
    "field": "evidence.access",
    "label": "Access at review",
    "locator": "Evidence!K5",
    "question": "What could the reviewer actually access at review time?",
    "help": "Answer Available, Partly available, Unavailable or Not checked from observed access. If unknown, write Pending with a reason in this same box; importer leaves the choice cell unchanged/blank. Keep missing parts Pending; fictional examples are not organization evidence. Fictional context for Available: the organization’s reviewer retrieved the full report and sample. For Partly available: the reviewer saw the summary but could not retrieve raw logs.",
    "examples": [
      "Available",
      "Partly available"
    ],
    "pendingExample": "Pending: the responsible contributor needs to confirm access at review for this assessed state.",
    "mode": "fact",
    "condition": "Only the exact selected editable assessment and stable local row. Relevant expertise/responsibility is required; original assessed or issued history stays intact. A sentence or Pending reply remains for operator review and does not populate this controlled choice.",
    "expected": "Answer Available, Partly available, Unavailable or Not checked from observed access. If unknown, write Pending with a reason in this same box.",
    "destinations": [
      "AI-System-Governance-Assessment-Template.xlsx :: Evidence!K5 header → same column on exact selected draft evidence row (row identity required; not import-ready yet)"
    ],
    "key": "access",
    "hint": "Answer Available, Partly available, Unavailable or Not checked from observed access. If unknown, write Pending with a reason in this same box; importer leaves the choice cell unchanged/blank. Keep missing parts Pending; fictional examples are not organization evidence. Fictional context for Available: the organization’s reviewer retrieved the full report and sample. For Partly available: the reviewer saw the summary but could not retrieve raw logs.",
    "partial": "Pending: the responsible contributor needs to confirm access at review for this assessed state.",
    "groupId": "doc-assessment-evidence-source-access-and-limits",
    "groupTitle": "Source access and limits",
    "groupAudience": "Assigned evidence reviewer and the exact artifact owner/custodian",
    "audience": "Assigned evidence reviewer and the exact artifact owner/custodian",
    "profileId": "evidence-use"
  }
]);
const groups=freeze([
  {
    "id": "doc-assessment-summary-assessment-context",
    "title": "Assessment context",
    "audience": "Assessment lead and responsible system/process owner",
    "unit": "summary",
    "profileId": "assessment-context",
    "keys": [
      "scope",
      "trigger_details",
      "assessed_state"
    ]
  },
  {
    "id": "doc-assessment-elements-component-identity",
    "title": "Component identity",
    "audience": "Responsible component team or actual human-role contributor",
    "unit": "elements",
    "profileId": "system-element",
    "keys": [
      "name",
      "version",
      "role"
    ]
  },
  {
    "id": "doc-assessment-elements-component-characteristics",
    "title": "Component characteristics",
    "audience": "Responsible component team or actual human-role contributor",
    "unit": "elements",
    "profileId": "system-element",
    "keys": [
      "characteristics",
      "dependency"
    ]
  },
  {
    "id": "doc-assessment-review-uncertainty-for-this-check",
    "title": "Uncertainty for this check",
    "audience": "Assigned competent reviewer and relevant fact contributors for this exact criterion",
    "unit": "review",
    "profileId": "review-uncertainty",
    "keys": [
      "uncertainty"
    ]
  },
  {
    "id": "doc-assessment-impacts-potential-effect",
    "title": "Potential effect",
    "audience": "Assigned assessor, relevant specialists and affected parties for their actual experience",
    "unit": "impacts",
    "profileId": "potential-impact",
    "keys": [
      "affected_party",
      "source",
      "consequence"
    ]
  },
  {
    "id": "doc-assessment-impacts-impact-uncertainty",
    "title": "Impact uncertainty",
    "audience": "Assigned assessor, relevant specialists and affected parties for their actual experience",
    "unit": "impacts",
    "profileId": "potential-impact",
    "keys": [
      "uncertainty"
    ]
  },
  {
    "id": "doc-assessment-risks-scenario",
    "title": "Scenario",
    "audience": "Assigned risk assessor and the owners of relevant processes/measures",
    "unit": "risks",
    "profileId": "risk-scenario",
    "keys": [
      "source",
      "event",
      "affected"
    ]
  },
  {
    "id": "doc-assessment-risks-consequence-and-measures",
    "title": "Consequence and measures",
    "audience": "Assigned risk assessor and the owners of relevant processes/measures",
    "unit": "risks",
    "profileId": "risk-scenario",
    "keys": [
      "consequence",
      "existing_measures",
      "response"
    ]
  },
  {
    "id": "doc-assessment-risks-scenario-uncertainty",
    "title": "Scenario uncertainty",
    "audience": "Assigned risk assessor and the owners of relevant processes/measures",
    "unit": "risks",
    "profileId": "risk-scenario",
    "keys": [
      "uncertainty"
    ]
  },
  {
    "id": "doc-assessment-evidence-source-location-and-period",
    "title": "Source location and period",
    "audience": "Assigned evidence reviewer and the exact artifact owner/custodian",
    "unit": "evidence",
    "profileId": "evidence-use",
    "keys": [
      "locator",
      "period"
    ]
  },
  {
    "id": "doc-assessment-evidence-source-access-and-limits",
    "title": "Source access and limits",
    "audience": "Assigned evidence reviewer and the exact artifact owner/custodian",
    "unit": "evidence",
    "profileId": "evidence-use",
    "keys": [
      "limitation",
      "access"
    ]
  }
]);
const definitions=freeze([
 {id:'assessment-context',unit:'summary',keys:['scope','trigger_details','assessed_state']},
 {id:'system-element',unit:'elements',keys:['name','version','role','characteristics','dependency']},
 {id:'review-uncertainty',unit:'review',keys:['uncertainty']},
 {id:'potential-impact',unit:'impacts',keys:['affected_party','source','consequence','uncertainty']},
 {id:'risk-scenario',unit:'risks',keys:['source','event','affected','consequence','existing_measures','response','uncertainty']},
 {id:'evidence-use',unit:'evidence',keys:['locator','period','limitation','access']}
]);
const profiles=freeze(definitions.map(p=>({...p,label:A.labels[p.unit],recipe:RECIPE,catalog:catalog.filter(q=>q.profileId===p.id),groups:groups.filter(g=>g.profileId===p.id)})));
const clone=v=>v==null?v:JSON.parse(JSON.stringify(v)),own=(v,k)=>Object.prototype.hasOwnProperty.call(v,k),plain=v=>v!==null&&typeof v==='object'&&!Array.isArray(v),exact=(v,keys)=>plain(v)&&Object.keys(v).length===keys.length&&keys.every(k=>own(v,k)),same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const routingKeys=freeze(['lead','responsible_party','reviewer','assessor']),localTypes=freeze({'System element':'elements','Review item':'review',Impact:'impacts','Risk or opportunity':'risks'});
const summaryKeys=freeze(['scope','assessed_state','evidence_cutoff','baseline_record_id','method_record_id','trigger','trigger_details','assessment_date']),recordKeys=H.recordKeys,inventoryKeys=H.inventoryKeys,captureKeys=H.captureKeys;
const systemCaptureKeys=freeze(['system_id','name','intended_purpose','business_process','date_identified','scope_status','scope_basis','organization_role','lifecycle_route','lifecycle_state','system_owner','baseline_record_id','assessment_record_id','governing_decision_id','last_reviewed','next_review_date','review_trigger']);
const rowKeys=freeze({summary:[],elements:['id','type','version'],review:['id','topic','criterion_type','criterion_id','criterion_locator','question','scope','element_id','applicability','applicability_rationale','evaluation_level','result','result_rationale','review_date'],impacts:['id','direction','affected_level','context','element_id','review_id','criteria_locator','result','result_rationale','handoff','risk_id','handoff_rationale','assessment_date'],risks:['id','type','origin_type','origin_id','criteria_locator','initial_result','initial_rationale','projected_result','projected_rationale','verified_result','verified_rationale','assessment_date'],evidence:['id','item_type','item_id','record_id','claim','result','rationale','review_date']});
const slotKeys=freeze({summary:[],elements:[],review:['element'],impacts:['element','review'],risks:['origin'],evidence:['item']});
function fail(message,field='',code='owner-assessment-units-invalid'){throw Object.assign(Error(message),{field,code});}
function text(v,field='context'){return T.checkText(v,{kind:'Assessment owner input',id:'saved request',field});}
const rawText=H.rawText;
function id(v,field='identity'){text(v,field);if(!v||v!==v.trim()||/[\r\n\t]/.test(v))fail('Use the exact saved '+field+' without surrounding spaces or line breaks.',field);return v;}
function integer(v,max=Number.MAX_SAFE_INTEGER,min=0){if(!Number.isSafeInteger(v)||v<min||v>max)fail('Unsupported Assessment context revision.');}
function profileFor(q){const key=typeof q==='string'?q:q?.profile_id||q?.id,unit=q?.target?.unit||q?.unit;const p=profiles.find(p=>p.id===key)||(!key&&profiles.find(p=>p.unit===unit));if(!p||unit&&p.unit!==unit||q?.recipe&&q.recipe!==RECIPE)fail('Unsupported Assessment selected-unit owner profile.');return p;}
function checkTarget(t){if(!exact(t,['kind','record_id','unit','row_id'])||t.kind!=='assessment'||!definitions.some(p=>p.unit===t.unit))fail('Unsupported Assessment selected-unit answer destination.');id(t.record_id,'Assessment Record ID');if(t.unit==='summary'){if(t.row_id!=='')fail('Summary questions require the singleton Assessment destination.');}else id(t.row_id,'local row ID');return t;}
function profileForSelection(q,keys,{context}={}){const p=profileFor(q);if(!Array.isArray(keys)||!keys.length||new Set(keys).size!==keys.length||!same(keys,p.keys.filter(k=>keys.includes(k))))fail('Choose a canonical nonempty subset of this Assessment row’s questions.');const c=context||q?.subject_context;if(p.unit==='summary'&&keys.includes('trigger_details')&&c&&c.summary.trigger!=='Other')fail('Trigger details questions apply only when this Assessment trigger is Other.','trigger_details');return p;}
function entry(w,target){checkTarget(target);const e=B.find(w,target.record_id);if(!e||e.deleted_at)fail('The selected Assessment is missing or deleted. Restore its exact saved body before using these answers.','','owner-subject');return e;}
function currentRow(w,target){const e=entry(w,target),r=B.getUnit(e,target.unit,target.row_id);if(!r||r.deleted_at)fail('The selected saved Assessment row is missing or deleted. Restore that exact row before using these answers.','','owner-subject');return {revision:e.revision,unit_revision:r.revision,record_id:e.record_id,system_id:e.system_id,values:clone(r.values)};}
const targetTuple=q=>[q.target.kind,q.target.record_id,q.target.unit,q.target.row_id];
const targetField=unit=>({review:'criterion_id',impacts:'risk_id',risks:'id',evidence:'record_id'})[unit];
const contributorField=unit=>({summary:'lead',elements:'responsible_party',review:'reviewer',impacts:'assessor',risks:'assessor',evidence:'reviewer'})[unit];
const localValueKeys=unit=>A.fields[unit].map(f=>f.key).filter(k=>!routingKeys.includes(k));
// Profile inventory is a native capture owner, not an editable profile value.
const captureOrder=unit=>unit==='profile'?['inventory']:A.fields[unit].map(f=>f.key);
function orderedCapture(c){if(!c)return null;const valueKeys=c.target_sheet==='systems'?(exact(c.values,H.inventoryProjection)?H.inventoryProjection:systemCaptureKeys):R.fields[c.target_sheet]?.map(([k])=>k);return Object.fromEntries(captureKeys.map(k=>[k,k==='values'?Object.fromEntries((valueKeys||Object.keys(c.values)).map(field=>[field,c.values[field]])):c[k]]));}
function source(w,e,unit,itemId,singleton=false){if(!unit||!itemId&&!singleton)return null;const rowId=singleton?'':itemId,row=singleton&&itemId!==e.record_id?null:B.getUnit(e,unit,rowId);return {unit,row_id:rowId,status:!row?'missing':row.deleted_at?'deleted':'found',unit_revision:row?.revision??null,values:row?Object.fromEntries(localValueKeys(unit).map(k=>[k,row.values[k]])):{},captures:row?e.captures.filter(c=>c.unit===unit&&c.row_id===rowId).sort((a,b)=>captureOrder(unit).indexOf(a.field)-captureOrder(unit).indexOf(b.field)).map(orderedCapture):[]};}
function sourceSpecs(unit,v){if(unit==='review')return [['element',v.scope==='System element'?'elements':null,v.element_id,false]];if(unit==='impacts')return [['element','elements',v.element_id,false],['review','review',v.review_id,false]];if(unit==='risks')return [['origin',localTypes[v.origin_type]||null,v.origin_id,false]];if(unit==='evidence'){const singleton={'System profile':'profile','Assessment conclusion':'summary'}[v.item_type];return [['item',singleton||localTypes[v.item_type]||null,v.item_id,!!singleton]];}return [];}
function subjectContext(w,target){const e=entry(w,target),r=currentRow(w,target),record=w.references.records.find(r=>r.values.id===e.record_id),p=profileFor(target),v=r.values,get=(unit,rowId,field)=>e.captures.find(c=>c.unit===unit&&c.row_id===rowId&&c.field===field)||null;if(!record)fail('The owning Assessment Record is missing. Restore it in Records.','','owner-subject');return {system_id:e.system_id,unit_revision:r.unit_revision,record:Object.fromEntries(recordKeys.map(k=>[k,k==='revision'?record.revision:record.values[k]])),summary:Object.fromEntries(summaryKeys.map(k=>[k,e.summary.values[k]])),inventory:Object.fromEntries(inventoryKeys.map(k=>[k,e.profile.values[k]])),captures:{inventory:(()=>{const c=orderedCapture(get('profile','','inventory'));if(c)c.values=Object.fromEntries(H.inventoryProjection.map(k=>[k,c.values[k]]));return c;})(),baseline:orderedCapture(get('summary','','baseline_record_id')),method:orderedCapture(get('summary','','method_record_id')),target:orderedCapture(targetField(p.unit)?get(p.unit,target.row_id,targetField(p.unit)):null)},row_context:Object.fromEntries(rowKeys[p.unit].map(k=>[k,v[k]])),local_sources:Object.fromEntries(sourceSpecs(p.unit,v).map(([slot,u,id,singleton])=>[slot,source(w,e,u,id,singleton)])),routing:{lead:e.summary.values.lead,contributor:v[contributorField(p.unit)]}};}
function checkCapture(c,{unit,rowId,field,sheet,id:targetId,max}){if(c===null)return;if(!exact(c,captureKeys)||c.unit!==unit||c.row_id!==rowId||c.field!==field||c.target_sheet!==sheet||c.target_id!==targetId||!plain(c.values)||!targetId)fail('The retained capture differs from its exact Assessment address.');integer(c.target_revision,max);if(typeof c.captured_at!=='string'||!Number.isFinite(Date.parse(c.captured_at)))fail('Unsupported retained Assessment capture time.');id(c.target_id,'captured source ID');const fields=sheet==='systems'?['system_id',...inventoryKeys]:R.fields[sheet]?.map(([k])=>k);if(!fields||!(exact(c.values,fields)||sheet==='systems'&&exact(c.values,systemCaptureKeys))||c.values[sheet==='systems'?'system_id':'id']!==targetId)fail('The retained capture source projection is malformed.');Object.entries(c.values).forEach(([k,v])=>text(v,k));}
function captureSpec(unit,rowId,field,values,systemId){if(field==='inventory'&&unit==='profile')return {unit,rowId,field,sheet:'systems',id:systemId};const t=B.targets(unit,values).find(t=>t.field===field);if(!t)fail('The native capture has no exact saved pointer.');return {unit,rowId,field,sheet:t.sheet,id:t.id};}
function checkContext(c,q,max=Number.MAX_SAFE_INTEGER,{live=false}={}){const p=profileFor(q);if(!exact(c,['system_id','unit_revision','record','summary','inventory','captures','row_context','local_sources','routing'])||!exact(c.record,recordKeys)||!exact(c.summary,summaryKeys)||!exact(c.inventory,inventoryKeys)||!exact(c.captures,['inventory','baseline','method','target'])||!exact(c.row_context,rowKeys[p.unit])||!exact(c.local_sources,slotKeys[p.unit])||!exact(c.routing,['lead','contributor']))fail('Unsupported saved selected-unit Assessment context.');id(c.system_id,'AI System ID');integer(c.unit_revision,max);integer(c.record.revision,max,1);recordKeys.filter(k=>k!=='revision').forEach(k=>text(c.record[k],k));summaryKeys.forEach(k=>text(c.summary[k],k));inventoryKeys.forEach(k=>text(c.inventory[k],k));Object.entries(c.row_context).forEach(([k,v])=>text(v,k));Object.values(c.routing).forEach(v=>text(v,'attribution'));for(const k of ['assessment_date','evidence_cutoff'])if(c.summary[k]&&!B.validDate(c.summary[k]))fail('The saved Assessment date must retain its real YYYY-MM-DD value.',k);if(!live&&(c.record.type!=='Assessment'||c.record.subject_type!=='AI system'||c.record.subject_id!==c.system_id||!B.editable.includes(c.record.lifecycle)))fail('The request must name the exact editable Assessment Record and System.');
 for(const [slot,unit,field,sheet,targetId]of [['inventory','profile','inventory','systems',c.system_id],['baseline','summary','baseline_record_id','records',c.summary.baseline_record_id],['method','summary','method_record_id','records',c.summary.method_record_id]])checkCapture(c.captures[slot],{unit,rowId:'',field,sheet,id:targetId,max});
 const targetValues={...A.blank(p.unit),...c.row_context};if(p.unit==='summary')Object.assign(targetValues,c.summary,{assessment_record_id:q.target.record_id,system_id:c.system_id});if(c.captures.target!==null){const field=targetField(p.unit);if(!field)fail('This unit cannot carry a selected source capture.');checkCapture(c.captures.target,{...captureSpec(p.unit,q.target.row_id,field,targetValues,c.system_id),max});}
 if(p.unit!=='summary'&&c.row_context.id!==q.target.row_id)fail('The saved context row identity differs from its destination.');
 for(const [slot,u,itemId,singleton]of sourceSpecs(p.unit,targetValues)){const d=c.local_sources[slot];if(!u||!itemId&&!singleton){if(d!==null)fail('An inapplicable local source must be omitted.');continue;}if(d===null)fail('The selected local source status is missing.');if(!exact(d,['unit','row_id','status','unit_revision','values','captures'])||d.unit!==u||d.row_id!==(singleton?'':itemId)||!['found','deleted','missing'].includes(d.status)||!Array.isArray(d.captures))fail('The local source differs from its exact typed Assessment address.');if(singleton&&itemId!==q.target.record_id&&d.status!=='missing')fail('A singleton evidence item must use this exact Assessment Record ID.');if(d.status==='missing'){if(d.unit_revision!==null||!exact(d.values,[])||d.captures.length)fail('A missing local source cannot carry invented content.');continue;}integer(d.unit_revision,max);if(!exact(d.values,localValueKeys(u)))fail('Local source semantic fields differ from their native unit.');localValueKeys(u).forEach(k=>text(d.values[k],k));if(A.tables.includes(u)&&d.values.id!==d.row_id)fail('A local source ID differs from its saved row.');const seen=new Set(),order=captureOrder(u);let prior=-1;for(const cap of d.captures){const i=order.indexOf(cap.field);if(i<=prior||seen.has(cap.field))fail('Local source captures are duplicated or out of native order.');seen.add(cap.field);prior=i;checkCapture(cap,{...captureSpec(u,d.row_id,cap.field,d.values,c.system_id),max});}}
 return c;}
function eligibility(w,target){try{const e=entry(w,target);B.writable(w,e);currentRow(w,target);checkContext(subjectContext(w,target),{target},w.revision);return '';}catch(e){return e.message;}}
function canonicalContext(q,options={}){const c=q.subject_context;checkContext(c,q,Number.MAX_SAFE_INTEGER,options);return {system_id:c.system_id,unit_revision:c.unit_revision,record:Object.fromEntries(recordKeys.map(k=>[k,c.record[k]])),summary:Object.fromEntries(summaryKeys.map(k=>[k,c.summary[k]])),inventory:Object.fromEntries(inventoryKeys.map(k=>[k,c.inventory[k]])),captures:Object.fromEntries(['inventory','baseline','method','target'].map(k=>[k,orderedCapture(c.captures[k])])),row_context:Object.fromEntries(rowKeys[profileFor(q).unit].map(k=>[k,c.row_context[k]])),local_sources:Object.fromEntries(slotKeys[profileFor(q).unit].map(k=>{const d=c.local_sources[k];return [k,d===null?null:{unit:d.unit,row_id:d.row_id,status:d.status,unit_revision:d.unit_revision,values:Object.fromEntries((d.status==='missing'?[]:localValueKeys(d.unit)).map(k=>[k,d.values[k]])),captures:d.captures.map(orderedCapture)}];})),routing:{lead:c.routing.lead,contributor:c.routing.contributor}};}
function trackedKeys(q){const p=profileFor(q);return p.unit==='summary'?['scope','trigger_details','assessed_state']:p.unit==='elements'?['version']:[];}
function tracked(c,q){const unit=profileFor(q).unit;return Object.fromEntries(trackedKeys(q).map(k=>[k,unit==='summary'?c.summary[k]:c.row_context[k]]));}
function withTracked(q,values){const next=clone(q);for(const k of trackedKeys(q)){if(profileFor(q).unit==='summary')next.subject_context.summary[k]=values[k];else next.subject_context.row_context[k]=values[k];}return next;}
function meaningPayload(q,options={}){checkTarget(q.target);const c=canonicalContext(q,options),summary=clone(c.summary),row=clone(c.row_context);if(options.family)for(const k of trackedKeys(q))delete(profileFor(q).unit==='summary'?summary:row)[k];const locals=Object.fromEntries(Object.entries(c.local_sources).map(([k,d])=>[k,d===null?null:{unit:d.unit,row_id:d.row_id,status:d.status,values:d.values,captures:d.captures}]));return [options.family?'owner-assessment-units-family-v1':'owner-assessment-units-meaning-v1',q.workspace_id,targetTuple(q),RECIPE,profileFor(q).id,Object.fromEntries(recordKeys.filter(k=>k!=='revision').map(k=>[k,c.record[k]])),c.system_id,summary,c.inventory,c.captures,row,locals];}
function project(q,key,raw,current=''){try{const p=profileFor(q);if(!p.keys.includes(key))fail('This answer is outside the selected Assessment row.');rawText(raw,key);const value=raw.trim(),kind=/^(?:unknown|not known)$/i.test(value)?'pending':H.project({profile_id:H.PROFILE},H.keys[0],raw,current).kind;if(['blank','pending'].includes(kind))return {eligible:false,kind,status:kind==='blank'?'No answer yet':'Pending',message:'Keep this question unfinished; its saved Assessment value stays as it is.'};if(kind==='mixed')return {eligible:false,kind,status:'Partly answered',message:'Edit to save the usable part. The Pending note stays with the original reply for follow-up.'};text(value,key);if(p.unit==='evidence'&&key==='access'&&!A.fields.evidence.find(f=>f.key==='access').options.includes(value))fail('Choose Available, Partly available, Unavailable or Not checked. The original reply stays in history.','access','owner-assessment-access');return {eligible:true,kind:'answer',status:value===current?'Already matches':'Ready to use',value,matching:value===current,message:''};}catch(e){return {eligible:false,kind:'invalid',status:'Needs editing',message:e.message};}}
function contextLines(q){const c=q.subject_context,p=profileFor(q),shown=v=>v.trim()?v:'Not recorded',lines=[];if(q.organization_label?.trim())lines.push(['Organization',q.organization_label]);lines.push(['Assessment Record ID',q.target.record_id],['Assessment version',shown(c.record.version)],['Assessment title',shown(c.record.title)],['AI System ID',c.system_id],['Assessment section',A.labels[p.unit]],['Selected local row ID',q.target.row_id||'Summary'],['Scope',shown(c.summary.scope)],['Setup being assessed',shown(c.summary.assessed_state)],['Evidence cut-off',shown(c.summary.evidence_cutoff)],['Trigger',shown(c.summary.trigger)],['Trigger details',shown(c.summary.trigger_details)],['Assessment date',shown(c.summary.assessment_date)]);for(const [slot,label,idField]of [['baseline','Baseline','baseline_record_id'],['method','Method','method_record_id']]){const cap=c.captures[slot];lines.push([label+' Record ID',shown(c.summary[idField])],[label+' retained title',shown(cap?.values.title||'')],[label+' retained version',shown(cap?.values.version||'')],[label+' capture',cap?'Captured revision '+cap.target_revision+' · '+cap.captured_at:'No retained source metadata']);}lines.push(['Assessment lead',shown(c.routing.lead)],['Responsible contributor',shown(c.routing.contributor)],['','Already included from the saved Assessment profile']);inventoryKeys.forEach(k=>lines.push([A.fields.profile.find(f=>f.key===k).label,shown(c.inventory[k])]));for(const [k,v]of Object.entries(c.row_context))lines.push([A.fields[p.unit].find(f=>f.key===k).label,shown(v)]);const cap=c.captures.target;if(cap){lines.push(['Retained source ID',cap.target_id]);if(own(cap.values,'title')||own(cap.values,'name'))lines.push(['Retained source title',shown(own(cap.values,'title')?cap.values.title:cap.values.name)]);if(own(cap.values,'version'))lines.push(['Retained source version',shown(cap.values.version)]);lines.push(['Source capture','Captured revision '+cap.target_revision+' · '+cap.captured_at]);}else if(targetField(p.unit))lines.push(['Source capture','No retained source metadata']);for(const [slot,d]of Object.entries(c.local_sources)){if(!d)continue;lines.push(['Linked '+slot,A.labels[d.unit]+' · '+(d.row_id||q.target.record_id)+' · '+d.status]);if(d.status!=='missing')for(const [k,v]of Object.entries(d.values))if(v.trim())lines.push(['Linked '+slot+' · '+A.fields[d.unit].find(f=>f.key===k).label,v]);for(const cap of d.captures)lines.push(['Linked '+slot+' retained source',cap.target_id+(own(cap.values,'version')?' · version '+shown(cap.values.version):'')+' · revision '+cap.target_revision+' · '+cap.captured_at]);}lines.push(['','These are saved Assessment facts and retained metadata. They do not read a source file or refresh from the current Register.']);return lines;}
const nativeFieldOrder=q=>A.fields[profileFor(q).unit].map(f=>f.key);
function checkProof(p,q,r,max=Number.MAX_SAFE_INTEGER){const unit=profileFor(q).unit;if(!exact(p,['workspace_revision','entry_revision','record_id','unit','row_id','action','at','before','after'])||p.workspace_revision!==r.workspace_revision||p.entry_revision!==r.target_revision||p.record_id!==q.target.record_id||p.unit!==unit||p.row_id!==q.target.row_id||p.action!=='edit'||p.at!==r.at)fail('Invalid immutable selected-unit Assessment proof.');integer(p.workspace_revision,max,1);integer(p.entry_revision,p.workspace_revision,q.target_revision+1);for(const payload of [p.before,p.after]){if(!exact(payload,['values','captures','deleted_at'])||payload.deleted_at!==null||!Array.isArray(payload.captures))fail('Invalid Assessment unit history payload.');B.validateValues(unit,payload.values);Object.entries(payload.values).forEach(([k,v])=>text(v,k));if(A.tables.includes(unit)&&payload.values.id!==q.target.row_id)fail('The native proof changed its local row identity.');const seen=new Set();for(const cap of payload.captures){if(seen.has(cap.field))fail('The native proof contains duplicate captures.');seen.add(cap.field);checkCapture(cap,{...captureSpec(unit,q.target.row_id,cap.field,payload.values,q.subject_context.system_id),max:p.workspace_revision-1});}}if(!same(p.before.captures,p.after.captures))fail('Owner answers cannot change retained Assessment captures.');const captureSlots=unit==='summary'?['baseline','method']:targetField(unit)?['target']:[];for(const slot of captureSlots){const field=slot==='baseline'?'baseline_record_id':slot==='method'?'method_record_id':targetField(unit),cap=p.before.captures.find(c=>c.field===field)||null;if(!same(orderedCapture(cap),orderedCapture(q.subject_context.captures[slot])))fail('The native proof differs from its retained request-time source capture.');}if(unit==='summary')for(const k of summaryKeys)if(!trackedKeys(q).includes(k)&&p.before.values[k]!==q.subject_context.summary[k])fail('The native Summary proof differs from its fixed saved Assessment context.');for(const [k,v]of Object.entries(q.subject_context.row_context))if(!trackedKeys(q).includes(k)&&p.before.values[k]!==v)fail('The native proof differs from its fixed saved row context.');const changes=nativeFieldOrder(q).filter(k=>p.before.values[k]!==p.after.values[k]).map(field=>({field,before:p.before.values[field],after:p.after.values[field]}));if(!changes.length||changes.some(x=>!q.field_keys.includes(x.field))||p.before.values[r.field]!==r.before||p.after.values[r.field]!==r.after)fail('The Assessment unit proof changes an unrelated field or differs from its receipt.');return changes;}
return freeze({RECIPE,SOURCE,catalog,groups,profiles,profileFor,profileForSelection,checkTarget,targetTuple,currentRow,subjectContext,eligibility,checkContext,canonicalContext,meaningPayload,familyMeaningPayload:(q,o={})=>meaningPayload(q,{...o,family:true}),project,contextLines,nativeFieldOrder,checkProof,rawText,trackedKeys,tracked,withTracked,rowKeys,slotKeys,routingKeys,localTypes,accessChoices:freeze([...A.fields.evidence.find(f=>f.key==='access').options])});
});
