# Handoff — B05 (recoverable, uncommitted)

## Apply on a clean copy of base `1ce0a1d`

1. Check out `codex/final-integration` at `1ce0a1d`.
2. Apply tracked changes: `git apply docs/product-upgrade/b05-b07-v2/delivery/b05/handoff/TRACKED.patch` (or copy from the dirty worktree).
3. Copy all paths listed in `NEW_FILES.txt` from the working tree (includes `docs/product-upgrade/b05-b07-v2/` pack + new src/scripts).
4. `npm ci` (or existing `node_modules`), then run the commands in `../TEST_REPORT.md`.

## Scope notes

- This is **not** a full git archive. Untracked pack + new source files are required alongside the patch.
- Exclude `.next/`, `node_modules/`, `.next-s1-baseline/`, deploy logs, secrets.
- Do not commit/push/deploy unless newly authorized.

## Integrity

Regenerate sha256 locally after copy if needed:

```text
Get-FileHash -Algorithm SHA256 <path>
```
