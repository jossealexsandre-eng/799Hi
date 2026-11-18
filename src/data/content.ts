import { ServiceItem, PricingPackage, ProcessStep, FAQItem } from '../types';

export const WHATSAPP_NUMBER = '6282197754103';
export const WHATSAPP_DISPLAY = '+62 821-9775-4103';
export const INSTAGRAM_HANDLE = '@799hi.creatives';
export const INSTAGRAM_URL = 'https://instagram.com/799hi.creatives';

export const getWhatsAppLink = (customMessage?: string) => {
  const message =
    customMessage || "Hi 799Hi! I'd like to discuss a website project.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

export const TRUST_POINTS = [
  {
    number: '01',
    title: 'Desain Kustom',
    description: 'Dirancang khusus sesuai karakter & identitas brand Anda.',
  },
  {
    number: '02',
    title: 'Responsif Penuh',
    description: 'Tampilan sempurna di ponsel, tablet, hingga desktop.',
  },
  {
    number: '03',
    title: 'Modern & Cepat',
    description: 'Antarmuka bersih, animasi halus, dan waktu muat instan.',
  },
  {
    number: '04',
    title: 'Siap Diluncurkan',
    description: 'Dari perancangan, domain, hingga website aktif online.',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'personal-portfolio',
    number: '01',
    title: 'Personal Portfolio',
    subtitle: 'Your Story, Your Digital Identity.',
    description:
      'Website pribadi yang dirancang untuk menampilkan profil, pengalaman, karya, pencapaian, dan identitas profesional dalam satu tempat.',
    ctaText: 'Lihat Paket →',
    startingPrice: 'Mulai Rp549.000',
    typicalTimeline: '3–5 hari',
    idealFor: [
      'Mahasiswa & fresh graduate',
      'Software engineer & UI/UX designer',
      'Fotografer, arsitek & kreator konten',
      'Konsultan & profesional independen',
    ],
    deliverables: [
      'Desain editorial modern & responsif di HP & laptop',
      'Galeri karya & proyek unggulan interaktif',
      'Timeline pengalaman kerja & riwayat pendidikan',
      'Fitur download CV format PDF & tombol WhatsApp',
      'Pengaturan dasar mesin pencari (SEO dasar)',
    ],
  },
  {
    id: 'wedding-invitation',
    number: '02',
    title: 'Wedding Invitation',
    subtitle: 'Your Special Day, Beautifully Shared.',
    description:
      'Undangan pernikahan digital yang praktis dan elegan, dilengkapi informasi acara, galeri kenangan, serta berbagai fitur yang memudahkan tamu.',
    ctaText: 'Lihat Paket →',
    startingPrice: 'Mulai Rp199.000',
    typicalTimeline: '2–4 hari',
    idealFor: [
      'Calon pengantin dengan konsep pernikahan modern',
      'Akad intim maupun resepsi pernikahan akbar',
      'Pasangan yang ingin undangan ramah lingkungan & praktis',
      'Kebutuhan RSVP digital & amplop digital',
    ],
    deliverables: [
      'Navigasi lokasi akurat via Google Maps',
      'Hitung mundur hari H & musik latar romantis',
      'Formulir konfirmasi kehadiran tamu (RSVP aktif)',
      'Tautan nama tamu khusus per undangan (?to=Nama)',
      'Kolom ucapan doa restu tamu & amplop digital',
    ],
  },
  {
    id: 'cafe-restaurant',
    number: '03',
    title: 'Cafe & Restaurant',
    subtitle: 'Bring Your Dining Experience Online.',
    description:
      'Website untuk memperkenalkan usaha kuliner, menampilkan menu, informasi tempat, promosi, dan memudahkan pelanggan menghubungi bisnis.',
    ctaText: 'Lihat Paket →',
    startingPrice: 'Mulai Rp899.000',
    typicalTimeline: '4–7 hari',
    idealFor: [
      'Kedai kopi, cafe & coffee shop modern',
      'Restoran keluarga, bistro & kuliner artisan',
      'Katering & usaha makanan minuman mandiri',
      'Bisnis kuliner yang butuh QR Code meja',
    ],
    deliverables: [
      'Katalog menu makanan & minuman dengan foto tajam',
      'QR Code menu digital siap cetak untuk di meja',
      'Peta Google Maps, alamat detail & jam operasional',
      'Pencarian menu & filter kategori hidangan cepat',
      'Formulir permintaan reservasi meja ke email/WA',
    ],
  },
  {
    id: 'company-profile',
    number: '04',
    title: 'Company Profile',
    subtitle: 'Build Trust Through Your Digital Presence.',
    description:
      'Website profesional untuk memperkenalkan identitas, layanan, kegiatan, pengalaman, dan pencapaian suatu perusahaan atau organisasi.',
    ctaText: 'Lihat Paket →',
    startingPrice: 'Mulai Rp1.499.000',
    typicalTimeline: '5–10 hari',
    idealFor: [
      'Perusahaan berkembang, startup & firma hukum',
      'Agensi kreatif, studio arsitek & konsultan bisnis',
      'Yayasan, organisasi profesi & lembaga nirlaba',
      'Kontraktor, manufaktur & penyedia jasa B2B',
    ],
    deliverables: [
      'Visi, misi, profil legalitas & sejarah perusahaan',
      'Dokumentasi portofolio proyek & profil tim pimpinan',
      'Daftar klien, testimoni & formulir kontak kemitraan',
      'Sistem mandiri publikasi artikel berita (CMS Berita)',
      'Gratis domain .com / .id 1 tahun pada paket Signature',
    ],
  },
  {
    id: 'business-store',
    number: '05',
    title: 'Business Store',
    subtitle: 'Showcase Your Products. Grow Your Business.',
    description:
      'Website katalog dan toko online yang memudahkan pelanggan menemukan produk, melihat informasi, serta melakukan pemesanan sesuai kebutuhan bisnis.',
    ctaText: 'Lihat Paket →',
    startingPrice: 'Mulai Rp1.299.000',
    typicalTimeline: '5–12 hari',
    idealFor: [
      'Brand fashion, aksesoris & produk kecantikan',
      'Distributor barang, toko retail & kerajinan lokal',
      'Pebisnis online yang ingin sistem checkout WA rapi',
      'Toko yang membutuhkan sistem e-commerce otomatis',
    ],
    deliverables: [
      'Katalog etalase produk dengan galeri foto & harga',
      'Pencarian produk cepat & filter kategori',
      'Keranjang belanja dengan checkout otomatis ke WA',
      'Toko online pembayaran digital & kelola stok barang',
      'Halaman pengelolaan (Admin Dashboard) pada paket Online Store',
    ],
  },
  {
    id: 'custom-website',
    number: '06',
    title: 'Custom Website',
    subtitle: 'Your Idea, Built Into Reality.',
    description:
      'Layanan pengembangan website atau aplikasi berbasis web dengan fitur khusus, alur kerja, dan sistem yang dirancang sesuai kebutuhan proyek.',
    ctaText: 'Lihat Paket →',
    startingPrice: 'Mulai Rp4.499.000',
    typicalTimeline: '10–25 hari',
    idealFor: [
      'Aplikasi web operasional internal & sistem workflow',
      'Sistem reservasi, booking atau keanggotaan khusus',
      'Integrasi basis data terstruktur & hak akses multi-role',
      'Proyek dengan spesifikasi teknis dan API kustom',
    ],
    deliverables: [
      'Arsitektur web modern & desain antarmuka khusus (UI/UX)',
      'Sistem login akun aman & hak akses berjenjang (multi-role)',
      'Dashboard operasional, grafik statistik & ekspor CSV',
      'Integrasi pembayaran online & API pihak ketiga',
      'Dokumentasi sistem lengkap & serah terima source code',
    ],
  },
];

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    id: 'basic',
    name: 'BASIC',
    price: 'Mulai Rp199.000',
    rawPrice: '199K',
    target: 'Kebutuhan utama dengan harga ekonomis & fungsional.',
    isPopular: false,
    features: [
      '1 hingga 3 halaman website terstruktur',
      'Desain rapi di HP, tablet & laptop',
      'Tombol kontak WhatsApp langsung',
      'Peta Google Maps & jam operasional',
      'Optimasi gambar agar cepat dibuka',
      'Pengaturan dasar mesin pencari (SEO)',
      '1 kali revisi minor',
      '14 hari garansi kendala bug',
    ],
    ctaText: 'Pilih Paket Basic',
  },
  {
    id: 'standard',
    name: 'STANDARD',
    price: 'Mulai Rp399.000',
    rawPrice: '399K',
    target: 'Fitur lebih lengkap & desain semi-custom pilihan rekomendasi.',
    isPopular: true,
    features: [
      'Hingga 5 halaman website responsif',
      'Desain semi-custom sesuai identitas brand',
      'Galeri foto interaktif & lightbox',
      'Formulir kontak / RSVP / checkout WhatsApp',
      'Animasi halus saat halaman digulir',
      'Penyesuaian warna & tipografi brand',
      '2 kali revisi minor',
      '14 hari garansi kendala bug',
    ],
    ctaText: 'Pilih Paket Standard',
  },
  {
    id: 'premium',
    name: 'PREMIUM',
    price: 'Mulai Rp799.000',
    rawPrice: '799K',
    target: 'Pengalaman personal eksklusif dengan gratis domain 1 tahun.',
    isPopular: false,
    features: [
      'Hingga 8 halaman website komprehensif',
      'Desain eksklusif & dipersonalisasi',
      'Gratis 1 custom domain .com / .id (1 tahun)',
      'Kelola artikel berita mandiri / toko online',
      'Formulir kontak bisnis ke email / WhatsApp',
      'Pemasangan analitik pengunjung',
      '3 kali revisi minor',
      'Hingga 30 hari garansi kendala bug',
    ],
    ctaText: 'Pilih Paket Premium',
  },
  {
    id: 'custom',
    name: 'CUSTOM WEBSITE',
    price: 'Mulai Rp4.499.000',
    rawPrice: '4.499K+',
    target: 'Sistem aplikasi web khusus dengan database, login & alur kerja bisnis.',
    isPopular: false,
    features: [
      'Sistem login & hak akses berjenjang (multi-role)',
      'Basis data terstruktur & dashboard operasional',
      'Modul kelola data bisnis (tambah, ubah, hapus)',
      'Fitur ekspor laporan ke file CSV / Excel',
      'Integrasi API pihak ketiga & pembayaran online',
      'Pengujian alur pengguna & serah terima source code',
      'Revisi & dukungan sesuai kesepakatan kontrak',
    ],
    ctaText: 'Konsultasikan Proyek',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Diskusi',
    description: 'Ceritakan ide, bisnis, dan visi website Anda.',
    details: 'Kita mulai dengan obrolan santai via WhatsApp untuk memahami target audiens, preferensi estetika, dan ekspektasi jadwal proyek Anda.',
  },
  {
    number: '02',
    title: 'Perencanaan',
    description: 'Struktur, konten, dan navigasi website dipetakan.',
    details: 'Kami menyusun wireframe, hierarki section, serta panduan konten agar alur informasi mengalir intuitif tanpa hambatan.',
  },
  {
    number: '03',
    title: 'Desain',
    description: 'Website dirancang sesuai karakter brand Anda.',
    details: 'Kami merancang visual kustom bernuansa editorial mewah, tipografi elegan, dan tata letak yang memikat calon pelanggan Anda.',
  },
  {
    number: '04',
    title: 'Pengembangan',
    description: 'Desain diwujudkan menjadi website interaktif.',
    details: 'Kami membangun kode dengan standar modern, animasi Framer Motion yang halus, responsif di semua perangkat, serta optimasi SEO.',
  },
  {
    number: '05',
    title: 'Peluncuran',
    description: 'Website resmi live dan siap dibagikan ke dunia.',
    details: 'Kami menghubungkan domain kustom, setup hosting berkecepatan tinggi, uji coba di berbagai layar, dan serah terima penuh.',
  },
];

export const WHY_US_ITEMS = [
  {
    title: 'Kustom, bukan template pasaran.',
    description: 'Website Anda dirancang khusus sesuai identitas unik Anda, bukan sekadar mengganti teks di template umum yang membosankan.',
  },
  {
    title: 'Desain bersih & berkelas.',
    description: 'Bebas dari elemen visual berlebihan yang membingungkan. Setiap detail dirancang dengan tujuan yang jelas dan elegan.',
  },
  {
    title: 'Optimal di setiap layar.',
    description: 'Tampilan mulus di ponsel, tablet, maupun layar desktop dengan performa loading cepat dan interaksi natural.',
  },
  {
    title: 'Komunikasi transparan.',
    description: 'Proses kerja terarah dengan update rutin via WhatsApp, siklus revisi yang terukur, dan komitmen jadwal nyata.',
  },
  {
    title: 'Membangun reputasi brand.',
    description: 'Website yang memancarkan kredibilitas tinggi sejak detik pertama pengunjung membuka tautan Anda.',
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Berapa lama proses pembuatan website?',
    answer:
      'Durasi pengerjaan menyesuaikan kategori dan kelengkapan materi. Undangan pernikahan digital & portofolio 1 halaman umumnya selesai dalam 2 sampai 5 hari kerja, website bisnis & toko katalog 5 sampai 10 hari kerja, sedangkan aplikasi web custom disesuaikan dengan kompleksitas sistem.',
  },
  {
    question: 'Bagaimana sistem pembayaran di 799Hi Creatives?',
    answer:
      'Kami menggunakan sistem pembayaran 50/50. Pembayaran uang muka (DP) sebesar 50% dilakukan di awal sebelum pengerjaan dimulai, dan pelunasan sisa 50% dilakukan setelah website selesai ditinjau sebelum dipublikasikan.',
  },
  {
    question: 'Apakah domain (.com / .id) sudah termasuk?',
    answer:
      'Gratis 1 custom domain (.com atau .id) selama 1 tahun pertama sudah termasuk pada paket Premium untuk Personal Portfolio, Cafe & Restaurant, Company Profile, dan Business Store. Untuk paket Basic dan Standard, domain dapat ditambahkan melalui fitur add-on.',
  },
  {
    question: 'Berapa kali revisi yang didapatkan?',
    answer:
      'Setiap tingkatan paket sudah mencakup revisi minor terarah: 1 kali revisi untuk paket Basic, 2 kali revisi untuk paket Standard, dan 3 kali revisi untuk paket Premium.',
  },
  {
    question: 'Bisakah saya mengajukan referensi tampilan sendiri?',
    answer:
      'Tentu bisa. Anda dapat mengirimkan contoh website, referensi warna, atau tata letak yang disukai saat sesi konsultasi agar hasil akhirnya sesuai dengan karakter yang Anda inginkan.',
  },
  {
    question: 'Apakah tersedia layanan pembuatan katalog produk atau toko online?',
    answer:
      'Ya, kami menyediakan kategori khusus Business Store mulai dari Rp1.299.000 untuk katalog produk, Rp2.499.000 untuk toko dengan keranjang checkout WhatsApp, hingga Rp5.999.000 untuk toko online lengkap dengan dashboard admin dan pembayaran digital.',
  },
  {
    question: 'Apakah konten website bisa diperbarui setelah website aktif?',
    answer:
      'Bisa. Untuk paket yang memiliki halaman pengelolaan (CMS/Admin), Anda dapat mengubah data secara mandiri. Kami juga menyediakan layanan pemeliharaan berkala maupun penambahan konten kapan saja dibutuhkan.',
  },
  {
    question: 'Bagaimana langkah pertama untuk memesan?',
    answer:
      'Anda dapat langsung memilih kategori layanan dan paket di halaman ini, menggunakan kalkulator estimasi fitur tambahan (add-on), lalu menekan tombol Konsultasi via WhatsApp ke nomor +62 821-9775-4103.',
  },
];
