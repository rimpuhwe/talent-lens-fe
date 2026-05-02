"use client";

import { Download, Globe, TrendingUp, AlertCircle, CheckCircle, Users } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ScatterChart, Scatter, ZAxis, AreaChart, Area, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis
} from "recharts";
import Sidebar from "@/components/layout/Sidebar";
import { SectionHeader, StatCard } from "@/components/shared";
import { mockAdminProfile, mockPlatformStats } from "@/lib/mock-data";

const genderData = [
  { role: "Data & Analytics", male: 58, female: 42 },
  { role: "Engineering", male: 71, female: 29 },
  { role: "Design", male: 38, female: 62 },
  { role: "Marketing", male: 44, female: 56 },
  { role: "Product", male: 55, female: 45 },
];

const backgroundData = [
  { background: "University", tss: 71, count: 480 },
  { background: "TVET", tss: 69, count: 312 },
  { background: "Self-taught", tss: 74, count: 287 },
  { background: "Bootcamp", tss: 76, count: 168 },
];

const regionData = [
  { region: "Kigali", candidates: 687, hires: 89 },
  { region: "Northern", candidates: 198, hires: 21 },
  { region: "Southern", candidates: 167, hires: 18 },
  { region: "Eastern", candidates: 124, hires: 14 },
  { region: "Western", candidates: 71, hires: 7 },
];

const growthVsScore = [
  { name: "Diane U.", momentum: 22, score: 74 },
  { name: "Jean-Pierre H.", momentum: 8, score: 76 },
  { name: "Patrick N.", momentum: 31, score: 82 },
  { name: "Solange U.", momentum: 18, score: 89 },
  { name: "Aline I.", momentum: 14, score: 71 },
  { name: "Vestine M.", momentum: 25, score: 77 },
  { name: "Eric M.", momentum: 9, score: 58 },
  { name: "Claudine M.", momentum: 19, score: 67 },
];

const hirePredictors = [
  { factor: "Learning Agility", importance: 88 },
  { factor: "Skill Proof Score", importance: 82 },
  { factor: "Work Behavior", importance: 74 },
  { factor: "Communication", importance: 68 },
  { factor: "Gap Test Result", importance: 91 },
  { factor: "Momentum Signal", importance: 79 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#162033", border: "1px solid #253350", borderRadius: 8, padding: "10px 14px" }}>
      <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, color: "white", fontSize: "0.8rem", marginBottom: 4 }}>{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color ?? "#94A3B8", fontSize: "0.75rem", fontFamily: "var(--font-dm-sans, sans-serif)" }}>
          {p.name}: {p.value}{p.name?.includes("Score") || p.name?.includes("TSS") || p.name?.includes("Importance") ? "" : ""}
        </p>
      ))}
    </div>
  );
};

export default function AdminInsightsPage() {
  return (
    <div className="flex min-h-screen" style={{ background: "#080D1A" }}>
      <Sidebar role="admin" userName={mockAdminProfile.full_name} />

      <main className="flex-1 ml-64 p-8 bg-grid">
        {/* Header */}
        <div className="flex items-start justify-between mb-8 animate-fade-up">
          <div>
            <p style={{ color: "#F59E0B", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              System 3 · Intelligence Layer
            </p>
            <h1 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800, fontSize: "1.75rem", color: "white", letterSpacing: "-0.02em", marginTop: 4 }}>
              Rwanda Talent Intelligence
            </h1>
            <p style={{ color: "#4A5C74", fontSize: "0.85rem", fontFamily: "var(--font-dm-sans, sans-serif)", marginTop: 2 }}>
              Aggregated &amp; anonymised · Updated in real-time
            </p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm"
            style={{ background: "#F59E0B", color: "#080D1A", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700 }}>
            <Download size={15} /> Export Report
          </button>
        </div>

        {/* Insight KPIs */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <StatCard label="Data Points" value="48,320" delta="Across all sessions" deltaType="neutral" icon={Globe} accent="#F59E0B" delay={0} />
          <StatCard label="Avg TSS" value={mockPlatformStats.avg_tss} delta="+3 pts this month" deltaType="up" icon={TrendingUp} accent="#10B981" delay={100} />
          <StatCard label="Top Skill Gap" value="SQL" delta="33pt demand vs supply" deltaType="down" icon={AlertCircle} accent="#F43F5E" delay={200} />
          <StatCard label="Best Predictor" value="Gap Test" delta="91% hire correlation" deltaType="up" icon={CheckCircle} accent="#3B82F6" delay={300} />
        </div>

        {/* Key insight callout */}
        <div className="card-base p-5 mb-8 animate-fade-up" style={{ animationDelay: "200ms", borderColor: "#F59E0B30", background: "linear-gradient(135deg, #F59E0B08 0%, #080D1A 60%)" }}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#F59E0B20", border: "1px solid #F59E0B40" }}>
              <Globe size={18} color="#F59E0B" />
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "#F59E0B", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>
                Key Rwanda Insight — December 2024
              </p>
              <p style={{ color: "#EDF2F7", fontSize: "0.95rem", fontFamily: "var(--font-dm-sans, sans-serif)", lineHeight: 1.6 }}>
                Self-taught professionals on TalentLens outperform university graduates by an average of <strong style={{ color: "#F59E0B" }}>3 TSS points</strong> — despite applying in lower volumes. This confirms the platform&apos;s core thesis: credentials are weaker hiring signals than verified proof.
              </p>
            </div>
          </div>
        </div>

        {/* Charts row 1 */}
        <div className="grid grid-cols-12 gap-6 mb-6">
          {/* Skill demand vs supply */}
          <div className="col-span-7 card-base p-6 animate-fade-up" style={{ animationDelay: "250ms" }}>
            <SectionHeader title="Skill Gap Map" subtitle="Rwanda demand vs verified supply — critical gaps visible" />
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={mockPlatformStats.skill_demand} layout="vertical" barSize={9} barGap={3}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2D45" horizontal={false} />
                <XAxis type="number" tick={{ fill: "#4A5C74", fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <YAxis type="category" dataKey="skill" tick={{ fill: "#94A3B8", fontSize: 10, fontFamily: "var(--font-syne, sans-serif)" }} axisLine={false} tickLine={false} width={110} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="demand" name="Market Demand" fill="#3B82F6" fillOpacity={0.8} radius={[0, 3, 3, 0]} />
                <Bar dataKey="supply" name="Verified Supply" fill="#10B981" fillOpacity={0.75} radius={[0, 3, 3, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-5 mt-3">
              <div className="flex items-center gap-2"><div style={{ width: 10, height: 10, borderRadius: 2, background: "#3B82F6" }} /><span style={{ color: "#4A5C74", fontSize: "0.72rem", fontFamily: "var(--font-dm-sans, sans-serif)" }}>Market Demand</span></div>
              <div className="flex items-center gap-2"><div style={{ width: 10, height: 10, borderRadius: 2, background: "#10B981" }} /><span style={{ color: "#4A5C74", fontSize: "0.72rem", fontFamily: "var(--font-dm-sans, sans-serif)" }}>Verified Supply</span></div>
            </div>
          </div>

          {/* Hire predictors radar */}
          <div className="col-span-5 card-base p-6 animate-fade-up" style={{ animationDelay: "300ms" }}>
            <SectionHeader title="Hire Predictors" subtitle="What signals actually lead to hires" />
            <ResponsiveContainer width="100%" height={180}>
              <RadarChart data={hirePredictors}>
                <PolarGrid stroke="#1E2D45" />
                <PolarAngleAxis dataKey="factor" tick={{ fill: "#4A5C74", fontSize: 8, fontFamily: "var(--font-syne, sans-serif)" }} />
                <Radar dataKey="importance" name="Importance" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.12} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-1.5 mt-2">
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#F59E0B" }} />
              <span style={{ color: "#4A5C74", fontSize: "0.7rem", fontFamily: "var(--font-dm-sans, sans-serif)" }}>Hire prediction importance (0–100)</span>
            </div>
          </div>
        </div>

        {/* Charts row 2 */}
        <div className="grid grid-cols-12 gap-6 mb-6">
          {/* Background vs TSS */}
          <div className="col-span-6 card-base p-6 animate-fade-up" style={{ animationDelay: "300ms" }}>
            <SectionHeader title="Background vs Performance" subtitle="TSS score by education pathway — CV blind" />
            <div className="space-y-4 mt-2">
              {backgroundData.map((b) => (
                <div key={b.background}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, color: "white", fontSize: "0.82rem" }}>{b.background}</span>
                      <span style={{ color: "#4A5C74", fontSize: "0.7rem", fontFamily: "var(--font-dm-sans, sans-serif)" }}>{b.count} candidates</span>
                    </div>
                    <span style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: b.tss >= 74 ? "#10B981" : "#94A3B8", fontSize: "0.88rem" }}>
                      TSS {b.tss}
                    </span>
                  </div>
                  <div style={{ height: 6, background: "#1E2D45", borderRadius: 6 }}>
                    <div style={{ width: `${b.tss}%`, height: "100%", background: b.tss >= 74 ? "#10B981" : "#3B82F6", borderRadius: 6, transition: "width 1s ease" }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 p-3 rounded-xl" style={{ background: "#10B98108", border: "1px solid #10B98120" }}>
              <p style={{ color: "#94A3B8", fontSize: "0.78rem", fontFamily: "var(--font-dm-sans, sans-serif)", lineHeight: 1.5 }}>
                <span style={{ color: "#10B981", fontWeight: 600 }}>Key finding: </span>
                Self-taught professionals score 3pts higher on average than university graduates — confirming CV-blind evaluation surfaces hidden talent.
              </p>
            </div>
          </div>

          {/* Regional distribution */}
          <div className="col-span-6 card-base p-6 animate-fade-up" style={{ animationDelay: "350ms" }}>
            <SectionHeader title="Regional Talent Map" subtitle="Candidate distribution across Rwanda's provinces" />
            <div className="space-y-3">
              {regionData.map((r) => {
                const maxCount = regionData[0].candidates;
                const hirePct = Math.round((r.hires / r.candidates) * 100);
                return (
                  <div key={r.region} className="p-3 rounded-xl" style={{ border: "1px solid #1E2D45" }}>
                    <div className="flex items-center justify-between mb-2">
                      <span style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "white", fontSize: "0.82rem" }}>{r.region} Province</span>
                      <div className="flex items-center gap-3">
                        <span style={{ color: "#4A5C74", fontSize: "0.72rem", fontFamily: "var(--font-dm-sans, sans-serif)" }}>{r.candidates} talent</span>
                        <span style={{ color: "#10B981", fontSize: "0.72rem", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600 }}>{hirePct}% hired</span>
                      </div>
                    </div>
                    <div style={{ height: 4, background: "#1E2D45", borderRadius: 4 }}>
                      <div style={{ width: `${(r.candidates / maxCount) * 100}%`, height: "100%", background: "#3B82F6", borderRadius: 4, transition: "width 1s" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Gender equity row */}
        <div className="card-base p-6 animate-fade-up" style={{ animationDelay: "400ms" }}>
          <SectionHeader title="Gender Equity by Role Family" subtitle="TalentLens is closing the representation gap — evidence-first removes appearance bias" />
          <div className="grid grid-cols-5 gap-4">
            {genderData.map((g) => (
              <div key={g.role} className="text-center">
                <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "white", fontSize: "0.78rem", marginBottom: 12 }}>{g.role}</p>
                {/* Stacked bar */}
                <div style={{ height: 100, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                  <div style={{ width: 36, flex: `0 0 ${g.female}px`, background: "#A855F7", borderRadius: "4px 4px 0 0", opacity: 0.75 }} />
                  <div style={{ width: 36, flex: `0 0 ${g.male}px`, background: "#3B82F6", borderRadius: "0 0 4px 4px", opacity: 0.75 }} />
                </div>
                <div className="mt-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5"><div style={{ width: 6, height: 6, borderRadius: "50%", background: "#A855F7" }} /><span style={{ color: "#4A5C74", fontSize: "0.65rem" }}>Women</span></div>
                    <span style={{ color: "#A855F7", fontSize: "0.72rem", fontWeight: 700, fontFamily: "var(--font-syne, sans-serif)" }}>{g.female}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5"><div style={{ width: 6, height: 6, borderRadius: "50%", background: "#3B82F6" }} /><span style={{ color: "#4A5C74", fontSize: "0.65rem" }}>Men</span></div>
                    <span style={{ color: "#3B82F6", fontSize: "0.72rem", fontWeight: 700, fontFamily: "var(--font-syne, sans-serif)" }}>{g.male}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}