import Reveal from './Reveal.jsx'

const PROJECTS = [
  {
    status: '01 // Live',
    art: 'art-violet',
    artLabel: 'Book. Meet. Build.',
    title: 'Booking & Scheduling System',
    desc: 'The booking pipeline powering this site — validated React form, EmailJS delivery straight to my inbox, no backend. Currently being expanded into a standalone scheduling app.',
    tags: ['React', 'Vite', 'EmailJS'],
    href: '#contact',
  },
  {
    status: '02 // In planning',
    art: 'art-indigo',
    artLabel: 'Coming Soon',
    title: 'Project Two',
    desc: 'The next full build is on the drawing board. It will be shipped end-to-end — from requirements to a tested, deployed product — and documented here.',
    tags: ['TBA'],
  },
  {
    status: '03 // In planning',
    art: 'art-magenta',
    artLabel: 'Coming Soon',
    title: 'Project Three',
    desc: 'Third slot reserved. Watch this space — or bring me your idea and it might become the featured build.',
    tags: ['TBA'],
  },
]

function ProjectCard({ project }) {
  const card = (
    <>
      <div className={`project-art ${project.art}`} aria-hidden="true">
        <span className="orb" />
        <span className="art-label">{project.artLabel}</span>
      </div>
      <div className="project-body">
        <p className="project-status">{project.status}</p>
        <h3 className="skill-name">{project.title}</h3>
        <p className="project-desc">{project.desc}</p>
        <div className="project-meta">
          <div className="project-tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          {project.href && <span className="project-arrow">↗</span>}
        </div>
      </div>
    </>
  )

  return project.href ? (
    <a className="project-card" href={project.href}>
      {card}
    </a>
  ) : (
    <div className="project-card">{card}</div>
  )
}

function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Projects</p>
          <h2 className="section-title">Featured Work</h2>
          <span className="title-underline" aria-hidden="true" />
        </Reveal>
        <div className="projects-grid">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.title} delay={0.08 * i}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
