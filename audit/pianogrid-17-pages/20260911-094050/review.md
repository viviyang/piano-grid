# PianoGrid 17-page deployed audit

## 结论摘要

线上采证窗口：2026-09-11 09:40:50–10:09:19（Asia/Shanghai）；报告完成时间：10:19:11。正式入口：`https://pianogrid.com/`。

- [已核实] 17/17 页面均在同一审计窗口返回 HTTP 200；请求 URL 与最终 URL 一致，Title、description、canonical、robots、一个可见 H1 均存在。17 个 canonical 逐页对应，没有串页；robots 均为 `index, follow`。
- [已核实] `robots.txt` 允许抓取并指向 sitemap；sitemap 恰好列出这 17 条授权 URL，与本地发布注册表集合一致。HTTP、`www` 均 308 到正式 HTTPS 裸域名。
- [已核实] 随机不存在路径、`/songs/pop`、`/sheet-music` 均为真实 HTTP 404；不是抓取器 cache miss，也没有观察到软 404。
- [已核实] 17 张桌面全页截图、17 张移动全页截图、9 个交互页的 320px 与 200% 文本样本均已保存并检查；52 张 PNG 都不是空白图。所有采样都未出现整页横向溢出；琴键自身的局部滚动区保留。
- [已核实] 17 页桌面/移动抓取期间控制台错误 0、页面脚本错误 0、失败资源响应 0、可见但无可访问名称的表单控件 0；两张公开图片资源返回 200 且有真实尺寸。
- [已核实] 原始交互集 91 项中脚本直接通过 77 项；补充交互 4 项均通过。原始 14 项 false 经复核：9 项是隐藏打印层造成的定位器误报，1 项是 C/G 不作为中心根位记录的范围现象，剩余 4 项对应实际问题 PG17-001/002/003/004。
- [已核实] 8 个下载 PDF 全部返回 200、可打开、未加密，共 21 页；逐页渲染无空白页或明显裁切。全部 `tagged=false`，所以 PDF 无障碍不能判通过。
- [已核实] 没有发现已确认的音乐理论错误、错误音高移调、错误古典旋律小调下行、错误 canonical/noindex 或任务级 P0 阻断。
- [已核实] 共记录 10 项：P1 4 项、P2 5 项、P3 1 项。P1 是歌曲决策字段、Digital Book 使用条件、PDF 标签结构、部署版本可追踪性。

结论不是“17 页全部通过”。17 页在 HTTP/DOM/真实截图/自动化交互的采样维度均完成，但由于没有真实读屏、真机、人耳听音、原生打印/纸张和真实用户性能数据，每页 `page_status` 均记为 `partial`；没有页面在基础访问层面 `blocked`。

## A. 审到的版本

- [已核实] 本地 HEAD：`00328ddcc46ab87ed9fb9d1548de6038942b48b1`，分支 `main`；工作树在审计开始前已包含未提交修改。
- [已核实] 线上响应显示 `server: Vercel`、`x-vercel-cache: HIT`、`x-nextjs-prerender: 1`、逐页 ETag 与 `x-vercel-id`。17 页有限重试均为 200，且每页 ETag 在本轮初次与复查间保持不变。
- [已核实] ETag 与 Vercel 请求 ID 不能映射到 Git commit，线上没有可用的非敏感 build/deployment 标识。因此 17 页 `observed_version=unknown`。
- [已核实] 本地 Songs 组件已经有三个字段和 Sweden Digital Book 限制，但线上 DOM 仍显示旧字段与重复署名。[推断] 最近本地修改尚未全部进入本轮线上构建；依据是同一内容字段的直接差异，不猜测线上具体 commit。
- [已核实] 本轮未观察到部署切换：17 个 ETag 在审计窗口内稳定。这只能说明本轮响应连续，不能证明 commit。

版本证据：`evidence/local-version.json`、`evidence/head/*.json`、`evidence/supplement-fetch-results.json`。`evidence/supplement-results.json` 来自一次不兼容 API 的失败尝试，已在有效替代结果中标为 invalid，任何 HTTP 结论均未引用它。

## B. 17 页逐页状态

所有页面的完整正文、metadata、入出链和证据路径见 `pages.json`。

| URL | page_status | 本轮已核实的页面职责/功能 | 主要问题或未完成门禁 |
| --- | --- | --- | --- |
| `/` | partial | 保留既有 Title/H1/Hero；只展示 17 页内的有效入口；Hero 图片加载 | 线上 build 未知；真机/读屏未做 |
| `/tools` | partial | 工具中心只链接当前存在的 keyboard chart、chords、scales、blank sheet、guide | build 未知；真机/读屏未做 |
| `/songs` | partial | 6 个具体版本；搜索、难度/目标筛选、空状态与重置可用；6 个出版商入口均 200 | PG17-001/002/003；没有逐项独立验证当前价格/授权/所有格式 |
| `/songs/easy` | partial | 9 个具体初学版本，按起点筛选；另有 50 首同一合集曲目表；与 Songs 的目录发现职责不同 | PG17-001；20 个唯一外链只核到状态/标题，未把 HTTP 200 当格式与价格证明 |
| `/tools/blank-sheet-music` | partial | A4/US Letter、100–150% 屏幕预览；两个固定 PDF 均为一页且纸张尺寸正确 | PG17-007；未真实打印到纸张 |
| `/keyboard-notes` | partial | C、C4、A-flat、A♭4、Cb4、B#3、D8、61/88 切换、点击与键盘定位均符合项目数据；缺八度要求选择，超范围不移调 | PG17-005/008/009；人耳/真机/读屏未做 |
| `/keyboard-notes/labeled` | partial | 88 键全范围分段标注；61 键切换为 C2–C7；与单音查找职责不同 | PG17-006/007；九页 PDF 与真实打印未验收 |
| `/keyboard-notes/chart` | partial | 谱表—音名—琴键联动；Enter 选音有效；与 labeled 的全键盘职责不同 | PG17-005/008/009；原生打印/读屏未做 |
| `/chords` | partial | 19 个现有根位记录；A/Am/F/Dm/Em/C♭ 可用；C♭4–E♭4–G♭4 与 Bass Cb4 保留；当前/筛选打印快照可生成 | PG17-005/007/008/009；C/G 在 C detail 作为转位而非中心独立记录 |
| `/chords/a-major` | partial | 打开即 A major；A、A/C♯、A/E 三种转位的音名、低音、图与技术发声状态同步 | PG17-004/005/007/008/009；人耳/读屏/纸张未做 |
| `/chords/a-minor` | partial | 打开即 Am；Am、Am/C、Am/E 三种转位同步；浏览器可访问树只暴露活动行的 `current selection` | PG17-004/005/007/008/009；真实读屏尚未跑 |
| `/chords/c-major` | partial | 打开即 C major triad，不是“C 大调所有三和弦表”；C/G 为 G4–C5–E5 第二转位 | PG17-004/005/007/008/009；人耳/读屏/纸张未做 |
| `/scales` | partial | C 大调和 A 小调三种形式；左右手、升/降/上下行组合的音名、图、指法字段同步 | PG17-008；音频仅技术检查，未人耳确认 |
| `/scales/c-major` | partial | C 大调左右手/方向完整；指法标为来源核查值 | PG17-005/008；未真实打印/听音 |
| `/scales/a-minor` | partial | 自然/和声/古典旋律形式完整；古典旋律下行为 A–G–F–E–D–C–B–A，无 F♯/G♯；Stop/pagehide 技术调度有效 | PG17-005/008；未人耳听音、真 iPhone、纸张打印 |
| `/guide` | partial | 有可执行第一任务：找中央 C、相邻音与节拍/休止；可进入识谱和弦工具 | PG17-005/009；真人教学审阅未证实 |
| `/guide/read-sheet-music` | partial | 有高低音谱号谱例、锚点说明、C4–F4 自查与 4 页阅读包 | PG17-005/007/009；PDF 读屏与纸张未验收 |

## C. 本轮确认正常或可关闭的旧疑点

以下仅表示本轮线上证据所见，不把旧报告的版本当比较基线：

1. [已核实] Am 三种转位的可见高亮一次只有一项，当前音符/低音随选择改变；浏览器可访问树也只在当前行读到 `current selection`。因此不能把旧抓取的三处文本直接判为视觉错误或已证实的重复播报。PG17-004 只保留 DOM/状态语义风险。
2. [已核实] Songs CTA 没有统一写成 `Download PDF`；都使用 `Open publisher resource`。尚存问题是没有把在线不可下载/打印的决策信息前置。
3. [已核实] 查音对 Cb4/B#3/A♭4 保留书写名和正确物理键；D8 在 88/61 键范围外均保持错误消息，不静默换八度。
4. [已核实] A minor 古典旋律形式下降已正确回到自然小调音级。
5. [已核实] chord 三条详情打开即对应对象；C major chord 没有被做成 C 大调内全部三和弦列表。
6. [已核实] Guide 有第一任务；Read Sheet Music 有真实谱例、说明和自查；空白谱纸的主要交付是准确的一页 A4/Letter 文件，而不是长文章。
7. [已核实] 17 页 metadata、canonical、robots、图片加载、404、站点地图和基础移动重排没有本轮失败证据。

## D. 核心交互结果

### 查音

[已核实] C → `Which octave?`，C4 → MIDI 60；A-flat → 八度选择，A♭4 → Ab4/MIDI 68；Cb4 → B3 物理键/MIDI 59；B#3 → C4/MIDI 60；D8 明确超出 A0–C8。61 键模式为 C2–C7，C4 有效、D8 超范围。鼠标点击和 ArrowRight+Enter 选择有效。

### 和弦

[已核实] A、Am、C 三页每个转位的符号、低音、三音顺序和当前可见行一致。原始测试把隐藏打印图的键位重复算入，造成 9 条假失败。中心页 F/Dm/Em 已存在；C/G 在 C detail 第二转位存在。Cb 筛选与打印快照保留 C♭ 拼写及 Cb4 音区。

### 音阶

[已核实] C 大调与 A 小调各组合的图、音名表、方向和指法字段同步。没有来源的下降指法没有自动补数字。古典旋律小调上下行为升 F♯/G♯、下行为自然 G/F。

### 音频

[已核实] 页面载入前没有 AudioContext；首次按钮手势后创建。Chord 的同时/逐音、快速换转位和 Stop 会停止/断开节点；Scale 的 Stop 也停止/断开，合成 pagehide 触发清理并停止活动 oscillator。[限制] 这是事件调度与节点生命周期检查，不是人耳听音或真 iPhone；合成 pagehide 后文档未真正销毁，不能据此宣称所有浏览器都无残留。

### 打印/下载

[已核实] 当前和弦、筛选和弦、当前音阶、当前谱表范围的 print-only 快照读到对应选择；没有把打开打印流程当成纸张完成。8 个固定 PDF 已实际下载、解析并渲染 21 页。A4/Letter 空白谱纸尺寸分别约 595×842/612×792 pt；其他均为 Letter。视觉页无空白/明显裁切，标签结构全缺失。

### 歌曲

[已核实] 搜索 Minecraft 只剩 Sweden；Easy Piano 筛出 The Happy Farmer/Addams Family Theme/Sweden；组合筛选有明确空状态；重置回 6 条。20 个唯一外部 URL 有限 GET 均为 200；这只证明当时可访问及页面标题，不证明价格、库存、许可或每种格式。Songs 仍有 PG17-001/002/003。

## E. 技术、性能与安全边界

- [已核实] 首页仅有 WebSite JSON-LD；其余 16 页未观察到 JSON-LD。没有发现无效 JSON-LD，但是否需要新增 schema 不在本轮四项计划范围。
- [已核实] 首页、keyboard、Am chord、A minor scale 做了单次 headless Chrome Navigation Timing：wall 2461–2716 ms、navigation duration 1319–1604 ms、约 203–233 KB 观测传输量。条件见 `evidence/performance/navigation-timing.json`。
- [限制] 环境没有现成 Lighthouse 报告，因此没有生成 Lighthouse 分数；单次实验室 timing 不能冒充真实用户 Core Web Vitals，也不能据此宣称性能通过或失败。
- [已核实] 未观察到常见统计实现标识，因此无法检查事件命名/成功回执；没有安装统计系统。
- [已核实] 安全检查只覆盖公开响应、协议重定向、索引文件、公开资产和错误页；没有漏洞利用、密钥读取、数据导出或账号授权。
- [限制] 没有 GSC 数据，不对索引结果或排名下结论。

## F. 尚未验证

1. NVDA、JAWS、VoiceOver 的真实播报、浏览顺序和重复播报。
2. 真 iPhone/iPad/Android 的触摸、音频解锁、旋转和离页行为。
3. 人耳逐音/和弦/音阶音高、包络、爆音和连续快速点击听感。
4. 系统原生打印对话框、不同浏览器分页、真实 A4/Letter 纸张和打印机边界。
5. PDF 标签、语言、阅读顺序的 PAC/Acrobat 与真实读屏验收。
6. 每个外部歌曲资源的当前价格、库存、授权、合集/单曲及所有供应商格式；本轮只核对在线卡片、URL/标题/状态，并采用用户提供的 Hal Leonard Digital Book 条件。
7. 真实用户性能、Core Web Vitals、GSC 索引/排名、现有统计后台事件。
8. 具名钢琴教师对指法、谱例与实际听音的专业审阅。

## G. 证据索引

- 逐页结构化台账：`pages.json`
- 问题：`findings.md`
- 四项最小计划：`proposed-patches.md`
- HTTP/协议/robots/sitemap/404/链接/资产/部署连续性：`evidence/supplement-fetch-results.json`
- 17 页原始 metadata/响应头：`evidence/head/*.json`
- 原始 DOM：`evidence/dom/*.html`（43 份）
- Accessibility tree snapshots：`evidence/aria/*.yml`（44 份）
- 桌面/移动/320/200% 截图：`evidence/desktop/`、`mobile/`、`extra/`（52 张）
- 截图像素检查与 contact sheets：`evidence/image-inspection.json`、`evidence/contact-*.jpg`
- 交互原始结果：`evidence/interaction-results.json`、`evidence/supplement-interactions.json`
- 下载与 PDF：`evidence/download-results.json`、`evidence/pdf-inspection.json`、`evidence/pdf-renders/`（21 张）
- 性能：`evidence/performance/navigation-timing.json`
- 本地/线上版本分离：`evidence/local-version.json`

## 代码与发布声明

[已核实] 这轮没有修改生产应用源码、配置、资源、URL、品牌、DNS、索引策略或部署；没有提交代码，也没有发布。新增内容仅位于本次独立审计目录，包括报告、原始证据和临时采证脚本。
