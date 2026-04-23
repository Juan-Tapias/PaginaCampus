'use client';

import { useState, useEffect, useRef, useMemo } from "react";

export default function StarField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [shootingStars, setShootingStars] = useState<{ id: number; top: number; left: number; angle: number }[]>([]);

  // Capas de estrellas 
  const layers = useMemo(() =>
    [0.012, 0.025, 0.05].map((speed, layerIdx) => ({
      speed,
      stars: Array.from({ length: layerIdx === 0 ? 120 : layerIdx === 1 ? 60 : 25 }, (_, i) => ({
        id: `${layerIdx}-${i}`,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: layerIdx === 0 ? Math.random() * 1.5 + 0.3 : layerIdx === 1 ? Math.random() * 2.5 + 1.0 : Math.random() * 4.0 + 2.0,
        delay: Math.random() * 5,
        duration: Math.random() * 4 + 2,
        color: i % 10 === 0 ? "#67e8f9" : i % 15 === 0 ? "#c084fc" : i % 20 === 0 ? "#fde047" : "white",
        glow: layerIdx === 2 && i % 3 === 0,
        driftX: (Math.random() - 0.5) * 5, // Deriva constante
        driftY: (Math.random() - 0.5) * 5
      })),
    })),
  []);

  // Lógica de Estrellas Fugaces
  useEffect(() => {
    const triggerShootingStar = () => {
      const id = Date.now();
      setShootingStars(prev => [...prev, {
        id,
        top: Math.random() * 40,
        left: Math.random() * 100,
        angle: 20 + Math.random() * 20
      }]);
      setTimeout(() => {
        setShootingStars(prev => prev.filter(s => s.id !== id));
      }, 2000);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.7) triggerShootingStar();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Parallax + Deriva Automática
  useEffect(() => {
    let animationFrame: number;
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseRef.current = {
        x: (e.clientX / innerWidth - 0.5) * 2,
        y: (e.clientY / innerHeight - 0.5) * 2,
      };
    };

    const update = () => {
      layers.forEach((layer, i) => {
        const el = document.getElementById(`star-layer-${i}`);
        if (el) {
          // Combinamos el mouse con un pequeño vaivén automático
          const autoX = Math.sin(Date.now() * 0.0005) * 15 * (i + 1);
          const autoY = Math.cos(Date.now() * 0.0005) * 15 * (i + 1);
          const dx = mouseRef.current.x * layer.speed * 150 + autoX;
          const dy = mouseRef.current.y * layer.speed * 150 + autoY;
          el.style.transform = `translate(${dx}px, ${dy}px)`;
        }
      });
      animationFrame = requestAnimationFrame(update);
    };

    window.addEventListener("mousemove", handleMouseMove);
    update();
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, [layers]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none bg-transparent">
      
      {/* 1. Nebulosas Pulsantes */}
      <div className="absolute inset-0 opacity-30 mix-blend-screen">
        <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] rounded-full bg-purple-900/30 blur-[150px] animate-pulse" style={{ animationDuration: '15s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-blue-900/30 blur-[150px] animate-pulse" style={{ animationDuration: '12s' }} />
      </div>

      {/* 2. Capas de Estrellas */}
      {layers.map((layer, i) => (
        <div
          key={i}
          id={`star-layer-${i}`}
          className="absolute inset-[-20%] will-change-transform"
        >
          {layer.stars.map((s) => (
            <span
              key={s.id}
              style={{
                position: "absolute",
                top: `${s.top}%`,
                left: `${s.left}%`,
                width: `${s.size}px`,
                height: `${s.size}px`,
                borderRadius: "50%",
                background: s.color,
                boxShadow: s.glow ? `0 0 ${s.size * 3}px ${s.color}` : "none",
                animation: `twinkle ${s.duration}s ${s.delay}s infinite ease-in-out`,
                opacity: 0.8
              }}
            />
          ))}
        </div>
      ))}

      {/* 3. Estrellas Fugaces */}
      {shootingStars.map(star => (
        <div
          key={star.id}
          className="absolute h-[2px] bg-gradient-to-r from-transparent via-white to-transparent"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: '150px',
            transform: `rotate(${star.angle}deg)`,
            animation: 'shooting-star 1.5s linear forwards'
          }}
        />
      ))}

      {/* 4. Estilos Inline para animaciones específicas */}
      <style>{`
        @keyframes shooting-star {
          0% { transform: translateX(-100%) rotate(25deg); opacity: 0; }
          10% { opacity: 1; }
          70% { opacity: 1; }
          100% { transform: translateX(300%) rotate(25deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
