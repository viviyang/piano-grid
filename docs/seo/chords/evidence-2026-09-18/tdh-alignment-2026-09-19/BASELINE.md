# Git baseline — C-group name/TDH alignment 2026-09-19

Status: **BASELINE_BLOCKED**. Read-only scan and proposed copy only. No commit, merge, rebase, stash, checkout, reset, clean, push, or deploy.

## Current Git

| Item | Value |
|---|---|
| Worktree | `C:\Users\Admin\Documents\viviyang_github\pianogrid-final-integration` |
| Branch | `codex/final-integration` |
| HEAD | `6b95908` `Publish verified Chord family titles and a two-layer browse entry on /chords.` |
| `origin/codex/final-integration` | same as HEAD |
| `origin/main` | `5fa6cb6` `feat: align TDH on eight high-priority public pages` |
| Merge-base(HEAD, origin/main) | `6b95908` |
| Ahead / behind vs `origin/main` | **0 ahead, 1 behind** |
| Ancestor | HEAD is an ancestor of `origin/main`; `origin/main` is not an ancestor of HEAD |
| Staged | none |

Report snapshot values (`HEAD 6b95908`, `origin/main 5fa6cb6`) still match. They are not a request to rewind. Old `piano` / `codex/chords-b1` worktrees were not used.

## Why the apply gate is blocked

`origin/main` adds approved TDH for eight public pages in the same files this round would need for editorial Title/H1:

- `src/lib/seo-editorial.ts` — new `SEO_COPY` entries + `h2` maps + `editorialSectionHeading`
- `src/lib/chord-expansion-content.ts` — `applyEditorialChordCopy` for N1 detail pages

Writing C-group `SEO_COPY` on the current HEAD copy of `seo-editorial.ts`, then later integrating `5fa6cb6`, would collide in that file. This prompt does not authorize merge/rebase.

Uncommitted A/B engineering files do **not** currently overlap the upstream file list. The block is the missing upstream integration, not a dirty-file collision with A/B.

## origin/main files vs HEAD (upstream eight-page TDH)

```
M  docs/product-upgrade/b05-b07-v2/data/content.en.json
M  scripts/check-songs-sheet-browser.mjs
M  src/components/songs/center-experience.tsx
M  src/components/songs/pages.tsx
M  src/lib/chord-expansion-content.ts
M  src/lib/guide-content.ts
M  src/lib/keyboard-content.ts
M  src/lib/seo-editorial.ts
M  src/lib/song-content.ts
```

## Protected eight pages (from real upstream diff, not guessed)

| URL | This worktree (HEAD) Title / H1 | origin/main Title / H1 | C-group this round |
|---|---|---|---|
| `/chords/b-minor` | `B Minor Piano Chord (Bm): Notes, Inversions & PDF \| PianoGrid` / `B Minor Piano Chord` | `B Minor Chord – Piano Notes, Fingering & Inversions \| PianoGrid` / `B Minor Chord` | not written |
| `/chords/d-minor` | `D Minor Piano Chord (Dm): Notes, Inversions & PDF \| PianoGrid` / `D Minor Piano Chord` | `D Minor Chord – Piano Notes, Fingering & Inversions \| PianoGrid` / `D Minor Chord` | not written |
| `/chords/e-minor` | `E Minor Piano Chord (Em): Notes, Inversions & PDF \| PianoGrid` / `E Minor Piano Chord` | `E Minor Chord – Piano Notes, Fingering & Inversions \| PianoGrid` / `E Minor Chord` | not written |
| `/chords/g-minor` | `G Minor Piano Chord (Gm): Notes, Inversions & PDF \| PianoGrid` / `G Minor Piano Chord` | `G Minor Chord – Piano Notes, Fingering & Inversions \| PianoGrid` / `G Minor Chord` | not written |
| `/keyboard-notes/labeled` | `Labeled Piano Keys & Printable Practice Pack \| PianoGrid` / `Labeled Piano Keys` | `Piano Keyboard Keys Labeled – Note Names & Layout \| PianoGrid` / `Piano Keyboard Keys Labeled` | not written |
| `/songs` | `Piano Songs: Choose a Version to Practice \| PianoGrid` / `Piano Songs: Choose Your Next Piece` | `Piano Songs to Learn – Browse by Difficulty & Style \| PianoGrid` / `Piano Songs to Learn` | not written |
| `/songs/easy` | `Easy Piano Songs & a 10-Minute Practice Plan \| PianoGrid` / `Easy Piano Songs for Beginners` | `Easy Piano Songs for Beginners – Songs to Learn \| PianoGrid` / `Easy Piano Songs for Beginners` | not written |
| `/guide/read-sheet-music` | `How to Read Piano Sheet Music: Notes & Rhythm` (H1 from page content, no SEO_COPY.h1) | `How to Read Sheet Music for Piano – Beginner Guide \| PianoGrid` / `How to Read Sheet Music for Piano` | not written |

C-group did not edit these fields. After a later safe integration of `5fa6cb6`, the four minor details and four non-detail pages should keep the origin/main approved copy unless a later named review says otherwise.

## Dirty worktree (not reverted)

Tracked A/B leftovers remain dirty: chord browse/category components, `chord-family-browse.ts`, `scripts/audit-chord-routes.mjs`, screenshot/check JSON under `checks/`. Untracked items include this evidence library, scan/append scripts, `.next-s1-baseline/`, and deploy logs. None of those dirty tracked paths are in the origin/main file list above.

Intended C-group write targets if the gate were open: `src/lib/seo-editorial.ts` plus an N2C/N2B editorial mapping layer (N1 already gets `applyEditorialChordCopy` on origin/main). Those app files were **not** modified this round.

## Overlap if someone applied C-group on this baseline anyway

| Pair | Overlap |
|---|---|
| Dirty tracked ∩ origin/main files | empty |
| Intended C-group apply ∩ origin/main files | `src/lib/seo-editorial.ts` (and N1 wiring in `chord-expansion-content.ts` if reused) |
| Intended C-group apply ∩ current dirty tracked | empty |

Need: protect A/B uncommitted work, then integrate `5fa6cb6`, then apply the proposed table. This prompt does not do that.

## URL / index baseline (unchanged)

Registry still 206 public routes; chord module still 158 = 145 detail + 9 family + 4 structure. No URL, canonical, robots, or indexability edits in this round.
