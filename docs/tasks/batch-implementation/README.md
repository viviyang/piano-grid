# Piano Reference｜样板完成后的批量开发执行包

本包只包含放置说明和 Codex 任务，不包含全站内容包，不包含新项目源码，不会替换现有 Foundation。

## 现在做什么

1. 保留已完成的 `/chords/a-minor`、原源码、锁文件、Foundation 和本地验收记录。
2. 把之前下载的完整内容包原样解压到 `docs/content/site-master/`。让 `content-master-index.md` 直接位于该目录，不再多套一层压缩包名称。
3. 把本包的 `docs/tasks/batch-implementation/` 复制到项目的相同相对位置。若同名文件已存在，先比较，不盲目覆盖。
4. 在已有项目中开一个新 Codex 对话“Piano｜批量开发”。使用 `START-HERE.md` 的第一段指令执行 `00` 和 `01`。
5. 第一批停止后，再开第二个 Codex 对话“Piano｜独立验收”，执行 `90`。暂停开发对话，不并发修改同一工作区。
6. 有真实问题交回开发对话执行 `91`；验收通过后，按 `02` 到 `07` 每批继续，不按 URL 逐个重新提需求。

## 放置位置

以前提供的项目根目录是：
`C:\Users\Admin\Documents\viviyang_github\piano\`

这是依据用户给出的路径，执行方仍需以打开的实际工作区为准。

```text
piano/
├─ package.json                         # 已有：不替换
├─ package-lock.json                    # 已有：保留
├─ AGENTS.md                            # 已有：仅按本阶段做最小授权更新
├─ src/                                 # 已有页面和 Foundation：保留
├─ docs/
│  ├─ product/                          # 正式规划入口：保留并核对只读副本
│  │  ├─ Piano_全站统一规划_最终版.md
│  │  └─ url-plan.final.json
│  ├─ design/                           # 已验收 Foundation / 最终设计：保留
│  ├─ content/
│  │  ├─ chords/                        # 旧页面正在使用的内容：先不动
│  │  │  ├─ content-pack.md
│  │  │  └─ page-content.json
│  │  └─ site-master/                   # 完整新内容包的全部内容放这里
│  │     ├─ content-master-index.md
│  │     ├─ page-content.master.json
│  │     ├─ source-ledger.master.md
│  │     ├─ unresolved-issues.master.md
│  │     ├─ url-plan.final.json
│  │     ├─ Piano_全站统一规划_最终版.md
│  │     ├─ A-Scales/
│  │     ├─ B-Keyboard-Notes/
│  │     ├─ C-Songs/
│  │     ├─ D-Sheet-Music/
│  │     ├─ E-Guide-Reading-Practice/
│  │     ├─ F-Homepage/
│  │     ├─ assets/
│  │     └─ preserved-chords/
│  │        ├─ content-pack.md
│  │        ├─ page-content.json
│  │        └─ assets/
│  └─ tasks/
│     └─ batch-implementation/          # 本 Prompt 包放这里
└─ public/                              # 不在这里整包放研究资料
```

A–F 名称按内容总索引保留。每个批次内部的全部文件都原样保留，不需要你拆成一页一份，也不要手动改其中的相对路径。

`preserved-chords/` 不是源码备份：它保存原两页的内容、数据、素材和旧 schema。不要把它的内容覆盖到 `src/`。

完整包中的规划文件是只读快照。若 `docs/product/` 已有正式文件，先比哈希；若缺失，可由 00 任务核对后等字节补入。版本冲突需报告，不按文件修改时间裁决。

## assets 怎样处理

你只负责把原包完整放在 `docs/content/site-master/`。
Codex 按本批实际需求、原素材来源和可使用条件，选择性复制到 `public/reference/`，维护源路径—输出路径—URL—哈希的映射。

建议新素材：
`docs/content/site-master/assets/chord-a-major.pdf`
→ `public/reference/assets/chord-a-major.pdf`
→ `/reference/assets/chord-a-major.pdf`

建议旧素材：
`docs/content/site-master/preserved-chords/assets/a-minor-notes-inversions.pdf`
→ `public/reference/preserved-chords/assets/a-minor-notes-inversions.pdf`
→ `/reference/preserved-chords/assets/a-minor-notes-inversions.pdf`

以上是建议输出路径，不表示文件已经复制。若 A minor 已有正常 PDF URL，保持原 URL；登记映射即可，不为统一目录破坏已验收页面。

新页面的 `assets/...` 相对总包根解析；旧两页的 `assets/...` 相对 `preserved-chords/` 解析。新页不相对 A–F 子目录解析。不能用同一个根路径处理两种 schema。

不要整包同步：master JSON、研究 Markdown、问题台账、权限记录、源脚本及字体文件不能因为在 assets 旁边就自动暴露。外部谱面链接不代表可以下载到本站再分发。许可说明按实际已用资产的条件保留，不安装品牌字体。

## 对话与模型建议（2026-09-09 查询）

建议两个角色对话，不是每页一个对话：
- 开发：Astra / gpt-6-astra，Medium；不可见时用 5.6 Sol 的 Medium/High 中实际可选档位。
- 独立验收：Astra Extra High；不可见时用 5.6 Sol High 或 Extra High。

这是任务配置建议，不是已执行的模型对比实验。以你客户端实际可选项为准；不为此更改账户或购买 API。常规开发不默认启用 Max/Ultra，不安排多个 agent 同时改同一 checkout。

代码写入只由开发对话负责。验收对话只写审查记录和测试产物，不改产品源码或原数据。两个角色仍可用同一个模型，独立性来自不依赖开发自报结论。

对话过长或中断时，使用 `92-resume.md` 在新对话恢复原角色；旧对话不再同时执行。状态以仓库文件为准，不依赖聊天记忆。

## 首轮开发范围

内容批次 A–F 是资料分组；下面 00–07 是工程顺序，两者不是一回事。

| 任务 | 范围 | 内容来源 |
|---|---|---|
| 00 | 全站内容接入检查、适配层、进度表、A minor 回归 | master + preserved + 现有源码 |
| 01 | `/chords`、`/chords/a-major`、`/chords/c-major`；A minor 回归 | preserved + F-Homepage |
| 02 | `/keyboard-notes`、`/keyboard-notes/labeled`、`/keyboard-notes/chart` | B-Keyboard-Notes |
| 03 | `/scales`、`/scales/c-major`、`/scales/a-minor` | A-Scales |
| 04 | `/songs`、`/songs/easy` | C-Songs |
| 05 | `/guide`、`/guide/read-sheet-music` | E-Guide-Reading-Practice |
| 06 | `/tools/blank-sheet-music` | D-Sheet-Music |
| 07 | `/`、`/tools`；首轮所有页面整合 | F-Homepage + 已实现页面 |

这是 17 条“先做”URL 的首轮实现，A minor 已完成并保留，因此新增 16 条；不把整个 127 条内容记录都自动做成路由。原“后做”91条、“暂不做”19条和无URL任务完整保留在台账，未授权本轮实现/发布。

每批完成后输出验收记录并停止。你不必逐页重写需求，只需发相应任务文件路径；本包附了启动、继续、验收、修复和恢复指令。

## 依据与边界

文件依据：`content-master-index.md` 的交接规则、批次目录；`page-content.master.json` 的 schema_version=3.0.0、summary、integration_contract、legacy_chords_support；`unresolved-issues.master.md` 的逐页问题；产品规划的先做清单。

总包记录 127 URL、125 新页、2 保留页、43 个列入清单的素材（30新、13保留）、209条新页问题、6条旧gap。它们是源资料声明，00任务必须在你的实际目录重新核验；不是本包已经访问了你的电脑。

本包作者没有访问你的本地仓库，也没有替你运行本轮开发。已有完成状态依据你提供的结果，后续只做必要回归，不重新设计。
