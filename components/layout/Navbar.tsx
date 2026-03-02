"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/work", label: "Work" },
    { href: "/ai", label: "AI" },
    { href: "/articles", label: "Writing" },
    { href: "/about", label: "About" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handler = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handler, { passive: true });
        return () => window.removeEventListener("scroll", handler);
    }, []);

    return (
        <>
            <motion.header
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
                className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4"
                role="banner"
            >
                <nav
                    className={`flex items-center justify-between px-5 py-3 transition-all duration-300 ${open ? "rounded-2xl" : "rounded-full"
                        }`}
                    style={{
                        background: "rgba(13,15,26,0.88)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        border: "1px solid var(--border)",
                        boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.4)" : "none",
                    }}
                    aria-label="Main navigation"
                >
                    {/* Logo */}
                    <Link href="/" className="font-display text-xl font-bold text-text-primary">
                        <span style={{ color: "var(--accent)" }}>A</span>M
                    </Link>

                    {/* Desktop links */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${pathname === link.href
                                        ? "text-accent bg-accent/10"
                                        : "text-text-secondary hover:text-text-primary"
                                    }`}
                                style={
                                    pathname === link.href
                                        ? { color: "var(--accent)", background: "rgba(232,168,56,0.1)" }
                                        : {}
                                }
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right actions */}
                    <div className="flex items-center gap-2">
                        {/* Theme toggle */}
                        {mounted && (
                            <button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="p-2 rounded-full transition-colors duration-200"
                                style={{ color: "var(--text-secondary)" }}
                                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                            >
                                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                            </button>
                        )}

                        {/* Hire Me CTA */}
                        <Link href="/about#contact" className="btn-primary hidden md:inline-flex py-2 px-5 text-sm">
                            Hire Me
                        </Link>

                        {/* Mobile hamburger */}
                        <button
                            onClick={() => setOpen(!open)}
                            className="md:hidden p-2 rounded-full"
                            style={{ color: "var(--text-secondary)" }}
                            aria-label={open ? "Close menu" : "Open menu"}
                            aria-expanded={open}
                        >
                            {open ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </nav>

                {/* Mobile menu */}
                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="md:hidden mt-2 rounded-2xl overflow-hidden"
                            style={{
                                background: "rgba(13,15,26,0.95)",
                                backdropFilter: "blur(20px)",
                                border: "1px solid var(--border)",
                            }}
                        >
                            <div className="p-4 flex flex-col gap-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setOpen(false)}
                                        className="px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200"
                                        style={
                                            pathname === link.href
                                                ? { color: "var(--accent)", background: "rgba(232,168,56,0.1)" }
                                                : { color: "var(--text-secondary)" }
                                        }
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <Link
                                    href="/about#contact"
                                    onClick={() => setOpen(false)}
                                    className="btn-primary mt-2 text-center"
                                >
                                    Hire Me
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>
        </>
    );
}
