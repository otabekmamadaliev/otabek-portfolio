import { useLang } from '../i18n/lang.jsx'
import Engine from './Engine.jsx'

// One orchestrated entrance rather than effects scattered down the page:
// the setup line, the claim, the copy, then the instrument boots. Plain
// CSS keyframes with staggered delays - see .rise in index.css.
const step = (i) => ({ animationDelay: `${0.06 + i * 0.09}s` })

function Hero() {
  const { t } = useLang()

  return (
    <section className="hero" id="top">
      <div className="container">
        {/* The setup line is held back in grey and size so the two-word
            claim under it lands on its own. */}
        <h1 className="display hero-head rise" style={step(0)}>
          <span className="quiet">{t.hero.headline1}</span>
          {t.hero.headline2}
        </h1>

        <p className="lede rise" style={{ ...step(1), marginTop: 22 }}>
          {t.hero.sub}
        </p>

        <div className="hero-actions rise" style={step(2)}>
          <a className="btn btn-live" href="#contact">
            {t.hero.bookCall}
          </a>
          <a className="btn" href="#projects">
            {t.hero.viewWork}
          </a>
          <a
            className="btn"
            href="/Otabek_Mamadaliev_CV.pdf"
            download
            target="_blank"
            rel="noreferrer"
          >
            {t.hero.downloadCv}
          </a>
        </div>

        <p className="hero-note rise" style={step(3)}>
          <span className="lamp" aria-hidden="true" />
          {t.hero.note}
        </p>

        <div className="rise" style={step(4)}>
          <Engine />
        </div>
      </div>
    </section>
  )
}

export default Hero
