/**
 * Endpoint mapping for TalentLens backend + AI services.
 * Backend OpenAPI: /v3/api-docs
 * AI docs: https://talent-ai-production-1975.up.railway.app/docs
 */

export const backendEndpoints = {
  auth: {
    login: "POST /api/auth/login",
    verifyOtp: "POST /api/auth/verify-otp",
    registerCandidate: "POST /api/auth/register/candidate",
    registerRecruiter: "POST /api/auth/register/recruiter",
    user: "GET /api/auth/user",
    socialLogin: "GET /api/auth/social-login/{provider}",
    // Not exposed in current Swagger — reserved for future backend support
    forgotPassword: "POST /api/auth/forgot-password",
    resetPassword: "POST /api/auth/reset-password",
    refreshToken: "POST /api/auth/refresh",
  },
  profile: {
    me: "GET /api/profile/me",
    status: "GET /api/profile/status",
    complete: "POST /api/profile/complete",
    update: "PUT /api/profile/update",
    uploadCv: "POST /api/profile/upload-cv",
  },
  evidence: {
    request: "POST /api/evidence/request",
    submit: "POST /api/evidence/submit",
    myResults: "GET /api/evidence/my-results",
    roleScores: "GET /api/evidence/role-scores",
  },
  jobs: {
    list: "GET /api/jobs",
    create: "POST /api/jobs",
    detail: "GET /api/jobs/{id}",
    update: "PUT /api/jobs/{id}",
    close: "PATCH /api/jobs/{id}/close",
    aiDraft: "POST /api/jobs/ai-draft",
    standardizedAssessment: "POST /api/jobs/{id}/standardized-assessment",
  },
  admin: {
    candidates: "GET /api/admin/candidates",
    recruiters: "GET /api/admin/recruiters",
    recruiterDetail: "GET /api/admin/recruiters/{id}",
    recruiterStatus: "PATCH /api/admin/recruiters/{id}/status",
  },
} as const;

export const aiEndpoints = {
  health: "GET /health",
  generateModule: "POST /generate-module",
  evaluate: "POST /evaluate",
  match: "POST /api/intelligence/match",
  generateStandardized: "POST /api/assessment/generate-standardized",
  evaluateTechnical: "POST /api/assessment/evaluate-technical",
  generateJob: "POST /api/recruiter/generate-job",
  autoSchedule: "POST /api/recruiter/auto-schedule",
} as const;
