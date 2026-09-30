import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Logo799Hi } from './Logo799Hi';
import { ArrowRight, Sparkles } from 'lucide-react';

interface IntroAnimationProps {
  onComplete: () => void;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING STUDIO...');

  useEffect(() => {
    const startTime = Date.now();
    const duration = 2100; // 2.1 seconds for an optimal, snappy & luxurious feel

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const current = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(current);

      if (current < 30) {
        setStatusText('INITIALIZING EXPERIENCE...');
      } else if (current < 65) {
        setStatusText('CURATING BESPOKE ASSETS...');
      } else if (current < 95) {
        setStatusText('PREPARING SHOWCASE...');
      } else {
        setStatusText('WELCOME TO 799Hi.');
      }

      if (elapsed >= duration) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 300);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.04,
        filter: 'blur(10px)',
        transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white text-[#171717] overflow-hidden select-none"
    >
      {/* Subtle Luxury Ambient Radial Glow in Red & Champagne Gold */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: [0.35, 0.65, 0.45],
          scale: [0.95, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        className="absolute w-[600px] h-[450px] bg-gradient-to-tr from-[#E5191B]/10 via-[#B89B72]/15 to-transparent blur-[110px] rounded-full pointer-events-none"
      />

      {/* Decorative Grid Lines Overlay with soft mask */}
      <div className="absolute inset-0 bg-[radial-gradient(#B89B72_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.18] pointer-events-none" />

      {/* Top Right Quick Skip Button */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={onComplete}
          className="text-xs uppercase font-mono tracking-widest text-[#888] hover:text-[#171717] px-4 py-1.5 rounded-full border border-[#E6E4DC] hover:border-[#E5191B] transition-all flex items-center gap-1.5 bg-white/80 backdrop-blur-xs shadow-xs group"
        >
          <span>Skip</span>
          <ArrowRight className="w-3 h-3 text-[#E5191B] group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Top Studio Badge */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-[#999] uppercase"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#E5191B] animate-ping" />
        <span>799Hi · 2026</span>
      </motion.div>

      {/* Central Content Box */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md w-full">
        
        {/* Logo with Background-Removed Vector + Floating Breathing Motion */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-6"
        >
          {/* Soft Red Halo Glow under the logo */}
          <div className="absolute -inset-6 bg-[#E5191B]/15 blur-2xl rounded-full pointer-events-none" />

          <motion.div
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-56 sm:w-72 h-auto flex items-center justify-center"
          >
            <Logo799Hi
                  className="w-full h-auto drop-shadow-[0_8px_24px_rgba(224,16,16,0.22)]"
                  color="#E01010"
                  glow={false}
                  animate={true}
                />
          </motion.div>
        </motion.div>

        {/* Elegant Editorial Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <p className="text-sm font-editorial text-[#444] tracking-wide">
            Websites built for your brand.
          </p>
        </motion.div>

        {/* Loading Progress Bar & Percentage */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-52 sm:w-64"
        >
          {/* Outer Track */}
          <div className="h-[3px] w-full bg-[#EAE8E2] rounded-full overflow-hidden relative mb-2.5 shadow-inner">
            {/* Animated Loading Bar Fill */}
            <motion.div
              className="h-full bg-gradient-to-r from-[#E5191B] via-[#E5A855] to-[#B89B72] rounded-full shadow-[0_0_10px_rgba(229,25,27,0.5)]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>

          {/* Status Label and Percentage */}
          <div className="flex justify-between items-center text-[10px] font-mono">
            <span className="text-[#888] tracking-widest">{statusText}</span>
            <span className="text-[#E5191B] font-bold tabular-nums">
              {progress}%
            </span>
          </div>
        </motion.div>
      </div>

      {/* Bottom Discreet Brand Quality Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-6 flex items-center gap-3 text-[10px] font-mono text-[#AAA] tracking-widest uppercase"
      >
        <span>CLEAN</span>
        <span>·</span>
        <span>MODERN</span>
        <span>·</span>
        <span>BESPOKE</span>
      </motion.div>
    </motion.div>
  );
};
