import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  ArrowRight,
  Instagram,
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { WebsiteType, BudgetRange, ProjectInquiryData } from '../types';
import {
  getWhatsAppLink,
  WHATSAPP_DISPLAY,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
} from '../data/content';

interface ContactFormProps {
  preselectedPackage?: string;
  preselectedService?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  preselectedPackage,
  preselectedService,
}) => {
  const [formData, setFormData] = useState<ProjectInquiryData>({
    name: '',
    email: '',
    whatsapp: '',
    websiteType: 'Portfolio',
    budget: 'Rp500K – Rp1M',
    projectDetails: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (preselectedPackage) {
      const pkgLower = preselectedPackage.toLowerCase();
      if (pkgLower.includes('wedding') || pkgLower.includes('essential') || pkgLower.includes('signature') || pkgLower.includes('luxe')) {
        setFormData((prev) => ({
          ...prev,
          websiteType: 'Wedding',
          projectDetails: `Saya tertarik dengan paket ${preselectedPackage}.`,
        }));
      } else if (pkgLower.includes('starter') || pkgLower.includes('basic')) {
        setFormData((prev) => ({
          ...prev,
          budget: 'Under Rp500K',
          projectDetails: `Saya tertarik dengan paket ${preselectedPackage}.`,
        }));
      } else if (pkgLower.includes('pro') || pkgLower.includes('standard')) {
        setFormData((prev) => ({
          ...prev,
          budget: 'Rp500K – Rp1M',
          projectDetails: `Saya tertarik dengan paket ${preselectedPackage}.`,
        }));
      } else if (pkgLower.includes('premium') || pkgLower.includes('professional')) {
        setFormData((prev) => ({
          ...prev,
          budget: 'Rp1M – Rp2M',
          projectDetails: `Saya tertarik dengan paket ${preselectedPackage}.`,
        }));
      } else if (pkgLower.includes('custom')) {
        setFormData((prev) => ({
          ...prev,
          budget: 'Rp2M+',
          websiteType: 'Custom',
          projectDetails: `Saya ingin berkonsultasi mengenai proyek Custom Website (Rp2M+).`,
        }));
      }
    } else if (preselectedService) {
      const match = [
        'Portfolio',
        'Business',
        'Wedding',
        'Landing Page',
        'E-Commerce',
        'Custom',
      ].find((type) => preselectedService.toLowerCase().includes(type.toLowerCase())) as
        | WebsiteType
        | undefined;

      if (match) {
        setFormData((prev) => ({
          ...prev,
          websiteType: match,
          projectDetails: `Saya tertarik untuk mengetahui lebih lanjut tentang layanan website ${preselectedService}.`,
        }));
      }
    }
  }, [preselectedPackage, preselectedService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate instant secure processing
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 450);
  };

  const formattedWhatsAppMessage = `*New Project Inquiry - 799Hi*
Name: ${formData.name}
Email: ${formData.email}
WhatsApp: ${formData.whatsapp}
Website Type: ${formData.websiteType}
Budget: ${formData.budget}
Details: ${formData.projectDetails}`;

  return (
    <section id="contact" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Studio Contact & Trust Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#9B1C22] dark:text-[#B83240]">
                  MULAI KONSULTASI
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-normal tracking-tight text-[#F7F7F5] light:text-[#171717] mb-6 leading-[1.15]">
                Mari bangun website yang membanggakan.
              </h2>
              <p className="text-base text-[#8E8D89] light:text-[#737373] leading-relaxed mb-8">
                Ceritakan proyek Anda dan kami akan membantu mewujudkan ide Anda menjadi website yang bersih, profesional, dan modern. Kami merespons cepat pada jam kerja.
              </p>

              {/* Direct channels */}
              <div className="space-y-4 mb-8">
                <a
                  href={getWhatsAppLink("Hi 799Hi! Saya ingin berkonsultasi mengenai pembuatan website.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-[#141413] light:bg-[#FFFFFF] border border-[#282825] light:border-[#E3E0D8] hover:border-[#9B1C22]/50 transition-colors flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#1F1F1D] light:bg-[#EFEDE8] flex items-center justify-center text-[#9B1C22] group-hover:scale-105 transition-transform">
                    <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#8E8D89] light:text-[#737373] block">
                      Chat WhatsApp Langsung
                    </span>
                    <span className="text-sm font-semibold text-[#F7F7F5] light:text-[#171717]">
                      {WHATSAPP_DISPLAY}
                    </span>
                  </div>
                </a>

                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-[#141413] light:bg-[#FFFFFF] border border-[#282825] light:border-[#E3E0D8] hover:border-[#9B1C22]/50 transition-colors flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#1F1F1D] light:bg-[#EFEDE8] flex items-center justify-center text-[#9B1C22] dark:text-[#B83240] group-hover:scale-105 transition-transform">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#8E8D89] light:text-[#737373] block">
                      Instagram Studio
                    </span>
                    <span className="text-sm font-semibold text-[#F7F7F5] light:text-[#171717]">
                      {INSTAGRAM_HANDLE}
                    </span>
                  </div>
                </a>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#121211] light:bg-[#F7F7F5] border border-[#242421] light:border-[#E3E0D8] text-xs text-[#8E8D89] light:text-[#737373]">
              <span className="font-semibold text-[#F7F7F5] light:text-[#171717] block mb-1">
                Jadwal Pengerjaan Cepat
              </span>
              Website 1 halaman standar umumnya selesai dalam 3–5 hari kerja setelah materi konten diterima lengkap.
            </div>
          </motion.div>

          {/* Right Column: Project Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="p-7 sm:p-10 rounded-3xl bg-[#141413] light:bg-[#FFFFFF] border border-[#282825] light:border-[#E3E0D8] shadow-2xl">
              {submitted ? (
                <div className="py-8 text-center space-y-5">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-editorial font-normal text-[#F7F7F5] light:text-[#171717]">
                    Permintaan Terkirim!
                  </h3>

                  <p className="text-sm text-[#8E8D89] light:text-[#737373] max-w-md mx-auto leading-relaxed">
                    Terima kasih, {formData.name}. Kami telah menerima detail proyek Anda.
                    Untuk respon tercepat, klik di bawah untuk meneruskan pesan ini langsung ke WhatsApp kami.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={getWhatsAppLink(formattedWhatsAppMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#20BE5B] transition-colors flex items-center justify-center gap-2 shadow-lg"
                    >
                      <WhatsAppIcon className="w-4 h-4 fill-current" />
                      <span>Lanjutkan ke WhatsApp</span>
                    </a>

                    <button
                      onClick={() => setSubmitted(false)}
                      className="w-full sm:w-auto px-5 py-3 rounded-full border border-[#282825] light:border-[#E3E0D8] text-xs text-[#8E8D89] hover:text-[#F7F7F5] light:text-[#737373] light:hover:text-[#171717] transition-colors"
                    >
                      Ubah Data
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-medium text-[#8E8D89] light:text-[#737373] mb-1.5">
                        Nama Lengkap *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="cth. Amanda Putri"
                        className="w-full px-4 py-3 rounded-xl bg-[#1A1A18] light:bg-[#F7F7F5] border border-[#282825] light:border-[#E3E0D8] text-sm text-[#F7F7F5] light:text-[#171717] focus:border-[#9B1C22] focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-medium text-[#8E8D89] light:text-[#737373] mb-1.5">
                        Alamat Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="amanda@perusahaan.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#1A1A18] light:bg-[#F7F7F5] border border-[#282825] light:border-[#E3E0D8] text-sm text-[#F7F7F5] light:text-[#171717] focus:border-[#9B1C22] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* WhatsApp Number */}
                  <div>
                    <label className="block text-xs font-medium text-[#8E8D89] light:text-[#737373] mb-1.5">
                      Nomor WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.whatsapp}
                      onChange={(e) =>
                        setFormData({ ...formData, whatsapp: e.target.value })
                      }
                      placeholder="cth. 08123456789 atau +62..."
                      className="w-full px-4 py-3 rounded-xl bg-[#1A1A18] light:bg-[#F7F7F5] border border-[#282825] light:border-[#E3E0D8] text-sm text-[#F7F7F5] light:text-[#171717] focus:border-[#9B1C22] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Website Type Dropdown */}
                    <div>
                      <label className="block text-xs font-medium text-[#8E8D89] light:text-[#737373] mb-1.5">
                        Tipe Website
                      </label>
                      <select
                        value={formData.websiteType}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            websiteType: e.target.value as WebsiteType,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-[#1A1A18] light:bg-[#F7F7F5] border border-[#282825] light:border-[#E3E0D8] text-sm text-[#F7F7F5] light:text-[#171717] focus:border-[#9B1C22] focus:outline-none transition-colors"
                      >
                        <option value="Portfolio">Portfolio</option>
                        <option value="Business">Business</option>
                        <option value="Wedding">Wedding</option>
                        <option value="Landing Page">Landing Page</option>
                        <option value="E-Commerce">E-Commerce</option>
                        <option value="Custom">Custom</option>
                      </select>
                    </div>

                    {/* Budget Dropdown */}
                    <div>
                      <label className="block text-xs font-medium text-[#8E8D89] light:text-[#737373] mb-1.5">
                        Estimasi Anggaran
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            budget: e.target.value as BudgetRange,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-[#1A1A18] light:bg-[#F7F7F5] border border-[#282825] light:border-[#E3E0D8] text-sm text-[#F7F7F5] light:text-[#171717] focus:border-[#9B1C22] focus:outline-none transition-colors"
                      >
                        <option value="Under Rp500K">Di Bawah Rp500K</option>
                        <option value="Rp500K – Rp1M">Rp500K – Rp1M</option>
                        <option value="Rp1M – Rp2M">Rp1M – Rp2M</option>
                        <option value="Rp2M+">Rp2M+</option>
                        <option value="Not sure yet">Belum Pasti</option>
                      </select>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label className="block text-xs font-medium text-[#8E8D89] light:text-[#737373] mb-1.5">
                      Detail & Tujuan Proyek *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.projectDetails}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          projectDetails: e.target.value,
                        })
                      }
                      placeholder="Jelaskan kebutuhan website Anda (jumlah section, referensi desain, target tanggal peluncuran)..."
                      className="w-full px-4 py-3 rounded-xl bg-[#1A1A18] light:bg-[#F7F7F5] border border-[#282825] light:border-[#E3E0D8] text-sm text-[#F7F7F5] light:text-[#171717] focus:border-[#9B1C22] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-full bg-[#F7F7F5] light:bg-[#171717] text-[#0F0F0E] light:text-[#F7F7F5] font-semibold text-xs uppercase tracking-wider hover:bg-white light:hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-60 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Memproses Permintaan...</span>
                      ) : (
                        <>
                          <span>Kirim Permintaan Proyek</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#9B1C22]" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
