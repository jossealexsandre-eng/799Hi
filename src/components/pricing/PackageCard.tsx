import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X as XIcon, ArrowRight, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { ServicePackageItem } from '../../data/servicePricing';

interface PackageCardProps {
  pkg: ServicePackageItem;
  index: number;
  onSelect: (pkg: ServicePackageItem) => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({
  pkg,
  index,
  onSelect,
}) => {
  const [mobileExpanded, setMobileExpanded] = useState(false);

  // Stagger delays per specification: Starter (0), Pro (0.08), Premium (0.16)
  const delay = index === 0 ? 0 : index === 1 ? 0.08 : 0.16;
  const isPremium = pkg.badge === 'MOST COMPLETE';
  const isPopular = pkg.badge === 'POPULAR';

  // For mobile collapsible: show first 5 features if not expanded
  const visibleFeatures = mobileExpanded ? pkg.features : pkg.features.slice(0, 5);
  const hasHiddenFeatures = pkg.features.length > 5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        delay,
        duration: 0.55,
        type: 'spring',
        stiffness: 260,
        damping: 24,
      }}
      whileHover={{ y: -4 }}
      className={`group relative rounded-2xl flex flex-col justify-between transition-all duration-300 p-7 sm:p-8 ${
        isPremium
          ? 'bg-[#151412] light:bg-[#FFFFFF] border-2 border-[#B89B72]/70 light:border-[#B89B72] shadow-lg shadow-[#B89B72]/5'
          : isPopular
          ? 'bg-[#141413] light:bg-[#FFFFFF] border border-[#B89B72]/50 light:border-[#B89B72]/60 shadow-md'
          : 'bg-[#141413] light:bg-[#FFFFFF] border border-[#282825] light:border-[#E3E0D8] hover:border-[#3E3E3A] light:hover:border-[#C5C2BA]'
      }`}
    >
      {/* Top Badge */}
      {pkg.badge && (
        <div className="absolute -top-3.5 left-7">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.16em] font-semibold bg-[#B89B72] text-[#0A0A09] shadow-sm">
            {isPremium && <Sparkles className="w-3 h-3" />}
            {pkg.badge}
          </span>
        </div>
      )}

      <div>
        {/* Package Header */}
        <div className="pt-1 mb-5 pb-5 border-b border-[#242421] light:border-[#EAE7E1]">
          <span className="text-xs font-mono font-medium uppercase tracking-[0.15em] text-[#8E8D89] light:text-[#737373]">
            {pkg.name}
          </span>

          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-3xl sm:text-4xl font-editorial font-normal tracking-tight text-[#F7F7F5] light:text-[#171717]">
              {pkg.price}
            </span>
          </div>

          <p className="mt-2 text-xs font-medium text-[#B89B72]">
            {pkg.subtitle}
          </p>

          {pkg.description && (
            <p className="mt-2 text-xs text-[#8E8D89] light:text-[#737373] leading-relaxed">
              {pkg.description}
            </p>
          )}
        </div>

        {/* Benefit / Feature List */}
        <div className="mb-6">
          <span className="block text-[11px] font-mono uppercase tracking-wider text-[#8E8D89] light:text-[#737373] mb-3">
            Includes:
          </span>

          <ul className="space-y-2.5">
            {visibleFeatures.map((feat, idx) => {
              const isHighlight = feat.startsWith('Includes everything') || feat.startsWith('Up to');
              return (
                <li
                  key={idx}
                  className={`text-xs flex items-start gap-2.5 leading-relaxed ${
                    isHighlight
                      ? 'text-[#F7F7F5] light:text-[#171717] font-medium'
                      : 'text-[#C5C4C0] light:text-[#4F4F4F]'
                  }`}
                >
                  <Check className="w-3.5 h-3.5 text-[#B89B72] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              );
            })}
          </ul>

          {/* Not Included Section (if present) */}
          {pkg.notIncluded && pkg.notIncluded.length > 0 && (
            <div className="mt-4 pt-3 border-t border-[#242421]/60 light:border-[#EAE7E1]">
              <span className="block text-[11px] font-mono uppercase tracking-wider text-[#737373] light:text-[#8E8D89] mb-2">
                Not included:
              </span>
              <ul className="space-y-1.5">
                {pkg.notIncluded.map((notFeat, idx) => (
                  <li
                    key={idx}
                    className="text-xs text-[#6E6E6B] light:text-[#8E8D89] flex items-center gap-2"
                  >
                    <XIcon className="w-3 h-3 text-[#6E6E6B] shrink-0" />
                    <span>{notFeat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Mobile Collapsible Toggle */}
          {hasHiddenFeatures && (
            <button
              onClick={() => setMobileExpanded(!mobileExpanded)}
              className="sm:hidden mt-3 inline-flex items-center gap-1.5 text-xs text-[#B89B72] font-medium hover:underline focus:outline-none"
            >
              {mobileExpanded ? (
                <>
                  <span>Hide extra features</span>
                  <ChevronUp className="w-3.5 h-3.5" />
                </>
              ) : (
                <>
                  <span>View all {pkg.features.length} features ↓</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Card Footer & CTA */}
      <div className="pt-5 border-t border-[#242421] light:border-[#EAE7E1]">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelect(pkg)}
          className={`w-full group/btn py-3.5 px-5 rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
            isPremium
              ? 'bg-[#B89B72] hover:bg-[#A6885E] text-[#0A0A09] shadow-sm'
              : isPopular
              ? 'bg-[#22221F] light:bg-[#171717] hover:bg-[#B89B72] hover:text-[#0A0A09] text-[#F7F7F5] light:text-[#FFFFFF]'
              : 'bg-[#1C1C1A] light:bg-[#F2EFE9] hover:bg-[#B89B72] hover:text-[#0A0A09] text-[#F7F7F5] light:text-[#171717]'
          }`}
        >
          <span>{pkg.ctaText}</span>
          <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1.5 transition-transform duration-200" />
        </motion.button>

        {pkg.disclaimerNote && (
          <p className="mt-2.5 text-[11px] text-center text-[#737373] light:text-[#8E8D89] leading-snug">
            {pkg.disclaimerNote}
          </p>
        )}
      </div>
    </motion.div>
  );
};
