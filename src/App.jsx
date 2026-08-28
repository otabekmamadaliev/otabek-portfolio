import { MotionConfig } from 'framer-motion'
// Vite/React entry point for Vercel Web Analytics. The dashboard snippet
// defaults to the Next.js path, which is a no-op here.
import { Analytics } from '@vercel/analytics/react'
import Sidebar from './components/Sidebar.jsx'
import Hero from './components/Hero.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="shell">
        <Sidebar />
        <div className="content">
          <main>
            <Hero />
            <Projects />
            <Skills />
            <About />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
      <Analytics />
    </MotionConfig>
  )
}

export default App
