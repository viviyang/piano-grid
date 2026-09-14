# 当前 Scales 写入契约

## 唯一真实链路

```text
docs/content/site-master/page-content.master.json
+ docs/content/site-master/A-Scales/launch-monetization/faq-answer-supplement.json
→ scripts/scale-faq-contract.mjs（稳定 ID、问题顺序、显式答案、source_ids）
→ scripts/scale-authoring-contract.mjs（27 页共享运行/导入校验）
→ src/lib/site-content.ts::readAuthorizedPage
→ src/lib/scale-content.ts / scale-completion-content.ts
→ ScaleOption / ScaleFamilyExample / ArpeggioExample 页面模型
→ 页面正文、FAQ、谱表、琴键、音频事件、练习题与打印快照
```

`checks/launch-monetization/current-authoring-bundle.json` 是当前 27 页完整导出，含依赖闭包 74 条来源，不是 render props。FAQ 补充文件是可维护的窄范围输入；其格式明确标为 `NOT-runtime-import`，必须先经 helper 附加。没有把函数、JSX 或 `undefined` 强制 JSON 化；这些行为仍保留在 TS/TSX 源文件中。

## 关键真实字段

- 页面：`url`、metadata/canonical、title/description、blocks、questions、`faqs[{id,question,answer,source_ids,evidence_status}]`、source_ids/source_groups、relations、SEO。
- 音阶：tonic、scale_type/form、formula、ascending/descending notes、pitch sequences（spelling/written octave/MIDI/key color/hand）、range、key signature、fingering 与其 source_ids。
- 家族：example id/label/form、ascending/descending notes、staff events、source_ids、scope；序列允许变长。
- 琶音 view：view id、hand、clef/register、staff/playback/keyboard pitch、fingering 与来源分别绑定。G 高音 view 的 `hand:null`、`fingering:null` 是“没有已分配手别/指法”，不是继承前一 view。
- 输出资产：固定资源 URL 与浏览器当前打印是两种不同输出；当前打印取同一 UI snapshot。

`null` 不表示 0、空字符串或验证通过：指法 null=未支持；view hand null=notes-only；平台数据 null=未观察；发布 release ID null=未部署。不得用默认值填补未知来源、账号或审批字段。

## 导出、验证与导入预览

```powershell
node scripts/export-scale-authoring.mjs --output checks/launch-monetization/current-authoring-bundle.json
node scripts/check-scale-completion-contract.mjs
node scripts/check-scale-final.mjs
node scripts/check-scale-launch-contract.mjs
node scripts/import-scale-authoring.mjs --input checks/launch-monetization/current-authoring-bundle.json --preview checks/launch-monetization/import-preview.json
```

[已核实] 导出为 27 页/74 来源；预览保留 100 个非 Scales 页面。`would_change=true` 是因为完整导出已带显式 FAQ，而仓库用独立 supplement 维护这些字段；本轮没有运行 `--write`，避免无必要重写大 master。只有审阅 preview 并解决并行所有权后才能使用 `--write`。

## 完整样例定位

中心、C major、A minor 与其全部依赖都在同一 current bundle 的 `pages["/scales"]`、`pages["/scales/c-major"]`、`pages["/scales/a-minor"]` 和 `sources` 中。家族与琶音同理按 URL 读取；不手写近似副本。`ROUTES_TASKS_AND_GAPS.json` 与 `release-route-ledger.json` 提供 URL/object/任务目录。
