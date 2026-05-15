"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  User, Mail, MapPin, Briefcase, 
  Upload, CheckCircle2, Shield, Globe, 
  Linkedin, Github, FileText, Camera
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { profileService } from "@/services/profile.service";
import { useToast } from "@/components/shared/toast-context";

export default function CandidateProfile() {
  const { success, error: toastError } = useToast();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // API call to update profile
      success("Passport Updated", "Your talent signals have been successfully synchronized.");
      setShowSuccess(true);
    } catch (err: any) {
      toastError("Update Failed", "Could not synchronize with the intelligence layer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050A15] text-white p-8">
      <div className="mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-black tracking-tighter mb-2">Candidate Passport</h1>
          <p className="text-muted-foreground">Manage your verifiable identity and talent signals.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Avatar & Quick Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-accent-emerald/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-32 h-32 rounded-[2.5rem] bg-accent-emerald/10 border border-accent-emerald/20 flex items-center justify-center mx-auto mb-6 relative">
                  <User size={64} className="text-accent-emerald" />
                  <button className="absolute bottom-0 right-0 p-2 bg-white text-black rounded-xl shadow-lg hover:scale-110 transition-transform">
                    <Camera size={16} />
                  </button>
                </div>
                <h2 className="text-xl font-bold mb-1">Derrick Mugisha</h2>
                <p className="text-accent-emerald text-sm font-black uppercase tracking-widest mb-6">Senior Frontend Engineer</p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <MapPin size={16} className="text-accent-emerald" />
                    <span>Kigali, Rwanda</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Mail size={16} className="text-accent-emerald" />
                    <span>derrick@example.com</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Identity Verification</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield size={18} className="text-accent-emerald" />
                  <span className="text-sm font-medium">Verified Account</span>
                </div>
                <CheckCircle2 size={18} className="text-accent-emerald" />
              </div>
              <Button className="w-full bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-2xl py-6">
                Download Passport PDF
              </Button>
            </div>
          </div>

          {/* Right Column: Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleUpdate} className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">Professional Title</label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input 
                      type="text" 
                      defaultValue="Senior Frontend Engineer"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-accent-emerald transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">Portfolio Website</label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input 
                      type="url" 
                      placeholder="https://yourportfolio.com"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-accent-emerald transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">Bio / Summary</label>
                <textarea 
                  rows={4}
                  defaultValue="Passionate engineer with 5+ years of experience building scalable web applications. Expert in React, TypeScript, and high-fidelity animations."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-accent-emerald transition-colors resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">LinkedIn URL</label>
                  <div className="relative">
                    <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input 
                      type="url" 
                      defaultValue="https://linkedin.com/in/derrick"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-accent-emerald transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">GitHub URL</label>
                  <div className="relative">
                    <Github className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input 
                      type="url" 
                      defaultValue="https://github.com/derrick"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-accent-emerald transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <label className="block text-xs font-black uppercase tracking-widest text-muted-foreground mb-6">Upload Resume / CV</label>
                <div className="border-2 border-dashed border-white/10 rounded-[2rem] p-10 text-center hover:border-accent-emerald transition-colors group cursor-pointer">
                  <Upload size={32} className="text-muted-foreground group-hover:text-accent-emerald mx-auto mb-4 transition-colors" />
                  <p className="text-sm font-medium mb-1">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground">PDF, DOCX up to 10MB</p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-4 pt-8">
                {showSuccess && (
                  <motion.p 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-accent-emerald text-sm font-bold flex items-center gap-2"
                  >
                    <CheckCircle2 size={16} /> Changes saved successfully!
                  </motion.p>
                )}
                <Button 
                  type="submit"
                  disabled={loading}
                  className="bg-accent-emerald hover:bg-emerald-600 text-white px-10 py-7 rounded-2xl font-black text-lg shadow-glow"
                >
                  {loading ? "Updating..." : "Save Passport"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}