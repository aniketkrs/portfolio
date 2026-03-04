"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const books = [
    {
        front: "https://images.unsplash.com/photo-1767122374969-82c7acbbb4ed?q=80&w=400&auto=format&fit=crop",
        back: "https://images.unsplash.com/photo-1764617755316-ffb5ff87c2d7?q=80&w=400&auto=format&fit=crop",
        link: "https://github.com/aniketkrs",
    },
    {
        front: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop",
        back: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&auto=format&fit=crop",
        link: "https://github.com/aniketkrs",
    },
    {
        front: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400&auto=format&fit=crop",
        back: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?q=80&w=400&auto=format&fit=crop",
        link: "https://github.com/aniketkrs",
    },
    {
        front: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=400&auto=format&fit=crop",
        back: "https://images.unsplash.com/photo-1589998059171-989d887dda6e?q=80&w=400&auto=format&fit=crop",
        link: "https://github.com/aniketkrs",
    },
    {
        front: "https://images.unsplash.com/photo-1524578971842-8fabfbc596d6?q=80&w=400&auto=format&fit=crop",
        back: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=400&auto=format&fit=crop",
        link: "https://github.com/aniketkrs",
    },
];

export default function BookGallery() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <section ref={containerRef} className="h-[300vh] relative bg-[var(--background)]">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden perspective-container">
                {/* Background Typography */}
                <div className="absolute inset-0 flex flex-col items-center justify-center select-none pointer-events-none z-0">
                    <span className="text-[25vw] sm:text-[20vw] md:text-[18vw] lg:text-[15vw] font-display font-black uppercase tracking-tighter leading-none text-center text-[var(--text-primary)] opacity-[0.12] dark:opacity-[0.06] transition-all duration-300">
                        Book
                    </span>
                    <span className="text-[25vw] sm:text-[20vw] md:text-[18vw] lg:text-[15vw] font-display font-black uppercase tracking-tighter leading-none text-center text-[var(--text-primary)] opacity-[0.12] dark:opacity-[0.06] transition-all duration-300">
                        Gallery
                    </span>
                </div>

                {/* 3D Book Gallery */}
                <div
                    className="relative w-[280px] h-[380px] md:w-[400px] md:h-[550px]"
                    style={{ perspective: "2000px" }}
                >
                    {/* Back Cover (static — last thing visible) */}
                    <div className="absolute inset-0 rounded-r-2xl border border-[var(--border)] bg-[#111] shadow-[inset_-10px_0_40px_rgba(0,0,0,0.8),0_20px_50px_rgba(0,0,0,0.5)] z-0 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/80 to-transparent" />
                        <span className="text-white/10 font-serif italic text-2xl">fin.</span>
                    </div>

                    {/* Pages */}
                    {books.map((book, i) => {
                        const start = i * (1 / books.length);
                        const end = start + (1 / books.length);

                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const rotateY = useTransform(
                            scrollYProgress,
                            [start, end],
                            [0, -180]
                        );

                        // Z-index drops as page turns so turned pages go behind
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const zIndex = useTransform(
                            scrollYProgress,
                            [start, start + (0.5 / books.length), end],
                            [books.length - i + 10, books.length - i + 10, i + 1]
                        );

                        // Dynamic shadow that grows during mid-flip
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const shadowSpread = useTransform(
                            scrollYProgress,
                            [start, start + (0.5 / books.length), end],
                            [10, 35, 10]
                        );

                        return (
                            <motion.a
                                key={i}
                                href={book.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute inset-0 origin-left cursor-pointer group"
                                style={{
                                    rotateY,
                                    zIndex,
                                    transformStyle: "preserve-3d",
                                }}
                            >
                                {/* Front Face */}
                                <div
                                    className="absolute inset-0 rounded-r-2xl overflow-hidden bg-black"
                                    style={{ backfaceVisibility: "hidden" }}
                                >
                                    {/* Spine shading */}
                                    <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-black/70 via-black/20 to-transparent z-20 pointer-events-none" />
                                    {/* Glossy glare */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/10 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                    <img src={book.front} alt={`Book Front ${i}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03] group-hover:rotate-1" />

                                    {/* Page edge thickness — visible during flip */}
                                    <motion.div
                                        className="absolute inset-y-0 right-0 w-[3px] pointer-events-none z-30"
                                        style={{
                                            background: "linear-gradient(to right, #d4d0c8, #f5f0e8, #d4d0c8)",
                                            boxShadow: "-1px 0 2px rgba(0,0,0,0.15)",
                                        }}
                                    />

                                    {/* Inner border to simulate page edges */}
                                    <div className="absolute inset-0 border-[0.5px] border-white/20 rounded-r-2xl pointer-events-none z-30" />

                                    {/* Dynamic shadow overlay during turn */}
                                    <motion.div
                                        className="absolute inset-0 pointer-events-none z-10"
                                        style={{
                                            background: useTransform(
                                                scrollYProgress,
                                                [start, start + (0.4 / books.length), start + (0.5 / books.length)],
                                                [
                                                    "linear-gradient(to left, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%)",
                                                    "linear-gradient(to left, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 60%)",
                                                    "linear-gradient(to left, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%)",
                                                ]
                                            ),
                                        }}
                                    />
                                </div>

                                {/* Back Face */}
                                <div
                                    className="absolute inset-0 rounded-l-2xl overflow-hidden bg-[#e8e4dc] border-y border-l border-[#d4d0c8]"
                                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                                >
                                    {/* Crease/Spine shading on back */}
                                    <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/30 via-black/5 to-transparent z-10 pointer-events-none" />

                                    {/* Page texture overlay */}
                                    <div className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none" style={{ backgroundImage: "linear-gradient(to right, #ccc 1px, transparent 1px)", backgroundSize: "4px 100%" }} />

                                    <img src={book.back} alt={`Book Back ${i}`} className="w-full h-full object-cover opacity-90" />

                                    {/* Page edge thickness on back */}
                                    <div
                                        className="absolute inset-y-0 left-0 w-[3px] pointer-events-none z-30"
                                        style={{
                                            background: "linear-gradient(to left, #d4d0c8, #f5f0e8, #d4d0c8)",
                                            boxShadow: "1px 0 2px rgba(0,0,0,0.15)",
                                        }}
                                    />

                                    {/* Shadow cast on back face from next page */}
                                    <div
                                        className="absolute inset-y-0 left-0 w-16 pointer-events-none z-20"
                                        style={{ background: "linear-gradient(to right, rgba(0,0,0,0.12) 0%, transparent 100%)" }}
                                    />
                                </div>

                                {/* Page bottom edge — simulates thickness */}
                                <div
                                    className="absolute bottom-0 left-0 right-0 h-[3px] origin-bottom"
                                    style={{
                                        transform: "rotateX(-90deg)",
                                        background: "linear-gradient(to bottom, #ebe7df, #d8d4cc)",
                                        borderRadius: "0 0 2px 2px",
                                    }}
                                />
                            </motion.a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
