import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { FAQ_ITEMS } from '../data/content';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 sm:py-32 relative">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <div className="mb-14 text-center sm:text-left">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center sm:justify-start gap-2 mb-3"
          >
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#B89B72]">
              PERTANYAAN UMUM
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-3xl sm:text-4xl md:text-5xl font-editorial font-normal tracking-tight text-[#F7F7F5] light:text-[#171717] mb-4"
          >
            Pertanyaan yang sering diajukan.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="text-base text-[#8E8D89] light:text-[#737373]"
          >
            Hal-hal penting yang perlu Anda ketahui sebelum memulai proyek website Anda.
          </motion.p>
        </div>

        {/* Accordion list */}
        <div className="divide-y divide-[#242421] light:divide-[#E3E0D8] border-y border-[#242421] light:border-[#E3E0D8]">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div key={idx} className="py-5 sm:py-6">
                <button
                  onClick={() => toggleIndex(idx)}
                  className="w-full flex items-center justify-between text-left group gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-medium text-[#F7F7F5] light:text-[#171717] group-hover:text-[#9B1C22] dark:group-hover:text-[#B83240] transition-colors">
                    {item.question}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#181816] light:bg-[#EFEDE8] border border-[#282825] light:border-[#E3E0D8] flex items-center justify-center shrink-0 group-hover:border-[#9B1C22] transition-colors">
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-[#9B1C22]" />
                    ) : (
                      <Plus className="w-4 h-4 text-[#8E8D89] light:text-[#737373] group-hover:text-[#9B1C22] dark:group-hover:text-[#B83240]" />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pt-3 pb-2 text-sm text-[#8E8D89] light:text-[#737373] leading-relaxed max-w-2xl">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
