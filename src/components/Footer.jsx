function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>© {new Date().getFullYear()} Otabek — All Rights Reserved</p>
        <p className="footer-mono">
          <span className="slash">{'//'}</span> Crafted with Code and Passion —
          React + Vite
        </p>
      </div>
    </footer>
  )
}

export default Footer
