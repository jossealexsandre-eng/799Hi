import React from 'react';
import { motion } from 'framer-motion';
import { PROCESS_STEPS } from '../data/content';

export const Process: React.FC = () => {
  return (
    <section id="process" className="py-24 sm:py-32 bg-[#121211]/50 light:bg-[#F2EFE9]/50 border-t border-[#242421] light:border-[#E3E0D8] relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-3"
          >
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#B89B72]">
              CARA KERJA
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-3xl sm:text-4xl md:text-5xl font-editorial font-normal tracking-tight text-[#F7F7F5] light:text-[#171717] mb-4"
          >
            Dari ide hingga website live.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="text-base text-[#8E8D89] light:text-[#737373] leading-relaxed"
          >
            Alur kerja kolaboratif dan terstruktur 5 langkah, dari konsep awal hingga peluncuran website yang optimal.
          </motion.p>
        </div>

        {/* Timeline Desktop: Horizontal 5 columns */}
        <div className="hidden lg:grid grid-cols-5 gap-6 relative">
          {/* Animated connecting horizontal line */}
          <div className="absolute top-[28px] left-[10%] right-[10%] h-[1px] bg-[#2E2E2A] light:bg-[#D5D2CB] z-0" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: '0% 50%' }}
            className="absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-[#9B1C22] via-[#B83240] to-[#B89B72]/60 z-0"
          />

          {PROCESS_STEPS.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -4 }}
              className="relative z-10 flex flex-col group"
            >
              {/* Step indicator node */}
              <motion.div
                whileHover={{ scale: 1.08 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className="w-14 h-14 rounded-full bg-[#181816] light:bg-[#FFFFFF] border-2 border-[#282825] light:border-[#E3E0D8] group-hover:border-[#9B1C22] group-hover:shadow-[0_0_16px_rgba(155,28,34,0.3)] transition-colors flex items-center justify-center mb-6 shadow-md"
              >
                <span className="text-xs font-mono font-semibold text-[#9B1C22] dark:text-[#B83240]">
                  {step.number}
                </span>
              </motion.div>

              <h3 className="text-lg font-editorial font-normal text-[#F7F7F5] light:text-[#171717] mb-2">
                {step.title}
              </h3>

              <p className="text-xs text-[#F7F7F5]/90 light:text-[#222222] font-medium leading-relaxed mb-2">
                {step.description}
              </p>

              <p className="text-xs text-[#8E8D89] light:text-[#737373] leading-relaxed">
                {step.details}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Timeline Mobile: Vertical timeline */}
        <div className="lg:hidden space-y-8 relative pl-6 ml-3">
          {/* Background vertical line */}
          <div className="absolute left-0 top-3 bottom-3 w-[1px] bg-[#282825] light:border-[#E3E0D8]" />
          {/* Animated vertical track */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'top' }}
            className="absolute left-0 top-3 bottom-3 w-[2px] bg-gradient-to-b from-[#9B1C22] via-[#B83240] to-transparent z-0"
          />

          {PROCESS_STEPS.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="relative z-10"
            >
              {/* Dot on vertical line */}
              <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#181816] light:bg-[#FFFFFF] border-2 border-[#9B1C22]" />

              <span className="text-xs font-mono font-semibold text-[#9B1C22] dark:text-[#B83240] block mb-1">
                {step.number} — {step.title}
              </span>

              <h3 className="text-base font-medium text-[#F7F7F5] light:text-[#171717] mb-1">
                {step.description}
              </h3>

              <p className="text-xs text-[#8E8D89] light:text-[#737373] leading-relaxed">
                {step.details}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
