"use client";

import { Share2, Download, CheckCircle, Target, BookOpen, Flame, User, ExternalLink } from "lucide-react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import Sidebar from "@/components/layout/Sidebar";
import { ScoreRing, ProgressBar, SectionHeader, ModuleBadge, MatchLevelDot } from "@/components/shared";
import { mockCandidateProfile, mockTalentSignal, mockMissionAttempts } from "@/lib/mock-data";

const radarData = [
  { subject: "Skill Proof", A: 74 },
  { subject: "Judgment", A: 68 },
  { subject: "Learning", A: 82 },
  { subject: "Communication", A: 71 },
];

const dimensions = [
  { key: "skill_proof_score", label: "Skill Proof", desc: "Demonstrated competence through real-world missions", icon: Target, color: "#10B981", score: 74 },
  { key: "work_behavior_score", label: "Work Behavior", desc: "Judgment, ethics, and professional decision-making", icon: BookOpen, color: "#F59E0B", score: 68 },
  { key: "learning_agility_score", label: "Learning Agility", desc: "Speed and accuracy of learning under pressure", icon: Flame, color: "#3B82F6", score: 82 },
  { key: "culture_fit_score", label: "Communication", desc: "Clarity, structure, and professionalism of expression", icon: User, color: "#A855F7", score: 71 },
];

export default function PassportPage() {
  const profile = mockCandidateProfile;
  const signal = mockTalentSignal;

  return (
    <div className="flex min-h-screen" style={{ background: "#F0F3FA" }}>
      <Sidebar role="candidate" userName={profile.full_name} userLocation={profile.location} />

      <main className="flex-1 ml-64 p-8 bg-grid">
        {/* Header */}
        <div className="flex items-start justify-between mb-8 animate-fade-up">
          <div>
            <p style={{ color: "#10B981", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Your Talent Passport
            </p>
            <h1 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: "bold", fontSize: "1.75rem", color: "#091F5C", letterSpacing: "-0.02em", marginTop: 4 }}>
              Verified Capability Record
            </h1>
            <p style={{ color: "#4A5C74", fontSize: "0.85rem", fontFamily: "var(--font-dm-sans, sans-serif)", marginTop: 2 }}>
              Earn it once. Carry it everywhere.
            </p>
          </div>
          <div className="flex items-center gap-3">
          </div>
        </div>

        {/* Passport card */}
        <div className="card-base p-0 overflow-hidden mb-8 animate-fade-up" style={{ animationDelay: "100ms", background: "#F1F5F9" }}>
          {/* Passport header */}
          <div className="px-8 py-6 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #21c18c20 0%, #5b6c93 60%)", borderBottom: "1px solid #1E2D45" }}>
            
            <div className="flex items-center gap-8 relative z-10">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold shrink-0"
                style={{ background: "#10B98125", border: "2px solid #0c775340", fontFamily: "var(--font-syne, sans-serif)", color: "#0a563c" }}>
                {profile.full_name.split(" ").map(n => n[0]).join("")}
              </div>
              {/* Identity */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h2 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: "bold", fontSize: "1.4rem", color: "#091F5C", letterSpacing: "-0.02em" }}>
                    {profile.full_name}
                  </h2>
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ background: "#10B98115", border: "1px solid #10B98130" }}>
                    <CheckCircle size={11} color="#10B981" />
                    <span style={{ color: "#075c3e", fontSize: "0.65rem", fontWeight: 900, fontFamily: "var(--font-syne, sans-serif)", letterSpacing: "0.06em" }}>VERIFIED</span>
                  </div>
                </div>
                <p style={{ color: "#121213", fontSize: "0.9rem", fontFamily: "var(--font-dm-sans, sans-serif)" }}>
                  {profile.role_family} · {profile.location}
                </p>
                <p style={{ color: "#212224", fontSize: "0.78rem", fontFamily: "var(--font-dm-sans, sans-serif)", marginTop: 4 }}>
                  Passport since {new Date(profile.created_at).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
                  · Last updated {new Date(signal.updated_at).toLocaleDateString("en-GB", { month: "short", day: "numeric", year: "numeric" })}
                </p>
              </div>
              {/* TSS score */}
              <div className="text-right shrink-0">
                <ScoreRing score={signal.overall_tss} size={90} label="Overall TSS" color="#10B981" />
              </div>
            </div>
          </div>

          {/* Dimensions */}
          <div className="p-8">
            <div className="grid grid-cols-12 gap-8">
              {/* Radar */}
              <div className="col-span-4">
                <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: "bold", color: "#091F5C", fontSize: "0.85rem", marginBottom: 16 }}>
                  Signal Profile
                </p>
                <ResponsiveContainer width="100%" height={180}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#1E2D45" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: "#4A5C74", fontSize: 9, fontFamily: "var(--font-syne, sans-serif)" }} />
                    <Radar dataKey="A" stroke="#10B981" fill="#10B981" fillOpacity={0.12} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              {/* Dimension bars */}
              <div className="col-span-8 space-y-5">
                <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: "bold", color: "#091F5C", fontSize: "0.85rem", marginBottom: 16 }}>
                  Evidence Dimensions
                </p>
                {dimensions.map((dim) => {
                  const Icon = dim.icon;
                  return (
                    <div key={dim.key}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${dim.color}15`, border: `1px solid ${dim.color}30` }}>
                            <Icon size={13} color={dim.color} strokeWidth={1.5} />
                          </div>
                          <div>
                            <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: "bold", color: "#091F5C", fontSize: "0.82rem" }}>{dim.label}</p>
                            <p style={{ color: "#4A5C74", fontSize: "0.7rem", fontFamily: "var(--font-dm-sans, sans-serif)" }}>{dim.desc}</p>
                          </div>
                        </div>
                        <span style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: "bold", fontSize: "0.9rem", color: dim.score > 0 ? "#091F5C" : "#4A5C74" }}>
                          {dim.score > 0 ? `${dim.score}/100` : "—"}
                        </span>
                      </div>
                      <ProgressBar value={dim.score} color={dim.color} height={5} showLabel={false} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Evidence log */}
        <div className="card-base p-6 animate-fade-up" style={{ animationDelay: "200ms", background: "#d8e7f8" }}>
          <SectionHeader title="Evidence Log" subtitle="Every score backed by real work" />
          <div className="space-y-4">
            {mockMissionAttempts.map((attempt) => (
              <div key={attempt.id} className="p-5 rounded-xl" style={{ border: "1px solid #1E2D45" }}>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: "bold", color: "#091F5C", fontSize: "0.9rem" }}>
                        {attempt.mission?.title}
                      </h3>
                      <ModuleBadge type={attempt.mission?.module_type ?? "skill_proof"} />
                    </div>
                    <p style={{ color: "#4A5C74", fontSize: "0.78rem", fontFamily: "var(--font-dm-sans, sans-serif)" }}>
                      Submitted {new Date(attempt.submitted_at ?? "").toLocaleDateString("en-GB", { month: "short", day: "numeric", year: "numeric" })}
                      · Scored in &lt;60s by Gemini AI
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: "bold", fontSize: "1.5rem", color: "#091F5C", letterSpacing: "-0.03em" }}>
                      {attempt.total_score}
                      <span style={{ color: "#4A5C74", fontSize: "0.8rem", fontWeight: 400 }}>/100</span>
                    </p>
                  </div>
                </div>
                {/* Dimension scores */}
                <div className="grid grid-cols-4 gap-3">
                  {attempt.dimension_scores?.map((ds) => (
                    <div key={ds.dimension} className="p-3 rounded-lg" style={{ background: "#dee4f3", border: "1px solid #1E2D45" }}>
                      <div className="flex items-center justify-between mb-1">
                        <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, fontSize: "0.68rem", color: "#060606" }}>
                          {ds.dimension}
                        </p>
                        <span style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: "bold", fontSize: "0.82rem", color: "#042577" }}>
                          {ds.score}/{ds.max_score}
                        </span>
                      </div>
                      <ProgressBar value={ds.score} max={ds.max_score} height={3} showLabel={false} />
                      <p style={{ color: "#0c0c0c", fontWeight: "bold", fontSize: "0.68rem", fontFamily: "var(--font-dm-sans, sans-serif)", marginTop: 6, lineHeight: 1.4 }}>
                        {ds.evidence.slice(0, 60)}...
                      </p>
                    </div>
                  ))}
                </div>
                {/* Overall summary */}
                <div className="mt-3 p-3 rounded-lg" style={{ background: "#10B98108", border: "1px solid #10B98120" }}>
                  <div className="flex items-start gap-2">
                    <CheckCircle size={13} color="#10B981" className="mt-0.5 shrink-0" />
                    <p style={{ color: "#3d3f40", fontSize: "0.78rem", fontFamily: "var(--font-dm-sans, sans-serif)", lineHeight: 1.5 }}>
                      <span style={{ color: "#10B981", fontWeight: 600 }}>AI Assessment: </span>
                      {attempt.overall_summary}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}