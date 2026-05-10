// src/app/(auth)/register/page.tsx
"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Eye, EyeOff, Focus, ArrowLeft, User, Briefcase, CheckCircle2, ShieldCheck, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 1: Role, 2: Form, 3: OTP, 4: Success
  const [role, setRole] = useState<"candidate" | "recruiter" | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Forms State
  const [cForm, setCForm] = useState({ firstName: "", lastName: "", email: "", dob: "", gender: "", password: "", confirm: "" });
  const [rForm, setRForm] = useState({ companyName: "", about: "", location: "", contact: "", email: "", password: "", confirm: "" });
  
  // OTP State
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Password Logic
  const currentPassword = role === "candidate" ? cForm.password : rForm.password;
  const currentConfirm = role === "candidate" ? cForm.confirm : rForm.confirm;
  
  const pwdChecks = [
    { label: "At least 8 characters", valid: currentPassword.length >= 8 },
    { label: "At least one uppercase letter", valid: /[A-Z]/.test(currentPassword) },
    { label: "At least one number", valid: /[0-9]/.test(currentPassword) },
    { label: "At least one symbol", valid: /[^A-Za-z0-9]/.test(currentPassword) },
  ];
  
  const allChecksPass = pwdChecks.every(c => c.valid);
  const passwordsMatch = currentPassword === currentConfirm && currentPassword.length > 0;
  const showMismatchError = currentConfirm.length > 0 && !passwordsMatch;

  // Handlers
  const handleRoleSelect = (selectedRole: "candidate" | "recruiter") => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allChecksPass || !passwordsMatch) return;
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (role === "candidate") setStep(3); // Go to OTP
      else setStep(4); // Recruiters go straight to success
    }, 1200);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; 
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(4);
    }, 1200);
  };

  return (
    <div className="flex h-screen w-full bg-[#050A15] font-body items-center justify-center p-4 sm:p-8 overflow-hidden relative">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#0F62FE] rounded-full mix-blend-screen filter blur-[120px] opacity-20" />
      </div>

      {/* Main Centered Card Container */}
      <div className="w-full max-w-[640px] bg-white rounded-[32px] shadow-2xl relative z-20 flex flex-col max-h-full overflow-hidden border border-slate-100">
        
        {/* Brand Header */}
        <div className="shrink-0 px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <Link href="/" className="flex items-center gap-2.5 text-[#0A192F]">
            <Focus size={28} strokeWidth={2.5} className="text-[#0F62FE]" />
            <span className="font-extrabold text-xl tracking-tight">TalentLens</span>
          </Link>
          <Link href="/" className="flex items-center gap-2 text-[13px] font-bold text-slate-400 hover:text-slate-700 transition-colors">
            <ArrowLeft size={16} /> Home
          </Link>
        </div>

        {/* Scrollable Form Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-8 py-10 sm:px-12">
          
          {/* ── STEP 1: ROLE SELECTION ── */}
          {step === 1 && (
            <div className="animate-fade-up max-w-[480px] mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-[32px] font-extrabold text-slate-900 tracking-tight mb-2">Create an Account</h2>
                <p className="text-[14px] text-slate-500 font-medium">How are you planning to use TalentLens?</p>
              </div>

              <div className="space-y-4">
                <button onClick={() => handleRoleSelect("candidate")} className="w-full text-left p-6 rounded-2xl border border-slate-200 bg-white hover:border-[#0F62FE] hover:shadow-lg transition-all group">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-xl bg-blue-50 text-[#0F62FE] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <User size={28} strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-[18px]">I'm a Candidate</h3>
                      <p className="text-[13px] text-slate-500 mt-1 font-medium">I want to validate my skills and get hired.</p>
                    </div>
                  </div>
                </button>

                <button onClick={() => handleRoleSelect("recruiter")} className="w-full text-left p-6 rounded-2xl border border-slate-200 bg-white hover:border-[#0F62FE] hover:shadow-lg transition-all group">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-xl bg-blue-50 text-[#0F62FE] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Briefcase size={28} strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-[18px]">I'm a Recruiter</h3>
                      <p className="text-[13px] text-slate-500 mt-1 font-medium">I want to hire verified, top-tier talent.</p>
                    </div>
                  </div>
                </button>
              </div>

              <p className="text-center text-[13px] text-slate-500 font-medium mt-10">
                Already have an account? <Link href="/login" className="text-[#0F62FE] font-bold hover:underline">Log in here</Link>
              </p>
            </div>
          )}

          {/* ── STEP 2: REGISTRATION FORMS ── */}
          {step === 2 && (
            <div className="animate-fade-up">
              <button onClick={() => setStep(1)} className="flex items-center gap-1.5 text-[13px] font-bold text-slate-400 hover:text-slate-700 mb-6 transition-colors">
                <ArrowLeft size={14} /> Back
              </button>
              <div className="mb-8">
                <h2 className="text-[32px] font-extrabold text-slate-900 tracking-tight mb-2">
                  {role === "candidate" ? "Candidate Profile" : "Company Profile"}
                </h2>
                <p className="text-[14px] text-slate-500 font-medium">Fill in your details to get started.</p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-5" autoComplete="off">
                
                {/* CANDIDATE SPECIFIC FIELDS */}
                {role === "candidate" && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2">First Name</label>
                        <input required value={cForm.firstName} onChange={e => setCForm({ ...cForm, firstName: e.target.value })} type="text" placeholder="First Name" autoComplete="off" className="w-full bg-white border border-slate-200 focus:border-[#0F62FE] focus:ring-1 focus:ring-[#0F62FE] rounded-xl px-4 py-3 text-[14px] text-slate-900 outline-none transition-all placeholder:text-slate-400" />
                      </div>
                      <div>
                        <label className="block text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2">Last Name</label>
                        <input required value={cForm.lastName} onChange={e => setCForm({ ...cForm, lastName: e.target.value })} type="text" placeholder="Last Name" autoComplete="off" className="w-full bg-white border border-slate-200 focus:border-[#0F62FE] focus:ring-1 focus:ring-[#0F62FE] rounded-xl px-4 py-3 text-[14px] text-slate-900 outline-none transition-all placeholder:text-slate-400" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2">Date of Birth</label>
                        <input required value={cForm.dob} onChange={e => setCForm({ ...cForm, dob: e.target.value })} type="date" autoComplete="off" className="w-full bg-white border border-slate-200 focus:border-[#0F62FE] focus:ring-1 focus:ring-[#0F62FE] rounded-xl px-4 py-3 text-[14px] text-slate-900 outline-none transition-all placeholder:text-slate-400" />
                      </div>
                      <div>
                        <label className="block text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2">Gender</label>
                        <select required value={cForm.gender} onChange={e => setCForm({ ...cForm, gender: e.target.value })} autoComplete="off" className="w-full bg-white border border-slate-200 focus:border-[#0F62FE] focus:ring-1 focus:ring-[#0F62FE] rounded-xl px-4 py-3 text-[14px] text-slate-900 outline-none transition-all cursor-pointer">
                          <option value="" disabled>Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Prefer not to say</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                      <input required value={cForm.email} onChange={e => setCForm({ ...cForm, email: e.target.value })} type="email" placeholder="you@example.com" autoComplete="off" className="w-full bg-white border border-slate-200 focus:border-[#0F62FE] focus:ring-1 focus:ring-[#0F62FE] rounded-xl px-4 py-3 text-[14px] text-slate-900 outline-none transition-all placeholder:text-slate-400" />
                    </div>
                  </>
                )}

                {/* RECRUITER SPECIFIC FIELDS */}
                {role === "recruiter" && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2">Company Name</label>
                        <input required value={rForm.companyName} onChange={e => setRForm({ ...rForm, companyName: e.target.value })} type="text" placeholder="Acme Corp" autoComplete="off" className="w-full bg-white border border-slate-200 focus:border-[#0F62FE] focus:ring-1 focus:ring-[#0F62FE] rounded-xl px-4 py-3 text-[14px] text-slate-900 outline-none transition-all placeholder:text-slate-400" />
                      </div>
                      <div>
                        <label className="block text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2">HQ Location</label>
                        <input required value={rForm.location} onChange={e => setRForm({ ...rForm, location: e.target.value })} type="text" placeholder="Kigali, Rwanda" autoComplete="off" className="w-full bg-white border border-slate-200 focus:border-[#0F62FE] focus:ring-1 focus:ring-[#0F62FE] rounded-xl px-4 py-3 text-[14px] text-slate-900 outline-none transition-all placeholder:text-slate-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2">About Company</label>
                      <textarea required value={rForm.about} onChange={e => setRForm({ ...rForm, about: e.target.value })} rows={2} placeholder="Briefly describe what your company does..." autoComplete="off" className="w-full bg-white border border-slate-200 focus:border-[#0F62FE] focus:ring-1 focus:ring-[#0F62FE] rounded-xl px-4 py-3 text-[14px] text-slate-900 outline-none transition-all placeholder:text-slate-400 resize-none" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2">Contact Number</label>
                        <input required value={rForm.contact} onChange={e => setRForm({ ...rForm, contact: e.target.value })} type="tel" placeholder="+250 78..." autoComplete="off" className="w-full bg-white border border-slate-200 focus:border-[#0F62FE] focus:ring-1 focus:ring-[#0F62FE] rounded-xl px-4 py-3 text-[14px] text-slate-900 outline-none transition-all placeholder:text-slate-400" />
                      </div>
                      <div>
                        <label className="block text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2">Work Email</label>
                        <input required value={rForm.email} onChange={e => setRForm({ ...rForm, email: e.target.value })} type="email" placeholder="hr@company.rw" autoComplete="off" className="w-full bg-white border border-slate-200 focus:border-[#0F62FE] focus:ring-1 focus:ring-[#0F62FE] rounded-xl px-4 py-3 text-[14px] text-slate-900 outline-none transition-all placeholder:text-slate-400" />
                      </div>
                    </div>
                  </>
                )}

                {/* SHARED PASSWORD FIELDS */}
                <div className="pt-2 border-t border-slate-100 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="relative">
                      <label className="block text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2">Password</label>
                      <input required value={currentPassword} onChange={e => role === "candidate" ? setCForm({ ...cForm, password: e.target.value }) : setRForm({ ...rForm, password: e.target.value })} type={showPassword ? "text" : "password"} placeholder="••••••••" autoComplete="new-password" className="w-full bg-white border border-slate-200 focus:border-[#0F62FE] focus:ring-1 focus:ring-[#0F62FE] rounded-xl px-4 py-3 pr-10 text-[14px] text-slate-900 outline-none transition-all placeholder:text-slate-400" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 bottom-[14px] text-slate-400">
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    <div>
                      <label className="block text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2">Confirm Password</label>
                      <input required value={currentConfirm} onChange={e => role === "candidate" ? setCForm({ ...cForm, confirm: e.target.value }) : setRForm({ ...rForm, confirm: e.target.value })} type={showPassword ? "text" : "password"} placeholder="••••••••" autoComplete="new-password" className={`w-full bg-white border focus:ring-1 rounded-xl px-4 py-3 text-[14px] text-slate-900 outline-none transition-all placeholder:text-slate-400 ${showMismatchError ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' : 'border-slate-200 focus:border-[#0F62FE] focus:ring-[#0F62FE]'}`} />
                      {showMismatchError && (
                        <p className="text-[11px] font-bold text-rose-500 mt-1.5 flex items-center gap-1"><AlertCircle size={12}/> Passwords do not match</p>
                      )}
                    </div>
                  </div>

                  {/* Checklist Password Validation */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Password must contain:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                      {pwdChecks.map(check => (
                        <div key={check.label} className="flex items-center gap-2">
                          <CheckCircle2 size={16} className={check.valid ? "text-emerald-500" : "text-slate-300"} />
                          <span className={`text-[12px] font-bold ${check.valid ? "text-slate-800" : "text-slate-500"}`}>{check.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <button type="submit" disabled={loading || !allChecksPass || !passwordsMatch} 
                  className={`w-full mt-4 py-4 rounded-xl text-white font-bold text-[15px] transition-all shadow-sm ${loading ? "bg-[#111827]/80 cursor-wait" : "bg-[#111827] hover:bg-black disabled:opacity-40 disabled:hover:bg-[#111827]"}`}>
                  {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" /> : role === "candidate" ? "Create Profile" : "Register Company"}
                </button>
              </form>
            </div>
          )}

          {/* ── STEP 3: CANDIDATE OTP VERIFICATION ── */}
          {step === 3 && role === "candidate" && (
            <div className="animate-fade-up max-w-[420px] mx-auto text-center mt-10">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-6 text-[#0F62FE]">
                <ShieldCheck size={32} strokeWidth={2} />
              </div>
              <h2 className="text-[32px] font-extrabold text-slate-900 tracking-tight mb-2">Verify your email</h2>
              <p className="text-[14px] text-slate-500 font-medium mb-10 leading-relaxed">
                We've sent a 6-digit code to <span className="font-bold text-slate-900">{cForm.email}</span>. Enter it below to activate your account.
              </p>

              <div className="flex justify-center gap-2 sm:gap-3 mb-8">
                {otp.map((digit, i) => (
                  <input key={i} ref={el => { otpRefs.current[i] = el; }} value={digit}
                    onChange={e => handleOtpChange(i, e.target.value)} onKeyDown={e => handleOtpKeyDown(i, e)}
                    type="number" max="9"
                    className="w-12 h-14 sm:w-14 sm:h-16 bg-white border border-slate-300 focus:border-[#0F62FE] focus:ring-2 focus:ring-blue-100 rounded-xl text-center text-2xl font-extrabold text-slate-900 outline-none transition-all shadow-sm"
                  />
                ))}
              </div>

              <button onClick={handleOtpSubmit} disabled={loading || otp.join("").length < 6}
                className="w-full py-4 rounded-xl bg-[#111827] hover:bg-black text-white font-bold text-[15px] transition-all shadow-sm disabled:opacity-50">
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" /> : "Verify & Continue"}
              </button>
              <p className="text-center text-[13px] text-slate-500 font-medium mt-6">
                Didn't receive code? <button className="text-[#0F62FE] font-bold hover:underline">Resend</button>
              </p>
            </div>
          )}

          {/* ── STEP 4: SUCCESS & REDIRECT ── */}
          {step === 4 && (
            <div className="animate-fade-up text-center mt-12 max-w-[420px] mx-auto">
              <div className="w-20 h-20 bg-emerald-50 border border-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-6 text-emerald-600 shadow-sm">
                <CheckCircle2 size={40} strokeWidth={2.5} />
              </div>
              <h2 className="text-[36px] font-extrabold text-slate-900 tracking-tight mb-3">Registration Successful!</h2>
              <p className="text-[15px] text-slate-500 font-medium mb-10 leading-relaxed mx-auto">
                {role === "candidate" 
                  ? "Your TalentLens profile is active. You can now log in and start your first capability validation mission."
                  : "Your company account is set up. You can now log in and start sourcing verified talent."}
              </p>
              <Link href="/login" className="inline-flex justify-center w-full py-4 rounded-xl bg-[#111827] hover:bg-black text-white font-bold text-[15px] transition-all shadow-sm">
                Proceed to Login
              </Link>
            </div>
          )}

        </div>
      </div>

      <style>{`
        /* Hide arrows on number inputs for OTP */
        input[type=number]::-webkit-inner-spin-button, 
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
        /* Custom scrollbar to keep layout clean */
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #CBD5E1; }
      `}</style>
    </div>
  );
}