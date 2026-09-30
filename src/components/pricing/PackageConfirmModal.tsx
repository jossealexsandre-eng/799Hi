import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, MessageCircle } from 'lucide-react';
import { ServicePackageItem, buildWhatsAppUrl } from '../../data/servicePricing';

interface PackageConfirmModalProps {
  isOpen: boolean;
  serviceTitle: string;
  categoryName: string;
  selectedPackage: ServicePackageItem | null;
  onClose: () => void;
}

export const PackageConfirmModal: React.FC<PackageConfirmModalProps> = ({
  isOpen,
  serviceTitle,
  categoryName,
  selectedPackage,
  onClose,
}) => {
  if (!selectedPackage) return null;

  const handleWhatsAppRedirect = () => {
    const url = buildWhatsAppUrl(
      categoryName,
      selectedPackage.name,
      selectedPackage.price
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0A0A09]/80 backdrop-blur-sm"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg rounded-2xl bg-[#141413] light:bg-[#FFFFFF] border border-[#282825] light:border-[#E3E0D8] p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
          >
            {/* Subtle top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#B89B72] to-transparent opacity-80" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full text-[#8E8D89] hover:text-[#F7F7F5] light:hover:text-[#171717] hover:bg-[#20201D] light:hover:bg-[#F0EFEA] transition-colors"
              aria-label="Close confirmation"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="mb-6">
              <span className="inline-block text-[11px] font-mono uppercase tracking-[0.18em] text-[#B89B72] mb-2 font-medium">
                {categoryName} Website Inquiry
              </span>
              <h3 className="text-2xl font-editorial font-normal text-[#F7F7F5] light:text-[#171717] mb-1">
                {selectedPackage.name} Package Selected
              </h3>
              <p className="text-lg font-mono font-medium text-[#B89B72]">
                {categoryName} Website — {selectedPackage.price}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#1A1A18] light:bg-[#F7F7F5] border border-[#262623] light:border-[#EAE7E1] mb-6">
              <p className="text-sm text-[#CCCCCC] light:text-[#4A4A4A] leading-relaxed">
                "You've selected the <span className="font-semibold text-[#F7F7F5] light:text-[#171717]">{selectedPackage.name}</span> package. Let's discuss your project."
              </p>
              <div className="mt-3 pt-3 border-t border-[#262623] light:border-[#E3E0D8] text-xs text-[#8E8D89] light:text-[#737373]">
                {selectedPackage.disclaimerNote || 'Domain & hosting not included.'}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleWhatsAppRedirect}
                className="flex-1 group flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl bg-[#B89B72] hover:bg-[#A6885E] text-[#0A0A09] font-medium text-sm transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Continue to WhatsApp</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={onClose}
                className="px-5 py-3.5 rounded-xl bg-transparent hover:bg-[#20201D] light:hover:bg-[#EAE7E1] border border-[#2E2E2A] light:border-[#D5D2C9] text-sm text-[#8E8D89] light:text-[#555555] hover:text-[#F7F7F5] light:hover:text-[#171717] transition-all"
              >
                Change Package
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
