// src/components/shared/index.tsx
"use client";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export function StatCard({ label, value, delta, deltaType = "neutral", icon: Icon, accent = "#2563EB", delay = 0 }: any) {
  const deltaColors = { up: "#059669", down: "#E11D48", neutral: "#64748B" };
  const DeltaIcon = deltaType === "up" ? TrendingUp : deltaType === "down" ? TrendingDown : Minus;

  return (
    <div className="card-base p-6 animate-fade-up" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex items-start justify-between mb-4">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">{label}</p>
        {Icon && (
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-50 border border-slate-100">
            <Icon size={16} color={accent} strokeWidth={2} />
          </div>
        )}
      </div>
      <p className="stat-number text-3xl text-slate-900 mb-1">{value}</p>
      {delta && (
        <div className="flex items-center gap-1.5 mt-2">
          <DeltaIcon size={14} color={deltaColors[deltaType as keyof typeof deltaColors]} />
          <span className="text-xs font-medium" style={{ color: deltaColors[deltaType as keyof typeof deltaColors] }}>{delta}</span>
        </div>
      )}
    </div>
  );
}

export function ScoreRing({ score, size = 80, strokeWidth = 6, label, color = "#2563EB" }: any) {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div style={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#E2E8F0" strokeWidth={strokeWidth} />
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth}
            strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1s ease" }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-bold text-slate-900" style={{ fontSize: size > 70 ? "1.2rem" : "0.9rem" }}>{score}</span>
        </div>
      </div>
      {label && <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center">{label}</p>}
    </div>
  );
}

export function RecommendationBadge({ recommendation }: any) {
  const config = {
    strong: { label: "Strong Match", color: "#059669", bg: "#ECFDF5", border: "#A7F3D0" },
    borderline: { label: "Borderline", color: "#D97706", bg: "#FFFBEB", border: "#FDE68A" },
    not_yet: { label: "Not Yet", color: "#E11D48", bg: "#FFF1F2", border: "#FECDD3" },
  };
  const { label, color, bg, border } = config[recommendation as keyof typeof config];
  return (
    <span style={{ background: bg, color, border: `1px solid ${border}` }} className="px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase">
      {label}
    </span>
  );
}

export function ModuleBadge({ type }: any) {
  const config: any = {
    skill_proof: { label: "Skill Proof", color: "#059669", bg: "#ECFDF5" },
    scenario_judgment: { label: "Judgment", color: "#D97706", bg: "#FFFBEB" },
    learning_agility: { label: "Learning", color: "#2563EB", bg: "#EFF6FF" },
    communication_proof: { label: "Comm", color: "#9333EA", bg: "#FAF5FF" },
  };
  const { label, color, bg } = config[type] || config.skill_proof;
  return (
    <span style={{ background: bg, color, border: `1px solid ${color}30` }} className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase">
      {label}
    </span>
  );
}

export function ProgressBar({ value, max = 100, color = "#2563EB", showLabel = true, height = 6 }: any) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="flex items-center gap-3">
      <div style={{ flex: 1, height, background: "#E2E8F0", borderRadius: height }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: height, transition: "width 1s ease" }} />
      </div>
      {showLabel && <span className="font-bold text-xs text-slate-700 min-w-[28px] text-right">{value}</span>}
    </div>
  );
}

export function MatchLevelDot({ level }: any) {
  const colors = { strong: "#059669", partial: "#D97706", gap: "#E11D48" };
  const labels = { strong: "✓", partial: "~", gap: "✗" };
  return (
    <span style={{ background: `${colors[level as keyof typeof colors]}15`, color: colors[level as keyof typeof colors] }} 
      className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold">
      {labels[level as keyof typeof labels]}
    </span>
  );
}

export function SectionHeader({ title, subtitle, action }: any) {
  return (
    <div className="flex items-end justify-between mb-6 pb-4 border-b border-slate-100">
      <div>
        <h2 className="font-bold text-lg text-slate-900 tracking-tight">{title}</h2>
        {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}