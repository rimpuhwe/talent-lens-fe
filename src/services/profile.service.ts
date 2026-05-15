import { mainApi } from "@/lib/api-client";
import { CandidateProfile, ProfileCompleteRequest } from "@/types/api.types";

export const profileService = {
  getMe: async (): Promise<CandidateProfile> => {
    const response = await mainApi.get<CandidateProfile>("/api/profile/me");
    return response.data;
  },

  getProfileStatus: async (): Promise<Record<string, any>> => {
    const response = await mainApi.get("/api/profile/status");
    return response.data;
  },

  completeProfile: async (data: ProfileCompleteRequest) => {
    const response = await mainApi.post("/api/profile/complete", data);
    return response.data;
  },

  updateProfile: async (data: Partial<ProfileCompleteRequest>) => {
    const response = await mainApi.put("/api/profile/update", data);
    return response.data;
  },

  uploadCv: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await mainApi.post("/api/profile/upload-cv", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }
};

export const evidenceService = {
  submitEvidence: async (data: any) => {
    const response = await mainApi.post("/api/evidence/submit", data);
    return response.data;
  },

  requestModule: async (data: { role: string; moduleType: string }) => {
    const response = await mainApi.post("/api/evidence/request", data);
    return response.data;
  },

  getMyResults: async () => {
    const response = await mainApi.get("/api/evidence/my-results");
    return response.data;
  },

  getRoleScores: async () => {
    const response = await mainApi.get("/api/evidence/role-scores");
    return response.data;
  }
};
