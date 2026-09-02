'use client'

import * as THREE from 'three'
import { useMemo, useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import type { Line2 } from 'three-stdlib'
import {
  CASE,
  MIRROR,
  PERIMETER_STITCH,
  caseBodyShape,
  roundedRectShape,
  mirrorFrameShape,
  pocketShape,
  shapeLoopPoints,
  pocketTopStitch,
  splitLoopAtY,
} from '@/lib/caelia/geometry'
import { makeLeatherBumpTexture, makeLogoTexture, makeMirrorGradientTexture } from '@/lib/caelia/textures'
import type { CaeliaVariant } from '@/lib/caelia/variants'

export interface SpinState {
  target: number
}

interface CaeliaModelProps {
  variant: CaeliaVariant
  view: 'mirror' | 'pocket'
  autoRotate: boolean
}

/** Shortest signed delta between two angles (radians). */
function shortestDelta(current: number, desired: number): number {
  const twoPi = Math.PI * 2
  return ((((desired - current) % twoPi) + twoPi + Math.PI) % twoPi) - Math.PI
}

/* ------------------------------------------------------------------ */
/*  Stitched dashed line that smoothly transitions its thread color   */
/* ------------------------------------------------------------------ */
function StitchLine({
  points,
  z,
  closed = true,
  targetColor,
  width = 1.8,
  dashSize = 0.022,
  gapSize = 0.017,
}: {
  points: [number, number][]
  z: number
  closed?: boolean
  targetColor: THREE.Color
  width?: number
  dashSize?: number
  gapSize?: number
}) {
  const ref = useRef<Line2>(null)

  useFrame((_, delta) => {
    const mat = ref.current?.material as THREE.LineBasicMaterial | undefined
    if (mat && 'color' in mat) {
      mat.color.lerp(targetColor, 1 - Math.exp(-6 * Math.min(delta, 0.15)))
    }
  })

  // drei <Line> v10+ has no `closed` prop — emulate by appending the first
  // point to the end of the array when the loop should close.
  const linePoints = closed
    ? [...points, points[0]]
    : points
  return (
    <Line
      ref={ref}
      points={linePoints.map((p) => [p[0], p[1], z] as [number, number, number])}
      lineWidth={width}
      dashed
      dashSize={dashSize}
      gapSize={gapSize}
      transparent
      opacity={0.96}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  The CAELIA product: mirror on one side, pencil pocket on the other */
/* ------------------------------------------------------------------ */
export function CaeliaModel({ variant, view, autoRotate }: CaeliaModelProps) {
  const group = useRef<THREE.Group>(null)
  const intro = useRef(0)
  const targetY = useRef(0.45)

  /* when the requested view changes, rotate along the shortest path */
  useEffect(() => {
    const desired = view === 'mirror' ? 0 : Math.PI
    targetY.current += shortestDelta(targetY.current, desired)
  }, [view])

  /* ---------------- shared leather material ---------------- */
  const bumpTex = useMemo(() => makeLeatherBumpTexture(), [])
  const leatherMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        // neutral start — useFrame continuously lerps toward the active variant
        color: new THREE.Color('#8d8d8d'),
        roughness: 0.55,
        metalness: 0.02,
        sheen: 0.25,
        sheenRoughness: 0.6,
        sheenColor: new THREE.Color('#ffffff'),
        clearcoat: 0.08,
        clearcoatRoughness: 0.55,
        bumpMap: bumpTex,
        bumpScale: 0.9,
        envMapIntensity: 0.45,
      }),
    [bumpTex],
  )

  /* ---------------- mirror glass material ---------------- */
  const gradientTex = useMemo(() => makeMirrorGradientTexture(), [])
  const glassMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: gradientTex,
        color: '#ffffff',
        metalness: 0.85,
        roughness: 0.06,
        envMapIntensity: 1.2,
      }),
    [gradientTex],
  )

  /* ---------------- animated color targets ---------------- */
  const targets = useMemo(
    () => ({
      leather: new THREE.Color(variant.base),
      sheen: new THREE.Color(variant.sheen),
      stitch: new THREE.Color(variant.stitch),
    }),
    [variant.base, variant.sheen, variant.stitch],
  )

  const logoTex = useMemo(() => makeLogoTexture(variant.dark), [variant.dark])
  useEffect(() => () => logoTex.dispose(), [logoTex])

  /* dispose leather material on unmount */
  useEffect(() => () => leatherMat.dispose(), [leatherMat])

  /* ---------------- geometries ---------------- */
  /*
   * Body: extruded silhouette with generously rounded corners and a soft
   * bevel between faces and side walls. Drawn pre-bevel so the mid-plane
   * lands exactly on CASE.width × CASE.height × CASE.thickness.
   */
  const caseGeo = useMemo(() => {
    const g = new THREE.ExtrudeGeometry(caseBodyShape(), {
      depth: CASE.thickness - 2 * CASE.edgeR,
      bevelEnabled: true,
      bevelThickness: CASE.edgeR,
      bevelSize: CASE.edgeR,
      bevelSegments: 5,
      curveSegments: 48,
    })
    return g
  }, [])

  const frameGeo = useMemo(() => {
    const g = new THREE.ExtrudeGeometry(mirrorFrameShape(), {
      depth: 0.008,
      bevelEnabled: true,
      bevelThickness: 0.004,
      bevelSize: 0.005,
      bevelSegments: 3,
      curveSegments: 24,
    })
    return g
  }, [])

  const glassGeo = useMemo(
    () => new THREE.ShapeGeometry(roundedRectShape(MIRROR.glassW, MIRROR.glassH, MIRROR.glassR), 24),
    [],
  )

  const pocketGeo = useMemo(() => {
    const g = new THREE.ExtrudeGeometry(pocketShape(0), {
      depth: 0.01,
      bevelEnabled: true,
      bevelThickness: 0.003,
      bevelSize: 0.003,
      bevelSegments: 2,
      curveSegments: 28,
    })
    return g
  }, [])

  useEffect(
    () => () => {
      caseGeo.dispose()
      frameGeo.dispose()
      glassGeo.dispose()
      pocketGeo.dispose()
    },
    [caseGeo, frameGeo, glassGeo, pocketGeo],
  )

  /* ---------------- stitch paths ---------------- */
  const stitches = useMemo(() => {
    /*
     * Reference construction: ONE perimeter seam runs around the whole
     * case. Above the pocket it sits on the back panel; below, the pocket
     * leather is caught in the same seam, so the stitch lies on the pocket.
     * The loop is therefore split at splitY into two arcs at two depths.
     */
    const perim = shapeLoopPoints(
      roundedRectShape(PERIMETER_STITCH.halfW * 2, PERIMETER_STITCH.halfH * 2, PERIMETER_STITCH.cornerR),
      64,
    )
    const { upper: perimUpper, lower: perimLower } = splitLoopAtY(perim, PERIMETER_STITCH.splitY)
    const aroundWindow = shapeLoopPoints(
      roundedRectShape(MIRROR.glassW + 0.07, MIRROR.glassH + 0.07, MIRROR.glassR + 0.035),
      48,
    )
    const pocketTop = pocketTopStitch()
    return { perim, perimUpper, perimLower, aroundWindow, pocketTop }
  }, [])

  /* ---------------- animation ---------------- */
  useFrame((state, delta) => {
    // cap dt so long frame gaps can't tunnel — still converges fast at low FPS
    const d = Math.min(delta, 0.15)

    // intro pop
    if (intro.current < 1) {
      intro.current = Math.min(intro.current + d * 1.4, 1)
      const e = 1 - Math.pow(1 - intro.current, 3)
      if (group.current) {
        group.current.scale.setScalar(0.9 + 0.1 * e)
      }
    }

    // rotation (auto-rotate + eased target)
    if (autoRotate) {
      targetY.current += d * 0.5
    }
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.damp(
        group.current.rotation.y,
        targetY.current,
        4,
        d,
      )
      // gentle idle float
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.9) * 0.012
    }

    // color transitions
    const k = 1 - Math.exp(-5 * d)
    leatherMat.color.lerp(targets.leather, k)
    leatherMat.sheenColor.lerp(targets.sheen, k)
  })

  return (
    <group ref={group} rotation={[0, 0.45, 0]} scale={0.9}>
      {/* ================= body ================= */}
      <mesh
        geometry={caseGeo}
        material={leatherMat}
        position={[0, 0, -(CASE.thickness / 2 - CASE.edgeR)]}
      />

      {/* ================= MIRROR SIDE (+Z) ================= */}
      {/* glass */}
      <mesh geometry={glassGeo} material={glassMat} position={[0, 0, 0.028]} />
      {/* leather bezel around the mirror */}
      <mesh geometry={frameGeo} material={leatherMat} position={[0, 0, 0.029]} />
      {/* full perimeter seam + stitching around the mirror window */}
      <StitchLine points={stitches.perim} z={0.043} targetColor={targets.stitch} />
      <StitchLine points={stitches.aroundWindow} z={0.043} targetColor={targets.stitch} />

      {/* ================= PENCIL-CASE SIDE (−Z) ================= */}
      {/* front pocket — nearly full width, edges caught in the perimeter seam */}
      <mesh geometry={pocketGeo} material={leatherMat} position={[0, 0, -0.027]} rotation={[0, Math.PI, 0]} />
      {/* perimeter seam, upper arc — lies on the back panel above the pocket */}
      <StitchLine
        points={stitches.perimUpper}
        z={-0.028}
        closed={false}
        targetColor={targets.stitch}
      />
      {/* perimeter seam, lower arc — lies on the pocket leather */}
      <StitchLine
        points={stitches.perimLower}
        z={-0.0425}
        closed={false}
        targetColor={targets.stitch}
      />
      {/* fold stitch under the pocket opening */}
      <StitchLine
        points={stitches.pocketTop}
        z={-0.0425}
        closed={false}
        targetColor={targets.stitch}
      />

      {/* debossed CAELIA logo — low center of the pocket, small like the refs */}
      <mesh position={[0, -0.84, -0.0445]} rotation={[0, Math.PI, 0]} renderOrder={2}>
        <planeGeometry args={[0.34, 0.085]} />
        <meshBasicMaterial
          map={logoTex}
          transparent
          opacity={0.85}
          depthWrite={false}
          polygonOffset
          polygonOffsetFactor={-2}
        />
      </mesh>
    </group>
  )
}
