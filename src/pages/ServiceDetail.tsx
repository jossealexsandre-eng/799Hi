import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ArrowDown,
  ArrowUpRight,
  MessageCircle,
  Sun,
  Moon,
  Layers,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  FileText,
} from 'lucide-react';
import {
  getServiceBySlug,
  ServicePackageItem,
  SERVICE_POLICIES,
  buildDynamicWhatsAppUrl,
  SERVICE_SLUGS,
  SERVICE_PRICING_DATA,
} from '../data/servicePricing';
import { LIVE_PROJECTS } from '../components/Portfolio';
import { PackageCard } from '../components/pricing/PackageCard';
import { ComparisonTable } from '../components/pricing/ComparisonTable';
import { AddOnEstimator } from '../components/pricing/AddOnEstimator';
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

  // Resolve service data using slug or alias
  const serviceData = slug ? getServiceBySlug(slug) : null;

  // Selected package state for interactive customization
  const [selectedPackage, setSelectedPackage] = useState<ServicePackageItem | null>(() => {
    if (!serviceData || serviceData.packages.length === 0) return null;
    // Default to Standard (index 1) or first
    return serviceData.packages[1] || serviceData.packages[0];
  });

  // Track open FAQ accordion items
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [openPolicyIndex, setOpenPolicyIndex] = useState<number | null>(null);

  // Scroll to top on slug change and set document title
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (serviceData) {
      document.title = `${serviceData.title} | 799Hi Creatives`;
      // Reset selected package to Standard
      setSelectedPackage(serviceData.packages[1] || serviceData.packages[0]);
    }
  }, [slug, serviceData]);

  if (!serviceData) {
    return (
      <div className="min-h-screen bg-white light:bg-white dark:bg-[#0A0A09] text-[#171717] dark:text-[#F7F7F5] flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-3xl font-editorial font-normal mb-3">
          Layanan Tidak Ditemukan
        </h1>
        <p className="text-sm text-[#8E8D89] light:text-[#737373] mb-6 max-w-md">
          Kategori layanan yang Anda cari tidak tersedia atau tautan telah diperbarui ke katalog terbaru kami.
        </p>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F20D0D] text-white font-medium text-xs uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Lihat Seluruh Layanan</span>
        </Link>
      </div>
    );
  }

  const handlePackageSelect = (pkg: ServicePackageItem) => {
    setSelectedPackage(pkg);
    // Smooth scroll down to customizer section
    const el = document.getElementById('customizer-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToPackages = () => {
    const el = document.getElementById('packages-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHeroConsultation = () => {
    const url = buildDynamicWhatsAppUrl({
      serviceName: serviceData.title,
      packageName: selectedPackage?.name || 'Konsultasi Layanan',
      packagePrice: selectedPackage?.priceFormatted || serviceData.startingPriceFormatted,
      totalEstimate: selectedPackage?.priceFormatted || serviceData.startingPriceFormatted,
      notes: `Saya tertarik berkonsultasi mengenai pembuatan website ${serviceData.title}.`,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-white light:bg-white dark:bg-[#0A0A09] text-[#171717] dark:text-[#F7F7F5] transition-colors duration-300 selection:bg-[#F20D0D]/20 selection:text-white relative">
      {/* ── 1. Header Navigation Bar ── */}
      <header className="sticky top-0 z-40 bg-[#0A0A09]/90 light:bg-[#F7F7F5]/90 backdrop-blur-md border-b border-[#262623] light:border-[#E3E0D8] py-3.5 transition-colors">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Logo & Breadcrumb */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link to="/" className="flex items-center gap-2" title="799Hi Home">
              <div className="h-7 w-16 sm:h-8 sm:w-20 flex items-center justify-center">
                <Logo799Hi
                  className="w-full h-full"
                  color={isDark ? '#F20D0D' : '#721B1B'}
                  glow={isDark}
                />
              </div>
            </Link>

            <span className="text-[#555] dark:text-[#444]">/</span>

            <Link
              to="/services"
              className="text-xs font-mono uppercase tracking-wider text-[#8E8D89] light:text-[#737373] hover:text-[#F7F7F5] light:hover:text-[#171717] transition-colors"
            >
              Services
            </Link>

            <span className="hidden sm:inline-block text-[#555] dark:text-[#444]">/</span>

            <span className="hidden sm:inline-block text-xs font-mono uppercase tracking-wider text-[#F20D0D] font-semibold">
              {serviceData.title}
            </span>
          </div>

          {/* Right actions: Theme & Quick Consultation */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl border border-[#2A2A26] light:border-[#DED9CD] bg-[#141413] light:bg-[#FFFFFF] text-[#8E8D89] light:text-[#737373] hover:text-[#F7F7F5] light:hover:text-[#171717] transition-colors cursor-pointer"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={handleHeroConsultation}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#F20D0D] hover:bg-[#d40b0b] text-white text-xs font-semibold tracking-wide transition-colors cursor-pointer shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Konsultasi</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── A. Hero Section ── */}
      <section className="pt-16 sm:pt-24 pb-16 sm:pb-20 relative overflow-hidden border-b border-[#242421] light:border-[#EAE7E1]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="max-w-3xl">
            {/* Category Eyebrow */}
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="text-xs font-mono uppercase tracking-[0.2em] text-[#F20D0D] block mb-3 font-medium"
            >
              {serviceData.eyebrow}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="text-4xl sm:text-5xl md:text-6xl font-editorial font-normal tracking-tight text-[#F7F7F5] light:text-[#171717] leading-[1.12] mb-4"
            >
              {serviceData.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.14 }}
              className="text-lg sm:text-xl text-[#B8A99A] font-medium mb-4"
            >
              {serviceData.heroHeadline}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="text-sm sm:text-base text-[#8E8D89] light:text-[#737373] leading-relaxed mb-8 max-w-2xl"
            >
              {serviceData.heroDescription}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.26 }}
              className="flex flex-wrap items-center gap-4"
            >
              <button
                onClick={handleScrollToPackages}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#171717] light:bg-[#171717] dark:bg-[#F7F7F5] text-white dark:text-[#0F0F0E] font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
              >
                <span>Lihat Pilihan Paket</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={handleHeroConsultation}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[#282825] light:border-[#DED9CD] text-xs font-semibold uppercase tracking-wider text-[#F7F7F5] light:text-[#171717] hover:bg-[#1A1A18] light:hover:bg-[#FFFFFF] transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#F20D0D]" />
                <span>Konsultasi via WhatsApp</span>
              </button>

              <span className="text-xs font-mono text-[#8E8D89] light:text-[#737373] ml-1">
                Mulai dari <strong className="text-[#F20D0D] font-bold">{serviceData.startingPriceFormatted}</strong>
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Karya Nyata (Live Portfolio Showcase for this Category) ── */}
      {LIVE_PROJECTS.filter((p) => p.categorySlug === serviceData.slug).length > 0 && (
        <section className="py-16 sm:py-20 bg-[#111110] light:bg-[#F7F6F2] border-b border-[#242421] light:border-[#EAE7E1]">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#F20D0D] block mb-2 font-medium">
                  CONTOH KARYA NYATA
                </span>
                <h2 className="text-2xl sm:text-3xl font-editorial font-normal text-[#F7F7F5] light:text-[#171717]">
                  Proyek {serviceData.title} yang Telah Kami Bangun
                </h2>
              </div>
              <span className="text-xs font-mono text-[#8E8D89] light:text-[#737373]">
                Klik pada proyek untuk membuka website secara langsung
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {LIVE_PROJECTS.filter((p) => p.categorySlug === serviceData.slug).map((project) => (
                <a
                  key={project.id}
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl bg-[#161615] light:bg-[#FFFFFF] border border-[#282825] light:border-[#E2E0D8] hover:border-[#F20D0D]/60 overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-[0_18px_45px_-15px_rgba(17,17,17,0.12)] hover:shadow-[0_24px_55px_-15px_rgba(17,17,17,0.2)] hover:-translate-y-1"
                >
                  <div>
                    <div className="h-8 px-3.5 bg-[#1C1C1A] light:bg-[#F2F0EB] border-b border-[#262624] light:border-[#E4E2D8] flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#D8D6CE] dark:bg-[#3A3A36]" />
                        <span className="w-2 h-2 rounded-full bg-[#D8D6CE] dark:bg-[#3A3A36]" />
                        <span className="w-2 h-2 rounded-full bg-[#D8D6CE] dark:bg-[#3A3A36]" />
                      </div>
                      <span className="text-[10px] font-mono text-[#8E8D89] light:text-[#666] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {project.displayUrl}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#888] group-hover:text-[#F20D0D] transition-colors" />
                    </div>

                    <div className="aspect-[16/10] overflow-hidden bg-[#0E0E0D]">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                      />
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-editorial font-normal text-[#F7F7F5] light:text-[#171717] group-hover:text-[#F20D0D] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-[#8E8D89] light:text-[#737373] mt-0.5">
                        {project.scope}
                      </p>
                      <div className="flex items-baseline gap-2 mt-2">
                        {project.originalPrice && (
                          <span className="text-xs font-mono text-[#888] line-through decoration-[#F20D0D]/80">
                            {project.originalPrice}
                          </span>
                        )}
                        <span className="text-xs font-mono font-bold text-[#F20D0D]">
                          {project.startingPrice}
                        </span>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 px-3.5 py-2 rounded-full bg-[#171717] text-white dark:bg-[#F7F7F5] dark:text-[#171717] text-[11px] font-semibold shrink-0 group-hover:bg-[#F20D0D] group-hover:text-white transition-colors">
                      <span>Lihat Live</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── B. Package Pricing Cards ── */}
      <section id="packages-section" className="py-20 sm:py-28 relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="max-w-2xl mb-12 sm:mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#F20D0D] block mb-2 font-medium">
              PILIHAN PAKET RESMI
            </span>
            <h2 className="text-3xl sm:text-4xl font-editorial font-normal tracking-tight text-[#F7F7F5] light:text-[#171717] mb-3">
              Investasi Transparan. Tanpa Biaya Tersembunyi.
            </h2>
            <p className="text-sm sm:text-base text-[#8E8D89] light:text-[#737373]">
              Pilih paket yang paling sesuai dengan kebutuhan dan anggaranmu saat ini. Seluruh fitur dapat dikustomisasi dengan add-ons.
            </p>
          </div>

          {/* 3 Package Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {serviceData.packages.map((pkg, idx) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                index={idx}
                isSelected={selectedPackage?.id === pkg.id}
                onSelect={handlePackageSelect}
              />
            ))}
          </div>

          {/* ── D. Full Feature Comparison Table ── */}
          <ComparisonTable
            packages={serviceData.packages}
            features={serviceData.comparisonFeatures}
            selectedPackageId={selectedPackage?.id}
            onSelectPackage={handlePackageSelect}
          />

          {/* ── E. Add-ons & Live Price Estimator ── */}
          {selectedPackage && (
            <AddOnEstimator
              serviceSlug={serviceData.slug}
              serviceTitle={serviceData.title}
              packages={serviceData.packages}
              selectedPackage={selectedPackage}
              onSelectPackage={setSelectedPackage}
            />
          )}
        </div>
      </section>

      {/* ── F. Common Service Policies ── */}
      <section className="py-16 sm:py-20 bg-[#111110] light:bg-[#F2F0EA] border-y border-[#242421] light:border-[#E3E0D8]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#F20D0D] block mb-2 font-medium">
              STANDAR LAYANAN
            </span>
            <h3 className="text-2xl sm:text-3xl font-editorial font-normal text-[#F7F7F5] light:text-[#171717]">
              Ketentuan &amp; Kebijakan Layanan
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#8E8D89] light:text-[#737373]">
              Komitmen transparansi mengenai domain, hosting, pembayaran DP, revisi, dan garansi teknis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SERVICE_POLICIES.map((policy, pIdx) => {
              const isOpen = openPolicyIndex === pIdx;
              return (
                <div
                  key={pIdx}
                  className="p-5 rounded-2xl bg-[#171716] light:bg-[#FFFFFF] border border-[#262623] light:border-[#E0DCD3]"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="text-sm font-semibold text-[#F7F7F5] light:text-[#171717]">
                      {policy.title}
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#F20D0D]/10 text-[#F20D0D]">
                      Resmi
                    </span>
                  </div>
                  <p className="text-xs font-medium text-[#B8A99A] mb-2">
                    {policy.summary}
                  </p>
                  <p className="text-xs text-[#8E8D89] light:text-[#737373] leading-relaxed">
                    {policy.details}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── G. FAQ Section ── */}
      <section className="py-20 sm:py-24 relative">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#F20D0D] block mb-2 font-medium">
              PERTANYAAN UMUM
            </span>
            <h3 className="text-2xl sm:text-3xl font-editorial font-normal text-[#F7F7F5] light:text-[#171717]">
              Frequently Asked Questions
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#8E8D89] light:text-[#737373]">
              Hal-hal yang sering ditanyakan mengenai layanan {serviceData.title}.
            </p>
          </div>

          <div className="space-y-3">
            {serviceData.faq.map((faqItem, fIdx) => {
              const isOpen = openFaqIndex === fIdx;
              return (
                <div
                  key={fIdx}
                  className="rounded-xl border border-[#262623] light:border-[#E3E0D8] bg-[#141413] light:bg-[#FFFFFF] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                    className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-semibold text-[#F7F7F5] light:text-[#171717] hover:text-[#F20D0D] transition-colors cursor-pointer"
                  >
                    <span>{faqItem.q}</span>
                    <span className="text-[#8E8D89] light:text-[#737373] shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-4 text-xs text-[#8E8D89] light:text-[#737373] leading-relaxed border-t border-[#242421] light:border-[#EAE7E1] pt-3">
                          {faqItem.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── H. Consultation CTA ── */}
      <section className="py-20 sm:py-24 bg-[#141413] light:bg-[#F2F0EA] border-t border-[#262623] light:border-[#E3E0D8] text-center">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#F20D0D] block mb-3 font-semibold">
            MULAI PROYEK KAMU
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-normal text-[#F7F7F5] light:text-[#171717] mb-4">
            Konsultasikan Website Kamu
          </h2>

          <p className="text-sm sm:text-base text-[#8E8D89] light:text-[#737373] max-w-lg mx-auto mb-8">
            Belum yakin paket mana yang tepat? Diskusikan ide dan kebutuhanmu langsung dengan tim 799Hi via WhatsApp.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleHeroConsultation}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#F20D0D] hover:bg-[#d40b0b] text-white font-semibold text-xs uppercase tracking-wider transition-colors shadow-lg cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Konsultasi via WhatsApp</span>
            </button>

            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[#282825] light:border-[#DED9CD] text-xs font-semibold uppercase tracking-wider text-[#F7F7F5] light:text-[#171717] hover:bg-[#1A1A18] light:hover:bg-[#FFFFFF] transition-colors cursor-pointer"
            >
              <span>Jelajahi Layanan Lain</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <Footer />

      {/* Floating WhatsApp Action */}
      <FloatingWhatsApp />
    </div>
  );
};
