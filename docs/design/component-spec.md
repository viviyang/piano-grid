# 组件契约与复用记录

日期：2026-09-09。范围：00 内容接入至 04 选曲批次。不是 Foundation 重做或长期组件库计划。

## 改动前盘点

[已核实] 当前已有四个组件文件：`src/components/a-minor/{experience,keyboard,icon,page-search}.tsx`；内容适配在 `src/lib/a-minor-content.ts`，轻量类型在 `a-minor-types.ts`，声音调度在 `a-minor-audio.ts`。`src/hooks/` 与 `src/components/ui/` 仅占位；没有重复的页面 JSX、独立模板或多份播放器。

[已核实] A minor 的服务器内容/metadata 位于原 page.tsx，唯一选择和打印快照由 experience 管理。CSS 是 `.am-page` 内局部规则。保留这些实际能力、文件名及 Foundation，不按目录命名做重构。

[已核实] 修改前完整浏览器回归在 `checks/batches/00-content-intake/`：162/0。原正文、规划、设计和源码快照在该目录 source-before.json；新总包的原始 PDF 已实际存在，与现有派生下载不同，现有下载地址保留。

## 分层与本轮提取决定

| 层 | 职责 | 处理 |
|---|---|---|
| Foundation | 语义颜色、字级、间距、断点、cn、focus、打印基础 | 不改 |
| 基础 UI / 站点结构 | 按钮外观、原生单选、FAQ、站点头尾、本页搜索 | 保留原生语义和 am 类；实际多页使用的头尾与播放控件抽取 |
| 音乐领域 | 键盘几何、拼写音序、受控声音、当前与集合打印 | 复用原 Keyboard/ReferenceAudio；增加真实黑键标签与中心多结果接口 |
| T07 | 单个固定和弦、三个位置、解释与资料 | 从已完成服务器页面提取，旧/新内容各自只读适配 |
| T06 | 九个名称的总览与筛选、当前/发声对象、比较及集合打印 | 独立中心模板，调用同一键盘/音频/控件；不复制详情任务 |
| 内容适配 | URL/provenance、schema 差异、资源根与缺失校验 | 服务端按 URL 读，未知核心块报错，不把全站台账传客户端 |
| 路由 | 明确授权 URL、metadata、选择模板 | 四条明确 page.tsx；其他 URL 不生成 |

## 实际契约与调用

以下为实际源码职责，不以目录存在计算复用。`src/components/a-minor/` 的历史名称保留。

| 能力 / 真实路径 | 调用者 | 输入、所有权与缺失处理 | 状态 / 响应式 / 语义 / 打印 |
|---|---|---|---|
| Keyboard，a-minor/keyboard.tsx | KeyboardViewport、PrintVoicing，四条路由 | 必需 Voicing、whitePitchClasses；可选 sounding/print。图形只消费范围/拼写/MIDI，不生成和弦或指法 | 静态参考图无点击/假hover；selected与sounding分离。原位白键、C#黑键及C♭书写标签；标记+音序不只颜色。role=img+alt，打印从print_data读取 |
| KeyboardViewport，chords/keyboard-viewport.tsx | T07工具；T06九结果与四个比较图 | Voicing、ready、rangeLabel；可选独立ID。仅拥有局部滚动/溢出状态，不拥有业务选择 | 保留33.75rem最小键床，标签≥14px，不缩小列表版。ResizeObserver使选中三音可见；原生滚动及Home/End/左右键、44px平移按钮。每实例ref独立，无重复ID；打印由独立renderer绕过裁切 |
| ReferenceAudio，lib/a-minor-audio.ts | AMinorExperience（现T07交互）、ChordCenterExperience | Voicing.playback事件；状态/音符标记回调；父组件决定播放对象 | 旧实现保留；idle/loading/playing/stopped/error/unavailable；generation/AbortController处理晚到resume；Stop、切换、隐藏、卸载关闭旧节点/动画。无SSR window访问、无自动播放；打印前取消 |
| PlaybackControls，chords/playback-controls.tsx | T07；T06每结果调用同一父播放器 | ready/state/mode/onPlay/onStop；组件不另存选择或音频状态 | 原按钮主次和default/hover/pressed/focus/disabled/playing沿用；单独保留loading和error语义。触控44px；手机两行排列；不进入打印 |
| PrintActions / CenterPrintActions | T07工具和正文；T06正文 | Context只提供动作、ready、PDF、结果是否为空。详情current快照、中心current/filtered快照由各自父级持有 | 不混淆三个位置PDF与当前打印；中心空结果禁用。原生下载链接，window.print失败诚实提示，afterprint不报成功。集合采用每对象一页，静态中心PDF仍原三页 |
| PrintVoicing，chords/print-voicing.tsx | T07当前打印；T06当前/集合打印 | 同一Voicing与标题、组成音/公式、URL、说明，均为必需 | 白底深字、完整图示、无交互；不独立持有状态。页面图示与打印同源；不把未审指法补入打印 |
| SiteHeader / SiteFooter，chords/site-chrome.tsx | T07和T06实际调用 | 搜索插槽、当前URL；无全站导航/搜索状态 | 保留既有视觉标签和本页搜索；未开发目标不可点击。T06文字放大时按容器收起标签/重排品牌，T07基线不动；打印隐藏 |
| PageSearch、Icon，a-minor/page-search.tsx、icon.tsx | 四页站点头部/控制动作 | 当前页SearchSection数组；ready/onOpen。查询属于dialog | 只查本页，Escape返回触发器焦点、原生dialog焦点约束；导航目标focus；不是全站索引。原图标几何保留，图标按钮具名称；打印隐藏 |
| FilterChoice，center-experience.tsx内部 | T06根音/类型两个真实调用 | label/id/options/value/onChange/ready，选择属于中心；组件只检测选中值是否被原生框裁切 | 原生select支持键盘；在文本放大裁切时附完整可换行选中值。响应式两字段/分行；disabled不假装生效，无全局表单库 |
| FAQ / 解释 / 比较表 | T07和T06模板 | 服务器读取原正文/表格；details拥有原生展开状态 | 保留details/summary键盘与焦点；T06两组比较用实际KeyboardViewport，不仅筛选器。无动作的容器没有loading/disabled变体 |

## 模板、路由和数据边界

[已核实] T07 `chords/detail-page.tsx` 被三个路由实际 import；读取旧适配和新适配分别构成同一显示合同。T06 `chords/center-page.tsx` 由中心路由实际 import，保留总览/筛选/多结果任务。客户端业务数据是本页轻量 props，不携带master、来源账本或PDF base64。T06筛选root/quality、selected、audioId分别建模，filtered/current派生；没有全站播放器。

[已核实] 新页保留提供的原位/转位音区，未把A major原位A4改成中心A3。新schema没有事件毫秒/Hz，适配按包内12平均律公式及已有1200ms齐奏、600ms步进/500ms音长合同生成事件；这是呈现调度推导，旧事件毫秒/频率字节值不变。新详情窗口C4–C6容纳所有已给音符，A minor与中心继续C3–C5。

[已核实] 新详情原块无block_id时用URL命名空间登记，不写回原数据。只接受三个已知核心块，未知块或缺核心data报错。来源、template_id、source_groups和源block映射保留在服务器适配/台账中。C major的RH原位来源例独立呈现，不填入仍为null的三转位指法字段。

## 测试证据与边界

- A minor完整162项回归（修改前、提取后、生产构建后）；三个位置、异步取消、打印等未跳过。
- 新增三页233项：逐原文/元数据、原位/转位频率/事件、九结果筛选/等音/互斥、打印快照/PDF、320/390/768/1440、无JS、焦点、重复ID和控制台。
- 错误降级25项：三个调用页音频不可用/错误/延迟取消，键盘focus、reduced-motion、forced-colors与搜索退出。
- 适配14项：两个素材根、越界路径、未知路由拒绝、真实实例数据及未知核心块/缺data失败。
- Center文本放大/长标签另见 `checks/batches/01-chords/filter-layout.json`；真实截图、打印PDF、check/build日志同目录。它们是本轮开发验收，不是独立review。
- NOT RUN：真人听音、真机、屏幕阅读器、实体打印与独立审查。新T06视觉为沿用现有tokens的实现提案，未标用户已确认。

## 02 琴键批次新增契约（2026-09-09）

[已核实] 保留原T06/T07实现。唯一共享产品改动：Keyboard使用纯函数keyGeometry（等值提取）；ReferenceAudio.play参数缩小为只需playback；SiteHeader增加默认仍为Chords的current参数。未改原声音时序、和弦内容或PDF。

| 组件与真实路径 | 调用者 / 数据与状态 | 响应式、语义、打印和验证 |
|---|---|---|
| lib/keyboard-geometry.ts | 原Keyboard与新KeyboardDiagram实际调用；白键序号、键色、白键总数 → 原60%黑键位置 | 不产生音符；原几何等值；A minor162、和弦233回归 |
| keyboard-notes/keyboard-diagram.tsx | T03/T04/T05及打印；keys/selected/sounding/octaves/onSelect；选择由父级管理，内部只管理滚动 | 白键5.25rem保证黑键50.4px；标签沿用14px token；可读局部滚动、ResizeObserver使选中可见。按钮原生Enter/Space，左右/Home/End移焦；非交互标注为span。selected圆点+轮廓、sounding底线，不只颜色；黑键端点留出几何余量；打印不用横向裁切 |
| keyboard-notes/use-note-audio.ts | T03/T05实际调用既有ReferenceAudio；父级持有选择，hook管理ready/status/message/sounding | 无自动播放；换键/查询/范围/谱号/拼写/Stop/打印/隐藏/卸载取消；loading/error/unavailable独立消息；21项新页降级/焦点检查 |
| tool-controls.tsx | LayoutChoice供T03/T04；NotePlayback供T03/T05 | 原生select/button；沿用am-button和语义token；控件≥44px；无JS禁用互动而保留图文；Play只在明确选中且声音可用时启用 |
| staff-diagram.tsx | T05屏幕与当前范围打印；完整StaffNote显式坐标与加线；selected/onSelect由父级提供 | 两谱号真实符号与独立坐标；屏幕谱号固定，音符局部滚动；点击/Enter/Space联动琴键。选中加环，SVG命名/焦点可见；打印六音一段、保留同音高/谱号/拼写，compact只改变线距 |
| labeled-experience.tsx | T04拥有layoutID/octaves/print snapshot；完整读取本页layouts与reading_segments | 默认88，61仅C2–C7；全部分段、段落锚点，打印快照与下载4变体对应。没有音频/指法/实尺寸贴纸；字母模式仍显式标中央C4，印件说明该标记 |
| chart-experience.tsx | T05拥有range/clef/selected spelling/flat/print snapshot；当前物理音高从本页映射派生 | 默认C4双谱号、C3–C5；开放focus、88及高音C4–C6/低音C2–C4范围，61保持后续限制。每一谱位/加线从数据读取，切谱号不换音；打印当前范围，不只打印选中一音 |

[已核实] 三页新布局用既有字体、颜色、工具面板、控件尺寸和正文节奏；新几何取舍为实现提案，未标用户视觉确认。额外中性UI文字：查询格式/范围错误、缺八度候选、方向选择、选中摘要、滚动与键盘提示、音频状态、打印失败、谱号/范围/拼写控件，以及61谱表模式后续说明；源blocks.body逐字保留。源内容对61谱表视图的现在时表述与first_release_scope并存，页面另给明确未开放提示，未静默改稿。

[已核实] 测试与截图：02 implementation.md、validation.json（1660/0）、data-validation.json（1709/0）、fallback-validation.json（21/0）、production-validation.json（48/0）、pdf-validation.json（42/0）。打印由浏览器PDF与Poppler逐页渲染检查；真人听音/真机/屏幕阅读器/原生打印对话框/实体打印/专业教师签核仍NOT RUN。

## 03 音阶批次新增契约（2026-09-09）

[已核实] T11与T12继续使用既有Foundation、SiteHeader/Footer、ReferenceAudio、KeyboardDiagram和StaffDiagram。音阶领域另建`src/components/scales/`与`src/lib/scale-{content,types}.ts`，没有把音阶塞入和弦转位模型，也没有新增依赖或公开素材。

| 组件与真实路径 | 调用者 / 数据与状态 | 响应式、语义、打印和验证 |
|---|---|---|
| scales/center-experience.tsx | T11唯一调用；拥有form/tonic/hand/direction及当前打印快照。只接收60个源数据组合与已存在详情URL | 默认major:C；原生select显式命名。切换先取消声音；无JS保留默认图文并禁用交互。当前一八度打印，不生成全集 |
| scales/detail-experience.tsx | 两个T12实例；固定tonic，拥有form/hand/direction/tempo及打印快照 | C仅60 BPM且无根音筛选；A开放源提供的40/60/80和三形式。A下行null时只显示音符与准确说明；打印捕获当前状态 |
| scales/scale-reference.tsx | T11/T12屏幕和打印共用；消费ScaleOption、hand、direction、tempo | 音名表、指法门槛、谱表、琴键和播放序列同源。up_down播放15音并拆成两组可读表；升降与双升/双降保留拼写。手机局部滚动，不产生整页溢出 |
| scales/use-scale-audio.ts | T11/T12封装既有ReferenceAudio；只把当前ScalePitch[]与tempo转成事件 | 无自动播放；Stop、选择切换、打印、隐藏与卸载取消。idle/loading/playing/stopped/error/unavailable沿用既有生命周期；失败不影响图文与筛选 |
| keyboard-notes/keyboard-diagram.tsx | 02页面继续原调用；03增加marked/keyLabels可选输入 | 缺省行为不变。音阶可同时标记一组MIDI并显示源拼写；selected与sounding仍分离。复用后跑完02数据、浏览器、降级及production回归 |
| keyboard-notes/staff-diagram.tsx | 02与03共用 | 重复音以索引稳定key；事故记号支持`#`、`b`、`##`、`bb`显示。仍从显式StaffNote坐标绘制，不推导业务音阶 |
| scales/pages.tsx | ScalesCenterPage与ScaleDetailPage；服务器组件负责原文块、表格与站点壳 | T11显示major/minor总览、形式、音级及jazz真实示例；T12保留各页独立解释和A自然小调和弦表。未知/缺核心块在适配层失败，不把master整体送客户端 |

[已核实] 音阶数据门槛：C大调仅一八度，四种手别×方向指法均取源数组；A自然/和声/古典旋律小调分别读取方向音列，上行两手指法取源数组，下行两手均保持null。中心其余结果有源音名但无已核指法，因此不显示指法数字。详情入口只指向本批已存在的C/A页面；production在未发布状态隐藏本地联调入口。

[已核实] 03测试证据：data-validation.json（620/0）、validation.json（330/0）、fallback-validation.json（30/0）、production-validation.json（55/0）与pdf-validation.json（46/0）。四份代表打印均为单页Letter并完成文本、来源、非空像素检查。真人听音、真机、屏幕阅读器、原生打印对话框、实体打印和专业教师签核仍NOT RUN；03独立验收为PASS_WITH_NOTES，用户已确认通过。

## 06空白谱纸组件契约（2026-09-09）

| 能力 | 调用者 | 数据与边界 | 语义与响应式 |
|---|---|---|---|
| BlankSheetPage | T19 | 只接收`/tools/blank-sheet-music`轻量model；路由负责metadata | 复用SiteHeader/Footer、breadcrumb与Foundation版心；320px保持单列且页面无横向溢出 |
| Paper selector | T19 | 固定Letter与A4两种已授权源PDF；默认Letter，选择只改变当前动作目标 | 原生radio fieldset；无JS时禁用选择但保留两份直接下载 |
| Sheet preview | T19 | 直接使用获授权的六组大谱表SVG，不重绘、不补写音符 | 有替代文本与可聚焦局部滚动区；75%–150%屏幕缩放不改变源PDF尺寸 |
| Print/download actions | T19 | 打开或下载当前选择的字节等值PDF；不上传、不存档、不要求账号 | 真实链接；Letter/A4下载始终可达，主操作随选择更新 |

[已核实] 服务端读取层检查T19、P079、block顺序、五线数量、六组大谱表、空白音乐内容、两种纸张及rights；公开PDF/SVG与源文件SHA-256一致。测试证据：数据119/0、PDF几何20/0、浏览器60/0、生产58/0、A minor回归162/0。浏览器打印对话框与实体打印仍NOT RUN。

## 05指南组件契约（2026-09-09）

| 能力 | 调用者 | 数据与边界 | 语义与响应式 |
|---|---|---|---|
| GuideShell / Section | T21、T22 | 只接收当前页轻量model与已核block；路由负责metadata | 共用SiteHeader/Footer、breadcrumb与Foundation阅读宽度；小屏切为单列 |
| BeatPattern | T21起步与T22练习 | 只渲染源事件的pitch、onset和duration；每小节服务端验证为4拍 | `role=img`有完整音名/拍数替代文本；320px保持四拍顺序 |
| Anchor reference | T22 | anchor_map通过T05既有88键staff坐标解析，不移动或猜测音符 | 复用StaffDiagram，定义列表保留谱号、音高与位置文字；区域可横向滚动 |
| Printable | T21、T22 | 仅接受唯一四页、可分发的Piano Reference PDF；公开副本做SHA-256等值检查 | 真下载链接；无空目标，不把PDF嵌成核心内容 |
| Native details answer | T22 | 答案由E-SR1四个源小节生成；不评分、不存进度 | 键盘原生可用；无JS仍保留答案DOM |

[已核实] 本批没有新增依赖、动画库、动态路由或全局状态。指南中心与教程页没有套用和弦操作面板；`SiteHeader`仅修正当前栏目不再标为disabled的语义。测试证据：数据157/0、浏览器77/0、生产57/0、A minor回归162/0。专业教师签核仍NOT RUN。

## 04 选曲批次新增契约（2026-09-09）

[已核实] T15与T16继续使用既有Foundation和SiteHeader/Footer；新增`src/components/songs/`与`src/lib/song-{content,types}.ts`。没有复用A minor工具排版、键盘、声音或打印，也没有新增依赖、公开静态资产或后续专题路由。

| 组件与真实路径 | 调用者 / 数据与状态 | 响应式、语义和验证 |
|---|---|---|
| songs/resource-card.tsx | T15六个中心版本、T16九个重点版本实际调用；输入是单个work+edition+rights轻量对象 | 明确作品、署名、编配、出版方级别依据、调性（仅有源值）、选择理由、取得方式和外链；手机改为单列。缺字段不显示，不推算难度/调性/指法 |
| songs/center-experience.tsx | T15唯一调用；拥有query/level/goal；接收六个资源与六个非空目标集合 | 搜索只使用work_title/artist/edition；level只列已有出版方标签且未知值不进正向筛选；goal只开放有匹配集合。空结果可清除，无JS保留六条并禁用控件 |
| songs/easy-experience.tsx | T16唯一调用；拥有all/kids/c-major/beautiful/adults/impress选择 | 五个条件均绑定源section ID，切换后只显示实际版本；默认九条，无JS保持全量。原生radio有名称、focus与44px触控目标 |
| songs/pages.tsx | 两条薄路由的服务器模板；SongShell/ReadingSection/CatalogTable | T15先完成发现与筛选再呈现原八块；T16先给九个重点版本，再将50曲作为同一版本合集表格，最后呈现原六块。320/390/768/1440与200%文本无页面级溢出 |
| lib/song-content.ts | 两页服务器适配；白名单、核心block、ID、HTTPS资源与rights门槛 | 未知/缺核心block、重复ID、空section、非external-only或可再分发资源直接失败；客户端不接收master、问题台账或source groups全文 |

[已核实] 作品与版本边界：两个Twinkle和两个Happy Birthday条目保持不同edition、level/key/access；50条目录各自保留ID，但共享同一HL00131140合集与Easy Piano出版方标签。个别creator/key/technical_demands的null不补，0条逐曲performance-tested状态明确保留。

[已核实] rights边界：所有59个Easy对象及6个中心对象逐条检查HTTPS resource_url、external reference only、redistribute_score=false、redistribute_recording=false；UI只提供出版方外链，没有iframe、封面、音频或PDF缓存。三家出版方各抽样一个入口可访问，其余只做结构和源值核对。

[已核实] 04测试证据：data-validation.json（902/0）、validation.json（119/0）、production-validation.json（54/0）与A minor回归（162/0）。npm run check和生产构建通过。真人试弹、真机、屏幕阅读器人工长流程、购买/登录、全部外链逐一访问、专业教师签核与独立验收仍NOT RUN。

## 07 站点整合组件契约（2026-09-10）

| 能力 | 调用者 | 数据与边界 | 语义与响应式 |
|---|---|---|---|
| IntegrationShell / ReadingSection | T01、T02 | 只接收当前页轻量 model；路由负责源 metadata | 复用 SiteHeader/Footer 与 Foundation 版心；正文 section 保留源 block ID，320/390 单列、768/1440 分栏 |
| Task grid | T01 | 六个源任务与当前 17 路由白名单；可用目标才渲染链接 | 编号、任务名、动作状态均为文字；Sheet Music 显示 `Not yet available`，无假按钮或死链接 |
| Lookup list | T02 | 琴键、和弦、音阶三个现有规范页；不复制工具路由 | 每项说明输入与结果，原生链接可键盘聚焦；当前栏目为 Tools |
| Printable list | T02 | 空白谱纸页面与已核指南 PDF；服务端校验公开文件字节 | 页面入口与直接下载分开命名；三项计划资料置于原生 details 内且无链接 |
| SiteHeader / SiteFooter | 首轮17路由 | 六个真实栏目与首页品牌入口；不拥有全站搜索状态 | 当前栏目用 `aria-current`；小屏导航换行而不隐藏，200% 文本无页面级溢出；打印隐藏 |

[已核实] T01/T02 没有新增客户端状态、依赖、动态路由或全站搜索。源 F-Homepage 的正文逐块保留；服务器适配核验 T01/T02、block顺序、P113、release planning 状态及两份下载字节，未把 master、问题台账或内部路径送到客户端。

[已核实] 07 证据：数据153/0、开发态浏览器178/0、生产态102/0；17路由逐条检查 HTTP、title、canonical、noindex、导航与源台账泄漏，代表页覆盖1440/390/320/768、200%文本与NoJS。真人真机、屏幕阅读器人工长流程、全部外链人工访问、部署仍NOT RUN；07初次独立验收为NEEDS_FIX，P1已定点修复并等待独立复验。
