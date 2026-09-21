# C-major design-system correction

> 最新截图反馈调整见 [REVISION.md](./REVISION.md)。以下保留首轮实施与验证记录；默认展开、布局与设置弹层以本轮记录为准。

状态：**READY_FOR_REVIEW（本地实现可审阅；不是发布批准或完整视觉／人工验收通过）**。

2026-09-21。基于实时核对并 fetch 的 `origin/main`：`f58a4ab9b979a803d7aaf6fc65e58e6408f7a0fe`。分支 `codex/c-major-design-correction`，工作区 `C:/Users/Admin/Documents/viviyang_github/piano-cfix`。当前原目录 `piano` 及其未提交内容未作修改。未 commit、push、部署或改变索引／域名。

## 本地查看

- 已运行的生产模式预览：<http://localhost:4327/chords/c-major>。
- 从此工作区重新启动：PowerShell `$env:PIANO_NEXT_DIST_DIR='.next-cfix-build'; npm run start -- --port 4327`。构建命令：`$env:PIANO_NEXT_DIST_DIR='.next-cfix-build'; npm run build`。
- 开发预览：`npm run dev -- --port 3127`，<http://localhost:3127/chords/c-major>。
- 改前：`before-1440.png`、`before-390.png`。实施中已人工查看的改后：`after-1440.png`、`after-390-review.png`（390 CSS px 视口的全页截图，图像排除滚动条）。
- **截图限制**：以上改后图来自开发模式审阅阶段；手机图早于最终黑键音名分行调整。最终生产构建的 1440×900 截图连续两次在浏览器工具内超时，已停止重复截图路径。未取得最终构建完整桌面／手机截图，不能将开发阶段图称为最终视觉验收证据。生产 DOM、计算样式和交互另有实际验证记录。

## 改动与组件复用

- `src/app/chords/c-major/page.tsx`：唯一显式 `pilot` 开关，路由和 metadata 生成保持原样。
- `src/components/chords/detail-page.tsx`：保留原有内容渲染；试点复用同一指法组件，并从已有 `getChartData()` 取谱表坐标；原文、来源、内链和全部既有 ID 保留。
- 新增 `src/components/chords/c-major-experience.tsx`、`c-major-pilot.css`：查阅／练习同一键盘；单一展开面板；声音设置、分享、打印、帮助记录与 Resume；仅 `.cp-pilot` 样式生效。
- `src/components/a-minor/keyboard.tsx`、`chords/keyboard-viewport.tsx`：可选输入接口；沿用琴键几何和 C4–C6 音域，静态与打印调用保持原路径。目标、正在按下／发声、练习选择、检查结果分别表达。
- `src/lib/a-minor-audio.ts`：同一 ReferenceAudio 增加按音来源的持音、延音、停止清理；取消旧播放时完成其等待 Promise。未创建第二个音频引擎。
- 新增 `src/lib/chord-pilot-practice.ts`：复用 `keyboard-practice.ts` 的 independent／assisted／revealed 分类，试点保存 wrong、hint、reference、reveal 原因。Clear／Retry 不清除帮助记录；重新练习不冒充独立答对。
- `src/components/chords/fingering-guide.tsx`：可选基础手指编号 SVG；原位左右手继续使用已有来源与八度适配记录，没有新增转位指法。左右手切换不改变音高。
- `src/components/a-minor/experience.tsx`：仅导出现有 PrintContext，供试点复用 PrintActions；原页面实现保留。
- 新增 `src/components/ui/button.tsx`：按 shadcn new-york Button 源码适配已有 `.am-button` 的 default／secondary／ghost 变体，无新按钮外观。来源及许可证见 `COMPONENT-SOURCES.md`、`SHADCN-LICENSE.md`。
- 本次同意的依赖例外：新增 `class-variance-authority@0.7.1`、`@radix-ui/react-slot@1.3.3`，及其传递依赖 compose-refs；已有依赖版本未升级。
- 直接复用 `ui/collapsible`、`ui/dialog`、`keyboard-notes/share-control`、`keyboard-notes/staff-diagram`、PrintActions／PrintVoicing／SiteHeader／SiteFooter。转位与手别保留现有原生 radio；音量和开关采用有 label 的原生 range／checkbox，不手写复杂焦点机制。
- `scripts/check-foundation.mjs` 仅逐项增加本轮 3 个组件／样式文件白名单。新增 `check-c-major-pilot.ts`、`check-c-major-boundaries.mjs`。旧检查产物已另存本目录，历史报告及框架自动生成配置已恢复原状态。

已核实：全局 CSS、tokens、foundation、主题入口、旧 ui 视觉定义、导航、品牌、容器、只读参考和公开 URL 集合保持不变。Button、分段、面板、H1 的字体、前景／背景和圆角与浏览器改前基线逐值相同。钢琴厚度效果仅由现有琴体色与透明度混合表达。

## 实际执行的验证

| 检查 | 实际结果／证据 |
|---|---|
| `npm run check` | 通过：Foundation 568 项、typecheck、CSS 编译。`check-final.log`、`foundation-validation.json`、`css-validation.json` |
| `node --experimental-transform-types scripts/check-c-major-pilot.ts` | 19 项通过。音级判定、八度、错误／提示／揭晓历史、多来源持音、延音、Stop、取消队列、卸载、失败和音频所有权。`unit-results.json` |
| `node scripts/check-c-major-boundaries.mjs` | 78 项通过。`boundaries.json` |
| `npm run build`（独立 distDir） | 最终代码构建退出码 0，日志 `build-verified.log`。中间构建日志另行保留，不替代最终结果 |
| 恢复自动生成配置后 `npm run typecheck` | 通过，`typecheck-clean-config.log` |
| `git diff --check` | 通过 |
| `node scripts/check-integration-data.mjs` | **129 通过、23 失败**。全部失败为 Windows CRLF 检出字节与旧哈希台账不同；Git 原始文件逐项仍与台账匹配，且与当前文件仅差 CRLF。未更改只读文件或放宽检查。`integration-data.log`、`legacy-integration-data.json`、`boundaries.json` |

实际 Tabbit 浏览器验证：

- 默认面板关闭，播放／Stop、切转位、手别和指法缺失、谱表同步、单面板展开、键盘按下／释放；错误后改正、Hint、Show answer、Retry、返回参考、Resume 保留记录：`browser-interactions.json`。
- 声音设置、音量与延音持久于关闭面板、焦点返回、同音鼠标＋键盘共同持有及分别释放、window blur 清理；分享复制；原 PDF 响应；打印媒体样式与当前转位快照：`browser-settings-print.json`。这是浏览器打印样式／快照检查，不是实体打印。
- 音频不可用注入后，仍可完成跨八度的无帮助首次正确答案，Tab 可离开键盘：`browser-audio-unavailable.json`。
- TDH、canonical、全部原 ID、SSR 折叠正文、控件计算样式、320／390／768／1440px 无整页溢出：`browser-content-layout.json`。直接 hash 和再次点击同一 hash 的搜索结果均实际验证可以展开并定位对应内容。
- A-major、C-major scale、Keyboard Notes、首页在桌面／手机的代表性回归，无试点标记和整页溢出；A-major 原音频可播放／停止，无捕获到的 pageerror：`browser-regression.json`。
- 最终生产构建实际 HTTP 页面：保留 index,follow 和原 canonical，25 个主键、面板默认关闭；逐音播放切转位取消、首次无帮助答对：`production-smoke.json`。

## 未通过、未执行与人工项

1. **原有页头文字放大问题**：1440px 将根文字放大到 200% 时整页 scrollWidth 为 1911，溢出来源是冻结的共享页头；C-major 主内容右边界仍在视口内。未启用试点的 A-major 得到完全相同的 1911px 与页头边界，已确认是原有问题。本轮未越界修改页头，不能声称全站 200% 文字验收通过。
2. **最终构建截图未齐**：如上所述，截图工具连续同因失败后停止；保留已有图及明确验证边界。工具曾出现定位、跨运行环境对象比较、异步状态读取和导航超时；纠正测试方式后通过的结果才写入上述成功记录。
3. 未直接执行旧 `check-integration-batch.mjs`、`check-integration-production.mjs` 的独立 Chromium 全量脚本；本轮浏览器由 Tabbit 统一执行上述定向用例和代表性回归，未声称等同于旧脚本全站通过。package.json 没有独立 lint／test 命令。
4. 真机多点触摸、扬声器／耳机听感、真实读屏、实体打印、系统原生分享面板、PDF 无障碍及具名音乐专业审阅未执行。没有把模拟音频节点或浏览器状态验证称为听音通过。

## 保留功能与审阅重点

- 查阅：原音符、转位、低到高顺序、最低音、理论、来源、相关链接和 PDF 保留；默认查阅 SSR 提供全文。无 JavaScript 时提供可见的静态折叠内容降级。
- 练习：保持三音级构建题，顺序／八度不评分；目标／指法／谱表／答案正文在练习时从可见与无障碍树隐藏。主动返回参考记帮助；查看答案不算独立答对；不跳题、不新增跳转参数协议。
- 打印、PDF、分享：打印选中转位；下载原始 PDF；分享正式规范 URL，不包含练习答案／成绩。
- 可直接在本地预览审阅琴体观感、折叠布局和练习流程。此次 READY_FOR_REVIEW 不解除任何原有人工发布门禁。
