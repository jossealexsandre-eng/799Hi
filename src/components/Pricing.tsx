import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { PRICING_PACKAGES } from '../data/content';
import { PricingSkeleton } from './Skeleton';
import { SpotlightCard } from './SpotlightCard';
import { Magnetic } from './Magnetic';

interface PricingProps {
  onSelectPackage: (packageName: string) => void;
  isLoading?: boolean;
}

export const Pricing: React.FC<PricingProps> = ({
  onSelectPackage,
  isLoading: externalLoading,
}) => {
  const navigate = useNavigate();
  const [internalLoading, setInternalLoading] = useState(true);

  useEffect(() => {
    if (externalLoading !== undefined) return;
    const timer = setTimeout(() => {
      setInternalLoading(false);
    }, 650);
    return () => clearTimeout(timer);
  }, [externalLoading]);

  const isLoading = externalLoading !== undefined ? externalLoading : internalLoading;

  const categories = [
    { label: 'Portfolio', price: 'Mulai Rp499K', slug: 'portfolio' },
    { label: 'Business', price: 'Mulai Rp799K', slug: 'business' },
    { label: 'Wedding', price: 'Mulai Rp499K', slug: 'wedding' },
    { label: 'Landing Page', price: 'Mulai Rp499K', slug: 'landing-page' },
    { label: 'Custom', price: 'Mulai Rp2M+', slug: 'custom' },
  ];

  return (
    <section id="pricing" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-3"
          >
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#9B1C22] dark:text-[#B83240]">
              INVESTASI TRANSPARAN
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-3xl sm:text-4xl md:text-5xl font-editorial font-normal tracking-tight text-[#F7F7F5] light:text-[#171717] mb-4"
          >
            Harga Jelas. Nilai Nyata.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="text-base text-[#8E8D89] light:text-[#737373] leading-relaxed"
          >
            Pilih paket yang sesuai kebutuhan Anda, atau jelajahi paket lengkap berdasarkan kategori website di bawah ini.
          </motion.p>
        </div>

        {/* Quick Category Navigation Pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mb-12 p-4 sm:p-5 rounded-2xl bg-[#141413] light:bg-[#F2EFE9] border border-[#262623] light:border-[#E3E0D8]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#9B1C22] dark:text-[#B83240] font-medium">
              Lihat Paket Spesifik per Kategori Layanan:
            </span>
            <span className="text-[11px] text-[#8E8D89] light:text-[#737373]">
              Klik untuk melihat fitur &amp; perbandingan lengkap →
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => navigate(`/services/${cat.slug}`)}
                data-cursor-label="Jelajahi"
                className="group flex flex-col items-start p-3 rounded-xl bg-[#1A1A18] light:bg-[#FFFFFF] border border-[#2A2A26] light:border-[#DED9CD] hover:border-[#9B1C22]/60 transition-all duration-250 text-left cursor-pointer"
              >
                <span className="text-xs font-semibold text-[#F7F7F5] light:text-[#171717] group-hover:text-[#9B1C22] dark:group-hover:text-[#B83240] transition-colors flex items-center justify-between w-full">
                  {cat.label}
                  <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform opacity-70" />
                </span>
                <span className="text-[10px] font-mono text-[#8E8D89] light:text-[#737373] mt-0.5">
                  {cat.price}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Pricing Cards Grid with Skeleton Loading State */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="pricing-skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <PricingSkeleton />
            </motion.div>
          ) : (
            <motion.div
              key="pricing-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
            >
              {PRICING_PACKAGES.map((pkg, idx) => {
                const isStandard = pkg.isPopular;

                return (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: 0.65,
                      delay: idx * 0.1,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    whileHover={{ y: isStandard ? -8 : -5, transition: { duration: 0.3 } }}
                    className={`relative flex ${isStandard ? 'lg:-translate-y-2' : ''}`}
                  >
                    <SpotlightCard
                      spotlightColor={isStandard ? 'rgba(155,28,34,0.18)' : 'rgba(155,28,34,0.10)'}
                      className={`w-full rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 ${
                        isStandard
                          ? 'bg-[#181816] light:bg-[#FFFFFF] border-2 border-[#9B1C22] shadow-xl shadow-[#9B1C22]/15'
                          : 'bg-[#141413] light:bg-[#FFFFFF] border border-[#282825] light:border-[#E3E0D8] hover:border-[#383834]'
                      }`}
                    >
                      {/* Most Popular Badge with Floating & Shimmer */}
                      {isStandard && (
                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                          <span className="float-badge inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#9B1C22] text-white text-[10px] font-bold uppercase tracking-widest shadow-md shadow-[#9B1C22]/40 border border-white/15">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            MOST POPULAR
                          </span>
                        </div>
                      )}

                      <div>
                        {/* Package Name & Target */}
                        <div className="mb-4">
                          <span className="text-xs font-mono font-semibold tracking-wider text-[#9B1C22] dark:text-[#B83240] uppercase block mb-1">
                            {pkg.name}
                          </span>
                          <div className="flex items-baseline gap-1 my-2">
                            <span className="text-3xl sm:text-4xl font-editorial font-normal text-[#F7F7F5] light:text-[#171717] tracking-tight">
                              {pkg.price}
                            </span>
                          </div>
                          <p className="text-xs text-[#8E8D89] light:text-[#737373] min-h-[32px] leading-relaxed">
                            {pkg.target}
                          </p>
                        </div>

                        <div className="w-full h-[1px] bg-[#242421] light:bg-[#EAE7E1] my-5" />

                        {/* Included Checklist */}
                        <div className="space-y-2.5 mb-8">
                          <span className="text-[11px] font-mono text-[#8E8D89] light:text-[#737373] uppercase tracking-wider block mb-2">
                            What's Included
                          </span>
                          {pkg.features.map((feature, fIdx) => (
                            <div
                              key={fIdx}
                              className="flex items-start gap-2.5 text-xs text-[#CCCCCC] light:text-[#444444]"
                            >
                              <Check className="w-3.5 h-3.5 text-[#9B1C22] shrink-0 mt-0.5" />
                              <span className="leading-snug">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Card CTA with Magnetic pull */}
                      <div>
                        <Magnetic strength={0.2} threshold={55} className="w-full">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => onSelectPackage(pkg.name)}
                            data-cursor-label="Pilih Paket →"
                            className={`btn-pulse w-full py-3 px-4 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm group cursor-pointer ${
                              isStandard
                                ? 'bg-[#9B1C22] text-white hover:bg-[#7A1519] shadow-md shadow-[#9B1C22]/20'
                                : 'bg-[#1E1E1C] light:bg-[#EFEDE8] text-[#F7F7F5] light:text-[#171717] hover:bg-[#282825] light:hover:bg-[#E3E0D8]'
                            }`}
                          >
                            <span>{pkg.ctaText}</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </motion.button>
                        </Magnetic>
                      </div>
                    </SpotlightCard>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Small Discretionary Note */}
        <div className="mt-10 text-center">
          <p className="text-xs text-[#8E8D89] light:text-[#737373]">
            Domain &amp; hosting are not included unless specified. Revisions are
            handled transparently through dedicated revision cycles.
          </p>
        </div>
      </div>
    </section>
  );
};
