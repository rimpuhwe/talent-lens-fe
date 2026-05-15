"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, Plus, Sparkles, BrainCircuit, 
  Target, Clock, Users, ArrowRight,
  FileText, Briefcase, Globe, Info, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { aiService, jobService } from "@/services/job.service";
import { useToast } from "@/components/shared/toast-context";
import type { JobSignal } from "@/types/api.types";

export default function JobSignals() {
  const { success, error: toastError, toast } = useToast();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [jobs, setJobs] = useState<JobSignal[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skills: [] as string[],
    timeline: "30",
    industry: "",
    companyAbout: "",
    experienceLevel: "",
    workType: "Remote",
  });

  React.useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await jobService.getJobs();
        setJobs(Array.isArray(data) ? data : []);
      } catch {
        setJobs([]);
      }
    };

    void loadJobs();
  }, []);

  const addSkill = (skill = skillInput) => {
    const nextSkill = skill.trim();
    if (!nextSkill || formData.skills.includes(nextSkill)) return;
    setFormData((current) => ({ ...current, skills: [...current.skills, nextSkill] }));
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    setFormData((current) => ({ ...current, skills: current.skills.filter((item) => item !== skill) }));
  };

  const handleAiDraft = async () => {
    setIsAiGenerating(true);
    try {
      const draft = await aiService.generateJobFull({
        job_position: formData.title || "Open role",
        industry_field: formData.industry || "Technology",
        company_about: formData.companyAbout || "A growing TalentLens recruiter",
        additional_instructions: formData.description || undefined,
      });

      setFormData({
        ...formData,
        description: draft.job_description || formData.description,
        skills: Array.isArray(draft.required_skills) ? draft.required_skills : formData.skills,
      });
      success("AI Draft Generated", "The intelligence engine drafted a job description and skills.");
    } catch (err) {
      toastError("AI Draft Failed", "The intelligence layer is temporarily unavailable.");
    } finally {
      setIsAiGenerating(false);
    }
  };

  const handlePublish = async () => {
    setLoading(true);

    try {
      await jobService.createJob({
        jobPosition: formData.title,
        jobDescription: formData.description,
        requiredSkills: formData.skills.map((skillSetName) => ({ skillSetName })),
        workType: formData.workType,
        experienceLevel: formData.experienceLevel || undefined,
      });

      const data = await jobService.getJobs();
      setJobs(Array.isArray(data) ? data : []);
      success("Signal Published", "Your job signal is live and ready for matching.");
      setStep(1);
    } catch (error: any) {
      toastError("Publish Failed", error?.response?.data?.message || "Could not publish this job signal.");
    } finally {
      setLoading(false);
    }
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
    <div className="min-h-screen bg-[#050A15] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tighter mb-2">Job Signals</h1>
            <p className="text-muted-foreground">Define your hiring requirements and let our engine find verified talent.</p>
          </div>
          <Button 
            onClick={() => setStep(2)}
            className="bg-accent-emerald hover:bg-emerald-600 text-white rounded-2xl px-8 py-7 font-black text-lg shadow-glow transition-all active:scale-95"
          >
            <Plus className="mr-2" size={20} /> Post New Signal
          </Button>
        </header>

        {/* Existing Signals List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {jobs.map((signal, i) => (
            <motion.div 
              key={signal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 hover:border-accent-emerald/30 transition-all group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-6">
                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  signal.jobStatus !== "CLOSED" ? "bg-accent-emerald/10 text-accent-emerald" : "bg-white/10 text-muted-foreground"
                }`}>
                  {signal.jobStatus || "OPEN"}
                </div>
                <div className="text-muted-foreground group-hover:text-white transition-colors">
                  <ArrowRight size={18} />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4">{signal.jobPosition}</h3>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users size={16} />
                  <span>{signal.skillsNeeded?.length ?? 0} Skills</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock size={16} />
                  <span>{signal.workType || "Flexible"}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Create New Signal Modal/Overlay */}
        <AnimatePresence>
          {step === 2 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[10000] bg-[#050A15]/95 backdrop-blur-xl flex items-center justify-center p-6 overflow-y-auto"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="w-full max-w-3xl bg-[#0A1120] border border-white/10 rounded-[3rem] p-10 shadow-2xl relative"
              >
                <button 
                  onClick={() => setStep(1)}
                  className="absolute top-8 right-8 text-muted-foreground hover:text-white transition-colors"
                >
                  <Plus className="rotate-45" size={32} />
                </button>

                <div className="flex items-center gap-3 text-accent-emerald mb-6">
                  <Sparkles size={24} />
                  <span className="text-xs font-black uppercase tracking-widest">New Intelligence Signal</span>
                </div>

                <h2 className="text-3xl font-black tracking-tight mb-10 leading-tight">
                  Define your <br /> <span className="text-accent-emerald text-4xl">Perfect Candidate.</span>
                </h2>

                <div className="space-y-8">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">Job Title</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Lead Systems Architect"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-accent-emerald transition-colors"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">Industry</label>
                      <input
                        type="text"
                        placeholder="Fintech, Healthcare, SaaS..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-accent-emerald transition-colors"
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">Experience Level</label>
                      <input
                        type="text"
                        placeholder="Mid, Senior, Principal"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-accent-emerald transition-colors"
                        value={formData.experienceLevel}
                        onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-xs font-black uppercase tracking-widest text-muted-foreground">Description & Requirements</label>
                      <button 
                        onClick={handleAiDraft}
                        disabled={isAiGenerating}
                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-accent-emerald hover:text-emerald-400 transition-colors"
                      >
                        {isAiGenerating ? (
                          <div className="w-3 h-3 border-2 border-accent-emerald/30 border-t-accent-emerald rounded-full animate-spin" />
                        ) : (
                          <BrainCircuit size={14} />
                        )}
                        Generate AI Draft
                      </button>
                    </div>
                    <textarea 
                      rows={6}
                      placeholder="Describe the role, responsibilities, and key outcomes..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-accent-emerald transition-colors resize-none"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">Target Hiring Timeline</label>
                      <select 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-accent-emerald transition-colors appearance-none cursor-pointer"
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      >
                        <option value="15">15 Days (Urgent)</option>
                        <option value="30">30 Days (Standard)</option>
                        <option value="60">60 Days (Strategic)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">Work Type</label>
                      <div className="flex items-center gap-3 h-[60px] px-6 bg-white/5 border border-white/10 rounded-2xl">
                        <Globe size={18} className="text-accent-emerald" />
                        <input
                          value={formData.workType}
                          onChange={(e) => setFormData({ ...formData, workType: e.target.value })}
                          className="min-w-0 flex-1 bg-transparent text-sm font-medium outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">Required Skills</label>
                    <div className="flex gap-3">
                      <input
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addSkill();
                          }
                        }}
                        placeholder="Add a skill"
                        className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-accent-emerald transition-colors"
                      />
                      <button type="button" onClick={() => addSkill()} className="rounded-2xl bg-white px-5 text-black">
                        <Plus size={18} />
                      </button>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {formData.skills.map((skill) => (
                        <span key={skill} className="inline-flex items-center gap-2 rounded-xl border border-accent-emerald/20 bg-accent-emerald/10 px-3 py-2 text-xs font-bold text-accent-emerald">
                          {skill}
                          <button type="button" onClick={() => removeSkill(skill)}>
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-6 pt-6">
                    <Button 
                      onClick={() => setStep(1)}
                      className="flex-1 bg-white/5 border border-white/10 text-white hover:bg-white/10 py-8 rounded-2xl font-black"
                    >
                      Save Draft
                    </Button>
                    <Button 
                      onClick={handlePublish}
                      disabled={loading || !formData.title || !formData.description || formData.skills.length === 0}
                      className="flex-[2] bg-accent-emerald hover:bg-emerald-600 text-white py-8 rounded-2xl font-black text-lg shadow-glow"
                    >
                      {loading ? "Publishing..." : "Publish Signal"}
                      <ArrowRight className="ml-2" size={20} />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
