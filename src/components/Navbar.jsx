import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const LINKS = [
  { to: '/',         label: 'Home'     },
  { to: '/about',    label: 'About'    },
  { to: '/projects', label: 'Projects' },
  { to: '/blog',     label: 'Blog'     },
  { to: '/services', label: 'Services' },
  { to: '/contact',  label: 'Contact'  },
]

export default function Navbar() {
  const [open,     setOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hovered,  setHovered]  = useState(null)
  const location = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setOpen(false) }, [location.pathname])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          zIndex: 1000,
          height: 'var(--nav-h)',
        }}
      >
        {/* Glass bar */}
        <div style={{
          position: 'absolute', inset: 0,
          background: scrolled
            ? 'rgba(3,7,18,0.82)'
            : 'linear-gradient(180deg,rgba(3,7,18,0.6) 0%,transparent 100%)',
          backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'blur(0px)',
          WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'blur(0px)',
          transition: 'all 0.45s cubic-bezier(0.4,0,0.2,1)',
        }} />

        {/* Bottom border gradient — only when scrolled */}
        {scrolled && (
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(0,255,136,0.25), rgba(56,210,247,0.15), transparent)',
          }} />
        )}

        <div style={{
          position: 'relative', zIndex: 1,
          maxWidth: 1200, margin: '0 auto',
          padding: '0 28px', height: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>

          {/* ── Logo ─────────────────────────────────────────── */}
          <NavLink to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <motion.div
              whileHover={{ rotate: 5, scale: 1.08 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              style={{
                width: 36, height: 36,
                borderRadius: 10,
                position: 'relative',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <div style={{
                position: 'absolute', inset: 0, borderRadius: 10,
                background: 'conic-gradient(from var(--angle,0deg),#00ff88,#38d2f7,#a855f7,#00ff88)',
                animation: 'conic-spin 4s linear infinite',
              }} />
              <div style={{
                position: 'absolute', inset: 2, borderRadius: 8,
                background: '#0d1a2d',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 13, color: '#00ff88',
              }}>TK</div>
            </motion.div>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{
                fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1rem',
                background: 'linear-gradient(90deg,#fff 0%,rgba(255,255,255,0.7) 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>Tito Kilonzo</span>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                color: 'var(--primary)', letterSpacing: '0.12em', textTransform: 'uppercase',
                marginTop: 1,
              }}>Developer</span>
            </div>
          </NavLink>

          {/* ── Desktop nav ──────────────────────────────────── */}
          <ul className="desktop-nav" style={{
            display: 'flex', alignItems: 'center', gap: 2,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: 99, padding: '5px 6px',
          }}>
            {LINKS.map(({ to, label }) => (
              <li key={to} style={{ position: 'relative' }}
                onMouseEnter={() => setHovered(to)}
                onMouseLeave={() => setHovered(null)}>
                {hovered === to && (
                  <motion.div
                    layoutId="nav-hover"
                    style={{
                      position: 'absolute', inset: 0, borderRadius: 99,
                      background: 'rgba(255,255,255,0.06)',
                    }}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <NavLink
                  to={to}
                  style={({ isActive }) => ({
                    display: 'block', position: 'relative', zIndex: 1,
                    padding: '7px 16px',
                    borderRadius: 99,
                    fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
                    letterSpacing: '0.04em',
                    color: isActive ? '#fff' : 'rgba(255,255,255,0.5)',
                    background: isActive ? 'rgba(0,255,136,0.12)' : 'transparent',
                    border: isActive ? '1px solid rgba(0,255,136,0.2)' : '1px solid transparent',
                    transition: 'color 0.2s, background 0.2s',
                  })}
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.span
                          layoutId="nav-active-dot"
                          style={{
                            display: 'inline-block', width: 5, height: 5,
                            borderRadius: '50%', background: 'var(--primary)',
                            marginRight: 6, verticalAlign: 'middle',
                            boxShadow: '0 0 8px var(--primary)',
                          }}
                        />
                      )}
                      {label}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* ── CTA + Hamburger ──────────────────────────────── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <NavLink to="/contact" className="nav-cta"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '9px 20px', borderRadius: 99,
                background: 'var(--primary)',
                color: '#000',
                fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.78rem',
                letterSpacing: '0.06em',
                transition: 'box-shadow 0.25s, transform 0.25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 24px rgba(0,255,136,0.5)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none' }}
            >
              Hire Me
            </NavLink>

            <motion.button
              className="hamburger"
              whileTap={{ scale: 0.88 }}
              onClick={() => setOpen(o => !o)}
              aria-label="Toggle navigation"
              style={{
                width: 40, height: 40, borderRadius: 10,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'var(--text)', cursor: 'pointer',
              }}
            >
              <AnimatePresence mode="wait">
                {open
                  ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={17} /></motion.div>
                  : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu size={17} /></motion.div>
                }
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile drawer ────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              style={{ position: 'fixed', inset: 0, zIndex: 998, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
            />
            <motion.div
              key="drawer"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0,
                width: 'min(300px, 88vw)', zIndex: 999,
                background: 'rgba(8,15,26,0.97)',
                backdropFilter: 'blur(30px)',
                borderLeft: '1px solid rgba(255,255,255,0.07)',
                display: 'flex', flexDirection: 'column',
                padding: '90px 20px 36px',
              }}
            >
              {/* Drawer gradient accent */}
              <div style={{
                position: 'absolute', top: 0, right: 0, width: 120, height: 200,
                background: 'radial-gradient(circle at top right, rgba(0,255,136,0.08), transparent 70%)',
                pointerEvents: 'none',
              }} />

              <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {LINKS.map(({ to, label }, i) => (
                  <motion.div key={to}
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0,  opacity: 1 }}
                    transition={{ delay: i * 0.055, type: 'spring', stiffness: 300, damping: 24 }}
                  >
                    <NavLink
                      to={to}
                      style={({ isActive }) => ({
                        display: 'flex', alignItems: 'center', gap: 12,
                        padding: '13px 16px', borderRadius: 10,
                        fontFamily: 'var(--font-mono)', fontSize: '0.9rem',
                        color: isActive ? '#fff' : 'rgba(255,255,255,0.45)',
                        background: isActive ? 'rgba(0,255,136,0.08)' : 'transparent',
                        borderLeft: isActive ? '3px solid var(--primary)' : '3px solid transparent',
                        transition: 'all 0.2s',
                      })}
                    >
                      {({ isActive }) => (
                        <>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                            color: isActive ? 'var(--primary)' : 'rgba(255,255,255,0.2)',
                            width: 20 }}>0{i + 1}</span>
                          {label}
                        </>
                      )}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              <div style={{ marginTop: 'auto', paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <NavLink to="/contact" onClick={() => setOpen(false)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '13px', borderRadius: 10,
                    background: 'var(--primary)', color: '#000',
                    fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.85rem',
                  }}>
                  Get In Touch
                </NavLink>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media(min-width:900px){
          .desktop-nav { display:flex !important; }
          .hamburger   { display:none  !important; }
          .nav-cta     { display:inline-flex !important; }
        }
        @media(max-width:899px){
          .desktop-nav { display:none  !important; }
          .nav-cta     { display:none  !important; }
          .hamburger   { display:flex  !important; }
        }
      `}</style>
    </>
  )
}
