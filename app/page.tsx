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
            <div className="section-divider" />
            <PMToolkit />

            {/* 4. Work — show don't tell, bento grid of projects */}
            <div className="section-divider" />
            <WorkHighlights />

            {/* 5. Impact Numbers — quantify the results */}
            <div className="section-divider" />
            <ImpactNumbers />

            {/* 6. AI Lab — experimental/creative side */}
            <div className="section-divider" />
            <AILabSection />

            {/* 7. GitHub Dashboard — technical credibility */}
            <div className="section-divider" />
            <GitHubDashboard />

            {/* 8. Timeline — career journey for context */}
            <div className="section-divider" />
            <Timeline />

            {/* 9. Testimonials — peer validation */}
            <div className="section-divider" />
            <Testimonials />

            {/* 10. Book Gallery — scrollable 3D interactive */}
            <div className="section-divider" />
            <BookGallery />

            {/* 11. Articles — latest writing */}
            <div className="section-divider" />
            <ArticlesPreview />

            {/* 12. Contact — final CTA */}
            <div className="section-divider" />
            <Contact />
        </main>
    );
}
