# 08 上线准备：17 页 SEO 审计

- 执行日期：2026-09-10
- 当前状态：`IMPLEMENTED / 待独立验收`
- 范围：既有 17 个授权路由、01–07 遗留 Notes、必要共享组件与测试
- 索引状态：保持 `noindex,nofollow`

## 结论

[已核实] 修复后的隔离发布预览与标准受保护生产构建均为 17/17 页通过，未发现 P0、P1 或 P2 技术 SEO 问题。逐页证据见 `seo-pages.json`，链接图见 `link-graph.json`，发布预览 HTML、headers 与 1440/390 截图见 `after/`，标准保护态证据见 `protected-production/`。

[已核实] 本轮没有新增页面、路由、依赖、动画或 sitemap；没有部署，也没有取消 `noindex,nofollow`。

## Before → 修复 → After

| 检查点 | Before | 修复 | After |
| --- | --- | --- | --- |
| H1 | 9 页因隐藏打印副本产生额外 H1 | 打印标题改为同等视觉样式的非 heading 元素 | 17/17 页均恰好 1 个 H1 |
| 初始 HTML 内链 | 发布预览中的 `/scales/a-minor` 只能在客户端切换后出现，链接图中孤立 | 在既有 scales 操作区输出 C major 与 A minor 两个已授权详情链接 | 17 页均可由首页到达；详情页均有父级入口 |
| 面包屑 | 部分详情页父级仅为文本 | Chords、Keyboard Notes、Scales、Songs、Tools 父级改为真实 `<a href>` | 父子 URL 与面包屑一致 |
| 运行时资源 | Before 抓取记录 1 次 favicon 404 | 根 metadata 增加空 data URI icon | 两套 After 抓取均为 0 runtime errors |

受 H1 修复影响的页面为：`/keyboard-notes/labeled`、`/keyboard-notes/chart`、`/chords`、`/chords/a-major`、`/chords/a-minor`、`/chords/c-major`、`/scales`、`/scales/c-major`、`/scales/a-minor`。

打印标题样式的 before/after：

- Chords：`.am-print-only h1` 的 `24pt / 1.3 / margin 0 0 8pt` 改由 `.am-print-title` 承担，并显式保留 `font-weight: 700`。
- Keyboard Notes：`.kn-print-sheet h1` 的 `20pt` 改由 `.kn-print-title` 承担，并显式保留 `font-weight: 700`。
- Scales：`.sc-print-only > h1` 的 `18pt / margin 0 0 3pt` 改由 `.sc-print-title` 承担，并显式设置 `line-height: 1.2`、`font-weight: 700`。

## 逐页 SEO 汇总

[已核实] `seo-pages.json` 包含 17 页要求的全部字段：URL、模板、主词、任务、source_groups、内容版本、能力、源/最终 TD、H1、H2/H3、内容覆盖、HTML 正文、canonical、robots、入链/出链、可达性、断链、媒体可访问性、JSON-LD、严重度、修复结果与 release blockers。

- Title：17/17 与总包 source metadata 精确一致；0 重复。
- Description：17/17 与总包精确一致；0 缺失、0 重复。
- H1：17/17 恰好 1 个；首页与工具页仍为已验收的内容页字号，没有恢复营销 Hero。
- 正文：17/17 的核心文本存在于实际 HTTP HTML 与 DOM；所有 source block 均有 `data-block-id` 对应。A minor 的 intro 保留已验收适配：首句作为 direct answer，其余原文在紧随的 root-position example 中，第二段只把 “below” 改为明确的 “root-position example”。
- Canonical：17/17 的 effective path 与规划 path 一致；当前使用相对路径。正式域名尚未确认，因此没有伪造绝对 origin。
- Robots：17/17 均输出 `noindex,nofollow`；没有 `X-Robots-Tag` 冲突。
- 内链：隔离发布预览中 17/17 均可由首页到达，0 孤立页、0 内部断链；详情页均有父级链接。
- 外链：去重后 15 个 HTTP(S) 目标有限检查均返回可达状态；这不等于地区、结账、内容适用性或授权已人工确认。
- 图片/SVG：0 个自动化可访问名称问题；0 个 1440 或 390 整页横向溢出。
- Crawler parity：普通浏览器与 Googlebot UA 的 status、title、description、canonical 一致。
- Schema：当前没有 JSON-LD；没有语法错误或不实 Review/Rating/FAQ schema。正式域名未确认前不生成带猜测 URL 的 WebSite/BreadcrumbList。

## 两种生产模式

- [已核实] 标准生产构建：保持当前发布门槛，未批准入口继续隐藏；17/17 页面 HTTP、TDH、canonical、robots、DOM 与响应式检查通过。
- [已核实] 隔离发布预览：仅在本地构建时设置 `PIANO_LOCAL_PREVIEW=1`，验证同一代码在 17 页链接开放时的完整链接图；没有写回 published 字段，也没有部署。

## 回归结果

| 检查 | 结果 |
| --- | --- |
| `npm run check` | PASS；Foundation 560/560、TypeScript、Tailwind v4/CSS 均通过 |
| `npm run build`（隔离发布预览） | PASS；17 条授权路由与框架 404 静态生成 |
| `npm run build`（标准保护态，最终构建） | PASS；17 条授权路由与框架 404 静态生成 |
| 发布预览 SEO | 17/17，0 blocking，0 runtime errors |
| 标准保护态 SEO | 17/17，0 blocking，0 runtime errors |
| Chords / A minor | 235/235；162/162 |
| Keyboard Notes | 1660/1660 |
| Scales | 330/330；标准保护态 63/63 |
| Songs | 120/120；标准保护态 54/54 |
| Guides | 77/77；标准保护态 57/57 |
| Blank Sheet | 60/60；标准保护态 58/58 |
| Site Integration | 190/190；标准保护态 114/114 |

[已核实] 标准保护态的第一次 scales production 调用沿用了 batch 03 默认路由白名单，因此把已经授权的 `/`、`/tools`、`/songs`、`/guide` 当作应为 404，出现 4 个测试配置假失败。按脚本支持的 `PIANO_ADDITIONAL_ROUTES` 明确加入这四条现有路由后，复跑为 63/63；产品页面没有失败。

## 保留项与发布门槛

- [已核实] 正式域名、HTTPS、www/裸域重定向、线上 headers、CDN/缓存、公开 robots 与未来 sitemap 尚未进入本地可验证范围。
- [已核实] Guide PDF 仍无结构标签、文档语言和图形替代文本；没有可编辑作者源及经确认的阅读顺序/替代文本，不能可靠伪造 PDF/UA 结构。
- [已核实] `/guide` 与 `/guide/read-sheet-music` 的具名钢琴教师审阅仍待完成。
- [已核实] `/chords/a-major` 与 `/chords/c-major` 的 F-RELEASE 具名专业审阅仍待完成；未核实的 inversion fingering 继续不显示。
- [已核实] 真机、NVDA/JAWS/VoiceOver、系统打印对话框、实体打印、真人听音/试弹及第三方出版页面的地区/结账流程仍需人工验收。

[推断] 当前代码具备提交独立 08 验收、并在上述内容/人工/环境门槛得到处理或明确签收后进入“准备部署”阶段的技术条件。依据是两种本地生产模式的 17/17 审计、完整业务回归与保留的索引保护；这不是部署或公开授权。
