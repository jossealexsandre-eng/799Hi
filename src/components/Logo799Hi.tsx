import React from 'react';
import { motion } from 'framer-motion';

interface Logo799HiProps {
  className?: string;
  color?: string;
  glow?: boolean;
  animate?: boolean;
  alt?: string;
}

export const Logo799Hi: React.FC<Logo799HiProps> = ({
  className = 'w-auto h-10',
  color = '#E01010',
  glow = false,
  animate = false,
  alt = '799Hi',
}) => {
  const isWhite =
    color.toLowerCase() === '#ffffff' ||
    color.toLowerCase() === 'white' ||
    color.toLowerCase() === '#f7f7f5';

  const logoSrc = isWhite
    ? '/images/799hi-logo-white.png'
    : '/images/799hi-logo.png';

  const content = (
    <img
      src={logoSrc}
      alt={alt}
      width={730}
      height={311}
      className={`w-auto h-auto max-w-full max-h-full object-contain select-none pointer-events-none transition-all duration-300 ${
        glow ? 'drop-shadow-[0_0_14px_rgba(233,0,0,0.65)]' : ''
      }`}
      draggable={false}
    />
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`relative inline-flex items-center justify-center ${className}`}
      >
        {content}
      </motion.div>
    );
  }

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {content}
    </div>
  );
};

