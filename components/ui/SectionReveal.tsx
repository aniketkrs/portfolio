"use client";

import { useRef, CSSProperties } from "react";
import { motion, useInView, Variants } from "framer-motion";

interface SectionRevealProps {
    children: React.ReactNode;
    className?: string;
    stagger?: number;
    delay?: number;
    y?: number;
    once?: boolean;
    style?: CSSProperties;
}

const containerVariants = (stagger: number, delay: number): Variants => ({
    hidden: {},
    visible: {
        transition: { staggerChildren: stagger, delayChildren: delay },
    },
});

const itemVariants = (y: number): Variants => ({
    hidden: { opacity: 0, y, filter: "blur(4px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
});

export function SectionReveal({
    children,
    className = "",
    stagger = 0.1,
    delay = 0,
    y = 24,
    once = true,
    style,
}: SectionRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once, margin: "-80px" });

    return (
        <motion.div
            ref={ref}
            className={className}
            style={style}
            variants={containerVariants(stagger, delay)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
        >
            {children}
        </motion.div>
    );
}

export function RevealItem({
    children,
    className = "",
    y = 24,
}: {
    children: React.ReactNode;
    className?: string;
    y?: number;
}) {
    return (
        <motion.div className={className} variants={itemVariants(y)}>
            {children}
        </motion.div>
    );
}
