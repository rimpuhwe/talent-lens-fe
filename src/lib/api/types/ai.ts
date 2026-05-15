import type { JobSignal, RoleTSS } from "./backend";

export interface GenerateModuleRequest {
  role: string;
  module_type?: string;
  moduleType?: string;
  job_context?: string;
}

export interface GenerateModuleResponse {
  question?: string;
  generated_question?: string;
  module_type?: string;
  role?: string;
}

export interface EvaluateRequest {
  role: string;
  question: string;
  answer: string;
}

export interface EvaluateResponse {
  score?: number;
  feedback?: string;
  strengths?: string[];
  weaknesses?: string[];
  dimension_scores?: Record<string, number>;
}

export interface JobGenerationRequest {
  job_position: string;
  industry_field: string;
  company_about: string;
  additional_instructions?: string;
}

export interface JobGenerationResponse {
  job_description?: string;
  required_skills?: string[];
}

export interface CandidateTSSData {
  roleName: string;
  talentSignalScore: number;
  skillScore: number;
  behaviorScore: number;
  learningScore: number;
  cultureScore: number;
}

export interface JobSignalData {
  jobPosition: string;
  jobDescription: string;
  requiredSkills: string[];
  experienceLevel?: string;
}

export interface MatchRequest {
  candidate_tss: CandidateTSSData[] | RoleTSS[];
  job_signal: JobSignalData | JobSignal;
}

export interface DimensionBreakdown {
  dimension?: string;
  match_level?: "strong" | "partial" | "gap";
  job_need?: string;
  candidate_proof?: string;
  gap?: string;
}

export interface MatchResponse {
  overall_match?: number;
  recommendation?: "strong" | "borderline" | "not_yet";
  match_narrative?: string;
  dimension_breakdown?: DimensionBreakdown[];
  candidate_id?: string;
  candidate_name?: string;
}

export interface TechnicalGenRequest {
  role: string;
  industry: string;
  job_description: string;
  recruiter_focus_areas: string;
}

export interface TechnicalGenResponse {
  technical_question?: string;
  recommended_time_limit_minutes?: number;
  grading_rubric?: Record<string, unknown>[];
}

export interface TechnicalEvalRequest {
  role: string;
  technical_question: string;
  grading_rubric_json: string;
  candidate_answer: string;
}

export interface TechnicalEvalResponse {
  score?: number;
  feedback?: string;
  rubric_scores?: Record<string, number>;
}

export interface AutoScheduleRequest {
  candidate_names: string[];
  start_date: string;
}

export interface DaySchedule {
  date?: string;
  candidates?: string[];
}

export interface AutoScheduleResponse {
  schedule?: DaySchedule[];
  message?: string;
}
