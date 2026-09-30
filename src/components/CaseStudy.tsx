import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Heart } from 'lucide-react';
import { CaseStudyModal } from './CaseStudyModal';

interface CaseStudyProps {
  onOpenLiveWedding: () => void;
  onStartProject: () => void;
}

export const CaseStudy: React.FC<CaseStudyProps> = ({
  onOpenLiveWedding,
  onStartProject,
}) => {
  const [caseStudyModalOpen, setCaseStudyModalOpen] = useState(false);

  const featureTags = [
    'Interactive',
    'Responsive',
    'Animation',
    'RSVP',
    'Gallery',
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#121211]/60 light:bg-[#F2EFE9]/60 border-t border-[#242421] light:border-[#E3E0D8] relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#B89B72]">
              STUDI KASUS UNGGULAN
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-editorial font-normal text-[#F7F7F5] light:text-[#171717]">
            Dibuat dengan presisi & estetika.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center p-6 sm:p-10 rounded-3xl bg-[#151514] light:bg-[#FFFFFF] border border-[#282825] light:border-[#E3E0D8] shadow-2xl">
          {/* Left: Large Website Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 cursor-pointer group"
            onClick={() => window.open('https://digital-wedding-invitation-f2ei.vercel.app/', '_blank')}
          >
            <div className="rounded-2xl overflow-hidden border border-[#2E2E2A] light:border-[#E3E0D8] bg-[#0E0E0D] shadow-xl relative aspect-[16/10] flex flex-col">
              {/* Browser bar */}
              <div className="h-8 px-3.5 bg-[#1A1A18] light:bg-[#EFEDE8] border-b border-[#282825] light:border-[#E3E0D8] flex items-center justify-between shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#E5191B]" />
                  <span className="w-2 h-2 rounded-full bg-[#B89B72]" />
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <span className="text-[10px] font-mono text-[#8E8D89] light:text-[#737373]">
                  digital-wedding-invitation-f2ei.vercel.app
                </span>
                <span className="text-[10px] text-emerald-400 font-medium">● Live</span>
              </div>

              {/* Internal Screenshot View */}
              <div className="flex-1 relative overflow-hidden group/thumb">
                <img
                  src="/images/project-wedding.png"
                  alt="The Wedding of Amelia & Nathaniel"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/thumb:scale-105"
                />
                
                {/* Overlay hover prompt */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end justify-between p-5 text-white">
                  <div>
                    <span className="text-[10px] font-mono text-[#E5C394] uppercase tracking-wider block">
                      Wedding Celebration · Jakarta
                    </span>
                    <h4 className="text-lg font-editorial text-white">
                      Amelia & Nathaniel
                    </h4>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E5191B] text-white text-xs font-semibold shadow-md">
                    <span>Buka Website Asli</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Wedding Invitation Case Study Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-start"
          >
            <div className="mb-4">
              <span className="text-xs font-mono font-medium tracking-wider text-[#B89B72] uppercase block mb-1">
                WEDDING INVITATION · AMELIA & NATHANIEL
              </span>
              <h3 className="text-2xl sm:text-3xl font-editorial font-normal text-[#F7F7F5] light:text-[#171717] leading-tight">
                Undangan pernikahan digital mewah & interaktif.
              </h3>
            </div>

            <p className="text-sm text-[#8E8D89] light:text-[#737373] leading-relaxed mb-6">
              Studi kasus undangan pernikahan digital interaktif dengan amplop virtual, musik latar romantis, konfirmasi kehadiran (RSVP), galeri foto pre-wedding, dan amplop digital.
            </p>

            {/* Feature tags (clean typography as per Zero-Pill rule) */}
            <div className="mb-8 w-full">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#8E8D89] light:text-[#737373] block mb-2">
                Kemampuan Utama
              </span>
              <div className="flex flex-wrap items-center gap-y-2 text-xs font-medium text-[#D1CFC7] light:text-[#555555]">
                {featureTags.map((tag, idx) => (
                  <React.Fragment key={tag}>
                    <span className="hover:text-[#B89B72] transition-colors">{tag}</span>
                    {idx < featureTags.length - 1 && (
                      <span className="mx-2 text-[#4A4A45] light:text-[#C5C2BA]" aria-hidden="true">
                        ·
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCaseStudyModalOpen(true)}
                className="px-6 py-3 rounded-full bg-[#F7F7F5] light:bg-[#171717] text-[#0F0F0E] light:text-[#F7F7F5] text-xs font-semibold uppercase tracking-wider hover:bg-white light:hover:bg-black transition-colors flex items-center gap-2 group shadow-sm"
              >
                <span>Lihat Studi Kasus</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#B89B72] group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <button
                onClick={onOpenLiveWedding}
                className="px-5 py-3 rounded-full border border-[#282825] light:border-[#E3E0D8] text-xs font-semibold text-[#8E8D89] hover:text-[#F7F7F5] light:text-[#737373] light:hover:text-[#171717] transition-colors cursor-pointer"
              >
                Buka Demo
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <CaseStudyModal
        isOpen={caseStudyModalOpen}
        onClose={() => setCaseStudyModalOpen(false)}
        onOpenDemo={onOpenLiveWedding}
        onStartProject={onStartProject}
      />
    </section>
  );
};
