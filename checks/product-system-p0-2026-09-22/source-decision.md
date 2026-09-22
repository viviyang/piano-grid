# 三项来源基线的具体裁决建议（尚未获批准）

[REPO_VERIFIED] 9937d528只改变这三份受保护文件中的AM-MIDI来源记录，不改变音符、公式、MIDI数值。原始diff见source-change-1/2/3.diff，旧/当前/目标SHA256见hash-diagnosis-current.json。

[LIVE_VERIFIED] 2026-09-22读取 https://midi.org/standard-midi-files ，页面说明SMF及提供规范入口，支持新记录的“Official public entry”范围；没有直接展示C4=60音号表。

[REPO_VERIFIED] A-Scales中的display_register和pitch_sequences仍将AM-MIDI列为source_ids之一；同列AM-MUSICXML。display_register明确编辑音区推断，pitch_sequences明确MIDI公式推断。来源映射不等同新的概览直接证明每个数值。

[LIVE_VERIFIED] https://www.w3.org/2021/06/musicxml40/tutorial/midi-compatible-part/ 的Pitch小节支持step/alter/octave、中C所在octave4，但此次读取没有取得独立证明C4 MIDI=60的对应表。

[INFERRED] 建议接受这次既有引用替换并精确维护三项检查基线，保留旧值、new hash、引入提交及用户批准原文；同时在RESULT保留来源映射限制，不把hash维护称为音乐专业审阅通过。不修改受保护内容或音乐引擎，不扩大本轮进入P1。

[UNRESOLVED] 用户目前只询问建议，不构成批准。批准未收到前三项仍FAIL，不用新hash放行。若不接受该范围明确的维护，应保留BLOCKED并另行处理来源依据；不得因任务着急自行创造例外。


## 2026-09-22 后续批准及执行

[已核实] 上述“未批准”是历史状态。用户随后明确回复“批准”，覆盖三项已列文件在9937d528中的AM-MIDI来源记录变化。已在scripts/protected-source-amendments.json精确记录旧/新hash、提交、批准原文；未改来源内容，原hash清单仍保留。数据检查152/152通过。概览不能直接证明C4=60的来源映射限制继续保留，不等于专业审阅通过。
