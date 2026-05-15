import axios, { type AxiosInstance } from "axios";
import { parseAxiosError } from "../errors";
import { attachAuthInterceptor } from "../interceptors/auth.interceptor";
import { attachErrorInterceptor } from "../interceptors/error.interceptor";

export function createApiClient(baseURL: string): AxiosInstance {
  const client = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 60_000,
  });

  // Response interceptors run in reverse registration order on errors.
  client.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(parseAxiosError(error))
  );
  attachErrorInterceptor(client);
  attachAuthInterceptor(client);

  return client;
}
