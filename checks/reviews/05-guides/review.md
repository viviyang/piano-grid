# 05-guides 独立验收报告

- 验收日期：2026-09-09
- 验收范围：`/guide`（T21）、`/guide/read-sheet-music`（T22），共享 `SiteHeader` 与既有 A minor 短回归
- 结论：`PASS_WITH_NOTES`
- 缺陷计数：产品 P0=0、P1=0、P2=0、P3=1；进度文档 P3=1
- 批次判断：[已核实] 05-guides 的本地实现可验收通过；发布前仍需完成具名钢琴教师专业审阅。没有启动 06，也没有修改产品代码。

## 总体健康度

[已核实] 两条授权路由、T21/T22 页面职责、逐 block 正文、九个谱号锚点、FACE 范围、加线音区、四小节练习、真实 PDF、noindex、路由白名单、响应式及共享页回归均通过本轮独立检查。当前 Guides 批次合计 291/291；Foundation 560/560；A minor 短回归 162/162。

## 执行结果

| 项目 | 本轮结果 | 证据 |
| --- | ---: | --- |
| `npm run check` | PASS | [已核实] Foundation 560/560，TypeScript 与 Tailwind v4 真实编译通过；`machine/foundation.json`、`machine/tailwind-compile.json` |
| `node scripts/check-guide-data.mjs` | 157/157 | `machine/data-validation.json` |
| `node scripts/check-guide-batch.mjs` | 77/77 | `machine/validation.json` |
| `npm run build` | PASS | [已核实] Next.js 16.3.4 完整生产构建成功，只生成十四条已实现业务路由及 `/_not-found` |
| `node scripts/check-guide-production.mjs` | 57/57 | `machine/production-validation.json` |
| A minor 短回归 | 162/162 | `regression/a-minor-validation.json` |
| PDF 结构与视觉 | 4/4 页 | `pdf-verification.json`、`pdf-render/` |
| 当前交付哈希 | 21/21 | `source-hash-verification.json` |

[已核实] 隔离副本中的构建因 `node_modules` junction 指向副本目录外而被 Turbopack 拒绝；原工作区第一次受限构建又在 TypeScript 子进程触发 `spawn EPERM`。在获准的本机执行环境重跑后完整构建通过。两次均为验收环境限制，不是产品失败。

## 页面与模板验收

### `/guide` — T21 指南中心

- [已核实] 首屏直接提供 C4、D4、E4 的一小节四拍任务和真实键盘定位，不是文章标题目录。
- [已核实] 四步路径顺序明确；只有已实施的 `/keyboard-notes/chart` 与 `/guide/read-sheet-music` 可点击，另外两项明确显示 `Planned guide` 且没有空链接。
- [已核实] 三个源 block 的英文正文逐字呈现；四拍图的可访问名称为 C4 1 拍、D4 1 拍、E4 2 拍。
- [已核实] `Open the chord guide` 指向已验收 `/chords`；四页 PDF 是真实下载链接。

### `/guide/read-sheet-music` — T22 读谱指南

- [已核实] 阅读顺序保持 Clef → Key signature and accidentals → Line or space → Duration。
- [已核实] 高音与低音谱表分别呈现，共有九个源锚点；A3 与 C2 的“下方第二加线”结论按谱号区分，没有合并成通用答案。
- [已核实] FACE 只应用于高音谱表四个间 `F4–A4–C5–E5`；低音谱表间另列 `A2–C3–E3–G3`。
- [已核实] E-SR1 四小节每小节均为四拍，答案精确为 `C4 D4 E4 | E4 D4 C4 | D4 E4 F4 D4 | C4`；折叠答案可用键盘揭示，无 JavaScript 时答案仍留在 DOM。
- [已核实] 没有自动评分、账号、课程进度、推算指法或额外和弦操作面板。

## 设计、响应式与可访问性审计步骤

1. [已核实] 在 1440px 检查指南中心：首屏任务、四拍图、键盘、四步路径、三个正文区和 PDF 下载层级清晰，无裁切、重叠或页面级横向溢出。
2. [已核实] 在 390px 检查指南中心：标题、四拍图与路径变为单列；键盘只在自身容器横向滚动，页面宽度保持 390px。
3. [已核实] 在 1440px 检查读谱指南：目录、阅读顺序、双谱表、FACE 对照、练习和 PDF 下载顺序完整。
4. [已核实] 在 390px 检查读谱指南：目录纵排、四步阅读顺序两列、谱表卡片单列、练习小节单列；没有页面级横向溢出。
5. [已核实] 自动复核 320/390/768/1440 与 200% 文本缩放；两页全部通过。浏览器可访问性树确认 H1、目录锚点、谱表音名、练习折叠和下载链接可识别。
6. [已核实] PDF 四页逐页渲染并查看；没有空页、裁切、重叠、黑块或不可读乐谱字符。PDF 可提取文本，但缺少结构标签，详见 REV05-P3-001。

## 内容、资源与专业门槛

- [已核实] 两页与 E-Guide-Reading-Practice 批次对象/master 的标题、block、source group、数据、锚点、练习、rights 和 PDF 身份由 157 条独立断言核对。
- [已核实] 源 PDF 与公开副本均为 58,564 bytes，SHA-256 同为 `69c46e4520b9ea63f03755fb7d2a68b29b843664fe09abc628f7e35af05deac2`；4 页 Letter、未加密、无 JavaScript。
- [已核实] 源问题 `E-REVIEW-guide` 与 `E-REVIEW-read-sheet-music` 仍为 `professional_review: pending`。程序校验与视觉验收不能代替具名钢琴教师对教学适切性、术语和记谱的签核。
- [已核实] 页面与 metadata 保持 noindex/nofollow，未部署，也没有把“内容已准备”写成“专业审核或发布已完成”。

## 组件与工程边界

- [已核实] `src/app/guide/` 只有两条明确静态路由；没有动态 Guide 路由、`route.ts`、其他指南、首页、06 或 07 页面。
- [已核实] T21 与 T22 分别由 `GuideCenterPage`、`ReadSheetMusicPage` 承担；实际共享 `GuideShell`、`Section`、`BeatPattern`、`Printable`、`SiteHeader/Footer`，同时保留中心与教程的不同任务结构。
- [已核实] `guide-content.ts` 只读取两条白名单页面并校验模板、核心 block、四拍算术、谱表位置与 PDF rights；客户端没有收到 master、问题台账或专业审阅字段。
- [已核实] 当前 21 个交付文件 SHA-256 与开发清单逐项一致。验收写入仅位于 `checks/reviews/05-guides/`；未修改产品源码、内容、PDF、依赖、规则或进度状态。

## Findings

### REV05-P3-001 — 下载 PDF 没有结构标签

- 严重度：P3（辅助材料的可访问性风险；不阻断本地实现）
- URL：`/guide`、`/guide/read-sheet-music`
- 来源任务/字段：P240 printable；T21/T22 `Printable`
- 代码/资产：`public/assets/guides/piano-starter-and-reading.pdf`
- 复现：运行 `pdfinfo`，再用 pypdf 检查 PDF catalog 的 `/MarkInfo` 与 `/StructTreeRoot`。
- 证据：`pdf-verification.json`
- [已核实] 实际结果：`Tagged: no`，没有 `/StructTreeRoot` 或 marked-content 标记；四页均可提取文本并能正常视觉渲染。
- [推断] 影响：依赖 PDF 结构的屏幕阅读器用户可能无法获得可靠的标题层级、阅读顺序及乐谱图说明。依据是文件缺少结构树；本轮未用屏幕阅读器实际打开 PDF。
- 最小修复建议：后续重新导出时添加文档语言、标题层级、段落、列表、图形替代文本和逻辑阅读顺序，并用 PDF/UA 检查器与屏幕阅读器复验；本次未修改 PDF。

### REV05-P3-002 — 唯一进度表保留了上一批的下一步文字

- 严重度：P3（流程文档，不是产品缺陷）
- URL：不适用
- 来源任务/字段：`CONTINUE-HERE.md` 的唯一进度记录要求
- 代码：`docs/tasks/site-implementation-plan.md:39`
- 复现：读取文件首段和首轮 17 页表，均显示当前批次 05；再读取第 39 行。
- 证据：第 39 行仍写“目标04”“未运行04独立审查，不进入05”。
- [已核实] 影响：本轮可由文件首段、表格、README 与 05 实施报告唯一确定当前批次，因此不影响本次验收；但后续恢复对话若只读取“下一具体动作”可能被误导。
- 最小修复建议：主开发在处理本报告或推进 06 时删除上一批残留句，并把下一动作更新为与 05 验收状态一致；本次按权限未修改进度文档。

## 未测试项

- [未测试] 真实移动设备；已覆盖 Chromium 320/390/768/1440 与 200% 文本缩放。
- [未测试] NVDA、JAWS 或 VoiceOver 的网页/PDF长流程；已检查语义 DOM、浏览器可访问性树、键盘 focus 和 PDF 结构元数据。
- [未测试] 实体打印；已核对源/公开 PDF 字节、页面规格并逐页渲染查看。
- [未测试] 具名钢琴教师的专业教学与记谱签核；该发布门槛保持 pending。
- [未测试] 生产部署；仅本机生产模式验证，索引保护保留。

## 最终决定

`PASS_WITH_NOTES`

[已核实] 没有阻断 05-guides 本地实现的 P0/P1/P2 缺陷。REV05-P3-001 是辅助 PDF 的可访问性改进项，REV05-P3-002 是进度文档残留；专业审阅仍是发布前门槛。验收至此停止，不自动进入 06-blank-sheet。
