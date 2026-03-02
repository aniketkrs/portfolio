// Types for PM Portfolio content

export type Project = {
    slug: string;
    title: string;
    company: string;
    year: number;
    role: string;
    domain: "growth" | "platform" | "consumer" | "b2b" | "ai" | "0-to-1";
    duration: string;
    teamSize: string;
    thumbnail: string;
    featured: boolean;
    summary: string;
    outcomes: { metric: string; value: string }[];
    tags: string[];
    readTime: string;
};

export type AIProduct = {
    slug: string;
    name: string;
    tagline: string;
    status: "live" | "beta" | "archived" | "in-progress";
    demoUrl?: string;
    githubUrl?: string;
    thumbnail: string;
    stack: string[];
    metrics?: { label: string; value: string }[];
    summary: string;
};

export type Book = {
    title: string;
    author: string;
    cover: string;
    category: string;
    rating: 1 | 2 | 3 | 4 | 5;
    takeaway: string;
    readDate: string;
    status: "read" | "reading" | "want-to-read";
    link?: string;
};

export type Tool = {
    name: string;
    logo: string;
    category: "discovery" | "roadmap" | "analytics" | "design" | "ai" | "communication" | "data";
    usage: string;
    rating: 1 | 2 | 3 | 4 | 5;
    isNew?: boolean;
    link: string;
};

export type Achievement = {
    title: string;
    issuer: string;
    logo: string;
    date: string;
    category: "award" | "cert" | "speaking" | "press" | "education";
    link?: string;
    context: string;
};

export type Testimonial = {
    name: string;
    role: string;
    company: string;
    avatar: string;
    quote: string;
};
