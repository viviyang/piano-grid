# Four minimal improvement plans — report only

[已核实] 本文件是计划，不包含实现、部署或生产代码修改。四项均限定在现有 17 条 URL、现有品牌/布局和现有内容包内。

## 1. 基础和弦覆盖

### 最新盘点

- [已核实] `/chords` 当前有 19 个根位三和弦记录：C、Am、F、Dm、G、Em、D、Bm、A、F♯m、E、C♯m、B、G♯m、B♭、Gm、Cm、A♭、C♭。
- [已核实] F、Dm、Em 已存在，不应重复新增。
- [已核实] C/G 没有作为中心页独立卡片，但 `/chords/c-major` 的第二转位正确提供 C/G：G4–C5–E5。它是 C major 的转位，不是新的根位三和弦记录。
- [已核实] C♭ 根位筛选结果是 C♭4–E♭4–G♭4，Bass Cb4；拼写和跨八度语义保留。`Print matching chords` 的打印快照也保留 C-flat/C♭。
- [已核实] A、Am 及其三种转位的符号、音序、低音、图示和技术音频调度同步。公开指法为空/不宣称的地方继续保持 null。

### 最小变更

不新增和弦数据。只补现有测试和发现入口：

1. 在已有集成检查中固定断言 19 条在线集合，并单独断言 F/Dm/Em、C♭、A/Am。
2. 把 C/G 的验收写在 C major 详情第二转位，不把它硬塞成 `/chords` 的独立根位记录。
3. 修正测试定位器，使琴键计数只针对当前可见交互图，不把隐藏打印层算入；这消除本轮 9 条假失败。
4. 对 A、Am、C、C♭执行同一数据链的音名→MIDI→图→技术发声→当前位置/筛选集合打印一致性检查；没有来源的指法继续为 null。

### 可能涉及

- 现有 chord 数据注册表/共享详情组件。
- 现有 `scripts/check-*` 和集成批检查；不新增依赖。
- 可复用材料：`docs/content/site-master/preserved-chords/page-content.json`、`content-pack.md` 的 S01/S02/S05/S06 和 F01–F10、现有 SVG/PDF。

### 回归范围

`/chords`、`/chords/a-major`、`/chords/a-minor`、`/chords/c-major`；三种转位、筛选空状态、Cb4/B3 同键异名、音频 Stop/快速切换、当前结果与筛选集合打印。

## 2. 现有 17 页内链

### 最小变更

只在现有正文相关参考区增加普通 `a[href]`，不动 URL 或全局导航：

1. `/chords/a-major` ↔ `/chords/a-minor`：链接文案说明“只比较三音 C♯/C 的变化”。
2. `/chords/c-major` ↔ `/scales/c-major`：明确“一个是 C–E–G 三和弦，一个是 C 大调音阶”，避免把 C major chord 误读为调内全部三和弦。
3. `/keyboard-notes`、`/keyboard-notes/labeled`、`/keyboard-notes/chart` 形成查单音→看全键盘→谱表对照的任务链；chart 回 labeled。
4. `/guide/read-sheet-music` 保留去 chart 的 C4–F4 自查，并增加回 labeled 的全键盘定位；`/guide` 继续作为父级第一任务入口。
5. 详情页保留回父级；不链接 `/songs/pop`、`/sheet-music` 或 127 条计划路由。

### 可能涉及

现有页面 related references/正文 CTA 数据；不新增组件也可完成。可复用 `src/lib/site-routes.ts` 的 17 路由白名单和现有 breadcrumb。

### 回归范围

- 自动抽取 17 页正文 href，断言所有站内目标 200、canonical 不串页、没有未发布入口。
- 键盘导航与可见焦点；链接文案脱离上下文仍可理解。
- 打印隐藏层不能制造重复可点击链接或重复播报。

## 3. 歌曲卡片

### 最小变更

优先部署/复核当前本地工作树已有的展示适配，不改内容包：

1. 主卡稳定显示 `Difficulty (publisher label)`、`Arrangement`、`Acquisition format`。
2. 难度只取出版商明确标签；缺失显示 `Unknown — no publisher level listed`。Piano/Vocal、piano solo、lead sheet 等只进入 Arrangement。
3. CTA 根据实际目的写“Open publisher resource/collection”；只有站内真实 PDF 才用 Download。付费、合集、表单门槛、在线不可下载等决策信息不可藏进长说明。
4. Sweden 使用一次标准署名，并显示 `Printed book or Hal Leonard Digital Book. The digital book is online-only and cannot be downloaded or printed.`
5. All of Me 首屏显示 `piano/vocal with guitar chord frames`，难度仍为 Unknown；不从编配推断初学难度。
6. 重复长说明可放 details，但上述决策字段保持展开。技术难点只有样谱/出版商明确证据时才填写，否则保留未知。

### 可能涉及

- [已核实] 本地 `src/components/songs/resource-card.tsx` 已有三个字段；`src/lib/song-content.ts` 已有 Sweden 的在线限制映射；`PersonLine` 已有去重逻辑。这些是候选复用材料，不代表线上已生效。
- `src/components/songs/pages.tsx` 的 Easy collection 表格也已有 Difficulty/Arrangement/Acquisition format 列，可复用统一标签。
- 数据来源：CR-04（Minecraft）、CR-19（All of Me）及现有 C-Songs source ledger。

### 回归范围

`/songs`、`/songs/easy`：15 张主卡逐张字段完整性，搜索/筛选/空状态/重置，作者去重，外链真实目标，合集/单曲、费用、格式与门槛。供应商页面会变化，发布前重新核对，不从 HTTP 200 推断价格或授权条件。

## 4. 对外来源

### 最小变更

建立一个只读展示适配：输入内部 `source_id`，输出 `source name / URL / locator / applies to / checked_on / evidence type`。不要复制整份账本到每页。

1. scale 页面保留现有 `Sources and checking scope` 形式，作为基准。
2. chord 使用 preserved-chords 的 S01/S02/S05/S06 等：三和弦规则、转位规则、音区/异名、频率公式分别列适用范围；F03/F07 等推导明确标为 derivation。
3. keyboard 把 PDF 中的 BK-KORG/BK-ROLAND/BK-YAMAHA-* 等内部 ID 转成人可读名称与链接；打印页若空间有限，给简短名称和稳定网页来源区链接，而不是裸 ID。
4. songs 使用 CR-04/CR-19 等正式产品页，并将出版商事实与 PianoGrid 的编辑选择分开。
5. guide/原创练习标为原创教学材料；外部理论依据单列。教师审阅只有具名实际完成后才显示，不把数据核对或部署日期当教师复审日期。
6. 网页与 PDF 分别验收；网页可用不代表 PDF 阅读顺序合格。

### 可能涉及

`docs/content/site-master/source-ledger.master.md`、各批 `batch-source-ledger.md`、`preserved-chords/content-pack.md`，以及现有来源展示组件/打印页脚。无需新外部服务或账号。

### 回归范围

- 每个公开来源标记可映射到存在的 ledger ID；名称、URL、定位、适用范围不为空。
- 同 URL 多 ID 不冒充独立交叉来源。
- `search excerpt`、`landing_page_only` 不升级为全文核验。
- checked_on 只表示资料核查日期；teacher review 使用独立字段。
- PDF 重新渲染全部页，并另做标签/阅读顺序决定。

## 建议实施顺序

1. PG17-003 与 PG17-001/002：购买与格式决策正确性。
2. PG17-004/007：状态语义与 PDF 无障碍决定。
3. PG17-005/009：任务内链与来源透明度。
4. PG17-006/008：打印效率和可观测性。

每一批先在本地生成独立验收证据，再由具名人工完成读屏、听音和打印门禁；没有明确发布授权时不部署。
