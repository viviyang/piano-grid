# 08 上线准备 — 独立验收报告

- 验收日期：2026-09-10
- 验收范围：既有 17 条授权路由、08 的 SEO／结构／内链／遗留 Notes 修改、生产构建与变更证据。
- 角色边界：只生成本报告与测试产物；未修改产品代码、源内容、依赖、进度或发布状态。

## 总结论

**PASS_WITH_NOTES**

[已核实] 17 页在独立的本地发布预览和标准保护态生产构建中均通过页面 SEO／技术边界检查；没有复现 P0–P3 产品缺陷。逐页检查确认：每页恰有一个 H1、Title／Description 唯一且与总包 metadata 一致、canonical path 正确、`noindex,nofollow` 保留、普通浏览器与 Googlebot UA 的 TDH/canonical 一致、未发现内部断链、1440/390 整页溢出、运行时错误或无名称的检测到的媒体。

[已核实] 初始 HTML 中 17 页均可在隔离发布预览模式从首页到达；标准保护态仍按当前发布门槛隐藏部分详情入口，因此该模式的链接图没有把未开放详情页误判为问题。两种模式均无新增路由、sitemap、依赖或部署行为。

## 三项独立判断

| 判断 | 结论 | 依据 |
| --- | --- | --- |
| 代码与页面 SEO 验收 | **PASS_WITH_NOTES** | 17/17 发布预览与 17/17 标准保护态检查通过；受影响业务回归全部通过。 |
| 可进入受保护预览部署验收 | **技术上具备条件** | [推断] 本地两种生产构建、链接图和业务回归均通过；但平台、正式/预览域名与访问保护方案尚未由用户指定，不能据此执行部署。 |
| 可正式公开并开放索引 | **NOT READY** | [已核实] 正式域名/HTTPS/重定向/线上 headers 未验证；Guides 具名教师审阅、A major/C major 的具名专业审阅、PDF 无障碍决定，以及真机、读屏、实体打印、真人听音仍未完成。 |

## 本轮实际复核

1. 17 页 TDH、HTML、canonical、robots、可抓取正文、内链与实际组件输出：**健康**。
2. 首页→栏目→详情／工具／资料的发布预览链接图：**健康**；17 页均可达，详情页均有父级入口。
3. 标准保护态的 `noindex,nofollow` 与未开放入口边界：**健康**；未将保护态误改为公开索引。
4. 08 变更：隐藏打印副本不再创建额外 H1；Scales 详情初始 HTML 含已授权详情入口；面包屑父级为实际链接；favicon 404 不再复现：**健康**。
5. 组件及业务回归：**健康**。Chords/A-minor、Keyboard Notes、Scales、Songs、Blank Sheet、Guides 与 Integration 均通过本次独立运行。

## 变更与源保护

[已核实] 08 交付清单记录 16 个受控修改文件及 1 个新增检查脚本；当前 17 个记录文件 SHA-256 均与 `source-after.json` 一致，未记录删除文件。

[已核实] `page-content.master.json`、问题台账、来源台账以及 Guide PDF 的源／公开副本哈希均与 08 的保护清单一致。未发现原始音乐／内容资料被机械 SEO 改写的证据。

## 实际执行的测试

| 检查 | 实际结果 | 产物 |
| --- | --- | --- |
| `npm run check:foundation` | PASS：560/560 | 本次命令输出 |
| `npm run check` | PASS：Foundation、TypeScript、Tailwind v4/CSS | 本次命令输出 |
| `PIANO_LOCAL_PREVIEW=1 npm run build` | PASS：17 条业务路由与 `/_not-found` | 本次命令输出 |
| 发布预览 SEO（含有限外链检查） | PASS：17/17，0 blocking，0 runtime error；外链 15/15 reachable | `recheck-preview/seo-pages.json`、`link-graph.json`、`external-links.json`、`screenshots/` |
| 标准保护态 `npm run build` | PASS：17 条业务路由与 `/_not-found` | 本次命令输出 |
| 标准保护态 SEO | PASS：17/17，0 blocking，0 runtime error | `recheck-protected/seo-pages.json`、`link-graph.json`、`screenshots/` |
| Chords／A-minor 回归 | PASS：235/235；162/162 | `recheck-business/chords/`、`recheck-business/a-minor/` |
| Keyboard Notes 回归 | PASS：1660/1660 | `recheck-business/keyboard/validation.json` |
| Scales 回归 | PASS：331/331 | `recheck-business/scales/validation.json` |
| Songs／Blank Sheet／Guides／Integration 回归 | PASS：120/120；60/60；77/77；190/190 | `recheck-business/` 下对应目录 |

[已核实] Chords 回归的首次调用遗漏了当前已授权 `/scales` 路由的 `PIANO_ADDITIONAL_ROUTES` 配置，产生一项“应为 404、实际 200”的测试配置失败；补齐该已有允许路由后，同一次完整业务回归为 235/235。该现象未复现产品问题，最终结果以上表的显式白名单运行为准。

## 未测试与发布阻塞

- [未测试] 真机触控与设备字体、屏幕阅读器人工长流程、浏览器原生打印对话框／实体打印、真人听音和钢琴试弹。
- [部分自动化] 外部资源只做了有限 HTTP 可达性检查；地区、登录、结账、具体版本适用性与长期可用性仍需人工核验。
- [未测试] 正式域名、TLS、www/裸域重定向、CDN/缓存、线上响应头、实际抓取／收录／排名行为。
- [已核实] Guides 的具名教师审阅、A major/C major 的具名专业审阅，以及 PDF 无障碍决定仍未完成；PDF 没有被伪造为 tagged/PDF-UA。

## 复验产物

- 发布预览：`recheck-preview/seo-pages.json`、`recheck-preview/link-graph.json`、`recheck-preview/external-links.json`、`recheck-preview/html/`、`recheck-preview/headers/`、`recheck-preview/screenshots/`。
- 标准保护态：`recheck-protected/seo-pages.json`、`recheck-protected/link-graph.json`、`recheck-protected/html/`、`recheck-protected/headers/`、`recheck-protected/screenshots/`。
- 业务回归：`recheck-business/`。

[已核实] 本结论不授权部署、取消 `noindex/nofollow`、生成 sitemap、提交搜索引擎、修改 DNS，或开放任何后做／暂停路由。
