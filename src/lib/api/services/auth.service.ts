import { normalizeRole } from "@/lib/auth-routes";
import { mainApiClient } from "../clients/main.client";
import { ApiError } from "../errors";
import type {
  CandidateRegister,
  LoginMessage,
  OtpRequest,
  RecruiterRegister,
} from "../types/backend";

export interface LoginInput {
  email: string;
  password: string;
}

export const authApi = {
  login: async ({ email, password }: LoginInput) => {
    const formData = new URLSearchParams({
      username: email,
      password,
    });

    const { data } = await mainApiClient.post<LoginMessage>(
      "/api/auth/login",
      formData,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const token = data.token || data.Token;
    const role = normalizeRole(data.role || data.Role);
    const refreshToken = data.refreshToken || data.RefreshToken;

    if (!token || !role) {
      throw new ApiError("Unsupported user role returned by the server.", {
        code: "VALIDATION",
      });
    }

    return { ...data, token, role, refreshToken };
  },

  registerCandidate: async (payload: CandidateRegister) => {
    const { data } = await mainApiClient.post("/api/auth/register/candidate", payload);
    return data;
  },

  registerRecruiter: async (payload: RecruiterRegister) => {
    const { data } = await mainApiClient.post("/api/auth/register/recruiter", payload);
    return data;
  },

  verifyOtp: async (payload: OtpRequest) => {
    const { data } = await mainApiClient.post("/api/auth/verify-otp", payload);
    return data;
  },

  getOAuthUser: async () => {
    const { data } = await mainApiClient.get<Record<string, unknown>>("/api/auth/user");
    return data;
  },

  getSocialLoginUrl: (provider: string) =>
    `${mainApiClient.defaults.baseURL}/api/auth/social-login/${provider}`,

  /** Reserved — not in current backend Swagger */
  forgotPassword: async (_email: string) => {
    throw new ApiError("Forgot password is not available on the backend yet.", {
      code: "NOT_IMPLEMENTED",
    });
  },

  /** Reserved — not in current backend Swagger */
  resetPassword: async (_payload: { email: string; token: string; password: string }) => {
    throw new ApiError("Reset password is not available on the backend yet.", {
      code: "NOT_IMPLEMENTED",
    });
  },

  /** Reserved — not in current backend Swagger */
  refreshToken: async (_refreshToken: string) => {
    throw new ApiError("Refresh token is not available on the backend yet.", {
      code: "NOT_IMPLEMENTED",
    });
  },
};
