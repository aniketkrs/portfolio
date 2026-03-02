"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Briefcase, Bot, FileText, Mail } from "lucide-react";

const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/work", label: "Work", icon: Briefcase },
    { href: "/ai", label: "AI", icon: Bot },
    { href: "/articles", label: "Writing", icon: FileText },
    { href: "/about#contact", label: "Contact", icon: Mail },
];

export default function BottomNav() {
    const pathname = usePathname();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.nav
                    initial={{ y: 100, opacity: 0, scale: 0.9 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50"
                    aria-label="Bottom navigation"
                >
                    <div
                        className="flex items-center gap-1 px-3 py-2 rounded-full"
                        style={{
                            background: "rgba(13,15,26,0.92)",
                            backdropFilter: "blur(20px)",
                            border: "1px solid var(--border)",
                            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                        }}
                    >
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const active = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-all duration-200"
                                    style={{
                                        color: active ? "var(--accent)" : "var(--text-muted)",
                                        background: active ? "rgba(232,168,56,0.1)" : "transparent",
                                    }}
                                    aria-current={active ? "page" : undefined}
                                >
                                    <Icon size={18} />
                                    <AnimatePresence>
                                        {active && (
                                            <motion.span
                                                initial={{ width: 0, opacity: 0 }}
                                                animate={{ width: "auto", opacity: 1 }}
                                                exit={{ width: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="overflow-hidden whitespace-nowrap"
                                            >
                                                {item.label}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </Link>
                            );
                        })}
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    );
}
