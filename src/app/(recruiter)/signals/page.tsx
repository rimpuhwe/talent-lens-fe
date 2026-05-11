"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus, FileText, Users, Clock, ChevronRight, X,
  Briefcase, Target, MessageSquare, CheckCircle, Zap, ShieldCheck, ArrowLeft, Sparkles, TrendingUp, Loader2
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

// --- NEW: Mock AI Knowledge Base ---
const AI_TEMPLATES: Record<string, any> = {
  "Data & Analytics": {
    title: "Growth Data Analyst",
    company_context: "Fast-growing Kigali fintech startup scaling across East Africa. We need someone who can turn raw transaction data into actionable product insights.",
    required_skills: ["SQL", "Python", "Data Storytelling", "Tableau"],
    scenario_types: ["ambiguity_under_pressure", "stakeholder_conflict"],
    culture_notes: "We move fast and value autonomy. You should be comfortable defending your data insights to the executive team. Clear, concise communication is heavily valued.",
    timeline_days: 14
  },
  "Software Engineering": {
    title: "Full-Stack Engineer (Next.js/Node)",
    company_context: "Established e-commerce platform rebuilding our core architecture. 15-person engineering team working in agile sprints.",
    required_skills: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    scenario_types: ["technical_tradeoff", "resource_constraints"],
    culture_notes: "We prioritize clean, maintainable code over quick hacks. Collaboration and code reviews are a daily occurrence, so low ego and high empathy are required.",
    timeline_days: 21
  }
};

export default function SignalsPage() {
  const [showForm, setShowForm] = useState(false);
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false); // NEW: Loading state for AI
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

  // --- NEW: AI Template Generation Logic ---
  const handleUseAITemplate = () => {
    setIsGenerating(true);
    setShowForm(true); // Open modal if triggered from outside

    // Simulate a brief AI "thinking" delay
    setTimeout(() => {
      // Use currently selected role, or default to Data & Analytics
      const role = form.role_family || "Data & Analytics";
      // Fallback to Data template if we don't have a specific mock written for the selected role
      const template = AI_TEMPLATES[role] || AI_TEMPLATES["Data & Analytics"];

      setForm(prev => ({
        ...prev,
        role_family: role,
        title: template.title,
        company_context: template.company_context,
        required_skills: template.required_skills,
        scenario_types: template.scenario_types,
        culture_notes: template.culture_notes,
        timeline_days: template.timeline_days
      }));
      setIsGenerating(false);
    }, 800);
  };

  return (
    <div className="flex min-h-screen" style={{ background: "#F0F3FA" }}>
      <Sidebar role="recruiter" userName={mockRecruiterProfile.full_name} userLocation={mockRecruiterProfile.location} />

      <main className="flex-1 ml-0 lg:ml-64 p-4 sm:p-6 md:p-8 bg-grid relative overflow-x-hidden w-full">
        {/* Header */}
        <Link href="/r-dashboard" className="flex items-center gap-2 mb-4 text-sm transition-colors hover:text-[#395886]"
            style={{ color: "#628ECB", fontFamily: "var(--font-dm-sans, sans-serif)" }}>
            <ArrowLeft size={14} /> Back to Dashboard 
          </Link>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6 md:mb-8 animate-fade-up">
          <div>
            <p className="flex items-center gap-1.5" style={{ color: "#628ECB", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              <ShieldCheck size={14} />  · Recruiter Intelligence
            </p>
            <h1 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800, fontSize: "1.75rem", color: "#395886", letterSpacing: "-0.02em", marginTop: 4 }}>
              Job Signals
            </h1>
            <p style={{ color: "#628ECB", fontSize: "0.85rem", fontFamily: "var(--font-dm-sans, sans-serif)", marginTop: 2, fontWeight: 500 }}>
              Post structured capability profiles — not generic job descriptions.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* UPDATED: AI Template Shortcut */}
            
            <button onClick={() => setShowForm(true)}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm shadow-[0_4px_15px_rgba(57,88,134,0.2)] hover:shadow-[0_6px_20px_rgba(57,88,134,0.3)] transition-all"
              style={{ background: "#395886", color: "#FFFFFF", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700 }}>
              <Plus size={15} /> Post Job Signal
            </button>
          </div>
        </div>

        {/* Signals list */}
        <div className="space-y-4">
          {mockJobSignals.map((signal, i) => (
            <div key={signal.id} className="card-base p-5 md:p-6 bg-white border border-[#D5DEEF] shadow-sm rounded-2xl animate-fade-up hover:shadow-md transition-shadow" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
                <div className="flex-1 min-w-0 w-full">
                  {/* Title row */}
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800, color: "#395886", fontSize: "1.05rem" }}>
                      {signal.title}
                    </h3>
                    <span style={{
                      background: signal.status === "active" ? "#10B98115" : signal.status === "draft" ? "#F59E0B15" : "#F0F3FA",
                      color: signal.status === "active" ? "#10B981" : signal.status === "draft" ? "#F59E0B" : "#628ECB",
                      border: `1px solid ${signal.status === "active" ? "#10B98130" : signal.status === "draft" ? "#F59E0B30" : "#D5DEEF"}`,
                      padding: "2px 9px", borderRadius: 4, fontSize: "0.62rem", fontWeight: 700,
                      fontFamily: "var(--font-syne, sans-serif)", textTransform: "uppercase", letterSpacing: "0.07em"
                    }}>
                      {signal.status}
                    </span>
                  </div>

                  {/* Meta */}
                  <p className="flex flex-wrap items-center gap-x-2 gap-y-1" style={{ color: "#628ECB", fontSize: "0.8rem", fontFamily: "var(--font-dm-sans, sans-serif)", marginBottom: 12, fontWeight: 500 }}>
                    <span>{signal.role_family}</span>
                    <span>·</span>
                    <span className="flex items-center"><Clock size={11} className="mr-1" />{signal.timeline_days}-day timeline</span>
                    <span>·</span>
                    <span className="flex items-center"><Users size={11} className="mr-1" />{signal._count?.shortlist_entries} matched</span>
                  </p>

                  {/* Company context */}
                  {signal.company_context && (
                    <div className="p-3 rounded-xl mb-4 bg-[#F0F3FA] border border-[#D5DEEF]">
                      <p style={{ color: "#395886", fontSize: "0.8rem", fontFamily: "var(--font-dm-sans, sans-serif)", fontStyle: "italic", fontWeight: 500 }}>
                        &ldquo;{signal.company_context}&rdquo;
                      </p>
                    </div>
                  )}

                  {/* Skills & Scenarios */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {signal.required_skills.map(skill => (
                      <span key={skill} style={{
                        background: "#FFFFFF", border: "1px solid #B1C9EF",
                        color: "#395886", padding: "2px 8px", borderRadius: 6,
                        fontSize: "0.65rem", fontWeight: 700, fontFamily: "var(--font-syne, sans-serif)"
                      }}>{skill}</span>
                    ))}
                    {signal.scenario_types?.map(sc => (
                      <span key={sc} style={{
                        background: "#F0F3FA", border: "1px solid #D5DEEF",
                        color: "#628ECB", padding: "2px 8px", borderRadius: 6,
                        fontSize: "0.65rem", fontWeight: 700, fontFamily: "var(--font-syne, sans-serif)"
                      }}>{SCENARIO_TYPES.find(s => s.value === sc)?.label ?? sc}</span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-row sm:flex-col gap-3 shrink-0 items-center sm:items-end w-full sm:w-auto justify-between sm:justify-start pt-4 sm:pt-0 border-t sm:border-t-0 border-[#D5DEEF]">
                  <div className="text-left sm:text-right mb-1">
                    <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800, fontSize: "1.8rem", color: "#395886", letterSpacing: "-0.03em", lineHeight: 1 }}>
                      {signal._count?.shortlist_entries}
                    </p>
                    <p style={{ color: "#628ECB", fontSize: "0.68rem", fontFamily: "var(--font-dm-sans, sans-serif)", fontWeight: 600, textTransform: "uppercase" }}>candidates</p>
                  </div>
                  
                  <div className="flex flex-col gap-2 w-full sm:w-auto">
                    <Link href="/shortlist"
                      className="flex items-center justify-center sm:justify-start gap-2 px-4 py-2 rounded-lg text-xs transition-all hover:bg-[#F0F3FA] bg-white shadow-sm"
                      style={{ border: "1px solid #B1C9EF", color: "#395886", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700 }}>
                      View Shortlist <ChevronRight size={12} />
                    </Link>
                    
                    {signal.status === "active" && (
                      <div className="flex gap-2">
                        <button className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs transition-colors hover:bg-[#D5DEEF] bg-[#F0F3FA] flex-1"
                          style={{ border: "1px solid #D5DEEF", color: "#628ECB", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700 }}>
                          <Zap size={11} /> Re-match
                        </button>
                        <button className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs transition-colors hover:bg-[#D5DEEF] bg-[#F0F3FA] flex-1"
                          style={{ border: "1px solid #D5DEEF", color: "#628ECB", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700 }}>
                          <CheckCircle size={11} /> Hire
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ── Create Signal Modal ── */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          style={{ background: "rgba(240, 243, 250, 0.8)", backdropFilter: "blur(8px)" }}>
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl animate-fade-up bg-white"
            style={{ border: "1px solid #D5DEEF", boxShadow: "0 24px 80px rgba(57,88,134,0.15)" }}>

            {/* Modal header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 sm:px-8 py-5 sm:py-6 gap-4" style={{ borderBottom: "1px solid #D5DEEF" }}>
              <div>
                <h2 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800, color: "#395886", fontSize: "1.1rem" }}>
                  Post a Job Signal
                </h2>
                <p style={{ color: "#628ECB", fontSize: "0.78rem", fontFamily: "var(--font-dm-sans, sans-serif)", marginTop: 2, fontWeight: 500 }}>
                  Step {step} of 3 — {["Role Context", "Skills & Scenarios", "Culture & Timeline"][step - 1]}
                </p>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                {/* Step indicators */}
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3].map(s => (
                    <div key={s} style={{
                      width: s === step ? 20 : 6, height: 6, borderRadius: 3,
                      background: s < step ? "#8AAEED" : s === step ? "#395886" : "#D5DEEF",
                      transition: "all 0.3s ease",
                    }} />
                  ))}
                </div>
                <button onClick={() => { setShowForm(false); setStep(1); }} className="hover:text-[#395886] transition-colors p-1" style={{ color: "#628ECB" }}>
                  <X size={20} />
                </button>
              </div>
            </div>

            {submitted ? (
              <div className="p-8 sm:p-12 text-center">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-[#F0F3FA]" style={{ border: "1px solid #B1C9EF" }}>
                  <CheckCircle size={24} color="#395886" />
                </div>
                <h3 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800, color: "#395886", fontSize: "1.1rem", marginBottom: 8 }}>Signal Posted!</h3>
                <p style={{ color: "#628ECB", fontSize: "0.85rem", fontFamily: "var(--font-dm-sans, sans-serif)", fontWeight: 500 }}>
                  Gemini is matching talent passports now...
                </p>
              </div>
            ) : (
              <div className="p-6 sm:p-8 relative">
                
                {/* Loader Overlay */}
                {isGenerating && (
                  <div className="absolute inset-0 z-10 bg-white/60 backdrop-blur-sm flex items-center justify-center rounded-b-2xl">
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 size={32} className="text-[#395886] animate-spin" />
                      <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "#395886" }}>Gemini is drafting template...</p>
                    </div>
                  </div>
                )}

                {/* UPDATED: AI Template Generator Action */}
                {step === 1 && (
                  <div className="mb-6 p-4 rounded-xl bg-[#F0F3FA] border border-[#B1C9EF] flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p style={{ color: "#395886", fontSize: "0.8rem", fontFamily: "var(--font-dm-sans, sans-serif)", fontWeight: 600 }}>
                      <Sparkles size={14} className="inline mr-1 text-[#8AAEED] mb-0.5"/> 
                      {form.role_family ? `Generate standard ${form.role_family} profile` : "Generate structure with AI"}
                    </p>
                    <button onClick={handleUseAITemplate} disabled={isGenerating}
                      className="flex items-center justify-center gap-2 px-3 py-1.5 bg-white border border-[#D5DEEF] text-[#395886] text-xs font-bold rounded-lg hover:bg-[#D5DEEF] transition-colors w-full sm:w-auto disabled:opacity-50">
                      {isGenerating ? <Loader2 size={12} className="animate-spin"/> : null} Generate with AI
                    </button>
                  </div>
                )}

                {/* Step 1: Role Context */}
                {step === 1 && (
                  <div className="space-y-5">
                    <div>
                      <label style={{ display: "block", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "#628ECB", fontSize: "0.75rem", letterSpacing: "0.06em", marginBottom: 8 }}>
                        JOB TITLE
                      </label>
                      <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                        placeholder="e.g. Junior Data Analyst"
                        style={{ width: "100%", background: "#F0F3FA", border: "1px solid #D5DEEF", borderRadius: 10, padding: "10px 14px", color: "#395886", fontFamily: "var(--font-dm-sans, sans-serif)", fontSize: "0.9rem", outline: "none", fontWeight: 500 }} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "#628ECB", fontSize: "0.75rem", letterSpacing: "0.06em", marginBottom: 8 }}>
                        ROLE FAMILY
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {ROLE_FAMILIES.map(rf => (
                          <button key={rf} onClick={() => setForm(p => ({ ...p, role_family: rf, required_skills: [] }))}
                            style={{
                              padding: "8px 10px", borderRadius: 8, fontSize: "0.75rem", textAlign: "center",
                              border: `1px solid ${form.role_family === rf ? "#395886" : "#D5DEEF"}`,
                              background: form.role_family === rf ? "#F0F3FA" : "#FFFFFF",
                              color: form.role_family === rf ? "#395886" : "#628ECB",
                              fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, cursor: "pointer", transition: "all 0.15s",
                            }}>{rf}</button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label style={{ display: "block", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "#628ECB", fontSize: "0.75rem", letterSpacing: "0.06em", marginBottom: 8 }}>
                        COMPANY CONTEXT
                      </label>
                      <textarea value={form.company_context} onChange={e => setForm(p => ({ ...p, company_context: e.target.value }))}
                        rows={3} placeholder="e.g. Early-stage fintech, 8-person team, fast-paced. Tell candidates what kind of environment this is."
                        style={{ width: "100%", background: "#F0F3FA", border: "1px solid #D5DEEF", borderRadius: 10, padding: "10px 14px", color: "#395886", fontFamily: "var(--font-dm-sans, sans-serif)", fontSize: "0.85rem", outline: "none", resize: "none", fontWeight: 500 }} />
                    </div>
                  </div>
                )}

                {/* Step 2: Skills & Scenarios */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <label style={{ display: "block", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "#628ECB", fontSize: "0.75rem", letterSpacing: "0.06em", marginBottom: 8 }}>
                        REQUIRED SKILLS <span style={{ color: "#B1C9EF", fontWeight: 500 }}>— select all that apply</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {availableSkills.map((skill, idx) => (
                          <button key={skill} onClick={() => toggleSkill(skill)}
                            className="flex items-center gap-1.5"
                            style={{
                              padding: "6px 12px", borderRadius: 8, fontSize: "0.75rem",
                              border: `1px solid ${form.required_skills.includes(skill) ? "#395886" : "#D5DEEF"}`,
                              background: form.required_skills.includes(skill) ? "#F0F3FA" : "#FFFFFF",
                              color: form.required_skills.includes(skill) ? "#395886" : "#628ECB",
                              fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, cursor: "pointer", transition: "all 0.15s",
                            }}>
                            {skill}
                            {/* F8: Market Intel Badges injected dynamically on first 2 skills */}
                            {idx < 2 && !form.required_skills.includes(skill) && (
                              <span className="text-[9px] bg-[#8AAEED] text-white px-1.5 rounded-sm">Hot</span>
                            )}
                          </button>
                        ))}
                        {!form.role_family && <p style={{ color: "#628ECB", fontSize: "0.8rem", fontFamily: "var(--font-dm-sans, sans-serif)", fontWeight: 500 }}>Select a role family first</p>}
                      </div>
                    </div>
                    <div>
                      <label style={{ display: "block", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "#628ECB", fontSize: "0.75rem", letterSpacing: "0.06em", marginBottom: 8 }}>
                        JUDGMENT SCENARIOS <span style={{ color: "#B1C9EF", fontWeight: 500 }}>— which matter for this role?</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {SCENARIO_TYPES.map(sc => (
                          <button key={sc.value} onClick={() => toggleScenario(sc.value)}
                            style={{
                              padding: "8px 12px", borderRadius: 8, fontSize: "0.75rem", textAlign: "left",
                              border: `1px solid ${form.scenario_types.includes(sc.value) ? "#8AAEED" : "#D5DEEF"}`,
                              background: form.scenario_types.includes(sc.value) ? "#F0F3FA" : "#FFFFFF",
                              color: form.scenario_types.includes(sc.value) ? "#395886" : "#628ECB",
                              fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, cursor: "pointer", transition: "all 0.15s",
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
                      <label style={{ display: "block", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "#628ECB", fontSize: "0.75rem", letterSpacing: "0.06em", marginBottom: 8 }}>
                        CULTURE NOTES
                      </label>
                      <textarea value={form.culture_notes} onChange={e => setForm(p => ({ ...p, culture_notes: e.target.value }))}
                        rows={3} placeholder="What kind of person thrives here? What communication style, values, or working preferences matter most?"
                        style={{ width: "100%", background: "#F0F3FA", border: "1px solid #D5DEEF", borderRadius: 10, padding: "10px 14px", color: "#395886", fontFamily: "var(--font-dm-sans, sans-serif)", fontSize: "0.85rem", outline: "none", resize: "none", fontWeight: 500 }} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "#628ECB", fontSize: "0.75rem", letterSpacing: "0.06em", marginBottom: 8 }}>
                        HIRING TIMELINE — {form.timeline_days} days
                      </label>
                      <input type="range" min={5} max={60} value={form.timeline_days}
                        onChange={e => setForm(p => ({ ...p, timeline_days: parseInt(e.target.value) }))}
                        style={{ width: "100%", accentColor: "#395886" }} />
                      <div className="flex justify-between mt-1">
                        <span style={{ color: "#B1C9EF", fontSize: "0.7rem", fontWeight: 600 }}>5 days</span>
                        <span style={{ color: "#B1C9EF", fontSize: "0.7rem", fontWeight: 600 }}>60 days</span>
                      </div>
                    </div>
                    {/* Preview */}
                    <div className="p-4 rounded-xl bg-white border border-[#D5DEEF] shadow-sm">
                      <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800, color: "#628ECB", fontSize: "0.82rem", marginBottom: 10 }}>Signal Preview</p>
                      <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800, color: "#395886", fontSize: "1.1rem" }}>{form.title || "Untitled"}</p>
                      <p style={{ color: "#628ECB", fontSize: "0.75rem", fontFamily: "var(--font-dm-sans, sans-serif)", marginTop: 4, fontWeight: 600 }}>{form.role_family || "No Role Family"} · {form.timeline_days}d</p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {form.required_skills.map(s => (
                          <span key={s} style={{ background: "#F0F3FA", border: "1px solid #B1C9EF", color: "#395886", padding: "1px 7px", borderRadius: 4, fontSize: "0.62rem", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700 }}>{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Footer nav */}
                <div className="flex items-center justify-between mt-8 pt-6" style={{ borderTop: "1px solid #D5DEEF" }}>
                  <button onClick={() => step > 1 ? setStep(s => s - 1) : setShowForm(false)}
                    style={{ color: "#628ECB", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, fontSize: "0.85rem", background: "none", border: "none", cursor: "pointer" }} className="hover:text-[#395886]">
                    {step === 1 ? "Cancel" : "← Back"}
                  </button>
                  {step < 3 ? (
                    <button onClick={() => setStep(s => s + 1)}
                      disabled={step === 1 && (!form.title || !form.role_family)}
                      className="shadow-md"
                      style={{
                        background: "#395886", color: "white", border: "none", borderRadius: 10,
                        padding: "10px 24px", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700,
                        fontSize: "0.85rem", cursor: "pointer", opacity: (step === 1 && (!form.title || !form.role_family)) ? 0.4 : 1,
                      }}>
                      Continue →
                    </button>
                  ) : (
                    <button onClick={handleSubmit} className="shadow-md hover:opacity-90 transition-opacity"
                      style={{ background: "#395886", color: "white", border: "none", borderRadius: 10, padding: "10px 24px", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}>
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