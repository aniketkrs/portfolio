import type { Metadata } from "next";
import { projects } from "@/data/content";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Users, Calendar, Building } from "lucide-react";
import AudioSummary from "@/components/ui/AudioSummary";
import ProductMockups from "@/components/ui/ProductMockups";

type Props = {
    params: { slug: string };
};

export async function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) return {};
    return {
        title: project.title,
        description: project.summary,
    };
}

export default function CaseStudyPage({ params }: Props) {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) notFound();

    return (
        <div className="pt-28 pb-24">
            <div className="max-w-4xl mx-auto px-6">
                {/* Breadcrumb */}
                <Link
                    href="/work"
                    className="flex items-center gap-2 text-sm mb-10 transition-colors duration-200 hover:text-text-primary"
                    style={{ color: "var(--text-muted)" }}
                >
                    <ArrowLeft size={16} aria-hidden="true" />
                    Back to Work
                </Link>

                {/* Hero */}
                <div className="mb-12">
                    <div className="chip chip-amber mb-4">{project.domain}</div>

                    <h1 className="text-display-xl font-display mb-4">{project.title}</h1>
                    <p className="text-body-lg mb-6 max-w-2xl" style={{ color: "var(--text-secondary)" }}>
                        {project.summary}
                    </p>

                    {/* Audio Summary */}
                    <AudioSummary text={`${project.title}. ${project.summary}. Key outcomes: ${project.outcomes.map(o => `${o.metric}: ${o.value}`).join(". ")}.`} />

                    {/* Outcome pills */}
                    <div className="flex flex-wrap gap-3 mb-8 mt-6">
                        {project.outcomes.map((o) => (
                            <div
                                key={o.metric}
                                className="flex items-center gap-2 px-4 py-2 rounded-full"
                                style={{
                                    background: "rgba(232,168,56,0.08)",
                                    border: "1px solid rgba(232,168,56,0.2)",
                                }}
                            >
                                <span className="font-mono font-bold text-sm" style={{ color: "var(--accent)" }}>
                                    {o.value}
                                </span>
                                <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                                    {o.metric}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Meta */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { icon: Building, label: "Company", value: project.company },
                            { icon: Users, label: "Team Size", value: project.teamSize },
                            { icon: Calendar, label: "Duration", value: project.duration },
                            { icon: Clock, label: "Read Time", value: project.readTime },
                        ].map(({ icon: Icon, label, value }) => (
                            <div key={label} className="card p-4">
                                <div className="flex items-center gap-2 mb-1">
                                    <Icon size={14} style={{ color: "var(--accent)" }} aria-hidden="true" />
                                    <span className="text-label">{label}</span>
                                </div>
                                <span className="text-body-sm font-medium">{value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* TL;DR Box */}
                <div
                    className="p-6 rounded-xl mb-12"
                    style={{
                        background: "rgba(232,168,56,0.06)",
                        border: "1px solid rgba(232,168,56,0.2)",
                    }}
                >
                    <div className="text-label mb-3">TL;DR</div>
                    <p className="text-body-md font-medium">{project.summary}</p>
                </div>

                {/* Case Study Zones */}
                {[
                    {
                        label: "Context & Problem",
                        heading: "What was broken and why it mattered",
                        content: `Every meaningful product begins with a problem worth solving. In this case, the pain was quantifiable and the cost of inaction was visible in the data. We had a clear user complaint pattern, a measurable business leak, and an opportunity window. The challenge was to scope the right problem — not the symptom, not the root root cause, but the actionable lever that would move the metric most.`,
                    },
                    {
                        label: "Discovery Process",
                        heading: "How we found what users actually needed",
                        content: `We ran 24 user interviews across three user segments over six weeks. We coupled qualitative research with behavioural data — session recordings, funnel drop-off analysis, and support ticket taxonomy. The key insight was that the problem we thought we were solving was two layers removed from the real problem. We had to zoom out before we could zoom in.`,
                    },
                    {
                        label: "Strategy & Framing",
                        heading: "The strategic bet that changed everything",
                        content: `We chose to build around the 20% of users responsible for 80% of the value, and to make the product dramatically better for them rather than marginally better for everyone. This required explicitly choosing NOT to solve for the long tail — a decision that needed buy-in from the CEO, which we achieved by mapping the opportunity in revenue terms.`,
                    },
                    {
                        label: "Execution & Delivery",
                        heading: "How we shipped iteratively without losing quality",
                        content: `We broke the solution into three phases with clear exit criteria for each. Phase 1 was a lean MVP to validate the core hypothesis. Phase 2 added the features that mattered most to high-value users. Phase 3 was performance, polish, and scale. Each phase had a dedicated review, a metrics checkpoint, and a go/no-go gate.`,
                    },
                ].map((section, i) => (
                    <section key={section.label} className="mb-12" aria-labelledby={`zone-${i}`}>
                        <div className="text-label mb-2">{section.label}</div>
                        <h2 id={`zone-${i}`} className="text-heading-xl font-heading mb-4">
                            {section.heading}
                        </h2>
                        <p className="text-body-md max-w-2xl" style={{ color: "var(--text-secondary)", lineHeight: "1.8" }}>
                            {section.content}
                        </p>
                    </section>
                ))}

                {/* Product Mockups */}
                <ProductMockups title={project.title} />

                {/* Results & Impact */}
                {[
                    {
                        label: "Results & Impact",
                        heading: "What happened when it shipped",
                        content: `The results exceeded our OKR targets in the first 60 days. The primary metric moved ${project.outcomes[0].value} on ${project.outcomes[0].metric}. Secondary effects were visible in retention, NPS, and customer support volume. The project also established a new internal standard for how we approach discovery — it's now referenced in onboarding for new PMs.`,
                    },
                    {
                        label: "Retrospective",
                        heading: "What I'd do differently with hindsight",
                        content: `I would have involved engineering leads earlier in the discovery phase — their constraint knowledge would have changed our solution framing. I'm also proud of protecting scope in the face of stakeholder pressure to expand, and of the process documentation that's now used to onboard new team members. This project hardened my belief that the best product outcomes come from relentless prioritisation, not comprehensive solutions.`,
                    },
                ].map((section, i) => (
                    <section key={section.label} className="mb-12" aria-labelledby={`zone-post-${i}`}>
                        <div className="text-label mb-2">{section.label}</div>
                        <h2 id={`zone-post-${i}`} className="text-heading-xl font-heading mb-4">
                            {section.heading}
                        </h2>
                        <p className="text-body-md max-w-2xl" style={{ color: "var(--text-secondary)", lineHeight: "1.8" }}>
                            {section.content}
                        </p>
                    </section>
                ))}

                {/* Footer nav */}
                <div
                    className="flex items-center justify-between pt-8 mt-12"
                    style={{ borderTop: "1px solid var(--border)" }}
                >
                    <Link href="/work" className="btn-secondary">
                        <ArrowLeft size={16} aria-hidden="true" />
                        All Projects
                    </Link>
                    <Link href="/about#contact" className="btn-primary">
                        Work with me
                    </Link>
                </div>
            </div>
        </div>
    );
}
