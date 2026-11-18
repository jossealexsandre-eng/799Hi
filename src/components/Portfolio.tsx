import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Check, ChevronDown, ChevronUp } from 'lucide-react';

interface PortfolioProps {
  onOpenLiveWedding?: () => void;
  onOpenCaseStudy?: () => void;
  isLoading?: boolean;
}

export interface ProjectData {
  id: string;
  number: string;
  title: string;
  client: string;
  category: string;
  categorySlug: string;
  filterLabel: string;
  scope: string;
  description: string;
  image: string;
  liveUrl: string;
  displayUrl: string;
  deliverables: string[];
  originalPrice?: string;
  startingPrice: string;
}

export const LIVE_PROJECTS: ProjectData[] = [
  {
    id: 'angelus',
    number: '01',
    title: 'Matthew Filbert Angelus',
    client: 'Portfolio Akademik & Profesional Ilmu Hukum',
    category: 'PERSONAL PORTFOLIO',
    categorySlug: 'personal-portfolio',
    filterLabel: 'Personal Portfolio',
    scope: 'Dark Mode · Dwibahasa ID/EN · Galeri Sertifikat · CV PDF',
    description:
      'Website portfolio personal untuk mahasiswa Fakultas Hukum & Bisnis Digital Universitas Kristen Maranatha. Dilengkapi fitur beralih tema terang dan gelap (Dark Mode), pilihan bahasa Indonesia & Inggris, galeri sertifikat dengan filter kategori, serta lini masa organisasi dan prestasi.',
    image: '/images/project-angelus.png',
    liveUrl: 'https://angelusmatthew.vercel.app/',
    displayUrl: 'angelusmatthew.vercel.app',
    deliverables: [
      'Fitur Dark Mode & Light Mode',
      'Pilihan Bahasa Bilingual (ID/EN)',
      'Galeri Sertifikat Filter Kategori',
      'Timeline Organisasi & Pendidikan',
      'Unduh CV Resmi Format PDF',
      'Formulir Kontak & Responsif',
    ],
    originalPrice: 'Rp999.000',
    startingPrice: 'Rp899.000',
  },
  {
    id: 'yonathan',
    number: '02',
    title: 'Yonathan Piri',
    client: 'Portfolio Editorial Marketing Management',
    category: 'PERSONAL PORTFOLIO',
    categorySlug: 'personal-portfolio',
    filterLabel: 'Personal Portfolio',
    scope: 'Tipografi Editorial Bold · Pengalaman Kerja · Jejak Organisasi',
    description:
      'Website portfolio dan resume bergaya editorial monokrom untuk mahasiswa Marketing Management Universitas Kristen Maranatha. Dirancang dengan tipografi kontras tinggi, struktur riwayat pengalaman kerja, rekam jejak organisasi, dan tombol unduh CV.',
    image: '/images/project-yonathan.png',
    liveUrl: 'https://yonathanpiri-portfolio.vercel.app/',
    displayUrl: 'yonathanpiri-portfolio.vercel.app',
    deliverables: [
      'Desain Editorial Monokrom Bold',
      'Timeline Pengalaman Kerja',
      'Rekam Jejak Kepemimpinan Organisasi',
      'Fitur Unduh CV (PDF) Satu Klik',
      'Integrasi Kontak & Media Sosial',
      'Optimal di HP & Desktop',
    ],
    startingPrice: 'Mulai Rp549.000',
  },
  {
    id: 'duitmoo',
    number: '03',
    title: 'DuitMoo Smart Budgeting',
    client: 'Personal Finance & Smart Budgeting Platform',
    category: 'CUSTOM WEBSITE · WEB APPLICATION',
    categorySlug: 'custom-website',
    filterLabel: 'Custom Website',
    scope: 'Alokasi Anggaran 60/30/10 · Pencatatan Transaksi · Multi-User App',
    description:
      'Aplikasi web pencatatan keuangan pribadi dan pembagian anggaran otomatis (60% Kebutuhan, 30% Keinginan, 10% Darurat). Dilengkapi papan simulasi keuangan interaktif, pencatatan belanja harian, autentikasi pengguna, serta dukungan aplikasi di HP dan desktop.',
    image: '/images/project-duitmoo.png',
    liveUrl: 'https://duitmoo-production.up.railway.app',
    displayUrl: 'duitmoo-production.up.railway.app',
    deliverables: [
      'Pembagian Anggaran Otomatis 60/30/10',
      'Simulasi Papan Keuangan Interaktif',
      'Pencatatan Belanja & Saldo Real-Time',
      'Sistem Login & Akun Multi-User',
      'Antarmuka Responsif (PWA Ready)',
      'Arsitektur Full-Stack & Database',
    ],
    startingPrice: 'Mulai Rp4.499.000',
  },
  {
    id: 'alexsander',
    number: '04',
    title: 'Alexsander Josse',
    client: 'Creative Technologist & Visual Content Creator',
    category: 'PERSONAL PORTFOLIO',
    categorySlug: 'personal-portfolio',
    filterLabel: 'Personal Portfolio',
    scope: 'Personal Branding · Showcase Karya · Unduh CV',
    description:
      'Portfolio personal untuk kreator konten visual dan pengembang web di Bandung. Menampilkan tata letak tipografi editorial yang tegas, kurasi karya terpilih, lini masa pengalaman, serta akses unduh CV.',
    image: '/images/project-alexsander.png',
    liveUrl: 'https://alexsander-portfolio-virid.vercel.app/',
    displayUrl: 'alexsander-portfolio-virid.vercel.app',
    deliverables: [
      'Layout Tipografi Editorial Tegas',
      'Presentasi Karya & Proyek Pilihan',
      'Unduh Resume Format PDF',
      'Timeline Pengalaman & Keahlian',
      'Saluran Kontak WhatsApp Langsung',
      'Tampilan Responsif & Cepat',
    ],
    originalPrice: 'Rp999.000',
    startingPrice: 'Rp899.000',
  },
  {
    id: 'rainer',
    number: '05',
    title: 'Rainer Jackob Yawan',
    client: 'Portfolio Akademik Bilingual Sastra Jepang',
    category: 'PERSONAL PORTFOLIO',
    categorySlug: 'personal-portfolio',
    filterLabel: 'Personal Portfolio',
    scope: 'Bilingual JP/EN · Pengalaman Magang Jepang · Sertifikat',
    description:
      'Portfolio akademik dwibahasa (Jepang & Inggris) untuk mahasiswa Sastra Jepang Universitas Kristen Maranatha yang menyelesaikan program magang internasional di Osaka, Jepang. Menampilkan perjalanan karier, pendidikan, dan sertifikat.',
    image: '/images/project-rainer.png',
    liveUrl: 'https://raineryawan-portfolio.vercel.app/',
    displayUrl: 'raineryawan-portfolio.vercel.app',
    deliverables: [
      'Pengalih Bahasa Bilingual (JP/EN)',
      'Timeline Magang Internasional',
      'Galeri Sertifikat & Pencapaian',
      'Pratinjau & Unduh CV Akademik',
      'Tata Letak Bersih & Terstruktur',
      'Adaptasi Responsif Mobile',
    ],
    originalPrice: 'Rp999.000',
    startingPrice: 'Rp899.000',
  },
  {
    id: 'wheels',
    number: '06',
    title: 'Wheels Coffee Roasters',
    client: 'Specialty Coffee & Culinary Bandung',
    category: 'CAFE & RESTAURANT',
    categorySlug: 'cafe-restaurant',
    filterLabel: 'Cafe & Restaurant',
    scope: 'Katalog Menu · Reservasi Meja · Lokasi Cabang',
    description:
      'Website untuk bisnis kopi spesialti dan kuliner di Bandung. Menampilkan alur reservasi meja interaktif, presentasi daftar menu makanan dan minuman yang dikurasi, jam operasional, serta integrasi peta lokasi.',
    image: '/images/project-wheels.png',
    liveUrl: 'https://wheelscompro.vercel.app/',
    displayUrl: 'wheelscompro.vercel.app',
    deliverables: [
      'Formulir Reservasi Meja Interaktif',
      'Presentasi Katalog Menu Kuliner',
      'Informasi Jam Operasional & Cabang',
      'Integrasi Google Maps Lokasi',
      'Visual Fotografi Produk Tajam',
      'Optimasi Perangkat Mobile',
    ],
    startingPrice: 'Mulai Rp899.000',
  },
  {
    id: 'wedding',
    number: '07',
    title: 'Undangan Pernikahan Digital',
    client: 'Perayaan Pernikahan & Portal RSVP Tamu',
    category: 'WEDDING INVITATION',
    categorySlug: 'wedding-invitation',
    filterLabel: 'Wedding Invitation',
    scope: 'Layar Pembuka · Musik Latar · RSVP · Amplop Digital',
    description:
      'Website undangan pernikahan digital dengan pembukaan amplop interaktif, musik latar, hitung mundur menuju hari acara, konfirmasi kehadiran (RSVP) tamu, galeri foto pasangan, dan informasi amplop digital.',
    image: '/images/project-wedding.png',
    liveUrl: 'https://digital-wedding-invitation-f2ei.vercel.app/',
    displayUrl: 'digital-wedding-invitation-f2ei.vercel.app',
    deliverables: [
      'Layar Pembuka & Musik Latar',
      'Timeline Acara & Hitung Mundur',
      'Formulir Konfirmasi Kehadiran (RSVP)',
      'Galeri Foto Pasangan',
      'Penunjuk Lokasi Google Maps',
      'Informasi Hadiah & Amplop Digital',
    ],
    startingPrice: 'Mulai Rp199.000',
  },
];

const FILTER_TABS = [
  { id: 'all', label: 'Semua Karya' },
  { id: 'personal-portfolio', label: 'Personal Portfolio' },
  { id: 'custom-website', label: 'Custom Website' },
  { id: 'cafe-restaurant', label: 'Cafe & Restaurant' },
  { id: 'wedding-invitation', label: 'Wedding Invitation' },
];

export const Portfolio: React.FC<PortfolioProps> = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [showAll, setShowAll] = useState<boolean>(false);

  const filteredProjects =
    activeFilter === 'all'
      ? LIVE_PROJECTS
      : LIVE_PROJECTS.filter((p) => p.categorySlug === activeFilter);

  const visibleProjects = showAll ? filteredProjects : filteredProjects.slice(0, 4);
  const hasMoreProjects = filteredProjects.length > 4;

  const handleFilterChange = (tabId: string) => {
    setActiveFilter(tabId);
    setShowAll(false);
  };

  return (
    <section
      id="work"
      className="py-24 sm:py-32 relative bg-white dark:bg-[#0A0A09] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#F20D0D] block mb-2.5 font-medium">
              KARYA &amp; PORTFOLIO
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-normal tracking-tight text-[#171717] dark:text-[#F7F7F5] mb-3">
              Proyek website yang sudah tayang.
            </h2>

            <p className="text-base text-[#666560] dark:text-[#8E8D89] leading-relaxed">
              Seluruh proyek di bawah ini adalah website klien nyata yang telah kami bangun dan publikasikan. Klik pada kartu proyek untuk membuka websitenya secara langsung.
            </p>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 border-b border-[#EAE8E2] dark:border-[#242421]">
          {FILTER_TABS.map((tab) => {
            const isActive = activeFilter === tab.id;
            const count =
              tab.id === 'all'
                ? LIVE_PROJECTS.length
                : LIVE_PROJECTS.filter((p) => p.categorySlug === tab.id).length;

            return (
              <button
                key={tab.id}
                onClick={() => handleFilterChange(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#171717] text-white dark:bg-[#F7F7F5] dark:text-[#171717] shadow-sm'
                    : 'bg-[#F5F4F0] dark:bg-[#161615] text-[#666] dark:text-[#999] hover:text-[#171717] dark:hover:text-white border border-[#E4E2D8] dark:border-[#262624]'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-white/20 text-white dark:bg-black/15 dark:text-[#171717]'
                      : 'bg-black/5 dark:bg-white/5 text-[#888]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid (Default 4, Expandable) */}
        <motion.div
          layout
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, idx) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.98 }}
                transition={{
                  duration: 0.5,
                  delay: (idx % 2) * 0.06,
                  ease: [0.22, 1, 0.36, 1] as any,
                }}
                className="h-full flex flex-col"
              >
                <div className="group relative rounded-2xl bg-white dark:bg-[#141413] border border-[#E2E0D8] dark:border-[#262624] hover:border-[#F20D0D]/50 overflow-hidden flex flex-col justify-between transition-all duration-300 h-full shadow-[0_18px_45px_-15px_rgba(17,17,17,0.12),0_6px_18px_-6px_rgba(17,17,17,0.06)] hover:shadow-[0_26px_60px_-15px_rgba(17,17,17,0.2),0_10px_25px_-8px_rgba(242,13,13,0.1)] dark:shadow-[0_22px_50px_-15px_rgba(0,0,0,0.75)] hover:-translate-y-1">
                  {/* Browser Frame with Authentic Screenshot */}
                  <div className="relative overflow-hidden bg-[#F7F6F2] dark:bg-[#181816] border-b border-[#E6E4DC] dark:border-[#262624]">
                    {/* Browser Bar */}
                    <div className="h-9 px-4 bg-[#F2F0EB] dark:bg-[#1C1C1A] flex items-center justify-between border-b border-[#E4E2D8] dark:border-[#262624]">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#D8D6CE] dark:bg-[#3A3A36]" />
                        <span className="w-2 h-2 rounded-full bg-[#D8D6CE] dark:bg-[#3A3A36]" />
                        <span className="w-2 h-2 rounded-full bg-[#D8D6CE] dark:bg-[#3A3A36]" />
                      </div>

                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-0.5 rounded-md bg-white dark:bg-[#121211] text-[10px] font-mono text-[#666] dark:text-[#888] hover:text-[#F20D0D] flex items-center gap-1.5 border border-[#DDD] dark:border-[#262624] transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>{project.displayUrl}</span>
                      </a>

                      <span className="text-[10px] font-mono text-[#888]">
                        {project.number}
                      </span>
                    </div>

                    {/* Screenshot */}
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative aspect-[16/10] overflow-hidden"
                    >
                      <img
                        src={project.image}
                        alt={`${project.title} ${project.client}`}
                        loading="lazy"
                        className="w-full h-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                      />
                    </a>
                  </div>

                  {/* Project Details */}
                  <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                    <div>
                      {/* Meta header */}
                      <div className="flex items-center justify-between text-xs mb-2.5">
                        <span className="font-mono text-[#F20D0D] text-[11px] tracking-wider uppercase font-medium">
                          {project.category}
                        </span>
                        <span className="font-mono text-[11px] text-[#888]">
                          LIVE PRODUCTION
                        </span>
                      </div>

                      {/* Title & Client/Subtitle */}
                      <h3 className="text-2xl font-editorial font-normal text-[#171717] dark:text-[#F7F7F5] mb-1">
                        {project.title}
                      </h3>

                      <p className="text-xs font-medium text-[#B8A99A] mb-3">
                        {project.client} · {project.scope}
                      </p>

                      <p className="text-xs sm:text-sm text-[#555] dark:text-[#8E8D89] leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {/* Deliverables List */}
                      <div className="space-y-2 mb-6">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#888] block mb-2">
                          Fitur yang Diimplementasikan
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#444] dark:text-[#C5C3BC]">
                          {project.deliverables.map((item, dIdx) => (
                            <div key={dIdx} className="flex items-center gap-2">
                              <Check className="w-3.5 h-3.5 text-[#F20D0D] shrink-0" />
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
                          Paket Layanan
                        </span>
                        <div className="flex items-baseline gap-2 mt-0.5">
                          {project.originalPrice && (
                            <span className="text-xs font-mono text-[#888] line-through decoration-[#F20D0D]/80">
                              {project.originalPrice}
                            </span>
                          )}
                          <span className="text-sm sm:text-base font-bold text-[#171717] dark:text-white font-mono">
                            {project.startingPrice}
                          </span>
                        </div>
                      </div>

                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#171717] hover:bg-[#F20D0D] text-white dark:bg-[#F7F7F5] dark:text-[#0F0F0E] dark:hover:bg-[#F20D0D] dark:hover:text-white text-xs font-semibold tracking-wide transition-all cursor-pointer"
                      >
                        <span>Kunjungi Website</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* "Lihat Semua" / "Tampilkan Lebih Sedikit" Button */}
        {hasMoreProjects && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 flex justify-center"
          >
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#171717] hover:bg-[#F20D0D] text-white dark:bg-[#F7F7F5] dark:text-[#171717] dark:hover:bg-[#F20D0D] dark:hover:text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              <span>
                {showAll
                  ? 'Tampilkan Lebih Sedikit'
                  : `Lihat Semua Karya (${filteredProjects.length})`}
              </span>
              {showAll ? (
                <ChevronUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
              ) : (
                <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              )}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};
