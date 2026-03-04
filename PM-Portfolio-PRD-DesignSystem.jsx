import { useState } from "react";

const SECTIONS = [
  "Overview",
  "Design System",
  "Site Architecture",
  "Pages & PRD",
  "Case Study Template",
  "AI Section PRD",
  "Dev Prompt",
];

// ─── COLOR TOKENS ────────────────────────────────────────────────
const DS = {
  // Primary Palette — "Ink & Ember": Deep navy intelligence meets warm amber ambition
  colors: {
    bg: { value: "#0D0F1A", label: "Background", hex: "#0D0F1A", rgb: "13, 15, 26" },
    bgSurface: { value: "#13152A", label: "Surface", hex: "#13152A", rgb: "19, 21, 42" },
    bgCard: { value: "#181B30", label: "Card", hex: "#181B30", rgb: "24, 27, 48" },
    bgHover: { value: "#1E2238", label: "Hover State", hex: "#1E2238", rgb: "30, 34, 56" },
    accent1: { value: "#E8A838", label: "Amber Primary", hex: "#E8A838", rgb: "232, 168, 56" },
    accent2: { value: "#F2C46D", label: "Amber Light", hex: "#F2C46D", rgb: "242, 196, 109" },
    accent3: { value: "#B07D1A", label: "Amber Deep", hex: "#B07D1A", rgb: "176, 125, 26" },
    electric: { value: "#4D79FF", label: "Electric Blue", hex: "#4D79FF", rgb: "77, 121, 255" },
    teal: { value: "#2DD4BF", label: "Teal Glow", hex: "#2DD4BF", rgb: "45, 212, 191" },
    rose: { value: "#FB7185", label: "Rose Signal", hex: "#FB7185", rgb: "251, 113, 133" },
    textPrimary: { value: "#F0F2FF", label: "Text Primary", hex: "#F0F2FF", rgb: "240, 242, 255" },
    textSecondary: { value: "#8B90B8", label: "Text Secondary", hex: "#8B90B8", rgb: "139, 144, 184" },
    textMuted: { value: "#4A4F6E", label: "Text Muted", hex: "#4A4F6E", rgb: "74, 79, 110" },
    border: { value: "#1F2440", label: "Border", hex: "#1F2440", rgb: "31, 36, 64" },
    borderHover: { value: "#2E3459", label: "Border Hover", hex: "#2E3459", rgb: "46, 52, 89" },
  },
  type: {
    display: { family: "Cormorant Garamond", weight: "700", use: "Hero titles, section headings" },
    heading: { family: "Cabinet Grotesk", weight: "600–800", use: "Sub-headings, labels, UI text" },
    body: { family: "DM Sans", weight: "300–500", use: "Body copy, descriptions, prose" },
    mono: { family: "JetBrains Mono", weight: "400", use: "Code, metrics, data labels" },
  },
  scale: {
    "display-2xl": "clamp(4rem, 8vw, 7rem)",
    "display-xl": "clamp(3rem, 5vw, 5rem)",
    "display-lg": "clamp(2.25rem, 3.5vw, 3.5rem)",
    "heading-xl": "clamp(1.5rem, 2.5vw, 2.25rem)",
    "heading-lg": "clamp(1.25rem, 2vw, 1.75rem)",
    "body-lg": "1.125rem",
    "body-md": "1rem",
    "body-sm": "0.875rem",
    "label": "0.75rem",
    "micro": "0.625rem",
  },
  space: {
    "2xs": "4px", xs: "8px", sm: "12px", md: "16px", lg: "24px",
    xl: "32px", "2xl": "48px", "3xl": "64px", "4xl": "96px", "5xl": "128px",
  },
  radius: {
    sm: "6px", md: "12px", lg: "16px", xl: "24px", "2xl": "32px", full: "9999px",
  },
  shadow: {
    ambient: "0 0 0 1px rgba(232,168,56,0.05)",
    card: "0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(31,36,64,1)",
    glow: "0 0 40px rgba(232,168,56,0.15)",
    glowBlue: "0 0 40px rgba(77,121,255,0.2)",
  },
};

// ─── COMPONENT ───────────────────────────────────────────────────
export default function PRDDoc() {
  const [active, setActive] = useState("Overview");

  const s = DS.colors;

  return (
    <div style={{ background: s.bg.value, minHeight: "100vh", fontFamily: "DM Sans, system-ui, sans-serif", color: s.textPrimary.value }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        ::-webkit-scrollbar{width:4px;height:4px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:${s.accent1.value};border-radius:2px}
        *{box-sizing:border-box;margin:0;padding:0}
        .chip{display:inline-block;padding:2px 10px;border-radius:99px;font-size:11px;font-weight:600;letter-spacing:.04em}
        .tag-new{background:rgba(232,168,56,.15);color:#E8A838;border:1px solid rgba(232,168,56,.3)}
        .tag-must{background:rgba(251,113,133,.12);color:#FB7185;border:1px solid rgba(251,113,133,.25)}
        .tag-v2{background:rgba(77,121,255,.12);color:#4D79FF;border:1px solid rgba(77,121,255,.25)}
        .tag-ai{background:rgba(45,212,191,.12);color:#2DD4BF;border:1px solid rgba(45,212,191,.25)}
      `}</style>

      {/* Sidebar */}
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <nav style={{ width: 220, flexShrink: 0, background: s.bgSurface.value, borderRight: `1px solid ${s.border.value}`, padding: "24px 0", position: "sticky", top: 0, height: "100vh", overflow: "auto" }}>
          <div style={{ padding: "0 20px 24px", borderBottom: `1px solid ${s.border.value}`, marginBottom: 12 }}>
            <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 20, fontWeight: 700, color: s.accent1.value, letterSpacing: ".02em" }}>PM Portfolio</div>
            <div style={{ fontSize: 10, color: s.textMuted.value, letterSpacing: ".1em", textTransform: "uppercase", marginTop: 2 }}>PRD + Design System v1.0</div>
          </div>
          {SECTIONS.map(s2 => (
            <button key={s2} onClick={() => setActive(s2)} style={{ display: "block", width: "100%", textAlign: "left", padding: "9px 20px", background: active === s2 ? `rgba(232,168,56,.1)` : "transparent", color: active === s2 ? s.accent1.value : s.textSecondary.value, border: "none", cursor: "pointer", fontSize: 13, fontWeight: active === s2 ? 600 : 400, borderLeft: active === s2 ? `2px solid ${s.accent1.value}` : "2px solid transparent", transition: "all .15s", fontFamily: "DM Sans, sans-serif" }}>
              {s2}
            </button>
          ))}
        </nav>

        {/* Content */}
        <main style={{ flex: 1, padding: "40px 48px", maxWidth: 900, overflowY: "auto" }}>

          {active === "Overview" && <OverviewSection />}
          {active === "Design System" && <DesignSystemSection />}
          {active === "Site Architecture" && <ArchSection />}
          {active === "Pages & PRD" && <PagesPRD />}
          {active === "Case Study Template" && <CaseStudyPRD />}
          {active === "AI Section PRD" && <AIPlatformPRD />}
          {active === "Dev Prompt" && <DevPrompt />}

        </main>
      </div>
    </div>
  );
}

// ─── SECTION COMPONENTS ──────────────────────────────────────────

function SectionTitle({ label, title, sub }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{ fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: DS.colors.accent1.value, fontWeight: 700, marginBottom: 8 }}>{label}</div>
      <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 44, fontWeight: 700, color: DS.colors.textPrimary.value, lineHeight: 1.1, marginBottom: 12 }}>{title}</h1>
      {sub && <p style={{ fontSize: 16, color: DS.colors.textSecondary.value, lineHeight: 1.7, maxWidth: 620 }}>{sub}</p>}
    </div>
  );
}

function H2({ children }) {
  return <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 28, fontWeight: 700, color: DS.colors.textPrimary.value, marginBottom: 16, marginTop: 40, paddingBottom: 10, borderBottom: `1px solid ${DS.colors.border.value}` }}>{children}</h2>;
}

function H3({ children }) {
  return <h3 style={{ fontSize: 15, fontWeight: 700, color: DS.colors.textPrimary.value, marginBottom: 10, marginTop: 24, letterSpacing: ".01em" }}>{children}</h3>;
}

function P({ children, style = {} }) {
  return <p style={{ fontSize: 14, lineHeight: 1.8, color: DS.colors.textSecondary.value, marginBottom: 12, ...style }}>{children}</p>;
}

function Card({ children, style = {}, accent }) {
  return (
    <div style={{ background: DS.colors.bgCard.value, border: `1px solid ${accent ? DS.colors.borderHover.value : DS.colors.border.value}`, borderRadius: 16, padding: 20, marginBottom: 16, ...(accent ? { borderLeft: `3px solid ${DS.colors.accent1.value}` } : {}), ...style }}>
      {children}
    </div>
  );
}

function Row({ children }) {
  return <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>{children}</div>;
}

function Pill({ text, color = DS.colors.accent1.value }) {
  return <span style={{ background: color + "18", color, border: `1px solid ${color}40`, borderRadius: 99, padding: "3px 12px", fontSize: 12, fontWeight: 600, fontFamily: "DM Sans, sans-serif", display: "inline-block" }}>{text}</span>;
}

function MetricBox({ val, label, color = DS.colors.accent1.value }) {
  return (
    <div style={{ flex: 1, minWidth: 120, background: DS.colors.bgCard.value, border: `1px solid ${DS.colors.border.value}`, borderRadius: 12, padding: "16px 12px", textAlign: "center" }}>
      <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 32, fontWeight: 700, color }}>{val}</div>
      <div style={{ fontSize: 11, color: DS.colors.textMuted.value, marginTop: 4, letterSpacing: ".05em", textTransform: "uppercase" }}>{label}</div>
    </div>
  );
}

function Table({ headers, rows }) {
  return (
    <div style={{ overflowX: "auto", marginBottom: 20 }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ background: DS.colors.bgSurface.value }}>
            {headers.map((h, i) => <th key={i} style={{ padding: "10px 14px", textAlign: "left", fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: DS.colors.textMuted.value, borderBottom: `1px solid ${DS.colors.border.value}`, fontWeight: 700 }}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: `1px solid ${DS.colors.border.value}` }}>
              {row.map((cell, j) => <td key={j} style={{ padding: "10px 14px", color: j === 0 ? DS.colors.textPrimary.value : DS.colors.textSecondary.value, verticalAlign: "top", lineHeight: 1.6 }}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: DS.colors.border.value, margin: "32px 0" }} />;
}

// ─── OVERVIEW ────────────────────────────────────────────────────
function OverviewSection() {
  return (
    <div>
      <SectionTitle label="Product Requirements Document" title={"PM Portfolio\nWebsite"} sub="A comprehensive personal brand platform for a senior Product Manager — combining a living portfolio, case study archive, AI product showcase, knowledge library, and thought leadership hub." />

      <Row>
        <MetricBox val="9" label="Page Sections" color={DS.colors.accent1.value} />
        <MetricBox val="∞" label="Case Studies" color={DS.colors.electric.value} />
        <MetricBox val="1" label="AI Playground" color={DS.colors.teal.value} />
        <MetricBox val="v1" label="Version" color={DS.colors.textMuted.value} />
      </Row>

      <H2>Product Vision</H2>
      <P>Most PM portfolios look like glorified LinkedIn profiles — walls of bullet points wrapped in a generic template. This site must feel like the product work itself: intentional, evidence-driven, beautifully executed, and deeply human. Every section is a proof of craft.</P>
      <P>The north star: a recruiter at a top-tier company, a founder with a hard problem, or a VC scouting operator talent lands on this site and thinks <em style={{ color: DS.colors.accent1.value }}>"this person ships"</em> within 30 seconds — and stays for 10 minutes.</P>

      <H2>Target Audience</H2>
      <Table
        headers={["Persona", "Goal on Site", "Key Sections"]}
        rows={[
          ["Recruiting PM/Director", "Validate seniority, culture fit, craft", "Work, Case Studies, Achievements"],
          ["Startup Founder / CEO", "Find a domain expert for a specific problem", "AI Playground, Work, About"],
          ["Fellow PM / Community", "Learn from frameworks and writing", "Articles, Bookshelf, Tools"],
          ["VC / Operator Scout", "Assess product instinct + range", "Side Projects, AI Playground"],
          ["Conference Organizer", "Verify credibility + speaking topics", "Achievements, Articles"],
        ]}
      />

      <H2>Success Metrics (KPIs)</H2>
      <Table
        headers={["Metric", "Target", "Measurement"]}
        rows={[
          ["Time on site (avg session)", ">3 min", "Analytics"],
          ["Case study read-through rate", ">60%", "Scroll depth"],
          ["Resume/contact CTA click rate", ">15%", "Click events"],
          ["Return visitor rate", ">25%", "Cookie/session analytics"],
          ["Inbound leads per month", ">3 qualified", "Contact form"],
          ["Top 3 Google result for name", "Yes", "Search console"],
        ]}
      />

      <H2>Guiding Principles</H2>
      {[
        ["Show, Don't Tell", "Every claim about PM skill is backed by a concrete example, metric, or artefact in the same breath."],
        ["Depth over Breadth", "10 well-documented projects beat 30 name-drops. Each case study has its own page."],
        ["Living Document", "The site should look actively maintained — dates, recency signals, 'new' badges."],
        ["Load fast, run smooth", "Under 2s LCP, 0 layout shift on scroll, 60fps animations. The site is itself a product demo."],
        ["Accessible & Inclusive", "WCAG AA minimum. Works without JS. Keyboard navigable. Dark + light mode."],
      ].map(([title, desc], i) => (
        <Card key={i} accent>
          <div style={{ fontSize: 13, fontWeight: 700, color: DS.colors.accent1.value, marginBottom: 4 }}>{title}</div>
          <P style={{ marginBottom: 0 }}>{desc}</P>
        </Card>
      ))}
    </div>
  );
}

// ─── DESIGN SYSTEM ───────────────────────────────────────────────
function DesignSystemSection() {
  return (
    <div>
      <SectionTitle label="Visual Identity" title="Design System" sub='The "Ink & Ember" system — deep navy intelligence paired with warm amber ambition. Signals seriousness, creativity, and precision simultaneously.' />

      <H2>The Aesthetic Direction: "Editorial Intelligence"</H2>
      <P>Think: the design sensibility of a Bloomberg Businessweek cover meets a Stripe product page. Not a developer portfolio (no neon). Not a creative agency (no chaos). A senior operator who cares about both craft and outcomes. The palette references old typeset printing (deep ink tones) lit by the warmth of amber — the color of late-night product thinking.</P>

      <H2>Color Palette</H2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10, marginBottom: 24 }}>
        {Object.entries(DS.colors).map(([key, c]) => (
          <div key={key} style={{ background: DS.colors.bgCard.value, border: `1px solid ${DS.colors.border.value}`, borderRadius: 12, overflow: "hidden" }}>
            <div style={{ background: c.value, height: 52 }} />
            <div style={{ padding: "10px 12px" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: DS.colors.textPrimary.value, marginBottom: 2 }}>{c.label}</div>
              <div style={{ fontSize: 10, fontFamily: "JetBrains Mono, monospace", color: DS.colors.textMuted.value }}>{c.hex}</div>
              <div style={{ fontSize: 10, fontFamily: "JetBrains Mono, monospace", color: DS.colors.textMuted.value }}>rgb({c.rgb})</div>
            </div>
          </div>
        ))}
      </div>

      <H2>Usage Rules — Color</H2>
      <Table
        headers={["Token", "Use"]}
        rows={[
          ["bg → bgSurface → bgCard", "Layering depth: page → section container → interactive card"],
          ["accent1 (Amber)", "CTAs, active states, key numbers, section labels, the 'pulse' accent"],
          ["electric (Blue)", "AI/tech features, links, hover states on secondary actions"],
          ["teal", "Success states, AI outputs, 'live' indicators"],
          ["rose", "Alerts, 'hot' items, limited-time signals"],
          ["textPrimary → textSecondary → textMuted", "Body copy hierarchy — never skip more than one level"],
          ["border / borderHover", "All dividers, card outlines — never use black outlines"],
        ]}
      />

      <H2>Typography System</H2>
      {Object.entries(DS.type).map(([key, t]) => (
        <Card key={key}>
          <Row>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: DS.colors.textMuted.value, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 4 }}>Role: {key}</div>
              <div style={{ fontFamily: t.family, fontSize: key === "display" ? 28 : key === "heading" ? 20 : key === "mono" ? 14 : 16, fontWeight: key === "display" ? 700 : 600, color: DS.colors.textPrimary.value, marginBottom: 4 }}>
                {t.family}
              </div>
              <div style={{ fontSize: 12, color: DS.colors.textSecondary.value }}>{t.use}</div>
            </div>
            <Pill text={`weight: ${t.weight}`} color={DS.colors.electric.value} />
          </Row>
        </Card>
      ))}

      <H2>Type Scale</H2>
      {Object.entries(DS.scale).map(([name, size]) => (
        <div key={name} style={{ display: "flex", alignItems: "baseline", gap: 16, padding: "8px 0", borderBottom: `1px solid ${DS.colors.border.value}` }}>
          <div style={{ width: 120, fontSize: 11, fontFamily: "JetBrains Mono, monospace", color: DS.colors.textMuted.value }}>{name}</div>
          <div style={{ fontSize: size, fontFamily: name.startsWith("display") ? "Cormorant Garamond, serif" : "DM Sans, sans-serif", fontWeight: name.startsWith("display") ? 700 : 500, color: DS.colors.textPrimary.value, lineHeight: 1 }}>PM Portfolio</div>
          <div style={{ fontSize: 11, color: DS.colors.textMuted.value, marginLeft: "auto", fontFamily: "JetBrains Mono, monospace" }}>{size}</div>
        </div>
      ))}

      <H2>Spacing Scale</H2>
      <div style={{ display: "flex", gap: 0, alignItems: "flex-end", marginBottom: 24 }}>
        {Object.entries(DS.space).map(([name, val]) => (
          <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, marginRight: 4 }}>
            <div style={{ width: parseInt(val) * 1.5, height: parseInt(val) * 1.5, background: DS.colors.accent1.value, opacity: 0.7, borderRadius: 4 }} />
            <div style={{ fontSize: 9, color: DS.colors.textMuted.value, textAlign: "center" }}>{name}<br/>{val}</div>
          </div>
        ))}
      </div>

      <H2>Border Radius</H2>
      <Row>
        {Object.entries(DS.radius).map(([name, val]) => (
          <div key={name} style={{ width: 72, height: 72, background: DS.colors.bgCard.value, border: `1px solid ${DS.colors.border.value}`, borderRadius: val, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontSize: 10, color: DS.colors.textMuted.value }}>{name}</div>
            <div style={{ fontSize: 9, color: DS.colors.textMuted.value, fontFamily: "JetBrains Mono, monospace" }}>{val}</div>
          </div>
        ))}
      </Row>

      <H2>Motion Principles</H2>
      <Table
        headers={["Type", "Duration", "Easing", "Use"]}
        rows={[
          ["Micro", "80–150ms", "ease-out", "Hover state changes, button presses"],
          ["Transition", "200–350ms", "cubic-bezier(.4,0,.2,1)", "Page element reveals, modals"],
          ["Entrance", "500–800ms", "spring (stiffness 200, damping 20)", "Section load-ins, hero text"],
          ["Scroll", "driven by scrollYProgress", "linear mapped", "Timeline line, parallax layers"],
          ["Cycle", "2500–4000ms", "AnimatePresence fade+blur", "Word cycling, testimonial rotations"],
        ]}
      />
      <Card>
        <P style={{ marginBottom: 0 }}><strong style={{ color: DS.colors.accent1.value }}>Rule:</strong> Never animate more than 3 elements simultaneously. Stagger reveals by 80ms per item. Never use bounce easing on content text — only on UI affordances (buttons, icons).</P>
      </Card>

      <H2>Component Patterns</H2>
      <Table
        headers={["Component", "Pattern", "Notes"]}
        rows={[
          ["Primary CTA", "Amber fill, black text, rounded-full, hover scale(1.04)", "Max 1 per viewport"],
          ["Secondary CTA", "Ghost with border, text fills on hover", "Inline actions"],
          ["Cards", "bgCard bg, 1px border, 16px radius, shadow-card, hover lift", "Click = expand or navigate"],
          ["Tags/Chips", "Colored bg at 12% opacity, matching text + border", "Status, categories"],
          ["Section label", "11px, amber, 0.12em tracking, UPPERCASE, monospace weight", "Above every H2"],
          ["Data callout", "Cormorant 40px, amber, metric below in DM Sans 11px CAPS", "Stats + KPIs"],
          ["Testimonial", "Italic quote, Cormorant opening mark 80px amber", "Left-border accent card"],
          ["Code blocks", "bgSurface bg, JetBrains Mono, syntax highlighting, copy btn", "All code samples"],
        ]}
      />
    </div>
  );
}

// ─── ARCHITECTURE ────────────────────────────────────────────────
function ArchSection() {
  return (
    <div>
      <SectionTitle label="Information Architecture" title="Site Structure" sub="Single-page sections for narrative flow + individual sub-pages for depth. SEO-optimized URLs with clear content hierarchy." />

      <H2>URL Structure</H2>
      <Card style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, lineHeight: 2.2, color: DS.colors.textSecondary.value }}>
        <div><span style={{ color: DS.colors.accent1.value }}>/ </span>→ Home (Landing / Hero)</div>
        <div><span style={{ color: DS.colors.accent1.value }}>/about </span>→ Full About Me page</div>
        <div><span style={{ color: DS.colors.accent1.value }}>/work </span>→ Work portfolio index</div>
        <div><span style={{ color: DS.colors.accent1.value }}>/work/[slug] </span>→ Individual case study</div>
        <div><span style={{ color: DS.colors.accent1.value }}>/side-projects </span>→ Side project index</div>
        <div><span style={{ color: DS.colors.accent1.value }}>/side-projects/[slug] </span>→ Individual side project</div>
        <div><span style={{ color: DS.colors.accent1.value }}>/ai </span>→ AI Playground hub</div>
        <div><span style={{ color: DS.colors.accent1.value }}>/ai/[slug] </span>→ Individual AI product</div>
        <div><span style={{ color: DS.colors.accent1.value }}>/bookshelf </span>→ Books + Reading notes</div>
        <div><span style={{ color: DS.colors.accent1.value }}>/articles </span>→ Writing index</div>
        <div><span style={{ color: DS.colors.accent1.value }}>/articles/[slug] </span>→ Individual article</div>
        <div><span style={{ color: DS.colors.accent1.value }}>/achievements </span>→ Awards + credentials</div>
        <div><span style={{ color: DS.colors.accent1.value }}>/tools </span>→ PM tools + stack</div>
      </Card>

      <H2>Navigation System</H2>
      <Table
        headers={["Nav Element", "Behavior", "Contents"]}
        rows={[
          ["Top Navbar (floating)", "Fixed, pill shape, blur bg, morphs to rect on mobile open", "Home, Work, AI, Writing, About, Contact + Theme toggle"],
          ["Bottom Nav Bar", "Fixed, spring-animated, expanding labels", "5 primary destinations"],
          ["Side Nav (case studies)", "Sticky scroll-tracking TOC", "Section anchors within long-form content"],
          ["Footer", "Full-width, 4-column", "Quick links, social, newsletter, colophon"],
          ["Breadcrumb", "On all sub-pages", "Back to section + current page"],
        ]}
      />

      <H2>Home Page Flow (Scroll Narrative)</H2>
      {[
        ["1", "Hero", "Name, title cycle, tagline, stats strip, 2 CTAs — immediate value proposition"],
        ["2", "Social Proof Strip", "Logos of companies worked at — silent credibility signal"],
        ["3", "Work Highlights", "3 featured projects in interactive grid — teases depth"],
        ["4", "About Snapshot", "2-col: philosophy para + headshot + quick facts — the human behind the PM"],
        ["5", "AI Playground Preview", "Showcase of 2 live AI products with demo widget — differentiator"],
        ["6", "Career Timeline", "Scroll-driven animated timeline — narrative journey"],
        ["7", "Impact Numbers", "Full-width data section — reinforce results"],
        ["8", "Articles & Bookshelf Preview", "Latest writing + current reading — intellectual depth"],
        ["9", "Testimonials", "3D image carousel + animated quotes — social validation"],
        ["10", "Achievements Strip", "Awards, certifications, speaker credits — compact credentials"],
        ["11", "Tools I Use", "Visual grid of tools — relatable and searchable"],
        ["12", "Contact", "Warm close + email + calendar link"],
      ].map(([num, name, desc]) => (
        <div key={num} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: `1px solid ${DS.colors.border.value}` }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: `rgba(232,168,56,.12)`, border: `1px solid rgba(232,168,56,.3)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 11, fontWeight: 700, color: DS.colors.accent1.value }}>{num}</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: DS.colors.textPrimary.value, marginBottom: 2 }}>{name}</div>
            <div style={{ fontSize: 12, color: DS.colors.textSecondary.value, lineHeight: 1.6 }}>{desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── PAGES PRD ───────────────────────────────────────────────────
function PagesPRD() {
  return (
    <div>
      <SectionTitle label="Page Requirements" title="Section-by-Section PRD" sub="Detailed spec for every section of the portfolio — content, interactions, and acceptance criteria." />

      {[
        {
          name: "🏠 Home / Hero",
          priority: "P0",
          desc: "The first impression. Must answer: who are you, what do you do, why does it matter — in under 8 seconds.",
          reqs: [
            ["Full-name display", "Cormorant Garamond, display-2xl, 2-line max", "must"],
            ["Animated title cycle", "5+ roles with blur+fade AnimatePresence, 2.8s interval", "must"],
            ["Sub-tagline", "1 punchy sentence, max 120 chars", "must"],
            ["Stats strip", "4 quantified metrics (products/users/revenue/years)", "must"],
            ["Dual CTAs", "Primary: View Work. Secondary: Download Resume (PDF link)", "must"],
            ["Background effect", "Animated dot grid or noise texture, subtle", "must"],
            ["Availability badge", "Pulsing green dot + 'Open to X' — toggleable from CMS", "should"],
            ["Scroll indicator", "Animated chevron, fades after first scroll", "should"],
          ],
        },
        {
          name: "👤 About Me",
          priority: "P0",
          desc: "A full page that makes the person real — not a resume paragraph, but a story with opinions and interests.",
          reqs: [
            ["Hero image", "Professional photo, editorial crop, with parallax scroll", "must"],
            ["Origin story", "3–5 paras: how I got into PM, what drives me, what I believe", "must"],
            ["PM Philosophy", "Callout card with 3–5 core product beliefs", "must"],
            ["Quick Facts sidebar", "Education, location, languages, hobbies, currently reading", "must"],
            ["Working with me", "Honest description of style, communication, decision-making", "should"],
            ["Interests outside work", "With images — humanizes the PM", "should"],
            ["Download Resume CTA", "PDF opens in new tab", "must"],
            ["Values section", "3 values with icons and short descriptions", "should"],
          ],
        },
        {
          name: "💼 Work / Projects Index",
          priority: "P0",
          desc: "Portfolio index — filterable, scannable. Each card leads to a full case study page.",
          reqs: [
            ["Project cards", "Thumbnail + company + title + tag + impact metric + year", "must"],
            ["Filter tabs", "By domain (Growth/Platform/Consumer/B2B/AI/0→1)", "must"],
            ["Sort options", "Recency / Impact / Domain", "should"],
            ["Featured badge", "Top 3 highlighted with amber border", "must"],
            ["Hover expansion", "Card expands to show brief summary without navigating", "should"],
            ["CTA per card", "'Read Case Study' button to /work/[slug]", "must"],
            ["Outcomes visible at a glance", "Key metric always visible on card without hover", "must"],
            ["Empty state", "Nice message if filter returns 0 results", "should"],
          ],
        },
        {
          name: "🔬 Side Projects",
          priority: "P1",
          desc: "Personal bets — products built on nights and weekends. Shows range, curiosity, risk tolerance.",
          reqs: [
            ["Project cards", "Similar to work but with 'Personal' badge, GitHub/live link", "must"],
            ["Tech stack chips", "Show languages/tools used", "should"],
            ["Status badge", "Live / In Progress / Archived / Open Source", "must"],
            ["Users / downloads / stars", "Social proof metric where applicable", "should"],
            ["'Why I Built It' snippet", "1–2 sentences visible on card", "must"],
            ["Full case study page", "Same template as work projects, lighter narrative", "should"],
          ],
        },
        {
          name: "🤖 AI Playground",
          priority: "P0",
          desc: "The biggest differentiator. Live AI products, experiments, and demos — not just descriptions.",
          reqs: [
            ["Hero intro", "Philosophy on AI in product — what I believe, what I'm building", "must"],
            ["AI product cards", "Each product with live demo embed or screenshot + link", "must"],
            ["Separate pages per product", "Full detail page at /ai/[slug]", "must"],
            ["Tools & stack section", "LLMs used, APIs, frameworks, orchestration", "must"],
            ["Experiments log", "Small AI experiments that didn't ship — shows process", "should"],
            ["AI reading list", "Books + papers on AI that shaped thinking", "should"],
          ],
        },
        {
          name: "📚 Bookshelf & Articles",
          priority: "P1",
          desc: "Intellectual credibility — what I read shapes how I think. Articles show communication skill.",
          reqs: [
            ["Books grid", "Cover image + title + author + my rating + 1-line takeaway", "must"],
            ["Filter by category", "Product / Strategy / Psychology / Tech / Fiction etc.", "should"],
            ["Currently reading", "Highlighted card at top with progress bar", "should"],
            ["Articles index", "Title + date + read time + topic tag + teaser sentence", "must"],
            ["Full article pages", "MDX or CMS-powered with rich typography, reading progress bar", "must"],
            ["Featured/pinned articles", "Top 3 shown on home page preview", "must"],
            ["Newsletter CTA", "Subscribe to updates — embed or link", "should"],
          ],
        },
        {
          name: "🏆 Achievements",
          priority: "P1",
          desc: "Third-party validation — awards, certifications, speaking, press, notable projects.",
          reqs: [
            ["Category tabs", "Awards / Certifications / Speaking / Press / Education", "must"],
            ["Credential cards", "Logo + issuer + date + link + short context", "must"],
            ["Timeline view toggle", "Option to view chronologically", "should"],
            ["Certifications badges", "Visual badge/certificate style cards", "should"],
            ["Speaking engagements", "Event + topic + date + recording link if available", "must"],
            ["Press mentions", "Outlet logo + headline + link + date", "should"],
          ],
        },
        {
          name: "🛠 Tools",
          priority: "P2",
          desc: "My full PM toolkit — discovery, strategy, execution, analytics, AI. Useful for community.",
          reqs: [
            ["Category grid", "Discovery / Roadmapping / Analytics / Design / AI / Communication", "must"],
            ["Tool cards", "Logo + name + category + how I use it + rating (1–5 stars)", "must"],
            ["'Recommend this stack' CTA", "Link to curated notion/sheet", "should"],
            ["Filter by category", "Click category = filter grid", "should"],
            ["New/trending badge", "On tools added recently", "should"],
            ["My templates link", "Link to downloadable PM templates section", "should"],
          ],
        },
      ].map((section, i) => (
        <div key={i} style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 24, fontWeight: 700, color: DS.colors.textPrimary.value, margin: 0 }}>{section.name}</h2>
            <span className={`chip ${section.priority === "P0" ? "tag-must" : section.priority === "P1" ? "tag-new" : "tag-v2"}`}>{section.priority}</span>
          </div>
          <P>{section.desc}</P>
          <Table
            headers={["Requirement", "Detail", "Priority"]}
            rows={section.reqs.map(([req, detail, p]) => [
              req,
              detail,
              <span className={`chip ${p === "must" ? "tag-must" : p === "should" ? "tag-new" : "tag-v2"}`}>{p}</span>
            ])}
          />
        </div>
      ))}
    </div>
  );
}

// ─── CASE STUDY ──────────────────────────────────────────────────
function CaseStudyPRD() {
  return (
    <div>
      <SectionTitle label="Case Study Spec" title="Case Study Page Template" sub="Every project — work or side — gets its own full case study page. This is the most important unit of content on the site. It must tell the product story completely." />

      <H2>URL Pattern</H2>
      <Card style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 13, color: DS.colors.teal.value }}>
        /work/payments-platform-overhaul<br/>
        /work/ai-search-0-to-1<br/>
        /side-projects/pm-cli-tool<br/>
        /ai/context-aware-doc-search
      </Card>

      <H2>Case Study Page Anatomy</H2>
      {[
        {
          zone: "01 — Hero Zone",
          elements: [
            "Large project title (Cormorant, display-xl)",
            "Company name + year + role",
            "Hero image or product screenshot (full-bleed, parallax scroll)",
            "3–4 key outcome chips (metric pills — always quantified)",
            "Tags: domain, team size, duration, my role",
            "Scroll progress bar (top of page, amber fill)",
          ]
        },
        {
          zone: "02 — TL;DR Box",
          elements: [
            "Pinned card that follows scroll (or appears at top)",
            "Problem in 1 sentence",
            "Solution in 1 sentence",
            "Single most important outcome",
            "'Read full case' anchor link if viewing summary",
          ]
        },
        {
          zone: "03 — Context & Problem",
          elements: [
            "Company/product background (2–3 paras)",
            "The problem statement — why it mattered (user pain + business cost)",
            "Constraints I was working within (time, team, tech debt, politics)",
            "What success looked like — explicit goal-setting",
          ]
        },
        {
          zone: "04 — Discovery Process",
          elements: [
            "Research methods used (interviews, surveys, data analysis, competitive analysis)",
            "Key insights surfaced — with direct user quotes",
            "Insight-to-decision mapping: what we learned and what it changed",
            "Assumptions log — what we assumed, how we validated",
          ]
        },
        {
          zone: "05 — Strategy & Framing",
          elements: [
            "How I defined and scoped the problem (Jobs-to-be-Done, opportunity tree, etc.)",
            "Options considered — what we didn't build and why",
            "The strategic bet — the one decision that mattered most",
            "Stakeholder alignment process — who I had to convince and how",
          ]
        },
        {
          zone: "06 — Solution Design",
          elements: [
            "High-level solution narrative",
            "Design artifacts: flows, wireframes, mockups (embedded images)",
            "Key product decisions with rationale",
            "Technical constraints and tradeoffs",
            "The one thing that made this hard",
          ]
        },
        {
          zone: "07 — Execution & Delivery",
          elements: [
            "Team structure: who did what",
            "Sprint/delivery structure — how we shipped iteratively",
            "Blockers encountered + how I unblocked them",
            "What changed from original plan and why",
          ]
        },
        {
          zone: "08 — Results & Impact",
          elements: [
            "Quantified outcomes — primary and secondary metrics",
            "Timeline: when we saw impact",
            "Unexpected results (positive or negative)",
            "Before/after comparison (visual if possible)",
            "NPS, retention, revenue, or engagement lift",
          ]
        },
        {
          zone: "09 — Retrospective",
          elements: [
            "What I'd do differently",
            "What I'm most proud of",
            "Learnings I carried to next project",
            "What this project taught me about PM-ing",
          ]
        },
        {
          zone: "10 — Navigation Footer",
          elements: [
            "← Previous project / Next project →",
            "Back to Work index",
            "Related case studies (2 recommendations)",
            "Contact / hire CTA",
          ]
        },
      ].map((z, i) => (
        <Card key={i} style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 11, fontFamily: "JetBrains Mono, monospace", color: DS.colors.accent1.value, marginBottom: 6 }}>{z.zone}</div>
          <ul style={{ paddingLeft: 20 }}>
            {z.elements.map((e, j) => (
              <li key={j} style={{ fontSize: 13, color: DS.colors.textSecondary.value, lineHeight: 1.7, marginBottom: 2 }}>{e}</li>
            ))}
          </ul>
        </Card>
      ))}

      <H2>Case Study Content Guidelines</H2>
      <Table
        headers={["Rule", "Why"]}
        rows={[
          ["Lead with the outcome, not the process", "Readers scan — put the number up front"],
          ["Every claim needs evidence", "Quote, data point, or artefact — no empty assertions"],
          ["Name the tension", "Good case studies show where things were hard, not just the happy path"],
          ["Include at least 1 failure or pivot", "Shows intellectual honesty and learning mindset"],
          ["Use first person confidently", "It's your story — own the decisions you made"],
          ["Keep TL;DR to 3 sentences max", "Respect skimmers, reward deep readers"],
          ["Minimum 1200 words per case study", "Google rewards depth; so do thoughtful recruiters"],
          ["Every image needs alt text + caption", "Accessibility + context"],
        ]}
      />

      <H2>Sidebar / Sticky TOC (on Desktop)</H2>
      <Card accent>
        <P style={{ marginBottom: 8 }}>Each case study has a sticky right-sidebar on desktop (≥1280px) with:</P>
        <ul style={{ paddingLeft: 20 }}>
          {["Section headings as anchor links", "Active section highlighted (scroll tracking)", "Progress indicator (% read)", "Share buttons (LinkedIn, Twitter, Copy link)", "Time to read estimate", "Back to top button"].map((item, i) => (
            <li key={i} style={{ fontSize: 13, color: DS.colors.textSecondary.value, lineHeight: 1.8 }}>{item}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

// ─── AI PRD ──────────────────────────────────────────────────────
function AIPlatformPRD() {
  return (
    <div>
      <SectionTitle label="AI Section" title="AI Playground PRD" sub="The section that separates this portfolio from every other PM. A live demonstration of building with AI — not just writing about it." />

      <H2>Section Philosophy</H2>
      <P>The AI section is a <em style={{ color: DS.colors.accent1.value }}>product-within-the-portfolio</em>. It demonstrates: AI product sense, hands-on building ability, taste in tooling, and a point-of-view on where AI products should go. It's the answer to: "How does this PM think about AI?"</P>

      <H2>AI Hub Page (/ai)</H2>
      <Table
        headers={["Block", "Content", "Priority"]}
        rows={[
          ["Hero Manifesto", "300-word philosophy: what I believe about building AI products. Not hype — grounded takes.", "P0"],
          ["AI Products Grid", "Live products I've built or shipped using AI/ML", "P0"],
          ["AI Experiments", "Smaller explorations, prototypes, prompt experiments that didn't become full products", "P0"],
          ["Stack & Philosophy", "LLMs, APIs, frameworks I use and why", "P1"],
          ["AI Reading List", "Books + papers + newsletters that shape my AI thinking", "P1"],
          ["Prompt Library", "Curated PM prompts I use daily — downloadable", "P2"],
          ["AI Newsletter / Log", "Running log of AI experiments — like a dev blog for AI building", "P2"],
        ]}
      />

      <H2>AI Product Page Template (/ai/[slug])</H2>
      {[
        ["Hero", "Product name, tagline, live demo embed or screenshot, status badge (Live/Beta/Archived)"],
        ["The Problem", "What human problem this solves — not the tech, the pain"],
        ["Why AI Here?", "Explicit reasoning: why AI was the right solution vs. traditional code"],
        ["How It Works", "Technical architecture diagram (simplified), model used, data flow"],
        ["Live Demo", "Embedded iframe or interactive component — users can try it"],
        ["Metrics", "Usage, accuracy, latency, user feedback, uptime if available"],
        ["Stack", "Full tech stack: LLM, orchestration, frontend, backend, infra"],
        ["What I Learned", "Key AI-specific learnings: prompt engineering, eval, latency, cost management"],
        ["Open Source?", "GitHub link if applicable — shows technical credibility"],
        ["Next Steps", "What would v2 look like?"],
      ].map(([name, desc], i) => (
        <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: `1px solid ${DS.colors.border.value}` }}>
          <div style={{ width: 30, fontSize: 11, fontFamily: "JetBrains Mono, monospace", color: DS.colors.accent1.value, flexShrink: 0, paddingTop: 2 }}>{String(i + 1).padStart(2, "0")}</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: DS.colors.textPrimary.value, marginBottom: 3 }}>{name}</div>
            <div style={{ fontSize: 12, color: DS.colors.textSecondary.value, lineHeight: 1.6 }}>{desc}</div>
          </div>
        </div>
      ))}

      <H2>AI Products to Feature</H2>
      <P>Each entry below is a suggested card/page in the AI section. Add/replace with your actual projects.</P>
      <Table
        headers={["Product Name", "Description", "Type", "Status"]}
        rows={[
          ["[Your AI Product 1]", "Replace with your actual product description", "AI Tool", <span className="chip tag-ai">Live</span>],
          ["[Your AI Product 2]", "Replace with your actual product description", "AI Agent", <span className="chip tag-new">Beta</span>],
          ["[Your AI Experiment 1]", "Smaller prototype or experiment", "Prototype", <span className="chip tag-v2">Archived</span>],
          ["Prompt Library", "Curated collection of PM prompts", "Resource", <span className="chip tag-ai">Live</span>],
          ["AI PM Toolkit", "Collection of AI tools for PMs", "Resource", <span className="chip tag-new">In Progress</span>],
        ]}
      />

      <H2>AI Tools & Stack Section</H2>
      <Table
        headers={["Category", "Tools", "Usage"]}
        rows={[
          ["LLMs", "GPT-4o, Claude 3.5, Gemini Pro", "Core inference for all AI products"],
          ["Orchestration", "LangChain, LlamaIndex, Vercel AI SDK", "RAG pipelines, agent workflows"],
          ["Vector DBs", "Pinecone, Supabase pgvector", "Semantic search, memory"],
          ["Frontend AI", "Vercel AI SDK, streaming, tool use", "Real-time AI UIs"],
          ["Evals", "Braintrust, LangSmith, custom scripts", "Quality measurement"],
          ["Prompt Mgmt", "PromptLayer, Langfuse, plain YAML", "Version control for prompts"],
          ["Infra", "Vercel, Railway, AWS Lambda", "Deployment, scaling"],
          ["Voice / Multi-modal", "Whisper, ElevenLabs, GPT-4V", "Audio + vision features"],
        ]}
      />
    </div>
  );
}

// ─── DEV PROMPT ──────────────────────────────────────────────────
function DevPrompt() {
  const prompt = `You are building a senior Product Manager's personal portfolio website. This is a Next.js 14 App Router project with TypeScript, Tailwind CSS, shadcn/ui, and Framer Motion.

═══════════════════════════════════════
TECH STACK
═══════════════════════════════════════
- Framework: Next.js 14 (App Router)
- Language: TypeScript (strict mode)
- Styling: Tailwind CSS v3 + CSS Variables
- Components: shadcn/ui
- Animation: Framer Motion 11
- Icons: Lucide React
- Fonts: Cormorant Garamond (display), Cabinet Grotesk (headings), DM Sans (body), JetBrains Mono (code)
- Content: MDX for articles/case studies
- Deployment: Vercel

═══════════════════════════════════════
DESIGN SYSTEM — "INK & EMBER"
═══════════════════════════════════════
CSS Variables (in globals.css):
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

FONTS: Import from Google Fonts
- Cormorant Garamond: 400, 600, 700
- DM Sans: 300, 400, 500, 600
- JetBrains Mono: 400, 500
- Cabinet Grotesk (variable): 500–800 (use fontsource or self-host)

═══════════════════════════════════════
PROJECT STRUCTURE
═══════════════════════════════════════
app/
  layout.tsx           # Root layout, fonts, theme
  page.tsx             # Home page (all sections)
  about/page.tsx
  work/
    page.tsx           # Projects index
    [slug]/page.tsx    # Case study
  side-projects/
    page.tsx
    [slug]/page.tsx
  ai/
    page.tsx           # AI hub
    [slug]/page.tsx    # AI product detail
  bookshelf/page.tsx
  articles/
    page.tsx
    [slug]/page.tsx
  achievements/page.tsx
  tools/page.tsx

components/
  ui/                  # shadcn components
  layout/
    Navbar.tsx         # Floating pill navbar
    BottomNav.tsx      # Mobile bottom nav
    Footer.tsx
  home/
    Hero.tsx
    WorkPreview.tsx
    AboutSnapshot.tsx
    AIPreview.tsx
    Timeline.tsx
    ImpactNumbers.tsx
    Testimonials.tsx
    ArticlesPreview.tsx
    AchievementsStrip.tsx
    ToolsPreview.tsx
    Contact.tsx
  work/
    ProjectCard.tsx
    ProjectGrid.tsx
    FilterTabs.tsx
    CaseStudyLayout.tsx
    CaseStudyCOntent.tsx
    CaseStudySidebar.tsx
  ai/
    AIProductCard.tsx
    AIProductDetail.tsx
    AIStackCard.tsx
    ExperimentCard.tsx
  shared/
    ThemeToggle.tsx
    SectionLabel.tsx
    MetricPill.tsx
    AnimatedText.tsx
    ScrollProgress.tsx
    ImageWithCaption.tsx

content/
  work/               # MDX case study files
  articles/           # MDX article files
  ai/                 # MDX AI product files
  side-projects/      # MDX side project files
  data/
    books.ts
    tools.ts
    achievements.ts
    testimonials.ts

═══════════════════════════════════════
KEY COMPONENTS TO BUILD
═══════════════════════════════════════

1. NAVBAR (components/layout/Navbar.tsx)
- Fixed position, top: 20px, left: 50%, transform: translateX(-50%)
- Pill shape (rounded-full) morphs to rounded-2xl on mobile menu open
- Backdrop blur, border: 1px solid var(--border)
- Background: rgba(13, 15, 26, 0.8)
- Desktop: Logo | Nav links | Theme toggle | CTA button
- Mobile: Logo | Theme toggle | Hamburger → drawer
- Nav links with AnimatedNavLink (overflow:hidden, hover slides duplicate text)
- Active section tracking via Intersection Observer

2. HERO (components/home/Hero.tsx)
- Full viewport height, flex column center
- Animated dot grid background (CSS or canvas)
- Amber radial glow at center
- Staggered entrance animations (opacity+y, Framer Motion)
- Word cycle with AnimatePresence (blur + fade transition)
- Stats strip: 4 metric boxes with Cormorant numbers
- Two CTA buttons
- Bouncing scroll chevron

3. PROJECT GRID (components/work/ProjectGrid.tsx)
- CSS Grid: 1→3 columns responsive
- Cards with Framer Motion layoutId for shared animations
- Click → expand to modal overlay
- Filter tabs with animated active indicator (layout animation)
- Each card: thumbnail, company, title, tag, outcome, year

4. CASE STUDY LAYOUT (components/work/CaseStudyLayout.tsx)
- Full-bleed hero image with parallax
- Scroll progress bar (top of viewport)
- Two-column layout: main content (65%) + sticky sidebar (35%)
- Sidebar: TOC with active section highlight
- MDX content rendering with custom components
- prev/next project navigation at bottom

5. TIMELINE (components/home/Timeline.tsx)
- Scroll-driven: useScroll + useTransform → line fills
- Alternating left/right entries
- Entrance animations: x-axis slide-in per entry
- Entry: year label, role, bullet points, small image

6. AI SECTION (app/ai/page.tsx)
- Dark hero with electric/teal color scheme
- Product cards with live demo embed or screenshot
- Stack visualization (grouped by category)
- Experiments log (lighter cards)
- Prompt library download CTA

7. BOTTOM NAV (components/layout/BottomNav.tsx)
- Fixed bottom: 20px, centered
- Spring entrance animation
- Active item: amber color + expanding text label
- Framer Motion animate on label width

8. THEME TOGGLE (components/shared/ThemeToggle.tsx)
- Integrate next-themes
- Pill toggle: moon → sun slide
- Dark: navy bg + amber tones / Light: white bg + navy tones

═══════════════════════════════════════
CONTENT DATA STRUCTURES
═══════════════════════════════════════

// types/content.ts
type Project = {
  slug: string;
  title: string;
  company: string;
  year: number;
  role: string;
  domain: "growth" | "platform" | "consumer" | "b2b" | "ai" | "0-to-1";
  duration: string;
  teamSize: string;
  thumbnail: string;
  outcomes: { metric: string; value: string; delta: string }[];
  tags: string[];
  featured: boolean;
  summary: string; // 1-2 sentences for card
}

type AIProduct = {
  slug: string;
  name: string;
  tagline: string;
  status: "live" | "beta" | "archived" | "in-progress";
  demoUrl?: string;
  githubUrl?: string;
  thumbnail: string;
  stack: string[];
  description: string;
  metrics?: { label: string; value: string }[];
}

type Book = {
  title: string;
  author: string;
  cover: string;
  category: string;
  rating: 1 | 2 | 3 | 4 | 5;
  takeaway: string; // 1-line
  readDate: string;
  status: "read" | "reading" | "want-to-read";
  link?: string;
}

type Tool = {
  name: string;
  logo: string;
  category: "discovery" | "roadmap" | "analytics" | "design" | "ai" | "communication" | "data";
  usage: string; // How I use it
  rating: 1 | 2 | 3 | 4 | 5;
  isNew?: boolean;
  link: string;
}

═══════════════════════════════════════
ANIMATION PRINCIPLES (ENFORCE THESE)
═══════════════════════════════════════
- Entrance: opacity 0→1 + y 24→0, duration 0.6s, ease [0.4, 0, 0.2, 1]
- Stagger: 0.08s delay per item in lists
- Hover cards: scale(1.025), translateY(-2px), duration 200ms
- Active states: 150ms ease-out
- Scroll-driven: useScroll + useTransform (NO scroll event listeners)
- Word cycle: AnimatePresence with filter: blur(8px) + opacity + y
- Modal open: scale 0.95→1 + opacity 0→1, shared layoutId
- Page transitions: opacity 0→1, 300ms

NEVER:
- Animate font-size
- Use transform on text in a wrapping container that clips
- Put framer-motion on every element (be selective)
- Use @keyframes when Framer Motion is available

═══════════════════════════════════════
CASE STUDY MDX FRONTMATTER
═══════════════════════════════════════
---
title: "Payments Platform Overhaul"
slug: "payments-platform-overhaul"
company: "FinTech Corp"
year: 2024
role: "Senior Product Manager"
duration: "8 months"
teamSize: "3 squads, 18 engineers, 4 designers"
domain: "platform"
thumbnail: "/images/work/payments-hero.jpg"
featured: true
outcomes:
  - metric: "Failed transactions"
    value: "↓67%"
    delta: "-67%"
  - metric: "Checkout conversion"
    value: "+34%"
    delta: "+34%"
  - metric: "Users impacted"
    value: "2.4M"
tags: ["Platform", "Payments", "0→1", "B2C"]
summary: "Rebuilt the core payments infrastructure from scratch, reducing failed transactions by 67% and increasing checkout conversion by 34% across 2.4M users."
---

═══════════════════════════════════════
SEO & PERFORMANCE REQUIREMENTS
═══════════════════════════════════════
- generateMetadata() on every page route
- Structured data (JSON-LD) for Person schema on home
- Sitemap.xml auto-generated
- Robots.txt configured
- Open Graph images (dynamic with next/og)
- LCP < 2.0s (optimize hero image: priority, sizes, WebP)
- CLS = 0 (no layout shifts: explicit width/height on all images)
- No blocking JS on initial render (defer non-critical)
- next/font for all typefaces (no CLS from font swap)

═══════════════════════════════════════
ACCESSIBILITY
═══════════════════════════════════════
- WCAG 2.1 AA minimum
- All interactive elements keyboard-navigable (tab order logical)
- Focus rings visible: ring-2 ring-[var(--accent)] on focus-visible
- All images have descriptive alt text
- ARIA labels on icon-only buttons
- Color contrast ≥ 4.5:1 for body text
- Reduced motion: @media (prefers-reduced-motion: reduce) — disable all animations
- Skip-to-content link as first focusable element

═══════════════════════════════════════
CMS / CONTENT MANAGEMENT
═══════════════════════════════════════
Use MDX files in /content for all long-form content.
Use TypeScript data files in /content/data for structured data (books, tools, achievements).
Optional: Add Contentlayer or Velite for MDX processing.
For easy updating without code deploys: consider Sanity.io or Notion API for the books/tools data only.`;

  return (
    <div>
      <SectionTitle label="Implementation Prompt" title="Master Dev Prompt" sub="Copy this entire prompt into a new conversation to build the full portfolio. It covers architecture, design system, all components, and content structures." />

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <Pill text="~2,200 tokens" color={DS.colors.electric.value} />
        <Pill text="Next.js 14" color={DS.colors.teal.value} />
        <Pill text="TypeScript" color={DS.colors.accent1.value} />
        <Pill text="Full Stack" color={DS.colors.rose.value} />
      </div>

      <div style={{ position: "relative", background: DS.colors.bgSurface.value, border: `1px solid ${DS.colors.border.value}`, borderRadius: 16, padding: 24, marginBottom: 24 }}>
        <div style={{ position: "absolute", top: 14, right: 14 }}>
          <button
            onClick={() => navigator.clipboard?.writeText(prompt)}
            style={{ padding: "6px 14px", background: DS.colors.accent1.value, color: "#000", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "DM Sans, sans-serif" }}
          >
            Copy Prompt
          </button>
        </div>
        <pre style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, lineHeight: 1.9, color: DS.colors.textSecondary.value, whiteSpace: "pre-wrap", wordBreak: "break-word", maxHeight: 520, overflowY: "auto" }}>
          {prompt}
        </pre>
      </div>

      <H2>shadcn/ui Setup Commands</H2>
      <Card style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, lineHeight: 2, color: DS.colors.teal.value }}>
        <div style={{ color: DS.colors.textMuted.value, marginBottom: 4 }}># 1. Initialize project</div>
        npx create-next-app@latest my-portfolio --typescript --tailwind --app --src-dir=false<br/>
        <div style={{ color: DS.colors.textMuted.value, marginTop: 8, marginBottom: 4 }}># 2. Add shadcn/ui</div>
        npx shadcn-ui@latest init<br/>
        <div style={{ color: DS.colors.textMuted.value, marginTop: 8, marginBottom: 4 }}># 3. Add components</div>
        npx shadcn-ui@latest add button card badge tabs dialog tooltip<br/>
        <div style={{ color: DS.colors.textMuted.value, marginTop: 8, marginBottom: 4 }}># 4. Install animation + icon deps</div>
        npm install framer-motion lucide-react next-themes<br/>
        <div style={{ color: DS.colors.textMuted.value, marginTop: 8, marginBottom: 4 }}># 5. MDX support</div>
        npm install contentlayer next-contentlayer date-fns<br/>
        npm install @fontsource-variable/cabinet-grotesk
      </Card>

      <H2>Component Files from the Documents</H2>
      <Table
        headers={["Component", "File", "Section Used In"]}
        rows={[
          ["Timeline", "components/ui/timeline.tsx", "Home → Career Journey"],
          ["Layout Grid", "components/ui/layout-grid.tsx", "Work → Project Grid"],
          ["Parallax Scroll", "components/ui/parallax-scroll.tsx", "About → Gallery"],
          ["Animated Navbar", "components/ui/mini-navbar.tsx", "Global layout"],
          ["Bottom Nav Bar", "components/ui/bottom-nav-bar.tsx", "Global layout (mobile)"],
          ["Vapour Text Effect", "components/ui/vapour-text-effect.tsx", "Hero → word cycle"],
          ["Circular Testimonials", "components/ui/circular-testimonials.tsx", "Home → Testimonials"],
          ["Container Scroll", "components/ui/container-scroll-animation.tsx", "Work or Hero section"],
          ["Theme Toggle", "components/ui/theme-toggle.tsx", "Navbar"],
        ]}
      />

      <H2>Build Order (Recommended)</H2>
      {[
        "Set up Next.js + shadcn + Tailwind + design tokens in globals.css",
        "Build Navbar + BottomNav + ThemeToggle (layout foundation)",
        "Build Hero section (word cycle, stats strip, CTAs)",
        "Build Work Index page + ProjectCard + FilterTabs",
        "Build Case Study layout + MDX rendering + Sidebar TOC",
        "Build AI Hub page + AI Product cards",
        "Build Timeline section (scroll-driven)",
        "Build About page (full page with parallax)",
        "Build Bookshelf + Articles index + Article page",
        "Build Achievements + Tools pages",
        "Build Contact section + Footer",
        "Add SEO: metadata, OG images, sitemap",
        "Add loading states, transitions, error boundaries",
        "Performance audit: LCP, CLS, fonts",
        "Accessibility audit: keyboard, contrast, ARIA",
      ].map((step, i) => (
        <div key={i} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: `1px solid ${DS.colors.border.value}` }}>
          <div style={{ width: 24, height: 24, borderRadius: "50%", background: `rgba(232,168,56,.1)`, border: `1px solid rgba(232,168,56,.2)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 10, fontWeight: 700, color: DS.colors.accent1.value }}>{i + 1}</div>
          <div style={{ fontSize: 13, color: DS.colors.textSecondary.value, lineHeight: 1.8 }}>{step}</div>
        </div>
      ))}
    </div>
  );
}
