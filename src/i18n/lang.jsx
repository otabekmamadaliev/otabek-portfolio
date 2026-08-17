import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { translations, LANGS } from './translations.js'

const LangContext = createContext(null)

function detectInitial() {
  try {
    const saved = localStorage.getItem('lang')
    if (saved && LANGS.includes(saved)) return saved
    const nav = (navigator.language || 'en').slice(0, 2).toLowerCase()
    if (LANGS.includes(nav)) return nav
  } catch {
    // localStorage/navigator unavailable — fall through to default
  }
  return 'en'
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(detectInitial)

  const setLang = useCallback((next) => {
    if (!LANGS.includes(next)) return
    setLangState(next)
    try {
      localStorage.setItem('lang', next)
    } catch {
      // ignore write failures (private mode, etc.)
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    // Full name, so searching "Otabek Mamadaliev" matches the strongest
    // on-page signal. This runs on load and overwrites index.html's <title>.
    document.title = `Otabek Mamadaliev — ${translations[lang].meta.role}`
  }, [lang])

  const value = { lang, setLang, langs: LANGS, t: translations[lang] }
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within a LanguageProvider')
  return ctx
}
