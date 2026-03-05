"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Mail, MapPin, Calendar } from "lucide-react";

export default function Contact() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} data-section="contact" className="px-5 md:px-8 lg:px-16 py-16 md:py-20 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6"
            >
                {/* Email Card */}
                <a
                    href="mailto:hello@aniket.pm"
                    className="bento-card p-8 flex flex-col justify-between min-h-[200px] group"
                >
                    <div className="flex items-center justify-between">
                        <Mail className="w-5 h-5 text-primary" />
                        <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-2">
                            Say Hello
                        </p>
                        <p className="text-lg font-bold tracking-tight">
                            hello@aniket.pm
                        </p>
                    </div>
                </a>

                {/* Location Card */}
                <div className="bento-card p-8 flex flex-col justify-between min-h-[200px]">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-2">
                            Based In
                        </p>
                        <p className="text-lg font-bold tracking-tight">
                            India &middot; Remote
                        </p>
                    </div>
                </div>

                {/* Availability Card */}
                <div className="bento-card p-8 flex flex-col justify-between min-h-[200px]">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        <span className="flex h-2 w-2">
                            <span className="animate-pulse-orange absolute inline-flex h-2 w-2 rounded-full bg-primary opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                        </span>
                    </div>
                    <div>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-2">
                            Availability
                        </p>
                        <p className="text-lg font-bold tracking-tight">
                            Open for Q2 2026
                        </p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
