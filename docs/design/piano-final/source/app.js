/* Piano Reference: progressive enhancement; one selected voicing drives every result.
 * No remote services, sampled audio, cookies, storage, or device/MIDI inputs.
 */
(() => {
  'use strict';
  const payload = document.getElementById('piano-data');
  if (!payload) return;
  let data;
  try { data = JSON.parse(payload.textContent); } catch { return; }
  const { page, voicings } = data;
  const $ = (q, root = document) => root.querySelector(q);
  const $$ = (q, root = document) => [...root.querySelectorAll(q)];
  const tool = $('#am-result');
  const scroller = $('#keyboard-scroll');
  const status = $('#audio-status');
  const stopButton = $('#am-stop');
  const positionGroup = $('#position-fieldset');
  const playButtons = $$('.playback-actions [data-play-mode]');
  const audioConstructor = window.AudioContext || window.webkitAudioContext;
  let selectedVoicingId = page.selection.default_voicing_id;
  let audioState = 'idle', mode = null, audioContext = null;
  let generation = 0, animation = 0, printSnapshot = null, pendingAbort = null;
  const nodes = new Set();
  let scheduled = [], history = [];
  const current = () => voicings[selectedVoicingId];
  const noteNames = (v) => v.notes_low_to_high.map(n => n.display_pitch);

  function describeAudio(nextState, message = '') {
    audioState = nextState;
    tool.dataset.audioState = nextState;
    status.textContent = message;
    status.classList.toggle('error', nextState === 'error' || nextState === 'unavailable');
    stopButton.disabled = !['loading','playing'].includes(nextState);
    playButtons.forEach(btn => {
      btn.disabled = nextState === 'unavailable';
      btn.classList.toggle('is-playing', nextState === 'playing' && btn.dataset.playMode === mode);
    });
  }
  function markSounding(midiList) {
    const active = new Set(midiList);
    $$('.figure [data-midi], #note-order [data-midi]').forEach(el => {
      const on = active.has(Number(el.dataset.midi));
      el.classList.toggle(el.classList.contains('pitch') ? 'sounding' : 'is-sounding', on);
    });
  }
  function cancelAudio(message = '', announce = true) {
    generation++;
    if (pendingAbort) { pendingAbort.abort(); pendingAbort = null; }
    cancelAnimationFrame(animation);
    nodes.forEach(node => {
      // Disconnect first: a cancelled scheduled oscillator must never reach the output.
      try { node.gain.disconnect(); } catch {}
      try { node.oscillator.stop(); } catch {}
      try { node.oscillator.disconnect(); } catch {}
    });
    nodes.clear(); scheduled = []; mode = null; markSounding([]);
    if (announce) describeAudio(audioConstructor ? 'idle' : 'unavailable',
      audioConstructor ? message : page.microcopy.audio_unavailable);
  }
  async function startAudio(requestedMode) {
    if (!['together','ascending'].includes(requestedMode)) return;
    cancelAudio('', false);
    const thisGeneration = generation;
    const thisVoicing = current();
    mode = requestedMode;
    if (!audioConstructor) { describeAudio('unavailable', page.microcopy.audio_unavailable); return; }
    describeAudio('loading', page.microcopy.loading);
    let timeout, localAbort;
    try {
      if (!audioContext || audioContext.state === 'closed') {
        audioContext = new audioConstructor();
        audioContext.addEventListener('statechange', () => {
          if (audioState === 'playing' && audioContext.state !== 'running') {
            cancelAudio('', false);
            describeAudio('error', page.microcopy.audio_error);
          }
        });
      }
      // Browser autoplay policies may require resume; the initiating click is explicit.
      if (audioContext.state !== 'running') {
        localAbort = new AbortController(); pendingAbort = localAbort;
        await Promise.race([
          audioContext.resume(),
          new Promise((_, reject) => {
            timeout = setTimeout(() => reject(new Error('Audio start timeout')), 6000);
            localAbort.signal.addEventListener('abort', () => { clearTimeout(timeout); reject(new Error('Cancelled')); }, {once:true});
          })
        ]);
      }
      clearTimeout(timeout);
      if (pendingAbort === localAbort) pendingAbort = null;
      if (thisGeneration !== generation || document.hidden) return;
      if (audioContext.state !== 'running') throw new Error('Audio context is not running');
      const origin = audioContext.currentTime + 0.035;
      const events = thisVoicing.playback[requestedMode];
      scheduled = events.map(event => ({ ...event,
        startTime: origin + event.onset_ms / 1000,
        endTime: origin + (event.onset_ms + event.duration_ms) / 1000
      }));
      history.push({voicingId:thisVoicing.voicing_id, mode:requestedMode,
        generation:thisGeneration, events:scheduled.map(e=>({...e}))});
      if (history.length > 20) history.shift();
      scheduled.forEach(event => {
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(event.frequency_hz, event.startTime);
        // A short in-duration envelope prevents abrupt onset/release. No added notes/tail.
        gain.gain.setValueAtTime(0, event.startTime);
        gain.gain.linearRampToValueAtTime(0.12, event.startTime + 0.008);
        gain.gain.setValueAtTime(0.12, event.endTime - 0.035);
        gain.gain.linearRampToValueAtTime(0, event.endTime);
        oscillator.connect(gain); gain.connect(audioContext.destination);
        const node = {oscillator, gain}; nodes.add(node);
        oscillator.addEventListener('ended', () => {
          try { oscillator.disconnect(); gain.disconnect(); } catch {}
          nodes.delete(node);
        }, {once:true});
        oscillator.start(event.startTime); oscillator.stop(event.endTime);
      });
      describeAudio('playing', requestedMode === 'together' ? 'Playing chord…' : 'Playing notes one at a time…');
      const lastEnd = Math.max(...scheduled.map(e => e.endTime));
      const tick = () => {
        if (thisGeneration !== generation) return;
        const now = audioContext.currentTime;
        markSounding(scheduled.filter(e => now >= e.startTime && now < e.endTime).map(e => e.midi));
        if (now >= lastEnd) { cancelAudio('Playback finished.'); return; }
        animation = requestAnimationFrame(tick);
      };
      animation = requestAnimationFrame(tick);
    } catch (error) {
      clearTimeout(timeout);
      if (pendingAbort === localAbort) pendingAbort = null;
      if (thisGeneration !== generation) return;
      cancelAudio('', false); describeAudio('error', page.microcopy.audio_error);
    }
  }
  function updatePanButtons() {
    const max = scroller.scrollWidth - scroller.clientWidth;
    const hasOverflow = max > 2;
    $('#keyboard-pan').hidden = !hasOverflow;
    $('#pan-left').disabled = !hasOverflow || scroller.scrollLeft <= 1;
    $('#pan-right').disabled = !hasOverflow || scroller.scrollLeft >= max - 1;
    scroller.tabIndex = hasOverflow ? 0 : -1;
  }
  function revealSelected() {
    const marked = $$('.key.is-selected', scroller);
    if (!marked.length) return;
    const left = Math.min(...marked.map(el => el.offsetLeft));
    const right = Math.max(...marked.map(el => el.offsetLeft + el.offsetWidth));
    scroller.scrollLeft = Math.max(0, Math.min(scroller.scrollWidth - scroller.clientWidth,
      (left + right) / 2 - scroller.clientWidth / 2));
    updatePanButtons();
  }
  function setKeyboard(root, v) {
    const selected = new Set(v.diagram.highlight_midi);
    $$('[data-midi]', root).forEach(el => {
      el.classList.toggle('is-selected', selected.has(Number(el.dataset.midi)));
      el.classList.remove('is-sounding');
    });
    const bed = $('.key-bed', root);
    bed.setAttribute('aria-label', v.diagram.alt_text);
  }
  function updatePrint(v) {
    const print = $('#print-content');
    print.dataset.voicingId = v.voicing_id;
    $('#print-position').textContent = v.inversion_label;
    $('#print-symbol').textContent = v.chord_symbol;
    $('#print-notes').textContent = v.print_data.spelled_pitches.join(' – ');
    $('#print-bass').textContent = v.bass_spelling;
    setKeyboard(print, v);
  }
  function setVoicing(id, userInitiated = true) {
    if (!Object.hasOwn(voicings, id)) return;
    cancelAudio('', false);
    selectedVoicingId = id;
    const v = current();
    tool.dataset.voicingId = id;
    $('#current-symbol').textContent = v.chord_symbol;
    $('#current-bass').textContent = v.bass_spelling;
    const noteOrder = $('#note-order'); noteOrder.replaceChildren();
    v.notes_low_to_high.forEach((n,i) => {
      if (i) { const sep = document.createElement('span'); sep.className='separator'; sep.textContent='–'; sep.setAttribute('aria-hidden','true'); noteOrder.append(sep); }
      const note = document.createElement('span'); note.className='pitch'; note.dataset.midi=n.midi; note.textContent=n.display_pitch; noteOrder.append(note);
    });
    noteOrder.setAttribute('aria-label', `${page.microcopy.selected_note_summary}: ${noteNames(v).join(', ')}`);
    setKeyboard(scroller, v);
    $$('.position-fieldset input').forEach(input => { input.checked = input.value === id; });
    $$('.inversion-table tbody tr').forEach(row => {
      row.classList.toggle('is-current', row.dataset.voicingId === id);
    });
    if (!printSnapshot) updatePrint(v);
    describeAudio(audioConstructor ? 'idle':'unavailable', audioConstructor ? '' : page.microcopy.audio_unavailable);
    if (userInitiated) $('#selection-announcement').textContent = `${v.inversion_label}. ${v.chord_symbol}. ${page.microcopy.selected_note_summary}: ${noteNames(v).join(', ')}. Bass: ${v.bass_spelling}.`;
    requestAnimationFrame(revealSelected);
  }
  function printCurrent() {
    cancelAudio('');
    printSnapshot = selectedVoicingId; updatePrint(voicings[printSnapshot]);
    $('#resource-status').textContent = '';
    try { if (typeof window.print !== 'function') throw new Error('Print not supported'); window.print(); }
    catch { $('#resource-status').textContent = page.microcopy.print_error; printSnapshot = null; }
    // No success/cancel claim: afterprint cannot tell whether paper was actually printed.
  }
  positionGroup.disabled = false;
  $$('.position-fieldset input').forEach(input => input.addEventListener('change', () => setVoicing(input.value)));
  playButtons.forEach(button => button.addEventListener('click', () => startAudio(button.dataset.playMode)));
  stopButton.addEventListener('click', () => cancelAudio('Playback stopped.'));
  $$('[data-print-current]').forEach(button => { button.disabled=false; button.addEventListener('click', printCurrent); });
  $('#pan-left').addEventListener('click',()=>{scroller.scrollLeft-=scroller.clientWidth*.65;updatePanButtons();});
  $('#pan-right').addEventListener('click',()=>{scroller.scrollLeft+=scroller.clientWidth*.65;updatePanButtons();});
  scroller.addEventListener('scroll',updatePanButtons,{passive:true});
  scroller.addEventListener('keydown',event=>{
    if(event.key==='Home'){event.preventDefault();scroller.scrollLeft=0;}
    if(event.key==='End'){event.preventDefault();scroller.scrollLeft=scroller.scrollWidth;}
    if(event.key==='ArrowLeft'){event.preventDefault();scroller.scrollLeft-=72;}
    if(event.key==='ArrowRight'){event.preventDefault();scroller.scrollLeft+=72;}
    updatePanButtons();
  });
  if (window.ResizeObserver) new ResizeObserver(revealSelected).observe(scroller);
  else window.addEventListener('resize', revealSelected);
  window.addEventListener('beforeprint',()=>{cancelAudio('');updatePrint(voicings[printSnapshot || selectedVoicingId]);});
  window.addEventListener('afterprint',()=>{printSnapshot=null;updatePrint(current());});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)cancelAudio('Playback stopped.');});
  window.addEventListener('pagehide',()=>cancelAudio('',false));

  // Page-local search only. Destinations are existing sections of this one page.
  const dialog = $('#page-search');
  const searchInput = $('#page-search-input');
  const results = $('#search-results');
  function renderSearch() {
    const query = searchInput.value.trim().toLowerCase();
    const items = data.searchSections.filter(item => !query || item.text.toLowerCase().includes(query));
    results.replaceChildren();
    items.forEach(item=>{
      const a=document.createElement('a');a.href=`#${item.id}`;a.className='search-result';a.textContent=item.heading;
      a.addEventListener('click',()=>{dialog.close();requestAnimationFrame(()=>{$(`#${item.id}`).focus({preventScroll:true});});});
      results.append(a);
    });
    $('#search-status').textContent = items.length ? `${items.length} sections on this page` : 'No matching section on this page.';
  }
  const trigger=$('#search-trigger');
  trigger.hidden=false;
  trigger.addEventListener('click',()=>{cancelAudio('');renderSearch();dialog.showModal();searchInput.focus();});
  $('#search-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();event.stopPropagation();dialog.close();}},true);
  searchInput.addEventListener('input',renderSearch);
  dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
  setVoicing(selectedVoicingId,false);
  // Read-only diagnostics. Tests still verify rendered DOM and scheduled oscillator calls.
  Object.defineProperty(window,'PianoReference',{value:Object.freeze({
    getSnapshot:()=>({selectedVoicingId,audioState,mode,generation,activeNodeCount:nodes.size,
      printSnapshot,pendingStart:!!pendingAbort, scheduled:scheduled.map(e=>({...e})), history:JSON.parse(JSON.stringify(history))})
  }),writable:false});
})();
