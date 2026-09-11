# Current state

## 三个页面

| 页面 | 源码有 | 本轮页面显示 | 实际操作验证 |
| --- | --- | --- | --- |
| `/scales` | [已核实] 9 个正文块；Scale type、Starting note、Hand、Direction；音符、半音步、指法表、谱表、键盘、来源、播放/停止、打印；大调/小调/音级/Jazz 表格 | [已核实] 默认 C Major、RH、Ascending、1 octave、60 BPM；9 个正文块与 5 类数据表完整出现 | [已核实] 本轮仅打开并读 DOM/计算样式。既有 `evidence/existing-scale-review/review.md` 记录 2026-09-09 的筛选、播放停止、切换取消、打印快照验证；本轮未重跑 |
| `/scales/c-major` | [已核实] 固定 C/major/1 octave；Hand、Direction；固定 60 BPM；4 个正文块；同一 Reference 输出与返回中心链接 | [已核实] 默认 RH/Ascending，C4–C5，2–2–1–2–2–2–1，来源与双手/双方向已核指法入口 | [已核实] 本轮仅打开并读 DOM。既有验收记录 RH/LH、上/下/往返、播放与打印通过；本轮未操作 |
| `/scales/a-minor` | [已核实] 固定 A/1 octave；Natural/Harmonic/Classical melodic、Hand、Direction、40/60/80 BPM；4 个正文块与自然小调和弦表 | [已核实] 默认 Natural minor、RH、Ascending、60 BPM，A4–A5；正文、来源、和弦表与相关链接出现 | [已核实] 本轮仅打开并读 DOM。既有验收记录三形式、方向、手别、速度、播放和打印；本轮未操作 |

## 支持对象与边界

- [已核实] 中心页数据对象包含 15 种传统大调拼写和 15 个主音的三种小调形式；只有 C major 与 A minor 有已发布详情 URL。
- [已核实] C major 提供一八度 RH/LH、ascending/descending 指法；往返由两个独立方向行拼接。
- [已核实] A minor 三种形式提供一八度上行 RH/LH 指法；下行 RH/LH 保持 `null`，页面显示 notes only，不复用上行指号。
- [已核实] 其他中心页选项可以显示音符、谱表、键盘、播放和打印；多数没有指法，因此显示 notes only。
- [已核实] 范围 UI 固定写作 `1 octave`；没有范围选择器、多八度指法、双手同时演奏或整套下载 PDF。
- [已核实] 打印是当前浏览器 `window.print()` 的当前选择快照；没有 Scales 静态 PDF 文件或下载入口。
- [已核实] 音频由 Web Audio 根据有序 MIDI 事件即时合成；没有音频文件被打包。
- [已核实] 三页当前没有 FAQ 专用字段或 FAQ 组件。正文、表格、练习任务、来源与关系链接保存在三个完整样例对象中，没有只导出 notes。

## 复用表

| 能力 | 共享 / Scales 专用 | 真实位置 |
| --- | --- | --- |
| 琴键与音高几何 | [已核实] 共享 Keyboard Notes | `keyboard-content.ts`、`keyboard-types.ts`、`keyboard-geometry.ts`、`keyboard-diagram.tsx` |
| 谱表 | [已核实] 共享 Keyboard Notes | `staff-diagram.tsx` |
| 播放/停止 | [已核实] 共享底层、Scales 包装 | `a-minor-audio.ts` → `use-scale-audio.ts` |
| 打印 | [已核实] 共享浏览器机制、Scales 自有快照/打印 DOM | `center-experience.tsx`、`detail-experience.tsx`、`scales.css` |
| 来源显示 | [已核实] Scales 专用 scope 映射与组件 | `scale-content.ts`、`scale-reference.tsx` |
| 站点目录/头尾 | [已核实] 共享 | `site-routes.ts`、`site-navigation.tsx`、`site-chrome.tsx` |
| 练习反馈 | [已核实] 仅正文建议；没有 Scales 交互评分组件 | 三页 `blocks`；`pages.tsx` |

## 读取到的硬编码与能力边界

- [已核实] `ScaleFormID` 固定为 4 种形式；`blockIDs` 固定三页及其块顺序。
- [已核实] 中心组件初始 `major/C/RH/ascending/60` 在 React state 中硬编码，虽与当前 `data.default_selection` 相符，却没有直接用该对象初始化。
- [已核实] 详情初始 RH/ascending 在组件中硬编码；C major form 与 tempo 60 由 adapter 固定，A minor default form/tempo presets 来自数据。
- [已核实] 非 C 的中心大调由七个音名加重复 tonic 生成，descending 使用 `reverse()`；C major 与所有小调详情使用各自来源数组。
- [已核实] `up_down` 固定为 ascending 加 descending 去掉首项，假设两个方向共享一个顶音。
- [已核实] 通用 pitch 生成把 RH 上行放在第 4 八度、LH 上行第 3 八度；下行分别从第 5/4 八度开始。具体 C/A 数据则使用显式实际音高并校验 MIDI。
- [已核实] `ScaleOption` 没有独立范围字段；页面与打印把范围固定为一八度。指法数组只绑定 hand/direction，范围依赖页面合同与音高序列。
- [已核实] adapter 有块 ID、授权 URL、来源完整性、拼写/MIDI 与键盘布局校验，但多个输入参数仍为 `any`，不存在覆盖全部 JSON 字段的独立 runtime schema。
- [已核实] `publicSourceScope` 是来源 ID 白名单；未列入者会抛错。中心 `AC-03` 被明确映射为不公开来源条目。
- [已核实] 没有发现把所有小调下行统一反转、把另一手指号直接套用、或给 `null` 指法默认填值的代码。范围固定和大调 reverse 是已声明能力边界，不自动定性为 bug。

## 对象/页面目录

[已核实] `planning-and-content/object-page-directory.json` 列出 25 个 Scales 对象与 1 个 Arpeggios 对象，含原路径、模板、source group、块和字段。只有三条目标 URL 标记 `route_exists_in_current_source=true`；其余仅是规划/内容对象，不能因 JSON 存在而视为发布。

## Chords B3

[已核实] `evidence/chords-b3/B3_RESULT.md` 的最新综合状态是 `PASS_WITH_NOTES`；它说明共享主题、头尾、播放/打印基线继续复用，但人耳、真机、读屏、实体打印、PDF 标签和独立专业审阅未执行。本轮未重新审阅任何 Chords 页面。

