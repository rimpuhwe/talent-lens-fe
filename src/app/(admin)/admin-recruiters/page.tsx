"use client";

import { useState } from "react";
import { Search, Briefcase, Star, TrendingUp, CheckCircle, Eye, Plus } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Sidebar from "@/components/layout/Sidebar";
import { StatCard, SectionHeader } from "@/components/shared";
import { mockAdminProfile } from "@/lib/mock-data";

const allRecruiters = [
  { id: "r-001", name: "Karim Nzeyimana", company: "PayServe Rwanda", sector: "Fintech", signals: 3, hires: 7, avg_match: 79, trust_score: 92, status: "active", joined: "Oct 2024" },
  { id: "r-002", name: "Isabelle Tuyisenge", company: "HealthTech RW", sector: "Health", signals: 2, hires: 4, avg_match: 74, trust_score: 88, status: "active", joined: "Sep 2024" },
  { id: "r-003", name: "David Mugabonake", company: "Andela Rwanda", sector: "Tech", signals: 5, hires: 12, avg_match: 83, trust_score: 95, status: "active", joined: "Aug 2024" },
  { id: "r-004", name: "Chantal Mukabutera", company: "Rwanda Revenue Authority", sector: "Government", signals: 1, hires: 2, avg_match: 68, trust_score: 71, status: "active", joined: "Nov 2024" },
  { id: "r-005", name: "Felix Ntakirutimana", company: "EduTech Africa", sector: "EdTech", signals: 4, hires: 8, avg_match: 76, trust_score: 84, status: "active", joined: "Oct 2024" },
  { id: "r-006", name: "Nadine Umuhoza", company: "NGO Partners", sector: "NGO", signals: 2, hires: 3, avg_match: 72, trust_score: 79, status: "active", joined: "Nov 2024" },
  { id: "r-007", name: "Bernard Ndagijimana", company: "LogiRw", sector: "Logistics", signals: 1, hires: 1, avg_match: 61, trust_score: 65, status: "inactive", joined: "Dec 2024" },
];

const hiresPerSector = [
  { sector: "Fintech", hires: 34 },
  { sector: "Tech", hires: 51 },
  { sector: "Health", hires: 18 },
  { sector: "NGO", hires: 22 },
  { sector: "EdTech", hires: 16 },
  { sector: "Gov", hires: 9 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#162033", border: "1px solid #253350", borderRadius: 8, padding: "8px 12px" }}>
      <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, color: "white", fontSize: "0.8rem" }}>{label}</p>
      <p style={{ color: "#F59E0B", fontSize: "0.75rem" }}>Hires: {payload[0]?.value}</p>
    </div>
  );
};

export default function AdminRecruitersPage() {
  const [search, setSearch] = useState("");

  const filtered = allRecruiters.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.company.toLowerCase().includes(search.toLowerCase()) ||
    r.sector.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen" style={{ background: "#080D1A" }}>
      <Sidebar role="admin" userName={mockAdminProfile.full_name} />

      <main className="flex-1 ml-64 p-8 bg-grid">
        {/* Header */}
        <div className="flex items-start justify-between mb-8 animate-fade-up">
          <div>
            <p style={{ color: "#F59E0B", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Admin · Platform Management
            </p>
            <h1 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800, fontSize: "1.75rem", color: "white", letterSpacing: "-0.02em", marginTop: 4 }}>
              Recruiter Registry
            </h1>
            <p style={{ color: "#4A5C74", fontSize: "0.85rem", fontFamily: "var(--font-dm-sans, sans-serif)", marginTop: 2 }}>
              {allRecruiters.length} companies · Hire quality tracked by Trust Score
            </p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm"
            style={{ background: "#F59E0B", color: "#080D1A", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700 }}>
            <Plus size={15} /> Invite Recruiter
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Recruiters" value={allRecruiters.length} delta="+12 this month" deltaType="up" icon={Briefcase} accent="#3B82F6" delay={0} />
          <StatCard label="Avg Trust Score" value="82" delta="Platform benchmark" deltaType="up" icon={Star} accent="#F59E0B" delay={100} />
          <StatCard label="Total Job Signals" value="213" delta="Across all recruiters" deltaType="neutral" icon={TrendingUp} accent="#10B981" delay={200} />
          <StatCard label="Confirmed Hires" value="156" delta="+41 this month" deltaType="up" icon={CheckCircle} accent="#A855F7" delay={300} />
        </div>

        {/* Hires by sector chart */}
        <div className="card-base p-6 mb-8 animate-fade-up" style={{ animationDelay: "200ms" }}>
          <SectionHeader title="Hires by Sector" subtitle="Which sectors are hiring the most through TalentLens" />
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={hiresPerSector} barSize={36}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E2D45" vertical={false} />
              <XAxis dataKey="sector" tick={{ fill: "#4A5C74", fontSize: 11, fontFamily: "var(--font-syne, sans-serif)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#4A5C74", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
              <Bar dataKey="hires" fill="#F59E0B" fillOpacity={0.75} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 mb-5 animate-fade-up" style={{ animationDelay: "250ms" }}>
          <div className="flex items-center gap-2 flex-1 px-4 py-2.5 rounded-xl"
            style={{ background: "#111827", border: "1px solid #1E2D45" }}>
            <Search size={14} color="#4A5C74" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, company, or sector..."
              style={{ flex: 1, background: "none", border: "none", outline: "none", color: "white", fontFamily: "var(--font-dm-sans, sans-serif)", fontSize: "0.85rem" }} />
          </div>
        </div>

        {/* Recruiter table */}
        <div className="card-base overflow-hidden animate-fade-up" style={{ animationDelay: "300ms" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #1E2D45" }}>
                {["Recruiter", "Company", "Sector", "Signals", "Hires", "Avg Match", "Trust Score", "Status", ""].map(h => (
                  <th key={h} style={{ padding: "14px 16px", textAlign: "left", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, fontSize: "0.68rem", color: "#4A5C74", letterSpacing: "0.07em", textTransform: "uppercase" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id} style={{ borderBottom: "1px solid #1E2D4530", transition: "background 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#FFFFFF04")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                  <td style={{ padding: "14px 16px" }}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                        style={{ background: "#3B82F620", color: "#3B82F6", fontFamily: "var(--font-syne, sans-serif)" }}>
                        {r.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </div>
                      <span style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, color: "white", fontSize: "0.85rem" }}>{r.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px", color: "#94A3B8", fontSize: "0.82rem", fontFamily: "var(--font-dm-sans, sans-serif)" }}>{r.company}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{ background: "#3B82F610", color: "#3B82F6", border: "1px solid #3B82F620", padding: "2px 8px", borderRadius: 4, fontSize: "0.65rem", fontWeight: 600, fontFamily: "var(--font-syne, sans-serif)" }}>
                      {r.sector}
                    </span>
                  </td>
                  <td style={{ padding: "14px 16px", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "white", fontSize: "0.88rem" }}>{r.signals}</td>
                  <td style={{ padding: "14px 16px", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "#10B981", fontSize: "0.88rem" }}>{r.hires}</td>
                  <td style={{ padding: "14px 16px", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "white", fontSize: "0.88rem" }}>{r.avg_match}%</td>
                  <td style={{ padding: "14px 16px" }}>
                    <div className="flex items-center gap-2">
                      <div style={{ width: 40, height: 4, background: "#1E2D45", borderRadius: 4 }}>
                        <div style={{ width: `${r.trust_score}%`, height: "100%", background: r.trust_score >= 85 ? "#10B981" : r.trust_score >= 70 ? "#F59E0B" : "#F43F5E", borderRadius: 4, transition: "width 1s" }} />
                      </div>
                      <span style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: r.trust_score >= 85 ? "#10B981" : r.trust_score >= 70 ? "#F59E0B" : "#F43F5E", fontSize: "0.82rem" }}>
                        {r.trust_score}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{
                      background: r.status === "active" ? "#10B98115" : "#4A5C7415",
                      color: r.status === "active" ? "#10B981" : "#4A5C74",
                      border: `1px solid ${r.status === "active" ? "#10B98130" : "#4A5C7430"}`,
                      padding: "2px 8px", borderRadius: 4, fontSize: "0.62rem", fontWeight: 600,
                      fontFamily: "var(--font-syne, sans-serif)", textTransform: "uppercase", letterSpacing: "0.06em",
                    }}>
                      {r.status}
                    </span>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors hover:bg-white/5"
                      style={{ border: "1px solid #1E2D45", color: "#94A3B8", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600 }}>
                      <Eye size={11} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}