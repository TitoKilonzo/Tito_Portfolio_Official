import { createContext, useContext, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── Context ──────────────────────────────────────────────────────── */
const ThemeCtx = createContext({ theme: 'dark', toggle: () => {} })
export const useTheme = () => useContext(ThemeCtx)

/* ── Provider ─────────────────────────────────────────────────────── */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark'
    return localStorage.getItem('tk-theme') ||
      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('tk-theme', theme)
  }, [theme])

  const toggle = () => setTheme(t => t === 'dark' ? 'light' : 'dark')
  return <ThemeCtx.Provider value={{ theme, toggle }}>{children}</ThemeCtx.Provider>
}

/* ── Toggle Button ────────────────────────────────────────────────── */
export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.88 }}
      aria-label="Toggle theme"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        width: 40, height: 40, borderRadius: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        color: 'var(--text)', cursor: 'pointer',
        flexShrink: 0, position: 'relative', overflow: 'hidden',
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -30, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0,   scale: 1    }}
          exit={{    opacity: 0, rotate:  30,  scale: 0.6 }}
          transition={{ duration: 0.2 }}
          style={{ fontSize: 15, lineHeight: 1, display: 'flex' }}
        >
          {isDark ? '☀️' : '🌙'}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}
