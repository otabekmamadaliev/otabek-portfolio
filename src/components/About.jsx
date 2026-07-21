import Reveal from './Reveal.jsx'

function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <Reveal>
          <p className="eyebrow">About</p>
          <h2 className="section-title">The Developer Behind the Code</h2>
          <span className="title-underline" aria-hidden="true" />
        </Reveal>
        <div className="about-grid">
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
          <Reveal delay={0.2}>
            <div className="about-art" aria-hidden="true">
              <pre>
                <span className="k">const</span> developer = {'{'}
                {'\n'}  passion: <span className="s">&apos;building&apos;</span>,
                {'\n'}  focus: <span className="s">&apos;solutions&apos;</span>,
                {'\n'}  goal: <span className="s">&apos;growth&apos;</span>,
                {'\n'}{'}'};
              </pre>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default About
