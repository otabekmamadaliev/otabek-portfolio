import { useEffect, useRef, useState } from 'react'

/*
  Scroll reveal, CSS-driven.

  The travel is deliberately short: a long slide on every block is the
  thing that makes a page feel auto-generated. This is just enough to
  register that content arrived.

  Two safety rails, because a portfolio that renders blank costs more
  than a missing animation: if IntersectionObserver is unavailable the
  content shows immediately, and a timer reveals anything still hidden
  after a second regardless of what the observer did.
*/
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }

    const node = ref.current
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { rootMargin: '-60px' },
    )
    if (node) io.observe(node)

    const failsafe = setTimeout(() => setShown(true), 1000)

    return () => {
      io.disconnect()
      clearTimeout(failsafe)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal ${shown ? 'is-in' : ''} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  )
}

export default Reveal
