# PianoGrid GEO round 1 — changes

Baseline: `eb6bb3e` on `main`. Worktree `../pianogrid-geo-20260923`, branch
`geo/2026-09-23-round1`. Not committed, not pushed, not deployed.

All four changes are publish-layer copy corrections. No content pack, note data, audio engine,
practice engine, route, canonical, robots rule, sitemap entry, dependency, token or component style
was touched. No title, description or H1 changed.

## 1. Remove the build directive from the added-note intro

Files: `src/lib/seo-editorial.ts`, `src/lib/chord-n2d-content.ts`

Why: the public `/chords/c-add9` page printed `Contextual notational variants only; do not make
duplicate pages or universally rewrite symbols.` — an instruction written for whoever builds the
site — followed by the validator fragment `complete four-member add9/minorAdd9 references; not every
possible performance omission`. Both come from `aliasPolicy` and `definition.validationScope` in the
hashed pack `docs/pianogrid-chords-n2d-v2/03_content/details/c-add9.page.json`, which must stay
byte-identical, so the correction is made where the page is published.

What: a two-entry map, `publicAddedNoteCopy`, replaces those exact strings with the reader-facing
scope they stood in for, and `chord-n2d-content.ts` passes the intro paragraphs through it.

| Before | After |
| --- | --- |
| Contextual notational variants only; do not make duplicate pages or universally rewrite symbols. | On this page, add9 and add2 label the same added note in different notation rather than two separate chords. |
| complete four-member add9/minorAdd9 references; not every possible performance omission | The examples below are complete four-note references. They do not list every omission a performer might make. |

The replacement is scoped to this page's own presentation. It does not claim the two labels are
interchangeable in every context, because the existing section "Add9 and add2: read the context"
already states "not a claim that every player uses the labels identically", and the existing question
list already states the higher layout is "not a universal position rule". Those two caveats were kept
rather than restated, so no paragraph was duplicated.

Both replacement strings are note-free. No C-specific note name, formula or register was hardcoded
into copy that other chord pages render.

## 2. Hide review identifiers on Cadd9 sources, keep the limitations

File: `src/lib/seo-editorial.ts`, `src/components/chords/detail-page.tsx`

Why: the Cadd9 source cards showed internal review identifiers `OMT-ADDED-NOTES`, `MUSICCA-CADD9` and
`PIANOCHORD-ADD`.

What: added a separate `PUBLIC_SOURCE_CODE_CLEANUP` allowlist with `/chords/c-add9`, exposed as
`hideInternalSourceCodes`, and wired it into the `hideSourceCodes` flag the chord detail component
already supports.

Why not the existing `PUBLIC_SOURCE_CLEANUP` list: that flag hides the `Scope limit:` paragraph and
the checked-date line along with the identifier. Doing that on Cadd9 would have removed two
limitations a reader needs — "All transposed examples in this package are calculated reference
examples, not individually transcribed from this source" and "Reference only: no copied prose,
diagrams, recordings or PDF files". An earlier draft of this round did use that flag; it was corrected
before release, and the acceptance script now asserts both limitation sentences are still present.

Kept: every publisher name, source title, outbound link, `Supports:` line and `Scope limit:` line.
Only the identifier string is hidden.

## 3. Make the chord finder explanation match the real input

File: `src/lib/support-content.ts`

Why: the published explanation described octave entry, which the interface does not offer, and
carried directives written for developers. The interface is a one-octave note-name keyboard, an
optional `Lowest note` select restricted to the notes already chosen, and a `Bass constraint` select.

What: `FINDER_READER_COPY` overrides five block bodies, retitles two headings, and corrects one FAQ
answer. This reuses the override pattern already present in `getChordFinder` for the `limits` block.

| Removed | Replaced with |
| --- | --- |
| Enter pitch names with octave numbers, such as C4, E4 and G4. | Select the distinct notes you are playing on the one-octave keyboard. You choose note names rather than registers, so a C in any octave is the same selection here. |
| A separate pitch-class-only input mode … must be labeled differently. | If you know which of those notes is lowest, choose it under Lowest note. Leaving it unset means the bass is unknown, so every root that fits the same notes stays in the candidate list. |
| The tool needs to distinguish a chord's root from its lowest note. It also needs a stated vocabulary… | Read the candidate name, the bass and the supported vocabulary together. A chord's root is not always its lowest note, and a name missing from the supported set does not mean your notes are musically wrong. |
| Deduplicate pitch classes for matching… / Do not discard octaves before identifying the lowest pitch. | Playing C in two octaves adds spacing, not a new note name. … Use Lowest note to say which note is at the bottom, because that is what separates C major from C/E. |
| If a collection falls outside the supported vocabulary, keep the note list visible and show that… / Do not force the nearest major chord… | When a selection falls outside the supported vocabulary, your note list stays visible and the result reports that no supported match was found rather than offering the nearest guess. |
| FAQ: Not when notes include octaves. The lowest entered pitch already supplies a bass… | FAQ: Yes. The finder works with note names rather than octaves, so an unset lowest note is treated as an unknown bass. Choose the lowest note when you know it. |

Two headings were also rewritten from instruction form to description form: "Repeated roots change
spacing, not the note set" became "Doubling a note changes spacing, not the note set", and "Show an
honest no-match state" became "When no supported match is found".

Facts preserved: the 433-object vocabulary, the `C/E` slash-bass example, the `C6` / `Am7`
ambiguity, the honest no-match behaviour, and the limit that this is not microphone recognition, MIDI
capture or a measure of timing and technique. No new capability is implied and the matcher itself was
not touched.

Scope: `/chords/finder` only. The shared `base()` reader used by `/chords/by-key`,
`/chord-progressions`, `/guide/piano-chords` and `/keyboard-notes/finger-numbers` is unchanged, and
two of those pages are covered by regression checks.

## 4. Explain the no-JavaScript state on Hear the Difference

File: `src/components/hear-the-difference/experience.tsx`

Why: it was the only interactive page of the five without a `noscript` note. With JavaScript off the
play and answer controls render but do nothing.

What: one `noscript` sentence after the hero — "Enable JavaScript to play the comparison and answer
the challenge. The interval explanation and the steps for playing both chords yourself remain
readable below." This matches the existing pattern on `/chords/finder`, `/scales/c-major` and
`/chords/c-add9`. No audio or challenge behaviour changed, and no answer is revealed early.

## Page scope of each change

Round-1 focus pages, checked individually:

| Page | Changes reaching it |
| --- | --- |
| `/chords/finder` | 3 |
| `/tools/hear-the-difference` | 4 |
| `/scales/c-major` | none — audited, no change needed |
| `/chords/c-add9` | 1 and 2 |
| `/keyboard-notes/frequencies` | none — audited, no change needed |

Pages reached by the shared added-note presentation fix (change 1 only). The two replaced strings are
identical across the whole add9 / minor-add9 family, so the correction applies to all 24 pages. Change
2 is allowlisted to `/chords/c-add9` alone and does not reach these:

`/chords/c-add9`, `/chords/d-flat-add9`, `/chords/d-add9`, `/chords/e-flat-add9`, `/chords/e-add9`,
`/chords/f-add9`, `/chords/f-sharp-add9`, `/chords/g-add9`, `/chords/a-flat-add9`, `/chords/a-add9`,
`/chords/b-flat-add9`, `/chords/b-add9`, `/chords/c-madd9`, `/chords/d-flat-madd9`,
`/chords/d-madd9`, `/chords/e-flat-madd9`, `/chords/e-madd9`, `/chords/f-madd9`,
`/chords/f-sharp-madd9`, `/chords/g-madd9`, `/chords/a-flat-madd9`, `/chords/a-madd9`,
`/chords/b-flat-madd9`, `/chords/b-madd9`

Representative regression instead of a full manual sweep. Four of the 24 are asserted in
`scripts/check-geo-round1.mjs`, chosen to cover both subtypes and both accidental directions:
`/chords/g-add9` (major, sharp-free), `/chords/c-madd9` (minor), `/chords/f-sharp-add9` (sharp key),
`/chords/e-flat-madd9` (flat key). Each is checked for the corrected sentence, for the absence of the
directive, for its **own** note data rather than C's, for the label and voicing caveats, and for the
`Scope limit:` text still being present since they are not on the change-2 allowlist. The remaining 20
were not opened individually.

Pages sharing code that was touched but whose output is unchanged, asserted as regression:
`/chords/c-7` (uses `PUBLIC_SOURCE_CLEANUP`), `/chords/by-key` and `/chord-progressions` (share the
`base()` reader edited for the finder), `/scales/d-major`.

## New non-shipping files

| File | Purpose |
| --- | --- |
| `scripts/check-geo-round1.mjs` | Acceptance check for the five pages plus out-of-scope regression. Writes `docs/geo/2026-09-23/geo-round1-validation.json`. |
| `docs/geo/2026-09-23/*.md`, `geo-round1-validation.json`, `screenshots/` | Round deliverables and evidence. |

## Considered and deliberately not changed

| Item | Reason |
| --- | --- |
| `robots.txt` | The single `*` group already allows `Allow: /` with no `Disallow`, so OAI-SearchBot, ChatGPT-User, GPTBot, Claude-SearchBot, Claude-User, ClaudeBot and Googlebot are already permitted. Named groups would add surface without changing access. `Google-Extended` permission is a user decision and was not altered. |
| JSON-LD | None of the five pages has structured data today. Adding `FAQPage`, `Review` or `Dataset` markup purely for GEO is out of scope, and no rating or adoption claim exists to mark up. |
| `/keyboard-notes/frequencies` | Already states equal temperament, `A4 = 440 Hz`, the calculation method, the key-number versus MIDI distinction, and that values are calculated rather than measured. Nothing to fix. |
| `/scales/c-major` page-level source scope text | Still shows terse ledger strings that mention keys unrelated to C major. Rewriting them means writing new attribution claims, which is an editorial decision. Proposed wording is in `USER_ACTIONS.md` for approval. |
| Analytics instrumentation | GA4, Clarity and the per-surface event wrappers already exist. The missing piece is report configuration inside GA4, not code. |
| "Free, no sign-in" statements | The site has no account system, so no page makes a contrary claim. Adding the same sentence to five pages would increase density without correcting anything. |
