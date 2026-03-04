"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
    FlaskConical,
    ArrowUpRight,
    Sparkles,
    Cpu,
    Wand2,
    Brain,
    Zap,
    Globe,
    Layers,
    Eye,
    Boxes,
    ExternalLink,
    ChevronRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/* ═══════════════════════════════════════════
   PROJECT DATA — 9 projects to fill a 5×2 grid
   (hero occupies cell 1, remaining 9 fill the rest)
   ═══════════════════════════════════════════ */
const labProjects = [
    {
        title: "Sonic Latent-D",
        description:
            "Real-time synthesis of spatial audio from latent encodings.",
        tags: ["Audio ML", "WebAudio", "Latent Space"],
        status: "LIVE" as const,
        icon: Sparkles,
        image: "https://images.unsplash.com/photo-1637414165749-9b3cd88b8271?w=2400&auto=format&fit=crop&q=80",
    },
    {
        title: "Abstract Ethos",
        description:
            "Generative art engine powered by ethical AI constraints.",
        tags: ["GenAI", "Canvas", "Ethics"],
        status: "BETA" as const,
        icon: Wand2,
        image: "https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?w=800&auto=format&fit=crop&q=60",
    },
    {
        title: "Contextual OS",
        description:
            "Ambient context engine merging calendar, location, and intent.",
        tags: ["Context API", "LLM", "Agents"],
        status: "ALPHA" as const,
        icon: Brain,
        image: "https://images.unsplash.com/photo-1699911251220-8e0de3b5ce88?w=800&auto=format&fit=crop&q=60",
    },
    {
        title: "Neural Ambient",
        description:
            "Environment-aware noise cancellation using edge neural processing.",
        tags: ["Edge ML", "AudioDSP", "WASM"],
        status: "BUILD" as const,
        icon: Cpu,
        image: "https://images.unsplash.com/photo-1667483629944-6414ad0648c5?w=800&auto=format&fit=crop&q=60",
    },
    {
        title: "Pulse Net",
        description:
            "Decentralized health-signal aggregation with federated learning.",
        tags: ["FedML", "HealthKit", "Privacy"],
        status: "ALPHA" as const,
        icon: Zap,
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=60",
    },
    {
        title: "Geoweave",
        description:
            "Spatial computing layer fusing AR anchors with LLM reasoning.",
        tags: ["ARKit", "Spatial", "LLM"],
        status: "BUILD" as const,
        icon: Globe,
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=60",
    },
    {
        title: "Strata UI",
        description:
            "Adaptive component system that reshapes itself per user behavior.",
        tags: ["React", "A/B Engine", "ML"],
        status: "BETA" as const,
        icon: Layers,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&auto=format&fit=crop&q=60",
    },
    {
        title: "LensForge",
        description:
            "Neural style transfer pipeline for real-time video streams.",
        tags: ["Vision ML", "WebGPU", "ONNX"],
        status: "LIVE" as const,
        icon: Eye,
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60",
    },
    {
        title: "VoxelMind",
        description:
            "3D scene understanding from monocular depth estimation.",
        tags: ["Depth ML", "Three.js", "WASM"],
        status: "BUILD" as const,
        icon: Boxes,
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=60",
    },
];

/* ═══════════════════════════════════════════
   BREAKPOINT SYSTEM
   ═══════════════════════════════════════════ */
type Breakpoint = "desktop" | "tablet" | "mobile";

function getBreakpoint(w: number): Breakpoint {
    if (w >= 1200) return "desktop";
    if (w >= 768) return "tablet";
    return "mobile";
}

const GRID_CONFIG: Record<
    Breakpoint,
    {
        cols: number;
        gap: string;
        heroStartSize: string;
        heroTargetCol: string;
        heroTargetRow: string;
        scrollDistance: number;
    }
> = {
    desktop: {
        cols: 5,
        gap: "2rem",
        heroStartSize: "75%",
        heroTargetCol: "3 / 4",
        heroTargetRow: "1 / 2",
        scrollDistance: 2000,
    },
    tablet: {
        cols: 3,
        gap: "1.5rem",
        heroStartSize: "75%",
        heroTargetCol: "2 / 3",
        heroTargetRow: "1 / 2",
        scrollDistance: 1500,
    },
    mobile: {
        cols: 2,
        gap: "0.75rem",
        heroStartSize: "90%",
        heroTargetCol: "1 / 2",
        heroTargetRow: "1 / 2",
        scrollDistance: 800,
    },
};

/* ═══════════════════════════════════════════
   STATUS BADGE COLORS
   ═══════════════════════════════════════════ */
const statusStyles: Record<string, string> = {
    LIVE: "bg-emerald-500/20 text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.2)]",
    BETA: "bg-amber-500/20 text-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.15)]",
    ALPHA: "bg-sky-500/20 text-sky-400",
    BUILD: "bg-white/10 text-white/50",
};

/* ═══════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════ */
export default function AILabSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const sceneRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const heroSlotRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const fabRef = useRef<HTMLAnchorElement>(null);

    // Refs for toggleContent targets
    const heroTitleRef = useRef<HTMLHeadingElement>(null);
    const heroDescRef = useRef<HTMLParagraphElement>(null);
    const heroBtnRef = useRef<HTMLDivElement>(null);
    const titleOffsetY = 60; // px the title starts below when hidden

    const [bp, setBp] = useState<Breakpoint>("desktop");
    const [reducedMotion, setReducedMotion] = useState(false);

    const config = GRID_CONFIG[bp];
    const isMobile = bp === "mobile";

    const [mounted, setMounted] = useState(false);

    /* ─── Detect breakpoint + reduced-motion ─── */
    useEffect(() => {
        setMounted(true);
        const update = () => setBp(getBreakpoint(window.innerWidth));
        update();
        window.addEventListener("resize", update);

        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReducedMotion(mq.matches);
        const h = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
        mq.addEventListener("change", h);

        return () => {
            window.removeEventListener("resize", update);
            mq.removeEventListener("change", h);
        };
    }, []);

    /* ═══════════════════════════════════════════
       toggleContent: animate hero title / desc / button
       ═══════════════════════════════════════════ */
    const toggleHeroContent = useCallback((isVisible: boolean) => {
        const title = heroTitleRef.current;
        const description = heroDescRef.current;
        const button = heroBtnRef.current;
        if (!title || !description || !button) return;

        gsap.timeline({ defaults: { overwrite: true } })
            .to(title, {
                yPercent: isVisible ? 0 : titleOffsetY,
                opacity: isVisible ? 1 : 0,
                duration: 0.7,
                ease: "power2.inOut",
            })
            .to(
                [description, button],
                {
                    opacity: isVisible ? 1 : 0,
                    duration: 0.4,
                    ease: `power1.${isVisible ? "inOut" : "out"}`,
                    pointerEvents: isVisible ? "all" : "none",
                },
                isVisible ? "-=90%" : "<"
            );
    }, [titleOffsetY]);

    /* ═══════════════════════════════════════════
       DESKTOP / TABLET: Full hero-to-grid scroll animation
       ═══════════════════════════════════════════ */
    const buildScrollAnimation = useCallback(() => {
        if (
            !sceneRef.current ||
            !heroRef.current ||
            !gridRef.current ||
            !heroSlotRef.current
        )
            return;

        const scene = sceneRef.current;
        const hero = heroRef.current;
        const grid = gridRef.current;
        const slot = heroSlotRef.current;

        // Reset transforms for clean measurements
        gsap.set(hero, { clearProps: "all" });
        gsap.set(grid.querySelectorAll(".ai-card"), { clearProps: "all" });

        const sceneRect = scene.getBoundingClientRect();
        const heroW = hero.offsetWidth;
        const heroH = hero.offsetHeight;

        // Center the hero within the scene using GSAP (not CSS transform)
        const centerX = (sceneRect.width - heroW) / 2;
        const centerY = (sceneRect.height - heroH) / 2;
        gsap.set(hero, { x: centerX, y: centerY, scale: 1 });

        // Animate hero content IN when scene enters viewport
        ScrollTrigger.create({
            trigger: scene,
            start: "top 80%",
            once: true,
            onEnter: () => toggleHeroContent(true),
        });

        // Force reflow
        void hero.offsetHeight;

        const heroRect = hero.getBoundingClientRect();
        const slotRect = slot.getBoundingClientRect();

        // Calculate delta from current centered position to grid slot
        const targetScale = slotRect.width / heroRect.width;
        const slotCenterX = slotRect.left + slotRect.width / 2;
        const slotCenterY = slotRect.top + slotRect.height / 2;
        const heroCenterX = heroRect.left + heroRect.width / 2;
        const heroCenterY = heroRect.top + heroRect.height / 2;

        const deltaX = slotCenterX - heroCenterX;
        const deltaY = slotCenterY - heroCenterY;
        const finalX = centerX + deltaX;
        const finalY = centerY + deltaY;

        // Master timeline — progress controlled natively by ScrollTrigger
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: scene,
                start: "top top",
                end: `+=${config.scrollDistance}`,
                pin: true,
                pinSpacing: true,
                scrub: 1.2,
            }
        });

        /* ── Phase 1: Hero Focus (0% → 20%) — content toggles OUT ── */
        tl.to(
            heroTitleRef.current!,
            {
                yPercent: titleOffsetY,
                opacity: 0,
                duration: 0.2,
                ease: "power2.in",
                overwrite: true,
            },
            0
        );
        tl.to(
            [heroDescRef.current!, heroBtnRef.current!],
            {
                opacity: 0,
                duration: 0.15,
                ease: "power1.out",
                pointerEvents: "none",
                overwrite: true,
            },
            0
        );

        /* ── Phase 2: The Transition (20% → 80%) ── */
        tl.to(
            hero,
            {
                x: finalX,
                y: finalY,
                scale: targetScale,
                borderRadius: "20px",
                duration: 0.6,
                ease: "power3.inOut",
            },
            0.15
        );

        tl.to(
            ".ai-hero-dim",
            {
                opacity: 0.55,
                duration: 0.5,
                ease: "power2.in",
            },
            0.2
        );

        // Gallery cards bloom in with stagger
        tl.fromTo(
            grid.querySelectorAll(".ai-card"),
            { opacity: 0, scale: 0.8, y: 40 },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                stagger: { each: 0.04, from: "center" },
                duration: 0.45,
                ease: "back.out(1.4)",
            },
            0.35
        );

        /* ── Phase 3: Grid Lock (80% → 100%) ── */
        tl.to(grid, { pointerEvents: "auto", duration: 0.01 }, 0.85);

        /* ── Phase 4: FAB Appear ── */
        if (fabRef.current) {
            gsap.set(fabRef.current, { y: 50, opacity: 0, scale: 0.8, pointerEvents: "none" });

            tl.to(fabRef.current, {
                y: 0,
                opacity: 1,
                scale: 1,
                pointerEvents: "auto",
                duration: 0.2,
                ease: "back.out(1.5)",
                onComplete: () => {
                    // Micro-interaction: a subtle bounce/pulse on appearance
                    gsap.to(fabRef.current, {
                        scale: 1.05,
                        duration: 0.2,
                        yoyo: true,
                        repeat: 1,
                        ease: "power1.inOut"
                    });
                }
            }, 0.6); // Fade in gracefully as the cards bloom in

            // Subtle drift with the grid
            tl.to(fabRef.current, {
                y: "-=2vh",
                duration: 0.4,
                ease: "none"
            }, 0.8);
        }
    }, [config.scrollDistance, toggleHeroContent, titleOffsetY]);

    /* ═══════════════════════════════════════════
       MOBILE: simplified scale-dominant animation (no pin)
       ═══════════════════════════════════════════ */
    const buildMobileAnimation = useCallback(() => {
        const section = sectionRef.current;
        if (!section) return;

        // Small delay for DOM to be ready after conditional render
        const timer = setTimeout(() => {
            const mobileHero = section.querySelector(".ai-mobile-hero") as HTMLElement;
            const mobileCards = section.querySelectorAll(".ai-card") as NodeListOf<HTMLElement>;

            // Hero card - gentle fade-up enhancement
            if (mobileHero) {
                gsap.fromTo(
                    mobileHero,
                    { opacity: 0.3, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: mobileHero,
                            start: "top 95%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            }

            // Cards stagger in
            mobileCards.forEach((card, i) => {
                gsap.fromTo(
                    card,
                    { opacity: 0.3, y: 15 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.4,
                        delay: i * 0.04,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 98%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            });

            // Ensure FAB is visible on mobile (overriding any desktop GSAP inline styles)
            if (fabRef.current) {
                gsap.set(fabRef.current, { opacity: 1, y: 0, scale: 1, pointerEvents: "auto", clearProps: "all" });
            }
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    /* ═══════════════════════════════════════════
       REDUCED MOTION: simple crossfade
       ═══════════════════════════════════════════ */
    const buildReducedMotion = useCallback(() => {
        if (!sceneRef.current) return;

        const cards = sceneRef.current.querySelectorAll(".ai-card, .ai-mobile-hero");
        gsap.fromTo(
            cards,
            { opacity: 0, y: 16 },
            {
                opacity: 1,
                y: 0,
                stagger: 0.08,
                duration: 0.4,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sceneRef.current,
                    start: "top 75%",
                    toggleActions: "play none none reverse",
                },
            }
        );
    }, []);

    /* ═══════════════════════════════════════════
       ORCHESTRATOR — choose animation strategy
       ═══════════════════════════════════════════ */
    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Header reveal (all breakpoints)
            gsap.fromTo(
                ".ai-header-el",
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.08,
                    duration: 0.6,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: "top 85%",
                        end: "top 55%",
                        scrub: 1,
                    },
                }
            );

            if (reducedMotion) {
                buildReducedMotion();
            } else if (isMobile) {
                buildMobileAnimation();
            } else {
                // Desktop/Tablet — wait for layout to settle
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        buildScrollAnimation();
                    });
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, [
        bp,
        reducedMotion,
        isMobile,
        buildScrollAnimation,
        buildMobileAnimation,
        buildReducedMotion,
    ]);

    /* ═══════════════════════════════════════════
       RENDER — Hero project is index 0
       ═══════════════════════════════════════════ */
    const heroProject = labProjects[0];
    const gridProjects = labProjects.slice(1);

    return (
        <section
            ref={sectionRef}
            data-section="ai-lab"
            className="ai-lab-section relative"
            aria-label="AI Playground Lab – scroll to explore projects"
        >
            {/* ═══ Section Header ═══ */}
            <div
                ref={headerRef}
                className="ai-lab-header px-5 md:px-8 lg:px-16 max-w-[1440px] mx-auto pt-16 md:pt-32 mb-6 md:mb-20"
            >
                <div className="ai-header-el flex items-center gap-3 mb-6">
                    <FlaskConical className="w-5 h-5 text-primary" />
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary">
                        AI Playground
                    </span>
                </div>
                <h2 className="ai-header-el text-4xl md:text-6xl lg:text-[5.5rem] font-bold tracking-tighter leading-[0.9]">
                    AI{" "}
                    <br className="md:hidden" />
                    <span className="text-[var(--text-muted)]">Lab</span>
                </h2>
                <p className="ai-header-el mt-4 text-[var(--text-muted)] text-sm md:text-base max-w-lg leading-relaxed">
                    Side projects exploring the edges of AI, audio, and
                    generative systems.
                </p>
            </div>

            {/* ═══════════════════════════════════════════
                SCENE WRAPPER — Always rendered so GSAP can bind Ref
               ═══════════════════════════════════════════ */}
            <div ref={sceneRef} className="ai-lab-scene-wrapper relative w-full">

                {/* ═══════════════════════════════════════════
                DESKTOP / TABLET — STICKY SCENE
               ═══════════════════════════════════════════ */}
                {mounted && !isMobile && (
                    <div
                        className="ai-lab-scene"
                        style={{
                            position: "relative",
                            width: "100%",
                            height: "100vh",
                            overflow: "hidden",
                        }}
                    >
                        {/* ── Hero: component card that shrinks into grid ── */}
                        <div
                            ref={heroRef}
                            className="ai-hero-fullscreen"
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: config.heroStartSize,
                                height: "78vh",
                                transformOrigin: "center center",
                                zIndex: 20,
                                borderRadius: "32px",
                                overflow: "hidden",
                                willChange: "transform",
                            }}
                        >
                            {/* Background image layer */}
                            <img
                                src={heroProject.image}
                                alt={heroProject.title}
                                className="absolute inset-0 w-full h-full object-cover"
                                fetchPriority="high"
                            />

                            {/* Glassmorphism tint */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.2) 100%)",
                                }}
                            />

                            {/* Dim overlay (animated) */}
                            <div
                                className="ai-hero-dim absolute inset-0"
                                style={{ backgroundColor: "rgba(0,0,0,0)", transition: "none" }}
                            />

                            {/* Gradient overlays */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />

                            {/* Status + icon badge — always visible */}
                            <div className="absolute top-6 left-6 flex items-center gap-3">
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                                    style={{
                                        background: "rgba(255,255,255,0.08)",
                                        backdropFilter: "blur(12px)",
                                        border: "1px solid rgba(255,255,255,0.15)",
                                    }}
                                >
                                    <heroProject.icon className="w-3.5 h-3.5 text-primary" />
                                    <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-primary">
                                        Featured
                                    </span>
                                </div>
                                <span className={`text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full ${statusStyles[heroProject.status]}`}>
                                    ● {heroProject.status}
                                </span>
                            </div>

                            {/* Hero content — title / desc / button — toggled by GSAP */}
                            <div className="absolute inset-0 flex flex-col justify-end px-8 pb-10">
                                {/* Title — animated yPercent */}
                                <div style={{ overflow: "hidden" }}>
                                    <h3
                                        ref={heroTitleRef}
                                        className="text-white font-bold tracking-tighter leading-none"
                                        style={{
                                            fontSize: "clamp(2rem, 5vw, 4.5rem)",
                                            transform: `translateY(${titleOffsetY}px)`,
                                            opacity: 0,
                                        }}
                                    >
                                        {heroProject.title}
                                    </h3>
                                </div>

                                {/* Description */}
                                <p
                                    ref={heroDescRef}
                                    className="text-white/60 mt-3 max-w-lg leading-relaxed"
                                    style={{
                                        fontSize: "clamp(0.8rem, 1.5vw, 1.05rem)",
                                        opacity: 0,
                                        pointerEvents: "none",
                                    }}
                                >
                                    {heroProject.description}
                                </p>

                                {/* Tags + CTA button */}
                                <div
                                    ref={heroBtnRef}
                                    className="flex flex-wrap items-center gap-3 mt-6"
                                    style={{ opacity: 0, pointerEvents: "none" }}
                                >
                                    {heroProject.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 rounded-full text-[10px] font-medium text-white/70 border border-white/10"
                                            style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(8px)" }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                    <button
                                        className="ml-auto flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm"
                                        style={{
                                            background: "rgba(255,255,255,0.12)",
                                            backdropFilter: "blur(16px)",
                                            border: "1px solid rgba(255,255,255,0.2)",
                                            color: "white",
                                            cursor: "pointer",
                                        }}
                                        onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.05, duration: 0.2 })}
                                        onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.2 })}
                                    >
                                        View Project
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* ── Gallery Grid — sits behind hero, cards bloom in ── */}
                        <div
                            ref={gridRef}
                            className="ai-gallery-grid"
                            style={{
                                position: "absolute",
                                inset: 0,
                                display: "grid",
                                gridTemplateColumns: `repeat(${config.cols}, 1fr)`,
                                gap: config.gap,
                                padding: "2rem",
                                alignContent: "center",
                                zIndex: 30,
                                pointerEvents: "none",
                                minHeight: "100%",
                            }}
                            role="list"
                            aria-label="AI Lab project gallery"
                        >
                            {/* Hero slot — invisible placeholder for the transform target */}
                            <div
                                ref={heroSlotRef}
                                data-id="hero-slot"
                                style={{
                                    gridColumn: config.heroTargetCol,
                                    gridRow: config.heroTargetRow,
                                    visibility: "hidden",
                                    aspectRatio: "4/5",
                                    minHeight: "280px",
                                }}
                                aria-hidden="true"
                            />

                            {/* Project cards */}
                            {gridProjects.map((project) => {
                                const Icon = project.icon;
                                return (
                                    <div
                                        key={project.title}
                                        className="ai-card group cursor-pointer"
                                        role="listitem"
                                        tabIndex={0}
                                        aria-label={`${project.title}: ${project.description}`}
                                        style={{ opacity: 0 }}
                                    >
                                        <div className="ai-card-inner h-full rounded-2xl overflow-hidden relative flex flex-col">
                                            {/* Image */}
                                            <div className="relative h-32 lg:h-40 overflow-hidden flex-shrink-0">
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                                {/* Status badge */}
                                                <div className="absolute top-3 left-3">
                                                    <span
                                                        className={`text-[8px] font-bold tracking-widest uppercase px-2 py-1 rounded-full ${statusStyles[project.status]}`}
                                                    >
                                                        {project.status}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-4 lg:p-5 flex flex-col flex-1">
                                                <div className="flex items-start justify-between gap-2 mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                            <Icon className="w-3.5 h-3.5 text-primary" />
                                                        </div>
                                                        <h3 className="text-sm font-bold tracking-tight text-[var(--text-primary)]">
                                                            {project.title}
                                                        </h3>
                                                    </div>
                                                    <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0 mt-0.5" />
                                                </div>

                                                <p className="text-[var(--text-muted)] text-[11px] leading-relaxed mb-3 flex-1 line-clamp-2">
                                                    {project.description}
                                                </p>

                                                {/* Tags */}
                                                <div className="flex flex-wrap gap-1">
                                                    {project.tags.map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="text-[8px] px-1.5 py-0.5 rounded-full text-[var(--text-muted)] border border-[var(--border)]"
                                                            style={{
                                                                background:
                                                                    "var(--glass-bg)",
                                                            }}
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* ═══════════════════════════════════════════
                MOBILE — No pin, simple 2-col grid with scale-in
               ═══════════════════════════════════════════ */}
                {mounted && isMobile && (
                    <div
                        className="px-4 pb-8"
                    >
                        {/* Hero card */}
                        <div className="ai-mobile-hero mb-3">
                            <div className="rounded-2xl overflow-hidden relative" style={{ aspectRatio: "16/10" }}>
                                <img
                                    src={heroProject.image}
                                    alt={heroProject.title}
                                    className="w-full h-full object-cover"
                                    loading="eager"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4">
                                    <span
                                        className={`text-[8px] font-bold tracking-widest uppercase px-2 py-1 rounded-full ${statusStyles[heroProject.status]}`}
                                    >
                                        ● {heroProject.status}
                                    </span>
                                    <h3 className="text-white text-lg font-bold mt-2">
                                        {heroProject.title}
                                    </h3>
                                    <p className="text-white/60 text-xs mt-1">
                                        {heroProject.description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Grid of remaining cards */}
                        <div
                            ref={gridRef}
                            className="grid grid-cols-2 gap-3"
                            role="list"
                            aria-label="AI Lab project gallery"
                        >
                            {gridProjects.map((project) => {
                                const Icon = project.icon;
                                return (
                                    <div
                                        key={project.title}
                                        className="ai-card group cursor-pointer"
                                        role="listitem"
                                        tabIndex={0}
                                        aria-label={`${project.title}: ${project.description}`}
                                    >
                                        <div className="ai-card-inner h-full rounded-xl overflow-hidden relative flex flex-col">
                                            <div className="relative h-24 overflow-hidden flex-shrink-0">
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover"
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                                <div className="absolute top-2 left-2">
                                                    <span
                                                        className={`text-[7px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded-full ${statusStyles[project.status]}`}
                                                    >
                                                        {project.status}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-3 flex flex-col flex-1">
                                                <div className="flex items-center gap-1.5 mb-1">
                                                    <Icon className="w-3 h-3 text-primary flex-shrink-0" />
                                                    <h3 className="text-xs font-bold tracking-tight text-[var(--text-primary)] truncate">
                                                        {project.title}
                                                    </h3>
                                                </div>
                                                <p className="text-[var(--text-muted)] text-[10px] leading-snug line-clamp-2">
                                                    {project.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* SHARED FAB FOR BOTH DESKTOP AND MOBILE */}
                <Link
                    ref={fabRef}
                    href="/ai"
                    className="relative md:absolute md:bottom-24 md:left-1/2 md:-translate-x-1/2 mx-auto mt-6 md:mt-0 z-[100] flex items-center gap-4 bg-[#f2690d] hover:bg-white text-black hover:text-[#f2690d] pl-8 pr-2.5 py-2.5 md:pl-10 md:pr-3 md:py-3 rounded-[32px] font-bold shadow-[0_10px_40px_rgba(242,105,13,0.4)] hover:shadow-[0_10px_40px_rgba(255,255,255,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 group overflow-hidden w-fit"
                >
                    <span className="uppercase tracking-[0.2em] font-semibold text-[10px] md:text-xs relative z-10 transition-colors duration-300">Explore All</span>

                    {/* Arrow Container - the white circle */}
                    <span className="relative z-10 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white group-hover:bg-[#f2690d] transition-colors duration-300">
                        <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:rotate-45 group-hover:translate-x-0.5 transition-all duration-300">
                            <path d="M14.9167 26.25L13.75 25.0833L23.4167 15.4167H17.9167V13.75H26.25V22.0833H24.5833V16.5833L14.9167 26.25V26.25" className="fill-[#f2690d] group-hover:fill-white transition-colors duration-300" />
                        </svg>
                    </span>
                </Link>

            </div> {/* END SCENE WRAPPER */}

        </section>
    );
}
