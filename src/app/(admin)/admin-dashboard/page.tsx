"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertCircle, CheckCircle2, ShieldCheck, Users, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { adminService } from "@/services/admin.service";
import type { CandidateProfile, RecruiterProfile } from "@/types/api.types";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"recruiters" | "candidates">("recruiters");
  const [recruiters, setRecruiters] = useState<RecruiterProfile[]>([]);
  const [candidates, setCandidates] = useState<CandidateProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    setLoading(true);
    setError("");

    try {
      const [recruiterRes, candidateRes] = await Promise.allSettled([
        adminService.getRecruiters(),
        adminService.getCandidates(),
      ]);

      if (recruiterRes.status === "fulfilled") setRecruiters(Array.isArray(recruiterRes.value) ? recruiterRes.value : []);
      if (candidateRes.status === "fulfilled") setCandidates(Array.isArray(candidateRes.value) ? candidateRes.value : []);
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Unable to load admin dashboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadDashboard();
  }, []);

  const stats = useMemo(() => {
    const approvedRecruiters = recruiters.filter((recruiter) => recruiter.applicationStatus === "APPROVED").length;
    const pendingRecruiters = recruiters.filter((recruiter) => recruiter.applicationStatus === "PENDING").length;
    const completeCandidates = candidates.filter((candidate) => candidate.profileCompleted).length;

    return [
      { label: "Candidates", value: candidates.length, detail: `${completeCandidates} completed profiles`, icon: Users, color: "text-blue-400" },
      { label: "Recruiters", value: recruiters.length, detail: `${approvedRecruiters} approved`, icon: ShieldCheck, color: "text-emerald-400" },
      { label: "Pending Reviews", value: pendingRecruiters, detail: "Recruiter approvals", icon: AlertCircle, color: "text-amber-400" },
      { label: "Avg Completion", value: `${Math.round(candidates.reduce((sum, item) => sum + Number(item.completionPercentage ?? 0), 0) / Math.max(candidates.length, 1))}%`, detail: "Candidate passport readiness", icon: CheckCircle2, color: "text-purple-400" },
    ];
  }, [candidates, recruiters]);

  const updateRecruiter = async (id: number, status: "APPROVED" | "DENIED") => {
    setUpdatingId(id);
    setError("");

    try {
      await adminService.updateRecruiterStatus(id, { status });
      await loadDashboard();
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Unable to update recruiter status. Check your connection and try again.";
      setError(message);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#050A15] p-8 text-white">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-400">Admin Super</p>
          <h1 className="text-4xl font-black tracking-tight">Platform Operations</h1>
          <p className="mt-2 text-slate-400">Live candidate and recruiter governance from the TalentLens API.</p>
        </header>

        {error && <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">{error}</div>}

        <section className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <div className="mb-5 flex items-center justify-between">
                <div className={`rounded-xl bg-white/5 p-3 ${stat.color}`}>
                  <stat.icon size={20} />
                </div>
                <span className="text-xs font-bold text-slate-500">LIVE</span>
              </div>
              <p className="mb-1 text-xs font-black uppercase tracking-widest text-slate-500">{stat.label}</p>
              <p className="text-3xl font-black">{loading ? "..." : stat.value}</p>
              <p className="mt-2 text-sm text-slate-400">{stat.detail}</p>
            </div>
          ))}
        </section>

        <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]">
          <div className="flex flex-col gap-5 border-b border-white/10 p-6 md:flex-row md:items-center md:justify-between">
            <div className="flex w-fit rounded-2xl bg-white/5 p-1">
              <button
                onClick={() => setActiveTab("recruiters")}
                className={`rounded-xl px-5 py-2 text-sm font-bold ${activeTab === "recruiters" ? "bg-emerald-500 text-white" : "text-slate-400 hover:text-white"}`}
              >
                Recruiters
              </button>
              <button
                onClick={() => setActiveTab("candidates")}
                className={`rounded-xl px-5 py-2 text-sm font-bold ${activeTab === "candidates" ? "bg-emerald-500 text-white" : "text-slate-400 hover:text-white"}`}
              >
                Candidates
              </button>
            </div>
            <p className="text-sm text-slate-400">
              Showing {activeTab === "recruiters" ? recruiters.length : candidates.length} records
            </p>
          </div>

          <div className="overflow-x-auto">
            {activeTab === "recruiters" ? (
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5">
                    <HeaderCell>Company</HeaderCell>
                    <HeaderCell>Email</HeaderCell>
                    <HeaderCell>Status</HeaderCell>
                    <HeaderCell>Phone</HeaderCell>
                    <HeaderCell>Actions</HeaderCell>
                  </tr>
                </thead>
                <tbody>
                  {recruiters.map((recruiter) => (
                    <tr key={recruiter.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                      <Cell>
                        <p className="font-bold text-white">{recruiter.companyName || "Unnamed company"}</p>
                        <p className="text-xs text-slate-500">{recruiter.companyAddress || "No address"}</p>
                      </Cell>
                      <Cell>{recruiter.companyEmail || "--"}</Cell>
                      <Cell>
                        <StatusBadge status={recruiter.applicationStatus || "PENDING"} />
                      </Cell>
                      <Cell>{recruiter.companyPhone || "--"}</Cell>
                      <Cell>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            disabled={updatingId === recruiter.id}
                            onClick={() => void updateRecruiter(recruiter.id, "APPROVED")}
                            className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400 hover:bg-emerald-500 hover:text-white disabled:opacity-50"
                          >
                            <CheckCircle2 size={16} />
                          </button>
                          <button
                            type="button"
                            disabled={updatingId === recruiter.id}
                            onClick={() => void updateRecruiter(recruiter.id, "DENIED")}
                            className="rounded-lg bg-red-500/10 p-2 text-red-400 hover:bg-red-500 hover:text-white disabled:opacity-50"
                          >
                            <XCircle size={16} />
                          </button>
                        </div>
                      </Cell>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5">
                    <HeaderCell>Candidate</HeaderCell>
                    <HeaderCell>Email</HeaderCell>
                    <HeaderCell>Roles</HeaderCell>
                    <HeaderCell>Completion</HeaderCell>
                    <HeaderCell>TSS</HeaderCell>
                  </tr>
                </thead>
                <tbody>
                  {candidates.map((candidate) => (
                    <tr key={candidate.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                      <Cell>
                        <p className="font-bold text-white">{`${candidate.firstName ?? ""} ${candidate.lastName ?? ""}`.trim() || "Unnamed candidate"}</p>
                        <p className="text-xs text-slate-500">{candidate.workConditions || "OPEN"}</p>
                      </Cell>
                      <Cell>{candidate.emailAddress || "--"}</Cell>
                      <Cell>{candidate.jobRoles?.join(", ") || "--"}</Cell>
                      <Cell>{candidate.completionPercentage ?? 0}%</Cell>
                      <Cell>{Math.round(candidate.globalAverageTSS ?? 0)}</Cell>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="border-t border-white/10 p-6">
            <Button disabled className="rounded-xl border border-white/10 bg-white/5 text-slate-400">Pagination coming from API when available</Button>
          </div>
        </section>
      </div>
    </div>
  );
}

function HeaderCell({ children }: { children: React.ReactNode }) {
  return <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-500">{children}</th>;
}

function Cell({ children }: { children: React.ReactNode }) {
  return <td className="px-6 py-5 text-sm text-slate-300">{children}</td>;
}

function StatusBadge({ status }: { status: string }) {
  const isApproved = status === "APPROVED" || status === "COMPLETED";
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${isApproved ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"}`}>
      {status}
    </span>
  );
}
