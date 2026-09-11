# PianoGrid chords v2 — 实施记录

## B1 · 2026-09-11

**[已核实] 已完成本批局部实现及本地验证，停在样板确认处。未开始 B2/B3，未提交、push 或部署。**

用户已批准 `review.md` 缩减后的 B1。实施依据为审阅第 6.1–6.3 节及 `03_IMPLEMENT_PROMPT.md`，没有按旧生成图取色。

### 范围与基线

- [已核实] 起点 HEAD：`00328ddcc46ab87ed9fb9d1548de6038942b48b1`；从 `main` 创建本地分支 `codex/chords-b1`，HEAD 未变。原未提交工作原样带入；没有 reset、clean 或覆盖整份旧文件。
- [已核实] 本批开始时，R0 审阅所记录的全部已有文件 SHA-256 均未变化。证据：[开始基线](evidence/b1/workspace-before.json)。其中完整记录了既有用户改动，包含四条入口、共享样式/详情、音频、首页/歌曲、检查脚本及历史报告等。
- [已核实] 已有源码只做以下增量，原内容包、PDF、只读参考、全站 tokens、导航、Header/Footer、依赖与锁文件保持原字节。终检：[结束基线](evidence/b1/workspace-after.json)。

| 文件 | 本批增量 |
|---|---|
| `src/components/chords/center-page.tsx` | 标题后插入 6 项轻量目录 |
| `src/components/chords/center-experience.tsx` | 将已有 `chartIntro` 从 19 张卡片之后移到 Find a chord 标题之后、筛选之前 |
| `src/components/chords/center.css` | 前移说明的局部上间距从 2rem 改为 1rem |
| `src/components/chords/detail-page.tsx` | 仅 Am 显示 9 项目录；为原 Root-position example 增加锚点；恢复 next 区块渲染 |
| `src/lib/a-minor-content.ts` | 在适配层依照实际 `isPublicRoute` 恢复原 next 链接；复用原 A major 链接到原比较段之后；本页搜索纳入恢复章节 |
| `src/components/chords/page-toc.tsx`、`page-toc.css`（新增） | 原生 nav/ul/a，换行布局、44px 触控高度，复用现有 token；无新交互状态或依赖 |
| `scripts/check-a-minor.mjs` | 仅将原“next 隐藏”断言改为批准后的三条链接、原标签及比较链接断言；保留其余已有用户修改及失败断言 |
| `scripts/check-foundation.mjs` | 明确加入两个获准目录文件白名单，并把新 CSS 纳入既有规则检查；没有放开目录或路由白名单 |

[已核实] 文档及证据只写在本任务目录。检查工具会写入固定历史报告，因此本轮 runner 保存原字节、执行原检查、将新报告复制至 `evidence/b1/checks/`，最后恢复原报告。终检确认历史报告未被覆盖。Next 开发预览曾产生类型导入路径变化，生产构建结束后 `next-env.d.ts` 与起始哈希一致，无最终增量。

### 内容映射与最终顺序

[已核实] `review.md` 第 4 节逐项映射继续有效。前后 DOM 对比按原段落、步骤、表头/单元格、FAQ 文本的**出现次数**核对，并核对原 ID、链接、figure 文本；四页均无遗漏。浏览器关闭 JS 后也能读取基线全部正文。证据：[四页对比](evidence/b1/comparison.json)、[专项报告](evidence/b1/b1-validation.json)、`before/dom.json`、`after/dom.json`。

| 类型 | 原项 / 实际去向 |
|---|---|
| KEEP | 中心 H1 与首段、两项独立筛选、清除、19 张卡片、当前和弦选择、键盘/播放/停止、各种打印、PDF 和音色说明全部保留 |
| MOVE | 中心 intro 第二段集合边界＋chart 两段查询/大小调比较说明，从卡片之后移至 Find a chord 之后；逐字保留 |
| KEEP | 中心读图两段四步、大小比较两段/两行表/四图、打印两段、4 条 FAQ、Am 入口继续按原顺序位于结果之后 |
| ADD | 中心目录：查询、读图、大小比较、打印、FAQ、Am 入口；均指向原有 ID |
| KEEP | Am 原面包屑/H1/答案、工作区两段工具说明、Root-position example 两段、找键两段三步、转位两段三行、小和弦原理两段、文字练习一段四步、打印两段双操作、4 条 FAQ 全部保留 |
| ADD | Am 原标题与工作区之间增加目录；原位示例增加 `am-root-example` 锚点，其余指向既有章节；Practice 指向原文字练习，不是新评分功能 |
| CORRECT / ADD | `am-next` 历史“全部未发布”的渲染判断改为真实路由判断；在 FAQ 后恢复原 `/chords`、`/chords/a-major`、`/scales/a-minor` 三链接；原标签不变，原 JSON 不改 |
| ADD | Am 原“Only the third changes”比较段落之后加原 A major 链接。没有重写理论或新增 URL |
| KEEP | A major、C major 正文、默认八度、三转位、打印/PDF、C 现有独立指法说明与原相关入口不变；本批没有给它们套用新目录 |
| REMOVE | 无。没有删除正确正文、辅助状态、控件、来源文件或资源 |

[已核实] 页面职责、canonical、title、description、robots 与原样本相同。四页继续静态预渲染，生产构建原始页面通过无 JS 内容核对；没有新业务路由。

### 桌面 / 手机对照与主题

**[前后对照画廊](evidence/b1/comparison.html)**：四组图片并排，点击可看原尺寸。原图均为实际 Chrome 本地截图，并已查看；不是生成图或像素差分替代验收。

| 页面 / 视口 | 修改前 | B1 修改后 |
|---|---|---|
| 中心，1440×900 | [桌面前](evidence/b1/before/chords-1440-top.png) | [桌面后](evidence/b1/after/chords-1440-top.png) |
| 中心，390×844 | [手机前](evidence/b1/before/chords-390-top.png) | [手机后](evidence/b1/after/chords-390-top.png) |
| Am，1440×900 | [桌面前](evidence/b1/before/a-minor-1440-top.png) | [桌面后](evidence/b1/after/a-minor-1440-top.png) |
| Am，390×844 | [手机前](evidence/b1/before/a-minor-390-top.png) | [手机后](evidence/b1/after/a-minor-390-top.png) |

补充截图：[中心手机筛选](evidence/b1/after/chords-390-filters.png)、[Am 理论和原练习](evidence/b1/after/a-minor-1440-reading.png)、[Am 手机 FAQ/下一步](evidence/b1/after/a-minor-390-end.png)、[第一转位桌面](evidence/b1/after/a-minor-1440-first-inversion.png)、[第一转位手机](evidence/b1/after/a-minor-390-first-inversion.png)。同一 Chrome、同一视口的前后图来自本批开始和 B1 修改后两个源码状态。截图圆形 N 属于 Next 开发指示器，不是产品新增按钮。

[已核实] 实际主题保持：白背景 `#FFFFFF`、正文 `#1D1D1F`、表面 `#F6F7F9`、主色 `#0066CC`、边框 `#E1E4E8`、选中浅蓝 `#EAF2FF`；使用原系统字体、字号、圆角和无阴影表现。新业务 CSS 没有新增颜色字面值，只用现有变量；局部目录选择器不作用于别的组件。画廊 HTML 的样式仅用于本地报告，不进入产品。

[已核实] 四页 body、H1、播放按钮、选中琴键/黑键、header/footer 的抽样 computed style 前后一致；背景、字体、字号、行高、边框、圆角与阴影均记录在 `before/dom.json`、`after/dom.json`。中心 67rem 起双列卡片保留，320/390/768/1440 无页面级横向溢出；局部琴键滚动继续存在，三详情各转位高亮键均可见。

[推断｜样板取舍] 目录使长页面后部可直接到达，前移说明使查询前能了解收录边界；代价是首屏展示的工具内容减少，尤其手机中心页需要继续滚动才能看到筛选。Am 手机目录占 4 行，琴键移到首屏以下。这不是已经证明转化或效率更优的结果；本批按批准顺序保留完整文案和原字号，供用户据真实对照判断，不用缩字、折叠正文或删目录来掩盖取舍。

### 交互复现与边界

| 操作 | 结果 / 证据状态 |
|---|---|
| 页内目录 | [已核实] 点击或 Tab＋Enter 跳到对应章节，焦点落在章节；关闭 JS 仍可用。全部锚点存在、ID 唯一，链接触控高度至少 44px；不是 sticky 侧栏或 tabs |
| 根音、类型、组合、清除 | [已核实] 复用原筛选器；可独立筛选、保持两项选择，清除恢复 19 项；原脚本覆盖 C♭＋minor 空集及禁用匹配打印。没有强制选择顺序或添加不支持类型 |
| Am 转位 | [已核实] Root / First / Second 同步音名、MIDI 高亮、符号、低音与唯一当前表格行；First 显示 C4–E4–A4、Am/C、Bass C4；改变排列不改页面和弦身份 |
| 播放 / 停止 / 切换 | [已核实] 原和弦同时播放与逐音播放保留，原脚本验证频率、事件时序、停止断连、选择/页面生命周期取消。未做人耳听音结论 |
| 延迟音频恢复 | [已核实] 补充注入延迟后 Stop 或切换转位，已创建的 3 个节点全部停止/断连，恢复后状态为 stopped/idle、0 个 sounding 标记；见生产专项报告。不是声波录制证据 |
| 打印 | [已核实] 原脚本检查三转位打印快照、屏幕选择改变后快照稳定、afterprint 释放、原浏览器直接打印及错误反馈；中心保留当前/单卡/匹配集合打印。实际执行了 headless print-media 与 PDF 导出，没有操作实体打印机 |
| PDF | [已核实] 原四份资源文件哈希不变；中心仍明确是 original 9-chord PDF，网页 19 项没有被冒充成 PDF 19 项；Am 无指法说明保留 |
| 搜索 / FAQ | [已核实] 既有本页搜索、Escape 关闭恢复焦点、FAQ 键盘开合保留；恢复的 next 章节也能通过 notes and forms 检索 |
| 无 JS / 音频错误 | [已核实] 四页静态正文、琴键、PDF 保留，播放控件禁用；Am 不可用/启动错误注入检查通过，答案及转位/打印能力不被错误覆盖 |
| 尚未实施 | [已核实] 新答题练习、评分、左右手/新指法案例、倒序播放、八度选择、Schema 重建、A major 反向语境链接及 A/C 新目录均未实现；不显示假控件 |

### 实际验证结果

| 命令 / 检查 | 结果 | 报告 |
|---|---|---|
| `node .../evidence/b1/capture.mjs before` / `after` | [已核实] 四页原文本、ID、链接、图示无遗漏；metadata/token/computed 抽样相同 | [comparison.json](evidence/b1/comparison.json) |
| `node node_modules/typescript/bin/tsc --noEmit --incremental false` | [已核实] exit 0 | [typecheck.log](evidence/b1/checks/typecheck.log) |
| `node scripts/check-foundation.mjs` | [已核实] 564 通过、0 失败；原历史文档提示保留 | [foundation.json](evidence/b1/checks/foundation.json) |
| `node scripts/check-css.mjs` | [已核实] exit 0，Tailwind 编译/语义工具/cn 检查通过 | [tailwind-compile.json](evidence/b1/checks/tailwind-compile.json) |
| `node scripts/check-integration-data.mjs` | [已核实] 153 通过、0 失败 | [data-validation.json](evidence/b1/checks/data-validation.json) |
| `node scripts/check-a-minor.mjs`，输出路径设为本批 | [已核实] 165 通过、2 失败，exit 1 | [page-validation.json](evidence/b1/am-regression/page-validation.json) |
| `node scripts/check-chord-batch.mjs`，输出路径设为本批，已有 `/`、`/scales` 传入 later-batch 路由参数 | [已核实] 231 通过、2 失败，exit 1 | [page-validation.json](evidence/b1/chord-regression/page-validation.json) |
| `node .../evidence/b1/check-b1.mjs` | [已核实] 126 通过、0 失败：锚点/焦点/窄屏/无JS/恢复链接等 | [b1-validation.json](evidence/b1/b1-validation.json) |
| `node node_modules/next/dist/bin/next build`（项目 `npm run build` 的实际命令） | [已核实] exit 0；四页为静态预渲染，保留原 17 条业务路由 | [build.log](evidence/b1/checks/build.log) |
| `npm run start -- --hostname 127.0.0.1` ＋ `node .../evidence/b1/check-production.mjs` | [已核实] 6 通过、0 失败：四页生产 SSR 内容/metadata，两个延迟音频取消场景 | [production-validation.json](evidence/b1/production-validation.json) |

[已核实] Foundation/CSS/类型检查分别执行了原命令，没有声称另行跑过 `npm run check` 包装命令。固定报告保护与完整命令退出码见 [run-checks.mjs](evidence/b1/run-checks.mjs)、[commands.json](evidence/b1/checks/commands.json)。没有安装依赖、自动更新快照或删除失败测试。

**四项失败及实际影响：**

1. [已核实] Am 两项 `late resume schedules no sound` 断言实际判断 `nodes.length === 0`。本批未修改的音频实现为已有 iOS 修复：在首次 await 前创建并启动节点，再等待 resume，因此“未创建节点”不再代表当前取消契约。本轮保留原失败断言；另测已创建节点确实停止/断连，结果通过。不能据此声称真机 Safari 或听音已通过。
2. [已核实] A major / C major 两项 metadata 断言比较 master 旧 title，与当前入口/适配器标题不一致。四页前后实测 title/description/canonical/robots 相同，生产 HTML 同样通过。本批不把 B2 候选的旧测试预期整理提前实施。

[已核实] 新 next 行为是明确批准的 B1 变化，因此对应测试由“隐藏”改为严格核对三条已发布路径及原标签；这是针对实际新契约的验证，不是放宽上述四项失败。Foundation 仅增加获准的两个文件名，没有全面放开白名单。

未执行完整 `check-integration-batch.mjs`、`check-integration-production.mjs` 或全站 17 页端到端矩阵；本轮共享影响通过四和弦页回归、Foundation、数据检查和构建核对。没有做真机 Safari、人耳试听、真实读屏、实体打印或 PDF 标签无障碍验收。以上不因 B1 通过而自动解除。

### 停点

[已核实] 本批源码增量、前后图、交互说明和验证证据已保存。开发预览和生产验证服务均已停止；本地分支保留未提交改动，供审阅。没有主题例外、内容删除、依赖调整或新 URL；没有提交或部署。

[推断] 样板已可供用户确认顺序及目录密度，但不应把“技术检查通过”写成“用户已认可视觉定稿”。中心手机滚动距离这一取舍已明确呈现。到此停止；B2/B3 需另行明确批准。

## B1 追加 · 参考图的图标与分组增强 · 2026-09-11

[已核实] 用户要求参考四张图中的内容图标和样式，丰富现有页面。本次作为 B1 样板追加，只调整 `/chords` 与 `/chords/a-minor` 的表现。图片内的指法、谱表、更多和弦类型、练习及 Schema 文案不视为实施指令。

- [已核实] 标题增加声波图标；目录和章节使用键盘、书本、比较、层叠、靶心、打印、问号、链接图标，沿用现有 SVG 线宽风格与蓝色 token。图标 `aria-hidden`，文字标签完整保留。
- [已核实] 中心读图说明、Am 理论和原文字练习增加浅灰表面与边框分组；原下一步链接改为带方向箭头的资源卡片，桌面两列、手机单列。不是用卡片摘要替换原文。
- [已核实] 本轮业务编辑仅为 `page-toc.tsx`、`page-toc.css`、`center-page.tsx`、`detail-page.tsx`。没有新依赖、全局主题、URL、数据或音频逻辑变化；A/C 详情不渲染这些图标/面板。
- [已核实] 与上一版 B1 比较，四页原段落/步骤/表格/FAQ、ID、链接和图示无遗漏，metadata、主题变量及原组件 computed 抽样一致。见 [comparison.json](evidence/b1-refinement/comparison.json)。
- [已核实] 新一轮专项浏览器检查 126 通过、0 失败；320/390/768/1440 无页面级溢出，目录键盘焦点、无 JS 内容和三详情转位可见性通过。类型检查、CSS、Foundation（564/0）、数据检查（153/0）、生产构建 exit 0。见 [专项报告](evidence/b1-refinement/b1-validation.json)、[命令与退出码](evidence/b1-refinement/checks/commands.json)。
- [已核实] 本次没有重新运行完整音频/打印脚本或生产启动验证；上一批的四项旧断言失败及人工验证限制继续保留，不能用本次样式检查替代。
- [已核实] 新截图已实际查看；[新版与上一版 B1 对照](evidence/b1-refinement/comparison.html)，包括桌面/手机首屏、理论练习分组和第一转位状态。旧 B1 证据未覆盖。
- [推断] 内容图标和局部分组有助区分章节；仍需用户根据实际画面判断密度。保持完整正文、原字号和现有查询顺序，不以图示丰富为由加入缺少数据的控件。

[已核实] 终检还发现首页两个文件及两个历史检查报告与上一版 B1 的哈希不同；本轮工具未编辑首页文件，也未回退这些差异。检查 runner 恢复的是本轮启动时保存的报告字节。无法仅凭哈希确认这些其他变化的来源，记录见 [changed-since-b1.json](evidence/b1-refinement/changed-since-b1.json)。

[已核实] 开发预览已停止。继续停在 B1，未开始 B2/B3，未提交、未部署。

## B1 追加 · Quick facts 信息卡 · 2026-09-11

[已核实] 为回应样例信息密度偏低的问题，Am 工具区增加 Quick facts 四格信息卡：Notes、Quality、Formula、Keyboard range，全部来自现有 `AMData` 字段或已核对的固定性质；没有新增音符、谱表、指法或交互。桌面四列、手机两列，沿用现有 surface/border/primary token。

[已核实] 追加改动仅涉及 `src/components/a-minor/experience.tsx` 与 `src/app/chords/a-minor/a-minor.css`；TypeScript 检查和 `git diff --check` 通过。五线谱仍暂缓，原因与上一节相同。

## B1 追补 · Root-position example 与谱表判断 · 2026-09-11

[已核实] 根据用户在本地预览中指出的视觉问题，`Root-position example` 已从弱化的灰色普通段落调整为与其他学习模块一致的浅灰面板：保留两段原文，增加已有线性图标、明确标题层级、边框、圆角和移动端纵向布局。没有新增文案、颜色 token 或功能。

[已核实] 第二张参考图的 Staff notation 不在本次加入。当前 Am 数据有核对的音名、MIDI、键盘图和打印数据，但没有可复用的真实五线谱渲染组件或该和弦的已核对谱表位置字段；现有 `blank_staff` 资产是空白谱纸，不能据此绘制 Am。直接照图加入会把示意图误作真实功能，因此暂缓。若后续要加入，应先准备逐音符/八度/谱号数据与无障碍文本，再单独批准实现。

[已核实] 本追补仅改 `src/components/chords/detail-page.tsx` 与 `src/components/chords/page-toc.css`。类型检查通过；前后 DOM 内容、链接、metadata 和主题变量仍无遗漏或变化。新截图与专项报告位于 [b1-refinement](evidence/b1-refinement/)。

## B2 · 最小数据适配与三详情复用 · 2026-09-11

### 范围与结论

[已核实] 本批以 `dd74bfcd6b22b2785235718c5295598d7eec5f25` 和 B2 开始时的未提交工作区为基线，只整理现有 `/chords`、`/chords/a-minor`、`/chords/a-major`、`/chords/c-major`。没有新增 URL、依赖、主题 token、Header/Footer 设计、提交或部署，也没有开始 B3。

[已核实] 实际代码是 Next.js 16 App Router。四个 route 都是 Server Component；详情 route 在服务端调用统一的 `getChordDetail(route)`，共享 `ChordDetailPage` 骨架，把已构造的数据和服务端章节节点传给现有客户端交互组件。浏览器没有再次 fetch 和弦数据。生产构建把四页标记为 `Static`，关闭 JavaScript 和直接读取响应 HTML 均能获得核心内容。

[已核实] `/chords` 在 B2 前已经由 `getChordCenter()` 从 site master 的统一 chord/voicing 集合产生 19 项，因此本批没有重写 hub。根音与类型保持独立筛选；只有 Am、A major、C major 提供真实详情入口，其余结果不生成新 URL。

### 架构

| 职责 | B2 结果 |
|---|---|
| 数据入口 | `getChordDetail('/chords/a-minor' | '/chords/a-major' | '/chords/c-major')` 成为三个详情 route 的统一入口；Am 继续读取其专用内容包，A/C 继续读取 site master，没有搬移或改写只读来源 |
| 类型 | `ChordDetailModel` 明确区分 chord definition、三个具体 voicing、页面 blocks、TOC、可选 fingering example；保留兼容别名 `AMData`，避免无关组件重写 |
| 构建时约束 | `finalizeChordDetailModel` 核对 route/canonical/slug、quality/formula、三个排列、音符拼写、最低音、MIDI、键盘范围、音频事件、打印数据、TOC 目标及可选指法来源绑定；异常会在构建/测试时直接失败 |
| 共享模板 | 三详情继续使用既有 `ChordDetailPage` 和 `AMinorExperience`；统一标题、页内目录、Quick facts、工具区、转位表、打印及响应式结构，各页正文仍来自各自 block |
| 客户端边界 | 播放、停止、逐音、转位选择、打印快照和本页搜索保留在现有 client component；route、metadata、数据读取、页面骨架和正文节点由服务端构造 |
| 静态策略 | 沿用现有显式 route 文件与静态预渲染，没有改成动态 URL、`ssr:false` 或客户端数据请求 |
| Schema / JSON-LD | 没有新增 `.schema.json` 或 JSON-LD。当前 TypeScript 类型、运行时构建约束、适配器测试和静态构建已经覆盖本批的数据可靠性；现有页面没有可证明需要新增的 Google 支持类型 |

[已核实] 同一个 voicing 的 `notes_low_to_high` 继续驱动屏幕音名和低音；构建约束要求 keyboard/print MIDI、together/ascending audio MIDI 与它完全一致。打印保留来源数据中的 ASCII `#`/`b`，屏幕显示保留音乐符号 `♯`/`♭`，校验时只做等价拼写归一，不改 MIDI 或音区。

[已核实] C major 现有右手原位案例被建模为独立 `FingeringExample`，绑定 `c-major--root`、hand、notes、finger numbers、range/source/verification；Am 与 A major 没有核实指法，仍为空。页面继续显示 C 原有来源正文，没有把该案例推广到其他转位或和弦。

### 内容保留

| 动作 | 结果 |
|---|---|
| KEEP | 四页原 H1、答案、说明、完整键盘、三转位、音名/低音/符号、两种播放与 Stop、打印/PDF、理论、FAQ、来源说明、相关入口、无 JS 状态全部保留 |
| MOVE | 无；B1 已确认的顺序没有再次调整 |
| ADD | A/C 接入与 Am 相同的标题/目录/Quick facts/转位当前行语义；A major 的既有对比说明增加真实 `/chords/a-minor` 入口；只增加展示结构和已验证关系，不增加正文替代品 |
| CORRECT | Quick facts 的 Quality 从硬编码 `Minor triad` 改由 chord quality 产生，A/C 正确显示 `Major triad`；A major 工具区显示 `C♯`；200% 文本缩放时把逐字动画切换为可换行的完整按钮标签；测试中的旧 title、旧延迟音频和旧路由期望按当前已核实契约修正 |
| REMOVE | 无业务内容或能力被删除；没有加入缺少数据/组件的谱表、通用指法或练习评分 |

[已核实] 原内容 JSON、site master、PDF 与 design tokens 不在 B2 变更列表；四页正文断言、直接响应 HTML、无 JS DOM、metadata/canonical、相关链接均通过。A major、C major 没有复制 Am 的理论、练习或 FAQ；只渲染各自实际存在的 blocks。

### 交互与验证

| 检查 | 实际结果 | 证据 |
|---|---|---|
| `npm run check` | [已核实] Foundation 565/565；TypeScript exit 0；Tailwind/CSS 与 17 条授权路由检查通过 | [project-check](evidence/b2/project-check/) |
| `node scripts/check-integration-data.mjs` | [已核实] 153/153 | [data-validation.json](evidence/b2/integration-data/data-validation.json) |
| `node scripts/check-content-adapters.mjs` | [已核实] 16/16；定义、三个排列、SSOT 约束、来源绑定与错误输入失败路径通过 | [adapter-validation.json](evidence/b2/adapter-validation.json) |
| `node scripts/check-chord-batch.mjs` | [已核实] 251/251；hub、A/C 三转位、音频频率/时序/停止、打印/PDF、响应式、无 JS、正文和链接通过 | [page-validation.json](evidence/b2/chord-regression-final/page-validation.json) |
| `node scripts/check-a-minor.mjs`（生产服务） | [已核实] 167/167；Am 三转位、音频错误/取消、打印、搜索、FAQ、键盘和多视口通过 | [page-validation.json](evidence/b2/production-am-regression/page-validation.json) |
| `npm run build` | [已核实] exit 0；22 个 App Router 输出全部静态生成，含四条和弦业务路由 | [build-result.json](evidence/b2/build-result.json) |
| 生产 raw HTML / no JS / UI | [已核实] 40/40；三详情 initial HTML 已含定义、公式、键盘、转位、正文、目录、metadata/canonical；三排列联动与 hub 真实详情链接通过 | [b2-validation.json](evidence/b2/production-browser/b2-validation.json) |
| `git diff --check` | [已核实] exit 0 | 命令输出无错误 |
| lint | [已核实] `package.json` 没有 lint script 或独立 lint 配置，因此没有声称执行 lint；项目规定的 `npm run check` 已执行 |

[已核实] 桌面与手机截图已实际查看：A major 和 C major 的标题、目录、Quick facts、键盘与转位结构一致，原白/灰/蓝主题保持，390px 无页面级横向溢出。截图和 raw HTML 位于 [production-browser](evidence/b2/production-browser/)；全尺寸与打印证据位于 [chord-regression-final](evidence/b2/chord-regression-final/) 和 [production-am-regression](evidence/b2/production-am-regression/)。

[已核实] 自动音频测试核对当前排列传给 Web Audio 的 MIDI/频率、同时与逐音 onset、Stop/切换取消和节点断连；它不是人耳试听。自动打印测试覆盖当前排列快照、三详情 PDF、hub 当前/筛选/全部打印和 print-media 裁切；它不是实体打印或 PDF 标签无障碍检查。

### 问题、并行工作区与停点

[已核实] B2 期间检测到 `src/components/site-navigation.tsx`、`src/components/site-navigation.css` 与若干既有 site-integration 报告在 B2 基线之后发生变化；本批没有编辑或回退这些并行改动。生成式检查曾更新 `checks/batches/01-chords`，最终报告复制到 B2 evidence 后，已按 B2 起始状态恢复该历史目录；没有覆盖其原记录。

[已核实] 尚未执行人耳试听、真机移动设备、真实读屏、实体打印或 PDF 标签无障碍验收。当前 chord 数据没有可复用的真实五线谱组件/谱表位置字段，因此仍不新增 staff notation；这不应被描述为谱表能力已完成。

[推断] 现有架构已满足这三个详情继续按显式 route 扩展的基础条件；将来增加和弦仍需要真实内容、voicing、来源与 URL 的单独批准，不能仅凭类型存在就批量生成页面。

[已核实] 本批停在 B2。开发预览保留在 `http://127.0.0.1:3000` 供本地审阅；未提交、未部署，未开始 B3。

## 2026-09-11 — B3

[已核实] B3 已完成：四页补齐必要理论、三个详情共六个有来源的原位单手案例、一个复用的带反馈网页键盘练习和真实章节内链；范围内生产检查、既有和弦回归及隔离静态构建通过。综合状态为 `PASS_WITH_NOTES`，备注为明确的人工待测项及全站旧脚本的两条非 B3 失败。详见 [B3_RESULT.md](B3_RESULT.md)。
