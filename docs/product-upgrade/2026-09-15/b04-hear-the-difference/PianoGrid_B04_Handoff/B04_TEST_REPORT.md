# B04 TEST REPORT

## Commands executed

| Command | Result |
| --- | --- |
| `npx tsx scripts/check-hear-the-difference.mjs` | PASS 11/11 |
| `npm run check` (foundation + typecheck + css) | PASS (foundation 565/565) |
| `npm run build` | PASS (`/tools/hear-the-difference` dynamic) |
| `git diff --check` | PASS (CRLF warning only on existing home CSS) |
| `npx tsx scripts/check-hear-the-difference-browser.mjs` against `next start :3124` | PASS 51/51 |

## Unit coverage

- no spoiler share params
- A/C/D/E music assertions (root/fifth unchanged, third +1, middle voice)
- deterministic next pair
- public route / Tools nav / hub / SEO / analytics status
- inbound links on A/C/D/E details, `/chords`, guide

## Browser coverage

Desktop 1440 and Mobile 390:

- no autoplay; answers disabled until comparison complete
- wrong non-spoiler; hint; show-answer vs correct reveal
- try-another primary; share copy + native payload non-spoiler
- next pair reset; shared landing banner
- homepage / tools / a-minor inbound presence
- screenshots under `checks/.../b04-hear-the-difference/screenshots/`

## Artifacts

- `checks/product-upgrade-2026-09-15/b04-hear-the-difference/unit-results.json`
- `checks/product-upgrade-2026-09-15/b04-hear-the-difference/browser-results.json`
