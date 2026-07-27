import { Download, FileText } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { cn } from "@/lib/utils";

interface ResumeButtonsProps {
  variant?: "view" | "download" | "compact";
  className?: string;
}

export function ResumeButtons({ variant = "view", className }: ResumeButtonsProps) {
  const { path, downloadName } = siteConfig.resume;

  if (variant === "compact") {
    return (
      <a
        href={path}
        download={downloadName}
        className={cn(
          "inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-background shadow-sm transition-transform hover:-translate-y-0.5 hover:opacity-95",
          className,
        )}
      >
        <FileText className="h-4 w-4" aria-hidden />
        Resume
      </a>
    );
  }

  const isView = variant === "view";
  return (
    <a
      href={path}
      target="_blank"
      rel="noopener noreferrer"
      download={isView ? undefined : downloadName}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5",
        isView
          ? "border border-border bg-surface text-foreground hover:border-accent/60"
          : "bg-accent text-background shadow-[0_0_24px_-6px] shadow-accent/50 hover:opacity-95",
        className,
      )}
    >
      {isView ? (
        <>
          <FileText className="h-4 w-4" aria-hidden /> View Resume
        </>
      ) : (
        <>
          <Download className="h-4 w-4" aria-hidden /> Download Resume
        </>
      )}
    </a>
  );
}
