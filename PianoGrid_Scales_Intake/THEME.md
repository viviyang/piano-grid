# Theme and visual sources

## 真实声明

| 角色 | 当前值 | 声明位置 |
| --- | --- | --- |
| 字体 | [已核实] `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `source/src/styles/tokens.css:103`；`foundation.css:6,11` |
| 页面背景 / 正文 | [已核实] `#FFFFFF` / `#1D1D1F` | `tokens.css:9,11` |
| 工具背景 | [已核实] `#F6F7F9` | `tokens.css:13`；`a-minor.css:29` |
| 主按钮 | [已核实] `#0066CC`，白字；hover `#0057AE` | `tokens.css:25,27,29`；`a-minor.css:65-68` |
| 选择态 | [已核实] 白底/蓝字/蓝边；浅蓝 `#EAF2FF` 用于选中/琴键填充 | `tokens.css:51-57,81-91` |
| 边框 / 输入边 | [已核实] `#E1E4E8` / `#7A828E` | `tokens.css:45,47` |
| 正文宽度 | [已核实] 页面最大 70rem；阅读正文最大 72ch；桌面 gutter 2rem、手机 1rem | `tokens.css:263,265,333,369`；`foundation.css:47-52` |
| 工具圆角 / 控件圆角 | [已核实] 12px / 8px | `tokens.css:281-289` |
| 琴键 | [已核实] 白 `#FFF`、黑 `#1D1D1F`、边 `#8B919A`、选中浅蓝、标记蓝、发声蓝/白 | `tokens.css:75-91`；`keyboard-notes.css:1,11-12` |

## 样式层级

1. [已核实] `src/app/globals.css` 导入 `tokens.css` 与 `foundation.css` 并映射 Tailwind v4 theme。
2. [已核实] Scales 页面再导入 Chords A-minor 的共享页面骨架 CSS、Keyboard Notes CSS、最后导入 `scales.css`。
3. [已核实] `a-minor.css` 提供头尾、工具卡、按钮、阅读区 15rem/正文两栏和打印基础；`keyboard-notes.css` 提供 select、谱表与琴键；`scales.css` 提供四列控制区、结果表、来源区、移动重排和 Scales 打印覆盖。
4. [已核实] 断点：67rem 将控制区改两列；低于 48rem 时阅读区改单列、工具控制重排；22rem 以下再改单列。

## 本轮浏览器计算样式

[已核实] `evidence/current-local/computed-styles.json` 来自正在运行的本地三页 DOM。代表值：body 17px/约27px、工具卡 `rgb(246,247,249)`、主按钮 `rgb(0,102,204)`、输入边 `rgb(122,130,142)`、标记琴键 `rgb(234,242,255)`、页面容器实测 1120px。浏览器窗口当时大于 1440 CSS px；它不是本包截图 viewport。

## 截图

[已核实] `evidence/current-public/screenshots/` 含三页各 1440px 与 390px 完整页截图，来自 2026-09-10 的最终公开构建独立复验并在本轮抽样查看。当前本地三页已实际打开确认，但本轮没有新保存一套本地全页截图；因此不能把这六张图声称为 dirty 本地树的像素快照。

[已核实] 未复制字体文件。谱号组件使用 `"Segoe UI Symbol", "Apple Symbols", serif` 回退声明，位置在 `keyboard-notes.css:1`。

