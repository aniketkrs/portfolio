"use client";

import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Home, Layers, FlaskConical, PenLine, User } from "lucide-react";
import { useTheme } from "next-themes";
import ThemeToggle from "@/components/ui/ThemeToggle";

const navItems = [
    { href: "/", icon: Home, label: "Index", sectionId: "hero" },
    { href: "/work", icon: Layers, label: "Works", sectionId: "work" },
    { href: "/ai", icon: FlaskConical, label: "Lab", sectionId: "ai-lab" },
    { href: "/articles", icon: PenLine, label: "Writing", sectionId: null },
    { href: "/about", icon: User, label: "About", sectionId: null },
];

export default function BottomNav() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState<string>("hero");
    const [mounted, setMounted] = useState(false);
    const [isThemeExpanded, setIsThemeExpanded] = useState(false);
    const { scrollY } = useScroll();
    const { resolvedTheme } = useTheme();
    const isHomePage = pathname === "/";
    const isDark = resolvedTheme === "dark";

    useEffect(() => setMounted(true), []);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 40);
    });

    // Scroll-spy
    useEffect(() => {
        if (!isHomePage) return;
        const sectionIds = ["hero", "work", "ai-lab", "github", "testimonials", "contact"];
        const observer = new IntersectionObserver(
            (entries) => {
                let maxRatio = 0;
                let maxId = "";
                entries.forEach((entry) => {
                    if (entry.intersectionRatio > maxRatio) {
                        maxRatio = entry.intersectionRatio;
                        maxId = (entry.target as HTMLElement).dataset.section || "";
                    }
                });
                if (maxId && maxRatio > 0.2) setActiveSection(maxId);
            },
            { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1.0] }
        );
        sectionIds.forEach((id) => {
            const el = document.querySelector(`[data-section="${id}"]`);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [isHomePage]);

    const getIsActive = useCallback(
        (href: string, sectionId: string | null) => {
            if (isHomePage && sectionId) return activeSection === sectionId;
            if (href === "/articles") {
                return pathname === "/articles" || pathname.startsWith("/articles/") || pathname === "/bookshelf" || pathname.startsWith("/bookshelf/");
            }
            return pathname === href || pathname.startsWith(`${href}/`);
        },
        [isHomePage, activeSection, pathname]
    );

    // Liquid glass styles — adaptive per theme
    const glassStyles = mounted
        ? {
            backgroundColor: isDark
                ? scrolled ? "rgba(15, 15, 18, 0.55)" : "rgba(15, 15, 18, 0.35)"
                : scrolled ? "rgba(255, 255, 255, 0.55)" : "rgba(255, 255, 255, 0.35)",
            backdropFilter: scrolled
                ? "blur(40px) saturate(200%) brightness(1.05)"
                : "blur(28px) saturate(170%)",
            WebkitBackdropFilter: scrolled
                ? "blur(40px) saturate(200%) brightness(1.05)"
                : "blur(28px) saturate(170%)",
            border: isDark
                ? `1px solid rgba(255, 255, 255, ${scrolled ? 0.12 : 0.06})`
                : `1px solid rgba(0, 0, 0, ${scrolled ? 0.08 : 0.04})`,
            boxShadow: isDark
                ? `0 8px 40px rgba(0,0,0,0.5), inset 0 0.5px 0 rgba(255,255,255,${scrolled ? 0.12 : 0.06}), inset 0 -0.5px 0 rgba(255,255,255,0.02)`
                : `0 8px 40px rgba(0,0,0,0.08), inset 0 0.5px 0 rgba(255,255,255,${scrolled ? 0.8 : 0.5}), inset 0 -0.5px 0 rgba(0,0,0,0.04)`,
            transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        }
        : {
            backgroundColor: "rgba(15, 15, 18, 0.5)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
            transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        };

    const textColor = mounted && !isDark ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.35)";
    const textActiveColor = mounted && !isDark ? "rgba(0,0,0,0.9)" : "#f0f0f0";
    const dividerColor = mounted && !isDark ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.08)";

    return (
        <div
            className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
            style={{ paddingBottom: `max(24px, calc(env(safe-area-inset-bottom) + 8px))` }}
        >
            <motion.nav
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.8 }}
                className="pointer-events-auto flex items-center justify-center gap-2 md:gap-3"
            >
                {/* Nav Items Container */}
                <AnimatePresence mode="wait">
                    {!isThemeExpanded && (
                        <motion.div
                            key="nav-items"
                            initial={{ opacity: 0, width: 0, scale: 0.95 }}
                            animate={{ opacity: 1, width: "auto", scale: 1 }}
                            exit={{ opacity: 0, width: 0, scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 28 }}
                            className="flex items-center gap-0.5 md:gap-1 rounded-full h-[48px] md:h-[52px] px-1.5 md:px-2 overflow-hidden whitespace-nowrap"
                            style={glassStyles}
                        >
                            {navItems.map(({ href, icon: Icon, label, sectionId }) => {
                                const isActive = getIsActive(href, sectionId);
                                return (
                                    <Link
                                        key={href}
                                        href={href}
                                        className="relative flex items-center gap-1.5 px-2.5 md:px-3 py-1.5 md:py-2 rounded-full transition-all duration-300 group"
                                        style={{
                                            color: isActive ? textActiveColor : textColor,
                                        }}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="nav-pill"
                                                className="absolute inset-0 rounded-full"
                                                style={{
                                                    backgroundColor: mounted
                                                        ? (isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)")
                                                        : "rgba(0,0,0,0.06)", // Consistent server render
                                                }}
                                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                            />
                                        )}
                                        <Icon
                                            size={15}
                                            strokeWidth={1.5}
                                            className="relative z-10 transition-colors duration-200"
                                            style={{ color: isActive ? "#f2690d" : undefined }}
                                        />
                                        <span className="relative z-10 hidden lg:inline text-[11px] font-medium tracking-wide">
                                            {label}
                                        </span>
                                    </Link>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Theme Switcher Container */}
                <div className="flex items-center h-[48px] md:h-[52px]">
                    <ThemeToggle expanded={isThemeExpanded} onExpandChange={setIsThemeExpanded} />
                </div>
            </motion.nav>
        </div>
    );
}
