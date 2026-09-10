# 03-scales 实施记录

日期：2026-09-09  
状态：`implementation_checked`，开发已停止，等待独立验收。  
范围：仅`/scales`、`/scales/c-major`、`/scales/a-minor`及本批必要组件、模板、测试和进度文档。Foundation、00–02成果保留；未进入04。

## 交付

- [已核实] T11 `/scales`：默认C大调；开放master中的15个大调与15个根音×三种小调形式，共60个真实组合。根音、类型、手别、方向与音名、半音结构、谱表、琴键、声音和当前打印联动。
- [已核实] T12 `/scales/c-major`：固定C；源数据的一八度RH/LH上下行音高与指法逐项接入。没有开放多八度或其他调性筛选。
- [已核实] T12 `/scales/a-minor`：固定A；自然、和声、古典旋律小调分别使用源上下行数组。开放40/60/80 BPM与两手；所有下行指法保持源`null`并显示“Notes only”，没有倒推。
- [已核实] 中心正文保留九个原blocks，并呈现大调表、形式半音、A小调形式对比、七个音级名及四个jazz示例。A小调详情保留七个自然小调三和弦；没有创建T13或其他音阶详情路由。
- [已核实] `ScaleReference`统一屏幕与打印数据；`useScaleAudio`复用既有`ReferenceAudio`。Stop、form/root/hand/direction/tempo切换、打印、隐藏及卸载都会取消旧声音；页面不自动播放。
- [已核实] `KeyboardDiagram`增加可选`marked`/`keyLabels`，`StaffDiagram`增加重复音稳定key与双升/双降显示；缺省接口保持02行为并完成02回归。
- [已核实] 当前打印只导出选中的一八度参考。四个代表状态均为单页Letter；页面明确排除all-scales及two-hand beginner PDF声明。`print_assets`和`audio_assets`源字段未改。

## 来源与边界

- [已核实] 服务端通过`scale-content.ts`白名单读取三个URL，检查已知block集合并转成轻量模型；客户端未收到master台账、保留词或内部文档。
- [已核实] 60个中心组合的拼写及自然/和声/古典旋律上下行来自`page-content.master.json`与A-Scales批次对象；C/A详情的pitch mapping、MIDI和指法取源字段。谱表坐标仅由明确拼写、音区和谱号计算。
- [已核实] C大调仅一八度；A小调下行指法缺项；中心其他调性没有已核指法。这些限制保留在UI、打印和`coverage.json`，没有用近似数据补齐。
- [已核实] `docs/content/site-master/`、`docs/product/`和`docs/design/reference/`基线哈希逐文件核对未变；依赖和锁文件未变；未新增公开静态资产。

## 实际验证

| 命令 / 证据 | 结果 |
|---|---|
| `npm run check` | [已核实] Foundation 560/0；TypeScript通过；Tailwind v4真实编译、140项声明与47项`cn`检查通过。 |
| `node scripts/check-scale-data.mjs` | [已核实] 620/0。逐URL内容同源、60个组合结构/拼写/半音、C/A精确MIDI与指法/null门槛、88键存在性及只读源哈希。 |
| `node scripts/check-scale-batch.mjs` | [已核实] 330/0。逐block、60个中心组合、C/A全部开放状态、方向同步音名/半音、音频事件/取消、打印快照、无JS、404、1440/390截图、320/768、200%文字。 |
| `node scripts/check-scale-fallbacks.mjs` | [已核实] 30/0。三个URL的AudioContext不可用、启动错误、延迟resume后切换取消，以及移动端选中键可见、焦点和强制颜色。 |
| `python scripts/check-scale-pdfs.py` | [已核实] 46/0。四份PDF存在、单页、文本/手别/方向/速度/来源正确，无全集声明，并由Poppler渲染为非空像素图。 |
| `npm run build` + production server + `node scripts/check-scale-production.mjs` | [已核实] Next.js生产构建成功，只有十条授权业务路由与`/_not-found`；production 55/0，检查200、noindex、无master payload、响应式、200%文字和越权404。 |
| 受影响旧页回归 | [已核实] A minor 162/0；chords 233/0与降级25/0；keyboard数据1709/0、浏览器1660/0、降级21/0、production 48/0。回归产物在`regression/`，未覆盖02既有验收证据。 |

浏览器测试使用现有Codex Playwright运行时和用户当前使用的Chrome内核；没有安装或升级依赖。代表截图见`screenshots/`，打印PDF见`print-pdfs/`，像素渲染见`print-renders/`。逐source_group状态见`coverage.json`，文件变化见`changed-files.json`。

## 未测与停止点

- [已核实] NOT RUN：真人听音、真实移动设备、屏幕阅读器人工审计、原生打印对话框、实体打印、专业钢琴教师签核、外部网络或部署。
- [推断] 自动化已核对事件频率/数量、取消和显示同步，因此能支持“实现按当前源合同工作”的开发结论；它不能替代主观音色、实体纸张或教学专业判断。
- [已核实] 没有P0–P3开发阻塞。03独立验收尚未运行；未将状态写为review_passed，也未进入04-songs、发布、索引或部署。
