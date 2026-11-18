import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Instagram } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import {
  WHATSAPP_DISPLAY,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  getWhatsAppLink,
} from '../data/content';
import { Logo799Hi } from './Logo799Hi';

const fadeUp: any = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as any },
  }),
};

export const Footer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { label: 'Beranda', href: '#home' },
    { label: 'Layanan', href: '#services' },
    { label: 'Karya', href: '#work' },
    { label: 'Harga', href: '#pricing' },
    { label: 'Cara Kerja', href: '#process' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Kontak', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    if (location.pathname !== '/') {
      navigate('/' + href);
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B0B0A] light:bg-[#EAE8E2] text-[#8E8D89] light:text-[#737373] py-16 sm:py-20 border-t border-[#1F1F1D] light:border-[#DCD8D0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-14 border-b border-[#1F1F1D] light:border-[#DCD8D0]">
          {/* Brand info */}
          <motion.div
            className="md:col-span-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0}
            variants={fadeUp}
          >
            <Link
              to="/"
              aria-label="799Hi Creatives"
              className="inline-flex items-center mb-4 group"
            >
              <div className="w-24 h-10 flex items-center justify-center transition-transform group-hover:scale-105">
                <Logo799Hi className="w-full h-full" color="#E01010" />
              </div>
            </Link>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#F20D0D] mb-3 font-medium">
              799HI CREATIVES STUDIO
            </p>
            <p className="text-xs sm:text-sm text-[#8E8D89] light:text-[#666666] max-w-sm leading-relaxed mb-4">
              Jasa pembuatan website portofolio personal, undangan pernikahan digital, katalog kuliner, profil perusahaan, toko online, hingga aplikasi web kustom.
            </p>
          </motion.div>

          {/* Quick Nav Links */}
          <motion.div
            className="md:col-span-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0.1}
            variants={fadeUp}
          >
            <span className="text-xs font-mono uppercase tracking-wider text-[#F7F7F5] light:text-[#171717] block mb-4 font-semibold">
              Navigasi
            </span>
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="hover:text-[#F20D0D] light:hover:text-[#F20D0D] transition-colors py-1 inline-flex items-center gap-1.5"
                >
                  <span className="w-1 h-1 rounded-full bg-[#F20D0D]/40" />
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Social & Contact */}
          <motion.div
            className="md:col-span-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0.2}
            variants={fadeUp}
          >
            <span className="text-xs font-mono uppercase tracking-wider text-[#F7F7F5] light:text-[#171717] block mb-4 font-semibold">
              Hubungi Kami
            </span>
            <div className="space-y-3 text-xs">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#F7F7F5] light:hover:text-[#171717] transition-colors group"
              >
                <Instagram className="w-4 h-4 text-[#F20D0D] shrink-0" />
                <span>Instagram: {INSTAGRAM_HANDLE}</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>

              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#F7F7F5] light:hover:text-[#171717] transition-colors group"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>WhatsApp: {WHATSAPP_DISPLAY}</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>

              <div className="pt-2 text-[11px] text-[#6E6E6A]">
                Jam Operasional: Senin s/d Sabtu (09.00 - 18.00 WIB)
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 799Hi Creatives. Hak cipta dilindungi.</p>
          <div className="flex items-center gap-6">
            <span>Bandung, Indonesia</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
