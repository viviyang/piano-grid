# PianoLab｜品牌与首页 V1 定稿

版本：`pianolab-home-v1.0.0` · 日期：2026-09-10  
范围：品牌展示层、首页、Hero 动效、首页试听、favicon。  
设计主文件：`index.html`；真实浏览器设计稿：`design/`。

> 本版固定一套设计，不再提供六个方向让开发自行混搭。
> **PianoLab 是本版工作名，不是已完成域名/商标核查的正式名称。其余主题、布局、文案、CTA 与交互按本文件实施。**

## 1. 最终决策

| 项目 | 本版决定 |
|---|---|
| 品牌展示名 | PianoLab；集中配置，公开启用前核查 |
| Descriptor | Piano reference & practice tools |
| 当前定位 | 内容与参考资源为基础，提供能够实际使用的轻量演示 |
| 未来边界 | 可以验证 Practice Lab；不预先宣传课程、MIDI、进度记录或订阅 |
| 视觉主题 | Modern Piano Studio：暖象牙白、钢琴黑、克制陶土色 |
| Hero | 任务型文案 + 可点击琴键 + A minor 静音演示 |
| 主 CTA | Explore Piano Tools |
| 次 CTA | Browse Songs |
| 图标 | 一枚简化三角钢琴轮廓，统一导航 Logo 与 favicon |
| 字体 | 无衬线负责 UI 与主体；Georgia 斜体仅用于少量情绪标题 |

[推断] 更宽的品牌表达有利于容纳“参考资源”和“练习产品”两个区域；依据是两者服务范围不同。它不是 SEO、付费意愿或订阅收入已经得到验证的证据。`Reference` 影响定位感受，不会在技术上阻止一个网站销售软件。

### 1.1 名称核查结果与边界

[已核实] 本次打开的 `pianolab.app` 已展示钢琴录音转乐谱产品；Google Books 也列有同名钢琴教材《PianoLab: An Introduction to Class Piano》。[S1][S2]

[推断] 已有相关使用足以让“这个名字尚未被使用”的假设失效；不足以直接判断你的具体使用必然侵权。**本轮没有完成商标检索、可注册性意见、注册商可购买性核查，也没有购买域名。**

本版不另起一轮命名。名称放在 `site-config.brand.name`；未来更换文字时保留这套版式、图标方向、内容结构与动效。正式项目由统一站点配置在服务端输出 Logo 文案、title、可访问名称，不只做客户端替换。

### 1.2 与原 Design Foundation 的关系

[已核实·项目资料] 原 `design-system.md` 使用浅色/蓝色的 Foundation，记录 1120px 内容宽度、12px 面板圆角、8px 控件圆角、44px 控件命中区，并明确不新增陶土品牌强调。[P1]

**本轮最新需求主动要求暖色品牌与新 Hero，因此这是一次有范围的设计修订，不应伪装成原 Foundation 从来就是这些值。**

| 保留 | 本轮明确修订 | 不在本轮修改 |
|---|---|---|
| 1120px 主内容宽度；清晰的语义控件；键盘焦点；已有路由与任务分工 | 首页暖色调、标题组合、品牌按钮、Hero 动效、导航与 favicon 展示 | 原始关键词、127 条规划、17 条首批业务路由职责、音乐数据、发布门槛、依赖版本 |

工具正文与表格不照搬首页大标题；工具键位、转位、音符/根音/低音的语义不能因为换颜色而混淆。不要全局把旧蓝色文字搜索替换成陶土色。

## 2. Hero 文案定稿

### Eyebrow

Piano reference & practice tools

### H1

Learn the notes. Find the music. **Practice with purpose.**

只有一个 H1，使用真实 HTML 文本。桌面前两句在同一行，最后一句为陶土色 Georgia 斜体；窄屏自然换行，不将文案烧进图片。

### Description

Explore piano chords, scales, keyboard notes, and song guides.  
Understand what you play. Find your next step.

这是本轮原创新文案。未就绪的 Sheet Music 不进入当前能力描述；不使用 “Learn faster”“1000+ songs”“For all levels” 等未经核实的承诺。

### CTA 与快速入口

| 元素 | 独立 HTML 中的行为 | 集成原项目时 |
|---|---|---|
| Explore Piano Tools | 滚动到 `#explore`，立即选择任务 | 可保留页内滚动；要进入 `/tools` 时先通过已有发布门槛 |
| Browse Songs | 滚动到 `#songs` | 接 `/songs`；仅在该目的地符合本环境发布门槛时展示 |
| Quick Actions | Chords / Scales / Keyboard Notes / Songs / Learn & Practice | 用对应原 URL，不新造 `/practice` |
| Browse Sheet Music | 本版不显示 | `/sheet-music` 实际可用且可发布后，再一次性替换次 CTA 与相关描述 |

[已核实·项目资料] 原规划要求首页只展示可用模块；首页内容包要求依据真实 release manifest 决定导航，而不是从“文案已准备”推导“功能已上线”。[P2][P3]

## 3. 首页结构与每一区域的职责

| 顺序 | 区域 | 内容 | 不做什么 |
|---|---|---|---|
| 1 | Header | 钢琴图标、PianoLab、原六项导航、Explore tools | 不放 Sign in、Pricing、会员入口 |
| 2 | Hero | 定稿文案、双 CTA、Quick Actions、A minor 键盘演示 | 不要求看完动画才可点 CTA |
| 3 | What do you want to work on? | 六个有具体主题图示的任务入口 | 不展示大块灰色“尚未开放”谱库卡片 |
| 4 | Change one note. Hear the difference. | A minor / A major 对比，可切换、可试听 | 不假装是一套课程或训练系统 |
| 5 | Make room for a little music. | Easy piano songs 与读谱指南，两张编辑式入口 | 不伪造歌曲排名、难度、曲库数量或曲谱下载 |
| 6 | Keep them within reach. | 音符表、空白谱纸、入门指南 | 不用空链接冒充可下载资料 |
| 7 | Your next note starts here. | 三角钢琴插画、回到工具入口 | 不新增与当前能力脱节的品牌长故事 |
| 8 | Footer | 原导航与清楚的品牌描述 | 不增加不存在的社交账户、邮箱或评价 |

首页用“可点击琴键 / 任务图示 / 大小调对比 / 编辑式封面 / 资源列表 / 钢琴插画”形成变化，而不是增加同样的大卡片和更多介绍段落。

**完整参考图在 `design/desktop-1440.png` 与 `design/mobile-390.png`；所有截图直接来自本包 HTML。**

## 4. 视觉规范

### 4.1 颜色

| Token | 值 | 用途 |
|---|---|---|
| Background | `#F7F5F1` | 全站品牌底色；首页为暖象牙白 |
| Foreground | `#181817` | 标题、正文、主按钮、深色功能区 |
| Muted foreground | `#706E68` | 次级说明 |
| Border | `#DDDAD3` | 结构分隔；不是唯一的控件状态标记 |
| Surface | `#FFFFFF` | 局部白色面板 |
| Accent | `#B45F3C` | 大字、装饰、品牌暖色 |
| Accent text | `#9A482B` | 浅底上的小字号强调文字、链接、琴键标记 |
| Accent soft | `#EAD6C9` | 琴键/交互的浅暖色层 |
| Keyboard black | `#151515` | 黑键 |

[已核实·本包计算] `#B45F3C` 在 `#F7F5F1` 上的对比度约 **4.15:1**，不应统一用作普通小字号正文。因此保留用户提出的品牌色，另加 `#9A482B` 文本变体，约 **5.78:1**。这是色值计算，不是完整无障碍合规证明。

### 4.2 字体与排版

使用系统无衬线栈，无需字体请求；少量斜体展示字使用 Georgia/Times 回退。不随包提供字体文件。

普通桌面 H1 最大约 61px；1600px 及以上宽屏为 65px；手机 40px，极窄屏 35px。模块标题约 35–43px，手机 31–35px。主内容宽 1120px，Header 上限 1280px；桌面两侧至少 32px，普通手机内容左右 20px。

不同系统的字形、字宽可能不同，因此设计稿不是 Windows/iPhone 像素完全一致的保证。使用真实 Windows 与 iPhone 再核对换行。

### 4.3 材质与边界

页面背景保持安静；仅琴键、琴身与插画使用必要的材质渐变/投影。普通工具面板不全面添加浮光、玻璃、金属感或阴影。

没有蓝紫色大渐变、金色流光、漂浮音符雨、虚构钢琴铭牌、滚动劫持或随机进入动画。页面加载后，核心文字与入口直接存在。

## 5. Hero 动效与试听：已经实现的合同

### 5.1 本版视觉选择

**V1 用真实可交互的程序化琴键，不加入真人手或抽象手模。**

[推断] 手部动作一旦和具体和弦绑定，就容易被看作指法演示；本轮没有专业指法动作素材。优先让“位置、音名、声音”可核对，比放入无法核对的手部动画更适合当前交付。

三角钢琴仍出现在 favicon 与页尾插画，保留音乐主题。写实双手镜头不在本版交付中；不能把附带 MP4 描述为真人钢琴视频。

### 5.2 程序化循环

[已核实·本包源码] 循环时长 7.6 秒，默认静音，只在可见区域内运行：

| 时间 | 视觉状态 |
|---|---|
| 0.0–0.7 秒 | 琴键与 A minor 信息可见，等待演示 |
| 0.7–1.6 秒 | A3 高亮并产生轻微按下效果 |
| 1.6–2.5 秒 | C4 加入，高亮 A3 与 C4 |
| 2.5–3.4 秒 | E4 加入，形成 A3–C4–E4 |
| 3.4–6.2 秒 | 保持三个音，便于观察 |
| 6.2–7.6 秒 | 复位，再开始下一轮 |

“A minor”和三个音名始终可读，不靠动画进度才揭晓必要信息。

[已核实] 用户可以暂停/恢复；离开可见区停止；浏览器标签页隐藏时停止动效与声音；`prefers-reduced-motion` 下显示静态三和弦。W3C 对超过五秒的非必要自动动效要求提供控制，MDN 说明了减少动态效果偏好的处理。[S3][S4]

### 5.3 键位与声音

[已核实·内容包] 本例采用 A minor 根位 `A3–C4–E4`，A major 为 `A3–C♯4–E4`；数字是八度，不是手指编号。[P4]

[已核实·本包源码与测试] A minor 发送 MIDI 音高编号 `[57,60,64]`，A major 为 `[57,61,64]`，以 A4=440Hz 的十二平均律计算频率。这里的 MIDI 数字用于表示音高，**没有接入 MIDI 设备**。

桌面显示 C3–B4 的 24 个半音；手机显示 G3–G4 的 13 个半音，仍完整包含 A3–C4–E4。黑键布局由音高规则生成，不在 E–F 或 B–C 之间虚构黑键。

“听 A minor”按钮播放三和弦，同时触发三个合成音。单击琴键只播放该音；大小调对比由明确的选择按钮与试听按钮完成。静音演示不会在用户点击别处后突然开始循环发声。

[已核实] `AudioContext` 只在明确点击/键盘播放动作后创建或恢复；浏览器会限制未获用户交互的自动音频。[S5]

声音是 Web Audio 加法合成，不是钢琴采样。页面保留 **Synthesized tone preview** 标记。本轮检查了音高计算与节点清理，没有以人工听音确认“钢琴质感”或设备扬声器效果。

### 5.4 交互与可访问性

键盘内可用左右方向键按半音移动焦点，Home/End 跳至范围两端，Enter/Space 播放。每块可见键盘采用 roving tabindex，不强迫用户逐一 Tab 遍历全部琴键。

交互控件有可访问名称，选中和弦同时有文本与 `aria-pressed`，音频动作有状态反馈。减少动态、键盘操作、无 JavaScript 时正文存在等已进入本包测试；屏幕阅读器与真机仍需人工验收。

## 6. Favicon 定稿与文件

采用原创新绘的三角钢琴剪影：保留上掀琴盖、琴身和粗化支撑。去掉手、踏板、反光、细琴弦以及复杂透视；小尺寸图标不承担完整钢琴结构教学。

| 文件 | 用途 |
|---|---|
| `assets/grand-piano-mark.svg` | 透明矢量品牌图形 |
| `assets/favicon.svg` | 暖白底方形图标，适应标签页深浅背景 |
| `assets/favicon.ico` | 内含 16、32、48 三档 |
| `assets/icon-16.png` / `icon-32.png` / `icon-48.png` | 小尺寸与兼容用途 |
| `assets/apple-touch-icon.png` | 180px 图标资产 |
| `assets/icon-192.png` / `icon-512.png` | 大尺寸方形资产，不等于本版已开发 PWA |
| `design/favicon-preview.png` | 深浅背景与实际尺寸预览 |

[已核实] Google 的 favicon 指南要求方形，并建议提供大于 48px 的图标；首页和图标需可抓取，图标 URL 应保持稳定。[S6]

独立 HTML 为了单文件预览，使用 data URI favicon。**生产环境要改为同站稳定文件 URL，不把本原型的 data URI 当成搜索结果 favicon 配置。**

## 7. 路由、内容与发布边界

本包不是原仓库的替代品，没有创建 17 个业务页面。首页保留原路径，例如 `/keyboard-notes`、`/chords`、`/scales`、`/songs`、`/guide`、`/tools` 等。

在独立 HTML 里，业务链接点击后打开明确标为 **LOCAL DESIGN PREVIEW** 的预览对话框，显示目标路径与有限的说明样例。这是避免本地双击文件后跳到不存在页面的预览机制，**不是线上业务流程**。集成时删除预览拦截器与对话框，用真实页面、真实链接与原发布清单。

[已核实·项目资料] 接续手册记录首轮 17 路由批次验收为 `PASS_WITH_NOTES`；手册也明确区分本地实现与公开发布。本轮没有访问用户电脑仓库，不能用此记录代替实际生产验收。[P5]

保留 `noindex,nofollow` 仅用于本独立预览。没有真实域名，因此本包不伪造 canonical、Open Graph 域名、组织身份、搜索排名或 JSON-LD 中的用户评分。集成原项目时沿用原项目的环境化索引策略，不能机械复制或移除本包 meta。

曲谱和音乐素材：封面、简谱表意图形与钢琴插画是本轮自制的装饰，不是可下载的作品谱面。没有下载第三方乐谱或歌曲音频；不把装饰图叫作可练习的完整乐谱。

## 8. 长期盈利：保留空间，不提前承诺

以下是产品验证建议，不是盈利预测。

| 路径 | 首先验证 | 首页现在怎么处理 |
|---|---|---|
| 内容与参考资源 | 用户是否能找到答案、进入合适页面，内容是否值得持续维护 | 展示真实内容与免费演示 |
| 一次性资料/整理产品 | 有权提供的资料是否替用户省去具体工作；是否发生真实付费与使用 | 未有产品前不放购买按钮 |
| Practice Lab 持续服务 | 用户是否反复回来练习、免费替代品哪里不满足、是否有真实付款与留存 | 未有真实服务前不放 Start Practicing、账号或订阅 |

[推断] 名称与设计可以容纳未来产品，但内容流量不会自动变成订阅。定价、资料版权、练习场景与留存应分别验证，不由一次品牌升级推导。

## 9. 本轮验收及下一步

已执行项目以 `qa/report.json` 为准；`QA.md` 说明运行环境与未测项。本包的测试结果只适用于本独立 HTML，不是原 Next.js 项目或线上网站的验收。

现在交给 Codex 的工作是：读取 `CODEX_HANDOFF.md`，迁移这一套品牌与首页设计，复用原组件/路由/数据；在本地完成回归后停止。**不重做研究、不重建项目、不扩范围、不购买域名、不部署、不开放索引。**

完成标准：桌面/手机与本包截图的结构一致；Hero、音高、暂停与降级符合合同；所有链接依据真实发布门槛；没有新增虚假能力；交付实际回归结果与剩余人工检查。

## 10. 来源与依据

外部来源查阅日：2026-09-10。下列来源支持事实，不替设计选择保证效果。

- [S1] PianoLab.app 页面： https://pianolab.app/ 。本次返回标题为 Notary，正文包含 Pianotation 与钢琴音频转谱产品描述；用于证明该域名存在相关使用，不判断品牌权属。
- [S2] Google Books，PianoLab: An Introduction to Class Piano： https://books.google.com/books/about/PianoLab.html?id=j6DFbwAACAAJ 。用于同名钢琴教材使用证据。
- [S3] W3C，Understanding SC 2.2.2 Pause, Stop, Hide： https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html 。
- [S4] MDN，prefers-reduced-motion： https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion 。
- [S5] MDN，Autoplay guide for media and Web Audio APIs： https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay 。
- [S6] Google Search Central，Favicon： https://developers.google.com/search/docs/appearance/favicon-in-search 。
- [P1] 用户文件 `design-system.md`，foundation-1.1.0-new-project，2026-09-09：颜色、宽度、圆角、焦点与控件合同。
- [P2] 用户文件 `url-plan.final.json`，2.0-consolidated-final-plan，2026-09-08：U001 首页、结构入口与发布规则。
- [P3] 用户文件 `page-content.master.json`，首页批次 F：导航需真实 release manifest；文案就绪不代表已上线。
- [P4] 用户文件 `page-content.json`，batch-01，2026-09-09：A minor 根位、A major 对比、数字为八度的解释。
- [P5] 用户文件 `CONTINUE-HERE.md`，v2.0，2026-09-10：17 路由进度、验收与上线边界。

原规划和内容文件只查阅，不在本包伪造完整副本。集成时读取用户真实仓库中的现行版本。
