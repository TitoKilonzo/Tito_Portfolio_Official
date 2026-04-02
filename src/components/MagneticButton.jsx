import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * MagneticButton — wraps any element and gives it a magnetic pull toward the cursor.
 * Adapted from ElMehdiBekkous's GSAP implementation → pure Framer Motion.
 *
 * Props:
 *   strength  – how far it moves (default 0.28, range 0.1–0.5)
 *   children  – button content
 *   style     – extra container styles
 */
export default function MagneticButton({ children, strength = 0.28, style = {}, className = '' }) {
  const ref = useRef(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 180, damping: 18, mass: 0.6 })
  const y = useSpring(rawY, { stiffness: 180, damping: 18, mass: 0.6 })

  function onMove(e) {
    // Disable on touch devices
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const el = ref.current
    if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    rawX.set((e.clientX - left - width  / 2) * strength)
    rawY.set((e.clientY - top  - height / 2) * strength)
  }

  function onLeave() {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ display: 'inline-flex', x, y, ...style }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
