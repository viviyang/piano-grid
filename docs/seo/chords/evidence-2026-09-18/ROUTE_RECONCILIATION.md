# Chord route reconciliation

Date recorded: 2026-09-18. Worktree: `pianogrid-final-integration` / `codex/final-integration`. Unique key: current repository canonical path from `PUBLIC_ROUTES`.

This file counts **routes**. Extended 108 and Altered 96 are embedded reference objects on family pages, not independent URLs.

| Set | Meaning | unique_count |
|---|---|---:|
| A | All Chord module URLs (`/chords`, `/chords/*`, `/chord-progressions`) | 158 |
| B | Family URLs | 9 |
| C | Detail URLs | 145 |
| D | Hub / finder / by-key / progressions | 4 |
| E | Original URL-plan mapped **detail** URLs (unique path) | 9 |
| F | 138-pack pending **detail** URLs | 137 |
| 138 CSV | Pack rows (137 details + Seventh family) | 138 |
| PUBLIC_ROUTES total | Whole site, not only chords | 206 |

A = B + C + D = 9 + 145 + 4 = 158.

## Why 145, 138, 9, and 146 disagreed

- C is **145** detail routes. That is the current unique detail URL count; it is not fixed to an old 145 if the inventory later changes, but it is 145 in this snapshot.
- E is **9** unique original-plan **detail** URLs. Original keyword file has **41** keyword **rows** for those same URLs (repeat counting). Hub/tools add more keyword rows: **176** chord-module keyword rows across **13** unique URLs.
- F is **137** details from the 138 pack. The pack also includes `/chords/seventh`, so CSV unique URLs = 138.
- Adding 137 + 9 as disjoint sets produced 146. They are not disjoint: E ∩ F = 1 URL (`/chords/g-major` is in the original plan **and** in the 138 pending set because its original volume was null/UNKNOWN).
- 137 + 9 - 1 overlap = 145, which matches C = 145.
- UNKNOWN/NO_DATA in the 2026-09-17 audit summary was 140 because it mixed 137 pending details + `/chords/seventh` + `/chords/major` + `/chords/minor` family pages. That is not a third detail count.

## Set diffs

### E ∩ F (1)

- /chords/g-major

### C - (E ∪ F) (0)

- none

### E - C (0)

- none

### F - C (0)

- none

## 138 CSV vs current repository

URLs in the 138 CSV that are not current Chord-module routes: none.

URLs in the 138 CSV that are not detail routes: /chords/seventh.

## Chord-module URLs outside the 138 evidence pack

- /chord-progressions
- /chords
- /chords/a-flat-major
- /chords/a-major
- /chords/a-minor
- /chords/add
- /chords/altered
- /chords/augmented
- /chords/b-major
- /chords/by-key
- /chords/c-flat-major
- /chords/c-major
- /chords/c-minor
- /chords/diminished
- /chords/e-major
- /chords/extended
- /chords/finder
- /chords/major
- /chords/minor
- /chords/suspended

These pages were not part of the 137-detail + Seventh screenshot pass. Absence from the pack is not a volume of 0.

## Object counts are not URL counts

- Extended family page hosts 108 embedded reference objects; Altered hosts 96. Both remain **one URL each**.
- Major family grid cards are 12 independent pages; `/chords/c-flat-major` is an extra written-spelling detail, so Major details = 13.
