# BLOCKED，scope=P0

## 执行基线与阻塞

[REPO_VERIFIED] 工作区已确认是 `C:/Users/Admin/Documents/viviyang_github/piano-main-product-audit`。实际HEAD为 `c1a017a533289616b84e354c97f1345114f809e2`，detached；用户指定基线及本次fetch核对的远端main为 `d15c0142cc6d00b01d060ba17092000a5bf060ca`。相差一个提交，涉及Chords Hub、Keyboard Notes、共用RollingText/CSS及回归脚本，与本轮曝光锚点和回归范围相关，不能当无关变更忽略。

[REPO_VERIFIED] 开始时tracked diff为空；未跟踪内容为根目录 `10_P0_REVIEW_AND_EXECUTION.md` 和原审计包。指定位置 `docs/product-system-audit-2026-09-22/10_P0_REVIEW_AND_EXECUTION.md` 不存在，已完整读取根目录同名文件，未搬动/覆盖；其正文仍写c1a017a，优先服从用户本轮明确指定的d15c014。

用户明确要求“不自动切换基线”；根目录执行文件第2节也要求相关远端变化先定位冲突与安全对齐方案。因此本轮没有创建旧基线实施分支、切换HEAD或开始产品修改。已提交一条基线对齐授权问题；无回复不视为授权。

最小安全对齐方案：核对无其他会话同时写入；保留原审计51个文件的清单/hash和根目录指令；确认新基线没有同名tracked路径冲突；获准后在本工作区由精确d15c014创建 `codex/product-system-p0`，不merge/rebase、不改变原piano工作区；重新跑基线门禁。该方案尚未执行。

## 本轮执行与证据

证据目录：`checks/product-system-p0-2026-09-22/`。

| 项目 | 实现状态 | 验证状态 | 证据 |
|---|---|---|---|
| 前置检查 | 已执行只读Git/资料核对 | BLOCKED：实际HEAD与要求不符 | preflight.json、remote-files.txt、remote-relevant.diff |
| P0-0 | 已复现旧HEAD数据检查并重新计算26项hash；未改检查器/expected | 126 PASS / 26 FAIL；exit 1；不能当d15验收 | integration-data-old-head.log、preflight-old-head/data-validation.json、hash-diagnosis-current.json |
| P0-1 | NOT_STARTED | NOT_RUN；依赖P0-0 | 无产品diff |
| P0-2 | NOT_STARTED | NOT_RUN；事件语义/浏览器验收尚未开展 | 不将旧审计映射冒充本轮已核验实现 |
| build/check/scale/browser | 本轮未运行 | NOT_RUN：先解决基线授权，避免在错误HEAD形成验收 | 旧审计结果不计本轮PASS |
| P1 | DEFERRED | 未实施，不计PASS | 用户本轮范围 |
| 统计后台 | 未操作 | BACKEND_NOT_VERIFIED | 未向生产GA4/Clarity发送测试 |
| 真机/读屏/听音/纸张打印 | 未执行 | NOT_RUN | 不代签人工验收 |

本次实际执行命令：`git rev-parse`、`git status`、`git ls-remote`、`git fetch origin main`、`git worktree list --porcelain`、`git diff HEAD d15c014 -- ...`、只读源码/规则/审计证据读取；`PIANO_CHECK_OUT=checks/product-system-p0-2026-09-22/preflight-old-head node scripts/check-integration-data.mjs`（exit 1）；`preflight.py`（exit 0）。未运行生产服务或浏览器。根目录执行文件读取成功；指定文档路径读取失败已记录，不伪造该路径已存在。

## 26项失败及真实变化

[REPO_VERIFIED] 对本次失败集合逐项比对expected、工作树原字节、仅CRLF→LF、Git HEAD blob和目标d15 blob。23项归一化字节同时等于HEAD blob和原expected；3项不满足原expected，且d15中这26个文件均与旧HEAD相同。完整字段/哈希见 `hash-diagnosis-current.json`，逐项表见本文末尾。没有新增第27项失败；没有宽泛trim、JSON重排或全局换行配置修改。

三项真实变化最后修改提交均为 `9937d528d78857056356bc440d22348cc4c19fe2`：

| path | actual_diff / affected_scope | approval_reference | disposition |
|---|---|---|---|
| docs/content/site-master/A-Scales/batch-page-content.json | AM-MIDI源URL、title、publisher、核查日期、access、supports、locator改变；source-change-1.diff | [UNRESOLVED] 本轮定向搜索未取得覆盖该精确变更的用户批准记录 | 保留FAIL；未更新expected |
| docs/content/site-master/A-Scales/batch-source-ledger.md | 同AM-MIDI来源记录；source-change-2.diff | [UNRESOLVED] 同上 | 保留FAIL |
| docs/content/site-master/source-ledger.master.md | 同AM-MIDI主来源记录；source-change-3.diff | [UNRESOLVED] 同上 | 保留FAIL |

变化将CMU托管的MIDI附录引用替换为MIDI Association概览，支持范围也由“C4=60和音号表”改为“规范官方入口”。本次仅核对Git差异，没有重新进行外部来源研究，也没有声称新引用仍支持旧主张。“已在main”不能代替受保护来源变更批准。基线对齐后仍须完成该批准链核对；未找到时按执行文件第3节保留阻塞，不自动改hash。

## 测量与回归的状态边界

本轮未进入P0-2，因此没有“实际已实现事件映射”、曝光去重或分母上线结果。待实施的合同仍以根目录执行文件第5节为准：检查实际trigger，不将scale组件挂载等同可见结果；新测量仅九页；logical view×对象/必要状态去重；Finder稳定输入、计算结果和可见曝光分开；去重参与曝光数除以同范围有效曝光数，零分母NO_DATA；本地stub，不发生产数据。以上是待执行要求，不是通过证据。

没有前后浏览器截图或guide跳转记录；不能复用上个任务截图称为本轮通过。没有修改公共代码、路由、metadata、TDH、导航、主题、音乐引擎、PDF或来源。原piano/codex/chords-b1工作树没有写入、暂存、清理或搬迁。

## 变更文件与恢复入口

新增仅 `checks/product-system-p0-2026-09-22/` 下的诊断脚本/日志/JSON/diff，以及本RESULT；原审计包和根目录指令保持原位。`git diff`为空不代表没有交付文件，完整新文件清单见 `delivery-files.json`。未修改tracked产品或测试文件；没有commit、push、merge、deploy。

当前需要先确认是否授权精确对齐d15c014并创建实施分支。此确认来自用户“不自动切换基线”的明确限制，非技能新增审批。待基线对齐，再处理受保护来源批准链和P0-0实际门禁，才能依序实施P0-1/P0-2。

## 人工验收与后续边界

目前没有可交付的P0产品改动供人工验收；不得将以下未来步骤记为已验。

| 入口 | 动作与预期 | 验证类型 |
|---|---|---|
| 本工作区 | 确认HEAD/实施分支/审计文件hash与冻结基线相符 | 基线授权后本地 |
| /chords/finder | 按帮助选择C/E/G、选bass、清空；帮助不要求八度输入框 | 实施后生产build浏览器 |
| /guide/piano-chords | 点击由音找和弦入口，进入Finder且语义匹配 | 实施后浏览器 |
| 九页试点 | 答案可见前无新曝光，可见后一次；重复滚入/rerender不增计；非试点无新增事件 | 实施后自动化+浏览器stub |
| 真机/读屏/真人听音 | 检查受影响操作与既有行为，记录设备/人员/实际结果 | 适用人工项，当前NOT_RUN |
| GA4测试路径 | 已授权情况下核对事件收数与参数；无权限保留未验 | 后台，当前未授权操作 |

P1未来顺序澄清：最小object/context/state协议与fixture → P1-2接收器 → P1-1呈现 → P1-3来源/资产。P0后仍需新范围确认。Page Gate的Unique Utility指独立任务价值，不要求每页独占控件；有下一步入口也不要求用户点击。本轮不改变索引决策。

## 逐项处理表

| # | Path | 重新核对分类 | 处理 |
|---|---|---|---|
| 1 | docs/content/site-master/A-Scales/batch-page-content.json | REAL_CONTENT_CHANGE | 仅诊断，未放行/未改expected |
| 2 | docs/content/site-master/A-Scales/batch-source-ledger.md | REAL_CONTENT_CHANGE | 仅诊断，未放行/未改expected |
| 3 | docs/content/site-master/assets/blank-keyboard-13-keys.svg | CRLF_ONLY | 仅诊断，未放行/未改expected |
| 4 | docs/content/site-master/assets/blank-keyboard-25-keys.svg | CRLF_ONLY | 仅诊断，未放行/未改expected |
| 5 | docs/content/site-master/assets/Bravura-LICENSE.txt | CRLF_ONLY | 仅诊断，未放行/未改expected |
| 6 | docs/content/site-master/preserved-chords/assets/a-flat-major--root.svg | CRLF_ONLY | 仅诊断，未放行/未改expected |
| 7 | docs/content/site-master/preserved-chords/assets/a-major--root.svg | CRLF_ONLY | 仅诊断，未放行/未改expected |
| 8 | docs/content/site-master/preserved-chords/assets/a-minor--first.svg | CRLF_ONLY | 仅诊断，未放行/未改expected |
| 9 | docs/content/site-master/preserved-chords/assets/a-minor--root.svg | CRLF_ONLY | 仅诊断，未放行/未改expected |
| 10 | docs/content/site-master/preserved-chords/assets/a-minor--second.svg | CRLF_ONLY | 仅诊断，未放行/未改expected |
| 11 | docs/content/site-master/preserved-chords/assets/b-major--root.svg | CRLF_ONLY | 仅诊断，未放行/未改expected |
| 12 | docs/content/site-master/preserved-chords/assets/c-flat-major--root.svg | CRLF_ONLY | 仅诊断，未放行/未改expected |
| 13 | docs/content/site-master/preserved-chords/assets/c-major--root.svg | CRLF_ONLY | 仅诊断，未放行/未改expected |
| 14 | docs/content/site-master/preserved-chords/assets/c-minor--root.svg | CRLF_ONLY | 仅诊断，未放行/未改expected |
| 15 | docs/content/site-master/preserved-chords/assets/e-major--root.svg | CRLF_ONLY | 仅诊断，未放行/未改expected |
| 16 | docs/content/site-master/preserved-chords/assets/g-major--root.svg | CRLF_ONLY | 仅诊断，未放行/未改expected |
| 17 | docs/content/site-master/source-ledger.master.md | REAL_CONTENT_CHANGE | 仅诊断，未放行/未改expected |
| 18 | docs/design/piano-final/chords/a-minor/index.html | CRLF_ONLY | 仅诊断，未放行/未改expected |
| 19 | docs/design/piano-final/index.html | CRLF_ONLY | 仅诊断，未放行/未改expected |
| 20 | docs/design/piano-final/requirements-dev.txt | CRLF_ONLY | 仅诊断，未放行/未改expected |
| 21 | docs/design/piano-final/source/app.js | CRLF_ONLY | 仅诊断，未放行/未改expected |
| 22 | docs/design/piano-final/source/browser_config.py | CRLF_ONLY | 仅诊断，未放行/未改expected |
| 23 | docs/design/piano-final/source/build.py | CRLF_ONLY | 仅诊断，未放行/未改expected |
| 24 | docs/design/piano-final/source/render.py | CRLF_ONLY | 仅诊断，未放行/未改expected |
| 25 | docs/design/piano-final/source/verify.py | CRLF_ONLY | 仅诊断，未放行/未改expected |
| 26 | docs/design/reference/final-a-minor.html | CRLF_ONLY | 仅诊断，未放行/未改expected |
