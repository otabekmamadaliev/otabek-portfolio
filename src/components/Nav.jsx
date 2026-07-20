function Nav() {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <a href="#top" className="nav-logo">
          OTABEK
        </a>
        <nav className="nav-links" aria-label="Main navigation">
          <a className="nav-link" href="#about">
            About
          </a>
          <a className="nav-link" href="#skills">
            Skills
          </a>
          <a className="nav-link" href="#project">
            Project
          </a>
          <a className="btn btn-gold btn-nav" href="#contact">
            Book a Call
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Nav
