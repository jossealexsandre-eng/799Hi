import React from 'react';
import { motion } from 'framer-motion';
import { Check, Minus, ArrowRight } from 'lucide-react';
import { ServicePackageFeature, ServicePackageItem } from '../../data/servicePricing';

interface ComparisonTableProps {
  packages: ServicePackageItem[];
  features: ServicePackageFeature[];
  selectedPackageId?: string;
  onSelectPackage: (pkg: ServicePackageItem) => void;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  packages,
  features,
  selectedPackageId,
  onSelectPackage,
}) => {
  if (!features || features.length === 0) return null;

  const renderValue = (val: string | boolean) => {
    if (typeof val === 'boolean') {
      return val ? (
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#F20D0D]/15 text-[#F20D0D]">
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
    <div className="mt-20 pt-16 border-t border-[#242421] light:border-[#EAE7E1]">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="text-center max-w-2xl mx-auto mb-10"
      >
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#F20D0D] block mb-2 font-medium">
          PERBANDINGAN LENGKAP
        </span>
        <h3 className="text-2xl sm:text-3xl font-editorial font-normal text-[#F7F7F5] light:text-[#171717]">
          Bandingkan Fitur Antar Paket
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-[#8E8D89] light:text-[#737373]">
          Lihat perbandingan fitur secara berdampingan untuk memilih tingkat layanan yang paling sesuai.
        </p>
      </motion.div>

      {/* Mobile swipe hint */}
      <div className="sm:hidden text-center mb-3 text-[11px] font-mono text-[#8E8D89] light:text-[#737373] flex items-center justify-center gap-1.5">
        <span>← Geser ke samping untuk melihat tabel →</span>
      </div>

      {/* Comparison Table Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="rounded-2xl border border-[#282825] light:border-[#E3E0D8] bg-[#141413]/70 light:bg-[#FFFFFF] backdrop-blur-sm overflow-hidden shadow-sm"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[620px]">
            {/* Table Header */}
            <thead>
              <tr className="border-b border-[#282825] light:border-[#E3E0D8] bg-[#191917] light:bg-[#F9F8F5]">
                <th className="py-4 px-6 text-xs font-mono uppercase tracking-wider text-[#8E8D89] light:text-[#737373] w-2/5 sticky left-0 bg-[#191917] light:bg-[#F9F8F5] z-10">
                  Fitur &amp; Kemampuan
                </th>
                <th className="py-4 px-4 text-center text-xs font-mono font-medium text-[#F7F7F5] light:text-[#171717] w-1/5">
                  <div className="font-semibold">{starterPkg?.name || 'Basic'}</div>
                  <div className="text-[11px] font-normal text-[#B8A99A]">
                    {starterPkg?.priceFormatted || starterPkg?.price}
                  </div>
                </th>
                <th className="py-4 px-4 text-center text-xs font-mono font-medium text-[#F7F7F5] light:text-[#171717] w-1/5 bg-[#F20D0D]/5 border-x border-[#F20D0D]/20">
                  <div className="text-[#F20D0D] font-bold flex items-center justify-center gap-1">
                    <span>{proPkg?.name || 'Standard'}</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#F20D0D] text-white font-normal uppercase">
                      Rekomendasi
                    </span>
                  </div>
                  <div className="text-[11px] font-normal text-[#B8A99A]">
                    {proPkg?.priceFormatted || proPkg?.price}
                  </div>
                </th>
                <th className="py-4 px-4 text-center text-xs font-mono font-medium text-[#F7F7F5] light:text-[#171717] w-1/5">
                  <div className="font-semibold">{premiumPkg?.name || 'Premium'}</div>
                  <div className="text-[11px] font-normal text-[#B8A99A]">
                    {premiumPkg?.priceFormatted || premiumPkg?.price}
                  </div>
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-[#22221F] light:divide-[#EDEBE4]">
              {features.map((feature, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-[#1A1A18]/60 light:hover:bg-[#F9F8F5] transition-colors"
                >
                  <td className="py-3.5 px-6 text-xs text-[#E0DFDC] light:text-[#2A2A2A] font-medium sticky left-0 bg-[#141413]/95 light:bg-[#FFFFFF]/95 z-10 backdrop-blur-xs">
                    {feature.name}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {renderValue(feature.starter)}
                  </td>
                  <td className="py-3.5 px-4 text-center bg-[#F20D0D]/5 border-x border-[#F20D0D]/10">
                    {renderValue(feature.pro)}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {renderValue(feature.premium)}
                  </td>
                </tr>
              ))}
            </tbody>

            {/* Table Footer Actions */}
            <tfoot>
              <tr className="border-t border-[#282825] light:border-[#E3E0D8] bg-[#191917]/50 light:bg-[#F9F8F5]/60">
                <td className="py-4 px-6 text-xs text-[#8E8D89] light:text-[#737373] sticky left-0 bg-[#191917] light:bg-[#F9F8F5] z-10">
                  Pilih paket yang sesuai kebutuhan:
                </td>
                <td className="py-4 px-4 text-center">
                  {starterPkg && (
                    <button
                      onClick={() => onSelectPackage(starterPkg)}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                        selectedPackageId === starterPkg.id
                          ? 'bg-[#F20D0D] border-[#F20D0D] text-white font-medium'
                          : 'border-[#333] light:border-[#CCC] text-[#AAA] light:text-[#555] hover:border-[#F20D0D] hover:text-[#F20D0D]'
                      }`}
                    >
                      {selectedPackageId === starterPkg.id ? '✓ Dipilih' : 'Pilih'}
                    </button>
                  )}
                </td>
                <td className="py-4 px-4 text-center bg-[#F20D0D]/5 border-x border-[#F20D0D]/20">
                  {proPkg && (
                    <button
                      onClick={() => onSelectPackage(proPkg)}
                      className={`text-xs px-4 py-1.5 rounded-lg transition-all cursor-pointer ${
                        selectedPackageId === proPkg.id
                          ? 'bg-[#F20D0D] text-white font-semibold shadow-sm'
                          : 'bg-[#F20D0D] hover:bg-[#d40b0b] text-white font-medium shadow-sm'
                      }`}
                    >
                      {selectedPackageId === proPkg.id ? '✓ Dipilih' : 'Pilih'}
                    </button>
                  )}
                </td>
                <td className="py-4 px-4 text-center">
                  {premiumPkg && (
                    <button
                      onClick={() => onSelectPackage(premiumPkg)}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                        selectedPackageId === premiumPkg.id
                          ? 'bg-[#F20D0D] border-[#F20D0D] text-white font-medium'
                          : 'border-[#333] light:border-[#CCC] text-[#AAA] light:text-[#555] hover:border-[#F20D0D] hover:text-[#F20D0D]'
                      }`}
                    >
                      {selectedPackageId === premiumPkg.id ? '✓ Dipilih' : 'Pilih'}
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
