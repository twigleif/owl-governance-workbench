/* Exact D-063 assessment fields from the owning suite; no storage or judgments. */
(function(root,factory){
  if(typeof module==='object'&&module.exports)module.exports=factory();
  else root.OWLAssessmentSchema=factory();
})(globalThis,function(){
  'use strict';
  const fields={
  "summary": [
    {
      "key": "assessment_record_id",
      "label": "Assessment Record ID",
      "source": "B5",
      "type": "id",
      "options": null,
      "wording": false
    },
    {
      "key": "assessment_date",
      "label": "Assessment date",
      "source": "E5",
      "type": "date",
      "options": null,
      "wording": false
    },
    {
      "key": "system_id",
      "label": "AI System ID",
      "source": "B6",
      "type": "id",
      "options": null,
      "wording": false
    },
    {
      "key": "conclusion",
      "label": "Conclusion",
      "source": "E6",
      "type": "choice",
      "options": [
        "Criteria satisfied",
        "Criteria satisfied with limitations",
        "Criteria not satisfied",
        "Unable to conclude"
      ],
      "wording": false
    },
    {
      "key": "scope",
      "label": "Assessment scope",
      "source": "B7",
      "type": "text",
      "options": null,
      "wording": true
    },
    {
      "key": "conclusion_rationale",
      "label": "Conclusion rationale",
      "source": "E7",
      "type": "text",
      "options": null,
      "wording": true
    },
    {
      "key": "trigger",
      "label": "Assessment trigger",
      "source": "B8",
      "type": "choice",
      "options": [
        "Initial assessment",
        "Planned review",
        "Proposed significant change",
        "Actual significant change",
        "Incident or performance concern",
        "Requirement change",
        "Other"
      ],
      "wording": false
    },
    {
      "key": "recommendation",
      "label": "Recommendation",
      "source": "E8",
      "type": "choice",
      "options": [
        "Proceed to decision",
        "Proceed to decision with conditions",
        "Remediate before decision",
        "Pause or restrict pending decision",
        "Retire or discontinue consideration",
        "No recommendation"
      ],
      "wording": false
    },
    {
      "key": "trigger_details",
      "label": "Trigger details (required when trigger is Other)",
      "source": "B9",
      "type": "text",
      "options": null,
      "wording": true
    },
    {
      "key": "recommendation_rationale",
      "label": "Recommendation rationale",
      "source": "E9",
      "type": "text",
      "options": null,
      "wording": true
    },
    {
      "key": "assessed_state",
      "label": "Assessed state",
      "source": "B10",
      "type": "text",
      "options": null,
      "wording": true
    },
    {
      "key": "limitations",
      "label": "Material limitations (or None identified)",
      "source": "E10",
      "type": "text",
      "options": null,
      "wording": true
    },
    {
      "key": "baseline_record_id",
      "label": "Baseline Record ID (if one exists)",
      "source": "B11",
      "type": "pointer",
      "options": null,
      "wording": false
    },
    {
      "key": "unresolved",
      "label": "Unresolved matters (or None identified)",
      "source": "E11",
      "type": "text",
      "options": null,
      "wording": true
    },
    {
      "key": "evidence_cutoff",
      "label": "Evidence cut-off",
      "source": "B12",
      "type": "date",
      "options": null,
      "wording": false
    },
    {
      "key": "decision_requested",
      "label": "Decision requested",
      "source": "E12",
      "type": "text",
      "options": null,
      "wording": true
    },
    {
      "key": "lead",
      "label": "Assessment lead",
      "source": "B13",
      "type": "text",
      "options": null,
      "wording": false
    },
    {
      "key": "method_record_id",
      "label": "Method Record ID",
      "source": "B14",
      "type": "pointer",
      "options": null,
      "wording": false
    }
  ],
  "profile": [
    {
      "key": "name",
      "label": "System name",
      "source": "B5",
      "type": "text",
      "options": null,
      "wording": false
    },
    {
      "key": "technical_context",
      "label": "Technical context",
      "source": "E5",
      "type": "text",
      "options": null,
      "wording": true
    },
    {
      "key": "intended_purpose",
      "label": "Intended purpose",
      "source": "B6",
      "type": "text",
      "options": null,
      "wording": true
    },
    {
      "key": "societal_context",
      "label": "Societal context",
      "source": "E6",
      "type": "text",
      "options": null,
      "wording": true
    },
    {
      "key": "intended_use",
      "label": "Intended use",
      "source": "B7",
      "type": "text",
      "options": null,
      "wording": true
    },
    {
      "key": "jurisdictions",
      "label": "Jurisdictions considered",
      "source": "E7",
      "type": "text",
      "options": null,
      "wording": false
    },
    {
      "key": "business_process",
      "label": "Business process",
      "source": "B8",
      "type": "text",
      "options": null,
      "wording": false
    },
    {
      "key": "boundary",
      "label": "System boundary",
      "source": "E8",
      "type": "text",
      "options": null,
      "wording": true
    },
    {
      "key": "organization_role",
      "label": "Organization role",
      "source": "B9",
      "type": "text",
      "options": null,
      "wording": false
    },
    {
      "key": "outputs",
      "label": "Outputs and downstream use",
      "source": "E9",
      "type": "text",
      "options": null,
      "wording": true
    },
    {
      "key": "lifecycle_route",
      "label": "Lifecycle route",
      "source": "B10",
      "type": "text",
      "options": null,
      "wording": false
    },
    {
      "key": "human_oversight",
      "label": "Human oversight",
      "source": "E10",
      "type": "text",
      "options": null,
      "wording": true
    },
    {
      "key": "lifecycle_state",
      "label": "Lifecycle state",
      "source": "B11",
      "type": "text",
      "options": null,
      "wording": false
    },
    {
      "key": "monitoring",
      "label": "Monitoring approach",
      "source": "E11",
      "type": "text",
      "options": null,
      "wording": true
    },
    {
      "key": "system_owner",
      "label": "System owner",
      "source": "B12",
      "type": "text",
      "options": null,
      "wording": false
    },
    {
      "key": "known_failures",
      "label": "Known limitations and failures",
      "source": "E12",
      "type": "text",
      "options": null,
      "wording": true
    },
    {
      "key": "intended_users",
      "label": "Intended users",
      "source": "B13",
      "type": "text",
      "options": null,
      "wording": false
    },
    {
      "key": "material_changes",
      "label": "Material changes (required for reassessment)",
      "source": "E13",
      "type": "text",
      "options": null,
      "wording": true
    },
    {
      "key": "foreseeable_misuse",
      "label": "Foreseeable misuse",
      "source": "B14",
      "type": "text",
      "options": null,
      "wording": true
    },
    {
      "key": "restrictions",
      "label": "Use restrictions",
      "source": "B15",
      "type": "text",
      "options": null,
      "wording": true
    },
    {
      "key": "affected_parties",
      "label": "Affected parties",
      "source": "B16",
      "type": "text",
      "options": null,
      "wording": true
    }
  ],
  "elements": [
    {
      "key": "id",
      "label": "Element ID",
      "source": "A18",
      "type": "id",
      "options": null,
      "wording": false
    },
    {
      "key": "type",
      "label": "Element type",
      "source": "B18",
      "type": "choice",
      "options": [
        "AI model",
        "Data",
        "Tool",
        "Infrastructure",
        "Integration",
        "Supplier service",
        "Human role",
        "Other"
      ],
      "wording": false
    },
    {
      "key": "name",
      "label": "Element name",
      "source": "C18",
      "type": "text",
      "options": null,
      "wording": false
    },
    {
      "key": "version",
      "label": "Version or identifier",
      "source": "D18",
      "type": "text",
      "options": null,
      "wording": false
    },
    {
      "key": "role",
      "label": "Role in system",
      "source": "E18",
      "type": "text",
      "options": null,
      "wording": true
    },
    {
      "key": "responsible_party",
      "label": "Responsible party",
      "source": "F18",
      "type": "text",
      "options": null,
      "wording": false
    },
    {
      "key": "characteristics",
      "label": "Relevant characteristics",
      "source": "G18",
      "type": "text",
      "options": null,
      "wording": true
    },
    {
      "key": "dependency",
      "label": "Dependency or limitation",
      "source": "H18",
      "type": "text",
      "options": null,
      "wording": true
    }
  ],
  "review": [
    {
      "key": "id",
      "label": "Review Item ID",
      "source": "A5",
      "type": "id",
      "options": null,
      "wording": false
    },
    {
      "key": "topic",
      "label": "Topic",
      "source": "B5",
      "type": "choice",
      "options": [
        "Purpose and use",
        "Governance and accountability",
        "System resources",
        "Data",
        "Lifecycle and change",
        "Verification and validation",
        "Human oversight",
        "Transparency and communication",
        "Operation and monitoring",
        "Incidents",
        "Suppliers and third parties",
        "Requirements and obligations"
      ],
      "wording": false
    },
    {
      "key": "criterion_type",
      "label": "Criterion type",
      "source": "C5",
      "type": "choice",
      "options": [
        "Requirement",
        "Control",
        "Procedure or method",
        "Risk-driven criterion",
        "Other approved criterion"
      ],
      "wording": false
    },
    {
      "key": "criterion_id",
      "label": "Criterion ID",
      "source": "D5",
      "type": "pointer",
      "options": null,
      "wording": false
    },
    {
      "key": "criterion_locator",
      "label": "Criterion locator",
      "source": "E5",
      "type": "text",
      "options": null,
      "wording": false
    },
    {
      "key": "question",
      "label": "Review question",
      "source": "F5",
      "type": "text",
      "options": null,
      "wording": true
    },
    {
      "key": "scope",
      "label": "Review scope",
      "source": "G5",
      "type": "choice",
      "options": [
        "AI system",
        "System element"
      ],
      "wording": false
    },
    {
      "key": "element_id",
      "label": "Element ID",
      "source": "H5",
      "type": "pointer",
      "options": null,
      "wording": false
    },
    {
      "key": "applicability",
      "label": "Applicability",
      "source": "I5",
      "type": "choice",
      "options": [
        "Applicable",
        "Not applicable",
        "Under review"
      ],
      "wording": false
    },
    {
      "key": "applicability_rationale",
      "label": "Applicability rationale",
      "source": "J5",
      "type": "text",
      "options": null,
      "wording": true
    },
    {
      "key": "evaluation_level",
      "label": "Evaluation level",
      "source": "K5",
      "type": "choice",
      "options": [
        "Documented design",
        "Implemented state",
        "Observed operation",
        "Evaluated effectiveness",
        "Other defined basis"
      ],
      "wording": false
    },
    {
      "key": "result",
      "label": "Review result",
      "source": "L5",
      "type": "choice",
      "options": [
        "Not reviewed",
        "Satisfied",
        "Partly satisfied",
        "Not satisfied",
        "Insufficient evidence"
      ],
      "wording": false
    },
    {
      "key": "result_rationale",
      "label": "Result rationale",
      "source": "M5",
      "type": "text",
      "options": null,
      "wording": true
    },
    {
      "key": "uncertainty",
      "label": "Material uncertainty",
      "source": "N5",
      "type": "text",
      "options": null,
      "wording": true
    },
    {
      "key": "finding_id",
      "label": "Finding ID",
      "source": "O5",
      "type": "pointer",
      "options": null,
      "wording": false
    },
    {
      "key": "action_id",
      "label": "Action ID",
      "source": "P5",
      "type": "pointer",
      "options": null,
      "wording": false
    },
    {
      "key": "reviewer",
      "label": "Row reviewer",
      "source": "Q5",
      "type": "text",
      "options": null,
      "wording": false
    },
    {
      "key": "review_date",
      "label": "Review date",
      "source": "R5",
      "type": "date",
      "options": null,
      "wording": false
    }
  ],
  "impacts": [
    {
      "key": "id",
      "label": "Impact ID",
      "source": "A5",
      "type": "id",
      "options": null,
      "wording": false
    },
    {
      "key": "direction",
      "label": "Direction",
      "source": "B5",
      "type": "choice",
      "options": [
        "Positive",
        "Negative"
      ],
      "wording": false
    },
    {
      "key": "affected_level",
      "label": "Affected level",
      "source": "C5",
      "type": "choice",
      "options": [
        "Individual",
        "Group of individuals",
        "Society"
      ],
      "wording": false
    },
    {
      "key": "affected_party",
      "label": "Affected party",
      "source": "D5",
      "type": "text",
      "options": null,
      "wording": false
    },
    {
      "key": "context",
      "label": "Impact context",
      "source": "E5",
      "type": "choice",
      "options": [
        "Deployment",
        "Intended use",
        "Foreseeable misuse",
        "Predictable failure",
        "Lifecycle or change"
      ],
      "wording": false
    },
    {
      "key": "element_id",
      "label": "Element ID",
      "source": "F5",
      "type": "pointer",
      "options": null,
      "wording": false
    },
    {
      "key": "review_id",
      "label": "Review Item ID",
      "source": "G5",
      "type": "pointer",
      "options": null,
      "wording": false
    },
    {
      "key": "source",
      "label": "Source or condition",
      "source": "H5",
      "type": "text",
      "options": null,
      "wording": true
    },
    {
      "key": "consequence",
      "label": "Potential consequence",
      "source": "I5",
      "type": "text",
      "options": null,
      "wording": true
    },
    {
      "key": "criteria_locator",
      "label": "Criteria locator",
      "source": "J5",
      "type": "text",
      "options": null,
      "wording": false
    },
    {
      "key": "result",
      "label": "Impact result",
      "source": "K5",
      "type": "text",
      "options": null,
      "wording": false
    },
    {
      "key": "result_rationale",
      "label": "Result rationale",
      "source": "L5",
      "type": "text",
      "options": null,
      "wording": true
    },
    {
      "key": "uncertainty",
      "label": "Material uncertainty",
      "source": "M5",
      "type": "text",
      "options": null,
      "wording": true
    },
    {
      "key": "handoff",
      "label": "Risk handoff",
      "source": "N5",
      "type": "choice",
      "options": [
        "Create risk or opportunity",
        "Existing risk or opportunity",
        "No separate risk",
        "Under review"
      ],
      "wording": false
    },
    {
      "key": "risk_id",
      "label": "Risk or Opportunity ID",
      "source": "O5",
      "type": "pointer",
      "options": null,
      "wording": false
    },
    {
      "key": "handoff_rationale",
      "label": "Handoff rationale",
      "source": "P5",
      "type": "text",
      "options": null,
      "wording": true
    },
    {
      "key": "assessor",
      "label": "Row assessor",
      "source": "Q5",
      "type": "text",
      "options": null,
      "wording": false
    },
    {
      "key": "assessment_date",
      "label": "Assessment date",
      "source": "R5",
      "type": "date",
      "options": null,
      "wording": false
    }
  ],
  "risks": [
    {
      "key": "id",
      "label": "Risk or Opportunity ID",
      "source": "A5",
      "type": "id",
      "options": null,
      "wording": false
    },
    {
      "key": "type",
      "label": "Type",
      "source": "B5",
      "type": "choice",
      "options": [
        "Risk",
        "Opportunity"
      ],
      "wording": false
    },
    {
      "key": "origin_type",
      "label": "Origin type",
      "source": "C5",
      "type": "choice",
      "options": [
        "Impact",
        "Review item",
        "System element",
        "Assessment context"
      ],
      "wording": false
    },
    {
      "key": "origin_id",
      "label": "Origin ID",
      "source": "D5",
      "type": "pointer",
      "options": null,
      "wording": false
    },
    {
      "key": "source",
      "label": "Source or condition",
      "source": "E5",
      "type": "text",
      "options": null,
      "wording": true
    },
    {
      "key": "event",
      "label": "Event or uncertainty",
      "source": "F5",
      "type": "text",
      "options": null,
      "wording": true
    },
    {
      "key": "affected",
      "label": "Affected objectives or parties",
      "source": "G5",
      "type": "text",
      "options": null,
      "wording": true
    },
    {
      "key": "consequence",
      "label": "Consequence or benefit",
      "source": "H5",
      "type": "text",
      "options": null,
      "wording": true
    },
    {
      "key": "criteria_locator",
      "label": "Criteria locator",
      "source": "I5",
      "type": "text",
      "options": null,
      "wording": false
    },
    {
      "key": "initial_result",
      "label": "Initial result",
      "source": "J5",
      "type": "text",
      "options": null,
      "wording": false
    },
    {
      "key": "initial_rationale",
      "label": "Initial rationale",
      "source": "K5",
      "type": "text",
      "options": null,
      "wording": true
    },
    {
      "key": "existing_measures",
      "label": "Existing measures",
      "source": "L5",
      "type": "text",
      "options": null,
      "wording": true
    },
    {
      "key": "response",
      "label": "Proposed response",
      "source": "M5",
      "type": "text",
      "options": null,
      "wording": true
    },
    {
      "key": "projected_result",
      "label": "Projected result",
      "source": "N5",
      "type": "text",
      "options": null,
      "wording": false
    },
    {
      "key": "projected_rationale",
      "label": "Projected rationale",
      "source": "O5",
      "type": "text",
      "options": null,
      "wording": true
    },
    {
      "key": "verified_result",
      "label": "Verified result",
      "source": "P5",
      "type": "text",
      "options": null,
      "wording": false
    },
    {
      "key": "verified_rationale",
      "label": "Verified rationale",
      "source": "Q5",
      "type": "text",
      "options": null,
      "wording": true
    },
    {
      "key": "uncertainty",
      "label": "Material uncertainty",
      "source": "R5",
      "type": "text",
      "options": null,
      "wording": true
    },
    {
      "key": "assessor",
      "label": "Row assessor",
      "source": "S5",
      "type": "text",
      "options": null,
      "wording": false
    },
    {
      "key": "assessment_date",
      "label": "Assessment date",
      "source": "T5",
      "type": "date",
      "options": null,
      "wording": false
    }
  ],
  "evidence": [
    {
      "key": "id",
      "label": "Evidence Use ID",
      "source": "A5",
      "type": "id",
      "options": null,
      "wording": false
    },
    {
      "key": "item_type",
      "label": "Assessment item type",
      "source": "B5",
      "type": "choice",
      "options": [
        "System profile",
        "System element",
        "Review item",
        "Impact",
        "Risk or opportunity",
        "Assessment conclusion"
      ],
      "wording": false
    },
    {
      "key": "item_id",
      "label": "Assessment item ID",
      "source": "C5",
      "type": "pointer",
      "options": null,
      "wording": false
    },
    {
      "key": "record_id",
      "label": "Record ID",
      "source": "D5",
      "type": "pointer",
      "options": null,
      "wording": false
    },
    {
      "key": "locator",
      "label": "Evidence locator",
      "source": "E5",
      "type": "text",
      "options": null,
      "wording": false
    },
    {
      "key": "period",
      "label": "Evidence period",
      "source": "F5",
      "type": "text",
      "options": null,
      "wording": false
    },
    {
      "key": "claim",
      "label": "Claim evaluated",
      "source": "G5",
      "type": "text",
      "options": null,
      "wording": true
    },
    {
      "key": "result",
      "label": "Use result",
      "source": "H5",
      "type": "choice",
      "options": [
        "Not reviewed",
        "Supports",
        "Partly supports",
        "Contradicts",
        "Inconclusive"
      ],
      "wording": false
    },
    {
      "key": "rationale",
      "label": "Relevance rationale",
      "source": "I5",
      "type": "text",
      "options": null,
      "wording": true
    },
    {
      "key": "limitation",
      "label": "Material limitation",
      "source": "J5",
      "type": "text",
      "options": null,
      "wording": true
    },
    {
      "key": "access",
      "label": "Access at review",
      "source": "K5",
      "type": "choice",
      "options": [
        "Available",
        "Partly available",
        "Unavailable",
        "Not checked"
      ],
      "wording": false
    },
    {
      "key": "reviewer",
      "label": "Row reviewer",
      "source": "L5",
      "type": "text",
      "options": null,
      "wording": false
    },
    {
      "key": "review_date",
      "label": "Review date",
      "source": "M5",
      "type": "date",
      "options": null,
      "wording": false
    }
  ]
};
  const tables=Object.freeze(['elements','review','impacts','risks','evidence']);
  const units=Object.freeze(['summary','profile',...tables]);
  const sheets=Object.freeze(['summary','system','review','impacts','risks','evidence']);
  const labels=Object.freeze({summary:'Summary',system:'System',profile:'System profile',elements:'System elements',review:'Review',impacts:'Impacts',risks:'Risks',evidence:'Evidence'});
  for(const list of Object.values(fields))for(const f of list){if(f.options)Object.freeze(f.options);Object.freeze(f);}for(const list of Object.values(fields))Object.freeze(list);Object.freeze(fields);
  const blank=unit=>{if(!units.includes(unit))throw Error('Unknown assessment unit.');return Object.fromEntries(fields[unit].map(f=>[f.key,'']));};
  return Object.freeze({fields,tables,units,sheets,labels,blank});
});
