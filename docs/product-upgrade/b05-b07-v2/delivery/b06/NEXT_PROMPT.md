# NEXT_PROMPT — B07

上一批：B06 完成。状态 **B06_READY_FOR_NEXT_BATCH**。

状态与证据目录：`docs/product-upgrade/b05-b07-v2/delivery/b06/`（RESULT、TEST_REPORT、BASELINE、OWNER_MAP、TOKEN_MAP、ROUTE_DIFF、SCREENSHOT_DIFF、CONTENT_BLOCKERS、OUTREACH_*、browser-results.json、unit-results.json、screenshots/、handoff/）。

当前最新 repo / branch / HEAD / worktree（不要回退）：

- Repo: `C:\Users\Admin\Documents\viviyang_github\pianogrid-final-integration`
- Branch: `codex/final-integration`
- Base HEAD before B05 work: `1ce0a1d`
- Worktree dirty with **B05 + B06** uncommitted changes — **do not reset**; continue from this tree

未提交变更与归属：B05 songs/sheet/plan + B06 teaching-pack（labeled/tools/blank/foundation/PDF assets/scripts + product-upgrade pack）。无关 untracked（`.next-s1-baseline/`、部分 deploy logs、`tmp/`）勿混入。

共享 owner / 样式变化：

- 复用 ShareDialog
- 新增 `teaching-pack.tsx` + `teaching-pack.css`（`.pg-teaching-pack*`）
- Teaching pack 打印节点在 `.kn-screen` **之外**（避免 labeled landscape print CSS 隐藏）
- Tools printables 现为 5 项（`key-name-pack`）
- L1 nav 未改

本批遗留：

- 不阻塞：外联 DRAFT_NOT_SENT / contact UNKNOWN
- 不阻塞：真机打印/分享/读屏 PENDING
- 正确性无 P0 阻塞

下一批读取文件：

1. `docs/product-upgrade/b05-b07-v2/B07/05_CURSOR_PROMPT.md`（或包内 B07 启动提示）
2. `B07/01`–`04`（PAGE_INTENT / TDH / links / events）
3. `data/page-seo.json`、`acceptance.json` B07、`task-board.json` T10–T15
4. `delivery/b06/NEXT_PROMPT.md`（本文件）与 `OWNER_MAP.md`
5. B05 delivery 仍为前置成果

下一批第一个 Task ID：**T10**

最新真实测试命令：

```text
npm run check:foundation
npm run typecheck
npm run check:css
node scripts/check-b06-plan.mjs
# with next dev on localhost:3116 (not 127.0.0.1)
PIANO_BASE_URL=http://localhost:3116 node scripts/check-b06-browser.mjs
PIANO_BASE_URL=http://localhost:3116 node scripts/export-teaching-pack-pdfs.mjs
npm run build
```

禁止 commit / push / deploy，直到明确授权。
