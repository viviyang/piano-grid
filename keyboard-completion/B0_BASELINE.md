# Keyboard Notes B0 baseline

Date: 2026-09-15

## Clean production base

- [已核实] Worktree: `C:\Users\Admin\Documents\viviyang_github\piano-keyboard-completion-20260915`
- [已核实] Branch: `codex/keyboard-completion`
- [已核实] Base: latest fetched `origin/main@48d1745b84427d35784c1e7a79e1332af31858c1` (`Merge pull request #1 from viviyang/codex/site-tdh-unification`). The local `main` ref was at `4bfd070`; it was not moved because it was checked out in another worktree.
- [已核实] Initial `git status --short`: empty.
- [已核实] The dirty `codex/chords-b1` worktree was not reset, cleaned, stashed or used as the implementation base.
- [已核实] The completion pack's `01_MASTER_CONTEXT.md` and `PianoGrid_Current_Handoff.zip` references were not present in the supplied archive, attachments or repository. This baseline therefore records that the requested snapshot-to-base file diff could not be reproduced from those two artifacts.

## Latest-main Keyboard implementation found before changes

- [已核实] Public pages existed for `/keyboard-notes`, `/keyboard-notes/labeled`, `/keyboard-notes/chart` and `/keyboard-notes/finger-numbers`.
- [已核实] `LookupExperience`, `LabeledExperience`, `ChartExperience`, `KeyboardDiagram`, `StaffDiagram`, shared `ReferenceAudio` integration, print DOM and four labeled PDF files existed.
- [已核实] Both canonical layout arrays existed: 88 keys/MIDI 21-108 and 61 keys/MIDI 36-96.
- [已核实] The Chart reader excluded every range with `first_release_scope`; that excluded the prepared `61_keys` C2-C7 mode.
- [已核实] Lookup parsing lived inside the React component rather than a shared `LookupResolution`/`PitchSelection` source. It did not expose distinct typed states or share restoration.
- [已核实] No Find-this-note or Read-this-note practice existed.
- [已核实] Labeled print used the content reading segments and the existing 88-key PDF was nine pages. Chart print divided ranges into six-key segments.
- [已核实] `/keyboard-notes/blank` and `/keyboard-notes/frequencies` had approved content/data in `page-content.master.json` but no routes. Original 13/25-key SVG assets and Letter/A4 PDFs existed under `docs/content/site-master/assets`.

## Read-only dirty-branch comparison

- [已核实] `git diff --name-status 48d1745..codex/chords-b1` reported Keyboard-adjacent changes in the three app pages, `keyboard-content.ts`, `site-routes.ts`, and `check-keyboard-data.mjs`, plus deletion of the finger-numbers route relative to latest main.
- [推断] Those differences are not a trustworthy Keyboard completion source because the named branch contains unrelated dirty Chords/Scales work and the supplied Handoff snapshot itself is missing.

## Baseline verification (before implementation)

- [已核实] `npm ci`: 49 packages installed from the lockfile; 0 vulnerabilities.
- [已核实] `npm run check`: failed at foundation with 563 passed / 2 failed (`Only authorized layout/page/component TSX`, `Only necessary authorized chord components`). Typecheck/CSS did not run because the chained command stopped at the existing foundation failure.
- [已核实] `node scripts/check-keyboard-data.mjs`: 1691 passed / 15 failed. All 15 failures were immutable-source hash assertions already mismatched on latest main.
- [已核实] `npm run build`: passed; 202 static pages generated. The large route count and unrelated Chords/Scales routes are facts of latest main, not changes introduced by this Keyboard branch.

## Evidence boundary

- [已核实] Existing HTML/components prove code paths exist; they do not by themselves prove browser interaction, device, listening, screen-reader or physical-print acceptance.
- [推断] The implementation phase must add targeted resolver, practice, share, print-parity and browser assertions before any Keyboard completion sign-off.
