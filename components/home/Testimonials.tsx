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
        <section ref={ref} data-section="testimonials" className="relative py-20 overflow-hidden">
            <div className="relative mt-20 md:mt-32">
                {/* Background Watermark Word - positioned slightly above the cards to create overlap */}
                <div className="absolute -top-[8vw] md:-top-[6vw] left-0 right-0 z-0 pointer-events-none select-none opacity-[0.04] dark:opacity-[0.03]">
                    <span className="block text-[16vw] sm:text-[13vw] md:text-[11vw] lg:text-[10vw] font-black leading-none tracking-tighter text-black dark:text-white whitespace-nowrap text-center">
                        TESTIMONIALS
                    </span>
                </div>

                {/* Marquee - placed relative with z-10 to overlay the watermark */}
                <div className="relative z-10 marquee-fade overflow-hidden">
                    <div
                        className="flex marquee-track w-max gap-4 md:gap-6 py-6"
                        style={{ animationDuration: "50s" }}
                    >
                        {rollingTestimonials.map((t, i) => (
                            <div
                                key={i}
                                className="bento-card !bg-white/60 dark:!bg-black/40 backdrop-blur-lg border border-[var(--border)] rounded-2xl px-8 py-10 w-[320px] md:w-[420px] flex-shrink-0 flex flex-col justify-between transition-colors duration-300 group hover:!bg-white/80 dark:hover:!bg-black/60"
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
            </div>
        </section>
    );
}
