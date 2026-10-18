/* Exact reviewed Risk source/input/reference metadata. No fictional or organization records. */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.OWLRiskDocumentCatalog=factory();})(globalThis,function(){
'use strict';
const catalog={
  "source": {
    "name": "AI-Risk-and-Impact-Management-Procedure.docx",
    "sha256": "79963d254f5f04a0497fbca473adab8de9ec0c6eea94beb5f0cb3a647bfe0b0b",
    "paragraphs": 144,
    "tables": 35,
    "physicalInputs": 43,
    "minimumLogicalInputs": 43,
    "coverage": "Exact source input labels/prompts, reference outlines and selected source-located read-only criteria/default/gate excerpts; not the full Word body or a rendered document",
    "id": "ai-risk-impact-procedure"
  },
  "dependencyPins": [
    {
      "path": "R:\\OWL\\references\\local\\suite-corrected-candidate\\01-Reusable-Core-Suite\\03-Operating-Guides\\AIMS-Register-and-Assessment-Guide.md",
      "sha256": "04fed8a7da4bdde5fc1bfc98a2c2ac34b0576552321f7bd045a92801b8bb435e"
    },
    {
      "path": "R:\\OWL\\references\\local\\suite-corrected-candidate\\01-Reusable-Core-Suite\\02-Workbooks\\AIMS-Governance-Register.xlsx",
      "sha256": "f3c2e4ebdfcb261f7ba525c825f860e6be9355f17cfa5107d7c168d22d199930"
    },
    {
      "path": "R:\\OWL\\references\\local\\suite-corrected-candidate\\01-Reusable-Core-Suite\\02-Workbooks\\AI-System-Governance-Assessment-Template.xlsx",
      "sha256": "4a73c1fa6df89a241c3f4eed45ef33894f5916659035d7a7643a625de39417ae"
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
      "label": "1 Purpose and capability boundary",
      "paragraphs": [
        24,
        28
      ],
      "tables": [
        3
      ]
    },
    {
      "key": "roles",
      "label": "2 Roles and authority",
      "paragraphs": [
        29,
        32
      ],
      "tables": [
        4,
        5
      ]
    },
    {
      "key": "intake",
      "label": "3 Trigger, scope, and intake",
      "paragraphs": [
        33,
        46
      ],
      "tables": [
        6,
        7,
        8
      ]
    },
    {
      "key": "flow",
      "label": "4 End-to-end controlled flow",
      "paragraphs": [
        47,
        50
      ],
      "tables": [
        9
      ]
    },
    {
      "key": "criteria",
      "label": "5 Organization risk-criteria configuration",
      "paragraphs": [
        51,
        70
      ],
      "tables": [
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20
      ]
    },
    {
      "key": "impacts",
      "label": "6 Impact screening and assessment",
      "paragraphs": [
        71,
        86
      ],
      "tables": [
        21,
        22,
        23
      ]
    },
    {
      "key": "risks",
      "label": "7 Risk and opportunity assessment",
      "paragraphs": [
        87,
        95
      ],
      "tables": [
        24,
        25
      ]
    },
    {
      "key": "treatment",
      "label": "8 Treatment, controls, and Statement of Applicability",
      "paragraphs": [
        96,
        110
      ],
      "tables": [
        26,
        27
      ]
    },
    {
      "key": "decisions",
      "label": "9 Separate human decisions",
      "paragraphs": [
        111,
        114
      ],
      "tables": [
        28,
        29
      ]
    },
    {
      "key": "monitoring",
      "label": "10 Implementation, verification, monitoring, and reassessment",
      "paragraphs": [
        115,
        124
      ],
      "tables": [
        30,
        31
      ]
    },
    {
      "key": "interfaces",
      "label": "11 Authoritative records and interfaces",
      "paragraphs": [
        125,
        126
      ],
      "tables": [
        32
      ]
    },
    {
      "key": "failures",
      "label": "12 Failure states and record protection",
      "paragraphs": [
        127,
        130
      ],
      "tables": [
        33
      ]
    },
    {
      "key": "gates",
      "label": "Appendix A Tailoring and issue gate",
      "paragraphs": [
        131,
        133
      ],
      "tables": [
        34
      ]
    },
    {
      "key": "scenario",
      "label": "Appendix B Minimum fictional verification scenario",
      "paragraphs": [
        134,
        141
      ],
      "tables": []
    },
    {
      "key": "glossary",
      "label": "Appendix C Organization-specific terms",
      "paragraphs": [
        142,
        144
      ],
      "tables": [
        35
      ]
    }
  ],
  "fields": [
    {
      "key": "T1R2C2",
      "physical": "T1R2C2",
      "section": "control",
      "label": "Document ID",
      "kind": "id",
      "editable": true,
      "help": "Enter the exact organization-assigned Document ID, separate from its owning Record ID.",
      "sourceQuote": "ORGANIZATION INPUT REQUIRED - ENTER VERIFIED INFORMATION - use the organization's document-ID convention; example: ORG-AIMS-RIM-001.",
      "binding": "documentId"
    },
    {
      "key": "T1R3C2",
      "physical": "T1R3C2",
      "section": "control",
      "label": "Version",
      "kind": "shared",
      "editable": true,
      "help": "Use the explicit working version label; Save does not advance it.",
      "sourceQuote": "ORGANIZATION INPUT REQUIRED - ENTER VERIFIED INFORMATION - examples: 0.1 for a working draft or 1.0 for a first issued version; follow the organization's version rules.",
      "binding": "version"
    },
    {
      "key": "T1R4C2",
      "physical": "T1R4C2",
      "section": "control",
      "label": "Organization document lifecycle status",
      "kind": "shared",
      "editable": true,
      "help": "Only Draft or Under review are editable in this working draft. No action approves or issues it.",
      "sourceQuote": "ORGANIZATION INPUT REQUIRED - CHOOSE ONE - Draft / Under review / Approved / Issued / Superseded / Retired.",
      "binding": "lifecycle"
    },
    {
      "key": "T1R5C2",
      "physical": "T1R5C2",
      "section": "control",
      "label": "Owner",
      "kind": "role",
      "editable": true,
      "help": "Enter the actual maintenance role or position. A directory contact does not appoint a role or grant authority.",
      "sourceQuote": "ORGANIZATION INPUT REQUIRED - ENTER VERIFIED INFORMATION - accountable maintenance role or position.",
      "binding": "owner",
      "reuseKinds": [
        "role"
      ]
    },
    {
      "key": "T1R6C2",
      "physical": "T1R6C2",
      "section": "control",
      "label": "Reviewer",
      "kind": "role",
      "editable": true,
      "help": "Enter the assigned reviewer role and required independence. Directory membership is not assignment or independence.",
      "sourceQuote": "ORGANIZATION INPUT REQUIRED - ENTER VERIFIED INFORMATION - assigned reviewer role or position; record required independence where applicable.",
      "binding": "reviewer",
      "reuseKinds": [
        "role"
      ]
    },
    {
      "key": "T1R7C2",
      "physical": "T1R7C2",
      "section": "control",
      "label": "Approver",
      "kind": "protected",
      "editable": false,
      "help": "Leave blank until the actual authorized assignment; OWL does not assign approval authority.",
      "sourceQuote": "ORGANIZATION INPUT REQUIRED - LEAVE BLANK UNTIL AUTHORIZED - assigned approval authority only; the template maintainer cannot appoint themselves through this field.",
      "binding": ""
    },
    {
      "key": "T1R8C2",
      "physical": "T1R8C2",
      "section": "control",
      "label": "Approval and effective dates",
      "kind": "protected",
      "editable": false,
      "help": "Leave blank until the corresponding external approval and issue events. Save time is not approval time.",
      "sourceQuote": "ORGANIZATION INPUT REQUIRED - LEAVE BLANK UNTIL AUTHORIZED - enter only after the corresponding approval and issue event.",
      "binding": ""
    },
    {
      "key": "T1R9C2",
      "physical": "T1R9C2",
      "section": "control",
      "label": "Review date or trigger",
      "kind": "review",
      "editable": true,
      "help": "Enter a planned date or interval and early-review triggers. This does not record that a review occurred.",
      "sourceQuote": "ORGANIZATION INPUT REQUIRED - ENTER VERIFIED INFORMATION - planned interval or date plus relevant early-review triggers.",
      "binding": ""
    },
    {
      "key": "T1R10C2",
      "physical": "T1R10C2",
      "section": "control",
      "label": "Classification and distribution",
      "kind": "shared",
      "editable": true,
      "help": "Use the organization classification and separate distribution limits; this input does not enforce access.",
      "sourceQuote": "ORGANIZATION INPUT REQUIRED - CHOOSE ONE under the organization's classification policy - Public / Internal / Confidential / Restricted / Other organization-defined classification; state distribution limits where needed.",
      "binding": "classification"
    },
    {
      "key": "T1R11C2",
      "physical": "T1R11C2",
      "section": "control",
      "label": "Controlled location",
      "kind": "shared",
      "editable": true,
      "help": "Enter an exact controlled repository, folder, document reference or durable URL.",
      "sourceQuote": "ORGANIZATION INPUT REQUIRED - ENTER VERIFIED INFORMATION - exact repository, controlled folder, document-management reference or durable URL; a filename alone is insufficient.",
      "binding": "location"
    },
    {
      "key": "T2R2C1",
      "physical": "T2R2C1",
      "section": "control",
      "label": "Version",
      "kind": "row",
      "editable": true,
      "help": "Optional human-authored revision entry. Approval record stays blank; Save does not create revision or approval facts.",
      "sourceQuote": "[enter]",
      "repeat": "history",
      "column": "version",
      "type": "text"
    },
    {
      "key": "T2R2C2",
      "physical": "T2R2C2",
      "section": "control",
      "label": "Date",
      "kind": "row",
      "editable": true,
      "help": "Optional human-authored revision entry. Approval record stays blank; Save does not create revision or approval facts.",
      "sourceQuote": "[enter]",
      "repeat": "history",
      "column": "date",
      "type": "date"
    },
    {
      "key": "T2R2C3",
      "physical": "T2R2C3",
      "section": "control",
      "label": "Change summary",
      "kind": "row",
      "editable": true,
      "help": "Optional human-authored revision entry. Approval record stays blank; Save does not create revision or approval facts.",
      "sourceQuote": "Initial organization tailoring",
      "repeat": "history",
      "column": "summary",
      "type": "text"
    },
    {
      "key": "T2R2C4",
      "physical": "T2R2C4",
      "section": "control",
      "label": "Author",
      "kind": "row",
      "editable": true,
      "help": "Optional human-authored revision entry. Approval record stays blank; Save does not create revision or approval facts.",
      "sourceQuote": "[enter]",
      "repeat": "history",
      "column": "author",
      "type": "text"
    },
    {
      "key": "T2R2C5",
      "physical": "T2R2C5",
      "section": "control",
      "label": "Reviewer",
      "kind": "row",
      "editable": true,
      "help": "Optional human-authored revision entry. Approval record stays blank; Save does not create revision or approval facts.",
      "sourceQuote": "[enter]",
      "repeat": "history",
      "column": "reviewer",
      "type": "text"
    },
    {
      "key": "T2R2C6",
      "physical": "T2R2C6",
      "section": "control",
      "label": "Approval record",
      "kind": "protected",
      "editable": false,
      "help": "Optional human-authored revision entry. Approval record stays blank; Save does not create revision or approval facts.",
      "sourceQuote": "[enter after approval]",
      "repeat": "history",
      "column": "approval",
      "type": "text"
    },
    {
      "key": "T3R2C1",
      "physical": "T3R2C1",
      "section": "purpose",
      "label": "Approved AIMS and method scope",
      "kind": "protected",
      "editable": false,
      "help": "The source explicitly says leave blank until authorized. Selected draft Manual or Policy facts cannot populate this block.",
      "sourceQuote": "ORGANIZATION INPUT REQUIRED - LEAVE BLANK UNTIL AUTHORIZED - current Manual and Policy Record IDs, applicable activities and systems, method owner and governing approval Decision ID."
    },
    {
      "key": "T5R2C1",
      "physical": "T5R2C1",
      "section": "roles",
      "label": "Organization role assignments and separation",
      "kind": "narrative",
      "editable": true,
      "help": "Identify actual roles, delegation limits, alternates, conflict checks, specialist triggers, independent review and escalation. Selected role metadata supplies a reference only.",
      "sourceQuote": "ORGANIZATION INPUT REQUIRED - ENTER VERIFIED INFORMATION - identify actual roles or named positions, delegation limits, alternates, conflict checks, specialist triggers, independent-review rules, and escalation routes",
      "reuseKinds": [
        "role"
      ]
    },
    {
      "key": "T7R2C1",
      "physical": "T7R2C1",
      "section": "intake",
      "label": "Organization-wide assessment intake rule",
      "kind": "narrative",
      "editable": true,
      "help": "Proposed source clarification: define the intake rule once; each actual case ID, scope, version, cut-off and method reference stays in the owning Assessment.",
      "sourceQuote": "ORGANIZATION INPUT REQUIRED - CHOOSE ONE assessment boundary - One AI system / Justified equivalent group / AIMS-level risk or opportunity; then enter stable IDs, assessment type and version, lifecycle stage, decision context, scope, evidence cut-off, method version and criteria version.",
      "reuseKinds": [
        "manual",
        "policy"
      ],
      "issueIds": [
        "RISK-01"
      ],
      "proposedWording": "define the intake rule once; each actual case ID, scope, version, cut-off and method reference stays in the owning Assessment."
    },
    {
      "key": "T8R2C1",
      "physical": "T8R2C1",
      "section": "intake",
      "label": "Organization-wide grouping rule",
      "kind": "narrative",
      "editable": true,
      "help": "Proposed source clarification: define when to assess separately and what demonstrates equivalent purpose, context, evidence, treatment, authority and review triggers. Do not enter one current case here.",
      "sourceQuote": "ORGANIZATION INPUT REQUIRED - CHOOSE ONE - Assess separately / Use a justified equivalent group. Grouping requires equivalent purpose, context, evidence, treatment, authority and review triggers.",
      "reuseKinds": [],
      "issueIds": [
        "RISK-01"
      ],
      "proposedWording": "define when to assess separately and what demonstrates equivalent purpose, context, evidence, treatment, authority and review triggers. Do not enter one current case here."
    },
    {
      "key": "T19R2C3",
      "physical": "T19R2C3",
      "section": "criteria",
      "label": "Implementation route and referenced method",
      "kind": "narrative",
      "editable": true,
      "help": "Choose Existing method, Existing method plus AI additions, or Procedure criteria; enter exact referenced Record IDs and versions. Metadata alone does not establish AI coverage or approval.",
      "sourceQuote": "CHOOSE ONE and enter referenced Record IDs and versions.",
      "reuseKinds": [
        "record"
      ],
      "sourceDefault": {
        "locator": "T19R2C2",
        "text": "Existing method; existing method plus AI additions; or the criteria in Sections 5.2-5.6."
      },
      "referenceTables": [
        "T11"
      ]
    },
    {
      "key": "T19R3C3",
      "physical": "T19R3C3",
      "section": "criteria",
      "label": "Scale and matrix",
      "kind": "narrative",
      "editable": true,
      "help": "Confirm or replace the scale and matrix; document reliable mapping or historical comparability limits. The proposed matrix is not an approved universal method.",
      "sourceQuote": "CONFIRM or replace. Map old and new scales when reliable; otherwise record the comparability limitation and preserve each historical criteria version.",
      "reuseKinds": [],
      "sourceDefault": {
        "locator": "T19R3C2",
        "text": "Four consequence levels, four likelihood levels, Unknown, and the matrix in 5.3."
      },
      "referenceTables": [
        "T12",
        "T13",
        "T14",
        "T15",
        "T16"
      ]
    },
    {
      "key": "T19R4C3",
      "physical": "T19R4C3",
      "section": "criteria",
      "label": "Treatment timing and exception authority",
      "kind": "narrative",
      "editable": true,
      "help": "Confirm or replace each timing and name the actual exception authority. No date or elapsed time creates acceptance.",
      "sourceQuote": "CONFIRM or replace each timing and name exception authority.",
      "reuseKinds": [],
      "sourceDefault": {
        "locator": "T19R4C2",
        "text": "Critical immediate; High 30 days; Moderate 60 days; Low review within 90 days."
      },
      "referenceTables": [
        "T17"
      ]
    },
    {
      "key": "T19R5C3",
      "physical": "T19R5C3",
      "section": "criteria",
      "label": "Decision authority",
      "kind": "narrative",
      "editable": true,
      "help": "Enter actual role titles and exact delegation or authority references. A selected Record does not prove the delegation covers this decision.",
      "sourceQuote": "ENTER role titles and link the delegation or authority record.",
      "reuseKinds": [
        "record"
      ],
      "sourceDefault": {
        "locator": "T19R5C2",
        "text": "Risk owner for bounded lower results; higher or executive authority for High or Critical results."
      },
      "referenceTables": []
    },
    {
      "key": "T19R6C3",
      "physical": "T19R6C3",
      "section": "criteria",
      "label": "Specialist review",
      "kind": "narrative",
      "editable": true,
      "help": "Confirm applicable roles and add sector-specific reviewers and triggering rules.",
      "sourceQuote": "CONFIRM applicable roles and add sector-specific reviewers.",
      "reuseKinds": [],
      "sourceDefault": {
        "locator": "T19R6C2",
        "text": "Compliance or Legal, Privacy or Data, Security, Procurement, affected-party input and independent challenge when triggered."
      },
      "referenceTables": [
        "T18"
      ]
    },
    {
      "key": "T19R7C3",
      "physical": "T19R7C3",
      "section": "criteria",
      "label": "Mandatory escalation",
      "kind": "narrative",
      "editable": true,
      "help": "Confirm safeguards, add stricter triggers where necessary and record specialist interpretation.",
      "sourceQuote": "CONFIRM, add stricter triggers where needed, and record any specialist interpretation.",
      "reuseKinds": [],
      "sourceDefault": {
        "locator": "T19R7C2",
        "text": "Use the safeguards in 5.6."
      },
      "referenceTables": [
        "T18"
      ]
    },
    {
      "key": "T19R8C3",
      "physical": "T19R8C3",
      "section": "criteria",
      "label": "Review and approved criteria identity - source clarification pending",
      "kind": "protected",
      "editable": false,
      "help": "Read-only in this working draft: the source mixes editable review triggers with approval Decision ID, effective date and approved criteria identity. RISK-02 proposes one authoritative approval block; the source is unchanged.",
      "sourceQuote": "CONFIRM or replace the review triggers; ENTER criteria owner, Record ID, version, approval Decision ID, effective date, controlled location and predecessor.",
      "issueIds": [
        "RISK-02"
      ],
      "sourceDefault": {
        "locator": "T19R8C2",
        "text": "No value in this template creates approval before an authorized Decision is recorded. Review at least annually and when material changes affect purpose, people, data, model, provider, autonomy, obligations, incidents, performance, evidence or authority."
      },
      "referenceTables": []
    },
    {
      "key": "T20R2C1",
      "physical": "T20R2C1",
      "section": "criteria",
      "label": "Approved criteria record",
      "kind": "protected",
      "editable": false,
      "help": "Leave the approved criteria identity blank in this working draft. The actual approval, exact Record/version/effective date and predecessor require their retained authoritative records.",
      "sourceQuote": "ORGANIZATION INPUT REQUIRED - choose the route in 5.1, complete the organization decisions in 5.7, then enter the approved criteria Record ID, version, owner, approval Decision ID, effective date, controlled location, review trigger and predecessor. Do not use the criteria in Sections 5.2-5.6 as an approved Method Record before authorization.",
      "issueIds": [
        "RISK-02"
      ]
    },
    {
      "key": "T23R2C1",
      "physical": "T23R2C1",
      "section": "impacts",
      "label": "Impact-assessment depth and consultation rule",
      "kind": "narrative",
      "editable": true,
      "help": "Define proportionate depth, expertise, affected-party input, accessibility, sensitive-data handling, disagreement and escalation.",
      "sourceQuote": "ORGANIZATION INPUT REQUIRED - ENTER VERIFIED INFORMATION - choose and justify proportional depth, expertise, affected-party input, accessibility, sensitive-data handling, disagreement recording and mandatory escalation.",
      "reuseKinds": []
    },
    {
      "key": "T27R2C1",
      "physical": "T27R2C1",
      "section": "treatment",
      "label": "Permitted treatment and control configuration",
      "kind": "narrative",
      "editable": true,
      "help": "Select all supported routes: Avoid, Modify, Share or transfer, Retain within authority, Pursue an opportunity, Other approved treatment; define timing, control selection, Annex A comparison, SoA issue, effectiveness review and escalation. This does not select treatment for an actual risk.",
      "sourceQuote": "ORGANIZATION INPUT REQUIRED - SELECT ALL THAT APPLY for permitted treatment - Avoid / Modify / Share or transfer / Retain within authority / Pursue an opportunity / Other approved treatment; also define timing, control-selection authority, Annex A comparison, SoA issue authority, effectiveness review and escalation.",
      "reuseKinds": []
    },
    {
      "key": "T29R2C1",
      "physical": "T29R2C1",
      "section": "decisions",
      "label": "Decision authority and conditional acceptance rule",
      "kind": "narrative",
      "editable": true,
      "help": "Define delegation by decision type and risk level, over-authority escalation, permitted conditions, expiry, monitoring, communication, non-fulfilment and confirmation. The permitted-intent wording in source T28 needs RISK-03 alignment with actual Register outcome families.",
      "sourceQuote": "ORGANIZATION INPUT REQUIRED - ENTER VERIFIED INFORMATION - define delegation by decision type and risk level, over-authority escalation, permitted conditions, expiry, monitoring, communication, non-fulfilment consequence, and confirmation trigger",
      "reuseKinds": [],
      "issueIds": [
        "RISK-03"
      ]
    },
    {
      "key": "T31R2C1",
      "physical": "T31R2C1",
      "section": "monitoring",
      "label": "Monitoring and reassessment configuration",
      "kind": "narrative",
      "editable": true,
      "help": "Define measures, thresholds, owners, review frequency, triggers, reassessment authority, supersession, urgent escalation and retained evidence.",
      "sourceQuote": "ORGANIZATION INPUT REQUIRED - ENTER VERIFIED INFORMATION - define measures, thresholds, owners, planned review frequency, event triggers, reassessment authority, supersession rules, urgent escalation, and retained evidence",
      "reuseKinds": []
    },
    {
      "key": "T34R2C3",
      "physical": "T34R2C3",
      "section": "gates",
      "label": "Scope and ownership",
      "kind": "gate",
      "editable": false,
      "help": "OPEN. Human evaluation and retained evidence are required; filled fields and clean software checks cannot complete this gate.",
      "sourceQuote": "OPEN",
      "sourceRequirement": {
        "locator": "T34R2C2",
        "text": "Approved AIMS scope, actual process owner, assessment roles, and authoritative record homes"
      }
    },
    {
      "key": "T34R3C3",
      "physical": "T34R3C3",
      "section": "gates",
      "label": "Criteria",
      "kind": "gate",
      "editable": false,
      "help": "OPEN. Human evaluation and retained evidence are required; filled fields and clean software checks cannot complete this gate.",
      "sourceQuote": "OPEN",
      "sourceRequirement": {
        "locator": "T34R3C2",
        "text": "Approved versioned risk concept, consequence, likelihood, evaluation, tolerance, escalation, priority, and confidence rules"
      }
    },
    {
      "key": "T34R4C3",
      "physical": "T34R4C3",
      "section": "gates",
      "label": "Authority",
      "kind": "gate",
      "editable": false,
      "help": "OPEN. Human evaluation and retained evidence are required; filled fields and clean software checks cannot complete this gate.",
      "sourceQuote": "OPEN",
      "sourceRequirement": {
        "locator": "T34R4C2",
        "text": "Named treatment, residual-risk, SoA, and lifecycle decision authorities with delegation and conflict rules"
      }
    },
    {
      "key": "T34R5C3",
      "physical": "T34R5C3",
      "section": "gates",
      "label": "Impact process",
      "kind": "gate",
      "editable": false,
      "help": "OPEN. Human evaluation and retained evidence are required; filled fields and clean software checks cannot complete this gate.",
      "sourceQuote": "OPEN",
      "sourceRequirement": {
        "locator": "T34R5C2",
        "text": "Approved screening threshold, depth, consultation, sensitive-data, disagreement, and escalation rules"
      }
    },
    {
      "key": "T34R6C3",
      "physical": "T34R6C3",
      "section": "gates",
      "label": "Treatment and verification",
      "kind": "gate",
      "editable": false,
      "help": "OPEN. Human evaluation and retained evidence are required; filled fields and clean software checks cannot complete this gate.",
      "sourceQuote": "OPEN",
      "sourceRequirement": {
        "locator": "T34R6C2",
        "text": "Permitted options, control and SoA route, Action evidence, effectiveness review, and projected-versus-verified separation"
      }
    },
    {
      "key": "T34R7C3",
      "physical": "T34R7C3",
      "section": "gates",
      "label": "Monitoring and history",
      "kind": "gate",
      "editable": false,
      "help": "OPEN. Human evaluation and retained evidence are required; filled fields and clean software checks cannot complete this gate.",
      "sourceQuote": "OPEN",
      "sourceRequirement": {
        "locator": "T34R7C2",
        "text": "Measures, triggers, review timing, reassessment, supersession, retention, access, and retrieval arrangements"
      }
    },
    {
      "key": "T34R8C3",
      "physical": "T34R8C3",
      "section": "gates",
      "label": "System test",
      "kind": "gate",
      "editable": false,
      "help": "OPEN. Human evaluation and retained evidence are required; filled fields and clean software checks cannot complete this gate.",
      "sourceQuote": "OPEN",
      "sourceRequirement": {
        "locator": "T34R8C2",
        "text": "Fictional end-to-end test including severe impact, misleading aggregate, missing evidence, unimplemented treatment, over-authority refusal, and reassessment"
      }
    },
    {
      "key": "T34R9C3",
      "physical": "T34R9C3",
      "section": "gates",
      "label": "Approval and issue",
      "kind": "gate",
      "editable": false,
      "help": "OPEN. Human evaluation and retained evidence are required; filled fields and clean software checks cannot complete this gate.",
      "sourceQuote": "OPEN",
      "sourceRequirement": {
        "locator": "T34R9C2",
        "text": "Recorded method approval, effective date, controlled distribution, predecessor handling, and linked current criteria Record"
      }
    },
    {
      "key": "T35R2C1",
      "physical": "T35R2C1",
      "section": "glossary",
      "label": "Term or abbreviation",
      "kind": "row",
      "editable": true,
      "help": "Optional organization-specific term; add only when needed.",
      "sourceQuote": "ORGANIZATION INPUT REQUIRED - ENTER VERIFIED INFORMATION - organization-specific term or abbreviation; add a row only when needed.",
      "repeat": "glossary",
      "column": "term",
      "type": "text"
    },
    {
      "key": "T35R2C2",
      "physical": "T35R2C2",
      "section": "glossary",
      "label": "Organization-specific meaning",
      "kind": "row",
      "editable": true,
      "help": "Optional organization-specific term; add only when needed.",
      "sourceQuote": "[enter only if needed]",
      "repeat": "glossary",
      "column": "meaning",
      "type": "text"
    },
    {
      "key": "T35R2C3",
      "physical": "T35R2C3",
      "section": "glossary",
      "label": "Authority or source",
      "kind": "row",
      "editable": true,
      "help": "Optional organization-specific term; add only when needed.",
      "sourceQuote": "[enter]",
      "repeat": "glossary",
      "column": "source",
      "type": "text"
    }
  ],
  "history": [
    [
      "version",
      "Version"
    ],
    [
      "date",
      "Date"
    ],
    [
      "summary",
      "Change summary"
    ],
    [
      "author",
      "Author"
    ],
    [
      "reviewer",
      "Reviewer"
    ],
    [
      "approval",
      "Approval record"
    ]
  ],
  "glossary": [
    [
      "term",
      "Term or abbreviation"
    ],
    [
      "meaning",
      "Organization-specific meaning"
    ],
    [
      "source",
      "Authority or source"
    ]
  ],
  "gates": [
    "Scope and ownership",
    "Criteria",
    "Authority",
    "Impact process",
    "Treatment and verification",
    "Monitoring and history",
    "System test",
    "Approval and issue"
  ],
  "issues": [
    {
      "id": "RISK-01",
      "state": "Proposed - source unchanged",
      "locations": [
        "T7R2C1",
        "T8R2C1"
      ],
      "problem": "Individual case inputs are embedded in an organization-wide procedure; groups and AIMS-level needs exceed the one-system Assessment route.",
      "proposal": "Configure organization-wide intake/grouping rules and retain each actual case in its owning Assessment."
    },
    {
      "id": "RISK-02",
      "state": "Proposed - source unchanged",
      "locations": [
        "T19R8C3",
        "T20R2C1"
      ],
      "problem": "Review triggers and approved identity are mixed, and approved criteria identity is requested twice.",
      "proposal": "Separate review configuration from one authoritative approved criteria block; keep both source blocks protected in this preview."
    },
    {
      "id": "RISK-03",
      "state": "Proposed - source unchanged",
      "locations": [
        "T28R2C3",
        "T28R4C3",
        "T28R5C3"
      ],
      "problem": "Permitted decision intent differs from actual type-specific Register outcome labels.",
      "proposal": "Map method intent to approved outcome families; preserve projected/verified basis and separate lifecycle authority."
    }
  ],
  "referenceTables": {
    "T11": {
      "key": "T11",
      "label": "Implementation routes",
      "rows": [
        [
          "Route",
          "Use when",
          "What the practitioner does"
        ],
        [
          "Existing method",
          "An approved organization method adequately covers the criteria and AI-specific risk and impact needs.",
          "Reference its controlled Record ID and version; do not duplicate it."
        ],
        [
          "Existing method plus AI additions",
          "An approved method exists but material AI-specific gaps remain.",
          "Reference the existing method and add only the missing rules, owners, triggers and evidence expectations."
        ],
        [
          "Procedure criteria",
          "No adequate approved method is available.",
          "Use Sections 5.2-5.6 as the first complete draft, tailor the decisions in 5.7 and obtain authorized approval before use."
        ]
      ]
    },
    "T12": {
      "key": "T12",
      "label": "Consequence scale",
      "rows": [
        [
          "Consequence",
          "Meaning",
          "Typical indicators"
        ],
        [
          "1 Limited",
          "Small, reversible effect handled through routine work with no material denial of access, rights, safety, service or governance objectives.",
          "Brief correction; isolated low-impact error; negligible disruption."
        ],
        [
          "2 Moderate",
          "Noticeable effect requiring managed correction or treatment, but normally reversible and limited in scale or duration.",
          "Repeated service error; avoidable inconvenience; localized control weakness."
        ],
        [
          "3 Major",
          "Material effect on people, obligations, operations or AIMS objectives requiring senior attention, specialist review or substantial treatment.",
          "Significant access or financial effect; material security, privacy, regulatory or contractual concern."
        ],
        [
          "4 Severe",
          "Serious, widespread, difficult-to-reverse or potentially unlawful effect, or failure threatening fundamental AIMS objectives or continued authorized use.",
          "Credible serious rights, safety or livelihood effect; systemic discrimination; large-scale sensitive-data harm; loss of meaningful human control."
        ]
      ]
    },
    "T13": {
      "key": "T13",
      "label": "Likelihood scale and Unknown",
      "rows": [
        [
          "Likelihood",
          "Meaning",
          "Evidence expectation"
        ],
        [
          "1 Unlikely",
          "Not expected under normal conditions, although credible pathways exist.",
          "Relevant evidence supports infrequent occurrence and no unresolved contrary signal exists."
        ],
        [
          "2 Possible",
          "Could occur under plausible operating, misuse, change or failure conditions.",
          "Evidence shows a credible pathway, comparable event, meaningful exposure or material uncertainty."
        ],
        [
          "3 Likely",
          "Expected in some normal or reasonably foreseeable conditions.",
          "Testing, monitoring, incidents, complaints or comparable evidence shows recurring or probable occurrence."
        ],
        [
          "4 Almost certain",
          "Expected repeatedly or across a material portion of use without effective intervention.",
          "Strong current evidence shows frequent occurrence, persistent exposure or ineffective controls."
        ],
        [
          "Unknown",
          "Available evidence cannot support a credible estimate.",
          "State what is missing. Major or Severe consequence with Unknown likelihood is at least High under this procedure."
        ]
      ]
    },
    "T14": {
      "key": "T14",
      "label": "Qualitative evaluation matrix",
      "rows": [
        [
          "Consequence / likelihood",
          "1 Unlikely",
          "2 Possible",
          "3 Likely",
          "4 Almost certain"
        ],
        [
          "1 Limited",
          "Low",
          "Low",
          "Moderate",
          "High"
        ],
        [
          "2 Moderate",
          "Low",
          "Moderate",
          "High",
          "High"
        ],
        [
          "3 Major",
          "Moderate",
          "High",
          "High",
          "Critical"
        ],
        [
          "4 Severe",
          "High",
          "Critical",
          "Critical",
          "Critical"
        ]
      ]
    },
    "T15": {
      "key": "T15",
      "label": "Opportunity results",
      "rows": [
        [
          "Opportunity result",
          "Use when",
          "Required route"
        ],
        [
          "Monitor",
          "Potential benefit is limited, weakly evidenced or not currently actionable.",
          "Name an owner and review trigger; retain the evidence gap."
        ],
        [
          "Consider",
          "A useful and plausible benefit needs validation, resources or comparison with alternatives.",
          "Define a bounded exploration or evidence-gathering action before commitment."
        ],
        [
          "Prioritize",
          "Material benefit is supported, aligns with AIMS objectives and has a feasible accountable route.",
          "Create an authorized plan with owner, resources, measures, risks and review timing."
        ],
        [
          "Strategic",
          "Substantial organization-wide benefit is supported and needs top-management sponsorship or material resources.",
          "Escalate for explicit management decision; preserve dependencies, constraints and success measures."
        ],
        [
          "Under review",
          "Material uncertainty prevents a supported opportunity conclusion.",
          "State missing evidence, owner and trigger; do not represent the benefit as achieved."
        ]
      ]
    },
    "T16": {
      "key": "T16",
      "label": "Evidence and confidence",
      "rows": [
        [
          "Confidence",
          "Evidence condition",
          "Effect on readiness"
        ],
        [
          "High",
          "Relevant, sufficiently complete, current, representative and independently checked where required.",
          "May support a conclusion within the reviewer's competence and authority."
        ],
        [
          "Medium",
          "Generally relevant but contains bounded gaps, assumptions or limited representativeness.",
          "May support a qualified or conditional recommendation when limitations and follow-up are explicit."
        ],
        [
          "Low",
          "Material evidence is missing, stale, contradictory, unrepresentative or not independently checked when required.",
          "Cannot reduce a risk result and blocks readiness when the missing evidence could materially change the conclusion."
        ]
      ]
    },
    "T17": {
      "key": "T17",
      "label": "Minimum response and target timing",
      "rows": [
        [
          "Result",
          "Minimum response",
          "Target timing"
        ],
        [
          "Low",
          "Maintain proportionate measures and monitor the stated trigger.",
          "Review within 90 days or earlier trigger."
        ],
        [
          "Moderate",
          "Define proportionate treatment or an explicit retain proposal with owner and monitoring.",
          "Plan within 60 days and before a dependent authorization."
        ],
        [
          "High",
          "Treatment and specialist review are required unless an authorized decision records another lawful route.",
          "Plan before the supported lifecycle decision and normally within 30 days."
        ],
        [
          "Critical",
          "Escalate immediately. Do not begin or expand the affected use; contain, restrict or pause where authorized.",
          "Immediate escalation; no silent grace period."
        ],
        [
          "Unknown material risk",
          "Gather missing evidence and apply interim safeguards. Treat Major or Severe consequence with Unknown likelihood as at least High.",
          "Before ready-for-decision status."
        ]
      ]
    },
    "T18": {
      "key": "T18",
      "label": "Mandatory escalation safeguards",
      "rows": [
        [
          "Condition",
          "Required response"
        ],
        [
          "Potentially prohibited, unlawful or licence-inconsistent activity",
          "Stop the affected decision route and obtain qualified Compliance or Legal review; the assessment does not decide legality."
        ],
        [
          "Credible Severe effect on rights, safety, livelihood, essential access or a vulnerable group",
          "Escalate to top management and required specialists; require full impact assessment and independent challenge."
        ],
        [
          "Consequential decision without meaningful human authority, information or review",
          "Block ready-for-decision status until oversight and contestability are adequately designed and evidenced."
        ],
        [
          "Sensitive personal, financial or transaction data without adequate privacy, security, provenance or access evidence",
          "Require relevant Privacy, Data and Information Security review and an appropriate interim restriction."
        ],
        [
          "Material supplier limitation, unverifiable claim or unnotified model, data or service change",
          "Record the limitation, assess fallback or restriction, and escalate through Procurement and the relevant control owner."
        ],
        [
          "Low confidence could materially change consequence, likelihood, treatment or authorization",
          "Keep the conclusion qualified or blocked; assign missing evidence and a reassessment trigger."
        ],
        [
          "Assessor conflict, self-approval or decision beyond recorded delegation",
          "Reassign or escalate; treat the affected decision as not authorized until a valid decision-maker acts."
        ]
      ]
    }
  }
};
const freeze=v=>{if(v&&typeof v==='object'){Object.values(v).forEach(freeze);Object.freeze(v);}return v;};return freeze(catalog);
});
