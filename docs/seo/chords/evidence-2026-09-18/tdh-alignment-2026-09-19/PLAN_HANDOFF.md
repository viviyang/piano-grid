# Plan handoff — 2026-09-19 (not a new implementation round)

This file records the master-plan checkpoint. It does **not** start the 158-page task/value review, Sus merge, noindex, or Title apply.

## Task 11 (name/TDH alignment)

Status: **complete as BASELINE_BLOCKED**. Copy was not applied. Pretending pages are fixed would be false.

Deliverables:

- `CHORD_TDH_ALIGNMENT.csv` — 145/145 detail rows; 71 proposed Title/H1/description; `applied=false`
- `BASELINE.md` — Git gate and eight protected pages
- `CHECKS.md` — what ran / NOT_RUN
- `CHANGELOG.md` — proposed before/after only

Query master: historical 283 rows kept; 10 B7 Semrush US rows appended (2026-09-19). Guitar rows are `GUITAR_EXCLUDED`. `intent_fit` remains `UNCHECKED`.

## Versions (do not mix)

| Layer | Fact now |
|---|---|
| This worktree HEAD | `6b95908` on `codex/final-integration` |
| `origin/main` | `5fa6cb6`, 1 commit ahead (eight-page TDH) |
| Uncommitted | A/B chord browse + checks/screenshots; C-group evidence/scripts untracked |
| Task 11 page copy | proposed only; `src/lib/seo-editorial.ts` unchanged |
| Live `pianogrid.com` | not re-verified this hour; old live copy is not a local-fix failure |
| Report snapshot 2026-09-18 | same HEAD/`origin/main` pair; not a rewind target |

## Approval needed before any apply (user must authorize)

Do **not** reset/clean/rebase to “fix” this. Suggested sequence after named approval:

1. Protect uncommitted A/B work (commit or another explicit backup the user chooses).
2. Integrate `origin/main` `5fa6cb6` so the eight approved TDH pages are not overwritten.
3. Then apply Task 11 proposed labels on the integrated baseline (B7 + same-entity rows that still pass the original allow-list).
4. Separate later approval for commit / push / deploy. This plan does not grant those.

Dirty tracked files and `origin/main` files currently do not overlap. The collision is: Task 11 apply wants `seo-editorial.ts`, which `5fa6cb6` also changes.

## GSC baseline: missing, not diagnosed

`GSC_REVIEW.csv` has 14 Core-queue URLs. Code says `index,follow` and self-canonical. These GSC columns are **empty** for every row: `report_time`, `indexed`, `discovered`, `crawled`, `last_crawl`, `google_canonical`, `hostload_or_server_errors`, `first_impression`.

That is **not** “not indexed”. It is **no authorized GSC export**.

Site-level still missing: Page indexing overview (report time, reasons, examples); Crawl Stats (host, 429/5xx); Sitemap last-read/status.

Suggested first URL Inspection samples (index view, not live-test-as-indexed):

| URL | In `GSC_REVIEW.csv`? | Need from Inspection |
|---|---|---|
| `/chords` | no | status, last crawl, crawl allowed, indexing allowed, user canonical, Google canonical |
| `/chords/b-7` | yes, GSC fields blank | same |
| `/chords/c-add9` | yes, GSC fields blank | same |
| `/chords/seventh` | yes, GSC fields blank | same |
| `/chords/f-sharp-madd9` | no | same |

Owner: user (Search Console). Cursor must not invent reasons from Semrush volume or from HTTP 200.

Missing GSC blocks **index-cause** decisions only. It does not block later applying already-specified B7 naming after the Git gate is clear.

## Next phase (not started)

After a user-approved publish of allowed small fixes: one 158-URL action table (`user_task`, `task_coverage`, `independent_value`, `gsc_observed_status`, `next_action`, …) covering hub + 9 family + 145 detail + 3 tools. Keep / merge / noindex / 301 stay `CHANGE_APPROVAL_NEEDED` until named URLs are approved.
