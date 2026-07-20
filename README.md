# Otabek — Web Developer Portfolio

A fast, single-page portfolio site built with React + Vite, Framer Motion, and a working booking/contact form powered by EmailJS (no backend server needed).

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

## Connect EmailJS (make the contact form work)

The form sends submissions straight to your inbox via [EmailJS](https://www.emailjs.com/) — frontend-only, no server.

1. **Create an account** at [emailjs.com](https://www.emailjs.com/) (free tier is fine).
2. **Add an email service**: Dashboard → *Email Services* → *Add New Service* → choose **Gmail** and connect your account. Note the **Service ID**.
3. **Create a template**: Dashboard → *Email Templates* → *Create New Template*. In the template body/fields, use these variables (they match the form field names):
   - `{{from_name}}` — the visitor's name
   - `{{reply_to}}` — the visitor's email (set this as the template's Reply-To so you can reply directly)
   - `{{preferred_time}}` — their preferred call time
   - `{{message}}` — what they need built

   Note the **Template ID**.
4. **Get your Public Key**: Dashboard → *Account* → *General* → **Public Key**.
5. **Paste the three values** into [src/components/Contact.jsx](src/components/Contact.jsx) at the top:

   ```js
   const SERVICE_ID = 'YOUR_SERVICE_ID'
   const TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
   const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'
   ```

6. Test the form — you should receive an email within seconds.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com](https://vercel.com/) → *Add New Project* → import the repo.
3. Vercel auto-detects Vite — the defaults are correct (build command `npm run build`, output directory `dist`). Click **Deploy**.
4. Done. Every push to the main branch redeploys automatically.

Alternatively, from the terminal: `npm i -g vercel && vercel`.

## Tech

- **React + Vite** — fast dev server and optimized production bundle
- **Framer Motion** — hero stagger, scroll reveals, and the looping build-log animation
- **@emailjs/browser** — contact form email delivery, no backend
- **Plain CSS** — custom design system with CSS variables, responsive, respects `prefers-reduced-motion`
