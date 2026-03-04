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
        <div className={`p-6 md:p-8 border-r border-b border-[var(--border)] last:border-r-0 ${highlight ? "relative overflow-hidden" : ""
            }`}>
            {highlight && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
            )}
            <div className="relative z-10">
                <span className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-none ${highlight ? "text-primary" : ""
                    }`}>
                    {prefix}
                    {count}
                    {suffix}
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
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
                className="mb-12"
            >
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
                    Numbers that{" "}
                    <span className="italic text-primary">matter.</span>
                </h2>
            </motion.div>

            {/* Stat Grid */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="grid grid-cols-2 md:grid-cols-3 border border-[var(--border)] rounded-card overflow-hidden"
            >
                {stats.map((stat) => (
                    <AnimatedStat
                        key={stat.label}
                        {...stat}
                        isInView={isInView}
                    />
                ))}
            </motion.div>
        </section>
    );
}
