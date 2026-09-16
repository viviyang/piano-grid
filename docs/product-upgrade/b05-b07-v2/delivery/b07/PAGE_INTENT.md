# PAGE_INTENT — B07 T10 freeze

Source of truth: `data/page-seo.json` + `B07/02_PAGE_TDH_MAP.md`.  
Frozen against live registry: `PUBLIC_ROUTES` count **206**, delta vs `1ce0a1d` **0**.

| URL | Intent | Batch | Mode | Canonical | Notes |
| --- | --- | --- | --- | --- | --- |
| `/songs` | piano songs | b05 | APPLY_WHEN_FEATURE_PRESENT | https://pianogrid.com/songs | Full catalogue + beginner teaser; not merged with easy |
| `/songs/easy` | easy / beginner piano songs | b05 | APPLY_WHEN_FEATURE_PRESENT | https://pianogrid.com/songs/easy | Three editions + Twinkle 10-min plan |
| `/sheet-music` | piano sheet music | b07 | APPLY_WHEN_FEATURE_PRESENT | https://pianogrid.com/sheet-music | Hub: find edition / access before print |
| `/sheet-music/easy` | easy piano sheet music | b07 | APPLY_WHEN_FEATURE_PRESENT | https://pianogrid.com/sheet-music/easy | Distinct from beginner; keep filters |
| `/sheet-music/beginner` | beginner piano sheet music | b07 | APPLY_WHEN_FEATURE_PRESENT | https://pianogrid.com/sheet-music/beginner | Distinct from easy; Twinkle plan link contextual |
| `/sheet-music/twinkle-twinkle-little-star` | twinkle sheet music | b05 | APPLY_WHEN_FEATURE_PRESENT | https://pianogrid.com/sheet-music/twinkle-twinkle-little-star | Edition + plan CTA |
| `/sheet-music/hot-cross-buns` | hot cross buns sheet | b05 | APPLY_WHEN_FEATURE_PRESENT | https://pianogrid.com/sheet-music/hot-cross-buns | Lesson 1 materials / access |
| `/sheet-music/ode-to-joy` | ode to joy sheet | b05 | APPLY_WHEN_FEATURE_PRESENT | https://pianogrid.com/sheet-music/ode-to-joy | Early Elementary access |
| `/keyboard-notes/labeled` | labeled keys / worksheet | b06 | APPLY_WHEN_FEATURE_PRESENT | https://pianogrid.com/keyboard-notes/labeled | Teaching pack additive; no new route |
| `/tools` | piano tools / printables | b07 | APPLY_WHEN_FEATURE_PRESENT | https://pianogrid.com/tools | Discover tools + printables (5 incl. key-name-pack) |
| `/keyboard-notes` | piano keys / notes | guard_only | KEEP_IF_ALREADY_ACCURATE | https://pianogrid.com/keyboard-notes | Anti-regression only; do not redesign |

## Frozen product rules
- **New primary paths this batch:** 0  
- **Do not merge** `/songs` ↔ `/songs/easy` or `/sheet-music/easy` ↔ `/sheet-music/beginner`  
- **L1 nav:** unchanged (Songs / Sheet Music / Piano Notes / Tools)  
- **B04 surfaces** (hear-the-difference, practice share, chords/scales interactions): preserve  
- **PDF / hash / query:** not business routes; not XML sitemap entries  

## T10 doneWhen
- [x] Zero new business routes vs base HEAD  
- [x] Old B04 paths remain in `PUBLIC_ROUTES` / sitemap set  
- [x] In-scope intents frozen for T11–T14  
