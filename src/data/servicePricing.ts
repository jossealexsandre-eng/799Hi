export interface ServicePackageFeature {
  name: string;
  starter: string | boolean;
  pro: string | boolean;
  premium: string | boolean;
}

export interface ServicePackageItem {
  id: string;
  name: string;
  price: string;
  subtitle: string;
  description?: string;
  badge?: 'POPULAR' | 'MOST COMPLETE';
  features: string[];
  notIncluded?: string[];
  ctaText: string;
  disclaimerNote?: string;
}

export interface ServiceDetailData {
  slug: string;
  number: string;
  title: string;
  categoryName: string;
  eyebrow: string;
  heroHeadline: string;
  heroDescription: string;
  startingPrice: string;
  maxPrice?: string;
  hasPackages: boolean;
  packages: ServicePackageItem[];
  comparisonFeatures: ServicePackageFeature[];
  customProjects?: {
    title: string;
    description: string;
  }[];
  customCapabilities?: string[];
}

export const WHATSAPP_PHONE = '6282197754103';

export const buildWhatsAppUrl = (serviceTitle: string, packageName: string, price: string): string => {
  const message = `Hi 799Hi! I'd like to order the ${serviceTitle} Website — ${packageName} package (${price}). I'd like to discuss the project details.`;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
};

export const buildCustomWhatsAppUrl = (): string => {
  const message = `Hi 799Hi! I'd like to discuss a Custom Website project (Starting from Rp2M+). I'd like to consult on my specific requirements.`;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
};

export const SERVICE_PRICING_DATA: Record<string, ServiceDetailData> = {
  portfolio: {
    slug: 'portfolio',
    number: '01',
    title: 'Portfolio Websites',
    categoryName: 'Portfolio',
    eyebrow: '01 — PORTFOLIO',
    heroHeadline: 'Portfolio Websites',
    heroDescription:
      'A professional online presence designed to showcase your experience, work and personal brand.',
    startingPrice: 'Rp499K',
    maxPrice: 'Rp1.499K',
    hasPackages: true,
    packages: [
      {
        id: 'starter',
        name: 'STARTER',
        price: 'Rp499K',
        subtitle: 'Simple & professional',
        description: 'Perfect for students, personal portfolios and simple personal brands.',
        features: [
          '1-page website',
          'Up to 4 sections',
          'About section',
          'Skills section',
          'Projects section',
          'Contact section',
          'Responsive mobile & desktop',
          'Basic animations',
          'WhatsApp integration',
          'Social media links',
          'Website deployment',
          '2× revisions',
        ],
        notIncluded: ['Domain', 'Hosting', 'Advanced animations', 'Advanced SEO'],
        ctaText: 'Choose Starter →',
        disclaimerNote: 'Domain & hosting not included.',
      },
      {
        id: 'pro',
        name: 'PRO',
        price: 'Rp999K',
        subtitle: 'Built for personal branding',
        description: 'Perfect for professionals, creators and people who want a stronger online presence.',
        badge: 'POPULAR',
        features: [
          'Includes everything in Starter, plus:',
          'Up to 7 sections',
          'Custom UI/UX',
          'Education / Experience section',
          'Detailed project showcase',
          'Gallery',
          'Modern animations',
          'Contact form',
          'Basic SEO setup',
          'Performance optimization',
          'Social sharing / Open Graph',
          '3× revisions',
          '14 days minor support',
        ],
        ctaText: 'Choose Pro →',
        disclaimerNote: 'Domain & hosting not included.',
      },
      {
        id: 'premium',
        name: 'PREMIUM',
        price: 'Rp1.499K',
        subtitle: 'Complete personal portfolio experience',
        badge: 'MOST COMPLETE',
        features: [
          'Includes everything in Pro, plus:',
          'Up to 10 sections',
          'Fully custom design',
          'Advanced interactions',
          'Premium animations',
          'Advanced project presentation',
          'Custom domain (.com or .id)',
          'Domain option: .com or .id',
          'Hosting setup',
          'Google indexing setup',
          'Basic SEO optimization',
          'Performance optimization',
          'Open Graph setup',
          '5× revisions',
          '30 days minor support',
        ],
        ctaText: 'Choose Premium →',
        disclaimerNote: 'Domain & hosting included for the first year. Renewal fees apply afterward.',
      },
    ],
    comparisonFeatures: [
      { name: 'Pages', starter: '1 Page', pro: '1 Page', premium: '1 Page' },
      { name: 'Sections', starter: 'Up to 4', pro: 'Up to 7', premium: 'Up to 10' },
      { name: 'Custom UI/UX', starter: true, pro: true, premium: true },
      { name: 'Basic Animation', starter: true, pro: true, premium: true },
      { name: 'Advanced Animation', starter: false, pro: true, premium: true },
      { name: 'Basic SEO', starter: false, pro: true, premium: true },
      { name: 'Custom Domain (.com / .id)', starter: false, pro: false, premium: true },
      { name: 'Hosting Setup', starter: false, pro: false, premium: true },
      { name: 'Google Indexing', starter: false, pro: false, premium: true },
      { name: 'Revisions', starter: '2×', pro: '3×', premium: '5×' },
      { name: 'Minor Support', starter: '7 days', pro: '14 days', premium: '30 days' },
    ],
  },

  business: {
    slug: 'business',
    number: '02',
    title: 'Business Websites',
    categoryName: 'Business',
    eyebrow: '02 — BUSINESS',
    heroHeadline: 'Business Websites',
    heroDescription:
      'Modern, high-credibility websites engineered for businesses, services, brands and organizations.',
    startingPrice: 'Rp799K',
    maxPrice: 'Rp2.499K',
    hasPackages: true,
    packages: [
      {
        id: 'starter',
        name: 'STARTER',
        price: 'Rp799K',
        subtitle: 'A professional online presence',
        description: 'Clean digital storefront to represent your brand and establish legitimacy.',
        features: [
          '1-page website',
          'Up to 5 sections',
          'About',
          'Services',
          'Contact',
          'WhatsApp',
          'Social media',
          'Google Maps',
          'Responsive design',
          'Basic animation',
          'Deployment',
          '2× revisions',
        ],
        notIncluded: ['Domain & hosting not included.'],
        ctaText: 'Choose Starter →',
        disclaimerNote: 'Domain & hosting not included.',
      },
      {
        id: 'pro',
        name: 'PRO',
        price: 'Rp1.499K',
        subtitle: 'For growing businesses',
        description: 'Multi-page architecture designed to build trust and generate inquiries.',
        badge: 'POPULAR',
        features: [
          'Up to 5 pages',
          'Custom UI/UX',
          'Home',
          'About',
          'Services',
          'Gallery',
          'Contact',
          'Google Maps',
          'WhatsApp integration',
          'Social media integration',
          'Contact form',
          'Basic SEO',
          'Modern animations',
          'Performance optimization',
          '3× revisions',
          '14 days minor support',
        ],
        ctaText: 'Choose Pro →',
        disclaimerNote: 'Domain & hosting not included.',
      },
      {
        id: 'premium',
        name: 'PREMIUM',
        price: 'Rp2.499K',
        subtitle: 'Complete business website',
        badge: 'MOST COMPLETE',
        features: [
          'Up to 8 pages',
          'Fully custom UI/UX',
          'Advanced animations',
          'Service / product showcase',
          'Gallery',
          'Contact system',
          'Google Maps',
          'WhatsApp integration',
          'Social media integration',
          'Basic SEO',
          'Performance optimization',
          'Open Graph',
          'Custom domain .com or .id',
          'Hosting setup',
          'Google indexing setup',
          '5× revisions',
          '30 days minor support',
        ],
        ctaText: 'Choose Premium →',
        disclaimerNote: 'Domain & hosting included for the first year. Renewal fees apply afterward.',
      },
    ],
    comparisonFeatures: [
      { name: 'Pages', starter: '1 Page', pro: 'Up to 5 Pages', premium: 'Up to 8 Pages' },
      { name: 'Sections / Layout', starter: 'Up to 5 Sections', pro: 'Custom Architecture', premium: 'Full Custom UX' },
      { name: 'Google Maps Integration', starter: true, pro: true, premium: true },
      { name: 'Contact Form System', starter: false, pro: true, premium: true },
      { name: 'Modern Animations', starter: false, pro: true, premium: true },
      { name: 'Basic SEO Setup', starter: false, pro: true, premium: true },
      { name: 'Custom Domain (.com / .id)', starter: false, pro: false, premium: true },
      { name: 'Hosting Setup', starter: false, pro: false, premium: true },
      { name: 'Google Indexing Setup', starter: false, pro: false, premium: true },
      { name: 'Revisions', starter: '2×', pro: '3×', premium: '5×' },
      { name: 'Minor Support', starter: '7 days', pro: '14 days', premium: '30 days' },
    ],
  },

  wedding: {
    slug: 'wedding',
    number: '03',
    title: 'Wedding Websites',
    categoryName: 'Wedding',
    eyebrow: '03 — WEDDING',
    heroHeadline: 'Wedding Websites',
    heroDescription:
      'Interactive digital wedding invitations designed with elegance and personality.',
    startingPrice: 'Rp499K',
    maxPrice: 'Rp1.499K',
    hasPackages: true,
    packages: [
      {
        id: 'essential',
        name: 'ESSENTIAL',
        price: 'Rp499K',
        subtitle: 'Simple & elegant',
        description: 'Refined single-page digital invitation with ceremony details.',
        features: [
          '1-page website',
          'Couple introduction',
          'Wedding date',
          'Venue',
          'Countdown',
          'Gallery',
          'Google Maps',
          'WhatsApp',
          'Responsive design',
          'Basic animation',
          '2× revisions',
        ],
        ctaText: 'Choose Essential →',
        disclaimerNote: 'Domain & hosting not included.',
      },
      {
        id: 'signature',
        name: 'SIGNATURE',
        price: 'Rp899K',
        subtitle: 'Interactive wedding experience',
        badge: 'POPULAR',
        features: [
          'Includes everything in Essential, plus:',
          'Interactive opening',
          'Music player',
          'RSVP',
          'Wishes',
          'Digital gift',
          'Advanced animations',
          'Gallery lightbox',
          'Wedding timeline',
          'Custom couple story',
          '3× revisions',
          '14 days minor support',
        ],
        ctaText: 'Choose Signature →',
        disclaimerNote: 'Domain & hosting not included.',
      },
      {
        id: 'luxe',
        name: 'LUXE',
        price: 'Rp1.499K',
        subtitle: 'Complete interactive wedding website',
        badge: 'MOST COMPLETE',
        features: [
          'Includes everything in Signature, plus:',
          'Fully custom design',
          'Premium animations',
          'Interactive storytelling',
          'Advanced opening experience',
          'Custom domain .com or .id',
          'Hosting setup',
          'RSVP system',
          'Digital gift',
          'Gallery optimization',
          'Performance optimization',
          '5× revisions',
          '30 days minor support',
        ],
        ctaText: 'Choose Luxe →',
        disclaimerNote: 'Domain & hosting included for the first year. Renewal fees apply afterward.',
      },
    ],
    comparisonFeatures: [
      { name: 'Pages', starter: '1 Page', pro: '1 Page (Interactive)', premium: '1 Page (Bespoke)' },
      { name: 'Countdown & Google Maps', starter: true, pro: true, premium: true },
      { name: 'Interactive Envelope Opening', starter: false, pro: true, premium: true },
      { name: 'Background Music Player', starter: false, pro: true, premium: true },
      { name: 'RSVP & Guest Wishes', starter: false, pro: true, premium: true },
      { name: 'Digital Gift (Bank / QR)', starter: false, pro: true, premium: true },
      { name: 'Custom Domain (.com / .id)', starter: false, pro: false, premium: true },
      { name: 'Hosting Included (1 Year)', starter: false, pro: false, premium: true },
      { name: 'Revisions', starter: '2×', pro: '3×', premium: '5×' },
      { name: 'Support Period', starter: '7 days', pro: '14 days', premium: '30 days' },
    ],
  },

  'landing-page': {
    slug: 'landing-page',
    number: '04',
    title: 'Landing Pages',
    categoryName: 'Landing Page',
    eyebrow: '04 — LANDING PAGE',
    heroHeadline: 'Landing Pages',
    heroDescription:
      'Focused landing pages for products, services, campaigns and events.',
    startingPrice: 'Rp499K',
    maxPrice: 'Rp1.299K',
    hasPackages: true,
    packages: [
      {
        id: 'basic',
        name: 'BASIC',
        price: 'Rp499K',
        subtitle: 'Simple landing page',
        description: 'Single-page campaign format geared towards direct action and outreach.',
        features: [
          '1-page website',
          'Hero section',
          'About / product',
          'Benefits',
          'CTA',
          'WhatsApp',
          'Responsive design',
          'Basic animation',
          '2× revisions',
        ],
        ctaText: 'Choose Basic →',
        disclaimerNote: 'Domain & hosting not included.',
      },
      {
        id: 'pro',
        name: 'PRO',
        price: 'Rp799K',
        subtitle: 'Conversion-focused landing page',
        badge: 'POPULAR',
        features: [
          'Up to 7 sections',
          'Custom UI/UX',
          'Product / service showcase',
          'FAQ',
          'Contact form',
          'WhatsApp',
          'Animation',
          'Basic SEO',
          'Performance optimization',
          '3× revisions',
          '14 days minor support',
        ],
        ctaText: 'Choose Pro →',
        disclaimerNote: 'Domain & hosting not included.',
      },
      {
        id: 'premium',
        name: 'PREMIUM',
        price: 'Rp1.299K',
        subtitle: 'Advanced landing experience',
        badge: 'MOST COMPLETE',
        features: [
          'Fully custom landing page',
          'Advanced animations',
          'Interactive sections',
          'Conversion-focused structure',
          'Form / inquiry system',
          'Basic SEO',
          'Performance optimization',
          'Open Graph',
          'Custom domain .com or .id',
          'Hosting setup',
          '5× revisions',
          '30 days minor support',
        ],
        ctaText: 'Choose Premium →',
        disclaimerNote: 'Domain & hosting included for the first year. Renewal fees apply afterward.',
      },
    ],
    comparisonFeatures: [
      { name: 'Structure', starter: 'Up to 4 Sections', pro: 'Up to 7 Sections', premium: 'Bespoke Conversion UX' },
      { name: 'Custom UI/UX', starter: false, pro: true, premium: true },
      { name: 'FAQ & Showcase Sections', starter: false, pro: true, premium: true },
      { name: 'Lead Capture Form', starter: false, pro: true, premium: true },
      { name: 'Basic SEO & OG Setup', starter: false, pro: true, premium: true },
      { name: 'Custom Domain (.com / .id)', starter: false, pro: false, premium: true },
      { name: 'Hosting Included (1 Year)', starter: false, pro: false, premium: true },
      { name: 'Revisions', starter: '2×', pro: '3×', premium: '5×' },
      { name: 'Post-Launch Support', starter: '7 days', pro: '14 days', premium: '30 days' },
    ],
  },

  custom: {
    slug: 'custom',
    number: '05',
    title: 'Custom Development',
    categoryName: 'Custom',
    eyebrow: '05 — CUSTOM',
    heroHeadline: 'Built around your requirements.',
    heroDescription:
      "We'll create a website around your exact requirements. From interactive web apps to dynamic databases, each project is scoped with bespoke engineering.",
    startingPrice: 'Rp2M+',
    hasPackages: false,
    packages: [],
    comparisonFeatures: [],
    customCapabilities: [
      'E-commerce',
      'Booking system',
      'Login / Register',
      'Database',
      'Admin dashboard',
      'Payment integration',
      'Product management',
      'User management',
      'API integration',
      'Custom web applications',
      'Advanced interactive experiences',
    ],
    customProjects: [
      {
        title: 'E-Commerce & Digital Stores',
        description: 'Complete catalogue, shopping cart, automated payment gateway, and order fulfillment workflows.',
      },
      {
        title: 'Booking & Reservation Systems',
        description: 'Real-time calendar slot availability, client confirmation notifications, and automated booking management.',
      },
      {
        title: 'Portals with Auth & Database',
        description: 'Role-based access (admin, client, staff), authenticated dashboard, encrypted data storage, and CRUD pipelines.',
      },
      {
        title: 'Interactive Web Applications & APIs',
        description: 'Custom React interfaces, third-party API synchronizations, bespoke tools, and scalable cloud hosting.',
      },
    ],
  },
};
