/** Contract targets; map names to the existing repository instead of creating a second model.
 * This file declares no actual licence, deployment or completion. */
export type EvidenceState = 'verified' | 'inferred' | 'unknown';
export type ReviewState = 'passed' | 'not_run' | 'failed';
export type Action = 'display' | 'download' | 'print' | 'play';
export type AccessType = 'local_free_core' | 'external_free' | 'external_free_form_or_account'
  | 'external_paid_or_membership' | 'external_paid' | 'external_unknown';
export interface Work {
  work_id: string; title: string; creator: string | null; kind: string;
  rights_classification: string; rights_by_territory: unknown[]; identity_review: string;
}
export interface Arrangement {
  arrangement_id: string; work_id: string; title?: string; edition: string;
  origin: string; representation: string; edition_revision: string;
  legacy_ids: string[]; resource_ids: string[];
  score_asset_id: string | null; audio_asset_id: string | null;
  music_events_asset_id?: string | null; rights_record_id?: string | null;
  music: { key: string | null; meter: number[] | null; hands: string[] | null;
    hand_mode: string; range_midi: number[] | null; note_inventory: string[] | null;
    chord_inventory: string[] | null; chord_inventory_status?: string;
    fingering: unknown | null; tempo_bpm: number | null; measure_count?: number | null };
  difficulty: {publisher_label: string | null; editorial_band: string | null;
    basis: string; score_check_status?: string; teacher_review: string};
  segments: Array<{id: string; start_measure: number; end_measure: number}>;
  release: {metadata: string; local_assets: string; public_asset_enabled: boolean};
  source_ids: string[];
}
export interface Resource {
  resource_id: string; work_id: string; arrangement_id: string; kind: string;
  location: 'local' | 'external'; provider: string; provider_url: string | null;
  access: {type: AccessType; account_requirement: string; print_scope: string;
    evidence_source_ids: string[]};
  asset_ids: string[]; site_use: string;
  affiliate: {program_exists: boolean | null; site_approved: boolean; tracking_url: string | null;
    commission: number | null};
}
export interface Asset {
  asset_id: string; work_id: string; arrangement_id: string; resource_id: string;
  format: string; path: string; bytes: number; sha256: string; rights_record_id: string;
  storage: string; release_state: 'staging' | 'approved' | 'withdrawn';
  validation: {format_signal_check: string; independent_music_review: ReviewState;
    human_listening: ReviewState; physical_print: ReviewState; visual_notation?: ReviewState;
    teacher_review: string};
}
export interface ApprovedGrant {
  grant_id: string; asset_id: string; sha256: string; arrangement_id: string;
  edition_revision: string; status: 'approved' | 'revoked'; action: Action;
  territories: string[]; commercial_use: boolean;
  issued_at: string; expires_at: string | null;
  approved_by: string; approval_record: string; evidence_ids: string[];
  layers: Record<'work'|'arrangement'|'engraving'|'recording'|'samples'|'fonts', {
    decision: 'allow' | 'not_applicable' | 'unknown'; basis: string;
  }>;
}
export interface PracticeTarget { work_id: string; arrangement_id: string;
  edition_revision: string; segment_id: string; }
