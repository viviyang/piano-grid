# 页面任务模板映射

日期：2026-09-10。Source of Truth：docs/product/url-plan.final.json；保留23个原T编号与127 URL。矩阵不授权全站开发；首轮T01–T07、T11/T12、T15/T16、T19、T21/T22已实现，其他均planned。

## 已实现模板与组合

[已核实] T07 ChordDetailPage 在 src/components/chords/detail-page.tsx，被三个很薄的静态路由实际import。A minor继续 getAMinorContent 旧适配；A major/C major使用 getChordDetail 新适配。模板组织固定和弦、原生位置单选、键盘/声/打印、独立原文解释和资料；不是全站任意blocks模板。namespace保存原am块ID，新页无源ID时仅在呈现层生成URL命名空间，原对象不改写。

[已核实] T06 ChordCenterPage 在 src/components/chords/center-page.tsx，仅被 /chords 调用；getChordCenter读取旧对象+legacy_chords_support。默认九结果，筛选/当前对象/发声对象分开；两组大小对比。它共享KeyboardViewport、Keyboard、ReferenceAudio、PlaybackControls、PrintVoicing、SiteHeader/Footer与PageSearch，但不套T07首屏。

[已核实] 服务器负责读取与metadata/正文，客户端仅接收当前工具显示模型。01与02独立报告均为PASS_WITH_NOTES且用户已接受；03与04独立报告均为PASS_WITH_NOTES且用户已接受；05与06独立报告均为PASS_WITH_NOTES且用户已接受；07初次独立验收为NEEDS_FIX，唯一P1已定点修复并等待独立复验。所有模板的真人听音、真机、屏幕阅读器、实体打印仍NOT RUN。

## 原23任务模板

| ID | 模板职责 | 原页面任务 | 代码与状态 |
|---|---|---|---|
| T01 | 首页 | 了解网站能帮助什么，并进入已可用的查阅、选曲、曲谱或学习任务。 | src/components/integration/pages.tsx；/，fix_implemented / re-review pending |
| T02 | 工具中心 | 按动作找到可用工具和打印资料。 | src/components/integration/pages.tsx；/tools，fix_implemented / re-review pending |
| T03 | 琴键查询 | 知道某个琴键叫什么，或按音名定位琴键，理解基本布局。 | src/components/keyboard-notes/pages.tsx；review_passed / PASS_WITH_NOTES |
| T04 | 琴键标注 | 取得与键盘布局匹配的标注参考图，打印并对照实琴标注。 | src/components/keyboard-notes/pages.tsx；review_passed / PASS_WITH_NOTES |
| T05 | 音符—谱表—琴键对照 | 知道谱上的音叫什么、对应哪一个琴键。 | src/components/keyboard-notes/pages.tsx；review_passed / PASS_WITH_NOTES |
| T06 | 和弦中心 | 总览、查找、比较和弦，直接获得基本键位与声音参考。 | src/components/chords/center-page.tsx；/chords，review_passed / PASS_WITH_NOTES |
| T07 | 具体和弦页 | 直接查某一个明确和弦的组成、键位、转位和声音。 | src/components/chords/detail-page.tsx；A minor、A major、C major，review_passed / PASS_WITH_NOTES |
| T08 | 按调性查和弦 | 查看某一调内的各级和弦，而不是单个和弦。 | planned；无模板代码或路由授权 |
| T09 | 反向和弦查找 | 通过音符或按键输入，查看可能的和弦名称。 | planned；无模板代码或路由授权 |
| T10 | 和弦走向 | 查询常见走向、含义、不同调性示例并试弹。 | planned；无模板代码或路由授权 |
| T11 | 音阶中心 | 查音阶类型、音符、键位、左右手指法，并听示范或打印。 | src/components/scales/pages.tsx；review_passed / PASS_WITH_NOTES |
| T12 | 具体调性音阶页 | 直接查看指定调性的音阶、键位、手别指法和示范。 | src/components/scales/pages.tsx；C major、A minor，review_passed / PASS_WITH_NOTES |
| T13 | 音阶类型／调式参考 | 理解并查看某一种音阶类型或多个调式，不是固定单一调性的结果。 | planned；无模板代码或路由授权 |
| T14 | 琶音中心 | 理解琶音并查看原表已有 C/G 大调实例。 | planned；无模板代码或路由授权 |
| T15 | 选曲中心 | 发现可学习曲目，按实际条件缩小范围并取得后续资源。 | src/components/songs/pages.tsx；/songs，review_passed / PASS_WITH_NOTES |
| T16 | 选曲专题 | 在明确人群、难度、风格、艺人或场合条件下选曲。 | src/components/songs/pages.tsx；/songs/easy，review_passed / PASS_WITH_NOTES |
| T17 | 曲谱目录／格式专题 | 找到实际可获取的钢琴谱或对应记谱资源。 | planned；无模板代码或路由授权 |
| T18 | 具体曲目资源页 | 获得指定作品的明确可用版本，而不是重新选歌。 | planned；无模板代码或路由授权 |
| T19 | 空白谱纸工具 | 取得可打印的空白钢琴五线谱纸。 | src/components/blank-sheet/pages.tsx；/tools/blank-sheet-music，review_passed / PASS_WITH_NOTES |
| T20 | 补充参考／打印工具 | 完成频率查询、手指编号、空白键盘、调号或综合速查这一页指定任务。 | planned；无模板代码或路由授权 |
| T21 | 指南中心 | 知道从哪里开始学，按学习问题找到相应指南与工具。 | src/components/guides/pages.tsx；/guide，review_passed / PASS_WITH_NOTES |
| T22 | 方法教程 | 解决如何学、怎么练或为什么的问题。 | src/components/guides/pages.tsx；/guide/read-sheet-music，review_passed / PASS_WITH_NOTES |
| T23 | 教材选择指南 | 按学习阶段或练习目标选择教材。 | planned；无模板代码或路由授权 |

## URL实例矩阵

每行的完整正文/data/source_groups/issues与两种schema映射见 docs/content/content-source-map.json。原sources及127页内容留在服务器只读源。资源状态见asset-map.json，未授权页不导出资产；本轮三份PDF已等字节导出，A minor下载保持。

| URL | template_id | 原优先级 | 实现/验收 | source_groups |
|---|---|---|---|---|
| / | T01 | 先做 | fix_implemented / re-review pending | — |
| /tools | T02 | 先做 | fix_implemented / re-review pending | P113 |
| /songs | T15 | 先做 | review_passed / PASS_WITH_NOTES | P002, P009, P014, P018, P022, P041, P042, P043 |
| /songs/easy | T16 | 先做 | review_passed / PASS_WITH_NOTES | P001, P006, P036, P037, P039, P040 |
| /tools/blank-sheet-music | T19 | 先做 | review_passed / PASS_WITH_NOTES | P079 |
| /keyboard-notes | T03 | 先做 | review_passed / PASS_WITH_NOTES | P117, P118, P120, P122, P123, P124, P127, P129, P130, P133, P134, P138, P139, P140, P141, P142, P147 |
| /keyboard-notes/labeled | T04 | 先做 | review_passed / PASS_WITH_NOTES | P119, P137, P223, P241 |
| /keyboard-notes/chart | T05 | 先做 | review_passed / PASS_WITH_NOTES | P121, P132, P143, P145, P146 |
| /chords | T06 | 先做 | review_passed / PASS_WITH_NOTES | P148, P154, P158, P168, P170, P171, P238, P247 |
| /chords/a-major | T07 | 先做 | review_passed / PASS_WITH_NOTES | P149 |
| /chords/a-minor | T07 | 先做 | review_passed / PASS_WITH_NOTES | P151 |
| /chords/c-major | T07 | 先做 | review_passed / PASS_WITH_NOTES | P163 |
| /scales | T11 | 先做 | review_passed / PASS_WITH_NOTES | P179, P180, P181, P190, P196, P204, P208, P210, P213, P214, P222, P224, P233, P235 |
| /scales/c-major | T12 | 先做 | review_passed / PASS_WITH_NOTES | P183 |
| /scales/a-minor | T12 | 先做 | review_passed / PASS_WITH_NOTES | P184 |
| /guide | T21 | 先做 | review_passed / PASS_WITH_NOTES | P226, P240, P255 |
| /guide/read-sheet-music | T22 | 先做 | review_passed / PASS_WITH_NOTES | P218, P228, P229, P236, P248, P249 |
| /songs/christmas | T16 | 后做 | planned | P003, P008 |
| /songs/challenging | T16 | 后做 | planned | P004, P025 |
| /songs/pop | T16 | 后做 | planned | P005, P013, P026 |
| /songs/classical | T16 | 后做 | planned | P007, P015 |
| /songs/easy-chords | T16 | 后做 | planned | P010 |
| /songs/anime | T16 | 后做 | planned | P011 |
| /songs/minecraft | T16 | 后做 | planned | P012 |
| /songs/rock | T16 | 后做 | planned | P016 |
| /songs/taylor-swift | T16 | 后做 | planned | P017, P031 |
| /songs/disney | T16 | 后做 | planned | P019, P021 |
| /songs/wedding | T16 | 后做 | planned | P020 |
| /songs/worship | T16 | 后做 | planned | P023, P032 |
| /songs/rap | T16 | 后做 | planned | P024 |
| /songs/piano-and-guitar | T16 | 后做 | planned | P027 |
| /songs/beatles | T16 | 后做 | planned | P028 |
| /songs/coldplay | T16 | 后做 | planned | P029 |
| /songs/country | T16 | 后做 | planned | P030 |
| /songs/jazz | T16 | 后做 | planned | P033, P038 |
| /songs/halloween | T16 | 后做 | planned | P034 |
| /songs/undertale | T16 | 后做 | planned | P035 |
| /sheet-music | T17 | 后做 | planned | P047, P048, P060, P063, P070 |
| /sheet-music/easy | T17 | 后做 | planned | P044, P110, P111 |
| /sheet-music/beginner | T17 | 后做 | planned | P045, P106 |
| /sheet-music/christmas | T17 | 后做 | planned | P046, P065 |
| /sheet-music/letter-notes | T17 | 后做 | planned | P050, P051, P097 |
| /sheet-music/annotated | T17 | 后做 | planned | P054, P061 |
| /sheet-music/lead-sheets | T17 | 后做 | planned | P062, P071 |
| /sheet-music/pop | T17 | 后做 | planned | P076, P112 |
| /sheet-music/disney | T17 | 后做 | planned | P078, P087 |
| /sheet-music/classical | T17 | 后做 | planned | P105, P107 |
| /sheet-music/jazz | T17 | 后做 | planned | P108 |
| /sheet-music/jingle-bells | T18 | 后做 | planned | P049, P053, P074 |
| /sheet-music/amazing-grace | T18 | 后做 | planned | P057 |
| /sheet-music/fur-elise | T18 | 后做 | planned | P066 |
| /sheet-music/happy-birthday | T18 | 后做 | planned | P073, P083 |
| /sheet-music/hot-cross-buns | T18 | 后做 | planned | P091 |
| /sheet-music/jesus-loves-me | T18 | 后做 | planned | P093 |
| /sheet-music/mary-had-a-little-lamb | T18 | 后做 | planned | P102 |
| /sheet-music/abc-song | T18 | 后做 | planned | P104 |
| /sheet-music/ode-to-joy | T18 | 后做 | planned | P114 |
| /sheet-music/silent-night | T18 | 后做 | planned | P115 |
| /sheet-music/twinkle-twinkle-little-star | T18 | 后做 | planned | P116 |
| /keyboard-notes/frequencies | T20 | 后做 | planned | P125 |
| /keyboard-notes/finger-numbers | T20 | 后做 | planned | P126 |
| /keyboard-notes/blank | T20 | 后做 | planned | P128 |
| /tools/piano-cheat-sheet | T20 | 后做 | planned | P131 |
| /keyboard-notes/key-signatures | T20 | 后做 | planned | P136, P244 |
| /chords/b-major | T07 | 后做 | planned | P150 |
| /chords/a-flat-major | T07 | 后做 | planned | P155 |
| /chords/e-major | T07 | 后做 | planned | P162 |
| /chords/c-minor | T07 | 后做 | planned | P166 |
| /chords/c-flat-major | T07 | 后做 | planned | P167 |
| /chords/g-major | T07 | 后做 | planned | P169 |
| /chords/by-key | T08 | 后做 | planned | P152, P156, P157, P159, P160, P161, P164, P165 |
| /chords/finder | T09 | 后做 | planned | P153 |
| /chord-progressions | T10 | 后做 | planned | P172, P173, P174, P175, P176, P177, P178, P237 |
| /scales/modes | T13 | 后做 | planned | P182 |
| /scales/blues | T13 | 后做 | planned | P185 |
| /scales/d-major | T12 | 后做 | planned | P186 |
| /scales/e-minor | T12 | 后做 | planned | P187 |
| /scales/f-major | T12 | 后做 | planned | P188 |
| /scales/g-major | T12 | 后做 | planned | P189 |
| /scales/pentatonic | T13 | 后做 | planned | P191 |
| /scales/a-major | T12 | 后做 | planned | P192 |
| /scales/c-minor | T12 | 后做 | planned | P193 |
| /scales/d-minor | T12 | 后做 | planned | P194 |
| /scales/e-major | T12 | 后做 | planned | P195 |
| /scales/b-minor | T12 | 后做 | planned | P197 |
| /scales/f-minor | T12 | 后做 | planned | P198 |
| /scales/harmonic-major | T13 | 后做 | planned | P199 |
| /scales/a-sharp-minor | T12 | 后做 | planned | P200 |
| /scales/b-major | T12 | 后做 | planned | P201 |
| /scales/b-flat-major | T12 | 后做 | planned | P202 |
| /scales/g-minor | T12 | 后做 | planned | P203 |
| /scales/chromatic | T13 | 后做 | planned | P205 |
| /scales/e-flat-major | T12 | 后做 | planned | P206 |
| /scales/f-sharp-minor | T12 | 后做 | planned | P207 |
| /scales/c-flat-major | T12 | 后做 | planned | P209 |
| /arpeggios | T14 | 后做 | planned | P215, P216, P217 |
| /guide/sight-reading | T22 | 后做 | planned | P219, P234, P264 |
| /guide/piano-chords | T22 | 后做 | planned | P220, P225, P242 |
| /guide/piano-books | T23 | 后做 | planned | P221, P251, P258, P260 |
| /guide/learn-a-piano-song | T22 | 后做 | planned | P230, P232 |
| /guide/piano-scales | T22 | 后做 | planned | P231, P259 |
| /guide/compose-a-piano-song | T22 | 后做 | planned | P239 |
| /guide/hanon-exercises | T22 | 后做 | planned | P245 |
| /guide/note-values-and-rhythm | T22 | 后做 | planned | P227, P252 |
| /guide/piano-exercises | T22 | 后做 | planned | P253, P261 |
| /guide/piano-hand-position | T22 | 后做 | planned | P254 |
| /guide/piano-practice | T22 | 后做 | planned | P257 |
| /guide/music-symbols-and-piano-terms | T22 | 后做 | planned | P144, P256, P262 |
| /sheet-music/let-it-go | T18 | 暂不做 | planned | P052, P081 |
| /sheet-music/super-mario-theme | T18 | 暂不做 | planned | P055, P084 |
| /sheet-music/thats-amore | T18 | 暂不做 | planned | P056 |
| /sheet-music/black-parade | T18 | 暂不做 | planned | P058 |
| /sheet-music/clocks | T18 | 暂不做 | planned | P059 |
| /sheet-music/from-the-start | T18 | 暂不做 | planned | P064 |
| /sheet-music/song-of-storms | T18 | 暂不做 | planned | P068 |
| /sheet-music/pink-panther | T18 | 暂不做 | planned | P072, P098 |
| /sheet-music/still-dre | T18 | 暂不做 | planned | P075 |
| /sheet-music/carol-of-the-bells | T18 | 暂不做 | planned | P077 |
| /sheet-music/edelweiss | T18 | 暂不做 | planned | P088 |
| /sheet-music/in-my-life | T18 | 暂不做 | planned | P092 |
| /sheet-music/all-of-me-john-legend | T18 | 暂不做 | planned | P094 |
| /sheet-music/runaway-kanye-west | T18 | 暂不做 | planned | P095 |
| /sheet-music/piano-man | T18 | 暂不做 | planned | P096 |
| /sheet-music/someone-like-you-adele | T18 | 暂不做 | planned | P099 |
| /sheet-music/song-of-healing | T18 | 暂不做 | planned | P100 |
| /sheet-music/a-whole-new-world | T18 | 暂不做 | planned | P101 |
| /sheet-music/easy-on-me | T18 | 暂不做 | planned | P109 |

02琴键(T03/04/05)、03音阶(T11/12)、04歌曲(T15/16)、05指南(T21/22)、06空白谱纸(T19)、07站点整合(T01/02)保留各自任务；T17/18及其他模板仅登记，不提前生成空实现。

## 02 实际模板（2026-09-09）

[已核实] T03 KeyboardLookupPage → LookupExperience（查询/候选八度/主动声音）；T04 LabeledKeyboardPage → LabeledExperience（完整分段标注/编号开关/当前打印/PDF）；T05 KeyboardChartPage → ChartExperience（双谱号/范围/双向定位/等音/当前范围打印）。三条静态路由实际调用 pages.tsx 的三个具名模板；共同外壳仅负责原文与站点结构，工具状态各自拥有。

[已核实] keyboard-content.ts 服务端白名单读取各页原对象，客户端仅接收实际键表、谱位、范围和打印来源ID。T03/T04的61键查询与标注已实现；T05/P132仍按原规划保留后续状态，P146唱名禁用。复用键盘几何、ReferenceAudio和SiteHeader/Footer；未把T03/T04/T05套成T07。证据见 checks/batches/02-keyboard-notes/implementation.md 与 checks/reviews/02-keyboard-notes/review.md；独立结论PASS_WITH_NOTES，用户已接受。

## 03 实际模板（2026-09-09）

[已核实] T11 ScalesCenterPage → ScaleCenterExperience，默认major:C；按类型和起音开放master中的15大调及15×3小调形式，并同步音名、半音结构、方向谱表、键盘、已核指法、声音及当前打印。正文继续显示大调表、形式半音、A小调上下行对比、音级名和原数据jazz示例；中心只链接本批实际存在的C/A详情。

[已核实] T12 ScaleDetailPage → ScaleDetailExperience，被/scales/c-major与/scales/a-minor两个薄路由调用。详情固定调性；C只呈现一八度、四种已核手别×方向指法，A按自然/和声/古典旋律小调分别读取上下行，所有下行指法null保持不补。两页共用同一ScaleReference、声音生命周期、键盘、谱表和打印renderer，但正文、速度、形式及A小调和弦表由各自源数据决定。证据见 checks/batches/03-scales/implementation.md 与 checks/reviews/03-scales/review.md；独立结论PASS_WITH_NOTES，用户已确认通过。


## 04 实际模板映射（2026-09-09）

[已核实] T15 SongsCenterPage → SongCenterExperience，仅由/songs薄路由调用。六个源版本打开即显示；搜索、出版方级别和六个非空目标集合共同筛选同一批ID。每条通过SongResourceCard显示作品、确切edition、level basis、选择理由、检查建议、access与出版方入口。无结果有显式清除，不生成SEO参数URL。

[已核实] T16 EasySongsPage → EasySongChooser，仅由/songs/easy薄路由调用。九个重点版本按all/kids/c-major/beautiful/adults/impress真实集合切换；50条目录通过CatalogTable作为单一HL00131140合集展示，不冒充50条逐曲测评。T15/T16共用SongShell、ReadingSection与SongResourceCard，但中心发现任务和Easy专题任务保持不同。

[已核实] 两页服务端从各自master对象生成轻量props；rights/source/issues仍在服务器验证层。仅/songs连接已授权/songs/easy，其他19个master topic_links保持未发布和404。证据见checks/batches/04-songs/implementation.md与checks/reviews/04-songs/review.md；独立结论PASS_WITH_NOTES，用户已接受。

## 05指南模板实施（2026-09-09）

[已核实] T21 `GuideCenterPage`由`/guide`薄路由调用：首屏给C4–D4–E4四拍任务和真实键盘图，随后以四步顺序展示当前可打开的键盘图与读谱页；未实现的节奏和短曲指南显示为planned且不生成链接。

[已核实] T22 `ReadSheetMusicPage`由`/guide/read-sheet-music`薄路由调用：保留读谱顺序、九个高低谱号锚点、FACE适用范围、加线音区条件和E-SR1四小节答案。两页共用`GuideShell`、`Section`、`BeatPattern`和`Printable`；教程页另用目录、锚点谱表、记忆对照和原生details答案。

[已核实] 服务端`guide-content.ts`核对模板、核心标题顺序、四拍算术、谱表坐标和PDF授权，公开PDF与源文件字节一致。证据见`checks/batches/05-guides/implementation.md`与`checks/reviews/05-guides/review.md`；独立结论PASS_WITH_NOTES，用户已接受。

## 06空白谱纸模板实施（2026-09-09）

[已核实] T19 `BlankSheetPage`由`/tools/blank-sheet-music`薄路由调用：页面默认选择US Letter，同时保留Letter与A4的直接下载；选择纸张后，打开打印和下载主操作指向对应的原始PDF。

[已核实] `BlankSheetTool`直接显示获授权的六组钢琴大谱表SVG，并提供75%–150%屏幕缩放和局部滚动。缩放只影响屏幕预览；下载和打印链接始终指向原尺寸PDF。无JS时选择控件禁用，两种格式下载、默认预览与Letter打印入口仍可用。

[已核实] 服务端`blank-sheet-content.ts`核对T19、block顺序、P079、五线与六组系统、空白音乐内容、Letter/A4资产及可分发权限；公开PDF/SVG与源文件字节一致。证据见`checks/batches/06-blank-sheet/implementation.md`；06独立验收待执行。



## 07 实际模板映射（2026-09-10）

[已核实] T01 `HomePage` 与 T02 `ToolsPage` 位于 `src/components/integration/pages.tsx`，由 `/` 与 `/tools` 两个薄路由实际调用。`src/lib/integration-content.ts` 只读取这两个源对象并核验模板、block顺序、canonical、release状态、P113及公开文件身份；客户端不接收总master、来源账本或问题台账。

[已核实] 首页把六个任务保持为六个独立入口状态：琴键、和弦、音阶、选曲与指南链接到已实现规范页；Sheet Music保持不可用文字，不生成占位路由。工具中心只链接三个现有查阅页、空白谱纸与指南PDF；`/chords/finder`和另外三项计划打印资料保持无链接。

[已核实] `SiteHeader`/`SiteFooter` 由首轮所有页面共用，六个栏目均为真实链接并标记当前栏目，品牌返回首页。页面内搜索仍是局部搜索，没有新增全站搜索索引。证据见 `checks/batches/07-site-integration/implementation.md` 与 `checks/batches/round-1-summary.md`；07初次独立验收为NEEDS_FIX；唯一P1已定点修复，等待独立复验。
