"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Link from "next/link";

export default function Navbar() {
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const prev = scrollY.getPrevious() ?? 0;
        setHidden(latest > prev && latest > 200);
        setScrolled(latest > 40);
    });

    return (
        <AnimatePresence>
            <motion.header
                initial={{ y: 0 }}
                animate={{ y: hidden ? -100 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 35 }}
                className={`fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-6 lg:px-12 h-14 transition-all duration-300 ${scrolled
                        ? "frosted-glass border-b border-[var(--border)]"
                        : "bg-transparent"
                    }`}
            >
                {/* Left: Logo */}
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse-orange" />
                    <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[var(--text-primary)] group-hover:text-primary transition-colors">
                        ANIKET
                    </span>
                </Link>

                {/* Right: Theme + Status */}
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <div className="hidden md:flex items-center gap-2 text-[10px] font-mono tracking-wider text-[var(--text-muted)] uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Available
                    </div>
                </div>
            </motion.header>
        </AnimatePresence>
    );
}
