/**
 * @deprecated Import from `@/lib/api` instead.
 * Kept for backward compatibility with existing pages.
 */
export type {
  CandidateProfile,
  CandidateProfileDto,
  CandidateRegister,
  EvidenceModule,
  EvidenceRequest,
  EvidenceSubmission,
  EvidenceSubmissionRequest,
  JobGenerationRequestDto,
  JobGenerationResponseDto,
  JobRequestDto,
  JobSignal,
  LoginMessage,
  OtpRequest,
  ProfileStatus,
  Recruiter,
  RecruiterRegister,
  RecruiterStatusRequest,
  RoleTSS,
  TechnicalGenRequestDto,
  TechnicalGenResponseDto,
} from "@/lib/api/types/backend";

export type {
  AutoScheduleRequest,
  EvaluateRequest,
  GenerateModuleRequest,
  JobGenerationRequest,
  MatchRequest,
  TechnicalEvalRequest,
  TechnicalGenRequest,
} from "@/lib/api/types/ai";

/** Legacy aliases */
export type LoginRequest = { email: string; password: string };
export type LoginResponse = import("@/lib/api/types/backend").LoginMessage & {
  token: string;
  role: "CANDIDATE" | "RECRUITER" | "ADMIN" | "SUPER_ADMIN" | "HR_MANAGER" | "VIEWER";
};
export type RegisterCandidateRequest = import("@/lib/api/types/backend").CandidateRegister;
export type RegisterRecruiterRequest = import("@/lib/api/types/backend").RecruiterRegister;
export type VerifyOtpRequest = import("@/lib/api/types/backend").OtpRequest;
export type ProfileCompleteRequest = import("@/lib/api/types/backend").CandidateProfileDto;
export type JobSignalRequest = import("@/lib/api/types/backend").JobRequestDto;
export type AiJobDraftRequest = import("@/lib/api/types/ai").JobGenerationRequest;
export type MatchCandidateToJobRequest = import("@/lib/api/types/ai").MatchRequest;
export type RecruiterProfile = import("@/lib/api/types/backend").Recruiter;
