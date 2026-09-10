# 06-blank-sheet 独立验收报告

日期：2026-09-10  
结论：**PASS_WITH_NOTES**

## 范围与冻结确认

- [已核实] 唯一待验收批次是 `06-blank-sheet`；本次仅覆盖 `/tools/blank-sheet-music`（T19 / P079）。`/`、`/tools`、`/sheet-music`、其他工具和 07 路由均保持未创建；生产验证对未授权路由返回 404。
- [已核实] 当前工作区 HEAD 为 `29d9c472fbc675ab6a5e39d7d9ad4cd721c6c232`。`checks/batches/06-blank-sheet/changed-files.json` 的 25 个 `after` SHA-256 均与现存文件一致；本审查未改动产品源码、内容、样式、依赖、锁文件、规则或进度表。
- [已核实] `docs/workspace-context.md` 不存在；这是项目文档缺项，不影响本批 T19 功能或本次验收范围，且按只审查权限未补写。

## 交付核对

- [已核实] 页面服务端只读取白名单中的当前 URL，核对 T19、P079、`get,use` 内容区块、无账号、两份 PDF、六组空白大谱表、五线与高低音谱号约束；客户端模型不携带总台账。
- [已核实] 初始选择为 US Letter；A4 选择会同步更新预览标题、区域可访问名称、打印链接和“下载所选 PDF”链接。两种格式的独立下载始终可用。
- [已核实] In-app Browser 在 390px 实测：A4 单选项被选中后主操作目标为 `/reference/assets/blank-piano-staff-a4.pdf`；150% 预览在局部滚动区横向溢出、页面本身不溢出。该结果记录在 `independent-observations.json`。
- [已核实] Letter 和 A4 公共文件分别为 45,614 与 45,738 bytes，响应均为 `application/pdf`，并与授权源文件 SHA-256 字节一致。
- [已核实] 两份 PDF 均为单页、未加密、纵向；Poppler 150dpi 渲染和人工目视均显示六组高低音大谱表、共 60 条完整五线，四周无裁切或遮挡。渲染图见 `pdf-render/`。

## 独立测试

| 检查 | 结果 | 产物 |
| --- | --- | --- |
| 隔离副本 `npm run check` | PASS：Foundation 560/560；TypeScript、真实 Tailwind v4 编译通过 | `machine/foundation.json`、`machine/tailwind-compile.json` |
| 数据、来源、白名单、公开资产字节一致性 | PASS：119/119 | `machine/data-validation.json` |
| PDF 页面规格、渲染与边距 | PASS：20/20 | `machine/pdf-validation.json`、`pdf-render/` |
| Next 生产构建 | PASS：15 条授权业务路由和 `/_not-found` | 本报告的实际命令记录 |
| 生产路由、noindex、资产、禁用路由与响应式 | PASS：58/58 | `machine/production-validation.json`、`screenshots/production-*` |
| A minor 共享代码短回归 | PASS：162/162 | `machine/a-minor-regression.json` |
| 当前批浏览器行为脚本 | 59/60；见以下备注 | `machine/browser-validation.json`、`screenshots/blank-sheet-*` |

## 备注

### [P2] 浏览器验收脚本对缩放状态存在时序性假阴性

- [已核实] 本次独立运行 `check-blank-sheet-batch.mjs` 的唯一失败是 `Zoom creates local preview overflow`，结果为 59/60。
- [已核实] 同一生产构建中，In-app Browser 以真实控件设为 150% 后，`scrollWidth > clientWidth`、`document.documentElement.scrollWidth <= innerWidth`，且可访问名称更新为 150%；因此该失败不支持“缩放功能未交付”的结论。
- [推断] 断言紧接 range `fill()` 执行、未等待受控 React 状态提交，是本次假阴性的最可能原因；依据是随后独立 UI 状态和 DOM 度量均与期望一致。应在下一次获授权的开发/修复中使该测试等待状态值或预览尺寸已更新，再恢复全绿自动化验收。

## 未测试

- [未测试] 浏览器原生打印对话框、实体打印、真机触控、屏幕阅读器人工长流程、部署均未执行；本地 PDF 与浏览器自动化不能替代这些项目。

## 产物清单

- 机器结果：`machine/`
- PDF 渲染：`pdf-render/`
- 浏览器截图：`screenshots/`
- 人工交互与冻结观察：`independent-observations.json`

本结论不授权进入 07 或部署；下一步如接受该 P2 备注，由开发对话仅稳定浏览器断言后再申请复验，或由用户明确授权下一批。
