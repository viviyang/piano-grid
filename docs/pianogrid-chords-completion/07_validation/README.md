# 验证分层

1. `python 07_validation/validate_pack.py`：本包288对象、588例子的定义/拼写/音高/省略/低音/音频/打印数据一致性；10个独立硬编码例；16个故障注入；24调/336行；96进行；参考Finder样例。不是运行当前网站。
2. `audit_routes.py --actual-json exported.json --before-json before.json --final --out route-audit.json`：只核对仓库导出清单，不访问127.0.0.1或猜C盘。输入格式看脚本docstring。未知并行路由分类后处理，不擅删。
3. JSON Schema只校验基础authoring结构；音乐语义以独立validator与项目family检查为准。`legacy145.definitions.oracle.json`只作回归参考，不覆盖原数据、指法和正文。
4. 工程接入后必须重新测试实际DOM、交互、原始HTML、资源、SSR和内部链接。参考Finder没有浏览器状态机、alias/bass完整实现；不能拿15条参考结果代替生产Finder专项。
5. 真实音频、设备、读屏、打印与专业审阅依人工记录；源码测试通过不代表已经完成。

故障注入重点：把一个音改错，且同时更新keyboard/audio/print，校验仍必须失败。禁止只检查多份输出互相相等。
