# PianoGrid Chords N2B — Codex 完整执行 Prompt

N2A 已通过。现在一次实施 N2B。

## 先读取
- 当前仓库 N2A family/subtype 模型与四组 data-only fixtures
- 本包全部文件
- 最近 N1/N2A RESULT
- 当前 public route registry、navigation、sitemap、detail template、asset generator、tests

当前仓库实现是第一事实来源；本包是内容/路由/SEO/内链输入。

## 本批目标
一次发布：
- `/chords/diminished`
- `/chords/augmented`
- `/chords/suspended`
- 12 个 diminished detail
- 12 个 augmented detail
- 12 个 sus2 detail
- 12 个 sus4 detail

共 51 个新 URL。

不要实施 Seventh / Add / Extended / Altered。

## 快速兼容性 gate
不要单独停下来写长审阅。
确认：
1. N2A 的 `family/subtype/position` 可直接承接四类。
2. note spelling parser/validator 能否处理 `𝄫`、`𝄪`、B♯、E♯ 等理论拼写。
3. PDF/SVG 生成器能否可靠显示这些字符。

若只是 parser/font/asset 局部不足，做最小必要修复后继续。
只有会破坏 Major/Minor 或无法可靠生成资产时才停止。

## 数据接入
优先把 `03_details/*.page.json` 适配进 N2A family adapter。
不要复制 48 个页面组件。

必须保持：
- family=`triad`
- subtype 明确
- expectedNoteCount=3
- 三个 structured positions
- keyboard/audio/print 使用同一个 resolved voicing
- fingering=`not_provided`

不得自动生成指法。

## 理论拼写硬约束
Diminished / Augmented 的 written spelling 按本包 definition 保留。
出现双降或重升时：
- 页面可解释等音琴键
- keyboard 高亮正确 MIDI
- audio 播放正确 MIDI
- 正文、formula、print 不得静默改成简单 enharmonic spelling

## 分类页
新增：
- `/chords/diminished`
- `/chords/augmented`
- `/chords/suspended`

前两页各完整服务端输出 12 个 chord cards。
Suspended 同页完整输出 12 sus2 + 12 sus4。

root/subtype filter 是客户端增强；关闭 JS 仍能看到完整卡片。
Filter 不创建新的 canonical/indexable URL。

## 导航
验证通过后把以下加入 `More Chords`：
- Diminished Chords
- Augmented Chords
- Suspended Chords

保持 Browse / Explore / Learn。
Seventh / Extended / Add / Altered 不进导航、不进 sitemap。
不重新设计 Header 视觉。

## Hub
不要直接把原 25 张重型卡膨胀成 73 张重型卡。

优先：
- 数据注册层纳入新 family；
- UI 使用 chord type filter + compact result/card；
- 若当前 Hub 不适合承载 73 张重卡，保留主要 practical set，并从 category/finder 导航新 family。

在 RESULT 说明最终策略。

## Finder / By-key / Progressions
不要因为 detail model 扩展就自动扩大这些工具范围。
只有已有 family-aware adapter + tests 才允许纳入新 family。
否则保持原已验证范围和文案。

## 页面内容
复用 shared detail template，保留：
- direct answer
- keyboard
- three positions
- play/stop
- print/PDF
- theory
- comparison
- FAQ
- sources
- related links
- no-JS content

Sus 不得显示成 major/minor quality，也不得出现“第三度决定 major/minor”的误导性组件文案。

## SEO / 内链
读取：
- `04_seo/N2B.url-keyword-tdh.json`
- `05_internal_links/N2B.internal-links.json`

完成 TDK/H1/canonical/breadcrumb/sitemap 与规划内链。
keyword volume 为空，不补造数字。
不添加 meta keywords。

## Assets
按当前 production 资产 pipeline 生成详情页需要的 PDF/SVG。
验证：
- written spelling
- MIDI
- 三 positions
- 特殊 accidental glyph
- 不裁切

若导出工具无法可靠显示双 accidental，停止受影响页面发布并记录；不得用错误拼写绕过。

## 验证
先运行：
`python 07_validation/validate_n2b_content.py`

再运行项目全部相关验证：
- Foundation
- TypeScript/CSS
- adapters
- B2/B3
- N1/N2A
- existing details/hub
- guide/finger
- by-key
- progressions
- finder/final chords
- browser regression
- production integration
- production build
- git diff --check

N2B 新增专项：
- 48 details 200
- 3 category pages 200
- 12/12/12/12 object count
- subtype/formula
- theoretical spelling
- 3 positions
- slash bass
- MIDI/keyboard/audio/print
- no invented fingering
- raw HTML
- mobile filters
- PDF/SVG glyph rendering
- navigation/sitemap

Major/Minor 零回归：
- 原 25 details URL 不变
- metadata/canonical 不因模型扩展变化
- positions/order、fingerings、audio、print 不变
- existing sitemap routes 不丢失
- 全量 regression 通过

## 完成报告
只输出：

# N2B Result
## Status
PASS / PASS_WITH_NOTES / NEEDS_FIX

## Published
- Categories:
- Details:
- Total new URLs:

## Navigation
- ...

## Data/model
- ...

## Hub strategy
- ...

## SEO/sitemap
- ...

## Validation
- ...

## Spelling / asset notes
- ...

## Existing regression
- ...

## Manual checks still required
- ...

## Files changed
- ...

然后停止。

不要开始 N2C。
不要提交。
不要 push。
不要部署。
