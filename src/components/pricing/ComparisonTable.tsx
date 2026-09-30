import React from 'react';
import { motion } from 'framer-motion';
import { Check, Minus } from 'lucide-react';
import { ServicePackageFeature, ServicePackageItem } from '../../data/servicePricing';

interface ComparisonTableProps {
  packages: ServicePackageItem[];
  features: ServicePackageFeature[];
  onSelectPackage: (pkg: ServicePackageItem) => void;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  packages,
  features,
  onSelectPackage,
}) => {
  if (!features || features.length === 0) return null;

  const renderValue = (val: string | boolean) => {
    if (typeof val === 'boolean') {
      return val ? (
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#B89B72]/15 text-[#B89B72]">
          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
        </span>
      ) : (
        <span className="inline-flex items-center justify-center text-[#555552] light:text-[#B5B2AA]">
          <Minus className="w-3.5 h-3.5" />
        </span>
      );
    }
    return (
      <span className="font-mono text-xs text-[#F7F7F5] light:text-[#171717] font-medium">
        {val}
      </span>
    );
  };

  const starterPkg = packages[0];
  const proPkg = packages[1];
  const premiumPkg = packages[2];

  return (
    <div className="mt-24 pt-16 border-t border-[#242421] light:border-[#EAE7E1]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="text-center max-w-2xl mx-auto mb-12"
      >
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#B89B72] block mb-2 font-medium">
          DETAILED OVERVIEW
        </span>
        <h3 className="text-2xl sm:text-3xl font-editorial font-normal text-[#F7F7F5] light:text-[#171717]">
          Compare packages
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-[#8E8D89] light:text-[#737373]">
          Compare features side-by-side to choose the right level of service.
        </p>
      </motion.div>

      {/* Responsive Comparison Table Container */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="rounded-2xl border border-[#282825] light:border-[#E3E0D8] bg-[#141413]/70 light:bg-[#FFFFFF] backdrop-blur-sm overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[620px]">
            {/* Table Header */}
            <thead>
              <tr className="border-b border-[#282825] light:border-[#E3E0D8] bg-[#191917] light:bg-[#F9F8F5]">
                <th className="py-4 px-6 text-xs font-mono uppercase tracking-wider text-[#8E8D89] light:text-[#737373] w-2/5">
                  Feature
                </th>
                <th className="py-4 px-4 text-center text-xs font-mono font-medium text-[#F7F7F5] light:text-[#171717] w-1/5">
                  <div>{starterPkg?.name || 'Starter'}</div>
                  <div className="text-[11px] font-normal text-[#B89B72]">
                    {starterPkg?.price}
                  </div>
                </th>
                <th className="py-4 px-4 text-center text-xs font-mono font-medium text-[#F7F7F5] light:text-[#171717] w-1/5">
                  <div>{proPkg?.name || 'Pro'}</div>
                  <div className="text-[11px] font-normal text-[#B89B72]">
                    {proPkg?.price}
                  </div>
                </th>
                <th className="py-4 px-4 text-center text-xs font-mono font-medium text-[#F7F7F5] light:text-[#171717] w-1/5 bg-[#B89B72]/5">
                  <div className="text-[#B89B72] font-semibold">
                    {premiumPkg?.name || 'Premium'}
                  </div>
                  <div className="text-[11px] font-normal text-[#B89B72]">
                    {premiumPkg?.price}
                  </div>
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-[#22221F] light:divide-[#EFECE5] text-xs">
              {features.map((feat, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-[#1A1A18]/50 light:hover:bg-[#F9F8F5]/80 transition-colors"
                >
                  <td className="py-3.5 px-6 font-medium text-[#DCDAD5] light:text-[#333333]">
                    {feat.name}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {renderValue(feat.starter)}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {renderValue(feat.pro)}
                  </td>
                  <td className="py-3.5 px-4 text-center bg-[#B89B72]/5">
                    {renderValue(feat.premium)}
                  </td>
                </tr>
              ))}
            </tbody>

            {/* Table Footer with CTAs */}
            <tfoot>
              <tr className="border-t border-[#282825] light:border-[#E3E0D8] bg-[#191917]/50 light:bg-[#F9F8F5]/50">
                <td className="py-4 px-6 text-xs text-[#8E8D89] light:text-[#737373]">
                  Select package to order
                </td>
                <td className="py-4 px-4 text-center">
                  {starterPkg && (
                    <button
                      onClick={() => onSelectPackage(starterPkg)}
                      className="px-3 py-1.5 rounded-lg text-[11px] font-mono font-medium text-[#B89B72] hover:text-[#0A0A09] hover:bg-[#B89B72] transition-colors border border-[#B89B72]/40"
                    >
                      Choose →
                    </button>
                  )}
                </td>
                <td className="py-4 px-4 text-center">
                  {proPkg && (
                    <button
                      onClick={() => onSelectPackage(proPkg)}
                      className="px-3 py-1.5 rounded-lg text-[11px] font-mono font-medium text-[#B89B72] hover:text-[#0A0A09] hover:bg-[#B89B72] transition-colors border border-[#B89B72]/40"
                    >
                      Choose →
                    </button>
                  )}
                </td>
                <td className="py-4 px-4 text-center bg-[#B89B72]/5">
                  {premiumPkg && (
                    <button
                      onClick={() => onSelectPackage(premiumPkg)}
                      className="px-3 py-1.5 rounded-lg text-[11px] font-mono font-medium text-[#0A0A09] bg-[#B89B72] hover:bg-[#A6885E] transition-colors shadow-sm"
                    >
                      Choose →
                    </button>
                  )}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </motion.div>
    </div>
  );
};
