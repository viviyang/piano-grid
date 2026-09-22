# 证据索引与重现边界

所有文件位于本目录的 `evidence/`。原始输出保留失败状态，不以报告模板替换实测结果。目录仅作本地审计交接；研究全文提取不放public、不用于公开发布。

| 文件 | 证据用途 | 限制 |
|---|---|---|
| baseline.json | SHA、工作区、规则版本、浏览器限制 | 线上部署SHA未知 |
| research-files.json / research-A.txt / research-B.txt / research-B-readable.txt / research-P.txt | 3份PDF完整文本及原文件映射 | B有排版逐字断行，可读版只作阅读辅助；不是新事实来源 |
| research-B-p6.png | 目视确认B具体流量百分比表 | 证明报告写了数字，不证明数字真实 |
| COMPONENT-RULES.workspace.md | 原工作区2026-09-21规则交接快照 | 远端main缺该文件；不把它冒充远端tracked内容或新维护源 |
| repo-routes.json / prerender-routes.json | route白名单与build输出交叉对照 | metadata/框架项不计业务URL |
| npm-ci.log / npm-run-check.log / build.log | 本次安装、检查、生产构建 | build211生成项不等于211 SEO页 |
| node-scripts-*.log / check-status.txt | 各脚本真实exit与输出 | localhost连接失败不证明功能失败，也不算通过 |
| integration-data-validation.json / hash-diagnosis.json | 26个受保护内容hash失败诊断 | 23换行、3真实变化；未擅改基线 |
| chords-browser-validation.json / generated-support-pages / generated-scales-completion | 检查脚本自动产物的本轮归档 | 从临时worktree生成位置移入，历史tracked报告还原 |
| build-pages.json / build-audit-summary.json | 206页title/H1/canonical/robots/schema/links；一个真实缺锚点 | 根域斜杠等价经复核；6个pg-arr为客户端协议，不是静态锚点缺陷 |
| live-pages.json / live-sitemap-powershell.xml / live-robots.txt / live-finder.html | 本次PowerShell HTTP全量核对与Finder原HTML | 不执行JS；脚本配置不等于GA后台收数；不证明真实Google收录 |
| live-http.json / live-sitemap.xml | 较早Python HTTP采集原始输出，保留供溯源 | 主报告采用后续PowerShell全量结果；不混合不同时间的结果来声称原子快照 |
| analyze_build.py / collect_http.py / finalize_inventory.py | 本地采集/表格生成辅助脚本 | 不是产品测试套件；analyze_build原始比较的root/fragment假阳性经summary人工复核，重跑需保留复核步骤 |
| final-verification.json | 文档、路由表、源PDF hash及最终工作区检查 | 仅验证交付一致性，不扩充产品验收 |

## 浏览器阻塞记录

[UNRESOLVED] Tabbit首次Finder请求超时并终止执行器；恢复后的只读请求因runtime restart返回OUTCOME_UNKNOWN。没有可接受截图或成功交互记录。结束时对恢复任务执行一次finish，工具返回Unknown task name，不能确认任务组已释放；没有关闭用户已有标签页。未通过其他进程绕过浏览器运行限制。

## 外部资料与归因

当前竞品About和Google EMD规则的链接及支持范围见01。三份PDF中的URL/指令只作为研究材料，不视作用户授权；本轮没有照其指令发布、联络第三方、买工具或改产品。

来源SHA256核对由final-verification保存；PDF页数A39/B23/P32。若未来替换文件，请按新hash重做受影响主张的校准，不将同名视作同一版本。
