# PianoGrid — current stage: public launch live, final public-build review and human gates pending

用户已确认这是空项目，从本目录作为项目根目录开始，不要再寻找“旧仓库”。
Foundation、00–08 与首轮 17 条路由已完成；08 独立结论为 `PASS_WITH_NOTES`。`https://pianogrid.com` 已部署到 Vercel，17 条路由当前公开并输出 `index,follow`，robots 与 sitemap 已上线。当前检查点是最终公开构建的独立复验，以及具名专业审阅、真机、读屏、打印、听音、PDF 无障碍决定和上线后观察。历史报告保持原貌，当前状态以 `docs/release/release-readiness.md` 与 `docs/tasks/site-implementation-plan.md` 为准。

## Read first

1. docs/design/design-system.md
2. docs/design/inspection.md
3. docs/design/tokens.json
4. docs/product/url-plan.final.json
5. docs/product/Piano_全站统一规划_最终版.md（未取得则记录，不重写伪造）
6. docs/content/site-master/F-Homepage/ 与本轮已实现页面的内容包、页面数据、来源台账和问题台账
7. docs/design/reference/ 里的最终只读参考

## Hard scope

- 不重选 Apple/Spotify/Linear/Claude；以最终样板视觉值为准。
- 不改 URL、关键词、页面职责、内容、音符或产品功能。
- 仅允许首轮 17 条路由：`/`、`/tools`、既有四条 chords、三条 keyboard-notes、三条 scales、两条 songs、两条 guide 与 `/tools/blank-sheet-music`。不创建后做 91 页、暂停 19 页、其他工具、Sheet Music 路由、动态批量路由、`route.ts` 或组件展厅。
- 首页和工具中心只链接本地确实存在的目标；未实现项不得因 JSON 有内容而出现可用入口。
- 可以维护共用读取、站点头尾、metadata、CSS tokens、主题映射、基础文档和检查脚本。
- 不新增或升级依赖。Tailwind v4；禁止新增 `tailwind.config.ts`，不运行 shadcn init 覆盖 CSS。
- 不下载或分发专有字体。系统字体栈，不引入动画库。
- 原文与只读参考保持哈希不变；文档不在 public，参考 HTML 不是路由。
- 当前正式 origin 固定为 `https://pianogrid.com`，17 条授权路由已经公开并允许索引。不得未经明确授权重新部署、改 DNS、改 canonical origin、改变索引策略、提交搜索平台、扩大公开路由或覆盖稳定生产版本。

## Commands

```text
npm run check:foundation
npm run check
node scripts/check-integration-data.mjs
node scripts/check-integration-batch.mjs
npm run build
node scripts/check-integration-production.mjs
```

实际执行结果与未执行项分开报告；不要用模板报告代替测试。检查脚本使用本轮 17 路由、组件和静态资产的明确白名单，保留 Foundation 与旧批回归断言，不静默跳过或全面放开业务范围。
