/* Proposed Lifecycle source map; no fixtures, source body, native admission or authority outcomes. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.OWLLifecycleDocumentCatalog=api;})(globalThis,function(){
 'use strict';
 const catalog={
  "templateId": "ai-system-lifecycle-procedure",
  "source": {
    "id": "ai-system-lifecycle-procedure",
    "name": "AI-System-Lifecycle-Management-Procedure.docx",
    "path": "references/local/suite-corrected-candidate/01-Reusable-Core-Suite/01-Controlled-Documents/AI-System-Lifecycle-Management-Procedure.docx",
    "sha256": "e514a2e628e657abe643338086cf2b6ecdd0f3812adecadf33aa269336221e7d",
    "bytes": 55668,
    "paragraphs": 112,
    "tables": 29,
    "physicalInputs": 36,
    "minimumLogicalInputs": 36,
    "coverage": "Exact source prompts, heading-derived reference outlines and selected read-only source tables. Not the full Word body or a rendered document. Proposed sample only; no native template admission or source activation."
  },
  "dependencyPins": [
    {
      "path": "references/local/suite-corrected-candidate/01-Reusable-Core-Suite/03-Operating-Guides/AIMS-Register-and-Assessment-Guide.md",
      "sha256": "04fed8a7da4bdde5fc1bfc98a2c2ac34b0576552321f7bd045a92801b8bb435e"
    },
    {
      "path": "references/local/suite-corrected-candidate/01-Reusable-Core-Suite/02-Workbooks/AIMS-Governance-Register.xlsx",
      "sha256": "f3c2e4ebdfcb261f7ba525c825f860e6be9355f17cfa5107d7c168d22d199930"
    },
    {
      "path": "references/local/suite-corrected-candidate/01-Reusable-Core-Suite/02-Workbooks/AI-System-Governance-Assessment-Template.xlsx",
      "sha256": "4a73c1fa6df89a241c3f4eed45ef33894f5916659035d7a7643a625de39417ae"
    },
    {
      "path": "references/local/suite-corrected-candidate/01-Reusable-Core-Suite/01-Controlled-Documents/AI-Risk-and-Impact-Management-Procedure.docx",
      "sha256": "79963d254f5f04a0497fbca473adab8de9ec0c6eea94beb5f0cb3a647bfe0b0b"
    },
    {
      "path": "references/local/suite-approved-manual/AIMS-Manual.docx",
      "sha256": "340d37fa3641d9896634292faf1b23a1535112f5600b6a04716a1ee9774fcf39"
    },
    {
      "path": "references/local/suite-approved-policy/AI-Governance-Policy.docx",
      "sha256": "5cfe7c0f990d75300f1b72228a0542c144ff2220a9f9856b7b244913b50ebdc9"
    }
  ],
  "sections": [
    {
      "key": "control",
      "label": "Document control",
      "paragraphs": [
        1,
        23
      ],
      "tables": [
        1,
        2
      ]
    },
    {
      "key": "purpose",
      "label": "1 Purpose scope and capability boundary",
      "paragraphs": [
        24,
        28
      ],
      "tables": [
        3
      ]
    },
    {
      "key": "routes",
      "label": "2 Multiple systems and lifecycle routes",
      "paragraphs": [
        29,
        34
      ],
      "tables": [
        4,
        5
      ]
    },
    {
      "key": "roles",
      "label": "3 Roles authority and separation",
      "paragraphs": [
        35,
        37
      ],
      "tables": [
        6,
        7
      ]
    },
    {
      "key": "flow",
      "label": "4 Common lifecycle flow",
      "paragraphs": [
        38,
        40
      ],
      "tables": [
        8
      ]
    },
    {
      "key": "identity",
      "label": "5 Identity baseline state evidence and decision",
      "paragraphs": [
        41,
        43
      ],
      "tables": [
        9
      ]
    },
    {
      "key": "gates",
      "label": "6 Lifecycle gates",
      "paragraphs": [
        44,
        59
      ],
      "tables": [
        10,
        11,
        12,
        13,
        14,
        15,
        16
      ]
    },
    {
      "key": "interfaces",
      "label": "7 Route specific additions",
      "paragraphs": [
        60,
        62
      ],
      "tables": [
        17,
        18
      ]
    },
    {
      "key": "evaluation",
      "label": "8 Evaluation readiness and meaningful human oversight",
      "paragraphs": [
        63,
        67
      ],
      "tables": [
        19,
        20
      ]
    },
    {
      "key": "authorization",
      "label": "9 Authorization deployment and use",
      "paragraphs": [
        68,
        72
      ],
      "tables": [
        21,
        22
      ]
    },
    {
      "key": "operation",
      "label": "10 Operation monitoring incidents and change",
      "paragraphs": [
        73,
        80
      ],
      "tables": [
        23,
        24
      ]
    },
    {
      "key": "retirement",
      "label": "11 Transfer retirement and decommissioning",
      "paragraphs": [
        81,
        88
      ],
      "tables": [
        25
      ]
    },
    {
      "key": "records",
      "label": "12 Authoritative records and interfaces",
      "paragraphs": [
        89,
        90
      ],
      "tables": [
        26
      ]
    },
    {
      "key": "failures",
      "label": "13 Failure states and record protection",
      "paragraphs": [
        91,
        93
      ],
      "tables": [
        27
      ]
    },
    {
      "key": "issue",
      "label": "Appendix A Tailoring and issue gate",
      "paragraphs": [
        94,
        96
      ],
      "tables": [
        28
      ]
    },
    {
      "key": "walkthrough",
      "label": "Appendix B Minimum fictional verification walkthrough",
      "paragraphs": [
        97,
        109
      ],
      "tables": []
    },
    {
      "key": "glossary",
      "label": "Appendix C Organization specific terms",
      "paragraphs": [
        110,
        112
      ],
      "tables": [
        29
      ]
    }
  ],
  "fields": [
    {
      "key": "T1R2C2",
      "physical": "T1R2C2",
      "target": "T1R2C2",
      "section": "control",
      "label": "Document ID",
      "kind": "id",
      "editable": true,
      "help": "Enter the exact organization-owned Document ID; it is separate from the owning Record ID.",
      "sourceQuote": "ORGANIZATION INPUT REQUIRED - ENTER VERIFIED INFORMATION - use the organization's document-ID convention; example: ORG-AIMS-LCM-001.",
      "binding": "documentId",
      "afterSave": "read-only"
    },
    {
      "key": "T1R3C2",
      "physical": "T1R3C2",
      "target": "T1R3C2",
      "section": "control",
      "label": "Version",
      "kind": "shared",
      "editable": true,
      "help": "Use the existing working version label; a session Save does not approve or advance it.",
      "sourceQuote": "ORGANIZATION INPUT REQUIRED - ENTER VERIFIED INFORMATION - examples: 0.1 for a working draft or 1.0 for a first issued version; follow the organization's version rules.",
      "binding": "version"
    },
    {
      "key": "T1R4C2",
      "physical": "T1R4C2",
      "target": "T1R4C2",
      "section": "control",
      "label": "Organization document lifecycle status",
      "kind": "shared",
      "editable": true,
      "help": "Draft or Under review may be prepared in this sample. Human approval and issue remain separate.",
      "sourceQuote": "ORGANIZATION INPUT REQUIRED - CHOOSE ONE - Draft / Under review / Approved / Issued / Superseded / Retired.",
      "binding": "lifecycle",
      "options": [
        "Draft",
        "Under review"
      ]
    },
    {
      "key": "T1R5C2",
      "physical": "T1R5C2",
      "target": "T1R5C2",
      "section": "control",
      "label": "Owner",
      "kind": "role",
      "editable": true,
      "help": "Name the accountable method-maintenance role; a contact does not appoint or authorize that role.",
      "sourceQuote": "ORGANIZATION INPUT REQUIRED - ENTER VERIFIED INFORMATION - accountable maintenance role or position.",
      "binding": "owner",
      "reuseKinds": [
        "role"
      ]
    },
    {
      "key": "T1R6C2",
      "physical": "T1R6C2",
      "target": "T1R6C2",
      "section": "control",
      "label": "Reviewer",
      "kind": "role",
      "editable": true,
      "help": "Name the reviewer role and relevant independence. A directory label cannot establish independence.",
      "sourceQuote": "ORGANIZATION INPUT REQUIRED - ENTER VERIFIED INFORMATION - assigned reviewer role or position; record required independence where applicable.",
      "binding": "reviewer",
      "reuseKinds": [
        "role"
      ]
    },
    {
      "key": "T1R7C2",
      "physical": "T1R7C2",
      "target": "T1R7C2",
      "section": "control",
      "label": "Approver",
      "kind": "protected",
      "editable": false,
      "help": "Leave blank until the actual authorized approval event. This sample cannot appoint an approver.",
      "sourceQuote": "ORGANIZATION INPUT REQUIRED - LEAVE BLANK UNTIL AUTHORIZED - assigned approval authority only; the template maintainer cannot appoint themselves through this field."
    },
    {
      "key": "T1R8C2",
      "physical": "T1R8C2",
      "target": "T1R8C2",
      "section": "control",
      "label": "Approval and effective dates",
      "kind": "protected",
      "editable": false,
      "help": "Approval and effective dates follow their actual authorized events; Save dates are not approval dates.",
      "sourceQuote": "ORGANIZATION INPUT REQUIRED - LEAVE BLANK UNTIL AUTHORIZED - enter only after the corresponding approval and issue event."
    },
    {
      "key": "T1R9C2",
      "physical": "T1R9C2",
      "target": "T1R9C2",
      "section": "control",
      "label": "Review date or trigger",
      "kind": "review",
      "editable": true,
      "help": "Enter a planned date OR interval with relevant early-review triggers. No default schedule or calculated deadline is inferred.",
      "sourceQuote": "ORGANIZATION INPUT REQUIRED - ENTER VERIFIED INFORMATION - planned interval or date plus relevant early-review triggers.",
      "binding": "review"
    },
    {
      "key": "T1R10C2",
      "physical": "T1R10C2",
      "target": "T1R10C2",
      "section": "control",
      "label": "Classification and distribution",
      "kind": "shared",
      "editable": true,
      "help": "Use the organization classification and separate distribution limits. A label does not enforce access.",
      "sourceQuote": "ORGANIZATION INPUT REQUIRED - CHOOSE ONE under the organization's classification policy - Public / Internal / Confidential / Restricted / Other organization-defined classification; state distribution limits where needed.",
      "binding": "classification"
    },
    {
      "key": "T1R11C2",
      "physical": "T1R11C2",
      "target": "T1R11C2",
      "section": "control",
      "label": "Controlled location",
      "kind": "shared",
      "editable": true,
      "help": "Use the exact controlled repository or durable reference. A filename alone is insufficient.",
      "sourceQuote": "ORGANIZATION INPUT REQUIRED - ENTER VERIFIED INFORMATION - exact repository, controlled folder, document-management reference or durable URL; a filename alone is insufficient.",
      "binding": "location"
    },
    {
      "key": "T2R2C1",
      "physical": "T2R2C1",
      "target": "T2R2C1",
      "section": "control",
      "label": "Version",
      "kind": "repeat",
      "editable": true,
      "help": "Human revision entry; session Save events do not manufacture revision wording.",
      "sourceQuote": "[enter]",
      "repeat": "history",
      "column": "version",
      "prototype": 2
    },
    {
      "key": "T2R2C2",
      "physical": "T2R2C2",
      "target": "T2R2C2",
      "section": "control",
      "label": "Date",
      "kind": "repeat",
      "editable": true,
      "help": "Human revision entry; session Save events do not manufacture revision wording.",
      "sourceQuote": "[enter]",
      "repeat": "history",
      "column": "date",
      "prototype": 2,
      "type": "date"
    },
    {
      "key": "T2R2C3",
      "physical": "T2R2C3",
      "target": "T2R2C3",
      "section": "control",
      "label": "Change summary",
      "kind": "repeat",
      "editable": true,
      "help": "Human revision entry; session Save events do not manufacture revision wording.",
      "sourceQuote": "Initial organization tailoring",
      "repeat": "history",
      "column": "summary",
      "prototype": 2
    },
    {
      "key": "T2R2C4",
      "physical": "T2R2C4",
      "target": "T2R2C4",
      "section": "control",
      "label": "Author",
      "kind": "repeat",
      "editable": true,
      "help": "Human revision entry; session Save events do not manufacture revision wording.",
      "sourceQuote": "[enter]",
      "repeat": "history",
      "column": "author",
      "prototype": 2
    },
    {
      "key": "T2R2C5",
      "physical": "T2R2C5",
      "target": "T2R2C5",
      "section": "control",
      "label": "Reviewer",
      "kind": "repeat",
      "editable": true,
      "help": "Human revision entry; session Save events do not manufacture revision wording.",
      "sourceQuote": "[enter]",
      "repeat": "history",
      "column": "reviewer",
      "prototype": 2
    },
    {
      "key": "T2R2C6",
      "physical": "T2R2C6",
      "target": "T2R2C6",
      "section": "control",
      "label": "Approval record",
      "kind": "protected",
      "editable": false,
      "help": "Record only an actual human revision entry. An approval record remains protected until its actual event.",
      "sourceQuote": "[enter after approval]",
      "repeat": "history",
      "column": "approval",
      "prototype": 2
    },
    {
      "key": "T3R2C1",
      "physical": "T3R2C1",
      "target": "T3R2C1",
      "section": "purpose",
      "label": "Approved lifecycle method scope",
      "kind": "protected",
      "editable": false,
      "help": "The approved lifecycle method scope and governing approval Decision are protected as one source cell. No authorized scope or Decision is inferred from selected references.",
      "sourceQuote": "ORGANIZATION INPUT REQUIRED - LEAVE BLANK UNTIL AUTHORIZED - current Manual, Policy and Risk Procedure Record IDs, applicable activities and systems, process owner and governing approval Decision ID."
    },
    {
      "key": "T5R2C1",
      "physical": "T5R2C1",
      "target": "T5R2C1",
      "section": "routes",
      "label": "Route selection and discovered-use rule",
      "kind": "narrative",
      "editable": true,
      "help": "Define the organization rule for selecting each system main route, supported overlaps, discovery, admission, containment and escalation. The actual selected route stays with that AI System.",
      "sourceQuote": "ORGANIZATION INPUT REQUIRED - CHOOSE ONE main route - Develop / Acquire and configure / Modify or reuse / Provide / Bounded experiment; record supported overlaps separately and define confirmation authority, shadow or embedded AI response, rejection, retirement and governed admission.",
      "referenceTables": [
        "T4"
      ],
      "proposedWording": "Define the per-system main-route selection and confirmation rule, supported overlaps, discovered-use response, governed admission, rejection and retirement. Keep each actual chosen main route in AI Systems and overlaps in the dated Assessment.",
      "sourceIssue": "LIFE-01"
    },
    {
      "key": "T7R2C1",
      "physical": "T7R2C1",
      "target": "T7R2C1",
      "section": "roles",
      "label": "Organization roles and authority",
      "kind": "narrative",
      "editable": true,
      "help": "Describe the method-specific roles, recorded authority limits, alternates, conflicts, independence and escalation; retain exact delegation references without implying appointment.",
      "sourceQuote": "ORGANIZATION INPUT REQUIRED - ENTER VERIFIED INFORMATION - identify actual roles or positions, delegation limits, alternates, conflicts, required independence, specialist triggers, emergency authority, suspension and recovery authority, and escalation",
      "referenceTables": [
        "T6"
      ]
    },
    {
      "key": "T18R2C1",
      "physical": "T18R2C1",
      "target": "T18R2C1",
      "section": "interfaces",
      "label": "Route and specialist process interfaces",
      "kind": "narrative",
      "editable": true,
      "help": "Identify applicable approved specialist processes and exact controlled references for each supported route. Document ownership and gaps; naming a process does not prove approval or coverage.",
      "sourceQuote": "ORGANIZATION INPUT REQUIRED - ENTER VERIFIED INFORMATION - name the approved development, acquisition, data, supplier, security, privacy, safety, quality, incident, continuity, communication, and records processes used for each route",
      "referenceTables": [
        "T17"
      ]
    },
    {
      "key": "T20R2C1",
      "physical": "T20R2C1",
      "target": "T20R2C1",
      "section": "evaluation",
      "label": "Evaluation and readiness configuration",
      "kind": "narrative",
      "editable": true,
      "help": "Describe evaluation and oversight methods, evidence and threshold criteria, independent review, blockers, retesting and controlled record locations. Actual test results and readiness conclusions stay in each case.",
      "sourceQuote": "ORGANIZATION INPUT REQUIRED - ENTER VERIFIED INFORMATION - define evaluation methods, environments, evidence thresholds, required independence, oversight test criteria, readiness blockers, reviewer authority, retest triggers, and record locations",
      "referenceTables": [
        "T19"
      ]
    },
    {
      "key": "T22R2C1",
      "physical": "T22R2C1",
      "target": "T22R2C1",
      "section": "authorization",
      "label": "Lifecycle authorization and deployment rule",
      "kind": "narrative",
      "editable": true,
      "help": "Describe the authorization and deployment method: delegated authority, baseline and scope checks, permitted conditions, dates, communication, deployment verification, rollback and reauthorization. No system Decision is issued here.",
      "sourceQuote": "ORGANIZATION INPUT REQUIRED - ENTER VERIFIED INFORMATION - define decision delegation, baseline and scope requirements, permitted conditions, expiry, communication, deployment verification, rollback or safe stop, over-authority escalation, and reauthorization triggers",
      "referenceTables": [
        "T21"
      ]
    },
    {
      "key": "T24R2C1",
      "physical": "T24R2C1",
      "target": "T24R2C1",
      "section": "operation",
      "label": "Monitoring change emergency and incident configuration",
      "kind": "narrative",
      "editable": true,
      "help": "Define rules for the supported change classes, monitoring and response, supplier changes, emergency limits, communication and retention. Each actual event class and changed baseline belong to the controlled case/change record.",
      "sourceQuote": "ORGANIZATION INPUT REQUIRED - CHOOSE ONE change class when evaluating a change - Routine / Material / Emergency / Unintended or provider-managed; then define measures, thresholds, change envelope, authority, supplier handling, response, communication and evidence retention.",
      "referenceTables": [
        "T23"
      ],
      "proposedWording": "Define the rules and applicable criteria for Routine, Material, Emergency, and Unintended or provider-managed changes; record the classification and affected baseline for each actual event in its controlled change Record.",
      "sourceIssue": "LIFE-02"
    },
    {
      "key": "T25R2C1",
      "physical": "T25R2C1",
      "target": "T25R2C1",
      "section": "retirement",
      "label": "Transfer retirement and disposition rule",
      "kind": "narrative",
      "editable": true,
      "help": "Describe transfer and retirement authority, continuity, supplier exit, access and data handling, evidence, residual duties, retention and final inventory checks. Retirement never authorizes uncontrolled deletion.",
      "sourceQuote": "ORGANIZATION INPUT REQUIRED - ENTER VERIFIED INFORMATION - define decision authority, continuity, communication, supplier exit, access removal, data and component handling, completion evidence, residual obligations, retention, legal hold, disposition, and final inventory verification"
    },
    {
      "key": "T28R2C3",
      "physical": "T28R2C3",
      "target": "T28R2C3",
      "section": "issue",
      "label": "Scope and ownership",
      "kind": "gate",
      "editable": false,
      "help": "OPEN remains protected. Viewing a requirement or filling a draft is not a human-supported completion/approval event.",
      "sourceQuote": "OPEN",
      "sourceRequirement": {
        "locator": "T28R2C2",
        "text": "Approved AIMS scope, method owner, system-owner rule, route and discovered-use boundary, and authoritative homes"
      }
    },
    {
      "key": "T28R3C3",
      "physical": "T28R3C3",
      "target": "T28R3C3",
      "section": "issue",
      "label": "Stages and gates",
      "kind": "gate",
      "editable": false,
      "help": "OPEN remains protected. Viewing a requirement or filling a draft is not a human-supported completion/approval event.",
      "sourceQuote": "OPEN",
      "sourceRequirement": {
        "locator": "T28R3C2",
        "text": "Approved local stages, gate criteria, blockers, conditional rules, required evidence, outcomes, and next actions"
      }
    },
    {
      "key": "T28R4C3",
      "physical": "T28R4C3",
      "target": "T28R4C3",
      "section": "issue",
      "label": "Identity and baseline",
      "kind": "gate",
      "editable": false,
      "help": "OPEN remains protected. Viewing a requirement or filling a draft is not a human-supported completion/approval event.",
      "sourceQuote": "OPEN",
      "sourceRequirement": {
        "locator": "T28R4C2",
        "text": "Accepted identity rule, baseline content and versioning, actual-state updates, and historical preservation"
      }
    },
    {
      "key": "T28R5C3",
      "physical": "T28R5C3",
      "target": "T28R5C3",
      "section": "issue",
      "label": "Authority",
      "kind": "gate",
      "editable": false,
      "help": "OPEN remains protected. Viewing a requirement or filling a draft is not a human-supported completion/approval event.",
      "sourceQuote": "OPEN",
      "sourceRequirement": {
        "locator": "T28R5C2",
        "text": "Named lifecycle, emergency, suspension, recovery, transfer, and retirement authorities with delegation and conflict rules"
      }
    },
    {
      "key": "T28R6C3",
      "physical": "T28R6C3",
      "target": "T28R6C3",
      "section": "issue",
      "label": "Evaluation and oversight",
      "kind": "gate",
      "editable": false,
      "help": "OPEN remains protected. Viewing a requirement or filling a draft is not a human-supported completion/approval event.",
      "sourceQuote": "OPEN",
      "sourceRequirement": {
        "locator": "T28R6C2",
        "text": "Methods, thresholds, environments, evidence, independence, human-oversight test, readiness, and retest rules"
      }
    },
    {
      "key": "T28R7C3",
      "physical": "T28R7C3",
      "target": "T28R7C3",
      "section": "issue",
      "label": "Operation and change",
      "kind": "gate",
      "editable": false,
      "help": "OPEN remains protected. Viewing a requirement or filling a draft is not a human-supported completion/approval event.",
      "sourceQuote": "OPEN",
      "sourceRequirement": {
        "locator": "T28R7C2",
        "text": "Monitoring, logging, routine and material change, provider change, incident, restriction, suspension, rollback, and communication rules"
      }
    },
    {
      "key": "T28R8C3",
      "physical": "T28R8C3",
      "target": "T28R8C3",
      "section": "issue",
      "label": "Retirement and records",
      "kind": "gate",
      "editable": false,
      "help": "OPEN remains protected. Viewing a requirement or filling a draft is not a human-supported completion/approval event.",
      "sourceQuote": "OPEN",
      "sourceRequirement": {
        "locator": "T28R8C2",
        "text": "Transfer, continuity, exit, access, data and component handling, residual obligations, retention, disposition, and retrieval"
      }
    },
    {
      "key": "T28R9C3",
      "physical": "T28R9C3",
      "target": "T28R9C3",
      "section": "issue",
      "label": "System test",
      "kind": "gate",
      "editable": false,
      "help": "OPEN remains protected. Viewing a requirement or filling a draft is not a human-supported completion/approval event.",
      "sourceQuote": "OPEN",
      "sourceRequirement": {
        "locator": "T28R9C2",
        "text": "Completed fictional walkthrough covering opacity, failed oversight, conditional authorization, provider change, suspension, routine change, and retirement"
      }
    },
    {
      "key": "T28R10C3",
      "physical": "T28R10C3",
      "target": "T28R10C3",
      "section": "issue",
      "label": "Approval and issue",
      "kind": "gate",
      "editable": false,
      "help": "OPEN remains protected. Viewing a requirement or filling a draft is not a human-supported completion/approval event.",
      "sourceQuote": "OPEN",
      "sourceRequirement": {
        "locator": "T28R10C2",
        "text": "Recorded method approval, effective date, controlled distribution, predecessor handling, and linked current configuration Records"
      }
    },
    {
      "key": "T29R2C1",
      "physical": "T29R2C1",
      "target": "T29R2C1",
      "section": "glossary",
      "label": "Term or abbreviation",
      "kind": "repeat",
      "editable": true,
      "help": "Add an organization-specific term only when needed to operate the method; do not reproduce a general glossary.",
      "sourceQuote": "ORGANIZATION INPUT REQUIRED - ENTER VERIFIED INFORMATION - organization-specific term or abbreviation; add a row only when needed.",
      "repeat": "glossary",
      "column": "term",
      "prototype": 2
    },
    {
      "key": "T29R2C2",
      "physical": "T29R2C2",
      "target": "T29R2C2",
      "section": "glossary",
      "label": "Organization-specific meaning",
      "kind": "repeat",
      "editable": true,
      "help": "Add an organization-specific term only when needed to operate the method; do not reproduce a general glossary.",
      "sourceQuote": "[enter only if needed]",
      "repeat": "glossary",
      "column": "meaning",
      "prototype": 2
    },
    {
      "key": "T29R2C3",
      "physical": "T29R2C3",
      "target": "T29R2C3",
      "section": "glossary",
      "label": "Authority or source",
      "kind": "repeat",
      "editable": true,
      "help": "Add an organization-specific term only when needed to operate the method; do not reproduce a general glossary.",
      "sourceQuote": "[enter]",
      "repeat": "glossary",
      "column": "source",
      "prototype": 2
    }
  ],
  "outlines": {
    "control": "Source reference outline - Cover metadata, review date or interval, and human revision entries. Approval and issue controls remain protected.",
    "purpose": "Source reference outline - One organization method supports every in-scope system. Approved scope and human method approval remain protected.",
    "routes": "Source reference outline - Each system selects its own main route; overlaps belong to its dated assessment. Discovered use is recorded honestly and does not receive retroactive authority.",
    "roles": "Source reference outline - Define lifecycle responsibilities while preserving separate system accountability, risk acceptance, evaluation evidence and lifecycle decision authority.",
    "flow": "Source reference outline - The nine-stage reference flow describes results and handoffs. It does not advance a real system or demonstrate locally approved stages.",
    "identity": "Source reference outline - Stable identity, versioned baselines, actual state, evidence state and human decision state have distinct meanings and histories.",
    "gates": "Source reference outline - Seven source gate examples retain When, Who, Inputs, Actions, Output, Decision and If blocked. Local criteria and approved configuration need their own controlled home.",
    "interfaces": "Source reference outline - Route specialist work to its competent owning process; preserve exact references, scope and unsupported gaps.",
    "evaluation": "Source reference outline - Readiness assembles bounded evidence for a decision. Supplier evidence and meaningful human oversight require scoped evaluation; a passing test does not authorize.",
    "authorization": "Source reference outline - Assessment conclusion, residual-risk Decision, lifecycle authorization Decision and actual deployment remain separate results.",
    "operation": "Source reference outline - Monitoring, routine/material/emergency/provider change and incident response preserve prior baselines and Decisions; metrics do not decide continued use.",
    "retirement": "Source reference outline - Authorized transfer/retirement work includes continuity, access, supplier and data handling, communications, residual duties, final inventory and retained history.",
    "records": "Source reference outline - Method configuration stays here or in its approved configuration Records; current system facts, detailed assessments, issued Decisions and execution evidence retain their authoritative homes.",
    "failures": "Source reference outline - Unknown, missing, stale, failed, unauthorized, suspended and incomplete-retirement states remain visible with owners, limits and next actions.",
    "issue": "Source reference outline - Nine evidence-supported human tailoring/issue gates remain OPEN. Draft text, walkthrough completion and a Save do not close them.",
    "walkthrough": "Source reference outline - A source-defined fictional knowledge-assistant walkthrough exercises opacity, failed oversight, conditional authorization, provider change, suspension, routine change and retirement. It is reference context and does not prove the organization has performed the test.",
    "glossary": "Source reference outline - Keep only organization-specific terms needed for this method."
  },
  "referenceTables": {
    "T4": {
      "key": "T4",
      "label": "Lifecycle source reference - T4",
      "rows": [
        [
          "Lifecycle route",
          "Use when",
          "Required emphasis"
        ],
        [
          "Develop",
          "The organization designs, trains, or materially engineers the system",
          "Requirements, architecture, data, resources, verification, configuration, release, and technical records"
        ],
        [
          "Acquire and configure",
          "The organization obtains and configures an external product, service, model, dataset, tool, or system",
          "Supplier evidence, rights, responsibilities, integration, limits, monitoring, change notification, contingency, and exit"
        ],
        [
          "Modify or reuse",
          "An existing system or component changes or is applied in a new context",
          "Baseline comparison, inherited evidence, gaps, changed purpose or context, reassessment, and reauthorization"
        ],
        [
          "Provide",
          "The organization supplies an AI system or AI-enabled product or service",
          "Customer needs, allocated responsibilities, intended-use limits, documentation, support, change and incident communication, and end-of-service obligations"
        ],
        [
          "Bounded experiment",
          "Work is isolated from operational decisions and production effects under approved limits",
          "Allowed data, access, environment, users, duration, monitoring, exit, and a full-route decision before operational influence"
        ]
      ]
    },
    "T6": {
      "key": "T6",
      "label": "Lifecycle source reference - T6",
      "rows": [
        [
          "Functional role",
          "Required work",
          "Authority boundary"
        ],
        [
          "Lifecycle process owner",
          "Maintain routes, gates, triggers, handoffs, records, and aggregate reporting",
          "Does not inherit risk acceptance or system authorization"
        ],
        [
          "Accountable AI system owner",
          "Own purpose, limits, affected process, resources, operating boundary, and continuing accountability",
          "Cannot authorize outside recorded delegation"
        ],
        [
          "Delivery and operations owner",
          "Coordinate development, acquisition, configuration, integration, deployment, support, change, and decommissioning",
          "Records what occurred; does not create authorization"
        ],
        [
          "Evaluation lead",
          "Plan and record verification, validation, and evaluation against approved criteria",
          "A test result is evidence, not approval"
        ],
        [
          "Authorized lifecycle decision-maker",
          "Authorize, condition, reject, suspend, withdraw, resume, transfer, or retire a defined baseline",
          "Acts only within recorded authority and cannot waive applicable obligations"
        ],
        [
          "Specialist or affected-party contributor",
          "Provide scoped expertise, evidence, experience, or challenge when required",
          "Records scope, limitations, disagreement, and independence"
        ]
      ]
    },
    "T8": {
      "key": "T8",
      "label": "Lifecycle source reference - T8",
      "rows": [
        [
          "Stage",
          "Primary controlled result",
          "Next decision or action"
        ],
        [
          "1 Register and triage",
          "Stable system identity, actual known state, AIMS scope review, owner, and route",
          "Admit, contain, reject, or assess"
        ],
        [
          "2 Define baseline",
          "Purpose, limits, role, boundary, requirements, resources, parties, and versioned baseline",
          "Begin selected route work"
        ],
        [
          "3 Assess and control",
          "Impact, risk, treatment, necessary controls, SoA, and residual-risk records",
          "Implement or return for action"
        ],
        [
          "4 Build acquire configure or experiment",
          "Route-specific work and evidence for the defined baseline",
          "Evaluate"
        ],
        [
          "5 Verify validate and evaluate",
          "Results, failed or unrun tests, limitations, oversight evidence, and readiness view",
          "Risk decision and lifecycle decision"
        ],
        [
          "6 Authorize",
          "Issued baseline-bound human Decision, conditions, expiry, monitoring, and triggers",
          "Deploy, defer, reject, or escalate"
        ],
        [
          "7 Deploy and verify",
          "Actual as-deployed or as-used baseline and confirmed controls",
          "Operate or rollback"
        ],
        [
          "8 Operate and control change",
          "Monitoring, support, feedback, events, concerns, incidents, changes, and reassessment",
          "Continue, restrict, suspend, recover, or reauthorize"
        ],
        [
          "9 Transfer or retire",
          "Authorized plan, completion evidence, updated inventory, residual obligations, and retained history",
          "Close defined work without deleting governance history"
        ]
      ]
    },
    "T9": {
      "key": "T9",
      "label": "Lifecycle source reference - T9",
      "rows": [
        [
          "Concept",
          "Meaning",
          "Must not become"
        ],
        [
          "AI system identity",
          "Stable organization-owned AI System ID and enduring accountable boundary",
          "A new ID for every model, prompt, data, provider, owner, or configuration change"
        ],
        [
          "System baseline",
          "Versioned purpose, configuration, model or service, data, prompts or rules, integrations, environment, users, suppliers, and controls assessed",
          "An unlabeled current-state description that overwrites earlier decisions"
        ],
        [
          "Actual lifecycle state",
          "What has actually happened using the Register's accepted state values",
          "Permission, evidence sufficiency, or assessment completion"
        ],
        [
          "Evidence state",
          "Missing, current, stale, unverified, verified, failed, or not applicable with rationale",
          "An automatic favourable conclusion"
        ],
        [
          "Human decision state",
          "Pending, authorized, conditional, not authorized, suspended, withdrawn, expired, or superseded as recorded",
          "A formula, readiness status, signature field, or test result"
        ]
      ]
    },
    "T10": {
      "key": "T10",
      "label": "Lifecycle source reference - T10",
      "rows": [
        [
          "Gate element",
          "Required treatment"
        ],
        [
          "When",
          "Before material commitment or authorized operational use, or promptly when unknown use is discovered"
        ],
        [
          "Who",
          "Accountable system owner with the lifecycle process owner and scope owner"
        ],
        [
          "Inputs",
          "Known activity, purpose, actual state, users, affected process, supplier or component, and discovery evidence"
        ],
        [
          "Actions",
          "Assign or confirm AI System ID; record actual state; review AIMS scope; select main route; assign owner; contain unauthorized exposure where authorized"
        ],
        [
          "Output",
          "Register entry, scope result or open review, route, owner, and required Actions"
        ],
        [
          "Decision",
          "Admit to governed work, keep under review, reject, contain, or retire using existing authority"
        ],
        [
          "If blocked",
          "Record Unknown or Under review, preserve evidence, restrict exposure where authorized, assign Actions, and escalate"
        ]
      ]
    },
    "T11": {
      "key": "T11",
      "label": "Lifecycle source reference - T11",
      "rows": [
        [
          "Gate element",
          "Required treatment"
        ],
        [
          "When",
          "After admission and before material design, acquisition, configuration, integration, experiment, or use"
        ],
        [
          "Who",
          "Accountable system owner with delivery, specialist, data, supplier, and affected-process contributors"
        ],
        [
          "Inputs",
          "Stable identity, selected routes, intended and prohibited use, foreseeable misuse, obligations, risks, impacts, resources, parties, and prior baselines"
        ],
        [
          "Actions",
          "Define boundary, role, users, environment, requirements, acceptance methods, data, models, tools, suppliers, integrations, controls, responsibilities, and versioned baseline"
        ],
        [
          "Output",
          "Current baseline Record and versioned system requirements with exact owners and evidence locations"
        ],
        [
          "Decision",
          "Proceed to route work or return the definition for correction"
        ],
        [
          "If blocked",
          "Do not treat missing rights, responsibilities, purpose, boundary, supplier visibility, or required specialist input as satisfied"
        ]
      ]
    },
    "T12": {
      "key": "T12",
      "label": "Lifecycle source reference - T12",
      "rows": [
        [
          "Gate element",
          "Required treatment"
        ],
        [
          "When",
          "Before readiness and whenever a trigger affects the current risk or impact basis"
        ],
        [
          "Who",
          "Risk and impact process owner with system, risk, control, and specialist owners"
        ],
        [
          "Inputs",
          "Current baseline, applicable requirements, impact and risk criteria, prior results, supplier evidence, and open Actions"
        ],
        [
          "Actions",
          "Run the approved Risk and Impact Management Procedure; determine treatment and necessary controls; update the SoA; implement required Actions; obtain the separate residual-risk Decision"
        ],
        [
          "Output",
          "Versioned Assessment Record, current risk and impact records, treatment, controls, SoA, Actions, and residual-risk Decision"
        ],
        [
          "Decision",
          "Provide decision inputs or return for treatment, evidence, specialist review, or escalation"
        ],
        [
          "If blocked",
          "An incomplete assessment, open mandatory control, or invalid risk Decision remains visible and cannot be converted into readiness"
        ]
      ]
    },
    "T13": {
      "key": "T13",
      "label": "Lifecycle source reference - T13",
      "rows": [
        [
          "Gate element",
          "Required treatment"
        ],
        [
          "When",
          "When the defined baseline is available for evaluation and before an operational authorization request"
        ],
        [
          "Who",
          "Evaluation lead with competent reviewers and required independence"
        ],
        [
          "Inputs",
          "Controlled criteria, baseline, test plan, representative environment and data, controls, oversight design, user information, monitoring, rollback, and open limitations"
        ],
        [
          "Actions",
          "Execute planned evaluation; record passed, failed, not run, stale, and not-applicable results; test the human-system workflow; assess supplier evidence; assemble the readiness view"
        ],
        [
          "Output",
          "Evaluation Records and readiness view bound to the baseline and evidence cut-off"
        ],
        [
          "Decision",
          "Ready for decision, return for action, restrict the proposed scope, or escalate"
        ],
        [
          "If blocked",
          "Ready for decision is not approval. Failed, unrun, stale, or out-of-scope evidence stays visible with its consequence"
        ]
      ]
    },
    "T14": {
      "key": "T14",
      "label": "Lifecycle source reference - T14",
      "rows": [
        [
          "Gate element",
          "Required treatment"
        ],
        [
          "When",
          "After the readiness view and required residual-risk Decision are current"
        ],
        [
          "Who",
          "Authorized lifecycle decision-maker; delivery and operations owner records deployment"
        ],
        [
          "Inputs",
          "Defined baseline, purpose and limits, requirements, residual-risk Decision, controls, evaluation, gaps, oversight, information, monitoring, logging, incident routes, rollback, and open Actions"
        ],
        [
          "Actions",
          "Issue a baseline-bound Decision; communicate conditions; deploy only within outcome and effective dates; record actual release or start of use; compare actual and authorized baselines"
        ],
        [
          "Output",
          "Issued AI system authorization Decision and verified as-deployed or as-used baseline"
        ],
        [
          "Decision",
          "Authorize, authorize with conditions, do not authorize, suspend, withdraw, defer, or escalate within recorded authority"
        ],
        [
          "If blocked",
          "Do not deploy on a pending, expired, withdrawn, wrong-baseline, over-authority, or condition-breached Decision; rollback or restrict deviations"
        ]
      ]
    },
    "T15": {
      "key": "T15",
      "label": "Lifecycle source reference - T15",
      "rows": [
        [
          "Gate element",
          "Required treatment"
        ],
        [
          "When",
          "During authorized operation and whenever monitoring, feedback, an event, concern, incident, supplier notice, or proposed change occurs"
        ],
        [
          "Who",
          "System owner and operations owner with monitoring, incident, change, risk, assurance, and specialist roles"
        ],
        [
          "Inputs",
          "Authorized and actual baselines, conditions, measures, thresholds, logs, feedback, supplier notices, incidents, changes, open Actions, and current Decisions"
        ],
        [
          "Actions",
          "Monitor; review conditions; compare change with the baseline; classify routine, material, emergency, unintended, or provider-managed change; contain, restrict, suspend, reassess, revalidate, recover, or reauthorize as required"
        ],
        [
          "Output",
          "Operating evidence, change result, updated Actions and Records, and new assessment or Decision where required"
        ],
        [
          "Decision",
          "Continue, continue with controlled routine change, restrict, suspend, recover, reauthorize, transfer, or retire"
        ],
        [
          "If blocked",
          "Unknown provider or adaptive change is not routine by default; expiry does not silently extend authorization; preserve the prior baseline and Decision"
        ]
      ]
    },
    "T16": {
      "key": "T16",
      "label": "Lifecycle source reference - T16",
      "rows": [
        [
          "Gate element",
          "Required treatment"
        ],
        [
          "When",
          "When use, support, ownership, supplier service, or responsibility will end or transfer"
        ],
        [
          "Who",
          "Accountable system owner and authorized lifecycle decision-maker with operations, records, data, supplier, continuity, communication, and affected-process owners"
        ],
        [
          "Inputs",
          "Current system and deployment baselines, dependencies, affected parties, obligations, access, integrations, data, suppliers, open issues, records, and continuity needs"
        ],
        [
          "Actions",
          "Approve a plan; stop or transfer use; remove or transfer access and integrations; handle data and components; communicate; retain evidence; assign residual obligations; verify the final inventory state"
        ],
        [
          "Output",
          "Issued Decision, completion evidence, updated Register state, retained history, and owned residual obligations"
        ],
        [
          "Decision",
          "Transfer, retire, defer, return for action, or escalate"
        ],
        [
          "If blocked",
          "Keep Retirement pending or the equivalent until completion evidence exists; routine use stopping does not authorize deletion of governance history"
        ]
      ]
    },
    "T17": {
      "key": "T17",
      "label": "Lifecycle source reference - T17",
      "rows": [
        [
          "Route",
          "Additional work to require when applicable",
          "Failure to expose"
        ],
        [
          "Develop",
          "Development objectives, architecture and design choices, data provenance and preparation, configuration control, component tests, validation, release records, maintenance, and secure development interfaces",
          "Uncontrolled build or release, unreproducible baseline, missing technical evidence"
        ],
        [
          "Acquire and configure",
          "Selection criteria, supplier responsibilities, rights, service identity, versions, subcontractors, evidence scope, change notice, incident cooperation, configuration, monitoring, contingency, and exit",
          "Supplier opacity, unsupported customer configuration, lock-in, or no safe fallback"
        ],
        [
          "Modify or reuse",
          "Predecessor baseline, new purpose or context, inherited evidence, changed requirements, integration effects, gaps, reassessment, regression evaluation, and reauthorization",
          "Old evidence applied outside scope or material change hidden as routine"
        ],
        [
          "Provide",
          "Customer needs and roles, intended and prohibited use, instructions, limitations, support, monitoring, change and incident communication, recourse, and end-of-service obligations",
          "Unclear responsibility, stale user information, or unsupported customer reliance"
        ],
        [
          "Bounded experiment",
          "Approved isolation, allowed data, tools and permissions, named users, duration, monitoring, expiry, prohibited operational influence, cleanup, and full-route entry",
          "Prototype becomes production or affects real decisions without authorization"
        ]
      ]
    },
    "T19": {
      "key": "T19",
      "label": "Lifecycle source reference - T19",
      "rows": [
        [
          "Human oversight element",
          "Required question"
        ],
        [
          "Task",
          "Which decision, output, action, or failure must the person oversee?"
        ],
        [
          "Information",
          "What context, explanation, uncertainty, limitations, and alerts are available at the point of action?"
        ],
        [
          "Capability",
          "Does the person have competence, capacity, accessibility, and enough time to respond?"
        ],
        [
          "Authority",
          "Can the person question, override, stop, escalate, or obtain specialist help?"
        ],
        [
          "Failure behavior",
          "What fallback, continuity, appeal, recourse, and prohibited reliance apply?"
        ],
        [
          "Evidence",
          "How will the organization determine whether oversight occurred and worked under representative conditions?"
        ]
      ]
    },
    "T21": {
      "key": "T21",
      "label": "Lifecycle source reference - T21",
      "rows": [
        [
          "Required separation",
          "Owning result",
          "Does not establish"
        ],
        [
          "Assessment conclusion",
          "Assessment Record conclusion, recommendation, rationale, and limitations",
          "Residual-risk acceptance or lifecycle authorization"
        ],
        [
          "Residual-risk decision",
          "Separate issued Decision under the Risk and Impact Management Procedure",
          "Permission to deploy, provide, procure, or continue use"
        ],
        [
          "Lifecycle authorization",
          "Issued baseline-bound AI system authorization Decision with scope, outcome, rationale, conditions, dates, authority, and triggers",
          "Deployment, legal compliance, conformity, or certification"
        ],
        [
          "Deployment or start of use",
          "Actual release or use Record and verified operational baseline",
          "That every control remains effective over time"
        ]
      ]
    },
    "T23": {
      "key": "T23",
      "label": "Lifecycle source reference - T23",
      "rows": [
        [
          "Change class",
          "Minimum rule",
          "Required consequence"
        ],
        [
          "Routine",
          "Within pre-approved boundaries, criteria, authority, and change envelope; still recorded",
          "Complete approved checks and preserve the result without repeating irrelevant work"
        ],
        [
          "Material",
          "Could affect purpose, users, parties, output, data, model, provider, integration, environment, scale, autonomy, oversight, performance, obligation, risk, impact, control, or condition",
          "Re-enter affected requirements, assessment, evaluation, communication, and authorization stages"
        ],
        [
          "Emergency",
          "Authorized urgent change with minimum safety evidence, temporary scope, monitoring, rollback, and expiry",
          "Perform retrospective review and replace or withdraw temporary authority"
        ],
        [
          "Unintended or provider managed",
          "Effect is unknown, externally initiated, adaptive, or outside the planned release path",
          "Do not treat as routine; assess exposure, restrict where needed, compare baseline, and trigger targeted revalidation or reauthorization"
        ]
      ]
    },
    "T26": {
      "key": "T26",
      "label": "Lifecycle source reference - T26",
      "rows": [
        [
          "Information",
          "Authoritative home",
          "Procedure use"
        ],
        [
          "Lifecycle method, routes, gates, material-change rules, authority requirements, and failure behavior",
          "This Procedure and approved organization configuration",
          "Define and version directly"
        ],
        [
          "AIMS identity, scope, organization structure, and authority allocation",
          "AIMS Manual and linked Records",
          "Reference; do not repeat the organization chart"
        ],
        [
          "Risk, impact, treatment, controls, SoA, and residual-risk method",
          "AI Risk and Impact Management Procedure",
          "Invoke at defined triggers and consume approved outputs"
        ],
        [
          "Current AI system identity, main route, actual state, and pointers",
          "AIMS Governance Register - AI Systems",
          "Use stable ID and return current baseline, Assessment, Decision, and review pointers"
        ],
        [
          "Dated system profile, analysis, evidence evaluation, conclusion, recommendation, and limitations",
          "AI System Governance Assessment and linked Records",
          "Create a versioned Assessment Record; do not copy it into this Procedure"
        ],
        [
          "Actions, Decisions, conditions, Records, and relationships",
          "AIMS Governance Register and controlled repositories",
          "Index once, use accepted types and outcomes, and preserve exact versions"
        ],
        [
          "Specialist lifecycle evidence",
          "Existing controlled engineering, data, supplier, security, privacy, safety, quality, incident, continuity, communication, and records systems",
          "Route work to competent owners and retain exact pointers, scope, version, and state"
        ],
        [
          "AIMS monitoring, audit, review, findings, corrective action, and improvement",
          "AIMS Assurance and Improvement Procedure and Register",
          "Supply signals and receive Findings, Actions, and change triggers"
        ]
      ]
    },
    "T27": {
      "key": "T27",
      "label": "Lifecycle source reference - T27",
      "rows": [
        [
          "Failure state",
          "Required treatment"
        ],
        [
          "Unknown scope, route, owner, purpose, boundary, or actual state",
          "Record Unknown or Under review, assign owner and next action, and prevent unsupported progression"
        ],
        [
          "Discovered unauthorized operation",
          "Record actual In operation state, expose missing Decision, contain or restrict where authorized, assess, and escalate; registration does not approve"
        ],
        [
          "Missing, stale, contradictory, inaccessible, or supplier-controlled evidence",
          "Keep visible with owner, confidence and decision effect, alternative evidence or control, and review trigger"
        ],
        [
          "Failed, unrun, stale, or out-of-scope evaluation",
          "Do not show readiness as satisfied; return for action, restrict scope, condition only where permitted, or escalate"
        ],
        [
          "Pending, expired, withdrawn, wrong-baseline, over-authority, or breached-condition Decision",
          "Treat as no current authority for the affected scope; restrict, suspend, seek a valid Decision, or retire"
        ],
        [
          "Material or unknown provider change",
          "Create a new baseline and targeted review; preserve the prior Assessment and Decision; reauthorize before continued use when required"
        ],
        [
          "Suspension or incomplete retirement",
          "Retain identity and history; expose allowed containment or recovery activity; require authorized resumption or completion evidence"
        ],
        [
          "Sensitive or disputed information",
          "Apply approved access, distribution, redaction, retention, correction, supersession, and secure retrieval without rewriting decision history"
        ]
      ]
    },
    "T28": {
      "key": "T28",
      "label": "Lifecycle source reference - T28",
      "rows": [
        [
          "Gate",
          "Required evidence",
          "Result"
        ],
        [
          "Scope and ownership",
          "Approved AIMS scope, method owner, system-owner rule, route and discovered-use boundary, and authoritative homes",
          "OPEN"
        ],
        [
          "Stages and gates",
          "Approved local stages, gate criteria, blockers, conditional rules, required evidence, outcomes, and next actions",
          "OPEN"
        ],
        [
          "Identity and baseline",
          "Accepted identity rule, baseline content and versioning, actual-state updates, and historical preservation",
          "OPEN"
        ],
        [
          "Authority",
          "Named lifecycle, emergency, suspension, recovery, transfer, and retirement authorities with delegation and conflict rules",
          "OPEN"
        ],
        [
          "Evaluation and oversight",
          "Methods, thresholds, environments, evidence, independence, human-oversight test, readiness, and retest rules",
          "OPEN"
        ],
        [
          "Operation and change",
          "Monitoring, logging, routine and material change, provider change, incident, restriction, suspension, rollback, and communication rules",
          "OPEN"
        ],
        [
          "Retirement and records",
          "Transfer, continuity, exit, access, data and component handling, residual obligations, retention, disposition, and retrieval",
          "OPEN"
        ],
        [
          "System test",
          "Completed fictional walkthrough covering opacity, failed oversight, conditional authorization, provider change, suspension, routine change, and retirement",
          "OPEN"
        ],
        [
          "Approval and issue",
          "Recorded method approval, effective date, controlled distribution, predecessor handling, and linked current configuration Records",
          "OPEN"
        ]
      ]
    }
  },
  "sourceIssues": [
    {
      "key": "LIFE-01",
      "classification": "USABILITY",
      "locators": [
        "T5R2C1",
        "P30",
        "P32",
        "T26R5C2"
      ],
      "problem": "A CHOOSE ONE main-route prompt in the organization master can be mistaken for one route for every AI system.",
      "proposedCorrection": "Define the per-system main-route selection and confirmation rule, supported overlaps, discovered-use response, governed admission, rejection and retirement. Keep each actual chosen main route in AI Systems and overlaps in the dated Assessment.",
      "benefit": "Avoids duplicated or conflicting route entry and preserves one method for many systems.",
      "status": "Proposed clarification only; source not amended"
    },
    {
      "key": "LIFE-02",
      "classification": "USABILITY",
      "locators": [
        "T24R2C1",
        "P75",
        "P77",
        "T23"
      ],
      "problem": "A case-specific CHOOSE ONE change-class instruction is mixed into organization-wide monitoring and change configuration.",
      "proposedCorrection": "Define the rules and applicable criteria for Routine, Material, Emergency, and Unintended or provider-managed changes; record the classification and affected baseline for each actual event in its controlled change Record.",
      "benefit": "Keeps method configuration separate from changing event records and prevents one class from becoming an organization-wide default.",
      "status": "Proposed clarification only; source not amended"
    },
    {
      "key": "LIFE-03",
      "classification": "USABILITY",
      "locators": [
        "P12",
        "P40",
        "P43",
        "P45",
        "T28R3C2",
        "T28R4C2",
        "T26R2C2",
        "T28R10C2"
      ],
      "problem": "The template requires approved local stages, all gate criteria and baseline/identity arrangements but gives no dedicated ordinary input or exact configuration pointer for those arrangements. Fixed reference tables do not identify where the organization must record its complete local configuration.",
      "proposedCorrection": "Use the existing approved-configuration-Record mechanism in T26R2 and T28R10: propose one optional exact Configuration Record reference with its version and location. Keep full local stage/gate/identity configuration in that controlled artifact, and preserve human review of scope, coverage and approval. Do not duplicate seven gate-criteria tables.",
      "benefit": "Makes the configuration home retrievable without duplicate case records, repeated criteria entry or pretending the seven visible narrative prompts cover the complete approved method.",
      "proposedHome": {
        "kind": "application-only-reference",
        "key": "configurationRecordId",
        "section": "flow",
        "label": "Configuration Record reference",
        "counted": false,
        "approvalEvidence": false
      },
      "status": "Proposed application-only reference; not a source field or approval evidence; no source amendment or method-readiness claim"
    }
  ],
  "authority": {
    "status": "Proposed isolated design metadata only",
    "caseHomes": {
      "AI Systems": "Stable system identity, one current main route, actual lifecycle state, owner and current Record/Decision pointers",
      "Assessment": "Dated scope, trigger, assessed state/baseline, evidence cut-off, Method Record, analysis, conclusion/recommendation and limitations",
      "Decisions": "Actual issued dispositions with authority, exact baseline/scope, outcome, conditions and dates",
      "Records": "Exact controlled artifacts and independently controlled versions, custody, access, retention, provenance and locations",
      "Actions": "Owned implementation, evidence gap, follow-up or corrective work",
      "Links": "Necessary typed retrieval relationships; no authority or sufficiency conclusion"
    },
    "excluded": [
      "Native v11 schema/registry/storage",
      "Operational system-state changes",
      "Human method approval or issue",
      "Residual-risk acceptance",
      "Lifecycle system authorization",
      "Actual deployment or retirement",
      "Source amendments or activation"
    ]
  },
  "ordinaryCountKeys": [
    "T1R2C2",
    "T1R3C2",
    "T1R5C2",
    "T1R6C2",
    "T1R9C2",
    "T1R10C2",
    "T1R11C2",
    "T5R2C1",
    "T7R2C1",
    "T18R2C1",
    "T20R2C1",
    "T22R2C1",
    "T24R2C1",
    "T25R2C1"
  ]
};
 function freeze(value){if(value&&typeof value==='object'){Object.values(value).forEach(freeze);Object.freeze(value);}return value;}
 if(catalog.fields.length!==36||new Set(catalog.fields.map(field=>field.physical)).size!==36||catalog.sections.length!==17)throw Error('Lifecycle source catalog mismatch.');
 return freeze(catalog);
});
