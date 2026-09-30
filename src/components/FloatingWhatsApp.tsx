import React from 'react';
import { motion } from 'framer-motion';
import { getWhatsAppLink } from '../data/content';
import { Magnetic } from './Magnetic';
import { WhatsAppIcon } from './WhatsAppIcon';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <Magnetic strength={0.4} threshold={95}>
        <motion.a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact 799Hi on WhatsApp"
          data-cursor-label="Chat WA 💬"
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.6,
            delay: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="btn-pulse p-3.5 rounded-full bg-[#25D366] text-white shadow-xl hover:bg-[#20BE5B] transition-colors flex items-center justify-center group focus:outline-none cursor-pointer"
        >
          <WhatsAppIcon className="w-5 h-5 fill-current" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 text-xs font-semibold tracking-wide transition-all duration-300">
            WhatsApp
          </span>
        </motion.a>
      </Magnetic>
    </div>
  );
};
