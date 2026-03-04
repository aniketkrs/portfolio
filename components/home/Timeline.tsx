"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const entries = [
    {
        year: "2024",
        role: "Senior Product Manager",
        company: "FinTech Global",
        description: "Led cross-functional teams of 40+ to rebuild the global checkout platform, processing $1.2B+ annually. Reduced page load to 0.4s.",
        tags: ["Payments", "Infrastructure", "Scale"],
        metrics: ["$1.2B Processed", "0.4s Load Time", "84% Conversion"],
    },
    {
        year: "2022",
        role: "Product Manager II",
        company: "CloudScale Systems",
        description: "Drove the merchant onboarding platform revamp, achieving 30% faster activation through ML-driven risk scoring and workflow automation.",
        tags: ["ML", "Onboarding", "Automation"],
        metrics: ["30% Faster Activation", "99.9% Accuracy"],
    },
    {
        year: "2020",
        role: "Product Manager",
        company: "DataPulse Analytics",
        description: "Built the real-time analytics dashboard used by 5M+ daily users. Increased retention by 15% through personalized data storytelling.",
        tags: ["Analytics", "Retention", "UX"],
        metrics: ["5M+ Users", "15% Retention Lift"],
    },
    {
        year: "2018",
        role: "Associate PM",
        company: "NeuralPath AI",
        description: "First PM hire. Established product development processes from 0→1. Shipped the core conversational AI engine used across 3 product lines.",
        tags: ["0→1", "AI", "Conversational"],
        metrics: ["3 Product Lines", "0→1 Build"],
    },
];

export default function Timeline() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // We have 4 entries. To scroll them horizontally across the screen,
    // we map scrollYProgress [0, 1] to an x percentage. 
    // We adjust the scroll distance so it travels further on mobile vs desktop
    // We use a -90% or so value instead of -100% to keep the last card somewhat visible at the end of the scroll
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-95%"]);

    return (
        <section ref={targetRef} className="h-[400vh] relative bg-[var(--background)]">
            <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
                {/* Background Typography */}
                <div className="absolute inset-0 flex flex-col items-center justify-center select-none pointer-events-none z-0 overflow-hidden">
                    <span className="text-[25vw] sm:text-[20vw] md:text-[18vw] lg:text-[20vw] font-display font-black uppercase tracking-tighter leading-none text-center text-[var(--text-primary)] opacity-30 dark:opacity-10 transition-all duration-300">
                        Career
                    </span>
                    <span className="text-[25vw] sm:text-[20vw] md:text-[18vw] lg:text-[20vw] font-display font-black uppercase tracking-tighter leading-none text-center text-[var(--text-primary)] opacity-30 dark:opacity-10 transition-all duration-300">
                        Path
                    </span>
                </div>

                {/* Horizontal Scroll Container (All Breakpoints) */}
                <motion.div
                    style={{ x }}
                    className="flex flex-row gap-8 md:gap-16 px-6 md:px-[10vw] z-10 w-max will-change-transform items-center"
                >
                    {/* Intro Spacer Screen - Keeps the cards off-screen initially so the user just sees "CAREER PATH" */}
                    <div className="w-[100vw] flex-shrink-0" />

                    {entries.map((entry, idx) => {
                        // Stagger the vertical placement slightly for a dynamic rhythm
                        const isEven = idx % 2 === 0;

                        return (
                            <div
                                key={entry.year}
                                className={`w-[85vw] md:w-[60vw] lg:w-[45vw] max-w-2xl flex-shrink-0 flex flex-col justify-center ${isEven ? "mt-[-5vh] md:mt-[-20vh]" : "mt-[5vh] md:mt-[20vh]"
                                    }`}
                            >
                                {/* FAT DESIGN CARD - APPLE DARK GLASS EFFECT */}
                                <div className="bg-white/5 dark:bg-black/40 backdrop-blur-3xl border-[3px] md:border-[5px] border-white/20 dark:border-white/10 rounded-[2rem] md:rounded-[3rem] p-6 sm:p-8 md:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-white/30 hover:bg-white/10 dark:hover:bg-black/60 transition-all duration-500 overflow-hidden relative group">

                                    {/* Massive Year Watermark inside Card */}
                                    <div className="absolute top-0 right-[-5%] text-[10rem] md:text-[20rem] font-black font-mono text-[var(--text-primary)] opacity-5 tracking-tighter leading-none select-none pointer-events-none z-0 transition-opacity duration-500 group-hover:opacity-10">
                                        {entry.year.slice(2)}
                                    </div>

                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-6 md:mb-8">
                                            <span className="px-4 py-2 md:px-6 md:py-3 bg-primary text-black font-black text-sm md:text-lg uppercase tracking-widest rounded-full shadow-[3px_3px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.2)]">
                                                {entry.year}
                                            </span>
                                            <span className="font-mono text-[10px] md:text-sm font-bold tracking-widest uppercase text-[var(--text-muted)]">
                                                {entry.company}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-[var(--text-primary)] leading-[1.1] mb-4 md:mb-8">
                                            {entry.role}
                                        </h3>

                                        <p className="text-sm sm:text-base md:text-2xl text-[var(--text-secondary)] font-medium leading-relaxed mb-8 md:mb-12">
                                            {entry.description}
                                        </p>

                                        <div className="mt-auto space-y-6 md:space-y-8">
                                            {/* Tags area */}
                                            <div className="flex flex-wrap gap-2 md:gap-3">
                                                {entry.tags.map((tag) => (
                                                    <span key={tag} className="px-3 py-1.5 md:px-4 md:py-2 border-2 border-[var(--border)] rounded-full text-[9px] md:text-xs font-black uppercase tracking-widest bg-[var(--background)]">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Metrics area with massive emphasis */}
                                            <div className="pt-4 md:pt-8 border-t-[3px] md:border-t-4 border-[var(--border)] flex flex-wrap gap-4 md:gap-10">
                                                {entry.metrics.map((m) => (
                                                    <span
                                                        key={m}
                                                        className="text-base md:text-2xl font-black tracking-tight text-primary whitespace-nowrap"
                                                    >
                                                        {m}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
