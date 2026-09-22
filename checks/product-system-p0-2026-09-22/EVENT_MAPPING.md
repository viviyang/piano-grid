# P0 v1 实际事件映射

来源：src/lib/product-measurement{,-core}.ts与下列现有域事件源码。新增发送仅isP0Path九页通过时执行，复用sendAnalyticsEvent。没有新SDK、持久用户ID、音符引擎或CTA。后台收数未验。

| concept | existing/new wire event | actual_trigger | payload | scope | dedupe_key | numerator / denominator | version_change |
|---|---|---|---|---|---|---|---|
| result_seen | 新p0_result_seen | 有效答案区域至少10%进入视口、文档visible、节点有rect且非hidden/opacity0 | object_id/result_state | 九页；Finder为整组结果，Hub为一组过滤结果，不为每张默认卡计数 | logical mounted view×object×state | 有效曝光；不代表理解/完成 | p0-v1新口径；不能与旧scale_reference_viewed相加 |
| tool_start | 新p0_tool_start | Finder第一次用户选键 | chord-finder | Finder | mounted tool view一次 | 开始数；默认/恢复不计开始 | 新增 |
| tool_result | 新p0_tool_result | ≥2音，300ms内无输入变化且有候选 | fingerprint/selected_count/match_count | Finder | view×支持输入fingerprint一次 | 有匹配输入状态/有效工具开始；不称用户转化率 | 新增 |
| tool_no_match | 既有定义finder_no_match补调用 | 同300ms规则且无匹配 | 同上 | Finder | 同上 | 无匹配状态/已计算有效状态 | 不含空/单音，不改matcher |
| comparison_select | 既有定义finder_result_selected补调用 | 点击实际候选href | registry object_id/match_kind/target/fingerprint | Finder | 原始intent可重复；不当完成率分子 | 比较选择intent，仅逐状态去重后才用于转化分析 | 补独立Finder调用 |
| next_step_click | 新p0_next_step_click；Scale保留scale_related_reference_opened/scale_next_task_opened | 九页main内合法同源href；C major已有connections按钮直接记录；排除PDF/download | object/state/target路径 | 九页；Scale不双发新别名 | 原始click不去重，作为intent日志 | 不用raw点击除以去重曝光 | Scale旧名称保留 |
| result_engaged | 新p0_result_engaged | 已被记录曝光的对象状态随后发生main内同源链接点击 | object/state | 九页，C major仅按钮的connections不纳入该href指标 | view×object×state一次 | 去重已参与曝光/同范围曝光；≤100%，0分母NO_DATA | 新口径，只量已列href，不能称所有下一步行为 |
| audio_play | 新p0_audio_play；Scale保留scale_playback_started | chord/notes既有音频状态进入playing；Scale已有成功路径 | object/mode | 九页适用音频 | 一次非playing→playing转换 | 成功启动，不是演奏或任务成功 | 不从按钮click猜成功，Scale不双发 |
| practice_start | 新p0_practice_start；Scale/keyboard保留域started | C major显式进入；builder首次交互/检查；既有域按原合同 | object/mode/attempt | 五和弦、scale、keyboard | 每attempt一次 | 按模式的attempt分母 | 不汇总不同模式成可比完成率 |
| practice_complete | 新p0_practice_complete；scale_question_submitted、scale_practice_self_reported、keyboard_practice_completed映射 | builder/C major明确correct；Scale分别题目结果与自报；keyboard原回合完成 | outcome/assisted/mode/attempt或域原字段 | 适用试点 | 新事件每attempt一次；legacy报表按attempt/question聚合 | exercise_success、self_reported、assisted分开；播放结束不算 | show answer帮助记录跨重试保留；不得把旧播放stopped计成功 |
| print_reference | 新p0_print_request；Scale保留scale_print_requested | 已有打印动作进入前 | object/count或域asset/hand | 适用试点 | 原始请求事件 | 打印请求，不是纸张输出 | 无新增打印内容 |
| download_asset | 新p0_download_request；Scale保留scale_resource_requested | main内download/PDF链接点击 | object/target路径 | 适用试点 | 原始请求事件 | 点击不等于保存；Scale不双发 | 不统计页头/页脚链接 |
| share | 新p0_share；keyboard保留既有share_copy/share_native | SharePanel在没有业务onCopied/onNative事件回调时补状态；有回调保留旧事件 | copy_success/copy_failed/native_success/cancelled/unavailable | 试点现有分享控件 | 成功/取消分别记录；不将打开对话框作成功 | 仅成功status计成功；legacy opened为await native share resolve后的原命名 | 不删除旧事件；不双发回调已有记录 |

## 生命周期、隐私和限制

logical view为挂载的页面任务/reference生命周期；重新render/滚出滚入/重复observer通知不重计；新文档或真正重新挂载开始新view。页面当前实现的同问题help历史跨Try again保留。没有新增cookie/localStorage/sessionStorage或随机用户标识。

Finder fingerprint仅已选pitch classes、可选bass、interpret/root模式；计时器清理与generation检查拒绝旧状态回调。计算完成与看见结果用两个不同事实事件，不能相加当任务完成数。多候选整组只计一次曝光。

公共字段使用page_path（不含query）、measurement_version=p0-v1、既有release_version及固定allowlist。没有发送任意查询文本、音频或完整用户URL。transport disabled/missing/throw不阻断产品；没有补发队列。

没有第一方报表数据，本轮只验证本地事件正确性。数据接收者应以本表所列唯一来源汇总每个概念；不得将scale_reference_viewed（挂载）、p0_result_seen（可见）、tool_result（计算）相加。没有下一步点击也不能解释成任务失败。
