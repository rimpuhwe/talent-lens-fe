"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, User, Briefcase } from "lucide-react";
import { useRouter } from "next/navigation";

const ROLE_FAMILIES = [
  "Data & Analytics", "Software Engineering", "Product Management",
  "UX/UI Design", "Digital Marketing", "Business Analysis",
  "DevOps & Cloud", "Other",
];

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<"candidate" | "recruiter" | null>(null);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", password: "", location: "", role_family: "", company: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      router.push(role === "candidate" ? "/dashboard" : "/r-dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex bg-grid items-center justify-center p-8" style={{ background: "#080D1A" }}>
      <div className="w-full max-w-lg animate-fade-up">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10 justify-center">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#10B98120", border: "1px solid #10B98140" }}>
            <div className="w-3 h-3 rounded-sm bg-emerald-400" />
          </div>
          <span style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "white" }}>TalentLens</span>
        </div>

        {!role ? (
          <>
            <h1 className="text-center mb-2" style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800, color: "white", fontSize: "1.6rem", letterSpacing: "-0.02em" }}>
              Join TalentLens
            </h1>
            <p className="text-center mb-8" style={{ color: "#4A5C74", fontFamily: "var(--font-dm-sans, sans-serif)" }}>
              How will you use the platform?
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { r: "candidate" as const, label: "I'm a Talent", sub: "Build my Talent Passport and get discovered by top companies", icon: User, color: "#10B981" },
                { r: "recruiter" as const, label: "I'm Hiring", sub: "Post job signals and match verified talent — no CVs required", icon: Briefcase, color: "#3B82F6" },
              ].map(o => {
                const Icon = o.icon;
                return (
                  <button key={o.r} onClick={() => { setRole(o.r); setStep(1); }}
                    className="p-6 rounded-2xl text-left transition-all hover:scale-105"
                    style={{ border: `1px solid ${o.color}30`, background: `${o.color}08`, cursor: "pointer" }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${o.color}20`, border: `1px solid ${o.color}40` }}>
                      <Icon size={18} color={o.color} />
                    </div>
                    <p style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "white", fontSize: "1rem", marginBottom: 6 }}>{o.label}</p>
                    <p style={{ color: "#4A5C74", fontSize: "0.8rem", fontFamily: "var(--font-dm-sans, sans-serif)", lineHeight: 1.5 }}>{o.sub}</p>
                  </button>
                );
              })}
            </div>
            <p className="text-center mt-6" style={{ color: "#4A5C74", fontSize: "0.85rem", fontFamily: "var(--font-dm-sans, sans-serif)" }}>
              Already have an account?{" "}
              <Link href="/login" style={{ color: "#10B981", fontWeight: 600 }}>Sign in</Link>
            </p>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-8">
              <button onClick={() => setRole(null)} style={{ color: "#4A5C74", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-dm-sans, sans-serif)", fontSize: "0.85rem" }}>
                ← Back
              </button>
              <div style={{ flex: 1, height: 2, background: "#1E2D45", borderRadius: 2 }}>
                <div style={{ width: `${(step / 2) * 100}%`, height: "100%", background: role === "candidate" ? "#10B981" : "#3B82F6", borderRadius: 2, transition: "width 0.3s" }} />
              </div>
              <span style={{ color: "#4A5C74", fontSize: "0.72rem", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600 }}>{step}/2</span>
            </div>

            {step === 1 && (
              <div className="space-y-4">
                <h2 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "white", fontSize: "1.2rem", marginBottom: 20 }}>
                  {role === "candidate" ? "Create your profile" : "Company details"}
                </h2>
                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, color: "#94A3B8", fontSize: "0.72rem", letterSpacing: "0.06em", marginBottom: 8 }}>FULL NAME</label>
                  <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Diane Uwimana"
                    style={{ width: "100%", background: "#111827", border: "1px solid #1E2D45", borderRadius: 10, padding: "12px 14px", color: "white", fontFamily: "var(--font-dm-sans, sans-serif)", fontSize: "0.9rem", outline: "none" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, color: "#94A3B8", fontSize: "0.72rem", letterSpacing: "0.06em", marginBottom: 8 }}>EMAIL</label>
                  <input value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} type="email" placeholder="you@example.rw"
                    style={{ width: "100%", background: "#111827", border: "1px solid #1E2D45", borderRadius: 10, padding: "12px 14px", color: "white", fontFamily: "var(--font-dm-sans, sans-serif)", fontSize: "0.9rem", outline: "none" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, color: "#94A3B8", fontSize: "0.72rem", letterSpacing: "0.06em", marginBottom: 8 }}>PASSWORD</label>
                  <input value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} type="password" placeholder="••••••••"
                    style={{ width: "100%", background: "#111827", border: "1px solid #1E2D45", borderRadius: 10, padding: "12px 14px", color: "white", fontFamily: "var(--font-dm-sans, sans-serif)", fontSize: "0.9rem", outline: "none" }} />
                </div>
                {role === "recruiter" && (
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, color: "#94A3B8", fontSize: "0.72rem", letterSpacing: "0.06em", marginBottom: 8 }}>COMPANY NAME</label>
                    <input value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} placeholder="e.g. PayServe Rwanda"
                      style={{ width: "100%", background: "#111827", border: "1px solid #1E2D45", borderRadius: 10, padding: "12px 14px", color: "white", fontFamily: "var(--font-dm-sans, sans-serif)", fontSize: "0.9rem", outline: "none" }} />
                  </div>
                )}
                <button onClick={() => setStep(2)} disabled={!form.name || !form.email || !form.password}
                  style={{ width: "100%", marginTop: 8, padding: "13px", borderRadius: 12, border: "none", cursor: "pointer", background: role === "candidate" ? "#10B981" : "#3B82F6", color: role === "candidate" ? "#080D1A" : "white", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, fontSize: "0.9rem", opacity: (!form.name || !form.email || !form.password) ? 0.4 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  Continue <ArrowRight size={16} />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "white", fontSize: "1.2rem", marginBottom: 20 }}>
                  {role === "candidate" ? "Your expertise" : "Hiring preferences"}
                </h2>
                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, color: "#94A3B8", fontSize: "0.72rem", letterSpacing: "0.06em", marginBottom: 8 }}>LOCATION</label>
                  <input value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} placeholder="e.g. Kigali, Rwanda"
                    style={{ width: "100%", background: "#111827", border: "1px solid #1E2D45", borderRadius: 10, padding: "12px 14px", color: "white", fontFamily: "var(--font-dm-sans, sans-serif)", fontSize: "0.9rem", outline: "none" }} />
                </div>
                {role === "candidate" && (
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, color: "#94A3B8", fontSize: "0.72rem", letterSpacing: "0.06em", marginBottom: 8 }}>ROLE FAMILY</label>
                    <div className="grid grid-cols-2 gap-2">
                      {ROLE_FAMILIES.map(rf => (
                        <button key={rf} onClick={() => setForm(p => ({ ...p, role_family: rf }))}
                          style={{ padding: "9px 12px", borderRadius: 8, fontSize: "0.78rem", cursor: "pointer", transition: "all 0.15s", border: `1px solid ${form.role_family === rf ? "#10B981" : "#1E2D45"}`, background: form.role_family === rf ? "#10B98115" : "transparent", color: form.role_family === rf ? "#10B981" : "#94A3B8", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, textAlign: "left" }}>
                          {rf}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <button onClick={handleSubmit} disabled={!form.location || (role === "candidate" && !form.role_family)}
                  style={{ width: "100%", marginTop: 8, padding: "13px", borderRadius: 12, border: "none", cursor: "pointer", background: role === "candidate" ? "#10B981" : "#3B82F6", color: role === "candidate" ? "#080D1A" : "white", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, fontSize: "0.9rem", opacity: (!form.location || (role === "candidate" && !form.role_family)) ? 0.4 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  {loading ? <div style={{ width: 16, height: 16, border: "2px solid rgba(0,0,0,0.3)", borderTopColor: role === "candidate" ? "#080D1A" : "white", borderRadius: "50%", animation: "spin 0.6s linear infinite" }} /> : <> Create Account <ArrowRight size={16} /> </>}
                </button>
              </div>
            )}
          </>
        )}
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}