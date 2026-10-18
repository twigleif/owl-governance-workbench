# Architecture

OWL uses a local HTTP server, browser controllers, deterministic domain modules and one SQLite writer. It has no separate microservices or required hosted database.

| Location | Responsibility |
| --- | --- |
| app/server.cjs | Loopback HTTP routes, session boundary, static assets and service wiring |
| app/store.cjs | Native workspace, shared transaction, expected revisions, command receipts and fixed task projection |
| app/core/ | Native schemas, validation, references, history, deterministic preparation models and fictional seed |
| app/public/ | Current HTML, controllers, editor buffers, navigation and styles |
| app/public/styles/ | Shared current styles served through the existing asset URLs |
| app/originals.cjs, original-transport.cjs, original-preview.* | Exact original bytes, bounded intake and local preview |
| app/authoring*.cjs | Deterministic templates, draft saves, immutable versions and retained evidence |
| app/reviews.cjs, evidence-use.cjs, activity.cjs | Typed Review resolution, source-use links and saved activity projections |
| app/reports.cjs, pdf-service.cjs, render-report.py | Frozen report basis, generation lifecycle and exact retained binaries |
| app/conversations.cjs, chat-service.cjs, codex.cjs | Technical conversation state and bounded optional model adapter |
| app/identity.cjs, team-store.cjs, team-transport.cjs | Isolated identity, roles, grants, assignments and authenticated technical APIs |
| app/storage-capabilities.cjs, original-recovery.cjs | Reader compatibility guards and file-inclusive recovery checks |
| app/tests/ | Behavior, persistence, HTTP, compatibility and UI-controller checks |

## Data flow

An editor holds unsaved text locally. A deliberate Save sends an operation ID, target IDs and expected revisions to the owning service. The shared writer validates the basis and performs the record change, operation receipt and relevant history in one transaction. Replaying an identical operation returns its receipt; reusing its ID with different content is rejected. A stale target returns a conflict rather than silently overwriting a newer value.

Browser views are projections of those owners. Technical conversation rows and PDF jobs have their own state; they are not another editable governance master. In chat, a human inspects/edits useful questions and explicitly chooses Save request draft; the request and conversation edit are saved atomically. The older fixed-task Use in request draft action instead fills an unsaved editor before its ordinary Save.

PDF generation freezes saved values, source captures, revisions and renderer/font identity. Generation takes place outside the write transaction, then validates output hashes before retaining PDF/page bytes. Older reports remain retrievable when the current basis changes or a later render fails.

## Storage and compatibility

The native workspace remains a versioned JSON record model within SQLite; managed originals, authored versions, conversation turns, report artifacts and operation receipts use their own tables. SQLite WAL, FULL synchronous mode and foreign-key checks are enabled. The storage envelope and feature declarations identify the compatible readers required for managed originals, authored documents and isolated identity data.

Preflight refuses unsupported or inconsistent feature declarations before writes. Frozen predecessor readers verify refusal of newer original/document workspaces. These protections are behaviorally tested; they do not qualify a production migration or disaster-recovery program.

## Source and appearance identity

All runtime modules and browser assets are application-owned. No old design directory is needed to start or test the application. Some current module and stylesheet basenames retain preview terminology; these files are active application dependencies, not a gallery of old pages.

app/core/SOURCES.json and app/public/styles/PROVENANCE.json retain exact source hashes. Historical logical schema names in PDF manifests and frozen fixture imports are mapped to the current physical files. Those identity labels preserve saved report bases and compatibility; they do not make the old directories runtime dependencies.

The independent runtime-contract.json and UI CSS fixtures pin the current seed, PDF identity and 35 served asset URLs. The current presentation uses moss, white and charcoal, contextual editors, retained popup context and separate conversation/report tools. Preserve layout, wording, focus/navigation, editor recovery and save behavior during refactors. Asset hashes and DOM doubles cannot establish native painted/focus/scroll equivalence; that needs a rendered check in a permitted environment.

## Team boundary

Normal startup uses the existing single-operator path. Team mode is an isolated API-only backend: it refuses the normal workspace path and does not start legacy source/chat/original/PDF services. Identity and assignment operations do not authorize native governance writes. Connecting team actors to native history, source access and governed actions is unfinished.
