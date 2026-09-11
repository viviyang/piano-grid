# PianoGrid Chords 下一阶段扩展包

## 先做什么
把整个目录放到项目 `docs/pianogrid-chords-expansion-next/`。

然后在当前 Codex 项目会话执行：
`09_codex/01_N1_批量实施Prompt.md`

## N1 一次做完
- 修正 Chords 导航信息架构
- 新建 Major / Minor 两个分类页
- 新增 16 个详情页
- Hub 19 → 25 objects
- 让 practical major/minor 基础集合全部有详情
- TDK / H1 / canonical / 内链 / sitemap 一次收尾

当前已经 push 的 15 个 URL 不改地址。

## 为什么不是立刻把全部 Seventh/Extended 都生成
当前稳定 detail model 是 major/minor triad 模型。七和弦需要四音和四种位置，Extended 还涉及实际 voicing/省略音。直接批量生成会把“页面数量”放在音乐正确性之前。

因此高级类别的路由、分类与公式已经在本包规划，但状态保持 planned，不进入导航/sitemap。N1 完成后执行 `09_codex/02_N2_模型升级审阅Prompt.md`，一次决定下一批。

## 数量
- 当前 Chords 系统：15 URLs
- N1 新增：18 URLs（16 details + 2 categories）
- N1 后 Chords 系统：33 URLs
- 另有 7 个高级分类 URL 仅规划，不发布
