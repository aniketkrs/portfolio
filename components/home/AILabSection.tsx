"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";
import {
    FlaskConical,
    Sparkles,
    Cpu,
    Wand2,
    Brain,
    Zap,
    Globe,
    Layers,
    Eye,
    Boxes,
    ArrowRight
} from "lucide-react";

/* ═══════════════════════════════════════════
   PROJECT DATA (9 projects)
   ═══════════════════════════════════════════ */
const labProjects = [
    {
        title: "Sonic Latent-D",
        description: "Real-time synthesis of spatial audio from latent encodings.",
        tags: ["Audio ML", "WebAudio", "Latent Space"],
        status: "LIVE" as const,
        icon: Sparkles,
        image: "https://images.unsplash.com/photo-1637414165749-9b3cd88b8271?w=2400&auto=format&fit=crop&q=80",
        span: "col-span-4 sm:col-span-8 md:col-span-6 row-span-4",
        featured: true,
    },
    {
        title: "Abstract Ethos",
        description: "Generative art engine powered by ethical AI constraints.",
        tags: ["GenAI", "Canvas", "Ethics"],
        status: "BETA" as const,
        icon: Wand2,
        image: "https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?w=800&auto=format&fit=crop&q=60",
        span: "col-span-2 sm:col-span-4 md:col-span-3 row-span-2",
    },
    {
        title: "Contextual OS",
        description: "Ambient context engine merging calendar, location, and intent.",
        tags: ["Context API", "LLM", "Agents"],
        status: "ALPHA" as const,
        icon: Brain,
        image: "https://images.unsplash.com/photo-1699911251220-8e0de3b5ce88?w=800&auto=format&fit=crop&q=60",
        span: "col-span-2 sm:col-span-4 md:col-span-3 row-span-2",
    },
    {
        title: "Neural Ambient",
        description: "Environment-aware noise cancellation using edge neural processing.",
        tags: ["Edge ML", "AudioDSP"],
        status: "BUILD" as const,
        icon: Cpu,
        image: "https://images.unsplash.com/photo-1667483629944-6414ad0648c5?w=800&auto=format&fit=crop&q=60",
        span: "col-span-2 sm:col-span-4 md:col-span-4 row-span-2",
    },
    {
        title: "Pulse Net",
        description: "Decentralized health-signal aggregation with federated learning.",
        tags: ["FedML", "HealthKit"],
        status: "ALPHA" as const,
        icon: Zap,
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=60",
        span: "col-span-2 sm:col-span-4 md:col-span-2 row-span-2",
        dark: true,
    },
    {
        title: "Geoweave",
        description: "Spatial computing layer fusing AR anchors with LLM reasoning.",
        tags: ["ARKit", "Spatial"],
        status: "BUILD" as const,
        icon: Globe,
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=60",
        span: "col-span-4 sm:col-span-8 md:col-span-6 row-span-3",
    },
    {
        title: "Strata UI",
        description: "Adaptive component system reshaping per user behavior.",
        tags: ["React", "A/B Engine"],
        status: "BETA" as const,
        icon: Layers,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&auto=format&fit=crop&q=60",
        span: "col-span-4 sm:col-span-8 md:col-span-4 row-span-2",
    },
    {
        title: "LensForge",
        description: "Neural style transfer pipeline for real-time video streams.",
        tags: ["Vision ML", "WebGPU"],
        status: "LIVE" as const,
        icon: Eye,
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60",
        span: "col-span-2 sm:col-span-4 md:col-span-4 row-span-2",
        dark: true,
    },
    {
        title: "VoxelMind",
        description: "3D scene understanding from monocular depth estimation.",
        tags: ["Depth ML", "Three.js"],
        status: "BUILD" as const,
        icon: Boxes,
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=60",
        span: "col-span-2 sm:col-span-4 md:col-span-4 row-span-2",
    },
];

const statusStyles: Record<string, string> = {
    LIVE: "bg-emerald-500/20 text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.2)]",
    BETA: "bg-amber-500/20 text-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.15)]",
    ALPHA: "bg-sky-500/20 text-sky-400",
    BUILD: "bg-white/10 text-white/50",
};

const desktopScatterPos = [
    { x: -50, y: -40, rot: -10, rotX: 10, rotY: -20, scale: 1.4 },
    { x: 0, y: -60, rot: 5, rotX: -15, rotY: 10, scale: 1.2 },
    { x: 50, y: -40, rot: 15, rotX: 20, rotY: 15, scale: 1.5 },
    { x: -60, y: 0, rot: -20, rotX: 5, rotY: -10, scale: 1.3 },
    { x: 0, y: 0, rot: 0, rotX: -5, rotY: 5, scale: 1.6 },
    { x: 60, y: 0, rot: 20, rotX: 10, rotY: -5, scale: 1.4 },
    { x: -50, y: 40, rot: -15, rotX: -10, rotY: -15, scale: 1.3 },
    { x: 0, y: 60, rot: -5, rotX: 15, rotY: 5, scale: 1.5 },
    { x: 50, y: 40, rot: 10, rotX: -5, rotY: 10, scale: 1.2 },
];

export default function AILabSection() {
    const sectionRef = useRef<HTMLElement>(null);

    // Desktop refs
    const desktopContainerRef = useRef<HTMLDivElement>(null);
    const desktopGridRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);

    // FAB refs
    const fabRef = useRef<HTMLAnchorElement>(null);
    const mobileFabRef = useRef<HTMLAnchorElement>(null);

    // Mobile refs
    const mobileContainerRef = useRef<HTMLDivElement>(null);
    const mobileTextRef = useRef<HTMLDivElement>(null);
    const mobileGridRef = useRef<HTMLDivElement>(null);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (typeof window !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);
        }
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

            // Phase 1: Cards In from scattered positions
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

            // Phase 2: HOLD WITH DRIFT
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

            // Phase 3: Fade out and scale down section smoothly
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

            // Mobile DRIFT
            const mobileGridHeight = mobileGridRef.current.offsetHeight;
            const mobileWindowHeight = window.innerHeight;
            const yOffsetMobile = -(mobileGridHeight - mobileWindowHeight + 100);

            tl.to(mobileGridRef.current, {
                y: yOffsetMobile,
                duration: 9,
                ease: "none"
            }, 2.5);

            // MOBILE FAB
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

            // Phase 3: Mobile Out
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

    const renderCardContent = (project: typeof labProjects[0]) => {
        const Icon = project.icon;

        if (project.featured) {
            return (
                <>
                    <div className="absolute inset-0 z-0">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 dark:opacity-40" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                    </div>
                    <div className="absolute top-0 right-0 p-6 md:p-8 z-10">
                        <ArrowRight className="text-primary/20 group-hover:text-primary transition-colors w-6 h-6 md:w-8 md:h-8 rotate-[-45deg] group-hover:rotate-0 transition-all duration-500" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3">
                            <span className={`text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full ${statusStyles[project.status]} shadow-xl backdrop-blur-sm`}>
                                ● {project.status}
                            </span>
                        </div>
                        <h3 className="text-3xl md:text-5xl font-bold mt-4 leading-tight whitespace-pre-line text-white">
                            {project.title}
                        </h3>
                    </div>
                    <div className="relative z-10 flex items-end justify-between mt-auto pt-8">
                        <p className="text-white/70 text-sm max-w-[200px]">
                            {project.description}
                        </p>
                        <div className="text-right flex flex-wrap gap-2 justify-end">
                            {project.tags.map(tag => (
                                <span key={tag} className="px-2 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/5 text-white/90 text-[10px] font-mono uppercase tracking-widest leading-none">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </>
            );
        }

        return (
            <>
                {project.dark && (
                    <div className="absolute inset-0 z-0 overflow-hidden rounded-xl">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover scale-105 group-hover:scale-110 opacity-30 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-black/80 group-hover:bg-black/60 transition-colors" />
                    </div>
                )}
                <div className="relative z-10 flex justify-between items-start">
                    <div className="flex items-center gap-2">
                        <span className={`text-[8px] font-bold tracking-widest uppercase px-2 py-1 rounded-full ${statusStyles[project.status]}`}>
                            {project.status}
                        </span>
                    </div>
                    <Icon className={`${project.dark ? 'text-white' : 'text-primary'} w-5 h-5 opacity-80`} />
                </div>
                <div className="relative z-10 mt-auto pt-6">
                    <h3 className={`text-xl md:text-2xl font-bold leading-none whitespace-pre-line mb-3 ${project.dark ? 'text-white' : ''}`}>
                        {project.title}
                    </h3>
                    <p className={`${project.dark ? 'text-white/60' : 'text-[var(--text-muted)]'} text-xs md:text-sm line-clamp-2`}>
                        {project.description}
                    </p>
                    <div className="flex gap-2 mt-4 flex-wrap">
                        {project.tags.map(tag => (
                            <span key={tag} className={`text-[9px] font-bold uppercase tracking-widest ${project.dark ? 'bg-white/5 text-white/40 border-white/5' : 'bg-black/5 text-[var(--text-secondary)] border-[var(--border)]'} border px-2 py-0.5 rounded-full`}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </>
        );
    };

    return (
        <section ref={sectionRef} className="bg-[var(--background)] w-full relative overflow-hidden">

            {/* ========================================================
                DESKTOP VIEW (Pinned Scroll Journey)
            ======================================================== */}
            <div ref={desktopContainerRef} className="hidden md:flex min-h-screen w-full items-center justify-center bg-[var(--background)] relative will-change-transform py-20 overflow-hidden">

                {/* 1. HERO STATE (Text) */}
                <div ref={textRef} className="absolute z-20 pointer-events-none will-change-transform flex flex-col items-center justify-center w-full px-4 text-center">
                    <h2 className="flex flex-col items-center justify-center select-none pointer-events-none w-full m-0 tracking-tighter leading-[0.85]">
                        <span className="text-[22vw] sm:text-[20vw] font-display font-black uppercase text-center text-[var(--text-primary)] opacity-30 dark:opacity-10 transition-all duration-300">
                            AI
                        </span>
                        <span className="text-[22vw] sm:text-[18vw] font-display font-black uppercase text-center text-[var(--text-primary)] opacity-30 dark:opacity-10 transition-all duration-300">
                            EXPERIMENTS
                        </span>
                    </h2>
                </div>

                {/* 2. TRANSITION STATE (Bento Grid) */}
                <div ref={desktopGridRef} className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-10 px-8 lg:px-16 max-w-7xl mx-auto flex flex-col items-center justify-center">
                    <div
                        className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-12 gap-5 md:gap-6 w-full pointer-events-none"
                        style={{ gridAutoRows: 'calc((100svh - 6rem) / 6)' }}
                    >
                        {labProjects.map((project, i) => (
                            <div
                                key={i}
                                ref={(el: HTMLDivElement | null) => { wrapperRefs.current[i] = el; }}
                                className={`bento-card p-6 md:p-8 flex flex-col justify-between overflow-hidden relative group h-full w-full block will-change-transform pointer-events-auto backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] !bg-white/60 border border-gray-100 dark:border-white/5 dark:!bg-black/40 rounded-3xl ${project.dark ? "!bg-obsidian/70 dark:!bg-obsidian/70 !border-white/10" : ""} ${project.span}`}
                            >
                                {renderCardContent(project)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ========================================================
                MOBILE VIEW (Pinned Scrub Journey)
            ======================================================== */}
            <div ref={mobileContainerRef} className="flex md:hidden min-h-[100vh] py-16 w-full relative items-center justify-center flex-col px-4">

                {/* Mobile Text (Hero) */}
                <div ref={mobileTextRef} className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center z-20 pointer-events-none will-change-transform">
                    <h2 className="flex flex-col items-center justify-center select-none pointer-events-none w-full m-0 tracking-tighter leading-[0.85]">
                        <span className="text-[28vw] font-display font-black uppercase text-center text-[var(--text-primary)] opacity-30 dark:opacity-10 transition-all duration-300">
                            AI
                        </span>
                        <span className="text-[20vw] font-display font-black uppercase text-center text-[var(--text-primary)] opacity-30 dark:opacity-10 transition-all duration-300">
                            EXPERIMENTS
                        </span>
                    </h2>
                </div>

                {/* Mobile Grid Container */}
                <div className="absolute top-[15vh] left-0 right-0 z-10 px-4 pointer-events-none pb-[25vh]">
                    <div ref={mobileGridRef} className="flex flex-col items-center w-full pointer-events-auto will-change-transform">
                        <div className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-12 gap-4 md:gap-5 auto-rows-[110px] w-full">
                            {labProjects.map((project, i) => (
                                <div
                                    key={`mobile-${i}`}
                                    className={`bento-card p-4 flex flex-col justify-between overflow-hidden relative group h-full w-full block backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] !bg-white/60 border border-gray-100 dark:border-white/5 dark:!bg-black/40 rounded-2xl ${project.dark ? "!bg-obsidian/70 dark:!bg-obsidian/70 !border-white/10" : ""} ${project.span.replace(/row-span-\d+/, 'row-span-2')}`}
                                >
                                    {renderCardContent(project)}
                                </div>
                            ))}
                        </div>

                        {/* Mobile FAB */}
                        <div className="flex justify-center mt-12 mb-20 md:hidden pointer-events-auto">
                            <Link
                                ref={mobileFabRef}
                                href="#"
                                className="flex items-center gap-4 backdrop-blur-md bg-[#f2690d] hover:bg-black/80 text-black hover:text-white pl-8 pr-2.5 py-2.5 rounded-full font-bold shadow-[0_10px_40px_rgba(242,105,13,0.4)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.4)] transition-all duration-300 group"
                            >
                                <span className="uppercase tracking-[0.2em] font-semibold text-[10px] relative z-10">Explore All</span>
                                <span className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white group-hover:bg-white/20 transition-colors duration-300">
                                    <FlaskConical className="w-5 h-5 text-[#f2690d] group-hover:text-white transition-colors duration-300 flask-hover-wobble" />
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* DESKTOP FAB */}
            <Link
                ref={fabRef}
                href="#"
                className="hidden md:flex absolute bottom-24 left-1/2 -translate-x-1/2 z-50 items-center gap-4 backdrop-blur-md bg-[#f2690d] hover:bg-black/80 text-black hover:text-white pl-10 pr-3 py-3 rounded-full font-bold shadow-[0_10px_40px_rgba(242,105,13,0.4)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.4)] transition-all duration-300 group"
            >
                <span className="uppercase tracking-[0.2em] font-semibold text-xs relative z-10">Explore All</span>
                <span className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white group-hover:bg-white/20 transition-colors duration-300">
                    <FlaskConical className="w-5 h-5 text-[#f2690d] group-hover:text-white transition-colors duration-300 flask-hover-wobble" />
                </span>
            </Link>

        </section>
    );
}
