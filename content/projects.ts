/**
 * Chapter 05 — Selected Engineering Work.
 *
 * Only the facts you supplied are filled in. Every `null` renders as a labelled
 * "[TO SUPPLY: …]" placeholder on the page — replace it with real content.
 * Never fill these with invented metrics or outcomes.
 */

import type { Capture } from "./media";

export type CaseSection =
  | "overview"
  | "challenge"
  | "approach"
  | "architecture"
  | "implementation"
  | "outcome";

export type Project = {
  slug: string;
  name: string;
  subtitle: string;
  tech: string[];
  role: string[];
  /** Mini architecture diagram, drawn only from the listed stack. Confirm or replace. */
  diagram: { center: string; nodes: string[]; confirmed: boolean };
  screenshot: Capture;
  snippet: { code: string | null; language: string; label: string };
  sections: Record<CaseSection, string | null>;
  /** Hint shown inside each placeholder so you know what to write. */
  hints: Record<CaseSection, string>;
};

const genericHints: Record<CaseSection, string> = {
  overview: "two or three sentences on what the product is and who uses it",
  challenge: "the core technical or business problem",
  approach: "the key engineering decisions you made and why",
  architecture: "how the pieces fit — confirm or correct the diagram",
  implementation: "notable implementation details, integrations, constraints",
  outcome: "real results only — launch, usage, client feedback you can cite",
};

export const projects: Project[] = [
  {
    slug: "saro",
    name: "SARO",
    subtitle: "Live Video Commerce Platform",
    tech: ["React.js", "WebSockets", "Shopify", "WordPress"],
    role: [
      "Sole frontend engineer",
      "Developed the complete React frontend",
      "Built Shopify and WordPress integrations and plugins",
      "Worked on real-time video commerce experiences",
      "Prepared integration documentation",
    ],
    diagram: {
      center: "React.js frontend",
      nodes: ["WebSockets", "Shopify plugin", "WordPress plugin"],
      confirmed: false,
    },
    screenshot: { src: null, label: "SARO live-shopping view" },
    snippet: { code: null, language: "tsx", label: "SARO WebSocket / Shopify integration snippet" },
    sections: { overview: null, challenge: null, approach: null, architecture: null, implementation: null, outcome: null },
    hints: genericHints,
  },
  {
    slug: "technexia",
    name: "TECHNEXIA",
    subtitle: "AI-Integrated Brand Management Application",
    tech: ["Next.js", "TypeScript", "AI API integration"],
    role: [
      "Frontend development",
      "Figma-to-production implementation",
      "Component development",
      "AI-integrated application interfaces",
    ],
    diagram: {
      center: "Next.js + TypeScript app",
      nodes: ["AI API", "Component system", "Figma designs"],
      confirmed: false,
    },
    screenshot: { src: null, label: "TECHNEXIA brand-management dashboard" },
    snippet: { code: null, language: "ts", label: "TECHNEXIA AI API integration snippet" },
    sections: { overview: null, challenge: null, approach: null, architecture: null, implementation: null, outcome: null },
    hints: genericHints,
  },
  {
    slug: "smbiz",
    name: "SMBIZ",
    subtitle: "CRM & Business Automation",
    tech: ["Frontend development", "REST APIs", "Webhooks", "GoHighLevel"],
    role: [
      "Conversion-focused interfaces",
      "CRM-connected forms",
      "Business workflow automation",
      "Third-party integrations",
    ],
    diagram: {
      center: "Frontend + forms",
      nodes: ["REST APIs", "Webhooks", "GoHighLevel CRM"],
      confirmed: false,
    },
    screenshot: { src: null, label: "SMBIZ CRM-connected form flow" },
    snippet: { code: null, language: "ts", label: "SMBIZ webhook → CRM handler snippet" },
    sections: { overview: null, challenge: null, approach: null, architecture: null, implementation: null, outcome: null },
    hints: genericHints,
  },
];

export const alsoBuilt = [
  "Enterprise ERP applications",
  "Shopify e-commerce platforms",
  "WordPress applications",
  "Industrial business websites",
];

export const work = {
  label: "SELECTED ENGINEERING WORK",
  title: "From Architecture to Execution.",
};
