"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const faqs = [
    {
        question: "How does mission-based validation work?",
        answer: "Instead of relying on static resumes, we present candidates with real-world scenarios or 'missions' relevant to their role. Our AI analyzes their problem-solving steps, technical decisions, and critical thinking in real-time to generate a capability signal."
    },
    {
        question: "Is the evaluation truly bias-free?",
        answer: "Yes. Our AI evaluation layer focuses strictly on performance data and technical outputs. By removing personal identifiers and subjective interpretation from the initial validation phase, we ensure every candidate is judged solely on their merit."
    },
    {
        question: "How can hiring partners access validated talent?",
        answer: "Hiring partners can access our dashboard to view 'signals'—comprehensive capability reports of validated candidates. These reports provide much deeper insight than a standard interview, showing exactly how a candidate handles complex tasks."
    },
    {
        question: "Can I use TalentLens for upskilling my current team?",
        answer: "Absolutely. Our platform identifies skill gaps through diagnostic missions and provides personalized learning paths to help your current employees stay aligned with evolving market demands."
    },
    {
        question: "What industries do your missions cover?",
        answer: "We currently support high-growth sectors including Software Engineering, Product Management, Data Science, and Digital Marketing, with new industry-specific missions being added every month."
    }
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="relative py-32 px-6 lg:px-12 bg-background overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-emerald/5 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-[120px] -z-10" />

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <Badge variant="outline" className="mb-6 px-4 py-1 text-xs font-black uppercase tracking-[0.3em] border-accent-emerald/30 text-accent-emerald bg-accent-emerald/5">
                        Support
                    </Badge>
                    <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter mb-6">
                        Common <span className="text-accent-emerald">Questions</span>
                    </h2>
                    <p className="text-xl text-muted-foreground font-medium">
                        Everything you need to know about the future of talent validation.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`
                                    rounded-[2rem] border transition-all duration-500 overflow-hidden
                                    ${isOpen 
                                        ? "bg-card border-accent-emerald/30 shadow-2xl shadow-accent-emerald/5" 
                                        : "bg-card/30 border-border hover:border-accent-emerald/20"}
                                `}
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    className="w-full flex items-center justify-between p-8 text-left group"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className={`
                                            w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500
                                            ${isOpen ? "bg-accent-emerald text-primary-foreground" : "bg-muted text-muted-foreground group-hover:bg-accent-emerald/10 group-hover:text-accent-emerald"}
                                        `}>
                                            <HelpCircle size={20} />
                                        </div>
                                        <span className={`text-xl font-black tracking-tight transition-colors duration-500 ${isOpen ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>
                                            {faq.question}
                                        </span>
                                    </div>
                                    <div className={`
                                        w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-500
                                        ${isOpen ? "border-accent-emerald text-accent-emerald rotate-180" : "border-border text-muted-foreground"}
                                    `}>
                                        {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                        >
                                            <div className="px-8 pb-8 pl-26 md:pl-[6.5rem]">
                                                <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="mt-20 p-12 rounded-[3rem] bg-accent-emerald/5 border border-accent-emerald/20 text-center">
                    <h3 className="text-2xl font-black text-foreground mb-4">Still have questions?</h3>
                    <p className="text-muted-foreground font-medium mb-8">
                        Can't find the answer you're looking for? Please chat to our friendly team.
                    </p>
                    <button className="h-14 px-8 rounded-2xl bg-accent-emerald text-primary-foreground font-black uppercase tracking-widest text-xs hover:bg-accent-emerald/90 transition-all">
                        Get in Touch
                    </button>
                </div>
            </div>
        </section>
    );
}
