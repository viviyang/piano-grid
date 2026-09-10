// One-time audited migration of component layout. Does not execute prototype JS.
import fs from 'node:fs';
import postcss from 'postcss';
const css=postcss.parse(fs.readFileSync('docs/design/reference/final-prototype.css','utf8'));
const rename=s=>s.replace(/\.([a-zA-Z][\w-]*)/g,(_,n)=>n==='container'?'.pr-container':n==='sr-only'?'.pr-sr-only':n==='btn'?'.am-button':`.am-${n}`);
let started=false;
css.nodes.slice().forEach(n=>{if(n.type==='rule'&&n.selector==='.skip')started=true;if(!started)n.remove();});
css.walkRules(rule=>{
  const original=rule.selector;
  if(original==='body'||original.startsWith('h1')||original.includes('html')||original===':root'||original==='.container'||original==='*'){rule.remove();return;}
  const inPrint=rule.parent.type==='atrule'&&rule.parent.params==='print';
  if(original.includes('.screen-only'))rule.selector='.am-page .am-screen, .am-page dialog';
  else rule.selector=original.split(',').map(s=>`.am-page ${rename(s.trim())}`).join(',');
  const role={'.chord-id':'chord','.tone-list':'notes','.note-order':'result','.formula':'formula','.key-label':'key-label','.playback-feedback':'meta','.tool-notes':'copy','.intro-rest':'copy','.field-label':'label'}[original];
  const aliases={canvas:'background',ink:'foreground',muted:'muted-foreground',line:'border','control-border':'input',action:'primary','action-hover':'primary-hover','selected-bg':'selected-hover','note-selected':'piano-note-selected','note-mark':'piano-note-mark','note-sounding':'piano-note-sounding','disabled-bg':'disabled',font:'pr-font-sans',radius:'pr-radius-panel'};
  const colors={'#fff':'background','#ffffff':'background','#1d1d1f':'foreground','#7a828e':'input','#8b919a':'piano-key-border','#686f79':'disabled-foreground','#e9ebef':'control-track','#f2f4f7':'control-hover','#dce8f8':'control-pressed','#e9edf3':'secondary-hover','#111':'print-key-black','#555':'print-key-border','#888':'print-divider'};
  rule.walkDecls(d=>{
    d.value=d.value.replace(/var\(--([\w-]+)\)/g,(s,n)=>`var(--${aliases[n]||n})`).replace(/#[0-9a-fA-F]{3,8}\b/g,s=>colors[s.toLowerCase()]?`var(--${colors[s.toLowerCase()]})`:s);
    if(role&&!inPrint){const suffix={'font-size':'size','line-height':'leading','font-weight':'weight','letter-spacing':'tracking'}[d.prop];if(suffix)d.value=`var(--pr-type-${role}-${suffix})`;}
    if(original==='.tool'&&d.prop==='padding')d.value='var(--pr-tool-padding)';
    if(original==='.key-bed'&&d.prop==='height')d.value='var(--pr-piano-white-height)';
    if(original==='.key .marker'&&d.prop==='bottom')d.value='var(--pr-piano-marker-bottom)';
    if(original==='.radio-label .segment'&&d.prop==='min-height')d.value='var(--pr-segment-min-height)';
    if(original==='.btn'&&['min-height','min-width'].includes(d.prop))d.value='var(--pr-control-min-size)';
    if(original==='.btn'&&d.prop==='font-size')d.value='var(--pr-type-ui-size)';
    if(original==='.btn'&&d.prop==='line-height')d.value='var(--pr-type-ui-leading)';
    if(original==='.btn'&&d.prop==='font-weight')d.value='var(--pr-type-ui-weight)';
    if(d.prop==='transition')d.value=d.value.replace(/\.12s/g,'var(--pr-duration-fast)');
    if(d.prop==='transform')d.value=d.value.replace('translateY(1px)','translateY(var(--pr-pressed-translate))');
    if(d.prop==='background'&&d.value==='rgba(29,29,31,.35)')d.value='var(--pr-overlay)';
  });
});
css.walkAtRules('media',a=>{if(a.params.includes('prefers-reduced-motion'))a.remove();});
const extra=`
/* Local component geometry migrated from final-prototype-1.0.0; root theme and
   global element resets are supplied only by the existing Foundation. */
.am-page .am-icon { display:block; width:var(--pr-icon-default); height:var(--pr-icon-default); flex:none; }
.am-page .am-button,.am-page .am-pan-btn,.am-page .am-search-trigger { cursor:pointer; }
.am-page button:disabled { cursor:not-allowed; }
.am-page .am-button { transition-timing-function:var(--pr-motion-ease); }
.am-page .am-summary dt { font-size:var(--pr-type-label-size); }
.am-page .am-content-section h2 {font-size:var(--pr-type-section-title-size);}
@media (prefers-reduced-motion:reduce) { .am-page *, .am-page *::before, .am-page *::after {transition:none!important;animation:none!important;scroll-behavior:auto!important;} .am-page .am-button:active {transform:none;} }
@media (forced-colors:active) { .am-page .am-radio-label input:focus-visible + .am-segment {outline-color:Highlight;} .am-page .am-radio-label input:checked + .am-segment {border-color:Highlight;} .am-page .am-key.am-is-selected {outline:2px solid Highlight;outline-offset:-3px;} }
`;
const selection=['root','first','second'].map(id=>{
 const row=`.am-page[data-selected-voicing="a-minor--${id}"] .am-inversion-table tr[data-voicing-id="a-minor--${id}"]`;
 return `${row}{background:var(--selected-hover)}\n${row} .am-current-row-mark{visibility:visible}\n${row} .am-row-selected-label{display:inline}`;
}).join('\n');
fs.writeFileSync('src/app/chords/a-minor/a-minor.css',extra+css.toString()+'\n'+selection+'\n');
