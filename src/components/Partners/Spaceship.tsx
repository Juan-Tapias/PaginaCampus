'use client';

import { useGLTF, useAnimations } from '@react-three/drei';
import { useEffect, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import es from '../../data/es.json'; 



interface SpaceshipProps {
  scale?: number | [number, number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export default function Spaceship({ 
  scale = 1, 
  position = [0, 0, 0], 
  rotation = [0, 0, 0] 
}: SpaceshipProps) {
  
  // Referencia para la animación flotante
  const floatGroup = useRef<THREE.Group>(null);
  
  const { scene, animations } = useGLTF(es.partners_page.assets.spaceship);
  
  // 🌟 LA MAGIA AQUÍ: Clonamos la escena para que puedas usarla múltiples veces sin que desaparezca
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  
  const { actions } = useAnimations(animations, floatGroup);

  useEffect(() => {
    if (clonedScene) {
      clonedScene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          mesh.frustumCulled = false;

          if (mesh.material) {
            // Clonamos también el material para evitar conflictos entre las 3 naves
            mesh.material = (mesh.material as THREE.Material).clone();
            const mat = mesh.material as THREE.MeshStandardMaterial;
            
            // Detectamos si el material es una luz (basado en emissive o color amarillo)
            const isEmissive = mat.emissive && (mat.emissive.r > 0 || mat.emissive.g > 0 || mat.emissive.b > 0);
            
            if (isEmissive) {
              mat.emissiveIntensity = 8.0; // Brillo extremo para las partes amarillas/luces
              mat.toneMapped = false;      // Evita que el post-procesamiento limite el brillo
            } else {
              mat.roughness = 0.5;
              mat.metalness = 0.8;
              mat.envMapIntensity = 0.15;   // El cuerpo de la nave queda muy oscuro
              mat.color.setScalar(0.4);    // Oscurecemos el color base del material
            }
          }
        }
      });
    }

    const firstAction = Object.values(actions)[0];
    if (firstAction) {
      firstAction.fadeIn(0.5).play();
    }
  }, [clonedScene, actions]);

  // Hacemos flotar solo el grupo interno
  useFrame((state) => {
    if (floatGroup.current) {
      // Ya no necesitamos sumarle el position[1] porque el grupo padre ya lo posicionó
      floatGroup.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
    }
  });

  return (
    // Grupo Padre: Se encarga de poner la nave donde tú le digas desde afuera
    <group scale={scale} position={position} rotation={rotation} dispose={null}>
      
      {/* Grupo Hijo (floatGroup): Se encarga exclusivamente de la animación de flotar */}
      <group ref={floatGroup}>
        {/* Renderizamos la escena CLONADA */}
        <primitive object={clonedScene} />
      </group>
      
    </group>
  );
}