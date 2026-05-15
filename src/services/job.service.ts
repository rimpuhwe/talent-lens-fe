import { aiApi } from "@/lib/api/services/ai.service";
import { jobsApi } from "@/lib/api/services/jobs.service";

/** @deprecated Use jobsApi from `@/lib/api` */
export const jobService = {
  createJob: jobsApi.create,
  getJobs: jobsApi.list,
  getJobById: jobsApi.getById,
  updateJob: jobsApi.update,
  generateAiDraft: jobsApi.generateAiDraft,
  generateStandardAssessment: jobsApi.generateStandardAssessment,
  closeJob: jobsApi.close,
};

/** @deprecated Use aiApi from `@/lib/api` */
export const aiService = {
  generateJobFull: aiApi.generateJob,
  matchCandidateToJob: aiApi.matchCandidateToJob,
  generateModule: aiApi.generateModule,
  evaluateMission: aiApi.evaluate,
  generateTechnicalAssessment: aiApi.generateStandardizedAssessment,
  evaluateTechnicalAssessment: aiApi.evaluateTechnical,
  autoSchedule: aiApi.autoSchedule,
};
