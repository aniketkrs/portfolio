"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
    target: number | string;
    duration?: number;
    prefix?: string;
    suffix?: string;
    className?: string;
}

function parseTarget(value: number | string): { num: number; prefix: string; suffix: string } {
    if (typeof value === "number") return { num: value, prefix: "", suffix: "" };
    const match = String(value).match(/^([^0-9\-.]*)([0-9.,]+)(.*)$/);
    if (!match) return { num: 0, prefix: "", suffix: String(value) };
    return {
        prefix: match[1],
        num: parseFloat(match[2].replace(/,/g, "")),
        suffix: match[3],
    };
}

export default function AnimatedCounter({
    target,
    duration = 1800,
    prefix = "",
    suffix = "",
    className = "",
}: AnimatedCounterProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [display, setDisplay] = useState("0");
    const hasStarted = useRef(false);

    const parsed = parseTarget(target);
    const finalPrefix = prefix || parsed.prefix;
    const finalSuffix = suffix || parsed.suffix;
    const finalNum = parsed.num;

    const decimal = String(finalNum).includes(".") ? 1 : 0;

    useEffect(() => {
        if (!isInView || hasStarted.current) return;
        hasStarted.current = true;

        const start = performance.now();

        // easeOutQuart
        const ease = (t: number) => 1 - Math.pow(1 - t, 4);

        const frame = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const current = finalNum * ease(progress);

            setDisplay(
                decimal > 0
                    ? current.toFixed(decimal)
                    : Math.floor(current).toLocaleString()
            );

            if (progress < 1) requestAnimationFrame(frame);
            else setDisplay(decimal > 0 ? finalNum.toFixed(decimal) : finalNum.toLocaleString());
        };

        requestAnimationFrame(frame);
    }, [isInView, finalNum, duration, decimal]);

    return (
        <span ref={ref} className={className} aria-label={`${finalPrefix}${finalNum}${finalSuffix}`}>
            {finalPrefix}{display}{finalSuffix}
        </span>
    );
}
