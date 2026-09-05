'use client'

import * as THREE from 'three'
import { Suspense, useCallback, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { ContactShadows, Environment, Lightformer, OrbitControls } from '@react-three/drei'
import { CaeliaModel } from './caelia-model'
import type { CaeliaVariant } from '@/lib/caelia/variants'

const STUDIO = '#f7f1ea'

/** Keeps the scene on a flat color even if Environment tries to set a map. */
function PlainBackground() {
  const scene = useThree((s) => s.scene)
  const gl = useThree((s) => s.gl)

  useEffect(() => {
    const color = new THREE.Color(STUDIO)
    scene.background = color
    gl.setClearColor(color, 1)
  }, [scene, gl])

  return <color attach="background" args={[STUDIO]} />
}

/** Registers a snapshot function that captures the WebGL canvas as PNG. */
function SnapshotBinder({ bind }: { bind: (fn: () => string) => void }) {
  const gl = useThree((s) => s.gl)
  const scene = useThree((s) => s.scene)
  const camera = useThree((s) => s.camera)

  useEffect(() => {
    bind(() => {
      gl.render(scene, camera)
      return gl.domElement.toDataURL('image/png')
    })
  }, [gl, scene, camera, bind])

  return null
}

/** Keeps the spin target in sync with the selected view (shortest path). */
export interface CaeliaViewerProps {
  variant: CaeliaVariant
  view: 'mirror' | 'pocket'
  autoRotate: boolean
  onSnapshotReady: (fn: (() => string) | null) => void
}

export default function CaeliaViewer({
  variant,
  view,
  autoRotate,
  onSnapshotReady,
}: CaeliaViewerProps) {
  const bind = useCallback(
    (fn: () => string) => onSnapshotReady(fn),
    [onSnapshotReady],
  )

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [1.5, 0.6, 4.4], fov: 30 }}
      gl={{ antialias: true, alpha: false }}
      style={{ background: STUDIO }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.toneMappingExposure = 1.0
        gl.setClearColor(STUDIO, 1)
      }}
      className="!absolute inset-0"
      aria-label="Visualizzazione 3D interattiva del set CAELIA"
    >
      <PlainBackground />
      <ambientLight intensity={0.3} />
      <directionalLight position={[3.5, 4, 5]} intensity={0.85} />
      <directionalLight position={[-4, 2, -3]} intensity={0.3} />

      {/* Lighting only — no HDR / no visible environment map */}
      <Environment background={false} resolution={256} frames={1}>
        <Lightformer intensity={5} position={[0, 5, 0]} rotation-x={Math.PI / 2} scale={[9, 9, 1]} />
        <Lightformer intensity={6} position={[-5, 1.5, 1]} rotation-y={Math.PI / 2} scale={[6, 2.4, 1]} />
        <Lightformer intensity={6} position={[5, 1.5, 1]} rotation-y={-Math.PI / 2} scale={[6, 2.4, 1]} />
        <Lightformer intensity={2} position={[0, 2, 5]} scale={[8, 3, 1]} />
        <Lightformer intensity={0.4} position={[0, 1, -5]} rotation-y={Math.PI} scale={[8, 3, 1]} />
      </Environment>

      <Suspense fallback={null}>
        <CaeliaModel variant={variant} view={view} autoRotate={autoRotate} />
      </Suspense>

      <ContactShadows
        position={[0, -1.2, 0]}
        opacity={0.42}
        scale={6}
        blur={2.6}
        far={2.6}
        resolution={512}
        color="#41301f"
      />

      <OrbitControls
        makeDefault
        enablePan={false}
        minDistance={2.1}
        maxDistance={6.5}
        minPolarAngle={0.45}
        maxPolarAngle={2.45}
        enableDamping
        dampingFactor={0.08}
      />

      <SnapshotBinder bind={bind} />
    </Canvas>
  )
}
