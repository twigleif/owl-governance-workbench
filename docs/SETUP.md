# Setup and verification commands

## Supported development environment

The application is currently verified on Windows with PowerShell, a local disk and the bundled development runtime. No dependency installer, package manifest or lockfile is provided. There are no application npm dependencies; the Node services use built-in modules.

| Dependency | Current requirement |
| --- | --- |
| Node.js | Must expose node:sqlite with SQLite 3.51.3 or newer. The verified development runtime is Node 24.19.0 with SQLite 3.53.3. |
| Python | PDF generation and original previews use the bundled Python executable; OWL_PYTHON_BIN overrides that executable. |
| Python libraries | ReportLab 4.4.9, pypdf 6.10.0 and Pillow 12.3.0. The renderers reject changed pinned library versions where checked. |
| Poppler | Bundled pdftoppm.exe is required for PDF page previews. Its current path is tied to the bundled development runtime. |
| Windows fonts | Segoe UI regular/bold; Microsoft JhengHei is used as the available CJK fallback. Font hashes are included in the saved PDF basis. |
| Optional Codex | CLI 0.162.0-alpha.17.2, existing ChatGPT sign-in and an available account model. Manual editing and deterministic document drafting do not require inference. |

The launcher first looks under the current user's `.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/`, then falls back to Node on PATH. Preview code expects Python under the matching `dependencies/python/` and Poppler under `dependencies/native/poppler/Library/bin/`. The report renderer also resolves bundled Poppler. Python's override does not relocate Poppler or provide Windows fonts.

The real-PDF tests currently contain a workstation-specific absolute Python path in reports.test.cjs and originals.test.cjs. That is an outstanding portability limitation. This source can be inspected independently, but full PDF testing on another machine needs a separately reviewed runtime configuration change. Do not report the full suite as portable merely because core Node tests run.

## Start

From the source root:

```powershell
./Start-OWL.ps1
# Or choose a different loopback port:
./Start-OWL.ps1 -Port 4319
```

The default URL is `http://127.0.0.1:4318/`. Use the exact loopback address printed by the launcher; Host/Origin checks reject alternate addresses. Stop the service with Ctrl+C in its terminal.

Startup with --docent-demo creates the fictional workspace only when none exists. Existing saved work is retained. The normal database is runtime/owl-local/workspace.sqlite. Do not delete or replace it to reset a demonstration. Keep organization data out of this development workspace.

The UI can inspect Codex connection status, but inference is invoked by explicit Send/Prepare. See [the provider boundary](AI_ASSISTANCE.md) before using those actions. No inference is needed for the automated suite below.

## Automated checks

Use a compatible Node runtime and the PDF prerequisites above:

```powershell
$owlTests = Get-ChildItem -LiteralPath app/tests -Filter '*.test.cjs' |
    ForEach-Object { $_.FullName }
node --test @owlTests
```

Tests create isolated temporary stores and ignored runtime/test-artifacts content. They inject fake provider adapters and do not need a real model call, account enrollment or an operator database. The fixture tests require the frozen sources under app/tests/fixtures/; they do not need private recovery folders.

If storage reports an unsupported format, stop and use a compatible reader or a verified recovery copy. Do not clear version markers or recreate missing identity tables. See [data and recovery](DATA_AND_ACCESS.md).
