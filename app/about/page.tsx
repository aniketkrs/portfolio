import type { Metadata } from "next";
import Link from "next/link";
import { Download, MapPin, Languages, BookOpen } from "lucide-react";

export const metadata: Metadata = {
    title: "About",
    description: "The story behind the senior PM — background, philosophy, and how I work.",
};

const philosophy = [
    {
        title: "Users are not data points",
        body: "Metrics tell you what happened. Users tell you why. I prioritise talking to real humans over analytics dashboards.",
    },
    {
        title: "The best spec is a question",
        body: "A well-framed problem is 70% of the solution. I'd rather spend an extra week in discovery than ship the wrong thing fast.",
    },
    {
        title: "Constraints are creative fuel",
        body: "My best product decisions came from constraints — budget, timeline, team size. Constraints force prioritisation, which forces clarity.",
    },
    {
        title: "Shipping is a skill",
        body: "Ideas are cheap. Execution is everything. I'm proudest of the features that actually launched, not the decks that didn't.",
    },
];

const quickFacts = [
    { icon: MapPin, label: "Location", value: "London, UK" },
    { icon: Languages, label: "Languages", value: "English, Spanish" },
    { icon: BookOpen, label: "Hobbies", value: "Trail running, reading, tinkering" },
];

export default function AboutPage() {
    return (
        <div className="pt-28 pb-24">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="grid md:grid-cols-2 gap-16 mb-20">
                    <div>
                        <div className="text-label mb-4">About Me</div>
                        <h1 className="text-display-xl font-display mb-6">
                            A PM who ships, not just plans
                        </h1>
                        <p className="text-body-lg mb-6" style={{ color: "var(--text-secondary)" }}>
                            I fell into product management through engineering — I was the developer who kept
                            wandering into user interviews and ignoring my backlog. After three years of being
                            the unofficial PM on my team, I made it official.
                        </p>
                        <p className="text-body-md mb-6" style={{ color: "var(--text-secondary)" }}>
                            Since then I've spent 8+ years shipping products used by millions of people —
                            from 0-to-1 consumer apps to complex B2B platforms, and more recently, AI-native
                            products that required building new muscles around evaluation, latency, and
                            probabilistic outputs.
                        </p>
                        <p className="text-body-md mb-8" style={{ color: "var(--text-secondary)" }}>
                            I'm drawn to hard problems where the path isn't obvious — where the interesting
                            work is figuring out what to build before building it. I believe senior PM craft
                            is 30% strategy, 30% execution, and 40% people — stakeholder trust, team energy,
                            and influence without authority.
                        </p>

                        <a href="/resume.pdf" download className="btn-primary">
                            <Download size={16} aria-hidden="true" />
                            Download Resume (PDF)
                        </a>
                    </div>

                    {/* Quick facts */}
                    <div>
                        <div
                            className="rounded-2xl p-8 mb-6"
                            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                        >
                            <div className="text-label mb-5">Quick Facts</div>
                            <div className="space-y-4">
                                {quickFacts.map(({ icon: Icon, label, value }) => (
                                    <div key={label} className="flex items-start gap-3">
                                        <div
                                            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                            style={{ background: "rgba(232,168,56,0.1)" }}
                                        >
                                            <Icon size={16} style={{ color: "var(--accent)" }} aria-hidden="true" />
                                        </div>
                                        <div>
                                            <div className="text-label" style={{ color: "var(--text-muted)" }}>
                                                {label}
                                            </div>
                                            <div className="text-body-sm font-medium">{value}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Availability */}
                        <div
                            className="rounded-xl p-5"
                            style={{
                                background: "rgba(45,212,191,0.06)",
                                border: "1px solid rgba(45,212,191,0.2)",
                            }}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <span className="live-dot" aria-hidden="true" />
                                <span className="font-semibold text-sm" style={{ color: "var(--teal)" }}>
                                    Currently Available
                                </span>
                            </div>
                            <p className="text-body-sm" style={{ color: "var(--text-secondary)" }}>
                                Open to Senior PM and Group PM roles in product-led AI or platform companies.
                            </p>
                        </div>
                    </div>
                </div>

                {/* PM Philosophy */}
                <section aria-labelledby="philosophy-heading" className="mb-20">
                    <div className="text-label mb-4">My Philosophy</div>
                    <h2 id="philosophy-heading" className="text-display-lg font-display mb-10">
                        What I believe about product
                    </h2>
                    <div className="grid md:grid-cols-2 gap-5">
                        {philosophy.map((p) => (
                            <div key={p.title} className="card p-6">
                                <h3
                                    className="text-heading-lg font-heading mb-3"
                                    style={{ color: "var(--accent)" }}
                                >
                                    {p.title}
                                </h3>
                                <p className="text-body-md" style={{ color: "var(--text-secondary)" }}>
                                    {p.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <div id="contact" className="text-center">
                    <h2 className="text-display-lg font-display mb-4">Let's build something together</h2>
                    <p className="text-body-lg mb-8" style={{ color: "var(--text-secondary)" }}>
                        Drop me an email or book time — I reply to every thoughtful message.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <a href="mailto:hello@alexmorgan.pm" className="btn-primary">
                            Email me
                        </a>
                        <Link href="/work" className="btn-secondary">
                            See my work
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
