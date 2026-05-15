import { evidenceApi } from "@/lib/api/services/evidence.service";
import { profileApi } from "@/lib/api/services/profile.service";

/** @deprecated Use profileApi / evidenceApi from `@/lib/api` */
export const profileService = {
  ...profileApi,
  getProfileStatus: profileApi.getStatus,
  completeProfile: profileApi.complete,
  updateProfile: profileApi.update,
  uploadCv: profileApi.uploadCv,
};

/** @deprecated Use evidenceApi from `@/lib/api` */
export const evidenceService = evidenceApi;
