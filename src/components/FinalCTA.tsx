import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { getWhatsAppLink } from '../data/content';
import { Magnetic } from './Magnetic';

interface FinalCTAProps {
  onStartProject: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onStartProject }) => {
  return (
    <section className="py-24 sm:py-36 bg-[#0E0E0D] light:bg-[#F2EFE9] border-t border-[#242421] light:border-[#E3E0D8] relative overflow-hidden">
      {/* Living Ambient Breathing Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[360px] bg-gradient-to-tr from-[#9B1C22]/20 via-[#B83240]/10 to-transparent blur-[130px] pointer-events-none rounded-full ambient-orb" />

      <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#9B1C22] dark:text-[#B83240] block mb-4">
            BERSIH · MODERN · DIBUAT KHUSUS UNTUK ANDA
          </span>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-editorial font-normal tracking-tight text-[#F7F7F5] light:text-[#171717] mb-6">
            Website impian Anda dimulai di sini.
          </h2>

          <p className="text-base sm:text-lg text-[#8E8D89] light:text-[#737373] max-w-xl mx-auto mb-10 leading-relaxed">
            Punya ide atau konsep baru? Mari wujudkan menjadi website profesional yang merepresentasikan brand Anda dengan sempurna.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Magnetic strength={0.35} threshold={85}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={onStartProject}
                data-cursor-label="Mulai Sekarang ↗"
                className="btn-pulse w-full sm:w-auto px-8 py-4 rounded-full bg-[#F7F7F5] light:bg-[#171717] text-[#0F0F0E] light:text-[#F7F7F5] text-xs font-semibold uppercase tracking-wider hover:bg-white light:hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-xl hover:shadow-[0_0_24px_rgba(155,28,34,0.25)] group cursor-pointer"
              >
                <span>Mulai Proyek Anda</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#9B1C22] group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Magnetic>

            <Magnetic strength={0.25} threshold={75}>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                href={getWhatsAppLink("Hi 799Hi! Saya ingin berkonsultasi mengenai pembuatan website.")}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-label="Chat WA 💬"
                className="btn-pulse w-full sm:w-auto px-8 py-4 rounded-full border border-[#282825] light:border-[#E3E0D8] text-xs font-semibold uppercase tracking-wider text-[#F7F7F5] light:text-[#171717] hover:bg-[#1A1A18] light:hover:bg-[#FFFFFF] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                <span>Konsultasi WhatsApp</span>
              </motion.a>
            </Magnetic>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
