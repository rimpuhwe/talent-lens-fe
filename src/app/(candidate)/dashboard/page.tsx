"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Award,
  Briefcase,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Target,
  TrendingUp,
  Upload,
} from "lucide-react";

import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

import { Button } from "@/components/ui/button";
import {
  evidenceService,
  profileService,
} from "@/services/profile.service";

import type { CandidateProfile } from "@/types/api.types";

type EvidenceResult = {
  id: number;
  score?: number;
  feedback?: string;
  candidateAnswer?: string;
  evidenceModule?: {
    targetRole?: string;
    moduleType?: string;
    generatedQuestion?: string;
    submitted?: boolean;
  };
};

export default function CandidateDashboard() {
  const [profile, setProfile] = useState<CandidateProfile | null>(null);
  const [status, setStatus] = useState<Record<string, any> | null>(null);
  const [results, setResults] = useState<EvidenceResult[]>([]);
  const [roleScores, setRoleScores] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);

      try {
        const [profileRes, statusRes, resultsRes, scoresRes] =
          await Promise.allSettled([
            profileService.getMe(),
            profileService.getProfileStatus(),
            evidenceService.getMyResults(),
            evidenceService.getRoleScores(),
          ]);

        if (profileRes.status === "fulfilled")
          setProfile(profileRes.value);

        if (statusRes.status === "fulfilled")
          setStatus(statusRes.value);

        if (resultsRes.status === "fulfilled")
          setResults(
            Array.isArray(resultsRes.value)
              ? resultsRes.value
              : []
          );

        if (scoresRes.status === "fulfilled")
          setRoleScores(scoresRes.value ?? {});
      } catch (err: any) {
        setError(
          err?.message ||
            "Unable to load candidate dashboard."
        );
      } finally {
        setLoading(false);
      }
    };

    void loadDashboard();
  }, []);

  const fullName =
    `${profile?.firstName ?? ""} ${
      profile?.lastName ?? ""
    }`.trim() || "Candidate";

  const primaryRole =
    profile?.jobRoles?.[0] || "Talent profile";

  const completedModules = results.filter(
    (result) =>
      result.evidenceModule?.submitted ||
      result.score !== undefined
  );

  const averageScore = completedModules.length
    ? Math.round(
        completedModules.reduce(
          (sum, result) =>
            sum + Number(result.score ?? 0),
          0
        ) / completedModules.length
      )
    : Math.round(profile?.globalAverageTSS ?? 0);

  const radarData = useMemo(() => {
    const firstRoleScore =
      profile?.roleTssScores?.[0];

    if (firstRoleScore) {
      return [
        {
          subject: "Skill",
          score: firstRoleScore.skillScore,
        },
        {
          subject: "Behavior",
          score: firstRoleScore.behaviorScore,
        },
        {
          subject: "Learning",
          score: firstRoleScore.learningScore,
        },
        {
          subject: "Culture",
          score: firstRoleScore.cultureScore,
        },
      ];
    }

    return Object.entries(roleScores)
      .slice(0, 4)
      .map(([subject, score]) => ({
        subject,
        score,
      }));
  }, [profile?.roleTssScores, roleScores]);

  return (
    <>
      {/* Header */}
      <header className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5">
            <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400">
              {profile?.profileCompleted
                ? "Profile complete"
                : "Onboarding required"}
            </span>
          </div>

          <h1 className="text-3xl font-black text-white lg:text-4xl">
            Welcome back, {fullName.split(" ")[0]}
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            {primaryRole} ·{" "}
            {profile?.emailAddress ??
              "No email loaded"}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/onboarding">
            <Button className="h-11 rounded-xl border border-slate-800 bg-[#111827] px-5 text-white hover:bg-slate-800">
              <Upload size={16} className="mr-2" />
              Update profile
            </Button>
          </Link>

          <Link href="/missions">
            <Button className="h-11 rounded-xl bg-[#0F62FE] px-5 text-white hover:bg-[#004BE6]">
              Start mission
              <ArrowRight
                size={16}
                className="ml-2"
              />
            </Button>
          </Link>
        </div>
      </header>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
          {error}
        </div>
      )}

      {/* Metrics */}
      <section className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={TrendingUp}
          label="Talent Signal Score"
          value={loading ? "..." : `${averageScore}%`}
          detail="Average from evaluated evidence"
        />

        <MetricCard
          icon={CheckCircle2}
          label="Completed Modules"
          value={`${completedModules.length}`}
          detail={`${results.length} total submissions`}
        />

        <MetricCard
          icon={Briefcase}
          label="Tracked Roles"
          value={`${profile?.jobRoles?.length ?? 0}/3`}
          detail={
            profile?.jobRoles?.join(", ") ||
            "Add roles in onboarding"
          }
        />

        <MetricCard
          icon={FileText}
          label="Profile Completion"
          value={`${
            status?.completionPercentage ??
            profile?.completionPercentage ??
            0
          }%`}
          detail={
            profile?.cvUrl
              ? "CV uploaded"
              : "CV not uploaded"
          }
        />
      </section>

      {/* Main Grid */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        {/* Radar */}
        <div className="rounded-3xl border border-slate-800 bg-[#0A0F1C]/80 p-7 xl:col-span-5">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">
                Evidence Map
              </h2>

              <p className="text-sm text-slate-400">
                Live role and TSS dimensions.
              </p>
            </div>

            <Activity className="text-[#0F62FE]" />
          </div>

          <div className="h-[280px]">
            {radarData.length ? (
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#1E293B" />

                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{
                      fill: "#94A3B8",
                      fontSize: 11,
                    }}
                  />

                  <Radar
                    dataKey="score"
                    stroke="#0F62FE"
                    fill="#0F62FE"
                    fillOpacity={0.25}
                  />
                </RadarChart>
              </ResponsiveContainer>
            ) : (
              <EmptyState
                title="No score map yet"
                copy="Complete evidence modules to build your talent signal graph."
              />
            )}
          </div>
        </div>

        {/* Evidence */}
        <div className="rounded-3xl border border-slate-800 bg-[#0A0F1C]/80 p-7 xl:col-span-7">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">
                Recent Evidence
              </h2>

              <p className="text-sm text-slate-400">
                Scores and feedback generated by the
                evidence engine.
              </p>
            </div>

            <Award className="text-emerald-400" />
          </div>

          <div className="space-y-4">
            {results.slice(0, 5).map((result) => (
              <div
                key={result.id}
                className="rounded-2xl border border-slate-800 bg-[#111827]/60 p-5"
              >
                <div className="mb-3 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-bold text-white">
                      {result.evidenceModule
                        ?.targetRole ??
                        "Evidence module"}
                    </p>

                    <p className="text-xs uppercase tracking-widest text-slate-500">
                      {result.evidenceModule
                        ?.moduleType ?? "Module"}
                    </p>
                  </div>

                  <span className="rounded-xl bg-emerald-500/10 px-3 py-1 text-sm font-black text-emerald-400">
                    {Math.round(
                      Number(result.score ?? 0)
                    )}
                    /100
                  </span>
                </div>

                <p className="text-sm text-slate-400">
                  {result.feedback ||
                    result.evidenceModule
                      ?.generatedQuestion ||
                    "Feedback pending."}
                </p>
              </div>
            ))}

            {!results.length && (
              <EmptyState
                title="No evidence submitted"
                copy="Use Mission Center to generate and submit your first module."
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: any;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0A0F1C]/80 p-6">
      <div className="mb-5 flex items-center justify-between">
        <div className="rounded-xl bg-[#0F62FE]/10 p-3 text-[#0F62FE]">
          <Icon size={20} />
        </div>

        <Target
          size={16}
          className="text-slate-600"
        />
      </div>

      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-500">
        {label}
      </p>

      <p className="text-3xl font-black text-white">
        {value}
      </p>

      <p className="mt-2 text-sm text-slate-400">
        {detail}
      </p>
    </div>
  );
}

function EmptyState({
  title,
  copy,
}: {
  title: string;
  copy: string;
}) {
  return (
    <div className="flex min-h-[180px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 p-8 text-center">
      <p className="font-bold text-white">
        {title}
      </p>

      <p className="mt-2 max-w-sm text-sm text-slate-500">
        {copy}
      </p>
    </div>
  );
}