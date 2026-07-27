import { z } from "zod";

export const OPPORTUNITY_TYPES = [
  "Data Engineering Role",
  "Internship",
  "Freelance Project",
  "Technical Collaboration",
  "Other",
] as const;

const isSingleLine = (value: string) => !/[\r\n]/.test(value);

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(100)
    .refine(isSingleLine, { message: "Name must be a single line." }),
  email: z.string().trim().email("Please enter a valid email address.").max(200),
  organization: z
    .string()
    .trim()
    .max(150)
    .refine(isSingleLine, { message: "Organization must be a single line." })
    .optional()
    .or(z.literal("")),
  subject: z
    .string()
    .trim()
    .min(3, "Please enter a subject.")
    .max(200)
    .refine(isSingleLine, { message: "Subject must be a single line." }),
  opportunityType: z.enum(OPPORTUNITY_TYPES),
  message: z.string().trim().min(10, "Message should be at least 10 characters.").max(5000),
  /** Honeypot — must stay empty. Humans never see this field. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

/** Strip control characters and angle brackets to neutralize HTML injection. */
export function sanitizePlainText(input: string): string {
  return input
    .replace(/[<>]/g, "")
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .trim();
}

/** Normalize fields that must never contain email-header line breaks. */
export function sanitizeSingleLine(input: string): string {
  return sanitizePlainText(input).replace(/[\r\n\t]+/g, " ").replace(/\s{2,}/g, " ").trim();
}
