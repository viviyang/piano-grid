# Query evidence validation (incremental 2026-09-18)

Merged `C:/Users/Admin/Documents/viviyang_github/piano/_handoff/hords-seo-evidence-2026-09-18/comparison-update/02_QUERY_EVIDENCE_ALL.csv` with existing QUERY_EVIDENCE.csv on (observed_date, batch, query, source).

| Check | Result |
|---|---|
| Existing unique keys retained | 195 |
| Incoming ALL.csv rows | 283 |
| New independent keys from ALL.csv | 88 |
| Merged unique observation rows | 283 |
| Follow-up rows (not treated as volume) | 121 |
| OBSERVED_100_PLUS | 86 |
| OBSERVED_1_TO_99 | 47 |
| ZERO_OBSERVED_ONLY | 2 |
| NO_NUMERIC_DATA | 3 |
| SCREENSHOT_GAP | 0 |
| Status checksum 86+47+2+3+0 | 138 |
| Snapshot mismatch | none |
| Pages with a positive best_observed_query_volume | 133 |
| QUARANTINED_INPUT rows | 1 (E-flat Minor Chordth chords) |
| KD/intent unavailable wiping a positive volume | 0; 93 positive rows keep their volume even if KD is empty |
| Pages that still have a later 0/blank after a positive | 28 (positive kept via max) |
| ABC visible A/B/C | 17/17; 27/28; 44/76 |
| ABC NOT_VISIBLE | 33 |
| 04_FULL_CHORDS_158 vs registry | pack-not-repo 0; repo-not-pack 0 |
| PUBLIC_ROUTES | 206 |
| Chord module A/B/C/D | 158/9/145/4 |
| Origin ledger rows / known commit | 158 / 158 |
| intent_fit VERIFIED_SEO assignments | 0 |
| Still no positive | /chords/d-flat-m7-flat5, /chords/f-sharp-madd9, /chords/a-flat-madd9, /chords/b-flat-madd9, /chords/d-flat-madd9 |
| Original URL-plan files overwritten | no |

Threshold 100 is an analysis grouping, not an SEO rule. Different queries are not summed. NOT_VISIBLE is not 0 and is not “not queried”.
