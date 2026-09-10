# 07-site-integration P1 定点修复

日期：2026-09-10  
状态：`fix_implemented`，开发停止，等待独立复验。  
依据：`checks/reviews/07-site-integration/review.md` 的唯一必须修复项 P1。

## 修复范围

[已核实] 只修改 `/` 与 `/tools` 共用的首屏标题样式。页面 URL、职责、文案、数据、路由、链接、交互、`noindex/nofollow`、静态资源和组件边界均未改变；01–06 产品功能未修改。

产品样式文件：

- `src/components/integration/integration.css`

为锁定 P1 新增断言的测试文件：

- `scripts/check-integration-batch.mjs`
- `scripts/check-integration-production.mjs`

其余变更仅为当前状态、测试产物和本修复记录。

## 样式前后值

| 项目 | 修复前 | 修复后 |
|---|---|---|
| H1 字号 | 桌面 `clamp(2.75rem, 7vw, 5.75rem)`；1440px 实测 92px | `var(--pr-type-h1-size)`；1440px 实测 36px |
| 移动 H1 字号 | `clamp(2.55rem, 13vw, 4rem)`；390px 实测 50.7px | `var(--pr-type-h1-size)`；390px 实测 30px |
| H1 行高 | `.94`；实测桌面 86.48px、移动 47.658px | `var(--pr-type-h1-leading)`；实测桌面 43.9992px、移动 36px |
| H1 最大宽度 | `10ch` | `24ch` |
| 标题区最大宽度 | `58rem` | `46rem` |
| 标题区桌面留白 | `4rem 3rem` | `2rem 1.5rem` |
| 标题区移动留白 | `2.5rem 2rem` | `1.5rem 1.25rem` |

[已核实] H1 字号和行高现在直接使用既有 design-system token；H1 的原文字距、描述文字、kicker、分隔线及后续页面结构保持不变。

## 实际首屏占比

| 页面 / 视口 | 修复前标题区高度 / 视口 | 修复后标题区高度 / 视口 |
|---|---:|---:|
| `/` / 1440×1000 | 394.30px / 39.43% | 209.34px / 20.93% |
| `/` / 390×844 | 295.27px / 34.98% | 207.95px / 24.64% |
| `/tools` / 1440×1000 | 451.02px / 45.10% | 179.59px / 17.96% |
| `/tools` / 390×844 | 316.89px / 37.55% | 181.92px / 21.55% |

[已核实] 两个新入口页的标题区均低于视口高度 30%；开发态与生产态测试已加入 36px/30px 字号、44px/36px 行高和标题区占比断言。

## 修复后截图

- `/`：[1440px](fixes/home-1440-after.png) · [390px](fixes/home-390-after.png)
- `/tools`：[1440px](fixes/tools-1440-after.png) · [390px](fixes/tools-390-after.png)
- 前后对照：[首页桌面](fixes/home-1440-comparison.png) · [首页手机](fixes/home-390-comparison.png) · [工具桌面](fixes/tools-1440-comparison.png) · [工具手机](fixes/tools-390-comparison.png)
- 只读参考与修复后首页同视口对照：[reference-home-1440-comparison.png](fixes/reference-home-1440-comparison.png)
- 原始测量：[before-metrics.json](fixes/before-metrics.json) · [after-metrics.json](fixes/after-metrics.json)

## 指定命令的实际结果

| 命令 | 结果 |
|---|---|
| `npm run check:foundation` | PASS：560/560 |
| `npm run check` | PASS：Foundation 560/560；TypeScript、Tailwind v4 通过 |
| `node scripts/check-integration-data.mjs` | PASS：153/153 |
| `node scripts/check-integration-batch.mjs` | PASS：190/190 |
| `npm run build` | PASS：静态生成 17 条业务路由与 `/_not-found` |
| `node scripts/check-integration-production.mjs` | PASS：114/114 |

[已核实] 无代码阻塞。未执行独立复验、真机、屏幕阅读器人工长流程、浏览器原生打印对话框、实体打印或部署。

## 下一步

[已核实] 开发已停止。请在独立验收对话再次发送：

```text
请读取 docs/tasks/batch-implementation/CONTINUE-HERE.md，执行“验收当前批次”。
开发已暂停；只输出验收报告和测试产物，不修改产品代码。
```
