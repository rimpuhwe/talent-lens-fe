"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../query/keys";
import { aiApi } from "../services/ai.service";
import type {
  AutoScheduleRequest,
  EvaluateRequest,
  GenerateModuleRequest,
  JobGenerationRequest,
  MatchRequest,
  TechnicalEvalRequest,
  TechnicalGenRequest,
} from "../types/ai";

export function useAiHealth() {
  return useQuery({
    queryKey: queryKeys.ai.health,
    queryFn: aiApi.health,
    staleTime: 5 * 60 * 1000,
  });
}

export function useMatchCandidateToJob() {
  return useMutation({
    mutationFn: (payload: MatchRequest) => aiApi.matchCandidateToJob(payload),
  });
}

export function useAiGenerateModule() {
  return useMutation({
    mutationFn: (payload: GenerateModuleRequest) => aiApi.generateModule(payload),
  });
}

export function useAiEvaluate() {
  return useMutation({
    mutationFn: (payload: EvaluateRequest) => aiApi.evaluate(payload),
  });
}

export function useAiGenerateJob() {
  return useMutation({
    mutationFn: (payload: JobGenerationRequest) => aiApi.generateJob(payload),
  });
}

export function useAiTechnicalAssessment() {
  return useMutation({
    mutationFn: (payload: TechnicalGenRequest) =>
      aiApi.generateStandardizedAssessment(payload),
  });
}

export function useAiEvaluateTechnical() {
  return useMutation({
    mutationFn: (payload: TechnicalEvalRequest) => aiApi.evaluateTechnical(payload),
  });
}

export function useAiAutoSchedule() {
  return useMutation({
    mutationFn: (payload: AutoScheduleRequest) => aiApi.autoSchedule(payload),
  });
}
