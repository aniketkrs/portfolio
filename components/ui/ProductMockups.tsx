"use client";

import { motion } from "framer-motion";
import { Monitor, Smartphone, Tablet, ImageIcon } from "lucide-react";

interface ProductMockupsProps {
    title: string;
}

export default function ProductMockups({ title }: ProductMockupsProps) {
    const mockups = [
        {
            device: "Desktop",
            icon: Monitor,
            aspect: "16/10",
            width: "100%",
        },
        {
            device: "Mobile",
            icon: Smartphone,
            aspect: "9/19",
            width: "auto",
        },
        {
            device: "Tablet",
            icon: Tablet,
            aspect: "4/3",
            width: "auto",
        },
    ];

    return (
        <section className="mb-16" aria-labelledby="product-mockups">
            <div className="text-label mb-2">Product Visuals</div>
            <h2 id="product-mockups" className="text-heading-xl font-heading mb-6">
                How it looks in the wild
            </h2>
            <p className="text-body-md mb-8 max-w-2xl" style={{ color: "var(--text-secondary)" }}>
                Product UI across devices — showing the core flows and key screens.
            </p>

            {/* Desktop Mockup */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-6"
            >
                <div
                    className="rounded-xl overflow-hidden"
                    style={{
                        background: "rgba(var(--bg-surface-rgb, 30,30,30), 0.5)",
                        border: "1px solid rgba(255,255,255,0.08)",
                    }}
                >
                    {/* Browser chrome */}
                    <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500/40" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
                            <div className="w-3 h-3 rounded-full bg-green-500/40" />
                        </div>
                        <div className="flex-1 mx-8">
                            <div
                                className="h-6 rounded-md flex items-center justify-center text-[10px] text-[var(--text-muted)]"
                                style={{
                                    background: "rgba(255,255,255,0.05)",
                                    border: "1px solid rgba(255,255,255,0.04)",
                                }}
                            >
                                {title.toLowerCase().replace(/\s+/g, "-")}.app
                            </div>
                        </div>
                    </div>

                    {/* Screen content */}
                    <div
                        className="relative flex items-center justify-center"
                        style={{
                            aspectRatio: "16/10",
                            background: "linear-gradient(135deg, rgba(242,105,13,0.03), rgba(168,85,247,0.03))",
                        }}
                    >
                        <div className="flex flex-col items-center gap-3 text-center">
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                                <ImageIcon className="w-6 h-6 text-primary/40" />
                            </div>
                            <span className="text-sm text-[var(--text-muted)]">Desktop View — {title}</span>
                            <span className="text-[10px] text-[var(--text-muted)]">Product screenshot would appear here</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Mobile + Tablet */}
            <div className="grid grid-cols-2 gap-4">
                {mockups.slice(1).map((mock, i) => {
                    const Icon = mock.icon;
                    return (
                        <motion.div
                            key={mock.device}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15, duration: 0.6 }}
                        >
                            <div
                                className="rounded-xl overflow-hidden"
                                style={{
                                    background: "rgba(var(--bg-surface-rgb, 30,30,30), 0.5)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                }}
                            >
                                {/* Device header */}
                                <div
                                    className="flex items-center gap-2 px-3 py-2 text-[10px] font-medium text-[var(--text-muted)]"
                                    style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                                >
                                    <Icon className="w-3 h-3" />
                                    {mock.device}
                                </div>

                                {/* Screen */}
                                <div
                                    className="relative flex items-center justify-center"
                                    style={{
                                        aspectRatio: mock.aspect,
                                        maxHeight: "400px",
                                        background: "linear-gradient(180deg, rgba(242,105,13,0.02), rgba(168,85,247,0.02))",
                                    }}
                                >
                                    <div className="flex flex-col items-center gap-2 text-center p-4">
                                        <ImageIcon className="w-5 h-5 text-primary/30" />
                                        <span className="text-[10px] text-[var(--text-muted)]">{mock.device} View</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
