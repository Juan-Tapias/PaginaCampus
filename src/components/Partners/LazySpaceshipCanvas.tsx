'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

// Importación dinámica: el código de Three.js solo se carga cuando el componente va a montarse
const PartnersSpaceshipCanvas = dynamic(
  () => import('./PartnersSpaceshipCanvas'),
  { ssr: false, loading: () => null }
);

interface LazySpaceshipCanvasProps {
  modelScale?: number;
  modelPosition?: [number, number, number];
  modelRotation?: [number, number, number];
  className?: string;
  /** Margen en px antes de entrar al viewport para iniciar la carga (default: 300px) */
  preloadMargin?: number;
}

export default function LazySpaceshipCanvas({
  className = 'w-full h-full',
  preloadMargin = 300,
  ...canvasProps
}: LazySpaceshipCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldMount(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: `${preloadMargin}px`,
        threshold: 0,
      }
    );

    const node = containerRef.current;
    if (node) observer.observe(node);

    return () => observer.disconnect();
  }, [preloadMargin]);

  return (
    <div ref={containerRef} className={className}>
      {shouldMount ? (
        <PartnersSpaceshipCanvas {...canvasProps} />
      ) : (
        <div className="w-full h-full" aria-hidden="true" />
      )}
    </div>
  );
}
