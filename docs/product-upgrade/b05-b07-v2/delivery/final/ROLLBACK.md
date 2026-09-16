# ROLLBACK

## If production must revert after a future authorized deploy
1. Redeploy the last known-good Vercel deployment before this batch’s commit.
2. Or reset the release branch to pre-batch commit `1ce0a1d` and redeploy that artifact only with explicit authorization.
3. Teaching-pack PDFs and OG PNGs are static files — remove or replace with prior asset set if needed.
4. Do not “hotfix” by expanding routes or installing analytics during rollback.

## Local recovery without git reset of the user tree
1. Start from clean checkout at `1ce0a1d`.
2. Apply `delivery/final/handoff/TRACKED.patch`.
3. Copy `delivery/final/handoff/new-files/**` onto the tree.
4. Verify file SHA256 against `handoff/MANIFEST.json`.
5. Run `npm run check:foundation && npm run typecheck && npm run build`.

Do **not** experiment with `git reset --hard` / clean in the user’s active dirty worktree.
