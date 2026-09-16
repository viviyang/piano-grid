# FIX_MATRIX

| ID | Current status before fix | Fix owners (file) | Test evidence | Screenshot | Final |
| --- | --- | --- | --- | --- | --- |
| F01 | STILL PRESENT — shared start ignored option edits | `keyboard-practice.ts` (`resolveStartPreset`), `keyboard-notes-workspace.tsx` PracticeNotes | unit K01/K02; acceptance K02; practice browser shared start | `shared-landing-1440.png`, `shared-custom-1440.png` | FIXED |
| F02 | STILL PRESENT — `keyPattern` first letter | `practiceGeometryHint` / `practiceWrongFeedback` in `keyboard-practice.ts`; workspace feedback | unit black-key hints; acceptance K06 | `black-key-hint-1440.png` | FIXED |
| F03 | STILL PRESENT — Explore stop always play; Next no cancel | workspace Explore `toggleHear` + Practice `nextQuestion` cancel; B04 Stop comparison | practice browser; B04 browser stop/replay path | (flow covered in regressions) | FIXED |
| F04 | STILL PRESENT — leave cleared `savedResult` | `returnToResults` / `discardRound`; dialog Keep practicing primary | acceptance K10; practice browser review score retained | `exit-dialog-1440.png` | FIXED |
| F05 | STILL PRESENT — divergent share UI + spelling drop | `share-control.tsx` ShareDialog/Panel; Explore uses `resolution.selected` | unit Bb3 share; practice copy denial textarea; B04 share | share screenshots under b02-b03 / b04 | FIXED |
| F06 | STILL PRESENT — large centered receiver | compact `.kn-v2-receiver-note` + “Shared practice · 10 notes” | acceptance V01/V02; practice receiver | `shared-landing-1440.png`, `shared-landing-390.png` | FIXED |
| F07 | STILL PRESENT — segmented dump / dual toolbars | `labeled-experience.tsx` + `keyboard-viewport.ts` | unit F07 segments; acceptance V03; practice labeled overview=61 | `labeled-toolbar-1440.png`, `labeled-toolbar-390.png` | FIXED |
| F08 | STILL PRESENT — landing spoiler copy | B04 `experience.tsx` details + muted more copy | B04 browser landing spoiler; acceptance H01 | `b04-landing-nospoiler-1440.png` | FIXED |
| F09 | STILL PRESENT — weak common labels | shared role CSS in `keyboard-notes.css`; legend in reveal | B04 reveal screenshots | b04 `reveal` shots | FIXED |
| F10 | STILL PRESENT — DOM-injected error fixture | `__hearForceAudioError` in `use-comparison-audio.ts`; browser Retry | acceptance A05; B04 desktop audio-error | `b04-audio-error-1440.png` | FIXED |
| F11 | OPEN REQUIREMENT | same-tree dual regressions + handoff | practice 79/79; B04 55/55; unit 6/6; acceptance 13/13 | this delivery | DONE |
| F12 | STILL PRESENT (docs) | `B04_ROUTE_PLAN.md` wording | doc review; route delta 0 | n/a | FIXED |

## Notes

- Probe P01–P05 were historical isolations; fixed behavior is validated by new unit/acceptance, not by re-running failing probes as pass criteria.
- Practical-tools route count updated 205→206 to match already-shipped B04 `/tools/hear-the-difference`.
