import * as THREE from 'three'

/**
 * Procedural leather-grain bump map — fine pebbled grain like the macro
 * reference: per-pixel speckle + thousands of soft pebble domes + pores.
 */
export function makeLeatherBumpTexture(): THREE.CanvasTexture {
  const size = 1024
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!

  // mid-gray base
  ctx.fillStyle = '#808080'
  ctx.fillRect(0, 0, size, size)

  // fine grain speckle
  const imageData = ctx.getImageData(0, 0, size, size)
  const d = imageData.data
  for (let i = 0; i < d.length; i += 4) {
    const n = (Math.random() - 0.5) * 30
    d[i] = Math.max(0, Math.min(255, 128 + n))
    d[i + 1] = d[i]
    d[i + 2] = d[i]
  }
  ctx.putImageData(imageData, 0, 0)

  // pebbled grain: overlapping soft domes (light crest + shaded rim)
  const pebbles = 2600
  for (let i = 0; i < pebbles; i++) {
    const x = Math.random() * size
    const y = Math.random() * size
    const r = 2.5 + Math.random() * 5.5
    const g = ctx.createRadialGradient(x - r * 0.25, y - r * 0.25, r * 0.1, x, y, r)
    const lift = 14 + Math.random() * 16
    g.addColorStop(0, `rgba(255,255,255,${(lift / 255).toFixed(3)})`)
    g.addColorStop(0.72, 'rgba(128,128,128,0.05)')
    g.addColorStop(1, `rgba(0,0,0,${(lift / 300).toFixed(3)})`)
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }

  // pores / creases: short fine strokes
  ctx.lineWidth = 1
  for (let i = 0; i < 1400; i++) {
    const x = Math.random() * size
    const y = Math.random() * size
    const a = Math.random() * Math.PI
    const l = 2 + Math.random() * 5
    ctx.strokeStyle = Math.random() > 0.5 ? 'rgba(45,45,45,0.28)' : 'rgba(215,215,215,0.24)'
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l)
    ctx.stroke()
  }

  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = THREE.RepeatWrapping
  tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(3, 3)
  tex.anisotropy = 8
  return tex
}

/**
 * Soft vertical gradient for the mirror glass — mimics the studio-photo
 * look of the reference images (bright top, deeper middle, light bottom).
 */
export function makeMirrorGradientTexture(): THREE.CanvasTexture {
  const w = 256
  const h = 512
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!

  const g = ctx.createLinearGradient(0, 0, 0, h)
  g.addColorStop(0, '#f7f8f9')
  g.addColorStop(0.3, '#dfe2e4')
  g.addColorStop(0.55, '#c7cbce')
  g.addColorStop(0.78, '#dde0e2')
  g.addColorStop(1, '#f2f3f4')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, w, h)

  // subtle diagonal sheen band
  const s = ctx.createLinearGradient(0, 0, w, h)
  s.addColorStop(0.25, 'rgba(255,255,255,0)')
  s.addColorStop(0.5, 'rgba(255,255,255,0.18)')
  s.addColorStop(0.75, 'rgba(255,255,255,0)')
  ctx.fillStyle = s
  ctx.fillRect(0, 0, w, h)

  const tex = new THREE.CanvasTexture(canvas)
  tex.anisotropy = 8
  return tex
}

/**
 * "CAELIA" debossed logo drawn on a transparent canvas — letterpress look
 * like the macro reference: a soft light rim peeks BELOW each glyph
 * (recess catching the light) under the dark pressed text.
 */
export function makeLogoTexture(dark: string): THREE.CanvasTexture {
  const w = 1024
  const h = 256
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!

  const text = 'CAELIA'
  const fontSize = 120
  const gap = 26
  ctx.font = `500 ${fontSize}px Arial, Helvetica, sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  // measure total width with letterspacing
  ctx.fillStyle = dark
  const widths = [...text].map((ch) => ctx.measureText(ch).width)
  const total = widths.reduce((a, b) => a + b, 0) + gap * (text.length - 1)

  const drawLine = (dy: number, color: string) => {
    ctx.fillStyle = color
    let x = w / 2 - total / 2
    for (let i = 0; i < text.length; i++) {
      ctx.fillText(text[i], x + widths[i] / 2, h / 2 + dy)
      x += widths[i] + gap
    }
  }

  // light rim below (recess highlight), then the dark pressed text
  drawLine(3, 'rgba(255,246,238,0.42)')
  drawLine(0, dark)

  const tex = new THREE.CanvasTexture(canvas)
  tex.anisotropy = 8
  return tex
}
