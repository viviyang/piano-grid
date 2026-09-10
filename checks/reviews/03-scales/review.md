# 03-scales 独立验收报告

- 验收日期：2026-09-09
- 验收范围：`/scales`、`/scales/c-major`、`/scales/a-minor`，以及因共享键盘/谱表组件受影响的已验收页面回归
- 结论：`PASS_WITH_NOTES`
- 缺陷计数：产品 P0=0、P1=0、P2=0、P3=0；测试工具 P3=1
- 批次判断：[已核实] 03-scales 可验收通过；允许后续另行进入 04，但本次没有启动 04。

## 总体健康度

[已核实] 三条授权路由、T11/T12 页面职责、单八度数据绑定、选项联动、播放取消、打印快照、生产态 noindex、响应式布局和共享组件回归均通过本轮独立检查。当前批次测试合计 1,081/1,081；旧页面有效回归 3,696/3,696。另有 A minor 旧测试 161/162，其中唯一红灯被归类为测试时序断言，不是 03-scales 产品回归。

## 执行结果

| 项目 | 本轮结果 | 证据 |
| --- | ---: | --- |
| `npm run check` | PASS | [已核实] Foundation 560/560，TypeScript 与 Tailwind v4 真实编译通过 |
| 构建可运行性 | PASS | [已核实] `.next/BUILD_ID` 于本轮生成，`next start` 成功启动，生产态套件 55/55 |
| 音阶数据 | 620/620 | `machine/data-validation.json` |
| 音阶浏览器 | 330/330 | `machine/validation.json` |
| 降级模式 | 30/30 | `machine/fallback-validation.json` |
| 打印 PDF | 46/46 | `machine/pdf-validation.json`；四份 PDF 及逐页渲染图已人工复核 |
| 生产态 | 55/55 | `machine/production-validation.json` |
| Chords 回归 | 233/233 + 25/25 | `regression/chords-validation.json`、`regression/chords-fallback-validation.json` |
| Keyboard Notes 回归 | 1709/1709 + 1660/1660 + 21/21 + 48/48 | `regression/keyboard-*.json` |

[已核实] 首次受限环境构建和浏览器启动曾出现 `spawn EPERM`；授权在本机启动子进程后，构建产物、生产服务器和浏览器套件均正常。这是执行环境限制，不是产品失败。

## 页面与模板验收

### `/scales` — T11 Scale Center

- [已核实] 默认状态为 C major、右手、上行、60 BPM；中心数据包含 15 个大调拼写及 15 个主音的三种小调形式。
- [已核实] Scale type、Starting note、Hand、Direction 具有可访问名称；选择形式、主音、手别或方向会同步更新标题、音符、半音步、谱表、键盘、指法状态和打印内容。
- [已核实] 只有实际开放的 C major 与 A minor 详情具有本地详情能力；生产态未暴露未发布相关链接。
- [已核实] 切换方向会停止正在播放的旧音序；Stop 状态从播放中的 enabled 回到 disabled。

### `/scales/c-major` — T12 Scale Detail

- [已核实] 主音固定为 C，无根音或形式选择器；只提供已授权的 Hand 与 Direction 控件。
- [已核实] RH/LH、上行/下行/往返均使用独立的一八度音符与来源核对指法；未声称多八度能力。
- [已核实] 标题、调号、音名、MIDI、谱表、键盘、播放与打印取自同一当前选择。

### `/scales/a-minor` — T12 Scale Detail

- [已核实] 主音固定为 A；Natural、Harmonic、Classical melodic 三种形式彼此独立，古典旋律小调下行回到自然小调音列。
- [已核实] 下行 RH/LH 指法保持为空并明确显示 `Notes only`；没有倒推上行指法或套用其他形式。
- [已核实] 40/60/80 BPM、手别、方向和形式切换均同步驱动可见音符、谱表、键盘、播放和打印。

## 设计、响应式与可访问性审计步骤

1. [已核实] 在 1440px 检查三页的信息层级、控件对齐、工具卡、阅读区、页眉页脚与全页截图；未见裁切、重叠或页面级横向溢出。
2. [已核实] 在 390px 人工操作中心页和两个详情页；页面无整体横向溢出，宽表格、谱表和键盘在自身容器内滚动，主操作按钮保持可见且可点击。
3. [已核实] 自动复核 320/390/768/1440 四个宽度以及 200% 文本缩放；三页全部通过页面级溢出断言。
4. [已核实] 通过浏览器可访问性树确认 H1、控件名称、表格、谱表音符、键盘音名、播放/停止/打印按钮均可被识别；详情页没有误出现 Starting note 选择器。
5. [已核实] 交互检查覆盖形式、主音、手别、方向、播放、停止、选择变更取消播放、打印前快照与打印后恢复。
6. [已核实] 四份代表性 PDF 均为一页，页边距、标题、音符表、谱表、键盘、来源说明完整；没有截字、重叠、黑块或伪造的“全音阶/双手合集”声明。

## 内容、音符与来源边界

- [已核实] `batch-page-content.json` 与 `page-content.master.json` 中三页标题、区块和数据字段由 620 条独立断言核对。
- [已核实] C major 与 A minor 的音名、MIDI、调号、方向、八度端点和已核指法在 UI、播放事件与打印中一致。
- [已核实] A minor 三种下行指法缺口与来源问题台账一致，产品正确降级为仅音符展示。
- [已核实] 当前发布未复制第三方谱图、音频或 PDF；页面使用结构化数据和现有共享渲染器生成可见结果。

## 组件与工程边界

- [已核实] `src/app/scales/` 只有三条明确授权路由；没有动态音阶路由、`route.ts`、组件展厅或 04–07 页面。
- [已核实] T11 与 T12 分别复用 `ScaleCenterExperience`、`ScaleDetailExperience`，共同复用 `ScaleReference`；音阶谱表与键盘进一步复用已验收的 `StaffDiagram` 与 `KeyboardDiagram`。
- [已核实] 15 个批次源代码文件的当前 SHA-256 与开发交付清单逐项一致，验收期间没有修改产品代码。

## Findings

### REV03-P3-001 — A minor 旧回归脚本存在即时状态断言

- 严重度：P3（测试工具，不是产品缺陷）
- URL：`/chords/a-minor`
- 来源任务/字段：已验收 A minor 的打印快照回归；`afterprint` 清理
- 代码：`scripts/check-a-minor.mjs:98`
- 复现：对生产构建执行 `node scripts/check-a-minor.mjs`，得到 161 passed / 1 failed；失败项为 `Afterprint releases snapshot without success claim`。
- 证据：`regression/a-minor-validation.json`
- [已核实] 影响判断：断言在派发 `afterprint` 后立即读取 React 状态；产品组件使用异步 `setPrintId(null)`。该组件不在 03-scales 源代码变更清单中，且音阶批次自身打印恢复、四份 PDF 与其他回归均通过。因此此红灯不会阻断 03-scales，但会制造旧回归假阴性。
- 最小修复建议：未来维护测试时，在第 98 行断言前等待 `#print-content[data-voicing-id="a-minor--first"]` 或一次 React 提交；本次按授权未修改测试或产品代码。

## 非阻断说明与未测试项

- [已核实] 根目录要求读取的 `docs/workspace-context.md` 当前不存在；本次未创建或伪造该文档，使用根 `README.md` 与 `docs/project-context.md` 建立上下文。
- [已核实] 旧 Chords/Keyboard 脚本若不传当前批次附加路由，会把已授权 `/scales` 误判为应返回 404；以 `PIANO_ADDITIONAL_ROUTES=/scales` 按当前范围重跑后分别为 233/233、1660/1660、48/48。
- [未测试] 没有用真人听音评估扬声器音色；已验证 Web Audio 频率、顺序、节拍、停止和选择变更取消。
- [未测试] 没有打开操作系统原生打印对话框完成纸张实打；已用 Chromium 生成 PDF，并对四个代表状态做结构检查与逐页视觉复核。
- [未测试] 没有用 NVDA/JAWS/VoiceOver 完成长流程；已检查语义 DOM、可访问名称、焦点控件与浏览器可访问性树。

## 最终决定

`PASS_WITH_NOTES`

[已核实] 没有阻断当前批次的产品缺陷。REV03-P3-001 可作为后续测试维护项处理，不要求返工 03-scales。验收至此停止，不自动进入下一批。
