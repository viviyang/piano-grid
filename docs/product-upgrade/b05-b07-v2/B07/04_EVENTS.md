# 事件与测量契约

[已核实｜历史交接] 过去有CustomEvent-only的记录；当前是否接入collector未知。Cursor必须读最新事实。
状态：`COLLECTED_VERIFIED` / `INSTRUMENTED_NOT_COLLECTED` / `BLOCKED_CONFIGURATION`。不要编一个provider_id或写新第三方SDK以凑完成。

## 本轮事件（按现有命名适配）
| 事件 | 白名单字段 | 不能推导 |
|---|---|---|
| song_plan_open | plan_key, revision, entry_type | 已练琴 |
| song_plan_start | plan_key, revision | 材料已获取 |
| song_plan_step_view | plan_key, step_id | 完成该练习 |
| song_plan_self_check | plan_key, step_id, checked | 演奏正确 |
| song_plan_finish | plan_key, visited_count, self_checked_count | 学会整曲 |
| edition_open | edition_public_key, provider_id | 外站下载/购买成功 |
| resource_preview | resource_id, revision, page_kind | 课堂采用 |
| resource_download_click | resource_id, paper_size, page_set | 下载完成/实体打印 |
| resource_print_requested | resource_id, paper_size, page_set | 打印成功 |
| share_panel_open | kind, public_key | 已发送 |
| share_copy_completed | kind, public_key | 接收人阅读 |
| share_native_resolved | kind, public_key | 平台发帖成功 |
| valid_shared_landing | kind, public_key, revision | 独立新增用户 |

别上传原始URL查询、答案、用户输入、姓名、邮箱、个人check-in文本。focusChoice本轮留本地，不用于用户画像。
用固定白名单public key；不要直接把pathname+search全文发送。

## 去重和测试
双击start不能发两次；组件重渲染不重复发送view；测试runner事件标QA或disabled，生产统计排除。
事件发送失败不得阻止Next、复制、下载或打印。
打印下载用a href让无JS也可用；埋点不得preventDefault导致资源打不开。

## 验证
已有合法collector：记录测试环境实际接收的事件name/字段/时间，敏感值脱敏；不要给截图PENDING挂PASS。
无collector：完成安全事件映射、验证本地dispatch、输出未收集事实；用户配置是单独待办，不妨碍页面发布。
不声称留存或病毒系数，除非实际存在可合法关联的必要测量数据。聚合计数不是独立用户转化率。
