import type { Metadata } from "next";
import { books } from "@/data/content";
import { Star } from "lucide-react";

export const metadata: Metadata = {
    title: "Bookshelf",
    description: "Books I've read, what I took from them, and what I'm reading now.",
};

const categories = ["All", "Product", "Strategy", "Psychology", "Tech", "Business"];

function StarRating({ rating }: { rating: number }) {
    return (
        <div
            className="flex gap-0.5"
            role="img"
            aria-label={`${rating} out of 5 stars`}
        >
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    size={12}
                    fill={i < rating ? "var(--accent)" : "none"}
                    style={{ color: i < rating ? "var(--accent)" : "var(--border-hover)" }}
                    aria-hidden="true"
                />
            ))}
        </div>
    );
}

export default function BookshelfPage() {
    const currentlyReading = books.filter((b) => b.status === "reading");
    const read = books.filter((b) => b.status === "read");

    return (
        <div className="pt-28 pb-24">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="mb-12">
                    <div className="text-label mb-4">Reading</div>
                    <h1 className="text-display-xl font-display mb-4">Bookshelf</h1>
                    <p className="text-body-lg max-w-2xl" style={{ color: "var(--text-secondary)" }}>
                        The books that shaped how I think about product, strategy, and building. With a
                        one-line takeaway from each.
                    </p>
                </div>

                {/* Currently Reading */}
                {currentlyReading.length > 0 && (
                    <section aria-labelledby="reading-heading" className="mb-16">
                        <div className="text-label mb-5">Currently Reading</div>
                        <div className="grid md:grid-cols-2 gap-5">
                            {currentlyReading.map((book) => (
                                <div
                                    key={book.title}
                                    className="card p-6"
                                    style={{ border: "1px solid rgba(232,168,56,0.3)" }}
                                >
                                    <div className="flex items-start gap-4">
                                        <div
                                            className="w-16 h-22 rounded-lg flex-shrink-0 flex items-center justify-center text-2xl"
                                            style={{
                                                background: "rgba(232,168,56,0.1)",
                                                border: "1px solid rgba(232,168,56,0.2)",
                                                minHeight: "88px",
                                            }}
                                            aria-hidden="true"
                                        >
                                            📖
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="live-dot" aria-hidden="true" />
                                                <span className="text-xs font-bold" style={{ color: "var(--teal)" }}>
                                                    READING NOW
                                                </span>
                                            </div>
                                            <h3 className="text-heading-lg font-heading mb-1">{book.title}</h3>
                                            <p className="text-body-sm mb-2" style={{ color: "var(--text-muted)" }}>
                                                {book.author}
                                            </p>
                                            <p className="text-body-sm italic" style={{ color: "var(--text-secondary)" }}>
                                                "{book.takeaway}"
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Read books */}
                <section aria-labelledby="bookshelf-heading">
                    <h2 id="bookshelf-heading" className="text-display-lg font-display mb-8">
                        Read & recommended
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {read.map((book) => (
                            <div key={book.title} className="card p-5 group">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="chip chip-amber">{book.category}</span>
                                    <StarRating rating={book.rating} />
                                </div>
                                <h3 className="text-heading-lg font-heading mb-1">{book.title}</h3>
                                <p className="text-body-sm mb-3" style={{ color: "var(--text-muted)" }}>
                                    {book.author}
                                </p>
                                <p className="text-body-sm italic" style={{ color: "var(--text-secondary)" }}>
                                    "{book.takeaway}"
                                </p>
                                <div
                                    className="mt-3 text-xs"
                                    style={{ color: "var(--text-muted)" }}
                                >
                                    Read {book.readDate}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
