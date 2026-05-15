import { apiEnv } from "../env";
import { createApiClient } from "./create-client";

export const aiApiClient = createApiClient(apiEnv.aiApiUrl);

/** @deprecated Use aiApiClient from @/lib/api */
export const aiApi = aiApiClient;
