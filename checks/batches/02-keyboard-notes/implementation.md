# 02-keyboard-notes — 实施记录

日期：2026-09-09。状态：**implementation_checked / 等待独立验收**。本报告是开发自测记录，不是独立PASS或发布批准。

## 授权与接续

- [已核实] 本轮用户明确授权02及必要组件、模板、测试，完成后停止。仅新增/keyboard-notes、/keyboard-notes/labeled、/keyboard-notes/chart。
- [已核实] 先只读核对01独立报告：PASS_WITH_NOTES，0核心阻塞、1个Low F-01（T07表格区域名称写成A minor）。按报告允许进入02；该既有非阻塞项保留，未冒称本批已修。
- [已核实] Foundation/00/01成果与旧检查记录保留。外层HEAD在head-before.txt，初始修改清单在git-before.txt。piano受外层.gitignore的`*`规则影响，git status不显示其源码差异；实际交接以source-before.json、source-after.json与changed-files.json为准。没有修改忽略规则、commit、push、部署或依赖。

## 页面、模板与真实数据

| URL / 模板 | 实施覆盖 | 数据与代码 |
|---|---|---|
| /keyboard-notes / T03 | 88/61键、点击与音名双向查询、缺八度列候选、G旁黑键先选方向、主动试听、停止、越界错误、拼写保留；6块原文覆盖键数/颜色/跨度/端点 | master同URL的layouts/default_state/query_rules/blocks；KeyboardLookupPage → LookupExperience |
| /keyboard-notes/labeled / T04 | 默认完整88键分段，61键C2–C7，八度后缀开关、段落定位、六步标注、当前打印、4份匹配PDF | 本页layouts/reading_segments/print_payload/how_to_label_steps；LabeledKeyboardPage → LabeledExperience |
| /keyboard-notes/chart / T05 | 默认C4双谱号，同物理键对应两种谱位；谱号/范围/等音切换，点击谱音→键与键→谱音，主动试听，当前范围打印 | 本页88项keyboard_notes内staff_spellings/ledger_line_steps；KeyboardChartPage → ChartExperience + StaffDiagram |

[已核实] 逐source_group的required_output、原发布阶段、实现或保留状态见coverage.json，共26组。所有原blocks.body保留，原内容、音乐数据、URL、关键词、ready_for_publish和出版状态不变。

[已核实] T05开放原focus（C3–C5）、88键及材料中的treble C4–C6 / bass C2–C4参考范围。P132的61键谱表仍标“后续同页补齐”，不因数据已准备而默认开放；P146唱名保持不开放。原range正文已描述61键视图，但原first_release_scope仍为后续，页面加独立明确说明，不静默改原稿。T03/T04的已核实61键任务已交付。

## 实际复用与状态边界

- [已核实] keyGeometry等值抽取原60%黑键几何，被原Keyboard与新KeyboardDiagram实际调用；旧Keyboard仍是静态参考图，未引入点击弹奏。
- [已核实] ReferenceAudio调度原实现保留，参数改为只要求playback；新useNoteAudio封装单音1200ms主动试听。频率按已有440×2^((midi−69)/12)公式推导，无新增音色/设备输入能力。
- [已核实] SiteHeader/Footer实际复用；Header仅增加current参数，旧调用默认仍为Chords。其他全站导航联调未扩展。
- [已核实] T03/T04/T05各有自己的选择、范围和打印状态；共同外壳只负责头尾、标题与原文排版。服务端读取/校验原对象，客户端只接收本工具必要字段，未把master或中文审核台账发入浏览器。
- [已核实] 新键盘用5.25rem白键保证黑键可点击和音名可读，长范围局部滚动；ResizeObserver保持选中键和谱音可见。标签沿用14px token，选中有圆点/轮廓，发声有底线。谱号固定在可见边缘，谱表按显式数据绘制；打印每段最多6音，不将88键挤成一行。
- [已核实] 组件契约与模板记录已更新：docs/design/component-spec.md、template-map.md。

## PDF与资产

- [已核实] public/reference/generated/keyboard-notes/labeled-{88,61}-{octaves,letters}.pdf，4个实际静态文件；88版本各9页，61版本各6页。均由已给数组和同一个打印组件派生，原print_assets=null保持不变。
- [已核实] docs/content/asset-map.json新增派生资产记录，包含源字段、SHA-256、字节数、输出路径和使用范围。原43项资产及A minor URL未改。
- [已核实] T04页面打印保留所选布局与八度模式；T05打印当前范围、所选谱号、拼写和琴键对应。chart-focus/treble/bass各5页，完整88双谱号15页。
- [已核实] 4个静态PDF30页及4个谱表打印PDF30页经Poppler渲染逐页检查（pdf-renders/含各页与总览）；pdf-validation.json 42/0，核对音名、页数和每页琴键/图例。浏览器还输出了4种标注当前打印快照，与对应下载版内容一致。
- [已核实] 输出是参考图，不是实尺寸贴纸；没有引入专有字体文件、第三方谱面或录音。谱号使用系统字形，已对本机Chrome显示校准，其跨系统外观仍需独立检查。

## 实际测试

| 命令 / 产物 | 结果 |
|---|---|
| npm run check | exit 0；Foundation560/0，TypeScript与真实Tailwind编译通过；check.log、foundation.json、tailwind-compile.json |
| npm run build | exit 0；仅七条授权业务路由与框架not-found；build.log |
| node scripts/check-keyboard-data.mjs | exit 0；1709/0，完整两页61/88键表、所有拼写、谱坐标/加线与原始文件哈希 |
| node scripts/check-keyboard-batch.mjs | exit 0；1660/0，逐键查询/点击、谱位双向联动、正文/元数据/布局/打印/下载/无JS/路由 |
| node scripts/check-keyboard-fallbacks.mjs | exit 0；21/0，音频不支持/错误/晚到resume取消、选择可继续、resize定位、焦点与forced-colors |
| node scripts/check-keyboard-production.mjs | exit 0；48/0，七路由production、noindex、master不外泄、发布门槛、PDF字节、响应式 |
| node scripts/check-a-minor.mjs（指定本批输出路径） | exit 0；162/0，完整三位置/声音/取消/打印回归；a-minor-regression/ |
| node scripts/check-chord-batch.mjs（指定本批输出路径） | exit 0；233/0，T06/T07已有页面回归；chord-regression/ |
| node scripts/check-chord-fallbacks.mjs（指定本批输出路径） | exit 0；25/0，既有共享行为降级；chord-regression/fallback-validation.json |
| Python/pypdf + Poppler | 42项内容/分页检查通过，60页渲染检查；pdf-validation.json、pdf-renders/ |

[已核实] 首次新页浏览器运行1645项通过后，测试定位Clef控件超时；validation-attempt1.json保留真实失败。改用明确的combobox角色定位，重跑1660/0。测试过程中修复resize选中被挤出可视区、打印最高音区的图例溢页和系统谱号字形锚点偏移，最终检查以最新源码/产物为准。

[已核实] 截图在screenshots/：三页各1440、390、320、768及200%文本。最后一轮默认态截图来自本地production构建（隐藏未发布related链接）；开发模式相关页入口仍由既有localPreview机制控制。人工鼠标/真机测试与浏览器自动化不同，不混记。

## 未测与保留限制

- NOT RUN：真人听音、真机触摸、NVDA/JAWS/VoiceOver端到端、操作系统原生打印对话框、实体纸张、专业教师签核、02独立验收、公网部署。
- [已核实] 新页型视觉尚未由用户确认，不写为“已验收设计”；当前仅沿用设计系统完成可审查实现。
- [已核实] 01 Low F-01保留。频率表、指法数字、其他键数、唱名、61谱表后续范围及未授权页面不开放；贴纸尺寸与其他数字体系仍缺依据，未补造。
- [已核实] 无当前已授权核心功能阻塞。内容准备或程序检查不替代专业/发布门槛。

## 交接

开发已停止。唯一进度为docs/tasks/site-implementation-plan.md，当前02等待独立验收。请在现有验收对话发送：

> 请读取 docs/tasks/batch-implementation/CONTINUE-HERE.md，执行“验收当前批次”。开发已暂停；只输出验收报告和测试产物，不修改产品代码。

不进入03，不自动部署。预览：http://localhost:3000/keyboard-notes、/keyboard-notes/labeled、/keyboard-notes/chart。
