# Scales 当前发布汇总

候选：`scales-launch-79faa6c539d6`；基线 HEAD：`10234b12380a21f26c544e9392bacd1f0545a384`；分支：`main`。候选由 68 个产品文件的相对路径与 SHA-256 生成，证据与生成报告不参与指纹。

## 六个独立状态

| 状态 | 结论 | 证据与边界 |
|---|---|---|
| `PRODUCT_READY` | `PASS_LOCAL_CANDIDATE` | [已核实] 27 页完整输入、74 条来源、23 页 102 FAQ；契约 9/9、670/670、13/13；8 个固定 PDF 与方案包 hash 一致。 |
| `BUILD_READY` | `PASS_WITH_INFRA_NOTE` | [已核实] `npx next build --webpack`（Next 16.3.4）成功，202 个静态输出；默认 Turbopack 因隔离工作树的 `node_modules` junction 指向工作树外而在编译前失败。未升级依赖。 |
| `PUBLIC_LIVE` | `AUTHORIZED_PENDING_EXECUTION` | [已核实] 线上 `/scales`、`/scales/c-major`、`/scales/a-minor` 与两份旧 PDF 为 200；抽查的新路由和六份新 PDF 为 404。用户已于 2026-09-14 授权提交、推送与生产部署；本文写入时尚待执行。 |
| `MEASUREMENT_LIVE` | `BLOCKED_ACCOUNT` | [已核实] 单一本地事件适配器、白名单字段和同意门已实现；默认 provider=`none`，未注入 SDK。没有真实 GA4 配置或后台接收证据。 |
| `TRUST_PRIVACY_READY` | `DRAFT_READY_UNPUBLISHED` | [已核实] 内容稿已准备；运营者名称、联系邮箱、实际国家、受众/儿童处理和隐私处理事实未确认，未新建支持 URL。 |
| `ADS_LIVE` | `BLOCKED_ACCOUNT` | [已核实] 仅有默认关闭的本地布局预览；无 publisher ID、ads.txt、CMP 配置、AdSense 申请/批准或真实广告请求。收入 `NOT_OBSERVED`。 |

## 本轮验证

[已核实] 27/27 初始 HTML 均为 200、单一 H1、正确 canonical 与 `index, follow`；23 页初始 HTML 完整含 102 问/102 答；27 个候选目标均有入链。三档 viewport 共 81 次检查无整页横向溢出。六份当前打印证据共 7 页已逐页渲染；G 左手与高音 notes-only 两个 view 分离，切换后生产模式事件不重复。打印前练习由 `counting` 变为 `idle`，`afterprint` 不恢复。

[已核实] 本轮唯一一次整站扫描读取当前 sitemap 的 197 条实际 URL：页面失败 0、349 个内部目标断链 0、8 个资源失败 0、robots 200、随机不存在路径 404。此处 197 是本次候选的实测值，不是历史常量。

## 未完成且不得代签

`OWNER_GATE` 中六项人工检查均为 `NOT_RUN`；真实 GA4/GSC/CMP/AdSense 后台均无授权证据。禁止据此声明真机、读屏、实体打印、索引、广告审批或收入已通过。
