import { createContext, useContext, useEffect } from 'react'

/* ── Context ──────────────────────────────────────────────────────── */
const ThemeCtx = createContext({ theme: 'light' })

/* ── Provider ─────────────────────────────────────────────────────── */
export function ThemeProvider({ children }) {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light')
  }, [])

  return <ThemeCtx.Provider value={{ theme: 'light' }}>{children}</ThemeCtx.Provider>
}
