# Actual authoring and rendering contract

## 真实链路

```text
docs/content/site-master/page-content.master.json
  pages["/scales" | "/scales/c-major" | "/scales/a-minor"]
  + master.sources
→ src/lib/site-content.ts
  readMaster() / readAuthorizedPage(url), PUBLIC_ROUTES 授权门
→ src/lib/scale-content.ts
  getScalePage() 块顺序校验
  getScaleCenter() / getScaleDetail() adapter
  spelling → MIDI → staff、来源 scope、公开详情链接过滤
→ src/lib/scale-types.ts 中的 ScalePageModel / ScaleOption / ScalePitch
→ src/components/scales/pages.tsx
  ScaleCenterExperience / ScaleDetailExperience / ReadingSection / DataTable
→ ScaleReference
  音符行、半音步、指法表、StaffDiagram、KeyboardDiagram、来源
→ use-scale-audio.ts → a-minor-audio.ts（Web Audio）
  以及 window.print() + sc-print-only + @media print
```

## 哪个文件可维护

- [已核实] 运行时直接读取的可维护输入是仓库 `docs/content/site-master/page-content.master.json`；页面对象按 URL 键索引，来源在同文件 `sources`。
- [已核实] `docs/content/site-master/A-Scales/batch-page-content.json` 是 26 个 Scales/Arpeggios 内容对象的原批次材料；当前运行时代码没有直接读取它。
- [推断] 批次文件是 master 的上游交付材料而非运行时单一真源；依据是内容索引说明和 `site-content.ts` 的实际文件读取。仓库未提供本轮可见的“从 batch 自动重建 master”命令，因此不要把该推断写成已核实生成链。
- [已核实] `ScaleOption` 等是 adapter 生成后的页面 props/model，不是独立 authoring JSON；`ScalePitch.staff` 与通用中心项的实际八度可由 TypeScript 函数生成。

## 真实字段覆盖

| 需求 | 当前字段 / 处理 | 状态 |
| --- | --- | --- |
| 主音与拼写 | `tonic`、`notes_*`、`forms[*]`、`spelling/note/written_octave` | [已核实] 支持；拼写与 MIDI 会交叉校验 |
| 类型/形式 | `scale_type`、`default_form`、`forms[*].id`；TS union 4 项 | [已核实] 支持当前四类 |
| 音级/步长 | 中心 `scale_degrees`、`form_comparison`；详情 `intervals` / `ascending_semitone_steps` | [已核实] 支持 |
| 有序实际音高 | C major `pitch_sequences`; A minor `forms[*].pitch_mapping`; `midi` + octave + key color | [已核实] 支持两个详情；中心其他选项由 notes 生成 |
| 上下行与范围 | 独立 ascending/descending 数组；C `display_register/renderer_payload`，A `approved_playback_octaves/print_and_audio` | [已核实] 当前 UI 固定一八度；没有通用 range selector |
| 指法案例 | C `fingering.RH/LH.ascending/descending`; A 各 form 的 hand/direction arrays | [已核实] 支持；A descending 为 null |
| 来源/状态 | page `source_ids/source_groups/provenance`; nested source IDs；master `sources`; evidence/status 字段 | [已核实] 支持，但不是所有后台状态都渲染 |
| 正文/FAQ | `title`、`description`、`blocks[{id,heading,body}]` | [已核实] 正文支持；没有 FAQ 专用字段 |
| 关系 | `related_links` / `natural_scale_chords.voicing_reference_url` | [已核实] 仅公开白名单目标渲染 |
| SEO | `metadata.title/description/canonical_path`；route 另设 robots | [已核实] 支持；无 Scales 专用 schema 定义 |
| 音频 | 数据中的 tempo/print_and_audio 与 adapter pitch sequence；运行时按 MIDI 计算频率/事件 | [已核实] 无音频文件；部分原始 `audio_assets` 不被当前组件消费 |
| 打印 | 当前 option/hand/direction/tempo 快照与相同 Reference；CSS print DOM | [已核实] 浏览器打印；无静态 PDF 下载 |

## 三个完整样例

[已核实] `examples/scales-center.page.json`、`c-major.page.json`、`a-minor.page.json` 是从当前运行时 master 解析后完整导出的原页面对象；没有删 `blocks`、表格数据、练习、来源 ID、关系、SEO 或打印/音频字段。`examples/referenced-sources.json` 包含三页实际引用到的完整来源记录。

[已核实] 原格式为 JSON 的对象仍为 JSON；包含函数、Map、React JSX、`undefined` 语义与生成逻辑的部分保留为 `source/**/*.ts(x)`，没有用 JSON stringify 冒充完整运行时。

## 现有验证命令（本轮未重跑）

| 命令 | 已有用途 |
| --- | --- |
| `npm run check:foundation` | [已核实] Foundation 文件、token、白名单与静态约束 |
| `npm run check` | [已核实] Foundation + TypeScript + CSS/Tailwind 检查 |
| `node scripts/check-scale-data.mjs` | [已核实] 三页内容/音名/MIDI/指法/来源与 adapter 数据断言 |
| `node scripts/check-scale-batch.mjs` | [已核实] 浏览器交互、布局、筛选、播放、打印状态 |
| `node scripts/check-scale-fallbacks.mjs` | [已核实] JS/音频/打印等降级路径 |
| `node scripts/check-scale-pdfs.py` | [已核实] 代表性打印 PDF 的结构与渲染检查 |
| `node scripts/check-scale-production.mjs` | [已核实] 生产构建下路由与输出 |
| `npm run build` | [已核实] Next.js 生产构建 |

[已核实] 上述脚本源码随包保留，但已有报告的通过结果属于各自执行日期，不等于本轮在当前 dirty 工作树重新运行。

