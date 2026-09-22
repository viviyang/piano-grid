import json,hashlib,subprocess,datetime
from pathlib import Path
r=Path.cwd();e=r/'checks/product-system-p0-2026-09-22';d=r/'docs/product-system-p0-2026-09-22';d.mkdir(exist_ok=True)
def read(p):return json.loads(p.read_text(encoding='utf-8-sig'))
def write(p,obj):p.write_text(json.dumps(obj,ensure_ascii=False,indent=2),encoding='utf8')
for receipt,target in [('browser-p0-visibility-single-receiver-receipt.json','browser-p0-visibility.json'),('browser-existing-audio-receipt.json','browser-existing-audio.json'),('browser-scale-baseline-receipt.json','browser-scale-baseline.json'),('browser-keyboard-round-receipt.json','browser-keyboard-round.json')]:
 x=read(e/receipt);p=Path(x['result']['value']['path']);(e/target).write_bytes(p.read_bytes())
hashes=read(e/'hash-diagnosis-current.json')
for h in hashes:
 real=h['classification']=='REAL_CONTENT_CHANGE';h['disposition']='APPROVED_EXACT_AMENDMENT_PASS' if real else 'EXPLICIT_CRLF_LF_COMPATIBILITY_PASS';h['approval_reference']='User 2026-09-22: 批准 (three named AM-MIDI source changes)' if real else 'P0-0 approved portability scope';h['affected_scope']='AM-MIDI source record; no notes/MIDI values changed' if real else 'Only CRLF versus LF';h['current_result']='PASS'
write(e/'hash-disposition-final.json',hashes)
with (e/'source-decision.md').open('a',encoding='utf8') as f:f.write('\n\n## 2026-09-22 后续批准及执行\n\n[已核实] 上述“未批准”是历史状态。用户随后明确回复“批准”，覆盖三项已列文件在9937d528中的AM-MIDI来源记录变化。已在scripts/protected-source-amendments.json精确记录旧/新hash、提交、批准原文；未改来源内容，原hash清单仍保留。数据检查152/152通过。概览不能直接证明C4=60的来源映射限制继续保留，不等于专业审阅通过。\n')
head=subprocess.check_output(['git','rev-parse','HEAD'],text=True).strip();remote=subprocess.check_output(['git','rev-parse','origin/main'],text=True).strip()
write(e/'stage-baseline.json',{'timestamp':datetime.datetime.now(datetime.timezone.utc).isoformat(),'head':head,'branch':'codex/product-system-p0','remoteMainAtFinalFetch':remote,'policy':'latest main at stage start; freeze within stage; final fetch and targeted review','sourceApproval':'User 2026-09-22: 批准; exact three amendments only','productImplementation':'P0-0/P0-1/P0-2 implemented','finalStatus':'BLOCKED','blocker':'Existing scale practice audio/visual synchronization fails on both baseline and candidate'})
manifest=read(e/'audit-materials-manifest.json');auditChanges=[x['path'] for x in manifest if hashlib.sha256((r/x['path']).read_bytes()).hexdigest()!=x['sha256']]
write(e/'final/preservation.json',{'auditFiles':len(manifest),'auditChanged':auditChanges,'packageLockSha256':hashlib.sha256((r/'package-lock.json').read_bytes()).hexdigest(),'musicEngineOrScalePracticeDiff':subprocess.check_output(['git','diff','--name-only','--','src/lib/a-minor-audio.ts','src/components/scales/use-scale-audio.ts','src/components/scales/scale-learning.tsx'],text=True).splitlines()})
(e/'final/exits.txt').write_text('hash=0\ndata=0\nscale_contract=0\nbuild=0\nbuild_verified=0\ncheck_foundation_types_css=0\nkeyboard_contract_corrected=0\nmeasurement_unit=0\nproduct_data=0\ngit_diff_check=0\nbrowser_scale_synchronization=FAIL (baseline and candidate)\n',encoding='utf8')
rows='\n'.join(f"| {i+1} | `{x['path']}` | {'真实来源变化；精确批准基线' if x['classification']=='REAL_CONTENT_CHANGE' else '仅CRLF/LF；原expected不变'} | PASS |" for i,x in enumerate(hashes))
mapping=(e/'EVENT_MAPPING.md').read_text(encoding='utf8')
body=f'''# BLOCKED，scope=P0

[已核实] P0-0、P0-1、P0-2 已实施；最终不能标记 READY_FOR_MANUAL_ACCEPTANCE，因为相关生产浏览器回归发现基线已有的音阶练习音画同步失败。没有进入 P1，没有提交、推送、合并或部署。

## 当前阻塞与最小下一步

[已核实] `/scales/c-major` 点击 **Start practice** 后，音频状态已经为 `Playing scale…`，练习仍是 `preparing`。同一问题在未修改的 `.next-p0-baseline`（4348）和候选 `.next-p0-final`（4349）均复现；Stop and reset 两者均通过。`/arpeggios` 的既有共用模板测试同样失败。

[已核实] `src/components/scales/use-scale-audio.ts:96` 等待 `ReferenceAudio.play()`，但 `src/lib/a-minor-audio.ts` 当前在整段播放结束后才 resolve；`scale-learning.tsx:197` 等待该调用后才启动可视 count-in。证据：`browser-existing-audio.json`、`browser-scale-baseline.json` 以及对应原始 receipt。三个文件本轮没有 diff。

[推断] 音频启动与播放完成的调用合同不一致，导致视觉指引滞后；依据是上述实际状态及 await 调用链。最小后续工作是明确授权修复这个 scale 音频调用合同，并重新验证 count-in、逐音同步、暂停/停止、隐藏页面和自报完成。当前“不得改音乐引擎”边界下未擅自实施，也未将此必需检查降为通过。明确接受该已复现问题作为本轮例外同样需要用户决定；现无此例外。

## 基线、资料和范围

[已核实] 工作区 `C:/Users/Admin/Documents/viviyang_github/piano-main-product-audit`；分支 `codex/product-system-p0`；HEAD 与阶段开始/交付前 fetch 的 origin/main 均为 `{head}`。工作树保留未提交实现。没有操作原 piano/codex/chords-b1 工作区的文件或分支。

执行文件实际位于仓库根目录 `10_P0_REVIEW_AND_EXECUTION.md`，不是最初指定的 docs 子目录；已按其顺序读取审计和原始 evidence。组件规则使用已有 `docs/product-system-audit-2026-09-22/evidence/COMPONENT-RULES.workspace.md` 快照（2026-09-21），不冒充 main 已提交规则。审计目录 {len(manifest)} 份材料最终 hash 比对变化数：{len(auditChanges)}。旧审计 c1a 和用户曾给定的 SHA 保留历史，实施基线遵循后续“最新 main”授权。

最新 main 没有解决这三项 P0 任务，未虚列 ALREADY_FIXED。现有 analytics、Scale/keyboard 域事件与音乐算法复用，不重复实现。新增事件仅九页 allowlist；Guide 只修已定位链接。无新增 URL、依赖、索引策略、TDH、导航、主题、音符或 PDF 改动。

## 实现与实际验证分列

| 项目 | 实现状态 | 验证状态与证据（均在 checks/product-system-p0-2026-09-22） |
|---|---|---|
| P0-0 23项换行差异 | 明确23路径仅CRLF→LF，仍读工作树字节；不trim、不重排JSON | 4项测试PASS，23文件逐一改实质字符均拒绝；`final/hash.log` |
| P0-0 3项来源真实变化 | 用户批准后仅维护精确amendments，保留旧expected | 数据152 PASS /0 FAIL；`final/data-validation.json`、`hash-disposition-final.json` |
| P0-1 Finder | 发布adapter帮助改为选音名、可选bass，说明不能恢复八度/重复音 | 实际渲染与CEG/bass E/清空/单音/无匹配通过；`browser-p0-functional.json`、`browser-help-read-receipt.json` |
| P0-1 Guide | 旧/chords#find-a-chord改/chords/finder，锚文本Identify a chord from selected notes | 实际点击进入Finder通过；原上下文是Finish a small practice task中的任务链接，因此明确改锚文本为识别任务，未声称它是评分练习 |
| P0-2 新测量 | 复用transport，九页曝光、Finder、缺失音频/练习/分享等事件 | 5项measurement单测PASS；5项observer生命周期浏览器断言PASS；映射见下表 |
| 九页双视口 | 1440×950、390×950生产浏览器 | 18/18 HTTP200、单H1、无横溢出、结果曝光；无SDK加载；`browser-p0-nine.json` |
| 非试点 | d-major、scales/d-major、keyboard-notes/labeled、by-key、chord-progressions | 五页新事件0；`browser-p0-nine.json` |
| 音频/练习/分享 | 既有行为复用 | C major真实playing事件、失败音频不计成功、分享取消不计成功、揭晓后assisted通过；`browser-p0-interactions.json` |
| 打印 | 原动作前记request | C major请求事件一次；Scale/arpeggio print media可见；不证明纸张打印；`browser-p0-print-screenshot-valid-receipt.json`、`browser-existing-audio.json` |
| 键盘 | 未改练习算法 | 70断言PASS；实际10题完成10 first try/0 help/0 revealed；`final/keyboard-completion/test-results.json`、`browser-keyboard-round.json` |
| Scale既有练习 | 未改引擎或practice | **FAIL**：声音播放时视觉仍preparing；baseline/candidate一致；此项阻塞 |
| 构建与规则 | 生产构建完成；隔离检查输出 | Foundation568/568、TS/CSS、scale合同9/9、build exit0；`final/` |
| 路由与metadata | 无修改 | 207 HTML（含框架页）title/description/canonical/robots/H1零差异；static/dynamic路由集合一致；`final/metadata-route-comparison.json` |
| 第一方后台 | 未操作 | BACKEND_NOT_VERIFIED；本地接收器不证明GA4/Clarity收数 |
| 人工 | 未代验 | 真机、读屏、真人听音、具名音乐审阅、纸张打印仍MANUAL_PENDING |
| P1 | 未实施 | DEFERRED，不计PASS |

本地服务均基于production build；analytics ID为空，浏览器只允许127.0.0.1请求。`externallySent=false`是预期。测试前后九页DOM/交互证据分别为 `browser-baseline.json` 与 `browser-p0-nine.json`，不是全套视觉截图。已实际取得并查看 `screenshots/c-major-desktop.png`；基线截图与Finder移动截图有超时，后者保留失败，不宣称完整截图/真机验收。

## 26项失败逐项处理

[已核实] 原126 PASS/26 FAIL → 换行兼容149 PASS/3 FAIL → 用户批准精确来源维护152 PASS/0 FAIL。原始日志和 `hash-diagnosis-current.json` 保留历史状态；最终状态在 `hash-disposition-final.json`。无新增第27项数据失败。

| # | 完整路径 | 处理 | 最终 |
|---|---|---|---|
{rows}

三项真实变化的引入提交均为 `9937d528d78857056356bc440d22348cc4c19fe2`，完整差异 `source-change-1.diff`、`source-change-2.diff`、`source-change-3.diff`。最终JSON逐项包含 old_expected_hash、baseline_hash、working_tree_hash、lf_hash、提交、diff、affected_scope、approval_reference、disposition。

[已核实] 批准出处：本任务2026-09-22，用户在精确三项AM-MIDI变更确认问题及建议后回复“批准”。批准只用于 `scripts/protected-source-amendments.json` 三项维护；原expected清单和来源正文未改。CMU附录改为MIDI Association规范概览，并收窄supports/locator，不改变音符或MIDI数值。

[已核实] 来源限制保留：新概览页本身不能直接证明C4 MIDI=60；现有pitch_sequences/display_register仍列AM-MIDI，另有AM-MUSICXML及推导说明。hash通过不代表专业来源审阅通过；补映射是P1待决事项。

## 事件合同与分母

{mapping}

## 测试失败、告警与证据解释

- 真正产品回归失败：Scale音频/视觉启动不同步，且原baseline同样失败。没有修改算法以迎合测试。
- 测试脚本问题已定位并以独立证据复验：跨运行环境空对象deepEqual（改以五页新事件数量0验证）；Print按钮实际名称为Print this position（已按data-print-current完成）；observer误等Next预取observer、重复测试接收器（修正等待真实结果observer且单独接收器，最终5/5）；键盘测试迁移输出时相对路径错误（修正后70/70）。旧失败receipt未删除。
- `bringToFront`被浏览器foregroundPolicy=preserve拒绝；未绕过，改在已可见、已拥有主页面做本地observer测试。CLI小于60000ms参数被拒绝时程序未执行，之后使用规定值。
- screenshot曾超时，移动截图仍失败；桌面一张成功并实际加载检查。不将DOM结果称为完整视觉验收。
- build自动改动的next-env.d.ts/tsconfig.json已还原；隔离构建目录保留。Git报告若干CRLF将转LF是工作树换行告警，不是额外内容放行。
- Foundation关于历史source-manifest“规划Markdown缺失”的NOTE仍保留；当前文件确实存在且内容包基线验证通过。
- `final/exits.txt`记录退出码；浏览器CLI返回succeeded仅代表程序运行完，不代表内部全部断言通过，以results逐项及本报告FAIL为准。

## 人工验收清单

| 入口 | 动作 | 预期 | 类型/当前状态 |
|---|---|---|---|
| /chords/finder | 读帮助，选C/E/G，再设最低E；清空，仅选C；选C+C♯ | 帮助对应现有控件；CEG候选、bass状态正确；单音不计no-match，C+C♯为已核registry无匹配 | 本地已验；人工复核 |
| /guide/piano-chords | 点击Identify a chord from selected notes | 进入/chords/finder | 本地已验 |
| 九页实际结果块 | 滚入、滚出、再滚入，改变转位/输入；刷新新页面 | 同view同状态一次；新有效状态/新view按合同记录 | 本地已验；后台未验 |
| /chords/c-add9、/chords/c-major | Show answer→Check answer，重复Check | assisted=true，一attempt一次；不当独立演奏成功 | 本地已验 |
| /chords/c-major | 播放、停止；模拟音频不可用；取消系统分享 | 成功playing才记audio；失败不计成功；取消分享独立status | 本地已验；真机/真人听音待验 |
| /scales/c-major | Start practice并对照声音、count-in和键位 | 应同步；目前preparing与播放不同步 | **BLOCKED**，需授权修复合同或明确例外 |
| /keyboard-notes | 启动10题、逐题作答、看结果 | 既有回合/分数不变 | 本地已验；真机/读屏待验 |
| 现有Print/Download | 打印预览、保存PDF并纸上检查 | 快照及资源可用；请求事件不能证明保存/打印成功 | 本地请求/print media已验；实际保存/纸张待验 |
| 统计后台 | 在明确授权测试路径核对字段、九页范围、去重分母 | 不混加旧挂载事件/新曝光；0分母NO_DATA | BACKEND_NOT_VERIFIED，本轮未发送生产数据 |

## 交付清单与未来边界

`delivery-files.json`列全部tracked修改与新增未跟踪实现/测试文件及hash；`implementation.diff`含tracked差异，`new-implementation.diff`包含新增源码/测试，避免只看git diff漏交付。审计文档继续保留，checks是原始证据而非虚构模板。没有变更package/lock、src/app路由、public资产或音乐引擎；见 `final/preservation.json`。

P1仍需下一次范围确认，顺序为最小object/context/state协议与fixture → P1-2接收端及恢复测试 → P1-1链接/下一动作呈现 → P1-3限定来源与已有资产。P0本地门禁先消除当前阻塞；不自动要求等数周SEO流量，也不自动进入P1。

Page Gate的Unique Utility指当前独立任务价值，不要求每个URL独占控件；下一步入口不要求用户点击。保持既有索引决策；不因共享模板否定URL，也不因registry含对象自动建页。
'''
(d/'RESULT.md').write_text(body,encoding='utf8')
print('RESULT written; source approval recorded; all available JSON artifacts copied')
