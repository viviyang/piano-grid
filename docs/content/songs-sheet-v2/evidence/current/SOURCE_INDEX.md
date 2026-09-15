# Source and data index

除 Chords 行明确标注为“仅索引”外，以下路径均以交接生成时的当前 dirty 工作树为准，且完整文件副本在 `source-snapshots/` 下按原仓库相对路径保存。

| 模块 | 代码/数据入口 | 主要类型或样例 | 复用边界 |
|---|---|---|---|
| Keyboard Notes | `src/lib/keyboard-content.ts` | `keyboard-types.ts`：Layout、PianoKey、StaffNote、ChartKey、KeyboardPageModel | `KeyboardDiagram`、`StaffDiagram`、`use-note-audio`；现有三页正文经 `readAuthorizedPage()` 读取。 |
| Songs | `src/lib/song-content.ts` | `song-types.ts`：SongResource、SongRights、SongPageModel、SongGoal | 仅 HTTPS external reference；禁止重分发 score/recording。 |
| Tools | `src/lib/integration-content.ts`、`blank-sheet-content.ts` | `integration-types.ts`、`blank-sheet-types.ts`：Destination、PrintableDestination、BlankSheetAsset | 只显示实际可用目的地和两份 original blank-staff PDF。 |
| 六模块互联 | `src/lib/site-routes.ts`、`support-content.ts` | `PublicRoute`、`SupportRoute`、`SupportLink` | 导航/内链依赖公开路由白名单；规划 URL 不自动成为可用链接。 |
| Scales | 既有 `PianoGrid_Scales_Final_Handoff` 的 authoring/contract | `scale-types.ts`、三份 complete JSON examples | 本包复用其 RESULT、contract、examples；不重写 authoring 模型。 |
| Chords（仅索引） | `src/lib/chord-content.ts`、`chord-detail-model.ts`、`chord-learning-content.ts` | 详见 RESULTS 的 B3/Final source lists | 只作未结事项核对，未复制 Chords 业务源码或开启开发。 |

未包含的字段、页面或路线应当视为 `UNKNOWN`，除非 RESULT、代码快照或规划原文明确证明。
