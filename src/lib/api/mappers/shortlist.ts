import type { MatchResponse } from "../types/ai";
import type { CandidateProfile, JobSignal, RoleTSS } from "../types/backend";
import type { DimensionMatch, Profile, Recommendation, ShortlistEntry, TalentSignal } from "@/types";

function toProfile(candidate: CandidateProfile): Profile {
  return {
    id: candidate.id ?? "",
    role: "candidate",
    full_name: `${candidate.firstName ?? ""} ${candidate.lastName ?? ""}`.trim() || "Candidate",
    email: candidate.emailAddress ?? "",
    location: candidate.workConditions ?? "OPEN",
    role_family: candidate.jobRoles?.[0] ?? "General",
    avatar_url: "",
    created_at: candidate.birthDate ?? new Date().toISOString(),
  };
}

function toTalentSignal(scores?: RoleTSS): TalentSignal | undefined {
  if (!scores) return undefined;
  return {
    id: `ts-${scores.roleName ?? "default"}`,
    candidate_id: "",
    skill_proof_score: Math.round(scores.skillScore ?? 0),
    work_behavior_score: Math.round(scores.behaviorScore ?? 0),
    learning_agility_score: Math.round(scores.learningScore ?? 0),
    culture_fit_score: Math.round(scores.cultureScore ?? 0),
    overall_tss: Math.round(scores.talentSignalScore ?? 0),
    completed_modules: [],
    updated_at: new Date().toISOString(),
  };
}

function mapDimensionBreakdown(
  breakdown?: MatchResponse["dimension_breakdown"]
): DimensionMatch[] {
  if (!breakdown?.length) return [];
  return breakdown.map((item) => ({
    dimension: item.dimension ?? "Skill Proof",
    job_need: item.job_need ?? "",
    candidate_proof: item.candidate_proof ?? "",
    match_level: item.match_level ?? "partial",
    gap: item.gap ?? null,
  }));
}

export function mapCandidateMatchToShortlistEntry(
  candidate: CandidateProfile,
  match: MatchResponse,
  job: JobSignal
): ShortlistEntry {
  const primaryRoleScore =
    candidate.roleTssScores?.find((score) =>
      candidate.jobRoles?.includes(score.roleName ?? "")
    ) ?? candidate.roleTssScores?.[0];

  return {
    id: `${job.id}-${candidate.id}`,
    job_signal_id: String(job.id),
    candidate_id: candidate.id ?? "",
    candidate: toProfile(candidate),
    talent_signal: toTalentSignal(primaryRoleScore),
    overall_match: Math.round(match.overall_match ?? 0),
    dimension_breakdown: mapDimensionBreakdown(match.dimension_breakdown),
    recommendation: (match.recommendation ?? "not_yet") as Recommendation,
    match_narrative:
      match.match_narrative ??
      "AI match narrative unavailable for this candidate.",
    gap_test_sent: false,
    gap_test_completed: false,
    created_at: new Date().toISOString(),
  };
}

export function buildMatchPayload(candidate: CandidateProfile, job: JobSignal) {
  const tss =
    candidate.roleTssScores?.map((score) => ({
      roleName: score.roleName ?? "General",
      talentSignalScore: score.talentSignalScore ?? 0,
      skillScore: score.skillScore ?? 0,
      behaviorScore: score.behaviorScore ?? 0,
      learningScore: score.learningScore ?? 0,
      cultureScore: score.cultureScore ?? 0,
    })) ?? [];

  return {
    candidate_tss: tss,
    job_signal: {
      jobPosition: job.jobPosition ?? "",
      jobDescription: job.jobDescription ?? "",
      requiredSkills:
        job.skillsNeeded?.map((skill) => skill.skillSetName ?? "").filter(Boolean) ?? [],
      experienceLevel: job.experienceLevel,
    },
  };
}
