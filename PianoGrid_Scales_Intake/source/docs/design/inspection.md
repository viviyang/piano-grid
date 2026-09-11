# STEP 0 — 空项目初始化记录

版本：foundation-1.1.0-new-project；日期：2026-09-09。

## 结论

[已核实] 用户已明确原项目为空。本轮不再把缺少旧仓库当作阻塞。
[推断] 选择 Next.js App Router + React + TypeScript + Tailwind v4，建立 src/ 目录的新项目基础。
这属于新项目选型，不是读取了用户电脑上的已安装版本。

| 检查项 | 原项目状态 | 本次配置 |
|---|---|---|
| Next.js | 空 | 16.3.4 |
| React / React DOM | 空 | 19.2.8 / 19.2.8 |
| Tailwind CSS | 空 | 4.3.3 |
| PostCSS adapter | 空 | @tailwindcss/postcss 4.3.3 |
| PostCSS | 空 | 8.5.23 |
| TypeScript | 空 | ~5.9.3；不声称它是最新大版本 |
| 类型声明 | 空 | @types/node ^22、react/react-dom ^19，由首次实际安装生成锁文件 |
| shadcn/ui | 空 | 只建立components.json；没有CLI安装版本或组件源码版本 |
| components.json | 无 | new-york、rsc、tsx、cssVariables、v4空config、src/app/globals.css |
| globals.css | 无 | src/app/globals.css，含@theme inline |
| Tailwind config | 无 | 不创建；v4 CSS-first |
| 字体 | 无 | 最终样板的系统栈 |
| layout | 无 | src/app/layout.tsx，仅html/body/children，导入CSS |
| 动画库 | 无 | 不安装；保留CSS motion变量与reduced-motion |
| 业务页面 | 无 | 仍为空；不创建page.tsx |

shadcn的new-york/baseColor只是生成工具的配置元数据；所有最终视觉使用本项目tokens，不能另行覆盖。
cn使用clsx 2.1.1和tailwind-merge 3.6.0，并登记自定义text/spacing名。
没有引入lucide运行包、Radix组件、class-variance-authority或tw-animate-css，因为当前没有要运行的UI组件。

## 安装与构建边界

[已核实] 本执行环境node为22.16.0、npm为10.9.2，仅用于本次校验，不是用户机器版本。
通过Web工具查看了官方安装文档、npm注册信息及维护者仓库；其中Next 16.3.4、React 19.2.8、Tailwind 4.3.3可核查。

[已核实] 容器内 `npm view` 超时，`curl` 返回 `Could not resolve host: registry.npmjs.org`。
所以未执行成功的npm install、Tailwind编译、项目TypeScript完整检查或Next构建；没有生成真实package-lock。
本包提供本地检查命令，首次安装应使用npm install，而不是npm ci。
不提供伪造的锁文件、不把Web查到的版本当成已安装版本。

核心框架固定准确版本；类型工具按声明范围解析。安装成功后提交package-lock，以后npm ci。
不把node_modules或.next打进包里。

## 已执行项

具体报告见 checks/validation.json。
无依赖结构和token检查、源文件哈希、配置语法、CSS解析及内存DOM中的基础样式检查，
与实际框架构建分开记录。不把这些检查称为完整产品或完整WCAG验收。

## 官方工程依据（不是新的视觉参考）

- https://nextjs.org/docs/app/getting-started/installation
- https://registry.npmjs.org/next/latest
- https://registry.npmjs.org/react/latest
- https://registry.npmjs.org/tailwindcss/latest
- https://www.npmjs.com/package/%40tailwindcss/postcss?activeTab=versions
- https://tailwindcss.com/docs/installation/framework-guides/nextjs
- https://tailwindcss.com/docs/theme
- https://tailwindcss.com/docs/detecting-classes-in-source-files
- https://ui.shadcn.com/docs/components-json
- https://github.com/dcastil/tailwind-merge/blob/main/docs/configuration.md
- https://github.com/dcastil/tailwind-merge/blob/main/package.json
- https://github.com/lukeed/clsx/blob/master/package.json

## 缺少但不阻止Foundation的资料

完整产品Markdown的原文件未取得；将已有原文件放到docs/product/指定文件名。
原内容assets未重建。只读来源状态及SHA256见source-manifest.json。
这两个缺项不授权重新规划或编造素材。
