# B04 Owner Map

| Concern | Owner | Path | Notes |
| --- | --- | --- | --- |
| Homepage one-note section | Integration homepage | `src/components/integration/pages.tsx` + `home-experience.tsx` | Keep discovery UI; upgrade CTA to B04 |
| Tools nav | `SITE_NAVIGATION` | `src/lib/site-routes.ts` + `site-navigation.tsx` | Add direct Tools child |
| Tools hub | Practical Tools model | `integration-content.ts` + `tools-content-data.json` + `pages.tsx` | Add Practice group card |
| Major/minor detail template | Chord detail | `chord-content.ts` + `detail-page.tsx` | Add contextual related links for A/C/D/E |
| Chord center inbound | Chord center | `getChordCenter()` / `center-page.tsx` | Low-weight Hear major vs minor link |
| Guide inbound | Support guide | `support-content.ts` + `support-pages.tsx` | Link after third/major-minor discussion |
| Chord model pitches | Chord library | `getChordDetail` / `getChordCenter` | Reuse IDs, spellings, playback builder patterns |
| Shared PianoKeyboard | Keyboard Notes diagram | `keyboard-diagram.tsx` + keyboard CSS | Extend compare key roles |
| Layout / geometry | Keyboard libs | `keyboard-content.ts`, `keyboard-geometry.ts`, `keyboard-types.ts` | Local octave slice for reveal |
| Audio | ReferenceAudio | `a-minor-audio.ts` | Sequence via B04 hook wrapper |
| Share helpers | B03 share control | `share-control.tsx` | Reuse helpers; B04 panel UI |
| Analytics | New local owner | `hear-the-difference-events.ts` | Same CustomEvent style as keyboard practice |
| Metadata / OG | SEO editorial + page metadata | `seo-editorial.ts` + route `page.tsx` | Non-spoiler OG image under `public/assets/tools/` |
| Sitemap / public registry | Site routes | `site-routes.ts` + `sitemap.ts` | Add `/tools/hear-the-difference` only |
| Foundation whitelist | Check scripts | `scripts/check-foundation.mjs` (+ integration checks) | Authorize new page/components/asset |
