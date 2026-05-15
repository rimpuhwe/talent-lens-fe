import axios, { type AxiosInstance } from "axios";
import { apiEnv } from "../env";
import { parseAxiosError } from "../errors";

export function createServerMainClient(accessToken?: string): AxiosInstance {
  const client = axios.create({
    baseURL: apiEnv.mainApiUrl,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    timeout: 60_000,
  });

  client.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(parseAxiosError(error))
  );

  return client;
}

export function createServerAiClient(accessToken?: string): AxiosInstance {
  const client = axios.create({
    baseURL: apiEnv.aiApiUrl,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    timeout: 120_000,
  });

  client.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(parseAxiosError(error))
  );

  return client;
}
