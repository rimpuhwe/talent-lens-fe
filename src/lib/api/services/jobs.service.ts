import { mainApiClient } from "../clients/main.client";
import type {
  JobGenerationRequestDto,
  JobGenerationResponseDto,
  JobRequestDto,
  JobSignal,
  TechnicalGenRequestDto,
  TechnicalGenResponseDto,
} from "../types/backend";
import type { ResponseMessage } from "../types/common";

export const jobsApi = {
  list: async () => {
    const { data } = await mainApiClient.get<JobSignal[]>("/api/jobs");
    return data;
  },

  getById: async (id: number) => {
    const { data } = await mainApiClient.get<JobSignal>(`/api/jobs/${id}`);
    return data;
  },

  create: async (payload: JobRequestDto) => {
    const { data } = await mainApiClient.post<JobSignal>("/api/jobs", payload);
    return data;
  },

  update: async (id: number, payload: JobRequestDto) => {
    const { data } = await mainApiClient.put<JobSignal>(`/api/jobs/${id}`, payload);
    return data;
  },

  close: async (id: number) => {
    const { data } = await mainApiClient.patch<ResponseMessage>(`/api/jobs/${id}/close`);
    return data;
  },

  generateAiDraft: async (payload: JobGenerationRequestDto) => {
    const { data } = await mainApiClient.post<JobGenerationResponseDto>(
      "/api/jobs/ai-draft",
      payload
    );
    return data;
  },

  generateStandardAssessment: async (id: number, payload: TechnicalGenRequestDto) => {
    const { data } = await mainApiClient.post<TechnicalGenResponseDto>(
      `/api/jobs/${id}/standardized-assessment`,
      payload
    );
    return data;
  },
};
