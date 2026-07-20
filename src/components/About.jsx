import Reveal from './Reveal.jsx'

function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <Reveal>
          <p className="eyebrow">About</p>
          <h2 className="section-title">A builder, not just a coder</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="about-body">
            <p>
              I&apos;m a final-year Software Engineering student based in
              Poland. I work with AI-assisted development, which means
              I&apos;m not locked into one framework or stack — I pick the
              right tools for your project and move fast without cutting
              corners.
            </p>
            <p>
              I handle the full process: understanding your requirements,
              building, testing, and iterating until it works the way you
              need. I communicate clearly, hit deadlines, and treat every
              project like it&apos;s going to production — because it is.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default About
