import Reveal from './Reveal.jsx'
import { useLang } from '../i18n/lang.jsx'
import aureliaShot from '../assets/projects/aurelia.webp'
import ministoreShot from '../assets/projects/ministore.webp'
import widgetShot from '../assets/projects/widget.webp'

// Visual/structural config per project; translatable text comes from i18n by index.
const META = [
  {
    art: 'art-violet',
    tags: ['React', 'Vite', 'EmailJS'],
    href: 'https://aurelia-booking.vercel.app',
    shot: aureliaShot,
    external: true,
  },
  {
    art: 'art-indigo',
    tags: ['React', 'Vite', 'Stripe'],
    href: 'https://mini-store-olive.vercel.app',
    shot: ministoreShot,
    external: true,
  },
  {
    art: 'art-magenta',
    tags: ['React', 'Vite', 'Gemini API'],
    href: 'https://ai-support-widget-sand.vercel.app',
    shot: widgetShot,
    external: true,
  },
]

function ProjectCard({ meta, content }) {
  const card = (
    <>
      <div className={`project-art ${meta.art}`}>
        <span className="orb" aria-hidden="true" />
        {meta.shot && (
          <img
            className="project-shot"
            src={meta.shot}
            alt=""
            loading="lazy"
            decoding="async"
            aria-hidden="true"
          />
        )}
        <span className="project-scrim" aria-hidden="true" />
        <span className="art-label">{content.artLabel}</span>
      </div>
      <div className="project-body">
        <p className="project-status">{content.status}</p>
        <h3 className="skill-name">{content.title}</h3>
        {/* Clamped so every card is the same height at rest; the full text is in
            the DOM for screen readers and unclamps on hover. */}
        <p className="project-desc">{content.desc}</p>
        <div className="project-meta">
          <div className="project-tags">
            {meta.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          {meta.href && <span className="project-arrow">↗</span>}
        </div>
      </div>
    </>
  )

  return meta.href ? (
    <a
      className="project-card"
      href={meta.href}
      {...(meta.external && { target: '_blank', rel: 'noreferrer' })}
    >
      {card}
    </a>
  ) : (
    <div className="project-card">{card}</div>
  )
}

function Projects() {
  const { t } = useLang()
  return (
    <section className="section" id="projects">
      <div className="container">
        <Reveal>
          <p className="eyebrow">{t.projects.eyebrow}</p>
          <h2 className="section-title">{t.projects.title}</h2>
          <span className="title-underline" aria-hidden="true" />
        </Reveal>
        <div className="projects-grid">
          {META.map((meta, i) => (
            <Reveal key={i} delay={0.08 * i}>
              <ProjectCard meta={meta} content={t.projects.items[i]} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
