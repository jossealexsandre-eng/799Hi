/**
 * ClickBurst — Micro sparkle / particle burst on every click
 * Partikel kilau mini muncul di titik klik, memudar cepat
 */
import React, { useEffect, useRef, useCallback } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number; // 0=red, 40=gold
  shape: 'star' | 'dot' | 'cross';
}

let particleId = 0;

export const ClickBurst: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const isRunningRef = useRef(false);

  const spawnParticles = useCallback((x: number, y: number) => {
    const count = 12 + Math.floor(Math.random() * 8);
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.6;
      const speed = 2.5 + Math.random() * 4.5;
      const isGold = Math.random() > 0.55;
      particlesRef.current.push({
        id: particleId++,
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5, // slight upward bias
        life: 1,
        maxLife: 0.55 + Math.random() * 0.45,
        size: 2 + Math.random() * 4,
        hue: isGold ? 35 + Math.random() * 15 : 0 + Math.random() * 10,
        shape: Math.random() > 0.6 ? 'star' : Math.random() > 0.5 ? 'cross' : 'dot',
      });
    }
    if (!isRunningRef.current) {
      isRunningRef.current = true;
      tick();
    }
  }, []);

  const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      const angle = (Math.PI / 2) * i;
      const outer = r;
      const inner = r * 0.38;
      const nextAngle = angle + Math.PI / 4;
      if (i === 0) ctx.moveTo(Math.cos(angle) * outer, Math.sin(angle) * outer);
      else ctx.lineTo(Math.cos(angle) * outer, Math.sin(angle) * outer);
      ctx.lineTo(Math.cos(nextAngle) * inner, Math.sin(nextAngle) * inner);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };

  const drawCross = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.PI / 4);
    ctx.fillRect(-r * 0.15, -r, r * 0.3, r * 2);
    ctx.fillRect(-r, -r * 0.15, r * 2, r * 0.3);
    ctx.restore();
  };

  const tick = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current = particlesRef.current.filter((p) => {
      p.life -= 0.035;
      if (p.life <= 0) return false;

      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.18; // gravity
      p.vx *= 0.97;

      const alpha = Math.min(1, p.life / 0.4);
      const sat = p.hue < 20 ? '85%' : '92%';
      ctx.globalAlpha = alpha * 0.92;
      ctx.fillStyle = `hsl(${p.hue}, ${sat}, 62%)`;

      const r = p.size * (0.4 + p.life * 0.7);
      if (p.shape === 'star') {
        drawStar(ctx, p.x, p.y, r);
      } else if (p.shape === 'cross') {
        drawCross(ctx, p.x, p.y, r);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 0.7, 0, Math.PI * 2);
        ctx.fill();
      }
      return true;
    });

    ctx.globalAlpha = 1;

    if (particlesRef.current.length > 0) {
      animFrameRef.current = requestAnimationFrame(tick);
    } else {
      isRunningRef.current = false;
    }
  }, []);

  // Resize canvas to full viewport
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // Listen for clicks
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Skip if clicking on links/buttons that navigate (optional refinement)
      spawnParticles(e.clientX, e.clientY);
    };
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [spawnParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9998]"
      aria-hidden="true"
    />
  );
};
