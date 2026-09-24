# HOME V4 Final Design R2 — component reuse map

Baseline: `origin/main` at `0d94029ac257f3534141b304a3fc6603fd46d9b8`. Component rules read: `docs/design/COMPONENT-RULES.md` (2026-09-21). Visual target: `PianoGrid_Home_V4_APPROVED_DESIGN.html` and all ten `DESIGN_SCREENS_ONLY` images from `HOME-V4-FINAL-DESIGN-R2-20260924`. The HTML source was inspected and the page was rendered from a temporary local static server at 1440px and 390px.

| 最终区域 | 当前仓库可复用组件/文件 | 可复用 token | 处理方式 | 是否需要新增 | 原因 |
|---|---|---|---|---|---|
| Header | `HomeHeader` in `src/components/integration/home-experience.tsx`; `SiteNavigation` and `SITE_NAVIGATION`; `SiteBrand` | 生产导航 token 与 `src/components/site-navigation.css` | 直接复用 | 否 | 沿用生产环境的深色外观、图标、下拉、移动菜单和 CTA。 |
| Hero / CTA | `next/image` photo in `src/components/integration/pages.tsx`; `Button` in `src/components/ui/button.tsx`; `HomeArrow`; `site-config.ts` | `--background`, `--foreground`, `--primary`, `--muted-foreground`, `--ring` | homepage-only wrapper | 否 | 原图、SEO 和按钮实现保留；更换布局、文案、遮罩和目的地。首页按钮的 hover 保持深底白字或浅底深字，沿用现有按压位移与时长 token。 |
| Wide Practice Keyboard | `HomePianoDemo`/`PianoKeyboard` in `home-experience.tsx`; `ReferenceAudio` in `src/lib/a-minor-audio.ts`; `chord-content.ts`; `src/components/chords/piano-surface.css` | `--piano-key-*`, `--piano-note-*`, `--accent`, `--primary`, `--pr-container-page` | 扩展 variant | 否 | 保留琴键/音频/owner 生命周期和原有键面渐变、阴影、视角，扩宽独立白底区域并让手机仅琴键内部滚动。 |
| Six Product Preview Cards | `getHomeModel`, `SITE_NAVIGATION`, `HomeArrow`; reviewed `TaskIllustration` in `home-visuals.tsx` | `--accent`, `--surface`, `--background`, `--border`, `--primary`, `--ring` | 必须新增 | 是，仅首页展示组件 | 现有 `TaskIllustration` 是旧简笔图，不包含批准稿的六个产品窗口；新增无业务逻辑的静态预览，链接沿用真实路由。装饰预览位于链接之外，标题链接通过 homepage-only 覆盖层维持整卡可点击和清楚的锚文本。 |
| Beginner Learning | `getHomeModel().firstAction`, retained content block, `Button`, `HomeArrow` | `--accent`, `--surface`, `--foreground`, `--primary` | homepage-only wrapper | 否 | 数据与文案现成，改为独立 C/D/E 学习行。 |
| Listening Learning | `HomeChordDiscovery`, `ReferenceAudio`, `getChordCenter()` | `--background`, `--surface`, `--border`, `--primary`, `--ring` | 扩展 variant | 否 | 保留 A minor/A major 试听和切换，只把暗色大块改为批准稿浅色面板。 |
| Songs / Reading | `SongsCover`, `ReadingCover` in `home-visuals.tsx`; existing destinations | `--background`, `--accent`, `--surface`, `--border` | homepage-only wrapper | 否 | 保留已有封面/阅读视觉内容，缩为批准稿双卡。 |
| Quick Resources | existing links and `HomeArrow` in `pages.tsx`; `SITE_NAVIGATION` | `--background`, `--border`, `--primary`, `--muted-foreground` | homepage-only wrapper | 否 | 保留左侧标题，右侧四个入口各占一行，并补已有 `/keyboard-notes/labeled`。 |
| Topic Directory | `SITE_NAVIGATION` in `src/lib/site-routes.ts`; existing `HomeReferenceDirectory` | `--background`, `--surface`, `--border`, `--primary`, `--ring` | 扩展 variant | 否 | 真实新增链接保持；改为默认可见的分组与标签。 |
| FAQ | `Collapsible`/`CollapsibleTrigger`/`CollapsibleContent` in `src/components/ui/collapsible.tsx` | `--background`, `--border`, `--foreground`, `--ring` | homepage-only wrapper | 否 | 复用现有可访问折叠交互，实现批准的四问。 |
| Closing | `Button`, `HomeArrow`, `RollingText` | `--accent`, `--foreground`, `--primary` | homepage-only wrapper | 否 | 删除巨幅装饰，使用紧凑 CTA 组合。 |
| Footer | `HomeFooter`, `SiteBrand`, `SITE_NAVIGATION` | `--background`, `--border`, `--foreground`, `--muted-foreground` | 扩展 variant | 否 | 保留真实导航来源和品牌，仅调整紧凑布局及说明。 |

`src/components/ui/button.tsx` already provides the shared CVA/shadcn-derived button with `asChild`; homepage CTA styling will be a compatible homepage variant. `Collapsible` is adequate for FAQ and avoids adding a dependency. No new audio engine, menu data, keyboard business model, route or dependency is needed.

User review update: the Header and Navigation retain the production dark palette, icons, menu styling, and responsive behavior. The approved package remains the visual target for the rest of the homepage.
