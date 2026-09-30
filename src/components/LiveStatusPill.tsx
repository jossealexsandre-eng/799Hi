/**
 * LiveStatusPill — floating availability badge dengan pulsing dot
 * Rotates antara beberapa pesan urgensi untuk membangun FOMO
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getWhatsAppLink } from '../data/content';

const MESSAGES = [
  { icon: '🟢', text: 'Slot Proyek Terbuka — Mulai Minggu Ini', color: '#22c55e' },
  { icon: '⚡', text: 'Respon WhatsApp < 15 Menit', color: '#f59e0b' },
  { icon: '🎯', text: 'Konsultasi Gratis — Tanpa Komitmen', color: '#B83240' },
  { icon: '🟢', text: '2 Slot Tersisa Bulan Ini', color: '#22c55e' },
];

const ROTATE_INTERVAL = 4500; // ms per message

export const LiveStatusPill: React.FC = () => {
  const [msgIdx, setMsgIdx] = useState(0);
  const [visible, setVisible] = useState(false);

  // Appear after 3s delay (not immediately)
  useEffect(() => {
    const show = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(show);
  }, []);

  // Rotate messages
  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setMsgIdx((prev) => (prev + 1) % MESSAGES.length);
    }, ROTATE_INTERVAL);
    return () => clearInterval(interval);
  }, [visible]);

  const msg = MESSAGES[msgIdx];

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={getWhatsAppLink("Hi 799Hi! Saya tertarik untuk memulai proyek website.")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Hubungi 799Hi di WhatsApp"
          initial={{ opacity: 0, y: 20, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.92 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="fixed bottom-[5.5rem] right-6 z-40 cursor-pointer"
        >
          <div
            className="
              flex items-center gap-2 px-3.5 py-2 rounded-full
              bg-[#141413]/90 dark:bg-[#0F0F0E]/90
              border border-[#282825] dark:border-[#282825]
              light:bg-white/90 light:border-[#E3E0D8]
              backdrop-blur-md shadow-lg shadow-black/20
              transition-colors duration-300
            "
          >
            {/* Pulsing live dot */}
            <span className="relative flex h-2 w-2 shrink-0">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-70"
                style={{ backgroundColor: msg.color }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ backgroundColor: msg.color }}
              />
            </span>

            {/* Rotating text */}
            <div className="overflow-hidden relative h-4 min-w-[180px] max-w-[240px]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={msgIdx}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="
                    absolute inset-0 flex items-center
                    text-[10.5px] font-semibold tracking-wide
                    text-[#F7F7F5] dark:text-[#F7F7F5] light:text-[#171717]
                    whitespace-nowrap
                  "
                >
                  <span className="mr-1">{msg.icon}</span>
                  {msg.text}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </motion.a>
      )}
    </AnimatePresence>
  );
};
