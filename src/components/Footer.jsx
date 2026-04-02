import { NavLink } from 'react-router-dom'
import { Github, Linkedin, Mail, Terminal } from 'lucide-react'
import { motion } from 'framer-motion'

const LINKS = [
  { to:'/',             label:'Home'         },
  { to:'/about',        label:'About'        },
  { to:'/projects',     label:'Projects'     },
  { to:'/blog',         label:'Blog'         },
  { to:'/services',     label:'Services'     },
  { to:'/testimonials', label:'Testimonials' },
  { to:'/contact',      label:'Contact'      },
]

const SOCIALS = [
  { href:'https://github.com/TitoKilonzo',         icon:Github,   label:'GitHub'   },
  { href:'https://linkedin.com/in/titokinyambu',   icon:Linkedin, label:'LinkedIn' },
  { href:'mailto:titokilonzo3@gmail.com',          icon:Mail,     label:'Email'    },
]

export default function Footer() {
  return (
    <footer style={{ borderTop:'1px solid var(--border)', background:'rgba(8,15,26,0.9)',
      backdropFilter:'blur(20px)', padding:'56px 0 28px', position:'relative', zIndex:10 }}>
      <div className="container">
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,180px),1fr))', gap:44, marginBottom:44 }}>
          {/* Brand */}
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
              <div style={{ width:34, height:34, borderRadius:8, position:'relative',
                display:'flex', alignItems:'center', justifyContent:'center' }}>
                <div style={{ position:'absolute', inset:0, borderRadius:8,
                  background:'conic-gradient(from var(--angle,0deg),#00ff88,#38d2f7,#a855f7,#00ff88)',
                  animation:'conic-spin 4s linear infinite' }} />
                <div style={{ position:'absolute', inset:2, borderRadius:6, background:'#0d1a2d',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontFamily:'var(--font-mono)', fontWeight:700, fontSize:11, color:'#00ff88' }}>TK</div>
              </div>
              <div>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'0.95rem',
                  background:'linear-gradient(90deg,#fff,rgba(255,255,255,0.7))',
                  WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Tito Kilonzo</div>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.58rem', color:'var(--primary)',
                  letterSpacing:'0.12em', textTransform:'uppercase' }}>Developer</div>
              </div>
            </div>
            <p style={{ color:'var(--text-muted)', fontSize:'0.84rem', lineHeight:1.75 }}>
              Back-End Developer & Cybersecurity Analyst building secure, scalable digital solutions.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ fontFamily:'var(--font-mono)', color:'var(--primary)', fontSize:'0.7rem',
              letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:14 }}>Navigation</h4>
            <ul style={{ display:'flex', flexDirection:'column', gap:9 }}>
              {LINKS.map(({ to, label }) => (
                <li key={to}>
                  <NavLink to={to} style={{ color:'var(--text-muted)', fontSize:'0.85rem', transition:'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                    <span style={{ color:'var(--primary)', marginRight:6 }}>›</span>{label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 style={{ fontFamily:'var(--font-mono)', color:'var(--primary)', fontSize:'0.7rem',
              letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:14 }}>Connect</h4>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {SOCIALS.map(({ href, icon:Icon, label }) => (
                <motion.a key={label} href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer" whileHover={{ x:4 }}
                  style={{ display:'flex', alignItems:'center', gap:10,
                    color:'var(--text-muted)', fontSize:'0.85rem', transition:'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                  <Icon size={14} /> {label}
                </motion.a>
              ))}
              <a href="mailto:titokilonzo3@gmail.com"
                style={{ color:'var(--text-faint)', fontSize:'0.78rem', marginTop:4 }}>
                titokilonzo3@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop:'1px solid var(--border)', paddingTop:22, display:'flex',
          alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:10 }}>
          <p style={{ fontFamily:'var(--font-mono)', color:'var(--text-faint)', fontSize:'0.75rem' }}>
            © {new Date().getFullYear()} Tito Kilonzo Kinyambu — All rights reserved
          </p>
          <div style={{ display:'flex', alignItems:'center', gap:6, fontFamily:'var(--font-mono)',
            color:'var(--text-faint)', fontSize:'0.72rem' }}>
            <Terminal size={11} color="var(--primary)" />
            Built with React + Framer Motion
          </div>
        </div>
      </div>
    </footer>
  )
}
