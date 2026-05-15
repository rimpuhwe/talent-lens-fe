"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ChevronDown, ChevronUp, Send, Eye, Filter,
  Target, BookOpen, Flame, User, CheckCircle,
  AlertCircle, X, ArrowLeft, Zap, MessageSquare, BarChart2, ShieldCheck, TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import Sidebar from "@/components/layout/Sidebar";
import { SectionHeader, RecommendationBadge, ScoreRing, ProgressBar, MatchLevelDot } from "@/components/shared";
import { useAdminCandidates } from "@/lib/api/hooks/use-admin";
import { useJobs } from "@/lib/api/hooks/use-jobs";
import { useMatchCandidateToJob } from "@/lib/api/hooks/use-ai";
import {
  buildMatchPayload,
  mapCandidateMatchToShortlistEntry,
} from "@/lib/api/mappers/shortlist";
import type { ShortlistEntry } from "@/types";

const dimensionIcons: Record<string, LucideIcon> = {
  "Skill Proof": Target, "Work Behavior": BookOpen,
  "Learning Agility": Flame, "Communication": User,
};

const dimensionColors: Record<string, string> = {
  "Skill Proof": "#10B981", "Work Behavior": "#F59E0B",
  "Learning Agility": "#628ECB", "Communication": "#A855F7",
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
  const [shortlist, setShortlist] = useState<ShortlistEntry[]>([]);
  const [matching, setMatching] = useState(false);
  const [matchError, setMatchError] = useState("");

  const { data: jobs = [] } = useJobs();
  const { data: candidates = [], isLoading: loadingCandidates, error: candidatesError } =
    useAdminCandidates();
  const matchMutation = useMatchCandidateToJob();

  const activeSignal = jobs[0];

  useEffect(() => {
    if (!activeSignal?.id || !candidates.length) {
      setShortlist([]);
      return;
    }

    let cancelled = false;

    const runMatching = async () => {
      setMatching(true);
      setMatchError("");

      try {
        const entries = await Promise.all(
          candidates.slice(0, 12).map(async (candidate) => {
            if (!candidate.id || !candidate.roleTssScores?.length) return null;
            const match = await matchMutation.mutateAsync(
              buildMatchPayload(candidate, activeSignal)
            );
            return mapCandidateMatchToShortlistEntry(candidate, match, activeSignal);
          })
        );

        if (!cancelled) {
          setShortlist(
            entries
              .filter((entry): entry is ShortlistEntry => Boolean(entry))
              .sort((a, b) => b.overall_match - a.overall_match)
          );
        }
      } catch (error: unknown) {
        if (!cancelled) {
          setMatchError(
            error instanceof Error ? error.message : "Unable to generate AI shortlist."
          );
          setShortlist([]);
        }
      } finally {
        if (!cancelled) setMatching(false);
      }
    };

    void runMatching();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSignal?.id, candidates.length]);

  const filtered = useMemo(
    () => shortlist.filter((entry) => filter === "all" || entry.recommendation === filter),
    [shortlist, filter]
  );

  const handleSendGapTest = (entryId: string) => {
    setSentTests((prev) => new Set([...prev, entryId]));
    setGapTestModal(null);
  };

  const recruiterName = activeSignal?.recruiter?.companyName ?? "Recruiter";

  return (
    <div className="flex min-h-screen" style={{ background: "#F0F3FA" }}>
      {/* Assuming Sidebar handles its own mobile hidden state (e.g. hidden lg:flex) */}
      <Sidebar role="recruiter" userName={recruiterName} userLocation={activeSignal?.workType ?? "Recruiter"} />

      {/* Main content area adjusts margin on mobile */}
      <main className="flex-1 ml-0 lg:ml-64 p-4 sm:p-6 md:p-8 bg-grid relative overflow-x-hidden w-full">
        
        {/* Header - Stacks on mobile */}
        <div className="mb-6 md:mb-8 animate-fade-up">
          <Link href="/r-dashboard" className="flex items-center gap-2 mb-4 text-sm transition-colors hover:text-[#395886]"
            style={{ color: "#628ECB", fontFamily: "var(--font-dm-sans, sans-serif)" }}>
            <ArrowLeft size={14} /> Back to Dashboard 
          </Link>
          <p className="flex items-center gap-1.5" style={{ color: "#628ECB", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            <ShieldCheck size={14} /> AI-Matched Shortlist
          </p>
          <h1 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800, fontSize: "1.5rem", color: "#395886", letterSpacing: "-0.02em", marginTop: 4 }} className="md:text-[1.75rem]">
            {activeSignal?.jobPosition ?? "Select a job signal"}
          </h1>
          <p style={{ color: "#628ECB", fontSize: "0.85rem", fontFamily: "var(--font-dm-sans, sans-serif)", marginTop: 2 }}>
            {activeSignal?.workType ?? "Role"} · Matched by AI · {shortlist.length} candidates surfaced
            {matching ? " · matching..." : ""}
          </p>
          {(matchError || candidatesError) && (
            <p className="mt-3 text-sm text-amber-700">
              {matchError ||
                (candidatesError instanceof Error
                  ? candidatesError.message
                  : "Unable to load candidate pool for matching.")}
            </p>
          )}
          {!activeSignal && !loadingCandidates && (
            <p className="mt-3 text-sm text-[#628ECB]">Publish a job signal to generate a shortlist.</p>
          )}
        </div>

        {/* Stats bar - Responsive Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6 md:mb-8">
          {[
            { label: "Total Matched", value: shortlist.length, color: "#628ECB" },
            { label: "Strong Match", value: shortlist.filter((e) => e.recommendation === "strong").length, color: "#10B981" },
            { label: "Borderline", value: shortlist.filter((e) => e.recommendation === "borderline").length, color: "#F59E0B" },
            { label: "Gap Tests Sent", value: sentTests.size + shortlist.filter((e) => e.gap_test_sent).length, color: "#395886" },
          ].map((s, i) => (
            <div key={s.label} className="card-base p-4 bg-[#FFFFFF] border border-[#D5DEEF] shadow-sm rounded-2xl animate-fade-up flex flex-col justify-center" style={{ animationDelay: `${i * 60}ms` }}>
              <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800, fontSize: "1.5rem", color: s.color, letterSpacing: "-0.03em", lineHeight: 1 }} className="md:text-[1.8rem]">{s.value}</p>
              <p style={{ color: "#628ECB", fontSize: "0.65rem", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, marginTop: 4, textTransform: "uppercase", letterSpacing: "0.06em" }} className="md:text-[0.72rem]">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filter tabs & Compare Mode - Wraps on mobile */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 animate-fade-up" style={{ animationDelay: "150ms" }}>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 hide-scrollbar w-full lg:w-auto">
            <Filter size={13} color="#628ECB" className="shrink-0 hidden sm:block" />
            {(["all", "strong", "borderline", "not_yet"] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className="shrink-0"
                style={{
                  padding: "5px 12px", borderRadius: 6, fontSize: "0.72rem",
                  fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700,
                  border: `1px solid ${filter === f ? "#395886" : "#D5DEEF"}`,
                  background: filter === f ? "#F0F3FA" : "#FFFFFF",
                  color: filter === f ? "#395886" : "#628ECB", cursor: "pointer", transition: "all 0.15s",
                  textTransform: "capitalize",
                }}>
                {f === "not_yet" ? "Not Yet" : f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <button className="flex items-center justify-center lg:justify-start gap-2 px-4 py-2 lg:py-1.5 rounded-lg bg-white border border-[#D5DEEF] text-[#395886] text-xs font-bold shadow-sm hover:bg-[#F0F3FA] transition-colors w-full lg:w-auto">
            <CheckCircle size={14} className="text-[#8AAEED]" /> Compare Selected
          </button>
        </div>

        {/* Candidate cards */}
        <div className="space-y-3 md:space-y-4">
          {filtered.map((entry, i) => {
            const isExpanded = expanded === entry.id;
            const isSent = sentTests.has(entry.id) || entry.gap_test_sent;
            const radarData = getRadarData(entry);

            return (
              <div key={entry.id} className="card-base bg-[#FFFFFF] border border-[#D5DEEF] shadow-sm rounded-2xl overflow-hidden animate-fade-up"
                style={{ animationDelay: `${200 + i * 60}ms` }}>
                
                {/* Card header */}
                <div className="p-4 sm:p-5 cursor-pointer hover:bg-[#F0F3FA]/50 transition-colors" onClick={() => setExpanded(isExpanded ? null : entry.id)}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    
                    {/* Top Row for Mobile (Rank + Avatar + Match Score) */}
                    <div className="flex items-center justify-between w-full sm:w-auto sm:justify-start gap-3 sm:gap-4">
                      <div className="flex items-center gap-3">
                        {/* Rank */}
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: "#F0F3FA", border: "1px solid #D5DEEF" }}>
                          <span style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800, color: "#628ECB", fontSize: "0.78rem" }}>#{i + 1}</span>
                        </div>

                        {/* Avatar */}
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                          style={{ background: "#D5DEEF", color: "#395886", fontFamily: "var(--font-syne, sans-serif)" }}>
                          {entry.candidate?.full_name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </div>
                      </div>

                      {/* Mobile Match Score (Hidden on Desktop) */}
                      <div className="flex items-center gap-3 sm:hidden shrink-0">
                        <div className="text-right">
                          <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800, fontSize: "1.25rem", color: "#395886", letterSpacing: "-0.03em", lineHeight: 1 }}>
                            {entry.overall_match}<span style={{ color: "#628ECB", fontSize: "0.7rem", fontWeight: 600 }}>%</span>
                          </p>
                        </div>
                        <div style={{ color: "#628ECB" }}>
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>
                      </div>
                    </div>

                    {/* Name + meta */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800, color: "#395886", fontSize: "0.95rem" }}>
                          {entry.candidate?.full_name}
                        </p>
                        <RecommendationBadge recommendation={entry.recommendation} />
                        
                        {i < 2 && (
                          <span style={{ background: "#F0F3FA", color: "#628ECB", border: "1px solid #D5DEEF", padding: "1px 6px", borderRadius: 4, fontSize: "0.6rem", fontWeight: 700, fontFamily: "var(--font-syne, sans-serif)" }}>
                            <ShieldCheck size={10} className="inline mr-1 mb-0.5 text-[#8AAEED]" /> High Confidence
                          </span>
                        )}

                        {isSent && (
                          <span style={{ background: "#F0F3FA", color: "#395886", border: "1px solid #B1C9EF", padding: "1px 6px", borderRadius: 4, fontSize: "0.6rem", fontWeight: 700, fontFamily: "var(--font-syne, sans-serif)" }}>
                            Gap Test {entry.gap_test_completed ? "✓ Done" : "Sent"}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                        <p style={{ color: "#628ECB", fontSize: "0.75rem", fontFamily: "var(--font-dm-sans, sans-serif)" }}>
                          {entry.candidate?.role_family} · {entry.candidate?.location}
                        </p>
                        <p className="flex items-center gap-1 text-[10px] text-[#395886] font-bold">
                          <TrendingUp size={12} className="text-[#8AAEED]" /> Fast Learner
                        </p>
                      </div>
                    </div>

                    {/* Desktop Match score (Hidden on Mobile) */}
                    <div className="hidden sm:flex items-center gap-4 md:gap-6 shrink-0">
                      <div className="text-right">
                        <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800, fontSize: "1.5rem", color: "#395886", letterSpacing: "-0.03em", lineHeight: 1 }}>
                          {entry.overall_match}<span style={{ color: "#628ECB", fontSize: "0.8rem", fontWeight: 600 }}>%</span>
                        </p>
                        <p style={{ color: "#628ECB", fontSize: "0.65rem", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>match</p>
                      </div>
                      <div style={{ color: "#628ECB" }}>
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded detail */}
                {isExpanded && (
                  <div style={{ borderTop: "1px solid #D5DEEF", background: "#FFFFFF" }}>
                    <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
                      
                      {/* Left: Radar + TSS rings */}
                      <div className="md:col-span-4 flex flex-col items-center md:items-start">
                        <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800, color: "#395886", fontSize: "0.82rem", marginBottom: 12 }} className="w-full text-left">
                          Talent Signal Profile
                        </p>
                        <div className="w-full max-w-[250px] md:max-w-none">
                          <ResponsiveContainer width="100%" height={160}>
                            <RadarChart data={radarData}>
                              <PolarGrid stroke="#D5DEEF" />
                              <PolarAngleAxis dataKey="subject" tick={{ fill: "#628ECB", fontSize: 9, fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600 }} />
                              <Radar dataKey="A" stroke="#395886" fill="#8AAEED" fillOpacity={0.2} strokeWidth={2} />
                            </RadarChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-4 w-full">
                          {[
                            { label: "Skill Proof", score: entry.talent_signal?.skill_proof_score ?? 0, color: "#10B981" },
                            { label: "Judgment", score: entry.talent_signal?.work_behavior_score ?? 0, color: "#F59E0B" },
                            { label: "Learning", score: entry.talent_signal?.learning_agility_score ?? 0, color: "#628ECB" },
                            { label: "Comms", score: entry.talent_signal?.culture_fit_score ?? 0, color: "#A855F7" },
                          ].map(d => (
                            <ScoreRing key={d.label} score={d.score} size={60} label={d.label} color={d.color} />
                          ))}
                        </div>
                      </div>

                      {/* Middle: Dimension breakdown */}
                      <div className="md:col-span-5">
                        <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800, color: "#395886", fontSize: "0.82rem", marginBottom: 12 }}>
                          Dimension Evidence Breakdown
                        </p>
                        <div className="space-y-3 sm:space-y-4">
                          {entry.dimension_breakdown.map((dim) => {
                            const Icon = dimensionIcons[dim.dimension] ?? Target;
                            const color = dimensionColors[dim.dimension] ?? "#10B981";
                            return (
                              <div key={dim.dimension} className="p-3 rounded-xl" style={{ background: "#F0F3FA", border: "1px solid #D5DEEF" }}>
                                <div className="flex items-center gap-2 mb-2">
                                  <MatchLevelDot level={dim.match_level} />
                                  <div className="w-6 h-6 rounded-md flex items-center justify-center bg-white border border-[#D5DEEF]">
                                    <Icon size={11} color={color} />
                                  </div>
                                  <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "#395886", fontSize: "0.75rem" }}>{dim.dimension}</p>
                                </div>
                                <p style={{ color: "#395886", fontSize: "0.72rem", fontFamily: "var(--font-dm-sans, sans-serif)", lineHeight: 1.4, marginBottom: 4 }}>
                                  <span style={{ color: "#628ECB", fontWeight: 600 }}>Required: </span>{dim.job_need}
                                </p>
                                <p style={{ color: "#395886", fontSize: "0.72rem", fontFamily: "var(--font-dm-sans, sans-serif)", lineHeight: 1.4 }}>
                                  <span style={{ color: "#628ECB", fontWeight: 600 }}>Proven: </span>{dim.candidate_proof}
                                </p>
                                {dim.gap && (
                                  <div className="flex items-start gap-1.5 mt-2 bg-white p-1.5 rounded border border-[#D5DEEF]">
                                    <AlertCircle size={12} color="#F59E0B" className="mt-0.5 shrink-0" />
                                    <p style={{ color: "#F59E0B", fontSize: "0.68rem", fontFamily: "var(--font-dm-sans, sans-serif)", fontWeight: 600 }}>{dim.gap}</p>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Right: Actions + narrative */}
                      <div className="md:col-span-3 flex flex-col gap-4 mt-4 md:mt-0">
                        {/* Narrative */}
                        <div className="p-4 rounded-xl" style={{ background: "#F0F3FA", border: "1px solid #B1C9EF" }}>
                          <p className="flex items-center gap-1.5" style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800, color: "#395886", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
                            <Zap size={12} className="text-[#8AAEED]"/> AI Explainability
                          </p>
                          <p style={{ color: "#628ECB", fontSize: "0.78rem", fontFamily: "var(--font-dm-sans, sans-serif)", lineHeight: 1.6, fontWeight: 500 }}>
                            {entry.match_narrative}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="space-y-2 flex-1 flex flex-col justify-end">
                          <div className="flex gap-2">
                            <button className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2.5 rounded-xl text-xs transition-all bg-[#F0F3FA] hover:bg-[#D5DEEF] shadow-sm"
                              style={{ border: "1px solid #B1C9EF", color: "#395886", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700 }}>
                              <MessageSquare size={12} /> Prep
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2.5 rounded-xl text-xs transition-all bg-[#F0F3FA] hover:bg-[#D5DEEF] shadow-sm"
                              style={{ border: "1px solid #B1C9EF", color: "#395886", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700 }}>
                              <BarChart2 size={12} /> Analyze
                            </button>
                          </div>

                          <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all hover:bg-[#D5DEEF] bg-[#F0F3FA]"
                            style={{ border: "1px solid #B1C9EF", color: "#395886", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700 }}>
                            <Eye size={14} /> View Verified Passport
                          </button>

                          {entry.recommendation === "borderline" && !isSent && (
                            <button onClick={() => setGapTestModal(entry)}
                              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm shadow-sm hover:opacity-90"
                              style={{ background: "#F59E0B", color: "#FFFFFF", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, border: "none" }}>
                              <Zap size={14} /> Send Targeted Gap Test
                            </button>
                          )}
                          {isSent && (
                            <div className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm bg-[#F0F3FA]"
                              style={{ color: "#395886", border: "1px solid #B1C9EF", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700 }}>
                              <CheckCircle size={14} className="text-[#10B981]" /> Test {entry.gap_test_completed ? "Completed" : "Sent"}
                            </div>
                          )}
                          {entry.recommendation === "strong" && (
                            <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm shadow-[0_4px_15px_rgba(57,88,134,0.2)] hover:shadow-[0_6px_20px_rgba(57,88,134,0.3)] transition-all"
                              style={{ background: "#395886", color: "#FFFFFF", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, border: "none" }}>
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

      {/* Gap Test Modal remains mostly identical, naturally mobile responsive based on max-w-md */}
      {gapTestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          style={{ background: "rgba(240, 243, 250, 0.8)", backdropFilter: "blur(8px)" }}>
          <div className="w-full max-w-md rounded-2xl animate-fade-up bg-[#FFFFFF]"
            style={{ border: "1px solid #D5DEEF", boxShadow: "0 24px 80px rgba(57,88,134,0.15)" }}>
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5" style={{ borderBottom: "1px solid #D5DEEF" }}>
              <h3 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800, color: "#395886" }} className="text-sm sm:text-base">Send Targeted Gap Test</h3>
              <button onClick={() => setGapTestModal(null)} style={{ color: "#628ECB", transition: "color 0.2s" }} className="hover:text-[#395886] p-1"><X size={18} /></button>
            </div>
            <div className="p-5 sm:p-6">
              <div className="flex items-center gap-3 p-3 rounded-xl mb-4 bg-[#F0F3FA] border border-[#D5DEEF]">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 bg-white border border-[#B1C9EF]"
                  style={{ color: "#395886", fontFamily: "var(--font-syne, sans-serif)" }}>
                  {gapTestModal.candidate?.full_name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div className="min-w-0">
                  <p className="truncate" style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "#395886", fontSize: "0.85rem" }}>{gapTestModal.candidate?.full_name}</p>
                  <p style={{ color: "#628ECB", fontSize: "0.72rem", fontFamily: "var(--font-dm-sans, sans-serif)", fontWeight: 500 }}>{gapTestModal.overall_match}% match · Borderline</p>
                </div>
              </div>
              <p style={{ color: "#628ECB", fontSize: "0.8rem sm:0.85rem", fontFamily: "var(--font-dm-sans, sans-serif)", lineHeight: 1.6, marginBottom: 16, fontWeight: 500 }}>
                Gemini will generate a targeted 15-minute mission for the missing dimension below. The candidate receives a unique link — no login required.
              </p>
              <div className="p-3 rounded-lg mb-6 bg-[#F0F3FA] border border-[#D5DEEF]">
                <p style={{ color: "#628ECB", fontSize: "0.65rem sm:0.72rem", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Target Dimension Indicator</p>
                <p style={{ color: "#395886", fontSize: "0.85rem", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800 }}>
                  {gapTestModal.dimension_breakdown.find(d => d.match_level === "gap" || d.match_level === "partial")?.dimension ?? "Work Behavior"}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={() => setGapTestModal(null)}
                  style={{ flex: 1, padding: "10px", borderRadius: 10, border: "1px solid #B1C9EF", color: "#395886", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, fontSize: "0.85rem", background: "#FFFFFF", cursor: "pointer", transition: "background 0.2s" }} className="hover:bg-[#F0F3FA] w-full">
                  Cancel
                </button>
                <button onClick={() => handleSendGapTest(gapTestModal.id)}
                  style={{ flex: 2, padding: "10px", borderRadius: 10, background: "#395886", color: "#FFFFFF", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, fontSize: "0.85rem", border: "none", cursor: "pointer", transition: "opacity 0.2s" }} className="hover:opacity-90 shadow-md w-full">
                  Send Link via AI →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}