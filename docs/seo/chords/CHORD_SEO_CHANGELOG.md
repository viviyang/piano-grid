# Chord SEO Changelog

Date: 2026-09-17. Round: Family keyword correction + Chord URL inventory + hub/nav discovery. No deploy, commit, or push.

## Not changed

- No Chord Engine rewrite
- No URL, redirect, canonical, or robots/index changes
- No detail-page Title / H1 / description batch rewrite
- No deletion, noindex, or sitemap removal
- No invented search volumes
- No fingering or theory-data changes
- `/chords`, `/chords/major`, `/chords/minor`, and `/chords/seventh` primary targets were not rewritten
- Keyboard / audio / inversion / print datasets untouched

## Family Title / H1 (this round)

Published through `src/lib/seo-editorial.ts`. Original category JSON packs stay intact. Brand suffix is inside the supplied Title, so `editorialMetadata` does not add a second `| PianoGrid`.

| URL | Primary keyword | H1 | Title |
|---|---|---|---|
| `/chords/diminished` | Diminished Chords | Diminished Chords | Diminished Chords: Piano Notes, Formula & Inversions \| PianoGrid |
| `/chords/augmented` | Augmented Chords | Augmented Chords | Augmented Chords: Piano Notes, Formula & Inversions \| PianoGrid |
| `/chords/suspended` | Suspended Chords | Suspended Chords | Suspended Chords: Sus2 & Sus4 Piano Notes & Inversions \| PianoGrid |
| `/chords/add` | Add9 Chords | Add9 Chords | Add9 Chords: Major & Minor Piano Notes & Voicings \| PianoGrid |
| `/chords/extended` | Extended Chords | Extended Chords | Extended Chords: 9th, 11th & 13th Piano Chords \| PianoGrid |
| `/chords/altered` | Altered Dominant Chords | Altered Dominant Chords | Altered Dominant Chords: Piano Notes, Formulas & Voicings \| PianoGrid |

Verified US Desktop volumes (user Semrush, 2026-09-17): Diminished 1,600; Suspended 1,600; Augmented 1,000; Add9 390; Extended 390; Altered Dominant 210. These phrases do not include `on piano`. Piano remains a context word in Title tails and descriptions.

## Altered body copy

The first section already describes named dominant-seventh alterations and states that “Alt” is not one compulsory note set. That matches **Altered Dominant Chords**. No theory rewrite.

## Seventh family

Not retargeted. Recorded as `NEEDS_KEYWORD_REVIEW`. Manual queries: 7th chords; seventh chords; piano 7th chords; 7th chords piano; seventh chords piano. A D7 detail query is not the family query.

## Hub discovery

`/chords` gained a visible two-layer browse block:

- Common chords: Major, Minor, Seventh
- More chord types: Diminished, Augmented, Suspended, Add9, Extended, Altered

Each card uses live counts from route/reference arrays and a Browse CTA. The 25-triad chart stays below; 100+ detail links are not dumped into the header or the hub first screen.

## Navigation

- Desktop Chords overview label: **Browse all chords →**
- Mobile: explicit **Browse all chords**
- Menu label **Add** → **Add9**
- Detail URLs still stay out of the header
- More Chords remains a button-only family list, not a 100+ detail dump

## Inventory files

- `docs/seo/chords/CHORD_ROUTE_AUDIT.md`
- `docs/seo/chords/CHORD_ROUTE_AUDIT.csv`
- `docs/seo/chords/CHORD_KEYWORD_MANUAL_CHECK.csv`
- `docs/seo/chords/CHORD_DISCOVERY_AUDIT.md`
- this file

## Regression this round

Executed: `npm run check` (Foundation 565/0, typecheck, CSS), `npm run build` (211 static pages), fetch of all 158 chord-module URLs on production `next start` (all 200; canonical `https://pianogrid.com{path}`; `index, follow`; no sitemap deletions; no double `| PianoGrid` on the six family titles), and `scripts/check-chord-navigation.mjs` against that server.

Family Title/H1 assertions in `scripts/check-chords-n2b.mjs` and `scripts/check-chords-completion.mjs` now expect the published editorial strings. Full N2B/N2D/completion Playwright audio/print loops were not re-run this turn; a sampled C Diminished detail still showed keyboard, play, and print.

## Classification policy used

- `KEEP_SEO`: verified family keywords, original-plan URLs with recorded volume, hub/tools with original volume
- `KEEP_REFERENCE`: later taxonomy details that complete the chord library and now have a visible family path
- `REVIEW_KEYWORD`: Seventh family; original-plan URLs whose volume was never recorded (currently `/chords/g-major`)
- `REVIEW_INDEXATION`: none listed, and none executed
- `TECHNICAL_ONLY`: none
