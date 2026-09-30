import React from 'react';
import { motion, Variants } from 'framer-motion';
import { WHY_US_ITEMS } from '../data/content';
import { SpotlightCard } from './SpotlightCard';

export const WhyUs: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-3"
          >
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#9B1C22] dark:text-[#B83240]">
              FILOSOFI STUDIO
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-3xl sm:text-4xl md:text-5xl font-editorial font-normal tracking-tight text-[#F7F7F5] light:text-[#171717] mb-4"
          >
            Mengapa memilih kami?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="text-base text-[#8E8D89] light:text-[#737373] leading-relaxed"
          >
            Kami berfokus pada tipografi yang kuat, tata letak yang penuh pertimbangan, dan website yang sungguh-sungguh memperkuat reputasi digital Anda.
          </motion.p>
        </div>

        {/* Editorial Feature Blocks with Staggered Framer Motion Animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {WHY_US_ITEMS.map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={`h-full ${idx === 0 ? 'lg:col-span-2' : ''}`}
            >
              <SpotlightCard
                spotlightColor="rgba(155, 28, 34, 0.1)"
                data-cursor-label="Prinsip ✦"
                className="p-8 rounded-3xl bg-[#141413] light:bg-[#FFFFFF] border border-[#282825] light:border-[#E3E0D8] flex flex-col justify-between group h-full shadow-xs hover:border-[#9B1C22]/30 transition-colors"
              >
                <div>
                  <span className="text-xs font-mono text-[#9B1C22] dark:text-[#B83240] block mb-4">
                    0{idx + 1} / PRINCIPLE
                  </span>
                  <h3 className="text-xl sm:text-2xl font-editorial font-normal text-[#F7F7F5] light:text-[#171717] mb-3 group-hover:text-[#9B1C22] dark:group-hover:text-[#B83240] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#8E8D89] light:text-[#737373] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#242421] light:border-[#EAE7E1] flex items-center justify-between text-xs text-[#8E8D89]">
                  <span>Design standard</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9B1C22] shadow-[0_0_8px_rgba(155,28,34,0.6)]" />
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
