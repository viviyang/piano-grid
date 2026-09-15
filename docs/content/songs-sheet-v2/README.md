# PianoGrid Songs + Sheet Music · v2.1

**生产祖先：`main@1e3fdec`。Songs + Sheet Music 的直接实施基线必须是 Keyboard 完成并验收后的 accepted baseline commit。**

本包取代 v2 的实施基线指令；其内容、资产、URL范围和版权门槛保持不变。

[已核实] 已读取新Master、Current Handoff和上一版ZIP；64行C/D内容与上一版一致。未实施网站代码、未部署、未提交或申请任何许可。

## 今天怎么做

1. 将整个目录放在**仓库外的资料目录**，例如 `C:\PianoGrid-materials\songs-sheet-v2`。不要复制到`public/`，不要把dirty源码覆盖进项目。
2. Keyboard实施会话停止写代码并完成RESULT / Integration Handoff，形成可复用的accepted baseline commit。
3. 启动一个Songs + Sheet Music Codex实施会话；Codex从Keyboard accepted baseline新建独立clean worktree，不直接续写Keyboard worktree，也不退回旧production commit。实施结束后再用`INDEPENDENT_REVIEW_PROMPT.md`验收；验收者默认只读。

```text
执行我提供的 PianoGrid Songs + Sheet Music v2 包中的 CODEX_PROMPT.md。
先读取 01_MASTER_CONTEXT.md、BASELINE_CHANGE_v2_1.md、PLAN.md、DATA_CONTRACT.md 与 URL_DIFF.md。
main@1e3fdec仅作为production祖先。读取Keyboard最新RESULT / Integration Handoff，确认accepted baseline commit，并从该commit新建Songs clean worktree。历史dirty树只读保留；不要直接续写Keyboard开发worktree，也不要退回1e3fdec重做Keyboard能力。
复用包内content-data、contracts和qa，连续完成所有无阻塞实施任务。
不要把旧外链模型直接当站内学习版，也不要用三个原创练习冒充三首知名歌曲。
真实权限/人工验收阻塞单列，不阻止其他独立可实施项。
不提交、不推送、不部署、不收费、不升级依赖，最后生成真实RESULT.md。
```

## 哪些文件负责什么

| 文件 | 用途 |
|---|---|
| PLAN.md | A–O完整方案、首批与完整路线、验收边界 |
| CODEX_PROMPT.md | 连续实施入口、Keyboard accepted baseline门槛与新clean worktree步骤 |
| DATA_CONTRACT.md / contracts/ | 实体、资源、权限/能力、旧模型迁移与可执行门槛示例 |
| URL_DIFF.md / content-data/route-diff.json | 63个模块URL＋1个工具协同项的逐条差集 |
| CONTENT_SUPPLY_AND_RIGHTS.md | 自编/授权/外部资源供给与版权门槛 |
| PAGE_UX.md / content-data/english/ | 两类页面UX及实际英文内容、6张学习卡 |
| MONETIZATION.md | 免费核心、商业位置及启用条件 |
| qa/ / INDEPENDENT_REVIEW_PROMPT.md | 本包机器校验和网站/人工验收任务 |
| evidence/ | 新交接依据、dirty参考、历史材料与输入hash |

## 交付状态

这是 `SPEC_AND_CONTENT_PACK_WITH_BLOCKERS`，不是网站PASS。

三首命名歌曲：具体外部版本元数据与学习导引；**没有本站托管谱/录音许可，也没有对应本地二进制资产**。
三个原创练习：**已有24个真实文件**，本轮复用与复核；与命名歌曲分开。只在接入、独立内容检查和必要人工检查后启用公开资产。
八个首批页面：2个既有页改进＋6个原规划页的条件性接入目标；不能把这个数字当当前生产Git树差集或默认全数发布。

`content-data/catalog.v2.json`是本轮规范化候选数据；旧`catalog.registry.json`、原始页及旧字段只做迁移输入。不要运行两个各自修改的版本库。
`evidence/historical/`不用于当前执行授权。所有`ready`、`PASS`必须注明文件校验、代码、人工或线上哪一层。


[已核实｜本包复核] 3个原创练习的音乐事件、MIDI和WAV复用原材料；本轮调整了谱面音名标签与低音加线音符的间距，更新3个SVG和6个PDF（engraving rev2），音高/节奏不变。修改前后hash在`qa/engraving-changes.v2.json`，新版以`catalog.v2.json`的hash为准。

[已核实｜文件校验] 本轮实际运行594项包完整性检查、30项新契约测试、3份原创谱跨格式/音频频谱检查；详情`qa/PACKAGE_QA.md`。所有这些结果只针对资料包。
