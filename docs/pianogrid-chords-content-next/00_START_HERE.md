# PianoGrid：后续和弦内容、URL、关键词、TDH与内链

版本：2026-09-11 / 基于 `PianoGrid_B3_Content_Intake.zip`。目标语言en-US，站点https://pianogrid.com。

## 先看结论

[已核实] 本包读取了B3的实际类型、运行时约束、authoring输入、三个完整样例、19对象Hub、原URL规划及来源台账。没有把resolved输出当作新Schema。

[已核实] 原规划在当前和弦任务范围内有15个URL：4个B3现有页面、6个待扩详情、5个关联学习/工具页面。**本轮没有新增原规划外的URL，不重新做全站关键词清洗。**

实际交付：

| 内容 | 文件 | 状态 |
|---|---|---|
| 6个详情的英文正文、音名、18组参考位置、FAQ和学习文本 | `02_content/details/` | 完整内容已准备；代码尚未接入 |
| 5个详情的root左右手来源与数据 | `03_learning/` | 符合B3状态含义：来源支持手指配对，本站八度为适配 |
| C-flat | 同目录 | 正文、音符、PDF已准备；指法门槛未解除，不能当前直接发布 |
| 5个系统页的完整正文＋已准备数据 | `02_content/support/` | 教程、双手编号、49行按调表、9段进行、8个反查用例；各自需要实现 |
| URL/Title/Description/H1/关键词与历史指标 | `01_planning/` | 现有4页保留，新11页逐一配好 |
| 带理由、位置、发布条件的内链图 | `01_planning/internal-links.json`/TSV | 按当前完成范围激活，不全量塞入每页 |
| 6份三位置参考PDF＋6份SVG | `05_assets/` | 本次真实生成，逐页渲染检查；不包含五线谱或指法 |
| 实际接入Prompt | `06_codex/01_接入五个和弦详情_完整Prompt.md` | 默认先接5个无来源阻断的新详情 |
| 内容独立校验＋实际结果 | `07_validation/` | 不冒充完整项目build或人体验收 |

## 今天怎么用

1. 将整个目录放在仓库 `docs/pianogrid-chords-content-next/`。
2. 在完成B3的Codex会话发送：

```text
请执行 docs/pianogrid-chords-content-next/06_codex/01_接入五个和弦详情_完整Prompt.md。
直接根据当前仓库和文件包做最小差异核对、接入和集中验证，不再先开一轮泛泛审查。
本轮仅接G major、C minor、E major、B major、A-flat major，保持原4页与原19对象内容和视觉。
C-flat指法门槛未解除，其他系统页本轮只保留材料。不要提交或部署。
```

3. 默认实施范围已给定，无需先让你重新决定字段格式。只有真实接口冲突或证据阻断才暂停；普通适配由Codex直接完成。

## 为什么不是一个JSON直接覆盖所有页面

[已核实] B3是 **raw JSON＋纯数据TS＋适配器**，不是统一可反写JSON Schema。当前详情只允许三个URL，A/C适配器还有major和metadata覆盖；扩五页必然要小改白名单/映射与C minor质量分支。

`details.merge.json`、`support.merge.json`是authoring子集，只合并对应pages键。`chord-learning.next.ts`是五页已适配实际type的纯数据增量。`binding`是明确的适配说明；不谎称现代码已经支持。不要替换整个master、删除其他栏目或升级依赖。

## 关键词与SEO

[已核实] 原关键词和历史US量来自用户已有规划，未重新测量，不相加不补零。新增自然表达仅标为[推断]，无流量承诺。TDK里的K作为编辑词表；HTML不生成meta keywords。新页面标题的PDF/练习承诺只有真实功能接通后才能发布。

现有4页Title/Description/H1以B3原始HTML为准保留，不为统一文风再改一轮。新页以本包metadata加binding进入适配层，在最终HTML核对生效。没有同义词堆砌、规定密度或800词门槛。

## 不丢原正确内容

所有原正确数据、原有正文和B3交互保留。当前修改记录包括：补齐英文解释、来源和FAQ；为新minor正确设置公式；修复future finder带八度却未知bass的例子；清除未提供资源的“已验收”继承声明；去除自编进行的虚假授权标签。原baseline只读留在08，不当成本轮已重新验收。

## 开放门槛

[已核实] 没有完整仓库运行环境，故本包不能替Codex确认build、上线HTTP、听音、真机、读屏、实体打印或PDF标签。源内容检查与PDF屏幕渲染是这次实际做的；人体验收保留未测状态。C-flat不用不可靠指法来源凑数，未来补证据或明确批准可选指法模型后再启用。

更广的七和弦、sus/add、爵士排列和“全部和弦”，保留任务台账但不假装19个大小三和弦已覆盖。Hub剩余10个没有批准详情URL的对象继续可查，不擅自批量建页。
