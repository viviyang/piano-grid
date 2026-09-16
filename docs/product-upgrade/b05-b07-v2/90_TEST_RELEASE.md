# 测试、交接与发布

## 验收数量与边界
本包定义 **71 条生产验收用例**，全部初始PENDING，见data/acceptance.json。未在你的仓库执行，不声称这些已通过。
设计原型自己的检查单独在checks目录；不能代替生产验收。

## 每批节奏
一个task只改相关路径→跑targeted tests→保存日志→截图→更新WORK_LOG；失败先最小复现再修，不整批推倒。
同一失败连续两次修改仍未解决，停止盲改并输出复现/假设/实际差异；不得删测试或改断言掩盖问题。Cursor可在现有会话继续定位，真正权限/材料阻塞再请用户处理。
B05/B06自动验收通过写READY_FOR_NEXT_BATCH，发NEXT_PROMPT给新会话。无需每批再让用户批准一次设计，也不自动发布。
B07跑全部受影响回归，写READY_FOR_MANUAL_ACCEPTANCE；不是RELEASED。

## 测试执行必须真实
读取实际package scripts后选择命令；优先项目既有test harness。命令必须有开始/结束/exit code/stdout文件。
交互测试走真实状态机；音频失败在owner/API边界模拟，不能跳过owner直接插DOM。
截图=视觉证据，不是单独行为证据。每个测试关联具体断言/截图/日志。
外站需要账户的流程只测试真实href和条件呈现，不自动填表登录或下载。

## 视口与状态截图
Desktop 1440×1000；Mobile 390×844；补320×740及200%zoom功能检查。
B05：cards/start、step1、step2、step5、finished(0勾/部分勾)、share、expired、external资料未就绪、Sheet访问页。
B06：resource初始、paper切换、worksheet preview、share、print选择、下载失败、完整PDF六页渲染。
B07：最终各主要页面首屏与head/link检查。
生产主题token可造成细节差异；布局、主动作、版本透明度、焦点、失败处理不能与稿相反。

## 交接位置
`docs/product-upgrade/b05-b07-v2/delivery/b05|b06|b07|final/`。
每批：RESULT.md、TEST_REPORT.md、ROUTE_DIFF.md、OWNER_MAP更新、SCREENSHOT_DIFF.md、CONTENT_BLOCKERS.md、NEXT_PROMPT.md。
最终：MANUAL_CHECKS.md（最多5组实际动作）、RELEASE_NOTES.md、ROLLBACK.md、BASELINE.json、命令日志和原始结果JSON。

## 可恢复handoff
- 相对base的tracked patch；新增文件以路径树包含，不把git diff不包含untracked误称FULL。
- 不含node_modules/.next/.git/密钥/env真实值/用户隐私。说明构建步骤与lockfile。
- manifest列每文件sha256；FULL.diff不得混PowerShell警告。
- 在安全临时副本按base+patch+new-files恢复并核验hash。不要在用户生产目录做reset/clean试验。
- 未获提交授权可交patch+新增文件；不为做版本点偷偷commit。

## 人工门禁（一次）
用户做：Windows/iPhone分享与外站返回；实际听音快速回归；读屏基础；一种实际纸张打印并预览另一种。内容权限或新谱专业核验不能由自动PASS替代。
没有人工操作就标PENDING，不捏造“真机通过”。不自动收集儿童信息。

## 发布授权Prompt（用户验收后使用）
```text
B05/B06/B07人工验收通过。请只发布本轮已验收范围。
先核对当前branch/改动归属，按现有部署流程创建可回滚提交、推送和部署。
不要把无关dirty文件加入提交。部署后验证/songs/easy、三首Sheet、Labeled teaching-pack、Tools、旧B03分享和B04。
核验PDF两种格式、分享生产域名、canonical、sitemap与已配置事件接收。
如有P0故障按ROLLBACK执行；停止扩功能，给最终线上结果及commit/deploy标识。
```
此段只是未来授权模板，本次把文档交给Cursor不等于授权发布。
