// Vite/React entry point for Vercel Web Analytics. The dashboard snippet
// defaults to the Next.js path, which is a no-op here.
import { Analytics } from '@vercel/analytics/react'
import Rail from './components/Rail.jsx'
import Hero from './components/Hero.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <>
      <div className="shell">
        <Rail />
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
    </>
  )
}

export default App
