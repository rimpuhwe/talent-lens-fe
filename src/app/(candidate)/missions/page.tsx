"use client";

import { useState } from "react";
import { Clock, Play, CheckCircle2, Send, AlertCircle, ArrowLeft, ShieldCheck } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import { ModuleBadge } from "@/components/shared";
import { mockCandidateProfile, mockMissions, mockMissionAttempts } from "@/lib/mock-data";
import type { Mission } from "@/types";

export default function MissionsPage() {
  const [activeMission, setActiveMission] = useState<Mission | null>(null);
  const [response, setResponse] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const completedIds = mockMissionAttempts.map(a => a.mission_id);

  const handleStart = (mission: Mission) => {
    setActiveMission(mission);
    setResponse("");
    setSubmitted(false);
  };

  if (activeMission && !submitted) {
    return (
      <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
        <Sidebar role="candidate" userName={mockCandidateProfile.full_name} userLocation={mockCandidateProfile.location} />
        <main className="flex-1 ml-64 p-8 flex flex-col h-screen">
          <div className="flex items-center justify-between mb-8 shrink-0 border-b border-slate-200 pb-6">
            <div>
              <button onClick={() => setActiveMission(null)} className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-blue-600 mb-2 transition-colors">
                <ArrowLeft size={16} /> Exit Assessment
              </button>
              <h1 className="font-extrabold text-2xl text-slate-900 tracking-tight">{activeMission.title}</h1>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white border border-slate-200 shadow-sm">
              <Clock size={18} className="text-slate-400" />
              <span className="font-extrabold text-xl text-slate-900">{activeMission.time_limit_min}:00</span>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-0">
            <div className="lg:col-span-5 flex flex-col gap-6 overflow-y-auto pr-2 pb-8">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-3 uppercase tracking-wider text-xs">The Scenario</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{activeMission.scenario}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-3 uppercase tracking-wider text-xs">Your Deliverable</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{activeMission.deliverable}</p>
              </div>
              <div className="bg-slate-100/50 p-6 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-4 uppercase tracking-wider text-xs">AI Evaluation Rubric</h3>
                <div className="space-y-5">
                  {activeMission.scoring_rubric.map((r) => (
                    <div key={r.dimension} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0 border border-blue-200">
                        {r.max_score}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-slate-900">{r.dimension}</p>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">{r.indicators}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col h-full pb-8">
              <div className="flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <h3 className="font-bold text-slate-900 text-sm">Professional Workspace</h3>
                  <span className={`text-xs font-bold ${response.length > 100 ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {response.length} characters
                  </span>
                </div>
                <textarea
                  value={response} onChange={(e) => setResponse(e.target.value)}
                  placeholder="Draft your structured, professional response here. Gemini AI will evaluate this text against the strict rubric on the left..."
                  className="flex-1 w-full resize-none outline-none p-8 text-sm text-slate-800 leading-relaxed bg-white"
                />
              </div>
              
              <div className="mt-6 flex items-center justify-between shrink-0">
                {response.length < 100 && response.length > 0 ? (
                   <p className="text-xs font-semibold text-amber-600 flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-md"><AlertCircle size={14}/> Too short for accurate AI evaluation.</p>
                ) : <div/>}
                
                <button onClick={() => setSubmitted(true)} disabled={response.length < 100}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  <Send size={16} /> Submit Evidence
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen bg-slate-50 font-sans">
        <Sidebar role="candidate" userName={mockCandidateProfile.full_name} userLocation={mockCandidateProfile.location} />
        <main className="flex-1 ml-64 flex items-center justify-center p-8">
          <div className="text-center max-w-md bg-white p-10 rounded-2xl border border-slate-200 shadow-xl animate-fade-up">
            <div className="w-20 h-20 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600">
              <ShieldCheck size={40} />
            </div>
            <h2 className="font-extrabold text-2xl text-slate-900 mb-3">Evidence Submitted</h2>
            <p className="text-slate-600 mb-8 leading-relaxed text-sm">
              Your response has been securely transmitted. Gemini AI is currently evaluating your logic and professionalism. Your Passport will update momentarily.
            </p>
            <button onClick={() => { setActiveMission(null); setSubmitted(false); }} className="bg-slate-900 hover:bg-slate-800 text-white w-full py-3 rounded-xl font-semibold transition-colors">
              Return to Dashboard
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Sidebar role="candidate" userName={mockCandidateProfile.full_name} userLocation={mockCandidateProfile.location} />
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8 animate-fade-up border-b border-slate-200 pb-6">
          <p className="text-blue-600 font-bold text-xs tracking-widest uppercase mb-1">Evidence Engine</p>
          <h1 className="font-extrabold text-3xl text-slate-900 tracking-tight">Active Assessments</h1>
          <p className="text-slate-500 mt-1">Complete these AI-generated scenarios to construct your verified Talent Signal.</p>
        </div>

        <div className="space-y-6">
          {mockMissions.map((mission, i) => {
            const isCompleted = completedIds.includes(mission.id);
            const attempt = mockMissionAttempts.find(a => a.mission_id === mission.id);
            return (
              <div key={mission.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 hover:border-blue-300 transition-colors animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="flex items-start justify-between gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <ModuleBadge type={mission.module_type} />
                      <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-md"><Clock size={14}/> {mission.time_limit_min} min limit</span>
                      {isCompleted && <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200"><CheckCircle2 size={14}/> Verified</span>}
                    </div>
                    <h3 className="font-extrabold text-xl text-slate-900 mb-2">{mission.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed max-w-3xl mb-6">
                      {mission.scenario.slice(0, 160)}...
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {mission.scoring_rubric.map((r) => (
                        <span key={r.dimension} className="px-3 py-1 bg-slate-50 border border-slate-200 text-slate-600 rounded-md text-[10px] font-bold uppercase tracking-wider">
                          {r.dimension}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="shrink-0 flex flex-col items-end justify-center min-w-[140px] border-l border-slate-100 pl-8 h-full">
                    {isCompleted ? (
                      <div className="text-right">
                        <p className="font-extrabold text-4xl text-slate-900 leading-none">{attempt?.total_score}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 mb-4">TSS Earned</p>
                        <button onClick={() => handleStart(mission)} className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors flex items-center justify-end w-full">
                          Retake <ArrowLeft className="w-4 h-4 ml-1 rotate-180" />
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => handleStart(mission)} className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-sm transition-colors w-full justify-center">
                        <Play size={16} /> Begin
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