#!/usr/bin/env python3
import json, re, sys
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
DETAIL=ROOT/"04_details_next"
PC={"C":0,"C♯":1,"D♭":1,"D":2,"D♯":3,"E♭":3,"E":4,"F":5,"F♯":6,"G♭":6,"G":7,"G♯":8,"A♭":8,"A":9,"A♯":10,"B♭":10,"B":11,"C♭":11}
def midi(p):
    m=re.fullmatch(r"([A-G](?:♯|♭)?)(-?\d+)",p)
    assert m,p
    return 12*(int(m.group(2))+1)+PC[m.group(1)]
def pcs(notes):
    return sorted({PC[re.fullmatch(r"([A-G](?:♯|♭)?)(-?\d+)",n).group(1)] for n in notes})
count=0
for fp in DETAIL.glob("*.page.json"):
    d=json.loads(fp.read_text(encoding="utf-8"))
    data=d["data"]
    expected=[0,4,7] if data["quality"]=="major" else [0,3,7]
    rootpc=PC[data["root"]]
    assert sorted((PC[n]-rootpc)%12 for n in data["pitch_classes"])==expected,(fp,"formula")
    for v in data["voicings"]:
        assert [midi(n) for n in v["notes"]]==v["midi"],(fp,v["id"],"midi")
        assert v["midi"]==[x["midi"] for x in v["keyboard_highlights"]],(fp,v["id"],"highlight")
        assert v["midi"]==v["playback"]["simultaneous_midi"],(fp,v["id"],"audio")
        assert pcs(v["notes"])==sorted(PC[n] for n in data["pitch_classes"]),(fp,v["id"],"pitch class")
    count+=1
print(f"PASS: {count} detail JSON files validated")
