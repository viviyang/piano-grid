# ROLLBACK

## Safe rollback of this fix pass only

1. Restore modified owners from git / prior stash for:
   - `src/components/keyboard-notes/keyboard-notes-workspace.tsx`
   - `src/components/keyboard-notes/share-control.tsx`
   - `src/components/keyboard-notes/labeled-experience.tsx`
   - `src/components/keyboard-notes/keyboard-notes.css`
   - `src/components/keyboard-notes/keyboard-notes-v2.css`
   - `src/components/hear-the-difference/*`
   - `src/lib/keyboard-practice.ts`
   - `src/lib/keyboard-viewport.ts` (delete if rolling back fully)
   - related check scripts
2. Do **not** `git reset --hard` over the whole worktree — B04 and other dirty files would be lost.
3. Do **not** copy `integration-fix/evidence/source-snapshots/` onto `src/`.

## Handoff recovery

`handoff/FULL.diff` (SHA256 `75408527CFFB89571C504947729D0A1B2B17754ABFCC9FD39AE0EDB5ABE04837`) captures the fix-pass business diff for the listed owners.
