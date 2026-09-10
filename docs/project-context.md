# PianoGrid — Project Context

## 当前状态

- [已核实] 正式品牌为 `PianoGrid`，站点域名为 `https://pianogrid.com`；域名已写入 metadata、canonical、Open Graph、WebSite JSON-LD、manifest、robots 与 sitemap。[用户确认] 域名已经配置；本站代码尚未由本任务部署。
- [用户确认] 01–07 均已通过验收。Foundation 与全部既有页面功能、内容、URL 和关键词规划保留。
- [已核实] 首轮 17 条路由已实现：`/`、`/tools`，以及既有四条 chords、三条 keyboard-notes、三条 scales、两条 songs、两条 guide 与 `/tools/blank-sheet-music`。
- [已核实] 17 条路由现均列入统一公开清单，输出 `index, follow`；`robots.txt` 允许抓取，sitemap 只包含这 17 条正式路径。

## 技术与结构

- [已核实] Next.js 16.3.4、React 19.2.8、TypeScript 5.9.3、Tailwind 4.3.3；依赖和锁文件未变。
- [已核实] T01/T02 位于 `src/components/integration`；服务器读取层 `src/lib/integration-content.ts` 只接受 `/` 与 `/tools`，并核验模板、block、来源状态和两份公开 PDF 的字节身份。
- [已核实] `SiteHeader` 保留六个一级栏目，并以可访问的桌面 disclosure 和手机分组菜单提供 10 个详情入口；当前页面使用 `aria-current`，品牌返回首页。页面级搜索仍只在原页面范围内工作。
- [已核实] 首页按六个实际任务组织入口；Sheet Music 未实现，因此显示为不可用文字。工具中心提供琴键、和弦、音阶三个查阅入口，以及空白谱纸和入门阅读 PDF；规划中的项目没有生成链接或路由。
- [已核实] 各栏目正文也提供已发布子页的上下文链接；17 页均可从首页链接图到达，不依赖直接输入 URL。

## 运行与验证

- [已核实] `npm run check` 通过：Foundation 560/560，TypeScript 与 Tailwind v4 真实编译通过。
- [已核实] 发布数据检查 153/153、浏览器集成检查 232/232、生产检查 124/124、发布 SEO 检查 17/17；Next.js 生产构建成功并静态生成 17 条业务路由、metadata endpoints 与 `/_not-found`。
- [已核实] 导航专项交互检查 11/11；代表页在 320、390、768、800、1024、1440px 的响应式与键盘检查 101/101。
- [已核实] 发布前后对比确认 17 页的 Title、Description、H1 和 canonical path 没有变化。证据位于 `checks/release/public-launch/`。

## 保留限制

- [已核实] 全站 127 URL 规划未改变；本轮只实现首轮 17 条，91 条后做与 19 条暂停项仍留在台账，没有生成占位路由。
- [已核实] 未生成动态路由、`route.ts` 或后续规划页面；没有执行部署、DNS、Google Search Console 或 sitemap 提交。
- [已核实] 真人听音、真机、屏幕阅读器人工长流程、浏览器打印对话框、实体打印、全部外链人工访问和专业音乐审阅仍为人工项目。Guide PDF 的结构标签限制保持记录。

## 入口

- [唯一进度](tasks/site-implementation-plan.md)
- [07实施记录](../checks/batches/07-site-integration/implementation.md)
- [07 P1定点修复](../checks/batches/07-site-integration/fixes.md)
- [首轮汇总](../checks/batches/round-1-summary.md)
- [公开发布检查](../checks/release/public-launch/report.md)
- [组件契约](design/component-spec.md) / [模板映射](design/template-map.md)
- [行为边界](../AGENTS.md)

最后更新：2026-09-10。
