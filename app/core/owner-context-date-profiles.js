/* Closed remaining Register owner profiles. Exact accepted catalogue f5675da1; new recipe only. */
(function(root,factory){const node=typeof module==="object"&&module.exports;const api=factory(node?require("./reference-schema.js"):root.OWLReferenceSchema,node?require("./saved-text.js"):root.OWLSavedText,node?require("./owner-register-profiles.js"):root.OWLOwnerRegisterProfiles);if(node)module.exports=api;else root.OWLOwnerContextDateProfiles=api;})(globalThis,function(R,T,P){
"use strict";
const freeze=v=>{if(v&&typeof v==="object"){Object.values(v).forEach(freeze);Object.freeze(v);}return v;};
const catalog=freeze([
  {
    "id": "reg-a-requirement-summary",
    "field": "summary",
    "label": "Requirement summary",
    "locator": "Requirements!F10",
    "question": "What does this source require or commit the organization to do?",
    "help": "Use the source passage shown with this question. In one or two sentences, state one obligation or commitment, who must act and what they must do. Keep conditions that change its meaning. Do not copy a long passage. If the source is unclear, explain that in Pending.",
    "examples": [
      "The organization must tell the customer before using an external AI service to process the customer’s confidential project information.",
      "The organization commits to give staff a contact point for reporting unexpected behavior from approved AI tools."
    ],
    "pendingExample": "Pending: the organization needs the contract owner to clarify whether the notification requirement covers all external services or only named suppliers.",
    "mode": "draft",
    "condition": "Ask only after the exact retained source, version and locator are selected and an authorized readable source passage or reviewed source brief is available. Send to the person competent to explain that source.",
    "expected": "One obligation or commitment, with the important conditions kept clear. The responsible reviewer checks it against the named source.",
    "key": "summary",
    "column": "F",
    "hint": "Use the source passage shown with this question. In one or two sentences, state one obligation or commitment, who must act and what they must do. Keep conditions that change its meaning. Do not copy a long passage. If the source is unclear, explain that in Pending.",
    "partial": "Pending: the organization needs the contract owner to clarify whether the notification requirement covers all external services or only named suppliers.",
    "groupId": "reg-a-requirements",
    "profileId": "requirement-source"
  },
  {
    "id": "reg-a-requirement-scope",
    "field": "scope",
    "label": "Applicability scope",
    "locator": "Requirements!H10",
    "question": "Which people, activities, systems or locations does this requirement cover?",
    "help": "Describe the boundary stated by the source or proposed for review. Include any relevant contract, country, process, system or exception. Use names people recognize. Say what is uncertain rather than choosing the broadest boundary.",
    "examples": [
      "The organization’s project teams handling this customer’s confidential information under the named service contract. The condition covers external AI services used for that work.",
      "The organization’s employees and contractors using approved AI tools for internal work. It does not cover tools used privately outside their work."
    ],
    "pendingExample": "Pending: the organization is checking whether the requirement also covers subcontractors.",
    "mode": "draft",
    "condition": "Ask alongside the selected source requirement and its readable brief. The responsible contract, legal, policy or process owner supplies the boundary within their competence.",
    "expected": "A proposed exact scope description. Applicability, exclusions, rationale and the route through the AI management system remain in the Requirements review workflow.",
    "key": "scope",
    "column": "H",
    "hint": "Describe the boundary stated by the source or proposed for review. Include any relevant contract, country, process, system or exception. Use names people recognize. Say what is uncertain rather than choosing the broadest boundary.",
    "partial": "Pending: the organization is checking whether the requirement also covers subcontractors.",
    "groupId": "reg-a-requirements",
    "profileId": "requirement-source"
  },
  {
    "id": "reg-b-review-purpose",
    "field": "purpose",
    "label": "Purpose",
    "locator": "Assurance!D10",
    "question": "According to the agreed plan, what question will this review or evaluation examine?",
    "help": "Use the plan provided above. Describe the question or intended examination in plain language. Do not turn it into a favorable conclusion or change what the review was authorized to examine.",
    "examples": [
      "The organization will examine whether staff who use approved AI tools received the required guidance before access was granted, as set out in the agreed internal audit plan.",
      "The organization will review whether the revised complaint-handling steps address the recurring gaps identified in the previous review, as specified in the corrective-action effectiveness review plan."
    ],
    "pendingExample": "Pending — the activity lead is waiting for the agreed plan to confirm the question this review should examine.",
    "mode": "fact",
    "condition": "Use only for an already agreed organization-controlled activity with an accessible authoritative plan or equivalent approved basis. Missing authorization stays in the planning workflow.",
    "expected": "A short, faithful statement of the authorized question or examination. It does not record an outcome or create review authority.",
    "key": "purpose",
    "column": "D",
    "hint": "Use the plan provided above. Describe the question or intended examination in plain language. Do not turn it into a favorable conclusion or change what the review was authorized to examine.",
    "partial": "Pending — the activity lead is waiting for the agreed plan to confirm the question this review should examine.",
    "groupId": "reg-b-review-plan-facts",
    "profileId": "assurance-activity"
  },
  {
    "id": "reg-b-review-scope",
    "field": "scope",
    "label": "Scope",
    "locator": "Assurance!E10",
    "question": "Which parts of the organization and which period does this activity cover?",
    "help": "State the teams, processes, systems, locations or controls included and the period being examined. Include an explicit exclusion if it matters. Report the agreed scope rather than expanding it to the whole organization.",
    "examples": [
      "The organization’s internal audit covers AI-tool access granted to permanent staff in the central office from January to March 2026. Contractor access and supplier-operated tools are excluded under the agreed plan.",
      "The organization’s review covers the revised complaint-handling process used by both service teams during the first six weeks after the new procedure took effect. It examines the identified response gaps and excludes unrelated billing complaints."
    ],
    "pendingExample": "Pending — the agreed plan does not yet identify the teams or period this activity will cover.",
    "mode": "fact",
    "condition": "Use for the exact scope of an agreed activity. A material rescope must be handled by its authorized planning workflow, not silently applied from a reply.",
    "expected": "One concise boundary with included work and represented period, plus material exclusions.",
    "key": "scope",
    "column": "E",
    "hint": "State the teams, processes, systems, locations or controls included and the period being examined. Include an explicit exclusion if it matters. Report the agreed scope rather than expanding it to the whole organization.",
    "partial": "Pending — the agreed plan does not yet identify the teams or period this activity will cover.",
    "groupId": "reg-b-review-plan-facts",
    "profileId": "assurance-activity"
  },
  {
    "id": "reg-b-review-planned-start",
    "field": "planned_start",
    "label": "Planned start",
    "locator": "Assurance!K10",
    "question": "What start date is recorded in the agreed activity plan?",
    "help": "Enter the real agreed calendar date as YYYY-MM-DD. Use the latest authorized plan provided above. A planned date does not say that the work has started. If no date is agreed, answer Pending and briefly explain the reason in this same answer box.",
    "examples": [
      "2026-10-26",
      "2026-11-09"
    ],
    "pendingExample": "Pending — the organization has not agreed the start date; the activity lead is confirming availability.",
    "mode": "fact",
    "condition": "Use only when the plan or authorized scheduling process supplies a real planned start date. Do not infer it from the form date or the planned end.",
    "expected": "A real agreed date in YYYY-MM-DD format, or Pending with a short reason. The fictional context is guidance, not text to copy beside a known date.",
    "exampleContexts": [
      "The organization’s internal audit is scheduled to start on 26 October 2026.",
      "The organization’s management-review preparation is scheduled to begin on 9 November 2026."
    ],
    "key": "planned_start",
    "column": "K",
    "hint": "Enter the real agreed calendar date as YYYY-MM-DD. Use the latest authorized plan provided above. A planned date does not say that the work has started. If no date is agreed, answer Pending and briefly explain the reason in this same answer box.",
    "partial": "Pending — the organization has not agreed the start date; the activity lead is confirming availability.",
    "groupId": "reg-b-review-plan-facts",
    "profileId": "assurance-activity"
  },
  {
    "id": "reg-b-review-planned-end",
    "field": "planned_end",
    "label": "Planned end",
    "locator": "Assurance!L10",
    "question": "What completion or reporting date is recorded in the agreed activity plan?",
    "help": "Enter the agreed calendar date as YYYY-MM-DD. Follow the plan’s definition of completion or reporting. Do not replace a missed deadline merely to remove a warning. If the date is not agreed, answer Pending and explain what still needs to be confirmed in this same answer box.",
    "examples": [
      "2026-10-30",
      "2026-11-20"
    ],
    "pendingExample": "Pending — the organization has not agreed the activity’s planned completion or reporting date.",
    "mode": "fact",
    "condition": "Use only when the authoritative plan supplies the date. A revised schedule requires the normal authorized change process.",
    "expected": "The agreed planned date in YYYY-MM-DD format, or Pending with a short reason. It is a planned date, not an actual completion claim.",
    "exampleContexts": [
      "The organization’s internal audit plan schedules completion and reporting for 30 October 2026.",
      "The organization’s management-review plan schedules the final meeting record for 20 November 2026."
    ],
    "key": "planned_end",
    "column": "L",
    "hint": "Enter the agreed calendar date as YYYY-MM-DD. Follow the plan’s definition of completion or reporting. Do not replace a missed deadline merely to remove a warning. If the date is not agreed, answer Pending and explain what still needs to be confirmed in this same answer box.",
    "partial": "Pending — the organization has not agreed the activity’s planned completion or reporting date.",
    "groupId": "reg-b-review-plan-facts",
    "profileId": "assurance-activity"
  },
  {
    "id": "reg-b-review-actual-start",
    "field": "actual_start",
    "label": "Actual start",
    "locator": "Assurance!M10",
    "question": "On what date did this activity actually begin?",
    "help": "Use the activity log or another actual record of the work. Enter YYYY-MM-DD. If work has not started or its recorded start is unknown, answer Pending and explain the reason in this same answer box. Do not copy the planned start date.",
    "examples": [
      "2026-06-08",
      "2026-07-14"
    ],
    "pendingExample": "Pending — the organization has not started the activity, so there is no actual start date to report.",
    "mode": "fact",
    "condition": "Use only after work on the exact activity has actually begun and the lead can report its recorded date.",
    "expected": "The actual start date in YYYY-MM-DD format, or Pending with a short reason. Planned dates and preparation unrelated to this activity are not substitutes.",
    "exampleContexts": [
      "The organization’s internal audit began on 8 June 2026, as recorded in its audit activity log.",
      "The organization’s corrective-action effectiveness review began on 14 July 2026, when the first planned evidence examination took place."
    ],
    "key": "actual_start",
    "column": "M",
    "hint": "Use the activity log or another actual record of the work. Enter YYYY-MM-DD. If work has not started or its recorded start is unknown, answer Pending and explain the reason in this same answer box. Do not copy the planned start date.",
    "partial": "Pending — the organization has not started the activity, so there is no actual start date to report.",
    "groupId": "reg-b-review-actual-facts",
    "profileId": "assurance-activity"
  },
  {
    "id": "reg-b-review-actual-end",
    "field": "actual_end",
    "label": "Actual end",
    "locator": "Assurance!N10",
    "question": "On what date did the defined activity actually finish?",
    "help": "Use the completion event defined by the activity plan and the actual activity record. Enter YYYY-MM-DD. If examination, required reporting or other defined work is still underway, answer Pending and describe what remains in this same answer box.",
    "examples": [
      "2026-06-12",
      "2026-07-28"
    ],
    "pendingExample": "Pending — the organization has finished evidence collection but the activity’s defined reporting step is still underway.",
    "mode": "fact",
    "condition": "Use only when the exact defined activity has actually completed. Do not infer completion from a meeting date, planned end or availability of a draft report.",
    "expected": "The actual completion date in YYYY-MM-DD format, or Pending with a short reason. Do not substitute a planned end date.",
    "exampleContexts": [
      "The organization’s audit activity record confirms that the defined audit and reporting work finished on 12 June 2026.",
      "The organization’s effectiveness review record confirms that the planned examination and final review record were completed on 28 July 2026."
    ],
    "key": "actual_end",
    "column": "N",
    "hint": "Use the completion event defined by the activity plan and the actual activity record. Enter YYYY-MM-DD. If examination, required reporting or other defined work is still underway, answer Pending and describe what remains in this same answer box.",
    "partial": "Pending — the organization has finished evidence collection but the activity’s defined reporting step is still underway.",
    "groupId": "reg-b-review-actual-facts",
    "profileId": "assurance-activity"
  },
  {
    "id": "reg-b-review-evidence-cutoff",
    "field": "evidence_cutoff",
    "label": "Evidence cut-off",
    "locator": "Assurance!O10",
    "question": "What is the last date or time through which this activity considered evidence?",
    "help": "Copy the evidence cut-off recorded by the reviewer or agreed method. This is the boundary of information considered, which may be earlier than completion or report issue. For a timestamp, retain the stated time zone or UTC offset. If the exact boundary is not recorded, use Pending with a brief reason rather than today’s date.",
    "examples": [
      "2026-05-31",
      "2026-07-24T17:00:00+08:00"
    ],
    "pendingExample": "Pending — the activity lead is confirming the evidence cut-off used in the review record.",
    "mode": "fact",
    "condition": "Use only when the reviewer’s method or retained activity result supplies the exact evidence cut-off. Do not infer it from start, end or report dates.",
    "expected": "The exact recorded date in YYYY-MM-DD or the recorded timestamp including its supplied offset, or Pending with a short reason. Do not normalize a timestamp or append explanatory prose to a known date/time value.",
    "exampleContexts": [
      "The organization’s June audit considered evidence through 31 May 2026 even though audit work finished later.",
      "The organization’s review considered evidence received through 5 pm on 24 July 2026 at UTC+08:00; the exact offset remains part of the value."
    ],
    "key": "evidence_cutoff",
    "column": "O",
    "hint": "Copy the evidence cut-off recorded by the reviewer or agreed method. This is the boundary of information considered, which may be earlier than completion or report issue. For a timestamp, retain the stated time zone or UTC offset. If the exact boundary is not recorded, use Pending with a brief reason rather than today’s date.",
    "partial": "Pending — the activity lead is confirming the evidence cut-off used in the review record.",
    "groupId": "reg-b-review-actual-facts",
    "profileId": "assurance-activity"
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
    "profileId": "record-details"
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
    "profileId": "record-details"
  },
  {
    "id": "reg-b-record-version",
    "field": "version",
    "label": "Version or identifier",
    "locator": "Records!J10",
    "question": "Which exact version, release number or other source identifier belongs to this artifact?",
    "help": "Copy the version, report number, release or build identifier on the retained item. If it truly has no assigned version or identifier, use the suite’s Not assigned value. Do not guess a number from the filename or replace the selected Record with the latest version.",
    "examples": [
      "1.2",
      "REPORT-2026-07-018"
    ],
    "pendingExample": "Pending — the organization’s custodian is comparing the retained copy with its source metadata to confirm its exact identifier.",
    "mode": "fact",
    "condition": "Use for the exact retained artifact or version. A new version receives a new Record ID through the existing workflow.",
    "expected": "The exact source version or identifier, Not assigned if the source genuinely has none, or Pending with a short reason if it is still unresolved.",
    "exampleContexts": [
      "The organization’s retained guidance document states version 1.2 on its cover.",
      "The supplier’s report carries this report number instead of a separate version number."
    ],
    "key": "version",
    "column": "J",
    "hint": "Copy the version, report number, release or build identifier on the retained item. If it truly has no assigned version or identifier, use the suite’s Not assigned value. Do not guess a number from the filename or replace the selected Record with the latest version.",
    "partial": "Pending — the organization’s custodian is comparing the retained copy with its source metadata to confirm its exact identifier.",
    "groupId": "reg-b-record-identity",
    "profileId": "record-details"
  },
  {
    "id": "reg-b-record-date",
    "field": "record_date",
    "label": "Record date",
    "locator": "Records!K10",
    "question": "What issue, completion, generation or formal recording date belongs to this artifact?",
    "help": "Use the date appropriate to this artifact’s source process, such as the report issue date or dataset export date. Enter YYYY-MM-DD. This is not the date you received the form or the date the artifact becomes effective. If the date is unknown, answer Pending and briefly explain what still needs to be confirmed in this same answer box.",
    "examples": [
      "2026-06-18",
      "2026-07-31"
    ],
    "pendingExample": "Pending — the organization’s custodian cannot yet confirm the artifact’s issue or generation date from the retained copy.",
    "mode": "fact",
    "condition": "Use only when the exact retained artifact or its source metadata supplies the relevant real date. Preserve an unresolved date instead of estimating it.",
    "expected": "A real date in YYYY-MM-DD format, or Pending with a short reason when that date is still unknown.",
    "exampleContexts": [
      "The organization’s retained audit report was issued on 18 June 2026.",
      "The organization’s retained monthly dataset export was generated on 31 July 2026."
    ],
    "key": "record_date",
    "column": "K",
    "hint": "Use the date appropriate to this artifact’s source process, such as the report issue date or dataset export date. Enter YYYY-MM-DD. This is not the date you received the form or the date the artifact becomes effective. If the date is unknown, answer Pending and briefly explain what still needs to be confirmed in this same answer box.",
    "partial": "Pending — the organization’s custodian cannot yet confirm the artifact’s issue or generation date from the retained copy.",
    "groupId": "reg-b-record-identity",
    "profileId": "record-details"
  },
  {
    "id": "reg-b-record-effective",
    "field": "effective_date",
    "label": "Effective date",
    "locator": "Records!L10",
    "question": "If this artifact has a stated effective date, when does it begin to apply?",
    "help": "Copy the effective date stated by the issued artifact or its authoritative issue instruction, using YYYY-MM-DD. Do not use the publication date unless the source explicitly makes them the same. If the relevant date is still unknown, answer Pending and briefly explain the gap in this same answer box.",
    "examples": [
      "2026-07-01",
      "2026-09-15"
    ],
    "pendingExample": "Pending — the organization’s artifact owner is confirming when the issued document begins to apply.",
    "mode": "fact",
    "condition": "Ask only for an artifact that has a stated governing effective date. Datasets and ordinary historical evidence may have no such date.",
    "expected": "The stated effective date in YYYY-MM-DD format, or Pending with a short reason. If the artifact has no effective-date role, this question should not be selected.",
    "exampleContexts": [
      "The organization’s staff guidance was issued in June but its issue instruction states an effective date of 1 July 2026.",
      "The organization’s revised service procedure states that it applies from 15 September 2026."
    ],
    "key": "effective_date",
    "column": "L",
    "hint": "Copy the effective date stated by the issued artifact or its authoritative issue instruction, using YYYY-MM-DD. Do not use the publication date unless the source explicitly makes them the same. If the relevant date is still unknown, answer Pending and briefly explain the gap in this same answer box.",
    "partial": "Pending — the organization’s artifact owner is confirming when the issued document begins to apply.",
    "groupId": "reg-b-record-period",
    "profileId": "record-details"
  },
  {
    "id": "reg-b-record-coverage-start",
    "field": "coverage_start",
    "label": "Coverage start",
    "locator": "Records!M10",
    "question": "If this artifact represents a period, what is the first date in that period?",
    "help": "Use the period actually stated in the report, log or dataset, in YYYY-MM-DD format. This is the start of represented information, not the date the file was created. If the period’s first date is still unknown, answer Pending and explain what needs checking in this same answer box.",
    "examples": [
      "2026-04-01",
      "2026-07-06"
    ],
    "pendingExample": "Pending — the organization’s custodian is checking which period the retained data actually covers.",
    "mode": "fact",
    "condition": "Ask only for an artifact that represents a defined period and whose exact first date is stated or confirmed by its authoritative metadata.",
    "expected": "The represented period’s start date in YYYY-MM-DD format, or Pending with a short reason. Do not infer coverage from the filename or Record date.",
    "exampleContexts": [
      "The organization’s second-quarter access report represents events from 1 April 2026.",
      "The organization’s one-week review sample begins with cases received on 6 July 2026."
    ],
    "key": "coverage_start",
    "column": "M",
    "hint": "Use the period actually stated in the report, log or dataset, in YYYY-MM-DD format. This is the start of represented information, not the date the file was created. If the period’s first date is still unknown, answer Pending and explain what needs checking in this same answer box.",
    "partial": "Pending — the organization’s custodian is checking which period the retained data actually covers.",
    "groupId": "reg-b-record-period",
    "profileId": "record-details"
  },
  {
    "id": "reg-b-record-coverage-end",
    "field": "coverage_end",
    "label": "Coverage end",
    "locator": "Records!N10",
    "question": "If this artifact represents a period, what is the last date in that period?",
    "help": "Copy the last represented date in YYYY-MM-DD format. A blank end does not mean continuing coverage. If the last date is still unknown, answer Pending and briefly explain the gap in this same answer box. Do not imply that a retained snapshot includes later events.",
    "examples": [
      "2026-06-30",
      "2026-07-12"
    ],
    "pendingExample": "Pending — the organization’s custodian has not confirmed the last date represented by this artifact.",
    "mode": "fact",
    "condition": "Ask only for an artifact with a defined represented period. Unclear or unstated coverage remains Pending, not an assumed open-ended period.",
    "expected": "The represented period’s end date in YYYY-MM-DD format, consistent with the source and the corresponding start date, or Pending with a short reason.",
    "exampleContexts": [
      "The organization’s second-quarter access report ends with events on 30 June 2026; it provides no coverage for July.",
      "The organization’s one-week review sample ends with cases received on 12 July 2026."
    ],
    "key": "coverage_end",
    "column": "N",
    "hint": "Copy the last represented date in YYYY-MM-DD format. A blank end does not mean continuing coverage. If the last date is still unknown, answer Pending and briefly explain the gap in this same answer box. Do not imply that a retained snapshot includes later events.",
    "partial": "Pending — the organization’s custodian has not confirmed the last date represented by this artifact.",
    "groupId": "reg-b-record-period",
    "profileId": "record-details"
  },
  {
    "id": "reg-b-record-validity",
    "field": "validity_end",
    "label": "Validity end",
    "locator": "Records!O10",
    "question": "If the source states a date after which this artifact needs renewed review or cannot be relied on as current, what is that date?",
    "help": "Copy a real validity end date stated by the artifact or its governing source, using YYYY-MM-DD. Do not calculate an expiry from a generic retention period or assume every artifact expires. If the date is relevant but still unknown, answer Pending and briefly explain what needs confirming in this same answer box.",
    "examples": [
      "2027-06-30",
      "2026-12-31"
    ],
    "pendingExample": "Pending — the organization’s artifact owner is confirming whether the source states a validity end date.",
    "mode": "fact",
    "condition": "Ask only when the artifact or governing source explicitly supplies a calendar validity end. An unstated limit or event-based limit is not converted into a date.",
    "expected": "The explicit source date in YYYY-MM-DD format, or Pending with a short reason when that date is still unresolved.",
    "exampleContexts": [
      "The organization’s supplier qualification statement explicitly remains current through 30 June 2027.",
      "The organization’s retained competence certificate states a validity end of 31 December 2026."
    ],
    "key": "validity_end",
    "column": "O",
    "hint": "Copy a real validity end date stated by the artifact or its governing source, using YYYY-MM-DD. Do not calculate an expiry from a generic retention period or assume every artifact expires. If the date is relevant but still unknown, answer Pending and briefly explain what needs confirming in this same answer box.",
    "partial": "Pending — the organization’s artifact owner is confirming whether the source states a validity end date.",
    "groupId": "reg-b-record-period",
    "profileId": "record-details"
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
    "profileId": "record-details"
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
    "profileId": "record-details"
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
    "profileId": "record-details"
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
    "profileId": "record-details"
  }
]);
const groups=freeze([
  {
    "id": "reg-a-requirements",
    "title": "Explain one obligation and its boundary",
    "artifact": "AIMS-Governance-Register.xlsx",
    "sheet": "Requirements",
    "guideSection": "§6.4",
    "audience": "The responsible contract, policy, legal, regulatory or source owner with competence to explain the selected source. Other stakeholders should be asked for relevant facts, not an interpretation outside their role.",
    "purpose": "Prepare one understandable draft obligation and scope for the Requirements owner’s review.",
    "context": [
      "Selected Requirement ID, source type and current summary.",
      "Exact retained source title, version and precise clause, article, section or equivalent locator.",
      "A readable authorized passage or reviewed plain source brief that preserves conditions. If unavailable, keep this form unprepared.",
      "Known organization, contract, process, system or jurisdiction facts relevant to this source. Do not send unrelated restricted source material."
    ]
  },
  {
    "id": "reg-b-review-plan-facts",
    "title": "Confirm the agreed review activity",
    "artifact": "AIMS-Governance-Register.xlsx",
    "sheet": "Assurance",
    "guideSection": "6.9",
    "audience": "The appointed lead or coordinator of the organization-controlled review, audit or evaluation activity",
    "purpose": "Collect the purpose, boundary and dates already set by the activity plan without asking the lead to approve a new review.",
    "context": [
      "Show the saved activity name or type, literal Assurance ID, appointed lead and relevant governing and activity-plan titles, exact versions and accessible plan sections.",
      "Explain the type in ordinary words, for example an internal audit, a management review or an evaluation. External audit reports are retained Records, not organization-controlled activities to create here.",
      "Reuse the agreed purpose, scope and dates already recorded. Ask only for missing facts or an authorized change supported by the existing plan process.",
      "The respondent reports what the agreed plan says. Changes to the activity type, authority, plan pointers, competence, independence and lifecycle remain their existing workflows."
    ]
  },
  {
    "id": "reg-b-review-actual-facts",
    "title": "Report when the activity actually happened",
    "artifact": "AIMS-Governance-Register.xlsx",
    "sheet": "Assurance",
    "guideSection": "6.9",
    "audience": "The activity lead or the person maintaining its actual activity record",
    "purpose": "Collect actual dates and the evidence boundary after work has happened while keeping the result and formal completion separate.",
    "context": [
      "Show the exact activity ID, type, purpose, scope, planned dates and agreed definition of completion.",
      "Show the accessible actual activity record or issued report that supplies these facts, including its exact version. Ask only about this activity, not all reviews.",
      "Answer Pending with a short reason in the same answer box when a relevant date is unresolved. Actual end is conditional on completion of the defined activity; it is not the date someone filled this form.",
      "An answer does not issue a report, establish competence or independence, mark the activity Complete or say that its result was favorable."
    ]
  },
  {
    "id": "reg-b-record-identity",
    "title": "Identify the exact retained document or data",
    "artifact": "AIMS-Governance-Register.xlsx",
    "sheet": "Records",
    "guideSection": "6.13",
    "audience": "The owner or custodian (the person or team managing the retained copy) of the selected artifact",
    "purpose": "Collect identity and provenance facts about one exact retained artifact or version so it can be found and distinguished from similar material.",
    "context": [
      "Show the saved literal Record ID, selected Record type, known title and primary subject in ordinary words. Request one artifact or independently controlled version, not a whole evidence folder.",
      "Explain that a Record is a retained document, report, dataset, log or other artifact. A normal Register row is not another Record to register.",
      "Provide a permitted view of the exact artifact or its source metadata when available. Ask for missing facts only; reuse known title, origin, version and date.",
      "A changed version has a new Record identity under the existing workflow. These questions do not overwrite a retained version, change its owner or set its lifecycle."
    ]
  },
  {
    "id": "reg-b-record-period",
    "title": "Confirm dates stated by this artifact",
    "artifact": "AIMS-Governance-Register.xlsx",
    "sheet": "Records",
    "guideSection": "6.13",
    "audience": "The artifact owner or responsible custodian (the person or team managing retained records)",
    "purpose": "Collect only the dates explicitly supplied by the exact artifact or its governing source. Conditional dates remain absent when they do not apply.",
    "context": [
      "Show the literal Record ID, artifact title, origin, exact version and current date metadata. Show the source section that states these dates when it is accessible.",
      "Explain the difference: Record date identifies the artifact event, Effective date says when it starts to govern, Coverage dates say what period it represents, and Validity end limits current reliance.",
      "Ask only the dates relevant to this kind of artifact. These dates are not automatically copied from today, from each other or from a newer version.",
      "Do not select a date question that does not apply to the artifact. If a selected date is still unresolved, put Pending and a brief reason in its same answer box."
    ]
  },
  {
    "id": "reg-b-record-custody",
    "title": "Explain where the artifact is kept and which rules already apply",
    "artifact": "AIMS-Governance-Register.xlsx",
    "sheet": "Records",
    "guideSection": "6.13",
    "audience": "The appointed artifact custodian (the person or team managing the retained copy), with the relevant records or information-security owner when needed",
    "purpose": "Collect exact retrieval and preservation facts without asking the custodian to invent policies or disclose restricted content.",
    "context": [
      "Show the selected artifact’s literal Record ID, title, exact version, owner and appointed custodian. Do not ask the respondent to assign themselves as owner or custodian.",
      "Show the organization’s existing approved access, retention and integrity rules relevant to this artifact, including exact policy or schedule versions and locators where available.",
      "Ask for existing facts only. Do not request passwords, access tokens, private data, restricted artifact contents or a full repository copy.",
      "If a rule or location has not been established, answer Pending with a brief reason. A form response cannot approve a new rule, change permissions, delete a record or establish evidence sufficiency."
    ]
  }
]);
const RECIPE='owner-register-context-date-1';
const profiles=freeze([
 {id:'requirement-source',sheet:'requirements',keys:['summary','scope'],contextKeys:['source_type','source_record_id','source_locator','origin_context_id','applicability','aims_route','supersedes'],groupIds:['reg-a-requirements']},
 {id:'assurance-activity',sheet:'assurance',keys:['purpose','scope','planned_start','planned_end','actual_start','actual_end','evidence_cutoff'],contextKeys:['type','governing_plan_record_id','activity_plan_record_id','competence_record_id','independence_record_id','result_record_id','lifecycle','review_trigger','supersedes'],groupIds:['reg-b-review-plan-facts','reg-b-review-actual-facts']},
 {id:'record-details',sheet:'records',keys:['title','origin','version','record_date','effective_date','coverage_start','coverage_end','validity_end','location','access','retention','integrity'],contextKeys:['type','subject_type','subject_id','lifecycle','custody','supersedes'],groupIds:['reg-b-record-identity','reg-b-record-period','reg-b-record-custody']}
].map(p=>({...p,catalog:p.keys.map(k=>catalog.find(q=>q.profileId===p.id&&q.key===k))})));
const oldRecordKeys=freeze(['title','origin','location','access','retention','integrity']);
const sourceProjection=freeze(['type','title','version','record_date','effective_date','coverage_start','coverage_end','validity_end','origin','lifecycle','custody','location','access']);
const resultProjection=freeze(['type','title','version','record_date','coverage_start','coverage_end','lifecycle','custody','location']);
const activityKeys=freeze(['purpose','scope','planned_start','planned_end']);
const dateKeys=freeze(['planned_start','planned_end','actual_start','actual_end','record_date','effective_date','coverage_start','coverage_end']);
const own=(o,k)=>Object.prototype.hasOwnProperty.call(o,k),plain=o=>o!==null&&typeof o==='object'&&!Array.isArray(o),exact=(o,keys)=>plain(o)&&Object.keys(o).length===keys.length&&keys.every(k=>own(o,k));
const clone=v=>JSON.parse(JSON.stringify(v)),LF=v=>v.replace(/\r\n|\r/g,'\n');
function fail(message,field='',code='owner-inputs-invalid'){throw Object.assign(Error(message),{field,code});}
function text(v,field='context'){T.checkText(v,{kind:'owner input',id:'saved request',field});return v;}
function rawText(v,field='context'){if(typeof v!=='string'||v.length>12000)fail(field+' exceeds 12,000 UTF-16 units.',field,'owner-inputs-capacity');let part='';for(const scalar of v){if(part.length+scalar.length>2000){text(part,field);part='';}part+=scalar;}text(part,field);return v;}
function classify(v){const s=String(v).trim();if(!s)return 'blank';if(/^(?:[-*•]\s*)?(?:pending|unclear)(?:\s*[:;\-–—][\s\S]*|[.!])?$/i.test(s))return 'pending';if(/(?:^|\r?\n|;\s*|\.\s+|\s+[-–—]\s*)\s*(?:[-*•]\s*)?(?:pending|unclear)\s*[:\-–—]/i.test(s))return 'mixed';return 'answer';}
const unknown=v=>/^(?:unknown|not known)(?:\s*[:;\-–—][\s\S]*)?$/i.test(String(v).trim());
const readable=v=>typeof v==='string'&&classify(v)==='answer'&&!unknown(v);
const sourceExcerptReady=v=>typeof v==='string'&&Boolean(v.trim())&&classify(v)!=='pending'&&!unknown(v);
function validDate(v){if(typeof v!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(v))return false;const [y,m,d]=v.split('-').map(Number),days=[31,y%4===0&&(y%100!==0||y%400===0)?29:28,31,30,31,30,31,31,30,31,30,31];return y>=1&&m>=1&&m<=12&&d>=1&&d<=days[m-1];}
function validCutoff(v){if(validDate(v))return true;const m=/^(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2})(?::(\d{2})(?:\.\d{1,9})?)?(Z|[+-]\d{2}:\d{2})$/.exec(v);if(!m||!validDate(m[1])||+m[2]>23||+m[3]>59||m[4]!==undefined&&+m[4]>59)return false;if(m[5]==='Z')return true;const [h,n]=m[5].slice(1).split(':').map(Number);return h<=14&&n<=59&&(h!==14||n===0);}
function profileFor(value){const id=typeof value==='string'?value:value?.profile_id||value?.id,p=profiles.find(p=>p.id===id);if(!p)fail('Unsupported context/date owner profile.');return p;}
function profileForSelection(sheet,keys,{followupOf=null,profileId}={}){const p=profileId?profileFor(profileId):profiles.find(p=>p.sheet===sheet);if(!p||p.sheet!==sheet||!Array.isArray(keys)||!keys.length||new Set(keys).size!==keys.length||JSON.stringify(keys)!==JSON.stringify(p.keys.filter(k=>keys.includes(k))))fail('Choose a canonical nonempty subset of this closed owner form.');if(sheet==='records'&&!followupOf&&keys.every(k=>oldRecordKeys.includes(k)))return P.profileForSelection(sheet,keys);return p;}
const catalogForSheet=sheet=>profiles.filter(p=>p.sheet===sheet).flatMap(p=>p.catalog);
function dependencySpecs(profile,v){const p=profileFor(profile),one=(slot,type,id,literal=false)=>({slot,type:type||'',id:id||'',literal});if(p.sheet==='requirements')return [one('source_record','Record',v.source_record_id),one('origin_context','Context item',v.origin_context_id)];if(p.sheet==='assurance')return [one('governing_plan','Record',v.governing_plan_record_id,true),one('activity_plan','Record',v.activity_plan_record_id,true),one('competence','Record',v.competence_record_id,true),one('independence','Record',v.independence_record_id,true),one('result_record','Record',v.result_record_id)];return [one('subject',v.subject_type,v.subject_id)];}
function projectionKeys(spec){return ['source_record','governing_plan','activity_plan'].includes(spec.slot)?sourceProjection:spec.slot==='result_record'?resultProjection:P.projections[spec.type]||[];}
function dependency(snapshot,spec){if(spec.literal&&['Not required','Not yet demonstrated'].includes(spec.id))return {type:spec.type,id:spec.id,status:'literal',revision:null,values:{}};const sheet=P.typeSheets[spec.type],fields=projectionKeys(spec),rows=sheet==='systems'?snapshot.systems:snapshot.references?.[sheet],row=spec.id&&sheet?(rows||[]).find(r=>(r.values.id||r.values.system_id)===spec.id):null;return {type:spec.type,id:spec.id,status:!spec.id?'blank':!sheet?'unmanaged':!row?'missing':row.deleted_at?'deleted':'found',revision:row?row.revision:null,values:Object.fromEntries(fields.map(k=>[k,row?row.values[k]:'']))};}
function nativeBinding(snapshot,id){const a=snapshot.assessments,d=snapshot.documents,s=snapshot.soa_artifacts;return Boolean(a?.reserved_ids?.includes(id)||a?.entries?.some(e=>e.record_id===id)||a?.history?.some(e=>e.record_id===id)||d?.reserved_record_ids?.includes(id)||d?.reservations?.some(e=>e.record_id===id)||d?.entries?.some(e=>e.record_id===id)||d?.history?.some(e=>e.record_id===id)||s?.reservations?.some(e=>e.record_id===id)||s?.bindings?.some(e=>e.record_id===id)||s?.captures?.some(e=>e.record_id===id)||s?.events?.some(e=>e.record_id===id||e.kind==='external-issue-recorded'&&(e.payload?.record_id===id||e.payload?.basis_record_id===id)));}
function captureBasis(row,profile,options={}){const p=profileFor(profile);if(p.sheet==='records')return '';const supplied=options.preparationBasis;if(plain(supplied))return clone(supplied);const excerpt=LF(typeof supplied==='string'?supplied:options.excerpt||'');return {saved_activity:p.sheet==='assurance'?Object.fromEntries(activityKeys.map(k=>[k,LF(row.values[k]||'')])):null,excerpt};}
function basisText(b){if(b==='')return '';const labels={purpose:'Purpose',scope:'Scope',planned_start:'Planned start',planned_end:'Planned end'},lines=b.saved_activity?activityKeys.filter(k=>b.saved_activity[k].trim()).map(k=>labels[k]+': '+b.saved_activity[k]):[];return [...(lines.length?[lines.join('\n')]:[]),...(b.excerpt?[b.excerpt]:[])].join('\n\n');}
function needsExcerpt(profile,basis,keys){const p=profileFor(profile);return p.sheet==='requirements'||p.sheet==='assurance'&&(!basis.saved_activity||!['purpose','scope'].every(k=>readable(basis.saved_activity[k]))||(keys||p.keys).some(k=>['actual_start','actual_end','evidence_cutoff'].includes(k)));}
function checkBasis(b,profile,keys){const p=profileFor(profile);if(p.sheet==='records'){if(b!=='')fail('Records cannot carry a source brief.');return b;}if(!exact(b,['saved_activity','excerpt']))fail('Unsupported captured owner preparation basis.');if(p.sheet==='requirements'){if(b.saved_activity!==null)fail('Requirement source context cannot contain activity facts.');}else{if(!exact(b.saved_activity,activityKeys))fail('Captured activity facts must retain exactly purpose, scope and planned dates.');activityKeys.forEach(k=>text(b.saved_activity[k],k));for(const k of ['planned_start','planned_end'])if(b.saved_activity[k]&&!validDate(b.saved_activity[k]))fail('Captured '+k+' must be a real calendar date.',k);}rawText(b.excerpt,'Relevant text for the owner');if(b.excerpt!==LF(b.excerpt))fail('Supplied owner context must retain its LF-normalized literal text.');if((needsExcerpt(p,b,keys)||b.excerpt.trim())&&!sourceExcerptReady(b.excerpt))fail('Paste the relevant source or agreed-plan lines; no summary is needed.','preparation_basis');rawText(basisText(b),'Owner preparation context');return b;}
function subjectContext(snapshot,row,profile,options={}){const p=profileFor(profile),v=row?.values;if(!v||typeof v.id!=='string')fail('The selected saved Register row is missing.');const values=Object.fromEntries(p.contextKeys.map(k=>[k,v[k]]));return {display_name:(p.sheet==='records'?v.title:p.sheet==='assurance'?v.purpose:v.summary)||v.id,values,routing:{owner:(p.sheet==='assurance'?v.lead:v.owner)||'',custodian:p.sheet==='records'?v.custodian||'':''},dependencies:Object.fromEntries(dependencySpecs(p,values).map(spec=>[spec.slot,dependency(snapshot,spec)])),preparation_basis:captureBasis(row,p,options),identity_binding:p.sheet==='records'?{status:nativeBinding(snapshot,v.id)?'native-bound':'unbound',version:v.version}:null};}
function checkContext(c,profile,revision=Number.MAX_SAFE_INTEGER,keys){const p=profileFor(profile);if(!exact(c,['display_name','values','routing','dependencies','preparation_basis','identity_binding'])||!exact(c.values,p.contextKeys)||!exact(c.routing,['owner','custodian']))fail('Unsupported context/date owner source context.');text(c.display_name,'display name');text(c.routing.owner,'owner');text(c.routing.custodian,'custodian');if(p.sheet!=='records'&&c.routing.custodian!=='')fail('Only Record context names a custodian.');p.contextKeys.forEach(k=>text(c.values[k],k));checkBasis(c.preparation_basis,p,keys);if(p.sheet==='records'){if(!exact(c.identity_binding,['status','version'])||!['unbound','native-bound'].includes(c.identity_binding.status))fail('Unsupported Record identity binding.');text(c.identity_binding.version,'version');}else if(c.identity_binding!==null)fail('Only Record context carries an identity binding.');const specs=dependencySpecs(p,c.values);if(!exact(c.dependencies,specs.map(s=>s.slot)))fail('Context/date dependency slots differ from the closed profile.');for(const spec of specs){const dep=c.dependencies[spec.slot],literal=spec.literal&&['Not required','Not yet demonstrated'].includes(spec.id),fields=literal?[]:projectionKeys(spec),managed=Boolean(P.typeSheets[spec.type]);if(!exact(dep,['type','id','status','revision','values'])||dep.type!==spec.type||dep.id!==spec.id||!exact(dep.values,fields))fail('Unsupported context/date dependency projection.');text(dep.type,'dependency type');text(dep.id,'dependency id');if(dep.id&&(dep.id!==dep.id.trim()||/[\r\n\t]/.test(dep.id)))fail('Dependency identity must be exact.');if(literal?dep.status!=='literal':!spec.id?dep.status!=='blank':managed?!['found','deleted','missing'].includes(dep.status):dep.status!=='unmanaged')fail('Dependency status differs from its exact recorded identity.');fields.forEach(k=>text(dep.values[k],k));if(['found','deleted'].includes(dep.status)){if(!Number.isSafeInteger(dep.revision)||dep.revision<(spec.type==='AI system'?0:1)||dep.revision>revision)fail('Unsupported dependency revision.');}else if(dep.revision!==null||fields.some(k=>dep.values[k]!==''))fail('Unavailable dependency metadata must remain empty.');}return c;}
function eligibility(snapshot,row,profile,options={}){const p=profileFor(profile),v=row?.values;if(!v||row.deleted_at||!(snapshot.references?.[p.sheet]||[]).some(r=>r.values.id===v.id&&!r.deleted_at))return 'The selected saved row is missing or deleted. Restore its exact row before using answers.';let c;try{c=subjectContext(snapshot,row,p,options);checkBasis(c.preparation_basis,p,options.fieldKeys);}catch(e){return e.message;}if(p.sheet==='requirements'){const source=c.dependencies.source_record;if(source.status!=='found'||!readable(source.values.version)||!readable(v.source_locator))return 'Select the exact available source Record, its known version and precise locator before preparing these questions.';}if(p.sheet==='assurance'&&!R.lists.AssuranceActivityTypeActive.includes(v.type))return 'Select the saved organization-controlled activity type before preparing its owner questions.';return '';}
function canonicalContext(q){const p=profileFor(q),c=q.subject_context;return {display_name:c.display_name,values:Object.fromEntries(p.contextKeys.map(k=>[k,c.values[k]])),routing:{owner:c.routing.owner,custodian:c.routing.custodian},dependencies:Object.fromEntries(dependencySpecs(p,c.values).map(spec=>{const d=c.dependencies[spec.slot],fields=d.status==='literal'?[]:projectionKeys(spec);return [spec.slot,{type:d.type,id:d.id,status:d.status,revision:d.revision,values:Object.fromEntries(fields.map(k=>[k,d.values[k]]))}];})),preparation_basis:c.preparation_basis===''?'':{saved_activity:c.preparation_basis.saved_activity===null?null:Object.fromEntries(activityKeys.map(k=>[k,c.preparation_basis.saved_activity[k]])),excerpt:c.preparation_basis.excerpt},identity_binding:c.identity_binding===null?null:{status:c.identity_binding.status,version:c.identity_binding.version}};}
function meaningDependencies(q,c){const deps=clone(c.dependencies),p=profileFor(q),d=deps.subject;if(p.sheet==='records'&&d?.type==='Record'&&d.id===q.target.id){d.revision=null;d.values=Object.fromEntries(Object.entries(d.values).filter(([k])=>!p.keys.includes(k)));}return deps;}
function fullMeaningPayload(q){const c=canonicalContext(q);return ['owner-register-context-date-meaning-v1',q.workspace_id,[q.target.kind,q.target.sheet,q.target.id],q.recipe,q.profile_id,c.values,meaningDependencies(q,c),c.preparation_basis,c.identity_binding];}
function familyMeaningPayload(q){const c=canonicalContext(q);return ['owner-register-context-date-family-v1',q.workspace_id,[q.target.kind,q.target.sheet,q.target.id],q.recipe,q.profile_id,c.values,meaningDependencies(q,c),c.preparation_basis,c.identity_binding===null?null:{status:c.identity_binding.status}];}
function project(q,field,value,current='',options={}){const p=profileFor(q),error=(status,message,kind)=>({eligible:false,status,message,kind});if(!p.keys.includes(field))return error('Needs editing','This question is outside the selected form.','invalid');let v;try{rawText(value,'Owner reply');v=value.trim();text(v,field);}catch(e){return error('Needs editing',e.message,'invalid');}const kind=classify(v);if(kind==='blank'||kind==='pending'||p.sheet==='records'&&['version','record_date'].includes(field)&&unknown(v))return error('Pending','Keep this reply unfinished; the saved value stays as it is.',kind==='answer'?'pending':kind);if(kind==='mixed')return error('Partly answered','Edit to save only the usable part. The Pending note stays open in the original reply.',kind);if(dateKeys.includes(field)||p.sheet==='records'&&field==='validity_end'){if(!validDate(v))return error('Needs a date','Choose a real date, or enter YYYY-MM-DD as text. OWL will not guess from this reply.','invalid');}if(field==='evidence_cutoff'&&!validCutoff(v))return error('Needs a clear cut-off','Use the recorded ISO date or timestamp with its explicit recorded offset.','invalid');if(p.sheet==='records'&&field==='validity_end'&&current.trim()&&!validDate(current))return error('Check the existing validity rule','Keep this existing event-based validity wording; use the Records editor if a correction is needed.','held');const bound=options.bound??(q.subject_context?.identity_binding?.status==='native-bound');if(p.sheet==='records'&&field==='version'&&v!==current&&(bound||current!==''))return error('Check the retained version','Resolve this identifier correction or new edition in Records, then prepare a fresh form.','held');return {eligible:true,value:v,kind,status:v===current?'Already matches':'Ready to use',matching:v===current,message:''};}
function returnHold(q,response,options={}){if(profileFor(q).sheet!=='records'||!q.field_keys.includes('version'))return '';const raw=String(response?.answers?.version||'').trim(),initial=q.subject_context.identity_binding,version=options.version??initial.version,bound=options.bound??(initial.status==='native-bound');if(classify(raw)==='answer'&&!unknown(raw)&&raw!==version&&(version!==''||bound))return 'This return names a different version. Its answers may describe that other artifact. Resolve the correct artifact in Records, then prepare a fresh form; every reply is kept.';return '';}
function contextLines(q){const p=profileFor(q),c=q.subject_context,out=[];if(q.organization_label.trim())out.push(['Organization',q.organization_label]);out.push(['Owner',c.routing.owner||'Not recorded']);if(c.routing.custodian)out.push(['Custodian',c.routing.custodian]);for(const [k,v]of Object.entries(c.values))if(v)out.push([R.fields[p.sheet].find(f=>f[0]===k)?.[1]||k,v]);if(c.identity_binding)out.push(['Version',c.identity_binding.version||'Not recorded']);const labels={source_record:'Source',origin_context:'Origin Context',governing_plan:'Governing plan',activity_plan:'Activity plan',competence:'Competence reference',independence:'Independence reference',result_record:'Result reference',subject:'Primary subject'};for(const [slot,d]of Object.entries(c.dependencies)){out.push([labels[slot],d.status==='literal'?d.id:P.displayReference(d)]);if(d.status==='found'||d.status==='deleted')for(const [k,v]of Object.entries(d.values))if(v&&['record_date','effective_date','coverage_start','coverage_end','validity_end'].includes(k))out.push([(labels[slot]||slot)+' '+(R.fields.records.find(f=>f[0]===k)?.[1]||k),v]);}if(c.preparation_basis!=='')out.push([p.sheet==='requirements'?'Relevant text for the owner':'Activity details for the owner',basisText(c.preparation_basis)]);for(const g of groups.filter(g=>p.catalog.some(question=>q.field_keys.includes(question.key)&&question.groupId===g.id)))out.push(['',g.title],['Who can answer',g.audience]);return out;}
function sameMaterial(previous,currentContext,target){if(!previous||previous.recipe!==RECIPE||!currentContext||JSON.stringify(previous.target)!==JSON.stringify(target))return false;const prior=canonicalContext(previous),fresh=canonicalContext({...previous,subject_context:currentContext});const material=c=>JSON.stringify([c.values,meaningDependencies(previous,c),c.identity_binding]);return material(prior)===material(fresh);}
function reuseExcerpt(previous,currentContext,target){return previous?.recipe===RECIPE&&profileFor(previous).sheet!=='records'&&sameMaterial(previous,currentContext,target)?previous.subject_context.preparation_basis.excerpt:'';}
return freeze({RECIPE,catalog,groups,profiles,oldRecordKeys,sourceProjection,resultProjection,activityKeys,dateKeys,profileFor,profileForSelection,catalogForSheet,dependencySpecs,projectionKeys,dependency,nativeBinding,captureBasis,basisText,needsExcerpt,checkBasis,subjectContext,checkContext,eligibility,canonicalContext,fullMeaningPayload,familyMeaningPayload,project,returnHold,contextLines,reuseExcerpt,sameMaterial,validDate,validCutoff,readable,sourceExcerptReady,classify,rawText});
});
