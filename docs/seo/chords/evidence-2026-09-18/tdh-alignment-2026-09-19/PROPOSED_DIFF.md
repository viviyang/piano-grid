# Proposed implementation (not applied)

Blocked by `BASELINE.md`. Do not paste this into `src/lib/seo-editorial.ts` until `5fa6cb6` is safely integrated and A/B dirty work is protected.

## Why a mapping layer, not pack JSON

- Pack `name` / `symbol` / notes / voicing MIDI stay the music object.
- Title/H1/intro are editorial. Origin/main already does this for N1 via `applyEditorialChordCopy`.
- N2C/N2B still read `raw.seo.h1` and `raw.name` directly (`src/lib/chord-n2c-content.ts`, `chord-n2b-content.ts`). Adding `SEO_COPY` alone would change metadata Title/description through `editorialMetadata`, but **not** the visible H1, TOC, breadcrumb, or family-card `name` until the same mapping is wired.

## B7 `SEO_COPY` candidate (local title without duplicating brand)

`editorialMetadata` adds `| PianoGrid` when the title lacks the brand and length ≤ 52. Pass the local title **without** a second brand:

```ts
'/chords/b-7': {
  title: 'B7 Chord: Piano Notes, Inversions & Sound',
  h1: 'B7 Chord',
  description: 'Learn the B7 chord on piano: B, D♯, F♯ and A. See keyboard diagrams, explore all three inversions, hear the chord and practice finding its notes.',
  h2: {
    'B Dominant Seventh keyboard and inversions': 'B7 piano notes and keyboard diagram',
    'B Dominant Seventh formula': 'How is the B7 chord built?',
    'B Dominant Seventh positions and inversions': 'B7 inversions',
  },
}
```

Intro/FAQ/fingering sentences are content fields, not `SEO_COPY` today. After baseline is open, reuse existing blocks and keep anchor ids (`b-7-intro`, `b-7-formula`, `b-7-inversions`, `practice`, …).

## Other 70 rows

See `CHORD_TDH_ALIGNMENT.csv` `suggested_*` columns. Same wiring pattern; do not lowercase `CM7`/`Cm7` or rewrite music `name`. Do not apply HOLD or `UPSTREAM_PROTECTED` rows.

## A-group copy

Dirty browse components already replaced some implementation phrasing. Do not invent a second fingering/disclaimer dialect there. N2C detail fingering still shows the N2C dataset sentence until an editorial mapping is applied on those pages only.
