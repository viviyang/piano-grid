# Authoring contract

## Verified current pipeline

[已核实] Content is currently a **JSON + pure-data TypeScript combination**. It is not one universal write-back JSON schema.

1. Raw inputs: A minor and the hub start in `docs/content/chords/page-content.json`; A major, C major and the 19-item expansion source start in `docs/content/site-master/page-content.master.json`. B3 hand-specific fingering, source attribution, practice copy and C-major connection copy live in `src/lib/chord-learning-content.ts`.
2. Adapters: `getAMinorContent()` and `getChordDetail(route)` normalize those inputs. `getChordCenter()` assembles the hub and resolves link availability with `isPublicRoute()`.
3. Validator: every detail model passes `finalizeChordDetailModel()` before React receives it. This is the current runtime validator.
4. React props: `ChordDetailPage` receives `ChordDetailModel`; `ChordCenterPage` receives `CenterModel`. Keyboard, playback and print all consume the same resolved `Voicing` MIDI values. Fingering references the selected default/root `voicingId`; practice derives its correct answer from the resolved chord pitch classes.

The resolved JSON files are safe pure-data snapshots. They contain no JSX, functions, Map, Date or `undefined`, but they are outputs and must not be treated as authoring inputs. Production TypeScript contains functions and types, so a JSON-only delivery cannot replace it without an approved interface change.

## Current fields and rules

### Detail identity, metadata and chord definition

| Field | Type / status | Rule |
|---|---|---|
| `metadata.title`, `description`, `canonical_path` | string, required | canonical must equal `data.url`; pages create Next metadata from this model. |
| `data.url` | current `ChordDetailRoute` enum | Only `/chords/a-minor`, `/chords/a-major`, `/chords/c-major`. Must be in `PUBLIC_ROUTES`. |
| `data.namespace`, `toolId` | string, required | Prefix/anchor IDs; IDs must be unique and every TOC ID must resolve. |
| `data.chord.id`, `slug` | string, required | Both must match the URL slug. |
| `name_en`, `symbol`, `root_spelling` | string, required | Preserve written accidentals. Root spelling is not interchangeable with pitch class. |
| `quality` | `major` or `minor` | Current validator only supports these two triad qualities. |
| `note_spellings` | exactly 3 strings | Pitch-class spellings; must match every voicing after accidental normalization. |
| `formula_degrees` | exactly `1,3,5` or `1,b3,5` | Determined by quality; order is required. |
| `data.rangeLabel`, `heading`, `toolHeading`, `printDisclaimer` | non-empty strings | Display copy; range must agree with diagrams and disclaimer must not promise a fingering. |
| `data.pdf{url,label}` | object, currently required | URL and action label; no null/default behavior exists. |
| `data.whitePitchClasses` | ordered number array | Shared keyboard geometry input; current source is the legacy shared convention. |
| `data.microcopy` | required string map | Loading, audio/print error, selected-note and playback text; hub adds `no_results`. |

### Voicing, display, audio and print

Each detail requires exactly three ordered `voicings` and three matching ordered `options`. `defaultId` must identify the root-position voicing. A voicing requires `voicing_id`, `inversion_label`, `chord_symbol`, `bass_spelling`, exactly three low-to-high `notes_low_to_high[{display_pitch,midi}]`, `diagram{highlight_midi,alt_text,keyboard_range_midi}`, `playback{together,ascending}`, and `print_data{spelled_pitches,highlight_midi}`. MIDI order must be identical across notes, keyboard highlights, both playback modes and print highlights; the first note is the bass; all MIDI values must be in the keyboard range. Playback events require numeric `midi`, `frequency_hz`, `onset_ms`, `duration_ms`. No nullable voicing fields are supported.

### Page copy and anchors

`blocks[]` are ordered. Each `Block` requires a unique `block_id` and `content{heading,paragraphs,steps,table,links}`. Empty arrays are meaningful; `table` is the only nullable field and is either `null` or `{columns,rows}`. Links require `label,url,published`; only registered routes may be exposed as published. `answer`, `introduction[]`, `searchSections[]` and ordered `tocItems[]` are required resolved fields. FAQ content is presently represented in block tables, not a special FAQ schema.

`byId` is a derived record keyed by every block ID; authors do not maintain it separately. `searchSections` is also derived from blocks. `options[{value,label}]` must match the voicing IDs and inversion labels in the same order. Empty `introduction[]` is valid for A/C; A minor has two adapted introduction paragraphs. There is no implicit null substitution for missing strings or arrays.

### Fingering, practice, resources and evidence

Each current detail has exactly two `FingeringExample` records: `hand` is `right` or `left`; `voicingId` must equal the root/default voicing; `notes[]` must match its display pitches; `fingers[]` is currently right `1,3,5` and left `5,3,1`. `sourceIds[]` must resolve to complete `ChordSource` records. The only accepted status is `source_verified_with_octave_adaptation`; it explicitly means the source supports tones/fingers but not PianoGrid's chosen octave. Scope and limitation are required. Inversion fingerings are not supported.

`practice` currently supports one ID, `practice`, with heading, prompt and scope. The UI checks an unordered set of three pitch classes; order/octave/fingering/performance are outside its scoring scope. The rendered no-JS self-check remains available in the page block. A new question type or scoring mode requires code first.

Resources are current path/label pairs. A missing PDF must not produce a download action; this currently needs an adapter/template decision because the detail type declares `pdf` required. Staff notation is not implemented and has no authoring field. SEO enters through each page's raw `metadata` and adapter overrides, then Next route `generateMetadata`; do not author a second SEO source.

### Hub model

`CenterModel` requires title/metadata, ordered blocks, `items[]`, comparisons, practice links, filters, microcopy, white-key pitch classes and a PDF path. Each `CenterItem` requires `id,name,root,quality,url,voicing,tones,formula`. `url` is the intentional nullable field: `null` means the object is available in the hub but has no registered detail link. Current quality options are major/minor; root options preserve C♯/C♭/F♯/G♯/A♭/B♭ spelling. Filter defaults use nullable root/quality and a required selected chord ID. The item order is explicit in `getChordCenter()`; downstream must not alphabetize it. Comparisons reference resolved items, and the three practice links point to published detail anchors.

## Validation in the original repository

Run `node scripts/check-content-adapters.mjs` for adapter/validator integrity and `node scripts/check-chord-b3.mjs` for B3 content behavior. Broader project commands are recorded in the copied `package.json` and B3 result. This export intentionally did not rerun product checks.
