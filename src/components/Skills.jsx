import Reveal from './Reveal.jsx'

const SKILLS = [
  { name: 'Web application development', note: 'end-to-end builds' },
  { name: 'HTML / CSS / JavaScript', note: 'core of every site' },
  { name: 'React + Vite', note: 'this site runs on it' },
  { name: 'Responsive design', note: 'mobile-first' },
  { name: 'API integration', note: 'third-party services' },
  { name: 'Forms & email workflows', note: 'like the booking form below' },
  { name: 'Debugging & fixes', note: 'yours or inherited code' },
  { name: 'AI-assisted development', note: 'speed with quality' },
]

function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Skills</p>
          <h2 className="section-title">What I can do for you</h2>
        </Reveal>
        <div className="skills-grid">
          {SKILLS.map((skill, i) => (
            <Reveal key={skill.name} delay={0.06 * i}>
              <div className="skill-card">
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
