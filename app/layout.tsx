import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import BottomNav from "@/components/layout/BottomNav";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
    style: ["normal", "italic"],
    variable: "--font-cormorant",
    display: "swap",
});

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    variable: "--font-dm-sans",
    display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    weight: ["400", "500"],
    variable: "--font-jetbrains",
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        default: "Alex Morgan — Senior Product Manager",
        template: "%s | Alex Morgan",
    },
    description:
        "Senior Product Manager with 8+ years shipping AI, platform, and consumer products. Led teams at scale, driven millions in revenue.",
    keywords: ["product manager", "senior PM", "AI products", "portfolio", "product strategy"],
    authors: [{ name: "Alex Morgan" }],
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://alexmorgan.pm",
        siteName: "Alex Morgan — Senior PM",
        title: "Alex Morgan — Senior Product Manager",
        description: "Senior Product Manager shipping AI, platform & consumer products at scale.",
        images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Alex Morgan — Senior PM",
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
            <body
                className={`${cormorant.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
            >
                <ThemeProvider>
                    <a href="#main-content" className="skip-to-content">
                        Skip to content
                    </a>
                    <Navbar />
                    <main id="main-content">{children}</main>
                    <Footer />
                    <BottomNav />
                </ThemeProvider>
            </body>
        </html>
    );
}
