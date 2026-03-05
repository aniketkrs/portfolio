import type { Metadata } from "next";
import Script from "next/script";
import { Space_Grotesk, JetBrains_Mono, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import BottomNav from "@/components/layout/BottomNav";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import GSAPScrollEffects from "@/components/ui/GSAPScrollEffects";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-display",
    display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    weight: ["400", "500"],
    variable: "--font-mono",
    display: "swap",
});

const playfairDisplay = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
    style: ["normal", "italic"],
    variable: "--font-serif",
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        default: "Aniket — Senior Product Manager",
        template: "%s | Aniket",
    },
    description:
        "Senior Product Manager with 8+ years shipping AI, platform, and consumer products. Led teams at scale, driven millions in revenue.",
    keywords: ["product manager", "senior PM", "AI products", "portfolio", "product strategy"],
    authors: [{ name: "Aniket" }],
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://aniket.pm",
        siteName: "Aniket — Senior PM",
        title: "Aniket — Senior Product Manager",
        description: "Senior Product Manager shipping AI, platform & consumer products at scale.",
        images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Aniket — Senior PM",
        description: "Senior PM shipping AI, platform & consumer products.",
        images: ["/og-image.png"],
    },
    robots: { index: true, follow: true },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <Script
                    src="https://t.contentsquare.net/uxa/60502703a0b2d.js"
                    strategy="afterInteractive"
                />
            </head>
            <body
                className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${playfairDisplay.variable}`}
                suppressHydrationWarning
            >
                <ThemeProvider>
                    <a href="#main-content" className="skip-to-content">
                        Skip to content
                    </a>

                    {/* Overlays & Effects */}
                    <ScrollProgress />
                    <GSAPScrollEffects />
                    <CustomCursor />
                    <div className="grain-overlay" />
                    <div className="grid-lines">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <span
                                key={i}
                                className={`grid-line-span ${i >= 4 && i < 8 ? 'hidden sm:block' : i >= 8 ? 'hidden md:block' : ''}`}
                            />
                        ))}
                    </div>

                    <main id="main-content" suppressHydrationWarning>{children}</main>
                    <Footer />
                    <BottomNav />
                </ThemeProvider>
            </body>
        </html>
    );
}
