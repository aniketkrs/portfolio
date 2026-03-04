"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Filter } from "lucide-react";
import { projects } from "@/data/content";
import type { Metadata } from "next";

const domains = ["All", "AI", "Growth", "Platform", "Consumer", "B2B", "0-to-1"];

export default function WorkPage() {
    const [active, setActive] = useState("All");

    const filtered =
        active === "All"
            ? projects
            : projects.filter(
                (p) => p.domain.toLowerCase() === active.toLowerCase() ||
                    p.tags.some((t) => t.toLowerCase() === active.toLowerCase())
            );

    return (
        <div className="pt-32 pb-24">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <div className="text-label mb-4">Portfolio</div>
                    <h1 className="text-display-xl font-display mb-4">Work</h1>
                    <p className="text-body-lg max-w-2xl" style={{ color: "var(--text-secondary)" }}>
                        Case studies from 8 years of PM work — each with a full deep-dive into problem,
                        process, and outcome.
                    </p>
                </motion.div>

                {/* Filter tabs */}
                <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Filter by domain">
                    {domains.map((domain) => (
                        <button
                            key={domain}
                            role="tab"
                            aria-selected={active === domain}
                            onClick={() => setActive(domain)}
                            className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                            style={
                                active === domain
                                    ? { background: "var(--accent)", color: "#0D0F1A" }
                                    : { background: "var(--bg-card)", color: "var(--text-secondary)", border: "1px solid var(--border)" }
                            }
                        >
                            {domain}
                        </button>
                    ))}
                </div>

                {/* Count */}
                <p className="text-body-sm mb-6" style={{ color: "var(--text-muted)" }}>
                    Showing {filtered.length} of {projects.length} projects
                </p>

                {/* Grid */}
                <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((project, i) => (
                            <motion.div
                                key={project.slug}
                                layout
                                initial={{ opacity: 0, scale: 0.96 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.96 }}
                                transition={{ duration: 0.25, delay: i * 0.05 }}
                            >
                                <Link
                                    href={`/work/${project.slug}`}
                                    className="card block p-6 group h-full"
                                    aria-label={`${project.title} at ${project.company}`}
                                >
                                    {/* Featured badge */}
                                    {project.featured && (
                                        <div className="chip chip-amber mb-3">Featured</div>
                                    )}

                                    {/* Outcome pill (key metric) */}
                                    <div className="flex items-center gap-2 flex-wrap mb-4">
                                        <span
                                            className="font-mono text-sm font-bold"
                                            style={{ color: "var(--accent)" }}
                                        >
                                            {project.outcomes[0].value}
                                        </span>
                                        <span className="text-body-sm" style={{ color: "var(--text-muted)" }}>
                                            {project.outcomes[0].metric}
                                        </span>
                                    </div>

                                    <h3 className="text-heading-lg font-heading mb-2 group-hover:text-text-primary transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-body-sm mb-4" style={{ color: "var(--text-secondary)" }}>
                                        {project.summary}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                        {project.tags.slice(0, 3).map((tag) => (
                                            <span key={tag} className="chip chip-amber text-xs">{tag}</span>
                                        ))}
                                    </div>

                                    {/* Meta footer */}
                                    <div className="flex items-center justify-between text-xs" style={{ color: "var(--text-muted)" }}>
                                        <span>{project.company} · {project.year}</span>
                                        <span style={{ color: "var(--accent)" }} className="flex items-center gap-1">
                                            {project.readTime} <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Empty state */}
                {filtered.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-body-lg" style={{ color: "var(--text-muted)" }}>
                            No projects in this category yet. Check back soon!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
