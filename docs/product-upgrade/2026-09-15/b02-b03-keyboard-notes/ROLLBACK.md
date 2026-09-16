# Keyboard Notes B02/B03 — Rollback

## 当前边界

- [已核实] 本轮没有部署、push 或生产数据迁移，因此当前生产环境无需回滚。
- [已核实] 当前 worktree 在 S1 批准前后都包含未提交用户成果，不能安全使用 `git reset --hard`、`clean` 或整树 checkout。
- [已核实] S1 没有独立 commit，不能用现有 HEAD 精确回退 B02/B03 而同时保留批准样板。

## 合并前回滚

1. [已核实] 停止使用 `codex/final-integration` 作为发布候选即可；稳定生产未被覆盖。
2. [推断] 若独立审查要求撤销 B02/B03，应由审查者基于本交接文件清单生成反向 patch，只处理下列 owner 文件；依据是工作树包含其他用户改动，整树回退会误伤。
3. [已核实] 保留 `docs/product-upgrade/2026-09-15/s1-keyboard-practice/` 的批准设计记录与截图，不回退视觉决定。

## B02/B03 文件边界

- `src/lib/keyboard-practice.ts`
- `src/lib/keyboard-events.ts`
- `src/components/keyboard-notes/keyboard-notes-workspace.tsx`
- `src/components/keyboard-notes/lookup-experience.tsx`
- `src/components/keyboard-notes/keyboard-notes-v2.css`
- `package.json`
- `scripts/check-keyboard-completion.ts`
- `scripts/check-keyboard-practice.mjs`
- `scripts/check-practical-tools.ts`
- `scripts/check-practical-tools-browser.mjs`

## 合并后的推荐回滚

- [推断] 独立审查通过后应将本文件边界作为一个具名 commit 合并；如上线后必须撤销，再用该 commit 的普通 `git revert`，不要 reset 历史。依据是它能保留后续提交并形成可审计反向变更。
- [已核实] preset 无服务端存储、无数据库 schema、无账号数据，因此代码回滚不需要数据迁移。
- [已核实] `v1` 非法或未知 preset 已有客户端 fallback；回滚后不应把旧链接重定向到新公开路由。

