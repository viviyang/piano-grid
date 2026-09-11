# Scales / Arpeggios scoped extract from Piano_全站统一规划_最终版.md

> Exact contiguous sections copied from `docs/product/Piano_全站统一规划_最终版.md`; headings outside scope are omitted. The original file hash is recorded in `manifest.json`.

## 3. 已确认的内容到底覆盖到哪里

[已核实] 以下“已确认”来自本会话的逐次回复，不是重新推断用户意图：

| 模块 | 对应页面 | 已确认或本版定位 | 不能扩大解释为 |
| --- | --- | --- | --- |
| 首页与三层分工 | /、/tools及各中心的总体关系 | 首页引导；中心本身可用；具体页完成明确任务 | 不是所有导航文案或全部URL都逐项确认 |
| 和弦中心 | /chords | 默认总览、筛选、基本结果、试听、打印和详细页入口 | 不是所有和弦类型都已审核或必须首批开放 |
| 具体和弦样板 | /chords/a-minor | 固定对象、转位、播放、打印、针对性解释；不复制全量筛选 | 其他8个具体和弦实例只继承模板；内容分别核对 |
| 音阶中心 | /scales | 默认总览、根音类型、手别指法、方向速度、打印 | 考试体系、全部音阶类别及全部指法未核实 |
| 具体音阶样板 | /scales/c-major | 固定音阶；手别/方向/范围明确；播放打印一致 | 其他调性需要单独数据；类型页不能机械复用 |
| 琴键查询 | /keyboard-notes | 可读布局、点键查询、音名定位及必要说明 | 不包含虚拟钢琴录音、上传识谱或评分 |
| 琴键标注 | /keyboard-notes/labeled | 61/88优先；标注图、参考PDF、简短标注步骤 | 不是实尺寸贴纸；其他布局未默认支持 |
| 音符对照 | /keyboard-notes/chart | 谱表—音名—琴键联动、谱号/范围选择、打印 | 不做上传识谱；do re mi规则未定，首版不开放 |
| Songs及剩余栏目 | 全部完整URL见第5节 | 本版根据原任务一次补齐规划 | 之前仅提出Songs方案，不能把提问后未确认的方案写成已确认 |

#### T11｜音阶中心（对应 1 条候选 URL）


**确认范围：** 用户已确认核心功能；各类型全量覆盖未逐项确认。


**用户任务：** 查音阶类型、音符、键位、左右手指法，并听示范或打印。


**页面交付：** 1）默认大调总览并选中 C 大调；打开即有内容。 2）根音和类型选择只开放已核对数据；左右手分开。 3）指法明确绑定手别、上下行和八度范围；示范可调方向与速度。 4）打印当前或一组音阶；附必要说明并链接详细页、练习指南。


**不做／边界：** 不做自动评分、打卡、MIDI 或课程系统；未明确考试体系的 grade 1/2 不列为已支持。

**完成标准：** 展示、播放、指法和打印一致；每个开放选项都可用。


#### T12｜具体调性音阶页（对应 19 条候选 URL）


**确认范围：** C 大调样板已确认；其他调性沿用该分工。


**用户任务：** 直接查看指定调性的音阶、键位、手别指法和示范。


**页面交付：** 1）页面固定当前调性；首屏给结果而非全量选择器。 2）同页选左右手、上下行、速度、已审核八度范围；小调形式必须标明。 3）展示针对当前音阶的换指与构成说明；图、声音、打印一致。 4）返回中心或访问相关已上线音阶。


**不做／边界：** 不把等音拼写或不同小调形式不加说明地互换；不自动套同一指法。

**完成标准：** 每个调性本身完成内容审核；共享模板不意味着免审核。


#### T13｜音阶类型／调式参考（对应 5 条候选 URL）


**确认范围：** 本版统一规划建议；后做。


**用户任务：** 理解并查看某一种音阶类型或多个调式，不是固定单一调性的结果。


**页面交付：** 1）先说明该类型或调式范围，给实际可用的查询/示例。 2）类型页可在审核过的根音或子类型间切换；明确区别与相关链接。 3）指法和播放仅提供已核实部分；多调式页不能只展示一个固定调。


**不做／边界：** 不能机械照搬 /scales/c-major 固定对象模板；不借理论组合数扩出未收录页面。

**完成标准：** 类型关键词需要的范围与实际功能相符，区别和例子可核查。


#### T14｜琶音中心（对应 1 条候选 URL）


**确认范围：** 本版统一规划建议；后做。


**用户任务：** 理解琶音并查看原表已有 C/G 大调实例。


**页面交付：** 1）可用琶音总览；已有对象选择、图示、示范或播放。 2）经过审核的指法与少量练习提示。 3）三个原组全部在同页可找到，不另建空的根音细分页。


**不做／边界：** 不扩成练习打卡或走向生成器；素材未就绪时只保留规划。

**完成标准：** 不是只有定义；至少原映射对象有可执行参考。

### 音阶｜25 条 URL


| ID | 完整URL | 页面主词（原值） | US原量 | 这一页必须解决什么 | 模板 | 顺序 |
| --- | --- | --- | --- | --- | --- | --- |
| U088 | `/scales` | `piano scales` | 6,600 | 查钢琴音阶类型、构成和指法，取得参考图或打印资料 | T11 | 先做 |
| U089 | `/scales/modes` | `scale modes` | 1,600 | 查询调式与音阶关系 | T13 | 后做 |
| U090 | `/scales/c-major` | `c major scale piano` | 1,300 | 查C大调音阶及钢琴指法 | T12 | 先做 |
| U091 | `/scales/a-minor` | `a minor scale piano` | 1,000 | 查A小调音阶及钢琴指法 | T12 | 先做 |
| U092 | `/scales/blues` | `blues scale piano` | 1,000 | 查询钢琴布鲁斯音阶 | T13 | 后做 |
| U093 | `/scales/d-major` | `d major scale piano` | 1,000 | 查D大调音阶 | T12 | 后做 |
| U094 | `/scales/e-minor` | `e minor scale piano` | 1,000 | 查E小调音阶 | T12 | 后做 |
| U095 | `/scales/f-major` | `f major scale for piano` | 1,000 | 查F大调音阶 | T12 | 后做 |
| U096 | `/scales/g-major` | `g major scale piano` | 1,000 | 查G大调音阶 | T12 | 后做 |
| U097 | `/scales/pentatonic` | `pentatonic scale piano` | 1,000 | 查询钢琴五声音阶 | T13 | 后做 |
| U098 | `/scales/a-major` | `a major scale for piano` | 880 | 查A大调音阶及钢琴指法 | T12 | 后做 |
| U099 | `/scales/c-minor` | `c minor scale piano` | 880 | 查C小调音阶 | T12 | 后做 |
| U100 | `/scales/d-minor` | `d minor scale piano` | 880 | 查D小调音阶 | T12 | 后做 |
| U101 | `/scales/e-major` | `e major scale piano` | 880 | 查E大调音阶 | T12 | 后做 |
| U102 | `/scales/b-minor` | `b minor scale piano` | 720 | 查B小调音阶及钢琴指法 | T12 | 后做 |
| U103 | `/scales/f-minor` | `f minor scale piano` | 720 | 查F小调音阶 | T12 | 后做 |
| U104 | `/scales/harmonic-major` | `harmonic major scale` | 720 | 查询和声大调音阶 | T13 | 后做 |
| U105 | `/scales/a-sharp-minor` | `a# minor scale` | 590 | 升A小调音阶 | T12 | 后做 |
| U106 | `/scales/b-major` | `b major scale piano` | 590 | 查B大调音阶及钢琴指法 | T12 | 后做 |
| U107 | `/scales/b-flat-major` | `b flat major scale piano` | 480 | 查降B大调音阶 | T12 | 后做 |
| U108 | `/scales/g-minor` | `g minor scale piano` | 480 | 查G小调音阶 | T12 | 后做 |
| U109 | `/scales/chromatic` | `chromatic scale piano` | 390 | 查询钢琴半音阶 | T13 | 后做 |
| U110 | `/scales/e-flat-major` | `e flat major scale piano` | 390 | 查降E大调音阶 | T12 | 后做 |
| U111 | `/scales/f-sharp-minor` | `f#m piano scale` | 390 | 查升F小调音阶 | T12 | 后做 |
| U112 | `/scales/c-flat-major` | `cb major scale piano` | 320 | 查降C大调音阶 | T12 | 后做 |



### 琶音｜1 条 URL


| ID | 完整URL | 页面主词（原值） | US原量 | 这一页必须解决什么 | 模板 | 顺序 |
| --- | --- | --- | --- | --- | --- | --- |
| U113 | `/arpeggios` | `arpeggios piano` | 未验证 | 了解并查询钢琴琶音，查看已有C/G大调实例 | T14 | 后做 |

### 音阶｜36 个原任务


| 原组ID | 原需求代表词 | 完整去向 | 如何承接 | 交付边界 |
| --- | --- | --- | --- | --- |
| P179 | `piano scales` | `/scales` | 音阶查询与总表 | 已确认基础范围 |
| P180 | `two hand beginner piano scales pdf` | `/scales#two-hand-printable` | 打印输出 | 后续同页补齐 |
| P181 | `piano scales chart` | `/scales#chart` | 总览图表 | 已确认基础范围 |
| P182 | `scale modes` | `/scales/modes` | 独立页首要任务 | 按页面准备顺序验收 |
| P183 | `c major scale piano` | `/scales/c-major` | 独立页首要任务 | 模板已确认；此实例内容待审核 |
| P184 | `a minor scale piano` | `/scales/a-minor` | 独立页首要任务 | 模板已确认；此实例内容待审核 |
| P185 | `blues scale piano` | `/scales/blues` | 独立页首要任务 | 按页面准备顺序验收 |
| P186 | `d major scale piano` | `/scales/d-major` | 独立页首要任务 | 模板已确认；此实例内容待审核 |
| P187 | `e minor scale piano` | `/scales/e-minor` | 独立页首要任务 | 模板已确认；此实例内容待审核 |
| P188 | `f major scale for piano` | `/scales/f-major` | 独立页首要任务 | 模板已确认；此实例内容待审核 |
| P189 | `g major scale piano` | `/scales/g-major` | 独立页首要任务 | 模板已确认；此实例内容待审核 |
| P190 | `major scale for piano` | `/scales#major` | 类型模式 | 已确认基础范围 |
| P191 | `pentatonic scale piano` | `/scales/pentatonic` | 独立页首要任务 | 按页面准备顺序验收 |
| P192 | `a major scale for piano` | `/scales/a-major` | 独立页首要任务 | 模板已确认；此实例内容待审核 |
| P193 | `c minor scale piano` | `/scales/c-minor` | 独立页首要任务 | 模板已确认；此实例内容待审核 |
| P194 | `d minor scale piano` | `/scales/d-minor` | 独立页首要任务 | 模板已确认；此实例内容待审核 |
| P195 | `e major scale piano` | `/scales/e-major` | 独立页首要任务 | 模板已确认；此实例内容待审核 |
| P196 | `piano minor scales` | `/scales#minor` | 类型模式 | 后续同页补齐 |
| P197 | `b minor scale piano` | `/scales/b-minor` | 独立页首要任务 | 模板已确认；此实例内容待审核 |
| P198 | `f minor scale piano` | `/scales/f-minor` | 独立页首要任务 | 模板已确认；此实例内容待审核 |
| P199 | `harmonic major scale` | `/scales/harmonic-major` | 独立页首要任务 | 按页面准备顺序验收 |
| P200 | `a# minor scale` | `/scales/a-sharp-minor` | 独立页首要任务 | 模板已确认；此实例内容待审核 |
| P201 | `b major scale piano` | `/scales/b-major` | 独立页首要任务 | 模板已确认；此实例内容待审核 |
| P202 | `b flat major scale piano` | `/scales/b-flat-major` | 独立页首要任务 | 模板已确认；此实例内容待审核 |
| P203 | `g minor scale piano` | `/scales/g-minor` | 独立页首要任务 | 模板已确认；此实例内容待审核 |
| P204 | `jazz scales piano` | `/scales#jazz` | 类型参考分区 | 后续同页补齐 |
| P205 | `chromatic scale piano` | `/scales/chromatic` | 独立页首要任务 | 按页面准备顺序验收 |
| P206 | `e flat major scale piano` | `/scales/e-flat-major` | 独立页首要任务 | 模板已确认；此实例内容待审核 |
| P207 | `f#m piano scale` | `/scales/f-sharp-minor` | 独立页首要任务 | 模板已确认；此实例内容待审核 |
| P208 | `piano scale fingerings` | `/scales#fingering` | 指法视图 | 已确认基础范围 |
| P209 | `cb major scale piano` | `/scales/c-flat-major` | 独立页首要任务 | 模板已确认；此实例内容待审核 |
| P210 | `piano scales pdf` | `/scales#print` | 打印输出 | 已确认基础范围＋范围词待补 |
| P211 | `grade 1 piano scales` | 暂不分配 | 保留任务，暂不分配URL | 阻塞／待明确 |
| P212 | `grade 2 piano scales` | 暂不分配 | 保留任务，暂不分配URL | 阻塞／待明确 |
| P213 | `piano scales formula` | `/scales#formulas` | 构成说明 | 后续同页补齐 |
| P214 | `piano scales online` | `/scales#explore` | 在线操作 | 已确认基础范围 |



### 琶音｜3 个原任务


| 原组ID | 原需求代表词 | 完整去向 | 如何承接 | 交付边界 |
| --- | --- | --- | --- | --- |
| P215 | `arpeggios piano` | `/arpeggios` | 独立页首要任务 | 按页面准备顺序验收 |
| P216 | `c major scale arpeggio` | `/arpeggios#c-major` | 同页明确章节／选项 | 后续同页补齐 |
| P217 | `g major arpeggio` | `/arpeggios#g-major` | 同页明确章节／选项 | 后续同页补齐 |

## 7. 暂缓与已知范围缺口

### 7.1 17 个原任务、32 个保留词暂不分配 URL

[已核实] 原需求没有删除。原因仍按原表保留：

| 原组 | 代表词 | 覆盖词数 | 为什么暂不分配 | 下一项必要材料 |
| --- | --- | --- | --- | --- |
| P067 | `piano tab` | 3 | Tab/数字/字母的实际记谱体系与交付对象未明确；不能直接等同钢琴五线谱、电脑键盘谱或手指编号 | 确认原查询对应的记谱形式后，再决定并入letter-notes/annotated或独立任务 |
| P103 | `piano sheet numbers letters` | 2 | Tab/数字/字母的实际记谱体系与交付对象未明确；不能直接等同钢琴五线谱、电脑键盘谱或手指编号 | 确认原查询对应的记谱形式后，再决定并入letter-notes/annotated或独立任务 |
| P069 | `hallelujah song piano chords` | 1 | 现有资料不足以唯一确认具体作品、主题或版本；同名词不应被直接固化成一张曲谱页 | 核对作品/作者/编曲和可获取版本；保留所有原词，不扩写歌手或标题 |
| P080 | `for good piano sheet music` | 1 | 现有资料不足以唯一确认具体作品、主题或版本；同名词不应被直接固化成一张曲谱页 | 核对作品/作者/编曲和可获取版本；保留所有原词，不扩写歌手或标题 |
| P082 | `milonga with lover song piano sheet music` | 1 | 现有资料不足以唯一确认具体作品、主题或版本；同名词不应被直接固化成一张曲谱页 | 核对作品/作者/编曲和可获取版本；保留所有原词，不扩写歌手或标题 |
| P085 | `up theme song piano sheet music` | 1 | 现有资料不足以唯一确认具体作品、主题或版本；同名词不应被直接固化成一张曲谱页 | 核对作品/作者/编曲和可获取版本；保留所有原词，不扩写歌手或标题 |
| P086 | `charlie brown theme song piano sheet music` | 1 | 现有资料不足以唯一确认具体作品、主题或版本；同名词不应被直接固化成一张曲谱页 | 核对作品/作者/编曲和可获取版本；保留所有原词，不扩写歌手或标题 |
| P089 | `golden piano sheet music easy` | 2 | 现有资料不足以唯一确认具体作品、主题或版本；同名词不应被直接固化成一张曲谱页 | 核对作品/作者/编曲和可获取版本；保留所有原词，不扩写歌手或标题 |
| P090 | `hallelujah song piano sheet music` | 1 | 现有资料不足以唯一确认具体作品、主题或版本；同名词不应被直接固化成一张曲谱页 | 核对作品/作者/编曲和可获取版本；保留所有原词，不扩写歌手或标题 |
| P135 | `number keys piano` | 12 | number keys piano尚不能唯一确定是键号、音级还是手指编号 | 确认数字所指对象；在正确标注/指法页承接，不先制造独立数字页面 |
| P211 | `grade 1 piano scales` | 1 | grade 1/2未提供考试体系、版本和适用年份，无法确定准确音阶清单 | 确认体系与版本后再定义页面；暂不擅自生成ABRSM或Trinity URL |
| P212 | `grade 2 piano scales` | 1 | grade 1/2未提供考试体系、版本和适用年份，无法确定准确音阶清单 | 确认体系与版本后再定义页面；暂不擅自生成ABRSM或Trinity URL |
| P243 | `piano substitute chords on bb key` | 1 | 降B调替代和弦的问题范围和专业材料尚未明确 | 先确认查询任务与可用案例；可补入走向页，不预先承诺独立教程 |
| P246 | `how to play golden hour on piano` | 1 | Golden Hour的作品版本与可用教学素材未核实 | 核对作品与可使用示例，再决定歌曲资源页或教程 |
| P250 | `how to use scales in any song` | 1 | 仅有视频标题提取，尚无独立Google查询与量化支持 | 保留需求线索；核实搜索表达和任务后再决定独立页或音阶练习章节 |
| P263 | `play along piano` | 1 | play along piano未明确是伴奏、跟弹视频、谱面同步还是软件功能 | 确认用户想获得的输出，不默认设计新App或页面 |
| P265 | `what are some difficult music notes to learn` | 1 | 哪些音符难学的问题未限定谱号、音区或读谱障碍 | 先留在问题库；明确后合入read-sheet-music或其他准确页面 |


### 7.2 有 URL 但当前暂停的 19 页

[已核实] 第5节标“暂不做”的19页均是具体曲目资源页。它们保留需求和路径，但当前材料没有完成该项目所需的作品/版本与供应确认。**这里是交付状态，不是宣称某首作品必然侵权或永远不可做。** 有明确来源、合适版本和实际可提供方式后，再解除暂停。

### 7.3 更早手查过、但没有进入当前265任务基表的两条线索

[已核实] 旧规划说明已经披露这两条未并回。本版继续显式保留，不悄悄删掉，也不擅自用旧库数字增加当前统计：

| 历史关键词 | 本版处理 | 不能怎么处理 |
| --- | --- | --- |
| `am7 piano chord` | 历史手查证据待回挂；不计入当前127URL | 不把Am7当A minor三和弦同义词，不随手补单词Volume |
| `bohemian rhapsody piano sheet music` | 历史手查证据待回挂；不计入当前127URL | 不因出现搜索结果就假定本站已有可用谱面 |


**完整性结论的范围是当前265任务、1,437保留词，不是“所有历史对话与17,900原始词已全部重新并入”。** 未来补入这两条时应做显式数据版本更新，而不是让当前清单在无记录情况下多出页面。

### 7.4 不用数字制造确定性

[已核实] 本版保留14条需求页主词的搜索量空值，另有2条结构页无SEO主词量。两个练习长问句在此前Planner导出中无可用数值，其旧Semrush值继续留作原始记录，不据此声称已获Google搜索量确认。

[推断] 不计算总Volume＝网站流量；不把265个任务或127条路径说成全部可排名；同页不同任务是否优于拆页也没有逐一新增SERP结论。

## 8. 准备与发布顺序

### 8.1 原先做17条全部保留，不再只讲两个样板

[已核实] 下表是原准备优先级，不是全部已经具备内容：

| URL | 模板 | 准备重点 |
| --- | --- | --- |
| `/` | T01 | 用户能够理解网站用途，并从首页直接进入已发布的明确任务。 |
| `/tools` | T02 | 入口能打开可用工具；打印资源导航与实际输出一一对应。 |
| `/songs` | T15 | 每个宣称覆盖的筛选/分区有相应曲目和选择依据；没有内容的筛选不出现。 |
| `/songs/easy` | T16 | 选曲内容与专题条件相符；各同页子任务均有足够对应材料。 |
| `/tools/blank-sheet-music` | T19 | 实际输出是空白钢琴谱纸，可读、可打印，而非仅有下载按钮。 |
| `/keyboard-notes` | T03 | 点击和反向定位一致；显示范围清楚；简单问题可在当前页得到答案。 |
| `/keyboard-notes/labeled` | T04 | 屏幕、打印内容和所选布局一致；参考图与贴纸用途分清。 |
| `/keyboard-notes/chart` | T05 | 谱号、音区与键位对应审核通过；印刷图也能读懂对应关系。 |
| `/chords` | T06 | 无需跳详细页也能完成基础查询；未准备的 jazz/power 等不宣称已覆盖。 |
| `/chords/a-major` | T07 | 具体对象和音符拼写正确；所有已开放转位、音图和打印一致。 |
| `/chords/a-minor` | T07 | 具体对象和音符拼写正确；所有已开放转位、音图和打印一致。 |
| `/chords/c-major` | T07 | 具体对象和音符拼写正确；所有已开放转位、音图和打印一致。 |
| `/scales` | T11 | 展示、播放、指法和打印一致；每个开放选项都可用。 |
| `/scales/c-major` | T12 | 每个调性本身完成内容审核；共享模板不意味着免审核。 |
| `/scales/a-minor` | T12 | 每个调性本身完成内容审核；共享模板不意味着免审核。 |
| `/guide` | T21 | 用户能找到下一项可执行任务，入口都已发布。 |
| `/guide/read-sheet-music` | T22 | 读者可按步骤执行；示例与指法/记谱等专业内容审核通过。 |


### 8.2 统一执行顺序

[推断] 后续执行不需要再次对127页逐一问“是否确认”，按以下依赖推进：

**第一步，准备输入。** 把要先交付的页面任务、音符/指法数据、实际曲目/资源与来源准备好。没有材料的任务保留范围，不用空壳页面顶替。

**第二步，验证模板。** 用原先做清单中的具体和弦、具体音阶、琴键查询/标注/对照、选曲、空白谱纸和识谱教程各自形成可验收样板。样板不是栏目全部范围。

**第三步，生成入口。** 相关功能或资源可用后，再由首页、工具中心、选曲中心和指南中心组织入口。用户可直接进入具体页面，不强制多层跳转。

**第四步，按原任务补齐。** 同页章节与模式也在任务清单里逐项记录完成状态；它们不是“因为没单独URL，所以不用制作”。后做91页依准备条件分批推进，暂停19页不发布。

### 8.3 每条URL共用的发布检查

[推断] 以下为本项目的交付检查，不是外部排名保证：

| 检查 | 通过条件 |
|---|---|
| 任务兑现 | 标题承诺的查询、示例、谱面或打印确实可得到 |
| 输入和结果 | 每个开放选项都有准确结果；未准备选项不展示成可用 |
| 来源与版本 | 能指出素材/音乐数据依据；未完成核对不编写确定结论 |
| 同页子任务 | 逐组核对实际分区、内容和输出；未实现仍显示待补 |
| 移动与打印 | 图可读；主动播放可操作；打印与当前选择一致 |
| 路由与内部链接 | 只显示已发布入口；无重复空路由或无必要的中转页 |
| 内容差异 | 不同URL有自己的任务与材料，不是换关键词复制内容 |
| 搜索证据状态 | “未单独SERP”“搜索量未验证”等限制保留，不能改成已验证 |
| 发布权限 | 规划文件不是自动上线指令；未验收页面不进入部署清单 |
