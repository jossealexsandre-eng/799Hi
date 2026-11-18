import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
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
    subtitle: 'Portfolio Akademik & Profesional Ilmu Hukum (Dark Mode & Bilingual ID/EN)',
    category: 'Personal Portfolio',
    originalPrice: 'Rp999.000',
    price: 'Rp899.000',
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
    price: 'Rp549.000',
    image: '/images/project-yonathan.png',
    liveUrl: 'https://yonathanpiri-portfolio.vercel.app/',
    displayUrl: 'yonathanpiri-portfolio.vercel.app',
  },
  {
    id: 'duitmoo',
    tabLabel: 'DuitMoo',
    title: 'DuitMoo Smart Budgeting',
    subtitle: 'Aplikasi Pencatatan Keuangan Pribadi & Pembagian Anggaran 60/30/10',
    category: 'Custom Website',
    price: 'Mulai Rp4.499.000',
    image: '/images/project-duitmoo.png',
    liveUrl: 'https://duitmoo-production.up.railway.app',
    displayUrl: 'duitmoo-production.up.railway.app',
  },
  {
    id: 'alexsander',
    tabLabel: 'Alexsander',
    title: 'Alexsander Josse',
    subtitle: 'Portfolio Creative Technologist & Visual Content Creator',
    category: 'Personal Portfolio',
    originalPrice: 'Rp999.000',
    price: 'Rp899.000',
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
    originalPrice: 'Rp999.000',
    price: 'Rp899.000',
    image: '/images/project-rainer.png',
    liveUrl: 'https://raineryawan-portfolio.vercel.app/',
    displayUrl: 'raineryawan-portfolio.vercel.app',
  },
  {
    id: 'wheels',
    tabLabel: 'Wheels',
    title: 'Wheels Coffee Roasters',
    subtitle: 'Website Katalog Menu & Reservasi Meja Kuliner Bandung',
    category: 'Cafe & Restaurant',
    price: 'Mulai Rp899.000',
    image: '/images/project-wheels.png',
    liveUrl: 'https://wheelscompro.vercel.app/',
    displayUrl: 'wheelscompro.vercel.app',
  },
  {
    id: 'wedding',
    tabLabel: 'Wedding',
    title: 'Undangan Pernikahan Digital',
    subtitle: 'Undangan Pernikahan Digital Interaktif & Konfirmasi Kehadiran Tamu',
    category: 'Wedding Invitation',
    price: 'Mulai Rp199.000',
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
  const [direction, setDirection] = useState<number>(1);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % REAL_PROJECTS.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + REAL_PROJECTS.length) % REAL_PROJECTS.length);
  };

  const goToSlide = (idx: number) => {
    setDirection(idx >= currentSlide ? 1 : -1);
    setCurrentSlide(idx);
  };

  // Automatic 3-second carousel slide
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % REAL_PROJECTS.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  const activeProject = REAL_PROJECTS[currentSlide];

  const slideVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 48 : -48,
      scale: 0.985,
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1] as any,
      },
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -48 : 48,
      scale: 0.985,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1] as any,
      },
    }),
  };

  return (
    <section
      id="home"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden flex flex-col justify-center bg-white dark:bg-[#0A0A09] border-b border-[#EAE8E2] dark:border-[#242421] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          {/* ================= LEFT COLUMN: Studio Headline ================= */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col items-start text-left"
          >
            <h1 className="text-4xl sm:text-5xl xl:text-[56px] font-normal tracking-tight text-[#171717] dark:text-[#F7F7F5] leading-[1.1] mb-5 font-editorial">
              Your Website, Your Personal Branding.
            </h1>

            <p className="text-base text-[#555552] dark:text-[#8E8D89] leading-relaxed mb-8 font-normal">
              Kami membantu mahasiswa, profesional, dan pemilik usaha memiliki website portofolio, undangan digital, katalog kuliner, hingga aplikasi web kustom yang siap pakai.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={onStartProject}
                className="group px-7 py-3.5 rounded-full bg-[#F20D0D] hover:bg-[#d40b0b] text-white text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-all shadow-[0_10px_25px_-5px_rgba(242,13,13,0.4)] cursor-pointer"
              >
                <span>Konsultasi Proyek</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={onViewWork}
                className="px-6 py-3.5 rounded-full border border-[#DCDAD2] dark:border-[#282825] text-xs uppercase tracking-wider font-semibold text-[#171717] dark:text-[#F7F7F5] bg-white dark:bg-transparent hover:bg-[#F6F5F2] dark:hover:bg-[#1A1A18] transition-all cursor-pointer"
              >
                Lihat Karya Kami
              </motion.button>
            </div>
          </motion.div>

          {/* ================= RIGHT COLUMN: 3-Second Auto Carousel ================= */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 w-full"
          >
            <div className="relative mx-auto">
              {/* Top Controls: Project Tabs & Prev/Next */}
              <div className="flex items-center justify-between gap-2 mb-3.5">
                <div className="flex items-center gap-1 p-1 bg-[#F5F4F0] dark:bg-[#161615] rounded-xl border border-[#E4E2D8] dark:border-[#262624] text-xs overflow-x-auto max-w-full shadow-2xs">
                  {REAL_PROJECTS.map((p, idx) => {
                    const isActive = idx === currentSlide;
                    return (
                      <button
                        key={p.id}
                        onClick={() => goToSlide(idx)}
                        className={`relative px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${isActive
                            ? 'text-white dark:text-[#171717] font-semibold'
                            : 'text-[#6E6D68] dark:text-[#8E8D89] hover:text-[#171717] dark:hover:text-white'
                          }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="heroActiveProjectTab"
                            className="absolute inset-0 rounded-lg bg-[#171717] dark:bg-[#F7F7F5] shadow-xs"
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          />
                        )}
                        <span className="relative z-10">{p.tabLabel}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={prevSlide}
                    aria-label="Proyek Sebelumnya"
                    className="p-2 rounded-xl bg-white dark:bg-[#161615] border border-[#E4E2D8] dark:border-[#262624] text-[#555] dark:text-[#AAA] hover:text-[#171717] dark:hover:text-white hover:border-[#171717]/30 transition-colors shadow-2xs cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={nextSlide}
                    aria-label="Proyek Selanjutnya"
                    className="p-2 rounded-xl bg-white dark:bg-[#161615] border border-[#E4E2D8] dark:border-[#262624] text-[#555] dark:text-[#AAA] hover:text-[#171717] dark:hover:text-white hover:border-[#171717]/30 transition-colors shadow-2xs cursor-pointer"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
              </div>

              {/* Showcase Wrapper with Multi-Layer Studio Box Shadow */}
              <div className="relative">
                {/* Soft Ambient Backdrop Shadow Layer */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-3 rounded-[28px] bg-gradient-to-b from-black/[0.06] via-black/[0.11] to-black/[0.18] dark:from-black/40 dark:via-black/65 dark:to-black/85 blur-2xl -z-10 pointer-events-none"
                />

                {/* Browser Frame with Deep Refined Box Shadow */}
                <div className="rounded-2xl overflow-hidden bg-white dark:bg-[#141413] border border-[#DFDDD4] dark:border-[#2C2C29] shadow-[0_28px_65px_-12px_rgba(17,17,17,0.22),0_14px_30px_-10px_rgba(17,17,17,0.12),0_0_0_1px_rgba(17,17,17,0.05)] dark:shadow-[0_32px_75px_-12px_rgba(0,0,0,0.9),0_16px_34px_-10px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.06)]">
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

                  {/* 3-Second Auto-Slide Progress Indicator Bar */}
                  <div className="w-full h-[2px] bg-[#EAE8E2] dark:bg-[#1F1F1D] overflow-hidden">
                    <motion.div
                      key={currentSlide}
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 3, ease: 'linear' }}
                      className="h-full bg-[#F20D0D]"
                    />
                  </div>

                  {/* Screenshot Area */}
                  <div className="relative aspect-[16/10] bg-[#0E0E0D] overflow-hidden">
                    <AnimatePresence mode="wait" custom={direction} initial={false}>
                      <motion.div
                        key={activeProject.id}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="absolute inset-0 w-full h-full"
                      >
                        <img
                          src={activeProject.image}
                          alt={activeProject.title}
                          className="w-full h-full object-cover object-top"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex flex-col justify-end z-10 text-white">
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/90 bg-[#F20D0D] px-2.5 py-0.5 rounded font-semibold">
                              {activeProject.category}
                            </span>

                            <div className="flex items-center gap-2 bg-black/65 backdrop-blur-xs px-3 py-1 rounded-full border border-white/15">
                              {activeProject.originalPrice && (
                                <span className="text-[11px] font-mono text-white/55 line-through decoration-[#F20D0D]">
                                  {activeProject.originalPrice}
                                </span>
                              )}
                              <span className="text-xs font-mono font-bold text-white">
                                {activeProject.price}
                              </span>
                            </div>
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
                              className="group/btn inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#171717] hover:bg-[#F20D0D] hover:text-white text-xs font-semibold tracking-wide transition-all shrink-0 self-start sm:self-auto shadow-md"
                            >
                              <span>Kunjungi Website</span>
                              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
