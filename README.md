# Hoang Minh Hai — Data Engineer Portfolio

Production-ready personal portfolio for **Hoang Minh Hai**, a Data Engineer in Hanoi, Vietnam. The site presents professional experience, six detailed Data Engineering case studies, technical skills, public GitHub repositories, a downloadable CV, and a secure contact flow.

> **Live demo:** replace this line after deployment with your Vercel or custom-domain URL.

## What is included

- Home, About, Experience, Projects, Skills, Contact, six case-study pages, loading/error states, and a custom 404 page.
- Responsive animated data-pipeline hero with reduced-motion support.
- Light and dark themes.
- Actual profile photo and the complete CV in `public/`.
- Public GitHub repository integration with server-side caching, scoring, filtering, manual overrides, request timeout, and a local fallback snapshot.
- Contact form using React Hook Form and Zod, with honeypot protection, origin validation, 16 KB request limit, rate limiting, Resend/Formspree support, and direct-email fallback.
- Optional Upstash Redis rate limiting for multi-instance/serverless deployments.
- SEO: canonical URL, Open Graph, Twitter card, generated social image, sitemap, robots, manifest, and JSON-LD.
- Accessibility: semantic structure, skip link, focus styles, keyboard navigation, form error associations, diagram descriptions, and reduced-motion handling.
- Security headers including CSP, HSTS in production, frame restrictions, nosniff, referrer policy, and permissions policy.
- Vitest unit tests, Playwright E2E tests, project doctor, and GitHub Actions CI.
- Vercel and Docker deployment support.

## Technology stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 15 App Router, React 19, TypeScript strict |
| Styling | Tailwind CSS 4, CSS custom properties, system font stack |
| Motion | Framer Motion and reduced-motion-aware CSS |
| Forms | React Hook Form, Zod |
| Email | Resend preferred, server-side Formspree fallback |
| Data | GitHub REST API with Next.js caching and local snapshot |
| Testing | Vitest, React Testing Library, Playwright |
| Deployment | Vercel, standalone Docker image |

## Requirements

- Node.js **20.19.x or 22.x**
- npm **10+**

The repository includes `.nvmrc` and npm engine checks.

## Quick start

### Windows PowerShell

```powershell
Copy-Item .env.example .env.local
npm ci
npm run doctor
npm run dev
```

### macOS/Linux

```bash
cp .env.example .env.local
npm ci
npm run doctor
npm run dev
```

Open `http://localhost:3000`.

For access from another device on the same network:

```bash
npm run dev:host
```

A complete Vietnamese guide is available in [`HUONG_DAN_CHAY_VA_DEPLOY.md`](./HUONG_DAN_CHAY_VA_DEPLOY.md).

## Quality checks

```bash
npm run check
```

This runs:

1. Project doctor
2. ESLint with zero warnings allowed
3. TypeScript type check
4. Vitest unit tests
5. Production build

Run E2E separately:

```bash
npx playwright install chromium
npm run test:e2e
```

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start local development server |
| `npm run dev:host` | Start development server on `0.0.0.0` |
| `npm run doctor` | Validate Node version, required files, and core environment settings |
| `npm run build` | Create production build |
| `npm run start` | Start production server after build |
| `npm run format` | Format files with Prettier |
| `npm run format:check` | Verify formatting |
| `npm run lint` | Run ESLint with no warnings allowed |
| `npm run typecheck` | Run TypeScript without emitting files |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run Playwright tests |
| `npm run check` | Run the complete local quality gate |

## Environment variables

Copy `.env.example` to `.env.local`.

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production | Public site origin used by canonical links, metadata, sitemap, and JSON-LD |
| `NEXT_PUBLIC_GITHUB_USERNAME` | No | Public GitHub username; defaults to `Hai2310` |
| `GITHUB_USERNAME` | No | Server-side compatibility fallback |
| `GITHUB_TOKEN` | No | Server-only token to raise public API limits |
| `RESEND_API_KEY` | No | Preferred contact-email provider |
| `CONTACT_FROM_EMAIL` | With Resend | Verified sender address/domain |
| `CONTACT_TO_EMAIL` | With contact provider | Destination for portfolio messages |
| `FORMSPREE_ENDPOINT` | No | Server-only Formspree endpoint |
| `ALLOWED_ORIGINS` | Recommended | Comma-separated additional origins allowed to post contact messages |
| `UPSTASH_REDIS_REST_URL` | No | Shared serverless rate-limiter URL |
| `UPSTASH_REDIS_REST_TOKEN` | No | Shared serverless rate-limiter token |

No provider is required for the site to run. When email delivery is not configured, the Contact page displays a direct `mailto:` fallback.

## Project structure

```text
src/
├── app/
│   ├── api/contact/route.ts
│   ├── api/github/route.ts
│   ├── api/health/route.ts
│   ├── about/
│   ├── contact/
│   ├── experience/
│   ├── projects/[slug]/
│   ├── skills/
│   ├── error.tsx
│   ├── global-error.tsx
│   ├── loading.tsx
│   ├── template.tsx
│   └── ...
├── components/
│   ├── diagrams/
│   ├── forms/
│   ├── github/
│   ├── layout/
│   ├── projects/
│   ├── sections/
│   ├── seo/
│   └── ui/
├── config/siteConfig.ts
├── data/
├── lib/
└── types/
public/
├── HoangMinhHai_DataEngineer_CV.pdf
└── profile.jpg
scripts/
└── doctor.mjs
tests/
├── e2e/
└── unit/
```

## Content editing

- Main identity, links, SEO, resume, image, GitHub configuration: `src/config/siteConfig.ts`
- Profile, education, workflow, strengths: `src/data/profile.ts`
- Experience: `src/data/experience.ts`
- Skills: `src/data/skills.ts`
- Case studies: `src/data/projects.ts`
- Repository classification overrides: `src/data/projectOverrides.ts`
- Local GitHub snapshot: `src/data/githubFallback.ts`
- Resume: `public/HoangMinhHai_DataEngineer_CV.pdf`
- Photo: `public/profile.jpg`

Public content intentionally omits date of birth, precise home address, and phone number. The phone number remains only inside the downloadable CV.

## GitHub integration

GitHub repositories are requested only on the server. The token is optional and is never exposed to browser JavaScript.

The integration:

- excludes forks by default;
- uses manual overrides for important repositories;
- scores Data Engineering relevance and recent activity;
- classifies repositories into Data Engineering, Cloud, Streaming, Data Warehouse, Analytics/BI, AI/ML, Web/Apps, and Other;
- uses a request timeout and Next.js revalidation;
- falls back to `src/data/githubFallback.ts` when GitHub is unavailable;
- does not display a stale repository count as live data.

## Contact architecture

Preferred provider order:

1. Resend
2. Formspree through the server route
3. Direct email fallback

The API validates JSON content type, payload size, request origin, honeypot, and Zod schema. It applies five requests per minute per client key. Upstash Redis is recommended for a shared limit on Vercel; the bounded in-memory fallback is suitable for local or a single server instance.

The site does not store contact-form submissions.

## Deploy to Vercel

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Keep the detected Next.js settings.
4. Add variables from `.env.example`.
5. Set `NEXT_PUBLIC_SITE_URL` to the actual Vercel URL or custom domain.
6. Set `ALLOWED_ORIGINS` to the same production origin.
7. Configure Resend or Formspree if online contact delivery is needed.
8. Deploy and test all pages, the CV, GitHub fallback/live mode, and the Contact page.

After changing a `NEXT_PUBLIC_*` variable, redeploy because public variables are embedded during build.

## Docker

Docker Compose:

```bash
docker compose --env-file .env.local up --build -d
```

Manual build:

```bash
docker build \
  --build-arg NEXT_PUBLIC_SITE_URL=https://your-domain.com \
  --build-arg NEXT_PUBLIC_GITHUB_USERNAME=Hai2310 \
  -t hmh-portfolio .

docker run --rm -p 3000:3000 --env-file .env.local hmh-portfolio
```

The standalone server runs as a non-root user and exposes `GET /api/health` for container health checks.

## CI

`.github/workflows/ci.yml` runs on pushes to `main` and pull requests. It installs with `npm ci`, then runs doctor, linting, type checking, unit tests, and production build.

## Security

Read [`SECURITY.md`](./SECURITY.md). Never commit `.env.local`, GitHub tokens, Resend keys, Upstash tokens, credentials, internal bank data, or proprietary rule mappings.

If a secret is committed, revoke it first, remove it from Git history, and redeploy with a new value.

## Review notes

The code-review findings and changes are documented in [`REVIEW_REPORT_VI.md`](./REVIEW_REPORT_VI.md).

## License

MIT — see [`LICENSE`](./LICENSE).
