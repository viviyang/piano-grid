# Keyboard Notes v2 — TOKEN MAP

状态：`CURRENT_REPOSITORY_AUDIT`  
设计输入：`C:\Users\Admin\Documents\viviyang_github\piano\docs\design\keyboard-notes-v2`（只读）  
写入目标：`C:\Users\Admin\Documents\viviyang_github\pianogrid-final-integration` / `codex/final-integration`

## 1. 主题角色映射

| v2 角色 | 项目真实来源 | 当前值 | S1 使用方式 |
|---|---|---:|---|
| 页面 / 白键表面 | `src/styles/tokens.css` `--background` / `--piano-key-white` | `#FFFFFF` | [已核实] 页面、白键、Dialog 使用项目白色，不复制预览 CSS。 |
| 主文字 / 黑键 | `src/styles/tokens.css` `--foreground` / `--piano-key-black` | `#1D1D1F` | [已核实] 标题、音名、黑键。 |
| 弱背景 | `src/styles/tokens.css` `--surface` / `--muted` | `#F6F7F9` | [已核实] 仅提示带、分享预览和小范围导航，不恢复 Card 套 Card。 |
| 主动作 / 选中 | `src/styles/tokens.css` `--primary` | `#0066CC` | [已核实] tabs、Primary、selected/correct；覆盖设计稿预览值 `#2C68C7`。 |
| 主动作 hover | `src/styles/tokens.css` `--primary-hover` | `#0057AE` | [已核实] 继续由现有 `.am-button.am-primary` 提供。 |
| 主动作前景 | `src/styles/tokens.css` `--primary-foreground` | `#FFFFFF` | [已核实] Primary button 文字。 |
| 辅助文字 | `src/styles/tokens.css` `--muted-foreground` | `#5C626B` | [已核实] meta、说明、边界文本。 |
| 轻分隔 | `src/styles/tokens.css` `--border` | `#E1E4E8` | [已核实] tabs、sections、result/share 分隔。 |
| 输入 / 琴键边界 | `src/styles/tokens.css` `--input` / `--piano-key-border` | `#7A828E` / `#8B919A` | [已核实] 输入轮廓与琴键几何边界分开使用。 |
| 焦点 | `src/styles/tokens.css` `--ring` | `#0066CC` | [已核实] 普通控件沿用全局 focus；琴键局部改为虚线轮廓并保持与答案状态分离。 |
| 已选/答对浅底 | `src/styles/tokens.css` `--piano-note-selected` | `#EAF2FF` | [已核实] Explore selected、Practice correct/revealed。 |
| 琴键状态标记 | `src/styles/tokens.css` `--piano-note-mark` | `#0066CC` | [已核实] selected/correct/revealed 边框、圆点或 ✓。 |
| 错误 | `src/styles/tokens.css` `--error` | `#B42318` | [已核实] wrong key、× 与错误文案；不使用设计稿采样值 `#A4321D`。 |
| 遮罩 | `src/styles/tokens.css` `--pr-overlay` | `rgb(29 29 31 / 0.35)` | [已核实] Practice share / exit 原生 `dialog::backdrop`。 |

## 2. 字体与排版

| 角色 | 项目真实来源 | 映射 |
|---|---|---|
| 字体族 | `src/styles/tokens.css` `--pr-font-sans` | [已核实] `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`；不引入字体文件。 |
| 页面 H1 | `src/styles/tokens.css` 的 `--pr-type-h1-*` + `src/styles/foundation.css` | [已核实] 继续由全站 foundation 控制；S1 不修改 H1/token。 |
| Workspace 大音名 | S1 局部 `.kn-v2-note-name` | [推断] Desktop `5.25rem`（84px）、Mobile `4.375rem`（70px），来自 v2 几何合同；只影响该样板。 |
| Practice 题目 | S1 局部 `.kn-v2-question-note` | [推断] Desktop `4.75rem`（76px）、Mobile `4rem`（64px），来自 v2 几何合同。 |
| UI / meta | `--pr-type-ui-*` / `--pr-type-meta-*` | [已核实] tabs、按钮、范围、反馈与辅助文案继续使用项目比例。 |

## 3. 尺寸、圆角与动作

| 角色 | 项目真实来源 | 映射 |
|---|---|---|
| 主容器 | `src/styles/foundation.css` `.pr-container`、`--pr-container-page: 70rem` | [已核实] 保留现有 1120px 页面容器；设计稿 1088px 工作区在容器内实现。 |
| 控件最小高度 | `--pr-control-min-size` | [已核实] `2.75rem` / 44px。 |
| 控件圆角 | `--pr-radius-control` | [已核实] `.5rem` / 8px。 |
| Panel 圆角 | `--pr-radius-panel` | [已核实] `.75rem` / 12px，仅用于真正的 Dialog/提示表面，不用于把全部模块做成 Card。 |
| Focus | `--pr-focus-width` / `--pr-focus-offset` | [已核实] 2px / 4px；琴键使用局部虚线变体。 |
| Keyboard black height | `--pr-piano-black-height` | [已核实] 62%。 |
| Button | `src/app/chords/a-minor/a-minor.css` `.am-button`、`.am-primary`、`.am-secondary`、`.am-tertiary` | [已核实] 继续复用现有 button owner，不新增 shadcn/button 体系。 |

## 4. 共享组件与语义状态

| v2 部件 | 当前 owner | 接入决定 |
|---|---|---|
| Header / Footer | `src/components/chords/site-chrome.tsx` | [已核实] 原样保留，不复制原型 header/footer。 |
| Breadcrumb | `src/components/ui/breadcrumb.tsx` | [已核实] 原样保留。 |
| Keyboard | `src/components/keyboard-notes/keyboard-diagram.tsx` + `src/lib/keyboard-geometry.ts` | [已核实] 继续作为唯一键盘几何与键盘操作 owner；增加局部可见窗口/状态表现参数，不创建第二 engine。 |
| Pitch / spelling | `src/lib/keyboard-resolution.ts` | [已核实] 确切音高、裸音名候选、异名同音与越界继续由此解析。 |
| Trainer targets | `src/lib/keyboard-practice.ts` | [已核实] 继续调用真实 generator；不复制原型固定 `seq` 或示例成绩。 |
| Audio | `src/components/keyboard-notes/use-note-audio.ts` / `src/lib/a-minor-audio.ts` | [已核实] 单一音频 owner；模式切换/换题时取消。 |
| 单音 deep link | `src/lib/keyboard-resolution.ts` `lookupShareParams()` | [已核实] Explore 保留低权重 Copy link。 |
| 既有分享控制 | `src/components/keyboard-notes/share-control.tsx` | [已核实] 当前只支持页面状态 URL 与 native share/copy，不是 Practice preset serializer。其成功文案存在 `Share sheet opened` 语义问题，S1 不复用该文案。 |
| Dialog 模式 | `src/components/a-minor/page-search.tsx` + `a-minor.css` 的 native `<dialog>` / backdrop | [已核实] Practice Share/Exit 复用 native dialog、Escape 和焦点返回模式；内容和布局保持 S1 局部。 |
| Tabs | 当前 S1 `ModeTabs` | [已核实] 仓库没有通用 tabs primitive；保留局部语义组件并补齐 Left/Right/Home/End + Enter/Space 行为。 |
| Icon | `src/components/a-minor/icon.tsx` | [已核实] 仅复用现有 play/search/left/right/close 图标；不新增图标依赖或手绘第二套图标。 |

## 5. 状态映射

| v2 状态 | 项目 token / 非颜色标识 |
|---|---|
| focused | [已核实] `--ring` + 虚线外轮廓；不等于 selected。 |
| selected | [已核实] `--piano-note-selected` + `--piano-note-mark` + `●`。 |
| wrong | [已核实] `--error` + 错选音名 + `×`；不高亮正确键。 |
| correct | [已核实] `--piano-note-selected` + `--piano-note-mark` + 音名 + `✓`。 |
| hint | [已核实] `--surface` 提示带 + 文字；不选中琴键。 |
| revealed | [已核实] 与 correct 相同琴键可见答案，但配合 `Answer revealed` 文案与 revealed 计分桶。 |

## 6. 已确认 GAP

- [已核实] 当前仓库没有 Practice versioned preset serializer / receiver owner；现有 `ShareControl` 只能恢复 lookup 页面状态。
- [已核实] 当前生产 trainer 没有 first/help/revealed 三桶、去重 review session、原成绩不可变回返与 Practice share dialog。
- [已核实] 当前仓库没有可直接复用的通用 Tabs 或通用 Dialog 组件；已有的是页面搜索专用 native dialog 实现。
- [推断] 本轮可在双重门控 S1 中使用明确的开发态状态夹具展示 Share/Receiver，并在 `UI_IMPLEMENTATION_MAP.md` 标记；依据是 `CODEX_PROMPT.md` 明确允许 S1 对缺失业务能力这样处理。

