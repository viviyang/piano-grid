# Piano 内容与音乐数据包｜第一批

版本：`1.0.0-batch-01`  ·  核查与生成日期：`2026-09-09`  ·  页面语言：美式英语

[已核实] 本批完成 `/chords` 与 `/chords/a-minor` 的内容、数据和原创打印素材；全部 **17 条优先页面、78 个源任务组**均保留在材料台账。原全站 **127 条候选 URL**、关键词及模板未改动。

**交接结论：这两页的明确批次范围可交给设计排版；尚不能标为可发布。** 音频播放、动态打印与上线链接需要开发后验收；没有把本次材料制作写成网站功能已经运行。

[已核实] 交付包括：9 个命名三和弦的原位数据；A minor 另有两个转位；11 张原创 SVG；2 份 PDF（合计 4 页）；两页 16 个稳定内容模块；69 条原始查询关系的逐项覆盖记录。9 个名称包含 B/C♭ 的同键异名，不能计成 9 种不同键位组合。

文件入口：

- `page-content.json`：完整17页台账、逐组原词关系、两页英文内容、音乐数据、来源、缺项与核验结果。
- [piano-chord-chart-selected.pdf](assets/piano-chord-chart-selected.pdf)：9 个命名和弦的3页打印参考。
- [a-minor-notes-inversions.pdf](assets/a-minor-notes-inversions.pdf)：A minor三个位置的1页打印参考。
- `assets/*.svg`：11张矢量键盘图；与JSON中的 `voicing_id` 一一对应。

## 1. 基线与本批边界

[已核实] 已执行附件 `Piano_01_Content_Prompt.md`。规划权威顺序为 `final_scope`、当前 `required_delivery`、逐源组 `required_output / first_release_scope`；`original_*` 未用于覆盖现行要求。对照Markdown第5节和第8.1节，127个URL对应的主词/模板及17页优先顺序一致，未发现影响执行的冲突。输入文件哈希见JSON，最终检查未变化。

[已核实] 基线版本为 `2.0-consolidated-final-plan`，日期为2026-09-08。首页和工具中心的主关键词仍为 `null`。后做91页、暂停19页、未分配URL的17原任务，以及历史Am7线索都保持原状态。这里没有重新做SERP验证或流量判断。

[推断] 本批中心集合选择原规划中9个具体和弦对象，用于真实查询和比较；这是页面内数据准备，不是新增页面或改变原页面优先级。除了A minor，其他详细页即使共享了原位数据，也仍未完成。

本批明确保留的后续事项：

- `/chords`：完整根音集合及all/full查询；power（P168）、7th（P170）、jazz（P171）；指法PDF查询。
- 其他15页：按下列台账保留全部源组和原交付要求。没有把选曲、曲谱、琴键、音阶和指南缩成和弦站。
- 本轮未提出需要改URL、增页、合并或拆页的建议；`proposed_baseline_changes=[]`。

证据标签只用于本文件后台记录和JSON元数据；第4、5节“英文成稿”可直接用于页面，不带研究标签。

## 2. 全部17页材料总台账

[已核实] 下表的主词、模板和优先范围直接来自附件；材料状态来自本批实际产物。“有共享材料”不代表该页已备齐。

| URL | 原主关键词 | 模板 | 本次状态 |
| --- | --- | --- | --- |
| / | null | T01 | 待制作；本批未开始 |
| /tools | null | T02 | 待制作；有少量共享材料 |
| /songs | piano songs | T15 | 待制作；本批未开始 |
| /songs/easy | easy piano songs | T16 | 待制作；本批未开始 |
| /tools/blank-sheet-music | empty piano sheet music | T19 | 待制作；本批未开始 |
| /keyboard-notes | piano keys | T03 | 待制作；有少量共享材料 |
| /keyboard-notes/labeled | keys on a piano keyboard labeled | T04 | 待制作；有少量共享材料 |
| /keyboard-notes/chart | piano notes chart | T05 | 待制作；有少量共享材料 |
| /chords | piano chord chart | T06 | 本批内容数据完成 |
| /chords/a-major | a chord piano | T07 | 待制作；有少量共享材料 |
| /chords/a-minor | am piano chord | T07 | 本批内容数据完成 |
| /chords/c-major | c chords piano | T07 | 待制作；有少量共享材料 |
| /scales | piano scales | T11 | 待制作；本批未开始 |
| /scales/c-major | c major scale piano | T12 | 待制作；本批未开始 |
| /scales/a-minor | a minor scale piano | T12 | 待制作；有少量共享材料 |
| /guide | how to play piano for beginners | T21 | 待制作；本批未开始 |
| /guide/read-sheet-music | how to read sheet music piano | T22 | 待制作；有少量共享材料 |

### 2.1 逐页材料、原任务与缺项

[已核实] 每个源组保留原代表词、非同义查询、同义词、原交付方式和首版范围；完整逐词列表在JSON的 `materials_ledger[].source_groups`。下面逐组列出原交付输出，避免把同页任务只写成一个筛选器。未制作页不是“需要用户重新确认”，而是明确待执行的后续批次。

#### 01. `/` · T01

[已核实] 源任务：`无SEO源组，结构导航页`。实际范围：待相关页面实际可用后编写入口文案；本批只有两页内容数据，仍无已发布清单。

**材料需要：** 已发布资源清单、各栏目真实入口、简短全站说明。

**待补字段：** `navigation_targets`；`published_url_manifest`；`home_examples`。

**现有材料依据：** 原创编辑／本地输出核验。

[已核实] 没有独立SEO主词源组；仍按T01准备全站说明、真实例子与已发布入口。

**当前不能交作完整页面排版。** 待相关页面实际可用后编写入口文案；本批只有两页内容数据，仍无已发布清单。

#### 02. `/tools` · T02

[已核实] 源任务：`P113`。实际范围：本批生成的和弦PDF可作为后续资料；工具中心文案与入口未制作。

**材料需要：** 可用工具与实际打印文件的映射；P113的打印资源入口及输出说明。

**待补字段：** `tool_cards`；`printables_catalog`；`published_url_manifest`。

**现有材料依据：** 原创编辑／本地输出核验。

[已核实] 可复用本批两份打印文件；工具中心的入口清单和文案尚未制作。

| 源组 / 原代表词 | 原 required_output | 原 first_release_scope | 本批状态 |
| --- | --- | --- | --- |
| P113 / music theory printables | 真实可用打印资源的入口，不要求新建重复工具页。 | 资源就绪后开放 | 待制作；本批未开始 |

**当前不能交作完整页面排版。** 本批生成的和弦PDF可作为后续资料；工具中心文案与入口未制作。

#### 03. `/songs` · T15

[已核实] 源任务：`P002, P009, P014, P018, P022, P041, P042, P043`。实际范围：未选作品或核对版本/资源；全部8源组保留待准备，未开放空筛选。

**材料需要：** 逐首作品/作者/具体编曲版本；难度依据、前置能力、可用演示/谱面入口；sad/fun/beautiful/intermediate/happy/types/sing-and-play各自真实曲目。

**待补字段：** `works[].edition`；`works[].level_evidence`；`works[].resource_access`；`sections.*.items`。

**现有材料依据：** 原创编辑／本地输出核验。

| 源组 / 原代表词 | 原 required_output | 原 first_release_scope | 本批状态 |
| --- | --- | --- | --- |
| P002 / piano songs | 真实曲目、筛选、版本信息和可用资源入口。 | 中心主任务 | 待制作；本批未开始 |
| P009 / sad piano songs | sad 分区有实际曲目和适合演奏的依据；不能只给纯聆听歌单。 | 后续同页补齐 | 待制作；本批未开始 |
| P014 / cool songs to play on piano | 明确 cool/fun 的推荐依据，不作搜索量或用户偏好的客观排名承诺。 | 后续同页补齐 | 待制作；本批未开始 |
| P018 / beautiful piano songs | beautiful 的主观选择标准和具体曲目，不能只更换形容词。 | 后续同页补齐 | 待制作；本批未开始 |
| P022 / intermediate piano songs | 中级曲目对应具体版本和难点，不用泛 easy 列表代替。 | 后续同页补齐 | 待制作；本批未开始 |
| P041 / happy piano music | happy 条件有对应曲目与选择说明。 | 后续同页补齐 | 待制作；本批未开始 |
| P042 / piano pieces types | 介绍作品类型并连接可弹的实际例子，不只做一个标签。 | 后续同页补齐 | 待制作；本批未开始 |
| P043 / songs to sing and play piano | 弹唱条件有可用的伴奏/lead sheet/教程入口，不拿独奏谱直接代替。 | 后续同页补齐 | 待制作；本批未开始 |

**当前不能交作完整页面排版。** 未选作品或核对版本/资源；全部8源组保留待准备，未开放空筛选。

#### 04. `/songs/easy` · T16

[已核实] 源任务：`P001, P006, P036, P037, P039, P040`。实际范围：未准备曲目；30/10/50数量词未满足，不把曲名数当版本审核。

**材料需要：** 易弹作品具体版本和技术要求；kids/adults/C-major/beautiful/impress对应的选择理由与资源。

**待补字段：** `works[].prerequisites`；`works[].edition_key`；`works[].difficulty_source`；`sections.*.items`。

**现有材料依据：** 原创编辑／本地输出核验。

| 源组 / 原代表词 | 原 required_output | 原 first_release_scope | 本批状态 |
| --- | --- | --- | --- |
| P001 / easy piano songs | 明确适用水平、前置能力、具体版本和可开始的资源。 | 中心主任务 | 待制作；本批未开始 |
| P006 / easy piano songs for kids | 儿童条件对应实际曲目与适用说明；不是与成人词视为同义。 | 后续同页补齐 | 待制作；本批未开始 |
| P036 / c major scale piano songs | C 大调条件依据具体版本的调性核对，不把调性直接当作难度评级。 | 后续同页补齐 | 待制作；本批未开始 |
| P037 / easy beautiful piano songs | 同时满足易弹和优美选择条件；给曲目和理由。 | 后续同页补齐 | 待制作；本批未开始 |
| P039 / easy piano songs for adults | 成人条件对应曲目与选择说明；不自动套儿童教材。 | 后续同页补齐 | 待制作；本批未开始 |
| P040 / easy piano songs to impress your friends | 演出效果/看起来难的查询以具体选择理由承接，不承诺学习结果。 | 后续同页补齐 | 待制作；本批未开始 |

**当前不能交作完整页面排版。** 未准备曲目；30/10/50数量词未满足，不把曲名数当版本审核。

#### 05. `/tools/blank-sheet-music` · T19

[已核实] 源任务：`P079`。实际范围：未生成空白谱纸；本批和弦PDF不算该页交付。

**材料需要：** 原创钢琴大谱表空白谱纸；实际PDF与纸张/边距/行数说明。

**待补字段：** `blank_staff_spec`；`pdf_file`；`print_visual_check`。

**现有材料依据：** 原创编辑／本地输出核验。

| 源组 / 原代表词 | 原 required_output | 原 first_release_scope | 本批状态 |
| --- | --- | --- | --- |
| P079 / empty piano sheet music | 钢琴大谱表预览；基础打印/PDF导出；无须账号 | 按页面准备顺序验收 | 待制作；本批未开始 |

**当前不能交作完整页面排版。** 未生成空白谱纸；本批和弦PDF不算该页交付。

#### 06. `/keyboard-notes` · T03

[已核实] 源任务：`P117, P118, P120, P122, P123, P124, P127, P129, P130, P133, P134, P138, P139, P140, P141, P142, P147`。实际范围：S05/S06可复用音区和频率依据；布局/点击/全部查询内容未制作。

**材料需要：** 音名字母/升降号与MIDI/频率约定；61/88布局、最低最高音与键色数量；P117-P147所列音名的具体定位与别名说明。

**待补字段：** `layouts.61`；`layouts.88`；`note_lookup_cases`；`key_count_answers`。

**现有材料依据：** [S05](#s05)、[S06](#s06)。

| 源组 / 原代表词 | 原 required_output | 原 first_release_scope | 本批状态 |
| --- | --- | --- | --- |
| P117 / piano keys | 按键或音名定位，显示音区和可读范围。 | 已确认基础范围 | 待制作；本批未开始 |
| P118 / how many keys on a piano | 按已核对布局说明键数；不自动新建数量问答 URL。 | 已确认承接原则 | 待制作；本批未开始 |
| P120 / notes on a piano | 以键位和音名为重点，谱表对应连接 chart 页。 | 已确认承接原则 | 待制作；本批未开始 |
| P122 / piano keyboard layout | 可读键盘布局；不是复用纯歌曲资源列表。 | 已确认基础范围 | 待制作；本批未开始 |
| P123 / how many octaves on a piano | 布局与八度范围核对；正文回答已有问题。 | 已确认承接原则 | 待制作；本批未开始 |
| P124 / music notes and names | 解释本工具使用的音名；通用音乐词不计钢琴独占需求。 | 已确认承接原则 | 待制作；本批未开始 |
| P127 / keyboard piano black keys | 显示黑键位置及核实过的名称。 | 已确认承接原则 | 待制作；本批未开始 |
| P129 / c on a piano | 中央/其他 C 的音区明确，避免输入同名音时暗自猜测。 | 已确认承接原则 | 待制作；本批未开始 |
| P130 / lowest note on piano | 显示当前已核对布局的最低音及适用范围。 | 已确认承接原则 | 待制作；本批未开始 |
| P133 / a flat on the piano | 输入降 A 时定位并展示对应音区；保留原名称。 | 已确认承接原则 | 待制作；本批未开始 |
| P134 / a4 note | A4 由统一工具承接，显示音区；频率任务链接频率表。 | 已确认承接原则 | 待制作；本批未开始 |
| P138 / b sharp on piano | B sharp 的拼写和定位需核对，不能默默改用户查询。 | 已确认承接原则 | 待制作；本批未开始 |
| P139 / f3 note | F3 在统一工具内查询，不自动建单音页面。 | 已确认承接原则 | 待制作；本批未开始 |
| P140 / a5 on piano | A5 在统一工具内查询。 | 已确认承接原则 | 待制作；本批未开始 |
| P141 / c3 in piano | C3 在统一工具内查询。 | 已确认承接原则 | 待制作；本批未开始 |
| P142 / highest note on piano | 显示已核对布局的最高音，不承诺覆盖全部键盘型号。 | 已确认承接原则 | 待制作；本批未开始 |
| P147 / what is cb on piano | C flat 查询说明和位置核对；不变成 C-flat 和弦页。 | 已确认承接原则 | 待制作；本批未开始 |

**当前不能交作完整页面排版。** S05/S06可复用音区和频率依据；布局/点击/全部查询内容未制作。

#### 07. `/keyboard-notes/labeled` · T04

[已核实] 源任务：`P119, P137, P223, P241`。实际范围：仅可复用音区依据；未制作布局/PDF/步骤。数字体系仍不擅自扩展。

**材料需要：** 61/88键起点终点和参考图；音名/音区及实琴标注步骤；88键PDF与61键实际说明。

**待补字段：** `layouts.61`；`layouts.88`；`label_assets`；`labeling_steps`；`pdf_files`。

**现有材料依据：** [S05](#s05)、[S06](#s06)。

| 源组 / 原代表词 | 原 required_output | 原 first_release_scope | 本批状态 |
| --- | --- | --- | --- |
| P119 / keys on a piano keyboard labeled | 先提供核实的 61/88 键图；音名与音区编号；其他键数按数据就绪情况开放。 | 已确认基础范围 | 待制作；本批未开始 |
| P137 / printable 88 key piano | 88 键参考图打印/PDF，不宣称等比例贴纸。 | 已确认基础范围 | 待制作；本批未开始 |
| P223 / labeling a piano | 简短实琴标注步骤；不重复写一篇独立泛教程。 | 已确认基础范围 | 待制作；本批未开始 |
| P241 / how to label piano 61 keys | 针对已核对的 61 键布局说明起始位置和标注方式。 | 已确认基础范围 | 待制作；本批未开始 |

**当前不能交作完整页面排版。** 仅可复用音区依据；未制作布局/PDF/步骤。数字体系仍不擅自扩展。

#### 08. `/keyboard-notes/chart` · T05

[已核实] 源任务：`P121, P132, P143, P145, P146`。实际范围：S05可复用谱号与中央C依据；P146首版不开放，其他映射/素材未制作。

**材料需要：** 高低谱号—音名—键位映射；加线/音区/61键范围样例；联动样例与打印图。

**待补字段：** `staff_positions`；`clef_examples`；`keyboard_note_map`；`print_assets`；`solfege_mode`。

**现有材料依据：** [S05](#s05)、[S06](#s06)。

| 源组 / 原代表词 | 原 required_output | 原 first_release_scope | 本批状态 |
| --- | --- | --- | --- |
| P121 / piano notes chart | 谱表—音名—键盘联动；打印当前范围。 | 已确认基础范围 | 待制作；本批未开始 |
| P132 / 61 key keyboard notes | 61 键对应范围核对后开放；不把键数标签视为不同谱号。 | 后续同页补齐 | 待制作；本批未开始 |
| P143 / bass clef notes | 可读低音谱号位置与键盘联动，不只有文字链接。 | 已确认基础范围 | 待制作；本批未开始 |
| P145 / notes on the staff treble clef | 可读高音谱号位置与键盘联动。 | 已确认基础范围 | 待制作；本批未开始 |
| P146 / piano notes chart do re mi | 先明确采用哪种唱名规则，再决定显示；首版不提供含义不清的切换。 | 首版不开放／规则待核 | 待制作；本批未开始 |

**当前不能交作完整页面排版。** S05可复用谱号与中央C依据；P146首版不开放，其他映射/素材未制作。

#### 09. `/chords` · T06

[已核实] 源任务：`P148, P154, P158, P168, P170, P171, P238, P247`。实际范围：9个命名三和弦原位图表、类型/根音筛选结果数据、大小对比、读图、打印文件和操作文案

**材料需要：** 见本页已完成内容、共享数据与缺项记录。

**待补字段：** 见第8节字段级缺项。

**现有材料依据：** [S01](#s01)、[S02](#s02)、[S03](#s03)、[S05](#s05)、[S06](#s06)、[S07](#s07)、[S08](#s08)、[S09](#s09)、[S10](#s10)、[S11](#s11)、[S12](#s12)、[S13](#s13)、[S14](#s14)、[S16](#s16)。

| 源组 / 原代表词 | 原 required_output | 原 first_release_scope | 本批状态 |
| --- | --- | --- | --- |
| P148 / piano chord chart | 默认有图表；根音/类型选择、试听、打印及读图说明。 | 已确认基础范围 | 本批局部完成 |
| P154 / minor chords piano | minor 选择后显示经过核对的实际和弦结果。 | 后续同页补齐 | 本批部分集合 |
| P158 / major chords piano | major 选择后显示经过核对的实际和弦结果。 | 已确认基础范围 | 本批部分集合 |
| P168 / power chords piano | power chord 的实际结果与使用说明，不能只有标签。 | 后续同页补齐 | 后续；未开始 |
| P170 / piano chord chart 7th | 明确 7th 涉及的类别和输出；不把它无条件改成 major7。 | 后续同页补齐 | 后续；未开始 |
| P171 / piano chord chart jazz | jazz 相关和弦的实际示例及说明，不只加一个风格按钮。 | 后续同页补齐 | 后续；未开始 |
| P238 / major and minor chords piano | 大小和弦对比包含音图/示例和区别，不用类型筛选器代替解释。 | 后续同页补齐 | 本批完成 |
| P247 / how to read a piano chord chart? | 如何读键盘图、组成音和标记；深入学习连接指南。 | 已确认基础范围 | 本批完成 |

#### 10. `/chords/a-major` · T07

[已核实] 源任务：`P149`。实际范围：仅共享中心页原位数据已备；该详细页正文/转位/PDF未做，不计完成。

**材料需要：** A-C#-E与原位数据；转位、针对性英文正文和a chord inversions piano pdf；情境指法专业核对。

**待补字段：** `voicings.first`；`voicings.second`；`page_blocks`；`pdf_inversions`；`fingering`。

**现有材料依据：** [S07](#s07)、[S01](#s01)、[S02](#s02)。

| 源组 / 原代表词 | 原 required_output | 原 first_release_scope | 本批状态 |
| --- | --- | --- | --- |
| P149 / a chord piano | 当前和弦的音名/键位/音程；原位和转位；可用时播放；清晰指法说明；相关查询链接 | 模板已确认；此实例内容待审核 | 待制作；本批未开始 |

**当前不能交作完整页面排版。** 仅共享中心页原位数据已备；该详细页正文/转位/PDF未做，不计完成。

#### 11. `/chords/a-minor` · T07

[已核实] 源任务：`P151`。实际范围：Am固定结果、原位/第一/第二转位、同源音图/事件/打印、针对性解释和练习

**材料需要：** 见本页已完成内容、共享数据与缺项记录。

**待补字段：** 见第8节字段级缺项。

**现有材料依据：** [S01](#s01)、[S02](#s02)、[S04](#s04)、[S05](#s05)、[S07](#s07)、[S08](#s08)、[S14](#s14)、[S16](#s16)。

| 源组 / 原代表词 | 原 required_output | 原 first_release_scope | 本批状态 |
| --- | --- | --- | --- |
| P151 / am piano chord | 当前和弦的音名/键位/音程；原位和转位；可用时播放；清晰指法说明；相关查询链接 | 模板已确认；此实例内容待审核 | 本批完成；公开指法暂缺 |

#### 12. `/chords/c-major` · T07

[已核实] 源任务：`P163`。实际范围：仅共享中心页原位数据已备；详细页其余未做。

**材料需要：** C-E-G原位数据；转位和具体页内容、打印；条件明确的指法依据。

**待补字段：** `voicings.first`；`voicings.second`；`page_blocks`；`pdf_inversions`；`fingering`。

**现有材料依据：** [S07](#s07)、[S12](#s12)、[S01](#s01)。

| 源组 / 原代表词 | 原 required_output | 原 first_release_scope | 本批状态 |
| --- | --- | --- | --- |
| P163 / c chords piano | 当前和弦的音名/键位/音程；原位和转位；可用时播放；清晰指法说明；相关查询链接 | 模板已确认；此实例内容待审核 | 待制作；本批未开始 |

**当前不能交作完整页面排版。** 仅共享中心页原位数据已备；详细页其余未做。

#### 13. `/scales` · T11

[已核实] 源任务：`P179, P180, P181, P190, P196, P204, P208, P210, P213, P214, P222, P224, P233, P235`。实际范围：全部14源组未制作。小调形式、jazz、双手、all词范围逐项保留，不用C样例顶替。

**材料需要：** 已审核音阶类型和各自音符/构成；左右手、上下行、八度范围绑定的指法；双手PDF、类型比较、音级与定义等全部14任务输出。

**待补字段：** `scales.*.type`；`scales.*.register`；`scales.*.hand_direction_octaves`；`scales.*.fingering_sources`；`print_assets`；`concept_sections`。

**现有材料依据：** 原创编辑／本地输出核验。

| 源组 / 原代表词 | 原 required_output | 原 first_release_scope | 本批状态 |
| --- | --- | --- | --- |
| P179 / piano scales | 默认大调总览、C 大调结果、手别/方向/范围、示范和打印。 | 已确认基础范围 | 待制作；本批未开始 |
| P180 / two hand beginner piano scales pdf | 确有双手、初学范围和标识明确的打印资料。 | 后续同页补齐 | 待制作；本批未开始 |
| P181 / piano scales chart | 默认或选定类型的可读音阶图表。 | 已确认基础范围 | 待制作；本批未开始 |
| P190 / major scale for piano | major 选择提供核对过的数据，链接已有具体大调页。 | 已确认基础范围 | 待制作；本批未开始 |
| P196 / piano minor scales | 小调形式明确，不能把所有小调当一套音符或指法。 | 后续同页补齐 | 待制作；本批未开始 |
| P204 / jazz scales piano | jazz scales 的范围与具体示例明确，不只显示一个未解释标签。 | 后续同页补齐 | 待制作；本批未开始 |
| P208 / piano scale fingerings | 只开放核实过的左右手/方向/范围，未审核条件保留待补。 | 已确认基础范围 | 待制作；本批未开始 |
| P210 / piano scales pdf | 与当前已审核数据一致的 PDF；all/major and minor 等范围词需资料齐全才宣称覆盖。 | 已确认基础范围＋范围词待补 | 待制作；本批未开始 |
| P213 / piano scales formula | 显示所选类型的构成说明，并与具体结果对应。 | 后续同页补齐 | 待制作；本批未开始 |
| P214 / piano scales online | 不登录即可查询已开放的音阶数据；不是静态软件下载介绍。 | 已确认基础范围 | 待制作；本批未开始 |
| P222 / degrees of a scale in music | 明确音级名称与示例，不能以一排琴键替代概念说明。 | 后续同页补齐 | 待制作；本批未开始 |
| P224 / major and minor scales | major/minor 的对比及实际示例，不把两个词当同义。 | 后续同页补齐 | 待制作；本批未开始 |
| P233 / scale in music | 简短准确的音阶定义与例子，保留泛乐理流量归属限制。 | 后续同页补齐 | 待制作；本批未开始 |
| P235 / types of scales music | 每个开放类型都有定义和可用例子；不以目录条数代替交付。 | 后续同页补齐 | 待制作；本批未开始 |

**当前不能交作完整页面排版。** 全部14源组未制作。小调形式、jazz、双手、all词范围逐项保留，不用C样例顶替。

#### 14. `/scales/c-major` · T12

[已核实] 源任务：`P183`。实际范围：未核对音阶指法与完整数据；本批C大三和弦不是C大调音阶交付。

**材料需要：** C大调音符/音程/谱表；具体音区、手别、方向、八度与换指依据；同源播放/打印和练习内容。

**待补字段：** `notes`；`staff`；`left_hand`；`right_hand`；`ascending`；`descending`；`octave_span`；`pdf_file`。

**现有材料依据：** 原创编辑／本地输出核验。

| 源组 / 原代表词 | 原 required_output | 原 first_release_scope | 本批状态 |
| --- | --- | --- | --- |
| P183 / c major scale piano | 该调/类型的音符与构成；键位与谱表；适用的左右手指法和上下行；简短练习与打印 | 模板已确认；此实例内容待审核 | 待制作；本批未开始 |

**当前不能交作完整页面排版。** 未核对音阶指法与完整数据；本批C大三和弦不是C大调音阶交付。

#### 15. `/scales/a-minor` · T12

[已核实] 源任务：`P184`。实际范围：未准备音阶；Am三和弦共享数据仅是一个例子，不等于该调所有和弦或小调形式已备。

**材料需要：** 自然/和声/旋律小调分别定义；每种形式的上下行、手别、音区和指法依据；a minor scale and chords所需调内和弦解释。

**待补字段：** `forms.natural`；`forms.harmonic`；`forms.melodic`；`direction_specific_notes`；`fingerings`；`related_diatonic_chords`。

**现有材料依据：** [S08](#s08)、[S14](#s14)、[S16](#s16)。

| 源组 / 原代表词 | 原 required_output | 原 first_release_scope | 本批状态 |
| --- | --- | --- | --- |
| P184 / a minor scale piano | 该调/类型的音符与构成；键位与谱表；适用的左右手指法和上下行；简短练习与打印 | 模板已确认；此实例内容待审核 | 待制作；本批未开始 |

**当前不能交作完整页面排版。** 未准备音阶；Am三和弦共享数据仅是一个例子，不等于该调所有和弦或小调形式已备。

#### 16. `/guide` · T21

[已核实] 源任务：`P226, P240, P255`。实际范围：未写指南；本批图表PDF不能替代入门课程PDF。

**材料需要：** 可执行入门顺序及每步真实例子；P240实际入门PDF；P255键盘乐理例子。

**待补字段：** `learning_steps`；`worked_examples`；`beginner_pdf`；`published_guide_links`。

**现有材料依据：** 原创编辑／本地输出核验。

| 源组 / 原代表词 | 原 required_output | 原 first_release_scope | 本批状态 |
| --- | --- | --- | --- |
| P226 / how to play piano for beginners | 简明学习顺序；每步真实示例与相关资源；已完成时提供可打印入门材料 | 按页面准备顺序验收 | 待制作；本批未开始 |
| P240 / piano lessons for beginners pdf | 真实可用的入门 PDF 才算承接 pdf 查询。 | 资源就绪后开放 | 待制作；本批未开始 |
| P255 / piano keyboard theory | 入门路径中有键盘乐理示例，不只是把该词放在导航里。 | 后续同页补齐 | 待制作；本批未开始 |

**当前不能交作完整页面排版。** 未写指南；本批图表PDF不能替代入门课程PDF。

#### 17. `/guide/read-sheet-music` · T22

[已核实] 源任务：`P218, P228, P229, P236, P248, P249`。实际范围：S05可作音区起点；6源组正文/图例/练习未完成。

**材料需要：** 高低谱号、音符、时值/记谱与加线原创图例；FACE仅适用高音谱表间音的依据；初学练习题/答案及键盘对照链接。

**待补字段：** `notation_examples`；`ledger_line_examples`；`face_scope`；`practice_questions`；`answer_key`；`guide_pdf`。

**现有材料依据：** [S05](#s05)。

| 源组 / 原代表词 | 原 required_output | 原 first_release_scope | 本批状态 |
| --- | --- | --- | --- |
| P218 / how to read sheet music piano | 高低谱号与键盘对照；音符/加线示例；FACE与记忆方法；练习题；链接可操作的notes chart | 按页面准备顺序验收 | 待制作；本批未开始 |
| P228 / piano notation | 在识谱教程中提供记谱方法与实际图例。 | 后续同页补齐 | 待制作；本批未开始 |
| P229 / simple piano notes | 简单音符的谱表和键位例子与练习。 | 后续同页补齐 | 待制作；本批未开始 |
| P236 / face music notes | 核实 FACE 的适用范围并示例，不扩成万能记忆规则。 | 后续同页补齐 | 待制作；本批未开始 |
| P248 / how to read notes if they are two lines down | 给出具体谱号、音区和加线例子，不猜用户指的哪一个音。 | 后续同页补齐 | 待制作；本批未开始 |
| P249 / how to remember piano notes | 明确方法和练习例子，工具仅辅助查图。 | 后续同页补齐 | 待制作；本批未开始 |

**当前不能交作完整页面排版。** S05可作音区起点；6源组正文/图例/练习未完成。

## 3. 两页任务覆盖与实际数据范围

[已核实] `/chords`原主词为 `piano chord chart`，T06，源组为P148/P154/P158/P168/P170/P171/P238/P247；`/chords/a-minor`原主词为 `am piano chord`，T07，源组为P151。英文H1是页面成稿，不改主词字段。

### `/chords`

| 源组 | 本批实际覆盖 | 仍未完成 |
| --- | --- | --- |
| P148 | 9命名和弦图表/读图/真实PDF；all/full、完整12根音集合及finger-position PDF未满足 | all/full查询所需完整集合未做；finger-position PDF未做。动态当前/筛选打印和实际播放待接入验收。 |
| P154 | 提供A minor、C minor两条结果；未宣称全部minor根音 | 本批只有A minor和C minor；其他小三和弦根音数据后续准备，不标全量。 |
| P158 | 提供7个major名称及打印；其中B/Cb同键，未宣称12个不同大三和弦 | 本批只有7个major名称（含B/Cb同键）；未准备完整根音集合。 |
| P168 | power实际音符集合、使用说明、图和事件均未制作 | power实际音符集合、使用说明、图和事件均未制作 |
| P170 | 7th类别定义与各自集合/图/事件未制作；不得默认为major7 | 7th类别定义与各自集合/图/事件未制作；不得默认为major7 |
| P171 | jazz示例和语境/voicing未制作 | jazz示例和语境/voicing未制作 |
| P238 | A与C两组同根大小对比、半音解释、音图和事件已准备 | 无本批内容缺项；功能仍需接入验收 |
| P247 | 键位标记、音名、音区及操作步骤已准备 | 无本批内容缺项；功能仍需接入验收 |

### `/chords/a-minor`

| 源组 | 本批实际覆盖 | 仍未完成 |
| --- | --- | --- |
| P151 | Am三个位置的内容/音图/事件/打印已准备；公开指法为空 | 公开左右手指法仍为null；三个位置的指法候选须情境复核后才能显示。音频与当前打印待功能验收。 |

### 3.1 中心页实际收录表

[已核实] 音名按下表来源逐条核对；[推断] 本批具体音区是用于展示与发声复现的编辑选择，按S05/S06换算。所有图表和事件都读取相同 `voicing_id`，不会按音名字母排序或擅自将C♭改名为B。

| 和弦 | 组成音 | 本批原位音区 | MIDI（内部音高编号） | 来源 |
| --- | --- | --- | --- | --- |
| C major / C | C–E–G | C4–E4–G4 | 60, 64, 67 | [S07](#s07)、[S12](#s12)、[S01](#s01) |
| A minor / Am | A–C–E | A3–C4–E4 | 57, 60, 64 | [S08](#s08)、[S14](#s14)、[S16](#s16) |
| A major / A | A–C#–E | A3–C#4–E4 | 57, 61, 64 | [S07](#s07)、[S01](#s01)、[S02](#s02) |
| C minor / Cm | C–Eb–G | C4–Eb4–G4 | 60, 63, 67 | [S11](#s11)、[S01](#s01) |
| G major / G | G–B–D | G3–B3–D4 | 55, 59, 62 | [S07](#s07)、[S01](#s01)、[S03](#s03) |
| E major / E | E–G#–B | E3–G#3–B3 | 52, 56, 59 | [S07](#s07)、[S10](#s10)、[S01](#s01) |
| A-flat major / A♭ | Ab–C–Eb | Ab3–C4–Eb4 | 56, 60, 63 | [S07](#s07)、[S12](#s12)、[S01](#s01) |
| B major / B | B–D#–F# | B3–D#4–F#4 | 59, 63, 66 | [S07](#s07)、[S09](#s09)、[S01](#s01) |
| C-flat major / C♭ | Cb–Eb–Gb | Cb4–Eb4–Gb4 | 59, 63, 66 | [S13](#s13)、[S01](#s01)、[S05](#s05) |

[已核实] 本表MIDI编号仅用于稳定标识音高，没有加入MIDI键盘输入功能。中心页只展示这9条；7个major名称、2个minor名称，并明确B/C♭同键异名。

### 3.2 未满足的范围词不能被FAQ冲抵

[已核实] `all chords on a piano`、`all chords piano`、`all chords on piano`、`full piano chord chart`及`what are all the chords on piano?`均记录为未满足全量要求。`piano chord chart with finger position pdf`未满足；普通无指法PDF不顶替它。“12 chords”问题提供概念回答，未假装已交付完整12根音图表。全部69条逐词状态见 `query_coverage`。

## 4. `/chords`：英文成稿与模块映射

| 元数据 | 英文成稿 |
| --- | --- |
| Title | Piano Chord Chart: Notes, Keyboard Diagrams & PDF |
| Description | Explore nine selected major and minor piano chords with note names, keyboard diagrams, sound examples, and a printable reference. |
| H1 | Piano Chord Chart |

**模块顺序与查询关系（后台记录）：**

| block_id | 源任务 / 具体查询 | 回答什么 |
| --- | --- | --- |
| chords-intro | P148: piano chord chart, piano chords | 直接说明图表用途和实际集合范围。 |
| chords-chart | P148: piano chord chart, piano chord diagram, easy piano chord chart；P154: minor chords piano；P158: major chords piano, major chords piano cheat sheet | 默认显示全部9条实际数据；仅开放集合中存在的根音/类型结果。 |
| chords-how-to-read | P148: piano chord chart for beginners；P247: how to read a piano chord chart?, how to use the chord chart | 键位、标记、音区、音名与操作说明。 |
| chords-major-minor | P238: major and minor chords piano, major and minor chords for piano；P154: minor chords piano；P158: major chords piano | 两组同根实际比较，解释而非只给筛选标签。 |
| chords-print | P148: printable piano chord chart, piano chord chart pdf, piano chord sheet printable, free piano chord chart printable pdf；P158: major chords piano cheat sheet | 实际3页PDF含9个命名和弦；单项/筛选打印另有数据合同，尚未实现功能。 |
| chords-questions | P148: how many piano chords are there, what are the 12 chords for piano?, what are all the chords on piano?, piano chord chart with finger position pdf | 明确总量范围、12的含义和指法缺口，避免把局部图表写成all。 |
| chords-next | P148: piano chord chart | 只在相关页面发布后显示内部链接；此处有真实链接文案。 |

### 英文成稿开始

以下是可排版成稿；按钮文案须在对应功能可用后显示。两份整组下载PDF已实际生成，当前/筛选打印及播放功能尚未实现。

#### Piano Chord Chart

Use this piano chord chart to find the notes and keyboard positions for nine selected major and minor triads. Read the notes from low to high, hear them together or one at a time, and print a reference to keep beside your keyboard.

The chart contains seven major and two minor chord names. It includes two spellings that use the same keys: B major and C-flat major. This is a selected collection, not a complete list of piano chords.

#### Find a chord

Choose a root note and chord type to narrow the chart. Each result gives the chord symbol, its three notes, and one root-position example. The first note listed is the lowest note in that example.

For a first comparison, use A major and A minor, or C major and C minor. Keep the root and top note the same and notice which middle note changes.

| Chord | Notes | Example, low to high |
| --- | --- | --- |
| C major (C) | C–E–G | C4–E4–G4 |
| A minor (Am) | A–C–E | A3–C4–E4 |
| A major (A) | A–C♯–E | A3–C♯4–E4 |
| C minor (Cm) | C–E♭–G | C4–E♭4–G4 |
| G major (G) | G–B–D | G3–B3–D4 |
| E major (E) | E–G♯–B | E3–G♯3–B3 |
| A-flat major (A♭) | A♭–C–E♭ | A♭3–C4–E♭4 |
| B major (B) | B–D♯–F♯ | B3–D♯4–F♯4 |
| C-flat major (C♭) | C♭–E♭–G♭ | C♭4–E♭4–G♭4 |

Button / field labels:

- Root note
- Chord type
- Show the full collection
- Play chord
- Play notes one at a time
- Stop

#### How to read this piano chord chart

A dot marks a key to play. The labels identify those pitches; a sharp (♯) raises a written note by one semitone, and a flat (♭) lowers it by one semitone.

C4 means middle C. The number after a note is its octave, not a finger number. The diagrams use the same C3–C5 window so you can compare positions. A note such as C♭4 keeps the octave of its written C even though it uses the B3 key.

1. Read the chord name and its note list. A symbol such as Am names the root A and the minor chord type.
2. Match the marked keys to the labels. Notes are listed from lowest to highest.
3. Use Play chord to hear the notes together, or Play notes one at a time to hear the same notes in ascending order.
4. Compare the keyboard image with the printed note list before playing it on your instrument.

#### Major and minor: change the third

A major triad places its third four semitones above the root. A minor triad places its third three semitones above the root. Both use a perfect fifth, seven semitones above the root.

In the A examples, C♯ becomes C while A and E stay in place. In the C examples, E becomes E♭ while C and G stay in place. The note names in the tables are chord members, not finger numbers.

| Root | Major triad | Minor triad | What changes |
| --- | --- | --- | --- |
| A | A–C♯–E | A–C–E | C♯ lowers to C |
| C | C–E–G | C–E♭–G | E lowers to E♭ |

#### Print a piano chord reference

Download the three-page reference with all nine chord names in this collection. It includes root-position keyboard diagrams, note names, and octave labels. Finger numbers are not included.

To keep a smaller reference, print the current chord or the results matching your filters. Check the chord names in the print preview before printing.

Button / field labels:

- Download chord chart PDF
- Print this chord
- Print matching chords

#### Questions about this chart

| Question | Answer |
| --- | --- |
| Are these all the chords on piano? | No. This chart covers nine named major and minor triads. Seventh chords, power chords, jazz voicings, and a complete set of roots are not included in this collection. |
| What are the 12 chords for piano? | There are 12 semitone pitch positions in an octave in equal temperament. A root can support more than one chord type, so “12 chords” does not mean there are only 12 chords on a piano. Check which chord type a chart is listing. |
| Does the PDF show finger positions? | It shows which keys to play, with note and octave labels. It does not give finger numbers. |
| Why do B major and C-flat major use the same keys? | They are enharmonic spellings in this keyboard reference. B major is B–D♯–F♯; C-flat major is C♭–E♭–G♭. Keep the spelling shown by the chord you are reading. |

#### Explore A minor in more detail

See the same A-minor chord in root position, first inversion, and second inversion.

Related-link copy:

- A minor piano chord: notes and inversions → `/chords/a-minor`

### 英文成稿结束

**后台来源映射：** 每个模块的事实与推导见JSON `claim_ids`，具体来源见第7节。英文操作文案是可用后的目标行为，不是本轮已经测试过的功能报告。

| block_id | 核心事实 / 推导记录 | 直接来源 |
| --- | --- | --- |
| chords-intro | F09, F12 | [S09](#s09)、[S13](#s13) |
| chords-chart | F01, F04, F12 | [S01](#s01)、[S02](#s02) |
| chords-how-to-read | F05, F07, F12 | [S01](#s01)、[S05](#s05) |
| chords-major-minor | F01, F04 | [S02](#s02)、[S07](#s07)、[S08](#s08)、[S11](#s11)、[S12](#s12) |
| chords-print | F12 | 原创编辑／本地输出核验 |
| chords-questions | F05, F09, F11, F12 | [S05](#s05)、[S06](#s06)、[S09](#s09)、[S13](#s13)、[S01](#s01) |
| chords-next | F02 | [S08](#s08) |

**交互状态文案：**

| 状态 | 英文文案 |
| --- | --- |
| loading | Preparing the sound… |
| audio_error | Sound could not start. Try again. |
| audio_unavailable | Sound is unavailable. You can still use the notes and diagram. |
| print_error | The print preview could not open. Download the PDF instead. |
| selected_note_summary | Notes from low to high |
| result_count_singular | {count} chord |
| result_count_plural | {count} chords |
| no_results | No chord in this collection matches both choices. Change the root or chord type. |
| playback_note | Simple reference tone; not a recording of an acoustic piano. |

[推断] 初始根音/类型均为Any；展示9张图，当前播放对象为C major。按原样拼写筛选，不将Cb选项重定向为B；无结果时清空当前对象、禁用播放/打印。以下是可验收的真实筛选结果。

| 根音 | 类型 | 实际结果 |
| --- | --- | --- |
| A | null | a-minor, a-major |
| C | minor | c-minor |
| B | major | b-major |
| Cb | major | c-flat-major |
| E | minor | 0条；显示no_results |

[已核实] 相关链接全部沿用原URL；发布状态尚未验证，默认不开放。`/chords/a-major`与`/scales/a-minor`尚未完成，不能因文案已写就出现空入口。

## 5. `/chords/a-minor`：英文成稿与模块映射

| 元数据 | 英文成稿 |
| --- | --- |
| Title | A Minor Piano Chord (Am): Notes, Inversions & PDF |
| Description | Find the A minor chord on piano: A, C, and E. Compare root position, Am/C, and Am/E with keyboard diagrams, sound examples, and a printable PDF. |
| H1 | A Minor Piano Chord (Am) |

**模块顺序与查询关系（后台记录）：**

| block_id | 源任务 / 具体查询 | 回答什么 |
| --- | --- | --- |
| am-intro | P151: am piano chord, a minor piano chord, a minor chord on piano | 进入页面直接给固定和弦答案。 |
| am-result | P151: am on piano chord, am in piano, a minor chords piano | 固定Am且默认原位；显示结果和实际事件。 |
| am-find-notes | P151: a minor chord piano, a minor chord for piano | 按当前音区找实琴键位；不把全白键说成无需练习。 |
| am-inversions | P151: am piano chord, piano a minor chord | 提供完整三种密集排列，音区低音和slash symbol都具体。 |
| am-why-minor | P151: a minor piano chord | 针对A minor说明关系并用A major精确比较。 |
| am-practice | P151: a minor chord on piano | 原创短检查练习；不给虚构训练成果。 |
| am-print | P151: am piano chord | 有实际1页PDF；当前打印规则随选择，两个动作不混淆。 |
| am-questions | P151: a minor piano chord, am chord on piano | 补充别名、转位、Am7区别，保持A minor三和弦边界。 |
| am-next | P151: am piano chord | 真实链接文案，按发布状态控制；无新URL。 |

### 英文成稿开始

以下是可排版成稿；按钮文案须在对应功能可用后显示。两份整组下载PDF已实际生成，当前/筛选打印及播放功能尚未实现。

#### A Minor Piano Chord (Am)

The A minor chord, written Am, contains A, C, and E. All three are white-key notes. In root position, play A as the lowest note, with C and E above it.

The example below uses A3–C4–E4, with C4 as middle C. Listen to these notes together or individually, then compare the two inversions.

#### A minor notes and keyboard positions

Chord symbol: Am. Chord tones: A–C–E. A is the root, C is the minor third, and E is the perfect fifth. The root stays A in every inversion.

Choose a position to change the lowest note. The keyboard diagram, note list, and playback all follow that same selection.

Button / field labels:

- Position
- Play chord
- Play notes one at a time
- Stop

#### Find A, C, and E on the keyboard

Start with C4, middle C. A3 is two white-key steps to its left: move past B3 to A3. E4 is two white-key steps to the right of C4: move past D4 to E4.

The marked keys show pitches, not a hand shape or a required fingering.

1. Locate A3, C4, and E4 using the labels.
2. Play them separately to check their order, then sound the three notes together.
3. If you use another octave, move all three notes by the same number of octaves to keep this root-position shape.

#### A minor inversions

An inversion changes which chord tone is lowest. First inversion puts C in the bass; second inversion puts E in the bass. The letters after the slash in Am/C and Am/E identify that bass note.

These examples use close position without doubled notes. Other spacings are possible; the lowest note determines the inversion.

| Position | Symbol | Notes, low to high | Bass |
| --- | --- | --- | --- |
| Root position | Am | A3–C4–E4 | A3 |
| First inversion | Am/C | C4–E4–A4 | C4 |
| Second inversion | Am/E | E4–A4–C5 | E4 |

#### What makes this chord minor?

From A to C is a minor third: three semitone steps. From C to E is a major third: four semitone steps. Together, the outer notes A and E form a perfect fifth.

Compare A minor, A–C–E, with A major, A–C♯–E. Only the third changes. A minor uses C natural; A major uses C-sharp. The interval pattern identifies the chord as minor, without needing a mood label.

#### Try the three positions

Use this as a note-finding check. Work with one position at a time before moving to the next.

1. Play A3–C4–E4 and say “A in the bass.”
2. Choose first inversion and play C4–E4–A4. Say “C in the bass.”
3. Choose second inversion and play E4–A4–C5. Say “E in the bass.”
4. Without looking at the chord symbol, name the lowest note and identify the position. Check against the table.

#### Print the A minor reference

Download the one-page reference to compare all three positions. It includes the exact pitches and keyboard diagrams shown here, with no finger numbers.

Use Print this position if you only need the current selection.

Button / field labels:

- Download A minor PDF
- Print this position

#### A minor questions

| Question | Answer |
| --- | --- |
| Is Am the same as A minor? | Yes. Am is a common chord symbol for the A minor triad. You may also see A min or A−. |
| Does Am/C become a C chord? | No. It is still A minor, with C as the lowest note. Its chord tones are still A, C, and E. |
| Is Am the same as Am7? | No. Am is A–C–E; Am7 adds G. This page covers the three-note Am chord. |
| Are the numbers in A3, C4, and E4 finger numbers? | No. They identify octaves. The diagrams in this reference do not prescribe fingering. |

#### Compare with other chords

Related-link copy:

- Piano chord chart: compare major and minor → `/chords`
- A major piano chord → `/chords/a-major`
- A minor scale: notes and forms → `/scales/a-minor`

### 英文成稿结束

**后台来源映射：** 每个模块的事实与推导见JSON `claim_ids`，具体来源见第7节。英文操作文案是可用后的目标行为，不是本轮已经测试过的功能报告。

| block_id | 核心事实 / 推导记录 | 直接来源 |
| --- | --- | --- |
| am-intro | F02, F05, F07, F08 | [S08](#s08)、[S05](#s05) |
| am-result | F01, F02, F03, F12 | [S01](#s01)、[S04](#s04)、[S08](#s08) |
| am-find-notes | F02, F05, F07, F12 | [S05](#s05)、[S08](#s08) |
| am-inversions | F02, F03, F07 | [S04](#s04)、[S08](#s08)、[S14](#s14)、[S16](#s16) |
| am-why-minor | F01, F02, F04 | [S02](#s02)、[S07](#s07)、[S08](#s08) |
| am-practice | F02, F03, F12 | [S04](#s04)、[S08](#s08) |
| am-print | F12 | 原创编辑／本地输出核验 |
| am-questions | F02, F03, F05, F10 | [S01](#s01)、[S04](#s04)、[S05](#s05)、[S08](#s08) |
| am-next | 原创链接/编辑文案 | 原创编辑／本地输出核验 |

**交互状态文案：**

| 状态 | 英文文案 |
| --- | --- |
| loading | Preparing the sound… |
| audio_error | Sound could not start. Try again. |
| audio_unavailable | Sound is unavailable. You can still use the notes and diagram. |
| print_error | The print preview could not open. Download the PDF instead. |
| selected_note_summary | Notes from low to high |
| result_count_singular | {count} chord |
| result_count_plural | {count} chords |
| no_results | No chord in this collection matches both choices. Change the root or chord type. |
| playback_note | Simple reference tone; not a recording of an acoustic piano. |

[推断] 固定Am，不设置中心页式的根音/类型筛选。默认 `a-minor--root`；三个可选位置的英文标签与数据已完整提供。

[已核实] 相关链接全部沿用原URL；发布状态尚未验证，默认不开放。`/chords/a-major`与`/scales/a-minor`尚未完成，不能因文案已写就出现空入口。

## 6. 数据与原创素材交接

[已核实] `shared_data.chords`有9个对象，`shared_data.voicings`有11个具体排列。显示、播放事件、打印都按 `voicing_id` 引用；字段为空时用`null`，不使用0、空字符串或猜测指法替代。

| 字段 | 含义 / 使用方法 |
| --- | --- |
| chord_id / canonical_url | 已有和弦对象和原规划URL；不证明详细页已经制作或发布 |
| root_spelling / note_spellings | 音乐拼写；不得依据MIDI重新命名 |
| formula_degrees | 相对同根大调的1/3或b3/5关系；不是手指编号 |
| formula_semitones | 由根音向上0/4/7或0/3/7半音 |
| notes_low_to_high | 当前具体排列的有序音符对象；顺序是音高，不能按字符串排序 |
| spelled_pitch / written_octave | 书写音名和其自然字母所属音区；Cb4的written_octave为4 |
| midi / physical_key_id | 唯一实际键位/发声音高标识；Cb4和B3同为59 |
| frequency_hz | A4=440Hz十二平均律换算结果，6位小数；不是实录钢琴的精测音高 |
| bass_spelling | 当前排列最低音；不覆盖和弦根音 |
| playback.together / ascending | 按毫秒排列的真实事件；包含音名、MIDI、频率、开始时间、时长 |
| diagram / print_data | 同一排列的SVG文件、高亮键、音区和打印数据 |
| fingering.right_hand / left_hand | 本批公开值均为null；后台参考候选与专业签核分开 |
| claim_ids / source_ids | 事实或推导记录及直接来源的稳定关联 |
| public_url / canonical_absolute_url | 当前均为null；未猜测站点域名或部署地址 |

### 6.1 A minor的完整可复现数据

[已核实] 三种音序来自S08/S16；[推断] 八度、MIDI和频率按统一约定生成。三种排列均为密集排列、无重复音、不加低音或踏板。

| voicing_id | 符号 | 音符，低到高 | MIDI | 频率Hz |
| --- | --- | --- | --- | --- |
| a-minor--root | Am | A3 / C4 / E4 | [57, 60, 64] | 220.0 / 261.625565 / 329.627557 |
| a-minor--first | Am/C | C4 / E4 / A4 | [60, 64, 69] | 261.625565 / 329.627557 / 440.0 |
| a-minor--second | Am/E | E4 / A4 / C5 | [64, 69, 72] | 329.627557 / 440.0 / 523.251131 |

[推断] 齐奏：三音在0ms开始、各1200ms；逐音：0/600/1200ms开始、各500ms。时长是本批参考设置，不是乐理规则或建议练习速度。切换位置时先停止旧声音；高亮应匹配当前事件。没有在后台偷加根音、八度或伴奏。

[已核实] 本轮未制作或试听音频文件。播放器数据已齐；音源拟采用自行合成参考音，页面文案明确不是原声钢琴录音。若后续改用音色采样，另记录实际来源与使用条件；本包没有采样授权结论。

### 6.2 素材文件、制作方法与权限

[已核实] 11张SVG与2份PDF均由本包音符数据和原创键盘几何生成，不复制竞品键盘图、谱面、音频或Pianote参考图。PDF使用US Letter纵向，屏幕图/打印采用同一键位范围C3–C5。它们是音符参考图，不是手型图、五线谱教材或实尺寸贴纸。

| asset_id | 真实文件 | 范围 | 文件状态 |
| --- | --- | --- | --- |
| svg-c-major--root | [c-major--root.svg](assets/c-major--root.svg) | c-major--root | 已生成SVG |
| svg-a-minor--root | [a-minor--root.svg](assets/a-minor--root.svg) | a-minor--root | 已生成SVG |
| svg-a-major--root | [a-major--root.svg](assets/a-major--root.svg) | a-major--root | 已生成SVG |
| svg-c-minor--root | [c-minor--root.svg](assets/c-minor--root.svg) | c-minor--root | 已生成SVG |
| svg-g-major--root | [g-major--root.svg](assets/g-major--root.svg) | g-major--root | 已生成SVG |
| svg-e-major--root | [e-major--root.svg](assets/e-major--root.svg) | e-major--root | 已生成SVG |
| svg-a-flat-major--root | [a-flat-major--root.svg](assets/a-flat-major--root.svg) | a-flat-major--root | 已生成SVG |
| svg-b-major--root | [b-major--root.svg](assets/b-major--root.svg) | b-major--root | 已生成SVG |
| svg-c-flat-major--root | [c-flat-major--root.svg](assets/c-flat-major--root.svg) | c-flat-major--root | 已生成SVG |
| svg-a-minor--first | [a-minor--first.svg](assets/a-minor--first.svg) | a-minor--first | 已生成SVG |
| svg-a-minor--second | [a-minor--second.svg](assets/a-minor--second.svg) | a-minor--second | 已生成SVG |
| pdf-chords-selected | [piano-chord-chart-selected.pdf](assets/piano-chord-chart-selected.pdf) | c-major--root, a-minor--root, a-major--root, c-minor--root, g-major--root, e-major--root, a-flat-major--root, b-major--root, c-flat-major--root | 已生成；3页 |
| pdf-a-minor | [a-minor-notes-inversions.pdf](assets/a-minor-notes-inversions.pdf) | a-minor--root, a-minor--first, a-minor--second | 已生成；1页 |

[已核实] PDF4页已渲染并逐页检查文字、音名、标记和边界；SVG与PDF由相同几何输出，SVG文本/对象标识另经程序核验。未进行实物打印或浏览器动态打印。

[推断] 设计可直接使用这些SVG作准确内容素材，也可在保持键位/音名/音区一致的前提下重新排版。源码内容是从音符事实独立组织的；来源网页“可读”或“可免费下载”没有被当作可转载许可。文件中 `license=null`表示没有替用户指定公开授权协议，不表示已获第三方素材授权。

### 6.3 指法处理

[已核实] S08/S14/S16提供了Am指法参考；S16的原链接实际为JPEG，已查看，其左右手谱例并非统一放在本包所有示范音区。参考数字已记录在 `professional_review.reference_candidates`，但公开 `fingering`均为`null`。

[推断] 按附件“指法仅在专业核对后提供”的条件，先交无指法版本。若后续启用指法，需教师核对每一手别、排列、具体音区和静态按和弦情境后写入，不从一个通用135模式自动推满。此项不阻止本次无指法页面排版；带指法PDF查询保持未完成。

## 7. 事实、来源与访问记录

### 7.1 核心事实与位置

[已核实] 以下为后台证据账本。来源支持的是具体音乐事实；推导项另写出依据。页面中对应位置由稳定block_id指向，未使用搜索摘要代替正文。

| 事实ID | 证据状态 / 内容 | 依据 | 对应位置 |
| --- | --- | --- | --- |
| F01 | [已核实] 本批major triad的根音以上半音偏移为0、4、7；minor triad为0、3、7。 | [S01](#s01)、[S02](#s02)、[S12](#s12) | pages[/chords].blocks[chords-chart]; pages[/chords].blocks[chords-major-minor]; pages[/chords/a-minor].blocks[am-result]; pages[/chords/a-minor].blocks[am-why-minor] |
| F02 | [已核实] Am为A-C-E三和弦；三个密集排列为A-C-E、C-E-A、E-A-C。 | [S08](#s08)、[S14](#s14)、[S16](#s16) | pages[/chords].blocks[chords-next]; pages[/chords/a-minor].blocks[am-intro]; pages[/chords/a-minor].blocks[am-result]; pages[/chords/a-minor].blocks[am-find-notes]; pages[/chords/a-minor].blocks[am-inversions]; pages[/chords/a-minor].blocks[am-why-minor]; pages[/chords/a-minor].blocks[am-practice]; pages[/chords/a-minor].blocks[am-questions] |
| F03 | [推断] Am/C以C为低音，Am/E以E为低音；根音仍为A。 依据：将已核实的A-C-E及转位低音/斜线命名规则应用到两个排列；不是按根音总在最下面的简化描述生成。 | [S02](#s02)、[S04](#s04)、[S08](#s08)、[S15](#s15) | pages[/chords/a-minor].blocks[am-result]; pages[/chords/a-minor].blocks[am-inversions]; pages[/chords/a-minor].blocks[am-practice]; pages[/chords/a-minor].blocks[am-questions] |
| F04 | [已核实] 同根大小三和弦的三音相差一个半音，根音和五音保持。 | [S01](#s01)、[S02](#s02)、[S12](#s12) | pages[/chords].blocks[chords-chart]; pages[/chords].blocks[chords-major-minor]; pages[/chords/a-minor].blocks[am-why-minor] |
| F05 | [已核实] C4表示中央C；Cb4与B3对应同一琴键，书写拼写不能直接替换。 | [S05](#s05) | pages[/chords].blocks[chords-how-to-read]; pages[/chords].blocks[chords-questions]; pages[/chords/a-minor].blocks[am-intro]; pages[/chords/a-minor].blocks[am-find-notes]; pages[/chords/a-minor].blocks[am-questions]; shared_data.voicings.*.notes_low_to_high |
| F06 | [已核实] 本包采用十二平均律、A4=440Hz且MIDI69的音高约定。 | [S06](#s06) | shared_data.voicings.*.notes_low_to_high |
| F07 | [推断] 音符MIDI编号与频率由书写音名及公式换算；具体八度和播放时长是本批展示选择。 依据：MIDI=12*(written_octave+1)+natural_pitch_class+accidental；频率=440*2**((midi-69)/12)，保留Cb跨音区处理。 | [S05](#s05)、[S06](#s06) | pages[/chords].blocks[chords-how-to-read]; pages[/chords/a-minor].blocks[am-intro]; pages[/chords/a-minor].blocks[am-find-notes]; pages[/chords/a-minor].blocks[am-inversions]; shared_data.voicings.*.notes_low_to_high |
| F08 | [推断] Am的本批三种排列均只使用白键。 依据：已核实A/C/E；在键盘音级布局中均为自然音白键，换八度不会改变键色。 | [S05](#s05)、[S08](#s08) | pages[/chords/a-minor].blocks[am-intro] |
| F09 | [已核实] Cb-Eb-Gb与B-D#-F#在本包十二平均律键盘中对应相同键位；仍保持两个和弦名称。 | [S05](#s05)、[S09](#s09)、[S13](#s13) | pages[/chords].blocks[chords-intro]; pages[/chords].blocks[chords-questions] |
| F10 | [推断] Am7比Am三和弦增加G；本包未制作七和弦工具数据。 依据：S01小七和弦=小三和弦加小七度；A之上小七度为G。这里只解释符号区别，不将历史Am7线索并入关键词表。 | [S01](#s01)、[S08](#s08) | pages[/chords/a-minor].blocks[am-questions] |
| F11 | [推断] 十二平均律每八度12个半音音高，12不表示钢琴总共只有12个和弦。 依据：把每八度12个根音位置与每个根音可构成多种和弦品质区别；不将本批9个命名和弦宣称为全量。 | [S01](#s01)、[S06](#s06) | pages[/chords].blocks[chords-questions] |
| F12 | [推断] 本批root-position音区、示范时长、步骤顺序和图表收录顺序为原创编辑选择。 依据：为两页真实排版和复现所选，不是学习效果、最优指法或流行度结论。 | 原创编辑／本地输出核验 | pages[/chords].blocks[chords-intro]; pages[/chords].blocks[chords-chart]; pages[/chords].blocks[chords-how-to-read]; pages[/chords].blocks[chords-print]; pages[/chords].blocks[chords-questions]; pages[/chords/a-minor].blocks[am-result]; pages[/chords/a-minor].blocks[am-find-notes]; pages[/chords/a-minor].blocks[am-practice]; pages[/chords/a-minor].blocks[am-print] |
| C-c-major | [已核实] C major组成音为C–E–G。 | [S07](#s07)、[S12](#s12)、[S01](#s01) | shared_data.chords.c-major |
| C-a-minor | [已核实] A minor组成音为A–C–E。 | [S08](#s08)、[S14](#s14)、[S16](#s16) | shared_data.chords.a-minor |
| C-a-major | [已核实] A major组成音为A–C#–E。 | [S07](#s07)、[S01](#s01)、[S02](#s02) | shared_data.chords.a-major |
| C-c-minor | [已核实] C minor组成音为C–Eb–G。 | [S11](#s11)、[S01](#s01) | shared_data.chords.c-minor |
| C-g-major | [已核实] G major组成音为G–B–D。 | [S07](#s07)、[S01](#s01)、[S03](#s03) | shared_data.chords.g-major |
| C-e-major | [已核实] E major组成音为E–G#–B。 | [S07](#s07)、[S10](#s10)、[S01](#s01) | shared_data.chords.e-major |
| C-a-flat-major | [已核实] A-flat major组成音为Ab–C–Eb。 | [S07](#s07)、[S12](#s12)、[S01](#s01) | shared_data.chords.a-flat-major |
| C-b-major | [已核实] B major组成音为B–D#–F#。 | [S07](#s07)、[S09](#s09)、[S01](#s01) | shared_data.chords.b-major |
| C-c-flat-major | [已核实] C-flat major组成音为Cb–Eb–Gb。 | [S13](#s13)、[S01](#s01)、[S05](#s05) | shared_data.chords.c-flat-major |

### 7.2 来源目录

[已核实] 以下16项均在2026-09-09实际打开相关正文、FAQ、可见转录或图像。没有把看见视频/播放按钮当成已听过示范。来源同时记录在JSON，后续可按URL重新核对。

<a id="s01"></a>
#### S01 · Triads and seventh chords

- 发布者/作者：Open Music Theory / Hybrid Pedagogy Publishing
- 来源：[原文或原图](https://openmusictheory.github.io/triads.html)
- 查阅位置：Triad qualities; Lead-sheet symbols; Building a triad; Seventh chords
- 支持内容：三和弦构成、大小三和弦音程、Am符号与转位低音；Am与Am7区分。
- 实际访问：`relevant_full_text_read`；核查日期：2026-09-09
- 使用方式：事实依据；本包未复制其展示图片、谱面或声音。素材再分发许可未取得或未判定。

<a id="s02"></a>
#### S02 · Basic Piano Chords for Beginners, Part 1

- 发布者/作者：Jerry Kovarsky / Yamaha
- 来源：[原文或原图](https://hub.yamaha.com/keyboards/k-how-to/basic-piano-chords-for-beginners-part-1/)
- 查阅位置：The Four Main Three-Note Chord Types
- 支持内容：大三和弦4+3与小三和弦3+4半音；降低三音的对比；逐音与同时发声例子。
- 实际访问：`relevant_full_text_read`；核查日期：2026-09-09
- 使用方式：事实依据；本包未复制其展示图片、谱面或声音。素材再分发许可未取得或未判定。

<a id="s03"></a>
#### S03 · Introduction to Triads

- 发布者/作者：Music Theory for the 21st-Century Classroom / University of Puget Sound
- 来源：[原文或原图](https://musictheory.pugetsound.edu/mt21c/TriadsIntroduction.html)
- 查阅位置：Section 6.1
- 支持内容：根音、三音、五音及三度叠置；用于数据结构交叉核对。
- 实际访问：`relevant_full_text_read`；核查日期：2026-09-09
- 使用方式：事实依据；本包未复制其展示图片、谱面或声音。素材再分发许可未取得或未判定。

<a id="s04"></a>
#### S04 · Inverted Triads

- 发布者/作者：Music Theory for the 21st-Century Classroom / University of Puget Sound
- 来源：[原文或原图](https://musictheory.pugetsound.edu/mt21c/InvertedTriads.html)
- 查阅位置：Section 6.3 and 6.3.1
- 支持内容：转位由最低音决定；根音和低音不同；斜线后是低音。
- 实际访问：`relevant_full_text_read`；核查日期：2026-09-09
- 使用方式：事实依据；本包未复制其展示图片、谱面或声音。素材再分发许可未取得或未判定。

<a id="s05"></a>
#### S05 · Pitches and octave designations

- 发布者/作者：Open Music Theory / Hybrid Pedagogy Publishing
- 来源：[原文或原图](https://openmusictheory.github.io/pitches.html)
- 查阅位置：Enharmonic equivalence; Octave Designation
- 支持内容：C4中央C；以C分音区；Cb4与B3同键但拼写和书写音区不同。
- 实际访问：`relevant_full_text_read`；核查日期：2026-09-09
- 使用方式：事实依据；本包未复制其展示图片、谱面或声音。素材再分发许可未取得或未判定。

<a id="s06"></a>
#### S06 · Note names, MIDI numbers and frequencies

- 发布者/作者：Joe Wolfe / UNSW School of Physics
- 来源：[原文或原图](https://www.phys.unsw.edu.au/jw/notes.html)
- 查阅位置：Equal temperament and MIDI conversion equations
- 支持内容：A4=440Hz、MIDI69；十二平均律频率公式；生成数据的音高约定。
- 实际访问：`relevant_full_text_read`；核查日期：2026-09-09
- 使用方式：事实依据；本包未复制其展示图片、谱面或声音。素材再分发许可未取得或未判定。

<a id="s07"></a>
#### S07 · How to Play Major Chords on Piano and Keyboard

- 发布者/作者：Mantius Cazaubon / Piano Keyboard Guide
- 来源：[原文或原图](https://www.piano-keyboard-guide.com/how-to-play-major-chords-on-piano-and-keyboard/)
- 查阅位置：Major Chords List; paragraphs on A, Ab, G, E, B and C
- 支持内容：六个本批大三和弦的音名；仅摘取所用条目的事实，不复制表格或图片。
- 实际访问：`relevant_full_text_read`；核查日期：2026-09-09
- 使用方式：事实依据；本包未复制其展示图片、谱面或声音。素材再分发许可未取得或未判定。

<a id="s08"></a>
#### S08 · A Minor Chord - How to Form an Am Chord on Piano

- 发布者/作者：Mantius Cazaubon / Piano Keyboard Guide
- 来源：[原文或原图](https://www.piano-keyboard-guide.com/a-minor-chord.html)
- 查阅位置：Opening; Root position; first and second inversion paragraphs
- 支持内容：Am音名、三个排列及右手指法参考；右手参考不视为本项目专业签核。
- 实际访问：`relevant_full_text_read`；核查日期：2026-09-09
- 使用方式：事实依据；本包未复制其展示图片、谱面或声音。素材再分发许可未取得或未判定。
- 限定：首段将scale/chord混用，调内罗马数字大小写未按本项目约定处理；不引用这些句子。

<a id="s09"></a>
#### S09 · B major chord

- 发布者/作者：Pianochord.org original instructional page
- 来源：[原文或原图](https://www.pianochord.org/b-major.html)
- 查阅位置：Notes; Theory
- 支持内容：B-D#-F#，与S07及三和弦规则交叉核对。
- 实际访问：`relevant_full_text_read`；核查日期：2026-09-09
- 使用方式：事实依据；本包未复制其展示图片、谱面或声音。素材再分发许可未取得或未判定。

<a id="s10"></a>
#### S10 · E major chord

- 发布者/作者：Pianochord.org original instructional page
- 来源：[原文或原图](https://www.pianochord.org/e-major.html)
- 查阅位置：Notes; Theory
- 支持内容：E-G#-B，与S07及三和弦规则交叉核对。
- 实际访问：`relevant_full_text_read`；核查日期：2026-09-09
- 使用方式：事实依据；本包未复制其展示图片、谱面或声音。素材再分发许可未取得或未判定。

<a id="s11"></a>
#### S11 · C minor chord

- 发布者/作者：Pianochord.org original instructional page
- 来源：[原文或原图](https://www.pianochord.org/cm.html)
- 查阅位置：Notes; Theory
- 支持内容：C-Eb-G，minor3+4，与S01的Cm示例交叉核对。
- 实际访问：`relevant_full_text_read`；核查日期：2026-09-09
- 使用方式：事实依据；本包未复制其展示图片、谱面或声音。素材再分发许可未取得或未判定。

<a id="s12"></a>
#### S12 · Major & Minor Triads, Lesson 124

- 发布者/作者：Joseph Hoffman / Hoffman Academy
- 来源：[原文或原图](https://app.hoffmanacademy.com/lessons/piano/major-minor-triads/video/)
- 查阅位置：Major/minor FAQ and visible transcript through Ab example
- 支持内容：C-E-G与Ab-C-Eb；大小三度的3/4半音差别。
- 实际访问：`faq_and_visible_transcript_read_video_not_played`；核查日期：2026-09-09
- 使用方式：事实依据；本包未复制其展示图片、谱面或声音。素材再分发许可未取得或未判定。
- 限定：完整视频未实测；网页其它段落中diminished用词不作为本包依据。

<a id="s13"></a>
#### S13 · Do you spell "their" as "there?"

- 发布者/作者：Jermaine / Hear and Play Music Learning Center
- 来源：[原文或原图](https://hearandplay.com/main/do-you-spell-their-as-there/)
- 查阅位置：Answers: Cb major chord; generic interval spelling explanation
- 支持内容：Cb-Eb-Gb及与B大三和弦同键的关系，保留三度音名拼写。
- 实际访问：`relevant_full_text_read`；核查日期：2026-09-09
- 使用方式：事实依据；本包未复制其展示图片、谱面或声音。素材再分发许可未取得或未判定。

<a id="s14"></a>
#### S14 · Chord Inversions Explained (With Cheat Sheets)

- 发布者/作者：Lisa Witt / Pianote
- 来源：[原文或原图](https://www.pianote.com/blog/piano-chord-inversions/)
- 查阅位置：What are chord inversions; C to Am example; cheat-sheet links
- 支持内容：Am第一转位C-E-A；右手1-2-5的情境参考；原位与转位解释。
- 实际访问：`relevant_full_text_read`；核查日期：2026-09-09
- 使用方式：事实依据；本包未复制其展示图片、谱面或声音。素材再分发许可未取得或未判定。
- 限定：C大三和弦first-inversion标题写E-C-G，正文写E-G-C；前者也可为第一转位但非正文所示密集排列。本包按低音定义与明确排列生成，不复制标题顺序。

<a id="s15"></a>
#### S15 · Chord Inversions, Lesson 191

- 发布者/作者：Joseph Hoffman / Hoffman Academy
- 来源：[原文或原图](https://app.hoffmanacademy.com/lessons/piano/chord-inversions/video/)
- 查阅位置：Slash-chord FAQ; forming inversions FAQ
- 支持内容：转位和斜线低音解释的交叉依据。
- 实际访问：`faq_and_visible_transcript_read_video_not_played`；核查日期：2026-09-09
- 使用方式：事实依据；本包未复制其展示图片、谱面或声音。素材再分发许可未取得或未判定。

<a id="s16"></a>
#### S16 · C Major / A Minor inversion reference image

- 发布者/作者：Pianote / linked from Lisa Witt article
- 来源：[原文或原图](https://pianote.s3.us-east-1.amazonaws.com/blog/2021/Ultimate%20Chord%20Inversions/c%20major%20a%20minor%20copy.jpg)
- 查阅位置：A Minor: Root Position, 1st Inversion, 2nd Inversion rows
- 支持内容：实际查看谱例与左右手指法参考；仅用于研究，不收录或改绘该版式。
- 实际访问：`image_opened_and_visually_read`；核查日期：2026-09-09
- 使用方式：事实依据；本包未复制其展示图片、谱面或声音。素材再分发许可未取得或未判定。
- 限定：链接实际返回JPEG而非PDF；未取得转载该图的授权。

### 7.3 实际访问障碍与替代依据

[已核实] 以下失败没有阻止本批音乐事实核对：已用列出的可读来源替代，未拿失败页面的摘要算全文。

| 地址 | 实际结果 | 采用的替代来源 |
| --- | --- | --- |
| https://viva.pressbooks.pub/openmusictheory/chapter/triads/ | 403 | [S01](#s01)、[S03](#s03) |
| https://www.hoffmanacademy.com/blog/chord-inversions-piano | 仅返回1行，正文未取到 | [S04](#s04)、[S15](#s15) |
| https://www.pianochord.org/am.html | timeout | [S08](#s08)、[S14](#s14)、[S16](#s16) |
| https://www.pianochord.org/a-major.html | timeout | [S07](#s07)、[S01](#s01) |
| https://www.pianochord.org/c-major.html | timeout | [S07](#s07)、[S12](#s12) |
| https://www.pianochord.org/ab-major.html | not_safe_to_open tool error | [S07](#s07)、[S12](#s12) |
| https://www.pianochord.org/g-major.html | 429 | [S07](#s07)、[S01](#s01) |
| https://musictheory.pugetsound.edu/mt21c/TriadInversion.html | 错误猜测路径未打开，随后从目录找到InvertedTriads.html | [S04](#s04) |

### 7.4 发现的来源差异

[已核实] Pianote同页C第一转位标题与正文音序不同；[推断] 两个音序均可满足E作低音，但间距不同。本包使用明确的密集排列与独立低音规则，不按多数票决定。相关记录见S14。

[已核实] 另一个已读Piano Keyboard Guide小和弦总表中，G-flat minor括号项为Gb-Bb-Db；[推断] 这与minor的三度规则不符。本包未导入该总表或该和弦；Am/Cm采用独立页面与机构规则核对。该项不属于当前和弦集合，不形成需要用户裁决的阻塞。

## 8. 缺项、设计条件与发布条件

[已核实] `ready_for_design=true`仅适用于两页的本批已准备范围；`ready_for_publish=false`适用于全部17页。没有需要用户再次确认网站功能的事项。

| 缺项ID | 精确字段 / 任务 | 下一动作 | 阻止当前设计？ | 阻止发布？ |
| --- | --- | --- | --- | --- |
| G-AUDIO | shared_data.voicings.*.playback, pages.*.verification.functional_playback_test | 以本包事件实现主动播放/逐音/停止；先用无第三方采样的合成参考音；逐个验证音高、顺序、停止与切换，实际试听并记录结果。 | 否 | 是 |
| G-PRINT-RUNTIME | pages.*.controls.print_current_voicing, pages./chords.controls.print_filtered_collection | 实现当前位置/过滤集合的打印，渲染后与print_data逐项核对；静态整组PDF不能代替动态打印验收。 | 否 | 是 |
| G-LINKS | pages.*.blocks.*.content.links.*.published, assets.*.public_url, pages.*.metadata.canonical_absolute_url | 绑定真实文件地址和域名；只开放已发布目标，未制作的A major/音阶等链接不显示。 | 否 | 是 |
| G-FINGERING | shared_data.voicings.*.fingering.right_hand, shared_data.voicings.*.fingering.left_hand | Am候选逐个核对手别、具体音区、密集排列与静态按和弦情境；确认适用条件和署名后才写入公开字段。未复核时维持无指法版本，P148 finger-position PDF不记完成。 | 否 | 否；保持范围声明/功能关闭 |
| G-CATALOG | P148.all/full, P154.complete_minor_collection, P158.complete_major_collection | 维持9命名和弦范围说明；后续依原任务补齐已有中心任务的数据集合，不生成规划外URL。 | 否 | 否；保持范围声明/功能关闭 |
| G-TYPES | P168, P170, P171 | 分别准备power、明确类别的7th、jazz语境数据和解释；本批不显示空类型按钮。 | 否 | 否；保持范围声明/功能关闭 |

[已核实] 本批数据核对没有发现仍需用户裁决的专业事实冲突，也没有必须取得某份第三方图片/音频许可才能继续的阻塞。指法功能保持关闭；现有访问失败已有替代依据。

## 9. 完成检查与后续使用

[已核实] 以下检查已通过；详细结果在JSON `validation`。

- 17页/78组/127URL与原关键词映射保持。
- 69条本批query关系完整且无新词。
- 11个voicing独立预期音名/MIDI/音程/三度拼写检查。
- 音图/播放事件/打印数据逐项一致。
- B/Cb同键不同拼写与跨音区正确。
- 筛选样例包括无结果状态。
- 13份素材存在，PDF共4页已渲染目视检查。
- 输入文件SHA256不变。

[已核实] 未执行：真实音频试听、浏览器播放/停止/移动端验收、动态筛选打印、钢琴教师签核、网站部署。

**今天可以做：** 把 `content-pack.md`、`page-content.json`及`assets`一并交给设计对话，只排这两页本批范围。

**怎么做：** 按稳定block_id使用现成英文稿；图表与交互只取已核对voicing；按钮接入前按状态说明处理；公开指法不显示，未发布链接不显示。

**完成标准：** 设计稿每段文字、每个结果和每张图都能回指文件中的真实内容与数据；没有新增关键词/URL、虚构按钮能力或把其余15页标成已完成。

**后续范围：** 继续原17页材料任务和中心页未完成源组；之后再按原91页后做、19页暂停状态推进。先做样板没有删除任何页面。

