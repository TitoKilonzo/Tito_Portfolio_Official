import { createContext, useContext, useEffect } from 'react'

/* ── Context ──────────────────────────────────────────────────────── */
const ThemeCtx = createContext({ theme: 'dark' })

/* ── Provider ─────────────────────────────────────────────────────── */
export function ThemeProvider({ children }) {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark')
  }, [])

  return <ThemeCtx.Provider value={{ theme: 'dark' }}>{children}</ThemeCtx.Provider>
}
