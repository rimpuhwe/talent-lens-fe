"use client";

import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Target, BrainCircuit, TrendingUp, ShieldCheck } from "lucide-react";

export default function SolutionSection() {
    const solutions = [
        {
            title: "Talent Validation",
            description:
                "Scenario-based missions that evaluate critical thinking, technical skills, and learning agility in real-time. Move beyond resumes to actual proof of capability.",
            image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80",
            icon: <Target className="w-6 h-6" />,
            color: "emerald"
        },
        {
            title: "Intelligent Matching",
            description:
                "Connect validated talent signals with specific job requirements for explainable, high-precision hiring matches that reduce turnover and improve culture fit.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
            icon: <BrainCircuit className="w-6 h-6" />,
            color: "blue"
        },
        {
            title: "Upskilling Engine",
            description:
                "Automated skill-gap analysis and personalized micro-learning paths to prepare talent for market demands. We help bridge the gap between education and employment.",
            image: "https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=800&q=80",
            icon: <TrendingUp className="w-6 h-6" />,
            color: "teal"
        },
        {
            title: "Bias-Free Evaluation",
            description:
                "Our AI-driven evaluation layer ensures that every candidate is judged solely on their performance in missions, eliminating subconscious bias from the hiring process.",
            image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
            icon: <ShieldCheck className="w-6 h-6" />,
            color: "purple"
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        },
    };

    return (
        <section id="solutions" className="relative w-full min-h-screen
            bg-background
            flex flex-col items-center justify-start
            pt-32 px-6 md:px-16 pb-32
            text-foreground">

            {/* Premium Background Glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent-emerald/5 rounded-full blur-[200px]" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent-blue/5 rounded-full blur-[200px]" />
            </div>

            {/* Header */}
            <div className="flex flex-col items-center text-center mb-24 relative z-10">
                <Badge
                    variant="outline"
                    className="mb-6 px-4 py-1 text-xs font-black uppercase tracking-[0.3em]
                    text-accent-emerald border-accent-emerald/30
                    rounded-full bg-accent-emerald/5"
                >
                    Core Ecosystem
                </Badge>

                <h2 className="text-4xl md:text-6xl font-black
                    text-foreground max-w-5xl mb-8 tracking-tighter">
                    A Modern Approach to <span className="text-accent-emerald">Talent Validation</span>
                </h2>

                <p className="text-xl text-muted-foreground max-w-3xl font-medium">
                    Our platform provides a comprehensive suite of tools designed to replace 
                    outdated certifications with real-world capability signals.
                </p>
            </div>

            {/* Bento Grid */}
            <motion.div
                className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {/* Card 1 - Talent Validation */}
                <motion.div
                    className="group relative bg-card/30 backdrop-blur-xl rounded-[2.5rem] overflow-hidden
                    border border-border transition-all duration-700
                    flex flex-col hover:border-accent-emerald/30 hover:shadow-2xl hover:shadow-accent-emerald/5"
                    variants={cardVariants}
                >
                    <div className="p-10 flex-grow">
                        <div className="w-12 h-12 rounded-2xl bg-accent-emerald/10 flex items-center justify-center text-accent-emerald mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                            {solutions[0].icon}
                        </div>
                        <h3 className="text-2xl font-black text-foreground mb-4 tracking-tight">{solutions[0].title}</h3>
                        <p className="text-muted-foreground text-base leading-relaxed font-medium">{solutions[0].description}</p>
                    </div>
                    <div className="h-56 overflow-hidden">
                        <motion.img
                            src={solutions[0].image}
                            alt={solutions[0].title}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            whileHover={{ scale: 1.1 }}
                        />
                    </div>
                </motion.div>

                {/* Card 2 - Intelligent Matching */}
                <motion.div
                    className="group relative bg-card/30 backdrop-blur-xl rounded-[2.5rem] overflow-hidden
                    border border-border transition-all duration-700
                    flex flex-col hover:border-accent-blue/30 hover:shadow-2xl hover:shadow-accent-blue/5"
                    variants={cardVariants}
                >
                    <div className="p-10 flex-grow">
                        <div className="w-12 h-12 rounded-2xl bg-accent-blue/10 flex items-center justify-center text-accent-blue mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                            {solutions[1].icon}
                        </div>
                        <h3 className="text-2xl font-black text-foreground mb-4 tracking-tight">{solutions[1].title}</h3>
                        <p className="text-muted-foreground text-base leading-relaxed font-medium">{solutions[1].description}</p>
                    </div>
                    <div className="h-56 overflow-hidden">
                        <motion.img
                            src={solutions[1].image}
                            alt={solutions[1].title}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            whileHover={{ scale: 1.1 }}
                        />
                    </div>
                </motion.div>

                {/* Card 3 - Tall Card: Upskilling Engine */}
                <motion.div
                    className="group relative bg-card/30 backdrop-blur-xl rounded-[2.5rem] overflow-hidden
                    border border-border transition-all duration-700
                    flex flex-col md:row-span-2 hover:border-accent-teal/30 hover:shadow-2xl hover:shadow-accent-teal/5"
                    variants={cardVariants}
                >
                    <div className="p-10 flex-grow">
                        <div className="w-12 h-12 rounded-2xl bg-accent-teal/10 flex items-center justify-center text-accent-teal mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                            {solutions[2].icon}
                        </div>
                        <h3 className="text-2xl font-black text-foreground mb-4 tracking-tight">{solutions[2].title}</h3>
                        <p className="text-muted-foreground text-base leading-relaxed font-medium mb-8">{solutions[2].description}</p>
                        <div className="space-y-4">
                            {["Personalized Paths", "Real-time Feedback", "Industry Alignment"].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 text-sm font-black text-foreground/80">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent-teal" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="h-full overflow-hidden mt-auto">
                        <motion.img
                            src={solutions[2].image}
                            alt={solutions[2].title}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            whileHover={{ scale: 1.05 }}
                        />
                    </div>
                </motion.div>

                {/* Card 4 - Wide card: Bias-Free Evaluation */}
                <motion.div
                    className="group relative bg-card/30 backdrop-blur-xl rounded-[2.5rem] overflow-hidden
                    border border-border transition-all duration-700
                    flex flex-col md:col-span-2 hover:border-accent-purple/30 hover:shadow-2xl hover:shadow-accent-purple/5"
                    variants={cardVariants}
                >
                    <div className="flex flex-col md:flex-row h-full">
                        <div className="p-10 md:w-1/2 flex flex-col justify-center">
                            <div className="w-12 h-12 rounded-2xl bg-accent-purple/10 flex items-center justify-center text-accent-purple mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                                {solutions[3].icon}
                            </div>
                            <h3 className="text-2xl font-black text-foreground mb-4 tracking-tight">{solutions[3].title}</h3>
                            <p className="text-muted-foreground text-base leading-relaxed font-medium">{solutions[3].description}</p>
                        </div>
                        <div className="md:w-1/2 overflow-hidden min-h-[250px]">
                            <motion.img
                                src={solutions[3].image}
                                alt={solutions[3].title}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                whileHover={{ scale: 1.1 }}
                            />
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
