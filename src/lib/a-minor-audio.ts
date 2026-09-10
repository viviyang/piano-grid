import type { PlaybackMode, Voicing } from './a-minor-types';
export type AudioStatus = 'idle'|'loading'|'playing'|'stopped'|'error'|'unavailable';
type AudioWindow = Window & { webkitAudioContext?: typeof AudioContext };

// Lifecycle-owned, cancellable Web Audio scheduler. No browser access at module load.
export class ReferenceAudio {
  private context: AudioContext | null = null;
  private generation = 0;
  private animation = 0;
  private abort: AbortController | null = null;
  private nodes = new Set<{oscillator:OscillatorNode;gain:GainNode}>();
  private state: AudioStatus = 'idle';
  private disposed = false;
  constructor(private status:(state:AudioStatus,message:string,mode:PlaybackMode|null)=>void, private mark:(midi:number[])=>void,
    private copy:{loading:string;audio_error:string;audio_unavailable:string}) {}
  get available() { return Boolean(window.AudioContext || (window as AudioWindow).webkitAudioContext); }
  private describe(state:AudioStatus,message='',mode:PlaybackMode|null=null) {
    this.state=state;
    if(!this.disposed) this.status(state,message,mode);
  }
  cancel(message='',state:AudioStatus='idle',announce=true) {
    this.generation++;
    this.abort?.abort(); this.abort=null;
    cancelAnimationFrame(this.animation);
    for(const node of this.nodes) {
      // Disconnect first, including oscillators scheduled to start in the future.
      try{node.gain.disconnect();node.oscillator.stop();node.oscillator.disconnect();}catch{}
    }
    this.nodes.clear();
    if(!this.disposed) this.mark([]);
    if(announce) this.describe(this.available?state:'unavailable',this.available?message:this.copy.audio_unavailable);
  }
  async play(voicing:Pick<Voicing, 'playback'>,mode:PlaybackMode) {
    this.cancel('', 'idle', false);
    const generation=this.generation;
    const Constructor=window.AudioContext||(window as AudioWindow).webkitAudioContext;
    if(!Constructor){this.describe('unavailable',this.copy.audio_unavailable);return;}
    this.describe('loading',this.copy.loading,mode);
    let timeout:ReturnType<typeof setTimeout>|undefined;
    const abort=new AbortController();this.abort=abort;
    try {
      if(!this.context||this.context.state==='closed') {
        const context=new Constructor();this.context=context;
        context.addEventListener('statechange',()=>{
          if(!this.disposed&&this.context===context&&this.state==='playing'&&context.state!=='running'){
            this.cancel('', 'idle', false);this.describe('error',this.copy.audio_error);
          }
        });
      }
      const context=this.context;
      if(context.state!=='running') await Promise.race([context.resume(),new Promise<never>((_,reject)=>{
        timeout=setTimeout(()=>reject(new Error('Audio start timeout')),6000);
        abort.signal.addEventListener('abort',()=>{clearTimeout(timeout);reject(new Error('Cancelled'));},{once:true});
      })]);
      clearTimeout(timeout);
      if(this.abort===abort)this.abort=null;
      if(this.disposed||generation!==this.generation||document.hidden)return;
      if(context.state!=='running')throw new Error('Audio context unavailable');
      // Final reference: 35ms scheduling lead, sine tone and in-duration envelope.
      const origin=context.currentTime+.035;
      const events=voicing.playback[mode].map(e=>({...e,start:origin+e.onset_ms/1000,end:origin+(e.onset_ms+e.duration_ms)/1000}));
      for(const event of events) {
        const oscillator=context.createOscillator(),gain=context.createGain();
        const node={oscillator,gain};this.nodes.add(node);
        oscillator.type='sine';oscillator.frequency.setValueAtTime(event.frequency_hz,event.start);
        gain.gain.setValueAtTime(0,event.start);gain.gain.linearRampToValueAtTime(.12,event.start+.008);
        gain.gain.setValueAtTime(.12,event.end-.035);gain.gain.linearRampToValueAtTime(0,event.end);
        oscillator.connect(gain);gain.connect(context.destination);
        oscillator.addEventListener('ended',()=>{oscillator.disconnect();gain.disconnect();this.nodes.delete(node);},{once:true});
        oscillator.start(event.start);oscillator.stop(event.end);
      }
      this.describe('playing',mode==='together'?'Playing chord…':'Playing notes one at a time…',mode);
      const end=Math.max(...events.map(e=>e.end)); let last='';
      const tick=()=>{
        if(this.disposed||generation!==this.generation)return;
        const time=context.currentTime;
        const active=events.filter(e=>time>=e.start&&time<e.end).map(e=>e.midi);
        if(active.join()!==last){this.mark(active);last=active.join();}
        if(time>=end){this.cancel('Playback finished.');return;}
        this.animation=requestAnimationFrame(tick);
      };
      this.animation=requestAnimationFrame(tick);
    } catch {
      if(!this.disposed&&generation===this.generation){this.cancel('', 'idle', false);this.describe('error',this.copy.audio_error);}
    } finally {clearTimeout(timeout);if(this.abort===abort)this.abort=null;}
  }
  dispose() {
    this.disposed=true;this.cancel('', 'idle', false);
    if(this.context&&this.context.state!=='closed')void this.context.close().catch(()=>{});
    this.context=null;
  }
}
