"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import Hero from "@/components/home/Hero";
import CompanyLogos from "@/components/home/CompanyLogos";
import PMToolkit from "@/components/home/PMToolkit";
import ImpactNumbers from "@/components/home/ImpactNumbers";

import GitHubDashboard from "@/components/home/GitHubDashboard";
import Testimonials from "@/components/home/Testimonials";
import Contact from "@/components/home/Contact";
import WorkHighlights from "@/components/home/WorkHighlights"; // Added back based on the trailing part

// We dynamically import complex animation timeline components with SSR false
// to avoid React hydration mismatches on mobile vs desktop.
const BookGallery = dynamic(() => import("@/components/home/BookGallery"), { ssr: false });
const ArticlesPreview = dynamic(() => import("@/components/home/ArticlesPreview"), { ssr: false });
const Timeline = dynamic(() => import("@/components/home/Timeline"), { ssr: false });
const AILabSection = dynamic(() => import("@/components/home/AILabSection"), { ssr: false });

export default function Home() {
    return (
        <main className="min-h-screen bg-[var(--background)] selection:bg-primary/30 selection:text-primary">
            {/* 1. Hero — first impression, photo + name */}
            <Hero />

            {/* 2. Social proof — logos build credibility immediately */}
            {/* <div className="section-divider" /> */}
            {/* <CompanyLogos /> */}

            {/* 3. PM Toolkit — tools I ship with */}

            <PMToolkit />

            {/* 4. Work — show don't tell, bento grid of projects */}

            <WorkHighlights />

            {/* 5. Impact Numbers — quantify the results */}

            <ImpactNumbers />

            {/* 6. AI Lab — experimental/creative side */}

            <AILabSection />

            {/* 7. GitHub Dashboard — technical credibility */}

            <GitHubDashboard />

            {/* 8. Timeline — career journey for context */}

            <Timeline />

            {/* 9. Testimonials — peer validation */}

            <Testimonials />

            {/* 10. Book Gallery — scrollable 3D interactive */}

            <BookGallery />

            {/* 11. Articles — latest writing */}

            <ArticlesPreview />

            {/* 12. Contact — final CTA */}

            <Contact />
        </main>
    );
}
