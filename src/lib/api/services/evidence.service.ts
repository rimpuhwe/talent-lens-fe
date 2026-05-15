import { mainApiClient } from "../clients/main.client";
import type {
  EvidenceModule,
  EvidenceRequest,
  EvidenceSubmission,
  EvidenceSubmissionRequest,
} from "../types/backend";

export const evidenceApi = {
  requestModule: async (payload: EvidenceRequest) => {
    const { data } = await mainApiClient.post<EvidenceModule>(
      "/api/evidence/request",
      payload
    );
    return data;
  },

  submit: async (payload: EvidenceSubmissionRequest) => {
    const { data } = await mainApiClient.post<EvidenceSubmission>(
      "/api/evidence/submit",
      payload
    );
    return data;
  },

  getMyResults: async () => {
    const { data } = await mainApiClient.get<EvidenceSubmission[]>(
      "/api/evidence/my-results"
    );
    return data;
  },

  getRoleScores: async () => {
    const { data } = await mainApiClient.get<Record<string, number>>(
      "/api/evidence/role-scores"
    );
    return data;
  },
};
