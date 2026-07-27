import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import { GithubIcon } from "@/components/ui/GithubIcon";
import { ContactForm } from "@/components/forms/ContactForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResumeButtons } from "@/components/ui/ResumeButtons";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/siteConfig";
import { isContactEmailConfigured } from "@/lib/email";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Hoang Minh Hai for Data Engineer internships, junior roles, freelance data projects, and technical collaboration.",
  alternates: { canonical: "/contact" },
};

function OrcidIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.016-5.325 5.016h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-4.097-3.722h-2.222z" />
    </svg>
  );
}

export default function ContactPage() {
  const emailConfigured = isContactEmailConfigured();
  const channels = [
    { href: `mailto:${siteConfig.email}`, label: "Email", value: siteConfig.email, Icon: Mail },
    { href: siteConfig.links.github, label: "GitHub", value: "github.com/Hai2310", Icon: GithubIcon },
    { href: siteConfig.links.orcid, label: "ORCID", value: "0009-0009-3301-9414", Icon: OrcidIcon },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
      <SectionHeading
        eyebrow="get in touch"
        title="Let's Build Reliable Data Systems"
        description="I am open to Data Engineer internships, junior Data Engineer opportunities, collaborative data projects, and freelance work involving ETL, data pipelines, cloud platforms, data warehousing, automation, and analytics."
      />

      <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
        <Reveal>
          <aside className="space-y-3 lg:sticky lg:top-24">
            {channels.map(({ href, label, value, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-3.5 rounded-xl border border-border bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-accent/50"
              >
                <span className="rounded-lg border border-accent/30 bg-accent/10 p-2.5 text-accent">
                  <Icon className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-xs text-muted">{label}</span>
                  <span className="block text-sm font-semibold text-foreground">{value}</span>
                </span>
              </a>
            ))}
            <div className="flex items-center gap-3.5 rounded-xl border border-border bg-surface p-4">
              <span className="rounded-lg border border-accent/30 bg-accent/10 p-2.5 text-accent">
                <MapPin className="h-4 w-4" aria-hidden />
              </span>
              <span>
                <span className="block text-xs text-muted">Location</span>
                <span className="block text-sm font-semibold text-foreground">{siteConfig.location}</span>
              </span>
            </div>
            <div className="rounded-xl border border-border bg-surface p-4">
              <p className="mb-3 text-xs text-muted">Prefer a document? Grab the resume:</p>
              <div className="flex flex-wrap gap-2">
                <ResumeButtons variant="view" className="px-3.5 py-2 text-xs" />
                <ResumeButtons variant="download" className="px-3.5 py-2 text-xs" />
              </div>
            </div>
          </aside>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
            <ContactForm emailConfigured={emailConfigured} />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
