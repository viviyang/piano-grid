# Three complete current examples

[已核实] The three JSON bundles are assembled from the exact current inputs and B3 overlays. They preserve all current page copy, voicings, FAQ/blocks, links, resource references, fingering cases, practice data, sources and default states. They are reference bundles, not a new production schema.

| Example | Production authoring inputs | Adapter | Runtime validator | Resolved snapshot |
|---|---|---|---|---|
| A minor | `docs/content/chords/page-content.json` + `src/lib/chord-learning-content.ts` | `getAMinorContent()` | `finalizeChordDetailModel()` | `../resolved/a-minor.model.json` |
| A major | `docs/content/site-master/page-content.master.json#/pages/~1chords~1a-major` + `src/lib/chord-learning-content.ts` | `getChordDetail('/chords/a-major')` | `finalizeChordDetailModel()` | `../resolved/a-major.model.json` |
| C major | `docs/content/site-master/page-content.master.json#/pages/~1chords~1c-major` + `src/lib/chord-learning-content.ts` | `getChordDetail('/chords/c-major')` | `finalizeChordDetailModel()` | `../resolved/c-major.model.json` |

The package copies the legacy JSON and TS inputs under `source/`; the large master JSON is represented by an exact chord-only excerpt under `existing-content/`, and each bundle names that package reference. Edit the original repository locations shown above; do not write the resolved snapshots back. Shared values must remain shared: MIDI drives keyboard, audio and print highlights; default voicing drives the current one-hand fingering; route registration controls detail links.
