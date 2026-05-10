"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, 
  Target, 
  BookOpen, 
  FileText,
  Briefcase, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut, 
  ShieldCheck,
  Hexagon,
  Bell
} from "lucide-react";
import type { UserRole } from "@/types";

interface NavItem { 
  label: string; 
  href: string; 
  icon: React.ElementType; 
  badge?: number; 
}

// 1. UPDATED PROFESSIONAL NAV ROUTING
const navByRole: Record<UserRole, NavItem[]> = {
  candidate: [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "Evidence Assessments", href: "/missions", icon: Target },
    { label: "Talent Passport", href: "/passport", icon: ShieldCheck },
    { label: "Learning & Growth", href: "/gap-report", icon: BookOpen },
    { label: "Application Tracking", href: "/Notification", icon: Briefcase, badge: 3 },
  ],
  recruiter: [
    { label: "Overview", href: "/r-dashboard", icon: LayoutDashboard },
    { label: "Job Signals", href: "/signals", icon: FileText },
    { label: "AI Shortlists", href: "/shortlist", icon: Users },
  ],
  admin: [
    { label: "System Overview", href: "/admin-dashboard", icon: LayoutDashboard },
    { label: "Candidates", href: "/admin-candidates", icon: Users },
    { label: "Recruiters", href: "/admin-recruiters", icon: Briefcase },
    { label: "Platform Insights", href: "/admin-insights", icon: BarChart3 },
  ],
};

// 2. MAPPED TAILWIND COLORS FOR THE DARK THEME
const roleTheme: Record<UserRole, { active: string, logo: string, badge: string, text: string }> = {
  candidate: { active: "bg-blue-600 text-white shadow-md shadow-blue-900/50", logo: "bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)]", badge: "bg-blue-500 text-white", text: "text-blue-500" },
  recruiter: { active: "bg-emerald-600 text-white shadow-md shadow-emerald-900/50", logo: "bg-emerald-600 shadow-[0_0_15px_rgba(5,150,105,0.4)]", badge: "bg-emerald-500 text-white", text: "text-emerald-500" },
  admin: { active: "bg-amber-600 text-white shadow-md shadow-amber-900/50", logo: "bg-amber-600 shadow-[0_0_15px_rgba(217,119,6,0.4)]", badge: "bg-amber-500 text-white", text: "text-amber-500" },
};

export default function Sidebar({ role, userName, userLocation }: { role: UserRole; userName: string; userLocation?: string }) {
  const pathname = usePathname();
  const navItems = navByRole[role];
  const theme = roleTheme[role];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 flex flex-col z-40 bg-slate-900 border-r border-slate-800 shadow-xl font-sans text-slate-300">
      
      {/* Brand & Logo */}
      <div className="px-6 py-8 pb-6">
        <div className="flex items-center gap-3 group cursor-default">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-shadow ${theme.logo}`}>
            <Hexagon size={20} className="text-white" fill="currentColor" />
          </div>
          <div>
            <p className="font-extrabold text-white text-xl tracking-tight leading-none">
              TalentLens<span className={theme.text}>.</span>
            </p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">
              {role === 'candidate' ? 'Talent' : role} Portal
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1.5 mt-4 overflow-y-auto">
        <p className="px-3 mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Menu</p>
        
        {navItems.map((item) => {
          const Icon = item.icon;
          // Exact match or sub-route match
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          
          return (
            <Link key={item.href} href={item.href}
              className={`flex items-center justify-between px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group ${
                isActive 
                  ? theme.active 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
              }`}>
              <div className="flex items-center gap-3">
                <Icon size={18} className={isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300 transition-colors'} strokeWidth={isActive ? 2.5 : 2} />
                <span>{item.label}</span>
              </div>
              
              {/* Notification Badge */}
              {item.badge && (
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-white text-slate-900' : theme.badge
                }`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer / User Profile */}
      <div className="p-4 mt-auto">
        
        {/* Settings & Logout */}
        <div className="space-y-1 mb-4 px-2">
          <button className="w-full flex items-center p-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors text-sm font-semibold">
            <Settings className="w-4 h-4 mr-3 text-slate-500" /> Settings
          </button>
          <button className="w-full flex items-center p-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-rose-400 transition-colors text-sm font-semibold">
            <LogOut className="w-4 h-4 mr-3 text-slate-500" /> Sign Out
          </button>
        </div>

        {/* User Identity Card */}
        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-extrabold text-white shrink-0 ${theme.logo}`}>
            {userName.split(" ").map(n => n[0]).join("").slice(0, 2)}
          </div>
          <div className="overflow-hidden flex-1">
            <p className="text-sm font-bold text-slate-200 truncate">{userName}</p>
            {userLocation && <p className="text-[10px] font-medium text-slate-500 truncate mt-0.5">{userLocation}</p>}
          </div>
        </div>
        
      </div>
    </aside>
  );
}