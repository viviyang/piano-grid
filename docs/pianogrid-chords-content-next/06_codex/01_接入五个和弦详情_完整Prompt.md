# PianoGrid：B3 后续和弦内容＋URL＋SEO＋内链接入

请在当前 PianoGrid 仓库中实际执行。用户已经完成B3；本轮不是B1/B2重做，也不是重新研究全部关键词。

## 输入与默认范围

内容包目录由用户放入 `docs/pianogrid-chords-content-next/`（目录名不同就定位实际位置，不要重复索要已存在文件）。先读该目录的 `00_START_HERE.md`。

默认本次只接入5个原规划详情：

- `/chords/g-major`
- `/chords/c-minor`
- `/chords/e-major`
- `/chords/b-major`
- `/chords/a-flat-major`

保持 `/chords`、Am、A major、C major 的B3主题、排版、正文、已有音域、指法范围、播放/练习/打印和metadata。

C-flat已有内容但原位双手来源缺项。保留材料，不注册页面、不新增下载入口、不放入sitemap。不为满足类型伪造指法。其余5个系统页作为下一批材料，不在这轮做识别引擎/进行播放器。

## 先做一个简短差异核对，然后直接实施

读取：
- `08_baseline/AUTHORING_CONTRACT.md`、`EXPANSION_LIMITS.md`
- `02_content/details.merge.json` 与单页raw记录
- `03_learning/chord-learning.next.ts`、`learning.all.json`、`adapter-bindings.json`
- `01_planning/url-seo-keywords.master.json`、`internal-links.json`
- 当前仓库route/adapter/validator/learning/template/registry/资产路径。

核对实际仓库是否仍匹配B3输入；若仅相关文件有新改动，保留并行工作后最小合并。不要因为一个文件hash变了就要求重新导出整包；只有会丢数据/冲突不可判时停下。无需再单独提交一份审阅报告等待批准。

## 数据接入

1. `details.merge.json`只含指定page键。合并到现有master `pages`，禁止用这个子集替换整个master文件。
2. 这是JSON＋纯数据TS的现有契约。不要把 `resolved/*.model.json` 回写当authoring输入，不建立万能CMS。
3. TS中的5个学习对象使用实际B3的 `FingeringExample`、`ChordSource`、`ChordPractice`、`Block`。它们是数据，不是要覆盖整个 `chord-learning-content.ts`。合并来源ID，保留旧来源与所有旧学习对象。
4. `.learning.json`是可读输入；其中 `binding` 是本轮明确的适配需求，不是当前raw JSON天然就支持的字段。适配层读取后统一导出 `ChordDetailModel`。
5. 为5个新路由扩展精确路由union与必要map。不要把任意字符串都当可发布对象；不要添加原计划外URL。
6. 音名、MIDI、低音、键盘、播放和打印继续使用同一voicing。原包的八度/3个参考位置保持；不偷偷改为全都从C4开始。

## 已发现的具体适配点（不用再泛泛审查）

- `getChordDetail`当前只允许A/C（Am另分支）；扩展为新5页的受控入口。
- 新C minor必须接受minor质量、公式1–b3–5及相应半音；不要继承A/C的major硬编码。
- 原 `detailCopy` 会覆盖metadata。新5页从新raw数据和binding读取Title/Description/H1；旧4页effective metadata保持不变。不重复追加站点品牌后缀。
- 本批5页的键盘范围保持绑定的C4–C6。C-flat将来必须能容纳MIDI59，不得误改成B4，但本次不扩其发布状态。
- 现有renderer只对 `${namespace}-questions` 显示FAQ table。提供的extraBlocks已按此命名；添加FAQ必须实际渲染。
- extraBlocks普通段落/步骤可用当前Block renderer；在既有主体解释后、打印/相关资源附近按语义插入，不复制重复intro，不改B3视觉。原工具、转位、指法、practice、打印均保留。
- 不新增第二套`#practice`。当前练习目标从当前和弦派生。新增self-check是纯文字，不伪装为已经有评分的新模式。
- 新来源支持root手指配对，不支持精确八度或所有转位。保留 `source_verified_with_octave_adaptation` 和可见限制；指法按voicing绑定，转位时隐藏。

## 页面和音乐内容

- 英文正文和FAQ见raw与extraBlocks，不把三个旧详情的文章换名来凑页。
- 可合并真正重复的句子，但不得删掉正确原内容来适应模板。遇到明确事实错误，局部改正并在结果列明。
- 不生成新的手指规则、悲伤/快乐保证、虚构歌曲例子、未测音频功能或教师审阅署名。
- 五线谱继续不在本轮；不添加空白staff面板。

## PDF 与SVG

- `05_assets/chord-*.pdf`/`.svg`含6个对象；只复制本轮5个已接入对象的资源到真实公开资产目录，使`/reference/assets/chord-<slug>.pdf`可用。按现有工程路径复制，不猜静态部署根目录。
- 这些是固定3位置参考PDF；“打印当前转位”仍走B3实时快照。不要把两者混为一份文件。
- 字符C#与C♯允许展示形式不同，但拼写和音高一致；ASCII b不可误解析成自然音。
- 本包未提供新的录音，不改当前音源许可说明。

## URL、关键词、TDH、内链一起完成

- 5个URL早已在原规划，沿用其slug；无需redirect，不新增根音页、类别页、LH/RH页、转位页或筛选URL。
- 原关键词、变体、历史搜索量只是编辑输入，不重新做清洗、不生成meta keywords、不追求密度。
- Title/Description/H1必须在最终raw HTML生效；正文和静态初始图先预渲染。切换与播放可客户端增强，不用useEffect加载主要正文。
- 根音×类型仍作用于原19个Hub对象：只加已有对象的详情入口，不能把新增5个详情误算成24个和弦。
- `keyChordItem`当前对部分对象返回`url:null`。按精确和弦slug和当前有效route registry解析link，让G/E/B等新详情可从Hub进入，原顺序不变。
- 从`internal-links.json`按当前批次选择必要边；不得把全图每条边都塞进每页。优先Hub→新详情、新详情→Hub、大小/等音/共同音相关对照。
- 目标未完成时不显示可点击CTA；周围原理说明保留。C-flat与系统页链接当前仍不可用。
- 对`#practice`先拆pathname/hash，验证路由+anchor；不能让exact `isPublicRoute()`误屏蔽有效hash。最终输出真实`<a href>`。
- registry与sitemap只包含真正生成的页面。不要因为内容包有规划数据自动全量发布。

## 验证：一次收尾，不重复前几轮全审查

先运行内容包的 `07_validation/validate-content.py`（与仓库测试不同），再用仓库实际已有命令执行类型/数据/相关路由回归和production build。未提供的lint脚本不要假造。

重点对5新＋4旧页面检查：
1. 每个对象音名、quality、公式、3个voicing、最低音、练习target一致。
2. 当前模式图/音/指法/打印一致；新页不显示旧Am名字或Minor triad硬编码。
3. raw HTTP HTML正文节点存在Title/Description/H1、答案、初始图、3种位置、FAQ、来源和可抓取内链；只在脚本JSON中找到字符串不算。
4. 5份PDF真实可打开，当前打印与固定PDF区分；19个Hub对象和既有9和弦固定PDF承诺不变。
5. 新增链接不是孤页，未发布目标没有假入口；无重复ID。
6. 桌面/手机沿用B3主题，文字不被挤掉，200%缩放不发生整页异常横向溢出。只改本批引起的问题，不重做视觉。
7. 人耳、真机、实体打印、读屏和PDF标签分别保留未测状态；不能用程序数值断言代替人工结果。

## 停止条件与结果

除真实阻断外，适配→数据→路由→SEO/内链→集中验证连续完成，不每一步问我是否继续。

最后只输出简短结果，并写详细证据到项目docs：
- 实际接入的5页、保留不变的4页；
- 代码最小改动、metadata来源、增加的真实内链；
- 测试命令/结果/证据位置；
- C-flat及5个系统页仍未发布的原因；
- 未测试的人体验收项。

不得开始其他模块；不得提交、push或部署；不升级依赖，不回退并行Scales或导航改动。
