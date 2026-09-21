# 截图反馈调整 — 2026-09-21

本轮以用户确认的截图反馈为准，替代首轮默认单区展开、隐藏摘要与目录的方案。实施位置仍为独立工作区 piano-cfix / codex/c-major-design-correction；原工作区、远端 main 与线上版本未修改。

## 已实现

- 恢复页面目录、和弦摘要、Notes / Quality / Formula / Keyboard range 四项信息。
- Print / Download / Share 位于工具上方；Start / Resume practice 保留在键盘下方。
- 钢琴增加深色琴身、上沿、琴键高光、侧面和前沿厚度；继续使用现有音符、键位几何与颜色 tokens，没有复制参考图中的错误音名或指法标注。
- Sound settings 使用原生 `popover=auto`，位于按钮旁，随滚动和窗口尺寸重新定位；浏览器负责 Escape、外部点击与焦点返回。评估沿用模态 Dialog 和引入 shadcn Popover 后，选择满足本次简单控件需求的原生方案，无新增依赖。
- 左右手原位示例与手指编号图宽屏并排、窄屏堆叠；转位仍明确不提供未经核实的指法。
- What to notice、Compare three positions、Root-position fingering examples 默认展开；Staff notation、Theory and references 默认折叠。各区独立，可同时全部展开；旧锚点与重复点击导航仍可打开对应区域。
- 练习继续隐藏参考内容，返回参考时保留各区展开状态。

## 验证

- `revision-check.log`：项目 Foundation / TypeScript / CSS 检查。
- `revision-build.log`：本轮生产构建输出。
- 音频与练习逻辑脚本：19 条断言通过；边界脚本：78 通过、0 失败。
- `revision-interactions.json`：默认展开、多区同时展开、原生弹层设置/Escape/焦点、转位指法边界、练习隐藏答案及独立答题、返回参考保留状态。
- `revision-layout.json`：320 / 390 / 768 / 1440 宽度、左右手排列、窄屏弹层边界、重复同锚点。
- 后续弹层定位微调实测通过：弹层边缘与按钮上下相邻距离为 8px；Escape 返回按钮焦点。
- A-major 回归实测：原手别切换有效，无试点样式容器、无页面横向溢出。
- `revision-mobile.png`：最终代码的开发模式移动截图，已目视检查；`revision-desktop-first.png`：本轮桌面中间截图（其后增大章节标题并恢复图标）。

原报告中的 CRLF 基线哈希差异、共享页头 200% 文字放大溢出，以及真机、读屏、听音、物理打印和 PDF 无障碍未完成事项仍适用。以上检查不代表这些人工验收已通过。首轮浏览器脚本与截图作为历史记录保留，其单面板默认状态不再是本轮验收标准。

生产构建 exit 0，项目 check exit 0，清理自动生成配置后的 typecheck exit 0。4327 已重启到本轮构建；`revision-production.json` 核实 canonical、25 琴键、3 个默认展开区、摘要目录、双手示例和设置关闭焦点。生产全页截图触发工具 `SCREENSHOT_FULL_PAGE_FALLBACK`，返回图为放大裁切的视口片段，未作为完整视觉验收图交付；开发截图与生产 DOM/交互证据分开记录。

## 本轮后续：练习按钮、邻近谱表与摘要对齐

- Start / Resume practice 改为主按钮。
- Staff notation 移至同一工具内，宽屏位于键盘右侧，窄屏紧接键盘下方；不再有页面底部的重复折叠谱表。
- 谱表复用 StaffDiagram，新增可选 highlightedMidi 参数；转位更新音符，播放/按键期间高亮当前谱表中对应音符，Stop 清除高亮。练习模式隐藏参考谱表。
- 摘要三列字号统一，并以共享网格行对齐数值；去掉信息卡顶部边框，保留摘要底部单条分隔线。
- `nearby-staff-validation.json`：1440 / 390 宽度下摘要数值顶部一致、单分隔线、谱表左右/上下布局、无页面横向溢出、转位音符、三个播放音符同时高亮、Stop 清除及练习隐藏均通过。
- `nearby-staff-check.log` 为项目检查结果；`nearby-staff-build.log` 为最终构建结果。边界检查 78 通过、0 失败。
- 全页截图仍触发浏览器截图回退，不能作为完整视口视觉证据；上述几何与交互结论来自实际 DOM 和操作断言。
最终构建 exit 0，4327 已更新；生产预览确认主按钮、工具内谱表及底部无重复谱表。

最新七项实施与整页审查见 [SEVEN-ITEMS-REVIEW.md](./SEVEN-ITEMS-REVIEW.md)。当前练习参考区保留可展开标题，首页与详情页统一琴键表面；先前隐藏全部参考区的记录已由本轮方案替代。

## 最新修正：练习保留原页面状态

[已核实] 按用户最新要求，进入/恢复练习不再折叠参考区，也不隐藏顶部介绍、目录、摘要、打印操作或谱表。练习提示移至键盘操作区下方；播放按钮保持可用，Start / Resume practice 切换为 End practice。移除参考章节前新增的帮助说明，保持章节原有布局。

[已核实] 浏览器记录 preserve-context-browser.json：先设置章节为 open / closed / open / open，进入练习后状态完全相同；顶部介绍、摘要、谱表的宽高与文档位置保持一致（浮点误差容差 0.1 CSS px）。选 C/E/G 后检查正确，结束练习正常。由于参考内容持续可见，按参考辅助练习记录，不声称独立答题。

本节覆盖之前“进入练习自动折叠/隐藏答案”的历史方案。日志：preserve-context-check.log、preserve-context-build.log。

## Independent reference/practice modes (2026-09-21)

Implemented after user approval: practice uses the root reference's fixed C4-C6 range independently of the saved reference position; only reference mode exposes position controls, note-order summary, nearby staff and scheduled playback. The shared keyboard remounts at mode boundaries to discard pointer/focus state. Mode transitions stop all sound. Back to reference and Resume practice preserve reference position and practice selections/help history respectively. In-page navigation/search no longer switches practice to reference. Existing page heading, summary and disclosure states remain intact.

Reused existing Button, KeyboardViewport/Keyboard and native details for Keyboard help; no dependencies added. Neutral dots distinguish unchecked selections from correct-answer ticks. Guided-practice success copy no longer claims an independent result. Component rules version 2026-09-21.

Validation: npm run check passed; existing 19 audio/practice assertions passed. Browser on localhost:3127: first inversion -> practice -> C/E/G selection (Enter and pointer) -> reference restored E4/G4/C5 -> resume retained selection -> correct result; reference TOC link retained practice mode; Clear retained hint history; playback -> practice cleared sounding/pressed notes; return focus on Resume practice; 390px and 1440px no document horizontal overflow. Physical device, listening and screen reader not tested.
Production build passed (independent-practice-build.log); preview restarted at localhost:4327. Production smoke confirmed practice mode removes position and reference playback controls while preserving heading and panel states. Show answer/retry and same-name octave toggling also passed browser checks.

Theory disclosure correction: default theory=true; scoped removal of nested am-tool-notes top border leaves a single disclosure divider. npm run check passed. Browser confirmed initial aria-expanded=true, collapse/reopen works, inner border=0px; visually inspected narrow viewport.
