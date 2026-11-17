import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  Plus,
  Minus,
  Sparkles,
  MessageCircle,
  HelpCircle,
  Info,
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import {
  AddOnItem,
  OFFICIAL_ADD_ONS,
  ServicePackageItem,
  formatIDR,
  buildDynamicWhatsAppUrl,
} from '../../data/servicePricing';

interface AddOnEstimatorProps {
  serviceSlug: string;
  serviceTitle: string;
  packages: ServicePackageItem[];
  selectedPackage: ServicePackageItem;
  onSelectPackage: (pkg: ServicePackageItem) => void;
}

export const AddOnEstimator: React.FC<AddOnEstimatorProps> = ({
  serviceSlug,
  serviceTitle,
  packages,
  selectedPackage,
  onSelectPackage,
}) => {
  // Selected add-on IDs (set of IDs)
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);
  const [clientNotes, setClientNotes] = useState<string>('');

  // Filter add-ons compatible with this service
  const compatibleAddOns = useMemo(() => {
    return OFFICIAL_ADD_ONS.filter((addon) => {
      if (addon.compatibleServices.length === 0) return true;
      return addon.compatibleServices.includes(serviceSlug);
    });
  }, [serviceSlug]);

  // Check if an add-on is already included in the selected package
  const isIncludedInPackage = (addon: AddOnItem): boolean => {
    if (!addon.includedInPackages) return false;
    return addon.includedInPackages.some(
      (inc) =>
        inc.serviceId === serviceSlug &&
        (inc.packageId === selectedPackage.id || inc.packageId === selectedPackage.tier)
    );
  };

  // Toggle add-on selection
  const handleToggleAddOn = (addonId: string) => {
    setSelectedAddOnIds((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    );
  };

  // Calculations
  const { oneTimeAddOnsTotal, monthlyMaintenance, hasQuotationAddOn, selectedAddOnNames } =
    useMemo(() => {
      let oneTime = 0;
      let monthly = 0;
      let quotation = false;
      const names: string[] = [];

      selectedAddOnIds.forEach((id) => {
        const item = OFFICIAL_ADD_ONS.find((a) => a.id === id);
        if (!item) return;

        // If included in package, no extra charge
        if (isIncludedInPackage(item)) return;

        if (item.priceType === 'one-time') {
          oneTime += item.price;
          names.push(`${item.name} (+${formatIDR(item.price)})`);
        } else if (item.priceType === 'recurring') {
          monthly += item.price;
          names.push(`${item.name} (${formatIDR(item.price)}/bln)`);
        } else if (item.priceType === 'quotation') {
          quotation = true;
          names.push(`${item.name} (By Quotation)`);
        }
      });

      return {
        oneTimeAddOnsTotal: oneTime,
        monthlyMaintenance: monthly,
        hasQuotationAddOn: quotation,
        selectedAddOnNames: names,
      };
    }, [selectedAddOnIds, selectedPackage, serviceSlug]);

  // Total estimate calculation
  const totalOneTimeEstimate = selectedPackage.price + oneTimeAddOnsTotal;

  const totalEstimateFormatted = useMemo(() => {
    if (selectedPackage.isStartingPrice) {
      const prefix = selectedPackage.pricePrefix || 'Mulai ';
      return `${prefix}${formatIDR(totalOneTimeEstimate)}`;
    }
    return formatIDR(totalOneTimeEstimate);
  }, [selectedPackage, totalOneTimeEstimate]);

  const monthlyFormatted = useMemo(() => {
    if (monthlyMaintenance > 0) {
      return `${formatIDR(monthlyMaintenance)}/bulan`;
    }
    return null;
  }, [monthlyMaintenance]);

  // WhatsApp link generator
  const whatsAppUrl = useMemo(() => {
    return buildDynamicWhatsAppUrl({
      serviceName: serviceTitle,
      packageName: selectedPackage.name,
      packagePrice: selectedPackage.priceFormatted,
      addOns: selectedAddOnNames,
      totalEstimate: totalEstimateFormatted,
      monthlyNote: monthlyFormatted ? `Biaya bulanan: ${monthlyFormatted}` : undefined,
      notes: clientNotes,
    });
  }, [
    serviceTitle,
    selectedPackage,
    selectedAddOnNames,
    totalEstimateFormatted,
    monthlyFormatted,
    clientNotes,
  ]);

  const handleOpenWhatsApp = () => {
    window.open(whatsAppUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="customizer-section" className="mt-20 pt-16 border-t border-[#242421] light:border-[#EAE7E1]">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto text-center mb-12"
      >
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#F20D0D] block mb-2 font-medium">
          KUSTOMISASI &amp; ESTIMATOR HARGA
        </span>
        <h3 className="text-3xl sm:text-4xl font-editorial font-normal text-[#F7F7F5] light:text-[#171717] mb-3">
          Make It Yours.
        </h3>
        <p className="text-xs sm:text-sm text-[#8E8D89] light:text-[#737373] italic">
          Customize your website with additional features.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left: Package Picker & Add-ons Checklist */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Package Selector Tabs */}
          <div className="p-5 rounded-2xl bg-[#141413] light:bg-[#FFFFFF] border border-[#282825] light:border-[#E3E0D8]">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#8E8D89] light:text-[#737373] block mb-3 font-semibold">
              1. Pilih Paket Dasar:
            </span>
            <div className="grid grid-cols-3 gap-2">
              {packages.map((pkg) => {
                const isActive = pkg.id === selectedPackage.id;
                return (
                  <button
                    key={pkg.id}
                    onClick={() => onSelectPackage(pkg)}
                    className={`py-3 px-2 sm:px-4 rounded-xl text-center transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-[#F20D0D] border-[#F20D0D] text-white shadow-sm'
                        : 'bg-[#1A1A18] light:bg-[#F7F7F5] border-[#2A2A26] light:border-[#E3E0D8] text-[#AAA] light:text-[#555] hover:border-[#F20D0D]/40'
                    }`}
                  >
                    <div className="text-xs font-semibold">{pkg.name}</div>
                    <div className="text-[11px] font-mono mt-0.5 opacity-90">
                      {pkg.priceFormatted}
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="mt-3 text-[11px] text-[#8E8D89] light:text-[#737373] flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-[#F20D0D] shrink-0" />
              <span>{selectedPackage.subtitle}</span>
            </div>
          </div>

          {/* Step 2: Add-ons Selector */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#141413] light:bg-[#FFFFFF] border border-[#282825] light:border-[#E3E0D8]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#8E8D89] light:text-[#737373] font-semibold">
                2. Tambahkan Fitur Pilihan (Add-ons):
              </span>
              <span className="text-[11px] text-[#8E8D89] light:text-[#737373]">
                {selectedAddOnIds.length} dipilih
              </span>
            </div>

            <div className="space-y-3">
              {compatibleAddOns.map((addon) => {
                const isChecked = selectedAddOnIds.includes(addon.id);
                const isIncluded = isIncludedInPackage(addon);

                return (
                  <label
                    key={addon.id}
                    className={`flex items-start justify-between gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isIncluded
                        ? 'bg-[#181816]/50 light:bg-[#F9F8F5] border-[#2A2A26]/50 light:border-[#E5E1D7] opacity-80 cursor-default'
                        : isChecked
                        ? 'bg-[#1F1D1A] light:bg-[#FFF9F9] border-[#F20D0D]/60 shadow-xs'
                        : 'bg-[#181816] light:bg-[#F9F8F5] border-[#262623] light:border-[#EAE7E1] hover:border-[#383834] light:hover:border-[#D0CCC2]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="pt-0.5">
                        <input
                          type="checkbox"
                          disabled={isIncluded}
                          checked={isIncluded || isChecked}
                          onChange={() => handleToggleAddOn(addon.id)}
                          className="w-4 h-4 rounded border-gray-600 text-[#F20D0D] focus:ring-[#F20D0D] focus:ring-offset-0 cursor-pointer disabled:cursor-not-allowed"
                        />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-[#F7F7F5] light:text-[#171717]">
                            {addon.name}
                          </span>
                          {addon.categoryBadge && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded-sm bg-[#222] light:bg-[#EBE8E0] text-[#888] light:text-[#666] font-mono">
                              {addon.categoryBadge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#8E8D89] light:text-[#737373] mt-0.5 leading-relaxed">
                          {addon.description}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0 pt-0.5">
                      {isIncluded ? (
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
                          Sudah Termasuk
                        </span>
                      ) : (
                        <span className="text-xs font-mono font-medium text-[#F20D0D]">
                          +{addon.priceFormatted}
                        </span>
                      )}
                    </div>
                  </label>
                );
              })}
            </div>

            {/* Step 3: Optional Client Notes */}
            <div className="mt-5 pt-4 border-t border-[#242421] light:border-[#EAE7E1]">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#8E8D89] light:text-[#737373] mb-2 font-semibold">
                3. Catatan Kebutuhan Khusus (Opsional):
              </label>
              <textarea
                value={clientNotes}
                onChange={(e) => setClientNotes(e.target.value)}
                placeholder="Contoh: Saya ingin tema warna monokrom dan butuh selesai dalam 5 hari..."
                rows={2}
                className="w-full text-xs p-3 rounded-xl bg-[#181816] light:bg-[#F9F8F5] border border-[#2A2A26] light:border-[#DED9CD] text-[#F7F7F5] light:text-[#171717] focus:outline-none focus:border-[#F20D0D] transition-colors resize-none placeholder:text-[#666]"
              />
            </div>
          </div>
        </div>

        {/* Right: Live Calculation & Direct Consultation Card */}
        <div className="lg:col-span-5 sticky top-20">
          <div className="p-6 sm:p-7 rounded-2xl bg-[#161614] light:bg-[#FFFFFF] border-2 border-[#F20D0D]/40 light:border-[#E3E0D8] shadow-xl">
            <span className="text-xs font-mono uppercase tracking-[0.16em] text-[#F20D0D] font-bold block mb-1">
              RINGKASAN ESTIMASI BIAYA
            </span>
            <h4 className="text-xl font-editorial font-normal text-[#F7F7F5] light:text-[#171717] mb-4">
              {serviceTitle}
            </h4>

            {/* Line items */}
            <div className="space-y-3 pb-4 mb-4 border-b border-[#262623] light:border-[#EAE7E1] text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#AAA] light:text-[#666]">
                  Paket {selectedPackage.name}
                </span>
                <span className="font-mono font-medium text-[#F7F7F5] light:text-[#171717]">
                  {selectedPackage.priceFormatted}
                </span>
              </div>

              {selectedAddOnIds.length > 0 && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#AAA] light:text-[#666]">
                    Add-ons Sekali Bayar ({selectedAddOnIds.filter((id) => {
                      const a = OFFICIAL_ADD_ONS.find(item => item.id === id);
                      return a && a.priceType === 'one-time' && !isIncludedInPackage(a);
                    }).length})
                  </span>
                  <span className="font-mono text-[#F20D0D] font-medium">
                    +{formatIDR(oneTimeAddOnsTotal)}
                  </span>
                </div>
              )}

              {/* Monthly maintenance row (if selected) */}
              {monthlyMaintenance > 0 && (
                <div className="flex items-center justify-between text-xs pt-1 border-t border-dashed border-[#262623] light:border-[#E3E0D8]">
                  <span className="text-amber-400 light:text-amber-700 font-medium flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Biaya Bulanan Opsional:</span>
                  </span>
                  <span className="font-mono text-amber-400 light:text-amber-700 font-medium">
                    {monthlyFormatted}
                  </span>
                </div>
              )}

              {/* Quotation item note */}
              {hasQuotationAddOn && (
                <div className="text-[11px] text-[#B8A99A] pt-1">
                  * Terdapat fitur kustom yang memerlukan konsultasi khusus.
                </div>
              )}
            </div>

            {/* Grand Total */}
            <div className="mb-6">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#8E8D89] light:text-[#737373] block mb-1">
                Estimasi Total Pembayaran Pembuatan:
              </span>
              <div className="text-3xl font-editorial font-normal tracking-tight text-[#F7F7F5] light:text-[#171717]">
                {totalEstimateFormatted}
              </div>
              <p className="text-[10px] text-[#777] light:text-[#888] mt-1.5 leading-relaxed">
                * Estimasi transparan berdasarkan pilihan paket &amp; add-on. Pembayaran DP 50% di awal dan pelunasan 50% sebelum publikasi.
              </p>
            </div>

            {/* Direct Consultation WhatsApp Button */}
            <button
              onClick={handleOpenWhatsApp}
              className="w-full py-4 px-6 rounded-xl bg-[#F20D0D] hover:bg-[#d40b0b] text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-[#F20D0D]/20 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Konsultasi via WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="mt-4 text-center">
              <span className="text-[11px] text-[#8E8D89] light:text-[#737373]">
                Pesan WhatsApp akan terisi otomatis dengan rincian di atas.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
