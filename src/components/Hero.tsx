import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Check,
} from 'lucide-react';

interface HeroProps {
  onStartProject: () => void;
  onViewWork: () => void;
  onOpenLiveWedding?: () => void;
}

const REAL_PROJECTS = [
  {
    id: 'angelus',
    tabLabel: 'Matthew',
    title: 'Matthew Filbert Angelus',
    subtitle: 'Portfolio Akademik & Profesional Ilmu Hukum — Dark Mode & Bilingual ID/EN',
    category: 'Personal Portfolio',
    scope: 'Dark Mode · Bilingual ID/EN · Sertifikat · CV PDF',
    image: '/images/project-angelus.png',
    liveUrl: 'https://angelusmatthew.vercel.app/',
    displayUrl: 'angelusmatthew.vercel.app',
  },
  {
    id: 'yonathan',
    tabLabel: 'Yonathan',
    title: 'Yonathan Piri',
    subtitle: 'Portfolio Editorial Marketing Management & Rekam Jejak Organisasi',
    category: 'Personal Portfolio',
    scope: 'Editorial Monokrom · Pengalaman Kerja · CV PDF',
    image: '/images/project-yonathan.png',
    liveUrl: 'https://yonathanpiri-portfolio.vercel.app/',
    displayUrl: 'yonathanpiri-portfolio.vercel.app',
  },
  {
    id: 'duitmoo',
    tabLabel: 'DuitMoo',
    title: 'DuitMoo — Smart Budgeting Platform',
    subtitle: 'Aplikasi Pencatatan Keuangan Pribadi & Pembagian Anggaran 60/30/10',
    category: 'Custom Website',
    scope: 'Simulasi Anggaran · Pencatatan Belanja · Multi-User App',
    image: '/images/project-duitmoo.png',
    liveUrl: 'https://duitmoo-production.up.railway.app',
    displayUrl: 'duitmoo-production.up.railway.app',
  },
  {
    id: 'alexsander',
    tabLabel: 'Alexsander',
    title: 'Alexsander Josse',
    subtitle: 'Creative Technologist & Visual Content Creator Portfolio',
    category: 'Personal Portfolio',
    scope: 'Tipografi Editorial · Karya Pilihan · Unduh CV',
    image: '/images/project-alexsander.png',
    liveUrl: 'https://alexsander-portfolio-virid.vercel.app/',
    displayUrl: 'alexsander-portfolio-virid.vercel.app',
  },
  {
    id: 'rainer',
    tabLabel: 'Rainer',
    title: 'Rainer Jackob Yawan',
    subtitle: 'Portfolio Akademik Bilingual JP/EN & Magang Internasional Jepang',
    category: 'Personal Portfolio',
    scope: 'Bilingual JP/EN · Pengalaman Magang · Sertifikat',
    image: '/images/project-rainer.png',
    liveUrl: 'https://raineryawan-portfolio.vercel.app/',
    displayUrl: 'raineryawan-portfolio.vercel.app',
  },
  {
    id: 'wheels',
    tabLabel: 'Wheels',
    title: 'Wheels Coffee Roasters',
    subtitle: 'Specialty Coffee & Culinary Sanctuary Bandung',
    category: 'Cafe & Restaurant',
    scope: 'Katalog Menu · Reservasi Meja · Lokasi Cabang',
    image: '/images/project-wheels.png',
    liveUrl: 'https://wheelscompro.vercel.app/',
    displayUrl: 'wheelscompro.vercel.app',
  },
  {
    id: 'wedding',
    tabLabel: 'Wedding',
    title: 'Undangan Pernikahan Digital',
    subtitle: 'Undangan Pernikahan Digital Interaktif & Konfirmasi RSVP Tamu',
    category: 'Wedding Invitation',
    scope: 'RSVP Digital · Audio Latar · Galeri Foto',
    image: '/images/project-wedding.png',
    liveUrl: 'https://digital-wedding-invitation-f2ei.vercel.app/',
    displayUrl: 'digital-wedding-invitation-f2ei.vercel.app',
  },
];

export const Hero: React.FC<HeroProps> = ({
  onStartProject,
  onViewWork,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % REAL_PROJECTS.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + REAL_PROJECTS.length) % REAL_PROJECTS.length);
  };

  const goToSlide = (idx: number) => {
    setCurrentSlide(idx);
  };

  useEffect(() => {
    if (isPaused) return;
    autoPlayRef.current = setInterval(() => {
      nextSlide();
    }, 5500);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [currentSlide, isPaused]);

  const activeProject = REAL_PROJECTS[currentSlide];

  return (
    <section
      id="home"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden flex flex-col justify-center bg-white dark:bg-[#0A0A09] border-b border-[#EAE8E2] dark:border-[#242421] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* ================= LEFT COLUMN: Editorial ================= */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F6F5F2] dark:bg-[#161615] border border-[#E6E4DC] dark:border-[#282825] mb-5 text-[11px] font-mono tracking-wider text-[#666] dark:text-[#999]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F20D0D]" />
              <span className="font-semibold text-[#171717] dark:text-[#E8E6DF] uppercase tracking-widest">
                799Hi Creatives
              </span>
              <span className="text-[#888]">/</span>
              <span>Web Design Studio</span>
            </div>

            <h1 className="text-4xl sm:text-5xl xl:text-[58px] font-normal tracking-tight text-[#171717] dark:text-[#F7F7F5] leading-[1.08] mb-5 font-editorial">
              We build websites that reflect your identity.
            </h1>

            <p className="text-base text-[#555552] dark:text-[#8E8D89] leading-relaxed mb-8 font-normal">
              Jasa pembuatan website modern, responsif, dan terstruktur untuk portofolio personal, undangan pernikahan, bisnis kuliner, profil perusahaan, hingga aplikasi web kustom.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto mb-7">
              <button
                onClick={onStartProject}
                className="px-7 py-3.5 rounded-full bg-[#F20D0D] hover:bg-[#d40b0b] text-white text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Mulai Proyek</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onViewWork}
                className="px-6 py-3.5 rounded-full border border-[#DCDAD2] dark:border-[#282825] text-xs uppercase tracking-wider font-semibold text-[#171717] dark:text-[#F7F7F5] bg-white dark:bg-transparent hover:bg-[#F6F5F2] dark:hover:bg-[#1A1A18] transition-colors cursor-pointer"
              >
                Lihat Karya ({REAL_PROJECTS.length})
              </button>
            </div>

            {/* Key Facts */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-[#666560] dark:text-[#8E8D89]">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F6F5F2] dark:bg-[#161615] border border-[#E6E4DC] dark:border-[#282825]">
                <span className="font-medium text-[#171717] dark:text-[#F7F7F5]">Mulai dari</span>
                <span className="font-bold text-[#F20D0D]">Rp199.000</span>
              </div>
              <span className="text-[#CCC] dark:text-[#3E3E3A]">·</span>
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-[#F20D0D]" />
                <span>Harga Transparan</span>
              </span>
              <span className="text-[#CCC] dark:text-[#3E3E3A]">·</span>
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-[#F20D0D]" />
                <span>Responsif di HP &amp; Laptop</span>
              </span>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: Live Project Showcase ================= */}
          <div
            className="lg:col-span-7 w-full"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative mx-auto">
              {/* Top Controls: Project Tabs & Prev/Next */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-1 p-1 bg-[#F5F4F0] dark:bg-[#161615] rounded-xl border border-[#E4E2D8] dark:border-[#262624] text-xs overflow-x-auto max-w-full">
                  {REAL_PROJECTS.map((p, idx) => {
                    const isActive = idx === currentSlide;
                    return (
                      <button
                        key={p.id}
                        onClick={() => goToSlide(idx)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                          isActive
                            ? 'bg-[#171717] text-white dark:bg-[#F7F7F5] dark:text-[#171717] font-semibold'
                            : 'text-[#6E6D68] dark:text-[#8E8D89] hover:text-[#171717] dark:hover:text-white'
                        }`}
                      >
                        {p.tabLabel}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={prevSlide}
                    aria-label="Proyek Sebelumnya"
                    className="p-2 rounded-xl bg-white dark:bg-[#161615] border border-[#E4E2D8] dark:border-[#262624] text-[#555] dark:text-[#AAA] hover:text-[#171717] dark:hover:text-white transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    aria-label="Proyek Selanjutnya"
                    className="p-2 rounded-xl bg-white dark:bg-[#161615] border border-[#E4E2D8] dark:border-[#262624] text-[#555] dark:text-[#AAA] hover:text-[#171717] dark:hover:text-white transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Clean Browser Frame */}
              <div className="rounded-2xl overflow-hidden bg-white dark:bg-[#141413] border border-[#E4E2D8] dark:border-[#262624] shadow-md">
                {/* Browser Top Bar */}
                <div className="h-10 px-4 bg-[#F8F7F4] dark:bg-[#181816] border-b border-[#E4E2D8] dark:border-[#262624] flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D8D6CE] dark:bg-[#3A3A36]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D8D6CE] dark:bg-[#3A3A36]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D8D6CE] dark:bg-[#3A3A36]" />
                  </div>

                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 rounded-md bg-white dark:bg-[#121211] text-[11px] font-mono text-[#555] dark:text-[#8E8D89] hover:text-[#F20D0D] border border-[#E4E2D8] dark:border-[#262624] flex items-center gap-1.5 max-w-[260px] truncate transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span className="truncate">{activeProject.displayUrl}</span>
                  </a>

                  <span className="text-[11px] font-mono text-[#8E8D89]">
                    0{currentSlide + 1} / 0{REAL_PROJECTS.length}
                  </span>
                </div>

                {/* Screenshot Area */}
                <div className="relative aspect-[16/10] bg-[#0E0E0D] overflow-hidden">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={activeProject.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <img
                        src={activeProject.image}
                        alt={activeProject.title}
                        className="w-full h-full object-cover object-top"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex flex-col justify-end z-10 text-white">
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#F20D0D] bg-black/60 px-2.5 py-0.5 rounded">
                            {activeProject.category}
                          </span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                          <div>
                            <h3 className="text-xl sm:text-2xl font-editorial font-normal tracking-tight text-white">
                              {activeProject.title}
                            </h3>
                            <p className="text-xs text-white/80 line-clamp-1 max-w-md">
                              {activeProject.subtitle}
                            </p>
                          </div>

                          <a
                            href={activeProject.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#171717] hover:bg-[#F20D0D] hover:text-white text-xs font-semibold tracking-wide transition-colors shrink-0 self-start sm:self-auto"
                          >
                            <span>Kunjungi Website</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
