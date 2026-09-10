# 01 和弦组实现结果

日期：2026-09-09。状态：implementation_checked，等待90独立验收；不是review_passed，不是发布批准。

## 本地页面与范围

[已核实] 四条明确路由：`/chords`、`/chords/a-major`、`/chords/c-major`、原有`/chords/a-minor`。最终开发服务地址为 `http://127.0.0.1:3000`，HTTP及服务状态见service-status.json。构建只有四页和框架/_not-found；首页和其他未授权URL仍404。

[已核实] 未安装/升级依赖，锁文件、Foundation tokens/CSS/cn、根layout和agentRules:false保持。未初始化Storybook或引入组件平台，未部署、commit/push，noindex保留。

## 模板和实际复用

[已核实] 先盘点已有四个组件文件、内容适配与音频模块，没有为目录命名重构。T07在src/components/chords/detail-page.tsx由三个薄路由实际import；旧A minor继续旧适配，新两页使用各自完整master对象。T06在center-page.tsx独立组合中心任务。

[已核实] 从现有实现提取PlaybackControls、KeyboardViewport、PrintVoicing、SiteHeader/Footer；复用原Keyboard、ReferenceAudio、PageSearch、Icon和按钮样式。中心的筛选/当前对象/发声对象分别建模，同页共享一个播放器。FilterChoice为根音/类型真实两次调用，未创建通用表单系统。

接口、状态、响应式、原生语义、打印及实际使用者见docs/design/component-spec.md；23模板与127 URL矩阵见template-map.md。其他模板均planned，不伪称完整设计系统。

## 内容、数据和任务组覆盖

[已核实] A minor九块、原文呈现调整、三种转位、原C3–C5键盘与行为保持。旧中心九个名称不扩为新总包八个对象集合，B与C-flat保留各自音名/八度，即使物理键相同也不合并。

[已核实] 新A major/C major分别读取自己的三个原块、aliases、intervals、voicings、assets、related、issues。未知核心块/缺data显式失败。块原无ID，在显示层登记`<slug>-intro/notice/inversions`；额外reference/print/fingering-example是派生输出，不伪称原block_id。服务器保留完整provenance，客户端不传全站台账。

[已核实] 中心保留七块：intro首段在标题下，第二段和chart操作说明置图表后；how-to-read、major-minor、print、questions原文完整。两组major/minor含4个实际图、两行原表和解释。next在本地开发可用列表中开放A minor，默认生产构建因未发布隐藏；不回写源published字段。

| source_group | 实际交付与保留 |
|---|---|
| P148 | 默认九图、原根音/类型筛选、试听、当前/集合打印、读图 |
| P154 / P158 | 实际2个minor / 7个major命名结果；不声称所有根音/类型 |
| P168 / P170 / P171 | power / 7th / jazz未准备，保持planned，不显示假按钮或填major7 |
| P238 | A与C两组大小对比，具体音图/表/解释，不以筛选器替代 |
| P247 | 读图完成；深入指南尚未授权，相关跳转不开放 |
| P149 / P163 | 各页三位置、音名/音程、声音、当前打印/静态PDF；指法null保留，C major仅单独显示已提供RH原位常见例 |
| A minor原任务组 | 既有范围保留，162项完整回归；不补未上线目标 |

逐项原required_output见coverage.json；未将中心所有原任务写成已覆盖。专业发布条件仍待具名审阅。新两页的播放数组只有MIDI，频率按包内440×2^((midi−69)/12)计算，时序复用已有1200ms齐奏、600ms步进/500ms逐音合同；旧对象事件不改。新页面音区C4–C6，完全保留其已给音高；中心旧A major仍A3起，新详情A major仍A4起，不跨源覆盖。

## 资产与打印

[已核实] assets实际已齐，不再沿用上轮“原件缺失”的现状判断。只选择性导出：

- `public/reference/assets/chord-a-major.pdf`，源master assets，1页。
- `public/reference/assets/chord-c-major.pdf`，源master assets，1页。
- `public/reference/preserved-chords/assets/piano-chord-chart-selected.pdf`，源preserved-chords，3页、9名称。
- A minor继续`/assets/chords/a-minor-notes-inversions.pdf`，47,429 bytes、SHA256 cb741308096528b74879b09676103c85d1b4c7584ac84e7bec7200beb133f7c1的既有派生资产。新找到原件是24,457 bytes、b6a79a5e69f216e3f3902aca431f2b96e1b6bf3554d624a360256dd4e58104e6；不以同名覆盖。

[已核实] 精确源路径、bytes、SHA256、输出URL在docs/content/asset-map.json。三份新增静态PDF已逐页提取文本并渲染查看；源样式保持不重制。动态打印按同一PrintVoicing：新两页各三状态均一页，中心筛选A为2页、全9结果为9页，每个参考一页；静态三页总图与动态打印合同分别保留。打印快照不随后续筛选变化，空结果禁用打印，afterprint不报实体成功。

## 检查与截图

所有命令在已安装的Windows/Node24.14.1/npm11.11.0工作区运行，使用已有Chrome/Playwright与pypdf/Poppler；没有新增项目依赖。

| 检查 / 命令 | 实际结果 / 日志 |
|---|---|
| node scripts/intake-site.mjs | PASS，exit0；../00-content-intake/intake.json |
| node scripts/check-content-adapters.mjs | PASS 14/0，exit0；adapter-validation.json |
| npm run check | PASS Foundation558、真实Tailwind声明140、cn47、TypeScript；exit0，check-final.log |
| node scripts/check-a-minor.mjs | PASS 162/0；提取后与生产模式完整回归，a-minor-regression-production.log |
| node scripts/check-chord-batch.mjs | PASS 233/0；生产模式page-tests-final.log、page-validation.json |
| node scripts/check-chord-fallbacks.mjs | PASS 25/0，错误/不可用/延迟取消与焦点等；fallback-tests-final.log、fallback-validation.json |
| npm run build | PASS，exit0；build-final.log，只生成四个获批业务页 |
| 文本放大与长选项 | PASS 8/8（320/390/768/1440 ×100%/200%），filter-layout.json；原生值裁切时全文补显，中心布局随可用宽度重排 |
| PDF阅读/图示/实际HTTP | PASS；pdf-source-validation.json、dynamic-print-validation.json、pdf-*.png、dynamic-*.png |
| 原件哈希 | 169个修改前快照中163不变；6个变化均为已授权A minor提取和AGENTS。product/content原件、设计参考、锁与Foundation核心全部未变，source-after.json |

[已核实] 原失败保留在日志中：初次守卫漏列两个新增领域CSS文件，补精确文件白名单；初次233项中2失败是中心React插槽key缺失及打印错误断言误排除同时存在的停止状态，已修复；不删除核心断言。文本放大复查识别T06原生选择文字裁切和阅读/头部溢出，局部修复不动Foundation。没有屏蔽console error，最终运行/hydration错误为零。

[已核实] 1440/390截图来自真实生产构建，`a-major-*`、`c-major-*`、`center-*`、`a-minor-*`；320/768补查同目录。A minor同浏览器参考比较为`reference-*`/`page-*`和visual-comparison.json：标题、工具、键床、控制组及阅读区几何一致，390的实际H1为30px（历史文档曾写32px，以本次测量和未改token为准）。新T06/T07实例没有被标为“用户已视觉确认”。

## 遗留与停止

- NOT RUN：具名专业审阅、真人听音、真机/iOS/Safari、屏幕阅读器、原生打印对话框人工体验和实体打印；自动音频事件、模拟视口及PDF导出不冒充这些。
- NOT RUN：90独立验收。此任务仅开发方实施验收，当前等待独立review。
- 后续原任务：power/7th/jazz、未授权指南/其他路由及专业发布条件继续保留；不构成本批数据限定实现的伪完成理由。
- 未部署，所有源release标记不改。临时生产服务验收后停止，恢复原3000开发服务；只处理本任务确认所属的进程。

本批完成后停止，不继续02，不自动创建或冒充独立验收任务。
