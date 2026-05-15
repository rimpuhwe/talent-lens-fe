"use client";

import { ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#050A15] text-slate-300">
      {/* Sidebar */}
      <Sidebar
        role="candidate"
        userName="Candidate"
        userLocation="OPEN"
      />

      {/* Main Content */}
      <main className="ml-0 min-h-screen transition-all duration-300 lg:ml-64">
        <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8 xl:px-10">
          <div className="mx-auto ">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}