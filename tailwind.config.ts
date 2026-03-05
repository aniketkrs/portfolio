import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        screens: {
            sm: "500px",
            md: "1200px",
            lg: "1400px",
        },
        extend: {
            fontFamily: {
                display: ["var(--font-display)", "system-ui", "sans-serif"],
                mono: ["var(--font-mono)", "Courier New", "monospace"],
            },
            colors: {
                primary: {
                    DEFAULT: "#f2690d",
                    light: "#ff8534",
                    dark: "#d45500",
                },
                obsidian: "#0a0a0a",
                surface: {
                    DEFAULT: "#141414",
                    light: "#f8f7f5",
                    card: "#1a1a1a",
                },
                card: {
                    dark: "#141414",
                    light: "#ffffff",
                },
            },
            gridTemplateColumns: {
                "layout-xs": "repeat(4, minmax(0, 1fr))",
                "layout-sm": "repeat(8, minmax(0, 1fr))",
                "layout-md": "repeat(12, minmax(0, 1fr))",
            },
            borderRadius: {
                card: "24px",
                bento: "40px",
                command: "40px",
            },
            boxShadow: {
                glow: "0 0 30px rgba(242, 105, 13, 0.15)",
                "glow-lg": "0 0 60px rgba(242, 105, 13, 0.2)",
                command: "0 20px 50px -12px rgba(0, 0, 0, 0.5), 0 0 1px 1px rgba(255, 255, 255, 0.05)",
                bento: "0 8px 32px rgba(0, 0, 0, 0.12)",
            },
        },
    },
    plugins: [],
};

export default config;
