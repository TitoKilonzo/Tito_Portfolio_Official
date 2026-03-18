import AnimatedBackground from '../components/AnimatedBackground'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Globe, Shield, Monitor, BarChart2, Palette, Server, Check, ArrowRight } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import WaveCard from '../components/WaveCard'

const PAGE = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

const SERVICES = [
  {
    id: 'web',
    icon: Globe,
    label: 'Web App Development',
    color: '#00ff88',
    tagline: 'Full-stack web applications built for scale and security',
    sub: [
      {
        name: 'Back-End Development',
        desc: 'Python/Django REST APIs, Node.js/Express services, PostgreSQL & MongoDB optimization, CI/CD pipelines.',
        stack: ['Python', 'Django', 'Node.js', 'REST APIs', 'SQL'],
      },
      {
        name: 'Front-End Development',
        desc: 'React/Vite single-page apps, responsive layouts with Framer Motion animations, PWA setup.',
        stack: ['React', 'Vite', 'JavaScript', 'CSS3', 'Framer Motion'],
      },
      {
        name: 'Full-Stack Projects',
        desc: 'End-to-end applications with Appwrite, Supabase, or Firebase backends, auth, file storage, and real-time features.',
        stack: ['Appwrite', 'Supabase', 'Firebase', 'JWT', 'OAuth2'],
      },
      {
        name: 'API Integration',
        desc: 'Third-party API integration, payment gateways (M-Pesa, Stripe), webhooks, and microservice architecture.',
        stack: ['M-Pesa', 'Stripe', 'REST', 'WebSockets', 'Postman'],
      },
    ],
  },
  {
    id: 'cyber',
    icon: Shield,
    label: 'Cybersecurity',
    color: '#38d2f7',
    tagline: 'Protect your systems, data, and digital footprint',
    sub: [
      {
        name: 'Vulnerability Assessment',
        desc: 'Systematic scanning and manual testing to identify security weaknesses in web apps and networks.',
        stack: ['OWASP', 'Nmap', 'Burp Suite', 'Nikto'],
      },
      {
        name: 'Security Hardening',
        desc: 'Network hardening, firewall configuration, patch management, and Active Directory security policies.',
        stack: ['Active Directory', 'Linux', 'UFW', 'iptables'],
      },
      {
        name: 'SIEM & Monitoring',
        desc: 'Threat monitoring setup, log analysis, SIEM dashboards, and incident response playbooks.',
        stack: ['SIEM', 'Log Analysis', 'Incident Response', 'Alerts'],
      },
    ],
  },
  {
    id: 'it',
    icon: Monitor,
    label: 'IT Support',
    color: '#a855f7',
    tagline: 'Reliable on-site and remote IT support for organizations',
    sub: [
      {
        name: 'Help Desk (L1 / L2)',
        desc: 'Ticket resolution, hardware troubleshooting, software installs, user account management, SLA-driven support.',
        stack: ['Windows', 'Linux', 'Active Directory', 'ITIL'],
      },
      {
        name: 'Network & Infrastructure',
        desc: 'Fiber optic installation (FTTH/FTTB), ONT configuration, OTDR testing, LAN/WAN setup.',
        stack: ['Fiber Optics', 'TCP/IP', 'Cisco', 'OTDR', 'VPN'],
      },
      {
        name: 'ICT Training',
        desc: 'Digital literacy programs, Microsoft Office training, SOP documentation, and knowledge-base authoring.',
        stack: ['MS Office', 'SOPs', 'User Training', 'Documentation'],
      },
    ],
  },
  {
    id: 'data',
    icon: BarChart2,
    label: 'Data Analysis',
    color: '#f59e0b',
    tagline: 'Turn raw data into decisions with Python-powered analytics',
    sub: [
      {
        name: 'Exploratory Data Analysis',
        desc: 'Data cleaning, profiling, and visualization using Pandas, Matplotlib, and Seaborn.',
        stack: ['Python', 'Pandas', 'Matplotlib', 'Seaborn'],
      },
      {
        name: 'ML & Prediction Models',
        desc: 'Scikit-learn classification/regression models, model evaluation, and deployment as APIs.',
        stack: ['Scikit-learn', 'NumPy', 'Django', 'FastAPI'],
      },
      {
        name: 'Dashboards & Reports',
        desc: 'Interactive Excel/Tableau dashboards, automated reporting pipelines, and insight decks.',
        stack: ['Excel', 'Power BI', 'Jupyter', 'GitHub Actions'],
      },
    ],
  },
  {
    id: 'design',
    icon: Palette,
    label: 'Graphics Design / UI·UX',
    color: '#ec4899',
    tagline: 'Visually compelling design that communicates and converts',
    sub: [
      {
        name: 'UI/UX Design',
        desc: 'User research, wireframes, high-fidelity prototypes, and design systems using Figma.',
        stack: ['Figma', 'Wireframing', 'Prototyping', 'Design Systems'],
      },
      {
        name: 'Flyers & Print Design',
        desc: 'Event flyers, posters, banners, and branded social media graphics for NGOs and SMBs.',
        stack: ['Canva', 'Adobe Express', 'Brand Identity'],
      },
      {
        name: 'Web UI Implementation',
        desc: 'Pixel-perfect translation of Figma designs to React components with animations.',
        stack: ['React', 'CSS3', 'Framer Motion', 'Responsive'],
      },
    ],
  },
  {
    id: 'hosting',
    icon: Server,
    label: 'Hosting & Deployment',
    color: '#22d3ee',
    tagline: 'Get your product live, fast and reliably',
    sub: [
      {
        name: 'Vercel / Netlify Deployments',
        desc: 'Front-end deployments with custom domains, HTTPS, and GitHub Actions CI/CD.',
        stack: ['Vercel', 'Netlify', 'GitHub Actions', 'CI/CD'],
      },
      {
        name: 'VPS & Server Setup',
        desc: 'Linux VPS configuration, Nginx reverse proxy, SSL/TLS certificates, and firewall hardening.',
        stack: ['Ubuntu', 'Nginx', "Let's Encrypt", 'UFW'],
      },
    ],
  },
]

function ServiceAccordion({ svc, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen)
  const Icon = svc.icon

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      style={{ borderRadius: 'var(--radius)', border: `1px solid ${open ? svc.color + '40' : 'var(--border)'}`,
        overflow: 'hidden', transition: 'border-color 0.3s', background: 'var(--bg-card)',
        backdropFilter: 'blur(20px)' }}>
      <button onClick={() => setOpen(o => !o)}
        style={{ width: '100%', padding: '20px 24px', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', background: 'transparent', color: 'var(--text)',
          cursor: 'pointer', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: `${svc.color}18`,
            border: `1px solid ${svc.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon size={20} color={svc.color} />
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.05rem',
              color: open ? svc.color : 'var(--text)' }}>{svc.label}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)',
              marginTop: 2 }}>{svc.tagline}</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: svc.color,
            background: `${svc.color}18`, padding: '3px 10px', borderRadius: 99 }}>
            {svc.sub.length} services
          </span>
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
            <ChevronDown size={17} color="var(--text-muted)" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
            style={{ overflow: 'hidden' }}>
            <div style={{ padding: '4px 24px 24px',
              display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%,240px),1fr))', gap: 12,
              borderTop: `1px solid ${svc.color}20` }}>
              {svc.sub.map(s => (
                <WaveCard key={s.name}>
                  <div style={{ background: `${svc.color}08`, borderRadius: 'var(--radius-sm)',
                    border: `1px solid ${svc.color}20`, padding: '18px 18px' }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 8 }}>
                      <Check size={14} color={svc.color} style={{ marginTop: 2, flexShrink: 0 }} />
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9rem',
                        color: 'var(--text)' }}>{s.name}</div>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.65,
                      marginBottom: 12, marginLeft: 22 }}>{s.desc}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginLeft: 22 }}>
                      {s.stack.map(t => (
                        <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.67rem',
                          padding: '2px 8px', borderRadius: 99,
                          background: `${svc.color}14`, color: svc.color }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </WaveCard>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Services() {
  return (
    <motion.main variants={PAGE} initial="initial" animate="animate" exit="exit"
      className="page-wrap">
      <AnimatedBackground variant="services" />

      <section className="section" style={{ position: 'relative', zIndex: 1 }}>
        <div className="container">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            style={{ marginBottom: 48 }}>
            <span className="section-tag">Services</span>
            <h1 className="section-title">What I Can Do For You</h1>
            <p className="section-desc">
              End-to-end ICT services for SMBs, NGOs, and startups — locally and internationally. 
              Click any service category to explore the full offering.
            </p>
          </motion.div>

          {/* Service list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 64 }}>
            {SERVICES.map((svc, i) => (
              <ServiceAccordion key={svc.id} svc={svc} defaultOpen={i === 0} />
            ))}
          </div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="conic-border" style={{ borderRadius: 'var(--radius-lg)' }}>
            <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)',
              padding: '48px 40px', textAlign: 'center' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.5rem,3vw,2rem)',
                color: 'var(--text)', marginBottom: 14 }}>Need a Custom Solution?</h2>
              <p style={{ color: 'var(--text-muted)', maxWidth: 500, margin: '0 auto 28px', lineHeight: 1.7 }}>
                Every project is different. Let's talk about your specific requirements and build something that works for you.
              </p>
              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                <NavLink to="/contact" className="btn-primary" style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
                  Start a Project <ArrowRight size={15} />
                </NavLink>
                <a href="mailto:titokilonzo3@gmail.com" className="btn-outline">
                  Quick Email
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.main>
  )
}
