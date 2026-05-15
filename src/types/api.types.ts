export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  Token?: string;
  role: "CANDIDATE" | "RECRUITER" | "ADMIN" | "SUPER_ADMIN" | "HR_MANAGER" | "VIEWER";
  Role?: "CANDIDATE" | "RECRUITER" | "ADMIN" | "SUPER_ADMIN" | "HR_MANAGER" | "VIEWER";
  status: string;
  Status?: string;
  message: string;
  Message?: string;
}

export interface RegisterCandidateRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: string;
  gender: string;
}

export interface RegisterRecruiterRequest {
  companyName: string;
  emailAddress: string;
  contactNumber: string;
  password: string;
  location: string;
  companySummary: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface ProfileCompleteRequest {
  jobRoles?: string[];
  workConditions?: "HIRED" | "OPEN" | "CLOSED" | "MATCH";
  professionalProfile: string;
  linkedInProfile?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  biography?: string;
  birthDate?: string;
  gender?: "MALE" | "FEMALE";
}

export interface JobSignalRequest {
  jobPosition: string;
  jobDescription: string;
  requiredSkills: { skillSetName: string }[];
  workType: string;
  experienceLevel?: string;
}

export interface AiJobDraftRequest {
  job_position: string;
  industry_field: string;
  company_about: string;
  additional_instructions?: string;
}

export interface MatchCandidateToJobRequest {
  candidate_tss: {
    roleName: string;
    talentSignalScore: number;
    skillScore: number;
    behaviorScore: number;
    learningScore: number;
    cultureScore: number;
  }[];
  job_signal: {
    jobPosition: string;
    jobDescription: string;
    requiredSkills: string[];
    experienceLevel?: string;
  };
}

export interface GenerateModuleRequest {
  role: string;
  moduleType: string;
  job_context?: string;
}

export interface EvaluateRequest {
  role: string;
  question: string;
  answer: string;
}

export interface TechnicalGenRequest {
  role: string;
  industry: string;
  job_description: string;
  recruiter_focus_areas: string;
}

export interface TechnicalEvalRequest {
  role: string;
  technical_question: string;
  grading_rubric_json: string;
  candidate_answer: string;
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
  gender?: "MALE" | "FEMALE";
  cvUrl?: string | null;
  jobRoles?: string[];
  workConditions?: "HIRED" | "OPEN" | "CLOSED" | "MATCH" | null;
  profileCompleted?: boolean;
  completionPercentage?: number;
  roleTssScores?: {
    roleName: string;
    talentSignalScore: number;
    skillScore: number;
    behaviorScore: number;
    learningScore: number;
    cultureScore: number;
  }[];
  globalAverageTSS?: number;
  biography?: string | null;
  Biography?: string | null;
}

export interface RecruiterProfile {
  id: number;
  companyEmail?: string;
  companyName?: string;
  applicationStatus?: "PENDING" | "COMPLETED" | "FAILED" | "APPROVED" | "DENIED";
  companyAddress?: string;
  companyDescription?: string;
  companyPhone?: string;
}

export interface JobSignal {
  id: number;
  jobPosition?: string;
  jobDescription?: string;
  workType?: string;
  experienceLevel?: string;
  skillsNeeded?: { skillSetName: string }[];
  requiredSkills?: { skillSetName: string }[];
  jobStatus?: "HIRED" | "OPEN" | "CLOSED" | "MATCH";
  recruiter?: RecruiterProfile;
}
