# Gap Analysis

每项是当前任务链中的可定位问题或证据缺口，不是“功能清单越长越好”。优先级为 [INFERRED]，基于用户影响、复用、风险和可逆性；尚无流量权重。

| Gap / priority | Current evidence | Affected URLs | Proposed solution | Expected user outcome | Required data | Risk |
|---|---|---|---|---|---|---|
| G1 ANSWER / UNDERSTAND，P0 | [REPO_VERIFIED] FinderExperience仅pitch classes+bass；support modules仍要求octave输入；[LIVE_VERIFIED] finder HTTP也有该说明 | `/chords/finder` | 修发布层说明为当前模式；带八度段落明确标为理论例子，不承诺输入框 | 用户知道能输入什么、结果哪些维度未知 | 当前supported registry与原文边界 | 不小心删掉正确bass理论；不借机新增解析器 |
| G2 MEASUREMENT，P0 | [REPO_VERIFIED] standalone Finder无emitChordEvent，虽事件类型已定义；其他域使用不同start/completion；[LIVE_VERIFIED] GA脚本已在 | Finder及9页pilot | 复用sendAnalyticsEvent、修调用缺口、事件语义映射，建立result denominator | 可以区分看答案、选候选、练习及离开 | 事件字典；GA4/GSC读权限用于结果校验 | 双发/重复曝光；把自报完成算作演奏能力 |
| G3 CONTINUATION / AMBIGUITY，P0/P1 | [REPO_VERIFIED] candidate href存在；extended/altered锚点只定位row，CompletionCategoryExperience初始defaultObjectId不读hash；detail也不自动保留Finder bass | Finder→145detail或288state；pilot只改代表路线 | 保持现有destination；首轮选定候选有明确入口说明，P1再使分类页按已知hash装载当前对象；不发明未注册voicing | 不重复查找；不误把默认root例子当输入bass | registry object/realization映射，合法state白名单 | 同pitch-class≠同voicing；输入bass不能随意合成指法 |
| G4 ACTION / PRACTICE，P1 | [REPO_VERIFIED] C-major独立reference/practice、其他detail builder、scaleQuiz/follow-along、songs plan均已存在；无通用队列 | 代表major/minor/seventh/dim/add、scale、notes | 先统一“做哪种练习/评估什么/完成后去哪里”的合同；不复制C-major整个UI到145页 | 理解练习反馈和可继续动作 | 既有practice mode/assisted/revealed字段 | 错把不同练习完成率直接比较；全站迁移范围失控 |
| G5 REFERENCE / TRUST，P1 | [REPO_VERIFIED] detail source和finger scope存在；getSupportedChordRegistry的legacyCore sourceIDs=[]，teacherReviewed=false；source packages有多层 | Finder核心triads及pilot来源展示 | 在adapter层引用已有来源ID/scope；缺失明确留空，不编来源，不宣称专业审阅 | 引用资料时知道支持什么、没验证什么 | 已有source ledger + object/field定位 | 用一般乐理来源背书具体八度/手指；source checked≠teacher reviewed |
| G6 VERIFY，P0验收门禁 | [UNRESOLVED] 本轮Tabbit失败，无实机/听音截图；[REPO_VERIFIED] build通过但旧integration hash有26失败 | 全量基线+pilot | 保留失败；建立本SHA可复现端口/输出目录；调查3个真实历史hash差异，不能静默放行 | 实施者能区分基线债务与新增回归 | 旧hash、Git提交、批准记录；可用browser | 为过测试改只读资产或放宽白名单 |
| G7 CONTINUATION，P0小修候选 | [REPO_VERIFIED] `/guide/piano-chords`指向`/chords#find-a-chord`，生成HTML/src无此id | guide→chords | 调整到已存在目标锚点或保留兼容锚点，按页面职责选最小修复 | 点击确实到正确查找区域 | build-page ids | 只验证HTTP200漏掉fragment失效 |
| G8 DISTRIBUTION，P2证据 | [REPO_VERIFIED] print/share/atlas/teaching pack已存在；[UNRESOLVED] 被引用次数/渠道效益未知 | print资源与规范HTML | 先量已有资产，P1完善一份来源与HTML回链；embed只做需求验证 | 教师/引用者找到稳定版本 | download/share/referral记录、教师反馈 | 制造重复PDF/额外维护面；不能称“没有可传播资产” |
| G9 key/scale bridge，P1 | [REPO_VERIFIED] by-key可读hash并有C-major scale特例，24context/96progression存在；Scales已有related，未有跨域统一context传递 | pilot chord/scale→by-key→progression | 仅对已验证context加稳定真实链接，progression保留exampleID；不创建新key页 | 选择后进入对应示例 | by-key/progression现成ID，公开route | inferred key误当唯一key；天然/和声小调混淆 |
| G10 search demand，P2/DEFER门禁 | [UNRESOLVED] 无实际GSC/GA4导出，第三方query records不是需求全貌 | 全部新增URL候选 | 先收最小数据包，维持当前206URL；六项Gate逐项证据 | 增量页面由任务与需求决定 | 28/90天query×page与事件 | 把零数据/新站短窗口当无需求，误删页 |

最大的五个产品差距是G1、G2、G3、G4、G5；G6是执行/验证前置问题，G7是已定位小断点。这里“最大”指工程与用户任务优先级判断，不表示已测得最多用户受影响。
