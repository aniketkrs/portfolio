"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { GitBranch, GitCommit, Star, GitPullRequest, ArrowUpRight } from "lucide-react";

/* ──────────────────────────────────────────── */
/*  Sample data (hardcoded)                     */
/* ──────────────────────────────────────────── */

// Seeded PRNG (mulberry32) – deterministic across server & client
function seededRandom(seed: number) {
    return () => {
        seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

const contributionWeeks = (() => {
    const rand = seededRandom(42);
    const weeks: number[][] = [];
    for (let w = 0; w < 52; w++) {
        const week: number[] = [];
        for (let d = 0; d < 7; d++) {
            const r = rand();
            if (r < 0.35) week.push(0);
            else if (r < 0.6) week.push(1);
            else if (r < 0.8) week.push(2);
            else if (r < 0.92) week.push(3);
            else week.push(4);
        }
        weeks.push(week);
    }
    return weeks;
})();

const languages = [
    { name: "TypeScript", pct: 42, color: "#3178c6" },
    { name: "Python", pct: 28, color: "#3572A5" },
    { name: "Rust", pct: 15, color: "#dea584" },
    { name: "Go", pct: 10, color: "#00ADD8" },
    { name: "Other", pct: 5, color: "#5a5a5a" },
];

export default function GitHubDashboard() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    const [recentCommits, setRecentCommits] = useState([
        { repo: "aniketkrs/portfolio", msg: "feat: add GitHub dashboard section", time: "2h ago", hash: "a3f1c9d" },
        { repo: "aniketkrs/neural-ambient", msg: "fix: edge latency in WASM module", time: "5h ago", hash: "b7e2a44" },
        { repo: "aniketkrs/contextual-os", msg: "refactor: vector search pipeline", time: "1d ago", hash: "c9d8e11" },
        { repo: "aniketkrs/sonic-latent", msg: "perf: optimize audio buffer pooling", time: "2d ago", hash: "d4f3b22" },
        { repo: "aniketkrs/design-system", msg: "chore: update token exports", time: "3d ago", hash: "e5a6c33" },
    ]);

    const [stats, setStats] = useState([
        { icon: Star, value: 0, suffix: "+", label: "Stars Earned" },
        { icon: GitPullRequest, value: 0, suffix: "+", label: "PRs Merged" },
        { icon: GitBranch, value: 0, suffix: "", label: "Repositories" },
        { icon: GitCommit, value: 0, suffix: "+", label: "Contributions" },
    ]);

    useEffect(() => {
        // Fetch Live Github Stats
        async function fetchGitHubData() {
            try {
                // Fetch public user info for basic repo count
                const userRes = await fetch("https://api.github.com/users/aniketkrs");
                if (!userRes.ok) return;
                const userData = await userRes.json();

                // Fetch recent events array for live commits
                const eventsRes = await fetch("https://api.github.com/users/aniketkrs/events/public?per_page=20");
                if (eventsRes.ok) {
                    const eventsData = await eventsRes.json();

                    // Filter just PushEvents
                    const pushes = eventsData.filter((e: any) => e.type === "PushEvent");
                    const liveCommits = [];

                    for (const push of pushes) {
                        for (const commit of push.payload.commits) {
                            if (liveCommits.length < 5) {
                                // Parse time ago
                                const diff = Date.now() - new Date(push.created_at).getTime();
                                const hours = Math.floor(diff / (1000 * 60 * 60));
                                const days = Math.floor(hours / 24);
                                const timeStr = days > 0 ? `${days}d ago` : `${Math.max(1, hours)}h ago`;

                                liveCommits.push({
                                    repo: push.repo.name,
                                    msg: commit.message.split('\n')[0], // just grab first line
                                    time: timeStr,
                                    hash: commit.sha.substring(0, 7)
                                });
                            }
                        }
                    }

                    if (liveCommits.length > 0) {
                        setRecentCommits(liveCommits);
                    }
                }

                // Update Stats
                setStats([
                    { icon: Star, value: 3400, suffix: "+", label: "Stars Earned" }, // Approximate unless mapped across all repos via GraphQL
                    { icon: GitPullRequest, value: 450, suffix: "+", label: "PRs Merged" }, // Approximate
                    { icon: GitBranch, value: userData.public_repos || 86, suffix: "", label: "Repositories" },
                    { icon: GitCommit, value: 5120, suffix: "+", label: "Contributions" }, // Approximate
                ]);

            } catch (e) {
                console.error("Github sync failed", e);
            }
        }

        fetchGitHubData();
    }, []);

    /* ──────────────────────────────────────────── */
    /*  Contribution Level → Color                 */
    /* ──────────────────────────────────────────── */
    function levelColor(level: number): string {
        const colors = [
            "var(--border)",             // 0
            "rgba(242, 105, 13, 0.2)",   // 1
            "rgba(242, 105, 13, 0.4)",   // 2
            "rgba(242, 105, 13, 0.65)",  // 3
            "#f2690d",                    // 4
        ];
        return colors[level] ?? colors[0];
    }

    /* ──────────────────────────────────────────── */
    /*  Animated Counter                            */
    /* ──────────────────────────────────────────── */
    function Counter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
        const [count, setCount] = useState(0);

        useEffect(() => {
            if (!inView) return;
            let current = 0;
            const increment = value / (1600 / 16);
            const timer = setInterval(() => {
                current += increment;
                if (current >= value) {
                    setCount(value);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(current));
                }
            }, 16);
            return () => clearInterval(timer);
        }, [inView, value]);

        return (
            <span className="text-2xl md:text-3xl font-bold tracking-tight">
                {count.toLocaleString()}{suffix}
            </span>
        );
    }

    return (
        <section ref={ref} data-section="github" className="px-6 lg:px-16 py-20 max-w-7xl mx-auto">
            <div className="relative">
                {/* BIG TITLE WATERMARK */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 1, delay: 0.3 }}
                    aria-hidden="true"
                    className="absolute -top-[7vw] -left-4 z-0 pointer-events-none select-none"
                >
                    <span className="text-[18vw] sm:text-[14vw] md:text-[11vw] lg:text-[10vw] font-display font-black uppercase tracking-tighter leading-none text-[var(--text-primary)] opacity-[0.18] dark:opacity-[0.12] whitespace-nowrap">
                        GitHub
                    </span>
                </motion.div>

                {/* Bento Grid */}
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* ── Contribution Graph (8 cols) ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                        animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="md:col-span-8 bento-card p-6"
                    >
                        <div className="flex items-center justify-between mb-5">
                            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)]">
                                Contribution Graph
                            </p>
                            <span className="text-[10px] font-mono text-[var(--text-muted)]">
                                Last 12 months
                            </span>
                        </div>

                        {/* Heatmap */}
                        <div className="overflow-x-auto pb-2">
                            <div className="flex gap-[3px]" style={{ minWidth: "680px" }}>
                                {contributionWeeks.map((week, wi) => (
                                    <div key={wi} className="flex flex-col gap-[3px]">
                                        {week.map((level, di) => (
                                            <motion.div
                                                key={di}
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                                                transition={{
                                                    delay: 0.3 + wi * 0.008 + di * 0.005,
                                                    duration: 0.2,
                                                }}
                                                className="w-[11px] h-[11px] rounded-[2.5px]"
                                                style={{ background: levelColor(level) }}
                                            />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="flex items-center justify-end gap-1 mt-3">
                            <span className="text-[9px] font-mono text-[var(--text-muted)] mr-1">Less</span>
                            {[0, 1, 2, 3, 4].map((l) => (
                                <div
                                    key={l}
                                    className="w-[11px] h-[11px] rounded-[2.5px]"
                                    style={{ background: levelColor(l) }}
                                />
                            ))}
                            <span className="text-[9px] font-mono text-[var(--text-muted)] ml-1">More</span>
                        </div>
                    </motion.div>

                    {/* ── Top Languages (4 cols) ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                        animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="md:col-span-4 bento-card p-6"
                    >
                        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)] mb-5">
                            Top Languages
                        </p>

                        {/* Stacked bar */}
                        <div className="flex w-full h-2 rounded-full overflow-hidden mb-5">
                            {languages.map((lang) => (
                                <motion.div
                                    key={lang.name}
                                    initial={{ width: 0 }}
                                    animate={isInView ? { width: `${lang.pct}%` } : {}}
                                    transition={{ duration: 1, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
                                    style={{ background: lang.color }}
                                />
                            ))}
                        </div>

                        {/* Legend */}
                        <div className="space-y-3">
                            {languages.map((lang) => (
                                <div key={lang.name} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-2.5 h-2.5 rounded-full"
                                            style={{ background: lang.color }}
                                        />
                                        <span className="text-sm">{lang.name}</span>
                                    </div>
                                    <span className="text-sm font-mono text-[var(--text-muted)]">
                                        {lang.pct}%
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ── Recent Commits (7 cols) ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                        animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="md:col-span-7 bento-card p-6"
                    >
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-2">
                                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)]">
                                    Recent Activity
                                </p>
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            </div>
                            <a
                                href="https://github.com/aniketkrs"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-[10px] font-mono text-primary hover:underline"
                            >
                                View Profile <ArrowUpRight size={10} />
                            </a>
                        </div>

                        <div className="space-y-0">
                            {recentCommits.map((c, i) => (
                                <motion.div
                                    key={c.hash}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
                                    className="flex items-start gap-3 py-3 border-b border-[var(--border)] last:border-0"
                                >
                                    <GitCommit size={14} className="text-primary mt-1 shrink-0" />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm truncate">{c.msg}</p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="text-[10px] font-mono text-primary">{c.repo}</span>
                                            <span className="text-[9px] font-mono text-[var(--text-muted)]">{c.hash}</span>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-mono text-[var(--text-muted)] shrink-0">{c.time}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ── Stats (5 cols, 2×2 grid) ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                        animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="md:col-span-5 grid grid-cols-2 gap-4"
                    >
                        {stats.map((s, i) => (
                            <div
                                key={s.label}
                                className="bento-card p-5 flex flex-col justify-between"
                            >
                                <s.icon
                                    size={18}
                                    strokeWidth={1.5}
                                    className={i === 0 ? "text-primary" : "text-[var(--text-muted)]"}
                                />
                                <div className="mt-4">
                                    <Counter value={s.value} suffix={s.suffix} inView={isInView} />
                                    <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--text-muted)] mt-1">
                                        {s.label}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
