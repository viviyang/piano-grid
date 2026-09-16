# FINAL_ROUTE_DIFF — B04–B07 CLOSEOUT

## Public business routes

| Metric | Value |
| --- | --- |
| Source | `src/lib/site-routes.ts` → `PUBLIC_ROUTES` |
| Sitemap | `src/app/sitemap.ts` maps every `PUBLIC_ROUTES` entry |
| Count at base `1ce0a1d` | **206** |
| Count on closeout worktree | **206** |
| Delta | **0** |
| Added public business routes | none |
| Removed public business routes | none |

## Batch route posture

| Batch | Route effect |
| --- | --- |
| B04 | `/tools/hear-the-difference` already present in base (query `pair`/`from`/`source` are activations, not sitemap entries) |
| B05 | Uses existing `/songs`, `/songs/easy`, three sheet edition URLs; plan via `?plan=` + `#first-10-minutes` |
| B06 | Uses existing `/keyboard-notes/labeled`; pack via `#teaching-pack` + paper/print query; PDFs under `/reference/generated/...` (static files, not HTML routes) |
| B07 | TDH/SEO/links only on existing URLs |

## Not routes (must not be mistaken for URL expansion)

- Query/hash: `plan=`, `plan-v=`, `paper=`, `printResource=`, `#first-10-minutes`, `#teaching-pack`, `#note-trainer`
- Static: `/assets/social/song-plan-og.png`, `/assets/social/teacher-pack-og.png`
- Static PDFs: `piano-key-names-c4-c5-{letter,a4}{,-worksheet}.pdf`

## Orphan check

No new `src/app/**/page.tsx` business routes were added in the B05–B07 dirty set beyond existing app tree. Closeout does not introduce orphan HTML routes.
