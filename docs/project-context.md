# PianoGrid — Project Context

## 当前状态

- [已核实] 正式品牌为 `PianoGrid`，站点域名为 `https://pianogrid.com`；域名已写入 metadata、canonical、Open Graph、WebSite JSON-LD、manifest、robots 与 sitemap，部署和索引开放仍未执行。
- [已核实] 本项目根目录为 `piano/`；07-site-integration 初次独立验收为 `NEEDS_FIX`；唯一 P1 已定点修复，状态为 `fix_implemented`，开发已停止等待独立复验。
- [已核实] Foundation 与 00–06 成果保留。06 独立报告为 `PASS_WITH_NOTES`，用户已确认通过；报告中的自动化等待时序备注不阻塞 07。
- [已核实] 首轮 17 条路由已实现：`/`、`/tools`，以及既有四条 chords、三条 keyboard-notes、三条 scales、两条 songs、两条 guide 与 `/tools/blank-sheet-music`。

## 技术与结构

- [已核实] Next.js 16.3.4、React 19.2.8、TypeScript 5.9.3、Tailwind 4.3.3；依赖和锁文件未变。
- [已核实] T01/T02 位于 `src/components/integration`；服务器读取层 `src/lib/integration-content.ts` 只接受 `/` 与 `/tools`，并核验模板、block、来源状态和两份公开 PDF 的字节身份。
- [已核实] `SiteHeader` / `SiteFooter` 现在为首轮六个栏目提供真实导航；当前栏目使用 `aria-current`，品牌返回首页。页面级搜索仍只在原页面范围内工作。
- [已核实] 首页按六个实际任务组织入口；Sheet Music 未实现，因此显示为不可用文字。工具中心提供琴键、和弦、音阶三个查阅入口，以及空白谱纸和入门阅读 PDF；规划中的项目没有生成链接或路由。

## 运行与验证

- [已核实] `npm run check` 通过：Foundation 560/560，TypeScript 与 Tailwind v4 真实编译通过。
- [已核实] 07 数据检查 153/153、修复后开发态浏览器检查 190/190、生产态检查 114/114；Next.js 生产构建成功并静态生成 17 条业务路由与 `/_not-found`。
- [已核实] 00–06 相关数据、浏览器与生产回归均通过；07 回归产物集中在 `checks/batches/07-site-integration/regression/`。
- [已核实] 首页与工具中心覆盖 1440/390 截图、320/768 边界、200% 文本、无脚本基础阅读、键盘焦点、深链和真实文件响应。

## 保留限制

- [已核实] 全站 127 URL 规划未改变；本轮只实现首轮 17 条，91 条后做与 19 条暂停项仍留在台账，没有生成占位路由。
- [已核实] 未生成动态路由、`route.ts`、sitemap 或可索引 metadata；没有部署、commit 或 push。
- [已核实] 外层 Git 忽略规则使本项目源码不进入 `git status` 差异；本批以 `source-before.json`、`source-after.json`、`changed-files.json` 和哈希核对记录实际变化。
- [已核实] 真人听音、真机、屏幕阅读器人工长流程、浏览器打印对话框、实体打印、全部外链人工访问、专业音乐审阅、部署未执行；07 独立复验尚未执行。

## 入口

- [唯一进度](tasks/site-implementation-plan.md)
- [07实施记录](../checks/batches/07-site-integration/implementation.md)
- [07 P1定点修复](../checks/batches/07-site-integration/fixes.md)
- [首轮汇总](../checks/batches/round-1-summary.md)
- [组件契约](design/component-spec.md) / [模板映射](design/template-map.md)
- [行为边界](../AGENTS.md)

最后更新：2026-09-10。
