"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, BarChart3, Briefcase, CheckCircle, FileText, Plus, Sparkles, Users } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { aiService, jobService } from "@/services/job.service";
import type { JobSignal } from "@/types/api.types";

export default function RecruiterDashboard() {
  const [jobs, setJobs] = useState<JobSignal[]>([]);
  const [matchPreview, setMatchPreview] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await jobService.getJobs();
        const jobList = Array.isArray(data) ? data : [];
        setJobs(jobList);

        const first = jobList[0];
        if (first) {
          const match = await aiService.matchCandidateToJob({
            candidate_tss: [
              {
                roleName: first.jobPosition || "Candidate",
                talentSignalScore: 76,
                skillScore: 74,
                behaviorScore: 69,
                learningScore: 82,
                cultureScore: 71,
              },
            ],
            job_signal: {
              jobPosition: first.jobPosition || "Open role",
              jobDescription: first.jobDescription || "No description",
              requiredSkills: (first.skillsNeeded || first.requiredSkills || []).map((skill: { skillSetName: string }) => skill.skillSetName),
              experienceLevel: first.experienceLevel,
            },
          });
          setMatchPreview(match);
        }
      } catch (err: any) {
        setError(err?.response?.data?.message || err?.message || "Unable to load recruiter dashboard.");
      } finally {
        setLoading(false);
      }
    };

    void loadDashboard();
  }, []);

  const activeJobs = jobs.filter((job) => job.jobStatus !== "CLOSED");
  const closedJobs = jobs.filter((job) => job.jobStatus === "CLOSED");
  const chartData = useMemo(
    () => [
      { name: "Open", jobs: activeJobs.length },
      { name: "Closed", jobs: closedJobs.length },
      { name: "Match", jobs: jobs.filter((job) => job.jobStatus === "MATCH").length },
      { name: "Hired", jobs: jobs.filter((job) => job.jobStatus === "HIRED").length },
    ],
    [activeJobs.length, closedJobs.length, jobs]
  );

  return (
    <div className="flex min-h-screen bg-[#080D1A] text-slate-300">
      <Sidebar role="recruiter" userName="Recruiter" userLocation="TalentLens" />

      <main className="flex-1 ml-64 p-8">
        <div className="mx-auto max-w-7xl">
          <header className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#3B82F6]">Recruiter Intelligence</p>
              <h1 className="text-3xl font-extrabold tracking-tight text-white">Hiring Command Center</h1>
              <p className="mt-2 text-sm text-slate-400">Live job signals, AI matching, assessments, and recruiter workflow health.</p>
            </div>
            <Link href="/signals">
              <Button className="rounded-xl bg-[#3B82F6] text-white hover:bg-blue-600">
                <Plus size={16} className="mr-2" /> Post Job Signal
              </Button>
            </Link>
          </header>

          {error && <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">{error}</div>}

          <section className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard icon={FileText} label="Published Jobs" value={loading ? "..." : `${jobs.length}`} detail="From /api/jobs" />
            <MetricCard icon={Briefcase} label="Active Signals" value={`${activeJobs.length}`} detail="Open, match, and hired roles" />
            <MetricCard icon={Sparkles} label="AI Match Preview" value={matchPreview ? `${matchPreview.overall_match_percent}%` : "--"} detail={matchPreview?.shortlist_recommendation || "Run once jobs load"} />
            <MetricCard icon={CheckCircle} label="Closed Jobs" value={`${closedJobs.length}`} detail="Recruiter close workflow" />
          </section>

          <section className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-12">
            <div className="rounded-3xl border border-slate-800 bg-[#0A0F1C] p-7 xl:col-span-7">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white">Job Signal Mix</h2>
                  <p className="text-sm text-slate-400">Status distribution from backend job data.</p>
                </div>
                <BarChart3 className="text-[#3B82F6]" />
              </div>
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E2D45" vertical={false} />
                    <XAxis dataKey="name" tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
                    <Tooltip cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                    <Bar dataKey="jobs" fill="#3B82F6" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-[#0A0F1C] p-7 xl:col-span-5">
              <h2 className="text-lg font-bold text-white">AI Explainability Sample</h2>
              <p className="mt-2 text-sm text-slate-400">Generated through `/api/intelligence/match` using the first available job signal.</p>
              {matchPreview ? (
                <div className="mt-6 space-y-4">
                  <div className="rounded-2xl border border-slate-800 bg-[#111827] p-5">
                    <p className="text-4xl font-black text-white">{matchPreview.overall_match_percent}%</p>
                    <p className="mt-1 text-sm font-bold uppercase tracking-widest text-emerald-400">{matchPreview.shortlist_recommendation}</p>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-300">{matchPreview.explainability_summary}</p>
                  <p className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-100">{matchPreview.suggested_gap_test}</p>
                </div>
              ) : (
                <EmptyState title="No match preview yet" copy="Create a job signal and the AI match panel will populate." />
              )}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-800 bg-[#0A0F1C] p-7">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Active Job Signals</h2>
                <p className="text-sm text-slate-400">Backend records from `/api/jobs`.</p>
              </div>
              <Link href="/signals" className="inline-flex items-center gap-2 text-sm font-bold text-[#3B82F6]">
                Manage <ArrowRight size={14} />
              </Link>
            </div>

            <div className="space-y-3">
              {jobs.slice(0, 8).map((job) => (
                <div key={job.id} className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-[#111827]/60 p-5 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="mb-1 flex items-center gap-3">
                      <h3 className="font-bold text-white">{job.jobPosition}</h3>
                      <span className="rounded-lg bg-blue-500/10 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-300">{job.jobStatus || "OPEN"}</span>
                    </div>
                    <p className="line-clamp-1 text-sm text-slate-400">{job.jobDescription}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(job.skillsNeeded || job.requiredSkills || []).slice(0, 5).map((skill) => (
                        <span key={skill.skillSetName} className="rounded-md border border-[#3B82F6]/20 bg-[#3B82F6]/10 px-2 py-1 text-xs font-bold text-[#3B82F6]">{skill.skillSetName}</span>
                      ))}
                    </div>
                  </div>
                  <Link href="/shortlist" className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm font-bold text-slate-200 hover:bg-slate-800">
                    View shortlist <ArrowRight size={14} />
                  </Link>
                </div>
              ))}

              {!jobs.length && <EmptyState title="No jobs yet" copy="Post a new signal to begin matching candidates." />}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, detail }: { icon: any; label: string; value: string; detail: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0A0F1C] p-6">
      <div className="mb-5 flex items-center justify-between">
        <div className="rounded-xl bg-[#3B82F6]/10 p-3 text-[#3B82F6]"><Icon size={20} /></div>
        <Users size={16} className="text-slate-600" />
      </div>
      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-500">{label}</p>
      <p className="text-3xl font-black text-white">{value}</p>
      <p className="mt-2 text-sm text-slate-400">{detail}</p>
    </div>
  );
}

function EmptyState({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="mt-6 rounded-2xl border border-dashed border-slate-800 p-8 text-center">
      <p className="font-bold text-white">{title}</p>
      <p className="mt-2 text-sm text-slate-500">{copy}</p>
    </div>
  );
}
