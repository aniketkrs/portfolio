import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: ["class", '[data-theme="dark"]'],
    theme: {
        extend: {
            fontFamily: {
                display: ["var(--font-cormorant)", "Georgia", "serif"],
                heading: ["var(--font-cabinet)", "system-ui", "sans-serif"],
                body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
                mono: ["var(--font-jetbrains)", "monospace"],
            },
            colors: {
                bg: "var(--bg)",
                "bg-surface": "var(--bg-surface)",
                "bg-card": "var(--bg-card)",
                "bg-hover": "var(--bg-hover)",
                accent: "var(--accent)",
                "accent-light": "var(--accent-light)",
                "accent-deep": "var(--accent-deep)",
                electric: "var(--electric)",
                teal: "var(--teal)",
                rose: "var(--rose)",
                "text-primary": "var(--text-primary)",
                "text-secondary": "var(--text-secondary)",
                "text-muted": "var(--text-muted)",
                border: "var(--border)",
                "border-hover": "var(--border-hover)",
            },
            borderRadius: {
                sm: "var(--radius-sm)",
                md: "var(--radius-md)",
                lg: "var(--radius-lg)",
                xl: "var(--radius-xl)",
                "2xl": "var(--radius-2xl)",
            },
            boxShadow: {
                card: "var(--shadow-card)",
                glow: "var(--shadow-glow)",
                "glow-blue": "var(--shadow-glow-blue)",
                "glow-teal": "var(--shadow-glow-teal)",
            },
        },
    },
    plugins: [],
};

export default config;
