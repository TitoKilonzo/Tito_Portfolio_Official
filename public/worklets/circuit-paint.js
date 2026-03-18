/**
 * CSS Houdini Paint Worklet — Circuit Board Pattern
 * Registered as 'circuit-board' and used via CSS paint() function
 */
registerPaint('circuit-board', class {
  static get inputProperties() {
    return ['--circuit-color', '--circuit-opacity', '--circuit-density']
  }

  paint(ctx, size, props) {
    const color   = props.get('--circuit-color')   || '#00ff88'
    const opacity = parseFloat(props.get('--circuit-opacity') || 0.08)
    const density = parseInt(props.get('--circuit-density')   || 40)

    ctx.strokeStyle = color.toString()
    ctx.globalAlpha = opacity
    ctx.lineWidth   = 0.8

    const cols = Math.floor(size.width  / density)
    const rows = Math.floor(size.height / density)

    for (let c = 0; c <= cols; c++) {
      for (let r = 0; r <= rows; r++) {
        const x = c * density
        const y = r * density
        const dir = Math.random()

        ctx.beginPath()
        if (dir < 0.5) {
          ctx.moveTo(x, y)
          ctx.lineTo(x + density, y)
          if (Math.random() > 0.7) {
            ctx.moveTo(x, y)
            ctx.lineTo(x, y + density)
          }
        } else {
          ctx.moveTo(x, y)
          ctx.lineTo(x, y + density)
          if (Math.random() > 0.7) {
            ctx.moveTo(x, y)
            ctx.lineTo(x + density, y)
          }
        }
        ctx.stroke()

        // Node dots at intersections
        if (Math.random() > 0.8) {
          ctx.fillStyle = color.toString()
          ctx.globalAlpha = opacity * 1.5
          ctx.beginPath()
          ctx.arc(x, y, 2, 0, Math.PI * 2)
          ctx.fill()
          ctx.globalAlpha = opacity
        }
      }
    }
  }
})
