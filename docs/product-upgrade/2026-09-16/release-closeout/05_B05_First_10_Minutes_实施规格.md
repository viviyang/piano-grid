# B05｜三个起步版本 + 一个First 10 Minutes样板

## 1. 不能再做一遍“新增三首歌”
[已核实｜本次公开页面观察，不是本地仓库证明] `/songs`、`/songs/easy`已经显示Hot Cross Buns、Twinkle、Ode to Joy三个Hoffman版本。Twinkle列C major/4/4/right and left；Hot Cross Buns有多项Not verified。页面明确这些是外部版本，不是PianoGrid托管谱/录音。来源：本包11中的W01/W02。
[推断] 本批目标是把现有版本做成更易开始的路径；不是新增三张同样的数据卡、重建目录或扩曲库。

## 2. 确定的产品范围
- 主页面：`/songs/easy`，沿用当前三个版本；`/songs`仅更新简洁入口与必要共享卡片。
- 优先样板：**Twinkle, Twinkle, Little Star — Early Elementary**，必须以仓库中确切arrangementId和publisher来源复核。选择理由是当前公开资料比Hot Cross Buns完整，不代表客观难度排名。
- 目标：一个版本的一次短练习计划，不承诺10分钟学完整曲。
- 不新增公开路由。已有Song detail时在那里承载；没有则在`/songs/easy`现有版本区加稳定锚点，不另造同义SEO页。
- Sheet Music页面继续承担确切版本、访问/打印/播放；Songs负责选择与练习安排，不把谱展示拷贝两份。

## 3. 开始先查数据，执行者不用向用户问方案
Cursor读取最新song/arrangement/score/audio registry及相关handoff，建立`B05_VERSION_AUDIT.json`。
每条记录需要：workId、arrangementId、revision、provider/sourceURL、访问条件、可展示资产权限、音符/节奏/手别/指法的证据状态。不要把同曲的另一个版本的字段合进来。

按下述规则执行，不临场改方向：

### 轨道A：外部版本指导（保证可安全交付的本批范围）
若只有外部版本且没有本站展示权/精确谱数据：
- 照常完成三版本入口、逐步练习指导UI、站内基础参考链接、访问方式与分享。
- 按第5节外部版文案显示；主动作是`Open this edition`，不能是`Play the song`。
- 不下载/镜像受限谱图、录音、MIDI；不根据搜索记忆补音符、手序、具体小节或指法。
- 标记完成`B05_EXTERNAL_GUIDED_COMPLETE`，不得据此宣布站内曲谱/播放器已完成。

### 轨道B：本站可用的精确版本样板（延续原产品目标）
如果当前repo已经有合法且核验好的谱/音频/结构化事件：优先复用同一version与资产，完成一条真正站内练习路径。若Twinkle无合格素材而已有另一个三版本之一合格，按“合格自有版本优先、否则Twinkle外部版”的确定规则，不要求重新选题。
- 仅一份version，前1个经过核验的短乐句；谱、音频、速度、单手控制均按实际可用能力显示。
- First10Minutes引用该版本结构化事件与bar/phrase IDs，不硬编码另一份音高数据。
- 无合格素材时，只阻塞轨道B：`B05_IN_SITE_PILOT_BLOCKED_CONTENT`，列清缺的权利/谱数据/核验记录。不能用占位播放器或“教程按钮”伪装完成。
- 这不是删除站内目标；B05交接必须分别列A、B状态。B06非曲谱资源可独立推进。

## 4. 固定UI（文字线框，是实施规范；不要求另开Figma或重新设计）
保持既有标题、主题、字体。网页英文。

```text
Easy Piano Songs for Beginners              [保留已有主标题]
Start with one version and one small goal.

Choose a starting point
[Hot Cross Buns] [Twinkle, Twinkle] [Ode to Joy]
每个卡片：曲名 / 确切版本名 / 一个实际入门理由 / 访问方式
主操作：See the practice plan
次操作：Edition and access details

Your first 10 minutes
Twinkle, Twinkle, Little Star · Early Elementary
External edition · opens on Hoffman Academy
[Open this edition]    [Share this plan]

桌面：左侧5步目录（约1/3） | 右侧当前步骤（约2/3）
手机：Step 1 of 5 + 全部步骤可展开；无横向Tab挤压
0–2 min  Get the right edition
2–4 min  Match the starting setup
4–6 min  Work on one short phrase
6–8 min  Repeat at a comfortable pace
8–10 min Check and choose what to revisit

[上一步] [Next step] 不是默认自动倒计时，也不限制用户跳步
完成：Session noted — not an assessment of your playing.
[Revisit one step] [Choose another piece]

完整既有目录和筛选继续保留
```

不要页面再套多个灰色大Card。步骤内容按项目既有reading/tool样式排版，一个primary。使用共享ShareDialog；无需创建一个通用“课程平台”。

## 5. 可直接使用的英文内容（外部版）
以下是本包新写的练习建议，不是出版社原文，不声称出版社审核过。

**Lead**: `Ten minutes is time for a focused start, not a promise to learn the whole piece.`

**0–2 / Get the right edition**
`Open the Early Elementary edition named above. Check the title and version before you begin; arrangements with the same song title can use different notes and hand positions.`
按钮：`Open this edition`（来自registry的provider URL）。

**2–4 / Match the starting setup**
`Use the hand-position graphic and instructions supplied with this edition. Find the starting keys on your piano before trying to join the phrase.`
可选基础链接：`Find a piano note`、`Read finger numbers`。不得把泛C4–C5练习称为该版本的准确用音训练。

**4–6 / Work on one short phrase**
`Choose one short phrase shown in the edition or its matching tutorial. Follow that version’s hand instructions. Work on the phrase slowly enough to follow the notes without rushing.`
不写未核验的“先右手”“第1–4小节”“60 BPM”或具体音符序列。

**6–8 / Repeat at a comfortable pace**
`Repeat the same small section. When something feels uncertain, stop and look at that spot in the score or tutorial before trying again.`
若有已批准节拍器owner可提供可选入口；不强制用户先练音阶/和弦。

**8–10 / Check and choose what to revisit**
`Compare your attempt with the matching tutorial or reference. Choose one thing to revisit: locating the notes, following the rhythm, or coordinating the hands.`
`This is your own check-in. PianoGrid has not listened to or graded your playing.`

## 6. 数据与组件契约
- 复用既有Song/Arrangement实体，最多增加practicePlan字段，不新建平行曲目库。
- `practicePlan`至少含version/arrangementId、mode(external_guided|in_site)、steps、requiredResources、capabilities、evidenceRefs。
- step包含stable ID、建议时段、任务、必要资源、可选站内帮助；不把任务完成当做音乐能力分数。
- version有变化则计划及分享版本联动；旧版本不可用就解释失效，不静默换谱。
- 分享只带plan/version入口，不带个人完成状态、错误、身份或分数；使用当前ShareDialog和builder。
- 站内音频/loop只在可用时复用ReferenceAudio/现有播放器，不另写timer/audio clock。若现有owner不支持phrase loop，先只显示可用controls，不假按钮。

## 7. 内链与导航
- 不增一级菜单；现有Songs→Easy Piano Songs入口保持。
- `/songs`对应卡片→`/songs/easy#<已有或新增稳定plan锚点>`，不是新route。
- plan→确切Sheet Music现有URL；Sheet Music→“Start this version’s practice plan”。
- note/finger/scale/chord链接仅出现在该版确实需要的步骤；只知道曲名不能自动推荐同主音scale。
- 涉及hash打开步骤，复用RC02的“恢复状态后再定位”模式，不复制字符串解析。

## 8. 验收与出口
三个入口真实、访问条件不掩盖；计划5步可返回/跳步；手机主动作可见；分享恢复确切版本；外部访问不声称站内可播；页面SourceIDs不堆正文；Songs/Sheet同一version。
输出B05_RESULT、VERSION_AUDIT、CAPABILITY_MATRIX、SCREENSHOTS、TEST_REPORT、CONTENT_BLOCKERS和handoff。
新增/搬运音乐材料前必须有明确权利与内容核验；不存在材料就交付A并明确B阻塞，不伪造完整闭环。
