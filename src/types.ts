export type WebsiteType =
  | 'Portfolio'
  | 'Business'
  | 'Wedding'
  | 'Landing Page'
  | 'E-Commerce'
  | 'Custom';

export type BudgetRange =
  | 'Under Rp500K'
  | 'Rp500K – Rp1M'
  | 'Rp1M – Rp2M'
  | 'Rp2M+'
  | 'Not sure yet';

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  idealFor: string[];
  deliverables: string[];
  typicalTimeline: string;
  startingPrice: string;
}

export interface PricingPackage {
  id: string;
  name: string;
  price: string;
  rawPrice: string;
  target: string;
  isPopular?: boolean;
  features: string[];
  ctaText: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  details: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ProjectInquiryData {
  name: string;
  email: string;
  whatsapp: string;
  websiteType: WebsiteType;
  budget: BudgetRange;
  projectDetails: string;
}
