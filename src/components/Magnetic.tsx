import React, { useRef, useCallback, useEffect } from 'react';

interface MagneticProps {
  children: React.ReactElement;
  strength?: number;
  threshold?: number;
  className?: string;
}

/**
 * Magnetic — wrapper component yang memberikan tarikan magnetik halus
 * pada tombol atau elemen interaktif ketika kursor mendekat.
 */
export const Magnetic: React.FC<MagneticProps> = ({
  children,
  strength = 0.32,
  threshold = 85,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const currentPos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });
  const isTouch = useRef(false);

  useEffect(() => {
    isTouch.current = window.matchMedia('(pointer: coarse)').matches;
  }, []);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const animate = useCallback(() => {
    currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, 0.16);
    currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, 0.16);

    if (ref.current) {
      ref.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
    }

    const dist = Math.hypot(
      currentPos.current.x - targetPos.current.x,
      currentPos.current.y - targetPos.current.y
    );
    if (dist > 0.05 || Math.hypot(targetPos.current.x, targetPos.current.y) > 0.05) {
      rafRef.current = requestAnimationFrame(animate);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouch.current || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    const dist = Math.hypot(distX, distY);

    if (dist < threshold) {
      targetPos.current = { x: distX * strength, y: distY * strength };
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(animate);
    }
  };

  const handleMouseLeave = () => {
    if (isTouch.current) return;
    targetPos.current = { x: 0, y: 0 };
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(animate);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-flex items-center justify-center will-change-transform ${className}`}
      style={{ display: 'inline-flex' }}
    >
      {children}
    </div>
  );
};
