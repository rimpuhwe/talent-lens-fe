"use client";

import { useMemo } from "react";
import { AlertCircle, Target, TrendingUp } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import { ProgressBar, SectionHeader } from "@/components/shared";
import { useEvidenceResults, useRoleScores } from "@/lib/api/hooks/use-evidence";
import { useProfile } from "@/lib/api/hooks/use-profile";

const THRESHOLDS = {
  skill: 75,
  behavior: 75,
  learning: 75,
  culture: 70,
};

type DimensionRow = {
  key: string;
  label: string;
  color: string;
  score: number;
  threshold: number;
};

export default function GapReportPage() {
  const { data: profile } = useProfile();
  const { data: results = [] } = useEvidenceResults();
  const { data: roleScores = {} } = useRoleScores();

  const fullName =
    `${profile?.firstName ?? ""} ${profile?.lastName ?? ""}`.trim() || "Candidate";

  const primaryTss = profile?.roleTssScores?.[0];

  const dimensionConfig = useMemo<DimensionRow[]>(
    () => [
      {
        key: "skill",
        label: "Skill Proof",
        color: "#10B981",
        score: Math.round(primaryTss?.skillScore ?? 0),
        threshold: THRESHOLDS.skill,
      },
      {
        key: "behavior",
        label: "Work Behavior",
        color: "#F59E0B",
        score: Math.round(primaryTss?.behaviorScore ?? 0),
        threshold: THRESHOLDS.behavior,
      },
      {
        key: "learning",
        label: "Learning Agility",
        color: "#3B82F6",
        score: Math.round(primaryTss?.learningScore ?? 0),
        threshold: THRESHOLDS.learning,
      },
      {
        key: "culture",
        label: "Communication",
        color: "#A855F7",
        score: Math.round(primaryTss?.cultureScore ?? 0),
        threshold: THRESHOLDS.culture,
      },
    ],
    [primaryTss]
  );

  const weakDimensions = dimensionConfig.filter((d) => d.score < d.threshold);
  const strongDimensions = dimensionConfig.filter((d) => d.score >= d.threshold);

  const learningInsights = useMemo(
    () =>
      results
        .filter((result) => result.feedback)
        .slice(0, 5)
        .map((result) => ({
          id: String(result.id),
          title:
            result.evidenceModule?.targetRole ??
            result.evidenceModule?.moduleType ??
            "Evidence module",
          feedback: result.feedback ?? "",
          score: Math.round(result.score ?? 0),
        })),
    [results]
  );

  const roleProgression = Object.entries(roleScores).map(([role, score]) => ({
    role,
    score: Math.round(score),
  }));

  return (
    <div className="min-h-screen bg-[#050A15] text-slate-300">
      <Sidebar
        role="candidate"
        userName={fullName}
        userLocation={profile?.workConditions ?? profile?.jobRoles?.[0] ?? "OPEN"}
      />

      <main className="min-h-screen lg:ml-64">
        <GapReportMain
          weakDimensions={weakDimensions}
          strongDimensions={strongDimensions}
          learningInsights={learningInsights}
          roleProgression={roleProgression}
        />
      </main>
    </div>
  );
}

function GapReportMain({
  weakDimensions,
  strongDimensions,
  learningInsights,
  roleProgression,
}: {
  weakDimensions: DimensionRow[];
  strongDimensions: DimensionRow[];
  learningInsights: { id: string; title: string; feedback: string; score: number }[];
  roleProgression: { role: string; score: number }[];
}) {
  return (
    <div className="relative z-10 px-4 py-6 sm:px-6 lg:px-8 lg:py-8 xl:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.25em] text-emerald-400">
            System 3 · Learning Loop
          </p>
          <h1 className="text-4xl font-black tracking-tight text-white lg:text-5xl">
            Skill Gap Report
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 lg:text-base">
            Live gap analysis from your Talent Signal scores and submitted evidence feedback.
          </p>
        </header>

        <section className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
          <DimensionPanel
            title="Gaps to Close"
            subtitle="Areas below target threshold"
            icon={AlertCircle}
            tone="weak"
            dimensions={weakDimensions}
          />
          <DimensionPanel
            title="Core Strengths"
            subtitle="Dimensions exceeding expectations"
            icon={TrendingUp}
            tone="strong"
            dimensions={strongDimensions}
          />
        </section>

        <section className="mb-8 rounded-3xl border border-white/5 bg-[#0A0F1C]/80 p-7 backdrop-blur-xl">
          <SectionHeader
            title="Evidence Feedback"
            subtitle="Improvement signals from evaluated missions"
          />
          <FeedbackList items={learningInsights} />
        </section>

        <section className="rounded-3xl border border-white/5 bg-[#0A0F1C]/80 p-7 backdrop-blur-xl">
          <SectionHeader title="Role Score Progression" subtitle="Scores grouped by target role" />
          <RoleProgressionList items={roleProgression} />
        </section>
      </div>
    </div>
  );
}

function DimensionPanel({
  title,
  subtitle,
  icon: Icon,
  tone,
  dimensions,
}: {
  title: string;
  subtitle: string;
  icon: typeof AlertCircle;
  tone: "weak" | "strong";
  dimensions: DimensionRow[];
}) {
  const border = tone === "weak" ? "border-red-500/10" : "border-emerald-500/10";
  const iconWrap =
    tone === "weak" ? "bg-red-500/10 text-red-400" : "bg-emerald-500/10 text-emerald-400";

  return (
    <div className={`rounded-3xl border bg-[#0A0F1C]/80 p-6 backdrop-blur-xl ${border}`}>
      <GapReportDimensionPanelHeader
        title={title}
        subtitle={subtitle}
        Icon={Icon}
        iconWrap={iconWrap}
      />
      <div className="space-y-5">
        {dimensions.map((dimension) => (
          <DimensionRowItem key={dimension.key} dimension={dimension} />
        ))}
      </div>
    </div>
  );
}

function GapReportDimensionPanelHeader({
  title,
  subtitle,
  Icon,
  iconWrap,
}: {
  title: string;
  subtitle: string;
  Icon: typeof AlertCircle;
  iconWrap: string;
}) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${iconWrap}`}>
        <Icon size={20} />
      </div>
      <div>
        <h2 className="text-lg font-bold text-white">{title}</h2>
        <p className="text-sm text-slate-400">{subtitle}</p>
      </div>
    </div>
  );
}

function DimensionRowItem({ dimension }: { dimension: DimensionRow }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-300">{dimension.label}</span>
        <span className="text-sm font-bold text-white">
          {dimension.score > 0 ? dimension.score : "—"}
          <span className="ml-1 text-slate-500">/ {dimension.threshold}</span>
        </span>
      </div>
      <ProgressBar value={dimension.score} color={dimension.color} height={5} showLabel={false} />
    </div>
  );
}

function FeedbackList({
  items,
}: {
  items: { id: string; title: string; feedback: string; score: number }[];
}) {
  return (
    <div className="mt-8 space-y-4">
      {items.length ? (
        items.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl border border-white/5 bg-white/[0.03] p-5"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <GapReportTargetIcon />
                <h3 className="text-sm font-bold text-white">{item.title}</h3>
              </div>
              <span className="rounded-xl border border-emerald-500/10 bg-emerald-500/10 px-3 py-1 text-xs font-black text-emerald-400">
                {item.score}/100
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">{item.feedback}</p>
          </article>
        ))
      ) : (
        <p className="text-sm text-slate-500">No evaluated evidence yet. Complete a mission first.</p>
      )}
    </div>
  );
}

function GapReportTargetIcon() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
      <Target size={18} className="text-emerald-400" />
    </div>
  );
}

function RoleProgressionList({ items }: { items: { role: string; score: number }[] }) {
  return (
    <div className="mt-6 space-y-4">
      {items.length ? (
        items.map((item) => (
          <GapReportRoleRow key={item.role} role={item.role} score={item.score} />
        ))
      ) : (
        <p className="text-sm text-slate-500">Complete missions to populate role progression.</p>
      )}
    </div>
  );
}

function GapReportRoleRow({ role, score }: { role: string; score: number }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3">
      <span className="text-sm font-semibold text-white">{role}</span>
      <span className="text-sm font-bold text-emerald-400">{score}%</span>
    </div>
  );
}
