from pathlib import Path
import json,re,collections,xml.etree.ElementTree as ET

base=Path('docs/product-system-audit-2026-09-22')
ev=base/'evidence'
routes=json.loads((ev/'repo-routes.json').read_text(encoding='utf-8'))
pages={r['path']:r for r in json.loads((ev/'build-pages.json').read_text(encoding='utf-8'))}
families={'major','minor','diminished','augmented','suspended','seventh','add','extended','altered'}
sf={'modes','blues','pentatonic','harmonic-major','chromatic'}
def category(p):
 if p=='/':return 'Home','选择查找、学习或练习入口'
 if p=='/chords':return 'Chords Hub','按名称/音符查找和弦与练习入口'
 if p=='/chords/finder':return 'Chord Finder','由音级集合与可选bass解释候选'
 if p=='/chords/by-key':return 'Supporting / Key','查看指定调内和弦及关系'
 if p=='/chord-progressions':return 'Progression','选择调和进行示例，听与应用'
 if p.startswith('/chords/'):
  return ('Chord Family','浏览、比较'+p.split('/')[-1]+'家族及对象') if p.split('/')[-1] in families else ('Chord Detail','核对'+p.split('/')[-1]+'音名、公式、键位与可用练习')
 if p=='/scales':return 'Scales Hub','选择音阶对象、参考或练习'
 if p.startswith('/scales/'):
  return ('Scale Family','理解并浏览'+p.split('/')[-1]+'家族') if p.split('/')[-1] in sf else ('Scale Detail','查看'+p.split('/')[-1]+'音阶、指法范围与练习')
 if p=='/arpeggios':return 'Supporting / Arpeggios','查看琶音参考和实践范围'
 if p.startswith('/keyboard-notes'):return 'Keyboard Notes','找音/键位/谱位、标注、指号、频率或空白参考：'+p.split('/')[-1]
 if p.startswith('/songs'):return 'Songs','按学习需要发现歌曲与编配版本'
 if p.startswith('/sheet-music'):return 'Sheet Music','寻找准确版本、来源与合法可用资源：'+p.split('/')[-1]
 if p.startswith('/guide'):return 'Learn','学习读谱/和弦/音阶并返回工具：'+p.split('/')[-1]
 if p=='/tools/blank-sheet-music':return 'Printables','配置并打印空白谱纸'
 if p=='/tools/hear-the-difference':return 'Supporting / Comparison','听辨并比较已有音乐示例'
 if p=='/tools':return 'Tools','选择实际已存在的工具'
 raise ValueError(p)
counts=collections.Counter(category(p)[0] for p in routes)
head='''# 完整 Route / Template Inventory

[REPO_VERIFIED] 基线为远端main `c1a017a533289616b84e354c97f1345114f809e2`。以下206行按PUBLIC_ROUTES原顺序列出；不是抽样。交叉来源：`src/lib/site-routes.ts`、App Router显式文件/两个generateStaticParams、生产build manifest与HTML、当前production sitemap/HTTP。Canonical取实际本地输出；线上同样自指且均200/index,follow（[LIVE_VERIFIED]）。URL indexable不代表Google已收录。

Generated From列给实际route文件及其直接导入的lib adapter；继续追数据源见00。显式静态页面与`[slug]`模板均受当前路由集合限制。`/songs/easy`是SSR，其余205业务页预渲染。next.config未配置业务redirect；hosting控制台完整redirect未知。所有静态资源、API/metadata、404、客户端hash/query状态不计indexable业务页面。

## 数量与边界

'''
head+='| Page Type | Indexable URL count |\n|---|---:|\n'+''.join(f'| {k} | {v} |\n' for k,v in counts.items())
head+='''
Legal：当前App route/PUBLIC_ROUTES/sitemap未找到独立公开legal route，计0，不建议为了填分类新增页面。Printables也存在其他类页面的附属能力，这里按主职责互斥计数；不重复计数。

| DATA OBJECT COUNT | INDEXABLE URL COUNT / boundary |
|---|---|
| Finder 433 =145详情对象+288嵌入参考对象 | Chords 157：145 detail+9family+hub+finder+by-key |
| Scales60拼写/形态对象 | Scales25：19detail+5family+hub；不是60页 |
| Key24、triad/seventh rows336 | by-key仅1 URL，包含于上行Chords总数 |
| Progression8patterns、96examples | 1 URL |
| Songs199works/203arrangements/203resources/24assets | 2 Songs+6 Sheet Music，不按资源数量造页 |
| site-master127规划对象 | 历史包，不是当前全部公开路由表 |

## 全量206行

| URL / Template | Page Type | Generated From | Indexable | Canonical | Current User Job |
|---|---|---|---|---|---|
'''
for p in routes:
 f=Path('src/app')/p.lstrip('/')/'page.tsx'
 if not f.exists():f=Path('src/app')/p.split('/')[1]/'[slug]'/'page.tsx'
 assert f.exists(),p
 libs=re.findall(r"from ['\"]@/lib/([^'\"]+)",f.read_text(encoding='utf-8'))
 libs=[x for x in libs if x not in ('seo-editorial','site-config')]
 src=f.as_posix()+(' → '+', '.join(libs) if libs else '')
 cat,job=category(p)
 head+=f"| `{p}` | {cat} | `{src}` | YES · index,follow | {pages[p]['canonical']} | {job} |\n"
head+='''
## 验证边界

原始内部链接检查没有不存在的业务路径，206页均有至少一个来自其他业务页的入链。发现7条缺静态fragment的链接：6条`#pg-arr=`由已有客户端协议接收，不能算断链；guide指向`/chords#find-a-chord`的一条确实没有目标。状态跳转正确性、外链可达性、浏览器音频和真机不在HTTP通过范围。全量详情任务能力因模板/对象不同，第三列给定位而非宣称每页具备完全相同练习。
'''
(base/'ROUTE_TEMPLATE_INVENTORY.md').write_text(head,encoding='utf-8')
assert len(routes)==len(set(routes))==len(pages)==206
print(json.dumps({'rows':len(routes),'types':counts},ensure_ascii=False))
