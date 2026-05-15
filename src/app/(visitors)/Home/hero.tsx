import React from 'react'
import { motion } from "framer-motion";
import { ArrowRight, Link, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-32 lg:pt-48 lg:pb-64 px-6 lg:px-12 bg-bg-primary overflow-hidden">
          {/* Ambient Glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-accent-emerald/5 rounded-full blur-[160px] pointer-events-none" />
          <div className="absolute top-[20%] right-0 w-96 h-96 bg-accent-blue/5 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="relative z-10 mx-auto">
            <motion.div 
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="flex flex-col items-center text-center mb-24"
            >
              <motion.div 
                variants={fadeInUp}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-accent-emerald text-[10px] md:text-[11px] font-black tracking-[0.25em] uppercase mb-10 shadow-xl backdrop-blur-md"
              >
                 The Future of Talent Validation
              </motion.div>
              
              <motion.h1 
                variants={fadeInUp}
                className="text-6xl md:text-8xl lg:text-[110px] font-black tracking-[-0.04em] leading-[0.95] text-gradient mb-12 max-w-5xl"
              >
                Verify Talent, <br />
                <span className="text-accent-emerald">Not Just CVs.</span>
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp}
                className="text-text-secondary text-lg md:text-2xl mb-16 leading-relaxed max-w-2xl font-medium"
              >
                Move beyond subjective screening. Our AI-driven validation layer evaluates candidates through real-world missions, providing objective capability scores.
              </motion.p>
              
              <motion.div 
                variants={fadeInUp}
                className="flex flex-col sm:flex-row items-center gap-6"
              >
                <Button>

                </Button>
                {/* <Link href="/register" className="w-full sm:w-auto bg-white text-bg-primary hover:bg-accent-emerald hover:text-bg-primary font-black py-6 px-12 rounded-full text-sm uppercase tracking-[0.15em] transition-all shadow-[0_20px_50px_rgba(255,255,255,0.1)] hover:shadow-[0_20px_50px_rgba(16,185,129,0.3)] hover:-translate-y-1 flex items-center justify-center gap-3 group">
                  Start Validating <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="#how-it-works" className="w-full sm:w-auto text-white hover:bg-white/10 hover:rounded-sm font-black py-6 px-10 text-sm uppercase tracking-[0.15em] hover:text-accent-emerald transition-all flex items-center justify-center gap-3 group">
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent-emerald transition-colors">
                    <Zap size={18} className="text-accent-amber fill-accent-amber" />
                  </div>
                  View Demo
                </Link> */}
              </motion.div>
            </motion.div>

            {/* Floating UI Elements / Dashboard Preview */}
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full mx-auto"
            >
              <div className="relative glass-card rounded-[3rem] p-3 md:p-6 overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.5)] border-white/10 group">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-emerald/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                {/* <img 
                  src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1600" 
                  alt="TalentLens Dashboard Preview" 
                  className="rounded-[2rem] md:rounded-[2.5rem] w-full h-auto object-cover opacity-90 transition-transform duration-1000 group-hover:scale-[1.02]"
                /> */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/90 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </section>
  )
}
