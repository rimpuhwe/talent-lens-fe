"use client";

import { useState } from "react";
import { Search, Filter, Eye, MoreVertical, TrendingUp, Users, CheckCircle, Target } from "lucide-react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import Sidebar from "@/components/layout/Sidebar";
import { StatCard, SectionHeader, RecommendationBadge, ProgressBar } from "@/components/shared";
import { mockAdminProfile, mockPlatformStats } from "@/lib/mock-data";

// Extended mock candidates for admin view
const allCandidates = [
  { id: "c-001", name: "Diane Uwimana", location: "Musanze", role_family: "Data & Analytics", tss: 74, modules: 3, status: "active", joined: "Nov 2024" },
  { id: "c-002", name: "Jean-Pierre Habimana", location: "Kigali", role_family: "Data & Analytics", tss: 76, modules: 4, status: "active", joined: "Oct 2024" },
  { id: "c-003", name: "Claudine Mukamana", location: "Huye", role_family: "Data & Analytics", tss: 67, modules: 3, status: "active", joined: "Sep 2024" },
  { id: "c-004", name: "Patrick Nshimiyimana", location: "Kigali", role_family: "Software Engineering", tss: 82, modules: 4, status: "hired", joined: "Oct 2024" },
  { id: "c-005", name: "Aline Ingabire", location: "Rubavu", role_family: "UX/UI Design", tss: 71, modules: 3, status: "active", joined: "Nov 2024" },
  { id: "c-006", name: "Eric Mugisha", location: "Kigali", role_family: "Digital Marketing", tss: 58, modules: 2, status: "active", joined: "Dec 2024" },
  { id: "c-007", name: "Solange Uwase", location: "Nyagatare", role_family: "Software Engineering", tss: 89, modules: 4, status: "hired", joined: "Sep 2024" },
  { id: "c-008", name: "Emmanuel Hakizimana", location: "Huye", role_family: "Business Analysis", tss: 63, modules: 2, status: "active", joined: "Nov 2024" },
  { id: "c-009", name: "Vestine Mukamazimpaka", location: "Kigali", role_family: "Product Management", tss: 77, modules: 3, status: "active", joined: "Oct 2024" },
  { id: "c-010", name: "Olivier Rurangwa", location: "Musanze", role_family: "DevOps & Cloud", tss: 54, modules: 2, status: "inactive", joined: "Dec 2024" },
];

const ROLE_FILTERS = ["All", "Data & Analytics", "Software Engineering", "UX/UI Design", "Digital Marketing", "Product Management"];

export default function AdminCandidatesPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = allCandidates.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.role_family.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "All" || c.role_family === roleFilter;
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  const stats = mockPlatformStats;

  return (
    <div className="flex min-h-screen" style={{ background: "#080D1A" }}>
      <Sidebar role="admin" userName={mockAdminProfile.full_name} />

      <main className="flex-1 ml-64 p-8 bg-grid">
        {/* Header */}
        <div className="mb-8 animate-fade-up">
          <p style={{ color: "#F59E0B", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Admin · Platform Management
          </p>
          <h1 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800, fontSize: "1.75rem", color: "white", letterSpacing: "-0.02em", marginTop: 4 }}>
            Candidate Registry
          </h1>
          <p style={{ color: "#4A5C74", fontSize: "0.85rem", fontFamily: "var(--font-dm-sans, sans-serif)", marginTop: 2 }}>
            {stats.total_candidates.toLocaleString()} registered professionals
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Registered" value={stats.total_candidates.toLocaleString()} delta="+312 this month" deltaType="up" icon={Users} accent="#10B981" delay={0} />
          <StatCard label="Avg TSS" value={stats.avg_tss} delta="+3 pts this month" deltaType="up" icon={TrendingUp} accent="#3B82F6" delay={100} />
          <StatCard label="Fully Verified" value="847" delta="68% completion rate" deltaType="up" icon={CheckCircle} accent="#F59E0B" delay={200} />
          <StatCard label="Hires This Month" value="41" delta="+21% vs prior month" deltaType="up" icon={Target} accent="#A855F7" delay={300} />
        </div>

        {/* Top role families */}
        <div className="card-base p-6 mb-8 animate-fade-up" style={{ animationDelay: "200ms" }}>
          <SectionHeader title="Talent Pool by Role Family" subtitle="Distribution across the platform" />
          <div className="grid grid-cols-6 gap-4">
            {stats.top_role_families.map((rf, i) => {
              const max = stats.top_role_families[0].count;
              return (
                <div key={rf.role} className="text-center">
                  <div className="relative h-24 flex items-end justify-center mb-2">
                    <div style={{
                      width: 32, height: `${(rf.count / max) * 100}%`,
                      background: `rgba(16,185,129,${0.3 + i * 0.1})`,
                      borderRadius: "4px 4px 0 0", minHeight: 8,
                      border: "1px solid rgba(16,185,129,0.3)",
                      transition: "height 1s ease",
                    }} />
                  </div>
                  <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "white", fontSize: "0.85rem" }}>{rf.count}</p>
                  <p style={{ color: "#4A5C74", fontSize: "0.65rem", fontFamily: "var(--font-dm-sans, sans-serif)", lineHeight: 1.3, marginTop: 2 }}>{rf.role}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Search & filter */}
        <div className="flex items-center gap-3 mb-5 animate-fade-up" style={{ animationDelay: "250ms" }}>
          <div className="flex items-center gap-2 flex-1 px-4 py-2.5 rounded-xl"
            style={{ background: "#111827", border: "1px solid #1E2D45" }}>
            <Search size={14} color="#4A5C74" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or role..."
              style={{ flex: 1, background: "none", border: "none", outline: "none", color: "white", fontFamily: "var(--font-dm-sans, sans-serif)", fontSize: "0.85rem" }} />
          </div>
          <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}
            style={{ background: "#111827", border: "1px solid #1E2D45", borderRadius: 10, padding: "10px 14px", color: "#94A3B8", fontFamily: "var(--font-syne, sans-serif)", fontSize: "0.8rem", outline: "none", cursor: "pointer" }}>
            {ROLE_FILTERS.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          {(["all", "active", "hired", "inactive"] as const).map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              style={{
                padding: "8px 14px", borderRadius: 8, fontSize: "0.72rem",
                border: `1px solid ${statusFilter === s ? "#F59E0B" : "#1E2D45"}`,
                background: statusFilter === s ? "#F59E0B15" : "transparent",
                color: statusFilter === s ? "#F59E0B" : "#4A5C74",
                fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, cursor: "pointer",
                textTransform: "capitalize",
              }}>
              {s}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="card-base overflow-hidden animate-fade-up" style={{ animationDelay: "300ms" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #1E2D45" }}>
                {["Candidate", "Role Family", "Location", "TSS Score", "Modules", "Status", "Joined", ""].map(h => (
                  <th key={h} style={{ padding: "14px 16px", textAlign: "left", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, fontSize: "0.68rem", color: "#4A5C74", letterSpacing: "0.07em", textTransform: "uppercase" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <tr key={c.id} style={{ borderBottom: "1px solid #1E2D4530", transition: "background 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#FFFFFF04")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                  <td style={{ padding: "14px 16px" }}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                        style={{ background: "#10B98120", color: "#10B981", fontFamily: "var(--font-syne, sans-serif)" }}>
                        {c.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </div>
                      <span style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, color: "white", fontSize: "0.85rem" }}>{c.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{ background: "#10B98110", color: "#10B981", border: "1px solid #10B98120", padding: "2px 8px", borderRadius: 4, fontSize: "0.65rem", fontWeight: 600, fontFamily: "var(--font-syne, sans-serif)" }}>
                      {c.role_family}
                    </span>
                  </td>
                  <td style={{ padding: "14px 16px", color: "#94A3B8", fontSize: "0.8rem", fontFamily: "var(--font-dm-sans, sans-serif)" }}>{c.location}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <div className="flex items-center gap-3">
                      <span style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "white", fontSize: "0.9rem", minWidth: 28 }}>{c.tss}</span>
                      <div style={{ flex: 1, maxWidth: 80, height: 4, background: "#1E2D45", borderRadius: 4 }}>
                        <div style={{ width: `${c.tss}%`, height: "100%", background: c.tss >= 75 ? "#10B981" : c.tss >= 60 ? "#F59E0B" : "#F43F5E", borderRadius: 4, transition: "width 1s" }} />
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4].map(m => (
                        <div key={m} style={{ width: 8, height: 8, borderRadius: "50%", background: m <= c.modules ? "#10B981" : "#1E2D45" }} />
                      ))}
                      <span style={{ marginLeft: 6, color: "#4A5C74", fontSize: "0.72rem", fontFamily: "var(--font-dm-sans, sans-serif)" }}>{c.modules}/4</span>
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{
                      background: c.status === "hired" ? "#10B98115" : c.status === "active" ? "#3B82F615" : "#4A5C7415",
                      color: c.status === "hired" ? "#10B981" : c.status === "active" ? "#3B82F6" : "#4A5C74",
                      border: `1px solid ${c.status === "hired" ? "#10B98130" : c.status === "active" ? "#3B82F630" : "#4A5C7430"}`,
                      padding: "2px 8px", borderRadius: 4, fontSize: "0.62rem", fontWeight: 600,
                      fontFamily: "var(--font-syne, sans-serif)", textTransform: "uppercase", letterSpacing: "0.06em",
                    }}>
                      {c.status}
                    </span>
                  </td>
                  <td style={{ padding: "14px 16px", color: "#4A5C74", fontSize: "0.75rem", fontFamily: "var(--font-dm-sans, sans-serif)" }}>{c.joined}</td>
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
          <div className="px-4 py-3 flex items-center justify-between" style={{ borderTop: "1px solid #1E2D45" }}>
            <p style={{ color: "#4A5C74", fontSize: "0.75rem", fontFamily: "var(--font-dm-sans, sans-serif)" }}>
              Showing {filtered.length} of {allCandidates.length} candidates
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}