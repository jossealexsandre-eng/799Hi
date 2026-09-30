/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { Pricing } from './components/Pricing';
import { Process } from './components/Process';
import { WhyUs } from './components/WhyUs';
import { FAQ } from './components/FAQ';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { BackToTop } from './components/BackToTop';
import { CustomCursor } from './components/CustomCursor';
import { WeddingDemoModal } from './components/WeddingDemoModal';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { IntroAnimation } from './components/IntroAnimation';
import { SectionDivider } from './components/SectionDivider';
import { ServiceDetail } from './pages/ServiceDetail';
import { ClickBurst } from './components/ClickBurst';
import { AmbientParticles } from './components/AmbientParticles';

export default function App() {
  const location = useLocation();
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    // Only show intro animation when first hitting root
    if (typeof window !== 'undefined') {
      return window.location.pathname === '/';
    }
    return true;
  });

  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('alxv-theme');
      if (stored) return stored === 'dark';
    }
    return false; // Basic default: white / light mode
  });

  const [isLiveWeddingOpen, setIsLiveWeddingOpen] = useState<boolean>(false);
  const [preselectedPackage, setPreselectedPackage] = useState<string>('');
  const [preselectedService, setPreselectedService] = useState<string>('');

  // Sync dark class on html root element and persist in localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
      localStorage.setItem('alxv-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      localStorage.setItem('alxv-theme', 'light');
    }
  }, [isDark]);

  const scrollToContact = (pkgName?: string) => {
    if (pkgName) {
      setPreselectedPackage(pkgName);
    }
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToWork = () => {
    const el = document.getElementById('work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleServiceSelect = (serviceTitle: string) => {
    setPreselectedService(serviceTitle);
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isHome = location.pathname === '/';

  /** Page transition variants — subtle fade + lift */
  const pageVariants = {
    initial: { opacity: 0, y: 18 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as any },
    },
    exit: {
      opacity: 0,
      y: -12,
      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as any },
    },
  };

  return (
    <div className="min-h-screen bg-white light:bg-white dark:bg-[#0A0A09] text-[#171717] dark:text-[#F7F7F5] transition-colors duration-300 selection:bg-[#B89B72]/30 selection:text-white relative">
      {/* Intro Animation (only on home initial load) */}
      <AnimatePresence>
        {showIntro && isHome && (
          <IntroAnimation onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      {/* Visual Reading Progress Bar */}
      <ScrollProgressBar />

      {/* Subtle Desktop Cursor */}
      <CustomCursor />

      {/* ── ANIMATIONS ── */}
      {/* 1. Click burst sparkle on every click */}
      <ClickBurst />

      {/* 2. Floating ambient dust particles (background) */}
      <AmbientParticles />


      {/* Routes Switch — AnimatePresence mode="wait" for smooth page transitions */}
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          {/* Main Landing Route */}
          <Route
            path="/"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {/* Sticky Navigation */}
                <Navbar
                  onOpenInquiry={(pkg) => scrollToContact(pkg)}
                  isDark={isDark}
                  onToggleTheme={() => setIsDark(!isDark)}
                />

                {/* Main Content Sections */}
                <main>
                  {/* 1. Hero */}
                  <Hero
                    onStartProject={() => scrollToContact()}
                    onViewWork={scrollToWork}
                    onOpenLiveWedding={() => setIsLiveWeddingOpen(true)}
                  />

                  {/* 2. Trust Bar */}
                  <TrustBar />

                  {/* 3. Services */}
                  <Services onSelectServiceForInquiry={handleServiceSelect} />

                  <SectionDivider />

                  {/* 4. Portfolio (Selected Work) */}
                  <Portfolio
                    onOpenLiveWedding={() => setIsLiveWeddingOpen(true)}
                    onOpenCaseStudy={() => setIsLiveWeddingOpen(true)}
                  />

                  <SectionDivider withAccent />

                  {/* 6. Pricing */}
                  <Pricing
                    onSelectPackage={(pkg) => scrollToContact(pkg)}
                  />

                  <SectionDivider />

                  {/* 7. Process */}
                  <Process />

                  {/* 8. Why 799Hi */}
                  <WhyUs />

                  <SectionDivider />


                  {/* 10. FAQ */}
                  <FAQ />

                  <SectionDivider withAccent />

                  {/* 11. Project Inquiry & Contact */}
                  <ContactForm
                    preselectedPackage={preselectedPackage}
                    preselectedService={preselectedService}
                  />
                </main>

                {/* 13. Footer */}
                <Footer />
              </motion.div>
            }
          />

          {/* Dedicated Service Category Pricing Experience Route */}
          <Route
            path="/services/:slug"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <ServiceDetail
                  isDark={isDark}
                  onToggleTheme={() => setIsDark(!isDark)}
                />
              </motion.div>
            }
          />

          {/* Fallback route back to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>

      {/* Floating WhatsApp Quick Action Button */}
      <FloatingWhatsApp />

      {/* Floating Back to Top Button */}
      <BackToTop />

      {/* Full Live Interactive Wedding Website Modal */}
      <WeddingDemoModal
        isOpen={isLiveWeddingOpen}
        onClose={() => setIsLiveWeddingOpen(false)}
        onInquireWedding={() => {
          setIsLiveWeddingOpen(false);
          scrollToContact('Wedding Invitation');
        }}
      />
    </div>
  );
}
