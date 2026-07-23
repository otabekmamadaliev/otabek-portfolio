import { useLang } from '../i18n/lang.jsx'

const LABELS = { en: 'EN', uz: 'UZ', pl: 'PL', ru: 'RU' }

function LanguageSwitcher({ className = '' }) {
  const { lang, setLang, langs } = useLang()
  return (
    <div className={`lang-switch ${className}`} role="group" aria-label="Language">
      {langs.map((code) => (
        <button
          key={code}
          type="button"
          className={`lang-btn ${code === lang ? 'active' : ''}`}
          onClick={() => setLang(code)}
          aria-pressed={code === lang}
        >
          {LABELS[code]}
        </button>
      ))}
    </div>
  )
}

export default LanguageSwitcher
