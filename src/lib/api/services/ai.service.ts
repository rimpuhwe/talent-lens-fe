import { aiApiClient } from "../clients/ai.client";
import type {
  AutoScheduleRequest,
  AutoScheduleResponse,
  EvaluateRequest,
  EvaluateResponse,
  GenerateModuleRequest,
  GenerateModuleResponse,
  JobGenerationRequest,
  JobGenerationResponse,
  MatchRequest,
  MatchResponse,
  TechnicalEvalRequest,
  TechnicalEvalResponse,
  TechnicalGenRequest,
  TechnicalGenResponse,
} from "../types/ai";

export const aiApi = {
  health: async () => {
    const { data } = await aiApiClient.get<{ status?: string }>("/health");
    return data;
  },

  generateModule: async (payload: GenerateModuleRequest) => {
    const { data } = await aiApiClient.post<GenerateModuleResponse>(
      "/generate-module",
      {
        role: payload.role,
        module_type: payload.module_type ?? payload.moduleType,
        job_context: payload.job_context,
      }
    );
    return data;
  },

  evaluate: async (payload: EvaluateRequest) => {
    const { data } = await aiApiClient.post<EvaluateResponse>("/evaluate", payload);
    return data;
  },

  matchCandidateToJob: async (payload: MatchRequest) => {
    const { data } = await aiApiClient.post<MatchResponse>(
      "/api/intelligence/match",
      payload
    );
    return data;
  },

  generateJob: async (payload: JobGenerationRequest) => {
    const { data } = await aiApiClient.post<JobGenerationResponse>(
      "/api/recruiter/generate-job",
      payload
    );
    return data;
  },

  generateStandardizedAssessment: async (payload: TechnicalGenRequest) => {
    const { data } = await aiApiClient.post<TechnicalGenResponse>(
      "/api/assessment/generate-standardized",
      payload
    );
    return data;
  },

  evaluateTechnical: async (payload: TechnicalEvalRequest) => {
    const { data } = await aiApiClient.post<TechnicalEvalResponse>(
      "/api/assessment/evaluate-technical",
      payload
    );
    return data;
  },

  autoSchedule: async (payload: AutoScheduleRequest) => {
    const { data } = await aiApiClient.post<AutoScheduleResponse>(
      "/api/recruiter/auto-schedule",
      payload
    );
    return data;
  },
};
