# FINAL_SEO_DIFF — B04–B07 CLOSEOUT

Authority: `docs/product-upgrade/b05-b07-v2/data/page-seo.json`  
Owners: `src/lib/seo-editorial.ts`, `src/lib/b07-content.ts`, page metadata exporters  
Live verify: `closeout-logs/seo-live.json` — **11/11 PASS** (title, description, H1, canonical, robots)

## Indexing policy

- In-scope pages emit `robots: { index: true, follow: true }`
- Site `robots.ts` allows `/` and points sitemap to `${SITE_ORIGIN}/sitemap.xml`
- No closeout change to `noindex`

## Canonical / OG assets

| URL | Canonical | OG notes |
| --- | --- | --- |
| `/songs` | `https://pianogrid.com/songs` | default |
| `/songs/easy` | `https://pianogrid.com/songs/easy` | OG card `/assets/social/song-plan-og.png` |
| `/sheet-music` | `https://pianogrid.com/sheet-music` | B07 TDH/lead |
| `/sheet-music/easy` | `https://pianogrid.com/sheet-music/easy` | B07 TDH/lead |
| `/sheet-music/beginner` | `https://pianogrid.com/sheet-music/beginner` | B07 TDH/lead |
| `/sheet-music/twinkle-twinkle-little-star` | matching pianogrid.com URL | B05 access + B07 confirm |
| `/sheet-music/hot-cross-buns` | matching pianogrid.com URL | B05 access + B07 confirm |
| `/sheet-music/ode-to-joy` | matching pianogrid.com URL | B05 access + B07 confirm |
| `/keyboard-notes/labeled` | `https://pianogrid.com/keyboard-notes/labeled` | OG `/assets/social/teacher-pack-og.png` |
| `/tools` | `https://pianogrid.com/tools` | B07 TDH/lead |
| `/keyboard-notes` | `https://pianogrid.com/keyboard-notes` | guard_only / confirm |

## Heading strategy

- H1/lead synced to `page-seo.json`
- Sheet hubs inject B07 intent sections (`ss-b07-intent`) while preserving existing catalog/filters below
- Easy songs / plan / teaching pack keep B05/B06 visible structure; metadata aligned

## Internal links

`check-b07-links.mjs` PASS (L01–L18 path/hash/mode + HEAD + assets + cold share).

## Events

Status remains **INSTRUMENTED_NOT_COLLECTED** (CustomEvent owners present; no unauthorized collector). See `delivery/b07/EVENT_STATUS.md`.
