import Reveal from './Reveal.jsx'

const TAGS = ['React', 'Vite', 'EmailJS', 'Framer Motion']

function Project() {
  return (
    <section className="section" id="project">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Featured project</p>
          <h2 className="section-title">Booking &amp; contact system</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="project-card">
            <div className="project-tags">
              {TAGS.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <p className="project-desc">
              The booking form on this very site is a live feature I built
              end-to-end: a validated React form, motion design, and an email
              pipeline that delivers every request straight to my inbox — with
              no backend server, so the site stays fast on a CDN.
            </p>
            <p className="project-invite">
              Try it below — you&apos;ll get a reply from me personally.
            </p>
            <a className="btn btn-gold" href="#contact">
              Try the live demo ↓
            </a>
            <p className="project-note">
              More projects available privately on request.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Project
