"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ArrowRight, Check, Zap, ShieldCheck, 
  Target, BrainCircuit, TrendingUp, Users, 
  Briefcase, Mail, Phone, Focus 
} from "lucide-react";

import { ModeToggle } from "@/components/shared/theme-toggle";
import { Footer } from "@/components/ui/footer-section";
import { AuroraBackground } from "@/components/ui/aurora-background";
import FeatureSection from "@/components/ui/stack-feature-section";
import NavHeader from "@/components/blocks/nav-header";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// New Sections
import HowItWorksSection from "@/components/sections/how-it-works";
import SolutionSection from "@/components/sections/solution";
import FAQSection from "@/components/sections/faq";
import GlobeDemo from "@/components/globe-demo";
import MainNavigation from "@/components/shared/navigation/main-navigation";
import { X } from "lucide-react";

const fadeInUp = {
  initial: { y: 60, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function HomePage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground font-body overflow-x-hidden selection:bg-accent-emerald/30">
      
      {/* Navigation */}
      <MainNavigation />

      <main>
        {/* Hero Section with Aurora Background */}
        <AuroraBackground className="z-0">
          <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-6 pt-32 pb-20 relative z-10">
            <motion.div
              initial={{ opacity: 0.0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="relative flex flex-col gap-6 items-start text-left max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-emerald/10 border border-accent-emerald/20 text-accent-emerald text-xs font-black uppercase tracking-[0.2em] mb-4">
                {/* <SparklesIcon className="w-4 h-4" /> */}
                <span>The Future of Talent Validation</span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground dark:text-white tracking-tighter leading-[0.9] mb-4">
                Validate Talent with
                <span className="text-accent-emerald">Zero Bias.</span>
              </h1>
              <p className="font-medium text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed">
                TalentLens introduces an intelligent capability validation layer that replaces certificates with proof of work through scenario based missions.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button size="lg" className="h-14 px-8 rounded-2xl bg-accent-emerald hover:bg-accent-emerald/90 text-primary-foreground font-black uppercase tracking-widest text-xs group">
                  Get Started Now
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => setShowVideo(true)}
                  className="h-14 px-8 rounded-2xl border-input hover:bg-accent/10 font-black text-foreground dark:text-white uppercase tracking-widest text-xs"
                >
                  Watch Demo
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="relative w-full h-[400px] md:h-[600px] flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-accent-emerald/5 blur-[120px] rounded-full" />
              <GlobeDemo />
            </motion.div>
          </div>
        </AuroraBackground>

        {/* How It Works Section */}
        <HowItWorksSection />

        {/* Solutions Section (Bento Grid) */}
        <SolutionSection />

        {/* Stack Feature Section (Integrations) */}
        <div className="mx-auto px-6 py-32">
           <div className="text-center mb-16">
              <p className="text-accent-emerald font-black text-[12px] tracking-[0.5em] uppercase mb-4">Integrations</p>
              <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-tight">Built with modern tech</h2>
           </div>
           <FeatureSection />
        </div>

        {/* Pricing Section */}
        <section id="pricing" className="py-48 px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <p className="text-accent-emerald font-black text-[12px] tracking-[0.5em] uppercase mb-6">Plans & Pricing</p>
            <h2 className="text-5xl md:text-7xl font-black text-foreground tracking-tight mb-12">Scalable Solutions</h2>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-16">
              <span className={cn("text-sm font-black transition-colors", billingCycle === "monthly" ? "text-foreground" : "text-muted-foreground")}>Monthly</span>
              <button 
                onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
                className="relative w-16 h-8 rounded-full bg-accent/10 border border-border p-1 transition-colors hover:border-accent-emerald/50"
              >
                <div className={cn("w-6 h-6 rounded-full bg-accent-emerald transition-transform duration-300 shadow-lg shadow-accent-emerald/20", billingCycle === "yearly" ? "translate-x-8" : "translate-x-0")} />
              </button>
              <span className={cn("text-sm font-black transition-colors", billingCycle === "yearly" ? "text-foreground" : "text-muted-foreground")}>Yearly <span className="text-accent-emerald ml-1 font-black">(-20%)</span></span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                name: "Basic", 
                price: billingCycle === "monthly" ? "0" : "0", 
                desc: "Perfect for students starting their career.", 
                features: ["5 Missions/month", "Standard Scorecard", "Community Access", "Public Profile"],
                recommended: false
              },
              { 
                name: "Professional", 
                price: billingCycle === "monthly" ? "29" : "24", 
                desc: "For serious candidates ready to stand out.", 
                features: ["Unlimited Missions", "Advanced Signal Analysis", "Recruiter Messaging", "Priority Placement", "PDF Reports"],
                recommended: true
              },
              { 
                name: "Enterprise", 
                price: "Custom", 
                desc: "For organizations seeking bias-free hiring.", 
                features: ["Custom Missions", "LMS Integration", "Recruiter Dashboard", "Dedicated Support", "API Access"],
                recommended: false
              }
            ].map((plan, i) => (
              <motion.div 
                key={i}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "relative p-12 rounded-[3.5rem] border transition-all duration-700 flex flex-col h-full",
                  plan.recommended 
                    ? "bg-accent/5 border-accent-emerald/30 shadow-[0_40px_80px_-20px_rgba(16,185,129,0.15)] ring-1 ring-accent-emerald/50" 
                    : "bg-card/30 border-border hover:border-accent-emerald/30"
                )}
              >
                {plan.recommended && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-accent-emerald text-primary-foreground text-[10px] font-black uppercase tracking-[0.2em] px-6 py-2 rounded-full shadow-xl">
                    Most Popular
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="text-xl font-black text-foreground uppercase tracking-widest mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-5xl font-black text-foreground tracking-tighter">{typeof plan.price === 'number' ? `$${plan.price}` : plan.price}</span>
                    {typeof plan.price === 'number' && <span className="text-muted-foreground font-bold text-sm">/mo</span>}
                  </div>
                  <p className="text-muted-foreground text-sm font-medium leading-relaxed">{plan.desc}</p>
                </div>
                <div className="space-y-4 mb-12 flex-grow">
                  {plan.features.map(feat => (
                    <div key={feat} className="flex items-center gap-3 text-sm font-bold text-foreground">
                      <div className="w-5 h-5 rounded-full bg-accent-emerald/10 flex items-center justify-center text-accent-emerald">
                        <Check size={12} strokeWidth={4} />
                      </div>
                      {feat}
                    </div>
                  ))}
                </div>
                <Button 
                  className={cn(
                    "w-full h-14 rounded-2xl font-black uppercase tracking-widest text-xs",
                    plan.recommended ? "bg-accent-emerald text-primary-foreground hover:bg-accent-emerald/90" : "bg-accent/10 text-foreground hover:bg-accent/20"
                  )}
                >
                  Get Started
                </Button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection />

        <Footer />
      </main>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-12"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowVideo(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl aspect-video bg-emerald-950/20 border border-white/10 rounded-3xl md:rounded-[3rem] overflow-hidden shadow-2xl"
            >
              <button 
                onClick={() => setShowVideo(false)}
                className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all backdrop-blur-md"
              >
                <X size={24} />
              </button>

              <div className="absolute inset-0 flex items-center justify-center">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                  title="TalentLens Demo" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}