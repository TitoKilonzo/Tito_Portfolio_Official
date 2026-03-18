import { useState, useEffect } from 'react'

const BREAKPOINTS = { sm: 480, md: 768, lg: 1024, xl: 1200 }

export default function useResponsive() {
  const [w, setW] = useState(() => typeof window !== 'undefined' ? window.innerWidth : 1200)

  useEffect(() => {
    const handler = () => setW(window.innerWidth)
    const obs = new ResizeObserver(handler)
    obs.observe(document.documentElement)
    return () => obs.disconnect()
  }, [])

  return {
    w,
    isMobile:  w < BREAKPOINTS.md,
    isTablet:  w >= BREAKPOINTS.md && w < BREAKPOINTS.lg,
    isDesktop: w >= BREAKPOINTS.lg,
    sm: w >= BREAKPOINTS.sm,
    md: w >= BREAKPOINTS.md,
    lg: w >= BREAKPOINTS.lg,
    xl: w >= BREAKPOINTS.xl,
  }
}
