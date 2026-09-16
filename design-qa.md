result: passed

# Keyboard Notes v2 Design QA — 2026-09-16 feedback pass

## Evidence

- Source visual truth: `C:/Users/Admin/AppData/Local/Temp/codex-clipboard-efbb42a1-daa2-4363-b37f-40eb1370e4b0.png`, `codex-clipboard-2fae0a1a-241d-4169-bb1b-b35d99b37a9b.png`, `codex-clipboard-da8d8673-4a64-4064-8184-6584d7741f79.png`, plus the confirmed package under `C:/Users/Admin/Documents/viviyang_github/piano/docs/design/keyboard-notes-v2/`.
- Rendered implementation: `http://localhost:3115/keyboard-notes?practice-sample=1`; inline Codex in-app-browser captures were inspected at Desktop 1440×1000 and Mobile 390×844, deviceScaleFactor 1.
- State coverage: Start, Question, Wrong, Results, Share bottom sheet.
- Full-view comparison: the earlier screenshots showed detached meta, excessive whitespace and an isolated note title; the revised captures show one continuous progress → task → keyboard → feedback hierarchy.
- Focused comparison: question header/title, progress bar, keyboard/feedback boundary and pre-result share cue were inspected at both widths. No separate image assets were introduced, so raster asset comparison was not applicable.

## Findings and comparison history

- [P1 fixed] Practice value was invisible until completion. Added a three-step “After the round” explanation on Start and a low-weight fresh-practice sharing cue on normal questions.
- [P1 fixed] Review/question headings were visually disconnected. Replaced the floating labels with a semantic question header, segmented progress and the complete heading “Find {note}”.
- [P2 fixed] Excessive top/bottom whitespace weakened the piano task. Reduced practice panel padding, keyboard offsets and feedback height while preserving 44px controls.
- [P2 fixed] The first CSS pass contained an invalid margin declaration. Corrected it, then confirmed production build and browser rendering.

## Required fidelity surfaces

- Fonts and typography: [已核实] project system stack and existing weights retained; full task heading is readable at both viewports.
- Spacing and layout rhythm: [已核实] Desktop and Mobile use the same hierarchy with responsive single-column stacking; 390px has no horizontal overflow.
- Colors and tokens: [已核实] only existing `--foreground`, `--muted-foreground`, `--primary`, `--border`, `--input` and piano tokens are used.
- Image quality and assets: [已核实] no new raster/vector asset; the existing real keyboard renderer remains the visual owner.
- Copy and content: [已核实] sharing language says “fresh practice” and explicitly excludes answers; it does not claim result sharing or completed B03 challenge serialization.
- Motion: [已核实] labeled S1 action controls reuse the homepage Hero `RollingText` owner for hover and keyboard focus; mode tabs remain static labels with selection underline, while piano keys and icon-only close controls remain semantically stable. Reduced-motion disables transitions through the existing page contract.

## Verification

- `npm run check`: passed.
- `npm run check:keyboard-completion`: 40/40 passed.
- `npm run build`: 210/210 static pages generated.
- Primary interactions tested: open Practice, start round, wrong answer, Try again hierarchy, complete ten revealed answers, open/close mobile Share dialog.

final result: passed
