# RC_MATRIX

| ID | Status | Owner | Fix / evidence |
|---|---|---|---|
| RC01 | PASS | `hear-the-difference.css`, `share-dialog.css`, `keyboard-notes*.css`, `labeled-experience.tsx` | Restored desktop B04 grids; share CSS owned by share-control; overview height on labeled; Print = primary; sources = registry titles |
| RC02 | PASS | `keyboard-notes-workspace.tsx`, `keyboard-practice.ts` | `#note-trainer` + practice query entry; hashchange/popstate; `practiceEntryHref`; compact resize keeps selected note |
| RC03 | PASS | `experience.tsx`, `use-comparison-audio.ts`, `a-minor-audio.ts` | runId/generation; busy-gated hint/reveal; replay keeps reveal; typed `AudioPlayResult` |
| RC04 | PASS | `experience.tsx` + browser checks | Visible-page spoiler gate (closed details excluded); Explanation/helpUsed; assisted copy |
| RC05 | PASS | `share-control.tsx`, Explore Find, labeled print | url/open reset; copy generation guard; Find cancels audio; before/afterprint; invalid printPart ignored |
| RC06 | PASS | ReferenceAudio + browser harness | Real AudioContext resume failure; context released on error; no production force flag |
| RC07 | PASS | `release-closeout-delivery/` | pre-rc snapshot, handoff sources, RC_SCOPE.diff, MANIFEST, restore dry-run |
| RC08 | PASS | scripts + delivery screenshots | Practice 79, B04 55, acceptance 15; strict black-target assert; screenshots/index.json |

## Acceptance cases (09 pack)
All automated RC01–RC06 cases covered by suites above → PASS. Remaining RC05 focus/print human checks and RC08 collector observation → PENDING_MANUAL (see MANUAL_CHECKS).
