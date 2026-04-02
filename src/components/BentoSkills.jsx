import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const SKILLS = [
  {
    cat: 'Languages',
    icon: '{ }',
    color: '#00ff88',
    items: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'Bash', 'HTML5', 'CSS3'],
    span: 1,
    desc: 'Core syntax I actually enjoy typing at 2am',
  },
  {
    cat: 'Frameworks & Libraries',
    icon: '⚙',
    color: '#38d2f7',
    items: ['Django', 'React', 'Node.js', 'Express.js', 'FastAPI', 'Framer Motion', 'Pandas'],
    span: 2,
    desc: 'The scaffolding that turns caffeine into shipped product',
  },
  {
    cat: 'Databases & Storage',
    icon: '🗄',
    color: '#a855f7',
    items: ['PostgreSQL', 'MongoDB Atlas', 'Supabase', 'Appwrite', 'Redis', 'Firebase'],
    span: 1,
    desc: 'Where the data lives (hopefully backed up)',
  },
  {
    cat: 'Cybersecurity',
    icon: '🔐',
    color: '#f59e0b',
    items: ['Vulnerability Assessment', 'Penetration Testing', 'SIEM', 'OWASP', 'Active Directory', 'Network Hardening'],
    span: 1,
    desc: 'Breaking things responsibly so the bad guys don\'t',
  },
  {
    cat: 'Networking & Infra',
    icon: '📡',
    color: '#ef4444',
    items: ['Fiber Optic (FTTH/FTTB)', 'OTDR Testing', 'TCP/IP', 'DNS/DHCP', 'VPN', 'Cisco'],
    span: 1,
    desc: 'Pulling cable and then writing code about it',
  },
  {
    cat: 'DevOps & Tools',
    icon: '🚀',
    color: '#22d3ee',
    items: ['Git', 'GitHub Actions', 'Docker', 'Linux', 'CI/CD', 'Postman', 'Figma'],
    span: 1,
    desc: 'Ship fast. Break nothing. Repeat.',
  },
]

function BentoCard({ skill, delay = 0 }) {
  const ref = useRef(null)
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 })
  const [hovered, setHovered] = useState(false)

  function onMove(e) {
    const el = ref.current
    if (!el) return
    const { left, top } = el.getBoundingClientRect()
    setSpotlight({ x: e.clientX - left, y: e.clientY - top, opacity: 1 })
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setSpotlight(s => ({ ...s, opacity: 0 })); setHovered(false) }}
      style={{
        gridColumn: `span ${skill.span}`,
        position: 'relative', overflow: 'hidden',
        borderRadius: 20,
        background: 'rgba(13,26,45,0.55)',
        border: `1px solid ${hovered ? skill.color + '40' : 'rgba(255,255,255,0.07)'}`,
        padding: 'clamp(20px,3vw,28px)',
        display: 'flex', flexDirection: 'column', gap: 16,
        transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
        boxShadow: hovered ? `0 0 40px ${skill.color}15` : 'none',
        backdropFilter: 'blur(20px)',
        cursor: 'default',
      }}
    >
      {/* Spotlight radial that follows cursor */}
      <div
        style={{
          position: 'absolute', inset: -1, borderRadius: 20,
          opacity: spotlight.opacity,
          background: `radial-gradient(500px circle at ${spotlight.x}px ${spotlight.y}px, ${skill.color}18, transparent 40%)`,
          pointerEvents: 'none',
          transition: 'opacity 0.35s ease',
        }}
      />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 44, height: 44,
            borderRadius: 12,
            background: skill.color + '18',
            border: `1px solid ${skill.color}30`,
            fontSize: '1.2rem',
            marginBottom: 10,
          }}>
            {skill.icon}
          </div>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700, fontSize: 'var(--text-sm)',
            color: '#e2e8f0', lineHeight: 1.2,
          }}>
            {skill.cat}
          </h3>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem', color: 'var(--text-muted)',
            marginTop: 4, lineHeight: 1.4,
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}>
            {skill.desc}
          </p>
        </div>

        {/* Count badge */}
        <div style={{
          flexShrink: 0,
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem', color: skill.color,
          background: skill.color + '14',
          border: `1px solid ${skill.color}25`,
          borderRadius: 99, padding: '3px 10px',
          whiteSpace: 'nowrap',
        }}>
          {skill.items.length} tools
        </div>
      </div>

      {/* Skill pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {skill.items.map((item, i) => (
          <motion.span
            key={item}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delay + i * 0.04, duration: 0.3 }}
            style={{
              padding: '4px 10px',
              borderRadius: 99,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.67rem',
              color: hovered ? skill.color : 'var(--text-muted)',
              background: hovered ? skill.color + '10' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${hovered ? skill.color + '30' : 'rgba(255,255,255,0.07)'}`,
              transition: 'all 0.25s ease',
              whiteSpace: 'nowrap',
            }}
          >
            {item}
          </motion.span>
        ))}
      </div>

      {/* Bottom accent line */}
      <motion.div
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)`,
          opacity: hovered ? 0.6 : 0,
          transition: 'opacity 0.35s ease',
        }}
      />
    </motion.div>
  )
}

export default function BentoSkills() {
  return (
    <section style={{ padding: 'var(--space-xl) 0' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: 'clamp(28px,5vw,48px)', textAlign: 'center' }}
      >
        <div style={{
          display: 'inline-block',
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)',
          color: 'var(--primary)', letterSpacing: '0.15em', textTransform: 'uppercase',
          marginBottom: 10,
        }}>
          ◆ Full Stack Toolkit
        </div>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: 'var(--text-2xl)', color: '#fff',
        }}>
          Tech Stack
        </h2>
        <p style={{
          color: 'var(--text-muted)', fontSize: 'var(--text-sm)',
          maxWidth: 480, margin: '10px auto 0',
        }}>
          Tools I reach for daily — from fiber cable to FastAPI.
        </p>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
        gap: 16,
      }}>
        {SKILLS.map((skill, i) => (
          <BentoCard key={skill.cat} skill={skill} delay={i * 0.07} />
        ))}
      </div>
    </section>
  )
}
