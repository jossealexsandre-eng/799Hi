import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

interface TestimonialProps {
  onStartProject: () => void;
}

export const TestimonialPlaceholder: React.FC<TestimonialProps> = ({
  onStartProject,
}) => {
  return (
    <section className="py-20 sm:py-28 bg-[#121211]/60 light:bg-[#F2EFE9]/60 border-y border-[#242421] light:border-[#E3E0D8] relative">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="p-8 sm:p-12 rounded-3xl bg-[#151514] light:bg-[#FFFFFF] border border-[#282825] light:border-[#E3E0D8] shadow-xl"
        >
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#B89B72] block mb-3">
            EARLY COMMISSIONS & CLIENT REVIEWS
          </span>

          <h3 className="text-2xl sm:text-4xl font-editorial font-normal text-[#F7F7F5] light:text-[#171717] mb-3">
            Your project could be featured here.
          </h3>

          <p className="text-sm text-[#8E8D89] light:text-[#737373] max-w-md mx-auto mb-8 leading-relaxed">
            We're currently building our portfolio with selected projects. Work
            directly with our principal designer with dedicated attention and
            transparent rates.
          </p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onStartProject}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#F7F7F5] light:bg-[#171717] text-[#0F0F0E] light:text-[#F7F7F5] text-xs font-semibold uppercase tracking-wider hover:bg-white light:hover:bg-black transition-colors shadow-sm group"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#B89B72] group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
