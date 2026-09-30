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
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 32, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section id="services" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex items-center gap-2 mb-3"
          >
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#9B1C22] dark:text-[#B83240]">
              MAIN SERVICES
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.08, ease: 'easeOut' }}
            className="text-3xl sm:text-4xl md:text-5xl font-editorial font-normal tracking-tight text-[#F7F7F5] light:text-[#171717] mb-4"
          >
            What we build.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.16, ease: 'easeOut' }}
            className="text-base text-[#8E8D89] light:text-[#737373] leading-relaxed"
          >
            From personal portfolios to business websites, every project is
            designed around your goals and identity.
          </motion.p>
        </div>

        {/* 5 Service Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SERVICES.map((item, index) => {
            const isWide = index === 3 || index === 4;
            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } }}
                className={`${isWide && index === 3 ? 'lg:col-span-1 md:col-span-1' : ''} ${isWide && index === 4 ? 'lg:col-span-2 md:col-span-2' : ''}`}
              >
                <SpotlightCard
                  onClick={() => navigate(`/services/${item.id}`)}
                  data-cursor-label="Lihat →"
                  className="group p-8 rounded-2xl bg-[#141413] light:bg-[#FFFFFF] border border-[#282825] light:border-[#E3E0D8] hover:border-[#9B1C22]/40 light:hover:border-[#9B1C22]/40 transition-all duration-300 flex flex-col justify-between cursor-pointer h-full"
                >
                  <div>
                    {/* Top card metadata: 01, starting price */}
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#242421] light:border-[#EAE7E1]">
                      <span className="text-xs font-mono font-medium text-[#9B1C22] dark:text-[#B83240]">
                        0{index + 1}
                      </span>
                      <span className="text-xs text-[#8E8D89] light:text-[#737373] tracking-wide">
                        From {item.startingPrice}
                      </span>
                    </div>

                    <h3 className="text-2xl font-editorial font-normal text-[#F7F7F5] light:text-[#171717] mb-2 group-hover:text-[#9B1C22] dark:group-hover:text-[#B83240] transition-colors duration-300">
                      {item.title}
                    </h3>

                    <p className="text-xs font-medium uppercase tracking-wider text-[#9B1C22] dark:text-[#B83240] mb-3">
                      {item.subtitle}
                    </p>

                    <p className="text-sm text-[#8E8D89] light:text-[#737373] leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#242421] light:border-[#EAE7E1] flex items-center justify-between text-xs font-semibold text-[#F7F7F5] light:text-[#171717] group-hover:text-[#9B1C22] dark:group-hover:text-[#B83240] transition-colors duration-300">
                    <span>{item.ctaText}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
