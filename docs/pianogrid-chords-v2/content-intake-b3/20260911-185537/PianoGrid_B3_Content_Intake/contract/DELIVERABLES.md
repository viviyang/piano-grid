# Downstream content deliverables

| Deliverable | Actual format | Production intake location | Current validation | Required |
|---|---|---|---|---|
| Planned page record | JSON object preserving the selected page's existing raw shape | Existing object under `docs/content/site-master/page-content.master.json#/pages/<escaped-url>` | `readAuthorizedPage()`, adapter checks | Yes |
| Chord definition and 3 voicings | JSON data in that page's `data` fields; preserve spellings, MIDI and order | Same page object; A minor remains in `docs/content/chords/page-content.json` until a separately approved migration | `finalizeChordDetailModel()`, adapter checks | Yes |
| English body, direct answer, theory/comparison/FAQ/links | JSON strings/arrays using the chosen existing page shape | Page `blocks`, metadata and related fields; do not put prose into React | Adapter checks plus editorial/source review | Yes |
| Root-position right/left examples and source records | Pure-data TypeScript objects matching `FingeringExample`/`ChordSource` | `src/lib/chord-learning-content.ts` under the current interface | `finalizeChordDetailModel()` | Yes for a B3-level detail page |
| Practice prompt/scope | Pure-data TypeScript returned by `getChordLearning()`; answer remains derived from chord pitch classes | `src/lib/chord-learning-content.ts` | Validator and B3 check | Yes for a B3-level detail page |
| PDF/resource declaration | Existing JSON asset record plus actual first-party file and adapter path | Master/legacy asset entry and approved public asset location | resource path checks and human print/PDF review | Optional until a page promises a download |
| Related links | JSON/TS link records with target, relation text, placement and publication state | Page blocks or current learning overlay | `isPublicRoute()`; unpublished targets stay hidden/null | Optional; no dead links |
| Source dossier | Markdown/JSON source entry with URL, checked date, exact support and limitation | Existing source ledger/page source IDs; B3 fingering sources currently in TS | ID resolution + human evidence review | Yes for factual/music/fingering claims |
| Staff notation | Unsupported | No current field or renderer | None | No; requires code/product approval first |

The handoff should therefore return a combination: page JSON records, pure-data TS additions for the current learning overlay, source-ledger evidence, and any approved first-party resource files. The three authoring bundles show the full current examples; the resolved files show expected outputs only.
