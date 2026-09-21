# PianoGrid 前端组件一致性检查

日期：2026-09-21。  
规则：`docs/design/COMPONENT-RULES.md` 版本 2026-09-21（从当前工作区副本读取；`origin/main` 上尚无该文件）。  
基线：[已核实] `origin/main` `@73841cd`（Add Microsoft Clarity on production…）。  
工作副本：独立 worktree `piano-component-audit`，分支 `audit/component-consistency`。原仓库未提交改动未覆盖、未回滚。  
未提交、未推送、未部署。未运行 `shadcn init`，未新增或升级依赖。

证据标记按 `docs/design/design-system.md`：

- **[已核实]**：源码、调用点或本轮浏览器/检查命令的直接观察。
- **[推断]**：由代码结构或时序推出，不是新的视觉设计。
- **待确认**：需要产品或依赖授权才能继续。

Foundation 文档中的“不创建组件 / 尚无页面”是 2026-09-09 初始化记录。当前实现以源码为准。

## 1. 方法

1. 对照共享组件、页面 CSS 和调用点盘点按钮、图标按钮、输入、选择器、单选/复选、分段、折叠、弹层和菜单。不按标签数量判断重复。
2. 只记录语义或状态规则相同、且证据明确的组件层问题。
3. 优先复用或扩展已有组件；迁移前确认关闭、焦点和选择行为等价。
4. 钢琴键盘、谱表和音频实现不抽取为通用控件。
5. “没有使用 shadcn”本身不是缺陷。原生 `select` / `checkbox` / `radio` / `details` 在满足需求时保留。

## 2. 控件盘点

### 2.1 共享组件（`src/components/ui`）

| 组件 | 用途 | 调用点 [已核实] |
|---|---|---|
| `breadcrumb` | 页面路径 | 内容页头 |
| `site-brand` | 站名 | 页头/页脚 |
| `rolling-text` | 练习按钮文字滚动 | `keyboard-notes-workspace` |
| `collapsible` | 受控折叠，含 `aria-expanded` / `aria-controls` | `songs/practice-plan.tsx`、`sheet-music/edition-access.tsx`；本轮起 `labeled-full-reference-collapsible.tsx` |
| `dialog`（本轮新增） | 原生 `<dialog showModal>` 包装 | `page-search.tsx`、`share-control.tsx`、`teaching-pack.tsx`、`keyboard-notes-workspace.tsx` |

### 2.2 按钮与图标按钮

- 内容页主操作使用 `.am-button`（`.am-primary` / `.am-secondary` / `.am-tertiary`），作用域在 `.am-page`。[已核实]
- 首页使用 `.ph-button`，视觉合同不同，不是同一套状态规则。[已核实]
- 图标按钮：搜索、关闭、导航 chevron。关闭现已走 `DialogClose`（默认 `aria-label="Close"`，最小命中区继承 `.am-button`）。[已核实]
- 领域文字按钮（`kn-v2-text-button`、`kn-v2-leave`、琴键）保留在业务目录。[已核实]

**未抽取 `Button`。** 共享 CSS 类不等于重复实现。强行合并会把首页、工具页和领域控件绑到同一 API。

### 2.3 输入、选择器、单选/复选

- 搜索框：`#page-search-input`，`label htmlFor` 已关联。[已核实]
- 布局选择：原生 `<select>`（`LayoutChoice`、keyboard size）。[已核实]
- 复选：labeled「Octave numbers」用包裹 `<label>`。[已核实]
- 单选：teaching pack 纸张/页组、A minor 把位、songs 筛选。原生 radio + `fieldset`/`legend` 或可见代理。[已核实]

### 2.4 分段选择

- A minor 把位：radio + `.am-segment`，不是 Tabs。
- keyboard-notes：`role="tablist"` 的 Explore/Practice。
- teaching pack 预览：`aria-pressed` 缩略图。

语义不同，未合并。

### 2.5 折叠

- 共享 `Collapsible`：songs 步骤、sheet-music 技术细节、labeled 全键盘参考（本轮迁入）。
- 原生 `details`：FAQ、teaching pack 无障碍文本、labeled guide。简单展开，保留。

### 2.6 弹层与菜单

本轮前：

| 表面 | 实现 | 问题 |
|---|---|---|
| A minor 页内搜索 | 手写 `<dialog>` | 关闭/焦点逻辑与其他弹层分叉 |
| Share | 手写 `<dialog>` | 同上 |
| 练习退出 | 手写 `<dialog>` | 同上 |
| Teaching pack 打印 | `role="dialog"` 自定义层 | 无原生焦点陷阱；关闭钮 36px；双重 focus 清理 |
| Labeled More | 条件渲染面板 | 无 Escape / 点外关闭 / `aria-controls` |
| 站点目录三级菜单 | 自定义 hover+click | 桌面再次点击不能收起 |

站点导航仍是自定义 mega-menu，不是通用 Menu。本轮只修桌面 toggle，不抽取导航。

## 3. 本轮问题与处理

| ID | 位置 | 差异或缺陷 | 处理 | shadcn |
|---|---|---|---|---|
| D1 | `teaching-pack.tsx` `PrintOptionsDialog` | 自定义 modal：无原生 `showModal` 陷阱；`.pg-teaching-pack-dialog-close` 36×36；Escape 与 focus 各写一套，卸载时可能双重回焦 | 迁到共享 `Dialog`；保留 `#pg-teaching-pack-print-dialog` 与 `.pg-teaching-pack-dialog` | 不采用。shadcn Dialog 依赖 Radix，本轮无新依赖授权。原生 `<dialog>` 已覆盖焦点陷阱、Escape、backdrop |
| D2 | `share-control.tsx` `ShareDialog` | 与搜索/退出各自维护 `showModal` / `close` / 回焦 | 迁到 `Dialog`，保留 `.kn-share-dialog` | 同上 |
| D3 | `a-minor/page-search.tsx` | 手写 `<dialog>`；结果点击与关闭回焦竞态 | 迁到受控 `Dialog`；结果目标写入 `pendingSection`，关闭后再 `focus` 区块 | 同上 |
| D4 | `keyboard-notes-workspace.tsx` 退出确认 | 手写 `<dialog>` | 迁到 `Dialog`；`initialFocusRef` 指向 Keep practicing | 同上 |
| C1 | `labeled-full-reference-collapsible.tsx` | 自写折叠，与共享 `Collapsible` 合同重复 | 改为包装 `Collapsible`；labeled 只保留卡片间距 | 已有手写 Collapsible，不引入 Radix Collapsible |
| C2 | `collapsible.css` | 触发器 `min-height: 2.5rem` / plain `0`；焦点用 `--primary` | `min-height: var(--pr-control-min-size)`（44px）；`outline` 用 `--pr-focus-width` + `--ring` | 否 |
| M1 | `labeled-experience.tsx` More | 无 `aria-controls`、Escape、点外关闭、回焦 | 补 `useId`、点外、Escape 回 More。仍是 disclosure，不是 dialog | 不采用 DropdownMenu（需 Radix） |
| N1 | `site-navigation.tsx` 桌面目录 | `onClick` 只 `setOpen(menuKey)`，已开项无法点关 | 改为 toggle | 不把 mega-menu 改成 shadcn NavigationMenu |

### 3.1 新增或复用

- **新增** `src/components/ui/dialog.tsx` + `dialog.css`：`showModal`、`labelledBy` / `describedBy`、backdrop 点击、Escape/`cancel`、关闭回焦（焦点已在层外则不抢）、可选 `initialFocusRef`、`DialogClose`。视觉用 `--popover`、`--pr-overlay`、`--pr-radius-panel`。打印隐藏。
- **复用** `Collapsible`：labeled 全参考。
- **扩展** `collapsible.css` 命中区与焦点 token。
- **未新增** Button、Input、Select、Tabs、DropdownMenu。

### 3.2 影响页面

| 页面 | 变化 |
|---|---|
| `/chords/a-minor` | 页内搜索用共享 Dialog |
| `/keyboard-notes/labeled` | Collapsible、More、Share、打印弹层 |
| `/keyboard-notes` | 练习退出、Share；练习开始区两个 `details` 默认展开，并共用 `+/−` 触发器样式 |
| `/songs/easy` | Share；Collapsible 触发器 44px / 焦点 token |
| `/sheet-music/*` 使用 `SheetEditionAccess` 的页面 | 仅 Collapsible CSS |
| 全站导航 | 桌面 Chords/Scales 三级菜单可再点关闭 |
| 其他 ShareControl 调用页 | 同一 `ShareDialog` |

### 3.3 检查白名单

`scripts/check-foundation.mjs` 将 `dialog.tsx` / `dialog.css` / `collapsible.css` 列入组件与 pageCSS 白名单。`checks/batches/07-site-integration/*` 为该检查生成的快照。

## 4. 保留的原生或业务实现

| 实现 | 理由 |
|---|---|
| 原生 `select` / `checkbox` / `radio` | 标签、禁用、键盘已够用；替换 shadcn 无收益且可能要依赖 |
| 原生 `details` FAQ / 无障碍文本 | 简单披露，浏览器已处理键盘 |
| `.am-button` / `.ph-button` CSS | 共享样式，不是第二套组件实现 |
| 站点 mega-menu | hover、延迟关闭、目录三级联动；抽成通用 Menu 会加大量开关 |
| Labeled More 面板 | 工具栏 disclosure，不是模态 |
| 把位 radio、练习 tabs、preview thumbs | 语义不同 |
| 钢琴键盘、谱表、音频、`RollingText` | 领域实现 |

## 5. 验证

### 5.1 命令 [已核实]

| 命令 | 结果 |
|---|---|
| `npm run check:foundation` | 568 passed, 0 failed |
| `npm run typecheck` | 通过 |
| `npm run check:css` | 通过 |
| `npm run check` | 通过 |
| `npm run build` | Next.js 16.3.4 编译通过；211 页静态生成完成 |

未运行：`check-a-minor.mjs`、`check-b06-browser.mjs`、`check-keyboard-practice.mjs`、`check-integration-production.mjs`、读屏、真机、打印实打、听音。这些脚本依赖 Playwright 路径或生产 origin，且会写既有验收目录。本轮用本地 dev（`localhost:3121`）做代表页交互。

构建通过 ≠ 交互或无障碍全部通过。

### 5.2 浏览器（Cursor 内嵌 Chrome）[已核实]

开发态 Next.js hydration overlay 会挡住点击。脚本验证前移除 `nextjs-portal`。Escape 用 dialog 上的 `keydown` 派发（与组件处理程序一致）；原生 OS Escape 在 overlay 存在时不可靠。

| 页面 / 视口 | 结果 |
|---|---|
| `/chords/a-minor` 桌面 | 打开搜索后输入框获焦；Escape 关闭并回到 “Search this page”；选结果后焦点到 `#am-result`，弹层关闭 |
| `/keyboard-notes/labeled` 桌面 | “View the full reference” 可展开/收起，触发器 `min-height: 44px`；打印弹层打开后关闭钮 44px、焦点在 Close；Close / Escape 回到 “Print this pack”；Share Escape 回到 “Share reference” |
| `/keyboard-notes/labeled` 390×844 | More 44px，`aria-controls` 指向面板；Escape 关闭并回 More；点外关闭。打印层 `inset` 靠底、宽约 358px、圆角 12px |
| `/chords` 桌面 | Open Chords menu 后，Major / More 子菜单再点可关 |
| `/songs/easy` 桌面 | “Read all five steps” 44px，可收起/展开；Share Escape 回到 “Share this plan” |
| `/keyboard-notes` 桌面 | 进入练习后 Exit 打开 “Leave this round?”；初始焦点 Keep practicing；关闭钮 44px；Escape 回 Exit 且不丢局 |

### 5.3 未验证

- 真机触控、系统读屏、强制色、200% 文字缩放、实际打印/PDF。
- `/sheet-music/*` Collapsible 仅推断 CSS 命中区变化，未点选。
- 原生 `<dialog>` 的 UA 焦点环在每种浏览器中的细节。
- `site-navigation.tsx:244` 开发态 hydration overlay。[推断] 与本轮 `onClick` toggle 无关（handler 不影响首屏 HTML）。A minor 上此前也有 hydration 提示。待确认是否 main 上已存在。

## 6. 剩余决策

1. **是否引入 Radix / shadcn 依赖。** 本轮用原生 `<dialog>` 统一模态。若以后要做完整菜单、Combobox 或非模态 Popover，需要授权具体组件及依赖（通常 `@radix-ui/react-dialog` 或 `@radix-ui/react-dropdown-menu`），不能用手写半套焦点管理凑。
2. **是否抽取共享 `Button`。** 仅当明确要求统一首页 `.ph-button` 与内容页 `.am-button` 时再做。当前不是缺陷。
3. **站点导航是否改为 Navigation Menu。** 现为自定义 mega-menu。改为 shadcn/Radix 会改 hover 延迟和三级目录，超出本轮组件层修复。
4. **More 是否升级为 Popover。** 当前 Escape/点外已够用。Popover 需要依赖授权。
5. **分段控件是否统一。** radio 分段、Tabs、pressed thumbs 应保持分开。
6. **hydration。** 开发 overlay 指向 `site-navigation.tsx` `renderCatalogDesktopPanel`。不在本轮改导航结构来“修”未证实的 hydration。

## 7. 本轮未做且不是缺陷

- 未把按钮、输入、select 改成 shadcn。
- 未改文案、音乐数据、URL、SEO、产品功能。
- 未重设计页面或套用 shadcn 默认外观。
- 未把琴键命中区改成 44px。
- 未合并语义不同的分段或菜单。
- 未创建未使用的组件。
