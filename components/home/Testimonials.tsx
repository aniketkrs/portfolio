"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/data/content";

export default function Testimonials() {
    const [index, setIndex] = useState(0);
    const current = testimonials[index];

    return (
        <section className="section-container" aria-labelledby="testimonials-heading">
            <div className="text-label mb-3 text-center">Testimonials</div>
            <h2 id="testimonials-heading" className="text-display-lg font-display text-center mb-12">
                What people say
            </h2>

            <div className="max-w-3xl mx-auto">
                {/* Quote card */}
                <div className="card p-10 relative">
                    {/* Big quote mark */}
                    <div
                        className="font-display text-8xl leading-none mb-4 select-none"
                        style={{ color: "var(--accent)", opacity: 0.4 }}
                        aria-hidden="true"
                    >
                        "
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <blockquote
                                className="text-body-lg italic mb-8"
                                style={{ color: "var(--text-primary)" }}
                            >
                                {current.quote}
                            </blockquote>

                            <div className="flex items-center gap-4">
                                <div
                                    className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
                                    style={{ background: "rgba(232,168,56,0.15)", color: "var(--accent)" }}
                                    aria-hidden="true"
                                >
                                    {current.name[0]}
                                </div>
                                <div>
                                    <div className="font-semibold" style={{ color: "var(--text-primary)" }}>
                                        {current.name}
                                    </div>
                                    <div className="text-body-sm" style={{ color: "var(--text-muted)" }}>
                                        {current.role} · {current.company}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-center gap-4 mt-6">
                    <button
                        onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
                        className="p-2 rounded-full transition-all duration-200"
                        style={{ border: "1px solid var(--border)", color: "var(--text-secondary)" }}
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    {/* Dots */}
                    <div className="flex gap-2" role="tablist" aria-label="Testimonial navigation">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setIndex(i)}
                                role="tab"
                                aria-selected={i === index}
                                aria-label={`Testimonial ${i + 1}`}
                                className="w-2 h-2 rounded-full transition-all duration-200"
                                style={{
                                    background: i === index ? "var(--accent)" : "var(--border)",
                                    transform: i === index ? "scale(1.4)" : "scale(1)",
                                }}
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
                        className="p-2 rounded-full transition-all duration-200"
                        style={{ border: "1px solid var(--border)", color: "var(--text-secondary)" }}
                        aria-label="Next testimonial"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </section>
    );
}
