import { useEffect, useRef, memo } from 'react'

const BG_CONFIG = {
  home:     { src: '/backgrounds/bg-home.jpg',     ken: 'zoom-out',  },
  about:    { src: '/backgrounds/bg-about.jpg',    ken: 'pan-right', },
  projects: { src: '/backgrounds/bg-projects.jpg', ken: 'pan-left',  },
  blog:     { src: '/backgrounds/bg-blog.jpg',     ken: 'zoom-in',   },
  services: { src: '/backgrounds/bg-services.jpg', ken: 'pan-up',    },
  contact:  { src: '/backgrounds/bg-contact.jpg',  ken: 'zoom-out',  },
}

const KB_STYLES = `
@keyframes kb-zoom-in   { from{transform:scale(1)    translateX(0)    translateY(0)   } to{transform:scale(1.12) translateX(-1%) translateY(-1%)} }
@keyframes kb-zoom-out  { from{transform:scale(1.12) translateX(-1%)  translateY(-1%) } to{transform:scale(1)    translateX(0)    translateY(0)  } }
@keyframes kb-pan-right { from{transform:scale(1.1)  translateX(-3%)  translateY(0)   } to{transform:scale(1.1)  translateX(1%)   translateY(1%) } }
@keyframes kb-pan-left  { from{transform:scale(1.1)  translateX(1%)   translateY(1%)  } to{transform:scale(1.1)  translateX(-3%)  translateY(0)  } }
@keyframes kb-pan-up    { from{transform:scale(1.1)  translateX(0)    translateY(2%)  } to{transform:scale(1.1)  translateX(0%)   translateY(-2%)} }
`
if (typeof document !== 'undefined' && !document.getElementById('kb-styles')) {
  const s = document.createElement('style')
  s.id = 'kb-styles'; s.textContent = KB_STYLES
  document.head.appendChild(s)
}

function useCanvas(canvasRef, variant) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    let state = {}

    function resize() {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      init()
    }

    function init() {
      const W = canvas.width, H = canvas.height
      if (variant === 'home') {
        state = { ps: Array.from({ length: 55 }, () => ({
          x: Math.random()*W, y: Math.random()*H,
          vx:(Math.random()-.5)*.35, vy:(Math.random()-.5)*.35,
          r: Math.random()*1.4+.4, a: Math.random()*.35+.12,
        }))}
      } else if (variant === 'about') {
        state = { t: 0 }
      } else if (variant === 'projects') {
        const cols = Math.floor(W/22)
        state = { cols, drops: Array(cols).fill(0).map(()=>Math.random()*H/22),
          chars: '01{}[]アキサPY' }
      } else if (variant === 'blog') {
        state = { hexes: Array.from({ length: 10 }, () => ({
          x:Math.random()*W, y:Math.random()*H, size:Math.random()*40+16,
          vx:(Math.random()-.5)*.15, vy:(Math.random()-.5)*.15,
          rot:Math.random()*Math.PI*2, vRot:(Math.random()-.5)*.003,
          a:.06, c:['rgba(255,120,30,','rgba(56,210,247,','rgba(168,85,247,'][Math.floor(Math.random()*3)],
        }))}
      } else if (variant === 'services') {
        state = { t:0, rings:[
          {r:130,speed:.0006,dots:5, c:'rgba(0,255,136,'},
          {r:220,speed:.0004,dots:7, c:'rgba(56,210,247,'},
          {r:320,speed:.0003,dots:10,c:'rgba(168,85,247,'},
        ]}
      } else if (variant === 'contact') {
        state = { nodes: Array.from({ length: 22 }, () => ({
          x:Math.random()*W, y:Math.random()*H,
          vx:(Math.random()-.5)*.25, vy:(Math.random()-.5)*.25,
          pulse:Math.random()*Math.PI*2,
        }))}
      }
    }

    function draw() {
      const W = canvas.width, H = canvas.height

      if (variant === 'home') {
        ctx.clearRect(0,0,W,H)
        const { ps } = state
        ps.forEach(p => {
          p.x+=p.vx; p.y+=p.vy
          if(p.x<0)p.x=W; if(p.x>W)p.x=0
          if(p.y<0)p.y=H; if(p.y>H)p.y=0
          ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2)
          ctx.fillStyle=`rgba(0,255,136,${p.a})`; ctx.fill()
        })
        for(let i=0;i<ps.length;i++) for(let j=i+1;j<ps.length;j++){
          const dx=ps[i].x-ps[j].x, dy=ps[i].y-ps[j].y, d=Math.sqrt(dx*dx+dy*dy)
          if(d<110){
            ctx.beginPath(); ctx.moveTo(ps[i].x,ps[i].y); ctx.lineTo(ps[j].x,ps[j].y)
            ctx.strokeStyle=`rgba(0,255,136,${.1*(1-d/110)})`
            ctx.lineWidth=.5; ctx.stroke()
          }
        }

      } else if (variant === 'about') {
        state.t+=.006; ctx.clearRect(0,0,W,H)
        ;[{amp:50,freq:.004,speed:1,c:'rgba(56,210,247,',ph:0},
          {amp:34,freq:.006,speed:1.3,c:'rgba(168,85,247,',ph:2},
          {amp:42,freq:.003,speed:.7,c:'rgba(0,255,136,',ph:4}
        ].forEach(w=>{
          ctx.beginPath()
          for(let x=0;x<=W;x+=4){
            const y=H*.5+Math.sin(x*w.freq+state.t*w.speed+w.ph)*w.amp
            x===0?ctx.moveTo(x,y):ctx.lineTo(x,y)
          }
          ctx.strokeStyle=w.c+'.15)'; ctx.lineWidth=1.4; ctx.stroke()
        })

      } else if (variant === 'projects') {
        ctx.fillStyle='rgba(3,7,18,.04)'; ctx.fillRect(0,0,W,H)
        ctx.fillStyle='rgba(0,255,136,.18)'; ctx.font='12px JetBrains Mono,monospace'
        const { cols, drops, chars } = state
        for(let i=0;i<cols;i++){
          ctx.fillText(chars[Math.floor(Math.random()*chars.length)], i*22, drops[i]*22)
          if(drops[i]*22>H && Math.random()>.975) drops[i]=0
          drops[i]+=.45
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
          ctx.closePath(); ctx.strokeStyle=h.c+h.a+')'; ctx.lineWidth=.9; ctx.stroke()
        })

      } else if (variant === 'services') {
        state.t+=1; ctx.clearRect(0,0,W,H)
        const cx=W*.5, cy=H*.5
        state.rings.forEach(r=>{
          ctx.beginPath(); ctx.arc(cx,cy,r.r,0,Math.PI*2)
          ctx.strokeStyle=r.c+'.12)'; ctx.lineWidth=.5; ctx.stroke()
          for(let i=0;i<r.dots;i++){
            const a=state.t*r.speed+(Math.PI*2/r.dots)*i
            ctx.beginPath(); ctx.arc(cx+r.r*Math.cos(a),cy+r.r*Math.sin(a),2,0,Math.PI*2)
            ctx.fillStyle=r.c+'.55)'; ctx.fill()
          }
        })

      } else if (variant === 'contact') {
        ctx.clearRect(0,0,W,H)
        state.nodes.forEach(n=>{
          n.x+=n.vx; n.y+=n.vy; n.pulse+=.025
          if(n.x<0||n.x>W)n.vx*=-1; if(n.y<0||n.y>H)n.vy*=-1
        })
        for(let i=0;i<state.nodes.length;i++){
          for(let j=i+1;j<state.nodes.length;j++){
            const dx=state.nodes[i].x-state.nodes[j].x, dy=state.nodes[i].y-state.nodes[j].y
            const d=Math.sqrt(dx*dx+dy*dy)
            if(d<140){
              ctx.beginPath(); ctx.moveTo(state.nodes[i].x,state.nodes[i].y)
              ctx.lineTo(state.nodes[j].x,state.nodes[j].y)
              ctx.strokeStyle=`rgba(56,210,247,${.14*(1-d/140)})`; ctx.lineWidth=.7; ctx.stroke()
            }
          }
          const p=(Math.sin(state.nodes[i].pulse)+1)/2
          ctx.beginPath(); ctx.arc(state.nodes[i].x,state.nodes[i].y,1.8+p*1.8,0,Math.PI*2)
          ctx.fillStyle=`rgba(56,210,247,${.3+p*.35})`; ctx.fill()
        }
      }

      raf = requestAnimationFrame(draw)
    }

    resize()
    raf = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [variant])
}

function AnimatedBackground({ variant = 'home' }) {
  const canvasRef = useRef(null)
  const cfg = BG_CONFIG[variant] || BG_CONFIG.home

  useCanvas(canvasRef, variant)

  return (
    <div style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none', overflow:'hidden' }}>

      {/* 1 — Photo with Ken Burns */}
      <div style={{
        position:'absolute', inset:'-10%',
        backgroundImage:`url(${cfg.src})`,
        backgroundSize:'cover',
        backgroundPosition:'center',
        animation:`kb-${cfg.ken} 24s ease-in-out infinite alternate`,
        willChange:'transform',
      }} />

      {/* 2 — Heavy dark base scrim — this is the key fix */}
      <div style={{
        position:'absolute', inset:0,
        background:'rgba(3,7,18,0.82)',
      }} />

      {/* 3 — Bottom gradient: content areas get extra darkening */}
      <div style={{
        position:'absolute', inset:0,
        background:'linear-gradient(to bottom, rgba(3,7,18,0.5) 0%, rgba(3,7,18,0.75) 50%, rgba(3,7,18,0.95) 100%)',
      }} />

      {/* 4 — Edge vignette */}
      <div style={{
        position:'absolute', inset:0,
        background:'radial-gradient(ellipse 90% 80% at 50% 40%, transparent 30%, rgba(3,7,18,0.6) 100%)',
      }} />

      {/* 5 — Subtle photo bleed through — visible but never overpowering */}
      <div style={{
        position:'absolute', inset:'-10%',
        backgroundImage:`url(${cfg.src})`,
        backgroundSize:'cover',
        backgroundPosition:'center',
        animation:`kb-${cfg.ken} 24s ease-in-out infinite alternate`,
        willChange:'transform',
        opacity:0.06,
        mixBlendMode:'luminosity',
      }} />

      {/* 6 — Canvas particles/waves (subtle) */}
      <canvas ref={canvasRef} style={{
        position:'absolute', inset:0,
        width:'100%', height:'100%',
        opacity:0.7,
      }} />
    </div>
  )
}

export default memo(AnimatedBackground)
