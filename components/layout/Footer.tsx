"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const socialLinks = [
    { label: "LINKEDIN", href: "#" },
    { label: "TWITTER / X", href: "#" },
    { label: "SUBSTACK", href: "#" },
    { label: "READ.CV", href: "#" },
];

export default function Footer() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <footer ref={ref} id="contact" data-section="contact" className="relative px-5 md:px-8 lg:px-16 pt-16 md:pt-24 pb-40 max-w-7xl mx-auto">
            {/* Heading */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className="mb-16"
            >
                <h2 className="text-3xl md:text-6xl lg:text-8xl font-black tracking-tighter leading-none max-w-4xl">
                    LET&apos;S BUILD THE{" "}
                    <span className="text-primary italic">NEXT BIG THING.</span>
                </h2>
            </motion.div>

            {/* Grid: Photo + Form */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                {/* Left: Intro */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="lg:col-span-5"
                >
                    <div className="rounded-3xl overflow-hidden aspect-[4/5] bg-[var(--bg-surface)] border border-[var(--border)]">
                        <div className="w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-primary/5 flex items-center justify-center">
                            <span className="text-8xl font-black text-primary/20">AK</span>
                        </div>
                    </div>
                    <p className="mt-6 text-[var(--text-muted)] text-lg max-w-md leading-relaxed">
                        Based in India. Senior Product Manager focused on scaling complex systems and building
                        intuitive human interfaces. Currently open to new challenges.
                    </p>
                </motion.div>

                {/* Right: Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="lg:col-span-6 lg:col-start-7 py-4"
                >
                    <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label className="font-mono text-primary text-xs uppercase tracking-widest block mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                className="form-input-clean text-xl md:text-2xl font-medium"
                                placeholder="Your name here"
                            />
                        </div>
                        <div>
                            <label className="font-mono text-primary text-xs uppercase tracking-widest block mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                className="form-input-clean text-xl md:text-2xl font-medium"
                                placeholder="hello@world.com"
                            />
                        </div>
                        <div>
                            <label className="font-mono text-primary text-xs uppercase tracking-widest block mb-2">
                                Project Brief
                            </label>
                            <textarea
                                className="form-input-clean text-xl md:text-2xl font-medium resize-none"
                                placeholder="Tell me about your project"
                                rows={4}
                            />
                        </div>
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="bg-primary text-white font-black uppercase text-sm tracking-widest px-10 py-5 rounded-full hover:bg-primary-light transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>

                    {/* Social Links */}
                    <div className="mt-20 pt-8 border-t border-[var(--border)] flex flex-wrap gap-8">
                        {socialLinks.map(({ label, href }) => (
                            <a
                                key={label}
                                href={href}
                                className="font-mono text-primary text-sm tracking-widest hover:text-[var(--text-primary)] transition-colors duration-300 flex items-center gap-1 group"
                            >
                                {label}
                                <ArrowUpRight
                                    size={12}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                                />
                            </a>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Bottom tag */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
                className="mt-24 text-center"
            >
                <span className="inline-block px-6 py-2 border border-[var(--border)] rounded-full font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--text-muted)]">
                    Built for high-impact product leadership &middot; &copy; 2026
                </span>
            </motion.div>

            {/* Ambient glow */}
            <div className="ambient-glow ambient-glow-primary w-[500px] h-[500px] -bottom-[20%] -right-[10%] absolute" />
        </footer>
    );
}
