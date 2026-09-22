# Product System Map

[INFERRED] 下面是由现有节点和源码推导的目标任务关系，不是已验证的用户行为漏斗。`已有`由列出的代码支持；`拟增强`不能读成现成功能。用户画像按任务状态定义，实际受众占比 UNKNOWN。

迁移模型：Query → Music Object → User State → Trusted Answer → Verify → Understand → Act → Continue → Practice/Apply → Print/Share/Return。BodyType的输入质量对应音名、拼写、低音、八度和指法范围；分类歧义对应同音高类的多种音乐解释；穿搭对应在琴上练习/应用。领域内容和医学逻辑不迁移。

| Journey | 已有节点与出处 [REPO_VERIFIED] | 当前边界 | 最小拟增强 [INFERRED] |
|---|---|---|---|
| Chords | `/chords` / family → detail notes/formula → KeyboardViewport/ReferenceAudio → inversions/voicings、source-scoped fingering → ChordBuilderPractice；C-major为独立guided模式 → print | chord identity不是key；并非每个转位有已核实指法；其他detail不自动拥有C-major全部交互 | 在9页pilot中选一个主next action和最多两个辅助入口；明确练习性质；连接一个已核实key/scale/progression context |
| Finder | pitch-class keys + optional bass → 433注册对象的exact formula或supplied voicing → ambiguity解释 → detail/category href | 没有八度输入；不识别麦克风/MIDI；bass筛选不是歌曲调性；候选列表没有自带audio | 先修说明、加测量；再为已有destination保留candidate identity/明确bass是输入语境；保留无匹配及多候选 |
| Scales | `/scales` 60引用 → notes/keyboard/audio → 手别/方向/小调form → ScaleQuiz/ScalePractice → printed current reference + atlas | 不同form和方向不能共享错误指法；播放结束不代表弹奏完成；related link存在但不等于统一关系模型 | `/scales/c-major`试点：复用已有C-major key context，短练习入口和1个上下文链接；后续A-minor必须区分natural/harmonic/melodic |
| Keyboard Notes | 查音 → KeyboardDiagram/StaffDiagram →音高/频率/八度 → hand-number supporting页 → practice/share | note名、finger number、scale degree不同；练习是点选而非真琴评测 | `/keyboard-notes`在用户任务完成处接既有C-major chord/scale；不根据任意单音推断唯一和弦 |
| Songs | `/songs`、`/songs/easy` → resource/arrangement选择 → difficulty/access信息 → practice-plan → exact edition | 作品名不是具体编配；199 works不是199公开URL；外部资源不等于可重新分发 | 保留现有plan；P2再评估按具体edition关联key/chord，缺字段不从曲名猜 |
| Sheet Music | work/version → catalog arrangement/resource → provider/source/access → preview说明 → Songs的`#pg-arr=`恢复协议 | 有外部引用和locked originals；runtime_grants=0；不能自动下载/解锁/转调授权谱 | 复用现有指向具体arrangement的链接；优先维护版本/来源清晰度，不建新谱库 |
| Tools / Printables | `/tools`按find/practice/print汇总现成URL；blank-sheet工具；scale atlas/keyboard teaching-pack/chord print | 资产存在、可下载不证明教学正确性、PDF/UA或被外链引用 | P1选择1份现有资产完善来源/版本/稳定HTML回链；不从零再生成两套资料 |
| Comparison / ambiguity | Finder多候选；`/tools/hear-the-difference`有比较；scale form/family comparison；详情解释 | C6与Am7同pitch-class集合，未指定register时不能承诺只靠“听两个结果”判唯一名称 | 先使用现有比较状态；独立comparison URL均NEEDS_EVIDENCE；保持相同音区/条件，说明上下文与音色限制 |

## 复用合同

[REPO_VERIFIED] 数据关系入口：`getSupportedChordRegistry`、`getChordsByKey`、`getChordProgressions`、`getScaleCenter/getScaleDetail`、`getSongsSheetCatalog/getArrangementView`。现状是多个包经adapter统一，不是新建一套全局MusicObject引擎的理由。

[INFERRED] pilot关系记录只引用现有ID：`sourceObjectId`、`relationship`、`targetPath`、`targetObjectId?`、`contextId?`、`evidenceRefs`、`scope`。不复制notes/formula/MIDI/fingering；目标路径必须在 PUBLIC_ROUTES，fragment/state必须有实际接收逻辑。静态a href仍能到可用参考，JS只增强状态恢复。状态URL不加入sitemap，canonical保持既有页面。

[INFERRED] 关系必须写明语义：contains-notes ≠ in-key ≠ shares-key-signature ≠ relative ≠ parallel；root ≠ bass；formula ≠ supplied voicing。不能从C-major chord直接声称“歌曲在C大调”。

## 真实流程审计范围

1. Search入口至Finder：源码与本次HTTP确认任务说明/空态；浏览器截图未取得。
2. 选音至候选：匹配分支和UI结构代码确认；此次没有完成真实点击验证。
3. candidate至detail/category：href来自registry；静态anchor存在；自动选择/保持bass没有代码路径，需pilot浏览器验收。
4. detail至practice：C-major源码有独立模式及帮助历史；其他页有builder；本次未听音或真琴测试。
5. practice至下一任务/print：存在按钮与打印路径；跨模块连续完成率未知。

这是一份有边界的repo/HTTP任务系统审计，不声称完成截图驱动的UX、真机或读屏验收。后续实施须按08补齐。
