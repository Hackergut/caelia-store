import * as THREE from 'three'

/** Product proportions (world units — 1 unit ≈ 10 cm) */
export const CASE = {
  width: 1.0,
  height: 2.15,
  thickness: 0.05,
  /** generous corner rounding of the silhouette (plan view) */
  cornerR: 0.22,
  /** bevel rounding between the flat faces and the side walls */
  edgeR: 0.015,
} as const

/**
 * Mirror window on the front face. The bezel outer contour echoes the case
 * silhouette: inset 0.015 from the flat face edge, corner radius concentric
 * with the case corner (CASE.cornerR − edge inset).
 */
export const MIRROR = {
  frameW: 0.94,
  frameH: 2.08,
  frameR: 0.185,
  glassW: 0.72,
  glassH: 1.74,
  glassR: 0.1,
} as const

/**
 * Front pocket on the back face (pencil-case side).
 * Reference-accurate: the pocket spans nearly the full case width — its
 * side/bottom edges are caught in the perimeter seam, exactly like the
 * product photos (single stitch line runs over the pocket near the edges).
 */
export const POCKET = {
  halfW: 0.475,
  topY: 0.6,
  topDip: 0.014, // almost straight opening, hairline sag in the middle
  bottomY: -1.045,
  topCornerR: 0.05,
  /** bottom corners follow the case silhouette (inside CASE.cornerR curve) */
  botCornerR: 0.24,
} as const

/** Perimeter seam stitch loop (inset from the case silhouette) */
export const PERIMETER_STITCH = {
  halfW: 0.45,
  halfH: 1.015,
  /** concentric with the case corner: CASE.cornerR + edge inset (0.05) */
  cornerR: 0.27,
  /** y where the seam changes layer (above: back panel, below: pocket) */
  splitY: 0.62,
} as const

/**
 * Case body silhouette, drawn pre-bevel so the extrusion (shape offset
 * outward by `edgeR` at the mid-plane) lands exactly on CASE.width/height
 * with CASE.cornerR corners.
 */
export function caseBodyShape(): THREE.Shape {
  const b = CASE.edgeR
  return roundedRectShape(CASE.width - 2 * b, CASE.height - 2 * b, CASE.cornerR - b)
}

/**
 * Rounded-rectangle THREE.Shape.
 */
export function roundedRectShape(w: number, h: number, r: number): THREE.Shape {
  const s = new THREE.Shape()
  const hw = w / 2
  const hh = h / 2
  s.moveTo(-hw + r, hh)
  s.lineTo(hw - r, hh)
  s.quadraticCurveTo(hw, hh, hw, hh - r)
  s.lineTo(hw, -hh + r)
  s.quadraticCurveTo(hw, -hh, hw - r, -hh)
  s.lineTo(-hw + r, -hh)
  s.quadraticCurveTo(-hw, -hh, -hw, -hh + r)
  s.lineTo(-hw, hh - r)
  s.quadraticCurveTo(-hw, hh, -hw + r, hh)
  return s
}

/**
 * Frame shape (rounded rect with rounded-rect hole) for the mirror bezel —
 * soft corners concentric with the case silhouette.
 */
export function mirrorFrameShape(): THREE.Shape {
  const outer = roundedRectShape(MIRROR.frameW, MIRROR.frameH, MIRROR.frameR)
  const hole = roundedRectShape(MIRROR.glassW, MIRROR.glassH, MIRROR.glassR)
  outer.holes.push(hole)
  return outer
}

/**
 * Pocket silhouette. `inset` shrinks the outline (kept for API symmetry).
 * Straight-ish top edge with softly rounded top corners; the bottom follows
 * the case silhouette down into the perimeter seam.
 */
export function pocketShape(inset = 0): THREE.Shape {
  const s = new THREE.Shape()
  const hw = POCKET.halfW - inset
  const top = POCKET.topY - inset * 0.8
  const bottom = POCKET.bottomY + inset
  const rt = Math.max(POCKET.topCornerR - inset, 0.01)
  const rb = Math.max(POCKET.botCornerR - inset, 0.01)
  const dip = POCKET.topDip
  s.moveTo(-hw + rt, top)
  // top opening — nearly straight, tiny sag (quadratic midpoint = top - dip)
  s.quadraticCurveTo(0, top - dip * 2, hw - rt, top)
  s.quadraticCurveTo(hw, top, hw, top - rt)
  s.lineTo(hw, bottom + rb)
  s.quadraticCurveTo(hw, bottom, hw - rb, bottom)
  s.lineTo(-hw + rb, bottom)
  s.quadraticCurveTo(-hw, bottom, -hw, bottom + rb)
  s.lineTo(-hw, top - rt)
  s.quadraticCurveTo(-hw, top, -hw + rt, top)
  return s
}

/** Closed loop of 2D points from a shape (last duplicated point removed). */
export function shapeLoopPoints(shape: THREE.Shape, divisions = 48): [number, number][] {
  const pts = shape.getPoints(divisions)
  const loop: [number, number][] = pts.map((p) => [p.x, p.y])
  // drop the duplicated closing point — drei <Line closed> handles the seam
  if (loop.length > 1) {
    const [fx, fy] = loop[0]
    const [lx, ly] = loop[loop.length - 1]
    if (Math.abs(fx - lx) < 1e-6 && Math.abs(fy - ly) < 1e-6) loop.pop()
  }
  return loop
}

/**
 * Horizontal fold stitch under the pocket opening — runs edge-to-edge
 * between the perimeter seam lines, mirroring the opening's hairline sag.
 */
export function pocketTopStitch(gapBelowLip = 0.085, inset = 0.035): [number, number][] {
  const hw = POCKET.halfW - inset
  const y = POCKET.topY - gapBelowLip
  const N = 24
  const pts: [number, number][] = []
  for (let i = 0; i <= N; i++) {
    const t = i / N
    const x = -hw + (2 * hw) * t
    const py = y - POCKET.topDip * (1 - (2 * t - 1) ** 2)
    pts.push([x, py])
  }
  return pts
}

/**
 * Split a closed loop into two open arcs at a given y — used by the
 * perimeter seam, which lies on the back panel above the pocket and on
 * the pocket leather below it (two physically different depths).
 */
export function splitLoopAtY(
  points: [number, number][],
  ySplit: number,
): { upper: [number, number][]; lower: [number, number][] } {
  const n = points.length
  const crossings: number[] = []
  for (let i = 0; i < n; i++) {
    const a = points[i]
    const b = points[(i + 1) % n]
    if ((a[1] - ySplit) * (b[1] - ySplit) < 0) crossings.push(i)
  }
  if (crossings.length < 2) return { upper: points, lower: [] }

  const [c1, c2] = crossings
  const bridge = (i: number): [number, number] => {
    const p = points[i % n]
    const q = points[(i + 1) % n]
    const t = (ySplit - p[1]) / (q[1] - p[1])
    return [p[0] + (q[0] - p[0]) * t, ySplit]
  }

  // walk c1+1 → c2 (through the bottom) = lower arc on the pocket face
  const lower: [number, number][] = [bridge(c1)]
  for (let i = c1 + 1; i <= c2; i++) lower.push(points[i])
  lower.push(bridge(c2))

  // walk c2+1 → c1 (through the top) = upper arc on the back panel
  const upper: [number, number][] = [bridge(c2)]
  for (let i = c2 + 1; i <= c2 + n; i++) {
    const idx = i % n
    upper.push(points[idx])
    if (idx === c1) break
  }
  upper.push(bridge(c1))

  return { upper, lower }
}
