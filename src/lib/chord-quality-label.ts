/** Reader-facing names for the quality IDs in the published chord datasets. */
const labels: Record<string, string> = {
  major: 'Major',
  minor: 'Minor',
  diminished: 'Diminished',
  augmented: 'Augmented',
  major7: 'Major seventh',
  minor7: 'Minor seventh',
  dominant7: 'Dominant seventh',
  halfDiminished7: 'Half-diminished seventh',
  major9: 'Major ninth',
  minor9: 'Minor ninth',
  dominant9: 'Dominant ninth',
  major11: 'Major eleventh',
  minor11: 'Minor eleventh',
  dominant11: 'Dominant eleventh',
  major13: 'Major thirteenth',
  minor13: 'Minor thirteenth',
  dominant13: 'Dominant thirteenth',
  dominant7Flat5: 'Dominant seventh, flat fifth',
  dominant7Sharp5: 'Dominant seventh, sharp fifth',
  dominant7Flat9: 'Dominant seventh, flat ninth',
  dominant7Sharp9: 'Dominant seventh, sharp ninth',
  dominant7Sharp11: 'Dominant seventh, sharp eleventh',
  dominant7Flat13: 'Dominant seventh, flat thirteenth',
  dominant7Flat9Flat13: 'Dominant seventh, flat ninth and flat thirteenth',
  dominant7Sharp5Sharp9: 'Dominant seventh, sharp fifth and sharp ninth',
  major6: 'Major sixth',
  minor6: 'Minor sixth',
  sixNine: 'Six-nine chord',
  minorMajor7: 'Minor-major seventh',
  diminished7: 'Diminished seventh',
  dominant7sus4: 'Dominant seventh suspended fourth',
  power5: 'Power fifth',
  sus2: 'Suspended second',
  sus4: 'Suspended fourth',
  add9: 'Major add ninth',
  minorAdd9: 'Minor add ninth',
};

export function chordQualityLabel(quality: string): string {
  return labels[quality] ?? 'Other chord type';
}

const familyLabels:Record<string,string>={triad:'Triad',seventh:'Seventh chord',extended:'Extended chord',altered:'Altered chord',power:'Power chord',sixth:'Sixth chord',suspended:'Suspended chord',add:'Added-note chord'};
export function chordFamilyLabel(family:string):string{return familyLabels[family]??'Chord';}
