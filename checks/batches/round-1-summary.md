# Piano Reference 首轮 17 路由汇总

日期：2026-09-10  
范围：Foundation、00–07；本文件记录首轮技术实现状态，不代表整个 127 URL 网站完成或获得部署授权。

## 当前状态

[已核实] 首轮 17 条业务路由均可在本地开发与生产构建中返回 200，使用各自源 title、description、canonical path，并保留 `noindex/nofollow`。T01/T02 的初次独立验收为 `NEEDS_FIX`，唯一 P1 已修复并等待独立复验；00–06 的既有实现和审查记录保留。

| URL 组 | 模板 | 数量 | 本地预览 | 独立审查 |
|---|---|---:|---|---|
| `/` | T01 | 1 | implementation_checked | 07 NEEDS_FIX；P1 fixed，re-review pending |
| `/tools` | T02 | 1 | implementation_checked | 07 NEEDS_FIX；P1 fixed，re-review pending |
| Chords | T06/T07 | 4 | 可用 | 01 PASS_WITH_NOTES |
| Keyboard Notes | T03/T04/T05 | 3 | 可用 | 02 PASS_WITH_NOTES，用户已接受 |
| Scales | T11/T12 | 3 | 可用 | 03 PASS_WITH_NOTES，用户已接受 |
| Songs | T15/T16 | 2 | 可用 | 04 PASS_WITH_NOTES，用户已接受 |
| Guides | T21/T22 | 2 | 可用 | 05 PASS_WITH_NOTES，用户已接受 |
| Blank Sheet | T19 | 1 | 可用 | 06 PASS_WITH_NOTES，用户已接受 |

完整逐 URL 状态见 `07-site-integration/coverage.json`。

## 可完成的实际流程

- [已核实] 首页 → 琴键、和弦、音阶、选曲或指南 → 对应参考结果。
- [已核实] 首页 → Tools → 空白谱纸 → Letter/A4 PDF。
- [已核实] 首页 → Tools → 指南打印资料 → 四页 PDF。
- [已核实] 既有页面之间的 breadcrumb、相关资源、局部搜索、筛选、声音、打印与下载保持原批次行为；07 回归未发现共享导航引入的失败。
- [已核实] Sheet Music、和弦反查及其他计划工具没有假链接；相应未授权 URL 继续为 404。

## 内容、素材与审查余项

- [已核实] F-Homepage 的发布依赖问题已在本地预览层解决：入口来自明确 17 路由白名单和字节核验文件。源 `published:false` 没有被改成 true。
- [已核实] 页面各自的问题台账仍是上线与后续内容工作的真源；未取得的指法、版权、自托管素材、逐曲专业评估或完整字段没有自动补齐。
- [已核实] 首轮公开静态文件仅为各已授权批次实际使用的 PDF/SVG；master、问题台账、参考 HTML 和内部文档未进入 public。
- [已核实] 只读 `docs/content/site-master/` 与 `docs/design/reference/` 共 81 个基线文件哈希全部未变。

## 上线前必要事项

- [已核实] 07 初次独立验收为 NEEDS_FIX；唯一 P1 已修复，现需要独立复验。
- [已核实] 需要用户另行授权部署、正式域名、索引策略和 sitemap；当前所有页面保持 `noindex/nofollow`，canonical 使用源相对路径，未猜域名。
- [已核实] 仍未执行真人真机、屏幕阅读器人工长流程、真人听音/试弹、浏览器原生打印对话框、实体打印、全部外链逐一人工访问和进一步专业音乐/内容审阅。
- [已核实] 后做 91 URL 与暂停 19 URL 未实现；首轮完成不能表述为整个 127 URL 网站完成。

## 证据入口

- [07实施报告](07-site-integration/implementation.md)
- [07测试汇总](07-site-integration/test-summary.json)
- [07开发态检查](07-site-integration/validation.json)
- [07生产态检查](07-site-integration/production/production-validation.json)
- [07截图](07-site-integration/screenshots)
- [唯一进度](../../docs/tasks/site-implementation-plan.md)
