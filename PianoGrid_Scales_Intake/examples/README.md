# Examples

- [已核实] `scales-center.page.json` = `page-content.master.json` 的 `pages["/scales"]`。
- [已核实] `c-major.page.json` = `pages["/scales/c-major"]`。
- [已核实] `a-minor.page.json` = `pages["/scales/a-minor"]`。
- [已核实] `referenced-sources.json` = 递归扫描上述三个对象后，在 master `sources` 中解析到的完整来源记录。

[已核实] 页面运行时不会直接 import 这些独立样例文件；它读取 `docs/content/site-master/page-content.master.json`。独立样例仅用于交接，解析方式和原路径见 `AUTHORING_INPUT.md`。

