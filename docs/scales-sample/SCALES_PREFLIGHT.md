# PianoGrid Scales sample preflight

执行时间：2026-09-11（Asia/Shanghai）  
起始 HEAD：`dd1b8849cd4c303c9ddebfe794758aa14354f507`  
分支：`codex/chords-b1`

## 结论

**可以开始 STEP_1 样板。** [已核实] 方案包 `2026-09-11-PLAN-1` 的 manifest 所列文件全部存在且 SHA-256 一致；当前仓库仍有三条目标路由、60 个可选对象、T11/T12 数据链、共享键盘/谱表与可取消音频接口。未发现需要改 URL、主题、Header/Footer 或依赖的阻断。

## 当前真实链路

[已核实] `docs/content/site-master/page-content.master.json` → `src/lib/site-content.ts::readAuthorizedPage()` → `src/lib/scale-content.ts::{getScalePage,getScaleCenter,getScaleDetail}` → `ScalePageModel/ScaleOption` → T11/T12 固定页面与 `ScaleReference` → staff / keyboard / audio / print。

[已核实] 当前 authoring 输入是 master 中三个页面对象及其共享 sources；`ScaleOption`、`ScalePitch.staff`、键盘 key 列表和打印 props 都是 adapter/runtime 派生结果，不是维护入口。

## Dirty 与文件所有权

- [已核实] 工作区开始时已有大量 Chords、Songs、发布检查及图标改动；本轮不 reset、clean、stash 或覆盖。
- [已核实] 共享 master 已 dirty，但三个 Scales 页面对象与相关既有 source records 相对 HEAD 哈希均未变；现有 diff 位于 Chords 页面区域。可按 Scales key/source record 做最小合并，禁止整文件回写。
- [已核实] 本轮只读共享文件及起始 SHA-256：`src/lib/a-minor-audio.ts` `03c8577a…e670`；`src/app/layout.tsx` `e7e4f2ca…305`；`next.config.ts` `450d8d6f…2d7`；`src/app/chords/a-minor/a-minor.css` `89a6b9b9…5db`；`src/lib/site-routes.ts` `9f9dbbe4…8bb`。
- [已核实] 主题基线未 dirty：`tokens.css` `311c4cf9…2eb`、`foundation.css` `80452a08…aec`、`globals.css` `47625b5d…2be`。
- [已核实] B3 报告状态为 `PASS_WITH_NOTES`，没有提交或部署；人耳、真机、真实读屏、实体打印、PDF 标签无障碍与独立专业审阅均仍 `NOT_RUN`。本轮只复用共享接口，不重审 Chords。

## 可复用证据与必要纠正

- [已核实] 相同 HEAD 的 Intake 已记录三页默认加载、源码依赖和主题；实现改变后的视觉/DOM/打印证据必须重新取得，旧截图不冒充同版。
- [已核实] 当前 A natural descending 两手指法仍为 `null`。方案包 M01 第 2 页 A 行给出 RH `5-4-3-2-1-3-2-1`、LH `1-2-3-1-2-3-4-5`；只把该证据补到 natural minor，RH 明示高一八度展示适配。
- [已核实] harmonic/classical melodic descending 四行继续 `null`；classical melodic 实际下降序列已独立存在，不能由 ascent reverse。
- [已核实] 当前旧检查脚本仍断言所有 A-minor descending 指法为 `null`、master 与旧 batch 字节等价；实现后需要将这些断言改为精确批准差异，而不能删去保留检查。

## 真正阻断

无。PDF 若现有 bundled runtime 缺少生成或渲染工具，只阻断两份静态资产，不阻断其余样板；不得为此新增项目依赖。
