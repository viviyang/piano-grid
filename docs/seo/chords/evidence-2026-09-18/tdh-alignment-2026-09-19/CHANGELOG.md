# CHANGELOG — proposed name/TDH alignment (not applied)

`applied=false` for every row. `execution_state=PROPOSED_BASELINE_BLOCKED` for 71 same-entity label rows. No live Title/H1/description/intro changed.

## `/chords/b-7` (specified copy)

Object unchanged: URL `/chords/b-7`, chordId `b-7`, symbol `B7`, formal name `B Dominant Seventh`, notes B D♯ F♯ A.

| Field | Before (this worktree render source) | After (proposed only) |
|---|---|---|
| Title | `B Dominant Seventh Piano Chord (B7): Notes & Inversions` | `B7 Chord: Piano Notes, Inversions & Sound \| PianoGrid` |
| H1 | `B Dominant Seventh Piano Chord` | `B7 Chord` |
| Description | Pack: `Find the b dominant seventh…` then editorial capitalizer → `Find the B dominant seventh chord on piano: B, D♯, F♯, A. …` | `Learn the B7 chord on piano: B, D♯, F♯ and A. See keyboard diagrams, explore all three inversions, hear the chord and practice finding its notes.` |
| Intro (direct answer) | `The B Dominant Seventh chord contains B, D♯, F♯, A. Formula: 1–3–5–♭7.` | `B7, also called B dominant seventh, contains B, D♯, F♯ and A. Use the piano diagram to find the notes, hear the chord and explore its three inversions.` |
| Theory (user-visible) | `A b dominant seventh is a major triad plus a minor seventh.` | Keep the fact; do not lowercase the root. Prefer `The B7 chord…` / `B7 is a B dominant seventh…` |
| Fingering note | `No independently authorized fingering dataset is provided for N2C.` | `Fingerings are not included on this page. The diagram shows note positions, not a prescribed hand shape.` |
| FAQ | `What notes are in B7?` + formula + inversion count | Merge notes/definition into `What is a B7 chord?` → `B7 is a B dominant seventh chord, made up of B, D♯, F♯ and A.` Keep formula and inversion questions. |
| Keyboard H2 | `{formal name} keyboard and inversions` | `B7 piano notes and keyboard diagram` (anchor ids unchanged) |
| Formula H2 | `{formal name} formula` | `How is the B7 chord built?` |
| Inversions H2 | `{formal name} positions and inversions` | `B7 inversions` |
| Practice | already `Build B7 on the keyboard` | keep |
| Breadcrumb / seventh-family card | formal `B Dominant Seventh` | preferred visible label `B7 Chord` without renaming the music object |

Reason: research already treats B7 and B dominant seventh as one object. Short label first is an editorial decision, not an exact-match ranking rule and not a URL change. Title omits Fingering (none verified) and omits PDF in the specified string even though `public/reference/assets/chord-b-7.pdf` exists. `intent_fit` stays `UNCHECKED`.

Queries recorded separately (do not sum): `b7 chord` 9900; `b7 chord in piano` 1600; `b7 chord piano` 1300; historical `b7 piano` 590. Guitar rows excluded.

## Other same-entity rows (70 proposed, 0 applied)

Seed 72 = Dominant7×12 + Major7×12 + Minor7×12 + Half-diminished7×12 + Sus2×12 + Sus4×12. That is a naming pattern, not 72 SEO errors.

- 72/72 seed URLs exist in the live detail registry.
- 71 proposed Title/H1/description (seed minus `/chords/d-flat-m7-flat5`, which is HOLD).
- Direction: Dominant7 `B7 Chord` / `C7 Chord` with intro “dominant seventh”; Major7 `Cmaj7 Chord` with “major seventh”; Minor7 `Cm7 Chord` with “minor seventh”; Sus2/Sus4 `Csus2 Chord` / `Csus4 Chord` with spoken quality; Half-diminished keep both names, spoken name first, e.g. `B Half-Diminished Chord (Bm7♭5)`.
- Title tails use only verified capabilities (notes, inversions or voicings, Sound, Fingering if verified, PDF if the file exists). Not a uniform promise.
- `COPY_ARTICLE_CASE` on 21 pages (`A b dominant…` / `A c major…` in theory). `COPY_ENGINEERING_FINGERING` on all 48 N2C pages. Proposed replacement fingering sentence is listed; not applied.
- Major/Minor/Dim/Aug/Add9 pages classified `ALREADY_CLEAR` were not mechanically rewritten.

## Explicitly not changed

- Five HOLD URLs: `/chords/d-flat-m7-flat5`, `/chords/f-sharp-madd9`, `/chords/a-flat-madd9`, `/chords/b-flat-madd9`, `/chords/d-flat-madd9`.
- Four upstream-protected details: `/chords/b-minor`, `/chords/d-minor`, `/chords/e-minor`, `/chords/g-minor`.
- Seventh family and other `approved=false` TDH_REVIEW_QUEUE candidates.
- URLs, canonical, robots, indexability, chordId, notes, inversions, audio MIDI, print spellings, PDF paths.
- A-group dirty browse components (no second phrasing set).
- Formal music `name` fields in pack JSON.

See `CHORD_TDH_ALIGNMENT.csv` for every detail row and `PROPOSED_DIFF.md` for the blocked implementation sketch.
