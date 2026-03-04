import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { aiProducts } from "@/data/content";
import StickyGrid from "@/components/ai/StickyGrid";

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
        <div className="w-full">
            {/* Visual GSAP Scroll Grid */}
            <StickyGrid />

            {/* Content Section utilizing 8-pt grid system (spacings: 8, 16, 24, 32, 40, 48, 64, 80, 96, 128) */}
            <div className="py-24 md:py-32">
                <div className="max-w-6xl mx-auto px-6 md:px-8">

                    {/* Hero manifesto */}
                    <div className="max-w-3xl mb-24 md:mb-32">
                        <div className="text-[12px] font-bold tracking-[0.2em] uppercase mb-4 text-[#f2690d]">
                            AI Philosophy
                        </div>
                        <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tight mb-8">
                            Building with AI, not just prompting it
                        </h2>
                        <div className="space-y-6 text-base md:text-lg text-[var(--text-secondary)] leading-relaxed font-serif">
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
                    <section aria-labelledby="ai-products-heading" className="mb-32">
                        <div className="text-[12px] font-bold tracking-[0.2em] uppercase mb-6 text-[var(--text-muted)]">
                            Live Products
                        </div>
                        <h2 id="ai-products-heading" className="text-3xl md:text-4xl font-display tracking-tight mb-12">
                            AI products I've shipped
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            {aiProducts.map((product) => (
                                <Link
                                    key={product.slug}
                                    href={`/ai/${product.slug}`}
                                    className="bento-card p-8 group block flex flex-col h-full"
                                    aria-label={product.name}
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse shadow-[0_0_8px_rgba(20,184,166,0.6)]" aria-hidden="true" />
                                            <span className="text-[10px] font-bold tracking-widest text-teal-600 dark:text-teal-400">
                                                {product.status.toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="flex gap-4">
                                            {product.githubUrl && (
                                                <span aria-hidden="true">
                                                    <Github size={20} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors" />
                                                </span>
                                            )}
                                            {product.demoUrl && (
                                                <span aria-hidden="true">
                                                    <ExternalLink size={20} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors" />
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-serif font-bold tracking-tight mb-3 group-hover:text-[var(--primary)] transition-colors">
                                        {product.name}
                                    </h3>
                                    <p className="text-sm font-medium mb-4 text-[#f2690d]">
                                        {product.tagline}
                                    </p>
                                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-8 flex-grow">
                                        {product.summary}
                                    </p>

                                    {product.metrics && (
                                        <div className="grid grid-cols-3 gap-4 mb-8">
                                            {product.metrics.map((m) => (
                                                <div key={m.label} className="flex flex-col">
                                                    <div className="font-mono font-bold text-xl md:text-2xl text-[var(--text-primary)] mb-1">
                                                        {m.value}
                                                    </div>
                                                    <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                                                        {m.label}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-[var(--border)]">
                                        {product.stack.map((t) => (
                                            <span key={t} className="px-3 py-1.5 rounded-full border border-[var(--border)] text-[10px] font-mono uppercase tracking-widest text-[var(--text-secondary)] bg-[var(--surface-hover)]">
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
                        <div className="text-[12px] font-bold tracking-[0.2em] uppercase mb-6 text-[var(--text-muted)]">
                            Stack & Philosophy
                        </div>
                        <h2 id="ai-stack-heading" className="text-3xl md:text-4xl font-display tracking-tight mb-12">
                            Tools I actually use
                        </h2>

                        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                            {aiStack.map((group) => (
                                <div key={group.category} className="bento-card p-6 md:p-8">
                                    <div className="text-[10px] font-bold tracking-[0.15em] uppercase mb-6 text-[var(--text-primary)]">
                                        {group.category}
                                    </div>
                                    <div className="flex flex-wrap gap-2 md:gap-3">
                                        {group.tools.map((tool) => (
                                            <span key={tool} className="px-3 py-1.5 rounded-full border border-[var(--border)] text-[11px] font-medium tracking-wide text-[var(--text-secondary)]">
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
        </div>
    );
}
