import type { Project, Book, Tool, Achievement, Testimonial, AIProduct } from "@/types/content";

export const projects: Project[] = [
    {
        slug: "ai-search-discovery",
        title: "AI-Powered Search & Discovery Platform",
        company: "TechScale Inc.",
        year: 2024,
        role: "Senior Product Manager",
        domain: "ai",
        duration: "10 months",
        teamSize: "2 squads — 14 engineers, 3 designers",
        thumbnail: "/images/work/ai-search.jpg",
        featured: true,
        summary:
            "Rebuilt search and discovery with semantic AI, lifting conversion 41% and reducing zero-result searches by 78% across 3.2M monthly active users.",
        outcomes: [
            { metric: "Search conversion", value: "+41%" },
            { metric: "Zero-result searches", value: "↓78%" },
            { metric: "MAU impacted", value: "3.2M" },
            { metric: "Revenue attributed", value: "$4.8M ARR" },
        ],
        tags: ["AI/ML", "Consumer", "Search", "Growth"],
        readTime: "9 min",
    },
    {
        slug: "payments-platform-overhaul",
        title: "Payments Platform Overhaul",
        company: "FinTech Corp",
        year: 2023,
        role: "Senior Product Manager — Platform",
        domain: "platform",
        duration: "8 months",
        teamSize: "3 squads — 18 engineers, 4 designers",
        thumbnail: "/images/work/payments.jpg",
        featured: true,
        summary:
            "Rebuilt core payments infrastructure, cutting failed transactions 67% and lifting checkout conversion 34% across 2.4M users.",
        outcomes: [
            { metric: "Failed transactions", value: "↓67%" },
            { metric: "Checkout conversion", value: "+34%" },
            { metric: "Users impacted", value: "2.4M" },
            { metric: "P99 latency", value: "↓220ms" },
        ],
        tags: ["Platform", "Payments", "B2C", "Infrastructure"],
        readTime: "11 min",
    },
    {
        slug: "growth-loops-b2b-saas",
        title: "B2B SaaS Viral Growth Engine",
        company: "GrowthOS",
        year: 2023,
        role: "Group Product Manager — Growth",
        domain: "growth",
        duration: "6 months",
        teamSize: "2 squads — 10 engineers, 2 designers",
        thumbnail: "/images/work/growth.jpg",
        featured: true,
        summary:
            "Designed and shipped product-led growth loops for a B2B SaaS, taking activation rate from 23% to 67% and reducing CAC by 40%.",
        outcomes: [
            { metric: "Activation rate", value: "23% → 67%" },
            { metric: "CAC reduction", value: "↓40%" },
            { metric: "NPS lift", value: "+22 points" },
            { metric: "Trial-to-paid", value: "+31%" },
        ],
        tags: ["Growth", "B2B", "PLG", "SaaS"],
        readTime: "8 min",
    },
    {
        slug: "consumer-mobile-app-0to1",
        title: "Wellness App — 0 to 1",
        company: "MindfulCo",
        year: 2022,
        role: "Lead Product Manager",
        domain: "0-to-1",
        duration: "12 months",
        teamSize: "1 squad — 8 engineers, 2 designers",
        thumbnail: "/images/work/wellness.jpg",
        featured: false,
        summary:
            "Built a mindfulness app from concept to 400K+ downloads in 8 months, reaching top-5 in the Health & Fitness category.",
        outcomes: [
            { metric: "Downloads in 8 months", value: "400K+" },
            { metric: "App Store rating", value: "4.9 ⭐" },
            { metric: "Day-7 retention", value: "52%" },
            { metric: "Category rank", value: "Top 5" },
        ],
        tags: ["Consumer", "Mobile", "0→1", "Health"],
        readTime: "10 min",
    },
];

export const aiProducts: AIProduct[] = [
    {
        slug: "context-aware-doc-search",
        name: "DocSearch AI",
        tagline: "Find anything in your knowledge base with natural language",
        status: "live",
        demoUrl: "https://docsearch-demo.vercel.app",
        githubUrl: "https://github.com/alexmorgan/docsearch-ai",
        thumbnail: "/images/ai/docsearch.jpg",
        stack: ["GPT-4o", "LangChain", "Pinecone", "Next.js", "Vercel AI SDK"],
        summary:
            "RAG-powered document search that understands context, not just keywords. Built to replace keyword search in internal wikis.",
        metrics: [
            { label: "Search accuracy", value: "94%" },
            { label: "Avg query time", value: "1.2s" },
            { label: "Active users", value: "1,200+" },
        ],
    },
    {
        slug: "pm-brief-generator",
        name: "PM Brief Generator",
        tagline: "Turn a raw idea into a structured product spec in 60 seconds",
        status: "live",
        demoUrl: "https://pm-brief.vercel.app",
        thumbnail: "/images/ai/pm-brief.jpg",
        stack: ["Claude 3.5 Sonnet", "Next.js", "Vercel AI SDK", "Zod"],
        summary:
            "Structured prompt chain that takes a raw product idea and generates a full PRD skeleton following PM best practices.",
        metrics: [
            { label: "Briefs generated", value: "8,400+" },
            { label: "User rating", value: "4.8/5" },
            { label: "Time saved avg", value: "2.5 hrs" },
        ],
    },
];

export const books: Book[] = [
    {
        title: "The Mom Test",
        author: "Rob Fitzpatrick",
        cover: "/images/books/mom-test.jpg",
        category: "Product",
        rating: 5,
        takeaway: "Never ask if your idea is good — ask about their life, problems, and behaviour.",
        readDate: "2024-09",
        status: "read",
        link: "https://www.momtestbook.com",
    },
    {
        title: "Continuous Discovery Habits",
        author: "Teresa Torres",
        cover: "/images/books/continuous-discovery.jpg",
        category: "Product",
        rating: 5,
        takeaway: "Weekly customer touchpoints + opportunity solution trees = less guessing, more shipping.",
        readDate: "2024-06",
        status: "read",
    },
    {
        title: "Working in Public",
        author: "Nadia Eghbal",
        cover: "/images/books/working-in-public.jpg",
        category: "Strategy",
        rating: 4,
        takeaway: "Open source economics illuminate the future of knowledge work and community.",
        readDate: "2024-03",
        status: "read",
    },
    {
        title: "Superhuman by Design",
        author: "Rahul Vohra",
        cover: "/images/books/superhuman.jpg",
        category: "Product",
        rating: 5,
        takeaway: "Product-market fit score is a metric, not a feeling. 40% rule changes how you build.",
        readDate: "2023-11",
        status: "read",
    },
    {
        title: "The Coming Wave",
        author: "Mustafa Suleyman",
        cover: "/images/books/coming-wave.jpg",
        category: "Tech",
        rating: 4,
        takeaway: "AI + synthetic bio wave is the most consequential technology shift since industrialisation.",
        readDate: "2024-11",
        status: "reading",
    },
];

export const tools: Tool[] = [
    { name: "Linear", logo: "/images/tools/linear.svg", category: "roadmap", usage: "Sprint planning, issue tracking, roadmap views", rating: 5, link: "https://linear.app" },
    { name: "Figma", logo: "/images/tools/figma.svg", category: "design", usage: "Wireframes, prototypes, design reviews", rating: 5, link: "https://figma.com" },
    { name: "Amplitude", logo: "/images/tools/amplitude.svg", category: "analytics", usage: "Funnel analysis, retention cohorts, event tracking", rating: 5, link: "https://amplitude.com" },
    { name: "Mixpanel", logo: "/images/tools/mixpanel.svg", category: "analytics", usage: "User journey analysis, A/B test tracking", rating: 4, link: "https://mixpanel.com" },
    { name: "Dovetail", logo: "/images/tools/dovetail.svg", category: "discovery", usage: "User research synthesis, interview tagging", rating: 5, link: "https://dovetailapp.com" },
    { name: "Notion", logo: "/images/tools/notion.svg", category: "communication", usage: "PRDs, decision logs, team wikis", rating: 5, link: "https://notion.so" },
    { name: "Claude", logo: "/images/tools/claude.svg", category: "ai", usage: "Research synthesis, PRD drafts, spec reviews", rating: 5, isNew: true, link: "https://claude.ai" },
    { name: "Cursor", logo: "/images/tools/cursor.svg", category: "ai", usage: "Rapid prototyping, data scripts, AI demos", rating: 5, isNew: true, link: "https://cursor.sh" },
    { name: "Loom", logo: "/images/tools/loom.svg", category: "communication", usage: "Async product reviews, design walkthroughs", rating: 5, link: "https://loom.com" },
    { name: "Miro", logo: "/images/tools/miro.svg", category: "discovery", usage: "Opportunity trees, ideation workshops, journey maps", rating: 4, link: "https://miro.com" },
];

export const achievements: Achievement[] = [
    {
        title: "Product Leader of the Year",
        issuer: "ProductCon 2024",
        logo: "/images/achievements/productcon.svg",
        date: "2024-10",
        category: "award",
        link: "https://productcon.com",
        context: "Recognised for AI product leadership and shipping impact across 3M+ users.",
    },
    {
        title: "AI Product Fundamentals",
        issuer: "Reforge",
        logo: "/images/achievements/reforge.svg",
        date: "2024-07",
        category: "cert",
        link: "https://reforge.com",
        context: "Completed 8-week program on building AI-native products.",
    },
    {
        title: "Speaker — Product at Scale",
        issuer: "Mind the Product London",
        logo: "/images/achievements/mtp.svg",
        date: "2024-05",
        category: "speaking",
        link: "https://mindtheproduct.com",
        context: "Talked on 'Building Evaluation Frameworks for AI Products' to 800+ PMs.",
    },
];

export const testimonials: Testimonial[] = [
    {
        name: "Sarah Chen",
        role: "VP Product",
        company: "TechScale Inc.",
        avatar: "/images/testimonials/sarah.jpg",
        quote:
            "Alex has the rare combination of sharp product instinct and execution rigour. They shipped our AI search in 10 months while maintaining team health and stakeholder trust. One of the best PMs I've worked with.",
    },
    {
        name: "Marcus Webb",
        role: "CTO",
        company: "GrowthOS",
        avatar: "/images/testimonials/marcus.jpg",
        quote:
            "What sets Alex apart is their ability to translate ambiguous business goals into crisp specs the engineering team can execute on. They cut the noise, protect scope, and ship things that actually move metrics.",
    },
    {
        name: "Priya Sharma",
        role: "CEO & Co-Founder",
        company: "MindfulCo",
        avatar: "/images/testimonials/priya.jpg",
        quote:
            "Alex took our wellness app from zero to 400K downloads in under a year. Their user research was exceptional — they found insights in data that completely changed our onboarding. I'd hire them again in a heartbeat.",
    },
];
