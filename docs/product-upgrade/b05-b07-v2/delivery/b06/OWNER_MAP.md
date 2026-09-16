# OWNER_MAP — B06 (extends B05)

| Concern | Owner path | Notes |
| --- | --- | --- |
| Teaching resource model | `src/lib/b06-teaching-pack.ts` | C4–C5 projection, assets, practice href |
| Teacher copy | `src/lib/b06-content.ts` | Aligned with pack `content.en.json` teacher |
| Teaching pack events | `src/lib/b06-events.ts` | Local CustomEvent; INSTRUMENTED_NOT_COLLECTED |
| Teaching pack UI + print | `src/components/keyboard-notes/teaching-pack.tsx` | Preview, download, print dialog, share |
| Teaching pack CSS | `src/components/keyboard-notes/teaching-pack.css` | `.pg-teaching-pack*`; portrait print isolated |
| Labeled composition | `src/components/keyboard-notes/labeled-experience.tsx` | Pack **outside** `.kn-screen` so print is not hidden |
| Share dialog | `share-control.tsx` + `share-dialog.css` | Reused; no personal state in resource URL |
| Practice preset | `src/lib/keyboard-practice.ts` | `natural-c4-c5` via builder |
| Tools printable | `integration-content.ts` + tools-content-data.json | New `key-name-pack` item (5 print cards) |
| PDF export | `scripts/export-teaching-pack-pdfs.mjs` | Playwright; use `localhost` not `127.0.0.1` |
| Foundation allowlist | `scripts/check-foundation.mjs` | teaching-pack + 4 PDFs |
| Site nav L1 | unchanged | |

## B05 owners retained
See `delivery/b05/OWNER_MAP.md` — songs/sheet/plan owners untouched this batch except shared ShareDialog reuse.
