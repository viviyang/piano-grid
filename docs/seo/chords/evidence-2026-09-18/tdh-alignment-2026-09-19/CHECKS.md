# CHECKS — 2026-09-19 C-group name/TDH alignment

Gate: **BASELINE_BLOCKED**. App Title/H1/description were not applied, so production-build and browser passes are not a pass/fail for this copy.

## Ran

| Check | Result |
|---|---|
| `git status --short` / branch / HEAD / log -8 / diffs / merge-base / ahead-behind | HEAD `6b95908`; `origin/main` `5fa6cb6`; 0/1 behind; dirty A/B retained |
| `git diff --name-status HEAD origin/main` | 9 files; eight-page TDH in `seo-editorial.ts` + N1 `applyEditorialChordCopy` |
| Registry scan `node scripts/scan-chord-tdh-alignment.mjs` | **145/145** detail URLs; 0 extra; 0 missing |
| Seed 72 in registry | 72/72 |
| Classification | SAME_ENTITY_LABEL_ALIGNMENT 72; ALREADY_CLEAR 69; UPSTREAM_PROTECTED 4; CONTENT_REVIEW 5 |
| Proposed Title/H1/description | 71 / 71 / 71; applied 0 |
| B7 proposed Title/H1/description/intro | match section 6 of the prompt |
| Identities in CSV | B7 ≠ Bmaj7 ≠ Bm7 ≠ Bm7♭5 ≠ B minor ≠ B♭7; Csus2 ≠ Csus4; Cm(add9) is not rewritten toward Cm9 |
| Unique current Titles | 145/145 |
| `node scripts/append-b7-query-evidence-2026-09-19.mjs` | +10 observations; master now 293; historical 283 keys kept |
| `node scripts/check-chord-seo-evidence-incremental.mjs` | PASS (283 historical + 10 B7 append; 86/47/2/3/0; five HOLD still no positive) |
| `node scripts/check-chord-query-candidates.mjs` | PASS; B7 candidates stay on B7; Bb7 stays Bb7; Cm9 not mapped to Cmadd9 |
| Screenshot file `c39ac412-1136-4fe2-a36f-3220b0047b50.png` | **not in worktree**; values stored as user transcript |
| `npm run lint` | **N/A** (script does not exist) |

## Not run

| Check | Status |
|---|---|
| `npm run typecheck` | NOT_RUN (no app copy applied) |
| `npm run check` / `check:foundation` / `check:css` | NOT_RUN |
| `npm run build` / production HTML | NOT_RUN |
| Desktop/mobile browser of B7, Cmaj7, Cm7, B half-dim, Csus2, Csus4 | NOT_RUN |
| Device / listening / screen reader / print | NOT_RUN |
| Live `https://pianogrid.com` acceptance | NOT_RUN (no deploy; live old copy is not a local-fix failure) |
| US Google TOP10 | NOT_RUN; `intent_fit` remains `UNCHECKED` |
| Hydration vs SSR content | NOT_RUN this round |

## Module / family regression

13 family+structure URLs were not rewritten. No C-group code landed in shared metadata, so no new family-page Title/H1 regression from this round. Seventh family `approved=false` candidate in `TDH_REVIEW_QUEUE.csv` was left untouched.

## Evidence rules checked in data

- Volumes not summed across B7 aliases.
- Guitar queries have empty URL + `GUITAR_EXCLUDED`.
- `b7 piano` 590 kept beside `b7 chord piano` 1300 and `b7 chord in piano` 1600.
- Alignment CSV `piano_query` for B7 is the specified `b7 chord piano`, not the highest-volume piano variant.
