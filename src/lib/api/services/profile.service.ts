import { mainApiClient } from "../clients/main.client";
import type {
  CandidateProfile,
  CandidateProfileDto,
  ProfileStatus,
} from "../types/backend";
import type { ResponseMessage } from "../types/common";

export const profileApi = {
  getMe: async () => {
    const { data } = await mainApiClient.get<CandidateProfile>("/api/profile/me");
    return data;
  },

  getStatus: async () => {
    const { data } = await mainApiClient.get<ProfileStatus>("/api/profile/status");
    return data;
  },

  complete: async (payload: CandidateProfileDto) => {
    const { data } = await mainApiClient.post<CandidateProfile>(
      "/api/profile/complete",
      payload
    );
    return data;
  },

  update: async (payload: Partial<CandidateProfileDto>) => {
    const { data } = await mainApiClient.put<CandidateProfile>(
      "/api/profile/update",
      payload
    );
    return data;
  },

  uploadCv: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await mainApiClient.post<ResponseMessage>(
      "/api/profile/upload-cv",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return data;
  },
};
