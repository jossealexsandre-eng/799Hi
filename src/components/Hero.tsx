import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, useScroll } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Smartphone,
  Monitor,
  Check,
} from 'lucide-react';
import { Magnetic } from './Magnetic';

interface HeroProps {
  onStartProject: () => void;
  onViewWork: () => void;
  onOpenLiveWedding: () => void;
}

const TYPING_PHRASES = [
  'brand Anda.',
  'konversi lebih tinggi.',
  'studio kreatif.',
  'bisnis modern.',
  'pernikahan tak terlupakan.',
];

const REAL_PROJECTS = [
  {
    id: 'wheels',
    tabLabel: 'Company',
    title: 'Website Company',
    subtitle: 'Sanctuary Kopi Spesialti & Kuliner Artisan',
    category: 'Website Bisnis',
    scope: 'Brand Experience · Reservasi · Menu',
    price: 'Rp799K',
    image: '/images/project-wheels.png',
    liveUrl: 'https://wheelscompro.vercel.app/',
    displayUrl: 'wheelscompro.vercel.app',
    tags: ['Reservasi Meja', 'Menu Digital', 'Audio Suasana', 'Bandung Eyckman'],
  },
  {
    id: 'wedding',
    tabLabel: 'Wedding',
    title: 'Undangan Pernikahan',
    subtitle: 'Perayaan Pernikahan Digital yang Elegan & Modern',
    category: 'Undangan Pernikahan Digital',
    scope: 'RSVP Digital · Musik · Galeri Foto',
    price: 'Rp499K',
    image: '/images/project-wedding.png',
    liveUrl: 'https://digital-wedding-invitation-f2ei.vercel.app/',
    displayUrl: 'digital-wedding-invitation-f2ei.vercel.app',
    tags: ['RSVP Digital', 'Audio Latar', 'Hitung Mundur', 'Galeri Foto'],
  },
  {
    id: 'alexsander',
    tabLabel: 'Portfolio',
    title: 'Website Portfolio',
    subtitle: 'Personal Branding & Studi Kasus Kreatif',
    category: 'Portfolio Personal',
    scope: 'Editorial Grid · Studi Kasus · CV',
    price: 'Rp499K',
    image: '/images/project-alexsander.png',
    liveUrl: 'https://alexsander-portfolio-virid.vercel.app/',
    displayUrl: 'alexsander-portfolio-virid.vercel.app',
    tags: ['Tipografi Editorial', 'Studi Kasus', 'Suara Interaktif', 'Unduh CV'],
  },
  {
    id: 'rainer',
    tabLabel: 'Portfolio',
    title: 'Portfolio Akademik',
    subtitle: 'Perjalanan Akademik & Karier Bilingual JP/EN',
    category: 'Portfolio Akademik',
    scope: 'Bilingual JP/EN · Sertifikat · Karier',
    price: 'Rp499K',
    image: '/images/project-rainer.png',
    liveUrl: 'https://raineryawan-portfolio.vercel.app/',
    displayUrl: 'raineryawan-portfolio.vercel.app',
    tags: ['Bilingual JP/EN', 'Perjalanan Magang', 'Sertifikat', 'Mobile Optimized'],
  },
];

export const Hero: React.FC<HeroProps> = ({
  onStartProject,
  onViewWork,
}) => {
  // --- TYPING ANIMATION STATE ---
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(90);

  useEffect(() => {
    const currentPhrase = TYPING_PHRASES[phraseIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentPhrase.substring(0, displayText.length + 1));
        setTypingSpeed(80);

        if (displayText.length + 1 === currentPhrase.length) {
          setTypingSpeed(2200);
          setIsDeleting(true);
        }
      } else {
        setDisplayText(currentPhrase.substring(0, displayText.length - 1));
        setTypingSpeed(40);

        if (displayText.length === 0) {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % TYPING_PHRASES.length);
          setTypingSpeed(350);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex, typingSpeed]);

  // --- CAROUSEL STATE ---
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');
  const [slideDirection, setSlideDirection] = useState<'right' | 'left'>('right');
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setSlideDirection('right');
    setCurrentSlide((prev) => (prev + 1) % REAL_PROJECTS.length);
  };

  const prevSlide = () => {
    setSlideDirection('left');
    setCurrentSlide((prev) => (prev - 1 + REAL_PROJECTS.length) % REAL_PROJECTS.length);
  };

  const goToSlide = (idx: number) => {
    setSlideDirection(idx > currentSlide ? 'right' : 'left');
    setCurrentSlide(idx);
  };

  useEffect(() => {
    if (isPaused) return;
    autoPlayRef.current = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [currentSlide, isPaused]);

  const activeProject = REAL_PROJECTS[currentSlide];

  // --- 3D TILT STATE ---
  const tiltRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const springX = useSpring(rawX, springConfig);
  const springY = useSpring(rawY, springConfig);
  const rotateX = useTransform(springY, [-0.5, 0.5], ['12deg', '-12deg']);
  const rotateY = useTransform(springX, [-0.5, 0.5], ['-12deg', '12deg']);
  const [isHovering3D, setIsHovering3D] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltRef.current) return;
    const rect = tiltRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(x);
    rawY.set(y);
  };

  const handleMouseLeave3D = () => {
    rawX.set(0);
    rawY.set(0);
    setIsHovering3D(false);
    setIsPaused(false);
  };

  const handleMouseEnter3D = () => {
    setIsHovering3D(true);
    setIsPaused(true);
  };

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-[92vh] pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden flex flex-col justify-center bg-white dark:bg-[#0A0A09] transition-colors duration-300"
    >
      {/* Subtle living ambient lighting with slow organic pulse & scroll parallax */}
      <motion.div
        style={{ y: orbY1 }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-[480px] bg-gradient-to-tr from-[#9B1C22]/15 via-[#B89B72]/10 to-transparent blur-[140px] pointer-events-none rounded-full ambient-orb"
      />
      <motion.div
        style={{ y: orbY2, animationDelay: '-4s' }}
        className="absolute top-1/3 right-1/4 w-[380px] h-[380px] bg-radial from-[#9B1C22]/8 to-transparent blur-[120px] pointer-events-none rounded-full ambient-orb"
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* ================= LEFT COLUMN: Editorial ================= */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            {/* Minimalist Studio Pill with Subtle Float & Shimmer */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="float-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F6F5F2] dark:bg-[#1A1A18] border border-[#E6E4DC] dark:border-[#282825] mb-5 text-[11px] font-mono tracking-wider text-[#666] dark:text-[#999] shadow-xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#9B1C22] shadow-[0_0_8px_rgba(155,28,34,0.7)]" />
              <span className="font-semibold text-[#171717] dark:text-[#E8E6DF] uppercase tracking-widest">
                799Hi
              </span>
              <span className="text-[#888]">/</span>
              <span className="text-[#666] dark:text-[#AAA]">Website Design & Development</span>
            </motion.div>

            {/* Main Dynamic Headline with Typing Animation */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl xl:text-[68px] font-normal tracking-tight text-[#171717] dark:text-[#F7F7F5] leading-[1.08] mb-6 font-editorial"
            >
              Website dibuat untuk <br className="hidden sm:inline" />
              <span className="relative inline-block text-[#881820] dark:text-[#B83240] min-h-[1.15em]">
                {displayText}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.85, ease: 'linear' }}
                  className="inline-block w-[2.5px] sm:w-[3.5px] h-[0.9em] ml-1 bg-[#9B1C22] align-middle shadow-[0_0_8px_rgba(155,28,34,0.5)]"
                />
              </span>
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-[#555552] dark:text-[#8E8D89] leading-relaxed max-w-xl mb-8 font-normal"
            >
              Website yang bersih, modern, dan responsif — dirancang agar Anda
              tampil profesional, membangun kepercayaan, dan berkembang secara online.
            </motion.p>

            {/* Action Buttons with Magnetic Pull */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-6"
            >
              <Magnetic strength={0.35} threshold={85}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={onStartProject}
                  data-cursor-label="Mulai Proyek ↗"
                  className="btn-pulse px-7 py-3.5 rounded-full bg-[#171717] text-[#FFFFFF] dark:bg-[#F7F7F5] dark:text-[#0F0F0E] text-sm font-semibold tracking-wide flex items-center justify-center gap-2 hover:bg-black dark:hover:bg-white transition-all shadow-sm hover:shadow-[0_0_24px_rgba(155,28,34,0.2)] group cursor-pointer"
                >
                  <span>Mulai Proyek</span>
                  <ArrowRight className="w-4 h-4 text-[#9B1C22] group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Magnetic>

              <Magnetic strength={0.25} threshold={75}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={onViewWork}
                  data-cursor-label="Lihat Karya ↓"
                  className="px-6 py-3.5 rounded-full border border-[#DCDAD2] dark:border-[#282825] text-sm font-medium text-[#171717] dark:text-[#F7F7F5] bg-white dark:bg-transparent hover:bg-[#F6F5F2] dark:hover:bg-[#1A1A18] transition-colors cursor-pointer"
                >
                  Lihat Portofolio
                </motion.button>
              </Magnetic>
            </motion.div>

            {/* Key Deliverables Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-3 pt-2 text-xs text-[#666560] dark:text-[#8E8D89]"
            >
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F6F5F2] dark:bg-[#161615] border border-[#E6E4DC] dark:border-[#282825]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-medium text-[#171717] dark:text-[#F7F7F5]">Mulai dari</span>
                <span className="font-bold text-[#881820] dark:text-[#B83240] tracking-wide">Rp499K</span>
              </div>
              <span className="text-[#CCC] dark:text-[#3E3E3A]">·</span>
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Desain Kustom</span>
              </span>
              <span className="text-[#CCC] dark:text-[#3E3E3A]">·</span>
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Responsif</span>
              </span>
              <span className="text-[#CCC] dark:text-[#3E3E3A]">·</span>
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Siap Tayang</span>
              </span>
            </motion.div>
          </div>

          {/* ================= RIGHT COLUMN: 3D Interactive Carousel ================= */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 w-full"
          >
            {/* Floating idle animation wrapper */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
            <div className="relative mx-auto max-w-xl lg:max-w-none">
              {/* Category Segmented Tabs */}
              <div className="flex items-center justify-between mb-3 px-0.5">
                <div className="flex items-center gap-1 p-1 bg-[#F5F4F0] dark:bg-[#161615] rounded-xl border border-[#E4E2D8] dark:border-[#262624] text-xs overflow-x-auto max-w-full">
                  {REAL_PROJECTS.map((p, idx) => {
                    const isActive = idx === currentSlide;
                    return (
                      <button
                        key={p.id}
                        onClick={() => goToSlide(idx)}
                        className={`relative px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                          isActive
                            ? 'bg-white dark:bg-[#232321] text-[#171717] dark:text-[#F7F7F5] shadow-xs font-semibold'
                            : 'text-[#6E6D68] dark:text-[#8E8D89] hover:text-[#171717] dark:hover:text-white'
                        }`}
                      >
                        <span>{p.tabLabel}</span>
                        {isActive && (
                          <motion.span
                            layoutId="activeCleanTab"
                            className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#9B1C22]"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Viewport Mode & Nav Arrows */}
                <div className="flex items-center gap-1.5 ml-2">
                  <div className="hidden sm:flex items-center gap-1 p-1 bg-[#F5F4F0] dark:bg-[#161615] rounded-xl border border-[#E4E2D8] dark:border-[#262624]">
                    <button
                      onClick={() => setDeviceMode('desktop')}
                      title="Desktop View"
                      data-cursor-label="Desktop 💻"
                      className={`p-1.5 rounded-lg transition-all ${
                        deviceMode === 'desktop'
                          ? 'bg-white dark:bg-[#232321] text-[#9B1C22] shadow-xs'
                          : 'text-[#888] hover:text-[#171717]'
                      }`}
                    >
                      <Monitor className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeviceMode('mobile')}
                      title="Mobile View"
                      data-cursor-label="Mobile 📱"
                      className={`p-1.5 rounded-lg transition-all ${
                        deviceMode === 'mobile'
                          ? 'bg-white dark:bg-[#232321] text-[#9B1C22] shadow-xs'
                          : 'text-[#888] hover:text-[#171717]'
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={prevSlide}
                    aria-label="Previous Project"
                    data-cursor-label="Prev ←"
                    className="p-2 rounded-xl bg-white dark:bg-[#1A1A18] border border-[#E4E2D8] dark:border-[#262624] text-[#555] dark:text-[#AAA] hover:text-[#171717] hover:border-[#9B1C22]/60 transition-colors shadow-xs cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    aria-label="Next Project"
                    data-cursor-label="Next →"
                    className="p-2 rounded-xl bg-white dark:bg-[#1A1A18] border border-[#E4E2D8] dark:border-[#262624] text-[#555] dark:text-[#AAA] hover:text-[#171717] hover:border-[#9B1C22]/60 transition-colors shadow-xs cursor-pointer"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Browser Mockup Frame — 3D Tilt Wrapper */}
              <div
                className={`transition-all duration-500 mx-auto ${
                  deviceMode === 'mobile' ? 'max-w-[340px]' : 'w-full'
                }`}
                style={{ perspective: '1200px' }}
              >
                {/* 3D floating shadow layer */}
                <motion.div
                  style={{ rotateX, rotateY }}
                  className="absolute -inset-4 rounded-3xl pointer-events-none z-0"
                  animate={isHovering3D ? {
                    boxShadow: '0 40px 80px -12px rgba(0,0,0,0.25), 0 20px 40px -8px rgba(184,155,114,0.15)'
                  } : {
                    boxShadow: '0 20px 40px -8px rgba(0,0,0,0.12), 0 8px 16px -4px rgba(184,155,114,0.08)'
                  }}
                  transition={{ duration: 0.4 }}
                />

                <motion.div
                  ref={tiltRef}
                  onMouseMove={handleMouseMove}
                  onMouseEnter={handleMouseEnter3D}
                  onMouseLeave={handleMouseLeave3D}
                  style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                  className="rounded-2xl overflow-hidden bg-white dark:bg-[#141413] border border-[#E4E2D8] dark:border-[#262624] shadow-xl relative"
                >
                  {/* Glare / shine layer */}
                  <motion.div
                    className="absolute inset-0 z-50 pointer-events-none rounded-2xl overflow-hidden"
                    animate={{ opacity: isHovering3D ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2"
                      style={{
                        background: 'radial-gradient(circle at center, rgba(255,255,255,0.12) 0%, transparent 60%)',
                      }}
                    />
                  </motion.div>


                  {/* Minimalist Browser Bar */}
                  <div className="h-10 px-4 bg-[#F8F7F4] dark:bg-[#121211] border-b border-[#E4E2D8] dark:border-[#262624] flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#E5191B]/70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#B89B72]/70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                    </div>

                    {/* URL Bar */}
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor-label="Buka Live ↗"
                      className="px-3 py-1 rounded-md bg-white dark:bg-[#1C1C1A] text-[11px] font-mono text-[#555] dark:text-[#8E8D89] hover:text-[#171717] border border-[#E4E2D8] dark:border-[#262624] flex items-center gap-1.5 max-w-[260px] truncate shadow-2xs transition-colors"
                    >
                      <span className="text-emerald-500 text-[9px]">🔒</span>
                      <span className="truncate">{activeProject.displayUrl}</span>
                    </a>

                    <span className="text-[11px] font-mono text-[#8E8D89]">
                      0{currentSlide + 1} / 0{REAL_PROJECTS.length}
                    </span>
                  </div>

                  {/* Slim Hairline Progress Bar */}
                  <div className="w-full h-[2px] bg-[#EAE8E2] dark:bg-[#1F1F1D] relative overflow-hidden">
                    {!isPaused && (
                      <motion.div
                        key={currentSlide}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 6, ease: 'linear' }}
                        className="h-full bg-[#9B1C22]"
                      />
                    )}
                  </div>

                  {/* Carousel Slide Area */}
                  <div className="relative aspect-[16/10] sm:aspect-[16/9.5] bg-[#0E0E0D] overflow-hidden">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={activeProject.id}
                        initial={{
                          opacity: 0,
                          x: slideDirection === 'right' ? 60 : -60,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        exit={{
                          opacity: 0,
                          x: slideDirection === 'right' ? -60 : 60,
                        }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 w-full h-full"
                      >
                        {/* High-Resolution Project Screenshot */}
                        <img
                          src={activeProject.image}
                          alt={activeProject.title}
                          className="w-full h-full object-cover object-top"
                        />

                        {/* Professional Dark Gradient Overlay for Contrast */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-5 sm:p-7 text-white" />

                        {/* Clean Content Overlay */}
                        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 flex flex-col justify-end z-10 text-white">
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#B83240]">
                              {activeProject.category}
                            </span>
                            <span className="text-[10px] font-mono text-white/70 bg-white/10 px-2 py-0.5 rounded backdrop-blur-xs">
                              Proyek Live
                            </span>
                          </div>

                          <h3 className="text-xl sm:text-2xl font-editorial font-normal tracking-tight text-white mb-1">
                            {activeProject.title}
                          </h3>

                          <p className="text-xs text-white/80 line-clamp-1 mb-3 max-w-md font-sans">
                            {activeProject.subtitle}
                          </p>

                          {/* Footer with Metadata & Direct Clean Button */}
                          <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/15">
                            <div className="hidden sm:flex items-center gap-2 text-[11px] text-white/70 font-mono">
                              <span>{activeProject.scope}</span>
                            </div>

                            <motion.a
                              href={activeProject.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#171717] hover:bg-[#F0EEEA] text-xs font-semibold tracking-wide transition-colors shadow-sm ml-auto cursor-pointer"
                            >
                              <span>Kunjungi Website</span>
                              <ArrowUpRight className="w-3.5 h-3.5 text-[#9B1C22]" />
                            </motion.a>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>

              {/* Bottom Carousel Indicator Pills */}
              <div className="flex items-center justify-between mt-3 px-2">
                <div className="flex items-center gap-1.5">
                  {REAL_PROJECTS.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => goToSlide(idx)}
                      aria-label={`Project ${idx + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentSlide
                          ? 'w-6 bg-[#9B1C22]'
                          : 'w-2 bg-[#D8D6CE] dark:bg-[#333330] hover:bg-[#A8A7A0]'
                      }`}
                    />
                  ))}
                </div>

                <div className="text-[11px] font-mono text-[#888] dark:text-[#777]">
                  Berhenti saat hover · Klik untuk kunjungi
                </div>
              </div>
            </div>
            </motion.div>{/* end floating */}
          </motion.div>

        </div>
      </div>
    </section>
  );
};
