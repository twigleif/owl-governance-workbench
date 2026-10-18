# Optional AI assistance

The working model connection is restricted to one fictional transcript-access task. Deterministic document templates and manual record editing are separate capabilities. This connection is not a general company-data assistant, retrieval system or autonomous governance agent.

## Trigger and outbound context

Explicit chat Send or the fixed Prepare action invokes Codex through its stdio App Server. The adapter is pinned to CLI 0.162.0-alpha.17.2 and checks managed ChatGPT authentication. It does not require a copied API key. Account model availability and usage limits still apply; the optional task makes an external inference request.

| Included | Excluded from automatic context |
| --- | --- |
| Exact fictional workspace/Assessment/Review IDs and revisions; task question, result and uncertainty | General organization context and responsibilities |
| Unchanged fictional Requirement002, Risk002, Control002 and proposed links | System purpose/owner notes and private review rationale |
| PUBLIC001 / BASE001 / PLAN001 source inventory and the admitted bodies | Newly uploaded originals, authored documents, arbitrary Library files and unrelated saved drafts |
| Submitted conversation text, prior replies and human chat-draft edits in that conversation | Other conversations and general local files |

The current context endpoint exposes the submitted inventory and exclusions. Chat messages themselves can contain user-entered information; they are not redacted into fictional data automatically. The application limits each message to 2,000 characters, conversation context to 32,000 characters and 24 turns. A turn has a 120-second development time limit.

## Tools and authority

The model receives only owl_get_task and owl_get_source for the three admitted fictional Record IDs. Both triggers require the task to be read and limit references to allowed IDs. Chat additionally checks that each cited source was actually read during that turn. The older fixed Prepare validator does not enforce that per-source-read condition; its references need human checking. The adapter verifies inherited integrations and selected tool restrictions before starting; unsupported configurations are refused. Source bodies and prior assistant replies are untrusted data.

No model-facing tool can save a governance record, issue an approval, accept risk, mark a Review complete or claim a performed operating test. The application checks output shape, limits, allowed/read source IDs and input identity. Those checks do not prove factual support, instruction-following quality or evidence sufficiency.

## Human use and technical history

The conversation ledger retains the submitted input, policy/input digests, callback events, model identity, original reply and terminal outcome. Human draft edits are separate from the immutable assistant output. In chat, inspect/edit useful questions and choose Save request draft; the request and human conversation edit are retained together. The older fixed Prepare action uses Use in request draft to fill an unsaved editor before its Save. Neither path sends an external request or changes the Review result.

Only one model response runs at a time. Stop preserves the submitted message and prevents a late result from applying. It establishes local cancellation handling, not provider acknowledgement or zero charged usage. Failed or interrupted work remains unconfirmed/stopped; there is no automatic retry-until-pass behavior.

The admitted context is fictional and narrow. General ingestion, semantic retrieval, company-data admission, local-model execution and a full Prepare → Review → Apply → Decision lifecycle remain unfinished. A future connection must define its exact sources, targets, permissions, authority, cancellation/recovery and evaluation oracles before activation.
