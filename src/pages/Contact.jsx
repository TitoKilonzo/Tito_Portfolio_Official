import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Phone, Send, Terminal, CheckCircle2, AlertCircle } from 'lucide-react'
import WaveCard from '../components/WaveCard'
import AnimatedBackground from '../components/AnimatedBackground'

const PAGE = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit:    { opacity: 0, transition: { duration: 0.25 } },
}

const SOCIALS = [
  { href:'https://github.com/TitoKilonzo',       icon:Github,   label:'GitHub',   handle:'@TitoKilonzo',          color:'#f0f6fc' },
  { href:'https://linkedin.com/in/titokinyambu', icon:Linkedin, label:'LinkedIn', handle:'titokinyambu',          color:'#0a66c2' },
  { href:'mailto:titokilonzo3@gmail.com',        icon:Mail,     label:'Email',    handle:'titokilonzo3@gmail.com', color:'#00ff88' },
]

const CONTACT_INFO = [
  { icon:Phone, label:'Phone',  value:'+254 799 713 796',         color:'var(--secondary)' },
  { icon:Mail,  label:'Email',  value:'titokilonzo3@gmail.com',   color:'var(--accent)'    },
]

function sanitize(s) {
  return s.replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').trim()
}
function validate({ name, email, message }) {
  const e = {}
  if (!name.trim() || name.trim().length < 2) e.name = 'Name must be at least 2 characters'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = 'Enter a valid email address'
  if (!message.trim() || message.trim().length < 20) e.message = 'Message must be at least 20 characters'
  return e
}

const FIELD_STYLE = (err) => ({
  width:'100%', padding:'11px 14px',
  background:'rgba(0,0,0,0.35)',
  border:`1px solid ${err ? 'var(--danger,#ef4444)' : 'rgba(255,255,255,0.1)'}`,
  borderRadius:'var(--radius-sm)', color:'var(--text)',
  fontFamily:'var(--font-mono)', fontSize:'var(--text-sm)',
  outline:'none', transition:'border-color 0.2s',
})

export default function Contact() {
  const [form,   setForm]   = useState({ name:'', email:'', message:'', subject:'' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)
  const hp = useRef(null)

  function onChange(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]:value }))
    if (errors[name]) setErrors(x => { const n={...x}; delete n[name]; return n })
  }
  function onFocus(e, err) { if (!err) e.currentTarget.style.borderColor = 'var(--primary)' }
  function onBlur(e, err)  { if (!err) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }

  async function onSubmit(e) {
    e.preventDefault()
    if (hp.current?.value) return
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setStatus('sending')
    const s = { name:sanitize(form.name), email:sanitize(form.email),
                subject:sanitize(form.subject||'Portfolio Contact'), message:sanitize(form.message) }
    await new Promise(r => setTimeout(r, 700))
    window.open(`mailto:titokilonzo3@gmail.com?subject=${encodeURIComponent(s.subject)}&body=${encodeURIComponent(`Name: ${s.name}\nEmail: ${s.email}\n\n${s.message}`)}`, '_blank')
    setStatus('sent')
    setForm({ name:'', email:'', message:'', subject:'' })
  }

  return (
    <motion.main variants={PAGE} initial="initial" animate="animate" exit="exit" className="page-wrap">
      <AnimatedBackground variant="contact" />

      <section className="section" style={{ position:'relative', zIndex:1 }}>
        <div className="container">

          {/* Header */}
          <motion.div initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }}
            style={{ marginBottom:'clamp(36px,6vw,60px)' }}>
            <span className="section-tag">Get In Touch</span>
            <h1 className="section-title">Let's Build Something Together</h1>
            <p className="section-desc">
              Available for freelance, part-time, and full-time opportunities — security assessments, full-stack projects, or just a conversation.
            </p>
          </motion.div>

          {/* Two-column grid → single on mobile */}
          <div className="contact-grid">

            {/* ── Left: info ─────────────────────────────────────── */}
            <motion.div initial={{ opacity:0, x:-22 }} animate={{ opacity:1, x:0 }}
              transition={{ delay:0.18 }} style={{ display:'flex', flexDirection:'column', gap:14 }}>

              {/* Info chips */}
              {CONTACT_INFO.map(({ icon:Icon, label, value, color }) => (
                <div key={label} style={{ display:'flex', alignItems:'center', gap:14,
                  background:'var(--bg-card)', backdropFilter:'blur(20px)',
                  border:'1px solid var(--border)', borderRadius:'var(--radius-sm)',
                  padding:'clamp(12px,2vw,16px) clamp(14px,3vw,18px)' }}>
                  <div style={{ width:38, height:38, borderRadius:10, flexShrink:0,
                    background:`${color}18`, border:`1px solid ${color}30`,
                    display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <Icon size={16} color={color} />
                  </div>
                  <div style={{ minWidth:0 }}>
                    <div style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-xs)',
                      color:'var(--text-faint)', letterSpacing:'0.08em',
                      textTransform:'uppercase', marginBottom:2 }}>{label}</div>
                    <div style={{ fontSize:'var(--text-sm)', color:'var(--text)',
                      overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{value}</div>
                  </div>
                </div>
              ))}

              {/* Social links */}
              <div style={{ paddingTop:4 }}>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-xs)',
                  color:'var(--primary)', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:10 }}>Social</div>
                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                  {SOCIALS.map(({ href, icon:Icon, label, handle, color }) => (
                    <motion.a key={label} href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer" whileHover={{ x:5 }}
                      style={{ display:'flex', alignItems:'center', gap:12,
                        background:'var(--bg-card)', backdropFilter:'blur(20px)',
                        border:'1px solid var(--border)', borderRadius:'var(--radius-sm)',
                        padding:'clamp(11px,2vw,14px) clamp(14px,3vw,18px)',
                        transition:'border-color 0.25s' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = color+'60'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
                      <Icon size={16} color={color} style={{ flexShrink:0 }} />
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontFamily:'var(--font-display)', fontWeight:600,
                          fontSize:'var(--text-sm)', color:'var(--text)' }}>{label}</div>
                        <div style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-xs)',
                          color:'var(--text-muted)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{handle}</div>
                      </div>
                      <div style={{ width:6, height:6, borderRadius:'50%', background:color, flexShrink:0 }} />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Status badge */}
              <div style={{ background:'var(--primary-dim)', border:'1px solid var(--border-hover)',
                borderRadius:'var(--radius-sm)', padding:'clamp(12px,2vw,16px) clamp(14px,3vw,18px)',
                display:'flex', alignItems:'center', gap:10 }}>
                <span style={{ width:9, height:9, borderRadius:'50%', background:'var(--primary)',
                  flexShrink:0, animation:'pulse-glow 2s ease-in-out infinite' }} />
                <div>
                  <div style={{ fontFamily:'var(--font-display)', fontWeight:600,
                    fontSize:'var(--text-sm)', color:'var(--primary)' }}>Open to Opportunities</div>
                  <div style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-xs)',
                    color:'var(--text-muted)', marginTop:2 }}>Remote & On-site worldwide</div>
                </div>
              </div>
            </motion.div>

            {/* ── Right: form ─────────────────────────────────────── */}
            <motion.div initial={{ opacity:0, x:22 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.28 }}>
              <WaveCard>
                <div style={{ borderRadius:'var(--radius)', background:'var(--bg-secondary)',
                  border:'1px solid var(--border)', overflow:'hidden', position:'relative' }}>
                  {/* Title bar */}
                  <div style={{ background:'rgba(0,0,0,0.45)', padding:'11px 16px',
                    display:'flex', alignItems:'center', justifyContent:'space-between',
                    borderBottom:'1px solid var(--border)' }}>
                    <div style={{ display:'flex', gap:7 }}>
                      {['#ef4444','#f59e0b','#22c55e'].map(c => (
                        <div key={c} style={{ width:10, height:10, borderRadius:'50%', background:c }} />
                      ))}
                    </div>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-xs)', color:'var(--text-faint)' }}>
                      ~/contact-form
                    </span>
                    <Terminal size={12} color="var(--text-faint)" />
                  </div>
                  {/* Scan line */}
                  <div style={{ position:'absolute', left:0, right:0, height:1,
                    background:'linear-gradient(90deg,transparent,var(--primary-glow),transparent)',
                    animation:'scan-line 4s linear infinite', pointerEvents:'none', zIndex:5 }} />

                  <div style={{ padding:'clamp(18px,3vw,28px)' }}>
                    {status === 'sent' ? (
                      <motion.div initial={{ scale:0.85, opacity:0 }} animate={{ scale:1, opacity:1 }}
                        style={{ textAlign:'center', padding:'clamp(28px,5vw,44px) 16px' }}>
                        <CheckCircle2 size={44} color="var(--primary)" style={{ margin:'0 auto 14px' }} />
                        <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700,
                          fontSize:'var(--text-lg)', color:'var(--text)', marginBottom:8 }}>Message Sent!</h3>
                        <p style={{ color:'var(--text-muted)', fontSize:'var(--text-sm)', lineHeight:1.65 }}>
                          Your mail client should have opened. I'll reply within 24 hours.
                        </p>
                        <button onClick={() => setStatus(null)} className="btn-outline" style={{ marginTop:18 }}>
                          Send Another
                        </button>
                      </motion.div>
                    ) : (
                      <form onSubmit={onSubmit} noValidate>
                        {/* Honeypot */}
                        <input ref={hp} name="website" type="text" tabIndex={-1} autoComplete="off"
                          aria-hidden="true" style={{ position:'absolute', left:'-9999px', opacity:0 }} />

                        {[
                          { id:'name',    label:'$ name',              type:'text',  ph:'John Doe',              ac:'name'  },
                          { id:'email',   label:'$ email',             type:'email', ph:'john@example.com',      ac:'email' },
                          { id:'subject', label:'$ subject (optional)',type:'text',  ph:'Project idea...',       ac:'off'   },
                        ].map(({ id, label, type, ph, ac }) => (
                          <div key={id} style={{ marginBottom:16 }}>
                            <label htmlFor={id} style={{ display:'block', fontFamily:'var(--font-mono)',
                              fontSize:'var(--text-xs)', color:'var(--primary)', marginBottom:6 }}>{label}</label>
                            <input id={id} name={id} type={type} placeholder={ph} autoComplete={ac}
                              value={form[id]} onChange={onChange}
                              maxLength={id==='subject'?120:100}
                              style={FIELD_STYLE(errors[id])}
                              onFocus={e => onFocus(e, errors[id])}
                              onBlur={e  => onBlur(e,  errors[id])}
                            />
                            {errors[id] && (
                              <div style={{ display:'flex', alignItems:'center', gap:5, marginTop:4,
                                fontFamily:'var(--font-mono)', fontSize:'var(--text-xs)', color:'#ef4444' }}>
                                <AlertCircle size={11} /> {errors[id]}
                              </div>
                            )}
                          </div>
                        ))}

                        <div style={{ marginBottom:20 }}>
                          <label htmlFor="message" style={{ display:'block', fontFamily:'var(--font-mono)',
                            fontSize:'var(--text-xs)', color:'var(--primary)', marginBottom:6 }}>$ message</label>
                          <textarea id="message" name="message" rows={5}
                            placeholder="Tell me about your project..."
                            value={form.message} onChange={onChange} maxLength={2000}
                            style={{ ...FIELD_STYLE(errors.message), resize:'vertical', minHeight:110, lineHeight:1.65 }}
                            onFocus={e => onFocus(e, errors.message)}
                            onBlur={e  => onBlur(e,  errors.message)}
                          />
                          {errors.message && (
                            <div style={{ display:'flex', alignItems:'center', gap:5, marginTop:4,
                              fontFamily:'var(--font-mono)', fontSize:'var(--text-xs)', color:'#ef4444' }}>
                              <AlertCircle size={11} /> {errors.message}
                            </div>
                          )}
                          <div style={{ fontFamily:'var(--font-mono)', fontSize:'var(--text-xs)',
                            color:'var(--text-faint)', textAlign:'right', marginTop:4 }}>
                            {form.message.length}/2000
                          </div>
                        </div>

                        <motion.button type="submit" disabled={status==='sending'}
                          whileHover={{ scale: status==='sending'?1:1.01 }}
                          whileTap={{ scale: status==='sending'?1:0.98 }}
                          style={{ width:'100%', padding:'clamp(11px,2vw,13px) 20px',
                            background: status==='sending' ? 'rgba(0,255,136,0.3)' : 'var(--primary)',
                            color:'#000', border:'none', borderRadius:99,
                            fontFamily:'var(--font-mono)', fontWeight:700, fontSize:'var(--text-sm)',
                            letterSpacing:'0.06em', textTransform:'uppercase',
                            display:'flex', alignItems:'center', justifyContent:'center', gap:8,
                            cursor: status==='sending'?'not-allowed':'pointer', transition:'var(--transition)' }}>
                          {status==='sending' ? (
                            <>
                              <div style={{ width:13, height:13, border:'2px solid #000',
                                borderTopColor:'transparent', borderRadius:'50%',
                                animation:'spin 0.8s linear infinite' }} />
                              Sending...
                            </>
                          ) : (
                            <><Send size={13} /> Send Message</>
                          )}
                        </motion.button>
                      </form>
                    )}
                  </div>
                </div>
              </WaveCard>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.main>
  )
}
