# PianoGrid Scales STEP 2 result

Final status: `PASS_WITH_NOTES`

## Scope and version

- [已核实] User authorization covered repair R01–R06, the repair gate, then the approved STEP 2 M01–M12 work for `/scales`, `/scales/c-major`, and `/scales/a-minor` in one turn.
- [已核实] HEAD remained `bdcc2e134b59c109fbdc7d78434474ddca8eb382`. The verified build used the dirty working tree; relevant file hashes are in `manifest.json`.
- [已核实] No commit, push, dependency installation, deployment, DNS/canonical/index-policy change, new URL, theme redesign, Chords restart, or unpublished-route enablement was performed.
- [已核实] The earlier sample is retained as historical evidence. `SCALES_REVIEW_AND_NEXT.md` classifies that version `NEEDS_FIX`; this report does not rewrite it as a pass.
- [已核实] The new work was tested only in local development and an isolated local production build. It has not been deployed to `https://pianogrid.com`.

## Repair gate R01–R06

| ID | Correction | Evidence | Status |
|---|---|---|---|
| R01 | Compatibility anchors are absolutely positioned; wide tables use named local scroll regions and a narrow-screen hint; 320 px buttons no longer inherit the 9 rem flex basis. | Production browser 1440/390/320/200%, layout metrics and screenshots. | PASS |
| R02 | Static reference PDF now has original vector treble/bass clefs, real written staff positions and ledger lines, actual MIDI keyboard ranges, separate hand pages, and both direction diagrams. | Letter/A4 124 checks plus rendered-page visual review. | PASS |
| R03 | Static Q1/Q2 answers and prompts follow the selected tonic/form/direction/hand/range; Q3 derives the selected key's natural sixth/seventh. | Data checks plus representative production-browser input. | PASS |
| R04 | Demo/practice share one session generation; print, settings, stop, page lifecycle, supersession and unmount cancel audio and UI timers together. | Production machine tests include beforeprint, stale-count prevention, demo/practice mutual exclusion and delayed-resolution cancellation. | PASS |
| R05 | Audio is requested from the initiating click before count-in; metronome covers count-in; UI timing uses the actual audio start origin; delayed/rejected/unsupported paths have explicit recovery. | Production fake-audio timing/permission tests and real Web Audio regression scheduling. Human listening remains NOT_RUN. | PASS |
| R06 | Compatibility anchors include center `#fingering` and A-minor `#practice`; page-wide source cards show support, locator and source ID, including AC-03. | DOM/source-count/anchor checks and raw HTML/no-JS captures. | PASS |

[已核实] Repair gate: `npm run check` PASS; Scales data 621/621; focused data/contract 670/670; production R01–R06/V09/V10 51/51; production Scales regression 338/338; PDF 124/124; isolated production build PASS.

## STEP 2 M01–M12

| Item | Delivered | Status |
|---|---|---|
| M01 | 60-object center catalog, C/A fixed details and object/setting/task separation. | PASS |
| M02 | Existing blocks, tables and full copy retained in the two fixed templates; FAQ, relationships and next steps rendered. | PASS |
| M03 | One parsed option model drives note text, MIDI, staff, keyboard, playback and print. | PASS |
| M04 | C rows and A ascending rows preserved; A-natural descent is source scoped; A harmonic/melodic descent remains `null`. | PASS |
| M05 | Note-set, ordered-octave and classical-descent questions use model-derived answers. | PASS |
| M06 | One-octave single-hand practice supports 40–120 BPM, 1/2 notes per beat, four-beat count-in, 1/2/4 passes, pause/stop and self-reporting. | PASS |
| M07 | C/A hands are separately labeled with their own registers and fingering scope; no two-hand playback claim. | PASS |
| M08 | Current-result print plus two original downloadable PDFs; static answers remain in no-JS HTML. | PASS_WITH_NOTES |
| M09 | Current links, metadata and compatibility anchors verified; no unpublished route enabled. | PASS |
| M10 | All 26 original records and complete 23 unpublished records, sources/issues and special cases retained in this package. | PASS |
| M11 | Theme reuse, responsive layout, keyboard input, reduced motion, no-JS, cancellation/failure and local print output checked. | PASS_WITH_NOTES |
| M12 | Raw author input, TS types, runtime validator, adapter, safe dry-run importer, examples and commands delivered. | PASS |

## Verification V01–V14

- `PASS`: V01–V10, V12–V14. Counts are 60 objects, 240 one-way choices, 120 up/down choices, Q1 120, Q2 240, Q3 15 and practice 360. Edge fixtures cover 5/6/8/12/15 events and E-sharp/B-sharp/C-flat/double-sharp written-octave boundaries.
- `PASS_WITH_NOTES`: V11. Generated Letter/A4 PDFs and browser print outputs open and were visually inspected; native Ctrl+P dialog cancellation and physical paper output are not machine-claimed.
- `NOT_RUN`: human listening, physical-device testing, screen-reader session, physical printing, PDF tag/accessibility review, specialist engraving review and named piano-teacher review.

## Current limits and blockers

- [已核实] Runtime authoring supports only templates T11/T12 and forms major, natural minor, harmonic minor and classical melodic minor. T13/T14 and the 23 retained records are planning/content inputs, not implemented render contracts or published routes.
- [已核实] Practice is one octave and one hand. It does not listen through MIDI/microphone, score performance, synchronize two hands, or infer missing fingering.
- [已核实] `audio_assets: null` means no authored audio binary; current tones are synthesized at runtime. A fingering `null` means unsupported for that exact scope. It must not be filled by reversing or borrowing another row.
- [已核实] No critical software/data/PDF blocker remains for the next Scales planning conversation. The NOT_RUN human gates above remain explicit release-quality limitations, not claimed passes.
