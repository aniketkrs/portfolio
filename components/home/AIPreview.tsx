"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap, ExternalLink } from "lucide-react";
import { aiProducts } from "@/data/content";

export default function AIPreview() {
    const featured = aiProducts.slice(0, 2);

    return (
        <section
            className="section-container"
            id="ai"
            aria-labelledby="ai-heading"
            style={{ background: "linear-gradient(to bottom, var(--bg), var(--bg-surface))" }}
        >
            <div className="flex items-end justify-between mb-12">
                <div>
                    <div className="text-label mb-3" style={{ color: "var(--electric)" }}>
                        AI Playground
                    </div>
                    <h2 id="ai-heading" className="text-display-lg font-display">
                        I don't just brief AI — I ship it
                    </h2>
                    <p className="text-body-md mt-3 max-w-xl" style={{ color: "var(--text-secondary)" }}>
                        Live AI products I've personally built: RAG systems, LLM tooling, and semantic search at scale.
                    </p>
                </div>
                <Link
                    href="/ai"
                    className="hidden md:flex items-center gap-1 text-sm font-semibold hover:opacity-80 transition-opacity"
                    style={{ color: "var(--electric)" }}
                >
                    View AI Playground <ArrowRight size={16} aria-hidden="true" />
                </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {featured.map((product, i) => (
                    <motion.div
                        key={product.slug}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                        <Link href={`/ai/${product.slug}`} className="card block p-7 group h-full" aria-label={product.name}>
                            {/* Status + name */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <span className="live-dot" aria-hidden="true" />
                                    <span className="text-xs font-bold" style={{ color: "var(--teal)" }}>
                                        {product.status.toUpperCase()}
                                    </span>
                                </div>
                                <ExternalLink size={16} style={{ color: "var(--text-muted)" }} aria-hidden="true" />
                            </div>

                            <h3 className="text-heading-xl font-heading mb-2 group-hover:text-text-primary transition-colors">
                                {product.name}
                            </h3>
                            <p className="text-body-sm mb-5" style={{ color: "var(--accent-light)" }}>
                                {product.tagline}
                            </p>
                            <p className="text-body-sm mb-6" style={{ color: "var(--text-secondary)" }}>
                                {product.summary}
                            </p>

                            {/* Metrics */}
                            {product.metrics && (
                                <div className="grid grid-cols-3 gap-3 mb-5">
                                    {product.metrics.map((m) => (
                                        <div key={m.label} className="text-center">
                                            <div className="metric-number" style={{ fontSize: "1.25rem" }}>
                                                {m.value}
                                            </div>
                                            <div className="metric-label">{m.label}</div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Stack chips */}
                            <div className="flex flex-wrap gap-1.5">
                                {product.stack.slice(0, 4).map((tech) => (
                                    <span key={tech} className="chip chip-electric">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
