# 校验范围与执行

```text
python 08_validation/validate_package.py
```

不需要额外 Python 包。它检查24个 definition、48个 realization、25条目标路由、384个练习向量，并用12个故意损坏的样本检查拒错能力。`validation-result.json` 是本次实际运行结果。

`golden-definitions.json` 是独立列出的24组音名基准；校验器还用字母级数、升降与半音关系检查，不只比较生成器写出的 MIDI 数组。

`schema-validation-result.json` 记录本次额外运行 Draft 2020-12 shape 校验的结果。交付 schema 不要求用户项目安装新依赖；使用现有 TS/runtime 校验即可。

这些测试不运行用户仓库，不检验组件实际的 aria、Web Audio、SSR、PDF 文件或发布状态。实际应用必须执行 `09_codex/` 的项目回归。不要把包内计数当项目测试计数，也不要为了匹配旧总数删除测试。

反例包括定义与布局不同步、错误的等音字母拼写、漏 degree、键盘越界、音频模式串用、打印不同步、虚构教师状态以及把全部任务误写成精确音区匹配。
