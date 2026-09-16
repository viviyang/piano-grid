# TEST_REPORT — B07 T14

All commands run on dirty worktree `codex/final-integration` (base `1ce0a1d`). Dev server: `http://localhost:3116` (not `127.0.0.1`).

| Command | Exit | Log |
| --- | --- | --- |
| `npm run check:foundation` | 0 | `log-check-foundation.txt` (565 passed) |
| `npm run typecheck` | 0 | `log-typecheck.txt` |
| `npm run check:css` | 0 | `log-check-css.txt` |
| `node scripts/check-b05-plan.mjs` | 0 | `log-check-b05-plan.txt` (6/0) |
| `node scripts/check-b06-plan.mjs` | 0 | `log-check-b06-plan.txt` |
| `node scripts/check-b06-pdfs.mjs` | 0 | `log-check-b06-pdfs.txt` (4 PDFs, 0 failed) |
| `PIANO_BASE_URL=http://localhost:3116 node scripts/check-b05-browser.mjs` | 0 | `log-check-b05-browser.txt` (35/0) |
| `PIANO_BASE_URL=http://localhost:3116 node scripts/check-b06-browser.mjs` | 0 | `log-check-b06-browser.txt` (15/0) |
| `PIANO_BASE_URL=http://localhost:3116 node scripts/check-b07-links.mjs` | 0 | `log-check-b07-links.txt` (L01–L18 + head/assets/cold-share) |
| `PIANO_BASE_URL=http://localhost:3116 node scripts/check-b07-events.mjs` | 0 | `log-check-b07-events.txt` |
| `PIANO_BASE_URL=http://localhost:3116 node scripts/check-b07-browser.mjs` | 0 | `log-check-b07-browser.txt` (45/0) |
| `npm run build` | 0 | `log-build.txt` (211 static pages) |

## Unit / browser JSON
- `browser-results.json` — B07 screenshots + B03/B04 smoke
- `LINK_CHECK_RESULTS.json` / `HEAD_CHECK_RESULTS.json` / `ASSET_CHECK.json`
- `EVENT_STATUS.json`
- `ROUTE_COUNTS.json` / `SEO_DIFF.json`

## Not claimed PASS
- Manual device share / physical print / screen reader (see MANUAL_CHECKS)
- Collector `COLLECTED_VERIFIED` (status is `INSTRUMENTED_NOT_COLLECTED`)
- Outreach send (still DRAFT_NOT_SENT from B06)
