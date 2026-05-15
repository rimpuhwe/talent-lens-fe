import { apiProxyPaths, resolveMainApiUrl } from "../env";
import { createApiClient } from "./create-client";

export const mainApiClient = createApiClient(resolveMainApiUrl(), {
  browserBaseURL: apiProxyPaths.main,
});

/** @deprecated Use mainApiClient from @/lib/api */
export const mainApi = mainApiClient;
