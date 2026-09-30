import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import { PortfolioSkeleton } from './Skeleton';
import { SpotlightCard } from './SpotlightCard';
import { Magnetic } from './Magnetic';

interface PortfolioProps {
  onOpenLiveWedding: () => void;
  onOpenCaseStudy: () => void;
  isLoading?: boolean;
}

interface ProjectData {
  id: string;
  number: string;
  title: string;
  client: string;
  category: string;
  scope: string;
  description: string;
  image: string;
  liveUrl: string;
  displayUrl: string;
  deliverables: string[];
  startingPrice: string;
}

const LIVE_PROJECTS: ProjectData[] = [
  {
    id: 'wheels',
    number: '01',
    title: 'Website Company',
    client: 'Wheels Coffee Roasters Bandung',
    category: 'BISNIS & BRAND EXPERIENCE',
    scope: 'Sanctuary Kopi Spesialti & Kuliner Artisan',
    description:
      'Tampilan digital yang elegan untuk bisnis kopi di Bandung. Menampilkan alur reservasi meja yang interaktif, presentasi menu kuliner yang dikurasi, suara latar suasana, dan optimasi pencarian lokal.',
    image: '/images/project-wheels.png',
    liveUrl: 'https://wheelscompro.vercel.app/',
    displayUrl: 'wheelscompro.vercel.app',
    deliverables: [
      'Reservasi Meja Interaktif',
      'Presentasi Menu Artisan',
      'Pengalaman Suara Suasana',
      'Jam Operasional Dinamis',
      'Integrasi Google Maps',
      'Optimasi Mobile',
    ],
    startingPrice: 'Rp799K',
  },
  {
    id: 'wedding',
    number: '02',
    title: 'Undangan Pernikahan',
    client: 'Perayaan Pernikahan Digital',
    category: 'UNDANGAN PERNIKAHAN DIGITAL',
    scope: 'Perayaan Modern & Portal Tamu',
    description:
      'Website pernikahan bespoke yang elegan dengan fitur pembukaan amplop virtual interaktif, audio romantis, hitung mundur acara langsung, sistem konfirmasi RSVP tamu, dan registri hadiah digital.',
    image: '/images/project-wedding.png',
    liveUrl: 'https://digital-wedding-invitation-f2ei.vercel.app/',
    displayUrl: 'digital-wedding-invitation-f2ei.vercel.app',
    deliverables: [
      'Amplop Interaktif & Audio',
      'Timeline Acara & Hitung Mundur',
      'Konfirmasi RSVP Tamu Digital',
      'Galeri Foto Cerita Kurasi',
      'Navigasi Google Maps Venue',
      'Hadiah Digital & Transfer Bank',
    ],
    startingPrice: 'Rp499K',
  },
  {
    id: 'alexsander',
    number: '03',
    title: 'Website Portfolio',
    client: 'Portfolio Personal Kreatif',
    category: 'PORTFOLIO PERSONAL KREATIF',
    scope: 'Personal Branding & Studi Kasus',
    description:
      'Portfolio personal branding untuk kreator konten visual. Dirancang dengan tipografi editorial yang bold, modul studi kasus desain mendalam, toggle suara interaktif, dan saluran kontak langsung.',
    image: '/images/project-alexsander.png',
    liveUrl: 'https://alexsander-portfolio-virid.vercel.app/',
    displayUrl: 'alexsander-portfolio-virid.vercel.app',
    deliverables: [
      'Layout Tipografi Editorial Bold',
      'Presentasi Studi Kasus Modular',
      'Unduh Resume Satu Klik',
      'Desain Suara Interaktif',
      'Saluran Inquiry WhatsApp',
      'Arsitektur Performa Tinggi',
    ],
    startingPrice: 'Rp499K',
  },
  {
    id: 'rainer',
    number: '04',
    title: 'Portfolio Akademik',
    client: 'Portfolio Akademik Bilingual',
    category: 'PORTFOLIO AKADEMIK & BAKAT',
    scope: 'Sastra Jepang & Perjalanan Karier',
    description:
      'Portfolio akademik bilingual (Jepang/Inggris) untuk mahasiswa Sastra Jepang yang menyelesaikan magang internasional di Jepang. Menampilkan perjalanan karier dan pencapaian akademik secara profesional.',
    image: '/images/project-rainer.png',
    liveUrl: 'https://raineryawan-portfolio.vercel.app/',
    displayUrl: 'raineryawan-portfolio.vercel.app',
    deliverables: [
      'Pengalih Bahasa Bilingual (JP/EN)',
      'Timeline Magang Kronologis',
      'Showcase Sertifikat Terverifikasi',
      'CV Akademik & Matriks Kompetensi',
      'Desain Minimalis & Legibilitas Tinggi',
      'Adaptasi Responsif Mobile',
    ],
    startingPrice: 'Rp499K',
  },
];

export const Portfolio: React.FC<PortfolioProps> = ({
  isLoading: externalLoading,
}) => {
  const [internalLoading, setInternalLoading] = useState(true);

  useEffect(() => {
    if (externalLoading !== undefined) return;
    const timer = setTimeout(() => {
      setInternalLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [externalLoading]);

  const isLoading = externalLoading !== undefined ? externalLoading : internalLoading;

  return (
    <section id="work" className="py-24 sm:py-32 relative bg-white dark:bg-[#0A0A09] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#9B1C22]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#9B1C22] dark:text-[#B83240]">
                KARYA PILIHAN
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="text-3xl sm:text-4xl md:text-5xl font-editorial font-normal tracking-tight text-[#171717] dark:text-[#F7F7F5] mb-4"
            >
              Proyek live terbaru.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="text-base text-[#666560] dark:text-[#8E8D89] leading-relaxed"
            >
              Koleksi pilihan website produksi yang dirancang dan dibangun oleh 799Hi.
              Kunjungi website langsung untuk merasakan pengalaman interaksinya secara nyata.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-xs font-mono text-[#666] dark:text-[#999]"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>4 Proyek Aktif & Deployed</span>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="portfolio-skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <PortfolioSkeleton />
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
              {LIVE_PROJECTS.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full flex flex-col"
                >
                  <SpotlightCard
                    spotlightColor="rgba(155, 28, 34, 0.12)"
                    data-cursor-label={project.id === 'wedding' ? 'Live Demo ✨' : 'Kunjungi ↗'}
                    className="group relative rounded-3xl bg-white dark:bg-[#141413] border border-[#E6E4DC] dark:border-[#262624] overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-500 h-full"
                  >
                    {/* Browser Mockup Frame with Screenshot */}
                    <div className="relative overflow-hidden bg-[#F7F6F2] dark:bg-[#181816] border-b border-[#E6E4DC] dark:border-[#262624]">
                      
                      {/* Browser Bar */}
                      <div className="h-9 px-4 bg-[#F2F0EB] dark:bg-[#1C1C1A] flex items-center justify-between border-b border-[#E4E2D8] dark:border-[#262624]">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#E5191B]/70" />
                          <span className="w-2 h-2 rounded-full bg-[#B89B72]/70" />
                          <span className="w-2 h-2 rounded-full bg-emerald-500/70" />
                        </div>
                        
                        <div className="px-3 py-0.5 rounded-md bg-white dark:bg-[#121211] text-[10px] font-mono text-[#666] dark:text-[#888] flex items-center gap-1 border border-[#DDD] dark:border-[#262624]">
                          <span className="text-emerald-500 text-[9px]">🔒</span>
                          <span>{project.displayUrl}</span>
                        </div>

                        <span className="text-[10px] font-mono text-[#888]">
                          0{idx + 1}
                        </span>
                      </div>

                      {/* Screenshot Container */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.97 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.65, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                        className="relative aspect-[16/10] overflow-hidden"
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-103"
                        />
                      </motion.div>
                    </div>

                    {/* Project Details */}
                    <div className="p-7 sm:p-8 flex flex-col justify-between flex-grow">
                      <div>
                        {/* Meta header */}
                        <div className="flex items-center justify-between text-xs mb-3">
                          <span className="font-mono text-[#9B1C22] dark:text-[#B83240] text-[11px] tracking-wider uppercase">
                            {project.category}
                          </span>
                          <span className="font-mono text-[11px] text-[#888]">
                            PROD · 2026
                          </span>
                        </div>

                        {/* Judul & Tagline */}
                        <h3 className="text-2xl font-editorial font-normal text-[#171717] dark:text-[#F7F7F5] mb-1.5">
                          {project.title}
                        </h3>
                        
                        <p className="text-xs text-[#777] dark:text-[#999] mb-4 font-sans">
                          {project.scope}
                        </p>

                        <p className="text-sm text-[#555] dark:text-[#8E8D89] leading-relaxed mb-6">
                          {project.description}
                        </p>

                        {/* Deliverables List */}
                        <div className="space-y-2 mb-6">
                          <span className="text-[11px] font-mono uppercase tracking-wider text-[#888] block mb-2">
                            Fitur Utama
                          </span>
                          <div className="grid grid-cols-2 gap-2 text-xs text-[#444] dark:text-[#C5C3BC]">
                            {project.deliverables.map((item, dIdx) => (
                              <div key={dIdx} className="flex items-center gap-1.5">
                                <Check className="w-3.5 h-3.5 text-[#9B1C22] shrink-0" />
                                <span className="truncate">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Bottom Action Footer */}
                      <div className="pt-5 border-t border-[#EAE8E2] dark:border-[#242421] flex items-center justify-between gap-3">
                        <div>
                          <span className="block text-[10px] font-mono text-[#888] uppercase">
                            Mulai Dari
                          </span>
                          <span className="text-base font-semibold text-[#171717] dark:text-white font-mono">
                            {project.startingPrice}
                          </span>
                        </div>

                        {/* Clean Visit Website Button with Magnetic Effect */}
                        <Magnetic strength={0.3} threshold={65}>
                          <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.96 }}
                            data-cursor-label="Buka Web ↗"
                            className="btn-pulse inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#171717] hover:bg-black text-white dark:bg-[#F7F7F5] dark:text-[#0F0F0E] dark:hover:bg-white text-xs font-semibold tracking-wide transition-colors shadow-sm group/btn cursor-pointer"
                          >
                            <span>Visit Website</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-[#9B1C22] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                          </motion.a>
                        </Magnetic>
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Minimalist Inquiry Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 p-8 rounded-3xl bg-[#F8F7F4] dark:bg-[#141413] border border-[#E6E4DC] dark:border-[#262624] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
        >
          <div>
            <h4 className="text-base font-editorial font-normal text-[#171717] dark:text-white mb-1">
              Butuh website yang disesuaikan untuk brand Anda?
            </h4>
            <p className="text-xs text-[#666] dark:text-[#888]">
              Kami merancang dan membangun pengalaman digital yang bersih, estetis, dan siap tayang dengan cepat.
            </p>
          </div>

          <a
            href="#contact"
            className="px-6 py-3 rounded-full bg-[#171717] hover:bg-black text-white dark:bg-[#F7F7F5] dark:text-[#0F0F0E] dark:hover:bg-white text-xs font-semibold tracking-wide whitespace-nowrap shadow-xs transition-colors"
          >
            Mulai Proyek Anda
          </a>
        </motion.div>

      </div>
    </section>
  );
};
