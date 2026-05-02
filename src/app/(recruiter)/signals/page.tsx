"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus, FileText, Users, Clock, ChevronRight, X,
  Briefcase, Target, MessageSquare, CheckCircle, Zap
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import { SectionHeader, RecommendationBadge } from "@/components/shared";
import { mockRecruiterProfile, mockJobSignals } from "@/lib/mock-data";
import type { JobSignal } from "@/types";

const ROLE_FAMILIES = [
  "Data & Analytics", "Software Engineering", "Product Management",
  "UX/UI Design", "Digital Marketing", "Business Analysis",
  "DevOps & Cloud", "Cybersecurity", "Project Management",
];

const SKILL_OPTIONS: Record<string, string[]> = {
  "Data & Analytics": ["SQL", "Python", "Data Storytelling", "Excel", "Power BI", "Tableau", "Statistics", "Machine Learning"],
  "Software Engineering": ["React", "TypeScript", "Node.js", "Python", "PostgreSQL", "Docker", "REST APIs", "Git"],
  "Product Management": ["Product Strategy", "User Research", "Stakeholder Management", "Data Analysis", "Agile", "Roadmapping"],
  "UX/UI Design": ["Figma", "User Research", "Prototyping", "Design Systems", "Usability Testing", "Wireframing"],
  "Digital Marketing": ["SEO/SEM", "Social Media", "Content Strategy", "Analytics", "Email Marketing", "Paid Ads"],
  "Business Analysis": ["Requirements Gathering", "Process Mapping", "Data Analysis", "Stakeholder Management", "SQL"],
  "DevOps & Cloud": ["AWS", "Docker", "Kubernetes", "CI/CD", "Linux", "Terraform", "Monitoring"],
  "Cybersecurity": ["Network Security", "Pen Testing", "Incident Response", "SIEM", "Risk Assessment"],
  "Project Management": ["Agile/Scrum", "Risk Management", "Stakeholder Communication", "Budget Planning", "MS Project"],
};

const SCENARIO_TYPES = [
  { value: "ethical_dilemma", label: "Ethical Dilemma" },
  { value: "ambiguity_under_pressure", label: "Ambiguity Under Pressure" },
  { value: "stakeholder_conflict", label: "Stakeholder Conflict" },
  { value: "resource_constraints", label: "Resource Constraints" },
  { value: "technical_tradeoff", label: "Technical Tradeoff" },
  { value: "user_empathy", label: "User Empathy" },
];

export default function SignalsPage() {
  const [showForm, setShowForm] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    title: "",
    role_family: "",
    company_context: "",
    required_skills: [] as string[],
    skill_levels: {} as Record<string, string>,
    scenario_types: [] as string[],
    culture_notes: "",
    timeline_days: 14,
  });
  const [submitted, setSubmitted] = useState(false);

  const availableSkills = SKILL_OPTIONS[form.role_family] || [];

  const toggleSkill = (skill: string) => {
    setForm(prev => ({
      ...prev,
      required_skills: prev.required_skills.includes(skill)
        ? prev.required_skills.filter(s => s !== skill)
        : [...prev.required_skills, skill],
    }));
  };

  const toggleScenario = (val: string) => {
    setForm(prev => ({
      ...prev,
      scenario_types: prev.scenario_types.includes(val)
        ? prev.scenario_types.filter(s => s !== val)
        : [...prev.scenario_types, val],
    }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      setShowForm(false);
      setSubmitted(false);
      setStep(1);
      setForm({ title: "", role_family: "", company_context: "", required_skills: [], skill_levels: {}, scenario_types: [], culture_notes: "", timeline_days: 14 });
    }, 2000);
  };

  return (
    <div className="flex min-h-screen" style={{ background: "#080D1A" }}>
      <Sidebar role="recruiter" userName={mockRecruiterProfile.full_name} userLocation={mockRecruiterProfile.location} />

      <main className="flex-1 ml-64 p-8 bg-grid">
        {/* Header */}
        <div className="flex items-start justify-between mb-8 animate-fade-up">
          <div>
            <p style={{ color: "#3B82F6", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              System 2 · Recruiter Intelligence
            </p>
            <h1 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800, fontSize: "1.75rem", color: "white", letterSpacing: "-0.02em", marginTop: 4 }}>
              Job Signals
            </h1>
            <p style={{ color: "#4A5C74", fontSize: "0.85rem", fontFamily: "var(--font-dm-sans, sans-serif)", marginTop: 2 }}>
              Post structured capability profiles — not generic job descriptions.
            </p>
          </div>
          <button onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm"
            style={{ background: "#3B82F6", color: "white", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600 }}>
            <Plus size={15} /> Post Job Signal
          </button>
        </div>

        {/* Signals list */}
        <div className="space-y-4">
          {mockJobSignals.map((signal, i) => (
            <div key={signal.id} className="card-base p-6 animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1 min-w-0">
                  {/* Title row */}
                  <div className="flex items-center gap-3 mb-2">
                    <h3 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "white", fontSize: "1.05rem" }}>
                      {signal.title}
                    </h3>
                    <span style={{
                      background: signal.status === "active" ? "#10B98115" : signal.status === "draft" ? "#F59E0B15" : "#4A5C7415",
                      color: signal.status === "active" ? "#10B981" : signal.status === "draft" ? "#F59E0B" : "#4A5C74",
                      border: `1px solid ${signal.status === "active" ? "#10B98130" : signal.status === "draft" ? "#F59E0B30" : "#4A5C7430"}`,
                      padding: "2px 9px", borderRadius: 4, fontSize: "0.62rem", fontWeight: 600,
                      fontFamily: "var(--font-syne, sans-serif)", textTransform: "uppercase", letterSpacing: "0.07em"
                    }}>
                      {signal.status}
                    </span>
                  </div>

                  {/* Meta */}
                  <p style={{ color: "#4A5C74", fontSize: "0.8rem", fontFamily: "var(--font-dm-sans, sans-serif)", marginBottom: 12 }}>
                    {signal.role_family} &nbsp;·&nbsp;
                    <Clock size={11} className="inline mr-1" style={{ verticalAlign: "middle" }} />
                    {signal.timeline_days}-day timeline &nbsp;·&nbsp;
                    <Users size={11} className="inline mr-1" style={{ verticalAlign: "middle" }} />
                    {signal._count?.shortlist_entries} matched
                  </p>

                  {/* Company context */}
                  {signal.company_context && (
                    <p style={{ color: "#94A3B8", fontSize: "0.8rem", fontFamily: "var(--font-dm-sans, sans-serif)", marginBottom: 12, fontStyle: "italic" }}>
                      &ldquo;{signal.company_context}&rdquo;
                    </p>
                  )}

                  {/* Skills */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {signal.required_skills.map(skill => (
                      <span key={skill} style={{
                        background: "#3B82F610", border: "1px solid #3B82F625",
                        color: "#3B82F6", padding: "2px 8px", borderRadius: 4,
                        fontSize: "0.65rem", fontWeight: 600, fontFamily: "var(--font-syne, sans-serif)"
                      }}>{skill}</span>
                    ))}
                    {signal.scenario_types?.map(sc => (
                      <span key={sc} style={{
                        background: "#F59E0B10", border: "1px solid #F59E0B25",
                        color: "#F59E0B", padding: "2px 8px", borderRadius: 4,
                        fontSize: "0.65rem", fontWeight: 600, fontFamily: "var(--font-syne, sans-serif)"
                      }}>{SCENARIO_TYPES.find(s => s.value === sc)?.label ?? sc}</span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 shrink-0 items-end">
                  <div className="text-right mb-1">
                    <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800, fontSize: "1.8rem", color: "white", letterSpacing: "-0.03em", lineHeight: 1 }}>
                      {signal._count?.shortlist_entries}
                    </p>
                    <p style={{ color: "#4A5C74", fontSize: "0.68rem", fontFamily: "var(--font-dm-sans, sans-serif)" }}>candidates</p>
                  </div>
                  <Link href="/shortlist"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs transition-all hover:bg-blue-500/10"
                    style={{ border: "1px solid #253350", color: "#3B82F6", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600 }}>
                    View Shortlist <ChevronRight size={12} />
                  </Link>
                  {signal.status === "active" && (
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs transition-colors hover:bg-white/5 w-full justify-center"
                      style={{ border: "1px solid #1E2D45", color: "#4A5C74", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600 }}>
                      <Zap size={11} /> Re-match AI
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ── Create Signal Modal ── */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: "rgba(8,13,26,0.85)", backdropFilter: "blur(8px)" }}>
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl animate-fade-up"
            style={{ background: "#0D1427", border: "1px solid #253350", boxShadow: "0 24px 80px rgba(0,0,0,0.6)" }}>

            {/* Modal header */}
            <div className="flex items-center justify-between px-8 py-6" style={{ borderBottom: "1px solid #1E2D45" }}>
              <div>
                <h2 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800, color: "white", fontSize: "1.1rem" }}>
                  Post a Job Signal
                </h2>
                <p style={{ color: "#4A5C74", fontSize: "0.78rem", fontFamily: "var(--font-dm-sans, sans-serif)", marginTop: 2 }}>
                  Step {step} of 3 — {["Role Context", "Skills & Scenarios", "Culture & Timeline"][step - 1]}
                </p>
              </div>
              <div className="flex items-center gap-4">
                {/* Step indicators */}
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3].map(s => (
                    <div key={s} style={{
                      width: s === step ? 20 : 6, height: 6, borderRadius: 3,
                      background: s < step ? "#3B82F6" : s === step ? "#3B82F6" : "#1E2D45",
                      transition: "all 0.3s ease",
                    }} />
                  ))}
                </div>
                <button onClick={() => { setShowForm(false); setStep(1); }} className="hover:text-white transition-colors" style={{ color: "#4A5C74" }}>
                  <X size={20} />
                </button>
              </div>
            </div>

            {submitted ? (
              <div className="p-12 text-center">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "#3B82F620", border: "1px solid #3B82F640" }}>
                  <CheckCircle size={24} color="#3B82F6" />
                </div>
                <h3 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "white", fontSize: "1.1rem", marginBottom: 8 }}>Signal Posted!</h3>
                <p style={{ color: "#4A5C74", fontSize: "0.85rem", fontFamily: "var(--font-dm-sans, sans-serif)" }}>
                  Gemini is matching talent passports now...
                </p>
              </div>
            ) : (
              <div className="p-8">
                {/* Step 1: Role Context */}
                {step === 1 && (
                  <div className="space-y-5">
                    <div>
                      <label style={{ display: "block", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, color: "#94A3B8", fontSize: "0.75rem", letterSpacing: "0.06em", marginBottom: 8 }}>
                        JOB TITLE
                      </label>
                      <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                        placeholder="e.g. Junior Data Analyst"
                        style={{ width: "100%", background: "#080D1A", border: "1px solid #1E2D45", borderRadius: 10, padding: "10px 14px", color: "white", fontFamily: "var(--font-dm-sans, sans-serif)", fontSize: "0.9rem", outline: "none" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, color: "#94A3B8", fontSize: "0.75rem", letterSpacing: "0.06em", marginBottom: 8 }}>
                        ROLE FAMILY
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {ROLE_FAMILIES.map(rf => (
                          <button key={rf} onClick={() => setForm(p => ({ ...p, role_family: rf, required_skills: [] }))}
                            style={{
                              padding: "8px 10px", borderRadius: 8, fontSize: "0.75rem", textAlign: "center",
                              border: `1px solid ${form.role_family === rf ? "#3B82F6" : "#1E2D45"}`,
                              background: form.role_family === rf ? "#3B82F615" : "transparent",
                              color: form.role_family === rf ? "#3B82F6" : "#94A3B8",
                              fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, cursor: "pointer", transition: "all 0.15s",
                            }}>{rf}</button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label style={{ display: "block", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, color: "#94A3B8", fontSize: "0.75rem", letterSpacing: "0.06em", marginBottom: 8 }}>
                        COMPANY CONTEXT
                      </label>
                      <textarea value={form.company_context} onChange={e => setForm(p => ({ ...p, company_context: e.target.value }))}
                        rows={3} placeholder="e.g. Early-stage fintech, 8-person team, fast-paced. Tell candidates what kind of environment this is."
                        style={{ width: "100%", background: "#080D1A", border: "1px solid #1E2D45", borderRadius: 10, padding: "10px 14px", color: "white", fontFamily: "var(--font-dm-sans, sans-serif)", fontSize: "0.85rem", outline: "none", resize: "none" }} />
                    </div>
                  </div>
                )}

                {/* Step 2: Skills & Scenarios */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <label style={{ display: "block", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, color: "#94A3B8", fontSize: "0.75rem", letterSpacing: "0.06em", marginBottom: 8 }}>
                        REQUIRED SKILLS <span style={{ color: "#4A5C74" }}>— select all that apply</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {availableSkills.map(skill => (
                          <button key={skill} onClick={() => toggleSkill(skill)}
                            style={{
                              padding: "6px 12px", borderRadius: 6, fontSize: "0.75rem",
                              border: `1px solid ${form.required_skills.includes(skill) ? "#3B82F6" : "#1E2D45"}`,
                              background: form.required_skills.includes(skill) ? "#3B82F615" : "transparent",
                              color: form.required_skills.includes(skill) ? "#3B82F6" : "#94A3B8",
                              fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, cursor: "pointer", transition: "all 0.15s",
                            }}>{skill}</button>
                        ))}
                        {!form.role_family && <p style={{ color: "#4A5C74", fontSize: "0.8rem", fontFamily: "var(--font-dm-sans, sans-serif)" }}>Select a role family first</p>}
                      </div>
                    </div>
                    <div>
                      <label style={{ display: "block", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, color: "#94A3B8", fontSize: "0.75rem", letterSpacing: "0.06em", marginBottom: 8 }}>
                        JUDGMENT SCENARIOS <span style={{ color: "#4A5C74" }}>— which matter for this role?</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {SCENARIO_TYPES.map(sc => (
                          <button key={sc.value} onClick={() => toggleScenario(sc.value)}
                            style={{
                              padding: "8px 12px", borderRadius: 8, fontSize: "0.75rem", textAlign: "left",
                              border: `1px solid ${form.scenario_types.includes(sc.value) ? "#F59E0B" : "#1E2D45"}`,
                              background: form.scenario_types.includes(sc.value) ? "#F59E0B10" : "transparent",
                              color: form.scenario_types.includes(sc.value) ? "#F59E0B" : "#94A3B8",
                              fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, cursor: "pointer", transition: "all 0.15s",
                            }}>{sc.label}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Culture & Timeline */}
                {step === 3 && (
                  <div className="space-y-5">
                    <div>
                      <label style={{ display: "block", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, color: "#94A3B8", fontSize: "0.75rem", letterSpacing: "0.06em", marginBottom: 8 }}>
                        CULTURE NOTES
                      </label>
                      <textarea value={form.culture_notes} onChange={e => setForm(p => ({ ...p, culture_notes: e.target.value }))}
                        rows={3} placeholder="What kind of person thrives here? What communication style, values, or working preferences matter most?"
                        style={{ width: "100%", background: "#080D1A", border: "1px solid #1E2D45", borderRadius: 10, padding: "10px 14px", color: "white", fontFamily: "var(--font-dm-sans, sans-serif)", fontSize: "0.85rem", outline: "none", resize: "none" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, color: "#94A3B8", fontSize: "0.75rem", letterSpacing: "0.06em", marginBottom: 8 }}>
                        HIRING TIMELINE — {form.timeline_days} days
                      </label>
                      <input type="range" min={5} max={60} value={form.timeline_days}
                        onChange={e => setForm(p => ({ ...p, timeline_days: parseInt(e.target.value) }))}
                        style={{ width: "100%", accentColor: "#3B82F6" }} />
                      <div className="flex justify-between mt-1">
                        <span style={{ color: "#4A5C74", fontSize: "0.7rem" }}>5 days</span>
                        <span style={{ color: "#4A5C74", fontSize: "0.7rem" }}>60 days</span>
                      </div>
                    </div>
                    {/* Preview */}
                    <div className="p-4 rounded-xl" style={{ background: "#080D1A", border: "1px solid #1E2D45" }}>
                      <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "white", fontSize: "0.82rem", marginBottom: 10 }}>Signal Preview</p>
                      <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "#3B82F6", fontSize: "1rem" }}>{form.title || "Untitled"}</p>
                      <p style={{ color: "#4A5C74", fontSize: "0.75rem", fontFamily: "var(--font-dm-sans, sans-serif)", marginTop: 4 }}>{form.role_family} · {form.timeline_days}d</p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {form.required_skills.map(s => (
                          <span key={s} style={{ background: "#3B82F610", border: "1px solid #3B82F625", color: "#3B82F6", padding: "1px 7px", borderRadius: 3, fontSize: "0.62rem", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600 }}>{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Footer nav */}
                <div className="flex items-center justify-between mt-8 pt-6" style={{ borderTop: "1px solid #1E2D45" }}>
                  <button onClick={() => step > 1 ? setStep(s => s - 1) : setShowForm(false)}
                    style={{ color: "#4A5C74", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, fontSize: "0.85rem", background: "none", border: "none", cursor: "pointer" }}>
                    {step === 1 ? "Cancel" : "← Back"}
                  </button>
                  {step < 3 ? (
                    <button onClick={() => setStep(s => s + 1)}
                      disabled={step === 1 && (!form.title || !form.role_family)}
                      style={{
                        background: "#3B82F6", color: "white", border: "none", borderRadius: 10,
                        padding: "10px 24px", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600,
                        fontSize: "0.85rem", cursor: "pointer", opacity: (step === 1 && (!form.title || !form.role_family)) ? 0.4 : 1,
                      }}>
                      Continue →
                    </button>
                  ) : (
                    <button onClick={handleSubmit}
                      style={{ background: "#3B82F6", color: "white", border: "none", borderRadius: 10, padding: "10px 24px", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer" }}>
                      Post Signal & Match →
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}