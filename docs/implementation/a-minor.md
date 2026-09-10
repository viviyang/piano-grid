# A minor 单页实现与本地验收

日期：2026-09-09，Asia/Shanghai。阶段：Page Implementation 01 — `/chords/a-minor`。

本文中的 PASS / FAIL 均来自本轮工具输出；NOT RUN 表示未执行，不计为通过。

## 结果与入口

- [已核实] `/chords/a-minor` 已实现并返回 HTTP 200。最终开发访问地址：`http://127.0.0.1:3000/chords/a-minor`。
- [已核实] 原开发服务继续运行；本轮临时生产服务在 3001 端口用于构建验收和截图，验收后停止。最终状态见 `checks/page-01-a-minor/11-service-status.json`。
- [已核实] `/`、`/chords` 返回 404，未新增其他业务页面、API、独立打印路由或组件展厅。保留 noindex/nofollow；未设置猜测的 canonical、sitemap 或 Schema。
- [已核实] `npm run check`、162 项真实 Chrome 页面测试和 `npm run build` 均通过。没有重新安装、升级或新增依赖。
- [已核实] 没有影响本页继续验收的阻塞。原始 assets 缺失已按任务顺序处理；真人听音、真机、屏幕阅读器与实体打印仍未验收。

## 环境与保留项

[已核实] Windows、Node 24.14.1、npm 11.11.0；沿用已安装的 Next 16.3.4、React/React DOM 19.2.8、Tailwind/adapter 4.3.3、PostCSS 8.5.23、TypeScript 5.9.3。声明范围与安装记录见历史 `docs/design/local-validation.md`；本轮未修改 package.json 或 package-lock.json。

[已核实] 保留 `--container-pr-tool-width` / `--spacing-pr-tool` 的分名、同步 cn 修复、Tailwind v4 源码扫描与增强的编译断言。根 layout、globals.css、tokens.css、foundation.css、utils.ts 和 `next.config.ts` 未修改，`agentRules: false` 保持关闭 Next 自动改写规则。

[已核实] 现有 Git 修改属于同一上层工作区其他文件，开始与结束状态一致，本轮未触碰。项目多数文件被上层忽略规则覆盖；未修改该忽略规则，也未 commit/push。不能用 Git 状态为空推断本页文件不存在。

## 实现文件与数据流

| 文件 | 职责与原因 |
|---|---|
| `src/app/chords/a-minor/page.tsx` | 新增唯一业务路由；Server Component 读取 JSON，输出 metadata、标题、正文、表格、FAQ。 |
| `src/app/chords/a-minor/a-minor.css` | 最终参考的局部布局迁移到 `.am-page` 内；沿用 Foundation 变量，不复制原型全局主题。 |
| `src/lib/a-minor-content.ts`、`a-minor-types.ts` | 单页轻量类型与服务器内容适配，提取三个 voicing、播放事件和 print_data。 |
| `src/lib/a-minor-audio.ts` | 按内容包频率、onset、duration 调度 Web Audio，处理取消、异步竞争和错误。 |
| `src/components/a-minor/experience.tsx` | 本页交互边界、唯一 selectedVoicingId、打印快照和音频生命周期。 |
| `src/components/a-minor/keyboard.tsx` | 读取 C3–C5 数据绘制 15 白键、10 黑键；选中与发声状态独立。 |
| `src/components/a-minor/icon.tsx`、`page-search.tsx` | 已定稿图标几何、本页搜索 dialog 与焦点返回。未建立通用组件库。 |
| `public/assets/chords/a-minor-notes-inversions.pdf` | 可下载的一页三位置派生 PDF，来源和哈希见下。 |
| `scripts/check-a-minor.mjs` | 新增实际浏览器、数据、音频事件、打印、响应式、键盘和降级检查。 |
| `AGENTS.md` | 仅把禁止全部业务实现的阶段限制改为本页授权；其他长期约束保留。 |
| `scripts/check-foundation.mjs` | 原无页面/组件守卫迁为精确单页、四个组件文件、单个 PDF 白名单；继续阻止其他路由。变量未定义/循环检查覆盖新增页面 CSS，补查 agentRules。 |
| `scripts/check-css.mjs` | 保留全部真实编译与 cn 断言，仅将本轮输出迁到本轮目录，保护历史验收。 |
| `README.md`、`docs/project-context.md` | 更新为实际阶段、运行入口、资产与检查状态。 |

[已核实] 正文由服务器作为 React 内容传给交互边界；客户端不导入全部 URL/关键词/来源台账，不携带 PDF base64。核心原位答案与图示服务器首屏可读，无 `ssr:false`、整份 HTML 注入或旧原型脚本挂载。页面只读内容包，没有通用 CMS 或状态库。

## 九个内容块映射

| block_id | 实际位置 / 隐藏原因 |
|---|---|
| am-intro | 首屏标题与直接答案；剩余段落位于工具后，明确标为 Root-position example。 |
| am-result | 工具区：固定组成音 A–C–E、公式、当前位置、键盘、播放/打印、两段说明。 |
| am-find-notes | 找音章节，原文段落、步骤均保留；也是打印中非指法说明的来源。 |
| am-inversions | 转位解释和完整 Notes/Bass 表格；当前行随唯一选择同步。 |
| am-why-minor | 小三度/大三度解释，沿用原文。 |
| am-practice | 原文练习步骤，未添加节拍器、速度、指法等功能。 |
| am-print | 原文打印说明，实际 PDF 下载及当前选择打印。 |
| am-questions | 原文问题和答案，原生 details/summary 折叠。 |
| am-next | 源数据保留；全部目标尚未实现，因此整体隐藏，不输出死链接。 |

[已核实] 已确认的呈现层调整仅为：am-intro 第一段首句作为答案，其余文字下移；原句起始 `The example below` 按最终 HTML 改为 `The root-position example`，使静态原位说明不误指当前转位。未改正文的音乐事实或关键词。页脚 `Local design preview` 改为 `Local page preview`，说明现在是实际页面。导航和 breadcrumb 的未实现目标保持非交互视觉标签，不将其全部指向本页。

## 交互与降级

- [已核实] 三位置由内容 JSON 派生：Am / A3–C4–E4 / Bass A3；Am/C / C4–E4–A4 / Bass C4；Am/E / E4–A4–C5 / Bass E4。Root 始终为 A，公开指法 null 不显示。
- [已核实] 单选支持方向键、空格与可见焦点；切换不自动播放。手机仅键盘区域横滚，切换使三个选中音可见；保留完整 C3–C5 音区。
- [已核实] Play chord、Play notes one at a time、Stop 可操作。声音是 sine 合成参考音，保留非原声钢琴录音说明。按已有原型使用 35ms 提前调度和音量包络，不变更 JSON 的事件音高/时序。
- [已核实] 状态包含 idle/loading/playing/stopped/error/unavailable。generation 与 AbortController 防止延迟 resume 在 Stop/切换后发声；重播、切换、隐藏、pagehide、卸载取消旧音符、回调和动画。音频只在用户动作后创建 context，模块加载/SSR 不访问浏览器。
- [已核实] Print this position 固定当前选择快照，beforeprint 为浏览器直接打印提供当前状态，afterprint 仅释放快照，不宣称实体打印成功。打印失败使用现有错误文案；三位置 PDF 是独立下载动作。
- [已核实] 本页搜索只查当前可用内容块；Escape 关闭并返回触发器焦点，FAQ 支持键盘。无 JS 时保留原位答案、图示、表格、正文、PDF、原生 FAQ 和浏览器直接打印，交互播放/切换按钮禁用。

## 资产来源和原文保护

[已核实] 原始 `docs/content/chords/assets/` 二进制缺失；没有伪造 SVG 原件。键盘依据同源 diagram/print_data 用 DOM 绘制。

[已核实] 下载 PDF 取自 `docs/design/piano-final/assets/a-minor-notes-inversions.pdf`，其 bytes 与最终只读 HTML 内嵌 PDF 完全一致，设计 provenance 明确标为设计阶段重新渲染的派生资产：

- 实际发布本地路径：`public/assets/chords/a-minor-notes-inversions.pdf`。
- 47,429 bytes，一页，包含三个位置、音名/八度、Bass 和完整键盘；已用 pypdf 读取文字和 Poppler 渲染查看。
- 实际 SHA-256：`cb741308096528b74879b09676103c85d1b4c7584ac84e7bec7200beb133f7c1`。
- 内容包原 PDF 声明 SHA-256：`b6a79a5e69f216e3f3902aca431f2b96e1b6bf3554d624a360256dd4e58104e6`。两者不同，未改源清单使其相等。
- 来源证据：`checks/page-01-a-minor/pdf-provenance.json`、`pdf-validation.json`、`static-pdf.png`。

[已核实] 开始/结束哈希核对 81 个受保护文件全部一致，记录在 `source-before.json` / `source-after.json`。包含产品、内容、全部设计资料（包括历史 local-validation.md）、锁文件和既有 Foundation 核心文件。规划 Markdown 已存在且匹配来源哈希；source-manifest 的早期缺失描述保留为历史事实。未覆盖 `checks/local/` 或 `checks/validation.json`。

## 视觉对照

[已核实] 先查看归档最终 HTML 与 1440/390 截图，再在同一 Windows Chrome、同一视口、默认原位无播放状态分别截图参考 HTML 与正式构建。等待 hydration 的按钮颜色过渡结束后取图；没有隐藏运行错误来拍图。实际图片位于 `checks/page-01-a-minor/`：

- `reference-1440-top.png` / `page-1440-top.png`，以及对应 `*-full.png`。
- `reference-390-top.png` / `page-390-top.png`，以及对应 `*-full.png`。
- `visual-comparison.html` 提供截图并排；`visual-comparison.json` 保留实际 DOM 测量。
- `responsive-{320,390,768,1024,1440}.png`、`text-200.png`、三个 `print-*-rendered.png` 是补充测试输出。

| 测量 | 1440px 参考 / 页面 | 390px 参考 / 页面 |
|---|---|---|
| H1 字号 | 36px / 36px | 32px / 32px |
| 工具区宽 | 1120px / 1120px | 358px / 358px |
| 工具区高 | 725.84px / 725.84px | 1001.44px / 1001.44px |
| 键床高 | 196px / 196px | 144px / 144px |
| 阅读区起点 Y | 1157.84px / 1157.84px | 1516.47px / 1516.47px |

[已核实] 同浏览器对照的标题折行、容器、工具位置、键盘、控制组和阅读区主要结构测量一致。归档 PNG 来自此前环境，字体光栅化可能不同，未据此修改系统字体栈或设计数值。本页必要差异是页脚状态文字、真实可用下载路径、React 生命周期与无 JS 降级；没有新增 Root 装饰或工具栏。默认样式之外，forced-colors 和 reduced-motion 沿用 Foundation 支持。

## 命令、真实结果与日志

本表日志统一位于 `checks/page-01-a-minor/`。

| 命令 / 检查 | 结论 | 证据 |
|---|---|---|
| npm run typecheck | PASS，exit 0 | 01-typecheck.log |
| npm run check（实现期） | PASS，exit 0 | 02-check.log、05-check-final.log |
| node scripts/check-a-minor.mjs（初轮） | FAIL，158 通过、4 失败 | 03-page-tests.log |
| node scripts/check-a-minor.mjs（修复后开发构建） | PASS，162/0，exit 0 | 04-page-tests.log |
| npm run build | PASS，exit 0；静态生成本页和框架未找到页 | 06-build.log |
| npm run start -- --hostname 127.0.0.1 --port 3001 | PASS，实际 Ready；验收后停止 | 07-production-server.log |
| PIANO_BASE_URL=http://127.0.0.1:3001 + node scripts/check-a-minor.mjs | PASS，162/0，exit 0 | 08-page-tests-final.log、page-validation.json |
| 同浏览器参考/正式构建截图 | PASS，exit 0 | capture.mjs、09-capture.log、visual-comparison.json |
| npm run check（最终，纳入页面 CSS 变量） | PASS，558/0；TypeScript 通过；真实 Tailwind 140 条声明、cn 47 项通过；exit 0 | 10-check.log、foundation.json、tailwind-compile.json |
| pypdf + Poppler 静态/当前打印检查 | PASS，四份 PDF 均一页；音名与键位核对 | pdf-validation.json、static-pdf.png、print-*-rendered.png |
| 原文与既有核心文件哈希 | PASS，81/81 不变 | source-before.json、source-after.json |
| 最终开发页面访问 | PASS，HTTP 200 | 11-service-status.json |
| npm install / npm ci / 重新初始化 | NOT RUN，本轮明确不需要 | 包与锁文件哈希未变 |

[已核实] 初轮失败的实际修复：为两个服务器 React 内容插槽补 key，消除 React 警告；使用空 data favicon 防止缺失图标请求产生 404 控制台错误；隐藏事件测试等待 React 状态落地；forced-colors 测试使用实际键盘输入触发 focus-visible，而不是把指针点击当作键盘焦点。保留断言，未屏蔽控制台错误。最终测试控制台运行/hydration 错误为零。

[已核实] 页面测试覆盖独立源 JSON 对照、三个位置全部音符/MIDI/Bass、真实 AudioContext/oscillator 频率与时序调用、静态与发声音分离、延迟启动取消、快速重播取消、隐藏/pagehide、音频不可用和错误、打印快照及打印错误、PDF 实际 HTTP 与字节一致、原生键盘与 FAQ/搜索、无 JS、320/390/768/1024/1440、200% 文本、触控尺寸、selected keys 可见、reduced-motion 与 forced-colors。

## 未测项目与停止边界

- NOT RUN：真人听音及扬声器/耳机输出判断。自动观察真实 Web Audio 事件不等于真人听音。
- NOT RUN：iOS/Safari、Android 真机、其他浏览器与实际触摸；本轮是桌面 Chrome 中的手机视口模拟。
- NOT RUN：屏幕阅读器完整流程、整站 WCAG 验收、真人可用性评估。
- NOT RUN：系统打印对话框人工操作、取消的真人体验、实体纸张打印。已核验 print media、打印事件、错误降级和 Chromium 导出的单页 PDF。
- BLOCKED（原始资产项）：内容包原始 SVG/PDF 二进制仍缺失；本页运行使用 JSON 图示与已核验派生 PDF，不需要为此停止页面。若要求交付原件，需要补回原始 assets。

[已核实] 本轮页面实现与上述本地自动验收完成；保留未测边界，不宣布正式发布。到此停止，不继续实现首页、/chords 或下一页。
