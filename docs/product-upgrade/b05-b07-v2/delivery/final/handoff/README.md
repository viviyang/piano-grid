# HANDOFF README

- Base commit: `1ce0a1d`
- Branch: `codex/final-integration`
- `TRACKED.patch` — git diff of tracked paths vs base
- `new-files/` — untracked product files + product-upgrade pack (excludes `delivery/final` recursion, `.next*`, deploy logs)
- `MANIFEST.json` — sha256 per file

Restore on a clean `1ce0a1d` tree only. Do not reset the live dirty worktree.
