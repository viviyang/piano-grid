# NEXT_PROMPT — B06

上一批：B05 完成。状态 **B05_READY_FOR_NEXT_BATCH**（附 **B05_IN_SITE_BLOCKED_CONTENT**：三首 Hoffman 版本无合法同版托管谱/音频/events，已交付 external_guided，无假播放器）。

状态与证据目录：`docs/product-upgrade/b05-b07-v2/delivery/b05/`（RESULT、TEST_REPORT、BASELINE、EDITION_AUDIT、OWNER_MAP、TOKEN_MAP、ROUTE_DIFF、SCREENSHOT_DIFF、CONTENT_BLOCKERS、VERSION_AUDIT、browser-results.json、unit-results.json、build.log、screenshots/、handoff/）。

当前最新 repo / branch / HEAD / worktree（不要回退）：

- Repo: `C:\Users\Admin\Documents\viviyang_github\pianogrid-final-integration`
- Branch: `codex/final-integration`
- Base HEAD before B05 work: `1ce0a1d`
- Worktree dirty with B05 uncommitted changes — **do not reset**; continue from this tree

未提交变更与归属：B05 实施（songs/sheet-music/seo/foundation allowlist/B05 libs/components/scripts + product-upgrade pack）。另有无关 untracked（`.next-s1-baseline/`、部分 deploy logs）勿混入。

共享 owner / 样式变化：

- 复用 `ShareDialog`；`share-dialog.css` 增加 print hide
- 新增 `song-plan.css`；foundation allowlist 已扩
- `LaunchVersions` 仍在 `/songs` 与 `/songs/easy`
- L1 nav 未改

本批遗留：

- 不阻塞：站内演奏能力 content blocker（见 CONTENT_BLOCKERS）
- 不阻塞：事件仅本地 CustomEvent，未接采集后端
- 正确性无 P0 阻塞

下一批读取文件：

1. `docs/product-upgrade/b05-b07-v2/01_MASTER_CURSOR_PROMPT.md`（CURRENT_BATCH=B06）
2. `B06/01_SPEC.md`、`02`、`03`、`04_CURSOR_PROMPT.md`
3. `data/content.en.json` teacher 段、`task-board.json` T06–T09
4. `design/index.html?view=teacher` 与 desktop/mobile teacher screens
5. `delivery/b05/NEXT_PROMPT.md`（本文件）与 `OWNER_MAP.md`

下一批第一个 Task ID：**T06**

最新真实测试命令：

```text
npm run check:foundation
npm run typecheck
npm run check:css
npm run check:songs-sheet-v2
node scripts/check-b05-plan.mjs
# with next dev on localhost:3116
node scripts/check-b05-browser.mjs
PIANO_BASE_URL=http://localhost:3116 node scripts/check-songs-sheet-browser.mjs
npm run build
```

禁止 commit / push / deploy，直到明确授权。不执行 B07。
