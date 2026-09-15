# 内容供给与版权门槛

[推断] 默认走“已清权基础作品＋PianoGrid新编配”，保持现代出版版外链；申请现代版许可是可选并行路径，不是唯一等待项。不能用模型凭记忆重写现代谱来绕过授权。

## 三首命名曲：两条路径分别建档

| 作品 | 已有外部版 | 本站版下一项实际交付 | 阻塞解除材料 |
|---|---|---|---|
| Hot Cross Buns | Hoffman Lesson1 | 可追溯的原旋律谱源；或该现代版网站使用书面许可 | 不用仅有歌词的儿歌书证明音乐；明确小节/音高/节奏、适用地域，再新编配 |
| Twinkle | Aron Bernstein Early Elementary | 验历史曲调身份后新编；或出版社完整资产许可 | LOC同名1879资料只是线索，先检查旋律是否是目标传统曲调；不是见标题就复制 |
| Ode to Joy | Joseph Hoffman D major | 原作品旋律出处/合法历史谱＋新初级编配；或该现代版许可 | 不能把SATB hymn当初级钢琴编配；新C大调版必须另立ID，与D大调版并存 |

已有线索：S18的LOC谱、S19儿歌书，以及历史`MUTOPIA-528-20260915`。S18馆方的收藏权利声明有价值，但没有完成本项目的旋律和地域核对；S19未证明有乐谱；Mutopia项原为SATB且来源笼统。**都不在本包作为已发布素材。**

## 内容生产流水线

| 环节 | 必须产生的实际数据 | 不通过时 |
|---|---|---|
| 1 作品身份 | 标题、异名、作者身份、作品编号/传统曲调出处；歌词与音乐分开 | 作品保留候选，不合并同名 |
| 2 源文件取证 | 原谱出版/扫描出处、许可原文、页/小节定位、取得日期和hash | 没有文件/可靠内容不填音符 |
| 3 地域与用途 | 每层权利、允许动作、商业用途、地区、期限、署名/改编义务 | 不把美国判断扩成全球；需要可部署地域限制而未支持则不公开 |
| 4 编配设计 | 难度目标、调、拍、手别、实际音域、休止/节奏、是否整曲或节选 | 只是设计目标，不能当谱面事实 |
| 5 独立音乐录入 | 按小节录入标准音高、MIDI、时值、手/声部、连音/反复、来源定位 | 第二人/独立检查方法比较；不得用生成器复述证明正确 |
| 6 资产生产 | 同版MusicXML、清晰SVG、A4/Letter PDF、精确events、合成音频/允许录音、文字谱 | 任何缺件都如实保留，不建零字节资产 |
| 7 内容生成 | 选曲原因、前置能力、第一手/第一段、步骤、自检、适用能力、取谱 | 从已核谱产生，不按歌名猜 |
| 8 双层验收 | 独立格式/音高/节奏/资产一致性＋人工读谱/听/设备/打印 | asset_state=staging，不放public |
| 9 发布登记 | 唯一ID、修订、权利evidence引用、canonical/分享回站、公开状态 | 没有发布授权只交接，不部署 |

## 版权分类按不同层存，不是互斥标签

`work.rights_classification=public_domain_work`只回答基础作品，不推导arrangement/score/audio许可。
`arrangement.origin=pianogrid_original`说明编配来源，不说明基础作品已清权。
`resource.site_use=licensed_resource`须有对应许可文件与资产/动作覆盖。
`resource.site_use=external_reference`只提供编辑说明与外链，不授予本站复制谱和录音。
`unknown/blocked`记录具体缺口，不把unknown永远写成违法，也不当allow。

典型有效组合：公版作品＋现代出版社编配＋外部参考；公版作品＋PianoGrid原创编配＋本站免费资源；受保护作品＋经许可编配＋仅某地区可播放；原创AI练习＋已记录输出/字体来源＋独立审核待完成。

## 权利记录最小字段

`rights_id, subject_type, subject_id, layer, licensor, evidence_url_or_document, evidence_hash, quoted_clause_or_locator, checked_at, reviewer, permitted_actions, commercial_use, territories, term, attribution, restrictions, downstream_print_scope, status`。

动作至少分开：metadata/link、display_score、download_score、print、play_audio、download_audio、adapt、commercial、redistribute_to_students。打印一个人的份数、教师工作室复制、公开互联网下载是不同动作，不能互相推导。[S06]

`runtime_grants`目前为空。任何通过布尔值直接开放第三方素材的“修复”都拒绝。许可到期/撤回后资源下架、停止播放/下载、清缓存并保留明确状态；不能silent fallback到另一份谱。已被分发的副本问题不能只靠前端隐藏解决。

## 原创练习与AI输出

[已核实] 现有3个练习由上一版生成，24文件实存；不是本轮新增，也不是3首知名曲。来源脚本、无采样合成方式、字体说明保留。使用条款关于Output的分配不能保证独占、无相似作品或第三方清权。[S16]

本轮不卖这批免费文件，不承诺可售的独占教师许可。后续付费包应有新的人类编辑/编排、审核、教学说明和真实许可范围，不能倒推已有AI片段在所有法域都拥有相同版权。

## 所有“可发布”的先决条件

1. 有实际文件并且hash一致。
2. 每个动作的权利依据和地域覆盖完成，商业站展示也在评估范围内。
3. 音乐内容与score/audio/steps吻合；独立验收有记录。
4. UI/失败状态/设备/打印满足已承诺能力。
5. 有本次具体发布授权。

法律顾问/权利人的实质判断无法用代码生成。Codex完成技术与材料整理，不在缺证据时自己签发许可。
