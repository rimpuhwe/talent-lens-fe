"use client";

import { 
  Target, BookOpen, User, ArrowRight, Clock, Star, Flame, 
  CheckCircle, TrendingUp, Sparkles, ShieldCheck, Zap, ArrowUpRight 
} from "lucide-react";
import Link from "next/link";
import { 
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip 
} from "recharts";
import Sidebar from "@/components/layout/Sidebar";
import { StatCard, ScoreRing, ModuleBadge, ProgressBar, SectionHeader } from "@/components/shared";
import { mockCandidateProfile, mockTalentSignal, mockMissions, mockMissionAttempts } from "@/lib/mock-data";

// F5: Mock Growth Data showing TSS improvement over time
const growthData = [
  { month: "Mar", tss: 58 },
  { month: "Apr", tss: 66 },
  { month: "May", tss: 74 },
];

const radarData = [
  { subject: "Skill Proof", A: 74 },
  { subject: "Judgment", A: 68 },
  { subject: "Learning", A: 82 },
  { subject: "Communication", A: 71 },
];

export default function CandidateDashboard() {
  const profile = mockCandidateProfile;

  return (
    <div className="flex min-h-screen" style={{ background: "#F0F3FA" }}>
      <Sidebar role="candidate" userName={profile.full_name} userLocation={profile.location} />

      <main className="flex-1 ml-0 lg:ml-64 p-4 sm:p-6 md:p-8 bg-grid relative overflow-x-hidden w-full">
        
        {/* Header Section */}
        <div className="mb-8 animate-fade-up">
          <p className="flex items-center gap-1.5" style={{ color: "#628ECB", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            <ShieldCheck size={14} className="text-[#10B981]" /> Evidence-First Intelligence Passport
          </p>
          <h1 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800, fontSize: "1.75rem", color: "#395886", letterSpacing: "-0.02em", marginTop: 4 }}>
            Evidence Dashboard, {profile.full_name.split(" ")[0]}
          </h1>
        </div>

        {/* F2 & F4: Key Intelligence Metrics - Fully Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          {/* Overall TSS */}
          <div className="bg-white p-5 rounded-2xl border border-[#D5DEEF] shadow-sm animate-fade-up" style={{ animationDelay: '0ms' }}>
            <div className="flex justify-between items-start mb-2">
              <p style={{ color: "#628ECB", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase" }}>Overall TSS</p>
              <div className="p-2 rounded-lg bg-[#F0F3FA]"><Star size={16} className="text-[#395886]" /></div>
            </div>
            <div className="flex items-baseline gap-2">
              <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#395886", fontFamily: "var(--font-syne, sans-serif)" }}>74</h2>
              <span className="text-[#10B981] text-xs font-bold flex items-center"><ArrowUpRight size={12}/> +8 pts</span>
            </div>
          </div>

          {/* Evidence Strength (F2: Trust Indicator) */}
          <div className="bg-white p-5 rounded-2xl border border-[#D5DEEF] shadow-sm animate-fade-up" style={{ animationDelay: '100ms' }}>
            <div className="flex justify-between items-start mb-2">
              <p style={{ color: "#628ECB", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase" }}>Evidence Strength</p>
              <div className="p-2 rounded-lg bg-[#F0F3FA]"><ShieldCheck size={16} className="text-[#10B981]" /></div>
            </div>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#10B981", fontFamily: "var(--font-syne, sans-serif)" }}>High</h2>
            <p style={{ color: "#628ECB", fontSize: "0.7rem", fontWeight: 600 }}>4 Modules Verified</p>
          </div>

          {/* Global Rank */}
          <div className="bg-white p-5 rounded-2xl border border-[#D5DEEF] shadow-sm animate-fade-up" style={{ animationDelay: '200ms' }}>
            <div className="flex justify-between items-start mb-2">
              <p style={{ color: "#628ECB", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase" }}>Global Rank</p>
              <div className="p-2 rounded-lg bg-[#F0F3FA]"><Target size={16} className="text-[#628ECB]" /></div>
            </div>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#395886", fontFamily: "var(--font-syne, sans-serif)" }}>Top 12%</h2>
            <p style={{ color: "#628ECB", fontSize: "0.7rem", fontWeight: 600 }}>In Skill Proof</p>
          </div>

          {/* Learning Speed (F4: Hidden Talent Insight) */}
          <div className="bg-white p-5 rounded-2xl border border-[#D5DEEF] shadow-sm animate-fade-up" style={{ animationDelay: '300ms' }}>
            <div className="flex justify-between items-start mb-2">
              <p style={{ color: "#628ECB", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase" }}>Learning Speed</p>
              <div className="p-2 rounded-lg bg-[#FFF9F2]"><Zap size={16} className="text-[#F59E0B]" /></div>
            </div>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#F59E0B", fontFamily: "var(--font-syne, sans-serif)" }}>Elite</h2>
            <p style={{ color: "#628ECB", fontSize: "0.7rem", fontWeight: 600 }}>Top 5% Agility</p>
          </div>
        </div>

        {/* Main Intelligence Grid - F5 & F6 Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          
          {/* F6: Intelligence Profile (Radar) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-[#D5DEEF] shadow-sm animate-fade-up" style={{ animationDelay: '400ms' }}>
            <SectionHeader title="Intelligence Profile" subtitle="Your 4-dimension evidence map" />
            <div className="h-[280px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#D5DEEF" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "#395886", fontSize: 11, fontWeight: 700, fontFamily: "var(--font-syne, sans-serif)" }} />
                  <Radar name="Score" dataKey="A" stroke="#395886" fill="#8AAEED" fillOpacity={0.4} strokeWidth={3} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            {/* Meaningful Dimension Legend */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-6 border-t border-[#F0F3FA] pt-6">
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: "#10B981" }}></div>
                  <p className="text-[10px] font-bold text-[#628ECB] uppercase">Skill Proof</p>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: "#F59E0B" }}></div>
                  <p className="text-[10px] font-bold text-[#628ECB] uppercase">Scenario Judgment</p>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: "#395886" }}></div>
                  <p className="text-[10px] font-bold text-[#628ECB] uppercase">Learning Agility</p>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: "#A855F7" }}></div>
                  <p className="text-[10px] font-bold text-[#628ECB] uppercase">Communication</p>
               </div>
            </div>
          </div>

          {/* F5: Growth Timeline (Line Chart) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-[#D5DEEF] shadow-sm animate-fade-up h-full" style={{ animationDelay: '500ms' }}>
              <SectionHeader title="Growth Timeline" subtitle="Evidence Score improvement over time" />
              <div className="h-[220px] mt-8">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={growthData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F3FA" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#628ECB', fontSize: 12, fontWeight: 600}} dy={10} />
                    <YAxis hide domain={[0, 100]} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(57,88,134,0.1)' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="tss" 
                      stroke="#395886" 
                      strokeWidth={4} 
                      dot={{ r: 6, fill: "#395886", strokeWidth: 2, stroke: "#fff" }} 
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              {/* F11: Quick Action System */}
              <div className="mt-8 p-5 rounded-2xl bg-[#F0F3FA] border border-[#B1C9EF] flex items-center justify-between">
                <div>
                  <p style={{ color: "#395886", fontWeight: 700, fontSize: "0.9rem" }}>Ready for your next leap?</p>
                  <p style={{ color: "#628ECB", fontSize: "0.75rem" }}>Improve your Communication score to boost TSS.</p>
                </div>
                <Link href="/missions" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#395886] text-white text-xs font-bold hover:opacity-90 transition-all">
                  Next Mission <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Modules Section */}
        <div className="bg-white p-6 rounded-2xl border border-[#D5DEEF] shadow-sm animate-fade-up mb-8">
          <SectionHeader title="Evidence Modules" subtitle="Complete missions to verify your talent signal" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Logic kept from your modules but styled for the new palette */}
            {[
              { label: "Skill Proof", score: 74, color: "#10B981", icon: Target },
              { label: "Scenario Judgment", score: 68, color: "#F59E0B", icon: BookOpen },
              { label: "Learning Agility", score: 82, color: "#395886", icon: Flame },
              { label: "Communication", score: 0, color: "#D5DEEF", icon: User },
            ].map((mod) => (
              <div key={mod.label} className="p-4 rounded-xl bg-[#F0F3FA]/50 border border-[#D5DEEF]">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white border border-[#D5DEEF]">
                      <mod.icon size={16} color={mod.score > 0 ? mod.color : "#628ECB"} />
                    </div>
                    <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "#395886", fontSize: "0.85rem" }}>{mod.label}</p>
                  </div>
                  <p style={{ fontWeight: 800, color: "#395886", fontSize: "0.9rem" }}>{mod.score > 0 ? `${mod.score}%` : "Pending"}</p>
                </div>
                <ProgressBar value={mod.score} color={mod.color} height={6} />
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}