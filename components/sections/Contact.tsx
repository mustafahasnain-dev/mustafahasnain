import Image from "next/image";
import { contact } from "@/content/chapters";
import { closingMedia } from "@/content/media";
import { nav, site } from "@/content/site";
import { ChapterLabel } from "@/components/ui/Chapter";
import { ButtonLink } from "@/components/ui/Buttons";
import { PlaceholderTag } from "@/components/ui/Placeholder";

export function Contact() {
  const { email, linkedin, github } = site.contact;
  const channels = [
    { label: "Email", value: email, href: email ? `mailto:${email}` : null, placeholder: "MY EMAIL" },
    { label: "LinkedIn", value: linkedin?.replace(/^https?:\/\/(www\.)?/, ""), href: linkedin, placeholder: "MY LINKEDIN URL" },
    { label: "GitHub", value: github?.replace(/^https?:\/\/(www\.)?/, ""), href: github, placeholder: "MY GITHUB URL" },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden bg-surface pt-28 md:pt-40">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div data-reveal>
              <ChapterLabel index="08" label={contact.label} />
            </div>
            <h2
              id="contact-title"
              data-reveal
              className="mt-6 max-w-[12ch] text-[clamp(3rem,8vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.05em] text-ink"
            >
              {contact.title}
            </h2>
          </div>
          <div data-reveal className="flex flex-col gap-8 self-end lg:col-span-4">
            <p className="text-[17px] leading-[1.7] text-muted-text">{contact.body}</p>
            <ButtonLink href={email ? `mailto:${email}` : "#contact-channels"} arrow className="self-start">
              {contact.cta}
            </ButtonLink>
          </div>
        </div>

        <ul id="contact-channels" className="mt-16 grid border-t border-ink/15 md:mt-24 md:grid-cols-3">
          {channels.map((c, i) => (
            <li
              key={c.label}
              data-reveal
              className={`flex min-h-24 flex-col justify-center gap-2 border-border py-6 ${i > 0 ? "border-t md:border-l md:border-t-0 md:pl-8" : ""}`}
            >
              <span className="label-mono text-muted-text">{c.label}</span>
              {c.href && c.value ? (
                <a
                  href={c.href}
                  {...(c.label !== "Email" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group inline-flex items-center gap-2 self-start font-display text-[clamp(1.2rem,1.8vw,1.5rem)] font-medium tracking-[-0.02em] text-ink"
                >
                  <span className="bg-[linear-gradient(var(--blue),var(--blue))] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 ease-premium group-hover:bg-[length:100%_1px]">
                    {c.value}
                  </span>
                  <span aria-hidden className="cta-arrow text-blue">↗</span>
                </a>
              ) : (
                <PlaceholderTag kind="TO SUPPLY" label={c.placeholder} className="self-start text-[11px]" />
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* closing scene */}
      <div className="container-x mt-20 md:mt-32">
        <p
          data-reveal
          className="mb-8 font-display text-[clamp(1.9rem,5.4vw,5.25rem)] font-semibold uppercase leading-[0.95] tracking-[-0.04em] text-ink md:mb-12"
        >
          Human Intelligence.
          <br />
          <span className="text-blue">AI Execution.</span>
          <br />
          Engineered Results.
        </p>
        <div data-reveal className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-border sm:aspect-[21/9] md:rounded-[36px]">
          {closingMedia.src ? (
            <Image
              src={closingMedia.src}
              alt={closingMedia.alt}
              fill
              sizes="(min-width: 1360px) 1264px, 92vw"
              className="object-cover"
            />
          ) : (
            <GoldenHourPlaceholder />
          )}
        </div>
      </div>

      <div aria-hidden className="h-16 md:h-24" />
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-surface">
      <div className="container-x border-t border-border py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <a href="#top" className="font-display text-[15px] font-semibold tracking-[0.14em] text-ink">
            {site.wordmark}
          </a>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="inline-flex min-h-11 items-center text-[14px] text-muted-text transition-colors hover:text-ink">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="label-mono mt-8 text-[10px] text-muted-text">
          © {site.name} — {site.closing}
        </p>
      </div>
    </footer>
  );
}

/** Stand-in for the generated golden-hour still: calm, bright, no person. */
function GoldenHourPlaceholder() {
  return (
    <div className="absolute inset-0 bg-[linear-gradient(170deg,#ffffff_0%,#f1f4fa_40%,#e3e9f6_70%,#ddd9f3_100%)]">
      <div
        aria-hidden
        className="absolute -left-[5%] top-[-30%] h-[120%] w-[55%] rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.95),transparent)]"
      />
      <div
        aria-hidden
        className="absolute bottom-[-40%] right-[-10%] h-[100%] w-[60%] rounded-full bg-[radial-gradient(closest-side,rgb(120_101_216/0.18),transparent)]"
      />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[34%] border-t border-white bg-[linear-gradient(180deg,#ffffff_0%,#eef2f9_100%)]" />
      <div aria-hidden className="absolute bottom-[33%] left-[54%] h-[2.2%] w-[16%] rounded-sm bg-white shadow-[0_8px_24px_-10px_rgb(20_36_58/0.3)]" />
      <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
        <PlaceholderTag kind="SCENE" label={closingMedia.label} />
      </div>
    </div>
  );
}
