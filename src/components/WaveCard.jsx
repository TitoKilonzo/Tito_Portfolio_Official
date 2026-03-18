import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * 3D Wave Experience Card — tracks mouse for perspective tilt
 * plus a refraction/shine highlight
 */
export default function WaveCard({ children, style = {}, className = '' }) {
  const ref = useRef(null)
  const [tilt, setTilt]   = useState({ x: 0, y: 0 })
  const [shine, setShine] = useState({ x: 50, y: 50, opacity: 0 })

  function onMove(e) {
    if (!window.matchMedia('(hover: hover)').matches) return
    if (!ref.current) return
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const nx = (e.clientX - left) / width   // 0..1
    const ny = (e.clientY - top)  / height  // 0..1
    setTilt({ x: (ny - 0.5) * -20, y: (nx - 0.5) * 20 })
    setShine({ x: nx * 100, y: ny * 100, opacity: 0.18 })
  }

  function onLeave() {
    setTilt({ x: 0, y: 0 })
    setShine(s => ({ ...s, opacity: 0 }))
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1200,
        position: 'relative',
        ...style,
      }}
      className={className}
    >
      {/* Shine layer */}
      <div style={{
        position: 'absolute', inset: 0,
        borderRadius: 'inherit',
        background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,${shine.opacity}) 0%, transparent 60%)`,
        pointerEvents: 'none',
        zIndex: 10,
        transition: 'background 0.1s',
      }} />
      {children}
    </motion.div>
  )
}
