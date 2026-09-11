# PianoGrid 最终公开构建独立复验

- 复验日期：2026-09-10
- 目标：`https://pianogrid.com`
- 起始 Git HEAD：`00328ddcc46ab87ed9fb9d1548de6038942b48b1`
- 角色：独立验收；只读线上与本地验证
- 结论：`PASS_WITH_NOTES`

## 1. 结论拆分

- [已核实] **最终公开构建技术验收：PASS。** 17/17 页面返回 200；逐页 Title、Description、单一可见 H1、绝对 canonical、`index, follow`、Googlebot 等价输出、JSON-LD、内部链接、1440/390 溢出和运行时错误检查均通过，0 个 P0–P2 finding。
- [已核实] **导航与发布范围：PASS。** 首页、工具中心、桌面/移动导航均只指向 17 条已授权路由；规划中的其余 110 条 URL 全部返回 404；6 个工作区/内部文件探针均返回 404。
- [已核实] **HTTPS、规范主机与索引策略：PASS。** HTTP 裸域和 HTTPS `www` 均以 308 跳到 `https://pianogrid.com/`；TLS 1.3 证书链有效；robots 允许抓取；sitemap 恰好列出 17 条正式 URL。
- [推断] **发布流程整体仍为 PASS_WITH_NOTES，而不是无条件完成。** 依据是公开构建本身通过，但既有具名专业审阅、真机、读屏、原生/实体打印、真人听音和 PDF 无障碍决定没有在本轮得到新证据。

没有修改产品代码、没有部署、没有修改 DNS 或索引策略、没有提交搜索平台。

## 2. 当前工作区文档变更核查

复验开始时的工作区改动为：`AGENTS.md`、`README.md`、`docs/release/release-readiness.md`、`docs/tasks/batch-implementation/CONTINUE-HERE.md`、`docs/tasks/site-implementation-plan.md`，以及未跟踪的 `checks/release/public-launch/live-verification.md`。

- [已核实] 上述文档关于 PianoGrid 品牌、正式 origin、Vercel、17 条公开路由、`index,follow`、robots、sitemap、08 `PASS_WITH_NOTES` 和“最终公开构建待独立复验”的核心状态，与本轮线上证据一致。
- [已核实] `release-readiness.md` 和 `site-implementation-plan.md` 仍保留人工/专业门槛，没有把未测项改为 PASS。
- [已核实] `CONTINUE-HERE.md` 顶部新增的状态覆盖说明清楚地把当前动作改为最终公开构建复验。
- [P3 文档提示] `CONTINUE-HERE.md` 的覆盖说明后仍保留较早正文“现在的下一步：执行 08 上线准备”。顶部已说明这些段落是历史证据，因此不构成范围错误，但脱离顶部阅读时仍可能造成动作歧义。
- [P3 文档提示] 部分历史自动化计数与本轮新计数不同（例如 Foundation 560/560 对本轮 564/564、public-launch 124/124 对本轮 125/125）。历史结果本身无需重写，但后续引用应带执行日期/产物路径。

### 并发工作区变化

- [已核实] 复验执行期间，工作区又出现 favicon、根 metadata、manifest、四个 chord 页面和 Foundation 白名单变更；这些不是本独立验收实施的产品改动。
- [已核实] 本报告的线上结论针对当时实际公开的 `https://pianogrid.com`。产品代码变更在起始快照后、最终状态检查前被检测到。
- [未测试或待确认] 我不知道这些并发变更与 14:13 UTC 本地构建的精确先后关系；缺少一个未被并发写入打断的代码快照。因此不能据本地结果声称当前 dirty 工作区与线上字节完全一致，也不能据本报告声称新增 favicon/metadata 已部署。

## 3. 17 条路由结果

| URL | HTTP / SEO / 可达性 | 仍保留的非技术门槛 |
| --- | --- | --- |
| `/` | PASS | 无新增门槛 |
| `/tools` | PASS | 无新增门槛 |
| `/songs` | PASS | 地区、登录、结账与长期可用性仍需人工抽查 |
| `/songs/easy` | PASS | 地区、登录、结账与长期可用性仍需人工抽查 |
| `/tools/blank-sheet-music` | PASS | 原生/实体 Letter、A4 打印未核实 |
| `/keyboard-notes` | PASS | 真机、读屏、真人听音未核实 |
| `/keyboard-notes/labeled` | PASS | 真机、读屏、原生打印未核实 |
| `/keyboard-notes/chart` | PASS | 真机、读屏、原生打印、真人听音未核实 |
| `/chords` | PASS | 真机、读屏、原生打印、真人听音未核实 |
| `/chords/a-major` | PASS | F-RELEASE 具名专业审阅未核实 |
| `/chords/a-minor` | PASS | 真机、读屏、原生打印、真人听音未核实 |
| `/chords/c-major` | PASS | F-RELEASE 具名专业审阅未核实 |
| `/scales` | PASS | 真机、读屏、原生打印、真人听音未核实 |
| `/scales/c-major` | PASS | 真机、读屏、原生打印、真人听音未核实 |
| `/scales/a-minor` | PASS | 真机、读屏、原生打印、真人听音未核实 |
| `/guide` | PASS | 具名教师审阅；未标记 PDF 的接受/重导出决定 |
| `/guide/read-sheet-music` | PASS | 具名教师审阅；未标记 PDF 的接受/重导出决定 |

## 4. 导航与页面流程截图

1. **首页入口｜健康。** 线上首页完整加载；主任务、参考目录和页脚只链接已发布目标；桌面截图未见加载空白、遮挡或整页横向溢出。

   ![首页桌面复验](live/screenshots/home-1440.png)

2. **首页 → 工具中心｜健康。** 使用当前线上页面的“Explore Piano Tools”实际导航到 `/tools`；工具中心显示 3 个工作参考和 2 个真实下载资源。

   ![工具中心移动端复验](live/screenshots/tools-390.png)

3. **工具中心 → 和弦中心｜健康。** 使用“Look up a chord”实际导航到 `/chords`；页面显示 19 个准备好的 major/minor 结果，详情入口只指向已授权 chord 路由。

   ![和弦中心桌面复验](live/screenshots/chords-1440.png)

4. **移动全站导航｜健康。** 390px 实际打开菜单后可见 6 个父级栏目和 10 个详情入口；当前栏目状态清楚，未出现未发布 URL。

5. **Keyboard Notes 流程｜健康。** 中心及两个详情页均可达；代表性 390px 页面无整页横向溢出，交互控件和图示有可访问名称。

   ![琴键音符图表移动端复验](live/screenshots/keyboard-notes--chart-390.png)

6. **Scales 流程｜健康。** 中心及 C major/A minor 详情可达；桌面参考、表格、键盘与来源区完整渲染。

   ![音阶中心桌面复验](live/screenshots/scales-1440.png)

7. **Songs 流程｜技术健康。** 两页均可达，20 个外部目标自动 HTTP 检查全部为 reachable；地区、账户、结账、具体版本和长期稳定性不能由本轮自动检查证明。

8. **Guide 流程｜技术健康、人工门槛开放。** 两页和 PDF 下载均可达；页面截图没有明显裁切或溢出。截图和文本提取不能证明具名教师审核、PDF/UA 或真实读屏顺序。

   ![初学指南桌面复验](live/screenshots/guide-1440.png)

   ![读谱指南移动端复验](live/screenshots/guide--read-sheet-music-390.png)

## 5. 自动化与协议证据

| 检查 | 本轮结果 |
| --- | --- |
| `npm run check:foundation` | PASS，564/564 |
| `npm run check` | PASS，Foundation + TypeScript + Tailwind/CSS |
| `node scripts/check-integration-data.mjs` | PASS，153/153 |
| `npm run build` | PASS，17 个业务页面及 robots/sitemap/manifest 静态生成 |
| 本地生产 `check-integration-production`（3001） | PASS，125/125 |
| 本地生产 `check-integration-batch`（显式 3001） | PASS，237/237 |
| 线上 `check-integration-production` | PASS，125/125 |
| 线上 `check-release-seo` | PASS，17/17；0 blocking；0 runtime errors |
| 线上外链有限 HTTP 检查 | PASS，20 reachable；0 restricted/broken/indeterminate |
| 自增发布边界检查 | PASS；17 个授权 200、110 个未授权 404、36 个被引用资源 200、非 `_next` 静态资源与工作区哈希一致 |

[已核实] 第一次按手册裸跑 `check-integration-batch` 时，脚本默认连接到了机器上已存在的 `localhost:3000` 旧开发进程，产生 59 个失败和一个 Invalid URL 后续错误。将同一脚本显式指向本轮 3001 production build 后为 237/237。该首次结果是环境串线证据，不能删除，也不能当作公开站点失败。

### HTTPS 与响应头

- [已核实] TLS 1.3；证书 CN `pianogrid.com`；Let’s Encrypt `YR1`；验证通过；本次观察的有效期为 2026-09-10 至 2026-12-09。
- [已核实] `Strict-Transport-Security: max-age=63072000`。
- [P3 防护加固提示] 首页响应未观察到 CSP、`X-Content-Type-Options`、`Referrer-Policy` 或 `Permissions-Policy`。这不是本次技术 SEO/发布范围的阻塞项，也不代表已完成安全审计；如后续建立安全基线，应单独评估兼容性后配置。

## 6. 证据限制与下一门槛

- [未测试或待确认] iPhone Safari、Android Chrome、真实触控、原生 200% 缩放。
- [未测试或待确认] NVDA、JAWS、VoiceOver 完整流程及 PDF 实际朗读顺序。
- [未测试或待确认] 系统打印对话框、Letter/A4、实体打印机。
- [未测试或待确认] 真人听音、耳机/扬声器音色、真实钢琴试弹。
- [未测试或待确认] A major、C major 的具名专业审阅；两份 Guide 的具名钢琴教师审阅。
- [未测试或待确认] 未标记四页 Guide PDF 的正式接受，或从可编辑作者源进行可访问重导出后的 PDF/UA/读屏复验。
- [未测试或待确认] Google Search Console 所有权、sitemap 提交、Google 实际抓取、收录、canonical 选择、展示或排名。本轮没有操作搜索平台。

## 7. 测试产物

- `live/seo-pages-public-live.json`：17 页逐项 SEO/DOM/可达性结果。
- `live/link-graph-public-live.json`：站内链接图和首页点击距离。
- `live/production-validation.json`：线上 125 项生产回归。
- `live/external-links.json`：20 个外部目标有限 HTTP 结果。
- `live/html/`、`live/headers/`：17 页原始 HTML 与响应头。
- `live/screenshots/`：17 页 1440/390 全页截图及首页/工具中心补充宽度截图。
- `public-boundary.json`：授权/未授权 URL、重定向、TLS、robots、sitemap、资源状态与哈希。
- `check-public-boundary.mjs`：本轮补充发布边界检查脚本。
- `production-validation.json`：并发变化出现前的本地 125 项生产回归。
- `local-integration/validation.json`：显式指向 3001 的本地 237 项集成回归。

## 8. 最终签发

`PASS_WITH_NOTES`

[已核实] 当前公开站点的 17 条授权路由、导航、SEO、索引策略、HTTPS、重定向、引用资源和发布边界通过本轮独立技术复验。

[推断] 该结论足以关闭“最终公开构建独立技术复验”这一检查点，但不能关闭人工/专业门槛，也不能证明 Google 已抓取、收录或排名。下一步应记录真实的具名专业审阅与人工设备结果；不需要重新部署，不应进入 91 条后做页面。
