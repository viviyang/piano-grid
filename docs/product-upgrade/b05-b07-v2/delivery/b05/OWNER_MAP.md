# OWNER_MAP — B05

| Concern | Owner path | Notes |
| --- | --- | --- |
| Edition adapter | `src/lib/b05-editions.ts` | Maps pack keys → existing arrangement IDs; no second registry |
| Plan URL / session | `src/lib/b05-plan.ts` | `plan` + `plan-v` whitelist; sessionStorage local only |
| B05 English copy | `src/lib/b05-content.ts` + `docs/product-upgrade/b05-b07-v2/data/content.en.json` | Implementation copy authority for B05 UI |
| Plan events | `src/lib/b05-events.ts` | Local CustomEvent only; `INSTRUMENTED_NOT_COLLECTED` |
| Songs pages | `src/components/songs/pages.tsx` | Center + Easy composition |
| Edition cards | `src/components/songs/edition-cards.tsx` | Three beginner cards |
| Practice plan UI | `src/components/songs/practice-plan.tsx` | 5-step external guided plan |
| Plan CSS | `src/components/songs/song-plan.css` | B05 layout tokens via CSS variables |
| Sheet access UI | `src/components/sheet-music/edition-access.tsx` | Version/access on three detail pages |
| Provider open | `src/components/sheet-music/provider-open-link.tsx` | Hoffman allowlisted HTTPS |
| Share dialog | `src/components/keyboard-notes/share-control.tsx` + `share-dialog.css` | Reused ShareDialog; print hide added |
| Arrangement cards / focus | `src/components/songs-sheet/*` | Existing LaunchVersions retained under B05 cards |
| Catalog / gates | `src/lib/songs-sheet-content.ts`, `songs-sheet-contracts.ts` | Unchanged authority |
| SEO / TDH | `src/lib/seo-editorial.ts` | B05 titles/descriptions/h1 + easy OG |
| Easy searchParams | `src/app/songs/easy/page.tsx` | Awaits `searchParams` for shared plan |
| Foundation allowlist | `scripts/check-foundation.mjs` | New components + share-dialog.css + labeled collapsible |
| Site nav L1 | `src/lib/site-routes.ts` / `site-navigation.tsx` | **Unchanged** — L01 already present |
