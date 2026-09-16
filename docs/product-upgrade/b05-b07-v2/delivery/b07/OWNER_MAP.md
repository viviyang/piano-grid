# OWNER_MAP — B07 (extends B05 + B06)

| Concern | Owner path | Notes |
| --- | --- | --- |
| Page SEO TDH overrides | `src/lib/seo-editorial.ts` | Titles/descriptions/H1 + static OG for easy + labeled |
| Page-seo lead reader | `src/lib/b07-content.ts` | Reads `data/page-seo.json` |
| Sheet hub intent sections | `src/components/sheet-music/pages.tsx` | `SheetHubIntent` + L11–L13 CTAs |
| Tools TDH source | `docs/content/.../tools-content-data.json` | title/description/intro; group H2 names kept |
| Tools printable CTA text | `src/components/integration/pages.tsx` | Primary link uses resource label (L16) |
| Labeled lead + L18 | `src/components/keyboard-notes/pages.tsx`, `labeled-experience.tsx` | |
| OG assets | `public/assets/social/song-plan-og.png`, `teacher-pack-og.png` | 1200×630 |
| Link/head/event/browser scripts | `scripts/check-b07-*.mjs` | Playwright via `PIANO_PLAYWRIGHT_PATH` or Codex runtime path |
| Events | `b05-events.ts` / `b06-events.ts` | INSTRUMENTED_NOT_COLLECTED |
| Foundation allowlist | `scripts/check-foundation.mjs` | OG assets + teaching PDFs |
| Site nav L1 | unchanged | |

## Prior owners retained
See `delivery/b05/OWNER_MAP.md` and `delivery/b06/OWNER_MAP.md`.
