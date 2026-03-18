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
        background: 'linear-gradient(90deg, #00ff88, #38d2f7, #a855f7)',
        boxShadow: '0 0 12px rgba(0,255,136,0.8)',
      }}
    />
  )
}
