# Keyboard Notes B02/B03 — Route Diff

## 结论

- [已核实] 新增公开 URL：`0`。
- [已核实] 删除公开 URL：`0`。
- [已核实] `src/app/**/page.tsx`、`src/lib/site-routes.ts`、sitemap 与 robots 文件没有本轮修改。
- [已核实] 正式入口仍为 `/keyboard-notes`；`#note-trainer` 仍是同页锚点，并打开 Practice Start。

## 同页状态参数

| 参数 | 允许值 | 用途 |
|---|---|---|
| `practice` | `v1` | preset schema 版本 |
| `practice-option` | 四个白名单 option 之一 | 练习范围与题型 |
| `practice-seed` | `0…4294967295` 整数 | 确定性题序 |
| `practice-count` | `10` | 固定题数 |

- [已核实] 参数只还原任务，不包含答案、成绩或身份。
- [已核实] 查询 URL 的 canonical 仍指向无查询参数的 `/keyboard-notes`。
- [已核实] `practice-sample`、`practice-receiver` 与原型 `?view=` 没有进入正式组件路径。

## 行为变化而非路由变化

- [已核实] 普通 `/keyboard-notes` 默认显示批准的 Explore 工作区。
- [已核实] 带合法 practice preset 的同一路径显示 Practice Start；接收者主动点击后才开始。
- [已核实] 非法 preset 不重定向、不创建新 URL，显示安全恢复入口。

