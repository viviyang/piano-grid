# 验收合同

[INFERRED] 本文是下一实施会话的门槛；不是本次已通过清单。本次真实结果只见00及evidence。规划READY_FOR_IMPLEMENTATION与产品READY_FOR_RELEASE不同；不以文档完备替代人工/浏览器门禁。

## 分类验收

| 类别 | Automated test | Browser / manual acceptance | 完成条件与本次状态 |
|---|---|---|---|
| PRODUCT | pilot allowlist、object/task/target引用全部可解析；不支持状态安全回退 | 9页从直接落地走Answer→Verify→Understand→Act→Continue；Finder无匹配可恢复，多候选可解释 | 下一步指向可执行的已有功能，不能只有新卡片。[UNRESOLVED] 本次未实际点击验收 |
| UX | 同对象reference/practice状态隔离；back/refresh合同；非pilot模板快照不外溢 | 答案易发现，参考无需开始练习即可读；一个主下一动作，辅助动作≤2；重置有明确结果 | 使用当前tokens/fonts/UI/keyboard，无品牌改版；桌面和移动截图留证。[UNRESOLVED] 本次无有效浏览器截图 |
| MUSIC CORRECTNESS | 下方矩阵全部数据断言；registry和detail/print引用同一对象 | 具名音乐审阅者核对试点公式、听音、指法适用范围 | 不把等音/音级/声部混为一谈；没有真人签名不得称teacher-reviewed。当前只有既有合同通过证据 |
| SEO | build及线上（上线另需授权）sitemap集合=基线206；canonical自指；robots保持；每页单H1；metadata无意外变动；内部href/path/fragment检查 | JS关闭仍有静态答案和可抓取链接；交互fragment不生成新页面 | 无新URL、无noindex/delete/redirect。已知guide锚点修复；pg-arr状态协议按客户端测，不当静态锚点误报 |
| ACCESSIBILITY | 现有a11y检查加新区域语义/label/aria-state/重复ID；键盘操作测试 | Tab/Shift+Tab/Enter/Space、可见焦点、Dialog关闭后焦点回返；读屏朗读候选数量但不反复打断；不用颜色单独传意 | 无新增严重问题；读屏工具/版本/人员/日期留证。自动检查不替代读屏；[UNRESOLVED]当前未完成 |
| MOBILE | 代表viewport 360/390/768 CSS与交互检查，横向溢出断言 | iOS Safari/Android Chrome真机：黑白键可点、滚动不误触、音频用户激活、横竖屏、打印/分享降级 | 主要任务无需桌面鼠标；目标触控至少24×24 CSS px或合规间距，尽量44；不压扁钢琴音区信息。真机未测须保留门禁 |
| PERFORMANCE | 相同设备/工具采集前后bundle及实验室指标；无重复SDK、事件阻塞或多音频泄漏 | 重复切换/离页停止音频；低性能设备下选择响应与页面布局稳定 | [INFERRED]建议同环境中位数关键指标不恶化>10%作为调查线，非绝对通过分；字段数据不足不声称CWV提升；报告实际差异与原因 |
| ANALYTICS | transport stub、allowlist、去重、事件时机、故障不影响功能；07字典每概念有归属 | 一条完整旅程比对本地事件/网络；具权限后GA4 DebugView确认 | 不双发、不记播放结束为练习成功、不记下载点击为保存；后台收数未验证须独立标注 |
| REGRESSION | 206 HTML/路由集合、音乐合同、旧批foundation保留；每种非pilot template抽样 | 键盘、Scale、Songs/Sheet、Tools现有关键任务；旧pg-arr、打印、音频取消 | 不只测pilot；不静默放宽白名单或skip旧失败 |
| BUILD | npm ci锁定依赖；npm run check；npm run build；适用scripts完整日志 | 生产build服务中跑浏览器，不能只用dev替代 | exit0与警告逐项记录；检查自动生成变更单独审查；无无关配置/依赖改动 |

## 音乐硬约束矩阵

| 风险 | 断言/例子 | 验证层 |
|---|---|---|
| Enharmonic spelling | C♯/D♭可同pitch class，但公式音名按对象来源保留；降号/双升降解析不把字符替换成错误名称 | parser/registry单元+图示目视 |
| Root vs bass | C-E-G且bass E仍是C对象的转位解释；require-root模式改变过滤，不把bass必然当根 | Finder合同+浏览器 |
| Inversion vs voicing | 转位由最低和弦音决定；开阔排列不是新和弦类型；支持的声部才可恢复 | canonical voicing对象+真人听音 |
| Pitch-class equivalence | 去掉octave doubling后匹配集合相同，但不声称保留实际键位/音区 | Finder输入/输出测试 |
| Octave representation | MIDI/显示音名/键位映射一致；以当前数据音区测试，不臆造Finder接收octave输入 | 音频事件音高记录+图示 |
| Chord formula | major/minor/maj7/diminished/add9五pilot逐音对照；add9没有强加七音；supplied voicing明确omitted | 原数据合同+render |
| Scale formula | C major序列、方向、终点octave及节拍准确；natural/harmonic/melodic minor回归保持form区分 | scale contract+audio |
| Relative / parallel | relative共调号不等于同tonic；parallel同tonic不等于同音集合；key不是单和弦唯一决定 | 关系引用断言+文案审阅 |
| Fingering source scope | 手、方向、octaves、替代指法/审核状态随来源展示；无出处不得称标准唯一答案 | 源ID解析+具名审阅 |
| Audio == display | 当前对象/voicing的音频音高集合、顺序与显示相符；跨页/stop不残留旧声音 | 调度器stub+真人耳听 |
| Print == HTML | 当前选择、音名、公式、手/方向/音区在HTML/打印/PDF一致 | 数据快照+PDF提取+纸张/预览 |
| Finder == detail | 同registry ID到目标对象一致；不支持bass/声部明确重置；分类fragment选中正确对象 | URL接收器+端到端 |

## 代表URL测试清单

| URL | 必走流程 |
|---|---|
| /chords | 浏览/查找对象→打开五种pilot之一；可回到hub；静态链接存在 |
| /chords/finder | 空→单音→C/E/G→bass E→root过滤→多候选C/E/G/A→无匹配集合→清空；完整与省略声部分开 |
| /chords/c-major | reference直接读取→播放/转位→独立练习→提示/成功/重置→同调上下文 |
| /chords/a-minor | 原有交互/练习保持→下一动作；提示后答案不记独立成功 |
| /chords/c-maj7 | 四音公式/播放/既有练习可用性→限定下一动作 |
| /chords/c-diminished | 减三和弦拼写/音频正确；不错误推为C major内和弦 |
| /chords/c-add9 | add9与9区别明确；当前voicing与formula可区分 |
| /scales/c-major | 手/方向/范围→音频→quiz或follow-along→triads；打印A4/Letter |
| /keyboard-notes | 找音→定位键/谱→当前可用练习→明确关联对象；黑键和键盘操作 |
| 受控依赖 | by-key接C major context；progression接合法example；extended接非默认对象；guide修复链接 |
| 非pilot抽样 | 同模板另一个major/seventh/add detail；一种minor scale form；songs/easy客户端hash；sheet源版权边界；比较工具和空白谱打印 |

“无匹配集合”由当前433 registry自动选择并固定fixture，不凭印象编造。非默认extended对象从registry选一个真实destination；所有边界fixture留ID和预期依据。

## 可复现执行与停止规则

1. 保存SHA、工作树diff、依赖锁hash；先跑 `npm run check`、`node scripts/check-integration-data.mjs`、`node scripts/check-scale-completion-contract.mjs`、`npm run build`。
2. 使用已构建目录启动本地production服务。先查看各浏览器脚本支持的base URL变量/端口，再运行 `check-integration-batch.mjs`、`check-support-pages.mjs`、`check-chords-completion.mjs`、`check-integration-production.mjs`；不要猜变量或无服务重复重跑。
3. 采集全量route/build/sitemap/canonical/link结果；静态fragment与客户端协议分别验证。只检查“状态200”不够。
4. 浏览器执行9页和受控依赖、非pilot抽样；桌面/移动截图、console错误、音频生命周期、a11y、打印另存证据。
5. 同一验证路径因同一原因失败两次停止，报告环境或产品原因，不能以关闭权限/支付/数据/发布门禁来通过。换验证层只能补充证据，不可冒充失败层已验。

## 结果记录与门禁

每项记录 `{criterion, sha, command_or_steps, environment, expected, actual, evidence_path, PASS|FAIL|NOT_RUN|BLOCKED, reviewer?, date}`。实现状态和验证状态分列；缺第一方数据不阻止本地事件实现，但阻止宣布增长有效；缺浏览器/真机/音乐审阅不阻止规划交接，但阻止相应发布验收。

[REPO_VERIFIED] 本次check/build/scale9项通过。integration-data的26项不通过仍保留；浏览器路径未完成；无人代签真人门禁。[INFERRED] 下一会话可从P0-0启动，不可把本规划READY当部署授权。
