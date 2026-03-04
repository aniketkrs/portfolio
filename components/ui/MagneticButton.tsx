"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    strength?: number;
    as?: "button" | "a";
    href?: string;
    onClick?: () => void;
    [key: string]: any;
}

export default function MagneticButton({
    children,
    className = "",
    strength = 0.35,
    as: Tag = "button",
    href,
    onClick,
    ...rest
}: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 280, damping: 18, mass: 0.6 });
    const sy = useSpring(y, { stiffness: 280, damping: 18, mass: 0.6 });

    // Inner content shifts more than outer for a "jelly" feel
    const innerX = useTransform(sx, v => v * 0.5);
    const innerY = useTransform(sy, v => v * 0.5);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const handleMove = (e: MouseEvent) => {
            const { left, top, width, height } = el.getBoundingClientRect();
            const cx = left + width / 2;
            const cy = top + height / 2;
            x.set((e.clientX - cx) * strength);
            y.set((e.clientY - cy) * strength);
        };

        const handleLeave = () => {
            x.set(0);
            y.set(0);
        };

        el.addEventListener("mousemove", handleMove);
        el.addEventListener("mouseleave", handleLeave);
        return () => {
            el.removeEventListener("mousemove", handleMove);
            el.removeEventListener("mouseleave", handleLeave);
        };
    }, [x, y, strength]);

    const props: any = {
        className,
        onClick,
        ...rest,
    };
    if (Tag === "a" && href) props.href = href;

    return (
        <motion.div ref={ref} style={{ x: sx, y: sy, display: "inline-block" }}>
            <motion.div style={{ x: innerX, y: innerY }}>
                <Tag {...props}>{children}</Tag>
            </motion.div>
        </motion.div>
    );
}
