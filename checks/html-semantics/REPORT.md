# PianoGrid 服务端 HTML 与语义结构审查

2026-09-22。实现完成；存在明确的基线测试失败与人工验证限制，不能视为全套验收通过。

## 范围与基线

[已核实] 基于 fetch 后的 origin/main `c1a017a`，复用已有 `piano-component-audit` worktree，分支 `codex/html-semantics`。没有新建 worktree，也没有触碰主目录的未提交工作。

[已核实] 采用主目录 `docs/design/COMPONENT-RULES.md` 2026-09-21 版（远端基线尚无该文件），读取上级 page-rules、本站 TDH 和设计/内容依据。复用现有组件，不新增交互基础库。外链、title、llms.txt、音乐内容、URL、索引配置与 PDF 资产未修改；没有推送或部署。

## 1. HTML 膨胀根因

[已核实] `/chords` 基线为 825,828 B，10,465 个 DOM 元素；包含 25 张交互卡与 433 条 SSR 库索引。script 内容为 226,105 B；187 个内联 SVG 约 39,121 B；琴键标记约 158,903 B；130 个 RollingText 的标记约 205,789 B。组件体积按 outerHTML 近似计算，不与压缩传输体积混淆。

[已核实] RollingText 每个字符有两套 span，加一份完整读屏文本。服务端调用处还将字符树序列化进 RSC。分类页把 metadata、title、directAnswer、links 等服务端字段一并传给客户端。

[已核实] 并非所有重复都可删除：目录是真实参考内容；标注页的总览、完整图、打印图用途不同；桌面/移动导航和部分操作入口有分别渲染。C major 有一条重复说明段落，保留其原教学上下文。

## 2. 修改文件与共享组件

- `src/components/ui/rolling-text.tsx`：单套字符节点，CSS pseudo-element 生成第二个装饰字形，保留逐字动画、完整读屏文本。小型客户端边界使服务端调用只序列化文案 props，仍有 SSR 输出。
- `src/styles/foundation.css`、`src/components/keyboard-notes/keyboard-notes-v2.css`：匹配单轨动画，保留 focus 和 reduced-motion。
- `src/components/chords/category-page.tsx`、`category-experience.tsx`：显式限制客户端模型字段，保留筛选、键盘、页内搜索所需数据。
- `src/components/chords/center-experience.tsx`、`center-page.tsx`、`supplement-index.tsx`：卡片使用 article、对比表增加 caption、补齐区块标题关联。
- `src/components/keyboard-notes/pages.tsx`、`labeled-experience.tsx`：补齐 section/h2 关联；PDF 下载可访问文本包括当前布局。

[已核实] 没有新建通用交互控件，不需要引入新的 shadcn 组件。组件内容、音符、指法、正文与静态答案保留。

## 3. 修改前后结果

单位为未压缩 UTF-8 字节，来自本地生产 HTTP 响应；不是 bundle 大小，也不是 Semrush 自有比率算法。

| URL | 修改前 HTML 大小 | 修改后 HTML 大小 | 降幅 | 正文是否保留 | 交互是否通过 |
|---|---:|---:|---:|---|---|
| / | 141,014 | 129,011 | 8.51% | 是 | 抽样通过：声音、运动开关 |
| /chords | 825,828 | 757,522 | 8.27% | 是 | 筛选、音频、键盘、打印快照通过 |
| /chords/c-major | 120,221 | 118,905 | 1.09% | 是 | 转位、键盘练习、答案检查通过 |
| /scales/c-major | 133,213 | 133,213 | 0% | 是 | 部分通过；跟练启动基线亦失败 |
| /arpeggios | 127,370 | 127,370 | 0% | 是 | 抽样通过；跟练用 10 秒窗口验证 |
| /keyboard-notes/labeled | 171,623 | 172,993 | −0.80% | 是 | 布局、八度、折叠通过 |

[已核实] 标注页增加 1,370 B 是标题关联和描述性可访问名称的开销。`/chords` 减少 68,306 B、2,090 个 DOM 元素；script payload 基本不变。没有声称根治体积问题。

完整 13 页 HTML/script/SVG/DOM/H1–H3/JSON-LD/正文测量见 [METRICS.md](METRICS.md)、`comparison.json` 与 `before/`、`after/`。

[已核实] 13 页装饰副本归一化后的 SSR 正文相同；六页可见正文也相同；13 页 title、description、canonical、JSON-LD 逐项一致。样本只有首页有 WebSite JSON-LD，其他页原来没有，本次未补造。

## 4. 语义结构与 PDF

[已核实] 13 页前后都是一个 main、一个 H1，没有可见标题无理由跳级。新增 aria-labelledby 都有目标。独立卡片使用 article；分类页学习链接使用有名称的 nav；比较表保留原生 thead/tbody/th，增加读屏 caption。没有机械替换布局 div 或新增 aside。

[已核实] 扫描生产静态 HTML，找到 155 个不同 `/reference/` PDF、161 组链接文本/属性组合。未发现仅叫 Download/PDF 的裸链接。标注页补充具体布局名称并保持 download。

以下链接明确用于打开打印，保留浏览器预览而非强制下载：

- `/reference/generated/keyboard-notes/piano-key-names-c4-c5-letter.pdf`
- `/reference/assets/blank-piano-staff-letter.pdf`

[已核实] 未取得 Semrush 六个 PDF 的准确清单，不能声称逐一确认那六个。未新增散布式内链、删除或转换 PDF，也未配置 noindex。是否退出搜索落地页尚未确认；一个内链告警不足以决定索引策略。后续确认资源仅供下载时，可对准确路径单独配置并验证 X-Robots-Tag 响应头。

## 5. 测试、构建与限制

| 检查 | 实际结果 |
|---|---|
| npm run check（修改前后） | Foundation 568/568、typecheck、CSS/Tailwind/cn 通过 |
| lint / tests npm scripts | 项目没有独立 lint、test 命令；没有算作通过 |
| check:keyboard-completion | 70/70 |
| check:practical-tools | 44/44 |
| production build | 修改前后成功；恢复锁版本后最终构建再次成功 |
| 最终 typecheck | 通过 |
| 关闭 JavaScript | 13 页使用 CSP script-src 'none'，保留原始 HTML/CSS，正文可见 |
| 浏览器专项 | 和弦 6 项、回归 18 项通过；无捕获到的 hydration mismatch、pageerror 或 console error |
| 响应式/ARIA | 13 页 390px 无页面横向溢出，单 main/H1，ARIA 引用有目标 |
| 视觉 | 查看和弦卡桌面前后、手机截图；按钮尺寸一致，无明显布局回归；非全站逐像素验收 |
| 音频/打印 | 首页、音阶、琶音播放状态和停止通过；音符检查、打印快照通过 |
| 琶音跟练 | 首次 5 秒窗口失败；基线对照 10 秒窗口前后均进入 counting，reset 到 idle |
| C major scale 跟练 | 修改前后 10 秒内均停在 preparing，reset 正常；未通过，未改音频引擎 |
| check-integration-data.mjs | 126 通过、26 保护文件历史哈希失败；涉及文件与 HEAD 内容相同（换行归一化） |
| check-integration-batch.mjs | 默认 localhost:3000 无服务，未完成旧全套浏览器验收 |
| check-integration-production.mjs / check-chord-content-next.mjs | Node 导入无扩展名 site-config 失败；使用另行记录的 Tabbit 专项验证当前端口 |

[已核实] 初次 build 因旧 worktree 依赖缺失失败，npm ci 因旧进程锁住 native 文件失败；补齐时发现 6 个兼容版本漂移，全部恢复锁文件版本并复建。依赖声明、锁文件未改；最终 `dependency-mismatches.json` 为空。最终 13 页 HTML 除 build ID 外与浏览器已验证版本完全相同，见 `locked-html-equivalence.json`。

[已核实] 浏览器初稿曾因会话丢失、定位或跨运行域数组断言失败，修正验证脚本后重跑；未为测试改写产品行为。旧报告生成器产生的历史报告更新已恢复，未用新结果覆盖旧证据。

打印仅验证按钮回调、beforeprint/afterprint 快照与 print CSS；没有实体打印。音频仅验证状态与交互，没有人工听音、真机读屏或完整 WCAG 审核。

## 6. 保留未改的高风险项目

- [已核实] 保留全部目录、琴键、乐理内容、FAQ、来源、静态答案与打印布局。
- [推断] 客户端分页/虚拟化可能影响无 JS 内容可发现性，因此不实施。
- [推断] 全面缩写音乐模型或延迟挂载练习器会扩大音频、状态恢复、打印和首交互验证范围，本轮不实施。
- [已核实] SVG 约占 chords HTML 的 4.7%，不是最大来源；未重写全站图标/谱面系统。
- [已核实] 桌面/移动导航及完整图/总览/打印图有不同用途，未按重复数量简单删除。

## 7. Semrush 复查重点

获准部署后，优先比较 `/chords` 的原始 HTML 字节、DOM 数量和 text/HTML 告警，再观察 `/chords/seventh` 与其他分类页。核对主要正文抓取、单 main/H1、标题层级、canonical 和已有结构化数据。PDF 应按实际下载用途、锚文本、文件类型评估，不以单入链数量为唯一目标。

[推断] 这次降幅不足以保证清除 78 页低比率告警，没有排名或工具评分保证。

## 证据与复现

原始 HTML、JSON、检查日志和截图保留在本目录。`scripts/measure-server-html.mjs` 测量 HTTP 字节；其他 html-semantics / html-visible-text 脚本通过 Tabbit nodejs stdin 执行。浏览器采用 tabbit 技能。

基线与优化构建分别为 `.next-html-before`、`.next-html-after`；准确锁版本复验为 `.next-html-verified`。本次启动服务端口 3141、3142，结束时停止；复现可用对应 PIANO_NEXT_DIST_DIR 配合 npm run start。旧预览服务未停止。

## 合并交接

2026-09-22：用户已授权合并到 main。以上未推送/未部署描述为审查完成时的历史状态。原始 HTML 与临时调试脚本保留在本地；提交保留报告、测量 JSON、验证日志与截图。后续首页导航配色修复见 ../header-color-fix/REPORT.md。当前 localhost:3142 保持运行，使用 .next-header-fix 构建。
