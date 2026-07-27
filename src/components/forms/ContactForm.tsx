"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail, Send } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { contactSchema, OPPORTUNITY_TYPES, type ContactFormValues } from "@/lib/validation";
import { siteConfig } from "@/config/siteConfig";
import { cn } from "@/lib/utils";

const inputClasses =
  "w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted transition-colors focus:border-accent";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-xs text-red-500">
      {message}
    </p>
  );
}

export function ContactForm({ emailConfigured }: { emailConfigured: boolean }) {
  const { notify } = useToast();
  const [mailtoFallback, setMailtoFallback] = useState(!emailConfigured);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { opportunityType: "Data Engineering Role", website: "" },
  });

  const messageLength = watch("message")?.length ?? 0;

  const onSubmit = async (values: ContactFormValues) => {
    if (!emailConfigured) {
      setMailtoFallback(true);
      notify("error", "Online sending is not configured yet. Please use the direct email button.");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const body = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        code?: string;
        message?: string;
      };

      if (response.ok && body.ok) {
        notify("success", "Message sent successfully. I will get back to you soon.");
        reset();
        setMailtoFallback(false);
        return;
      }
      if (body.code === "EMAIL_NOT_CONFIGURED") {
        setMailtoFallback(true);
        notify("error", "Online sending is not configured right now. Please use direct email.");
        return;
      }
      if (response.status === 429) {
        notify("error", "Too many messages in a short time. Please wait a minute and try again.");
        return;
      }
      notify("error", body.message ?? "Could not send your message. Please try again or use email directly.");
    } catch {
      setMailtoFallback(true);
      notify("error", "Network error. Please try again or use email directly.");
    }
  };

  const directEmailHref = `mailto:${siteConfig.email}?subject=${encodeURIComponent("Portfolio contact")}`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5" aria-busy={isSubmitting}>
      <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      {!emailConfigured && (
        <div role="status" className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-muted">
          Online form delivery is not configured on this deployment. You can still contact me directly by email.
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-xs font-semibold text-foreground">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            maxLength={100}
            placeholder="Your name"
            className={inputClasses}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
          <FieldError id="name-error" message={errors.name?.message} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-foreground">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            maxLength={200}
            placeholder="you@company.com"
            className={inputClasses}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          <FieldError id="email-error" message={errors.email?.message} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="organization" className="mb-1.5 block text-xs font-semibold text-foreground">
            Company / Organization
          </label>
          <input
            id="organization"
            type="text"
            autoComplete="organization"
            maxLength={150}
            placeholder="Optional"
            className={inputClasses}
            aria-invalid={Boolean(errors.organization)}
            aria-describedby={errors.organization ? "organization-error" : undefined}
            {...register("organization")}
          />
          <FieldError id="organization-error" message={errors.organization?.message} />
        </div>
        <div>
          <label htmlFor="opportunityType" className="mb-1.5 block text-xs font-semibold text-foreground">
            Opportunity Type <span className="text-red-500">*</span>
          </label>
          <select
            id="opportunityType"
            className={cn(inputClasses, "appearance-none")}
            aria-invalid={Boolean(errors.opportunityType)}
            aria-describedby={errors.opportunityType ? "opportunity-error" : undefined}
            {...register("opportunityType")}
          >
            {OPPORTUNITY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <FieldError id="opportunity-error" message={errors.opportunityType?.message} />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="mb-1.5 block text-xs font-semibold text-foreground">
          Subject <span className="text-red-500">*</span>
        </label>
        <input
          id="subject"
          type="text"
          maxLength={200}
          placeholder="e.g. Junior Data Engineer opportunity"
          className={inputClasses}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          {...register("subject")}
        />
        <FieldError id="subject-error" message={errors.subject?.message} />
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between gap-3">
          <label htmlFor="message" className="block text-xs font-semibold text-foreground">
            Message <span className="text-red-500">*</span>
          </label>
          <span className="font-mono text-[10px] text-muted">{messageLength}/5000</span>
        </div>
        <textarea
          id="message"
          rows={6}
          maxLength={5000}
          placeholder="Tell me about the role, project, or collaboration…"
          className={cn(inputClasses, "resize-y")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : "message-help"}
          {...register("message")}
        />
        <p id="message-help" className="mt-1.5 text-[11px] text-muted">
          Please include the role or project scope, expected timeline, and the best way to follow up.
        </p>
        <FieldError id="message-error" message={errors.message?.message} />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-background transition-all hover:-translate-y-0.5 hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Send className="h-4 w-4" aria-hidden />}
          {isSubmitting ? "Sending…" : "Send Message"}
        </button>
        {mailtoFallback && (
          <a
            href={directEmailHref}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent/60"
          >
            <Mail className="h-4 w-4" aria-hidden /> Email me directly
          </a>
        )}
      </div>

      <p className="text-[11px] leading-relaxed text-muted">
        Messages are validated, rate-limited, and sent through a server route. This website does not store contact-form submissions.
      </p>
    </form>
  );
}
