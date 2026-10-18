# Application

Start from [OWL's README](../README.md). [Setup](../docs/SETUP.md) owns runtime and test instructions; [Architecture](../docs/ARCHITECTURE.md) owns the source layout and data flow.

`server.cjs` serves the current UI on loopback. Application services write local SQLite through the shared store. `core/` contains deterministic record models; `public/` contains the current browser code and styles. `tests/` includes isolated persistence, HTTP, UI behavior and storage-compatibility checks.

The normal application is a single-operator fictional development workspace. Optional Codex assistance uses a narrowly bounded cloud-backed task. Team identity and assignments are tested in isolated stores; native team governance writes remain unconnected. See [current verification and limits](../docs/VERIFICATION.md).
