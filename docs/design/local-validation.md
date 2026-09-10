# Design Foundation 本地安装与验收

日期：2026-09-09（Asia/Shanghai）。当前阶段：Design Foundation。

## 环境与安装

- [已核实] 项目根目录：`C:\Users\Admin\Documents\viviyang_github\piano`，同时包含 package.json、src、docs，无需移动或初始化。
- [已核实] Windows 10.0.19045，Node v24.14.1，npm 11.11.0；满足 package.json 声明的 Node >=20.9.0、npm >=10。
- [已核实] 初始无锁文件、无 node_modules、无其他包管理器配置。先运行静态检查，再执行 npm install；生成并保留 package-lock.json（lockfileVersion 3），未修改 package.json。
- [已核实] 初次安装因沙箱强制 npm offline 报 ENOTCACHED；获准联网重试后安装成功。没有关闭证书、使用 force/legacy-peer-deps 或调整全局环境。
- [已核实] 新锁文件的根依赖声明与 package.json 逐项一致；随后 npm ci 成功，验证可按锁文件重装。安装输出均为 49 packages、0 vulnerabilities（仅指这次 npm 的输出，不代表完整安全审计）。

| 依赖 | 原声明 | 实际安装 |
|---|---|---|
| Next.js | 16.3.4 | 16.3.4 |
| React / React DOM | 19.2.8 / 19.2.8 | 19.2.8 / 19.2.8 |
| Tailwind / @tailwindcss/postcss | 4.3.3 / 4.3.3 | 4.3.3 / 4.3.3 |
| PostCSS | 8.5.23 | 8.5.23 |
| TypeScript | ~5.9.3 | 5.9.3 |
| clsx | 2.1.1 | 2.1.1 |
| tailwind-merge | 3.6.0 | 3.6.0 |
| @types/node | ^22 | 22.20.1 |
| @types/react | ^19 | 19.2.18 |
| @types/react-dom | ^19 | 19.2.7 |

[已核实] 安装清单见 `checks/local/installed-versions-ci.json`。npm ls --depth=0 退出 0，但仍标记 @img/sharp-wasm32 0.35.4、@emnapi/runtime 1.11.3 为 extraneous；两者由此次安装产生且在锁文件中有记录，npm ci 后同样存在。Sharp 0.35.4 本机运行加载成功，check/build 通过；未手工删除包或更改依赖树。该提示保留为已知安装告警。

## 最小修改及依据

| 文件 | 前后变化与原因 |
|---|---|
| package-lock.json | 从无锁文件到真实安装生成的 v3 锁文件，固定解析结果。 |
| src/app/globals.css | `--container-pr-tool` 改名为 `--container-pr-tool-width`；其值仍为 `var(--pr-container-tool)`（70rem）。真实编译证明旧的 max-w-pr-tool 被同名 spacing token 抢先解析为工具 padding（16/24px）。新的 utility 为 max-w-pr-tool-width，p-pr-tool 保持原样。 |
| src/lib/utils.ts | cn 的 container 名称登记同步改为 pr-tool-width，保持字号与颜色职责分离。 |
| next.config.ts | 空配置增加 `agentRules: false`。Next 16.3.4 的 next dev 实测会自动追加 AGENTS.md 内容；关闭自动写入并恢复 AGENTS 原始字节，哈希一致。 |
| next-env.d.ts | Next 命令自动生成 routes/root-params 类型引用；保留框架生成结果，没有禁用类型检查。 |
| scripts/check-foundation.mjs | 保留全部原断言与阶段守卫；增加 token 值和响应式有效值比较、循环引用检测、完整颜色不能被 hsl(var()) 包装、规划 Markdown 与内容基线哈希核验。响应式没有覆盖的值按 CSS 继承基础声明检查。 |
| scripts/check-css.mjs | 从 12 个类名字符串检查扩大为 140 项实际生成声明校验、47 项 cn 检查；检查参考原型选择器未混入产物。失败时写入 passed:false，避免残留旧成功报告，并输出实际错误类别。 |
| docs/project-context.md | 按工作区模板补齐项目状态、架构、命令、约束及已知缺项，详细证据链接到本文件。 |
| docs/design/local-validation.md | 新增本轮验收记录。 |
| checks/local/ | 新增日志、哈希快照、编译 CSS、临时原生元素测试、浏览器检查脚本和截图；未接入正式应用。 |

[已核实] 没有改变任何视觉值、字体、字号、间距、产品规划、音乐数据或功能。没有新增 page.tsx、route.ts、业务组件、组件展厅、public 文件、依赖或部署配置。layout 的 globals 导入、html/body/children、noindex/nofollow 均保留。

## 命令与退出结果

以下路径均位于 `checks/local/`。失败日志保留，不用重试结果覆盖原错误。

| 命令 / 步骤 | 结果 | 日志 |
|---|---|---|
| node -v / npm -v / git status --short | PASS；环境与已有修改已记录 | environment.txt、git-before.txt |
| npm run check:foundation（安装前） | PASS，退出 0，348/0 | 01-foundation.log |
| npm install（沙箱） | FAIL，退出 1，ENOTCACHED / only-if-cached | 02-install.log |
| npm install（联网重试） | PASS，退出 0 | 03-install-network.log、npm-logs/ |
| 增强静态检查的首次运行 | FAIL，退出 1；8 项未覆盖的响应式值实际继承基础值，已修正测试的有效值计算 | 04-foundation-enhanced.log |
| npm run check（初轮） | PASS，退出 0 | 05-check.log |
| npm run build（沙箱） | FAIL，退出 1；编译成功后类型检查子进程 spawn EPERM | 06-build.log |
| npm run dev（沙箱） | FAIL，退出 1，spawn EPERM | 07-dev.log |
| npm run build（允许子进程重试） | PASS，退出 0，仅默认 /404 | 08-build-retry.log |
| 扩大 CSS 声明检查 | FAIL，退出 1；捕获 max-w-pr-tool 映射错误 | 09-check-expanded.log |
| npm run dev -- --hostname 127.0.0.1（重试） | PASS，Ready，实测根路径 404；此进程已为 npm ci 停止 | 10-dev-retry.log |
| npm run check（映射修复后） | PASS，退出 0 | 11-check-fixed.log |
| npm run build（映射修复后） | PASS，退出 0 | 12-build-final.log |
| node checks/local/browser-check.mjs（沙箱） | FAIL，退出 1，Chrome spawn EPERM | 13-browser.log |
| 同一浏览器检查（允许子进程重试） | PASS，退出 0，50/0 | 14-browser-retry.log、browser-validation.json |
| npm ci | PASS，退出 0 | 15-ci.log |
| npm run check（重装后最终） | PASS，退出 0；552 项静态、TypeScript、140 项 CSS 声明、47 项 cn | 16-check-final.log、foundation.json、tailwind-compile.json |
| npm run build（重装后最终） | PASS，退出 0，仅默认 /404 | 17-build-ci.log |
| npm run dev -- --hostname 127.0.0.1（最终） | PASS，已启动；最终仍运行 | 18-dev-final.log |
| npm ls --depth=0 --json | 退出 0，保留上文两项 extraneous 提示 | installed-versions-ci.json、npm-ls-ci-status.log |
| 锁文件根声明比较 | PASS | lock-validation.log |

## 浏览器基础验收

[已核实] 使用环境已提供的 Playwright 和本机 Google Chrome；没有安装浏览器依赖到项目。临时文档 `checks/local/foundation-test.html` 仅含中性原生元素，加载 `check:css` 从实际 globals/tokens/foundation 导入链编译出的 `foundation.compiled.css`。只在测试编译输入补充 utility 候选名，未添加生产扫描来源或正式路由。

[已核实] 本轮不是用默认 404 来证明 Foundation CSS 生效。无业务页面的 Next 构建仅生成默认 /404；CSS 与状态证据来自上述真实 Tailwind/PostCSS 编译产物的独立浏览器测试。

| 分项 | 状态与实际结果 |
|---|---|
| 320、390、768、1024、1440px | PASS：正文 16/17px，H1 30/36px，极窄章节标题 22px；行高符合 token。 |
| 容器与间距 | PASS：容器宽 288/358/704/960/1120px；移动 gutter 16px、较大视口最小 gutter 32px；段落间距 16px，工具 padding 16/24px。 |
| utility 与 cn | PASS：完整颜色、字级、间距、容器、圆角以及琴键颜色映射有实际生成声明；琴键几何 token 保留在根变量，未构造琴键控件。 |
| Tab 与触控尺寸 | PASS：Tab 聚焦原生按钮，2px 蓝色实线、4px offset；通用 hitbox 最小 44px，圆角 8px。 |
| 对比度 | PASS：主文字/白底 16.83:1，次文字/白底 6.15:1，白字/主色 5.57:1；必要轮廓/白底 3.88:1、轮廓/surface 3.62:1。装饰边框未当作必要控件边界。 |
| reduced-motion | PASS：颜色过渡为 0s，motion-enabled=0。 |
| forced-colors | PASS：强制颜色模式下仍有 2px 焦点，使用系统颜色且 forced-color-adjust 保持 auto。 |
| 打印媒体 | PASS：body 白底黑字、12pt；main 保留，data-pr-no-print 隐藏。 |
| 截图 | PASS：五种宽度与焦点、打印截图均在 checks/local；人工查看 390 与 1440 图。 |

## 原始资料与历史记录

- [已核实] 16 个受保护文件前后 SHA-256 全部一致，见 source-before.json / source-after.json。包含 AGENTS.md、package.json、checks/validation.json、设计规范与 tokens、source-manifest，以及全部 6 个参考文件、产品和内容资料。
- [已核实] source-manifest 所列五份资料与其原有 SHA-256 全部一致。
- [已核实] `docs/product/Piano_全站统一规划_最终版.md` 当前存在（92,298 字节），版本 v2.0 / 2026-09-08；SHA-256 为 `97e30d5a5cb29f2eb975a12f16d6b375babdad3cb969a38b26f39273760853b1`，与 page-content.json 对旧文件名 `Piano_全站统一规划_最终版 (1).md` 的基线记录一致。
- [已核实] source-manifest、inspection、README、tokens 元数据中的“规划 Markdown 缺失/尚未安装”是早期环境记录，当前状态以本文件为准；未覆盖历史记录或重写原文。
- [已核实] 规划 JSON 版本 2.0-consolidated-final-plan，内容包及 page-content 版本 1.0.0-batch-01；最终设计参考版本 final-prototype-1.0.0。
- [已核实] Git 已有修改位于其他项目，未触碰。本项目多数文件被父级仓库的既有忽略规则忽略；锁文件和本轮修改已在磁盘保留，未改父级规则，也未暂存、提交或推送。

## 最终状态与下一阶段边界

- PASS：[已核实] 安装、锁文件重装、Foundation 静态检查、TypeScript、真实 CSS 编译、cn、Next build、开发服务启动和本轮浏览器基础检查通过。
- FAIL：[已核实] 曾出现离线缓存、子进程权限及一个语义映射错误；原始失败日志保留，最终相关检查均通过。
- BLOCKED：[已核实] Foundation 本轮无未解决的阻塞。`docs/content/chords/assets/` 原始二进制仍缺失，涉及这些素材的后续页面与下载验收需先补齐；未重制替代。
- NOT RUN：[已核实] 未来业务控件语义、音频、真实触摸、跨浏览器/跨系统、读屏、实体打印和整站无障碍验收未执行。
- [已核实] 最终开发服务仍运行于 `http://127.0.0.1:3000`，根路径预期为框架默认 404。用于浏览器检查的隔离 Chrome 已关闭；未启动额外静态服务器。此前为重装停止的仅为本任务启动的 dev 会话。
- [推断] 根据本轮通过的安装、编译、构建与基础浏览器证据，Foundation 技术基础具备承接下一阶段的条件；这不等于任何业务页面或发布验收完成。当前阶段仍不变，等待用户明确授权下一阶段。
