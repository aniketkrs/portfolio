import Hero from "@/components/home/Hero";
import CompanyLogos from "@/components/home/CompanyLogos";
import WorkHighlights from "@/components/home/WorkHighlights";
import ImpactNumbers from "@/components/home/ImpactNumbers";
import AIPreview from "@/components/home/AIPreview";
import Timeline from "@/components/home/Timeline";
import Testimonials from "@/components/home/Testimonials";
import Contact from "@/components/home/Contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Alex Morgan — Senior Product Manager",
    description: "Senior PM shipping AI, platform & consumer products at scale. 8+ years, 8M+ users, $40M+ ARR driven.",
};

export default function HomePage() {
    return (
        <>
            <Hero />

            {/* Divider */}
            <div className="section-divider" />

            <CompanyLogos />

            {/* Divider */}
            <div className="section-divider" />

            <WorkHighlights />

            {/* Divider */}
            <div className="section-divider" />

            <AIPreview />

            {/* Divider */}
            <div className="section-divider" />

            <ImpactNumbers />

            {/* Divider */}
            <div className="section-divider" />

            <Timeline />

            {/* Divider */}
            <div className="section-divider" />

            <Testimonials />

            {/* Divider */}
            <div className="section-divider" />

            <Contact />
        </>
    );
}
