import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { getStoredAccessToken } from "../auth/token";

let tokenResolver: (() => string | null) | null = null;
let refreshHandler: (() => Promise<string | null>) | null = null;
let isRefreshing = false;
let refreshQueue: Array<(token: string | null) => void> = [];

export function setTokenResolver(resolver: () => string | null) {
  tokenResolver = resolver;
}

export function setRefreshHandler(handler: () => Promise<string | null>) {
  refreshHandler = handler;
}

function resolveAccessToken() {
  return tokenResolver?.() ?? getStoredAccessToken();
}

async function runRefresh(): Promise<string | null> {
  if (!refreshHandler) return null;
  if (isRefreshing) {
    return new Promise((resolve) => {
      refreshQueue.push(resolve);
    });
  }

  isRefreshing = true;
  try {
    const token = await refreshHandler();
    refreshQueue.forEach((resolve) => resolve(token));
    refreshQueue = [];
    return token;
  } finally {
    isRefreshing = false;
  }
}

export function attachAuthInterceptor(client: AxiosInstance) {
  client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = resolveAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  });

  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      if (error.response?.status !== 401 || originalRequest._retry) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;
      const newToken = await runRefresh();

      if (!newToken) {
        return Promise.reject(error);
      }

      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return client(originalRequest);
    }
  );
}
