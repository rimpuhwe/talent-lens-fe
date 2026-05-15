"use client";

import { ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { useProfile } from "@/lib/api/hooks/use-profile";

export default function CandidateLayout({ children }: { children: ReactNode }) {
  const { data: profile } = useProfile();

  const fullName =
    `${profile?.firstName ?? ""} ${profile?.lastName ?? ""}`.trim() || "Candidate";

  return (
    <div className="min-h-screen bg-[#050A15] text-slate-300">
      <Sidebar
        role="candidate"
        userName={fullName}
        userLocation={profile?.workConditions ?? profile?.jobRoles?.[0] ?? "OPEN"}
      />
      <main className="ml-0 min-h-screen transition-all duration-300 lg:ml-64">
        <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8 xl:px-10">
          <div className="mx-auto">{children}</div>
        </div>
      </main>
    </div>
  );
}
