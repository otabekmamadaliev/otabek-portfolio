import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'
import { useLang } from '../i18n/lang.jsx'
import oliwkaShot from '../assets/projects/oliwka.webp'
import aureliaShot from '../assets/projects/aurelia.webp'
import ministoreShot from '../assets/projects/ministore.webp'
import widgetShot from '../assets/projects/widget.webp'
import deleteanythingShot from '../assets/projects/deleteanything.webp'

// Structure and links live here; translatable copy comes from i18n by index.
// Order is deliberate: the ordering system leads because it is the only one
// with a backend of its own, and the last three are the React demos.
const META = [
  {
    tags: ['Cloudflare Workers', 'D1 / SQLite', 'PWA', 'Playwright'],
    href: 'https://github.com/otabekmamadaliev/oliwka-zamowienia',
    shot: oliwkaShot,
  },
  {
    tags: ['React', 'Vite', 'EmailJS'],
    href: 'https://aurelia-booking.vercel.app',
    shot: aureliaShot,
  },
  {
    tags: ['React', 'Vite', 'Stripe', 'Vercel Functions'],
    href: 'https://mini-store-olive.vercel.app',
    shot: ministoreShot,
  },
  {
    tags: ['React', 'Vite', 'Gemini API', 'Shadow DOM'],
    href: 'https://ai-support-widget-sand.vercel.app',
    shot: widgetShot,
  },
  {
    tags: ['Node.js', 'No dependencies', 'Own build pipeline', 'SEO'],
    href: 'https://deleteanything.com',
    shot: deleteanythingShot,
  },
]

function Projects() {
  const { t } = useLang()

  return (
    <section className="section" id="projects">
      <div className="container">
        <SectionHead
          label={t.sections.work}
          title={t.projects.title}
          datum={t.sections.workDatum}
        />

        <div className="work">
          {META.map((meta, i) => {
            const c = t.projects.items[i]
            return (
              <Reveal key={i} delay={0.06 * i}>
                <a
                  className="work-item"
                  href={meta.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div>
                    <p className="work-top">
                      <span className="work-state">
                        <span className="lamp" aria-hidden="true" />
                        {c.status}
                      </span>
                    </p>
                    <h3 className="work-name">{c.title}</h3>
                    <p className="work-mech">{c.artLabel}</p>
                    <p className="work-desc">{c.desc}</p>
                    <div className="work-tags">
                      {meta.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <span className="work-open">
                      {t.projects.open}
                      <span className="arr" aria-hidden="true">
                        &#8599;
                      </span>
                    </span>
                  </div>

                  <div className="work-shot">
                    <img
                      src={meta.shot}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      aria-hidden="true"
                    />
                  </div>
                </a>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Projects
