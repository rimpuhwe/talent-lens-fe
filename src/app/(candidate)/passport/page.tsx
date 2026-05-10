"use client";

import { Share2, Download, CheckCircle2, Target, BookOpen, Flame, User, ShieldCheck } from "lucide-react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import Sidebar from "@/components/layout/Sidebar";
import { ProgressBar, ModuleBadge } from "@/components/shared";
import { mockCandidateProfile, mockTalentSignal, mockMissionAttempts } from "@/lib/mock-data";

const radarData = [
  { subject: "Skill", A: 74 },
  { subject: "Behavior", A: 68 },
  { subject: "Agility", A: 82 },
  { subject: "Comms", A: 71 },
];

const dimensions = [
  { key: "skill_proof", label: "Skill Proof", desc: "Technical competence via real-world execution", icon: Target, score: 74 },
  { key: "work_behavior", label: "Work Behavior", desc: "Professional judgment & ethical decision-making", icon: BookOpen, score: 68 },
  { key: "learning_agility", label: "Learning Agility", desc: "Speed of skill acquisition under pressure", icon: Flame, score: 82 },
  { key: "culture_fit", label: "Communication", desc: "Clarity, structure, and professional articulation", icon: User, score: 71 },
];

export default function PassportPage() {
  const profile = mockCandidateProfile;
  const signal = mockTalentSignal;

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Sidebar role="candidate" userName={profile.full_name} userLocation={profile.location} />

      <main className="flex-1 ml-64 p-8 max-w-6xl mx-auto">
        <div className="flex items-start justify-between mb-8 animate-fade-up border-b border-slate-200 pb-6">
          <div>
            <p className="text-emerald-600 font-bold text-xs tracking-widest uppercase mb-1 flex items-center gap-1.5"><ShieldCheck size={14}/> Verified Identity</p>
            <h1 className="font-extrabold text-3xl text-slate-900 tracking-tight">Talent Passport</h1>
            <p className="text-slate-500 mt-1">Your immutable record of demonstrated capabilities.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm">
              <Share2 size={16} /> Copy Link
            </button>
            <button className="bg-slate-900 hover:bg-slate-800 text-white flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-colors">
              <Download size={16} /> Export Document
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8 animate-fade-up delay-100">
          <div className="px-8 py-8 border-b border-slate-200 bg-slate-50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-2xl bg-white border-2 border-emerald-100 flex items-center justify-center text-3xl font-extrabold text-slate-800 shadow-sm">
                {profile.full_name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="font-extrabold text-2xl text-slate-900 tracking-tight">{profile.full_name}</h2>
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold uppercase tracking-wider">
                    <CheckCircle2 size={12} /> AI Verified
                  </span>
                </div>
                <p className="text-slate-600 font-medium text-sm">{profile.role_family} · {profile.location}</p>
                <p className="text-xs text-slate-400 mt-2 font-mono">
                  ID: TL-{profile.id.substring(0,8).toUpperCase()} · ISSUED: {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="text-center bg-white px-8 py-5 rounded-xl border border-slate-200 shadow-sm min-w-[160px]">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Talent Signal Score</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="font-extrabold text-5xl text-blue-600 tracking-tighter">{signal.overall_tss}</span>
                <span className="text-slate-400 font-bold">/100</span>
              </div>
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 flex flex-col items-center justify-center bg-white p-6 rounded-2xl border border-slate-100">
              <p className="font-bold text-xs text-slate-500 uppercase tracking-widest mb-2 w-full text-center">Competency Radar</p>
              <div className="w-full h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                    <PolarGrid stroke="#E2E8F0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: "#64748B", fontSize: 11, fontWeight: 600 }} />
                    <Radar dataKey="A" stroke="#2563EB" fill="#3B82F6" fillOpacity={0.15} strokeWidth={2.5} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6 flex flex-col justify-center">
              {dimensions.map((dim) => (
                <div key={dim.key} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                        <dim.icon size={16} className="text-slate-700" strokeWidth={2} />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-slate-900">{dim.label}</p>
                        <p className="text-xs text-slate-500">{dim.desc}</p>
                      </div>
                    </div>
                    <span className="font-extrabold text-slate-900">{dim.score}<span className="text-slate-400 text-xs">/100</span></span>
                  </div>
                  <ProgressBar value={dim.score} color="#2563EB" height={6} showLabel={false} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="animate-fade-up delay-200">
          <h3 className="font-bold text-lg text-slate-900 mb-4 px-1">Immutable Evidence Log</h3>
          <div className="space-y-4">
            {mockMissionAttempts.map((attempt) => (
              <div key={attempt.id} className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col md:flex-row gap-6 hover:border-slate-300 transition-colors">
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <ModuleBadge type={attempt.mission?.module_type} />
                    <h4 className="font-bold text-slate-900 tracking-tight">{attempt.mission?.title}</h4>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    <span className="font-semibold text-slate-800">AI Finding: </span>
                    {attempt.overall_summary}
                  </p>
                  <div className="flex gap-4">
                    {attempt.dimension_scores?.slice(0,2).map((ds) => (
                      <div key={ds.dimension} className="flex-1 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] font-bold uppercase text-slate-500">{ds.dimension}</span>
                          <span className="text-xs font-bold text-emerald-700">{ds.score}/{ds.max_score}</span>
                        </div>
                        <ProgressBar value={ds.score} max={ds.max_score} height={4} showLabel={false} color="#059669" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="shrink-0 md:border-l md:border-slate-100 md:pl-6 flex flex-col justify-center items-end text-right">
                  <span className="font-extrabold text-3xl text-slate-900">{attempt.total_score}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 mb-2">Module Score</span>
                  <span className="text-xs text-slate-400 font-mono">{new Date(attempt.submitted_at ?? "").toLocaleDateString()}</span>
                </div>

              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}