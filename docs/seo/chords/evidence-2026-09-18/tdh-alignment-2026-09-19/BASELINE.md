# Git baseline — C-group name/TDH alignment 2026-09-19

Status: **APPLIED_LOCAL_TESTED_NOT_PUBLISHED**. Eight-page TDH from `5fa6cb6` is integrated. Task 11 copy is applied in the working tree only. No Task 11 final commit, push, or deploy.

## Current Git

| Item | Value |
|---|---|
| Worktree | `C:\Users\Admin\Documents\viviyang_github\pianogrid-final-integration` |
| Branch | `codex/final-integration` |
| HEAD | `e00ae6e` `Merge approved eight-page TDH from 5fa6cb6 into codex/final-integration.` |
| Merge parents | `f80084b` + `5fa6cb6bd4a6d9bd13cdf483498870041b133b7f` |
| `origin/main` | `5fa6cb6bd4a6d9bd13cdf483498870041b133b7f` `feat: align TDH on eight high-priority public pages` |
| Merge-base(HEAD, origin/main) | `5fa6cb6` — origin/main is now an ancestor of HEAD |
| Ahead / behind vs `origin/main` | **2 checkpoint commits + 1 merge** on this branch; Task 11 copy still uncommitted |
| `origin/codex/final-integration` | branch is ahead 4; not pushed this round |

Old `piano` / `codex/chords-b1` worktrees were not used. No reset, clean, rebase, autostash, push, or deploy.

## Protection and integration (this unlock round)

Out-of-repo backup: `C:\Users\Admin\Documents\viviyang_github\_checkpoints\pianogrid-t11-unlock-2026-09-19T211500+0800`

| SHA | Role |
|---|---|
| `430579d` | Checkpoint 1: A/B chord browse + Task 11 evidence |
| `f80084b` | Checkpoint 2: leftover check screenshots so merge could proceed |
| `e00ae6e` | Local `--no-ff` merge of approved eight-page TDH only. No Task 11 copy. |

`git fetch origin` after merge still showed `origin/main` exactly `5fa6cb6`. No extra upstream commits were pulled in.

## Protected eight pages (from real upstream diff, verified after merge + Task 11 apply)

Local production HTML at `http://127.0.0.1:3128` matches the approved `5fa6cb6` Title/H1:

| URL | Title | H1 |
|---|---|---|
| `/chords/b-minor` | `B Minor Chord – Piano Notes, Fingering & Inversions \| PianoGrid` | `B Minor Chord` |
| `/chords/d-minor` | `D Minor Chord – Piano Notes, Fingering & Inversions \| PianoGrid` | `D Minor Chord` |
| `/chords/e-minor` | `E Minor Chord – Piano Notes, Fingering & Inversions \| PianoGrid` | `E Minor Chord` |
| `/chords/g-minor` | `G Minor Chord – Piano Notes, Fingering & Inversions \| PianoGrid` | `G Minor Chord` |
| `/keyboard-notes/labeled` | `Piano Keyboard Keys Labeled – Note Names & Layout \| PianoGrid` | `Piano Keyboard Keys Labeled` |
| `/songs` | `Piano Songs to Learn – Browse by Difficulty & Style \| PianoGrid` | `Piano Songs to Learn` |
| `/songs/easy` | `Easy Piano Songs for Beginners – Songs to Learn \| PianoGrid` | `Easy Piano Songs for Beginners` |
| `/guide/read-sheet-music` | `How to Read Sheet Music for Piano – Beginner Guide \| PianoGrid` | `How to Read Sheet Music for Piano` |

Task 11 `CHORD_DETAIL_SEO_COPY` is spread first in `SEO_COPY`; these eight explicit keys still win.

## URL / index baseline (unchanged)

Working-tree `PUBLIC_ROUTES` equals `e00ae6e:src/lib/site-routes.ts`: **206** public routes; chord module **158** = 145 detail + 9 family + 4 structure. No URL added, removed, or replaced. Canonical paths still equal the route. Robots still `index,follow` on checked pages.
