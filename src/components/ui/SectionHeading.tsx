import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({ eyebrow, title, description, align = "left", className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-10 max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <p className={cn("terminal-label mb-3 flex items-center gap-2", align === "center" && "justify-center")}>
        <span className="inline-block h-px w-6 bg-accent/70" aria-hidden />
        {eyebrow}
      </p>
      <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{title}</h2>
      {description ? <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{description}</p> : null}
    </div>
  );
}
