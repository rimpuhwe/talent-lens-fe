import axios, { type AxiosInstance } from "axios";
import { parseAxiosError } from "../errors";
import { attachAuthInterceptor } from "../interceptors/auth.interceptor";
import { attachErrorInterceptor } from "../interceptors/error.interceptor";

export function createApiClient(
  baseURL: string,
  options?: { browserBaseURL?: string }
): AxiosInstance {
  const client = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 60_000,
  });

  if (options?.browserBaseURL) {
    client.interceptors.request.use((config) => {
      if (typeof window !== "undefined") {
        config.baseURL = options.browserBaseURL;
      }
      return config;
    });
  }

  // Response interceptors run in reverse registration order on errors.
  client.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(parseAxiosError(error))
  );
  attachErrorInterceptor(client);
  attachAuthInterceptor(client);

  return client;
}
