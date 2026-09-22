# BLOCKED，scope=P0

[已核实] P0-0、P0-1、P0-2 已实施；最终不能标记 READY_FOR_MANUAL_ACCEPTANCE，因为相关生产浏览器回归发现基线已有的音阶练习音画同步失败。没有进入 P1，没有提交、推送、合并或部署。

## 当前阻塞与最小下一步

[已核实] `/scales/c-major` 点击 **Start practice** 后，音频状态已经为 `Playing scale…`，练习仍是 `preparing`。同一问题在未修改的 `.next-p0-baseline`（4348）和候选 `.next-p0-final`（4349）均复现；Stop and reset 两者均通过。`/arpeggios` 的既有共用模板测试同样失败。

[已核实] `src/components/scales/use-scale-audio.ts:96` 等待 `ReferenceAudio.play()`，但 `src/lib/a-minor-audio.ts` 当前在整段播放结束后才 resolve；`scale-learning.tsx:197` 等待该调用后才启动可视 count-in。证据：`browser-existing-audio.json`、`browser-scale-baseline.json` 以及对应原始 receipt。三个文件本轮没有 diff。

[推断] 音频启动与播放完成的调用合同不一致，导致视觉指引滞后；依据是上述实际状态及 await 调用链。最小后续工作是明确授权修复这个 scale 音频调用合同，并重新验证 count-in、逐音同步、暂停/停止、隐藏页面和自报完成。当前“不得改音乐引擎”边界下未擅自实施，也未将此必需检查降为通过。明确接受该已复现问题作为本轮例外同样需要用户决定；现无此例外。

## 基线、资料和范围

[已核实] 工作区 `C:/Users/Admin/Documents/viviyang_github/piano-main-product-audit`；分支 `codex/product-system-p0`；HEAD 与阶段开始/交付前 fetch 的 origin/main 均为 `d15c0142cc6d00b01d060ba17092000a5bf060ca`。工作树保留未提交实现。没有操作原 piano/codex/chords-b1 工作区的文件或分支。

执行文件实际位于仓库根目录 `10_P0_REVIEW_AND_EXECUTION.md`，不是最初指定的 docs 子目录；已按其顺序读取审计和原始 evidence。组件规则使用已有 `docs/product-system-audit-2026-09-22/evidence/COMPONENT-RULES.workspace.md` 快照（2026-09-21），不冒充 main 已提交规则。审计目录 51 份材料最终 hash 比对变化数：0。旧审计 c1a 和用户曾给定的 SHA 保留历史，实施基线遵循后续“最新 main”授权。

最新 main 没有解决这三项 P0 任务，未虚列 ALREADY_FIXED。现有 analytics、Scale/keyboard 域事件与音乐算法复用，不重复实现。新增事件仅九页 allowlist；Guide 只修已定位链接。无新增 URL、依赖、索引策略、TDH、导航、主题、音符或 PDF 改动。

## 实现与实际验证分列

| 项目 | 实现状态 | 验证状态与证据（均在 checks/product-system-p0-2026-09-22） |
|---|---|---|
| P0-0 23项换行差异 | 明确23路径仅CRLF→LF，仍读工作树字节；不trim、不重排JSON | 4项测试PASS，23文件逐一改实质字符均拒绝；`final/hash.log` |
| P0-0 3项来源真实变化 | 用户批准后仅维护精确amendments，保留旧expected | 数据152 PASS /0 FAIL；`final/data-validation.json`、`hash-disposition-final.json` |
| P0-1 Finder | 发布adapter帮助改为选音名、可选bass，说明不能恢复八度/重复音 | 实际渲染与CEG/bass E/清空/单音/无匹配通过；`browser-p0-functional.json`、`browser-help-read-receipt.json` |
| P0-1 Guide | 旧/chords#find-a-chord改/chords/finder，锚文本Identify a chord from selected notes | 实际点击进入Finder通过；原上下文是Finish a small practice task中的任务链接，因此明确改锚文本为识别任务，未声称它是评分练习 |
| P0-2 新测量 | 复用transport，九页曝光、Finder、缺失音频/练习/分享等事件 | 5项measurement单测PASS；5项observer生命周期浏览器断言PASS；映射见下表 |
| 九页双视口 | 1440×950、390×950生产浏览器 | 18/18 HTTP200、单H1、无横溢出、结果曝光；无SDK加载；`browser-p0-nine.json` |
| 非试点 | d-major、scales/d-major、keyboard-notes/labeled、by-key、chord-progressions | 五页新事件0；`browser-p0-nine.json` |
| 音频/练习/分享 | 既有行为复用 | C major真实playing事件、失败音频不计成功、分享取消不计成功、揭晓后assisted通过；`browser-p0-interactions.json` |
| 打印 | 原动作前记request | C major请求事件一次；Scale/arpeggio print media可见；不证明纸张打印；`browser-p0-print-screenshot-valid-receipt.json`、`browser-existing-audio.json` |
| 键盘 | 未改练习算法 | 70断言PASS；实际10题完成10 first try/0 help/0 revealed；`final/keyboard-completion/test-results.json`、`browser-keyboard-round.json` |
| Scale既有练习 | 未改引擎或practice | **FAIL**：声音播放时视觉仍preparing；baseline/candidate一致；此项阻塞 |
| 构建与规则 | 生产构建完成；隔离检查输出 | Foundation568/568、TS/CSS、scale合同9/9、build exit0；`final/` |
| 路由与metadata | 无修改 | 207 HTML（含框架页）title/description/canonical/robots/H1零差异；static/dynamic路由集合一致；`final/metadata-route-comparison.json` |
| 第一方后台 | 未操作 | BACKEND_NOT_VERIFIED；本地接收器不证明GA4/Clarity收数 |
| 人工 | 未代验 | 真机、读屏、真人听音、具名音乐审阅、纸张打印仍MANUAL_PENDING |
| P1 | 未实施 | DEFERRED，不计PASS |

本地服务均基于production build；analytics ID为空，浏览器只允许127.0.0.1请求。`externallySent=false`是预期。测试前后九页DOM/交互证据分别为 `browser-baseline.json` 与 `browser-p0-nine.json`，不是全套视觉截图。已实际取得并查看 `screenshots/c-major-desktop.png`；基线截图与Finder移动截图有超时，后者保留失败，不宣称完整截图/真机验收。

## 26项失败逐项处理

[已核实] 原126 PASS/26 FAIL → 换行兼容149 PASS/3 FAIL → 用户批准精确来源维护152 PASS/0 FAIL。原始日志和 `hash-diagnosis-current.json` 保留历史状态；最终状态在 `hash-disposition-final.json`。无新增第27项数据失败。

| # | 完整路径 | 处理 | 最终 |
|---|---|---|---|
| 1 | `docs/content/site-master/A-Scales/batch-page-content.json` | 真实来源变化；精确批准基线 | PASS |
| 2 | `docs/content/site-master/A-Scales/batch-source-ledger.md` | 真实来源变化；精确批准基线 | PASS |
| 3 | `docs/content/site-master/assets/blank-keyboard-13-keys.svg` | 仅CRLF/LF；原expected不变 | PASS |
| 4 | `docs/content/site-master/assets/blank-keyboard-25-keys.svg` | 仅CRLF/LF；原expected不变 | PASS |
| 5 | `docs/content/site-master/assets/Bravura-LICENSE.txt` | 仅CRLF/LF；原expected不变 | PASS |
| 6 | `docs/content/site-master/preserved-chords/assets/a-flat-major--root.svg` | 仅CRLF/LF；原expected不变 | PASS |
| 7 | `docs/content/site-master/preserved-chords/assets/a-major--root.svg` | 仅CRLF/LF；原expected不变 | PASS |
| 8 | `docs/content/site-master/preserved-chords/assets/a-minor--first.svg` | 仅CRLF/LF；原expected不变 | PASS |
| 9 | `docs/content/site-master/preserved-chords/assets/a-minor--root.svg` | 仅CRLF/LF；原expected不变 | PASS |
| 10 | `docs/content/site-master/preserved-chords/assets/a-minor--second.svg` | 仅CRLF/LF；原expected不变 | PASS |
| 11 | `docs/content/site-master/preserved-chords/assets/b-major--root.svg` | 仅CRLF/LF；原expected不变 | PASS |
| 12 | `docs/content/site-master/preserved-chords/assets/c-flat-major--root.svg` | 仅CRLF/LF；原expected不变 | PASS |
| 13 | `docs/content/site-master/preserved-chords/assets/c-major--root.svg` | 仅CRLF/LF；原expected不变 | PASS |
| 14 | `docs/content/site-master/preserved-chords/assets/c-minor--root.svg` | 仅CRLF/LF；原expected不变 | PASS |
| 15 | `docs/content/site-master/preserved-chords/assets/e-major--root.svg` | 仅CRLF/LF；原expected不变 | PASS |
| 16 | `docs/content/site-master/preserved-chords/assets/g-major--root.svg` | 仅CRLF/LF；原expected不变 | PASS |
| 17 | `docs/content/site-master/source-ledger.master.md` | 真实来源变化；精确批准基线 | PASS |
| 18 | `docs/design/piano-final/chords/a-minor/index.html` | 仅CRLF/LF；原expected不变 | PASS |
| 19 | `docs/design/piano-final/index.html` | 仅CRLF/LF；原expected不变 | PASS |
| 20 | `docs/design/piano-final/requirements-dev.txt` | 仅CRLF/LF；原expected不变 | PASS |
| 21 | `docs/design/piano-final/source/app.js` | 仅CRLF/LF；原expected不变 | PASS |
| 22 | `docs/design/piano-final/source/browser_config.py` | 仅CRLF/LF；原expected不变 | PASS |
| 23 | `docs/design/piano-final/source/build.py` | 仅CRLF/LF；原expected不变 | PASS |
| 24 | `docs/design/piano-final/source/render.py` | 仅CRLF/LF；原expected不变 | PASS |
| 25 | `docs/design/piano-final/source/verify.py` | 仅CRLF/LF；原expected不变 | PASS |
| 26 | `docs/design/reference/final-a-minor.html` | 仅CRLF/LF；原expected不变 | PASS |

三项真实变化的引入提交均为 `9937d528d78857056356bc440d22348cc4c19fe2`，完整差异 `source-change-1.diff`、`source-change-2.diff`、`source-change-3.diff`。最终JSON逐项包含 old_expected_hash、baseline_hash、working_tree_hash、lf_hash、提交、diff、affected_scope、approval_reference、disposition。

[已核实] 批准出处：本任务2026-09-22，用户在精确三项AM-MIDI变更确认问题及建议后回复“批准”。批准只用于 `scripts/protected-source-amendments.json` 三项维护；原expected清单和来源正文未改。CMU附录改为MIDI Association规范概览，并收窄supports/locator，不改变音符或MIDI数值。

[已核实] 来源限制保留：新概览页本身不能直接证明C4 MIDI=60；现有pitch_sequences/display_register仍列AM-MIDI，另有AM-MUSICXML及推导说明。hash通过不代表专业来源审阅通过；补映射是P1待决事项。

## 事件合同与分母

# P0 v1 实际事件映射

来源：src/lib/product-measurement{,-core}.ts与下列现有域事件源码。新增发送仅isP0Path九页通过时执行，复用sendAnalyticsEvent。没有新SDK、持久用户ID、音符引擎或CTA。后台收数未验。

| concept | existing/new wire event | actual_trigger | payload | scope | dedupe_key | numerator / denominator | version_change |
|---|---|---|---|---|---|---|---|
| result_seen | 新p0_result_seen | 有效答案区域至少10%进入视口、文档visible、节点有rect且非hidden/opacity0 | object_id/result_state | 九页；Finder为整组结果，Hub为一组过滤结果，不为每张默认卡计数 | logical mounted view×object×state | 有效曝光；不代表理解/完成 | p0-v1新口径；不能与旧scale_reference_viewed相加 |
| tool_start | 新p0_tool_start | Finder第一次用户选键 | chord-finder | Finder | mounted tool view一次 | 开始数；默认/恢复不计开始 | 新增 |
| tool_result | 新p0_tool_result | ≥2音，300ms内无输入变化且有候选 | fingerprint/selected_count/match_count | Finder | view×支持输入fingerprint一次 | 有匹配输入状态/有效工具开始；不称用户转化率 | 新增 |
| tool_no_match | 既有定义finder_no_match补调用 | 同300ms规则且无匹配 | 同上 | Finder | 同上 | 无匹配状态/已计算有效状态 | 不含空/单音，不改matcher |
| comparison_select | 既有定义finder_result_selected补调用 | 点击实际候选href | registry object_id/match_kind/target/fingerprint | Finder | 原始intent可重复；不当完成率分子 | 比较选择intent，仅逐状态去重后才用于转化分析 | 补独立Finder调用 |
| next_step_click | 新p0_next_step_click；Scale保留scale_related_reference_opened/scale_next_task_opened | 九页main内合法同源href；C major已有connections按钮直接记录；排除PDF/download | object/state/target路径 | 九页；Scale不双发新别名 | 原始click不去重，作为intent日志 | 不用raw点击除以去重曝光 | Scale旧名称保留 |
| result_engaged | 新p0_result_engaged | 已被记录曝光的对象状态随后发生main内同源链接点击 | object/state | 九页，C major仅按钮的connections不纳入该href指标 | view×object×state一次 | 去重已参与曝光/同范围曝光；≤100%，0分母NO_DATA | 新口径，只量已列href，不能称所有下一步行为 |
| audio_play | 新p0_audio_play；Scale保留scale_playback_started | chord/notes既有音频状态进入playing；Scale已有成功路径 | object/mode | 九页适用音频 | 一次非playing→playing转换 | 成功启动，不是演奏或任务成功 | 不从按钮click猜成功，Scale不双发 |
| practice_start | 新p0_practice_start；Scale/keyboard保留域started | C major显式进入；builder首次交互/检查；既有域按原合同 | object/mode/attempt | 五和弦、scale、keyboard | 每attempt一次 | 按模式的attempt分母 | 不汇总不同模式成可比完成率 |
| practice_complete | 新p0_practice_complete；scale_question_submitted、scale_practice_self_reported、keyboard_practice_completed映射 | builder/C major明确correct；Scale分别题目结果与自报；keyboard原回合完成 | outcome/assisted/mode/attempt或域原字段 | 适用试点 | 新事件每attempt一次；legacy报表按attempt/question聚合 | exercise_success、self_reported、assisted分开；播放结束不算 | show answer帮助记录跨重试保留；不得把旧播放stopped计成功 |
| print_reference | 新p0_print_request；Scale保留scale_print_requested | 已有打印动作进入前 | object/count或域asset/hand | 适用试点 | 原始请求事件 | 打印请求，不是纸张输出 | 无新增打印内容 |
| download_asset | 新p0_download_request；Scale保留scale_resource_requested | main内download/PDF链接点击 | object/target路径 | 适用试点 | 原始请求事件 | 点击不等于保存；Scale不双发 | 不统计页头/页脚链接 |
| share | 新p0_share；keyboard保留既有share_copy/share_native | SharePanel在没有业务onCopied/onNative事件回调时补状态；有回调保留旧事件 | copy_success/copy_failed/native_success/cancelled/unavailable | 试点现有分享控件 | 成功/取消分别记录；不将打开对话框作成功 | 仅成功status计成功；legacy opened为await native share resolve后的原命名 | 不删除旧事件；不双发回调已有记录 |

## 生命周期、隐私和限制

logical view为挂载的页面任务/reference生命周期；重新render/滚出滚入/重复observer通知不重计；新文档或真正重新挂载开始新view。页面当前实现的同问题help历史跨Try again保留。没有新增cookie/localStorage/sessionStorage或随机用户标识。

Finder fingerprint仅已选pitch classes、可选bass、interpret/root模式；计时器清理与generation检查拒绝旧状态回调。计算完成与看见结果用两个不同事实事件，不能相加当任务完成数。多候选整组只计一次曝光。

公共字段使用page_path（不含query）、measurement_version=p0-v1、既有release_version及固定allowlist。没有发送任意查询文本、音频或完整用户URL。transport disabled/missing/throw不阻断产品；没有补发队列。

没有第一方报表数据，本轮只验证本地事件正确性。数据接收者应以本表所列唯一来源汇总每个概念；不得将scale_reference_viewed（挂载）、p0_result_seen（可见）、tool_result（计算）相加。没有下一步点击也不能解释成任务失败。


## 测试失败、告警与证据解释

- 真正产品回归失败：Scale音频/视觉启动不同步，且原baseline同样失败。没有修改算法以迎合测试。
- 测试脚本问题已定位并以独立证据复验：跨运行环境空对象deepEqual（改以五页新事件数量0验证）；Print按钮实际名称为Print this position（已按data-print-current完成）；observer误等Next预取observer、重复测试接收器（修正等待真实结果observer且单独接收器，最终5/5）；键盘测试迁移输出时相对路径错误（修正后70/70）。旧失败receipt未删除。
- `bringToFront`被浏览器foregroundPolicy=preserve拒绝；未绕过，改在已可见、已拥有主页面做本地observer测试。CLI小于60000ms参数被拒绝时程序未执行，之后使用规定值。
- screenshot曾超时，移动截图仍失败；桌面一张成功并实际加载检查。不将DOM结果称为完整视觉验收。
- build自动改动的next-env.d.ts/tsconfig.json已还原；隔离构建目录保留。Git报告若干CRLF将转LF是工作树换行告警，不是额外内容放行。
- Foundation关于历史source-manifest“规划Markdown缺失”的NOTE仍保留；当前文件确实存在且内容包基线验证通过。
- `final/exits.txt`记录退出码；浏览器CLI返回succeeded仅代表程序运行完，不代表内部全部断言通过，以results逐项及本报告FAIL为准。

## 人工验收清单

| 入口 | 动作 | 预期 | 类型/当前状态 |
|---|---|---|---|
| /chords/finder | 读帮助，选C/E/G，再设最低E；清空，仅选C；选C+C♯ | 帮助对应现有控件；CEG候选、bass状态正确；单音不计no-match，C+C♯为已核registry无匹配 | 本地已验；人工复核 |
| /guide/piano-chords | 点击Identify a chord from selected notes | 进入/chords/finder | 本地已验 |
| 九页实际结果块 | 滚入、滚出、再滚入，改变转位/输入；刷新新页面 | 同view同状态一次；新有效状态/新view按合同记录 | 本地已验；后台未验 |
| /chords/c-add9、/chords/c-major | Show answer→Check answer，重复Check | assisted=true，一attempt一次；不当独立演奏成功 | 本地已验 |
| /chords/c-major | 播放、停止；模拟音频不可用；取消系统分享 | 成功playing才记audio；失败不计成功；取消分享独立status | 本地已验；真机/真人听音待验 |
| /scales/c-major | Start practice并对照声音、count-in和键位 | 应同步；目前preparing与播放不同步 | **BLOCKED**，需授权修复合同或明确例外 |
| /keyboard-notes | 启动10题、逐题作答、看结果 | 既有回合/分数不变 | 本地已验；真机/读屏待验 |
| 现有Print/Download | 打印预览、保存PDF并纸上检查 | 快照及资源可用；请求事件不能证明保存/打印成功 | 本地请求/print media已验；实际保存/纸张待验 |
| 统计后台 | 在明确授权测试路径核对字段、九页范围、去重分母 | 不混加旧挂载事件/新曝光；0分母NO_DATA | BACKEND_NOT_VERIFIED，本轮未发送生产数据 |

## 交付清单与未来边界

`delivery-files.json`列全部tracked修改与新增未跟踪实现/测试文件及hash；`implementation.diff`含tracked差异，`new-implementation.diff`包含新增源码/测试，避免只看git diff漏交付。审计文档继续保留，checks是原始证据而非虚构模板。没有变更package/lock、src/app路由、public资产或音乐引擎；见 `final/preservation.json`。

P1仍需下一次范围确认，顺序为最小object/context/state协议与fixture → P1-2接收端及恢复测试 → P1-1链接/下一动作呈现 → P1-3限定来源与已有资产。P0本地门禁先消除当前阻塞；不自动要求等数周SEO流量，也不自动进入P1。

Page Gate的Unique Utility指当前独立任务价值，不要求每个URL独占控件；下一步入口不要求用户点击。保持既有索引决策；不因共享模板否定URL，也不因registry含对象自动建页。
