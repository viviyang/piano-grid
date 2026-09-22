# PianoGrid Feedback V0.2 — 方案与实施记录

状态：本地实现和验证完成，生产功能尚未启用。基线：2026-09-22 获取的远端 `origin/main`，提交 `d15c0142cc6d00b01d060ba17092000a5bf060ca`。实现位于独立 worktree，原工作区的未提交改动未复制入实现分支。

## 1. 目标与边界

[推断] 先让访客在页面语境中报告内容错误、使用故障和改进建议；用小范围页面有用性提问验证入口。PianoGrid 先试运行，稳定后再把通用代码和视觉用法移植到基础模板、Guitar。各仓库独立，不假设一次修改会自动同步。

本版提供：全站入口、少量重点页的 `Was this page helpful?`、带页面上下文的文字反馈、明确的提交结果、可替换的服务端接收适配层。暂不做登录、数据库、管理后台、公开路线图、评论、AI 分类、截图或 NPS。未确定接收端前不展示可提交的生产入口。

[已核实] 当前仓库有项目自有的原生 `Dialog`、适配自 shadcn 的 `Button`、共用内页 Footer、独立首页 Footer 和移动导航；没有现成 Sheet/Drawer、Toast、通用表单组件或反馈 API。组件选择遵循 `docs/design/COMPONENT-RULES.md`（2026-09-21）和现有 tokens，不以 `ui` 目录或 shadcn 配置推定组件已存在。

## 2. 入口与交互

### 全站 Feedback

- [推断] 桌面及移动端的稳定低干扰入口放在 Footer。内页接入 `SiteFooter`，首页单独接入 `HomeFooter`，避免遗漏 `/`。
- [推断] 移动菜单增加一个次级操作入口，打开同一表单；它不是 `SITE_NAVIGATION` 的第八个内容栏目，也不生成 `/feedback` 页面。菜单打开弹窗时应关闭菜单，并验证关闭后的焦点去向。
- 桌面和移动端均复用现有 `Dialog`；通过响应式尺寸和可滚动内容适配窄屏与软键盘。除非实际验证表明该组件无法满足需求，否则不引入 Sheet、另一套 Modal 或新的依赖。初始焦点、焦点返回、Escape、背景交互和读屏名称必须实测，不能仅以组件来源代替验收。
- 标题 `Help us improve PianoGrid`；类型选择为 `Something isn't working`、`Something looks incorrect`、`Something is hard to understand`、`I have an idea`、`Something else`。详情必填，邮箱选填；说明邮箱只用于就该反馈联系用户。发送期间禁用重复发送，失败保留输入，成功显示确认后再关闭。
- [已核实] 用户要求前台不显示 GitHub。入口、表单、加载/成功/失败文案只使用 PianoGrid 品牌，不出现 `GitHub`、`Issue`、仓库名称、Issue 编号或链接；这只是对用户界面的要求，不改变内部实际接收方。

### 页面级提问

- [推断] 首批只在代表性的 chord detail、scale detail、keyboard-notes 核心页和 practical tool 结果页挂载一个共享组件；具体页面以实施时的真实模板和任务范围为准。位置在主要内容之后、Footer 之前，不进入打印稿或下载资料。
- `Yes`：不打开表单。推荐走现有 GA4 的独立有用性事件，不生成待处理 Issue；界面显示 `Thanks for answering.`，只表示用户完成选择，不声称服务端已持久保存。现有分析未配置或未验证时不启用整组页面级问答，避免只统计负向样本。单次页面展示中点击后锁定选择；不引入跨会话追踪，也不声称跨刷新去重。
- `Not really`：就地展开原因与可选文字。原因：内容不正确、难以理解、找不到所需、功能失效、其他。为了让收到的条目可行动，至少要求选择一个原因；文字可选，但选择内容错误或功能失效时建议要求一句具体描述。失败保留原因和文字，成功显示确认。
- 两个入口共用反馈分类、上下文构造和提交状态规则；页面级提问本身不打开全局 Dialog。

## 3. 数据合同与最小化

建议的客户端输入：

```ts
type FeedbackSource = 'global_feedback' | 'page_feedback';
type FeedbackType = 'bug' | 'content_error' | 'hard_to_understand' | 'feature_request' | 'other';
type FeedbackInput = {
  source: FeedbackSource;
  pagePath: string;             // pathname；不传 query、hash
  productArea?: string;
  entityType?: string;
  entityId?: string;
  feedbackType?: FeedbackType;  // 文本反馈必填；单纯 Yes 不填
  rating?: 'positive' | 'negative';
  reason?: string;
  message?: string;
  email?: string;
};
```

- [推断] `productId`、接收时间和版本由可信的服务端配置或运行环境补齐，不相信浏览器提交的同名字段；服务器验证枚举、长度、邮箱格式与 pathname，并限制请求体。文字反馈使用版本化 Issue 正文格式；`Yes` 仅是独立的 GA4 有用性事件，不伪装成一条已持久写入的 Issue。
- 仅发送必要的页面路径、来源、分类、详情及用户主动填写的邮箱。默认不发送 cookie、localStorage、session、URL query/hash、referrer、完整 user agent 或自动截图。运行环境排障字段如确有需求，应另行列明用途和保留期限后再增加。
- 页面级上下文先由真实页面模型显式提供 `entityType/entityId`；resolver 只为路径提供保守的 `productArea` 默认值。不能把 `/chords/finder` 当成具体 chord，也不能用末段 slug 推定所有页面实体。服务端按允许的路由/字段重新校验上下文。
- 对可选邮箱在表单附近说明用途及联系渠道；接收端应确定访问权限、保留期限与删除方式。自由文本提示用户不要填写密码或敏感信息。隐私说明需如实描述反馈会由第三方服务处理；具体表述在上线前核对适用要求，不能为了隐藏技术实现而作不实陈述。

## 4. 提交链路与 GitHub Issues 接收端

```text
Feedback UI → POST /api/feedback → PianoGrid Route Handler
                                ↓ 验证 / 防滥用 / 内容清理
                         GitHub adapter → 私有 GitHub Issue
```

[已核实] 用户已选择 GitHub Issues 作为文字反馈接收端。GitHub 官方的创建 Issue API 支持仅授予目标仓库 `Issues: write` 权限的细粒度令牌；API 也可能返回限流错误，限额是 GitHub 服务保护，不是本站匿名访客的防刷策略。依据：[创建 Issue API](https://docs.github.com/en/rest/issues/issues)、[REST API 限流](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api)。

[已核实] `viviyang/pianogrid-feedback` 已创建为私有仓库且 Issues 已启用；最小权限运行令牌与生产环境变量尚未配置。[推断] Guitar 上线时可使用自己的私有反馈仓库，通用 adapter 通过服务端配置选择 owner/repo。实施时发现 Next 开发日志会打印 Server Action 的部分参数，可能包含反馈正文或邮箱，因此改为专用 `POST /api/feedback` Route Handler。它不是公开内容页面，也不进入导航或 sitemap；浏览器只向 PianoGrid 自己的站点提交，服务端验证输入后调用 GitHub API。只有创建 Issue 得到成功回执才向用户报告发送成功；返回浏览器的状态与文案均不包含 GitHub、私有仓库地址或 Issue 编号。API 失败、超时或 GitHub 限流时保留表单内容并显示不暴露接收方的重试提示。

服务端配置仅包括目标仓库、细粒度令牌和启用状态；令牌不使用 `NEXT_PUBLIC_` 前缀，不写入源码或日志。当前实现没有 `NEXT_PUBLIC_FEEDBACK_ENABLED`，由根布局读取服务端配置并控制界面入口；静态页面的入口可见性在构建时确定，启用生产入口须重新构建并部署。服务端接口仍独立复查开关与配置。Issue 标题只用受控的产品/分类/页面短标签，正文使用经过长度限制与清理的版本化字段，不允许用户文字直接决定 labels、assignee 或仓库地址。

实施前还须核对并记录以下运行条件：

| 必填项 | 验收标准 |
| --- | --- |
| 私有仓库 | 仓库实际存在、Issues 已启用、仅授权人员可查看；测试 Issue 能真实写入 |
| 认证与配置 | 仅目标仓库的 Issues 写权限；预览/生产环境分别配置，不在日志或客户端泄漏 |
| 请求与回执 | 定义超时、成功状态、GitHub 403/429/5xx 的处理；只有真实 Issue 创建成功才返回成功 |
| 防滥用 | 上线前核实服务端或边缘层的有效限流；honeypot、浏览器冷却和按钮禁用只是补充，不把 GitHub API 限额当成访客限流 |
| 数据处理 | 文本/邮箱的访问、保留、删除及误报处理方式确定 |
| 前台隔离 | 文字反馈的浏览器提交请求只到 PianoGrid；UI、提交响应和客户端日志不包含 GitHub、仓库地址或 Issue 编号；隐私说明保持真实 |
| 正向计数 | 验证现有 GA4 事件可在生产使用，记录可观测性与丢失风险；不把点击生成待办 Issue，也不称其为持久写入回执 |

[推断] 当前不额外选定付费 WAF、验证码或新数据库。限流的实施方式需结合现有 Vercel 配置核实成本与可用性；在确认前生产反馈入口保持关闭。当前 honeypot、客户端重复提交锁与请求体限制不构成有效的匿名访客限流。若 GA4 未配置，页面级问答也保持关闭。不能用本地内存限流或只显示成功提示代替落地。

## 5. 可复用边界与实际修改文件

- [已核实] 通用模块：`src/lib/feedback/types.ts`、`context.ts`、`validation.ts`、`client.ts`、`issue-format.ts`、`github-adapter.ts`、`service.ts`，以及 `src/components/feedback/` 中的入口、对话框、页面提问与样式。产品名称由服务端配置传入，视觉沿用本站已有 tokens；页面语境和接入点仍需按目标产品适配。
- 项目配置：`src/lib/feedback/config.ts` 指定 PianoGrid 名称、产品 ID、启用状态及允许的页面语境；`src/lib/feedback/github-adapter.ts`、`service.ts` 和 `src/app/api/feedback/route.ts` 分离 GitHub 调用、业务校验与 HTTP 入口。复用现有 tokens、`Button` 和 `Dialog`，不批量迁移旧控件。
- [已核实] 接入点：`src/components/chords/site-chrome.tsx` 的共用 Footer、`src/components/integration/pages.tsx` 的 `HomeFooter`、`src/components/site-navigation.tsx` 的移动菜单。页面级提问只在 `/chords/c-major`、`/scales/c-major`、`/keyboard-notes`、`/tools/hear-the-difference` 呈现。分析事件复用 `src/lib/analytics.ts`，只传分类、来源和非敏感路径，不传自由文本或邮箱。
- 相关配置与验证：`.env.example`、目标模板的样式、反馈专属验证脚本/用例；将专用 POST 接口加入源码检查白名单，但不加入公开内容路由集合。如实际修改导航结构，同步调整固定导航计数的检查。无需新建公开页面、改 canonical、robots 或 sitemap。
- [推断] 模板和 Guitar 复用时先复制并适配经过 Piano 试运行的通用模块、配置接口和视觉规则；独立仓库之间同步由后续明确的移植变更完成，本轮不建立未验证的共享 npm 包或跨仓库运行时依赖。

## 6. 分阶段验收与发布边界

1. **上线前**：专用私有反馈仓库已创建；仍须配置并验证最小权限运行令牌、限流、数据处理与 GA4，并验收服务端返回合同。未配置时不渲染提交入口。
2. **本地交互**：桌面 1440px、平板 768px、手机 390px/375px 验证 Footer（含首页）、移动 Menu、弹窗、键盘与软键盘；表单焦点、标签、错误通知、Escape、关闭后的焦点恢复和 200% 文字缩放实测。
3. **功能合同**：`/chords/c-major` 的 `Not really → content_error → 文字` 产生正确的产品、路径、来源、实体和真实持久回执；`Yes` 不弹表单，单次页面展示中只触发一次事件；移动菜单 `I have an idea` 成功；超时、429、接收端失败保留输入；未配置入口不可用。
4. **防护与数据**：测试无效字段、超长内容、恶意路径、重复提交、honeypot、限流、敏感 query/referrer 不外传；反馈正文不注入接收端标题/标签/日志。确认正向事件不产生大量 Issue。
5. **回归**：运行 `npm run check`、适用的项目检查和 `npm run build`，再用真实浏览器检查代表性页面及接收端写入。记录自动检查、人工读屏/真机未完成项，不把构建通过称作完整无障碍验收。

[已核实] `https://pianogrid.com` 为既有公开站点。此方案修订不授权重新部署、改 DNS、索引策略或覆盖生产；本地实现与验收完成后再依据当时的发布授权处理上线。实施状态与验证状态分别记录。

## 7. 本次实施验证记录（2026-09-22）

- [已核实] `npm run check`（Foundation 568 项、TypeScript、CSS）和 `npm run check:feedback` 通过；`npm run build` 完成 212 个静态页面，并列出动态 `POST /api/feedback` 接口。
- [已核实] 本地浏览器覆盖首页与内页 Footer、移动菜单、键盘关闭与焦点恢复、页面有用性提问、失败时保留输入、关闭配置时隐藏入口。接口检查覆盖错误 Origin、内容类型、超长请求及非法路径。用本地开发凭据向私有仓库创建三条测试 Issue，核对来源、路径和实体后均已关闭；生产没有设置该凭据。
- [已核实] 浏览器构建文件未匹配到 `api.github.com/repos`、`FEEDBACK_GITHUB_TOKEN` 或接收仓库名。真实手机、读屏器和已部署反馈接口的防刷验证仍未完成；当前生产仅验证了尚无反馈接口时的 WAF 路径级拦截。
- [已核实] 历史集成数据脚本因未修改的受保护源文件哈希断言失败；集成批次脚本还与当前页面标题、导航数量基线不符。记录为既有检查基线问题，不把它们报告为通过，也不在本次反馈任务中改动内容源文件或放宽断言。
- [已核实] [Vercel 防火墙限流与上线门禁](feedback-launch-gates.md)中的路径级规则已生效，当前生产尚无反馈接口；连续第 6 次匿名 POST 已返回 429，首页与 robots 仍返回 200。[待决] 仍需创建仅对反馈仓库授予 Issues 写权限的运行令牌，确认反馈邮箱的保留/删除流程，并在真实预览接口复验。上述条件完成后才能配置生产环境、重新构建并按发布流程验收。当前 `FEEDBACK_ENABLED=false`，反馈功能线上不可用。
