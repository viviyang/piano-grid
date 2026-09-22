# 唯一实施方案：先修事实与测量，再验证九页连续任务

状态：[INFERRED] 以下均为待实施方案，不是已经完成的产品行为。代码基线与检查限制见00；优先级裁决见06。本轮没有实施任何产品代码。

## 交接与范围

实施者先重新 fetch main，记录 SHA/dirty，若与 `c1a017a533289616b84e354c97f1345114f809e2` 不同，只对本方案涉及点做差异复核。先读 `docs/design/COMPONENT-RULES.md`；本审计远端快照缺该文件，已保存用户原工作区2026-09-21规则为 evidence/COMPONENT-RULES.workspace.md，仅作可追溯交接输入，不覆盖维护源。再读上级page-rules、TDH-RULES。所有UI选型按实际现有组件；不安装依赖、不另造音乐引擎/键盘/主题，不改URL/索引/品牌。

试点明确白名单：`/chords`、`/chords/finder`、`/chords/c-major`、`/chords/a-minor`、`/chords/c-maj7`、`/chords/c-diminished`、`/chords/c-add9`、`/scales/c-major`、`/keyboard-notes`。五个和弦分别覆盖major/minor/seventh/diminished/add。C major当前独立reference/practice作为已有行为对照，不重做。

受控依赖：`/chords/by-key`、`/chord-progressions`、`/chords/extended`只允许接收试点传入的既有对象/上下文并回归；`/guide/piano-chords`只修一个已证实锚点。不把这些依赖变成全页改版。公共template的新增呈现必须按试点allowlist启用，不能无意覆盖145页。

## P0-0 可复现验证基线

| 必填项 | 执行合同 |
|---|---|
| Problem | 当前历史检查既有环境失败，又有真实hash漂移，不能以一次build替代完整验收。 |
| Evidence | [REPO_VERIFIED] integration-data 126/26；23项CRLF、3项Git blob变化；[UNRESOLVED] 浏览器未跑通。 |
| Current implementation | 多个scripts和不同localhost默认端口；原始报告在checks。 |
| Exact proposed change | 固定SHA、锁文件、实际端口与服务器启动命令；保存原始结果。逐项对照3个改变文件的提交及授权，修测试的字节读取可移植性须保留Git blob验证。不得把全部expected hashes改成当前值掩盖来源变更。 |
| Files/components likely affected | scripts/check-integration-data.mjs及对应浏览器检查的启动说明；checks的新增本轮目录；不改受保护内容包。 |
| Reuse plan | 复用现有npm check/build、数据/音乐合同和现有浏览器测试。 |
| Data/model impact | 无音乐模型变更。 |
| SEO impact | 206路由基线冻结；不使用旧17/197数量替代。 |
| UX impact | 无呈现变化；建立可比较截图/交互基线。 |
| Analytics | 保存当前event合同，不发送测试到生产报表；测试传输用本地stub或明确debug。 |
| Music QA | 对照3个变更文件是否涉及音符/来源，未判定前不视为正确。 |
| Automated tests | npm run check/build；integration-data；scale contract；正确服务端口的相关browser脚本。 |
| Manual acceptance | 浏览器可用后，先留9页桌面/移动端截图与关键交互基线。 |
| Risk | 将历史失败“更新为通过”；平台换行导致假失败。 |
| Dependencies | 可运行浏览器；变更历史与原受保护hash依据。 |
| Completion criteria | 每个旧失败有可追溯解释与处理；必要门禁实际通过或有明确具名认可的适用例外，不能默默跳过。 |

## P0-1 两个已证实的局部问题

| 必填项 | 执行合同 |
|---|---|
| Problem | Finder帮助要求键入带octave音名，但界面实际是pitch-class按钮；guide链接不存在锚点。 |
| Evidence | [REPO_VERIFIED][LIVE_VERIFIED] Finder说明与界面；[REPO_VERIFIED] `/chords#find-a-chord`无目标，见build-audit-summary。 |
| Current implementation | support.modules内容经support-content读取；FinderExperience已有完整/省略voicing候选和bass约束；guide有旧href。 |
| Exact proposed change | 在运行时可维护的展示adapter纠正输入说明，明确当前不保留octave/重复音；保持原始只读内容包不动。guide该href改为既有`/chords/finder`。不添加文本解析器或麦克风。 |
| Files/components likely affected | src/lib/support-content.ts、src/components/support/support-pages.tsx；guide同属SupportRoute，从此adapter追踪实际链接输出，避免改只读internal-links.json。 |
| Reuse plan | 保留Finder键盘、候选算法及现有导航组件。 |
| Data/model impact | 无；不改433对象。 |
| SEO impact | 只修帮助与既有链接，无TDH/URL/索引变化。 |
| UX impact | 操作提示与可见控件一致。 |
| Analytics | P0-2工具事件；本项不能把点击提升当完成证据。 |
| Music QA | 准确区分pitch class、octave、root/bass；不得称Finder识别任意voicing。 |
| Automated tests | 渲染后不存在旧误导语；目标链接可解析；音乐合同和build。 |
| Manual acceptance | 新用户按帮助完成C/E/G选择、bass E、清空；guide跳入正确Finder。 |
| Risk | 修改只读资料；替换过宽影响其他页面。 |
| Dependencies | P0-0基线；核对运行时文案来源。 |
| Completion criteria | 两处具体问题消失；protected原文hash不变，其他路由呈现无意外改变。 |

## P0-2 兼容的行为测量合同

| 必填项 | 执行合同 |
|---|---|
| Problem | 独立Finder没有emit调用，跨域“完成”口径不同，缺统一有效结果分母。 |
| Evidence | [REPO_VERIFIED] finder-experience源码；analytics/chord-events/scale-events/keyboard-events已有transport与事件。 |
| Current implementation | GA4+Clarity已接入；现有事件有release与字段allowlist。 |
| Exact proposed change | 按下表建立概念到现有事件的映射；只补缺失事件和必要字段。Finder用户首次选择发tool_start，稳定结果发tool_result/no_match，选择候选发result_selected；结果展示去重。已有成功事件复用，禁止同动作新旧名称双发计数。 |
| Files/components likely affected | src/lib/analytics.ts、chord-events.ts、scale-events.ts、keyboard-events.ts；FinderExperience及9页调用点；新增测量合同文档/测试。 |
| Reuse plan | 现有sendAnalyticsEvent和本地CustomEvent；不新装GA、GTM或热图SDK。 |
| Data/model impact | 加行为字段与版本，无新音乐事实；对象ID引用canonical源。 |
| SEO impact | 无；事件结果不能声称排名因果。 |
| UX impact | 不阻断交互；事件失败不影响音频/练习。 |
| Analytics | 实施下方字典、去重和分母；第一方后台验证另列，当前UNKNOWN。 |
| Music QA | object/context/form/hand字段来自当前实际选择；禁止把播放结束当演奏成功。 |
| Automated tests | stub transport断言1动作1事件、rerender不重复、无输入不发no_match、allowlist过滤、transport禁用也不抛错。 |
| Manual acceptance | 9页各走一条任务，观察本地event和网络；有账户后DebugView逐项确认，不以脚本加载当收数。 |
| Risk | 双发、事件基数爆炸、采样/同意机制导致分母偏差。 |
| Dependencies | P0-0；明确字段schema与会话观察单位。账户不是本地实施前提，是外部测量验收前提。 |
| Completion criteria | 本地事件契约通过；报表有口径说明。无账户时标“传输已测/后台未验”，不能标全量analytics PASS。 |

### 事件字典与判读

以下均为[INFERRED]目标口径；“复用”只表示相应源码事件存在，不表示本次线上收数已验证。

| 概念 | 复用/补齐 | 触发与分母 |
|---|---|---|
| result_seen | 复用scale_reference_viewed；其他试点补可见结果记录 | 当前对象答案进入可见区后每view/object一次；页面载入≠看到结果。分母为已测量有效结果曝光，不是所有访客。 |
| audio_play | chord_audio_start / scale_playback_started等 | 音频实际成功启动，失败另记；分母result_seen。不能只记按钮intent。 |
| tool_start | 各工具首次有效用户输入，Finder补齐 | 每工具view一次；自动默认值不算start。 |
| tool_result | Finder稳定输入结果；其他域结果事件映射 | distinct输入状态稳定后一次，带match_count/status；输入键每次闪烁不当多个完成。 |
| tool_no_match | 复用finder_no_match定义并接独立Finder | ≥2pitch classes且查询稳定后无受支持匹配；空/单音另标incomplete。 |
| next_step_click | scale_next_task_opened等；其他域补 | 用户点可用href，source/target/task/relation；分母result_seen，不能解释成下一页任务完成。 |
| practice_start | practice_started / scale_practice_started及keyboard域映射 | 显式开始一个attempt；重复render去重。 |
| practice_complete | practice_completed及域对应结果 | outcome区分exercise_success、自报self_reported、退出；playback_finished单列，不能计练习完成。显示过答案记assisted。 |
| print_reference | print_opened / scale_print_requested | 打开打印流程，不声称纸张印出；带asset/paper/current selection。 |
| download_asset | reference_download_clicked / scale_resource_requested | 资源点击，不声称下载已保存。 |
| share | 复用现有share控件回调；缺项补 | 区分dialog_open、copy_success、native_success/cancel；只成功动作入share完成数。 |
| comparison_select | 复用比较工具域事件；Finder候选选择补 | candidate/object/match_kind，切换不等于判定唯一正确和弦。 |

公共字段沿用现有page_path/template/object_id/task_id/release_version；需要时增context_id、relation、target、mode、outcome、assisted。只发固定枚举或已知ID，不上传任意输入文本/个人资料；高基数字段不自动注册为GA维度。一次source→target行为只选一个计数事件，通过映射报表汇总，不再发别名事件。

先记录相同release的技术基线，再观察约2–4周或足够有效样本（[INFERRED]操作建议，不是统计把握度承诺）。有GSC时比较相同query/page/device/时间窗；有GA4时按模板分析next-step率、practice启动及明确口径的完成率。没有对照与季节性处理，不把变化归因于本功能。研究的+15%/+20%不是验收门槛。

## P1-1 九页任务衔接

| 必填项 | 执行合同 |
|---|---|
| Problem | 页面已有学习能力，但对象、上下文与下一动作的关系没有一致的小范围合同。 |
| Evidence | [REPO_VERIFIED] chord-learning-next、C major独立模式、scale tracked links、by-key、progression已在；[INFERRED]试点统一衔接值得验证，收益未证实。 |
| Current implementation | 多个detail特例与通用template；各页links/practice不同。 |
| Exact proposed change | 每试点只选择1个主下一动作+最多2个辅助已有目的地。用户状态保留object/context/mode，展示原因。C-major→C-major key→既有progression是第一个完整上下文示例；其他和弦优先当前页练习/候选解释，不强行给唯一key。Scale C-major接练习和同调triads；keyboard页接当前音定位练习及明确相关对象。 |
| Files/components likely affected | chord-learning-next.ts、chord-detail-model.ts（仅adapter引用）；chords/detail-page.tsx、c-major-experience.tsx、center-experience.tsx；a-minor现有页面；scales/detail-experience.tsx；keyboard-notes/hub-reference.tsx及现有practice。实际调用关系以实施时源码复核为准。 |
| Reuse plan | 已有链接/练习/keyboard/音频/UI button与tokens；不强制所有页面塞同一大卡片。 |
| Data/model impact | 只新增关系引用 `{sourceObjectId, relation, targetPath, targetObjectId?, contextId?, taskId}`；音符、公式、指法不复制入关系表。 |
| SEO impact | 普通可抓取href指向已有canonical；hash/query为交互状态，不增sitemap项；保留H1/TDH职责。 |
| UX impact | Answer→Verify→Understand→Act→Continue能连续完成；保留reference可独立查看，练习不强迫进入。 |
| Analytics | next_step_click、result_seen、practice_start/complete；source/target/context可串口径，无账户收益未知。 |
| Music QA | 同一和弦可属于多个调；relative/parallel准确；C diminished不默认当C major内和弦；add9不写成含七音的9。 |
| Automated tests | 9项allowlist、所有target存在、引用ID可解析、非pilot至少各template1页无新区域；音乐合同/SSR/build。 |
| Manual acceptance | 从搜索式深链直接进入各试点，完成听/看/练和一次下一步；移动端不额外滚动大段重复参考。 |
| Risk | 公共模板外溢、CTA过量、把context写成唯一答案。 |
| Dependencies | P0-1/2完成；P1-2接收器先于跨状态链接开放。 |
| Completion criteria | 9页代表链条逐项记录PASS；无pilot外改版、无新URL，视觉与人工门禁见08。 |

## P1-2 Finder接收状态与歧义

| 必填项 | 执行合同 |
|---|---|
| Problem | 候选有真实目的地，但部分hash只滚动，目标explorer仍为默认对象；bass选择未连续保留。 |
| Evidence | [REPO_VERIFIED] completion-category-experience初始defaultObjectId；progression初始defaultExample；by-key已有hash读取可复用；不是所有链接失效。 |
| Current implementation | registry destination/detailURL；category有真实ref-id；Finder有exact/supplied分离与bass解释。 |
| Exact proposed change | 为受控接收页解析既有合法object fragment；校验ID后选中同一对象，back/forward恢复，不合法状态回安全默认且提示。试点detail支持bass时才恢复对应已有voicing；不支持则明确“参考声部已重置”，不假装保留音区。保留多候选，不改匹配算法或引入新图数据库。 |
| Files/components likely affected | support/finder-experience.tsx、chords/completion-category-experience.tsx、support/progression-experience.tsx；现有detail状态入口；support-content.ts的destination adapter。 |
| Reuse plan | by-key现有hash解析模式、registry对象和现有voicing选择器。 |
| Data/model impact | 有界URL状态协议；不新增音乐实体；不保留不存在的octave信息。 |
| SEO impact | 同canonical，禁止以每个组合生成URL页面。 |
| UX impact | 到达对象与所选候选一致；返回后上下文可理解。 |
| Analytics | finder_result_selected + target result_seen；无匹配/省略音/多个候选分开。 |
| Music QA | C-E-G/A-C-E等常规集合、C-E-G-A多解释、bass约束、增减和弦等音、supplied omissions；pitch-class equality不等于相同voicing。 |
| Automated tests | 合法/非法fragment、refresh/back、对象相等、Bass可用性、键盘及audio映射一致；保持433 registry断言。 |
| Manual acceptance | 从Finder选非默认extended对象，目标控件与标题/音频/打印同对象；detail bass不受支持时明确说明；返回不会误称已练习。 |
| Risk | SSR hydration不一致、滚动覆盖状态、任意ID注入、音区错误。 |
| Dependencies | P0测量；P1-1关系引用；现有目标支持情况复核。 |
| Completion criteria | 本次受控目的地的恢复合同通过；未覆盖的家族不宣称已修，保持原安全入口。 |

## P1-3 来源链与一个现有打印资产

| 必填项 | 执行合同 |
|---|---|
| Problem | legacy core registry的sourceIDs空，与详情来源层未打通；资产存在但审阅/分发效果未知。 |
| Evidence | [REPO_VERIFIED] completion registry adapter与来源台账；scale atlas/print已存在；teacherReviewed false不能升级为背书。 |
| Current implementation | 多个来源包、指法verificationStatus、现有HTML print/PDF。 |
| Exact proposed change | 只为五个pilot和弦+C-major scale建立ID→现有出处的可追溯映射；无法核实保持未审状态。选择现有C-major scale reference，核对HTML/打印/现有A4及Letter资产一致性，添加必要的来源/版本说明到可维护输出层。原始/锁定资产不可擅自覆盖，确需重生成则另提具体授权。 |
| Files/components likely affected | chord-completion-content.ts的source adapter、scale-content/completion-content已有源映射、现有reference/print呈现；不重写只读ledger。 |
| Reuse plan | 来源台账、现有生成脚本和打印样式；不新建竞争性音乐数据库。 |
| Data/model impact | 增来源引用/适用范围，不发明teacher approval。 |
| SEO impact | 提高可核查性是目标，不承诺反链增长；不建新resource URL。 |
| UX impact | 用户知道指法适用手/方向/音区及资料限制。 |
| Analytics | print_reference/download_asset/share按P0口径。 |
| Music QA | HTML与打印音名/音区/指法相等；octave/hand/direction明确；具名专业审阅仍须真人。 |
| Automated tests | source ID能解析、缺来源不会显示verified；print snapshot数据等价；PDF提取/视觉检查按现有工具。 |
| Manual acceptance | A4/Letter打印预览无裁切，真实纸上打印/读屏/PDF无障碍决定具名记录。 |
| Risk | 错误专业背书、过期指法、覆盖只读资产。 |
| Dependencies | P0-0来源hash问题解决；原资产范围与权限复核。 |
| Completion criteria | 限定pilot每项来源或UNKNOWN可追溯；一份既有reference跨格式一致；未完人工项单列不代签。 |

## P2 与 DEFER 的进入条件

| 必填项 | P2-1 分批rollout | P2-2 Practice Queue探索 | DEFER项目 |
|---|---|---|---|
| Problem | 未知pilot是否可普适 | 未知是否需要跨对象复练 | 新comparison、embed、账户、MIDI/麦克风、商业化和批量URL缺必要证据 |
| Evidence | [UNRESOLVED]无行为效果 | [UNRESOLVED]无返回需求证据 | [UNRESOLVED]需求/来源/权限不齐 |
| Current implementation | 145详情/多模板 | 已有单页practice | 部分comparison/print已在 |
| Exact proposed change | 先15–25个现有URL分层扩展；逐批验收 | 先任务访谈/行为观察，再局部本地queue原型 | 本阶段不实施；新授权+Page Gate后重新出具体方案 |
| Files/components likely affected | 经验证的关系adapter及allowlist | 现有practice入口；届时确定本地存储adapter | 不指定假想实现文件 |
| Reuse plan | pilot组件和数据 | 现有practice，禁止先建账户服务 | 继续用现有能力 |
| Data/model impact | 引用关系扩充 | 保存object/task ID及版本，不复制音符 | 当前无 |
| SEO impact | 不增URL | interactive state only | 新URL必须六项Gate |
| UX impact | 连续性扩展 | 验证复练是否更便利 | 当前无 |
| Analytics | 分模板曝光/下一步/练习 | save/start/return明确分母 | 先定义需求证据 |
| Music QA | 复杂拼写/家族抽检+全量合同 | 过期对象清理、任务难度适用性 | 未来范围另审 |
| Automated tests | 全量206和分批回归 | migration/empty/invalid/local清除 | 当前不写占位实现测试 |
| Manual acceptance | 每模板首例+移动/读屏 | 无账号也可清除和恢复 | 无上线验收可宣称 |
| Risk | 未证实收益就复制 | 持久化复杂性先于需求 | 范围膨胀/支付/版权/公开范围变化 |
| Dependencies | P1通过+第一方数据或明确产品研究支持 | 返回使用证据、明确授权 | 独立范围/成本/授权决定 |
| Completion criteria | 一批验收后再决定下一批 | 先出需求验证结论，未成立则停止 | 保持未实施；不伪造完成时间 |

## 估算与启动顺序

[INFERRED] 按一名熟悉该仓库的实施者估计：P0-0 0.5–1.5工作日，P0-1 0.5日，P0-2 1–2日；P1-1/2合计3–5日，P1-3 1–2日，跨设备/回归1–2日。P0约2–4日，P1约5–9日。依据是既有data/audio/practice/print可复用；不是实测工时或上线承诺，不含等候账户、具名审阅和浏览器环境恢复。若来源hash或状态接收证明复杂，先重估受影响项，不扩大范围。

执行顺序唯一：P0-0 → P0-1 → P0-2 → P1-2接收合同 → P1-1九页呈现 → P1-3来源/资产 → 08逐项验收 → 等第一方观察再决定P2。本文件授权含义仅是可交接规划；后续实施会话由用户启动。上线、覆盖资产和新增公开范围不包含在本轮授权。
