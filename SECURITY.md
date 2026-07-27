# Security Policy

## Reporting a vulnerability

Please do not open a public GitHub issue for a security vulnerability. Send a concise report to `minhhaiit1k68@gmail.com` with the affected route, reproduction steps, expected impact, and any suggested mitigation.

## Secrets

- Never commit `.env.local`, API keys, access tokens, or provider credentials.
- GitHub and email provider credentials are read only by server routes.
- If a secret is exposed, revoke it immediately, remove it from Git history, and redeploy with a replacement.

## Public data

This portfolio intentionally exposes only public professional information. It does not publish confidential employer data, customer records, banking credentials, proprietary source mappings, or internal screenshots.
