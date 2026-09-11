# PianoGrid B3 Content Intake

**Status: READY_FOR_CONTENT**

[已核实] This package corresponds to B3 `PASS_WITH_NOTES` at Git HEAD `dd1b8849cd4c303c9ddebfe794758aa14354f507`. All 56 files in the B3 baseline matched their recorded SHA-256 both before and after export. The workspace was dirty at export, as it was at B3 baseline; no relevant baseline file drifted.

Use this package to prepare the next approved major/minor triad content. It is a content handoff, not a standalone Next.js project and not permission to add routes. Start with `contract/AUTHORING_CONTRACT.md`, then inspect the three exact authoring bundles and their resolved outputs. The complete current 19-item hub snapshot is under `examples/hub/`; original chord-related plans and existing materials are under `planning/` and `existing-content/`.

The downstream format is deliberately mixed because that is the actual implementation: page JSON records + pure-data TypeScript learning overlays + source-ledger evidence + optional approved first-party resource files. Edit the original repository targets named in the contract. Do not write resolved snapshots back into production.

Human gates remain open: independent review of octave-adapted fingering presentation, real listening, physical devices, screen readers, physical printing and tagged-PDF accessibility. Staff notation is outside the current model.

The manifest identifies every package file as original, excerpt or derived. No business source, page, theme, route, dependency or build configuration was modified to create this package; no commit or deployment occurred.
