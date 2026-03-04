"use client";

import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useEffect, useRef } from "react";
import { ChevronDown, Download } from "lucide-react";
import Image from "next/image";

export default function Hero() {
    const containerRef = useRef<HTMLElement>(null);

    // Parallax: image shifts slower than scroll
    const { scrollY } = useScroll();
    const imgY = useTransform(scrollY, [0, 800], [0, 150]);
    const textY = useTransform(scrollY, [0, 800], [0, 60]);
    const imgScale = useTransform(scrollY, [0, 600], [1.05, 1.15]);
    const overlayOpacity = useTransform(scrollY, [0, 400], [0.65, 0.9]);

    // Mouse-driven ambient glow
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const glowX = useSpring(useTransform(mouseX, [0, 1], [-40, 40]), { stiffness: 50, damping: 20 });
    const glowY = useSpring(useTransform(mouseY, [0, 1], [-40, 40]), { stiffness: 50, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const { width, height } = containerRef.current.getBoundingClientRect();
            mouseX.set(e.clientX / width);
            mouseY.set(e.clientY / height);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    const nameChars = "Aniket".split("");

    return (
        <section
            ref={containerRef}
            data-section="hero"
            className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden"
        >
            {/* Background Photo with Parallax + Blur + Dim */}
            <motion.div
                style={{ y: imgY, scale: imgScale }}
                className="absolute inset-0 -top-20 w-full h-[130%]"
            >
                <Image
                    src="/images/aniket-hero.jpg"
                    alt="Aniket"
                    fill
                    priority
                    className="object-cover object-center blur-[3px] brightness-[0.45] contrast-[1.1] saturate-[0.7]"
                    sizes="100vw"
                    quality={85}
                />
            </motion.div>

            {/* Dark overlay gradient for text readability */}
            <motion.div
                style={{ opacity: overlayOpacity }}
                className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-[var(--bg-primary)]"
            />

            {/* Film grain texture over hero */}
            <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay z-[1]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Ambient glow — follows mouse */}
            <motion.div
                style={{ x: glowX, y: glowY }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-primary/6 blur-[100px] z-[2]"
            />

            {/* Content Layer */}
            <motion.div
                style={{ y: textY }}
                className="relative z-[3] flex flex-col items-center px-4"
            >
                {/* Elegant Serif Name */}
                <div className="relative group cursor-default">
                    <h1
                        className="text-[22vw] md:text-[18vw] lg:text-[14rem] leading-[0.85] tracking-[-0.04em] select-none flex overflow-hidden"
                        style={{ fontFamily: "var(--font-serif), 'Playfair Display', serif" }}
                    >
                        {nameChars.map((char, i) => (
                            <motion.span
                                key={i}
                                initial={{ y: 150, opacity: 0, filter: "blur(12px)" }}
                                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                                transition={{
                                    duration: 1.0,
                                    delay: 0.5 + i * 0.1,
                                    ease: [0.23, 1, 0.32, 1],
                                }}
                                className="inline-block text-white font-semibold italic drop-shadow-[0_4px_80px_rgba(242,105,13,0.15)]"
                            >
                                {char}
                            </motion.span>
                        ))}
                    </h1>

                    {/* Underline sweep animation */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 1.6, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                        className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent origin-left"
                    />
                </div>

                {/* Subtitle */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 0.8 }}
                    className="mt-8 md:mt-10 text-center space-y-3"
                >
                    <h3 className="text-white/90 text-base md:text-xl font-medium tracking-[0.25em] uppercase">
                        Senior Product Manager
                    </h3>
                    <p className="text-white/40 text-xs md:text-sm font-light tracking-widest uppercase">
                        Interactive Experience · Exploring the Frontiers of Product
                    </p>
                </motion.div>

                {/* Status Badges */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.8, duration: 0.5 }}
                    className="mt-10 flex flex-wrap items-center justify-center gap-3"
                >
                    {/* Strategist Badge */}
                    <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-pulse-orange absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
                        </span>
                        <span className="text-sm font-medium tracking-wide text-white/70">
                            Strategist @ The Good Bug
                        </span>
                    </div>

                    {/* Download Resume Chip */}
                    <a
                        href="/resume.pdf"
                        download
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-primary/30 transition-all duration-300 group"
                    >
                        <Download size={14} className="text-primary group-hover:animate-bounce" />
                        <span className="text-sm font-medium tracking-wide text-white/70 group-hover:text-white/90 transition-colors">
                            Download Resume
                        </span>
                    </a>
                </motion.div>
            </motion.div>

            {/* Scroll Cue */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="absolute bottom-20 md:bottom-28 flex flex-col items-center gap-2 z-[3]"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ChevronDown size={20} className="text-white/30" />
                </motion.div>
            </motion.div>

            {/* Bottom gradient fade into page bg */}
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[var(--bg-primary)] to-transparent z-[2]" />
        </section>
    );
}
