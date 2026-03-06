"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FileText, ArrowUpRight, Paperclip } from "lucide-react";
import Link from "next/link";

const articles = [
    {
        title: "Why Most AI Products Fail at Evaluation",
        date: "Feb 2025",
        category: "AI Strategy",
        teaser: "The gap between demo magic and production trust is an evaluation problem, not a model problem. We dive deep into the specific metrics and qualitative checks that can bridge this gap and create sustainable AI business value.",
        readTime: "6 min",
        href: "/articles/ai-evaluation",
    },
    {
        title: "The PM's Guide to Shipping with LLMs",
        date: "Jan 2025",
        category: "Product",
        teaser: "Practical frameworks for scoping, prototyping, and evaluating LLM-powered features. Discover how changing your mindset from deterministic to probabilistic outputs requires a fundamental shift in UI/UX design.",
        readTime: "8 min",
        href: "/articles/shipping-with-llms",
    },
    {
        title: "Discovery Debt: The Hidden Cost of Guessing",
        date: "Dec 2024",
        category: "Discovery",
        teaser: "How skipping weekly customer touchpoints compounds into strategic misalignment. Learn about the early warning signs of discovery debt and specific recurring events to establish within your product teams.",
        readTime: "5 min",
        href: "/articles/discovery-debt",
    },
    {
        title: "Platform Thinking for PMs",
        date: "Nov 2024",
        category: "Platform",
        teaser: "How to evolve from shipping features to building systems. Internal platforms create compounding leverage — learn the mental models and metrics that matter.",
        readTime: "7 min",
        href: "/articles/platform-thinking",
    },
    {
        title: "Metrics That Actually Matter",
        date: "Oct 2024",
        category: "Growth",
        teaser: "Vanity metrics versus actionable insights. A deep dive into choosing north star metrics, guardrails, and leading indicators that drive real product decisions.",
        readTime: "6 min",
        href: "/articles/metrics-that-matter",
    },
];

export default function ArticlesPreview() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <section ref={containerRef} className="h-[300vh] relative bg-[var(--bg)]">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                {/* Background Typography */}
                <div className="absolute inset-0 flex flex-col items-center justify-center select-none pointer-events-none z-0">
                    <span className="text-[16vw] sm:text-[14vw] md:text-[12vw] lg:text-[11vw] font-display font-black uppercase tracking-tighter leading-none text-center text-[var(--text-primary)] opacity-[0.12] dark:opacity-[0.06] transition-all duration-300">
                        Article
                    </span>
                    <span className="text-[16vw] sm:text-[14vw] md:text-[12vw] lg:text-[11vw] font-display font-black uppercase tracking-tighter leading-none text-center text-[var(--text-primary)] opacity-[0.12] dark:opacity-[0.06] transition-all duration-300">
                        Corner
                    </span>
                </div>

                {/* 3D Paper Clip Stack */}
                <div
                    className="relative w-[210px] h-[290px] sm:w-[260px] sm:h-[360px] md:w-[400px] md:h-[550px]"
                    style={{ perspective: "2000px" }}
                >
                    {/* Binder Clip at top center */}
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-[100] pointer-events-none">
                        <div className="relative w-14 h-7 bg-gradient-to-b from-[#3a3a3a] to-[#1a1a1a] rounded-t-md shadow-[0_4px_12px_rgba(0,0,0,0.4)] border border-white/10">
                            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-t-md" />
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-3 bg-[var(--bg)] rounded-t-sm" />
                        </div>
                        <div className="absolute -left-3 top-1 w-3 h-10 bg-gradient-to-b from-[#666] to-[#444] rounded-l-sm shadow-md origin-top-right rotate-[8deg]" />
                        <div className="absolute -right-3 top-1 w-3 h-10 bg-gradient-to-b from-[#666] to-[#444] rounded-r-sm shadow-md origin-top-left -rotate-[8deg]" />
                    </div>

                    {/* Paper stack edge hints */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute -bottom-1 left-1 right-1 h-full bg-[#f4f4f2] dark:bg-[#2a2a2a] border border-gray-200 dark:border-white/10 rounded-sm shadow-sm" />
                        <div className="absolute -bottom-2 left-2 right-2 h-full bg-[#efefe9] dark:bg-[#252525] border border-gray-200 dark:border-white/10 rounded-sm shadow-sm" />
                        <div className="absolute -bottom-3 left-3 right-3 h-full bg-[#e9e9e3] dark:bg-[#202020] border border-gray-200 dark:border-white/10 rounded-sm shadow-sm" />
                    </div>

                    {/* Shadow base */}
                    <div className="absolute inset-x-4 -bottom-6 h-10 bg-black/20 dark:bg-black/40 blur-xl rounded-[100%] z-0" />

                    {/* Back cover */}
                    <div className="absolute inset-0 rounded-sm border border-[var(--border)] bg-[#f0f0ec] dark:bg-[#1a1a1a] shadow-[inset_-10px_0_40px_rgba(0,0,0,0.08)] dark:shadow-[inset_-10px_0_40px_rgba(0,0,0,0.8)] z-[1] flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/10 dark:from-black/80 to-transparent" />
                        <span className="text-gray-300 dark:text-white/10 font-serif italic text-2xl">fin.</span>
                    </div>

                    {/* Article Pages */}
                    {articles.map((article, i) => {
                        const pageCount = articles.length;
                        const start = i * (1 / pageCount);
                        const end = start + (1 / pageCount);

                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const rotateY = useTransform(
                            scrollYProgress,
                            [start, end],
                            [0, -180]
                        );

                        // Z-index: stays high until past midpoint, then drops behind
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const zIndex = useTransform(
                            scrollYProgress,
                            [start, start + (0.5 / pageCount), end],
                            [pageCount - i + 10, pageCount - i + 10, i + 2]
                        );

                        return (
                            <motion.div
                                key={article.title}
                                className="absolute inset-0 origin-left cursor-pointer group"
                                style={{
                                    rotateY,
                                    zIndex,
                                    transformStyle: "preserve-3d",
                                }}
                            >
                                {/* ─── Front Face: Paper Document ─── */}
                                <div
                                    className="absolute inset-0 rounded-sm overflow-hidden"
                                    style={{
                                        backfaceVisibility: "hidden",
                                        background: "linear-gradient(135deg, #fefefe 0%, #f9f9f6 50%, #f5f5f0 100%)",
                                        boxShadow: "-6px 3px 20px rgba(0,0,0,0.18), 0 1px 4px rgba(0,0,0,0.08)",
                                    }}
                                >
                                    {/* Paper ruled lines */}
                                    <div
                                        className="absolute inset-0 opacity-[0.07] pointer-events-none"
                                        style={{
                                            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 23px, #94a3b8 23px, #94a3b8 24px)",
                                            backgroundPosition: "0 60px",
                                        }}
                                    />

                                    {/* Left margin line */}
                                    <div className="absolute top-0 bottom-0 left-[38px] sm:left-[46px] md:left-[52px] w-[1px] bg-red-300/30 pointer-events-none z-10" />

                                    {/* Spine shadow */}
                                    <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/[0.06] to-transparent z-10 pointer-events-none" />

                                    {/* Paperclip icon */}
                                    <div className="absolute -top-1 sm:-top-2 right-4 sm:right-6 z-20 text-gray-400 drop-shadow-sm rotate-12">
                                        <Paperclip className="w-5 h-5 sm:w-7 sm:h-7" />
                                    </div>

                                    {/* Page number */}
                                    <div className="absolute top-3 sm:top-4 right-4 sm:right-5 z-10 text-[8px] sm:text-[10px] text-gray-300 font-mono">
                                        {String(i + 1).padStart(2, "0")}/{String(pageCount).padStart(2, "0")}
                                    </div>

                                    {/* Article Content */}
                                    <Link href={article.href} className="absolute inset-0 p-4 pl-[46px] sm:p-5 sm:pl-[56px] md:p-8 md:pl-[72px] pt-8 sm:pt-10 flex flex-col justify-start text-gray-800 z-10">
                                        <div className="flex justify-between items-start border-b border-gray-200 pb-2 sm:pb-3 mb-3 sm:mb-4">
                                            <div>
                                                <span className="text-[8px] sm:text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">
                                                    {article.category}
                                                </span>
                                                <div className="mt-1 flex items-center gap-1.5 sm:gap-2 text-[8px] sm:text-[10px] text-gray-300 font-mono">
                                                    <span>{article.date}</span>
                                                    <span>·</span>
                                                    <span>{article.readTime}</span>
                                                </div>
                                            </div>
                                            <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300 group-hover:text-primary transition-colors duration-300" />
                                        </div>

                                        <h3 className="text-sm sm:text-base md:text-xl font-serif font-bold leading-snug tracking-tight mb-2 sm:mb-4 text-gray-800 group-hover:text-primary transition-colors duration-300">
                                            {article.title}
                                        </h3>

                                        <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-500 leading-relaxed font-serif line-clamp-4 sm:line-clamp-5 md:line-clamp-6 mb-auto">
                                            {article.teaser}
                                        </p>

                                        <div className="mt-2 sm:mt-4 flex items-center gap-1 sm:gap-1.5 text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-gray-400 group-hover:text-primary transition-colors duration-300">
                                            <FileText className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                            Read Article
                                            <ArrowUpRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </div>
                                    </Link>

                                    {/* Right edge thickness strip */}
                                    <div
                                        className="absolute inset-y-0 right-0 w-[3px] pointer-events-none z-30"
                                        style={{
                                            background: "linear-gradient(to right, #e8e4dc, #f5f0e8, #e8e4dc)",
                                            boxShadow: "-1px 0 2px rgba(0,0,0,0.1)",
                                        }}
                                    />

                                    {/* Inner border */}
                                    <div className="absolute inset-0 border border-gray-200/60 rounded-sm pointer-events-none z-20" />

                                    {/* Dynamic shadow during mid-turn */}
                                    <motion.div
                                        className="absolute inset-0 pointer-events-none z-[15]"
                                        style={{
                                            background: useTransform(
                                                scrollYProgress,
                                                [start, start + (0.4 / pageCount), start + (0.5 / pageCount)],
                                                [
                                                    "linear-gradient(to left, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%)",
                                                    "linear-gradient(to left, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 50%)",
                                                    "linear-gradient(to left, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%)",
                                                ]
                                            ),
                                        }}
                                    />
                                </div>

                                {/* ─── Back Face: Paper Back ─── */}
                                <div
                                    className="absolute inset-0 rounded-sm overflow-hidden"
                                    style={{
                                        backfaceVisibility: "hidden",
                                        transform: "rotateY(180deg)",
                                        background: "linear-gradient(135deg, #f3f1ec 0%, #ebe8e0 50%, #e5e2da 100%)",
                                        boxShadow: "inset 10px 0 30px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.08)",
                                    }}
                                >
                                    {/* Crease/Spine shading on back */}
                                    <div className="absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-black/[0.06] to-transparent z-10 pointer-events-none" />

                                    {/* Paper line texture */}
                                    <div
                                        className="absolute inset-0 opacity-30 mix-blend-multiply pointer-events-none"
                                        style={{
                                            backgroundImage: "linear-gradient(to right, #ccc 1px, transparent 1px)",
                                            backgroundSize: "4px 100%",
                                        }}
                                    />

                                    {/* Left edge thickness on back */}
                                    <div
                                        className="absolute inset-y-0 left-0 w-[3px] pointer-events-none z-30"
                                        style={{
                                            background: "linear-gradient(to left, #e0dcd4, #f0ece4, #e0dcd4)",
                                            boxShadow: "1px 0 2px rgba(0,0,0,0.1)",
                                        }}
                                    />

                                    {/* Shadow from the turning page */}
                                    <div
                                        className="absolute inset-y-0 left-0 w-16 pointer-events-none z-20"
                                        style={{ background: "linear-gradient(to right, rgba(0,0,0,0.08) 0%, transparent 100%)" }}
                                    />

                                    {/* Back content */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                                        <FileText className="w-8 h-8 text-gray-300 mb-4" />
                                        <span className="text-xs text-gray-400 font-serif italic max-w-[200px] leading-relaxed">
                                            &ldquo;{article.title}&rdquo;
                                        </span>
                                    </div>
                                </div>

                                {/* Bottom edge — simulates paper thickness */}
                                <div
                                    className="absolute bottom-0 left-0 right-0 h-[3px] origin-bottom"
                                    style={{
                                        transform: "rotateX(-90deg)",
                                        background: "linear-gradient(to bottom, #ebe7df, #d8d4cc)",
                                        borderRadius: "0 0 2px 2px",
                                    }}
                                />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
