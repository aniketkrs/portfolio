import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Tools",
    description: "My full PM toolkit — every tool I use daily, with ratings and how I use them.",
};

const tools = [
    // Discovery
    { name: "Dovetail", emoji: "🎯", category: "Discovery", usage: "User research synthesis, interview tagging, insight repository", rating: 5, isNew: false },
    { name: "Miro", emoji: "🗺️", category: "Discovery", usage: "Opportunity trees, ideation workshops, user journey maps", rating: 4, isNew: false },
    // Roadmapping
    { name: "Linear", emoji: "📋", category: "Roadmap", usage: "Sprint planning, issue tracking, roadmap timeline views", rating: 5, isNew: false },
    { name: "Notion", emoji: "📝", category: "Roadmap", usage: "PRDs, decision logs, OKR tracking, team wikis", rating: 5, isNew: false },
    // Analytics
    { name: "Amplitude", emoji: "📊", category: "Analytics", usage: "Funnel analysis, retention cohorts, event-based tracking", rating: 5, isNew: false },
    { name: "Mixpanel", emoji: "🔍", category: "Analytics", usage: "User journey analysis, A/B test tracking", rating: 4, isNew: false },
    // Design
    { name: "Figma", emoji: "🎨", category: "Design", usage: "Wireframes, collaborative prototypes, design reviews", rating: 5, isNew: false },
    // AI
    { name: "Claude", emoji: "🤖", category: "AI", usage: "Research synthesis, PRD drafts, spec reviews", rating: 5, isNew: true },
    { name: "Cursor", emoji: "⚡", category: "AI", usage: "Rapid prototyping, data scripts, AI demos", rating: 5, isNew: true },
    // Communication
    { name: "Loom", emoji: "🎥", category: "Communication", usage: "Async product reviews, design walkthroughs for distributed teams", rating: 5, isNew: false },
];

const categories = ["All", "Discovery", "Roadmap", "Analytics", "Design", "AI", "Communication"];

export default function ToolsPage() {
    return (
        <div className="pt-28 pb-24">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="mb-12">
                    <div className="text-label mb-4">My Stack</div>
                    <h1 className="text-display-xl font-display mb-4">Tools</h1>
                    <p className="text-body-lg max-w-2xl" style={{ color: "var(--text-secondary)" }}>
                        The tools that power my daily PM work — with a rating and exactly how I use each one.
                    </p>
                </div>

                {/* Tools grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {tools.map((tool) => (
                        <div key={tool.name} className="card p-5">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <span
                                        className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl"
                                        style={{ background: "var(--bg-surface)" }}
                                        aria-hidden="true"
                                    >
                                        {tool.emoji}
                                    </span>
                                    <div>
                                        <div className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
                                            {tool.name}
                                        </div>
                                        <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                                            {tool.category}
                                        </div>
                                    </div>
                                </div>
                                {tool.isNew && (
                                    <span className="chip chip-teal">New</span>
                                )}
                            </div>
                            <p className="text-body-sm" style={{ color: "var(--text-secondary)" }}>
                                {tool.usage}
                            </p>
                            {/* Star rating */}
                            <div className="flex gap-1 mt-3" aria-label={`${tool.rating} out of 5`} role="img">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <span
                                        key={i}
                                        aria-hidden="true"
                                        style={{
                                            color: i < tool.rating ? "var(--accent)" : "var(--border-hover)",
                                            fontSize: "12px",
                                        }}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
