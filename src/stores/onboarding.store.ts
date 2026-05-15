import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ProfileStatus } from "@/lib/api/types/backend";
import { isProfileComplete } from "@/lib/api/onboarding";

interface OnboardingState {
  status: ProfileStatus | null;
  isComplete: boolean;
  setStatus: (status: ProfileStatus | null) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      status: null,
      isComplete: false,
      setStatus: (status) =>
        set({
          status,
          isComplete: isProfileComplete(status),
        }),
      reset: () => set({ status: null, isComplete: false }),
    }),
    { name: "tl-onboarding" }
  )
);
