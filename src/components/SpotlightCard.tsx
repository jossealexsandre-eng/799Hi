import React, { useRef, useCallback } from 'react';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  onClick?: () => void;
  'data-cursor-label'?: string;
}

/**
 * SpotlightCard — kartu premium yang menampilkan efek cahaya radial
 * yang mengikuti posisi kursor secara real-time.
 */
export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(155,28,34,0.12)',
  onClick,
  'data-cursor-label': cursorLabel,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cardRef.current.style.setProperty('--spotlight-x', `${x}px`);
    cardRef.current.style.setProperty('--spotlight-y', `${y}px`);
    cardRef.current.style.setProperty('--spotlight-opacity', '1');
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty('--spotlight-opacity', '0');
  }, []);

  return (
    <div
      ref={cardRef}
      className={`spotlight-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      data-cursor-label={cursorLabel}
      style={
        {
          '--spotlight-x': '50%',
          '--spotlight-y': '50%',
          '--spotlight-opacity': '0',
          '--spotlight-color': spotlightColor,
          position: 'relative',
          overflow: 'hidden',
        } as React.CSSProperties
      }
    >
      {/* Spotlight gradient layer */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          background: `radial-gradient(280px circle at var(--spotlight-x) var(--spotlight-y), var(--spotlight-color), transparent 70%)`,
          opacity: 'var(--spotlight-opacity)' as unknown as number,
          transition: 'opacity 0.3s ease',
          borderRadius: 'inherit',
        }}
      />
      {/* Card content sits above spotlight */}
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
};
