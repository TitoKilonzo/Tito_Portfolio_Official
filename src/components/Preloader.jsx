import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const GLITCH_CHARS = '█▓▒░╬╪╫╬▓█░▒▓'

function useGlitch(text, isActive) {
  const [display, setDisplay] = useState(text)
  useEffect(() => {
    if (!isActive) { setDisplay(text); return }
    let frame = 0
    const len = text.length
    const id = setInterval(() => {
      const progress = frame / 18
      setDisplay(
        text.split('').map((char, i) => {
          if (char === ' ') return ' '
          if (i / len < progress) return char
          return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
        }).join('')
      )
      frame++
      if (frame > 22) clearInterval(id)
    }, 55)
    return () => clearInterval(id)
  }, [isActive, text])
  return display
}

export default function Preloader({ onDone }) {
  const [phase, setPhase] = useState('enter')   // enter → glitch → exit
  const [glitchActive, setGlitchActive] = useState(false)
  const [gone, setGone] = useState(false)

  const line1 = useGlitch('TITO KILONZO', glitchActive)
  const line2 = useGlitch('KINYAMBU', glitchActive)

  useEffect(() => {
    const t1 = setTimeout(() => setGlitchActive(true), 800)
    const t2 = setTimeout(() => { setGlitchActive(false); setPhase('hold') }, 1900)
    const t3 = setTimeout(() => setPhase('exit'), 2600)
    const t4 = setTimeout(() => { setGone(true); onDone?.() }, 3200)
    return () => [t1, t2, t3, t4].forEach(clearTimeout)
  }, [])

  if (gone) return null

  return (
    <AnimatePresence>
      {phase !== 'gone' && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            background: '#030712',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Ambient corner glows */}
          <div style={{
            position: 'absolute', top: '-10%', left: '-10%',
            width: '50vw', height: '50vw',
            background: 'radial-gradient(circle, rgba(0,255,136,0.06) 0%, transparent 65%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: '-10%', right: '-10%',
            width: '50vw', height: '50vw',
            background: 'radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 65%)',
            pointerEvents: 'none',
          }} />

          {/* Scanline */}
          <motion.div
            initial={{ top: '-2px', opacity: 0.4 }}
            animate={{ top: '100%', opacity: 0 }}
            transition={{ duration: 2.2, ease: 'linear', delay: 0.2 }}
            style={{
              position: 'absolute', left: 0, right: 0,
              height: 2,
              background: 'linear-gradient(90deg, transparent, rgba(0,255,136,0.6), transparent)',
              pointerEvents: 'none',
            }}
          />

          {/* TK Monogram */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0, filter: 'blur(20px)' }}
            animate={phase === 'exit'
              ? { scale: 6, opacity: 0, filter: 'blur(60px)' }
              : { scale: 1, opacity: 1, filter: 'blur(0px)' }
            }
            transition={phase === 'exit'
              ? { duration: 0.55, ease: [0.76, 0, 0.24, 1] }
              : { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
            }
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}
          >
            {/* Logo mark */}
            <div style={{ position: 'relative', width: 80, height: 80 }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute', inset: -3,
                  borderRadius: 20,
                  background: 'conic-gradient(from 0deg, #00ff88, #38d2f7, #a855f7, #00ff88)',
                  filter: 'blur(2px)',
                }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                borderRadius: 18,
                background: '#030712',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 800, fontSize: 28, color: '#00ff88',
                  letterSpacing: '-0.02em',
                }}>TK</span>
              </div>
            </div>

            {/* Name glitch reveal */}
            <div style={{ textAlign: 'center' }}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: 'clamp(1.8rem, 5vw, 3rem)',
                  letterSpacing: '0.08em',
                  color: '#e2e8f0',
                  lineHeight: 1,
                }}
              >
                {line1}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 400,
                  fontSize: 'clamp(1rem, 3vw, 1.6rem)',
                  letterSpacing: '0.22em',
                  color: '#00ff88',
                  marginTop: 4,
                }}
              >
                {line2}
              </motion.div>
            </div>

            {/* Role tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}
            >
              {['Back-End Dev', 'Cybersecurity', 'ICT Consultant'].map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.75 + i * 0.1 }}
                  style={{
                    padding: '4px 12px',
                    borderRadius: 99,
                    border: `1px solid ${['rgba(0,255,136,0.25)', 'rgba(56,210,247,0.25)', 'rgba(168,85,247,0.25)'][i]}`,
                    color: ['#00ff88', '#38d2f7', '#a855f7'][i],
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.65rem',
                    letterSpacing: '0.08em',
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Bottom progress bar */}
          <motion.div
            style={{
              position: 'absolute', bottom: 40, left: '10%', right: '10%',
              height: 1,
              background: 'rgba(255,255,255,0.06)',
              borderRadius: 99,
              overflow: 'hidden',
            }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={phase === 'exit' ? { scaleX: 1 } : { scaleX: 0.75 }}
              transition={phase === 'exit'
                ? { duration: 0.5, ease: 'easeOut' }
                : { duration: 1.8, ease: [0.16, 1, 0.3, 1] }
              }
              style={{
                height: '100%', originX: 0,
                background: 'linear-gradient(90deg, #00ff88, #38d2f7)',
              }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            transition={{ delay: 0.6 }}
            style={{
              position: 'absolute', bottom: 20,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.6rem', color: '#64748b',
              letterSpacing: '0.15em',
            }}
          >
            NAIROBI, KENYA · LOADING
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
