"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function GSAPScrollEffects() {
    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        // Reveal all sections with scroll-driven fade + slide
        const sections = document.querySelectorAll("[data-gsap-reveal]");
        sections.forEach((section) => {
            gsap.fromTo(
                section,
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 88%",
                        end: "top 55%",
                        scrub: 1,
                    },
                }
            );
        });

        // Parallax floating elements
        const parallaxEls = document.querySelectorAll("[data-gsap-parallax]");
        parallaxEls.forEach((el) => {
            const speed = parseFloat(el.getAttribute("data-gsap-parallax") || "0.3");
            gsap.to(el, {
                y: () => speed * -200,
                ease: "none",
                scrollTrigger: {
                    trigger: el,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });
        });

        // Scale-in cards
        const cards = document.querySelectorAll("[data-gsap-card]");
        cards.forEach((card, i) => {
            gsap.fromTo(
                card,
                { opacity: 0, y: 50, scale: 0.96 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.7,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 90%",
                        toggleActions: "play none none none",
                    },
                    delay: i * 0.08,
                }
            );
        });

        // Text split reveal
        const textEls = document.querySelectorAll("[data-gsap-text]");
        textEls.forEach((el) => {
            gsap.fromTo(
                el,
                { opacity: 0, y: 40, clipPath: "inset(0 0 100% 0)" },
                {
                    opacity: 1,
                    y: 0,
                    clipPath: "inset(0 0 0% 0)",
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    },
                }
            );
        });

        // Horizontal line stretches
        const lines = document.querySelectorAll("[data-gsap-line]");
        lines.forEach((line) => {
            gsap.fromTo(
                line,
                { scaleX: 0 },
                {
                    scaleX: 1,
                    duration: 1.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: line,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                }
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    return null;
}
