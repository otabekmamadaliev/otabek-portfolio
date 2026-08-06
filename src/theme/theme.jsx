import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const ThemeContext = createContext(null)

// Light during the day, dark at night — unless the visitor has picked one before.
// Kept in sync with the no-flash inline script in index.html.
export function themeByTime() {
  const h = new Date().getHours()
  return h >= 7 && h < 19 ? 'light' : 'dark'
}

function computeInitial() {
  try {
    const saved = localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    // localStorage unavailable — fall through to time-based
  }
  return themeByTime()
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(computeInitial)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const setTheme = useCallback((next) => {
    setThemeState(next)
    try {
      localStorage.setItem('theme', next)
    } catch {
      // ignore write failures (private mode, etc.)
    }
  }, [])

  const toggle = useCallback(() => {
    setThemeState((cur) => {
      const next = cur === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem('theme', next)
      } catch {
        // ignore
      }
      return next
    })
  }, [])

  const value = { theme, setTheme, toggle }
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider')
  return ctx
}
