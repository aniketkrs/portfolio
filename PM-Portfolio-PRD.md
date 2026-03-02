# PM Portfolio — Full PRD & Design System
> Version 1.0 · Senior Product Manager Personal Brand Platform

---

## Table of Contents

1. [Product Vision & Overview](#1-product-vision--overview)
2. [Design System — "Ink & Ember"](#2-design-system--ink--ember)
3. [Site Architecture & Navigation](#3-site-architecture--navigation)
4. [Section-by-Section PRD](#4-section-by-section-prd)
   - [Home / Hero](#41-home--hero)
   - [About Me](#42-about-me)
   - [Work / Projects](#43-work--projects)
   - [Side Projects](#44-side-projects)
   - [AI Playground](#45-ai-playground)
   - [Bookshelf & Articles](#46-bookshelf--articles)
   - [Achievements](#47-achievements)
   - [Tools](#48-tools)
5. [Case Study Page Template](#5-case-study-page-template)
6. [AI Section — Deep PRD](#6-ai-section--deep-prd)
7. [Master Developer Prompt](#7-master-developer-prompt)
8. [Build Order & Commands](#8-build-order--commands)

---

## 1. Product Vision & Overview

### What This Is

A senior Product Manager's personal brand platform — not a resume site, not a blog, not a portfolio template. A **living product** that demonstrates craft, depth, and execution ability in the same breath that it claims them.

Every section is proof of work. Every number is real. Every page exists to answer one question a specific reader has.

### The North Star

> A recruiter at a top-tier company, a startup founder with a hard problem, or a VC scouting operator talent lands on this site and thinks **"this person ships"** within 30 seconds — and stays for 10 minutes.

### Target Personas

| Persona | Goal on Site | Key Sections |
|---|---|---|
| Recruiting PM / Director | Validate seniority, culture fit, product craft | Work, Case Studies, Achievements |
| Startup Founder / CEO | Find a domain expert for a specific hard problem | AI Playground, Work, About |
| Fellow PM / Community | Learn frameworks, steal ideas, get inspired | Articles, Bookshelf, Tools |
| VC / Operator Scout | Assess product instinct + range + builder DNA | Side Projects, AI Playground |
| Conference Organiser | Verify credibility + speaking topics | Achievements, Articles |

### Success Metrics (KPIs)

| Metric | Target | How Measured |
|---|---|---|
| Avg. session duration | > 3 min | Analytics |
| Case study read-through rate | > 60% | Scroll depth events |
| Resume / Contact CTA click rate | > 15% | Click tracking |
| Return visitor rate | > 25% | Session cookies |
| Qualified inbound leads / month | > 3 | Contact form submissions |
| Google rank for own name | Top 3 | Search Console |

### Guiding Principles

**Show, Don't Tell** — Every claim about PM skill is backed by a concrete example, metric, or artefact in the same breath.

**Depth over Breadth** — 10 well-documented projects beat 30 name-drops. Each case study has its own page with its own URL.

**Living Document** — The site looks actively maintained. Dates are visible. New badges appear on recent additions. "Currently reading" updates.

**The Site Is the Product Demo** — Sub-2s LCP, zero layout shift, 60fps animations. Performance is a feature, not an afterthought.

**Accessible & Inclusive** — WCAG 2.1 AA minimum. Works without JavaScript. Keyboard navigable throughout. Dark + light mode.

---

## 2. Design System — "Ink & Ember"

### The Aesthetic Direction

**"Editorial Intelligence"** — The design sensibility of a Bloomberg Businessweek cover meets a Stripe product page. Not a developer portfolio (no neon on black). Not a creative agency (no visual chaos). A senior operator who cares about both craft and measurable outcomes.

The palette references old typeset printing — deep ink tones lit by warm amber. The colour of late-night product thinking.

---

### Colour Palette

#### Core Tokens

| Token | Hex | RGB | Usage |
|---|---|---|---|
| `--bg` | `#0D0F1A` | 13, 15, 26 | Page background |
| `--bg-surface` | `#13152A` | 19, 21, 42 | Section containers, sidebars |
| `--bg-card` | `#181B30` | 24, 27, 48 | Cards, modals, tooltips |
| `--bg-hover` | `#1E2238` | 30, 34, 56 | Hover states on cards |
| `--accent` | `#E8A838` | 232, 168, 56 | Primary accent — CTAs, numbers, section labels |
| `--accent-light` | `#F2C46D` | 242, 196, 109 | Hover state of amber, lighter text on dark |
| `--accent-deep` | `#B07D1A` | 176, 125, 26 | Pressed state, decorative underlines |
| `--electric` | `#4D79FF` | 77, 121, 255 | AI/tech features, links, secondary hover |
| `--teal` | `#2DD4BF` | 45, 212, 191 | Success, live indicators, AI outputs |
| `--rose` | `#FB7185` | 251, 113, 133 | Alerts, hot/trending badges |
| `--text-primary` | `#F0F2FF` | 240, 242, 255 | Headings, key body copy |
| `--text-secondary` | `#8B90B8` | 139, 144, 184 | Body copy, descriptions |
| `--text-muted` | `#4A4F6E` | 74, 79, 110 | Metadata, timestamps, sub-labels |
| `--border` | `#1F2440` | 31, 36, 64 | All dividers, card outlines |
| `--border-hover` | `#2E3459` | 46, 52, 89 | Border on hover / focus |

#### Light Mode Overrides (next-themes)

| Token | Light Value |
|---|---|
| `--bg` | `#F4F3EF` |
| `--bg-surface` | `#ECEAE3` |
| `--bg-card` | `#FFFFFF` |
| `--text-primary` | `#0D0F1A` |
| `--text-secondary` | `#3D4265` |
| `--text-muted` | `#8B90B8` |
| `--border` | `#DDD9CE` |

#### Colour Usage Rules

```
bg → bg-surface → bg-card       Layer depth. Never skip levels.
accent (Amber)                   CTAs, key metrics, section labels, pulse accents.
electric (Blue)                  AI/tech features, links, secondary actions.
teal                             Success, live/online states, AI response indicators.
rose                             Warnings, trending, limited availability signals.
text-primary → secondary → muted Hierarchy. Never jump more than one level.
border / border-hover            All outlines. Never use black borders directly.
```

---

### Typography System

#### Font Pairing

| Role | Family | Weights | Google Fonts Import |
|---|---|---|---|
| Display / Titles | Cormorant Garamond | 400, 600, 700 | `family=Cormorant+Garamond:wght@400;600;700` |
| Headings / UI | Cabinet Grotesk | 500, 600, 700, 800 | fontsource or self-host |
| Body Copy | DM Sans | 300, 400, 500, 600 | `family=DM+Sans:wght@300;400;500;600` |
| Code / Mono | JetBrains Mono | 400, 500 | `family=JetBrains+Mono:wght@400;500` |

#### Type Scale

| Token | Size | Font | Weight | Usage |
|---|---|---|---|---|
| `display-2xl` | clamp(4rem, 8vw, 7rem) | Cormorant | 700 | Hero name |
| `display-xl` | clamp(3rem, 5vw, 5rem) | Cormorant | 700 | Page titles |
| `display-lg` | clamp(2.25rem, 3.5vw, 3.5rem) | Cormorant | 600 | Section headings |
| `heading-xl` | clamp(1.5rem, 2.5vw, 2.25rem) | Cabinet Grotesk | 700 | Sub-headings |
| `heading-lg` | clamp(1.25rem, 2vw, 1.75rem) | Cabinet Grotesk | 600 | Card titles |
| `body-lg` | 1.125rem | DM Sans | 400 | Lead paragraphs |
| `body-md` | 1rem | DM Sans | 400 | Standard body |
| `body-sm` | 0.875rem | DM Sans | 400 | Captions, metadata |
| `label` | 0.75rem | Cabinet Grotesk | 700 | Section labels, tags |
| `mono` | 0.8125rem | JetBrains Mono | 400 | Code, data, metrics |

#### Typography Rules

- Section labels: `0.75rem`, letter-spacing `0.12em`, `UPPERCASE`, amber colour, always above `<h2>`
- Metric callouts: Cormorant Garamond `2.5rem+`, amber colour, label below in `0.6875rem` DM Sans CAPS
- Never use system fonts (Arial, Helvetica, system-ui) as primary text
- Max line length: 68–72ch for body copy
- Minimum body font-size: 16px (1rem) for accessibility

---

### Spacing Scale

| Token | Value | Use |
|---|---|---|
| `2xs` | 4px | Icon gaps, micro padding |
| `xs` | 8px | Tight chip padding, small gaps |
| `sm` | 12px | Card internal padding (compact) |
| `md` | 16px | Standard element gap |
| `lg` | 24px | Section internal spacing |
| `xl` | 32px | Component separation |
| `2xl` | 48px | Section padding (mobile) |
| `3xl` | 64px | Section padding (desktop) |
| `4xl` | 96px | Large section breaks |
| `5xl` | 128px | Hero vertical breathing room |

---

### Border Radius

| Token | Value | Use |
|---|---|---|
| `sm` | 6px | Tags, chips, badges |
| `md` | 12px | Input fields, small cards |
| `lg` | 16px | Standard cards |
| `xl` | 24px | Modal cards, feature cards |
| `2xl` | 32px | Large image containers |
| `full` | 9999px | Pills, buttons, toggles, nav |

---

### Shadow System

```css
--shadow-ambient: 0 0 0 1px rgba(232, 168, 56, 0.05);
--shadow-card:    0 4px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px var(--border);
--shadow-glow:    0 0 40px rgba(232, 168, 56, 0.15);
--shadow-glow-blue: 0 0 40px rgba(77, 121, 255, 0.2);
--shadow-glow-teal: 0 0 40px rgba(45, 212, 191, 0.15);
```

---

### Motion Principles

| Type | Duration | Easing | Use |
|---|---|---|---|
| Micro | 80–150ms | ease-out | Hover state changes, button presses |
| Transition | 200–350ms | cubic-bezier(.4,0,.2,1) | Modal open, panel reveal |
| Entrance | 500–800ms | spring (stiffness:200, damping:20) | Hero, section load-in |
| Scroll-driven | Progress-mapped | linear | Timeline fill, parallax layers |
| Word cycle | 2500–4000ms interval | blur + fade (AnimatePresence) | Hero title, testimonials |

**Rules:**
- Never animate more than 3 elements simultaneously
- Stagger list reveals by 80ms per item
- Scroll-driven animations use `useScroll` + `useTransform` — no scroll event listeners
- `@media (prefers-reduced-motion: reduce)` disables all animations
- Never animate `font-size`
- Spring bounce only on UI affordances (buttons, icons), never on text content

---

### Component Patterns

| Component | Spec |
|---|---|
| Primary CTA | Amber fill `#E8A838`, black text, `rounded-full`, `hover:scale(1.04)`, transition 200ms |
| Secondary CTA | Ghost with `var(--border)` outline, text + border fill to amber on hover |
| Cards | `var(--bg-card)` bg, `1px solid var(--border)`, `border-radius: var(--radius-lg)`, `var(--shadow-card)`, `hover:translateY(-2px)` |
| Tags / Chips | Coloured bg at 12% opacity, matching text + border at 25% opacity |
| Section label | 11px, amber, 0.12em tracking, UPPERCASE, above every section H2 |
| Data callout | Cormorant Garamond 40px amber number, DM Sans 11px CAPS label below |
| Testimonial | Italic body, Cormorant 80px amber opening quote mark, left-border accent |
| Code blocks | `var(--bg-surface)` bg, JetBrains Mono, syntax highlighting, copy button top-right |

---

## 3. Site Architecture & Navigation

### URL Structure

```
/                           → Home (full scroll narrative)
/about                      → Full About Me page
/work                       → Work portfolio index
/work/[slug]                → Individual case study page
/side-projects              → Side projects index
/side-projects/[slug]       → Individual side project case study
/ai                         → AI Playground hub
/ai/[slug]                  → Individual AI product page
/bookshelf                  → Books + reading notes
/articles                   → Writing index
/articles/[slug]            → Individual article (MDX)
/achievements               → Awards, certs, speaking, press
/tools                      → PM tools & stack
```

---

### Navigation System

| Element | Behaviour | Contents |
|---|---|---|
| Top Navbar (floating) | Fixed, pill shape, backdrop-blur, morphs to rounded-xl on mobile expand | Home · Work · AI · Writing · About · Contact + Theme Toggle + Hire Me CTA |
| Bottom Nav Bar | Fixed, spring animation in, active label expands with Framer Motion | 5 primary destinations (Home, Work, AI, Writing, Contact) |
| Breadcrumb | Present on all sub-pages | `← Back to [Section]` + current page name |
| In-page TOC | Sticky sidebar on case study + article pages (desktop ≥1280px) | Anchor links + active section highlight + scroll progress |
| Footer | Full-width, 3-column | Quick links · Social links · Newsletter · Colophon |

---

### Home Page Scroll Narrative

The home page is a single scrolling story — each section has a specific job.

| # | Section | Job |
|---|---|---|
| 1 | Hero | Answer: who are you, what do you do, why should I care — in 8 seconds |
| 2 | Company Logos Strip | Silent credibility signal — "I've shipped at real companies" |
| 3 | Work Highlights | Tease the depth — 3 featured projects, click to explore |
| 4 | About Snapshot | The human behind the PM — a paragraph + headshot + quick facts |
| 5 | AI Playground Preview | The differentiator — 2 live AI products visible immediately |
| 6 | Career Timeline | The journey — scroll-driven animated narrative |
| 7 | Impact Numbers | Reinforce results — full-width data section |
| 8 | Articles & Bookshelf | Intellectual depth — latest writing + current reading |
| 9 | Testimonials | Social validation — real quotes from real people |
| 10 | Achievements Strip | Compact credentials — awards, certs, speaker credits |
| 11 | Tools | Relatable toolkit — visual grid, searchable |
| 12 | Contact | Warm close — email + calendar link |

---

## 4. Section-by-Section PRD

### 4.1 Home / Hero

**Priority:** P0 — The first impression. Must answer: who, what, why — in under 8 seconds.

| Requirement | Detail | Priority |
|---|---|---|
| Full name display | Cormorant Garamond, `display-2xl`, 2-line maximum | Must |
| Animated title cycling | 5+ roles, blur+fade AnimatePresence, 2.8s interval | Must |
| Tagline | 1 punchy sentence, max 120 characters | Must |
| Stats strip | 4 quantified metrics: products / users / revenue / years | Must |
| Dual CTAs | Primary: "View My Work" · Secondary: "Download Resume" (PDF link) | Must |
| Background texture | Animated dot grid or noise texture, very subtle (opacity 3–5%) | Must |
| Availability badge | Pulsing teal dot + "Open to [X]" — value from CMS/env var | Should |
| Scroll indicator | Animated chevron down, fades after first scroll event | Should |
| Ambient glow | Amber radial gradient behind name, ~600px blur radius | Should |

---

### 4.2 About Me

**Priority:** P0 — Makes the person real. Not a resume paragraph — a story with opinions.

| Requirement | Detail | Priority |
|---|---|---|
| Hero photo | Professional image, editorial crop, parallax scroll effect | Must |
| Origin story | 3–5 paras: how I got into PM, what drives me, what I believe | Must |
| PM Philosophy | Callout card with 3–5 core product beliefs (titled, with icons) | Must |
| Quick facts sidebar | Education · Location · Languages · Hobbies · Currently reading | Must |
| Download Resume CTA | PDF opens in new tab | Must |
| Working with me | Honest description of style, communication, decision-making | Should |
| Life outside work | 2–3 interests with images — humanises the PM | Should |
| Values section | 3 values with icons + 2-line descriptions | Should |
| Skills tags | Visible tag cloud grouped by category | Could |

---

### 4.3 Work / Projects

**Priority:** P0 — The core portfolio. Filterable, scannable, every card links to a full case study.

| Requirement | Detail | Priority |
|---|---|---|
| Project cards | Thumbnail + company + title + domain tag + key metric + year | Must |
| Filter tabs | By domain: Growth · Platform · Consumer · B2B · AI · 0→1 | Must |
| Featured highlight | Top 3 projects with amber border + "Featured" badge | Must |
| `Read Case Study` CTA | Every card navigates to `/work/[slug]` | Must |
| Outcome visible on card | Key metric (e.g. "+34% conversion") visible without hover | Must |
| Sort options | Sort by: Recency · Impact · Domain | Should |
| Hover preview | Card expands to show 2-sentence summary without navigating | Should |
| Empty state | Friendly message if filter returns 0 results | Should |
| Project count | "Showing X of Y projects" label updates on filter | Could |

---

### 4.4 Side Projects

**Priority:** P1 — Personal bets. Shows range, curiosity, risk tolerance.

| Requirement | Detail | Priority |
|---|---|---|
| Project cards | Same as Work cards + "Personal Project" badge | Must |
| Status badge | `Live` · `In Progress` · `Archived` · `Open Source` | Must |
| "Why I Built It" | 1–2 sentence visible on card — motivation over description | Must |
| Live / GitHub links | External link icons on card | Must |
| Tech stack chips | Languages and tools used — visible on card | Should |
| Usage metric | Users / downloads / stars where applicable | Should |
| Full case study page | Same template as work projects, lighter narrative | Should |

---

### 4.5 AI Playground

**Priority:** P0 — The biggest differentiator. Not just descriptions — live AI products and demos.

| Requirement | Detail | Priority |
|---|---|---|
| Hero manifesto | 250–400 word philosophy on building with AI. Grounded, not hype. | Must |
| AI product cards | Each with live demo embed or screenshot + link to `/ai/[slug]` | Must |
| Individual product pages | Full detail page at `/ai/[slug]` — see Section 6 for full spec | Must |
| Tools & stack section | LLMs · APIs · Frameworks · Orchestration — grouped by category | Must |
| Experiments log | Smaller explorations that didn't ship — shows process and thinking | Should |
| Prompt library | Curated PM prompts — downloadable or inline | Should |
| AI reading list | Books + papers on AI that shaped my thinking | Should |
| AI newsletter / log | Running public log of experiments | Could |

---

### 4.6 Bookshelf & Articles

**Priority:** P1 — Intellectual credibility. What I read shapes how I think.

**Bookshelf**

| Requirement | Detail | Priority |
|---|---|---|
| Books grid | Cover + title + author + my rating (1–5) + 1-line takeaway | Must |
| Currently Reading | Highlighted card at top with reading progress bar | Must |
| Category filter | Product · Strategy · Psychology · Tech · Business · Fiction | Should |
| Year read | Visible on each card | Should |
| External link | Link to Goodreads or Amazon | Could |

**Articles**

| Requirement | Detail | Priority |
|---|---|---|
| Article index | Title + date + read time + topic tag + teaser sentence | Must |
| Full article pages | MDX-powered with rich typography + reading progress bar | Must |
| Featured / pinned | Top 3 shown on home page preview | Must |
| Topic tags | Filter articles by tag | Should |
| Newsletter CTA | Subscribe section at bottom of article + index page | Should |
| Share buttons | Twitter/X, LinkedIn, Copy Link — on each article | Should |
| Related articles | 2 recommendations at bottom of every article | Could |

---

### 4.7 Achievements

**Priority:** P1 — Third-party validation. Awards, certifications, speaking, press.

| Requirement | Detail | Priority |
|---|---|---|
| Category tabs | Awards · Certifications · Speaking · Press · Education | Must |
| Credential cards | Logo + issuer + date + external link + 1-line context | Must |
| Speaking engagements | Event + topic + date + recording link if available | Must |
| Certification badges | Visual badge-style cards (logo prominent) | Should |
| Press mentions | Outlet logo + headline + link + date | Should |
| Timeline view toggle | Option to view all achievements chronologically | Should |
| "Available to speak" CTA | Booking link or contact anchor | Could |

---

### 4.8 Tools

**Priority:** P2 — My full PM toolkit. Useful for the community. Shows depth of craft.

| Requirement | Detail | Priority |
|---|---|---|
| Category grid | Discovery · Roadmapping · Analytics · Design · AI · Communication | Must |
| Tool cards | Logo + name + category + how I use it + 1–5 star rating | Must |
| Filter by category | Click category = filter grid in place | Must |
| New / trending badge | On tools added in last 3 months | Should |
| My templates link | Button linking to downloadable PM templates | Should |
| Curated stack CTA | "Use this stack" linking to Notion or Gumroad resource | Could |

---

## 5. Case Study Page Template

Each project — work or side project — gets its own dedicated page. This is the most important unit of content on the site.

### URL Pattern

```
/work/payments-platform-overhaul
/work/ai-search-discovery
/side-projects/pm-cli-tool
/ai/context-aware-doc-search
```

---

### Page Anatomy (10 Zones)

#### Zone 01 — Hero

- Large project title (Cormorant Garamond, `display-xl`)
- Company name + year + my role
- Full-bleed hero image or product screenshot with parallax scroll
- 3–4 outcome metric pills (always quantified — no vague phrases)
- Meta tags: domain · team size · duration · tools used
- Scroll progress bar (top of viewport, amber fill)

#### Zone 02 — TL;DR Box

A pinned summary card (sticky at top or prominent near top):

- Problem in 1 sentence
- Solution in 1 sentence
- The single most important outcome

Respects skimmers. Rewards deep readers.

#### Zone 03 — Context & Problem

- Company / product background (2–3 paragraphs)
- The problem statement — why it mattered (user pain + business cost quantified)
- Constraints: time, team size, tech debt, organisational dynamics
- Explicit success criteria — what "done" looked like before we started

#### Zone 04 — Discovery Process

- Research methods used (interviews, surveys, data analysis, competitive analysis)
- Key insights surfaced — include direct user quotes
- Insight-to-decision mapping: what we learned and what it changed
- Assumptions log: what we assumed, how we tested each one

#### Zone 05 — Strategy & Framing

- How I defined and scoped the problem (framework used: Jobs-to-be-Done, opportunity tree, etc.)
- Options considered — what we explicitly chose NOT to build and why
- The strategic bet — the one decision that changed everything
- Stakeholder alignment: who I had to convince and how

#### Zone 06 — Solution Design

- High-level solution narrative
- Design artefacts: flows, wireframes, mockups (embedded images with captions)
- Key product decisions with explicit rationale
- Technical constraints and trade-offs we navigated
- The hardest thing — what made this genuinely difficult

#### Zone 07 — Execution & Delivery

- Team structure: who did what, my specific responsibilities
- Delivery approach: how we shipped iteratively
- Blockers encountered and how I unblocked them
- What changed from the original plan and why

#### Zone 08 — Results & Impact

- Quantified primary and secondary outcomes
- Timeline: when we first saw impact, when it plateaued
- Unexpected results (positive and negative)
- Before / after comparison — visual if possible
- Business outcome: NPS lift · retention · revenue · engagement

#### Zone 09 — Retrospective

- What I'd do differently with the knowledge I have now
- What I'm most proud of on this project
- The specific learning I carried to my next role or project
- What this project changed about how I think about product

#### Zone 10 — Navigation Footer

- ← Previous project | Next project →
- Back to Work index
- 2 related case study recommendations
- Contact / Hire Me CTA

---

### Sticky Sidebar (Desktop ≥ 1280px)

```
┌──────────────────────────┐
│ Reading progress (%)     │
│ ─────────────────────    │
│ • Context & Problem      │  ← active (amber)
│   Discovery Process      │
│   Strategy & Framing     │
│   Solution Design        │
│   Execution              │
│   Results & Impact       │
│   Retrospective          │
│ ─────────────────────    │
│ ⏱ 8 min read             │
│ 🔗 Share  📋 Copy link   │
│ ↑ Back to top            │
└──────────────────────────┘
```

---

### Case Study Writing Rules

| Rule | Why |
|---|---|
| Lead with the outcome, not the process | Readers scan — put the number first |
| Every claim needs evidence | Quote, data point, or artefact — no empty assertions |
| Name the tension | Good case studies show where things were hard, not just the happy path |
| Include at least 1 failure or pivot | Shows intellectual honesty and a learning mindset |
| Use first person confidently | Own the decisions you made |
| TL;DR max 3 sentences | Respect skimmers, reward deep readers |
| Minimum 1,200 words | Google rewards depth; so do thoughtful readers |
| Every image needs alt text + caption | Accessibility + context |
| Quantify everything possible | "Significantly improved" means nothing. "+34%" means everything. |

---

### MDX Frontmatter Schema

```yaml
---
title: "Payments Platform Overhaul"
slug: "payments-platform-overhaul"
company: "FinTech Corp"
year: 2024
role: "Senior Product Manager"
duration: "8 months"
teamSize: "3 squads — 18 engineers, 4 designers"
domain: "platform"           # growth | platform | consumer | b2b | ai | 0-to-1
thumbnail: "/images/work/payments-hero.jpg"
featured: true
summary: "Rebuilt core payments infrastructure, cutting failed transactions 67% and lifting checkout conversion 34% across 2.4M users."
outcomes:
  - metric: "Failed transactions"
    value: "↓67%"
  - metric: "Checkout conversion"
    value: "+34%"
  - metric: "Users impacted"
    value: "2.4M"
tags: ["Platform", "Payments", "0→1", "B2C"]
readTime: "9 min"
---
```

---

## 6. AI Section — Deep PRD

### Philosophy

The AI section is a **product-within-the-portfolio**. It demonstrates:

- AI product sense (when and why to use AI)
- Hands-on building ability (I actually build, not just brief engineers)
- Tooling taste (I know what's good and why)
- A grounded point-of-view (not hype, not fear — thoughtful takes)

---

### AI Hub Page (`/ai`)

| Block | Content | Priority |
|---|---|---|
| Hero Manifesto | 250–400 words on building AI products. What I believe. What's overhyped. What's underrated. | P0 |
| AI Products Grid | Cards for every AI product I've shipped or built | P0 |
| Experiments Log | Smaller prototypes, prompt experiments, demos — shows process | P0 |
| Stack & Philosophy | LLMs used + why, frameworks, infra — grouped with reasoning | P1 |
| AI Reading List | Books, papers, newsletters that shape my thinking | P1 |
| Prompt Library | Curated PM prompts — downloadable as Notion doc / CSV | P2 |
| Build Log | Running public log of what I'm building and learning | P2 |

---

### AI Product Page Template (`/ai/[slug]`)

| Section | Content |
|---|---|
| **Hero** | Product name, tagline, status badge (Live / Beta / Archived), hero screenshot, CTA to live demo |
| **The Problem** | What human problem this solves — pain first, technology second |
| **Why AI Here?** | Explicit reasoning: why AI was the right solution, not traditional code |
| **How It Works** | Simplified technical architecture, model used, data flow (diagram) |
| **Live Demo** | Embedded interactive component or iframe — users try it directly |
| **Metrics** | Usage numbers, accuracy, latency, user feedback, uptime if available |
| **Stack** | Full tech stack: LLM · Orchestration · Frontend · Backend · Infra · Evals |
| **What I Learned** | AI-specific learnings: prompt engineering, eval design, latency/cost trade-offs |
| **Open Source?** | GitHub link if public — demonstrates technical credibility |
| **Next Steps** | What v2 would look like — shows product thinking |

---

### AI Tools & Stack Section

| Category | Tools | How Used |
|---|---|---|
| LLMs | GPT-4o, Claude 3.5, Gemini Pro | Core inference across products |
| Orchestration | LangChain, LlamaIndex, Vercel AI SDK | RAG pipelines, agent workflows |
| Vector Databases | Pinecone, Supabase pgvector | Semantic search, long-term memory |
| Frontend AI | Vercel AI SDK, streaming, tool use | Real-time streaming AI UIs |
| Evals | Braintrust, LangSmith, custom scripts | Quality measurement, regression testing |
| Prompt Management | PromptLayer, Langfuse, versioned YAML | Prompt versioning and A/B testing |
| Infrastructure | Vercel, Railway, AWS Lambda | Deployment and scaling |
| Voice / Multimodal | Whisper, ElevenLabs, GPT-4V | Audio transcription, vision features |

---

### AI Product Frontmatter Schema

```yaml
---
name: "Context-Aware Doc Search"
slug: "context-aware-doc-search"
tagline: "Find anything in your knowledge base with natural language"
status: "live"               # live | beta | archived | in-progress
demoUrl: "https://demo.example.com"
githubUrl: "https://github.com/user/repo"
thumbnail: "/images/ai/doc-search.jpg"
stack: ["GPT-4o", "LangChain", "Pinecone", "Next.js", "Vercel"]
category: "productivity"
metrics:
  - label: "Search accuracy"
    value: "94%"
  - label: "Avg. query time"
    value: "1.2s"
  - label: "Active users"
    value: "1,200+"
---
```

---

## 7. Master Developer Prompt

> Copy everything between the triple-backticks into a new conversation to build this portfolio.

```
You are building a senior Product Manager's personal portfolio website.

════════════════════════════════════════════
TECH STACK
════════════════════════════════════════════
Framework:    Next.js 14 (App Router)
Language:     TypeScript (strict mode)
Styling:      Tailwind CSS v3 + CSS custom properties
Components:   shadcn/ui
Animation:    Framer Motion 11
Icons:        Lucide React
Fonts:        Cormorant Garamond, Cabinet Grotesk, DM Sans, JetBrains Mono
Content:      MDX (Contentlayer or Velite)
Deployment:   Vercel

════════════════════════════════════════════
DESIGN SYSTEM — "INK & EMBER"
════════════════════════════════════════════
Add to globals.css:

:root {
  --bg: #0D0F1A;
  --bg-surface: #13152A;
  --bg-card: #181B30;
  --bg-hover: #1E2238;
  --accent: #E8A838;
  --accent-light: #F2C46D;
  --accent-deep: #B07D1A;
  --electric: #4D79FF;
  --teal: #2DD4BF;
  --rose: #FB7185;
  --text-primary: #F0F2FF;
  --text-secondary: #8B90B8;
  --text-muted: #4A4F6E;
  --border: #1F2440;
  --border-hover: #2E3459;
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-2xl: 32px;
  --shadow-card: 0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px #1F2440;
  --shadow-glow: 0 0 40px rgba(232,168,56,0.15);
}

[data-theme="light"] {
  --bg: #F4F3EF;
  --bg-surface: #ECEAE3;
  --bg-card: #FFFFFF;
  --text-primary: #0D0F1A;
  --text-secondary: #3D4265;
  --text-muted: #8B90B8;
  --border: #DDD9CE;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

════════════════════════════════════════════
PROJECT STRUCTURE
════════════════════════════════════════════
app/
  layout.tsx
  page.tsx                  ← Home (all 12 sections)
  about/page.tsx
  work/
    page.tsx
    [slug]/page.tsx
  side-projects/
    page.tsx
    [slug]/page.tsx
  ai/
    page.tsx
    [slug]/page.tsx
  bookshelf/page.tsx
  articles/
    page.tsx
    [slug]/page.tsx
  achievements/page.tsx
  tools/page.tsx

components/
  layout/
    Navbar.tsx
    BottomNav.tsx
    Footer.tsx
  home/
    Hero.tsx
    CompanyLogos.tsx
    WorkPreview.tsx
    AboutSnapshot.tsx
    AIPreview.tsx
    Timeline.tsx
    ImpactNumbers.tsx
    ArticlesPreview.tsx
    Testimonials.tsx
    AchievementsStrip.tsx
    ToolsPreview.tsx
    Contact.tsx
  work/
    ProjectCard.tsx
    ProjectGrid.tsx
    FilterTabs.tsx
    CaseStudyLayout.tsx
    CaseStudySidebar.tsx
  ai/
    AIProductCard.tsx
    AIProductDetail.tsx
    AIStackGrid.tsx
    ExperimentCard.tsx
  shared/
    ThemeToggle.tsx
    SectionLabel.tsx
    MetricPill.tsx
    AnimatedText.tsx
    ScrollProgress.tsx
  ui/                       ← shadcn components

content/
  work/                     ← MDX case studies
  articles/                 ← MDX articles
  ai/                       ← MDX AI products
  side-projects/            ← MDX side projects
  data/
    books.ts
    tools.ts
    achievements.ts
    testimonials.ts

════════════════════════════════════════════
COMPONENT SPECS
════════════════════════════════════════════

NAVBAR (components/layout/Navbar.tsx)
- Fixed, top: 20px, left: 50%, translateX(-50%)
- Default: rounded-full
- Mobile menu open: rounded-2xl (300ms transition)
- Backdrop: blur(20px), bg: rgba(13,15,26,0.85), border: 1px solid var(--border)
- AnimatedNavLink: overflow-hidden container, hover slides duplicate text up
- Active section: tracked via IntersectionObserver, nav item turns amber
- Mobile: hamburger → full-width drawer with links + CTA

HERO (components/home/Hero.tsx)
- 100vh, flex column center, text-center
- Background: animated dot grid (CSS background-image, 3% opacity)
- Amber radial glow: 600px diameter, 8% opacity, centered
- Stagger: each element animates in at 80ms intervals (opacity+y)
- Word cycle: AnimatePresence, filter blur(8px) → blur(0), 2.8s interval
- Stats: 4-column grid, Cormorant numbers in amber, DM Sans labels

PROJECT GRID (components/work/ProjectGrid.tsx)
- CSS Grid: 1 col mobile → 3 col desktop
- Framer Motion layoutId on cards for shared layout animation
- Click card → full-screen modal with same layoutId (seamless expand)
- Filter tabs: animated amber underline using layout animation

CASE STUDY LAYOUT (components/work/CaseStudyLayout.tsx)
- Full-bleed hero (useScroll parallax on image)
- ScrollProgress bar at top of viewport
- Desktop ≥1280px: 65% main + 35% sticky sidebar
- Sidebar: TOC with IntersectionObserver active-section tracking
- MDX content with custom component overrides
- Bottom: prev/next project navigation

TIMELINE (components/home/Timeline.tsx)
- useScroll + useTransform → vertical line fills amber as user scrolls
- Entries: alternating left/right, x-axis slide-in on viewport enter
- Each entry: amber dot on line, year chip, role, bullets, small image

BOTTOM NAV (components/layout/BottomNav.tsx)
- Fixed, bottom: 20px, mx-auto, rounded-full
- Spring entrance: scale 0.9→1 on mount
- Active item: amber colour + label width animates 0 → auto
- 5 items max: Home · Work · AI · Writing · Contact

THEME TOGGLE (components/shared/ThemeToggle.tsx)
- Integrate next-themes
- Pill toggle: icon slides left/right on toggle
- Dark: navy bg + amber icon / Light: white bg + navy icon

════════════════════════════════════════════
TYPESCRIPT TYPES
════════════════════════════════════════════

// types/content.ts

export type Project = {
  slug: string;
  title: string;
  company: string;
  year: number;
  role: string;
  domain: "growth" | "platform" | "consumer" | "b2b" | "ai" | "0-to-1";
  duration: string;
  teamSize: string;
  thumbnail: string;
  featured: boolean;
  summary: string;
  outcomes: { metric: string; value: string }[];
  tags: string[];
  readTime: string;
}

export type AIProduct = {
  slug: string;
  name: string;
  tagline: string;
  status: "live" | "beta" | "archived" | "in-progress";
  demoUrl?: string;
  githubUrl?: string;
  thumbnail: string;
  stack: string[];
  metrics?: { label: string; value: string }[];
}

export type Book = {
  title: string;
  author: string;
  cover: string;
  category: string;
  rating: 1 | 2 | 3 | 4 | 5;
  takeaway: string;
  readDate: string;
  status: "read" | "reading" | "want-to-read";
  link?: string;
}

export type Tool = {
  name: string;
  logo: string;
  category: "discovery" | "roadmap" | "analytics" | "design" | "ai" | "communication" | "data";
  usage: string;
  rating: 1 | 2 | 3 | 4 | 5;
  isNew?: boolean;
  link: string;
}

export type Achievement = {
  title: string;
  issuer: string;
  logo: string;
  date: string;
  category: "award" | "cert" | "speaking" | "press" | "education";
  link?: string;
  context: string;
}

════════════════════════════════════════════
SEO REQUIREMENTS
════════════════════════════════════════════
- generateMetadata() on every page (title, description, OG, Twitter)
- Dynamic OG images with next/og (edge runtime)
- JSON-LD Person schema on home page
- Auto-generated sitemap.xml
- Robots.txt (index all, disallow none)
- next/font for all typefaces (eliminates CLS from font swap)
- All images: priority on above-fold, explicit width+height, WebP format
- LCP target: < 2.0s on mobile 3G simulation
- CLS target: 0 (no layout shifts)

════════════════════════════════════════════
ACCESSIBILITY REQUIREMENTS
════════════════════════════════════════════
- WCAG 2.1 AA minimum
- Skip-to-content link as first focusable element
- All interactive elements keyboard-navigable
- Focus rings: ring-2 ring-[var(--accent)] on :focus-visible
- All images: descriptive alt text
- Icon-only buttons: aria-label required
- Body text contrast ≥ 4.5:1
- Reduced motion: disable all animations
```

---

## 8. Build Order & Commands

### Setup Commands

```bash
# 1. Create Next.js project
npx create-next-app@latest portfolio \
  --typescript \
  --tailwind \
  --app \
  --src-dir=false \
  --import-alias="@/*"

cd portfolio

# 2. Initialise shadcn/ui
npx shadcn-ui@latest init
# Choose: Default style, slate base colour, yes CSS variables

# 3. Add shadcn components
npx shadcn-ui@latest add button card badge tabs dialog tooltip sheet

# 4. Install core dependencies
npm install framer-motion lucide-react next-themes

# 5. MDX content pipeline
npm install contentlayer next-contentlayer date-fns

# 6. Cabinet Grotesk font (via fontsource)
npm install @fontsource-variable/cabinet-grotesk

# 7. Optional: type safety for content
npm install zod
```

---

### Component Install Checklist

Copy these from the component library into `components/ui/`:

```
□ timeline.tsx              (from Aceternity — home Journey section)
□ layout-grid.tsx           (from Aceternity — Work project grid)
□ parallax-scroll.tsx       (from Aceternity — About gallery)
□ mini-navbar.tsx           (custom — global navigation)
□ bottom-nav-bar.tsx        (custom — mobile navigation)
□ vapour-text-effect.tsx    (custom — Hero word cycle)
□ circular-testimonials.tsx (custom — Testimonials section)
□ container-scroll-animation.tsx (from Aceternity — Work or Hero)
□ theme-toggle.tsx          (custom — Navbar)
```

---

### Recommended Build Order

| Step | What to Build | Why First |
|---|---|---|
| 1 | Design tokens in `globals.css` | Everything depends on this |
| 2 | Navbar + BottomNav + ThemeToggle | Layout scaffolding before content |
| 3 | Hero section | First thing seen — test the design language |
| 4 | Work Index + ProjectCard + FilterTabs | Core portfolio functionality |
| 5 | Case Study layout + MDX + Sidebar TOC | Most complex page — do early |
| 6 | AI Hub + AI Product cards | Differentiator section |
| 7 | Timeline (scroll-driven) | Animation-heavy — needs its own focus |
| 8 | About page | Full page with parallax |
| 9 | Bookshelf + Articles + Article page | Content-heavy pages |
| 10 | Achievements + Tools | Simpler pages — good for end |
| 11 | Footer + Contact | Wrap layout |
| 12 | SEO: metadata, OG images, sitemap | Before launch |
| 13 | Performance: LCP, CLS, fonts | Before launch |
| 14 | Accessibility audit | Before launch |
| 15 | Content population | Final step |

---

*PRD v1.0 — PM Portfolio · Last updated: 2025*
