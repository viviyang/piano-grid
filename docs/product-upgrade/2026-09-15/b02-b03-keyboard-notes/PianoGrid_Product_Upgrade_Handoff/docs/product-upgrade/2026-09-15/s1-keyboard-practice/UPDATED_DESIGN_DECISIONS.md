# PianoGrid `/keyboard-notes` S1 — Updated Design Decisions v2

状态：`APPROVED_FROZEN`  
确定稿：`docs/design/keyboard-notes-v2/`  
范围：仅双重门控 clickable S1；不进入 B02/B03，不部署、不推送、不新增公开 URL。

本文件替换上一次未批准样板的实现决策；布局、层级和状态来自 v2 确定稿，颜色、字体、头尾与基础组件来自项目现有合同。

## 1. 产品结构

- [已核实] Explore notes 与 Practice notes 是同一工作区的两个 ARIA tab，不是两个纵向产品 Card。
- [已核实] 默认 Explore；音名与 keyboard 是第一视觉层级，搜索、范围、picker、Copy link 是次级能力。
- [已核实] reference/SEO 内容继续由真实页面内容模型输出，但在工具与 Practice CTA 之后。
- [已核实] 页面 H1、metadata、canonical、robots、sitemap、导航与全站主题没有改变。

## 2. Explore

- [已核实] 默认 C4 / Middle C；Hear C4 是主要动作。
- [已核实] 使用真实 88-key layout 数据，桌面可见 C3–C5、移动可见 C4–C5；range controls 与 minimap 表达其在 88 键中的位置。
- [已核实] 搜索使用现有 pitch resolver；精确目标会调整可见窗口，越界/非法输入保留错误信息。
- [已核实] `Share this note` 不作为主要能力；仅保留低权重 Copy link。

## 3. Practice

- [已核实] 流程固定为 Start → Question 1/10 → contextual feedback → Result，没有默认 tutorial question。
- [已核实] 题目使用现有真实 generator，每轮随机；不写死题序与成绩。
- [已核实] Practice 使用 C4–C5 局部 keyboard；默认自然音，现有其他 option 放在折叠 options 中。
- [已核实] 首错只标错选键；Try again 清除错选；Hint 只解释目标位置；Show answer 才标 revealed target。
- [已核实] D 的位置文案为 “between the two black keys”。
- [已核实] first try / with help / revealed 三桶互斥；missed notes 去重；review 不覆盖原始结果。

## 4. Action hierarchy

| 状态 | Primary | Secondary | Tertiary / separated |
|---|---|---|---|
| Explore | Hear note | Practice notes / Find | Copy link / range / picker |
| Start | Start 10-note practice | 无 | Explore first / options |
| Question | 琴键选择 | Hint | Show answer；Leave practice 分离 |
| Wrong | Try again | Hint | Show answer；Leave practice 分离 |
| Correct / revealed | Next note / See results | 无 | Leave practice 分离 |
| Result | Review missed notes | Share practice | Practice again / Back to explore |
| Receiver | Start 10-note practice | 无 | Explore first |

## 5. 视觉合同

- [已核实] 使用 `--background`、`--foreground`、`--primary`、`--border`、`--surface`、`--error`、piano tokens 与 `--pr-font-sans`；没有截图取色覆盖主题。
- [已核实] 主要结构依靠留白、排版与轻分隔，不增加渐变、玻璃、装饰 icon、无意义动画或 Card 套 Card。
- [已核实] `.am-button` 继续提供 Primary/Secondary/Tertiary；一个状态只有一个明显 Primary。
- [已核实] Desktop dialog 居中，Mobile 变为 bottom sheet。

## 6. Owner 与 GAP

- [已核实] Keyboard、pitch、trainer、audio、lookup link 与 share helper 复用情况见 `UI_IMPLEMENTATION_MAP.md`。
- [已核实] 真正 GAP 是 Practice preset serializer/validator/receiver、生产 trainer 三桶+review 持久模型、通用 tabs/dialog primitive。
- [已核实] Share/Receiver 只作为门控 S1 设计夹具；不声称完成 B03。

## 7. 验证边界

- [已核实] Desktop 1440×1000 与 Mobile 390×844 已按状态截图；320/768 无整页横向溢出。
- [已核实] `npm run check`、Keyboard Notes 专项 40/40、`npm run build` 通过。
- [已核实] 真机、听音、读屏、iOS Share Sheet 仍待人工验证，见 `MANUAL_CHECKS.md`。

## 8. 2026-09-16 密度与分享可发现性修正

- [已核实] Start 不再只由居中的短标题和大片留白构成；改为主任务说明与 “After the round” 结果预告并列，明确结果、错题复习与分享练习三个后续价值。
- [已核实] Question / Review 顶部改为任务类型、明确题号、分段进度与独立的 Leave practice；不再把题号和离开动作悬置在大面积空白中。
- [已核实] 题目标题改为完整语义 “Find {note}”，并增加 “Choose the matching key” 与黑键组定位提示；音名仍保持主视觉层级，但不再成为缺少上下文的孤立字符。
- [已核实] 每道普通题都提前说明完成一轮后可以 review missed notes 并分享 fresh practice；该提示是低权重说明，不与当前答题动作竞争。
- [已核实] 分享措辞继续严格对应现有 S1 能力：分享的是 fresh practice，不是成绩、答案或已完成 B03 的 challenge payload。
- [已核实] Desktop 与 Mobile 均压缩了 panel、标题、键盘、反馈之间的垂直间距；没有新增配色、Card 套 Card、装饰 icon、公开 URL 或第二套 keyboard/trainer/audio owner。
- [已核实] S1 的文字 action buttons 与低权重文字按钮复用首页 Hero CTA 的现有 `RollingText` 动效；模式 tabs 保持静态文字，仅用选中下划线表达状态。钢琴琴键继续使用答案/发声状态，纯图标关闭按钮继续使用原有反馈，避免把装饰动效混入核心乐器交互。
- [已核实] 动效同时响应 hover 与键盘 `focus-visible`，并继续受全站 `prefers-reduced-motion` 规则约束。
- [已核实] Mobile 的 88-key overview 是低高度位置指示条，不承担逐键点击；修正选择器优先级后，390px 视口下内部 keyboard 高度为 22.4px、overview 总高度为 35.2px，主键盘仍保持 C4–C5 的可点击尺寸。
