# 首页导航配色修复

2026-09-22，用户希望首页采用所附图一的深色导航。

[已核实] origin/main 基线的 `0b6a844` 提交引入共享导航深色配色，但 `home-color-repair.css` 的同优先级 `.ph-site-header` 背景规则后加载并覆盖它。修复前实际背景为 `color(srgb 1 1 1 / 0.94)`，品牌文字为 `rgb(232,237,243)`、导航文字为 `rgb(182,192,206)`，造成白底浅字。

[已核实] 本次仅修改 `src/components/site-navigation.css`：为首页 header 复用导航局部色板，以 `.home-page .ph-site-header` 确保深色背景不被旧首页规则覆盖。保留首页 Explore tools 入口及现有导航行为，不修改正文或 title，不部署。

验证结果见 build.log、css.log 和浏览器 header-check.json。之前 HTML 体积审查的原始快照保留，未以这次后续配色修复覆盖。

[已核实] 生产构建、CSS 检查通过；首页背景实测 rgb(24,31,39)，桌面键盘菜单、手机菜单与内页配色回归通过，未捕获 pageerror。已更新 localhost:3142，保持预览运行。
