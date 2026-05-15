"use client";

import { useEffect, useState } from "react";
import { ArrowRight, BrainCircuit, CheckCircle2, Play, ShieldCheck, Sparkles, Target, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { aiService } from "@/services/job.service";
import { evidenceService, profileService } from "@/services/profile.service";
import type { CandidateProfile } from "@/types/api.types";

const moduleOptions = [
  { type: "A", title: "Skill Proof", description: "A practical real-world mission." },
  { type: "B", title: "Scenario Judgment", description: "A professional dilemma requiring judgment." },
  { type: "C", title: "Learning Agility", description: "A novel concept applied under pressure." },
  { type: "D", title: "Communication Proof", description: "A structured stakeholder-facing response." },
];

export default function MissionCenter() {
  const [profile, setProfile] = useState<CandidateProfile | null>(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [moduleType, setModuleType] = useState("A");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [evaluation, setEvaluation] = useState<any | null>(null);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [profileData, resultData] = await Promise.allSettled([
          profileService.getMe(),
          evidenceService.getMyResults(),
        ]);

        if (profileData.status === "fulfilled") {
          setProfile(profileData.value);
          setSelectedRole(profileData.value.jobRoles?.[0] || "");
        }
        if (resultData.status === "fulfilled") {
          setResults(Array.isArray(resultData.value) ? resultData.value : []);
        }
      } catch {
        setResults([]);
      }
    };

    void load();
  }, []);

  const generateMission = async () => {
    setLoading(true);
    setError("");
    setEvaluation(null);

    try {
      const targetRole = selectedRole || profile?.jobRoles?.[0] || "Software Engineer";
      const [backendModule, aiModule] = await Promise.allSettled([
        evidenceService.requestModule({ role: targetRole, moduleType }),
        aiService.generateModule({
          role: targetRole,
          moduleType,
          job_context: profile?.professionalProfile || undefined,
        }),
      ]);

      const backendQuestion =
        backendModule.status === "fulfilled" ? backendModule.value?.generatedQuestion : "";
      const aiQuestion = aiModule.status === "fulfilled" ? aiModule.value?.question : "";

      setQuestion(aiQuestion || backendQuestion || "Describe how you would solve a real-world problem for this role.");
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Unable to generate mission.");
    } finally {
      setLoading(false);
    }
  };

  const evaluateAnswer = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await aiService.evaluateMission({
        role: selectedRole || "Candidate",
        question,
        answer,
      });
      setEvaluation(result);
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Unable to evaluate answer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050A15] p-8 text-white">
      <div className="mx-auto">
        <header className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-accent-emerald">
              <span className="text-xs font-black uppercase tracking-widest">AI Capability Missions</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight">Mission Center</h1>
            <p className="mt-2 text-slate-400">Generate, train, and evaluate role-specific assessments through the Talent AI service.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-right">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Evidence results</p>
            <p className="text-2xl font-black text-accent-emerald">{results.length}</p>
          </div>
        </header>

        {error && <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">{error}</div>}

        <section className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-4">
          {moduleOptions.map((module) => (
            <button
              key={module.type}
              onClick={() => setModuleType(module.type)}
              className={`rounded-3xl border p-6 text-left transition-all ${moduleType === module.type ? "border-accent-emerald bg-accent-emerald/10" : "border-white/10 bg-white/[0.04] hover:border-white/20"}`}
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-accent-emerald">
                <Target size={22} />
              </div>
              <p className="text-xs font-black uppercase tracking-widest text-slate-500">Module {module.type}</p>
              <h3 className="mt-1 font-black">{module.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{module.description}</p>
            </button>
          ))}
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 xl:col-span-5">
            <h2 className="text-xl font-black">Mission Setup</h2>
            <p className="mt-2 text-sm text-slate-400">Choose a role and generate a fresh assessment prompt.</p>

            <div className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-500">Target Role</label>
                <input
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  placeholder="Frontend Engineer"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 outline-none focus:border-accent-emerald"
                />
              </div>
              <Button onClick={generateMission} disabled={loading} className="w-full rounded-2xl bg-accent-emerald py-7 font-black text-white hover:bg-emerald-600">
                {loading ? "Generating..." : "Generate Mission"}
                <Sparkles className="ml-2" size={18} />
              </Button>
            </div>

            <div className="mt-8 rounded-2xl border border-accent-emerald/20 bg-accent-emerald/10 p-5">
              <div className="mb-2 flex items-center gap-2 font-bold text-accent-emerald">
                <BrainCircuit size={18} /> How it works
              </div>
              <p className="text-sm leading-relaxed text-slate-300">
                Talent AI generates a role-specific challenge, then evaluates your answer for strengths, weaknesses, and an objective score.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 xl:col-span-7">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black">Active Mission</h2>
                <p className="text-sm text-slate-400">Answer the generated prompt to train your evidence profile.</p>
              </div>
              <ShieldCheck className="text-accent-emerald" />
            </div>

            {question ? (
              <div className="space-y-5">
                <div className="rounded-2xl border border-white/10 bg-[#0A0F1C] p-5">
                  <p className="text-sm leading-relaxed text-slate-200">{question}</p>
                </div>
                <textarea
                  rows={8}
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Write your structured response here..."
                  className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-5 py-4 outline-none focus:border-accent-emerald"
                />
                <Button onClick={evaluateAnswer} disabled={loading || !answer.trim()} className="w-full rounded-2xl bg-white py-7 font-black text-black hover:bg-slate-100">
                  Evaluate Answer
                  <Play className="ml-2" size={16} />
                </Button>
              </div>
            ) : (
              <div className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 p-8 text-center">
                <Target className="mb-4 text-slate-600" size={42} />
                <p className="font-bold">No active mission</p>
                <p className="mt-2 max-w-sm text-sm text-slate-500">Generate a module to begin practicing and collecting capability evidence.</p>
              </div>
            )}

            {evaluation && (
              <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">
                <div className="mb-3 flex items-center justify-between">
                  <p className="font-black text-white">Evaluation Complete</p>
                  <span className="rounded-xl bg-emerald-500/20 px-3 py-1 font-black text-emerald-300">{Math.round(evaluation.score)}/100</span>
                </div>
                <p className="text-sm text-slate-300">{evaluation.feedback}</p>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <InsightList title="Strengths" items={evaluation.strengths || []} />
                  <InsightList title="Weaknesses" items={evaluation.weaknesses || []} />
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function InsightList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/10 p-4">
      <p className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
        <CheckCircle2 size={13} /> {title}
      </p>
      <ul className="space-y-2 text-sm text-slate-300">
        {items.length ? items.map((item) => <li key={item}>{item}</li>) : <li>No items returned.</li>}
      </ul>
    </div>
  );
}
