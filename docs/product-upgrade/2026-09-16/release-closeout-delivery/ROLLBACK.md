# ROLLBACK

## Safe restore sources (prefer in order)
1. `pre-rc-snapshot/` — files + `MANIFEST.json` + `BASE_SHA.txt` taken before RC edits.
2. `handoff/` current RC artifact + `MANIFEST.SHA256.json` (forward restore of RC scope).
3. `patches/RC_SCOPE.diff` — tracked-file patch only (does not include previously untracked B04 tree alone).

## Verified
- Restore dry-run of `handoff/` → temp dir hash match: `RESTORE_DRY_RUN.json` (`ok: true`).
- Did **not** `git reset` / rebase / checkout old HEAD on the working tree.

## Do not
- Overwrite current repo from old attachment evidence trees.
- Delete unrelated dirty Home/Songs/check files when rolling back RC only.
- Treat path lists alone as rollback proof without hash verify.
