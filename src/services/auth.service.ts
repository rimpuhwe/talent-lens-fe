import { mainApi } from "@/lib/api-client";
import { 
  LoginRequest, 
  LoginResponse, 
  RegisterCandidateRequest, 
  RegisterRecruiterRequest,
  VerifyOtpRequest
} from "@/types/api.types";
import { normalizeRole } from "@/lib/auth-routes";

export const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const formData = new URLSearchParams({
      username: data.email,
      password: data.password,
    });

    const response = await mainApi.post<LoginResponse>("/api/auth/login", formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const role = normalizeRole(response.data.role || response.data.Role);

    if (!role) {
      throw new Error("Unsupported user role returned by the server.");
    }

    return {
      ...response.data,
      token: response.data.token || response.data.Token || "",
      role,
      status: response.data.status || response.data.Status || "",
      message: response.data.message || response.data.Message || "",
    };
  },

  registerCandidate: async (data: RegisterCandidateRequest) => {
    const response = await mainApi.post("/api/auth/register/candidate", data);
    return response.data;
  },

  registerRecruiter: async (data: RegisterRecruiterRequest) => {
    const response = await mainApi.post("/api/auth/register/recruiter", data);
    return response.data;
  },

  verifyOtp: async (data: VerifyOtpRequest) => {
    const response = await mainApi.post("/api/auth/verify-otp", data);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
  }
};
