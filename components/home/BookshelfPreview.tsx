"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Star, ChevronRight, BookMarked } from "lucide-react";
import { books } from "@/data/content";
import Link from "next/link";

export default function BookshelfPreview() {
    const displayBooks = books.slice(0, 4);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section data-section="bookshelf" className="px-5 md:px-8 lg:px-16 max-w-7xl mx-auto py-20 md:py-28">
            {/* Header */}
            <div className="flex items-center justify-between mb-10">
                <div>
                    <div className="flex items-center gap-3 mb-3">
                        <BookMarked className="w-4 h-4 text-primary" />
                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary">
                            Book Gallery
                        </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                        What I&apos;m reading
                    </h2>
                </div>
                <Link
                    href="/bookshelf"
                    className="flex items-center gap-1 text-xs font-medium text-[var(--text-muted)] hover:text-primary transition-colors duration-200"
                >
                    View All <ChevronRight className="w-3 h-3" />
                </Link>
            </div>

            {/* Books Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
                {displayBooks.map((book, i) => (
                    <motion.div
                        key={book.title}
                        className="group cursor-pointer"
                        onHoverStart={() => setHoveredIndex(i)}
                        onHoverEnd={() => setHoveredIndex(null)}
                        whileHover={{ y: -4 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        {/* Book Cover */}
                        <div
                            className="relative aspect-[3/4.5] rounded-xl overflow-hidden mb-3"
                            style={{
                                background: `linear-gradient(145deg, 
                                    hsl(${30 + i * 40}, 60%, 25%), 
                                    hsl(${50 + i * 40}, 40%, 15%))`,
                                boxShadow: hoveredIndex === i
                                    ? "0 16px 40px rgba(0,0,0,0.3), 4px 4px 0 rgba(242,105,13,0.2)"
                                    : "0 4px 16px rgba(0,0,0,0.15), 2px 2px 0 rgba(0,0,0,0.08)",
                                border: "1px solid rgba(255,255,255,0.08)",
                                transition: "box-shadow 0.4s ease",
                            }}
                        >
                            {/* Spine line */}
                            <div className="absolute left-3 top-0 bottom-0 w-px bg-white/10" />

                            {/* Book content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                                <BookOpen className="w-6 h-6 text-white/30 mb-3" />
                                <h3 className="text-white text-xs md:text-sm font-bold leading-tight mb-1">
                                    {book.title}
                                </h3>
                                <span className="text-white/40 text-[10px]">{book.author}</span>
                            </div>

                            {/* Status badge */}
                            {book.status === "reading" && (
                                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[8px] font-bold tracking-wider uppercase">
                                    Reading
                                </div>
                            )}
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-0.5 mb-1">
                            {[...Array(5)].map((_, s) => (
                                <Star
                                    key={s}
                                    className={`w-3 h-3 ${s < book.rating ? "text-primary fill-primary" : "text-[var(--text-muted)]"}`}
                                />
                            ))}
                        </div>

                        {/* Title + Author */}
                        <h4 className="text-sm font-semibold tracking-tight truncate">{book.title}</h4>
                        <p className="text-[11px] text-[var(--text-muted)] truncate">{book.author}</p>

                        {/* Takeaway */}
                        <p className="text-[10px] text-[var(--text-muted)] mt-1 line-clamp-2 leading-relaxed">
                            {book.takeaway}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
