// src/app/(auth)/login/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Focus, ArrowLeft, ShieldCheck, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { getSession, signIn } from "next-auth/react";
import { useToast } from "@/components/shared/toast-context";
import { motion } from "framer-motion";
import { getPostAuthRedirect } from "@/lib/api/onboarding";
import { profileApi } from "@/lib/api/services/profile.service";
import { setAuthStorage } from "@/lib/api/auth/token";
import { useOnboardingStore } from "@/stores/onboarding.store";

export default function LoginPage() {
  const router = useRouter();
  const { success, error: toastError } = useToast();
  const setOnboardingStatus = useOnboardingStore((s) => s.setStatus);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!response?.ok || response.error) {
        throw new Error("Invalid email or password. Please try again.");
      }

      const session = await getSession();
      const token = session?.accessToken;
      const role = session?.user?.role;

      if (!token || !role) {
        throw new Error("Login succeeded, but the session is missing access details.");
      }

      setAuthStorage({ accessToken: token, role });

      success("Welcome back!", "Logged in successfully");

      if (role === "CANDIDATE") {
        try {
          const status = await profileApi.getStatus();
          setOnboardingStatus(status);
          router.push(getPostAuthRedirect(role, status));
          return;
        } catch {
          router.push("/onboarding");
          return;
        }
      }

      router.push(getPostAuthRedirect(role));
    } catch (error: any) {
      console.error("Login failed:", error);
      toastError("Authentication Failed", error.message || "Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
  const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

  return (
    <div className="flex h-screen w-full bg-[#030712] font-body overflow-hidden selection:bg-[#0F62FE]/30">
      
      {/* LEFT PANEL: Context & Branding */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:flex flex-col justify-between w-[55%] h-full relative p-10 lg:p-14 border-r border-white/5"
      >
        {/* Abstract Tech Background with Premium Glass Effect */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#0F62FE]/20 via-[#030712]/80 to-[#030712] z-10 mix-blend-multiply" />
          <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-[#0F62FE]/10 blur-[120px] z-10" />
          <div className="absolute bottom-[10%] right-[10%] w-[50%] h-[50%] rounded-full bg-emerald-500/10 blur-[100px] z-10" />
          <img 
            src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1600" 
            alt="Abstract AI architecture" 
            className="w-full h-full object-cover opacity-30 grayscale mix-blend-luminosity scale-105"
          />
        </div>

        {/* Top Header Row */}
        <div className="relative z-20 flex items-center justify-between w-full">
          <Link href="/" className="flex items-center gap-2.5 text-white group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0F62FE] to-indigo-500 flex items-center justify-center shadow-lg shadow-[#0F62FE]/20 group-hover:scale-105 transition-transform duration-300">
              <Focus size={22} strokeWidth={2.5} className="text-white" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">TalentLens</span>
          </Link>
          <Link href="/" className="flex items-center gap-2 text-[13px] font-medium text-slate-400 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/5 hover:border-white/20 backdrop-blur-md">
            <ArrowLeft size={14} /> Back to Home
          </Link>
        </div>

        {/* Bottom Promotional Copy (Aligned to TalentLens) */}
        <motion.div 
          initial="hidden" animate="visible" variants={staggerContainer}
          className="relative z-20 max-w-xl mb-6"
        >
          <motion.div variants={fadeIn} className="flex gap-4 mb-8">
            <div className="flex flex-col gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex-1">
              <ShieldCheck className="text-emerald-400" size={24} />
              <p className="text-white font-bold text-sm">Verified Evidence</p>
              <p className="text-slate-400 text-xs">Proof-of-work matters.</p>
            </div>
            <div className="flex flex-col gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex-1">
              <Zap className="text-[#0F62FE]" size={24} />
              <p className="text-white font-bold text-sm">AI Shortlisting</p>
              <p className="text-slate-400 text-xs">Hire 10x faster.</p>
            </div>
          </motion.div>

          <motion.h1 variants={fadeIn} className="text-white text-[48px] font-extrabold tracking-tight leading-[1.05] mb-6">
            Hire Smarter. <br /> Validate Faster. <br /> Scale Anywhere.
          </motion.h1>
          <motion.p variants={fadeIn} className="text-slate-400 text-[15px] font-medium leading-relaxed mb-10 max-w-md">
            From automated skill validation to explainable AI shortlists, our powerful engine lets you hire based on verified proof seamlessly.
          </motion.p>
          
          {/* Decorative Pagination Dots */}
          <motion.div variants={fadeIn} className="flex items-center gap-2.5">
            <div className="w-8 h-1.5 bg-[#0F62FE] rounded-full shadow-[0_0_10px_rgba(15,98,254,0.5)]"></div>
            <div className="w-1.5 h-1.5 bg-white/20 rounded-full hover:bg-white/40 transition-colors cursor-pointer"></div>
            <div className="w-1.5 h-1.5 bg-white/20 rounded-full hover:bg-white/40 transition-colors cursor-pointer"></div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* RIGHT PANEL: Login Form Container */}
      <div className="w-full lg:w-[45%] h-full bg-[#0A0F1C] flex items-center justify-center p-8 lg:p-16 relative z-20">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5 z-0" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-[400px] relative z-10"
        >
          
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center mb-10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0F62FE] to-indigo-500 flex items-center justify-center shadow-lg shadow-[#0F62FE]/20">
              <Focus size={26} strokeWidth={2.5} className="text-white" />
            </div>
          </div>

          {/* Form Header */}
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-[32px] font-extrabold text-white tracking-tight mb-2 flex items-center justify-center lg:justify-start gap-2">
              Welcome Back <span className="inline-block animate-wave">👋</span>
            </h2>
            <p className="text-[14px] text-slate-400 font-medium">Log in to access your intelligence dashboard.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6" autoComplete="off">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-[13px] font-bold text-slate-300">Email Address</label>
              <div className="relative group">
                <input 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  type="email" 
                  name="email"
                  placeholder="name@company.com"
                  autoComplete="off"
                  required
                  className="w-full bg-[#111827] border border-slate-800 focus:border-[#0F62FE] focus:ring-1 focus:ring-[#0F62FE] rounded-xl px-4 py-3.5 text-[14px] text-white outline-none transition-all placeholder:text-slate-600 shadow-inner" 
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2 relative">
              <div className="flex items-center justify-between">
                <label className="block text-[13px] font-bold text-slate-300">Password</label>
                <Link href="#" className="text-[12px] font-semibold text-[#0F62FE] hover:text-indigo-400 transition-colors">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative group">
                <input 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  placeholder="••••••••••••"
                  autoComplete="new-password"
                  required
                  className="w-full bg-[#111827] border border-slate-800 focus:border-[#0F62FE] focus:ring-1 focus:ring-[#0F62FE] rounded-xl px-4 py-3.5 pr-12 text-[14px] text-white outline-none transition-all placeholder:text-slate-600 shadow-inner" 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-4 top-[14px] text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} strokeWidth={2} /> : <Eye size={18} strokeWidth={2} />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className={`w-full mt-4 py-3.5 rounded-xl text-white font-bold text-[15px] transition-all shadow-[0_0_20px_rgba(15,98,254,0.3)] hover:shadow-[0_0_25px_rgba(15,98,254,0.4)] ${
                loading ? "bg-[#0F62FE]/70 cursor-wait" : "bg-[#0F62FE] hover:bg-[#004BE6]"
              }`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
              ) : (
                "Sign In"
              )}
            </motion.button>

            {/* Divider */}
            <div className="flex items-center gap-4 py-4">
              <div className="flex-1 h-px bg-slate-800"></div>
              <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">Or continue with</span>
              <div className="flex-1 h-px bg-slate-800"></div>
            </div>

            {/* Google Button */}
            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="button" 
              className="w-full py-3.5 rounded-xl bg-[#111827] border border-slate-800 text-white font-bold text-[14px] flex items-center justify-center gap-3 hover:bg-slate-800 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.67 15.63 16.86 16.79 15.7 17.56V20.31H19.26C21 18.72 22.56 15.73 22.56 12.25Z" fill="#4285F4"/>
                <path d="M12 23C14.97 23 17.15 22.02 18.74 20.65L15.18 17.89C14.32 18.47 13.25 18.8 12 18.8C9.57001 18.8 7.38001 17.16 6.61001 14.96H2.93001V17.81C4.60001 21.12 8.02001 23 12 23Z" fill="#34A853"/>
                <path d="M6.61 14.96C6.42 14.38 6.31 13.76 6.31 13.12C6.31 12.48 6.42 11.86 6.61 11.28V8.37H2.93C2.24 9.74 1.83 11.28 1.83 12.92C1.83 14.56 2.24 16.1 2.93 17.47L6.61 14.96Z" fill="#FBBC05"/>
                <path d="M12 7.44C13.61 7.44 15.06 8.01 16.2 9.09L19.34 5.95C17.15 3.96 14.97 3 12 3C8.02 3 4.6 4.88 2.93 8.19L6.61 10.7C7.38 8.5 9.57 7.44 12 7.44Z" fill="#EA4335"/>
              </svg>
              Sign in with Google
            </motion.button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-[13px] text-slate-400 font-medium mt-8">
            Don't have an account? <Link href="/register" className="text-[#0F62FE] font-bold hover:text-indigo-400 transition-colors">Create one now</Link>
          </p>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes wave {
          0% { transform: rotate(0deg); }
          10% { transform: rotate(14deg); }
          20% { transform: rotate(-8deg); }
          30% { transform: rotate(14deg); }
          40% { transform: rotate(-4deg); }
          50% { transform: rotate(10deg); }
          60% { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-wave {
          animation: wave 2.5s infinite;
          transform-origin: 70% 70%;
        }
      `}</style>
    </div>
  );
}
