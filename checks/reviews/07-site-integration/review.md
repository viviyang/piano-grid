# 07-site-integration 独立验收报告

日期：2026-09-10  
结论：**NEEDS_FIX**

## 验收范围与冻结

- [已核实] 唯一待验收批次为 `07-site-integration`；本批新增 `/`（T01）及 `/tools`（T02），并复核首轮 17 条授权路由。
- [已核实] 当前 HEAD 为 `29d9c472fbc675ab6a5e39d7d9ad4cd721c6c232`。`changed-files.json` 的 33 个当前文件 SHA-256 全部匹配冻结后的 `after` 哈希。本审查未修改产品源码、内容、样式、依赖、锁文件、规则或进度记录。
- [已核实] `docs/workspace-context.md` 不存在；这是文档缺项，按独立验收权限未补写。

## 发现

### P1 — 两个新入口页使用了被禁止的大型营销式首屏

- URL：`/`、`/tools`
- 任务/规范：`07-site-integration.md` 第 16 行要求“不做巨大营销Hero”；`docs/design/design-system.md` 将 H1 定为桌面 36px、移动 30px。
- 代码位置：`src/components/integration/integration.css:1-2`
- [已核实] `.in-heading h1` 在桌面使用 `clamp(2.75rem, 7vw, 5.75rem)`，最大为 92px；移动媒体查询使用 `clamp(2.55rem, 13vw, 4rem)`，最大为 64px。
- [已核实] 本轮 1440 与 390 截图均显示标题占据首屏的主要面积，分别见 `screenshots/home-1440.png`、`screenshots/tools-1440.png`、`screenshots/home-390.png`、`screenshots/tools-390.png`。
- [推断] 该尺度和首屏结构形成了任务所禁止的“大型营销 Hero”效果，并偏离最终样板的 H1 排版角色；依据是上述已核实的 CSS 数值、任务文本及运行截图。
- 影响：两个 07 新页面的首屏视觉不符合已确认设计系统与本批明确边界，不能以全绿功能测试抵消。
- 最小修复建议：将 `.in-heading h1` 恢复至设计系统的 H1 尺度和行高（桌面 36px / 1.2222，移动 30px / 1.2），保留现有任务导航、正文、链接及可用性逻辑；随后重跑本批截图与浏览器/生产检查。

## 已核实通过项

- [已核实] 首页只提供五个已实现任务的链接；`/sheet-music` 是带“Not yet available”语义的非链接项。
- [已核实] 首页 → 工具中心 → 空白谱纸页面的本地流程可达；工具中心只提供三个已实现查阅入口和两份已公开、字节一致的打印资料。
- [已核实] 展开“3 more printables”仅显示未开放名称，不暴露未授权链接。
- [已核实] 17 条授权路由均保留 metadata、canonical 路径、`noindex`、六个共享导航链接，并未向 HTML 暴露 master/台账字段；八条未授权路由返回 404。
- [已核实] 1440、390、320、768 及 200% 文本的本批浏览器检查通过；无 JS 的 `/` 与 `/tools` 均保留可读正文与导航。

## 独立测试

| 检查 | 结果 | 产物 |
| --- | --- | --- |
| 隔离副本 `npm run check` | PASS：Foundation 560/560；TypeScript、Tailwind v4 编译通过 | `machine/foundation.json`、`machine/tailwind-compile.json` |
| F-Homepage 数据、发布门槛、公开资源字节与只读源 | PASS：153/153 | `machine/data-validation.json` |
| 17 路由、首页/工具中心流程、无 JS、响应式与未授权路由 | PASS：178/178 | `machine/browser-validation.json`、`screenshots/` |
| Next 生产构建 | PASS：17 条业务路由与 `/_not-found` | 本报告的实际命令记录 |
| 生产 metadata、导航、资源、边界与响应式 | PASS：102/102 | `machine/production-validation.json` |
| A minor 共享组件短回归 | PASS：162/162 | `machine/a-minor-regression.json` |

## 审查步骤

1. 首页任务入口与未开放 Sheet Music 状态：**功能健康；视觉需修复**。
2. 首页到工具中心的导航：**健康**。
3. 工具中心的真实下载、未开放披露与深链：**健康**。
4. 17 条路由、生产构建及 A minor 回归：**健康**。

## 未测试

- [未测试] 真机触控、屏幕阅读器人工长流程、浏览器原生打印对话框、实体打印、真人试弹/听音、全部外部出版方链接、部署和线上域名行为。

## 产物

- 当前审查观察：`independent-observations.json`
- 机器结果：`machine/`
- 本轮已检查截图：`screenshots/`

请由开发对话执行“修复当前批次”，仅收紧上述 H1/首屏视觉问题并回归；修复完成后再提交独立复验。该结论不授权部署、取消 `noindex/nofollow` 或新增路由。

---

## P1 修复后的独立复验（2026-09-10）

### 结论

**PASS_WITH_NOTES**

[已核实] 初验唯一 P1 已修复。`src/components/integration/integration.css` 的 `.in-heading h1` 现在直接使用 `var(--pr-type-h1-size)` 与 `var(--pr-type-h1-leading)`；不再使用初验中导致超大营销 Hero 的 `clamp(...)` 字号、`.94` 行高和 `10ch` 最大宽度。

[已核实] 本次在独立开发态与独立生产态运行中，首页和工具中心均为桌面 36px / 约 44px 行高、390px 视口为 30px / 36px 行高；标题区均低于视口高度 30%。实际截图显示两个入口页已回归内容页标题层级，未复现初验 P1。

[已核实] 复验没有发现新的 P0–P3 产品缺陷。首轮 17 条授权路由、两个本批流程、公开资源、metadata、`noindex`、未授权路由 404、无 JavaScript 基础阅读、响应式与共享导航均通过本轮检查。

### 修复范围与保护

[已核实] 当前产品源文件与 07 修复后的交付清单哈希一致；本复验未修改产品代码、源内容、依赖、规则或唯一进度记录。

[已核实] 原始内容、产品规划及只读设计参考的哈希检查通过；数据检查确认 F-Homepage 数据、发布门槛和两份公开 PDF 的字节身份保持正确。

### 实际执行的测试

| 命令 | 实际结果 | 复验证据 |
| --- | --- | --- |
| `npm run check:foundation` | PASS：560/560 | 本次命令输出 |
| `npm run check` | PASS：Foundation 560/560、TypeScript、Tailwind v4 | 本次命令输出 |
| `node scripts/check-integration-data.mjs` | PASS：153/153 | `../../batches/07-site-integration/data-validation.json` |
| `node scripts/check-integration-batch.mjs` | PASS：190/190 | `recheck-dev/validation.json`、`recheck-dev/screenshots/` |
| `npm run build` | PASS：17 条业务路由与 `/_not-found` 静态生成 | 本次命令输出 |
| `node scripts/check-integration-production.mjs` | PASS：114/114 | `recheck-production/production-validation.json`、`recheck-production/screenshots/` |

### 复验步骤

1. 首页 `/` 首屏与任务入口：**健康**。1440px、390px 截图显示 H1 已为内容页层级；五个真实任务链接与未开放 Sheet Music 状态正确。
2. 首页到工具中心再到空白谱纸的流程：**健康**。本地导航、深链和空白谱纸 PDF 响应均通过。
3. 工具中心 `/tools` 的查阅入口、两份公开打印资料和未开放披露：**健康**。未开放目标未被暴露为可用链接。
4. 17 条路由、生产构建、metadata 与边界：**健康**。生产态检查 114/114；没有 runtime error，未授权路径仍为 404。

### 未测试 / 非阻断备注

- [未测试] 真机触控、屏幕阅读器人工长流程、浏览器原生打印对话框、实体打印、真人试弹/听音、全部外部出版方链接、部署与线上域名行为。
- [已核实] 上述项目未由浏览器自动化替代，也不构成本次已复现的产品缺陷；本结论不构成部署授权，也不改变 `noindex/nofollow`。

### 复验产物

- 开发态：`recheck-dev/validation.json`、`recheck-dev/screenshots/home-1440.png`、`recheck-dev/screenshots/home-390.png`、`recheck-dev/screenshots/tools-1440.png`、`recheck-dev/screenshots/tools-390.png`
- 生产态：`recheck-production/production-validation.json`、`recheck-production/screenshots/production-home-1440.png`、`recheck-production/screenshots/production-home-390.png`、`recheck-production/screenshots/production-tools-1440.png`、`recheck-production/screenshots/production-tools-390.png`
