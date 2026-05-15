"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Briefcase,
  CheckCircle2,
  Eye,
  EyeOff,
  Focus,
  Globe,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  User,
  Zap,
} from "lucide-react";

import { useRouter } from "next/navigation";
import GlobeDemo from "@/components/globe-demo";
import { useToast } from "@/components/shared/toast-context";

type Role = "candidate" | "recruiter";
type Step = 1 | 2 | 3 | 4;

const candidateInitialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  birthDate: "",
  gender: "MALE",
};

const recruiterInitialState = {
  companyName: "",
  email: "",
  contactNumber: "",
  password: "",
  confirmPassword: "",
  location: "",
  companySummary: "",
};

export default function RegisterPage() {
  const router = useRouter();
  const { success, error: toastError } = useToast();

  const [step, setStep] = useState<Step>(1);
  const [role, setRole] = useState<Role | null>(null);

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [candidateData, setCandidateData] = useState(
    candidateInitialState
  );

  const [recruiterData, setRecruiterData] = useState(
    recruiterInitialState
  );

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const activePassword =
    role === "candidate"
      ? candidateData.password
      : recruiterData.password;

  const activeConfirmPassword =
    role === "candidate"
      ? candidateData.confirmPassword
      : recruiterData.confirmPassword;

  const pwdChecks = [
    {
      label: "8+ characters",
      valid: activePassword.length >= 8,
    },
    {
      label: "Uppercase letter",
      valid: /[A-Z]/.test(activePassword),
    },
    {
      label: "Number",
      valid: /[0-9]/.test(activePassword),
    },
    {
      label: "Special character",
      valid: /[^A-Za-z0-9]/.test(activePassword),
    },
  ];

  const allChecksPass = pwdChecks.every((c) => c.valid);

  const passwordsMatch =
    activePassword === activeConfirmPassword &&
    activePassword.length > 0;

  const handleRoleSelect = (selectedRole: Role) => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleCandidateRegister = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(
        "/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            firstName:
              candidateData.firstName,
            lastName:
              candidateData.lastName,
            email: candidateData.email,
            password:
              candidateData.password,
            confirmPassword:
              candidateData.confirmPassword,
            birthDate:
              candidateData.birthDate,
            gender: candidateData.gender,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      success(
        "Candidate account created",
        "Verify your email to continue."
      );

      setStep(3);
    } catch (error: any) {
      toastError(
        "Registration Failed",
        error.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRecruiterRegister = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!allChecksPass || !passwordsMatch) return;

    setLoading(true);

    try {
      const response = await fetch("/api/register/recruiter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName: recruiterData.companyName,
          emailAddress: recruiterData.email,
          contactNumber: recruiterData.contactNumber,
          password: recruiterData.password,
          confirmPassword: recruiterData.confirmPassword,
          location: recruiterData.location,
          companySummary: recruiterData.companySummary,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Recruiter registration failed");
      }

      success(
        "Recruiter account created",
        data.message || "Your organization account is now active."
      );

      setStep(4);
    } catch (error: any) {
      toastError(
        "Registration Failed",
        error.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (code = otp.join("")) => {
    if (loading || code.length < 6) return;

    setLoading(true);

    try {
      const response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: candidateData.email,
          otp: code,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid or expired code.");
      }

      success(
        "Email verified",
        "Your account is now active."
      );

      router.push("/login");
    } catch (error: any) {
      toastError(
        "Verification Failed",
        error.message || "Invalid or expired code."
      );
    } finally {
      setLoading(false);
    }
  };

  const fillOtp = (value: string, startIndex = 0) => {
    const digits = value.replace(/\D/g, "").slice(0, 6 - startIndex);
    if (!digits) return;

    const newOtp = [...otp];
    digits.split("").forEach((digit, offset) => {
      newOtp[startIndex + offset] = digit;
    });

    setOtp(newOtp);

    const nextIndex = Math.min(startIndex + digits.length, 5);
    otpRefs.current[nextIndex]?.focus();

    const code = newOtp.join("");
    if (code.length === 6) {
      void handleVerifyOtp(code);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        {/* Globe */}
        <div className="absolute inset-0 flex items-center justify-center scale-[1.2] md:scale-[1.4] opacity-90">
          <GlobeDemo />
        </div>

        {/* Overlays */}
        <div className="absolute inset-0 bg-[#020617]/70" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(15,98,254,0.18),transparent_45%)]" />

        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.04]" />

        {/* Glow */}
        <div className="absolute top-[-200px] left-[-150px] h-[500px] w-[500px] rounded-full bg-[#0F62FE]/20 blur-[140px]" />

        <div className="absolute bottom-[-200px] right-[-100px] h-[450px] w-[450px] rounded-full bg-cyan-400/10 blur-[140px]" />
      </div>

      {/* NAVBAR */}
      

      {/* CONTENT */}
      <section className="relative z-10 flex min-h-[calc(100vh-88px)] items-center justify-center px-6 pb-10">
        <div className="grid w-full max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[1.1fr_520px]">
          {/* LEFT LANDING CONTENT */}
          <div className="hidden flex-col justify-center lg:flex">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-2xl"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0F62FE]/20 bg-[#0F62FE]/10 px-4 py-2 text-sm font-medium text-blue-200 backdrop-blur-xl">
                Intelligent Hiring Infrastructure
              </div>

              <h1 className="mb-6 text-6xl font-black leading-[1.05] tracking-tight">
                Connect verified talent with modern recruiters.
              </h1>

              <p className="mb-10 max-w-xl text-lg leading-relaxed text-slate-300">
                TalentLens helps candidates showcase verified
                technical skills while recruiters discover,
                evaluate, and hire faster using AI-powered
                workflows.
              </p>
            </motion.div>
          </div>

          {/* RIGHT CARD */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {/* STEP 1 */}
              {step === 1 && (
                <motion.div
                  key="role"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="rounded-[36px] border border-white/10 bg-white/[0.05] p-8 shadow-[0_10px_60px_rgba(0,0,0,0.4)] backdrop-blur-3xl md:p-10"
                >
                  <div className="mb-10 text-center">
                    {/* <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F62FE] to-indigo-500 shadow-[0_0_50px_rgba(15,98,254,0.35)]">
                      <Focus size={30} />
                    </div> */}

                    <h2 className="mb-3 text-4xl font-black tracking-tight">
                      Create Account
                    </h2>

                    <p className="text-slate-400">
                      Choose how you want to use TalentLens.
                    </p>
                  </div>

                  <div className="space-y-5">
                    {/* Candidate */}
                    <button
                      onClick={() =>
                        handleRoleSelect("candidate")
                      }
                      className="group flex w-full items-center gap-5 rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-left transition-all duration-300 hover:border-emerald-400/30 hover:bg-white/[0.06]"
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10">
                        <User className="text-emerald-400" />
                      </div>

                      <div>
                        <h3 className="mb-1 text-lg font-bold">
                          I am a Candidate
                        </h3>

                        <p className="text-sm text-slate-400">
                          Showcase skills and find
                          opportunities.
                        </p>
                      </div>

                      <Zap className="ml-auto text-emerald-400 opacity-0 transition-opacity group-hover:opacity-100" />
                    </button>

                    {/* Recruiter */}
                    <button
                      onClick={() =>
                        handleRoleSelect("recruiter")
                      }
                      className="group flex w-full items-center gap-5 rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-left transition-all duration-300 hover:border-[#0F62FE]/30 hover:bg-white/[0.06]"
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0F62FE]/10">
                        <Briefcase className="text-[#0F62FE]" />
                      </div>

                      <div>
                        <h3 className="mb-1 text-lg font-bold">
                          I am a Recruiter
                        </h3>

                        <p className="text-sm text-slate-400">
                          Hire verified engineering talent.
                        </p>
                      </div>

                      <Target className="ml-auto text-[#0F62FE] opacity-0 transition-opacity group-hover:opacity-100" />
                    </button>
                  </div>

                  <div className="mt-8 text-center text-sm text-slate-400">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="font-semibold text-[#0F62FE]"
                    >
                      Login
                    </Link>
                  </div>
                </motion.div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="rounded-[36px] border border-white/10 bg-white/[0.05] p-8 shadow-[0_10px_60px_rgba(0,0,0,0.4)] backdrop-blur-3xl md:p-10"
                >
                  <button
                    onClick={() => setStep(1)}
                    className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
                  >
                    <ArrowLeft size={16} />
                    Back
                  </button>

                  <h2 className="mb-2 text-3xl font-black">
                    {role === "candidate"
                      ? "Candidate Registration"
                      : "Recruiter Registration"}
                  </h2>

                  <p className="mb-8 text-sm text-slate-400">
                    Complete your information to continue.
                  </p>

                  {/* CANDIDATE FORM */}
                  {role === "candidate" && (
                    <form
                      onSubmit={handleCandidateRegister}
                      className="space-y-5"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          label="First Name"
                          value={candidateData.firstName}
                          onChange={(e) =>
                            setCandidateData({
                              ...candidateData,
                              firstName: e.target.value,
                            })
                          }
                        />

                        <Input
                          label="Last Name"
                          value={candidateData.lastName}
                          onChange={(e) =>
                            setCandidateData({
                              ...candidateData,
                              lastName: e.target.value,
                            })
                          }
                        />
                      </div>

                      <Input
                        label="Email"
                        type="email"
                        value={candidateData.email}
                        onChange={(e) =>
                          setCandidateData({
                            ...candidateData,
                            email: e.target.value,
                          })
                        }
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          label="Birth Date"
                          type="date"
                          value={candidateData.birthDate}
                          onChange={(e) =>
                            setCandidateData({
                              ...candidateData,
                              birthDate: e.target.value,
                            })
                          }
                        />

                        <div>
                          <label className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            Gender
                          </label>

                          <select
                            value={candidateData.gender}
                            onChange={(e) =>
                              setCandidateData({
                                ...candidateData,
                                gender: e.target.value,
                              })
                            }
                            className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm outline-none transition-all focus:border-[#0F62FE] focus:ring-2 focus:ring-[#0F62FE]/30"
                          >
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <PasswordInput
                          label="Password"
                          value={candidateData.password}
                          showPassword={showPassword}
                          setShowPassword={
                            setShowPassword
                          }
                          onChange={(e) =>
                            setCandidateData({
                              ...candidateData,
                              password: e.target.value,
                            })
                          }
                        />

                        <Input
                          label="Confirm Password"
                          type={
                            showPassword
                              ? "text"
                              : "password"
                          }
                          value={
                            candidateData.confirmPassword
                          }
                          onChange={(e) =>
                            setCandidateData({
                              ...candidateData,
                              confirmPassword:
                                e.target.value,
                            })
                          }
                        />
                      </div>

                      <PasswordChecks
                        pwdChecks={pwdChecks}
                      />

                      <SubmitButton
                        loading={loading}
                        disabled={
                          !allChecksPass ||
                          !passwordsMatch
                        }
                      />
                    </form>
                  )}

                  {/* RECRUITER FORM */}
                  {role === "recruiter" && (
                    <form
                      onSubmit={handleRecruiterRegister}
                      className="space-y-5"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          label="Company Name"
                          value={
                            recruiterData.companyName
                          }
                          onChange={(e) =>
                            setRecruiterData({
                              ...recruiterData,
                              companyName:
                                e.target.value,
                            })
                          }
                        />

                        <Input
                          label="Phone"
                          value={
                            recruiterData.contactNumber
                          }
                          onChange={(e) =>
                            setRecruiterData({
                              ...recruiterData,
                              contactNumber:
                                e.target.value,
                            })
                          }
                        />
                      </div>

                      <Input
                        label="Company Email"
                        type="email"
                        value={recruiterData.email}
                        onChange={(e) =>
                          setRecruiterData({
                            ...recruiterData,
                            email: e.target.value,
                          })
                        }
                      />

                      <Input
                        label="Location"
                        value={recruiterData.location}
                        onChange={(e) =>
                          setRecruiterData({
                            ...recruiterData,
                            location: e.target.value,
                          })
                        }
                      />

                      <div>
                        <label className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Company Summary
                        </label>

                        <textarea
                          rows={4}
                          value={
                            recruiterData.companySummary
                          }
                          onChange={(e) =>
                            setRecruiterData({
                              ...recruiterData,
                              companySummary:
                                e.target.value,
                            })
                          }
                          className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none transition-all focus:border-[#0F62FE] focus:ring-2 focus:ring-[#0F62FE]/30"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <PasswordInput
                          label="Password"
                          value={recruiterData.password}
                          showPassword={showPassword}
                          setShowPassword={
                            setShowPassword
                          }
                          onChange={(e) =>
                            setRecruiterData({
                              ...recruiterData,
                              password: e.target.value,
                            })
                          }
                        />

                        <Input
                          label="Confirm Password"
                          type={
                            showPassword
                              ? "text"
                              : "password"
                          }
                          value={
                            recruiterData.confirmPassword
                          }
                          onChange={(e) =>
                            setRecruiterData({
                              ...recruiterData,
                              confirmPassword:
                                e.target.value,
                            })
                          }
                        />
                      </div>

                      <PasswordChecks
                        pwdChecks={pwdChecks}
                      />

                      <SubmitButton
                        loading={loading}
                        disabled={
                          !allChecksPass ||
                          !passwordsMatch
                        }
                      />
                    </form>
                  )}
                </motion.div>
              )}

              {/* OTP */}
              {step === 3 && (
                <motion.div
                  key="otp"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-[36px] border border-white/10 bg-white/[0.05] p-10 text-center shadow-[0_10px_60px_rgba(0,0,0,0.4)] backdrop-blur-3xl"
                >
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-[#0F62FE]/10">
                    <ShieldCheck className="text-[#0F62FE]" />
                  </div>

                  <h2 className="mb-3 text-3xl font-black">
                    Verify Email
                  </h2>

                  <p className="mb-8 text-slate-400">
                    Enter the verification code sent to{" "}
                    <span className="font-semibold text-white">
                      {candidateData.email}
                    </span>
                  </p>

                  <div className="mb-8 flex justify-center gap-3">
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => {
                          otpRefs.current[i] = el;
                        }}
                        value={digit}
                        onChange={(e) => {
                          fillOtp(e.target.value, i);
                        }}
                        onPaste={(e) => {
                          e.preventDefault();
                          fillOtp(e.clipboardData.getData("text"), i);
                        }}
                        onKeyDown={(e) => {
                          if (
                            e.key === "Backspace" &&
                            !otp[i] &&
                            i > 0
                          ) {
                            otpRefs.current[i - 1]?.focus();
                          }
                        }}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        className="h-16 w-12 rounded-2xl border border-white/10 bg-white/[0.04] text-center text-2xl font-black outline-none focus:border-[#0F62FE]"
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => handleVerifyOtp()}
                    disabled={
                      loading ||
                      otp.join("").length < 6
                    }
                    className="w-full rounded-2xl bg-[#0F62FE] py-4 font-bold transition-all hover:bg-[#0F62FE]/90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading
                      ? "Verifying..."
                      : "Verify Email"}
                  </button>
                </motion.div>
              )}

              {/* SUCCESS */}
              {step === 4 && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-[36px] border border-white/10 bg-white/[0.05] p-10 text-center shadow-[0_10px_60px_rgba(0,0,0,0.4)] backdrop-blur-3xl"
                >
                  <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-[30px] bg-[#0F62FE]/10">
                    <Rocket
                      size={42}
                      className="text-[#0F62FE]"
                    />
                  </div>

                  <h1 className="mb-4 text-4xl font-black">
                    Welcome to TalentLens
                  </h1>

                  <p className="mx-auto mb-10 max-w-md text-slate-400">
                    Your account has been successfully
                    created. Continue to access your
                    dashboard and start using the
                    platform.
                  </p>

                  <Link href="/login">
                    <button className="w-full rounded-2xl bg-white py-4 font-bold text-black transition-all hover:bg-slate-200">
                      Continue to Login
                    </button>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* COMPONENTS */
/* -------------------------------------------------------------------------- */

function Input({
  label,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div>
      <label className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </label>

      <input
        required
        type={type}
        value={value}
        onChange={onChange}
        className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm outline-none transition-all placeholder:text-slate-500 focus:border-[#0F62FE] focus:ring-2 focus:ring-[#0F62FE]/30"
      />
    </div>
  );
}

function PasswordInput({
  label,
  value,
  onChange,
  showPassword,
  setShowPassword,
}: {
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="relative">
      <label className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </label>

      <input
        required
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 pr-12 text-sm outline-none transition-all focus:border-[#0F62FE] focus:ring-2 focus:ring-[#0F62FE]/30"
      />

      <button
        type="button"
        onClick={() =>
          setShowPassword(!showPassword)
        }
        className="absolute right-4 top-[42px] text-slate-400"
      >
        {showPassword ? (
          <EyeOff size={18} />
        ) : (
          <Eye size={18} />
        )}
      </button>
    </div>
  );
}

function PasswordChecks({
  pwdChecks,
}: {
  pwdChecks: {
    label: string;
    valid: boolean;
  }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      {pwdChecks.map((check) => (
        <div
          key={check.label}
          className="flex items-center gap-2"
        >
          <CheckCircle2
            size={14}
            className={
              check.valid
                ? "text-emerald-400"
                : "text-slate-600"
            }
          />

          <span
            className={`text-xs font-medium ${
              check.valid
                ? "text-slate-300"
                : "text-slate-500"
            }`}
          >
            {check.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function SubmitButton({
  loading,
  disabled,
}: {
  loading: boolean;
  disabled: boolean;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      type="submit"
      disabled={loading || disabled}
      className="w-full rounded-2xl bg-[#0F62FE] py-4 text-sm font-bold transition-all hover:bg-[#0F62FE]/90 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? (
        <div className="mx-auto h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      ) : (
        "Create Account"
      )}
    </motion.button>
  );
}
