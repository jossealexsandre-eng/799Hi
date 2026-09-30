import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDemo: () => void;
  onStartProject: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  isOpen,
  onClose,
  onOpenDemo,
  onStartProject,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl bg-[#141413] light:bg-[#FFFFFF] border border-[#282825] light:border-[#E3E0D8] rounded-2xl p-6 sm:p-10 text-[#F7F7F5] light:text-[#171717] shadow-2xl z-10 my-8"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-lg text-[#8E8D89] hover:text-[#F7F7F5] light:text-[#737373] light:hover:text-[#171717] hover:bg-[#1E1E1C] light:hover:bg-[#EFEDE8] transition-colors"
            aria-label="Close case study"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2 text-xs font-mono text-[#B89B72]">
              <span>CASE STUDY / 01</span>
              <span>·</span>
              <span>WEDDING INVITATION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-editorial font-normal mb-2">
              Wedding Invitation
            </h2>
            <p className="text-sm sm:text-base text-[#8E8D89] light:text-[#737373] leading-relaxed">
              Elegant digital experiences for modern celebrations. A custom digital
              wedding invitation designed to combine elegant visuals, interactive
              storytelling and essential event information in one seamless experience.
            </p>
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-[#1A1A18] light:bg-[#F7F7F5] border border-[#282825] light:border-[#E3E0D8] mb-8">
            <div>
              <span className="block text-[11px] text-[#8E8D89] light:text-[#737373]">
                Client Scope
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#F7F7F5] light:text-[#171717]">
                Digital Invitation
              </span>
            </div>
            <div>
              <span className="block text-[11px] text-[#8E8D89] light:text-[#737373]">
                Turnaround
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#F7F7F5] light:text-[#171717]">
                4 Days
              </span>
            </div>
            <div>
              <span className="block text-[11px] text-[#8E8D89] light:text-[#737373]">
                Technology
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#F7F7F5] light:text-[#171717]">
                React & Framer Motion
              </span>
            </div>
            <div>
              <span className="block text-[11px] text-[#8E8D89] light:text-[#737373]">
                Starting Price
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#B89B72]">
                Rp499K
              </span>
            </div>
          </div>

          {/* Deep Dive Sections */}
          <div className="space-y-6 mb-8 text-xs sm:text-sm leading-relaxed text-[#CCCCCC] light:text-[#444444]">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#F7F7F5] light:text-[#171717] mb-2">
                The Objective
              </h3>
              <p>
                Provide a paperless, premium alternative to printed wedding stationery
                that feels ceremonial rather than generic. Guests receive a personalized
                link with a custom virtual envelope opening, high-resolution photography,
                real-time itinerary integration with Google Maps, and a frictionless
                RSVP process.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#F7F7F5] light:text-[#171717] mb-2">
                Key Technical & Design Innovations
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B89B72] shrink-0 mt-0.5" />
                  <span>Interactive wax-seal opening transition</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B89B72] shrink-0 mt-0.5" />
                  <span>Real-time countdown timer to ceremony</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B89B72] shrink-0 mt-0.5" />
                  <span>Live guestbook wishes with instant refresh</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B89B72] shrink-0 mt-0.5" />
                  <span>1-click bank account copy for digital gift</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B89B72] shrink-0 mt-0.5" />
                  <span>Background ambient audio with polite toggle</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B89B72] shrink-0 mt-0.5" />
                  <span>100% mobile-first viewport optimization</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-[#282825] light:border-[#E3E0D8]">
            <button
              onClick={() => {
                onClose();
                onOpenDemo();
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-[#B89B72] text-[#B89B72] hover:bg-[#B89B72]/10 text-xs font-semibold flex items-center justify-center gap-2"
            >
              <span>Test Live Demo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                onClose();
                onStartProject();
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#F7F7F5] light:bg-[#171717] text-[#0F0F0E] light:text-[#F7F7F5] text-xs font-semibold hover:bg-white light:hover:bg-black transition-colors flex items-center justify-center gap-2"
            >
              <span>Order This Website Type</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#B89B72]" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
