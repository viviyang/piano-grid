# 统一数据契约与最小迁移

[推断｜实施规格] 本文件是接口约束，不要求把当前项目迁移到新数据库，也不要求文件路径与这里一致。规范候选输入为 `content-data/catalog.v2.json`；旧 registry、页内 resources 和 prior exercise 清单只作为迁移来源。UI只能从一套规范化注册表读取。

## 1. 四个实体，三个辅助记录

| 实体 | 必要字段 | 所属事实 |
|---|---|---|
| Work | work_id、title、kind、identity_review、rights_by_territory | 哪个作品；同名不同曲不自动合并；词/曲权利必要时拆开 |
| Arrangement | arrangement_id、work_id、edition、origin、edition_revision、music、difficulty、segments、resource_ids | 具体编配、调/拍、左右手、音域/节奏、技能、学习步骤 |
| Resource | resource_id、work_id、arrangement_id、location、provider、access、asset_ids | 在本站还是提供方；免费/付费/表单/账号；此版本如何获得 |
| Asset | asset_id、arrangement_id、resource_id、path、format、sha256、rights_record_id、validation、release_state | 精确文件；SVG/PDF/XML/MIDI/events/WAV分别核验 |
| Source | source_id、url/文件定位、checked_at、支持字段、方法/限制 | 证据本身，不是权利批准 |
| Rights evidence / grant | 分层来源、动作、地域、期限、资产hash、编配revision、审批记录 | 证据与本站实际被授予的权利分开；不由前端/URL传入授权 |
| Relation | arrangement_id、type、target、evidence_locator、availability | 此版本为什么需要/可参考这个note/chord/scale |

`score_asset_id`指本站预览主谱（本包是SVG），`audio_asset_id`指匹配示范WAV；其他PDF/事件等资产通过Resource枚举。同作品不同编配**不能共用一个arrangement_id**，同编配改音高/节奏须提升revision并重审所有关联资产。

当前外部资源的这两个本地asset字段为null，不以网页截图或提供方音轨链接代填。外部预览用provider link描述；真正取得embed许可后才能建单独licensed资源。

## 2. 未知不等于没有

- `music.chord_inventory: null`：尚未核实；`[]`＋`checked_no_notated_chords`：本版已检查没有记谱和弦。两者不可互换。
- `hands: ['right','left']`不等于双手同时。使用`hand_mode: alternating | simultaneous | single_hand | unknown`。
- `difficulty.publisher_label`保留出版社原词；`editorial_band/basis`只作本站具体技能建议；teacher_review独立。
- `fingering: null`不满足with finger numbers筛选；起始手位数字、部分指法与逐音指法分开。
- key可已知而音符集合未知；不能按key生成required_chords。
- 已核格式、标题、来源存在，不证明许可或演奏难度已审核。

## 3. 权利分类必须正交

| 层 | 示例 |
|---|---|
| 基础作品 | public_domain_work / licensed / pianogrid_original / unknown，带地域证据 |
| 编配来源 | pianogrid_original_arrangement / publisher_arrangement / licensed_arrangement / unknown |
| 获取位置 | local / external_reference |
| 允许动作 | display / download / print / play / adapt / sublicense；商业场景另判 |
| 当前状态 | documented / allowed / blocked / expired / withdrawn |

本包`runtime_grants=[]`。旧rights证据中`requested_site_actions=true`仅代表请求意图，**不是授权**。`contracts/gates.mjs`不读取这些布尔值来放行。

许可审核通过后，实施者使用真实审批记录生成grant。必须覆盖作品、编配、刻写、录音/采样和字体等适用层；不适用项说明原因。`WORLDWIDE`仅表示真实获得的全球覆盖证据，不能因美国公版就填。若公共静态CDN全球可取，部署范围应按全球评估，不能把访问者US地区参数当作内容分发限制。

示例模块中的grant是**经过人工资料审核的服务器构建输入**；它验证记录完整性和应用一致性，不会自动判定法律结论。禁止把测试fixture或用户query参数变成正式批准。许可撤回/到期时除关按钮，还移除对应静态/CDN资产。

## 4. 从现有flat external模型迁移，不重写全站

1. 在clean production tree定位`SongResource`、`toResource`、`readAuthorizedPage`、页面block校验。快照路径仅线索。
2. 每个原资源出现位置映射到稳定arrangement_id，保留`legacy_ids`、原source_ids、页内顺序、filter sections及全部265次引用。冲突进`conflicts`，不可静默用最后值覆盖。
3. 保留现有external-only安全校验作为external分支；增加local经过许可/资产/质量门槛的分支，而非删除redistribution校验。
4. 对`first_check`与`prerequisites_or_first_check`：若前者非空用前者；否则显式回退后者；两者非空且不同则记录冲突，使用原已批准文案，不凭短字段覆盖长字段。
5. 卡片支持一个可理解的start摘要，学习详情从共享LearningCard读取。同arrangement的Sheet页不复制步骤正文，只给摘要和回链。
6. 将“six”“Nine specific versions”改成派生数量，但保留“50来自某合集，不是50独立测试曲”的含义；catalogue track与featured计数分开。
7. 增补block使用显式本页契约；保留旧must-have blocks/source_groups，不通过关闭验证让空页面PASS。
8. 注册表留在当前合适data模块；不建立第二个音乐音频引擎，不升级框架或组件库。

## 5. 获取与能力矩阵

| 资源 | 本站预览/演奏 | 获取标签 | 允许的学习入口 |
|---|---|---|---|
| external_free（已核） | 不自动启用 | Free at provider；账号/表单另写 | 出版方版本、教程；一般热身另标 |
| external_paid（已核） | 不自动启用 | Paid publisher edition / included with named membership | 提供方链接；不显示本站Download |
| external_unknown | 禁用假能力 | Check access on the provider’s page | 可保留合适来源描述；不推断免费 |
| local_free_core＋未过gate | 不公开资产 | 不出现假的获取按钮 | 可在本地staging验收；不把计划当能力 |
| local＋完整gate | 按具体asset action启用 | Free on PianoGrid＋确切格式 | 同编配/同revision的播放、片段与打印 |

`capabilities`从资源、实际文件、grant、当前部署范围和QA共同计算。下载SVG不能自动证明可播放WAV。测试需覆盖“只有display许可不能print”“只有一个版本许可不能给另一个版本用”。

## 6. 音频与共享状态

复用实际生产`ReferenceAudio`或已交接的等价音频服务。一个transport owner控制歌曲、音阶/键盘竞争；不要把hook的play单音函数假设为已支持sequence。

首批本地事件播放支持：Play / Stop、音量0–100、50/75/100速度、all或两段固定小节。改变速度/片段先stop/reset，不在播放中漂移到另一版本。默认不循环；连续循环不是本批必要功能。停止、切路由、切版本、beforeprint、隐藏、卸载均取消声音与计时器。

事件节奏使用拍数，时间=`beats * 60 / effective_bpm`。优先事件调度保持音高；没有稳定支持时仅开放正常速度的WAV试听，**隐藏未验速度/片段能力并报未完成**，不得用HTML playbackRate改变音高却声称同版练习。片段事件相对起点重新归零；WAV有首尾静音，不按文件长度均分小节。

## 7. Share与后续Practice接口

`#pg-arr=<id>&segment=bars-1-2&speed=75`用于已核本地片段；保留旧PDF中的`#pg-ex=step-and-hold`等别名。外部版本只允许`all/100`的选版定位，不代表本站播放。未知/撤回ID显示问题，不回退成另一编配。

参数白名单、长度、重复key、速度和片段均验证。不能携带任意URL、asset路径或授权字段。canonical不带fragment；分享不触发自动播放。实际初始页面须SSR可读，fragment只恢复交互状态。

Future `PracticeTarget = {work_id, arrangement_id, edition_revision, segment_id}`。只保留类型和事件关联，不做账户、服务端进度、MIDI识别、teacher assignment、entitlement或付款。练习完成是自报，不是系统检测。

## 8. 本包中的代码边界

`contracts/catalog.types.ts`为可映射的类型契约；`contracts/gates.mjs`为无依赖、可运行的门槛/分享参考；`qa/gates.test.mjs`为正反例。它们不是已接入Next.js的生产代码，不要求同时保留旧`tools/contracts.mjs`作为运行时。旧脚本仅历史对照。

完整C/D内容台账、版本候选、已完成英语卡和24文件都是真实输入。实际工程结果只能由基于Keyboard accepted baseline的新Songs clean worktree实施者记录；`1e3fdec`仅保留为production祖先证据。
