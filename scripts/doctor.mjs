import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";

function loadLocalEnvironment() {
  const inheritedKeys = new Set(Object.keys(process.env));
  for (const filename of [".env", ".env.local"]) {
    const path = resolve(process.cwd(), filename);
    if (!existsSync(path)) continue;

    for (const rawLine of readFileSync(path, "utf8").split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#")) continue;
      const separator = line.indexOf("=");
      if (separator <= 0) continue;

      const key = line.slice(0, separator).trim();
      if (!/^[A-Z_][A-Z0-9_]*$/i.test(key) || inheritedKeys.has(key)) continue;

      let value = line.slice(separator + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  }
}

loadLocalEnvironment();

const minimum = [20, 19, 0];
const current = process.versions.node.split(".").map(Number);
const isSupported =
  current[0] > minimum[0] ||
  (current[0] === minimum[0] &&
    (current[1] > minimum[1] || (current[1] === minimum[1] && current[2] >= minimum[2])));

const errors = [];
const warnings = [];

if (!isSupported || current[0] >= 23) {
  errors.push(`Node.js ${process.versions.node} is unsupported. Use Node.js 20.19.x or 22.x.`);
}

const requiredFiles = [
  "package.json",
  "next.config.ts",
  "src/app/layout.tsx",
  "src/config/siteConfig.ts",
  "public/HoangMinhHai_DataEngineer_CV.pdf",
  "public/profile.jpg",
];

for (const file of requiredFiles) {
  const path = resolve(process.cwd(), file);
  if (!existsSync(path)) errors.push(`Missing required file: ${file}`);
  else if (statSync(path).size === 0) errors.push(`Required file is empty: ${file}`);
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
if (siteUrl) {
  try {
    const parsed = new URL(siteUrl);
    if (!/^https?:$/.test(parsed.protocol)) errors.push("NEXT_PUBLIC_SITE_URL must use http or https.");
    if (parsed.pathname !== "/") {
      warnings.push("NEXT_PUBLIC_SITE_URL should normally be the site origin without a path.");
    }
  } catch {
    errors.push("NEXT_PUBLIC_SITE_URL is not a valid absolute URL.");
  }
} else {
  warnings.push("NEXT_PUBLIC_SITE_URL is not set; localhost is used until production deployment.");
}

const resendConfigured = Boolean(
  process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL && process.env.CONTACT_TO_EMAIL,
);
const formspreeConfigured = Boolean(process.env.FORMSPREE_ENDPOINT);
if (!resendConfigured && !formspreeConfigured) {
  warnings.push("No email provider is configured; the contact page will use the mailto fallback.");
}

console.log(`Portfolio doctor — Node.js ${process.versions.node}`);
for (const warning of warnings) console.warn(`WARN: ${warning}`);
for (const error of errors) console.error(`ERROR: ${error}`);

if (errors.length > 0) process.exit(1);
console.log("OK: required files and core configuration look valid.");
