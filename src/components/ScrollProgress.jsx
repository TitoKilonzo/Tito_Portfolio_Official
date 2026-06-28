import { useScroll, useSpring, motion } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: '0%',
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: '2px',
        zIndex: 9999,
        background: 'linear-gradient(90deg, #A8748A, #C9A0AE)',
        boxShadow: '0 0 12px rgba(255,140,66,0.8)',
      }}
    />
  )
}
