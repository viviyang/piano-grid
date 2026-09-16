# B04 RESULT — Hear the Difference

Status: `COMPLETE_AWAITING_INDEPENDENT_REVIEW`  
Date: `2026-09-16`  
Branch: `codex/final-integration`  
Worktree: `pianogrid-final-integration`  
Baseline: B02/B03 Keyboard Notes at `c9651ba` (not reverted)

## Done

- Added canonical route `/tools/hear-the-difference` with query state `pair` / `from` / `source` (canonical always base path).
- Single-primary `Play comparison` sequence (Chord 1 → gap → Chord 2); answers disabled until comparison completes.
- Wrong → Replay / Hint / Show answer without leaking middle/outer-note answer on first miss.
- Hint and assisted reveal (`Answer revealed`) vs correct (`You found it`).
- Curated A/C/D/E pairs all minor → major, root-position close voicing, +1 semitone on the third.
- Shared `KeyboardDiagram` extended with compare roles (`common` / `source` / `target`); no second keyboard engine.
- Audio via existing `ReferenceAudio` owner with stop/retrigger, visibility interrupt, error panel + Retry.
- Share reuses B03 helpers; URL restores pair only; OG uses non-spoiler title/description/image.
- Tools nav direct entry, `/tools` hub card, homepage teaser CTA, A/C/D/E chord inbound links, `/chords` + guide links.
- Analytics local CustomEvent owner (`ANALYTICS_NOT_CONFIGURED`), matching B03.

## Adaptations recorded

- A major detail default voicing is an octave higher than B04 listening register; B04 builds curated listening pitches while reusing chord IDs/URLs/spellings.
- E major center chart uses a lower octave than B04; listening pitches follow B04 / detail-compatible E4 register.
- Pair data is server-built and passed into the client so `node:fs` chord adapters never enter the browser bundle.

## Not done

- No commit / push / deploy.
- No B05+.
- No Listen & Practice nav group.
- No account, leaderboard, MIDI, microphone, or external analytics.

## Evidence

- Checks / screenshots: `checks/product-upgrade-2026-09-15/b04-hear-the-difference/`
- Intake: `docs/product-upgrade/2026-09-15/b04-hear-the-difference/`
