# TDH 与导航实施记录

2026-09-15；分支 `codex/site-tdh-unification`；工作树 `C:/Users/Admin/Documents/viviyang_github/piano-tdh-20260915`；基线 `4bfd070`。

## 已实施

- 发布层统一 `seo-editorial.ts`：19 个重点 URL 文案；所有现有页面入口同步 OG/Twitter；保留具体和弦/音阶家族能力区别。
- 首页学琴定位、首屏说明与 TD 同步；未来 Sheet Music 栏目保持规划，不创建空入口。
- 主导航 Piano Notes / Learn 命名；Tools 复用查和弦、查音阶入口；内页页尾补主要栏目；面包屑统一名称并补 Home。
- 修复跨栏目链接导致多个主导航同时高亮；进阶和弦、音阶原有菜单交互保留。
- Tools 重复打印标题区分为 Available printables / How to use your printouts；首页精选栏目不再称全部页面。
- PUBLIC_ROUTES、sitemap、canonical origin、索引策略、音符数据、只读内容包、资产没有产品变更。

相较同日线上采集快照：100 页 Title、75 页 Description、8 页 H1 不同；包括品牌补齐和音名大小写整理，不代表全部重写。

## 验证记录

- TypeScript：通过。
- CSS 编译/语义工具：通过。
- Webpack 生产构建：最终面包屑版本已成功生成 202 个输出（含内部/元数据输出；197 个业务 URL）。
- `node scripts/check-tdh-build.cjs`：197 页，0 错误。检查 TD 唯一/H1/OG/Twitter/canonical/robots/既有路由及素材范围。
- Tabbit `piano-tdh / verify-pages`：7 页 × 1440/390 两档共 14 项，均 200、单一 H1、无整页横向溢出；无 pageerror；桌面 Learn 菜单和移动菜单打开、Esc 关闭及焦点返回通过；Chord Finder 只有一个主栏目高亮。首页 1440 截图已人工查看，无标题裁切。没有做真人读屏/听音验收。
- `git diff --check`：通过。
- `npm run check`：Foundation 563 通过、2 失败后停止；不是全套通过。失败为基线已存在且未列白名单的 scale-ad-layout-slot.tsx、scale-tracked-link.tsx。未放宽检查。
- `node scripts/check-integration-data.mjs`：129 通过、23 失败。23 项均核实为新工作树 CRLF/LF 差异；将读取字节中的 CRLF 归一化为 LF 后均与原哈希相符，Git 中没有内容变更。未改素材或哈希规则。
- 历史检查报告已恢复，不以本次输出覆盖历史结论。
- 旧 `check-integration-batch.mjs` / `check-integration-production.mjs` 未原样运行：脚本含旧首页文案、固定 16 导航链接等断言。相关本次验收由 197 页构建检查及 Tabbit 浏览器检查覆盖，不宣称旧脚本 PASS。
- 首次构建的代码包装语法错误已修复，后续构建通过；不保留错误产物作为验收。

## 尚未执行

没有提交/推送/合并、没有生产部署、没有 GSC 提交或重新索引请求。上线后才能观察 Google 抓取结果。

同一 sitemap 已被 Google 发现时，既有 URL 文案更新通常无需重新提交；新增 URL 时更新现有 sitemap。可对少量重点页面用 URL Inspection 请求抓取。本站未获取 GSC 提交状态，不能声称已提交。
