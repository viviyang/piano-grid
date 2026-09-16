# B04 Intake

Date: 2026-09-16  
Worktree: `C:\Users\Admin\Documents\viviyang_github\pianogrid-final-integration`  
Branch: `codex/final-integration`  
HEAD: `c9651ba` (`feat(keyboard-notes): ship practice and challenge flow`)  
Design authority: B04 v2 pack (`PianoGrid_B04_One_Note_Design_v2`)  
Prior product code: B02/B03 Keyboard Notes handoff (same worktree; do not revert)

## Confirmed facts

1. Canonical B04 route does not exist yet. Only `/tools` and `/tools/blank-sheet-music` exist under Tools.
2. Homepage already has the “Change one note. Hear the difference.” discovery section with `HomeChordDiscovery`, currently CTA → `/chords/a-minor`.
3. Shared keyboard owner for interactive state is `KeyboardDiagram` (`src/components/keyboard-notes/keyboard-diagram.tsx`) with selected / wrong / correct / revealed / sounding / marked. No compare roles yet.
4. Audio owner is `ReferenceAudio` (`src/lib/a-minor-audio.ts`) with stop/retrigger, status, sounding MIDI, visibility cancel. Used by chords, homepage, keyboard notes via wrappers.
5. B03 share helpers live in `share-control.tsx`: `buildShareURL`, `copyShareURL`, `openNativeShare`.
6. Analytics for keyboard practice is local CustomEvent / `ANALYTICS_NOT_CONFIGURED`. Chord events use `emitChordEvent`. No external analytics provider.
7. Sitemap is derived from `PUBLIC_ROUTES`. Adding the base route is sufficient for sitemap.
8. Foundation / integration checks whitelist authorized pages, components, and selected routes. New B04 files must be allowlisted.

## Conflicts / minimal adaptations

| Topic | Design | Repo fact | Adaptation |
| --- | --- | --- | --- |
| A major register | A3–C♯4–E4 | Detail default is A4–C♯5–E5; center chart uses A3–C♯4–E4 | Build B04 comparison voicing from curated listening register; reuse chord IDs/URLs/spellings from library |
| E major register | E4–G♯4–B4 | Center chart uses E3–G♯3–B3; detail root matches E4… | Prefer detail/root listening pitches that match B04; document center chart difference |
| Tools hub counts | Add Hear the Difference | `practiceLinks.length === 4` hard assert | Add one practice task and update assert to 5 |
| Nav group | Direct Tools entry, no Listen & Practice group | Tools children are flat | Append one Tools child only |
| Analytics events | `one_note_*` list | No transport configured | Mirror B03: local CustomEvent owner, no external send |
| Prototype audio | oscillator in HTML | Forbidden in production | Use `ReferenceAudio` only |

## Scope lock

- Implement only B04.
- Do not push, deploy, commit, or start B05+.
- Do not create a second keyboard/chord/audio/share engine.
