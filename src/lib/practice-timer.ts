export const PRACTICE_TIMER_PRESETS = [5, 10, 15, 20, 30] as const;
export const DEFAULT_PRACTICE_MINUTES = 10;
export const MIN_PRACTICE_MINUTES = 1;
export const MAX_PRACTICE_MINUTES = 120;
export const PRACTICE_TIMER_BOUNDARY = 'This timer tracks elapsed practice time. It does not set tempo or listen to your piano.';
export const PRACTICE_TIMER_COMPLETE = 'Practice block complete.';

export type PracticeTimerState = 'idle' | 'running' | 'paused' | 'complete';
export type PracticeTimerSnapshot = {
  state: PracticeTimerState;
  selectedMinutes: number;
  customInput: string;
  validationMessage: string;
  remainingSeconds: number;
  announcement: string;
};

type Clock = () => number;
type Scheduler = {
  setInterval: (callback: () => void, delay: number) => ReturnType<typeof setInterval>;
  clearInterval: (id: ReturnType<typeof setInterval>) => void;
};

export function validatePracticeMinutes(value: string): { value: number | null; message: string } {
  if (!/^\d+$/.test(value.trim())) return { value: null, message: 'Enter a whole number from 1 to 120.' };
  const minutes = Number(value);
  if (!Number.isInteger(minutes) || minutes < MIN_PRACTICE_MINUTES || minutes > MAX_PRACTICE_MINUTES) {
    return { value: null, message: 'Enter a whole number from 1 to 120.' };
  }
  return { value: minutes, message: '' };
}

export function formatPracticeTime(seconds: number): string {
  const safe = Math.max(0, Math.floor(seconds));
  return `${String(Math.floor(safe / 60)).padStart(2, '0')}:${String(safe % 60).padStart(2, '0')}`;
}

export class PracticeTimerController {
  private readonly now: Clock;
  private readonly scheduler: Scheduler;
  private snapshot: PracticeTimerSnapshot = {
    state: 'idle',
    selectedMinutes: DEFAULT_PRACTICE_MINUTES,
    customInput: String(DEFAULT_PRACTICE_MINUTES),
    validationMessage: '',
    remainingSeconds: DEFAULT_PRACTICE_MINUTES * 60,
    announcement: 'Timer ready for 10 minutes.',
  };
  private deadline = 0;
  private interval: ReturnType<typeof setInterval> | null = null;
  private listeners = new Set<() => void>();
  private completionDelivered = false;

  constructor(now: Clock = () => Date.now(), scheduler: Scheduler = {
    setInterval: (callback, delay) => globalThis.setInterval(callback, delay),
    clearInterval: id => globalThis.clearInterval(id),
  }) {
    this.now = now;
    this.scheduler = scheduler;
  }

  getSnapshot = () => this.snapshot;
  subscribe = (listener: () => void) => { this.listeners.add(listener); return () => this.listeners.delete(listener); };

  private update(patch: Partial<PracticeTimerSnapshot>) {
    this.snapshot = { ...this.snapshot, ...patch };
    this.listeners.forEach(listener => listener());
  }

  private clearTicker() {
    if (this.interval !== null) this.scheduler.clearInterval(this.interval);
    this.interval = null;
  }

  private armTicker() {
    this.clearTicker();
    this.interval = this.scheduler.setInterval(() => this.tick(), 250);
  }

  private complete() {
    this.clearTicker();
    if (this.completionDelivered) return;
    this.completionDelivered = true;
    this.update({ state: 'complete', remainingSeconds: 0, announcement: PRACTICE_TIMER_COMPLETE });
  }

  tick() {
    if (this.snapshot.state !== 'running') return;
    const remainingSeconds = Math.max(0, Math.ceil((this.deadline - this.now()) / 1000));
    if (remainingSeconds === 0) this.complete();
    else if (remainingSeconds !== this.snapshot.remainingSeconds) this.update({ remainingSeconds });
  }

  selectPreset(minutes: number) {
    if (!PRACTICE_TIMER_PRESETS.includes(minutes as (typeof PRACTICE_TIMER_PRESETS)[number]) || this.snapshot.state === 'running' || this.snapshot.state === 'paused') return;
    this.completionDelivered = false;
    this.update({ state: 'idle', selectedMinutes: minutes, customInput: String(minutes), validationMessage: '', remainingSeconds: minutes * 60, announcement: `Timer set for ${minutes} minutes.` });
  }

  setCustomInput(input: string) {
    if (this.snapshot.state === 'running' || this.snapshot.state === 'paused') return;
    const result = validatePracticeMinutes(input);
    if (result.value === null) {
      this.update({ customInput: input, validationMessage: result.message });
      return;
    }
    this.completionDelivered = false;
    this.update({ state: 'idle', selectedMinutes: result.value, customInput: input, validationMessage: '', remainingSeconds: result.value * 60, announcement: `Timer set for ${result.value} minutes.` });
  }

  start() {
    if (this.snapshot.state !== 'idle' || this.snapshot.validationMessage) return;
    this.completionDelivered = false;
    this.deadline = this.now() + this.snapshot.remainingSeconds * 1000;
    this.update({ state: 'running', announcement: `Practice timer started for ${this.snapshot.selectedMinutes} minutes.` });
    this.armTicker();
  }

  pause() {
    if (this.snapshot.state !== 'running') return;
    this.tick();
    if (this.snapshot.state !== 'running') return;
    this.clearTicker();
    this.update({ state: 'paused', announcement: `Timer paused at ${formatPracticeTime(this.snapshot.remainingSeconds)}.` });
  }

  resume() {
    if (this.snapshot.state !== 'paused') return;
    this.deadline = this.now() + this.snapshot.remainingSeconds * 1000;
    this.update({ state: 'running', announcement: 'Practice timer resumed.' });
    this.armTicker();
  }

  reset() {
    this.clearTicker();
    this.completionDelivered = false;
    this.update({ state: 'idle', remainingSeconds: this.snapshot.selectedMinutes * 60, validationMessage: '', announcement: `Timer reset to ${this.snapshot.selectedMinutes} minutes.` });
  }

  startAgain() {
    if (this.snapshot.state !== 'complete') return;
    this.clearTicker();
    this.completionDelivered = false;
    const remainingSeconds = this.snapshot.selectedMinutes * 60;
    this.deadline = this.now() + remainingSeconds * 1000;
    this.update({ state: 'running', remainingSeconds, announcement: `Practice timer started again for ${this.snapshot.selectedMinutes} minutes.` });
    this.armTicker();
  }

  dispose() {
    this.clearTicker();
    this.listeners.clear();
  }
}
