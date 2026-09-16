# Integration Fix Intake — 2026-09-16

## Repository state

| Field | Value |
| --- | --- |
| Path | `C:\Users\Admin\Documents\viviyang_github\pianogrid-final-integration` |
| Branch | `codex/final-integration` |
| HEAD | `c9651ba` (`feat(keyboard-notes): ship practice and challenge flow`) |
| B04 committed? | No — B04 remains uncommitted dirty/untracked on this worktree |
| Deploy this round? | Forbidden (no commit / push / deploy) |

## Known dirty / overlapping owners (pre-fix)

- Shared keyboard: `keyboard-diagram.tsx`, `share-control.tsx`, `keyboard-notes-workspace.tsx`
- B04: `src/app/tools/hear-the-difference/`, `src/components/hear-the-difference/`, `src/lib/hear-the-difference*.ts`, check scripts
- Site wiring already touched by B04: `site-routes.ts`, `integration-content.ts`, `seo-editorial.ts`, support/chord content, check allowlists
- Unrelated pre-existing dirty (do not overwrite): `home-color-repair.css`, foundation check artifacts, songs/tools noise unless required for allowlist

## Business owners (current code)

| Concern | Owner |
| --- | --- |
| Practice state / presets | `keyboard-notes-workspace.tsx` + `keyboard-practice.ts` |
| Explore lookup / spelling | `keyboard-notes-workspace.tsx` + `keyboard-resolution.ts` |
| Labeled reference | `labeled-experience.tsx` |
| Share helpers / UI | `share-control.tsx` |
| Keyboard presentation / roles | `keyboard-diagram.tsx` + keyboard CSS |
| Note audio | `use-note-audio.ts` → `ReferenceAudio` |
| B04 challenge / compare audio | `experience.tsx` + `use-comparison-audio.ts` |
| B04 pair model | `hear-the-difference-core.ts` |

## F01–F12 current-code verification

| ID | Status on current code | Evidence |
| --- | --- | --- |
| F01 | **STILL PRESENT** | `startPractice` prefers `sharedPreset` whenever start is clean even after option change sets `roundPreset` null (`workspace` ~278–294, 415, 446). Matches probe P02. |
| F02 | **STILL PRESENT** | `keyPattern(label)` uses `label[0]` only; black-key labels get white-key copy (~49–58, 453–454). Matches P01. |
| F03 | **STILL PRESENT** | Explore Hear always `audio.play` while icon shows stop (~182–184); `nextQuestion` does not cancel (~328–342). Matches P03. B04 stop/pair cancel largely present in `use-comparison-audio`. |
| F04 | **STILL PRESENT** | `leavePractice` clears `savedResult` (~350–358); exit dialog lacks labelledby / Keep-practicing-first pattern (~466–470). Matches P04. |
| F05 | **STILL PRESENT** | Practice / Labeled / B04 share UIs diverge; copy-fail falls back to “browser address”; Explore `copyNoteLink` re-runs `selectPianoKey` and drops requested spelling (~164–168). Matches P05. |
| F06 | **STILL PRESENT** | `.kn-v2-receiver-note` centered max-width + large vertical margin (`keyboard-notes-v2.css` ~113); long privacy copy still on start. |
| F07 | **STILL PRESENT** | Labeled still dual toolbars + segmented full dump; no shared Explore viewport. |
| F08 | **STILL PRESENT** | Landing/`hd-more` states “raising only the third one semitone” before answer (`experience.tsx` ~356); learning copy always visible. |
| F09 | **STILL PRESENT** | Compare roles styled mainly under `.hd-keyboard-wrap` with light common labels; no shared contrast-safe presentation layer. |
| F10 | **STILL PRESENT** | Browser script injects `.hd-audio-error` via `createElement`/`innerHTML` (~121–134) without owner failure path. |
| F11 | **OPEN REQUIREMENT** | Need same-tree dual regressions + handoff with source/diff; not a code bug by itself. |
| F12 | **STILL PRESENT (docs)** | `B04_ROUTE_PLAN.md` labels query as “not indexable” while robots stay index/follow. |

## Restore / rollback notes

- Do not copy `evidence/source-snapshots/` into `src/`.
- Pre-fix recoveries: git checkout of specific dirty files if a change must be abandoned; B04 untracked tree is the live baseline.
- This delivery writes under `docs/product-upgrade/2026-09-16/integration-fix-delivery/`.
