import { useEffect, useRef, memo } from 'react'
import { motion } from 'framer-motion'

/**
 * AnimatedBackground
 * - Full-viewport photo background with Ken Burns animation (slow zoom/pan)
 * - Per-page canvas overlay (particles, waves, matrix, hexagons, orbits, neural)
 * - Dark scrim for readability
 */

const BG_CONFIG = {
  home:     { src: '/backgrounds/bg-home.jpg',     ken: 'zoom-out',  overlay: 'rgba(3,7,18,0.72)',   canvasAlpha: 0.55 },
  about:    { src: '/backgrounds/bg-about.jpg',    ken: 'pan-right', overlay: 'rgba(3,7,18,0.78)',   canvasAlpha: 0.4  },
  projects: { src: '/backgrounds/bg-projects.jpg', ken: 'pan-left',  overlay: 'rgba(3,7,18,0.75)',   canvasAlpha: 0.45 },
  blog:     { src: '/backgrounds/bg-blog.jpg',     ken: 'zoom-in',   overlay: 'rgba(3,7,18,0.70)',   canvasAlpha: 0.5  },
  services: { src: '/backgrounds/bg-services.jpg', ken: 'pan-up',    overlay: 'rgba(3,7,18,0.76)',   canvasAlpha: 0.42 },
  contact:  { src: '/backgrounds/bg-contact.jpg',  ken: 'zoom-out',  overlay: 'rgba(3,7,18,0.68)',   canvasAlpha: 0.5  },
}

/* Ken Burns keyframes injected once */
const KB_STYLES = `
@keyframes kb-zoom-in  { from{transform:scale(1)   translateX(0)   translateY(0)}   to{transform:scale(1.18) translateX(-2%) translateY(-1%)} }
@keyframes kb-zoom-out { from{transform:scale(1.18) translateX(-2%) translateY(-1%)} to{transform:scale(1)   translateX(0)   translateY(0)}   }
@keyframes kb-pan-right{ from{transform:scale(1.12) translateX(-4%) translateY(0)}   to{transform:scale(1.12) translateX(2%)  translateY(1%)} }
@keyframes kb-pan-left { from{transform:scale(1.12) translateX(2%)  translateY(1%)}  to{transform:scale(1.12) translateX(-4%) translateY(0)}  }
@keyframes kb-pan-up   { from{transform:scale(1.12) translateX(0)   translateY(3%)}  to{transform:scale(1.12) translateX(1%)  translateY(-2%)} }
`
if (typeof document !== 'undefined' && !document.getElementById('kb-styles')) {
  const s = document.createElement('style')
  s.id = 'kb-styles'
  s.textContent = KB_STYLES
  document.head.appendChild(s)
}

function useCanvasAnimation(canvasRef, variant, alpha) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf

    function resize() {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      init()
    }

    /* ── State ─────────────────────────────── */
    let state = {}

    function init() {
      const W = canvas.width, H = canvas.height
      if (variant === 'home') {
        state = { particles: Array.from({ length: 70 }, () => ({
          x: Math.random()*W, y: Math.random()*H,
          vx: (Math.random()-0.5)*0.4, vy: (Math.random()-0.5)*0.4,
          r: Math.random()*1.6+0.5, a: Math.random()*0.55+0.15,
        }))}
      } else if (variant === 'about') {
        state = { t: 0 }
      } else if (variant === 'projects') {
        const cols = Math.floor(W/20)
        state = { cols, drops: Array(cols).fill(0).map(()=>Math.random()*H/20),
          chars: '01アウカキコサシ{}[]<>/;PYTHON' }
      } else if (variant === 'blog') {
        state = { hexes: Array.from({ length: 14 }, () => ({
          x:Math.random()*W, y:Math.random()*H,
          size:Math.random()*45+18, vx:(Math.random()-0.5)*0.18, vy:(Math.random()-0.5)*0.18,
          rot:Math.random()*Math.PI*2, vRot:(Math.random()-0.5)*0.004,
          a:Math.random()*0.1+0.04,
          c:['rgba(255,120,30,','rgba(255,60,130,','rgba(180,60,255,'][Math.floor(Math.random()*3)],
        }))}
      } else if (variant === 'services') {
        state = { t:0, rings:[
          { r:140, speed:0.0007, dots:5,  c:'rgba(0,255,136,' },
          { r:240, speed:0.0005, dots:8,  c:'rgba(56,210,247,' },
          { r:340, speed:0.0003, dots:10, c:'rgba(168,85,247,' },
          { r:440, speed:0.0002, dots:12, c:'rgba(245,158,11,' },
        ]}
      } else if (variant === 'contact') {
        state = { nodes: Array.from({ length: 28 }, () => ({
          x:Math.random()*W, y:Math.random()*H,
          vx:(Math.random()-0.5)*0.28, vy:(Math.random()-0.5)*0.28,
          pulse:Math.random()*Math.PI*2,
        }))}
      }
    }

    function draw() {
      const W = canvas.width, H = canvas.height
      ctx.globalAlpha = alpha

      if (variant === 'home') {
        ctx.clearRect(0,0,W,H)
        const { particles: ps } = state
        ps.forEach(p => {
          p.x+=p.vx; p.y+=p.vy
          if(p.x<0)p.x=W; if(p.x>W)p.x=0
          if(p.y<0)p.y=H; if(p.y>H)p.y=0
          ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2)
          ctx.fillStyle=`rgba(0,255,136,${p.a})`; ctx.fill()
        })
        for(let i=0;i<ps.length;i++) for(let j=i+1;j<ps.length;j++){
          const dx=ps[i].x-ps[j].x, dy=ps[i].y-ps[j].y, d=Math.sqrt(dx*dx+dy*dy)
          if(d<130){ ctx.beginPath(); ctx.moveTo(ps[i].x,ps[i].y); ctx.lineTo(ps[j].x,ps[j].y)
            ctx.strokeStyle=`rgba(0,255,136,${0.13*(1-d/130)})`; ctx.lineWidth=0.6; ctx.stroke() }
        }

      } else if (variant === 'about') {
        state.t+=0.007
        ctx.clearRect(0,0,W,H)
        ;[
          { amp:55, freq:0.004, speed:1,   c:'rgba(56,210,247,', phase:0 },
          { amp:38, freq:0.006, speed:1.3, c:'rgba(168,85,247,', phase:2 },
          { amp:45, freq:0.003, speed:0.7, c:'rgba(0,255,136,',  phase:4 },
        ].forEach(w=>{
          ctx.beginPath()
          for(let x=0;x<=W;x+=4){
            const y=H*0.5+Math.sin(x*w.freq+state.t*w.speed+w.phase)*w.amp
            x===0?ctx.moveTo(x,y):ctx.lineTo(x,y)
          }
          ctx.strokeStyle=w.c+'0.2)'; ctx.lineWidth=1.5; ctx.stroke()
        })

      } else if (variant === 'projects') {
        ctx.fillStyle=`rgba(3,7,18,0.05)`; ctx.fillRect(0,0,W,H)
        ctx.fillStyle='rgba(0,255,136,0.22)'; ctx.font='13px JetBrains Mono,monospace'
        const { cols, drops, chars } = state
        for(let i=0;i<cols;i++){
          const ch=chars[Math.floor(Math.random()*chars.length)]
          ctx.fillText(ch, i*20, drops[i]*20)
          if(drops[i]*20>H && Math.random()>0.975) drops[i]=0
          drops[i]+=0.5
        }

      } else if (variant === 'blog') {
        ctx.clearRect(0,0,W,H)
        state.hexes.forEach(h=>{
          h.x+=h.vx; h.y+=h.vy; h.rot+=h.vRot
          if(h.x<-h.size)h.x=W+h.size; if(h.x>W+h.size)h.x=-h.size
          if(h.y<-h.size)h.y=H+h.size; if(h.y>H+h.size)h.y=-h.size
          ctx.beginPath()
          for(let i=0;i<6;i++){
            const a=h.rot+(Math.PI/3)*i
            i===0?ctx.moveTo(h.x+h.size*Math.cos(a),h.y+h.size*Math.sin(a))
                 :ctx.lineTo(h.x+h.size*Math.cos(a),h.y+h.size*Math.sin(a))
          }
          ctx.closePath(); ctx.strokeStyle=h.c+h.a+')'; ctx.lineWidth=1; ctx.stroke()
        })

      } else if (variant === 'services') {
        state.t+=1
        ctx.clearRect(0,0,W,H)
        const cx=W*0.5, cy=H*0.5
        state.rings.forEach(ring=>{
          ctx.beginPath(); ctx.arc(cx,cy,ring.r,0,Math.PI*2)
          ctx.strokeStyle=ring.c+'0.14)'; ctx.lineWidth=0.6; ctx.stroke()
          for(let i=0;i<ring.dots;i++){
            const a=state.t*ring.speed+(Math.PI*2/ring.dots)*i
            const dx=cx+ring.r*Math.cos(a), dy=cy+ring.r*Math.sin(a)
            ctx.beginPath(); ctx.arc(dx,dy,2.5,0,Math.PI*2)
            ctx.fillStyle=ring.c+'0.6)'; ctx.fill()
          }
        })

      } else if (variant === 'contact') {
        ctx.clearRect(0,0,W,H)
        state.nodes.forEach(n=>{
          n.x+=n.vx; n.y+=n.vy; n.pulse+=0.028
          if(n.x<0||n.x>W)n.vx*=-1; if(n.y<0||n.y>H)n.vy*=-1
        })
        for(let i=0;i<state.nodes.length;i++){
          for(let j=i+1;j<state.nodes.length;j++){
            const dx=state.nodes[i].x-state.nodes[j].x, dy=state.nodes[i].y-state.nodes[j].y
            const d=Math.sqrt(dx*dx+dy*dy)
            if(d<150){ ctx.beginPath(); ctx.moveTo(state.nodes[i].x,state.nodes[i].y)
              ctx.lineTo(state.nodes[j].x,state.nodes[j].y)
              ctx.strokeStyle=`rgba(56,210,247,${0.18*(1-d/150)})`; ctx.lineWidth=0.8; ctx.stroke() }
          }
          const pulse=(Math.sin(state.nodes[i].pulse)+1)/2
          ctx.beginPath(); ctx.arc(state.nodes[i].x,state.nodes[i].y,2+pulse*2,0,Math.PI*2)
          ctx.fillStyle=`rgba(56,210,247,${0.35+pulse*0.4})`; ctx.fill()
        }
      }

      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }

    resize()
    raf = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [variant, alpha])
}

function AnimatedBackground({ variant = 'home' }) {
  const canvasRef = useRef(null)
  const cfg = BG_CONFIG[variant] || BG_CONFIG.home
  useCanvasAnimation(canvasRef, variant, cfg.canvasAlpha)

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
      overflow: 'hidden',
    }}>
      {/* ── Photo layer with Ken Burns ──────────────────────────── */}
      <div style={{
        position: 'absolute', inset: '-10%',      // over-size so Ken Burns never shows edges
        backgroundImage: `url(${cfg.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        animation: `kb-${cfg.ken} 22s ease-in-out infinite alternate`,
        willChange: 'transform',
      }} />

      {/* ── Dark scrim (gradient from bottom for text legibility) ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: [
          cfg.overlay,
          'linear-gradient(to bottom, rgba(3,7,18,0.15) 0%, rgba(3,7,18,0.55) 60%, rgba(3,7,18,0.92) 100%)',
        ].join(', '),
        mixBlendMode: 'normal',
      }} />

      {/* ── Radial vignette ─────────────────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(3,7,18,0.55) 100%)',
      }} />

      {/* ── Canvas overlay (animated particles/waves/etc) ───────── */}
      <canvas ref={canvasRef} style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        mixBlendMode: 'screen',
      }} />
    </div>
  )
}

export default memo(AnimatedBackground)
