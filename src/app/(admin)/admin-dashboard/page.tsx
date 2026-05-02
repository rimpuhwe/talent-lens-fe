"use client";

import Link from "next/link";
import {
  Users, Briefcase, Target, TrendingUp, Award,
  ArrowRight, Activity, BarChart3, Globe
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";
import Sidebar from "@/components/layout/Sidebar";
import { StatCard, SectionHeader } from "@/components/shared";
import { mockAdminProfile, mockPlatformStats } from "@/lib/mock-data";

const COLORS = ["#10B981", "#F59E0B", "#F43F5E"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
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
};

export default function AdminDashboard() {
  const stats = mockPlatformStats;

  return (
    <div className="flex min-h-screen" style={{ background: "#080D1A" }}>
      <Sidebar role="admin" userName={mockAdminProfile.full_name} />

      <main className="flex-1 ml-64 p-8 bg-grid">
        {/* Header */}
        <div className="mb-8 animate-fade-up">
          <p style={{ color: "#F59E0B", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Platform Intelligence
          </p>
          <h1 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800, fontSize: "1.75rem", color: "white", letterSpacing: "-0.02em", marginTop: 4 }}>
            Admin Overview
          </h1>
          <p style={{ color: "#4A5C74", fontSize: "0.85rem", fontFamily: "var(--font-dm-sans, sans-serif)", marginTop: 2 }}>
            Rwanda Talent Intelligence · Live Platform Data
          </p>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Candidates" value={stats.total_candidates.toLocaleString()} delta="+312 this month" deltaType="up" icon={Users} accent="#10B981" delay={0} />
          <StatCard label="Active Recruiters" value={stats.total_recruiters} delta="+12 this month" deltaType="up" icon={Briefcase} accent="#3B82F6" delay={100} />
          <StatCard label="Missions Completed" value={stats.total_missions_completed.toLocaleString()} delta="+892 this month" deltaType="up" icon={Target} accent="#F59E0B" delay={200} />
          <StatCard label="Hires Made" value={stats.total_hires} delta="+41 this month" deltaType="up" icon={Award} accent="#A855F7" delay={300} />
        </div>

        {/* Secondary KPIs */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <StatCard label="Avg TSS Score" value={stats.avg_tss} delta="Platform average" deltaType="neutral" icon={TrendingUp} accent="#10B981" delay={0} />
          <StatCard label="Avg Match Score" value={`${stats.avg_match_score}%`} delta="+4% vs last month" deltaType="up" icon={Activity} accent="#3B82F6" delay={100} />
          <StatCard label="Job Signals Posted" value={stats.total_job_signals} delta="+23 this month" deltaType="up" icon={BarChart3} accent="#F59E0B" delay={200} />
        </div>

        {/* Charts row 1 */}
        <div className="grid grid-cols-12 gap-6 mb-6">
          {/* Monthly growth area chart */}
          <div className="col-span-8 card-base p-6 animate-fade-up" style={{ animationDelay: "200ms" }}>
            <SectionHeader title="Platform Growth" subtitle="Candidates, missions & hires — last 6 months" />
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={stats.monthly_activity}>
                <defs>
                  <linearGradient id="candidatesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="missionsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="hiresGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2D45" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: "#4A5C74", fontSize: 11, fontFamily: "var(--font-syne, sans-serif)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#4A5C74", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="candidates" name="Candidates" stroke="#10B981" fill="url(#candidatesGrad)" strokeWidth={2} dot={false} />
                <Area type="monotone" dataKey="missions" name="Missions" stroke="#3B82F6" fill="url(#missionsGrad)" strokeWidth={2} dot={false} />
                <Area type="monotone" dataKey="hires" name="Hires" stroke="#F59E0B" fill="url(#hiresGrad)" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Recommendation distribution */}
          <div className="col-span-4 card-base p-6 animate-fade-up" style={{ animationDelay: "250ms" }}>
            <SectionHeader title="Match Quality" subtitle="Recommendation distribution" />
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={stats.recommendation_distribution.map(d => ({ name: d.type === "not_yet" ? "Not Yet" : d.type.charAt(0).toUpperCase() + d.type.slice(1), value: d.count }))}
                  cx="50%" cy="50%" innerRadius={45} outerRadius={70}
                  dataKey="value" strokeWidth={0}>
                  {stats.recommendation_distribution.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx]} fillOpacity={0.85} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "#162033", border: "1px solid #253350", borderRadius: 8 }} labelStyle={{ color: "white", fontFamily: "var(--font-syne, sans-serif)" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {stats.recommendation_distribution.map((d, i) => (
                <div key={d.type} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS[i] }} />
                    <span style={{ color: "#94A3B8", fontSize: "0.75rem", fontFamily: "var(--font-dm-sans, sans-serif)" }}>
                      {d.type === "not_yet" ? "Not Yet" : d.type.charAt(0).toUpperCase() + d.type.slice(1)}
                    </span>
                  </div>
                  <span style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "white", fontSize: "0.82rem" }}>{d.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts row 2 */}
        <div className="grid grid-cols-12 gap-6 mb-6">
          {/* Skill demand vs supply */}
          <div className="col-span-7 card-base p-6 animate-fade-up" style={{ animationDelay: "300ms" }}>
            <SectionHeader title="Rwanda Skill Intelligence" subtitle="Demand vs supply — critical gaps highlighted" />
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={stats.skill_demand} layout="vertical" barSize={8} barGap={3}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2D45" horizontal={false} />
                <XAxis type="number" tick={{ fill: "#4A5C74", fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <YAxis type="category" dataKey="skill" tick={{ fill: "#94A3B8", fontSize: 10, fontFamily: "var(--font-syne, sans-serif)" }} axisLine={false} tickLine={false} width={100} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="demand" name="Demand" fill="#3B82F6" fillOpacity={0.8} radius={[0, 3, 3, 0]} />
                <Bar dataKey="supply" name="Supply" fill="#10B981" fillOpacity={0.7} radius={[0, 3, 3, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* TSS distribution */}
          <div className="col-span-5 card-base p-6 animate-fade-up" style={{ animationDelay: "350ms" }}>
            <SectionHeader title="TSS Distribution" subtitle="Candidate score spread across platform" />
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={stats.tss_distribution} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2D45" vertical={false} />
                <XAxis dataKey="range" tick={{ fill: "#4A5C74", fontSize: 10, fontFamily: "var(--font-syne, sans-serif)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#4A5C74", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" name="Candidates" radius={[4, 4, 0, 0]}>
                  {stats.tss_distribution.map((_, idx) => (
                    <Cell key={idx} fill={`rgba(16,185,129,${0.3 + idx * 0.14})`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick nav cards */}
        <div className="grid grid-cols-3 gap-4 animate-fade-up" style={{ animationDelay: "400ms" }}>
          {[
            { href: "/admin-candidates", label: "Manage Candidates", sub: `${stats.total_candidates.toLocaleString()} registered`, icon: Users, color: "#10B981" },
            { href: "/admin-recruiters", label: "Manage Recruiters", sub: `${stats.total_recruiters} active companies`, icon: Briefcase, color: "#3B82F6" },
            { href: "/admin-insights", label: "Full Insights Report", sub: "Rwanda Talent Intelligence", icon: Globe, color: "#F59E0B" },
          ].map(card => {
            const Icon = card.icon;
            return (
              <Link key={card.href} href={card.href}
                className="card-base p-5 flex items-center gap-4 group transition-all hover:border-opacity-50">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all group-hover:scale-105"
                  style={{ background: `${card.color}15`, border: `1px solid ${card.color}30` }}>
                  <Icon size={20} color={card.color} strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "white", fontSize: "0.88rem" }}>{card.label}</p>
                  <p style={{ color: "#4A5C74", fontSize: "0.75rem", fontFamily: "var(--font-dm-sans, sans-serif)", marginTop: 2 }}>{card.sub}</p>
                </div>
                <ArrowRight size={15} color="#4A5C74" className="group-hover:text-white transition-colors" />
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}