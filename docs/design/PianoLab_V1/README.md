# PianoLab｜首页 V1 交付包

## 先看这三个文件

**看效果：**双击 `index.html`，用浏览器打开。HTML 内嵌样式、脚本、SVG 和 favicon，不需要 npm、服务器或网络素材。浏览器/企业安全策略可能限制本地脚本；这不是原项目部署包。

**看设计：**`design/overview.png` 是总览；`design/desktop-1440.png` 与 `design/mobile-390.png` 是完整长页面。`design/hero-motion.mp4` 是真实 HTML 的静音动效录制，不是三维手部视频。

**交给 Codex：**把整个文件夹放进现有项目的参考资料目录，让 Codex 读取 `CODEX_HANDOFF.md`，不要只给一张图片让它自行重新设计。

## 文件说明

| 文件 | 用途 |
|---|---|
| `DESIGN.md` | 最终设计合同、文案、动效、品牌/发布边界及来源 |
| `CODEX_HANDOFF.md` | 迁移到原项目的执行单 |
| `index.html` | 可交互的独立首页原型 |
| `tokens.json` | 本版颜色与关键尺寸 |
| `homepage-content.json` | 品牌工作名、Hero/CTA、演示数据与原型目的地配置 |
| `assets/` | SVG/ICO/PNG 图标 |
| `design/` | 真正由 HTML 渲染的桌面/手机稿、图标稿及动效录制 |
| `QA.md` / `qa/report.json` | 实际测试结果与未测范围 |
| `qa/render_check.py` | 本次浏览器验收脚本，作为参考而不是强制新增项目依赖 |

## 交互试用

点击 Hero 琴键或 Hear A minor 可试听；Pause motion 暂停动效。向下滚动，在黑色模块切换 A minor / A major，再点击对应试听。缩窄窗口查看手机菜单和键盘。

业务链接在本文件中打开有明确说明的本地预览对话框，不代表业务页面已集成。移植到真实项目时使用原页面与真实发布门槛。

## 当前状态

[已核实] 已交付独立 HTML、设计稿、图标资产、文档和动效录制；未修改你的本地仓库，未部署。

PianoLab 尚未完成正式名称核查。没有真实手部演奏素材；程序化键盘为本版方案。声音是合成预览，不是钢琴采样。没有账号、MIDI 输入、付费、用户记录或曲谱下载功能。

当前次 CTA 为 Browse Songs；Sheet Music 真正就绪后再切换。原网站范围没有因此删减。

## 今天的完成标准

你先打开 HTML，核对页面与实际可点击效果；随后将本包交给现有 Codex 项目按执行单迁移。以“本地页面与设计一致、原功能不回归、实际回归结果明确”为完成，不以“又生成几张图”为完成。
