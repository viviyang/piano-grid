# 构建、开关与回退

候选 `scales-launch-79faa6c539d6` 基于 HEAD `10234b12380a21f26c544e9392bacd1f0545a384`，实际发布候选构建命令为：

```powershell
$env:PIANO_NEXT_DIST_DIR='.next-launch-final'
npx next build --webpack
```

[已核实] 使用仓库锁定的 Next 16.3.4，编译和 TypeScript 成功，最终 202 个静态输出。Chords 大对象在 11 worker 并行预渲染时触发 60 秒重试，自动重试后构建退出码 0。默认 `npm run build` 的 Turbopack 在隔离工作树中因 `node_modules` junction 指向工作树外而在编译前拒绝；这不能推断普通 checkout 会失败。

配置字段仅记录名称，不包含值：

- `NEXT_PUBLIC_PIANOGRID_RELEASE_VERSION`
- `NEXT_PUBLIC_PIANOGRID_ANALYTICS_PROVIDER`（默认 `none`；批准后候选仅支持 `ga4`）
- `NEXT_PUBLIC_PIANOGRID_ADS_LAYOUT_PREVIEW`（默认关闭；仅本地布局预览，不是广告启用）

部署前先在真实 checkout 复跑同一命令并确认候选指纹。回退时保留非 Scales 并行改动，只撤回本候选文件清单；广告异常只关闭广告开关，不回滚正确产品。当前未提交、推送、部署，故没有本轮生产 release ID 可回退。
