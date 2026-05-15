import { apiProxyPaths, resolveAiApiUrl } from "../env";
import { createApiClient } from "./create-client";

export const aiApiClient = createApiClient(resolveAiApiUrl(), {
  browserBaseURL: apiProxyPaths.ai,
});

/** @deprecated Use aiApiClient from @/lib/api */
export const aiApi = aiApiClient;
