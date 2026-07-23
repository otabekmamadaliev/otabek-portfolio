import Reveal from './Reveal.jsx'
import { useLang } from '../i18n/lang.jsx'

function About() {
  const { t } = useLang()
  return (
    <section className="section" id="about">
      <div className="container">
        <Reveal>
          <p className="eyebrow">{t.about.eyebrow}</p>
          <h2 className="section-title">{t.about.title}</h2>
          <span className="title-underline" aria-hidden="true" />
        </Reveal>
        <div className="about-grid">
          <Reveal delay={0.1}>
            <div className="about-body">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="about-art" aria-hidden="true">
              <pre>
                <span className="k">const</span> developer = {'{'}
                {'\n'}  passion: <span className="s">&apos;building&apos;</span>,
                {'\n'}  focus: <span className="s">&apos;solutions&apos;</span>,
                {'\n'}  goal: <span className="s">&apos;growth&apos;</span>,
                {'\n'}
                {'}'};
              </pre>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default About
