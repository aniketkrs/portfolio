"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const timelineEvents = [
    {
        year: "2024",
        role: "Senior PM — AI Products",
        company: "TechScale Inc.",
        bullets: ["Led AI search rebuild — +41% conversion", "Shipped v2 recommendation engine in 6 months", "Grew MAU from 2.1M to 3.2M"],
    },
    {
        year: "2022",
        role: "Senior PM — Platform",
        company: "FinTech Corp",
        bullets: ["Rebuilt payments infra — ↓67% failed txns", "Led 3-squad organisation of 22 people", "First PM promoted to Group PM in the org"],
    },
    {
        year: "2021",
        role: "Group PM — Growth",
        company: "GrowthOS",
        bullets: ["Designed PLG loops — activation 23% → 67%", "Reduced CAC 40% via product-led referral", "Managed 2 PMs and 2 squads"],
    },
    {
        year: "2019",
        role: "Lead PM — 0 to 1",
        company: "MindfulCo",
        bullets: ["Built wellness app from zero — 400K downloads", "Top-5 Health & Fitness in 8 months", "Hired and built entire product team"],
    },
    {
        year: "2017",
        role: "Associate PM",
        company: "StartupLab",
        bullets: ["First PM role — consumer mobile", "Launched iOS app with 50K+ users", "Built data analytics function from scratch"],
    },
];

export default function Timeline() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start center", "end center"],
    });
    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section className="section-container" id="timeline" aria-labelledby="timeline-heading" ref={ref}>
            <div className="text-center mb-16">
                <div className="text-label mb-3">Career Journey</div>
                <h2 id="timeline-heading" className="text-display-lg font-display">
                    The path that led here
                </h2>
            </div>

            <div className="relative max-w-3xl mx-auto">
                {/* Background line */}
                <div
                    className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
                    style={{ background: "var(--border)" }}
                    aria-hidden="true"
                />

                {/* Animated fill line */}
                <motion.div
                    className="absolute left-6 md:left-1/2 top-0 w-px origin-top -translate-x-1/2"
                    style={{ height: lineHeight, background: "var(--accent)" }}
                    aria-hidden="true"
                />

                {/* Events */}
                <div className="space-y-12">
                    {timelineEvents.map((event, i) => (
                        <motion.div
                            key={event.year}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className={`relative flex gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} pl-14 md:pl-0`}
                        >
                            {/* Dot */}
                            <div
                                className="absolute left-4 md:left-1/2 w-5 h-5 rounded-full -translate-x-1/2 flex items-center justify-center z-10"
                                style={{ background: "var(--accent)", top: "4px" }}
                                aria-hidden="true"
                            >
                                <div className="w-2 h-2 rounded-full" style={{ background: "var(--bg)" }} />
                            </div>

                            {/* Content */}
                            <div className={`card p-6 md:w-[calc(50%-24px)] ${i % 2 === 0 ? "md:mr-auto" : "md:ml-auto"}`}>
                                <div className="flex items-center gap-2 mb-2">
                                    <span
                                        className="font-mono text-xs font-bold px-2 py-1 rounded"
                                        style={{ background: "rgba(232,168,56,0.1)", color: "var(--accent)" }}
                                    >
                                        {event.year}
                                    </span>
                                </div>
                                <h3 className="text-heading-lg font-heading mb-1">{event.role}</h3>
                                <p className="text-sm mb-4" style={{ color: "var(--accent)" }}>
                                    {event.company}
                                </p>
                                <ul className="space-y-1">
                                    {event.bullets.map((b) => (
                                        <li
                                            key={b}
                                            className="text-body-sm flex items-start gap-2"
                                            style={{ color: "var(--text-secondary)" }}
                                        >
                                            <span style={{ color: "var(--accent)" }}>·</span>
                                            {b}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
