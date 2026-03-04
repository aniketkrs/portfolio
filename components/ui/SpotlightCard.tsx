"use client";

import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
    children: React.ReactNode;
    className?: string;
    dark?: boolean;
    href?: string;
    as?: "div" | "a";
}

export default function SpotlightCard({
    children,
    className = "",
    dark = false,
    href,
    as: Tag = "div",
}: SpotlightCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
    const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

    // Radial gradient origin as % of the card
    const gradientX = useTransform(springX, (v) => `${v}px`);
    const gradientY = useTransform(springY, (v) => `${v}px`);

    const opacity = useMotionValue(0);
    const smoothOpacity = useSpring(opacity, { stiffness: 200, damping: 22 });

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
        opacity.set(1);
    }, [mouseX, mouseY, opacity]);

    const handleMouseLeave = useCallback(() => {
        opacity.set(0);
    }, [opacity]);

    const lightColor = dark
        ? "rgba(203,255,77,0.06)"
        : "rgba(17,17,17,0.05)";
    const lightSize = dark ? "200px" : "260px";

    const baseClass = dark ? "card-dark" : "card";

    const props: any = {
        href,
        className: cn(baseClass, "relative overflow-hidden", className),
        ref,
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
    };

    return (
        <div ref={ref} className={cn(baseClass, "relative overflow-hidden group", className)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Spotlight radial glow */}
            <motion.div
                aria-hidden="true"
                style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    opacity: smoothOpacity,
                    background: `radial-gradient(${lightSize} circle at ${gradientX} ${gradientY}, ${dark ? "rgba(203,255,77,0.07)" : "rgba(17,17,17,0.04)"} 0%, transparent 70%)`,
                    zIndex: 0,
                    borderRadius: "inherit",
                    transition: "opacity 120ms ease",
                }}
            />
            {/* Subtle border highlight on hover */}
            <motion.div
                aria-hidden="true"
                style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    opacity: smoothOpacity,
                    borderRadius: "inherit",
                    background: `radial-gradient(${lightSize} circle at ${gradientX} ${gradientY}, ${dark ? "rgba(203,255,77,0.15)" : "rgba(17,17,17,0.08)"} 0%, transparent 60%)`,
                    zIndex: 0,
                    maskImage: "linear-gradient(to bottom, transparent 70%, transparent)",
                    WebkitMaskImage: "linear-gradient(to bottom, transparent, transparent)",
                    boxShadow: dark ? "inset 0 0 0 1px rgba(203,255,77,0.08)" : "inset 0 0 0 1px rgba(17,17,17,0.06)",
                }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
                {children}
            </div>
        </div>
    );
}
