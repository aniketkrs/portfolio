"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from "lucide-react";

const footerLinks = {
    Navigation: [
        { label: "Home", href: "/" },
        { label: "Work", href: "/work" },
        { label: "AI Playground", href: "/ai" },
        { label: "Writing", href: "/articles" },
        { label: "Bookshelf", href: "/bookshelf" },
        { label: "About", href: "/about" },
        { label: "Tools", href: "/tools" },
        { label: "Achievements", href: "/achievements" },
    ],
    Connect: [
        { label: "Email", href: "mailto:hello@alexmorgan.pm", external: true },
        { label: "LinkedIn", href: "https://linkedin.com/in/alexmorgan", external: true },
        { label: "Twitter / X", href: "https://twitter.com/alexmorgan_pm", external: true },
        { label: "GitHub", href: "https://github.com/alexmorgan", external: true },
        { label: "Book a call", href: "https://cal.com/alexmorgan", external: true },
    ],
};

const socialLinks = [
    { href: "https://github.com/alexmorgan", label: "GitHub", icon: Github },
    { href: "https://linkedin.com/in/alexmorgan", label: "LinkedIn", icon: Linkedin },
    { href: "https://twitter.com/alexmorgan_pm", label: "Twitter", icon: Twitter },
    { href: "mailto:hello@alexmorgan.pm", label: "Email", icon: Mail },
];

export default function Footer() {
    return (
        <footer
            className="border-t"
            style={{ borderColor: "var(--border)", background: "var(--bg-surface)" }}
            role="contentinfo"
        >
            <div className="max-w-6xl mx-auto px-6 py-16">
                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="md:col-span-2">
                        <div className="text-display-lg font-display mb-4">
                            <span style={{ color: "var(--accent)" }}>Alex</span> Morgan
                        </div>
                        <p className="text-body-md mb-6 max-w-sm" style={{ color: "var(--text-secondary)" }}>
                            Senior Product Manager. I ship AI products, grow platforms, and build things people love to use.
                        </p>
                        <div className="flex items-center gap-2">
                            <span className="live-dot" aria-hidden="true" />
                            <span className="text-body-sm" style={{ color: "var(--teal)" }}>
                                Open to new opportunities
                            </span>
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <div className="text-label mb-5">{title}</div>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            target={"external" in link && link.external ? "_blank" : undefined}
                                            rel={"external" in link && link.external ? "noopener noreferrer" : undefined}
                                            className="flex items-center gap-1 text-body-sm transition-colors duration-200 hover:text-text-primary"
                                            style={{ color: "var(--text-secondary)" }}
                                        >
                                            {link.label}
                                            {"external" in link && link.external && (
                                                <ArrowUpRight size={12} aria-hidden="true" />
                                            )}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div
                    className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t"
                    style={{ borderColor: "var(--border)" }}
                >
                    <p className="text-body-sm" style={{ color: "var(--text-muted)" }}>
                        © {new Date().getFullYear()} Alex Morgan. Built with Next.js & love.
                    </p>

                    {/* Social Icons */}
                    <div className="flex items-center gap-3">
                        {socialLinks.map(({ href, label, icon: Icon }) => (
                            <a
                                key={href}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="p-2 rounded-full transition-all duration-200"
                                style={{ color: "var(--text-muted)", border: "1px solid var(--border)" }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                                    (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                                }}
                            >
                                <Icon size={16} aria-hidden="true" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
