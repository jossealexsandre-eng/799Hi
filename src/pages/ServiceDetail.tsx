import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ArrowDown,
  MessageCircle,
  Sun,
  Moon,
  Sparkles,
  Layers,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import {
  SERVICE_PRICING_DATA,
  ServicePackageItem,
  buildCustomWhatsAppUrl,
  buildWhatsAppUrl,
} from '../data/servicePricing';
import { PackageCard } from '../components/pricing/PackageCard';
import { ComparisonTable } from '../components/pricing/ComparisonTable';
import { PackageConfirmModal } from '../components/pricing/PackageConfirmModal';
import { Logo799Hi } from '../components/Logo799Hi';
import { Footer } from '../components/Footer';
import { FloatingWhatsApp } from '../components/FloatingWhatsApp';

interface ServiceDetailProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export const ServiceDetail: React.FC<ServiceDetailProps> = ({
  isDark,
  onToggleTheme,
}) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [selectedPackageForConfirm, setSelectedPackageForConfirm] =
    useState<ServicePackageItem | null>(null);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  const serviceData = slug ? SERVICE_PRICING_DATA[slug] : null;

  if (!serviceData) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0A0A09] text-[#171717] dark:text-[#F7F7F5] flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-editorial font-normal mb-4">
          Service Not Found
        </h1>
        <p className="text-sm text-[#8E8D89] mb-6">
          The requested service pricing category does not exist.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#B89B72] text-[#0A0A09] font-medium text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to 799Hi</span>
        </Link>
      </div>
    );
  }

  const handleBackToServices = () => {
    navigate('/');
    // Smooth scroll to services section on home
    setTimeout(() => {
      const el = document.getElementById('services');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleScrollToPackages = () => {
    const el = document.getElementById('packages-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCustomWhatsApp = () => {
    window.open(buildCustomWhatsAppUrl(), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-white light:bg-white dark:bg-[#0A0A09] text-[#171717] dark:text-[#F7F7F5] transition-colors duration-300 selection:bg-[#B89B72]/30 selection:text-white relative">
      {/* 1. Header Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#0A0A09]/90 light:bg-[#F7F7F5]/90 backdrop-blur-md border-b border-[#262623] light:border-[#E3E0D8] py-3.5 transition-colors">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Logo & Breadcrumb */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="flex items-center group focus:outline-none"
              title="799Hi Home"
            >
              <div className="h-7 w-16 sm:h-8 sm:w-20 flex items-center justify-center transition-transform group-hover:scale-105">
                <Logo799Hi className="w-full h-full" color="#E01010" glow={isDark} />
              </div>
            </Link>

            {/* Subtle Breadcrumb */}
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#8E8D89] light:text-[#737373]">
              <Link to="/" className="hover:text-[#B89B72] transition-colors">
                Home
              </Link>
              <span>/</span>
              <button
                onClick={handleBackToServices}
                className="hover:text-[#B89B72] transition-colors"
              >
                Services
              </button>
              <span>/</span>
              <span className="text-[#F7F7F5] light:text-[#171717] font-medium">
                {serviceData.categoryName}
              </span>
            </div>
          </div>

          {/* Right Actions: Back to Services & Theme Toggle */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={handleBackToServices}
              className="group inline-flex items-center gap-2 text-xs font-medium text-[#8E8D89] light:text-[#737373] hover:text-[#B89B72] transition-colors px-3 py-1.5 rounded-lg border border-[#2E2E2A] light:border-[#D5D2C9] hover:border-[#B89B72]/50"
            >
              <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-1 transition-transform" />
              <span>Back to Services</span>
            </button>

            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg text-[#8E8D89] hover:text-[#F7F7F5] light:hover:text-[#171717] hover:bg-[#1E1E1C] light:hover:bg-[#EAE7E1] transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Service Detail Content with Framer Motion Page Transition */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-5 sm:px-8 pt-12 sm:pt-16 pb-24"
      >
        {/* Back Link Top on Mobile */}
        <div className="sm:hidden mb-6">
          <button
            onClick={handleBackToServices}
            className="group inline-flex items-center gap-2 text-xs font-medium text-[#8E8D89] light:text-[#737373] hover:text-[#B89B72] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-1 transition-transform" />
            <span>← Back to Services</span>
          </button>
        </div>

        {/* Hero Section */}
        <div className="max-w-3xl mb-14 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="flex items-center gap-2 mb-3"
          >
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#B89B72] font-semibold">
              {serviceData.eyebrow}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-editorial font-normal tracking-tight text-[#F7F7F5] light:text-[#171717] mb-5 leading-[1.1]"
          >
            {serviceData.heroHeadline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-base sm:text-lg text-[#8E8D89] light:text-[#666666] leading-relaxed mb-6"
          >
            {serviceData.heroDescription}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2"
          >
            <div className="px-4 py-2 rounded-xl bg-[#141413] light:bg-[#F2EFE9] border border-[#262623] light:border-[#E3E0D8]">
              <span className="text-xs text-[#8E8D89] light:text-[#737373] block">
                Investment Range
              </span>
              <span className="text-base font-mono font-medium text-[#F7F7F5] light:text-[#171717]">
                Starting from{' '}
                <span className="text-[#B89B72] font-semibold">
                  {serviceData.startingPrice}
                </span>
                {serviceData.maxPrice && (
                  <span className="text-[#8E8D89] light:text-[#737373] text-xs font-normal">
                    {' '}
                    to {serviceData.maxPrice}
                  </span>
                )}
              </span>
            </div>

            {serviceData.hasPackages && (
              <button
                onClick={handleScrollToPackages}
                className="group inline-flex items-center gap-2 text-xs font-mono font-medium text-[#B89B72] hover:text-[#A6885E] py-2 px-3 transition-colors"
              >
                <span>View Packages</span>
                <ArrowDown className="w-3.5 h-3.5 transform group-hover:translate-y-1 transition-transform" />
              </button>
            )}
          </motion.div>
        </div>

        {/* 3. Packages Grid OR Custom Scoping Area */}
        <section id="packages-section" className="scroll-mt-24">
          {serviceData.hasPackages ? (
            <>
              {/* Category Subhead */}
              <div className="mb-8">
                <h2 className="text-xl sm:text-2xl font-editorial font-normal text-[#F7F7F5] light:text-[#171717]">
                  Choose the level that fits your needs.
                </h2>
                <p className="text-xs sm:text-sm text-[#8E8D89] light:text-[#737373] mt-1">
                  Transparent deliverables with no hidden charges.
                </p>
              </div>

              {/* 3 Package Cards Horizontal Desktop / Vertical Mobile */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
                {serviceData.packages.map((pkg, idx) => (
                  <PackageCard
                    key={pkg.id}
                    pkg={pkg}
                    index={idx}
                    onSelect={(p) => setSelectedPackageForConfirm(p)}
                  />
                ))}
              </div>

              {/* Dynamic Comparison Table */}
              <ComparisonTable
                packages={serviceData.packages}
                features={serviceData.comparisonFeatures}
                onSelectPackage={(p) => setSelectedPackageForConfirm(p)}
              />
            </>
          ) : (
            /* Custom Service Experience (No Fixed Packages) */
            <div className="pt-4">
              <div className="p-8 sm:p-12 rounded-3xl bg-[#141413] light:bg-[#FFFFFF] border border-[#282825] light:border-[#E3E0D8] mb-12">
                <div className="max-w-2xl mb-10">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#B89B72] block mb-2 font-semibold">
                    BESPOKE WEB ENGINEERING
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-editorial font-normal text-[#F7F7F5] light:text-[#171717] mb-3">
                    Built around your requirements.
                  </h2>
                  <p className="text-sm text-[#8E8D89] light:text-[#737373] leading-relaxed">
                    Custom software and digital platforms require deliberate discovery, technical scoping, and modular architecture. We design and build from scratch to match your workflow.
                  </p>
                </div>

                {/* For projects such as tags */}
                <div className="mb-10">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#F7F7F5] light:text-[#171717] block mb-4 font-medium">
                    For projects such as:
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {serviceData.customCapabilities?.map((item, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ opacity: 0, scale: 0.92 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: idx * 0.04 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#1D1D1B] light:bg-[#F2EFE9] border border-[#2A2A26] light:border-[#DED9CD] text-[#E0DFDC] light:text-[#333333] hover:border-[#B89B72]/60 hover:text-[#B89B72] transition-colors cursor-default"
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Custom Projects Showcase Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  {serviceData.customProjects?.map((proj, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: idx * 0.08 }}
                      whileHover={{ y: -3 }}
                      className="p-5 rounded-2xl bg-[#181817] light:bg-[#F9F8F5] border border-[#242421] light:border-[#EAE7E1] hover:border-[#B89B72]/40 transition-colors"
                    >
                      <h3 className="text-base font-editorial font-normal text-[#F7F7F5] light:text-[#171717] mb-2">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-[#8E8D89] light:text-[#737373] leading-relaxed">
                        {proj.description}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Custom Project CTA Button */}
                <div className="pt-6 border-t border-[#242421] light:border-[#EAE7E1] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-[#8E8D89] light:text-[#737373] block">
                      Custom Architecture Investment
                    </span>
                    <span className="text-xl font-mono font-medium text-[#B89B72]">
                      Starting from Rp2M+
                    </span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleCustomWhatsApp}
                    className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#B89B72] hover:bg-[#A6885E] text-[#0A0A09] font-medium text-sm flex items-center justify-center gap-2.5 shadow-md"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Let's discuss your project →</span>
                  </motion.button>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* 4. Service Page Final CTA */}
        <div className="mt-20 pt-16 border-t border-[#242421] light:border-[#EAE7E1]">
          <div className="p-8 sm:p-14 rounded-3xl bg-[#141413] light:bg-[#F9F8F5] border border-[#262623] light:border-[#E3E0D8] text-center max-w-4xl mx-auto relative overflow-hidden">
            {/* Background luxury glow */}
            <div className="absolute -top-24 -left-24 w-60 h-60 bg-[#B89B72]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-[#E5191B]/5 rounded-full blur-3xl pointer-events-none" />

            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#B89B72] font-semibold block mb-2">
              799Hi
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-normal tracking-tight text-[#F7F7F5] light:text-[#171717] mb-4">
              Ready to build yours?
            </h2>

            <p className="text-sm sm:text-base text-[#8E8D89] light:text-[#666666] max-w-xl mx-auto mb-8">
              Choose your package or tell us what you need. We'll reply within a few hours to kickstart your website.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  if (serviceData.hasPackages && serviceData.packages.length > 0) {
                    setSelectedPackageForConfirm(serviceData.packages[0]);
                  } else {
                    handleCustomWhatsApp();
                  }
                }}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#B89B72] hover:bg-[#A6885E] text-[#0A0A09] font-medium text-sm flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleCustomWhatsApp}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-transparent hover:bg-[#20201D] light:hover:bg-[#EAE7E1] border border-[#2E2E2A] light:border-[#D5D2C9] text-sm text-[#8E8D89] light:text-[#555555] hover:text-[#F7F7F5] light:hover:text-[#171717] flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.main>

      {/* 5. Package Selection Confirmation Modal */}
      <PackageConfirmModal
        isOpen={!!selectedPackageForConfirm}
        serviceTitle={serviceData.title}
        categoryName={serviceData.categoryName}
        selectedPackage={selectedPackageForConfirm}
        onClose={() => setSelectedPackageForConfirm(null)}
      />

      {/* 6. Footer */}
      <Footer />

      {/* 7. Floating WhatsApp */}
      <FloatingWhatsApp />
    </div>
  );
};
