'use client'

import { useEffect, useRef } from 'react'

type FormKind = 'oct' | 'ico' | 'knot'
type AtmKind = 'sparse' | 'balanced' | 'dense'

interface ThreeSceneProps {
  rotationSpeed?: number
  mood?: number        // 0..1
  form?: FormKind
  atmosphere?: AtmKind
  className?: string
}

const ATM_PROFILES = {
  sparse:   { count: 6,  rMin: 3.0, rMax: 4.4, ySpread: 0.6 },
  balanced: { count: 14, rMin: 2.6, rMax: 4.2, ySpread: 0.9 },
  dense:    { count: 28, rMin: 2.2, rMax: 5.0, ySpread: 1.3 },
}

export function ThreeScene({
  rotationSpeed = 3,
  mood = 0.5,
  form = 'oct',
  atmosphere = 'balanced',
  className,
}: ThreeSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // Use refs so the animation loop reads the latest values without re-init
  const propsRef = useRef({ rotationSpeed, mood, form, atmosphere })
  propsRef.current = { rotationSpeed, mood, form, atmosphere }

  // Track what's currently built so we can detect changes
  const builtRef = useRef({ form: 'oct' as FormKind, atmosphere: 'balanced' as AtmKind })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let animId: number
    let disposed = false

    async function init() {
      const THREE = await import('three')
      if (disposed || !canvas) return

      const renderer = new THREE.WebGLRenderer({ canvas: canvas as HTMLCanvasElement, antialias: true, alpha: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
      camera.position.set(0, 0, 6)

      function resize() {
        if (!canvas) return
        const w = (canvas as HTMLCanvasElement).clientWidth
        const h = (canvas as HTMLCanvasElement).clientHeight
        renderer.setSize(w, h, false)
        camera.aspect = w / h
        camera.updateProjectionMatrix()
      }
      const ro = new ResizeObserver(resize)
      ro.observe(canvas as HTMLCanvasElement)
      resize()

      // Lights — matching design-ref exactly
      scene.add(new THREE.AmbientLight(0xffffff, 0.45))
      const key = new THREE.DirectionalLight(0xffffff, 0.85)
      key.position.set(3, 4, 5)
      scene.add(key)
      const rim = new THREE.DirectionalLight(0xCC785C, 0.3)
      rim.position.set(-4, -2, -3)
      scene.add(rim)

      function readAccent() {
        const cs = getComputedStyle(document.documentElement)
        const h = parseFloat(cs.getPropertyValue('--color-accent-h')) || 17
        const c = new THREE.Color()
        c.setHSL(h / 360, 0.48, 0.58)
        return c
      }

      // Central form
      function buildGeometry(kind: FormKind) {
        if (kind === 'ico') return new THREE.IcosahedronGeometry(1.35, 0)
        if (kind === 'knot') return new THREE.TorusKnotGeometry(0.95, 0.32, 90, 14)
        return new THREE.OctahedronGeometry(1.4, 0)
      }

      const octMat = new THREE.MeshStandardMaterial({
        color: 0xE4E2DB,
        flatShading: true,
        roughness: 0.55,
        metalness: 0.05,
      })
      const oct = new THREE.Mesh(buildGeometry(propsRef.current.form), octMat)
      scene.add(oct)

      let edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(oct.geometry),
        new THREE.LineBasicMaterial({ color: readAccent(), transparent: true, opacity: 0.85 })
      )
      oct.add(edges)

      function rebuildForm(kind: FormKind) {
        oct.geometry.dispose()
        oct.geometry = buildGeometry(kind)
        oct.remove(edges)
        edges.geometry.dispose()
        edges = new THREE.LineSegments(
          new THREE.EdgesGeometry(oct.geometry),
          new THREE.LineBasicMaterial({ color: readAccent(), transparent: true, opacity: 0.85 })
        )
        oct.add(edges)
        builtRef.current.form = kind
      }

      // Floating triangles
      const triGroup = new THREE.Group()
      scene.add(triGroup)
      type TriData = { mesh: import('three').Mesh; baseTheta: number; r: number; phi: number }
      let triData: TriData[] = []

      function buildTriangles(profileKey: AtmKind) {
        const profile = ATM_PROFILES[profileKey]
        triData.forEach(d => {
          d.mesh.geometry.dispose()
          ;(d.mesh.material as import('three').Material).dispose()
        })
        triGroup.clear()
        triData = []
        for (let i = 0; i < profile.count; i++) {
          const geo = new THREE.TetrahedronGeometry(0.16 + Math.random() * 0.20, 0)
          const mat = new THREE.MeshStandardMaterial({
            color: i % 3 === 0 ? readAccent() : new THREE.Color(0xC9C5BB),
            flatShading: true,
            roughness: 0.7,
            metalness: 0.0,
            transparent: true,
            opacity: i % 3 === 0 ? 0.35 : 0.55,
          })
          const m = new THREE.Mesh(geo, mat)
          const r = profile.rMin + Math.random() * (profile.rMax - profile.rMin)
          const theta = Math.random() * Math.PI * 2
          const phi = (Math.random() - 0.5) * profile.ySpread
          m.position.set(Math.cos(theta) * r, Math.sin(phi) * 1.6, Math.sin(theta) * r)
          m.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)
          triData.push({ mesh: m, baseTheta: theta, r, phi })
          triGroup.add(m)
        }
        builtRef.current.atmosphere = profileKey
      }

      buildTriangles(propsRef.current.atmosphere)

      let lastT = performance.now()

      function frame(t: number) {
        if (disposed) return
        const dt = Math.min((t - lastT) / 1000, 0.1)
        lastT = t

        const { rotationSpeed: spd, mood: m, form: f, atmosphere: a } = propsRef.current

        // Rebuild form/atmosphere if props changed
        if (f !== builtRef.current.form) rebuildForm(f)
        if (a !== builtRef.current.atmosphere) buildTriangles(a)

        const moodMul = 0.4 + m * 2.2
        const baseDeg = 0.3 * spd * moodMul
        const radPerSec = (baseDeg * Math.PI) / 180
        const delta = radPerSec * dt

        oct.rotation.y += delta
        oct.rotation.x += delta * 0.4

        const bob = m * 0.015
        triData.forEach((d, i) => {
          const dr = delta * (0.6 + (i % 5) * 0.08)
          d.baseTheta += dr
          d.mesh.position.x = Math.cos(d.baseTheta) * d.r
          d.mesh.position.z = Math.sin(d.baseTheta) * d.r
          d.mesh.position.y += Math.sin(t * 0.001 + i) * bob
          d.mesh.rotation.x += delta * 0.5
          d.mesh.rotation.y += delta * 0.3
        })

        renderer.render(scene, camera)
        animId = requestAnimationFrame(frame)
      }

      animId = requestAnimationFrame(frame)

      return () => {
        ro.disconnect()
        renderer.dispose()
        octMat.dispose()
        edges.geometry.dispose()
        ;(edges.material as import('three').Material).dispose()
      }
    }

    const cleanupPromise = init()

    return () => {
      disposed = true
      cancelAnimationFrame(animId)
      cleanupPromise.then(fn => fn?.())
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  )
}
