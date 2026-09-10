# Piano Reference Release Readiness

- 评估日期：2026-09-10
- 范围：01–07 已验收成果、遗留 Notes、08 的 17 页 SEO 实查实修
- 当前阶段：`08_IMPLEMENTED / 待独立验收`
- 技术判断：`READY_FOR_08_INDEPENDENT_REVIEW`
- 公开状态：保持 `noindex,nofollow`；未部署

## 已核实的阶段状态

[已核实] `checks/reviews/01-chords/review.md` 至 `checks/reviews/07-site-integration/review.md` 的最终结论均为 `PASS_WITH_NOTES`；07 的首轮 `NEEDS_FIX` 已由同一报告中的独立复验更新为 `PASS_WITH_NOTES`。

[已核实] 08 已完成实现与开发者回归，详细 before/after 与逐页证据见 `checks/release/08/seo-audit.md` 和 `checks/release/08/seo-pages.json`。本文件不自签独立 PASS。

## 已修复项

### 既有 Notes

- [已核实] 01：转位比较表 accessibility name 已从固定 A minor 改为当前和弦名称；A major、A minor、C major 均有精确回归。
- [已核实] 04：390px 结果计数通过 `white-space: nowrap` 与 `flex-shrink: 0` 保持完整单复数短语。
- [已核实] 03：A minor `afterprint` 测试等待真实 DOM 状态，不使用长固定 sleep；回归通过。
- [已核实] 06：谱纸缩放测试同时等待可访问名称与合法局部横滚成立；回归通过。
- [已核实] 05：正式 PDF 已完成结构、文本提取、逐页渲染与源/公开副本哈希核对。因缺少作者源、已确认阅读顺序和图形替代文本，未伪造结构标签，限制继续记录。

### 08 技术 SEO

- [已核实] 9 个页面的隐藏打印标题不再使用 H1；打印字号、行高和视觉权重由对应 class 保留。17 页最终均恰好 1 个 H1。
- [已核实] Chords、Keyboard Notes、Scales、Songs、Tools 详情面包屑父级已改为真实内部链接。
- [已核实] scales 中心的现有操作区在隔离发布预览中输出 C major 与 A minor 两个已授权详情入口，`/scales/a-minor` 不再是初始 HTML 孤立页。
- [已核实] 根 metadata 增加空 data URI icon，消除 favicon 404，未新增静态资产。
- [已核实] 17 页 Title/Description 均唯一且与总包一致；canonical path 均正确；普通浏览器与 crawler UA 一致；无内部断链、无 1440/390 整页溢出、无检测到的媒体可访问名称问题。

## 17 页发布清单

| URL | 技术 SEO | 内容/人工门槛 |
| --- | --- | --- |
| `/` | PASS | 正式 origin 与索引配置待确认 |
| `/tools` | PASS | 正式 origin 与索引配置待确认 |
| `/songs` | PASS | 外链地区、结账与持续可用性待人工核验 |
| `/songs/easy` | PASS | 外链地区、结账与持续可用性待人工核验 |
| `/tools/blank-sheet-music` | PASS | 实体 Letter/A4 打印待人工核验 |
| `/keyboard-notes` | PASS | 真机、读屏、真人听音待人工核验 |
| `/keyboard-notes/labeled` | PASS | 真机、读屏、系统打印待人工核验 |
| `/keyboard-notes/chart` | PASS | 真机、读屏、系统打印、真人听音待人工核验 |
| `/chords` | PASS | 真机、读屏、系统打印、真人听音待人工核验 |
| `/chords/a-major` | PASS | F-RELEASE 具名专业审阅待完成 |
| `/chords/a-minor` | PASS | 真机、读屏、系统打印、真人听音待人工核验 |
| `/chords/c-major` | PASS | F-RELEASE 具名专业审阅待完成 |
| `/scales` | PASS | 真机、读屏、系统打印、真人听音待人工核验 |
| `/scales/c-major` | PASS | 真机、读屏、系统打印、真人听音待人工核验 |
| `/scales/a-minor` | PASS | 真机、读屏、系统打印、真人听音待人工核验 |
| `/guide` | PASS | 具名教师审阅与 PDF 无障碍决策待完成 |
| `/guide/read-sheet-music` | PASS | 具名教师审阅与 PDF 无障碍决策待完成 |

## PDF 限制

- [已核实] `docs/content/site-master/assets/piano-starter-and-reading.pdf` 与 `public/assets/guides/piano-starter-and-reading.pdf` 均为 58,564 bytes，SHA-256 均为 `69c46e4520b9ea63f03755fb7d2a68b29b843664fe09abc628f7e35af05deac2`。
- [已核实] PDF 共 4 页，四页可提取文本且渲染无空页、裁切、重叠、黑块或不可读内容。
- [已核实] PDF 没有 `/StructTreeRoot`、有效 `/MarkInfo`、`/Lang` 或页级 `/StructParents`，因此仍是未标记 PDF。
- [推断] 当前材料不足以可靠生成 PDF/UA 结构。依据是仓库只有最终 PDF，没有可编辑作者源、经确认的逻辑阅读顺序和乐谱图替代文本规范。发布前需明确接受限制，或提供这些输入后重导出并做 PDF/UA 与读屏器复验。

## 自动化结果

| 检查 | 结果 |
| --- | --- |
| `npm run check` | [已核实] PASS；Foundation 560/560、TypeScript、Tailwind v4/CSS 均通过 |
| `npm run build`（隔离发布预览） | [已核实] PASS |
| `npm run build`（标准保护态，最终构建） | [已核实] PASS |
| 17 页发布预览 SEO | [已核实] 17/17；0 P0–P2；0 runtime errors；0 orphan |
| 17 页标准保护态 SEO | [已核实] 17/17；0 P0–P2；0 runtime errors |
| Chords / A minor | [已核实] 235/235；162/162 |
| Keyboard Notes | [已核实] 1660/1660；标准保护态 48/48 |
| Scales | [已核实] 330/330；标准保护态 63/63 |
| Songs | [已核实] 120/120；标准保护态 54/54 |
| Guides | [已核实] 77/77；标准保护态 57/57 |
| Blank Sheet | [已核实] 60/60；标准保护态 58/58 |
| Site Integration | [已核实] 190/190；标准保护态 114/114 |
| 外链有限 HTTP 检查 | [已核实] 15/15 返回可达状态；未发现 404/410 |

[已核实] 一次 preliminary scales production 调用使用旧 batch 03 默认路由白名单，把当前已授权的 `/`、`/tools`、`/songs`、`/guide` 错当作应为 404，产生 4 个测试配置假失败；使用脚本已有的 `PIANO_ADDITIONAL_ROUTES` 复跑后为 63/63，未发现产品失败。

## 仍需人工或外部环境验证

- 真机：[未测试] iOS Safari、Android Chrome、触控横滚、设备字体与真实高 DPI/缩放。
- 读屏：[未测试] NVDA、JAWS、VoiceOver 的完整网页流程；PDF 的实际朗读顺序。
- 打印：[未测试] 操作系统原生打印对话框、Letter/A4、页边距、缩放和实体打印机。
- 听音/试弹：[未测试] 扬声器与耳机主观音色、真人听音、钢琴试弹。
- 外链：[部分自动化] 15 个目标的有限 HTTP 状态已通过；地区限制、登录、结账、具体版本适用性和长期稳定性未人工验证。
- 专业审阅：[未测试] Guides 的具名钢琴教师审核；A major/C major 的 F-RELEASE 具名专业审核。
- 环境：[未测试] 正式域名、TLS、www/裸域重定向、CDN、缓存、线上响应头和搜索引擎实际行为。

## 发布判断

[推断] 当前实现具备进入独立 08 验收的条件。依据是 17 页两种本地生产模式均通过、受影响业务回归全部通过、01–07 已独立验收，且没有新增页面、依赖或功能范围。

[推断] 当前还不能标记为“可公开发布”。依据是正式域名和索引环境未确认，具名专业审阅与 PDF 无障碍决策仍未完成，真机/读屏/实体打印/真人听音仍未执行。

[已核实] 本轮未部署、未取消 `noindex,nofollow`、未生成 sitemap、未 commit 或 push。下一步只应由独立验收对话执行“验收 08”。