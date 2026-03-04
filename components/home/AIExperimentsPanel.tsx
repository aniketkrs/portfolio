"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const images = [
    "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=600&h=800",
    "https://images.unsplash.com/photo-1581404917879-53e19259f56e?auto=format&fit=crop&q=80&w=600&h=800",
    "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&q=80&w=600&h=800",
    "https://images.unsplash.com/photo-1518531933067-c8ad45fa3ea0?auto=format&fit=crop&q=80&w=600&h=800",
    "https://images.unsplash.com/photo-1490216766782-01966af1d87e?auto=format&fit=crop&q=80&w=600&h=800",
    "https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?auto=format&fit=crop&q=80&w=600&h=800",
];

// Start 3D SCATTERED
const desktopScatterPos = [
    { x: -60, y: -40, rot: -15, rotX: 10, rotY: -20, scale: 1.5 },
    { x: 0, y: -50, rot: 5, rotX: -15, rotY: 10, scale: 1.2 },
    { x: 60, y: -40, rot: 15, rotX: 20, rotY: 15, scale: 1.6 },
    { x: -50, y: 40, rot: -25, rotX: -10, rotY: -15, scale: 1.3 },
    { x: 0, y: 50, rot: -5, rotX: 15, rotY: 5, scale: 1.4 },
    { x: 50, y: 40, rot: 25, rotX: -20, rotY: 20, scale: 1.7 },
];

const desktopFinalPos = [
    { x: -24, y: -22 },
    { x: 0, y: -22 },
    { x: 24, y: -22 },
    { x: -24, y: 22 },
    { x: 0, y: 22 },
    { x: 24, y: 22 },
];

export default function AIExperimentsPanel() {
    const sectionRef = useRef<HTMLElement>(null);

    // Desktop refs
    const desktopContainerRef = useRef<HTMLDivElement>(null);
    const desktopGridRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);

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
                if (wrapper) {
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
                    end: "+=350%", // Keep the massive extra scrill distance
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1
                },
            });

            tl.to(textRef.current, {
                y: "-15vh",
                opacity: 0,
                scale: 1.5,
                letterSpacing: "0.5em", // Cool tracking effect
                filter: "blur(16px)",
                duration: 2,
                ease: "power2.inOut"
            }, 0);

            wrapperRefs.current.forEach((wrapper, i) => {
                if (wrapper) {
                    const isCenter = desktopFinalPos[i].x === 0;
                    tl.to(wrapper, {
                        x: `${desktopFinalPos[i].x}vw`,
                        y: `${isCenter ? desktopFinalPos[i].y : desktopFinalPos[i].y - 4}vh`,
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

            // CONTINUOUS DRIFT PARALLAX DURING THE ENTIRE HOLD
            wrapperRefs.current.forEach((wrapper, i) => {
                if (wrapper) {
                    tl.to(wrapper, {
                        y: `-=${i % 2 === 0 ? 6 : 12}vh`, // Subtle upward drift over a long period
                        duration: 7,
                        ease: "none"
                    }, 2.5); // Starts immediately after fly-in
                }
            });
        });

        // ------------------------ MOBILE ANIMATION ------------------------
        mm.add("(max-width: 767px)", () => {
            if (!mobileTextRef.current || !mobileGridRef.current || !mobileContainerRef.current) return;

            const mobileImages = mobileGridRef.current.children;

            gsap.set(mobileTextRef.current, { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 });
            gsap.set(mobileGridRef.current, { opacity: 1, y: 0 });

            Array.from(mobileImages).forEach((img, i) => {
                const isLeft = i % 2 === 0;
                gsap.set(img, {
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
                    end: "+=350%",
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

            Array.from(mobileImages).forEach((img, i) => {
                tl.to(img, {
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

            // DRIFT HOLD
            tl.to(mobileGridRef.current, {
                y: "-10vh",
                duration: 7.5,
                ease: "none"
            }, 2.5);
        });

        return () => mm.revert();
    }, [mounted]);

    if (!mounted) {
        return <div className="h-screen bg-[var(--background)] w-full" />;
    }

    return (
        <section ref={sectionRef} className="bg-[var(--background)] w-full overflow-hidden relative">

            {/* ========================================================
                DESKTOP VIEW (Pinned Scroll Journey)
            ======================================================== */}
            <div ref={desktopContainerRef} className="hidden md:flex h-screen w-full relative items-center justify-center bg-[var(--background)] will-change-transform">

                {/* 1. HERO STATE (Text) */}
                <div ref={textRef} className="absolute z-20 pointer-events-none will-change-transform flex flex-col items-center justify-center w-full px-4 text-center">
                    <h2 className="flex flex-col items-center justify-center select-none pointer-events-none w-full m-0">
                        <span className="text-[25vw] sm:text-[20vw] md:text-[18vw] lg:text-[20vw] font-display font-black uppercase tracking-tighter leading-none text-center text-[var(--text-primary)] opacity-30 dark:opacity-10 transition-all duration-300">
                            AI
                        </span>
                        <span className="text-[25vw] sm:text-[20vw] md:text-[18vw] lg:text-[20vw] font-display font-black uppercase tracking-tighter leading-none text-center text-[var(--text-primary)] opacity-30 dark:opacity-10 transition-all duration-300">
                            Products
                        </span>
                    </h2>
                    <p className="mt-6 text-base font-medium tracking-widest uppercase text-[var(--text-secondary)]">
                        Scroll to Explore Lab Projects
                    </p>
                </div>

                {/* 2. TRANSITION STATE (Grid) */}
                <div ref={desktopGridRef} className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
                    {images.map((src, index) => (
                        <div
                            key={index}
                            ref={(el) => { wrapperRefs.current[index] = el; }}
                            className="absolute aspect-[4/5] overflow-hidden will-change-transform rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-white/10 group pointer-events-auto cursor-pointer bg-white/5"
                            style={{
                                width: "clamp(160px, 16vw, 240px)",
                            }}
                        >
                            <img src={src} alt={`AI experiment visual ${index + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer">
                                <span className="text-white font-bold tracking-widest uppercase text-xs border border-white/30 px-5 py-2.5 rounded-full backdrop-blur-sm shadow-xl">View Lab</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ========================================================
                MOBILE VIEW (Pinned Scrub Journey)
            ======================================================== */}
            <div ref={mobileContainerRef} className="flex md:hidden h-screen w-full relative items-center justify-center flex-col px-6 overflow-hidden">

                {/* Mobile Text (Hero) - Readable initially */}
                <div ref={mobileTextRef} className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center z-20 pointer-events-none will-change-transform">
                    <h2 className="flex flex-col items-center justify-center select-none pointer-events-none w-full m-0">
                        <span className="text-[25vw] sm:text-[20vw] md:text-[18vw] lg:text-[20vw] font-display font-black uppercase tracking-tighter leading-none text-center text-[var(--text-primary)] opacity-30 dark:opacity-10 transition-all duration-300">
                            AI
                        </span>
                        <span className="text-[25vw] sm:text-[20vw] md:text-[18vw] lg:text-[20vw] font-display font-black uppercase tracking-tighter leading-none text-center text-[var(--text-primary)] opacity-30 dark:opacity-10 transition-all duration-300">
                            Prod-
                        </span>
                        <span className="text-[25vw] sm:text-[20vw] md:text-[18vw] lg:text-[20vw] font-display font-black uppercase tracking-tighter leading-none text-center text-[var(--text-primary)] opacity-30 dark:opacity-10 transition-all duration-300">
                            ucts
                        </span>
                    </h2>
                    <p className="mt-4 text-xs font-bold tracking-widest uppercase text-[var(--text-secondary)]">
                        Scroll Down
                    </p>
                </div>

                {/* Mobile Grid */}
                <div className="absolute top-[48%] left-0 right-0 z-10 -translate-y-1/2 px-6 pointer-events-none">
                    <div ref={mobileGridRef} className="grid grid-cols-2 gap-3 will-change-transform pointer-events-auto">
                        {images.map((src, index) => (
                            <div key={`mobile-${index}`} className="w-full aspect-[4/5] overflow-hidden rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] bg-white/5 border border-white/5 relative group">
                                <img src={src} alt={`AI project preview ${index + 1}`} className="w-full h-full object-cover" loading="lazy" />
                                <div className="absolute inset-0 bg-black/30 opacity-0 active:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer">
                                    <span className="text-white font-bold tracking-widest uppercase text-[10px] border border-white/30 px-4 py-2 rounded-full backdrop-blur-sm">View</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
