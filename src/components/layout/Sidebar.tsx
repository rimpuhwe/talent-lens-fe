"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, User, Target, BookOpen, FileText,
  Briefcase, Users, BarChart3, Settings, LogOut,
  ChevronRight, Bell, Shield,
} from "lucide-react";
import type { UserRole } from "@/types";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const candidateNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Passport", href: "/passport", icon: User },
  { label: "Missions", href: "/missions", icon: Target },
  { label: "Gap Report", href: "/gap-report", icon: BookOpen },
];

const recruiterNav: NavItem[] = [
  { label: "Dashboard", href: "/r-dashboard", icon: LayoutDashboard },
  { label: "Job Signals", href: "/signals", icon: FileText },
  { label: "Shortlists", href: "/shortlist", icon: Users },
];

const adminNav: NavItem[] = [
  { label: "Overview", href: "/admin-dashboard", icon: LayoutDashboard },
  { label: "Candidates", href: "/admin-candidates", icon: Users },
  { label: "Recruiters", href: "/admin-recruiters", icon: Briefcase },
  { label: "Insights", href: "/admin-insights", icon: BarChart3 },
];

const navByRole: Record<UserRole, NavItem[]> = {
  candidate: candidateNav,
  recruiter: recruiterNav,
  admin: adminNav,
};

const roleColors: Record<UserRole, string> = {
  candidate: "#10B981",
  recruiter: "#3B82F6",
  admin: "#F59E0B",
};

const roleLabels: Record<UserRole, string> = {
  candidate: "Talent",
  recruiter: "Recruiter",
  admin: "Admin",
};

interface SidebarProps {
  role: UserRole;
  userName: string;
  userLocation?: string;
}

export default function Sidebar({ role, userName, userLocation }: SidebarProps) {
  const pathname = usePathname();
  const navItems = navByRole[role];
  const accentColor = roleColors[role];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 flex flex-col z-40"
      style={{ background: "linear-gradient(180deg, #0A1120 0%, #080D1A 100%)", borderRight: "1px solid #1E2D45" }}>

      {/* Logo */}
      <div className="px-6 pt-8 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: `${accentColor}20`, border: `1px solid ${accentColor}40` }}>
            <div className="w-3 h-3 rounded-sm" style={{ background: accentColor }} />
          </div>
          <div>
            <p className="font-display font-700 text-sm tracking-wide text-white" style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700 }}>
              TalentLens
            </p>
            <p className="text-xs mt-0.5" style={{ color: accentColor, fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {roleLabels[role]} Portal
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-0.5">
        <p className="px-3 mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "#4A5C74", fontFamily: "var(--font-syne, sans-serif)" }}>
          Navigation
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link key={item.href} href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group relative"
              style={{
                background: isActive ? `${accentColor}12` : "transparent",
                color: isActive ? accentColor : "#94A3B8",
                borderLeft: isActive ? `2px solid ${accentColor}` : "2px solid transparent",
                fontFamily: "var(--font-dm-sans, sans-serif)",
                fontWeight: isActive ? 500 : 400,
              }}>
              <Icon size={16} strokeWidth={isActive ? 2 : 1.5} />
              <span>{item.label}</span>
              {isActive && <ChevronRight size={12} className="ml-auto opacity-60" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-3 pb-6 space-y-1 border-t" style={{ borderColor: "#1E2D45", paddingTop: "16px", marginTop: "8px" }}>
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm w-full transition-colors hover:bg-white/5"
          style={{ color: "#94A3B8" }}>
          <Bell size={16} strokeWidth={1.5} />
          <span style={{ fontFamily: "var(--font-dm-sans, sans-serif)" }}>Notifications</span>
          <span className="ml-auto text-xs px-1.5 py-0.5 rounded" style={{ background: `${accentColor}20`, color: accentColor }}>3</span>
        </button>
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm w-full transition-colors hover:bg-white/5"
          style={{ color: "#94A3B8" }}>
          <Settings size={16} strokeWidth={1.5} />
          <span style={{ fontFamily: "var(--font-dm-sans, sans-serif)" }}>Settings</span>
        </button>

        {/* User card */}
        <div className="mt-3 p-3 rounded-xl" style={{ background: "#111827", border: "1px solid #1E2D45" }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
              style={{ background: `${accentColor}20`, color: accentColor, fontFamily: "var(--font-syne, sans-serif)" }}>
              {userName.split(" ").map(n => n[0]).join("").slice(0, 2)}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium truncate text-white" style={{ fontFamily: "var(--font-syne, sans-serif)" }}>
                {userName}
              </p>
              {userLocation && (
                <p className="text-xs truncate" style={{ color: "#4A5C74" }}>{userLocation}</p>
              )}
            </div>
            <button className="ml-auto text-gray-600 hover:text-gray-400 transition-colors shrink-0">
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}