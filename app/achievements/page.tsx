import type { Metadata } from "next";
import { achievements } from "@/data/content";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
    title: "Achievements",
    description: "Awards, certifications, speaking engagements, and press mentions.",
};

const categories = ["All", "award", "cert", "speaking", "press", "education"] as const;

const categoryLabels: Record<string, string> = {
    award: "Awards",
    cert: "Certifications",
    speaking: "Speaking",
    press: "Press",
    education: "Education",
};

export default function AchievementsPage() {
    return (
        <div className="pt-28 pb-24">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="mb-12">
                    <div className="text-label mb-4">Credentials</div>
                    <h1 className="text-display-xl font-display mb-4">Achievements</h1>
                    <p className="text-body-lg max-w-2xl" style={{ color: "var(--text-secondary)" }}>
                        Third-party validation — awards, certifications, speaking records, and press coverage.
                    </p>
                </div>

                {/* Achievements by category */}
                {(["award", "cert", "speaking"] as const).map((cat) => {
                    const items = achievements.filter((a) => a.category === cat);
                    if (!items.length) return null;
                    return (
                        <section key={cat} aria-labelledby={`${cat}-heading`} className="mb-14">
                            <div className="text-label mb-5">{categoryLabels[cat]}</div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {items.map((item) => (
                                    <div key={item.title} className="card p-6">
                                        <div className="chip chip-amber mb-3">{categoryLabels[item.category]}</div>
                                        <h3 className="text-heading-lg font-heading mb-1">{item.title}</h3>
                                        <p className="text-body-sm mb-2" style={{ color: "var(--accent)" }}>
                                            {item.issuer}
                                        </p>
                                        <p className="text-body-sm mb-4" style={{ color: "var(--text-secondary)" }}>
                                            {item.context}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                                                {item.date}
                                            </span>
                                            {item.link && (
                                                <a
                                                    href={item.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1 text-xs font-semibold hover:opacity-80 transition-opacity"
                                                    style={{ color: "var(--electric)" }}
                                                    aria-label={`View ${item.title}`}
                                                >
                                                    View <ExternalLink size={12} aria-hidden="true" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    );
                })}
            </div>
        </div>
    );
}
