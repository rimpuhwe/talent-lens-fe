import type { AxiosInstance } from "axios";
import { signOut } from "next-auth/react";
import { clearAuthStorage } from "../auth/token";

let unauthorizedHandler: (() => void) | null = null;

export function setUnauthorizedHandler(handler: () => void) {
  unauthorizedHandler = handler;
}

export function attachErrorInterceptor(client: AxiosInstance) {
  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const status = error.response?.status;
      const originalRequest = error.config as { _retry?: boolean } | undefined;

      if (status === 401 && !originalRequest?._retry) {
        clearAuthStorage();
        if (typeof window !== "undefined") {
          if (unauthorizedHandler) {
            unauthorizedHandler();
          } else {
            await signOut({ callbackUrl: "/login" });
          }
        }
      }

      return Promise.reject(error);
    }
  );
}
