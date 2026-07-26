import { useCallback, useEffect, useRef, useState } from 'react'
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

/** How long the pointer must rest on a card before we start loading the real site. */
const LIVE_DELAY = 400
/** CSS width the preview iframe renders at before being scaled down to fit. */
const PREVIEW_WIDTH = 1280

function ProjectCard({ meta, content }) {
  // The screenshot is the instant layer; the iframe is a progressive upgrade.
  // `mounted` means we've started loading it, `ready` means it has finished and
  // can be faded in over the screenshot. Once loaded we keep it — re-hovering
  // should be instant, and there are only three of them.
  const [mounted, setMounted] = useState(false)
  const [ready, setReady] = useState(false)
  const timer = useRef(null)

  // Touch devices have no hover, and loading three sites over mobile data to
  // show a preview nobody asked for would be rude. Screenshot only there.
  const [canPreview, setCanPreview] = useState(false)
  useEffect(() => {
    setCanPreview(window.matchMedia('(hover: hover) and (pointer: fine)').matches)
  }, [])

  useEffect(() => () => clearTimeout(timer.current), [])

  // The iframe renders at a desktop width and is scaled down, so the preview
  // shows each site's desktop layout rather than its mobile breakpoint. The
  // scale has to match the card's real width or the frame is cropped, and card
  // width changes with the viewport — so measure it instead of guessing.
  const artRef = useRef(null)
  useEffect(() => {
    const el = artRef.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width
      if (w) el.style.setProperty('--preview-scale', (w / PREVIEW_WIDTH).toFixed(4))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const onEnter = useCallback(() => {
    if (!canPreview || mounted || !meta.href) return
    timer.current = setTimeout(() => setMounted(true), LIVE_DELAY)
  }, [canPreview, mounted, meta.href])

  const onLeave = useCallback(() => clearTimeout(timer.current), [])

  const card = (
    <>
      <div className={`project-art ${meta.art}`} ref={artRef}>
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
        {mounted && (
          <iframe
            className={`project-live${ready ? ' is-ready' : ''}`}
            src={meta.href}
            title={content.title}
            onLoad={() => setReady(true)}
            loading="lazy"
            tabIndex={-1}
            aria-hidden="true"
            sandbox="allow-scripts allow-same-origin"
          />
        )}
        <span className="project-scrim" aria-hidden="true" />
        <span className="art-label">{content.artLabel}</span>
        {meta.href && (
          <span className="project-open" aria-hidden="true">
            Open ↗
          </span>
        )}
      </div>
      <div className="project-body">
        <p className="project-status">{content.status}</p>
        <h3 className="skill-name">{content.title}</h3>
        {/* Clamped to keep every card the same height; the full text is still in
            the DOM for screen readers, and unclamps visually on hover. */}
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

  const props = {
    className: 'project-card',
    onMouseEnter: onEnter,
    onMouseLeave: onLeave,
    onFocus: onEnter,
    onBlur: onLeave,
  }

  return meta.href ? (
    <a {...props} href={meta.href} {...(meta.external && { target: '_blank', rel: 'noreferrer' })}>
      {card}
    </a>
  ) : (
    <div {...props}>{card}</div>
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
