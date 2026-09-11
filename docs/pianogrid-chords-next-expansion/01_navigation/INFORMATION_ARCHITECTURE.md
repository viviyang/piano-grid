# Chords 信息架构

## 当前问题
现有全站 Chords 下拉以 A minor / A major / C major 等少量实例为主，能到达页面，但不能表达完整的和弦体系。

## N1（本包可直接实施）
- Chord Chart → `/chords`
- Major Chords → `/chords/major`
- Minor Chords → `/chords/minor`
- Chords by Key → `/chords/by-key`
- Chord Progressions → `/chord-progressions`
- Chord Finder → `/chords/finder`
- Piano Chord Guide → `/guide/piano-chords`
- Finger Numbers → `/keyboard-notes/finger-numbers`

A minor / A major / C major 等具体和弦不再占用全站一级下拉的主要位置；它们通过 Hub、Major/Minor 分类页、搜索/筛选和内链到达。

## 根音与类型是两个浏览维度
- 根音：在 `/chords` 和分类页中作为筛选/定位，不批量制造 root-only URL。
- 类型：Major / Minor 有独立分类页；Seventh / Extended / Sus / Dim / Aug / Add / Altered 在模型支持后逐批开放。

## 目标态
竞品可作为“根音 + 类别 + Explore”信息架构参考，但 PianoGrid 保留自己的任务结构：Browse / More Chords / Explore / Learn。不要复制竞品视觉与文案。

## 路由数量
- 当前已完成 Chords 系统：15 URL。
- N1 新增：16 个详情 + 2 个分类 = 18 URL。
- N1 完成后 Chords 系统：33 URL。
- 若当前全站 sitemap 为 28 条且无其他变化，N1 后预计为 46 条；Codex 必须以实际 route registry / sitemap 为准重新计算。
- 其余 7 个高级分类页仅计划，不进入 sitemap/nav，直到模型与内容通过。
