# Otabek — Web Developer Portfolio

A fast, single-page portfolio site built with React + Vite, Framer Motion, and a working booking/contact form powered by EmailJS (no backend server needed). Dark purple-neon design with a fixed sidebar nav.

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

## EmailJS (the contact form)

The booking form sends submissions straight to the inbox via [EmailJS](https://www.emailjs.com/) — frontend-only, no server. **It's already connected** — the live keys are in [src/components/Contact.jsx](src/components/Contact.jsx).

If you ever need to reconnect it to a different account, redo these steps and replace the three constants at the top of that file (`SERVICE_ID`, `TEMPLATE_ID`, `PUBLIC_KEY`):

1. **Create an account** at [emailjs.com](https://www.emailjs.com/) (free tier is fine).
2. **Add an email service**: Dashboard → *Email Services* → *Add New Service* → choose **Gmail** and connect. Note the **Service ID**.
3. **Create a template**: Dashboard → *Email Templates* → *Create New Template*. Use these variables (they match the form field names), and set `{{reply_to}}` as the template's Reply-To so replies go straight to the visitor:
   - `{{from_name}}` — the visitor's name
   - `{{reply_to}}` — the visitor's email
   - `{{preferred_time}}` — their preferred call time
   - `{{message}}` — what they need built

   Note the **Template ID**.
4. **Get your Public Key**: Dashboard → *Account* → *General* → **Public Key**.
5. Paste the three values into [src/components/Contact.jsx](src/components/Contact.jsx) and test — you should receive an email within seconds.

> Note: these three IDs are public identifiers, not secrets — they ship in the browser bundle, so committing them is expected. To stop them being reused to spam the inbox from other sites, restrict allowed origins in EmailJS (*Account → Security → Allowed origins*) and rotate the public key if it's ever abused.

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

- **React + Vite** — fast dev server and optimized production bundle
- **Framer Motion** — hero stagger, scroll reveals, and the looping build-log animation
- **@emailjs/browser** — contact form email delivery, no backend
- **Plain CSS** — custom design system with CSS variables, responsive, respects `prefers-reduced-motion`
