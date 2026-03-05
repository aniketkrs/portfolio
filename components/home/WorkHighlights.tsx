"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight, BarChart3, Layout } from "lucide-react";

const projects = [
    {
        title: "Global Payment\nInfrastructure",
        description: "Scalable architecture for high-frequency transaction processing across 40+ countries.",
        metric: "24%",
        metricLabel: "Efficiency Gain",
        span: "col-span-4 sm:col-span-8 md:col-span-7 row-span-4",
        featured: true,
        slug: "payments-platform-overhaul",
    },
    {
        title: "15%",
        isMetric: true,
        metricLabel: "MoM Revenue Growth",
        subtitle: "Retention Optimization Engine",
        span: "col-span-2 sm:col-span-4 md:col-span-5 row-span-2",
        slug: "growth-loops-b2b-saas",
    },
    {
        title: "Automated Risk\nAssessment",
        description: "ML-driven framework for real-time merchant onboarding and fraud prevention.",
        metric: "99.9% Accuracy",
        icon: BarChart3,
        span: "col-span-4 sm:col-span-8 md:col-span-5 row-span-4",
        slug: "ai-search-discovery",
    },
    {
        title: "Unified UI Framework",
        label: "Design Systems",
        icon: Layout,
        span: "col-span-2 sm:col-span-4 md:col-span-4 row-span-2",
        slug: "consumer-mobile-app-0to1",
    },
    {
        title: "5M+",
        isMetric: true,
        metricLabel: "Daily Users",
        span: "col-span-2 sm:col-span-4 md:col-span-3 row-span-2",
        dark: true,
        slug: "consumer-mobile-app-0to1",
    },
];

const desktopScatterPos = [
    { x: -60, y: -40, rot: -15, rotX: 10, rotY: -20, scale: 1.5 },
    { x: 0, y: -50, rot: 5, rotX: -15, rotY: 10, scale: 1.2 },
    { x: 60, y: -40, rot: 15, rotX: 20, rotY: 15, scale: 1.6 },
    { x: -50, y: 40, rot: -25, rotX: -10, rotY: -15, scale: 1.3 },
    { x: 0, y: 50, rot: -5, rotX: 15, rotY: 5, scale: 1.4 },
];

export default function WorkHighlights() {
    const sectionRef = useRef<HTMLElement>(null);

    // Desktop refs
    const desktopContainerRef = useRef<HTMLDivElement>(null);
    const desktopGridRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const wrapperRefs = useRef<(HTMLAnchorElement | null)[]>([]);

    // FAB ref (desktop)
    const fabRef = useRef<HTMLAnchorElement>(null);
    // FAB ref (mobile — separate so GSAP targets correct element)
    const mobileFabRef = useRef<HTMLAnchorElement>(null);

    // Mobile refs
    const mobileContainerRef = useRef<HTMLDivElement>(null);
    const mobileTextRef = useRef<HTMLDivElement>(null);
    const mobileGridRef = useRef<HTMLDivElement>(null);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        gsap.registerPlugin(ScrollTrigger);
    }, []);

    useLayoutEffect(() => {
        if (!mounted || !sectionRef.current) return;

        let mm = gsap.matchMedia();

        // ------------------------ DESKTOP ANIMATION ------------------------
        mm.add("(min-width: 768px)", () => {
            if (!desktopGridRef.current || !textRef.current || !desktopContainerRef.current) return;

            gsap.set(desktopGridRef.current, { autoAlpha: 1 });
            gsap.set(textRef.current, { scale: 1, opacity: 1, y: "0vh", filter: "blur(0px)" });

            wrapperRefs.current.forEach((wrapper, i) => {
                if (wrapper && desktopScatterPos[i]) {
                    gsap.set(wrapper, {
                        x: `${desktopScatterPos[i].x}vw`,
                        y: `${desktopScatterPos[i].y}vh`,
                        rotation: desktopScatterPos[i].rot,
                        rotationX: desktopScatterPos[i].rotX,
                        rotationY: desktopScatterPos[i].rotY,
                        z: -400,
                        opacity: 0,
                        scale: desktopScatterPos[i].scale,
                        filter: "blur(20px)",
                        transformPerspective: 1000,
                    });
                }
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=500%",
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                },
            });

            // Phase 1: Text Out
            tl.to(textRef.current, {
                y: "-15vh",
                opacity: 0,
                scale: 1.5,
                letterSpacing: "0.5em",
                filter: "blur(16px)",
                duration: 2,
                ease: "power2.inOut"
            }, 0);

            // Phase 1: Cards In
            wrapperRefs.current.forEach((wrapper, i) => {
                if (wrapper) {
                    tl.to(wrapper, {
                        x: "0vw",
                        y: "0vh",
                        rotation: 0,
                        rotationX: 0,
                        rotationY: 0,
                        z: 0,
                        opacity: 1,
                        scale: 1,
                        filter: "blur(0px)",
                        duration: 2.5,
                        ease: "back.out(1.2)",
                    }, i * 0.1);
                }
            });

            // Phase 2: MASSIVE HOLD WITH DRIFT
            // Calculate actual overflow so grid scrolls all the way to the bottom to reveal the FAB cleanly
            const gridHeight = desktopGridRef.current.offsetHeight;
            const windowHeight = window.innerHeight;
            const yOffset = gridHeight > windowHeight * 0.7 ? -(gridHeight - windowHeight + 200) : -200;

            tl.to(desktopGridRef.current, {
                y: yOffset,
                duration: 9,
                ease: "none"
            }, 2.5);

            // Phase 2: FAB ANIMATION
            if (fabRef.current) {
                gsap.set(fabRef.current, { y: 50, opacity: 0, scale: 0.8, pointerEvents: "none" });

                tl.to(fabRef.current, {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    pointerEvents: "auto",
                    duration: 1,
                    ease: "back.out(1.5)"
                }, 1.5);

                tl.to(fabRef.current, {
                    y: "-=3vh",
                    duration: 9,
                    ease: "none"
                }, 2.5);
            }

            // Phase 3: Fade out and scale down section to transition smoothly into the next
            tl.to(desktopContainerRef.current, {
                opacity: 0,
                scale: 0.95,
                filter: "blur(10px)",
                duration: 4,
                ease: "power2.inOut"
            }, "-=4");

            if (fabRef.current) {
                tl.to(fabRef.current, {
                    opacity: 0,
                    scale: 0.8,
                    duration: 4,
                    ease: "power2.inOut",
                    pointerEvents: "none"
                }, "-=4");
            }
        });

        // ------------------------ MOBILE ANIMATION ------------------------
        mm.add("(max-width: 767px)", () => {
            if (!mobileTextRef.current || !mobileGridRef.current || !mobileContainerRef.current) return;

            const mobileCards = mobileGridRef.current.children;

            gsap.set(mobileTextRef.current, { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 });
            gsap.set(mobileGridRef.current, { opacity: 1, y: 0 });

            Array.from(mobileCards).forEach((card, i) => {
                const isLeft = i % 2 === 0;
                gsap.set(card, {
                    x: isLeft ? -40 : 40,
                    y: 80,
                    rotation: isLeft ? -15 : 15,
                    opacity: 0,
                    scale: 1.3,
                    filter: "blur(15px)",
                    transformPerspective: 800,
                });
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=120%",
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1
                },
            });

            tl.to(mobileTextRef.current, {
                y: "-15vh",
                opacity: 0,
                scale: 1.2,
                letterSpacing: "0.2em",
                filter: "blur(12px)",
                duration: 2,
                ease: "power2.inOut"
            }, 0);

            Array.from(mobileCards).forEach((card, i) => {
                tl.to(card, {
                    x: 0,
                    y: 0,
                    rotation: 0,
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                    duration: 2.5,
                    delay: i * 0.15,
                    ease: "back.out(1.2)"
                }, 0);
            });

            // HOLD FOR MOBILE WITH DRIFT
            // Calculate actual overflow so the very long grid scrolls to its bottom
            const mobileGridHeight = mobileGridRef.current.offsetHeight;
            const mobileWindowHeight = window.innerHeight;
            const yOffsetMobile = -(mobileGridHeight - mobileWindowHeight + 100);

            tl.to(mobileGridRef.current, {
                y: yOffsetMobile,
                duration: 9, // using the full duration of hold for a smooth scroll
                ease: "none"
            }, 2.5);

            // MOBILE FAB ANIMATION
            if (mobileFabRef.current) {
                gsap.set(mobileFabRef.current, { y: 30, opacity: 0, scale: 0.8, pointerEvents: "none" });

                tl.to(mobileFabRef.current, {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    pointerEvents: "auto",
                    duration: 1,
                    ease: "back.out(1.5)",
                }, 1.5);
            }

            // Phase 3: Fade out and scale down section to transition smoothly into the next
            tl.to(mobileContainerRef.current, {
                opacity: 0,
                scale: 0.95,
                filter: "blur(10px)",
                duration: 4,
                ease: "power2.inOut"
            }, "-=4");
        });

        return () => mm.revert();
    }, [mounted]);

    if (!mounted) {
        return <div className="h-screen bg-[var(--background)] w-full" />;
    }

    return (
        // Remove manual heights (h-[150vh] etc). Let GSAP handle pinning distance.
        <section ref={sectionRef} className="bg-[var(--background)] w-full relative overflow-hidden">

            {/* ========================================================
                DESKTOP VIEW (Pinned Scroll Journey)
            ======================================================== */}
            <div ref={desktopContainerRef} className="hidden md:flex min-h-screen w-full items-center justify-center bg-[var(--background)] relative will-change-transform py-20 overflow-hidden">

                {/* 1. HERO STATE (Text) */}
                <div ref={textRef} className="absolute z-20 pointer-events-none will-change-transform flex flex-col items-center justify-center w-full px-4 text-center">
                    <h2 className="flex flex-col items-center justify-center select-none pointer-events-none w-full m-0">
                        <span className="text-[22vw] sm:text-[18vw] md:text-[16vw] lg:text-[17vw] font-display font-black uppercase tracking-tighter leading-none text-center text-[var(--text-primary)] opacity-30 dark:opacity-10 transition-all duration-300">
                            Case
                        </span>
                        <span className="text-[22vw] sm:text-[18vw] md:text-[16vw] lg:text-[17vw] font-display font-black uppercase tracking-tighter leading-none text-center text-[var(--text-primary)] opacity-30 dark:opacity-10 transition-all duration-300">
                            Studies
                        </span>
                        <span className="text-[22vw] sm:text-[18vw] md:text-[16vw] lg:text-[17vw] font-display font-black uppercase tracking-tighter leading-none text-center text-[var(--text-primary)] opacity-30 dark:opacity-10 transition-all duration-300 mt-[-2vw]">
                            &amp; Decks
                        </span>
                    </h2>
                </div>

                {/* 2. TRANSITION STATE (Bento Grid) */}
                <div ref={desktopGridRef} className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-10 px-8 lg:px-16 max-w-7xl mx-auto flex flex-col items-center justify-center">
                    <div
                        className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-12 gap-5 md:gap-6 w-full pointer-events-none"
                        style={{ gridAutoRows: 'calc((100svh - 6rem) / 6)' }}
                    >
                        {projects.map((project, i) => (
                            <Link
                                key={i}
                                href={`/work/${project.slug}`}
                                ref={(el: HTMLAnchorElement | null) => { wrapperRefs.current[i] = el; }}
                                className={`bento-card p-6 md:p-10 flex flex-col justify-between overflow-hidden relative group h-full w-full block will-change-transform pointer-events-auto shadow-[0_20px_60px_rgba(0,0,0,0.08)] bg-white border border-gray-100 dark:border-white/5 dark:bg-black ${project.dark
                                    ? "!bg-obsidian dark:!bg-obsidian !border-white/10 !text-white"
                                    : ""
                                    } ${project.span}`}
                            >
                                {project.featured && (
                                    <>
                                        <div className="absolute top-0 right-0 p-6 md:p-8">
                                            <ArrowRight className="text-primary/20 group-hover:text-primary transition-colors w-6 h-6 md:w-8 md:h-8 rotate-[-45deg] group-hover:rotate-0 transition-all duration-500" />
                                        </div>
                                        <div>
                                            <span className="text-xs font-bold tracking-[0.2em] text-[var(--text-muted)] uppercase">
                                                Featured Project
                                            </span>
                                            <h3 className="text-3xl md:text-5xl font-bold mt-4 leading-tight whitespace-pre-line">
                                                {project.title}
                                            </h3>
                                        </div>
                                        <div className="flex items-end justify-between">
                                            <p className="text-[var(--text-muted)] text-sm max-w-xs">
                                                {project.description}
                                            </p>
                                            <div className="text-right">
                                                <span className="text-4xl md:text-6xl font-bold text-primary tracking-tighter">
                                                    {project.metric}
                                                </span>
                                                <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest mt-1">
                                                    {project.metricLabel}
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {project.isMetric && !project.dark && (
                                    <div className="flex flex-col justify-center items-center text-center h-full">
                                        <span className="text-5xl md:text-7xl font-bold text-primary tracking-tighter">
                                            {project.title}
                                        </span>
                                        <p className="text-sm font-bold uppercase tracking-[0.2em] mt-2">
                                            {project.metricLabel}
                                        </p>
                                        {project.subtitle && (
                                            <p className="text-xs text-[var(--text-muted)] mt-2">{project.subtitle}</p>
                                        )}
                                    </div>
                                )}

                                {project.isMetric && project.dark && (
                                    <div className="flex flex-col justify-center items-center text-center h-full">
                                        <span className="text-3xl md:text-4xl font-bold text-white group-hover:text-primary transition-colors">
                                            {project.title}
                                        </span>
                                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">
                                            {project.metricLabel}
                                        </p>
                                    </div>
                                )}

                                {!project.featured && !project.isMetric && project.icon && (
                                    <>
                                        {project.label && (
                                            <div className="flex justify-between items-start">
                                                <span className="text-xs font-bold tracking-widest text-[var(--text-muted)] uppercase">
                                                    {project.label}
                                                </span>
                                                <project.icon className="text-primary w-5 h-5" />
                                            </div>
                                        )}
                                        {project.description ? (
                                            <>
                                                <div className="w-14 h-14 bg-[var(--bg)] dark:bg-white/5 rounded-2xl flex items-center justify-center mb-auto">
                                                    <project.icon className="w-6 h-6 text-[var(--text-primary)]" />
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl md:text-3xl font-bold leading-none whitespace-pre-line">
                                                        {project.title}
                                                    </h3>
                                                    <p className="text-[var(--text-muted)] text-sm mt-4">
                                                        {project.description}
                                                    </p>
                                                </div>
                                                <div className="pt-6 border-t border-[var(--border)] flex items-center justify-between">
                                                    <span className="text-primary font-bold">{project.metric}</span>
                                                    <ArrowRight className="text-[var(--text-muted)] group-hover:translate-x-1 transition-transform w-4 h-4" />
                                                </div>
                                            </>
                                        ) : (
                                            <h4 className="text-lg md:text-xl font-bold mt-auto">{project.title}</h4>
                                        )}
                                    </>
                                )}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* ========================================================
                MOBILE VIEW (Pinned Scrub Journey)
            ======================================================== */}
            {/* Mobile Grid Container (Visible on <768px) */}
            <div ref={mobileContainerRef} className="flex md:hidden min-h-[100vh] py-16 w-full relative items-center justify-center flex-col px-4">

                {/* Mobile Text (Hero) - Readable initially */}
                <div ref={mobileTextRef} className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center z-20 pointer-events-none will-change-transform">
                    <h2 className="flex flex-col items-center justify-center select-none pointer-events-none w-full m-0">
                        <span className="text-[25vw] sm:text-[20vw] md:text-[18vw] lg:text-[20vw] font-display font-black uppercase tracking-tighter leading-none text-center text-[var(--text-primary)] opacity-30 dark:opacity-10 transition-all duration-300">
                            Case
                        </span>
                        <span className="text-[25vw] sm:text-[20vw] md:text-[18vw] lg:text-[20vw] font-display font-black uppercase tracking-tighter leading-none text-center text-[var(--text-primary)] opacity-30 dark:opacity-10 transition-all duration-300">
                            Studies
                        </span>
                        <span className="text-[22vw] sm:text-[20vw] md:text-[18vw] lg:text-[20vw] font-display font-black uppercase tracking-tighter leading-none text-center text-[var(--text-primary)] opacity-30 dark:opacity-10 transition-all duration-300">
                            &amp; Decks
                        </span>
                    </h2>
                </div>

                {/* Mobile Grid */}
                {/* Adjusting the top to [15vh] to give room for hero, and adding pb to scroll fully */}
                <div className="absolute top-[15vh] left-0 right-0 z-10 px-4 pointer-events-none pb-[25vh]">
                    <div ref={mobileGridRef} className="flex flex-col items-center w-full pointer-events-auto will-change-transform">
                        <div className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-12 gap-4 md:gap-5 auto-rows-[110px] w-full">
                            {projects.map((project, i) => (
                                <Link
                                    key={`mobile-${i}`}
                                    href={`/work/${project.slug}`}
                                    className={`bento-card p-4 flex flex-col justify-between overflow-hidden relative group h-full w-full block shadow-[0_10px_30px_rgba(0,0,0,0.05)] bg-white border border-gray-100 dark:border-white/5 dark:bg-black ${project.dark
                                        ? "!bg-obsidian dark:!bg-obsidian !border-white/10 !text-white"
                                        : ""
                                        } ${project.span}`}
                                >
                                    {project.featured && (
                                        <>
                                            <div className="absolute top-0 right-0 p-4">
                                                <ArrowRight className="text-primary/40 w-4 h-4 rotate-[-45deg]" />
                                            </div>
                                            <div>
                                                <span className="text-[8px] font-bold tracking-widest text-[var(--text-muted)] uppercase">
                                                    Featured
                                                </span>
                                                <h3 className="text-xl font-bold mt-2 leading-tight whitespace-pre-line">
                                                    {project.title}
                                                </h3>
                                            </div>
                                            <div className="mt-auto pt-4 flex items-end justify-between">
                                                <div className="text-left">
                                                    <span className="text-2xl font-bold text-primary tracking-tighter">
                                                        {project.metric}
                                                    </span>
                                                    <p className="text-[8px] font-bold text-[var(--text-muted)] uppercase tracking-widest mt-0.5">
                                                        {project.metricLabel}
                                                    </p>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {project.isMetric && !project.dark && (
                                        <div className="flex flex-col justify-center items-center text-center h-full">
                                            <span className="text-3xl font-bold text-primary tracking-tighter">
                                                {project.title}
                                            </span>
                                            <p className="text-[8px] font-bold uppercase tracking-widest mt-1">
                                                {project.metricLabel}
                                            </p>
                                        </div>
                                    )}

                                    {project.isMetric && project.dark && (
                                        <div className="flex flex-col justify-center items-center text-center h-full">
                                            <span className="text-2xl font-bold text-white transition-colors">
                                                {project.title}
                                            </span>
                                            <p className="text-[8px] font-bold text-white/40 uppercase tracking-widest mt-1">
                                                {project.metricLabel}
                                            </p>
                                        </div>
                                    )}

                                    {!project.featured && !project.isMetric && project.icon && (
                                        <>
                                            {project.label && (
                                                <div className="flex justify-between items-start">
                                                    <span className="text-[8px] font-bold tracking-widest text-[var(--text-muted)] uppercase">
                                                        {project.label}
                                                    </span>
                                                    <project.icon className="text-primary/70 w-3 h-3" />
                                                </div>
                                            )}
                                            {project.description ? (
                                                <div>
                                                    <h3 className="text-lg font-bold leading-none mb-1">
                                                        {project.title}
                                                    </h3>
                                                    <p className="text-[var(--text-muted)] text-[10px] leading-snug line-clamp-2">
                                                        {project.description}
                                                    </p>
                                                </div>
                                            ) : (
                                                <h4 className="text-sm font-bold mt-auto">{project.title}</h4>
                                            )}
                                        </>
                                    )}
                                </Link>
                            ))}
                        </div>
                        {/* Mobile FAB moved inside the scrolling container for consistent behavior with AI Lab section */}
                        <div className="flex justify-center mt-12 mb-20 md:hidden pointer-events-auto">
                            <Link
                                ref={mobileFabRef}
                                href="/work"
                                className="flex items-center gap-4 backdrop-blur-md bg-[#f2690d] hover:bg-black/80 text-black hover:text-white pl-8 pr-2.5 py-2.5 rounded-full font-bold shadow-[0_10px_40px_rgba(242,105,13,0.4)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.4)] transition-all duration-300 group"
                            >
                                <span className="uppercase tracking-[0.2em] font-semibold text-[10px] relative z-10">Show All</span>
                                <span className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white group-hover:bg-white/20 transition-colors duration-300">
                                    <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:rotate-45 group-hover:translate-x-0.5 transition-all duration-300">
                                        <path d="M14.9167 26.25L13.75 25.0833L23.4167 15.4167H17.9167V13.75H26.25V22.0833H24.5833V16.5833L14.9167 26.25V26.25" className="fill-[#f2690d] group-hover:fill-white transition-colors" />
                                    </svg>
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* DESKTOP FAB */}
            <Link
                ref={fabRef}
                href="/work"
                className="hidden md:flex absolute bottom-24 left-1/2 -translate-x-1/2 z-50 items-center gap-4 backdrop-blur-md bg-[#f2690d] hover:bg-black/80 text-black hover:text-white pl-10 pr-3 py-3 rounded-full font-bold shadow-[0_10px_40px_rgba(242,105,13,0.4)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.4)] transition-all duration-300 group"
            >
                <span className="uppercase tracking-[0.2em] font-semibold text-xs relative z-10">Show All</span>
                <span className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white group-hover:bg-white/20 transition-colors duration-300">
                    <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:rotate-45 group-hover:translate-x-0.5 transition-all duration-300">
                        <path d="M14.9167 26.25L13.75 25.0833L23.4167 15.4167H17.9167V13.75H26.25V22.0833H24.5833V16.5833L14.9167 26.25V26.25" className="fill-[#f2690d] group-hover:fill-white transition-colors" />
                    </svg>
                </span>
            </Link>



        </section>
    );
}
