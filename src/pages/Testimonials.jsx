import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedBackground from '../components/AnimatedBackground'

const TESTIMONIALS = [
  {
    name: 'Anthony Wai',
    role: 'Chief Technology Officer',
    org: 'MemeyAI Group · Nairobi',
    text: 'Tito joined our backend team and hit the ground running. He built RESTful APIs now serving over 1,000 concurrent users, cut average API response time by ~35% through targeted indexing and query refactoring, and integrated five payment gateways without a single downtime incident. He also reduced our bug backlog by ~40% through systematic debugging. The kind of engineer who ships and documents.',
    color: '#00ff88',
    initials: 'AW',
    period: 'Feb 2026 – Present',
  },
  {
    name: 'Joshua Mutisya',
    role: 'Project Director',
    org: 'AIC Kanzinwa Child & Development Centre · Mwingi',
    text: 'When Tito joined us, our IT systems were outdated and our staff were overwhelmed. He deployed custom web and software solutions across 50+ staff endpoints, trained 30 members of staff on digital tools, and reduced our helpdesk ticket volume by 25%. He documented everything so clearly that our team still references his SOPs and user guides today. A rare combination of technical depth and real patience with people.',
    color: '#38d2f7',
    initials: 'JM',
    period: 'May 2025 – Jan 2026',
  },
  {
    name: 'Dr. Simon Chege',
    role: 'Project Manager',
    org: 'Hatikvah Communication & General Engineering Ltd · Ruiru',
    text: 'Tito led our FTTH and FTTB fiber optic deployments across four regional sites, configured over 100 CPE and ONT devices, and performed OTDR testing and precision fusion splicing — every site delivered on schedule. He also handled network security hardening and designed software solutions that improved our operational efficiency. A field engineer who understands both the cable and the code.',
    color: '#a855f7',
    initials: 'SC',
    period: 'Feb 2025 – May 2025',
  },
]

// Stats sourced directly from CV — keep in sync with your CV bullet points
const STATS = [
  { label: 'Concurrent Users',  value: '1k+',   color: '#00ff88' },
  { label: 'Staff Trained',     value: '30+',   color: '#38d2f7' },
  { label: 'Sites Deployed',    value: '4+',    color: '#a855f7' },
  { label: 'API Uptime',        value: '99.9%', color: '#f59e0b' },
]

function TestimonialCard({ t, isActive, onClick, index }) {
  return (
    <motion.div
      layout
      onClick={onClick}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      whileHover={!isActive ? { y: -4 } : {}}
      style={{
        position: 'relative',
        borderRadius: 20,
        padding: isActive ? 'clamp(24px,4vw,36px)' : 'clamp(18px,3vw,24px)',
        background: isActive ? `${t.color}0d` : 'rgba(13,26,45,0.55)',
        border: `1px solid ${isActive ? t.color + '35' : 'rgba(255,255,255,0.07)'}`,
        backdropFilter: 'blur(20px)',
        cursor: isActive ? 'default' : 'pointer',
        transition: 'border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease',
        boxShadow: isActive ? `0 8px 48px ${t.color}18` : 'none',
        overflow: 'hidden',
      }}
    >
      {/* Decorative quote mark */}
      <div style={{
        fontFamily: 'Georgia, serif',
        fontSize: isActive ? 64 : 36,
        lineHeight: 1,
        color: t.color,
        opacity: isActive ? 0.25 : 0.12,
        position: 'absolute', top: isActive ? 16 : 10, right: isActive ? 24 : 16,
        transition: 'all 0.3s ease',
        pointerEvents: 'none',
        userSelect: 'none',
      }}>"</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Header: initials avatar + name + role + org */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: isActive ? 48 : 38,
            height: isActive ? 48 : 38,
            borderRadius: '50%',
            background: `${t.color}20`,
            border: `2px solid ${t.color}40`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: isActive ? '0.9rem' : '0.75rem',
            color: t.color,
            flexShrink: 0,
            transition: 'all 0.3s ease',
          }}>
            {t.initials}
          </div>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: isActive ? 'var(--text-sm)' : 'var(--text-xs)',
              color: '#e2e8f0',
              transition: 'font-size 0.3s ease',
            }}>
              {t.name}
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem', color: t.color,
              opacity: 0.85,
            }}>
              {t.role}
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem', color: 'var(--text-muted)',
              marginTop: 1,
            }}>
              {t.org}
            </div>
          </div>
        </div>

        {/* Employment period badge — only shown when card is expanded */}
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '3px 10px', borderRadius: 99,
              background: `${t.color}14`,
              border: `1px solid ${t.color}25`,
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
              color: t.color, letterSpacing: '0.06em',
              alignSelf: 'flex-start',
            }}
          >
            📅 {t.period}
          </motion.div>
        )}

        {/* Quote text — full when active, clipped preview when collapsed */}
        <AnimatePresence mode="wait">
          {isActive ? (
            <motion.p
              key="full"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              style={{
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                lineHeight: 1.75,
                fontStyle: 'italic',
              }}
            >
              "{t.text}"
            </motion.p>
          ) : (
            <motion.p
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                lineHeight: 1.5,
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                fontStyle: 'italic',
              }}
            >
              "{t.text}"
            </motion.p>
          )}
        </AnimatePresence>

        {!isActive && (
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
            color: t.color, opacity: 0.6, letterSpacing: '0.1em',
          }}>
            TAP TO READ →
          </div>
        )}
      </div>

      {/* Left accent bar — slides in when card is active */}
      {isActive && (
        <motion.div
          layoutId="active-accent"
          style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
            background: `linear-gradient(180deg, transparent, ${t.color}, transparent)`,
            borderRadius: '20px 0 0 20px',
          }}
        />
      )}
    </motion.div>
  )
}

const PAGE = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit:    { opacity: 0, transition: { duration: 0.25 } },
}

export default function Testimonials() {
  const [active, setActive] = useState(0)

  return (
    <motion.main
      variants={PAGE} initial="initial" animate="animate" exit="exit"
      className="page-wrap"
    >
      <AnimatedBackground variant="about" />

      <section style={{
        minHeight: 'calc(100vh - var(--nav-h))',
        padding: 'clamp(60px,10vw,100px) 0',
        position: 'relative', zIndex: 1,
      }}>
        <div className="container">

          {/* ── Page header ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: 'clamp(40px,7vw,64px)' }}
          >
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)',
              color: 'var(--primary)', letterSpacing: '0.15em', textTransform: 'uppercase',
              marginBottom: 12,
            }}>
              ◆ Referees & Testimonials
            </div>
            <h1 style={{
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: 'var(--text-3xl)', color: '#fff',
              lineHeight: 1.1, maxWidth: 560,
            }}>
              What People{' '}
              <span style={{
                background: 'linear-gradient(135deg, #00ff88, #38d2f7)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                Actually Say
              </span>
            </h1>
            <p style={{
              color: 'var(--text-muted)', fontSize: 'var(--text-sm)',
              maxWidth: 520, marginTop: 14, lineHeight: 1.7,
            }}>
              Verified referees from every employer on my CV — MemeyAI Group, AIC Kanzinwa CDC,
              Hatikvah Engineering, and Kabarak University.
            </p>
          </motion.div>

          {/* ── Stats bar — numbers sourced from CV bullet points ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{
              display: 'flex', flexWrap: 'wrap', gap: 24,
              padding: 'clamp(16px,3vw,24px)',
              borderRadius: 16,
              background: 'rgba(13,26,45,0.55)',
              border: '1px solid rgba(255,255,255,0.07)',
              backdropFilter: 'blur(20px)',
              marginBottom: 'clamp(24px,4vw,40px)',
            }}
          >
            {STATS.map(stat => (
              <div key={stat.label} style={{ textAlign: 'center', flex: '1 1 80px' }}>
                <div style={{
                  fontFamily: 'var(--font-display)', fontWeight: 800,
                  fontSize: 'var(--text-xl)', color: stat.color,
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.05em',
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* ── Cards grid ───────────────────────────────────────── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 16,
          }}>
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard
                key={t.name}
                t={t}
                index={i}
                isActive={active === i}
                onClick={() => setActive(i)}
              />
            ))}
          </div>

          {/* ── CTA ──────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            style={{
              marginTop: 'clamp(40px,7vw,64px)',
              textAlign: 'center',
            }}
          >
            <p style={{
              color: 'var(--text-muted)', fontSize: 'var(--text-sm)',
              marginBottom: 20,
            }}>
              Want to be next on this list?
            </p>
            <a
              href="/contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '12px 32px', borderRadius: 99,
                background: 'var(--primary)', color: '#000',
                fontFamily: 'var(--font-mono)', fontWeight: 700,
                fontSize: 'var(--text-xs)', letterSpacing: '0.06em',
                transition: 'box-shadow 0.25s, transform 0.25s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 0 32px rgba(0,255,136,0.5)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.transform = 'none'
              }}
            >
              Let's Work Together →
            </a>
          </motion.div>

        </div>
      </section>
    </motion.main>
  )
}
