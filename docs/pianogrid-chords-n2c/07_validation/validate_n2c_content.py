#!/usr/bin/env python3
import json,re
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
nat={"C":0,"D":2,"E":4,"F":5,"G":7,"A":9,"B":11}
acc={"":0,"♯":1,"♭":-1,"𝄪":2,"𝄫":-2}
pat=re.compile(r"^([A-G])(𝄪|𝄫|♯|♭)?(-?\d+)?$")
expected={"dominant7":[0,4,7,10],"major7":[0,4,7,11],"minor7":[0,3,7,10],"halfDiminished7":[0,3,6,10]}
def parse(s):
    m=pat.match(s); assert m,s
    return (nat[m.group(1)]+acc[m.group(2) or ""])%12, None if m.group(3) is None else int(m.group(3))
def midi(s):
    m=pat.match(s); assert m,s
    raw=nat[m.group(1)]+acc[m.group(2) or ""]
    o=int(m.group(3)); return 12*(o+1)+raw
counts={k:0 for k in expected}
for fp in sorted((ROOT/"03_details").glob("*.page.json")):
    d=json.loads(fp.read_text(encoding="utf-8"))
    sub=d["subtype"]; counts[sub]+=1
    rp,_=parse(d["rootSpelling"])
    ints=sorted((parse(x)[0]-rp)%12 for x in d["definition"]["toneSpellings"])
    assert ints==expected[sub],(fp,ints,expected[sub])
    assert d["family"]=="seventh"
    assert d["expectedNoteCount"]==4
    assert d["practice"]["requiredPitchClassCount"]==4
    assert len(d["voicings"])==4
    assert [v["position"]["inversionIndex"] for v in d["voicings"]]==[0,1,2,3]
    for v in d["voicings"]:
        mm=[midi(x) for x in v["notesLowToHigh"]]
        assert mm==v["midiLowToHigh"],(fp,v["id"],"midi")
        assert mm==[x["midi"] for x in v["keyboardHighlights"]],(fp,v["id"],"keyboard")
        assert mm==[x["midi"] for x in v["playbackEvents"]],(fp,v["id"],"audio")
        assert v["printPitches"]==v["notesLowToHigh"],(fp,v["id"],"print")
        assert v["fingering"]["status"]=="not_provided"
        assert mm==sorted(mm)
assert counts=={"dominant7":12,"major7":12,"minor7":12,"halfDiminished7":12},counts
print("PASS",counts,"total",sum(counts.values()))
