# PianoGrid S0 Owner Map 与去重审计

状态取值：`EXISTS_VERIFIED / EXISTS_UNTESTED / IN_PROGRESS / GAP / BLOCKED / OUT_OF_SCOPE`。

| 能力 | 真实 owner | 状态 | 证据与处理 |
|---|---|---|---|
| Keyboard 音高身份、拼写与范围解析 | `src/lib/keyboard-resolution.ts`、`src/lib/keyboard-content.ts`、site-master Keyboard 数据 | EXISTS_VERIFIED | [已核实] B♯/C♭/升降号、MIDI 与布局边界在 Keyboard 40/0 检查和历史完成证据中通过；S1 直接复用。 |
| Keyboard 88/61 键布局与几何 | `src/lib/keyboard-content.ts`、`src/lib/keyboard-geometry.ts`、`keyboard-diagram.tsx` | EXISTS_VERIFIED | [已核实] 键数、颜色、位置、横向滚动与键盘操作已有 owner；没有另造键盘引擎。 |
| Keyboard 谱表 | `staff-diagram.tsx`、`chart-experience.tsx`、site-master staff 数据 | EXISTS_VERIFIED | [已核实] 最新 Keyboard 交接记录 staff/MIDI 同步与浏览器检查通过；S1 当前题型未伪造谱表。 |
| 现有 Keyboard trainer | `src/lib/keyboard-practice.ts`、`practice.tsx` | EXISTS_VERIFIED | [已核实] 10 题、三等级、deterministic generator、exact MIDI、ARIA live、结束与 retry 已存在。 |
| 练习开始/例题 | 无生产 owner；S1 为 `practice-sample.tsx` | GAP | [已核实] 生产练习直接从 Q1 开始；S1 提供真实组件样板，批准前不替换生产 owner。 |
| 同题答错重试、提示、揭示 | 无生产 owner；S1 为 `practice-sample.tsx` | GAP | [已核实] 生产练习首选后锁定且没有 hint/reveal；S1 已验证状态语义。 |
| 结果分桶与 review set | 无生产 owner；S1 为 `practice-sample.tsx` | GAP | [已核实] 生产结束只有正确数；S1 已实际得到 7 首答、2 辅助、1 揭示与 D4/C4/F4 review set。 |
| Chords matcher | Chords model、practice 与 component owners；核心入口在 `src/components/chords/` | EXISTS_VERIFIED | [已核实] 最新集成交接记录 369/0 + 188/0；报告没有触发重做。 |
| Scales checking | `src/lib/scale-practice.ts` 与 Scales experience components | EXISTS_VERIFIED | [已核实] 最新集成交接记录 data/contract 670/0、completion 9/0；没有重做。 |
| Scales pulse / timer | `src/lib/practice-timer.ts` 与 Scales 播放/练习 components | EXISTS_VERIFIED | [已核实] 当前代码已有 owner；本轮不把它复制到 Keyboard。 |
| Keyboard 音频 | `use-note-audio.ts`、`tool-controls.tsx` | EXISTS_VERIFIED | [已核实] 播放/停止与取消逻辑已有测试；S1 没有引入音源或声学评分。 |
| Print / PDF | `chart-experience.tsx`、`labeled-experience.tsx`、`blank-experience.tsx` 与 export/check scripts | EXISTS_VERIFIED | [已核实] Keyboard 交接记录 98 项 PDF 检查与 30 张响应式图；PDF tagging/物理打印仍是人工门禁。 |
| Lookup/Chart/Labeled 分享序列化 | `share-control.tsx`、`keyboard-resolution.ts` 的 share/restore | EXISTS_VERIFIED | [已核实] 已有 base-route URL 状态恢复；不能直接表达练习题序。 |
| 练习 preset 分享/接收 | 无生产 owner；S1 局部 serializer 在 `practice-sample.tsx` | GAP | [已核实] S1 只携带 preset，不携带成绩；valid/invalid receiver 均已操作验证。 |
| Chords analytics/event adapter | `src/lib/chord-events.ts` | EXISTS_VERIFIED | [已核实] 已存在局部 owner，不是全站通用事件平台。 |
| Scales analytics/event adapter | `src/lib/scale-events.ts` | EXISTS_VERIFIED | [已核实] 已存在 consent-aware 本地/可选 provider owner。 |
| Keyboard practice events | 无 | GAP | [已核实] 搜索当前 Keyboard owner 未找到练习事件 adapter；S1 不虚构事件或统计。 |
| Feature flags | 既有 ads-layout preview 环境变量；S1 在 `lookup-experience.tsx` 使用最小双门隔离 | EXISTS_UNTESTED | [已核实] 仓库没有通用 flag 平台；按 S1 要求不新造平台。S1 gate 本轮已测，但它尚非生产发布机制。 |
| 主题 tokens | `src/app/tokens.css`、`foundation.css`、`globals.css`、`docs/design/tokens.json` | EXISTS_VERIFIED | [已核实] S1 只引用现有变量，没有换品牌、字体或配色。 |
| 按钮与页面组件语言 | `.am-button` 系列、`.kn-practice`、`KeyboardDiagram` | EXISTS_VERIFIED | [已核实] S1 复用实际组件与 classes，不是独立 mockup。 |
| 真机/读屏/物理打印/具名音乐审阅 | 人工 gate | BLOCKED | [已核实] 需要对应设备与具名人类审阅，本轮没有替代或伪造。 |
| B04–B08 | 后续条件指令 | OUT_OF_SCOPE | [已核实] 用户明确禁止本轮执行。 |

## REUSE_VERIFIED 清单

- [已核实] Canonical pitch、MIDI、spelling、88/61-key layout、staff mapping。
- [已核实] 现有 10 题 generator、三等级和题序生成。
- [已核实] `KeyboardDiagram`、ARIA key labels、focus、scroll、现有按钮体系。
- [已核实] Lookup/Chart/Labeled share restore、Keyboard audio、print/PDF。
- [已核实] Chords matcher、Scales checking/pulse。
- [已核实] 当前系统字体、主题色、panel/control radius、focus ring 与 mobile breakpoint。

## 真正 GAP 清单

- [已核实] 开始页与不计分例题。
- [已核实] 同题错误重试、提示、揭示及其明确计分语义。
- [已核实] 首答/辅助/揭示结果分桶、review set 与子集复练。
- [已核实] 练习 preset 分享、接收与失效回退。
- [已核实] Keyboard practice event owner 与批准后验收测试。

