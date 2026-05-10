"use client";

import { ExternalLink, Clock, AlertCircle, CheckCircle2, BookOpen, AlertTriangle } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import { ProgressBar } from "@/components/shared";
import { mockCandidateProfile, mockLearningRecs } from "@/lib/mock-data";

const dimensionConfig = [
  { 
    key: "skill_proof", label: "Skill Proof", score: 74, threshold: 80, 
    ai_flaws: [
      "Used nested O(n^2) loops instead of HashMaps, causing inefficiencies at scale.",
      "Failed to sanitize database inputs in the final query."
    ] 
  },
  { 
    key: "work_behavior", label: "Work Behavior", score: 68, threshold: 75,
    ai_flaws: [
      "Prioritized speed over stakeholder communication in the ethical dilemma.",
      "Missed the edge case regarding client confidentiality."
    ]
  },
  { key: "learning_agility", label: "Learning Agility", score: 82, threshold: 75, ai_flaws: [] },
  { key: "culture_fit", label: "Communication", score: 0, threshold: 70, ai_flaws: [] },
];

export default function GapReportPage() {
  const profile = mockCandidateProfile;
  const weakDimensions = dimensionConfig.filter(d => d.score < d.threshold);
  const strongDimensions = dimensionConfig.filter(d => d.score >= d.threshold);

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Sidebar role="candidate" userName={profile.full_name} userLocation={profile.location} />
      
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8 animate-fade-up border-b border-slate-200 pb-6">
          <p className="text-blue-600 font-bold text-xs tracking-widest uppercase mb-1">Continuous Learning</p>
          <h1 className="font-extrabold text-3xl text-slate-900 tracking-tight">AI Skill Gap Report</h1>
          <p className="text-slate-500 mt-1">Precise diagnosis paired with targeted upskilling pathways.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm animate-fade-up">
            <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
              <AlertCircle size={20} className="text-amber-500" />
              <h2 className="font-extrabold text-lg text-slate-900">Priority Growth Areas</h2>
            </div>
            <div className="space-y-8">
              {weakDimensions.map(d => (
                <div key={d.key}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-sm text-slate-700">{d.label}</span>
                    <span className="font-extrabold text-sm text-amber-600">
                      {d.score > 0 ? d.score : "—"}<span className="text-slate-400">/100</span>
                    </span>
                  </div>
                  <ProgressBar value={d.score} color={d.score === 0 ? "#CBD5E1" : "#F59E0B"} height={6} showLabel={false} />
                  
                  {d.score > 0 && d.ai_flaws && d.ai_flaws.length > 0 && (
                    <div className="mt-4 p-4 bg-amber-50/50 border border-amber-100 rounded-xl">
                      <p className="text-xs font-bold text-amber-900 mb-2 flex items-center gap-1.5 uppercase tracking-wider">
                        <AlertTriangle size={14}/> Root Causes Identified
                      </p>
                      <ul className="list-disc pl-5 text-sm text-amber-800 space-y-1.5 leading-relaxed">
                        {d.ai_flaws.map((flaw, idx) => (
                          <li key={idx}>{flaw}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {d.score === 0 && (
                    <p className="text-xs text-slate-400 mt-3 flex items-center gap-1">
                      <Clock size={12}/> Assessment pending. Complete to generate feedback.
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm animate-fade-up delay-100">
            <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
              <CheckCircle2 size={20} className="text-emerald-500" />
              <h2 className="font-extrabold text-lg text-slate-900">Verified Strengths</h2>
            </div>
            <div className="space-y-6">
              {strongDimensions.map(d => (
                <div key={d.key}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-sm text-slate-700">{d.label}</span>
                    <span className="font-extrabold text-sm text-emerald-600">{d.score}<span className="text-slate-400">/100</span></span>
                  </div>
                  <ProgressBar value={d.score} color="#059669" height={6} showLabel={false} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="animate-fade-up delay-200">
          <div className="flex items-center gap-3 mb-6 px-1">
            <BookOpen size={24} className="text-slate-800"/>
            <h2 className="font-extrabold text-2xl text-slate-900">The Learning Bridge</h2>
          </div>
          
          <div className="space-y-6">
            {mockLearningRecs.map((rec) => (
              <div key={rec.id} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col lg:flex-row gap-8">
                <div className="lg:w-1/3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-bold uppercase tracking-wider mb-3">
                    Target: {rec.dimension}
                  </div>
                  <h3 className="font-extrabold text-lg text-slate-900 mb-2">AI Diagnosis</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{rec.gap_diagnosis}</p>
                </div>

                <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {rec.resources.map((resource) => (
                    <a key={resource.url} href={resource.url} target="_blank" rel="noopener noreferrer"
                      className="group flex flex-col p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 transition-all">
                      <div className="flex items-center justify-between mb-3">
                        <span className="bg-white border border-slate-200 text-slate-600 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider shadow-sm">
                          {resource.platform}
                        </span>
                        <ExternalLink size={14} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm mb-4 group-hover:text-blue-700 transition-colors leading-snug">{resource.title}</h4>
                      <div className="mt-auto pt-4 border-t border-slate-200/60">
                        <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5"><Clock size={14} /> {resource.estimated_hours} hours to complete</span>
                      </div>
                    </a>
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