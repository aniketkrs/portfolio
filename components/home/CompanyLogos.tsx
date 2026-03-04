"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const companies = [
    "Google", "Meta", "Apple", "Amazon", "Microsoft",
    "Netflix", "Stripe", "Shopify", "Figma", "Notion",
    "Linear", "Vercel", "OpenAI", "Anthropic",
];

export default function CompanyLogos() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <section ref={ref} className="py-16 overflow-hidden">
            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 1 }}
            >
                {/* Label */}
                <div className="text-center mb-8">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--text-muted)]">
                        Trusted by teams at
                    </span>
                </div>

                {/* Marquee */}
                <div className="marquee-fade">
                    <div className="flex marquee-track w-max">
                        {[...companies, ...companies].map((company, i) => (
                            <div
                                key={i}
                                className="flex-shrink-0 px-8 md:px-12 flex items-center"
                            >
                                <span className="text-base md:text-lg font-bold tracking-wide text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-300 whitespace-nowrap">
                                    {company}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
