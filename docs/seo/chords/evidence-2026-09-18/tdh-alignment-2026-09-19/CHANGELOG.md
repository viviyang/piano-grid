# CHANGELOG — applied name/TDH alignment (local, not published)

`execution_state=APPLIED_LOCAL` for 71 same-entity rows. `applied=true` only for those rows. Working tree only; no Task 11 commit.

Implementation: `src/lib/chord-detail-seo-copy.ts` plus `SEO_COPY` spread in `src/lib/seo-editorial.ts`. Pack JSON music `name` / notes / URLs were not edited. `applyEditorialChordCopy` maps Title/H1/intro/section labels on N1/N2B/N2C models. Breadcrumb and family cards use `editorialHeading(url, …)`.

## `/chords/b-7` (specified copy, applied locally)

Object unchanged: URL `/chords/b-7`, chordId `b-7`, symbol `B7`, formal name `B Dominant Seventh`, notes B D♯ F♯ A. Canonical `https://pianogrid.com/chords/b-7`. Robots `index,follow`.

| Field | Before (pack / pre-apply render) | After (local production HTML) |
|---|---|---|
| Title | `B Dominant Seventh Piano Chord (B7): Notes & Inversions` then branded if ≤52 | `B7 Chord: Piano Notes, Inversions & Sound \| PianoGrid` |
| H1 | `B Dominant Seventh Piano Chord` | `B7 Chord` |
| Description | Pack `Find the b dominant seventh…` with editorial capitalizer | `Learn the B7 chord on piano: B, D♯, F♯ and A. See keyboard diagrams, explore all three inversions, hear the chord and practice finding its notes.` |
| Intro | `The B Dominant Seventh chord contains B, D♯, F♯, A. Formula: 1–3–5–♭7.` | `B7, also called B dominant seventh, contains B, D♯, F♯ and A. Use the piano diagram to find the notes, hear the chord and explore its three inversions.` |
| Theory (visible) | `A b dominant seventh is a major triad plus a minor seventh.` | `The B7 chord is a major triad plus a minor seventh.` |
| Fingering note | `No independently authorized fingering dataset is provided for N2C.` | `Fingerings are not included on this page. The diagram shows note positions, not a prescribed hand shape.` |
| FAQ | notes/formula/inversion count | `What is a B7 chord?` → `B7 is a B dominant seventh chord, made up of B, D♯, F♯ and A.` plus formula and inversion questions |
| Keyboard H2 | `{formal name} keyboard and inversions` | `B7 piano notes and keyboard diagram` (anchor `#b-7-result` unchanged) |
| Formula H2 | `{formal name} formula` | `How is the B7 chord built?` |
| Inversions H2 | `{formal name} positions and inversions` | `B7 inversions` |
| Practice | `Build B7 on the keyboard` | kept |
| Breadcrumb / seventh-family card | formal `B Dominant Seventh` | visible label `B7 Chord`; music object unchanged |

Brand suffix appears once. `intent_fit` stays `UNCHECKED`.

## Other same-entity rows (70 applied locally)

Seed 72 minus HOLD `/chords/d-flat-m7-flat5` = 71 applied. Direction unchanged from the proposal: Dominant7 `B7 Chord` / `C7 Chord`; Major7 `Cmaj7 Chord`; Minor7 `Cm7 Chord`; Sus2/Sus4 `Csus2 Chord` / `Csus4 Chord`; Half-diminished spoken name first, e.g. `B Half-Diminished Chord (Bm7♭5)`.

Title tails still use verified capabilities only. `COPY_ARTICLE_CASE` theory lines on applied seventh pages use `The {symbol} chord is…`. N2C fingering engineering sentence replaced on applied pages only.

CSV `current_*` after `--html` is stamped from local production HTML, including unchanged pages whose pack JSON differs from runtime (N2B description correction, original-nine title branding).

## Explicitly not changed

- Five HOLD URLs: `/chords/d-flat-m7-flat5`, `/chords/f-sharp-madd9`, `/chords/a-flat-madd9`, `/chords/b-flat-madd9`, `/chords/d-flat-madd9`.
- Four upstream-protected details and four non-detail pages listed in BASELINE.md.
- Seventh family and other `approved=false` TDH_REVIEW_QUEUE candidates.
- URLs, canonical, robots, indexability, chordId, notes, inversions, audio MIDI, print spellings, PDF paths.
- Formal music `name` fields in pack JSON.

See `CHORD_TDH_ALIGNMENT.csv` for every detail row.
