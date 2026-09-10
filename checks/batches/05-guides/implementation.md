# 05-guides 实施报告

- 批次：`05-guides`
- 日期：2026-09-09
- 状态：`implementation_checked`，开发停止等待独立验收
- 页面：`/guide`（T21）、`/guide/read-sheet-music`（T22）

## 交付

[已核实] `/guide`首屏包含C4、D4、E4的一小节四拍任务和来自既有88键数据的真实键盘图；四步学习路径只给已实施的`/keyboard-notes/chart`与`/guide/read-sheet-music`链接，另外两项保持planned且没有空链接。

[已核实] `/guide/read-sheet-music`按原文保留clef、key signature/accidental、line/space、duration顺序；九个谱号锚点由既有T05 staff坐标解析。FACE只标在高音谱表四个间，低音谱表使用A2、C3、E3、G3；高音谱表下方第二加线A3与低音谱表下方第二加线C2没有合并成通用答案。

[已核实] E-SR1练习按源数据呈现四小节，逐小节总时值均为四拍，答案为`C4 D4 E4 | E4 D4 C4 | D4 E4 F4 D4 | C4`。答案使用原生`details`揭示；没有自动评分、成绩、账号或课程进度。

[已核实] 两页连接同一四页`Piano Starter and Reading Pack`。公开文件与`docs/content/site-master/assets/piano-starter-and-reading.pdf`字节一致；没有公开内容JSON、内部文档、第三方谱面或字体文件。

## 组件与模板

[已核实] 新增T21/T22共用的`GuideShell`、`Section`、`BeatPattern`和`Printable`；T21另用学习路径与既有`KeyboardDiagram`，T22另用目录、既有`StaffDiagram`、锚点定义、FACE对照与练习答案。指南页沿用Foundation阅读宽度、字级、原生链接和表面样式，没有复制造成新视觉系统，也没有加入和弦操作面板。

[已核实] `guide-content.ts`只接受两条白名单URL、对应模板和固定核心标题顺序；运行时核对四拍算术、谱表映射、唯一PDF身份和可分发权限。客户端不接收master、问题台账或专业审阅字段。

[已核实] `SiteHeader`的当前栏目不再带`aria-disabled`，其他未链接栏目仍明确不可用。该共享语义改动已由指南浏览器检查、14条生产路由检查和A minor回归覆盖。

## 测试

| 检查 | 结果 | 产物 |
|---|---:|---|
| `npm run check` | PASS；Foundation 560/560，TypeScript、Tailwind v4通过 | `foundation.json`、`tailwind-compile.json` |
| `node scripts/check-guide-data.mjs` | 157/157 | `data-validation.json` |
| `node scripts/check-guide-batch.mjs` | 77/77 | `validation.json`、`screenshots/` |
| `npm run build` | PASS；14条业务路由与`/_not-found` | 本报告及终端实跑结果 |
| `node scripts/check-guide-production.mjs` | 57/57 | `production-validation.json`、生产截图 |
| A minor生产回归 | 162/162 | `regression/a-minor/validation.json` |
| 原PDF逐页渲染与人工查看 | 4/4页 | `source-pdf/` |

[已核实] 浏览器覆盖1440、390、320、768与200%文字，检查页面级横向溢出、metadata/noindex、block原文、四拍图、键盘/谱表、目录Tab焦点、折叠答案、无脚本内容、PDF响应、既有12条路由和未授权指南404。

[已核实] 受限环境第一次启动Chrome及第一次完整build分别遇到Windows `spawn EPERM`；按授权在本机执行环境重跑后，浏览器与生产构建均通过。编译在首次build中已成功，失败发生在TypeScript子进程启动阶段。

## 专业审阅与程序图形核对

[已核实] 程序核对已完成：master与批次包中的页面对象结构和值完全相等、九个anchor能解析到T05谱位、四个小节时值均等于四拍、PDF公开副本SHA-256等值，原PDF四页用Poppler渲染并逐页查看。

[已核实] 具名钢琴教师的教学适切性、术语与记谱专业签核仍为`pending`，与上述程序核对分开记录。本批实现没有把该项写成已完成，也没有取消noindex或发布页面。

## 未测试与边界

- [已核实] 未执行真人试弹、真实手机、NVDA/JAWS/VoiceOver长流程、浏览器原生打印对话框或实体打印。
- [已核实] 未部署、未开启索引、未创建06–07或其他指南路由，未新增或升级依赖。
- [已核实] 原内容、产品规划与只读设计参考由`source-before.json`和最终哈希复核保护。

独立验收入口：读取`docs/tasks/batch-implementation/CONTINUE-HERE.md`，执行“验收当前批次”；只输出验收报告和测试产物，不修改产品代码。
