# TEST_REPORT

## Tree identity

- Branch: `codex/final-integration`
- HEAD: `c9651ba`
- Dirty B04 + this fix on the same tree (no commit)

## Commands run (this tree)

| Command | Result |
| --- | --- |
| `npx tsx scripts/check-integration-fix-unit.ts` | PASS 6/6 |
| `npx tsx scripts/check-hear-the-difference.mjs` | PASS 11/11 |
| `npx tsx scripts/check-keyboard-completion.ts` | PASS 51/51 |
| `npm run check` (foundation + typecheck + css) | PASS (foundation 565/565) |
| `npm run build` | PASS (`/tools/hear-the-difference` dynamic) |
| `npm run check:practical-tools` | PASS 44/44 (route count 206) |
| `PIANO_BASE_URL=http://127.0.0.1:3115 node scripts/check-keyboard-practice.mjs` | PASS 79/79 |
| `PIANO_BASE_URL=... node scripts/check-hear-the-difference-browser.mjs` | PASS 55/55 |
| `PIANO_BASE_URL=... node scripts/check-integration-fix-acceptance.mjs` | PASS 13/13 |
| `git diff --check` | PASS (CRLF warnings only on existing files) |

## Raw result paths

- `checks/product-upgrade-2026-09-16/integration-fix/unit-results.json`
- `checks/product-upgrade-2026-09-16/integration-fix/acceptance-results.json`
- `checks/product-upgrade-2026-09-16/integration-fix/b02-b03-keyboard-notes/browser-results.json`
- `checks/product-upgrade-2026-09-16/integration-fix/b04-hear-the-difference/browser-results.json` (and prior B04 unit dir if present)

## Acceptance coverage executed

K01 (unit sequence), K02, K06, K10, H01, A05, V01/V02/V03 (+ regressions covering K09/K12/S01/S02/S05/X02 smoke). Cases requiring physical devices remain PENDING in `MANUAL_CHECKS.md`.
