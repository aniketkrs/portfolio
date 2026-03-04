"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const images = [
    "/sticky-grid/1.webp",
    "/sticky-grid/2.webp",
    "/sticky-grid/3.webp",
    "/sticky-grid/4.webp",
    "/sticky-grid/5.webp",
    "/sticky-grid/6.webp",
    "/sticky-grid/7.webp",
    "/sticky-grid/13.webp", // Replace 8.webp
    "/sticky-grid/9.webp",
    "/sticky-grid/10.webp",
    "/sticky-grid/11.webp",
    "/sticky-grid/12.webp",
];

export default function StickyGrid() {
    const mainBlockRef = useRef<HTMLElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const gridRef = useRef<HTMLUListElement>(null);

    // We'll collect the grid items into an array of refs
    const itemRefs = useRef<HTMLLIElement[]>([]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const block = mainBlockRef.current;
        const wrapper = wrapperRef.current;
        const content = contentRef.current;
        const title = titleRef.current;
        const description = descriptionRef.current;
        const grid = gridRef.current;
        const items = itemRefs.current;

        if (!block || !wrapper || !content || !title || !description || !grid || !items.length) return;

        // Init content
        gsap.set(description, { opacity: 0 });

        const dy = (content.offsetHeight - title.offsetHeight) / 2;
        const titleOffsetY = (dy / content.offsetHeight) * 100;
        gsap.set(title, { yPercent: titleOffsetY, opacity: 0 });

        // Group columns (3 columns)
        const columns: HTMLElement[][] = [[], [], []];
        items.forEach((item, index) => {
            columns[index % 3].push(item);
        });

        // Add Parallax wrapper
        gsap.from(wrapper, {
            yPercent: -100,
            ease: "none",
            scrollTrigger: {
                trigger: block,
                start: "top bottom",
                end: "top top",
                scrub: true,
            },
        });

        // Add Title Initial Reveal
        gsap.to(title, {
            opacity: 1,
            duration: 0.7,
            ease: "power1.out",
            scrollTrigger: {
                trigger: block,
                start: "top 57%",
                toggleActions: "play none none reverse",
            },
        });

        // Grid Reveal Timeline
        const buildGridReveal = () => {
            const tl = gsap.timeline();
            const wh = window.innerHeight;
            // Dist to push items fully outside
            const distY = wh - (wh - grid.offsetHeight) / 2 + 200;

            columns.forEach((column, colIndex) => {
                const fromTop = colIndex % 2 === 0;
                tl.from(
                    column,
                    {
                        y: distY * (fromTop ? -1 : 1),
                        stagger: {
                            each: 0.06,
                            from: fromTop ? "end" : "start",
                        },
                        ease: "power1.inOut",
                    },
                    "grid-reveal"
                );
            });
            return tl;
        };

        // Grid Zoom Timeline
        const buildGridZoom = () => {
            const tl = gsap.timeline({ defaults: { duration: 1, ease: "power3.inOut" } });
            tl.to(grid, { scale: 2.5 });
            tl.to(columns[0], { xPercent: -50 }, "<");
            tl.to(columns[2], { xPercent: 50 }, "<");
            tl.to(
                columns[1],
                {
                    yPercent: (index) => (index < Math.floor(columns[1].length / 2) ? -1 : 1) * 50,
                    duration: 0.5,
                    ease: "power1.inOut",
                },
                "-=0.5"
            );
            return tl;
        };

        // Main Scroll triggered timeline
        const scrollTl = gsap.timeline({
            scrollTrigger: {
                trigger: block,
                start: "top 25%",
                end: "bottom bottom",
                scrub: 1, // Add smooth scrubbing
            },
        });

        scrollTl
            .add(buildGridReveal())
            .add(buildGridZoom(), "-=0.6")
            // Fade in text at the end of zoom
            .to(title, { yPercent: 0, scale: 1.1, duration: 0.7, ease: "power2.inOut" }, "-=0.5")
            .to(description, { opacity: 1, duration: 0.4, ease: "power1.inOut" }, "<");

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <div className="bg-[var(--background)] overflow-hidden text-[var(--text-primary)]">
            {/* Block Intro */}
            <section className="relative z-10 w-full h-screen flex flex-col justify-center items-center px-6">
                <div className="w-full max-w-7xl mx-auto flex items-center justify-center h-full">
                    {/* Replaced 8.webp with text */}
                    <div className="flex flex-col items-center">
                        <div className="text-[12px] md:text-[14px] font-bold tracking-[0.3em] uppercase mb-8" style={{ color: "var(--primary)" }}>
                            Welcome To
                        </div>
                        <h1 className="text-[12vw] md:text-[8vw] font-display font-black leading-none uppercase tracking-tighter text-center" style={{ color: "var(--primary)" }}>
                            My AI playground <br /> Lab
                        </h1>
                    </div>
                </div>
            </section>

            {/* Block Main */}
            <section ref={mainBlockRef} className="h-[400vh] w-full">
                <div ref={wrapperRef} className="sticky top-0 h-screen w-full px-6 overflow-hidden flex items-center justify-center perspective-container">

                    {/* Content overlay */}
                    <div ref={contentRef} className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center pointer-events-none p-6">
                        <h2
                            ref={titleRef}
                            className="font-display font-bold text-4xl md:text-6xl lg:text-[80px] leading-[1.1] tracking-tight max-w-[924px] shadow-sm drop-shadow-lg text-white mix-blend-difference"
                        >
                            Live Products & <br className="hidden md:block" /> Real Learnings
                        </h2>
                        <p
                            ref={descriptionRef}
                            className="mt-8 text-sm md:text-base uppercase tracking-widest max-w-[455px] font-mono pointer-events-auto bg-black/60 backdrop-blur-xl text-white py-4 px-8 rounded-full border border-white/10"
                        >
                            Scroll to explore the gallery
                        </p>
                    </div>

                    {/* Gallery Grid */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] z-10 pointer-events-none">
                        <ul ref={gridRef} className="grid grid-cols-3 gap-x-4 md:gap-x-8 gap-y-6 md:gap-y-10">
                            {images.map((src, i) => (
                                <li
                                    key={src}
                                    ref={(el) => {
                                        if (el && !itemRefs.current.includes(el)) {
                                            itemRefs.current[i] = el;
                                        }
                                    }}
                                    className="w-full aspect-[4/5] will-change-transform"
                                >
                                    <img src={src} alt={`Grid item ${i}`} className="w-full h-full object-cover rounded-2xl shadow-xl border border-white/10" />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}
