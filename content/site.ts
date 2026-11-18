/**
 * Site-wide identity, navigation and contact details.
 * Edit copy here — components read from this file.
 *
 * Contact values left as `null` render a visible "[MY EMAIL]"-style placeholder
 * on the page. Fill them in to switch the links on.
 */

export const site = {
  name: "Mustafa Hasnain",
  wordmark: "MUSTAFA HASNAIN",
  role: "AI-Native Software Engineer",
  /** Used for canonical URLs, Open Graph and JSON-LD. Set NEXT_PUBLIC_SITE_URL in production. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  tagline:
    "I Architect the Systems. I Orchestrate the Intelligence. I Own the Outcome.",
  closing: "Human Intelligence. AI Execution. Engineered Results.",
  description:
    "Mustafa Hasnain is an AI-Native Software Engineer who architects systems, orchestrates AI tools like Claude Code and GitHub Copilot, supervises implementation and owns the engineering outcome.",
  availability: "Available for projects",
  contact: {
    email: null as string | null, // e.g. "hello@yourdomain.com"
    linkedin: null as string | null, // e.g. "https://www.linkedin.com/in/your-handle"
    github: null as string | null, // e.g. "https://github.com/your-handle"
  },
} as const;

export type NavItem = { label: string; href: string };

export const nav: NavItem[] = [
  { label: "About", href: "#foundation" },
  { label: "Expertise", href: "#capabilities" },
  { label: "Projects", href: "#work" },
  { label: "Workflow", href: "#workflow" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  eyebrow: "AI-NATIVE SOFTWARE ENGINEER / SYSTEMS ARCHITECTURE",
  /** The final words in `accent` are rendered in --blue. */
  heading: "I Architect the Systems Behind",
  accent: "Intelligent Software.",
  sub: "I combine engineering expertise, system architecture, and AI-driven execution to build sophisticated digital products.",
  primaryCta: { label: "Explore My Work", href: "#work" },
  secondaryCta: { label: "Let's Collaborate", href: "#contact" },
  strip: [
    "4+ YEARS EXPERIENCE",
    "FULL-STACK ENGINEERING",
    "AI-DRIVEN DEVELOPMENT",
    "GLOBAL COLLABORATION",
  ],
};

/** The three-part manifesto shown directly under the hero. */
export const manifesto = [
  { role: "Architect", line: "I Architect the Systems." },
  { role: "Orchestrator", line: "I Orchestrate the Intelligence." },
  { role: "Owner", line: "I Own the Outcome." },
];
