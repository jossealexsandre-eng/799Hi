import React, { useEffect, useRef, useState, useCallback } from 'react';

type CursorState = 'default' | 'hover' | 'text' | 'click' | 'hidden';

interface CursorLabel {
  text: string;
  visible: boolean;
}

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });
  const rafRef = useRef<number>(0);
  const isTouch = useRef(false);

  const [cursorState, setCursorState] = useState<CursorState>('hidden');
  const [label, setLabel] = useState<CursorLabel>({ text: '', visible: false });
  const [isClicking, setIsClicking] = useState(false);

  // LERP utility — smooth interpolation
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const animateRing = useCallback(() => {
    // Outer ring follows with lag (slower lerp = more trail)
    ringPos.current.x = lerp(ringPos.current.x, mousePos.current.x, 0.1);
    ringPos.current.y = lerp(ringPos.current.y, mousePos.current.y, 0.1);

    if (dotRef.current) {
      dotRef.current.style.transform = `translate(${mousePos.current.x}px, ${mousePos.current.y}px) translate(-50%, -50%)`;
    }
    if (ringRef.current) {
      ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
    }
    if (labelRef.current) {
      labelRef.current.style.transform = `translate(${ringPos.current.x + 20}px, ${ringPos.current.y + 20}px)`;
    }
    if (trailRef.current) {
      trailRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
    }

    rafRef.current = requestAnimationFrame(animateRing);
  }, []);

  useEffect(() => {
    isTouch.current = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch.current) return;

    // Hide native cursor globally
    document.documentElement.style.cursor = 'none';

    const getState = (target: HTMLElement): { state: CursorState; label: string } => {
      // Check for custom cursor labels
      const labelEl = target.closest('[data-cursor-label]') as HTMLElement | null;
      if (labelEl) {
        return { state: 'hover', label: labelEl.dataset.cursorLabel || '' };
      }

      const isButton = target.closest('button, a, [role="button"], [data-cursor="pointer"]');
      const isCard = target.closest('[data-cursor="card"]');
      const isText = target.closest('p, h1, h2, h3, h4, h5, blockquote');
      const isInput = target.closest('input, textarea, select');

      if (isCard) return { state: 'hover', label: 'Lihat →' };
      if (isButton) return { state: 'hover', label: '' };
      if (isInput) return { state: 'text', label: '' };
      if (isText) return { state: 'text', label: '' };
      return { state: 'default', label: '' };
    };

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (cursorState === 'hidden') setCursorState('default');

      const target = e.target as HTMLElement;
      const { state, label: lbl } = getState(target);
      setCursorState(state);
      setLabel({ text: lbl, visible: !!lbl });
    };

    const onMouseDown = () => {
      setIsClicking(true);
      setCursorState('click');
    };
    const onMouseUp = () => {
      setIsClicking(false);
    };
    const onMouseLeave = () => setCursorState('hidden');
    const onMouseEnter = () => setCursorState('default');

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    rafRef.current = requestAnimationFrame(animateRing);

    return () => {
      document.documentElement.style.cursor = '';
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animateRing]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  const isHidden = cursorState === 'hidden';
  const isHovering = cursorState === 'hover';
  const isText = cursorState === 'text';
  const isClick = cursorState === 'click' || isClicking;

  return (
    <>
      {/* ── Trail glow (slowest, barely visible, ambient) ── */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 pointer-events-none z-[9990] hidden md:block"
        style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(155,28,34,0.08) 0%, transparent 70%)',
          opacity: isHidden ? 0 : isHovering ? 1 : 0.5,
          transition: 'opacity 0.4s ease',
          willChange: 'transform',
        }}
      />

      {/* ── Outer ring (lags behind, morphs on state) ── */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9995] hidden md:block"
        style={{
          width: isHovering ? 52 : isText ? 2 : isClick ? 20 : 36,
          height: isHovering ? 52 : isText ? 28 : isClick ? 20 : 36,
          borderRadius: isText ? '2px' : '50%',
          border: `1.5px solid`,
          borderColor: isHovering
            ? 'rgba(184,50,64,0.75)'
            : isClick
            ? 'rgba(184,50,64,0.9)'
            : 'rgba(155,28,34,0.35)',
          backgroundColor: isHovering
            ? 'rgba(155,28,34,0.08)'
            : isClick
            ? 'rgba(155,28,34,0.15)'
            : 'transparent',
          boxShadow: isHovering
            ? '0 0 18px rgba(155,28,34,0.25), inset 0 0 8px rgba(155,28,34,0.05)'
            : isClick
            ? '0 0 24px rgba(184,50,64,0.4)'
            : 'none',
          opacity: isHidden ? 0 : 1,
          backdropFilter: isHovering ? 'blur(1px)' : 'none',
          transition:
            'width 0.35s cubic-bezier(0.34,1.56,0.64,1), height 0.35s cubic-bezier(0.34,1.56,0.64,1), border-radius 0.3s ease, border-color 0.25s ease, background-color 0.25s ease, box-shadow 0.3s ease, opacity 0.2s ease',
          willChange: 'transform, width, height',
        }}
      />

      {/* ── Inner dot (precise, follows cursor exactly) ── */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          width: isText ? 3 : isClick ? 6 : isHovering ? 5 : 7,
          height: isText ? 18 : isClick ? 6 : isHovering ? 5 : 7,
          borderRadius: isText ? '1px' : '50%',
          backgroundColor: isHovering
            ? '#9B1C22'
            : isClick
            ? '#B83240'
            : isText
            ? '#9B1C22'
            : 'rgba(247,247,245,0.9)',
          boxShadow: isHovering
            ? '0 0 10px rgba(155,28,34,0.6)'
            : isClick
            ? '0 0 16px rgba(184,50,64,0.8)'
            : 'none',
          opacity: isHidden ? 0 : isHovering ? 0 : 1,
          transition:
            'width 0.2s cubic-bezier(0.34,1.56,0.64,1), height 0.2s cubic-bezier(0.34,1.56,0.64,1), border-radius 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease, opacity 0.15s ease',
          willChange: 'transform, width, height',
        }}
      />

      {/* ── Context label (appears on card hover) ── */}
      <div
        ref={labelRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block"
        style={{
          opacity: label.visible && isHovering ? 1 : 0,
          transition: 'opacity 0.2s ease',
          willChange: 'transform',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            background: 'rgba(155,28,34,0.95)',
            color: '#fff',
            fontSize: '10px',
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            padding: '4px 10px',
            borderRadius: '20px',
            boxShadow: '0 4px 20px rgba(155,28,34,0.35)',
            backdropFilter: 'blur(8px)',
            whiteSpace: 'nowrap',
          }}
        >
          {label.text}
        </span>
      </div>
    </>
  );
};
