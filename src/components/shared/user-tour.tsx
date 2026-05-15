"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TourStep {
  title: string;
  description: string;
  targetId: string;
  position: "top" | "bottom" | "left" | "right";
}

interface UserTourProps {
  steps: TourStep[];
  onComplete?: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function UserTour({ steps, onComplete, isOpen, setIsOpen }: UserTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0, height: 0 });

  useEffect(() => {
    if (isOpen && steps[currentStep]) {
      const element = document.getElementById(steps[currentStep].targetId);
      if (element) {
        const rect = element.getBoundingClientRect();
        setCoords({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height,
        });
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [currentStep, isOpen, steps]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsOpen(false);
      onComplete?.();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!isOpen) return null;

  const step = steps[currentStep];

  return (
    <div className="fixed inset-0 z-[10000] pointer-events-none">
      {/* Dim Overlay with Hole */}
      <div className="absolute inset-0 bg-black/60 pointer-events-auto" style={{
        clipPath: `polygon(
          0% 0%, 
          0% 100%, 
          ${coords.left}px 100%, 
          ${coords.left}px ${coords.top}px, 
          ${coords.left + coords.width}px ${coords.top}px, 
          ${coords.left + coords.width}px ${coords.top + coords.height}px, 
          ${coords.left}px ${coords.top + coords.height}px, 
          ${coords.left}px 100%, 
          100% 100%, 
          100% 0%
        )`
      }} />

      {/* Highlight Box */}
      <motion.div
        animate={{
          top: coords.top - 4,
          left: coords.left - 4,
          width: coords.width + 8,
          height: coords.height + 8,
        }}
        className="absolute border-2 border-accent-emerald rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.5)] pointer-events-none"
      />

      {/* Tooltip Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ 
          opacity: 1, 
          y: 0, 
          scale: 1,
          top: step.position === "bottom" ? coords.top + coords.height + 20 : coords.top - 200,
          left: coords.left + coords.width / 2 - 150,
        }}
        className="absolute w-[300px] bg-bg-primary border border-white/10 rounded-3xl p-6 shadow-2xl pointer-events-auto backdrop-blur-xl"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-accent-emerald">
            <Sparkles size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Step {currentStep + 1} of {steps.length}</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>

        <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">{step.description}</p>

        <div className="flex items-center justify-between">
          <button 
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="p-2 rounded-xl border border-white/5 text-muted-foreground hover:text-white disabled:opacity-0 transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          
          <Button 
            onClick={handleNext}
            className="bg-accent-emerald hover:bg-emerald-600 text-white rounded-xl px-6 font-bold"
          >
            {currentStep === steps.length - 1 ? "Finish" : "Next"}
            <ChevronRight size={16} className="ml-2" />
          </Button>
        </div>

        {/* Tail */}
        <div className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-bg-primary border-l border-t border-white/10 rotate-45 ${
          step.position === "bottom" ? "-top-2" : "-bottom-2"
        }`} />
      </motion.div>
    </div>
  );
}
