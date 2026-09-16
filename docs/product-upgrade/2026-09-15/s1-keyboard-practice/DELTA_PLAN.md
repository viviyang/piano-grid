# PianoGrid Keyboard Practice Delta Plan

本计划只覆盖 B00–B03 中由当前代码证据确认的差异。`S1 已实现` 指双门隔离样板；`批准后` 才允许迁入默认产品体验。

| 项目 | 原来怎样 | 修改后怎样 | 为什么 | 复用什么 | 怎么验收 | 状态 |
|---|---|---|---|---|---|---|
| 独立开始 | [已核实] 页面加载即 Q1/10。 | 先显示任务说明、10 题/无计时/无账号边界与 Start。 | [推断] 让用户在开始计入结果前理解任务；依据是当前缺少开始边界。 | 现有 `/keyboard-notes`、layout 与 `.kn-practice`。 | 打开时不计题；Start 后才出现 Q1/10。 | S1 已实现 |
| 不计分例题 | [已核实] 无例题。 | 用真实 C4 键盘做一个不计结果的例题。 | [推断] 在不伪造统计的前提下教会交互。 | `KeyboardDiagram`、C4/MIDI60 与现有 theme。 | 例题错误/正确有反馈；开始正式题后结果总数仍为 10。 | S1 已实现 |
| 错误重试 | [已核实] 首次选键后锁定，答错也进入 Next。 | 错误显示所选音与方向说明，保留同题并允许 Try again。 | [推断] 当前锁定行为无法支持纠错练习。 | Exact-MIDI 判断、键盘数据与 ARIA live。 | D4 题选 E4，看到“D4 在左边”；再次选 D4 后才可 Next。 | S1 已实现 |
| Hint | [已核实] 无 hint。 | 未完成时可以查看基于二/三黑键组的提示；该题进入 assisted。 | [推断] 提示是完成路径但不应与首答混同。 | 现有自然音键盘结构。 | Show a hint → 正确，结果只增加 `With help`。 | S1 已实现 |
| Reveal | [已核实] 无 reveal。 | Show the answer 高亮目标并记为 revealed，不记作正确。 | [推断] 给出退出卡点的路径，同时保持结果诚实。 | 目标 MIDI 与 selected state。 | Reveal 后可 Next；结果 revealed +1、first try 不增加。 | S1 已实现 |
| 结果解释 | [已核实] 只显示 `{correct}/10`。 | 分为 First try、With help、Revealed，并明确“只检查本屏答案、不听钢琴”。 | [推断] 单一总分掩盖辅助与揭示，容易造成过度结论。 | 本地 state；不新增云成绩。 | 固定混合流程得到 7/2/1，三桶合计 10。 | S1 已实现 |
| 待复习音符 | [已核实] 没有 review set。 | 收集答错、用提示或揭示的唯一音符。 | [推断] 让结束态提供可行动反馈，而非只有分数。 | 每题现有 `PracticeTarget`。 | 混合流程结果列出 D4、C4、F4，不重复同 MIDI。 | S1 已实现 |
| 子集复练 | [已核实] Retry 重开完整练习。 | `Review these notes` 只运行本轮 review set；`Try another round` 仍开完整 preset。 | [推断] 复练应针对已观察到的困难，不声称诊断更多能力。 | 同一 practice renderer/generator targets。 | 7/2/1 流程后 Review 进入 `Question 1 of 3`。 | S1 已实现 |
| 同题分享 | [已核实] Lookup/Chart 可分享，练习题序不能分享。 | 链接只含 `practice-sample`、版本化 preset 与 receiver 标记；不含成绩。 | [推断] 满足“分享同题”同时避免泄露/夸大结果。 | 既有 base route 与浏览器 share/copy 模式。 | 生成链接仍是 `/keyboard-notes`；接收页识别同一 preset 且不自动开题。 | S1 已实现 |
| 无效分享回退 | [已核实] 练习分享不存在。 | 未知 preset 明示不可用，并提供当前样板开始入口。 | [推断] 版本变化时不应静默换题。 | 同一 intro state。 | `practice-preset=retired` 显示不可用提示，不自动开始。 | S1 已实现 |
| 样板隔离 | [已核实] 无通用 feature-flag 平台。 | 环境变量 `NEXT_PUBLIC_PIANOGRID_PRACTICE_SAMPLE=true` 与 `?practice-sample=1` 必须同时满足。 | [推断] 最小化 S1 写入，避免新增路由或误改默认体验。 | 现有 `/keyboard-notes` 页面。 | 缺 query 时仍显示现有 `Find this note`；路由表/SEO 文件无 diff。 | S1 已实现 |
| Keyboard events | [已核实] 无 Keyboard practice event owner。 | 批准后建立最小、隐私受限的 Keyboard 局部事件 owner，或明确不采集。 | [推断] 若 B03 需要度量，不能借用语义不同的 Scale/Chord 事件。 | 参考 `chord-events.ts` / `scale-events.ts` 的边界，不复制业务语义。 | 事件 schema、consent、无 PII、无结果 URL；自动测试。 | 批准后待做 |
| 生产回归 | [已核实] 现有 Keyboard targeted suite 为 40/0；历史 final-build suites 已通过。 | 批准后增加新状态机的 unit/browser/a11y/responsive 用例，再跑相关 build gates。 | [推断] S1 浏览器证据足以审批视觉/交互方向，但不是最终生产门禁。 | 现有 Keyboard scripts 与 in-app browser evidence。 | Typecheck/CSS/unit/browser/build 全过；真机与人工 gate 单列。 | 批准后待做 |

## 明确不做

- [已核实] 不执行 B04–B08，不改 Hero，不新增 trainer 路由，不新增账号/云成绩/排行榜/MIDI/麦克风/AI teacher/支付/广告。
- [已核实] 不改 public route registry、sitemap、canonical、robots 或 production。

