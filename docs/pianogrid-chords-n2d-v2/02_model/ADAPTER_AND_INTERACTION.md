# Authoring contract 与交互

本目录是交付契约，不是要求项目再建一个 CMS、再装一种 validator 或另存一份运行时字典。`03_content` 作为唯一 authoring source；metadata、assets、links 是生成的 manifest，不另行手动修改。

## 类型边界

继续 `family=add`、`subtype=add9 | minorAdd9`。`definition.components` 表示 degree/spelling/pitchClass；`realizations` 表示排序后的确切音高。`realizedDegrees` 与 notes 一一对应。

本包两种布局都含完整四个组成音，无省略、无重复。此处的 required/forbidden 约束只描述这两个完整参考示例，不能扩展成所有现场表演的省略规则。Extended/Altered 后续要另定约束。

- `ninth-above`：根音上方 [0, 4 或 3, 7, 14] 半音。
- `added-note-inside`：[0, 2, 4 或 3, 7] 半音。
- 两者 bass 都为根音，并不是 first/second inversion。
- 两者 degree identity 都来自同一 definition；第二个布局的 added member 功能仍映射到 9，实际 register 由 notes 决定。
- 作者选择根音处在第三八度、键盘窗 C3–E5；这是展示设置，可通过最小 adapter 接入真实组件，不作为和弦普适定义。
- `.playback` 同时给 together / ascending / descending。只暴露已有支持的音频模式；不能把 ascending 四事件误用为同时播放。

## 两种练习

| 项目 | 组成音 | 当前音区示例 |
|---|---|---|
| 比较 | 去重后的 pitch classes | 去重后的具体 MIDI |
| 接受八度变化 | 是 | 否 |
| 接受相同音类八度加倍 | 是 | 否 |
| 漏音、多其他音类 | 提示差异 | 提示差异 |
| 音类对但音区不同 | 正确 | `same_tones_different_voicing` 提示，而非“错误和弦” |

页面要显示任务名称和判定范围。切换任务、示例或根音后停止旧音频，并清除旧答案。Show answer 使用当前任务的数据，不能总显示首个高位布局。

## 页面顺序和内容保留

面包屑/H1/直接答案 → 首个琴键与布局切换 → 音符/公式表 → 第二布局对照 → add9/add2 / sus2 / ninth 对比 → 两种小练习 → 可打印参考 → FAQ/来源/内链。

两布局的静态说明/音名必须已在 HTML 中；交互只增强，不能把正文移进请求完成后才出现的 modal/tab。长页面可以留白，不删除正确内容。沿用当前 tokens、字体、间距体系、header 和 footer。

若已经实施了旧 N2D：保留所有正确内容，修正过度绝对的音区判定、补充第二任务和第二布局；旧地址不变。

## 条件兼容性修正，不是重跑 N2C

检查旧 family 的 bassDegree 是序号还是变音 degree。若是序号，改由另外映射生成 label，而不是把半减七的 ♭5 打印成 5；若当前 adapter 已正确处理则不改。

检查 `exactMidiSet` 与 `pitchClassSet` 是两种 task，不改变已有 Seventh/Triad 练习的语义。不全局替换旧 `3` 为 `4`，不删除旧专用回归。
