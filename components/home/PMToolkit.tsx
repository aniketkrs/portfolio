"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Wrench } from "lucide-react";

// LobeHub icon imports
import Aws_Color from '@lobehub/icons/es/Aws/components/Color';
import GoogleCloud_Color from '@lobehub/icons/es/GoogleCloud/components/Color';
import Anthropic_Mono from '@lobehub/icons/es/Anthropic/components/Mono';
import DeepSeek_Color from '@lobehub/icons/es/DeepSeek/components/Color';
import Github_Mono from '@lobehub/icons/es/Github/components/Mono';
import V0_Mono from '@lobehub/icons/es/V0/components/Mono';
import Claude_Color from '@lobehub/icons/es/Claude/components/Color';
import Gemma_Color from '@lobehub/icons/es/Gemma/components/Color';
import OpenClaw_Color from '@lobehub/icons/es/OpenClaw/components/Color';
import DeepMind_Color from '@lobehub/icons/es/DeepMind/components/Color';
import Lovable_Color from '@lobehub/icons/es/Lovable/components/Color';
import Perplexity_Color from '@lobehub/icons/es/Perplexity/components/Color';
import Mistral_Color from '@lobehub/icons/es/Mistral/components/Color';
import Qwen_Color from '@lobehub/icons/es/Qwen/components/Color';
import SearchApi_Mono from '@lobehub/icons/es/SearchApi/components/Mono';
import Sora_Color from '@lobehub/icons/es/Sora/components/Color';
import VertexAI_Color from '@lobehub/icons/es/VertexAI/components/Color';
import Minimax_Color from '@lobehub/icons/es/Minimax/components/Color';
import Codex_Color from '@lobehub/icons/es/Codex/components/Color';
import Ollama_Mono from '@lobehub/icons/es/Ollama/components/Mono';
import Manus_Mono from '@lobehub/icons/es/Manus/components/Mono';
import N8n_Color from '@lobehub/icons/es/N8n/components/Color';
import Figma_Color from '@lobehub/icons/es/Figma/components/Color';
import ClaudeCode_Color from '@lobehub/icons/es/ClaudeCode/components/Color';
import OpenAI_Mono from '@lobehub/icons/es/OpenAI/components/Mono';
import Railway_Mono from '@lobehub/icons/es/Railway/components/Mono';
import Replit_Color from '@lobehub/icons/es/Replit/components/Color';
import GithubCopilot_Mono from '@lobehub/icons/es/GithubCopilot/components/Mono';
import MCP_Mono from '@lobehub/icons/es/MCP/components/Mono';
import Cursor_Mono from '@lobehub/icons/es/Cursor/components/Mono';
import NotebookLM_Mono from '@lobehub/icons/es/NotebookLM/components/Mono';
import ZAI_Mono from '@lobehub/icons/es/ZAI/components/Mono';
import OpenCode_Mono from '@lobehub/icons/es/OpenCode/components/Mono';
import Kling_Color from '@lobehub/icons/es/Kling/components/Color';
import Coze_Mono from '@lobehub/icons/es/Coze/components/Mono';
import CapCut_Mono from '@lobehub/icons/es/CapCut/components/Mono';
import Adobe_Color from '@lobehub/icons/es/Adobe/components/Color';
import AdobeFirefly_Color from '@lobehub/icons/es/AdobeFirefly/components/Color';
import Windsurf_Mono from '@lobehub/icons/es/Windsurf/components/Mono';

const IC = ({ children }: { children: React.ReactNode }) => (
    <div className="w-full h-full flex items-center justify-center grayscale transition-all duration-300 filter group-hover:grayscale-0 group-hover:scale-110">
        {children}
    </div>
);

/* ─── PM Tool Icons ─── */
const toolData = [
    { name: "AWS", color: "#FF9900", svg: <IC><Aws_Color size="65%" /></IC> },
    { name: "Google Cloud", color: "#4285F4", svg: <IC><GoogleCloud_Color size="65%" /></IC> },
    { name: "Anthropic", color: "#D97757", svg: <IC><Anthropic_Mono size="65%" /></IC> },
    { name: "DeepSeek", color: "#4D6BFE", svg: <IC><DeepSeek_Color size="65%" /></IC> },
    { name: "GitHub", color: "#333", svg: <IC><Github_Mono size="65%" /></IC> },
    { name: "v0", color: "#000", svg: <IC><V0_Mono size="65%" /></IC> },
    { name: "Claude", color: "#D97757", svg: <IC><Claude_Color size="65%" /></IC> },
    { name: "Gemma", color: "#446EFF", svg: <IC><Gemma_Color size="65%" /></IC> },
    { name: "OpenClaw", color: "#FF4D4D", svg: <IC><OpenClaw_Color size="65%" /></IC> },
    { name: "DeepMind", color: "#4285F4", svg: <IC><DeepMind_Color size="65%" /></IC> },
    { name: "Lovable", color: "#FE4230", svg: <IC><Lovable_Color size="65%" /></IC> },
    { name: "Perplexity", color: "#22B8CD", svg: <IC><Perplexity_Color size="65%" /></IC> },
    { name: "Mistral", color: "#FF8205", svg: <IC><Mistral_Color size="65%" /></IC> },
    { name: "Qwen", color: "#6336E7", svg: <IC><Qwen_Color size="65%" /></IC> },
    { name: "Google Analytics", color: "#E37400", svg: <IC><svg width="100%" height="100%" viewBox="0 0 400 443" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#ga-clip)"><path fillRule="evenodd" clipRule="evenodd" d="M399.997 387.39C400.162 417.792 375.644 442.547 345.259 442.71C343.001 442.729 340.722 442.601 338.483 442.328C310.285 438.156 289.629 413.619 290.32 385.13V57.5763C289.646 29.0501 310.358 4.51434 338.573 0.379001C368.756 -3.15457 396.098 18.448 399.632 48.6321C399.887 50.8546 400.015 53.077 399.996 55.3167V387.389L399.997 387.39Z" fill="#F9AB00" /><path fillRule="evenodd" clipRule="evenodd" d="M54.8474 333.107C85.1404 333.107 109.695 357.661 109.695 387.954C109.695 418.247 85.1404 442.802 54.8474 442.802C24.5543 442.802 0 418.247 0 387.954C0 357.661 24.5543 333.107 54.8474 333.107ZM199.152 166.888C168.715 168.563 145.106 194.084 145.817 224.559V371.869C145.817 411.852 163.413 436.116 189.188 441.289C218.935 447.318 247.916 428.1 253.945 398.354C254.692 394.711 255.056 391.014 255.037 387.298V222.009C255.092 191.607 230.502 166.924 200.1 166.871C199.79 166.871 199.462 166.871 199.152 166.89V166.888Z" fill="#E37400" /></g><defs><clipPath id="ga-clip"><rect width="400" height="442.8" fill="white" /></clipPath></defs></svg></IC> },
    { name: "SearchAPI", color: "#000", svg: <IC><SearchApi_Mono size="65%" /></IC> },
    { name: "Sora", color: "#0968DA", svg: <IC><Sora_Color size="65%" /></IC> },
    { name: "Vertex AI", color: "#4285F4", svg: <IC><VertexAI_Color size="65%" /></IC> },
    { name: "Minimax", color: "#E2167E", svg: <IC><Minimax_Color size="65%" /></IC> },
    { name: "Codex", color: "#3941FF", svg: <IC><Codex_Color size="65%" /></IC> },
    { name: "Ollama", color: "#333", svg: <IC><Ollama_Mono size="65%" /></IC> },
    { name: "Manus", color: "#3b82f6", svg: <IC><Manus_Mono size="65%" /></IC> },
    { name: "n8n", color: "#EA4B71", svg: <IC><N8n_Color size="65%" /></IC> },
    { name: "Figma", color: "#874FFF", svg: <IC><Figma_Color size="65%" /></IC> },
    { name: "Claude Code", color: "#D97757", svg: <IC><ClaudeCode_Color size="65%" /></IC> },
    { name: "OpenAI", color: "#333", svg: <IC><OpenAI_Mono size="65%" /></IC> },
    { name: "Linear", color: "#5E6AD2", svg: <IC><svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" width="65%" height="65%"><path d="M1.22541 61.5228c-.2225-.9485.90748-1.5459 1.59638-.857L39.3342 97.1782c.6889.6889.0915 1.8189-.857 1.5964C20.0515 94.4522 5.54779 79.9485 1.22541 61.5228ZM.00189135 46.8891c-.01764375.2833.08887 .5599.28957.7606L52.3503 99.7085c.2007.2007.4773.3073.7606.2957C74.919 98.8249 92.8249 80.919 94.0042 58.8891c.0116-.2833-.0949-.5599-.2956-.7606L1.71476 5.13064c-.20069-.20069-.47735-.30721-.76064-.29574C-1.0151 6.49451-1.78847 25.8182.00189135 46.8891ZM7.23581 9.12434c-.47813-.47813-.50834-1.24048-.02448-1.74253C15.9881 -1.48572 29.058 -3.20484 39.8869 2.62868l-32.65109 6.49566Z" fill="#5E6AD2" /></svg></IC> },
    { name: "Replit", color: "#FD5402", svg: <IC><Replit_Color size="65%" /></IC> },
    { name: "Railway", color: "#333", svg: <IC><Railway_Mono size="65%" /></IC> },
    { name: "GitHub Copilot", color: "#333", svg: <IC><GithubCopilot_Mono size="65%" /></IC> },
    { name: "MCP", color: "#333", svg: <IC><MCP_Mono size="65%" /></IC> },
    { name: "Cursor", color: "#333", svg: <IC><Cursor_Mono size="65%" /></IC> },
    { name: "NotebookLM", color: "#4285F4", svg: <IC><NotebookLM_Mono size="65%" /></IC> },
    { name: "ZAI", color: "#333", svg: <IC><ZAI_Mono size="65%" /></IC> },
    { name: "OpenCode", color: "#333", svg: <IC><OpenCode_Mono size="65%" /></IC> },
    { name: "Kling", color: "#333", svg: <IC><Kling_Color size="65%" /></IC> },
    { name: "Coze", color: "#4473FF", svg: <IC><Coze_Mono size="65%" /></IC> },
    { name: "CapCut", color: "#333", svg: <IC><CapCut_Mono size="65%" /></IC> },
    { name: "Adobe", color: "#FF0000", svg: <IC><Adobe_Color size="65%" /></IC> },
    { name: "Adobe Firefly", color: "#D77655", svg: <IC><AdobeFirefly_Color size="65%" /></IC> },
    { name: "Windsurf", color: "#3b82f6", svg: <IC><Windsurf_Mono size="65%" /></IC> },
];



export default function PMToolkit() {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <section className="relative w-full bg-[var(--background)] py-12 md:py-16 items-center flex flex-col justify-center min-h-[20vh] z-0">

            {/* MASSIVE BACKGROUND TYPOGRAPHY */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0 opacity-[0.12] dark:opacity-[0.15]">
                <span className="text-[6vw] md:text-[5vw] lg:text-[6vw] font-display font-black uppercase tracking-tighter leading-none text-[var(--text-primary)]">
                    TOOLKIT
                </span>
            </div>



            {/* Sleek Continuous Marquee — edge fade via mask-image, no overflow clip needed */}
            <div className="w-full marquee-fade relative z-10 flex">
                <div className="flex marquee-track w-max gap-6 md:gap-10 py-6 md:py-10 px-8 items-center">
                    {[...toolData, ...toolData].map((tool, i) => {
                        return (
                            <motion.div
                                key={`${tool.name}-${i}`}
                                className="relative flex flex-col items-center justify-center w-14 md:w-16 rounded-2xl cursor-pointer group flex-shrink-0 transition-all duration-300 hover:-translate-y-2 z-10 hover:z-20 border pb-1 md:pb-0"
                                style={{
                                    backgroundColor: hovered === i ? `color-mix(in srgb, ${tool.color} 15%, color-mix(in srgb, var(--bg-surface) 75%, transparent))` : "var(--bg-surface)",
                                    borderColor: hovered === i ? `color-mix(in srgb, ${tool.color} 40%, transparent)` : "var(--border)",
                                    backdropFilter: hovered === i ? "blur(12px)" : undefined,
                                    WebkitBackdropFilter: hovered === i ? "blur(12px)" : undefined,
                                    boxShadow: hovered === i
                                        ? `0 8px 32px color-mix(in srgb, ${tool.color} 25%, transparent), 0 2px 8px rgba(0,0,0,0.10)`
                                        : undefined,
                                }}
                                onHoverStart={() => setHovered(i)}
                                onHoverEnd={() => setHovered(null)}
                            >
                                {/* Icon */}
                                <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center pointer-events-none p-2.5 flex-shrink-0">
                                    {tool.svg}
                                </div>

                                {/* Mobile-only persistent label below icon */}
                                <span
                                    className="block md:hidden text-[9px] font-semibold tracking-wide uppercase text-center leading-tight px-1 pb-1.5 max-w-[60px] truncate text-[var(--text-secondary)] dark:text-[var(--text-muted)]"
                                >
                                    {tool.name.length > 8 ? tool.name.slice(0, 7) + '…' : tool.name}
                                </span>

                                {/* Desktop-only hover tooltip */}
                                <div className="hidden md:block absolute top-[68px] opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none -translate-y-2 group-hover:translate-y-0 z-50">
                                    <span
                                        className="bg-[var(--bg-surface)] border border-[var(--border)] text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full shadow-lg whitespace-nowrap backdrop-blur-xl"
                                        style={{ color: tool.color }}
                                    >
                                        {tool.name}
                                    </span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
