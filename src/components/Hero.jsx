import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '../i18n/lang.jsx'

const STEP_DURATION = 1400
const LOOP_PAUSE = 2200

function BuildLog() {
  const { t } = useLang()
  const steps = t.buildlog.steps
  // current = index of the step in progress; steps.length means all done.
  // This decorative terminal loops for everyone (ignores prefers-reduced-motion)
  // — the motion is gentle and it's the hero's signature element.
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const delay = current === steps.length ? LOOP_PAUSE : STEP_DURATION
    const timer = setTimeout(() => {
      setCurrent((c) => (c === steps.length ? 0 : c + 1))
    }, delay)
    return () => clearTimeout(timer)
  }, [current, steps.length])

  const shown = Math.min(current, steps.length)

  return (
    <div className="buildlog" aria-hidden="true">
      <div className="buildlog-bar">
        <span className="buildlog-dot" />
        <span className="buildlog-dot" />
        <span className="buildlog-dot" />
        <span className="buildlog-title">build-log — otabek@dev</span>
      </div>
      <div className="buildlog-body">
        {steps.map((step, i) => {
          const done = i < shown
          const active = i === shown
          return (
            <div
              key={i}
              className={`buildlog-step ${done ? 'done' : ''} ${active ? 'active' : ''}`}
            >
              <span className="step-icon">{done ? '✓' : active ? '›' : ''}</span>
              <span>
                {step}
                {active && <span className="cursor" />}
              </span>
            </div>
          )
        })}
        <div className="buildlog-status">
          {shown === steps.length ? (
            <span className="ok">{t.buildlog.delivered}</span>
          ) : (
            <span>
              {t.buildlog.running} {steps[shown].toLowerCase()}…
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

function NeonScene() {
  return (
    <div className="scene">
      <div className="scene-frame" aria-hidden="true" />
      <span className="scene-sign" aria-hidden="true">
        CODE · SHIP · IMPACT
      </span>
      <span className="cube cube-1" aria-hidden="true" />
      <span className="cube cube-2" aria-hidden="true" />
      <span className="cube cube-3" aria-hidden="true" />
      <BuildLog />
    </div>
  )
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

function Hero() {
  const { t } = useLang()
  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true" />
      <div className="container hero-grid">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.p className="eyebrow" variants={item}>
            {t.hero.eyebrow}
          </motion.p>
          <motion.h1 className="hero-headline" variants={item}>
            {t.hero.headline1}
            <br />
            <span className="accent">{t.hero.headline2}</span>
          </motion.h1>
          <motion.p className="hero-sub" variants={item}>
            {t.hero.sub}
          </motion.p>
          <motion.div className="hero-actions" variants={item}>
            <a className="btn btn-primary" href="#projects">
              {t.hero.viewWork}
            </a>
            <a className="btn btn-ghost" href="#contact">
              {t.hero.bookCall}
            </a>
            <a
              className="btn btn-ghost"
              href="/Otabek_Mamadaliev_CV.pdf"
              download
              target="_blank"
              rel="noreferrer"
            >
              {t.hero.downloadCv} ↓
            </a>
          </motion.div>
          <motion.div className="hero-note" variants={item}>
            <span className="pulse" />
            {t.hero.note}
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
        >
          <NeonScene />
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
