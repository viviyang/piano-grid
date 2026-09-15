export const FIRST_BATCH_SHEET_URLS = [
  '/sheet-music',
  '/sheet-music/easy',
  '/sheet-music/beginner',
  '/sheet-music/hot-cross-buns',
  '/sheet-music/twinkle-twinkle-little-star',
  '/sheet-music/ode-to-joy',
] as const;

export type SheetMusicURL = (typeof FIRST_BATCH_SHEET_URLS)[number];
export type FirstBatchURL = '/songs' | '/songs/easy' | SheetMusicURL;

export type SheetSection = {
  id: string;
  heading: string;
  body?: string;
  arrangement_ids?: string[];
  link?: string;
  render_existing?: string;
  visibility_gate?: string;
  cta?: { label: string; href: string; kind: string };
  faqs?: Array<{ question: string; answer: string }>;
};

export type PagePatch = {
  url: FirstBatchURL;
  patch_mode: string;
  metadata: { title: string; description: string; canonical_path: FirstBatchURL; inLanguage: string };
  h1: string;
  intro: string;
  sections: SheetSection[];
  schema: Record<string, unknown>;
  public_release: string;
};

export type ArrangementMusic = {
  key: string | null;
  meter: [number, number] | null;
  hands: string[] | null;
  hand_mode: string;
  range_midi: [number, number] | null;
  note_inventory: string[] | null;
  chord_inventory: string[] | null;
  fingering: unknown;
  tempo_bpm: number | null;
  measure_count?: number;
};

export type ArrangementRecord = {
  arrangement_id: string;
  work_id: string;
  title: string;
  edition: string;
  edition_revision: string;
  provider?: string;
  provider_url?: string | null;
  sheet_page?: string;
  origin: 'publisher_edition' | 'pianogrid_original';
  representation: 'external_reference' | 'original_exercise_not_known_song';
  resource_ids: string[];
  score_asset_id: string | null;
  audio_asset_id: string | null;
  music_events_asset_id: string | null;
  rights_record_id: string | null;
  access_kind?: string;
  evidence_status?: string;
  source_ids?: string[];
  technical_requirements?: string[] | null;
  editorial?: { why: string; learning_goal: string; next_steps: string[] };
  difficulty: {
    publisher_label: string | null;
    editorial_band: string | null;
    basis: string;
    score_check_status: string;
    teacher_review: string;
  };
  music: ArrangementMusic;
  segments: Array<{ id: string; start_measure: number; end_measure: number }>;
  release: { metadata: string; local_assets: string; public_asset_enabled: boolean };
  verification_status?: string;
  field_variants?: Record<string, string[]>;
  legacy_snapshot?: {
    availability?: string;
    difficulty_label?: string | null;
    difficulty_basis?: string;
  };
};

export type ResourceRecord = {
  resource_id: string;
  arrangement_id: string;
  location: 'external' | 'local';
  provider: string;
  provider_url: string | null;
  site_use: string;
  access: { type: string; account_requirement: string; print_scope: string };
  asset_ids: string[];
  affiliate: { site_approved: boolean; tracking_url: string | null; commission: string | null };
};

export type LearningCard = {
  card_id: string;
  arrangement_id: string;
  display_title: string;
  eyebrow: string;
  suitable_when?: string;
  why_it_fits: string;
  before_you_start: string;
  first_hand: string;
  demands_summary?: string;
  steps: string[];
  self_check?: string;
  teacher_review: boolean;
  evidence_status: string;
};

export type ArrangementView = {
  arrangement: ArrangementRecord;
  resource: ResourceRecord;
  learning: LearningCard;
  accessLabel: string;
};

export type RuntimeGrant = {
  grant_id: string;
  asset_id: string;
  sha256: string;
  arrangement_id: string;
  edition_revision: string;
  status: string;
  action: 'display' | 'download' | 'print' | 'play';
  territories: string[];
  commercial_use: boolean;
  issued_at: string;
  expires_at?: string | null;
  approved_by: string;
  approval_record: string;
  evidence_ids: string[];
  layers: Record<string, { decision: string; basis: string }>;
};

export type CatalogAsset = {
  asset_id: string;
  work_id: string;
  arrangement_id: string;
  resource_id: string;
  format: string;
  path: string;
  bytes: number;
  sha256: string;
  rights_record_id: string;
  storage: string;
  release_state: string;
  validation: {
    format_signal_check: string;
    independent_music_review: string;
    visual_notation?: string;
    human_listening: string;
    physical_print: string;
    teacher_review: string;
    model_render_inspection?: string;
  };
};

export type RightsEvidence = { rights_id: string };

export type CatalogWork = { work_id: string; title: string; creator?: string | null };

export type CatalogAlias = { page_url: string; location: string; legacy_id: string; work_id: string; arrangement_id: string };

export type SongsSheetCatalog = {
  schema_version: string;
  works: CatalogWork[];
  arrangements: ArrangementRecord[];
  resources: ResourceRecord[];
  assets: CatalogAsset[];
  rights_evidence: RightsEvidence[];
  runtime_grants: RuntimeGrant[];
  aliases: CatalogAlias[];
};

export type DeploymentContext = {
  now: string;
  deploymentTerritories: string[];
  commercialSite: boolean;
  territorialRestrictionVerified?: boolean;
  eventSchedulerVerified: boolean;
};

export type PublicCapabilities = {
  openProvider: boolean;
  previewLocal: boolean;
  downloadLocal: boolean;
  printLocal: boolean;
  playLocal: boolean;
  tempoAndSegments: boolean;
  assessPerformance: false;
  checkout: false;
};
