<!-- import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

interface PropiedadesLienzo {
  alCargar: () => void
  referenciaBurbuja: React.RefObject<HTMLDivElement | null>
}

export const OrbitLienzo: React.FC<PropiedadesLienzo> = ({ alCargar, referenciaBurbuja }) => {
  const referenciaContenedor = useRef<HTMLDivElement>(null)

  // Referencias internas de THREE
  const e = useRef({
    escena: new THREE.Scene(),
    camara: new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100),
    renderizador: new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' }),
    objetoPrincipal: null as THREE.Group | null,
    satelites: null as THREE.Points | null,
    luzMouse: null as THREE.PointLight | null,
    mouseNDC: new THREE.Vector2(0, 0), // Centramos para evitar el giro loco al cargar
    mouseGlobal: new THREE.Vector3(0, 0, 0),
    reloj: new THREE.Clock(),
    idRaf: 0,
    raycaster: new THREE.Raycaster(),
    plano: new THREE.Plane(new THREE.Vector3(0, 0, 1), 0),
    interaccionActiva: false, // Flag para saber si hay un toque real en móvil
    uniformesMat: {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector3(99, 99, 99) } // Fuera de escena al inicio
    }
  })

  // Vector estático para reutilizar y evitar sobrecargar el recolector de basura (GC)
  const _v3 = new THREE.Vector3()

  useEffect(() => {
    if (!referenciaContenedor.current) return
    const { escena, camara, renderizador } = e.current

    renderizador.setSize(window.innerWidth, window.innerHeight)
    renderizador.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    referenciaContenedor.current.appendChild(renderizador.domElement)
    camara.position.z = 10

    // Configuración de Iluminación
    escena.add(new THREE.AmbientLight(0xffffff, 0.4))
    const luzDir = new THREE.DirectionalLight(0xffffff, 1.2)
    luzDir.position.set(5, 5, 8)
    escena.add(luzDir)

    const luzPunto = new THREE.PointLight(0x00e5ff, 20, 10, 2)
    escena.add(luzPunto)
    e.current.luzMouse = luzPunto

    const luzContorno = new THREE.SpotLight(0x7c4dff, 50)
    luzContorno.position.set(-5, 5, -5)
    escena.add(luzContorno)

    escena.fog = new THREE.FogExp2(0x000000, 0.08)

    // Carga del Modelo 3D
    new GLTFLoader().load('/models/orbit-head.glb', (gltf) => {
      const caja = new THREE.Box3().setFromObject(gltf.scene)
      const centro = caja.getCenter(new THREE.Vector3())
      const tamano = caja.getSize(new THREE.Vector3())
      const dimMax = Math.max(tamano.x, tamano.y, tamano.z)

      // Normalización interna del modelo
      gltf.scene.position.sub(centro)
      gltf.scene.scale.set(1.0 / dimMax, 1.0 / dimMax, 1.0 / dimMax)

      // Contenedor para una animación fluida sin perder el centro
      const esMovil = window.innerWidth <= 768
      const contenedor = new THREE.Group()
      contenedor.add(gltf.scene)

      // Escala responsiva: más pequeña en móvil para dar aire
      const escalaFinal = esMovil ? 2.5 : 5.5
      contenedor.scale.set(escalaFinal, escalaFinal, escalaFinal)
      contenedor.rotation.y = -Math.PI / 2

      escena.add(contenedor)
      e.current.objetoPrincipal = contenedor

      // Inyección de Shaders (Brillo Neón y Glitch Digital)
      gltf.scene.traverse((hijo) => {
        if ((hijo as THREE.Mesh).isMesh) {
          const malla = hijo as THREE.Mesh
          if (malla.material) {
            const materiales = Array.isArray(malla.material) ? malla.material : [malla.material]
            materiales.forEach((mat) => {
              mat.onBeforeCompile = (shader) => {
                shader.uniforms.uTime = e.current.uniformesMat.uTime
                shader.uniforms.uMouse = e.current.uniformesMat.uMouse
                shader.vertexShader = `
                  uniform float uTime;
                  uniform vec3 uMouse;
                  varying float vDist;
                  ${shader.vertexShader}
                `
                shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', `
                  #include <begin_vertex>
                  vec4 pGlobal = modelMatrix * vec4(position, 1.0);
                  vDist = distance(pGlobal.xyz, uMouse);
                  float d = smoothstep(2.5, 0.0, vDist);
                  transformed += normal * (sin(uTime * 15.0 + vDist * 10.0) * 0.04 * d);
                  transformed += (uMouse - pGlobal.xyz) * 0.1 * d;
                `)
                shader.fragmentShader = `
                  varying float vDist;
                  ${shader.fragmentShader}
                `
                shader.fragmentShader = shader.fragmentShader.replace('#include <dithering_fragment>', `
                  #include <dithering_fragment>
                  float gBrillo = smoothstep(1.5, 0.0, vDist);
                  gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.0, 0.7, 1.0) * 2.5, gBrillo * 0.6);
                `)
              }
            })
          }
        }
      })

      alCargar()
    })
    const cantSat = 400
    const arrPosSat = new Float32Array(cantSat * 3)
    for (let i = 0; i < cantSat; i++) {
      const radio = 4.0 + Math.random() * 3.0
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arrPosSat[i * 3] = radio * Math.sin(phi) * Math.cos(theta)
      arrPosSat[i * 3 + 1] = radio * Math.sin(phi) * Math.sin(theta)
      arrPosSat[i * 3 + 2] = radio * Math.cos(phi)
    }
    const geoSat = new THREE.BufferGeometry()
    geoSat.setAttribute('position', new THREE.BufferAttribute(arrPosSat, 3))
    const satelites = new THREE.Points(geoSat, new THREE.PointsMaterial({ color: 0x66ccff, size: 0.03, transparent: true, opacity: 0.6 }))
    escena.add(satelites)
    e.current.satelites = satelites

    const redimensionar = () => {
      camara.aspect = window.innerWidth / window.innerHeight
      camara.updateProjectionMatrix()
      renderizador.setSize(window.innerWidth, window.innerHeight)
    }
    const alMoverMouse = (evento: MouseEvent) => {
      e.current.mouseNDC.x = (evento.clientX / window.innerWidth) * 2 - 1
      e.current.mouseNDC.y = -(evento.clientY / window.innerHeight) * 2 + 1
    }

    const alTocar = (evento: TouchEvent) => {
      e.current.interaccionActiva = true
      if (evento.touches.length > 0) {
        e.current.mouseNDC.x = (evento.touches[0].clientX / window.innerWidth) * 2 - 1
        e.current.mouseNDC.y = -(evento.touches[0].clientY / window.innerHeight) * 2 + 1
      }
    }

    const alSoltarToque = () => {
      // Al soltar el dedo en móvil, devolvemos a Orbit al centro y desactivamos interacción
      e.current.interaccionActiva = false
      e.current.mouseNDC.set(0, 0)
    }

    window.addEventListener('resize', redimensionar)
    window.addEventListener('mousemove', alMoverMouse)
    window.addEventListener('touchstart', alTocar)
    window.addEventListener('touchmove', alTocar)
    window.addEventListener('touchend', alSoltarToque)

    const animar = () => {
      e.current.idRaf = requestAnimationFrame(animar)
      const t = e.current.reloj.getElapsedTime()
      e.current.uniformesMat.uTime.value = t

      const esMovil = window.innerWidth <= 768
      const interactuando = !esMovil || e.current.interaccionActiva

      // Raycasting para la posición 3D del ratón
      e.current.raycaster.setFromCamera(e.current.mouseNDC, camara)
      if (e.current.raycaster.ray.intersectPlane(e.current.plano, _v3)) {
        e.current.mouseGlobal.lerp(_v3, 0.1)
        
        // Si no hay interacción real, ponemos el efecto lejos para que se vea normal
        if (!interactuando) {
          e.current.uniformesMat.uMouse.value.set(99, 99, 99)
        } else {
          e.current.uniformesMat.uMouse.value.copy(e.current.mouseGlobal)
        }
        
        if (e.current.luzMouse) {
          e.current.luzMouse.position.copy(e.current.mouseGlobal)
          e.current.luzMouse.position.z = 2
          // En móvil, la luz solo brilla si estás tocando
          e.current.luzMouse.intensity = interactuando ? (15 + Math.sin(t * 10) * 5) : 0
        }
      }

      const rotY = e.current.mouseNDC.x * 0.3 + Math.sin(t * 0.5) * 0.05 // Añadimos movimiento ocio
      const rotX = -e.current.mouseNDC.y * 0.2 + Math.cos(t * 0.8) * 0.02

      // Animación de rotación y flotación
      if (e.current.objetoPrincipal) {
        e.current.objetoPrincipal.rotation.y += (-Math.PI / 2 + rotY - e.current.objetoPrincipal.rotation.y) * 0.05
        e.current.objetoPrincipal.rotation.x += (rotX - e.current.objetoPrincipal.rotation.x) * 0.05

        // En móvil situamos a Orbit más arriba para dejar espacio al texto
        const offsetFlotacion = Math.sin(t * 1.5) * 0.1
        e.current.objetoPrincipal.position.y = offsetFlotacion + (esMovil ? 0.3 : 0)
      }
      if (e.current.satelites) {
        e.current.satelites.rotation.y += (rotY * 0.8 - e.current.satelites.rotation.y) * 0.02
        e.current.satelites.rotation.x += (rotX * 0.8 - e.current.satelites.rotation.x) * 0.02
      }

      // Sincronizar burbuja 2D con coordenadas 3D
      if (e.current.objetoPrincipal && referenciaBurbuja.current) {
        e.current.objetoPrincipal.getWorldPosition(_v3)

        // Ajuste dinámico según el ancho de pantalla
        const esMovil = window.innerWidth <= 768
        _v3.y += esMovil ? 1.3 : 0.9 // Más espacio en vertical para móvil
        _v3.x += esMovil ? 0 : 0.3   // Centrado en móvil, a la derecha en escritorio

        _v3.project(camara)
        const x = (_v3.x * 0.5 + 0.5) * window.innerWidth
        const y = (-_v3.y * 0.5 + 0.5) * window.innerHeight

        // En móvil usamos un centrado más agresivo
        const transX = esMovil ? '-50%' : '-10%'
        referenciaBurbuja.current.style.transform = `translate(${x}px, ${y}px) translate(${transX}, -100%)`
      }

      renderizador.render(escena, camara)
    }

    animar()

    return () => {
      window.removeEventListener('resize', redimensionar)
      window.removeEventListener('mousemove', alMoverMouse)
      window.removeEventListener('touchstart', alTocar)
      window.removeEventListener('touchmove', alTocar)
      window.removeEventListener('touchend', alSoltarToque)
      cancelAnimationFrame(e.current.idRaf)
      renderizador.dispose()
      escena.traverse((obj: any) => {
        if (obj.geometry) obj.geometry.dispose()
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m: any) => m.dispose())
          else obj.material.dispose()
        }
      })
    }
  }, [alCargar, referenciaBurbuja])

  return <div ref={referenciaContenedor} className="container" />
} -->
