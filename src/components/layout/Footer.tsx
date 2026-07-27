"use client";

import Link from "next/link";
import { ArrowUp, Mail, FileText } from "lucide-react";
import { GithubIcon } from "@/components/ui/GithubIcon";
import { siteConfig } from "@/config/siteConfig";
import { NAV_LINKS } from "@/components/layout/Header";

function OrcidIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.016-5.325 5.016h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-4.097-3.722h-2.222z" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const socials = [
    { href: siteConfig.links.github, label: "GitHub", Icon: GithubIcon },
    { href: `mailto:${siteConfig.email}`, label: "Email", Icon: Mail },
    { href: siteConfig.links.orcid, label: "ORCID", Icon: OrcidIcon },
    { href: siteConfig.resume.path, label: "Resume", Icon: FileText },
  ];

  return (
    <footer className="border-t border-border bg-surface/50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-mono text-sm font-bold text-accent">HMH</p>
            <p className="mt-3 text-sm font-medium text-foreground">Designed and engineered by Hoang Minh Hai.</p>
            <p className="mt-1.5 text-sm text-muted">
              Building reliable pipelines, trusted data platforms, and useful analytics.
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-2 sm:grid-cols-3">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-muted transition-colors hover:text-accent">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                title={label}
                className="rounded-lg border border-border bg-surface p-2.5 text-muted transition-colors hover:border-accent/50 hover:text-accent"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-muted">© {year} Hoang Minh Hai. All rights reserved.</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-accent"
          >
            <ArrowUp className="h-3.5 w-3.5" aria-hidden /> Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
