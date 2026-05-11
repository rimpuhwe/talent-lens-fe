"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
  Menu,
  X,
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
  recruiter: "#395886",
  admin: "#F59E0B",
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

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Topbar Toggle (Only if TopNav is hidden on mobile) */}
      <div className="lg:hidden fixed top-[72px] left-0 right-0 z-40 h-12 bg-white/80 backdrop-blur-md border-b border-[#D5DEEF] flex items-center justify-between px-4">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{role} Menu</span>
        <button
          onClick={() => setIsOpen(true)}
          className="p-1.5 rounded-lg border border-[#D5DEEF] text-[#395886]"
        >
          <Menu size={18} />
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 z-40 
          top-[72px] h-[calc(100vh-72px)]
          w-[280px] sm:w-64
          bg-white flex flex-col
          transition-transform duration-300 ease-in-out
          border-r border-[#D5DEEF]

          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Mobile Close */}
        <div className="lg:hidden flex justify-end px-4 pt-4">
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg border border-[#D5DEEF] text-[#395886]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Removed redundant logo section since it's now in the TopNav above */}

        {/* Nav */}
        <nav className="flex-1 px-3 mt-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              pathname === item.href ||
              pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-all duration-200 group relative"
                style={{
                  background: isActive
                    ? `${accentColor}12`
                    : "transparent",
                  color: isActive ? accentColor : "#628ECB",
                  borderLeft: isActive
                    ? `3px solid ${accentColor}`
                    : "3px solid transparent",
                  fontFamily: "var(--font-dm-sans, sans-serif)",
                  fontWeight: isActive ? 600 : 500,
                }}
              >
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />

                <span>{item.label}</span>

                {isActive && (
                  <ChevronRight
                    size={12}
                    className="ml-auto opacity-60"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div
          className="px-3 pb-6 space-y-1 border-t mt-2 pt-4"
          style={{ borderColor: "#D5DEEF" }}
        >
          <button
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm w-full transition-colors hover:bg-[#F0F3FA]"
            style={{
              color: "#628ECB",
              fontWeight: 500,
            }}
          >
            <Settings size={17} strokeWidth={2} />

            <span
              style={{
                fontFamily: "var(--font-dm-sans, sans-serif)",
              }}
            >
              Settings
            </span>
          </button>

          {/* User Card */}
          <div
            className="mt-3 p-3 rounded-2xl transition-colors hover:bg-[#D5DEEF]/30"
            style={{
              background: "#F0F3FA",
              border: "1px solid #D5DEEF",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 shadow-sm"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #B1C9EF",
                  color: accentColor,
                  fontFamily: "var(--font-syne, sans-serif)",
                }}
              >
                {userName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>

              <div className="min-w-0">
                <p
                  className="text-xs font-bold truncate text-[#395886]"
                  style={{
                    fontFamily: "var(--font-syne, sans-serif)",
                  }}
                >
                  {userName}
                </p>

                {userLocation && (
                  <p
                    className="text-[10px] font-medium truncate"
                    style={{ color: "#628ECB" }}
                  >
                    {userLocation}
                  </p>
                )}
              </div>

              <button className="ml-auto transition-colors shrink-0 p-1.5 rounded-md hover:bg-white text-[#628ECB] hover:text-[#395886]">
                <LogOut size={14} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}