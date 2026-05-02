"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown, ChevronUp, Send, Eye, Filter,
  Target, BookOpen, Flame, User, CheckCircle,
  AlertCircle, X, ArrowLeft, Zap
} from "lucide-react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import Sidebar from "@/components/layout/Sidebar";
import { SectionHeader, RecommendationBadge, ScoreRing, ProgressBar, MatchLevelDot } from "@/components/shared";
import { mockRecruiterProfile, mockShortlist, mockJobSignals } from "@/lib/mock-data";
import type { ShortlistEntry } from "@/types";

const dimensionIcons: Record<string, React.ElementType> = {
  "Skill Proof": Target, "Work Behavior": BookOpen,
  "Learning Agility": Flame, "Communication": User,
};
const dimensionColors: Record<string, string> = {
  "Skill Proof": "#10B981", "Work Behavior": "#F59E0B",
  "Learning Agility": "#3B82F6", "Communication": "#A855F7",
};

function getRadarData(entry: ShortlistEntry) {
  const ts = entry.talent_signal;
  if (!ts) return [];
  return [
    { subject: "Skill", A: ts.skill_proof_score },
    { subject: "Judgment", A: ts.work_behavior_score },
    { subject: "Learning", A: ts.learning_agility_score },
    { subject: "Comms", A: ts.culture_fit_score },
  ];
}

export default function ShortlistPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [gapTestModal, setGapTestModal] = useState<ShortlistEntry | null>(null);
  const [sentTests, setSentTests] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<"all" | "strong" | "borderline" | "not_yet">("all");

  const filtered = mockShortlist.filter(e => filter === "all" || e.recommendation === filter);

  const handleSendGapTest = (entryId: string) => {
    setSentTests(prev => new Set([...prev, entryId]));
    setGapTestModal(null);
  };

  const activeSignal = mockJobSignals[0];

  return (
    <div className="flex min-h-screen" style={{ background: "#080D1A" }}>
      <Sidebar role="recruiter" userName={mockRecruiterProfile.full_name} userLocation={mockRecruiterProfile.location} />

      <main className="flex-1 ml-64 p-8 bg-grid">
        {/* Header */}
        <div className="mb-8 animate-fade-up">
          <Link href="/r-dashboard" className="flex items-center gap-2 mb-4 text-sm transition-colors hover:text-white"
            style={{ color: "#4A5C74", fontFamily: "var(--font-dm-sans, sans-serif)" }}>
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>
          <p style={{ color: "#3B82F6", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            AI-Matched Shortlist
          </p>
          <h1 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800, fontSize: "1.75rem", color: "white", letterSpacing: "-0.02em", marginTop: 4 }}>
            {activeSignal.title}
          </h1>
          <p style={{ color: "#4A5C74", fontSize: "0.85rem", fontFamily: "var(--font-dm-sans, sans-serif)", marginTop: 2 }}>
            {activeSignal.role_family} · Matched by Gemini · {mockShortlist.length} candidates surfaced
          </p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          {[
            { label: "Total Matched", value: mockShortlist.length, color: "#94A3B8" },
            { label: "Strong Match", value: mockShortlist.filter(e => e.recommendation === "strong").length, color: "#10B981" },
            { label: "Borderline", value: mockShortlist.filter(e => e.recommendation === "borderline").length, color: "#F59E0B" },
            { label: "Gap Tests Sent", value: sentTests.size + mockShortlist.filter(e => e.gap_test_sent).length, color: "#3B82F6" },
          ].map((s, i) => (
            <div key={s.label} className="card-base p-4 animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
              <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800, fontSize: "1.8rem", color: s.color, letterSpacing: "-0.03em", lineHeight: 1 }}>{s.value}</p>
              <p style={{ color: "#4A5C74", fontSize: "0.72rem", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, marginTop: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 mb-6 animate-fade-up" style={{ animationDelay: "150ms" }}>
          <Filter size={13} color="#4A5C74" />
          {(["all", "strong", "borderline", "not_yet"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{
                padding: "5px 14px", borderRadius: 6, fontSize: "0.72rem",
                fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600,
                border: `1px solid ${filter === f ? "#3B82F6" : "#1E2D45"}`,
                background: filter === f ? "#3B82F615" : "transparent",
                color: filter === f ? "#3B82F6" : "#4A5C74", cursor: "pointer", transition: "all 0.15s",
                textTransform: "capitalize",
              }}>
              {f === "not_yet" ? "Not Yet" : f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Candidate cards */}
        <div className="space-y-3">
          {filtered.map((entry, i) => {
            const isExpanded = expanded === entry.id;
            const isSent = sentTests.has(entry.id) || entry.gap_test_sent;
            const radarData = getRadarData(entry);

            return (
              <div key={entry.id} className="card-base overflow-hidden animate-fade-up"
                style={{ animationDelay: `${200 + i * 60}ms` }}>
                {/* Card header */}
                <div className="p-5 cursor-pointer" onClick={() => setExpanded(isExpanded ? null : entry.id)}>
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "#111827", border: "1px solid #1E2D45" }}>
                      <span style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "#4A5C74", fontSize: "0.78rem" }}>#{i + 1}</span>
                    </div>

                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                      style={{ background: "#3B82F620", color: "#3B82F6", fontFamily: "var(--font-syne, sans-serif)" }}>
                      {entry.candidate?.full_name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </div>

                    {/* Name + meta */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "white", fontSize: "0.95rem" }}>
                          {entry.candidate?.full_name}
                        </p>
                        <RecommendationBadge recommendation={entry.recommendation} />
                        {isSent && (
                          <span style={{ background: "#3B82F615", color: "#3B82F6", border: "1px solid #3B82F630", padding: "1px 8px", borderRadius: 4, fontSize: "0.62rem", fontWeight: 600, fontFamily: "var(--font-syne, sans-serif)" }}>
                            Gap Test {entry.gap_test_completed ? "✓ Done" : "Sent"}
                          </span>
                        )}
                      </div>
                      <p style={{ color: "#4A5C74", fontSize: "0.75rem", fontFamily: "var(--font-dm-sans, sans-serif)", marginTop: 2 }}>
                        {entry.candidate?.role_family} · {entry.candidate?.location}
                      </p>
                    </div>

                    {/* Match score */}
                    <div className="flex items-center gap-6 shrink-0">
                      <div className="text-right">
                        <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800, fontSize: "1.5rem", color: "white", letterSpacing: "-0.03em", lineHeight: 1 }}>
                          {entry.overall_match}<span style={{ color: "#4A5C74", fontSize: "0.8rem", fontWeight: 400 }}>%</span>
                        </p>
                        <p style={{ color: "#4A5C74", fontSize: "0.65rem", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>match</p>
                      </div>
                      <div style={{ color: "#4A5C74" }}>
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded detail */}
                {isExpanded && (
                  <div style={{ borderTop: "1px solid #1E2D45" }}>
                    <div className="p-6 grid grid-cols-12 gap-6">
                      {/* Left: Radar + TSS rings */}
                      <div className="col-span-4">
                        <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "white", fontSize: "0.82rem", marginBottom: 12 }}>
                          Talent Signal Profile
                        </p>
                        <ResponsiveContainer width="100%" height={160}>
                          <RadarChart data={radarData}>
                            <PolarGrid stroke="#1E2D45" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: "#4A5C74", fontSize: 9, fontFamily: "var(--font-syne, sans-serif)" }} />
                            <Radar dataKey="A" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} strokeWidth={2} />
                          </RadarChart>
                        </ResponsiveContainer>
                        <div className="grid grid-cols-2 gap-3 mt-4">
                          {[
                            { label: "Skill Proof", score: entry.talent_signal?.skill_proof_score ?? 0, color: "#10B981" },
                            { label: "Judgment", score: entry.talent_signal?.work_behavior_score ?? 0, color: "#F59E0B" },
                            { label: "Learning", score: entry.talent_signal?.learning_agility_score ?? 0, color: "#3B82F6" },
                            { label: "Comms", score: entry.talent_signal?.culture_fit_score ?? 0, color: "#A855F7" },
                          ].map(d => (
                            <ScoreRing key={d.label} score={d.score} size={60} label={d.label} color={d.color} />
                          ))}
                        </div>
                      </div>

                      {/* Middle: Dimension breakdown */}
                      <div className="col-span-5">
                        <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "white", fontSize: "0.82rem", marginBottom: 12 }}>
                          Dimension Breakdown
                        </p>
                        <div className="space-y-4">
                          {entry.dimension_breakdown.map((dim) => {
                            const Icon = dimensionIcons[dim.dimension] ?? Target;
                            const color = dimensionColors[dim.dimension] ?? "#10B981";
                            return (
                              <div key={dim.dimension} className="p-3 rounded-xl" style={{ background: "#080D1A", border: "1px solid #1E2D45" }}>
                                <div className="flex items-center gap-2 mb-2">
                                  <MatchLevelDot level={dim.match_level} />
                                  <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: `${color}15` }}>
                                    <Icon size={11} color={color} />
                                  </div>
                                  <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, color: "white", fontSize: "0.75rem" }}>{dim.dimension}</p>
                                </div>
                                <p style={{ color: "#94A3B8", fontSize: "0.72rem", fontFamily: "var(--font-dm-sans, sans-serif)", lineHeight: 1.4, marginBottom: 4 }}>
                                  <span style={{ color: "#4A5C74" }}>Need: </span>{dim.job_need}
                                </p>
                                <p style={{ color: "#94A3B8", fontSize: "0.72rem", fontFamily: "var(--font-dm-sans, sans-serif)", lineHeight: 1.4 }}>
                                  <span style={{ color: "#4A5C74" }}>Proof: </span>{dim.candidate_proof}
                                </p>
                                {dim.gap && (
                                  <div className="flex items-start gap-1.5 mt-2">
                                    <AlertCircle size={10} color="#F59E0B" className="mt-0.5 shrink-0" />
                                    <p style={{ color: "#F59E0B", fontSize: "0.68rem", fontFamily: "var(--font-dm-sans, sans-serif)" }}>{dim.gap}</p>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Right: Actions + narrative */}
                      <div className="col-span-3 flex flex-col gap-4">
                        {/* Narrative */}
                        <div className="p-4 rounded-xl flex-1" style={{ background: "#3B82F608", border: "1px solid #3B82F620" }}>
                          <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "#3B82F6", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
                            AI Narrative
                          </p>
                          <p style={{ color: "#94A3B8", fontSize: "0.78rem", fontFamily: "var(--font-dm-sans, sans-serif)", lineHeight: 1.6 }}>
                            {entry.match_narrative}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="space-y-2">
                          <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all hover:bg-blue-500/20"
                            style={{ border: "1px solid #3B82F640", color: "#3B82F6", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600 }}>
                            <Eye size={14} /> View Full Passport
                          </button>
                          {entry.recommendation === "borderline" && !isSent && (
                            <button onClick={() => setGapTestModal(entry)}
                              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm"
                              style={{ background: "#F59E0B", color: "#080D1A", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700 }}>
                              <Zap size={14} /> Send Gap Test
                            </button>
                          )}
                          {isSent && (
                            <div className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm"
                              style={{ background: "#3B82F615", color: "#3B82F6", border: "1px solid #3B82F630", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600 }}>
                              <CheckCircle size={14} /> Test {entry.gap_test_completed ? "Completed" : "Sent"}
                            </div>
                          )}
                          {entry.recommendation === "strong" && (
                            <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm"
                              style={{ background: "#10B981", color: "#080D1A", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700 }}>
                              <Send size={14} /> Move to Hire
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {/* Gap Test Modal */}
      {gapTestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: "rgba(8,13,26,0.9)", backdropFilter: "blur(8px)" }}>
          <div className="w-full max-w-md rounded-2xl animate-fade-up"
            style={{ background: "#0D1427", border: "1px solid #253350", boxShadow: "0 24px 80px rgba(0,0,0,0.6)" }}>
            <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid #1E2D45" }}>
              <h3 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "white" }}>Send Gap Test</h3>
              <button onClick={() => setGapTestModal(null)} style={{ color: "#4A5C74" }}><X size={18} /></button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 p-3 rounded-xl mb-4" style={{ background: "#F59E0B10", border: "1px solid #F59E0B25" }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                  style={{ background: "#F59E0B20", color: "#F59E0B", fontFamily: "var(--font-syne, sans-serif)" }}>
                  {gapTestModal.candidate?.full_name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, color: "white", fontSize: "0.85rem" }}>{gapTestModal.candidate?.full_name}</p>
                  <p style={{ color: "#4A5C74", fontSize: "0.72rem", fontFamily: "var(--font-dm-sans, sans-serif)" }}>{gapTestModal.overall_match}% match · Borderline</p>
                </div>
              </div>
              <p style={{ color: "#94A3B8", fontSize: "0.85rem", fontFamily: "var(--font-dm-sans, sans-serif)", lineHeight: 1.6, marginBottom: 16 }}>
                Gemini will generate a targeted 15-minute mission for the gap dimension below. The candidate receives a link — no login required.
              </p>
              <div className="p-3 rounded-lg mb-6" style={{ background: "#080D1A", border: "1px solid #1E2D45" }}>
                <p style={{ color: "#4A5C74", fontSize: "0.72rem", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Target Dimension</p>
                <p style={{ color: "white", fontSize: "0.85rem", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700 }}>
                  {gapTestModal.dimension_breakdown.find(d => d.match_level === "gap" || d.match_level === "partial")?.dimension ?? "Work Behavior"}
                </p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setGapTestModal(null)}
                  style={{ flex: 1, padding: "10px", borderRadius: 10, border: "1px solid #1E2D45", color: "#4A5C74", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, fontSize: "0.85rem", background: "none", cursor: "pointer" }}>
                  Cancel
                </button>
                <button onClick={() => handleSendGapTest(gapTestModal.id)}
                  style={{ flex: 2, padding: "10px", borderRadius: 10, background: "#F59E0B", color: "#080D1A", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, fontSize: "0.85rem", border: "none", cursor: "pointer" }}>
                  Send Gap Test Link →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}