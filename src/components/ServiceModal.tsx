import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Clock, Tag, ArrowRight, MessageSquare } from 'lucide-react';
import { ServiceItem } from '../types';
import { getWhatsAppLink } from '../data/content';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onSelectService: (serviceName: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  onClose,
  onSelectService,
}) => {
  if (!service) return null;

  const whatsappMessage = `Hi 799Hi! I'm interested in the ${service.title} Website service. Could we discuss?`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-[#141413] light:bg-[#FFFFFF] border border-[#282825] light:border-[#E3E0D8] rounded-2xl p-6 sm:p-8 text-[#F7F7F5] light:text-[#171717] shadow-2xl z-10 my-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-lg text-[#8E8D89] hover:text-[#F7F7F5] light:text-[#737373] light:hover:text-[#171717] hover:bg-[#1E1E1C] light:hover:bg-[#EFEDE8] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-semibold text-[#B89B72]">
                {service.number} / SERVICE SPECIFICATION
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-editorial font-normal mb-2">
              {service.title} Website
            </h3>
            <p className="text-sm text-[#8E8D89] light:text-[#737373] leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Key Metrics Overview */}
          <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-xl bg-[#1A1A18] light:bg-[#F7F7F5] border border-[#282825] light:border-[#E3E0D8]">
            <div className="flex items-center gap-2.5">
              <Tag className="w-4 h-4 text-[#B89B72] shrink-0" />
              <div>
                <span className="block text-[11px] text-[#8E8D89] light:text-[#737373]">
                  Starting Price
                </span>
                <span className="text-sm font-semibold text-[#F7F7F5] light:text-[#171717]">
                  {service.startingPrice}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#B89B72] shrink-0" />
              <div>
                <span className="block text-[11px] text-[#8E8D89] light:text-[#737373]">
                  Estimated Timeline
                </span>
                <span className="text-sm font-semibold text-[#F7F7F5] light:text-[#171717]">
                  {service.typicalTimeline}
                </span>
              </div>
            </div>
          </div>

          {/* Deliverables Breakdown */}
          <div className="mb-6">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#B89B72] mb-3">
              Included Deliverables
            </h4>
            <div className="space-y-2">
              {service.deliverables.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#CCCCCC] light:text-[#444444]">
                  <Check className="w-4 h-4 text-[#B89B72] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ideal For */}
          <div className="mb-8">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8E8D89] light:text-[#737373] mb-2.5">
              Ideal Audience
            </h4>
            <div className="flex flex-wrap gap-2">
              {service.idealFor.map((audience, i) => (
                <span
                  key={i}
                  className="text-xs px-2.5 py-1 rounded bg-[#1D1D1B] light:bg-[#EFEDE8] text-[#8E8D89] light:text-[#737373] border border-[#282825] light:border-[#E3E0D8]"
                >
                  {audience}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-[#282825] light:border-[#E3E0D8]">
            <a
              href={getWhatsAppLink(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 py-3 px-4 rounded-full bg-[#25D366] text-white text-xs font-semibold tracking-wide flex items-center justify-center gap-2 hover:bg-[#20BE5B] transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Discuss via WhatsApp</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onSelectService(service.title);
              }}
              className="w-full sm:w-auto py-3 px-6 rounded-full bg-[#F7F7F5] light:bg-[#171717] text-[#0F0F0E] light:text-[#F7F7F5] text-xs font-semibold tracking-wide hover:bg-white light:hover:bg-black transition-colors flex items-center justify-center gap-2"
            >
              <span>Fill Project Form</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
