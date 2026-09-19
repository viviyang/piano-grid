# CHECKS — 2026-09-19 C-group name/TDH alignment (unlock apply)

Gate: **APPLIED_LOCAL_TESTED_NOT_PUBLISHED**. Copy is in the working tree. Not a production publish.

## Ran

| Check | Result |
|---|---|
| Checkpoint commits | `430579d`, `f80084b` |
| Local merge of `5fa6cb6` | `e00ae6e`; no conflicts; Task 11 copy not in the merge |
| `node scripts/scan-chord-tdh-alignment.mjs` | 145/145; SAME_ENTITY 72; ALREADY_CLEAR 69; UPSTREAM_PROTECTED 4; CONTENT_REVIEW 5; **APPLIED_LOCAL 71**; HOLD 5; NO_TDH_CHANGE 65 |
| `node scripts/check-chord-tdh-applied.mjs` | PASS (copy map, identities, protected keys, 206/158 set vs `e00ae6e`) |
| `node scripts/check-chord-tdh-applied.mjs --html` | PASS against `http://127.0.0.1:3128`; 145 unique titles; applied 71 Title/H1/description/intro; eight protected fields; HOLD H1 not rewritten; self-canonical `https://pianogrid.com{url}`; `index,follow` |
| `node scripts/check-chord-seo-evidence-incremental.mjs` | PASS; 283 historical + 10 B7; guitar excluded; `intent_fit` not VERIFIED_SEO; GSC 16 unique URLs with empty GSC facts |
| `node scripts/check-chord-query-candidates.mjs` | PASS; B7 stays B7; Bb7 stays Bb7; Cm9 not mapped to Cmadd9 |
| `npm run lint` | **N/A** (script does not exist) |
| `npm run typecheck` / `npm run check` | PASS (foundation 565/0; CSS pass) |
| `npm run build` | PASS (exit 0). Some family/hub pages retried after 60s static-generation timeout, then finished 211/211 |
| `node scripts/check-chord-discovery-acceptance.mjs` | Partial: SSR href coverage PASS; hub→minor→B minor PASS; family entry visibility PASS. **FAIL** hub library search `Bb`→`/chords/b-flat-major` and `Cmadd9`→`/chords/c-madd9` on desktop and mobile (4 checks). Those pages were not in the Task 11 apply set; aliases `B-flat` and `Cm(add9)` still locate the same URLs |
| `node scripts/check-chord-tdh-smoke.mjs` | PASS for B7, Cmaj7, Cm7, Bm7♭5, Csus2, Csus4, D♭7, F♯maj7, B minor, seventh, hub at 1440 and 390. **FAIL** only `mobile /chords/d-flat-m7-flat5` horizontal overflow delta=59 (HOLD page, copy not rewritten) |
| Cursor browser on `:3128` | B7 Title/H1/intro/breadcrumb/FAQ match specified copy; first inversion still shows B–D♯–F♯–A; Cmaj7 short label; seventh family H1 unchanged, cards use short labels except HOLD `D♭ Half-Diminished Seventh` |

## Not run / remaining human gates

| Check | Status |
|---|---|
| Device / listening / screen reader / print | **NOT_RUN**. Clicking Play is not a listening or theory acceptance |
| Live `https://pianogrid.com` | **NOT_RUN** (no deploy). Old live copy is not a local-apply failure |
| US Google TOP10 | **NOT_RUN**; CSV `intent_fit` remains `UNCHECKED` |
| Task 11 final commit / push / deploy | **NOT_RUN**; not authorized |
| 158-page product/SEO review | **NOT_STARTED** (after an approved publish, per the master plan) |

## Module / family regression

9 family + 4 structure URLs were not given Task 11 Title/H1 rewrites. `/chords/seventh` Title remains `Seventh Piano Chords: 7, Maj7, Min7 & Half-Diminished`; H1 remains `Seventh Piano Chords`. Family cards now show the same-entity short labels for the 71 applied details (hrefs unchanged). Seventh family `approved=false` candidate in `TDH_REVIEW_QUEUE.csv` was left untouched.

## Evidence rules still held

- Volumes not summed across B7 aliases.
- Guitar queries keep empty URL + `GUITAR_EXCLUDED`.
- `b7 piano` 590 kept beside `b7 chord piano` 1300 and `b7 chord in piano` 1600.
- Alignment CSV `piano_query` for B7 is still `b7 chord piano`.
- B7 evidence was not appended again (still 293 = 283 + 10).
