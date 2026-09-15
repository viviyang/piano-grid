# Integration handoff

## 正确后续入口

- Accepted upstream：`fb842864dafb35763c51a5b0a2bb62c62b5efc0d`
- 当前 worktree：`C:\Users\Admin\Documents\viviyang_github\pianogrid-songs-sheet-v2`
- 当前 branch：`codex/songs-sheet-v2`
- 当前状态：[已核实] Songs + Sheet Music diff 未提交；包内要求的独立只读 review 已完成，全部可复现业务问题已修复，末轮未发现剩余 P0/P1 或业务 P2。后续由用户决定是否创建下一 accepted baseline commit。
- 不要从 `main@1e3fdec` 重做 Keyboard；不要直接转用旧 Keyboard 开发 worktree。

## 共享能力与数据入口

- 唯一包数据根：`docs/content/songs-sheet-v2/`；原始 catalog 为 `content-data/catalog.v2.json`。
- 服务端读取/组合：`src/lib/songs-sheet-content.ts`。
- 发布能力计算：`src/lib/songs-sheet-contracts.ts`；必须同时满足 representation、resource、asset、hash、revision、grant、territory、commercial、rights layers、human checks 和 action。
- 类型：`src/lib/songs-sheet-types.ts`。
- 事件播放器：`src/lib/original-exercise-playback.ts`，底层复用 `ReferenceAudio`；全站 owner 仲裁位于 `src/lib/a-minor-audio.ts`。
- 页面：`src/components/sheet-music/pages.tsx`；Songs 外部版本接入位于 `src/components/songs/pages.tsx`。
- 测试：`scripts/check-songs-sheet-v2.ts`、`scripts/check-songs-sheet-browser.mjs`。

## 稳定 ID

命名曲外部版本：

- `arr-ext-0a05b7954f5256` — Hot Cross Buns
- `arr-ext-c3a78b0c5cb213` — Twinkle, Twinkle, Little Star
- `arr-ext-a60b8d92c5a325` — Ode to Joy

原创 staging：

- `arr-pg-step-and-hold-v1`
- `arr-pg-left-hand-answer-v1`
- `arr-pg-one-hand-at-a-time-v1`

不要按标题替换 ID，也不要在同名作品之间回退到“第一个版本”。

## Share / 片段 / 播放约定

- Canonical 不含状态；版本状态使用 fragment。
- 新字段：`pg-arr=<arrangement_id>`；旧打印别名 `pg-ex` 继续由严格 parser 接受。
- 本地练习允许 `segment=all|bars-1-2|bars-3-4`、`speed=50|75|100`。
- 重复 key、未知 key、redirect/script、未知 arrangement、外部版本 speed/segment 均 fail closed。
- 恢复 share 只聚焦确切版本，不自动播放。
- 外部版本只支持版本选择与 provider link；不得获得本地播放/打印能力。
- 切速度、片段、版本、路由、hidden、beforeprint、unmount 必须停止并取消；同一时刻只能有一个 `ReferenceAudio` owner。

## 发布资产规则

- `runtime_grants=[]` 是当前真实数据，不得用测试 fixture 或布尔值替代批准。
- 24 个 staging 文件不得移到 `public`。`next.config.ts` 已排除其 output file trace；后续修改数据读取或构建配置后必须重跑四项泄漏检查。
- 真实 grant 必须精确匹配 arrangement/revision、asset hash、动作、商业用途、地域、期限和各层 evidence；需要实体打印/真人听音/专业审核的动作还要匹配 human check。
- 如果未来只批准 PDF，不得自动开放 audio；只批准 display 不得自动开放 print/download。

## 回归入口

```text
npm run typecheck
npm run check:css
npm run check:keyboard-completion
npm run check:songs-sheet-v2
npm run build
node scripts/check-songs-sheet-browser.mjs
```

`check:foundation` 和旧 integration scripts 仍含 accepted baseline 的历史 title/hash/插图断言。不要把它们的非零退出写成新模块通过，也不要为追求绿灯覆盖只读源；本批专项结果为 78/78 与 137/137，分别在 `songs-sheet-v2/test-results.json` 与 `checks/songs-sheet-v2/browser-results.json`。最终 build validation 在 `checks/songs-sheet-v2/build-validation.json`，记录 210 个静态页面和五类 staging 泄漏均为 0；验证构建目录已删除。

## 下一阶段门槛

1. 完成 `MANUAL_ACCEPTANCE.md` 的真实人工条目；权利放行按 asset/action 独立处理。
2. 若业务代码、数据或构建配置改变，重跑专项、production build、浏览器矩阵和五类 staging 泄漏检查。
3. 只有用户另行明确授权时才提交、push 或部署。
