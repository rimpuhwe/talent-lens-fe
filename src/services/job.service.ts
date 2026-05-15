import { mainApi, aiApi } from "@/lib/api-client";
import { 
  JobSignalRequest, 
  AiJobDraftRequest,
  MatchCandidateToJobRequest,
  GenerateModuleRequest,
  EvaluateRequest,
  TechnicalGenRequest,
  TechnicalEvalRequest,
} from "@/types/api.types";

export const jobService = {
  createJob: async (data: JobSignalRequest) => {
    const response = await mainApi.post("/api/jobs", data);
    return response.data;
  },

  getJobs: async () => {
    const response = await mainApi.get("/api/jobs");
    return response.data;
  },

  getJobById: async (id: number) => {
    const response = await mainApi.get(`/api/jobs/${id}`);
    return response.data;
  },

  generateAiDraft: async (data: AiJobDraftRequest) => {
    // Main backend draft
    const response = await mainApi.post("/api/jobs/ai-draft", data);
    return response.data;
  },
  
  generateStandardAssessment: async (jobId: number, data: TechnicalGenRequest) => {
    const response = await mainApi.post(`/api/jobs/${jobId}/standardized-assessment`, data);
    return response.data;
  },
  
  closeJob: async (jobId: number) => {
    const response = await mainApi.patch(`/api/jobs/${jobId}/close`);
    return response.data;
  }
};

export const aiService = {
  generateJobFull: async (data: AiJobDraftRequest) => {
    const response = await aiApi.post("/api/recruiter/generate-job", data);
    return response.data;
  },

  matchCandidateToJob: async (data: MatchCandidateToJobRequest) => {
    const response = await aiApi.post("/api/intelligence/match", data);
    return response.data;
  },

  generateModule: async (data: GenerateModuleRequest) => {
    const response = await aiApi.post("/generate-module", data);
    return response.data;
  },

  evaluateMission: async (data: EvaluateRequest) => {
    const response = await aiApi.post("/evaluate", data);
    return response.data;
  },

  generateTechnicalAssessment: async (data: TechnicalGenRequest) => {
    const response = await aiApi.post("/api/assessment/generate-standardized", data);
    return response.data;
  },

  evaluateTechnicalAssessment: async (data: TechnicalEvalRequest) => {
    const response = await aiApi.post("/api/assessment/evaluate-technical", data);
    return response.data;
  },
  
  autoSchedule: async (data: { candidate_names: string[], start_date: string }) => {
    const response = await aiApi.post("/api/recruiter/auto-schedule", data);
    return response.data;
  }
};
