"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Monitor } from "lucide-react";

const themes = [
    { key: "light", icon: Sun, label: "Light" },
    { key: "dark", icon: Moon, label: "Dark" },
    { key: "system", icon: Monitor, label: "System" },
] as const;

function getCurrentIcon(theme: string | undefined) {
    switch (theme) {
        case "light":
            return Sun;
        case "dark":
            return Moon;
        default:
            return Monitor;
    }
}

interface ThemeToggleProps {
    expanded?: boolean;
    onExpandChange?: (expanded: boolean) => void;
}

export default function ThemeToggle({ expanded: externalExpanded, onExpandChange }: ThemeToggleProps = {}) {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [internalExpanded, setInternalExpanded] = useState(false);
    const expanded = externalExpanded !== undefined ? externalExpanded : internalExpanded;
    const setExpanded = onExpandChange || setInternalExpanded;
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => setMounted(true), []);

    // Close on outside click
    useEffect(() => {
        if (!expanded) return;
        const handler = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setExpanded(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [expanded]);

    if (!mounted) return <div className="w-11 h-11 rounded-full" />;

    const isDark = resolvedTheme === "dark";
    const CurrentIcon = getCurrentIcon(theme);

    return (
        <div ref={containerRef} className="relative">
            <AnimatePresence mode="wait">
                {!expanded ? (
                    /* ── Collapsed: Round Button ── */
                    <motion.button
                        key="collapsed"
                        onClick={() => setExpanded(true)}
                        className="relative flex items-center justify-center rounded-full overflow-hidden"
                        style={{
                            width: 44,
                            height: 44,
                            background: "linear-gradient(135deg, #f2690d 0%, #e85d04 50%, #dc4f00 100%)",
                            boxShadow: "0 4px 20px rgba(242, 105, 13, 0.4), 0 0 0 2px rgba(242, 105, 13, 0.15)",
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.92 }}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        aria-label="Open theme switcher"
                    >
                        {/* Subtle inner glow */}
                        <div
                            className="absolute inset-0 rounded-full"
                            style={{
                                background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25), transparent 60%)",
                            }}
                        />
                        <CurrentIcon
                            size={18}
                            strokeWidth={2}
                            className="relative z-10 text-white drop-shadow-sm"
                        />
                    </motion.button>
                ) : (
                    /* ── Expanded: Theme Options Pill ── */
                    <motion.div
                        key="expanded"
                        className="flex items-center gap-1 rounded-full overflow-hidden"
                        style={{
                            padding: "4px",
                            height: 44,
                            background: isDark
                                ? "rgba(15, 15, 18, 0.85)"
                                : "rgba(255, 255, 255, 0.9)",
                            backdropFilter: "blur(40px) saturate(200%)",
                            WebkitBackdropFilter: "blur(40px) saturate(200%)",
                            border: isDark
                                ? "1px solid rgba(255,255,255,0.12)"
                                : "1px solid rgba(0,0,0,0.08)",
                            boxShadow: isDark
                                ? "0 8px 40px rgba(0,0,0,0.6), inset 0 0.5px 0 rgba(255,255,255,0.1)"
                                : "0 8px 40px rgba(0,0,0,0.12), inset 0 0.5px 0 rgba(255,255,255,0.8)",
                        }}
                        initial={{ width: 44, opacity: 0.8 }}
                        animate={{ width: "auto", opacity: 1 }}
                        exit={{ width: 44, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 28 }}
                    >
                        {themes.map(({ key, icon: Icon, label }) => {
                            const isActive = theme === key;
                            return (
                                <motion.button
                                    key={key}
                                    onClick={() => {
                                        setTheme(key);
                                        setExpanded(false);
                                    }}
                                    className="relative flex items-center gap-1.5 rounded-full transition-colors duration-200"
                                    style={{
                                        padding: "8px 14px",
                                        color: isActive
                                            ? "#fff"
                                            : isDark
                                                ? "rgba(255,255,255,0.4)"
                                                : "rgba(0,0,0,0.4)",
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: themes.indexOf({ key, icon: Icon, label } as any) * 0.05 + 0.1 }}
                                    aria-label={`Switch to ${label} theme`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="theme-bubble"
                                            className="absolute inset-0 rounded-full"
                                            style={{
                                                background: "linear-gradient(135deg, #f2690d 0%, #e85d04 50%, #dc4f00 100%)",
                                                boxShadow: "0 2px 12px rgba(242, 105, 13, 0.35)",
                                            }}
                                            transition={{ type: "spring", stiffness: 400, damping: 28 }}
                                        />
                                    )}
                                    <Icon
                                        size={14}
                                        strokeWidth={isActive ? 2 : 1.5}
                                        className="relative z-10"
                                    />
                                    <span className="relative z-10 text-[11px] font-semibold tracking-wide">
                                        {label}
                                    </span>
                                </motion.button>
                            );
                        })}

                        {/* Close / collapse button */}
                        <motion.button
                            onClick={() => setExpanded(false)}
                            className="flex items-center justify-center rounded-full ml-0.5"
                            style={{
                                width: 36,
                                height: 36,
                                background: "linear-gradient(135deg, #f2690d 0%, #dc4f00 100%)",
                                boxShadow: "0 2px 12px rgba(242, 105, 13, 0.3)",
                            }}
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label="Close theme switcher"
                        >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-white">
                                <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
