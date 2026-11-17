import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
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
    }, 450);
    return () => clearTimeout(timer);
  }, [externalLoading]);

  const isLoading = externalLoading !== undefined ? externalLoading : internalLoading;

  const categories = [
    { label: 'Personal Portfolio', price: 'Mulai Rp549.000', slug: 'personal-portfolio' },
    { label: 'Wedding Invitation', price: 'Mulai Rp199.000', slug: 'wedding-invitation' },
    { label: 'Cafe & Restaurant', price: 'Mulai Rp899.000', slug: 'cafe-restaurant' },
    { label: 'Company Profile', price: 'Mulai Rp1.499.000', slug: 'company-profile' },
    { label: 'Business Store', price: 'Mulai Rp1.299.000', slug: 'business-store' },
    { label: 'Custom Website', price: 'Mulai Rp4.499.000', slug: 'custom-website' },
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
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-3"
          >
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#F20D0D]">
              INVESTASI TRANSPARAN
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-3xl sm:text-4xl md:text-5xl font-editorial font-normal tracking-tight text-[#F7F7F5] light:text-[#171717] mb-4"
          >
            Harga Jelas. Nilai Nyata.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="text-base text-[#8E8D89] light:text-[#737373] leading-relaxed"
          >
            Pilih paket yang sesuai kebutuhan Anda, atau jelajahi paket lengkap berdasarkan kategori website di bawah ini.
          </motion.p>
        </div>

        {/* Quick Category Navigation Pills (6 Categories) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 p-4 sm:p-5 rounded-2xl bg-[#141413] light:bg-[#F2EFE9] border border-[#262623] light:border-[#E3E0D8]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#F20D0D] font-medium">
              Lihat Paket Spesifik per Kategori Layanan:
            </span>
            <span className="text-[11px] text-[#8E8D89] light:text-[#737373]">
              Klik untuk melihat rincian fitur &amp; perbandingan lengkap →
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => navigate(`/services/${cat.slug}`)}
                className="group flex flex-col items-start p-3 rounded-xl bg-[#1A1A18] light:bg-[#FFFFFF] border border-[#2A2A26] light:border-[#DED9CD] hover:border-[#F20D0D]/60 transition-all duration-200 text-left cursor-pointer"
              >
                <span className="text-xs font-semibold text-[#F7F7F5] light:text-[#171717] group-hover:text-[#F20D0D] transition-colors flex items-center justify-between w-full">
                  <span className="truncate">{cat.label}</span>
                  <ArrowRight className="w-3 h-3 shrink-0 transform group-hover:translate-x-1 transition-transform opacity-70 ml-1" />
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
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: 0.55,
                      delay: idx * 0.08,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    whileHover={{ y: isStandard ? -8 : -5, transition: { duration: 0.3 } }}
                    className={`relative flex ${isStandard ? 'lg:-translate-y-2' : ''}`}
                  >
                    <SpotlightCard
                      spotlightColor={isStandard ? 'rgba(242,13,13,0.15)' : 'rgba(242,13,13,0.06)'}
                      className={`w-full rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 ${
                        isStandard
                          ? 'bg-[#181816] light:bg-[#FFFFFF] border-2 border-[#F20D0D] shadow-xl shadow-[#F20D0D]/10'
                          : 'bg-[#141413] light:bg-[#FFFFFF] border border-[#282825] light:border-[#E3E0D8] hover:border-[#383834]'
                      }`}
                    >
                      {/* Rekomendasi Badge for Standard */}
                      {isStandard && (
                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                          <span className="float-badge inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F20D0D] text-white text-[10px] font-bold uppercase tracking-widest shadow-md shadow-[#F20D0D]/40 border border-white/15">
                            <Sparkles className="w-3 h-3" />
                            REKOMENDASI
                          </span>
                        </div>
                      )}

                      <div>
                        {/* Package Name & Target */}
                        <div className="mb-4">
                          <span className="text-xs font-mono font-semibold tracking-wider text-[#F20D0D] uppercase block mb-1">
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
                          <span className="text-[11px] font-mono text-[#8E8D89] light:text-[#737373] uppercase tracking-wider block mb-2 font-medium">
                            Fitur Utama Termasuk:
                          </span>
                          {pkg.features.map((feature, fIdx) => (
                            <div
                              key={fIdx}
                              className="flex items-start gap-2.5 text-xs text-[#CCCCCC] light:text-[#444444]"
                            >
                              <Check className="w-3.5 h-3.5 text-[#F20D0D] shrink-0 mt-0.5" />
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
                            className={`btn-pulse w-full py-3 px-4 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm group cursor-pointer ${
                              isStandard
                                ? 'bg-[#F20D0D] text-white hover:bg-[#d40b0b] shadow-md shadow-[#F20D0D]/20'
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
            Domain &amp; hosting dijelaskan secara transparan sesuai paket. Sistem pembayaran DP 50% di awal dan 50% sebelum serah terima final.
          </p>
        </div>
      </div>
    </section>
  );
};
