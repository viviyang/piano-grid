# HOME V4 Final Design R2 — token and component mapping

Mapped before implementation against `src/styles/tokens.css`, `src/styles/foundation.css`, `src/components/ui`, and the current homepage components. Prototype tokens are visual evidence only. Changes below are scoped to `.home-v4-final` or the existing homepage variant; global semantic values remain unchanged.

| 设计角色 | 生产 token / 组件路径 | 复用或局部新增 | 实际使用文件 | 新增原因 |
|---|---|---|---|---|
| background / foreground / muted / surface / border / ring | `--background`, `--foreground`, `--muted-foreground`, `--surface`, `--border`, `--ring` in `src/styles/tokens.css` | 复用 | `src/components/integration/home-v4-final.css` | — |
| primary / hover / accent | `--primary`, `--primary-hover`, `--accent` in `src/styles/tokens.css` | 复用 | `home-v4-final.css` | — |
| typography | `--pr-font-sans`, `--pr-weight-*`, `--pr-type-*`; `src/styles/foundation.css` | 复用 | `home-v4-final.css` | — |
| spacing / container | `--pr-space-*`, `--pr-container-page` (70rem / 1120px), `--pr-page-gutter` | 复用 | `home-v4-final.css` | — |
| control / panel radius, focus | `--pr-radius-control`, `--pr-radius-panel`, `--pr-focus-width`, `--pr-focus-offset` | 复用 | `home-v4-final.css` | — |
| buttons / CTA | `Button` and `buttonVariants` in `src/components/ui/button.tsx`; `HomeArrow` | 扩展首页 variant | `src/components/integration/pages.tsx`, `home-experience.tsx`, `home-v4-final.css` | 批准稿的黑底/白底 pill 外观仅属于首页。 |
| menu / navigation / brand | `HomeHeader`, `SiteNavigation`, `SiteBrand`, `SITE_NAVIGATION` | 复用 | `home-experience.tsx`, `pages.tsx`, `home-v4-final.css` | — |
| practice piano / audio | `HomePianoDemo`, `PianoKeyboard`, `ReferenceAudio`, `getChordCenter`; `src/components/chords/piano-surface.css` and its `--piano-key-*` / `--piano-note-*` tokens | 复用原有立体键盘，仅调整首页容器 | `home-experience.tsx`, `pages.tsx`, `home-v4-final.css` | — |
| listening selector / audio | `HomeChordDiscovery`, `ReferenceAudio` | 复用并扩展样式 | `home-experience.tsx`, `pages.tsx`, `home-v4-final.css` | — |
| FAQ interaction | `Collapsible` in `src/components/ui/collapsible.tsx` | 复用 | `pages.tsx`, `home-v4-final.css` | — |
| product preview surface / gradient | homepage-scoped `--home-preview-*` | 局部新增 | `home-v4-final.css` | 现有语义表面无六张卡的浅蓝/浅紫产品预览色层。 |
| hero photo overlay | homepage-scoped `--home-hero-overlay` | 局部新增 | `home-v4-final.css` | 保证原图上的桌面和移动文案对比度。 |
| homepage section rhythm | homepage-scoped `--home-section-space` | 局部新增 | `home-v4-final.css` | 批准稿的首页节奏不同于通用内容页。 |

No new external font, animation library, theme, or global token was added.

The Header/Navigation now use the existing production palette and `src/components/site-navigation.css` without a homepage color override, as requested during review.
