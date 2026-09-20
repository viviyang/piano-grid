# Discovery acceptance

Test environment: local `http://127.0.0.1:3132` in worktree `pianogrid-final-integration`.
Browser: Playwright Chromium/Chrome, headless. Viewports: 1440x900 and 390x844.
Date: 2026-09-18. Not a production crawl.

## Path contract

- Page jump: Hub `/chords` → family URL → detail URL. Target is one jump each.
- Control operations: root chips, subtype chips, and library search are filters, not extra page jumps.
- C-flat major is a written-spelling exception: it is not one of the 12 Major grid cards. It remains linked from the hub chart/library and from the Major family “Keep learning” link.
- Extended and Altered have no independent detail URLs; their 108/96 counts are embedded references on the family pages.
- Header is not a dump of all details. Browse two-layer cards on `/chords` were kept.

## SSR entry coverage

Independent detail URLs: 145. Missing family/hub hrefs: 0.

## Results

| Check | Result | Detail |
|---|---|---|
| Every independent detail URL has an SSR family or hub href | PASS |  |
| Hub HTML includes Browse piano chords | PASS |  |
| C-flat major is linked from hub or major family | PASS |  |
| desktop-1440 hub browse block visible | PASS |  |
| desktop-1440 hub has no horizontal overflow | PASS | delta=0 |
| desktop-1440 TOC labels are separate strings | PASS | ["Browse by type","Find a chord","Read the diagrams","Major and minor","Print & PDF","Questions","Details & practice"] |
| Desktop hub to minor is one page jump | PASS |  |
| B minor card visible on minor family | PASS |  |
| Desktop family to B minor is one page jump | PASS |  |
| B minor has play or keyboard | PASS |  |
| desktop-1440 hub has library name search | PASS |  |
| desktop-1440 search Bm locates /chords/b-minor | PASS |  |
| desktop-1440 search B minor locates /chords/b-minor | PASS |  |
| desktop-1440 search Bb locates /chords/b-flat-major | PASS |  |
| desktop-1440 search B-flat locates /chords/b-flat-major | PASS |  |
| desktop-1440 search Cmadd9 locates /chords/c-madd9 | PASS |  |
| desktop-1440 search Cm(add9) locates /chords/c-madd9 | PASS |  |
| desktop-1440 B minor entry visible on /chords/minor | PASS |  |
| desktop-1440 C7 entry visible on /chords/seventh | PASS |  |
| desktop-1440 F#maj7 entry visible on /chords/seventh | PASS |  |
| desktop-1440 B half-diminished entry visible on /chords/seventh | PASS |  |
| desktop-1440 D-flat sus2 entry visible on /chords/suspended | PASS |  |
| desktop-1440 F-sharp add9 entry visible on /chords/add | PASS |  |
| desktop-1440 C minor add9 entry visible on /chords/add | PASS |  |
| desktop-1440 B-flat minor add9 entry visible on /chords/add | PASS |  |
| desktop-1440 C-flat major entry visible on /chords/major | PASS |  |
| mobile-390 hub browse block visible | PASS |  |
| mobile-390 hub has no horizontal overflow | PASS | delta=0 |
| mobile-390 TOC labels are separate strings | PASS | ["Browse by type","Find a chord","Read the diagrams","Major and minor","Print & PDF","Questions","Details & practice"] |
| mobile-390 hub has library name search | PASS |  |
| mobile-390 search Bm locates /chords/b-minor | PASS |  |
| mobile-390 search B minor locates /chords/b-minor | PASS |  |
| mobile-390 search Bb locates /chords/b-flat-major | PASS |  |
| mobile-390 search B-flat locates /chords/b-flat-major | PASS |  |
| mobile-390 search Cmadd9 locates /chords/c-madd9 | PASS |  |
| mobile-390 search Cm(add9) locates /chords/c-madd9 | PASS |  |
| mobile-390 B minor entry visible on /chords/minor | PASS |  |
| mobile-390 C7 entry visible on /chords/seventh | PASS |  |
| mobile-390 F#maj7 entry visible on /chords/seventh | PASS |  |
| mobile-390 B half-diminished entry visible on /chords/seventh | PASS |  |
| mobile-390 D-flat sus2 entry visible on /chords/suspended | PASS |  |
| mobile-390 F-sharp add9 entry visible on /chords/add | PASS |  |
| mobile-390 C minor add9 entry visible on /chords/add | PASS |  |
| mobile-390 B-flat minor add9 entry visible on /chords/add | PASS |  |
| mobile-390 C-flat major entry visible on /chords/major | PASS |  |

Screenshots: `docs/seo/chords/evidence-2026-09-18/screenshots/`.

Overall: PASS.

Optional proposal: the hub already has “Search the supported chord library”. No second chord-name engine was added. Family+root remains the primary path.
