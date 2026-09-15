# Otabek — Software Engineer Portfolio

A fast, multilingual single-page portfolio positioning Otabek as a junior software engineer. It presents five deployed products, an interactive booking-engine module, technical capabilities, internship evidence, and a downloadable CV.

**Live:** [otabekmamadaliev.com](https://otabekmamadaliev.com) (also at [otabekmamadaliev.vercel.app](https://otabekmamadaliev.vercel.app))

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

To create a production build:

```bash
npm run build
npm run preview   # serves the built site locally
```

## Deploy

Hosted on **Vercel**, connected to this repo — **every push to `main` auto-deploys**. To reproduce from scratch:

1. Push this repo to GitHub.
2. [vercel.com](https://vercel.com/) → *Add New Project* → import the repo. Vercel auto-detects Vite (build `npm run build`, output `dist`). Click **Deploy**.

### Custom domain (otabekmamadaliev.com)

The domain is registered on **Cloudflare** and connected to Vercel:

1. In Vercel: *Project → Settings → Domains* → add `otabekmamadaliev.com` (with "redirect apex to www").
2. In Cloudflare DNS, add the two records Vercel shows — both **CNAME** (`@` and `www`) pointing to Vercel's target, each set to **DNS only** (grey cloud). Cloudflare's proxy can interfere with Vercel's automatic SSL and redirects, so DNS-only is the setup [Vercel recommends](https://vercel.com/docs/projects/domains) — leave proxying off unless you know you need it and have configured Cloudflare SSL to match.
3. Vercel verifies and issues SSL automatically within a few minutes.

## Tech

- **React + Vite** — component architecture and optimized production build
- **Custom JavaScript** — interactive availability engine and language controls
- **Vercel Analytics** — lightweight production analytics
- **Plain CSS** — custom responsive design system with reduced-motion support
