# 后续模型升级边界

当前 B3/B2 模型最初按三音 major/minor triad 建立。N1 只完成 Major/Minor，不要求为了导航一次改成万能和弦模型。

## N2 建议顺序
1. Diminished / Augmented / Sus：仍为三音，先验证 quality enum、公式和三种位置是否适用。
2. Seventh：四音和弦，需要 4 notes、4 inversion positions、打印/音频/练习同步改造。
3. Add：按明确 subtype 做四音。
4. Extended：5+ notes，需要 variable-note model 与实际 voicing/省略音规则。
5. Altered：必须先定义具体 subtype，禁止“altered”一个公式自动生成。

每个阶段都必须做到：定义、显示、keyboard、audio、print、SEO、练习判定使用同一 resolved data。
