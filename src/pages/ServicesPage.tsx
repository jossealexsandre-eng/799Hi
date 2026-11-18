import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowDown,
  MessageCircle,
  Sun,
  Moon,
} from 'lucide-react';
import {
  SERVICE_PRICING_DATA,
  SERVICE_SLUGS,
  buildDynamicWhatsAppUrl,
} from '../data/servicePricing';
import { Logo799Hi } from '../components/Logo799Hi';
import { Footer } from '../components/Footer';
import { FloatingWhatsApp } from '../components/FloatingWhatsApp';

interface ServicesPageProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  isDark,
  onToggleTheme,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Layanan & Paket Website | 799Hi Creatives';
  }, []);

  const handleScrollToOverview = () => {
    const el = document.getElementById('services-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGeneralConsultation = () => {
    const url = buildDynamicWhatsAppUrl({
      serviceName: 'Katalog Layanan 799Hi',
      packageName: 'Konsultasi Gratis',
      packagePrice: 'Free Consultation',
      totalEstimate: 'Sesuai Kebutuhan',
      notes: 'Saya ingin berkonsultasi mengenai pembuatan website yang cocok untuk kebutuhan saya.',
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const servicesList = SERVICE_SLUGS.map((slug) => SERVICE_PRICING_DATA[slug]);

  const workflowSteps = [
    {
      number: '01',
      title: 'Diskusi Awal',
      subtitle: 'Ceritakan kebutuhan dan tujuan website',
      desc: 'Obrolan santai untuk memahami jenis website, preferensi tampilan, serta fungsi yang dibutuhkan.',
    },
    {
      number: '02',
      title: 'Pilih Paket',
      subtitle: 'Tentukan layanan dan paket yang sesuai',
      desc: 'Pilih paket (Basic, Standard, Premium) dan fitur tambahan (add-on) sesuai anggaran.',
    },
    {
      number: '03',
      title: 'Perancangan',
      subtitle: 'Proses desain dan penataan materi',
      desc: 'Penyusunan tata letak, integrasi konten, optimasi gambar, dan implementasi fitur secara nyata.',
    },
    {
      number: '04',
      title: 'Tinjauan & Revisi',
      subtitle: 'Klien meninjau hasil dan mengajukan revisi',
      desc: 'Peninjauan bersama untuk memastikan tampilan dan fungsi sudah sesuai dengan kesepakatan.',
    },
    {
      number: '05',
      title: 'Publikasi',
      subtitle: 'Website dipublikasikan dan siap digunakan',
      desc: 'Pemasangan domain, konfigurasi hosting, uji coba akhir, dan website resmi aktif dapat diakses.',
    },
  ];

  return (
    <div className="min-h-screen bg-white light:bg-white dark:bg-[#0A0A09] text-[#171717] dark:text-[#F7F7F5] transition-colors duration-300 selection:bg-[#F20D0D]/20 selection:text-white relative">
      {/* ── Header Navigation ── */}
      <header className="sticky top-0 z-40 bg-[#0A0A09]/90 light:bg-[#F7F7F5]/90 backdrop-blur-md border-b border-[#262623] light:border-[#E3E0D8] py-3.5 transition-colors">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="flex items-center gap-2 group"
              title="799Hi Creatives"
            >
              <div className="h-7 w-16 sm:h-8 sm:w-20 flex items-center justify-center">
                <Logo799Hi
                  className="w-full h-full"
                  color={isDark ? '#F20D0D' : '#721B1B'}
                  glow={isDark}
                />
              </div>
            </Link>

            <span className="hidden sm:inline-block text-[#555] dark:text-[#444]">/</span>

            <span className="hidden sm:inline-block text-xs font-mono uppercase tracking-wider text-[#8E8D89] light:text-[#737373]">
              Katalog Layanan &amp; Paket
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl border border-[#2A2A26] light:border-[#DED9CD] bg-[#141413] light:bg-[#FFFFFF] text-[#8E8D89] light:text-[#737373] hover:text-[#F7F7F5] light:hover:text-[#171717] transition-colors cursor-pointer"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={handleGeneralConsultation}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#F20D0D] hover:bg-[#d40b0b] text-white text-xs font-semibold tracking-wide transition-colors cursor-pointer shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Konsultasi</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Section 1: Services Hero ── */}
      <section className="pt-20 sm:pt-28 pb-16 sm:pb-24 relative overflow-hidden border-b border-[#242421] light:border-[#EAE7E1]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="text-xs font-mono uppercase tracking-[0.2em] text-[#F20D0D] block mb-4 font-medium"
            >
              LAYANAN PEMBUATAN WEBSITE
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="text-4xl sm:text-5xl md:text-6xl font-editorial font-normal tracking-tight text-[#F7F7F5] light:text-[#171717] leading-[1.12] mb-6"
            >
              Solusi Website Sesuai <br className="hidden sm:inline" />
              Kebutuhanmu.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16 }}
              className="text-base sm:text-lg text-[#8E8D89] light:text-[#737373] leading-relaxed mb-8 max-w-2xl"
            >
              Kami membantu kamu membangun ruang digital yang rapi, cepat, dan terstruktur sesuai dengan profil, usaha, maupun proyekmu.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24 }}
              className="flex flex-wrap items-center gap-4"
            >
              <button
                onClick={handleScrollToOverview}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#171717] light:bg-[#171717] dark:bg-[#F7F7F5] text-white dark:text-[#0F0F0E] font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
              >
                <span>Lihat Pilihan Layanan</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={handleGeneralConsultation}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[#282825] light:border-[#DED9CD] text-xs font-semibold uppercase tracking-wider text-[#F7F7F5] light:text-[#171717] hover:bg-[#1A1A18] light:hover:bg-[#FFFFFF] transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#F20D0D]" />
                <span>Konsultasi Gratis</span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Services Overview (6 Cards) ── */}
      <section id="services-grid" className="py-20 sm:py-28 relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="max-w-2xl mb-12 sm:mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#F20D0D] block mb-2 font-medium">
              ENAM KATEGORI LAYANAN
            </span>
            <h2 className="text-3xl sm:text-4xl font-editorial font-normal tracking-tight text-[#F7F7F5] light:text-[#171717] mb-3">
              Pilih Solusi yang Kamu Butuhkan
            </h2>
            <p className="text-sm sm:text-base text-[#8E8D89] light:text-[#737373]">
              Dari portofolio personal hingga sistem aplikasi web kustom, setiap layanan memiliki paket transparan dengan alur pengerjaan terarah.
            </p>
          </div>

          {/* 3 columns on desktop, 2 on tablet, 1 on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {servicesList.map((service, index) => {
              const handleCardWhatsApp = (e: React.MouseEvent) => {
                e.stopPropagation();
                const url = buildDynamicWhatsAppUrl({
                  serviceName: service.title,
                  packageName: 'Konsultasi Layanan',
                  packagePrice: service.startingPriceFormatted,
                  totalEstimate: service.startingPriceFormatted,
                  notes: `Saya tertarik berkonsultasi mengenai pembuatan website ${service.title}.`,
                });
                window.open(url, '_blank', 'noopener,noreferrer');
              };

              return (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="rounded-2xl bg-[#141413] light:bg-[#FFFFFF] border border-[#282825] light:border-[#E3E0D8] p-7 sm:p-8 flex flex-col justify-between hover:border-[#F20D0D]/50 transition-all duration-300 shadow-sm group hover:-translate-y-1"
                >
                  <div>
                    {/* Top row: Number & Price */}
                    <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#242421] light:border-[#EAE7E1]">
                      <span className="font-mono text-xs font-semibold text-[#F20D0D]">
                        {service.number}
                      </span>
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#1F1F1D] light:bg-[#F2EFE9] text-[#CCCCCC] light:text-[#555555]">
                        Mulai {service.startingPriceFormatted}
                      </span>
                    </div>

                    <h3 className="text-2xl font-editorial font-normal text-[#F7F7F5] light:text-[#171717] mb-2 group-hover:text-[#F20D0D] transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-xs font-medium text-[#B8A99A] mb-3">
                      {service.heroHeadline}
                    </p>

                    <p className="text-xs text-[#8E8D89] light:text-[#737373] leading-relaxed mb-6">
                      {service.heroDescription}
                    </p>

                    {/* Package tier highlights */}
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-xs text-[#CCCCCC] light:text-[#444444]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F20D0D] shrink-0" />
                        <span>Paket: <strong className="font-semibold text-[#F7F7F5] light:text-[#171717]">{service.packages.map((p) => p.name).join(' · ')}</strong></span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#8E8D89] light:text-[#737373]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B8A99A] shrink-0" />
                        <span>Fitur lengkap &amp; opsi add-on transparan</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#8E8D89] light:text-[#737373]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B8A99A] shrink-0" />
                        <span>Konsultasi gratis &amp; panduan penyiapan materi</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-5 border-t border-[#242421] light:border-[#EAE7E1] flex items-center justify-between gap-3">
                    <button
                      onClick={() => navigate(`/services/${service.slug}`)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F7F7F5] light:text-[#171717] hover:text-[#F20D0D] light:hover:text-[#F20D0D] transition-colors cursor-pointer"
                    >
                      <span>Lihat Paket</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                      onClick={handleCardWhatsApp}
                      className="px-3.5 py-1.5 rounded-full border border-[#2E2E2A] light:border-[#DED9CD] text-[11px] font-medium text-[#8E8D89] light:text-[#737373] hover:text-[#F7F7F5] light:hover:text-[#171717] hover:border-[#F20D0D]/40 transition-colors cursor-pointer"
                    >
                      Konsultasi
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Section 3: How We Work (5 Stepper) ── */}
      <section className="py-20 sm:py-28 bg-[#111110] light:bg-[#F7F6F2] border-t border-[#242421] light:border-[#EAE7E1] relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="max-w-2xl mb-12 sm:mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#F20D0D] block mb-2 font-medium">
              ALUR PENGERJAAN
            </span>
            <h2 className="text-3xl sm:text-4xl font-editorial font-normal tracking-tight text-[#F7F7F5] light:text-[#171717] mb-3">
              Dari Diskusi Awal Hingga Website Tayang
            </h2>
            <p className="text-sm sm:text-base text-[#8E8D89] light:text-[#737373]">
              Lima tahapan kerja yang terarah agar website kamu selesai tepat waktu dan sesuai kebutuhan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6 relative">
            {workflowSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="p-5 sm:p-6 rounded-2xl bg-[#141413] light:bg-[#FFFFFF] border border-[#262623] light:border-[#E3E0D8] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-[#F20D0D]">
                      {step.number}
                    </span>
                    <span className="text-[10px] uppercase font-mono text-[#666] light:text-[#999]">
                      Tahap {idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-editorial font-normal text-[#F7F7F5] light:text-[#171717] mb-1">
                    {step.title}
                  </h3>

                  <p className="text-xs font-medium text-[#B8A99A] mb-2">
                    {step.subtitle}
                  </p>

                  <p className="text-[11px] text-[#8E8D89] light:text-[#737373] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5: Final CTA ── */}
      <section className="py-20 sm:py-24 bg-[#141413] light:bg-[#F2F0EA] border-t border-[#262623] light:border-[#E3E0D8] relative">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#F20D0D] block mb-3 font-medium">
              MULAI SEKARANG
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-normal text-[#F7F7F5] light:text-[#171717] mb-4">
              Siap Memulai Website Kamu?
            </h2>

            <p className="text-base text-[#8E8D89] light:text-[#737373] max-w-xl mx-auto mb-8">
              Ceritakan kebutuhanmu, dan kami bantu menemukan solusi website yang paling sesuai dengan anggaran dan tujuanmu.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={handleGeneralConsultation}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#F20D0D] hover:bg-[#d40b0b] text-white font-semibold text-xs uppercase tracking-wider transition-colors shadow-lg cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Konsultasi Sekarang</span>
              </button>

              <button
                onClick={handleScrollToOverview}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[#282825] light:border-[#DED9CD] text-xs font-semibold uppercase tracking-wider text-[#F7F7F5] light:text-[#171717] hover:bg-[#1A1A18] light:hover:bg-[#FFFFFF] transition-colors cursor-pointer"
              >
                <span>Lihat Semua Paket</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <Footer />

      {/* Floating WhatsApp */}
      <FloatingWhatsApp />
    </div>
  );
};
