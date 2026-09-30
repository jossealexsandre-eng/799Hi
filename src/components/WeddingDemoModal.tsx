import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Heart,
  Calendar,
  MapPin,
  Gift,
  Copy,
  Check,
  Send,
  Volume2,
  VolumeX,
  ChevronRight,
} from 'lucide-react';

interface WeddingDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInquireWedding: () => void;
}

export const WeddingDemoModal: React.FC<WeddingDemoModalProps> = ({
  isOpen,
  onClose,
  onInquireWedding,
}) => {
  const [openedEnvelope, setOpenedEnvelope] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [copiedBank, setCopiedBank] = useState<string | null>(null);

  // RSVP Form State
  const [guestName, setGuestName] = useState('');
  const [guestAttendance, setGuestAttendance] = useState<'attending' | 'unable'>('attending');
  const [guestCount, setGuestCount] = useState('2');
  const [guestWish, setGuestWish] = useState('');
  const [wishes, setWishes] = useState([
    {
      name: 'Michael & Sarah',
      wish: 'Wishing you both a lifetime of unconditional love, joy, and blessed adventures together!',
      time: '2 hours ago',
    },
    {
      name: 'Jessica Tan',
      wish: 'So thrilled for you Julian & Katherine! May your love story grow sweeter with every year.',
      time: 'Yesterday',
    },
  ]);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  // Countdown timer simulation
  const [timeLeft, setTimeLeft] = useState({
    days: 26,
    hours: 14,
    minutes: 38,
    seconds: 45,
  });

  useEffect(() => {
    if (!isOpen) {
      setOpenedEnvelope(false);
      setIsPlayingMusic(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        return { ...prev, seconds: 59, minutes: prev.minutes - 1 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  const handleCopy = (accountNumber: string, bankId: string) => {
    navigator.clipboard.writeText(accountNumber);
    setCopiedBank(bankId);
    setTimeout(() => setCopiedBank(null), 2500);
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    if (guestWish.trim()) {
      setWishes([
        {
          name: guestName,
          wish: guestWish,
          time: 'Just now',
        },
        ...wishes,
      ]);
    }
    setRsvpSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl h-[92vh] max-h-[860px] bg-[#111110] border border-[#2B2B28] rounded-2xl overflow-hidden shadow-2xl flex flex-col z-10"
        >
          {/* Top Bar for Demonstration Mode */}
          <div className="h-12 px-4 bg-[#181816] border-b border-[#282825] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono font-medium text-[#F7F7F5]">
                LIVE PREVIEW : Wedding Website Experience
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlayingMusic(!isPlayingMusic)}
                className="p-1.5 rounded-lg bg-[#242422] text-[#B89B72] hover:bg-[#2F2F2C] text-xs flex items-center gap-1.5 px-2.5"
                title={isPlayingMusic ? 'Mute Music' : 'Play Music'}
              >
                {isPlayingMusic ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="hidden sm:inline text-[11px] text-[#CCCCCC]">
                      Canon in D (Active)
                    </span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-[#8E8D89]" />
                    <span className="hidden sm:inline text-[11px] text-[#8E8D89]">
                      Music Paused
                    </span>
                  </>
                )}
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-[#8E8D89] hover:text-white hover:bg-[#242422] transition-colors"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Interactive Invitation View */}
          <div className="flex-1 overflow-y-auto bg-[#0E0E0D] text-[#F7F7F5] selection:bg-[#B89B72]/30 relative">
            {!openedEnvelope ? (
              /* Envelope Welcome Gate */
              <div className="min-h-full flex flex-col items-center justify-center p-6 text-center relative overflow-hidden bg-gradient-to-b from-[#181816] to-[#0E0E0D]">
                <div className="w-20 h-20 rounded-full bg-[#1C1C1A] border border-[#B89B72]/40 flex items-center justify-center mb-6 shadow-xl relative">
                  <div className="absolute inset-1 rounded-full border border-dashed border-[#B89B72]/30 animate-spin-slow" />
                  <Heart className="w-8 h-8 text-[#B89B72]" />
                </div>

                <span className="text-[11px] uppercase tracking-[0.3em] text-[#B89B72] mb-2 font-mono">
                  THE WEDDING INVITATION
                </span>
                <h2 className="text-3xl sm:text-5xl font-editorial font-normal mb-3 text-[#F7F7F5]">
                  Julian & Katherine
                </h2>
                <p className="text-xs sm:text-sm text-[#8E8D89] max-w-sm mb-8 font-serif italic">
                  Dear Valued Guest, we invite you to celebrate our sacred union.
                </p>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    setOpenedEnvelope(true);
                    setIsPlayingMusic(true);
                  }}
                  className="px-8 py-3.5 rounded-full bg-[#B89B72] text-[#0F0F0E] font-semibold text-xs uppercase tracking-widest hover:bg-[#CBB28B] transition-colors shadow-lg flex items-center gap-2 group"
                >
                  <span>Open Invitation</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            ) : (
              /* Opened Wedding Website Content */
              <div className="max-w-2xl mx-auto px-5 py-12 space-y-16">
                {/* Hero Header */}
                <div className="text-center pt-4">
                  <span className="text-xs uppercase tracking-[0.25em] text-[#B89B72] block mb-2 font-mono">
                    WE ARE GETTING MARRIED
                  </span>
                  <h1 className="text-4xl sm:text-6xl font-editorial font-normal mb-4">
                    Julian & Katherine
                  </h1>
                  <p className="text-sm text-[#8E8D89] font-serif italic max-w-md mx-auto">
                    “And above all these put on love, which binds everything together in perfect harmony.”
                  </p>
                </div>

                {/* Countdown Timer */}
                <div className="p-6 rounded-2xl bg-[#141413] border border-[#282825] text-center">
                  <span className="text-[11px] uppercase tracking-widest text-[#B89B72] block mb-4">
                    COUNTDOWN TO THE BIG DAY
                  </span>
                  <div className="grid grid-cols-4 gap-3 max-w-xs mx-auto">
                    <div className="p-3 rounded-xl bg-[#1A1A18] border border-[#282825]">
                      <span className="block text-2xl font-bold font-mono text-[#F7F7F5]">
                        {timeLeft.days}
                      </span>
                      <span className="text-[10px] text-[#8E8D89] uppercase">Days</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#1A1A18] border border-[#282825]">
                      <span className="block text-2xl font-bold font-mono text-[#F7F7F5]">
                        {timeLeft.hours}
                      </span>
                      <span className="text-[10px] text-[#8E8D89] uppercase">Hours</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#1A1A18] border border-[#282825]">
                      <span className="block text-2xl font-bold font-mono text-[#F7F7F5]">
                        {timeLeft.minutes}
                      </span>
                      <span className="text-[10px] text-[#8E8D89] uppercase">Mins</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#1A1A18] border border-[#282825]">
                      <span className="block text-2xl font-bold font-mono text-[#B89B72]">
                        {timeLeft.seconds}
                      </span>
                      <span className="text-[10px] text-[#8E8D89] uppercase">Secs</span>
                    </div>
                  </div>
                </div>

                {/* Bride & Groom Couple Presentation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
                  <div className="p-6 rounded-2xl bg-[#141413] border border-[#282825] flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-[#20201D] border border-[#B89B72]/30 flex items-center justify-center text-xl font-editorial text-[#B89B72] mb-3">
                      JA
                    </div>
                    <h3 className="text-xl font-editorial font-normal mb-1">
                      Julian Alexander
                    </h3>
                    <p className="text-xs text-[#8E8D89] mb-2">
                      Son of Mr. Robert & Mrs. Helena Alexander
                    </p>
                    <span className="text-[11px] text-[#B89B72] font-mono">
                      @julian.alex
                    </span>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#141413] border border-[#282825] flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-[#20201D] border border-[#B89B72]/30 flex items-center justify-center text-xl font-editorial text-[#B89B72] mb-3">
                      KL
                    </div>
                    <h3 className="text-xl font-editorial font-normal mb-1">
                      Katherine Lauren
                    </h3>
                    <p className="text-xs text-[#8E8D89] mb-2">
                      Daughter of Mr. David & Mrs. Susan Lauren
                    </p>
                    <span className="text-[11px] text-[#B89B72] font-mono">
                      @katherine.lauren
                    </span>
                  </div>
                </div>

                {/* Event Schedule Details */}
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#B89B72] block mb-1">
                      WEDDING ITINERARY
                    </span>
                    <h2 className="text-2xl font-editorial">When & Where</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-[#141413] border border-[#282825]">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#B89B72] uppercase tracking-wider mb-2">
                        <Calendar className="w-4 h-4" />
                        <span>Holy Matrimony</span>
                      </div>
                      <p className="text-sm font-medium text-[#F7F7F5] mb-1">
                        Saturday, 24 October 2026
                      </p>
                      <p className="text-xs text-[#8E8D89] mb-3">
                        10:00 AM – 11:30 AM WIB
                      </p>
                      <p className="text-xs text-[#CCCCCC] mb-3">
                        St. Mary Cathedral, Menteng, Central Jakarta
                      </p>
                      <a
                        href="https://maps.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-[#B89B72] hover:underline"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Google Maps</span>
                      </a>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#141413] border border-[#282825]">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#B89B72] uppercase tracking-wider mb-2">
                        <Calendar className="w-4 h-4" />
                        <span>Dinner Reception</span>
                      </div>
                      <p className="text-sm font-medium text-[#F7F7F5] mb-1">
                        Saturday, 24 October 2026
                      </p>
                      <p className="text-xs text-[#8E8D89] mb-3">
                        06:30 PM – 09:30 PM WIB
                      </p>
                      <p className="text-xs text-[#CCCCCC] mb-3">
                        The Glasshouse Ballroom, SCBD, South Jakarta
                      </p>
                      <a
                        href="https://maps.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-[#B89B72] hover:underline"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Google Maps</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Interactive RSVP Form */}
                <div className="p-6 rounded-2xl bg-[#141413] border border-[#282825]">
                  <div className="text-center mb-6">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#B89B72] block mb-1">
                      ATTENDANCE CONFIRMATION
                    </span>
                    <h3 className="text-2xl font-editorial">RSVP & Wishes</h3>
                    <p className="text-xs text-[#8E8D89] mt-1">
                      Please let us know if you can celebrate with us.
                    </p>
                  </div>

                  {rsvpSubmitted ? (
                    <div className="p-6 rounded-xl bg-[#1C1C1A] text-center border border-[#B89B72]/30">
                      <Check className="w-8 h-8 text-[#B89B72] mx-auto mb-2" />
                      <h4 className="text-base font-semibold text-[#F7F7F5] mb-1">
                        Thank You, {guestName}!
                      </h4>
                      <p className="text-xs text-[#8E8D89]">
                        Your RSVP and warm message have been recorded.
                      </p>
                      <button
                        onClick={() => setRsvpSubmitted(false)}
                        className="mt-4 text-xs text-[#B89B72] hover:underline"
                      >
                        Submit another response
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleRsvpSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-[#8E8D89] mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          placeholder="e.g. Amanda Wijaya"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-[#1C1C1A] border border-[#2E2E2A] text-xs text-[#F7F7F5] focus:border-[#B89B72] focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-[#8E8D89] mb-1">
                            Attendance
                          </label>
                          <select
                            value={guestAttendance}
                            onChange={(e) => setGuestAttendance(e.target.value as any)}
                            className="w-full px-3 py-2.5 rounded-lg bg-[#1C1C1A] border border-[#2E2E2A] text-xs text-[#F7F7F5] focus:border-[#B89B72] focus:outline-none"
                          >
                            <option value="attending">Yes, I will attend</option>
                            <option value="unable">Unable to attend</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-[#8E8D89] mb-1">
                            Number of Guests
                          </label>
                          <select
                            value={guestCount}
                            onChange={(e) => setGuestCount(e.target.value)}
                            className="w-full px-3 py-2.5 rounded-lg bg-[#1C1C1A] border border-[#2E2E2A] text-xs text-[#F7F7F5] focus:border-[#B89B72] focus:outline-none"
                          >
                            <option value="1">1 Person</option>
                            <option value="2">2 Persons</option>
                            <option value="3">3 Persons</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#8E8D89] mb-1">
                          Warm Wishes & Prayers
                        </label>
                        <textarea
                          rows={3}
                          value={guestWish}
                          onChange={(e) => setGuestWish(e.target.value)}
                          placeholder="Write your prayers for the couple..."
                          className="w-full px-3.5 py-2.5 rounded-lg bg-[#1C1C1A] border border-[#2E2E2A] text-xs text-[#F7F7F5] focus:border-[#B89B72] focus:outline-none resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 rounded-full bg-[#B89B72] text-[#0F0F0E] text-xs font-semibold uppercase tracking-wider hover:bg-[#CBB28B] transition-colors flex items-center justify-center gap-2"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send RSVP & Wishes</span>
                      </button>
                    </form>
                  )}

                  {/* Guestbook Wishes Stream */}
                  <div className="mt-8 pt-6 border-t border-[#282825]">
                    <span className="text-[11px] font-mono text-[#8E8D89] uppercase tracking-wider block mb-3">
                      Guestbook Wishes ({wishes.length})
                    </span>
                    <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                      {wishes.map((item, idx) => (
                        <div key={idx} className="p-3 rounded-lg bg-[#181816] border border-[#242421]">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-semibold text-[#F7F7F5]">
                              {item.name}
                            </span>
                            <span className="text-[10px] text-[#737373]">
                              {item.time}
                            </span>
                          </div>
                          <p className="text-xs text-[#A3A3A3] leading-relaxed">
                            {item.wish}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Digital Gift (Angpao) Section */}
                <div className="p-6 rounded-2xl bg-[#141413] border border-[#282825] text-center">
                  <Gift className="w-6 h-6 text-[#B89B72] mx-auto mb-2" />
                  <h3 className="text-xl font-editorial mb-1">Wedding Gift</h3>
                  <p className="text-xs text-[#8E8D89] max-w-sm mx-auto mb-5">
                    Your presence and prayers are the greatest gift. If you wish to send a token of love, digital gifts can be shared via:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
                    <div className="p-3.5 rounded-xl bg-[#1A1A18] border border-[#282825] text-left flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-[#8E8D89] block">
                          Bank Central Asia (BCA)
                        </span>
                        <span className="text-xs font-mono font-semibold text-[#F7F7F5]">
                          5270 8891 22
                        </span>
                        <span className="text-[10px] text-[#8E8D89] block">
                          a.n Julian Alexander
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopy('5270889122', 'bca')}
                        className="p-2 rounded bg-[#242422] hover:bg-[#2F2F2C] text-[#B89B72] transition-colors"
                        title="Copy account number"
                      >
                        {copiedBank === 'bca' ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#1A1A18] border border-[#282825] text-left flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-[#8E8D89] block">
                          Bank Mandiri
                        </span>
                        <span className="text-xs font-mono font-semibold text-[#F7F7F5]">
                          1370 0192 8812
                        </span>
                        <span className="text-[10px] text-[#8E8D89] block">
                          a.n Katherine Lauren
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopy('137001928812', 'mandiri')}
                        className="p-2 rounded bg-[#242422] hover:bg-[#2F2F2C] text-[#B89B72] transition-colors"
                        title="Copy account number"
                      >
                        {copiedBank === 'mandiri' ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Footer in demo */}
                <div className="text-center pt-8 border-t border-[#242421] text-xs text-[#737373]">
                  <p className="font-editorial text-sm text-[#F7F7F5] mb-1">
                    Julian & Katherine
                  </p>
                  <p>Designed with love by 799Hi</p>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Bar: Action conversion */}
          <div className="p-3.5 sm:p-4 bg-[#141413] border-t border-[#282825] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <div className="text-xs text-[#8E8D89] text-center sm:text-left">
              <span>Interested in a custom wedding website like this? </span>
              <span className="text-[#B89B72] font-semibold">Starting from Rp499K</span>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => {
                  onClose();
                  onInquireWedding();
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#B89B72] text-[#0F0F0E] text-xs font-semibold hover:bg-[#CBB28B] transition-colors"
              >
                Order Wedding Website →
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
