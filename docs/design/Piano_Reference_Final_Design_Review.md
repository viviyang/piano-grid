# Part 1 — 四版逐一评审

**[推断] 最终建议：以 Version A 为唯一基础，吸收 C 的控制精度。全站排序 A > C > D > B。** 不继承 A 当前“介绍优先”的布局；它也需要结构修正。

[已核实] 评审对象是 piano-four-directions/version-a.html 至 version-d.html 四个比较版，不混入早期 A/B 旧稿或生成式对照海报；C 按实际深色 HTML 评分。四版保留相同九个内容模块和交互脚本。此轮将本地 HTML 注入 Chromium 检查布局、默认与第二转位、逐音播放状态、停止、方向键和 FAQ；不是线上路由、真机、人工听音或实体打印测试。

## 共同问题，先于风格差异

[已核实] 默认字号下的本轮几何测量，数值四舍五入为 CSS px：

| 版本 | 1440×900：键盘顶部 / Play 顶部 | 390×844：键盘顶部 / Play 顶部 |
|---|---:|---:|
| A | 662 / 973 | 820 / 1053 |
| B | 671 / 982 | 819 / 1053 |
| C | 648 / 958 | 819 / 1052 |
| D | 673 / 984 | 828 / 1062 |

[推断] 四版都让键盘与主动作出现得太晚。手机首屏只有键盘上沿，桌面 900px 高视口也未出现 Play。不是没有答案——导言已经写了组成音——而是答案先藏在句子中，正式结果和工具落在更后面。

[已核实] 四版手机键盘标注实际约 10px：SVG 的 15px 文字随 900→600 的视图比例缩小。转位标签 A/C/D 为 11px、B 为 10.5px，但按钮高度为 46px。因此主要问题是文字可读性，不是没有触控面积。三行转位表统一最小宽度 510px，390px 手机的容器只有 350px。

[推断] 把这四个共同问题修好，比再微调一种品牌配色更有价值：提前结果、提前键盘、提高实际标签字号、重排小表。先前“检查通过”不等于任务体验已经成熟。

## 八项评分

[推断] 这是基于当前可见实现的启发式评分，不是用户实验，也不代表内容经过钢琴教师签核。6=能完成但有明显摩擦；8=成熟基础仍需修正；10=本轮没有足够证据给出。

| 维度 | A | B | C | D |
|---|---:|---:|---:|---:|
| 信息层级清晰度 | 8 | 7 | 8 | 7 |
| 工具页面可用性 | 7 | 7 | 8 | 7 |
| 扫读效率 | 8 | 8 | 8 | 7 |
| 视觉完成度 | 8 | 8 | 8 | 8 |
| 专业感 / 信任感（视觉） | 8 | 7 | 8 | 8 |
| 钢琴学习参考站适配 | 9 | 6 | 7 | 8 |
| Mobile 适配 | 6 | 5 | 6 | 6 |
| 全站设计系统扩展 | 9 | 6 | 8 | 8 |

### A — Apple-inspired

**优点。** [已核实] 白底、浅灰工具面板、蓝色主操作和无衬线正文分工清楚。[推断] 阅读、看图和操作容易保持同一视觉语言；不需要为了不同页型频繁换环境。

**缺点。** [已核实] Am 字号大于组成音，Formula 与 Notes 接近同级；手机主工具前仍有完整导言。[推断] 装订式的整齐优先于“先找琴键”，留白缺少任务权重。

**干扰项。** [推断] 过大的和弦缩写、并列等权参数、过轻的 selected 处理和过多胶囊轮廓，让页面更像展示组件而不是给答案。

**必须保留。** [推断] 浅色基底、单一蓝色强调、无衬线主体、独立白底打印、用分隔线组织说明。

**删除或弱化。** [推断] 首屏完整导言、大号 Am 对答案的压制、工具与每段正文相同的松散密度；按钮改成一致的适度圆角，不全部胶囊化。

### B — Spotify-inspired

**优点。** [已核实] 主播放为绿色，选中转位为浅色；没有给所有控件同时铺绿。[推断] 动作和选择状态有区别，键盘是视觉中心，音乐产品辨识较强。

**缺点。** [已核实] B 手机转位文字仅 10.5px；导言与表格的共同问题没有因深色而改善。[推断] 强调色易被 Play 吸引，而这页第一个任务是看懂和弦，不是开始播放。

**干扰项。** [推断] 粗字标题、白色键盘和绿色动作同时争夺注意力；把这种权重原样用于资料列表或长指南，未必合适。

**必须保留。** [推断] “播放有明确主动作，Stop 有明确待机状态”和声音事件对应可见音符的原则；不需要保留绿色。

**删除或弱化。** [推断] 全站默认深色、绿色作为第二品牌色、过粗的连续标题和流媒体联想。不添加封面、歌单、侧栏播放器。

[已核实] B 正文与页面背景的理论对比度约 12.76:1。[推断] 不应笼统说它“深色所以不可读”；这里舍弃的是对整站任务的适配，不是判定所有深色设计不好。

### C — Linear-inspired

**优点。** [已核实] 控件为小圆角、选中态有明确的薰衣草色边界、当前音序与公式有等宽处理。[推断] 参数与结果关系精确、状态辨识最好，是最值得吸收的交互细节来源。

**缺点。** [已核实] 它与其他版共享页面顺序、600px 键盘最小宽度与手机小字；桌面 Play 仍在约 958px。[推断] “像工具”尚未变成明显更快的任务路径；代码式公式不应比真实音名更抢眼。

**干扰项。** [推断] 高密度小标签、细线和等宽文字共同强化技术文档气质，对初学者未必友好。

**必须保留。** [推断] 对齐、控件分组、selected 与 focus 分离、适度紧凑的工作区、数值稳定排布。

**删除或弱化。** [推断] 深色与紫色皮肤、把全部音名做成代码字体、10–11px 手机信息、为“精致”而过弱的必要边界。

### D — Claude-inspired

**优点。** [已核实] 奶油白底、衬线标题与无衬线操作文字形成区分，正文为 17px / 1.65。[推断] 四版中编辑式品牌个性最强，学习参考的温度较足。

**缺点。** [已核实] 其工具区小号陶土色链接 #A9583E 与 #F5F0E8 背景的计算对比度约 4.46:1，低于普通文字 4.5:1 的要求。[推断] 这是易修问题，但不能凭“舒服”认定已满足无障碍。

**干扰项。** [推断] 大号衬线 Am 和标题弱化了结果的工具属性；若再扩展多类列表和筛选，容易出现编辑字体与紧凑数据组件之间的不一致。

**必须保留。** [推断] 有边界的行长、舒适行高、解释跟随具体问题、不逐段套卡片。

**删除或弱化。** [推断] 将衬线带入工具数字与音名、把陶土色变成第二操作色、纸张质感装饰。保留阅读节奏不等于必须保留这套字体与颜色。

# Part 2 — 四版横向对比表

[推断] 以下排序指当前设计对任务的支持；功能引擎基本相同，不把审美排序当任务完成时间。

| 维度 | 排序 | 核心依据 |
|---|---|---|
| Tool usability | C > A > D > B | C 控件边界与参数呈现最明确，但仍需结构修复 |
| Information hierarchy | A > C > B > D | A 容易建立音名、当前结果、解释的层级 |
| Readability | A > D > C > B | A 的中性阅读与图表体系最统一 |
| Scannability | C > A > B > D | C 对齐最精确；不能照搬小字 |
| Music feeling | B > D > A > C | B 视觉能量最高，键盘最突出 |
| Brand feeling | D > B > C > A | D 的编辑式辨识强，A 最中性 |
| Trust / credibility | A > D > C > B | 仅评估视觉可信感，不等于事实正确性 |
| Interaction polish | C > A > D > B | 比较状态表达，不是底层交互功能数量 |
| Mobile usability | A > C > D > B | 差异小，四版都要修首屏与文字 |
| Extensibility | A > C > D > B | A 对工具、列表、谱面和阅读约束最少 |
| SEO reference page 适配 | A > C > D > B | 比较查询到答案的呈现，不承诺搜索排名 |
| Whole-site suitability | A > C > D > B | 覆盖多任务，不由单张和弦页气氛决定 |

[推断] 明确选择：工具细节 C；内容阅读 A；音乐感 B；品牌辨识 D；Design System 扩展 A；全站基础 A。相关分数相同时按该任务的具体取舍排序，不宣称统计差异。

# Part 3 — 最终推荐

**[推断] ONE BASE DIRECTION：Version A。定义为“浅色、答案优先的钢琴参考工具系统”，不是 Apple 营销页。**

[推断] A 胜出并非品牌更高级，而是当前已有的浅色、单强调色、无衬线基础，能同时服务操作、文字、列表和谱图；需要修改的是信息优先级，而不是再造三套皮肤。C 的状态值得借，但其深色、等宽和微型标签不适合作为本站所有内容的默认要求；B 的音乐能量不能成为资料页的主要任务；D 的编辑式辨识不错，但不值得为此引入全站第二套标题/工具字体逻辑。

| 来源 | 吸收 | 不吸收 |
|---|---|---|
| A 基础 | 浅色、蓝色、无衬线、轻表面 | 大留白与胶囊按钮的机械套用 |
| C | 控件边界、对齐、selected/focus 分工 | 深色、紫色、小字、代码感 |
| B | 一个明确 Play 主动作、实时音符反馈 | 绿色皮肤、播放器框架、播放优先于答案 |
| D | 行长、行高、解释节奏 | 衬线工具字、陶土色操作、纸感装饰 |

[推断] 最终只保留一套色板、一套文字体系、一套状态语义。不是“每版分配四分之一”。全站识别性来自清楚一致的键盘标记与结果布局，而非装饰。

# Part 4 — Piano Reference 最终 Design System

以下均为建议采用的设计规范，不是已在四版实现的事实。

## 1. Design personality

**Precise**：音名、键位、播放、打印一致。**Direct**：先答案和键盘，后解释。**Calm**：低噪声表面，只突出当前任务。**Legible**：标签与正文都真实可读。**Dependable**：失败状态诚实，正确资料仍可读。

## 2. Color system

| 角色 | 规范 |
|---|---|
| Canvas | #FFFFFF，高频基础 |
| Surface | #F5F5F7，只用于工作区/必要分组 |
| 主文本 / 次文本 | #1D1D1F / #51545A |
| 分隔线 / 控件轮廓 | #DADDE3 / #7A818C，不能互相替代 |
| Primary accent | #0066CC，操作、链接、音符标记 |
| Secondary accent | 不增加；需要区分时使用中性层级或形状 |
| Hover / Pressed | #0056AD / #00468F |
| Selected | #E8F1FC 浅底＋蓝边＋深蓝字＋标记 |
| Disabled | #ECEEF1 背景＋#626975 字，配真实 disabled 状态 |
| Selected note | #DCEBFA 浅底＋蓝色标记/轮廓 |
| Success | #1B6B3A，必要时配 #EEF7F0 浅底 |
| Warning | #8A4B00，必要时配 #FFF5E6 浅底 |
| Error | #B42318，必要时配 #FFF0ED 浅底 |

[已核实] 对建议色值单独计算：白字/主蓝约 5.57:1，次文本/Surface 约 6.97:1，蓝字/Selected 约 4.88:1。这只验证列出的色对，不等于整页通过无障碍。

## 3. Typography

| 层级 | Desktop | Mobile | 字重 |
|---|---|---|---|
| H1 | 40/48px | 32/38px | 600 |
| H2 | 26/34px | 24/32px | 600 |
| H3 | 18/26px | 18/26px | 600 |
| Body | 17/28px | 16/26px | 400 |
| Label/Button | 14/20px | 14/20px | 500–600 |
| Caption | 13/19px | 13/19px | 400 |
| 核心组成音 | 28–32px | 28px | 600 |
| 当前音序 | 20px | 18px | 600 |
| Formula | 16px | 14px | 500 |

系统无衬线，不引入品牌字体或全站衬线。正文约 60–70ch；工具最大宽度 1120px。音乐降号/升号与数字基线清楚；不得把公式误排成指法编号。数字可用 tabular-nums，音名不自动变代码字体。键盤标注目标实际 14px，最低 12px。

## 4. Spacing / Density

工具采用适中紧凑：面板 padding 24px/16px，控件 gap 8–12px，摘要到选择 16px。阅读区从容：section 40–48px/28–32px，段落 12–16px。外边距桌面至少 32px、手机 16px。不用全屏 Hero 或所有章节统一 80px 空白。

## 5. Card / Panel

一个主工具面板，12px 圆角、1px 轻边、无阴影；只给操作与结果一个共同区域。解释、练习、FAQ、相关链接直接在页面背景排版。独立曲目/资源可用同一面板 token 组织真实对象，不把“禁止 card soup”误解成所有卡片都不能用。

## 6. Buttons

Primary：蓝底白字，仅 Play chord 为当前主动作。Secondary：中性浅底/边框，用于逐音。Tertiary：文字或轻轮廓，用于打印与次要动作；下载维持真实链接语义。Icon button 仅用于搜索、菜单等确有动作的位置，必须有 accessible name。

所有按钮 8px 圆角，桌面高至少44px、手机48px；Hover 不变尺寸；Pressed 只改变色深；Disabled 使用禁用语义；Focus 为2px蓝轮廓、3px offset，不能被容器裁切。危险/错误状态不复用禁用灰。

## 7. Tabs / Segmented Controls

Position 是单选参数，推荐原生 fieldset/legend/radio 语义，外观为三个分段，不是三颗主按钮。Selected 浅蓝底＋蓝边＋明确标记；Hover 中性浅底；Focus 外轮廓独立显示。三个英文标签完整保留，手机等宽、允许两行、不能缩成10px。箭头/Space选择、Tab进出，选中不自动发声，不建新URL。

## 8. Piano Keyboard Visualization

白键白底、黑键近黑，保留准确分组与相邻关系。所有选中组成音都有标记与音名；Root额外加环形标记及文字图例，Bass在当前结果独立显示。Root不随最低音改变。

当前发声使用深蓝短条或更强轮廓，停止后恢复选中状态，不清空和弦。选中黑键保留黑键形状和底色，通过高对比标记表达，不把它伪装成白键。C4等音区标注始终可辨，不能用1/2/3误导为指法。

当前和弦页的键盘是图示，不新增hover发声或点击弹琴；未来已确认可点琴键页才启用交互态。手机保留C3–C5完整数据，局部横滚与自动定位只帮助看见当前音，不在播放中来回移动。标签按实际显示尺寸验收，不能随SVG任意缩小。

## 9. Tables

Desktop用语义table、明确表头、浅横线、音序不乱断行，不默认斑马纹或多色状态。当前三行转位比较在手机转成三个完整记录行组：Position+Symbol一行，Notes+Bass一行；没有信息丢失，也不要求为看Bass横滑。未来真正宽的图表允许局部横滚，不能用这条例外放弃简单表重排。

## 10. FAQ Accordion

不再套整块卡片，使用横线划分；整行可操作，展开图标有真实状态。使用原生details/summary或正确的button/aria-expanded/aria-controls；允许多项展开。标题至少14–16px、触控高至少48px，答案用正文行高与字宽。默认只折叠FAQ和明确的辅助说明，不把整个教学内容折起来。

# Part 5 — /chords/a-minor 最终页面结构

| 顺序 | 结构 | 默认状态 / 来源 |
|---|---|---|
| 1 | Header | 紧凑品牌、栏目、可用搜索；无营销CTA |
| 2 | Breadcrumb | Chords / A minor；仅已发布父页可跳转 |
| 3 | H1 / short description | 原H1、低权重短说明，不先放完整导言 |
| 4 | Core chord answer | Am / A minor；A–C–E最醒目；Formula次一级 |
| 5 | 主工具 | Position → 当前位置/符号 → 键盘 → 音序/Bass → 播放 → 打印/PDF；am-result |
| 6 | Inversions | 完整原解释和三种位置表；am-inversions |
| 7 | Find notes | am-find-notes全部步骤；am-intro转入原位说明折叠块 |
| 8 | Why minor | am-why-minor原文 |
| 9 | Try positions | am-practice全部步骤 |
| 10 | Print reference | am-print；区分当前打印和整组三位置PDF |
| 11 | FAQ | am-questions；原问答可展开 |
| 12 | Related resources | am-next；只开放已发布链接 |
| 13 | Footer | 无假资历、假更新时间、假功能 |

[已核实] 内容包中的完整导言含“The example below uses A3–C4–E4”。不能移到变化后的结果下面，却仍让“below”指向错误对象。

**迁移规范：** 保留原文，在找音说明内使用“About the root-position example”折叠块；原文后呈现同源a-minor--root静态参考图。它随该说明展开，不随转位切换、不增加另一套播放控件。主工具后的两段 am-result 解释仍保留来源映射。这样移动内容而不是偷偷改稿，也不在默认首屏堆第二张大键盘。

**首屏验收目标，而非已实现效果：** 1440×900默认字号下看到答案、完整键盘、三个转位、播放和打印；390×844看到答案、当前三个完整琴键与Play。其余解释在下方。200%放大时允许垂直滚动，不以小字换首屏。

Mobile与Desktop保持同一主任务顺序，不再把完整导言排到键盘前。摘要由横排变两列，Play+Stop一行，逐音下一行，打印/PDF跟随。只有表格与控制换行，不用CSS order让屏幕阅读顺序与视觉顺序冲突。

# Part 6 — Implementation Brief

## Product goal / Target user / Search intent

给初学到中级学习者一个具体A minor和弦的即时答案和实用参考，服务既定am piano chord / a minor piano chord任务，不变成全曲库入口。进入即有结果，不再选根音，不登录。

## Visual / layout

A浅色无衬线、单蓝体系；C式边界与状态精度。按Part4 tokens和Part5顺序实现，不把内容压缩成营销文案。Desktop>=1024，Tablet 768–1023，Mobile<768；断点按溢出验证，字号不随页面等比例缩小。

## Components / hierarchy

核心：ChordSummary、ChordReferenceTool、InversionSelector、KeyboardDiagram、CurrentVoicing、PlaybackControls、AudioStatus、PrintActions。辅助：SiteHeader、Breadcrumb、InversionTable、ExampleDisclosure、ChordExplanation、PracticeSteps、FAQAccordion、RelatedLinks、PrintLayout。

selectedVoicingId是共享状态入口。内容、图、声音与打印从同一数据派生。静态原位解释图只读a-minor--root，不受当前选择影响；共享根音和低音是两种语义。

## Interaction states

| 状态 | 行为 |
|---|---|
| Default | 原位可见、音频未启动、Stop禁用 |
| Hover | 轻反馈，不被误认为已选择 |
| Pressed | 正在按压按钮的临时状态，与发声分离 |
| Selected | 当前转位，停音后仍保留 |
| Focus | 独立外轮廓，键盘操作可见，不触发声音 |
| Disabled | 相应动作真的不可执行，标签仍可辨 |
| Loading | 音频初始化的局部提示；正确音符继续显示 |
| Playing | 齐奏/逐音按提供事件同步标记；Stop启用 |
| Error | 显示已有错误文案，可重试；不清空答案 |
| Resource unavailable | 不制造下载成功；保留资料缺项说明 |
| Print | 仅当前voicing、独立白底布局、完整范围 |

切换位置先取消旧声音/动画，焦点留在控制区，不自动重新播放。后台/离页停止。原PDF缺失时用实际已核验重制资产或按print_data生成并记录哈希，不能冒称原始文件。

## Accessibility

普通文字4.5:1、大字3:1；必要图形/状态/焦点3:1。本站按钮44/48px为设计目标，不把它误说为WCAG AA一律44px（WCAG2.2目标大小AA为24×24 CSS px并有例外）。触控面积、键盘路径、aria-label、SVG替代文字、短aria-live公告均验收。支持200%文字放大、320px重排、reduced motion、forced colors；不能只靠颜色，也不能以自动检测替代真人辅助技术测试。

## Content / publication

英文direct、educational、concise、beginner-friendly；本轮重用原稿，不重写音乐事实。完整九个block保留，公开指法null继续不显示。初始答案、表格、正文在HTML可读，音频失败不清空它们。预览与正式上线的robots/canonical分开管理，不把本地noindex直接当正式发布配置；本次不部署、不变更发布状态。

## Whole-site reuse

| 页面族 | 复用规则 | 不复制的部分 |
|---|---|---|
| /chords 与具体和弦 | 音名、键盤、声音、打印、对比表 | 中心页筛选不塞进详情 |
| /scales 与具体音阶 | 几何、音序、状态、打印 | 不沿用和弦三音/转位/指法假设 |
| /keyboard-notes 与 labeled/chart | 可读键盘、范围、标记、表面 | 不把两八度尺寸强套61/88键；谱表按已核对数据 |
| /songs、/songs/easy、/sheet-music | 字体、真实资源条目、筛选、下载 | 不强塞大键盘；不复制流媒体封面/歌单 |
| /guide、/guide/read-sheet-music | 阅读宽度、标题、说明、例图 | 不给每节套工具面板 |

这说明系统怎样适配原有页型，不授权现在建这些页，不宣称数据已齐。

## 实施顺序与完成标准

先修数据同步与根音/低音语义，再修首屏与手机实际字号，然后修状态、表格和打印，最后检查跨页型tokens。只完成/chords/a-minor，保留四版原文件。验收320/390/768/1024/1440宽度、三个位置、两种播放、Stop、快速切换、FAQ、焦点、错误、PDF和当前打印。交付运行方法、真实截图、block映射、测试记录与未测清单。完成不是“更像Apple”，而是关键答案和操作更早、标签可读、所有输出一致。

## 证据与标准

- 本轮测量：piano-design-review/evidence/current-audit.json。
- 建议配色计算：piano-design-review/evidence/contrast-proposed.json。
- 内容依据：content-pack.md、page-content.json（1.0.0-batch-01）。
- 页面边界：url-plan.final(1).json（2.0-consolidated-final-plan），/chords/a-minor T07/P151。
- 四版HTML：piano-four-directions/version-a.html 至 version-d.html；本轮未修改。
- W3C Contrast: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- W3C Non-text contrast: https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
- W3C Target size: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
- W3C Reflow: https://www.w3.org/WAI/WCAG22/Understanding/reflow
- W3C Radio: https://www.w3.org/WAI/ARIA/apg/patterns/radio/
- W3C Accordion: https://www.w3.org/WAI/ARIA/apg/patterns/accordion/


# Part 7 — FINAL BUILD PROMPT

# FINAL BUILD PROMPT — Piano Reference

你是一名资深产品设计师与前端实现工程师。请在现有项目中实现 Piano Reference 的最终 /chords/a-minor 样板，不再探索多个风格，不重新规划网站，不扩展其他正式页面，不部署。

## 1. 唯一方向

采用 Version A 的浅色、单一蓝色强调、无衬线文字作为主系统；吸收 Version C 的对齐、紧凑控制区和清楚的选中/焦点状态。不是四个品牌混搭。

最终特征：答案优先、键盘清晰、控制精确、正文可读、打印可靠。

不要引入深色页面、绿色或紫色品牌强调、陶土色按钮、衬线大标题、品牌标志或品牌专有字体。不要复制 Apple / Spotify / Linear / Claude 的产品布局。

## 2. 先读输入，再实现

读取当前提供的：
- content-pack.md
- page-content.json
- Piano_全站统一规划_最终版.md
- url-plan.final.json
- 现有四版 HTML；Version A 是视觉基础，Version C 只参考控制细节。

允许文件名带上传序号，但必须核对文内版本。当前内容包为 1.0.0-batch-01；规划 JSON 为 2.0-consolidated-final-plan。记录实际路径、版本、SHA256。若全站 Markdown 没有提供，明确记录缺失，并在两个 JSON 对 /chords/a-minor 的 final_scope、required_delivery 一致时继续已明确的样板范围；不要声称已读缺失文件。实质冲突则列出位置，不静默裁决。

权威分工：规划决定 URL、搜索任务与功能边界；内容包决定英文正文、音乐数据、资源条件；本 Prompt 只决定呈现、状态与验收。

保留 /chords/a-minor、T07、P151 和全部九个 block_id：
am-intro / am-result / am-find-notes / am-inversions / am-why-minor / am-practice / am-print / am-questions / am-next。

不要修改原输入文件。新建最终分支或目录，保留已有 A/B/C/D 原文件。不得将 ready_for_publish 或 published 改为 true 来绕过验收。

## 3. 产品任务与数据约束

用户从具体和弦搜索进入，首先要看到 Am / A minor、A–C–E 和对应琴键；然后切换转位、齐奏或逐音试听、停止、打印当前结果、下载三种位置 PDF。

正文使用现有英文稿，不改写为营销文案。允许调整内容位置和字号、拆成保持原字序的展示片段，不得删事实、段落、步骤、FAQ 或新增音乐知识。只有中性的界面标签可以补充，记录在 ui-copy-changes.md。

只使用 JSON 中已提供的三个 voicing，下面是回归预期，不是替代数据源：
- a-minor--root：Am；A3–C4–E4；MIDI [57,60,64]；Bass A3。
- a-minor--first：Am/C；C4–E4–A4；MIDI [60,64,69]；Bass C4。
- a-minor--second：Am/E；E4–A4–C5；MIDI [64,69,72]；Bass E4。

根音保持 A。不能把最低音当作根音；不能改变八度、音符拼写、音序、频率、播放事件的 onset/duration。公开指法为 null 时不显示指法，不用 1-3-5 补齐。不能添加根音/和弦类型筛选、MIDI、录音、键盘演奏、评分、账户或订阅。

建立一个 selectedVoicingId 状态。摘要、键盘标记、低到高音序、Bass、播放和当前打印都从同一 voicing 派生；禁止各写一份独立硬编码表。

## 4. 固定视觉规则

颜色：
- Canvas #FFFFFF；Surface #F5F5F7。
- 主文字 #1D1D1F；次文字 #51545A。
- 普通分隔线 #DADDE3；需要辨识的控件轮廓 #7A818C。
- 唯一交互强调 #0066CC；Hover #0056AD；Pressed #00468F。
- Selected 背景 #E8F1FC，深蓝文字、蓝色边框、可辨识选中标记。
- Disabled 背景 #ECEEF1，文字 #626975；同时使用真实 disabled 语义。
- 音符浅底 #DCEBFA；Success #1B6B3A；Warning #8A4B00；Error #B42318。语义色不用于装饰。
- 不增加第二个品牌强调色。图例靠文字与形状区分，不依赖彩虹色。

字体使用系统无衬线栈：system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif。不得打包或分发品牌专有字体。
- H1：桌面 40/48px、手机 32/38px、600。
- H2：桌面 26/34px、手机 24/32px、600。
- H3：18/26px、600。
- 正文：桌面 17/28px、手机 16/26px。
- Label / Button：14/20px；Caption：13/19px。
- 核心组成音：28–32px、600；和弦符号：32–36px，不压过组成音。
- 当前音序：18–20px；公式：14–16px。数字可用 tabular-nums，不把全部音乐文字做成代码字体。
- 键盘音名实际屏幕目标 14px，最低 12px。检查 SVG 缩放后的实际字号，不能只检查 CSS 原始 font-size。

布局：最大工具容器 1120px；正文行长约 60–70ch；桌面外边距至少 32px、手机 16px。工具面板内边距桌面 24px、手机 16px；控件间距 8–12px；大区块间距桌面 40–48px、手机 28–32px。

一个轻量主工具面板：1px 分隔线、12px 圆角、无阴影。正文不逐段套卡片。按钮统一 8px 圆角，桌面至少 44px 高、手机至少 48px 高。Icon button 至少 44×44px。

## 5. 页面结构

Desktop 和 Mobile 使用一致的任务顺序：
1. 紧凑 Header：品牌、已有栏目和真实可用 Search；不加入营销 CTA。
2. Breadcrumb。
3. H1 与低权重短说明；不要再放两大段导言挡住工具。
4. Core answer：Am / A minor；组成音 A–C–E 最醒目；公式作为次要信息。
5. 主工具：Position 单选分段控件 → 当前转位名/符号 → 键盘 → 当前音序与 Bass → 播放组 → 打印/PDF。
6. A minor inversions：已有解释、完整三行四字段比较。
7. Find A, C, and E on the keyboard：保留全部找音步骤与原位语境。
8. What makes this chord minor?：保留原文。
9. Try the three positions：保留全部步骤，不添加训练分数。
10. Print the A minor reference：说明当前打印与整组 PDF 的差别。
11. A minor questions：真实 FAQ 折叠组件。
12. Related resources：仅开放已发布目标。
13. 简洁 Footer。

内容迁移约束：保留 am-intro 全文，但移出默认首屏。放入找音说明中的 “About the root-position example” 折叠块。由于原文含 “The example below uses A3–C4–E4”，该块内在原文后呈现一张来自 a-minor--root 的静态原位参考图；不要让它误指当前第一/第二转位。该辅助图仅随说明展开，不能在默认首屏复制第二张大键盘；它不受当前选择影响、不增加播放控制。原 am-result 的两段说明放在主工具之后，继续带原 block_id 的来源映射。

除上述导言说明和 FAQ 外，不把基础解释、转位比较和练习默认全部折叠。保留分区标题。所有正文、表格和 FAQ 答案在 HTML 中可读取，不要只写进 Canvas 或截图。

## 6. 核心组件和交互

建议组件：SiteHeader、Breadcrumb、ChordSummary、ChordReferenceTool、InversionSelector、KeyboardDiagram、CurrentVoicing、PlaybackControls、AudioStatus、PrintActions、InversionTable、ExampleDisclosure、ChordExplanation、PracticeSteps、FAQAccordion、RelatedLinks、PrintLayout。

InversionSelector：外观是三段式控件，语义优先采用 fieldset/legend 与原生 radio。三个完整标签分别为 Root position / First inversion / Second inversion。单选、不更改 URL。箭头键改变选择，Space 选择，Tab 正常进出。焦点不因切换被重建移走。选中不只换颜色，包含明确边框和标记；hover 不能伪装成 selected。手机三等分、文字最多两行，不缩成 10–11px。

KeyboardDiagram：基于核对过的几何/音高数据生成 SVG/DOM，绝不用生成式图片作音符答案。保留 C3–C5 数据窗口、正确两黑键/三黑键分组及相邻关系。
- 白键白底、黑键近黑，不能给未选琴键整体灰到看不清。
- 选中音：浅蓝底/标记、蓝色描边、明确音名。
- 根音：在选中标记外增加环形标记及 Root 文字说明；Root 与 Bass 分开。
- 播放中：在正在发声的音上叠加深蓝短条或加强轮廓；停止后恢复已选状态，不清空和弦。
- 为未来黑键和弦保留“黑键底色＋高对比标记”的能力，不能把选中黑键涂成白键。
- 当前页的键盘不是独立可演奏组件：不添加点键发声、hover 自动发声或假按钮指针。交互模式只在其他页面已确认任务允许时启用。

播放：用户点击才初始化音频；使用给定 together / ascending 事件，不能改变时长或悄悄加音。切换转位、停止、离开/隐藏页面时取消旧音频和动画。Play chord 是唯一主按钮；逐音为次按钮；Stop 保留独立动作，待机 disabled、播放时可用。出现 loading/error 时不挡住音名和图。

打印：Print this position 只打印当前 selectedVoicingId；Download A minor PDF 下载三个位置的实际 PDF。打印独立白底黑字、不受屏幕配色或手机横向滚动裁切影响。必须保留全部当前音符、八度、位置、键盘和非颜色标记；不能截屏打印整站。原 PDF 不在文件系统中时，不伪造下载成功；可使用已经核验的重制文件或按 print_data 生成并记录来源与新哈希，不冒称原始资产。

表格：桌面语义 table、完整 Position/Symbol/Notes/Bass、浅分隔线。手机将三个记录排成无卡片堆叠的完整行组：第一行 Position + Symbol，第二行 Notes + Bass；不删除 Bass，不默认折叠某一位置。避免四列挤到小字或为此小表强制横滚。可保留同一数据的桌面/手机两个渲染，但断点中只让一个进入可访问树。

FAQ：无独立卡片外壳，横向分隔线，整行可操作；原生 details/summary 或正确的 button + aria-expanded/aria-controls；允许多项展开，保持焦点，答案字宽与正文一致。

## 7. Responsive 和 Accessibility

Desktop >=1024px：完整键盘、摘要、转位和两组动作连成一个工作区。不要做占半屏的左侧参数面板。
Tablet 768–1023px：摘要可两列；控制组允许换行；不缩字体。
Mobile <768px：单列，当前答案先于键盘，键盘先于播放，播放先于长说明。Play + Stop 一行、逐音下一行；打印/PDF 紧随，文字不截断。

键盘允许局部横滚；白键参考宽度约 36–40px，完整数据范围不变。默认和每次切换后让当前三个音全部出现在可视范围；播音过程中不要反复自动横滚。标签实际 12–14px；允许正常页面纵向滚动，禁止整个页面横向溢出。未来 61/88 键页复用几何与局部视窗机制，不按 A minor 的宽度硬编码。

无障碍目标：普通文字至少 4.5:1；大字至少 3:1；必要图形/选中标记/焦点至少 3:1。控件采用实际可点击区域，不能只把内部 icon 做到 44px。所有操作有可见文字或 accessible name。焦点使用 2px 蓝色外轮廓、3px offset，不裁切、不被固定导航遮挡。

读取顺序、Tab 顺序和视觉顺序一致。更新选择通过简短 aria-live=polite 公告，避免把整个页面或每帧声音状态反复朗读。保留 SVG title/desc 或等效 aria-label 与真实文字音序。支持键盘、200% 文本放大、320 CSS px 重排、reduced motion；强制高对比模式仍能识别 selected 和 focus。

初始和弦答案、正文、表格和 FAQ 答案应服务端渲染或静态 HTML 可读；音频与切换渐进增强。音频失败不能让参考数据消失。导航/资源未发布时不开放空链接，不新增网站搜索能力去掩盖只有页内搜索的现状。

## 8. 必须覆盖的状态

default / hover / pressed / selected / focus-visible / disabled / loading / playing-together / playing-ascending / error / resource-unavailable / print。

区分“按钮正被按下”“当前选中的转位”“琴键正在发声”，不要用一个 active 布尔值混合三者。状态文案优先使用 page.microcopy；新增状态标签只做界面说明，不改事实。错误只影响相关功能，不清空正确数据。

## 9. 禁止事项

禁止营销 Hero、card soup、渐变/发光/玻璃特效、无意义图标、品牌照抄、封面/歌单/侧栏播放器、SaaS dashboard、聊天界面、假数字/评价/教师背书、全页衬线、全页代码字体、以截图代替功能、为抢首屏缩小字、为漂亮改音符、编造指法、改 URL/关键词/网站边界、覆盖原四版、自动批量建其他页面。

## 10. 交付和验收

先实现 /chords/a-minor，不等于完成全站。交付运行方法、HTML/项目代码、统一 tokens、组件状态说明、Desktop/Mobile 真实渲染截图、三种当前结果打印预览、内容 block_id 映射、实际测试记录。

至少检查 320/390/768/1024/1440px。具体首屏设计目标（默认字号和默认折叠状态）：1440×900 显示答案、完整键盘、三个转位、播放和打印动作；390×844 显示答案、完整当前三个琴键和 Play。放大字时允许纵向滚动，不得牺牲可读性。

逐个核对全部三种位置：文本顺序、SVG 选中 MIDI、齐奏和逐音事件、Bass、根音标记、打印保持一致。检查无自动播放、快速切换取消旧音、停止、加载失败、FAQ、方向键、焦点、真实 PDF 内容、页面无横向溢出、手机标签实际字号。

无障碍自动检查通过不代表屏幕阅读器或真人任务测试通过。不得把 headless 测试写成真机、扬声器或实体打印测试。功能检查失败就修复或明确列出，不把“设计稿完成”称为“可上线”。

最终汇报：已实现什么、仍缺什么、怎么预览、哪些测试实际执行。不要先给长篇风格分析或再给多套方向，直接完成这个统一版本。
