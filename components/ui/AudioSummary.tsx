"use client";

import { useState, useRef, useCallback } from "react";
import { Volume2, Pause, Play } from "lucide-react";

interface AudioSummaryProps {
    text: string;
}

export default function AudioSummary({ text }: AudioSummaryProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    const handlePlay = useCallback(() => {
        if (!("speechSynthesis" in window)) return;

        if (isPaused) {
            window.speechSynthesis.resume();
            setIsPaused(false);
            setIsPlaying(true);
            return;
        }

        if (isPlaying) {
            window.speechSynthesis.pause();
            setIsPaused(true);
            setIsPlaying(false);
            return;
        }

        // Cancel any existing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        utterance.pitch = 1;
        utterance.volume = 0.9;

        // Try to use a natural voice
        const voices = window.speechSynthesis.getVoices();
        const preferred = voices.find(
            (v) => v.name.includes("Samantha") || v.name.includes("Google") || v.name.includes("Natural")
        );
        if (preferred) utterance.voice = preferred;

        utterance.onstart = () => {
            setIsPlaying(true);
            setIsPaused(false);
        };
        utterance.onend = () => {
            setIsPlaying(false);
            setIsPaused(false);
        };
        utterance.onerror = () => {
            setIsPlaying(false);
            setIsPaused(false);
        };

        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
    }, [text, isPlaying, isPaused]);

    const handleStop = useCallback(() => {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        setIsPaused(false);
    }, []);

    return (
        <div className="flex items-center gap-3">
            <button
                onClick={handlePlay}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 hover:scale-[1.02] active:scale-95"
                style={{
                    background: isPlaying
                        ? "rgba(242,105,13,0.15)"
                        : "rgba(var(--bg-surface-rgb, 30,30,30), 0.6)",
                    border: isPlaying
                        ? "1px solid rgba(242,105,13,0.3)"
                        : "1px solid rgba(255,255,255,0.08)",
                    color: isPlaying ? "#f2690d" : "var(--text-secondary)",
                    backdropFilter: "blur(12px)",
                }}
                aria-label={isPlaying ? "Pause audio summary" : "Play audio summary"}
            >
                {isPlaying ? (
                    <Pause className="w-3.5 h-3.5" />
                ) : isPaused ? (
                    <Play className="w-3.5 h-3.5" />
                ) : (
                    <Volume2 className="w-3.5 h-3.5" />
                )}
                {isPlaying ? "Pause" : isPaused ? "Resume" : "Listen to Summary"}
            </button>

            {(isPlaying || isPaused) && (
                <button
                    onClick={handleStop}
                    className="text-[10px] text-[var(--text-muted)] hover:text-primary transition-colors"
                >
                    Stop
                </button>
            )}

            {/* Audio wave animation */}
            {isPlaying && (
                <div className="flex items-center gap-[2px] h-4">
                    {[1, 2, 3, 4, 5].map((bar) => (
                        <div
                            key={bar}
                            className="w-[2px] bg-primary rounded-full"
                            style={{
                                animation: `audioWave 0.6s ease-in-out ${bar * 0.1}s infinite alternate`,
                                height: "100%",
                            }}
                        />
                    ))}
                </div>
            )}

            <style jsx>{`
                @keyframes audioWave {
                    0% { transform: scaleY(0.3); }
                    100% { transform: scaleY(1); }
                }
            `}</style>
        </div>
    );
}
