import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X as XIcon, ArrowRight, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';
import { ServicePackageItem } from '../../data/servicePricing';

interface PackageCardProps {
  pkg: ServicePackageItem;
  index: number;
  isSelected?: boolean;
  onSelect: (pkg: ServicePackageItem) => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({
  pkg,
  index,
  isSelected = false,
  onSelect,
}) => {
  const [mobileExpanded, setMobileExpanded] = useState(false);

  // Stagger delays
  const delay = index === 0 ? 0 : index === 1 ? 0.08 : 0.16;
  const isRecommended = pkg.badge === 'Rekomendasi' || pkg.tier === 'standard';
  const isPremium = pkg.tier === 'premium';

  // For mobile collapsible: show first 6 features if not expanded
  const visibleFeatures = mobileExpanded ? pkg.features : pkg.features.slice(0, 6);
  const hasHiddenFeatures = pkg.features.length > 6;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        delay,
        duration: 0.5,
        type: 'spring',
        stiffness: 260,
        damping: 24,
      }}
      className={`group relative rounded-2xl flex flex-col justify-between transition-all duration-300 p-7 sm:p-8 ${
        isSelected
          ? 'bg-[#181816] light:bg-[#FFFFFF] ring-2 ring-[#F20D0D] shadow-xl shadow-[#F20D0D]/10'
          : isRecommended
          ? 'bg-[#151413] light:bg-[#FFFFFF] border-2 border-[#F20D0D]/60 light:border-[#F20D0D]/70 shadow-md'
          : isPremium
          ? 'bg-[#141413] light:bg-[#FFFFFF] border border-[#721B1B]/60 light:border-[#B8A99A]/80 shadow-sm'
          : 'bg-[#141413] light:bg-[#FFFFFF] border border-[#282825] light:border-[#E3E0D8] hover:border-[#3E3E3A] light:hover:border-[#C5C2BA]'
      }`}
    >
      {/* Top Badge */}
      {pkg.badge && (
        <div className="absolute -top-3.5 left-7">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.16em] font-semibold shadow-sm ${
              isRecommended
                ? 'bg-[#F20D0D] text-white'
                : 'bg-[#721B1B] text-white dark:bg-[#F20D0D]/20 dark:text-[#F20D0D] dark:border dark:border-[#F20D0D]/30'
            }`}
          >
            {pkg.badge}
          </span>
        </div>
      )}

      {/* Selected Indicator Badge */}
      {isSelected && (
        <div className="absolute -top-3.5 right-7">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold bg-emerald-500 text-white shadow-sm">
            <Check className="w-3 h-3 stroke-[3]" />
            <span>Dipilih</span>
          </span>
        </div>
      )}

      <div>
        {/* Package Header */}
        <div className="pt-1 mb-5 pb-5 border-b border-[#242421] light:border-[#EAE7E1]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold uppercase tracking-[0.15em] text-[#8E8D89] light:text-[#737373]">
              {pkg.name}
            </span>
            <span className="text-[11px] font-mono text-[#F20D0D] font-medium">
              {pkg.revisions}
            </span>
          </div>

          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-3xl sm:text-4xl font-editorial font-normal tracking-tight text-[#F7F7F5] light:text-[#171717]">
              {pkg.priceFormatted || pkg.price}
            </span>
          </div>

          <p className="mt-2 text-xs font-medium text-[#B8A99A]">
            {pkg.subtitle}
          </p>

          {pkg.description && (
            <p className="mt-2 text-xs text-[#8E8D89] light:text-[#737373] leading-relaxed">
              {pkg.description}
            </p>
          )}

          {/* Limits Summary Pill */}
          <div className="mt-3.5 inline-block px-2.5 py-1 rounded-md bg-[#1B1B19] light:bg-[#F4F2EC] text-[11px] font-mono text-[#AAA] light:text-[#555] border border-[#282824] light:border-[#E5E1D7]">
            {pkg.limitsSummary}
          </div>
        </div>

        {/* Feature List */}
        <div className="mb-6">
          <span className="block text-[11px] font-mono uppercase tracking-wider text-[#8E8D89] light:text-[#737373] mb-3">
            Fitur Termasuk:
          </span>

          <ul className="space-y-2.5">
            {visibleFeatures.map((feat, idx) => {
              const isHighlight =
                feat.startsWith('Mencakup') ||
                feat.startsWith('Gratis') ||
                feat.startsWith('Halaman berita');

              return (
                <li
                  key={idx}
                  className={`text-xs flex items-start gap-2.5 leading-relaxed ${
                    isHighlight
                      ? 'text-[#F7F7F5] light:text-[#171717] font-medium'
                      : 'text-[#C5C4C0] light:text-[#4F4F4F]'
                  }`}
                >
                  <span className="mt-0.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#F20D0D]/15 text-[#F20D0D] shrink-0">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </span>
                  <span>{feat}</span>
                </li>
              );
            })}
          </ul>

          {/* Mobile Collapsible Toggle */}
          {hasHiddenFeatures && (
            <button
              onClick={() => setMobileExpanded(!mobileExpanded)}
              className="mt-3 text-xs font-mono text-[#F20D0D] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{mobileExpanded ? 'Tutup rincian' : `Lihat +${pkg.features.length - 6} fitur lainnya`}</span>
              {mobileExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          )}

          {/* Not Included Section (if any) */}
          {pkg.notIncluded && pkg.notIncluded.length > 0 && (
            <div className="mt-4 pt-3 border-t border-[#242421] light:border-[#EAE7E1]">
              <span className="block text-[10px] font-mono uppercase tracking-wider text-[#777] light:text-[#888] mb-1.5">
                Tidak Termasuk:
              </span>
              <ul className="space-y-1">
                {pkg.notIncluded.map((item, idx) => (
                  <li key={idx} className="text-[11px] text-[#777] light:text-[#888] flex items-center gap-2">
                    <XIcon className="w-3 h-3 text-[#555] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Card Action Button */}
      <div className="pt-4 border-t border-[#242421] light:border-[#EAE7E1]">
        {pkg.disclaimerNote && (
          <p className="text-[10px] text-[#777] light:text-[#888] mb-3 leading-relaxed">
            {pkg.disclaimerNote}
          </p>
        )}

        <button
          onClick={() => onSelect(pkg)}
          className={`w-full py-3.5 px-5 rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
            isSelected
              ? 'bg-[#F20D0D] text-white shadow-md'
              : isRecommended
              ? 'bg-[#F20D0D] hover:bg-[#d40b0b] text-white shadow-md'
              : 'bg-[#1E1E1C] light:bg-[#EBE8E0] text-[#F7F7F5] light:text-[#171717] hover:bg-[#282824] light:hover:bg-[#DFDBD0]'
          }`}
        >
          <span>{isSelected ? '✓ Paket Terpilih' : pkg.ctaText || 'Pilih Paket'}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};
