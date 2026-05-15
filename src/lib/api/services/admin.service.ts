import { mainApiClient } from "../clients/main.client";
import type {
  CandidateProfile,
  Recruiter,
  RecruiterStatusRequest,
} from "../types/backend";
import type { ResponseMessage } from "../types/common";

export const adminApi = {
  getCandidates: async () => {
    const { data } = await mainApiClient.get<CandidateProfile[]>("/api/admin/candidates");
    return data;
  },

  getRecruiters: async () => {
    const { data } = await mainApiClient.get<Recruiter[]>("/api/admin/recruiters");
    return data;
  },

  getRecruiter: async (id: number) => {
    const { data } = await mainApiClient.get<Recruiter>(`/api/admin/recruiters/${id}`);
    return data;
  },

  updateRecruiterStatus: async (id: number, payload: RecruiterStatusRequest) => {
    const { data } = await mainApiClient.patch<ResponseMessage>(
      `/api/admin/recruiters/${id}/status`,
      payload
    );
    return data;
  },
};
