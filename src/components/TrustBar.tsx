import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedCounter } from './AnimatedCounter';

const STATS_DATA = [
  { value: 100, suffix: '%', label: 'Desain Kustom & Unik' },
  { value: 99, suffix: '%', label: 'Skor Kinerja & Optimasi' },
  { value: 3, prefix: '±', suffix: ' Hari', label: 'Rata-Rata Pengerjaan' },
  { value: 499, prefix: 'Rp', suffix: 'K', label: 'Mulai Investasi Terjangkau' },
];

export const TrustBar: React.FC = () => {
  return (
    <section className="py-10 sm:py-12 border-y border-[#242421] light:border-[#E3E0D8] bg-[#121211]/50 light:bg-[#F2EFE9]/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Animated Metrics Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS_DATA.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="flex flex-col items-center sm:items-start text-center sm:text-left"
            >
              <div className="text-3xl sm:text-4xl font-editorial font-normal text-[#F7F7F5] light:text-[#171717] tracking-tight mb-1 text-gradient">
                <AnimatedCounter
                  to={stat.value}
                  prefix={stat.prefix || ''}
                  suffix={stat.suffix || ''}
                  className="font-medium text-[#B83240] dark:text-[#E5191B]"
                />
              </div>
              <span className="text-xs sm:text-sm text-[#8E8D89] light:text-[#737373]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

