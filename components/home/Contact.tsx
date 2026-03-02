"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Calendar, ArrowRight } from "lucide-react";

export default function Contact() {
    return (
        <section
            className="section-container"
            id="contact"
            aria-labelledby="contact-heading"
        >
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="card text-center p-12 md:p-20 relative overflow-hidden"
            >
                {/* Background glow */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    aria-hidden="true"
                    style={{
                        background: "radial-gradient(ellipse 600px 300px at 50% 50%, rgba(232,168,56,0.04) 0%, transparent 70%)",
                    }}
                />

                <div className="relative z-10">
                    <div className="text-label mb-4">Let's work together</div>
                    <h2 id="contact-heading" className="text-display-lg font-display mb-4">
                        Got a hard problem?
                    </h2>
                    <p className="text-body-lg max-w-xl mx-auto mb-10" style={{ color: "var(--text-secondary)" }}>
                        I'm currently open to Senior PM and Group PM roles. If you're building something
                        ambitious — in AI, platform, or consumer — let's talk.
                    </p>

                    <div className="flex flex-wrap justify-center gap-3">
                        <a href="mailto:hello@alexmorgan.pm" className="btn-primary">
                            <Mail size={16} aria-hidden="true" />
                            Send an email
                        </a>
                        <a
                            href="https://cal.com/alexmorgan"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary"
                        >
                            <Calendar size={16} aria-hidden="true" />
                            Book a 30-min call
                        </a>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
