"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../query/keys";
import { profileApi } from "../services/profile.service";
import type { CandidateProfileDto } from "../types/backend";
import { useOnboardingStore } from "@/stores/onboarding.store";

export function useProfile() {
  return useQuery({
    queryKey: queryKeys.profile.me,
    queryFn: profileApi.getMe,
  });
}

export function useProfileStatus() {
  const setStatus = useOnboardingStore((s) => s.setStatus);

  return useQuery({
    queryKey: queryKeys.profile.status,
    queryFn: async () => {
      const status = await profileApi.getStatus();
      setStatus(status);
      return status;
    },
  });
}

export function useCompleteProfile() {
  const queryClient = useQueryClient();
  const setStatus = useOnboardingStore((s) => s.setStatus);

  return useMutation({
    mutationFn: (payload: CandidateProfileDto) => profileApi.complete(payload),
    onSuccess: async (profile) => {
      queryClient.setQueryData(queryKeys.profile.me, profile);
      const status = await profileApi.getStatus();
      setStatus(status);
      queryClient.setQueryData(queryKeys.profile.status, status);
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<CandidateProfileDto>) => profileApi.update(payload),
    onSuccess: (profile) => {
      queryClient.setQueryData(queryKeys.profile.me, profile);
      void queryClient.invalidateQueries({ queryKey: queryKeys.profile.status });
    },
  });
}

export function useUploadCv() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => profileApi.uploadCv(file),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.profile.me });
      void queryClient.invalidateQueries({ queryKey: queryKeys.profile.status });
    },
  });
}
