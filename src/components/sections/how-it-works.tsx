"use client";

import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Upload, Zap, Target } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function HowItWorksSection() {
    const containerRef = useRef(null);

    const steps = [
        {
            number: "1",
            title: "Select a Mission",
            description:
                "Browse through our industry-specific missions designed by experts. Choose challenges that match your career goals and technical stack.",
            icon: <Upload className="w-6 h-6" />,
            image: "https://images.unsplash.com/photo-1618044733300-9472054094ee?w=800&q=80",
        },
        {
            number: "2",
            title: "Solve Challenges",
            description:
                "Dive into real-world scenarios. Our interactive platform tracks your problem-solving process, not just the final answer.",
            icon: <Zap className="w-6 h-6" />,
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        },
        {
            number: "3",
            title: "Get Validated Signal",
            description:
                "Receive a comprehensive capability report. Your results are verified and ready to be shared with our network of global hiring partners.",
            icon: <Target className="w-6 h-6" />,
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        },
    ];

    const DURATION = 5000; // 5 seconds per step for better UX
    const [activeIndex, setActiveIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((p) => {
                if (p >= 1) {
                    setActiveIndex((prev) => (prev + 1) % steps.length);
                    return 0;
                }
                return p + 0.01;
            });
        }, DURATION / 100);

        return () => clearInterval(interval);
    }, [activeIndex, steps.length]);

    return (
        <section
            ref={containerRef}
            className="
                relative w-full min-h-screen
                bg-background
                flex flex-col items-center justify-start
                pt-32 px-6 md:px-16 pb-32
                overflow-hidden
            "
        >
            {/* ⭐ PREMIUM BACKGROUND LAYERS ⭐ */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                {/* Soft luxury glow across the section */}
                <div className="
                    absolute inset-0
                    bg-gradient-to-br from-emerald-500/5 to-blue-500/5
                    blur-3xl opacity-80
                " />

                {/* Mesh gradient blobs */}
                <div className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-[130px]" />
                <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] rounded-full bg-blue-500/10 blur-[160px]" />
            </div>

            {/* HEADER */}
            <div className="flex flex-col items-center text-center mb-24 relative z-10">
                <Badge variant="outline" className="mb-6 px-4 py-1 text-sm font-black uppercase tracking-[0.3em] border-accent-emerald/30 text-accent-emerald bg-accent-emerald/5">
                    Process
                </Badge>

                <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter max-w-4xl">
                    Just 3 steps to your <span className="text-accent-emerald">Dream Career</span>
                </h2>
            </div>

            {/* CONTENT WRAPPER */}
            <div className="w-full max-w-7xl grid md:grid-cols-2 gap-20 items-center relative z-10">

                {/* LEFT — STEPS */}
                <div className="space-y-16">
                    {steps.map((step, index) => {
                        const isActive = index === activeIndex;

                        return (
                            <div 
                                key={index} 
                                className="relative flex gap-6 md:gap-8 cursor-pointer group"
                                onClick={() => {
                                    setActiveIndex(index);
                                    setProgress(0);
                                }}
                            >
                                {/* Vertical progress line */}
                                <div className="absolute left-2 top-0 w-[2px] h-full bg-muted rounded-full overflow-hidden">
                                    {isActive && (
                                        <motion.div
                                            className="bg-accent-emerald w-full origin-top"
                                            style={{ height: `${progress * 100}%` }}
                                        />
                                    )}
                                </div>

                                {/* Icon bubble */}
                                <div
                                    className={`
                                        ml-8 flex-shrink-0
                                        w-14 h-14 rounded-2xl
                                        flex items-center justify-center
                                        transition-all duration-500
                                        ${isActive 
                                            ? "bg-accent-emerald text-primary-foreground scale-110 shadow-lg shadow-accent-emerald/20" 
                                            : "bg-muted text-muted-foreground group-hover:bg-accent-emerald/10 group-hover:text-accent-emerald"}
                                    `}
                                >
                                    {step.icon}
                                </div>

                                {/* Text */}
                                <div className="flex flex-col pt-1">
                                    <h3 className={`text-xl md:text-2xl font-black mb-2 transition-colors duration-500 ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                                        {step.number}. {step.title}
                                    </h3>
                                    <p className={`leading-relaxed text-lg transition-colors duration-500 ${isActive ? "text-foreground/80" : "text-muted-foreground/60"}`}>
                                        {step.description}
                                    </p>
                                </div>

                            </div>
                        );
                    })}
                </div>

                {/* RIGHT — IMAGE */}
                <div className="relative h-[500px] md:h-[600px] w-full">
                    <motion.div
                        key={activeIndex}
                        className="
                            absolute inset-0 rounded-[2.5rem] overflow-hidden
                            shadow-2xl border border-border
                            backdrop-blur-xl
                        "
                        initial={{ opacity: 0, scale: 0.95, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 1.05, x: -20 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Image
                            src={steps[activeIndex].image}
                            alt={steps[activeIndex].title}
                            fill
                            priority
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-10 left-10 right-10">
                            <p className="text-white/80 font-black text-xs uppercase tracking-[0.3em] mb-2">Step {steps[activeIndex].number}</p>
                            <h4 className="text-white text-3xl font-black tracking-tight">{steps[activeIndex].title}</h4>
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
