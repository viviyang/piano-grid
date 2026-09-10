# Piano Reference — Independent Review 01 Chords

审查日期：2026-09-09  
审查范围：`/chords`、`/chords/a-major`、`/chords/a-minor`、`/chords/c-major`  
最终结论：`PASS_WITH_NOTES`

## A. Overall result

- [已核实] 最终 verdict 为 `PASS_WITH_NOTES`。本轮发现 0 Critical、0 High、0 Medium、1 Low。
- [已核实] 该 Low finding 是共享 T07 比较表滚动区域的无障碍名称被硬编码成 “A minor inversion comparison table”，影响 `/chords/a-major` 与 `/chords/c-major`；可见标题、表格 caption、音乐数据与交互均正确。
- [推断] 依据 `90-independent-review.md` 对“只有非阻塞建议可 PASS_WITH_NOTES 且不阻止后续批次”的规则，本批允许进入 02；该 finding 不要求在 02 前阻塞修复。
- [已核实] 审查前仓库状态为：00 `implementation_checked`、必要接入完成；01 `implementation_checked / review pending`，不是既有的 `review_passed`。本报告是 01 的独立验收结果，未修改任务状态文档。
- [已核实] 实际构建仅生成 `_not-found` 与四条授权路由：`/chords`、`/chords/a-major`、`/chords/a-minor`、`/chords/c-major`。`/`、`/chords/b-major`、`/chords/c-minor`、`/chords/by-key`、`/scales` 在本轮页面测试中保持 404。
- [已核实] 当前源码与开发方交接快照的 39 个文件哈希 39/39 一致；审查开始时创建的物理隔离副本与审查结束时工作区的 `src`、`scripts`、`public`、`docs/content`、`docs/design` 及根配置文件比较为 0 差异。
- [已核实] 本轮只新增 `checks/reviews/01-chords/` 下的报告与证据，没有修改产品源码、内容数据、依赖、设计系统、URL、发布状态或部署状态。
- [已核实] 规定读取顺序中的 `docs/workspace-context.md` 当前不存在；本轮使用根 `README.md`、`docs/project-context.md`、批次规则及 Source of Truth 继续审查，未补建该文件。

### 真实状态与执行时间

| 证据 | 结果 | 执行时间 |
| --- | --- | --- |
| 开发方历史 `check-final.log` | [已核实] 历史记录，不作为本轮结论替代品 | 2026-09-09 17:17:08 CST / 09:17:08Z |
| 开发方历史 `build-final.log` | [已核实] 历史记录，不作为本轮结论替代品 | 2026-09-09 17:17:19 CST / 09:17:19Z |
| 开发方历史 `page-validation.json` | [已核实] 历史记录，不作为本轮结论替代品 | 2026-09-09 17:21:55 CST / 09:21:55Z |
| 本轮 `npm run check` | [已核实] exit 0；Foundation 558/558，TypeScript 通过，真实 Tailwind 编译通过 | 2026-09-09 17:55:16–17:55:25 CST |
| 本轮 `npm run build` | [已核实] exit 0；四条授权路由构建成功 | 2026-09-09 17:55:55 CST / 09:55:55Z |
| 本轮内容 adapter | [已核实] 14 passed / 0 failed | 2026-09-09 17:56:21 CST |
| 本轮 fallback | [已核实] 25 passed / 0 failed | 2026-09-09 17:56:42 CST |
| 本轮 A minor 回归 | [已核实] 162 passed / 0 failed | 2026-09-09 17:57:02 CST / 09:57:02Z |
| 本轮 01 页面测试 | [已核实] 233 passed / 0 failed | 2026-09-09 17:57:33 CST / 09:57:33Z |
| 本轮人工浏览器检查 | [已核实] 开发模式与默认生产模式均实际启动并检查 | 2026-09-09，页面测试后 |

- [已核实] 第一次隔离构建使用指向工作区外的 `node_modules` junction，Turbopack 因隔离根边界拒绝该 junction；随后改用哈希一致的完整物理副本重跑，`check` 与 `build` 均通过。前一次失败属于审查环境搭建，不计为产品 finding。

## B. Page results

| 页面 | 结论 | 证据摘要 |
| --- | --- | --- |
| `/chords` | `PASS` | [已核实] 默认显示 9 个真实结果；根音和类型筛选有效；`E + Minor` 有真实 0-results 状态并禁用匹配打印；未显示 power、7th、jazz 伪功能；每张卡直接显示组成音、bass、键位、播放、顺序播放与打印。 |
| `/chords/a-major` | `PASS_WITH_NOTES` | [已核实] 三个转位、键盘、播放、打印、PDF、响应式均通过；受 Low 无障碍命名 finding 影响。 |
| `/chords/a-minor` | `PASS` | [已核实] 作为回归基线通过 162/162；三转位、搜索、FAQ、音频取消、打印、PDF、响应式与降级路径均无回归。 |
| `/chords/c-major` | `PASS_WITH_NOTES` | [已核实] 三个转位、键盘、播放、打印、PDF、响应式及独立的右手根位 1–3–5 来源示例均通过；受同一 Low 无障碍命名 finding 影响。 |

## C. Component / Template review

### T06 — Chord Index

- [已核实] `/chords` 使用独立的 `ChordCenterPage` + `CenterExperience`，没有被强行塞入 T07 详情页结构。
- [已核实] T06 的筛选、当前结果、结果组打印与 no-results 状态由中心页自身管理；键盘、播放控件、打印视图、页内搜索和站点 chrome 复用共享实现。
- [推断] 状态归属符合中心页任务：筛选是 T06 特有状态，声音与打印快照集中管理，没有在每张卡复制独立业务状态机。

### T07 — Chord Detail

- [已核实] 三条详情路由都直接调用同一个 `ChordDetailPage`；该模板再调用同一个 `AMinorExperience`（在详情模板中别名为 `ChordDetailExperience`）。
- [已核实] A minor 使用 legacy adapter，A major/C major 使用 master-content adapter；页面差异来自数据和内容块，不是三份页面 JSX。
- [已核实] 三页共用同一个键盘视口、播放控件、音频实现、打印快照和打印视图；没有三份独立键盘/播放/打印逻辑。
- [推断] 未发现大量 `isAMinor` / `isAMajor` 分支、三份重复页面实现或为抽象而引入的明显复杂状态层。共享实现仍带 `AMinorExperience` 历史命名，但这本身没有造成功能分叉。

### Shared components

- [已核实] Summary/result：T07 由共享 Experience 生成；T06 由中心页结果卡生成，二者共享底层领域视图而不强行共用整页结构。
- [已核实] Piano keyboard geometry：`KeyboardViewport` + `Keyboard`。
- [已核实] Playback：`PlaybackControls` + 单一音频实现；切换时取消旧事件。
- [已核实] Print：`PrintVoicing`；T06/T07 都先固定当前快照再打印。
- [已核实] Filter/selector：T06 使用原生 `select`，键盘焦点路径已测试。
- [已核实] FAQ/related：内容块按页面数据渲染；related 由本地预览白名单与生产默认条件控制。
- [推断] Client Component 边界合理：交互状态位于两个 Experience 客户端边界内，内容读取和路由授权仍在服务端/构建侧。

## D. Data integrity

### `/chords`

- [已核实] 默认 9 项为 C major、A minor、A major、C minor、G major、E major、A-flat major、B major、C-flat major。
- [已核实] `A + any` 返回 A minor/A major；`C + minor` 返回 C minor；`B + major` 返回 B major；`C♭ + major` 返回 C-flat major；`E + minor` 返回 0 项。
- [已核实] B major 与 C-flat major 使用同一物理键集合时仍保留不同书写；C-flat 显示/打印为 C♭4–E♭4–G♭4，未自动改名为 B。
- [已核实] 九项的显示音名、MIDI 选键、共同播放频率、顺序播放时序与打印顺序均通过当前浏览器测试。

### `/chords/a-major`

- [已核实] Root：A4–C#5–E5，MIDI 69/73/76，bass A4，symbol A。
- [已核实] First：C#4–E4–A4，MIDI 61/64/69，bass C#4，symbol A/C#。
- [已核实] Second：E4–A4–C#5，MIDI 64/69/73，bass E4，symbol A/E。
- [已核实] Source of Truth 的 fingering 为 null；页面和打印未虚构指法。

### `/chords/a-minor`

- [已核实] Root：A3–C4–E4，MIDI 57/60/64，bass A3，symbol Am。
- [已核实] First：C4–E4–A4，MIDI 60/64/69，bass C4，symbol Am/C。
- [已核实] Second：E4–A4–C5，MIDI 64/69/72，bass E4，symbol Am/E。

### `/chords/c-major`

- [已核实] Root：C4–E4–G4，MIDI 60/64/67，bass C4，symbol C。
- [已核实] First：E4–G4–C5，MIDI 64/67/72，bass E4，symbol C/E。
- [已核实] Second：G4–C5–E5，MIDI 67/72/76，bass G4，symbol C/G。
- [已核实] 三个 voicing 的 fingering 均为 null；页面只在独立、已标明来源的右手根位示例中显示 C–E–G → 1–3–5，没有把该示例扩散到其他转位。

## E. Assets

| 页面 | 源 / public / URL | 当前结果 |
| --- | --- | --- |
| `/chords/a-major` | `docs/content/site-master/assets/chord-a-major.pdf` → `public/reference/assets/chord-a-major.pdf` → `/reference/assets/chord-a-major.pdf` | [已核实] 三段字节一致，44,640 bytes，SHA-256 `7B3EE891…FCC84A`；生产模式 HTTP 200，`application/pdf`；页面实际引用该 URL。 |
| `/chords/c-major` | `docs/content/site-master/assets/chord-c-major.pdf` → `public/reference/assets/chord-c-major.pdf` → `/reference/assets/chord-c-major.pdf` | [已核实] 三段字节一致，44,576 bytes，SHA-256 `FD534CA9…C7B662`；生产模式 HTTP 200，`application/pdf`；页面实际引用该 URL。 |
| `/chords` | `docs/content/site-master/preserved-chords/assets/piano-chord-chart-selected.pdf` → `public/reference/preserved-chords/assets/piano-chord-chart-selected.pdf` → `/reference/preserved-chords/assets/piano-chord-chart-selected.pdf` | [已核实] 三段字节一致，29,759 bytes，SHA-256 `BDAE2C20…2601BF`；生产模式 HTTP 200，`application/pdf`；页面实际引用 legacy 根。 |
| `/chords/a-minor` | 现有批准的 derived public PDF → `public/assets/chords/a-minor-notes-inversions.pdf` → `/assets/chords/a-minor-notes-inversions.pdf` | [已核实] 页面保持既有 URL，47,429 bytes，SHA-256 `CB741308…3F7C1`，生产模式 HTTP 200。asset map 明确记录 preserved 原始 PDF 不同且不导出，因此未要求迁移或强行做字节等同。 |

- [已核实] 新内容使用 `/reference/assets/`，legacy 中心页使用 `/reference/preserved-chords/assets/`，既有 A minor 保持 `/assets/chords/`；三类资源根没有被错误统一。
- [已核实] 本轮用 Poppler 完整渲染并人工查看 4 个静态资源 PDF（共 6 页）以及 11 个浏览器打印 PDF（共 20 页）；未见裁切、重叠、黑块、缺字或错误音名。

## F. Interaction

| 项目 | 结论 |
| --- | --- |
| Filter | [已核实] 根音、类型、组合筛选及清空恢复均有效；空结果重置当前项并禁用匹配打印。 |
| Play chord | [已核实] 真实浏览器点击后进入 playing；自动化浏览器验证每个目标的实际频率、同起音时间与持续时间。 |
| Sequential play | [已核实] 自动化浏览器验证按低到高的实际频率与 0.6 秒间隔；人工浏览器触发后切换选择能取消旧播放。 |
| Stop / quick switch | [已核实] Stop 清除当前 audio id 并禁用停止按钮；A minor → A major 快速切换时只有新 chord 保持 playing；选择/筛选变化取消旧节点且不自动播放。 |
| Print | [已核实] T07 三页每个转位均生成与当前选择一致的一页 PDF；T06 全部打印为 9 页，A 过滤结果打印为 2 页；快照在后续选择变化后仍稳定。 |
| PDF | [已核实] 四条页面 PDF URL 在默认生产服务器均为 HTTP 200、`application/pdf`，返回哈希与 public 文件一致。 |
| Focus / selected / disabled | [已核实] 选中项、键盘焦点、44px 控件、focus ring、forced-colors outline、无 JS/无音频 disabled 与说明均通过当前测试。 |
| Responsive | [已核实] 人工检查 1440px 与 390px；自动化浏览器另覆盖 320、768、1440，A minor 还覆盖 1024 与 200% 文本。所有被测宽度均无整页横向溢出，音名与选中键可读。 |
| Local review links | [已核实] development 下只有本地白名单中的已实现详情目标可进入；未开放其他 chord 详情路由。 |
| Default production links | [已核实] `NODE_ENV=production` 实际启动后，中心页详情入口与 T07 related local previews 均隐藏；PDF 保留；meta robots 保持 `noindex, nofollow`；未修改 published / ready 状态。 |

## G. Regression — `/chords/a-minor`

- [已核实] 当前独立回归为 162 passed / 0 failed，覆盖内容块、三转位、键位、实际 WebAudio 频率/时序、停止与销毁、键盘操作、搜索、FAQ、打印快照、PDF、无 JS、音频不可用、延迟恢复、响应式与控制台错误。
- [已核实] 1440 与 390 全页截图与最终 A minor 视觉参考保持同一版式系统；未见共享 T07 改动造成的布局、内容或交互回归。
- [已核实] A minor 继续使用其既有内容 adapter 和 PDF URL，没有被新 master adapter 或新资源根强制迁移。

## H. Findings

### F-01 — T07 比较表区域名称被硬编码为 A minor

- Severity：`Low`
- URL：`/chords/a-major`、`/chords/c-major`
- 组件 / 文件：`src/components/chords/detail-page.tsx:14`
- 复现步骤：
  1. [已核实] 启动当前站点并打开任一受影响 URL。
  2. [已核实] 定位 “Compare three positions” 区域。
  3. [已核实] 用浏览器 accessibility tree 检查包住表格的可滚动 `role="region"`。
  4. [已核实] 该 region 的名称为 “A minor inversion comparison table”。
- Expected：[推断] 区域名称应来自当前页面数据（例如 “A major inversion comparison table” / “C major inversion comparison table”），或由当前 section/table 标题通过 `aria-labelledby` 建立通用关联。
- Actual：[已核实] 共享模板固定写入 `aria-label="A minor inversion comparison table"`；A major/C major 的表格 caption 自身是正确的，但外层 region 名称错误。
- Evidence：[已核实] 本轮真实浏览器 accessibility tree 在 A major 和 C major 均复现；源码第 14 行与运行时 DOM 一致；A minor 页面该名称恰好正确。
- 建议修复范围：[推断] 只在共享 `ChordDetailPage` 将 region 名称改为由 `data.chord.name_en` 生成，或改用对应标题的 `aria-labelledby`，并为三条详情路由增加页面特定 accessible-name 断言。无需修改音乐数据、可见文案、URL、Design System 或发布状态。

## I. NOT TESTED / Remaining risk

- `NOT TESTED`：[已核实] 人耳试听。当前已验证真实浏览器 WebAudio 的 oscillator 频率、起止时间、取消与销毁，但审查工具不能代替人类听感确认。
- `NOT TESTED`：[已核实] 操作系统原生打印对话框和实体纸张输出。当前已验证浏览器打印调用、打印快照及全部生成 PDF 的页面内容与裁切。
- `NOT TESTED`：[已核实] NVDA / JAWS / VoiceOver 端到端屏幕阅读器。当前只检查了浏览器 accessibility tree，并由此发现 F-01。
- `NOT TESTED`：[已核实] 真实手机硬件与触摸手势。当前使用真实桌面浏览器的 320/390/768/1024/1440 viewport 与键盘路径。
- `NOT TESTED`：[已核实] 生产部署、CDN、缓存和公网下载。当前只验证本地 production build/start；项目未部署。
- `NOT TESTED`：[已核实] 鼠标 hover 的独立视觉截图。当前工具未提供 hover 操作；源码样式存在不作为运行时通过证据。selected、focus 与 disabled 已实测。
- [已核实] 审查完成后尝试删除两个位于用户临时目录的隔离测试副本，但执行环境的删除策略拒绝了递归删除；副本不在项目工作区内，且其中的产品区域与本轮开始时的工作区哈希一致。

## Evidence index

- [已核实] `machine/batch-page-validation.json`：本轮 233/233。
- [已核实] `machine/a-minor-regression.json`：本轮 162/162。
- [已核实] `machine/adapter-validation.json`：本轮 14/14。
- [已核实] `machine/fallback-validation.json`：本轮 25/25。
- [已核实] `screenshots/`：四页的 1440 与 390 当前运行全页截图。
- [已核实] `print-pdfs/`：T07 三页各三转位、T06 全部/筛选打印 PDF。
- [已核实] `pdf-renders/`：上述打印 PDF 与四个静态资源 PDF 的逐页渲染证据。
