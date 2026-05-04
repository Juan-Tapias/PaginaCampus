'use client';

import { useEffect, useRef } from 'react';

const STAR_COUNT = 180;
const SHOOTING_STAR_INTERVAL = 5000;

interface Star {
  x: number; y: number; r: number;
  color: string; alpha: number;
  twinkleDelta: number; twinkleSpeed: number;
  dx: number; dy: number; // parallax drift
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- Resize ---
    let W = 0, H = 0;
    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // --- Stars ---
    const COLORS = ['#ffffff', '#ffffff', '#ffffff', '#67e8f9', '#c084fc', '#fde047'];
    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.6 + 0.3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.5 + 0.3,
      twinkleDelta: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.015 + 0.005,
      dx: (Math.random() - 0.5) * 0.00008,
      dy: (Math.random() - 0.5) * 0.00008,
    }));

    // --- Shooting stars ---
    interface ShootingStar { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; }
    let shooters: ShootingStar[] = [];
    let shootTimer = 0;

    // --- Mouse parallax (throttled) ---
    let mouseX = 0, mouseY = 0;
    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouse, { passive: true });

    // --- Render loop ---
    let raf: number;
    let last = 0;
    const draw = (ts: number) => {
      const dt = ts - last;
      last = ts;
      raf = requestAnimationFrame(draw);

      ctx.clearRect(0, 0, W, H);

      // Subtle nebula gradient (cheap, single draw call)
      const grad = ctx.createRadialGradient(W * 0.3, H * 0.2, 0, W * 0.3, H * 0.2, W * 0.7);
      grad.addColorStop(0, 'rgba(80,30,160,0.04)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // Stars
      const px = mouseX * 12;
      const py = mouseY * 12;

      for (const s of stars) {
        if (!reduced) {
          s.twinkleDelta += s.twinkleSpeed;
          s.x += s.dx;
          s.y += s.dy;
          if (s.x < 0) s.x = 1; if (s.x > 1) s.x = 0;
          if (s.y < 0) s.y = 1; if (s.y > 1) s.y = 0;
        }
        const alpha = reduced ? s.alpha : s.alpha * (0.6 + 0.4 * Math.sin(s.twinkleDelta));
        ctx.beginPath();
        ctx.arc(s.x * W + px * s.r, s.y * H + py * s.r, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
      }

      // Shooting stars
      if (!reduced) {
        shootTimer += dt;
        if (shootTimer > SHOOTING_STAR_INTERVAL && Math.random() > 0.5) {
          shootTimer = 0;
          shooters.push({
            x: Math.random() * W,
            y: Math.random() * H * 0.4,
            vx: 4 + Math.random() * 3,
            vy: 2 + Math.random() * 2,
            life: 0,
            maxLife: 60 + Math.random() * 40,
          });
        }

        shooters = shooters.filter(s => s.life < s.maxLife);
        for (const s of shooters) {
          s.x += s.vx; s.y += s.vy; s.life++;
          const progress = s.life / s.maxLife;
          const alpha = progress < 0.1 ? progress * 10 : progress > 0.7 ? (1 - progress) / 0.3 : 1;
          const tailLen = 80;
          const grd = ctx.createLinearGradient(s.x - s.vx * tailLen / 4, s.y - s.vy * tailLen / 4, s.x, s.y);
          grd.addColorStop(0, 'transparent');
          grd.addColorStop(1, `rgba(255,255,255,${alpha * 0.8})`);
          ctx.globalAlpha = 1;
          ctx.beginPath();
          ctx.moveTo(s.x - s.vx * tailLen / 4, s.y - s.vy * tailLen / 4);
          ctx.lineTo(s.x, s.y);
          ctx.strokeStyle = grd;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
