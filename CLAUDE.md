# otabek-portfolio

Otabek Mamadaliev's freelance portfolio. Live at **https://otabekmamadaliev.com**
(Vercel project `otabekmamadaliev`; pushes to `main` auto-deploy).

## Stack — do not assume otherwise

React 19 + Vite 8, **plain JavaScript (`.jsx`, not TypeScript)**, **hand-written CSS
with custom properties** in one file, `src/index.css`.

**No Tailwind. No CSS-in-JS. No component library. No animation library.**
`framer-motion` was removed deliberately (117 kB -> 78 kB gzip); motion is two CSS
primitives, `.rise` (load, staggered inline) and `.reveal` (IntersectionObserver).
Do not reintroduce a dependency to solve something CSS already does here.

Dependencies are only: `react`, `react-dom`, `@emailjs/browser`, `@vercel/analytics`.

## Layout

```
src/index.css              entire design system, ~950 lines, token block at top
src/components/Rail.jsx    fixed left rail + mobile topbar (both, one component)
src/components/Engine.jsx  the hero's working availability engine - see below
src/components/SectionHead.jsx  the "bezel" section header
src/i18n/translations.js   ALL copy, 4 languages, joined to components by index
src/i18n/lang.jsx          LanguageProvider / useLang
```

## Rules that will bite you

- **Four languages: `en`, `uz`, `pl`, `ru`.** Any copy change must land in all four
  or the site breaks in the others. Components hold structure (tags, hrefs, rates);
  `translations.js` holds only text, matched **by array index**.
- **Branch + PR into `main`. Never commit directly to main.**
- **`C:\Users\ASUS` is itself a git repo with an unborn `main`.** Running git from
  the wrong cwd silently operates on the home directory. Always
  `cd /c/Users/ASUS/Desktop/otabek-portfolio` first.
- Ad blockers hide elements whose class contains `social` — the profile icons use
  `.profile-row` / `.profile-link` for this reason. Do not rename them back.
- EmailJS IDs in `Contact.jsx` are client-public by design; leaving them inline is a
  decision, not an oversight.

## The hero engine

`Engine.jsx` is the availability core from the AURELIA project, rebuilt small and
running live on the page. It is the site's whole argument ("most portfolios show
screenshots; mine run"), so treat it as load-bearing, not decoration.

`RESERVED` is a **fixed** list of `[room, dayOffset]` pairs. Do not randomise it —
a grid that reshuffles every reload reads as decoration rather than data.

## Verifying changes

`npm run build` must pass. `npx oxlint src` — one pre-existing fast-refresh warning
in `lang.jsx` is expected; anything else is yours.

Two traps when checking visually:

1. **The Browser preview pane does not paint reliably here** and freezes
   `requestAnimationFrame`, so CSS/JS animations never advance and screenshots come
   back blank or mid-transition. It also emulates `prefers-reduced-motion: reduce`.
   Verify in real Chrome instead.
2. **Neither browser can emulate a phone viewport** — the pane ignores the request,
   and the Chrome window will not resize below screen width. To test mobile, inject
   a same-origin iframe and measure inside it; it gets its own layout viewport, so
   media queries evaluate correctly:

   ```js
   const f = document.createElement('iframe')
   f.src = '/'; f.style.cssText = 'width:390px;height:800px'
   document.body.appendChild(f)
   // then read f.contentDocument / f.contentWindow
   ```

   This is how the mobile overflow bug was found; a desktop check would have missed it.

## Design intent

Direction is "Control Room": the page is the console of someone who runs live
software, so structural devices report real values instead of decorating. Section
headers carry a **true datum** on the right. The rail reports the three deployed
services and live Warsaw time.

Dark only — **light mode was tried and rejected three times**, do not propose it again.

Palette is a petrol ink ground (deliberately not near-black) plus a semantic signal
triad: `--sodium` live, `--oxide` blocked, `--verdigris` clear. Type is Bricolage
Grotesque / Public Sans / Martian Mono — chosen specifically to avoid the
Space Grotesk + Inter + JetBrains Mono trio that reads as AI-generated.
