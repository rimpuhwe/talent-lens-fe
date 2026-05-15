import { apiEnv } from "../env";
import { createApiClient } from "./create-client";

export const mainApiClient = createApiClient(apiEnv.mainApiUrl);

/** @deprecated Use mainApiClient from @/lib/api */
export const mainApi = mainApiClient;
