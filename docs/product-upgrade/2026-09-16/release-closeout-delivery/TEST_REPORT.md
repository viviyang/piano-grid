# TEST_REPORT

BASE_SHA: `c9651bad1e4ade9edc9bcd9e8fe629d8d764d515`  
Preview for browser evidence: `http://127.0.0.1:3115`

## Executed
| Command | Exit | Notes |
|---|---|---|
| `npx tsx scripts/check-integration-fix-unit.ts` | 0 | 6/6 |
| `npx tsx scripts/check-hear-the-difference.mjs` | 0 | 11/11 |
| `npx tsx scripts/check-keyboard-practice.mjs` | 0 | 79/79 (`PIANO_BASE_URL=http://127.0.0.1:3115`) |
| `npx tsx scripts/check-hear-the-difference-browser.mjs` | 0 | 55/55 |
| `npx tsx scripts/check-integration-fix-acceptance.mjs` | 0 | 15/15 |
| `npm run typecheck` | 0 | |
| `npm run build` | 0 | log: `build-rc.log` |
| `npm run check:foundation` | 1 | BASELINE_FAILURE (1) |
| `node scripts/check-integration-batch.mjs` | 1 | BASELINE_FAILURE (53 browser assert mismatches + runner metadata) |

## Raw artifacts
- `raw-results/integration-fix-unit.json`
- `raw-results/b04-unit.log`
- `raw-results/b02-b03-browser.log` + `raw-results/b02-b03/`
- `raw-results/b04-browser.log` + `raw-results/b04/`
- `raw-results/integration-fix-acceptance.log` + `raw-results/integration-fix/`
- `raw-results/npm-check.log`
- `raw-results/integration-batch.log`

## Auto fail count (this RC batch)
**0** in RC-scoped suites. Baseline failures recorded separately, not treated as RC PASS evidence.
