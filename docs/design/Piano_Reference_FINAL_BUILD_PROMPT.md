# FINAL BUILD PROMPT — Piano Reference

你是一名资深产品设计师与前端实现工程师。请在现有项目中实现 Piano Reference 的最终 /chords/a-minor 样板，不再探索多个风格，不重新规划网站，不扩展其他正式页面，不部署。

## 1. 唯一方向

采用 Version A 的浅色、单一蓝色强调、无衬线文字作为主系统；吸收 Version C 的对齐、紧凑控制区和清楚的选中/焦点状态。不是四个品牌混搭。

最终特征：答案优先、键盘清晰、控制精确、正文可读、打印可靠。

不要引入深色页面、绿色或紫色品牌强调、陶土色按钮、衬线大标题、品牌标志或品牌专有字体。不要复制 Apple / Spotify / Linear / Claude 的产品布局。

## 2. 先读输入，再实现

读取当前提供的：
- content-pack.md
- page-content.json
- Piano_全站统一规划_最终版.md
- url-plan.final.json
- 现有四版 HTML；Version A 是视觉基础，Version C 只参考控制细节。

允许文件名带上传序号，但必须核对文内版本。当前内容包为 1.0.0-batch-01；规划 JSON 为 2.0-consolidated-final-plan。记录实际路径、版本、SHA256。若全站 Markdown 没有提供，明确记录缺失，并在两个 JSON 对 /chords/a-minor 的 final_scope、required_delivery 一致时继续已明确的样板范围；不要声称已读缺失文件。实质冲突则列出位置，不静默裁决。

权威分工：规划决定 URL、搜索任务与功能边界；内容包决定英文正文、音乐数据、资源条件；本 Prompt 只决定呈现、状态与验收。

保留 /chords/a-minor、T07、P151 和全部九个 block_id：
am-intro / am-result / am-find-notes / am-inversions / am-why-minor / am-practice / am-print / am-questions / am-next。

不要修改原输入文件。新建最终分支或目录，保留已有 A/B/C/D 原文件。不得将 ready_for_publish 或 published 改为 true 来绕过验收。

## 3. 产品任务与数据约束

用户从具体和弦搜索进入，首先要看到 Am / A minor、A–C–E 和对应琴键；然后切换转位、齐奏或逐音试听、停止、打印当前结果、下载三种位置 PDF。

正文使用现有英文稿，不改写为营销文案。允许调整内容位置和字号、拆成保持原字序的展示片段，不得删事实、段落、步骤、FAQ 或新增音乐知识。只有中性的界面标签可以补充，记录在 ui-copy-changes.md。

只使用 JSON 中已提供的三个 voicing，下面是回归预期，不是替代数据源：
- a-minor--root：Am；A3–C4–E4；MIDI [57,60,64]；Bass A3。
- a-minor--first：Am/C；C4–E4–A4；MIDI [60,64,69]；Bass C4。
- a-minor--second：Am/E；E4–A4–C5；MIDI [64,69,72]；Bass E4。

根音保持 A。不能把最低音当作根音；不能改变八度、音符拼写、音序、频率、播放事件的 onset/duration。公开指法为 null 时不显示指法，不用 1-3-5 补齐。不能添加根音/和弦类型筛选、MIDI、录音、键盘演奏、评分、账户或订阅。

建立一个 selectedVoicingId 状态。摘要、键盘标记、低到高音序、Bass、播放和当前打印都从同一 voicing 派生；禁止各写一份独立硬编码表。

## 4. 固定视觉规则

颜色：
- Canvas #FFFFFF；Surface #F5F5F7。
- 主文字 #1D1D1F；次文字 #51545A。
- 普通分隔线 #DADDE3；需要辨识的控件轮廓 #7A818C。
- 唯一交互强调 #0066CC；Hover #0056AD；Pressed #00468F。
- Selected 背景 #E8F1FC，深蓝文字、蓝色边框、可辨识选中标记。
- Disabled 背景 #ECEEF1，文字 #626975；同时使用真实 disabled 语义。
- 音符浅底 #DCEBFA；Success #1B6B3A；Warning #8A4B00；Error #B42318。语义色不用于装饰。
- 不增加第二个品牌强调色。图例靠文字与形状区分，不依赖彩虹色。

字体使用系统无衬线栈：system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif。不得打包或分发品牌专有字体。
- H1：桌面 40/48px、手机 32/38px、600。
- H2：桌面 26/34px、手机 24/32px、600。
- H3：18/26px、600。
- 正文：桌面 17/28px、手机 16/26px。
- Label / Button：14/20px；Caption：13/19px。
- 核心组成音：28–32px、600；和弦符号：32–36px，不压过组成音。
- 当前音序：18–20px；公式：14–16px。数字可用 tabular-nums，不把全部音乐文字做成代码字体。
- 键盘音名实际屏幕目标 14px，最低 12px。检查 SVG 缩放后的实际字号，不能只检查 CSS 原始 font-size。

布局：最大工具容器 1120px；正文行长约 60–70ch；桌面外边距至少 32px、手机 16px。工具面板内边距桌面 24px、手机 16px；控件间距 8–12px；大区块间距桌面 40–48px、手机 28–32px。

一个轻量主工具面板：1px 分隔线、12px 圆角、无阴影。正文不逐段套卡片。按钮统一 8px 圆角，桌面至少 44px 高、手机至少 48px 高。Icon button 至少 44×44px。

## 5. 页面结构

Desktop 和 Mobile 使用一致的任务顺序：
1. 紧凑 Header：品牌、已有栏目和真实可用 Search；不加入营销 CTA。
2. Breadcrumb。
3. H1 与低权重短说明；不要再放两大段导言挡住工具。
4. Core answer：Am / A minor；组成音 A–C–E 最醒目；公式作为次要信息。
5. 主工具：Position 单选分段控件 → 当前转位名/符号 → 键盘 → 当前音序与 Bass → 播放组 → 打印/PDF。
6. A minor inversions：已有解释、完整三行四字段比较。
7. Find A, C, and E on the keyboard：保留全部找音步骤与原位语境。
8. What makes this chord minor?：保留原文。
9. Try the three positions：保留全部步骤，不添加训练分数。
10. Print the A minor reference：说明当前打印与整组 PDF 的差别。
11. A minor questions：真实 FAQ 折叠组件。
12. Related resources：仅开放已发布目标。
13. 简洁 Footer。

内容迁移约束：保留 am-intro 全文，但移出默认首屏。放入找音说明中的 “About the root-position example” 折叠块。由于原文含 “The example below uses A3–C4–E4”，该块内在原文后呈现一张来自 a-minor--root 的静态原位参考图；不要让它误指当前第一/第二转位。该辅助图仅随说明展开，不能在默认首屏复制第二张大键盘；它不受当前选择影响、不增加播放控制。原 am-result 的两段说明放在主工具之后，继续带原 block_id 的来源映射。

除上述导言说明和 FAQ 外，不把基础解释、转位比较和练习默认全部折叠。保留分区标题。所有正文、表格和 FAQ 答案在 HTML 中可读取，不要只写进 Canvas 或截图。

## 6. 核心组件和交互

建议组件：SiteHeader、Breadcrumb、ChordSummary、ChordReferenceTool、InversionSelector、KeyboardDiagram、CurrentVoicing、PlaybackControls、AudioStatus、PrintActions、InversionTable、ExampleDisclosure、ChordExplanation、PracticeSteps、FAQAccordion、RelatedLinks、PrintLayout。

InversionSelector：外观是三段式控件，语义优先采用 fieldset/legend 与原生 radio。三个完整标签分别为 Root position / First inversion / Second inversion。单选、不更改 URL。箭头键改变选择，Space 选择，Tab 正常进出。焦点不因切换被重建移走。选中不只换颜色，包含明确边框和标记；hover 不能伪装成 selected。手机三等分、文字最多两行，不缩成 10–11px。

KeyboardDiagram：基于核对过的几何/音高数据生成 SVG/DOM，绝不用生成式图片作音符答案。保留 C3–C5 数据窗口、正确两黑键/三黑键分组及相邻关系。
- 白键白底、黑键近黑，不能给未选琴键整体灰到看不清。
- 选中音：浅蓝底/标记、蓝色描边、明确音名。
- 根音：在选中标记外增加环形标记及 Root 文字说明；Root 与 Bass 分开。
- 播放中：在正在发声的音上叠加深蓝短条或加强轮廓；停止后恢复已选状态，不清空和弦。
- 为未来黑键和弦保留“黑键底色＋高对比标记”的能力，不能把选中黑键涂成白键。
- 当前页的键盘不是独立可演奏组件：不添加点键发声、hover 自动发声或假按钮指针。交互模式只在其他页面已确认任务允许时启用。

播放：用户点击才初始化音频；使用给定 together / ascending 事件，不能改变时长或悄悄加音。切换转位、停止、离开/隐藏页面时取消旧音频和动画。Play chord 是唯一主按钮；逐音为次按钮；Stop 保留独立动作，待机 disabled、播放时可用。出现 loading/error 时不挡住音名和图。

打印：Print this position 只打印当前 selectedVoicingId；Download A minor PDF 下载三个位置的实际 PDF。打印独立白底黑字、不受屏幕配色或手机横向滚动裁切影响。必须保留全部当前音符、八度、位置、键盘和非颜色标记；不能截屏打印整站。原 PDF 不在文件系统中时，不伪造下载成功；可使用已经核验的重制文件或按 print_data 生成并记录来源与新哈希，不冒称原始资产。

表格：桌面语义 table、完整 Position/Symbol/Notes/Bass、浅分隔线。手机将三个记录排成无卡片堆叠的完整行组：第一行 Position + Symbol，第二行 Notes + Bass；不删除 Bass，不默认折叠某一位置。避免四列挤到小字或为此小表强制横滚。可保留同一数据的桌面/手机两个渲染，但断点中只让一个进入可访问树。

FAQ：无独立卡片外壳，横向分隔线，整行可操作；原生 details/summary 或正确的 button + aria-expanded/aria-controls；允许多项展开，保持焦点，答案字宽与正文一致。

## 7. Responsive 和 Accessibility

Desktop >=1024px：完整键盘、摘要、转位和两组动作连成一个工作区。不要做占半屏的左侧参数面板。
Tablet 768–1023px：摘要可两列；控制组允许换行；不缩字体。
Mobile <768px：单列，当前答案先于键盘，键盘先于播放，播放先于长说明。Play + Stop 一行、逐音下一行；打印/PDF 紧随，文字不截断。

键盘允许局部横滚；白键参考宽度约 36–40px，完整数据范围不变。默认和每次切换后让当前三个音全部出现在可视范围；播音过程中不要反复自动横滚。标签实际 12–14px；允许正常页面纵向滚动，禁止整个页面横向溢出。未来 61/88 键页复用几何与局部视窗机制，不按 A minor 的宽度硬编码。

无障碍目标：普通文字至少 4.5:1；大字至少 3:1；必要图形/选中标记/焦点至少 3:1。控件采用实际可点击区域，不能只把内部 icon 做到 44px。所有操作有可见文字或 accessible name。焦点使用 2px 蓝色外轮廓、3px offset，不裁切、不被固定导航遮挡。

读取顺序、Tab 顺序和视觉顺序一致。更新选择通过简短 aria-live=polite 公告，避免把整个页面或每帧声音状态反复朗读。保留 SVG title/desc 或等效 aria-label 与真实文字音序。支持键盘、200% 文本放大、320 CSS px 重排、reduced motion；强制高对比模式仍能识别 selected 和 focus。

初始和弦答案、正文、表格和 FAQ 答案应服务端渲染或静态 HTML 可读；音频与切换渐进增强。音频失败不能让参考数据消失。导航/资源未发布时不开放空链接，不新增网站搜索能力去掩盖只有页内搜索的现状。

## 8. 必须覆盖的状态

default / hover / pressed / selected / focus-visible / disabled / loading / playing-together / playing-ascending / error / resource-unavailable / print。

区分“按钮正被按下”“当前选中的转位”“琴键正在发声”，不要用一个 active 布尔值混合三者。状态文案优先使用 page.microcopy；新增状态标签只做界面说明，不改事实。错误只影响相关功能，不清空正确数据。

## 9. 禁止事项

禁止营销 Hero、card soup、渐变/发光/玻璃特效、无意义图标、品牌照抄、封面/歌单/侧栏播放器、SaaS dashboard、聊天界面、假数字/评价/教师背书、全页衬线、全页代码字体、以截图代替功能、为抢首屏缩小字、为漂亮改音符、编造指法、改 URL/关键词/网站边界、覆盖原四版、自动批量建其他页面。

## 10. 交付和验收

先实现 /chords/a-minor，不等于完成全站。交付运行方法、HTML/项目代码、统一 tokens、组件状态说明、Desktop/Mobile 真实渲染截图、三种当前结果打印预览、内容 block_id 映射、实际测试记录。

至少检查 320/390/768/1024/1440px。具体首屏设计目标（默认字号和默认折叠状态）：1440×900 显示答案、完整键盘、三个转位、播放和打印动作；390×844 显示答案、完整当前三个琴键和 Play。放大字时允许纵向滚动，不得牺牲可读性。

逐个核对全部三种位置：文本顺序、SVG 选中 MIDI、齐奏和逐音事件、Bass、根音标记、打印保持一致。检查无自动播放、快速切换取消旧音、停止、加载失败、FAQ、方向键、焦点、真实 PDF 内容、页面无横向溢出、手机标签实际字号。

无障碍自动检查通过不代表屏幕阅读器或真人任务测试通过。不得把 headless 测试写成真机、扬声器或实体打印测试。功能检查失败就修复或明确列出，不把“设计稿完成”称为“可上线”。

最终汇报：已实现什么、仍缺什么、怎么预览、哪些测试实际执行。不要先给长篇风格分析或再给多套方向，直接完成这个统一版本。
