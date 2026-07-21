const LINKS = [
  { num: '01', label: 'Home', href: '#top' },
  { num: '02', label: 'Projects', href: '#projects' },
  { num: '03', label: 'Skills', href: '#skills' },
  { num: '04', label: 'About', href: '#about' },
  { num: '05', label: 'Contact', href: '#contact' },
]

function Sidebar() {
  return (
    <>
      <aside className="sidebar">
        <a href="#top" className="sidebar-logo" aria-label="Home">
          {'</>'}
        </a>
        <p className="sidebar-tagline">
          Developer
          <br />
          Builder
          <br />
          Problem Solver
        </p>
        <nav className="sidebar-nav" aria-label="Main navigation">
          {LINKS.map((link) => (
            <a key={link.num} className="sidebar-link" href={link.href}>
              <span className="num">{link.num}</span>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="sidebar-cta">
          <a className="btn btn-primary btn-sm" href="#contact">
            Book a Call
          </a>
        </div>
      </aside>
      <header className="topbar">
        <a href="#top" className="topbar-logo" aria-label="Home">
          {'</>'} OTABEK
        </a>
        <a className="btn btn-primary btn-sm" href="#contact">
          Book a Call
        </a>
      </header>
    </>
  )
}

export default Sidebar
