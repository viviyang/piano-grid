# 代码范围、基线与复用

## 1. 取证流程（只做一次基础盘点）
- `git status --short`、branch/HEAD、worktree list、最近发布记录；记录真实命令输出。
- 标记 B04 发布 commit（未知就写 UNKNOWN）；使用当前用户打开的集成目录，不能按历史 main@1e3fdec 重置。
- 工作区有非本批改动时，逐文件归属，不自动 stash/reset/clean；冲突不能靠覆盖解决。
- 读取 package.json/lockfile，确认 test runner、构建命令、现有浏览器/打印工具；不假定脚本名称存在。
- 读取当前 route/content/song/arrangement registry，列实际 ID、source、revision、许可字段、素材与 renderer。
- 全站公开 URL、build 输出、系统页分别统计。历史173/210等不是本轮断言。

## 2. 本轮路由权限
B05 full edit：`/songs`、`/songs/easy`；三首既有 Sheet Music 页只改版本展示与练习入口，不扩曲谱。
B06 additive edit：`/keyboard-notes/labeled#teaching-pack`；`/tools`一项资源；`/keyboard-notes`仅一个上下文入口；已有 `/keyboard-notes/blank` 若存在只加相关链接。
B07 content/metadata/link edit：data/page-seo.json 中的现有页面；`/keyboard-notes`为 guard_only，不重设计。
B04、Chords、Scales、首页：仅回归既有能力及链接，发现重大现存问题另列，不默默扩本批任务。
零新增公开业务路由。`#first-10-minutes`、`#teaching-pack` 为已批准锚点；PDF静态资产不是新SEO落地页。

## 3. Owner map（名称来自历史交接，当前路径仍需验证）
| 职责 | 优先找的现有实现 | 本轮使用方式 |
|---|---|---|
| 曲目/编配/谱/音轨 | 当前 registry；未知文件路径通过仓库查找 | 同一 arrangementId；新增 practicePlan 引用，不复制事实 |
| Piano geometry | KeyboardDiagram / keyboard-geometry / pitch library | B06静态与屏幕 renderer 都消费同一布局投影 |
| Piano viewport | keyboard-viewport | B06不改Labeled既有88/61窗口，只取C4–C5资源范围 |
| Audio | ReferenceAudio | B05仅有合法完整音频事件时适配；外部轨道不调用 |
| Sharing | ShareDialog / SharePanel / copyShareURL / openNativeShare | 共享UI/焦点/失败/状态清理；payload各业务自己构造 |
| URL restore | 当前 practice/deeplink helper | 扩展受控plan/resource parser，不复制未校验字符串逻辑 |
| Print | 现有静态SVG、PDF生成、print CSS | 新resource payload，保留旧print方向/页面选择 |
| Metadata | 已有 page metadata/结构化数据生成 | 逐页更新，不写第二套全站head |
| Events | 现有安全event helper与collector | 添白名单字段，状态真实收集与否分开 |

## 4. 最小新抽象
允许新增（命名按repo）：EditionCard presentation；FirstTenMinutesPlan state/view；TeacherPack renderer adapter。
它们不是新的music engine、course platform或analytics SDK。
只抽取至少两个消费者真正共享的展示。不可借复用一次性重构全站。

## 5. CSS所有权
共享对话框必需样式随共享组件加载，不能依赖另一个route先访问。
B05 `.pg-song-plan`；B06 `.pg-teaching-pack`，或项目等价CSS module。禁止裸 `button`/`details`/`svg`全局覆写。
每个页面冷启动都必须样式完整，尤其 /songs/easy 分享、Labeled打印面板。

## 6. 编配映射与测试fixture
`data/content.en.json` 的 editionKey 是本包逻辑key，不是声称等于生产 arrangementId。
写 `editionKey -> existing arrangementId -> provider/version evidence` 一次性映射。来源不同或revision不同不得合并。
fixture MIDI C4–C5仅用于本包纸面样张/验收期望，不复制为生产pitch逻辑。

## 原型null字段不是清空指令
content.en.json中的verifiedNotes/verifiedFingering=null仅表示本次外部研究没有补全逐音证据，不能覆盖registry内已有可追溯的核验值。读取证据来源及版本后保留现有正确的key、meter、hands等字段。

## 未提交成果的批间交接
B05/B06未获授权不commit，不因此阻止下一批。在同一集成工作树中按上一批manifest、当前文件hash和NEXT_PROMPT验证承接。HEAD相同不代表没有新成果。上一批的dirty文件应标为已验收前置成果，不能stash/reset掉；本批只编辑被授权路径。最终handoff相对本轮B04发布基线包含全部三批变化。
