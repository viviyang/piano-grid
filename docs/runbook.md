# Runbook

## Microsoft Clarity：录像 / 热力图 → 改产品

PianoGrid 用 Clarity 看真实访问，不靠感觉改界面。对应流程是：看录像和热力图，只改被反复证明的卡点。

Dashboard：[clarity.microsoft.com](https://clarity.microsoft.com)

### 接入状态

- 代码：根布局加载官方 `clarity.ms` 脚本，不新增 npm 依赖。
- 开关：`NEXT_PUBLIC_CLARITY_PROJECT_ID`。ID 合法且当前是生产构建时才注入。
- 本地 `next dev`、Vercel Preview 不录像，避免自己的点击混进真实用户。
- 生产生效需要：把 Project ID 写入 Vercel Production 环境变量，并部署。

### 每天先看什么

流量少时尽量把新录像看完；流量起来后改成扫异常。

1. **Recordings** 先筛 `Rage click`、`Dead click`、`Excessive scroll`。
2. 同一条卡点出现 3 次以上，才记成产品问题。
3. **Heatmaps** 固定看：`/`、`/tools`、`/keyboard-notes`、`/chords`、当前主推工具页。
4. 热力图看：该点的没点到、点了没反应、卷过首屏却没点主操作。

### 改产品的规则

- 录像是证据，搜索排名、自己的审美和“应该更好用”都排后面。
- 一次只改一个被证明的卡点，例如看不清选中键、听音按钮找不到、打印入口被卷走。
- 改完用新录像验收：同样任务不再反复点、不再中途离开。
- 不把 Clarity 观察写成 SEO 效果；不因此新建路由或改关键词。

### 核实脚本

生产页打开 DevTools → Network，应出现 `https://www.clarity.ms/tag/<id>`，交互后有发往 `https://www.clarity.ms/collect` 的 POST。Dashboard 里几乎马上能看到 Live 用户。
