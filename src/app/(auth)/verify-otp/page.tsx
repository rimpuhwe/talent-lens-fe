"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, ArrowLeft, 
  RefreshCcw, CheckCircle2, Lock
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/shared/toast-context";

export default function VerifyOtp() {
  const { success: toastSuccess, error: toastError } = useToast();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [timer, setTimer] = useState(59);
  const [email, setEmail] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    setEmail(new URLSearchParams(window.location.search).get("email") || "");

    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const submitOtp = async (code: string) => {
    if (loading || code.length < 6) return;

    setLoading(true);

    try {
      const response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp: code,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid or expired code.");
      }

      toastSuccess("Verification complete", "Your account is ready.");
      setSuccess(true);
    } catch (error: any) {
      toastError("Verification Failed", error.message || "Invalid or expired code.");
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
    inputRefs.current[nextIndex]?.focus();

    const code = newOtp.join("");
    if (code.length === 6) {
      void submitOtp(code);
    }
  };

  const handleChange = (index: number, value: string) => {
    fillOtp(value, index);
  };

  const handlePaste = (index: number, e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    fillOtp(e.clipboardData.getData("text"), index);
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void submitOtp(otp.join(""));
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#050A15] text-white flex items-center justify-center p-6">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full text-center"
        >
          <div className="w-24 h-24 bg-accent-emerald/10 border border-accent-emerald/20 rounded-[3rem] flex items-center justify-center mx-auto mb-8 shadow-glow">
            <CheckCircle2 size={48} className="text-accent-emerald" />
          </div>
          <h1 className="text-4xl font-black tracking-tight mb-4">Verification Successful</h1>
          <p className="text-muted-foreground mb-12">Your account is now fully secured. You're ready to start your journey.</p>
          <Link href="/login">
            <Button className="w-full bg-white hover:bg-slate-100 text-black py-8 rounded-2xl text-lg font-black transition-all">
              Go to Login
              <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050A15] text-white flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent-emerald/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        <Link href="/register" className="inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors mb-12 font-bold group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Signup
        </Link>

        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock size={32} className="text-accent-emerald" />
          </div>
          <h1 className="text-3xl font-black tracking-tight mb-2">Security Verification</h1>
          <p className="text-muted-foreground">We've sent a 6-digit code to your email. Enter it below to continue.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="flex justify-between gap-3">
            {otp.map((digit, i) => (
              <input 
                key={i}
                ref={(el) => {
                  inputRefs.current[i] = el;
                }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onPaste={(e) => handlePaste(i, e)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                inputMode="numeric"
                pattern="[0-9]*"
                className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl text-center text-2xl font-black outline-none focus:border-accent-emerald transition-colors"
              />
            ))}
          </div>

          <div className="space-y-4">
            <Button 
              type="submit"
              disabled={loading || otp.join("").length < 6}
              className="w-full bg-accent-emerald hover:bg-emerald-600 text-white py-8 rounded-2xl text-lg font-black transition-all shadow-glow"
            >
              {loading ? "Verifying..." : "Verify Code"}
            </Button>

            <div className="text-center">
              {timer > 0 ? (
                <p className="text-sm text-muted-foreground">Resend code in <span className="text-white font-bold">{timer}s</span></p>
              ) : (
                <button type="button" className="inline-flex items-center gap-2 text-sm text-accent-emerald font-black uppercase tracking-widest hover:text-emerald-400 transition-colors">
                  <RefreshCcw size={14} /> Resend Code
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
