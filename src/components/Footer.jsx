import { useLang } from '../i18n/lang.jsx'

function Footer() {
  const { t } = useLang()
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>
          © {new Date().getFullYear()} Otabek — {t.footer.rights}
        </p>
        <p className="footer-mono">
          <span className="slash">{'//'}</span> {t.footer.crafted}
        </p>
      </div>
    </footer>
  )
}

export default Footer
