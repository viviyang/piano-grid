# 04-songs 独立验收报告

- 验收日期：2026-09-09
- 验收范围：`/songs`（T15）、`/songs/easy`（T16），以及受共享站点结构影响的 A minor 短回归
- 结论：`PASS_WITH_NOTES`
- 缺陷计数：产品 P0=0、P1=0、P2=0、P3=1
- 批次判断：[已核实] 04-songs 可验收通过；本次没有启动 05-guide，也没有修改产品代码。

## 总体健康度

[已核实] 两条授权路由、T15/T16 页面职责、作品/版本/rights 映射、筛选与空结果恢复、50 条合集边界、noindex、生产态路由白名单、响应式和共享页回归均通过本轮独立检查。当前 Songs 批次合计 1,075/1,075；Foundation 560/560；A minor 短回归 162/162。

## 执行结果

| 项目 | 本轮结果 | 证据 |
| --- | ---: | --- |
| `npm run check` | PASS | [已核实] Foundation 560/560，TypeScript 与 Tailwind v4 真实编译通过；见 `machine/foundation.json`、`machine/tailwind-compile.json` |
| `npm run build` | PASS | [已核实] Next.js 16.3.4 生产构建成功，输出只有已验收路由、两条 Songs 路由及 `_not-found` |
| Songs 数据 | 902/902 | `machine/data-validation.json` |
| Songs 浏览器 | 119/119 | `machine/validation.json` |
| Songs 生产态 | 54/54 | `machine/production-validation.json` |
| A minor 短回归 | 162/162 | `regression/a-minor-validation.json` |
| 交付源码哈希 | 11/11 | `source-hash-verification.json` |

[已核实] 首次在受限环境执行生产构建时，编译已完成但 TypeScript 子进程触发 `spawn EPERM`；在获准的本机执行环境重跑后完整构建通过。这是执行环境限制，不是产品失败。

## 页面与模板验收

### `/songs` — T15 选曲中心

- [已核实] 默认打开显示 6 个有来源的具体版本；搜索只匹配作品名、署名和版本名，出版方等级不包含 null，目标筛选仅暴露有真实结果的集合。
- [已核实] 搜索 `Minecraft` 返回唯一 Sweden 版本；不存在的查询进入明确空状态，`Show all editions` 恢复全部 6 条。
- [已核实] 每条卡片区分作品、署名、edition、出版方等级依据、选择理由、核对建议、取得方式与外部出版方资源，没有把原作和 easy 编配合并为同一版本。
- [已核实] 页面只连接已授权 `/songs/easy`；筛选不生成新的 SEO URL。

### `/songs/easy` — T16 Easy 专题

- [已核实] 默认显示 9 个重点版本；All、Kids、C-major、Beautiful、Adults、Small performance 六个原生单选具有可访问名称和真实结果。
- [已核实] C-major 筛选严格返回 3 个明确标注为 C major 的版本；两个 Twinkle 与两个 Happy Birthday 仍保持各自 edition、等级、调性和取得方式。
- [已核实] 50 条附加目录均属于同一已识别的 `HL00131140` Easy Piano 合集，编号到 50，页面明确声明它们不是 50 条逐曲排名或逐曲测试。
- [已核实] 390px 下合集表格使用自身带标签的横向滚动区域，页面本身没有横向溢出。

## 设计、响应式与可访问性审计

1. [已核实] 人工检查 1440px 与 390px 的生产态全页和首屏；主层级、筛选区、版本卡、阅读区、页眉页脚整体稳定，无裁切、重叠或页面级横向溢出。
2. [已核实] 自动复核 320/390/768/1440 四个宽度及 200% 文本缩放；两页所有页面级溢出断言通过。证据位于 `screenshots/` 与 `machine/validation.json`。
3. [已核实] 在浏览器可访问性树中确认 H1、搜索框、下拉框、单选组、外链、目录表格和清除按钮可识别；键盘 focus 检查通过。
4. [已核实] 无 JavaScript 状态仍保留全部可读内容，并禁用依赖客户端的筛选；生产态无 console/hydration 错误。
5. [已核实] 视觉审计发现一项非阻断的小屏排版瑕疵，详见 REV04-P3-001。

## 内容、资源与权限边界

- [已核实] 两页对象与 C-Songs 批次包/master 的标题、block、source group、版本 ID、资源 URL 和筛选归属由 902 条独立断言逐项核对。
- [已核实] 所有可见资源均保持 HTTPS 外链、`external-only` 且不允许本站复制谱面或录音；仓库未新增第三方封面、谱面、音频或 PDF。
- [已核实] `C-center-review`、`C-EASY-FIFTY-DETAIL`、`C-EASY-TWINKLE-PRICE`、`C-EASY-RIGHTS` 与 `C-EASY-SOURCE-ERROR` 缺口没有被产品补写或误宣称。
- [已核实] 本轮未访问第三方结账/下载终点；因此只验收资源身份、URL 结构与 rights 边界，不声称外站当前可用性。

## 组件与工程边界

- [已核实] `src/app/songs/` 只有 `/songs` 与 `/songs/easy` 两个静态页面；没有动态 Songs 路由、`route.ts`、其他专题路由、首页或 05–07 页面。
- [已核实] T15 使用 `SongCenterExperience`，T16 使用 `EasySongChooser`；两者共享 `SongShell`、`ReadingSection` 与 `SongResourceCard`，筛选状态仍由各自任务独立持有。
- [已核实] 11 个产品源码文件的当前 SHA-256 与开发交付清单逐项一致。验收写入仅位于 `checks/reviews/04-songs/`；未修改产品源码、依赖、任务规则、进度文档或开发证据。

## Findings

### REV04-P3-001 — 390px 结果计数把 `editions` 留下孤立末字母

- 严重度：P3（视觉细节；不阻断任务）
- URL：`/songs`
- 来源任务/字段：`04-songs.md:24` 的“长作品名、长版本信息在手机可读”；T15 结果计数行
- 代码：`src/components/songs/center-experience.tsx:31`；`src/components/songs/songs.css:4,12-13`
- 复现：以 390×844 打开生产态 `/songs` 默认状态，观察筛选器下方左侧结果计数。
- 证据：`screenshots/production-songs-390.png`
- [已核实] 实际表现：左侧 `6 editions` 在与右侧说明共用 flex 行时被压缩为 `6`、`edition`、孤立的 `s` 三行；320px 因 22rem 断点改为 block，反而不出现该形态。
- [已核实] 影响：计数仍完整可读，筛选、结果、键盘操作和页面宽度均正常；影响仅为 390px 附近的扫读质量。
- 最小修复建议：后续返工时让首个计数段不在单词中间收缩（例如对计数段使用 `white-space: nowrap` / `flex-shrink: 0`），或把结果头部切换为 block 的断点提前到覆盖 390px；本次按授权未修改产品代码。

## 非阻断说明与未测试项

- [已核实] 根规则要求读取的 `docs/workspace-context.md` 当前不存在；本次未创建或伪造，使用根 `README.md` 与 `docs/project-context.md` 建立上下文。
- [未测试] 未在真实手机硬件上验收；已覆盖 Chromium 的 320/390/768/1440 视口和 200% 文本缩放。
- [未测试] 未用 NVDA、JAWS 或 VoiceOver 完成长流程；已检查语义 DOM、可访问名称、键盘 focus 与浏览器可访问性树。
- [未测试] 未探测全部第三方外链的实时 HTTP/结账可用性，避免把外站状态误写为产品保证。
- [未测试] 未部署生产环境；本轮仅构建并启动本机生产模式。

## 最终决定

`PASS_WITH_NOTES`

[已核实] 没有阻断 04-songs 的产品缺陷。REV04-P3-001 可进入后续小屏排版维护，不要求本轮修改。验收至此停止，不自动进入 05-guide。
