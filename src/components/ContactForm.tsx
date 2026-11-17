import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  ArrowRight,
  Instagram,
  MessageCircle,
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { WebsiteType, BudgetRange, ProjectInquiryData } from '../types';
import {
  WHATSAPP_DISPLAY,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
} from '../data/content';
import { WHATSAPP_PHONE } from '../data/servicePricing';

interface ContactFormProps {
  preselectedPackage?: string;
  preselectedService?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  preselectedPackage,
  preselectedService,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    websiteType: 'Personal Portfolio',
    packageTier: 'Standard',
    budget: 'Rp500K – Rp1M',
    projectDetails: '',
    addOns: '',
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedPackage) {
      const pkgLower = preselectedPackage.toLowerCase();
      if (pkgLower.includes('starter') || pkgLower.includes('basic') || pkgLower.includes('sweet') || pkgLower.includes('presence')) {
        setFormData((prev) => ({
          ...prev,
          packageTier: 'Basic',
          projectDetails: `Saya tertarik dengan paket ${preselectedPackage}.`,
        }));
      } else if (pkgLower.includes('pro') || pkgLower.includes('standard') || pkgLower.includes('romantic') || pkgLower.includes('menu') || pkgLower.includes('smart')) {
        setFormData((prev) => ({
          ...prev,
          packageTier: 'Standard',
          projectDetails: `Saya tertarik dengan paket ${preselectedPackage}.`,
        }));
      } else if (pkgLower.includes('premium') || pkgLower.includes('signature') || pkgLower.includes('exclusive') || pkgLower.includes('store') || pkgLower.includes('experience')) {
        setFormData((prev) => ({
          ...prev,
          packageTier: 'Premium',
          projectDetails: `Saya tertarik dengan paket ${preselectedPackage}.`,
        }));
      } else if (pkgLower.includes('custom')) {
        setFormData((prev) => ({
          ...prev,
          websiteType: 'Custom Website',
          packageTier: 'Custom',
          projectDetails: `Saya ingin berkonsultasi mengenai proyek Custom Website.`,
        }));
      }
    }

    if (preselectedService) {
      const match = [
        'Personal Portfolio',
        'Wedding Invitation',
        'Cafe & Restaurant',
        'Company Profile',
        'Business Store',
        'Custom Website',
      ].find((type) => preselectedService.toLowerCase().includes(type.toLowerCase().split(' ')[0]));

      if (match) {
        setFormData((prev) => ({
          ...prev,
          websiteType: match,
        }));
      }
    }
  }, [preselectedPackage, preselectedService]);

  const generateWhatsAppMessage = () => {
    return [
      'Halo 799Hi Creatives! Saya tertarik membuat website.',
      '',
      `Layanan: ${formData.websiteType}`,
      `Paket: ${formData.packageTier}`,
      `Harga Paket: Sesuai ${formData.packageTier} (${formData.budget})`,
      `Fitur Tambahan: ${formData.addOns && formData.addOns.trim() ? formData.addOns.trim() : 'Tidak ada (Paket standar)'}`,
      `Estimasi Total: ${formData.budget}`,
      `Kebutuhan: ${formData.projectDetails.trim()}`,
      '',
      `Nama: ${formData.name}`,
      `WhatsApp: ${formData.whatsapp}`,
      formData.email ? `Email: ${formData.email}` : '',
      '',
      'Saya ingin konsultasi lebih lanjut. Terima kasih.',
    ]
      .filter(Boolean)
      .join('\n');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = generateWhatsAppMessage();
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
    setSubmitted(true);
    // Direct functional WhatsApp handoff
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleDirectWhatsApp = () => {
    const message = [
      'Halo 799Hi Creatives! Saya tertarik membuat website.',
      '',
      'Saya ingin konsultasi langsung mengenai layanan dan estimasi biaya website.',
      '',
      'Terima kasih.',
    ].join('\n');
    window.open(
      `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

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
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#F20D0D]">
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
                <button
                  onClick={handleDirectWhatsApp}
                  className="w-full text-left p-4 rounded-2xl bg-[#141413] light:bg-[#FFFFFF] border border-[#282825] light:border-[#E3E0D8] hover:border-[#F20D0D]/50 transition-colors flex items-center gap-4 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#1F1F1D] light:bg-[#EFEDE8] flex items-center justify-center text-[#25D366] group-hover:scale-105 transition-transform">
                    <WhatsAppIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#8E8D89] light:text-[#737373] block">
                      Chat WhatsApp Langsung
                    </span>
                    <span className="text-sm font-semibold text-[#F7F7F5] light:text-[#171717]">
                      {WHATSAPP_DISPLAY}
                    </span>
                  </div>
                </button>

                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-[#141413] light:bg-[#FFFFFF] border border-[#282825] light:border-[#E3E0D8] hover:border-[#F20D0D]/50 transition-colors flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#1F1F1D] light:bg-[#EFEDE8] flex items-center justify-center text-[#F20D0D] group-hover:scale-105 transition-transform">
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
                Jadwal Pengerjaan Cepat &amp; Terarah
              </span>
              Website standar umumnya selesai dalam 3–7 hari kerja setelah materi konten diterima lengkap.
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
                    Permintaan Siap Dikirim!
                  </h3>

                  <p className="text-sm text-[#8E8D89] light:text-[#737373] max-w-md mx-auto leading-relaxed">
                    Rincian pesanan Anda telah diformat. Klik tombol di bawah ini untuk membuka WhatsApp dan memulai konsultasi langsung dengan tim 799Hi Creatives.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={() => {
                        const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(generateWhatsAppMessage())}`;
                        window.open(url, '_blank', 'noopener,noreferrer');
                      }}
                      className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#20BE5B] transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                    >
                      <WhatsAppIcon className="w-4 h-4 fill-current" />
                      <span>Buka Chat WhatsApp</span>
                    </button>

                    <button
                      onClick={() => setSubmitted(false)}
                      className="w-full sm:w-auto px-5 py-3 rounded-full border border-[#282825] light:border-[#E3E0D8] text-xs text-[#8E8D89] hover:text-[#F7F7F5] light:text-[#737373] light:hover:text-[#171717] transition-colors cursor-pointer"
                    >
                      Ubah Data
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
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
                        className="w-full px-4 py-3 rounded-xl bg-[#1A1A18] light:bg-[#F7F7F5] border border-[#282825] light:border-[#E3E0D8] text-sm text-[#F7F7F5] light:text-[#171717] focus:border-[#F20D0D] focus:outline-none transition-colors"
                      />
                    </div>

                    {/* WhatsApp */}
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
                        placeholder="cth. 08123456789"
                        className="w-full px-4 py-3 rounded-xl bg-[#1A1A18] light:bg-[#F7F7F5] border border-[#282825] light:border-[#E3E0D8] text-sm text-[#F7F7F5] light:text-[#171717] focus:border-[#F20D0D] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email (Optional) */}
                  <div>
                    <label className="block text-xs font-medium text-[#8E8D89] light:text-[#737373] mb-1.5">
                      Alamat Email (Opsional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="amanda@perusahaan.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#1A1A18] light:bg-[#F7F7F5] border border-[#282825] light:border-[#E3E0D8] text-sm text-[#F7F7F5] light:text-[#171717] focus:border-[#F20D0D] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Website Type Dropdown */}
                    <div>
                      <label className="block text-xs font-medium text-[#8E8D89] light:text-[#737373] mb-1.5">
                        Kategori Layanan *
                      </label>
                      <select
                        value={formData.websiteType}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            websiteType: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-[#1A1A18] light:bg-[#F7F7F5] border border-[#282825] light:border-[#E3E0D8] text-sm text-[#F7F7F5] light:text-[#171717] focus:border-[#F20D0D] focus:outline-none transition-colors"
                      >
                        <option value="Personal Portfolio">Personal Portfolio (Mulai Rp549.000)</option>
                        <option value="Wedding Invitation">Wedding Invitation (Mulai Rp199.000)</option>
                        <option value="Cafe & Restaurant">Cafe &amp; Restaurant (Mulai Rp899.000)</option>
                        <option value="Company Profile">Company Profile (Mulai Rp1.499.000)</option>
                        <option value="Business Store">Business Store (Mulai Rp1.299.000)</option>
                        <option value="Custom Website">Custom Website (Mulai Rp4.499.000)</option>
                      </select>
                    </div>

                    {/* Package Tier Dropdown */}
                    <div>
                      <label className="block text-xs font-medium text-[#8E8D89] light:text-[#737373] mb-1.5">
                        Tingkatan Paket
                      </label>
                      <select
                        value={formData.packageTier}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            packageTier: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-[#1A1A18] light:bg-[#F7F7F5] border border-[#282825] light:border-[#E3E0D8] text-sm text-[#F7F7F5] light:text-[#171717] focus:border-[#F20D0D] focus:outline-none transition-colors"
                      >
                        <option value="Basic">Basic (Ekonomis &amp; Fungsional)</option>
                        <option value="Standard">Standard (Rekomendasi / Semi-Custom)</option>
                        <option value="Premium">Premium (Eksklusif &amp; Domain Gratis)</option>
                        <option value="Custom">Custom / Belum Tentu (Konsultasi Dulu)</option>
                      </select>
                    </div>
                  </div>

                  {/* Add-ons Field */}
                  <div>
                    <label className="block text-xs font-medium text-[#8E8D89] light:text-[#737373] mb-1.5">
                      Fitur Tambahan (Add-ons) yang Diinginkan
                    </label>
                    <input
                      type="text"
                      value={formData.addOns}
                      onChange={(e) =>
                        setFormData({ ...formData, addOns: e.target.value })
                      }
                      placeholder="cth. Dark Mode, Multi-bahasa ID/EN, Tambah 5 Foto..."
                      className="w-full px-4 py-3 rounded-xl bg-[#1A1A18] light:bg-[#F7F7F5] border border-[#282825] light:border-[#E3E0D8] text-sm text-[#F7F7F5] light:text-[#171717] focus:border-[#F20D0D] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Project Details */}
                  <div>
                    <label className="block text-xs font-medium text-[#8E8D89] light:text-[#737373] mb-1.5">
                      Kebutuhan &amp; Tujuan Website *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.projectDetails}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          projectDetails: e.target.value,
                        })
                      }
                      placeholder="Jelaskan kebutuhan website Anda (referensi desain, fungsi utama, target tanggal peluncuran)..."
                      className="w-full px-4 py-3 rounded-xl bg-[#1A1A18] light:bg-[#F7F7F5] border border-[#282825] light:border-[#E3E0D8] text-sm text-[#F7F7F5] light:text-[#171717] focus:border-[#F20D0D] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full py-4 rounded-full bg-[#F20D0D] hover:bg-[#d40b0b] text-white font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Konsultasikan via WhatsApp</span>
                      <ArrowRight className="w-3.5 h-3.5" />
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
