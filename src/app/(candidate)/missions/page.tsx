"use client";

import { useState } from "react";
import { Clock, ChevronRight, Play, CheckCircle, Lock, Send, AlertCircle } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import { ModuleBadge, SectionHeader } from "@/components/shared";
import { mockCandidateProfile, mockMissions, mockMissionAttempts } from "@/lib/mock-data";
import type { Mission } from "@/types";

export default function MissionsPage() {
  const [activeMission, setActiveMission] = useState<Mission | null>(null);
  const [response, setResponse] = useState("");
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const completedIds = mockMissionAttempts.map(a => a.mission_id);

  const handleStart = (mission: Mission) => {
    setActiveMission(mission);
    setTimeLeft(mission.time_limit_min * 60);
    setResponse("");
    setSubmitted(false);
  };

  const handleSubmit = () => {
    if (response.trim().length < 50) return;
    setSubmitted(true);
  };

  if (activeMission && !submitted) {
    return (
      <div className="flex min-h-screen" style={{ background: "#080D1A" }}>
        <Sidebar role="candidate" userName={mockCandidateProfile.full_name} userLocation={mockCandidateProfile.location} />
        <main className="flex-1 ml-64 p-8 bg-grid">
          {/* Mission header */}
          <div className="flex items-center justify-between mb-6 animate-fade-up">
            <div>
              <p style={{ color: "#10B981", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Active Mission
              </p>
              <h1 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800, fontSize: "1.5rem", color: "white", letterSpacing: "-0.02em", marginTop: 4 }}>
                {activeMission.title}
              </h1>
            </div>
            {/* Timer */}
            <div className="flex items-center gap-2 px-5 py-3 rounded-xl" style={{ background: "#162033", border: "1px solid #253350" }}>
              <Clock size={16} color="#F59E0B" />
              <span style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, fontSize: "1.1rem", color: "#F59E0B", letterSpacing: "-0.02em" }}>
                {activeMission.time_limit_min}:00
              </span>
              <span style={{ color: "#4A5C74", fontSize: "0.75rem" }}>remaining</span>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Mission brief */}
            <div className="col-span-5 space-y-4">
              <div className="card-base p-6 animate-fade-up" style={{ animationDelay: "100ms" }}>
                <div className="flex items-center gap-2 mb-4">
                  <ModuleBadge type={activeMission.module_type} />
                  <span style={{ color: "#4A5C74", fontSize: "0.72rem", fontFamily: "var(--font-dm-sans, sans-serif)" }}>
                    <Clock size={10} className="inline mr-1" />{activeMission.time_limit_min} minutes
                  </span>
                </div>
                <h3 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "white", marginBottom: 12, fontSize: "0.9rem" }}>
                  The Scenario
                </h3>
                <p style={{ color: "#94A3B8", fontSize: "0.85rem", lineHeight: 1.7, fontFamily: "var(--font-dm-sans, sans-serif)" }}>
                  {activeMission.scenario}
                </p>
              </div>
              <div className="card-base p-6 animate-fade-up" style={{ animationDelay: "150ms" }}>
                <h3 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "white", marginBottom: 12, fontSize: "0.9rem" }}>
                  Your Deliverable
                </h3>
                <p style={{ color: "#94A3B8", fontSize: "0.85rem", lineHeight: 1.7, fontFamily: "var(--font-dm-sans, sans-serif)" }}>
                  {activeMission.deliverable}
                </p>
              </div>
              <div className="card-base p-6 animate-fade-up" style={{ animationDelay: "200ms" }}>
                <h3 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "white", marginBottom: 12, fontSize: "0.9rem" }}>
                  How You&apos;re Scored
                </h3>
                <div className="space-y-3">
                  {activeMission.scoring_rubric.map((r) => (
                    <div key={r.dimension} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5" style={{ background: "#10B98115", border: "1px solid #10B98130" }}>
                        <span style={{ color: "#10B981", fontSize: "0.65rem", fontWeight: 700, fontFamily: "var(--font-syne, sans-serif)" }}>{r.max_score}</span>
                      </div>
                      <div>
                        <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, color: "white", fontSize: "0.78rem" }}>{r.dimension}</p>
                        <p style={{ color: "#4A5C74", fontSize: "0.72rem", fontFamily: "var(--font-dm-sans, sans-serif)" }}>{r.indicators}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Response area */}
            <div className="col-span-7 animate-fade-up" style={{ animationDelay: "150ms" }}>
              <div className="card-base p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "white", fontSize: "0.9rem" }}>Your Response</h3>
                  <span style={{ color: response.length > 50 ? "#10B981" : "#4A5C74", fontSize: "0.72rem", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600 }}>
                    {response.length} chars {response.length < 200 && "· min 200 recommended"}
                  </span>
                </div>
                <textarea
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  placeholder={`Write your response here...\n\nBe specific. Reference the scenario. Show your reasoning.\n\nAI will evaluate your response on all ${activeMission.scoring_rubric.length} dimensions above.`}
                  className="flex-1 w-full resize-none outline-none text-sm leading-relaxed"
                  style={{
                    background: "#080D1A", border: "1px solid #1E2D45", borderRadius: 12,
                    padding: 20, color: "#EDF2F7", fontFamily: "var(--font-dm-sans, sans-serif)",
                    minHeight: 380, caretColor: "#10B981",
                  }}
                />
                {response.length < 50 && response.length > 0 && (
                  <div className="flex items-center gap-2 mt-3 px-3 py-2 rounded-lg" style={{ background: "#F59E0B10", border: "1px solid #F59E0B30" }}>
                    <AlertCircle size={13} color="#F59E0B" />
                    <p style={{ color: "#F59E0B", fontSize: "0.75rem", fontFamily: "var(--font-dm-sans, sans-serif)" }}>
                      Your response is too short. Aim for at least 150 words for a meaningful evaluation.
                    </p>
                  </div>
                )}
                <button
                  onClick={handleSubmit}
                  disabled={response.trim().length < 50}
                  className="mt-4 btn-primary px-6 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ fontFamily: "var(--font-syne, sans-serif)" }}>
                  <Send size={14} /> Submit for AI Evaluation
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (submitted && activeMission) {
    return (
      <div className="flex min-h-screen" style={{ background: "#080D1A" }}>
        <Sidebar role="candidate" userName={mockCandidateProfile.full_name} userLocation={mockCandidateProfile.location} />
        <main className="flex-1 ml-64 p-8 bg-grid flex items-center justify-center">
          <div className="text-center max-w-md animate-fade-up">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: "#10B98120", border: "1px solid #10B98140" }}>
              <CheckCircle size={28} color="#10B981" />
            </div>
            <h2 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800, fontSize: "1.5rem", color: "white", letterSpacing: "-0.02em", marginBottom: 12 }}>
              Mission Submitted
            </h2>
            <p style={{ color: "#94A3B8", fontSize: "0.9rem", fontFamily: "var(--font-dm-sans, sans-serif)", lineHeight: 1.7, marginBottom: 24 }}>
              Gemini AI is evaluating your response across all {activeMission.scoring_rubric.length} dimensions. Results will be ready in under 60 seconds.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button onClick={() => { setActiveMission(null); setSubmitted(false); }}
                className="btn-primary px-6 py-2.5 rounded-xl text-sm" style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600 }}>
                View Results
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen" style={{ background: "#080D1A" }}>
      <Sidebar role="candidate" userName={mockCandidateProfile.full_name} userLocation={mockCandidateProfile.location} />
      <main className="flex-1 ml-64 p-8 bg-grid">
        <div className="mb-8 animate-fade-up">
          <p style={{ color: "#10B981", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Evidence Engine
          </p>
          <h1 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800, fontSize: "1.75rem", color: "white", letterSpacing: "-0.02em", marginTop: 4 }}>
            Missions
          </h1>
          <p style={{ color: "#4A5C74", fontSize: "0.85rem", fontFamily: "var(--font-dm-sans, sans-serif)", marginTop: 2 }}>
            Complete missions to build verified proof of your capabilities.
          </p>
        </div>

        <div className="space-y-4">
          {mockMissions.map((mission, i) => {
            const isCompleted = completedIds.includes(mission.id);
            const attempt = mockMissionAttempts.find(a => a.mission_id === mission.id);
            return (
              <div key={mission.id} className="card-base p-6 animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <ModuleBadge type={mission.module_type} />
                      <span className="flex items-center gap-1" style={{ color: "#4A5C74", fontSize: "0.72rem", fontFamily: "var(--font-dm-sans, sans-serif)" }}>
                        <Clock size={10} /> {mission.time_limit_min} minutes
                      </span>
                      {isCompleted && (
                        <div className="flex items-center gap-1" style={{ color: "#10B981", fontSize: "0.72rem" }}>
                          <CheckCircle size={11} /> Completed
                        </div>
                      )}
                    </div>
                    <h3 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "white", fontSize: "1rem", marginBottom: 8 }}>
                      {mission.title}
                    </h3>
                    <p style={{ color: "#94A3B8", fontSize: "0.82rem", lineHeight: 1.6, fontFamily: "var(--font-dm-sans, sans-serif)", maxWidth: 600 }}>
                      {mission.scenario.slice(0, 160)}...
                    </p>
                    <div className="flex items-center gap-2 mt-4">
                      {mission.scoring_rubric.map((r) => (
                        <span key={r.dimension} style={{ background: "#111827", border: "1px solid #1E2D45", color: "#4A5C74", padding: "2px 8px", borderRadius: 4, fontSize: "0.65rem", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600 }}>
                          {r.dimension}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    {isCompleted ? (
                      <div className="text-center">
                        <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800, fontSize: "2rem", color: "white", letterSpacing: "-0.03em" }}>
                          {attempt?.total_score}<span style={{ color: "#4A5C74", fontSize: "1rem" }}>/100</span>
                        </p>
                        <button onClick={() => handleStart(mission)}
                          className="mt-2 text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors hover:bg-white/5"
                          style={{ border: "1px solid #253350", color: "#94A3B8", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600 }}>
                          Re-attempt <ChevronRight size={12} />
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => handleStart(mission)}
                        className="btn-primary px-6 py-3 rounded-xl flex items-center gap-2 text-sm">
                        <Play size={14} /> Start Mission
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}