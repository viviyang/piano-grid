# 五个和弦详情接入结果

执行日期：2026-09-11  
基准提交：`dd1b8849cd4c303c9ddebfe794758aa14354f507`  
结论：`PASS_WITH_HUMAN_GATES_OPEN`

## 实际接入范围

[已核实] 本轮只注册并生成以下五个既有规划 URL：

- `/chords/g-major`
- `/chords/c-minor`
- `/chords/e-major`
- `/chords/b-major`
- `/chords/a-flat-major`

[已核实] 每页都通过同一个 B3 详情模板输出 Title、Description、canonical、H1、直接答案、三种位置、键盘图、播放、根位左右手指法、FAQ、来源、单一 `#practice`、实时打印和固定三位置 PDF。C minor 使用 minor 质量、`1–b3–5` 和 minor-third 半音关系；其余四页使用 major 质量与 `1–3–5`。

[已核实] 新页 metadata 的 Title/Description 来自合并后的 raw page metadata；H1、直接答案、C4–C6 范围及 PDF 标签来自 `adapter-bindings.json`。旧 A minor、A major、C major 继续使用 B3 原有 effective metadata，未套用新页覆盖逻辑。

## 最小合并与保护结果

[已核实] `page-content.master.json` 仍有 127 个 page 对象。逐对象 SHA-256 比较表明，只有上述五个 page 对象改变；`/chords/c-flat-major` 与其余 122 个对象未变。明细见 `before.json` 与 `after.json`。

[已核实] `/chords`、`/chords/a-minor`、`/chords/a-major`、`/chords/c-major` 均保留：三个旧详情的完整解析模型哈希与实施前完全相同；Hub 仍为原顺序的 19 个对象，去除 URL 字段后的对象核心哈希仍为 `6b28f9942fd7e78b8ffa22290fc296450a388223887cd1ec23fdbfa7062f280b`。Hub 只把五个既有对象的 `url:null` 改为真实详情入口，因此可进入的详情对象从 3 个增加到 8 个，没有把 19 个对象误算成 24 个。

[已核实] 代码改动限于：五页数据的定向 master 合并、五个学习对象的数据模块、受控详情路由 union/adapter、五个 route 文件、五对 PDF/SVG 公开资产，以及相应白名单和集中验证脚本。未升级或新增依赖，未改站点主题，未添加五线谱面板、第二套练习、根音页、类别页或系统功能页。

[已核实] 生产构建自动写入的 `.next-chords-next` TypeScript 引用已恢复为构建前的 `.next` 配置；`next-env.d.ts` 与 `tsconfig.json` 当前没有这次隔离构建造成的 git diff。见 `generated-file-restoration.json`。

## 内链与页面发现

[已核实] Hub 按原对象顺序提供 C major、A minor、G major、A major、E major、B major、C minor、A-flat major 八个真实详情入口；C-flat 仍无入口。

[已核实] 新页都保留回到 `/chords` 的真实链接，并从内链计划选择了以下已注册目标：

- G major：C major、C major scale、当前页练习。
- C minor：C major、A-flat major、当前页练习。
- E major：A major、A minor、B major、当前页练习。
- B major：E major、当前页练习。
- A-flat major：A major、C minor、当前页练习。

[已核实] `#practice` 在发布前分别校验 pathname 与 fragment；最终 raw HTML 中为普通可抓取 `<a href>`。未发布目标不显示 CTA。

## 交互行为

[已核实] 三个位置共用同一份 voicing 数据；切换位置会同步最低音、音名顺序、键盘高亮、播放事件与实时打印快照。固定 PDF 始终是三位置参考，与“Print this position”分开。

[已核实] 根位可在右手 `1–3–5` 与左手 `5–3–1` 示例之间切换。切到任一转位时隐藏根位指法，并显示未提供转位指法的说明；没有把来源扩展为未验证的精确八度或全转位指法。

[已核实] 练习只检查三个无序 pitch class，且目标从当前和弦数据派生；没有复制第二个 `#practice`。无 JavaScript 时，主要正文、初始图、三位置、FAQ、来源、内链与 PDF 仍在服务器 HTML 中，按钮明确保持禁用并展示静态答案。

## 验证结果

| 检查 | 结果 | 证据 |
|---|---:|---|
| 内容包 validator | 1098 / 1098 | `07_validation/validate-content.py` 的本轮实际输出 |
| `npm run check` | PASS | Foundation 565 / 565；TypeScript PASS；Tailwind/CSS PASS（22 条授权路由） |
| adapter/data | 22 / 22 | `adapter-validation.json` |
| 新五页 production browser | 95 / 95 | `new-pages/validation.json` |
| B3 旧页/Hub 回归 | 71 / 71 | `b3-regression/b3-validation.json` |
| B2 旧页回归 | 40 / 40 | `b2-regression/b2-validation.json` |
| 隔离 production build | PASS，27 个静态页面 | `build.log` |

[已核实] 新五页浏览器验证覆盖：HTTP、Title/Description/canonical、raw HTML、H1/直接答案、音名/MIDI、三位置、FAQ、来源、内链、唯一 ID、无 JS、五份 PDF、左右手根位指法、转位隐藏、当前打印、练习、播放、390px、200% 重排、Hub 19 对象、sitemap 与未发布 URL 404。

[已核实] 初次 A-flat 200% 检查的 14px 溢出来自 Chrome `fullPage` 截图对滚动条占位的持续副作用；同页未截图时为 390/390。验证脚本改为先测重排、后截图，复跑五页为 95/95。没有为测试伪影修改业务 CSS。

[已核实] 桌面和手机截图及 raw HTML 位于 `new-pages/`。抽查 C minor 桌面与 A-flat major 手机长页后，页面继续使用当前蓝灰 PianoGrid 主题，正文、工具、指法、FAQ、练习与下载区未出现截断或换色。

## 保留材料与未开放项

[已核实] `/chords/c-flat-major` 未注册、未进入 sitemap、未复制公开 PDF/SVG、Hub 无可点击入口，并返回 404。原因是原位双手指法来源门槛仍未解除；本轮没有伪造指法补齐它。

[已核实] `/chords/by-key`、`/chords/finder`、`/chord-progressions`、`/guide/piano-chords`、`/keyboard-notes/finger-numbers` 只保留材料，均未注册且 production HTTP 返回 404。本轮没有实施识别引擎或进行播放器。

[已核实] 以下人工门禁未执行，状态保持开放：人耳听音、真实手机/平板、读屏、实体打印、PDF 标签无障碍，以及对八度适配指法的独立专业复核。程序验证没有把这些项目记为通过。

[已核实] 本轮没有 commit、push、部署或修改正式站点。
