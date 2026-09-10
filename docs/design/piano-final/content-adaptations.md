# 内容呈现调整记录

页面：`/chords/a-minor`；输入：`page-content.json`版本`1.0.0-batch-01`。

## 唯一英文原句调整

- block：`am-intro`
- 字段：`content.paragraphs[1]`
- 原句开头：`The example below uses A3–C4–E4, with C4 as middle C.`
- 呈现开头：`The root-position example uses A3–C4–E4, with C4 as middle C.`
- 依据：已确认FINAL BUILD PROMPT明确允许这处空间指代修改。介绍移至工具之后，且图示能切换转位，不应继续指向“下面”的图。
- 原文件：没有修改；变更只在构建时的呈现层应用。

## 仅重排，不改写

`am-intro.paragraphs[0]`首句用于H1后的直接答案，剩余句子和第二段放到“Root-position example”说明。`am-result`的原始标题保留为语义标题，视觉隐藏，避免在H1之后再重复一个大标题；两段正文保留在工具操作之后。

其他段落、步骤、转位表和FAQ没有改写。`checks/copy-agreement.json`记录了当前页面所有段落与步骤在content-pack中逐字匹配，无冲突。没有根据过去对话中的另一版练习措辞覆盖当前文件。

## 原有模块暂不开放

`am-next`的三个URL保持原样、发布状态均为false；映射和数据保留，公开空区块隐藏。其他导航页未实现，不用虚构URL或空href冒充可用导航。

## 新增的是界面状态文案，不是音乐正文

新增辅助界面文字包括“Search this page”“Root-position example”“Playback finished.”“Playback stopped.”、图表范围提示、无JavaScript提示及本地样板说明。作用限于解释本原型真实操作和范围，不宣称音乐知识、审核资质或学习效果。

## PDF

内容包声明的原PDF文件二进制未随当前输入挂载。旧比较包中的PDF是另一份渲染，不能冒充原始声明文件。本轮使用同一JSON的三个print_data和同一键盘几何重新生成一页黑白参考PDF。记录实际生成文件哈希，保留源声明哈希供追溯，不篡改原资产元数据。
