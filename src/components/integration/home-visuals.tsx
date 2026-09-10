import type { CSSProperties } from 'react';

export function HomeBrandMark() {
  return <svg className="ph-brand-mark" viewBox="0 0 64 64" aria-hidden="true"><path d="M10 36 34 11c3-3 7-4 10-2 4 2 4 6 2 10-2 5 0 8 5 10 3 1 4 4 3 8v7H10Z" fill="currentColor"/><path d="M14 44h5v11h-5zm31 0h5v11h-5z" fill="currentColor"/><path d="M13 36h38v4H13z" className="ph-brand-cut"/></svg>;
}

export function HomeArrow() {
  return <svg className="ph-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5"/></svg>;
}

function StaffLines({x1=73,x2=160,ys=[39,44,49,54,59]}:{x1?:number;x2?:number;ys?:number[]}) {
  return <>{ys.map(y=><path key={y} d={`M${x1} ${y}h${x2-x1}`} className="ph-art-line"/>)}</>;
}

export function TaskIllustration({route}:{route:string}) {
  if(route==='/chords')return <svg viewBox="0 0 234 144" aria-hidden="true"><rect x="9" y="20" width="218" height="108" rx="7" className="ph-art-ink"/>{[15,44,73,102,131,160,189].map((x,i)=><rect key={x} x={x} y="28" width="28" height="93" rx="3" className={[0,2,4].includes(i)?'ph-art-soft':'ph-art-paper'}/>)}{[35,64,122,151,180].map(x=><rect key={x} x={x} y="28" width="17" height="56" rx="3" className="ph-art-ink"/>)}{[29,87,145].map(cx=><circle key={cx} cx={cx} cy="101" r="5" className="ph-art-accent"/>)}</svg>;
  if(route==='/scales')return <svg viewBox="0 0 234 144" aria-hidden="true"><path d="M20 110 215 32" className="ph-art-line"/>{[24,50,76,102,128,154,180,206].map((x,i)=><g key={x}><path d={`M${x} ${102-i*10}v${22+i*5}`} className={i===0||i===7?'ph-scale-active':'ph-scale-step'}/><text x={x} y={82-i*10} textAnchor="middle" className="ph-art-label">{i+1}</text></g>)}</svg>;
  if(route==='/keyboard-notes')return <svg viewBox="0 0 234 144" aria-hidden="true"><text x="23" y="92" className="ph-note-letter">C</text><text x="87" y="92" className="ph-note-letter">D</text><text x="153" y="92" className="ph-note-letter ph-art-accent-fill">E</text><path d="M25 115h188" className="ph-art-line"/><circle cx="184" cy="115" r="4" className="ph-art-accent"/></svg>;
  if(route==='/songs')return <svg viewBox="0 0 234 144" aria-hidden="true"><rect x="57" y="12" width="120" height="122" rx="3" className="ph-art-paper"/><StaffLines/><StaffLines ys={[84,89,94,99,104]}/><path d="M87 56V29m27 22V24m21 78V75" className="ph-art-note-stem"/><ellipse cx="83" cy="56" rx="5" ry="3.5" transform="rotate(-18 83 56)" className="ph-art-ink"/><ellipse cx="110" cy="51" rx="5" ry="3.5" transform="rotate(-18 110 51)" className="ph-art-ink"/><ellipse cx="131" cy="102" rx="5" ry="3.5" transform="rotate(-18 131 102)" className="ph-art-accent"/></svg>;
  if(route==='/guide')return <svg viewBox="0 0 234 144" aria-hidden="true"><path d="M117 38c-24-14-53-13-76-9v93c25-5 51-5 76 9 25-14 51-14 76-9V29c-23-4-52-5-76 9Z" className="ph-art-soft"/><path d="M117 38v93M58 52l41 6m-41 9 41 6m-41 9 41 6m38-30 39-6m-39 21 39-6m-39 21 39-6" className="ph-art-line-bold"/><path d="M158 27v38l8-6 8 5V26" className="ph-art-accent"/></svg>;
  return <svg viewBox="0 0 234 144" aria-hidden="true"><path d="M58 12h102l20 22v96H58Z" className="ph-art-paper"/><path d="M160 12v23h20" className="ph-art-line-bold"/><StaffLines x1={74} x2={161} ys={[49,54,59,64,69,89,94,99,104,109]}/></svg>;
}

export function SongsCover() {
  return <div className="ph-collection-art" aria-hidden="true"><div className="ph-cover-lines"/><span className="ph-cover-kicker">PIANO / SONG IDEAS</span><span className="ph-cover-title">A little<br/><em>music.</em><br/>Every day.</span><span className="ph-cover-bottom">YOUR NEXT PIECE STARTS WITH CURIOSITY.</span><svg className="ph-cover-note" viewBox="0 0 200 240"><path d="M100 167V47l65-14v119" stroke="currentColor" strokeWidth="5" fill="none"/><ellipse cx="76" cy="173" rx="27" ry="18" transform="rotate(-20 76 173)" fill="currentColor"/><ellipse cx="140" cy="157" rx="27" ry="18" transform="rotate(-20 140 157)" fill="currentColor"/></svg></div>;
}

export function ReadingCover() {
  return <div className="ph-reading-art" aria-hidden="true"><div className="ph-reading-paper"><div className="ph-paper-heading">A CLOSER LOOK</div><svg viewBox="0 0 350 150"><path d="M15 45h320M15 57h320M15 69h320M15 81h320M15 93h320" className="ph-art-line"/><path d="M100 100V35m76 53V23m75 53V11" className="ph-art-note-stem"/><ellipse cx="91" cy="100" rx="10" ry="7" transform="rotate(-20 91 100)" className="ph-art-ink"/><ellipse cx="167" cy="88" rx="10" ry="7" transform="rotate(-20 167 88)" className="ph-art-accent"/><ellipse cx="242" cy="76" rx="10" ry="7" transform="rotate(-20 242 76)" className="ph-art-ink"/></svg><div className="ph-paper-rule"/><span>See the pattern.<br/><em>Find your way.</em></span></div></div>;
}

export function GrandPianoIllustration() {
  return <div className="ph-grand-illustration" aria-hidden="true"><svg viewBox="0 0 640 430"><defs><linearGradient id="ph-lid" x1="0" y1="0" x2="1" y2="1"><stop stopColor="var(--foreground)"/><stop offset="1" stopColor="var(--piano-key-black)"/></linearGradient><linearGradient id="ph-rim" x1="0" y1="0" x2="1" y2="0"><stop stopColor="var(--piano-key-black)"/><stop offset=".6" stopColor="var(--muted-foreground)"/><stop offset="1" stopColor="var(--foreground)"/></linearGradient></defs><ellipse cx="330" cy="376" rx="245" ry="18" fill="var(--border)"/><path d="M148 227 345 58l129 69-51 118Z" fill="url(#ph-lid)"/><path d="m150 227 195-169 129 69" fill="none" stroke="var(--muted-foreground)" strokeWidth="3"/><path d="m251 219 57-116" stroke="var(--muted-foreground)" strokeWidth="5"/><path d="M123 231 373 222c110-3 184 13 175 43-6 20-94 35-164 37l-261-11Z" fill="url(#ph-rim)"/><path d="M122 243h247v53H122Z" fill="var(--foreground)"/><path d="m142 289 9 88h12l8-86m211 0 9 86h12l5-91m112-22 9 106h12l6-111" fill="var(--foreground)"/><path d="M118 258h245l10 14H116Z" fill="var(--background)"/>{Array.from({length:26},(_,i)=><path key={i} d={`M${128+i*9} 258v14`} stroke="var(--input)" strokeWidth=".7"/>)}{[130,139,157,166,175,193,202,220,229,238,256,265,283,292,301,319,328,346].map(x=><path key={x} d={`M${x} 258v9`} stroke="var(--piano-key-black)" strokeWidth="5"/>)}<path d="M121 275h255v16H121Z" fill="var(--piano-key-black)"/><path d="m120 244 254-7" stroke="var(--muted-foreground)" strokeWidth="2"/><path d="M247 299v49m25-47v47m23-48v48" stroke="var(--input)" strokeWidth="3"/><path d="M240 348h65" stroke="var(--input)" strokeWidth="6" strokeLinecap="round"/><path d="M54 316h72v12H54Zm6 12v48h5l3-48m44 0 3 48h5v-48" fill="var(--foreground)"/></svg></div>;
}

export function keyPosition(edge:number,keys:number):CSSProperties {
  return {left:`calc(100% / ${keys} * ${edge} - 100% / ${keys} * .3)`,width:`calc(100% / ${keys} * .59)`};
}
