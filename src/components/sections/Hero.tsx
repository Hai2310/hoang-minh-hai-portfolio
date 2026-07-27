"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { GithubIcon } from "@/components/ui/GithubIcon";
import { PipelineDiagram } from "@/components/diagrams/PipelineDiagram";
import { ResumeButtons } from "@/components/ui/ResumeButtons";
import { profile } from "@/data/profile";
import { siteConfig } from "@/config/siteConfig";

function RotatingRole() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % profile.animatedRoles.length), 2600);
    return () => clearInterval(id);
  }, [reduce]);

  if (reduce) return <span className="text-gradient font-semibold">{profile.animatedRoles[0]}</span>;

  return (
    <span className="relative inline-flex h-[1.4em] min-w-[240px] overflow-hidden align-bottom sm:min-w-[340px]">
      <AnimatePresence mode="wait">
        <motion.span
          key={profile.animatedRoles[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.21, 0.65, 0.36, 1] }}
          className="text-gradient absolute left-0 font-semibold"
        >
          {profile.animatedRoles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function OrcidIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.016-5.325 5.016h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-4.097-3.722h-2.222z" />
    </svg>
  );
}

export function Hero() {
  const socials = [
    { href: siteConfig.links.github, label: "GitHub", Icon: GithubIcon },
    { href: `mailto:${siteConfig.email}`, label: "Email", Icon: Mail },
    { href: siteConfig.links.orcid, label: "ORCID", Icon: OrcidIcon },
  ];

  return (
    <section className="grid-bg relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_70%_20%,color-mix(in_srgb,var(--accent)_12%,transparent),transparent)]"
      />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-28 lg:pt-24">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-success/40 bg-success/10 px-3.5 py-1.5 text-xs font-medium text-success"
          >
            <span className="status-dot h-2 w-2 rounded-full bg-success" aria-hidden />
            Open to Data Engineering Opportunities
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mt-6 text-3xl font-extrabold leading-[1.15] tracking-tight text-foreground sm:text-4xl lg:text-[2.9rem]"
          >
            I build reliable data systems that turn raw data into{" "}
            <span className="text-gradient">business value</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="mt-4 text-lg text-muted"
          >
            <RotatingRole />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 }}
            className="mt-5 max-w-xl text-sm leading-relaxed text-muted sm:text-base"
          >
            {profile.heroIntro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-background shadow-[0_0_28px_-6px] shadow-accent/60 transition-all hover:-translate-y-0.5 hover:opacity-95"
            >
              Explore My Projects <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <ResumeButtons variant="download" />
            <Link
              href="/contact"
              className="text-sm font-semibold text-accent underline-offset-4 transition-colors hover:underline"
            >
              Contact Me
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex items-center gap-2"
          >
            <span className="terminal-label mr-1">links</span>
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                title={label}
                className="rounded-lg border border-border bg-surface p-2.5 text-muted transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
            {siteConfig.links.linkedin ? (
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
                className="rounded-lg border border-border bg-surface p-2.5 text-muted transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452z" />
                </svg>
              </a>
            ) : null}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          <PipelineDiagram />
        </motion.div>
      </div>
    </section>
  );
}
