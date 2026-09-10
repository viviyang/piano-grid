# Piano Reference — Page Implementation 01

请直接在当前工作区实现 `/chords/a-minor`，不要只输出计划。
本轮是将最终设计接入现有 Next.js 项目，不是重新做设计原型。

## 0. 明确授权本阶段

Foundation 已有本地验收记录：依赖安装与 npm ci 通过，check/build 通过，浏览器基础检查 50 项通过、0 失败。
这些是上一阶段记录，不代表本轮页面已经验收；先读取 docs/design/local-validation.md 核对，不从零重复安装与初始化。

本条任务明确将阶段切换为：
Page Implementation 01 — /chords/a-minor。

允许：
- 新增 src/app/chords/a-minor/page.tsx。
- 实现该页实际需要的 UI、音乐图示、播放、打印和内容适配代码。
- 新增本页所需静态 SVG/PDF 资产、检查脚本和验收记录。
- 对根布局作必要接入，但保留服务器组件与现有保护。

不允许：
- 实现 /、/chords 或其他业务页面、动态批量和弦路由。
- 新增 API、独立打印路由、组件展厅、账户、支付、MIDI 或部署。
- 重新选择风格、改关键词/URL/页面职责/音乐数据。

先读取现有 AGENTS.md 及作用于工作区的规则。
仅将项目中“当前阶段禁止一切业务页面/组件”的阶段条款，更新为上述单页授权。
保留长期规则和禁区；不修改用户全局配置，不重新开启 Next 自动改写 AGENTS。
如果更高层规则有无法由本条授权解决的冲突，报告具体条款，不绕过。

检查脚本中的阶段守卫也作最小迁移：允许这一个页面和它必要的组件、静态资产；继续阻止其他业务路由。
不得删除原检查、关闭类型检查、屏蔽错误或把所有组件/路由全面放行。

## 1. 读取本地资料，明确各自职责

先读：
- AGENTS.md、README.md、docs/design/local-validation.md。
- package.json、package-lock.json、components.json。
- src/app/layout.tsx、src/app/globals.css。
- src/styles/tokens.css、src/styles/foundation.css、src/lib/utils.ts。
- 现有 Foundation 检查脚本及其本地修复说明。

产品与内容基线：
- docs/product/Piano_全站统一规划_最终版.md
- docs/product/url-plan.final.json
- docs/content/chords/content-pack.md
- docs/content/chords/page-content.json

最终视觉与工程基线：
- docs/design/design-system.md
- docs/design/tokens.json
- docs/design/source-manifest.json
- docs/design/reference/final-a-minor.html
- docs/design/reference/final-prototype.css
- docs/design/reference/final-1440-top.png
- docs/design/reference/final-390-top.png
- reference 目录实际存在的 README 和设计说明。

同义文件名或目录有变化时按实际文件和来源记录定位，不因一个固定路径不同就停止。
完整产品 Markdown 若确实缺失，记录；现有规划 JSON 和内容包足以确定本页范围且不冲突时继续。不得补造缺失文件。
最终参考缺失到无法判断页面外观，或存在实质音乐/产品冲突时，只报告最小阻塞。

职责分工：
- 规划：URL、关键词、页面任务和已确认功能，使用 final_scope / 当前 required_delivery / source_groups。
- 内容包：英文正文、音乐数据、block_id、来源和资源条件。
- 最终 HTML/截图：当前批准的布局、层级、交互呈现；不是音乐事实来源。
- 本地 Foundation：已经接入并修复的 tokens、工具类、cn、主题映射和基础排版。

以当前已验收工作区为起点，不用早期压缩包覆盖本地修改。
尤其保留已修复的容器宽度/间距命名冲突及 cn 合并规则。
如果只是工程名称调整，按本地新名称接入，不恢复旧类名。
真正的设计值冲突应列出来源，不凭自己的审美重选。

## 2. 保护已有成果，不重新搭建基础工程

查看 Git 状态，保留现有修改；没有 Git 也不要擅自初始化或自动提交。
记录本轮开始时原始规划、内容、视觉参考的哈希，结束时检查未变。
不要重新运行 create-next-app、shadcn init、npm install 或 npm ci，除非确有本轮安装问题且先报告原因。
不升级/降级/新增依赖，不更换包管理器，不为可选告警进行无关维护。
必须新增依赖时，先给最小方案和理由，等待确认；可执行部分继续。

沿用 Tailwind v4，不创建 tailwind.config.ts。
不要生成新的 Design System，也不要先建设整套组件库。
本页实际用到的 Button、选择器、FAQ 等可按需提取，不能套入会覆盖最终设计的默认样式。

## 3. 正式页面与内容接入

使用真实 React/TypeScript 实现，不将整份 final-a-minor.html 放进 public、iframe 或 dangerouslySetInnerHTML 充当页面。
不要在组件挂载后执行旧原型脚本操纵整页 DOM。
原型的纯数据/几何/播放逻辑可审查后迁移，生命周期与状态改为项目可维护实现。

建议分工：
- page.tsx 保持 Server Component，读取本页内容、输出标题/答案/解释/表格/FAQ。
- 只有转位、播放、浏览器打印以及必要的菜单/本页搜索进入 Client Components。
- 初始原位结果和键盘也应输出可读 HTML/SVG，不使用 ssr:false 把核心答案留空。
- 新增轻量类型化内容适配模块，从 JSON 提取本页和三个 voicing；客户端不导入全站台账、全部关键词和来源账本。
- 不创建通用 CMS、页面生成框架或全局状态库。

保留全部九个 block_id：
am-intro、am-result、am-find-notes、am-inversions、am-why-minor、am-practice、am-print、am-questions、am-next。

正文和步骤从内容数据接入，不在多处手抄维护。
按最终参考的实际位置和折叠方式呈现，不重新依据早期评审调整章节顺序。
已记录并确认的呈现层文案调整可以沿用，记录原句、现句和来源；不能扩展为整页润色。
未有确认依据的音乐文字差异使用内容包原稿，并报告具体冲突。
静态原位说明必须与原位示例关联，不能切换后错误描述当前转位。
所有未显示模块、链接要记录隐藏原因，不能从源数据删除任务。

标题与 description 使用本页 metadata；保留开发阶段 noindex 保护。
不猜正式域名，不以 localhost 填正式 canonical，不生成全站 sitemap 或虚构 Schema 数据。
首页继续保持未实现，不重定向到这页以掩盖 404。

## 4. 忠实迁移已定稿的视觉

读取并实际查看最终 HTML 和桌面/手机截图，然后实现。
同样视口下比较最终参考和项目页面，修复差异；不要只看 code lint 就宣布设计完成。

优先使用已验收 tokens、语义类和 cn。
新增页面专属 CSS 只能补齐组件布局，不能整份复制原型 :root、body、按钮全局规则形成第二套主题。
颜色不得散落成大量 hex class；没有现成 token 的必要几何参数放在组件配置中并注明来源。
不改已有色值、字号、字重、圆角、断点、容器或阅读宽度。
不因为某个组件库默认样式好看就替换定稿。

重点对照：
标题与答案的比例；工具位置；组成音和当前音序；键盘几何；转位选中；播放主次；手机首屏；下方阅读节奏。
不新增设计稿没有确认的 Root 专用视觉标记、工具栏或装饰；但必须在数据和解释上保持 Root/Bass 区别。

Header、Breadcrumb 和相关资源沿用已确认视觉与范围。
仅实现本页必要的菜单和已有本页搜索，不能扩成全站搜索。
未实现目标不输出可点击的死链接；保留导航视觉标签时明确非交互，相关资源无可用目标时隐藏并记录。
不要为凑齐导航而创建占位页面，也不要把所有栏目都链接到当前页。

## 5. 音乐数据与交互必须一致

只维护一个 selectedVoicingId，默认使用 JSON 的 default_voicing_id。
当前符号、音序、Bass、键位、声音和打印都从同一对象派生。

以下仅为基于内容包的回归样例，正式实现仍读取 JSON：

| voicing_id | 符号 | 低到高音序 | MIDI | Bass |
|---|---|---|---|---|
| a-minor--root | Am | A3–C4–E4 | 57,60,64 | A3 |
| a-minor--first | Am/C | C4–E4–A4 | 60,64,69 | C4 |
| a-minor--second | Am/E | E4–A4–C5 | 64,69,72 | E4 |

根音保持 A，不把 Bass 的变化写成根音变化。
保留拼写、八度、顺序、给定频率、C3–C5 图示范围和黑白键分组。
公开 fingering 为 null 时不显示指法，不以 0、空字符串或通用 1-3-5 填补。
不增加音符、八度、踏板、节拍器、音量控制、速度控制或点击任意琴键演奏。

用 SVG/DOM 读取数据绘制准确键盘，不需要等原始 SVG 才能实现。
静态选中音和正在发声音分开，停止后保留所选位置。

保留控制文案：
Position / Root position / First inversion / Second inversion
Play chord / Play notes one at a time / Stop
Print this position / Download A minor PDF

转位采用可访问单选控件；支持方向键与空格，切换不丢焦点、不自动播放。
音频只由用户动作触发，使用 JSON 中 together/ascending 的事件、频率与时序。
可以迁移参考原型的合成参考音实现，不引入采样音源或付费服务。
保留“Simple reference tone; not a recording of an acoustic piano.”说明。

必须处理：
- idle、loading、playing、stopped、audio error/unavailable。
- 用户在音频准备期间点击 Stop 或切换转位：晚到的异步结果不能再次发声。
- 连续点击、模式切换、卸载、页面隐藏：取消旧声音、回调和动画。
- 不在 SSR 或模块初始化阶段访问 window/AudioContext。
- 音频失败时答案、键盘、切换与可用打印继续工作。

实现 default、hover、pressed、selected、focus-visible、disabled；不把它们合成一个含混的 active 状态。
使用既有 microcopy，未实现时不可宣称操作成功。

## 6. 原始 assets 缺失的处理顺序

不要把“原始素材不全”当作整页工程化阻塞，也不能把缺失资源标成已完成。
只处理 A minor 的三个位置和对应 PDF，不重建其他和弦资产。

1. 检查仓库已有本页资产及其来源记录，有原文件则核对内容和声明哈希。
2. 检查 docs/design/reference/final-a-minor.html：
   若包含内嵌 PDF data URI，可提取为独立文件，例如：
   public/assets/chords/a-minor-notes-inversions.pdf。
   确认是 PDF、能打开、为三个位置的一页参考，核对音名、键位与八度。
   提取时不要执行任意嵌入代码，也不要改写只读 HTML。
3. 该文件若是设计阶段重新渲染的资产，记录为派生资产、新哈希和实际来源；不得冒称原 content-pack 资产或篡改源清单使哈希相等。
4. 没有可验证 PDF 时，可用已有本地工具根据同源 print_data 生成构建期静态 PDF；不为此加运行时后端或新依赖。
5. 仍无法生成或核验时，关闭对应下载动作、给出真实不可用提示，将 PDF 标为未完成；其他功能继续，不把整个页面记为全部通过。

页面客户端不携带多份 PDF base64，运行时使用实际静态文件路径。

Print this position 必须是当前选择的独立打印视图，不拿三位置 PDF 代替。
打印时固定一份 selectedVoicingId 快照；白底深字、完整图示、无导航和按钮，移动端裁切不能进入打印。
浏览器直接打印也应有合理的当前选择降级视图。
取消打印不弹“打印成功”，也不误报错误；afterprint 不代表已完成实体打印。

## 7. 响应式与无障碍

按最终参考和现有 Foundation 的断点适配，不另定一套数值。
重点检查 1440×900 和 390×844，补查 320、768、1024 宽度。

默认字号下，手机应保持最终参考中的答案、当前琴键和主播放动作靠前。
不得靠缩小字体、隐藏必要内容、裁掉琴键或改变音区凑首屏。
键盘允许局部横滚；切换后让当前三个音处于可见区域，不让整页横向溢出。
实际检查渲染后的音名大小，而不是只看 SVG 内的 font-size。

触控尺寸、焦点、状态轮廓沿用已验收基础。
控件有名称，选择不只依赖颜色；焦点不遮挡、不裁切。
键盘图有替代文字，当前音序同时提供真实可读文本。
支持键盘单选、FAQ 展开、菜单退出、简短 aria-live 提示。
检查 200% 文本放大、reduced-motion、无 JS 时的答案与正文降级。
简单转位比较在手机按最终稿重排，不能缺少 Notes 或 Bass。
不要宣称一次自动扫描等于完整屏幕阅读器或 WCAG 验收。

## 8. 验收顺序与证据

三个检查点在同一任务中连续完成，不每做一个组件就让我确认：
A. 页面/内容接入和视觉对照。
B. 三个转位、播放、停止、打印/PDF。
C. 响应式、键盘操作、错误降级和回归检查。

在本页范围内自行修复；涉及原始内容、设计方案或依赖变更时再报告最小待确认项。

结束前实际执行：
- npm run check
- 本轮增加的页面/数据/交互检查
- npm run build
- 本地开发服务的 /chords/a-minor 访问检查

复用现有属于本项目的开发服务；如构建需要重启，先确认进程归属，不终止其他服务，汇报最终地址与运行状态。
新页面应实际返回 200；根路径仍未实现不是阻塞。

至少核查：
- 九个内容块的渲染/隐藏/呈现调整映射，没有原文或任务静默遗漏。
- 三个位置的符号、音序、Bass、键位、播放事件和打印一致。
- 初次进入无自动播放，快速切换与延迟启动不残留旧声音。
- 停止、错误/不可用、FAQ、键盘焦点可用。
- 静态 PDF 文件可获取且内容正确；当前打印三种状态正确。
- 控制台无新增运行错误或 hydration 错误。
- noindex 仍保留，源文件哈希不变，未新增范围外业务页面。
- Foundation 已修复的容器、间距和 cn 不发生回归。

视觉验收：
用同一浏览器、同一视口打开最终参考与新页面，保存两者截图并排对照。
检查字体与折行、容器、工具高度、键盘、控制组、阅读区和手机布局。
记录必要差异及原因；不能只说“与设计一致”而不给证据。
同状态比较；允许记录系统字体渲染差异，但不能借此容忍明显结构漂移。

有浏览器工具就实际测试；没有则标 NOT RUN，不伪造截图。
自动音频事件检查、真人听音、手机模拟、真机、打印媒体检查、实体打印分别记录。
不用重新做音乐研究，不把截图或 mock 检查写成真实听音通过。

## 9. 输出后停止

在 docs/implementation/a-minor.md 中记录：
- 实际页面路径、组件与数据流。
- Foundation 阶段守卫/AGENTS 的必要变更。
- 内容 block_id 映射、已确认的呈现层文案调整。
- 资产实际路径、来源、哈希、缺项与替代方案。
- 相对最终设计的必要差异。
- 测试命令、PASS/FAIL/BLOCKED/NOT RUN、未测清单。

截图和本轮日志放 checks/page-01-a-minor/，不覆盖 Foundation 历史验收记录。
文档合并记录，不为单页拆成大量空模板报告。

最后用中文简短汇报：
1. 本地页面地址与实际 HTTP 状态。
2. 哪些功能可操作。
3. Desktop/Mobile 截图位置和主要视觉差异。
4. check、页面测试、build 的实际结果。
5. assets/PDF 是否齐备、是否为派生资产。
6. 尚有哪些阻塞或未测项目。

不自动 commit、push、部署，不取消 noindex，不宣布正式发布。
完成本页后停止，不继续做 /chords、首页或其他页面。
