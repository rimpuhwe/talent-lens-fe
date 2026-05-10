"use client";

import { useState, useEffect } from "react";
import { 
  Briefcase, 
  ChevronRight, 
  Lock, 
  PlayCircle,
  AlertCircle,
  FileText
} from "lucide-react";
import Link from "next/link";
import Sidebar from "@/components/layout/Sidebar";
import { mockCandidateProfile } from "@/lib/mock-data";

// --- ONBOARDING MODAL COMPONENT ---
const OnboardingModal = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(1);

  const steps = [
    { 
      title: "Complete Your Profile", 
      desc: "To get started, we need your baseline. Please update your profile with your LinkedIn URL, Professional Summary, Birth Date, Biography, Gender, CV upload, Target Job Roles, and Work Conditions." 
    },
    { 
      title: "The Evidence Proof", 
      desc: "Actions speak louder than CVs. Complete our 4 core modules (Skill Proof, Judgment, Communication, Learning Agility) to generate your verified Talent Passport." 
    },
    { 
      title: "Get Matched", 
      desc: "Once your Passport is generated, our AI automatically filters and matches you with top corporate roles that perfectly align with your verified capabilities." 
    },
    { 
      title: "Continuous Growth", 
      desc: "Not a 100% match yet? Use the Learning Agility tab to view your Skill Gap Report and access targeted upskilling recommendations." 
    }
  ];

  return (
    <div className="fixed inset-0 bg-slate-900/85 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 animate-fade-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Welcome to TalentLens</h2>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
            Step {step} of 4
          </span>
        </div>
        
        <div className="h-1.5 w-full bg-slate-100 rounded-full mb-8 overflow-hidden">
          <div 
            className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        <div className="min-h-[130px]">
          <h3 className="text-xl font-bold text-slate-800 mb-3">{steps[step - 1].title}</h3>
          <p className="text-slate-600 leading-relaxed text-sm">{steps[step - 1].desc}</p>
        </div>

        <div className="mt-8 flex justify-end">
          {step < 4 ? (
            <button 
              onClick={() => setStep(prev => prev + 1)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center transition-colors shadow-sm"
            >
              Continue <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          ) : (
            <button 
              onClick={onComplete}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm"
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default function CandidateDashboard() {
  const profile = mockCandidateProfile;
  
  const [showOnboarding, setShowOnboarding] = useState(false); 
  const [isClient, setIsClient] = useState(false);
  const [profileCompletePercent, setProfileCompletePercent] = useState(0); 
  
  const [stats, setStats] = useState({
    applications: 0,
    assessmentsCompleted: 0,
    profileViews: 0
  });

  useEffect(() => {
    setIsClient(true);
    const hasSeen = localStorage.getItem("hasSeenOnboarding_v1");
    if (!hasSeen) {
      setShowOnboarding(true); 
    }
  }, []);

  const completeOnboarding = () => {
    localStorage.setItem("hasSeenOnboarding_v1", "true");
    setShowOnboarding(false);
  };

  const allJobs = [
    { id: 1, title: "Senior Data Analyst", company: "Kigali Tech Partners", location: "Kigali, Rwanda", type: "Full-time", tags: ["Data", "SQL"] },
    { id: 2, title: "Frontend Developer", company: "Umurava", location: "Remote", type: "Contract", tags: ["React", "UI/UX"] },
    { id: 3, title: "Financial Auditor", company: "Pan-African Bank", location: "Kigali, Rwanda", type: "Full-time", tags: ["Finance", "Excel"] },
    { id: 4, title: "Backend Engineer", company: "FinTech Africa", location: "Remote", type: "Full-time", tags: ["Java", "Spring Boot"] },
  ];

  const displayedJobs = profileCompletePercent === 100 
    ? allJobs.filter(job => job.title.includes("Data") || job.title.includes("Developer")) 
    : allJobs; 

  if (!isClient) return null; 

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
      {showOnboarding && <OnboardingModal onComplete={completeOnboarding} />}
      <Sidebar role="candidate" userName={profile.full_name} userLocation={profile.location} />

      <main className="flex-1 ml-64 p-8">
        <header className="mb-8 flex justify-between items-center animate-fade-up">
          <div>
            <p className="text-blue-600 font-bold text-xs tracking-widest uppercase mb-1">Candidate Portal</p>
            <h1 className="font-extrabold text-3xl text-slate-900 tracking-tight">Dashboard</h1>
            <p className="text-slate-500 text-sm mt-1">Manage your career evidence and job matches.</p>
          </div>
          <div className="flex items-center space-x-4">
             <div className="w-10 h-10 bg-slate-200 border border-slate-300 rounded-full flex items-center justify-center text-slate-600 font-bold shadow-sm">
               {profile.full_name.split(" ").map(n => n[0]).join("")}
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-up delay-100">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-sm font-semibold text-slate-500">Active Applications</p>
            <p className="text-4xl font-extrabold text-slate-900 mt-2">{stats.applications}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-sm font-semibold text-slate-500">Modules Completed</p>
            <p className="text-4xl font-extrabold text-slate-900 mt-2">{stats.assessmentsCompleted}<span className="text-xl text-slate-400">/4</span></p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-sm font-semibold text-slate-500">Profile Views</p>
            <p className="text-4xl font-extrabold text-slate-900 mt-2">{stats.profileViews}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8 animate-fade-up delay-200">
            {profileCompletePercent < 100 && (
              <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0 w-full pr-4">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertCircle size={18} className="text-blue-600" />
                    <h3 className="text-lg font-bold text-blue-900">Profile {profileCompletePercent}% Complete</h3>
                  </div>
                  <p className="text-blue-700 text-sm mt-1">
                    Add your LinkedIn, CV, Roles, and Work Conditions to unlock AI matching.
                  </p>
                  <div className="w-full bg-blue-200/50 h-2 rounded-full mt-4">
                    <div className="bg-blue-600 h-2 rounded-full transition-all duration-1000" style={{ width: `${profileCompletePercent}%` }}></div>
                  </div>
                </div>
                <button 
                  onClick={() => setProfileCompletePercent(100)} 
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 whitespace-nowrap shadow-sm transition-colors"
                >
                  Complete Profile
                </button>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    {profileCompletePercent === 100 ? "Jobs Matched to Your Roles" : "All Available Jobs"}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {profileCompletePercent === 100 ? "Filtered by your verified capabilities." : "Showing all platform opportunities."}
                  </p>
                </div>
                {profileCompletePercent < 100 && (
                  <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-md font-bold flex items-center uppercase tracking-wider">
                    <Lock className="w-3 h-3 mr-1.5" /> Unfiltered
                  </span>
                )}
              </div>
              
              <div className="space-y-4">
                {displayedJobs.map((job) => (
                  <div key={job.id} className="p-5 border border-slate-100 rounded-xl hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group bg-slate-50/50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{job.title}</h4>
                        <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                          <Briefcase size={14}/> {job.company} · {job.location}
                        </p>
                      </div>
                      <button className="text-blue-600 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                        View <ChevronRight size={14} className="ml-0.5"/>
                      </button>
                    </div>
                    <div className="flex gap-2 mt-4">
                      {job.tags.map(tag => (
                        <span key={tag} className="px-2.5 py-1 bg-white border border-slate-200 text-slate-600 rounded text-[10px] font-bold uppercase tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="animate-fade-up delay-300">
            <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 shadow-xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 opacity-20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
              
              <FileText className="w-8 h-8 text-blue-400 mb-4" />
              <h2 className="font-extrabold text-2xl tracking-tight mb-2">Build Your Passport</h2>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                Companies no longer read CVs. Prove what you can do by completing the AI-evaluated Evidence Modules.
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600" /> Skill Proof
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600" /> Professional Judgment
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600" /> Learning Agility
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600" /> Communication
                </div>
              </div>

              {profileCompletePercent === 100 ? (
                <Link href="/missions" className="w-full flex justify-center items-center gap-2 bg-blue-600 text-white font-bold px-6 py-3.5 rounded-xl hover:bg-blue-500 transition-colors shadow-lg">
                  <PlayCircle size={18} /> Start Assessments
                </Link>
              ) : (
                <button disabled className="w-full flex justify-center items-center gap-2 bg-slate-800 text-slate-500 font-bold px-6 py-3.5 rounded-xl cursor-not-allowed border border-slate-700">
                  <Lock size={16} /> Complete Profile First
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}