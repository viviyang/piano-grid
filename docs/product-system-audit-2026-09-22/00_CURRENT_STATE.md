# PianoGrid 当前事实基线

审计日期：2026-09-22。唯一代码基准：远端 `origin/main` 的 `c1a017a533289616b84e354c97f1345114f809e2`，提交时间 2026-09-22 11:41:28 +08:00。

## 使用边界

- [REPO_VERIFIED] 原工作区是 `codex/chords-b1`，存在大量已修改和未跟踪文件。本次 fetch 后建立 `../piano-main-product-audit` detached worktree，起始工作区干净，不混入原分支修改。
- [REPO_VERIFIED] 本次只交付文档与审计证据；没有产品代码实施、commit、push、部署、索引策略变更或新增公开 URL。构建与检查自动产生的配置/历史报告修改在交付前还原。
- 重要判断使用用户规定的六类标签。`REPO_VERIFIED` 是源码/本次本地输出支持；`LIVE_VERIFIED` 是本次线上 HTTP 支持；`PROJECT_DOC_VERIFIED` 仅证明项目记录；`RESEARCH_SUPPORTED` 仅证明报告有该论述，不自动证明其结论；`INFERRED` 标明推导；`UNRESOLVED` 保留未知。
- 优先顺序：本 SHA 代码/数据/build → 当前生产行为 → 最新相关验收记录 → 第一方数据 → BodyType 两报告 → PianoGrid 报告 → 推断。生产部署 SHA 未取得，不能因标题一致宣称线上就是本 SHA。
- 已读组件规则 2026-09-21（原工作区提供的维护源）、上级 page-rules 2026-09-15、远端 TDH-RULES、Foundation 设计/inspection/tokens、规划 JSON/最终 Markdown、首页内容/来源/问题台账。本远端快照没有 COMPONENT-RULES.md；规则副本作为交接附件保留，不能将本地未提交代码当基线。

## 架构与资产

| 项目 | 当前事实与直接定位 |
|---|---|
| Framework / build | [REPO_VERIFIED] Next.js 16.3.4、React 19.2.8、TypeScript ~5.9.3、Tailwind 4.3.3；`package.json`、锁文件。`npm run build` = `next build`；本次 `PIANO_NEXT_DIST_DIR=.next-audit` 构建 exit 0。锁定依赖以 npm ci 安装，未升级依赖。 |
| Deploy clues | [REPO_VERIFIED] `next.config.ts` 有 Vercel worker/trace 注释；Clarity 按 VERCEL_ENV 控制。正式 origin 在 `src/lib/site-config.ts` 固定。 [PROJECT_DOC_VERIFIED] release-readiness 记录 Vercel 上线；不能据此推断当前部署 SHA。 |
| 路由 | [REPO_VERIFIED] App Router，显式 page.tsx 与两个 `[slug]` 模板；`generateStaticParams` 按已列数据生成，未知 slug 走 notFound。白名单 206。205 条预渲染；`/songs/easy` 为动态 SSR。build 的 211 个生成项含框架/metadata 项，不能当 SEO URL 数。 |
| Sitemap / robots | [REPO_VERIFIED] `src/app/sitemap.ts` 从 PUBLIC_ROUTES 映射正式 origin，不伪造 lastmod；`robots.ts` allow `/`。 [LIVE_VERIFIED] 本次 sitemap 206 条；robots 允许抓取并指向正式 sitemap。 |
| Canonical | [REPO_VERIFIED] layout 的 metadataBase + 每页 alternates + editorialMetadata 发布层。全量本地 HTML canonical 自指；根域无尾斜杠与 `/` 视为等价。 [LIVE_VERIFIED] 206 页同样自指。 |
| Redirect | [REPO_VERIFIED] next.config 未配置业务 redirects；静态资源/metadata 端点不计业务 URL。 [UNRESOLVED] Vercel 控制台 redirect、所有 HTTP/www 变体本次未做全量验证。 |
| Structured data | [REPO_VERIFIED] 本次 HTML 提取出 WebSite、CollectionPage、WebPage；并非全站 SoftwareApplication / FAQPage。见 `evidence/build-pages.json`。 |
| Analytics | [REPO_VERIFIED] `src/lib/analytics.ts` 统一 gtag transport；chord、scale、keyboard、B05/B06、比较工具各有事件。GA4/Clarity 组件在 layout。没有找到独立 GTM 容器；gtag 的 googletagmanager 域名不等于部署了 GTM。 [LIVE_VERIFIED] 206 页 HTML 包含 GA4/Clarity 加载配置。 [UNRESOLVED] consent 实际适用要求、DebugView 收数、报表完整性与账户配置未验；不新增第二套 SDK。 |
| GSC | [PROJECT_DOC_VERIFIED] `docs/seo/chords/evidence-2026-09-18/GSC_REVIEW.csv` 明示未取得授权导出，单元格为空；不是第一方流量数据。 [UNRESOLVED] 当前点击、展示、排名、实际收录数、查询重叠 UNKNOWN。 |
| Audio | [REPO_VERIFIED] `a-minor-audio.ts` ReferenceAudio 为可取消 Web Audio 合成器，有 owner/lifecycle、held note/sustain；notes/scales 使用业务 hook；progression 有已有独立调度器，原创练习有自身 playback。不是一个已经完全统一的音频引擎；本轮不另建引擎。真人听音未验。 |
| Print/PDF | [REPO_VERIFIED] 当前选择快照 + beforeprint/afterprint + 业务 print DOM/CSS；静态 PDF 在 public/downloads、public/reference、public/assets，生成脚本在 scripts。Scales 已有 12 major、60 reference atlas、C-major 双手资料及 Letter/A4。存在资产不是 PDF/UA 已通过。 |
| Piano components | [REPO_VERIFIED] chords/KeyboardViewport + a-minor/Keyboard；keyboard-notes/KeyboardDiagram、StaffDiagram；scales/ScaleReference 复用域模型/图示。Finder 是一八度 pitch-class 输入键盘。已有多个不同用途视图，不能宣称全站单组件，也不应另造一套。 |
| UI | [REPO_VERIFIED] `ui/button.tsx` 注明 shadcn new-york 来源，使用 Radix Slot/CVA；Dialog、Collapsible 是现有项目封装；navigation 使用已有 @base-ui/react。未发现完整 Tabs/Slider/Menu 组件套装。旧“仅 components.json”已过时。复用这些实际源码，不把 ui 目录下所有组件都叫 shadcn。 |
| Theme | [REPO_VERIFIED] `src/styles/tokens.css`、foundation.css、globals.css 的 Tailwind v4 映射与系统字体；保留当前蓝色品牌及现有琴键表面。本轮不回退最近批准的立体键盘样式到旧 Foundation 图。 |
| Music truth | [REPO_VERIFIED] 是多个受校验内容包与 adapter 构成的事实层，而非单数据库。site-master 是基础包；chord-content/detail-model 汇合后续和弦包；chord-completion-content 汇成 433 registry；scale-content/completion-content 统一序列；不得另建 SEO 音乐事实。 |
| Chords | [REPO_VERIFIED] 145 detail URL；288 无新详情 URL 的补充对象；合计 Finder 433。288 = extended 108 + altered 96 + supplement 84。`getSupportedChordRegistry` 有数量和 identity 断言。 |
| Scales | [REPO_VERIFIED] 中心 15 个拼写 tonic major + 15×3 minor forms = 60 对象（不是 60 个独立 pitch classes）；19 detail + 5 family + hub = 25 URL。另有 arpeggios 和 practice guide。 |
| Key / progression | [REPO_VERIFIED] 24 major/natural-minor context，336 triad/seventh rows；8 pattern、96 example，仅 `/chords/by-key` 和 `/chord-progressions` 两个规范页面。 |
| Songs / sheet data | [REPO_VERIFIED] catalog.v2.json 有 199 works、203 arrangements、203 resources、24 assets、runtime_grants 0；页面 adapter 对 external reference 强制禁止冒充本地授权资产。2 Songs + 6 Sheet Music URL，不是 203 页；locked original 不代表已开放。 |
| Tools registry | [REPO_VERIFIED] integration-content 读 Practical Tools pack，按实际 release 路径过滤；工具入口可复用 chords/scales/notes 原 URL，不重复建工具副本。 |
| Tests | [REPO_VERIFIED] scripts 下有 foundation/type/CSS、音乐合同、数据、浏览器、音频/PDF与 SEO 检查；并非一个所有阶段都同步维护的单套测试。历史白名单和 source hash 有漂移，具体本次结果见下。 |

## 本次验证，严格区分范围

| 检查 | 本次结果 |
|---|---|
| npm ci | [REPO_VERIFIED] exit 0；61 packages；仅当前 worktree |
| npm run check | [REPO_VERIFIED] exit 0；Foundation 568/568、TypeScript、Tailwind/CSS 通过 |
| npm run build | [REPO_VERIFIED] exit 0；206 个业务 URL 由输出/manifest/HTML交叉核对 |
| scale completion contract | [REPO_VERIFIED] 9/9 |
| integration data | [REPO_VERIFIED] 126 pass / 26 fail。23 项 LF 归一后与历史 hash/Git blob 一致；3 项 Git 内容确已变化：A-Scales batch-page-content、batch-source-ledger、source-ledger.master。不能将三项归因于换行或擅自覆盖旧基线。 |
| integration batch / support / chords completion browser | [UNRESOLVED] 默认 localhost:3000 / 3101 未有服务，连接拒绝，不能视为产品功能失败或通过。已停止重复该路径。 |
| integration production browser | [UNRESOLVED] 未运行；本轮以独立全量 HTML 检查补充，不能等价替代交互验收。 |
| 全量本地 HTML | [REPO_VERIFIED] 206 页单 H1、自指 canonical、index/follow；205 prerender + 1 本地 SSR；无零入链业务页；未发现不存在的内部目标路径。发现 `/guide/piano-chords` → `/chords#find-a-chord` 静态锚点缺失。6 条 `#pg-arr=` 是已有客户端状态协议，不误报断链。 |
| 全量线上 HTTP | [LIVE_VERIFIED] 206/206 返回 200，单 H1、自指 canonical、index/follow；线上 title HTML entity 解码后与本 build 全部一致；sitemap 206。并不证明实际被 Google 收录。 |
| Tabbit 线上交互 | [UNRESOLVED] 首次超时，恢复后的只读请求遇 runtime restart/OUTCOME_UNKNOWN。没有有效截图，未完成视觉、移动端或可访问性交互审计。HTTP 不能替代浏览器。 |
| 人工门禁 | [UNRESOLVED] 具名教师、真人听音、真机、读屏、纸上打印、PDF 无障碍决定均不由本次检查代签。 |

## 文档校准

[PROJECT_DOC_VERIFIED] `docs/release/release-readiness.md` 是 2026-09-10 的17页阶段记录；TDH-RULES 里的197页是旧基线。`checks/piano-design-system-fix/REVISION.md` 的最新 independent modes / release SEO 节覆盖其早先“参考区是否隐藏”的说明。当前模式以源码为准，不从长文档中摘取过时小节。

完整证据：`evidence/baseline.json`、`build.log`、`build-pages.json`、`build-audit-summary.json`、`live-pages.json`、`live-sitemap-powershell.xml`、`hash-diagnosis.json`、`check-status.txt`。完整路由表见 `ROUTE_TEMPLATE_INVENTORY.md`。
