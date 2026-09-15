# PianoGrid Beginner Songs + Sheet Music 产品完成方案 · v2.1

生产祖先基线：`main@1e3fdec`（完整commit：`1e3fdecd6e9426999689df361a4f47aa2d378848`）。

**Songs + Sheet Music直接代码基线：Keyboard完成并验收后的accepted baseline commit。该commit由Keyboard最新RESULT / Integration Handoff在实施时确定，不在规划包中预先编造。** 日期：2026-09-15。

**本轮决策：保留正确外部版本，补成“选版本 → 明确前置能力 → 有依据的起步步骤 → 同版取谱 → 已具备权限的站内练习”的路径。**

[推断] 独立开发优先采用少量可验收版本、统一能力门槛，不先造大型乐谱编辑器、落音动画、账号或订阅系统。三个样板是首批，不是最终目录边界。

## A. 当前真实状态

### A1. 四类证据不能混合

| 层 | 已知 | 不能得出的结论 |
|---|---|---|
| 生产祖先与串行规则 | [已核实] `01_MASTER_CONTEXT.md`指定production revision=`main@1e3fdec`，并规定业务代码顺序`Keyboard → Songs + Sheet → Tools → Integration` | Songs不能绕过已验收Keyboard成果重新从旧production commit实现；也不能把Keyboard开发worktree直接当Songs工作区 |
| 2026-09-14生产审计 | [已核实] 当时sitemap 173个候选、0 FAIL；包含`/songs`、`/songs/easy`，没有`/sheet-music*`候选 | sitemap未列出不等于服务器一定404；173不是未来固定断言 |
| 本轮公开页面 | [已核实] Songs显示6个版本；Easy显示9个精选版本并保留合集资源，明确外部参考。[S01,S02] | 文本抓取不能证明播放器、打印、读屏实测，也不能证明当前部署commit |
| dirty源码快照 | [已核实] HEAD `bdcc2e1`，`PUBLIC_ROUTES`28条；Song模型严格外链、禁止转载；没有Sheet公开白名单 | 不代表`main@1e3fdec`当前文件，不把28和173之差当网站故障 |

[已核实] 当前ZIP不是完整仓库；未包含完整`.git`，本轮不能执行生产编译。Sheet Music六个目标页与sitemap本轮抓取失败，HTTP状态未获证实。**不得填404、缺页或线上PASS。**

### A2. 已有能力与真实差集

| 已有/观察 | 差集与实施动作 |
|---|---|
| 版本名、出版方、级别、获取方式、权利说明 | 保留；增加“已核实演奏条件”与“出版方标签”分层，不用Easy自动推断技术难度 |
| Songs搜索、级别/目标过滤，Easy场景切换 | 复用；增加实际可练位置、手别/要求筛选。未知不进入肯定筛选 |
| 原有说明与50曲合集目录 | 保留，不称“50首独立测试排名”；去掉动态数量被写死的文案 |
| `song-content.ts`读取`raw.first_check` | [已核实｜快照] 初学资料有`prerequisites_or_first_check`，当前适配未读；Codex在production复核后最小修复 |
| `SongResource`外链校验 | **不能删掉校验来允许一切资源。** 保留外链分支，新增本地许可/资产分支，由统一注册表派生能力 |
| 两个Songs渲染模板与固定block列表 | 补充学习区必须可扩展且保留原block任务；不要关闭原内容完整性校验 |
| 已有keyboard/staff/audio | 先在production核对API，复用ReferenceAudio或最新已验收等价能力；不要假定当前hook已有歌曲调度/音量/全局互斥 |
| 旧内容包3个原创练习、24文件 | 可做接入与数据验证；未实施网站、未真人验收，不能直接复制到public后称可发布 |

### A3. 竞品只取任务证据

[S07] 8notes对应页把版本条件、播放、速度、选小节循环、打印放在谱边；PDF下载与试听配额有边界，不能宣传全部免费。
[S03–S06] Hoffman把初级版本、手位/教程、音轨与购买/免费表单绑在具体资源上；消费者/教师许可不授权本站重发。
[S08] Musicnotes正式SKU区分编配、级别、格式和获取选项，不能把一个版本的打印/交互能力复制到另一个版本。

[推断] 本站缺的不是再写一篇歌曲榜单，而是版本选择后的明确任务入口和真实可用资源。先补起步、分段、取谱一致性，不照搬竞品全部功能。

## B. Songs / Sheet Music职责

| 问题 | Songs负责 | Sheet Music负责 |
|---|---|---|
| 选什么、为什么适合 | 按具体版本、实际技能/用户目标筛选；不按歌名贴初级 | 可显示同一版本难度摘要，不再写另一套榜单 |
| 怎么开始 | 前置能力、先练哪只手、第一段、练习步骤与自检 | 链回同一版本学习起点 |
| notes/chords/scales | 依据该版本真实谱面/事件给关联；未知就不声称“需要” | 展示版本事实与必要说明，数据共用 |
| 可以听什么 | 本站准确示范或明确外部试听；一般热身与歌曲演奏分开 | 同一音频资产/提供方入口，不创建第二个播放器会话 |
| 拿哪个谱 | 同arrangement深链 | 主责：版本、预览、格式、权利、获取、打印 |

Songs主要CTA为 `See how to start` / `Practise this version`（后者仅实际可用时）；Sheet主要CTA为 `Preview score` / `Download A4 / US Letter` 或 `Open publisher resource`。按钮由能力计算，不由营销文案决定。

## C. 统一work / arrangement / resource契约

详见`DATA_CONTRACT.md`与`contracts/catalog.types.ts`；真实候选在`content-data/catalog.v2.json`。

[推断] 最小链路：`Work → Arrangement → Resource → Asset`；来源、权利、准确性和发布状态分别记录。

- Work：作品身份；同名不能自动合并，谱曲与歌词可有不同权利。
- Arrangement：具体编配/调性/手别/节奏/音域/技能/片段/修订；仅此层定义学习任务。
- Resource：提供方具体版本入口或本站资源包；免费、表单/账号、付费与未知获取路径分开。
- Asset：具体SVG/PDF/MusicXML/MIDI/events/WAV及hash。`score_asset_id`指预览SVG，PDF等为同版额外资产；`audio_asset_id`指匹配WAV。

[已核实] 保留265处历史资源出现位置及200个版本候选；规范化库增加3个原创版本，共203个版本候选和24个本地文件。**这不是203个已审核/可发布作品。** 未核作品保留source-qualified身份，不为凑去重数强行合并。

`public_domain_work`、`pianogrid_original_arrangement`、`licensed_resource`、`external_reference`、`unknown/blocked`不是一张互斥枚举表：一首公版作品可有受保护的现代编配，资源仍可只是外部参考。模型分别存作品权利、编配来源、资源位置与动作许可。

## D. 内容供给策略

**默认主线：对已核准基础作品制作PianoGrid新编配；现代出版社版本保留外链。** 不把“等Hoffman授权”作为唯一供给路径。[推断]

1. 已有外部版：保留具体来源，完成可核的元数据、选择理由和获取说明。没有本地score/audio就不显示本站演奏。
2. 本站命名曲：原始历史谱/可靠授权原文 → 验作品和地域 → 新编配或书面许可 → 独立逐小节核对 → 自排版 → 匹配合成示范 → 文件与人工门槛。换成C大调的新编配必须有新arrangement_id，不改Hoffman D大调版的事实。
3. 原创练习：上一版已有3个，不再重复编3个；用来完成本站工具链和一般基础练习。**不替代命名歌曲目标。**
4. 当代/流行作品：真实正版外部入口；未来取得合同后才接入许可资产。不把歌词、谱面或录音经模型重写就称原创。

已发现的原谱线索和未证实事项见`CONTENT_SUPPLY_AND_RIGHTS.md`；本轮没有把同名Library of Congress资料自动认作常见旋律。未取得资料不放空PDF/MIDI占位。

## E. 首批实施范围

### E1. 一次连续实施的产品范围

**8个目标URL：2个既有页增强＋6个原规划页条件性接入。**

`/songs`、`/songs/easy`、`/sheet-music`、`/sheet-music/easy`、`/sheet-music/beginner`、`/sheet-music/hot-cross-buns`、`/sheet-music/twinkle-twinkle-little-star`、`/sheet-music/ode-to-joy`。

前两页保留原任务；后六页先验证production差集和各自source_groups，再实现并逐页决定是否满足发布条件。**不是默认建6个薄页，也不是缺一个版权就把6页全停。** 外部版本获取页可以如实提供价值，但不能宣称本站谱；对应标题意图需要的事实仍必须真实交付。

### E2. 六个样板对象，不混算

| 对象 | 本轮已有材料 | 可实施/阻塞 |
|---|---|---|
| Hot Cross Buns · Hoffman Lesson 1 | [已核实] 元数据、免费表单/账号、谱/音轨包描述；英文学习卡[S03] | 外部选择和取谱路径；本地音符/手别、谱和音频尚未核验及获许可 |
| Twinkle · Aron Bernstein Early Elementary | [已核实] C major、4/4、一页、教程/手位图[S04] | 外部版详情；没有本地演奏序列，不把手位图当完整逐音指法 |
| Ode to Joy · Joseph Hoffman | [已核实] D major、4/4、一页、初级、购买/Premium[S05] | 外部版详情；不替换成未说明的C大调版，本站托管仍阻塞 |
| Step and Hold | [已核实] 右手、4/4、C4–G4、4小节、8文件 | 接入独立练习区；音乐/人工与发布门槛后启用 |
| Left-Hand Answer | [已核实] 左手、3/4、C3–G3、4小节、8文件 | 同上；不标为任一命名歌曲片段 |
| One Hand at a Time | [已核实] 两手轮换、4/4、4小节、8文件 | 同上；不称双手同时练习 |

本轮英文8页增补、6张学习卡、来源/权限、实际资产、数据适配和能力门槛已给出。对命名曲的未知note/chord/手别保持null。一般热身CTA必须显示 `Separate original exercise — not this song`。

### E3. 必须保留的页内任务

`/songs`原8个任务组；`/songs/easy`原6个任务组与kids/C-major/adults/beautiful/impress用途；保留9精选与50合集曲目记录，不硬编码数量。
`/sheet-music`保留free/easy/intermediate/worship/hymns/gospel实际结果；`/easy`保留成人与儿童结果；`/beginner`的P106指法任务需要**资源本身实际出现指法数字的证据**。

[已核实] 原材料有Amazing Grace Preparatory手位数字历史检查，本轮PDF文字仍可读，但截图失败，未重新视觉核验。[S17] 它可以是待复核外部候选，不能拿三个无指法原创谱冒充P106完成。数字手位图、起始指法和每音指法在UI分开。

### E4. 明确不做

本轮不新建`/songs/[slug]`、用户账号、付款/订阅、录音/MIDI识别、自动评分、完整落音动画、自由转调、任意谱上传、歌词库、大规模自动谱面生成、广告脚本。MIDI文件用于参考与验证，不等于接入用户MIDI设备。

## F. 完整扩展路线

| 阶段 | 交付 | 退出条件 |
|---|---|---|
| S0 基线与基础实施 | 读取Keyboard RESULT/Handoff → 确认accepted baseline commit → 从该commit新建Songs clean worktree → 统一注册表、旧字段修复、8页内容与3原创工具链、所有台账 | Keyboard基线可复用且Songs工作树clean；独立可实施项完工；素材/人工阻塞逐项记录，不吞掉 |
| S1 首3首命名曲站内版 | 优先Hot Cross Buns、Twinkle、Ode；每首另有许可或PianoGrid新编配 | 每首同版谱、听、第一段、学习说明、取谱、权利和独立核对齐备；不是用热身替代 |
| S2 原批准基础曲扩展 | Jingle Bells、Amazing Grace、Mary Had a Little Lamb、ABC Song、Silent Night、Happy Birthday、Jesus Loves Me、Für Elise | 每个原任务有合适具体版本；难度和形式真实；Für Elise完整原版不能贴零基础标签；ABC与Twinkle不自动共享同一节奏/歌词版本 |
| S3 专题和记谱任务 | 其余20个Songs专题；Sheet分类、letter-notes、annotated、lead-sheets等按逐页台账推进 | 每个分类有真实满足条件的资源；lead sheet需旋律与和弦，纯和弦表另标；商业流行曲优先正版外部版 |
| S4 19暂停页与无URL任务 | 保留原暂停、17个未分配任务和2条历史线索 | 解除具体作品/记谱/资源阻塞并获得发布批准后再推进；本轮不激活 |
| S5 商业增量 | 新原创beginner/teacher pack与真实批准affiliate | 新增价值、可授予权利、交付/支付/披露都具备；订阅只留契约 |

[推断] 排序按“用户任务影响 → 执行难度 → 验证速度”，不按没有的CTR。S0可用性最高优先；S1是命名曲产品核心；S2/S3每批用相同审核管线，不再整站重规划。每一阶段允许合格页独立发布，但部署仍需授权。

[已核实] 全范围为22 Songs＋41 Sheet＝63模块URL，另有Blank Sheet协同1项。首8页之外还保留55模块URL，其中36常规后续、19暂停；详表`URL_DIFF.md`。这不是要把全部候选立刻加入sitemap。

## G. URL差集

`content-data/route-diff.json`逐条保留原URL、template、主词、source_group、原发布条件、dirty/public观察和本轮动作。

- 2个既有Songs：增强，不改路径/规范URL。
- 6个Sheet候选：在固定生产Git树核对后新增或适配；只有满足本页原任务和能力门槛才进入PUBLIC_ROUTES/导航/sitemap。
- 55模块后续URL：不删除，不自动激活。
- `/tools/blank-sheet-music`：复用真实现有入口，不重做工具。
- 禁止将速度、片段、手别、免费筛选等组合扩为可索引页。未知/无权资产不因加noindex就变得允许发布。

生产新增页面总数由Codex在实际base和final tree作差集产生；不能把8、6、28、173写成同一个对象。

## H. 页面UX

详见`PAGE_UX.md`。Songs首屏先展示可理解的选择条件和版本卡；选择后就在该页面展示“适合谁/先会什么/先练哪只手/第一步/听与练/去取同版谱”。

Sheet首屏是“曲名＋明确版本、格式、难度来源、资源位置与主获取动作”，之后为真实预览或外部预览说明、打印范围、版权、同作品其他版本与学习返回。

手机320/375/390宽度不全页横滚；五线谱可局部横向滚动并有可访问文字谱。电脑不把信息平铺成大表。主动作一个，其他为次级动作。沿用品牌、主题、设计变量和既有样式，不改首页Hero。

## I. Copyright / Rights Gate

[已核实] 音乐作品与录音权利分开，网页公开不等于允许转载；Hoffman教师许可不是公共网站许可。[S06,S10,S11]

顺序：**身份 → 原谱/编配来源 → 分层权利 → 具体动作/地区/期限 → 文件hash → 音乐核对 → UI/资产发布**。

逐层记录基础作品（含需要时歌词）、编配、刻写文件、录音及采样/字体。每个动作分别判断：描述并外链、谱面展示、打印/下载、音频流播/下载、改编、商业用途和下游授权。`unknown`不是`allow`，普通付费购买不是本站分发权。

本包全部本地资产默认staging；运行时授权记录空，不能自动发布。后续放行需要真实证据与审批，不能让Codex把布尔值改true充当获得许可。无凭据第三方asset不要进入public目录/CDN/构建产物；仅隐藏按钮不够。

原创练习来源与生成工具已记录，数学合成音色无钢琴采样；OpenAI输出条款不保证独占/第三方清权。[S16] 不宣称human-composed、teacher-reviewed或全球公版。具名专业审核未做就是未做。

## J. SEO

页面主任务、Title、Description与H1一致；现有主词和分区保持。内容服务器输出，JavaScript失败仍能读版本事实和外部获取链接。筛选与练习状态用fragment；规范URL不含状态。[S12]

只有真实可用、内容具备的规范页进入sitemap；更新lastmod仅在真实重要内容变更时，保留其他模块规则，不重建整站URL。[S14]

结构化数据最小用WebPage/CollectionPage、BreadcrumbList、实际可见ItemList；不写虚假Offer/rating/review/AudioObject。外部试听不是本站audio资产，不把“Premium包含”标为全球免费。无效资源页不以空200冒充完成；本轮未激活页保持原来未发布行为。

外部正版链接不天然伤害SEO；本包不提供排名保证。商业链接在真实获批时标`rel="sponsored"`并清楚披露。[S13,S15] 不强制字数/关键词密度，不批量新增三首之外的索引模板。

## K. Chords / Scales / Notes关联

关系包含`arrangement_id`、`relation_type`、证据定位、目标、目标可用性和关系强度。**有这个调名不代表这个谱需要该调全部和弦/音阶。**

原始练习的note_inventory由精确事件给出；三个练习没有同时和弦/和弦符号，所以关联应为“此版未记谱和弦”，不是猜C/F/G。C-major页只作可选音符集合参考，明确这不是练完整音阶。

Hoffman D-major是已核版本调性，但note/chord inventory仍未知；可给“认识调号”的一般参考，不写“本曲使用所有D大调音”。D-major路径若生产不可用，回退`/scales`并提示选择D major，**不因某条内链开新Scales页**。

当前Keyboard已有查音/谱表入口可复用；未来Keyboard新增分享协议只在真实交接支持时适配，未提供新API时保留普通链接。严禁为了联动重启Chords/Scales工程。

## L. Print / Share

复用已有合法免费打印资源；本地谱A4/Letter、版本和修订、调/拍/手别、许可摘要、回站路径一致。打印只含实际选版，不带广告/导航/隐藏答案或其他版本。浏览器打印可能被取消，事件不能叫`download_success`或证明实体打印。

沿用上一版状态协议`#pg-arr=<id>&segment=bars-1-2&speed=75`，保留印在旧PDF中的`#pg-ex=<slug>`别名。允许all/bars-1-2/bars-3-4及50/75/100；未知ID或撤下版本明确提示，不默默换版。外部版拒绝本地片段/速度语义。

分享链接定位同arrangement，不触发自动播放；剪贴板失败提供可复制文本/普通URL。参数不作为SEO页面。资源hash与修订变化时复核旧分享与回站。已印PDF别名不因新版数据ID改变失效。

## M. Monetization

详见`MONETIZATION.md`。免费查询、核心练习与原免费PDF继续免费。现在只给商业自然位置和类型，不接支付、不申请affiliate、不安装广告。

- 正版sheet affiliate在具体外部版本获取框旁；真实项目存在不等于本站获批。[S09]
- 原创beginner/teacher包需新增有价值的编排、渐进练习、答案/教学材料与可授予使用范围；不把24个现有免费文件换封面收费。
- 广告候选只在选曲/阅读内容之后；播放器/键盘/谱面/打印操作区无广告。准入与真实流量后再评估。
- Future Pro仅保留versioned practice target和非业务实现接口：历史、MIDI、教师作业、保存练习、去广告均不实施。

转化事件区分`publisher_link_clicked`、`print_requested`、`practice_started`、`self_report_recorded`；点击/播放不能称已学会或收入。无真实collector不假称数据已进GA。

## N. QA / 人工验收

`qa/`中本包测试不是网站测试。三个原创已有独立字面规格/格式解码/音频频谱检验，不是独立教师。测试不得import生成器或拿events生成自己的expected答案。

Codex实际测试：迁移无丢失、前置字段修复、原block/分区保留、版本/资产一致、权限拒绝、过滤未知、外链失败、SVG/PDF失败、播放停止/切换/音量/生命周期、速度不变调、片段边界、分享同版、原URL回归、raw HTML/canonical/sitemap/JSON-LD、手机/键盘焦点。

人工分别记录：iPhone Safari实际听/停/后台返回，Windows实际操作，人耳逐音与谱核对，A4/Letter实体打印，NVDA或VoiceOver读屏，必要的独立音乐/刻写审核。未执行`NOT_RUN`，不拿Playwright模拟冒充设备。

验收结论分层：`scope_accounted_for`、`engineering`、`rights_and_music`、`human_checks`、`deployment`、`commercial`。只完成外链＋3原创不能写“3首名曲站内完成”；只能报告安全实现部分与命名曲阻塞。

P0：不明权限资产上网、谱音错版、错误音高/节奏、伪造付款或弹奏检测；P1：主路径不可用、分享换版、打印错误、静默删原任务；P2：非关键样式改进。不用P2无限拖延。

## O. Codex连续执行

详见`CODEX_PROMPT.md`：读取Keyboard交接 → 确认Keyboard accepted baseline → 从该commit建新的Songs clean worktree → 建事实表 → 数据迁移和门槛 → 8页增补 → 3原创低风险练习 → 同版Print/Share/互联 → SEO/商业预留 → 自动验证 → 独立只读审阅 → 真实RESULT。

高风险阻塞只拦对应资产/功能，不要求用户逐步选普通设计。不得stash/reset/clean/覆盖历史dirty树；不得退回旧`1e3fdec`绕过Keyboard成果，也不得直接复用Keyboard开发worktree。没有明确授权不提交、推送、部署、收费。

**本包完成标准：A–O均有明确执行材料与保留台账；不是提前签发网站PASS。**


[已核实｜本包复核] 3个原创练习的音乐事件、MIDI和WAV复用原材料；本轮调整了谱面音名标签与低音加线音符的间距，更新3个SVG和6个PDF（engraving rev2），音高/节奏不变。修改前后hash在`qa/engraving-changes.v2.json`，新版以`catalog.v2.json`的hash为准。
