# PianoGrid Chords N2C — Seventh 完整执行 Prompt

N2B 已完成并 push。现在实施 N2C：Seventh Chords。

## 先读取
- 当前 N2A family/subtype model
- N2A 审阅结论
- N2B 已稳定的 triad family 实现
- 本包全部文件
- 当前 shared detail template、validator、practice、audio、print、asset generator、tests
- 当前 route registry、navigation、sitemap

当前仓库代码是第一事实来源。本包是内容、SEO、内链与目标行为输入。

## 本批目标
一次发布：
- `/chords/seventh`
- 12 dominant7 details
- 12 major7 details
- 12 minor7 details
- 12 half-diminished7 details

共 49 个新 URL。

不要实施 Add / Extended / Altered。

## Step 1：四音模型兼容性 gate
不要单独写长审阅；检查后直接实施。

确认 N2A 审阅提出的以下能力是否已经存在：
- `family='seventh'`
- subtype：dominant7 / major7 / minor7 / halfDiminished7
- expectedNoteCount=4
- structured position 0/1/2/3
- third inversion
- family validator
- 4-note practice count
- 4 playback events
- print/PDF 4 positions
- detail-page breadcrumb/categoryRoute 非 major/minor 二元硬编码

若未实现，按 N2A 审阅方案做最小必要扩展。

Major/Minor/Dim/Aug/Sus 必须 0 regression。

## Step 2：Seventh family validator
新增独立 validator，不要把 triad validator 改成一堆 optional branches。

至少验证：
- definition 4 unique pitch classes
- subtype 公式正确：
  - dominant7 = 1–3–5–♭7
  - major7 = 1–3–5–7
  - minor7 = 1–♭3–5–♭7
  - halfDiminished7 = 1–♭3–♭5–♭7
- 4 positions 完整
- inversion index = 0,1,2,3
- Third inversion 存在
- lowest note / bassDegree / slash symbol 一致
- written spelling / MIDI / keyboard / audio / print 同步
- no invented fingering

## Step 3：组件参数化
检查并修改以下硬编码：
- “triad” 文案
- 三个 positions 的 caption/selector
- practice “Choose three”
- 固定 required pitch count=3
- 3-event playback onset
- print generator 3 positions
- mobile selector layout

要求：
- triad family 输出保持原样
- seventh 传入 4 notes / 4 positions
- 320/390/768/1440 均不横向溢出

## Step 4：数据接入
读取 `03_details/*.page.json`。

优先通过 seventh family adapter 接入。
不要复制 48 个页面组件。

保持：
- family=seventh
- subtype 明确
- expectedNoteCount=4
- four structured positions
- fingering=not_provided
- keyboard/audio/print 使用同一个 resolved realization

理论拼写必须保留；双降/重升不得静默改名。

## Step 5：分类页
新增 `/chords/seventh`。

必须在初始 HTML 中完整输出 48 个对象：
- Dominant 7
- Major 7
- Minor 7
- Half-diminished 7

支持 root + subtype filter，但 filter 只是客户端增强。
关闭 JS 后内容仍完整存在。

Filter 不创建新的 canonical/indexable URL。

## Step 6：导航
N2C 验证完成后，More Chords 加：
- Seventh Chords

保持现有：
- Diminished
- Augmented
- Suspended

Add / Extended / Altered 不进导航、不进 sitemap。

## Step 7：Hub / Finder / By-key / Progressions
不要因为 seventh 发布自动扩大所有工具范围。

默认：
- Hub 不新增 48 张重型卡
- 通过 Seventh category 导航承接
- Finder/By-key/Progressions 保持当前已验证范围

只有现有实现已有 family-aware adapter 和专项测试时，才允许纳入 seventh；否则明确保持边界。

## Step 8：Practice
Seventh 练习至少支持：
- requiredPitchClassCount=4
- exact 4-note set
- inversion-equivalent answer
- missing note
- extra note
- reset
- show answer

不要加入未经要求的听辨、MIDI input 或评分历史。

## Step 9：Audio
Resolved playback events 应有四个事件。
可使用当前项目统一 timing 规则，但最终 model 必须显式包含四事件。

验证：
- 4 oscillators/events
- ascending playback
- stop/cleanup
- switching position cancels old playback
- no triad-only slice(-3) / length===3 leakage

## Step 10：Print / PDF
正式生成器支持 4 positions。

要求：
- Root + First + Second + Third inversion
- 4-note written spelling
- 特殊 accidental glyph
- 不裁切
- 如果一页拥挤，可使用两页；不要缩到不可读
- 与页面当前 data model 一致

## Step 11：SEO / 内链
读取：
- `04_seo/N2C.url-keyword-tdh.json`
- `05_internal_links/N2C.internal-links.json`

完成：
- Title
- Description
- H1
- canonical
- breadcrumb
- sitemap
- category → detail
- detail → category/hub/guide
- same-root seventh type comparison

keyword volume 为空，不补造数字。
不添加 meta keywords。

## Step 12：验证
先运行：
`python 07_validation/validate_n2c_content.py`

然后执行当前仓库全部相关回归：
- Foundation
- TypeScript/CSS
- adapters
- B2/B3
- N1
- N2A
- N2B
- existing chord details/categories
- guide/finger
- by-key
- progressions
- finder/final chords
- browser regression
- production integration
- build
- git diff --check

新增 N2C 专项：
- 48 details 全部 200
- `/chords/seventh` 200
- 12/12/12/12 counts
- subtype/formula
- 4 notes
- 4 positions
- third inversion
- slash bass
- theoretical spelling
- MIDI / keyboard / audio / print
- practice 4-note logic
- no fingering
- raw HTML
- mobile position selector
- PDF/SVG render
- nav/sitemap

## Existing zero-regression gate
必须证明：
- Major/Minor 25 details 不变
- N2B 48 details 不变
- metadata/canonical 不因 seventh 模型改变
- triad positions/order 不变
- triad fingerings 不变
- triad audio/print/practice 不变
- sitemap 旧 URL 不丢失

## 完成报告
只输出：

# N2C Result
## Status
PASS / PASS_WITH_NOTES / NEEDS_FIX

## Published
- Category:
- Details:
- Total new URLs:

## Model changes
- ...

## Navigation
- ...

## Hub/tool boundary
- ...

## SEO/sitemap
- ...

## Validation
- ...

## Four-note / print / asset notes
- ...

## Existing regression
- ...

## Manual checks still required
- ...

## Files changed
- ...

然后停止。

不要开始 Add / Extended / Altered。
不要提交。
不要 push。
不要部署。
