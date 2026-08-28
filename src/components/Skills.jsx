import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'
import { useLang } from '../i18n/lang.jsx'

// A spec sheet rather than a grid of icon tiles: what I do on the left,
// the honest qualifier on the right, hairline between rows.
function Skills() {
  const { t } = useLang()

  return (
    <section className="section" id="skills">
      <div className="container">
        <SectionHead
          label={t.sections.capability}
          title={t.skills.title}
          datum={t.sections.capabilityDatum}
        />
        <Reveal>
          <div className="spec">
            {t.skills.items.map((skill, i) => (
              <div className="spec-row" key={i}>
                <span className="spec-name">{skill.name}</span>
                <span className="spec-note">{skill.note}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Skills
