import fs from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PUBLIC_ROUTES } from '../src/lib/site-routes.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const FAMILY = [
  '/chords/major', '/chords/minor', '/chords/diminished', '/chords/augmented',
  '/chords/suspended', '/chords/seventh', '/chords/add', '/chords/extended', '/chords/altered',
];
const STRUCTURE = ['/chords', '/chords/by-key', '/chords/finder', '/chord-progressions'];
const MODULE = new Set([...STRUCTURE, ...FAMILY]);
const chordUrls = PUBLIC_ROUTES.filter((url) => url === '/chord-progressions' || url.startsWith('/chords'));
const BROWSER_DETAILS = new Set([
  '/chords/b-minor', '/chords/d-minor', '/chords/c-maj7', '/chords/c-7', '/chords/b-7',
  '/chords/c-m7', '/chords/c-add9', '/chords/c-diminished', '/chords/a-sus2', '/chords/a-sus4',
  '/chords/b-diminished', '/chords/f-add9', '/chords/c-augmented', '/chords/c-madd9',
  '/chords/d-flat-m7-flat5', '/chords/f-sharp-madd9', '/chords/a-flat-madd9',
  '/chords/b-flat-madd9', '/chords/d-flat-madd9', '/chords/c-major', '/chords/a-minor',
  '/chords/c-sus2', '/chords/c-sus4', '/chords/g-major', '/chords/e-flat-minor',
]);
const HOLD = new Set([
  '/chords/d-flat-m7-flat5', '/chords/f-sharp-madd9', '/chords/a-flat-madd9',
  '/chords/b-flat-madd9', '/chords/d-flat-madd9',
]);
const SEARCH_FIXED = new Set(['/chords', '/chords/extended', '/chords/altered']);

function classify(url) {
  if (url === '/chords') return { type: 'hub', family: 'hub' };
  if (url === '/chords/by-key') return { type: 'tool', family: 'by-key' };
  if (url === '/chords/finder') return { type: 'tool', family: 'finder' };
  if (url === '/chord-progressions') return { type: 'tool', family: 'progressions' };
  if (FAMILY.includes(url)) return { type: 'family', family: url.split('/').at(-1) };
  const slug = url.split('/').at(-1);
  if (slug.endsWith('-madd9')) return { type: 'detail', family: 'minorAdd9' };
  if (slug.endsWith('-add9')) return { type: 'detail', family: 'add9' };
  if (slug.endsWith('-m7-flat5')) return { type: 'detail', family: 'halfDiminished7' };
  if (slug.endsWith('-maj7')) return { type: 'detail', family: 'major7' };
  if (slug.endsWith('-m7')) return { type: 'detail', family: 'minor7' };
  if (/-\d$/.test(slug) || slug.endsWith('-7')) return { type: 'detail', family: 'dominant7' };
  if (slug.endsWith('-sus2')) return { type: 'detail', family: 'sus2' };
  if (slug.endsWith('-sus4')) return { type: 'detail', family: 'sus4' };
  if (slug.endsWith('-diminished')) return { type: 'detail', family: 'diminished' };
  if (slug.endsWith('-augmented')) return { type: 'detail', family: 'augmented' };
  if (slug.endsWith('-minor')) return { type: 'detail', family: 'minor' };
  if (slug.endsWith('-major')) return { type: 'detail', family: 'major' };
  return { type: 'detail', family: 'other' };
}

function task(info, url) {
  if (info.type === 'hub') return '按名称/符号/根音/类型找到目标和弦，再进入分类或详情';
  if (url === '/chords/finder') return '在键盘上选出听到的音，查看匹配和弦并打开对应页面';
  if (url === '/chords/by-key') return '选一个调，对照该调三和弦与七和弦，再打开已发布详情';
  if (url === '/chord-progressions') return '选进行模式和调，查看每级和弦并听当前例子';
  if (info.family === 'extended' || info.family === 'altered') return '在本页筛选并预览嵌入参考对象，听音或练习当前选中的例子';
  if (info.type === 'family') return '看这一类和弦怎么构成、如何按根音/子类型筛选，再打开独立详情';
  if (info.family === 'add9' || info.family === 'minorAdd9') return `查阅该 ${info.family === 'minorAdd9' ? '小三和弦加9' : '大三和弦加9'} 的音符、两种键盘排列、听音和练习`;
  if (info.family === 'sus2') return '查阅该 sus2（1–2–5）的音符、键盘位置、转位、听音和练习';
  if (info.family === 'sus4') return '查阅该 sus4（1–4–5）的音符、键盘位置、转位、听音和练习';
  return '查阅这一具体和弦的音符、公式、键盘位置、转位或排列、听音和练习';
}

function csvEscape(value) {
  const text = String(value ?? '');
  if (/[",\n]/.test(text)) return `"${text.replaceAll('"', '""')}"`;
  return text;
}

const rows = [];
for (const url of chordUrls) {
  const info = classify(url);
  const isN2B = info.type === 'detail' && ['diminished', 'augmented', 'sus2', 'sus4'].includes(info.family);
  const isDimAug = info.family === 'diminished' || info.family === 'augmented';
  const browser = MODULE.has(url) || BROWSER_DETAILS.has(url);
  const checkMethod = browser
    ? 'HTML全页扫描 + Playwright桌面1440/移动390操作；证据 docs/seo/chords/evidence-2026-09-18/task-12/'
    : 'HTML全页扫描（状态/H1/canonical/robots/音符/站内链接/工程措辞）；同模板浏览器分层覆盖；证据 docs/seo/chords/evidence-2026-09-18/task-12/_html_scan.json';

  let problems = '未发现本轮范围内问题';
  let status = '保持';
  let reason = '独立查阅任务完整：名称、音符、键盘、听音或分类入口可用；未改任务11 Title/H1/description';
  let merge = '';
  let missing = '';

  if (SEARCH_FIXED.has(url)) {
    problems = '目录搜索无法把 Bb / Cmadd9 对到已有别名页';
    status = '已修好';
    reason = '共用搜索改为压缩匹配，Bb 与 B-flat/B♭、Cmadd9 与 Cm(add9) 能找到已有条目';
  } else if (url === '/chords/d-flat-m7-flat5') {
    problems = '工程化指法说明仍出现在页面；390宽长名称导致横向溢出59px';
    status = '已修好';
    reason = '指法改为用户可读限制说明；窄屏摘要标签换行，长半减七名称不再撑出视口。独立半减七查阅任务仍在，不合并';
    missing = 'GSC/检索量为 ZERO_OBSERVED_ONLY，不是删除或 noindex 依据';
  } else if (isN2B) {
    problems = isDimAug
      ? '公式段重复理论句；指法段使用工程化 authorized dataset 措辞'
      : '公式段重复引言里已有的理论句';
    status = '已修好';
    reason = isDimAug
      ? '去掉公式段重复理论；工程化指法改为“本页不提供指法，图示只标音位”'
      : '去掉公式段重复理论；sus2 与同根 sus4 仍是不同查阅任务（1–2–5 对 1–4–5），不合并';
  } else if (info.family === 'minorAdd9') {
    reason = '相对 /chords/add 分类页，本页完成该根音小三和弦加9的独立查阅（音符、两种排列、听音、练习）。分类页不能完整承接同一对象状态';
    if (HOLD.has(url)) missing = '已有观测为 NO_NUMERIC_DATA 或 0，不是去留依据';
  } else if (HOLD.has(url)) {
    missing = '已有观测为 0 或空白，不是去留依据';
  }

  if (info.family === 'sus2') merge = '';
  if (info.family === 'sus4') merge = '';

  rows.push({
    url,
    type: info.type,
    task: task(info, url),
    check: checkMethod,
    problems,
    status,
    reason,
    merge,
    missing,
  });
}

if (rows.length !== 158) throw new Error('Expected 158 rows, got ' + rows.length);
const counts = rows.reduce((acc, row) => {
  acc[row.status] = (acc[row.status] || 0) + 1;
  return acc;
}, {});
if (Object.keys(counts).some((key) => !['保持', '已修好', '待决定', '待核实'].includes(key))) {
  throw new Error('Unexpected status: ' + JSON.stringify(counts));
}

const header = ['URL', '页面类型', '用户在这里做什么', '本轮检查方式与证据位置', '发现的具体问题', '处理结果', '实际修复或保留理由', '合并候选目标', '仍缺什么证据'];
const csv = [header.join(','), ...rows.map((row) => [
  row.url, row.type, row.task, row.check, row.problems, row.status, row.reason, row.merge, row.missing,
].map(csvEscape).join(','))].join('\n') + '\n';

fs.writeFileSync(resolve(root, 'docs/seo/chords/CHORDS_158_ACTIONS.csv'), csv);
fs.writeFileSync(resolve(root, 'docs/seo/chords/evidence-2026-09-18/task-12/_action_counts.json'), JSON.stringify({
  total: rows.length,
  counts,
  fixed: rows.filter((row) => row.status === '已修好').map((row) => row.url),
  decide: rows.filter((row) => row.status === '待决定').map((row) => row.url),
  verify: rows.filter((row) => row.status === '待核实').map((row) => row.url),
}, null, 2) + '\n');
console.log(JSON.stringify({ total: rows.length, counts }, null, 2));
