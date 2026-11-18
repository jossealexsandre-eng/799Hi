import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SERVICES } from '../data/content';
import { SpotlightCard } from './SpotlightCard';

interface ServicesProps {
  onSelectServiceForInquiry?: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = () => {
  const navigate = useNavigate();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 28, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section id="services" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 sm:mb-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-3"
            >
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#F20D0D]">
                LAYANAN UTAMA
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="text-3xl sm:text-4xl md:text-5xl font-editorial font-normal tracking-tight text-[#F7F7F5] light:text-[#171717] mb-4"
            >
              Kategori layanan yang kami kerjakan.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: 0.16 }}
              className="text-base text-[#8E8D89] light:text-[#737373] leading-relaxed"
            >
              Dari website personal hingga sistem aplikasi web kustom, setiap layanan dirancang sesuai dengan karakter dan tujuan bisnismu.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button
              onClick={() => navigate('/services')}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#F20D0D] hover:underline cursor-pointer"
            >
              <span>Buka Katalog Layanan Lengkap</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        {/* 6 Service Cards Grid (3 Columns on Desktop, 2 on Tablet, 1 on Mobile) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SERVICES.map((item, index) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } }}
            >
              <SpotlightCard
                onClick={() => navigate(`/services/${item.id}`)}
                className="group p-7 sm:p-8 rounded-2xl bg-[#141413] light:bg-[#FFFFFF] border border-[#282825] light:border-[#E3E0D8] hover:border-[#F20D0D]/50 light:hover:border-[#F20D0D]/50 transition-all duration-300 flex flex-col justify-between cursor-pointer h-full shadow-sm"
              >
                <div>
                  {/* Top card metadata: 01, starting price */}
                  <div className="flex items-center justify-between mb-5 pb-4 border-b border-[#242421] light:border-[#EAE7E1]">
                    <span className="text-xs font-mono font-bold text-[#F20D0D]">
                      0{index + 1}
                    </span>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#1F1F1D] light:bg-[#F2EFE9] text-[#CCCCCC] light:text-[#555555]">
                      {item.startingPrice}
                    </span>
                  </div>

                  <h3 className="text-2xl font-editorial font-normal text-[#F7F7F5] light:text-[#171717] mb-1.5 group-hover:text-[#F20D0D] transition-colors duration-300">
                    {item.title}
                  </h3>

                  <p className="text-xs font-medium text-[#B8A99A] mb-3">
                    {item.subtitle}
                  </p>

                  <p className="text-xs text-[#8E8D89] light:text-[#737373] leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#242421] light:border-[#EAE7E1] flex items-center justify-between text-xs font-semibold text-[#F7F7F5] light:text-[#171717] group-hover:text-[#F20D0D] transition-colors duration-300">
                  <span>Lihat Paket &amp; Fitur</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
