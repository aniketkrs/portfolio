"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/content";

export default function WorkHighlights() {
    const featured = projects.filter((p) => p.featured).slice(0, 3);

    return (
        <section className="section-container" id="work" aria-labelledby="work-heading">
            <div className="flex items-end justify-between mb-12">
                <div>
                    <div className="text-label mb-3">Selected Work</div>
                    <h2 id="work-heading" className="text-display-lg font-display">
                        Projects that moved the needle
                    </h2>
                </div>
                <Link
                    href="/work"
                    className="hidden md:flex items-center gap-1 text-sm font-semibold transition-colors duration-200 hover:opacity-80"
                    style={{ color: "var(--accent)" }}
                >
                    View all work <ArrowRight size={16} aria-hidden="true" />
                </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {featured.map((project, i) => (
                    <motion.div
                        key={project.slug}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                        <Link
                            href={`/work/${project.slug}`}
                            className="card block p-6 h-full group"
                            aria-label={`${project.title} — ${project.company}`}
                        >
                            {/* Metric pill */}
                            <div className="flex items-center gap-2 mb-4">
                                <span className="chip chip-amber">{project.outcomes[0].value}</span>
                                <span className="chip chip-electric">{project.domain}</span>
                            </div>

                            {/* Title */}
                            <h3 className="text-heading-lg font-heading mb-2 group-hover:text-text-primary transition-colors">
                                {project.title}
                            </h3>

                            <p className="text-body-sm mb-4" style={{ color: "var(--text-secondary)" }}>
                                {project.summary}
                            </p>

                            {/* Meta */}
                            <div className="flex items-center justify-between text-label" style={{ color: "var(--text-muted)" }}>
                                <span>{project.company}</span>
                                <span>{project.year}</span>
                            </div>

                            {/* Read more */}
                            <div
                                className="flex items-center gap-1 mt-4 text-sm font-semibold"
                                style={{ color: "var(--accent)" }}
                            >
                                Read case study <ArrowRight size={14} aria-hidden="true" className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            <div className="flex justify-center mt-8 md:hidden">
                <Link href="/work" className="btn-secondary">
                    View all work <ArrowRight size={16} aria-hidden="true" />
                </Link>
            </div>
        </section>
    );
}
