/**
 * AmbientParticles — halus floating dust/spark di background
 * Bergerak pelan, parallax ringan saat mouse bergerak
 */
import React, { useEffect, useRef, useCallback } from 'react';

interface Spark {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  alphaDir: number; // 1 = fading in, -1 = fading out
  speed: number;
  hue: number;
  shape: 'circle' | 'star';
}

const SPARK_COUNT = 38;

export const AmbientParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animRef = useRef<number>(0);
  const isDarkRef = useRef<boolean>(false);

  const createSpark = useCallback((w: number, h: number): Spark => {
    const hue = Math.random() > 0.45
      ? 0 + Math.random() * 15      // crimson / red
      : 30 + Math.random() * 18;    // warm gold
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      baseX: Math.random() * w,
      baseY: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.18,
      size: 1.2 + Math.random() * 2.6,
      alpha: Math.random() * 0.55,
      alphaDir: Math.random() > 0.5 ? 1 : -1,
      speed: 0.008 + Math.random() * 0.016,
      hue,
      shape: Math.random() > 0.72 ? 'star' : 'circle',
    };
  }, []);

  const drawStar4 = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    r: number
  ) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      const a = (Math.PI / 2) * i;
      const na = a + Math.PI / 4;
      if (i === 0) ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r);
      else ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
      ctx.lineTo(Math.cos(na) * r * 0.3, Math.sin(na) * r * 0.3);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const init = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      sparksRef.current = Array.from({ length: SPARK_COUNT }, () => createSpark(w, h));
    };

    init();

    const onResize = () => init();
    window.addEventListener('resize', onResize);

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouse);

    // Track dark mode
    const checkDark = () => {
      isDarkRef.current = document.documentElement.classList.contains('dark');
    };
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const tick = () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const dark = isDarkRef.current;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      sparksRef.current.forEach((s) => {
        // Drift
        s.baseX += s.vx;
        s.baseY += s.vy;

        // Wrap around edges
        const w = canvas.width;
        const h = canvas.height;
        if (s.baseX < -10) s.baseX = w + 10;
        if (s.baseX > w + 10) s.baseX = -10;
        if (s.baseY < -10) s.baseY = h + 10;
        if (s.baseY > h + 10) s.baseY = -10;

        // Subtle parallax pull toward mouse
        const dx = mx - s.baseX;
        const dy = my - s.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const pullStrength = Math.max(0, (220 - dist) / 220) * 0.018;
        s.x = s.baseX + dx * pullStrength;
        s.y = s.baseY + dy * pullStrength;

        // Pulse alpha
        s.alpha += s.alphaDir * s.speed;
        if (s.alpha >= (dark ? 0.55 : 0.38)) s.alphaDir = -1;
        if (s.alpha <= 0.05) s.alphaDir = 1;

        // Lightness differs dark/light
        const sat = s.hue < 20 ? '80%' : '85%';
        const lig = dark ? '60%' : '40%';
        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = `hsl(${s.hue}, ${sat}, ${lig})`;

        if (s.shape === 'star') {
          drawStar4(ctx, s.x, s.y, s.size * 1.2);
        } else {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * 0.65, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouse);
      observer.disconnect();
    };
  }, [createSpark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
      style={{ opacity: 0.7 }}
    />
  );
};
