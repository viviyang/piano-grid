# PianoGrid 收录质量修复 V2 — 本地交付

日期：2026-09-24。状态：`READY_FOR_MANUAL_ACCEPTANCE`；生产修复 `NOT_DEPLOYED`；Google 当前收录 `NOT_VERIFIED`。

## 基线和范围

- [已核实] 前一项首页任务已先在独立分支 `codex/home-v4-final-r2` 提交为 `5e67bd9e16373c8f849372aed0d0f2f114959866`。本轮位于独立工作树 `codex/indexing-quality-v2`，从该提交开始；它直接后继当时及最终复核时的远端 `origin/main=0d94029ac257f3534141b304a3fc6603fd46d9b8`。原用户工作树及其未提交改动未动。
- [已核实] 当前本地 sitemap 有 206 条 HTML URL；原 7 条都在其中。本轮技术脚本逐条请求 206 条。`page-audit.csv` 是完整清单；`affected-urls.csv` 列出 146 条本地受影响 HTML URL 和 136 条重新生成的 PDF URL。146 是涉及问题的 URL 数，不是 146 个独立根因，也不是 146 页全部经过人工产品验收。
- [已核实] 生产基线采集于 `production-baseline.json`：原 7 页及进行页当时返回 200、预期 canonical、`index, follow`；生产 PDF 与本地修复文件的哈希仍不同。没有修改路由、TDH、canonical、robots、sitemap、索引策略或依赖，没有 push/deploy。

## 问题结论与实际修复

| ID | 状态 | 结果 |
|---|---|---|
| N01 | `FIXED_LOCAL` | 追踪模式数据、适配器和显示组件后，为 8 条既有进行模式明确保存罗马数字，显示时与和弦质量分开；C、E、A 调切换及所有模式做一致性断言。保留原有符号、音符、播放数据。 |
| F04 | `FIXED_LOCAL` | 复现 5 份样本中的降号缺失；四套既有生成器共用可嵌入且许可已核对的 Noto Sans SC 常规字重，仅在导出文本中把双降/双升改写为 `♭♭`/`♯♯`。136 份生成 PDF 与公开副本重新导出；所有 171 份公开 PDF 扫描无缺字/替代字符，136 份按源音符、嵌入字体及副本哈希校验。公开 SVG 中 112 份因可读来源说明同步变化，24 份字节不变。字体文件未放进仓库。 |
| F01/F02 | `FIXED_LOCAL` | By-key 范围由现有 12 大调 + 12 自然小调数据得出，移除过时限制；链接只在根音拼写、符号和质量准确对应已发布详情时生成。336 行中有效详情链接由 237 提至 289；另外 47 行保留非链接文本，不制造近似目标。 |
| F03 | `FIXED_LOCAL` | 和弦指南保留一条有顺序的简短入门路径，删去实施措辞和重复段落，保留各自不同的进阶内容与已有组件链接。 |
| F05/F06 | `FIXED_LOCAL` | A minor 原位说明去重；B♭、E♭、C♯ minor 和 C diminished 只补具体找键/辨错指导，既有交互、音符和 TDH 不变。 |
| F07/N02 | `FIXED_LOCAL` | 按和弦类型筛选真正适用的公开来源，移除竞品调研语气和内部编号；sus2 不再展示 diminished/augmented 的支持说明。服务端传到客户端的来源属性也做公开投影，抽样原始 HTML/水合数据无内部编号。打印资源保留读者可理解的来源文字。 |
| N03 | `FIXED_LOCAL` | By-key、进行、finder、分类筛选统一将内部质量枚举映射成可读名称，内部数据键保持原样。 |
| V01 | `NOT_REPRODUCED` | C major 正常屏幕 DOM 虽有两处同名标题，但仅一处可见、无障碍树仅一处；隐藏的另一处属于打印结构。本轮未修改。真实打印仍待人工检查。 |
| V02 | `FIXED_LOCAL` | 在四个和弦家族页复现键盘 MIDI 范围与可见 caption/aria 不一致；共用键盘组件现在从实际 MIDI 起止点生成两处标签，四页浏览器检查通过。 |
| V03 | `NOT_REPRODUCED` | Extended 108 行、Altered 96 行在禁用 JS 的原始页面和 JS 水合后都完整可读，未发现 CSR 空壳。本轮未改变其加载架构；Google 实际渲染版本仍需 GSC 核实。 |

对 D minor 旧标题、G major/A major/Cadd9 等历史候选，当前实现无本轮已确认的新缺陷，未按旧快照重写。原 7 页均有实际修复或适用的共享修复。共享实例名单见 `affected-urls.csv`；页面与资源一一对应见 `pdf-assets.json`。

## 本地证据

- `npm run check`：Foundation 568/0，TypeScript 与 CSS 检查通过。
- `npm run build`：211/211 静态页生成完成；这是构建结果，单独不算产品验收。
- 3047 端口最终构建：进行 100/100、By-key 147/147、浏览器交互 43/43。浏览器覆盖 7 原页无 JS 内容、By-key 精确链接、三调进行、转位/音频、来源、四家族键盘范围、移动端宽度、进行页控件对齐、Altered 页目录与筛选栏间距及 V01/V03 候选；明细见 `browser-evidence.json`、`progressions/`、`by-key/` 和 `screenshots/`。
- 本地 sitemap 206/206 请求成功，canonical、robots、主内容/H1 未见技术错误。`technical-summary.json` 与 `page-audit.csv` 记录逐 URL 结果；`NOT_VERIFIED` 字段没有用模板测试替代逐页验证。
- `pdf-assets.json`：136 份生成 PDF、171 份公开 PDF，0 失败。B♭、E♭、D♭、C♯ minor、F♯ minor 及 D♭ diminished 的 PDF 用 PDF 渲染器和 Chrome PDF 查看器抽样查看；当前截图为 `pdf-render/*-noto.png` 与 `pdf-render/*-noto-chrome.png`。抽样字形和图示可读，不等于全部 PDF 已人工逐页或无障碍验收。
- `git diff --check` 无空白错误；仅提示历史 CRLF/LF 转换。受保护源内容、页面路由、SEO 和设计文件无本轮 diff。
- 审核反馈后：首页主标题恢复原有字重、Hero 遮罩减轻；进行页控件和 Altered 页目录/筛选栏排版已整理。用户表示其余人工检查通过。这些改动均在同一次本地构建中。

## 尚未通过或未核实

- [已核实] 历史 `check-integration-data.mjs` 为 126 项中 26 失败，失败聚焦未修改的受保护源哈希；`check-integration-batch.mjs` 为 184 项中 58 失败，包含旧首页/导航/TDH 断言及新路由处理异常。本轮没有为通过旧断言而改源内容或放宽白名单。`check-integration-production.mjs` 在 Node 直接加载现有 TypeScript 模块时因无扩展名的 `site-config` 导入而报 `ERR_MODULE_NOT_FOUND`，所以该门禁未通过。发布集成前需由该门禁维护者核对当前规范并修复脚本；本轮不能声称全套 CI PASS。
- `NOT_VERIFIED`：真实手机、读屏、专业乐理审阅、实际听音、实际打印和 PDF 无障碍决定；全部 146 页逐页交互/Googlebot 渲染；GSC 当前覆盖、Google 选择的 canonical、抓取版本及索引状态。
- [已核实] 当前生产仍是旧资源；本轮无 push/deploy，也没有对 GSC 请求重新抓取。当前代码修复与 Google 收录之间没有已证实的因果结论。

## 审核后动作

1. 审核本工作树的页面、PDF 样本及上述未通过门禁；对真实设备、听音、打印、读屏和乐理作具名验收。
2. 获得发布授权后，集成到批准的生产基线，再复验生产 7 原页、共享页面、136 份 PDF 的响应/缓存与 206 URL 技术清单；目前不要把本地结果写成生产结果。
3. 发布后按 `gsc-followup.csv` 在 GSC 对原 7 URL 分别记录实际抓取时间、抓取 HTML、Google 选择的 canonical、索引状态及复查日期。只有 GSC 数据能确认后续收录变化。
