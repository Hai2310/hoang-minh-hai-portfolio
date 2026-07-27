"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const options = [
  { value: "light", label: "Light theme", Icon: Sun },
  { value: "dark", label: "Dark theme", Icon: Moon },
  { value: "system", label: "System theme", Icon: Monitor },
] as const;

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);
  const selectedTheme = theme ?? "system";

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        className={cn("h-9 w-[104px] rounded-lg border border-border bg-surface", className)}
        aria-hidden
      />
    );
  }

  const moveSelection = (event: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (currentIndex + 1) % options.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (currentIndex - 1 + options.length) % options.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = options.length - 1;
    }

    if (nextIndex === null) return;
    event.preventDefault();
    setTheme(options[nextIndex].value);
    buttons.current[nextIndex]?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label="Color theme"
      className={cn("flex items-center gap-0.5 rounded-lg border border-border bg-surface p-1", className)}
    >
      {options.map(({ value, label, Icon }, index) => (
        <button
          key={value}
          ref={(element) => {
            buttons.current[index] = element;
          }}
          type="button"
          role="radio"
          aria-checked={selectedTheme === value}
          aria-label={label}
          title={label}
          tabIndex={selectedTheme === value ? 0 : -1}
          onClick={() => setTheme(value)}
          onKeyDown={(event) => moveSelection(event, index)}
          className={cn(
            "rounded-md p-1.5 transition-colors",
            selectedTheme === value ? "bg-accent/15 text-accent" : "text-muted hover:text-foreground",
          )}
        >
          <Icon className="h-4 w-4" aria-hidden />
        </button>
      ))}
    </div>
  );
}
