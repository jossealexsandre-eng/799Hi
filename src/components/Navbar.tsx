import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { getWhatsAppLink } from '../data/content';
import { Logo799Hi } from './Logo799Hi';
import { Magnetic } from './Magnetic';

interface NavbarProps {
  onOpenInquiry: (initialPackage?: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onReplayIntro?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenInquiry,
  isDark,
  onToggleTheme,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredNavIndex, setHoveredNavIndex] = useState<number | null>(null);
  const [activeNav, setActiveNav] = useState('#home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active link detection
      const sections = ['#home', '#services', '#work', '#pricing', '#process', '#faq'];
      const scrollPos = window.scrollY + 180;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.querySelector(sections[i]);
        if (el && (el as HTMLElement).offsetTop <= scrollPos) {
          setActiveNav(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Beranda', href: '#home' },
    { label: 'Layanan', href: '#services' },
    { label: 'Karya', href: '#work' },
    { label: 'Harga', href: '#pricing' },
    { label: 'Proses', href: '#process' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleNavClick = (href: string) => {
    setActiveNav(href);
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? 'py-3 bg-[#0A0A09]/85 light:bg-[#F7F7F5]/85 backdrop-blur-xl border-b border-[#242422]/90 light:border-[#E3E0D8]/90 shadow-[0_4px_30px_rgba(155,28,34,0.03)]'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Zone 1: Pure Transparent Logo Mark (with subtle red glow in dark mode) */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavClick('#home')}
              title="799Hi"
              aria-label="799Hi Home"
              data-cursor-label="799Hi ✦"
              className="group flex items-center focus:outline-none"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="h-8 w-20 sm:h-9 sm:w-24 flex items-center justify-center"
              >
                <Logo799Hi
                  className="w-full h-full"
                  color={isDark ? '#9B1C22' : '#881820'}
                  glow={isDark}
                />
              </motion.div>
            </button>
          </div>

          {/* Zone 2: Navigation Links with Fluid Sliding Pill & Staggered Smooth Interactions */}
          <nav
            aria-label="Main Navigation"
            onMouseLeave={() => setHoveredNavIndex(null)}
            className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-[#141413]/40 light:bg-[#EFECE6]/50 border border-[#222220]/60 light:border-[#DFDCD4]/60 backdrop-blur-sm"
          >
            {navLinks.map((link, idx) => {
              const isHovered = hoveredNavIndex === idx;
              const isActive = activeNav === link.href;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onMouseEnter={() => setHoveredNavIndex(idx)}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`relative px-4 py-1.5 text-[13px] font-medium transition-colors duration-200 z-10 ${
                    isActive
                      ? 'text-[#F7F7F5] light:text-[#171717] font-semibold'
                      : 'text-[#8E8D89] light:text-[#737373] hover:text-[#F7F7F5] light:hover:text-[#171717]'
                  }`}
                >
                  {/* Sliding hover pill capsule */}
                  {isHovered && (
                    <motion.span
                      layoutId="navbar-hover-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                      className="absolute inset-0 rounded-full bg-[#20201D] light:bg-[#FFFFFF] border border-[#2F2F2B] light:border-[#DDD9CF] shadow-xs z-[-1]"
                    />
                  )}

                  {/* Active small indicator point (subtle red) */}
                  {isActive && !isHovered && (
                    <motion.span
                      layoutId="navbar-active-dot"
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#9B1C22]"
                    />
                  )}

                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Theme Toggle + Primary CTA) */}
          <div className="hidden md:flex items-center gap-3">
            {/* Dark Mode Toggle with Smooth Icon Rotation */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.94 }}
              onClick={onToggleTheme}
              aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              data-cursor-label="Ganti Tema 🌓"
              className={`p-2 rounded-xl transition-all duration-300 border flex items-center justify-center cursor-pointer ${
                isDark
                  ? 'border-[#9B1C22]/30 bg-[#161615] text-[#9B1C22] shadow-[0_0_12px_rgba(155,28,34,0.22)] hover:shadow-[0_0_18px_rgba(155,28,34,0.4)] hover:border-[#9B1C22]/60'
                  : 'border-[#E3E0D8] bg-white text-[#171717] shadow-xs hover:border-[#9B1C22]/40 hover:text-[#9B1C22]'
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDark ? 'sun' : 'moon'}
                  initial={{ rotate: -70, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 70, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  {isDark ? (
                    <Sun className="w-4 h-4 text-[#9B1C22]" />
                  ) : (
                    <Moon className="w-4 h-4 text-[#171717]" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {/* Primary Action Button with Magnetic Effect & Pulse Shockwave */}
            <Magnetic strength={0.35} threshold={75}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => onOpenInquiry()}
                data-cursor-label="Mulai Proyek ↗"
                className="btn-pulse inline-flex items-center gap-1.5 px-4.5 py-2 text-xs font-semibold uppercase tracking-wider text-[#0F0F0E] bg-[#F7F7F5] light:bg-[#171717] light:text-[#F7F7F5] rounded-full hover:bg-white light:hover:bg-black transition-all whitespace-nowrap shadow-xs hover:shadow-[0_0_20px_rgba(155,28,34,0.18)] group cursor-pointer border border-transparent hover:border-[#9B1C22]/20"
              >
                <span>Mulai Proyek</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#9B1C22] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </motion.button>
            </Magnetic>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={onToggleTheme}
              aria-label="Toggle theme"
              className={`p-2 rounded-xl transition-all border ${
                isDark
                  ? 'border-[#9B1C22]/30 bg-[#161615] text-[#9B1C22] shadow-[0_0_10px_rgba(155,28,34,0.2)]'
                  : 'border-[#E3E0D8] bg-white text-[#171717]'
              }`}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-[#9B1C22]" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              className="p-2 text-[#F7F7F5] light:text-[#171717] focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#9B1C22]" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer with Smooth Slide and Staggered Items */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16, scaleY: 0.98 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -14, scaleY: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-[65px] z-30 p-5 bg-[#0F0F0E]/95 light:bg-[#F7F7F5]/95 backdrop-blur-2xl border-b border-[#282825] light:border-[#E3E0D8] shadow-2xl md:hidden origin-top"
          >
            <nav className="flex flex-col gap-2 text-base font-medium">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04, duration: 0.25 }}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`py-2.5 px-3.5 rounded-xl transition-colors flex items-center justify-between ${
                    activeNav === link.href
                      ? 'bg-[#1C1C1A] light:bg-[#EAE7E1] text-[#9B1C22] font-semibold'
                      : 'text-[#F7F7F5] light:text-[#171717] hover:bg-[#1A1A18] light:hover:bg-[#EFEDE8]'
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-[#9B1C22]">→</span>
                </motion.a>
              ))}
              <div className="pt-3 mt-1 border-t border-[#282825] light:border-[#E3E0D8] flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenInquiry();
                  }}
                  className="w-full py-3.5 px-4 text-center text-xs font-semibold uppercase tracking-wider rounded-full bg-[#F7F7F5] text-[#0F0F0E] light:bg-[#171717] light:text-[#F7F7F5] flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-[0_0_20px_rgba(155,28,34,0.18)]"
                >
                  <span>Mulai Proyek</span>
                  <ArrowUpRight className="w-4 h-4 text-[#9B1C22]" />
                </button>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 text-center text-xs font-medium text-[#8E8D89] hover:text-[#9B1C22] transition-colors"
                >
                  WhatsApp: +62 821-9775-4103
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

