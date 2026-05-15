"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../query/keys";
import { adminApi } from "../services/admin.service";
import type { RecruiterStatusRequest } from "../types/backend";

export function useAdminCandidates() {
  return useQuery({
    queryKey: queryKeys.admin.candidates,
    queryFn: adminApi.getCandidates,
  });
}

export function useAdminRecruiters() {
  return useQuery({
    queryKey: queryKeys.admin.recruiters,
    queryFn: adminApi.getRecruiters,
  });
}

export function useAdminRecruiter(id: number, enabled = true) {
  return useQuery({
    queryKey: queryKeys.admin.recruiter(id),
    queryFn: () => adminApi.getRecruiter(id),
    enabled: enabled && Number.isFinite(id),
  });
}

export function useUpdateRecruiterStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: RecruiterStatusRequest }) =>
      adminApi.updateRecruiterStatus(id, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.admin.recruiters });
    },
  });
}
