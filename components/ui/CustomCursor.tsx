"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import gsap from "gsap";

type CursorVariant = "default" | "hover" | "click" | "hero" | "work" | "github" | "testimonials" | "contact" | "ai-lab";

const SECTION_CONFIG: Record<string, { label: string; variant: CursorVariant }> = {
    hero: { label: "SCROLL", variant: "hero" },
    work: { label: "VIEW", variant: "work" },
    "ai-lab": { label: "CREATE", variant: "ai-lab" },
    github: { label: "EXPLORE", variant: "github" },
    testimonials: { label: "DRAG", variant: "testimonials" },
    contact: { label: "SAY HI", variant: "contact" },
};

/* ─── SVG Cursor Icons ─── */

const ScrollSVG = () => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="10" y="3" width="8" height="14" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="14" cy="8" r="1" fill="currentColor" className="cursor-scroll-dot" />
        <path d="M14 20 L14 25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 22 L14 26 L18 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ViewSVG = () => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M2 14C2 14 6 6 14 6C22 6 26 14 26 14C26 14 22 22 14 22C6 22 2 14 2 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="14" cy="14" r="1.5" fill="currentColor" className="cursor-eye-pupil" />
    </svg>
);

const CreateSVG = () => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 2 L14 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="cursor-spark-1" />
        <path d="M14 22 L14 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="cursor-spark-2" />
        <path d="M2 14 L6 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="cursor-spark-3" />
        <path d="M22 14 L26 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="cursor-spark-4" />
        <path d="M5.4 5.4 L8.2 8.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="cursor-spark-5" />
        <path d="M19.8 19.8 L22.6 22.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="cursor-spark-6" />
        <path d="M22.6 5.4 L19.8 8.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="cursor-spark-7" />
        <path d="M8.2 19.8 L5.4 22.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="cursor-spark-8" />
        <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="14" cy="14" r="1.5" fill="currentColor" />
    </svg>
);

const ExploreSVG = () => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="8" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="20" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="8" cy="22" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 9 L8 19" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 12 C8 12 8 10 12 10 L17 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="cursor-branch" />
    </svg>
);

const DragSVG = () => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M10 15V8.5C10 7.67 10.67 7 11.5 7C12.33 7 13 7.67 13 8.5V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M13 13V7.5C13 6.67 13.67 6 14.5 6C15.33 6 16 6.67 16 7.5V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16 13V8.5C16 7.67 16.67 7 17.5 7C18.33 7 19 7.67 19 8.5V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M19 14V12.5C19 11.67 19.67 11 20.5 11C21.33 11 22 11.67 22 12.5V18C22 21.31 19.31 24 16 24H14C11.24 24 9 21.76 9 19V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="cursor-hand" />
    </svg>
);

const SayHiSVG = () => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 20L4 8C4 6.34 5.34 5 7 5H21C22.66 5 24 6.34 24 8V16C24 17.66 22.66 19 21 19H9L4 24V20Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="10" cy="12" r="1" fill="currentColor" className="cursor-dot-1" />
        <circle cx="14" cy="12" r="1" fill="currentColor" className="cursor-dot-2" />
        <circle cx="18" cy="12" r="1" fill="currentColor" className="cursor-dot-3" />
    </svg>
);

const PointerSVG = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 2L4 15L8 11L13 18L15 17L10 10L16 10L4 2Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
);

const SVG_MAP: Record<string, React.FC> = {
    hero: ScrollSVG,
    work: ViewSVG,
    "ai-lab": CreateSVG,
    github: ExploreSVG,
    testimonials: DragSVG,
    contact: SayHiSVG,
    hover: PointerSVG,
};

const COLOR_MAP: Record<CursorVariant, string> = {
    hero: "rgba(255,255,255,0.75)",
    work: "rgba(242, 105, 13, 0.85)",
    "ai-lab": "rgba(168, 85, 247, 0.85)",
    github: "rgba(88, 166, 255, 0.85)",
    testimonials: "rgba(242, 105, 13, 0.75)",
    contact: "rgba(242, 105, 13, 0.9)",
    hover: "rgba(242, 105, 13, 0.9)",
    click: "rgba(242, 105, 13, 1)",
    default: "rgba(200, 200, 200, 0.4)",
};

export default function CustomCursor() {
    const [mounted, setMounted] = useState(false);
    const [isTouch, setIsTouch] = useState(true);
    const [variant, setVariant] = useState<CursorVariant>("default");
    const [label, setLabel] = useState("");
    const svgContainerRef = useRef<HTMLDivElement>(null);
    const prevVariantRef = useRef<CursorVariant>("default");
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const cursorX = useSpring(mouseX, { stiffness: 500, damping: 40, mass: 0.2 });
    const cursorY = useSpring(mouseY, { stiffness: 500, damping: 40, mass: 0.2 });

    const ringX = useSpring(mouseX, { stiffness: 120, damping: 20, mass: 0.8 });
    const ringY = useSpring(mouseY, { stiffness: 120, damping: 20, mass: 0.8 });

    useEffect(() => {
        setMounted(true);
        const mq = window.matchMedia("(pointer: fine)");
        setIsTouch(!mq.matches);
        const handleChange = (e: MediaQueryListEvent) => setIsTouch(!e.matches);
        mq.addEventListener("change", handleChange);
        return () => mq.removeEventListener("change", handleChange);
    }, []);

    // GSAP SVG animations per variant
    useEffect(() => {
        if (!svgContainerRef.current || variant === prevVariantRef.current) return;
        prevVariantRef.current = variant;

        const container = svgContainerRef.current;
        gsap.fromTo(container, { scale: 0.5, opacity: 0, rotation: -30 }, {
            scale: 1, opacity: 1, rotation: 0, duration: 0.4,
            ease: "back.out(2)",
        });

        if (variant === "hero") {
            gsap.to(".cursor-scroll-dot", {
                y: 4, duration: 0.6, repeat: -1, yoyo: true, ease: "power1.inOut",
            });
        }
        if (variant === "ai-lab") {
            gsap.to("[class^='cursor-spark-']", {
                scale: 1.3, opacity: 0.5, duration: 0.5, repeat: -1, yoyo: true,
                stagger: { each: 0.08, from: "center" }, ease: "sine.inOut",
            });
        }
        if (variant === "work") {
            gsap.to(".cursor-eye-pupil", {
                cx: "+=1", duration: 0.8, repeat: -1, yoyo: true, ease: "sine.inOut",
            });
        }
        if (variant === "contact") {
            gsap.to([".cursor-dot-1", ".cursor-dot-2", ".cursor-dot-3"], {
                y: -2, duration: 0.4, repeat: -1, yoyo: true,
                stagger: 0.15, ease: "sine.inOut",
            });
        }
        if (variant === "testimonials") {
            gsap.to(".cursor-hand", {
                x: 1.5, duration: 0.6, repeat: -1, yoyo: true, ease: "sine.inOut",
            });
        }
        if (variant === "github") {
            gsap.to(".cursor-branch", {
                strokeDashoffset: -8, duration: 1.5, repeat: -1, ease: "none",
            });
        }

        return () => {
            gsap.killTweensOf(container);
            gsap.killTweensOf(".cursor-scroll-dot");
            gsap.killTweensOf("[class^='cursor-spark-']");
            gsap.killTweensOf(".cursor-eye-pupil");
            gsap.killTweensOf(".cursor-dot-1");
            gsap.killTweensOf(".cursor-dot-2");
            gsap.killTweensOf(".cursor-dot-3");
            gsap.killTweensOf(".cursor-hand");
            gsap.killTweensOf(".cursor-branch");
        };
    }, [variant]);

    const getSectionFromElement = useCallback((el: HTMLElement): string | null => {
        const section = el.closest("[data-section]");
        return section ? (section as HTMLElement).dataset.section || null : null;
    }, []);

    useEffect(() => {
        if (isTouch) return;

        const handleMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            const target = e.target as HTMLElement;
            const sectionName = getSectionFromElement(target);
            const interactive = target.closest("a, button, [role='button'], input, textarea, select");

            if (interactive) {
                setVariant("hover");
                setLabel("");
            } else if (sectionName && SECTION_CONFIG[sectionName]) {
                const config = SECTION_CONFIG[sectionName];
                setVariant(config.variant);
                setLabel(config.label);
            } else {
                setVariant("default");
                setLabel("");
            }
        };

        const handleDown = () => setVariant("click");
        const handleUp = () => setVariant("default");

        document.addEventListener("mousemove", handleMove);
        document.addEventListener("mousedown", handleDown);
        document.addEventListener("mouseup", handleUp);

        return () => {
            document.removeEventListener("mousemove", handleMove);
            document.removeEventListener("mousedown", handleDown);
            document.removeEventListener("mouseup", handleUp);
        };
    }, [isTouch, mouseX, mouseY, getSectionFromElement]);

    if (!mounted || isTouch) return null;

    const isSection = variant !== "default" && variant !== "hover" && variant !== "click";
    const showSVG = isSection || variant === "hover";
    const SvgIcon = SVG_MAP[variant] || null;
    const cursorColor = COLOR_MAP[variant] || COLOR_MAP.default;

    const getRingSize = () => {
        switch (variant) {
            case "hover": return 44;
            case "click": return 16;
            case "hero": return 72;
            case "work": return 64;
            case "github": return 60;
            case "ai-lab": return 64;
            case "testimonials": return 64;
            case "contact": return 72;
            default: return 6;
        }
    };

    const ringSize = getRingSize();

    // Liquid glass ring styles — theme-adaptive
    const glassRingBg = isSection
        ? isDark
            ? `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08), rgba(255,255,255,0.02))`
            : `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5), rgba(255,255,255,0.15))`
        : "transparent";

    return (
        <>
            {/* Outer ring — liquid glass trail */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[10000]"
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                aria-hidden="true"
            >
                <motion.div
                    animate={{
                        width: ringSize,
                        height: ringSize,
                        borderColor: cursorColor,
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    style={{
                        borderRadius: "50%",
                        border: variant === "default" ? "none" : "1.5px solid",
                        background: glassRingBg,
                        backdropFilter: isSection ? "blur(12px) saturate(180%)" : "none",
                        WebkitBackdropFilter: isSection ? "blur(12px) saturate(180%)" : "none",
                        boxShadow: isSection
                            ? isDark
                                ? "inset 0 0.5px 0 rgba(255,255,255,0.15), 0 4px 16px rgba(0,0,0,0.2)"
                                : "inset 0 0.5px 0 rgba(255,255,255,0.6), 0 4px 16px rgba(0,0,0,0.06)"
                            : "none",
                    }}
                />
            </motion.div>

            {/* SVG icon + label — leads cursor */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[10001] flex flex-col items-center gap-1"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                    color: cursorColor,
                }}
                aria-hidden="true"
            >
                <AnimatePresence mode="wait">
                    {showSVG && SvgIcon && (
                        <motion.div
                            key={variant}
                            ref={svgContainerRef}
                            initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.4, rotate: 20 }}
                            transition={{ duration: 0.25, ease: "backOut" }}
                        >
                            <SvgIcon />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Label */}
                <AnimatePresence mode="wait">
                    {isSection && label && (
                        <motion.span
                            key={label}
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 4 }}
                            transition={{ duration: 0.15 }}
                            style={{
                                fontSize: "7px",
                                fontWeight: 800,
                                letterSpacing: "0.2em",
                                textTransform: "uppercase",
                                fontFamily: "var(--font-mono), monospace",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {label}
                        </motion.span>
                    )}
                </AnimatePresence>

                {/* Default dot */}
                {!showSVG && variant !== "click" && (
                    <motion.div
                        animate={{ width: 6, height: 6 }}
                        style={{
                            borderRadius: "50%",
                            backgroundColor: "var(--text-muted)",
                        }}
                    />
                )}

                {/* Click burst */}
                {variant === "click" && (
                    <motion.div
                        initial={{ scale: 0.5, opacity: 1 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            width: 16,
                            height: 16,
                            borderRadius: "50%",
                            border: "2px solid rgba(242, 105, 13, 0.6)",
                        }}
                    />
                )}
            </motion.div>
        </>
    );
}
