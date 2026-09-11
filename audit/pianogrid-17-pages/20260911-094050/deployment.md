# Production deployment record

部署日期：2026-09-11（Asia/Shanghai）

## Deployment

- [已核实] Target: Vercel production
- [已核实] Project: `weiweis-projects-eb330b65/piano-grid`
- [已核实] Deployment ID: `dpl_3n1YaAXaS4vpWsNARxRvYde9yiTt`
- [已核实] Immutable deployment URL: `https://piano-grid-lrdkvd3b3-weiweis-projects-eb330b65.vercel.app`
- [已核实] Production alias: `https://pianogrid.com`
- [已核实] Vercel ready state: `READY`
- [已核实] Vercel build completed and generated the 17 authorized pages plus framework endpoints (`_not-found`, manifest, robots and sitemap).
- [限制] Deployment was built from the current dirty working tree, not a clean committed revision; it must not be described as deployment of commit `00328dd...`.

## Pre-deployment gates

- [已核实] `npm run check`: Foundation 564 passed; TypeScript passed; CSS/Tailwind checks passed.
- [已核实] `node scripts/check-integration-data.mjs`: 153 passed, 0 failed.
- [已核实] Initial browser integration attempt failed only because no local server was running (`ERR_CONNECTION_REFUSED`). After starting the production build locally, `node scripts/check-integration-batch.mjs`: 237 passed, 0 failed.
- [已核实] `npm run build`: completed successfully; 17 authorized routes statically generated.
- [已核实] Local production integration: 125 passed, 0 failed.

## Post-deployment verification

- [已核实] Production integration against `https://pianogrid.com`: 125 passed, 0 failed.
- [已核实] 17/17 routes return HTTP 200; all canonical URLs normalize to their own route and all retain `index, follow`; sitemap contains exactly 17 `<loc>` entries.
- [已核实] Songs now exposes `Difficulty (publisher label)`, `Arrangement`, and `Acquisition format` as separate visible fields.
- [已核实] Sweden now displays a non-duplicated byline and states that the Hal Leonard Digital Book is online-only and cannot be downloaded or printed.
- [已核实] Am Root/First/Second inversion each has exactly one current-selection DOM row and exactly one current row in the browser accessibility-tree snapshot.
- [已核实] 工作树中后出现的 iOS/Web Audio `audioSession` 修复字符串已在正式域名加载的 immutable JavaScript bundle 中找到，因此它包含在本次线上构建中。
- [已核实] Post-deployment Songs screenshots at 1440×1000 and 390×844 show loaded content and no whole-document horizontal overflow.
- [已核实] No console errors occurred in the targeted post-deployment browser verification.

Evidence:

- `predeploy-production/production-validation.json`
- `postdeploy-production/production-validation.json`
- `evidence/postdeploy-verification.json`
- `evidence/postdeploy-browser-verification.json`
- `evidence/postdeploy-audio-bundle.json`
- `evidence/postdeploy-songs-desktop.png`
- `evidence/postdeploy-songs-mobile.png`

## Warning retained

[已核实] Vercel warned that `package.json` uses `engines.node: ">=20.9.0"`, which permits automatic adoption of a future major Node.js version. The deployment succeeded; this warning was not changed during the deployment.
