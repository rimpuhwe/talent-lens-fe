"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Target,
  BookOpen,
  FileText,
  Briefcase,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
  Bell,
  Sparkles,
  Shield,
} from "lucide-react";

import type { UserRole } from "@/types";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const candidateNav: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Passport",
    href: "/passport",
    icon: User,
  },
  {
    label: "Missions",
    href: "/missions",
    icon: Target,
  },
  {
    label: "Gap Report",
    href: "/gap-report",
    icon: BookOpen,
  },
];

const recruiterNav: NavItem[] = [
  {
    label: "Dashboard",
    href: "/r-dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Job Signals",
    href: "/signals",
    icon: FileText,
  },
  {
    label: "Shortlists",
    href: "/shortlist",
    icon: Users,
  },
];

const adminNav: NavItem[] = [
  {
    label: "Overview",
    href: "/admin-dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Candidates",
    href: "/admin-candidates",
    icon: Users,
  },
  {
    label: "Recruiters",
    href: "/admin-recruiters",
    icon: Briefcase,
  },
  {
    label: "Insights",
    href: "/admin-insights",
    icon: BarChart3,
  },
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
  candidate: "Talent Portal",
  recruiter: "Recruiter Portal",
  admin: "Admin Portal",
};

interface SidebarProps {
  role: UserRole;
  userName: string;
  userLocation?: string;
}

export default function Sidebar({
  role,
  userName,
  userLocation,
}: SidebarProps) {
  const pathname = usePathname();

  const navItems = navByRole[role];

  const accentColor = roleColors[role];

  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-72 overflow-hidden border-r border-white/5 bg-[#050A15] lg:flex lg:flex-col">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background: `${accentColor}12`,
          }}
        />

        <div className="absolute inset-0 " />
      </div>

      {/* Content */}
      <div className="relative flex h-full flex-col">
        {/* Logo */}
        <div className="px-6 pb-6 pt-7">
          <div className="flex items-center gap-4">
            <div
              className="relative flex h-12 w-12 items-center justify-center rounded-2xl border"
              style={{
                background: `${accentColor}15`,
                borderColor: `${accentColor}30`,
              }}
            >
              <div
                className="absolute inset-0 rounded-2xl blur-xl"
                style={{
                  background: `${accentColor}15`,
                }}
              />

              <Sparkles
                size={20}
                style={{
                  color: accentColor,
                }}
              />
            </div>

            <div>
              <h1 className="text-lg font-black tracking-tight text-white">
                TalentLens
              </h1>

              <p
                className="mt-1 text-[11px] font-bold uppercase tracking-[0.25em]"
                style={{
                  color: accentColor,
                }}
              >
                {roleLabels[role]}
              </p>
            </div>
          </div>
        </div>

        {/* Security Card */}
        <div className="px-5">
          {/* <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4 backdrop-blur-xl">
            <div className="flex items-start gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  background: `${accentColor}15`,
                }}
              >
                <Shield
                  size={18}
                  style={{
                    color: accentColor,
                  }}
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  AI Talent Signal
                </p>

                <p className="mt-1 text-xs leading-relaxed text-slate-400">
                  Intelligent evidence mapping and role-based
                  analytics.
                </p>
              </div>
            </div>
          </div> */}
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="mb-4 px-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">
              Navigation
            </p>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;

              const isActive =
                pathname === item.href ||
                pathname.startsWith(item.href + "/");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative flex items-center gap-4 overflow-hidden rounded-2xl px-4 py-3 transition-all duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-slate-400 hover:bg-white/[0.03] hover:text-white"
                  }`}
                  style={{
                    background: isActive
                      ? `linear-gradient(90deg, ${accentColor}20 0%, transparent 100%)`
                      : undefined,
                    border: isActive
                      ? `1px solid ${accentColor}20`
                      : "1px solid transparent",
                  }}
                >
                  {/* Active glow */}
                  {isActive && (
                    <div
                      className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full"
                      style={{
                        background: accentColor,
                      }}
                    />
                  )}

                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ${
                      isActive
                        ? ""
                        : "bg-white/[0.03] group-hover:bg-white/[0.06]"
                    }`}
                    style={{
                      background: isActive
                        ? `${accentColor}15`
                        : undefined,
                    }}
                  >
                    <Icon
                      size="18"
                      strokeWidth={isActive ? 2.4 : 1.8}
                      style={{
                        color: isActive
                          ? accentColor
                          : undefined,
                      }}
                    />
                  </div>

                  <div className="flex flex-1 items-center justify-between">
                    <span className="text-sm font-medium tracking-wide">
                      {item.label}
                    </span>

                    <ChevronRight
                      size={15}
                      className={`transition-all duration-300 ${
                        isActive
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                      }`}
                    />
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 p-4">
          {/* Utility Buttons */}
          <div className="mb-4 space-y-2">
            <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm text-slate-400 transition-all duration-300 hover:bg-white/[0.03] hover:text-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.03]">
                <Bell size={17} />
              </div>

              <span className="font-medium">
                Notifications
              </span>

              <span
                className="ml-auto rounded-full px-2 py-1 text-[10px] font-bold"
                style={{
                  background: `${accentColor}15`,
                  color: accentColor,
                }}
              >
                3
              </span>
            </button>

            <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm text-slate-400 transition-all duration-300 hover:bg-white/[0.03] hover:text-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.03]">
                <Settings size={17} />
              </div>

              <span className="font-medium">
                Settings
              </span>
            </button>
          </div>

          {/* User Card */}
          <div className="rounded-3xl border border-white/5 bg-white/[0.03] p-4 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-black"
                style={{
                  background: `${accentColor}15`,
                  color: accentColor,
                }}
              >
                {userName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">
                  {userName}
                </p>

                <p className="truncate text-xs text-slate-500">
                  {userLocation || "Active Session"}
                </p>
              </div>

              <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.03] text-slate-500 transition-all duration-300 hover:bg-red-500/10 hover:text-red-400">
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}