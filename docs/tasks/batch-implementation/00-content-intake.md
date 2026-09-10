# 00 — 接入完整内容包，保护已完成样板

先读 `MASTER-RULES.md`。本任务ID：`00-content-intake`。
若用户同时授权01，可在本任务合格后直接进入01；否则完成本任务停止。

## 目标

把现有项目从“已完成A minor样板”接入到全站内容总包，不新增业务URL，不重设计页面。不是重新做Foundation，也不是重新做内容研究。

## 执行

1. 读取本地AGENTS、实际package/锁文件、Foundation记录和A minor源码、已有页面验收记录。
   在改动前对A minor记录截图/可用行为/下载URL；当前打不开或回归已有错误时先列证据，不伪称重新验收通过。

2. 定位 `docs/content/site-master/content-master-index.md`。
   若总包仅在该目录下多套一层，递归查找唯一完整根并报告；可以调整读取根或在目标为空时等字节复制到约定位置，但不能删除原目录/覆盖非空源文件。若只有四个master文本但没有批次/素材，列出准确缺项，不伪造空目录作为已取得。

3. 完整解析plan与master；核对schema=3.0.0、planning version、127 URL集合、原先做17/后做91/暂不做19的分组。检查所有URL与任务关系，不用旧batch-01未做台账覆盖新总包状态。
   数量仅是已知预期，必须与实际文件比较；不一致时报告差异而非凑数。

4. 核对A–F目录：A-Scales、B-Keyboard-Notes、C-Songs、D-Sheet-Music、E-Guide-Reading-Practice、F-Homepage。读取每个目录实际的批次文件与自检信息，登记其真实名字；不凭空强制四个文件名。

5. 完整读取master的integration_contract、summary、legacy_chords_support和问题台账。对全包素材清单核对存在/哈希/路径；43条资产清单（30新+13保留）是预期，不代表批次目录每个文件都属于可公开资产。
   把缺项分类为渲染/开发可解决、待事实/专业核验、使用权限、暂停；来源支持事实不等于允许重新分发。

6. 比对已用 `docs/content/chords/` 与 `preserved-chords/` 及master旧页对象：保持A minor正文数据等价。只为适配新来源作必要读取改动；视觉结构、状态和原URL不变。已有经过授权的呈现层改动保留，不能用旧源码覆盖。

7. 规划正本若缺失：核对总包只读副本的版本/哈希后可等字节补入docs/product；已有同名冲突不可覆盖。

8. 建立最小只读读取适配层（名称按现有架构），支持按URL取页、关联来源与问题、解析两个素材根；服务端读取，不暴露整包给客户端。
   不做所有模板渲染引擎，不生成新URL，不增依赖。

9. 登记/扩展 `docs/content/content-source-map.json` 与 `docs/content/asset-map.json`。只登记素材不等于复制到public；A minor已用资源的现有URL保持。

10. 建立 `docs/tasks/site-implementation-plan.md`：
    首轮列17 URL，A minor为“用户报告前阶段完成/本次回归结果另列”，其余根据源码实查，不硬写未开始；全127 URL都保留优先级及暂停状态。
    记录00–07工程批次，不把A–F内容目录当工程顺序。
    建立逐source_group的覆盖方式，后续每批填写交付与缺项。

11. 执行已有check/build和A minor回归。给出迁移前后源文件哈希、源资产核对报告，不改写历史validation。

## 交付

`checks/batches/00-content-intake/implementation.md`：实际目录、版本、源快照、资产缺项、新旧schema映射、适配器路径、A minor结果、下一批精确入口。

内容包不全可以先保护现场和登记，但未取得新页完整对象不能宣称该页已可开发。非关键原PDF缺失且给定print_data足够，不阻止其余数据适配。

若用户授权连续00+01：00没有阻塞01的冲突时直接执行01；00结束不能只交一份计划就把01忘掉。
