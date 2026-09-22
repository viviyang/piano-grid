# URL / Template Task Audit

全量206行URL见 `ROUTE_TEMPLATE_INVENTORY.md`。下表覆盖所有模板族；能力结论为 [REPO_VERIFIED]，需求与indexability建议为 [INFERRED]/[UNRESOLVED]。KEEP表示保留当前职责，不表示每页搜索需求/排名已验证；REWORK表示拟优化当前页面，绝不自动noindex/delete/redirect。

| URL/Template | User Job | Entry State | Immediate Answer | Verify | Understand | Act | Natural Next Step | Unique Utility | Demand Evidence | Indexability Decision |
|---|---|---|---|---|---|---|---|---|---|---|
| `/` | 选择当前钢琴任务 | 不确定栏目 | 六类真实入口 | 首页键盘示例 | 任务说明 | 打开工具/参考 | notes/chord/scale/song | 任务路由 | [UNRESOLVED] GSC无导出 | KEEP |
| `/chords` | 按名称查和弦 | 已知名称或类别 | chart/notes/formula | 键盘/播放 | family与key区别 | 选对象/打印 | detail/finder/by-key | 集合筛选+引用 | 仓库query evidence有第三方/编辑记录，非第一方 | KEEP |
| 9个Chord Family | 找同类成员、理解结构 | 已知quality | 同family列表/公式 | family explorer或detail | family-specific解释 | 选择对象 | named detail/已有state | family比较，不是root同义页 | [UNRESOLVED] 每族增量未知 | KEEP |
| `/chords/c-major` | 查C major并练 | 已知名字 | C–E–G、1–3–5 | 键盘/谱表/播放/3位置 | 源范围/转位 | 独立guided practice | connections/再次练 | 最近批准pilot能力 | [UNRESOLVED] uplift未知 | KEEP |
| 其余major/minor detail | 查具体拼写与位置 | 名称查询 | 对象notes/formula | 键盘/audio/print | 来源限定指法/转位 | builder | key/scale/guide，覆盖不一 | 具体note spelling及注册voicing | [UNRESOLVED] 不按模板推断所有页有需求 | REWORK |
| Seventh detail | 区分7/maj7/m7/m7♭5 | 相似符号 | 4音/公式 | 注册转位及播放 | quality差异 | builder | 比较/key | 第七音与quality独特信息 | [UNRESOLVED] query逐页验证待补 | KEEP |
| Diminished/Augmented detail | 查特殊三和弦 | 已知名称 | 正确拼写/公式 | 键盘/audio | 与major/minor区别 | builder | guide/context | 降五/升五、拼写 | [UNRESOLVED] 独立utility已见，需求量未知 | KEEP |
| Suspended/Add detail | 区分替换third与添加音 | sus/add query | 对象specific notes | 实际voicing/audio | 缺third与保留third；add≠extended | 已有练习 | family/comparison state | 声部/公式解释 | [UNRESOLVED] 不拆同义词 | KEEP |
| `/chords/extended`、`altered` | 查高级公式和具体voicing | family或Finder来访 | 108/96引用 | explorer/audio | omitted/doubled/realization | 现有practice modes | Finder/guide | 数据对象驻留hub | [UNRESOLVED] 新detail需求未知 | KEEP |
| 288个无detail对象 | 查某supported object | Finder/hub selection | formula+reference | 按所在family能力 | exact vs supplied | 使用既有hub | 返回candidate | 丰富数据，不自动成页 | [UNRESOLVED] 独立搜索未证实 | INTERACTIVE_STATE_ONLY |
| `/chords/finder` | 已知音找候选 | pitch classes，可选bass | exact/supplied candidates | 显示formula tones，转到reference | 多义/no-match边界 | 打开候选 | matching detail/category | 433对象反向匹配 | [UNRESOLVED] 事件不完整 | REWORK |
| `/chords/by-key` | 找给定key的和弦 | 已知key | 24context/336rows | notes与scale对照 | root/quality/Roman分离 | chord href | scale/progression | 成调环境 | [UNRESOLVED] 每个key不单独建URL | KEEP |
| `/chord-progressions` | 练命名进行 | pattern/key | 8pattern/96example | 播放/当前step | common tones、非调内提示 | loop/print | chord detail | 可执行示例 | [UNRESOLVED] 使用率未知 | KEEP |
| `/scales` | 查/反查音阶 | tonic/form或notes | 60named references | 键盘/audio | pattern/form、source scope | quiz/practice/load | detail/guide/PDF | 搜索+练习+静态参考 | [UNRESOLVED] 第一方未知 | KEEP |
| 19个Scale Detail | 查指定音阶 | tonic/form | notes/key signature | 手别方向audio/keyboard | 来源范围/FAQ | quiz/follow-along | 现有related；pilot补key context | 上下行/实际指法范围 | [UNRESOLVED] 页面级需求未知 | REWORK |
| 5个Scale Family | 区分mode/blues/pentatonic等 | 家族query | supported examples | collection audio | semitone比较 | load/练习 | scale guide | 明确范围的比较 | [UNRESOLVED] 不生成所有mode×tonic页 | KEEP |
| `/arpeggios` | 看和弦音分解 | 初学者 | C/G指定示例 | 键盘/audio | 指法适用范围 | 跟练 | chord/scale/guide | 受来源约束的分解参考 | [UNRESOLVED] 搜索量未知 | SUPPORTING |
| `/keyboard-notes`、`labeled` | 定位音名 | 知道/不知道音名 | 键位和静态chart | key/audio/staff | octave/enharmonic | 点选练习 | chord/scale/finger | note查询与键位操作 | [UNRESOLVED] 同组query需第一方区分 | KEEP |
| `/keyboard-notes/chart`、`frequencies` | 对照谱表/频率 | reference需求 | 表与频率 | 键盘/音高对照 | 调律/八度边界 | 查询/打印 | 实际note/tool | 数据参考任务 | [UNRESOLVED] 不是仅改措辞 | RESOURCE |
| `/keyboard-notes/blank` | 教学标注 | 需空白图 | 可打印键盘 | 预览 | 使用说明 | print | 标注/教学 | 空白工作纸 | [UNRESOLVED] 引用/下载量未知 | RESOURCE |
| `/keyboard-notes/finger-numbers` | 区分指法和音名 | 符号混淆 | LH/RH 1–5映射 | 手指示意 | number≠note≠degree | reading examples | chord/scales | 支撑输入/阅读 | [UNRESOLVED] GSC未知 | SUPPORTING |
| `/guide`及3 guide | 学会读谱/和弦/音阶流程 | 不会使用reference | 教学路径 | 例子/工具回链 | 来源和限制 | 打开实际工具 | 完成具体练习 | 降低产品使用阻力 | [UNRESOLVED] 普通文章扩展无证据 | SUPPORTING |
| `/songs`、`/songs/easy` | 选歌及练习计划 | 曲目/难度需求 | 资源目录/edition card | source/access字段 | 可演奏任务和限制 | practice-plan/外链 | exact edition | 选曲≠选编配 | [UNRESOLVED] 两页query重叠未知 | KEEP |
| `/sheet-music`、`easy`、`beginner` | 选谱面版本 | 级别/获取需求 | catalog | source/access说明 | 版本差别 | external arrangement | Songs plan | edition决策 | [UNRESOLVED] 不凭近义词认定应合并 | KEEP |
| 3个Sheet Music Piece | 查具体版本 | 已知曲名 | 编配/来源/可用性 | provider信息 | difficulty/first check | provider或plan | 对应arrangement | exact-work任务 | [UNRESOLVED] 权利/地区持续核查 | KEEP |
| `/tools` | 按任务选工具 | 需独立工具 | 可用入口 | 链接到产品 | find/practice/print分类 | 打开现有URL | 完成独立任务 | 多入口共用URL | [UNRESOLVED] 无新URL理由 | KEEP |
| `/tools/blank-sheet-music` | 获取空白谱纸 | 纸型/布局 | preview/Letter/A4 | print预览 | 配置范围 | print/download | 填写谱面 | 可复用空白资产 | [UNRESOLVED] 使用率未知 | RESOURCE |
| `/tools/hear-the-difference` | 比较听觉差异 | 有混淆 | 可比较的当前对象 | A/B audio | 改了什么 | 比较/练习 | chord/scale | 已有比较工具 | [UNRESOLVED] 新比较页需需求 | KEEP |
| Legal独立页 | 了解站点政策 | 政策需求 | 当前route tree未见 | 不适用 | 不作法律充分性判断 | 不自动新增 | 需求/合规另议 | 本轮无候选内容 | [UNRESOLVED] 具体要求未取得 | NEEDS_EVIDENCE |
| 新C6-vs-Am7等页面 | 消除特定歧义 | 多候选 | 现有Finder已有基础 | 可先做state | context说明 | 比较/回Finder | 已有canonical | 候选，尚未过Gate | [UNRESOLVED] 缺独立需求 | NO_NEW_URL |

现阶段没有足够数据指定任何现有URL为MERGE_CANDIDATE；不为了填满决策枚举而制造合并结论。应先获取query×page及真实产品使用数据。
