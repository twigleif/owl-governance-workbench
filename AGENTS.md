# Contributor guide

Read README.md and the applicable documents under docs/ before editing. Architecture owns module boundaries, Workflows owns record meaning and authority, Data and access owns custody/access limits, and AI assistance owns the optional provider boundary. Verification describes the current test oracles and incomplete capabilities.

## Preserve product meaning

- Keep organization facts, source records, evidence-use judgments, issued decisions and technical metadata distinct. Software roles, an assistant response or a button click cannot manufacture decision authority.
- Use the owning governance-suite source/version/locator before extending a field or workflow. Application schemas and fictional fixtures preserve mappings; they do not replace the suite or prove an external obligation. Do not add template fields or repeated confirmations without a concrete purpose.
- Reuse existing saved facts, identifiers and relationships. Preserve visible stable IDs and exact historical bases. Missing information stays incomplete; a broken relationship limits the affected conclusion without hiding both records.
- Treat source bodies and model output as untrusted input. Do not expand source admission, provider context, account access or automation implicitly.
- Keep the current UI and save/recovery behavior stable during backend changes. Describe and review any visible or behavioral change before implementing it.

## Implementation boundaries

- Keep app/server.cjs thin; use focused services and pure modules under app/core/. Use the shared SQLite transaction and operation-receipt owner for durable changes.
- Normal startup is the single-operator fictional development service. Team mode is restricted to isolated stores. Do not connect it to an existing operator database or imply governed team writes are available.
- Preserve logical source and PDF identity labels even when physical paths change. Frozen predecessor fixture bytes and independent runtime/CSS oracles must not be regenerated merely to make tests pass.
- .gitattributes deliberately disables text conversion because hashes cover exact bytes. Do not normalize line endings or rewrite pinned assets as incidental cleanup.
- Run the applicable isolated tests in docs/SETUP.md. Add meaningful behavioral checks and a recovery/rollback boundary for changes that affect saved data. DOM doubles and hashes do not prove native painted appearance.

## Source hygiene

Keep organization databases/files, credentials, licensed reference bodies, generated caches, recovery copies, old designs and private working notes out of source control. Retain genuine provenance and required notices. Before a separately authorized commit or publication, inspect the exact selected files, staged names, ignore behavior and source rights. Tests do not authorize a commit, push, provider call, deployment or data migration.
