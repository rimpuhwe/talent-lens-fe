import { mainApi } from "@/lib/api-client";

export const adminService = {
  getCandidates: async () => {
    const response = await mainApi.get("/api/admin/candidates");
    return response.data;
  },

  getRecruiters: async () => {
    const response = await mainApi.get("/api/admin/recruiters");
    return response.data;
  },

  getRecruiter: async (id: number) => {
    const response = await mainApi.get(`/api/admin/recruiters/${id}`);
    return response.data;
  },

  updateRecruiterStatus: async (
    id: number,
    data: { status: "APPROVED" | "DENIED" | "PENDING" | "COMPLETED" | "FAILED"; reason?: string }
  ) => {
    const response = await mainApi.patch(`/api/admin/recruiters/${id}/status`, data);
    return response.data;
  },
};
