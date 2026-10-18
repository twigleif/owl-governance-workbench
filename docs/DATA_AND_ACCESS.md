# Data, access and recovery

## Custody

The normal workspace is runtime/owl-local/workspace.sqlite on local disk. It includes the native workspace, exact managed originals, authored versions/artifacts, conversations, operation receipts, history projections and retained report binaries. Temporary render work and development recovery material live under ignored runtime/ paths. The source distribution includes only fictional inputs and fixed sample assets.

One organization belongs to one installation/workspace. Do not combine company data or assume that moving source code moves its records. Company cutover needs an approved backup, verified recovery and separately authorized removal of the old working copy. The current fictional seed is not an organization onboarding/migration facility.

Managed originals accept PDF, PNG, JPEG and UTF-8 TXT/MD up to 20 MiB per file, subject to a shared 200 MiB source-content budget. Format validation, parser time/output/page limits and local previews reduce accidental misuse; they are not malware scanning or a qualified operating-system sandbox. Metadata changes do not rewrite original bytes. Linking a file does not establish evidence sufficiency or legal/contractual permission to process it.

## Current access enforcement

The normal service binds to 127.0.0.1, checks Host/Origin and rejects cross-site requests. API calls require a random page-issued session header; the page has a restrictive Content Security Policy. These are local request protections. The normal operator app has no named-user login, no complete per-person authorization and no claim of tenant isolation or production security. Local filesystem/OS access remains significant; the app does not provide encryption at rest.

The separate identity backend verifies credentials and sessions, roles, same-scope grants and named assignments in isolated stores. Its mapped technical APIs are tested; legacy native/source/binary/provider routes are refused. Do not activate it on the existing operator database. Actor-aware native history, full read/write/source/artifact authorization, concurrent governance behavior and the team UI need their reviewed connection before team use.

Role possession and task assignment do not issue an approval or transfer substantive decision authority. Historical operator names and external decisions retain their original provenance.

## Optional external processing

An explicit AI Send/Prepare may transfer the fixed fictional task/source projection and submitted conversation context to OpenAI through the pinned Codex adapter. Local record custody does not imply offline inference. Keep private or company information out of submitted chat messages; chat text is outbound when sent.

Original uploads, authored documents, organization notes and private review rationale are not automatically added to the task's allowlisted source inventory. A new source or provider context requires a separately scoped admission. See [the exact AI boundary](AI_ASSISTANCE.md).

## Compatibility and recovery

Use a compatible reader for the workspace's declared feature versions. Missing/inconsistent feature tables or unsupported versions are refused; do not delete declarations, lower versions or recreate identity tables to bypass the refusal.

original-recovery.cjs provides file-inclusive SQLite recovery manifests and integrity checks. backup-development.cjs produces a development snapshot and code overlay tied to the current checkout. These mechanisms are tested in isolated copies; they are not a qualified production backup program or automatic restore command. A recovery package must include the exact database/binaries and compatible source/runtime/assets, with verified reopening before replacement. Copying a live SQLite main file alone can omit WAL changes.

Stop the service before any authorized replacement. Keep the original workspace and verified compatible recovery material until the replacement is confirmed. Do not restore a database merely to roll back a documentation or source-path change.

Runtime databases, backups, exports, credentials, licensed source bodies and private notes belong outside the source repository. A source .gitignore reduces accidental additions but does not remove files or secrets from an existing Git history.
