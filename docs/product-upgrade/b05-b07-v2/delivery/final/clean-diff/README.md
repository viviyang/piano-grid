# Clean diff index — B04–B07 closeout

Base: `1ce0a1d`  
Generated: 2026-09-16

## Contents

| File | Purpose |
| --- | --- |
| `pathspec.txt` | Scoped release paths |
| `TRACKED_vs_1ce0a1d.patch` | Binary-capable tracked diff vs base |
| `TRACKED_stat.txt` | Diffstat (19 tracked files, +194/−54) |
| `UNTRACKED_files.txt` | 32 new product/check/asset files to add |
| `STATUS_scoped.txt` | `git status --short` for scoped paths |
| `NEW_FILES_SHA256.txt` | SHA256 of copied untracked tree |
| `new-files/` | Recoverable copy of untracked product files |

## Apply (temporary clone only)

```text
git checkout 1ce0a1d
git apply --index delivery/final/clean-diff/TRACKED_vs_1ce0a1d.patch
# then copy new-files/** → repo root
```

Do not experiment with reset/clean in the user’s active dirty worktree.
