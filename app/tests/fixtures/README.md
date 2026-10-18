# Compatibility fixtures

These preserved OWL source modules exercise storage compatibility without local recovery folders or saved organization data. They are test inputs, not application entry points.

- `before-original-files/` verifies that the envelope-1 predecessor refuses a workspace containing managed originals before reconciliation or mutation.
- `before-authored-documents/` produces historical typed evidence-link events and verifies that the envelope-2 predecessor refuses an authored-document workspace.

Each `manifest.json` records the original source location, exact byte length, SHA-256 and complete sibling-import closure. Source bytes and recorded historical imports are unchanged. The loaders in `originals.test.cjs` and `authoring.test.cjs` retain fixture sibling precedence, module caches and application-relative filenames/directories. `../support/legacy-imports.cjs` maps only the seven recorded historical native import identifiers to the same modules under `app/core/`; Node builtins and other application imports retain their normal resolution. The separate authored-document old-reader refusal uses the same mapping. These aliases relocate code without changing the historical reader or its storage rules. No database, recovery package, credential, provider client or binary asset is included.

Run from the repository root with a compatible Node runtime:

```powershell
node --test app/tests/originals.test.cjs app/tests/authoring.test.cjs
```

The existing real PDF checks also require the documented Python, parser, Poppler and font prerequisites.
