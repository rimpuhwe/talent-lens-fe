"use client";

import Link from "next/link";
import { 
  ArrowRight, Users, FileText, CheckCircle, Clock, Plus, TrendingUp, 
  BarChart2, ShieldCheck, Sparkles, Zap, BrainCircuit, MessageSquare, 
  Scale, BookOpen, AlertCircle
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Sidebar from "@/components/layout/Sidebar";
import RecruiterTopNav from "../../../components/layout/TopNav";
import { StatCard, RecommendationBadge, SectionHeader } from "@/components/shared";
import { mockRecruiterProfile, mockJobSignals, mockShortlist } from "@/lib/mock-data";

const matchData = [
  { name: "Strong", value: 412, color: "#10B981" },
  { name: "Borderline", value: 287, color: "#F59E0B" },
  { name: "Not Yet", value: 548, color: "#F43F5E" },
];

const weekActivity = [
  { day: "Mon", matches: 12, tests: 4 },
  { day: "Tue", matches: 19, tests: 7 },
  { day: "Wed", matches: 8, tests: 2 },
  { day: "Thu", matches: 24, tests: 9 },
  { day: "Fri", matches: 16, tests: 5 },
];

// F8: Market Intelligence Data
const marketIntel = [
  { skill: "Data Storytelling", trend: "+24%", gap: "High Scarcity" },
  { skill: "React Next.js", trend: "+18%", gap: "Moderate Scarcity" },
  { skill: "Ethical Judgment", trend: "+42%", gap: "Critical Gap" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "rgba(255, 255, 255, 0.95)", backdropFilter: "blur(12px)", border: "1px solid #D5DEEF", borderRadius: 8, padding: "10px 14px", boxShadow: "0 4px 15px rgba(98,142,203,0.1)" }}>
        <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, color: "#395886", fontSize: "0.8rem", marginBottom: 4 }}>{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color, fontSize: "0.75rem", fontFamily: "var(--font-dm-sans, sans-serif)" }}>
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function RecruiterDashboard() {
  const profile = mockRecruiterProfile;

  return (
    // Background changed to the lightest color from your palette
    <div className="flex min-h-screen" style={{ background: "#F0F3FA" }}>
      <Sidebar role="recruiter" userName={profile.full_name} userLocation={profile.location} />

      <main className="flex-1 ml-64 p-8 bg-grid relative overflow-x-hidden">
        
        {/* F9: Floating AI Recruiter Assistant */}
        <div className="fixed bottom-8 right-8 z-50 group cursor-pointer">
          <div className="absolute inset-0 bg-[#8AAEED] rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
          {/* Assistant icon matching the palette */}
          <div className="relative bg-[#FFFFFF] border border-[#B1C9EF] p-4 rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform">
            <Sparkles size={24} className="text-[#628ECB]" />
          </div>
        </div>

        {/* Header & F12: Role Template Library Entry */}
        <div className="flex items-start justify-between mb-8 animate-fade-up">
          <div>
            <p className="flex items-center gap-2" style={{ color: "#628ECB", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              <ShieldCheck size={14} /> Evidence-First Intelligence
            </p>
            {/* Headers now use the darkest navy from the palette */}
            <h1 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800, fontSize: "1.75rem", color: "#395886", letterSpacing: "-0.02em", marginTop: 4 }}>
              Decision Workspace, {profile.full_name.split(" ")[0]}
            </h1>
            <p style={{ color: "#628ECB", fontSize: "0.85rem", fontFamily: "var(--font-dm-sans, sans-serif)", marginTop: 2 }}>
              {new Date().toLocaleDateString("en-GB", { weekday: "long", month: "long", day: "numeric" })}
            </p>
          </div>
          <div className="flex items-center gap-3">
          
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <StatCard label="Active Signals" value={mockJobSignals.filter(j => j.status === "active").length} delta="+1 this week" deltaType="up" icon={FileText} accent="#628ECB" delay={0} />
          <StatCard label="Total Matches" value="28" delta="Across all signals" deltaType="neutral" icon={Users} accent="#10B981" delay={100} />
          <StatCard label="Hidden Gems Found" value="12" delta="Non-traditional backgrounds" deltaType="up" icon={Zap} accent="#F59E0B" delay={200} />
          <StatCard label="System Trust Score" value="94%" delta="Based on 4 modules" deltaType="up" icon={BrainCircuit} accent="#A855F7" delay={300} />
        </div>

        {/* New Layer: F7 Fairness Panel & F8 Market Intelligence */}
        <div className="grid grid-cols-12 gap-6 mb-8">
          {/* F7: Fairness & Transparency Panel - Uses pure white card base */}
          <div className="col-span-4 card-base p-6 border border-[#B1C9EF] bg-[#FFFFFF] shadow-sm animate-fade-up" style={{ animationDelay: "150ms", borderRadius: "1rem" }}>
            <div className="flex items-center gap-2 mb-4">
              <Scale size={18} className="text-[#395886]" />
              <h2 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "#395886", fontSize: "1.1rem" }}>Fairness Audit</h2>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle size={14} className="text-[#628ECB] mt-0.5" />
                <p style={{ color: "#628ECB", fontSize: "0.8rem", lineHeight: "1.4" }}>All current evaluations are <strong className="text-[#395886]">degree-blind</strong>.</p>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle size={14} className="text-[#628ECB] mt-0.5" />
                <p style={{ color: "#628ECB", fontSize: "0.8rem", lineHeight: "1.4" }}>Employment-gap penalties have been <strong className="text-[#395886]">neutralized</strong>.</p>
              </li>
            </ul>
          </div>

          {/* F8: Market Intelligence Dashboard */}
          <div className="col-span-8 card-base p-6 bg-[#FFFFFF] border border-[#D5DEEF] shadow-sm animate-fade-up" style={{ animationDelay: "180ms", borderRadius: "1rem" }}>
            <div className="mb-4">
              <h2 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "#395886", fontSize: "1.1rem" }}>Kigali Talent Market Intelligence</h2>
              <p style={{ color: "#628ECB", fontSize: "0.85rem" }}>Live insights from the Evidence Engine</p>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {marketIntel.map((intel, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#F0F3FA] border border-[#D5DEEF]">
                  <p style={{ fontFamily: "var(--font-syne, sans-serif)", color: "#395886", fontWeight: 700, fontSize: "0.85rem" }}>{intel.skill}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[#628ECB] text-xs font-bold">{intel.trend} Demand</span>
                    <span className="text-[#395886] text-[10px] uppercase tracking-wider font-semibold">{intel.gap}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-12 gap-6 mb-8">
          {/* Weekly activity */}
          <div className="col-span-7 card-base p-6 bg-[#FFFFFF] border border-[#D5DEEF] shadow-sm animate-fade-up" style={{ animationDelay: "200ms", borderRadius: "1rem" }}>
            <div className="mb-6">
              <h2 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "#395886", fontSize: "1.1rem" }}>Validation Throughput</h2>
              <p style={{ color: "#628ECB", fontSize: "0.85rem" }}>Missions generated & gap tests triggered</p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weekActivity} barSize={12} barGap={4}>
                {/* Palette color used for grids */}
                <CartesianGrid strokeDasharray="3 3" stroke="#D5DEEF" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: "#628ECB", fontSize: 11, fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#628ECB", fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "#F0F3FA" }} />
                {/* Bars use the medium and light blue from the palette */}
                <Bar dataKey="matches" fill="#395886" name="Missions" radius={[3, 3, 0, 0]} fillOpacity={0.9} />
                <Bar dataKey="tests" fill="#8AAEED" name="Gap Tests" radius={[3, 3, 0, 0]} fillOpacity={0.9} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Match distribution */}
          <div className="col-span-5 card-base p-6 bg-[#FFFFFF] border border-[#D5DEEF] shadow-sm animate-fade-up" style={{ animationDelay: "250ms", borderRadius: "1rem" }}>
            <div className="mb-4">
              <h2 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "#395886", fontSize: "1.1rem" }}>Evidence Quality Distribution</h2>
              <p style={{ color: "#628ECB", fontSize: "0.85rem" }}>Across all verified talent pools</p>
            </div>
            <div className="space-y-4 mt-4">
              {matchData.map((item) => {
                const total = matchData.reduce((s, d) => s + d.value, 0);
                const pct = Math.round((item.value / total) * 100);
                return (
                  <div key={item.name}>
                    <div className="flex justify-between mb-1.5">
                      <span style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, color: "#628ECB", fontSize: "0.78rem" }}>{item.name} Signal</span>
                      <div className="flex items-center gap-2">
                        <span style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "#395886", fontSize: "0.82rem" }}>{item.value}</span>
                        <span style={{ color: "#628ECB", fontSize: "0.72rem" }}>{pct}%</span>
                      </div>
                    </div>
                    {/* Track background uses light palette color */}
                    <div style={{ height: 6, background: "#D5DEEF", borderRadius: 6 }}>
                      <div style={{ width: `${pct}%`, height: "100%", background: item.color, borderRadius: 6, transition: "width 1s ease" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* F4: Hidden Talent Highlight Banner - Gradient using the palette blues */}
        <div className="mb-6 p-[2px] rounded-2xl bg-gradient-to-r from-[#628ECB] via-[#8AAEED] to-[#B1C9EF] shadow-md animate-fade-up" style={{ animationDelay: "280ms" }}>
          <div className="bg-[#FFFFFF] rounded-xl p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F0F3FA] flex items-center justify-center">
                <Sparkles size={20} className="text-[#395886]" />
              </div>
              <div>
                <h3 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "#395886", fontSize: "1rem" }}>Hidden Talent Alert</h3>
                <p style={{ color: "#628ECB", fontSize: "0.8rem" }}>The AI surfaced 3 candidates with non-traditional backgrounds scoring in the top 5% for Learning Agility.</p>
              </div>
            </div>
            {/* Soft button matching the light theme */}
            <button className="px-4 py-2 bg-[#F0F3FA] hover:bg-[#D5DEEF] text-[#395886] text-xs font-bold rounded-lg transition-colors border border-[#B1C9EF]">
              Review Anomalies
            </button>
          </div>
        </div>

        {/* F1, F3, F5, F6, F11 integrated into Recent Match Activity */}
        <div className="card-base p-6 bg-[#FFFFFF] border border-[#D5DEEF] shadow-sm animate-fade-up" style={{ animationDelay: "350ms", borderRadius: "1rem" }}>
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "#395886", fontSize: "1.1rem" }}>Decision Workspace: Recent Signals</h2>
              <p style={{ color: "#628ECB", fontSize: "0.85rem" }}>Candidates evaluated and ready for review</p>
            </div>
            {/* F6: Comparison Mode Toggle */}
            <button className="text-xs flex items-center gap-2 px-3 py-1.5 rounded bg-[#F0F3FA] text-[#395886] border border-[#B1C9EF] hover:bg-[#D5DEEF] transition-colors font-semibold">
              <CheckCircle size={12} /> Compare Mode
            </button>
          </div>
          
          <div className="space-y-3">
            {mockShortlist.map((entry, idx) => (
              <div key={entry.id} className="group relative flex items-center gap-4 p-4 rounded-xl transition-all hover:bg-[#F0F3FA] bg-white shadow-sm" style={{ border: "1px solid #D5DEEF" }}>
                
                {/* Candidate Avatar */}
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 border border-[#B1C9EF]"
                  style={{ background: "#D5DEEF", color: "#395886", fontFamily: "var(--font-syne, sans-serif)" }}>
                  {entry.candidate?.full_name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>

                {/* Candidate Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "#395886", fontSize: "0.95rem" }}>
                      {entry.candidate?.full_name}
                    </p>
                    {/* F2: AI Confidence Indicator */}
                    {idx === 0 && (
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-[#10B98115] text-[#10B981] border border-[#10B98130]">
                        High Confidence
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <p style={{ color: "#628ECB", fontSize: "0.75rem", fontFamily: "var(--font-dm-sans, sans-serif)", fontWeight: 500 }}>
                      {entry.candidate?.role_family}
                    </p>
                    {/* F5: Growth Timeline Spark */}
                    <p className="flex items-center gap-1 text-[10px] text-[#628ECB] font-bold">
                      <TrendingUp size={10} /> +12% Growth
                    </p>
                  </div>
                </div>

                {/* F11: Quick Actions (Visible on Hover) */}
                <div className="hidden group-hover:flex items-center gap-2 absolute right-[250px] bg-[#F0F3FA] pl-4 blur-fade-in shadow-[-15px_0_15px_#F0F3FA]">
                  {/* F3: Smart Interview Prep */}
                  <button className="p-1.5 bg-[#FFFFFF] hover:bg-[#8AAEED] text-[#628ECB] hover:text-[#FFFFFF] rounded transition-colors tooltip-trigger border border-[#D5DEEF]" title="Generate Interview Questions">
                    <MessageSquare size={14} />
                  </button>
                  {/* F1: Send Gap Test */}
                  <button className="p-1.5 bg-[#FFFFFF] hover:bg-[#628ECB] text-[#628ECB] hover:text-[#FFFFFF] rounded transition-colors border border-[#D5DEEF]" title="Send Targeted Gap Test">
                    <AlertCircle size={14} />
                  </button>
                </div>

                {/* Match Score */}
                <div className="flex items-center gap-4 shrink-0 transition-transform group-hover:translate-x-1">
                  <div className="text-right">
                    <span style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800, color: "#395886", fontSize: "1.1rem" }}>
                      {entry.overall_match}<span style={{ color: "#628ECB", fontSize: "0.72rem" }}>%</span>
                    </span>
                    <p className="text-[9px] text-[#628ECB] uppercase tracking-wider font-bold">Signal Match</p>
                  </div>
                  <RecommendationBadge recommendation={entry.recommendation} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}