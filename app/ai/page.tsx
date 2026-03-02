import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { aiProducts } from "@/data/content";

export const metadata: Metadata = {
    title: "AI Playground",
    description:
        "Live AI products I've personally built: RAG systems, LLM tooling, and semantic search at scale.",
};

const aiStack = [
    { category: "LLMs", tools: ["GPT-4o", "Claude 3.5 Sonnet", "Gemini Pro"] },
    { category: "Orchestration", tools: ["LangChain", "LlamaIndex", "Vercel AI SDK"] },
    { category: "Vector DBs", tools: ["Pinecone", "Supabase pgvector"] },
    { category: "Evals", tools: ["Braintrust", "LangSmith", "Custom pytest"] },
    { category: "Infrastructure", tools: ["Vercel", "Railway", "AWS Lambda"] },
    { category: "Voice & Multi-modal", tools: ["Whisper API", "ElevenLabs", "GPT-4V"] },
];

export default function AIPage() {
    return (
        <div className="pt-28 pb-24">
            <div className="max-w-6xl mx-auto px-6">
                {/* Hero manifesto */}
                <div className="max-w-3xl mb-20">
                    <div className="text-label mb-4" style={{ color: "var(--electric)" }}>
                        AI Playground
                    </div>
                    <h1 className="text-display-xl font-display mb-6">
                        Building with AI, not just prompting it
                    </h1>
                    <div className="space-y-4 text-body-lg" style={{ color: "var(--text-secondary)" }}>
                        <p>
                            Most PMs talk about AI. I ship it. This section is where I share the AI products
                            I've personally built — not as proofs-of-concept, but as live products with real
                            users, real metrics, and real learnings.
                        </p>
                        <p>
                            My take: AI is not magic, and it's not hype. It's a new capability layer that dramatically
                            expands what a small team can build. The products that will win aren't the ones with the
                            best models — they're the ones with the best <em>product thinking</em> applied to AI.
                        </p>
                        <p>
                            What's underrated: eval design, latency tolerance, and graceful degradation. What's
                            overhyped: agents doing anything meaningfully autonomous. The frontier is moving fast —
                            but the fundamentals of good product work don't change.
                        </p>
                    </div>
                </div>

                {/* AI Products Grid */}
                <section aria-labelledby="ai-products-heading" className="mb-20">
                    <div className="text-label mb-4">Live Products</div>
                    <h2 id="ai-products-heading" className="text-display-lg font-display mb-10">
                        AI products I've shipped
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {aiProducts.map((product) => (
                            <Link
                                key={product.slug}
                                href={`/ai/${product.slug}`}
                                className="card p-7 group block"
                                aria-label={product.name}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="live-dot" aria-hidden="true" />
                                        <span className="text-xs font-bold" style={{ color: "var(--teal)" }}>
                                            {product.status.toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        {product.githubUrl && (
                                            <span aria-hidden="true">
                                                <Github size={16} style={{ color: "var(--text-muted)" }} />
                                            </span>
                                        )}
                                        {product.demoUrl && (
                                            <span aria-hidden="true">
                                                <ExternalLink size={16} style={{ color: "var(--text-muted)" }} />
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <h3 className="text-heading-xl font-heading mb-2 group-hover:text-text-primary transition-colors">
                                    {product.name}
                                </h3>
                                <p className="text-sm font-medium mb-3" style={{ color: "var(--accent-light)" }}>
                                    {product.tagline}
                                </p>
                                <p className="text-body-sm mb-5" style={{ color: "var(--text-secondary)" }}>
                                    {product.summary}
                                </p>

                                {product.metrics && (
                                    <div className="grid grid-cols-3 gap-3 mb-5">
                                        {product.metrics.map((m) => (
                                            <div key={m.label}>
                                                <div
                                                    className="font-mono font-bold text-lg"
                                                    style={{ color: "var(--accent)" }}
                                                >
                                                    {m.value}
                                                </div>
                                                <div className="metric-label">{m.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="flex flex-wrap gap-1.5">
                                    {product.stack.map((t) => (
                                        <span key={t} className="chip chip-electric">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* AI Stack */}
                <section aria-labelledby="ai-stack-heading">
                    <div className="text-label mb-4">Stack & Philosophy</div>
                    <h2 id="ai-stack-heading" className="text-display-lg font-display mb-10">
                        Tools I actually use
                    </h2>

                    <div className="grid md:grid-cols-3 gap-5">
                        {aiStack.map((group) => (
                            <div key={group.category} className="card p-5">
                                <div className="text-label mb-3">{group.category}</div>
                                <div className="flex flex-wrap gap-2">
                                    {group.tools.map((tool) => (
                                        <span key={tool} className="chip chip-electric">
                                            {tool}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
