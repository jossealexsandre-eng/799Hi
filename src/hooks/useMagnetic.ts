import { useRef, useCallback } from 'react';

interface MagneticOptions {
  strength?: number; // How strong the pull is (default: 0.35)
  threshold?: number; // Distance in px to activate (default: 80)
}

/**
 * useMagnetic — hook yang memberikan efek magnetic pada elemen.
 * Saat kursor masuk area threshold, elemen bergerak mendekat ke arah kursor.
 *
 * Usage:
 *   const { magneticRef, handleMagneticMove, handleMagneticLeave } = useMagnetic();
 *   <button ref={magneticRef} onMouseMove={handleMagneticMove} onMouseLeave={handleMagneticLeave}>
 */
export const useMagnetic = ({ strength = 0.35, threshold = 80 }: MagneticOptions = {}) => {
  const magneticRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number>(0);
  const currentPos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const animateMagnetic = useCallback(() => {
    currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, 0.15);
    currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, 0.15);

    if (magneticRef.current) {
      magneticRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px)`;
    }

    const dist = Math.sqrt(
      currentPos.current.x ** 2 + currentPos.current.y ** 2
    );
    if (dist > 0.05) {
      rafRef.current = requestAnimationFrame(animateMagnetic);
    }
  }, []);

  const handleMagneticMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!magneticRef.current) return;
      const rect = magneticRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const dist = Math.sqrt(distX ** 2 + distY ** 2);

      if (dist < threshold) {
        targetPos.current = { x: distX * strength, y: distY * strength };
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(animateMagnetic);
      }
    },
    [strength, threshold, animateMagnetic]
  );

  const handleMagneticLeave = useCallback(() => {
    targetPos.current = { x: 0, y: 0 };
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(animateMagnetic);
  }, [animateMagnetic]);

  return { magneticRef, handleMagneticMove, handleMagneticLeave };
};
