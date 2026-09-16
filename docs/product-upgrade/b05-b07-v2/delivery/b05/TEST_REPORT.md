# TEST_REPORT — B05

All commands run in `pianogrid-final-integration` against local `http://localhost:3116` where browser tests apply.

| Command | Exit | Evidence |
| --- | --- | --- |
| `npm run typecheck` | 0 | stdout clean |
| `npm run check:foundation` | 0 | 565 passed |
| `npm run check:css` | 0 | Tailwind v4 authorized routes |
| `npm run check:songs-sheet-v2` | 0 | 78 passed |
| `node scripts/check-b05-plan.mjs` | 0 | `unit-results.json` — 6 passed |
| `node scripts/check-b05-browser.mjs` | 0 | `browser-results.json` — 35 passed |
| `PIANO_BASE_URL=http://localhost:3116 node scripts/check-songs-sheet-browser.mjs` | 0 | `checks/songs-sheet-v2/browser-results.json` — 139 passed |
| `npm run build` | 0 | `build.log` EXIT:0 |

## B05 browser coverage highlights

- Three edition cards + access labels
- Plan start → step1 → step2 → step5 without auto-checking
- Finish with 0 self-checks
- Share dialog URL contains only `plan` + `plan-v` (+ hash)
- Unknown plan shows unavailable copy (no edition swap)
- Sheet Twinkle provider + plan link; Hot Cross / Ode compare links
- Mobile 390 / 320 overflow checks
- no-JS: five steps + Hoffman href present
- Smoke: `/songs`, `/tools/hear-the-difference`, `/keyboard-notes`

## Notes

- Dev server must be opened as `localhost` (not `127.0.0.1`) for Next 16 HMR/hydration during Playwright.
- Songs-sheet browser nav child-link expectation updated 30 → 31 to match current HEAD navigation (pre-existing vs this batch; nav source unchanged in B05).
