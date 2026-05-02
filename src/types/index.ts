// ─── User & Auth ─────────────────────────────────────────────────────────────

export type UserRole = "candidate" | "recruiter" | "admin";

export interface Profile {
  id: string;
  role: UserRole;
  full_name: string;
  email: string;
  location?: string;
  role_family?: string;
  avatar_url?: string;
  created_at: string;
}

// ─── Talent Signal ────────────────────────────────────────────────────────────

export interface TalentSignal {
  id: string;
  candidate_id: string;
  skill_proof_score: number;       // 0-100
  work_behavior_score: number;     // 0-100
  learning_agility_score: number;  // 0-100
  culture_fit_score: number;       // 0-100
  overall_tss: number;             // computed avg
  completed_modules: ModuleType[];
  updated_at: string;
}

export type ModuleType =
  | "skill_proof"
  | "scenario_judgment"
  | "learning_agility"
  | "communication_proof";

export const MODULE_LABELS: Record<ModuleType, string> = {
  skill_proof: "Skill Proof",
  scenario_judgment: "Scenario Judgment",
  learning_agility: "Learning Agility",
  communication_proof: "Communication",
};

export const MODULE_DIMENSION_MAP: Record<ModuleType, keyof Omit<TalentSignal, "id" | "candidate_id" | "overall_tss" | "completed_modules" | "updated_at">> = {
  skill_proof: "skill_proof_score",
  scenario_judgment: "work_behavior_score",
  learning_agility: "learning_agility_score",
  communication_proof: "culture_fit_score",
};

// ─── Mission ──────────────────────────────────────────────────────────────────

export interface ScoringDimension {
  dimension: string;
  max_score: number;
  indicators: string;
}

export interface Mission {
  id: string;
  module_type: ModuleType;
  role_family: string;
  title: string;
  scenario: string;
  deliverable: string;
  time_limit_min: number;
  scoring_rubric: ScoringDimension[];
  created_at: string;
}

export interface DimensionScore {
  dimension: string;
  score: number;
  max_score: number;
  evidence: string;
  feedback: string;
}

export interface MissionAttempt {
  id: string;
  candidate_id: string;
  mission_id: string;
  mission?: Mission;
  response_text?: string;
  response_file_url?: string;
  status: "pending" | "submitted" | "scored";
  dimension_scores?: DimensionScore[];
  total_score?: number;
  strengths?: string[];
  improvements?: string[];
  overall_summary?: string;
  started_at: string;
  submitted_at?: string;
  scored_at?: string;
  attempt_number: number;
}

// ─── Job Signal ───────────────────────────────────────────────────────────────

export interface JobSignal {
  id: string;
  recruiter_id: string;
  recruiter?: Profile;
  title: string;
  role_family: string;
  company_context?: string;
  required_skills: string[];
  skill_levels?: Record<string, string>;
  scenario_types?: string[];
  culture_notes?: string;
  timeline_days: number;
  status: "active" | "closed" | "draft";
  created_at: string;
  _count?: { shortlist_entries: number };
}

// ─── Shortlist ────────────────────────────────────────────────────────────────

export type Recommendation = "strong" | "borderline" | "not_yet";

export interface DimensionMatch {
  dimension: string;
  job_need: string;
  candidate_proof: string;
  match_level: "strong" | "partial" | "gap";
  gap?: string | null;
}

export interface ShortlistEntry {
  id: string;
  job_signal_id: string;
  candidate_id: string;
  candidate?: Profile;
  talent_signal?: TalentSignal;
  overall_match: number;
  dimension_breakdown: DimensionMatch[];
  recommendation: Recommendation;
  match_narrative: string;
  gap_test_mission_id?: string;
  gap_test_sent: boolean;
  gap_test_completed: boolean;
  created_at: string;
}

// ─── Learning ─────────────────────────────────────────────────────────────────

export interface LearningResource {
  title: string;
  url: string;
  platform: string;
  estimated_hours: number;
}

export interface LearningRecommendation {
  id: string;
  candidate_id: string;
  dimension: string;
  gap_diagnosis: string;
  resources: LearningResource[];
  generated_at: string;
}

// ─── Analytics ────────────────────────────────────────────────────────────────

export interface PlatformStats {
  total_candidates: number;
  total_recruiters: number;
  total_missions_completed: number;
  total_job_signals: number;
  total_hires: number;
  avg_tss: number;
  avg_match_score: number;
  top_role_families: { role: string; count: number }[];
  skill_demand: { skill: string; demand: number; supply: number }[];
  monthly_activity: { month: string; candidates: number; missions: number; hires: number }[];
  recommendation_distribution: { type: Recommendation; count: number }[];
  tss_distribution: { range: string; count: number }[];
}