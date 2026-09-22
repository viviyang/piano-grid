import type { PlaybackMode, Voicing } from './a-minor-types';
export type AudioStatus = 'idle'|'loading'|'playing'|'stopped'|'error'|'unavailable';
export type AudioPlayResult = 'completed' | 'cancelled' | 'error' | 'unavailable';
type AudioWindow = Window & { webkitAudioContext?: typeof AudioContext; __pianoGridAudioOwner?: () => void };
type AudioNavigator = Navigator & { audioSession?: { type: string } };

// Lifecycle-owned, cancellable Web Audio scheduler. No browser access at module load.
export class ReferenceAudio {
  private context: AudioContext | null = null;
  private generation = 0;
  private animation: ReturnType<typeof setTimeout> | undefined;
  private abort: AbortController | null = null;
  private nodes = new Set<{oscillator:OscillatorNode;gain:GainNode}>();
  private state: AudioStatus = 'idle';
  private disposed = false;
  private volume = .12;
  private held = new Map<string, number>();
  private live = new Map<number, {oscillator: OscillatorNode; gain: GainNode}>();
  private scheduled: number[] = [];
  private sustain = false;
  private finishPlayback: (() => void) | null = null;
  private liveResumeCancels = new Set<() => void>();
  private readonly ownerCancel = () => this.cancel('Playback stopped.');
  constructor(private status:(state:AudioStatus,message:string,mode:PlaybackMode|null)=>void, private mark:(midi:number[])=>void,
    private copy:{loading:string;audio_error:string;audio_unavailable:string}) {}
  get available() { return Boolean(window.AudioContext || (window as AudioWindow).webkitAudioContext); }
  get currentStatus() { return this.state; }
  setVolume(value:number) {
    this.volume=Math.max(0,Math.min(1,value))*.18;
    if(this.context)for(const node of this.live.values())node.gain.gain.setTargetAtTime(this.volume,this.context.currentTime,.01);
  }
  private emit(notes:number[]) { this.scheduled=notes;this.mark([...new Set([...notes,...this.live.keys()])]); }
  setSustain(value:boolean) {
    this.sustain=value;
    if(!value)for(const midi of [...this.live.keys()])if(![...this.held.values()].includes(midi))this.endNote(midi);
  }
  private endNote(midi:number) {
    const node=this.live.get(midi);if(!node)return;
    // Disconnect synchronously: Stop/release never leaves a queued tail behind.
    try{node.gain.disconnect();node.oscillator.stop();node.oscillator.disconnect();}catch{}
    this.live.delete(midi);this.emit(this.scheduled);
    if(!this.live.size&&!this.scheduled.length)this.describe('idle');
  }
  release(source:string) {
    const midi=this.held.get(source);this.held.delete(source);
    if(midi!==undefined&&!this.sustain&&![...this.held.values()].includes(midi))this.endNote(midi);
  }
  async press(midi:number,source:string):Promise<void> {
    if(this.disposed||this.held.has(source))return;
    const Constructor=window.AudioContext||(window as AudioWindow).webkitAudioContext;
    if(!Constructor){this.describe('unavailable',this.copy.audio_unavailable);return;}
    const audioWindow=window as AudioWindow;
    if(audioWindow.__pianoGridAudioOwner&&audioWindow.__pianoGridAudioOwner!==this.ownerCancel)audioWindow.__pianoGridAudioOwner();
    audioWindow.__pianoGridAudioOwner=this.ownerCancel;
    this.held.set(source,midi);
    const generation=this.generation;
    let timeout:ReturnType<typeof setTimeout>|undefined;
    let cancelResume:(()=>void)|undefined;
    try{
      const session=(navigator as AudioNavigator).audioSession;
      if(session)try{session.type='playback';}catch{}
      if(!this.context||this.context.state==='closed'){
        const context=new Constructor();this.context=context;
        context.addEventListener('statechange',()=>{
          if(!this.disposed&&this.context===context&&this.state==='playing'&&context.state!=='running'){
            this.cancel('', 'idle', false);this.releaseContext();this.describe('error',this.copy.audio_error);
          }
        });
      }
      const context=this.context;
      if(!this.live.has(midi)){
        const oscillator=context.createOscillator(),gain=context.createGain();
        oscillator.type='sine';oscillator.frequency.setValueAtTime(440*2**((midi-69)/12),context.currentTime);
        gain.gain.setValueAtTime(0,context.currentTime);gain.gain.linearRampToValueAtTime(this.volume,context.currentTime+.008);
        oscillator.connect(gain);gain.connect(context.destination);oscillator.start();
        this.live.set(midi,{oscillator,gain});
      }
      // Source nodes start in the trusted event before the resume promise.
      if(context.state!=='running'){
        this.describe('loading',this.copy.loading);
        await Promise.race([context.resume(),new Promise<never>((_,reject)=>{
          timeout=setTimeout(()=>reject(new Error('Audio start timeout')),6000);
          cancelResume=()=>reject(new Error('Cancelled'));
          this.liveResumeCancels.add(cancelResume);
        })]);
      }
      if(this.disposed||generation!==this.generation)return;
      if(context.state!=='running')throw new Error('Audio unavailable');
      this.emit(this.scheduled);
      if(this.live.size)this.describe('playing','Playing keys…');
    }catch{
      if(this.disposed||generation!==this.generation)return;
      this.cancel('', 'idle', false);this.releaseContext();this.describe('error',this.copy.audio_error);
    }finally{clearTimeout(timeout);if(cancelResume)this.liveResumeCancels.delete(cancelResume);}
  }
  private describe(state:AudioStatus,message='',mode:PlaybackMode|null=null) {
    this.state=state;
    if(!this.disposed) this.status(state,message,mode);
  }
  private releaseContext() {
    const context=this.context;
    this.context=null;
    if(context&&context.state!=='closed')void context.close().catch(()=>{});
  }
  cancel(message='',state:AudioStatus='idle',announce=true) {
    this.generation++;
    for(const cancel of this.liveResumeCancels)cancel();this.liveResumeCancels.clear();
    this.finishPlayback?.();this.finishPlayback=null;
    this.held.clear();
    for(const node of this.live.values())try{node.gain.disconnect();node.oscillator.stop();node.oscillator.disconnect();}catch{}
    this.live.clear();this.scheduled=[];
    this.abort?.abort(); this.abort=null;
    clearTimeout(this.animation);
    for(const node of this.nodes) {
      // Disconnect first, including oscillators scheduled to start in the future.
      try{node.gain.disconnect();node.oscillator.stop();node.oscillator.disconnect();}catch{}
    }
    this.nodes.clear();
    if(typeof window!=='undefined'&&(window as AudioWindow).__pianoGridAudioOwner===this.ownerCancel)delete (window as AudioWindow).__pianoGridAudioOwner;
    // WebKit can report a resumed context as running while its output remains
    // silent after the page has been backgrounded. Do not reuse that context.
    if(typeof document!=='undefined'&&document.hidden)this.releaseContext();
    if(!this.disposed) this.mark([]);
    if(announce) this.describe(this.available?state:'unavailable',this.available?message:this.copy.audio_unavailable);
  }
  async play(voicing:Pick<Voicing, 'playback'>,mode:PlaybackMode,onStarted?:(originMs:number)=>void): Promise<AudioPlayResult> {
    this.cancel('', 'idle', false);
    const audioWindow=window as AudioWindow;
    if(audioWindow.__pianoGridAudioOwner&&audioWindow.__pianoGridAudioOwner!==this.ownerCancel)audioWindow.__pianoGridAudioOwner();
    audioWindow.__pianoGridAudioOwner=this.ownerCancel;
    const generation=this.generation;
    const Constructor=window.AudioContext||(window as AudioWindow).webkitAudioContext;
    if(!Constructor){this.describe('unavailable',this.copy.audio_unavailable);return 'unavailable';}
    this.describe('loading',this.copy.loading,mode);
    let timeout:ReturnType<typeof setTimeout>|undefined;
    const abort=new AbortController();this.abort=abort;
    try {
      // iOS Safari otherwise treats Web Audio as an ambient session and may
      // produce no speaker output even though AudioContext.state is running.
      const session=(navigator as AudioNavigator).audioSession;
      if(session)try{session.type='playback';}catch{}
      if(!this.context||this.context.state==='closed') {
        const context=new Constructor();this.context=context;
        context.addEventListener('statechange',()=>{
          if(!this.disposed&&this.context===context&&this.state==='playing'&&context.state!=='running'){
            this.cancel('', 'idle', false);this.releaseContext();this.describe('error',this.copy.audio_error);
          }
        });
      }
      const context=this.context;
      // Schedule and start the source nodes before the first await so Safari
      // sees oscillator.start() inside the trusted click/tap activation task.
      const origin=context.currentTime+.035;
      const events=voicing.playback[mode].map(e=>({...e,start:origin+e.onset_ms/1000,end:origin+(e.onset_ms+e.duration_ms)/1000}));
      for(const event of events) {
        const oscillator=context.createOscillator(),gain=context.createGain();
        const node={oscillator,gain};this.nodes.add(node);
        oscillator.type='sine';oscillator.frequency.setValueAtTime(event.frequency_hz,event.start);
        gain.gain.setValueAtTime(0,event.start);gain.gain.linearRampToValueAtTime(this.volume,event.start+.008);
        gain.gain.setValueAtTime(this.volume,event.end-.035);gain.gain.linearRampToValueAtTime(0,event.end);
        oscillator.connect(gain);gain.connect(context.destination);
        oscillator.addEventListener('ended',()=>{oscillator.disconnect();gain.disconnect();this.nodes.delete(node);},{once:true});
        oscillator.start(event.start);oscillator.stop(event.end);
      }
      if(context.state!=='running') await Promise.race([context.resume(),new Promise<never>((_,reject)=>{
        timeout=setTimeout(()=>reject(new Error('Audio start timeout')),6000);
        abort.signal.addEventListener('abort',()=>{clearTimeout(timeout);reject(new Error('Cancelled'));},{once:true});
      })]);
      clearTimeout(timeout);
      if(this.abort===abort)this.abort=null;
      if(this.disposed||generation!==this.generation||document.hidden)return 'cancelled';
      if(context.state!=='running')throw new Error('Audio context unavailable');
      this.describe('playing',mode==='together'?'Playing chord…':'Playing notes one at a time…',mode);
      // Report the scheduled audio origin on the performance clock. Completion
      // remains the promise contract for existing chord and playback callers.
      onStarted?.(performance.now() + (origin - context.currentTime) * 1000);
      const end=Math.max(...events.map(e=>e.end)); let last='';
      await new Promise<void>(resolve => {
        this.finishPlayback=resolve;
        const tick=()=>{
          if(this.disposed||generation!==this.generation){resolve();return;}
          const time=context.currentTime;
          const active=events.filter(e=>time>=e.start&&time<e.end).map(e=>e.midi);
          if(active.join()!==last){this.emit(active);last=active.join();}
          if(time>=end){
            clearTimeout(this.animation);
            this.nodes.clear();
            this.finishPlayback=null;
            if(!this.disposed) this.emit([]);
            if(generation===this.generation) this.describe(this.live.size?'playing':'idle','Playback finished.',null);
            resolve();
            return;
          }
          // Audio keeps advancing when an occluded window throttles animation
          // frames. Sample the audio clock independently so note marks and the
          // completion promise do not wait for a compositor frame.
          this.animation=setTimeout(tick,16);
        };
        this.animation=setTimeout(tick,16);
      });
      if(this.disposed||generation!==this.generation) return 'cancelled';
      if(this.state==='error') return 'error';
      return 'completed';
    } catch (error) {
      if(this.disposed||generation!==this.generation) return 'cancelled';
      if((error as Error)?.message==='Cancelled') return 'cancelled';
      this.cancel('', 'idle', false);
      this.releaseContext();
      this.describe('error',this.copy.audio_error);
      return 'error';
    } finally {clearTimeout(timeout);if(this.abort===abort)this.abort=null;}
  }
  dispose() {
    this.disposed=true;this.cancel('', 'idle', false);
    this.releaseContext();
  }
}
