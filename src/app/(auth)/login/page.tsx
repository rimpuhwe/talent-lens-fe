// src/app/(auth)/login/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Focus, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Unified login: backend will determine the role based on the user's account
    setTimeout(() => router.push("/dashboard"), 900);
  };

  return (
    <div className="flex h-screen w-full bg-[#050A15] font-body overflow-hidden">
      
      {/* LEFT PANEL: Context & Branding */}
      <div className="hidden lg:flex flex-col justify-between w-[55%] h-full relative p-10 lg:p-14">
        {/* Abstract Tech Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#050A15]/60 via-transparent to-[#050A15]/90 z-10" />
          <div className="absolute inset-0 bg-[#0F62FE]/20 mix-blend-overlay z-10" />
          <img 
            src="https://res.cloudinary.com/dcgmi6w24/image/upload/v1778404915/Communicating_across_different_cultures_can_add_a_unique_layer_to_networking__What_s_one_challenge_you_ve_faced_when_networking_internationally_and_how_did_you_overcome_it__Drop_your_experiences_and_tips_for_nav_rhgdth.jpg" 
            alt="linking global talent with AI" 
            className="w-full h-full object-cover opacity-70 grayscale"
          />
        </div>

        {/* Top Header Row */}
        <div className="relative z-20 flex items-center justify-between w-full">
          <Link href="/" className="flex items-center gap-2 text-white">
            <Focus size={32} strokeWidth={2.5} />
            <span className="font-extrabold text-2xl tracking-tight">TalentLens</span>
          </Link>
          <Link href="/" className="flex items-center gap-2 text-[13px] font-medium text-slate-300 hover:text-white transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>

        {/* Bottom Promotional Copy (Aligned to TalentLens) */}
        <div className="relative z-20 max-w-lg mb-4">
          <h1 className="text-white text-[42px] font-extrabold tracking-tight leading-[1.1] mb-5">
            Hire Smarter. <br /> Validate Faster. <br /> Scale Anywhere.
          </h1>
          <p className="text-slate-300 text-[14px] font-medium leading-relaxed mb-8">
            From automated skill validation to explainable AI shortlists, our powerful engine lets you hire based on verified proof seamlessly.
          </p>
          
          {/* Decorative Pagination Dots */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white/40 rounded-full"></div>
            <div className="w-1 h-1 bg-white/40 rounded-full"></div>
            <div className="w-1 h-1 bg-white/40 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: Login Form Container */}
      <div className="w-full lg:w-[45%] h-full bg-white lg:rounded-l-[32px] flex items-center justify-center p-8 lg:p-16 relative z-20 shadow-[-20px_0_40px_rgba(0,0,0,0.15)]">
        <div className="w-full max-w-[380px]">
          
          {/* Form Header */}
          <div className="mb-10">
            <h2 className="text-[36px] font-extrabold text-slate-900 tracking-tight mb-2">Welcome Back!</h2>
            <p className="text-[14px] text-slate-500 font-medium">Log in to access your intelligence dashboard.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5" autoComplete="off">
            {/* Email Field */}
            <div>
              <label className="block text-[13px] font-bold text-slate-900 mb-2">Email Address</label>
              <input 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                type="email" 
                name="email"
                placeholder="Enter your email address"
                autoComplete="off"
                required
                className="w-full bg-white border border-slate-200 focus:border-[#0F62FE] focus:ring-1 focus:ring-[#0F62FE] rounded-xl px-4 py-3.5 text-[14px] text-slate-900 outline-none transition-all placeholder:text-slate-400" 
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="block text-[13px] font-bold text-slate-900 mb-2">Password</label>
              <input 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                type={showPassword ? "text" : "password"} 
                name="password"
                placeholder="Enter your password"
                autoComplete="new-password"
                required
                className="w-full bg-white border border-slate-200 focus:border-[#0F62FE] focus:ring-1 focus:ring-[#0F62FE] rounded-xl px-4 py-3.5 pr-12 text-[14px] text-slate-900 outline-none transition-all placeholder:text-slate-400" 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute right-4 bottom-[14px] text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff size={18} strokeWidth={2} /> : <Eye size={18} strokeWidth={2} />}
              </button>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between py-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-[#0F62FE] focus:ring-[#0F62FE] cursor-pointer" />
                <span className="text-[13px] font-medium text-slate-500 group-hover:text-slate-700 transition-colors">Remember Me</span>
              </label>
              <Link href="#" className="text-[13px] font-medium text-slate-500 hover:text-[#0F62FE] transition-colors">
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button 
              type="submit"
              disabled={loading}
              className={`w-full mt-2 py-3.5 rounded-xl text-white font-bold text-[15px] transition-all shadow-sm ${
                loading ? "bg-[#111827]/80 cursor-wait" : "bg-[#111827] hover:bg-black"
              }`}
            >
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" /> : "Login"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 py-2">
              <div className="flex-1 h-px bg-slate-200"></div>
              <span className="text-[11px] text-slate-400 font-medium">Or continue with</span>
              <div className="flex-1 h-px bg-slate-200"></div>
            </div>

            {/* Google Button */}
            <button type="button" className="w-full py-3.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-[14px] flex items-center justify-center gap-3 hover:bg-slate-50 transition-colors shadow-sm">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.67 15.63 16.86 16.79 15.7 17.56V20.31H19.26C21 18.72 22.56 15.73 22.56 12.25Z" fill="#4285F4"/>
                <path d="M12 23C14.97 23 17.15 22.02 18.74 20.65L15.18 17.89C14.32 18.47 13.25 18.8 12 18.8C9.57001 18.8 7.38001 17.16 6.61001 14.96H2.93001V17.81C4.60001 21.12 8.02001 23 12 23Z" fill="#34A853"/>
                <path d="M6.61 14.96C6.42 14.38 6.31 13.76 6.31 13.12C6.31 12.48 6.42 11.86 6.61 11.28V8.37H2.93C2.24 9.74 1.83 11.28 1.83 12.92C1.83 14.56 2.24 16.1 2.93 17.47L6.61 14.96Z" fill="#FBBC05"/>
                <path d="M12 7.44C13.61 7.44 15.06 8.01 16.2 9.09L19.34 5.95C17.15 3.96 14.97 3 12 3C8.02 3 4.6 4.88 2.93 8.19L6.61 10.7C7.38 8.5 9.57 7.44 12 7.44Z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-[13px] text-slate-500 font-medium mt-8">
            Don't have an account? <Link href="/register" className="text-slate-900 font-bold hover:underline">Sign up here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}