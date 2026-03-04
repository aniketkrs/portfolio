"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TextRevealProps {
    text: string;
    className?: string;
    as?: keyof JSX.IntrinsicElements;
    stagger?: number;
    delay?: number;
    mode?: "words" | "chars" | "lines";
    once?: boolean;
}

export default function TextReveal({
    text,
    className = "",
    as: Tag = "div",
    stagger = 0.04,
    delay = 0,
    mode = "words",
    once = true,
}: TextRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once, margin: "-60px" });

    const tokens = mode === "chars"
        ? text.split("")
        : text.split(" ").map((w, i, a) => i < a.length - 1 ? w + " " : w);

    const container = {
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
    };
    const item = {
        hidden: { opacity: 0, y: "110%", clipPath: "inset(0 0 100% 0)" },
        visible: {
            opacity: 1,
            y: "0%",
            clipPath: "inset(0 0 0% 0)",
            transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
        },
    };

    return (
        <motion.div
            ref={ref}
            variants={container}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            aria-label={text}
        >
            {/* @ts-ignore */}
            <Tag className={className} aria-hidden="true">
                {tokens.map((token, i) => (
                    <span
                        key={i}
                        style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}
                    >
                        <motion.span
                            variants={item}
                            style={{ display: "inline-block", whiteSpace: "pre" }}
                        >
                            {token}
                        </motion.span>
                    </span>
                ))}
            </Tag>
        </motion.div>
    );
}
