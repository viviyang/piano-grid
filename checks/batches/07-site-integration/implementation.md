# 07-site-integration 实施记录

日期：2026-09-10  
状态：初始实施记录；后续独立验收为 `NEEDS_FIX`，P1 定点修复见 [fixes.md](fixes.md)，当前等待独立复验。

## 1. 批次与状态

[已核实] 本批按 `07-site-integration.md` 新增 `/`（T01）与 `/tools`（T02），并联调首轮全部 17 条路由。Foundation 与 00–06 成果保留；06 独立报告结论为 `PASS_WITH_NOTES`，用户已确认上一批验收通过。

[已核实] 本地实现、自测、受影响旧页回归和生产构建均完成。本记录完成后，07 初次独立验收为 `NEEDS_FIX`；唯一 P1 已定点修复，当前仍不写成 `review_passed`，也不代表部署授权。

## 2. 交付内容

### T01 首页 `/`

- [已核实] 读取 F-Homepage 的 `/` 对象，使用源 title、description、canonical path、三段正文与任务文案。
- [已核实] 以六个钢琴任务组织入口。琴键、和弦、音阶、选曲与指南链接到当前真实路由；Sheet Music 保持 `Not yet available`，没有链接或占位页。
- [已核实] 提供工具与打印资料入口，并保留“找音符—选择版本—确认版本”与“免费/付费/订阅”原文说明。

### T02 工具中心 `/tools`

- [已核实] 三个查阅动作分别指向 `/keyboard-notes/chart`、`/chords`、`/scales`，每项说明输入和实际结果。
- [已核实] 两项可用打印资料分别指向 `/tools/blank-sheet-music` 与 `/assets/guides/piano-starter-and-reading.pdf`；公开 PDF 与源文件字节一致。
- [已核实] `/chords/finder`、piano cheat sheet、blank keyboard、finger numbers 仍未实现，在原生 `details` 中显示规划状态，没有可点击目标。

### 首轮整合

- [已核实] `SiteHeader`/`SiteFooter` 现在提供 Home、Keyboard Notes、Chords、Scales、Songs、Guide、Tools 的实际导航；当前栏目使用 `aria-current`，品牌返回首页。
- [已核实] 为此前缺失的 10 条路由补齐源 canonical path；全部 17 条路由继续保留 `noindex/nofollow`。
- [已核实] 共享导航在 320、390、768、1440 及 200% 文本下可换行并保持可见。没有新增全站搜索、动态路由、`route.ts`、sitemap、依赖或部署配置。
- [已核实] `integration-content.ts` 只允许读取 `/` 与 `/tools`，核验 T01/T02、block 顺序、P113、发布规划状态、可用目标白名单与公开文件身份；客户端不接收 master、来源台账或问题台账。

### 维护的测试合同

- [已核实] Foundation 白名单扩大到首轮 17 路由，长期保护断言保留。
- [已核实] 旧批浏览器脚本明确接受 `/` 与 `/tools` 为 07 已实现路由；输出目录可通过 `PIANO_CHECK_OUT` 隔离到本批回归证据。
- [已核实] 06 缩放检查在 390px 下等待受控状态更新后验证预览区局部滚动；A minor 回归同步验证现有 canonical 与全站真实导航链接。

## 3. 页面、截图与证据

- [已核实] 本地首页：<http://localhost:3000/>
- [已核实] 本地工具中心：<http://localhost:3000/tools>
- [已核实] 桌面截图：`screenshots/home-1440.png`、`screenshots/tools-1440.png`
- [已核实] 手机截图：`screenshots/home-390.png`、`screenshots/tools-390.png`
- [已核实] 边界与文字放大：`screenshots/*-320.png`、`*-768.png`、`*-text200.png`
- [已核实] 只读参考与首页同视口对照：`screenshots/comparison-1440.png`
- [已核实] 路由覆盖：`coverage.json`；最终测试：`test-summary.json`；生产证据：`production/production-validation.json`
- [已核实] 变更与保护源：`source-before.json`、`source-after.json`、`changed-files.json`、`source-hash-verification.json`

## 4. 实际测试结果

| 范围 | 最终结果 |
|---|---:|
| `npm run check` | Foundation 560/560；TypeScript 通过；Tailwind v4 通过 |
| 07 数据 | 153/153 |
| 07 开发态浏览器 | 178/178 |
| 07 生产态浏览器 | 102/102 |
| 01 Chords + A minor | 233/233 + 162/162 |
| 02 Keyboard Notes | 数据 1709/1709；降级 21/21；浏览器 1660/1660；生产 48/48 |
| 03 Scales | 数据 620/620；降级 30/30；PDF 46/46；浏览器 330/330；生产 63/63 |
| 04 Songs | 数据 902/902；浏览器 119/119；生产 54/54 |
| 05 Guides | 数据 157/157；浏览器 77/77；生产 57/57 |
| 06 Blank Sheet | 数据 119/119；PDF 20/20；浏览器 60/60；生产 58/58 |
| `npm run build` | 通过；静态生成 17 条业务路由与 `/_not-found` |
| 保护源哈希 | 81/81 未变 |

[已核实] 开发过程中的诊断性失败包括：服务未启动、旧页缺 canonical、200% 文本溢出、Next 开发服务器拒绝 `127.0.0.1` HMR 跨源连接，以及旧脚本在桌面宽度错误假设缩放一定溢出。这些问题分别通过启动服务、补 metadata、调整移动断点、改用同源 `localhost` 顺序回归和在 390px 验证局部滚动解决；最终结果如上，原始原因记录在 `test-summary.json`。

[已核实] 无代码阻塞。未测试：真人听音与试弹、真机、屏幕阅读器人工长流程、原生打印对话框、实体打印、全部出版方外链逐一访问、进一步专业音乐/内容审阅、部署与线上域名行为、07 独立验收。

## 5. 下一步

[已核实] 开发现已停止。请在独立验收对话发送：

```text
请读取 docs/tasks/batch-implementation/CONTINUE-HERE.md，执行“验收当前批次”。
开发已暂停；只输出验收报告和测试产物，不修改产品代码。
```

[已核实] 独立验收目标应由唯一进度文件定位为 `07-site-integration`。本批不授权后做 91 页、暂停 19 页、部署或取消 noindex。
