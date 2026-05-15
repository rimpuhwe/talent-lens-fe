"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  delta?: string;
  deltaType?: "up" | "down" | "neutral";
  icon?: React.ElementType;
  accent?: string;
  delay?: number;
}

export function StatCard({ label, value, delta, deltaType = "neutral", icon: Icon, accent = "#10B981", delay = 0 }: StatCardProps) {
  const deltaColors = { up: "#10B981", down: "#F43F5E", neutral: "#94A3B8" };
  const DeltaIcon = deltaType === "up" ? TrendingUp : deltaType === "down" ? TrendingDown : Minus;

  return (
    <div className="card-base p-5 animate-fade-up" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex items-start justify-between mb-4">
        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#4A5C74", fontFamily: "var(--font-syne, sans-serif)" }}>
          {label}
        </p>
        {Icon && (
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${accent}15`, border: `1px solid ${accent}30` }}>
            <Icon size={15} color={accent} strokeWidth={1.5} />
          </div>
        )}
      </div>
      <p className="stat-number text-3xl text-white mb-1" style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, letterSpacing: "-0.03em" }}>
        {value}
      </p>
      {delta && (
        <div className="flex items-center gap-1.5 mt-2">
          <DeltaIcon size={12} color={deltaColors[deltaType]} />
          <span className="text-xs" style={{ color: deltaColors[deltaType], fontFamily: "var(--font-dm-sans, sans-serif)" }}>
            {delta}
          </span>
        </div>
      )}
    </div>
  );
}

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  color?: string;
}

export function ScoreRing({ score, size = 80, strokeWidth = 6, label, color = "#10B981" }: ScoreRingProps) {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1">
      <div style={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#1E2D45" strokeWidth={strokeWidth} />
          <circle
            cx={size / 2} cy={size / 2} r={radius} fill="none"
            stroke={color} strokeWidth={strokeWidth}
            strokeDasharray={circumference} strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1s ease" }}
          />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, fontSize: size > 70 ? "1.1rem" : "0.8rem", color: "white", lineHeight: 1 }}>
            {score}
          </span>
        </div>
      </div>
      {label && <p style={{ fontSize: "0.65rem", color: "#4A5C74", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", textAlign: "center" }}>{label}</p>}
    </div>
  );
}


interface RecommendationBadgeProps {
  recommendation: "strong" | "borderline" | "not_yet";
}

export function RecommendationBadge({ recommendation }: RecommendationBadgeProps) {
  const config = {
    strong: { label: "Strong Match", color: "#10B981", bg: "#10B98115" },
    borderline: { label: "Borderline", color: "#F59E0B", bg: "#F59E0B15" },
    not_yet: { label: "Not Yet", color: "#F43F5E", bg: "#F43F5E15" },
  };
  const { label, color, bg } = config[recommendation];
  return (
    <span style={{
      background: bg, color, border: `1px solid ${color}30`,
      padding: "2px 10px", borderRadius: 4,
      fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.07em",
      textTransform: "uppercase", fontFamily: "var(--font-syne, sans-serif)",
      whiteSpace: "nowrap",
    }}>
      {label}
    </span>
  );
}



type ModuleType = "skill_proof" | "scenario_judgment" | "learning_agility" | "communication_proof";

interface ModuleBadgeProps {
  type: ModuleType;
}

export function ModuleBadge({ type }: ModuleBadgeProps) {
  const config: Record<ModuleType, { label: string; color: string }> = {
    skill_proof: { label: "Skill Proof", color: "#10B981" },
    scenario_judgment: { label: "Judgment", color: "#F59E0B" },
    learning_agility: { label: "Learning Agility", color: "#3B82F6" },
    communication_proof: { label: "Communication", color: "#A855F7" },
  };
  const { label, color } = config[type];
  return (
    <span style={{
      background: `${color}15`, color, border: `1px solid ${color}30`,
      padding: "2px 8px", borderRadius: 4,
      fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.07em",
      textTransform: "uppercase", fontFamily: "var(--font-syne, sans-serif)",
    }}>
      {label}
    </span>
  );
}



interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  showLabel?: boolean;
  height?: number;
}

export function ProgressBar({ value, max = 100, color = "#10B981", showLabel = true, height = 4 }: ProgressBarProps) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="flex items-center gap-3">
      <div style={{ flex: 1, height, background: "#1E2D45", borderRadius: height }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: height, transition: "width 1s ease" }} />
      </div>
      {showLabel && (
        <span style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, fontSize: "0.75rem", color: "white", minWidth: 28, textAlign: "right" }}>
          {value}
        </span>
      )}
    </div>
  );
}


interface MatchLevelDotProps {
  level: "strong" | "partial" | "gap";
}

export function MatchLevelDot({ level }: MatchLevelDotProps) {
  const colors = { strong: "#10B981", partial: "#F59E0B", gap: "#F43F5E" };
  const labels = { strong: "✓", partial: "~", gap: "✗" };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      width: 18, height: 18, borderRadius: "50%",
      background: `${colors[level]}20`, color: colors[level],
      fontSize: "0.6rem", fontWeight: 700,
    }}>
      {labels[level]}
    </span>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function SectionHeader({ title, subtitle, action }: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        <h2 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, fontSize: "1.1rem", color: "white", letterSpacing: "-0.01em" }}>
          {title}
        </h2>
        {subtitle && <p style={{ color: "#4A5C74", fontSize: "0.8rem", marginTop: 2, fontFamily: "var(--font-dm-sans, sans-serif)" }}>{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

interface EmptyStateProps {
  icon: React.ElementType;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: "#111827", border: "1px solid #1E2D45" }}>
        <Icon size={24} color="#4A5C74" strokeWidth={1.5} />
      </div>
      <h3 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, color: "white", marginBottom: 8 }}>{title}</h3>
      <p style={{ color: "#4A5C74", fontSize: "0.85rem", maxWidth: 300, fontFamily: "var(--font-dm-sans, sans-serif)" }}>{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}