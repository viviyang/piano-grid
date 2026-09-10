# PianoGrid

钢琴和弦、琴键、音阶、选曲、指南与打印资料参考项目。产品职责、URL和内容以 `docs/product` 与 `docs/content` 的最终资料为准。

[已核实] 正式品牌为 `PianoGrid`，站点域名为 `https://pianogrid.com`；本地与构建环境仍保持 `noindex/nofollow`，尚未部署。

[已核实] 当前批次 **07-site-integration** 已完成 P1 定点修复与自测，开发停止等待独立复验。Foundation 与 00–06 均保留；06 独立结论为 `PASS_WITH_NOTES`，用户已确认验收通过。首轮 17 条路由可在本地预览，仍保留 `noindex/nofollow`，尚未部署。

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

[已核实] 原始内容与只读设计参考保持原字节；总包、内部文档和参考 HTML 没有公开为路由。真人听音、真机、屏幕阅读器人工长流程、浏览器打印对话框、实体打印、部署未执行；07 初次独立验收为 `NEEDS_FIX`，P1 已修复，独立复验尚未执行。
