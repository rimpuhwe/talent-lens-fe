"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../query/keys";
import { evidenceApi } from "../services/evidence.service";
import { aiApi } from "../services/ai.service";
import type { EvidenceRequest, EvidenceSubmissionRequest } from "../types/backend";

export function useEvidenceResults() {
  return useQuery({
    queryKey: queryKeys.evidence.results,
    queryFn: evidenceApi.getMyResults,
  });
}

export function useRoleScores() {
  return useQuery({
    queryKey: queryKeys.evidence.roleScores,
    queryFn: evidenceApi.getRoleScores,
  });
}

export function useRequestEvidenceModule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: EvidenceRequest) => evidenceApi.requestModule(payload),
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.evidence.module(variables.role, variables.moduleType),
      });
    },
  });
}

export function useSubmitEvidence() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: EvidenceSubmissionRequest) => evidenceApi.submit(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.evidence.results });
      void queryClient.invalidateQueries({ queryKey: queryKeys.evidence.roleScores });
      void queryClient.invalidateQueries({ queryKey: queryKeys.profile.me });
    },
  });
}

export function useGenerateAiModule() {
  return useMutation({
    mutationFn: aiApi.generateModule,
  });
}

export function useEvaluateMission() {
  return useMutation({
    mutationFn: aiApi.evaluate,
  });
}
