export interface ServicePackageFeature {
  name: string;
  starter: string | boolean;
  pro: string | boolean;
  premium: string | boolean;
  tooltip?: string;
}

export interface ServicePackageItem {
  id: string;
  name: string;
  tier: 'basic' | 'standard' | 'premium';
  price: number;
  priceFormatted: string;
  isStartingPrice?: boolean;
  pricePrefix?: string; // e.g. "Mulai " or "Mulai dari "
  subtitle: string;
  description: string;
  badge?: string;
  limitsSummary: string;
  revisions: string;
  features: string[];
  notIncluded?: string[];
  ctaText: string;
  disclaimerNote?: string;
}

export interface AddOnItem {
  id: string;
  name: string;
  description: string;
  price: number;
  priceFormatted: string;
  priceType: 'one-time' | 'recurring' | 'quotation';
  compatibleServices: string[]; // empty array means compatible with all services
  incompatiblePackages?: { serviceId: string; packageId: string }[];
  includedInPackages?: { serviceId: string; packageId: string }[];
  categoryBadge?: string;
}

export interface ServiceDetailData {
  id: string;
  slug: string;
  number: string;
  title: string;
  categoryName: string;
  eyebrow: string;
  heroHeadline: string;
  heroDescription: string;
  startingPrice: number;
  startingPriceFormatted: string;
  benefits: { title: string; desc: string }[];
  packages: ServicePackageItem[];
  comparisonFeatures: ServicePackageFeature[];
  faq: { q: string; a: string }[];
}

export const WHATSAPP_PHONE = '6282197754103';
export const WHATSAPP_DISPLAY = '+62 821-9775-4103';

/**
 * Format numeric IDR to standard Indonesian Rupiah string
 * e.g. 549000 -> "Rp549.000"
 */
export const formatIDR = (amount: number, prefix: string = 'Rp'): string => {
  return `${prefix}${amount.toLocaleString('id-ID')}`;
};

/**
 * Build dynamic WhatsApp inquiry URL adhering to the exact required message template:
 *
 * Halo 799Hi Creatives! Saya tertarik membuat website.
 *
 * Layanan: [Nama Layanan]
 * Paket: [Nama Paket]
 * Harga Paket: [Nominal]
 * Fitur Tambahan: [Daftar Add-on]
 * Estimasi Total: [Nominal]
 * Kebutuhan: [Deskripsi]
 *
 * Saya ingin konsultasi lebih lanjut. Terima kasih.
 */
export const buildDynamicWhatsAppUrl = (params: {
  serviceName: string;
  packageName: string;
  packagePrice: string;
  addOns?: string[];
  totalEstimate: string;
  monthlyNote?: string;
  notes?: string;
}): string => {
  const addOnsText =
    params.addOns && params.addOns.length > 0
      ? params.addOns.join(', ')
      : 'Tidak ada (Paket standar)';

  let totalText = params.totalEstimate;
  if (params.monthlyNote) {
    totalText += ` (${params.monthlyNote})`;
  }

  const message = [
    'Halo 799Hi Creatives! Saya tertarik membuat website.',
    '',
    `Layanan: ${params.serviceName}`,
    `Paket: ${params.packageName}`,
    `Harga Paket: ${params.packagePrice}`,
    `Fitur Tambahan: ${addOnsText}`,
    `Estimasi Total: ${totalText}`,
    `Kebutuhan: ${params.notes && params.notes.trim() ? params.notes.trim() : 'Konsultasi desain & fitur website'}`,
    '',
    'Saya ingin konsultasi lebih lanjut. Terima kasih.',
  ].join('\n');

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
};

/**
 * Backwards compatibility helper
 */
export const buildWhatsAppUrl = (
  serviceTitle: string,
  packageName: string,
  price: string
): string => {
  return buildDynamicWhatsAppUrl({
    serviceName: serviceTitle,
    packageName,
    packagePrice: price,
    totalEstimate: price,
  });
};

export const buildCustomWhatsAppUrl = (): string => {
  return buildDynamicWhatsAppUrl({
    serviceName: 'Custom Website',
    packageName: 'Custom Solution',
    packagePrice: 'Mulai dari Rp14.999.000',
    totalEstimate: 'Mulai dari Rp14.999.000',
    notes: 'Konsultasi kebutuhan sistem dan alur kerja aplikasi web khusus.',
  });
};

/**
 * 13 Official Add-ons per Specification Section 7
 */
export const OFFICIAL_ADD_ONS: AddOnItem[] = [
  {
    id: 'dark-mode',
    name: 'Dark Mode Toggle',
    description: 'Tombol beralih tema gelap & terang yang elegan',
    price: 149000,
    priceFormatted: 'Rp149.000',
    priceType: 'one-time',
    compatibleServices: [],
    includedInPackages: [
      { serviceId: 'personal-portfolio', packageId: 'premium' },
    ],
    categoryBadge: 'Tampilan',
  },
  {
    id: 'language-switch',
    name: 'Language Switch ID/EN',
    description: 'Tombol dwibahasa Indonesia & Inggris (tidak termasuk penerjemahan teks)',
    price: 249000,
    priceFormatted: 'Rp249.000',
    priceType: 'one-time',
    compatibleServices: [],
    includedInPackages: [
      { serviceId: 'personal-portfolio', packageId: 'premium' },
    ],
    categoryBadge: 'Fitur',
  },
  {
    id: 'cv-design',
    name: 'CV Design PDF',
    description: 'Desain kurikulum vitae profesional format PDF siap unduh',
    price: 250000,
    priceFormatted: 'Rp250.000',
    priceType: 'one-time',
    compatibleServices: ['personal-portfolio'],
    includedInPackages: [
      { serviceId: 'personal-portfolio', packageId: 'standard' },
      { serviceId: 'personal-portfolio', packageId: 'premium' },
    ],
    categoryBadge: 'Khusus Portfolio',
  },
  {
    id: 'additional-page',
    name: 'Additional Website Page',
    description: 'Penambahan 1 halaman website lengkap dengan penataan konten rapi',
    price: 199000,
    priceFormatted: 'Rp199.000',
    priceType: 'one-time',
    compatibleServices: [
      'personal-portfolio',
      'cafe-restaurant',
      'company-profile',
      'business-store',
    ],
    categoryBadge: 'Struktur',
  },
  {
    id: 'photo-1',
    name: 'Additional Photo (1)',
    description: 'Penambahan 1 foto beresolusi tinggi pada galeri / konten',
    price: 20000,
    priceFormatted: 'Rp20.000',
    priceType: 'one-time',
    compatibleServices: [
      'personal-portfolio',
      'wedding-invitation',
      'cafe-restaurant',
      'company-profile',
      'business-store',
    ],
    categoryBadge: 'Media',
  },
  {
    id: 'photo-5',
    name: 'Additional Photos (5)',
    description: 'Paket hemat penambahan 5 foto pada galeri / konten',
    price: 90000,
    priceFormatted: 'Rp90.000',
    priceType: 'one-time',
    compatibleServices: [
      'personal-portfolio',
      'wedding-invitation',
      'cafe-restaurant',
      'company-profile',
      'business-store',
    ],
    categoryBadge: 'Media',
  },
  {
    id: 'photo-10',
    name: 'Additional Photos (10)',
    description: 'Paket hemat penambahan 10 foto pada galeri / konten',
    price: 170000,
    priceFormatted: 'Rp170.000',
    priceType: 'one-time',
    compatibleServices: [
      'personal-portfolio',
      'wedding-invitation',
      'cafe-restaurant',
      'company-profile',
      'business-store',
    ],
    categoryBadge: 'Media',
  },
  {
    id: 'products-menu-20',
    name: 'Additional 20 Products / Menu Items',
    description: 'Tambahan 20 item produk etalase atau daftar menu makanan & minuman',
    price: 75000,
    priceFormatted: 'Rp75.000',
    priceType: 'one-time',
    compatibleServices: ['cafe-restaurant', 'business-store'],
    categoryBadge: 'Katalog',
  },
  {
    id: 'scroll-animation',
    name: 'Additional Scroll Animation',
    description: 'Efek animasi interaktif dinamis saat pengunjung menggulir halaman',
    price: 149000,
    priceFormatted: 'Rp149.000',
    priceType: 'one-time',
    compatibleServices: [],
    categoryBadge: 'Interaksi',
  },
  {
    id: 'google-analytics',
    name: 'Google Analytics Setup',
    description: 'Pemasangan pelacakan jumlah pengunjung & performa halaman website',
    price: 149000,
    priceFormatted: 'Rp149.000',
    priceType: 'one-time',
    compatibleServices: [],
    includedInPackages: [
      { serviceId: 'personal-portfolio', packageId: 'premium' },
      { serviceId: 'company-profile', packageId: 'premium' },
    ],
    categoryBadge: 'Analitik',
  },
  {
    id: 'custom-domain',
    name: 'Custom Domain 1 Year',
    description: 'Pendaftaran alamat website sendiri (.com atau .id) selama 1 tahun',
    price: 249000,
    priceFormatted: 'Mulai Rp249.000',
    priceType: 'one-time',
    compatibleServices: [],
    includedInPackages: [
      { serviceId: 'personal-portfolio', packageId: 'premium' },
      { serviceId: 'cafe-restaurant', packageId: 'premium' },
      { serviceId: 'company-profile', packageId: 'premium' },
      { serviceId: 'business-store', packageId: 'premium' },
    ],
    categoryBadge: 'Domain',
  },
  {
    id: 'maintenance',
    name: 'Basic Website Maintenance',
    description: 'Pemantauan rutin, perbaikan kendala teknis & pencadangan data berkala',
    price: 149000,
    priceFormatted: 'Mulai Rp149.000/bln',
    priceType: 'recurring',
    compatibleServices: [],
    categoryBadge: 'Langganan',
  },
  {
    id: 'custom-feature',
    name: 'Additional Custom Feature',
    description: 'Pengembangan modul atau alur kerja khusus sesuai kebutuhan proyek',
    price: 0,
    priceFormatted: 'By Quotation',
    priceType: 'quotation',
    compatibleServices: [],
    categoryBadge: 'Kustom',
  },
];

/**
 * Common Service Policies per Specification Section 6
 */
export const SERVICE_POLICIES = [
  {
    title: 'Kebijakan Domain Gratis',
    summary: 'Berlaku 1 tahun pertama untuk paket Premium tertentu.',
    details:
      'Untuk paket Premium yang mencantumkan domain gratis, fasilitas mencakup 1 domain reguler berekstensi .com atau .id selama tahun pertama (maksimal biaya registrasi Rp250.000). Domain didaftarkan atas nama kepemilikan klien. Biaya perpanjangan tahun berikutnya menjadi tanggung jawab klien.',
  },
  {
    title: 'Kebijakan Hosting & Server',
    summary: 'Penyesuaian hosting sesuai jenis dan kebutuhan website.',
    details:
      'Hosting berbayar tidak otomatis termasuk di seluruh paket. Website dinamis dengan basis data dan sistem login memerlukan hosting yang mendukung. Seluruh opsi hosting disampaikan secara transparan sebelum klien melakukan pembayaran.',
  },
  {
    title: 'Sistem Pembayaran 50 / 50',
    summary: 'DP 50% di awal dan pelunasan 50% sebelum publikasi.',
    details:
      'Pengerjaan proyek dimulai setelah pembayaran uang muka (DP) sebesar 50%. Pelunasan sisa 50% dilakukan setelah sesi peninjauan (review) dan revisi selesai, sebelum penyerahan akses dan publikasi final website ke publik.',
  },
  {
    title: 'Kebijakan Revisi Terarah',
    summary: 'Revisi minor sesuai kuota yang tercantum pada setiap paket.',
    details:
      'Revisi berlaku untuk perbaikan teks, pergantian foto, atau penyesuaian tata letak kecil dalam ruang lingkup paket yang disepakati. Perubahan konsep visual secara menyeluruh, penambahan halaman baru, atau fitur baru di luar kesepakatan akan dihitung sebagai add-on terpisah.',
  },
  {
    title: 'Materi & Konten Klien',
    summary: 'Materi utama disiapkan klien dan ditata profesional oleh 799Hi.',
    details:
      'Foto, logo, teks profil, deskripsi produk/menu, dan materi pendukung disediakan oleh klien. 799Hi membantu menata dan mengoptimasi seluruh materi tersebut agar tampil rapi, proporsional, dan nyaman dibaca.',
  },
  {
    title: 'Garansi Perbaikan Bug',
    summary: 'Dukungan perbaikan kendala teknis setelah website diluncurkan.',
    details:
      'Dukungan perbaikan bug yang bersumber dari implementasi awal diberikan selama masa garansi (14 hari standar untuk seluruh paket, dan 30 hari khusus untuk paket Portfolio Signature).',
  },
];

/**
 * 6 Main Service Categories per Specification Section 3, 4, 5, 9
 */
export const SERVICE_PRICING_DATA: Record<string, ServiceDetailData> = {
  // ─── 1. PERSONAL PORTFOLIO ──────────────────────────────────────────
  'personal-portfolio': {
    id: 'personal-portfolio',
    slug: 'personal-portfolio',
    number: '01',
    title: 'Personal Portfolio',
    categoryName: 'Personal Portfolio',
    eyebrow: '01 — PERSONAL PORTFOLIO',
    heroHeadline: 'Your Story, Your Digital Identity.',
    heroDescription:
      'Website pribadi yang dirancang untuk menampilkan profil, pengalaman, karya, pencapaian, dan identitas profesional dalam satu tempat. Cocok bagi individu yang ingin memperkenalkan dirinya secara lebih profesional melalui website personal.',
    startingPrice: 549000,
    startingPriceFormatted: 'Rp549.000',
    benefits: [
      {
        title: 'Personal Branding Kuat',
        desc: 'Satu alamat digital profesional untuk seluruh profil, CV, dan pencapaian Anda.',
      },
      {
        title: 'Tampil Rapi di HP & Laptop',
        desc: 'Desain responsif yang nyaman dibuka oleh perekrut, klien, maupun rekan kerja.',
      },
      {
        title: 'Galeri Karya Interaktif',
        desc: 'Tampilkan karya terbaik, sertifikat, dan cerita proyek secara visual dan elegan.',
      },
      {
        title: 'Kontak Langsung',
        desc: 'Terhubung langsung dengan Anda lewat tombol WhatsApp dan tautan media sosial.',
      },
    ],
    packages: [
      {
        id: 'basic',
        name: 'Starter',
        tier: 'basic',
        price: 549000,
        priceFormatted: 'Rp549.000',
        subtitle: 'Website pribadi sederhana untuk profil & karya utama',
        description:
          'Pilihan ideal bagi mahasiswa, fresh graduate, atau individu yang membutuhkan profil online profesional dengan biaya hemat.',
        limitsSummary: '1 halaman · Maks. 5 bagian · Maks. 7 foto · 3 proyek',
        revisions: '1 kali revisi minor',
        features: [
          '1 halaman website',
          'Maksimal 5 bagian konten',
          'Maksimal 7 foto',
          'Maksimal 3 proyek atau karya unggulan',
          'Profil singkat / About Me',
          'Informasi pengalaman dan keahlian',
          'Garis waktu (timeline) pengalaman atau pendidikan',
          'Galeri sertifikat dan penghargaan',
          'Tombol WhatsApp langsung',
          'Link media sosial terintegrasi',
          'Tampil rapi di HP, tablet & laptop',
          'Pilihan template dan warna dasar',
          'Optimasi ukuran gambar agar cepat dibuka',
          'Pengaturan dasar mesin pencari (SEO dasar)',
          '1 kali revisi minor',
        ],
        notIncluded: ['Download CV PDF', 'Gratis domain', 'Analitik pengunjung'],
        ctaText: 'Pilih Starter →',
        disclaimerNote: 'Domain kustom & materi konten disediakan klien.',
      },
      {
        id: 'standard',
        name: 'Professional',
        tier: 'standard',
        price: 899000,
        priceFormatted: 'Rp899.000',
        badge: 'Rekomendasi',
        subtitle: 'Personal branding kuat dengan download CV & timeline',
        description:
          'Dirancang untuk profesional, konsultan, kreator, dan desainer yang ingin memamerkan karya dengan tampilan semi-custom.',
        limitsSummary: '1 halaman · Maks. 8 bagian · Maks. 20 foto · 6 proyek',
        revisions: '2 kali revisi minor',
        features: [
          'Mencakup seluruh fitur paket Starter',
          '1 halaman website (maks. 8 bagian konten)',
          'Maksimal 20 foto',
          'Maksimal 6 proyek atau karya unggulan',
          'Desain semi-custom sesuai identitas Anda',
          'Penyesuaian warna dan tipografi',
          'Fitur unduh CV dalam format PDF',
          'Galeri sertifikat dan pencapaian',
          'Garis waktu (timeline) pengalaman atau pendidikan',
          'Bagian testimoni / ulasan rekan',
          'Galeri foto yang dapat diperbesar (lightbox)',
          'Animasi halus saat halaman digulir',
          'Highlight proyek unggulan',
          '2 kali revisi minor',
        ],
        notIncluded: ['Multi-halaman', 'Gratis domain', 'Analitik pengunjung'],
        ctaText: 'Pilih Professional →',
        disclaimerNote: 'Pilihan paling ideal untuk membangun reputasi profesional.',
      },
      {
        id: 'premium',
        name: 'Signature',
        tier: 'premium',
        price: 1799000,
        priceFormatted: 'Rp1.799.000',
        badge: 'Signature',
        subtitle: 'Multi-halaman eksklusif dengan tema dark mode, ganti bahasa & domain gratis',
        description:
          'Standar tertinggi untuk personal branding prestisius dengan studi kasus mendalam, tema dark mode, pilihan bahasa, analitik pengunjung, dan gratis domain.',
        limitsSummary: 'Hingga 3 halaman · Maks. 30 foto · 12 proyek (3 studi kasus)',
        revisions: '3 kali revisi minor',
        features: [
          'Mencakup seluruh fitur relevan paket sebelumnya',
          'Maksimal 3 halaman website',
          'Maksimal 12 bagian konten secara keseluruhan',
          'Maksimal 30 foto berkualitas tinggi',
          'Maksimal 12 proyek atau karya unggulan',
          'Maksimal 3 penjelasan studi kasus detail proyek',
          'Desain lebih eksklusif dan dipersonalisasi',
          'Fitur Dark Mode / Mode Gelap (pilihan tema terang & gelap)',
          'Pilihan ganti bahasa / Multi-bahasa (ID & EN)',
          'Custom hero section unik',
          'Galeri interaktif dengan filter kategori',
          'Animasi dan transisi khusus sesuai konsep',
          'Formulir kontak yang mengirim pesan ke email',
          'Integrasi Google Analytics dasar untuk pantau pengunjung',
          'Konsultasi konsep visual singkat',
          'Gratis 1 custom domain (.com/.id) selama 1 tahun',
          'Bantuan publikasi website hingga aktif',
          'Dukungan perbaikan kendala (garansi bug) selama 30 hari',
          '3 kali revisi minor',
        ],
        ctaText: 'Pilih Signature →',
        disclaimerNote: 'Termasuk tema dark mode, ganti bahasa, domain 1 tahun & dukungan perbaikan bug 30 hari.',
      },
    ],
    comparisonFeatures: [
      { name: 'Jumlah Halaman Website', starter: '1 halaman', pro: '1 halaman', premium: 'Hingga 3 halaman' },
      { name: 'Maksimal Bagian Konten', starter: 'Maks. 5 bagian', pro: 'Maks. 8 bagian', premium: 'Maks. 12 bagian' },
      { name: 'Maksimal Jumlah Foto', starter: '7 foto', pro: '20 foto', premium: '30 foto' },
      { name: 'Karya / Proyek Unggulan', starter: '3 proyek', pro: '6 proyek', premium: '12 proyek' },
      { name: 'Cerita Detail Studi Kasus', starter: false, pro: false, premium: 'Maks. 3 studi kasus' },
      { name: 'Tampil Rapi di HP & Laptop', starter: true, pro: true, premium: true },
      { name: 'Tombol Kontak WhatsApp', starter: true, pro: true, premium: true },
      { name: 'Tautan Media Sosial', starter: true, pro: true, premium: true },
      { name: 'Timeline Pengalaman / Pendidikan', starter: true, pro: true, premium: true },
      { name: 'Galeri Sertifikat & Penghargaan', starter: true, pro: true, premium: true },
      { name: 'Download CV Format PDF', starter: false, pro: true, premium: true },
      { name: 'Galeri Foto Diperbesar (Lightbox)', starter: false, pro: true, premium: true },
      { name: 'Fitur Dark Mode (Mode Terang & Gelap)', starter: false, pro: false, premium: true },
      { name: 'Pilihan Ganti Bahasa (Multi-bahasa ID/EN)', starter: false, pro: false, premium: true },
      { name: 'Filter Kategori Karya Interaktif', starter: false, pro: false, premium: true },
      { name: 'Formulir Kontak Email', starter: false, pro: false, premium: true },
      { name: 'Lihat Data Pengunjung (Google Analytics)', starter: false, pro: false, premium: true },
      { name: 'Gratis Domain .com / .id (1 Tahun)', starter: false, pro: false, premium: true },
      { name: 'Dukungan Garansi Bug', starter: '14 hari', pro: '14 hari', premium: '30 hari' },
      { name: 'Jumlah Revisi Minor', starter: '1× revisi', pro: '2× revisi', premium: '3× revisi' },
    ],
    faq: [
      {
        q: 'Apakah materi teks dan foto harus sudah siap sebelum memesan?',
        a: 'Tidak harus langsung lengkap. Anda bisa berkonsultasi terlebih dahulu, dan tim kami akan memberikan panduan daftar materi serta susunan teks yang dibutuhkan.',
      },
      {
        q: 'Bagaimana cara kerja fitur Download CV PDF?',
        a: 'Kami menyematkan tombol unduh profesional di website Anda yang langsung membuka atau mengunduh berkas PDF resume/CV terbaru milik Anda.',
      },
      {
        q: 'Apakah paket Signature sudah termasuk domain?',
        a: 'Ya, paket Signature sudah mencakup gratis pendaftaran 1 nama domain berekstensi .com atau .id selama tahun pertama sesuai ketentuan layanan.',
      },
      {
        q: 'Apakah website portfolio bisa diubah isi karyanya di masa depan?',
        a: 'Tentu. Anda dapat menggunakan layanan pemeliharaan rutin kami atau add-on penambahan karya setiap kali memiliki pencapaian baru.',
      },
    ],
  },

  // ─── 2. WEDDING INVITATION ──────────────────────────────────────────
  'wedding-invitation': {
    id: 'wedding-invitation',
    slug: 'wedding-invitation',
    number: '02',
    title: 'Wedding Invitation',
    categoryName: 'Wedding Invitation',
    eyebrow: '02 — WEDDING INVITATION',
    heroHeadline: 'Your Special Day, Beautifully Shared.',
    heroDescription:
      'Undangan pernikahan digital yang praktis dan elegan, dilengkapi informasi acara, galeri kenangan, serta berbagai fitur yang memudahkan tamu.',
    startingPrice: 199000,
    startingPriceFormatted: 'Rp199.000',
    benefits: [
      {
        title: 'Praktis & Mudah Dibagikan',
        desc: 'Kirim undangan pernikahan langsung lewat tautan WhatsApp tanpa batas jumlah tamu.',
      },
      {
        title: 'Navigasi Peta Lokasi Akurat',
        desc: 'Tamu langsung terhubung ke Google Maps menuju lokasi akad dan resepsi.',
      },
      {
        title: 'Konfirmasi Kehadiran (RSVP)',
        desc: 'Ketahui estimasi jumlah tamu yang hadir tanpa repot mencatat manual satu per satu.',
      },
      {
        title: 'Amplop & Hadiah Digital',
        desc: 'Kemudahan bagi tamu untuk mengirimkan doa dan kado pernikahan lewat transfer digital.',
      },
    ],
    packages: [
      {
        id: 'basic',
        name: 'Sweet & Simple',
        tier: 'basic',
        price: 199000,
        priceFormatted: 'Rp199.000',
        subtitle: 'Praktis, anggun & siap dibagikan ke tamu undangan',
        description:
          'Solusi praktis dan ekonomis untuk membagikan kabar bahagia pernikahan dengan informasi lengkap dan desain anggun.',
        limitsSummary: '1 halaman · Maks. 5 foto · Hitung mundur · Maps',
        revisions: '1 kali revisi minor',
        features: [
          '1 halaman undangan digital',
          'Pilihan desain template elegan',
          'Maksimal 5 foto pasangan',
          'Nama pasangan & keluarga',
          'Informasi tanggal dan waktu acara',
          'Alamat acara & petunjuk arah',
          'Navigasi lokasi via Google Maps',
          'Hitung mundur menuju hari acara',
          'Link undangan yang dapat dibagikan',
          'Tampil rapi pada perangkat mobile',
          '1 kali revisi minor',
        ],
        notIncluded: ['Musik latar', 'Formulir RSVP', 'Nama tamu personal'],
        ctaText: 'Pilih Sweet & Simple →',
        disclaimerNote: 'Format praktis dengan waktu pengerjaan cepat.',
      },
      {
        id: 'standard',
        name: 'Romantic',
        tier: 'standard',
        price: 399000,
        priceFormatted: 'Rp399.000',
        badge: 'Rekomendasi',
        subtitle: 'Lebih berkesan dengan musik, RSVP aktif & galeri foto',
        description:
          'Pilihan paling diminati calon pengantin dengan pengiring musik syahdu, formulir RSVP fungsional, dan amplop digital.',
        limitsSummary: '1 halaman · Maks. 10 foto · Musik + RSVP + Hadiah Digital',
        revisions: '2 kali revisi minor',
        features: [
          'Mencakup seluruh fitur Sweet & Simple',
          'Maksimal 10 foto prewedding / kenangan',
          'Pilihan musik latar romantis',
          'Galeri foto yang bisa diperbesar (lightbox)',
          'Formulir konfirmasi kehadiran (RSVP aktif)',
          'Informasi hadiah digital & nomor rekening',
          'Penyesuaian tema warna sesuai busana pengantin',
          'Desain semi-custom',
          'Animasi ringan saat dibuka',
          '2 kali revisi minor',
        ],
        notIncluded: ['Nama tamu personal per tautan', 'Love story timeline'],
        ctaText: 'Pilih Romantic →',
        disclaimerNote: 'Paket terlengkap untuk momen pernikahan modern.',
      },
      {
        id: 'premium',
        name: 'Exclusive',
        tier: 'premium',
        price: 799000,
        priceFormatted: 'Rp799.000',
        badge: 'Exclusive',
        subtitle: 'Personal dengan tautan nama tamu, love story & doa ucapan',
        description:
          'Pengalaman undangan pernikahan digital eksklusif dengan nama tamu khusus pada setiap tautan serta buku tamu ucapan doa.',
        limitsSummary: '1 halaman · Maks. 20 foto · Tautan Nama Tamu · Love Story',
        revisions: '3 kali revisi minor',
        features: [
          'Mencakup seluruh fitur relevan paket Romantic',
          'Maksimal 20 foto kenangan',
          'Desain lebih personal dan eksklusif',
          'Garis waktu perjalanan cinta (Love Story Timeline)',
          'Nama tamu personal pada undangan via tautan khusus',
          'Galeri foto interaktif',
          'Kolom ucapan dan doa restu tamu',
          'Animasi yang disesuaikan dengan tema pernikahan',
          '3 kali revisi minor',
        ],
        ctaText: 'Pilih Exclusive →',
        disclaimerNote: 'Termasuk tautan nama tamu personal dan kolom ucapan doa.',
      },
    ],
    comparisonFeatures: [
      { name: 'Format Undangan Digital', starter: '1 halaman', pro: '1 halaman', premium: '1 halaman' },
      { name: 'Maksimal Jumlah Foto', starter: '5 foto', pro: '10 foto', premium: '20 foto' },
      { name: 'Navigasi Peta Google Maps', starter: true, pro: true, premium: true },
      { name: 'Hitung Mundur Waktu Acara', starter: true, pro: true, premium: true },
      { name: 'Tautan Siap Dibagikan via WhatsApp', starter: true, pro: true, premium: true },
      { name: 'Pilihan Musik Latar Suasana', starter: false, pro: true, premium: true },
      { name: 'Galeri Foto Diperbesar (Lightbox)', starter: false, pro: true, premium: true },
      { name: 'Formulir Konfirmasi Tamu (RSVP)', starter: false, pro: true, premium: true },
      { name: 'Amplop Digital & Nomor Rekening', starter: false, pro: true, premium: true },
      { name: 'Penyesuaian Warna Tema Pengantin', starter: false, pro: true, premium: true },
      { name: 'Love Story Timeline (Kisah Cinta)', starter: false, pro: false, premium: true },
      { name: 'Nama Tamu Khusus pada Tautan (?to=)', starter: false, pro: false, premium: true },
      { name: 'Kolom Doa & Ucapan Tamu', starter: false, pro: false, premium: true },
      { name: 'Jumlah Revisi Minor', starter: '1× revisi', pro: '2× revisi', premium: '3× revisi' },
    ],
    faq: [
      {
        q: 'Berapa lama masa aktif website undangan pernikahan?',
        a: 'Undangan aktif selama masa persiapan pernikahan hingga 3 bulan setelah tanggal hari H resepsi pernikahan selesai.',
      },
      {
        q: 'Bagaimana cara membagikan nama tamu yang berbeda-beda?',
        a: 'Pada paket Exclusive, kami sediakan generator tautan personal sehingga setiap tamu yang membuka akan melihat namanya secara khusus di layar pembuka.',
      },
      {
        q: 'Apakah musik latar bisa dipilih sendiri?',
        a: 'Bisa, Anda dapat memberikan judul lagu favorit atau file audio instrumental yang diinginkan.',
      },
      {
        q: 'Apakah data RSVP tamu bisa dilihat oleh pengantin?',
        a: 'Ya, data konfirmasi kehadiran tamu diteruskan ke formulir pencatatan yang rapi dan mudah diakses oleh pengantin.',
      },
    ],
  },

  // ─── 3. CAFE & RESTAURANT ───────────────────────────────────────────
  'cafe-restaurant': {
    id: 'cafe-restaurant',
    slug: 'cafe-restaurant',
    number: '03',
    title: 'Cafe & Restaurant',
    categoryName: 'Cafe & Restaurant',
    eyebrow: '03 — CAFE & RESTAURANT',
    heroHeadline: 'Bring Your Dining Experience Online.',
    heroDescription:
      'Website untuk memperkenalkan usaha kuliner, menampilkan menu, informasi tempat, promosi, dan memudahkan pelanggan menghubungi bisnis.',
    startingPrice: 899000,
    startingPriceFormatted: 'Rp899.000',
    benefits: [
      {
        title: 'Menu Digital Menarik',
        desc: 'Tampilkan foto hidangan dan harga jelas yang menggugah selera sebelum pelanggan berkunjung.',
      },
      {
        title: 'Menu QR Code Meja',
        desc: 'Pelanggan cukup scan QR Code di meja makan untuk membuka daftar menu terupdate.',
      },
      {
        title: 'Mudah Ditemukan Pelanggan',
        desc: 'Integrasi Google Maps, jam operasional, dan alamat detail memudahkan tamu datang langsung.',
      },
      {
        title: 'Pemesanan & Reservasi Meja',
        desc: 'Terima pertanyaan, pesanan katering, atau reservasi meja langsung ke WhatsApp pengelola.',
      },
    ],
    packages: [
      {
        id: 'basic',
        name: 'Digital Presence',
        tier: 'basic',
        price: 899000,
        priceFormatted: 'Rp899.000',
        subtitle: 'Profil kuliner esensial & daftar menu praktis',
        description:
          'Website 1 halaman ringkas untuk kedai kopi, kafe, atau resto yang ingin memiliki profil kuliner rapi di internet.',
        limitsSummary: '1 halaman · Maks. 10 foto · Maks. 15 menu · Maps',
        revisions: '1 kali revisi minor',
        features: [
          '1 halaman website',
          'Maksimal 10 foto hidangan & tempat',
          'Maksimal 15 menu makanan dan minuman',
          'Profil usaha singkat & filosofi kuliner',
          'Daftar menu dan harga jelas',
          'Informasi jam operasional',
          'Alamat lengkap dan Google Maps',
          'Link media sosial terhubung',
          'Tombol WhatsApp untuk pertanyaan/pemesanan',
          'Desain responsif di HP & laptop',
          '1 kali revisi minor',
        ],
        notIncluded: ['QR Code meja siap cetak', 'Kategori hidangan', 'Pencarian menu'],
        ctaText: 'Pilih Digital Presence →',
        disclaimerNote: 'Cocok untuk cafe & kuliner yang baru merintis kehadiran online.',
      },
      {
        id: 'standard',
        name: 'Digital Menu',
        tier: 'standard',
        price: 1699000,
        priceFormatted: 'Rp1.699.000',
        badge: 'Rekomendasi',
        subtitle: 'Menu digital multi-halaman dengan QR Code meja & promo',
        description:
          'Solusi menu digital lengkap dengan kelompok kategori hidangan, foto lightbox, serta QR code siap pasang di meja makan.',
        limitsSummary: 'Hingga 3 halaman · Maks. 25 foto · Maks. 30 menu · QR Code',
        revisions: '2 kali revisi minor',
        features: [
          'Mencakup seluruh fitur Digital Presence',
          'Maksimal 3 halaman website',
          'Maksimal 25 foto hidangan & ambience',
          'Maksimal 30 menu makanan dan minuman',
          'Pengelompokan menu berdasarkan kategori hidangan',
          'Galeri foto suasana tempat',
          'Tampilan foto yang bisa diperbesar (lightbox)',
          'QR Code siap cetak menuju menu digital',
          'Bagian promosi dan penawaran spesial',
          'Desain semi-custom bernuansa hangat',
          'Animasi ringan saat digulir',
          '2 kali revisi minor',
        ],
        notIncluded: ['Pencarian menu', 'Formulir reservasi meja', 'Gratis domain'],
        ctaText: 'Pilih Digital Menu →',
        disclaimerNote: 'Termasuk file QR code siap cetak untuk diletakkan di setiap meja.',
      },
      {
        id: 'premium',
        name: 'Restaurant Experience',
        tier: 'premium',
        price: 2999000,
        priceFormatted: 'Rp2.999.000',
        badge: 'Experience',
        subtitle: 'Pengalaman resto premium dengan pencarian menu & form reservasi',
        description:
          'Solusi restoran kelas atas dengan filter kategori, pencarian hidangan cepat, halaman event, formulir reservasi, dan gratis domain.',
        limitsSummary: 'Hingga 5 halaman · Maks. 40 foto · Maks. 60 menu · Form Reservasi',
        revisions: '3 kali revisi minor',
        features: [
          'Mencakup seluruh fitur relevan sebelumnya',
          'Maksimal 5 halaman website',
          'Maksimal 40 foto beresolusi tinggi',
          'Maksimal 60 menu makanan dan minuman',
          'Pencarian menu interaktif untuk kemudahan tamu',
          'Filter kategori hidangan cepat',
          'Galeri foto suasana restoran interaktif',
          'Halaman promosi dan jadwal acara (event/live music)',
          'Formulir permintaan reservasi meja ke email/WhatsApp',
          'Desain eksklusif mencerminkan suasana restoran',
          'Animasi tambahan bernuansa mewah',
          'Gratis 1 domain (.com/.id) selama 1 tahun',
          '3 kali revisi minor',
        ],
        ctaText: 'Pilih Restaurant Experience →',
        disclaimerNote:
          'Formulir reservasi meneruskan permintaan tamu ke pengelola via email/WA (tidak termasuk sistem booking meja otomatis).',
      },
    ],
    comparisonFeatures: [
      { name: 'Jumlah Halaman Website', starter: '1 halaman', pro: 'Hingga 3 halaman', premium: 'Hingga 5 halaman' },
      { name: 'Kapasitas Menu Makanan & Minuman', starter: '15 menu', pro: '30 menu', premium: '60 menu' },
      { name: 'Maksimal Foto Hidangan & Tempat', starter: '10 foto', pro: '25 foto', premium: '40 foto' },
      { name: 'Profil Usaha & Jam Buka', starter: true, pro: true, premium: true },
      { name: 'Peta Lokasi Google Maps', starter: true, pro: true, premium: true },
      { name: 'Tombol Pesan / Tanya WhatsApp', starter: true, pro: true, premium: true },
      { name: 'Pengelompokan Kategori Hidangan', starter: false, pro: true, premium: true },
      { name: 'QR Code Menu Siap Cetak di Meja', starter: false, pro: true, premium: true },
      { name: 'Bagian Promosi & Penawaran Spesial', starter: false, pro: true, premium: true },
      { name: 'Pencarian Menu Interaktif', starter: false, pro: false, premium: true },
      { name: 'Filter Kategori Makanan Cepat', starter: false, pro: false, premium: true },
      { name: 'Halaman Jadwal Acara / Event', starter: false, pro: false, premium: true },
      { name: 'Formulir Permintaan Reservasi Meja', starter: false, pro: false, premium: true },
      { name: 'Gratis Domain .com / .id (1 Tahun)', starter: false, pro: false, premium: true },
      { name: 'Jumlah Revisi Minor', starter: '1× revisi', pro: '2× revisi', premium: '3× revisi' },
    ],
    faq: [
      {
        q: 'Bagaimana cara kerja QR Code menu di meja restoran?',
        a: 'Kami buatkan file desain QR Code siap cetak beresolusi tinggi. Tamu cukup mengarahkan kamera smartphone mereka ke QR Code tersebut dan daftar menu digital langsung terbuka tanpa perlu install aplikasi apapun.',
      },
      {
        q: 'Apakah menu makanan dan harga bisa diubah sewaktu-waktu?',
        a: 'Bisa. Kami menyediakan layanan maintenance berkala atau add-on penambahan daftar menu setiap kali ada perubahan varian atau penyesuaian harga.',
      },
      {
        q: 'Bagaimana alur kerja formulir reservasi meja?',
        a: 'Tamu mengisi nama, nomor kontak, tanggal, jam, dan jumlah orang pada formulir. Rincian permintaan tersebut langsung diteruskan ke WhatsApp atau email kasir/manajer restoran untuk dikonfirmasi ketersediaannya.',
      },
    ],
  },

  // ─── 4. COMPANY PROFILE ─────────────────────────────────────────────
  'company-profile': {
    id: 'company-profile',
    slug: 'company-profile',
    number: '04',
    title: 'Company Profile',
    categoryName: 'Company Profile',
    eyebrow: '04 — COMPANY PROFILE',
    heroHeadline: 'Build Trust Through Your Digital Presence.',
    heroDescription:
      'Website profesional untuk memperkenalkan identitas, layanan, kegiatan, pengalaman, dan pencapaian suatu perusahaan atau organisasi.',
    startingPrice: 1499000,
    startingPriceFormatted: 'Rp1.499.000',
    benefits: [
      {
        title: 'Kredibilitas Korporat Terpercaya',
        desc: 'Tampilkan visi, misi, legalitas usaha, dan rekam jejak kerja sama profesional.',
      },
      {
        title: 'Pameran Layanan & Proyek',
        desc: 'Jelaskan cakupan solusi yang Anda tawarkan dengan dokumentasi proyek nyata.',
      },
      {
        title: 'Saluran Kerja Sama Bisnis',
        desc: 'Formulir kontak bisnis dan tombol WhatsApp memudahkan calon klien meminta penawaran.',
      },
      {
        title: 'Identitas Brand yang Selaras',
        desc: 'Desain profesional yang mengadopsi skema warna dan tipografi resmi perusahaan.',
      },
    ],
    packages: [
      {
        id: 'basic',
        name: 'Business Essential',
        tier: 'basic',
        price: 1499000,
        priceFormatted: 'Rp1.499.000',
        subtitle: 'Profil korporat esensial, ringkas & terpercaya',
        description:
          'Fondasi kehadiran digital yang kredibel untuk bisnis baru, firma, agensi kecil, yayasan, atau organisasi.',
        limitsSummary: 'Hingga 3 halaman · Maks. 15 foto · 3 proyek · SEO dasar',
        revisions: '1 kali revisi minor',
        features: [
          'Maksimal 3 halaman website',
          'Maksimal 15 foto kegiatan & fasilitas',
          'Profil organisasi/perusahaan',
          'Sejarah singkat berdirinya usaha',
          'Visi dan misi perusahaan',
          'Informasi layanan atau kegiatan usaha',
          'Maksimal 3 proyek atau karya unggulan',
          'Alamat kantor dan peta Google Maps',
          'Tombol WhatsApp untuk kontak cepat',
          'Link media sosial terintegrasi',
          'Tampil rapi di HP, tablet & laptop',
          'Pengaturan dasar mesin pencari (SEO dasar)',
          '1 kali revisi minor',
        ],
        notIncluded: ['Profil tim & jajaran', 'Daftar klien & testimoni', 'Kelola artikel mandiri'],
        ctaText: 'Pilih Business Essential →',
        disclaimerNote: 'Ideal untuk profil usaha skala kecil & menengah.',
      },
      {
        id: 'standard',
        name: 'Professional',
        tier: 'standard',
        price: 2699000,
        priceFormatted: 'Rp2.699.000',
        badge: 'Rekomendasi',
        subtitle: 'Profil korporat lengkap dengan galeri proyek & profil tim',
        description:
          'Menampilkan skala bisnis yang matang dengan portofolio proyek lengkap, profil jajaran tim, dan daftar mitra terpercaya.',
        limitsSummary: 'Hingga 5 halaman · Maks. 30 foto · 8 proyek · Form Kontak',
        revisions: '2 kali revisi minor',
        features: [
          'Mencakup seluruh fitur Business Essential',
          'Maksimal 5 halaman website',
          'Maksimal 30 foto',
          'Maksimal 8 proyek atau karya unggulan',
          'Desain semi-custom diselaraskan dengan identitas brand',
          'Galeri kegiatan perusahaan dan dokumentasi proyek',
          'Profil jajaran tim atau pengurus',
          'Daftar klien atau mitra kerja sama',
          'Bagian testimoni dan ulasan klien',
          'Formulir kontak dan pertanyaan bisnis',
          'Penyesuaian warna berdasarkan identitas brand',
          'Animasi ringan saat digulir',
          '2 kali revisi minor',
        ],
        notIncluded: ['Kelola artikel mandiri (CMS)', 'Gratis domain', 'Analitik pengunjung'],
        ctaText: 'Pilih Professional →',
        disclaimerNote: 'Pilihan paling komprehensif untuk perusahaan bertumbuh.',
      },
      {
        id: 'premium',
        name: 'Corporate Signature',
        tier: 'premium',
        price: 4999000,
        priceFormatted: 'Rp4.999.000',
        badge: 'Corporate',
        subtitle: 'Solusi korporat terdepan dengan sistem kelola artikel & domain gratis',
        description:
          'Standar enterprise untuk perusahaan yang aktif membagikan siaran pers, artikel industri, dokumentasi proyek, dan membutuhkan gratis domain.',
        limitsSummary: 'Hingga 8 halaman · Maks. 50 foto · 15 proyek · CMS Berita',
        revisions: '3 kali revisi minor',
        features: [
          'Mencakup seluruh fitur relevan sebelumnya',
          'Maksimal 8 halaman website',
          'Maksimal 50 foto',
          'Maksimal 15 proyek atau karya unggulan',
          'Desain eksklusif mencerminkan wibawa korporat',
          'Garis waktu (timeline) perjalanan perusahaan',
          'Halaman berita, siaran pers, dan artikel',
          'Sistem mandiri untuk menambah & mengelola artikel (CMS Berita)',
          'Galeri proyek komprehensif',
          'Formulir kontak kerja sama bisnis',
          'Integrasi Google Analytics untuk pantau pengunjung',
          'Animasi tambahan yang sesuai konsep brand',
          'Gratis 1 custom domain (.com/.id) selama 1 tahun',
          '3 kali revisi minor',
        ],
        ctaText: 'Pilih Corporate Signature →',
        disclaimerNote:
          'Sistem pengelolaan konten (CMS) difokuskan khusus modul artikel/berita, bukan seluruh struktur halaman.',
      },
    ],
    comparisonFeatures: [
      { name: 'Jumlah Halaman Website', starter: 'Hingga 3 halaman', pro: 'Hingga 5 halaman', premium: 'Hingga 8 halaman' },
      { name: 'Maksimal Kapasitas Foto', starter: '15 foto', pro: '30 foto', premium: '50 foto' },
      { name: 'Dokumentasi Proyek Unggulan', starter: '3 proyek', pro: '8 proyek', premium: '15 proyek' },
      { name: 'Visi, Misi & Sejarah Usaha', starter: true, pro: true, premium: true },
      { name: 'Alamat Kantor & Peta Google Maps', starter: true, pro: true, premium: true },
      { name: 'Tombol Kontak WhatsApp Cepat', starter: true, pro: true, premium: true },
      { name: 'Pengaturan Dasar SEO Mesin Pencari', starter: true, pro: true, premium: true },
      { name: 'Galeri Kegiatan & Dokumentasi', starter: false, pro: true, premium: true },
      { name: 'Profil Jajaran Tim & Pengurus', starter: false, pro: true, premium: true },
      { name: 'Daftar Klien / Mitra Kerja Sama', starter: false, pro: true, premium: true },
      { name: 'Bagian Testimoni Klien', starter: false, pro: true, premium: true },
      { name: 'Formulir Kontak Bisnis', starter: false, pro: true, premium: true },
      { name: 'Timeline Perjalanan Perusahaan', starter: false, pro: false, premium: true },
      { name: 'Kelola Berita & Artikel Mandiri (CMS)', starter: false, pro: false, premium: true },
      { name: 'Analitik Pengunjung (Google Analytics)', starter: false, pro: false, premium: true },
      { name: 'Gratis Domain .com / .id (1 Tahun)', starter: false, pro: false, premium: true },
      { name: 'Jumlah Revisi Minor', starter: '1× revisi', pro: '2× revisi', premium: '3× revisi' },
    ],
    faq: [
      {
        q: 'Apakah paket Corporate Signature bisa mengelola artikel berita sendiri?',
        a: 'Ya, paket Corporate Signature dilengkapi sistem mandiri yang mudah digunakan untuk mempublikasikan artikel, siaran pers, atau berita perusahaan kapan saja tanpa bantuan teknisi.',
      },
      {
        q: 'Berapa lama pengerjaan website company profile?',
        a: 'Rata-rata 5–10 hari kerja setelah seluruh materi profil perusahaan, foto, dan struktur layanan diserahkan secara lengkap.',
      },
      {
        q: 'Apakah sudah termasuk email bisnis dengan nama domain sendiri?',
        a: 'Kami dapat membantu mengarahkan konfigurasi domain ke layanan email bisnis seperti Google Workspace, Zoho Mail, atau penyedia email pilihan Anda.',
      },
    ],
  },

  // ─── 5. BUSINESS STORE ──────────────────────────────────────────────
  'business-store': {
    id: 'business-store',
    slug: 'business-store',
    number: '05',
    title: 'Business Store',
    categoryName: 'Business Store',
    eyebrow: '05 — BUSINESS STORE',
    heroHeadline: 'Showcase Your Products. Grow Your Business.',
    heroDescription:
      'Website katalog dan toko online yang memudahkan pelanggan menemukan produk, melihat informasi, serta melakukan pemesanan sesuai kebutuhan bisnis.',
    startingPrice: 1299000,
    startingPriceFormatted: 'Rp1.299.000',
    benefits: [
      {
        title: 'Katalog Produk Siap Pesan',
        desc: 'Pelanggan dapat melihat rincian produk, varian, dan harga kapan saja tanpa tanya satu per satu.',
      },
      {
        title: 'Keranjang Belanja Praktis',
        desc: 'Pilihan beberapa produk otomatis dirangkum rapi ke dalam format pesan WhatsApp siap kirim.',
      },
      {
        title: 'Toko Online Otomatis (Premium)',
        desc: 'Sistem checkout langsung di website dengan pembayaran online otomatis dan kelola stok barang.',
      },
      {
        title: 'Hemat Waktu Pelayanan',
        desc: 'Mengurangi beban admin menjawab pertanyaan harga dan foto produk secara berulang-ulang.',
      },
    ],
    packages: [
      {
        id: 'basic',
        name: 'Product Catalog',
        tier: 'basic',
        price: 1299000,
        priceFormatted: 'Rp1.299.000',
        subtitle: 'Katalog etalase produk digital rapi dengan pesan langsung ke WA',
        description:
          'Etalase online rapi untuk memamerkan produk jualan Anda dengan tombol pemesanan langsung ke WhatsApp admin.',
        limitsSummary: 'Maks. 2 halaman · Maks. 20 produk awal · Pesan WA',
        revisions: '1 kali revisi minor',
        features: [
          'Maksimal 2 halaman website',
          'Maksimal 20 produk awal yang dimasukkan',
          'Katalog produk terstruktur',
          'Galeri foto produk',
          'Deskripsi dan harga produk jelas',
          'Pengelompokan kategori produk',
          'Tombol pesan melalui WhatsApp',
          'Informasi profil bisnis dan alamat toko',
          'Link media sosial terhubung',
          'Desain responsif di HP & laptop',
          '1 kali revisi minor',
        ],
        notIncluded: ['Keranjang belanja', 'Pencarian produk', 'Pembayaran online'],
        ctaText: 'Pilih Product Catalog →',
        disclaimerNote:
          'Tidak termasuk keranjang belanja, pembayaran otomatis, atau dashboard pengelolaan produk.',
      },
      {
        id: 'standard',
        name: 'Smart Catalog',
        tier: 'standard',
        price: 2499000,
        priceFormatted: 'Rp2.499.000',
        badge: 'Rekomendasi',
        subtitle: 'Katalog pintar dengan keranjang belanja & checkout WhatsApp',
        description:
          'Pelanggan dapat memilih beberapa produk ke keranjang belanja dan checkout dengan ringkasan pesanan otomatis ke WhatsApp.',
        limitsSummary: 'Hingga 4 halaman · Maks. 50 produk awal · Keranjang Belanja',
        revisions: '2 kali revisi minor',
        features: [
          'Mencakup seluruh fitur Product Catalog',
          'Maksimal 4 halaman website',
          'Maksimal 50 produk awal yang dimasukkan',
          'Pencarian produk cepat',
          'Filter kategori produk interaktif',
          'Keranjang belanja sederhana (Shopping Cart)',
          'Checkout melalui WhatsApp dengan ringkasan produk & total harga',
          'Banner promosi dan penawaran khusus',
          'Desain semi-custom bernuansa toko modern',
          '2 kali revisi minor',
        ],
        notIncluded: ['Pembayaran online otomatis', 'Kelola stok mandiri', 'Gratis domain'],
        ctaText: 'Pilih Smart Catalog →',
        disclaimerNote:
          'Keranjang belanja meneruskan ringkasan pesanan ke WhatsApp (tidak menyediakan pembayaran otomatis).',
      },
      {
        id: 'premium',
        name: 'Online Store',
        tier: 'premium',
        price: 5999000,
        priceFormatted: 'Rp5.999.000',
        badge: 'E-Commerce',
        subtitle: 'Toko online lengkap dengan pembayaran digital & halaman admin',
        description:
          'Sistem e-commerce penuh dengan checkout langsung di website, pembayaran otomatis, dashboard admin kelola stok & pesanan, serta gratis domain.',
        limitsSummary: 'Hingga 7 halaman · Maks. 100 produk awal · Pembayaran Online · Admin',
        revisions: '3 kali revisi minor',
        features: [
          'Mencakup seluruh fitur relevan sebelumnya',
          'Maksimal 7 halaman utama website',
          'Maksimal 100 produk awal yang dimasukkan',
          'Halaman detail produk mendalam',
          'Kategori dan pencarian produk canggih',
          'Keranjang belanja langsung di website',
          'Checkout langsung di website',
          'Integrasi 1 payment gateway (gerbang pembayaran online)',
          'Dashboard admin untuk pengelolaan produk',
          'Pengelolaan status pesanan masuk',
          'Pengelolaan stok barang dasar',
          'Status pembayaran dan pesanan real-time',
          'Fitur kupon diskon atau potongan harga sederhana',
          'Desain toko online eksklusif',
          'Gratis 1 domain (.com/.id) selama 1 tahun',
          '3 kali revisi minor',
        ],
        ctaText: 'Pilih Online Store →',
        disclaimerNote:
          'Integrasi payment gateway bergantung pada persetujuan akun merchant (biaya transaksi penyedia ditanggung klien).',
      },
    ],
    comparisonFeatures: [
      { name: 'Jumlah Halaman Utama', starter: 'Maks. 2 halaman', pro: 'Hingga 4 halaman', premium: 'Hingga 7 halaman' },
      { name: 'Kapasitas Produk Awal', starter: '20 produk', pro: '50 produk', premium: '100 produk' },
      { name: 'Foto, Deskripsi & Harga Produk', starter: true, pro: true, premium: true },
      { name: 'Pengelompokan Kategori Produk', starter: true, pro: true, premium: true },
      { name: 'Tombol Pesan WhatsApp Langsung', starter: true, pro: true, premium: true },
      { name: 'Pencarian & Filter Kategori', starter: false, pro: true, premium: true },
      { name: 'Keranjang Belanja (Shopping Cart)', starter: false, pro: true, premium: true },
      { name: 'Checkout Otomatis ke WhatsApp', starter: false, pro: true, premium: true },
      { name: 'Banner Promo & Diskon Spesial', starter: false, pro: true, premium: true },
      { name: 'Checkout Langsung di Website', starter: false, pro: false, premium: true },
      { name: 'Pembayaran Online (Payment Gateway)', starter: false, pro: false, premium: true },
      { name: 'Halaman Pengelolaan Produk & Pesanan', starter: false, pro: false, premium: true },
      { name: 'Pengelolaan Stok Barang Dasar', starter: false, pro: false, premium: true },
      { name: 'Fitur Kupon Diskon Sederhana', starter: false, pro: false, premium: true },
      { name: 'Gratis Domain .com / .id (1 Tahun)', starter: false, pro: false, premium: true },
      { name: 'Jumlah Revisi Minor', starter: '1× revisi', pro: '2× revisi', premium: '3× revisi' },
    ],
    faq: [
      {
        q: 'Apa perbedaan checkout WhatsApp dengan toko online pembayaran otomatis?',
        a: 'Pada paket Smart Catalog, pembeli mengumpulkan belanjaan di keranjang lalu mengirim ringkasannya ke WhatsApp admin untuk pembayaran transfer manual. Pada paket Online Store, pembeli langsung membayar di website lewat QRIS, transfer bank otomatis, atau e-wallet.',
      },
      {
        q: 'Apakah bisa menambah produk baru sendiri di kemudian hari?',
        a: 'Pada paket Online Store (Premium), Anda memiliki dashboard admin mandiri untuk menambah produk dan mengubah stok kapan saja. Untuk paket Basic & Standard, penambahan produk dapat dibantu lewat add-on berkala.',
      },
      {
        q: 'Apakah sudah termasuk integrasi kurir pengiriman otomatis?',
        a: 'Paket toko online mencakup sistem perhitungan ongkir standar/manual. Integrasi API kurir otomatis skala besar dapat dikonsultasikan sebagai fitur tambahan.',
      },
    ],
  },

  // ─── 6. CUSTOM WEBSITE ──────────────────────────────────────────────
  'custom-website': {
    id: 'custom-website',
    slug: 'custom-website',
    number: '06',
    title: 'Custom Website',
    categoryName: 'Custom Website',
    eyebrow: '06 — CUSTOM WEBSITE',
    heroHeadline: 'Your Idea, Built Into Reality.',
    heroDescription:
      'Layanan pengembangan website atau aplikasi berbasis web dengan fitur khusus, alur kerja, dan sistem yang dirancang sesuai kebutuhan proyek.',
    startingPrice: 4499000,
    startingPriceFormatted: 'Mulai Rp4.499.000',
    benefits: [
      {
        title: 'Solusi Khusus Sesuai Proses Bisnis',
        desc: 'Dibangun khusus untuk menjawab kebutuhan operasional unik yang tidak bisa dipenuhi template biasa.',
      },
      {
        title: 'Basis Data & Sistem Login Aman',
        desc: 'Struktur basis data terorganisir dengan sistem autentikasi dan hak akses berjenjang.',
      },
      {
        title: 'Dashboard Operasional Efisien',
        desc: 'Kelola data bisnis, pantau ringkasan statistik, dan unduh laporan ke format Excel/CSV.',
      },
      {
        title: 'Arsitektur Siap Berkembang',
        desc: 'Kode terstruktur rapi yang memudahkan penambahan fitur baru di masa mendatang.',
      },
    ],
    packages: [
      {
        id: 'basic',
        name: 'Starter System',
        tier: 'basic',
        price: 4499000,
        priceFormatted: 'Mulai Rp4.499.000',
        isStartingPrice: true,
        pricePrefix: 'Mulai ',
        subtitle: 'Aplikasi web sederhana dengan login & manajemen data',
        description:
          'Untuk website atau aplikasi sederhana dengan kebutuhan sistem terukur seperti portal data internal atau pencatatan operasional kecil.',
        limitsSummary: '1 Peran Pengguna · 2 Modul Kelola Data · Database & Login',
        revisions: '2 kali revisi minor',
        features: [
          'Desain responsif di semua perangkat',
          'Sistem login dan logout akun aman',
          'Penyimpanan basis data (database)',
          '1 jenis peran hak akses pengguna',
          'Maksimal 2 modul kelola data (CRUD sederhana)',
          'Dashboard admin berbasis template rapi',
          'Validasi formulir dan keamanan input data',
          'Pengujian fungsi dasar sistem',
          '2 kali revisi minor',
        ],
        notIncluded: ['Multi-peran pengguna', 'Ekspor data CSV', 'Integrasi API luar'],
        ctaText: 'Pilih Starter System →',
        disclaimerNote: 'Biaya mulai Rp4.499.000 untuk 2 modul kelola data dasar.',
      },
      {
        id: 'standard',
        name: 'Business System',
        tier: 'standard',
        price: 7999000,
        priceFormatted: 'Mulai Rp7.999.000',
        isStartingPrice: true,
        pricePrefix: 'Mulai ',
        badge: 'Rekomendasi',
        subtitle: 'Sistem alur kerja bisnis dengan multi-peran & statistik data',
        description:
          'Mencakup modul kelola data lebih banyak, 2 jenis peran akses, dashboard statistik operasional, dan ekspor data laporan CSV/Excel.',
        limitsSummary: '2 Peran Pengguna · 4 Modul Data · Ekspor CSV · Statistik',
        revisions: '3 kali revisi minor',
        features: [
          'Mencakup seluruh fitur relevan Starter System',
          'Maksimal 4 modul pengelolaan data terstruktur',
          'Maksimal 2 jenis peran pengguna (misal: Admin & Operator)',
          'Pembatasan hak akses menu berdasarkan peran',
          'Dashboard operasional dengan ringkasan statistik sederhana',
          'Fitur ekspor data ke format CSV / Excel',
          'Struktur basis data relasional teratur',
          'Desain antarmuka semi-custom',
          'Pengujian menyeluruh pada alur pengguna',
          '3 kali revisi minor',
        ],
        notIncluded: ['Integrasi API pihak ketiga', 'Arsitektur multi-role kompleks'],
        ctaText: 'Pilih Business System →',
        disclaimerNote: 'Biaya mulai Rp7.999.000 sesuai cakupan 4 modul yang disepakati.',
      },
      {
        id: 'premium',
        name: 'Custom Solution',
        tier: 'premium',
        price: 14999000,
        priceFormatted: 'Mulai dari Rp14.999.000',
        isStartingPrice: true,
        pricePrefix: 'Mulai dari ',
        badge: 'Bespoke',
        subtitle: 'Solusi perangkat lunak web penuh berbasis kebutuhan khusus',
        description:
          'Sistem website dan aplikasi web berbasis ruang lingkup proyek yang disepakati, dengan integrasi API, alur kerja khusus, dan kontrak resmi.',
        limitsSummary: 'Ruang lingkup sesuai penawaran resmi · Multi-role · API',
        revisions: 'Sesuai kesepakatan kontrak',
        features: [
          'Desain website / aplikasi khusus (custom UI/UX)',
          'Sistem multi-role hak akses tanpa batas peran dasar',
          'Dashboard operasional komprehensif',
          'Pengelolaan basis data terdistribusi / relasional',
          'Integrasi API pihak ketiga sesuai kebutuhan bisnis',
          'Sistem reservasi, booking, atau penjadwalan',
          'Pembayaran online otomatis',
          'Sistem laporan berkala dan grafik analitik',
          'Notifikasi otomatis via email',
          'Alur kerja (workflow) khusus sesuai SOP',
          'Pengujian intensif, deployment, dan dokumentasi sistem',
        ],
        ctaText: 'Konsultasikan Proyek →',
        disclaimerNote:
          'PENTING: Tidak semua fitur termasuk otomatis dalam Rp14.999.000. Fitur, jadwal, dan biaya ditentukan melalui dokumen penawaran resmi.',
      },
    ],
    comparisonFeatures: [
      { name: 'Tampil Rapi di HP & Laptop', starter: true, pro: true, premium: true },
      { name: 'Sistem Login & Logout Akun Aman', starter: true, pro: true, premium: true },
      { name: 'Penyimpanan Basis Data (Database)', starter: true, pro: true, premium: true },
      { name: 'Jumlah Peran Pengguna (User Roles)', starter: '1 jenis peran', pro: 'Maks. 2 peran', premium: 'Multi-role khusus' },
      { name: 'Modul Kelola Data (CRUD Sederhana)', starter: 'Maks. 2 modul', pro: 'Maks. 4 modul', premium: 'Sesuai kesepakatan' },
      { name: 'Halaman Pengelolaan (Admin Dashboard)', starter: 'Template dasar', pro: 'Dashboard lengkap', premium: 'Custom dashboard' },
      { name: 'Validasi Input & Keamanan Data', starter: true, pro: true, premium: true },
      { name: 'Ringkasan Data & Statistik Sederhana', starter: false, pro: true, premium: true },
      { name: 'Fitur Ekspor Laporan CSV / Excel', starter: false, pro: true, premium: true },
      { name: 'Integrasi API Pihak Ketiga', starter: false, pro: false, premium: 'Berdasarkan penawaran' },
      { name: 'Pembayaran Online Otomatis', starter: false, pro: false, premium: 'Berdasarkan penawaran' },
      { name: 'Notifikasi Otomatis via Email', starter: false, pro: false, premium: 'Berdasarkan penawaran' },
      { name: 'Dokumentasi Sistem & Alur Pengguna', starter: 'Ringkasan dasar', pro: 'Panduan operasional', premium: 'Dokumentasi lengkap' },
      { name: 'Jumlah Revisi Minor', starter: '2× revisi', pro: '3× revisi', premium: 'Sesuai kontrak' },
    ],
    faq: [
      {
        q: 'Apakah semua fitur Custom Solution sudah otomatis termasuk di harga Rp14.999.000?',
        a: 'Harga Mulai dari Rp14.999.000 adalah patokan awal proyek custom. Seluruh fitur, arsitektur data, timeline pengerjaan, dan biaya final ditentukan secara transparan dalam dokumen penawaran resmi (proposal).',
      },
      {
        q: 'Apakah kami mendapatkan hak milik kode sumber (source code)?',
        a: 'Ya, seluruh hak milik kode sumber (source code) dan akses server diserahkan sepenuhnya kepada klien setelah pelunasan proyek selesai.',
      },
      {
        q: 'Bagaimana tahapan memulai proyek Custom Website?',
        a: 'Kita mulai dengan sesi konsultasi mendalam untuk memahami alur kerja dan fitur yang Anda butuhkan. Tim 799Hi kemudian menyusun dokumen spesifikasi kebutuhan teknis dan penawaran biaya yang jelas.',
      },
    ],
  },
};

/**
 * Slugs array and alias mapping for backwards compatibility
 */
export const SERVICE_SLUGS = [
  'personal-portfolio',
  'wedding-invitation',
  'cafe-restaurant',
  'company-profile',
  'business-store',
  'custom-website',
];

export const SLUG_ALIASES: Record<string, string> = {
  portfolio: 'personal-portfolio',
  'personal-portfolio': 'personal-portfolio',
  wedding: 'wedding-invitation',
  'wedding-invitation': 'wedding-invitation',
  cafe: 'cafe-restaurant',
  'cafe-restaurant': 'cafe-restaurant',
  business: 'company-profile',
  company: 'company-profile',
  'company-profile': 'company-profile',
  store: 'business-store',
  ecommerce: 'business-store',
  'business-store': 'business-store',
  custom: 'custom-website',
  'custom-website': 'custom-website',
  'landing-page': 'company-profile',
};

/**
 * Safe resolver to get ServiceDetailData by slug or alias
 */
export const getServiceBySlug = (slug: string): ServiceDetailData | null => {
  const resolvedSlug = SLUG_ALIASES[slug] || slug;
  return SERVICE_PRICING_DATA[resolvedSlug] || null;
};
