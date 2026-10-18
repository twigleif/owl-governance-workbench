# OWL

OWL is a local-first AI governance and assurance workbench. It connects system context, review questions, exact evidence versions and saved outputs while keeping factual records and human decisions distinct from model suggestions.

The current application is a **single-operator development workbench with a fictional Docent case**. It demonstrates a bounded working path, rather than a complete governance platform or a production deployment. The wider governance suite supplies record meanings; this source distribution implements a subset of that suite.

## What works

- Edit saved organization and system context, review notes and evidence links, with revision checks and history.
- Keep original PDF, PNG, JPEG and UTF-8 text/Markdown files locally; reuse exact versions in a Review without uploading them again.
- Prepare system cards, supplier information requests and control test records from deterministic templates; deliberately retain a saved version as evidence.
- Generate and reopen a focused transcript-access brief with its exact saved basis, PDF and page images.
- Optionally ask a source-bounded Codex assistant to explain the fictional review or draft evidence questions. Inspect/edit useful wording, then explicitly Save request draft.

Named accounts, roles and assignments are implemented and tested in isolated development stores. They are **not connected to the running operator workspace or its governed writes**. General ingestion/retrieval, autonomous assessment, a full team workflow and full-suite coverage are not implemented in this application.

## Run the fictional workspace

On the supported Windows development environment, from this folder:

```powershell
./Start-OWL.ps1
```

Open `http://127.0.0.1:4318/`. The launcher preserves an existing workspace and creates the fictional seed only when no workspace exists. Read [setup and prerequisites](docs/SETUP.md) first: Node needs a compatible built-in SQLite engine, and PDF/preview features currently rely on specific Python, Poppler and Windows-font dependencies. This is not yet a portable one-command installation.

Records stay in local SQLite. Optional AI Send/Prepare actions transfer the allowlisted fictional task/source context and submitted conversation to OpenAI through Codex. Uploaded originals and document drafts do not automatically become model context. See [data and access](docs/DATA_AND_ACCESS.md) and [AI assistance](docs/AI_ASSISTANCE.md).

## Read the system

| Document | Purpose |
| --- | --- |
| [Setup](docs/SETUP.md) | Runtime prerequisites, startup and isolated tests |
| [Architecture](docs/ARCHITECTURE.md) | Modules, data flow, transactions and storage compatibility |
| [Workflows](docs/WORKFLOWS.md) | Record ownership, ordinary use, authority and failure paths |
| [Data and access](docs/DATA_AND_ACCESS.md) | Local custody, provider boundary, access and recovery limits |
| [AI assistance](docs/AI_ASSISTANCE.md) | Model inputs, allowed tools, output handling and limits |
| [Verification](docs/VERIFICATION.md) | Test coverage, evidence limits and unfinished work |
| [Sources and rights](docs/SOURCES_AND_RIGHTS.md) | Suite provenance, fictional assets and distribution scope |

The source tree contains `app/` for the application and tests, `assets/` for the current synthetic portrait asset, `docs/` for product documentation and fictional inputs, and `output/pdf/` for two fixed fictional sample PDFs. Runtime data, licensed reference bodies, old design pages and private development notes are outside the source distribution.

OWL does not issue approvals, accept risk or establish compliance. A valid link, completed form, model response or passing test does not establish evidence sufficiency or operating effectiveness.
