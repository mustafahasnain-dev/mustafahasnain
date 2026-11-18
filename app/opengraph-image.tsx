import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(ellipse 60% 70% at 85% 20%, rgba(52,120,246,0.16), transparent 70%), #F7F8FA",
          color: "#14243A",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, letterSpacing: 4, color: "#5F6A7D" }}>
          <div style={{ width: 10, height: 10, borderRadius: 10, background: "#3478F6" }} />
          {site.wordmark}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1, letterSpacing: -3, display: "flex", flexWrap: "wrap" }}>
            <span>I Architect the Systems Behind&nbsp;</span>
            <span style={{ color: "#3478F6" }}>Intelligent Software.</span>
          </div>
          <div style={{ fontSize: 26, color: "#5F6A7D" }}>{site.role}</div>
        </div>
        <div style={{ fontSize: 20, letterSpacing: 3, color: "#14243A" }}>
          HUMAN INTELLIGENCE. AI EXECUTION. ENGINEERED RESULTS.
        </div>
      </div>
    ),
    size
  );
}
