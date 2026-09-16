# Release closeout RESULT — RC01–RC08

**Status: `READY_FOR_MANUAL_ACCEPTANCE`**

Not `READY_FOR_PRODUCTION`. Automated suite for this batch is green; human gates remain.

## Scope completed
- RC01 layout CSS restore + shared `share-dialog.css` + labeled overview/print/sources
- RC02 `#note-trainer` hash entry + hashchange/popstate + compact viewport keeps selection
- RC03/RC06 typed ReferenceAudio results, run tokens, real AudioContext failure path (no `__hearForceAudioError`)
- RC04 whole-page visible spoiler gate + disclosure/helpUsed + assisted copy
- RC05 SharePanel url/open reset + copy race guard; Find cancels audio; labeled before/afterprint + valid printPart
- RC07 recoverable handoff + restore dry-run
- RC08 same-tree regressions/screenshots

## Automated summary
| Suite | Result |
|---|---|
| integration-fix unit | 6/6 PASS |
| B04 unit | 11/11 PASS |
| Keyboard practice browser | 79/79 PASS |
| B04 browser | 55/55 PASS |
| Integration-fix acceptance | 15/15 PASS |
| `npm run typecheck` | PASS |
| `npm run build` | PASS |
| `npm run check:foundation` | **BASELINE_FAILURE** 564 pass / 1 fail (`Only necessary authorized chord components`) — pre-existing, out of RC scope |
| `check-integration-batch.mjs` | **BASELINE_FAILURE** title/nav-link expectations + runner metadata error — pre-existing / out of RC scope |

## Not done (manual)
See `MANUAL_CHECKS.md`. No commit, push, deploy, or B05+.

## Preview
Local production server used for evidence: `http://127.0.0.1:3115`  
Public production remains `https://pianogrid.com` (unchanged by this work).

## Handoff
Directory: `docs/product-upgrade/2026-09-16/release-closeout-delivery/`  
Restore dry-run: `RESTORE_DRY_RUN.json` → `ok: true`  
ZIP: see `PACKAGE.SHA256.txt` if present.
