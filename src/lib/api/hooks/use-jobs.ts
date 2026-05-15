"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../query/keys";
import { jobsApi } from "../services/jobs.service";
import { aiApi } from "../services/ai.service";
import type { JobGenerationRequestDto, JobRequestDto, TechnicalGenRequestDto } from "../types/backend";

export function useJobs() {
  return useQuery({
    queryKey: queryKeys.jobs.all,
    queryFn: jobsApi.list,
  });
}

export function useJob(id: number, enabled = true) {
  return useQuery({
    queryKey: queryKeys.jobs.detail(id),
    queryFn: () => jobsApi.getById(id),
    enabled: enabled && Number.isFinite(id),
  });
}

export function useCreateJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: JobRequestDto) => jobsApi.create(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.jobs.all });
    },
  });
}

export function useUpdateJob(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: JobRequestDto) => jobsApi.update(id, payload),
    onSuccess: (job) => {
      queryClient.setQueryData(queryKeys.jobs.detail(id), job);
      void queryClient.invalidateQueries({ queryKey: queryKeys.jobs.all });
    },
  });
}

export function useCloseJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => jobsApi.close(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.jobs.all });
    },
  });
}

export function useGenerateJobDraft() {
  return useMutation({
    mutationFn: (payload: JobGenerationRequestDto) => jobsApi.generateAiDraft(payload),
  });
}

export function useGenerateAiJobDescription() {
  return useMutation({
    mutationFn: aiApi.generateJob,
  });
}

export function useGenerateStandardAssessment(jobId: number) {
  return useMutation({
    mutationFn: (payload: TechnicalGenRequestDto) =>
      jobsApi.generateStandardAssessment(jobId, payload),
  });
}
