# Piano Reference — current stage: Design Foundation

用户已确认这是空项目，从本目录作为项目根目录开始，不要再寻找“旧仓库”。
当前授权仅为基础配置；除非用户明确切换阶段，不得生成业务组件或页面。

## Read first
1. docs/design/design-system.md
2. docs/design/inspection.md
3. docs/design/tokens.json
4. docs/product/url-plan.final.json
5. docs/product/Piano_全站统一规划_最终版.md（未取得则记录，不重写伪造）
6. docs/content/chords/content-pack.md 和 page-content.json
7. docs/design/reference/ 里的最终只读参考。

## Hard scope
- 不重选 Apple/Spotify/Linear/Claude；以最终样板视觉值为准。
- 不改 URL、关键词、页面职责、内容、音符或产品功能。
- 不创建 page.tsx、route.ts、Header、Button、Keyboard、ChordCard 或组件展厅。
- 可以维护 layout 的 html/body/children、CSS tokens、主题映射、基础文档和检查脚本。
- 没有业务页面时404是预期情况，不以修复404为由扩展范围。
- 不新增或升级依赖；确需调整先报告原因，按用户授权执行。
- Tailwind v4，禁止新增tailwind.config.ts；别运行shadcn init覆盖CSS。
- shadcn只配置路径/语义token；未来新增组件必须检查生成的默认尺寸、阴影、禁用、focus等，不能把脚手架默认值当成最终设计。
- 不下载或分发专有字体。系统字体栈，不引入动画库。
- 原文和只读参考保持哈希不变；文档不在public，参考HTML不是路由。
- 不自动部署、不改metadata保护为可索引、不生成sitemap。

## Commands
npm install         # 首次联网安装；成功后生成并提交package-lock.json
npm run check:foundation
npm run check       # typecheck + 真实Tailwind编译，安装后执行
npm run build

实际执行结果与未执行项分开报告；不要用模板报告代替测试。
当前检查脚本包含无页面/组件阶段守卫；只有用户授权业务阶段后才能明确调整守卫，不静默跳过。
