"use client";

import { useMutation } from "@tanstack/react-query";
import { authApi } from "../services/auth.service";
import type { CandidateRegister, OtpRequest, RecruiterRegister } from "../types/backend";

export function useRegisterCandidate() {
  return useMutation({
    mutationFn: (payload: CandidateRegister) => authApi.registerCandidate(payload),
  });
}

export function useRegisterRecruiter() {
  return useMutation({
    mutationFn: (payload: RecruiterRegister) => authApi.registerRecruiter(payload),
  });
}

export function useVerifyOtp() {
  return useMutation({
    mutationFn: (payload: OtpRequest) => authApi.verifyOtp(payload),
  });
}
