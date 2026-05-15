"use client";

import {
  ExternalLink,
  TrendingUp,
  Clock,
  AlertCircle,
  Target,
  Sparkles,
  BrainCircuit,
  ArrowUpRight,
} from "lucide-react";

import Sidebar from "@/components/layout/Sidebar";
import {
  ProgressBar,
  SectionHeader,
} from "@/components/shared";

import {
  mockCandidateProfile,
  mockLearningRecs,
  mockMissionAttempts,
} from "@/lib/mock-data";

// Helper function for dynamic grading colors
const getGradeColor = (score: number) => {
  if (score < 50) return "#F59E0B"; // Yellow
  if (score <= 75) return "#334DAF"; // Blue
  return "#10B981"; // Green
};

// F5: Updated stage-based progression
const missionProgressionData = [
  { stage: "Skill Proof", score: 62 },
  { stage: "Judgment", score: 68 },
  { stage: "Learning", score: 82 },
];

const dimensionConfig = [
  {
    key: "skill_proof_score",
    label: "Skill Proof",
    color: "#10B981",
    score: 74,
    threshold: 80,
  },
  {
    key: "work_behavior_score",
    label: "Work Behavior",
    color: "#F59E0B",
    score: 68,
    threshold: 75,
  },
  {
    key: "learning_agility_score",
    label: "Learning Agility",
    color: "#3B82F6",
    score: 82,
    threshold: 75,
  },
  {
    key: "culture_fit_score",
    label: "Communication",
    color: "#A855F7",
    score: 0,
    threshold: 70,
  },
];

export default function GapReportPage() {
  const profile = mockCandidateProfile;

  const weakDimensions = dimensionConfig.filter(
    (d) => d.score < d.threshold
  );

  const strongDimensions = dimensionConfig.filter(
    (d) => d.score >= d.threshold
  );

  return (
    <div className="min-h-screen bg-[#050A15] text-slate-300">
      <Sidebar
        role="candidate"
        userName={profile.full_name}
        userLocation={profile.location}
      />

      <main className="min-h-screen">
        <div className="relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 blur-3xl" />

            <div className="absolute inset-0" />
          </div>

          {/* Content */}
          <div className="relative z-10 px-4 py-6 sm:px-6 lg:px-8 lg:py-8 xl:px-10">
            <div className="mx-auto max-w-12xl">
              {/* Header */}
              <div className="mb-10">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">
                  
                  <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-emerald-400">
                    System 3 · Learning Loop
                  </span>
                </div>

                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <h1 className="text-4xl font-black tracking-tight text-white lg:text-5xl">
                      Skill Gap Report
                    </h1>

                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 lg:text-base">
                      Precision learning intelligence powered by
                      evidence-driven talent analytics.
                      Identify weaknesses, strengthen proof, and
                      accelerate growth.
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <div className="rounded-2xl border border-white/5 bg-white/[0.03] px-5 py-4 backdrop-blur-xl">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Weak Areas
                      </p>

                      <p className="mt-2 text-3xl font-black text-red-400">
                        {weakDimensions.length}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/5 bg-white/[0.03] px-5 py-4 backdrop-blur-xl">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Strengths
                      </p>

                      <p className="mt-2 text-3xl font-black text-emerald-400">
                        {strongDimensions.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Overview */}
              <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
                {/* Weak */}
                <div className="rounded-3xl border border-red-500/10 bg-[#0A0F1C]/80 p-6 backdrop-blur-xl">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-500/10">
                      <AlertCircle
                        size={20}
                        className="text-red-400"
                      />
                    </div>

                    <div>
                      <h2 className="text-lg font-bold text-white">
                        Gaps to Close
                      </h2>

                      <p className="text-sm text-slate-400">
                        Areas below target threshold
                      </p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    {weakDimensions.map((d) => (
                      <div key={d.key}>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-sm font-semibold text-slate-300">
                            {d.label}
                          </span>

                          <span className="text-sm font-bold text-white">
                            {d.score > 0 ? d.score : "—"}
                            <span className="ml-1 text-slate-500">
                              / {d.threshold}
                            </span>
                          </span>
                        </div>

                        <ProgressBar
                          value={d.score}
                          color={
                            d.score === 0
                              ? "#F43F5E"
                              : "#F59E0B"
                          }
                          height={5}
                          showLabel={false}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Strong */}
                <div className="rounded-3xl border border-emerald-500/10 bg-[#0A0F1C]/80 p-6 backdrop-blur-xl">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10">
                      <TrendingUp
                        size={20}
                        className="text-emerald-400"
                      />
                    </div>

                    <div>
                      <h2 className="text-lg font-bold text-white">
                        Core Strengths
                      </h2>

                      <p className="text-sm text-slate-400">
                        Dimensions exceeding expectations
                      </p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    {strongDimensions.map((d) => (
                      <div key={d.key}>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-sm font-semibold text-slate-300">
                            {d.label}
                          </span>

                          <span className="text-sm font-bold text-emerald-400">
                            {d.score}/100
                          </span>
                        </div>

                        <ProgressBar
                          value={d.score}
                          color={d.color}
                          height={5}
                          showLabel={false}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Learning Recommendations */}
              <div className="mb-8 rounded-3xl border border-white/5 bg-[#0A0F1C]/80 p-7 backdrop-blur-xl">
                <SectionHeader
                  title="Learning Bridge"
                  subtitle="AI-curated micro-learning recommendations"
                />

                <div className="mt-8 space-y-10">
                  {mockLearningRecs.map((rec) => (
                    <div key={rec.id}>
                      {/* Diagnosis */}
                      <div className="mb-5 rounded-2xl border border-red-500/10 bg-red-500/[0.03] p-5">
                        <div className="flex items-start gap-4">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-red-500/10">
                            <AlertCircle
                              size={18}
                              className="text-red-400"
                            />
                          </div>

                          <div>
                            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white">
                              {rec.dimension}
                            </h3>

                            <p className="mt-3 text-sm leading-relaxed text-slate-400">
                              {rec.gap_diagnosis}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Resources */}
                      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        {rec.resources.map((resource) => (
                          <a
                            key={resource.url}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group rounded-2xl border border-white/5 bg-white/[0.03] p-5 transition-all duration-300 hover:border-emerald-500/20 hover:bg-white/[0.05]"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="mb-4 flex items-center gap-2">
                                  <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">
                                    {resource.platform}
                                  </span>
                                </div>

                                <h4 className="text-sm font-bold leading-relaxed text-white transition-colors group-hover:text-emerald-300">
                                  {resource.title}
                                </h4>

                                <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                                  <Clock size={12} />

                                  <span>
                                    {
                                      resource.estimated_hours
                                    }
                                    h estimated
                                  </span>
                                </div>
                              </div>

                              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.03] transition-all duration-300 group-hover:bg-emerald-500/10">
                                <ArrowUpRight
                                  size={16}
                                  className="text-slate-500 transition-colors group-hover:text-emerald-400"
                                />
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mission Feedback */}
              <div className="rounded-3xl border border-white/5 bg-[#0A0F1C]/80 p-7 backdrop-blur-xl">
                <SectionHeader
                  title="Per-Mission Improvement Tips"
                  subtitle="Evidence-based feedback from scored missions"
                />

                <div className="mt-8 space-y-5">
                  {mockMissionAttempts.map((attempt) => (
                    <div
                      key={attempt.id}
                      className="rounded-3xl border border-white/5 bg-white/[0.03] p-6"
                    >
                      <div className="mb-5 flex flex-wrap items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10">
                          <Target
                            size={18}
                            className="text-emerald-400"
                          />
                        </div>

                        <div>
                          <h3 className="text-sm font-bold text-white">
                            {attempt.mission?.title}
                          </h3>

                          <p className="text-xs text-slate-500">
                            Mission analysis result
                          </p>
                        </div>

                        <div className="ml-auto rounded-2xl border border-emerald-500/10 bg-emerald-500/10 px-4 py-2 text-sm font-black text-emerald-400">
                          {attempt.total_score}/100
                        </div>
                      </div>

                      {/* Improvements */}
                      <div className="space-y-3">
                        {attempt.improvements?.map(
                          (imp, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-3"
                            >
                              <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-400" />

                              <p className="text-sm leading-relaxed text-slate-400">
                                {imp}
                              </p>
                            </div>
                          )
                        )}
                      </div>

                      {/* Strengths */}
                      <div className="mt-6 flex flex-wrap gap-2">
                        {attempt.strengths?.map((s, i) => (
                          <span
                            key={i}
                            className="rounded-full border border-emerald-500/10 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400"
                          >
                            ✓ {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}