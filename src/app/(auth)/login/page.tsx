"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"candidate" | "recruiter" | "admin">("candidate");
  const [loading, setLoading] = useState(false);

  const DEMO_ROUTES: Record<string, string> = {
    candidate: "/dashboard",
    recruiter: "/r-dashboard",
    admin: "/admin-dashboard",
  };

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      router.push(DEMO_ROUTES[role]);
    }, 900);
  };

  return (
    <div className="min-h-screen flex bg-grid" style={{ background: "#080D1A" }}>
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-96 p-10 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #0D1427 0%, #080D1A 100%)", borderRight: "1px solid #1E2D45" }}>
        <div className="absolute top-0 left-0 right-0 h-64 opacity-20"
          style={{ background: "radial-gradient(ellipse at top left, #10B981 0%, transparent 65%)" }} />
        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#10B98120", border: "1px solid #10B98140" }}>
              <div className="w-3.5 h-3.5 rounded-sm bg-emerald-400" />
            </div>
            <span style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "white", fontSize: "1.1rem" }}>TalentLens</span>
          </div>
          <h2 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800, color: "white", fontSize: "1.75rem", letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 16 }}>
            Africa&apos;s evidence-first<br />talent platform.
          </h2>
          <p style={{ color: "#4A5C74", fontSize: "0.88rem", fontFamily: "var(--font-dm-sans, sans-serif)", lineHeight: 1.7 }}>
            Where skills are proved, not claimed. Where talent is found, not filtered.
          </p>
        </div>
        {/* Stats */}
        <div className="relative z-10 space-y-4">
          {[
            { value: "1,247", label: "Verified talents" },
            { value: "4,832", label: "Missions completed" },
            { value: "156", label: "Hires made" },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-4">
              <span style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800, fontSize: "1.3rem", color: "white", letterSpacing: "-0.02em", minWidth: 60 }}>{s.value}</span>
              <span style={{ color: "#4A5C74", fontSize: "0.82rem", fontFamily: "var(--font-dm-sans, sans-serif)" }}>{s.label}</span>
            </div>
          ))}
          <p style={{ color: "#4A5C74", fontSize: "0.72rem", fontFamily: "var(--font-dm-sans, sans-serif)", marginTop: 8 }}>
            Built for the Umurava AI Hackathon · Kigali 🇷🇼
          </p>
        </div>
      </div>

      {/* Right panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md animate-fade-up">
          <div className="mb-8">
            <h1 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800, color: "white", fontSize: "1.6rem", letterSpacing: "-0.02em", marginBottom: 8 }}>
              Welcome back
            </h1>
            <p style={{ color: "#4A5C74", fontSize: "0.88rem", fontFamily: "var(--font-dm-sans, sans-serif)" }}>
              Don&apos;t have an account?{" "}
              <Link href="/register" style={{ color: "#10B981", fontWeight: 600 }}>Sign up</Link>
            </p>
          </div>

          {/* Demo role selector */}
          <div className="p-4 rounded-xl mb-6" style={{ background: "#111827", border: "1px solid #1E2D45" }}>
            <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, color: "#4A5C74", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>
              Demo: Sign in as
            </p>
            <div className="grid grid-cols-3 gap-2">
              {(["candidate", "recruiter", "admin"] as const).map(r => {
                const colors = { candidate: "#10B981", recruiter: "#3B82F6", admin: "#F59E0B" };
                const labels = { candidate: "Talent", recruiter: "Recruiter", admin: "Admin" };
                return (
                  <button key={r} onClick={() => setRole(r)}
                    style={{
                      padding: "8px", borderRadius: 8, fontSize: "0.78rem", cursor: "pointer", transition: "all 0.15s",
                      border: `1px solid ${role === r ? colors[r] : "#1E2D45"}`,
                      background: role === r ? `${colors[r]}15` : "transparent",
                      color: role === r ? colors[r] : "#4A5C74",
                      fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600,
                    }}>
                    {labels[r]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label style={{ display: "block", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, color: "#94A3B8", fontSize: "0.72rem", letterSpacing: "0.06em", marginBottom: 8 }}>
              EMAIL
            </label>
            <input value={email} onChange={e => setEmail(e.target.value)}
              type="email" placeholder="you@example.rw"
              style={{ width: "100%", background: "#111827", border: "1px solid #1E2D45", borderRadius: 10, padding: "12px 14px", color: "white", fontFamily: "var(--font-dm-sans, sans-serif)", fontSize: "0.9rem", outline: "none" }} />
          </div>

          {/* Password */}
          <div className="mb-6 relative">
            <label style={{ display: "block", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, color: "#94A3B8", fontSize: "0.72rem", letterSpacing: "0.06em", marginBottom: 8 }}>
              PASSWORD
            </label>
            <input value={password} onChange={e => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"} placeholder="••••••••"
              style={{ width: "100%", background: "#111827", border: "1px solid #1E2D45", borderRadius: 10, padding: "12px 14px", paddingRight: 44, color: "white", fontFamily: "var(--font-dm-sans, sans-serif)", fontSize: "0.9rem", outline: "none" }} />
            <button onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: 14, bottom: 13, color: "#4A5C74", background: "none", border: "none", cursor: "pointer" }}>
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <button onClick={handleLogin}
            style={{
              width: "100%", padding: "13px", borderRadius: 12, border: "none", cursor: "pointer",
              background: loading ? "#0EA573" : "#10B981", color: "#080D1A",
              fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, fontSize: "0.9rem",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              transition: "all 0.2s",
            }}>
            {loading ? (
              <div style={{ width: 16, height: 16, border: "2px solid #080D1A40", borderTopColor: "#080D1A", borderRadius: "50%", animation: "spin 0.6s linear infinite" }} />
            ) : (
              <> Sign In <ArrowRight size={16} /> </>
            )}
          </button>

          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    </div>
  );
}