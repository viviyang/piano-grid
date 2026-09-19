# CHECKS — 2026-09-19 C-group name/TDH alignment (publish wrap-up)

Gate: **PUBLISHED_VERIFIED** for this copy publish only. Not a Google-index result and not a 158-page product review.

## Reused before push (same candidate `bd3ba53`)

| Check | Result |
|---|---|
| Checkpoint commits | `430579d`, `f80084b` |
| Local merge of `5fa6cb6` | `e00ae6e`; no conflicts; Task 11 copy not in the merge |
| `node scripts/scan-chord-tdh-alignment.mjs` | 145/145; SAME_ENTITY 72; ALREADY_CLEAR 69; UPSTREAM_PROTECTED 4; CONTENT_REVIEW 5; **APPLIED_LOCAL 71**; HOLD 5; NO_TDH_CHANGE 65 |
| `node scripts/check-chord-tdh-applied.mjs` | PASS (copy map, identities, protected keys, 206/158 set vs `e00ae6e`) |
| `node scripts/check-chord-tdh-applied.mjs --html` | PASS against local `http://127.0.0.1:3128` before publish; 145 unique titles; applied 71 Title/H1/description/intro; eight protected fields; HOLD H1 not rewritten; self-canonical `https://pianogrid.com{url}`; `index,follow` |
| `node scripts/check-chord-seo-evidence-incremental.mjs` | PASS; 283 historical + 10 B7; guitar excluded; `intent_fit` not VERIFIED_SEO; GSC 16 unique URLs with empty GSC facts |
| `node scripts/check-chord-query-candidates.mjs` | PASS; B7 stays B7; Bb7 stays Bb7; Cm9 not mapped to Cmadd9 |
| `npm run lint` | **N/A** (script does not exist) |
| `npm run typecheck` / `npm run check` | PASS (foundation 565/0; CSS pass) |
| `npm run build` | PASS locally (exit 0). Some family/hub pages retried after 60s static-generation timeout, then finished 211/211 |
| `node scripts/check-chord-discovery-acceptance.mjs` | Partial: SSR href coverage PASS; hub→minor→B minor PASS; family entry visibility PASS. **FAIL** hub library search `Bb`→`/chords/b-flat-major` and `Cmadd9`→`/chords/c-madd9` on desktop and mobile (4 checks). Those pages were not in the Task 11 apply set; aliases `B-flat` and `Cm(add9)` still locate the same URLs. Not treated as a copy-publish blocker |

## Publish

| Check | Result |
|---|---|
| Production target | GitHub `viviyang/piano-grid` `main` → Vercel Git production for `piano-grid`. Confirmed by Vercel build log: `Cloning github.com/viviyang/piano-grid (Branch: main, Commit: bd3ba53)` |
| Push | `git push origin HEAD` and `git push origin HEAD:main` succeeded; no force-push |
| Production deploy | `dpl_5T154PtaD8FjXUMPFpsQcdwwvhKP` **Ready**; aliases `https://pianogrid.com` |
| Preview of same SHA | `dpl_9zjsoyYjw9FkDZ69tSdgx3XsBQJJ` **Error**: `/chords/major` exceeded 60s static generation three times. Production of the same commit succeeded. No extra `vercel --prod` |

## Live `https://pianogrid.com` (2026-09-19T14:16:45.297Z)

| Check | Result |
|---|---|
| `node scripts/check-chord-tdh-live.mjs` | PASS 115/115 against origin `https://pianogrid.com` |
| `/chords/b-7` | Title/H1/description match the approved values; brand once; canonical self; `index,follow` |
| Eight protected pages | Title/H1 unchanged from `5fa6cb6` |
| Samples | `/chords/c-maj7`, `/chords/c-m7`, `/chords/b-m7-flat5`, `/chords/c-sus2`, `/chords/c-sus4`, `/chords/d-flat-7`, `/chords/f-sharp-maj7` match applied CSV |
| `/chords/seventh` | Family Title still `Seventh Piano Chords: 7, Maj7, Min7 & Half-Diminished`; H1 `Seventh Piano Chords`; cards use short labels except HOLD `D♭ Half-Diminished Seventh` |
| `/chords/c-add9` | Kept pack-style `Cadd9 Piano Chord`; `applied=false` |
| `/chords/f-sharp-madd9` | HOLD kept `F♯m(add9) Piano Chord` |
| `/chords` hub | `Piano Chord Chart: Notes, Diagrams & Sound \| PianoGrid` |
| Sitemap / robots | sitemap 206 = `PUBLIC_ROUTES`; robots Allow `/` + sitemap line |
| `node scripts/check-chord-tdh-smoke.mjs` with `PIANO_BASE_URL=https://pianogrid.com` | PASS B7, Cmaj7, Cm7, Bm7♭5, Csus2, Csus4, D♭7, F♯maj7, B minor, seventh, hub at 1440 and 390. **FAIL** only `mobile /chords/d-flat-m7-flat5` horizontal overflow delta=59 (HOLD page, copy not rewritten; same as local) |
| Cursor browser | Live B7 Title/H1/intro/FAQ/breadcrumb; Play chord enabled after hydrate (`Playback finished.`); protected `/chords/b-minor` Title/H1; seventh family H1 unchanged; hub Title unchanged |

CSV `current_*` was stamped from **local** production HTML before publish. Live acceptance URLs matched those values. They were not rewritten as if the 2026-09-18 historical HTML had already been this version.

## Not run / remaining human gates

| Check | Status |
|---|---|
| Device / listening / screen reader / print | **NOT_RUN**. Clicking Play is not a listening or theory acceptance. These stay NOT_RUN; they were not treated as a missing copy-publish gate because the site was already live and prior TDH used the same Git production path |
| US Google TOP10 | **NOT_RUN**; CSV `intent_fit` remains `UNCHECKED` |
| GSC index / request indexing | **NOT_RUN**; 16-row CSV GSC facts still empty; not a blocker |
| 158-page product/SEO review | **NOT_STARTED** |

## Module / family regression

9 family + 4 structure URLs were not given Task 11 Title/H1 rewrites. `/chords/seventh` Title remains `Seventh Piano Chords: 7, Maj7, Min7 & Half-Diminished`; H1 remains `Seventh Piano Chords`. Family cards now show the same-entity short labels for the 71 applied details (hrefs unchanged). Seventh family `approved=false` candidate in `TDH_REVIEW_QUEUE.csv` was left untouched.

## Evidence rules still held

- Volumes not summed across B7 aliases.
- Guitar queries keep empty URL + `GUITAR_EXCLUDED`.
- `b7 piano` 590 kept beside `b7 chord piano` 1300 and `b7 chord in piano` 1600.
- Alignment CSV `piano_query` for B7 is still `b7 chord piano`.
- B7 evidence was not appended again (still 293 = 283 + 10).
- GSC facts were not filled from live HTML or `index,follow`.
