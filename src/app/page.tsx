import Link from "next/link";
import { ArrowRight, CheckCircle2, Zap, Shield, TrendingUp } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-grid bg-[#080D1A] relative overflow-hidden">
      {/* Glow */}
      <div className="absolute inset-0 bg-glow pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #10B981 0%, transparent 70%)" }} />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-10 py-6 border-b" style={{ borderColor: "#1E2D45" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#10B98120", border: "1px solid #10B98140" }}>
            <div className="w-3 h-3 rounded-sm bg-emerald-400" />
          </div>
          <span style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "white", letterSpacing: "0.01em" }}>TalentLens</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm px-4 py-2 rounded-lg transition-colors hover:bg-white/5"
            style={{ color: "#94A3B8", fontFamily: "var(--font-dm-sans, sans-serif)" }}>
            Sign In
          </Link>
          <Link href="/register" className="btn-primary text-sm px-5 py-2 rounded-lg flex items-center gap-2">
            Get Started <ArrowRight size={14} />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 animate-fade-in"
          style={{ background: "#10B98112", border: "1px solid #10B98130" }}>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span style={{ color: "#10B981", fontFamily: "var(--font-syne, sans-serif)", fontWeight: 600, fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Built for the Umurava AI Hackathon · Kigali, Rwanda
          </span>
        </div>

        <h1 className="animate-fade-up" style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800, fontSize: "clamp(2.5rem, 6vw, 4rem)", letterSpacing: "-0.03em", lineHeight: 1.05, color: "white" }}>
          See beyond<br />
          <span style={{ color: "#10B981" }}>the CV.</span>
        </h1>

        <p className="mt-6 text-lg max-w-2xl mx-auto animate-fade-up delay-100"
          style={{ color: "#94A3B8", fontFamily: "var(--font-dm-sans, sans-serif)", lineHeight: 1.7, animationDelay: "150ms" }}>
          TalentLens replaces résumé screening with verified proof of capability.
          Candidates earn a living Talent Signal. Recruiters hire with confidence.
          Rwanda's hidden talent finally gets a fair shot.
        </p>

        <div className="flex items-center justify-center gap-4 mt-10 flex-wrap animate-fade-up" style={{ animationDelay: "250ms" }}>
          <Link href="/register" className="btn-primary px-7 py-3 rounded-xl flex items-center gap-2 text-sm font-semibold">
            I&apos;m Looking for Work <ArrowRight size={15} />
          </Link>
          <Link href="/register" className="px-7 py-3 rounded-xl text-sm font-semibold transition-all hover:bg-white/5"
            style={{ border: "1px solid #253350", color: "#94A3B8", fontFamily: "var(--font-syne, sans-serif)" }}>
            I&apos;m Hiring
          </Link>
        </div>

        {/* Trust strip */}
        <div className="flex items-center justify-center gap-6 mt-14 flex-wrap animate-fade-up" style={{ animationDelay: "350ms" }}>
          {["1,247 verified talents", "89 companies hiring", "4,832 missions completed", "156 hires made"].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <CheckCircle2 size={13} color="#10B981" />
              <span style={{ color: "#4A5C74", fontSize: "0.78rem", fontFamily: "var(--font-dm-sans, sans-serif)" }}>{s}</span>
            </div>
          ))}
        </div>
      </main>

      {/* Features */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Zap, title: "Evidence-First", desc: "Candidates prove skills through real-world missions — not polished CVs.", color: "#10B981" },
            { icon: Shield, title: "Bias-Resistant", desc: "Scores are built on demonstrated behavior, not credentials or connections.", color: "#3B82F6" },
            { icon: TrendingUp, title: "Living Signal", desc: "The Talent Signal Score grows over time. Earn it once, carry it everywhere.", color: "#F59E0B" },
          ].map((f, i) => (
            <div key={f.title} className="card-base p-6 animate-fade-up" style={{ animationDelay: `${400 + i * 100}ms` }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${f.color}15`, border: `1px solid ${f.color}30` }}>
                <f.icon size={18} color={f.color} strokeWidth={1.5} />
              </div>
              <h3 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 700, color: "white", marginBottom: 8 }}>{f.title}</h3>
              <p style={{ color: "#94A3B8", fontSize: "0.85rem", lineHeight: 1.6, fontFamily: "var(--font-dm-sans, sans-serif)" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t px-10 py-6 flex items-center justify-between" style={{ borderColor: "#1E2D45" }}>
        <p style={{ color: "#4A5C74", fontSize: "0.78rem", fontFamily: "var(--font-dm-sans, sans-serif)" }}>
          © 2024 TalentLens · Built in Kigali, Rwanda 🇷🇼
        </p>
        <p style={{ color: "#4A5C74", fontSize: "0.78rem", fontFamily: "var(--font-dm-sans, sans-serif)" }}>
          Powered by Gemini API · Umurava AI Hackathon
        </p>
      </footer>
    </div>
  );
}