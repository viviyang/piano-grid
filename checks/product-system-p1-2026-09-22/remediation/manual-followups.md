# Manual follow-up — `/chords`

Recorded 2026-09-22 from user verification on `http://localhost:4354/chords`.

## Confirmed navigation entries

- The “知道音符时去 Finder” entry is **Find a chord from notes**, in the `/chords` page's **Continue from this reference** area. Target: `/chords/finder`.
- The C-major context entry is **Explore chords in C major**, in the same continuation area. Target: `/chords/by-key#c-major`.

## User-reported issue to fix together after testing

- With the `/chords` library filter at its default **Any family**, results are present.
- Selecting the visible family options such as **Triad** or **Seventh** shows **0 matching references**.
- The user asked to record this first and defer the fix until the remaining manual testing is complete.

Initial code observation, not yet a completed diagnosis: `src/components/chords/library-index.tsx` stores the raw family value in React state, but renders the visible family label as the implicit `<option>` value. The displayed value (`Triad`, `Seventh`) may therefore differ from the data value (`triad`, `seventh`). Confirm with the remaining test cases before changing it.

Do not mark this issue fixed from this note alone. Reproduce each family, record expected/actual counts, then patch and regression-test the filter.
