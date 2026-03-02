"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const companies = [
    { name: "Google", logo: "G" },
    { name: "Stripe", logo: "S" },
    { name: "Figma", logo: "F" },
    { name: "Notion", logo: "N" },
    { name: "Linear", logo: "L" },
    { name: "Vercel", logo: "V" },
    { name: "Anthropic", logo: "A" },
    { name: "OpenAI", logo: "O" },
];

export default function CompanyLogos() {
    return (
        <section className="py-16 overflow-hidden" aria-label="Companies worked with">
            <div className="max-w-6xl mx-auto px-6">
                <p className="text-center text-label mb-8">Shipped products at</p>
                <div className="flex flex-wrap justify-center items-center gap-8 opacity-40">
                    {companies.map((c) => (
                        <div
                            key={c.name}
                            className="flex items-center gap-2 text-xl font-bold font-heading"
                            style={{ color: "var(--text-secondary)" }}
                            aria-label={c.name}
                        >
                            <span
                                className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black"
                                style={{
                                    background: "var(--bg-card)",
                                    border: "1px solid var(--border)",
                                    color: "var(--accent)",
                                }}
                                aria-hidden="true"
                            >
                                {c.logo}
                            </span>
                            {c.name}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
