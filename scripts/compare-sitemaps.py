#!/usr/bin/env python3
"""Fetch/parse sitemap XML and compare with a supplied PianoGrid URL inventory.
Read-only: never modifies the repository, sitemap, robots, redirects, or indexability.
Python 3.10+ standard library. Supports saved XML files when network access fails.
URL-pattern topic matches are candidates, not content/SEO acceptance.
"""
from __future__ import annotations
import argparse, collections, csv, gzip, hashlib, json, re, sys, time
from pathlib import Path
from urllib.parse import urlparse, urljoin, urldefrag
from urllib.request import Request, urlopen
from urllib.error import HTTPError
from urllib.robotparser import RobotFileParser
from xml.etree import ElementTree as ET

UA = "PianoGridSitemapAudit/1.0"
MAX_BYTES = 52_428_800
ROOT_PC = dict(C=0,D=2,E=4,F=5,G=7,A=9,B=11)
FAMILIES = {
 "major":"Major","minor":"Minor","seventh":"Seventh","extended":"Extended",
 "sus":"Suspended","dim":"Diminished","aug":"Augmented","add":"Add","altered":"Altered",
}
QUALITIES = {
 "major":["Major"],"m":["Minor"],"7":["Dominant 7"],"maj7":["Major 7"],"m7":["Minor 7"],
 "m7b5":["Half-diminished 7"],"dim":["Diminished"],"aug":["Augmented"],
 "sus":["Sus2","Sus4"],"add":["Add9"],"madd":["Minor Add9"],
 "extended":["Dominant 9"],"9":["Dominant 9"],"m9":["Minor 9"],"maj9":["Major 9"],
 "11":["Dominant 11"],"m11":["Minor 11"],"maj11":["Major 11"],
 "13":["Dominant 13"],"m13":["Minor 13"],"maj13":["Major 13"],
 "dim7":["Diminished 7"],"aug7":["Augmented 7"],"mm7":["Minor major 7"],
 "6":["Major 6"],"m6":["Minor 6"],"69":["6/9"],"5":["Power chord"],
 "75":["Altered candidate"],"7+5":["Altered candidate"],
}
def read_csv(p):
 with Path(p).open(encoding="utf-8-sig",newline="") as f:return list(csv.DictReader(f))
def write_csv(p, rows, fields):
 with Path(p).open("w",encoding="utf-8-sig",newline="") as f:
  w=csv.DictWriter(f,fieldnames=fields);w.writeheader();w.writerows(rows)
def tag(x):return x.rsplit("}",1)[-1].split(":")[-1]
def child_text(node,key):
 for c in node:
  if tag(c.tag)==key:return (c.text or "").strip()
 return ""
def normalize(u):
 u=urldefrag(u.strip())[0]
 p=urlparse(u)
 if p.scheme not in ("https","http") or not p.hostname:raise ValueError("Invalid absolute URL: "+u)
 # Preserve path/query case and spelling. Do not conflate enharmonic roots.
 return p._replace(scheme=p.scheme.lower(),netloc=p.netloc.lower()).geturl()
class Collector:
 def __init__(self,out,max_maps,delay):
  self.out=out;self.max_maps=max_maps;self.delay=delay;self.last=0.;self.logs=[];self.robots={}
 def bytes(self,url,check_robots=True):
  p=urlparse(url)
  if p.scheme not in ("http","https"):return Path(url).read_bytes()
  origin=f"{p.scheme}://{p.netloc}"
  if check_robots and origin not in self.robots:
   robot_url=origin+"/robots.txt"
   try:
    raw=self.bytes(robot_url,False)
    rp=RobotFileParser(robot_url);rp.parse(raw.decode("utf-8",errors="replace").splitlines())
   except HTTPError as e:
    if e.code in (404,410):
     rp=RobotFileParser();rp.parse([])
    else:raise RuntimeError(f"robots.txt access failed ({e.code}); stop rather than bypass.")
   self.robots[origin]=rp
  if check_robots and not self.robots[origin].can_fetch(UA,url):
   raise RuntimeError("robots.txt disallows: "+url)
  time.sleep(max(0,self.delay-(time.monotonic()-self.last)));self.last=time.monotonic()
  with urlopen(Request(url,headers={"User-Agent":UA,"Accept":"application/xml,text/xml,*/*;q=0.2"}),timeout=30) as r:
   raw=r.read(MAX_BYTES+1)
  if len(raw)>MAX_BYTES:raise RuntimeError("Response exceeds size limit")
  if raw[:2]==b"\x1f\x8b":raw=gzip.decompress(raw)
  if len(raw)>MAX_BYTES:raise RuntimeError("Decompressed response exceeds size limit")
  return raw
 def collect(self,source,label):
  queue=[str(source)];seen=set();rows=[]
  while queue:
   s=queue.pop(0)
   if s in seen:continue
   if len(seen)>=self.max_maps:raise RuntimeError("Sitemap file cap reached; partial output must not be treated as complete")
   seen.add(s)
   raw=self.bytes(s)
   if b"<!DOCTYPE" in raw.upper():raise RuntimeError("DTD not accepted")
   root=ET.fromstring(raw)
   kind=tag(root.tag)
   if kind not in ("urlset","sitemapindex"):raise RuntimeError("Expected XML sitemap, received "+kind)
   name=label+"_"+hashlib.sha256(s.encode()).hexdigest()[:12]+".xml"
   (self.out/"raw"/name).write_bytes(raw)
   self.logs.append(dict(source=s,label=label,kind=kind,saved_file="raw/"+name,bytes=len(raw)))
   if kind=="sitemapindex":
    for node in root:
     if tag(node.tag)!="sitemap":continue
     loc=child_text(node,"loc")
     if not loc:continue
     if urlparse(s).scheme in ("http","https"):
      loc=normalize(urljoin(s,loc))
      if urlparse(loc).hostname!=urlparse(s).hostname:
       raise RuntimeError("Cross-host child sitemap requires manual review: "+loc)
     elif urlparse(loc).scheme not in ("http","https"):
      loc=str((Path(s).parent/loc).resolve())
     queue.append(loc)
   else:
    for node in root:
     if tag(node.tag)!="url":continue
     loc=child_text(node,"loc")
     if loc:rows.append(dict(url=normalize(loc),lastmod=child_text(node,"lastmod"),source_sitemap=s))
  # Duplicates are reported; lastmod is NOT interpreted as first publication time.
  unique={}
  for r in rows:unique.setdefault(r["url"],r)
  return rows,list(unique.values())
def classify(url):
 """Conservative URL-shape inference. Content and mixed pages must still be checked."""
 p=urlparse(url);name=Path(p.path).name
 if not name or name in ("index.html","sitemap.html"):return ("Structure","",None,[])
 stem=name[:-5] if name.endswith(".html") else name
 if stem in FAMILIES:return ("Family","",None,[FAMILIES[stem]])
 m=re.match(r"^([a-g])",stem)
 if not m:return ("Unclassified","",None,[])
 letter=m[1].upper()
 accidental="flat" if re.search(r"(?:^|-)flat(?:-|$)",stem) else (
 "sharp" if re.search(r"(?:^|-)sharp(?:-|$)",stem) else "")
 # Real site examples: dm-flat.html / d7-flat.html / d-flat-m7b5.html.
 cleaned=re.sub(r"-(flat|sharp)(?=-|$)","",stem)
 rest=cleaned[1:].replace("-","")
 root=letter+{"flat":"b","sharp":"#","":""}[accidental]
 pc=(ROOT_PC[letter]+{"flat":-1,"sharp":1,"":0}[accidental])%12
 if rest=="":return ("Root hub",root,pc,[])
 if rest=="filter":return ("Root collection",root,pc,[])
 quals=QUALITIES.get(rest,[])
 return ("Detail candidate" if quals else "Unclassified",root,pc,quals)
def self_test():
 cases={
 "https://www.pianochord.org/d7-flat.html":("Db",["Dominant 7"]),
 "https://www.pianochord.org/dm-flat.html":("Db",["Minor"]),
 "https://www.pianochord.org/d-flat-m7b5.html":("Db",["Half-diminished 7"]),
 "https://www.pianochord.org/c-sus.html":("C",["Sus2","Sus4"]),
 "https://www.pianochord.org/cm-add.html":("C",["Minor Add9"]),
 "https://www.pianochord.org/b-major.html":("B",["Major"]),
 "https://www.pianochord.org/b-flat-major.html":("Bb",["Major"]),
 }
 for u,(root,qs) in cases.items():
  _,r,_,q=classify(u);assert (r,q)==(root,qs),(u,r,q)
 assert classify("https://www.pianochord.org/cm9.html")[3]!=["Minor Add9"]
 assert classify("https://www.pianochord.org/c-dim7.html")[3]!=["Diminished"]
 print("SELF_TEST_PASS: parser preserves root/quality distinctions")
def main():
 ap=argparse.ArgumentParser(description=__doc__)
 ap.add_argument("--own-csv",type=Path)
 ap.add_argument("--competitor",default="https://www.pianochord.org/sitemap.xml")
 ap.add_argument("--site",default="https://pianogrid.com/sitemap.xml")
 ap.add_argument("--out",type=Path,default=Path("sitemap-comparison-output"))
 ap.add_argument("--delay",type=float,default=1.0)
 ap.add_argument("--max-sitemaps",type=int,default=30)
 ap.add_argument("--self-test",action="store_true")
 args=ap.parse_args()
 if args.self_test:self_test();return
 if not args.own_csv:ap.error("--own-csv required")
 args.out.mkdir(parents=True,exist_ok=True);(args.out/"raw").mkdir(exist_ok=True)
 collector=Collector(args.out,args.max_sitemaps,max(0.5,args.delay))
 result={"competitor_complete":False,"site_complete":False,"warnings":[],"errors":[]}
 comp=[]
 for label,source in [("competitor",args.competitor),("site",args.site)]:
  try:
   raw,uniq=collector.collect(source,label)
   write_csv(args.out/(label+"_xml_urls.csv"),uniq,["url","lastmod","source_sitemap"])
   result[label+"_complete"]=True
   result[label+"_raw_loc_count"]=len(raw);result[label+"_unique_url_count"]=len(uniq)
   result[label+"_duplicate_loc_count"]=len(raw)-len(uniq)
   if label=="competitor":comp=uniq
   if label=="site":
    site_paths={urlparse(r["url"]).path.rstrip("/") or "/" for r in uniq}
    module_paths={p for p in site_paths if p=="/chords" or p.startswith("/chords/") or p=="/chord-progressions"}
    supplied_paths={urlparse(r["url"]).path.rstrip("/") or "/" for r in read_csv(args.own_csv)}
    result["site_module_url_count_including_progressions"]=len(module_paths)
    result["own_csv_missing_from_live_sitemap"]=sorted(supplied_paths-site_paths)
    result["live_module_not_in_own_csv"]=sorted(module_paths-supplied_paths)
  except Exception as e:
   result["errors"].append(label+": "+str(e))
   # Crucially no fabricated zero count on failure.
 own=read_csv(args.own_csv)
 result["own_csv_unique_urls"]=len({r["url"] for r in own})
 classified=[];strict=collections.defaultdict(list);eq=collections.defaultdict(list)
 for row in comp:
  typ,root,pc,quals=classify(row["url"])
  classified.append(dict(**row,page_type=typ,root_spelling=root,pitch_class=pc,
   inferred_topics=";".join(quals),evidence="XML_MEMBER_URL_PATTERN_NOT_CONTENT_VERIFIED"))
  for q in quals:
   strict[(root,q)].append(row["url"]);eq[(pc,q)].append(row["url"])
 if result["competitor_complete"]:
  write_csv(args.out/"competitor_topics.csv",classified,["url","lastmod","source_sitemap","page_type","root_spelling","pitch_class","inferred_topics","evidence"])
  matches=[]
  for row in own:
   root=row.get("root_spelling","");family=row.get("family","")
   pc=row.get("pitch_class","");pc=int(pc) if str(pc)!="" else None
   exact=strict.get((root,family),[])
   enh=[u for u in eq.get((pc,family),[]) if u not in exact] if pc is not None else []
   matches.append(dict(url=row["url"],page_type=row.get("page_type",""),family=family,
    strict_spelling_topic_urls=";".join(exact),enharmonic_candidate_urls=";".join(enh),
    match_state="PATTERN_MATCH_REVIEW_CONTENT" if exact else (
     "ENHARMONIC_ONLY_REVIEW_SPELLING" if enh else "NO_PATTERN_MATCH_NOT_PROOF_OF_ABSENCE"),
    action="NO_AUTOMATIC_URL_OR_INDEX_CHANGE"))
  write_csv(args.out/"own_vs_competitor_topics.csv",matches,list(matches[0]) if matches else ["url"])
  result["competitor_page_type_counts"]=dict(collections.Counter(r["page_type"] for r in classified))
  result["strict_candidate_matches"]=sum(bool(r["strict_spelling_topic_urls"]) for r in matches)
  result["warnings"].append("Topic counts depend on URL-pattern inference; audit Unclassified and multi-topic pages. Sitemap membership is not Google indexing/ranking.")
 (args.out/"fetch_log.json").write_text(json.dumps(collector.logs,ensure_ascii=False,indent=2),encoding="utf-8")
 (args.out/"SUMMARY.json").write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding="utf-8")
 print(json.dumps(result,ensure_ascii=False,indent=2))
 if result["errors"]:sys.exit(2)
if __name__=="__main__":main()
