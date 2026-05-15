import type {
  ApplicationStatus,
  BackendRole,
  Gender,
  JobStatus,
  ResponseMessage,
  SkillSet,
  WorkCondition,
} from "./common";

export interface LoginMessage extends ResponseMessage {
  token?: string;
  Token?: string;
  role?: BackendRole;
  Role?: BackendRole;
  refreshToken?: string;
  RefreshToken?: string;
}

export interface CandidateRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: string;
  gender: Gender;
}

export interface RecruiterRegister {
  companyName: string;
  emailAddress: string;
  contactNumber: string;
  password: string;
  location: string;
  companySummary?: string;
}

export interface OtpRequest {
  email: string;
  otp: string;
}

export interface CandidateProfileDto {
  jobRoles?: string[];
  workConditions?: WorkCondition;
  professionalProfile: string;
  linkedInProfile?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  biography?: string;
  birthDate?: string;
  gender?: Gender;
}

export interface RoleTSS {
  roleName?: string;
  talentSignalScore?: number;
  skillScore?: number;
  behaviorScore?: number;
  learningScore?: number;
  cultureScore?: number;
}

export interface CandidateProfile {
  id: string;
  firstName?: string;
  lastName?: string;
  emailAddress?: string;
  phoneNumber?: string | null;
  linkedInProfile?: string | null;
  professionalProfile?: string | null;
  birthDate?: string;
  gender?: Gender;
  cvUrl?: string | null;
  jobRoles?: string[];
  workConditions?: WorkCondition | null;
  profileCompleted?: boolean;
  completionPercentage?: number;
  roleTssScores?: RoleTSS[];
  globalAverageTSS?: number;
  biography?: string | null;
}

export interface ProfileStatus {
  profileCompleted?: boolean;
  completed?: boolean;
  isCompleted?: boolean;
  completionPercentage?: number;
  cvUploaded?: boolean;
  [key: string]: unknown;
}

export interface Recruiter {
  id: number;
  companyEmail?: string;
  companyName?: string;
  applicationStatus?: ApplicationStatus;
  companyAddress?: string;
  companyDescription?: string;
  companyPhone?: string;
}

export interface JobRequestDto {
  jobPosition: string;
  jobDescription: string;
  requiredSkills: SkillSet[];
  workType: string;
  experienceLevel?: string;
}

export interface JobSignal {
  id: number;
  jobPosition?: string;
  jobDescription?: string;
  workType?: string;
  experienceLevel?: string;
  skillsNeeded?: SkillSet[];
  jobStatus?: JobStatus;
  recruiter?: Recruiter;
}

export interface JobGenerationRequestDto {
  job_position?: string;
  industry_field?: string;
  company_about?: string;
  additional_instructions?: string;
}

export interface JobGenerationResponseDto {
  job_description?: string;
  required_skills?: string[];
}

export interface TechnicalGenRequestDto {
  role?: string;
  industry?: string;
  job_description?: string;
  recruiter_focus_areas?: string;
}

export interface TechnicalGenResponseDto {
  technical_question?: string;
  recommended_time_limit_minutes?: number;
  grading_rubric?: Record<string, unknown>[];
}

export interface EvidenceRequest {
  role: string;
  moduleType: string;
}

export interface EvidenceModule {
  id?: number;
  candidate?: CandidateProfile;
  targetRole?: string;
  moduleType?: string;
  generatedQuestion?: string;
  submitted?: boolean;
}

export interface EvidenceSubmissionRequest {
  moduleId: number;
  answer: string;
}

export interface EvidenceSubmission {
  id?: number;
  evidenceModule?: EvidenceModule;
  candidateAnswer?: string;
  score?: number;
  feedback?: string;
}

export interface RecruiterStatusRequest {
  status: string;
  reason?: string;
}

export type { ResponseMessage };
