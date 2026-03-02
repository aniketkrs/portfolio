import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Articles",
    description: "Writing on product management, AI, and building software people love.",
};

const articles = [
    {
        slug: "building-ai-evaluation-frameworks",
        title: "Building Evaluation Frameworks for AI Products",
        date: "2024-11-15",
        readTime: "7 min",
        tag: "AI",
        teaser: "The single hardest PM problem when building AI products isn't the model — it's knowing if it's working. Here's how I approach evals.",
    },
    {
        slug: "from-zero-to-one-product-thinking",
        title: "0 to 1 Product Thinking: What Actually Changes",
        date: "2024-08-20",
        readTime: "9 min",
        tag: "Product",
        teaser: "What I wish someone had told me before spending 12 months building a product from nothing. The surprises, the mistakes, the frameworks.",
    },
    {
        slug: "stakeholder-alignment-without-politics",
        title: "Stakeholder Alignment Without Playing Politics",
        date: "2024-05-10",
        readTime: "6 min",
        tag: "Leadership",
        teaser: "The most underrated PM skill isn't prioritisation or data analysis — it's getting people who disagree with you to act in the product's interest.",
    },
];

export default function ArticlesPage() {
    return (
        <div className="pt-28 pb-24">
            <div className="max-w-4xl mx-auto px-6">
                {/* Header */}
                <div className="mb-12">
                    <div className="text-label mb-4">Writing</div>
                    <h1 className="text-display-xl font-display mb-4">Articles</h1>
                    <p className="text-body-lg max-w-2xl" style={{ color: "var(--text-secondary)" }}>
                        Longer-form thinking on product, AI, and building things. One or two a month.
                    </p>
                </div>

                {/* Articles list */}
                <div className="space-y-5">
                    {articles.map((article, i) => (
                        <Link
                            key={article.slug}
                            href={`/articles/${article.slug}`}
                            className="card block p-7 group"
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <span className="chip chip-electric">{article.tag}</span>
                                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                                    {article.date} · {article.readTime} read
                                </span>
                            </div>

                            <h2 className="text-heading-xl font-heading mb-3 group-hover:text-text-primary transition-colors">
                                {article.title}
                            </h2>

                            <p className="text-body-md mb-4" style={{ color: "var(--text-secondary)" }}>
                                {article.teaser}
                            </p>

                            <div
                                className="flex items-center gap-1 text-sm font-semibold"
                                style={{ color: "var(--accent)" }}
                            >
                                Read article{" "}
                                <ArrowRight
                                    size={14}
                                    aria-hidden="true"
                                    className="group-hover:translate-x-1 transition-transform"
                                />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
