"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Download, Sparkles } from "lucide-react";

const roles = [
    "Senior Product Manager",
    "AI Product Builder",
    "Growth Strategist",
    "Platform Architect",
    "Operator & Builder",
];

const stats = [
    { value: "12+", label: "Products Shipped" },
    { value: "8M+", label: "Users Impacted" },
    { value: "$40M+", label: "Revenue Driven" },
    { value: "8 yrs", label: "PM Experience" },
];

export default function Hero() {
    const [roleIndex, setRoleIndex] = useState(0);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setRoleIndex((i) => (i + 1) % roles.length);
        }, 2800);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 100);
        window.addEventListener("scroll", handler, { passive: true });
        return () => window.removeEventListener("scroll", handler);
    }, []);

    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
    };

    return (
        <section
            className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
            aria-label="Hero"
        >
            {/* Dot grid background */}
            <div
                className="absolute inset-0 dot-grid pointer-events-none"
                aria-hidden="true"
                style={{ opacity: 0.04 }}
            />

            {/* Amber glow */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
                style={{
                    width: "600px",
                    height: "400px",
                    background: "radial-gradient(ellipse, rgba(232,168,56,0.12) 0%, transparent 70%)",
                    filter: "blur(60px)",
                }}
            />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 px-6 max-w-5xl mx-auto"
            >
                {/* Availability badge */}
                <motion.div variants={fadeUp} className="flex justify-center mb-8">
                    <div
                        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                        style={{
                            background: "rgba(45,212,191,0.08)",
                            border: "1px solid rgba(45,212,191,0.2)",
                            color: "var(--teal)",
                        }}
                    >
                        <span className="live-dot" aria-hidden="true" />
                        Open to Senior PM & Group PM roles
                    </div>
                </motion.div>

                {/* Name */}
                <motion.h1 variants={fadeUp} className="text-display-2xl font-display mb-4" style={{ color: "var(--text-primary)" }}>
                    Alex Morgan
                </motion.h1>

                {/* Animated role */}
                <motion.div
                    variants={fadeUp}
                    className="text-display-lg font-display mb-6 h-16 flex items-center justify-center"
                    style={{ color: "var(--accent)" }}
                    aria-live="polite"
                    aria-label={`Role: ${roles[roleIndex]}`}
                >
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={roleIndex}
                            initial={{ opacity: 0, filter: "blur(8px)", y: 8 }}
                            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                            exit={{ opacity: 0, filter: "blur(8px)", y: -8 }}
                            transition={{ duration: 0.4 }}
                        >
                            {roles[roleIndex]}
                        </motion.span>
                    </AnimatePresence>
                </motion.div>

                {/* Tagline */}
                <motion.p
                    variants={fadeUp}
                    className="text-body-lg max-w-2xl mx-auto mb-10"
                    style={{ color: "var(--text-secondary)" }}
                >
                    I ship products people love — from 0 to 1 to millions. AI, platform, consumer, growth.
                </motion.p>

                {/* CTAs */}
                <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3 mb-16">
                    <Link href="/work" className="btn-primary">
                        <Sparkles size={16} aria-hidden="true" />
                        View My Work
                    </Link>
                    <a href="/resume.pdf" download className="btn-secondary">
                        <Download size={16} aria-hidden="true" />
                        Download Resume
                    </a>
                </motion.div>

                {/* Stats strip */}
                <motion.div
                    variants={fadeUp}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10"
                    style={{ borderTop: "1px solid var(--border)" }}
                >
                    {stats.map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="metric-number">{stat.value}</div>
                            <div className="metric-label">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Scroll chevron */}
            <AnimatePresence>
                {!scrolled && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: [0, 8, 0] }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2"
                        aria-hidden="true"
                    >
                        <ArrowDown style={{ color: "var(--text-muted)" }} size={24} />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
