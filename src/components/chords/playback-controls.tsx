import { cn } from '@/lib/utils';
import type { AudioStatus } from '@/lib/a-minor-audio';
import type { PlaybackMode } from '@/lib/a-minor-types';
import { Icon } from '../a-minor/icon';
import { RollingText } from '../ui/rolling-text';
export function PlaybackControls({ready,state,mode,onPlay,onStop}:{ready:boolean;state:AudioStatus;mode:PlaybackMode|null;onPlay:(mode:PlaybackMode)=>void;onStop:()=>void}) {
 return <div className="am-playback-actions"><button type="button" className={cn('am-button am-primary am-play-btn',state==='playing'&&mode==='together'&&'am-is-playing')} disabled={!ready||state==='unavailable'} onClick={()=>onPlay('together')}><Icon name="play"/><RollingText>Play chord</RollingText></button><button type="button" className={cn('am-button am-secondary am-sequence-btn',state==='playing'&&mode==='ascending'&&'am-is-playing')} disabled={!ready||state==='unavailable'} onClick={()=>onPlay('ascending')}><Icon name="sequence"/><RollingText>Play notes one at a time</RollingText></button><button type="button" className="am-button am-secondary am-stop-btn" disabled={!['loading','playing'].includes(state)} onClick={onStop}><Icon name="stop"/><RollingText>Stop</RollingText></button></div>;
}
