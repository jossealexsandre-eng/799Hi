import React, { useEffect, useRef } from 'react';
import { useMotionValue, useSpring, useInView, motion } from 'framer-motion';

interface AnimatedCounterProps {
  /** Target number to count up to */
  to: number;
  /** Optional decimal places */
  decimals?: number;
  /** Suffix like '+', 'K', '%' etc */
  suffix?: string;
  /** Prefix like '$', 'Rp' etc */
  prefix?: string;
  /** Spring stiffness — lower = slower/smoother */
  stiffness?: number;
  /** Class name passed to the outer span */
  className?: string;
}

/**
 * AnimatedCounter — menggunakan Framer Motion useSpring untuk menghitung
 * angka secara smooth saat elemen masuk viewport.
 * Hanya berjalan sekali (once:true).
 */
export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  to,
  decimals = 0,
  suffix = '',
  prefix = '',
  stiffness = 60,
  className = '',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  const raw = useMotionValue(0);
  const spring = useSpring(raw, { stiffness, damping: 20, restDelta: 0.001 });

  // When entering viewport, animate to target
  useEffect(() => {
    if (inView) {
      raw.set(to);
    }
  }, [inView, to, raw]);

  // Write spring value to the DOM
  useEffect(() => {
    const unsubscribe = spring.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent =
          prefix + latest.toFixed(decimals) + suffix;
      }
    });
    return unsubscribe;
  }, [spring, decimals, suffix, prefix]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {prefix}0{suffix}
    </motion.span>
  );
};
