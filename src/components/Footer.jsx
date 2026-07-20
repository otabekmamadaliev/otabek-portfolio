function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>© {new Date().getFullYear()} Otabek</p>
        <p className="footer-mono">Designed &amp; built by me — React + Vite</p>
      </div>
    </footer>
  )
}

export default Footer
