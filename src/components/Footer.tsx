import React from 'react';
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

/** Shared animation variants */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

export const Footer: React.FC = () => {
  const links = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#work' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Process', href: '#process' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B0B0A] light:bg-[#EAE8E2] text-[#8E8D89] light:text-[#737373] py-16 sm:py-20 border-t border-[#1F1F1D] light:border-[#DCD8D0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-[#1F1F1D] light:border-[#DCD8D0]">

          {/* Brand info */}
          <motion.div
            className="md:col-span-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0}
            variants={fadeUp}
          >
            <a
              href="#home"
              aria-label="799Hi Home"
              className="inline-flex items-center mb-4 group"
            >
              <div className="w-24 h-10 flex items-center justify-center transition-transform group-hover:scale-105">
                <Logo799Hi className="w-full h-full" color="#E01010" />
              </div>
            </a>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#9B1C22] dark:text-[#B83240] mb-3">
              WEBSITE DESIGN &amp; DEVELOPMENT
            </p>
            <p className="text-sm text-[#8E8D89] light:text-[#737373] max-w-sm leading-relaxed mb-6">
              Clean, modern and responsive websites designed to help you look
              professional, build trust, and grow online.
            </p>
            <p className="text-xs font-serif italic text-[#8E8D89] light:text-[#737373]">
              Clean websites. Thoughtfully made.
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
            <span className="text-xs font-mono uppercase tracking-wider text-[#F7F7F5] light:text-[#171717] block mb-4">
              Navigation
            </span>
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              {links.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.04 }}
                  whileHover={{ x: 4, color: '#F7F7F5' }}
                  className="hover:text-[#F7F7F5] light:hover:text-[#171717] transition-colors py-1 inline-flex items-center gap-1 group"
                >
                  <span
                    className="w-0 h-[1px] bg-[#9B1C22] group-hover:w-3 transition-all duration-300"
                    aria-hidden="true"
                  />
                  {link.label}
                </motion.a>
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
            <span className="text-xs font-mono uppercase tracking-wider text-[#F7F7F5] light:text-[#171717] block mb-4">
              Connect
            </span>
            <div className="space-y-3 text-xs">
              <motion.a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 3 }}
                className="flex items-center gap-2 hover:text-[#F7F7F5] light:hover:text-[#171717] transition-colors group"
              >
                <Instagram className="w-4 h-4 text-[#9B1C22] dark:text-[#B83240] group-hover:scale-110 transition-transform" />
                <span>Instagram: {INSTAGRAM_HANDLE}</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>

              <motion.a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 3 }}
                className="flex items-center gap-2 hover:text-[#F7F7F5] light:hover:text-[#171717] transition-colors group"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366] group-hover:scale-110 transition-transform" />
                <span>WhatsApp: {WHATSAPP_DISPLAY}</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>

              <div className="pt-2 text-[11px] text-[#6E6E6A]">
                Operational: Monday – Saturday (09:00 – 18:00 WIB)
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom copyright row */}
        <motion.div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p>© 2026 799Hi. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Independent Digital Design &amp; Code</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
