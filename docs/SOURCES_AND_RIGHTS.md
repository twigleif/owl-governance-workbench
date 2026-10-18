# Source provenance and distribution scope

## Governance-suite relationship

OWL translates a governance documentation suite into deterministic records and workflows. The suite remains upstream for field meaning, responsibility and applicable instructions. The application covers a subset; unimplemented documents/workflows remain part of the wider suite.

| Mapping | Source identity and current code locator |
| --- | --- |
| Register records and choices | AIMS-Governance-Register.xlsx; app/core/reference-schema.js retains sheet/column keys, option-source identities and hashes |
| Assessment and review/evidence fields | AI-System-Governance-Assessment-Template.xlsx; app/core/assessment-schema.js retains field labels, source locators and options |
| Owner-input requests | app/core/owner-inputs-schema.js and owner-*-profiles.js retain exact target fields, source pins, dependencies and conditional eligibility |
| Manual | AIMS-Manual-D255.docx; app/core/document-schema.js retains source hash and input locators |
| Policy | AI-Governance-Policy-D255.docx; app/core/policy-document-schema.js retains source hash and input locators |
| Risk, lifecycle, assurance procedures | Corresponding *-document-schema.js modules retain document identities, source hashes and input locators |
| Drafted artifacts and reports | authoring.cjs and reports.cjs retain their own source/basis captures; they do not replace an owning suite record |

These identities explain implemented mappings. The private controlled suite bodies and licensed standards are not included. A metadata pointer or hash is not access to the source, permission to redistribute it or proof that its rule applies. Some source identities contain historical local paths; these are provenance labels, not required installation paths. Do not rewrite original evidence or historical identities merely to tidy presentation.

Before extending a suite-backed feature, use the actual controlled source/version, verify the relevant locator and applicability, and preserve the source-to-field-to-owner map. Do not infer external requirements from a template or an application schema. Keep source corrections and implementation changes separately scoped.

## Included fictional inputs and assets

- docs/product/examples/docent-case/ contains fictional exercise notes and public-feature baseline/inventory text. Their headings distinguish public product observations from simulated organization facts and proposed tests. They are not records of an actual control test.
- output/pdf/ contains OWL-Docent-Transcript-Access-Brief.pdf and OWL-Docent-Journey-Sample.pdf. These are fixed fictional sample/parser inputs, not new exported company reports.
- assets/appearance/sample-portraits.png is a synthetic three-person sprite. SAMPLE_PORTRAITS.json retains its generation provenance. The subjects are not authenticated users, contacts or approvers.
- app/core/SOURCES.json and app/public/styles/PROVENANCE.json retain application-source/stylesheet byte identities. app/tests/fixtures/ retains minimal predecessor sources and independent oracles for behavioral compatibility.

Current stylesheet/module names or historical source labels may use prototype/preview terminology. They identify current dependencies or compatibility inputs; no old design page collection is included.

## Excluded material and licensing status

Organization records/databases, private reference bodies, licensed standards/screenshots, credentials, local recovery copies, old design pages, personal decision diaries and build-session handoffs are outside this source distribution. Required source provenance, attribution and genuine notices remain intact.

No repository-wide open-source license has been selected. Do not infer a license grant from file availability. External runtime libraries and Windows fonts are prerequisites, not bundled redistributions; they retain their own terms. Any later publication still needs an exact file/history review and a deliberate licensing/distribution choice.
