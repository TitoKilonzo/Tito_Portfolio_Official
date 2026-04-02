import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Download, Briefcase, GraduationCap, Award, User } from 'lucide-react'
import WaveCard from '../components/WaveCard'
import AnimatedBackground from '../components/AnimatedBackground'
import BentoSkills from '../components/BentoSkills'

const PAGE = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit:    { opacity: 0, transition: { duration: 0.25 } },
}

const TECH_STACK = [
  { cat:'Languages',                 color:'#00ff88', items:['Python','JavaScript','TypeScript','SQL','Bash','HTML5','CSS3','Java (Android)'] },
  { cat:'Frameworks & Libraries',    color:'#38d2f7', items:['Django','React','Node.js','Express.js','Vite','Framer Motion','Pandas','Scikit-learn'] },
  { cat:'Databases & Storage',       color:'#a855f7', items:['PostgreSQL','MySQL','SQLite','MongoDB Atlas','Supabase','Appwrite','Firebase','Redis'] },
  { cat:'Cybersecurity',             color:'#f59e0b', items:['Vulnerability Assessment','Penetration Testing','SIEM','Incident Response','Active Directory','Network Hardening','OWASP'] },
  { cat:'Networking & Infra',        color:'#ef4444', items:['Fiber Optic (FTTH/FTTB)','OTDR Testing','Fusion Splicing','ONT Config','TCP/IP','DNS/DHCP','VPN','Cisco'] },
  { cat:'Tools & DevOps',            color:'#22d3ee', items:['Git','GitHub Actions','CI/CD','Docker','Linux','VS Code','Postman','Figma'] },
]

const EXPERIENCE = [
  {
    role:'Back-End Developer (Intern)', company:'Current Employer', period:'Feb 2026 – Present',
    highlights:['Developed scalable RESTful APIs serving 1,000+ concurrent users','Reduced DB response time ~35% via indexing & query refactoring','Integrated 5+ payment gateways with zero-downtime deployments'],
    icon:Briefcase, color:'#00ff88',
  },
  {
    role:'ICT Assistant & Trainer', company:'AIC Kanzinwa CDC', period:'May 2025 – Jan 2026',
    highlights:['Delivered ICT training to 30+ staff; reduced help-desk tickets ~25%','Provided L1/L2 support across 50+ endpoints at 90%+ SLA','Administered Active Directory and security patches across 60+ devices'],
    icon:User, color:'#38d2f7',
  },
  {
    role:'IT Support & Consultant', company:'Hatikvah Communication & Engineering', period:'Feb 2025 – May 2025',
    highlights:['Led fiber optic FTTH/FTTB deployments across 4+ regional sites','Configured ONTs for 100+ customer premises with OTDR testing','Delivered network security hardening and infrastructure optimization'],
    icon:Briefcase, color:'#a855f7',
  },
  {
    role:'IT Support (Volunteer)', company:'AIC Kanzinwa Child & Youth Dev.', period:'Aug 2023 – Jan 2024',
    highlights:['Resolved 100+ incidents using structured troubleshooting','Trained 20+ staff on newly deployed software','Developed SOPs and knowledge-base articles'],
    icon:User, color:'#f59e0b',
  },
]

function Accordion({ item }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderRadius:'var(--radius-sm)',
      border:`1px solid ${open ? item.color+'35' : 'var(--border)'}`,
      overflow:'hidden', transition:'border-color 0.3s', background:'var(--bg-card)',
      backdropFilter:'blur(16px)' }}>
      <button onClick={() => setOpen(o => !o)} style={{ width:'100%',
        padding:'clamp(12px,2vw,16px) clamp(14px,3vw,20px)',
        display:'flex', alignItems:'center', justifyContent:'space-between',
        background: open ? `${item.color}08` : 'transparent',
        color:'var(--text)', cursor:'pointer', gap:12 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, minWidth:0 }}>
          <div style={{ width:7, height:7, borderRadius:'50%', background:item.color, flexShrink:0 }} />
          <span style={{ fontFamily:'var(--font-display)', fontWeight:600,
            fontSize:'var(--text-sm)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{item.cat}</span>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-xs)', color:item.color,
            background:`${item.color}18`, padding:'2px 8px', borderRadius:99, flexShrink:0 }}>{item.items.length}</span>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration:0.2 }} style={{ flexShrink:0 }}>
          <ChevronDown size={15} color="var(--text-muted)" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height:0 }} animate={{ height:'auto' }} exit={{ height:0 }}
            style={{ overflow:'hidden' }}>
            <div style={{ padding:'14px clamp(14px,3vw,20px)', display:'flex', flexWrap:'wrap', gap:7,
              borderTop:`1px solid ${item.color}20`, background:'rgba(0,0,0,0.18)' }}>
              {item.items.map(s => (
                <span key={s} style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-xs)',
                  padding:'4px 11px', borderRadius:99,
                  background:`${item.color}14`, color:item.color,
                  border:`1px solid ${item.color}28` }}>{s}</span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function FlipCard() {
  const [flipped, setFlipped] = useState(false)
  return (
    <div style={{ perspective:900, width:'100%', minHeight:130 }}>
      <motion.div animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration:0.6, type:'spring', stiffness:80 }}
        style={{ transformStyle:'preserve-3d', position:'relative', width:'100%', height:130, cursor:'pointer' }}
        onClick={() => setFlipped(f => !f)}>
        {[false, true].map(isBack => (
          <div key={String(isBack)} style={{
            backfaceVisibility:'hidden', WebkitBackfaceVisibility:'hidden',
            transform: isBack ? 'rotateY(180deg)' : 'none',
            position:'absolute', inset:0, borderRadius:'var(--radius)',
            background: isBack ? 'var(--primary-dim)' : 'var(--bg-card)',
            border:`1px solid ${isBack ? 'var(--border-hover)' : 'var(--border)'}`,
            backdropFilter:'blur(20px)',
            display:'flex', flexDirection:'column',
            alignItems:'center', justifyContent:'center', gap:8, padding:20,
          }}>
            {isBack ? (
              <>
                <Award size={24} color="var(--primary)" />
                <div style={{ fontFamily:'var(--font-display)', fontWeight:700,
                  color:'var(--text)', fontSize:'var(--text-sm)', textAlign:'center' }}>References Available</div>
                <p style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-xs)',
                  color:'var(--primary)', lineHeight:1.5, textAlign:'center' }}>
                  Professional referees — provided upon request
                </p>
              </>
            ) : (
              <>
                <div style={{ width:40, height:40, borderRadius:'50%',
                  background:'conic-gradient(from var(--angle,0deg),#00ff88,#38d2f7,#a855f7,#00ff88)',
                  animation:'conic-spin 4s linear infinite',
                  display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <User size={18} color="#000" />
                </div>
                <div style={{ textAlign:'center' }}>
                  <div style={{ fontFamily:'var(--font-display)', fontWeight:700,
                    color:'var(--text)', fontSize:'var(--text-sm)' }}>References</div>
                  <div style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-xs)',
                    color:'var(--primary)', marginTop:3 }}>Tap to flip</div>
                </div>
              </>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function About() {
  return (
    <motion.main variants={PAGE} initial="initial" animate="animate" exit="exit" className="page-wrap">
      <AnimatedBackground variant="about" />

      {/* Header */}
      <section className="section" style={{ paddingBottom:'clamp(24px,4vw,40px)', position:'relative', zIndex:1 }}>
        <div className="container">
          <motion.div initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }}>
            <span className="section-tag">About Me</span>
            <h1 className="section-title">The Developer Behind the Code</h1>
            <p className="section-desc">
              BSc IT graduate with hands-on expertise spanning back-end development, cybersecurity, and fiber optic infrastructure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bio + sidebar */}
      <section style={{ paddingBottom:'clamp(40px,6vw,60px)', position:'relative', zIndex:1 }}>
        <div className="container">
          <div className="about-grid">
            <motion.div initial={{ opacity:0, x:-18 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}>
              <div className="glass" style={{ borderRadius:'var(--radius)',
                padding:'clamp(20px,4vw,32px)', border:'1px solid var(--border)' }}>
                {['I\'m a results-driven IT professional who thrives at the intersection of code and security — writing APIs that scale, networks that stay up, and systems that resist attack.',
                  'My background spans full-stack development, fiber optic infrastructure, SIEM monitoring, and end-user training. I bring a solutions-first mindset to every engagement.',
                  'Whether architecting a back-end system from scratch, hardening a network, or training non-technical staff — I\'m deeply invested in the craft and the outcome.'
                ].map((p, i) => (
                  <p key={i} style={{ color:'var(--text-muted)', lineHeight:1.85, marginBottom: i < 2 ? 16 : 0,
                    fontSize:'var(--text-base)' }}>{p}</p>
                ))}
                <div style={{ marginTop:24 }}>
                  <a href="/cv/TITO_KILONZO_KINYAMBU-CV.pdf" download className="btn-primary"
                    style={{ display:'inline-flex', gap:8, alignItems:'center' }}>
                    <Download size={14} /> Download Full CV
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity:0, x:18 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
              style={{ display:'flex', flexDirection:'column', gap:16 }}>
              <FlipCard />
              {/* Cert */}
              <div className="glass" style={{ borderRadius:'var(--radius)',
                padding:'clamp(14px,2vw,20px)', border:'1px solid var(--border)' }}>
                <div style={{ fontFamily:'var(--font-mono)', color:'var(--primary)', fontSize:'var(--text-xs)',
                  letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:11 }}>Certification</div>
                <div style={{ fontWeight:600, fontSize:'var(--text-sm)', color:'var(--text)', marginBottom:4, lineHeight:1.4 }}>
                  AI & Machine Learning for Data Science
                </div>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-xs)', color:'var(--text-muted)' }}>
                  Ivy Code Academy · Feb 2026
                </div>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-xs)', color:'var(--text-faint)', marginTop:2 }}>
                  No. C301/30/2026
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Stack — Bento Grid */}
      <section className="section" style={{ background:'rgba(8,15,26,0.65)', backdropFilter:'blur(20px)',
        borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)', position:'relative', zIndex:1 }}>
        <div className="container">
          <BentoSkills />
        </div>
      </section>

      {/* Experience */}
      <section className="section" style={{ position:'relative', zIndex:1 }}>
        <div className="container">
          <motion.div initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} style={{ marginBottom:'clamp(24px,4vw,40px)' }}>
            <span className="section-tag">Experience</span>
            <h2 className="section-title">Work History</h2>
          </motion.div>
          <div className="timeline">
            {EXPERIENCE.map((exp, i) => {
              const Icon = exp.icon
              return (
                <motion.div key={i} initial={{ opacity:0, x:-18 }} whileInView={{ opacity:1, x:0 }}
                  transition={{ delay:i*0.1 }} viewport={{ once:true }}
                  style={{ marginBottom: i < EXPERIENCE.length-1 ? 'clamp(18px,3vw,28px)' : 0, position:'relative' }}>
                  {/* Dot */}
                  <div style={{ position:'absolute', left:'clamp(-30px,-4vw,-28px)', top:16,
                    width:22, height:22, borderRadius:'50%', background:exp.color,
                    border:'3px solid var(--bg-primary)',
                    display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <Icon size={9} color="#000" />
                  </div>
                  <WaveCard>
                    <div className="glass" style={{ borderRadius:'var(--radius)',
                      padding:'clamp(16px,3vw,22px) clamp(18px,3vw,26px)', border:'1px solid var(--border)' }}>
                      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between',
                        flexWrap:'wrap', gap:8, marginBottom:10 }}>
                        <div>
                          <div style={{ fontFamily:'var(--font-display)', fontWeight:700,
                            fontSize:'var(--text-base)', color:'var(--text)', marginBottom:3 }}>{exp.role}</div>
                          <div style={{ color:exp.color, fontFamily:'var(--font-mono)', fontSize:'var(--text-sm)' }}>{exp.company}</div>
                        </div>
                        <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-xs)',
                          color:'var(--text-muted)', background:'var(--glass)',
                          padding:'3px 10px', borderRadius:99, border:'1px solid var(--border)',
                          whiteSpace:'nowrap' }}>{exp.period}</span>
                      </div>
                      <ul style={{ display:'flex', flexDirection:'column', gap:5 }}>
                        {exp.highlights.map((h, j) => (
                          <li key={j} style={{ display:'flex', gap:9, color:'var(--text-muted)',
                            fontSize:'var(--text-sm)', lineHeight:1.6 }}>
                            <span style={{ color:'var(--primary)', flexShrink:0 }}>›</span>{h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </WaveCard>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Education */}
      <section style={{ paddingBottom:'clamp(48px,8vw,80px)', position:'relative', zIndex:1 }}>
        <div className="container">
          <motion.div initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} style={{ marginBottom:'clamp(20px,3vw,28px)' }}>
            <span className="section-tag">Education</span>
            <h2 className="section-title">Academic Background</h2>
          </motion.div>
          <motion.div initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
            <div className="glass conic-border" style={{ borderRadius:'var(--radius)',
              padding:'clamp(18px,3vw,26px) clamp(20px,4vw,30px)',
              display:'flex', alignItems:'flex-start', gap:'clamp(12px,2vw,18px)' }}>
              <div style={{ width:44, height:44, borderRadius:12, background:'var(--secondary-dim)',
                display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <GraduationCap size={20} color="var(--secondary)" />
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:700,
                  fontSize:'var(--text-lg)', color:'var(--text)', marginBottom:4 }}>
                  Bachelor of Science in Information Technology
                </div>
                <div style={{ color:'var(--secondary)', fontFamily:'var(--font-mono)',
                  fontSize:'var(--text-sm)', marginBottom:8 }}>Kabarak University</div>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-xs)',
                  color:'var(--text-muted)', background:'var(--glass)', padding:'3px 10px',
                  borderRadius:99, border:'1px solid var(--border)', display:'inline-block', marginBottom:10 }}>
                  Sep 2021 – Dec 2025
                </span>
                <p style={{ color:'var(--text-muted)', fontSize:'var(--text-sm)', lineHeight:1.65 }}>
                  Final Year Project: Work Shift Management System — cross-platform mobile app for employee scheduling and real-time attendance tracking.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.main>
  )
}
