import Reveal from './Reveal.jsx'

const SKILLS = [
  { glyph: '{}', name: 'Web application development', note: 'end-to-end builds' },
  { glyph: '</>', name: 'HTML / CSS / JavaScript', note: 'core of every site' },
  { glyph: 'R+V', name: 'React + Vite', note: 'this site runs on it' },
  { glyph: 'RWD', name: 'Responsive design', note: 'mobile-first' },
  { glyph: 'API', name: 'API integration', note: 'third-party services' },
  { glyph: '@', name: 'Forms & email workflows', note: 'like the booking form below' },
  { glyph: 'FIX', name: 'Debugging & fixes', note: 'yours or inherited code' },
  { glyph: 'AI', name: 'AI-assisted development', note: 'speed with quality' },
]

function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Skills</p>
          <h2 className="section-title">My Toolbox</h2>
          <span className="title-underline" aria-hidden="true" />
        </Reveal>
        <div className="skills-grid">
          {SKILLS.map((skill, i) => (
            <Reveal key={skill.name} delay={0.05 * i}>
              <div className="skill-tile">
                <span className="skill-glyph" aria-hidden="true">
                  {skill.glyph}
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
