"use client";

import { Target, BookOpen, User, ArrowRight, Clock, Star, Flame, CheckCircle } from "lucide-react";
import Link from "next/link";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import Sidebar from "@/components/layout/Sidebar";
import { StatCard, ScoreRing, ModuleBadge, ProgressBar, SectionHeader } from "@/components/shared";
import { mockCandidateProfile, mockTalentSignal, mockMissions, mockMissionAttempts } from "@/lib/mock-data";

const radarData = [
  { subject: "Skill Proof", A: 74 },
  { subject: "Judgment", A: 68 },
  { subject: "Learning", A: 82 },
  { subject: "Communication", A: 71 },
];

const modules = [
  { type: "skill_proof" as const, label: "Skill Proof", score: 74, icon: Target, color: "#10B981", status: "completed" },
  { type: "scenario_judgment" as const, label: "Scenario Judgment", score: 68, icon: BookOpen, color: "#F59E0B", status: "completed" },
  { type: "learning_agility" as const, label: "Learning Agility", score: 82, icon: Flame, color: "#3B82F6", status: "completed" },
  { type: "communication_proof" as const, label: "Communication", score: 0, icon: User, color: "#A855F7", status: "pending" },
];

export default function CandidateDashboard() {
  const signal = mockTalentSignal;
  const profile = mockCandidateProfile;

  return (
    <div className="flex min-h-screen" style={{ background: "#080D1A" }}>
      <Sidebar role="candidate" userName={profile.full_name} userLocation={profile.location} />

      <main className="flex-1 ml-64 p-8 bg-grid">
        {/* Header */}
        <div className="mb-8 animate-fade-up">
          <p style={{ color: "#10B981", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Welcome back
          </p>
          <h1 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800, fontSize: "1.75rem", color: "white", letterSpacing: "-0.02em", marginTop: 4 }}>
            {profile.full_name}
          </h1>
          <p style={{ color: "#4A5C74", fontSize: "0.85rem", fontFamily: "var(--font-dm-sans, sans-serif)", marginTop: 2 }}>
            {profile.role_family} · {profile.location}
          </p>
        </div>

        {/* TSS Overview */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <StatCard label="Overall TSS" value={signal.overall_tss} delta="+8 pts this week" deltaType="up" icon={Star} delay={0} />
          <StatCard label="Modules Done" value={`${signal.completed_modules.length}/4`} delta="1 remaining" deltaType="neutral" icon={CheckCircle} accent="#3B82F6" delay={100} />
          <StatCard label="Skill Proof" value={signal.skill_proof_score} delta="Top 32%" deltaType="up" icon={Target} accent="#10B981" delay={200} />
          <StatCard label="Learning Speed" value={signal.learning_agility_score} delta="Highest score" deltaType="up" icon={Flame} accent="#F59E0B" delay={300} />
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-12 gap-6 mb-8">

          {/* Radar chart */}
          <div className="col-span-4 card-base p-6 animate-fade-up" style={{ animationDelay: "200ms" }}>
            <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "white", marginBottom: 4, fontSize: "0.95rem" }}>
              Talent Signal Profile
            </p>
            <p style={{ color: "#4A5C74", fontSize: "0.78rem", fontFamily: "var(--font-dm-sans, sans-serif)", marginBottom: 16 }}>
              Your 4-dimension evidence map
            </p>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#1E2D45" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#4A5C74", fontSize: 10, fontFamily: "var(--font-syne, sans-serif)" }} />
                <Radar name="TSS" dataKey="A" stroke="#10B981" fill="#10B981" fillOpacity={0.12} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>

            <div className="flex justify-center mt-4">
              <ScoreRing score={signal.overall_tss} size={72} label="Overall TSS" />
            </div>
          </div>

          {/* Module progress */}
          <div className="col-span-8 card-base p-6 animate-fade-up" style={{ animationDelay: "250ms" }}>
            <SectionHeader title="Evidence Modules" subtitle="Complete all 4 to maximise your TSS" action={
              <Link href="/missions" className="btn-primary text-xs px-4 py-2 rounded-lg flex items-center gap-1.5">
                Start Mission <ArrowRight size={12} />
              </Link>
            } />
            <div className="space-y-5">
              {modules.map((mod) => {
                const Icon = mod.icon;
                return (
                  <div key={mod.type}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${mod.color}15`, border: `1px solid ${mod.color}30` }}>
                          <Icon size={14} color={mod.color} strokeWidth={1.5} />
                        </div>
                        <div>
                          <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, color: "white", fontSize: "0.85rem" }}>{mod.label}</p>
                          <ModuleBadge type={mod.type} />
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {mod.status === "pending" ? (
                          <span style={{ color: "#4A5C74", fontSize: "0.75rem", fontFamily: "var(--font-dm-sans, sans-serif)" }}>Not started</span>
                        ) : (
                          <span style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, fontSize: "0.9rem", color: mod.color }}>
                            {mod.score}/100
                          </span>
                        )}
                      </div>
                    </div>
                    <ProgressBar value={mod.score} color={mod.color} height={5} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent attempts + available missions */}
        <div className="grid grid-cols-12 gap-6">

          {/* Recent attempts */}
          <div className="col-span-7 card-base p-6 animate-fade-up" style={{ animationDelay: "300ms" }}>
            <SectionHeader title="Recent Attempts" subtitle="Your last scored missions" />
            <div className="space-y-3">
              {mockMissionAttempts.map((attempt) => (
                <div key={attempt.id} className="flex items-center gap-4 p-4 rounded-xl transition-colors hover:bg-white/5 cursor-pointer"
                  style={{ border: "1px solid #1E2D45" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "#10B98115", border: "1px solid #10B98130" }}>
                    <Target size={16} color="#10B981" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, color: "white", fontSize: "0.85rem" }}>
                      {attempt.mission?.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <ModuleBadge type={attempt.mission?.module_type ?? "skill_proof"} />
                      <span style={{ color: "#4A5C74", fontSize: "0.72rem", fontFamily: "var(--font-dm-sans, sans-serif)" }}>
                        Attempt #{attempt.attempt_number}
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, fontSize: "1.1rem", color: "white" }}>
                      {attempt.total_score}<span style={{ color: "#4A5C74", fontSize: "0.7rem" }}>/100</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Available missions */}
          <div className="col-span-5 card-base p-6 animate-fade-up" style={{ animationDelay: "350ms" }}>
            <SectionHeader title="Available Missions" subtitle="Next steps to grow your TSS" />
            <div className="space-y-3">
              {mockMissions.map((mission) => (
                <Link key={mission.id} href="/missions"
                  className="block p-4 rounded-xl transition-all hover:border-emerald-500/30 group"
                  style={{ border: "1px solid #1E2D45" }}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, color: "white", fontSize: "0.82rem" }}>
                        {mission.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <ModuleBadge type={mission.module_type} />
                        <span className="flex items-center gap-1" style={{ color: "#4A5C74", fontSize: "0.7rem" }}>
                          <Clock size={10} /> {mission.time_limit_min}m
                        </span>
                      </div>
                    </div>
                    <ArrowRight size={14} color="#4A5C74" className="group-hover:text-emerald-400 mt-0.5 transition-colors shrink-0" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}