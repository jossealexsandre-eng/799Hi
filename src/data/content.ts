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
    id: 'portfolio',
    number: '01',
    title: 'Portfolio',
    subtitle: 'Showcase yourself professionally.',
    description:
      'Personal websites designed to highlight your experience, skills, projects and personality.',
    ctaText: 'Explore →',
    startingPrice: 'Rp499K',
    typicalTimeline: '3–5 days',
    idealFor: [
      'Students & graduates',
      'Software engineers & designers',
      'Creative directors & photographers',
      'Consultants & content creators',
    ],
    deliverables: [
      'Hero biography with distinct editorial layout',
      'Categorized portfolio & case study showcases',
      'Interactive skill matrix & education timeline',
      'Downloadable resume & direct contact channels',
      'Fast responsive optimization for mobile & desktop',
    ],
  },
  {
    id: 'business',
    number: '02',
    title: 'Business',
    subtitle: 'Give your business a professional presence.',
    description:
      'Modern websites for businesses, services, brands and organizations.',
    ctaText: 'Explore →',
    startingPrice: 'Rp799K',
    typicalTimeline: '5–10 days',
    idealFor: [
      'Cafes, restaurants & culinary spaces',
      'Service studios & professional agencies',
      'Architects, clinics & law firms',
      'Boutique brands & local businesses',
    ],
    deliverables: [
      'Clear value proposition & brand storytelling',
      'Services / menu item presentation with pricing',
      'Direct WhatsApp booking & inquiry integration',
      'Google Maps location & opening hours',
      'Search engine friendly structure (Local SEO)',
    ],
  },
  {
    id: 'wedding',
    number: '03',
    title: 'Wedding',
    subtitle: 'Make your invitation memorable.',
    description:
      'Interactive digital wedding invitations designed with elegance and personality.',
    ctaText: 'Explore →',
    startingPrice: 'Rp499K',
    typicalTimeline: '3–6 days',
    idealFor: [
      'Couples planning modern celebrations',
      'Intimate ceremonies & grand receptions',
      'Couples wanting paperless, elegant invitations',
      'Couples needing guest RSVP & digital gift features',
    ],
    deliverables: [
      'Personalized couple story & countdown timer',
      'Ceremony & reception details with Google Maps navigation',
      'Curated photo gallery with smooth lightbox',
      'Interactive RSVP system & guest wishes guestbook',
      'Digital angpao / bank account quick copy',
      'Background music & interactive envelope opening',
    ],
  },
  {
    id: 'landing-page',
    number: '04',
    title: 'Landing Page',
    subtitle: 'Turn attention into action.',
    description:
      'Focused landing pages for products, services, campaigns and events.',
    ctaText: 'Explore →',
    startingPrice: 'Rp499K',
    typicalTimeline: '3–5 days',
    idealFor: [
      'Product releases & digital downloads',
      'Workshops, webinars & special events',
      'Lead generation for consultants & courses',
      'Marketing campaign promotions',
    ],
    deliverables: [
      'Single-focus visual hierarchy tailored for conversion',
      'Compelling benefit breakdowns & FAQ modules',
      'Frictionless call-to-action triggers & contact capture',
      'Speed-optimized code for high advertising ROI',
      'Social share Open Graph preview configuration',
    ],
  },
  {
    id: 'custom',
    number: '05',
    title: 'Custom',
    subtitle: 'Something more specific?',
    description:
      "We'll create a website around your exact requirements.",
    ctaText: "Let's discuss →",
    startingPrice: 'Rp2M+',
    typicalTimeline: '10–20 days',
    idealFor: [
      'Bespoke web applications & portals',
      'E-commerce & catalogue stores',
      'Reservation & booking systems',
      'Custom database & API workflows',
    ],
    deliverables: [
      'Custom frontend architecture with tailored UI/UX',
      'Database integration & content management',
      'Secure authentication & role management',
      'Payment gateway / billing integrations',
      'Long-term maintenance & scalability roadmap',
    ],
  },
];

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    id: 'basic',
    name: 'BASIC',
    price: 'Rp499K',
    rawPrice: '499K',
    target: 'For simple websites and personal projects.',
    isPopular: false,
    features: [
      '1-page website',
      'Up to 4 sections',
      'Custom website design',
      'Responsive mobile & desktop',
      'Basic animations',
      'WhatsApp / social media integration',
      'Google Maps integration',
      'SEO-ready structure',
      'Website deployment',
      '2× revisions',
      '7 days minor support',
    ],
    ctaText: 'Choose Basic',
  },
  {
    id: 'standard',
    name: 'STANDARD',
    price: 'Rp799K',
    rawPrice: '799K',
    target: 'For portfolios, personal brands and small businesses.',
    isPopular: true,
    features: [
      '1-page website',
      'Up to 7 sections',
      'Custom UI/UX',
      'Responsive design',
      'Modern animations',
      'WhatsApp integration',
      'Social media integration',
      'Google Maps',
      'Contact form',
      'Basic SEO setup',
      'Basic performance optimization',
      'Website deployment',
      '3× revisions',
      '14 days minor support',
    ],
    ctaText: 'Choose Standard',
  },
  {
    id: 'professional',
    name: 'PROFESSIONAL',
    price: 'Rp1.499K',
    rawPrice: '1.499K',
    target: 'For companies, brands and professional businesses.',
    isPopular: false,
    features: [
      'Up to 5 pages',
      'Fully custom UI/UX',
      'Responsive design',
      'Advanced animations',
      'Gallery / portfolio',
      'WhatsApp integration',
      'Social media integration',
      'Google Maps',
      'Contact / inquiry form',
      'Basic SEO',
      'Performance optimization',
      'Open Graph setup',
      'Website deployment',
      '5× revisions',
      '30 days minor support',
    ],
    ctaText: 'Choose Professional',
  },
  {
    id: 'custom',
    name: 'CUSTOM',
    price: 'Rp2M+',
    rawPrice: '2M+',
    target: 'For unique requirements and custom web applications.',
    isPopular: false,
    features: [
      'E-commerce',
      'Booking system',
      'Login / authentication',
      'Database',
      'Admin dashboard',
      'Payment integration',
      'Product management',
      'User management',
      'API integration',
      'Custom web applications',
    ],
    ctaText: 'Discuss Your Project →',
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
      'Durasi pengerjaan tergantung pada ruang lingkup. Website 1 halaman sederhana umumnya selesai dalam 3–5 hari kerja, sedangkan proyek multi-halaman atau kustom membutuhkan waktu 5–15 hari kerja.',
  },
  {
    question: 'Bisakah saya mengajukan referensi desain sendiri?',
    answer:
      'Tentu bisa. Anda dapat memberikan tautan referensi, moodboard, atau contoh website yang Anda sukai untuk kami jadikan acuan estetika.',
  },
  {
    question: 'Apakah domain dan hosting sudah termasuk?',
    answer:
      'Domain & hosting sudah termasuk pada paket Premium (1 tahun pertama). Untuk paket Starter atau Pro, domain & hosting terpisah atau dapat kami bantu siapkan dengan mudah.',
  },
  {
    question: 'Berapa kali revisi yang diberikan?',
    answer:
      'Setiap paket memiliki batas revisi yang transparan (2×, 3×, atau 5× revisi) untuk menjaga kualitas hasil dan ketepatan waktu peluncuran.',
  },
  {
    question: 'Bisakah mendesain ulang website saya yang sudah ada?',
    answer:
      'Tentu bisa. Kami dapat memodernisasi tampilan, memperbaiki tata letak responsif, serta meningkatkan kecepatan website Anda yang sudah ada.',
  },
  {
    question: 'Apakah bisa membuat toko online / e-commerce?',
    answer:
      'Bisa. Proyek toko online ditangani melalui kategori Custom dengan fitur katalog produk, keranjang belanja, dan sistem pembayaran terintegrasi.',
  },
  {
    question: 'Apakah website bisa diperbarui setelah selesai?',
    answer:
      'Bisa. Kami menyediakan panduan serah terima serta paket pemeliharaan dan pembaruan berkala sesuai kebutuhan Anda.',
  },
  {
    question: 'Bagaimana cara memulai?',
    answer:
      'Cukup klik tombol Mulai Proyek atau hubungi WhatsApp 799Hi di 0821-9775-4103 untuk konsultasi awal.',
  },
];
