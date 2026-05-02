"use client";

import Link from "next/link";
import { ArrowRight, Users, FileText, CheckCircle, Clock, Plus, TrendingUp, BarChart2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import Sidebar from "@/components/layout/Sidebar";
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

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "#162033", border: "1px solid #253350", borderRadius: 8, padding: "10px 14px" }}>
        <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, color: "white", fontSize: "0.8rem", marginBottom: 4 }}>{label}</p>
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
    <div className="flex min-h-screen" style={{ background: "#080D1A" }}>
      <Sidebar role="recruiter" userName={profile.full_name} userLocation={profile.location} />

      <main className="flex-1 ml-64 p-8 bg-grid">
        {/* Header */}
        <div className="flex items-start justify-between mb-8 animate-fade-up">
          <div>
            <p style={{ color: "#3B82F6", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Recruiter Intelligence
            </p>
            <h1 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800, fontSize: "1.75rem", color: "white", letterSpacing: "-0.02em", marginTop: 4 }}>
              Welcome, {profile.full_name.split(" ")[0]}
            </h1>
            <p style={{ color: "#4A5C74", fontSize: "0.85rem", fontFamily: "var(--font-dm-sans, sans-serif)", marginTop: 2 }}>
              {new Date().toLocaleDateString("en-GB", { weekday: "long", month: "long", day: "numeric" })}
            </p>
          </div>
          <Link href="/signals" className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm"
            style={{ background: "#3B82F6", color: "white", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600 }}>
            <Plus size={15} /> Post Job Signal
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <StatCard label="Active Signals" value={mockJobSignals.filter(j => j.status === "active").length} delta="+1 this week" deltaType="up" icon={FileText} accent="#3B82F6" delay={0} />
          <StatCard label="Total Matches" value="28" delta="Across all signals" deltaType="neutral" icon={Users} accent="#10B981" delay={100} />
          <StatCard label="Gap Tests Sent" value="7" delta="3 completed" deltaType="up" icon={CheckCircle} accent="#F59E0B" delay={200} />
          <StatCard label="Avg Match Score" value="76%" delta="+4% vs last week" deltaType="up" icon={TrendingUp} accent="#A855F7" delay={300} />
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-12 gap-6 mb-8">
          {/* Weekly activity */}
          <div className="col-span-7 card-base p-6 animate-fade-up" style={{ animationDelay: "200ms" }}>
            <SectionHeader title="This Week's Activity" subtitle="Matches generated & gap tests triggered" />
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weekActivity} barSize={12} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2D45" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: "#4A5C74", fontSize: 11, fontFamily: "var(--font-syne, sans-serif)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#4A5C74", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                <Bar dataKey="matches" fill="#3B82F6" name="Matches" radius={[3, 3, 0, 0]} fillOpacity={0.8} />
                <Bar dataKey="tests" fill="#10B981" name="Gap Tests" radius={[3, 3, 0, 0]} fillOpacity={0.8} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Match distribution */}
          <div className="col-span-5 card-base p-6 animate-fade-up" style={{ animationDelay: "250ms" }}>
            <SectionHeader title="Match Distribution" subtitle="Across all active signals" />
            <div className="space-y-4 mt-2">
              {matchData.map((item) => {
                const total = matchData.reduce((s, d) => s + d.value, 0);
                const pct = Math.round((item.value / total) * 100);
                return (
                  <div key={item.name}>
                    <div className="flex justify-between mb-1.5">
                      <span style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, color: "#94A3B8", fontSize: "0.78rem" }}>{item.name}</span>
                      <div className="flex items-center gap-2">
                        <span style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "white", fontSize: "0.82rem" }}>{item.value}</span>
                        <span style={{ color: "#4A5C74", fontSize: "0.72rem" }}>{pct}%</span>
                      </div>
                    </div>
                    <div style={{ height: 6, background: "#1E2D45", borderRadius: 6 }}>
                      <div style={{ width: `${pct}%`, height: "100%", background: item.color, borderRadius: 6, transition: "width 1s ease" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Active Job Signals */}
        <div className="card-base p-6 mb-6 animate-fade-up" style={{ animationDelay: "300ms" }}>
          <SectionHeader title="Active Job Signals" subtitle={`${mockJobSignals.filter(j => j.status === "active").length} open positions`} action={
            <Link href="/signals" className="text-xs flex items-center gap-1" style={{ color: "#3B82F6", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600 }}>
              View All <ArrowRight size={11} />
            </Link>
          } />
          <div className="space-y-3">
            {mockJobSignals.map((signal) => (
              <div key={signal.id} className="flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all hover:border-blue-500/20"
                style={{ border: "1px solid #1E2D45" }}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "white", fontSize: "0.9rem" }}>{signal.title}</h3>
                    <span style={{
                      background: signal.status === "active" ? "#10B98115" : "#4A5C7420",
                      color: signal.status === "active" ? "#10B981" : "#4A5C74",
                      border: `1px solid ${signal.status === "active" ? "#10B98130" : "#4A5C7430"}`,
                      padding: "1px 8px", borderRadius: 4, fontSize: "0.62rem", fontWeight: 600,
                      fontFamily: "var(--font-syne, sans-serif)", textTransform: "uppercase", letterSpacing: "0.06em"
                    }}>
                      {signal.status}
                    </span>
                  </div>
                  <p style={{ color: "#4A5C74", fontSize: "0.78rem", fontFamily: "var(--font-dm-sans, sans-serif)" }}>
                    {signal.role_family} · {signal.timeline_days}d timeline · {signal._count?.shortlist_entries} candidates matched
                  </p>
                  <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                    {signal.required_skills.map((skill) => (
                      <span key={skill} style={{ background: "#3B82F610", border: "1px solid #3B82F620", color: "#3B82F6", padding: "1px 7px", borderRadius: 3, fontSize: "0.65rem", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600 }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <Link href="/shortlist" className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs transition-all hover:bg-blue-500/10"
                  style={{ border: "1px solid #253350", color: "#3B82F6", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600 }}>
                  View Shortlist <ArrowRight size={11} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Recent shortlist activity */}
        <div className="card-base p-6 animate-fade-up" style={{ animationDelay: "350ms" }}>
          <SectionHeader title="Recent Match Activity" subtitle="Latest candidates surfaced across all signals" />
          <div className="space-y-3">
            {mockShortlist.map((entry) => (
              <div key={entry.id} className="flex items-center gap-4 p-4 rounded-xl" style={{ border: "1px solid #1E2D45" }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{ background: "#3B82F620", color: "#3B82F6", fontFamily: "var(--font-syne, sans-serif)" }}>
                  {entry.candidate?.full_name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, color: "white", fontSize: "0.85rem" }}>
                    {entry.candidate?.full_name}
                  </p>
                  <p style={{ color: "#4A5C74", fontSize: "0.75rem", fontFamily: "var(--font-dm-sans, sans-serif)" }}>
                    {entry.candidate?.role_family} · {entry.candidate?.location}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "white", fontSize: "0.9rem" }}>
                    {entry.overall_match}<span style={{ color: "#4A5C74", fontSize: "0.72rem" }}>%</span>
                  </span>
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