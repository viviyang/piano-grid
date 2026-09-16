# FINAL_TEST_REPORT — B04–B07 CLOSEOUT

All commands run on dirty worktree `codex/final-integration` vs base `1ce0a1d`.  
Dev server: `http://localhost:3116` (not `127.0.0.1`).  
Logs: `delivery/final/closeout-logs/`.

## Command matrix

| Command | Exit | Seconds | Log |
| --- | ---: | ---: | --- |
| `npm run check:foundation` | 0 | 4 | `log-check-foundation.txt` |
| `npm run typecheck` | 0 | 11 | `log-typecheck.txt` |
| `npm run check:css` | 0 | 3 | `log-check-css.txt` |
| `npm run check` | 0 | 5 | `log-check.txt` |
| `node scripts/check-b05-plan.mjs` | 0 | 0 | `log-b05-plan.txt` |
| `node scripts/check-b06-plan.mjs` | 0 | 0 | `log-b06-plan.txt` |
| `node scripts/check-b06-pdfs.mjs` | 0 | 0 | `log-b06-pdfs.txt` |
| `PIANO_BASE_URL=http://localhost:3116 node scripts/check-b05-browser.mjs` | 0 | 17 | `log-b05-browser.txt` |
| `PIANO_BASE_URL=http://localhost:3116 node scripts/check-b06-browser.mjs` | 0 | 4 | `log-b06-browser.txt` |
| `PIANO_BASE_URL=http://localhost:3116 node scripts/check-b07-links.mjs` | 0 | 62 | `log-b07-links.txt` |
| `PIANO_BASE_URL=http://localhost:3116 node scripts/check-b07-events.mjs` | 0 | 5 | `log-b07-events.txt` |
| `PIANO_BASE_URL=http://localhost:3116 node scripts/check-b07-browser.mjs` | 0 | 32 | `log-b07-browser.txt` |
| `npm run check:songs-sheet-v2` | 0 | 1 | `log-songs-sheet-v2.txt` |
| `npm run check:practical-tools` | 0 | 1 | `log-practical-tools.txt` |
| `npm run check:keyboard-practice` | 0 | 30 | `log-keyboard-practice.txt` |
| `npm run check:keyboard-completion` | 0 | 1 | `log-keyboard-completion.txt` |
| `npm run build` | 0 | 126 | `log-build.txt` |
| `git diff --check` | 0 | 0 | `log-git-diff-check.txt` |
| Live SEO (`seo-live-check.mjs`) | 0 | — | `log-seo-live.txt` / `seo-live.json` |
| Interaction smoke | 0 | — | `log-interaction-smoke.txt` / `interaction-smoke.json` |
| Screenshot capture (10×2) | 0 | — | `log-screenshots.txt` |

Machine summary JSON: `closeout-logs/summary.json`.

## Capability coverage (automated)

| Area | Evidence |
| --- | --- |
| Audio (B04) | practical-tools + hear CTA smoke; B07 browser B03/B04 smoke |
| Share / copy link | B05/B06 browser + plan share dialog smoke |
| Print / PDF | `check-b06-pdfs` + PDF HEAD 200 |
| Focus / keyboard | Start-plan focusable; Escape closes share; collapsible triggers present |
| Responsive | Desktop 1440 + Mobile 390 screenshots; overflow checks PASS |
| Internal links | `check-b07-links` L01–L18 + HEAD/assets/cold-share |

## Screenshots

Directory: `delivery/final/screenshots/`

Surfaces × viewports: Keyboard Notes, Hear the Difference, Songs, Easy Songs, First 10 Minutes, Sheet Music, Twinkle sheet, Labeled Keys, Teacher Printable, Tools — each `*-desktop.png` and `*-mobile.png`.

## Not claimed PASS

- Physical device share round-trip (Windows ↔ iPhone)
- Physical paper print
- Screen reader (VoiceOver / NVDA) full pass
- Collector `COLLECTED_VERIFIED`
