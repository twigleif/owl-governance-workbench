/* Closed Register owner-text profiles. Frozen accepted catalogue f5675da1221e9b492a6b7e214bdd9a571df55a79f2c4e4f62d7e3091b420eba9.
 * No Register/core, storage, DOM, source body or runtime catalogue import. */
(function(root,factory){const api=factory(typeof module==='object'&&module.exports?require('./reference-schema.js'):root.OWLReferenceSchema);if(typeof module==='object'&&module.exports)module.exports=api;else root.OWLOwnerRegisterProfiles=api;})(globalThis,function(R){
'use strict';

const freeze=value=>{if(value&&typeof value==='object'){Object.values(value).forEach(freeze);Object.freeze(value);}return value;};
const catalog=freeze([
  {
    "id": "reg-a-context-item",
    "field": "item",
    "label": "Context item",
    "locator": "Context!D10",
    "question": "What issue, change or group of people does the organization need to consider?",
    "help": "Name one issue, condition, change or group of people in a short phrase. Keep separate issues in separate answers. For a group of people, use the group name rather than personal details.",
    "examples": [
      "The organization is facing more frequent interruptions to its electricity supply.",
      "The organization’s customers include people who use screen readers, which read on-screen text aloud."
    ],
    "pendingExample": "Pending: the organization is confirming which customer groups are affected.",
    "mode": "fact",
    "condition": "Ask only for the selected saved row and only when its existing answer needs completing or updating.",
    "expected": "A short text label for one issue, condition, trend, relationship or interested-party category.",
    "key": "item",
    "column": "D",
    "hint": "Name one issue, condition, change or group of people in a short phrase. Keep separate issues in separate answers. For a group of people, use the group name rather than personal details.",
    "partial": "Pending: the organization is confirming which customer groups are affected.",
    "groupId": "reg-a-context",
    "groupTitle": "Understand an organization issue or affected group",
    "groupAudience": "The process or relationship owner who knows this issue or group. Use a facilities or sustainability specialist when the selected issue needs their knowledge.",
    "audience": "The process or relationship owner who knows this issue or group. Use a facilities or sustainability specialist when the selected issue needs their knowledge.",
    "profileId": "context"
  },
  {
    "id": "reg-a-context-effect",
    "field": "effect",
    "label": "Effect on AIMS",
    "locator": "Context!E10",
    "question": "How could this affect the organization’s use or management of AI?",
    "help": "In two or three sentences, connect the issue or group to an activity, resource, service or intended result. Describe the possible effect and what is still uncertain. Do not decide whether it is relevant here.",
    "examples": [
      "Electricity interruptions could stop the organization’s AI-assisted services and delay customer responses. Teams may need a way to continue the work during an outage.",
      "Customers who use screen readers may struggle to use the organization’s AI chat service if its responses or controls are not accessible."
    ],
    "pendingExample": "Pending: the organization has identified the issue but has not yet worked out which AI activities it could affect.",
    "mode": "draft",
    "condition": "Ask only for the selected saved row and only when its existing answer needs completing or updating.",
    "expected": "Two or three sentences about the possible effect on the organization’s AI activities, resources or services. Describe what remains uncertain.",
    "key": "effect",
    "column": "E",
    "hint": "In two or three sentences, connect the issue or group to an activity, resource, service or intended result. Describe the possible effect and what is still uncertain. Do not decide whether it is relevant here.",
    "partial": "Pending: the organization has identified the issue but has not yet worked out which AI activities it could affect.",
    "groupId": "reg-a-context",
    "groupTitle": "Understand an organization issue or affected group",
    "groupAudience": "The process or relationship owner who knows this issue or group. Use a facilities or sustainability specialist when the selected issue needs their knowledge.",
    "audience": "The process or relationship owner who knows this issue or group. Use a facilities or sustainability specialist when the selected issue needs their knowledge.",
    "profileId": "context"
  },
  {
    "id": "reg-a-context-basis",
    "field": "basis_summary",
    "label": "Basis summary",
    "locator": "Context!F10",
    "question": "What facts or observations help explain this issue?",
    "help": "Summarize the facts or observations already available. Say where they came from, when they were observed and what is still uncertain. Give a readable source name if useful. Do not paste a full document or include restricted personal details.",
    "examples": [
      "The organization’s facilities team recorded three power interruptions at the main office in September. Staff reported that the service was unavailable during two of them.",
      "The organization received feedback from two customers who could not navigate the chat controls with a screen reader. The issue has not yet been tested on other devices."
    ],
    "pendingExample": "Pending: the organization is waiting for the facilities team’s interruption log.",
    "mode": "fact",
    "condition": "Ask only for the selected saved row and only when its existing answer needs completing or updating.",
    "expected": "A brief source-aware factual basis. Review reasoning may be proposed, but the relevance conclusion and its rationale stay in the Context review workflow.",
    "key": "basis_summary",
    "column": "F",
    "hint": "Summarize the facts or observations already available. Say where they came from, when they were observed and what is still uncertain. Give a readable source name if useful. Do not paste a full document or include restricted personal details.",
    "partial": "Pending: the organization is waiting for the facilities team’s interruption log.",
    "groupId": "reg-a-context",
    "groupTitle": "Understand an organization issue or affected group",
    "groupAudience": "The process or relationship owner who knows this issue or group. Use a facilities or sustainability specialist when the selected issue needs their knowledge.",
    "audience": "The process or relationship owner who knows this issue or group. Use a facilities or sustainability specialist when the selected issue needs their knowledge.",
    "profileId": "context"
  },
  {
    "id": "reg-a-risk-title",
    "field": "title",
    "label": "Title",
    "locator": "Risks & Opportunities!G10",
    "question": "What short name would help people recognize this concern or opportunity?",
    "help": "Give a short name for this one concern or opportunity. Mention the affected activity or possible outcome. Save the explanation for the next question.",
    "examples": [
      "Incorrect invoice routing",
      "Faster review of routine documents"
    ],
    "pendingExample": "Pending: the organization is still defining which concern or opportunity this row should cover.",
    "mode": "draft",
    "condition": "Ask only for the selected saved row and only when its existing answer needs completing or updating.",
    "expected": "A short descriptive title for one risk or opportunity. It does not contain a rating or acceptance conclusion.",
    "exampleContexts": [
      "The fictional organization is considering invoices sent to the wrong team.",
      "The fictional organization is considering time saved on preparing routine summaries."
    ],
    "key": "title",
    "column": "G",
    "hint": "Give a short name for this one concern or opportunity. Mention the affected activity or possible outcome. Save the explanation for the next question.",
    "partial": "Pending: the organization is still defining which concern or opportunity this row should cover.",
    "groupId": "reg-a-risks",
    "groupTitle": "Describe one concern or opportunity",
    "groupAudience": "The Risk or Opportunity owner with relevant process experts. Material uncertainty should also involve the assessor or specialist who understands the selected evaluation.",
    "audience": "The Risk or Opportunity owner with relevant process experts. Material uncertainty should also involve the assessor or specialist who understands the selected evaluation.",
    "profileId": "risks"
  },
  {
    "id": "reg-a-risk-statement",
    "field": "statement",
    "label": "Statement",
    "locator": "Risks & Opportunities!H10",
    "question": "What could happen, why could it happen, and what would the result be?",
    "help": "For a concern, describe what could go wrong. For an opportunity, describe what could improve. Include the cause or starting condition, the uncertain event and its possible consequence or benefit. Give the conditions that matter. Do not estimate a score here.",
    "examples": [
      "If the organization’s invoice-routing system receives an unfamiliar invoice layout, it could send the invoice to the wrong team and delay payment.",
      "If the organization’s document assistant produces useful first drafts, staff could spend less time preparing routine summaries and more time checking complex cases."
    ],
    "pendingExample": "Pending: the organization knows the system sometimes fails on new layouts but has not yet confirmed the possible business consequences.",
    "mode": "draft",
    "condition": "Ask only for the selected saved row and only when its existing answer needs completing or updating.",
    "expected": "A concise cause or condition, uncertain event and potential adverse consequence or beneficial outcome.",
    "key": "statement",
    "column": "H",
    "hint": "For a concern, describe what could go wrong. For an opportunity, describe what could improve. Include the cause or starting condition, the uncertain event and its possible consequence or benefit. Give the conditions that matter. Do not estimate a score here.",
    "partial": "Pending: the organization knows the system sometimes fails on new layouts but has not yet confirmed the possible business consequences.",
    "groupId": "reg-a-risks",
    "groupTitle": "Describe one concern or opportunity",
    "groupAudience": "The Risk or Opportunity owner with relevant process experts. Material uncertainty should also involve the assessor or specialist who understands the selected evaluation.",
    "audience": "The Risk or Opportunity owner with relevant process experts. Material uncertainty should also involve the assessor or specialist who understands the selected evaluation.",
    "profileId": "risks"
  },
  {
    "id": "reg-a-risk-affected",
    "field": "affected",
    "label": "Affected objectives or parties",
    "locator": "Risks & Opportunities!I10",
    "question": "Who or what could be affected?",
    "help": "Name the groups of people, services or organization goals that could be materially affected. Explain the connection briefly. Use roles or groups instead of personal details. Include external parties when relevant.",
    "examples": [
      "The organization’s finance staff would need to correct misrouted invoices. Suppliers could be affected by delayed payments.",
      "The organization’s service staff could have more time for complex enquiries. Customers could receive quicker replies to routine questions."
    ],
    "pendingExample": "Pending: the organization is checking whether external suppliers would be affected as well as internal teams.",
    "mode": "fact",
    "condition": "Ask only for the selected saved row and only when its existing answer needs completing or updating.",
    "expected": "A concise risk-specific summary of materially affected objectives or parties. Detailed affected-party analysis stays in the assessment.",
    "key": "affected",
    "column": "I",
    "hint": "Name the groups of people, services or organization goals that could be materially affected. Explain the connection briefly. Use roles or groups instead of personal details. Include external parties when relevant.",
    "partial": "Pending: the organization is checking whether external suppliers would be affected as well as internal teams.",
    "groupId": "reg-a-risks",
    "groupTitle": "Describe one concern or opportunity",
    "groupAudience": "The Risk or Opportunity owner with relevant process experts. Material uncertainty should also involve the assessor or specialist who understands the selected evaluation.",
    "audience": "The Risk or Opportunity owner with relevant process experts. Material uncertainty should also involve the assessor or specialist who understands the selected evaluation.",
    "profileId": "risks"
  },
  {
    "id": "reg-a-risk-uncertainty",
    "field": "uncertainty",
    "label": "Material uncertainty",
    "locator": "Risks & Opportunities!N10",
    "question": "What important information is missing or uncertain?",
    "help": "Describe gaps, assumptions or limits that could change the assessment or the next action. Say why each matters. If you have checked and found no material uncertainty, state that conclusion with its scope instead of leaving a blank.",
    "examples": [
      "The organization has tested the routing system on common invoice layouts but not on handwritten invoices. The effect on payment delays is therefore still uncertain.",
      "The organization’s time-saving estimate comes from a small internal trial. Staff may need more time to review drafts during busy periods."
    ],
    "pendingExample": "Pending: the organization has not yet reviewed the available assessment evidence for important gaps.",
    "mode": "fact",
    "condition": "Ask only for the selected saved row and only when its existing answer needs completing or updating.",
    "expected": "Assessment-relevant limitations or uncertainty supplied by the risk owner or assessor. A gap description is an answer; the word Pending signals an unanswered part. No confidence scale or result is invented.",
    "key": "uncertainty",
    "column": "N",
    "hint": "Describe gaps, assumptions or limits that could change the assessment or the next action. Say why each matters. If you have checked and found no material uncertainty, state that conclusion with its scope instead of leaving a blank.",
    "partial": "Pending: the organization has not yet reviewed the available assessment evidence for important gaps.",
    "groupId": "reg-a-risks",
    "groupTitle": "Describe one concern or opportunity",
    "groupAudience": "The Risk or Opportunity owner with relevant process experts. Material uncertainty should also involve the assessor or specialist who understands the selected evaluation.",
    "audience": "The Risk or Opportunity owner with relevant process experts. Material uncertainty should also involve the assessor or specialist who understands the selected evaluation.",
    "profileId": "risks"
  },
  {
    "id": "reg-b-objective-result",
    "field": "statement",
    "label": "Objective statement",
    "locator": "Objectives!F10",
    "question": "What specific result should the organization achieve?",
    "help": "Describe one observable improvement within the scope shown above. Say who or what should be different when the result is achieved. Avoid broad slogans such as use AI responsibly. You can propose an amount or percentage if it is supported, but a proposal does not establish a target.",
    "examples": [
      "The organization intends to give every employee who uses its approved AI tools the current AI-use guidance before they receive access.",
      "The organization intends to ensure that every material AI-related customer complaint receives a documented investigation and a response that addresses the reported concern."
    ],
    "pendingExample": "Pending — the process owner is still confirming which result this objective should cover.",
    "mode": "draft",
    "condition": "Use when an Objective is being proposed or a material revision is being considered. Do not replace an established objective through a routine owner return.",
    "expected": "One or two sentences describing one intended result. If proposing an amount or percentage, include the basis for it.",
    "key": "statement",
    "column": "F",
    "hint": "Describe one observable improvement within the scope shown above. Say who or what should be different when the result is achieved. Avoid broad slogans such as use AI responsibly. You can propose an amount or percentage if it is supported, but a proposal does not establish a target.",
    "partial": "Pending — the process owner is still confirming which result this objective should cover.",
    "groupId": "reg-b-objective-proposal",
    "groupTitle": "Describe the result and what it needs",
    "groupAudience": "The proposed objective owner, relevant process owner, and people responsible for the work or resources",
    "audience": "The proposed objective owner, relevant process owner, and people responsible for the work or resources",
    "profileId": "objective-proposal"
  },
  {
    "id": "reg-b-objective-measurability",
    "field": "measurability",
    "label": "Measurability basis",
    "locator": "Objectives!J10",
    "question": "How could the organization tell whether this result has been achieved?",
    "help": "Name something that can be counted, checked or assessed. If a number would be misleading, describe the evidence and review that would support a clear judgment. Explain important limits instead of inventing a score.",
    "examples": [
      "The organization can compare the list of employees granted AI-tool access with training attendance and guidance acknowledgements for the same period. Missing or incomplete records would be reported separately.",
      "The organization can have a reviewer examine a sample of complaint investigations against the agreed response checklist. The review would describe what the sample shows and its limits instead of claiming that a single percentage proves complaint handling is effective."
    ],
    "pendingExample": "Pending — the organization has not confirmed which records are reliable enough to assess this result.",
    "mode": "draft",
    "condition": "Use for a proposed evaluation basis or a reviewed revision. Reuse an existing agreed basis if no change is needed.",
    "expected": "Describe the checkable evidence or measurement, the population or sample it covers, and any material limitation. This is the basis for evaluation, not a completed result.",
    "key": "measurability",
    "column": "J",
    "hint": "Name something that can be counted, checked or assessed. If a number would be misleading, describe the evidence and review that would support a clear judgment. Explain important limits instead of inventing a score.",
    "partial": "Pending — the organization has not confirmed which records are reliable enough to assess this result.",
    "groupId": "reg-b-objective-proposal",
    "groupTitle": "Describe the result and what it needs",
    "groupAudience": "The proposed objective owner, relevant process owner, and people responsible for the work or resources",
    "audience": "The proposed objective owner, relevant process owner, and people responsible for the work or resources",
    "profileId": "objective-proposal"
  },
  {
    "id": "reg-b-objective-evaluation",
    "field": "evaluation_method",
    "label": "Evaluation method",
    "locator": "Objectives!K10",
    "question": "How should the organization review the evidence and decide whether this objective has been achieved?",
    "help": "Describe the steps the objective owner proposes to use: which evidence is compared, the comparison or checklist, who reviews it, and how missing or conflicting information is handled. Keep the detailed definition of a recurring measure in Metrics.",
    "examples": [
      "The organization proposes a quarterly review by the training lead. The reviewer would compare access and training records, investigate unmatched entries, and report the result with any gaps to the objective owner.",
      "The organization proposes a review of each closed complaint investigation against the response checklist. A reviewer who did not handle the complaint would document any missing steps and identify cases needing further work."
    ],
    "pendingExample": "Pending — the objective owner has not agreed who will review the evidence or which evaluation method to use.",
    "mode": "draft",
    "condition": "Use for an objective proposal or a reviewed method change. Do not use the answer to record achievement or approval.",
    "expected": "A short description of review steps, the comparison basis, responsible reviewing role and treatment of limitations. Detailed measures remain in Metrics.",
    "key": "evaluation_method",
    "column": "K",
    "hint": "Describe the steps the objective owner proposes to use: which evidence is compared, the comparison or checklist, who reviews it, and how missing or conflicting information is handled. Keep the detailed definition of a recurring measure in Metrics.",
    "partial": "Pending — the objective owner has not agreed who will review the evidence or which evaluation method to use.",
    "groupId": "reg-b-objective-proposal",
    "groupTitle": "Describe the result and what it needs",
    "groupAudience": "The proposed objective owner, relevant process owner, and people responsible for the work or resources",
    "audience": "The proposed objective owner, relevant process owner, and people responsible for the work or resources",
    "profileId": "objective-proposal"
  },
  {
    "id": "reg-b-objective-resources",
    "field": "resources",
    "label": "Resources required",
    "locator": "Objectives!M10",
    "question": "What people, time, tools or other support would the organization need for this objective?",
    "help": "List the resources needed and distinguish support already approved from support still requested. If an approved resource plan already contains the answer, give its recognizable title and section rather than copying the full plan or looking up an ID.",
    "examples": [
      "The organization would need the training lead to update the guidance, team managers to arrange briefing time, and access to the existing learning system. Use of the learning system is already approved; staff time for the briefings is still requested.",
      "The organization would need a complaints coordinator, a reviewer independent of the complaint handling, and a protected location for investigation records. The approved Service Improvement Plan, section 4, provides these resources for the current quarter."
    ],
    "pendingExample": "Pending — the objective owner is confirming staff availability and any funding required.",
    "mode": "draft",
    "condition": "Use when the resources are not already available in a linked approved plan, or an objective proposal requires a resource change.",
    "expected": "A concise description of needed resources or a recognizable approved-plan reference. Clearly distinguish already approved support from support still requested.",
    "key": "resources",
    "column": "M",
    "hint": "List the resources needed and distinguish support already approved from support still requested. If an approved resource plan already contains the answer, give its recognizable title and section rather than copying the full plan or looking up an ID.",
    "partial": "Pending — the objective owner is confirming staff availability and any funding required.",
    "groupId": "reg-b-objective-proposal",
    "groupTitle": "Describe the result and what it needs",
    "groupAudience": "The proposed objective owner, relevant process owner, and people responsible for the work or resources",
    "audience": "The proposed objective owner, relevant process owner, and people responsible for the work or resources",
    "profileId": "objective-proposal"
  },
  {
    "id": "reg-b-metric-what",
    "field": "definition",
    "label": "What is measured",
    "locator": "Metrics!H10",
    "question": "What exactly should this measure count or describe?",
    "help": "Name the item or event, the group or period covered, and anything excluded. For a percentage, say what is counted in the top number and the total used as the bottom number. For a descriptive review, say what the reviewer will look for.",
    "examples": [
      "The organization proposes to measure the percentage of employees granted AI-tool access during the month who completed the current AI-use briefing before access was granted. The top number is employees who completed the briefing first; the total is all employees granted access in that month. Accounts created only for technical testing are excluded.",
      "The organization proposes to describe whether explanations in a sample of AI-assisted service responses address the customer question, distinguish uncertain information and give a route for correction. Internal training responses and duplicate cases are excluded from the sample."
    ],
    "pendingExample": "Pending — the organization has not agreed which population or exclusions this measure should cover.",
    "mode": "draft",
    "condition": "Use for a proposed Metric definition or a reviewed material revision. Preserve the identity and original results of an existing issued definition.",
    "expected": "Define the counted or examined item, population, period convention and exclusions. For a proportion, include the qualifying count and the total it is compared with.",
    "key": "definition",
    "column": "H",
    "hint": "Name the item or event, the group or period covered, and anything excluded. For a percentage, say what is counted in the top number and the total used as the bottom number. For a descriptive review, say what the reviewer will look for.",
    "partial": "Pending — the organization has not agreed which population or exclusions this measure should cover.",
    "groupId": "reg-b-metric-definition",
    "groupTitle": "Define what will be measured",
    "groupAudience": "The person responsible for the measure, the process owner and the data custodian (the person or team managing the source data)",
    "audience": "The person responsible for the measure, the process owner and the data custodian (the person or team managing the source data)",
    "profileId": "metric-definition"
  },
  {
    "id": "reg-b-metric-format",
    "field": "unit",
    "label": "Unit or result format",
    "locator": "Metrics!I10",
    "question": "In what unit or format should the result be reported?",
    "help": "Choose a format people can read consistently, such as number of cases, minutes, percentage, named categories or a structured description. Define the scale or categories so two reviewers would understand them in the same way. If reporting a median, explain it as the middle value when the recorded values are ordered.",
    "examples": [
      "The organization proposes to report a percentage from 0 to 100: employees who completed the current AI-use briefing before receiving AI-tool access, divided by all eligible employees granted access that month, multiplied by 100. A result of 80% would mean eighty out of every hundred eligible employees completed the briefing first. If there are no eligible employees that month, the report would state No eligible population rather than invent a percentage.",
      "The organization proposes to use three categories: all checklist items supported, some items not supported, and unable to assess. Each result would include the supporting observations and limitations."
    ],
    "pendingExample": "Pending — the measurement owner is confirming which result format will be useful and reliable.",
    "mode": "draft",
    "condition": "Use with a proposed measure or a reviewed change to its unit or result format.",
    "expected": "The unit or named result categories plus their meaning.",
    "key": "unit",
    "column": "I",
    "hint": "Choose a format people can read consistently, such as number of cases, minutes, percentage, named categories or a structured description. Define the scale or categories so two reviewers would understand them in the same way. If reporting a median, explain it as the middle value when the recorded values are ordered.",
    "partial": "Pending — the measurement owner is confirming which result format will be useful and reliable.",
    "groupId": "reg-b-metric-definition",
    "groupTitle": "Define what will be measured",
    "groupAudience": "The person responsible for the measure, the process owner and the data custodian (the person or team managing the source data)",
    "audience": "The person responsible for the measure, the process owner and the data custodian (the person or team managing the source data)",
    "profileId": "metric-definition"
  },
  {
    "id": "reg-b-metric-source",
    "field": "data_source",
    "label": "Primary data source",
    "locator": "Metrics!J10",
    "question": "Which existing source would provide the information for this measure?",
    "help": "Name the real system, log, report or dataset and the relevant fields or entries. Explain who maintains it and any known missing information. If no suitable source is confirmed, say Pending rather than naming a source that does not exist.",
    "examples": [
      "The organization would use access-grant dates from the identity-management log and briefing-completion dates from the learning system. The IT access team and training coordinator maintain these records; the current learning export does not include contractors.",
      "The organization would use the service case system, including the customer question, issued response and correction history. The service operations team maintains it; cases handled outside that system would need to be identified separately."
    ],
    "pendingExample": "Pending — the data custodian is confirming which source contains the required fields and whether the organization may use it for this measure.",
    "mode": "fact",
    "condition": "Use when the exact intended data source and its limitations are known to the responsible custodian. Approval to use the source remains separate.",
    "expected": "A recognizable actual source, relevant data items, maintaining role and material gaps. A source name is not an upload, permission grant or proof that the data is complete.",
    "key": "data_source",
    "column": "J",
    "hint": "Name the real system, log, report or dataset and the relevant fields or entries. Explain who maintains it and any known missing information. If no suitable source is confirmed, say Pending rather than naming a source that does not exist.",
    "partial": "Pending — the data custodian is confirming which source contains the required fields and whether the organization may use it for this measure.",
    "groupId": "reg-b-metric-definition",
    "groupTitle": "Define what will be measured",
    "groupAudience": "The person responsible for the measure, the process owner and the data custodian (the person or team managing the source data)",
    "audience": "The person responsible for the measure, the process owner and the data custodian (the person or team managing the source data)",
    "profileId": "metric-definition"
  },
  {
    "id": "reg-b-metric-collection",
    "field": "measurement_method",
    "label": "Measurement method",
    "locator": "Metrics!K10",
    "question": "How should the organization collect or calculate this measure?",
    "help": "Describe the collection steps, calculation or observation rule and any sampling. Say how duplicates, missing entries and unreliable records would be handled. Do not put a measurement result here.",
    "examples": [
      "The organization proposes to export access and briefing records for the same month, match employees by their staff identifier, and count each employee once. Unmatched records would be listed as missing information and investigated before the percentage is finalized. If no eligible employees received access that month, the report would state No eligible population rather than record 0%.",
      "The organization proposes to select twenty service cases each month across the main response types. A reviewer would apply the agreed explanation checklist to the retained issued responses and record observations for each item. If fewer than twenty cases exist, every eligible case would be reviewed. Duplicate cases would be excluded. If an issued response cannot be retrieved or the retained copy is unreliable, that case would be recorded as Unable to assess with the reason, rather than treated as a supported result."
    ],
    "pendingExample": "Pending — the organization has not confirmed a repeatable collection or sampling method.",
    "mode": "draft",
    "condition": "Use when proposing a measure or a reviewed collection-method change. The responsible owner must settle the method before it governs results.",
    "expected": "Repeatable steps, calculation or observation rules, sample selection where used, and handling of missing or duplicate data.",
    "key": "measurement_method",
    "column": "K",
    "hint": "Describe the collection steps, calculation or observation rule and any sampling. Say how duplicates, missing entries and unreliable records would be handled. Do not put a measurement result here.",
    "partial": "Pending — the organization has not confirmed a repeatable collection or sampling method.",
    "groupId": "reg-b-metric-definition",
    "groupTitle": "Define what will be measured",
    "groupAudience": "The person responsible for the measure, the process owner and the data custodian (the person or team managing the source data)",
    "audience": "The person responsible for the measure, the process owner and the data custodian (the person or team managing the source data)",
    "profileId": "metric-definition"
  },
  {
    "id": "reg-b-metric-interpretation",
    "field": "evaluation_method",
    "label": "Analysis and evaluation method",
    "locator": "Metrics!L10",
    "question": "How should the organization interpret the results and identify anything needing attention?",
    "help": "Describe the comparisons, trends or checks that would be used and how uncertainty or missing information would be reported. Refer to an existing approved threshold if there is one. Do not invent a threshold or make a compliance, effectiveness or risk-acceptance decision in this answer.",
    "examples": [
      "The organization proposes to compare each monthly access-and-briefing percentage with the previous three months and investigate access granted before briefing. The report would show missing records separately and refer to the approved training objective for the comparison target.",
      "The organization proposes to review the explanation checklist results by response type, examine recurring gaps and report sample limits. No numeric pass mark is proposed; the process owner would consider the described gaps and identify follow-up work through the normal review process."
    ],
    "pendingExample": "Pending — the measurement owner has not agreed how the result and its limitations should be evaluated.",
    "mode": "draft",
    "condition": "Use for a proposed evaluation method or a reviewed revision. The result and any formal human disposition remain separate.",
    "expected": "The comparison or review steps, treatment of uncertainty and how matters needing attention are identified. An approved threshold may be referenced exactly, but not created by the questionnaire.",
    "key": "evaluation_method",
    "column": "L",
    "hint": "Describe the comparisons, trends or checks that would be used and how uncertainty or missing information would be reported. Refer to an existing approved threshold if there is one. Do not invent a threshold or make a compliance, effectiveness or risk-acceptance decision in this answer.",
    "partial": "Pending — the measurement owner has not agreed how the result and its limitations should be evaluated.",
    "groupId": "reg-b-metric-use",
    "groupTitle": "Explain when and how results will be used",
    "groupAudience": "The measurement owner and the people who collect or evaluate its results",
    "audience": "The measurement owner and the people who collect or evaluate its results",
    "profileId": "metric-use"
  },
  {
    "id": "reg-b-metric-measure-when",
    "field": "measurement_timing",
    "label": "Measurement timing",
    "locator": "Metrics!M10",
    "question": "When should the organization collect or measure this information?",
    "help": "Give the interval or event and the period covered. If collection is triggered by an event rather than a calendar schedule, name the event. Avoid answers such as regularly.",
    "examples": [
      "The organization proposes to collect access and briefing records on the third working day of each month for access granted during the previous calendar month.",
      "The organization proposes to collect the previous calendar month’s retained service responses on the third working day of each month. The reviewer would then select the twenty eligible cases described in the sampling method, or all eligible cases if fewer than twenty exist, and record the explanation-checklist observations."
    ],
    "pendingExample": "Pending — the collection owner is confirming a practical schedule and the period that each collection will cover.",
    "mode": "draft",
    "condition": "Use for a proposed schedule or a reviewed change. Reuse the current agreed schedule if no change is needed.",
    "expected": "A collection interval or specific event, the period convention and any relevant operational timing. This prose is not automatically converted into a calendar due date.",
    "key": "measurement_timing",
    "column": "M",
    "hint": "Give the interval or event and the period covered. If collection is triggered by an event rather than a calendar schedule, name the event. Avoid answers such as regularly.",
    "partial": "Pending — the collection owner is confirming a practical schedule and the period that each collection will cover.",
    "groupId": "reg-b-metric-use",
    "groupTitle": "Explain when and how results will be used",
    "groupAudience": "The measurement owner and the people who collect or evaluate its results",
    "audience": "The measurement owner and the people who collect or evaluate its results",
    "profileId": "metric-use"
  },
  {
    "id": "reg-b-metric-evaluate-when",
    "field": "evaluation_timing",
    "label": "Evaluation timing",
    "locator": "Metrics!N10",
    "question": "When should the organization review and interpret the results?",
    "help": "Say when the collected results will be reviewed, by which role, and whether an event should prompt an earlier review. This can be less frequent than collection. Do not set a new formal review or reporting obligation by answering the form.",
    "examples": [
      "The organization proposes that the training lead review the monthly result after the access and learning records have been reconciled, then provide a quarterly trend summary to the objective owner.",
      "The organization proposes that the service quality lead review the monthly explanation-checklist observations after the sample review is complete, and compare recurring gaps across response types. A relevant complaint would prompt an earlier review through the organization’s existing complaint process."
    ],
    "pendingExample": "Pending — the process owner is confirming when the result review can take place and who will carry it out.",
    "mode": "draft",
    "condition": "Use for a proposed evaluation schedule or a reviewed change. Any approved reporting or escalation obligation remains in its owning process.",
    "expected": "A review interval or event, responsible reviewing role and any relevant earlier-review trigger. Keep it distinct from collection timing and the next issued-result due date.",
    "key": "evaluation_timing",
    "column": "N",
    "hint": "Say when the collected results will be reviewed, by which role, and whether an event should prompt an earlier review. This can be less frequent than collection. Do not set a new formal review or reporting obligation by answering the form.",
    "partial": "Pending — the process owner is confirming when the result review can take place and who will carry it out.",
    "groupId": "reg-b-metric-use",
    "groupTitle": "Explain when and how results will be used",
    "groupAudience": "The measurement owner and the people who collect or evaluate its results",
    "audience": "The measurement owner and the people who collect or evaluate its results",
    "profileId": "metric-use"
  },
  {
    "id": "reg-b-action-blocker",
    "field": "blocker",
    "label": "Blocker or dependency",
    "locator": "Actions!N10",
    "question": "What is preventing this work from moving forward, or what must happen before it can proceed?",
    "help": "Name the obstacle, the next thing needed and the person or team expected to provide it. If you have checked and there is no unresolved blocker, say so explicitly. Do not report Completed here or claim that verification or closure has happened.",
    "examples": [
      "The organization cannot finish the access review until the supplier provides the export of active accounts. The IT service owner has requested it; the team will resume the review when the export arrives.",
      "The organization’s Action owner has checked the assigned work and identified no unresolved blocker or dependency. The work can continue using the agreed plan; completion and verification are still tracked separately."
    ],
    "pendingExample": "Pending — the organization’s Action owner is checking which dependency is delaying the work and who can resolve it.",
    "mode": "fact",
    "condition": "Use for a saved, assigned Action when the owner can report the current obstacle or a checked absence of obstacles. Do not replace a completed or closed Action’s historical facts through an unrelated return.",
    "expected": "One concise blocker/dependency summary, or explicit none after review. Include what is needed and the relevant role where known; uncertainty must stay visible.",
    "key": "blocker",
    "column": "N",
    "hint": "Name the obstacle, the next thing needed and the person or team expected to provide it. If you have checked and there is no unresolved blocker, say so explicitly. Do not report Completed here or claim that verification or closure has happened.",
    "partial": "Pending — the organization’s Action owner is checking which dependency is delaying the work and who can resolve it.",
    "groupId": "reg-b-action-blockers",
    "groupTitle": "Explain what is preventing the assigned work",
    "groupAudience": "The owner of the selected Action",
    "audience": "The owner of the selected Action",
    "profileId": "action-blocker"
  },
  {
    "id": "reg-b-record-title",
    "field": "title",
    "label": "Title",
    "locator": "Records!D10",
    "question": "What is the exact title or recognizable name of this retained artifact?",
    "help": "Use the title on the document, report or dataset. Include distinguishing details needed to find this exact artifact. If it has no formal title, give a clear descriptive name rather than creating another ID.",
    "examples": [
      "AI-use guidance for staff",
      "Service complaint response review — July 2026"
    ],
    "pendingExample": "Pending — the organization’s custodian is confirming which retained artifact this Record represents.",
    "mode": "fact",
    "condition": "Use for the exact selected artifact when its title is missing or needs a factual correction. A different artifact or version must follow the normal Record identity workflow.",
    "expected": "The artifact title or a concise distinguishing name. Retain formal wording when one exists; the title is not a substitute for Record ID and version.",
    "exampleContexts": [
      "The fictional organization retains a staff guidance document with this title.",
      "The fictional organization retains a month-specific review report, so the period distinguishes it from earlier reports."
    ],
    "key": "title",
    "column": "D",
    "hint": "Use the title on the document, report or dataset. Include distinguishing details needed to find this exact artifact. If it has no formal title, give a clear descriptive name rather than creating another ID.",
    "partial": "Pending — the organization’s custodian is confirming which retained artifact this Record represents.",
    "groupId": "reg-b-record-identity",
    "groupTitle": "Identify the exact retained document or data",
    "groupAudience": "The owner or custodian (the person or team managing the retained copy) of the selected artifact",
    "audience": "The owner or custodian (the person or team managing the retained copy) of the selected artifact",
    "profileId": "record-metadata"
  },
  {
    "id": "reg-b-record-origin",
    "field": "origin",
    "label": "Origin",
    "locator": "Records!G10",
    "question": "Who or what issued or generated this artifact?",
    "help": "Name the organization, supplier, authority, team, system or process that produced the exact retained item. Keep the creator separate from the person who now stores it. If it came through a supplier or another intermediary, state that route only if known.",
    "examples": [
      "The organization’s service quality team produced this review report from the complaint records held by service operations.",
      "The organization received this release notice from its AI service supplier, Northstar Software. The supplier issued the notice through its customer portal."
    ],
    "pendingExample": "Pending — the organization’s custodian is checking the artifact’s source and how it was received.",
    "mode": "fact",
    "condition": "Use when the artifact’s provenance is known from the retained source or its custodian. Do not infer origin from a filename or current storage location.",
    "expected": "A concise factual origin and known supply route where relevant. Custodian and content owner assignments remain separate.",
    "key": "origin",
    "column": "G",
    "hint": "Name the organization, supplier, authority, team, system or process that produced the exact retained item. Keep the creator separate from the person who now stores it. If it came through a supplier or another intermediary, state that route only if known.",
    "partial": "Pending — the organization’s custodian is checking the artifact’s source and how it was received.",
    "groupId": "reg-b-record-identity",
    "groupTitle": "Identify the exact retained document or data",
    "groupAudience": "The owner or custodian (the person or team managing the retained copy) of the selected artifact",
    "audience": "The owner or custodian (the person or team managing the retained copy) of the selected artifact",
    "profileId": "record-metadata"
  },
  {
    "id": "reg-b-record-location",
    "field": "location",
    "label": "Controlled location",
    "locator": "Records!P10",
    "question": "Where can an authorized person retrieve the exact retained copy of this artifact?",
    "help": "Give the approved repository or system and a path, record reference or retrieval instruction that identifies this exact version. If it cannot currently be retrieved, describe the actual problem instead of inventing a location. Keep secrets and private download tokens out of the answer.",
    "examples": [
      "The organization retains version 1.2 in the approved document repository under Governance / AI guidance / Staff AI-use guidance / v1.2. Authorized staff use the repository’s normal access process.",
      "The organization’s service system retains the July 2026 review report under Quality Reviews / 2026 / July. The archived report is currently inaccessible because retrieval permission is awaiting restoration; the service records custodian is handling that request."
    ],
    "pendingExample": "Pending — the organization’s custodian is confirming the controlled location of the exact retained version.",
    "mode": "fact",
    "condition": "Use for an existing selected artifact when its custodian can report the actual approved retrieval reference or actual unavailable state.",
    "expected": "A useful controlled retrieval reference for the exact version, with any actual access or retrieval problem clearly stated.",
    "key": "location",
    "column": "P",
    "hint": "Give the approved repository or system and a path, record reference or retrieval instruction that identifies this exact version. If it cannot currently be retrieved, describe the actual problem instead of inventing a location. Keep secrets and private download tokens out of the answer.",
    "partial": "Pending — the organization’s custodian is confirming the controlled location of the exact retained version.",
    "groupId": "reg-b-record-custody",
    "groupTitle": "Explain where the artifact is kept and which rules already apply",
    "groupAudience": "The appointed artifact custodian (the person or team managing the retained copy), with the relevant records or information-security owner when needed",
    "audience": "The appointed artifact custodian (the person or team managing the retained copy), with the relevant records or information-security owner when needed",
    "profileId": "record-metadata"
  },
  {
    "id": "reg-b-record-access",
    "field": "access",
    "label": "Access classification",
    "locator": "Records!Q10",
    "question": "What existing organization-approved access classification applies to this artifact?",
    "help": "Copy the exact classification assigned under the organization’s approved information policy. The examples are fictional labels, not choices every organization must use. If no classification is assigned or you do not know the applicable rule, use Pending rather than choosing one yourself.",
    "examples": [
      "Internal",
      "Restricted"
    ],
    "pendingExample": "Pending — the organization’s information owner has not confirmed the assigned classification under its approved policy.",
    "mode": "fact",
    "condition": "Use only when the responsible custodian can identify the existing approved classification for the exact artifact. Policy creation or reclassification stays in its authorized workflow.",
    "expected": "The exact assigned classification label. Refer to the existing policy shown in the request if you need to check its meaning.",
    "exampleContexts": [
      "The fictional organization’s Information Classification Policy assigns Internal to its staff AI-use guidance.",
      "The fictional organization’s policy assigns Restricted to an investigation record containing personal information."
    ],
    "key": "access",
    "column": "Q",
    "hint": "Copy the exact classification assigned under the organization’s approved information policy. The examples are fictional labels, not choices every organization must use. If no classification is assigned or you do not know the applicable rule, use Pending rather than choosing one yourself.",
    "partial": "Pending — the organization’s information owner has not confirmed the assigned classification under its approved policy.",
    "groupId": "reg-b-record-custody",
    "groupTitle": "Explain where the artifact is kept and which rules already apply",
    "groupAudience": "The appointed artifact custodian (the person or team managing the retained copy), with the relevant records or information-security owner when needed",
    "audience": "The appointed artifact custodian (the person or team managing the retained copy), with the relevant records or information-security owner when needed",
    "profileId": "record-metadata"
  },
  {
    "id": "reg-b-record-retention",
    "field": "retention",
    "label": "Retention or disposition rule",
    "locator": "Records!R10",
    "question": "Which existing retention, hold or disposal rule applies to this artifact?",
    "help": "Report the applicable rule exactly enough for the custodian to follow it. Name the approved schedule or instruction and its relevant section, the event that starts retention, the period or disposition, and any current hold. Do not recommend a period or guess a legal requirement.",
    "examples": [
      "The organization’s approved Records Schedule, item 7, requires this report to be retained for three years after the reporting period closes, then reviewed for authorized disposal. No current hold is recorded.",
      "The organization’s approved Investigation Records Schedule, item 12, requires retention for two years after the investigation closes, followed by authorized disposal. A recorded preservation hold currently suspends disposal; the custodian must follow the hold instruction before any disposition."
    ],
    "pendingExample": "Pending — the organization’s records owner is confirming the applicable schedule item and whether a preservation hold applies.",
    "mode": "fact",
    "condition": "Use only for a rule already approved and applicable to this exact artifact, as reported by the responsible custodian or records owner. New periods, removal of holds and disposition approvals remain separate.",
    "expected": "The exact applicable schedule/instruction, trigger, period or event, disposition rule and known hold. All sample periods are fictional; they are not recommendations or legal minimums.",
    "key": "retention",
    "column": "R",
    "hint": "Report the applicable rule exactly enough for the custodian to follow it. Name the approved schedule or instruction and its relevant section, the event that starts retention, the period or disposition, and any current hold. Do not recommend a period or guess a legal requirement.",
    "partial": "Pending — the organization’s records owner is confirming the applicable schedule item and whether a preservation hold applies.",
    "groupId": "reg-b-record-custody",
    "groupTitle": "Explain where the artifact is kept and which rules already apply",
    "groupAudience": "The appointed artifact custodian (the person or team managing the retained copy), with the relevant records or information-security owner when needed",
    "audience": "The appointed artifact custodian (the person or team managing the retained copy), with the relevant records or information-security owner when needed",
    "profileId": "record-metadata"
  },
  {
    "id": "reg-b-record-integrity",
    "field": "integrity",
    "label": "Integrity reference",
    "locator": "Records!S10",
    "question": "If an integrity reference is required or already retained, what is it?",
    "help": "Provide the exact recorded hash, signature, immutable-log entry or other integrity reference used for this artifact. A hash is a file fingerprint used to compare the retained file with a known recorded value. Name the mechanism and enough detail to locate it. Do not make up a fingerprint or treat a filename as an integrity check.",
    "examples": [
      "SHA-256: 6b7d58d2d531d2fc8bb0c115f996f18b3b77a5d8db864334b0dc56e3a1c82f19",
      "The organization retains the signed PDF and its signature-validation report in the approved archive under Service review July 2026 / Signature validation. The stored report identifies the signed file; this answer reports its reference and does not perform a new validation."
    ],
    "pendingExample": "Pending — the organization’s custodian is confirming which integrity mechanism and reference are retained for this artifact.",
    "mode": "fact",
    "condition": "Ask only where the governing method requires an integrity mechanism or one is already retained. If none is required, do not select this question. If the required reference is still unknown, use Pending in the answer box.",
    "expected": "The exact retained integrity reference, with its mechanism and enough context to locate it. If the required reference is unresolved, answer Pending with a short reason.",
    "exampleContexts": [
      "The fictional organization’s archive metadata records this exact SHA-256 value for the selected retained file; the example is not a computed check of a real file.",
      "The fictional organization uses a retained digital-signature validation record rather than a bare hash string."
    ],
    "key": "integrity",
    "column": "S",
    "hint": "Provide the exact recorded hash, signature, immutable-log entry or other integrity reference used for this artifact. A hash is a file fingerprint used to compare the retained file with a known recorded value. Name the mechanism and enough detail to locate it. Do not make up a fingerprint or treat a filename as an integrity check.",
    "partial": "Pending — the organization’s custodian is confirming which integrity mechanism and reference are retained for this artifact.",
    "groupId": "reg-b-record-custody",
    "groupTitle": "Explain where the artifact is kept and which rules already apply",
    "groupAudience": "The appointed artifact custodian (the person or team managing the retained copy), with the relevant records or information-security owner when needed",
    "audience": "The appointed artifact custodian (the person or team managing the retained copy), with the relevant records or information-security owner when needed",
    "profileId": "record-metadata"
  },
  {
    "id": "reg-b-link-boundary",
    "field": "scope",
    "label": "Scope or basis",
    "locator": "Links!H10",
    "question": "What does this connection cover, and what limits should readers know?",
    "help": "Use the two named items and the plain description of their connection shown above. Explain the relevant boundary, period or reason and anything the connection should not imply. You do not need to select relationship types, find IDs or decide whether the Link should be activated.",
    "examples": [
      "The organization connects its customer-response requirement to the complaint-intake control because that control addresses receipt and routing of complaints. The connection covers those intake steps; investigation and final response are handled by different controls.",
      "The organization connects its quarterly service-quality measure to the complaint-response objective because the measure provides response-time information for that objective. The connection applies to the service teams and period defined by the measure; it does not by itself establish that the objective has been achieved."
    ],
    "pendingExample": "Pending — the organization’s row owner is confirming which part of the named items this connection covers.",
    "mode": "draft",
    "condition": "Use only for an operator-prepared proposed Link with valid exact typed endpoints, an allowed relationship and a named retrieval purpose for which a direct field is insufficient. Do not create a Link from an unrelated narrative answer.",
    "expected": "A concise boundary or basis for this exact proposed relationship, including material limits. The operator validates direction, endpoints, duplication, dates and substantive ownership before activation.",
    "key": "scope",
    "column": "H",
    "hint": "Use the two named items and the plain description of their connection shown above. Explain the relevant boundary, period or reason and anything the connection should not imply. You do not need to select relationship types, find IDs or decide whether the Link should be activated.",
    "partial": "Pending — the organization’s row owner is confirming which part of the named items this connection covers.",
    "groupId": "reg-b-link-context",
    "groupTitle": "Explain a proposed connection between two saved items",
    "groupAudience": "The responsible owner of the substantive work represented by the selected proposed connection",
    "audience": "The responsible owner of the substantive work represented by the selected proposed connection",
    "profileId": "link-context"
  }
]);
const groups=freeze([
  {
    "id": "reg-a-context",
    "title": "Understand an organization issue or affected group",
    "audience": "The process or relationship owner who knows this issue or group. Use a facilities or sustainability specialist when the selected issue needs their knowledge.",
    "purpose": "Collect the issue, possible effect and factual basis in one small batch before the Context relevance review.",
    "guideSection": "§6.2",
    "context": [
      "Selected Context ID and existing item name.",
      "The recorded Context Type in plain words. An interested party means a group with a stake in the organization’s AI work.",
      "The relevant organization activity and current saved answers, when available.",
      "For a climate-related item, state the actual selected climate issue rather than assuming it is relevant or irrelevant."
    ]
  },
  {
    "id": "reg-a-risks",
    "title": "Describe one concern or opportunity",
    "audience": "The Risk or Opportunity owner with relevant process experts. Material uncertainty should also involve the assessor or specialist who understands the selected evaluation.",
    "purpose": "Collect a recognizable title, scenario, affected parties and important information gaps as one coherent row-owner update.",
    "guideSection": "§6.5",
    "context": [
      "Selected Risk or Opportunity ID, recorded Type and exact scope.",
      "Saved System name and ID when system-specific.",
      "Known process, purpose and current scenario summary.",
      "A readable assessment summary for the uncertainty question when an assessment exists. Detailed or restricted analysis stays in its controlled location.",
      "For a Risk ask about an adverse consequence. For an Opportunity ask about a beneficial outcome. Do not assume both belong in the same row."
    ]
  },
  {
    "id": "reg-b-objective-proposal",
    "title": "Describe the result and what it needs",
    "audience": "The proposed objective owner, relevant process owner, and people responsible for the work or resources",
    "purpose": "Collect a practical proposal for one result the organization intends to achieve. The objective owner reviews the proposal before it becomes an established commitment.",
    "guideSection": "6.7",
    "context": [
      "Show the saved Objective title, literal Objective ID, scope, assigned owner and any existing answers. Ask only for missing or changed contributions.",
      "Show the relevant issued AI Policy title, version and exact section with a short authorized summary when available. Do not ask the respondent to find a Record ID.",
      "An objective is a result the organization wants to achieve. Keep tasks in Actions and individual measurement definitions in Metrics.",
      "Responses are draft contributions. Target dates, resource commitments, policy alignment, formal establishment and review arrangements remain their existing workflows."
    ]
  },
  {
    "id": "reg-b-metric-definition",
    "title": "Define what will be measured",
    "audience": "The person responsible for the measure, the process owner and the data custodian (the person or team managing the source data)",
    "purpose": "Prepare a clear definition of one measure so different people would collect the same kind of information.",
    "guideSection": "6.8",
    "context": [
      "Show the saved Metric name, literal Metric ID, scope, assigned owner and its exact primary subject or linked Objectives in recognizable words.",
      "A Metric row defines a measure. It does not contain the measurement result. Show any existing definition and relevant approved method before asking for changes.",
      "These questions prepare a definition or report the exact available data source. The responsible owner still reviews the definition; no result, threshold or approval is generated."
    ]
  },
  {
    "id": "reg-b-metric-use",
    "title": "Explain when and how results will be used",
    "audience": "The measurement owner and the people who collect or evaluate its results",
    "purpose": "Separate collecting information from reviewing what it means.",
    "guideSection": "6.8",
    "context": [
      "Show the definition, unit, proposed or approved collection method, exact scope and any approved target or threshold basis.",
      "Show the current measurement and evaluation timing if already known. Do not repeat a schedule that needs no change.",
      "A collection schedule and an evaluation schedule can differ. This batch does not change the effective date, next result due date, approved threshold or current result Record."
    ]
  },
  {
    "id": "reg-b-action-blockers",
    "title": "Explain what is preventing the assigned work",
    "audience": "The owner of the selected Action",
    "purpose": "Collect a concise obstacle or dependency update for already assigned work.",
    "guideSection": "6.11",
    "context": [
      "Show the saved literal Action ID, work required, observable completion criterion, assigned owner, due date or trigger and escalation owner.",
      "Show the recognizable source of the Action and any already recorded blocker. Do not ask the respondent to rewrite the assignment or its completion criterion.",
      "The answer updates only Blocker or dependency. Assignment, priority, status, verification, completion evidence, completion date and closure remain their current workflows."
    ]
  },
  {
    "id": "reg-b-record-identity",
    "title": "Identify the exact retained document or data",
    "audience": "The owner or custodian (the person or team managing the retained copy) of the selected artifact",
    "purpose": "Collect identity and provenance facts about one exact retained artifact or version so it can be found and distinguished from similar material.",
    "guideSection": "6.13",
    "context": [
      "Show the saved literal Record ID, selected Record type, known title and primary subject in ordinary words. Request one artifact or independently controlled version, not a whole evidence folder.",
      "Explain that a Record is a retained document, report, dataset, log or other artifact. A normal Register row is not another Record to register.",
      "Provide a permitted view of the exact artifact or its source metadata when available. Ask for missing facts only; reuse known title, origin, version and date.",
      "A changed version has a new Record identity under the existing workflow. These questions do not overwrite a retained version, change its owner or set its lifecycle."
    ]
  },
  {
    "id": "reg-b-record-custody",
    "title": "Explain where the artifact is kept and which rules already apply",
    "audience": "The appointed artifact custodian (the person or team managing the retained copy), with the relevant records or information-security owner when needed",
    "purpose": "Collect exact retrieval and preservation facts without asking the custodian to invent policies or disclose restricted content.",
    "guideSection": "6.13",
    "context": [
      "Show the selected artifact’s literal Record ID, title, exact version, owner and appointed custodian. Do not ask the respondent to assign themselves as owner or custodian.",
      "Show the organization’s existing approved access, retention and integrity rules relevant to this artifact, including exact policy or schedule versions and locators where available.",
      "Ask for existing facts only. Do not request passwords, access tokens, private data, restricted artifact contents or a full repository copy.",
      "If a rule or location has not been established, answer Pending with a brief reason. A form response cannot approve a new rule, change permissions, delete a record or establish evidence sufficiency."
    ]
  },
  {
    "id": "reg-b-link-context",
    "title": "Explain a proposed connection between two saved items",
    "audience": "The responsible owner of the substantive work represented by the selected proposed connection",
    "purpose": "Clarify the boundary of one already prepared relationship without asking a stakeholder to operate the Register’s technical linking rules.",
    "guideSection": "6.14",
    "context": [
      "Show both endpoint names, literal IDs and entity types, the allowed direction and relationship in ordinary language, and the current scope or basis if known.",
      "The operator supplies the retrieval reason and why one direct field is insufficient. Do not ask the owner to find or enter IDs.",
      "Show the exact period or supporting source if applicable. The response may propose boundary wording only; it cannot select a new endpoint or activate the Link.",
      "Direct pointers remain the simpler default. Do not send this question for relationships that are already clear and supported."
    ]
  }
]);
const profiles=freeze([
  {
    "id": "context",
    "sheet": "context",
    "groupIds": [
      "reg-a-context"
    ],
    "keys": [
      "item",
      "effect",
      "basis_summary"
    ],
    "contextKeys": [
      "type",
      "relevance",
      "rationale",
      "basis_record_id",
      "supersedes"
    ]
  },
  {
    "id": "risks",
    "sheet": "risks",
    "groupIds": [
      "reg-a-risks"
    ],
    "keys": [
      "title",
      "statement",
      "affected",
      "uncertainty"
    ],
    "contextKeys": [
      "type",
      "scope",
      "system_id",
      "assessment_record_id",
      "result",
      "result_basis",
      "evaluation",
      "governing_decision_id",
      "lifecycle",
      "supersedes"
    ]
  },
  {
    "id": "objective-proposal",
    "sheet": "objectives",
    "groupIds": [
      "reg-b-objective-proposal"
    ],
    "keys": [
      "statement",
      "measurability",
      "evaluation_method",
      "resources"
    ],
    "contextKeys": [
      "title",
      "scope",
      "policy_record_id",
      "policy_locator",
      "alignment",
      "governing_decision_id",
      "lifecycle",
      "supersedes"
    ]
  },
  {
    "id": "metric-definition",
    "sheet": "metrics",
    "groupIds": [
      "reg-b-metric-definition"
    ],
    "keys": [
      "definition",
      "unit",
      "data_source",
      "measurement_method"
    ],
    "contextKeys": [
      "name",
      "scope",
      "subject_type",
      "subject_id",
      "target",
      "effective_date",
      "lifecycle",
      "supersedes"
    ]
  },
  {
    "id": "metric-use",
    "sheet": "metrics",
    "groupIds": [
      "reg-b-metric-use"
    ],
    "keys": [
      "evaluation_method",
      "measurement_timing",
      "evaluation_timing"
    ],
    "contextKeys": [
      "name",
      "scope",
      "subject_type",
      "subject_id",
      "definition",
      "unit",
      "data_source",
      "measurement_method",
      "target",
      "effective_date",
      "lifecycle",
      "supersedes"
    ]
  },
  {
    "id": "action-blocker",
    "sheet": "actions",
    "groupIds": [
      "reg-b-action-blockers"
    ],
    "keys": [
      "blocker"
    ],
    "contextKeys": [
      "type",
      "source_type",
      "source_id",
      "work",
      "criterion",
      "due_date",
      "review_trigger",
      "escalation_owner",
      "status",
      "supersedes"
    ]
  },
  {
    "id": "record-metadata",
    "sheet": "records",
    "groupIds": [
      "reg-b-record-identity",
      "reg-b-record-custody"
    ],
    "keys": [
      "title",
      "origin",
      "location",
      "access",
      "retention",
      "integrity"
    ],
    "contextKeys": [
      "type",
      "subject_type",
      "subject_id",
      "version",
      "record_date",
      "effective_date",
      "coverage_start",
      "coverage_end",
      "validity_end",
      "lifecycle",
      "custody",
      "supersedes"
    ]
  },
  {
    "id": "link-context",
    "sheet": "links",
    "groupIds": [
      "reg-b-link-context"
    ],
    "keys": [
      "scope"
    ],
    "contextKeys": [
      "from_type",
      "from_id",
      "relationship",
      "to_type",
      "to_id",
      "effective_date",
      "end_date",
      "status",
      "supersedes"
    ]
  }
].map(p=>({...p,catalog:p.keys.map(key=>catalog.find(q=>q.profileId===p.id&&q.key===key))})));
const typeSheets=freeze({'AI system':'systems',Record:'records',Decision:'decisions',Action:'actions','Context item':'context',Requirement:'requirements','Risk or opportunity':'risks',Control:'controls',Objective:'objectives',Metric:'metrics','Assurance activity':'assurance',Finding:'findings'});
const projections=freeze({
Record:['type','title','version','record_date','lifecycle','custody','location'],
'AI system':['name','intended_purpose','business_process','organization_role','lifecycle_route','lifecycle_state','baseline_record_id'],
Decision:['type','subject_type','subject_id','scope','outcome','lifecycle'],
'Context item':['type','item','relevance'],Requirement:['summary','scope','applicability'],
'Risk or opportunity':['type','title','scope','lifecycle'],Control:['name','scope','applicability','lifecycle'],
Objective:['title','scope','lifecycle'],Metric:['name','scope','definition','unit','lifecycle'],
'Assurance activity':['purpose','scope','lifecycle'],Finding:['statement','scope','issue_state'],Action:['work','criterion','status']});
function fail(message){throw Object.assign(Error(message),{code:'owner-inputs-invalid'});}
function profileFor(value){const id=typeof value==='string'?value:value?.profile_id||value?.id;const p=profiles.find(p=>p.id===id);if(!p)fail('Unsupported Register owner question profile.');return p;}
function profileForSelection(sheet,keys){
 if(!Array.isArray(keys)||!keys.length||new Set(keys).size!==keys.length)fail('Choose at least one mapped question for this saved row.');
 if(sheet==='metrics'&&keys.some(k=>profiles[3].keys.includes(k))&&keys.some(k=>profiles[4].keys.includes(k)))fail('Send the definition questions and the results-use questions in separate forms. The results-use form needs the saved definition first.');
 const p=profiles.find(p=>p.sheet===sheet&&keys.every(k=>p.keys.includes(k)));
 if(!p||JSON.stringify(keys)!==JSON.stringify(p.keys.filter(k=>keys.includes(k))))fail('The selected questions are outside this closed Register form or its canonical order.');return p;
}
function catalogForSheet(sheet){return catalog.filter(q=>profileFor(q.profileId).sheet===sheet);}
function dependencySpecs(profile,values){
 const p=profileFor(profile),v=values,one=(slot,type,id)=>({slot,type:type||'',id:id||''});
 if(p.id==='context')return [one('basis_record','Record',v.basis_record_id)];
 if(p.id==='risks')return [one('system','AI system',v.system_id),one('assessment_record','Record',v.assessment_record_id),one('governing_decision','Decision',v.governing_decision_id)];
 if(p.id==='objective-proposal')return [one('policy_record','Record',v.policy_record_id),one('governing_decision','Decision',v.governing_decision_id)];
 if(['metric-definition','metric-use','record-metadata'].includes(p.id))return [one('subject',v.subject_type,v.subject_id)];
 if(p.id==='action-blocker')return [one('primary_source',v.source_type,v.source_id)];
 return [one('from',v.from_type,v.from_id),one('to',v.to_type,v.to_id)];
}
function dependency(snapshot,spec){
 const sheet=typeSheets[spec.type],fields=projections[spec.type]||[],rows=sheet==='systems'?snapshot.systems:snapshot.references?.[sheet];
 const row=spec.id&&sheet?(rows||[]).find(r=>(r.values.id||r.values.system_id)===spec.id):null;
 const status=!spec.id?'blank':!sheet?'unmanaged':!row?'missing':row.deleted_at?'deleted':'found';
 return {type:spec.type,id:spec.id,status,revision:row?row.revision:null,values:Object.fromEntries(fields.map(k=>[k,row?row.values[k]:'']))};
}
function subjectContext(snapshot,row,profile,options={}){
 const p=profileFor(profile),v=row?.values;if(!v||typeof v.id!=='string')fail('The selected saved Register row is missing.');
 const displayKey={context:'item',risks:'title',objectives:'title',metrics:'name',actions:'work',records:'title'}[p.sheet];
 const values=Object.fromEntries(p.contextKeys.map(k=>[k,v[k]]));
 return {display_name:(displayKey?v[displayKey]:v.id)||'',values,routing:{owner:v.owner||'',custodian:p.sheet==='records'?v.custodian||'':''},dependencies:Object.fromEntries(dependencySpecs(p,values).map(spec=>[spec.slot,dependency(snapshot,spec)])),preparation_basis:p.id==='link-context'?options.preparationBasis||'':''};
}
function eligibility(snapshot,row,profile,options={},classify=value=>String(value).trim()?'answer':'blank'){
 const p=profileFor(profile),v=row?.values;
 if(!v||row.deleted_at||!(snapshot.references?.[p.sheet]||[]).some(r=>r.values.id===v.id&&!r.deleted_at))return 'The selected saved row is missing or deleted. Restore its exact row before using answers.';
 if(p.id==='context'&&!['','Unknown','Under review','Relevant','Not relevant'].includes(v.relevance))return 'This Context row is historical or no longer eligible for an ordinary owner form.';
 if(p.id==='risks'&&!['','Open','Monitoring'].includes(v.lifecycle))return 'Use a current Open or Monitoring Risk or opportunity row for these contributions.';
 if(['objective-proposal','metric-definition','metric-use'].includes(p.id)&&v.lifecycle!=='Proposed')return 'Prepare these draft contributions on a Proposed '+(p.sheet==='objectives'?'Objective':'Metric')+' row.';
 if(p.id==='metric-use'&&['definition','unit','measurement_method'].some(k=>!v[k].trim()||classify(v[k])!=='answer'))return 'Save a readable definition, unit or result format, and measurement method before preparing the results-use questions.';
 if(p.id==='action-blocker'&&(!v.owner.trim()||v.owner.trim().toLowerCase()==='unassigned'||!['Planned','In progress','Blocked','Pending verification','Verification failed'].includes(v.status)))return 'Use a saved, assigned Action with current unfinished work for a blocker update.';
 if(p.id==='link-context'){
  if(v.status!=='Proposed')return 'Use a Proposed Link for this draft boundary contribution.';
  if(!R.isSourceLinkTriple(v))return 'This proposed Link has an unsupported direction. Correct its saved endpoints before preparing a form.';
  const deps=dependencySpecs(p,v).map(spec=>dependency(snapshot,spec));
  if(deps.some(d=>d.status!=='found'))return 'Both exact typed Link endpoints must exist and be available in the Register before preparing this form.';
  if(typeof options.preparationBasis!=='string'||!options.preparationBasis.trim())return 'Explain why this connection is needed before preparing the form.';
 }
 return '';
}
const shown=v=>typeof v==='string'&&v.trim()?v:'Not recorded';
function displayReference(d){
 if(d.status==='blank')return 'Not selected';
 if(d.status==='missing')return shown(d.type)+' · '+shown(d.id)+' (not found)';
 if(d.status==='unmanaged')return shown(d.type)+' · '+shown(d.id)+' (not managed in this Register)';
 const v=d.values,name=['name','title','item','summary','work','purpose','statement','type'].map(k=>v[k]).find(v=>typeof v==='string'&&v.trim());
 return shown(name)+' · '+d.id+(d.status==='deleted'?' (deleted)':'')+(d.type==='Record'?' · version '+shown(v.version):'');
}
function contextLines(q){
 const p=profileFor(q),c=q.subject_context,v=c.values,d=c.dependencies,out=[];
 if(q.organization_label.trim())out.push(['Organization',q.organization_label]);out.push(['Owner',shown(c.routing.owner)]);
 const add=(label,key)=>out.push([label,shown(v[key])]);
 if(p.id==='context'){add('Type','type');out.push(['Organization activity','Not separately recorded in this Context row; answer for the issue or group shown.']);if(d.basis_record.status!=='blank')out.push(['Basis reference',displayReference(d.basis_record)]);}
 if(p.id==='risks'){add('Type','type');add('Scope','scope');out.push(['Related system',displayReference(d.system)]);for(const key of ['result','result_basis','evaluation'])if(v[key].trim())add(R.fields.risks.find(f=>f[0]===key)[1],key);if(d.assessment_record.status!=='blank'){out.push(['Assessment reference',displayReference(d.assessment_record)],['Assessment summary','The reference identifies metadata only. No assessment summary is supplied in this form.']);}else out.push(['Assessment summary','No saved assessment is supplied in this form.']);}
 if(p.id==='objective-proposal'){add('Scope','scope');add('Lifecycle','lifecycle');out.push(['Policy reference',displayReference(d.policy_record)+(v.policy_locator.trim()?' · '+v.policy_locator:'')]);}
 if(p.sheet==='metrics'){add('Scope','scope');add('Lifecycle','lifecycle');out.push(['Primary subject',displayReference(d.subject)]);if(p.id==='metric-use')for(const [label,key]of [['What is measured','definition'],['Unit or result format','unit'],['Primary data source','data_source'],['Measurement method','measurement_method']])add(label,key);}
 if(p.id==='action-blocker'){for(const [label,key]of [['Work required','work'],['Completion criterion','criterion'],['Due date','due_date'],['Trigger','review_trigger'],['Escalation owner','escalation_owner'],['Status','status']])add(label,key);out.push(['Source',displayReference(d.primary_source)]);}
 if(p.id==='record-metadata'){add('Record type','type');add('Version','version');out.push(['Custodian',shown(c.routing.custodian)]);add('Lifecycle','lifecycle');out.push(['Primary subject',displayReference(d.subject)],['Existing rules','The custodian reports the existing applicable rules. Rules not recorded in OWL are not supplied by this form.']);}
 if(p.id==='link-context'){out.push(['From',displayReference(d.from)]);add('Relationship','relationship');out.push(['To',displayReference(d.to)],['Why this connection is needed',c.preparation_basis]);add('Status','status');if(v.effective_date.trim()||v.end_date.trim())out.push(['Period',shown(v.effective_date)+' / '+shown(v.end_date)]);}
 for(const group of groups.filter(g=>q.field_keys.some(k=>p.catalog.find(q=>q.key===k).groupId===g.id)))out.push(['',group.title],['Who can answer',group.audience]);
 if(['context','risks','objective-proposal','record-metadata','link-context'].includes(p.id))out.push(['','Source text is not included in this form.']);return out;
}
function readonlyCells(q,helpers){
 const p=profileFor(q),{LF,instructions,returnInstruction,footer}=helpers;
 const lines=contextLines(q).map(([label,value])=>label?label+': '+value:value);
 const out=[['B2','Owner questions'],['B4','Saved '+R.labels[p.sheet]+' item: '+(q.subject_context.display_name||'Name not recorded')],['B5','ID: '+q.target.id],['B6',lines.join('\n')],['B7',instructions],['B8',returnInstruction],['B10','Answered by'],['B11','Your name'],['B13','Role or team (optional)']];
 q.field_keys.forEach((key,i)=>{const question=p.catalog.find(q=>q.key===key),row=16+8*i,savedAnswer='Saved answer: '+(q.base_values[key]||'No saved answer')+(q.context[key]?.previousReply?'\nPrevious unfinished reply: '+q.context[key].previousReply:''),help=[question.help,'What to enter: '+question.expected,question.mode==='draft'?'Proposed wording or arrangement for review.':'Information about the organization’s actual situation.',savedAnswer].join('\n\n');out.push(['B'+row,(i+1)+'. '+question.question],['B'+(row+1),help],['B'+(row+2),'Example 1 (fictional): '+question.examples[0]],['B'+(row+3),'Example 2 (fictional): '+question.examples[1]],['B'+(row+4),'Partial answer example (fictional): '+question.pendingExample],['B'+(row+5),'Your answer']);});
 out.push(['B'+(16+8*q.field_keys.length),footer+'\nRequest: '+q.token]);return out.map(([address,value])=>[address,LF(value)]);
}
const nativeFieldOrder=sheet=>R.fields[sheet].map(f=>f[0]);
return Object.freeze({catalog,groups,profiles,profileFor,profileForSelection,catalogForSheet,dependencySpecs,dependency,subjectContext,eligibility,projections,typeSheets,contextLines,readonlyCells,displayReference,shown,nativeFieldOrder});
});
