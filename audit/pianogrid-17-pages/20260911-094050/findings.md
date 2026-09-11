# PianoGrid 17-page audit findings

审计时间：2026-09-11 09:40:50–10:09:19（Asia/Shanghai）。优先级按“音乐/任务阻断 → 功能承诺与导航 → 信息和文案 → 观察能力”排序。本文件只记录本轮线上实际观察；旧报告文字不作为问题仍存在的证据。

## PG17-001 · P1 · Songs 的难度、编配与获取格式没有形成稳定的三个决策字段

- 页面：`/songs`、`/songs/easy`
- 前提：访问本轮正式站，未展开每张卡的 details。
- 复现步骤：打开页面，比较卡片首屏事实区和筛选字段；查看 All of Me 及 Easy 页卡片眉题。
- 实际结果：[已核实] `/songs` 首屏显示 `Publisher level` 与泛化的 `Access`，但编配信息主要藏在 `Version and use details`；All of Me 的 `piano/vocal with guitar chord frames` 不在同级决策字段中。`/songs/easy` 用诸如 `EARLY ELEMENTARY · PDF / DIGITAL PRINT` 的眉题把出版商等级与资源格式放在同一展示位，同时另列 `Level basis`。
- 期望结果：卡片以三个独立字段呈现 `Difficulty (publisher label)`、`Arrangement`、`Acquisition format`；未知难度明确为未知，不能从 Piano/Vocal 等编配反推。
- 证据：`evidence/desktop/songs.png`、`evidence/mobile/songs--easy.png`、`evidence/dom/songs-desktop.html`、`evidence/dom/songs--easy-desktop.html`、`evidence/interaction-results.json` 的 `SG-fields` 与 `SG-AllOfMe`。
- 影响：用户难以在不展开详情的情况下判断“是否适合初学”“是钢琴独奏还是钢琴/人声”“拿到的是纸本、在线书还是可下载文件”。
- 修复范围：只改现有歌曲展示适配层和字段标签；不改内容包、URL 或新增页面。
- 验收条件：15 张主资源卡均可在首屏事实区分别读到三个字段；All of Me 的编配不出现在难度字段；未知难度不被补猜。
- 本地/线上分离：[已核实] 当前本地工作树的 `src/components/songs/resource-card.tsx` 已有三个字段，但本轮线上 DOM 尚未呈现；这也是本地工作树不能当线上版本证据的直接例子。

## PG17-002 · P2 · Sweden 作者行重复

- 页面：`/songs`
- 前提：默认未筛选状态。
- 复现步骤：滚动至 Sweden 卡片，读取曲名下方署名行。
- 实际结果：[已核实] 显示 `Daniel Rosenfeld · C418 / Daniel Rosenfeld`。
- 期望结果：同一身份不重复；保留一个清楚、可追溯的署名，例如内容台账定义的标准显示形式。
- 证据：`evidence/desktop/songs.png`、`evidence/dom/songs-desktop.html`、`evidence/interaction-results.json` 的 `SG-Sweden`。
- 影响：降低出版信息可信度，并可能让用户误以为是两位不同作者。
- 修复范围：现有 PersonLine/字段归一化；不改作品事实。
- 验收条件：线上卡片与可访问树只出现一次 Daniel Rosenfeld/C418 的标准署名，搜索仍可用两种名称命中。

## PG17-003 · P1 · Sweden 的获取条件没有说明 Digital Book 在线且不可下载/打印

- 页面：`/songs`
- 前提：查看 Sweden 卡片与其 Hal Leonard 资源。
- 复现步骤：读取卡片 `Access` 与 CTA，再对照 CR-04 对应的正式资源条件。
- 实际结果：[已核实] 卡片只写 `external publisher purchase; select print/digital product and check provider conditions`，CTA 为 `Open publisher resource`；没有错误地写成 `Download PDF`，但也没有把纸本与 Hal Leonard Digital Book 的限制说清楚。[已核实] 用户本轮提供的 Hal Leonard 页面核验表明 Digital Book 是在线阅读，不能下载或打印。
- 期望结果：明确区分 `Printed book` 与 `Hal Leonard Digital Book — online-only; cannot be downloaded or printed`，并保持 CTA 为去供应商页面而非下载承诺。
- 证据：`evidence/dom/songs-desktop.html`、`evidence/interaction-results.json` 的 `SG-Sweden`、`evidence/supplement-fetch-results.json` 的外链 200 结果、`docs/content/site-master/source-ledger.master.md` 的 CR-04。
- 影响：这是购买/使用决策信息；误解后用户可能买到无法下载或打印的格式。
- 修复范围：现有 `acquisitionFormat` 映射和卡片显示；不改变外链目标。
- 验收条件：线上 Sweden 卡片在不展开长说明时即可读到两种格式及限制；链接仍指向 CR-04 的正式产品页。

## PG17-004 · P2 · 和弦转位表的隐藏 `current selection` 文本在三个 DOM 行中同时存在

- 页面：`/chords/a-major`、`/chords/a-minor`、`/chords/c-major`
- 前提：浏览器加载任一详情页；依次切换 Root/First/Second inversion。
- 复现步骤：检查可见高亮、当前音符与低音；再检查 DOM 文本、`aria-current` 和浏览器可访问树。
- 实际结果：[已核实] 每次只有一行获得可见选中样式，当前符号、音符、低音和琴键同步正确。[已核实] 浏览器 ARIA snapshot 在 Second inversion 状态只向活动行暴露 `current selection`，其他两行不宣告。[已核实] 但三行 DOM 均包含隐藏字符串，且表格行没有 `aria-current="true"`；纯文本提取器因此会得到三处 `current selection`。
- 期望结果：隐藏选中文案只存在于当前项，或以明确的状态属性表达；浏览器可访问树仍只暴露当前项。
- 证据：`evidence/aria/a-minor-current-selection.yml`、`evidence/dom/chords--a-minor-desktop.html`、`evidence/interaction-results.json` 中 9 条转位检查及 `CH-Am-current-semantics`。
- 影响：当前没有证据证明视觉错误或浏览器可访问树重复播报；风险在于文本提取、自动化、未来样式/辅助技术组合可能产生歧义。
- 修复范围：共享和弦详情组件的状态语义；不改音名或布局。
- 验收条件：三种转位逐一检查时，DOM/可访问树/可见状态均只有真正当前项被标记；NVDA/JAWS/VoiceOver 真人复验另行记录。

## PG17-005 · P2 · 关键任务关系缺少正文普通链接

- 页面：`/keyboard-notes`、`/keyboard-notes/chart`、三条 chord 详情、两条 scale 详情、两条 guide。
- 前提：只统计 `main a[href]`，不把页头页尾或计划中的未上线 URL 当正文关系。
- 复现步骤：从 17 页 DOM 建立正文链接图。
- 实际结果：[已核实] 父子返回链大多存在；`/keyboard-notes` 可去 labeled/chart，`/guide/read-sheet-music` 可去 chart，`/scales/a-minor` 可去 Am chord。但 A major 与 Am 详情之间没有正文对比链接；C chord 与 C scale 没有互链；chart 没有回 labeled；多数 chord 详情只回 `/chords`。
- 期望结果：在不增加页面的前提下，用已有 17 条 URL 建立有任务语义的普通链接。
- 证据：`pages.json` 的 `incoming_links` 与 `outgoing_main_links`，`evidence/page-captures.json`。
- 影响：用户完成比较任务要回中心页重新寻找；现有详解价值不能自然串联。
- 修复范围：正文相关参考区与结果 CTA；不改全局导航、不引入 127 URL。
- 验收条件：A/Am 对比、C chord/C scale、查音/labeled/chart/识谱均形成双向或明确下一步链接，且所有 href 返回 200。

## PG17-006 · P2 · 88 键标注 PDF 为 9 页，最后一页仅 C8，纸张利用率低

- 页面：`/keyboard-notes/labeled`
- 前提：下载线上 `labeled-88-octaves.pdf`，逐页渲染。
- 复现步骤：打开 PDF，检查页数、每页范围和页面占用。
- 实际结果：[已核实] PDF 可打开、未加密、9 页均可渲染；第 1 页 A0–B0，第 2–8 页每页一个完整八度，第 9 页只有 C8，页面留白明显。
- 期望结果：若目标是便携打印参考，应在保持可读性的前提下减少页数，或在下载前明确提示“9 页、按八度分段”。
- 证据：`evidence/pdf-inspection.json`、`evidence/contact-pdf-renders.jpg`、`evidence/pdf-renders/labeled-88-octaves/`。
- 影响：无音乐错误，但会增加纸张成本，且用户可能在下载后才发现输出规模。
- 修复范围：现有 PDF 排版/下载说明；不改键位数据。
- 验收条件：新文件逐页无裁切、所有 A0–C8 标签完整；页数下降，或 CTA 前准确显示页数与分段用途。

## PG17-007 · P1 · 8 个公开 PDF 均未检测到标签结构

- 页面：`/tools/blank-sheet-music`、`/keyboard-notes/labeled`、`/chords`、三条 chord 详情、`/guide/read-sheet-music`
- 前提：下载本轮页面暴露的 8 个唯一 PDF，并检查结构树。
- 复现步骤：解析 PDF catalog/MarkInfo，并提取文本与渲染每页。
- 实际结果：[已核实] 8 个 PDF 共 21 页，均可打开和渲染，未检测到 `/StructTreeRoot`，`tagged=false`；有文本提取不等于有正确阅读顺序或可访问标签。
- 期望结果：完成明确的 PDF 无障碍决定；需要作为无障碍交付物的文件应有标签、阅读顺序和语言等，并以读屏实测验收。若暂不标记，页面应提供等价 HTML 并清楚限定 PDF 用途。
- 证据：`evidence/download-results.json`、`evidence/pdf-inspection.json`、21 张 `evidence/pdf-renders/**/page-*.png`。
- 影响：打印视觉内容正常，但 PDF 辅助技术可用性未通过。
- 修复范围：PDF 生成/标记流程和页面说明；本轮不执行。
- 验收条件：每个 PDF 有具名决策；选择可访问 PDF 的文件通过 PAC/Acrobat 检查和真实读屏阅读顺序测试。

## PG17-008 · P3 · 未观察到可验证的统计事件实现

- 页面：含查阅、试听、下载、打印、外链动作的页面。
- 前提：只检查公开 HTML/已加载资源中的常见统计标识，不安装新系统、不登录外部账号。
- 复现步骤：检索 `vercel/analytics`、GA/gtag、GTM、Plausible、Umami、`dataLayer` 等已知标识。
- 实际结果：[已核实] 本轮 17 页抓取未发现这些标识；因此不能验证 `view/listen/download-click/print-window/outbound-click` 是否被区分，更不能把点击当成功。
- 期望结果：若项目已有内部事件层，应提供可核验的事件名称/触发条件；没有则保持为未观测，而不是伪造成功数据。
- 证据：`evidence/supplement-fetch-results.json` 的 `analytics.matches=[]`。
- 影响：不影响用户完成任务，但上线后无法从本轮证据判断行为与实际成功率。
- 修复范围：本轮只记录；不得据此自动安装统计系统。
- 验收条件：后续若选择验证，使用现有系统证明动作事件相互区分，并明确成功回执与点击事件的区别。

## PG17-009 · P2 · 对外来源呈现不一致，部分文件只暴露内部 ID

- 页面：chord、keyboard、guide 等页面/打印物；scale 页面作为对照。
- 前提：读取现有 `source-ledger.master.md` 与 preserved-chords 证据账本，再看线上页面和 PDF。
- 复现步骤：核对来源 ID 是否能在公开面映射为来源名称、链接、定位和适用范围。
- 实际结果：[已核实] scale 页面已显示 `Sources and checking scope`，含来源名称、链接和支持范围；多数 chord/keyboard/guide 页面没有同等映射。`labeled-88-octaves.pdf` 直接打印 `BK-KORG` 等内部 ID；这些 ID 对普通用户不可解释。[已核实] 本地账本实际已有 S01/S02/S05/S06、BK-*、CR-04/CR-19 等来源详情。
- 期望结果：复用账本映射，只公开与当前事实相关的名称、链接、定位、适用范围；理论推导、资料核查、教师审阅分开。
- 证据：`docs/content/site-master/source-ledger.master.md`、`docs/content/site-master/preserved-chords/content-pack.md`、`evidence/dom/scales-desktop.html`、`evidence/pdf-inspection.json`。
- 影响：用户无法判断某项是来源事实、内部推导还是尚待教师确认；内部 ID 会制造“有来源但不可查”的感觉。
- 修复范围：现有来源显示适配层和打印页脚；不改事实内容。
- 验收条件：网页与打印均能从每个公开来源标记定位到可理解的来源名/链接/支持范围；复审日期只在真实复审后更新。

## PG17-010 · P1 · 线上构建无法映射到本地 commit

- 页面：全部 17 页/部署层。
- 前提：记录本地 Git 状态与正式响应头。
- 复现步骤：比较本地 HEAD、工作树、线上响应头和在线 DOM。
- 实际结果：[已核实] 本地 HEAD 为 `00328ddcc46ab87ed9fb9d1548de6038942b48b1`，工作树有预先存在的未提交变更；线上由 Vercel 返回 ETag、`x-vercel-id`、cache/prerender 标识，但没有可映射到 Git commit 的 build/deployment ID。[已核实] 本地歌曲组件已含三字段及 Digital Book 限制，线上仍是旧呈现，证明本地工作树至少不等同于本轮线上页面。[推断] 最近修改尚未全部进入当前线上构建；依据是同字段的直接 DOM 差异，不据此猜测具体部署 commit。
- 期望结果：公开构建提供可查询的构建标识，并由发布记录映射到 commit；ETag 只作响应连续性证据。
- 证据：`evidence/local-version.json`、`evidence/head/home.json`、`evidence/supplement-fetch-results.json`、线上/本地 Songs 对照。
- 影响：无法把本地检查结果归到本轮线上版本，也无法精准声明哪一批修改已发布。
- 修复范围：发布记录或非敏感 build metadata；不得泄露密钥。
- 验收条件：部署记录能把正式 URL 的 build/deployment ID 映射到不可变 commit；审计报告记录二者。

## 明确不是本轮产品缺陷的自动化失败

[已核实] `evidence/interaction-results.json` 原始结果为 77/91 passed。14 条 false 中，9 条和弦转位测试是定位器同时计入可见层与隐藏打印层造成的误报；实际符号、低音、三音和当前可见行均正确。`C/G` 在 `/chords` 根音卡片列表中不是独立记录，但在 `/chords/c-major` 的第二转位中正确提供为 C/G；按需求把它归为范围/发现方式，不归为理论错误。其余 4 条对应 PG17-001/002/003/004。
