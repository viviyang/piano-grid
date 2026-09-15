# PianoGrid Songs + Sheet Music：连续执行 Prompt · v2.1

将本文件完整交给一个Codex实施会话。一次只允许一个业务代码写入者。资料包应在仓库外，不要先把附件复制进dirty项目，更不能复制到public目录。

---

你负责PianoGrid的Songs＋Sheet Music产品完成实施。执行以下阶段直至所有无阻塞任务完成，不只输出计划。普通实现选择自行作出；不可获得的许可、缺失基线和真人检查才单列阻塞。不要用三个原创短练习替代三首命名歌曲。

## 0. 固定约束与读取顺序

先读本包：
`01_MASTER_CONTEXT.md` → `BASELINE_CHANGE_v2_1.md` → `PLAN.md` → `DATA_CONTRACT.md` → `URL_DIFF.md` → `CONTENT_SUPPLY_AND_RIGHTS.md` → `PAGE_UX.md` → `MONETIZATION.md` → `content-data/page-section-contracts.v2.json`。
读取当前真实`PROJECT_HANDOFF.md`、Scales实际RESULT与可取得的Keyboard最新交接。旧`evidence/historical/`不作为当前执行授权。

Chords=`NO_ADDITIONAL_CHORDS_WORK`；Scales=`PASS_WITH_NOTES`。不重新补全这些模块、不改品牌/主题/Hero/关键词/原URL职责，不升级依赖。不开发账户、支付、订阅、评分、用户MIDI/录音识别、完整落音动画，不安装广告/收费服务。

内容事实采用当前64行C/D只读基线和明确的v2增补，不能把后续55页、19暂停页、17未分配任务或2历史线索删除。保留265个原资源位置及其页内任务。跨模块新能力只能引用真实已验收交接；没有新API则使用当前可用普通链接，不编造Notes deep-link参数。

## 1. 从Keyboard accepted baseline建立新的clean worktree

生产祖先基线是`main@1e3fdec`，完整commit：
`1e3fdecd6e9426999689df361a4f47aa2d378848`。

**但Songs + Sheet Music不能机械地再次从这个旧production commit开始。** 业务代码按`Keyboard → Songs + Sheet → Tools → Integration`串行继承。开始本专项前，必须先读取Keyboard最新`RESULT.md` / `Integration Handoff`，确认Keyboard已验收成果对应的**accepted baseline commit**。

现有历史dirty树（`codex/chords-b1`、HEAD线索`bdcc2e1`）仍只读保留。不得`reset`、`clean`、`stash`、覆盖或把整个dirty树当成Keyboard成果。

先运行只读检查并记录结果：

```powershell
git rev-parse --show-toplevel
git status --porcelain=v1
git worktree list --porcelain
git rev-parse --verify "1e3fdecd6e9426999689df361a4f47aa2d378848^{commit}"
```

然后执行以下门槛：

1. 读取Keyboard最新交接，记录：branch、HEAD、`git status --short`、实际修改文件、测试结果、RESULT、推荐给下一模块的baseline commit。
2. 验证该accepted baseline commit存在，并确认它包含已验收的Keyboard实现；同时记录它与`1e3fdec`的祖先关系/差异。
3. **从Keyboard accepted baseline commit创建Songs + Sheet新的clean worktree**，例如：

```powershell
git worktree add -b codex/songs-sheet-v2 ../pianogrid-songs-sheet-v2 <KEYBOARD_ACCEPTED_BASELINE_COMMIT>
```

4. 进入新worktree后确认：HEAD等于Keyboard accepted baseline、`git status --short`为空，再开始业务修改。
5. 不直接继续在Keyboard开发worktree里写Songs代码；这样Keyboard和Songs的diff、测试责任与回滚边界保持独立。
6. 不退回`main@1e3fdec`重新实现Keyboard已经完成的能力；Songs必须复用accepted baseline中的Keyboard能力。

目录/分支已存在时检查归属与clean状态；使用新的唯一名称，不用`-B`覆盖旧分支。

### Keyboard尚未形成accepted baseline时

如果Keyboard交接只有未提交diff、临时worktree或无法复现的状态，而没有可供下一模块继承的稳定commit：

- 记录`BLOCKED_KEYBOARD_ACCEPTED_BASELINE_MISSING`；
- **停止Songs业务代码写入**，不能悄悄回退到`1e3fdec`继续实现；
- 先由Keyboard/Integration流程把已验收Keyboard diff固化成可复用baseline commit；
- 本会话可以继续做资料校验、版权台账、页面映射等不依赖代码写入的任务；
- 不自行把整个dirty树提交成baseline，也不擅自挑选部分未验收diff。

如果`1e3fdec`本身不可用，另记`BLOCKED_PRODUCTION_ANCESTOR_UNAVAILABLE`；不能用浮动`main`、`origin/main`或历史dirty树替代。

## 2. 建立真正的代码事实，不把附件快照当生产

在基于Keyboard accepted baseline建立的clean worktree中定位实际模块。附件中的以下路径只是线索，先确认该baseline真实存在与API：
`src/lib/song-types.ts`、`src/lib/song-content.ts`、`src/lib/site-content.ts`、`src/lib/site-routes.ts`、Songs目录下`pages.tsx`/`center-experience.tsx`/`easy-experience.tsx`、`use-note-audio.ts`及其ReferenceAudio来源、resource-card组件、Scales/Keyboard播放器与打印/分享实现。

生成真实`BASELINE_FACTS.md`和`BASELINE_URL_DIFF.json`：
- repo根目录、production祖先`1e3fdec`、Keyboard accepted baseline完整commit、当前Songs工作树及clean状态；
- Songs/Sheet现有routes、PUBLIC_ROUTES、master页、关联资源、预览/音频/键盘/分享能力；
- 首8页哪些已有、哪些才需新增；其余55模块页/工具协同状态；
- 历史173 sitemap、dirty28白名单、本轮真实route数量分开；不能把抓取失败填404。

重点复现：`toResource`是否只读取`first_check`而忽略`prerequisites_or_first_check`；两个字段不同时保留冲突，按DATA_CONTRACT最小兼容。复核硬编码“six”“Nine specific versions”、固定block列表和授权页读取逻辑。没有在production复现就记“快照差异”，不要为了修复不存在的问题改代码。

## 3. 同一注册表与非丢失迁移

接入`content-data/catalog.v2.json`中的规范候选，映射现有数据目录/类型即可。不要把203候选自动变为203公开资源；只有当前页原有合法外链和本轮满足门槛的条目可显示。

旧`catalog.registry.json`及原page resources只读迁移；运行时只读一个版本库。旧平铺key/hands/access等历史值只在legacy_snapshot留证，不再作为另一份可编辑音乐事实。

保持external分支禁止转载的校验；为local资产增加带revision/hash/rights/QA的独立校验分支。统一work→arrangement→resource→asset、source/rights/relations。通过`contracts/`参考函数的负向测试，但按现有项目架构接入，不另起一套服务。

逐一映射265个资源位置，保留页内顺序/标签/source IDs、50合集与精选的区分、完整original source_groups。相同legacy ID有不同版本事实必须记录冲突，不能全部按歌名合并。null/[]语义、手别轮换/同时、指法证据和出版方难度标签严格分开。

三首外部版本地score/audio必须保持null。本地24文件先放非public的staging。`runtime_grants`为空是当前事实，不能为了开按钮创建假许可。测试grant只能留测试文件，不能出现在正式数据。

## 4. 接入首批内容与八页独立职责

首批目标：`/songs`、`/songs/easy`、`/sheet-music`、`/sheet-music/easy`、`/sheet-music/beginner`、`/sheet-music/hot-cross-buns`、`/sheet-music/twinkle-twinkle-little-star`、`/sheet-music/ode-to-joy`。

使用实际英文增补`content-data/english/pages.patch.json`、8篇英文页面文件、6张`learning-cards.v2.json`与`ui-copy.json`。这是增补，不覆盖原master整页、更不能删除全部旧block。先按`page-section-contracts.v2.json`保留原必须分区和任务。

Songs完成：实际搜索/技能和资源位置筛选→具体版本卡→适合谁/先会什么/先练哪只手/第一步→真实listen/practise/get-score。未知手别/音域/和弦不进入肯定筛选。相应卡片只依本版资料给建议。一般原创热身显著写“Separate original exercise — not this song”。

Sheet完成：精确版本→difficulty依据与format→真实preview或外部预览说明→access/rights/print范围→获取→同版本学习回链。不要第二套歌曲学习长文；Song和Sheet必须解出同一个arrangement_id/revision。

原页面子任务不能丢：root的free/easy/intermediate/worship/hymns/gospel；easy成人/儿童；beginner P106有指法版本。原Amazing Grace手位数字候选需要实际视觉复核；不拿无指法的3原创谱假装覆盖P106。格式需求不同的页面不以完全同一批卡片＋改标题硬上线。

逐任务遵守原first_release_scope：required-now主任务必须具备，原“后续同页补齐/资源就绪后开放”仍可分批，但不得宣称已覆盖或删去台账。不要把所有未来子任务都升级成首批阻塞。

后六页先在production核对差集再实现。每页满足原release_conditions后才公开；合法外部版本获取页可独立交付，不强制等本站谱，但不能使用“本站免费PDF/可播放”不实承诺。未满足本页必要任务时保留明确阻塞和现有未发布行为，不把不完整页放sitemap。

## 5. 低风险本站练习、听音、谱面

复用实际现有keyboard/staff/audio，新增最小sequence/transport适配，不创建第二引擎。先接3原创练习在staging：同一事件资料导出/校验SVG、PDF、XML、MIDI、WAV；不改一处后忘记其他文件。

支持本批明确动作：Play/Stop、音量、50/75/100速度、all/bars-1-2/bars-3-4，改变参数先stop/reset；无自动播放、无自动评估演奏。事件调度保持音高，WAV按metadata使用，不能按文件总时长均分小节。未实现速度/片段则隐藏对应控件并报未完成，不用不匹配播放模拟成功。

所有模块同时只能有一个有效音频owner。覆盖快速连点、切片段、切版本、切路由、hidden/beforeprint/unmount、加载失败/权限拒绝。正常结束和停止后无挂音、无残余计时器。使用有效note/off/epoch等现有策略，不推测API。

谱面预览有可访问文字谱；PDF选择A4/US Letter。手机支持局部谱面滚动但无全页溢出。禁止把现代外部PDF、截图、音轨、采样拷进public。

独立原始旋律/权限缺失的命名曲只实施已具备外部导引，不从记忆或模型输出直接生成其知名旋律并填“公版”。按CONTENT_SUPPLY路线保留三首的独立音乐供给任务和解除证据。

## 6. 权利发布门槛与构建资产防泄露

生产能力由可信服务器/构建记录派生：具体asset存在/hash一致、同arrangement/revision、许可动作/地域/商业使用/期限、分层权利证据、必要内容和人工检查。

参考`contracts/gates.mjs`但不能声称代码能证明法律。合法审批缺失则对应资产保持staging；无授权文件不进public、静态导出、CDN、source map或metadata媒体URL。测试fixture不得作为真实批准。仅关按钮、robots或noindex不能补转载许可。

本包没有真实真人听音/实体打印/具名专业审核证据；不可填passed。可以完成代码和staging自动测试，把真实人工动作列入HANDOFF；已有可信且指向这些hash的验收证据才可复用。

## 7. 同版互联、Print/Share、SEO、商业钩子

关系引用确切notes/chords/scale证据；无和弦记谱就不自动填C/F/G。Hoffman Ode D大调只是调性已核，不能据此生成全部D大调和弦。目标在真实路由可用才链接；否则用对应既有中心页，不为了内链扩建Chords/Scales。

Share保留`pg-arr`/segment/speed和旧`pg-ex`打印别名；严格白名单、重复key拒绝、未知版本报错、无自动播放。同名换编配不能悄悄用其他ID恢复。Print带本版revision/许可摘要/正确回站链接；不要把用户打开打印窗记成打印成功。

SSR输出版本事实/有效提供方链接；canonical不带筛选/练习状态。只把真实公开且任务完成的规范URL写sitemap，lastmod用重要变更事实。保留原Title/主词职责，以完成内容实际支撑新英文文案。不做fake Offer/rating/teacher review。

Affiliate先保留自然版位/数据类型，真实批准且可用跟踪URL才启用并披露/rel=sponsored；不编造佣金。免费核心、旧免费PDF保持免费。新printable/teacher pack仅候选，不接收款/购买按钮。广告脚本不接；future PracticeTarget只类型，不建账户/订阅服务。

## 8. 自动测试、回归和独立验收

先运行本包提供的文件检查（与网站测试分开）：

```text
python qa/check_package.py
python qa/check_music.py --output qa/music-check-results.local.json
node --test qa/gates.test.mjs
```

路径按资料包根目录。若Python库不在当前环境，记录缺依赖，不默认升级项目依赖来满足外部检查；已附实际结果可对照但不能冒充你运行。

网站测试从真实package.json确定现有命令，不凭本包捏造命令或测试计数。新增并实际运行：
- 所有资源引用/旧265位置/完整任务不丢；外部无本地媒体、未知不误筛、两种first_check兼容；
- Song→Sheet/返回/打印回站的同版一致；不能跨版本共用音频；
- grants缺失、错hash、错revision、过期/撤回/不匹配地域、非商业、缺分层证据均拒绝；staging资源不泄露；
- 播放单owner、停止和切换取消、音量0、速度不改pitch、片段起止、失败恢复；
- 320/375/390与桌面、keyboard focus/aria/文字谱、print布局、无JS内容；
- 8页主任务、title/canonical/结构数据、实际route/sitemap差集；55页/19暂停未误公开；
- Chords/Scales/Keyboard已有关键路径回归，实际base与final比较，不重跑一个常量173当全站断言。

独立验收使用`INDEPENDENT_REVIEW_PROMPT.md`，先实施完成停止写业务代码，再交第二只读会话；发现可复现问题返回实施会话修复。独立验收不能因为复杂而自己偷改业务代码造成并行冲突。

## 9. 真实交付，不预写全模块PASS

在实际项目的文档区输出：
- `RESULT.md`：base/end tree、实际文件diff、命令/退出状态、首8页逐页、3命名曲/3原创分别列、全部原范围去向；
- `URL_DIFF.actual.json`：新增/修改/保留、canonical/sitemap/indexability，线上仅实测部分；
- `RIGHTS_AND_CONTENT_BLOCKERS.md`：每项缺什么、影响哪个动作/URL、解除证据与责任人；
- `MANUAL_ACCEPTANCE.md`：真实已做/未做/失败，不能用自动截图代替真人听音/打印；
- `INTEGRATION_HANDOFF.md`：共享能力、字段/ID、片段/分享、正确后续入口；Tools只组织这些真实能力。

分开报告：范围记录完整、包内文件检查、代码测试、音乐独立复核、人工、线上、商业。`PASS_WITH_NOTES`仅可用于有证据的具体层；缺谱/许可的知名歌曲不能填完成。需要人工动作可以终止对应发布，但不要因此省略其余安全实现。

不提交、不推送、不部署、不改DNS、不收费。不得在没有当前授权时替用户发送许可邮件、申请affiliate或改生产账号。
