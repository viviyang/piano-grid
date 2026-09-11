# PianoGrid

钢琴和弦、琴键、音阶、选曲、指南与打印资料参考项目。产品职责、URL和内容以 `docs/product` 与 `docs/content` 的最终资料为准。

**在线访问：** [pianogrid.com](https://pianogrid.com)

[已核实] 正式品牌为 `PianoGrid`，生产站点为 `https://pianogrid.com`，托管于 Vercel。17 条授权路由当前公开并输出 `index,follow`，robots 与 sitemap 已上线。

[已核实] Foundation、00–08 和首轮 17 条路由均已完成；08 独立结论为 `PASS_WITH_NOTES`。最终公开构建独立复验结论同为 `PASS_WITH_NOTES`；当前仍需发布清单中保留的专业审阅和人工设备验收。

## 本地运行

依赖已安装，执行 `npm run dev`。本批代表页：

- http://localhost:3000/
- http://localhost:3000/tools

[已核实] 首页只链接当前确实存在的任务目标；工具中心列出三个查阅入口与两份已公开打印资料。未实现的 Sheet Music、和弦反查与其他工具只显示为未开放或继续保持 404。

```powershell
npm run check
node scripts/check-integration-data.mjs
node scripts/check-integration-batch.mjs
npm run build
node scripts/check-integration-production.mjs
```

浏览器测试使用既有 Codex Playwright 运行时和 Chrome，不安装依赖。其他机器可用 `PIANO_PLAYWRIGHT_PATH` 指定已有运行时，`PIANO_BASE_URL` 指定服务。依赖与锁文件未变；仅在新环境恢复依赖时使用 `npm ci`。

## 交付与证据

- [当前唯一进度](docs/tasks/site-implementation-plan.md)
- [07实施报告](checks/batches/07-site-integration/implementation.md)
- [07 P1定点修复](checks/batches/07-site-integration/fixes.md)
- [首轮汇总](checks/batches/round-1-summary.md)
- [项目事实](docs/project-context.md)
- [组件契约](docs/design/component-spec.md) / [模板映射](docs/design/template-map.md)
- [续作入口](docs/tasks/batch-implementation/CONTINUE-HERE.md)
- [06独立报告](checks/reviews/06-blank-sheet/review.md)
- [08独立报告](checks/reviews/08-release-readiness/review.md)
- [公开上线报告](checks/release/public-launch/report.md)
- [最终公开构建独立复验](checks/release/public-launch/independent-reverification/review.md)
- [当前发布门槛](docs/release/release-readiness.md)

[已核实] 原始内容与只读设计参考保持原字节；总包、内部文档和参考 HTML 没有公开为路由。真人听音、真机、屏幕阅读器人工长流程、浏览器打印对话框、实体打印，以及指定页面的具名专业审阅仍未完成或未记录为通过。
