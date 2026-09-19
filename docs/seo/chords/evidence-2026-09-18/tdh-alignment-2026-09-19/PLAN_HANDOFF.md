# Plan handoff — 2026-09-19 unlock apply

This file records Task 11 after the baseline-unlock authorization. It does **not** start the 158-page task/value review, Sus merge, noindex, or a publish.

## Task 11 (name/TDH alignment)

Status: **APPLIED_LOCAL_TESTED_NOT_PUBLISHED**.

| Count | Meaning |
|---|---|
| 145 | Chord detail URLs scanned and HTML-checked |
| 72 | SAME_ENTITY_LABEL_ALIGNMENT on pack H1 |
| 71 | Proposed and applied locally |
| 5 | HOLD / skip (product review) |
| 4 | Upstream-protected details (kept `5fa6cb6` copy) |
| 65 | NO_TDH_CHANGE |
| 0 | Task 11 final commit / push / deploy |

B7 local final copy:

- Title: `B7 Chord: Piano Notes, Inversions & Sound | PianoGrid`
- H1: `B7 Chord`
- Description/intro: as specified in the original Task 11 prompt
- Formal name `B Dominant Seventh` and notes B, D♯, F♯, A unchanged

Query master: historical 283 rows kept; 10 B7 Semrush US rows still the 2026-09-19 append. Guitar rows `GUITAR_EXCLUDED`. `intent_fit` remains `UNCHECKED`.

## Versions (do not mix)

| Layer | Fact now |
|---|---|
| This worktree HEAD | `e00ae6e` on `codex/final-integration` |
| Checkpoints | `430579d`, `f80084b` |
| `origin/main` | `5fa6cb6` (ancestor of HEAD) |
| Uncommitted | Task 11 apply: `chord-detail-seo-copy.ts`, `seo-editorial.ts`, N2B/N2C/N1 mapping, detail breadcrumb, scan/check scripts, CSV/docs |
| Task 11 page copy | applied locally; **not** in HEAD |
| Live `pianogrid.com` | not republished this round |
| Older report snapshot | HEAD `6b95908` / BASELINE_BLOCKED is history only |

## Waiting on the next named approval

1. Task 11 final commit of the apply diff (explicit path list; do not `git add -A`).
2. Separate approval for push / deploy.
3. After an approved publish: 158-URL action table from the master plan. Keep / merge / noindex / 301 stay `CHANGE_APPROVAL_NEEDED` until named URLs are approved.

Do **not** reset/clean/rebase to “clean up” uncommitted apply files.

## GSC baseline: missing, not diagnosed

`GSC_REVIEW.csv` now has **16** unique URLs (original 14 plus `/chords` and `/chords/f-sharp-madd9`). These GSC columns are **empty** for every row: `report_time`, `indexed`, `discovered`, `crawled`, `last_crawl`, `google_canonical`, `hostload_or_server_errors`, `first_impression`.

That is **not** “not indexed”. It is **no authorized GSC export**. Source pending from Search Console.

## Next phase (not started)

After a user-approved publish of allowed small fixes: one 158-URL action table covering hub + 9 family + 145 detail + 3 tools.
