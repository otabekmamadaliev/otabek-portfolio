import Reveal from './Reveal.jsx'
import { useLang } from '../i18n/lang.jsx'

// Glyphs are language-independent; names/notes come from i18n by index.
const GLYPHS = ['{}', '</>', 'R+V', 'RWD', 'API', '@', 'FIX', 'AI']

function Skills() {
  const { t } = useLang()
  return (
    <section className="section" id="skills">
      <div className="container">
        <Reveal>
          <p className="eyebrow">{t.skills.eyebrow}</p>
          <h2 className="section-title">{t.skills.title}</h2>
          <span className="title-underline" aria-hidden="true" />
        </Reveal>
        <div className="skills-grid">
          {t.skills.items.map((skill, i) => (
            <Reveal key={i} delay={0.05 * i}>
              <div className="skill-tile">
                <span className="skill-glyph" aria-hidden="true">
                  {GLYPHS[i]}
                </span>
                <h3 className="skill-name">{skill.name}</h3>
                <p className="skill-note">{skill.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
