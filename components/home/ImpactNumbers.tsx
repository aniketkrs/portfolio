"use client";

import { motion } from "framer-motion";

const stats = [
    { value: "12+", label: "Products Shipped", sublabel: "across AI, platform & consumer" },
    { value: "8M+", label: "Users Reached", sublabel: "peak combined MAU" },
    { value: "67%", label: "Avg. Metric Lift", sublabel: "across core OKRs" },
    { value: "$40M+", label: "Revenue Driven", sublabel: "directly attributable ARR" },
    { value: "8 yrs", label: "PM Experience", sublabel: "in tech startups & scale-ups" },
    { value: "3", label: "AI Products Live", sublabel: "built and shipped personally" },
];

export default function ImpactNumbers() {
    return (
        <section
            className="py-24 relative overflow-hidden"
            aria-labelledby="impact-heading"
            style={{ background: "var(--bg-surface)" }}
        >
            {/* Background glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                aria-hidden="true"
                style={{
                    background: "radial-gradient(ellipse 800px 400px at 50% 50%, rgba(232,168,56,0.05) 0%, transparent 70%)",
                }}
            />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <div className="text-label mb-3">By the numbers</div>
                    <h2 id="impact-heading" className="text-display-lg font-display">
                        Impact that compounds
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ border: "1px solid var(--border)" }}>
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            className="text-center p-10"
                            style={{ background: "var(--bg-card)", borderRight: "1px solid var(--border)" }}
                        >
                            <div className="metric-number mb-2">{stat.value}</div>
                            <div className="text-sm font-bold mb-1" style={{ color: "var(--text-primary)" }}>
                                {stat.label}
                            </div>
                            <div className="text-body-sm" style={{ color: "var(--text-muted)" }}>
                                {stat.sublabel}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
