"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

const testimonials = [
    {
        quote: "Aniket has the rare ability to see both the macro product vision and the micro engineering constraints simultaneously. His work on the checkout platform was transformative.",
        name: "Sarah Chen",
        role: "VP Engineering, FinTech Global",
    },
    {
        quote: "Working with Aniket was a masterclass in product thinking. He turned ambiguous market signals into a razor-sharp roadmap that delivered 3x our expected outcomes.",
        name: "Marcus Hayes",
        role: "CEO, DataPulse Analytics",
    },
    {
        quote: "Aniket doesn't just build products — he builds systems that scale. His infrastructure decisions at CloudScale are still paying dividends two years later.",
        name: "Priya Sharma",
        role: "CTO, CloudScale Systems",
    },
];

export default function Testimonials() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    // Duplicate testimonials for infinite scroll effect
    const rollingTestimonials = [...testimonials, ...testimonials];

    return (
        <section ref={ref} data-section="testimonials" className="py-16 md:py-24 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
                className="max-w-7xl mx-auto px-5 md:px-8 lg:px-16"
            >
                {/* Header */}
                <div className="flex flex-col items-center mb-12 text-center">
                    <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary mb-3">
                        Testimonials
                    </div>
                    <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-4">
                        What People Say
                    </h2>
                    <p className="text-[var(--text-muted)] max-w-xl text-base md:text-lg">
                        I've had the pleasure of working with some amazing people across the industry. Hover over any card to pause and read.
                    </p>
                </div>
            </motion.div>

            {/* Marquee */}
            <div className="marquee-fade overflow-hidden">
                <div
                    className="flex marquee-track w-max gap-4 md:gap-6 py-6"
                    style={{ animationDuration: "50s" }}
                >
                    {rollingTestimonials.map((t, i) => (
                        <div
                            key={i}
                            className="bento-card bg-[var(--surface)] border border-[var(--border)] rounded-2xl px-8 py-10 w-[320px] md:w-[420px] flex-shrink-0 flex flex-col justify-between hover:bg-[var(--surface-hover)] transition-colors duration-300 group"
                        >
                            <div>
                                <Quote
                                    size={36}
                                    className="text-[var(--border)] mb-6 group-hover:text-primary transition-colors duration-300"
                                    fill="currentColor"
                                />
                                <blockquote className="text-base md:text-lg font-light leading-relaxed tracking-tight mb-8 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors duration-300">
                                    &ldquo;{t.quote}&rdquo;
                                </blockquote>
                            </div>
                            <div className="mt-auto flex items-center gap-4">
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                                    style={{ background: "rgba(232,168,56,0.1)", color: "var(--primary)" }}
                                    aria-hidden="true"
                                >
                                    {t.name[0]}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-[var(--text-primary)]">{t.name}</p>
                                    <p className="text-xs text-[var(--text-muted)] font-mono tracking-wide mt-0.5">
                                        {t.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
