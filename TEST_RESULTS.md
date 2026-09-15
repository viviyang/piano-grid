# Final Integration Test Results

Result: PASS_WITH_NOTES

## Reconciled gates

| Area | Result |
|---|---|
| Chords final | PASS — 369/0 |
| Chords N2D v2 | PASS — 188/0 |
| Integration production | PASS — 186/0 |
| Release SEO | PASS — 17/17 pages, 0 blocking findings, 0 runtime errors |
| Scale final data/contract | PASS — 670/0 |
| Scale completion contract | PASS — 9/0 |

The earlier failures were QA-contract failures, not reproduced product failures:

- Chords and integration scripts compared current pages with superseded pre-editorial titles.
- Chords scripts required exactly 173 URLs although the committed route registry contains 205.
- Integration expected six homepage task illustrations although the accepted baseline renders seven.
- Scale scripts looked for a non-versioned launch bundle although the committed master and exporter can reproduce the full 27-page candidate.

## Existing final-candidate gates

| Area | Result |
|---|---|
| Foundation / TypeScript / CSS | PASS — Foundation 565/0; TypeScript and Tailwind/CSS passed |
| Practical Tools contract | PASS — 44/0 |
| Keyboard contract | PASS — 40/0 |
| Songs + Sheet contract | PASS — 78/0 |
| Production build | PASS — 210 static/SSG pages |
| Scale events | PASS — 8/0 |
| Scale audio fallbacks | PASS — 30/0 |
| Keyboard browser | PASS — 99/0 |
| Songs + Sheet browser | PASS — 137/0 |
| Practical browser | PASS — 61/0 |
| Blank-sheet PDF | PASS — 20/0 |
| Keyboard PDF | PASS — 98/0 |
| Scale PDF | PASS — 63/0 |
| Current 205-route sitemap/SEO gate | PASS — 1031/0 |

## Accessibility and music evidence

- Chromium accessibility-tree probe: PASS on 8 representative pages. Each page exposed one main landmark and headings; 1,300 interactive accessibility nodes were checked in aggregate with 0 unnamed controls. This is automated semantic evidence, not a real screen-reader session.
- Public PDF inventory: 167 PDFs opened, but 0/167 exposed both `/StructTreeRoot` and marked-content metadata; 0/167 declared document language. PDF tagging/accessibility therefore FAILS the current release gate.
- Three original exercises passed independent MusicXML, JSON-event, MIDI, waveform-spectrum, duration, silence, clipping, and SVG-inventory checks. Maximum observed pitch-estimation error was below 0.37 cents. The checker explicitly records `professional_review: false` and `human_listening: false`.
- The historical `check-integration-data.mjs` protected-source hash snapshot previously reported 129/23 because its old source-before ledger does not match the accepted baseline. That hash ledger was outside the two authorized reconciliation categories and was not rewritten.

## Dependency and cleanup checks

- Project dependency versions and `package-lock.json` are unchanged.
- The temporary `mido` verifier dependency was installed only under `tmp/qa-python` and deleted with `tmp/`.
- Test output directories and tracked historical result-file modifications were removed or restored after results were recorded.
