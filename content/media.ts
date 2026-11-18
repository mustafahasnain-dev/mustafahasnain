/**
 * Every image, video and interface capture on the site is declared here.
 *
 * Rules (from the brief):
 *  - Interface captures (Claude Code, GitHub, Copilot, Figma, project apps) must be
 *    REAL screenshots you supply. Never swap in generated screens.
 *  - Generated imagery is only for the setting: you, the workstation, the room, light.
 *
 * While a `src` is `null`, the site renders a labelled glass placeholder such as
 * "[CAPTURE: Claude Code terminal running a task]". Drop the file into /public and
 * set `src` to switch it on.
 */

export type Capture = {
  /** Path under /public, e.g. "/captures/claude-code.png". */
  src: string | null;
  /** Placeholder label and alt-text basis. */
  label: string;
  alt?: string;
  width?: number;
  height?: number;
};

export type SceneStill = {
  src: string | null;
  label: string;
  alt: string;
  width?: number;
  height?: number;
};

export const heroMedia = {
  /** H1 hero still (16:9). Its left ~40% is negative space for the headline. */
  poster: {
    src: "/media/hero.jpg",
    label: "H1 hero still — Mustafa at the daylight workstation",
    alt: "Mustafa Hasnain working at a bright, minimalist workstation with two monitors and a laptop in a daylight studio.",
    width: 2752,
    height: 1536,
  } as SceneStill,
  /** 9:16 reframe of H1 used below 768px. Falls back to `poster`. */
  posterMobile: {
    src: null,
    label: "H1 mobile reframe (9:16)",
    alt: "Mustafa Hasnain at his workstation.",
    width: 1080,
    height: 1920,
  } as SceneStill,
  /** H2 8-second seamless loop. Desktop + motion-allowed only. */
  video: null as null | { mp4: string; webm?: string },
};

export const closingMedia: SceneStill = {
  src: null,
  label: "Closing still — the same studio at golden hour, work shipped",
  alt: "The workstation at golden hour with the laptop closed.",
  width: 2560,
  height: 1080,
};

/** Captures that float around the hero workstation, joined to the MCP hub. */
export const heroCaptures = {
  claudeCode: {
    src: null,
    label: "Claude Code terminal running a task",
  } as Capture,
  githubPr: {
    src: null,
    label: "GitHub pull request with Copilot suggestions",
  } as Capture,
  figma: { src: null, label: "Figma frame from a real project" } as Capture,
  browser: { src: null, label: "Browser preview of a shipped app" } as Capture,
  database: {
    src: null,
    label: "Database schema / API request panel",
  } as Capture,
};

/** Captures shown inside the Chapter 02 workflow sequence. */
export const workflowCaptures = {
  architect: {
    src: null,
    label: "Real system diagram or database schema from a project",
  } as Capture,
  orchestrate: {
    src: null,
    label: "Claude Code terminal receiving a scoped task",
  } as Capture,
  build: { src: null, label: "Real diff from an implementation" } as Capture,
  review: {
    src: null,
    label: "PR review with a rejected suggestion and the fix",
  } as Capture,
  deliver: { src: null, label: "The live, deployed application" } as Capture,
};
