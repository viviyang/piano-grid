# PianoGrid Chords incremental evidence — 2026-09-18

Worktree: `pianogrid-final-integration` / `codex/final-integration` / `6b95908`.
Not committed, not pushed, not deployed. Old `piano` / `codex/chords-b1` dirty files were not touched.

## Git baseline

Read-only confirmation only; no checkout/reset.

- HEAD = `6b95908` `Publish verified Chord family titles and a two-layer browse entry on /chords.`
- `origin/codex/final-integration` = same commit (0/0)
- `origin/main` is **not** the same: remote `main` is `5fa6cb6` (`feat: align TDH on eight high-priority public pages`), one commit **ahead** of `6b95908`
- Local dirty files from the earlier engineering pass were left in place

## 1. Evidence merge

Source: `_handoff/hords-seo-evidence-2026-09-18/comparison-update/02_QUERY_EVIDENCE_ALL.csv` (path spelling is `hords`, missing `c`).
Deduped with the original 195-row `02_QUERY_EVIDENCE.csv` on `(observed_date, batch, query, source)`.

| Item | Count |
|---|---:|
| Old independent observations retained | 195 |
| New independent observations | 88 |
| Merged unique observations | 283 |
| A visible | 17/17 |
| B visible | 27/28 |
| C visible | 44/76 |
| NOT_VISIBLE | 33 (not 0, not “not queried”) |
| OBSERVED_100_PLUS | 86 |
| OBSERVED_1_TO_99 | 47 |
| ZERO_OBSERVED_ONLY | 2 |
| NO_NUMERIC_DATA | 3 |
| SCREENSHOT_GAP | 0 |
| Pages with at least one positive | 133 |
| Quarantined | 1 (`E-flat Minor Chordth chords`, unmapped) |

This is screenshot-coverage observation, not `VERIFIED_SEO`. Page summary is max single-query volume; aliases are not summed. Later 0/blank does not clear an earlier positive. Empty KD/intent does not overwrite a numeric volume.

Still no positive (no page/index change):

- `/chords/d-flat-m7-flat5` — zero only
- `/chords/f-sharp-madd9` — zero only
- `/chords/a-flat-madd9` — no number
- `/chords/b-flat-madd9` — no number
- `/chords/d-flat-madd9` — no number

## 2. Set reconciliation

Current registry: **158 = 145 detail + 9 family + 4 structure** (includes `/chord-progressions`).
137 pending details + 9 original mapped − overlap `/chords/g-major` = 145.
Original plan: 41 keyword rows → 9 detail URLs; 176 rows → 13 module URLs.
Extended 108 / Altered 96 remain embedded objects, not URLs.

`04_FULL_CHORDS_158.csv` vs live `PUBLIC_ROUTES` chord set: **empty difference**.
206 = public route count. Live sitemap unique URLs also 206. 211 static-output count was not re-measured this round. GSC aggregate is not required to match either.

## 3. Why these pages were added (Git, this worktree only)

`URL_ORIGIN_LEDGER.csv`: 158/158 rows have a first-definition commit. `origin_date` is commit author time, **not** production publish. File mtime and sitemap lastmod were not used.

| Batch | URLs | First commit | Volume at introduction |
|---|---:|---|---|
| ORIGINAL_MAPPED_OR_HUB (hub + major/minor + 9 mapped details) | 12 | `f5367c6` hub; details via site-routes / early pages | original-keyword file where mapped (e.g. piano chord chart 6600) |
| N1 major/minor expansion | 16 | `4e3371e` `docs/pianogrid-chords-next-expansion` | not in original URL-plan keyword file |
| N2B 3 family + 48 detail | 51 | `b91d176` 2026-09-12 | pack field `keywordVolume: null` |
| N2C 1 family + 48 detail | 49 | `49e003e` 2026-09-13 | pack field `keywordVolume: null` |
| N2D Add9/MinorAdd9 24 + `/chords/add` | 25 | **same `49e003e`** as N2C; files are `docs/pianogrid-chords-n2d-v2` schema N2D-2.0 | pack field `keywordVolume: null` |
| Extended + Altered families | 2 | `f98e66e` 2026-09-14 | completion pack |
| by-key, finder, chord-progressions | 3 | `c9098d8` 2026-09-11 | original keywords where mapped |

N2D existed as a batch name in files; the first Git commit of those files is `49e003e`, not a later metadata edit. Historical “Published” in docs is implementation language and can coexist with undeployed production.

## 4. Competitor XML (real bytes)

Fetched `https://www.pianochord.org/sitemap.xml` and `https://pianogrid.com/sitemap.xml` with the pack stdlib script. robots + 1s delay. No 403/429.

| Stat | Competitor | PianoGrid |
|---|---:|---:|
| Raw loc | 820 | 206 |
| Unique URLs | 803 | 206 |
| Duplicate loc | 17 | 0 |
| HTML / PDF / other | 803 / 0 / 0 | 206 HTML |
| Written roots / pitch classes | 17 / 12 | — |
| Family / root hub / root collection / detail candidate / unclassified / structure | 9 / 17 / 17 / 459 / 300 / 1 | — |

Saved: `docs/seo/chords/evidence-2026-09-18/competitor-xml/raw/` with sha256 in `FETCH_META.json`.

**158 URL pattern hits (candidates, not ranking):** 153 strict spelling hits; 1 enharmonic-only (`/chords/c-flat-major`); 4 unmatched structure URLs (`/chords`, `/chords/finder`, `/chords/by-key`, `/chord-progressions`).
Cardinality for 158: 1:1 = 129; 1:N = 0; N:1 own URLs = 24 (12 competitor sus pages); enharmonic only = 1; not found = 4.
**138 sample:** 138/138 strict hits; 1:1 = 114; N:1 own = 24.

Unclassified 300 are extra altered/extended/add11/alternative-bass pages, not `dm-flat`→D minor errors. Title/H1 samples confirmed: Cadd9/Cadd2 same page; Csus2/Csus4 same page; Cmadd9 ≠ Cm9; dim ≠ dim7; `dm-flat.html` H1 is “Db minor chord”.

XML membership ≠ Google indexing. No competitor traffic was measured.

## 5. Action queue (no Title batch rewrite)

Priority: `CORE_14_REVIEW.csv` (13 details + Seventh). Code check: detail first screen already has chord name, real notes, keyboard, sound, inversions or voicing examples. Seventh family first screen has name/notes/keyboard cards; playback is on the detail page. `intent_fit` stays `UNCHECKED` (no standardized US SERP). Six family KEEP. Seventh Title remains a review candidate (`approved=false`).

Five no-positive URLs: `FIVE_PRODUCT_REVIEW.csv` — keep current service; merge/404 not executed. Sus2/Sus4 same-root pairing is a granularity review only.

## 6. Crawl/index materials

`GSC_REVIEW.csv`: 14 core URLs. Indexed/discovered/crawled/last crawl/Google canonical/hostload/first impression **left empty**. GeFei SEO AGENT is not a GSC reading. `site:` was not used.

Public HTML (not GSC): `/chords/b-minor` and `/chords/seventh` both `robots=index, follow` with self-canonical on `https://pianogrid.com`. Live sitemap is fetchable and lists the 158 module URLs. Local HEAD vs live: Seventh live Title currently lacks the `| PianoGrid` suffix that local editorial metadata may add. That is a version note, not a GSC status.

Did not cut internal links for 10/20-volume pages, did not apply a 600-volume index floor, did not schedule 2–4 week 404s.

## Tests actually run

- `node scripts/update-chord-seo-evidence-incremental.mjs`
- `node scripts/check-chord-seo-evidence-incremental.mjs` PASS
- `node scripts/check-chord-query-candidates.mjs` PASS (B/Bb generator not reworked)
- `python scripts/compare-sitemaps.py --self-test` PASS
- live XML fetch PASS
- Title/H1 samples PASS (robots + delay)

Not re-run this round: full browser discovery regression, human ear/device/screen-reader/print gates, `npm run lint` (script does not exist → N/A), old 17-route integration whitelist (not a full-site claim), `npm run build` / `npm run check` (this pass changed evidence/analysis scripts only).

## Suggested commit groups (not executed)

**A. Engineering / copy / generator** — already done in the earlier uncommitted pass (B/Bb candidates, Browse entry, user-facing copy). Do not redo.

**B. Evidence and comparison** — this round: merged query CSV, origin ledger, XML bytes/hashes, unclassified review, core-14 / five-URL / GSC templates.

**C. Approved content changes** — later, only after SERP/content review: optional Seventh Title candidate; optional sus2/sus4 granularity decision; optional product keep/merge for the five no-positive URLs. None of these are approved or applied.

## Open items

- No authorized GSC URL Inspection export
- No US Google standardized SERP for intent_fit
- Production publish dates remain UNKNOWN (commit dates are not launch dates)
- Remote `main` is one TDH commit ahead of this worktree; not merged here
- 300 competitor unclassified URLs are extra qualities, not a PianoGrid URL-expansion order
