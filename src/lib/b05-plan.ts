import { SITE_ORIGIN } from './site-config';

export const CURRENT_PLAN_KEY = 'twinkle-early-elementary';
export const CURRENT_PLAN_REVISION = 1;
export const PLAN_STEP_IDS = ['edition', 'setup', 'phrase', 'repeat', 'reflect'] as const;
export type PlanStepId = (typeof PLAN_STEP_IDS)[number];
export type PlanMode = 'overview' | 'active' | 'finished';
export type FocusChoice = 'notes' | 'rhythm' | 'hands' | 'undecided';

export type PlanSession = {
  planKey: string;
  revision: number;
  mode: PlanMode;
  stepIndex: number;
  visited: PlanStepId[];
  selfChecked: PlanStepId[];
  focusChoice: FocusChoice;
};

export type PlanQuery =
  | { kind: 'none' }
  | { kind: 'shared'; publicKey: string; revision: number }
  | { kind: 'unavailable'; reason: 'unknown' | 'duplicate' | 'malformed' | 'expired' };

const KEY_PATTERN = /^[a-z0-9-]{1,64}$/;

export function parsePlanSearch(search: URLSearchParams): PlanQuery {
  const plans = search.getAll('plan');
  const revisions = search.getAll('plan-v');
  if (plans.length === 0 && revisions.length === 0) return { kind: 'none' };
  if (plans.length !== 1 || revisions.length !== 1) return { kind: 'unavailable', reason: 'duplicate' };
  const publicKey = plans[0];
  const revisionRaw = revisions[0];
  if (!KEY_PATTERN.test(publicKey) || !/^[0-9]{1,4}$/.test(revisionRaw)) {
    return { kind: 'unavailable', reason: 'malformed' };
  }
  const revision = Number(revisionRaw);
  if (publicKey !== CURRENT_PLAN_KEY || revision !== CURRENT_PLAN_REVISION) {
    return { kind: 'unavailable', reason: 'expired' };
  }
  return { kind: 'shared', publicKey, revision };
}

export function planShareURL() {
  return `${SITE_ORIGIN}/songs/easy?plan=${CURRENT_PLAN_KEY}&plan-v=${CURRENT_PLAN_REVISION}#first-10-minutes`;
}

export function sessionStorageKey(planKey: string, revision: number) {
  return `pg-b05-plan:${planKey}:${revision}`;
}

export function emptySession(): PlanSession {
  return {
    planKey: CURRENT_PLAN_KEY,
    revision: CURRENT_PLAN_REVISION,
    mode: 'overview',
    stepIndex: 0,
    visited: [],
    selfChecked: [],
    focusChoice: 'undecided',
  };
}

export function readPlanSession(): PlanSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.sessionStorage.getItem(sessionStorageKey(CURRENT_PLAN_KEY, CURRENT_PLAN_REVISION));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PlanSession;
    if (parsed.planKey !== CURRENT_PLAN_KEY || parsed.revision !== CURRENT_PLAN_REVISION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writePlanSession(session: PlanSession) {
  if (typeof window === 'undefined') return 'memory';
  try {
    window.sessionStorage.setItem(sessionStorageKey(session.planKey, session.revision), JSON.stringify(session));
    return 'saved' as const;
  } catch {
    return 'unavailable' as const;
  }
}

export function searchFromRecord(search: Record<string, string | string[] | undefined>) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(search)) {
    if (Array.isArray(value)) value.forEach((item) => params.append(key, item));
    else if (typeof value === 'string') params.append(key, value);
  }
  return params;
}
