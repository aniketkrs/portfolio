"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
    { value: 67, suffix: "%", label: "Avg. Metric Lift", highlight: true },
    { value: 8, suffix: "+", label: "Years in Product" },
    { value: 40, prefix: "$", suffix: "M", label: "ARR Driven" },
    { value: 12, suffix: "+", label: "Products Shipped" },
    { value: 8, suffix: "M", label: "Global Users" },
    { value: 150, suffix: "+", label: "Engineers Led" },
];

function AnimatedStat({ value, prefix, suffix, label, highlight, isInView }: {
    value: number;
    prefix?: string;
    suffix?: string;
    label: string;
    highlight?: boolean;
    isInView: boolean;
}) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const end = value;
        const duration = 2000;
        const increment = end / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [isInView, value]);

    return (
        <div className={`p-6 md:p-8 border-r border-b border-[var(--border)] last:border-r-0 ${highlight ? "relative overflow-hidden" : ""}`}>
            {highlight && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
            )}
            <div className="relative z-10">
                <span className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-none ${highlight ? "text-primary" : ""}`}>
                    {prefix}{count}{suffix}
                </span>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    {label}
                </p>
            </div>
        </div>
    );
}

export default function ImpactNumbers() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="px-8 lg:px-16 py-20 max-w-7xl mx-auto">
            {/* Wrapper — relative so the Impact word and grid can be layered */}
            <div className="relative">

                {/* "Impact" word — z-0, behind the grid. Peeks out from top-left edge */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 1, delay: 0.3 }}
                    aria-hidden="true"
                    className="absolute -top-[5vw] -left-4 z-0 pointer-events-none select-none"
                >
                    <span className="text-[18vw] sm:text-[14vw] md:text-[11vw] lg:text-[10vw] font-display font-black uppercase tracking-tighter leading-none text-[var(--text-primary)] opacity-[0.18] dark:opacity-[0.12] whitespace-nowrap">
                        Impact
                    </span>
                </motion.div>

                {/* Stats grid — z-10, sits on top and overlays the word behind it */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="relative z-10 grid grid-cols-2 md:grid-cols-3 border border-[var(--border)] rounded-card overflow-hidden bg-[var(--background)]/90 backdrop-blur-xl"
                >
                    {stats.map((stat) => (
                        <AnimatedStat
                            key={stat.label}
                            {...stat}
                            isInView={isInView}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
