# Codex Prompt — Chords N2 模型升级前设计审阅

N1 完成并通过后再执行。本轮只审阅/设计，不实现。

目标：为 Seventh / Suspended / Diminished / Augmented / Add / Extended / Altered 建立真正可扩展的 detail model，不把当前 triad 模型硬改成万能结构。

读取：
- `03_categories/category-pages.master.json`
- `07_model/chord-quality-taxonomy.json`
- `07_model/MODEL_EVOLUTION.md`
- 当前生产 chord detail model、audio、keyboard、print、practice、metadata、adapters、tests

输出：
1. 哪些三音类别可先复用当前 3-note / 3-position 结构。
2. Seventh 的 4-note / 4-position 需要改哪些 type/validator/component/test。
3. Add 与 Extended 如何避免“公式正确但实际 voicing/省略音错误”。
4. 哪些字段应该从 `ChordDetailModel` 泛化，哪些仍应由 family-specific adapter 处理。
5. migration plan，要求已上线 Major/Minor 0 regression。
6. 下一批最小发布建议（优先 Dim/Aug/Sus 或 Seventh，给理由）。

不得修改业务代码，不新增 URL，不进 sitemap。
