# PianoGrid Chords v2 — B3 结果

执行日期：2026-09-11  
作用域：`/chords`、`/chords/a-minor`、`/chords/a-major`、`/chords/c-major`  
综合状态：**PASS_WITH_NOTES**

## 结论

[已核实] B3 范围内的理论补缺、三个详情页共六个原位单手指法案例、一个复用的网页键盘构成练习、来源说明和四页内链均已落地。四页继续使用 B1/B2 的主题、页面骨架、Header/Footer、URL、metadata/canonical、响应式方向和统一详情模板。没有新增依赖、URL、谱表、Schema、登录或输入设备能力；没有提交、推送或部署。

[已核实] 工程与内容目标已经完成，生产构建及范围内浏览器验证通过。人耳、真机、真实读屏、实体打印、PDF 标签无障碍以及 PianoGrid 这套具体指法呈现的独立专业审阅尚未执行，因此不把本轮写成无备注的 PASS，也不代表已授权发布。

## B2 最小前置核查

| 项目 | 结论 | 依据与动作 |
|---|---|---|
| 数据与打印 | 可以复用 | [已核实] B2 已覆盖三详情的音符、三个排列、最低音、音频和打印一致性；B3 完成后又以当前生产构建跑过 Am 167/167、B2 40/40、和弦批次 251/251。A major 屏幕用 `C♯`，打印保留来源中的等价 ASCII `C#`，MIDI 未改变。 |
| 初始 HTML | 可以复用并补强 | [已核实] B2 检查的是无 JS DOM 节点。B3 最终又保存四页 raw response 与无 JS `html.outerHTML`，并用节点定位检查理论、指法、来源、练习、静态答案和真实链接。 |
| 并行改动 | 未发现 B3 阻断 | [已核实] 起始 HEAD 为 `dd1b8849cd4c303c9ddebfe794758aa14354f507`，工作区本来已有大量 B1/B2、站点导航、歌曲与发布检查改动。本轮没有 reset、clean、stash 或回退这些内容；最终清单保留 dirty 状态。 |
| B3 数据承载 | 范围内可扩展 | [已核实] `ChordDetailModel` 已能把案例稳定 ID、voicing、手别、有序实际音高、指号、来源和限制绑定到一起；练习答案直接取当前 chord/root voicing。没有为七和弦或未来页面重写引擎。 |

前置结论：**可以开始**。未发现需要改主题、URL、依赖或删除正确内容的阻断问题，也没有先行修改错音或 PDF。

## 四页实际结果

### `/chords`

[已核实] 保留 19 个真实 major/minor 项目、根音筛选、类型筛选、组合筛选、清除、无匹配、试听、单项/集合打印及原 PDF。读图章节补充了：

- 根音与和弦类型的职责；
- 大/小三和弦第三音的差别；
- 音名、音级、八度号和指号的区别；
- 原位与转位；
- 左右手指法是具体排列的演奏案例，不是新的和弦类型。

[已核实] “Next” 区增加三个真实锚点：Am、A major、C major 的 `#practice`；没有生成新路由或空入口。

### `/chords/a-minor`

[已核实] 原答案、找键步骤、三个转位、最低音、minor-third 解释、与 A major 的对比、原文字练习、FAQ、播放、打印/PDF 与相关链接全部保留。新增 Am 原位左右手案例和交互练习。新指法位于转位表后，新练习位于原文字练习后，两个章节均进入页内目录和本页搜索。

### `/chords/a-major`

[已核实] 原页面自身的 C♯ 拼写、键位说明、三个转位和符号全部保留；现有 Am 对比链接保留。新增 A major 原位左右手案例和同一练习组件，正确答案仍从页面模型的 A–C♯–E 取得。

### `/chords/c-major`

[已核实] 原 C–E–G、三个转位、现有 Yamaha 右手来源正文、播放和打印/PDF 保留。新增：

- C major chord 的三个 pitch classes 与 C major scale 七个音的区别；
- scale degree 与 finger number 的区别；
- C major 与 Am 在明确示例中共享 C、E，但仍是不同和弦；
- C major scale 与 Am 的真实内链；
- 左手原位案例和复用练习。

## 保留、位置与纠正

| 动作 | 结果 |
|---|---|
| KEEP | [已核实] B1/B2 的主题、排版方向、Header/Footer、四个 URL、metadata/canonical、正文、三转位、键盘、播放/停止、切换取消、搜索/目录、打印/PDF、无 JS 参考全部保留。 |
| POSITION | [已核实] 指法紧随转位说明；交互练习紧随原有静态练习或参考说明；来源范围留在指法模块；hub 的练习入口留在现有 next section。 |
| ADD | [已核实] 理论补缺、六个指法案例、来源映射、一个复用练习及真实内链。 |
| CORRECT | [已核实] 选中白键不再覆盖相邻黑键标签；Am 旧回归中“不得有指法控件”的 B2 期待改为 B3 的“两种单手选择”约束；Foundation 白名单加入本轮必要组件和 CSS。 |
| REMOVE | [已核实] 没有删除业务内容、现有能力、主题规则或静态 PDF。 |

## 六个指法案例与来源

| 案例 ID | 和弦 / voicing | 手别 | 本站有序实际音高 → 指号 | 状态 / 来源 |
|---|---|---|---|---|
| `a-minor--root--right` | Am / `a-minor--root` | right | A3–C4–E4 → 1–3–5 | 已核实并作音区适配；[Skoove: A minor](https://www.skoove.com/en/tools/piano-chords/a-minor) |
| `a-minor--root--left` | Am / `a-minor--root` | left | A3–C4–E4 → 5–3–1 | 已核实并作音区适配；同上 |
| `a-major--root--right` | A / `a-major--root` | right | A4–C♯5–E5 → 1–3–5 | 已核实并作音区适配；[Skoove: A major](https://www.skoove.com/en/tools/piano-chords/a-major) |
| `a-major--root--left` | A / `a-major--root` | left | A4–C♯5–E5 → 5–3–1 | 已核实并作音区适配；同上 |
| `c-major--root--right` | C / `c-major--root` | right | C4–E4–G4 → 1–3–5 | 已核实并作音区适配；[Skoove: C major](https://www.skoove.com/en/tools/piano-chords/c-major) 与 [Yamaha / Jerry Kovarsky](https://hub.yamaha.com/keyboards/k-how-to/basic-piano-chords-for-beginners-part-1/) |
| `c-major--root--left` | C / `c-major--root` | left | C4–E4–G4 → 5–3–1 | 已核实并作音区适配；Skoove C major |

[已核实] 三个 Skoove 页面分别明确列出对应原位音名和右手 1–3–5、左手 5–3–1，并显示由 composer/music educator Matthew Dickman 审阅。Yamaha 文章支持 C major 右手原位 1–3–5 的既有记录。

[已核实] 这些来源不指定 PianoGrid 当前页面的具体八度。页面和数据把“来源支持的有序 pitch classes + 指号”与“本站现有且已通过 MIDI/打印校验的 root voicing 音区”明确分开，状态为 `source_verified_with_octave_adaptation`。每个案例同时写明：仅为单手、近距离原位三和弦的起始示例；手型和语境可能需要其他指法；不推广到转位。

[已核实] 切到第一或第二转位时，原位数字会消失并显示局部说明；音名、键盘、播放与打印仍跟随当前转位。切回原位时恢复用户已选的手别。

## 复用练习的真实行为

[已核实] 三个详情页使用同一个 `ChordBuilderPractice`，正确答案由当前页面 root voicing 的 MIDI pitch class 与 chord spelling 生成，没有维护第二份答案常量。

| 行为 | 结果 |
|---|---|
| 范围 | 一组 C–B 的十二音 pitch-class 键盘；题目明确不评分指法、顺序、八度或真实演奏。 |
| 选择 | 键盘按钮可选择/取消，`aria-pressed` 表达状态；重复点击同一键会确定性切换。 |
| 检查 | 分别反馈正确、具体缺音、具体多音、同时缺/多和空选择；不只依靠颜色。 |
| 重试 | 清空练习选择与旧反馈，不重置主转位。 |
| 看答案 | 显示当前和弦的三个 pitch classes，并明确“未记为答对”。 |
| 再编辑 | 任何键位变化都会清除旧判定，需再次检查。 |
| 等音 | 键位按 sounding pitch class 判断；标签显示 `C♯ / D♭` 等等音说明，成功文案仍用当前和弦的正确拼写。 |
| 状态隔离 | 练习不更改主工作区 voicing、播放、URL 或打印快照。 |
| 无 JS | 初始按钮禁用；原生 `details` 保留题目说明和静态答案。 |

## 验证

| 检查 | 结果 | 证据 |
|---|---|---|
| `npm run check` | [已核实] Foundation 565/565，TypeScript exit 0，Tailwind/CSS 检查通过 | [project evidence](evidence/b3/) |
| `node scripts/check-content-adapters.mjs` | [已核实] 16/16；三详情定义、六案例、来源解析、练习绑定和失败路径通过 | [adapter-validation.json](evidence/b3/adapter-validation.json) |
| `node scripts/check-integration-data.mjs` | [已核实] 153/153 | [data-validation.json](../../checks/batches/07-site-integration/data-validation.json) |
| 隔离 `npm run build` | [已核实] exit 0；Next.js 16.3.4；22 个静态输出；`.next-b3` 与开发服务 `.next` 分离 | [isolated-build.json](evidence/b3/isolated-build.json) |
| B3 生产浏览器 | [已核实] 71/71；六指法、转位清除、练习所有状态、hub 筛选、四页 initial DOM、metadata/canonical、手机和 200% 无页面级横溢出 | [b3-validation.json](evidence/b3/production-browser-final/b3-validation.json) |
| 既有 Am 回归 | [已核实] 167/167 | [page-validation.json](evidence/b3/a-minor-regression-final/page-validation.json) |
| B2 详情回归 | [已核实] 40/40 | [b2-validation.json](evidence/b3/b2-regression/b2-validation.json) |
| 和弦批次回归 | [已核实] 251/251 | [page-validation.json](evidence/b3/chord-regression/page-validation.json) |
| `git diff --check` | [已核实] exit 0；只有既有换行符转换警告 | 命令输出 |
| lint | [已核实] NOT_CONFIGURED；`package.json` 没有 lint script，未临时安装依赖 | `package.json` |

[已核实] 全站旧 `check-integration-batch.mjs` 在活动开发服务上得到 187 passed / 2 failed：一条是首页 H1 的旧 `textContent` 空格期待，另一条是在声音已结束、Stop 已禁用后仍等待点击而超时。两条均不属于四页 B3 内容；当前生产构建的 B3、Am、B2 和 chord-batch 中对应四页的播放/停止、数据、打印及 DOM 检查均通过。本轮按授权没有修改首页或扩大到全站测试重构。

## 截图与 HTML

[已核实] 已实际查看四页桌面和手机全页截图，以及指法与答案状态局部截图。最终证据目录：

- [production-browser-final](evidence/b3/production-browser-final/)：四页 1440px / 390px 全页截图、三详情指法与练习局部图、四页 raw HTML、四页无 JS DOM；
- [chord-regression](evidence/b3/chord-regression/)：既有多视口、三详情打印和 hub 打印回归；
- [a-minor-regression-final](evidence/b3/a-minor-regression-final/)：Am 既有功能回归。

## 本轮实现文件

[已核实] B3 直接涉及：

- 数据与校验：`src/lib/a-minor-types.ts`、`src/lib/a-minor-content.ts`、`src/lib/chord-content.ts`、`src/lib/chord-detail-model.ts`、`src/lib/chord-learning-content.ts`；
- UI：`src/components/a-minor/experience.tsx`、`src/components/chords/detail-page.tsx`、`center-page.tsx`、`center.css`、`fingering-guide.tsx`、`chord-builder-practice.tsx`、`chord-learning.css`；
- 检查与构建隔离：`scripts/check-content-adapters.mjs`、`scripts/check-a-minor.mjs`、`scripts/check-foundation.mjs`、`scripts/check-chord-b3.mjs`、`next.config.ts`、`evidence/b3/run-isolated-build.cjs`。

[已核实] Next 隔离构建曾自动把 `tsconfig.json` / `next-env.d.ts` 指向 `.next-b3`；这些自动改动已恢复为原 `.next` 配置。现有 3000 开发服务未停止，最终生产验收使用 3100 端口。

## 未交付与人工待测

- [已核实] 谱表继续沿用 B2 暂缓结论；未添加假谱表、图片谱或第三方素材。
- [已核实] 未生成新 PDF；旧 PDF 的范围文案保持准确，网页练习选择不会进入打印。
- [已核实] 未执行人耳试听、iPhone Safari 真机、真实读屏、实体打印或 PDF 标签无障碍测试。
- [已核实] 尚未取得一位独立钢琴教育者对 PianoGrid 当前音区适配、措辞和控件呈现的直接审阅；外部来源的具名审阅不等于审阅了本站实现。

## 分维度结论

| 维度 | 状态 | 说明 |
|---|---|---|
| 工程 | PASS | [已核实] 数据、渲染、交互、初始 HTML、隔离构建和范围内回归通过。 |
| 内容 | PASS | [已核实] 六个目标案例均有对应和弦页面来源，支持范围与本站音区适配分开记录；理论和连接目标完成。 |
| 人工验收 | NOT_RUN | [已核实] 人耳、真机、读屏、实体打印、PDF 标签与本站指法呈现的独立专业审阅未执行。 |
| 综合 | PASS_WITH_NOTES | B3 可作为第二步的输入基线；不自动开始第二步，也不表示已批准提交或部署。 |

