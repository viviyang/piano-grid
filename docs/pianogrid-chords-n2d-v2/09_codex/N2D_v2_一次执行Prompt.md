# PianoGrid N2D v2：一次批量实施 Prompt

## 本轮授权与固定决定

执行本文件以及本包中的确定版输入。上一份 N2D 包不是并行要求。

**完成 `/chords/add` + 24 个 add9/minorAdd9 详情，共 25 个公开 URL。地址与原 N2D 保持一致。**不要临时缩成 6–8 页，不增加 add2、别名、筛选或布局 URL。Extended/Altered 不在本轮。

允许最小代码适配和本批测试、资产生成、SEO/内链接入；不允许修改主题、不必要重构、删除正确内容、升级依赖、commit/push/部署、覆盖并行工作。缺少外部关键词 API 不阻断实施，不编造量值。

## 工作方式

同一会话从读取当前代码、适配、实施直到收尾。开始时简短说明当前状态和改动范围，无阻断问题就执行，不再输出单独“待确认审阅”让用户重复批准。代表性样例通过后批量接入剩余对象，最后集中验收；不要每一页都重跑完整 Foundation。

发生真实阻断（N2C 没在当前工作树、文件冲突无法分辨、核心行为无法实现、内容或字形错误不能安全解决）才停下。没有指法/教师背书不是填数字的理由；保持 not_provided。某页未完成就不得假报 25/25。

## 0. 读取与一次快速基线核对

读取：
- 当前 N2C 结果和真实工作树：`git status --short`、分支、HEAD。
- 项目 AGENTS.md、package scripts、实际 routes/navigation/sitemap。
- 当前 Add（如已存在）、Seventh 和 Triad 的 type/adapter/validator/detail/keyboard/audio/practice/print。
- 本包 `01_decision/scope-lock.json`、`02_model/`、`03_content/`、其余 manifest。

不要假设 N2C 已经 push。只要当前代码存在且可构建，就在本地接着做；未经授权不替用户 commit。如果发现旧 N2D 已部分完成，原路径更新，不额外建 v2 页面。

复用已有同版本证据。本轮只条件检查旧源 bassDegree 语义：如果字段是 chord-member ordinal，就别当作实际 ♭3/♭5/♭7；如当前 adapter 已处理则不改。不得据源文件推断用户线上页面必错。

另仅检查 N2B 三音页面是否还显示 `three inversions`：若当前只有 root/first/second，就纠正为 `three positions`（或 `two inversions plus root position`）；若当前已正确则不改。不改路由或展开全站文案重写。

保存开始时的实际业务 URL 集合、已有 metadata 和工作区改动清单；保护并行 Scales 等工作。

## 1. 建立 Add-specific 适配，不重建网站

`03_content/details/*.page.json` 和 `add.category.page.json` 为唯一内容输入。

这些是 authoring 结构，不要求将字段原封不动塞进现有代码。以实际 N2A/N2C model 做最小 adapter/finalizer；继续用共享 detail template 和 family-specific validator。

- `family=add`；两 subtype 为 `add9`、`minorAdd9`。
- definition 与 realization 分开；notes、formula degree、pitch class、具体 MIDI 含义清楚。
- 明确两个 root-bass 布局，不自动枚举 Seventh 四种位置，不宣称 Add 无法转位。
- `ninth-above` 的 14 半音只约束该示例；inside 示例是 2 半音。禁止 family-wide `ninthMidi - rootMidi === 14`。
- 不复制 runtime chord dictionary；解析后的同一对象驱动文本、keyboard、audio、practice、print。
- 不强制安装 JSON Schema 库。本包 schema 为输入契约，可继续使用已有 TS + runtime validator。

validator 必须拒绝“定义是 C–E–G–D，但所有输出同步成 C–F–G–D”的情况。不能只验证输出彼此相同。

## 2. 修正旧版音乐解释与练习边界

页面既说明教材展示的 add9/add2 高低区别，也保留符号用法存在变体的范围。不把某一个示例、某一个来源的命名习惯写成所有演奏的唯一规则。

实现两种明确任务：

### Build the chord tones
- 对比完整 pitch-class set；忽略八度；允许同一音类的八度加倍。
- 漏组成音或多出其他音类才提示差异。
- 加入 root 上方的 minor/major seventh 都不属于这批完整 Add9 目标。

### Match this example
- 对比当前显示布局的完整具体 MIDI set（输入顺序无关）。
- 音类正确但八度/间距不符：显示 `The chord tones are correct. Now match the octaves shown in this example.`
- 不能显示“不是 Add9”，不能把这种目标直接挪用为所有和弦识别的合法性定义。
- 清除、检查、显示答案、切换任务/示例都使用当前 active model，停止旧声音并清空过期反馈。

不新增 MIDI 输入、录音识别、账户、打卡或练习历史。

## 3. 页面与可访问性

先验证 Cadd9、D♭m(add9)（F♭拼写）和 Badd9（最高 C♯5），再同批接入其余对象。

保持实际主题 tokens、字体、header/footer 和已有视觉方式；只是 Add 内容/交互变体。不要为了添加控件把页面塞满。

- 标题和直接答案在首屏；两个布局的具体音名/公式/解释均在原始 HTML。
- 一个示例切换器，不是四个 inversion tabs。
- 每个布局的键盘范围都覆盖所有音，不能截掉第九音后仍通过。
- 切换只改活动示例，不改页面 canonical 或标题所指和弦对象。
- 使用现有按钮/选择器的语义和 focus 样式；键盘可操作，任务说明和反馈可读。
- 不禁止整页缩放；检查 200% 文本缩放与 320/390 px。
- `[not_provided]` 不展示伪指法或伪专业审阅。

正文已有正确内容默认保留；旧 N2D 的绝对音区/识别规则按本包纠正，在结果里记录差异。

## 4. 分类、导航与工具范围

分类页 `/chords/add` 服务端输出 24 张紧凑卡，root × subtype 可筛选并清除。筛选是客户端增强；没有 JS 仍可读取全部卡片与链接。

More Chords 只新增一个 Add Chords 入口。Hub 保留原 25 张主参考卡片，同时提供 Add 分类入口；不追加24张重型卡破坏密度。

Finder/By-key/Progressions 维持当前已验证数据范围，不因为有 Add 页面就声称支持。若已有文案/CTA 错称“识别所有新和弦”，就局部说明范围或移除错误承诺，不重写 Finder 算法。

内部链接使用 `05_navigation_links/internal-links.json` 并结合真实发布 registry；未发布的基和弦/扩展九和弦不能硬造 href。词名相似不等于同一写法，例如没有 `/chords/d-flat-minor` 时用已存在 minor 分类，不擅自新建该 URL。

## 5. SEO、SSR 与资产

`04_seo/route-seo.manifest.json` 由页面源生成；保持同一数据来源。

- 唯一 Title、Description、H1、自指 canonical，正确面包屑和可抓取内链。
- 核心音名、两个布局的表格、正文/FAQ/来源在初始 HTML，不只出现在脚本JSON/RSC传输字符串里。
- 读取实际响应并解析元素，排除 script/style/template 后验收主要内容；不是只搜索字符串。
- 不新增 meta keywords、不堆固定字数和密度；关键词量维持 null。
- 不创建 add2/alias/filter 页；不把它们全部 canonical 到分类页代替独立详情。

按 `06_assets/asset-inputs.json` 在现有流水线生成 24 组 PDF/SVG。本包没有预生成 PDF。

- 两个示例、真实拼写/八度、formula 和来源同步。
- 使用 one/two-page readable layout，不能伪造四位置以迁就旧生成器。
- 文件实际生成和渲染验证后才开放下载按钮；PDF 不是业务页面数。
- 单独记录字形、裁切、打印与PDF标签的验收级别。

## 6. 集中验证，不虚报范围

先运行本包：

```text
python docs/pianogrid-chords-n2d-v2/08_validation/validate_package.py
```

或按实际包目录调整路径。脚本验证内容和负例，不代替项目测试。

项目验证依照现有命令：类型/CSS、Add adapters/validator/practice/audio/print、N2C/原Triad有影响回归、路由/SSR/导航/SEO、production build，最终一次完整相关集成与浏览器回归；同一次成功测试不要为了不同标题重复运行。

新专项：
- 正向：24定义、48布局、25 URL、分类24卡、唯一metadata。
- 负向：错误三度/音名字母、漏音、多7、错误布局音区、越界键盘、异步旧音、错误asset/内链都能被拒绝。
- 组成音题接受相同集合不同八度；精确布局题正确提示八度区别。
- 同时播放四事件 onsets 为0；顺序播放用正确方向；Stop和切换真正清理。
- no-JS核心内容、键盘操作、200%缩放；320/390/768/1440具体采样范围据实写。
- 24资产完整，代表特殊拼写PDF渲染；不是看到生成日志就称实体打印通过。

若 flaky 失败：保留日志、核对单次复跑与时序条件，不能自动定义为假失败，更不能删除断言掩盖。

旧 N2B/N2C 输出仅因必要的明确 bug 修复才允许差异。保留原测试含义，不以固定测试计数为验收目标。

## 7. URL 结算和一次性交付

用集合计算：开始时的实际公开业务路由 ∪ 本包25条，不能混入PDF、SVG、robots或错误页，也不能丢并行新增页面。

若基线146且没有其他变化，结果应171，构建若仍多5项应176；这不是强制常量。N2D已局部存在时，净新增数小于25是正常，需要解释交集。

输出 `checks/chords-n2d-v2/RESULT.md`、`validation.json`、`route-diff.json`、截图和生成资产清单；摘要控制在500字以内。

摘要只需：Status、25目标页实际完成数、两种练习语义、旧包修正、业务/构建计数、测试与人工未测项、改动文件。用户无需再导出完整仓库。

完成后停止。不要开始 N2E/Extended 或 Altered；不要提交、push、部署。
