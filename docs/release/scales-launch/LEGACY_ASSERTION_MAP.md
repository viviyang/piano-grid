# 旧断言映射

| 原断言/命令 | 当前结果 | 替代断言或弃用理由 |
|---|---|---|
| `npm run check` → Foundation `Only authorized layout/page/component TSX` | FAIL | 旧白名单只覆盖早期 17 路由，不认识本次已批准的动态 Scales/Arpeggios/Guide 文件。保留失败；替代为 27 页合同、同版本构建及实际 sitemap 扫描。 |
| `npm run check` → `Only necessary authorized chord components` | FAIL | 名称与清单仍是 Chords 阶段守卫；当前新增的是批准的 Scales 组件。未删除断言、未扩大为全仓库放行。 |
| `node scripts/check-scale-data.mjs` 历史快照/空指法假设 | 历史报告 FAIL | 旧三页快照与“所有新增均 null”不再表示 27 页合同。替代：`check-scale-completion-contract` 9/9、`check-scale-final` 670/670、`check-scale-launch-contract` 13/13。 |
| `node scripts/check-integration-data.mjs` 原始字节 hash | 历史报告 FAIL | Windows CRLF 敏感且与本候选语义无关；不覆盖历史报告。替代为 manifest SHA-256、候选文件 hash 与整站目标扫描。 |
| 旧 PDF 内容验证器要求 `checks/scales-step2-final` 生成元数据 | 当前输入缺失 | 8 个固定 PDF 未改字节，复用方案包 manifest hash；新浏览器打印另由 `check_print_evidence.py` 38/38 验证。 |

有效的理论、MIDI、拼写、音域、指法来源与页面边界断言均保留并强化；没有为了变绿删除有效检查。
