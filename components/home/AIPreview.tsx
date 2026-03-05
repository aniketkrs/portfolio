"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Play, Volume2, ArrowUpRight, Layers } from "lucide-react";

const labProjects = [
    {
        title: "Sonic Latent-D",
        description: "Real-time synthesis of spatial audio from latent encodings.",
        tags: ["Audio ML", "WebAudio", "Latent Space"],
        status: "LIVE",
        hasWaveform: true,
    },
    {
        title: "Abstract Ethos",
        description: "Generative art engine powered by ethical AI constraints.",
        tags: ["GenAI", "Canvas", "Ethics"],
        status: "BETA",
    },
    {
        title: "Contextual OS",
        description: "Ambient context engine merging calendar, location, and intent.",
        tags: ["Context API", "LLM", "Agents"],
        status: "ALPHA",
    },
    {
        title: "Neural Ambient",
        description: "Environment-aware noise cancellation using edge neural processing.",
        tags: ["Edge ML", "AudioDSP", "WASM"],
        status: "BUILD",
    },
];

function WaveformBars() {
    const [heights, setHeights] = useState<number[]>(
        Array.from({ length: 24 }, () => Math.random() * 80 + 20)
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setHeights(Array.from({ length: 24 }, () => Math.random() * 80 + 20));
        }, 300);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="wave-container h-24">
            {heights.map((h, i) => (
                <div
                    key={i}
                    className="wave-bar"
                    style={{
                        height: `${h}%`,
                        transition: "height 0.3s ease",
                        animationDelay: `${i * 0.05}s`,
                    }}
                />
            ))}
        </div>
    );
}

export default function AIPreview() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="px-5 md:px-8 lg:px-16 py-16 md:py-20 max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
                className="flex items-center justify-between mb-12"
            >
                <div className="flex items-center gap-3">
                    <Layers className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-bold tracking-tighter uppercase">
                        AI Playground
                    </h2>
                </div>
                <span className="chip chip-primary">
                    Experimental
                </span>
            </motion.div>

            {/* 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {labProjects.map((project, i) => (
                    <motion.div
                        key={project.title}
                        initial={{ opacity: 0, y: 40, scale: 0.96 }}
                        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                        transition={{
                            duration: 0.7,
                            delay: 0.15 + i * 0.12,
                            ease: [0.23, 1, 0.32, 1],
                        }}
                        className="project-card p-8 md:p-10 flex flex-col gap-6 group"
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between">
                            <div>
                                <span
                                    className={`text-[10px] font-bold tracking-widest uppercase ${project.status === "LIVE"
                                        ? "text-green-400"
                                        : project.status === "BETA"
                                            ? "text-yellow-400"
                                            : "text-[var(--text-muted)]"
                                        }`}
                                >
                                    {project.status}
                                </span>
                                <h3 className="text-2xl md:text-3xl font-bold mt-2 tracking-tight">
                                    {project.title}
                                </h3>
                            </div>
                            <ArrowUpRight className="w-5 h-5 text-[var(--text-muted)] group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </div>

                        {/* Waveform or Spacer */}
                        {project.hasWaveform ? (
                            <WaveformBars />
                        ) : (
                            <div className="h-24 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent" />
                        )}

                        {/* Description */}
                        <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                            {project.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mt-auto">
                            {project.tags.map((tag) => (
                                <span key={tag} className="chip text-[10px]">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
