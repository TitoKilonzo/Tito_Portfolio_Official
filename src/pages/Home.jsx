import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { ArrowRight, Github, Shield, Server, Code2, Wifi, Download } from 'lucide-react'
import WaveCard from '../components/WaveCard'
import AnimatedBackground from '../components/AnimatedBackground'
import useResponsive from '../hooks/useResponsive'

const PAGE = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit:    { opacity: 0, transition: { duration: 0.25 } },
}

const ROLES = [
  'Back-End Developer',
  'Cybersecurity Analyst',
  'Full-Stack Engineer',
  'ICT Consultant',
  'Open-Source Contributor',
]

const STATS = [
  { label: 'Years Exp.',   value: '2+',  icon: Code2  },
  { label: 'Projects',     value: '20+', icon: Server },
  { label: 'GitHub Repos', value: '17+', icon: Github },
  { label: 'Certs',        value: '3+',  icon: Shield },
]

const CODE_LINES = [
  [{ type:'kw',text:'class '},{type:'cls',text:'TitoKilonzo'},{type:'plain',text:':'}],
  [{ type:'kw',text:'  def '},{type:'fn',text:'__init__'},{type:'plain',text:'(self):'}],
  [{ type:'attr',text:'    self'},{type:'plain',text:'.name  = '},{type:'str',text:'"Tito Kilonzo"'}],
  [{ type:'attr',text:'    self'},{type:'plain',text:'.role  = '},{type:'str',text:'"Back-End Developer"'}],
  [{ type:'attr',text:'    self'},{type:'plain',text:'.focus = ['}],
  [{ type:'str',text:'      "Python / Django",'}],
  [{ type:'str',text:'      "Cybersecurity",'}],
  [{ type:'str',text:'      "REST APIs",'}],
  [{ type:'plain',text:'    ]'}],
  [{ type:'attr',text:'    self'},{type:'plain',text:'.available = '},{type:'bool',text:'True'}],
]

const C = { kw:'#c792ea',cls:'#82aaff',fn:'#82aaff',str:'#c3e88d',attr:'#f07178',bool:'#ff9cac',plain:'#a6accd' }

function CodeLine({ items, delay }) {
  return (
    <motion.div initial={{ opacity:0, x:-8 }} animate={{ opacity:1, x:0 }}
      transition={{ delay, duration:0.28 }} style={{ whiteSpace:'pre', lineHeight:1.75 }}>
      {items.map((s,i) => <span key={i} style={{ color: C[s.type]||'#a6accd' }}>{s.text}</span>)}
    </motion.div>
  )
}

function useTypewriter(words, speed=80, pause=1800) {
  const [text, setText] = useState('')
  const [wIdx, setWIdx] = useState(0)
  const [del,  setDel]  = useState(false)
  useEffect(() => {
    const w = words[wIdx]
    const t = setTimeout(() => {
      if (!del) {
        setText(w.slice(0, text.length + 1))
        if (text.length + 1 === w.length) setTimeout(() => setDel(true), pause)
      } else {
        setText(w.slice(0, text.length - 1))
        if (text.length - 1 === 0) { setDel(false); setWIdx(i => (i+1) % words.length) }
      }
    }, del ? speed/2 : speed)
    return () => clearTimeout(t)
  }, [text, del, wIdx])
  return text
}

export default function Home() {
  const role = useTypewriter(ROLES)
  const { md, lg } = useResponsive()

  return (
    <motion.main variants={PAGE} initial="initial" animate="animate" exit="exit" className="page-wrap">
      <AnimatedBackground variant="home" />

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section style={{
        minHeight: 'calc(100vh - var(--nav-h))',
        display: 'flex', alignItems: 'center',
        position: 'relative', zIndex: 1,
        padding: 'clamp(32px,6vw,60px) 0',
      }}>
        {/* Ambient orbs */}
        <div style={{ position:'absolute', top:'10%', left:'-5%', width:'clamp(200px,40vw,500px)',
          height:'clamp(200px,40vw,500px)', pointerEvents:'none',
          background:'radial-gradient(circle, rgba(0,255,136,0.08) 0%, transparent 70%)',
          animation:'float 9s ease-in-out infinite' }} />
        <div style={{ position:'absolute', bottom:'5%', right:'-5%', width:'clamp(160px,30vw,380px)',
          height:'clamp(160px,30vw,380px)', pointerEvents:'none',
          background:'radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)',
          animation:'float 11s ease-in-out infinite reverse' }} />

        <div className="container">
          {/* Hero grid — collapses on ≤860px */}
          <div className="hero-grid">

            {/* Left: copy */}
            <div>
              <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}>
                <span className="section-tag">
                  <span style={{ width:5, height:5, background:'var(--primary)', borderRadius:'50%',
                    animation:'pulse-glow 2s ease-in-out infinite', display:'inline-block' }} />
                  Available for Opportunities
                </span>
              </motion.div>

              <motion.h1 initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.18 }}
                style={{ fontSize:'var(--text-4xl)', fontWeight:800, lineHeight:1.1, margin:'14px 0 18px' }}>
                <span style={{ display:'block', color:'var(--text)' }}>Hi, I'm</span>
                <span style={{ display:'block',
                  background:'linear-gradient(135deg,#00ff88 0%,#38d2f7 50%,#a855f7 100%)',
                  WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                  Tito Kilonzo
                </span>
              </motion.h1>

              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.32 }}
                style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-lg)', color:'var(--secondary)',
                  marginBottom:20, display:'flex', alignItems:'center', gap:2, minHeight:34 }}>
                <span style={{ color:'var(--primary)' }}>&gt;&nbsp;</span>
                {role}
                <span style={{ animation:'blink 1s step-end infinite', color:'var(--primary)' }}>_</span>
              </motion.div>

              <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.42 }}
                style={{ color:'var(--text-muted)', maxWidth:520, fontSize:'var(--text-base)',
                  lineHeight:1.8, marginBottom:32 }}>
                Results-driven IT professional with hands-on expertise in back-end development,
                cybersecurity, and network infrastructure — crafting secure, scalable digital solutions.
              </motion.p>

              <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
                transition={{ delay:0.5 }} className="cta-row">
                <NavLink to="/projects" className="btn-primary">
                  <Code2 size={14} /> View Projects <ArrowRight size={13} />
                </NavLink>
                <NavLink to="/contact" className="btn-outline">Get In Touch</NavLink>
                <a href="/cv/TITO_KILONZO_KINYAMBU-CV.pdf" download className="btn-outline">
                  <Download size={13} /> CV
                </a>
              </motion.div>
            </div>

            {/* Right: code card — hidden on mobile via CSS class */}
            <motion.div className="hero-card-hide"
              initial={{ opacity:0, scale:0.92 }} animate={{ opacity:1, scale:1 }}
              transition={{ delay:0.28, type:'spring', stiffness:100 }}>
              <WaveCard>
                <div className="glass conic-border" style={{ borderRadius:'var(--radius)',
                  overflow:'hidden', boxShadow:'0 24px 64px rgba(0,0,0,0.55)' }}>
                  {/* Title bar */}
                  <div style={{ background:'rgba(0,0,0,0.5)', padding:'11px 16px',
                    display:'flex', alignItems:'center', justifyContent:'space-between',
                    borderBottom:'1px solid var(--border)' }}>
                    <div style={{ display:'flex', gap:7 }}>
                      {['#ef4444','#f59e0b','#22c55e'].map(c => (
                        <div key={c} style={{ width:10, height:10, borderRadius:'50%', background:c }} />
                      ))}
                    </div>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.68rem', color:'var(--text-faint)' }}>
                      ~/tito_kilonzo.py
                    </span>
                    <div />
                  </div>
                  {/* Code */}
                  <div style={{ padding:'18px 22px', fontFamily:'var(--font-mono)', fontSize:'0.78rem',
                    lineHeight:1.75, background:'rgba(0,0,0,0.2)' }}>
                    {CODE_LINES.map((items, i) => <CodeLine key={i} items={items} delay={0.45+i*0.07} />)}
                  </div>
                </div>
              </WaveCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ─────────────────────────────────────────────── */}
      <section style={{ borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)',
        background:'rgba(8,15,26,0.75)', backdropFilter:'blur(20px)',
        padding:'clamp(24px,4vw,40px) 0', position:'relative', zIndex:1 }}>
        <div className="container">
          <div className="stat-grid">
            {STATS.map(({ label, value, icon:Icon }, i) => (
              <motion.div key={label} initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }}
                transition={{ delay:i*0.08 }} viewport={{ once:true }}
                style={{ textAlign:'center', padding:'14px 8px' }}>
                <Icon size={16} color="var(--primary)" style={{ margin:'0 auto 7px' }} />
                <div style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'var(--text-2xl)',
                  background:'linear-gradient(135deg,#00ff88,#38d2f7)',
                  WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>{value}</div>
                <div style={{ color:'var(--text-muted)', fontSize:'var(--text-xs)',
                  fontFamily:'var(--font-mono)', letterSpacing:'0.05em',
                  textTransform:'uppercase', marginTop:3 }}>{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Explore cards ─────────────────────────────────────────── */}
      <section className="section" style={{ position:'relative', zIndex:1 }}>
        <div className="container">
          <motion.div initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} style={{ textAlign:'center', marginBottom:48 }}>
            <span className="section-tag">Explore</span>
            <h2 className="section-title" style={{ textAlign:'center' }}>What I Bring to the Table</h2>
          </motion.div>

          <div className="explore-grid">
            {[
              { to:'/about',    icon:Shield, label:'About & Skills',    desc:'Tech stack, experience timeline, and certifications.' },
              { to:'/projects', icon:Code2,  label:'Projects',          desc:'Live-updated repos from my GitHub profile.'         },
              { to:'/services', icon:Server, label:'Services',          desc:'Web dev, IT support, cybersecurity, design.'        },
              { to:'/blog',     icon:Wifi,   label:'Tech & Cyber Blog', desc:'Auto-curated daily articles on emerging tech.'      },
            ].map(({ to, icon:Icon, label, desc }, i) => (
              <motion.div key={to} initial={{ opacity:0, y:22 }} whileInView={{ opacity:1, y:0 }}
                transition={{ delay:i*0.09 }} viewport={{ once:true }}>
                <NavLink to={to} style={{ display:'block', height:'100%' }}>
                  <WaveCard style={{ height:'100%' }}>
                    <div className="glass" style={{ padding:'clamp(18px,3vw,26px)',
                      borderRadius:'var(--radius)', border:'1px solid var(--border)',
                      height:'100%', transition:'var(--transition)', cursor:'pointer' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor='var(--border-hover)'; e.currentTarget.style.background='rgba(0,255,136,0.04)' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.background='' }}>
                      <Icon size={24} color="var(--primary)" style={{ marginBottom:12 }} />
                      <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700,
                        fontSize:'var(--text-base)', marginBottom:7, color:'var(--text)' }}>{label}</h3>
                      <p style={{ color:'var(--text-muted)', fontSize:'var(--text-sm)', lineHeight:1.65 }}>{desc}</p>
                      <div style={{ display:'flex', alignItems:'center', gap:5, marginTop:14,
                        color:'var(--primary)', fontFamily:'var(--font-mono)', fontSize:'var(--text-xs)' }}>
                        Explore <ArrowRight size={12} />
                      </div>
                    </div>
                  </WaveCard>
                </NavLink>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.main>
  )
}
