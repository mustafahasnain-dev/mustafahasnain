/**
 * Copy for Chapters 01, 02, 03, 04, 06, 07 and 08.
 * Projects (Chapter 05) live in ./projects.ts.
 */

/* ── CHAPTER 01 — THE FOUNDATION ─────────────────────────────────────────── */

export const foundation = {
  label: "THE FOUNDATION",
  title: "Built on Engineering. Evolved Through Intelligence.",
  paragraphs: [
    "I'm Mustafa Hasnain, an AI-Native Software Engineer with over four years of experience building software products, digital platforms, and business-focused applications.",
    "My journey began with enterprise software development and expanded into SaaS platforms, e-commerce ecosystems, real-time applications, API integrations, and AI-integrated products.",
    "Today, I combine hands-on engineering expertise with AI-assisted development workflows to design, build, supervise, and deliver complete software solutions.",
  ],
  /** No dates on purpose — add a `period` string to show one. */
  timeline: [
    { title: "Enterprise Software", detail: "ERP and business applications", period: null },
    { title: "Web Platforms", detail: "WordPress, custom plugins", period: null },
    { title: "Commerce Ecosystems", detail: "Shopify, WooCommerce", period: null },
    { title: "Real-Time & SaaS", detail: "React, Next.js, WebSockets", period: null },
    { title: "AI-Native Engineering", detail: "Claude Code, MCP, supervised AI workflows", period: null },
  ] as { title: string; detail: string; period: string | null }[],
};

/* ── CHAPTER 02 — THE WORKFLOW ───────────────────────────────────────────── */

export type Control = "HUMAN" | "AI + HUMAN";

export type WorkflowStep = {
  id: "architect" | "orchestrate" | "connect" | "build" | "review" | "deliver";
  verb: string;
  title: string;
  detail: string;
  control: Control;
};

export const workflow = {
  label: "THE WORKFLOW",
  title: "AI Accelerates. Engineering Directs.",
  intro:
    "One workstation, six steps. The indicator on the left shows who is in control at every point.",
  steps: [
    {
      id: "architect",
      verb: "ARCHITECT",
      title: "Human defines the architecture.",
      detail: "Requirements, the system diagram, the database schema and the API plan are decided before any code is written.",
      control: "HUMAN",
    },
    {
      id: "orchestrate",
      verb: "ORCHESTRATE",
      title: "Claude Code receives the task.",
      detail: "Context, constraints and a scoped task are handed to Claude Code — deliberately, one piece at a time.",
      control: "HUMAN",
    },
    {
      id: "connect",
      verb: "CONNECT",
      title: "MCP tools support implementation.",
      detail: "GitHub, Figma, the database, the browser and APIs connect through MCP so the work has real context.",
      control: "AI + HUMAN",
    },
    {
      id: "build",
      verb: "BUILD",
      title: "Code and interfaces evolve.",
      detail: "Diffs land and the interface moves from wireframe to finished screen, inside the boundaries already set.",
      control: "AI + HUMAN",
    },
    {
      id: "review",
      verb: "REVIEW",
      title: "Human reviews, debugs, improves.",
      detail: "Every change is read. Bugs are caught, suggestions are rejected when they don't fit, and fixes are made.",
      control: "HUMAN",
    },
    {
      id: "deliver",
      verb: "DELIVER",
      title: "A complete working application ships.",
      detail: "Tests pass, the build deploys and the application goes live — with a human accountable for the result.",
      control: "HUMAN",
    },
  ] as WorkflowStep[],
  statement:
    "AI generates possibilities. Engineering expertise determines what gets approved, implemented, and shipped.",
};

/* ── CHAPTER 03 — ARCHITECTURE ───────────────────────────────────────────── */

export type ArchitectureLayer = {
  name: string;
  summary: string;
  covers: string[];
  tools: string[];
};

export const architecture = {
  label: "ARCHITECTURE",
  title: "Before Code, There Is Architecture.",
  body: "I approach software as a complete system. From database structures and API design to application workflows and integrations, every technical decision contributes to the reliability and scalability of the final product.",
  layers: [
    {
      name: "User Experience",
      summary: "How people move through the product — flows, states and structure, settled before components are built.",
      covers: ["User flows", "Interface states", "Information architecture", "Accessibility"],
      tools: ["Figma"],
    },
    {
      name: "Frontend Application",
      summary: "The interface layer: component systems, rendering strategy, state and real-time updates.",
      covers: ["Component architecture", "State management", "Rendering strategy", "Performance"],
      tools: ["React.js", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS"],
    },
    {
      name: "Backend Services",
      summary: "The business logic and services the interface depends on, kept separate from presentation.",
      covers: ["Business logic", "Real-time channels", "Custom plugins", "Service boundaries"],
      tools: ["WebSockets", "WordPress"],
    },
    {
      name: "API & Integration",
      summary: "Contracts between systems: designed, documented and versioned rather than improvised.",
      covers: ["API design", "Webhooks", "Third-party integrations", "Integration documentation"],
      tools: ["REST APIs", "Webhooks", "Shopify Admin API", "GoHighLevel"],
    },
    {
      name: "Database & Data",
      summary: "The structure everything else stands on. Schema decisions are made early and made deliberately.",
      covers: ["Database design", "Data modelling", "Relationships & constraints", "Data flow"],
      tools: [],
    },
    {
      name: "AI & Automation",
      summary: "Where intelligent tools and automation plug into the system — supervised, scoped and reviewed.",
      covers: ["AI API integration", "Claude Code workflows", "MCP-connected tools", "Business automation"],
      tools: ["Claude Code", "Claude API", "GitHub Copilot", "MCP"],
    },
    {
      name: "Infrastructure & Deployment",
      summary: "How the product reaches people: environments, release process and what happens after launch.",
      covers: ["Environments", "Release process", "Deployment", "Post-launch support"],
      tools: [],
    },
  ] as ArchitectureLayer[],
};

/* ── CHAPTER 04 — CAPABILITIES ───────────────────────────────────────────── */

export const capabilities = {
  label: "ENGINEERING CAPABILITIES",
  title: "Engineering Across Every Layer.",
  items: [
    {
      title: "System Architecture & Design",
      items: ["Software architecture", "Database design", "API architecture", "Application workflows", "Technical planning"],
    },
    {
      title: "AI Orchestration",
      items: ["Claude Code workflows", "AI-assisted implementation", "Context engineering", "Code supervision", "Debugging and review"],
    },
    {
      title: "Full-Stack Development",
      items: ["React.js", "Next.js", "TypeScript", "JavaScript", "Modern frontend engineering"],
    },
    {
      title: "E-Commerce Engineering",
      items: ["Shopify", "Liquid", "Shopify Admin API", "Custom themes", "WooCommerce"],
    },
    {
      title: "Automation & Integrations",
      items: ["REST APIs", "Webhooks", "Third-party integrations", "CRM automation", "Custom plugins"],
    },
    {
      title: "Technical Leadership",
      items: ["Technical decision-making", "Architecture reviews", "Development planning", "Code quality", "Engineering supervision"],
    },
    {
      title: "Software Consulting",
      items: ["Technical discovery", "Solution design", "Product planning", "System improvement", "Agency partnerships"],
    },
  ],
};

/* ── CHAPTER 06 — ECOSYSTEM ──────────────────────────────────────────────── */

export const ecosystem = {
  label: "THE TECHNOLOGY ECOSYSTEM",
  title: "The Tools Are Instruments. Engineering Is the Advantage.",
  center: "Engineering Judgment",
  groups: [
    { name: "Frontend", items: ["React.js", "Next.js", "Vue.js", "TypeScript", "JavaScript", "Tailwind CSS"] },
    { name: "AI & Development", items: ["Claude Code", "Claude API", "GitHub Copilot", "ChatGPT", "MCP integrations", "AI-assisted workflows"], emphasis: true },
    { name: "E-commerce", items: ["Shopify", "Liquid", "Shopify Admin API", "WooCommerce"] },
    { name: "CMS", items: ["WordPress", "Elementor", "ACF", "Custom Plugin Development"] },
    { name: "Animation & Visualization", items: ["GSAP", "Three.js"] },
    { name: "Integrations", items: ["REST APIs", "Webhooks", "Third-party integrations"] },
  ] as { name: string; items: string[]; emphasis?: boolean }[],
};

/* ── CHAPTER 07 — COLLABORATION ──────────────────────────────────────────── */

export const collaboration = {
  label: "THE COLLABORATION",
  title: "An Engineering Partner for Ambitious Teams.",
  body: "I collaborate with software development companies and digital agencies to extend engineering capabilities, take ownership of technical challenges, and turn complex requirements into production-ready digital products.",
  models: [
    { title: "Product Engineering", body: "Complete application development and feature implementation." },
    { title: "Architecture & Consulting", body: "Technical planning, database design, APIs, and system architecture." },
    { title: "AI-Native Development", body: "AI-assisted implementation with engineering supervision and quality control." },
    { title: "Agency Partnerships", body: "White-label development and ongoing technical collaboration." },
  ],
  cta: { heading: "Have a Complex Project in Mind?", label: "Let's Build It Together", href: "#contact" },
};

/* ── CHAPTER 08 — CONTACT ────────────────────────────────────────────────── */

export const contact = {
  label: "FINAL CONTACT",
  title: "Let's Engineer What's Next.",
  body: "Have a product to build, a system to architect, or an engineering challenge to solve? Let's discuss how we can work together.",
  cta: "Start a Conversation",
};
