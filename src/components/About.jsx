import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'
import { useLang } from '../i18n/lang.jsx'

const FACT_KEYS = ['based', 'studying', 'languages', 'reply']

function About() {
  const { t } = useLang()

  return (
    <section className="section" id="about">
      <div className="container">
        <SectionHead
          label={t.sections.profile}
          title={t.about.title}
          datum={t.sections.profileDatum}
        />
        <div className="about">
          <Reveal>
            <div className="about-body">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="facts">
              {FACT_KEYS.map((key) => (
                <div className="fact" key={key}>
                  <dt className="legend">{t.about.facts[key].k}</dt>
                  <dd className="v">{t.about.facts[key].v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default About
