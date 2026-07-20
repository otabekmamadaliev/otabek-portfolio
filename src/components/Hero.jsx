import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const STEPS = ['Understand', 'Build', 'Test', 'Ship']

const STEP_DURATION = 1400
const LOOP_PAUSE = 2200

function BuildLog() {
  const reduceMotion = useReducedMotion()
  // current = index of the step in progress; STEPS.length means all done
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (reduceMotion) return
    const delay = current === STEPS.length ? LOOP_PAUSE : STEP_DURATION
    const timer = setTimeout(() => {
      setCurrent((c) => (c === STEPS.length ? 0 : c + 1))
    }, delay)
    return () => clearTimeout(timer)
  }, [current, reduceMotion])

  const shown = reduceMotion ? STEPS.length : current

  return (
    <div className="buildlog" aria-hidden="true">
      <div className="buildlog-bar">
        <span className="buildlog-dot" />
        <span className="buildlog-dot" />
        <span className="buildlog-dot" />
        <span className="buildlog-title">build-log — otabek@dev</span>
      </div>
      <div className="buildlog-body">
        {STEPS.map((step, i) => {
          const done = i < shown
          const active = i === shown
          return (
            <div
              key={step}
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
          {shown === STEPS.length ? (
            <span className="ok">✓ delivered — starting next project…</span>
          ) : (
            <span>running: {STEPS[shown].toLowerCase()}…</span>
          )}
        </div>
      </div>
    </div>
  )
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.p className="eyebrow" variants={item}>
            Web Developer
          </motion.p>
          <motion.h1 className="hero-headline" variants={item}>
            Fast, reliable web apps.
            <br />
            <span className="gold">Built end-to-end.</span>
          </motion.h1>
          <motion.p className="hero-sub" variants={item}>
            I build web apps and sites using modern AI-assisted development —
            fast turnaround without sacrificing code quality. From your
            requirements to a tested, working product.
          </motion.p>
          <motion.div className="hero-actions" variants={item}>
            <a className="btn btn-gold" href="#project">
              View my work
            </a>
            <a className="btn btn-ghost" href="#contact">
              Book a call
            </a>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
        >
          <BuildLog />
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
