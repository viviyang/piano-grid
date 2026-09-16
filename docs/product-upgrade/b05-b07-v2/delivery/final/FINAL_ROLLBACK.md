# FINAL_ROLLBACK — B04–B07 CLOSEOUT

## If production must revert after a future authorized deploy

1. Redeploy the last known-good Vercel deployment **before** this batch’s release commit.
2. Or reset the release branch to pre-batch commit `1ce0a1d` and redeploy that artifact only with **explicit** authorization.
3. Teaching-pack PDFs and OG PNGs are static files — remove or replace with the prior asset set if needed.
4. Do **not** “hotfix” by expanding routes, installing analytics, or redesigning during rollback.

## Local recovery without resetting the user’s dirty worktree

1. Start from a **clean checkout** at `1ce0a1d` in a temporary directory (never `git reset --hard` / clean in the active dirty tree unless the user explicitly orders it).
2. Apply `delivery/final/clean-diff/TRACKED_vs_1ce0a1d.patch`.
3. Copy `delivery/final/clean-diff/new-files/**` onto the tree (paths relative to repo root).
4. Verify SHA256 against `delivery/final/clean-diff/NEW_FILES_SHA256.txt`.
5. Run:
   ```text
   npm run check:foundation
   npm run typecheck
   npm run build
   ```

## Scope exclusions on rollback/commit

Do not treat as release content:

- `scripts/debug-b06-*.mjs`
- `.next-s1-baseline/`
- unrelated deploy logs under `docs/product-upgrade/2026-09-16/release-closeout-delivery/deploy-*.log`
- unrelated dirty files outside the scoped path list in `clean-diff/pathspec.txt`

## B04 note

B04 Hear the Difference is already in base `1ce0a1d`. Rolling back only B05–B07 should leave B04 intact unless a broader revert to an earlier SHA is authorized.
