import { useLang } from '../i18n/lang.jsx'

function Footer() {
  const { t } = useLang()
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>
          &copy; {new Date().getFullYear()} Otabek Mamadaliev &middot;{' '}
          {t.footer.rights}
        </p>
        <p>{t.footer.built}</p>
      </div>
    </footer>
  )
}

export default Footer
