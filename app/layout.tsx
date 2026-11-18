import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { site } from "@/content/site";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { RevealObserver } from "@/components/motion/RevealObserver";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const title = `${site.name} — ${site.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s — ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: site.name,
    title,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F7F8FA",
  colorScheme: "light",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  description: site.description,
  url: site.url,
  ...(site.contact.email ? { email: `mailto:${site.contact.email}` } : {}),
  sameAs: [site.contact.linkedin, site.contact.github].filter(Boolean),
  knowsAbout: [
    "Software architecture",
    "AI-assisted software development",
    "Claude Code",
    "Model Context Protocol",
    "React",
    "Next.js",
    "TypeScript",
    "Shopify",
    "WordPress",
    "API integration",
  ],
};

/** Flags JS so scroll reveals can start hidden; un-hides everything if hydration never completes. */
const jsFlag = `(function(){var d=document.documentElement;d.classList.add('js');setTimeout(function(){if(!d.dataset.revealReady){d.classList.add('reveal-fallback')}},4000)})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable} antialiased`}
    >
      <body>
        <Script id="js-flag" strategy="beforeInteractive">
          {jsFlag}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <a
          href="#main"
          className="label-mono fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-ink px-4 py-3 text-white transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        {children}
        <SmoothScroll />
        <RevealObserver />
      </body>
    </html>
  );
}
