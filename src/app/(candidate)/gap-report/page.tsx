"use client";

import { ExternalLink, BookOpen, TrendingUp, Clock, AlertCircle, Target } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import { ProgressBar, SectionHeader } from "@/components/shared";
import { mockCandidateProfile, mockTalentSignal, mockLearningRecs, mockMissionAttempts } from "@/lib/mock-data";

const dimensionConfig = [
  { key: "skill_proof_score", label: "Skill Proof", color: "#10B981", score: 74, threshold: 80 },
  { key: "work_behavior_score", label: "Work Behavior", color: "#F59E0B", score: 68, threshold: 75 },
  { key: "learning_agility_score", label: "Learning Agility", color: "#3B82F6", score: 82, threshold: 75 },
  { key: "culture_fit_score", label: "Communication", color: "#A855F7", score: 0, threshold: 70 },
];

export default function GapReportPage() {
  const profile = mockCandidateProfile;
  const signal = mockTalentSignal;
  const weakDimensions = dimensionConfig.filter(d => d.score < d.threshold);
  const strongDimensions = dimensionConfig.filter(d => d.score >= d.threshold);

  return (
    <div className="flex min-h-screen" style={{ background: "#080D1A" }}>
      <Sidebar role="candidate" userName={profile.full_name} userLocation={profile.location} />
      <main className="flex-1 ml-64 p-8 bg-grid">
        {/* Header */}
        <div className="mb-8 animate-fade-up">
          <p style={{ color: "#10B981", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            System 3 · Learning Loop
          </p>
          <h1 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800, fontSize: "1.75rem", color: "white", letterSpacing: "-0.02em", marginTop: 4 }}>
            Skill Gap Report
          </h1>
          <p style={{ color: "#4A5C74", fontSize: "0.85rem", fontFamily: "var(--font-dm-sans, sans-serif)", marginTop: 2 }}>
            Precise gaps. Specific resources. Learn → Prove → Rise.
          </p>
        </div>

        {/* Gap overview cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="card-base p-5 animate-fade-up" style={{ borderColor: "#F43F5E30" }}>
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle size={15} color="#F43F5E" />
              <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "white", fontSize: "0.85rem" }}>Gaps to Close</p>
            </div>
            <div className="space-y-3">
              {weakDimensions.map(d => (
                <div key={d.key}>
                  <div className="flex justify-between mb-1.5">
                    <span style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, color: "#94A3B8", fontSize: "0.78rem" }}>{d.label}</span>
                    <span style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "white", fontSize: "0.78rem" }}>
                      {d.score > 0 ? `${d.score}` : "—"} <span style={{ color: "#4A5C74" }}>/ target {d.threshold}</span>
                    </span>
                  </div>
                  <ProgressBar value={d.score} color={d.score === 0 ? "#F43F5E" : "#F59E0B"} height={4} showLabel={false} />
                </div>
              ))}
            </div>
          </div>

          <div className="card-base p-5 animate-fade-up" style={{ animationDelay: "100ms", borderColor: "#10B98130" }}>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={15} color="#10B981" />
              <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "white", fontSize: "0.85rem" }}>Strengths</p>
            </div>
            <div className="space-y-3">
              {strongDimensions.map(d => (
                <div key={d.key}>
                  <div className="flex justify-between mb-1.5">
                    <span style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, color: "#94A3B8", fontSize: "0.78rem" }}>{d.label}</span>
                    <span style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "#10B981", fontSize: "0.78rem" }}>{d.score}/100</span>
                  </div>
                  <ProgressBar value={d.score} color={d.color} height={4} showLabel={false} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Learning recommendations */}
        <div className="card-base p-6 mb-6 animate-fade-up" style={{ animationDelay: "150ms" }}>
          <SectionHeader
            title="Learning Bridge"
            subtitle="Specific micro-skills and resources identified by AI — not generic advice"
          />
          <div className="space-y-8">
            {mockLearningRecs.map((rec) => (
              <div key={rec.id}>
                {/* Gap diagnosis */}
                <div className="flex items-start gap-3 p-4 rounded-xl mb-4" style={{ background: "#F43F5E08", border: "1px solid #F43F5E20" }}>
                  <AlertCircle size={15} color="#F43F5E" className="mt-0.5 shrink-0" />
                  <div>
                    <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "white", fontSize: "0.82rem", marginBottom: 4 }}>
                      {rec.dimension} — Gap Identified
                    </p>
                    <p style={{ color: "#94A3B8", fontSize: "0.8rem", fontFamily: "var(--font-dm-sans, sans-serif)", lineHeight: 1.6 }}>
                      {rec.gap_diagnosis}
                    </p>
                  </div>
                </div>
                {/* Resources */}
                <div className="grid grid-cols-2 gap-3">
                  {rec.resources.map((resource) => (
                    <a key={resource.url} href={resource.url} target="_blank" rel="noopener noreferrer"
                      className="block p-4 rounded-xl transition-all group hover:border-emerald-500/30"
                      style={{ border: "1px solid #1E2D45", background: "#111827", textDecoration: "none" }}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span style={{ background: "#10B98115", color: "#10B981", border: "1px solid #10B98130", padding: "1px 6px", borderRadius: 3, fontSize: "0.6rem", fontWeight: 600, fontFamily: "var(--font-syne, sans-serif)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                              {resource.platform}
                            </span>
                          </div>
                          <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, color: "white", fontSize: "0.82rem", marginBottom: 6 }}>
                            {resource.title}
                          </p>
                          <div className="flex items-center gap-1" style={{ color: "#4A5C74", fontSize: "0.72rem" }}>
                            <Clock size={10} /> {resource.estimated_hours}h estimated
                          </div>
                        </div>
                        <ExternalLink size={13} color="#4A5C74" className="group-hover:text-emerald-400 transition-colors shrink-0 mt-1" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission feedback detail */}
        <div className="card-base p-6 animate-fade-up" style={{ animationDelay: "250ms" }}>
          <SectionHeader title="Per-Mission Improvement Tips" subtitle="Specific feedback from your scored submissions" />
          <div className="space-y-4">
            {mockMissionAttempts.map((attempt) => (
              <div key={attempt.id} className="p-5 rounded-xl" style={{ border: "1px solid #1E2D45" }}>
                <div className="flex items-center gap-3 mb-4">
                  <Target size={14} color="#10B981" />
                  <h3 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "white", fontSize: "0.85rem" }}>
                    {attempt.mission?.title}
                  </h3>
                  <span style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, fontSize: "0.85rem", color: "#10B981", marginLeft: "auto" }}>
                    {attempt.total_score}/100
                  </span>
                </div>
                <div className="space-y-2">
                  {attempt.improvements?.map((imp, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: "#F59E0B" }} />
                      <p style={{ color: "#94A3B8", fontSize: "0.8rem", fontFamily: "var(--font-dm-sans, sans-serif)", lineHeight: 1.5 }}>{imp}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2 flex-wrap">
                  {attempt.strengths?.map((s, i) => (
                    <span key={i} style={{ background: "#10B98110", color: "#10B981", border: "1px solid #10B98125", padding: "2px 8px", borderRadius: 4, fontSize: "0.68rem", fontWeight: 600, fontFamily: "var(--font-syne, sans-serif)" }}>
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}