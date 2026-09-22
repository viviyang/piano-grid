# BLOCKED，scope=P1

[已核实] 已实施 P1-2 状态接收、P1-1 九页衔接，以及 P1-3 来源映射和 HTML/打印说明。P1-3 的受保护 PDF 视觉验收失败，未覆盖原资产；P0 音阶练习同步问题继续保留。没有将“继续P1”理解成豁免失败或授权发布。

## 基线与保留状态

[已核实] 工作区 `C:/Users/Admin/Documents/viviyang_github/piano-main-product-audit`；分支 `codex/product-system-p1`。阶段开始及交付前已 fetch origin/main，均为 `d15c0142cc6d00b01d060ba17092000a5bf060ca`，与HEAD一致。P0未提交实现原地保留；本分支是P0+P1累积工作树，不是只含P1的提交。原 piano/codex/chords-b1未改动；未commit/push/merge/deploy。

审计51份文件hash变化数=0；原P0 RESULT保留历史结论。受保护内容、public资产、package/lock、src/app与既有音乐引擎diff=[]。没有新增SEO路由、索引策略、TDH、导航、主题或依赖。采用组件规则快照2026-09-21，已有普通anchor/select/radio与am-button样式足够，不引入新控件库。

## 实现和验证分列

| 范围 | 实现 | 实际验证 | 证据（checks/product-system-p1-2026-09-22/） |
|---|---|---|---|
| P1-2 有界状态协议 | pg-object/pg-bass引用真实对象与已有声部；Finder保留pitch classes和过滤；不传不存在的octave | 5项状态测试通过，非法值安全处理 | state-test.log、scripts/check-product-continuation.test.mjs |
| P1-2 五个detail | bass可用时选对应既有voicing；不支持或错误对象提示reset/default | Finder C/E/G+bass E→C major第一转位，refresh相同；bass D明确重置 | browser-receivers.json |
| P1-2 Finder返回 | pg-notes/pg-bass/pg-mode通过replaceState保留；恢复不伪造用户开始 | 返回后C/E/G、bass E正确，tool_start=0 | browser-back-state-receipt.json |
| P1-2 extended | 既有ref-*解析同对象；合法bass只选已供应example；对象选择更新history | 非默认D dominant9、supplied D dominant11，选择后back、非法IDfallback均通过 | browser-receivers*.json、browser-music-final.json |
| P1-2 progression/by-key | 既有对象fragment与C-major context接收；pattern/key同时更新；hashchange/popstate | C-major chord→by-key→progression、非默认cadence、非法fragment；阅读锚点不会误报key状态 | browser-receivers-corrected.json、browser-final-smoke.json |
| P1-1 九页衔接 | 每页1主动作，最多2辅助；复用已有任务，不强配唯一key | 9×3视口：单区域、单primary、无横溢出、单H1；9个非试点无新区域 | browser-nine.json、ssr-pilot-scope.json |
| P1-1 Keyboard | 现有note/layout query继续进入既有练习入口；不假装新增单音专练 | 到达Start 10-note practice且不自动开始；返回参考保留note query | browser-receivers-corrected.json |
| P1-3 来源 | C-major/A-minor旧core registry接已有detail source IDs；其他3个试点已有映射复用 | 433对象、五detail的全部ID可解析，teacherReviewed仍false | adapter-contract.json、adapter-test.log |
| P1-3 C-major scale | 复用既有来源范围；screen与HTML-print新增版本/手/方向/审阅限制说明 | quiz正确，HTML print可见且有版本说明；八组PDF音名/指法文字与同源数据一致 | browser-music-final.json、pdf-data-comparison.json |
| P1-3 既有Letter/A4 PDF | 只读检查，未重生成、未覆盖 | **FAIL**：可提取/渲染，但视觉缺陷及结构告警仍存在 | pdf-existing.json、letter-*.png、a4-*.png、pdf-render-*.log |
| Analytics | 延用P0 transport，补有界relation/context_id，不发第二个click事件 | 2次click、1次engaged，context=c-major，externallySent=false | browser-events-receipt.json |
| 既有音乐回归 | 匹配/公式/音频引擎不改 | C6/Am7歧义、root过滤、add9完整与D11省略分开、assisted练习及HTML打印通过 | browser-music-final.json |
| 规则/构建 | 精确新增1个组件白名单，保留旧断言 | Foundation568、TS/CSS、data152、scale9均PASS，两个build exit0 | check-final.log、data-final.log、scale-final.log、build-final.log |
| SEO | canonical/robots/H1/metadata、路由无改动 | 207 HTML metadata/H1零差异；静态/动态集合相同；生产sitemap206 | metadata-comparison.json、browser-events-receipt.json |
| 性能 | 无新SDK/库 | 总输出JS chunks +34053 bytes（约2.74%）；这不是单页下载量或CWV | bundle-size.json；Lighthouse/真机性能NOT_RUN |

`ALREADY_EXISTS`：三种非core试点来源ID映射、Scale现有来源与手/方向数据、keyboard练习入口与note分享协议、现有打印与域事件。它们被复用，不重复造实现；没有虚列旧main已解决的P1缺口。

## 九页动作与音乐边界

| 页面 | 主动作 | 辅助/限制 |
|---|---|---|
| /chords | 已知音名时去Finder | C major key context；现有卡片仍可直达detail |
| /chords/finder | 回看选择与候选解释，使用候选自身入口继续 | 按名称浏览；保留多解释，不自动挑唯一答案 |
| /chords/c-major | 在C major这一调性上下文看和弦 | 原页练习、C major scale；不声称该和弦决定整曲调性 |
| /chords/a-minor | 既有和弦音练习 | Finder；不强配唯一调 |
| /chords/c-maj7 | 既有四音练习 | Finder |
| /chords/c-diminished | 既有减三和弦练习 | 不错误归入C major自然调内 |
| /chords/c-add9 | 既有add9练习 | 不强加七音；已有formula/voicing任务保持 |
| /scales/c-major | 既有notes quiz | 同调triads；未把有同步缺陷的follow-along设为新主入口 |
| /keyboard-notes | 既有note-location round | 保留当前note/layout；明确不是只考当前单音的新模式 |

受控依赖仅 `/chords/extended`、`/chords/by-key`、`/chord-progressions` 的接收/衔接。其他Finder家族仍用原入口，未宣称全家族bass恢复。pitch-class匹配不是原始声部重建；恢复提示明确不保留原八度/间距。reference无需先开始练习；没有自动播放或自动练习。

## 仍然阻塞的项目

1. **P0既有音阶同步问题**：[已核实] 声音播放时练习仍preparing；P0在baseline与candidate都复现。P1未改相关三个文件，未将它判通过。具体调用链和原始证据见 `docs/product-system-p0-2026-09-22/RESULT.md`。修复音频启动/完成调用合同须取得限定例外授权，不能借P1衔接顺带重写引擎。
2. **P1-3受保护PDF视觉失败**：[已核实] `public/downloads/scales/pianogrid-c-major-two-hand-starter.pdf` 的右手页上方键盘只显示两枚黑键；A4版本 `pianogrid-c-major-two-hand-starter-a4.pdf` 封面副标题与正文重叠。六页均已渲染并实际查看；音名/指法文字一致不等于图示/版式通过。pypdf报告startxref修复，Poppler有结构与字体替代告警。原文件hash保持不变。需要精确授权修复生成输出并重生成这两份既有资产，保留URL与音乐数据，之后重新做六页视觉及A4/Letter一致性验证。07的P1-3明确规定锁定资产重生成另提授权。
3. **浏览器截图仍未齐全**：[已核实] 九页布局/交互已实际测试，但P1截图调用在fonts loaded后超时。未把DOM断言冒充截图验收，保留失败receipt；P1没有完整九页桌面/移动视觉截图。未通过更换浏览器后端绕过限制。

这些阻塞不能由“文档已生成”或“build通过”代替。P1代码本地通过项可审查，但当前不是发布就绪。

## 测试环境、失败与限制

- `.next-p1` + localhost4350跑完整九页/受控接收；最终仅补by-key阅读锚点保护及空白清理后，`.next-p1-final` + 4351复验受影响接收、keyboard Enter、音乐/打印及事件/sitemap。相同未变九页UI的结果复用，不宣称对最终构建重复了27次。
- analytics IDs为空；本地事件接收器、网络限制与print stub用于测试，不发送生产统计；真实打印、下载保存、后台收数都未证明。
- 两次history导航等待器超时，但receipt显示已返回Finder；随后以浏览器实际DOM状态验证通过，未更换后端或伪造history。原失败日志保留。
- 旧wrapped label包含option文字，精确Key context定位失败；已用观察到的真实select定位复验。键盘参数类型、来源optional类型、空白检查失败已修复，最终check通过。
- 浏览器任务曾重新分配runtime，跨脚本接收器与print stub未保留；旧music脚本因此失败。最终脚本自含初始化，在最终生产服务5/5通过。测试产生的TypeError不当作产品bug，原receipt保留。
- CLI提示过--foreground，但当前launcher不接受该参数；该调用没有执行浏览器程序，之后正常使用支持接口。没有关闭权限或更换后端。
- `check-support-pages.mjs`/`check-chords-completion.mjs`硬编码旧173 sitemap且自启Chrome；没有声称原脚本完整跑过。已复用相关音乐/状态断言到Tabbit，并以当前206路由集合、SSG和生产sitemap验证；原脚本未被静默放宽。全套旧集成浏览器脚本、完整无JS浏览器流程和Lighthouse仍NOT_RUN，SSR静态答案/链接存在由构建HTML核对。
- Build自动生成next-env/tsconfig差异已还原；锁文件未改。Git CRLF提示为工作树换行告警。Poppler与pypdf只读使用现有运行时，没有安装依赖或字体。

## 人工验收和后续授权范围

| 入口 | 动作 | 预期 | 当前状态 |
|---|---|---|---|
| Finder | C/E/G+bass E→C major→刷新→返回 | 第一转位；返回三音与bass恢复；不是octave重建 | 本地PASS，真机/读屏待验 |
| Finder | C/E/G/A，bass A且Require root；C/D/E/G | 多根解释正确；完整add9与省略D11明确分开 | 本地PASS，具名音乐审阅待验 |
| Extended | 非默认ref-d-dominant9；切换D11再返回；非法ID | 控件/键盘/公式同对象，非法状态说明默认 | 本地PASS；真人听音待验 |
| C major | Tab定位新主链接，Enter→by-key→progression | C major上下文一致；合法非默认fragment可恢复 | 本地PASS |
| 九页 | 1440/390/768查看衔接区；开启参考与既有练习 | 一主≤二辅，不强制练习，无横溢出 | DOM/交互PASS；完整截图未完成 |
| Scale | RH/LH、上下行、quiz、HTML打印 | 同源音名/指法/范围，来源和版本说明 | 本地PASS；纸上打印待验 |
| 两份PDF | 查看封面及左右手页并实际打印 | 不重叠、不缺黑键；A4/Letter相同音乐数据 | **FAIL**；原资产未覆盖 |
| Scale follow-along | 对照声音、count-in、逐音指引 | 同步开始与取消 | **既有BLOCKED** |
| Analytics后台 | 经另行授权测试路径查事件、版本、分母 | intent不当完成；raw点击不除去重曝光 | BACKEND_NOT_VERIFIED |

读屏、iOS/Android真机、真人听音、专业签名、实体打印与PDF无障碍决定均MANUAL_PENDING；未代签。P2队列/扩站/新comparison/账户/MIDI/麦克风/商业化均未实施。本轮未发布。

## 变更文件与可审查证据

`p1-change-scope.json`以阶段开始时每个src/scripts文件hash区分P1改动与继承P0；`inherited-p0.diff`保留P0差异。`combined-working-tree.diff`是相对main的累积tracked diff，`new-implementation.diff`补所有新增源码/测试；`delivery-files.json`列文件与hash，不能只看git diff漏掉未跟踪实现。

| 文件 | 相对P0 |
|---|---|
| `src/components/product-continuation.tsx` | 新增 |
| `src/lib/chord-completion-content.ts` | P0之后修改 |
| `src/lib/chord-learning-content.ts` | P0之后修改 |
| `src/lib/product-continuation-state.ts` | 新增 |
| `src/lib/product-continuation.ts` | 新增 |
| `src/lib/product-measurement.ts` | P0之后修改 |
| `src/lib/use-continuation-state.ts` | 新增 |
| `src/components/a-minor/experience.tsx` | P0之后修改 |
| `src/components/chords/c-major-experience.tsx` | P0之后修改 |
| `src/components/chords/center-experience.tsx` | P0之后修改 |
| `src/components/chords/completion-category-experience.tsx` | P0之后修改 |
| `src/components/keyboard-notes/keyboard-notes-workspace.tsx` | P0之后修改 |
| `src/components/scales/detail-experience.tsx` | P0之后修改 |
| `src/components/support/by-key-experience.tsx` | P0之后修改 |
| `src/components/support/finder-experience.tsx` | P0之后修改 |
| `src/components/support/progression-experience.tsx` | P0之后修改 |
| `scripts/check-foundation.mjs` | P0之后修改 |
| `scripts/check-product-continuation-data.cjs` | 新增 |
| `scripts/check-product-continuation.test.mjs` | 新增 |
| `scripts/lib/chord-query-candidates.mjs` | 新增 |
