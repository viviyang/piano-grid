# Piano Reference｜Design Foundation — 新项目版

版本：`foundation-1.1.0-new-project`。本包是新项目基础配置，不是旧项目检查或升级。

## 当前范围与来源

[已核实] 用户确认项目为空；本次建立 Next.js App Router + TypeScript + Tailwind CSS v4 的基础目录。
仅有根 layout，不创建 `page.tsx`、Header、Button、Piano Keyboard、Chord Card、音频、PDF生成器或业务路由。

[已核实] 视觉值沿用最终 `final-prototype-1.0.0` HTML/CSS 及上一份 Foundation 的逐项提取结果，
不是早期四版对照板，也不以旧文字提案覆盖最终源码。归档源码放在 `docs/design/reference/`。

[已核实] 原样纳入规划 JSON、content-pack 和 page-content；完整规划 Markdown 的原文件字节未取得，
请放到 `docs/product/Piano_全站统一规划_最终版.md`。未重写代替、未更改范围。

配置与实际安装状态见 `inspection.md`；当前联网安装受运行环境 DNS 限制，
不把配置版本写成已安装版本，也不伪造 package-lock。

### 证据标记

- **[已核实] / S**：值直接取自最终HTML/CSS或同包设计说明，给出选择器定位。
- **[推断] / E**：语义命名、等值单位转换、跨框架映射或为工程消歧做的归一化。不是新的视觉审美选择。
- **待确认**：没有最终稿直接依据，不伪造像素精度、不填新设计。

所有变量名都是工程命名。下表标记描述的是**值的来源**，不是暗示变量名原来已经存在。

## 1. Color tokens

保持最终成品的浅色方案；不新增 `.dark`、系统自动深色或第二主题。不新增绿色、紫色、陶土品牌强调。

特别注意：原型中的 `--muted` 表示次文本色。shadcn语义的 `--muted` 表示弱化背景，因此本基础层将原型次文本映射到 `--muted-foreground`，而将 `--muted` 映射为已有surface。不能直接把旧变量名字照搬过去。

`secondary` 使用实际中性按钮的白底；`selected` 使用实际选中分段的白底。浅蓝用于选中悬停、结果表行或音符选中，不把三者误认为同一种默认状态。

| Token | 值 | 来源状态 | 最终稿定位 / 用途 |
|---|---|---|---|
| `--background` | `#FFFFFF` | S [已核实] | `:root --canvas`； |
| `--foreground` | `#1D1D1F` | S [已核实] | `:root --ink`； |
| `--surface` | `#F6F7F9` | S [已核实] | `:root --surface`；主工具表面 |
| `--surface-foreground` | `#1D1D1F` | S [已核实] | `.tool / body`；语义别名 |
| `--card` | `#F6F7F9` | S [已核实] | `.tool background:var(--surface)`；兼容名，不授权把正文全部放入Card |
| `--card-foreground` | `#1D1D1F` | S [已核实] | `.tool / body`；语义别名 |
| `--popover` | `#FFFFFF` | S [已核实] | `dialog background`；只映射已观察表面，不创建弹层 |
| `--popover-foreground` | `#1D1D1F` | S [已核实] | `dialog color`； |
| `--primary` | `#0066CC` | S [已核实] | `:root --action`； |
| `--primary-foreground` | `#FFFFFF` | S [已核实] | `.btn.primary color`； |
| `--primary-hover` | `#0057AE` | S [已核实] | `:root --action-hover`；不是旧提案的#0056AD |
| `--secondary` | `#FFFFFF` | S [已核实] | `.btn background`；中性次按钮白底，不是muted |
| `--secondary-foreground` | `#1D1D1F` | S [已核实] | `.btn color`； |
| `--secondary-hover` | `#E9EDF3` | S [已核实] | `.btn.secondary:hover:not(:disabled)`； |
| `--muted` | `#F6F7F9` | S [已核实] | `:root --surface`；工程语义映射：muted表示弱化背景；原型--muted文本色迁移至muted-foreground |
| `--muted-foreground` | `#5C626B` | S [已核实] | `:root --muted`；原型的次文本色，不改成背景色使用 |
| `--accent` | `#EAF2FF` | S [已核实] | `:root --selected-bg / .btn.tertiary:hover`；沿用现有浅强调底，不新增品牌色 |
| `--accent-foreground` | `#0066CC` | S [已核实] | `.btn.tertiary color`； |
| `--border` | `#E1E4E8` | S [已核实] | `:root --line`；仅装饰分隔，不能替代所有输入轮廓 |
| `--input` | `#7A828E` | S [已核实] | `:root --control-border`；有操作边界辨认需求时使用 |
| `--ring` | `#0066CC` | S [已核实] | `:focus-visible`； |
| `--selected` | `#FFFFFF` | S [已核实] | `.radio-label input:checked+.segment`；真实选中底是白色；浅蓝是选中悬停/结果表行的背景 |
| `--selected-foreground` | `#0066CC` | S [已核实] | `.radio-label input:checked+.segment`； |
| `--selected-border` | `#0066CC` | S [已核实] | `.radio-label input:checked+.segment`； |
| `--selected-hover` | `#EAF2FF` | S [已核实] | `.radio-label input:checked+.segment:hover`； |
| `--control-track` | `#E9EBEF` | S [已核实] | `.positions`； |
| `--control-hover` | `#F2F4F7` | S [已核实] | `.radio-label:hover .segment`； |
| `--control-pressed` | `#DCE8F8` | S [已核实] | `.radio-label:active .segment`；此颜色只见于分段选项，不自动当主按钮pressed色 |
| `--disabled` | `#E8EAEE` | S [已核实] | `:root --disabled-bg`； |
| `--disabled-foreground` | `#686F79` | S [已核实] | `.btn:disabled`； |
| `--error` | `#B42318` | S [已核实] | `:root --error`；实际仅见错误文字 |
| `--destructive` | `#B42318` | E [推断] | `:root --error`；兼容破坏性角色，未设计破坏性按钮 |
| `--destructive-foreground` | `#FFFFFF` | E [推断] | `.btn.primary color`；白色作为兼容前景的工程推导，未在最终稿错误按钮上观察 |
| `--piano-key-white` | `#FFFFFF` | S [已核实] | `.key.white`； |
| `--piano-key-black` | `#1D1D1F` | S [已核实] | `.key.black`； |
| `--piano-key-border` | `#8B919A` | S [已核实] | `.key`； |
| `--piano-note-selected` | `#EAF2FF` | S [已核实] | `:root --note-selected`；与控件选择色保持不同语义名 |
| `--piano-note-mark` | `#0066CC` | S [已核实] | `:root --note-mark`； |
| `--piano-note-sounding` | `#0066CC` | S [已核实] | `:root --note-sounding`； |
| `--piano-note-sounding-mark` | `#FFFFFF` | S [已核实] | `.key.is-sounding .marker / ::after`；配空心轮廓和短线，不只改颜色 |
| `--piano-note-label` | `#5C626B` | S [已核实] | `.key-label`； |
| `--piano-note-label-selected` | `#0066CC` | S [已核实] | `.key-label.is-selected`； |
| `--print-background` | `#FFFFFF` | S [已核实] | `@media print html,body`； |
| `--print-foreground` | `#000000` | S [已核实] | `@media print html,body`； |
| `--print-key-black` | `#111111` | S [已核实] | `@media print .key.black`； |
| `--print-key-border` | `#555555` | S [已核实] | `@media print .key.white`； |
| `--print-divider` | `#888888` | S [已核实] | `@media print .print-selection`； |

[已核实] 遮罩仅观察到 `rgb(29 29 31 / 0.35)`；记录为 `--pr-overlay`，本阶段不创建弹层。

[推断] `destructive` 只是对已有错误色的兼容角色映射；其白色前景是工程推导。最终稿没有破坏性确认按钮，不能把这个映射写成已批准的破坏性操作设计。Success / Warning 没有进入最终HTML，因此本次不从旧提案补造为最终色值，保留待确认。

## 2. Typography scale

默认根字号以浏览器的16px为换算说明，不锁死根字号、不使用62.5%换算。下表采用CSS中的实际比例；例如36×1.2222≈44px，不擅改字重或字号以匹配旧提案。

| 角色 | <768px | ≥768px | 字重 | 源码选择器 |
|---|---|---|---|---|
| H1 | 30px / 1.2 | 36px / 1.2222 | 700 | `h1` |
| H2 | 24px / 1.3333 | 24px / 1.3333 | 650 | `h2`；原内容章节在≤352px另有22px特例 |
| H3 | 18px / 1.4 | 18px / 1.4 | 650 | `h3` |
| Body | 16px / 1.625 | 17px / 1.588 | 400 | `body` |
| 辅助解释正文 | 16px / 1.625 | 16px / 1.625 | 400 | `.tool-notes` / `.intro-rest` |
| Label | 14px / 1.43 | 14px / 1.43 | 450 | `.field-label` |
| 按钮文字 | 15px / 1.333 | 15px / 1.333 | 550；主按钮600 | `.btn` |
| Meta | 13px / 1.5 | 14px / 1.43 | 400 | `.playback-feedback` |
| 组成音强调 | 28px / 1.2 | 34px / 1.2 | 650 | `.tone-list`；≤352px为24px |
| 当前音序 | 22px / 1.4 | 24px / 1.4 | 650 | `.note-order` |
| 和弦符号 | 24px / 1.2 | 28px / 1.2 | 650 | `.chord-id` |
| Formula | 20px / 1.2 | 24px / 1.2 | 500 | `.formula`；≤352px为18px |
| 键盘音名 | 14px / 1.43 | 14px / 1.43 | 400；选中700 | `.key-label` |

[已核实] H1字距为 `-.035em`，H2为 `-.02em`，音乐结果强调为 `-.025em`。未设置字距的角色用 `0em` 显式归一化，标作E。

这些是排版角色而不是业务组件。没有创建任何摘要或键盘DOM。

## 3. Font weights

[已核实] 最终源码实际出现400、450、500、550、600、650、700、750。保留这些值：400正文，450字段，500公式，550普通控件，600选中/主操作，650次级标题/音乐结果，700H1/选中音名，750品牌文字观察值。

不为了“统一到四档”擅自改变视觉。750只作为观察记录，不构建Header。系统字体不一定具有每个离散字重的独立字形，不能从截图反推出Windows、macOS、Android将呈现完全相同的效果。

## 4. Line heights

标题和控件使用上表的无单位行高，随字级缩放。长正文使用1.588/1.625，不使用固定高度容器裁切文字。Meta使用1.43/1.5。按钮为min-height，标签换行时允许增长。

不能因为图片中的文本只占一行，就对未来真实标题加 `white-space:nowrap`。字体和控件高度不可作为音乐节拍或音频时长。

## 5. Spacing scale

[已核实] 最终稿使用以4px为主的节奏及2/6/10/14px微调。基础层保留2、4、6、8、10、12、14、16、20、24、32、40、48px；[推断] 64px作为可用刻度补齐，仅为变量，不主动扩大页面留白。

命名 `--pr-space-16` 表示1rem（默认16px），不等同Tailwind的 `space-16`。主题映射使用 `p-pr-16` / `gap-pr-8` 等命名，避免误读原生间距比例。

只使用级别不能保证版式一致；具体区域节奏由第18/19节约束。

## 6. Container widths

[已核实] 页面/工具最大宽度70rem（1120px）；阅读内容最大72ch；工具解释段落最大65ch。桌面最小两侧留白32px，手机16px；这与1120px最大宽共同作用，不是所有桌面固定32px边距。

基础类仅有 `.pr-container`、`.pr-reading-measure`、`.pr-tool-copy-measure` 等通用尺寸规则。没有创建grid页面结构或把所有页面强制变成15rem标题侧栏。

## 7. Border system

[已核实] 普通线1px，色 `--border`；必要控件轮廓1px，色 `--input`；琴键1px，色 `--piano-key-border`；选中轮廓1px，色 `--selected-border`。焦点另有2px轮廓，不与边框混用。

淡分隔线只组织视觉节奏，不能作为唯一的可操作控件边界。输入和状态的可识别性须结合实际组件验收，不通过全局 `*{border-color:...}` 改动所有组件。

## 8. Radius system

[已核实] Panel=12px，Control=8px，分段轨道=10px，分段项=7px，滚动视口=4px，琴键下角=3px；标记圆点使用50%。

[推断] shadcn兼容 `--radius` 指向12px；主题中的 `rounded-lg`→12px、`rounded-md`→8px、`rounded-sm`→7px。不是将shadcn默认减法规则直接套用。新项目已使用上述映射；不要再次用脚手架默认圆角覆盖。

## 9. Shadow system

[已核实] 最终源码没有 `box-shadow`；默认面板与控件无投影。记录 `--pr-shadow-surface:none`。不新造sm/md/lg阴影、不加渐变或发光。Focus outline是无障碍反馈，不算阴影系统。

## 10. Control heights

[已核实] 普通按钮和图标按钮min-height / min-width为44px；分段选项桌面最小44px、手机46px。最终稿没有全局48px移动按钮规则，本次不自动改成48px。内容较长或放大时允许高度增长。

[推断] 通用 `.pr-control-hitbox` 提供44px尺寸约束；它不是Button组件，不含完整按钮变体或行为。不对所有原生radio强行设44px输入本体——命中区通常由后续label组件承担。

## 11. Icon sizing

[已核实] 常规图标18×18px；部分手机工具动作16px；搜索图标20px。图形尺寸与44px命中区域分离。只在 components.json 预留 lucide 图标来源，不安装图标库、不生成图标组件，也不定义新品牌符号。原型SVG使用的stroke按实际素材保留，不能因为这些尺寸令全站所有图标统一成同一笔画。

## 12. Focus state

[已核实] 全局focus-visible：2px实线、`--ring`、offset 4px。分段label代理focus：2px、offset 3px。播放中outline也使用3px，但其语义不是键盘焦点。

基础CSS提供全局 `:focus-visible`；不加入outline:none、不裁切外环。隐藏radio的焦点转发属于后续组件；本阶段不声称已验收所有控件。Forced colors下使用系统Highlight，不能关闭强制颜色处理。

## 13. Hover state

[已核实] Primary hover=#0057AE；Secondary hover=#E9EDF3；未选分段hover=#F2F4F7；已选分段hover=#EAF2FF。分段轨道=#E9EBEF。

只提取变量，不加入hover才可见的内容。后续组件应限定到可用控件和支持hover的指针条件，不把hover视作selected。普通按钮pressed在最终源码中是向下1px，并没有独立的深蓝pressed色；不能以旧提案值补成既定设计。

## 14. Selected state

[已核实] 分段选中使用白底、蓝边、蓝字、600字重及小圆点；选中悬停浅蓝；表格当前行采用浅蓝底及标记；键盘选中采用浅蓝底、圆点、轮廓和文字。不同角色不可直接合并为一个全局active类。

后续组件必须同时有状态语义（原生checked或适用ARIA）和非颜色的可辨认标记。**变量本身不能实现或证明这些行为**，本阶段只固化合同，不制造组件来演示。

## 15. Disabled state

[已核实] 普通按钮禁用使用#E8EAEE背景、#686F79文字、透明边框、not-allowed，取消按下偏移。原型禁用分段另有opacity .55；它是观察项，不把opacity规则推广成全局禁用规范。

后续组件必须使用真实disabled或正确的aria-disabled处理。仅CSS改变外观不能阻止点击；本阶段未增加处理点击的业务JS。不能把所有禁用角色都设pointer-events:none导致解释或焦点信息丢失。

## 16. Desktop / tablet / mobile breakpoints

[已核实] **最终CSS与先前文字提案不完全一致，本次不擅自纠正。**

| 边界 | 最终源码意义 | Foundation处理 |
|---|---|---|
| 22rem / 352px | 极窄屏补丁 | 保留作为pr-compact记录；不覆盖sm |
| 48rem / 768px | 手机布局与较大字号分界 | 用同一mobile-first边界消除47.999rem小间隙，E |
| 67rem / 1072px | 768–1072px中间布局补丁终点 | 记录pr-wide；不是直接把1024px当已批准分界 |
| 容器18rem / 288px | 放大文字或窄容器时的重排补丁 | 保留为文档与token；不创建容器组件 |

全局字体和padding在768px切换。分组可称手机<768、intermediate 768–1072、wide>1072；精确业务布局仍待后续组件实现。主题映射使用 `pr-md` / `pr-wide` 命名的额外variants，不静默覆盖真实项目已有md/lg。pr-wide表示min-width命名入口；源码原始中间补丁包含1072px端点，未来选择断点时应避免两套互相覆盖。

1024、1440、390等是检查视口，不自动等于最终CSS断点。

## 17. Piano keyboard-specific tokens

[已核实] 本阶段只提取已有视觉参数，不实现任何琴键或声音：

| 参数 | 值 | 限定 |
|---|---|---|
| 白/黑键底色 | #FFFFFF / #1D1D1F | 样板基础 |
| 普通琴键边 | #8B919A，1px | 轮廓 |
| 已选键底/标记 | #EAF2FF / #0066CC | 同时保留文字和圆点 |
| 发声底/标记 | #0066CC / #FFFFFF | 源码有空心圈及3px底线 |
| 键盘最小宽 | 540px | 当前参考窗，不是61/88键规格 |
| 白键高度 | 手机144px；桌面196px | 当前样板几何 |
| 黑键高度 | 白键高度62% | 当前样板几何 |
| 圆点尺寸 | .65rem，默认10.4px | 几何值 |
| 圆点底距 | 手机16px；桌面22px | 几何值 |
| 音名字号 | 14px | 不使用图片缩小来降低实际可读尺寸 |

Root / Bass区别仍由内容数据决定。**最终稿没有单独展示Root专用环形标记，也没有验证黑键选中/发声的可读样本**；不从旧提案补成已确定外观。C3–C5、音符、MIDI、频率、播放事件都不是视觉token，本次不修改、不移进主题变量。

## 18. Tool/result-area visual rules

[已核实] 现有工具使用一个浅surface与12px边界；内部靠分隔线、字级、间距组织，不嵌套多个统计卡。桌面padding24px、手机16px；主要操作间距8px；结果与解释采用不同字级。

定义 `--pr-tool-padding`、`--pr-type-notes-*`、`--pr-type-result-*`、`--pr-type-formula-*`，不创建Chord Card或重排其内容。先前“Formula应更小”属于评审提案，不在当前Foundation中偷偷改为已实施事实。

## 19. Content/article-area visual rules

[已核实] 正文直接排在页面底色上，常规最大行长72ch，工具内解释65ch；段落间隔16px；章节padding桌面40px/手机32px；工具到阅读区margin桌面48px/手机32px。

最终稿的两列解释布局不提升为全站唯一布局。只共享文字与节奏规则，不生成Guide、Songs或Sheet Music页面，不改变其模块与内容顺序。不安装Typography插件，也不启用它的默认配色来替换最终稿。

## 20. Print-related considerations

[已核实] 最终样板采用US Letter portrait、16mm页边距、12pt正文、24pt主标题、17pt音序、9pt音名、10pt辅助说明；白纸黑字，黑键#111、白键#FFF、键边#555、基础分隔#888。

Foundation只记录这些参数，并提供白底深字print基础。**不复制样板的 `main{display:none}`，不强制所有未来页面隐藏正文，不定义业务打印容器。**当前结果选择、打印DOM、PDF资产生成、完整键盘缩放都是下一阶段业务责任。

`@page size:Letter`没有全局启用：这只在已批准的对应打印模板中使用，不能因此把所有未来谱纸输出强制设为同一种纸张。颜色不可成为纸上唯一标记，黑键和标记在浏览器关闭背景打印时的表现仍需实际模板测试。

## 基础无障碍与验证范围

可在本阶段验证：token色对、变量引用、CSS解析、字体/padding断点、可见focus、reduced-motion开关、print基础色。控件完整语义、键盘操作、选择标记、读屏、真实触控、业务打印与声音不在本轮实现，因此不能宣称整体WCAG通过。

工程参考只用于实现方法，不替换视觉来源：
- Tailwind v4 Theme variables：<https://tailwindcss.com/docs/theme>
- shadcn Theming：<https://ui.shadcn.com/docs/theming>
- shadcn components.json：<https://ui.shadcn.com/docs/components-json>
- W3C 文字对比度：<https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html>
- W3C 非文字对比度：<https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html>

## 21. 新项目已接入的文件位置

- `src/app/globals.css`：唯一 Tailwind 入口，含 `@theme inline` 和 pr-* 断点。
- `src/styles/tokens.css`：语义与领域变量、响应式变量、reduced-motion 变量。
- `src/styles/foundation.css`：基础排版、通用尺寸、focus、forced-colors、print。
- `src/app/layout.tsx`：导入 globals.css，只有 html/body/children；没有 Header 或页面。
- `postcss.config.mjs`：只使用 @tailwindcss/postcss。
- `components.json`：v4 的 config 为空，CSS 指向 src/app/globals.css。
- `src/lib/utils.ts`：cn 工具，登记 text-pr-* 等自定义主题名，防止字号被当作文字色合并。

不提供 Tailwind v3 分支、不创建 tailwind.config.ts。
颜色保持完整 CSS 值，禁止 hsl(var(--primary))；v4 支持语义色透明度修饰，不需要 -rgb 副本。
字体沿用系统栈，不用 next/font 拉取新字体。
不安装 GSAP / Motion / tw-animate-css，不默认生成动画。
没有引入任何 shadcn/ui 组件；components.json 只是后续源码生成的配置，不能视为全套组件已安装。

## 22. 工程推导与原设计的区别

[推断] Semantic token 命名、muted/foreground 角色分离、rem换算、v4主题映射、pr-* utility、cn主题登记，
均为工程消歧，不是新视觉。globals 的源码扫描范围只在 src，避免将历史原型中的类名编进业务 CSS。
现有控件selected白底/hover浅蓝原样保持，没有改成另一套风格。

所有 -rgb 变量从新项目中去除：它们是上一包仅为v3准备的冗余通道，无视觉影响。
基线数据不进入 tokens，也不作为 Foundation 的编译输入。

[推断] 根 layout 的 noindex/nofollow 是本地 Foundation 阶段保护，并非更改规划中的最终 index_policy。
真正发布业务页面前，在用户批准后单独移除保护并按原规划验收；不在本阶段部署。

## 23. 检查与完成边界

`npm run check:foundation` 无需安装第三方依赖，可检查结构、变量引用、文件哈希及无业务代码约束。
`npm run typecheck` 和 `npm run check:css` 必须先 npm install。
`npm run check:css` 实际调用 v4 PostCSS、验证语义 utility 和 cn；不创建页面。
`npm run build` 是后续本地 Next 实际构建检查。

浏览器根路径没有业务页，预期显示框架默认404；不要为消除404而创建首页。
前述归档截图不是本项目截图。包内测试状态见 `checks/validation.json`。

## 24. 仍待业务阶段确定的视觉项

- 不同平台系统字体的真实字形及450/550/650离散字重效果。
- Root专用标记，以及黑键选中/发声的完整样例；只保留已有可核实tokens。
- Success/Warning的完整视觉状态；最终样板没有，不按旧提案补造。
- 61/88键、谱表、宽表格的几何和视口规格；540px是当前参考窗，不可硬套全站。

本阶段到此停止，不继续实现业务组件或页面。

## 25. 与旧提案不同但按最终稿保留的值

| 项目 | 本基础采用的最终稿值 | 未重新采用的旧提案值 |
|---|---|---|
| Surface | #F6F7F9 | #F5F5F7 |
| 次文本 | #5C626B | #51545A |
| Primary hover | #0057AE | #0056AD |
| H1桌面/手机 | 36px / 30px | 40px / 32px |
| 默认选中分段 | 白底、蓝边蓝字 | 默认浅蓝底 |
| 手机控件 | 普通44px、分段46px最小高度 | 统一48px |
| 全局focus偏移 | 4px；代理控件3px | 全部3px |
| 中间布局边界 | 1072px观察值 | 1024px |

不借工程化重新选择视觉。
