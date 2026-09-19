# Git baseline — C-group name/TDH alignment 2026-09-19

Status: **PUBLISHED_VERIFIED** for this Task 11 copy publish only. Eight-page TDH from `5fa6cb6` remains integrated. Task 11 copy is in `bd3ba53` and live on `https://pianogrid.com`.

## Current Git

| Item | Value |
|---|---|
| Worktree | `C:\Users\Admin\Documents\viviyang_github\pianogrid-final-integration` |
| Branch | `codex/final-integration` |
| Apply HEAD | `bd3ba535378c1be6cca69f4afc5800e66331d0b7` `Apply same-entity chord labels on the integrated eight-page TDH baseline.` |
| Merge | `e00ae6e` `Merge approved eight-page TDH from 5fa6cb6 into codex/final-integration.` |
| Merge parents | `f80084b` + `5fa6cb6bd4a6d9bd13cdf483498870041b133b7f` |
| `origin/main` | `bd3ba53` (fast-forward `5fa6cb6..bd3ba53`) |
| `origin/codex/final-integration` | `bd3ba53` (fast-forward `6b95908..bd3ba53`) |
| Push | `git push origin HEAD` then `git push origin HEAD:main`. No force-push, reset, clean, rebase, or hook skip. |

Old `piano` / `codex/chords-b1` worktrees were not used.

## Protection and integration

Out-of-repo backup: `C:\Users\Admin\Documents\viviyang_github\_checkpoints\pianogrid-t11-unlock-2026-09-19T211500+0800`

| SHA | Role |
|---|---|
| `430579d` | Checkpoint 1: A/B chord browse + Task 11 evidence |
| `f80084b` | Checkpoint 2: leftover check screenshots so merge could proceed |
| `e00ae6e` | Local `--no-ff` merge of approved eight-page TDH only |
| `bd3ba53` | Task 11 apply; production Git SHA |

## Protected eight pages (live HTML 2026-09-19T14:16:45.297Z)

Live `https://pianogrid.com` Title/H1 still match the approved `5fa6cb6` values:

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

`PUBLIC_ROUTES` still equals `e00ae6e:src/lib/site-routes.ts`: **206** public routes; chord module **158** = 145 detail + 9 family + 4 structure. Live sitemap has the same 206 URLs, including `/chords/b-7` and `/chords/f-sharp-madd9`. Canonical paths still equal the route. Checked live pages still emit `index,follow`. `robots.txt` still allows `/` and points at `https://pianogrid.com/sitemap.xml`.

## Production mapping

| Layer | ID |
|---|---|
| Apply / production git | `bd3ba53` |
| Vercel project | `piano-grid` / `prj_BrqhsQv8NcmPj0G2YJJ8AV70865s` |
| This production deploy | `dpl_5T154PtaD8FjXUMPFpsQcdwwvhKP` Ready; target production; aliases `pianogrid.com` |
| Previous Ready production | `dpl_5oVjSPciHC6aS9erqth6kGBk29hq` |
